import type { DemoDictionary } from "@/demos/content";

export function unsplash(id: string, width = 1600): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;
}

export interface ProjectImage {
  id: string;
  alt: string;
}

export interface Project {
  id: string;
  index: string;
  name: string;
  typology: string;
  location: string;
  year: string;
  status: string;
  area: number;
  summary: string;
  image: string;
  imageAlt: string;
  description: string[];
  gallery: ProjectImage[];
}

export interface Award {
  id: string;
  year: string;
  title: string;
  body: string;
  role: string;
}

export interface Principle {
  index: string;
  title: string;
  body: string;
}

export interface AtelierContent {
  format: { locale: string };
  areaUnit: string;
  header: {
    navAria: string;
    nav: { href: string; label: string }[];
    cta: string;
  };
  hero: {
    established: string;
    locationLabel: string;
    location: string;
    line1: string;
    line2: string;
    line3: string;
    lede: string;
    scrollCue: string;
    indexLabel: string;
  };
  index: {
    eyebrow: string;
    title: string;
    hint: string;
    typologyLabel: string;
    locationLabel: string;
    yearLabel: string;
    openLabel: string;
  };
  detail: {
    eyebrow: string;
    selectHint: string;
    siteLabel: string;
    areaLabel: string;
    yearLabel: string;
    statusLabel: string;
    factsLabel: string;
    galleryLabel: string;
    openGalleryLabel: string;
    closeLabel: string;
    prevLabel: string;
    nextLabel: string;
    counterOf: string;
  };
  philosophy: {
    eyebrow: string;
    title: string;
    quote: string;
    attribution: string;
    role: string;
    paragraphs: string[];
    principles: Principle[];
    imageAlt: string;
  };
  maquette: {
    eyebrow: string;
    title: string;
    body: string;
    caption: string;
    frameLabel: string;
    liveLabel: string;
    scaleLabel: string;
  };
  awards: {
    eyebrow: string;
    title: string;
    note: string;
    items: Award[];
  };
  contact: {
    eyebrow: string;
    title: string;
    lede: string;
    emailLabel: string;
    email: string;
    phoneLabel: string;
    phone: string;
    studioLabel: string;
    address: string[];
    hoursLabel: string;
    hours: string;
    cta: string;
  };
  footer: {
    tagline: string;
    columnsLabel: string;
    nav: { href: string; label: string }[];
    socialLabel: string;
    social: { label: string; handle: string }[];
    colophon: string;
    rights: string;
  };
  projects: Project[];
}

const FACADE = "photo-1487958449943-2429e8be8625";
const CURTAIN = "photo-1486406146926-c627a92ad1ab";
const TOWER = "photo-1554469384-e58fac16e23a";
const CONCRETE = "photo-1541354329998-f4d9a9f9297f";
const BRIDGE = "photo-1504307651254-35680f356dfd";
const LOFT = "photo-1493809842364-78817add7ffb";
const DUSK = "photo-1519501025264-65ba15a82390";

