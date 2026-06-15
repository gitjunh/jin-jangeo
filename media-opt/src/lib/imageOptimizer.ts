import type { OptimizePreset } from '../types';
import {
  calcScaledSize,
  optimizeImage as sharedOptimizeImage,
  type ImageOptimizeResult,
} from '@shared/media';

export { calcScaledSize, type ImageOptimizeResult };

export async function optimizeImage(
  file: File,
  preset: OptimizePreset,
  onProgress?: (p: number) => void,
): Promise<ImageOptimizeResult> {
  return sharedOptimizeImage(file, preset, onProgress);
}

export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
