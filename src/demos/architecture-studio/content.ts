import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Shared, locale-independent data (photos, videos, 3D models, ids)    */
/* ------------------------------------------------------------------ */

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export type ProjectStatus = "delivered" | "onSite";

export interface ProjectSeed {
  id: string;
  num: string;
  area: number;
  year: string;
  status: ProjectStatus;
  photo: string;
  extras: [string, string];
}

/** Five flagship houses. All photography is color, verified 200 OK. */
export const PROJECTS: ProjectSeed[] = [
  {
    id: "mirante",
    num: "01",
    area: 340,
    year: "2024",
    status: "delivered",
    photo: img("photo-1767950470198-c9cd97f8ed87", 1800),
    extras: [img("photo-1781328487854-07a1600ab0a8"), img("photo-1762545078318-8443881c2d83")],
  },
  {
    id: "patio",
    num: "02",
    area: 280,
    year: "2023",
    status: "delivered",
    photo: img("photo-1758448756207-54505680d130", 1800),
    extras: [img("photo-1783315943625-6c00dc4b265b"), img("photo-1760624493013-8a7436f343a5")],
  },
  {
    id: "serra",
    num: "03",
    area: 420,
    year: "2025",
    status: "onSite",
    photo: img("photo-1756706718604-ef4af3970e33", 1800),
    extras: [img("photo-1768833684010-e2bfbcb57eec"), img("photo-1774516534049-b5b61d2275d8")],
  },
  {
    id: "vale",
    num: "04",
    area: 380,
    year: "2022",
    status: "delivered",
    photo: img("photo-1542314831-068cd1dbfeeb", 1800),
    extras: [img("photo-1707190205120-228c6656086c"), img("photo-1544984243-ec57ea16fe25")],
  },
  {
    id: "horizonte",
    num: "05",
    area: 310,
    year: "2025",
    status: "delivered",
    photo: img("photo-1760067538022-8ef8739b1b18", 1800),
    extras: [img("photo-1760067538559-49b2bfb5f42a"), img("photo-1760067537620-6aaab015fba5")],
  },
];

/** Direct-file stock loops (Pexels CDN), each verified 200 / video/mp4. */
export const VIDEOS = {
  hero: {
    src: "https://videos.pexels.com/video-files/37028650/15687688_1280_720_60fps.mp4",
    poster: img("photo-1760067537265-dc9f11824eda", 1800),
  },
  tour: {
    src: "https://videos.pexels.com/video-files/7578547/7578547-hd_1280_720_30fps.mp4",
    poster: img("photo-1768413292179-d958b344f1d4", 1800),
  },
} as const;

export type SpaceId = "living" | "dining" | "bath";

export interface SpaceSeed {
  id: SpaceId;
  uid: string;
  thumb: string;
  credit: { model: string; author: string };
}

/** CC-BY interior scenes served by the official Sketchfab viewer. */
export const SPACES_3D: SpaceSeed[] = [
  {
    id: "living",
    uid: "afb8cb0cbee1488caf61471ef14041e9",
    thumb:
      "https://media.sketchfab.com/models/afb8cb0cbee1488caf61471ef14041e9/thumbnails/bf3165db89564e58a35626c6e7d70a7f/453ee2cf4d2549bd94d493e774f5aea1.jpeg",
    credit: { model: "White Modern Living Room", author: "dylanheyes" },
  },
  {
    id: "dining",
    uid: "df3f3c9f6233447eb8b7ee129f3bace5",
    thumb:
      "https://media.sketchfab.com/models/df3f3c9f6233447eb8b7ee129f3bace5/thumbnails/b7916b9f24fa46c29dd9eae8494b0524/1b9fd78d91f94f8989191bc64fc767dc.jpeg",
    credit: { model: "Modern Dining Room", author: "dylanheyes" },
  },
  {
    id: "bath",
    uid: "9ba7e0a094694335bd8f4656611c0676",
    thumb:
      "https://media.sketchfab.com/models/9ba7e0a094694335bd8f4656611c0676/thumbnails/82fd335d3c2749aebdb02c0d93973a88/b564bee78b5c412c9a26b6f78f6aa190.jpeg",
    credit: { model: "Modern Bathroom", author: "dylanheyes" },
  },
];

export const STUDIO_IMAGES = {
  portrait: img("photo-1614010966237-74489a16848b", 1200),
  gallery: [
    img("photo-1772442198907-765685249ea4", 900),
    img("photo-1624066969616-69b0b0301d4d", 900),
    img("photo-1653164494885-a8526f62678c", 900),
  ],
} as const;

export const BRONZE = "#8C6A4A";
export const WHATSAPP_DISPLAY = "+55 19 99123-4567";
export const INSTAGRAM_HANDLE = "@prumo.arq";
export const CAU_REGISTER = "CAU A123456-7";
export const ADDRESS_LINES = ["Rua Coronel Quirino, 1240 — Cambuí", "Campinas · SP — 13025-002"];

/* ------------------------------------------------------------------ */
/* Content shape                                                       */
/* ------------------------------------------------------------------ */

export interface NavLink {
  href: string;
  label: string;
}

export interface ProjectCopy {
  id: string;
  name: string;
  city: string;
  blurb: string;
  concept: string;
  quote: string;
  owner: string;
  mainAlt: string;
  extraAlts: [string, string];
}

export interface SpaceCopy {
  id: SpaceId;
  tab: string;
  name: string;
  blurb: string;
}

export interface ProcessStep {
  num: string;
  name: string;
  duration: string;
  body: string;
  deliverables: string[];
}

