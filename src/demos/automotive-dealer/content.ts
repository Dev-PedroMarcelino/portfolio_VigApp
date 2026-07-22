import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Shared, locale-independent data (vehicles, prices, 3D references)   */
/* ------------------------------------------------------------------ */

/** Fictitious dealership WhatsApp — used by every conversion CTA. */
export const WHATSAPP_NUMBER = "5511981230911";

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Real Sketchfab model shown on the hero showroom stage (CC BY-SA). */
export const SKETCHFAB_911 = {
  uid: "d01b254483794de3819786d93e0e1ebf",
  thumb:
    "https://media.sketchfab.com/models/d01b254483794de3819786d93e0e1ebf/thumbnails/f28bf7eb32e646019bbaf886ff705679/3703397e693c47b2a66894bfb2ae7ea0.jpeg",
  credit: {
    model: "Porsche 911 Carrera 4S",
    author: "Lionsharp Studios",
    license: "CC BY-SA",
  },
} as const;

export type BrandId =
  | "audi"
  | "bmw"
  | "honda"
  | "landrover"
  | "mercedes"
  | "porsche"
  | "toyota";

export type FuelId = "gas" | "diesel" | "hybrid";
export type TransId = "auto" | "manual";
export type BadgeId = "armored" | "oneOwner" | "factoryWarranty";

export interface VehicleSeed {
  id: string;
  brand: BrandId;
  /** Proper noun, identical in every locale. */
  brandLabel: string;
  /** Model + trim, identical in every locale. */
  name: string;
  year: number;
  km: number;
  /** Always in BRL — the dealership sells in reais in every language. */
  price: number;
  trans: TransId;
  fuel: FuelId;
  badge?: BadgeId;
  photo: string;
}

const U = "?q=80&w=1600&auto=format&fit=crop";

/** Showroom stock, curated dark-premium photography (all verified 200). */
export const VEHICLES: VehicleSeed[] = [
  {
    id: "g63",
    brand: "mercedes",
    brandLabel: "Mercedes-AMG",
    name: "G 63",
    year: 2022,
    km: 14900,
    price: 1199900,
    trans: "auto",
    fuel: "gas",
    badge: "armored",
    photo: `https://images.unsplash.com/photo-1623671228672-7f56ddea1e0b${U}`,
  },
  {
    id: "rrsport",
    brand: "landrover",
    brandLabel: "Land Rover",
    name: "Range Rover Sport Dynamic SE",
    year: 2023,
    km: 12400,
    price: 799900,
    trans: "auto",
    fuel: "gas",
    badge: "armored",
    photo: `https://images.unsplash.com/photo-1736572199224-c78b1a7f46c3${U}`,
  },
  {
    id: "cayenne",
    brand: "porsche",
    brandLabel: "Porsche",
    name: "Cayenne Coupé",
    year: 2022,
    km: 25700,
    price: 689900,
    trans: "auto",
    fuel: "gas",
    badge: "armored",
    photo: `https://images.unsplash.com/photo-1643055359735-908c15445d09${U}`,
  },
  {
    id: "c63",
    brand: "mercedes",
    brandLabel: "Mercedes-AMG",
    name: "C 63 S Coupé",
    year: 2021,
    km: 27400,
    price: 549900,
    trans: "auto",
    fuel: "gas",
    badge: "oneOwner",
    photo: `https://images.unsplash.com/photo-1618373444305-3a77b7719a59${U}`,
  },
  {
    id: "m340i",
    brand: "bmw",
    brandLabel: "BMW",
    name: "M340i xDrive",
    year: 2022,
    km: 31800,
    price: 424900,
    trans: "auto",
    fuel: "gas",
    badge: "oneOwner",
    photo: `https://images.unsplash.com/photo-1594051673969-172a6f721d3c${U}`,
  },
  {
    id: "q5",
    brand: "audi",
    brandLabel: "Audi",
    name: "Q5 Sportback S line",
    year: 2024,
    km: 8200,
    price: 389900,
    trans: "auto",
    fuel: "hybrid",
    badge: "factoryWarranty",
    photo: `https://images.unsplash.com/photo-1769641156833-d5789dd62875${U}`,
  },
  {
    id: "530i",
    brand: "bmw",
    brandLabel: "BMW",
    name: "530i M Sport",
    year: 2023,
    km: 22300,
    price: 379900,
    trans: "auto",
    fuel: "gas",
    badge: "factoryWarranty",
    photo: `https://images.unsplash.com/photo-1769641240938-1125d7421364${U}`,
  },
  {
    id: "hilux",
    brand: "toyota",
    brandLabel: "Toyota",
    name: "Hilux GR-Sport 4x4",
    year: 2024,
    km: 9800,
    price: 344900,
    trans: "auto",
    fuel: "diesel",
    badge: "factoryWarranty",
    photo: `https://images.unsplash.com/photo-1641333326784-24a9c21d3c4e${U}`,
  },
  {
    id: "a5",
    brand: "audi",
    brandLabel: "Audi",
    name: "A5 Sportback Prestige",
    year: 2023,
    km: 19600,
    price: 329900,
    trans: "auto",
    fuel: "gas",
    badge: "oneOwner",
    photo: `https://images.unsplash.com/photo-1542282088-72c9c27ed0cd${U}`,
  },
  {
    id: "civic",
    brand: "honda",
    brandLabel: "Honda",
    name: "Civic Si",
    year: 2022,
    km: 38500,
    price: 154900,
    trans: "manual",
    fuel: "gas",
    badge: "oneOwner",
    photo: `https://images.unsplash.com/photo-1594070319944-7c0cbebb6f58${U}`,
  },
];

