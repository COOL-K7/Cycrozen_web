import { Text } from '@react-three/drei'
import { KR_FONT } from '../fonts'
import {
  HandAxe,
  Chopper,
  PointTool,
  CaveShelter,
  CombPot,
  PitHouse,
  SpindleWhirl,
  GrainBundle,
  LuteSword,
  RoughMirror,
  HalfMoonKnife,
  Dolmen,
  SlimSword,
  FineMirror,
  MingKnifeCoin,
  BrushAndMold,
  FirePit,
  StickyNote3D,
  CompareWall,
} from './props/ExhibitMeshes'

function HallFloor({
  position,
  size,
  color,
}: {
  position: [number, number, number]
  size: [number, number]
  color: string
}) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={position} receiveShadow>
      <planeGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.95} />
    </mesh>
  )
}

function HallWall({
  position,
  size,
  color,
}: {
  position: [number, number, number]
  size: [number, number, number]
  color: string
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.9} />
    </mesh>
  )
}

function HallTitle({
  position,
  text,
  color,
  rotation = [0, 0, 0] as [number, number, number],
}: {
  position: [number, number, number]
  text: string
  color: string
  rotation?: [number, number, number]
}) {
  return (
    <Text
      position={position}
      rotation={rotation}
      font={KR_FONT}
      fontSize={0.55}
      color={color}
      anchorX="center"
      outlineWidth={0.02}
      outlineColor="#0a0806"
    >
      {text}
    </Text>
  )
}

export function MuseumWorld() {
  return (
    <group>
      {/* Ambient + key lights */}
      <ambientLight intensity={0.72} />
      <hemisphereLight args={['#e8d8c0', '#2a2018', 0.7]} />
      <directionalLight
        position={[8, 16, 6]}
        intensity={1.15}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={40}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      {/* Central plaza */}
      <HallFloor position={[0, 0, 0]} size={[12, 12]} color="#2a2218" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[3.2, 3.4, 48]} />
        <meshStandardMaterial color="#d4a574" emissive="#8a5020" emissiveIntensity={0.15} />
      </mesh>
      <CompareWall position={[0, 1.5, -4.2]} />
      <StickyNote3D position={[-3.2, 1.6, 3.2]} title={'함정 ①\n농경≠벼농사'} />
      <StickyNote3D position={[0, 1.6, 3.8]} title={'함정 ②\n반달돌칼=청동기'} color="#f5d060" />
      <StickyNote3D position={[3.2, 1.6, 3.2]} title={'함정 ③\n비파형≠세형'} color="#e8c850" />
      <FirePit position={[0, 0, 0.5]} />
      <HallTitle position={[0, 3.4, -1]} text="비교의 광장" color="#e8d5b5" />

      {/* ===== 구석기 (+Z) ===== */}
      <HallFloor position={[0, 0, 13]} size={[16, 14]} color="#1e2830" />
      <HallWall position={[-8.2, 2, 13]} size={[0.4, 4, 14]} color="#243038" />
      <HallWall position={[8.2, 2, 13]} size={[0.4, 4, 14]} color="#243038" />
      <HallWall position={[0, 2, 19.8]} size={[16.8, 4, 0.4]} color="#1a2228" />
      <HallTitle position={[0, 3.4, 8]} text="구석기 시대" color="#7eb8d4" />
      <HandAxe position={[-3, 0, 10]} />
      <Chopper position={[0, 0, 12]} />
      <PointTool position={[3, 0, 10]} />
      <CaveShelter position={[0, 0, 15.5]} />
      <pointLight position={[0, 3, 12]} color="#6a90b0" intensity={1.2} distance={14} />

      {/* ===== 신석기 (-Z) ===== */}
      <HallFloor position={[0, 0, -13]} size={[16, 14]} color="#1e3024" />
      <HallWall position={[-8.2, 2, -13]} size={[0.4, 4, 14]} color="#243828" />
      <HallWall position={[8.2, 2, -13]} size={[0.4, 4, 14]} color="#243828" />
      <HallWall position={[0, 2, -19.8]} size={[16.8, 4, 0.4]} color="#1a281c" />
      <HallTitle position={[0, 3.4, -8]} text="신석기 시대" color="#8fd4a8" rotation={[0, Math.PI, 0]} />
      <CombPot position={[-3, 0, -10]} />
      <PitHouse position={[0, 0, -15]} />
      <SpindleWhirl position={[3, 0, -10]} />
      <GrainBundle position={[0, 0, -11.5]} />
      <pointLight position={[0, 3, -12]} color="#60a070" intensity={1.2} distance={14} />

      {/* ===== 청동기 (-X) ===== */}
      <HallFloor position={[-13, 0, 0]} size={[14, 16]} color="#302418" />
      <HallWall position={[-13, 2, -8.2]} size={[14, 4, 0.4]} color="#3a2c1c" />
      <HallWall position={[-13, 2, 8.2]} size={[14, 4, 0.4]} color="#3a2c1c" />
      <HallWall position={[-19.8, 2, 0]} size={[0.4, 4, 16.8]} color="#281c10" />
      <HallTitle position={[-8, 3.4, 0]} text="청동기 시대" color="#d4a574" rotation={[0, Math.PI / 2, 0]} />
      <LuteSword position={[-10, 0, -3]} />
      <RoughMirror position={[-12, 0, 0]} />
      <HalfMoonKnife position={[-10, 0, 3]} />
      <Dolmen position={[-15.5, 0, 0]} />
      <pointLight position={[-12, 3, 0]} color="#c08040" intensity={1.3} distance={14} />

      {/* ===== 철기 (+X) ===== */}
      <HallFloor position={[13, 0, 0]} size={[14, 16]} color="#28201e" />
      <HallWall position={[13, 2, -8.2]} size={[14, 4, 0.4]} color="#322826" />
      <HallWall position={[13, 2, 8.2]} size={[14, 4, 0.4]} color="#322826" />
      <HallWall position={[19.8, 2, 0]} size={[0.4, 4, 16.8]} color="#201816" />
      <HallTitle position={[8, 3.4, 0]} text="철기 시대" color="#c4a090" rotation={[0, -Math.PI / 2, 0]} />
      <SlimSword position={[10, 0, -3]} />
      <FineMirror position={[12, 0, 0]} />
      <MingKnifeCoin position={[10, 0, 3]} />
      <BrushAndMold position={[15.5, 0, 0]} />
      <pointLight position={[12, 3, 0]} color="#a08070" intensity={1.2} distance={14} />

      {/* Corridor accents */}
      <HallFloor position={[0, 0.005, 6.5]} size={[5, 3]} color="#252018" />
      <HallFloor position={[0, 0.005, -6.5]} size={[5, 3]} color="#252018" />
      <HallFloor position={[-6.5, 0.005, 0]} size={[3, 5]} color="#252018" />
      <HallFloor position={[6.5, 0.005, 0]} size={[3, 5]} color="#252018" />
    </group>
  )
}