export interface PrumoContent {
  header: {
    navAria: string;
    nav: NavLink[];
    cta: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    eyebrow: string;
    titleLead: string;
    titleItalic: string;
    titleTail: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: { value: string; label: string }[];
    videoAria: string;
    posterAlt: string;
    scrollHint: string;
  };
  projects: {
    label: string;
    titleLead: string;
    titleItalic: string;
    intro: string;
    statusLabels: Record<ProjectStatus, string>;
    areaUnit: string;
    openLabel: string;
    closeLabel: string;
    conceptLabel: string;
    ownerLabel: string;
    items: ProjectCopy[];
  };
  spaces: {
    label: string;
    titleLead: string;
    titleItalic: string;
    intro: string;
    body: string;
    bullets: string[];
    loadLabel: string;
    hint: string;
    note: string;
    tabsAria: string;
    items: SpaceCopy[];
  };
  process: {
    label: string;
    titleLead: string;
    titleItalic: string;
    intro: string;
    durationLabel: string;
    deliverablesLabel: string;
    steps: ProcessStep[];
    note: string;
  };
  tour: {
    label: string;
    titleLead: string;
    titleItalic: string;
    intro: string;
    playLabel: string;
    pauseLabel: string;
    videoAria: string;
    caption: string;
  };
  studio: {
    label: string;
    titleLead: string;
    titleItalic: string;
    name: string;
    role: string;
    portraitAlt: string;
    bio: string[];
    facts: { value: string; label: string }[];
    awardsLabel: string;
    awards: { year: string; title: string }[];
    galleryAlts: string[];
  };
  testimonials: {
    label: string;
    titleLead: string;
    titleItalic: string;
    items: { quote: string; name: string; project: string }[];
  };
  contact: {
    label: string;
    titleLead: string;
    titleItalic: string;
    intro: string;
    form: {
      aria: string;
      name: string;
      namePlaceholder: string;
      city: string;
      cityPlaceholder: string;
      whatsapp: string;
      whatsappPlaceholder: string;
      moment: string;
      momentOptions: string[];
      submit: string;
      successTitle: string;
      successBody: string;
      reset: string;
    };
    addressLabel: string;
    whatsappLabel: string;
    instagramLabel: string;
    responseNote: string;
  };
  footer: {
    tagline: string;
    navAria: string;
    fictionalNote: string;
    credits: string;
    backToTop: string;
  };
}

/* ------------------------------------------------------------------ */
/* English (structural fallback)                                       */
/* ------------------------------------------------------------------ */

