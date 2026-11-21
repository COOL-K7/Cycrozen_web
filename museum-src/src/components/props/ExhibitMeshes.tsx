import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Text } from '@react-three/drei'
import { KR_FONT } from '../../fonts'

function Pedestal({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.7, 1.1]} />
        <meshStandardMaterial color="#3a3228" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.72, 0]} receiveShadow>
        <boxGeometry args={[1.25, 0.06, 1.25]} />
        <meshStandardMaterial color="#4a4034" roughness={0.7} />
      </mesh>
    </group>
  )
}

function Label({
  position,
  text,
  color = '#e8d5b5',
}: {
  position: [number, number, number]
  text: string
  color?: string
}) {
  return (
    <Text
      position={position}
      font={KR_FONT}
      fontSize={0.22}
      color={color}
      anchorX="center"
      anchorY="middle"
      maxWidth={3}
      outlineWidth={0.015}
      outlineColor="#120e0a"
    >
      {text}
    </Text>
  )
}

/** Rough chipped hand axe */
export function HandAxe({ position }: { position: [number, number, number] }) {
  const geo = useMemo(() => {
    const g = new THREE.ConeGeometry(0.22, 0.55, 5)
    g.rotateX(Math.PI)
    return g
  }, [])
  return (
    <group position={position}>
      <Pedestal position={[0, 0, 0]} />
      <mesh geometry={geo} position={[0, 1.05, 0]} rotation={[0.2, 0.4, 0.1]} castShadow>
        <meshStandardMaterial color="#6a6e72" roughness={0.95} flatShading />
      </mesh>
      <Label position={[0, 1.55, 0]} text="주먹도끼" color="#7eb8d4" />
    </group>
  )
}

export function Chopper({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Pedestal position={[0, 0, 0]} />
      <mesh position={[0, 1.0, 0]} rotation={[0.5, 0.2, 0]} castShadow>
        <dodecahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial color="#5c6064" roughness={1} flatShading />
      </mesh>
      <Label position={[0, 1.5, 0]} text="찍개" color="#7eb8d4" />
    </group>
  )
}

export function PointTool({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Pedestal position={[0, 0, 0]} />
      <mesh position={[0, 1.05, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <coneGeometry args={[0.08, 0.55, 4]} />
        <meshStandardMaterial color="#7a7e82" roughness={0.9} flatShading />
      </mesh>
      <Label position={[0, 1.5, 0]} text="슴베찌르개" color="#7eb8d4" />
    </group>
  )
}

export function CaveShelter({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1.6, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshStandardMaterial color="#2a3038" roughness={1} side={THREE.DoubleSide} flatShading />
      </mesh>
      <mesh position={[0, 0.15, 0.9]}>
        <cylinderGeometry args={[0.2, 0.35, 0.3, 8]} />
        <meshStandardMaterial color="#1a1208" />
      </mesh>
      <pointLight position={[0, 0.5, 0.7]} color="#ff8030" intensity={2.5} distance={6} />
      <Label position={[0, 2.6, 0]} text="동굴·막집" color="#7eb8d4" />
    </group>
  )
}

export function CombPot({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Pedestal position={[0, 0, 0]} />
      <mesh position={[0, 1.05, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.18, 0.45, 16]} />
        <meshStandardMaterial color="#8a6a4a" roughness={0.85} />
      </mesh>
      {/* Comb pattern rings */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[0, 0.9 + i * 0.1, 0]}>
          <torusGeometry args={[0.225, 0.012, 6, 24]} />
          <meshStandardMaterial color="#5a4030" />
        </mesh>
      ))}
      <Label position={[0, 1.55, 0]} text="빗살무늬 토기" color="#8fd4a8" />
    </group>
  )
}

export function PitHouse({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.15, 0]} receiveShadow>
        <cylinderGeometry args={[1.8, 2.0, 0.3, 16]} />
        <meshStandardMaterial color="#3a4a38" roughness={1} />
      </mesh>
      <mesh position={[0, 1.1, 0]} castShadow>
        <coneGeometry args={[2.1, 1.6, 8]} />
        <meshStandardMaterial color="#5a7048" roughness={0.9} flatShading />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.2, 8]} />
        <meshStandardMaterial color="#2a1810" />
      </mesh>
      <pointLight position={[0, 0.6, 0]} color="#ff9040" intensity={1.8} distance={5} />
      <Label position={[0, 2.5, 0]} text="움집 (중앙 화덕)" color="#8fd4a8" />
    </group>
  )
}

