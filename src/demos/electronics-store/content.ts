import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type ProductIcon = "laptop" | "phone" | "audio" | "watch";

/** Product added to cart from the hero pre-order CTA. */
export const HERO_PRODUCT_ID = "nova-x1-ultra";

/** Fixed sale deadline so SSR and CSR render the same markup. */
export const DEAL_DEADLINE_ISO = "2026-12-31T21:00:00Z";

export interface HeaderContent {
  nav: { href: string; label: string }[];
  cartLabel: string;
  openMenu: string;
  closeMenu: string;
}

export interface HeroStat {
  label: string;
  value: string;
  pct: number;
}

export interface HeroContent {
  kicker: string;
  titleTop: string;
  titleAccent: string;
  sub: string;
  fromPrice: string;
  ctaPrimary: string;
  ctaSecondary: string;
  chipNew: string;
  imageAlt: string;
  statsTitle: string;
  stats: HeroStat[];
  footnote: string;
}

export interface CategoryTile {
  id: ProductIcon;
  name: string;
  series: string;
  count: string;
  fromPrice: string;
  imageAlt: string;
}

export interface CategoriesContent {
  label: string;
  title: string;
  intro: string;
  browse: string;
  tiles: CategoryTile[];
}

export interface CompareDevice {
  id: string;
  name: string;
  tier: string;
  price: string;
  highlight: string;
}

export interface CompareSpec {
  id: string;
  label: string;
  /** Index-aligned with CompareContent.devices. */
  values: { raw: number; display: string }[];
}

export interface CompareContent {
  label: string;
  title: string;
  intro: string;
  hint: string;
  leads: string;
  selectedTag: string;
  footnote: string;
  devices: CompareDevice[];
  specs: CompareSpec[];
}

export interface DealProduct {
  id: string;
  icon: ProductIcon;
  name: string;
  blurb: string;
  price: number;
  wasPrice: number;
  dealTag: string;
  claimedPct: number;
  claimedLabel: string;
}

export interface DealsContent {
  label: string;
  title: string;
  intro: string;
  endsIn: string;
  ended: string;
  units: { days: string; hours: string; minutes: string; seconds: string };
  addToCart: string;
  added: string;
  products: DealProduct[];
}

export interface Review {
  name: string;
  location: string;
  product: string;
  quote: string;
  rating: number;
}

export interface ReviewsContent {
  label: string;
  title: string;
  statLine: string;
  verified: string;
  ratingLabel: string;
  items: Review[];
}

export interface SupportItem {
  icon: "shield" | "truck" | "trade" | "help";
  title: string;
  body: string;
}

export interface SupportContent {
  label: string;
  title: string;
  intro: string;
  cta: string;
  imageAlt: string;
  items: SupportItem[];
}

export interface FooterContent {
  blurb: string;
  columns: { title: string; links: { href: string; label: string }[] }[];
  socialLabels: { newsletter: string; site: string; share: string };
  address: string;
  legal: string;
}

export interface CartContent {
  title: string;
  open: string;
  close: string;
  empty: string;
  emptyCta: string;
  subtotal: string;
  savings: string;
  taxNote: string;
  checkout: string;
  orderLabel: string;
  successTitle: string;
  successBody: string;
  continueShopping: string;
  remove: string;
  increase: string;
  decrease: string;
}

export interface VoltixContent {
  priceLocale: string;
  currency: string;
  header: HeaderContent;
  hero: HeroContent;
  categories: CategoriesContent;
  compare: CompareContent;
  deals: DealsContent;
  reviews: ReviewsContent;
  support: SupportContent;
  footer: FooterContent;
  cart: CartContent;
}

/* ------------------------------------------------------------------ */
/* English                                                             */
/* ------------------------------------------------------------------ */

