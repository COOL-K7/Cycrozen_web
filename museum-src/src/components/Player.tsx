import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import type { MutableRefObject } from 'react'
import type { ControlState } from '../hooks/useControls'
import type { EraId } from '../data/eras'

const SPEED = 5.5
const LOOK_SENS = 0.0022
const TOUCH_LOOK = 0.0045
const EYE = 1.65
const BOUNDS = { minX: -22, maxX: 22, minZ: -22, maxZ: 22 }

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v))
}

function detectEra(x: number, z: number): EraId | 'plaza' {
  // Layout: center plaza |N paleolithic +Z| S neolithic -Z| W bronze -X| E iron +X
  if (Math.abs(x) < 5.5 && Math.abs(z) < 5.5) return 'plaza'
  if (z >= 5.5 && Math.abs(x) <= 10) return 'paleolithic'
  if (z <= -5.5 && Math.abs(x) <= 10) return 'neolithic'
  if (x <= -5.5 && Math.abs(z) <= 10) return 'bronze'
  if (x >= 5.5 && Math.abs(z) <= 10) return 'iron'
  if (z > Math.abs(x)) return 'paleolithic'
  if (z < -Math.abs(x)) return 'neolithic'
  if (x < 0) return 'bronze'
  return 'iron'
}

export default function Player({
  controls,
  locked,
  onEra,
  onNearExhibit,
}: {
  controls: MutableRefObject<ControlState>
  locked: boolean
  onEra: (era: EraId | 'plaza') => void
  onNearExhibit: (id: string | null) => void
}) {
  const { camera, gl } = useThree()
  const yaw = useRef(0)
  const pitch = useRef(0)
  const pos = useRef(new THREE.Vector3(0, EYE, 4.5))
  const eraRef = useRef<EraId | 'plaza'>('plaza')

  useEffect(() => {
    camera.position.copy(pos.current)
  }, [camera])

  useEffect(() => {
    const el = gl.domElement
    const onMove = (e: MouseEvent) => {
      if (!locked) return
      yaw.current -= e.movementX * LOOK_SENS
      pitch.current -= e.movementY * LOOK_SENS
      pitch.current = clamp(pitch.current, -1.2, 1.2)
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [gl, locked])

  useFrame((_, dt) => {
    const c = controls.current
    // Consume touch look deltas
    if (c.lookDX || c.lookDY) {
      yaw.current -= c.lookDX * TOUCH_LOOK
      pitch.current -= c.lookDY * TOUCH_LOOK
      pitch.current = clamp(pitch.current, -1.2, 1.2)
      c.lookDX = 0
      c.lookDY = 0
    }

    const forward = new THREE.Vector3(-Math.sin(yaw.current), 0, -Math.cos(yaw.current))
    const right = new THREE.Vector3(Math.cos(yaw.current), 0, -Math.sin(yaw.current))
    const move = new THREE.Vector3()

    if (c.forward) move.add(forward)
    if (c.backward) move.sub(forward)
    if (c.left) move.sub(right)
    if (c.right) move.add(right)

    // Virtual stick
    if (c.stickX || c.stickY) {
      move.addScaledVector(forward, -c.stickY)
      move.addScaledVector(right, c.stickX)
    }

    if (move.lengthSq() > 0) {
      move.normalize().multiplyScalar(SPEED * Math.min(dt, 0.05))
      pos.current.add(move)
      pos.current.x = clamp(pos.current.x, BOUNDS.minX, BOUNDS.maxX)
      pos.current.z = clamp(pos.current.z, BOUNDS.minZ, BOUNDS.maxZ)
      // Soft walls between corner voids
      if (Math.abs(pos.current.x) > 11 && Math.abs(pos.current.z) > 11) {
        if (Math.abs(pos.current.x) > Math.abs(pos.current.z)) {
          pos.current.x = Math.sign(pos.current.x) * 11
        } else {
          pos.current.z = Math.sign(pos.current.z) * 11
        }
      }
    }

    camera.position.copy(pos.current)
    camera.rotation.order = 'YXZ'
    camera.rotation.y = yaw.current
    camera.rotation.x = pitch.current

    const era = detectEra(pos.current.x, pos.current.z)
    if (era !== eraRef.current) {
      eraRef.current = era
      onEra(era)
    }

    // Exhibit proximity (world positions registered below)
    let nearest: string | null = null
    let best = 2.8
    for (const ex of EXHIBIT_POINTS) {
      const d = Math.hypot(pos.current.x - ex.x, pos.current.z - ex.z)
      if (d < best) {
        best = d
        nearest = ex.id
      }
    }
    onNearExhibit(nearest)
  })

  return null
}

/** World positions for plaque triggers */
export const EXHIBIT_POINTS: { id: string; x: number; z: number }[] = [
  // Paleolithic (+Z)
  { id: 'paleolithic-0', x: -3, z: 10 },
  { id: 'paleolithic-1', x: 0, z: 12 },
  { id: 'paleolithic-2', x: 3, z: 10 },
  { id: 'paleolithic-3', x: 0, z: 15 },
  // Neolithic (-Z)
  { id: 'neolithic-0', x: -3, z: -10 },
  { id: 'neolithic-1', x: 0, z: -12 },
  { id: 'neolithic-2', x: 3, z: -10 },
  { id: 'neolithic-3', x: 0, z: -15 },
  // Bronze (-X)
  { id: 'bronze-0', x: -10, z: -3 },
  { id: 'bronze-1', x: -12, z: 0 },
  { id: 'bronze-2', x: -10, z: 3 },
  { id: 'bronze-3', x: -15, z: 0 },
  // Iron (+X)
  { id: 'iron-0', x: 10, z: -3 },
  { id: 'iron-1', x: 12, z: 0 },
  { id: 'iron-2', x: 10, z: 3 },
  { id: 'iron-3', x: 15, z: 0 },
  // Plaza traps / comparison
  { id: 'plaza-compare', x: 0, z: -1.5 },
  { id: 'plaza-trap-0', x: -3.2, z: 3.2 },
  { id: 'plaza-trap-1', x: 0, z: 3.8 },
  { id: 'plaza-trap-2', x: 3.2, z: 3.2 },
]
