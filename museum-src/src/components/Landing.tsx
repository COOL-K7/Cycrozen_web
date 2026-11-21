const EMBERS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${6 + ((i * 17) % 88)}%`,
  delay: `${(i * 0.45) % 6}s`,
  duration: `${7 + (i % 5)}s`,
  size: `${2 + (i % 4)}px`,
}))

export default function Landing({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="landing">
      <div className="landing__atmosphere" aria-hidden />
      <div className="landing__embers" aria-hidden>
        {EMBERS.map((e) => (
          <span
            key={e.id}
            className="landing__ember"
            style={{
              left: e.left,
              animationDelay: e.delay,
              animationDuration: e.duration,
              width: e.size,
              height: e.size,
            }}
          />
        ))}
      </div>
      <div className="landing__content">
        <a className="landing__back" href="/">
          ← CYCROZEN
        </a>
        <h1 className="landing__brand">선사 박물관</h1>
        <p className="landing__tagline">
          구석기부터 철기까지, 네 개의 전시관을 걸으며 한눈에 비교하세요.
        </p>
        <button type="button" className="landing__cta" onClick={onEnter}>
          입장
          <span aria-hidden>→</span>
        </button>
        <p className="landing__hint">한능검 선사시대 개념 대비 · PC·모바일 지원</p>
      </div>
    </div>
  )
}
