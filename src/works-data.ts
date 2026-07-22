// ============================================================================
// Works Data — 작품 상세 데이터 (2026-Q2 포트폴리오 PDF 원문 전사)
// 영상은 추후 video 필드에 Vimeo/YouTube URL 또는 /videos/ 로컬 경로를 넣으면
// 상세 페이지에 자동으로 임베드됩니다. (videoPassword는 선택 사항)
// ============================================================================

export type WorkCategory = 'feature' | 'short' | 'documentary';

export interface WorkCredit {
  role: string;
  name: string;
}

export interface WorkSpec {
  label: string;
  value: string;
}

export interface Work {
  slug: string;
  titleKo: string;
  titleEn: string;
  year: string;
  category: WorkCategory;
  categoryLabel: string;
  genre: string;
  runtime: string;
  format: string;
  role: string;
  director: string;
  note?: string; // 개봉 정보 등
  card: string;
  stills: string[];
  synopsis: string;
  intent: string;
  specs: WorkSpec[]; // 프로덕션 스펙 (있는 경우)
  credits: WorkCredit[];
  awards: string[];
  invitations: string[];
  quote?: string;
  quoteSource?: string;
  video: string;
  videoPassword?: string;
}

const S = (slug: string, n: number) =>
  Array.from({ length: n }, (_, i) => `/stills/${slug}/${i + 1}.jpg`);

