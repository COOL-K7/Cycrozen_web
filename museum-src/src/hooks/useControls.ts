import { useEffect, useRef } from 'react'

export type ControlState = {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
  stickX: number
  stickY: number
  lookDX: number
  lookDY: number
}

const KEY_MAP: Record<string, keyof ControlState> = {
  KeyW: 'forward',
  KeyS: 'backward',
  KeyA: 'left',
  KeyD: 'right',
  ArrowUp: 'forward',
  ArrowDown: 'backward',
  ArrowLeft: 'left',
  ArrowRight: 'right',
}

export function useControls() {
  const state = useRef<ControlState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    stickX: 0,
    stickY: 0,
    lookDX: 0,
    lookDY: 0,
  })

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      const k = KEY_MAP[e.code]
      if (k && typeof state.current[k] === 'boolean') {
        ;(state.current[k] as boolean) = true
        e.preventDefault()
      }
    }
    const onUp = (e: KeyboardEvent) => {
      const k = KEY_MAP[e.code]
      if (k && typeof state.current[k] === 'boolean') {
        ;(state.current[k] as boolean) = false
      }
    }
    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
    }
  }, [])

  return state
}
