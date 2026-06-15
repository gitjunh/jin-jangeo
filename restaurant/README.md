# 장어명가 진 — 모바일 PWA

## 로컬 실행

```bash
npm install
cp .env.example .env   # PIN 등 설정
npm run dev            # http://localhost:5173 (고정)
```

- **홈페이지**: http://localhost:5173/
- **어드민**: http://localhost:5173/admin.html

> `media-opt`는 **5180** 포트입니다. 5173에서 `/admin.html`을 열면 Media Opt가 보일 수 있으니 restaurant 서버를 사용하세요.

## 어드민 (`/admin.html`)

메뉴·매장 정보를 **재배포 없이** 바로 수정합니다.

### 최초 설정 (1회)

1. [Fine-grained PAT 발급](https://github.com/settings/personal-access-tokens/new)
   - **프로필** Settings → Developer settings → Personal access tokens → Fine-grained tokens
   - Repository: `jin-jangeo`만 선택
   - Permissions → Contents: **Read and write**
   - (`gh-pages`는 토큰 설정이 아니라 Pages 배포 브랜치)
2. `.env`에 `VITE_ADMIN_PIN=원하는숫자` 설정 후 빌드
3. `/admin.html` 접속 → 토큰 등록 → PIN 입력

### 일상 사용

1. `/admin.html` → PIN 입력
2. 메뉴 추가·삭제·가격·사진 변경
3. **저장하기** → 홈페이지 새로고침 시 즉시 반영

사진 변경 시 media-opt와 동일하게 WebP 최적화(1280px, 72%) 후 업로드됩니다.

### 배포

- GitHub Pages: `gh-pages` 브랜치
- 코드 변경: `main` push → Actions 빌드 (`data/`·`media/`는 `keep_files`로 보존)
- 메뉴·텍스트만 변경: 어드민 저장 (빌드 불필요)

Repository Secrets: `VITE_ADMIN_PIN` (배포용 PIN)

## 구조

- `public/data/` — 런타임 JSON (어드민이 gh-pages에서 직접 수정)
- `public/media/` — 이미지·영상
- `src/admin/` — 관리자 UI
- `../shared/media/` — 이미지 최적화 공유 모듈