export const works: Work[] = [
  {
    slug: 'be-my-baby',
    titleKo: '미아',
    titleEn: 'BE MY BABY',
    year: '2026',
    category: 'feature',
    categoryLabel: 'Feature Film',
    genre: 'Film Noir',
    runtime: '98min',
    format: '2.39:1 · Digital 4K',
    role: 'Cinematographer',
    director: '유종석',
    note: '2026 극장 개봉 예정',
    card: '/work-1.jpg',
    stills: S('be-my-baby', 6),
    synopsis:
      '병원 원무과에서 진료비를 횡령하며 뇌사 상태인 쌍둥이 자매 희림의 병원비를 감당해오던 서림. 횡령을 눈치챈 직장 동료 주현의 협박까지 조여오자, 희림의 사망 보험금을 타내고 그녀의 신분으로 살아가기 위해 노숙 소녀 숨이를 유인해 대역 시신으로 만들 계획을 세운다. 우발적인 살인 이후 완전한 공범이 된 두 사람은 보험금을 챙겨 길을 떠나지만, 희림의 신분으로 완벽히 탈바꿈한 숨이가 홀연히 자취를 감춘다. 정체성과 희망을 모두 상실한 채 텅 빈 상태로 남겨진 서림을 비추며 이야기는 서늘한 결말을 맞이한다.',
    intent:
      '등장 인물들의 처지와 어두운 사건에 걸맞게 전반적으로 다소 어둡고 강한 대비의 룩을 목표로 했고, 각 인물을 표현하는 컬러의 대비도 적극적으로 활용했다. 2색 테크니컬러 필름의 룩에서 영감을 받아 마젠타와 청록을 각각 서림과 숨이의 키 컬러로 정해 각자의 공간에 적용했고, 영화 전반의 컬러 팔레트 역시 두 색을 기반으로 설계했다. 2.39:1 화면비는 시원한 넓은 화면을 보여주기 위해서가 아니라, 양극에서 대립하는 두 인물의 심리적 거리와 대칭성을 보여주기 위한 선택이었다. 치밀하게는 트랙 뿐 아니라 일정한 느린 속도의 줌인을 반복적으로 사용해 70년대 심리 느와르의 매력을 차용하는 한편, 인물에게 지속적인 푸쉬인을 가함으로써 압박을 시각화하고 미스테리한 분위기를 강조했다. 프리 프로덕션 기간 총 10회의 비주얼 플랜 회의를 거쳤고, 매 회차 컬러리스트가 동행해 씬별 LUT 기반 현장 색보정을 실행했다.',
    specs: [
      { label: 'CAMERA', value: 'ARRI Alexa Mini' },
      { label: 'LENSES', value: 'Cooke Panchro Classic · Cooke Varotal Zoom' },
      { label: 'RECORDING', value: 'ARRIRAW 3.4K' },
      { label: 'ASPECT RATIO', value: '2.39 : 1' },
      { label: 'SHOOTING', value: '2024.09.01 – 09.28 (16회차)' },
      { label: 'FINAL FORMAT', value: 'DCP (2025)' },
    ],
    credits: [
      { role: '연출', name: '유종석' },
      { role: '프로듀서', name: '김용선' },
      { role: '촬영', name: '김비오' },
      { role: '조명', name: '이정훈' },
      { role: '색보정', name: '박찬우' },
      { role: '제작', name: '앤드마크 스튜디오' },
    ],
    awards: [],
    invitations: ['2025 부산국제영화제 공식 초청'],
    quote:
      '<미아>는 범죄물을 위장한 저독한 생존기이다. 무서울 정도로 무겁게 날아앉은 우울과 외로움에 맨몸으로 노출된 인물들의 서러운 생존기가 녹진한 공기를 머금고 스크린을 전영시킨다.',
    quoteSource: '홍은미 | 평론가',
    video: '',
  },
  {
    slug: 'coming-of-age',
    titleKo: '철들 무렵',
    titleEn: 'COMING OF AGE',
    year: '2026',
    category: 'feature',
    categoryLabel: 'Feature Film',
    genre: 'Drama',
    runtime: '105min',
    format: '1.85:1 · Digital 4K',
    role: 'Director of Photography',
    director: '정승오',
    note: '2026 극장 개봉 예정',
    card: '/work-2.jpg',
    stills: S('coming-of-age', 4),
    synopsis:
      '늦게야 철이 드는 어른들의 이야기. 가족이라는 이름으로 묶여 있지만 서로를 온전히 알지 못했던 인물들이 일상의 균열 속에서 조금씩 서로를 마주하게 된다. 개인의 얼굴로 출발해 가족의 초상으로, 그리고 우리 모두의 사실적인 초상화로 확장되는 드라마.',
    intent:
      '사실적인 초상화라는 목표에 맞춰 꾸미지 않은 자연스러운 빛을 기본으로 했다. 인물에게 과도하게 개입하기보다 적당한 거리를 유지하는 관찰자의 프레임을 지향했고, 1.85:1 화면 안에서 인물과 공간이 서로를 설명하도록 구성했다. 가족이 함께 있는 장면에서는 누구 하나 튀지 않는 앙상블의 균형을, 혼자 남겨지는 순간에는 화면의 여백으로 감정을 전하려 했다.',
    specs: [
      { label: 'CAMERA', value: 'RED Komodo' },
      { label: 'LENSES', value: '확인 필요' },
      { label: 'RECORDING', value: 'Digital 4K' },
      { label: 'ASPECT RATIO', value: '1.85 : 1' },
    ],
    credits: [
      { role: '연출', name: '정승오' },
      { role: '촬영', name: '김비오' },
    ],
    awards: [
      '2025 부산국제영화제 — 한국영화감독조합 플러스엠상',
      '2025 부산국제영화제 — 송원 시민평론가상',
    ],
    invitations: [
      '2025 서울독립영화제',
      '2025 남도영화제 — 개막작',
      '2026 전주국제영화제',
    ],
    quote:
      '<철들 무렵>은 개인에 대한 영화이면서, 가족에 대한 영화이다. 그리고, 우리들을 비추고 있는 사실적인 초상화이다.',
    quoteSource: '문주화 | 평론가',
    video: '',
  },
  {
    slug: 'green-concrete',
    titleKo: '콘크리트 녹색섬',
    titleEn: 'GREEN CONCRETE',
    year: '2026',
    category: 'documentary',
    categoryLabel: 'Documentary',
    genre: 'Documentary',
    runtime: '108min',
    format: '1.9:1 · Digital 2K',
    role: 'Director of Photography',
    director: '이성민',
    note: '2026 극장 개봉 예정',
    card: '/work-3.jpg',
    stills: S('green-concrete', 4),
    synopsis:
      '콘크리트 숲 사이에 남은 녹색 섬 — 도시 한복판에서 수십 년을 자라온 나무들이 벌목과 재개발의 위기에 놓인다. 그 나무들을 지키려는 사람들의 시간을 따라가며, 도시와 자연이 공존할 수 있는 조건을 묻는 다큐멘터리.',
    intent:
      '드론을 적극적으로 활용해 도시 전체를 조망하는 시선과 나무 숲 안쪽의 미감을 함께 담고자 했다. 다큐멘터리인 만큼 주어진 자연광과 계절의 변화를 있는 그대로 받아들이되, 나무의 높이와 결을 살리는 앵글로 관찰의 밀도를 높였다. 콘크리트의 차가운 질감과 잎사귀 사이로 스미는 빛의 대비가 이 영화의 핵심적인 시각 언어다.',
    specs: [
      { label: 'CAMERA', value: '확인 필요' },
      { label: 'LENSES', value: '확인 필요' },
      { label: 'RECORDING', value: 'Digital 2K' },
      { label: 'ASPECT RATIO', value: '1.9 : 1' },
    ],
    credits: [
      { role: '연출', name: '이성민' },
      { role: '촬영', name: '김비오' },
    ],
    awards: [
      '2022 서울국제여성영화제 — 다큐멘터리 옥랑문화상',
      '2023 EBS 국제다큐영화제 — 인더스트리 초이스상',
      '2025 서울국제환경영화제 — 심사위원 특별언급',
    ],
    invitations: ['2025 서울국제건축영화제'],
    quote:
      '드론을 적극 활용해 전체를 조망하고 미감 있게 나무 숲을 담아낸 촬영감독 김비오의 솜씨 또한 돋보인다. 그가 앞서 언급한 <묵인>의 촬영을 맡기도 했다는 점에서, 두 영화가 은근한 접점을 가진 사실도 엿볼 수가 있겠다.',
    quoteSource: '김성호 | 평론가',
    video: '',
  },
  {
    slug: 'not-one-not-two',
    titleKo: '벗어날 탈 脫',
    titleEn: 'NOT ONE AND NOT TWO',
    year: '2024',
    category: 'feature',
    categoryLabel: 'Feature Film',
    genre: 'Mystery',
    runtime: '73min',
    format: '1.37:1 · Digital 2K',
    role: 'Cinematographer',
    director: '서보형',
    note: '2024 극장 개봉작',
    card: '/work-4.jpg',
    stills: S('not-one-not-two', 6),
    synopsis:
      '어느 날 자취를 감춘 한 사람, 그리고 남겨진 이들. 사라진 자의 흔적을 좇을수록 끝이라 믿었던 것들이 다시 인연으로 되돌아오는 순환의 구조가 드러난다. 소멸과 종결이 꼬리를 물고 이어지는 만다라 같은 미스터리.',
    intent:
      '소멸과 순환이라는 주제에 맞게 프레임 자체를 하나의 만다라처럼 설계하고자 했다. 1.37:1의 정방형에 가까운 화면 안에서 대칭과 반복의 구도를 적극적으로 사용했고, 어둠 속에 여백을 남겨 사라진 것의 존재감을 시각화했다. 조명은 최소한으로 억제해 인물보다 공간과 그림자가 먼저 보이도록 했고, 미스터리의 정체가 풀리는 순간까지 룩의 톤이 크게 흔들리지 않도록 일관성을 유지했다.',
    specs: [
      { label: 'CAMERA', value: '확인 필요' },
      { label: 'LENSES', value: '확인 필요' },
      { label: 'RECORDING', value: 'Digital 2K' },
      { label: 'ASPECT RATIO', value: '1.37 : 1' },
    ],
    credits: [
      { role: '연출', name: '서보형' },
      { role: '촬영', name: '김비오' },
    ],
    awards: [
      '2021 서울독립영화제 — 넥스트링크상',
      '2023 LA국제실험영화제 — 작품상 포함 3개 부문 수상',
      '2024 들꽃영화상 — 음악상',
      '2024 이동진 평론가 선정 — 2024 한국 영화 BEST 10 2위',
    ],
    invitations: [
      '2021 부산국제영화제',
      '2022 세계일화국제불교영화제',
      '2023 THIS(Thus Have I Seen) 국제불교영화제',
    ],
    quote:
      '소멸과 종결이 인연과 순환으로 꼬리를 무는 정밀하면서 신비한 만다라 같다.',
    quoteSource: '이동진 | 평론가',
    video: '',
  },
  {
    slug: 'light-it-up',
    titleKo: '새벽 두시에 불을 붙여',
    titleEn: 'LIGHT IT UP AT 2 A.M.',
    year: '2022',
    category: 'short',
    categoryLabel: 'Short Film',
    genre: 'Thriller',
    runtime: '19min',
    format: '1.37:1 · Digital 4K',
    role: 'Cinematographer',
    director: '유종석',
    card: '/work-5.jpg',
    stills: S('light-it-up', 6),
    synopsis:
      '1995년 한 여자 기숙학원의 실제 방화사건을 배경으로 한다. 유림은 자유가 없는 화원여자기숙학원을 탈출하고자 새벽 2시에 불을 붙일 계획을 세우고, 유림을 필두로 주변 아이들이 연대한다.',
    intent:
      '닫힌 기숙학원의 공간을 지배하는 차갑고 균일한 빛과, 새벽 2시에 점화되는 불꽃의 뜨겁고 불규칙한 빛 — 이 두 조명 체계의 대비를 영화의 뼈대로 삼았다. 1.37:1 화면이 만들어내는 폐쇄감은 아이들이 갇혀 있는 공간의 성격 그 자체였고, 통제된 화면 안에서 화염만이 유일하게 통제를 벗어나는 요소가 되도록 설계했다. 무감정하게 눌러 담은 목소리 톤에 맞춰, 침묵하는 미장센이 폭발 직전의 긴장을 유지하도록 촬영했다.',
    specs: [
      { label: 'CAMERA', value: '확인 필요' },
      { label: 'LENSES', value: '확인 필요' },
      { label: 'RECORDING', value: 'Digital 4K' },
      { label: 'ASPECT RATIO', value: '1.37 : 1' },
    ],
    credits: [
      { role: '연출', name: '유종석' },
      { role: '촬영', name: '김비오' },
    ],
    awards: [
      '2022 청룡영화상 — 단편영화상',
      '2022 전주국제영화제 — 왓챠가 주목한 단편상',
      '2022 대구단편영화제 — 대상',
      '2022 금천패션영화제 — 대상',
      '2022 대한민국단편영화제 — KT&G 금관상',
      '2022 충무로영화제 감독주간 — 올해의 작품상 · 올해의 촬영/조명상',
    ],
    invitations: [
      '2022 몬테카티니국제단편영화제',
      '2022 서울국제프라이드영화제',
      '2022 평창국제평화영화제',
      '2022 서울독립영화제',
      '2022 정동진독립영화제',
      '2022 썸머프라이드시네마2022',
      '2023 LES NUITS EN OR (Académie des César)',
      '2023 판타지아국제영화제',
    ],
    quote:
      '그 과정 중 누군가는 내신 기대를 단 하나의 웃음도 내어주지 않는다. 대신 강렬한 미장센과 무감정한 목소리로 이들에게는 단 하나의 목표만 있음을 알린다.',
    quoteSource: '이재은 | 영화감독',
    video: '',
  },
  {
    slug: 'tongue',
    titleKo: '혀',
    titleEn: 'TONGUE',
    year: '2025',
    category: 'short',
    categoryLabel: 'Short Film',
    genre: 'Horror',
    runtime: '15min',
    format: '1.66:1 · Digital 4K',
    role: 'Cinematographer',
    director: '임다슬',
    card: '/work-6.jpg',
    stills: S('tongue', 5),
    synopsis:
      '한국 가정의 식탁에서 늘 말문이 막히는 여자. 목소리를 낼 때마다 가로막히는 일상 속에서 억눌린 말들이 쌓여가고, 그녀의 세계는 기괴하고 초현실적인 악몽으로 뒤틀리기 시작한다. 만스플레인의 성 역학을 한국 가정의 사적인 서사로 옮겨온 호러.',
    intent:
      '익숙한 가정 공간이 낯설고 위협적인 공간으로 변해가는 과정을 시각화하는 것이 목표였다. 일상의 조명을 유지하되 점차 그림자의 비율을 늘려가며 공간의 온도를 바꿨고, 신체와 사물의 클로즈업을 교차시켜 초현실적인 질감을 쌓았다. 1.66:1 화면은 인물을 옥죄는 수직의 압박과 가정 공간의 밀도를 동시에 담기 위한 선택이었다.',
    specs: [
      { label: 'CAMERA', value: '확인 필요' },
      { label: 'LENSES', value: '확인 필요' },
      { label: 'RECORDING', value: 'Digital 4K' },
      { label: 'ASPECT RATIO', value: '1.66 : 1' },
    ],
    credits: [
      { role: '연출', name: '임다슬' },
      { role: '촬영', name: '김비오' },
    ],
    awards: [
      '2025 부천국제판타스틱영화제 — 단편작품상',
      '2025 대한민국단편영화제 — KT&G 은관상',
      '2025 2030청년영화제 — 금상',
      '2026 SXSW — 미드나잇 쇼츠 심사위원상',
    ],
    invitations: [
      '2025 시체스영화제',
      '2025 대구단편영화제',
      '2026 판타지아국제영화제',
      '2026 브뤼셀국제판타스틱영화제',
      '2026 쇼트쇼츠국제단편영화제',
      '2026 밀워키영화제',
      '2026 브뤼셀단편영화제',
      '2026 웬치영화제',
    ],
    quote:
      'While transposing the universal gender dynamic of mansplaining into the intimate domestic narrative of a Korean household, the film achieves genre-level sophistication through surreal visuals and meticulous sound design — a "genre universality" that transcends cultural context.',
    quoteSource: 'Korean Film News',
    video: '',
  },
  {
    slug: 'treeman',
    titleKo: '묵인',
    titleEn: 'TREEMAN',
    year: '2025',
    category: 'short',
    categoryLabel: 'Short Film',
    genre: 'Fantasy',
    runtime: '30min',
    format: '1.33:1 · Digital 4K',
    role: 'Director of Photography',
    director: '이명현',
    card: '/stills/treeman/2.jpg',
    stills: S('treeman', 6),
    synopsis:
      '수십 년간 자란 나무들이 늘어선 숲에 어느 날 벌목의 그림자가 드리운다. 숲을 떠나지 못하는 한 남자와 말없이 서 있는 나무들, 그리고 이를 바라볼 뿐인 사람들의 침묵이 판타지적 상상력 속에서 만난다.',
    intent:
      '수십 년을 자라온 나무 숲 그 자체가 최고의 미장센이라는 판단 아래, 자연광과 잎 사이로 새어 나오는 빛을 최대한 활용했다. 1.33:1 화면은 나무의 수직적인 높이와 인물의 왜소함을 대비시키기 위한 선택이었고, 숲을 향해 움직이는 중장비와 인물의 동선은 정적인 프레임 안에서 대조되도록 설계했다. 판타지 장르이지만 CG가 아닌 실제 숲의 질감으로 이야기하고 싶었다.',
    specs: [
      { label: 'CAMERA', value: '확인 필요' },
      { label: 'LENSES', value: '확인 필요' },
      { label: 'RECORDING', value: 'Digital 4K' },
      { label: 'ASPECT RATIO', value: '1.33 : 1' },
    ],
    credits: [
      { role: '연출', name: '이명현' },
      { role: '촬영', name: '김비오' },
    ],
    awards: ['2025 전주국제단편영화제 — 꽃심상'],
    invitations: ['2025 전주국제영화제'],
    quote:
      '수십 년간 자란 나무가 늘어선 숲속 미장센은 더할 나위 없이 아름답다. 영화를 보는 내심 현실의 무분별한 벌목이 떠오르지 않을 수가 없었다.',
    quoteSource: '안하늘 | 무명씨네 대표',
    video: '',
  },
  {
    slug: 'the-last-name',
    titleKo: '과화만사성',
    titleEn: 'GHWA THE LAST NAME',
    year: '2023',
    category: 'short',
    categoryLabel: 'Short Film',
    genre: 'Drama',
    runtime: '32min',
    format: '1.85:1 · Digital 4K',
    role: 'Cinematographer',
    director: '유재인',
    card: '/stills/the-last-name/2.jpg',
    stills: S('the-last-name', 4),
    synopsis:
      '같은 집에서 자랐지만 서로 다른 기질로 살아온 네 인물. 하나의 성씨 아래 묶인 이들이 한 공간에 모이면서 묵은 갈등이 수면 위로 떠오르고, 각자의 시대가 담긴 온도 차가 드러난다. 친숙한 갈등이 주는 재미와 씁쓸함이 공존하는 가족 드라마.',
    intent:
      '같은 집이라는 하나의 공간 안에서 네 인물 각각의 온도가 다르게 느껴지도록 조명의 톤을 설계했다. 실제 생활 공간의 광원을 기반으로 한 내추럴한 룩을 유지하되, 인물이 대립하는 장면에서는 화면 속 거리와 차폐를 활용해 관계의 균열을 보여주고자 했다. 1.85:1 화면은 가족이 한 프레임에 모이는 식탁 장면의 앙상블을 담기에 적합한 선택이었다.',
    specs: [
      { label: 'CAMERA', value: '확인 필요' },
      { label: 'LENSES', value: '확인 필요' },
      { label: 'RECORDING', value: 'Digital 4K' },
      { label: 'ASPECT RATIO', value: '1.85 : 1' },
    ],
    credits: [
      { role: '연출', name: '유재인' },
      { role: '촬영', name: '김비오' },
    ],
    awards: [
      '2023 청룡영화상 — 단편영화상',
      '2023 부천국제판타스틱영화제 — 왓챠가 주목한 단편상',
      '2023 제주혼듸독립영화제 — 혼듸피플상',
      '2023 광주여성영화제 — 관객상',
    ],
    invitations: [
      '2023 대구단편영화제',
      '2023 부산여성영화제',
      '2023 남도영화제',
      '2024 서울국제프라이드영화제',
      '2024 썸머프라이드시네마2024',
      '2024 서울여성독립영화제',
      '2024 LES NUITS EN OR (Académie des César)',
    ],
    quote:
      '같은 집 안에서 자랐지만 서로 다른 기질을 가진 네 인물에는 시대상이 반영되어 있고, 그런 인물들 사이의 갈등이 친숙하기에 주는 재미가 있다.',
    quoteSource: '송은지 | 프로그래머',
    video: '',
  },
  {
    slug: 'framily',
    titleKo: '그렇고 그런 사이',
    titleEn: 'FRAMILY',
    year: '2022',
    category: 'short',
    categoryLabel: 'Short Film',
    genre: 'Drama / Comedy',
    runtime: '30min',
    format: '1.85:1 · Digital 4K',
    role: 'Cinematographer',
    director: '김인혜',
    card: '/stills/framily/2.jpg',
    stills: S('framily', 4),
    synopsis:
      '혈연은 아니지만 식구처럼 붙어 사는 사람들. 음식을 나누고 소소한 갈등을 겪으며 이들은 그렇고 그런 사이에서 진짜 가족이 되어간다. 사랑할 수밖에 없는 캐릭터들의 하모니가 축제 같은 통쾌함을 선사하는 코미디 드라마.',
    intent:
      '캐릭터들의 하모니가 돋보이는 작품인 만큼 친근하고 따뜻한 톤의 밝은 룩을 지향했다. 코미디의 리듬을 방해하지 않도록 침착하게 인물들을 따라가는 프레임을 유지했고, 함께 음식을 나누는 식탁 장면에서는 모두가 한 화면에 어우러지는 앙상블 구도를 중심에 두었다. 갈등의 날카로움보다 사람의 온기가 먼저 전해지는 화면을 만들고자 했다.',
    specs: [
      { label: 'CAMERA', value: '확인 필요' },
      { label: 'LENSES', value: '확인 필요' },
      { label: 'RECORDING', value: 'Digital 4K' },
      { label: 'ASPECT RATIO', value: '1.85 : 1' },
    ],
    credits: [
      { role: '연출', name: '김인혜' },
      { role: '촬영', name: '김비오' },
    ],
    awards: ['2022 전주국제영화제 — 왓챠가 주목한 단편상'],
    invitations: [
      '2022 서울국제여성영화제',
      '2022 서울국제음식영화제',
      '2022 함천수련한영화제',
      '2022 목포국도1호선독립영화제',
      '2022 전북가족영화제 — 개막작',
      '2022 제주여성영화제',
      '2022 건닛마을영화제',
      '2023 여성인권영화제',
    ],
    quote:
      '영화는 공감할 수밖에 없는 이야기와 웃음들의 폭격이다. 갈등의 날카로움을 최소화하는 대신, 그 자리를 사랑할 수밖에 없는 캐릭터들의 하모니로 가득 채우며 축제 같은 통쾌함을 선사한다.',
    quoteSource: '이재은 | 영화감독',
    video: '',
  },
  {
    slug: 'time-to-dilate',
    titleKo: '확장기',
    titleEn: 'TIME TO DILATE',
    year: '2024',
    category: 'short',
    categoryLabel: 'Short Film',
    genre: 'Fantasy / Sci-Fi',
    runtime: '22min',
    format: '1.66:1 · Digital 2K',
    role: 'Director of Photography',
    director: '김나영',
    card: '/stills/time-to-dilate/1.jpg',
    stills: S('time-to-dilate', 5),
    synopsis:
      '두 사람의 관계가 깊어질수록 시간이 팽창하기 시작한다. 피부와 정맥, 플라스틱, 바다와 모래가 서로 스며드는 세계에서, 두 사람은 늘어진 시간 속에 함께 머무는 법을 배운다. 퀴어한 관계성을 환상적인 상상력으로 풀어낸 SF.',
    intent:
      '피부, 정맥, 플라스틱, 바다, 모래라는 서로 다른 질감이 하나의 이미지 안에서 연결되고 섞이는 순간을 만드는 것이 목표였다. 매크로에 가까운 클로즈업과 넓은 풍경을 교차시켜 신체와 세계의 경계를 허물었고, 채도를 적극적으로 활용한 컬러 설계로 시간이 팽창하는 몽환적인 감각을 표현했다.',
    specs: [
      { label: 'CAMERA', value: '확인 필요' },
      { label: 'LENSES', value: '확인 필요' },
      { label: 'RECORDING', value: 'Digital 2K' },
      { label: 'ASPECT RATIO', value: '1.66 : 1' },
    ],
    credits: [
      { role: '연출', name: '김나영' },
      { role: '촬영', name: '김비오' },
    ],
    awards: [],
    invitations: [
      '2024 밴쿠버국제영화제',
      '2024 성북청춘불패영화제',
      '2025 판타지아국제영화제',
      '2025 에트랑제영화제',
      '2025 미장센단편영화제',
    ],
    quote:
      'Fantastic in its approach to queer dynamics and relationships. I especially loved the visuals of skin, veins, plastic, sea, sand all interconnected and mixing. The colors were also so satisfying.',
    quoteSource: 'Leah | Reviewer',
    video: '',
  },
  {
    slug: 'time-of-light',
    titleKo: '빛의 시간',
    titleEn: 'TIME OF LIGHT',
    year: '2022',
    category: 'short',
    categoryLabel: 'Short Film',
    genre: 'Romance',
    runtime: '13min',
    format: '1.66:1 · Digital 2K',
    role: 'Director · Writer · Cinematographer',
    director: '김비오',
    card: '/stills/time-of-light/1.jpg',
    stills: S('time-of-light', 5),
    synopsis:
      '어느 오후, 같은 빛 아래에 선 두 사람. 짧게 스치는 만남 속에서 빛이 만들어가는 시간을 따라가는 로맨스. 빛이 듬뿍 담긴, 우리가 시작한 시간의 기록.',
    intent:
      '빛 그 자체가 주인공인 영화를 만들고 싶었다. 하루의 시간대에 따라 달라지는 자연광의 각도와 색온도를 이야기의 흐름과 맞추었고, 역광과 플레어를 적극적으로 받아들여 로맨스의 온도를 빛의 변화로 전달하고자 했다. 연출과 촬영을 함께 한 만큼, 대사가 없는 순간에도 프레임 안의 빛이 감정을 대신 말하도록 설계했다.',
    specs: [
      { label: 'CAMERA', value: '확인 필요' },
      { label: 'LENSES', value: '확인 필요' },
      { label: 'RECORDING', value: 'Digital 2K' },
      { label: 'ASPECT RATIO', value: '1.66 : 1' },
    ],
    credits: [{ role: '연출 · 각본 · 촬영', name: '김비오' }],
    awards: ['2023 제주혼듸독립영화제 — 혼듸피플상'],
    invitations: ['2022 충무로영화제 감독주간 — 올해의 촬영/조명상 후보'],
    quote: '빛이 듬뿍 담긴, 우리가 시작한 시간.',
    quoteSource: '정주리 | 영화감독',
    video: '',
  },
];

