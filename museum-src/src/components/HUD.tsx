import { ERAS, TRAPS, COMPARISON_ROWS, QUIZ, type EraId } from '../data/eras'
import { useEffect, useMemo, useState, type PointerEvent as ReactPointerEvent } from 'react'

const ERA_META: Record<EraId | 'plaza', { name: string; accent: string; clue?: string }> = {
  plaza: { name: '비교의 광장', accent: '#d4a574' },
  paleolithic: { name: ERAS[0].name, accent: ERAS[0].accent, clue: ERAS[0].clue },
  neolithic: { name: ERAS[1].name, accent: ERAS[1].accent, clue: ERAS[1].clue },
  bronze: { name: ERAS[2].name, accent: ERAS[2].accent, clue: ERAS[2].clue },
  iron: { name: ERAS[3].name, accent: ERAS[3].accent, clue: ERAS[3].clue },
}

function getExhibitInfo(id: string | null) {
  if (!id) return null
  if (id === 'plaza-compare') {
    return {
      era: '비교의 광장',
      accent: '#d4a574',
      title: '한눈에 비교',
      detail: '네 시대의 도구·토기·주거·경제·사회 차이를 표로 확인하세요. [비교] 버튼을 누르세요.',
    }
  }
  if (id.startsWith('plaza-trap-')) {
    const idx = Number(id.split('-').pop())
    const t = TRAPS[idx]
    if (!t) return null
    return { era: '함정 노트', accent: '#f0c44c', title: t.title, detail: t.body }
  }
  const [eraKey, idxStr] = id.split('-') as [EraId, string]
  const era = ERAS.find((e) => e.id === eraKey)
  if (!era) return null
  const ex = era.exhibits[Number(idxStr)]
  if (!ex) return null
  return { era: era.name, accent: era.accent, title: ex.title, detail: ex.detail }
}

