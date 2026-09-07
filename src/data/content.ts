export const BUSINESS = {
  brand: 'Kasia_cleaning',
  fullName: 'Kasia_cleaning Firma sprzątająca',
  category: 'House cleaning service',
  phone: '+48 791 688 048',
  phoneHref: 'tel:+48791688048',
  rating: 5.0,
  reviewsCount: 6,
  hours: 'Otwarte 24 godziny',
  location: 'Polska',
};

export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export const SERVICES: Service[] = [
  {
    id: 'mieszkanie',
    title: 'Sprzątanie mieszkań',
    description: 'Dokładne sprzątanie mieszkań — jednorazowo lub regularnie.',
    image: 'https://images.pexels.com/photos/7587773/pexels-photo-7587773.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Jasne, czyste wnętrze mieszkania w stylu skandynawskim',
  },
  {
    id: 'dom',
    title: 'Sprzątanie domów',
    description: 'Kompleksowe sprzątanie przestrzeni domowych z dbałością o szczegóły.',
    image: 'https://images.pexels.com/photos/8146144/pexels-photo-8146144.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Przestronne, czyste wnętrze domu z otwartą kuchnią',
  },
  {
    id: 'remont',
    title: 'Sprzątanie po remoncie',
    description: 'Pomoc w przywróceniu porządku po pracach remontowych.',
    image: 'https://images.pexels.com/photos/3616756/pexels-photo-3616756.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Pomieszczenie po pracach remontowych, gotowe do sprzątania',
  },
  {
    id: 'wynajem',
    title: 'Sprzątanie przed / po wynajmie',
    description: 'Przygotowanie mieszkania do nowych lokatorów lub po zakończeniu wynajmu.',
    image: 'https://images.pexels.com/photos/6523269/pexels-photo-6523269.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Czysta, nowoczesna kuchnia gotowa dla nowych lokatorów',
  },
  {
    id: 'biuro',
    title: 'Sprzątanie biur',
    description: 'Profesjonalne utrzymanie czystości w przestrzeniach biurowych.',
    image: 'https://images.pexels.com/photos/19866414/pexels-photo-19866414.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Minimalistyczna, czysta przestrzeń w stylu skandynawskim',
  },
];

export type Feature = {
  num: string;
  title: string;
  description: string;
};

export const FEATURES: Feature[] = [
  { num: '01', title: 'Dokładność', description: 'Zwracamy uwagę na szczegóły, które robią różnicę.' },
  { num: '02', title: 'Sprawna komunikacja', description: 'Łatwy kontakt i szybkie ustalenie szczegółów.' },
  { num: '03', title: 'Dbałość o efekt', description: 'Naszym celem jest przestrzeń, do której chce się wracać.' },
  { num: '04', title: 'Indywidualne podejście', description: 'Zakres sprzątania można dopasować do potrzeb klienta.' },
];

export type Step = {
  num: string;
  title: string;
};

export const STEPS: Step[] = [
  { num: '01', title: 'Kontaktujesz się z nami' },
  { num: '02', title: 'Ustalamy zakres sprzątania' },
  { num: '03', title: 'Wybieramy dogodny termin' },
  { num: '04', title: 'Cieszysz się czystym wnętrzem' },
];

export type Review = {
  author: string;
  rating: number;
  text: string;
  note?: string;
};

export const REVIEWS: Review[] = [
  {
    author: 'Katarzyna Szopińska',
    rating: 5,
    text: 'Zdecydowanie polecamy! Skorzystaliśmy z usługi generalnego sprzątania i mieszkanie wygląda jak nowe. ❤️',
    note: 'Opinia Google — tłumaczenie',
  },
  {
    author: 'Amanda Kaźmierczak',
    rating: 5,
    text: 'Zdecydowanie polecam! :)',
    note: 'Opinia Google — tłumaczenie',
  },
  {
    author: 'Sonia',
    rating: 5,
    text: 'Zdecydowanie polecam usługi Kasi i Vadima. Szybka realizacja, uczciwe ceny, łatwy kontakt oraz sprawne czyszczenie i naprawa szafek. To duet, któremu można zaufać!',
    note: 'Opinia Google — tłumaczenie',
  },
];

export type GalleryImage = {
  src: string;
  alt: string;
};

