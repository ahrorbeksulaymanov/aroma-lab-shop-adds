import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 'ganymede-marc-antoine-barrois-100ml',
    name: 'Ganymede Marc-Antoine Barrois, 100ml',
    brand: 'Louis Vuitton',
    price: 400000,
    originalPrice: 1600000,
    images: [
      '/images/ganymede-marc-antoine-barrois-100ml-1.jpg',
      '/images/ganymede-marc-antoine-barrois-100ml-2.jpg',
      '/images/ganymede-marc-antoine-barrois-100ml-3.jpg',
      '/images/ganymede-marc-antoine-barrois-100ml-4.jpg',
      '/images/ganymede-marc-antoine-barrois-100ml-5.jpg',
    ],
    description: "Ganymede Marc-Antoine Barrois – zamonaviy va nafis uniseks atiri bo‘lib, tetiklik, mineral akkordlar va elegant chuqurlikni uyg‘unlashtiradi. Ustki notalar mandarin va shafran bilan ochilib, mineral va teri akkordlaridan iborat yurak notalariga yo‘l beradi. Yog‘och va beqaror gulidan tashkil topgan asosiy notalar atirga bardoshlilik, sirli joziba va betakror nafislik baxsh etadi.",
    features: [
      '100ml hajm',
      'Oud asosida',
      'Erkaklar uchun',
      'Premium qadoqlash',
    ],
    isNew: true,
    inStock: true,
    warranty: '1 yil',
    delivery: 'O\'zbekiston bo\'ylab',
    installmentOptions: [
      { months: 6, monthlyPayment: 80000 },
      { months: 12, monthlyPayment: 48000 }
    ]
  },
  {
    id: 'scepter-bronzite-maison-alhambra-100ml',
    name: 'Scepter Bronzite Maison Alhambra, 100ml',
    brand: 'Chanel',
    price: 534000,
    originalPrice: 1400000,
    images: [
      '/images/scepter-bronzite-maison-alhambra-100ml-1.webp',
      '/images/scepter-bronzite-maison-alhambra-100ml-2.webp',
    ],
    description: "Mahsulot haqida Scepter Bronzite Maison Alhambra — nafis va boy sharqona ifor. Unda ziravorlar, yog‘ochli va biroz shirin notalar uyg‘unlashib, iliq va quchuvchi kompozitsiyani hosil qiladi. Ayniqsa sovuq mavsumlar va kechki tadbirlar uchun mos. Uzok saqlanadigan va ohangdor hid o‘z izini qoldiradi.",
    features: [
      '100ml hajm',
      'Ifor turi: sharqona, yog‘ochli',
      'Kim uchun: uniseks',
      'Premium qadoqlash',
      "Vaziyat: kechki chiqishlar, maxsus holatlar",
    ],
    isNew: false,
    inStock: true,
    warranty: '1 yil',
    delivery: 'O\'zbekiston bo\'ylab',
    installmentOptions: [
      { months: 6, monthlyPayment: 70000 },
      { months: 12, monthlyPayment: 42000 }
    ]
  },
  {
    id: 'imagination-louis-vuitton-100ml',
    name: 'Imagination Louis Vuitton, 100ml',
    brand: 'Dior',
    price: 1200000,
    originalPrice: 1520000,
    images: [
      '/images/imagination-louis-vuitton-100ml-1.webp',
      '/images/imagination-louis-vuitton-100ml-2.webp',
    ],
    description: 'Imagination Louis Vuitton – erkinlik va ijod ruhini aks ettiruvchi nafis va tetik uniseks atiri. Ustki notalar tsitrus, zanjabil va qora choyning yorqin akkordlari bilan ochilib, yurak notalarida dolchin va archa bilan uyg‘unlashadi. Amber va kedrdan iborat asosiy notalar atirga iliqlik, nafislik va betakror bardoshlilik baxsh etadi.',
    features: [
      '100ml hajm',
      'Bergamot asosida',
      'Erkaklar uchun',
      'Premium qadoqlash',
    ],
    isNew: true,
    inStock: true,
    warranty: '1 yil',
    delivery: 'O\'zbekiston bo\'ylab bepul',
    installmentOptions: [
      { months: 6, monthlyPayment: 76000 },
      { months: 12, monthlyPayment: 45000 }
    ]
  },
  {
    id: 'jean-paul-gaultier-le-male-elixir-125ml',
    name: 'Jean Paul Gaultier Le Male Elixir',
    brand: 'Tom Ford',
    price: 450000,
    originalPrice: 1800000,
    images: [
      '/images/jean-paul-gaultier-le-male-elixir-125ml-1.jpg',
      '/images/jean-paul-gaultier-le-male-elixir-125ml-2.jpg',
      '/images/jean-paul-gaultier-le-male-elixir-125ml-3.jpg'
    ],
    description: 'Jean Paul Gaultier Le Male Elixir - bu hashamatli va sirli atir. Uning chuqur va jozibali hidlari har bir ayolni o\'ziga tortadi va uning shaxsiyatini yanada jozibali qiladi.',
    features: [
      '125ml hajm',
      'Orchid asosida',
      'Erkaklar uchun',
      'Premium qadoqlash',
    ],
    isNew: false,
    inStock: true,
    warranty: '1 yil',
    delivery: 'O\'zbekiston bo\'ylab bepul',
    installmentOptions: [
      { months: 6, monthlyPayment: 90000 },
      { months: 12, monthlyPayment: 54000 }
    ]
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
