import type { MediaJob } from '../types';
import { formatBytes, savingsPercent } from '../types';
import { createProgressBar, updateProgressBar } from './ProgressBar';

export interface JobListCallbacks {
  onDownload: (job: MediaJob) => void;
}

export function createJobList(callbacks: JobListCallbacks): {
  element: HTMLElement;
  render: (jobs: MediaJob[]) => void;
} {
  const el = document.createElement('section');
  el.className = 'job-list';
  el.innerHTML = '<h2 class="job-list__title">변환 목록</h2><div class="job-list__items"></div>';
  const items = el.querySelector<HTMLElement>('.job-list__items')!;

  const progressEls = new Map<string, HTMLElement>();

  function render(jobs: MediaJob[]): void {
    if (jobs.length === 0) {
      items.innerHTML = '<p class="job-list__empty">아직 파일이 없습니다.</p>';
      progressEls.clear();
      return;
    }

    const existingIds = new Set(jobs.map((j) => j.id));
    for (const id of progressEls.keys()) {
      if (!existingIds.has(id)) progressEls.delete(id);
    }

    items.innerHTML = '';
    for (const job of jobs) {
      const card = document.createElement('article');
      card.className = `job-card job-card--${job.status}`;
      card.dataset.id = job.id;

      const kindLabel = job.kind === 'image' ? '이미지' : '영상';
      let body = `
        <div class="job-card__header">
          <span class="job-card__kind">${kindLabel}</span>
          <span class="job-card__name">${escapeHtml(job.file.name)}</span>
        </div>
        <div class="job-card__meta">
          원본: ${formatBytes(job.originalSize)}
      `;

      if (job.status === 'done' && job.outputSize != null) {
        const saved = savingsPercent(job.originalSize, job.outputSize);
        body += ` → ${formatBytes(job.outputSize)} <strong class="job-card__saved">(${saved}% 절감)</strong>`;
      }

      body += '</div>';

      if (job.status === 'processing' || job.status === 'pending') {
        body += `<div class="progress-slot" data-progress-slot></div>`;
      }

      if (job.status === 'error' && job.error) {
        body += `<p class="job-card__error">${escapeHtml(job.error)}</p>`;
      }

      if (job.status === 'done' && job.outputBlob) {
        body += `<button type="button" class="btn btn--secondary job-card__download">다운로드</button>`;
      }

      card.innerHTML = body;

      if (job.status === 'processing' || job.status === 'pending') {
        const slot = card.querySelector('[data-progress-slot]');
        if (slot) {
          let progressEl = progressEls.get(job.id);
          if (!progressEl) {
            progressEl = createProgressBar(job.progress, job.message || '대기 중…');
            progressEls.set(job.id, progressEl);
          } else {
            updateProgressBar(progressEl, job.progress, job.message || '대기 중…');
          }
          slot.replaceWith(progressEl);
        }
      }

      const dlBtn = card.querySelector<HTMLButtonElement>('.job-card__download');
      dlBtn?.addEventListener('click', () => callbacks.onDownload(job));

      items.appendChild(card);
    }
  }

  return { element: el, render };
}

function escapeHtml(text: string): string {
  const d = document.createElement('div');
  d.textContent = text;
  return d.innerHTML;
}
