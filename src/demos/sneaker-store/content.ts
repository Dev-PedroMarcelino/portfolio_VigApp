import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface CartLine {
  key: string;
  name: string;
  size: string;
  price: number;
  image: string;
}

export interface NavItem {
  href: string;
  label: string;
}

export interface HeaderContent {
  nav: NavItem[];
  cartLabel: string;
  openMenu: string;
  closeMenu: string;
}

export interface CartContent {
  title: string;
  empty: string;
  emptyHint: string;
  sizeWord: string;
  subtotal: string;
  shippingNote: string;
  checkout: string;
  remove: string;
  close: string;
  countLabel: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroContent {
  live: string;
  dropTag: string;
  titleTop: string;
  titleMid: string;
  titleBottom: string;
  sub: string;
  countdownLabel: string;
  units: { days: string; hours: string; minutes: string; seconds: string };
  liveNow: string;
  ctaPrimary: string;
  ctaSecondary: string;
  imageAlt: string;
  stats: HeroStat[];
  marquee: string;
}

export interface SizeOption {
  us: string;
  available: boolean;
}

export interface LatestContent {
  label: string;
  title: string;
  intro: string;
  colorway: string;
  name: string;
  price: number;
  description: string;
  specsLabel: string;
  specs: { k: string; v: string }[];
  sizeLabel: string;
  sizeUnit: string;
  soldOutSize: string;
  pickSize: string;
  addToCart: string;
  added: string;
  lowStock: string;
  sizes: SizeOption[];
  imageAlt: string;
  thumbAlts: string[];
  thumbs: string[];
}

/* --------------------------- Catalog ------------------------------ */

export type CatalogCategory = "sneakers" | "apparel" | "accessories";
export type CatalogFilter = "all" | CatalogCategory;
export type SortId = "featured" | "new" | "price-asc" | "price-desc";

export interface CatalogItem {
  id: string;
  category: CatalogCategory;
  name: string;
  colorway: string;
  price: number;
  /** Available sizes; a single "U" entry means one-size. */
  sizes: string[];
  isNew?: boolean;
  lowStock?: boolean;
  soldOut?: boolean;
  image: string;
  alt: string;
}

export interface CatalogContent {
  label: string;
  title: string;
  intro: string;
  filterLabel: string;
  categories: { id: CatalogFilter; label: string }[];
  sizeLabel: string;
  sizeOptions: string[];
  sortLabel: string;
  sortOptions: { id: SortId; label: string }[];
  resultsSingular: string;
  resultsPlural: string;
  emptyTitle: string;
  emptyBody: string;
  clearFilters: string;
  quickAdd: string;
  chooseSize: string;
  added: string;
  soldOut: string;
  lastUnits: string;
  newBadge: string;
  oneSize: string;
  items: CatalogItem[];
}

/* -------------------------- Vista 360° ---------------------------- */

export interface Vista360Content {
  label: string;
  title: string;
  intro: string;
  badge: string;
  modelTitle: string;
  loadLabel: string;
  hint: string;
  featureNote: string;
  name: string;
  colorway: string;
  price: number;
  description: string;
  sizeLabel: string;
  sizeUnit: string;
  sizes: string[];
  pickSize: string;
  addToCart: string;
  added: string;
}

/* --------------------------- Raffle ------------------------------- */

export interface RaffleField {
  id: "name" | "email" | "city";
  label: string;
  placeholder: string;
}

export interface RaffleContent {
  label: string;
  title: string;
  intro: string;
  prizeName: string;
  prizeColor: string;
  entriesLabel: string;
  entries: string;
  closesLabel: string;
  closesValue: string;
  openCta: string;
  modalTitle: string;
  modalIntro: string;
  fields: RaffleField[];
  sizeLabel: string;
  sizeOptions: string[];
  submit: string;
  terms: string;
  close: string;
  successTitle: string;
  successBody: string;
  entryCodeLabel: string;
  entryCode: string;
  successClose: string;
}

export interface MarqueeContent {
  phrases: string[];
}

export interface AboutContent {
  label: string;
  title: string;
  lead: string;
  paragraphs: string[];
  stats: { value: string; label: string }[];
  addressLabel: string;
  addressLines: string[];
  hoursLabel: string;
  hours: string[];
  imageAlt: string;
  quote: string;
  quoteAuthor: string;
}

export interface FooterLinkGroup {
  title: string;
  links: NavItem[];
}

export interface FooterContent {
  tagline: string;
  groups: FooterLinkGroup[];
  followLabel: string;
  handle: string;
  email: string;
  addressLines: string[];
  fine: string;
  credit: string;
}

export interface VielaContent {
  priceLocale: string;
  currency: string;
  header: HeaderContent;
  cart: CartContent;
  hero: HeroContent;
  latest: LatestContent;
  catalog: CatalogContent;
  vista: Vista360Content;
  raffle: RaffleContent;
  marquee: MarqueeContent;
  about: AboutContent;
  footer: FooterContent;
}

/* Fixed images (Unsplash IDs, art-directed defensively — always in color). */
const IMG = {
  hero: "photo-1542291026-7eec264c27ff",
  latestMain: "photo-1595950653106-6c9ebd614d3a",
  latestThumbA: "photo-1539185441755-769473a23570",
  latestThumbB: "photo-1600185365483-26d7a4cc7519",
  white: "photo-1549298916-b41d501d3772",
  yellow: "photo-1600269452121-4f2416e55c28",
  runner: "photo-1543508282-6319a3e2621f",
  angle: "photo-1539185441755-769473a23570",
  street: "photo-1600185365483-26d7a4cc7519",
  pair: "photo-1595950653106-6c9ebd614d3a",
  box: "photo-1595341888016-a392ef81b7de",
  /* apparel */
  tee: "photo-1626806851009-c98659eb1af0",
  hoodie: "photo-1601063476271-a159c71ab0b3",
  windbreaker: "photo-1571867424485-369464ed33cc",
  cargo: "photo-1511794322962-129ddbd0af38",
  jersey: "photo-1552066379-e7bfd22155c5",
  /* accessories */
  cap: "photo-1513902501146-e2c7436cfe65",
  socks: "photo-1582578598832-4b8d6cdbe9d8",
  bag: "photo-1640101942866-e863d2ab9215",
  chain: "photo-1625908733875-efa9c75c084d",
};

/** Sketchfab model powering the "Vista 360°" feature. */
export const VISTA_MODEL = {
  uid: "a4b434181fbb48008ad460722fd53725",
  thumb:
    "https://media.sketchfab.com/models/a4b434181fbb48008ad460722fd53725/thumbnails/577b3a9d947647dab36453f6bb421f8a/037293e320844915801713f0a797e030.jpeg",
  credit: { model: "Air Jordan 1", author: "makoto" },
};

/* Sizes shared by every catalog sneaker (BR numbering). */
const SNKR = {
  full: ["38", "39", "40", "41", "42", "43", "44"],
  most: ["38", "39", "41", "42", "43", "44"],
  mid: ["39", "40", "41", "42", "44"],
  last: ["40", "41", "42"],
};

/* ------------------------------------------------------------------ */
/* Dictionary — prices are ALWAYS in R$ (BRL), in every locale.        */
/* ------------------------------------------------------------------ */

export const vielaDict: DemoDictionary<VielaContent> = {
  en: {
    priceLocale: "pt-BR",
    currency: "BRL",
    header: {
      nav: [
        { href: "#drop", label: "The Drop" },
        { href: "#catalogo", label: "Catalog" },
        { href: "#vista", label: "360° View" },
        { href: "#raffle", label: "Raffle" },
        { href: "#studio", label: "The Alley" },
      ],
      cartLabel: "Bag",
      openMenu: "Open navigation",
      closeMenu: "Close navigation",
    },
    cart: {
      title: "Your bag",
      empty: "Nothing in the bag yet.",
      emptyHint: "Pick a piece from the catalog to lock in your fit.",
      sizeWord: "Size",
      subtotal: "Subtotal",
      shippingNote: "Taxes and express shipping calculated at checkout.",
      checkout: "Checkout",
      remove: "Remove item",
      close: "Close bag",
      countLabel: "items in bag",
    },
    hero: {
      live: "Drop 07 · Live feed",
      dropTag: "Velocity OG — Infrared",
      titleTop: "The street",
      titleMid: "doesn't",
      titleBottom: "sleep.",
      sub: "VIELA is born where the street happens. Drop 07 lands in counted pairs and pieces — no restock, no second chances. Set your alarm to the countdown.",
      countdownLabel: "Drop goes live in",
      units: { days: "Days", hours: "Hrs", minutes: "Min", seconds: "Sec" },
      liveNow: "The drop is live — grab your pair.",
      ctaPrimary: "Notify me",
      ctaSecondary: "Preview the drop",
      imageAlt: "VIELA Velocity OG in infrared and black, lit by pink neon",
      stats: [
        { value: "300", label: "pairs worldwide" },
        { value: "07", label: "the drop number" },
        { value: "48h", label: "raffle window" },
      ],
      marquee: "NEW DROP · VIELA VELOCITY OG · INFRARED · 300 PAIRS · NO RESTOCK · ",
    },
    latest: {
      label: "Latest drop",
      title: "Velocity OG",
      intro: "A racing silhouette rebuilt for concrete. Carbon-plated, glow-lined and cut for speed you will mostly use to catch the bus.",
      colorway: "Infrared / Void Black",
      name: "VIELA Velocity OG — Infrared",
      price: 1290,
      description: "Knitted violet upper over a translucent infrared cage, riding a nitrogen-charged Viela foam plate. Reflective piping catches every streetlight; the heel counter is molded from recycled court panels.",
      specsLabel: "Spec sheet",
      specs: [
        { k: "Upper", v: "Recycled flow-knit" },
        { k: "Plate", v: "Carbon speed spine" },
        { k: "Foam", v: "Viela nitro" },
        { k: "Weight", v: "268 g" },
      ],
      sizeLabel: "Select size",
      sizeUnit: "BR",
      soldOutSize: "Sold out",
      pickSize: "Pick a size to continue",
      addToCart: "Add to bag",
      added: "Added to bag",
      lowStock: "Only a few pairs left in this size",
      sizes: [
        { us: "37", available: true },
        { us: "38", available: true },
        { us: "39", available: false },
        { us: "40", available: true },
        { us: "41", available: true },
        { us: "42", available: true },
        { us: "43", available: false },
        { us: "44", available: true },
        { us: "45", available: true },
        { us: "46", available: true },
      ],
      imageAlt: "VIELA Velocity OG sneakers photographed as a pair on violet",
      thumbAlts: [
        "Side profile of the Velocity OG silhouette",
        "Street shot of the Velocity OG on foot",
      ],
      thumbs: [IMG.latestThumbA, IMG.latestThumbB],
    },
    catalog: {
      label: "The catalog",
      title: "Kicks to chains",
      intro: "Drop sneakers, heavyweight garms and the hardware that closes the fit. Filter, pick your size and lock it before it's gone.",
      filterLabel: "Category",
      categories: [
        { id: "all", label: "Everything" },
        { id: "sneakers", label: "Sneakers" },
        { id: "apparel", label: "Apparel" },
        { id: "accessories", label: "Accessories" },
      ],
      sizeLabel: "Size",
      sizeOptions: ["38", "39", "40", "41", "42", "43", "44", "S", "M", "L", "XL", "OS"],
      sortLabel: "Sort by",
      sortOptions: [
        { id: "featured", label: "Featured" },
        { id: "new", label: "New in" },
        { id: "price-asc", label: "Price: low" },
        { id: "price-desc", label: "Price: high" },
      ],
      resultsSingular: "product",
      resultsPlural: "products",
      emptyTitle: "Nothing here.",
      emptyBody: "No piece matches these filters. Clear them and run it again.",
      clearFilters: "Clear filters",
      quickAdd: "Quick add",
      chooseSize: "Pick a size",
      added: "In bag",
      soldOut: "Sold out",
      lastUnits: "Last units",
      newBadge: "New",
      oneSize: "OS",
      items: [
        { id: "phantom", category: "sneakers", name: "Phantom Flux", colorway: "Bone / Volt", price: 1120, sizes: SNKR.full, image: IMG.white, alt: "Phantom Flux sneaker in bone white" },
        { id: "solar", category: "sneakers", name: "Nova Trail", colorway: "Solar Flare", price: 1040, sizes: SNKR.mid, isNew: true, image: IMG.yellow, alt: "Nova Trail sneaker in solar yellow" },
        { id: "apex", category: "sneakers", name: "Apex Runner", colorway: "Ghost Grey", price: 960, sizes: SNKR.most, image: IMG.runner, alt: "Apex Runner performance shoe in grey" },
        { id: "cipher", category: "sneakers", name: "Cipher Low", colorway: "Ultraviolet", price: 1190, sizes: SNKR.last, lowStock: true, image: IMG.angle, alt: "Cipher Low sneaker at a three-quarter angle" },
        { id: "void", category: "sneakers", name: "Void Strike", colorway: "Mono Black", price: 1380, sizes: [], soldOut: true, image: IMG.street, alt: "Void Strike sneakers on a city street" },
        { id: "pulse", category: "sneakers", name: "Pulse Hi", colorway: "Neon Pair", price: 1250, sizes: SNKR.most, image: IMG.pair, alt: "Pulse Hi sneaker pair in neon tones" },
        { id: "tee", category: "apparel", name: "VIELA Oversized Tee", colorway: "Grape Purple", price: 149, sizes: ["S", "M", "L", "XL"], isNew: true, image: IMG.tee, alt: "Model in an oversized purple VIELA tee and sunglasses" },
        { id: "hoodie", category: "apparel", name: "'Beco' Hoodie", colorway: "Off-White", price: 329, sizes: ["S", "M", "L", "XL"], image: IMG.hoodie, alt: "Off-white 'Beco' hoodie worn on a red sofa" },
        { id: "windbreaker", category: "apparel", name: "'Garoa' Windbreaker", colorway: "Purple / Orange", price: 399, sizes: ["M", "L", "XL"], isNew: true, image: IMG.windbreaker, alt: "Purple and orange 'Garoa' windbreaker jacket" },
        { id: "cargo", category: "apparel", name: "'Paralela' Cargo Pants", colorway: "Khaki", price: 289, sizes: ["S", "M", "L"], image: IMG.cargo, alt: "Khaki 'Paralela' cargo pants in close-up" },
        { id: "jersey", category: "apparel", name: "'Várzea' Match Jersey", colorway: "Yellow / Green", price: 229, sizes: ["M", "L"], lowStock: true, image: IMG.jersey, alt: "Yellow and green 'Várzea' football jersey hanging" },
        { id: "cap", category: "accessories", name: "'Quebrada' 5-Panel Cap", colorway: "Street Mix", price: 129, sizes: ["OS"], image: IMG.cap, alt: "Model wearing the 'Quebrada' 5-panel cap outdoors" },
        { id: "socks", category: "accessories", name: "'Listras' Crew Socks (3-pack)", colorway: "Multicolor", price: 79, sizes: ["OS"], image: IMG.socks, alt: "Colorful striped 'Listras' crew socks on feet" },
        { id: "bag", category: "accessories", name: "'Trânsito' Shoulder Bag", colorway: "Black", price: 179, sizes: ["OS"], isNew: true, image: IMG.bag, alt: "Black 'Trânsito' shoulder bag worn crossbody" },
        { id: "chain", category: "accessories", name: "'Fio 60' Chain", colorway: "Gold", price: 199, sizes: ["OS"], image: IMG.chain, alt: "Gold 'Fio 60' chain necklace on black fabric" },
      ],
    },
    vista: {
      label: "Spin the sneaker",
      title: "360° view",
      intro: "A real 3D scan, live on the page. Drag the shoe, spin it, zoom into the stitching — then take it home.",
      badge: "VISTA 360°",
      modelTitle: "AJ1 High 'Panda' — interactive 3D model",
      loadLabel: "Load in 3D",
      hint: "Drag to spin · scroll to zoom",
      featureNote: "Real-time 3D — model 'Air Jordan 1' by makoto, via Sketchfab.",
      name: "AJ1 High 'Panda'",
      colorway: "White / Black",
      price: 1199,
      description: "The alley classic in the sharpest black-and-white cut. Full-grain leather, vintage sole and the collar that shows up in every fit pic. Curated pairs, verified one by one by the VIELA crew.",
      sizeLabel: "Select size",
      sizeUnit: "BR",
      sizes: ["38", "39", "40", "41", "42", "43", "44"],
      pickSize: "Pick a size to continue",
      addToCart: "Add to bag",
      added: "Added to bag",
    },
    raffle: {
      label: "The raffle",
      title: "Enter for the Velocity OG",
      intro: "Three hundred pairs, thousands of feet. The raffle is the only way in. Enter once, win randomly, pay only if your name gets pulled.",
      prizeName: "Velocity OG — Infrared",
      prizeColor: "Infrared / Void Black",
      entriesLabel: "Entries so far",
      entries: "18,420",
      closesLabel: "Raffle closes",
      closesValue: "48 hours after launch",
      openCta: "Enter the raffle",
      modalTitle: "Raffle entry",
      modalIntro: "One entry per person. Winners are notified by email within 24 hours of the draw.",
      fields: [
        { id: "name", label: "Full name", placeholder: "Alex Moraes" },
        { id: "email", label: "Email", placeholder: "you@email.com" },
        { id: "city", label: "City", placeholder: "São Paulo, SP" },
      ],
      sizeLabel: "Preferred size",
      sizeOptions: ["BR 38", "BR 39", "BR 40", "BR 41", "BR 42", "BR 44"],
      submit: "Submit entry",
      terms: "No purchase due unless selected. One entry per person, verified by email.",
      close: "Close",
      successTitle: "You are in the draw.",
      successBody: "Keep an eye on your inbox. If your entry is pulled, you get a 30-minute window to claim your pair at retail.",
      entryCodeLabel: "Your entry code",
      entryCode: "VLA-07-4482",
      successClose: "Done",
    },
    marquee: {
      phrases: [
        "300 PAIRS",
        "NO RESTOCK",
        "DROP 07",
        "VIELA WEAR",
        "STRAIGHT FROM THE STREET",
        "SP · BR",
        "RAFFLE OPEN",
      ],
    },
    about: {
      label: "The alley",
      title: "Born in the backstreet",
      lead: "VIELA is a design studio disguised as a streetwear label. The alley is where the street happens.",
      paragraphs: [
        "We started in a backstreet of Bixiga, São Paulo, in 2019 — screen-printing in the garage, sneakers drying on the clothesline, lookbooks printed at the corner copy shop. The rule was simple: make the piece we wanted to wear on the 2 a.m. run and could not find anywhere.",
        "Every drop is born from a single idea, produced in a counted run, and never comes back. When it is gone, it becomes corner-store legend. We would rather sell out than water it down.",
      ],
      stats: [
        { value: "2019", label: "on the grind since" },
        { value: "07", label: "drops released" },
        { value: "42k", label: "on the drop list" },
      ],
      addressLabel: "The atelier",
      addressLines: ["Rua Treze de Maio 825 — Bixiga", "01327-000 · São Paulo, SP"],
      hoursLabel: "Atelier hours",
      hours: ["Thu – Sat · 2pm – 10pm", "Drop nights · until sold out"],
      imageAlt: "VIELA shoe box and packaging under studio lighting",
      quote: "They do not sell clothes. They sell the ten minutes before a drop.",
      quoteAuthor: "Correria Zine",
    },
    footer: {
      tagline: "Garms and kicks for whoever makes the street their path.",
      groups: [
        {
          title: "Shop",
          links: [
            { href: "#drop", label: "The Drop" },
            { href: "#catalogo", label: "Catalog" },
            { href: "#vista", label: "360° View" },
            { href: "#raffle", label: "Raffle" },
          ],
        },
        {
          title: "The alley",
          links: [
            { href: "#studio", label: "About" },
            { href: "#latest", label: "Velocity OG" },
            { href: "#studio", label: "Press" },
            { href: "#studio", label: "Careers" },
          ],
        },
      ],
      followLabel: "Follow the feed",
      handle: "@viela.wear",
      email: "fala@viela.wear",
      addressLines: ["Rua Treze de Maio 825 — Bixiga", "01327-000 · São Paulo, SP"],
      fine: "VIELA is a fictional brand imagined as a design concept. Products, prices and drops are illustrative.",
      credit: "Concept, design and build by VigApp.",
    },
  },

  pt: {
    priceLocale: "pt-BR",
    currency: "BRL",
    header: {
      nav: [
        { href: "#drop", label: "O Drop" },
        { href: "#catalogo", label: "Catálogo" },
        { href: "#vista", label: "Vista 360°" },
        { href: "#raffle", label: "Sorteio" },
        { href: "#studio", label: "A Viela" },
      ],
      cartLabel: "Sacola",
      openMenu: "Abrir navegação",
      closeMenu: "Fechar navegação",
    },
    cart: {
      title: "Sua sacola",
      empty: "Sua sacola está vazia.",
      emptyHint: "Escolhe uma peça no catálogo pra fechar o fit.",
      sizeWord: "Tam.",
      subtotal: "Subtotal",
      shippingNote: "Impostos e frete expresso calculados no checkout.",
      checkout: "Finalizar",
      remove: "Remover item",
      close: "Fechar sacola",
      countLabel: "itens na sacola",
    },
    hero: {
      live: "Drop 07 · Ao vivo",
      dropTag: "Velocity OG — Infrared",
      titleTop: "A rua",
      titleMid: "não",
      titleBottom: "dorme.",
      sub: "A VIELA nasce onde a rua acontece. O Drop 07 chega em pares e peças contadas — sem reposição, sem segunda chance. Deixa o alarme no horário da contagem.",
      countdownLabel: "O drop abre em",
      units: { days: "Dias", hours: "Hrs", minutes: "Min", seconds: "Seg" },
      liveNow: "O drop está no ar — garanta o seu par.",
      ctaPrimary: "Avisa aí",
      ctaSecondary: "Ver o drop",
      imageAlt: "VIELA Velocity OG em infrared e preto, sob neon rosa",
      stats: [
        { value: "300", label: "pares no mundo" },
        { value: "07", label: "o número do drop" },
        { value: "48h", label: "janela do sorteio" },
      ],
      marquee: "NOVO DROP · VIELA VELOCITY OG · INFRARED · 300 PARES · SEM REPOSIÇÃO · ",
    },
    latest: {
      label: "Último drop",
      title: "Velocity OG",
      intro: "Uma silhueta de corrida reconstruída pro concreto. Placa de carbono, linhas que brilham e um recorte de velocidade que você vai usar mesmo é pra alcançar o busão.",
      colorway: "Infrared / Void Black",
      name: "VIELA Velocity OG — Infrared",
      price: 1290,
      description: "Cabedal de tricô violeta sobre uma gaiola infrared translúcida, com placa de espuma nitro Viela. As costuras refletivas capturam cada poste de luz; o contraforte é moldado de painéis de quadra reciclados.",
      specsLabel: "Ficha técnica",
      specs: [
        { k: "Cabedal", v: "Flow-knit reciclado" },
        { k: "Placa", v: "Espinha de carbono" },
        { k: "Espuma", v: "Viela nitro" },
        { k: "Peso", v: "268 g" },
      ],
      sizeLabel: "Escolha o número",
      sizeUnit: "BR",
      soldOutSize: "Esgotado",
      pickSize: "Escolha um número para continuar",
      addToCart: "Adicionar à sacola",
      added: "Na sacola",
      lowStock: "Poucos pares neste número",
      sizes: [
        { us: "37", available: true },
        { us: "38", available: true },
        { us: "39", available: false },
        { us: "40", available: true },
        { us: "41", available: true },
        { us: "42", available: true },
        { us: "43", available: false },
        { us: "44", available: true },
        { us: "45", available: true },
        { us: "46", available: true },
      ],
      imageAlt: "Tênis VIELA Velocity OG fotografados em par sobre violeta",
      thumbAlts: [
        "Perfil lateral da silhueta Velocity OG",
        "Foto de rua do Velocity OG nos pés",
      ],
      thumbs: [IMG.latestThumbA, IMG.latestThumbB],
    },
    catalog: {
      label: "O catálogo",
      title: "Do tênis à corrente",
      intro: "Tênis de drop, vestuário pesado e o acessório que fecha o fit. Filtra, escolhe o tamanho e garante antes que suma da prateleira.",
      filterLabel: "Categoria",
      categories: [
        { id: "all", label: "Tudo" },
        { id: "sneakers", label: "Tênis" },
        { id: "apparel", label: "Vestuário" },
        { id: "accessories", label: "Acessórios" },
      ],
      sizeLabel: "Tamanho",
      sizeOptions: ["38", "39", "40", "41", "42", "43", "44", "P", "M", "G", "GG", "U"],
      sortLabel: "Ordenar por",
      sortOptions: [
        { id: "featured", label: "Destaques" },
        { id: "new", label: "Lançamento" },
        { id: "price-asc", label: "Menor preço" },
        { id: "price-desc", label: "Maior preço" },
      ],
      resultsSingular: "produto",
      resultsPlural: "produtos",
      emptyTitle: "Nada por aqui.",
      emptyBody: "Nenhuma peça bate com esses filtros. Limpa e roda de novo.",
      clearFilters: "Limpar filtros",
      quickAdd: "Adição rápida",
      chooseSize: "Escolhe o tamanho",
      added: "Na sacola",
      soldOut: "Esgotado",
      lastUnits: "Últimas unidades",
      newBadge: "Novo",
      oneSize: "U",
      items: [
        { id: "phantom", category: "sneakers", name: "Phantom Flux", colorway: "Bone / Volt", price: 1120, sizes: SNKR.full, image: IMG.white, alt: "Tênis Phantom Flux em branco osso" },
        { id: "solar", category: "sneakers", name: "Nova Trail", colorway: "Solar Flare", price: 1040, sizes: SNKR.mid, isNew: true, image: IMG.yellow, alt: "Tênis Nova Trail em amarelo solar" },
        { id: "apex", category: "sneakers", name: "Apex Runner", colorway: "Ghost Grey", price: 960, sizes: SNKR.most, image: IMG.runner, alt: "Tênis de corrida Apex Runner em cinza" },
        { id: "cipher", category: "sneakers", name: "Cipher Low", colorway: "Ultraviolet", price: 1190, sizes: SNKR.last, lowStock: true, image: IMG.angle, alt: "Tênis Cipher Low em ângulo de três quartos" },
        { id: "void", category: "sneakers", name: "Void Strike", colorway: "Mono Black", price: 1380, sizes: [], soldOut: true, image: IMG.street, alt: "Tênis Void Strike numa rua da cidade" },
        { id: "pulse", category: "sneakers", name: "Pulse Hi", colorway: "Neon Pair", price: 1250, sizes: SNKR.most, image: IMG.pair, alt: "Par de tênis Pulse Hi em tons neon" },
        { id: "tee", category: "apparel", name: "Camiseta Oversized VIELA", colorway: "Roxo Uva", price: 149, sizes: ["P", "M", "G", "GG"], isNew: true, image: IMG.tee, alt: "Modelo de camiseta oversized roxa VIELA com óculos escuros" },
        { id: "hoodie", category: "apparel", name: "Moletom Capuz 'Beco'", colorway: "Off-White", price: 329, sizes: ["P", "M", "G", "GG"], image: IMG.hoodie, alt: "Moletom 'Beco' off-white vestido num sofá vermelho" },
        { id: "windbreaker", category: "apparel", name: "Corta-Vento 'Garoa'", colorway: "Roxo / Laranja", price: 399, sizes: ["M", "G", "GG"], isNew: true, image: IMG.windbreaker, alt: "Corta-vento 'Garoa' roxo e laranja" },
        { id: "cargo", category: "apparel", name: "Calça Cargo 'Paralela'", colorway: "Caqui", price: 289, sizes: ["P", "M", "G"], image: IMG.cargo, alt: "Calça cargo 'Paralela' caqui em close" },
        { id: "jersey", category: "apparel", name: "Camisa de Jogo 'Várzea'", colorway: "Amarelo / Verde", price: 229, sizes: ["M", "G"], lowStock: true, image: IMG.jersey, alt: "Camisa de futebol 'Várzea' amarela e verde pendurada" },
        { id: "cap", category: "accessories", name: "Boné 5-Panel 'Quebrada'", colorway: "Mix de Rua", price: 129, sizes: ["U"], image: IMG.cap, alt: "Modelo usando o boné 5-panel 'Quebrada' ao ar livre" },
        { id: "socks", category: "accessories", name: "Meia Crew 'Listras' (kit 3)", colorway: "Multicor", price: 79, sizes: ["U"], image: IMG.socks, alt: "Meias crew 'Listras' coloridas nos pés" },
        { id: "bag", category: "accessories", name: "Shoulder Bag 'Trânsito'", colorway: "Preto", price: 179, sizes: ["U"], isNew: true, image: IMG.bag, alt: "Shoulder bag 'Trânsito' preta usada transversal" },
        { id: "chain", category: "accessories", name: "Corrente 'Fio 60'", colorway: "Dourado", price: 199, sizes: ["U"], image: IMG.chain, alt: "Corrente 'Fio 60' dourada sobre tecido preto" },
      ],
    },
    vista: {
      label: "Gira o tênis",
      title: "Vista 360°",
      intro: "Um scan 3D de verdade, rodando na página. Arrasta o tênis, gira, dá zoom na costura — e depois leva pra casa.",
      badge: "VISTA 360°",
      modelTitle: "AJ1 High 'Panda' — modelo 3D interativo",
      loadLabel: "Carregar em 3D",
      hint: "Arraste para girar · role para zoom",
      featureNote: "3D em tempo real — modelo 'Air Jordan 1' por makoto, via Sketchfab.",
      name: "AJ1 High 'Panda'",
      colorway: "Branco / Preto",
      price: 1199,
      description: "O clássico da viela no recorte preto e branco mais afiado. Couro de flor integral, sola vintage e o colarinho que aparece em toda foto de fit. Pares selecionados, conferidos um a um pela equipe VIELA.",
      sizeLabel: "Escolha o número",
      sizeUnit: "BR",
      sizes: ["38", "39", "40", "41", "42", "43", "44"],
      pickSize: "Escolha um número para continuar",
      addToCart: "Adicionar à sacola",
      added: "Na sacola",
    },
    raffle: {
      label: "O sorteio",
      title: "Concorra ao Velocity OG",
      intro: "Trezentos pares, milhares de pés. O sorteio é a única entrada. Inscreve uma vez, ganha no aleatório e paga só se o seu nome sair.",
      prizeName: "Velocity OG — Infrared",
      prizeColor: "Infrared / Void Black",
      entriesLabel: "Inscrições até agora",
      entries: "18.420",
      closesLabel: "O sorteio encerra",
      closesValue: "48 horas após o lançamento",
      openCta: "Participar do sorteio",
      modalTitle: "Inscrição no sorteio",
      modalIntro: "Uma inscrição por pessoa. Os ganhadores são avisados por e-mail em até 24 horas do sorteio.",
      fields: [
        { id: "name", label: "Nome completo", placeholder: "Alex Moraes" },
        { id: "email", label: "E-mail", placeholder: "voce@email.com" },
        { id: "city", label: "Cidade", placeholder: "São Paulo, SP" },
      ],
      sizeLabel: "Número preferido",
      sizeOptions: ["BR 38", "BR 39", "BR 40", "BR 41", "BR 42", "BR 44"],
      submit: "Enviar inscrição",
      terms: "Sem compra obrigatória, exceto se selecionado. Uma inscrição por pessoa, verificada por e-mail.",
      close: "Fechar",
      successTitle: "Você está no sorteio.",
      successBody: "Fica de olho no seu e-mail. Se a sua inscrição for sorteada, você tem 30 minutos pra garantir o par pelo preço de tabela.",
      entryCodeLabel: "Seu código de inscrição",
      entryCode: "VLA-07-4482",
      successClose: "Concluir",
    },
    marquee: {
      phrases: [
        "300 PARES",
        "SEM REPOSIÇÃO",
        "DROP 07",
        "VIELA WEAR",
        "DIRETO DA RUA",
        "SP · BR",
        "SORTEIO ABERTO",
      ],
    },
    about: {
      label: "A viela",
      title: "Nascida no beco",
      lead: "A VIELA é um estúdio de design disfarçado de marca de rua. A viela é onde a rua acontece.",
      paragraphs: [
        "Começamos numa viela do Bixiga, em São Paulo, em 2019 — serigrafia na garagem, tênis secando no varal e lookbook impresso na gráfica da esquina. A regra era simples: fazer a peça que a gente queria vestir no corre das 2 da manhã e não achava em canto nenhum.",
        "Cada drop nasce de uma ideia só, sai em tiragem contada e nunca volta. Quando acaba, vira lenda de esquina. A gente prefere esgotar a diluir.",
      ],
      stats: [
        { value: "2019", label: "no corre desde" },
        { value: "07", label: "drops lançados" },
        { value: "42k", label: "na lista do drop" },
      ],
      addressLabel: "O ateliê",
      addressLines: ["Rua Treze de Maio 825 — Bixiga", "01327-000 · São Paulo, SP"],
      hoursLabel: "Horário do ateliê",
      hours: ["Qui – Sáb · 14h – 22h", "Noite de drop · até esgotar"],
      imageAlt: "Caixa e embalagem VIELA sob a luz do estúdio",
      quote: "Eles não vendem roupa. Vendem os dez minutos antes do drop.",
      quoteAuthor: "Zine Correria",
    },
    footer: {
      tagline: "Roupa e tênis pra quem faz da rua o caminho.",
      groups: [
        {
          title: "Loja",
          links: [
            { href: "#drop", label: "O Drop" },
            { href: "#catalogo", label: "Catálogo" },
            { href: "#vista", label: "Vista 360°" },
            { href: "#raffle", label: "Sorteio" },
          ],
        },
        {
          title: "A viela",
          links: [
            { href: "#studio", label: "Sobre" },
            { href: "#latest", label: "Velocity OG" },
            { href: "#studio", label: "Imprensa" },
            { href: "#studio", label: "Trampa com a gente" },
          ],
        },
      ],
      followLabel: "Segue o feed",
      handle: "@viela.wear",
      email: "fala@viela.wear",
      addressLines: ["Rua Treze de Maio 825 — Bixiga", "01327-000 · São Paulo, SP"],
      fine: "VIELA é uma marca fictícia criada como conceito de design. Produtos, preços e drops são ilustrativos.",
      credit: "Conceito, design e código por VigApp.",
    },
  },

  es: {
    priceLocale: "pt-BR",
    currency: "BRL",
    header: {
      nav: [
        { href: "#drop", label: "El Drop" },
        { href: "#catalogo", label: "Catálogo" },
        { href: "#vista", label: "Vista 360°" },
        { href: "#raffle", label: "Sorteo" },
        { href: "#studio", label: "El Callejón" },
      ],
      cartLabel: "Bolsa",
      openMenu: "Abrir navegación",
      closeMenu: "Cerrar navegación",
    },
    cart: {
      title: "Tu bolsa",
      empty: "Tu bolsa está vacía.",
      emptyHint: "Elige una pieza del catálogo para cerrar el fit.",
      sizeWord: "Talla",
      subtotal: "Subtotal",
      shippingNote: "Impuestos y envío exprés calculados en el pago.",
      checkout: "Pagar",
      remove: "Quitar artículo",
      close: "Cerrar bolsa",
      countLabel: "artículos en la bolsa",
    },
    hero: {
      live: "Drop 07 · En directo",
      dropTag: "Velocity OG — Infrared",
      titleTop: "La calle",
      titleMid: "no",
      titleBottom: "duerme.",
      sub: "VIELA nace donde pasa la calle. El Drop 07 llega en pares y piezas contadas — sin reposición, sin segunda oportunidad. Pon la alarma en la cuenta atrás.",
      countdownLabel: "El drop se abre en",
      units: { days: "Días", hours: "Hrs", minutes: "Min", seconds: "Seg" },
      liveNow: "El drop está en directo — llévate tu par.",
      ctaPrimary: "Avísame",
      ctaSecondary: "Ver el drop",
      imageAlt: "VIELA Velocity OG en infrared y negro, bajo neón rosa",
      stats: [
        { value: "300", label: "pares en el mundo" },
        { value: "07", label: "el número del drop" },
        { value: "48h", label: "ventana del sorteo" },
      ],
      marquee: "NUEVO DROP · VIELA VELOCITY OG · INFRARED · 300 PARES · SIN REPOSICIÓN · ",
    },
    latest: {
      label: "Último drop",
      title: "Velocity OG",
      intro: "Una silueta de carreras reconstruida para el asfalto. Placa de carbono, líneas que brillan y un corte de velocidad que usarás sobre todo para alcanzar el bus.",
      colorway: "Infrared / Void Black",
      name: "VIELA Velocity OG — Infrared",
      price: 1290,
      description: "Corte de punto violeta sobre una jaula infrared translúcida, montado sobre una placa de espuma nitro Viela. Los ribetes reflectantes atrapan cada farola; el talón está moldeado con paneles de pista reciclados.",
      specsLabel: "Ficha técnica",
      specs: [
        { k: "Corte", v: "Flow-knit reciclado" },
        { k: "Placa", v: "Columna de carbono" },
        { k: "Espuma", v: "Viela nitro" },
        { k: "Peso", v: "268 g" },
      ],
      sizeLabel: "Elige tu talla",
      sizeUnit: "BR",
      soldOutSize: "Agotado",
      pickSize: "Elige una talla para continuar",
      addToCart: "Añadir a la bolsa",
      added: "En la bolsa",
      lowStock: "Quedan pocos pares en esta talla",
      sizes: [
        { us: "37", available: true },
        { us: "38", available: true },
        { us: "39", available: false },
        { us: "40", available: true },
        { us: "41", available: true },
        { us: "42", available: true },
        { us: "43", available: false },
        { us: "44", available: true },
        { us: "45", available: true },
        { us: "46", available: true },
      ],
      imageAlt: "Zapatillas VIELA Velocity OG fotografiadas en par sobre violeta",
      thumbAlts: [
        "Perfil lateral de la silueta Velocity OG",
        "Foto callejera del Velocity OG puesto",
      ],
      thumbs: [IMG.latestThumbA, IMG.latestThumbB],
    },
    catalog: {
      label: "El catálogo",
      title: "De zapas a cadenas",
      intro: "Zapatillas de drop, ropa pesada y el accesorio que cierra el fit. Filtra, elige tu talla y asegúralo antes de que vuele.",
      filterLabel: "Categoría",
      categories: [
        { id: "all", label: "Todo" },
        { id: "sneakers", label: "Zapatillas" },
        { id: "apparel", label: "Ropa" },
        { id: "accessories", label: "Accesorios" },
      ],
      sizeLabel: "Talla",
      sizeOptions: ["38", "39", "40", "41", "42", "43", "44", "P", "M", "G", "GG", "U"],
      sortLabel: "Ordenar por",
      sortOptions: [
        { id: "featured", label: "Destacados" },
        { id: "new", label: "Novedades" },
        { id: "price-asc", label: "Menor precio" },
        { id: "price-desc", label: "Mayor precio" },
      ],
      resultsSingular: "producto",
      resultsPlural: "productos",
      emptyTitle: "Nada por aquí.",
      emptyBody: "Ninguna pieza coincide con esos filtros. Límpialos e inténtalo de nuevo.",
      clearFilters: "Limpiar filtros",
      quickAdd: "Añadir rápido",
      chooseSize: "Elige la talla",
      added: "En la bolsa",
      soldOut: "Agotado",
      lastUnits: "Últimas unidades",
      newBadge: "Nuevo",
      oneSize: "U",
      items: [
        { id: "phantom", category: "sneakers", name: "Phantom Flux", colorway: "Bone / Volt", price: 1120, sizes: SNKR.full, image: IMG.white, alt: "Zapatilla Phantom Flux en blanco hueso" },
        { id: "solar", category: "sneakers", name: "Nova Trail", colorway: "Solar Flare", price: 1040, sizes: SNKR.mid, isNew: true, image: IMG.yellow, alt: "Zapatilla Nova Trail en amarillo solar" },
        { id: "apex", category: "sneakers", name: "Apex Runner", colorway: "Ghost Grey", price: 960, sizes: SNKR.most, image: IMG.runner, alt: "Zapatilla de running Apex Runner en gris" },
        { id: "cipher", category: "sneakers", name: "Cipher Low", colorway: "Ultraviolet", price: 1190, sizes: SNKR.last, lowStock: true, image: IMG.angle, alt: "Zapatilla Cipher Low en ángulo de tres cuartos" },
        { id: "void", category: "sneakers", name: "Void Strike", colorway: "Mono Black", price: 1380, sizes: [], soldOut: true, image: IMG.street, alt: "Zapatillas Void Strike en una calle" },
        { id: "pulse", category: "sneakers", name: "Pulse Hi", colorway: "Neon Pair", price: 1250, sizes: SNKR.most, image: IMG.pair, alt: "Par de zapatillas Pulse Hi en tonos neón" },
        { id: "tee", category: "apparel", name: "Camiseta Oversized VIELA", colorway: "Morado Uva", price: 149, sizes: ["P", "M", "G", "GG"], isNew: true, image: IMG.tee, alt: "Modelo con camiseta oversized morada VIELA y gafas de sol" },
        { id: "hoodie", category: "apparel", name: "Hoodie 'Beco'", colorway: "Off-White", price: 329, sizes: ["P", "M", "G", "GG"], image: IMG.hoodie, alt: "Hoodie 'Beco' off-white sobre un sofá rojo" },
        { id: "windbreaker", category: "apparel", name: "Cortavientos 'Garoa'", colorway: "Morado / Naranja", price: 399, sizes: ["M", "G", "GG"], isNew: true, image: IMG.windbreaker, alt: "Cortavientos 'Garoa' morado y naranja" },
        { id: "cargo", category: "apparel", name: "Pantalón Cargo 'Paralela'", colorway: "Caqui", price: 289, sizes: ["P", "M", "G"], image: IMG.cargo, alt: "Pantalón cargo 'Paralela' caqui en primer plano" },
        { id: "jersey", category: "apparel", name: "Camiseta de Fútbol 'Várzea'", colorway: "Amarillo / Verde", price: 229, sizes: ["M", "G"], lowStock: true, image: IMG.jersey, alt: "Camiseta de fútbol 'Várzea' amarilla y verde colgada" },
        { id: "cap", category: "accessories", name: "Gorra 5-Panel 'Quebrada'", colorway: "Mix de Calle", price: 129, sizes: ["U"], image: IMG.cap, alt: "Modelo con la gorra 5-panel 'Quebrada' al aire libre" },
        { id: "socks", category: "accessories", name: "Calcetines Crew 'Listras' (pack 3)", colorway: "Multicolor", price: 79, sizes: ["U"], image: IMG.socks, alt: "Calcetines crew 'Listras' de colores puestos" },
        { id: "bag", category: "accessories", name: "Bandolera 'Trânsito'", colorway: "Negro", price: 179, sizes: ["U"], isNew: true, image: IMG.bag, alt: "Bandolera 'Trânsito' negra llevada en bandolera" },
        { id: "chain", category: "accessories", name: "Cadena 'Fio 60'", colorway: "Dorado", price: 199, sizes: ["U"], image: IMG.chain, alt: "Cadena 'Fio 60' dorada sobre tela negra" },
      ],
    },
    vista: {
      label: "Gira la zapatilla",
      title: "Vista 360°",
      intro: "Un escaneo 3D real, en vivo en la página. Arrastra la zapatilla, gírala, haz zoom a la costura — y luego llévatela.",
      badge: "VISTA 360°",
      modelTitle: "AJ1 High 'Panda' — modelo 3D interactivo",
      loadLabel: "Cargar en 3D",
      hint: "Arrastra para girar · rueda para zoom",
      featureNote: "3D en tiempo real — modelo 'Air Jordan 1' por makoto, vía Sketchfab.",
      name: "AJ1 High 'Panda'",
      colorway: "Blanco / Negro",
      price: 1199,
      description: "El clásico del callejón en el corte blanco y negro más afilado. Cuero plena flor, suela vintage y el cuello que aparece en cada foto de fit. Pares seleccionados, verificados uno a uno por el equipo VIELA.",
      sizeLabel: "Elige tu talla",
      sizeUnit: "BR",
      sizes: ["38", "39", "40", "41", "42", "43", "44"],
      pickSize: "Elige una talla para continuar",
      addToCart: "Añadir a la bolsa",
      added: "En la bolsa",
    },
    raffle: {
      label: "El sorteo",
      title: "Participa por las Velocity OG",
      intro: "Trescientos pares, miles de pies. El sorteo es la única entrada. Participa una vez, gana al azar y paga solo si sale tu nombre.",
      prizeName: "Velocity OG — Infrared",
      prizeColor: "Infrared / Void Black",
      entriesLabel: "Participaciones hasta ahora",
      entries: "18.420",
      closesLabel: "El sorteo cierra",
      closesValue: "48 horas tras el lanzamiento",
      openCta: "Entrar al sorteo",
      modalTitle: "Participación en el sorteo",
      modalIntro: "Una participación por persona. Avisamos a los ganadores por correo en las 24 horas siguientes al sorteo.",
      fields: [
        { id: "name", label: "Nombre completo", placeholder: "Alex Moraes" },
        { id: "email", label: "Correo", placeholder: "tu@correo.com" },
        { id: "city", label: "Ciudad", placeholder: "São Paulo, Brasil" },
      ],
      sizeLabel: "Talla preferida",
      sizeOptions: ["BR 38", "BR 39", "BR 40", "BR 41", "BR 42", "BR 44"],
      submit: "Enviar participación",
      terms: "Sin compra obligatoria salvo que resultes seleccionado. Una participación por persona, verificada por correo.",
      close: "Cerrar",
      successTitle: "Ya estás en el sorteo.",
      successBody: "Vigila tu bandeja de entrada. Si sale tu participación, tendrás 30 minutos para reclamar tu par a precio de tienda.",
      entryCodeLabel: "Tu código de participación",
      entryCode: "VLA-07-4482",
      successClose: "Listo",
    },
    marquee: {
      phrases: [
        "300 PARES",
        "SIN REPOSICIÓN",
        "DROP 07",
        "VIELA WEAR",
        "DIRECTO DE LA CALLE",
        "SP · BR",
        "SORTEO ABIERTO",
      ],
    },
    about: {
      label: "El callejón",
      title: "Nacida en el callejón",
      lead: "VIELA es un estudio de diseño disfrazado de marca de calle. El callejón es donde pasa la calle.",
      paragraphs: [
        "Empezamos en un callejón del Bixiga, en São Paulo, en 2019 — serigrafía en el garaje, zapatillas secándose en el tendedero y lookbooks impresos en la copistería de la esquina. La regla era simple: hacer la pieza que queríamos llevar en la vuelta de las 2 de la madrugada y no encontrábamos en ningún sitio.",
        "Cada drop nace de una sola idea, sale en una tirada contada y nunca vuelve. Cuando se acaba, se vuelve leyenda de esquina. Preferimos agotar antes que diluir.",
      ],
      stats: [
        { value: "2019", label: "en la calle desde" },
        { value: "07", label: "drops lanzados" },
        { value: "42k", label: "en la lista del drop" },
      ],
      addressLabel: "El taller",
      addressLines: ["Rua Treze de Maio 825 — Bixiga", "01327-000 · São Paulo, SP"],
      hoursLabel: "Horario del taller",
      hours: ["Jue – Sáb · 14:00 – 22:00", "Noches de drop · hasta agotar"],
      imageAlt: "Caja y embalaje VIELA bajo la luz del estudio",
      quote: "No venden ropa. Venden los diez minutos antes de un drop.",
      quoteAuthor: "Correria Zine",
    },
    footer: {
      tagline: "Ropa y zapatillas para quien hace de la calle su camino.",
      groups: [
        {
          title: "Tienda",
          links: [
            { href: "#drop", label: "El Drop" },
            { href: "#catalogo", label: "Catálogo" },
            { href: "#vista", label: "Vista 360°" },
            { href: "#raffle", label: "Sorteo" },
          ],
        },
        {
          title: "El callejón",
          links: [
            { href: "#studio", label: "Sobre nosotros" },
            { href: "#latest", label: "Velocity OG" },
            { href: "#studio", label: "Prensa" },
            { href: "#studio", label: "Empleo" },
          ],
        },
      ],
      followLabel: "Sigue el feed",
      handle: "@viela.wear",
      email: "fala@viela.wear",
      addressLines: ["Rua Treze de Maio 825 — Bixiga", "01327-000 · São Paulo, SP"],
      fine: "VIELA es una marca ficticia creada como concepto de diseño. Productos, precios y drops son ilustrativos.",
      credit: "Concepto, diseño y desarrollo de VigApp.",
    },
  },
};