const en: AtelierContent = {
  format: { locale: "en-US" },
  areaUnit: "m2",
  header: {
    navAria: "Primary",
    nav: [
      { href: "#index", label: "Index" },
      { href: "#project", label: "Selected" },
      { href: "#philosophy", label: "Studio" },
      { href: "#awards", label: "Awards" },
    ],
    cta: "Commission",
  },
  hero: {
    established: "Established 2009",
    locationLabel: "Practice",
    location: "Lisbon · São Paulo",
    line1: "We build",
    line2: "with silence",
    line3: "and light.",
    lede: "Atelier Meridian is an architecture practice working at the edge of landscape and structure. We design buildings that hold time quietly, that reward the slow look and the returning visitor.",
    scrollCue: "Scroll to enter",
    indexLabel: "Six works",
  },
  index: {
    eyebrow: "Selected works",
    title: "Project index",
    hint: "Hover a row to reveal the work · select to open",
    typologyLabel: "Typology",
    locationLabel: "Location",
    yearLabel: "Year",
    openLabel: "Open project",
  },
  detail: {
    eyebrow: "Selected project",
    selectHint: "Choose a work from the index above to study it in full.",
    siteLabel: "Site",
    areaLabel: "Area",
    yearLabel: "Year",
    statusLabel: "Status",
    factsLabel: "Facts",
    galleryLabel: "Gallery",
    openGalleryLabel: "Open image in the lightbox",
    closeLabel: "Close gallery",
    prevLabel: "Previous image",
    nextLabel: "Next image",
    counterOf: "of",
  },
  philosophy: {
    eyebrow: "Studio",
    title: "A practice of restraint",
    quote: "A building is not an object placed on the land. It is a way of listening to it.",
    attribution: "Inês Meridian",
    role: "Founding partner",
    paragraphs: [
      "We are eleven architects, engineers and model-makers working from two studios across an eight-hour meridian. Every project begins in physical models, in plaster and card, long before a line is drawn on screen.",
      "We refuse the spectacular for its own sake. Our buildings are measured in the quality of a threshold, the depth of a reveal, the precise angle at which morning light crosses a concrete wall.",
    ],
    principles: [
      {
        index: "01",
        title: "Site as first material",
        body: "Before form there is ground, climate and horizon. We design outward from what is already there.",
      },
      {
        index: "02",
        title: "Light before form",
        body: "Structure is shaped to receive daylight through the year, not to resist it. The sun draws our plans.",
      },
      {
        index: "03",
        title: "Structure made visible",
        body: "We let a building show how it stands. Nothing decorative, nothing hidden, no false comfort.",
      },
      {
        index: "04",
        title: "Time as collaborator",
        body: "Materials are chosen to age with grace. A surface should be more beautiful in its thirtieth year.",
      },
    ],
    imageAlt: "A concrete gallery interior lit by a single high window",
  },
  maquette: {
    eyebrow: "Massing study",
    title: "The model comes first",
    body: "Every commission begins as a physical maquette — bone-white volumes turned in raking light until the composition holds. This one is built and lit in real time: a small skyline of concrete masses you can turn with your cursor.",
    caption: "Real-time massing model · bone & concrete",
    frameLabel: "Massing model · study 1:200",
    liveLabel: "Real-time",
    scaleLabel: "5 m",
  },
  awards: {
    eyebrow: "Recognition",
    title: "Awards & honours",
    note: "A selection from the last decade of the practice.",
    items: [
      {
        id: "a1",
        year: "2024",
        title: "RIBA International Prize",
        body: "Meridian Tower",
        role: "Finalist",
      },
      {
        id: "a2",
        year: "2023",
        title: "EU Mies van der Rohe Award",
        body: "Pavilhão de Vidro",
        role: "Nomination",
      },
      {
        id: "a3",
        year: "2023",
        title: "Dezeen Awards",
        body: "Cultural building of the year",
        role: "Winner",
      },
      {
        id: "a4",
        year: "2022",
        title: "AJ Architecture Awards",
        body: "Casa Solano",
        role: "Highly commended",
      },
      {
        id: "a5",
        year: "2021",
        title: "Wallpaper Design Award",
        body: "Best emerging practice",
        role: "Winner",
      },
      {
        id: "a6",
        year: "2020",
        title: "ArchDaily Building of the Year",
        body: "Fundação Bruta",
        role: "Shortlist",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Begin a conversation",
    lede: "We take on a small number of commissions each year, across private houses, cultural buildings and civic infrastructure. Tell us about the site.",
    emailLabel: "Enquiries",
    email: "studio@ateliermeridian.com",
    phoneLabel: "Telephone",
    phone: "+351 21 040 0090",
    studioLabel: "Principal studio",
    address: ["Rua do Alecrim 42", "1200-018 Lisboa, Portugal"],
    hoursLabel: "Studio hours",
    hours: "Monday to Friday, 09h — 18h WET",
    cta: "Send a project brief",
  },
  footer: {
    tagline: "Architecture of silence and light.",
    columnsLabel: "Navigate",
    nav: [
      { href: "#top", label: "Top" },
      { href: "#index", label: "Project index" },
      { href: "#philosophy", label: "Studio" },
      { href: "#awards", label: "Awards" },
      { href: "#contact", label: "Contact" },
    ],
    socialLabel: "Elsewhere",
    social: [
      { label: "Journal", handle: "@ateliermeridian" },
      { label: "Directory", handle: "ateliermeridian.com" },
    ],
    colophon: "A concept crafted by VigApp — no building was harmed.",
    rights: "Atelier Meridian",
  },
  projects: [
    {
      id: "casa-solano",
      index: "01",
      name: "Casa Solano",
      typology: "Private residence",
      location: "Comporta, Portugal",
      year: "2023",
      status: "Completed",
      area: 640,
      summary: "A long white house pressed low into the dunes, organised around three sheltered courtyards.",
      image: FACADE,
      imageAlt: "A minimal white residential facade under clear sky",
      description: [
        "Set behind a ridge of protected dunes, Casa Solano refuses the horizon and turns inward. Three courtyards carve the plan into rooms of shade, each open to a different quality of sky.",
        "Lime-washed walls and micro-cement floors hold the heat of the day and release it slowly at night. The house is a single storey, but its section rises and falls to follow the sand it sits upon.",
      ],
      gallery: [
        { id: FACADE, alt: "White render facade with deep window reveals" },
        { id: LOFT, alt: "A sunlit interior with pale plaster walls" },
        { id: DUSK, alt: "The house silhouette against a dusk sky" },
      ],
    },
    {
      id: "meridian-tower",
      index: "02",
      name: "Meridian Tower",
      typology: "Mixed-use tower",
      location: "Lisboa, Portugal",
      year: "2025",
      status: "In construction",
      area: 48000,
      summary: "A slender civic tower banded in board-marked concrete, holding offices, homes and a public roof.",
      image: TOWER,
      imageAlt: "A tall modern tower seen from below against sky",
      description: [
        "Meridian Tower reintroduces height to a low city with care. Its structure steps inward as it rises, giving every floor a deep loggia that shades the glass and returns the street to the sky.",
        "The uppermost three floors are given back to the public: a covered garden, a reading room and an open belvedere over the Tejo. The building earns its height by sharing its summit.",
      ],
      gallery: [
        { id: TOWER, alt: "The tower rising against an open sky" },
        { id: CURTAIN, alt: "A detail of the layered facade" },
        { id: DUSK, alt: "The tower within the city at dusk" },
      ],
    },
    {
      id: "pavilhao-vidro",
      index: "03",
      name: "Pavilhão de Vidro",
      typology: "Cultural pavilion",
      location: "Porto, Portugal",
      year: "2022",
      status: "Completed",
      area: 1200,
      summary: "A glass room in a public garden, where the roof floats free of every wall.",
      image: CURTAIN,
      imageAlt: "A glass curtain wall reflecting the sky",
      description: [
        "The pavilion is barely there. A thin concrete roof hovers over a single glazed volume, carried on eight hairline columns set back from the perimeter so the glass touches nothing.",
        "Inside, the garden is never absent. Exhibitions are staged against the living backdrop of the park, and at night the pavilion becomes a lantern read from every path.",
      ],
      gallery: [
        { id: CURTAIN, alt: "Glass curtain wall reflecting trees" },
        { id: FACADE, alt: "The pale roof edge against sky" },
        { id: LOFT, alt: "The luminous interior at dusk" },
      ],
    },
    {
      id: "fundacao-bruta",
      index: "04",
      name: "Fundação Bruta",
      typology: "Art archive",
      location: "São Paulo, Brasil",
      year: "2021",
      status: "Completed",
      area: 8500,
      summary: "A windowless concrete vault for a private collection, lit entirely from above.",
      image: CONCRETE,
      imageAlt: "A raw concrete building form in strong light",
      description: [
        "The archive protects light-sensitive works, so daylight enters only through deep concrete lightwells that never let the sun fall on a surface directly. The material is the architecture: board-marked, unpainted, unadorned.",
        "Visitors descend a single ramp through the full section of the building, moving from the noise of the city into a cool, measured silence held between one-metre walls.",
      ],
      gallery: [
        { id: CONCRETE, alt: "Board-marked concrete under raking light" },
        { id: BRIDGE, alt: "A concrete structural detail" },
        { id: LOFT, alt: "An interior gallery lit from above" },
      ],
    },
    {
      id: "ponte-meridian",
      index: "05",
      name: "Ponte Meridian",
      typology: "Pedestrian bridge",
      location: "Rotterdam, Nederland",
      year: "2024",
      status: "Completed",
      area: 3400,
      summary: "A single steel span across the harbour, thin as a drawn line seen from the water.",
      image: BRIDGE,
      imageAlt: "A minimal bridge structure crossing water",
      description: [
        "The brief asked for a crossing that would disappear. We answered with one continuous weathering-steel plate, folded to carry itself, that reads as a horizon rather than an object.",
        "The deck widens at its centre into a slow place: a bench, a rail, a reason to stop over water. Structure and handrail are one and the same, resolved in a single detail repeated the length of the span.",
      ],
      gallery: [
        { id: BRIDGE, alt: "The bridge span crossing the harbour" },
        { id: DUSK, alt: "The crossing lit at dusk" },
        { id: CONCRETE, alt: "A detail of the steel abutment" },
      ],
    },
    {
      id: "atico-norte",
      index: "06",
      name: "Ático Norte",
      typology: "Adaptive reuse",
      location: "Madrid, España",
      year: "2020",
      status: "Completed",
      area: 320,
      summary: "A former print workshop under the eaves, opened to the north light it was built to catch.",
      image: LOFT,
      imageAlt: "An open loft interior with tall windows",
      description: [
        "A century-old printworks beneath a Madrid roof is returned to a single generous room. We removed a mezzanine and a hundred years of partitions to recover the original north-lit volume.",
        "New elements are frankly new: a steel kitchen, an oak sleeping box, a bathroom in a single block of stone. Old and new stand apart, each legible, neither pretending to be the other.",
      ],
      gallery: [
        { id: LOFT, alt: "The open loft under a pitched roof" },
        { id: FACADE, alt: "The restored facade from the street" },
        { id: CURTAIN, alt: "North light through tall windows" },
      ],
    },
  ],
};

const pt: AtelierContent = {
  format: { locale: "pt-BR" },
  areaUnit: "m2",
  header: {
    navAria: "Principal",
    nav: [
      { href: "#index", label: "Índice" },
      { href: "#project", label: "Selecionado" },
      { href: "#philosophy", label: "Ateliê" },
      { href: "#awards", label: "Prêmios" },
    ],
    cta: "Encomendar",
  },
  hero: {
    established: "Fundado em 2009",
    locationLabel: "Prática",
    location: "Lisboa · São Paulo",
    line1: "Construímos",
    line2: "com silêncio",
    line3: "e com luz.",
    lede: "O Atelier Meridian é uma prática de arquitetura que trabalha na fronteira entre paisagem e estrutura. Projetamos edifícios que guardam o tempo em silêncio, que recompensam o olhar demorado e a visita que retorna.",
    scrollCue: "Role para entrar",
    indexLabel: "Seis obras",
  },
  index: {
    eyebrow: "Obras selecionadas",
    title: "Índice de projetos",
    hint: "Passe sobre uma linha para revelar a obra · selecione para abrir",
    typologyLabel: "Tipologia",
    locationLabel: "Local",
    yearLabel: "Ano",
    openLabel: "Abrir projeto",
  },
  detail: {
    eyebrow: "Projeto selecionado",
    selectHint: "Escolha uma obra no índice acima para estudá-la por completo.",
    siteLabel: "Terreno",
    areaLabel: "Área",
    yearLabel: "Ano",
    statusLabel: "Estado",
    factsLabel: "Ficha técnica",
    galleryLabel: "Galeria",
    openGalleryLabel: "Abrir imagem na galeria ampliada",
    closeLabel: "Fechar galeria",
    prevLabel: "Imagem anterior",
    nextLabel: "Próxima imagem",
    counterOf: "de",
  },
  philosophy: {
    eyebrow: "Ateliê",
    title: "Uma prática de contenção",
    quote: "Um edifício não é um objeto pousado sobre a terra. É uma forma de escutá-la.",
    attribution: "Inês Meridian",
    role: "Sócia fundadora",
    paragraphs: [
      "Somos onze arquitetos, engenheiros e maquetistas a trabalhar a partir de dois ateliês separados por um meridiano de oito horas. Cada projeto começa em maquetes físicas, em gesso e cartão, muito antes de se traçar uma linha no ecrã.",
      "Recusamos o espetacular por si só. Os nossos edifícios medem-se na qualidade de uma soleira, na profundidade de um rasgo, no ângulo preciso com que a luz da manhã atravessa uma parede de betão.",
    ],
    principles: [
      {
        index: "01",
        title: "O terreno é o primeiro material",
        body: "Antes da forma há o solo, o clima e o horizonte. Projetamos de dentro para fora a partir do que já existe.",
      },
      {
        index: "02",
        title: "A luz antes da forma",
        body: "A estrutura molda-se para receber a luz do dia ao longo do ano, não para lhe resistir. O sol desenha as nossas plantas.",
      },
      {
        index: "03",
        title: "A estrutura à vista",
        body: "Deixamos o edifício mostrar como se sustenta. Nada decorativo, nada escondido, nenhum conforto falso.",
      },
      {
        index: "04",
        title: "O tempo como colaborador",
        body: "Os materiais são escolhidos para envelhecer com graça. Uma superfície deve ser mais bela no seu trigésimo ano.",
      },
    ],
    imageAlt: "Interior de uma galeria de betão iluminada por uma única janela alta",
  },
  maquette: {
    eyebrow: "Estudo de massas",
    title: "A maquete vem primeiro",
    body: "Cada encomenda começa como uma maquete física — volumes cor de osso girados sob luz rasante até a composição se firmar. Esta é construída e iluminada em tempo real: um pequeno horizonte de massas de betão que se gira com o cursor.",
    caption: "Maquete de massas em tempo real · osso e betão",
    frameLabel: "Maquete de massas · estudo 1:200",
    liveLabel: "Tempo real",
    scaleLabel: "5 m",
  },
  awards: {
    eyebrow: "Reconhecimento",
    title: "Prêmios e distinções",
    note: "Uma seleção da última década da prática.",
    items: [
      {
        id: "a1",
        year: "2024",
        title: "RIBA International Prize",
        body: "Meridian Tower",
        role: "Finalista",
      },
      {
        id: "a2",
        year: "2023",
        title: "Prêmio Mies van der Rohe (UE)",
        body: "Pavilhão de Vidro",
        role: "Indicação",
      },
      {
        id: "a3",
        year: "2023",
        title: "Dezeen Awards",
        body: "Edifício cultural do ano",
        role: "Vencedor",
      },
      {
        id: "a4",
        year: "2022",
        title: "AJ Architecture Awards",
        body: "Casa Solano",
        role: "Menção honrosa",
      },
      {
        id: "a5",
        year: "2021",
        title: "Wallpaper Design Award",
        body: "Melhor prática emergente",
        role: "Vencedor",
      },
      {
        id: "a6",
        year: "2020",
        title: "ArchDaily Building of the Year",
        body: "Fundação Bruta",
        role: "Selecionado",
      },
    ],
  },
  contact: {
    eyebrow: "Contato",
    title: "Comece uma conversa",
    lede: "Aceitamos um pequeno número de encomendas por ano, entre casas privadas, edifícios culturais e infraestrutura civil. Fale-nos do terreno.",
    emailLabel: "Consultas",
    email: "estudio@ateliermeridian.com",
    phoneLabel: "Telefone",
    phone: "+55 11 3062 0090",
    studioLabel: "Ateliê principal",
    address: ["Rua do Alecrim 42", "1200-018 Lisboa, Portugal"],
    hoursLabel: "Horário do ateliê",
    hours: "Segunda a sexta, 09h — 18h",
    cta: "Enviar um briefing",
  },
  footer: {
    tagline: "Arquitetura de silêncio e de luz.",
    columnsLabel: "Navegar",
    nav: [
      { href: "#top", label: "Topo" },
      { href: "#index", label: "Índice de projetos" },
      { href: "#philosophy", label: "Ateliê" },
      { href: "#awards", label: "Prêmios" },
      { href: "#contact", label: "Contato" },
    ],
    socialLabel: "Em outros lugares",
    social: [
      { label: "Diário", handle: "@ateliermeridian" },
      { label: "Diretório", handle: "ateliermeridian.com" },
    ],
    colophon: "Um conceito criado pela VigApp — nenhum edifício foi ferido.",
    rights: "Atelier Meridian",
  },
  projects: [
    {
      id: "casa-solano",
      index: "01",
      name: "Casa Solano",
      typology: "Residência privada",
      location: "Comporta, Portugal",
      year: "2023",
      status: "Concluído",
      area: 640,
      summary: "Uma casa branca e comprida rebaixada nas dunas, organizada em torno de três pátios abrigados.",
      image: FACADE,
      imageAlt: "Uma fachada residencial branca e minimalista sob céu limpo",
      description: [
        "Escondida atrás de uma crista de dunas protegidas, a Casa Solano recusa o horizonte e volta-se para dentro. Três pátios recortam a planta em salas de sombra, cada uma aberta a uma qualidade diferente de céu.",
        "Paredes caiadas e pavimentos de micro-cimento retêm o calor do dia e libertam-no lentamente à noite. A casa tem um só piso, mas o seu corte sobe e desce para seguir a areia sobre a qual assenta.",
      ],
      gallery: [
        { id: FACADE, alt: "Fachada de reboco branco com rasgos profundos" },
        { id: LOFT, alt: "Um interior soalheiro com paredes de gesso claro" },
        { id: DUSK, alt: "A silhueta da casa contra um céu crepuscular" },
      ],
    },
    {
      id: "meridian-tower",
      index: "02",
      name: "Meridian Tower",
      typology: "Torre de uso misto",
      location: "Lisboa, Portugal",
      year: "2025",
      status: "Em construção",
      area: 48000,
      summary: "Uma torre cívica esbelta em betão à vista, com escritórios, habitação e um terraço público.",
      image: TOWER,
      imageAlt: "Uma torre moderna e alta vista de baixo contra o céu",
      description: [
        "A Meridian Tower reintroduz a altura numa cidade baixa com cuidado. A sua estrutura recua à medida que sobe, dando a cada piso uma loggia profunda que sombreia o vidro e devolve a rua ao céu.",
        "Os três pisos superiores são devolvidos ao público: um jardim coberto, uma sala de leitura e um belvedere aberto sobre o Tejo. O edifício merece a sua altura ao partilhar o seu cume.",
      ],
      gallery: [
        { id: TOWER, alt: "A torre erguendo-se contra um céu aberto" },
        { id: CURTAIN, alt: "Um detalhe da fachada em camadas" },
        { id: DUSK, alt: "A torre na cidade ao entardecer" },
      ],
    },
    {
      id: "pavilhao-vidro",
      index: "03",
      name: "Pavilhão de Vidro",
      typology: "Pavilhão cultural",
      location: "Porto, Portugal",
      year: "2022",
      status: "Concluído",
      area: 1200,
      summary: "Uma sala de vidro num jardim público, onde a cobertura paira livre de todas as paredes.",
      image: CURTAIN,
      imageAlt: "Uma parede-cortina de vidro refletindo o céu",
      description: [
        "O pavilhão quase não existe. Uma fina laje de betão paira sobre um único volume envidraçado, apoiada em oito colunas finíssimas recuadas do perímetro para que o vidro não toque em nada.",
        "Lá dentro, o jardim nunca está ausente. As exposições montam-se contra o fundo vivo do parque e, à noite, o pavilhão torna-se uma lanterna lida de todos os caminhos.",
      ],
      gallery: [
        { id: CURTAIN, alt: "Parede de vidro refletindo árvores" },
        { id: FACADE, alt: "O bordo claro da cobertura contra o céu" },
        { id: LOFT, alt: "O interior luminoso ao entardecer" },
      ],
    },
    {
      id: "fundacao-bruta",
      index: "04",
      name: "Fundação Bruta",
      typology: "Arquivo de arte",
      location: "São Paulo, Brasil",
      year: "2021",
      status: "Concluído",
      area: 8500,
      summary: "Um cofre de betão sem janelas para uma coleção privada, iluminado inteiramente por cima.",
      image: CONCRETE,
      imageAlt: "Uma forma de betão bruto sob luz intensa",
      description: [
        "O arquivo protege obras sensíveis à luz, por isso a luz do dia entra apenas por profundos poços de betão que nunca deixam o sol incidir diretamente numa superfície. O material é a arquitetura: marcado pela cofragem, sem pintura, sem ornamento.",
        "Os visitantes descem por uma única rampa através de todo o corte do edifício, passando do ruído da cidade para um silêncio fresco e medido, contido entre paredes de um metro.",
      ],
      gallery: [
        { id: CONCRETE, alt: "Betão marcado pela cofragem sob luz rasante" },
        { id: BRIDGE, alt: "Um detalhe estrutural em betão" },
        { id: LOFT, alt: "Uma galeria interior iluminada por cima" },
      ],
    },
    {
      id: "ponte-meridian",
      index: "05",
      name: "Ponte Meridian",
      typology: "Ponte pedonal",
      location: "Roterdão, Países Baixos",
      year: "2024",
      status: "Concluído",
      area: 3400,
      summary: "Um único vão de aço sobre o porto, fino como uma linha desenhada vista da água.",
      image: BRIDGE,
      imageAlt: "Uma estrutura de ponte minimalista atravessando a água",
      description: [
        "O programa pedia uma travessia que desaparecesse. Respondemos com uma chapa contínua de aço corten, dobrada para se sustentar, que se lê como um horizonte e não como um objeto.",
        "O tabuleiro alarga-se no centro num lugar de pausa: um banco, uma guarda, um motivo para parar sobre a água. Estrutura e corrimão são a mesma coisa, resolvidos num único detalhe repetido ao longo do vão.",
      ],
      gallery: [
        { id: BRIDGE, alt: "O vão da ponte atravessando o porto" },
        { id: DUSK, alt: "A travessia iluminada ao entardecer" },
        { id: CONCRETE, alt: "Um detalhe do encontro de aço" },
      ],
    },
    {
      id: "atico-norte",
      index: "06",
      name: "Ático Norte",
      typology: "Reabilitação",
      location: "Madrid, Espanha",
      year: "2020",
      status: "Concluído",
      area: 320,
      summary: "Uma antiga tipografia sob o telhado, aberta à luz norte que foi construída para captar.",
      image: LOFT,
      imageAlt: "Um interior de loft aberto com janelas altas",
      description: [
        "Uma tipografia centenária sob um telhado de Madrid é devolvida a uma única sala generosa. Removemos um mezanino e cem anos de divisórias para recuperar o volume original iluminado a norte.",
        "Os elementos novos são assumidamente novos: uma cozinha de aço, uma caixa de dormir em carvalho, uma casa de banho num único bloco de pedra. Velho e novo mantêm-se distintos, cada um legível, nenhum a fingir ser o outro.",
      ],
      gallery: [
        { id: LOFT, alt: "O loft aberto sob um telhado inclinado" },
        { id: FACADE, alt: "A fachada restaurada vista da rua" },
        { id: CURTAIN, alt: "Luz norte através de janelas altas" },
      ],
    },
  ],
};

const es: AtelierContent = {
  format: { locale: "es-ES" },
  areaUnit: "m2",
  header: {
    navAria: "Principal",
    nav: [
      { href: "#index", label: "Índice" },
      { href: "#project", label: "Seleccionado" },
      { href: "#philosophy", label: "Estudio" },
      { href: "#awards", label: "Premios" },
    ],
    cta: "Encargar",
  },
  hero: {
    established: "Fundado en 2009",
    locationLabel: "Práctica",
    location: "Lisboa · São Paulo",
    line1: "Construimos",
    line2: "con silencio",
    line3: "y con luz.",
    lede: "Atelier Meridian es un estudio de arquitectura que trabaja en el límite entre paisaje y estructura. Diseñamos edificios que guardan el tiempo en silencio, que premian la mirada pausada y la visita que regresa.",
    scrollCue: "Desliza para entrar",
    indexLabel: "Seis obras",
  },
  index: {
    eyebrow: "Obras seleccionadas",
    title: "Índice de proyectos",
    hint: "Pasa sobre una fila para revelar la obra · selecciona para abrir",
    typologyLabel: "Tipología",
    locationLabel: "Lugar",
    yearLabel: "Año",
    openLabel: "Abrir proyecto",
  },
  detail: {
    eyebrow: "Proyecto seleccionado",
    selectHint: "Elige una obra del índice superior para estudiarla por completo.",
    siteLabel: "Emplazamiento",
    areaLabel: "Superficie",
    yearLabel: "Año",
    statusLabel: "Estado",
    factsLabel: "Ficha técnica",
    galleryLabel: "Galería",
    openGalleryLabel: "Abrir imagen en la galería ampliada",
    closeLabel: "Cerrar galería",
    prevLabel: "Imagen anterior",
    nextLabel: "Imagen siguiente",
    counterOf: "de",
  },
  philosophy: {
    eyebrow: "Estudio",
    title: "Una práctica de contención",
    quote: "Un edificio no es un objeto posado sobre la tierra. Es una manera de escucharla.",
    attribution: "Inês Meridian",
    role: "Socia fundadora",
    paragraphs: [
      "Somos once arquitectos, ingenieros y maquetistas trabajando desde dos estudios separados por un meridiano de ocho horas. Cada proyecto comienza en maquetas físicas, en yeso y cartón, mucho antes de trazar una línea en la pantalla.",
      "Rechazamos lo espectacular por sí mismo. Nuestros edificios se miden en la calidad de un umbral, en la profundidad de una jamba, en el ángulo preciso con que la luz de la mañana cruza un muro de hormigón.",
    ],
    principles: [
      {
        index: "01",
        title: "El lugar es el primer material",
        body: "Antes de la forma están el suelo, el clima y el horizonte. Proyectamos hacia fuera desde lo que ya existe.",
      },
      {
        index: "02",
        title: "La luz antes que la forma",
        body: "La estructura se moldea para recibir la luz del día durante todo el año, no para resistirla. El sol dibuja nuestras plantas.",
      },
      {
        index: "03",
        title: "La estructura a la vista",
        body: "Dejamos que el edificio muestre cómo se sostiene. Nada decorativo, nada oculto, ningún consuelo falso.",
      },
      {
        index: "04",
        title: "El tiempo como colaborador",
        body: "Los materiales se eligen para envejecer con gracia. Una superficie debería ser más bella en su trigésimo año.",
      },
    ],
    imageAlt: "Interior de una galería de hormigón iluminada por una única ventana alta",
  },
  maquette: {
    eyebrow: "Estudio de masas",
    title: "La maqueta va primero",
    body: "Cada encargo comienza como una maqueta física — volúmenes de color hueso girados bajo luz rasante hasta que la composición se sostiene. Esta se construye e ilumina en tiempo real: un pequeño horizonte de masas de hormigón que se gira con el cursor.",
    caption: "Maqueta de masas en tiempo real · hueso y hormigón",
    frameLabel: "Maqueta de masas · estudio 1:200",
    liveLabel: "Tiempo real",
    scaleLabel: "5 m",
  },
  awards: {
    eyebrow: "Reconocimiento",
    title: "Premios y distinciones",
    note: "Una selección de la última década del estudio.",
    items: [
      {
        id: "a1",
        year: "2024",
        title: "RIBA International Prize",
        body: "Meridian Tower",
        role: "Finalista",
      },
      {
        id: "a2",
        year: "2023",
        title: "Premio Mies van der Rohe (UE)",
        body: "Pavilhão de Vidro",
        role: "Nominación",
      },
      {
        id: "a3",
        year: "2023",
        title: "Dezeen Awards",
        body: "Edificio cultural del año",
        role: "Ganador",
      },
      {
        id: "a4",
        year: "2022",
        title: "AJ Architecture Awards",
        body: "Casa Solano",
        role: "Mención de honor",
      },
      {
        id: "a5",
        year: "2021",
        title: "Wallpaper Design Award",
        body: "Mejor estudio emergente",
        role: "Ganador",
      },
      {
        id: "a6",
        year: "2020",
        title: "ArchDaily Building of the Year",
        body: "Fundação Bruta",
        role: "Preseleccionado",
      },
    ],
  },
  contact: {
    eyebrow: "Contacto",
    title: "Iniciemos una conversación",
    lede: "Aceptamos un pequeño número de encargos cada año, entre casas privadas, edificios culturales e infraestructura civil. Háblanos del lugar.",
    emailLabel: "Consultas",
    email: "estudio@ateliermeridian.com",
    phoneLabel: "Teléfono",
    phone: "+34 91 040 0090",
    studioLabel: "Estudio principal",
    address: ["Rua do Alecrim 42", "1200-018 Lisboa, Portugal"],
    hoursLabel: "Horario del estudio",
    hours: "De lunes a viernes, 09h — 18h",
    cta: "Enviar un briefing",
  },
  footer: {
    tagline: "Arquitectura de silencio y de luz.",
    columnsLabel: "Navegar",
    nav: [
      { href: "#top", label: "Arriba" },
      { href: "#index", label: "Índice de proyectos" },
      { href: "#philosophy", label: "Estudio" },
      { href: "#awards", label: "Premios" },
      { href: "#contact", label: "Contacto" },
    ],
    socialLabel: "En otros lugares",
    social: [
      { label: "Diario", handle: "@ateliermeridian" },
      { label: "Directorio", handle: "ateliermeridian.com" },
    ],
    colophon: "Un concepto creado por VigApp — ningún edificio resultó herido.",
    rights: "Atelier Meridian",
  },
  projects: [
    {
      id: "casa-solano",
      index: "01",
      name: "Casa Solano",
      typology: "Residencia privada",
      location: "Comporta, Portugal",
      year: "2023",
      status: "Terminado",
      area: 640,
      summary: "Una casa blanca y alargada hundida en las dunas, organizada en torno a tres patios resguardados.",
      image: FACADE,
      imageAlt: "Una fachada residencial blanca y minimalista bajo un cielo despejado",
      description: [
        "Oculta tras una cresta de dunas protegidas, Casa Solano rechaza el horizonte y se vuelve hacia dentro. Tres patios recortan la planta en salas de sombra, cada una abierta a una calidad distinta de cielo.",
        "Muros encalados y suelos de microcemento retienen el calor del día y lo liberan lentamente por la noche. La casa tiene una sola planta, pero su sección sube y baja para seguir la arena sobre la que se asienta.",
      ],
      gallery: [
        { id: FACADE, alt: "Fachada de revoco blanco con profundas jambas" },
        { id: LOFT, alt: "Un interior soleado con muros de yeso claro" },
        { id: DUSK, alt: "La silueta de la casa contra un cielo del atardecer" },
      ],
    },
    {
      id: "meridian-tower",
      index: "02",
      name: "Meridian Tower",
      typology: "Torre de uso mixto",
      location: "Lisboa, Portugal",
      year: "2025",
      status: "En construcción",
      area: 48000,
      summary: "Una esbelta torre cívica en hormigón visto, con oficinas, viviendas y una azotea pública.",
      image: TOWER,
      imageAlt: "Una torre moderna y alta vista desde abajo contra el cielo",
      description: [
        "Meridian Tower reintroduce la altura en una ciudad baja con cuidado. Su estructura retrocede a medida que asciende, dando a cada planta una loggia profunda que da sombra al vidrio y devuelve la calle al cielo.",
        "Las tres plantas superiores se devuelven al público: un jardín cubierto, una sala de lectura y un mirador abierto sobre el Tajo. El edificio se gana su altura al compartir su cima.",
      ],
      gallery: [
        { id: TOWER, alt: "La torre alzándose contra un cielo abierto" },
        { id: CURTAIN, alt: "Un detalle de la fachada en capas" },
        { id: DUSK, alt: "La torre en la ciudad al anochecer" },
      ],
    },
    {
      id: "pavilhao-vidro",
      index: "03",
      name: "Pavilhão de Vidro",
      typology: "Pabellón cultural",
      location: "Porto, Portugal",
      year: "2022",
      status: "Terminado",
      area: 1200,
      summary: "Una sala de vidrio en un jardín público, donde la cubierta flota libre de todo muro.",
      image: CURTAIN,
      imageAlt: "Un muro cortina de vidrio reflejando el cielo",
      description: [
        "El pabellón apenas existe. Una fina losa de hormigón flota sobre un único volumen acristalado, sostenida por ocho columnas finísimas retranqueadas del perímetro para que el vidrio no toque nada.",
        "Dentro, el jardín nunca está ausente. Las exposiciones se montan contra el fondo vivo del parque y, de noche, el pabellón se convierte en un farol que se lee desde todos los senderos.",
      ],
      gallery: [
        { id: CURTAIN, alt: "Muro de vidrio reflejando árboles" },
        { id: FACADE, alt: "El borde claro de la cubierta contra el cielo" },
        { id: LOFT, alt: "El interior luminoso al atardecer" },
      ],
    },
    {
      id: "fundacao-bruta",
      index: "04",
      name: "Fundação Bruta",
      typology: "Archivo de arte",
      location: "São Paulo, Brasil",
      year: "2021",
      status: "Terminado",
      area: 8500,
      summary: "Una cámara de hormigón sin ventanas para una colección privada, iluminada por completo desde arriba.",
      image: CONCRETE,
      imageAlt: "Una forma de hormigón en bruto bajo una luz intensa",
      description: [
        "El archivo protege obras sensibles a la luz, así que la luz del día entra solo por profundos lucernarios de hormigón que nunca dejan que el sol incida directamente sobre una superficie. El material es la arquitectura: marcado por el encofrado, sin pintura, sin adorno.",
        "Los visitantes descienden por una única rampa a través de toda la sección del edificio, pasando del ruido de la ciudad a un silencio fresco y medido, contenido entre muros de un metro.",
      ],
      gallery: [
        { id: CONCRETE, alt: "Hormigón encofrado bajo luz rasante" },
        { id: BRIDGE, alt: "Un detalle estructural en hormigón" },
        { id: LOFT, alt: "Una galería interior iluminada desde arriba" },
      ],
    },
    {
      id: "ponte-meridian",
      index: "05",
      name: "Ponte Meridian",
      typology: "Puente peatonal",
      location: "Róterdam, Países Bajos",
      year: "2024",
      status: "Terminado",
      area: 3400,
      summary: "Un único vano de acero sobre el puerto, fino como una línea dibujada vista desde el agua.",
      image: BRIDGE,
      imageAlt: "Una estructura de puente minimalista cruzando el agua",
      description: [
        "El encargo pedía un cruce que desapareciera. Respondimos con una chapa continua de acero corten, plegada para sostenerse a sí misma, que se lee como un horizonte y no como un objeto.",
        "El tablero se ensancha en su centro en un lugar de pausa: un banco, una baranda, un motivo para detenerse sobre el agua. Estructura y pasamanos son lo mismo, resueltos en un único detalle repetido a lo largo del vano.",
      ],
      gallery: [
        { id: BRIDGE, alt: "El vano del puente cruzando el puerto" },
        { id: DUSK, alt: "El cruce iluminado al anochecer" },
        { id: CONCRETE, alt: "Un detalle del estribo de acero" },
      ],
    },
    {
      id: "atico-norte",
      index: "06",
      name: "Ático Norte",
      typology: "Rehabilitación",
      location: "Madrid, España",
      year: "2020",
      status: "Terminado",
      area: 320,
      summary: "Un antiguo taller de imprenta bajo el alero, abierto a la luz norte para la que fue construido.",
      image: LOFT,
      imageAlt: "Un interior de loft abierto con ventanas altas",
      description: [
        "Una imprenta centenaria bajo un tejado de Madrid se devuelve a una única sala generosa. Retiramos un altillo y cien años de tabiques para recuperar el volumen original iluminado a norte.",
        "Los elementos nuevos son francamente nuevos: una cocina de acero, una caja de dormir en roble, un baño en un solo bloque de piedra. Lo viejo y lo nuevo permanecen separados, cada uno legible, sin que ninguno finja ser el otro.",
      ],
      gallery: [
        { id: LOFT, alt: "El loft abierto bajo un tejado inclinado" },
        { id: FACADE, alt: "La fachada restaurada desde la calle" },
        { id: CURTAIN, alt: "Luz norte a través de ventanas altas" },
      ],
    },
  ],
};

export const atelierDictionary: DemoDictionary<AtelierContent> = { en, pt, es };
