import { Canvas } from '@react-three/fiber'
import { Suspense, useCallback, useEffect, useMemo, useState, type PointerEvent as ReactPointerEvent } from 'react'
import type { EraId } from '../data/eras'
import { useControls } from '../hooks/useControls'
import Player from './Player'
import { MuseumWorld } from './Halls'
import HUD from './HUD'

export default function Museum({ onExit }: { onExit: () => void }) {
  const controls = useControls()
  const [locked, setLocked] = useState(false)
  const [started, setStarted] = useState(false)
  const [era, setEra] = useState<EraId | 'plaza'>('plaza')
  const [exhibitId, setExhibitId] = useState<string | null>(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const touch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    setIsTouch(touch)
  }, [])

  useEffect(() => {
    const onLockChange = () => {
      setLocked(document.pointerLockElement !== null)
    }
    document.addEventListener('pointerlockchange', onLockChange)
    return () => document.removeEventListener('pointerlockchange', onLockChange)
  }, [])

  const requestLock = useCallback(() => {
    setStarted(true)
    if (isTouch) return
    const canvas = document.querySelector('canvas')
    canvas?.requestPointerLock?.()
  }, [isTouch])

  // Autostart for demos / headless (?autostart=1) or touch devices
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('autostart') === '1' || isTouch) {
      setStarted(true)
    }
  }, [isTouch])

  // Mobile stick handlers
  const stickHandlers = useMemo(() => {
    let active = false
    let originX = 0
    let originY = 0
    return {
      onPointerDown: (e: ReactPointerEvent) => {
        active = true
        ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
        originX = rect.left + rect.width / 2
        originY = rect.top + rect.height / 2
      },
      onPointerMove: (e: ReactPointerEvent) => {
        if (!active) return
        const dx = (e.clientX - originX) / 45
        const dy = (e.clientY - originY) / 45
        const len = Math.hypot(dx, dy) || 1
        const nx = Math.max(-1, Math.min(1, dx / Math.max(1, len)))
        const ny = Math.max(-1, Math.min(1, dy / Math.max(1, len)))
        controls.current.stickX = nx
        controls.current.stickY = ny
        const knob = document.getElementById('stick-knob')
        if (knob) {
          knob.style.transform = `translate(calc(-50% + ${nx * 28}px), calc(-50% + ${ny * 28}px))`
        }
      },
      onPointerUp: () => {
        active = false
        controls.current.stickX = 0
        controls.current.stickY = 0
        const knob = document.getElementById('stick-knob')
        if (knob) knob.style.transform = 'translate(-50%, -50%)'
      },
    }
  }, [controls])

  const lookHandlers = useMemo(() => {
    let active = false
    let lastX = 0
    let lastY = 0
    return {
      onPointerDown: (e: ReactPointerEvent) => {
        active = true
        lastX = e.clientX
        lastY = e.clientY
        ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
      },
      onPointerMove: (e: ReactPointerEvent) => {
        if (!active) return
        controls.current.lookDX += e.clientX - lastX
        controls.current.lookDY += e.clientY - lastY
        lastX = e.clientX
        lastY = e.clientY
      },
      onPointerUp: () => {
        active = false
      },
    }
  }, [controls])

  return (
    <div className="museum-shell">
      <Canvas
        shadows
        camera={{ fov: 70, near: 0.1, far: 80, position: [0, 1.65, 4.5] }}
        onPointerDown={requestLock}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#14100c']} />
        <fog attach="fog" args={['#14100c', 22, 42]} />
        <Suspense fallback={null}>
          <MuseumWorld />
          <Player
            controls={controls}
            locked={locked || isTouch}
            onEra={setEra}
            onNearExhibit={setExhibitId}
          />
        </Suspense>
      </Canvas>

      {!started && !isTouch && (
        <div className="lock-prompt" onClick={requestLock}>
          <div className="lock-prompt__card">
            <h2>전시관 입장</h2>
            <p>화면을 클릭하면 시야를 조작할 수 있습니다. WASD로 네 시대 전시관을 걸어 다니세요.</p>
            <button type="button" className="landing__cta" onClick={requestLock}>
              클릭하여 시작
            </button>
          </div>
        </div>
      )}

      <HUD
        era={era}
        exhibitId={exhibitId}
        onExit={() => {
          if (document.pointerLockElement) document.exitPointerLock()
          onExit()
        }}
        showStick={isTouch}
        stickRef={stickHandlers}
        lookRef={lookHandlers}
      />
    </div>
  )
}