export const featuredWorks = works.slice(0, 6);

// ============================================================================
// Filmography Archive — PDF 이력서 페이지의 전체 필모그래피
// ============================================================================

export interface FilmographyEntry {
  year: string;
  titleKo: string;
  titleEn: string;
  director: string;
  type: string;
  runtime: string;
  role: string;
  festival: string;
  slug?: string; // 상세 페이지가 있는 작품만
}

export const filmography: FilmographyEntry[] = [
  { year: '2026', titleKo: '미아', titleEn: 'BE MY BABY', director: '유종석', type: 'Feature Film', runtime: '98min', role: 'Cinematographer', festival: '부산국제영화제', slug: 'be-my-baby' },
  { year: '2026', titleKo: '철들 무렵', titleEn: 'COMING OF AGE', director: '정승오', type: 'Feature Film', runtime: '105min', role: 'Director of Photography', festival: '부산국제영화제', slug: 'coming-of-age' },
  { year: '2026', titleKo: '콘크리트 녹색섬', titleEn: 'GREEN CONCRETE', director: '이성민', type: 'Documentary', runtime: '108min', role: 'Director of Photography', festival: 'SXSW', slug: 'green-concrete' },
  { year: '2025', titleKo: '혀', titleEn: 'TONGUE', director: '임다슬', type: 'Short Film', runtime: '15min', role: 'Cinematographer', festival: '전주국제영화제', slug: 'tongue' },
  { year: '2025', titleKo: '묵인', titleEn: 'TREEMAN', director: '이명현', type: 'Short Film', runtime: '30min', role: 'Director of Photography', festival: '부산국제영화제', slug: 'treeman' },
  { year: '2025', titleKo: '좋아', titleEn: 'LIKE', director: '황슬기', type: 'Short Film (Omnibus)', runtime: '3min', role: 'Director of Photography', festival: '부산국제영화제' },
  { year: '2024', titleKo: '벗어날 탈 脫', titleEn: 'NOT ONE AND NOT TWO', director: '서보형', type: 'Feature Film', runtime: '73min', role: 'Cinematographer', festival: '부산국제영화제', slug: 'not-one-not-two' },
  { year: '2024', titleKo: '도망자', titleEn: 'FUGITIVE', director: '박성진', type: 'Feature Film', runtime: '86min', role: 'Director of Photography', festival: 'UIFF' },
  { year: '2024', titleKo: '확장기', titleEn: 'TIME TO DILATE', director: '김나영', type: 'Short Film', runtime: '22min', role: 'Director of Photography', festival: '부산국제영화제', slug: 'time-to-dilate' },
  { year: '2023', titleKo: '손으로', titleEn: 'BY HAND', director: '유주영', type: 'Short Film', runtime: '14min', role: 'Cinematographer', festival: '부산국제영화제' },
  { year: '2023', titleKo: '과화만사성', titleEn: 'GHWA THE LAST NAME', director: '유재인', type: 'Short Film', runtime: '32min', role: 'Cinematographer', festival: '청룡영화상', slug: 'the-last-name' },
  { year: '2023', titleKo: '지옥만세', titleEn: 'HAIL TO HELL', director: '임오정', type: 'Feature Film', runtime: '109min', role: 'Still', festival: '부산국제영화제' },
  { year: '2022', titleKo: '새벽 두시에 불을 붙여', titleEn: 'LIGHT IT UP AT 2 A.M.', director: '유종석', type: 'Short Film', runtime: '19min', role: 'Cinematographer', festival: '청룡영화상', slug: 'light-it-up' },
  { year: '2022', titleKo: '그렇고 그런 사이', titleEn: 'FRAMILY', director: '김인혜', type: 'Short Film', runtime: '30min', role: 'Cinematographer', festival: '전주국제영화제', slug: 'framily' },
  { year: '2022', titleKo: '빛의 시간', titleEn: 'TIME OF LIGHT', director: '김비오', type: 'Short Film', runtime: '13min', role: 'Director · Cinematographer', festival: '전주국제영화제', slug: 'time-of-light' },
  { year: '2021', titleKo: '문제 없어요', titleEn: 'NO PROBLEM', director: '고건수', type: 'Short Film', runtime: '16min', role: 'Director of Photography', festival: '전주국제영화제' },
  { year: '2021', titleKo: '남남', titleEn: 'WHERE IS OUR LOVE SONG', director: '고건수', type: 'Short Film', runtime: '22min', role: 'Director of Photography', festival: '전주국제영화제' },
  { year: '2020', titleKo: '애비규환', titleEn: 'MORE THAN FAMILY', director: '최하나', type: 'Feature Film', runtime: '110min', role: 'B Camera · Still', festival: '부산국제영화제' },
  { year: '2019', titleKo: '우리집', titleEn: 'THE HOUSE OF US', director: '윤가은', type: 'Feature Film', runtime: '92min', role: 'Making Film', festival: '' },
];

// ============================================================================
// Awards & Clients — 이력서 페이지 원문
// ============================================================================

export const personalAwards = [
  {
    year: '2023',
    title: '제6회 제주혼듸독립영화제',
    result: '혼듸피플상',
  },
  {
    year: '2022',
    title: '제7회 충무로영화제 — 감독주간',
    result: '올해의 촬영/조명상',
  },
  {
    year: '2013',
    title: '제4회 아이폰필름페스티벌',
    result: '대상',
  },
];

export const clients = [
  'APCEIU',
  'Save the Children',
  'WOMAD',
  'BROWNEYED SOUL',
  '건강보험심사평가원',
];

export const vkFilmServices = [
  '브랜드 필름 및 다큐멘터리 제작',
  '뮤직비디오 연출 · 촬영',
  '현장 스틸 · 메이킹 필름',
  '아티스트 콜라볼레이션',
];