/** Brand filter chips — proper nouns, shared across locales. */
export const BRAND_FILTERS: { id: BrandId; label: string }[] = [
  { id: "audi", label: "Audi" },
  { id: "bmw", label: "BMW" },
  { id: "honda", label: "Honda" },
  { id: "landrover", label: "Land Rover" },
  { id: "mercedes", label: "Mercedes-AMG" },
  { id: "porsche", label: "Porsche" },
  { id: "toyota", label: "Toyota" },
];

/** Featured car of the week — the one on the 3D showroom stage. */
export const FEATURED = {
  id: "911c4s",
  name: "Porsche 911 Carrera 4S",
  year: 2022,
  km: 18400,
  price: 899900,
} as const;

/** Financing constants — Price table, monthly rate. */
export const MONTHLY_RATE = 0.0149;
export const TERM_OPTIONS = [24, 36, 48, 60] as const;
export const DOWN_MIN = 20;
export const DOWN_MAX = 70;

/** Fixed weekday chips for the visit scheduler (no Date.now needed). */
export const VISIT_TIMES = ["9h", "10h30", "12h", "14h", "15h30", "17h", "18h30"] as const;

/* ------------------------------------------------------------------ */
/* Content shape                                                        */
/* ------------------------------------------------------------------ */

export interface NavLink {
  href: string;
  label: string;
}

export interface SpecRow {
  label: string;
  value: string;
}

export interface BarcellosContent {
  header: {
    nav: NavLink[];
    cta: string;
    menuOpen: string;
    menuClose: string;
    whatsappMsg: string;
  };
  hero: {
    badge: string;
    titleLead: string;
    titleAccent: string;
    subtitle: string;
    bullets: string[];
    ctaPrimary: string;
    ctaSecondary: string;
    stats: { value: string; label: string }[];
    stage: {
      eyebrow: string;
      title: string;
      loadLabel: string;
      hint: string;
      priceTag: string;
      fichaCta: string;
    };
  };
  featured: {
    label: string;
    title: string;
    subtitle: string;
    specs: SpecRow[];
    badges: string[];
    priceLabel: string;
    priceNote: string;
    ctaInterest: string;
    ctaTestDrive: string;
    back3d: string;
    whatsappMsg: string;
  };
  stock: {
    label: string;
    title: string;
    subtitle: string;
    brandLabel: string;
    allBrands: string;
    priceLabel: string;
    priceAny: string;
    priceUnder400: string;
    price400to700: string;
    priceOver700: string;
    sortLabel: string;
    sortFeatured: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
    sortKmAsc: string;
    resultOne: string;
    resultMany: string;
    emptyTitle: string;
    emptyBody: string;
    emptyReset: string;
    badges: Record<BadgeId, string>;
    fuel: Record<FuelId, string>;
    trans: Record<TransId, string>;
    cardCta: string;
    whatsappMsg: string;
  };
  financing: {
    label: string;
    title: string;
    subtitle: string;
    vehicleLabel: string;
    customOption: string;
    customLabel: string;
    downLabel: string;
    downHint: string;
    termLabel: string;
    termUnit: string;
    rateLabel: string;
    rateValue: string;
    installmentLabel: string;
    perMonth: string;
    financedLabel: string;
    totalLabel: string;
    cetLabel: string;
    disclaimer: string;
    cta: string;
    whatsappMsg: string;
  };
  tradein: {
    label: string;
    title: string;
    subtitle: string;
    fields: {
      brand: string;
      brandPh: string;
      model: string;
      modelPh: string;
      year: string;
      yearPh: string;
      km: string;
      kmPh: string;
      phone: string;
      phonePh: string;
    };
    errors: { required: string; phone: string };
    submit: string;
    successTitle: string;
    successBody: string;
    successAgain: string;
    note: string;
  };
  visit: {
    label: string;
    title: string;
    subtitle: string;
    dayLabel: string;
    days: string[];
    timeLabel: string;
    submit: string;
    successTitle: string;
    successBody: string;
    addressLabel: string;
    address: string;
    hoursLabel: string;
    hours: string;
    mapTitle: string;
    mapCta: string;
  };
  testimonials: {
    label: string;
    title: string;
    items: { name: string; car: string; quote: string }[];
    sealsLabel: string;
    seals: { icon: "award" | "shield" | "badge"; title: string; sub: string }[];
  };
  footer: {
    blurb: string;
    navLabel: string;
    nav: NavLink[];
    contactLabel: string;
    phone: string;
    whatsapp: string;
    instagram: string;
    hoursLabel: string;
    hours: string;
    address: string;
    disclaimer: string;
    rights: string;
  };
}