const en: PrumoContent = {
  header: {
    navAria: "Main navigation",
    nav: [
      { href: "#projetos", label: "Projects" },
      { href: "#ambientes", label: "3D Spaces" },
      { href: "#processo", label: "Process" },
      { href: "#escritorio", label: "Studio" },
      { href: "#contato", label: "Contact" },
    ],
    cta: "Request a quote",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    eyebrow: "Prumo Arquitetura — Campinas, Brazil",
    titleLead: "Houses that raise the value of",
    titleItalic: "your land",
    titleTail: "— and of your patrimony.",
    sub: "High-end residential architecture with a realistic budget, deadlines that hold and construction supervision from the first sketch to the keys.",
    ctaPrimary: "Request a quote",
    ctaSecondary: "See the houses",
    stats: [
      { value: "52", label: "houses delivered" },
      { value: "15", label: "years of residential work" },
      { value: "9", label: "cities across São Paulo" },
    ],
    videoAria: "Looping video of a modern house designed by the studio",
    posterAlt: "Modern house with wood and stone facade at dusk",
    scrollHint: "Scroll",
  },
  projects: {
    label: "Selected work",
    titleLead: "Five houses,",
    titleItalic: "five sites",
    intro:
      "Every lot asks a different question. These are the answers we are proudest of — built on hillsides, courtyards and shorelines across the state of São Paulo.",
    statusLabels: { delivered: "Delivered", onSite: "On site" },
    areaUnit: "m²",
    openLabel: "View project",
    closeLabel: "Close project",
    conceptLabel: "Design concept",
    ownerLabel: "The owners",
    items: [
      {
        id: "mirante",
        name: "Casa Mirante",
        city: "Campos do Jordão · SP",
        blurb: "A hillside house that opens the living room to the valley below.",
        concept:
          "Set on a steep mid-slope lot, the house works as a belvedere: exposed concrete anchors it to the terrain while a glazed social floor floats toward the view. Cumaru wood warms the interiors and a central fireplace organises winter life around it.",
        quote:
          "Henrique understood the terrain better than we did. The house seems to have always been there — and it cost what he said it would cost.",
        owner: "Sarmento family",
        mainAlt: "Modern house with pool at dusk framed by mountains",
        extraAlts: [
          "Living room with floor-to-ceiling glazing facing the forest",
          "Fireplace lounge with panoramic winter view",
        ],
      },
      {
        id: "patio",
        name: "Casa Pátio",
        city: "Campinas · SP",
        blurb: "An introverted house wrapped around a jabuticaba tree courtyard.",
        concept:
          "On a tight urban lot, the house turns its back to the street and opens every room onto a central courtyard. Cross ventilation and zenithal light make air conditioning almost unnecessary — privacy without ever feeling closed.",
        quote:
          "From the street you would never guess. Inside it is all light and garden — our friends refuse to leave.",
        owner: "Marina & Fábio Linhares",
        mainAlt: "Modern house facade with large windows and lush garden",
        extraAlts: [
          "Minimalist concrete courtyard with geometric shadows",
          "Reflecting pool courtyard with a single tree",
        ],
      },
      {
        id: "serra",
        name: "Casa da Serra",
        city: "Serra da Cantareira · SP",
        blurb: "Concrete volumes on pilotis, floating over the forest floor.",
        concept:
          "To preserve the root systems of the native forest, the house touches the ground on just six points. The access walkway crosses through the tree canopy, and every room frames a different stretch of Atlantic forest.",
        quote:
          "We follow every site visit through the 3D model. Watching the slab being poured exactly where we walked virtually is surreal.",
        owner: "Rodrigo Tavares",
        mainAlt: "Concrete and wood house among trees",
        extraAlts: [
          "Interior in exposed concrete and warm wood",
          "Concrete room with full-width window facing the mountains",
        ],
      },
      {
        id: "vale",
        name: "Casa Vale",
        city: "Vinhedo · SP",
        blurb: "A double-height social floor mirrored by a sunset pool.",
        concept:
          "The pool is positioned as a mirror for the sunset, doubling the sky at dusk. Inside, the double-height living room connects the wine cellar, the gourmet terrace and the garden in one continuous social landscape.",
        quote:
          "The golden hour by the pool is the postcard of our life. The house made the lot worth three times what we paid.",
        owner: "Bortolan family",
        mainAlt: "Luxurious pool reflecting the house lights at night",
        extraAlts: ["Modern house and illuminated pool at night", "Pool edge at golden hour"],
      },
      {
        id: "horizonte",
        name: "Casa Horizonte",
        city: "Ubatuba · SP",
        blurb: "A raised timber beach house with deep tropical verandas.",
        concept:
          "Raised above the sand line, the house is a timber frame wrapped in deep verandas. Cross ventilation and generous eaves keep the social floor cool without air conditioning — beach life with gallery-grade detailing.",
        quote:
          "It is the house everyone photographs from the beach. Zero air conditioning downstairs and it is always cool inside.",
        owner: "Letícia & Bruno Sales",
        mainAlt: "Modern timber house among palm trees",
        extraAlts: [
          "Veranda living space with hanging chairs",
          "Living room opening onto tropical vegetation",
        ],
      },
    ],
  },
  spaces: {
    label: "3D spaces",
    titleLead: "Walk into the project",
    titleItalic: "before construction begins.",
    intro: "Interactive rooms, straight from our design workflow",
    body: "Every Prumo client receives the preliminary design as a navigable 3D model — not still renders. You orbit each room, check heights and finishes, and approve the house you will actually live in. Decisions happen on screen, not on the construction site, where they cost ten times more.",
    bullets: [
      "Navigable model delivered at preliminary design stage",
      "Real materials and lighting studied before a single brick",
      "Revisions decided together, on screen, in days — not weeks",
    ],
    loadLabel: "Explore in 3D",
    hint: "Drag to orbit · scroll to zoom",
    note: "Illustrative scenes — CC BY models embedded via the official Sketchfab viewer.",
    tabsAria: "Choose a room to explore",
    items: [
      {
        id: "living",
        tab: "Living",
        name: "Living room",
        blurb:
          "The social heart of the house: double-check sofa clearances, natural light and the TV wall before they exist.",
      },
      {
        id: "dining",
        tab: "Dining",
        name: "Dining room",
        blurb:
          "Test the table for ten, circulation around chairs and pendant heights in real proportion.",
      },
      {
        id: "bath",
        tab: "Bath",
        name: "Master bath",
        blurb:
          "Stone, brass and glazing decisions approved in orbit — no tile surprise on delivery day.",
      },
    ],
  },
  process: {
    label: "Process",
    titleLead: "Four stages,",
    titleItalic: "zero surprises",
    intro:
      "A house is the largest investment most families ever make. Our process keeps budget, schedule and quality visible at every step.",
    durationLabel: "Typical duration",
    deliverablesLabel: "You receive",
    steps: [
      {
        num: "01",
        name: "Briefing & site",
        duration: "2–3 weeks",
        body: "We walk your lot together, study sun, winds and views, and translate how your family lives into a program of needs.",
        deliverables: ["Site & topographic analysis", "Program of needs", "Feasibility & budget range"],
      },
      {
        num: "02",
        name: "Preliminary design",
        duration: "4–6 weeks",
        body: "The house takes shape: floor plans, volumes and the navigable 3D model where every room is approved by you.",
        deliverables: ["Floor plans & sections", "Navigable 3D model", "Construction cost estimate"],
      },
      {
        num: "03",
        name: "Executive project",
        duration: "8–10 weeks",
        body: "Every detail resolved on paper: structure, hydraulics and electrical coordinated so the builder never has to guess.",
        deliverables: [
          "Full construction drawings",
          "Coordinated engineering projects",
          "Specifications & bill of quantities",
        ],
      },
      {
        num: "04",
        name: "Construction supervision",
        duration: "Length of the build",
        body: "Weekly site visits, measurement reviews and a construction diary — until the day we hand you the keys.",
        deliverables: ["Weekly site reports", "Quality & measurement control", "Delivery of keys"],
      },
    ],
    note: "Fixed fee per stage, agreed in contract before we start.",
  },
  tour: {
    label: "Delivered work",
    titleLead: "Tour a",
    titleItalic: "finished house",
    intro:
      "Casa Pátio, two years after delivery. No staging, no wide-angle tricks — the house as the family actually lives in it.",
    playLabel: "Play tour",
    pauseLabel: "Pause tour",
    videoAria: "Video tour through the interior of a delivered house",
    caption: "Casa Pátio · Campinas — delivered 2023",
  },
  studio: {
    label: "The studio",
    titleLead: "An architect who",
    titleItalic: "stays on site.",
    name: "Henrique Prumo",
    role: "Founder & lead architect",
    portraitAlt: "Portrait of architect Henrique Prumo",
    bio: [
      "Henrique Prumo — architect and urbanist, CAU A123456-7 — has spent fifteen years designing houses across the interior of São Paulo. Before founding Prumo in 2014, he coordinated residential projects in offices in São Paulo and Lisbon.",
      "The studio takes on a maximum of eight houses per year. That limit is the method: every project gets the founder on the drawing board and on the scaffolding, every week, until the keys change hands.",
    ],
    facts: [
      { value: "52", label: "houses delivered" },
      { value: "8", label: "projects per year, max" },
      { value: "100%", label: "with construction supervision" },
    ],
    awardsLabel: "Recognition",
    awards: [
      { year: "2023", title: "Paulista Architecture Yearbook — Casa Vale, featured project" },
      { year: "2021", title: "Habitar Brasil Award — residential finalist, Casa Pátio" },
      { year: "2019", title: "IAB-SP Exhibition — emerging practice selection" },
    ],
    galleryAlts: [
      "Architect working on a physical study model",
      "White architectural scale model of a house",
      "Study model resting on sketchbooks",
    ],
  },
  testimonials: {
    label: "Owners speak",
    titleLead: "Word of those",
    titleItalic: "living inside",
    items: [
      {
        quote:
          "We interviewed three offices. Prumo was the only one that talked about budget before talking about style. The house came out beautiful — and inside the number.",
        name: "Marina Linhares",
        project: "Casa Pátio · Campinas",
      },
      {
        quote:
          "The 3D model settled every argument we had about the kitchen in one evening. What we approved on screen is exactly what was built.",
        name: "Rodrigo Tavares",
        project: "Casa da Serra · Cantareira",
      },
      {
        quote:
          "Henrique visited the site every week for fourteen months. Our builder says he never delivered a house with so few reworks.",
        name: "Paulo Bortolan",
        project: "Casa Vale · Vinhedo",
      },
    ],
  },
  contact: {
    label: "Contact",
    titleLead: "Let's talk about",
    titleItalic: "your land.",
    intro: "Tell us where the house will live. Henrique replies personally within one business day.",
    form: {
      aria: "Quote request form",
      name: "Your name",
      namePlaceholder: "Full name",
      city: "City of the lot",
      cityPlaceholder: "e.g. Campinas, Vinhedo, Ubatuba…",
      whatsapp: "WhatsApp",
      whatsappPlaceholder: "+55 (19) 9…",
      moment: "Project stage",
      momentOptions: [
        "Still looking for a lot",
        "Lot purchased, need the project",
        "Project in hand, need supervision",
        "Just researching",
      ],
      submit: "Request quote",
      successTitle: "Received!",
      successBody:
        "Henrique will reach out on WhatsApp within one business day. Meanwhile, follow the site diaries on Instagram.",
      reset: "Send another request",
    },
    addressLabel: "Studio",
    whatsappLabel: "WhatsApp",
    instagramLabel: "Instagram",
    responseNote: "Response within 1 business day",
  },
  footer: {
    tagline: "High-end residential architecture — Campinas · SP",
    navAria: "Footer navigation",
    fictionalNote: "Prumo Arquitetura is a fictional concept created by VigApp.",
    credits: "Photos: Unsplash · Video: Pexels · 3D models: Sketchfab (CC BY)",
    backToTop: "Back to top",
  },
};

