# Claude Code 하네스 — jin 우산 워크스페이스

## 구조

```text
jin/
├── CLAUDE.md
├── .claude/           # 공유 하네스
├── media-opt/         # 사이드 PWA (별도 repo 배포)
└── restaurant/        # 메인 PWA (설계 완료)
```

## 에이전트 (restaurant)

| 에이전트 | 역할 |
|----------|------|
| `restaurant-designer` | UI/UX·DESIGN.md |
| `restaurant-developer` | PWA 코드 구현 |

설계: [`restaurant/DESIGN.md`](../restaurant/DESIGN.md)

`media-opt/` 폴더만 별도 GitHub repo로 push합니다.  
자세한 절차: [`media-opt/README.md`](../media-opt/README.md)

## 가이드

1. **media-opt 작업 시** `media-opt/`에서 `npm install` / `npm run dev`
2. **restaurant 작업 시** (추후) `restaurant/`에서 동일
3. `package.json`·workflow 변경 시 해당 앱 폴더 기준으로 빌드 확인

## 하네스 구성

| 항목 | 내용 |
|------|------|
| settings.json | sonnet, static-pwa |
| rules | common + typescript |
| hooks | 코드 동기화, package.json, workflow |
| agents | restaurant-designer, restaurant-developer |