export const GALLERY: GalleryImage[] = [
  { src: 'https://images.pexels.com/photos/7587773/pexels-photo-7587773.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Jasny salon z otwartą kuchnią w stylu skandynawskim' },
  { src: 'https://images.pexels.com/photos/6523269/pexels-photo-6523269.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Nowoczesna biała kuchnia z naturalnym światłem' },
  { src: 'https://images.pexels.com/photos/7546608/pexels-photo-7546608.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Czysta, nowoczesna łazienka z prysznicem i beżowymi płytkami' },
  { src: 'https://images.pexels.com/photos/7587772/pexels-photo-7587772.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Jasna sypialnia w stylu minimalistycznym' },
  { src: 'https://images.pexels.com/photos/7587779/pexels-photo-7587779.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Przytulny salon z minimalistyczną kuchnią' },
  { src: 'https://images.pexels.com/photos/6580220/pexels-photo-6580220.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Minimalistyczna kuchnia z gładkimi powierzchniami' },
];

export const HERO_IMAGE = 'https://images.pexels.com/photos/7587773/pexels-photo-7587773.jpeg?auto=compress&cs=tinysrgb&w=1920';
export const WHY_IMAGE = 'https://images.pexels.com/photos/19866414/pexels-photo-19866414.jpeg?auto=compress&cs=tinysrgb&w=1200';
export const ABOUT_IMAGE = 'https://images.pexels.com/photos/12281850/pexels-photo-12281850.jpeg?auto=compress&cs=tinysrgb&w=1200';

export const BEFORE_IMAGE = 'https://images.pexels.com/photos/3616756/pexels-photo-3616756.jpeg?auto=compress&cs=tinysrgb&w=1200';
export const AFTER_IMAGE = 'https://images.pexels.com/photos/7587773/pexels-photo-7587773.jpeg?auto=compress&cs=tinysrgb&w=1200';

export type FaqItem = { question: string; answer: string };

export const FAQ_ITEMS: FaqItem[] = [
  { question: 'Jak mogę zamówić sprzątanie?', answer: 'Skontaktuj się z nami telefonicznie lub przez formularz, aby ustalić zakres usługi i termin.' },
  { question: 'Jak wygląda wycena?', answer: 'Zakres i cena usługi zależą od rodzaju oraz zakresu sprzątania. Skontaktuj się z nami, aby ustalić szczegóły.' },
  { question: 'Czy można zamówić sprzątanie jednorazowe?', answer: 'Zapytaj nas o dostępność wybranej usługi i dogodny termin.' },
  { question: 'Czy oferujecie sprzątanie regularne?', answer: 'Skontaktuj się z nami, aby ustalić dostępne opcje.' },
  { question: 'Czy sprzątacie po remoncie?', answer: 'Zapytaj o możliwość realizacji sprzątania po remoncie.' },
  { question: 'Jak szybko mogę umówić termin?', answer: 'Skontaktuj się z nami, aby sprawdzić dostępne terminy.' },
];

export const SERVICE_TYPES = ['Mieszkanie', 'Dom', 'Biuro', 'Po remoncie', 'Przed / po wynajmie', 'Inne'];
export const AREA_TYPES = ['do 40 m²', '40–70 m²', '70–100 m²', '100–150 m²', '150+ m²', 'Nie wiem'];
export const TIME_SLOTS = ['08:00 – 10:00', '10:00 – 12:00', '12:00 – 14:00', '14:00 – 16:00', '16:00 – 18:00'];

export const NAV_LINKS = [
  { label: 'Usługi', path: '/uslugi' },
  { label: 'Jak to działa', path: '/#jak-to-dziala' },
  { label: 'Opinie', path: '/opinie' },
  { label: 'O nas', path: '/o-nas' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Kontakt', path: '/kontakt' },
];

export const PAGE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Kasia_cleaning — Profesjonalne sprzątanie',
    description: 'Profesjonalne sprzątanie mieszkań i domów. Skontaktuj się z Kasia_cleaning i ustal dogodny termin usługi.',
  },
  '/uslugi': {
    title: 'Usługi — Kasia_cleaning',
    description: 'Sprzątanie mieszkań, domów, biur, po remoncie oraz przed i po wynajmie. Wybierz usługę dopasowaną do swoich potrzeb.',
  },
  '/o-nas': {
    title: 'O nas — Kasia_cleaning',
    description: 'Porządek w domu to nie tylko czyste powierzchnie. To więcej czasu, komfort i spokój na co dzień.',
  },
  '/opinie': {
    title: 'Opinie — Kasia_cleaning',
    description: 'Klienci już nam zaufali. Zobacz opinie Google o Kasia_cleaning.',
  },
  '/kontakt': {
    title: 'Kontakt — Kasia_cleaning',
    description: 'Skontaktuj się z Kasia_cleaning — telefon, formularz kontaktowy i zapytanie o sprzątanie.',
  },
  '/faq': {
    title: 'FAQ — Kasia_cleaning',
    description: 'Najczęściej zadawane pytania o sprzątanie mieszkań i domów — Kasia_cleaning.',
  },
};