/* ------------------------------------------------------------------ */
/* Português (voz nativa do escritório)                                */
/* ------------------------------------------------------------------ */

const pt: PrumoContent = {
  header: {
    navAria: "Navegação principal",
    nav: [
      { href: "#projetos", label: "Projetos" },
      { href: "#ambientes", label: "Ambientes 3D" },
      { href: "#processo", label: "Processo" },
      { href: "#escritorio", label: "Escritório" },
      { href: "#contato", label: "Contato" },
    ],
    cta: "Pedir orçamento",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
  },
  hero: {
    eyebrow: "Prumo Arquitetura — Campinas, SP",
    titleLead: "Casas que valorizam",
    titleItalic: "o seu terreno",
    titleTail: "— e o seu patrimônio.",
    sub: "Arquitetura residencial de alto padrão com orçamento realista, prazo cumprido e acompanhamento de obra do primeiro risco à entrega das chaves.",
    ctaPrimary: "Pedir orçamento",
    ctaSecondary: "Ver as casas",
    stats: [
      { value: "52", label: "casas entregues" },
      { value: "15", label: "anos de residenciais" },
      { value: "9", label: "cidades no estado de SP" },
    ],
    videoAria: "Vídeo em loop de uma casa moderna projetada pelo escritório",
    posterAlt: "Casa moderna com fachada de madeira e pedra ao entardecer",
    scrollHint: "Role",
  },
  projects: {
    label: "Projetos selecionados",
    titleLead: "Cinco casas,",
    titleItalic: "cinco terrenos",
    intro:
      "Cada lote faz uma pergunta diferente. Estas são as respostas de que mais nos orgulhamos — construídas em encostas, pátios e beiras de praia pelo estado de São Paulo.",
    statusLabels: { delivered: "Entregue", onSite: "Em obra" },
    areaUnit: "m²",
    openLabel: "Ver projeto",
    closeLabel: "Fechar projeto",
    conceptLabel: "Partido arquitetônico",
    ownerLabel: "Os proprietários",
    items: [
      {
        id: "mirante",
        name: "Casa Mirante",
        city: "Campos do Jordão · SP",
        blurb: "Uma casa de meia-encosta que abre o estar para o vale.",
        concept:
          "Implantada em lote íngreme de meia-encosta, a casa funciona como um mirante: o concreto aparente a ancora no terreno enquanto o pavimento social, todo envidraçado, flutua na direção da vista. O cumaru aquece os interiores e a lareira central organiza a vida de inverno ao seu redor.",
        quote:
          "O Henrique entendeu o terreno melhor do que nós. A casa parece que sempre esteve ali — e custou o que ele disse que ia custar.",
        owner: "Família Sarmento",
        mainAlt: "Casa moderna com piscina ao entardecer, emoldurada por montanhas",
        extraAlts: [
          "Estar com esquadrias do piso ao teto voltadas para a mata",
          "Sala da lareira com vista panorâmica de inverno",
        ],
      },
      {
        id: "patio",
        name: "Casa Pátio",
        city: "Campinas · SP",
        blurb: "Uma casa introvertida em volta de um pátio com jabuticabeira.",
        concept:
          "Em lote urbano estreito, a casa dá as costas para a rua e abre todos os ambientes para um pátio central. Ventilação cruzada e luz zenital tornam o ar-condicionado quase desnecessário — privacidade sem nunca parecer fechada.",
        quote: "Da rua ninguém imagina. Dentro é só luz e jardim — as visitas se recusam a ir embora.",
        owner: "Marina e Fábio Linhares",
        mainAlt: "Fachada de casa moderna com grandes esquadrias e jardim exuberante",
        extraAlts: [
          "Pátio de concreto minimalista com sombras geométricas",
          "Pátio com espelho d'água e uma única árvore",
        ],
      },
      {
        id: "serra",
        name: "Casa da Serra",
        city: "Serra da Cantareira · SP",
        blurb: "Volumes de concreto sobre pilotis, flutuando sobre a mata.",
        concept:
          "Para preservar as raízes da mata nativa, a casa toca o solo em apenas seis pontos. A passarela de acesso atravessa a copa das árvores e cada ambiente emoldura um trecho diferente de Mata Atlântica.",
        quote:
          "Acompanhamos cada visita de obra pelo modelo 3D. Ver a laje sendo concretada exatamente onde caminhamos virtualmente é surreal.",
        owner: "Rodrigo Tavares",
        mainAlt: "Casa de concreto e madeira entre árvores",
        extraAlts: [
          "Interior em concreto aparente e madeira",
          "Ambiente de concreto com janela em fita voltada para a serra",
        ],
      },
      {
        id: "vale",
        name: "Casa Vale",
        city: "Vinhedo · SP",
        blurb: "Social de pé-direito duplo espelhado por uma piscina de pôr do sol.",
        concept:
          "A piscina foi posicionada como espelho do pôr do sol, dobrando o céu ao entardecer. Dentro, o estar de pé-direito duplo conecta adega, varanda gourmet e jardim numa única paisagem social contínua.",
        quote:
          "A golden hour na beira da piscina é o cartão-postal da nossa vida. A casa fez o lote valer três vezes o que pagamos.",
        owner: "Família Bortolan",
        mainAlt: "Piscina refletindo as luzes da casa à noite",
        extraAlts: ["Casa moderna e piscina iluminada à noite", "Borda da piscina na golden hour"],
      },
      {
        id: "horizonte",
        name: "Casa Horizonte",
        city: "Ubatuba · SP",
        blurb: "Casa de praia elevada, em madeira, com varandas tropicais profundas.",
        concept:
          "Elevada acima da linha da areia, a casa é uma estrutura de madeira envolvida por varandas profundas. Ventilação cruzada e beirais generosos mantêm o social fresco sem ar-condicionado — vida de praia com detalhamento de galeria.",
        quote: "É a casa que todo mundo fotografa da praia. Zero ar-condicionado no térreo e está sempre fresca.",
        owner: "Letícia e Bruno Sales",
        mainAlt: "Casa moderna de madeira entre coqueiros",
        extraAlts: [
          "Varanda de estar com cadeiras de balanço suspensas",
          "Estar aberto para a vegetação tropical",
        ],
      },
    ],
  },
  spaces: {
    label: "Ambientes 3D",
    titleLead: "Entre no projeto",
    titleItalic: "antes de a obra começar.",
    intro: "Ambientes interativos, direto do nosso fluxo de projeto",
    body: "Todo cliente Prumo recebe o anteprojeto como um modelo 3D navegável — não como renders estáticos. Você orbita cada ambiente, confere alturas e acabamentos e aprova a casa em que vai realmente morar. As decisões acontecem na tela, não no canteiro, onde custam dez vezes mais.",
    bullets: [
      "Modelo navegável entregue já no anteprojeto",
      "Materiais e luz reais estudados antes do primeiro tijolo",
      "Revisões decididas juntos, na tela, em dias — não semanas",
    ],
    loadLabel: "Explorar em 3D",
    hint: "Arraste para orbitar · role para zoom",
    note: "Cenas ilustrativas — modelos CC BY incorporados pelo viewer oficial do Sketchfab.",
    tabsAria: "Escolha um ambiente para explorar",
    items: [
      {
        id: "living",
        tab: "Estar",
        name: "Sala de estar",
        blurb:
          "O coração social da casa: confira a circulação do sofá, a luz natural e o painel da TV antes de existirem.",
      },
      {
        id: "dining",
        tab: "Jantar",
        name: "Sala de jantar",
        blurb:
          "Teste a mesa para dez pessoas, o giro das cadeiras e a altura dos pendentes em proporção real.",
      },
      {
        id: "bath",
        tab: "Banho",
        name: "Banho master",
        blurb:
          "Pedra, metais e vidros aprovados em órbita — sem surpresa de revestimento no dia da entrega.",
      },
    ],
  },
  process: {
    label: "Processo",
    titleLead: "Quatro etapas,",
    titleItalic: "zero surpresas",
    intro:
      "Uma casa é o maior investimento da vida da maioria das famílias. Nosso processo mantém orçamento, prazo e qualidade visíveis em todas as etapas.",
    durationLabel: "Prazo típico",
    deliverablesLabel: "Você recebe",
    steps: [
      {
        num: "01",
        name: "Briefing e terreno",
        duration: "2–3 semanas",
        body: "Caminhamos juntos pelo seu lote, estudamos sol, ventos e vistas e traduzimos o jeito da sua família viver em um programa de necessidades.",
        deliverables: [
          "Análise do terreno e topografia",
          "Programa de necessidades",
          "Estudo de viabilidade e faixa de custo",
        ],
      },
      {
        num: "02",
        name: "Anteprojeto",
        duration: "4–6 semanas",
        body: "A casa ganha forma: plantas, volumetria e o modelo 3D navegável em que cada ambiente é aprovado por você.",
        deliverables: ["Plantas e cortes", "Modelo 3D navegável", "Estimativa de custo de obra"],
      },
      {
        num: "03",
        name: "Projeto executivo",
        duration: "8–10 semanas",
        body: "Cada detalhe resolvido no papel: estrutura, hidráulica e elétrica compatibilizadas para o construtor nunca precisar adivinhar.",
        deliverables: [
          "Detalhamento executivo completo",
          "Complementares compatibilizados",
          "Caderno de especificações e planilha orçamentária",
        ],
      },
      {
        num: "04",
        name: "Acompanhamento de obra",
        duration: "Duração da obra",
        body: "Visitas semanais ao canteiro, conferência de medições e diário de obra — até o dia de entregar as chaves.",
        deliverables: ["Relatórios semanais de obra", "Controle de qualidade e medições", "Entrega das chaves"],
      },
    ],
    note: "Honorários fixos por etapa, definidos em contrato antes de começar.",
  },
  tour: {
    label: "Obra entregue",
    titleLead: "Tour por uma",
    titleItalic: "casa pronta",
    intro:
      "Casa Pátio, dois anos depois da entrega. Sem produção, sem truque de grande-angular — a casa como a família vive nela de verdade.",
    playLabel: "Ver o tour",
    pauseLabel: "Pausar o tour",
    videoAria: "Vídeo de tour pelo interior de uma casa entregue",
    caption: "Casa Pátio · Campinas — entregue em 2023",
  },
  studio: {
    label: "O escritório",
    titleLead: "Um arquiteto que",
    titleItalic: "fica na obra.",
    name: "Henrique Prumo",
    role: "Fundador e arquiteto titular",
    portraitAlt: "Retrato do arquiteto Henrique Prumo",
    bio: [
      "Henrique Prumo — arquiteto e urbanista, CAU A123456-7 — projeta casas pelo interior de São Paulo há quinze anos. Antes de fundar a Prumo, em 2014, coordenou projetos residenciais em escritórios de São Paulo e Lisboa.",
      "O escritório assume no máximo oito casas por ano. Esse limite é o método: todo projeto tem o titular na prancheta e no andaime, toda semana, até as chaves mudarem de mão.",
    ],
    facts: [
      { value: "52", label: "casas entregues" },
      { value: "8", label: "projetos por ano, no máximo" },
      { value: "100%", label: "com acompanhamento de obra" },
    ],
    awardsLabel: "Reconhecimento",
    awards: [
      { year: "2023", title: "Anuário de Arquitetura Paulista — Casa Vale, projeto destaque" },
      { year: "2021", title: "Prêmio Habitar Brasil — finalista residencial, Casa Pátio" },
      { year: "2019", title: "Mostra IAB-SP — seleção de escritórios emergentes" },
    ],
    galleryAlts: [
      "Arquiteto trabalhando em maquete física de estudo",
      "Maquete branca de uma casa em escala",
      "Maquete de estudo apoiada sobre cadernos de esboço",
    ],
  },
  testimonials: {
    label: "Quem mora aprova",
    titleLead: "A palavra de quem",
    titleItalic: "vive lá dentro",
    items: [
      {
        quote:
          "Entrevistamos três escritórios. A Prumo foi a única que falou de orçamento antes de falar de estilo. A casa saiu linda — e dentro do número.",
        name: "Marina Linhares",
        project: "Casa Pátio · Campinas",
      },
      {
        quote:
          "O modelo 3D resolveu numa noite todas as discussões que tivemos sobre a cozinha. O que aprovamos na tela é exatamente o que foi construído.",
        name: "Rodrigo Tavares",
        project: "Casa da Serra · Cantareira",
      },
      {
        quote:
          "O Henrique visitou a obra toda semana por catorze meses. Nosso construtor diz que nunca entregou uma casa com tão pouco retrabalho.",
        name: "Paulo Bortolan",
        project: "Casa Vale · Vinhedo",
      },
    ],
  },
  contact: {
    label: "Contato",
    titleLead: "Vamos conversar sobre",
    titleItalic: "o seu terreno.",
    intro: "Conte onde a casa vai viver. O Henrique responde pessoalmente em até um dia útil.",
    form: {
      aria: "Formulário de pedido de orçamento",
      name: "Seu nome",
      namePlaceholder: "Nome completo",
      city: "Cidade do terreno",
      cityPlaceholder: "ex.: Campinas, Vinhedo, Ubatuba…",
      whatsapp: "WhatsApp",
      whatsappPlaceholder: "+55 (19) 9…",
      moment: "Momento do projeto",
      momentOptions: [
        "Ainda procurando terreno",
        "Terreno comprado, preciso do projeto",
        "Projeto em mãos, preciso de acompanhamento",
        "Só pesquisando",
      ],
      submit: "Pedir orçamento",
      successTitle: "Recebido!",
      successBody:
        "O Henrique chama no seu WhatsApp em até um dia útil. Enquanto isso, acompanhe os diários de obra no Instagram.",
      reset: "Enviar outro pedido",
    },
    addressLabel: "Escritório",
    whatsappLabel: "WhatsApp",
    instagramLabel: "Instagram",
    responseNote: "Resposta em até 1 dia útil",
  },
  footer: {
    tagline: "Arquitetura residencial de alto padrão — Campinas · SP",
    navAria: "Navegação do rodapé",
    fictionalNote: "Prumo Arquitetura é um conceito fictício criado pela VigApp.",
    credits: "Fotos: Unsplash · Vídeos: Pexels · Modelos 3D: Sketchfab (CC BY)",
    backToTop: "Voltar ao topo",
  },
};

