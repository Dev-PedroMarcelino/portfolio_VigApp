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

export interface GridSneaker {
  id: string;
  name: string;
  colorway: string;
  price: number;
  tag?: string;
  soldOut?: boolean;
  image: string;
  alt: string;
}

export interface GridContent {
  label: string;
  title: string;
  intro: string;
  quickAdd: string;
  added: string;
  soldOut: string;
  oneSize: string;
  items: GridSneaker[];
}

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

export interface KynetikContent {
  priceLocale: string;
  currency: string;
  header: HeaderContent;
  cart: CartContent;
  hero: HeroContent;
  latest: LatestContent;
  grid: GridContent;
  raffle: RaffleContent;
  marquee: MarqueeContent;
  about: AboutContent;
  footer: FooterContent;
}

/* Fixed images (Unsplash IDs, art-directed defensively). */
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
};

/* ------------------------------------------------------------------ */
/* Dictionary                                                          */
/* ------------------------------------------------------------------ */

export const kynetikDict: DemoDictionary<KynetikContent> = {
  en: {
    priceLocale: "en-US",
    currency: "USD",
    header: {
      nav: [
        { href: "#drop", label: "The Drop" },
        { href: "#latest", label: "Latest" },
        { href: "#vault", label: "Vault" },
        { href: "#raffle", label: "Raffle" },
        { href: "#studio", label: "Studio" },
      ],
      cartLabel: "Cart",
      openMenu: "Open navigation",
      closeMenu: "Close navigation",
    },
    cart: {
      title: "Your bag",
      empty: "Nothing in the bag yet.",
      emptyHint: "Lock a size from the latest drop to hold your pair.",
      sizeWord: "US",
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
      titleTop: "Run the",
      titleMid: "midnight",
      titleBottom: "grid.",
      sub: "KYNETIK builds sneakers for the hours the city forgets. Drop 07 lands in limited pairs — no restocks, no encores. Set your alarm to the countdown.",
      countdownLabel: "Drop goes live in",
      units: { days: "Days", hours: "Hrs", minutes: "Min", seconds: "Sec" },
      liveNow: "The drop is live — grab your pair.",
      ctaPrimary: "Notify me",
      ctaSecondary: "Preview the drop",
      imageAlt: "KYNETIK Velocity OG in infrared and black, lit by pink neon",
      stats: [
        { value: "300", label: "pairs worldwide" },
        { value: "07", label: "the drop number" },
        { value: "48h", label: "raffle window" },
      ],
      marquee: "NEW DROP · KYNETIK VELOCITY OG · INFRARED · 300 PAIRS · NO RESTOCK · ",
    },
    latest: {
      label: "Latest drop",
      title: "Velocity OG",
      intro: "A racing silhouette rebuilt for concrete. Carbon-plated, glow-lined and cut for speed you will mostly use to catch the train.",
      colorway: "Infrared / Void Black",
      name: "KYNETIK Velocity OG — Infrared",
      price: 240,
      description: "Knitted violet upper over a translucent infrared cage, riding a nitrogen-charged Kynetik foam plate. Reflective piping catches every streetlight; the heel counter is molded from recycled court panels.",
      specsLabel: "Spec sheet",
      specs: [
        { k: "Upper", v: "Recycled flow-knit" },
        { k: "Plate", v: "Carbon speed spine" },
        { k: "Foam", v: "Kynetik nitro" },
        { k: "Weight", v: "268 g" },
      ],
      sizeLabel: "Select size",
      sizeUnit: "US",
      soldOutSize: "Sold out",
      pickSize: "Pick a size to continue",
      addToCart: "Add to bag",
      added: "Added to bag",
      lowStock: "Only a few pairs left in this size",
      sizes: [
        { us: "7", available: true },
        { us: "7.5", available: true },
        { us: "8", available: false },
        { us: "8.5", available: true },
        { us: "9", available: true },
        { us: "9.5", available: true },
        { us: "10", available: false },
        { us: "10.5", available: true },
        { us: "11", available: true },
        { us: "12", available: true },
      ],
      imageAlt: "KYNETIK Velocity OG sneakers photographed as a pair on violet",
      thumbAlts: [
        "Side profile of the Velocity OG silhouette",
        "Street shot of the Velocity OG on foot",
      ],
      thumbs: [IMG.latestThumbA, IMG.latestThumbB],
    },
    grid: {
      label: "The vault",
      title: "Still in rotation",
      intro: "Past drops that refused to sit still. Limited stock, first-come — quick-add a pair before the size runs.",
      quickAdd: "Quick add",
      added: "In bag",
      soldOut: "Sold out",
      oneSize: "OS",
      items: [
        { id: "phantom", name: "Phantom Flux", colorway: "Bone / Volt", price: 210, tag: "Restocked", image: IMG.white, alt: "Phantom Flux sneaker in bone white" },
        { id: "solar", name: "Nova Trail", colorway: "Solar Flare", price: 195, tag: "Trail", image: IMG.yellow, alt: "Nova Trail sneaker in solar yellow" },
        { id: "apex", name: "Apex Runner", colorway: "Ghost Grey", price: 180, image: IMG.runner, alt: "Apex Runner performance shoe in grey" },
        { id: "cipher", name: "Cipher Low", colorway: "Ultraviolet", price: 225, tag: "Last pairs", image: IMG.angle, alt: "Cipher Low sneaker at a three-quarter angle" },
        { id: "void", name: "Void Strike", colorway: "Mono Black", price: 260, soldOut: true, image: IMG.street, alt: "Void Strike sneakers on a city street" },
        { id: "pulse", name: "Pulse Hi", colorway: "Neon Pair", price: 235, tag: "Hi-top", image: IMG.pair, alt: "Pulse Hi sneaker pair in neon tones" },
      ],
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
        { id: "city", label: "City", placeholder: "New York, NY" },
      ],
      sizeLabel: "Preferred size",
      sizeOptions: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
      submit: "Submit entry",
      terms: "No purchase due unless selected. One entry per person, verified by email.",
      close: "Close",
      successTitle: "You are in the draw.",
      successBody: "Keep an eye on your inbox. If your entry is pulled, you get a 30-minute window to claim your pair at retail.",
      entryCodeLabel: "Your entry code",
      entryCode: "KYN-07-4482",
      successClose: "Done",
    },
    marquee: {
      phrases: [
        "300 PAIRS",
        "NO RESTOCK",
        "DROP 07",
        "MIDNIGHT GRID",
        "INFRARED",
        "KYNETIK NITRO",
        "RAFFLE OPEN",
      ],
    },
    about: {
      label: "The studio",
      title: "Built after dark",
      lead: "KYNETIK is a design studio disguised as a sneaker label.",
      paragraphs: [
        "We started in a Lisbon basement in 2019, cutting soles by hand and printing lookbooks at the corner copy shop. The rule was simple: make the pair we wanted to wear at 2 a.m. and could not find anywhere.",
        "Every drop is engineered around one idea, produced in a single limited run, and never restocked. When it is gone, it becomes lore. We would rather sell out than water it down.",
      ],
      stats: [
        { value: "2019", label: "cutting soles since" },
        { value: "07", label: "drops released" },
        { value: "42k", label: "on the drop list" },
      ],
      addressLabel: "The lab",
      addressLines: ["Rua do Grémio Lusitano 14", "1200-219 Lisboa, Portugal"],
      hoursLabel: "Studio hours",
      hours: ["Thu – Sat · 14:00 – 22:00", "Drop nights · until sold out"],
      imageAlt: "KYNETIK shoe box and packaging under studio lighting",
      quote: "They do not sell shoes. They sell the ten minutes before a drop.",
      quoteAuthor: "Highsnob Weekly",
    },
    footer: {
      tagline: "Sneakers for the hours the city forgets.",
      groups: [
        {
          title: "Shop",
          links: [
            { href: "#drop", label: "The Drop" },
            { href: "#latest", label: "Velocity OG" },
            { href: "#vault", label: "The Vault" },
            { href: "#raffle", label: "Raffle" },
          ],
        },
        {
          title: "Studio",
          links: [
            { href: "#studio", label: "About" },
            { href: "#studio", label: "Sustainability" },
            { href: "#studio", label: "Press" },
            { href: "#studio", label: "Careers" },
          ],
        },
      ],
      followLabel: "Follow the feed",
      handle: "@kynetik",
      email: "drop@kynetik.studio",
      addressLines: ["Rua do Grémio Lusitano 14", "1200-219 Lisboa, Portugal"],
      fine: "KYNETIK is a fictional brand imagined as a design concept. Products, prices and drops are illustrative.",
      credit: "Concept, design and build by VigApp.",
    },
  },

  pt: {
    priceLocale: "pt-BR",
    currency: "BRL",
    header: {
      nav: [
        { href: "#drop", label: "O Drop" },
        { href: "#latest", label: "Lançamento" },
        { href: "#vault", label: "Vault" },
        { href: "#raffle", label: "Sorteio" },
        { href: "#studio", label: "Estúdio" },
      ],
      cartLabel: "Sacola",
      openMenu: "Abrir navegação",
      closeMenu: "Fechar navegação",
    },
    cart: {
      title: "Sua sacola",
      empty: "Sua sacola está vazia.",
      emptyHint: "Garanta um número no último drop para segurar o seu par.",
      sizeWord: "BR",
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
      titleTop: "Corra pela",
      titleMid: "grade da",
      titleBottom: "meia-noite.",
      sub: "A KYNETIK cria tênis para as horas que a cidade esquece. O Drop 07 chega em pares limitados — sem reposição, sem bis. Acerte o alarme pela contagem.",
      countdownLabel: "O drop abre em",
      units: { days: "Dias", hours: "Hrs", minutes: "Min", seconds: "Seg" },
      liveNow: "O drop está no ar — garanta o seu par.",
      ctaPrimary: "Avise-me",
      ctaSecondary: "Ver o drop",
      imageAlt: "KYNETIK Velocity OG em infrared e preto, sob neon rosa",
      stats: [
        { value: "300", label: "pares no mundo" },
        { value: "07", label: "o número do drop" },
        { value: "48h", label: "janela do sorteio" },
      ],
      marquee: "NOVO DROP · KYNETIK VELOCITY OG · INFRARED · 300 PARES · SEM REPOSIÇÃO · ",
    },
    latest: {
      label: "Último drop",
      title: "Velocity OG",
      intro: "Uma silhueta de corrida reconstruída para o concreto. Placa de carbono, linhas que brilham e um recorte de velocidade que você vai usar mesmo é para pegar o metrô.",
      colorway: "Infrared / Void Black",
      name: "KYNETIK Velocity OG — Infrared",
      price: 1290,
      description: "Cabedal de tricô violeta sobre uma gaiola infrared translúcida, com placa de espuma nitro Kynetik. As costuras refletivas capturam cada poste de luz; o contraforte é moldado de painéis de quadra reciclados.",
      specsLabel: "Ficha técnica",
      specs: [
        { k: "Cabedal", v: "Flow-knit reciclado" },
        { k: "Placa", v: "Espinha de carbono" },
        { k: "Espuma", v: "Kynetik nitro" },
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
      imageAlt: "Tênis KYNETIK Velocity OG fotografados em par sobre violeta",
      thumbAlts: [
        "Perfil lateral da silhueta Velocity OG",
        "Foto de rua do Velocity OG nos pés",
      ],
      thumbs: [IMG.latestThumbA, IMG.latestThumbB],
    },
    grid: {
      label: "O vault",
      title: "Ainda em rotação",
      intro: "Drops passados que não sossegam. Estoque limitado, por ordem de chegada — adicione rápido antes que o número acabe.",
      quickAdd: "Adição rápida",
      added: "Na sacola",
      soldOut: "Esgotado",
      oneSize: "TU",
      items: [
        { id: "phantom", name: "Phantom Flux", colorway: "Bone / Volt", price: 1120, tag: "Repôs", image: IMG.white, alt: "Tênis Phantom Flux em branco osso" },
        { id: "solar", name: "Nova Trail", colorway: "Solar Flare", price: 1040, tag: "Trail", image: IMG.yellow, alt: "Tênis Nova Trail em amarelo solar" },
        { id: "apex", name: "Apex Runner", colorway: "Ghost Grey", price: 960, image: IMG.runner, alt: "Tênis de corrida Apex Runner em cinza" },
        { id: "cipher", name: "Cipher Low", colorway: "Ultraviolet", price: 1190, tag: "Últimos pares", image: IMG.angle, alt: "Tênis Cipher Low em ângulo de três quartos" },
        { id: "void", name: "Void Strike", colorway: "Mono Black", price: 1380, soldOut: true, image: IMG.street, alt: "Tênis Void Strike numa rua da cidade" },
        { id: "pulse", name: "Pulse Hi", colorway: "Neon Pair", price: 1250, tag: "Cano alto", image: IMG.pair, alt: "Par de tênis Pulse Hi em tons neon" },
      ],
    },
    raffle: {
      label: "O sorteio",
      title: "Concorra ao Velocity OG",
      intro: "Trezentos pares, milhares de pés. O sorteio é a única entrada. Inscreva-se uma vez, ganhe no aleatório e pague só se o seu nome sair.",
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
      sizeOptions: ["BR 37", "BR 39", "BR 41", "BR 42", "BR 44", "BR 46"],
      submit: "Enviar inscrição",
      terms: "Sem compra obrigatória, exceto se selecionado. Uma inscrição por pessoa, verificada por e-mail.",
      close: "Fechar",
      successTitle: "Você está no sorteio.",
      successBody: "Fique de olho no seu e-mail. Se a sua inscrição for sorteada, você tem 30 minutos para garantir o par pelo preço de tabela.",
      entryCodeLabel: "Seu código de inscrição",
      entryCode: "KYN-07-4482",
      successClose: "Concluir",
    },
    marquee: {
      phrases: [
        "300 PARES",
        "SEM REPOSIÇÃO",
        "DROP 07",
        "GRADE DA MEIA-NOITE",
        "INFRARED",
        "KYNETIK NITRO",
        "SORTEIO ABERTO",
      ],
    },
    about: {
      label: "O estúdio",
      title: "Feito de madrugada",
      lead: "A KYNETIK é um estúdio de design disfarçado de marca de tênis.",
      paragraphs: [
        "Começamos num porão de Lisboa em 2019, cortando solas à mão e imprimindo lookbooks na gráfica da esquina. A regra era simples: fazer o par que a gente queria usar às 2 da manhã e não achava em lugar nenhum.",
        "Cada drop nasce de uma única ideia, sai em uma tiragem limitada e nunca é reposto. Quando acaba, vira lenda. Preferimos esgotar a diluir.",
      ],
      stats: [
        { value: "2019", label: "cortando solas desde" },
        { value: "07", label: "drops lançados" },
        { value: "42k", label: "na lista de drops" },
      ],
      addressLabel: "O laboratório",
      addressLines: ["Rua do Grémio Lusitano 14", "1200-219 Lisboa, Portugal"],
      hoursLabel: "Horário do estúdio",
      hours: ["Qui – Sáb · 14:00 – 22:00", "Noites de drop · até esgotar"],
      imageAlt: "Caixa e embalagem KYNETIK sob a luz do estúdio",
      quote: "Eles não vendem tênis. Vendem os dez minutos antes do drop.",
      quoteAuthor: "Highsnob Weekly",
    },
    footer: {
      tagline: "Tênis para as horas que a cidade esquece.",
      groups: [
        {
          title: "Loja",
          links: [
            { href: "#drop", label: "O Drop" },
            { href: "#latest", label: "Velocity OG" },
            { href: "#vault", label: "O Vault" },
            { href: "#raffle", label: "Sorteio" },
          ],
        },
        {
          title: "Estúdio",
          links: [
            { href: "#studio", label: "Sobre" },
            { href: "#studio", label: "Sustentabilidade" },
            { href: "#studio", label: "Imprensa" },
            { href: "#studio", label: "Trabalhe conosco" },
          ],
        },
      ],
      followLabel: "Siga o feed",
      handle: "@kynetik",
      email: "drop@kynetik.studio",
      addressLines: ["Rua do Grémio Lusitano 14", "1200-219 Lisboa, Portugal"],
      fine: "KYNETIK é uma marca fictícia criada como conceito de design. Produtos, preços e drops são ilustrativos.",
      credit: "Conceito, design e código por VigApp.",
    },
  },

  es: {
    priceLocale: "es-ES",
    currency: "EUR",
    header: {
      nav: [
        { href: "#drop", label: "El Drop" },
        { href: "#latest", label: "Lanzamiento" },
        { href: "#vault", label: "Vault" },
        { href: "#raffle", label: "Sorteo" },
        { href: "#studio", label: "Estudio" },
      ],
      cartLabel: "Bolsa",
      openMenu: "Abrir navegación",
      closeMenu: "Cerrar navegación",
    },
    cart: {
      title: "Tu bolsa",
      empty: "Tu bolsa está vacía.",
      emptyHint: "Fija una talla del último drop para reservar tu par.",
      sizeWord: "EU",
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
      titleTop: "Corre por la",
      titleMid: "rejilla de",
      titleBottom: "medianoche.",
      sub: "KYNETIK crea zapatillas para las horas que la ciudad olvida. El Drop 07 llega en pares limitados — sin reposición, sin bises. Pon la alarma en la cuenta atrás.",
      countdownLabel: "El drop se abre en",
      units: { days: "Días", hours: "Hrs", minutes: "Min", seconds: "Seg" },
      liveNow: "El drop está en directo — llévate tu par.",
      ctaPrimary: "Avísame",
      ctaSecondary: "Ver el drop",
      imageAlt: "KYNETIK Velocity OG en infrared y negro, bajo neón rosa",
      stats: [
        { value: "300", label: "pares en el mundo" },
        { value: "07", label: "el número del drop" },
        { value: "48h", label: "ventana del sorteo" },
      ],
      marquee: "NUEVO DROP · KYNETIK VELOCITY OG · INFRARED · 300 PARES · SIN REPOSICIÓN · ",
    },
    latest: {
      label: "Último drop",
      title: "Velocity OG",
      intro: "Una silueta de carreras reconstruida para el asfalto. Placa de carbono, líneas que brillan y un corte de velocidad que usarás sobre todo para pillar el metro.",
      colorway: "Infrared / Void Black",
      name: "KYNETIK Velocity OG — Infrared",
      price: 230,
      description: "Corte de punto violeta sobre una jaula infrared translúcida, montado sobre una placa de espuma nitro Kynetik. Los ribetes reflectantes atrapan cada farola; el talón está moldeado con paneles de pista reciclados.",
      specsLabel: "Ficha técnica",
      specs: [
        { k: "Corte", v: "Flow-knit reciclado" },
        { k: "Placa", v: "Columna de carbono" },
        { k: "Espuma", v: "Kynetik nitro" },
        { k: "Peso", v: "268 g" },
      ],
      sizeLabel: "Elige tu talla",
      sizeUnit: "EU",
      soldOutSize: "Agotado",
      pickSize: "Elige una talla para continuar",
      addToCart: "Añadir a la bolsa",
      added: "En la bolsa",
      lowStock: "Quedan pocos pares en esta talla",
      sizes: [
        { us: "38", available: true },
        { us: "39", available: true },
        { us: "40", available: false },
        { us: "41", available: true },
        { us: "42", available: true },
        { us: "43", available: true },
        { us: "44", available: false },
        { us: "45", available: true },
        { us: "46", available: true },
        { us: "47", available: true },
      ],
      imageAlt: "Zapatillas KYNETIK Velocity OG fotografiadas en par sobre violeta",
      thumbAlts: [
        "Perfil lateral de la silueta Velocity OG",
        "Foto callejera del Velocity OG puesto",
      ],
      thumbs: [IMG.latestThumbA, IMG.latestThumbB],
    },
    grid: {
      label: "El vault",
      title: "Aún en rotación",
      intro: "Drops pasados que no se quedan quietos. Stock limitado, por orden de llegada — añade rápido antes de que se agote la talla.",
      quickAdd: "Añadir rápido",
      added: "En la bolsa",
      soldOut: "Agotado",
      oneSize: "TU",
      items: [
        { id: "phantom", name: "Phantom Flux", colorway: "Bone / Volt", price: 200, tag: "Repuesto", image: IMG.white, alt: "Zapatilla Phantom Flux en blanco hueso" },
        { id: "solar", name: "Nova Trail", colorway: "Solar Flare", price: 185, tag: "Trail", image: IMG.yellow, alt: "Zapatilla Nova Trail en amarillo solar" },
        { id: "apex", name: "Apex Runner", colorway: "Ghost Grey", price: 170, image: IMG.runner, alt: "Zapatilla de running Apex Runner en gris" },
        { id: "cipher", name: "Cipher Low", colorway: "Ultraviolet", price: 215, tag: "Últimos pares", image: IMG.angle, alt: "Zapatilla Cipher Low en ángulo de tres cuartos" },
        { id: "void", name: "Void Strike", colorway: "Mono Black", price: 250, soldOut: true, image: IMG.street, alt: "Zapatillas Void Strike en una calle" },
        { id: "pulse", name: "Pulse Hi", colorway: "Neon Pair", price: 225, tag: "Caña alta", image: IMG.pair, alt: "Par de zapatillas Pulse Hi en tonos neón" },
      ],
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
        { id: "city", label: "Ciudad", placeholder: "Madrid, España" },
      ],
      sizeLabel: "Talla preferida",
      sizeOptions: ["EU 38", "EU 40", "EU 42", "EU 43", "EU 45", "EU 47"],
      submit: "Enviar participación",
      terms: "Sin compra obligatoria salvo que resultes seleccionado. Una participación por persona, verificada por correo.",
      close: "Cerrar",
      successTitle: "Ya estás en el sorteo.",
      successBody: "Vigila tu bandeja de entrada. Si sale tu participación, tendrás 30 minutos para reclamar tu par a precio de tienda.",
      entryCodeLabel: "Tu código de participación",
      entryCode: "KYN-07-4482",
      successClose: "Listo",
    },
    marquee: {
      phrases: [
        "300 PARES",
        "SIN REPOSICIÓN",
        "DROP 07",
        "REJILLA DE MEDIANOCHE",
        "INFRARED",
        "KYNETIK NITRO",
        "SORTEO ABIERTO",
      ],
    },
    about: {
      label: "El estudio",
      title: "Hecho de noche",
      lead: "KYNETIK es un estudio de diseño disfrazado de marca de zapatillas.",
      paragraphs: [
        "Empezamos en un sótano de Lisboa en 2019, cortando suelas a mano e imprimiendo lookbooks en la copistería de la esquina. La regla era simple: hacer el par que queríamos llevar a las 2 de la madrugada y no encontrábamos en ningún sitio.",
        "Cada drop nace de una sola idea, se produce en una tirada limitada y nunca se repone. Cuando se acaba, se vuelve leyenda. Preferimos agotar antes que diluir.",
      ],
      stats: [
        { value: "2019", label: "cortando suelas desde" },
        { value: "07", label: "drops lanzados" },
        { value: "42k", label: "en la lista de drops" },
      ],
      addressLabel: "El laboratorio",
      addressLines: ["Rua do Grémio Lusitano 14", "1200-219 Lisboa, Portugal"],
      hoursLabel: "Horario del estudio",
      hours: ["Jue – Sáb · 14:00 – 22:00", "Noches de drop · hasta agotar"],
      imageAlt: "Caja y embalaje KYNETIK bajo la luz del estudio",
      quote: "No venden zapatillas. Venden los diez minutos antes de un drop.",
      quoteAuthor: "Highsnob Weekly",
    },
    footer: {
      tagline: "Zapatillas para las horas que la ciudad olvida.",
      groups: [
        {
          title: "Tienda",
          links: [
            { href: "#drop", label: "El Drop" },
            { href: "#latest", label: "Velocity OG" },
            { href: "#vault", label: "El Vault" },
            { href: "#raffle", label: "Sorteo" },
          ],
        },
        {
          title: "Estudio",
          links: [
            { href: "#studio", label: "Sobre nosotros" },
            { href: "#studio", label: "Sostenibilidad" },
            { href: "#studio", label: "Prensa" },
            { href: "#studio", label: "Empleo" },
          ],
        },
      ],
      followLabel: "Sigue el feed",
      handle: "@kynetik",
      email: "drop@kynetik.studio",
      addressLines: ["Rua do Grémio Lusitano 14", "1200-219 Lisboa, Portugal"],
      fine: "KYNETIK es una marca ficticia creada como concepto de diseño. Productos, precios y drops son ilustrativos.",
      credit: "Concepto, diseño y desarrollo de VigApp.",
    },
  },
};
