# Cycrozen_web

한국사 연습실 (한능검 심화) — [cycrozen.com](https://cycrozen.com)

## Deploy

GitHub Pages serves this repo from `main` (custom domain `cycrozen.com` via `CNAME`). Push to `main` to publish; there is no separate build workflow for the study room static files.

## 선사 박물관

3D 체험은 `/museum/` 에 배포됩니다. 소스·재빌드:

```bash
cd museum-src
npm install
npm run build   # → ../museum
```

Then commit `museum/` (and source changes) and merge to `main`.
