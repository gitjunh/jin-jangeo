import type { OptimizePreset } from '../types';
import { getFFmpeg } from './ffmpegLoader';

const INPUT_NAME = 'input';
const OUTPUT_NAME = 'output.mp4';

function inputExt(file: File): string {
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (ext && ['mp4', 'mov', 'webm', 'mkv', 'avi', 'm4v'].includes(ext)) {
    return ext;
  }
  return 'mp4';
}

export async function optimizeVideo(
  file: File,
  preset: OptimizePreset,
  onProgress?: (p: number) => void,
  onLog?: (msg: string) => void,
): Promise<Blob> {
  onProgress?.(5);
  const ff = await getFFmpeg(onLog);
  onProgress?.(15);

  const ext = inputExt(file);
  const inputFile = `${INPUT_NAME}.${ext}`;

  ff.on('progress', ({ progress }) => {
    const pct = Math.min(95, 15 + Math.round(progress * 80));
    onProgress?.(pct);
  });

  await ff.writeFile(inputFile, new Uint8Array(await file.arrayBuffer()));
  onProgress?.(20);

  await ff.exec([
    '-i',
    inputFile,
    '-vf',
    `scale='min(${preset.videoMaxWidth},iw)':-2`,
    '-c:v',
    'libx264',
    '-crf',
    String(preset.videoCrf),
    '-preset',
    'fast',
    '-c:a',
    'aac',
    '-b:a',
    preset.audioBitrate,
    '-movflags',
    '+faststart',
    OUTPUT_NAME,
  ]);

  onProgress?.(98);
  const data = await ff.readFile(OUTPUT_NAME);
  await ff.deleteFile(inputFile);
  await ff.deleteFile(OUTPUT_NAME);

  onProgress?.(100);
  return new Blob([data], { type: 'video/mp4' });
}
