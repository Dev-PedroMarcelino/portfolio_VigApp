import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type RoomId = "living" | "kitchen" | "bedroom" | "office";
export type FilterId = "all" | RoomId;

export interface CurrencyInfo {
  locale: string;
  code: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface RoomFilter {
  id: FilterId;
  label: string;
}

export interface ProjectContent {
  id: string;
  room: RoomId;
  imageId: string;
  title: string;
  location: string;
  year: string;
  area: string;
  palette: string;
  alt: string;
}

export interface MaterialSwatch {
  id: string;
  name: string;
  hex: string;
  family: string;
  usage: string;
}

export interface ProcessStep {
  id: string;
  index: string;
  title: string;
  body: string;
  duration: string;
}

export interface TestimonialContent {
  id: string;
  quote: string;
  name: string;
  role: string;
  project: string;
}

export interface AmbraContent {
  currency: CurrencyInfo;
  header: {
    nav: NavLink[];
    cta: string;
    bookAria: string;
    menuOpen: string;
    menuClose: string;
  };
  hero: {
    eyebrow: string;
    titleLead: string;
    titleItalic: string;
    titleTail: string;
    intro: string;
    ctaPrimary: string;
    ctaSecondary: string;
    imageAlt: string;
    fromLabel: string;
    fromPrice: number;
    stats: { value: string; label: string }[];
    scroll: string;
  };
  portfolio: {
    label: string;
    title: string;
    intro: string;
    filters: RoomFilter[];
    projects: ProjectContent[];
    empty: string;
    metaArea: string;
    metaYear: string;
    countLabel: string;
  };
  beforeAfter: {
    label: string;
    title: string;
    intro: string;
    imageId: string;
    beforeLabel: string;
    afterLabel: string;
    hint: string;
    caption: string;
    project: string;
    beforeAlt: string;
    afterAlt: string;
    ariaSlider: string;
  };
  materials: {
    label: string;
    title: string;
    intro: string;
    hint: string;
    usageLabel: string;
    swatches: MaterialSwatch[];
  };
  process: {
    label: string;
    title: string;
    intro: string;
    steps: ProcessStep[];
    durationLabel: string;
  };
  testimonials: {
    label: string;
    title: string;
    items: TestimonialContent[];
  };
  footer: {
    tagline: string;
    studioLabel: string;
    address: string[];
    hoursLabel: string;
    hours: string[];
    contactLabel: string;
    email: string;
    phone: string;
    linksLabel: string;
    links: NavLink[];
    socialLabel: string;
    social: { label: string; handle: string }[];
    rights: string;
    credit: string;
  };
}

/* ------------------------------------------------------------------ */
/* English                                                             */
/* ------------------------------------------------------------------ */

const en: AmbraContent = {
  currency: { locale: "en-US", code: "USD" },
  header: {
    nav: [
      { href: "#portfolio", label: "Portfolio" },
      { href: "#transformation", label: "Before & After" },
      { href: "#materials", label: "Materials" },
      { href: "#process", label: "Process" },
      { href: "#voices", label: "Clients" },
    ],
    cta: "Book a consultation",
    bookAria: "Book an interior design consultation",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
  hero: {
    eyebrow: "Interior design studio, since 2011",
    titleLead: "Rooms that hold",
    titleItalic: "light",
    titleTail: "and quiet the day",
    intro:
      "Studio Ambra shapes warm, unhurried interiors in linen, clay and walnut. We design every surface to be touched, lived in and softened by afternoon sun.",
    ctaPrimary: "Start your project",
    ctaSecondary: "See recent work",
    imageAlt: "Sunlit living room styled by Studio Ambra with linen sofa and arched niche",
    fromLabel: "Full-room design from",
    fromPrice: 2400,
    stats: [
      { value: "140+", label: "Homes completed" },
      { value: "13", label: "Years in practice" },
      { value: "9", label: "Design awards" },
    ],
    scroll: "Scroll to explore",
  },
  portfolio: {
    label: "Selected work",
    title: "A portfolio you can filter by room",
    intro:
      "From compact city kitchens to slow, sunlit bedrooms, browse projects by the space you are dreaming about.",
    filters: [
      { id: "all", label: "All spaces" },
      { id: "living", label: "Living" },
      { id: "kitchen", label: "Kitchen" },
      { id: "bedroom", label: "Bedroom" },
      { id: "office", label: "Studio & office" },
    ],
    projects: [
      {
        id: "casa-lumen",
        room: "living",
        imageId: "photo-1618221195710-dd6b41faaea6",
        title: "Casa Lumen",
        location: "Lisbon, Alfama",
        year: "2025",
        area: "72 m²",
        palette: "Linen, clay, oak",
        alt: "Living room with linen sofa, terracotta cushions and warm oak floor",
      },
      {
        id: "field-house",
        room: "living",
        imageId: "photo-1615873968403-89e068629265",
        title: "Field House",
        location: "Provence, France",
        year: "2024",
        area: "58 m²",
        palette: "Bouclé, plaster, brass",
        alt: "Soft bouclé sofa scene with plaster walls and brass accents",
      },
      {
        id: "olive-kitchen",
        room: "kitchen",
        imageId: "photo-1600566753086-00f18fb6b3ea",
        title: "Olive & Ash",
        location: "Porto, Foz",
        year: "2025",
        area: "24 m²",
        palette: "Ash, olive, marble",
        alt: "Warm kitchen with ash cabinetry, marble counter and olive tones",
      },
      {
        id: "north-loft",
        room: "kitchen",
        imageId: "photo-1600607687939-ce8a6c25118c",
        title: "North Loft",
        location: "Milan, Isola",
        year: "2023",
        area: "96 m²",
        palette: "Concrete, walnut, linen",
        alt: "Open modern interior with walnut joinery and soft concrete tones",
      },
      {
        id: "dune-suite",
        room: "bedroom",
        imageId: "photo-1600210492486-724fe5c67fb0",
        title: "Dune Suite",
        location: "Comporta, Portugal",
        year: "2024",
        area: "31 m²",
        palette: "Sand, clay, linen",
        alt: "Serene bedroom in sand and clay tones with layered linen bedding",
      },
      {
        id: "linen-retreat",
        room: "bedroom",
        imageId: "photo-1567016432779-094069958ea5",
        title: "Linen Retreat",
        location: "Tuscany, Italy",
        year: "2025",
        area: "27 m²",
        palette: "Oat, walnut, wool",
        alt: "Detail of a made bed with layered oat and walnut textiles",
      },
      {
        id: "atelier-nove",
        room: "office",
        imageId: "photo-1586023492125-27b2c045efd7",
        title: "Atelier Nove",
        location: "Barcelona, Gràcia",
        year: "2024",
        area: "19 m²",
        palette: "Cognac, cork, brass",
        alt: "Home studio corner with a cognac leather armchair and brass lamp",
      },
      {
        id: "reading-room",
        room: "office",
        imageId: "photo-1616486338812-3dadae4b4ace",
        title: "The Reading Room",
        location: "Copenhagen, Vesterbro",
        year: "2023",
        area: "16 m²",
        palette: "Plaster, terracotta, oak",
        alt: "Styled decor detail with terracotta objects on an oak surface",
      },
    ],
    empty: "No projects in this room yet. Try another space.",
    metaArea: "Area",
    metaYear: "Year",
    countLabel: "projects",
  },
  beforeAfter: {
    label: "The transformation",
    title: "Drag to see the room come to life",
    intro:
      "A tired rental in the Chiado district, reworked into a warm, breathing home. Pull the handle to move between the empty shell and the finished space.",
    imageId: "photo-1600607687939-ce8a6c25118c",
    beforeLabel: "Before",
    afterLabel: "After",
    hint: "Drag the handle",
    caption: "Casa Vento — a full renovation delivered in eleven weeks.",
    project: "Casa Vento, Chiado",
    beforeAlt: "The apartment before renovation, bare and cool-toned",
    afterAlt: "The same apartment after renovation, warm and fully styled",
    ariaSlider: "Before and after comparison slider",
  },
  materials: {
    label: "The material palette",
    title: "Surfaces chosen to be touched",
    intro:
      "Every Studio Ambra project begins with a tray of samples. Hover a swatch to see where each material earns its place.",
    hint: "Hover a swatch for its story",
    usageLabel: "Where we use it",
    swatches: [
      {
        id: "linen",
        name: "Washed Linen",
        hex: "#D8C7AE",
        family: "Textile",
        usage: "Loose slip covers, layered curtains and bedding that softens with every wash.",
      },
      {
        id: "clay",
        name: "Burnt Clay",
        hex: "#B4560F",
        family: "Plaster",
        usage: "Lime-based accent walls and arched niches that glow in low evening light.",
      },
      {
        id: "walnut",
        name: "Oiled Walnut",
        hex: "#5C4433",
        family: "Timber",
        usage: "Joinery, shelving and door frames, hand-oiled to keep an open, tactile grain.",
      },
      {
        id: "oat",
        name: "Oat Bouclé",
        hex: "#E4DAC6",
        family: "Upholstery",
        usage: "Reading chairs and headboards where the eye wants to rest and the hand wants to stay.",
      },
      {
        id: "terracotta",
        name: "Terracotta",
        hex: "#C97B3E",
        family: "Ceramic",
        usage: "Unglazed floor tiles and vessels that carry warmth from room to room.",
      },
      {
        id: "brass",
        name: "Aged Brass",
        hex: "#9A7B4F",
        family: "Metal",
        usage: "Handles, sconces and edges left to patina slowly into a soft, living gold.",
      },
    ],
  },
  process: {
    label: "How we work",
    title: "Four unhurried steps",
    intro:
      "A calm, considered path from first conversation to the day you move a chair into the light exactly where it belongs.",
    steps: [
      {
        id: "listen",
        index: "01",
        title: "Listen & measure",
        body: "We spend an afternoon in your space, learning how you live, where the light falls and what the room already wants to be.",
        duration: "Week 1",
      },
      {
        id: "concept",
        index: "02",
        title: "Concept & palette",
        body: "You receive a mood direction, a material tray and hand-drawn plans, so the whole home speaks in one warm voice.",
        duration: "Weeks 2 to 4",
      },
      {
        id: "sourcing",
        index: "03",
        title: "Source & craft",
        body: "We commission makers, order textiles and manage every joiner and painter, keeping the palette honest at each turn.",
        duration: "Weeks 5 to 9",
      },
      {
        id: "styling",
        index: "04",
        title: "Install & style",
        body: "On reveal day we place the final vase, fluff the last cushion and hand you a home that already feels lived in.",
        duration: "Weeks 10 to 12",
      },
    ],
    durationLabel: "Typical timeline",
  },
  testimonials: {
    label: "In their words",
    title: "Homes that changed the everyday",
    items: [
      {
        id: "mariana",
        quote:
          "Studio Ambra found a warmth in our apartment we had lived past for years. Now the light and the walls finally agree.",
        name: "Mariana Costa",
        role: "Homeowner",
        project: "Casa Lumen, Lisbon",
      },
      {
        id: "thomas",
        quote:
          "They treated our small kitchen like a jewellery box. Every material was chosen twice, and you can feel it every morning.",
        name: "Thomas Lindqvist",
        role: "Client",
        project: "Olive & Ash, Porto",
      },
      {
        id: "aline",
        quote:
          "The process was calm from the first afternoon. We never once felt sold to, only listened to and beautifully answered.",
        name: "Aline Ferreira",
        role: "Homeowner",
        project: "Dune Suite, Comporta",
      },
    ],
  },
  footer: {
    tagline: "Warm, unhurried interiors, shaped around the way you actually live.",
    studioLabel: "The studio",
    address: ["Rua da Boavista 114", "1200-069 Lisbon, Portugal"],
    hoursLabel: "Studio hours",
    hours: ["Monday to Friday, 10:00 to 18:00", "Saturday by appointment"],
    contactLabel: "Say hello",
    email: "atelier@studioambra.com",
    phone: "+351 213 972 400",
    linksLabel: "Explore",
    links: [
      { href: "#portfolio", label: "Portfolio" },
      { href: "#materials", label: "Materials" },
      { href: "#process", label: "Process" },
      { href: "#voices", label: "Clients" },
    ],
    socialLabel: "Follow along",
    social: [
      { label: "Journal", handle: "@studioambra" },
      { label: "Field notes", handle: "studioambra.com" },
    ],
    rights: "Studio Ambra. All rights reserved.",
    credit: "An interior design concept crafted by VigApp.",
  },
};

/* ------------------------------------------------------------------ */
/* Portuguese                                                          */
/* ------------------------------------------------------------------ */

const pt: AmbraContent = {
  currency: { locale: "pt-BR", code: "BRL" },
  header: {
    nav: [
      { href: "#portfolio", label: "Portfólio" },
      { href: "#transformation", label: "Antes e Depois" },
      { href: "#materials", label: "Materiais" },
      { href: "#process", label: "Processo" },
      { href: "#voices", label: "Clientes" },
    ],
    cta: "Agendar consultoria",
    bookAria: "Agendar uma consultoria de design de interiores",
    menuOpen: "Abrir menu",
    menuClose: "Fechar menu",
  },
  hero: {
    eyebrow: "Estúdio de design de interiores, desde 2011",
    titleLead: "Ambientes que guardam",
    titleItalic: "a luz",
    titleTail: "e acalmam o dia",
    intro:
      "O Studio Ambra desenha interiores quentes e sem pressa em linho, argila e nogueira. Cada superfície é pensada para ser tocada, vivida e adoçada pelo sol da tarde.",
    ctaPrimary: "Começar seu projeto",
    ctaSecondary: "Ver trabalhos recentes",
    imageAlt: "Sala iluminada assinada pelo Studio Ambra com sofá de linho e nicho em arco",
    fromLabel: "Projeto de ambiente completo a partir de",
    fromPrice: 6900,
    stats: [
      { value: "140+", label: "Casas entregues" },
      { value: "13", label: "Anos de atuação" },
      { value: "9", label: "Prêmios de design" },
    ],
    scroll: "Role para explorar",
  },
  portfolio: {
    label: "Trabalhos selecionados",
    title: "Um portfólio que você filtra por ambiente",
    intro:
      "De cozinhas urbanas compactas a quartos lentos e ensolarados, explore os projetos pelo espaço que você está sonhando.",
    filters: [
      { id: "all", label: "Todos os espaços" },
      { id: "living", label: "Sala" },
      { id: "kitchen", label: "Cozinha" },
      { id: "bedroom", label: "Quarto" },
      { id: "office", label: "Estúdio e escritório" },
    ],
    projects: [
      {
        id: "casa-lumen",
        room: "living",
        imageId: "photo-1618221195710-dd6b41faaea6",
        title: "Casa Lumen",
        location: "Lisboa, Alfama",
        year: "2025",
        area: "72 m²",
        palette: "Linho, argila, carvalho",
        alt: "Sala com sofá de linho, almofadas em terracota e piso quente de carvalho",
      },
      {
        id: "field-house",
        room: "living",
        imageId: "photo-1615873968403-89e068629265",
        title: "Field House",
        location: "Provence, França",
        year: "2024",
        area: "58 m²",
        palette: "Bouclé, gesso, latão",
        alt: "Cena de sofá em bouclé com paredes de gesso e detalhes em latão",
      },
      {
        id: "olive-kitchen",
        room: "kitchen",
        imageId: "photo-1600566753086-00f18fb6b3ea",
        title: "Olive & Ash",
        location: "Porto, Foz",
        year: "2025",
        area: "24 m²",
        palette: "Freixo, oliva, mármore",
        alt: "Cozinha quente com marcenaria em freixo, bancada de mármore e tons oliva",
      },
      {
        id: "north-loft",
        room: "kitchen",
        imageId: "photo-1600607687939-ce8a6c25118c",
        title: "North Loft",
        location: "Milão, Isola",
        year: "2023",
        area: "96 m²",
        palette: "Concreto, nogueira, linho",
        alt: "Interior moderno e aberto com marcenaria de nogueira e tons de concreto",
      },
      {
        id: "dune-suite",
        room: "bedroom",
        imageId: "photo-1600210492486-724fe5c67fb0",
        title: "Dune Suite",
        location: "Comporta, Portugal",
        year: "2024",
        area: "31 m²",
        palette: "Areia, argila, linho",
        alt: "Quarto sereno em tons de areia e argila com roupa de cama em linho",
      },
      {
        id: "linen-retreat",
        room: "bedroom",
        imageId: "photo-1567016432779-094069958ea5",
        title: "Linen Retreat",
        location: "Toscana, Itália",
        year: "2025",
        area: "27 m²",
        palette: "Aveia, nogueira, lã",
        alt: "Detalhe de cama arrumada com têxteis em aveia e nogueira",
      },
      {
        id: "atelier-nove",
        room: "office",
        imageId: "photo-1586023492125-27b2c045efd7",
        title: "Atelier Nove",
        location: "Barcelona, Gràcia",
        year: "2024",
        area: "19 m²",
        palette: "Conhaque, cortiça, latão",
        alt: "Canto de home studio com poltrona de couro conhaque e luminária de latão",
      },
      {
        id: "reading-room",
        room: "office",
        imageId: "photo-1616486338812-3dadae4b4ace",
        title: "The Reading Room",
        location: "Copenhague, Vesterbro",
        year: "2023",
        area: "16 m²",
        palette: "Gesso, terracota, carvalho",
        alt: "Detalhe de decoração com objetos em terracota sobre superfície de carvalho",
      },
    ],
    empty: "Ainda não há projetos neste ambiente. Escolha outro espaço.",
    metaArea: "Área",
    metaYear: "Ano",
    countLabel: "projetos",
  },
  beforeAfter: {
    label: "A transformação",
    title: "Arraste para ver o ambiente ganhar vida",
    intro:
      "Um aluguel cansado no bairro do Chiado, transformado em uma casa quente e respirável. Puxe o controle para alternar entre a estrutura vazia e o espaço finalizado.",
    imageId: "photo-1600607687939-ce8a6c25118c",
    beforeLabel: "Antes",
    afterLabel: "Depois",
    hint: "Arraste o controle",
    caption: "Casa Vento — uma reforma completa entregue em onze semanas.",
    project: "Casa Vento, Chiado",
    beforeAlt: "O apartamento antes da reforma, nu e com tons frios",
    afterAlt: "O mesmo apartamento após a reforma, quente e totalmente decorado",
    ariaSlider: "Controle de comparação entre antes e depois",
  },
  materials: {
    label: "A paleta de materiais",
    title: "Superfícies escolhidas para serem tocadas",
    intro:
      "Todo projeto do Studio Ambra começa com uma bandeja de amostras. Passe o cursor sobre uma cartela para ver onde cada material encontra seu lugar.",
    hint: "Passe o cursor para ver a história",
    usageLabel: "Onde aplicamos",
    swatches: [
      {
        id: "linen",
        name: "Linho Lavado",
        hex: "#D8C7AE",
        family: "Têxtil",
        usage: "Capas soltas, cortinas em camadas e roupa de cama que amacia a cada lavagem.",
      },
      {
        id: "clay",
        name: "Argila Queimada",
        hex: "#B4560F",
        family: "Reboco",
        usage: "Paredes de destaque em cal e nichos em arco que brilham na luz baixa da noite.",
      },
      {
        id: "walnut",
        name: "Nogueira Oleada",
        hex: "#5C4433",
        family: "Madeira",
        usage: "Marcenaria, prateleiras e batentes, oleados à mão para manter o veio vivo e tátil.",
      },
      {
        id: "oat",
        name: "Bouclé Aveia",
        hex: "#E4DAC6",
        family: "Estofado",
        usage: "Poltronas de leitura e cabeceiras onde o olhar descansa e a mão quer ficar.",
      },
      {
        id: "terracotta",
        name: "Terracota",
        hex: "#C97B3E",
        family: "Cerâmica",
        usage: "Ladrilhos sem esmalte e vasos que levam calor de um ambiente ao outro.",
      },
      {
        id: "brass",
        name: "Latão Envelhecido",
        hex: "#9A7B4F",
        family: "Metal",
        usage: "Puxadores, arandelas e bordas deixadas para ganhar pátina em um dourado suave.",
      },
    ],
  },
  process: {
    label: "Como trabalhamos",
    title: "Quatro passos sem pressa",
    intro:
      "Um caminho calmo e cuidadoso, da primeira conversa ao dia em que você coloca uma cadeira na luz exatamente onde ela pertence.",
    steps: [
      {
        id: "listen",
        index: "01",
        title: "Ouvir e medir",
        body: "Passamos uma tarde no seu espaço, entendendo como você vive, por onde a luz entra e o que o ambiente já quer ser.",
        duration: "Semana 1",
      },
      {
        id: "concept",
        index: "02",
        title: "Conceito e paleta",
        body: "Você recebe uma direção de atmosfera, uma bandeja de materiais e plantas desenhadas à mão, para a casa falar em uma só voz.",
        duration: "Semanas 2 a 4",
      },
      {
        id: "sourcing",
        index: "03",
        title: "Sourcing e ofício",
        body: "Encomendamos aos artesãos, pedimos os têxteis e coordenamos cada marceneiro e pintor, mantendo a paleta fiel a cada etapa.",
        duration: "Semanas 5 a 9",
      },
      {
        id: "styling",
        index: "04",
        title: "Instalar e ambientar",
        body: "No dia da revelação, posicionamos o último vaso, ajeitamos a última almofada e entregamos uma casa que já parece vivida.",
        duration: "Semanas 10 a 12",
      },
    ],
    durationLabel: "Prazo típico",
  },
  testimonials: {
    label: "Nas palavras deles",
    title: "Casas que mudaram o dia a dia",
    items: [
      {
        id: "mariana",
        quote:
          "O Studio Ambra encontrou no nosso apartamento um calor por que passávamos há anos. Agora a luz e as paredes finalmente concordam.",
        name: "Mariana Costa",
        role: "Moradora",
        project: "Casa Lumen, Lisboa",
      },
      {
        id: "thomas",
        quote:
          "Trataram nossa cozinha pequena como uma caixa de joias. Cada material foi escolhido duas vezes, e isso se sente toda manhã.",
        name: "Thomas Lindqvist",
        role: "Cliente",
        project: "Olive & Ash, Porto",
      },
      {
        id: "aline",
        quote:
          "O processo foi calmo desde a primeira tarde. Nunca nos sentimos vendidos, apenas ouvidos e lindamente respondidos.",
        name: "Aline Ferreira",
        role: "Moradora",
        project: "Dune Suite, Comporta",
      },
    ],
  },
  footer: {
    tagline: "Interiores quentes e sem pressa, moldados ao jeito como você realmente vive.",
    studioLabel: "O estúdio",
    address: ["Rua da Boavista 114", "1200-069 Lisboa, Portugal"],
    hoursLabel: "Horário do estúdio",
    hours: ["Segunda a sexta, 10:00 às 18:00", "Sábado com hora marcada"],
    contactLabel: "Diga olá",
    email: "atelier@studioambra.com",
    phone: "+351 213 972 400",
    linksLabel: "Explorar",
    links: [
      { href: "#portfolio", label: "Portfólio" },
      { href: "#materials", label: "Materiais" },
      { href: "#process", label: "Processo" },
      { href: "#voices", label: "Clientes" },
    ],
    socialLabel: "Acompanhe",
    social: [
      { label: "Diário", handle: "@studioambra" },
      { label: "Notas de campo", handle: "studioambra.com" },
    ],
    rights: "Studio Ambra. Todos os direitos reservados.",
    credit: "Um conceito de design de interiores criado pela VigApp.",
  },
};

/* ------------------------------------------------------------------ */
/* Spanish                                                             */
/* ------------------------------------------------------------------ */

const es: AmbraContent = {
  currency: { locale: "es-ES", code: "EUR" },
  header: {
    nav: [
      { href: "#portfolio", label: "Portafolio" },
      { href: "#transformation", label: "Antes y Después" },
      { href: "#materials", label: "Materiales" },
      { href: "#process", label: "Proceso" },
      { href: "#voices", label: "Clientes" },
    ],
    cta: "Reservar consultoría",
    bookAria: "Reservar una consultoría de diseño de interiores",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
  },
  hero: {
    eyebrow: "Estudio de diseño de interiores, desde 2011",
    titleLead: "Estancias que guardan",
    titleItalic: "la luz",
    titleTail: "y calman el día",
    intro:
      "Studio Ambra da forma a interiores cálidos y sin prisa en lino, arcilla y nogal. Diseñamos cada superficie para tocarla, habitarla y dejar que la suavice el sol de la tarde.",
    ctaPrimary: "Iniciar tu proyecto",
    ctaSecondary: "Ver trabajos recientes",
    imageAlt: "Salón iluminado firmado por Studio Ambra con sofá de lino y hornacina en arco",
    fromLabel: "Diseño de estancia completa desde",
    fromPrice: 2200,
    stats: [
      { value: "140+", label: "Hogares terminados" },
      { value: "13", label: "Años de práctica" },
      { value: "9", label: "Premios de diseño" },
    ],
    scroll: "Desplázate para explorar",
  },
  portfolio: {
    label: "Trabajo seleccionado",
    title: "Un portafolio que filtras por estancia",
    intro:
      "Desde cocinas urbanas compactas hasta dormitorios lentos y soleados, explora los proyectos por el espacio que estás soñando.",
    filters: [
      { id: "all", label: "Todos los espacios" },
      { id: "living", label: "Salón" },
      { id: "kitchen", label: "Cocina" },
      { id: "bedroom", label: "Dormitorio" },
      { id: "office", label: "Estudio y oficina" },
    ],
    projects: [
      {
        id: "casa-lumen",
        room: "living",
        imageId: "photo-1618221195710-dd6b41faaea6",
        title: "Casa Lumen",
        location: "Lisboa, Alfama",
        year: "2025",
        area: "72 m²",
        palette: "Lino, arcilla, roble",
        alt: "Salón con sofá de lino, cojines en terracota y suelo cálido de roble",
      },
      {
        id: "field-house",
        room: "living",
        imageId: "photo-1615873968403-89e068629265",
        title: "Field House",
        location: "Provenza, Francia",
        year: "2024",
        area: "58 m²",
        palette: "Bouclé, yeso, latón",
        alt: "Escena de sofá en bouclé con paredes de yeso y detalles en latón",
      },
      {
        id: "olive-kitchen",
        room: "kitchen",
        imageId: "photo-1600566753086-00f18fb6b3ea",
        title: "Olive & Ash",
        location: "Oporto, Foz",
        year: "2025",
        area: "24 m²",
        palette: "Fresno, oliva, mármol",
        alt: "Cocina cálida con carpintería de fresno, encimera de mármol y tonos oliva",
      },
      {
        id: "north-loft",
        room: "kitchen",
        imageId: "photo-1600607687939-ce8a6c25118c",
        title: "North Loft",
        location: "Milán, Isola",
        year: "2023",
        area: "96 m²",
        palette: "Hormigón, nogal, lino",
        alt: "Interior moderno y abierto con carpintería de nogal y tonos de hormigón",
      },
      {
        id: "dune-suite",
        room: "bedroom",
        imageId: "photo-1600210492486-724fe5c67fb0",
        title: "Dune Suite",
        location: "Comporta, Portugal",
        year: "2024",
        area: "31 m²",
        palette: "Arena, arcilla, lino",
        alt: "Dormitorio sereno en tonos arena y arcilla con ropa de cama de lino",
      },
      {
        id: "linen-retreat",
        room: "bedroom",
        imageId: "photo-1567016432779-094069958ea5",
        title: "Linen Retreat",
        location: "Toscana, Italia",
        year: "2025",
        area: "27 m²",
        palette: "Avena, nogal, lana",
        alt: "Detalle de cama hecha con textiles en avena y nogal",
      },
      {
        id: "atelier-nove",
        room: "office",
        imageId: "photo-1586023492125-27b2c045efd7",
        title: "Atelier Nove",
        location: "Barcelona, Gràcia",
        year: "2024",
        area: "19 m²",
        palette: "Coñac, corcho, latón",
        alt: "Rincón de estudio en casa con sillón de cuero coñac y lámpara de latón",
      },
      {
        id: "reading-room",
        room: "office",
        imageId: "photo-1616486338812-3dadae4b4ace",
        title: "The Reading Room",
        location: "Copenhague, Vesterbro",
        year: "2023",
        area: "16 m²",
        palette: "Yeso, terracota, roble",
        alt: "Detalle de decoración con objetos de terracota sobre superficie de roble",
      },
    ],
    empty: "Aún no hay proyectos en esta estancia. Prueba otro espacio.",
    metaArea: "Superficie",
    metaYear: "Año",
    countLabel: "proyectos",
  },
  beforeAfter: {
    label: "La transformación",
    title: "Arrastra para ver la estancia cobrar vida",
    intro:
      "Un alquiler cansado en el barrio del Chiado, reconvertido en un hogar cálido que respira. Tira del control para pasar del casco vacío al espacio terminado.",
    imageId: "photo-1600607687939-ce8a6c25118c",
    beforeLabel: "Antes",
    afterLabel: "Después",
    hint: "Arrastra el control",
    caption: "Casa Vento — una reforma integral entregada en once semanas.",
    project: "Casa Vento, Chiado",
    beforeAlt: "El piso antes de la reforma, desnudo y de tonos fríos",
    afterAlt: "El mismo piso tras la reforma, cálido y totalmente decorado",
    ariaSlider: "Control de comparación entre antes y después",
  },
  materials: {
    label: "La paleta de materiales",
    title: "Superficies elegidas para tocarse",
    intro:
      "Cada proyecto de Studio Ambra empieza con una bandeja de muestras. Pasa el cursor sobre una muestra para ver dónde encuentra su lugar cada material.",
    hint: "Pasa el cursor para ver su historia",
    usageLabel: "Dónde lo usamos",
    swatches: [
      {
        id: "linen",
        name: "Lino Lavado",
        hex: "#D8C7AE",
        family: "Textil",
        usage: "Fundas holgadas, cortinas en capas y ropa de cama que se suaviza en cada lavado.",
      },
      {
        id: "clay",
        name: "Arcilla Quemada",
        hex: "#B4560F",
        family: "Estuco",
        usage: "Paredes de acento a la cal y hornacinas en arco que brillan con la luz baja del atardecer.",
      },
      {
        id: "walnut",
        name: "Nogal Aceitado",
        hex: "#5C4433",
        family: "Madera",
        usage: "Carpintería, estanterías y marcos, aceitados a mano para mantener una veta abierta y táctil.",
      },
      {
        id: "oat",
        name: "Bouclé Avena",
        hex: "#E4DAC6",
        family: "Tapicería",
        usage: "Sillones de lectura y cabeceros donde el ojo descansa y la mano quiere quedarse.",
      },
      {
        id: "terracotta",
        name: "Terracota",
        hex: "#C97B3E",
        family: "Cerámica",
        usage: "Baldosas sin esmaltar y vasijas que llevan el calor de una estancia a otra.",
      },
      {
        id: "brass",
        name: "Latón Envejecido",
        hex: "#9A7B4F",
        family: "Metal",
        usage: "Tiradores, apliques y cantos que se dejan patinar despacio hacia un oro suave y vivo.",
      },
    ],
  },
  process: {
    label: "Cómo trabajamos",
    title: "Cuatro pasos sin prisa",
    intro:
      "Un camino sereno y meditado, desde la primera conversación hasta el día en que colocas una silla en la luz justo donde pertenece.",
    steps: [
      {
        id: "listen",
        index: "01",
        title: "Escuchar y medir",
        body: "Pasamos una tarde en tu espacio, aprendiendo cómo vives, por dónde cae la luz y qué quiere ser ya la estancia.",
        duration: "Semana 1",
      },
      {
        id: "concept",
        index: "02",
        title: "Concepto y paleta",
        body: "Recibes una dirección de atmósfera, una bandeja de materiales y planos dibujados a mano, para que el hogar hable con una sola voz.",
        duration: "Semanas 2 a 4",
      },
      {
        id: "sourcing",
        index: "03",
        title: "Sourcing y oficio",
        body: "Encargamos a los artesanos, pedimos los textiles y coordinamos a cada carpintero y pintor, manteniendo la paleta honesta en cada paso.",
        duration: "Semanas 5 a 9",
      },
      {
        id: "styling",
        index: "04",
        title: "Instalar y ambientar",
        body: "El día de la entrega colocamos el último jarrón, ahuecamos el último cojín y te damos un hogar que ya se siente vivido.",
        duration: "Semanas 10 a 12",
      },
    ],
    durationLabel: "Plazo habitual",
  },
  testimonials: {
    label: "En sus palabras",
    title: "Hogares que cambiaron lo cotidiano",
    items: [
      {
        id: "mariana",
        quote:
          "Studio Ambra encontró en nuestro piso una calidez que llevábamos años pasando de largo. Ahora la luz y las paredes por fin coinciden.",
        name: "Mariana Costa",
        role: "Propietaria",
        project: "Casa Lumen, Lisboa",
      },
      {
        id: "thomas",
        quote:
          "Trataron nuestra cocina pequeña como un joyero. Cada material se eligió dos veces, y se nota cada mañana.",
        name: "Thomas Lindqvist",
        role: "Cliente",
        project: "Olive & Ash, Oporto",
      },
      {
        id: "aline",
        quote:
          "El proceso fue tranquilo desde la primera tarde. Nunca nos sentimos vendidos, solo escuchados y bellamente respondidos.",
        name: "Aline Ferreira",
        role: "Propietaria",
        project: "Dune Suite, Comporta",
      },
    ],
  },
  footer: {
    tagline: "Interiores cálidos y sin prisa, moldeados en torno a cómo vives de verdad.",
    studioLabel: "El estudio",
    address: ["Rua da Boavista 114", "1200-069 Lisboa, Portugal"],
    hoursLabel: "Horario del estudio",
    hours: ["De lunes a viernes, 10:00 a 18:00", "Sábado con cita previa"],
    contactLabel: "Saluda",
    email: "atelier@studioambra.com",
    phone: "+351 213 972 400",
    linksLabel: "Explorar",
    links: [
      { href: "#portfolio", label: "Portafolio" },
      { href: "#materials", label: "Materiales" },
      { href: "#process", label: "Proceso" },
      { href: "#voices", label: "Clientes" },
    ],
    socialLabel: "Síguenos",
    social: [
      { label: "Diario", handle: "@studioambra" },
      { label: "Notas de campo", handle: "studioambra.com" },
    ],
    rights: "Studio Ambra. Todos los derechos reservados.",
    credit: "Un concepto de diseño de interiores creado por VigApp.",
  },
};

export const ambraDict: DemoDictionary<AmbraContent> = { en, pt, es };