/* ------------------------------------------------------------------ */
/* Dictionaries                                                         */
/* ------------------------------------------------------------------ */

const NAV_ANCHORS = ["#destaque", "#estoque", "#financiamento", "#avaliacao", "#visita"];

const pt: BarcellosContent = {
  header: {
    nav: [
      { href: NAV_ANCHORS[0], label: "Destaque" },
      { href: NAV_ANCHORS[1], label: "Estoque" },
      { href: NAV_ANCHORS[2], label: "Financiamento" },
      { href: NAV_ANCHORS[3], label: "Avaliação" },
      { href: NAV_ANCHORS[4], label: "Visita" },
    ],
    cta: "WhatsApp",
    menuOpen: "Abrir menu",
    menuClose: "Fechar menu",
    whatsappMsg: "Olá! Vi o site da Barcellos Veículos e quero falar com um consultor.",
  },
  hero: {
    badge: "Jardins · São Paulo · desde 1998",
    titleLead: "O seu próximo carro",
    titleAccent: "já está no nosso showroom.",
    subtitle:
      "Seminovos premium e blindados com procedência auditada item a item, garantia Barcellos de 1 ano e entrega assistida em todo o Brasil.",
    bullets: ["Procedência auditada", "Garantia de 1 ano", "Entrega em todo o Brasil"],
    ctaPrimary: "Ver estoque",
    ctaSecondary: "Falar no WhatsApp",
    stats: [
      { value: "27", label: "anos de mercado" },
      { value: "+11.400", label: "carros entregues" },
      { value: "4,9★", label: "avaliação Google" },
    ],
    stage: {
      eyebrow: "Destaque da semana",
      title: "Gire o carro — Porsche 911 Carrera 4S",
      loadLabel: "Ver em 3D",
      hint: "Arraste para girar · role para zoom",
      priceTag: "R$ 899.900",
      fichaCta: "Ver ficha completa",
    },
  },
  featured: {
    label: "Destaque da semana",
    title: "Porsche 911 Carrera 4S",
    subtitle:
      "O mesmo carro que você acabou de girar em 3D, esperando na Av. Europa. Seminovo de único dono, com todas as revisões feitas na concessionária.",
    specs: [
      { label: "Potência", value: "450 cv" },
      { label: "0–100 km/h", value: "3,8 s" },
      { label: "Rodados", value: "18.400 km" },
      { label: "Ano", value: "2022" },
      { label: "Câmbio", value: "PDK 8" },
      { label: "Combustível", value: "Gasolina" },
    ],
    badges: ["Único dono", "Revisões na concessionária", "Laudo cautelar aprovado"],
    priceLabel: "Preço à vista",
    priceNote: "Aceitamos seu usado na troca",
    ctaInterest: "Tenho interesse",
    ctaTestDrive: "Agendar test drive",
    back3d: "Voltar ao modelo 3D",
    whatsappMsg:
      "Olá! Tenho interesse no Porsche 911 Carrera 4S 2022 (destaque da semana) por R$ 899.900.",
  },
  stock: {
    label: "Estoque",
    title: "Selecionados um a um.",
    subtitle:
      "Cada carro passa por auditoria de procedência com 160 itens antes de entrar no showroom. Preços em reais, à vista.",
    brandLabel: "Marca",
    allBrands: "Todas",
    priceLabel: "Faixa de preço",
    priceAny: "Qualquer preço",
    priceUnder400: "Até R$ 400 mil",
    price400to700: "R$ 400 a 700 mil",
    priceOver700: "Acima de R$ 700 mil",
    sortLabel: "Ordenar",
    sortFeatured: "Destaques",
    sortPriceAsc: "Menor preço",
    sortPriceDesc: "Maior preço",
    sortKmAsc: "Menor km",
    resultOne: "1 veículo disponível",
    resultMany: "{n} veículos disponíveis",
    emptyTitle: "Nenhum veículo com esses filtros",
    emptyBody: "Ajuste a faixa de preço ou a marca — ou fale com a gente: todo mês chegam carros novos ao estoque.",
    emptyReset: "Limpar filtros",
    badges: {
      armored: "Blindado",
      oneOwner: "Único dono",
      factoryWarranty: "Garantia de fábrica",
    },
    fuel: { gas: "Gasolina", diesel: "Diesel", hybrid: "Híbrido" },
    trans: { auto: "Automático", manual: "Manual" },
    cardCta: "Tenho interesse",
    whatsappMsg: "Olá! Tenho interesse no {car} anunciado por {price} no site da Barcellos.",
  },
  financing: {
    label: "Financiamento",
    title: "Simule a parcela em segundos.",
    subtitle:
      "Trabalhamos com os principais bancos e aprovamos crédito no mesmo dia. Ajuste entrada e prazo e veja a parcela na hora.",
    vehicleLabel: "Veículo",
    customOption: "Outro valor…",
    customLabel: "Valor do veículo (R$)",
    downLabel: "Entrada",
    downHint: "arraste para ajustar",
    termLabel: "Prazo",
    termUnit: "meses",
    rateLabel: "Taxa a partir de",
    rateValue: "1,49% a.m.",
    installmentLabel: "Parcela estimada",
    perMonth: "/mês",
    financedLabel: "Total financiado",
    totalLabel: "Total do contrato",
    cetLabel: "CET aproximado",
    disclaimer:
      "Simulação ilustrativa pela Tabela Price, sem IOF e tarifas. Crédito sujeito a aprovação; taxa varia conforme perfil e banco.",
    cta: "Quero essa condição",
    whatsappMsg:
      "Olá! Simulei no site: {car}, entrada de {down}, {n} parcelas de {pmt}. Podemos avançar?",
  },
  tradein: {
    label: "Avalie seu usado",
    title: "Seu carro vale a entrada.",
    subtitle:
      "Conte o básico sobre o seu carro e nossa equipe devolve uma proposta referenciada na tabela FIPE — sem precisar sair de casa.",
    fields: {
      brand: "Marca",
      brandPh: "Ex.: Volkswagen",
      model: "Modelo",
      modelPh: "Ex.: T-Cross Highline",
      year: "Ano",
      yearPh: "2021",
      km: "Quilometragem",
      kmPh: "45.000",
      phone: "WhatsApp",
      phonePh: "(11) 98765-4321",
    },
    errors: {
      required: "Preencha este campo",
      phone: "Informe um WhatsApp válido com DDD",
    },
    submit: "Pedir avaliação",
    successTitle: "Recebemos os dados!",
    successBody: "Nossa equipe te chama no WhatsApp em até 2h úteis com a proposta.",
    successAgain: "Avaliar outro carro",
    note: "Avaliação sem compromisso. Pagamos à vista ou usamos como entrada.",
  },
  visit: {
    label: "Visita & test drive",
    title: "Venha tomar um café no showroom.",
    subtitle:
      "Escolha o melhor dia e horário. Deixamos o carro preparado — chave na mão, tanque cheio e rota de test drive pelos Jardins.",
    dayLabel: "Dia da semana",
    days: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    timeLabel: "Horário",
    submit: "Reservar horário",
    successTitle: "Horário reservado!",
    successBody: "{day}, às {time}. Te esperamos na Av. Europa, 1088 — qualquer imprevisto, é só chamar no WhatsApp.",
    addressLabel: "Endereço",
    address: "Av. Europa, 1088 — Jardim Europa, São Paulo/SP",
    hoursLabel: "Horário de funcionamento",
    hours: "Segunda a sábado, das 9h às 19h",
    mapTitle: "Mapa — Barcellos Veículos, Av. Europa 1088, São Paulo",
    mapCta: "Abrir no OpenStreetMap",
  },
  testimonials: {
    label: "Quem comprou, indica",
    title: "Histórias que saem daqui de chave nova.",
    items: [
      {
        name: "Ricardo Tavares",
        car: "Range Rover Sport 2023",
        quote:
          "Terceiro carro que compro na Barcellos. O laudo de procedência veio antes mesmo de eu pedir — é outro nível de transparência.",
      },
      {
        name: "Fernanda Lombardi",
        car: "Audi Q5 Sportback 2024",
        quote:
          "Fiz tudo pelo WhatsApp: avaliação do meu usado, financiamento e entrega em Campinas. Em quatro dias o Q5 estava na minha garagem.",
      },
      {
        name: "André Sant'Anna",
        car: "Porsche Cayenne Coupé 2022",
        quote:
          "Test drive marcado no sábado de manhã, café coado e zero pressão de venda. Fechei no mesmo dia, com a blindagem já certificada.",
      },
    ],
    sealsLabel: "Reconhecimentos",
    seals: [
      { icon: "award", title: "Top Dealer SP 2025", sub: "Prêmio fictício de excelência em seminovos" },
      { icon: "shield", title: "Blindagem certificada", sub: "Parceiros homologados nível III-A" },
      { icon: "badge", title: "Garantia Barcellos", sub: "1 ano de cobertura em motor e câmbio" },
    ],
  },
  footer: {
    blurb:
      "Concessionária familiar desde 1998. Seminovos premium e blindados com procedência auditada, nos Jardins, São Paulo.",
    navLabel: "Navegação",
    nav: [
      { href: NAV_ANCHORS[0], label: "Destaque da semana" },
      { href: NAV_ANCHORS[1], label: "Estoque" },
      { href: NAV_ANCHORS[2], label: "Financiamento" },
      { href: NAV_ANCHORS[3], label: "Avalie seu usado" },
      { href: NAV_ANCHORS[4], label: "Visita & test drive" },
    ],
    contactLabel: "Contato",
    phone: "(11) 4002-1998",
    whatsapp: "(11) 98123-0911",
    instagram: "@barcellos.veiculos",
    hoursLabel: "Funcionamento",
    hours: "Seg a sáb · 9h às 19h",
    address: "Av. Europa, 1088 — Jardim Europa, São Paulo/SP",
    disclaimer: "Barcellos Veículos é um conceito fictício criado pela VigApp.",
    rights: "© 2026 Barcellos Veículos. Todos os direitos reservados.",
  },
};