const en: VoltixContent = {
  priceLocale: "en-US",
  currency: "USD",
  header: {
    nav: [
      { href: "#categories", label: "Categories" },
      { href: "#compare", label: "Compare" },
      { href: "#deals", label: "Deals" },
      { href: "#reviews", label: "Reviews" },
      { href: "#support", label: "Care" },
    ],
    cartLabel: "Cart",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    kicker: "Keynote 2026 — Nova Series",
    titleTop: "The new Nova X1 Ultra.",
    titleAccent: "Power you can feel.",
    sub: "A 16-core neural engine, 18 hours of real-world battery and a display that hits 3,000 nits. Machined in titanium, tuned for people who ship.",
    fromPrice: "From $2,299",
    ctaPrimary: "Pre-order now",
    ctaSecondary: "Compare the lineup",
    chipNew: "New",
    imageAlt: "Voltix Nova X1 Ultra laptop glowing on a dark keynote stage",
    statsTitle: "Lab numbers",
    stats: [
      { label: "Neural engine", value: "46 TOPS", pct: 92 },
      { label: "Battery life", value: "18 hrs", pct: 86 },
      { label: "Peak brightness", value: "3,000 nits", pct: 97 },
    ],
    footnote: "Free worldwide shipping. 30-day returns, no questions asked.",
  },
  categories: {
    label: "Shop by category",
    title: "Four lines. One obsession.",
    intro:
      "Every Voltix family is born in the same Austin lab and survives the same 214 torture tests before it earns a name. Pick your field.",
    browse: "Explore the line",
    tiles: [
      {
        id: "phone",
        name: "Phones",
        series: "Arc Series",
        count: "12 models",
        fromPrice: "From $649",
        imageAlt: "Two Voltix Arc phones face down on a dark surface",
      },
      {
        id: "laptop",
        name: "Laptops",
        series: "Nova Series",
        count: "8 models",
        fromPrice: "From $1,299",
        imageAlt: "Voltix Nova laptop open in low light",
      },
      {
        id: "audio",
        name: "Audio",
        series: "Pulse Series",
        count: "9 models",
        fromPrice: "From $129",
        imageAlt: "Macro circuit board of a Voltix Pulse audio driver",
      },
      {
        id: "watch",
        name: "Wearables",
        series: "Halo Series",
        count: "6 models",
        fromPrice: "From $199",
        imageAlt: "Voltix Halo devices arranged on a workbench",
      },
    ],
  },
  compare: {
    label: "Comparison engine",
    title: "Pick two. See the truth.",
    intro:
      "Select any two phones from the Arc 8 family and let the spec bars settle the argument.",
    hint: "Tap a device to swap it into the comparison",
    leads: "Leads",
    selectedTag: "In comparison",
    footnote:
      "Scores from the Voltix lab on firmware 8.2. Bars are scaled to the best result in the family.",
    devices: [
      {
        id: "arc-8",
        name: "Arc 8",
        tier: "Essential",
        price: "$799",
        highlight: "The everyday flagship",
      },
      {
        id: "arc-8-pro",
        name: "Arc 8 Pro",
        tier: "Pro",
        price: "$999",
        highlight: "Pro camera, pro battery",
      },
      {
        id: "arc-8-ultra",
        name: "Arc 8 Ultra",
        tier: "Ultra",
        price: "$1,299",
        highlight: "Everything turned up to eleven",
      },
    ],
    specs: [
      {
        id: "brightness",
        label: "Peak brightness",
        values: [
          { raw: 1600, display: "1,600 nits" },
          { raw: 2200, display: "2,200 nits" },
          { raw: 3000, display: "3,000 nits" },
        ],
      },
      {
        id: "battery",
        label: "Battery capacity",
        values: [
          { raw: 4700, display: "4,700 mAh" },
          { raw: 5100, display: "5,100 mAh" },
          { raw: 5800, display: "5,800 mAh" },
        ],
      },
      {
        id: "benchmark",
        label: "Voltmark score",
        values: [
          { raw: 162, display: "1.62M pts" },
          { raw: 198, display: "1.98M pts" },
          { raw: 241, display: "2.41M pts" },
        ],
      },
      {
        id: "charging",
        label: "Wired charging",
        values: [
          { raw: 68, display: "68 W" },
          { raw: 100, display: "100 W" },
          { raw: 140, display: "140 W" },
        ],
      },
      {
        id: "camera",
        label: "Camera lab score",
        values: [
          { raw: 138, display: "138 pts" },
          { raw: 151, display: "151 pts" },
          { raw: 163, display: "163 pts" },
        ],
      },
    ],
  },
  deals: {
    label: "Limited drops",
    title: "Voltix Days ends soon.",
    intro:
      "Real stock, real markdowns. When a bar fills up, that price is gone for the year.",
    endsIn: "Ends in",
    ended: "This drop has closed",
    units: { days: "days", hours: "hrs", minutes: "min", seconds: "sec" },
    addToCart: "Add to cart",
    added: "In cart",
    products: [
      {
        id: "nova-x1-ultra",
        icon: "laptop",
        name: "Nova X1 Ultra",
        blurb: "16-core neural engine, 18-hour battery, titanium shell.",
        price: 2299,
        wasPrice: 2499,
        dealTag: "Save $200",
        claimedPct: 41,
        claimedLabel: "41% claimed",
      },
      {
        id: "arc-8-pro",
        icon: "phone",
        name: "Arc 8 Pro",
        blurb: "200 MP periscope camera and two full days on one charge.",
        price: 999,
        wasPrice: 1199,
        dealTag: "Save $200",
        claimedPct: 72,
        claimedLabel: "72% claimed",
      },
      {
        id: "pulse-buds",
        icon: "audio",
        name: "Pulse Buds ANC",
        blurb: "Adaptive noise cancelling rated at minus 48 decibels.",
        price: 189,
        wasPrice: 249,
        dealTag: "Save $60",
        claimedPct: 84,
        claimedLabel: "84% claimed",
      },
      {
        id: "halo-watch",
        icon: "watch",
        name: "Halo Watch S2",
        blurb: "Dual-band GPS, ECG and a 21-day always-on battery.",
        price: 349,
        wasPrice: 429,
        dealTag: "Save $80",
        claimedPct: 58,
        claimedLabel: "58% claimed",
      },
    ],
  },
  reviews: {
    label: "Field notes",
    title: "Rated by people who push hardware.",
    statLine: "4.9 out of 5 across 12,480 verified orders",
    verified: "Verified purchase",
    ratingLabel: "out of 5 stars",
    items: [
      {
        name: "Larissa Nogueira",
        location: "São Paulo, Brazil",
        product: "Arc 8 Ultra",
        quote:
          "I edit 4K drone footage on my phone between client visits. The Arc 8 Ultra renders faster than the laptop it replaced.",
        rating: 5,
      },
      {
        name: "Tomás Herrera",
        location: "Madrid, Spain",
        product: "Nova X1 Ultra",
        quote:
          "Three compile-heavy workdays on one charge. I stopped carrying the power brick to the office entirely.",
        rating: 5,
      },
      {
        name: "Aisha Rahman",
        location: "Toronto, Canada",
        product: "Pulse Buds ANC",
        quote:
          "The ANC swallows the subway whole. I only dock a star because the case is a fingerprint magnet.",
        rating: 4,
      },
      {
        name: "João Pedro Almeida",
        location: "Recife, Brazil",
        product: "Halo Watch S2",
        quote:
          "Twenty-one days of battery is not marketing. Mine did twenty-three with GPS runs every morning.",
        rating: 5,
      },
      {
        name: "Ingrid Svensson",
        location: "Stockholm, Sweden",
        product: "Arc 8 Pro",
        quote:
          "Night photos in a Nordic winter finally look like what my eyes see. Support swapped a scratched unit in two days.",
        rating: 4,
      },
    ],
  },
  support: {
    label: "Voltix Care",
    title: "Covered from unboxing to upgrade.",
    intro:
      "Buying the device is the start of the deal, not the end of it. Every order ships with the full Care stack, no add-ons to hunt for.",
    cta: "Talk to Voltix Care",
    imageAlt: "Backlit keyboard texture in the dark",
    items: [
      {
        icon: "shield",
        title: "3-year Volt Shield",
        body: "Accidental damage cover on every device for three full years. No deductibles, no small print.",
      },
      {
        icon: "truck",
        title: "48-hour express",
        body: "Tracked express delivery on all orders, with a live courier map from warehouse to doorstep.",
      },
      {
        icon: "trade",
        title: "Trade up anytime",
        body: "Your trade-in value is locked at purchase. Upgrade whenever and the credit is waiting.",
      },
      {
        icon: "help",
        title: "Humans, 24/7",
        body: "Real engineers on chat around the clock. Median first response time last quarter: 41 seconds.",
      },
    ],
  },
  footer: {
    blurb:
      "Flagship electronics engineered in Austin, tested past breaking point, priced without the tax on hype.",
    columns: [
      {
        title: "Shop",
        links: [
          { href: "#categories", label: "Phones" },
          { href: "#categories", label: "Laptops" },
          { href: "#categories", label: "Audio" },
          { href: "#categories", label: "Wearables" },
        ],
      },
      {
        title: "Explore",
        links: [
          { href: "#compare", label: "Comparison engine" },
          { href: "#deals", label: "Voltix Days" },
          { href: "#reviews", label: "Field notes" },
        ],
      },
      {
        title: "Care",
        links: [
          { href: "#support", label: "Volt Shield warranty" },
          { href: "#support", label: "Shipping" },
          { href: "#support", label: "Trade-in" },
        ],
      },
    ],
    socialLabels: {
      newsletter: "Subscribe to the newsletter",
      site: "Voltix worldwide",
      share: "Share Voltix",
    },
    address: "1240 Neon Circuit, Austin, TX 78701",
    legal:
      "Voltix is a fictional brand concept designed and built by VigApp. Every spec on this page is invented.",
  },
  cart: {
    title: "Your cart",
    open: "Open cart",
    close: "Close cart",
    empty: "Your cart is empty. The drops below will fix that.",
    emptyCta: "See the deals",
    subtotal: "Subtotal",
    savings: "You save",
    taxNote: "Taxes and shipping calculated at checkout.",
    checkout: "Checkout securely",
    orderLabel: "Order",
    successTitle: "Order confirmed.",
    successBody:
      "A confirmation is on its way to your inbox. Your gear leaves the warehouse within 48 hours.",
    continueShopping: "Keep shopping",
    remove: "Remove item",
    increase: "Increase quantity",
    decrease: "Decrease quantity",
  },
};

