import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';

let ffmpeg: FFmpeg | null = null;
let loadPromise: Promise<FFmpeg> | null = null;

const CORE_VERSION = '0.12.10';
const CORE_BASE = `https://unpkg.com/@ffmpeg/core@${CORE_VERSION}/dist/esm`;

export async function getFFmpeg(onLog?: (msg: string) => void): Promise<FFmpeg> {
  if (ffmpeg?.loaded) return ffmpeg;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const instance = new FFmpeg();
    instance.on('log', ({ message }) => onLog?.(message));

    await instance.load({
      coreURL: await toBlobURL(`${CORE_BASE}/ffmpeg.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${CORE_BASE}/ffmpeg.wasm`, 'application/wasm'),
    });

    ffmpeg = instance;
    return instance;
  })();

  return loadPromise;
}

export function resetFFmpeg(): void {
  ffmpeg = null;
  loadPromise = null;
}