export default function HUD({
  era,
  exhibitId,
  onExit,
  showStick,
  stickRef,
  lookRef,
}: {
  era: EraId | 'plaza'
  exhibitId: string | null
  onExit: () => void
  showStick: boolean
  stickRef: {
    onPointerDown: (e: ReactPointerEvent) => void
    onPointerMove: (e: ReactPointerEvent) => void
    onPointerUp: (e: ReactPointerEvent) => void
  }
  lookRef: {
    onPointerDown: (e: ReactPointerEvent) => void
    onPointerMove: (e: ReactPointerEvent) => void
    onPointerUp: (e: ReactPointerEvent) => void
  }
}) {
  const [panel, setPanel] = useState<'compare' | 'quiz' | 'traps' | null>(null)
  const meta = ERA_META[era]
  const plaque = getExhibitInfo(exhibitId)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPanel(null)
        return
      }
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      const k = e.key.toLowerCase()
      if (k === 'c') setPanel((p) => (p === 'compare' ? null : 'compare'))
      if (k === 't') setPanel((p) => (p === 'traps' ? null : 'traps'))
      if (k === 'q') setPanel((p) => (p === 'quiz' ? null : 'quiz'))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="hud">
      <div className="hud__top">
        <div>
          <div className="hud__brand-mini">선사 박물관</div>
          <div className="hud__era" style={{ ['--era-accent' as string]: meta.accent }}>
            {meta.name}
            {meta.clue ? ` · ${meta.clue}` : ''}
          </div>
        </div>
        <div className="hud__actions">
          <button
            type="button"
            className={`hud__btn ${panel === 'compare' ? 'active' : ''}`}
            onClick={() => setPanel(panel === 'compare' ? null : 'compare')}
          >
            비교
          </button>
          <button
            type="button"
            className={`hud__btn ${panel === 'traps' ? 'active' : ''}`}
            onClick={() => setPanel(panel === 'traps' ? null : 'traps')}
          >
            함정
          </button>
          <button
            type="button"
            className={`hud__btn ${panel === 'quiz' ? 'active' : ''}`}
            onClick={() => setPanel(panel === 'quiz' ? null : 'quiz')}
          >
            퀴즈
          </button>
          <button type="button" className="hud__btn" onClick={onExit}>
            나가기
          </button>
        </div>
      </div>

      {plaque && (
        <div className="plaque" style={{ ['--era-accent' as string]: plaque.accent }}>
          <div className="plaque__era">{plaque.era}</div>
          <h3 className="plaque__title">{plaque.title}</h3>
          <p className="plaque__detail">{plaque.detail}</p>
        </div>
      )}

      <div className="hud__bottom">
        <div className="hud__controls">
          PC: WASD 이동 · 클릭 후 마우스 시야 · Esc 해제 · C비교/T함정/Q퀴즈 · 모바일: 왼쪽 스틱 · 오른쪽 시야
        </div>
      </div>

      {showStick && (
        <>
          <div
            className="mobile-stick"
            onPointerDown={stickRef.onPointerDown}
            onPointerMove={stickRef.onPointerMove}
            onPointerUp={stickRef.onPointerUp}
            onPointerCancel={stickRef.onPointerUp}
          >
            <div className="mobile-stick__knob" id="stick-knob" />
          </div>
          <div
            className="look-pad"
            onPointerDown={lookRef.onPointerDown}
            onPointerMove={lookRef.onPointerMove}
            onPointerUp={lookRef.onPointerUp}
            onPointerCancel={lookRef.onPointerUp}
          >
            시야
          </div>
        </>
      )}

      {panel === 'compare' && (
        <div className="panel-overlay" onClick={() => setPanel(null)}>
          <div className="panel" onClick={(e) => e.stopPropagation()}>
            <div className="panel__header">
              <h2 className="panel__title">한눈에 비교</h2>
              <button type="button" className="panel__close" onClick={() => setPanel(null)} aria-label="닫기">
                ×
              </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="compare-table">
                <thead>
                  <tr>
                    <th>항목</th>
                    {ERAS.map((e) => (
                      <th key={e.id} className="era-col" style={{ ['--col' as string]: e.accent }}>
                        {e.short}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.key}>
                      <td className="label">{row.label}</td>
                      {ERAS.map((e) => (
                        <td key={e.id}>{e[row.key]}</td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="label">유적</td>
                    {ERAS.map((e) => (
                      <td key={e.id}>{e.sites}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {panel === 'traps' && (
        <div className="panel-overlay" onClick={() => setPanel(null)}>
          <div className="panel" onClick={(e) => e.stopPropagation()}>
            <div className="panel__header">
              <h2 className="panel__title">시험 함정 노트</h2>
              <button type="button" className="panel__close" onClick={() => setPanel(null)} aria-label="닫기">
                ×
              </button>
            </div>
            <div className="traps">
              {TRAPS.map((t) => (
                <div key={t.id} className="trap">
                  <p className="trap__title">{t.title}</p>
                  <p className="trap__body">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {panel === 'quiz' && <QuizPanel onClose={() => setPanel(null)} />}
    </div>
  )
}

function QuizPanel({ onClose }: { onClose: () => void }) {
  const [qi, setQi] = useState(0)
  const [picked, setPicked] = useState<EraId | null>(null)
  const [score, setScore] = useState(0)
  const q = QUIZ[qi]
  const options = useMemo(() => {
    const ids = [q.answer, ...q.distractors]
    return ids
      .map((id) => ERAS.find((e) => e.id === id)!)
      .sort(() => Math.random() - 0.5)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qi])

  const feedback =
    picked == null
      ? ''
      : picked === q.answer
        ? '정답! 핵심 단서를 잘 잡았습니다.'
        : `오답. 정답은 ${ERAS.find((e) => e.id === q.answer)?.short}입니다.`

  return (
    <div className="panel-overlay" onClick={onClose}>
      <div className="panel" onClick={(e) => e.stopPropagation()}>
        <div className="panel__header">
          <h2 className="panel__title">
            시대 맞추기 ({qi + 1}/{QUIZ.length}) · {score}점
          </h2>
          <button type="button" className="panel__close" onClick={onClose} aria-label="닫기">
            ×
          </button>
        </div>
        <div className="quiz">
          <p className="quiz__clue">{q.clue}</p>
          <div className="quiz__options">
            {options.map((o) => (
              <button
                key={o.id}
                type="button"
                className={`quiz__opt ${
                  picked
                    ? o.id === q.answer
                      ? 'correct'
                      : o.id === picked
                        ? 'wrong'
                        : ''
                    : ''
                }`}
                disabled={!!picked}
                onClick={() => {
                  setPicked(o.id)
                  if (o.id === q.answer) setScore((s) => s + 1)
                }}
              >
                {o.short}
              </button>
            ))}
          </div>
          <div className="quiz__feedback">{feedback}</div>
          {picked && (
            <button
              type="button"
              className="landing__cta"
              style={{ alignSelf: 'flex-start' }}
              onClick={() => {
                if (qi + 1 >= QUIZ.length) {
                  setQi(0)
                  setScore(0)
                } else {
                  setQi((i) => i + 1)
                }
                setPicked(null)
              }}
            >
              {qi + 1 >= QUIZ.length ? '다시 풀기' : '다음 문제'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