export function SpindleWhirl({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Pedestal position={[0, 0, 0]} />
      <mesh position={[0, 1.0, 0]} castShadow>
        <torusGeometry args={[0.18, 0.07, 10, 20]} />
        <meshStandardMaterial color="#c4a878" roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.025, 0.025, 0.5, 8]} />
        <meshStandardMaterial color="#8a7050" />
      </mesh>
      <Label position={[0, 1.5, 0]} text="가락바퀴" color="#8fd4a8" />
    </group>
  )
}

export function GrainBundle({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Pedestal position={[0, 0, 0]} />
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          position={[Math.sin(i) * 0.12, 0.95 + (i % 2) * 0.05, Math.cos(i) * 0.12]}
          rotation={[0.3, i, 0.2]}
          castShadow
        >
          <cylinderGeometry args={[0.04, 0.05, 0.45, 6]} />
          <meshStandardMaterial color="#c8b050" roughness={0.8} />
        </mesh>
      ))}
      <Label position={[0, 1.55, 0]} text="잡곡 (조·피)" color="#8fd4a8" />
    </group>
  )
}

export function LuteSword({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Pedestal position={[0, 0, 0]} />
      <mesh position={[0, 1.15, 0]} rotation={[0, 0, 0.15]} castShadow>
        <boxGeometry args={[0.12, 0.7, 0.04]} />
        <meshStandardMaterial color="#b87333" metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.85, 0]} castShadow>
        <boxGeometry args={[0.28, 0.18, 0.05]} />
        <meshStandardMaterial color="#a06020" metalness={0.65} roughness={0.4} />
      </mesh>
      <Label position={[0, 1.7, 0]} text="비파형 동검" color="#d4a574" />
    </group>
  )
}

export function RoughMirror({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Pedestal position={[0, 0, 0]} />
      <mesh position={[0, 1.05, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.28, 0.04, 24]} />
        <meshStandardMaterial color="#c08040" metalness={0.8} roughness={0.3} />
      </mesh>
      <Label position={[0, 1.5, 0]} text="거친무늬 거울" color="#d4a574" />
    </group>
  )
}

export function HalfMoonKnife({ position }: { position: [number, number, number] }) {
  const geo = useMemo(() => new THREE.RingGeometry(0.12, 0.32, 20, 1, 0, Math.PI), [])
  return (
    <group position={position}>
      <Pedestal position={[0, 0, 0]} />
      <mesh geometry={geo} position={[0, 1.05, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <meshStandardMaterial color="#8a8a78" roughness={0.85} side={THREE.DoubleSide} />
      </mesh>
      <Label position={[0, 1.5, 0]} text="반달돌칼 ⚠" color="#f0c44c" />
    </group>
  )
}

export function Dolmen({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[-0.9, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 1.4, 0.5]} />
        <meshStandardMaterial color="#6a6058" roughness={1} flatShading />
      </mesh>
      <mesh position={[0.9, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 1.4, 0.5]} />
        <meshStandardMaterial color="#5a544c" roughness={1} flatShading />
      </mesh>
      <mesh position={[0, 1.55, 0]} castShadow>
        <boxGeometry args={[2.6, 0.35, 1.4]} />
        <meshStandardMaterial color="#7a7068" roughness={0.95} flatShading />
      </mesh>
      <Label position={[0, 2.3, 0]} text="고인돌" color="#d4a574" />
    </group>
  )
}

export function SlimSword({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Pedestal position={[0, 0, 0]} />
      <mesh position={[0, 1.15, 0]} castShadow>
        <boxGeometry args={[0.07, 0.75, 0.03]} />
        <meshStandardMaterial color="#a87840" metalness={0.75} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.72, 0]}>
        <boxGeometry args={[0.16, 0.08, 0.04]} />
        <meshStandardMaterial color="#8a6030" metalness={0.6} roughness={0.4} />
      </mesh>
      <Label position={[0, 1.7, 0]} text="세형동검" color="#c4a090" />
    </group>
  )
}

