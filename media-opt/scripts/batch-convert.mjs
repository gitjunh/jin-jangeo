/**
 * res/ → res2/ 일괄 변환 (media-opt와 동일 프리셋)
 * 이미지: WebP, 긴 변 1280px, 품질 72
 * 영상: MP4 H.264 CRF30, 최대 1280px, AAC 96k
 */
import { spawn } from 'node:child_process';
import { mkdir, readdir, stat } from 'node:fs/promises';
import { dirname, extname, join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpegStatic from 'ffmpeg-static';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');
const INPUT_DIR = join(ROOT, 'res');
const OUTPUT_DIR = join(ROOT, 'res2');

const PRESET = {
  maxSide: 1280,
  imageQuality: 72,
  videoCrf: 30,
  audioBitrate: '96k',
};

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.heic', '.heif']);
const VIDEO_EXT = new Set(['.mp4', '.mov', '.webm', '.mkv', '.avi', '.m4v']);

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function runFfmpeg(args) {
  if (!ffmpegStatic) throw new Error('ffmpeg-static binary not found');
  return new Promise((resolve, reject) => {
    const proc = spawn(ffmpegStatic, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stderr = '';
    proc.stderr?.on('data', (d) => { stderr += d.toString(); });
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg failed (${code}): ${stderr.slice(-500)}`));
    });
    proc.on('error', reject);
  });
}

async function optimizeImage(inputPath, outputPath) {
  const meta = await sharp(inputPath).metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;
  const maxSide = Math.max(w, h);

  let pipeline = sharp(inputPath).rotate(); // EXIF 방향 보정 후 제거
  if (maxSide > PRESET.maxSide) {
    pipeline = w >= h
      ? pipeline.resize(PRESET.maxSide, null, { withoutEnlargement: true })
      : pipeline.resize(null, PRESET.maxSide, { withoutEnlargement: true });
  }

  await pipeline.webp({ quality: PRESET.imageQuality }).toFile(outputPath);
}

async function optimizeVideo(inputPath, outputPath) {
  await runFfmpeg([
    '-i', inputPath,
    '-vf', `scale='min(${PRESET.maxSide},iw)':-2`,
    '-c:v', 'libx264',
    '-crf', String(PRESET.videoCrf),
    '-preset', 'fast',
    '-c:a', 'aac',
    '-b:a', PRESET.audioBitrate,
    '-movflags', '+faststart',
    '-y',
    outputPath,
  ]);
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const files = (await readdir(INPUT_DIR)).filter((f) => !f.startsWith('.'));
  const results = [];

  console.log(`\n입력: ${INPUT_DIR}`);
  console.log(`출력: ${OUTPUT_DIR}\n`);

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    const inputPath = join(INPUT_DIR, file);
    const before = (await stat(inputPath)).size;
    const base = parse(file).name;

    try {
      if (IMAGE_EXT.has(ext)) {
        const out = join(OUTPUT_DIR, `${base}.webp`);
        process.stdout.write(`[이미지] ${file} → ${base}.webp ... `);
        await optimizeImage(inputPath, out);
        const after = (await stat(out)).size;
        const saved = Math.round((1 - after / before) * 100);
        console.log(`${formatBytes(before)} → ${formatBytes(after)} (${saved}% 절감)`);
        results.push({ name: `${base}.webp`, before, after, type: 'image' });
      } else if (VIDEO_EXT.has(ext)) {
        const out = join(OUTPUT_DIR, `${base}-web.mp4`);
        process.stdout.write(`[영상] ${file} → ${base}-web.mp4 ... `);
        await optimizeVideo(inputPath, out);
        const after = (await stat(out)).size;
        const saved = Math.round((1 - after / before) * 100);
        console.log(`${formatBytes(before)} → ${formatBytes(after)} (${saved}% 절감)`);
        results.push({ name: `${base}-web.mp4`, before, after, type: 'video' });
      } else {
        console.log(`[건너뜀] ${file} (지원하지 않는 형식)`);
      }
    } catch (err) {
      console.error(`[실패] ${file}:`, err instanceof Error ? err.message : err);
    }
  }

  const totalBefore = results.reduce((s, r) => s + r.before, 0);
  const totalAfter = results.reduce((s, r) => s + r.after, 0);
  console.log(`\n완료: ${results.length}개 파일`);
  console.log(`합계: ${formatBytes(totalBefore)} → ${formatBytes(totalAfter)} (${Math.round((1 - totalAfter / totalBefore) * 100)}% 절감)\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
