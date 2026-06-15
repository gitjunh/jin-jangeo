# TypeScript — 정적 PWA 규칙

## 컴파일

- `strict: true` 유지
- `any` 사용 금지

## media-opt 도메인 타입

```typescript
interface MediaJob {
  id: string;
  file: File;
  kind: 'image' | 'video';
  status: 'pending' | 'processing' | 'done' | 'error';
  progress: number;
  originalSize: number;
  outputSize?: number;
  outputBlob?: Blob;
}

interface OptimizePreset {
  maxWidth: number;       // 이미지 1280
  imageQuality: number;   // 0.72
  videoCrf: number;       // 30
  videoMaxWidth: number;  // 1280
  audioBitrate: string;   // '96k'
}
```

## restaurant 도메인 타입 (후속)

```typescript
interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
}
```

## PWA

- manifest 필수 필드: `name`, `icons`, `start_url`, `display`
- FFmpeg.wasm: lazy load, SW precache 제외
- 배포: GitHub Pages, `base: '/'` (별도 repo 루트)

## 스택

- Vite + TypeScript + vite-plugin-pwa
- UI: 바닐라 TS (React 불필요 시)
- 영상: @ffmpeg/ffmpeg 싱글스레드 코어
