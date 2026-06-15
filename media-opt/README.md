# Media Opt

핸드폰에서 촬영한 **사진·영상**을 웹 페이지 전용으로 **용량 최적화**하는 클라이언트 PWA입니다.  
모든 변환은 브라우저 안에서만 처리되며 서버로 업로드되지 않습니다.

## 기능

| 입력 | 출력 | 설정 |
|------|------|------|
| JPG, PNG, WebP, GIF 등 | WebP | 최대 너비 1280px, 품질 72% |
| MP4, MOV, WebM 등 | MP4 (H.264) | 최대 1280px, CRF 30, AAC 96kbps |

## 로컬 개발 (배포 전)

```bash
npm install
npm test          # 단위 테스트
npm run dev       # http://localhost:5173
npm run build     # 프로덕션 빌드 확인
npm run preview   # 빌드 결과 로컬 미리보기
```

로컬 테스트 완료 후 별도 repo로 push·배포합니다.

## GitHub Pages 배포 (별도 repo)

이 폴더는 **독립 GitHub 저장소**로 배포합니다.

1. GitHub에서 새 repo 생성 (예: `media-opt`)
2. repo **Settings → Pages → Build and deployment → Source: GitHub Actions**
3. 아래 명령으로 push:

```bash
cd media-opt
git init
git add .
git commit -m "feat: initial media-opt PWA"
git branch -M main
git remote add origin git@github.com:<USER>/media-opt.git
git push -u origin main
```

배포 URL: `https://<USER>.github.io/media-opt/`

## umbrella 워크스페이스에서

상위 [`jin`](../) 워크스페이스의 사이드 프로젝트입니다.  
메인 장어구이 PWA(`../restaurant/`)용 이미지·영상을 여기서 최적화한 뒤 사용하세요.

### submodule 예시 (선택)

```bash
# 별도 repo 생성 후
git submodule add git@github.com:<USER>/media-opt.git media-opt
```

## 주의

- 영상 100MB 이상: 처리에 수 분 소요될 수 있음
- HEIC(iPhone): 브라우저 미지원 시 JPG로 저장 후 재시도
- FFmpeg.wasm은 첫 영상 변환 시 ~25MB 다운로드