/* ------------------------------------------------------------------ */
/* Portuguese (Brazil)                                                 */
/* ------------------------------------------------------------------ */

const pt: VoltixContent = {
  priceLocale: "pt-BR",
  currency: "BRL",
  header: {
    nav: [
      { href: "#categories", label: "Categorias" },
      { href: "#compare", label: "Comparar" },
      { href: "#deals", label: "Ofertas" },
      { href: "#reviews", label: "Avaliações" },
      { href: "#support", label: "Care" },
    ],
    cartLabel: "Carrinho",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
  },
  hero: {
    kicker: "Keynote 2026 — Linha Nova",
    titleTop: "O novo Nova X1 Ultra.",
    titleAccent: "Potência que se sente.",
    sub: "Motor neural de 16 núcleos, 18 horas de bateria no uso real e uma tela que chega a 3.000 nits. Usinado em titânio, afinado para quem entrega.",
    fromPrice: "A partir de R$ 19.999",
    ctaPrimary: "Reservar agora",
    ctaSecondary: "Comparar a linha",
    chipNew: "Novo",
    imageAlt: "Notebook Voltix Nova X1 Ultra brilhando em um palco escuro de keynote",
    statsTitle: "Números de laboratório",
    stats: [
      { label: "Motor neural", value: "46 TOPS", pct: 92 },
      { label: "Bateria", value: "18 h", pct: 86 },
      { label: "Brilho de pico", value: "3.000 nits", pct: 97 },
    ],
    footnote: "Frete grátis para todo o Brasil. Devolução em 30 dias, sem perguntas.",
  },
  categories: {
    label: "Compre por categoria",
    title: "Quatro linhas. Uma obsessão.",
    intro:
      "Toda família Voltix nasce no mesmo laboratório em Austin e sobrevive aos mesmos 214 testes de tortura antes de ganhar nome. Escolha o seu campo.",
    browse: "Explorar a linha",
    tiles: [
      {
        id: "phone",
        name: "Celulares",
        series: "Linha Arc",
        count: "12 modelos",
        fromPrice: "A partir de R$ 5.299",
        imageAlt: "Dois celulares Voltix Arc virados sobre uma superfície escura",
      },
      {
        id: "laptop",
        name: "Notebooks",
        series: "Linha Nova",
        count: "8 modelos",
        fromPrice: "A partir de R$ 10.999",
        imageAlt: "Notebook Voltix Nova aberto sob luz baixa",
      },
      {
        id: "audio",
        name: "Áudio",
        series: "Linha Pulse",
        count: "9 modelos",
        fromPrice: "A partir de R$ 999",
        imageAlt: "Macro da placa de circuito de um driver de áudio Voltix Pulse",
      },
      {
        id: "watch",
        name: "Vestíveis",
        series: "Linha Halo",
        count: "6 modelos",
        fromPrice: "A partir de R$ 1.599",
        imageAlt: "Dispositivos Voltix Halo organizados sobre uma bancada",
      },
    ],
  },
  compare: {
    label: "Motor de comparação",
    title: "Escolha dois. Veja a verdade.",
    intro:
      "Selecione dois aparelhos da família Arc 8 e deixe as barras de especificação encerrarem a discussão.",
    hint: "Toque em um aparelho para trocá-lo na comparação",
    leads: "Lidera",
    selectedTag: "Na comparação",
    footnote:
      "Pontuações do laboratório Voltix no firmware 8.2. As barras usam a escala do melhor resultado da família.",
    devices: [
      {
        id: "arc-8",
        name: "Arc 8",
        tier: "Essencial",
        price: "R$ 6.499",
        highlight: "O flagship de todo dia",
      },
      {
        id: "arc-8-pro",
        name: "Arc 8 Pro",
        tier: "Pro",
        price: "R$ 7.999",
        highlight: "Câmera pro, bateria pro",
      },
      {
        id: "arc-8-ultra",
        name: "Arc 8 Ultra",
        tier: "Ultra",
        price: "R$ 10.499",
        highlight: "Tudo no talo",
      },
    ],
    specs: [
      {
        id: "brightness",
        label: "Brilho de pico",
        values: [
          { raw: 1600, display: "1.600 nits" },
          { raw: 2200, display: "2.200 nits" },
          { raw: 3000, display: "3.000 nits" },
        ],
      },
      {
        id: "battery",
        label: "Capacidade da bateria",
        values: [
          { raw: 4700, display: "4.700 mAh" },
          { raw: 5100, display: "5.100 mAh" },
          { raw: 5800, display: "5.800 mAh" },
        ],
      },
      {
        id: "benchmark",
        label: "Pontuação Voltmark",
        values: [
          { raw: 162, display: "1,62M pts" },
          { raw: 198, display: "1,98M pts" },
          { raw: 241, display: "2,41M pts" },
        ],
      },
      {
        id: "charging",
        label: "Carregamento com fio",
        values: [
          { raw: 68, display: "68 W" },
          { raw: 100, display: "100 W" },
          { raw: 140, display: "140 W" },
        ],
      },
      {
        id: "camera",
        label: "Nota de câmera",
        values: [
          { raw: 138, display: "138 pts" },
          { raw: 151, display: "151 pts" },
          { raw: 163, display: "163 pts" },
        ],
      },
    ],
  },
  deals: {
    label: "Ofertas por tempo limitado",
    title: "O Voltix Days termina em breve.",
    intro:
      "Estoque de verdade, desconto de verdade. Quando a barra enche, o preço some até o ano que vem.",
    endsIn: "Termina em",
    ended: "Esta oferta foi encerrada",
    units: { days: "dias", hours: "h", minutes: "min", seconds: "seg" },
    addToCart: "Adicionar ao carrinho",
    added: "No carrinho",
    products: [
      {
        id: "nova-x1-ultra",
        icon: "laptop",
        name: "Nova X1 Ultra",
        blurb: "Motor neural de 16 núcleos, 18 h de bateria, corpo em titânio.",
        price: 19999,
        wasPrice: 21999,
        dealTag: "Economize R$ 2.000",
        claimedPct: 41,
        claimedLabel: "41% reservado",
      },
      {
        id: "arc-8-pro",
        icon: "phone",
        name: "Arc 8 Pro",
        blurb: "Câmera periscópio de 200 MP e dois dias inteiros de bateria.",
        price: 7999,
        wasPrice: 9499,
        dealTag: "Economize R$ 1.500",
        claimedPct: 72,
        claimedLabel: "72% reservado",
      },
      {
        id: "pulse-buds",
        icon: "audio",
        name: "Pulse Buds ANC",
        blurb: "Cancelamento de ruído adaptativo de menos 48 decibéis.",
        price: 1449,
        wasPrice: 1899,
        dealTag: "Economize R$ 450",
        claimedPct: 84,
        claimedLabel: "84% reservado",
      },
      {
        id: "halo-watch",
        icon: "watch",
        name: "Halo Watch S2",
        blurb: "GPS de banda dupla, ECG e 21 dias de bateria com tela sempre ativa.",
        price: 2699,
        wasPrice: 3299,
        dealTag: "Economize R$ 600",
        claimedPct: 58,
        claimedLabel: "58% reservado",
      },
    ],
  },
  reviews: {
    label: "Notas de campo",
    title: "Avaliado por quem exige da máquina.",
    statLine: "4,9 de 5 em 12.480 pedidos verificados",
    verified: "Compra verificada",
    ratingLabel: "de 5 estrelas",
    items: [
      {
        name: "Larissa Nogueira",
        location: "São Paulo, Brasil",
        product: "Arc 8 Ultra",
        quote:
          "Edito imagens de drone em 4K no celular entre visitas a clientes. O Arc 8 Ultra renderiza mais rápido que o notebook que ele aposentou.",
        rating: 5,
      },
      {
        name: "Tomás Herrera",
        location: "Madri, Espanha",
        product: "Nova X1 Ultra",
        quote:
          "Três dias de trabalho pesado de compilação com uma carga. Parei de levar o carregador para o escritório.",
        rating: 5,
      },
      {
        name: "Aisha Rahman",
        location: "Toronto, Canadá",
        product: "Pulse Buds ANC",
        quote:
          "O ANC engole o metrô inteiro. Só tiro uma estrela porque o estojo é um ímã de digitais.",
        rating: 4,
      },
      {
        name: "João Pedro Almeida",
        location: "Recife, Brasil",
        product: "Halo Watch S2",
        quote:
          "Vinte e um dias de bateria não é marketing. O meu fez vinte e três com corrida de GPS toda manhã.",
        rating: 5,
      },
      {
        name: "Ingrid Svensson",
        location: "Estocolmo, Suécia",
        product: "Arc 8 Pro",
        quote:
          "Fotos noturnas no inverno nórdico finalmente parecem o que meus olhos veem. O suporte trocou uma unidade riscada em dois dias.",
        rating: 4,
      },
    ],
  },
  support: {
    label: "Voltix Care",
    title: "Protegido do unboxing ao upgrade.",
    intro:
      "Comprar o aparelho é o começo do acordo, não o fim. Todo pedido já sai com o pacote Care completo, sem adicionais escondidos.",
    cta: "Falar com o Voltix Care",
    imageAlt: "Textura de teclado retroiluminado no escuro",
    items: [
      {
        icon: "shield",
        title: "Volt Shield de 3 anos",
        body: "Cobertura contra danos acidentais em todo aparelho por três anos completos. Sem franquia, sem letra miúda.",
      },
      {
        icon: "truck",
        title: "Expresso em 48 horas",
        body: "Entrega expressa rastreada em todos os pedidos, com mapa do entregador ao vivo do galpão até a sua porta.",
      },
      {
        icon: "trade",
        title: "Upgrade quando quiser",
        body: "O valor do seu aparelho na troca fica travado na compra. Faça o upgrade quando quiser e o crédito estará esperando.",
      },
      {
        icon: "help",
        title: "Humanos, 24 horas",
        body: "Engenheiros de verdade no chat a qualquer hora. Tempo mediano de primeira resposta no último trimestre: 41 segundos.",
      },
    ],
  },
  footer: {
    blurb:
      "Eletrônicos de ponta projetados em Austin, testados além do limite e com preço sem a taxa do hype.",
    columns: [
      {
        title: "Loja",
        links: [
          { href: "#categories", label: "Celulares" },
          { href: "#categories", label: "Notebooks" },
          { href: "#categories", label: "Áudio" },
          { href: "#categories", label: "Vestíveis" },
        ],
      },
      {
        title: "Explorar",
        links: [
          { href: "#compare", label: "Motor de comparação" },
          { href: "#deals", label: "Voltix Days" },
          { href: "#reviews", label: "Notas de campo" },
        ],
      },
      {
        title: "Care",
        links: [
          { href: "#support", label: "Garantia Volt Shield" },
          { href: "#support", label: "Envio" },
          { href: "#support", label: "Trade-in" },
        ],
      },
    ],
    socialLabels: {
      newsletter: "Assinar a newsletter",
      site: "Voltix no mundo",
      share: "Compartilhar a Voltix",
    },
    address: "1240 Neon Circuit, Austin, TX 78701",
    legal:
      "Voltix é uma marca fictícia, conceito criado e desenvolvido pela VigApp. Todas as especificações desta página são inventadas.",
  },
  cart: {
    title: "Seu carrinho",
    open: "Abrir carrinho",
    close: "Fechar carrinho",
    empty: "Seu carrinho está vazio. As ofertas ali embaixo resolvem isso.",
    emptyCta: "Ver as ofertas",
    subtotal: "Subtotal",
    savings: "Você economiza",
    taxNote: "Impostos e frete calculados no checkout.",
    checkout: "Finalizar compra",
    orderLabel: "Pedido",
    successTitle: "Pedido confirmado.",
    successBody:
      "A confirmação já está a caminho do seu e-mail. Seu equipamento sai do centro de distribuição em até 48 horas.",
    continueShopping: "Continuar comprando",
    remove: "Remover item",
    increase: "Aumentar quantidade",
    decrease: "Diminuir quantidade",
  },
};

