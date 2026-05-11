export interface MockProduct {
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  colors: { name: string; hex: string }[];
}

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    slug: 'mini-clutch-kemik',
    name: 'Revive Mini Clutch - Kemik Rengi',
    category: 'mini-clutch',
    price: 5500,
    image:
      'https://tomologo-official.com/wp-content/uploads/2024/11/revive-mini-clutch-kemik.jpg',
    description:
      'Revive mini clutch, günlük kullanım için ideal, zamansız bir modeldir.',
    colors: [
      { name: 'Kemik', hex: '#dad6c4' },
      { name: 'Koyu Kahverengi', hex: '#4b3427' },
      { name: 'Vizon', hex: '#b8ad94' },
      { name: 'Koi Yılan', hex: '#7a523c' },
      { name: 'Yeşil Yılan', hex: '#2e5f59' },
      { name: 'Nude', hex: '#d9d2bf' },
    ],
  },
  {
    slug: 'mini-clutch-yag-tey',
    name: 'Revive Mini Clutch - Yağ Tey',
    category: 'mini-clutch',
    price: 5500,
    image:
      'https://tomologo-official.com/wp-content/uploads/2024/11/revive-mini-clutch-yag-tey.jpg',
    description: 'Yağ tey tonuyla öne çıkan kompakt ve şık günlük model.',
    colors: [{ name: 'Yağ Tey', hex: '#6b4d35' }],
  },
  {
    slug: 'mini-clutch-yesil-yilan',
    name: 'Revive Mini Clutch - Yeşil Yılan',
    category: 'mini-clutch',
    price: 5500,
    image:
      'https://tomologo-official.com/wp-content/uploads/2024/11/revive-mini-clutch-yesil-yilan.jpg',
    description: 'Doku ve renk dengesiyle güçlü bir görünüm sunar.',
    colors: [{ name: 'Yeşil Yılan', hex: '#2e5f59' }],
  },
  {
    slug: 'mini-clutch-vizon',
    name: 'Revive Mini Clutch - Vizon',
    category: 'mini-clutch',
    price: 5500,
    image:
      'https://tomologo-official.com/wp-content/uploads/2024/11/revive-mini-clutch-vizon.jpg',
    description: 'Nötr vizon tonu ile her kombine uyum sağlar.',
    colors: [{ name: 'Vizon', hex: '#b8ad94' }],
  },
  {
    slug: 'mini-clutch-koi',
    name: 'Revive Mini Clutch - Koi Yılan',
    category: 'mini-clutch',
    price: 5500,
    image:
      'https://tomologo-official.com/wp-content/uploads/2024/11/revive-mini-clutch-koi-yilan.jpg',
    description: 'Koi desenli yüzeyi ile koleksiyonun dikkat çeken parçası.',
    colors: [{ name: 'Koi Yılan', hex: '#7a523c' }],
  },
  {
    slug: 'mini-clutch-koyu-kahverengi',
    name: 'Revive Mini Clutch - Koyu Kahverengi',
    category: 'mini-clutch',
    price: 5500,
    image:
      'https://tomologo-official.com/wp-content/uploads/2024/11/revive-mini-clutch-koyu-kahverengi.jpg',
    description: 'Koyu ton severler için güçlü ve sade bir alternatif.',
    colors: [{ name: 'Koyu Kahverengi', hex: '#4b3427' }],
  },
  {
    slug: 'mini-clutch-nude',
    name: 'Revive Mini Clutch - Nude',
    category: 'mini-clutch',
    price: 5500,
    image:
      'https://tomologo-official.com/wp-content/uploads/2024/11/revive-mini-clutch-nude.jpg',
    description: 'Nude tonlarıyla zarif ve minimal görünüm.',
    colors: [{ name: 'Nude', hex: '#d9d2bf' }],
  },
  {
    slug: 'tune-yag-mixi-tote-canta',
    name: 'TUNE YAĞ MİXİ TOTE ÇANTA',
    category: 'tote-canta',
    price: 22500,
    image:
      'https://tomologo-official.com/wp-content/uploads/2025/01/tune-yag-mixi-tote-canta.jpg',
    description: 'Geniş iç hacim ve imza detaylarla premium tote model.',
    colors: [{ name: 'Yağ Mixi', hex: '#8f825c' }],
  },
];

/** Ana sayfa “Revive koleksiyonunu keşfet” üçlü şerit */
export interface ReviveCollectionSpotlightItem {
  name: string;
  image: string;
}

export const REVIVE_COLLECTION_SPOTLIGHT: ReviveCollectionSpotlightItem[] = [
  {
    name: 'Revive Clutch – Kahverengi Süet',
    image:
      'https://tomologo-official.com/wp-content/uploads/2024/12/Revive-Clutch-suet-kahve-1-y-768x1024.jpg',
  },
  {
    name: 'Revive Clutch – Kemik',
    image:
      'https://tomologo-official.com/wp-content/uploads/2024/12/Revive-Clutch-BT-kemik-1-y-768x1024.jpg',
  },
  {
    name: 'Revive Clutch – Kızıl Yılan',
    image:
      'https://tomologo-official.com/wp-content/uploads/2024/12/Revive-Clutch-baski-yilan-turuncu-1-768x1024.jpg',
  },
];

export const formatTry = (value: number): string =>
  new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2,
  }).format(value);

