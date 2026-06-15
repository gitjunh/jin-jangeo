import type { OptimizePreset } from '../types';

export interface ImageOptimizeResult {
  blob: Blob;
  width: number;
  height: number;
}

export function calcScaledSize(
  width: number,
  height: number,
  maxWidth: number,
): { width: number; height: number } {
  const maxSide = Math.max(width, height);
  if (maxSide <= maxWidth) return { width, height };
  const ratio = maxWidth / maxSide;
  return {
    width: Math.round(width * ratio),
    height: Math.round(height * ratio),
  };
}

export async function optimizeImage(
  file: File,
  preset: OptimizePreset,
  onProgress?: (p: number) => void,
): Promise<ImageOptimizeResult> {
  onProgress?.(10);

  const bitmap = await createImageBitmap(file);
  onProgress?.(30);

  const { width, height } = calcScaledSize(bitmap.width, bitmap.height, preset.maxWidth);

  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context를 사용할 수 없습니다.');

  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  onProgress?.(60);

  const blob = await canvas.convertToBlob({
    type: 'image/webp',
    quality: preset.imageQuality,
  });
  onProgress?.(100);

  return { blob, width, height };
}

export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
