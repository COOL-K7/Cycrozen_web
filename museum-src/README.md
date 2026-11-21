# 선사 박물관

한능검 선사시대(구석기·신석기·청동기·철기) 3D 워크스루 박물관.
배포 경로는 `https://cycrozen.com/museum/` (빌드 산출물: 저장소 루트 `museum/`).

## 개발

```bash
cd museum-src
npm install
npm run dev
```

브라우저에서 `http://127.0.0.1:5173` 을 엽니다.

## 빌드 (GitHub Pages용)

```bash
cd museum-src
npm install
npm run build
```

`base: '/museum/'` 로 `../museum` 에 정적 파일이 생성됩니다. 커밋·푸시하면 Pages가 반영합니다.

## 조작

- **PC:** WASD/방향키 이동, 클릭 후 마우스 시야
- **모바일:** 왼쪽 스틱 이동, 오른쪽 시야 패드
- 상단 **비교 / 함정 / 퀴즈** 로 학습 패널 열기

## 스택

Vite · React · Three.js · React Three Fiber
