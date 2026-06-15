import {
  DEFAULT_PRESET,
  detectKind,
  outputFileName,
  VIDEO_SIZE_WARN_BYTES,
  type MediaJob,
} from './types';
import { optimizeImage, downloadBlob } from './lib/imageOptimizer';
import { optimizeVideo } from './lib/videoOptimizer';
import { createFileDropzone } from './components/FileDropzone';
import { createJobList } from './components/JobList';

let jobIdCounter = 0;

function nextId(): string {
  jobIdCounter += 1;
  return `job-${jobIdCounter}`;
}

export function initApp(root: HTMLElement): void {
  const jobs: MediaJob[] = [];
  let processing = false;

  root.innerHTML = `
    <header class="header">
      <h1 class="header__title">Media Opt</h1>
      <p class="header__sub">핸드폰 사진·영상 → 웹 전용 용량 최적화</p>
    </header>
    <main class="main"></main>
    <footer class="footer">
      <p>모든 변환은 기기 안에서만 처리됩니다. 서버 업로드 없음.</p>
    </footer>
  `;

  const main = root.querySelector<HTMLElement>('.main')!;
  const dropzone = createFileDropzone((files) => void enqueueFiles(files));
  const { element: jobListEl, render } = createJobList({
    onDownload: (job) => {
      if (job.outputBlob && job.outputName) {
        downloadBlob(job.outputBlob, job.outputName);
      }
    },
  });

  main.append(dropzone, jobListEl);

  function update(): void {
    render([...jobs]);
  }

  function enqueueFiles(files: File[]): void {
    for (const file of files) {
      const kind = detectKind(file);
      if (!kind) {
        jobs.push({
          id: nextId(),
          file,
          kind: 'image',
          status: 'error',
          progress: 0,
          message: '',
          originalSize: file.size,
          error: '지원하지 않는 파일 형식입니다.',
        });
        continue;
      }

      if (kind === 'video' && file.size > VIDEO_SIZE_WARN_BYTES) {
        jobs.push({
          id: nextId(),
          file,
          kind,
          status: 'pending',
          progress: 0,
          message: `대용량 (${Math.round(file.size / 1024 / 1024)}MB) — 처리에 수 분 걸릴 수 있습니다`,
          originalSize: file.size,
        });
      } else {
        jobs.push({
          id: nextId(),
          file,
          kind,
          status: 'pending',
          progress: 0,
          message: '대기 중…',
          originalSize: file.size,
        });
      }
    }
    update();
    void processQueue();
  }

  async function processQueue(): Promise<void> {
    if (processing) return;
    processing = true;

    while (true) {
      const job = jobs.find((j) => j.status === 'pending');
      if (!job) break;

      job.status = 'processing';
      job.message = job.kind === 'image' ? '이미지 변환 중…' : 'FFmpeg 로딩·영상 변환 중…';
      update();

      try {
        if (job.kind === 'image') {
          const result = await optimizeImage(job.file, DEFAULT_PRESET, (p) => {
            job.progress = p;
            update();
          });
          job.outputBlob = result.blob;
        } else {
          const blob = await optimizeVideo(
            job.file,
            DEFAULT_PRESET,
            (p) => {
              job.progress = p;
              update();
            },
            (msg) => {
              if (msg.includes('frame=')) {
                job.message = '영상 인코딩 중…';
                update();
              }
            },
          );
          job.outputBlob = blob;
        }

        job.outputSize = job.outputBlob.size;
        job.outputName = outputFileName(job.file.name, job.kind);
        job.status = 'done';
        job.progress = 100;
        job.message = '완료';
      } catch (err) {
        job.status = 'error';
        const msg = err instanceof Error ? err.message : '변환 실패';
        job.error =
          job.kind === 'image' && job.file.name.toLowerCase().includes('.heic')
            ? `${msg} — HEIC는 Safari에서 열거나 사진 앱에서 JPG로 저장 후 다시 시도하세요.`
            : msg;
      }
      update();
    }

    processing = false;
  }
}
