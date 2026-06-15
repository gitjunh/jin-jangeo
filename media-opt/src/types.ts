export type JobStatus = 'pending' | 'processing' | 'done' | 'error';

export type MediaKind = 'image' | 'video';

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

export interface MediaJob {
  id: string;
  file: File;
  kind: MediaKind;
  status: JobStatus;
  progress: number;
  message: string;
  originalSize: number;
  outputSize?: number;
  outputBlob?: Blob;
  outputName?: string;
  error?: string;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function savingsPercent(original: number, optimized: number): number {
  if (original === 0) return 0;
  return Math.round((1 - optimized / original) * 100);
}

export function detectKind(file: File): MediaKind | null {
  if (file.type.startsWith('image/')) return 'image';
  if (file.type.startsWith('video/')) return 'video';
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (ext && ['jpg', 'jpeg', 'png', 'webp', 'gif', 'heic', 'heif'].includes(ext)) {
    return 'image';
  }
  if (ext && ['mp4', 'mov', 'webm', 'mkv', 'avi', 'm4v'].includes(ext)) {
    return 'video';
  }
  return null;
}

export function outputFileName(originalName: string, kind: MediaKind): string {
  const base = originalName.replace(/\.[^.]+$/, '');
  return kind === 'image' ? `${base}.webp` : `${base}-web.mp4`;
}

export const VIDEO_SIZE_WARN_BYTES = 100 * 1024 * 1024;
