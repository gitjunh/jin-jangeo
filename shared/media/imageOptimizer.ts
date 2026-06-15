export interface OptimizePreset {
  maxWidth: number;
  imageQuality: number;
  videoCrf: number;
  videoMaxWidth: number;
  audioBitrate: string;
}

export const DEFAULT_PRESET: OptimizePreset = {
  maxWidth: 1280,
  imageQuality: 0.72,
  videoCrf: 30,
  videoMaxWidth: 1280,
  audioBitrate: '96k',
};

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
  preset: OptimizePreset = DEFAULT_PRESET,
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
