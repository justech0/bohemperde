import { Category, Product, Slide } from './types';

export const SITE_CONFIG = {
  name: "Bohem Perde",
  tagline: "Stil, ışıkla buluştu.",
  phone: "+905053463940",
  whatsapp: "905053463940",
  address: "Belde Mah, Ömer Muhtar Blv. Tirman Park Sitesi E blok Altı, Batman",
  social: {
    instagram: "https://instagram.com/bohemperde",
    facebook: "https://facebook.com",
  }
};

// High quality placeholder images that match the "Bohem" aesthetic
export const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1920&auto=format&fit=crop",
    title: "Evinizin Işıltısı",
    subtitle: "Modern ve minimalist tasarımlarla yaşam alanlarınıza değer katın.",
    ctaText: "Koleksiyonu Keşfet",
    ctaLink: "/products"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1920&auto=format&fit=crop",
    title: "Özel Tasarım Tüller",
    subtitle: "Her pencereye uygun, size özel dikim seçenekleri.",
    ctaText: "İletişime Geç",
    ctaLink: "/contact"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1920&auto=format&fit=crop",
    title: "Ahşap & Rustik",
    subtitle: "Doğal dokunuşlarla sıcak bir atmosfer yaratın.",
    ctaText: "Ürünleri İncele",
    ctaLink: "/products"
  }
];

export const CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Tül Perdeler',
    slug: 'tul-perde',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600',
    description: 'Zarif ve hafif dokular.'
  },
  {
    id: '2',
    name: 'Fon Perdeler',
    slug: 'fon-perde',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=600',
    description: 'Mekana derinlik katan renkler.'
  },
  {
    id: '3',
    name: 'Stor & Zebra',
    slug: 'stor-zebra',
    image: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&q=80&w=600',
    description: 'Modern ve pratik çözümler.'
  },
  {
    id: '4',
    name: 'Ahşap Jaluzi',
    slug: 'ahsap-jaluzi',
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&q=80&w=600',
    description: 'Doğal ve şık görünüm.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Bohem Keten Dokulu Tül',
    categoryId: '1',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1499916078039-922301b0eb9b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Doğal keten görünümü ile evinize sıcaklık katar. Ütü gerektirmeyen özel kumaş. Farklı pile seçenekleri ile modern veya klasik tarzda dikilebilir.',
    colors: ['Krem', 'Beyaz', 'Kum Beji'],
    isNew: true
  },
  {
    id: 'p2',
    name: 'Kadife Dokulu Fon',
    categoryId: '2',
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1550920854-c8c3e6205934?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Yumuşak dokusu ve dökümlü yapısı ile salonlarınız için ideal. Güneş ışığını yumuşatır ve mekanın akustiğini düzenler.',
    colors: ['Antrasit', 'Zümrüt Yeşili', 'Vizon', 'Lacivert']
  },
  {
    id: 'p3',
    name: 'Bambu Zebra Perde',
    categoryId: '3',
    images: [
      'https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1588725026939-5034c5147854?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Işık kontrolü sağlayan, kolay temizlenebilir mekanizmalı sistem. Doğal bambu görünümü ile ofis ve evler için uygundur.',
    colors: ['Beyaz', 'Krem', 'Gri']
  },
  {
    id: 'p4',
    name: 'Rustik Ahşap Jaluzi 50mm',
    categoryId: '4',
    images: [
      'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1596637330541-10d9f45f946e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1582236894056-b8db23f5b026?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Gerçek ağaç dokusu, uzun ömürlü mekanizma. 50mm bant genişliği ile lüks ve modern bir görünüm sağlar.',
    colors: ['Ceviz', 'Meşe', 'Siyah', 'Beyaz']
  },
   {
    id: 'p5',
    name: 'Fransız Dantel Tül',
    categoryId: '1',
    images: [
      'https://images.unsplash.com/photo-1499916078039-922301b0eb9b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1522771753035-484980f83c28?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Klasik sevenler için işlemeli özel tasarım. Işıltılı iplik detayları ile salonlarınıza saray havası katar.',
    colors: ['Ekru']
  },
  {
    id: 'p6',
    name: 'Blackout Karartma Fon',
    categoryId: '2',
    images: [
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1550920854-c8c3e6205934?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800'
    ],
    description: '%100 ışık kesme özelliği ile yatak odaları için idealdir. Termal yalıtım özelliği sayesinde oda sıcaklığını korur.',
    colors: ['Gri', 'Siyah', 'Bej']
  }
];