/* ------------------------------------------------------------------ */
/* Español                                                             */
/* ------------------------------------------------------------------ */

const es: PrumoContent = {
  header: {
    navAria: "Navegación principal",
    nav: [
      { href: "#projetos", label: "Proyectos" },
      { href: "#ambientes", label: "Espacios 3D" },
      { href: "#processo", label: "Proceso" },
      { href: "#escritorio", label: "Estudio" },
      { href: "#contato", label: "Contacto" },
    ],
    cta: "Pedir presupuesto",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  hero: {
    eyebrow: "Prumo Arquitetura — Campinas, Brasil",
    titleLead: "Casas que valorizan",
    titleItalic: "tu terreno",
    titleTail: "— y tu patrimonio.",
    sub: "Arquitectura residencial de alto nivel con presupuesto realista, plazos cumplidos y supervisión de obra desde el primer trazo hasta la entrega de llaves.",
    ctaPrimary: "Pedir presupuesto",
    ctaSecondary: "Ver las casas",
    stats: [
      { value: "52", label: "casas entregadas" },
      { value: "15", label: "años de residencial" },
      { value: "9", label: "ciudades en São Paulo" },
    ],
    videoAria: "Video en bucle de una casa moderna proyectada por el estudio",
    posterAlt: "Casa moderna con fachada de madera y piedra al atardecer",
    scrollHint: "Desliza",
  },
  projects: {
    label: "Proyectos seleccionados",
    titleLead: "Cinco casas,",
    titleItalic: "cinco terrenos",
    intro:
      "Cada lote plantea una pregunta distinta. Estas son las respuestas que más nos enorgullecen — construidas en laderas, patios y orillas del estado de São Paulo.",
    statusLabels: { delivered: "Entregada", onSite: "En obra" },
    areaUnit: "m²",
    openLabel: "Ver proyecto",
    closeLabel: "Cerrar proyecto",
    conceptLabel: "Partido arquitectónico",
    ownerLabel: "Los propietarios",
    items: [
      {
        id: "mirante",
        name: "Casa Mirante",
        city: "Campos do Jordão · SP",
        blurb: "Una casa en ladera que abre el estar hacia el valle.",
        concept:
          "Implantada en un lote empinado de media ladera, la casa funciona como un mirador: el hormigón visto la ancla al terreno mientras la planta social, toda acristalada, flota hacia la vista. La madera de cumaru calienta los interiores y la chimenea central organiza la vida de invierno a su alrededor.",
        quote:
          "Henrique entendió el terreno mejor que nosotros. La casa parece haber estado siempre allí — y costó lo que él dijo que costaría.",
        owner: "Familia Sarmento",
        mainAlt: "Casa moderna con piscina al atardecer, enmarcada por montañas",
        extraAlts: [
          "Estar con ventanales de piso a techo hacia el bosque",
          "Sala de chimenea con vista panorámica de invierno",
        ],
      },
      {
        id: "patio",
        name: "Casa Pátio",
        city: "Campinas · SP",
        blurb: "Una casa introvertida alrededor de un patio con jabuticaba.",
        concept:
          "En un lote urbano estrecho, la casa da la espalda a la calle y abre todos los ambientes hacia un patio central. La ventilación cruzada y la luz cenital hacen casi innecesario el aire acondicionado — privacidad sin sentirse nunca cerrada.",
        quote: "Desde la calle nadie lo imagina. Adentro es pura luz y jardín — las visitas se niegan a irse.",
        owner: "Marina y Fábio Linhares",
        mainAlt: "Fachada de casa moderna con grandes ventanales y jardín exuberante",
        extraAlts: [
          "Patio de hormigón minimalista con sombras geométricas",
          "Patio con espejo de agua y un único árbol",
        ],
      },
      {
        id: "serra",
        name: "Casa da Serra",
        city: "Serra da Cantareira · SP",
        blurb: "Volúmenes de hormigón sobre pilotes, flotando sobre el bosque.",
        concept:
          "Para preservar las raíces del bosque nativo, la casa toca el suelo en solo seis puntos. La pasarela de acceso cruza la copa de los árboles y cada ambiente enmarca un tramo distinto de Mata Atlántica.",
        quote:
          "Seguimos cada visita de obra por el modelo 3D. Ver la losa hormigonada exactamente donde caminamos virtualmente es surreal.",
        owner: "Rodrigo Tavares",
        mainAlt: "Casa de hormigón y madera entre árboles",
        extraAlts: [
          "Interior en hormigón visto y madera cálida",
          "Ambiente de hormigón con ventanal corrido hacia la sierra",
        ],
      },
      {
        id: "vale",
        name: "Casa Vale",
        city: "Vinhedo · SP",
        blurb: "Social a doble altura reflejado por una piscina del atardecer.",
        concept:
          "La piscina se posicionó como espejo del atardecer, duplicando el cielo al caer la tarde. Adentro, el estar a doble altura conecta cava, terraza gourmet y jardín en un único paisaje social continuo.",
        quote:
          "La golden hour junto a la piscina es la postal de nuestra vida. La casa hizo que el lote valga tres veces lo que pagamos.",
        owner: "Familia Bortolan",
        mainAlt: "Piscina reflejando las luces de la casa por la noche",
        extraAlts: ["Casa moderna y piscina iluminada de noche", "Borde de la piscina en la golden hour"],
      },
      {
        id: "horizonte",
        name: "Casa Horizonte",
        city: "Ubatuba · SP",
        blurb: "Casa de playa elevada, en madera, con galerías tropicales profundas.",
        concept:
          "Elevada sobre la línea de arena, la casa es una estructura de madera envuelta en galerías profundas. La ventilación cruzada y los aleros generosos mantienen fresco el social sin aire acondicionado — vida de playa con detalle de galería.",
        quote: "Es la casa que todos fotografían desde la playa. Cero aire acondicionado abajo y siempre está fresca.",
        owner: "Letícia y Bruno Sales",
        mainAlt: "Casa moderna de madera entre palmeras",
        extraAlts: ["Galería de estar con sillas colgantes", "Estar abierto a la vegetación tropical"],
      },
    ],
  },
  spaces: {
    label: "Espacios 3D",
    titleLead: "Entra al proyecto",
    titleItalic: "antes de que empiece la obra.",
    intro: "Ambientes interactivos, directo de nuestro flujo de proyecto",
    body: "Todo cliente Prumo recibe el anteproyecto como un modelo 3D navegable — no como renders estáticos. Orbitas cada ambiente, verificas alturas y acabados y apruebas la casa en la que realmente vas a vivir. Las decisiones ocurren en pantalla, no en la obra, donde cuestan diez veces más.",
    bullets: [
      "Modelo navegable entregado ya en el anteproyecto",
      "Materiales y luz reales estudiados antes del primer ladrillo",
      "Revisiones decididas juntos, en pantalla, en días — no semanas",
    ],
    loadLabel: "Explorar en 3D",
    hint: "Arrastra para orbitar · rueda para zoom",
    note: "Escenas ilustrativas — modelos CC BY incrustados con el visor oficial de Sketchfab.",
    tabsAria: "Elige un ambiente para explorar",
    items: [
      {
        id: "living",
        tab: "Estar",
        name: "Sala de estar",
        blurb:
          "El corazón social de la casa: verifica circulaciones, luz natural y el panel del TV antes de que existan.",
      },
      {
        id: "dining",
        tab: "Comedor",
        name: "Comedor",
        blurb:
          "Prueba la mesa para diez, el giro de las sillas y la altura de las lámparas en proporción real.",
      },
      {
        id: "bath",
        tab: "Baño",
        name: "Baño principal",
        blurb:
          "Piedra, grifería y cristales aprobados en órbita — sin sorpresas de revestimiento el día de la entrega.",
      },
    ],
  },
  process: {
    label: "Proceso",
    titleLead: "Cuatro etapas,",
    titleItalic: "cero sorpresas",
    intro:
      "Una casa es la mayor inversión en la vida de la mayoría de las familias. Nuestro proceso mantiene presupuesto, plazo y calidad visibles en cada etapa.",
    durationLabel: "Plazo típico",
    deliverablesLabel: "Recibes",
    steps: [
      {
        num: "01",
        name: "Briefing y terreno",
        duration: "2–3 semanas",
        body: "Recorremos juntos tu lote, estudiamos sol, vientos y vistas y traducimos cómo vive tu familia en un programa de necesidades.",
        deliverables: [
          "Análisis del terreno y topografía",
          "Programa de necesidades",
          "Estudio de viabilidad y rango de costo",
        ],
      },
      {
        num: "02",
        name: "Anteproyecto",
        duration: "4–6 semanas",
        body: "La casa toma forma: plantas, volumetría y el modelo 3D navegable donde apruebas cada ambiente.",
        deliverables: ["Plantas y cortes", "Modelo 3D navegable", "Estimación de costo de obra"],
      },
      {
        num: "03",
        name: "Proyecto ejecutivo",
        duration: "8–10 semanas",
        body: "Cada detalle resuelto en papel: estructura, hidráulica y eléctrica coordinadas para que el constructor nunca tenga que adivinar.",
        deliverables: [
          "Documentación ejecutiva completa",
          "Ingenierías coordinadas",
          "Especificaciones y cómputo presupuestario",
        ],
      },
      {
        num: "04",
        name: "Supervisión de obra",
        duration: "Duración de la obra",
        body: "Visitas semanales a la obra, control de mediciones y diario de obra — hasta el día de entregar las llaves.",
        deliverables: ["Informes semanales de obra", "Control de calidad y mediciones", "Entrega de llaves"],
      },
    ],
    note: "Honorarios fijos por etapa, definidos en contrato antes de empezar.",
  },
  tour: {
    label: "Obra entregada",
    titleLead: "Tour por una",
    titleItalic: "casa terminada",
    intro:
      "Casa Pátio, dos años después de la entrega. Sin producción ni trucos de gran angular — la casa tal como la familia la vive.",
    playLabel: "Ver el tour",
    pauseLabel: "Pausar el tour",
    videoAria: "Video de recorrido por el interior de una casa entregada",
    caption: "Casa Pátio · Campinas — entregada en 2023",
  },
  studio: {
    label: "El estudio",
    titleLead: "Un arquitecto que",
    titleItalic: "se queda en la obra.",
    name: "Henrique Prumo",
    role: "Fundador y arquitecto titular",
    portraitAlt: "Retrato del arquitecto Henrique Prumo",
    bio: [
      "Henrique Prumo — arquitecto y urbanista, CAU A123456-7 — proyecta casas por el interior de São Paulo desde hace quince años. Antes de fundar Prumo en 2014, coordinó proyectos residenciales en estudios de São Paulo y Lisboa.",
      "El estudio asume como máximo ocho casas por año. Ese límite es el método: cada proyecto tiene al titular en el tablero y en el andamio, cada semana, hasta que las llaves cambian de mano.",
    ],
    facts: [
      { value: "52", label: "casas entregadas" },
      { value: "8", label: "proyectos por año, máximo" },
      { value: "100%", label: "con supervisión de obra" },
    ],
    awardsLabel: "Reconocimientos",
    awards: [
      { year: "2023", title: "Anuario de Arquitectura Paulista — Casa Vale, proyecto destacado" },
      { year: "2021", title: "Premio Habitar Brasil — finalista residencial, Casa Pátio" },
      { year: "2019", title: "Muestra IAB-SP — selección de estudios emergentes" },
    ],
    galleryAlts: [
      "Arquitecto trabajando en una maqueta física de estudio",
      "Maqueta blanca de una casa a escala",
      "Maqueta de estudio apoyada sobre cuadernos de bocetos",
    ],
  },
  testimonials: {
    label: "Quien vive, aprueba",
    titleLead: "La palabra de quienes",
    titleItalic: "viven adentro",
    items: [
      {
        quote:
          "Entrevistamos a tres estudios. Prumo fue el único que habló de presupuesto antes que de estilo. La casa quedó hermosa — y dentro del número.",
        name: "Marina Linhares",
        project: "Casa Pátio · Campinas",
      },
      {
        quote:
          "El modelo 3D resolvió en una noche todas las discusiones que teníamos sobre la cocina. Lo que aprobamos en pantalla es exactamente lo que se construyó.",
        name: "Rodrigo Tavares",
        project: "Casa da Serra · Cantareira",
      },
      {
        quote:
          "Henrique visitó la obra cada semana durante catorce meses. Nuestro constructor dice que nunca entregó una casa con tan poco retrabajo.",
        name: "Paulo Bortolan",
        project: "Casa Vale · Vinhedo",
      },
    ],
  },
  contact: {
    label: "Contacto",
    titleLead: "Hablemos de",
    titleItalic: "tu terreno.",
    intro: "Cuéntanos dónde vivirá la casa. Henrique responde personalmente en un día hábil.",
    form: {
      aria: "Formulario de pedido de presupuesto",
      name: "Tu nombre",
      namePlaceholder: "Nombre completo",
      city: "Ciudad del terreno",
      cityPlaceholder: "ej.: Campinas, Vinhedo, Ubatuba…",
      whatsapp: "WhatsApp",
      whatsappPlaceholder: "+55 (19) 9…",
      moment: "Momento del proyecto",
      momentOptions: [
        "Todavía buscando terreno",
        "Terreno comprado, necesito el proyecto",
        "Proyecto en mano, necesito supervisión",
        "Solo investigando",
      ],
      submit: "Pedir presupuesto",
      successTitle: "¡Recibido!",
      successBody:
        "Henrique te escribe por WhatsApp en un día hábil. Mientras tanto, sigue los diarios de obra en Instagram.",
      reset: "Enviar otro pedido",
    },
    addressLabel: "Estudio",
    whatsappLabel: "WhatsApp",
    instagramLabel: "Instagram",
    responseNote: "Respuesta en 1 día hábil",
  },
  footer: {
    tagline: "Arquitectura residencial de alto nivel — Campinas · SP",
    navAria: "Navegación del pie de página",
    fictionalNote: "Prumo Arquitetura es un concepto ficticio creado por VigApp.",
    credits: "Fotos: Unsplash · Videos: Pexels · Modelos 3D: Sketchfab (CC BY)",
    backToTop: "Volver arriba",
  },
};

export const prumoDict: DemoDictionary<PrumoContent> = { en, pt, es };