export function FineMirror({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Pedestal position={[0, 0, 0]} />
      <mesh position={[0, 1.05, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.26, 0.26, 0.035, 32]} />
        <meshStandardMaterial color="#d0a060" metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.07, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.18, 0.01, 8, 32]} />
        <meshStandardMaterial color="#8a6020" metalness={0.5} roughness={0.4} />
      </mesh>
      <Label position={[0, 1.5, 0]} text="잔무늬 거울" color="#c4a090" />
    </group>
  )
}

export function MingKnifeCoin({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Pedestal position={[0, 0, 0]} />
      <mesh position={[0, 1.0, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
        <boxGeometry args={[0.08, 0.55, 0.04]} />
        <meshStandardMaterial color="#8a7a40" metalness={0.5} roughness={0.45} />
      </mesh>
      <mesh position={[0.05, 1.15, 0]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.08, 0.45, 0.04]} />
        <meshStandardMaterial color="#9a8a50" metalness={0.5} roughness={0.45} />
      </mesh>
      <Label position={[0, 1.55, 0]} text="명도전" color="#c4a090" />
    </group>
  )
}

export function BrushAndMold({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Pedestal position={[0, 0, 0]} />
      <mesh position={[-0.15, 1.0, 0]} rotation={[0, 0, 0.4]} castShadow>
        <cylinderGeometry args={[0.02, 0.025, 0.5, 8]} />
        <meshStandardMaterial color="#4a3020" />
      </mesh>
      <mesh position={[0.2, 0.95, 0]} castShadow>
        <boxGeometry args={[0.35, 0.2, 0.12]} />
        <meshStandardMaterial color="#5a5a58" metalness={0.3} roughness={0.7} />
      </mesh>
      <Label position={[0, 1.5, 0]} text="다호리 붓·거푸집" color="#c4a090" />
    </group>
  )
}

export function FirePit({ position }: { position: [number, number, number] }) {
  const light = useRef<THREE.PointLight>(null)
  useFrame(({ clock }) => {
    if (light.current) {
      light.current.intensity = 1.8 + Math.sin(clock.elapsedTime * 4) * 0.4
    }
  })
  return (
    <group position={position}>
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.55, 0.65, 0.16, 10]} />
        <meshStandardMaterial color="#2a1a10" />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[Math.sin(i * 2.1) * 0.15, 0.25, Math.cos(i * 2.1) * 0.15]}>
          <coneGeometry args={[0.08, 0.35, 4]} />
          <meshStandardMaterial
            color="#ff6020"
            emissive="#ff4010"
            emissiveIntensity={0.8}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
      <pointLight ref={light} position={[0, 0.5, 0]} color="#ff7020" intensity={2} distance={8} />
    </group>
  )
}

export function StickyNote3D({
  position,
  title,
  color = '#f0c44c',
}: {
  position: [number, number, number]
  title: string
  color?: string
}) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[1.4, 1.0, 0.04]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      <Text
        position={[0, 0.1, 0.03]}
        font={KR_FONT}
        fontSize={0.14}
        color="#1a1008"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.2}
        lineHeight={1.3}
      >
        {title}
      </Text>
    </group>
  )
}

export function CompareWall({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[6, 2.8, 0.2]} />
        <meshStandardMaterial color="#2a2218" roughness={0.8} />
      </mesh>
      <Text
        position={[0, 1.0, 0.12]}
        font={KR_FONT}
        fontSize={0.35}
        color="#e8d5b5"
        anchorX="center"
      >
        한눈에 비교
      </Text>
      <Text
        position={[0, 0.35, 0.12]}
        font={KR_FONT}
        fontSize={0.16}
        color="#b5a894"
        anchorX="center"
        maxWidth={5}
        textAlign="center"
      >
        도구 · 토기 · 주거 · 경제 · 사회{'\n'}UI 버튼 또는 가까이 가서 확인
      </Text>
    </group>
  )
}