/* ------------------------------------------------------------------ */
/* Spanish (Spain)                                                     */
/* ------------------------------------------------------------------ */

const es: VoltixContent = {
  priceLocale: "es-ES",
  currency: "EUR",
  header: {
    nav: [
      { href: "#categories", label: "Categorías" },
      { href: "#compare", label: "Comparar" },
      { href: "#deals", label: "Ofertas" },
      { href: "#reviews", label: "Opiniones" },
      { href: "#support", label: "Care" },
    ],
    cartLabel: "Cesta",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  hero: {
    kicker: "Keynote 2026 — Serie Nova",
    titleTop: "El nuevo Nova X1 Ultra.",
    titleAccent: "Potencia que se nota.",
    sub: "Motor neuronal de 16 núcleos, 18 horas de batería en uso real y una pantalla que alcanza los 3.000 nits. Mecanizado en titanio, afinado para la gente que entrega.",
    fromPrice: "Desde 2.399 €",
    ctaPrimary: "Resérvalo ya",
    ctaSecondary: "Compara la gama",
    chipNew: "Nuevo",
    imageAlt: "Portátil Voltix Nova X1 Ultra brillando en un escenario oscuro de keynote",
    statsTitle: "Cifras de laboratorio",
    stats: [
      { label: "Motor neuronal", value: "46 TOPS", pct: 92 },
      { label: "Batería", value: "18 h", pct: 86 },
      { label: "Brillo máximo", value: "3.000 nits", pct: 97 },
    ],
    footnote: "Envío gratis a toda España. Devoluciones en 30 días, sin preguntas.",
  },
  categories: {
    label: "Compra por categoría",
    title: "Cuatro gamas. Una obsesión.",
    intro:
      "Cada familia Voltix nace en el mismo laboratorio de Austin y sobrevive a las mismas 214 pruebas de tortura antes de ganarse un nombre. Elige tu terreno.",
    browse: "Explorar la gama",
    tiles: [
      {
        id: "phone",
        name: "Móviles",
        series: "Serie Arc",
        count: "12 modelos",
        fromPrice: "Desde 599 €",
        imageAlt: "Dos móviles Voltix Arc boca abajo sobre una superficie oscura",
      },
      {
        id: "laptop",
        name: "Portátiles",
        series: "Serie Nova",
        count: "8 modelos",
        fromPrice: "Desde 1.199 €",
        imageAlt: "Portátil Voltix Nova abierto con luz tenue",
      },
      {
        id: "audio",
        name: "Audio",
        series: "Serie Pulse",
        count: "9 modelos",
        fromPrice: "Desde 119 €",
        imageAlt: "Macro de la placa de circuito de un driver de audio Voltix Pulse",
      },
      {
        id: "watch",
        name: "Wearables",
        series: "Serie Halo",
        count: "6 modelos",
        fromPrice: "Desde 179 €",
        imageAlt: "Dispositivos Voltix Halo ordenados sobre un banco de trabajo",
      },
    ],
  },
  compare: {
    label: "Motor de comparación",
    title: "Elige dos. Mira la verdad.",
    intro:
      "Selecciona dos móviles de la familia Arc 8 y deja que las barras de especificaciones zanjen la discusión.",
    hint: "Toca un dispositivo para meterlo en la comparación",
    leads: "Lidera",
    selectedTag: "En comparación",
    footnote:
      "Puntuaciones del laboratorio Voltix con firmware 8.2. Las barras se escalan al mejor resultado de la familia.",
    devices: [
      {
        id: "arc-8",
        name: "Arc 8",
        tier: "Essential",
        price: "749 €",
        highlight: "El buque insignia de diario",
      },
      {
        id: "arc-8-pro",
        name: "Arc 8 Pro",
        tier: "Pro",
        price: "1.049 €",
        highlight: "Cámara pro, batería pro",
      },
      {
        id: "arc-8-ultra",
        name: "Arc 8 Ultra",
        tier: "Ultra",
        price: "1.349 €",
        highlight: "Todo llevado al once",
      },
    ],
    specs: [
      {
        id: "brightness",
        label: "Brillo máximo",
        values: [
          { raw: 1600, display: "1.600 nits" },
          { raw: 2200, display: "2.200 nits" },
          { raw: 3000, display: "3.000 nits" },
        ],
      },
      {
        id: "battery",
        label: "Capacidad de batería",
        values: [
          { raw: 4700, display: "4.700 mAh" },
          { raw: 5100, display: "5.100 mAh" },
          { raw: 5800, display: "5.800 mAh" },
        ],
      },
      {
        id: "benchmark",
        label: "Puntuación Voltmark",
        values: [
          { raw: 162, display: "1,62M pts" },
          { raw: 198, display: "1,98M pts" },
          { raw: 241, display: "2,41M pts" },
        ],
      },
      {
        id: "charging",
        label: "Carga con cable",
        values: [
          { raw: 68, display: "68 W" },
          { raw: 100, display: "100 W" },
          { raw: 140, display: "140 W" },
        ],
      },
      {
        id: "camera",
        label: "Nota de cámara",
        values: [
          { raw: 138, display: "138 pts" },
          { raw: 151, display: "151 pts" },
          { raw: 163, display: "163 pts" },
        ],
      },
    ],
  },
  deals: {
    label: "Ofertas limitadas",
    title: "Los Voltix Days terminan pronto.",
    intro:
      "Stock real, rebajas reales. Cuando una barra se llena, ese precio desaparece hasta el año que viene.",
    endsIn: "Termina en",
    ended: "Esta oferta ha cerrado",
    units: { days: "días", hours: "h", minutes: "min", seconds: "seg" },
    addToCart: "Añadir a la cesta",
    added: "En la cesta",
    products: [
      {
        id: "nova-x1-ultra",
        icon: "laptop",
        name: "Nova X1 Ultra",
        blurb: "Motor neuronal de 16 núcleos, 18 h de batería, chasis de titanio.",
        price: 2399,
        wasPrice: 2599,
        dealTag: "Ahorra 200 €",
        claimedPct: 41,
        claimedLabel: "41% reservado",
      },
      {
        id: "arc-8-pro",
        icon: "phone",
        name: "Arc 8 Pro",
        blurb: "Cámara periscopio de 200 MP y dos días enteros con una carga.",
        price: 1049,
        wasPrice: 1249,
        dealTag: "Ahorra 200 €",
        claimedPct: 72,
        claimedLabel: "72% reservado",
      },
      {
        id: "pulse-buds",
        icon: "audio",
        name: "Pulse Buds ANC",
        blurb: "Cancelación de ruido adaptativa de menos 48 decibelios.",
        price: 199,
        wasPrice: 259,
        dealTag: "Ahorra 60 €",
        claimedPct: 84,
        claimedLabel: "84% reservado",
      },
      {
        id: "halo-watch",
        icon: "watch",
        name: "Halo Watch S2",
        blurb: "GPS de doble banda, ECG y 21 días de batería con pantalla siempre activa.",
        price: 369,
        wasPrice: 449,
        dealTag: "Ahorra 80 €",
        claimedPct: 58,
        claimedLabel: "58% reservado",
      },
    ],
  },
  reviews: {
    label: "Notas de campo",
    title: "Valorado por gente que exprime el hardware.",
    statLine: "4,9 sobre 5 en 12.480 pedidos verificados",
    verified: "Compra verificada",
    ratingLabel: "de 5 estrellas",
    items: [
      {
        name: "Larissa Nogueira",
        location: "São Paulo, Brasil",
        product: "Arc 8 Ultra",
        quote:
          "Edito material de dron en 4K en el móvil entre visitas a clientes. El Arc 8 Ultra renderiza más rápido que el portátil al que jubiló.",
        rating: 5,
      },
      {
        name: "Tomás Herrera",
        location: "Madrid, España",
        product: "Nova X1 Ultra",
        quote:
          "Tres jornadas de compilación intensiva con una sola carga. Dejé de llevar el cargador a la oficina.",
        rating: 5,
      },
      {
        name: "Aisha Rahman",
        location: "Toronto, Canadá",
        product: "Pulse Buds ANC",
        quote:
          "La cancelación de ruido se traga el metro entero. Solo quito una estrella porque el estuche es un imán de huellas.",
        rating: 4,
      },
      {
        name: "João Pedro Almeida",
        location: "Recife, Brasil",
        product: "Halo Watch S2",
        quote:
          "Veintiún días de batería no es marketing. El mío hizo veintitrés con carreras con GPS cada mañana.",
        rating: 5,
      },
      {
        name: "Ingrid Svensson",
        location: "Estocolmo, Suecia",
        product: "Arc 8 Pro",
        quote:
          "Las fotos nocturnas en un invierno nórdico por fin se parecen a lo que ven mis ojos. Soporte me cambió una unidad rayada en dos días.",
        rating: 4,
      },
    ],
  },
  support: {
    label: "Voltix Care",
    title: "Cubierto del unboxing al upgrade.",
    intro:
      "Comprar el dispositivo es el principio del trato, no el final. Cada pedido sale con el paquete Care completo, sin extras que rebuscar.",
    cta: "Hablar con Voltix Care",
    imageAlt: "Textura de teclado retroiluminado en la oscuridad",
    items: [
      {
        icon: "shield",
        title: "Volt Shield de 3 años",
        body: "Cobertura por daños accidentales en cada dispositivo durante tres años completos. Sin franquicias, sin letra pequeña.",
      },
      {
        icon: "truck",
        title: "Exprés en 48 horas",
        body: "Entrega exprés con seguimiento en todos los pedidos, con mapa del mensajero en directo del almacén a tu puerta.",
      },
      {
        icon: "trade",
        title: "Renueva cuando quieras",
        body: "El valor de tu equipo antiguo queda bloqueado al comprar. Renueva cuando quieras y el crédito estará esperando.",
      },
      {
        icon: "help",
        title: "Humanos, 24/7",
        body: "Ingenieros de verdad en el chat a cualquier hora. Mediana de primera respuesta el último trimestre: 41 segundos.",
      },
    ],
  },
  footer: {
    blurb:
      "Electrónica de gama alta diseñada en Austin, probada más allá del límite y con precios sin el impuesto del hype.",
    columns: [
      {
        title: "Tienda",
        links: [
          { href: "#categories", label: "Móviles" },
          { href: "#categories", label: "Portátiles" },
          { href: "#categories", label: "Audio" },
          { href: "#categories", label: "Wearables" },
        ],
      },
      {
        title: "Explorar",
        links: [
          { href: "#compare", label: "Motor de comparación" },
          { href: "#deals", label: "Voltix Days" },
          { href: "#reviews", label: "Notas de campo" },
        ],
      },
      {
        title: "Care",
        links: [
          { href: "#support", label: "Garantía Volt Shield" },
          { href: "#support", label: "Envíos" },
          { href: "#support", label: "Plan renove" },
        ],
      },
    ],
    socialLabels: {
      newsletter: "Suscribirse a la newsletter",
      site: "Voltix en el mundo",
      share: "Compartir Voltix",
    },
    address: "1240 Neon Circuit, Austin, TX 78701",
    legal:
      "Voltix es una marca ficticia, un concepto diseñado y construido por VigApp. Todas las especificaciones de esta página son inventadas.",
  },
  cart: {
    title: "Tu cesta",
    open: "Abrir la cesta",
    close: "Cerrar la cesta",
    empty: "Tu cesta está vacía. Las ofertas de abajo lo arreglan.",
    emptyCta: "Ver las ofertas",
    subtotal: "Subtotal",
    savings: "Ahorras",
    taxNote: "Impuestos y envío calculados al pagar.",
    checkout: "Pagar de forma segura",
    orderLabel: "Pedido",
    successTitle: "Pedido confirmado.",
    successBody:
      "La confirmación va de camino a tu correo. Tu equipo sale del almacén en menos de 48 horas.",
    continueShopping: "Seguir comprando",
    remove: "Quitar artículo",
    increase: "Aumentar cantidad",
    decrease: "Reducir cantidad",
  },
};

export const voltixDict: DemoDictionary<VoltixContent> = { en, pt, es };