const en: BarcellosContent = {
  header: {
    nav: [
      { href: NAV_ANCHORS[0], label: "Featured" },
      { href: NAV_ANCHORS[1], label: "Inventory" },
      { href: NAV_ANCHORS[2], label: "Financing" },
      { href: NAV_ANCHORS[3], label: "Trade-in" },
      { href: NAV_ANCHORS[4], label: "Visit" },
    ],
    cta: "WhatsApp",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    whatsappMsg: "Hi! I found Barcellos Veículos online and would like to talk to a consultant.",
  },
  hero: {
    badge: "Jardins · São Paulo · since 1998",
    titleLead: "Your next car",
    titleAccent: "is already in our showroom.",
    subtitle:
      "Premium pre-owned and armored cars with a fully audited history, a 1-year Barcellos warranty and assisted delivery anywhere in Brazil.",
    bullets: ["Audited provenance", "1-year warranty", "Delivery across Brazil"],
    ctaPrimary: "Browse inventory",
    ctaSecondary: "Chat on WhatsApp",
    stats: [
      { value: "27", label: "years in business" },
      { value: "+11,400", label: "cars delivered" },
      { value: "4.9★", label: "Google rating" },
    ],
    stage: {
      eyebrow: "Car of the week",
      title: "Spin the car — Porsche 911 Carrera 4S",
      loadLabel: "View in 3D",
      hint: "Drag to rotate · scroll to zoom",
      priceTag: "R$ 899.900",
      fichaCta: "See the full spec sheet",
    },
  },
  featured: {
    label: "Car of the week",
    title: "Porsche 911 Carrera 4S",
    subtitle:
      "The very car you just spun in 3D, waiting at Av. Europa. One-owner, every service done at the official dealer.",
    specs: [
      { label: "Power", value: "450 hp" },
      { label: "0–100 km/h", value: "3.8 s" },
      { label: "Mileage", value: "18,400 km" },
      { label: "Year", value: "2022" },
      { label: "Gearbox", value: "8-speed PDK" },
      { label: "Fuel", value: "Petrol" },
    ],
    badges: ["One owner", "Full dealer service history", "Inspection report approved"],
    priceLabel: "Cash price",
    priceNote: "We take your current car as trade-in",
    ctaInterest: "I'm interested",
    ctaTestDrive: "Book a test drive",
    back3d: "Back to the 3D model",
    whatsappMsg:
      "Hi! I'm interested in the Porsche 911 Carrera 4S 2022 (car of the week) listed at R$ 899.900.",
  },
  stock: {
    label: "Inventory",
    title: "Hand-picked, one by one.",
    subtitle:
      "Every car clears a 160-point provenance audit before it reaches the floor. Prices in Brazilian reais (R$), cash.",
    brandLabel: "Brand",
    allBrands: "All",
    priceLabel: "Price range",
    priceAny: "Any price",
    priceUnder400: "Up to R$ 400k",
    price400to700: "R$ 400k – 700k",
    priceOver700: "Above R$ 700k",
    sortLabel: "Sort by",
    sortFeatured: "Featured",
    sortPriceAsc: "Lowest price",
    sortPriceDesc: "Highest price",
    sortKmAsc: "Lowest mileage",
    resultOne: "1 vehicle available",
    resultMany: "{n} vehicles available",
    emptyTitle: "No vehicles match these filters",
    emptyBody: "Adjust the price range or brand — or message us: fresh stock arrives every month.",
    emptyReset: "Clear filters",
    badges: {
      armored: "Armored",
      oneOwner: "One owner",
      factoryWarranty: "Factory warranty",
    },
    fuel: { gas: "Petrol", diesel: "Diesel", hybrid: "Hybrid" },
    trans: { auto: "Automatic", manual: "Manual" },
    cardCta: "I'm interested",
    whatsappMsg: "Hi! I'm interested in the {car} listed at {price} on the Barcellos site.",
  },
  financing: {
    label: "Financing",
    title: "Estimate your installment in seconds.",
    subtitle:
      "We work with Brazil's leading banks and approve credit the same day. Adjust the down payment and term to see your installment.",
    vehicleLabel: "Vehicle",
    customOption: "Custom amount…",
    customLabel: "Vehicle price (R$)",
    downLabel: "Down payment",
    downHint: "drag to adjust",
    termLabel: "Term",
    termUnit: "months",
    rateLabel: "Rates from",
    rateValue: "1.49%/month",
    installmentLabel: "Estimated installment",
    perMonth: "/mo",
    financedLabel: "Amount financed",
    totalLabel: "Contract total",
    cetLabel: "Approx. total cost rate",
    disclaimer:
      "Illustrative simulation using the Price amortization table, excluding IOF tax and fees. Credit subject to approval; rates vary by profile and bank.",
    cta: "Lock in this quote",
    whatsappMsg:
      "Hi! I ran a simulation on the site: {car}, {down} down, {n} installments of {pmt}. Can we proceed?",
  },
  tradein: {
    label: "Trade-in appraisal",
    title: "Your current car is your down payment.",
    subtitle:
      "Tell us the basics and our team returns a FIPE-referenced offer — without you leaving home.",
    fields: {
      brand: "Brand",
      brandPh: "e.g. Volkswagen",
      model: "Model",
      modelPh: "e.g. T-Cross Highline",
      year: "Year",
      yearPh: "2021",
      km: "Mileage (km)",
      kmPh: "45,000",
      phone: "WhatsApp",
      phonePh: "+55 11 98765-4321",
    },
    errors: {
      required: "This field is required",
      phone: "Enter a valid WhatsApp number with area code",
    },
    submit: "Request appraisal",
    successTitle: "Details received!",
    successBody: "Our team will message you on WhatsApp within 2 business hours with an offer.",
    successAgain: "Appraise another car",
    note: "No-obligation appraisal. We pay cash or apply it as your down payment.",
  },
  visit: {
    label: "Visit & test drive",
    title: "Come have a coffee at the showroom.",
    subtitle:
      "Pick the day and time that suit you. The car will be ready — keys in hand, full tank and a test route through Jardins.",
    dayLabel: "Day of the week",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    timeLabel: "Time",
    submit: "Reserve this slot",
    successTitle: "Slot reserved!",
    successBody: "{day} at {time}. See you at Av. Europa, 1088 — if anything changes, just ping us on WhatsApp.",
    addressLabel: "Address",
    address: "Av. Europa, 1088 — Jardim Europa, São Paulo/SP, Brazil",
    hoursLabel: "Opening hours",
    hours: "Monday to Saturday, 9 am – 7 pm",
    mapTitle: "Map — Barcellos Veículos, Av. Europa 1088, São Paulo",
    mapCta: "Open in OpenStreetMap",
  },
  testimonials: {
    label: "Owners recommend us",
    title: "Stories that drive away on a fresh set of keys.",
    items: [
      {
        name: "Ricardo Tavares",
        car: "Range Rover Sport 2023",
        quote:
          "Third car I buy from Barcellos. The provenance report arrived before I even asked — a different league of transparency.",
      },
      {
        name: "Fernanda Lombardi",
        car: "Audi Q5 Sportback 2024",
        quote:
          "Everything over WhatsApp: my trade-in appraisal, financing and delivery in Campinas. Four days later the Q5 was in my garage.",
      },
      {
        name: "André Sant'Anna",
        car: "Porsche Cayenne Coupé 2022",
        quote:
          "Test drive booked for Saturday morning, fresh coffee and zero sales pressure. Closed the same day, armor already certified.",
      },
    ],
    sealsLabel: "Recognitions",
    seals: [
      { icon: "award", title: "Top Dealer SP 2025", sub: "Fictional excellence award for pre-owned retail" },
      { icon: "shield", title: "Certified armoring", sub: "Level III-A homologated partners" },
      { icon: "badge", title: "Barcellos warranty", sub: "1 year of engine and gearbox coverage" },
    ],
  },
  footer: {
    blurb:
      "A family-run dealership since 1998. Premium pre-owned and armored cars with audited provenance, in Jardins, São Paulo.",
    navLabel: "Navigate",
    nav: [
      { href: NAV_ANCHORS[0], label: "Car of the week" },
      { href: NAV_ANCHORS[1], label: "Inventory" },
      { href: NAV_ANCHORS[2], label: "Financing" },
      { href: NAV_ANCHORS[3], label: "Trade-in appraisal" },
      { href: NAV_ANCHORS[4], label: "Visit & test drive" },
    ],
    contactLabel: "Contact",
    phone: "+55 11 4002-1998",
    whatsapp: "+55 11 98123-0911",
    instagram: "@barcellos.veiculos",
    hoursLabel: "Hours",
    hours: "Mon–Sat · 9 am – 7 pm",
    address: "Av. Europa, 1088 — Jardim Europa, São Paulo/SP, Brazil",
    disclaimer: "Barcellos Veículos is a fictional concept created by VigApp.",
    rights: "© 2026 Barcellos Veículos. All rights reserved.",
  },
};

