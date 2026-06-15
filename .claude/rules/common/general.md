# 공통 원칙 — a 장어구이 정적 PWA

## 핵심

- **단순함**: 정적 페이지만. 서버·DB·인증 불필요.
- **단일 책임**: 메뉴 데이터(`data/`), UI 컴포넌트, 스타일 분리.
- **명시적**: 가격·전화번호·영업시간은 `data/menu.json` 등 데이터 파일에만 둔다.

## 금지

- API 키·비밀번호 하드코딩
- `console.log` 프로덕션 배포
- 메뉴 가격을 컴포넌트에 직접 하드코딩
- 원본 음식 사진 파일 직접 수정 (교체는 `public/images/`에 새 파일 추가)

## 배포

- GitHub Actions → `npm run build` → GitHub Pages
- 한 번 push 후 자동 배포·지속 호스팅
