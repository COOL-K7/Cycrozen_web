export type EraId = 'paleolithic' | 'neolithic' | 'bronze' | 'iron'

export interface EraInfo {
  id: EraId
  name: string
  short: string
  color: string
  accent: string
  mood: string
  tools: string
  pottery: string
  housing: string
  economy: string
  society: string
  sites: string
  clue: string
  exhibits: { title: string; detail: string }[]
}

export const ERAS: EraInfo[] = [
  {
    id: 'paleolithic',
    name: '구석기 시대',
    short: '구석기',
    color: '#3a4a5c',
    accent: '#7eb8d4',
    mood: '차가운 동굴·모닥불',
    tools: '뗀석기 (주먹도끼·찍개·슴베찌르개)',
    pottery: '없음',
    housing: '동굴·바위그늘·막집 / 이동생활',
    economy: '사냥·채집·어로',
    society: '무리, 평등',
    sites: '연천 전곡리, 공주 석장리',
    clue: '뗀석기 · 이동생활 · 사냥·채집',
    exhibits: [
      { title: '주먹도끼', detail: '양면을 깨뜨려 만든 대표적인 뗀석기' },
      { title: '찍개', detail: '한쪽을 깨뜨려 찍고 쪼개는 도구' },
      { title: '슴베찌르개', detail: '슴베가 있어 자루에 끼워 쓰는 찌르개' },
      { title: '동굴 주거', detail: '동굴·바위그늘·막집에서 이동하며 생활' },
    ],
  },
  {
    id: 'neolithic',
    name: '신석기 시대',
    short: '신석기',
    color: '#2d5a45',
    accent: '#8fd4a8',
    mood: '강가 움집·빗살무늬',
    tools: '간석기, 가락바퀴, 뼈바늘',
    pottery: '빗살무늬 토기 (이른민무늬·덧무늬)',
    housing: '움집, 중앙 화덕 / 정착',
    economy: '잡곡(조·피) 농경 시작 + 사냥·어로',
    society: '씨족·평등 / 애니미즘·토테미즘·샤머니즘',
    sites: '서울 암사동, 부산 동삼동',
    clue: '간석기 · 빗살무늬 · 잡곡 농경(벼 아님!)',
    exhibits: [
      { title: '빗살무늬 토기', detail: '한반도 신석기를 대표하는 토기. 이른민무늬·덧무늬도 공존' },
      { title: '움집', detail: '땅을 파고 지은 집, 중앙에 화덕' },
      { title: '가락바퀴', detail: '실을 잣는 도구 — 직물 생활의 증거' },
      { title: '잡곡 농경', detail: '조·피 등 잡곡. ※ 벼농사는 청동기!' },
    ],
  },
  {
    id: 'bronze',
    name: '청동기 시대',
    short: '청동기',
    color: '#6b4a2a',
    accent: '#d4a574',
    mood: '고인돌·비파형 동검',
    tools: '비파형 동검·거친무늬 거울·청동방울(의기) / 반달돌칼',
    pottery: '민무늬 토기',
    housing: '직사각 움집→지상화, 화덕 벽쪽',
    economy: '벼농사 시작, 잉여 생산',
    society: '계급·군장, 고인돌',
    sites: '부여 송국리, 고창·화순·강화 고인돌',
    clue: '비파형 동검 · 벼농사 · 고인돌·군장',
    exhibits: [
      { title: '비파형 동검', detail: '비파 모양의 청동 칼 — 의례·권력의 상징' },
      { title: '거친무늬 거울', detail: '기하무늬가 거친 청동거울 (의기)' },
      { title: '반달돌칼', detail: '벼 이삭을 따는 석기. ※ 청동기 농기구 함정!' },
      { title: '고인돌', detail: '군장 사회의 무덤. 고창·화순·강화' },
    ],
  },
  {
    id: 'iron',
    name: '철기 시대',
    short: '철기',
    color: '#4a3a3a',
    accent: '#c4a090',
    mood: '철제 도구·명도전·연맹왕국',
    tools: '철제 농기구·무기 / 세형동검·잔무늬 거울·거푸집',
    pottery: '와질 토기 등',
    housing: '지상 가옥, 취락 확대',
    economy: '철제 농기구로 생산력 증대, 대외 교류',
    society: '연맹왕국·정복전쟁 성장',
    sites: '창원 다호리 (붓), 명도전 출토지',
    clue: '철제 도구 · 세형동검 · 연맹왕국',
    exhibits: [
      { title: '세형동검', detail: '비파형보다 날씬한 동검 — 철기 시대 표지' },
      { title: '잔무늬 거울', detail: '세밀한 무늬의 청동거울' },
      { title: '명도전', detail: '중국 화폐 — 대외 교류의 증거' },
      { title: '다호리 붓', detail: '창원 다호리 출토. 문자 사용의 가능성' },
    ],
  },
]

export const COMPARISON_ROWS = [
  { key: 'tools', label: '도구' },
  { key: 'pottery', label: '토기' },
  { key: 'housing', label: '주거' },
  { key: 'economy', label: '경제' },
  { key: 'society', label: '사회' },
] as const

export const TRAPS = [
  {
    id: 'farm',
    title: '함정 ① 농경 ≠ 벼농사',
    body: '신석기 = 잡곡(조·피) 농경 시작. 벼농사 시작은 청동기!',
  },
  {
    id: 'knife',
    title: '함정 ② 반달돌칼',
    body: '돌로 만들었지만 청동기 시대 농기구. 석기≠구석기/신석기만 아님.',
  },
  {
    id: 'sword',
    title: '함정 ③ 비파형 vs 세형',
    body: '비파형 동검 = 청동기. 세형동검 = 철기. 모양으로 시대를 가른다.',
  },
]

export const QUIZ: { clue: string; answer: EraId; distractors: EraId[] }[] = [
  {
    clue: '빗살무늬 토기와 움집, 중앙 화덕이 보인다.',
    answer: 'neolithic',
    distractors: ['paleolithic', 'bronze'],
  },
  {
    clue: '벼농사가 시작되고 고인돌이 등장한다.',
    answer: 'bronze',
    distractors: ['neolithic', 'iron'],
  },
  {
    clue: '주먹도끼·찍개 등 뗀석기를 쓰고 이동한다.',
    answer: 'paleolithic',
    distractors: ['neolithic', 'bronze'],
  },
  {
    clue: '세형동검과 명도전이 나오고 연맹왕국이 성장한다.',
    answer: 'iron',
    distractors: ['bronze', 'neolithic'],
  },
  {
    clue: '반달돌칼로 벼 이삭을 딴다.',
    answer: 'bronze',
    distractors: ['neolithic', 'paleolithic'],
  },
]
