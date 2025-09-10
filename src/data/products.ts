import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 'ganymede-marc-antoine-barrois-100ml',
    name: 'Ganymede Marc-Antoine Barrois, 100ml',
    brand: 'Marc-Antoine Barrois',
    price: 780000,
    originalPrice: 1248000,
    images: [
      '/images/Ганимед/6381627468.jpg',
      '/images/Ганимед/бонус.jpg',
      '/images/Ганимед/a3c0de1596034616a51ecb30a0243da8.jpg',
      '/images/Ганимед/molecula.jpg',
      '/images/Ганимед/57451.970.jpg',
    ],
    description: "Ganymede Marc-Antoine Barrois – zamonaviy va nafis uniseks atiri bo‘lib, tetiklik, mineral akkordlar va elegant chuqurlikni uyg‘unlashtiradi. Ustki notalar mandarin va shafran bilan ochilib, mineral va teri akkordlaridan iborat yurak notalariga yo‘l beradi. Yog‘och va beqaror gulidan tashkil topgan asosiy notalar atirga bardoshlilik, sirli joziba va betakror nafislik baxsh etadi.",
    features: [
      '100ml hajm',
      'Oud asosida',
      'Erkaklar va ayollar uchun',
      'Premium qadoqlash',
    ],
    isNew: true,
    inStock: true,
    warranty: '1 yil',
    delivery: 'O\'zbekiston bo\'ylab yetkazib berish mavjud!',
    installmentOptions: [
      { months: 3, monthlyPayment: 286000 },
      { months: 6, monthlyPayment: 167000 },
      { months: 12, monthlyPayment: 93000 }
    ]
  },
  {
    id: 'scepter-bronzite-maison-alhambra-100ml',
    name: 'Scepter Bronzite Maison Alhambra, 100ml',
    brand: 'Maison Alhambra',
    price: 534000,
    originalPrice: 984000,
    images: [
      '/images/Скептр/gxp-12404.jpg',
      '/images/Скептр/41s2Ubll3jL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg',
      '/images/Скептр/cr0e2umsbq7g1s99m0qg.jpg',
    ],
    description: "Mahsulot haqida Scepter Bronzite Maison Alhambra — nafis va boy sharqona ifor. Unda ziravorlar, yog‘ochli va biroz shirin notalar uyg‘unlashib, iliq va quchuvchi kompozitsiyani hosil qiladi. Ayniqsa sovuq mavsumlar va kechki tadbirlar uchun mos. Uzok saqlanadigan va ohangdor hid o‘z izini qoldiradi.",
    features: [
      '100ml hajm',
      'Ifor turi: sharqona, yog‘ochli',
      'Erkaklar uchun',
      'Premium qadoqlash',
      "Vaziyat: kechki chiqishlar, maxsus holatlar",
    ],
    isNew: false,
    inStock: true,
    warranty: '1 yil',
    delivery: 'O\'zbekiston bo\'ylab yetkazib berish mavjud!',
    installmentOptions: [
      { months: 3, monthlyPayment: 204700 },
      { months: 6, monthlyPayment: 114000 },
      { months: 12, monthlyPayment: 64000 }
    ]
  },
  {
    id: 'imagination-louis-vuitton-100ml',
    name: 'Imagination Louis Vuitton, 100ml',
    brand: 'Louis Vuitton',
    price: 800000,
    originalPrice: 1200000,
    images: [
      '/images/Imagination/Louis-Vuitton-Imagination-200ml-–-Fresh-Spicy-Citrus-and-Tea-Perfume-768x768.jpg',
      '/images/Imagination/bonus.jpg',
      '/images/Imagination/lv_imagination_200ml_1672028342_22766402_progressive.jpg',
      '/images/Imagination/s-l1600.jpg',
    ],
    description: 'Imagination Louis Vuitton – erkinlik va ijod ruhini aks ettiruvchi nafis va tetik uniseks atiri. Ustki notalar tsitrus, zanjabil va qora choyning yorqin akkordlari bilan ochilib, yurak notalarida dolchin va archa bilan uyg‘unlashadi. Amber va kedrdan iborat asosiy notalar atirga iliqlik, nafislik va betakror bardoshlilik baxsh etadi.',
    features: [
      '100ml hajm',
      'Bergamot asosida',
      'Erkaklar va ayollar uchun',
      'Premium qadoqlash',
    ],
    isNew: true,
    inStock: true,
    warranty: '1 yil',
    delivery: 'O\'zbekiston bo\'ylab yetkazib berish mavjud!',
    installmentOptions: [
      { months: 3, monthlyPayment: 297000 },
      { months: 6, monthlyPayment: 172000 },
      { months: 12, monthlyPayment: 96000 }
    ]
  },
  {
    id: 'jean-paul-gaultier-le-male-elixir-125ml',
    name: 'Jean Paul Gaultier Le Male Elixir, 125ml',
    brand: 'Jean Paul Gaultier',
    price: 800000,
    originalPrice: 1280000,
    images: [
      '/images/Jean_Paul/__2__g2id-k4.jpg',
      '/images/Jean_Paul/Безымянный-1.jpg',
      '/images/Jean_Paul/jpg-le-male-elixir.jpg',
      '/images/Jean_Paul/s-l1600.jpg',
    ],
    description: "Jean Paul Gaultierning Le Male Elixir atirining yuqori notalari lavanda va minta, o'rtacha notalari vanil va benzoindir, asosiy notalari esa asal, tonka loviya va tamaki. Bu atir 2023-yilda chiqarilgan. Jean Paul Gaultier ning Le Male Elixir atiri hozirgi paytda juda mashhur va ayollar orasida ham e'tiborni jalb qilayotgan atirlardan biri hisoblanadi. Demak, u aynan o'sha e'tibor chaqiruvchi atirlardan biri.",
    features: [
      '125ml hajm',
      'Orchid asosida',
      'Erkaklar uchun',
      'Premium qadoqlash',
    ],
    isNew: false,
    inStock: true,
    warranty: '1 yil',
    delivery: 'O\'zbekiston bo\'ylab yetkazib berish mavjud!',
    installmentOptions: [
      { months: 3, monthlyPayment: 297000 },
      { months: 6, monthlyPayment: 172000 },
      { months: 12, monthlyPayment: 96000 }
    ]
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