const es: BarcellosContent = {
  header: {
    nav: [
      { href: NAV_ANCHORS[0], label: "Destacado" },
      { href: NAV_ANCHORS[1], label: "Stock" },
      { href: NAV_ANCHORS[2], label: "Financiación" },
      { href: NAV_ANCHORS[3], label: "Tasación" },
      { href: NAV_ANCHORS[4], label: "Visita" },
    ],
    cta: "WhatsApp",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    whatsappMsg: "¡Hola! Vi el sitio de Barcellos Veículos y quiero hablar con un asesor.",
  },
  hero: {
    badge: "Jardins · São Paulo · desde 1998",
    titleLead: "Tu próximo auto",
    titleAccent: "ya está en nuestro showroom.",
    subtitle:
      "Seminuevos premium y blindados con procedencia auditada punto por punto, garantía Barcellos de 1 año y entrega asistida en todo Brasil.",
    bullets: ["Procedencia auditada", "Garantía de 1 año", "Entrega en todo Brasil"],
    ctaPrimary: "Ver stock",
    ctaSecondary: "Hablar por WhatsApp",
    stats: [
      { value: "27", label: "años de mercado" },
      { value: "+11.400", label: "autos entregados" },
      { value: "4,9★", label: "valoración en Google" },
    ],
    stage: {
      eyebrow: "Destacado de la semana",
      title: "Gira el auto — Porsche 911 Carrera 4S",
      loadLabel: "Ver en 3D",
      hint: "Arrastra para girar · rueda para zoom",
      priceTag: "R$ 899.900",
      fichaCta: "Ver ficha completa",
    },
  },
  featured: {
    label: "Destacado de la semana",
    title: "Porsche 911 Carrera 4S",
    subtitle:
      "El mismo auto que acabas de girar en 3D, esperándote en Av. Europa. Un solo dueño y todas las revisiones hechas en el concesionario oficial.",
    specs: [
      { label: "Potencia", value: "450 cv" },
      { label: "0–100 km/h", value: "3,8 s" },
      { label: "Kilometraje", value: "18.400 km" },
      { label: "Año", value: "2022" },
      { label: "Caja", value: "PDK 8" },
      { label: "Combustible", value: "Gasolina" },
    ],
    badges: ["Único dueño", "Revisiones en el concesionario", "Informe pericial aprobado"],
    priceLabel: "Precio al contado",
    priceNote: "Aceptamos tu usado como parte de pago",
    ctaInterest: "Me interesa",
    ctaTestDrive: "Agendar test drive",
    back3d: "Volver al modelo 3D",
    whatsappMsg:
      "¡Hola! Me interesa el Porsche 911 Carrera 4S 2022 (destacado de la semana) publicado a R$ 899.900.",
  },
  stock: {
    label: "Stock",
    title: "Seleccionados uno a uno.",
    subtitle:
      "Cada auto pasa una auditoría de procedencia de 160 puntos antes de entrar al showroom. Precios en reales brasileños (R$), al contado.",
    brandLabel: "Marca",
    allBrands: "Todas",
    priceLabel: "Rango de precio",
    priceAny: "Cualquier precio",
    priceUnder400: "Hasta R$ 400 mil",
    price400to700: "R$ 400 a 700 mil",
    priceOver700: "Más de R$ 700 mil",
    sortLabel: "Ordenar",
    sortFeatured: "Destacados",
    sortPriceAsc: "Menor precio",
    sortPriceDesc: "Mayor precio",
    sortKmAsc: "Menos km",
    resultOne: "1 vehículo disponible",
    resultMany: "{n} vehículos disponibles",
    emptyTitle: "Ningún vehículo con esos filtros",
    emptyBody: "Ajusta el rango de precio o la marca — o escríbenos: cada mes entran autos nuevos al stock.",
    emptyReset: "Limpiar filtros",
    badges: {
      armored: "Blindado",
      oneOwner: "Único dueño",
      factoryWarranty: "Garantía de fábrica",
    },
    fuel: { gas: "Gasolina", diesel: "Diésel", hybrid: "Híbrido" },
    trans: { auto: "Automático", manual: "Manual" },
    cardCta: "Me interesa",
    whatsappMsg: "¡Hola! Me interesa el {car} publicado a {price} en el sitio de Barcellos.",
  },
  financing: {
    label: "Financiación",
    title: "Simula tu cuota en segundos.",
    subtitle:
      "Trabajamos con los principales bancos de Brasil y aprobamos el crédito el mismo día. Ajusta la entrada y el plazo y mira la cuota al instante.",
    vehicleLabel: "Vehículo",
    customOption: "Otro valor…",
    customLabel: "Valor del vehículo (R$)",
    downLabel: "Entrada",
    downHint: "arrastra para ajustar",
    termLabel: "Plazo",
    termUnit: "meses",
    rateLabel: "Tasa desde",
    rateValue: "1,49% mensual",
    installmentLabel: "Cuota estimada",
    perMonth: "/mes",
    financedLabel: "Total financiado",
    totalLabel: "Total del contrato",
    cetLabel: "Costo total aprox.",
    disclaimer:
      "Simulación ilustrativa con sistema francés (Tabla Price), sin IOF ni tarifas. Crédito sujeto a aprobación; la tasa varía según perfil y banco.",
    cta: "Quiero esta condición",
    whatsappMsg:
      "¡Hola! Simulé en el sitio: {car}, entrada de {down}, {n} cuotas de {pmt}. ¿Avanzamos?",
  },
  tradein: {
    label: "Tasa tu usado",
    title: "Tu auto vale la entrada.",
    subtitle:
      "Cuéntanos lo básico de tu auto y el equipo te devuelve una oferta referenciada en la tabla FIPE — sin salir de casa.",
    fields: {
      brand: "Marca",
      brandPh: "Ej.: Volkswagen",
      model: "Modelo",
      modelPh: "Ej.: T-Cross Highline",
      year: "Año",
      yearPh: "2021",
      km: "Kilometraje",
      kmPh: "45.000",
      phone: "WhatsApp",
      phonePh: "+55 11 98765-4321",
    },
    errors: {
      required: "Completa este campo",
      phone: "Ingresa un WhatsApp válido con código de área",
    },
    submit: "Pedir tasación",
    successTitle: "¡Datos recibidos!",
    successBody: "Nuestro equipo te escribe por WhatsApp en hasta 2h hábiles con la oferta.",
    successAgain: "Tasar otro auto",
    note: "Tasación sin compromiso. Pagamos al contado o lo tomamos como entrada.",
  },
  visit: {
    label: "Visita y test drive",
    title: "Ven a tomar un café al showroom.",
    subtitle:
      "Elige el mejor día y horario. Dejamos el auto listo — llave en mano, tanque lleno y ruta de test drive por Jardins.",
    dayLabel: "Día de la semana",
    days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    timeLabel: "Horario",
    submit: "Reservar horario",
    successTitle: "¡Horario reservado!",
    successBody: "{day}, a las {time}. Te esperamos en Av. Europa, 1088 — ante cualquier imprevisto, escríbenos por WhatsApp.",
    addressLabel: "Dirección",
    address: "Av. Europa, 1088 — Jardim Europa, São Paulo/SP, Brasil",
    hoursLabel: "Horario de atención",
    hours: "Lunes a sábado, de 9 a 19 h",
    mapTitle: "Mapa — Barcellos Veículos, Av. Europa 1088, São Paulo",
    mapCta: "Abrir en OpenStreetMap",
  },
  testimonials: {
    label: "Quien compró, recomienda",
    title: "Historias que salen de aquí con llave nueva.",
    items: [
      {
        name: "Ricardo Tavares",
        car: "Range Rover Sport 2023",
        quote:
          "Tercer auto que compro en Barcellos. El informe de procedencia llegó antes de que lo pidiera — otro nivel de transparencia.",
      },
      {
        name: "Fernanda Lombardi",
        car: "Audi Q5 Sportback 2024",
        quote:
          "Hice todo por WhatsApp: tasación de mi usado, financiación y entrega en Campinas. En cuatro días el Q5 estaba en mi garaje.",
      },
      {
        name: "André Sant'Anna",
        car: "Porsche Cayenne Coupé 2022",
        quote:
          "Test drive un sábado por la mañana, café recién hecho y cero presión de venta. Cerré el mismo día, con el blindaje certificado.",
      },
    ],
    sealsLabel: "Reconocimientos",
    seals: [
      { icon: "award", title: "Top Dealer SP 2025", sub: "Premio ficticio a la excelencia en seminuevos" },
      { icon: "shield", title: "Blindaje certificado", sub: "Talleres homologados nivel III-A" },
      { icon: "badge", title: "Garantía Barcellos", sub: "1 año de cobertura en motor y caja" },
    ],
  },
  footer: {
    blurb:
      "Concesionario familiar desde 1998. Seminuevos premium y blindados con procedencia auditada, en Jardins, São Paulo.",
    navLabel: "Navegación",
    nav: [
      { href: NAV_ANCHORS[0], label: "Destacado de la semana" },
      { href: NAV_ANCHORS[1], label: "Stock" },
      { href: NAV_ANCHORS[2], label: "Financiación" },
      { href: NAV_ANCHORS[3], label: "Tasa tu usado" },
      { href: NAV_ANCHORS[4], label: "Visita y test drive" },
    ],
    contactLabel: "Contacto",
    phone: "+55 11 4002-1998",
    whatsapp: "+55 11 98123-0911",
    instagram: "@barcellos.veiculos",
    hoursLabel: "Horario",
    hours: "Lun a sáb · 9 a 19 h",
    address: "Av. Europa, 1088 — Jardim Europa, São Paulo/SP, Brasil",
    disclaimer: "Barcellos Veículos es un concepto ficticio creado por VigApp.",
    rights: "© 2026 Barcellos Veículos. Todos los derechos reservados.",
  },
};

export const barcellosDict: DemoDictionary<BarcellosContent> = { en, pt, es };
