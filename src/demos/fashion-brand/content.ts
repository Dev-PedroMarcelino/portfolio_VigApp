import type { DemoDictionary } from "@/demos/content";

/** Builds a defensively-cropped Unsplash URL for the maison's editorial imagery. */
export function unsplash(id: string, w = 1600): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}

export interface Look {
  id: string;
  image: string;
  alt: string;
  season: string;
  title: string;
  caption: string;
}

export interface Piece {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  imageAlt: string;
  crop: string;
  cropAlt: string;
  material: string;
}

export interface CraftStep {
  numeral: string;
  title: string;
  description: string;
}

export interface RunwayEvent {
  id: string;
  city: string;
  venue: string;
  date: string;
  time: string;
  label: string;
  status: "confirmed" | "invitation" | "waitlist";
}

export interface SizeOption {
  value: string;
  label: string;
}

export interface NoirContent {
  format: { locale: string; currency: string };
  header: {
    navAria: string;
    nav: { href: string; label: string }[];
    requestCta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleItalic: string;
    lede: string;
    primaryCta: string;
    secondaryCta: string;
    looks: Look[];
    lookLabel: string;
    prevAria: string;
    nextAria: string;
    pauseAria: string;
    playAria: string;
    indexAria: (n: number) => string;
  };
  collection: {
    eyebrow: string;
    title: string;
    intro: string;
    pieces: Piece[];
    categoryLabel: string;
    viewLabel: string;
    requestLabel: string;
    materialLabel: string;
  };
  story: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    quote: string;
    attribution: string;
    role: string;
    stats: { value: string; label: string }[];
    image: string;
    imageAlt: string;
  };
  atelier: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: CraftStep[];
    image: string;
    imageAlt: string;
    signature: string;
  };
  runway: {
    eyebrow: string;
    title: string;
    intro: string;
    events: RunwayEvent[];
    dateLabel: string;
    timeLabel: string;
    statusLabels: Record<RunwayEvent["status"], string>;
    countdownTitle: string;
    countdownUnits: { days: string; hours: string; minutes: string; seconds: string };
    requestSeat: string;
  };
  request: {
    triggerEyebrow: string;
    triggerTitle: string;
    triggerBody: string;
    openCta: string;
    modalAria: string;
    closeAria: string;
    stepLabel: (current: number, total: number) => string;
    steps: { key: string; title: string; caption: string }[];
    pieceLabel: string;
    piecePlaceholder: string;
    sizeLabel: string;
    sizes: SizeOption[];
    fitLabel: string;
    fits: SizeOption[];
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    cityLabel: string;
    cityPlaceholder: string;
    notesLabel: string;
    notesPlaceholder: string;
    summaryTitle: string;
    summaryPiece: string;
    summarySize: string;
    summaryFit: string;
    summaryContact: string;
    back: string;
    next: string;
    submit: string;
    successTitle: string;
    successBody: string;
    reference: string;
    done: string;
    requiredHint: string;
  };
  footer: {
    maisonLine: string;
    address: string[];
    hoursLabel: string;
    hours: string;
    columns: { title: string; links: string[] }[];
    social: { label: string; handle: string }[];
    newsletterTitle: string;
    newsletterBody: string;
    newsletterPlaceholder: string;
    newsletterCta: string;
    newsletterAria: string;
    legal: string;
    credit: string;
  };
}

const enPieces: Piece[] = [
  {
    id: "onyx-trench",
    name: "The Onyx Trench",
    category: "Outerwear",
    price: 4200,
    image: "photo-1469334031218-e382a71b716b",
    imageAlt: "Model wearing a long structured black trench coat in editorial light",
    crop: "photo-1487222477894-8943e31ef7b2",
    cropAlt: "Close crop of the trench collar and hand-set lapel",
    material: "Double-faced Italian gabardine",
  },
  {
    id: "gilded-slip",
    name: "Gilded Silk Slip",
    category: "Eveningwear",
    price: 2650,
    image: "photo-1509631179647-0177331693ae",
    imageAlt: "Editorial model in a fluid gold-toned silk slip dress",
    crop: "photo-1534528741775-53994a69daeb",
    cropAlt: "Detail of bias-cut silk falling across the shoulder",
    material: "Bias-cut sandwashed silk",
  },
  {
    id: "noir-cape",
    name: "Noir Wool Cape",
    category: "Outerwear",
    price: 3480,
    image: "photo-1515886657613-9f3515b0c78f",
    imageAlt: "Model outdoors in a sweeping black wool cape",
    crop: "photo-1529139574466-a303027c1d8b",
    cropAlt: "Cape drape photographed against a bright street",
    material: "Pressed virgin wool melton",
  },
  {
    id: "atelier-tuxedo",
    name: "Atelier Tuxedo",
    category: "Tailoring",
    price: 3900,
    image: "photo-1441984904996-e0b6ba687e04",
    imageAlt: "Sharp black tuxedo jacket styled on a model",
    crop: "photo-1487222477894-8943e31ef7b2",
    cropAlt: "Close view of a satin peak lapel and covered buttons",
    material: "Grain-de-poudre wool with satin facings",
  },
  {
    id: "cashmere-column",
    name: "Cashmere Column Gown",
    category: "Eveningwear",
    price: 5100,
    image: "photo-1534528741775-53994a69daeb",
    imageAlt: "Portrait of a model in a floor-length cashmere column gown",
    crop: "photo-1509631179647-0177331693ae",
    cropAlt: "Detail of a knitted cashmere seam and neckline",
    material: "Ribbed Mongolian cashmere",
  },
  {
    id: "charmeuse-blouse",
    name: "Ivory Charmeuse Blouse",
    category: "Ready-to-wear",
    price: 980,
    image: "photo-1483985988355-763728e1935b",
    imageAlt: "Ivory charmeuse blouse presented in a bright interior",
    crop: "photo-1445205170230-053b83016050",
    cropAlt: "Rack detail showing the blouse hung beside coordinating pieces",
    material: "Silk charmeuse, French seams",
  },
  {
    id: "leather-coat",
    name: "Structured Leather Coat",
    category: "Outerwear",
    price: 4680,
    image: "photo-1529139574466-a303027c1d8b",
    imageAlt: "Model on the street in a structured black leather coat",
    crop: "photo-1515886657613-9f3515b0c78f",
    cropAlt: "Leather coat shoulder and lapel in daylight",
    material: "Vegetable-tanned nappa leather",
  },
  {
    id: "crepe-trousers",
    name: "Draped Crepe Trousers",
    category: "Tailoring",
    price: 1120,
    image: "photo-1445205170230-053b83016050",
    imageAlt: "Draped crepe trousers styled on a garment rail",
    crop: "photo-1483985988355-763728e1935b",
    cropAlt: "Fabric detail of the fluid crepe trouser leg",
    material: "Fluid wool crepe",
  },
];

const enContent: NoirContent = {
  format: { locale: "en-US", currency: "USD" },
  header: {
    navAria: "NOIR Atelier primary navigation",
    nav: [
      { href: "#lookbook", label: "Lookbook" },
      { href: "#collection", label: "Collection" },
      { href: "#maison", label: "Maison" },
      { href: "#atelier", label: "Atelier" },
      { href: "#runway", label: "Runway" },
    ],
    requestCta: "Request a piece",
  },
  hero: {
    eyebrow: "Autumn / Winter 2026 — Chapter One",
    title: "Silence,",
    titleItalic: "tailored",
    lede: "A wardrobe cut in absolute black and gold leaf. Each garment is drawn once, made once, and finished by a single pair of hands at the maison on Rue Saint-Merri.",
    primaryCta: "Enter the collection",
    secondaryCta: "Request a private viewing",
    lookLabel: "Look",
    prevAria: "Previous look",
    nextAria: "Next look",
    pauseAria: "Pause the lookbook",
    playAria: "Play the lookbook",
    indexAria: (n: number) => `Show look ${n}`,
    looks: [
      {
        id: "look-01",
        image: "photo-1469334031218-e382a71b716b",
        alt: "Opening look — a floor-grazing black trench under raking gallery light",
        season: "AW26 · Look 01",
        title: "The Onyx Trench",
        caption: "Double-faced gabardine, hand-rolled belt, thirty-one metres of top-stitch.",
      },
      {
        id: "look-02",
        image: "photo-1509631179647-0177331693ae",
        alt: "Second look — fluid gold silk catching the light in movement",
        season: "AW26 · Look 07",
        title: "Gilded Silk Slip",
        caption: "Bias-cut silk that pours rather than falls, edged in a single gold thread.",
      },
      {
        id: "look-03",
        image: "photo-1515886657613-9f3515b0c78f",
        alt: "Third look — a wool cape photographed in open daylight",
        season: "AW26 · Look 14",
        title: "Noir Wool Cape",
        caption: "One panel of pressed melton, closed by a concealed gilt clasp.",
      },
      {
        id: "look-04",
        image: "photo-1534528741775-53994a69daeb",
        alt: "Closing look — a portrait in a ribbed cashmere column gown",
        season: "AW26 · Look 22",
        title: "Cashmere Column",
        caption: "Knitted in one continuous piece across eleven days on a single frame.",
      },
    ],
  },
  collection: {
    eyebrow: "The Collection",
    title: "Eight pieces, no compromise",
    intro: "The house releases eight garments a season — never more. Every piece is offered in a strictly numbered run and retired the moment the atelier moves on.",
    categoryLabel: "Category",
    viewLabel: "View the piece",
    requestLabel: "Request",
    materialLabel: "Cloth",
    pieces: enPieces,
  },
  story: {
    eyebrow: "The Maison",
    title: "Founded on a single, stubborn idea",
    paragraphs: [
      "NOIR Atelier was opened in 2009 by Camille Aurèle in a former printworks in the third arrondissement. She had spent a decade cutting for other houses and had grown tired of the theatre of excess.",
      "The house keeps one rule above all others: nothing leaves the atelier until it could stay in it forever. Fewer garments, made slower, kept longer.",
    ],
    quote: "We do not chase the season. We make the one coat you will still reach for in twenty years.",
    attribution: "Camille Aurèle",
    role: "Founder & Creative Director",
    stats: [
      { value: "2009", label: "Maison founded" },
      { value: "8", label: "Pieces per season" },
      { value: "11", label: "Hands in the atelier" },
      { value: "1", label: "Address, since day one" },
    ],
    image: "photo-1445205170230-053b83016050",
    imageAlt: "The maison atelier, a rail of finished black garments in raking light",
  },
  atelier: {
    eyebrow: "The Atelier",
    title: "How a NOIR piece is made",
    intro: "There are no production lines here. A single garment passes through four disciplines and, on average, one hundred and forty hours before it is signed.",
    steps: [
      { numeral: "01", title: "The drawing", description: "Every silhouette begins as a single charcoal study, drawn at full scale directly onto the toile." },
      { numeral: "02", title: "The cloth", description: "Fabric is sourced from four mills we have worked with for over a decade, cut only on the straight of grain." },
      { numeral: "03", title: "The hand", description: "Seams are set, pressed and closed by hand. Nothing is fused; every canvas is stitched into place." },
      { numeral: "04", title: "The signature", description: "A gold thread is worked into the inner facing and the maker signs the label before the piece is released." },
    ],
    image: "photo-1487222477894-8943e31ef7b2",
    imageAlt: "Close detail of a tailored lapel being finished by hand at the atelier",
    signature: "Signed, numbered, and archived — every piece, without exception.",
  },
  runway: {
    eyebrow: "The Runway",
    title: "Where to see the collection",
    intro: "NOIR shows to a room of two hundred. Seats are offered by invitation; a limited standing waitlist opens for each city.",
    dateLabel: "Date",
    timeLabel: "Doors",
    statusLabels: { confirmed: "Confirmed", invitation: "By invitation", waitlist: "Waitlist open" },
    events: [
      { id: "paris", city: "Paris", venue: "Palais de Tokyo, Salle Noire", date: "2026-12-31", time: "20:00", label: "AW26 Runway — Chapter One", status: "confirmed" },
      { id: "milan", city: "Milan", venue: "Palazzo Serbelloni", date: "2027-01-18", time: "19:30", label: "AW26 Presentation", status: "invitation" },
      { id: "tokyo", city: "Tokyo", venue: "Omotesandō Pavilion", date: "2027-02-04", time: "18:00", label: "AW26 Salon Showing", status: "waitlist" },
      { id: "new-york", city: "New York", venue: "The Shed, Griffin Theater", date: "2027-02-20", time: "19:00", label: "AW26 Closing Show", status: "invitation" },
    ],
    countdownTitle: "Paris opens in",
    countdownUnits: { days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds" },
    requestSeat: "Request a seat",
  },
  request: {
    triggerEyebrow: "Made for you",
    triggerTitle: "Request a piece",
    triggerBody: "Tell us the garment, your measurements and your city. An atelier client advisor replies within two working days to arrange a private fitting.",
    openCta: "Begin your request",
    modalAria: "Request a piece from NOIR Atelier",
    closeAria: "Close the request form",
    stepLabel: (current: number, total: number) => `Step ${current} of ${total}`,
    steps: [
      { key: "piece", title: "The piece", caption: "Choose the garment and your fit" },
      { key: "you", title: "About you", caption: "Where we should reach you" },
      { key: "review", title: "Review", caption: "Confirm your request" },
    ],
    pieceLabel: "Garment",
    piecePlaceholder: "Select a piece",
    sizeLabel: "Size",
    sizes: [
      { value: "34", label: "FR 34 / US 2" },
      { value: "36", label: "FR 36 / US 4" },
      { value: "38", label: "FR 38 / US 6" },
      { value: "40", label: "FR 40 / US 8" },
      { value: "42", label: "FR 42 / US 10" },
      { value: "bespoke", label: "Bespoke — measured to me" },
    ],
    fitLabel: "Preferred fit",
    fits: [
      { value: "atelier", label: "Atelier (as shown)" },
      { value: "close", label: "Close" },
      { value: "relaxed", label: "Relaxed" },
    ],
    nameLabel: "Full name",
    namePlaceholder: "Camille Aurèle",
    emailLabel: "Email",
    emailPlaceholder: "you@maison.com",
    cityLabel: "City",
    cityPlaceholder: "Paris",
    notesLabel: "Anything we should know",
    notesPlaceholder: "Occasion, timing, or a note on your measurements",
    summaryTitle: "Your request",
    summaryPiece: "Piece",
    summarySize: "Size",
    summaryFit: "Fit",
    summaryContact: "Contact",
    back: "Back",
    next: "Continue",
    submit: "Send request",
    successTitle: "Your request is with the atelier",
    successBody: "A client advisor will write to you within two working days to arrange your fitting. We have reserved the piece against your name in the meantime.",
    reference: "Reference",
    done: "Close",
    requiredHint: "Please complete the highlighted fields to continue.",
  },
  footer: {
    maisonLine: "Cut, made and signed in Paris.",
    address: ["NOIR Atelier", "18 Rue Saint-Merri", "75004 Paris, France"],
    hoursLabel: "The atelier",
    hours: "By appointment — Tuesday to Saturday, 10h to 19h",
    columns: [
      { title: "Maison", links: ["The collection", "Bespoke", "The atelier", "Sustainability", "Careers"] },
      { title: "Client", links: ["Request a piece", "Private viewings", "Care & repair", "Shipping", "Contact"] },
      { title: "Legal", links: ["Terms of sale", "Privacy", "Cookies", "Accessibility"] },
    ],
    social: [
      { label: "Journal", handle: "@noiratelier" },
      { label: "Studio", handle: "studio.noir" },
      { label: "Press", handle: "press@noir" },
    ],
    newsletterTitle: "The correspondence",
    newsletterBody: "A single letter each season — the drawings, the cloth and the show dates, before anyone else.",
    newsletterPlaceholder: "Your email",
    newsletterCta: "Subscribe",
    newsletterAria: "Subscribe to the NOIR Atelier correspondence",
    legal: "© 2026 NOIR Atelier. A concept house.",
    credit: "Concept & build by VigApp",
  },
};

const ptPieces: Piece[] = enPieces.map((p, i) => ({
  ...p,
  price: [22900, 14400, 18900, 21200, 27800, 5300, 25400, 6100][i],
}));

ptPieces[0].name = "O Trench Ônix";
ptPieces[0].category = "Sobretudos";
ptPieces[0].imageAlt = "Modelo com um trench preto longo e estruturado sob luz editorial";
ptPieces[0].cropAlt = "Detalhe da gola do trench e da lapela feita à mão";
ptPieces[0].material = "Gabardine italiana dupla face";
ptPieces[1].name = "Slip de Seda Dourada";
ptPieces[1].category = "Alta-noite";
ptPieces[1].imageAlt = "Modelo editorial em um vestido slip de seda em tom dourado";
ptPieces[1].cropAlt = "Detalhe da seda em viés caindo sobre o ombro";
ptPieces[1].material = "Seda lavada cortada em viés";
ptPieces[2].name = "Capa de Lã Noir";
ptPieces[2].category = "Sobretudos";
ptPieces[2].imageAlt = "Modelo ao ar livre em uma capa preta de lã ampla";
ptPieces[2].cropAlt = "Caimento da capa fotografado em uma rua clara";
ptPieces[2].material = "Melton de lã virgem prensada";
ptPieces[3].name = "Smoking do Atelier";
ptPieces[3].category = "Alfaiataria";
ptPieces[3].imageAlt = "Jaqueta de smoking preta e precisa vestida em uma modelo";
ptPieces[3].cropAlt = "Detalhe da lapela de cetim e dos botões encapados";
ptPieces[3].material = "Lã grain-de-poudre com detalhes em cetim";
ptPieces[4].name = "Vestido Coluna de Cashmere";
ptPieces[4].category = "Alta-noite";
ptPieces[4].imageAlt = "Retrato de modelo em vestido coluna de cashmere até o chão";
ptPieces[4].cropAlt = "Detalhe da costura e do decote em tricô de cashmere";
ptPieces[4].material = "Cashmere mongol canelado";
ptPieces[5].name = "Blusa de Charmeuse Marfim";
ptPieces[5].category = "Prêt-à-porter";
ptPieces[5].imageAlt = "Blusa de charmeuse marfim apresentada em interior claro";
ptPieces[5].cropAlt = "Detalhe da arara com a blusa ao lado de peças coordenadas";
ptPieces[5].material = "Charmeuse de seda, costuras francesas";
ptPieces[6].name = "Casaco de Couro Estruturado";
ptPieces[6].category = "Sobretudos";
ptPieces[6].imageAlt = "Modelo na rua com um casaco de couro preto estruturado";
ptPieces[6].cropAlt = "Ombro e lapela do casaco de couro à luz do dia";
ptPieces[6].material = "Couro nappa curtido a vegetal";
ptPieces[7].name = "Calça de Crepe Fluido";
ptPieces[7].category = "Alfaiataria";
ptPieces[7].imageAlt = "Calça de crepe fluido apresentada em uma arara";
ptPieces[7].cropAlt = "Detalhe do tecido na perna fluida da calça de crepe";
ptPieces[7].material = "Crepe de lã fluido";

const ptContent: NoirContent = {
  format: { locale: "pt-BR", currency: "BRL" },
  header: {
    navAria: "Navegação principal da NOIR Atelier",
    nav: [
      { href: "#lookbook", label: "Lookbook" },
      { href: "#collection", label: "Coleção" },
      { href: "#maison", label: "Maison" },
      { href: "#atelier", label: "Atelier" },
      { href: "#runway", label: "Desfile" },
    ],
    requestCta: "Solicitar uma peça",
  },
  hero: {
    eyebrow: "Outono / Inverno 2026 — Capítulo Um",
    title: "Silêncio,",
    titleItalic: "sob medida",
    lede: "Um guarda-roupa cortado em preto absoluto e folha de ouro. Cada peça é desenhada uma vez, feita uma vez e acabada por um único par de mãos no atelier da Rue Saint-Merri.",
    primaryCta: "Entrar na coleção",
    secondaryCta: "Agendar uma visita privada",
    lookLabel: "Look",
    prevAria: "Look anterior",
    nextAria: "Próximo look",
    pauseAria: "Pausar o lookbook",
    playAria: "Reproduzir o lookbook",
    indexAria: (n: number) => `Mostrar o look ${n}`,
    looks: [
      {
        id: "look-01",
        image: "photo-1469334031218-e382a71b716b",
        alt: "Look de abertura — um trench preto que roça o chão sob luz de galeria",
        season: "AW26 · Look 01",
        title: "O Trench Ônix",
        caption: "Gabardine dupla face, cinto enrolado à mão, trinta e um metros de pesponto.",
      },
      {
        id: "look-02",
        image: "photo-1509631179647-0177331693ae",
        alt: "Segundo look — seda dourada fluida captando a luz em movimento",
        season: "AW26 · Look 07",
        title: "Slip de Seda Dourada",
        caption: "Seda em viés que escorre em vez de cair, rematada por um único fio de ouro.",
      },
      {
        id: "look-03",
        image: "photo-1515886657613-9f3515b0c78f",
        alt: "Terceiro look — uma capa de lã fotografada em plena luz do dia",
        season: "AW26 · Look 14",
        title: "Capa de Lã Noir",
        caption: "Um único painel de melton prensado, fechado por um gancho dourado escondido.",
      },
      {
        id: "look-04",
        image: "photo-1534528741775-53994a69daeb",
        alt: "Look de encerramento — um retrato em vestido coluna de cashmere canelado",
        season: "AW26 · Look 22",
        title: "Coluna de Cashmere",
        caption: "Tricotado em uma peça contínua ao longo de onze dias em um único tear.",
      },
    ],
  },
  collection: {
    eyebrow: "A Coleção",
    title: "Oito peças, sem concessões",
    intro: "A casa lança oito peças por temporada — nunca mais que isso. Cada peça é oferecida em tiragem rigorosamente numerada e aposentada assim que o atelier segue em frente.",
    categoryLabel: "Categoria",
    viewLabel: "Ver a peça",
    requestLabel: "Solicitar",
    materialLabel: "Tecido",
    pieces: ptPieces,
  },
  story: {
    eyebrow: "A Maison",
    title: "Fundada sobre uma única ideia teimosa",
    paragraphs: [
      "A NOIR Atelier foi aberta em 2009 por Camille Aurèle em uma antiga gráfica no terceiro arrondissement. Ela havia passado uma década cortando para outras casas e se cansou do teatro do excesso.",
      "A casa mantém uma regra acima de todas as outras: nada deixa o atelier até que pudesse permanecer nele para sempre. Menos peças, feitas mais devagar, guardadas por mais tempo.",
    ],
    quote: "Não corremos atrás da temporada. Fazemos o único casaco que você ainda vai querer vestir daqui a vinte anos.",
    attribution: "Camille Aurèle",
    role: "Fundadora e Diretora Criativa",
    stats: [
      { value: "2009", label: "Maison fundada" },
      { value: "8", label: "Peças por temporada" },
      { value: "11", label: "Mãos no atelier" },
      { value: "1", label: "Endereço, desde o início" },
    ],
    image: "photo-1445205170230-053b83016050",
    imageAlt: "O atelier da maison, uma arara de peças pretas acabadas sob luz rasante",
  },
  atelier: {
    eyebrow: "O Atelier",
    title: "Como nasce uma peça NOIR",
    intro: "Aqui não há linhas de produção. Uma única peça atravessa quatro disciplinas e, em média, cento e quarenta horas antes de ser assinada.",
    steps: [
      { numeral: "01", title: "O desenho", description: "Cada silhueta começa como um único estudo a carvão, desenhado em escala real diretamente sobre a toile." },
      { numeral: "02", title: "O tecido", description: "O tecido vem de quatro tecelagens com quem trabalhamos há mais de uma década, cortado sempre no fio reto." },
      { numeral: "03", title: "A mão", description: "As costuras são montadas, prensadas e fechadas à mão. Nada é colado; cada entretela é chuleada no lugar." },
      { numeral: "04", title: "A assinatura", description: "Um fio de ouro é bordado na entretela interna e o artesão assina a etiqueta antes de a peça ser liberada." },
    ],
    image: "photo-1487222477894-8943e31ef7b2",
    imageAlt: "Detalhe de uma lapela sendo acabada à mão no atelier",
    signature: "Assinada, numerada e arquivada — cada peça, sem exceção.",
  },
  runway: {
    eyebrow: "O Desfile",
    title: "Onde ver a coleção",
    intro: "A NOIR desfila para uma sala de duzentos. Os assentos são oferecidos por convite; uma lista de espera limitada, em pé, abre para cada cidade.",
    dateLabel: "Data",
    timeLabel: "Portas",
    statusLabels: { confirmed: "Confirmado", invitation: "Por convite", waitlist: "Lista aberta" },
    events: [
      { id: "paris", city: "Paris", venue: "Palais de Tokyo, Salle Noire", date: "2026-12-31", time: "20:00", label: "Desfile AW26 — Capítulo Um", status: "confirmed" },
      { id: "milan", city: "Milão", venue: "Palazzo Serbelloni", date: "2027-01-18", time: "19:30", label: "Apresentação AW26", status: "invitation" },
      { id: "tokyo", city: "Tóquio", venue: "Omotesandō Pavilion", date: "2027-02-04", time: "18:00", label: "Salão AW26", status: "waitlist" },
      { id: "new-york", city: "Nova York", venue: "The Shed, Griffin Theater", date: "2027-02-20", time: "19:00", label: "Desfile de Encerramento AW26", status: "invitation" },
    ],
    countdownTitle: "Paris abre em",
    countdownUnits: { days: "Dias", hours: "Horas", minutes: "Minutos", seconds: "Segundos" },
    requestSeat: "Solicitar um assento",
  },
  request: {
    triggerEyebrow: "Feita para você",
    triggerTitle: "Solicitar uma peça",
    triggerBody: "Diga-nos a peça, suas medidas e sua cidade. Uma consultora do atelier responde em até dois dias úteis para agendar uma prova privada.",
    openCta: "Iniciar sua solicitação",
    modalAria: "Solicitar uma peça da NOIR Atelier",
    closeAria: "Fechar o formulário de solicitação",
    stepLabel: (current: number, total: number) => `Etapa ${current} de ${total}`,
    steps: [
      { key: "piece", title: "A peça", caption: "Escolha a peça e o seu caimento" },
      { key: "you", title: "Sobre você", caption: "Onde devemos encontrá-la" },
      { key: "review", title: "Revisão", caption: "Confirme sua solicitação" },
    ],
    pieceLabel: "Peça",
    piecePlaceholder: "Selecione uma peça",
    sizeLabel: "Tamanho",
    sizes: [
      { value: "34", label: "FR 34 / BR 36" },
      { value: "36", label: "FR 36 / BR 38" },
      { value: "38", label: "FR 38 / BR 40" },
      { value: "40", label: "FR 40 / BR 42" },
      { value: "42", label: "FR 42 / BR 44" },
      { value: "bespoke", label: "Sob medida — tirada em mim" },
    ],
    fitLabel: "Caimento preferido",
    fits: [
      { value: "atelier", label: "Atelier (como no desfile)" },
      { value: "close", label: "Justo" },
      { value: "relaxed", label: "Solto" },
    ],
    nameLabel: "Nome completo",
    namePlaceholder: "Camille Aurèle",
    emailLabel: "Email",
    emailPlaceholder: "voce@maison.com",
    cityLabel: "Cidade",
    cityPlaceholder: "São Paulo",
    notesLabel: "Algo que devemos saber",
    notesPlaceholder: "Ocasião, prazo ou uma nota sobre suas medidas",
    summaryTitle: "Sua solicitação",
    summaryPiece: "Peça",
    summarySize: "Tamanho",
    summaryFit: "Caimento",
    summaryContact: "Contato",
    back: "Voltar",
    next: "Continuar",
    submit: "Enviar solicitação",
    successTitle: "Sua solicitação está com o atelier",
    successBody: "Uma consultora escreverá para você em até dois dias úteis para agendar sua prova. Reservamos a peça em seu nome enquanto isso.",
    reference: "Referência",
    done: "Fechar",
    requiredHint: "Preencha os campos destacados para continuar.",
  },
  footer: {
    maisonLine: "Cortada, feita e assinada em Paris.",
    address: ["NOIR Atelier", "18 Rue Saint-Merri", "75004 Paris, França"],
    hoursLabel: "O atelier",
    hours: "Com hora marcada — de terça a sábado, das 10h às 19h",
    columns: [
      { title: "Maison", links: ["A coleção", "Sob medida", "O atelier", "Sustentabilidade", "Trabalhe conosco"] },
      { title: "Cliente", links: ["Solicitar uma peça", "Visitas privadas", "Cuidado e reparo", "Envio", "Contato"] },
      { title: "Legal", links: ["Termos de venda", "Privacidade", "Cookies", "Acessibilidade"] },
    ],
    social: [
      { label: "Journal", handle: "@noiratelier" },
      { label: "Studio", handle: "studio.noir" },
      { label: "Imprensa", handle: "press@noir" },
    ],
    newsletterTitle: "A correspondência",
    newsletterBody: "Uma única carta a cada temporada — os desenhos, o tecido e as datas dos desfiles, antes de todo mundo.",
    newsletterPlaceholder: "Seu email",
    newsletterCta: "Inscrever-se",
    newsletterAria: "Inscrever-se na correspondência da NOIR Atelier",
    legal: "© 2026 NOIR Atelier. Uma casa conceito.",
    credit: "Conceito e desenvolvimento por VigApp",
  },
};

const esPieces: Piece[] = enPieces.map((p, i) => ({
  ...p,
  price: [3900, 2450, 3200, 3600, 4700, 910, 4350, 1040][i],
}));

esPieces[0].name = "El Trench Ónix";
esPieces[0].category = "Abrigos";
esPieces[0].imageAlt = "Modelo con un trench negro largo y estructurado bajo luz editorial";
esPieces[0].cropAlt = "Detalle del cuello del trench y la solapa cosida a mano";
esPieces[0].material = "Gabardina italiana de doble cara";
esPieces[1].name = "Slip de Seda Dorada";
esPieces[1].category = "Noche";
esPieces[1].imageAlt = "Modelo editorial con un vestido slip de seda en tono dorado";
esPieces[1].cropAlt = "Detalle de la seda al bies cayendo sobre el hombro";
esPieces[1].material = "Seda lavada cortada al bies";
esPieces[2].name = "Capa de Lana Noir";
esPieces[2].category = "Abrigos";
esPieces[2].imageAlt = "Modelo al aire libre con una amplia capa negra de lana";
esPieces[2].cropAlt = "Caída de la capa fotografiada en una calle luminosa";
esPieces[2].material = "Melton de lana virgen prensada";
esPieces[3].name = "Esmoquin del Atelier";
esPieces[3].category = "Sastrería";
esPieces[3].imageAlt = "Chaqueta de esmoquin negra y precisa sobre una modelo";
esPieces[3].cropAlt = "Detalle de la solapa de raso y los botones forrados";
esPieces[3].material = "Lana grain-de-poudre con acabados de raso";
esPieces[4].name = "Vestido Columna de Cachemira";
esPieces[4].category = "Noche";
esPieces[4].imageAlt = "Retrato de una modelo con un vestido columna de cachemira hasta el suelo";
esPieces[4].cropAlt = "Detalle de la costura y el escote en punto de cachemira";
esPieces[4].material = "Cachemira mongola acanalada";
esPieces[5].name = "Blusa de Charmeuse Marfil";
esPieces[5].category = "Prêt-à-porter";
esPieces[5].imageAlt = "Blusa de charmeuse marfil presentada en un interior luminoso";
esPieces[5].cropAlt = "Detalle del perchero con la blusa junto a piezas coordinadas";
esPieces[5].material = "Charmeuse de seda, costuras francesas";
esPieces[6].name = "Abrigo de Cuero Estructurado";
esPieces[6].category = "Abrigos";
esPieces[6].imageAlt = "Modelo en la calle con un abrigo de cuero negro estructurado";
esPieces[6].cropAlt = "Hombro y solapa del abrigo de cuero a la luz del día";
esPieces[6].material = "Cuero napa curtido al vegetal";
esPieces[7].name = "Pantalón de Crepé Fluido";
esPieces[7].category = "Sastrería";
esPieces[7].imageAlt = "Pantalón de crepé fluido presentado en un perchero";
esPieces[7].cropAlt = "Detalle del tejido en la pernera fluida del pantalón de crepé";
esPieces[7].material = "Crepé de lana fluido";

const esContent: NoirContent = {
  format: { locale: "es-ES", currency: "EUR" },
  header: {
    navAria: "Navegación principal de NOIR Atelier",
    nav: [
      { href: "#lookbook", label: "Lookbook" },
      { href: "#collection", label: "Colección" },
      { href: "#maison", label: "Maison" },
      { href: "#atelier", label: "Atelier" },
      { href: "#runway", label: "Desfile" },
    ],
    requestCta: "Solicitar una pieza",
  },
  hero: {
    eyebrow: "Otoño / Invierno 2026 — Capítulo Uno",
    title: "Silencio,",
    titleItalic: "a medida",
    lede: "Un guardarropa cortado en negro absoluto y pan de oro. Cada prenda se dibuja una vez, se confecciona una vez y la termina un único par de manos en el atelier de la Rue Saint-Merri.",
    primaryCta: "Entrar en la colección",
    secondaryCta: "Reservar una visita privada",
    lookLabel: "Look",
    prevAria: "Look anterior",
    nextAria: "Look siguiente",
    pauseAria: "Pausar el lookbook",
    playAria: "Reproducir el lookbook",
    indexAria: (n: number) => `Mostrar el look ${n}`,
    looks: [
      {
        id: "look-01",
        image: "photo-1469334031218-e382a71b716b",
        alt: "Look de apertura — un trench negro que roza el suelo bajo luz de galería",
        season: "AW26 · Look 01",
        title: "El Trench Ónix",
        caption: "Gabardina de doble cara, cinturón enrollado a mano, treinta y un metros de pespunte.",
      },
      {
        id: "look-02",
        image: "photo-1509631179647-0177331693ae",
        alt: "Segundo look — seda dorada fluida captando la luz en movimiento",
        season: "AW26 · Look 07",
        title: "Slip de Seda Dorada",
        caption: "Seda al bies que se derrama en lugar de caer, rematada por un único hilo de oro.",
      },
      {
        id: "look-03",
        image: "photo-1515886657613-9f3515b0c78f",
        alt: "Tercer look — una capa de lana fotografiada a plena luz del día",
        season: "AW26 · Look 14",
        title: "Capa de Lana Noir",
        caption: "Un solo panel de melton prensado, cerrado por un broche dorado oculto.",
      },
      {
        id: "look-04",
        image: "photo-1534528741775-53994a69daeb",
        alt: "Look de cierre — un retrato con un vestido columna de cachemira acanalada",
        season: "AW26 · Look 22",
        title: "Columna de Cachemira",
        caption: "Tejido en una sola pieza continua a lo largo de once días en un único telar.",
      },
    ],
  },
  collection: {
    eyebrow: "La Colección",
    title: "Ocho piezas, sin concesiones",
    intro: "La casa lanza ocho prendas por temporada — nunca más. Cada pieza se ofrece en una tirada estrictamente numerada y se retira en cuanto el atelier avanza.",
    categoryLabel: "Categoría",
    viewLabel: "Ver la pieza",
    requestLabel: "Solicitar",
    materialLabel: "Tejido",
    pieces: esPieces,
  },
  story: {
    eyebrow: "La Maison",
    title: "Fundada sobre una única idea obstinada",
    paragraphs: [
      "NOIR Atelier abrió en 2009 de la mano de Camille Aurèle en una antigua imprenta del tercer distrito. Había pasado una década cortando para otras casas y se había cansado del teatro del exceso.",
      "La casa mantiene una regla por encima de todas: nada sale del atelier hasta que podría quedarse en él para siempre. Menos prendas, hechas más despacio, conservadas más tiempo.",
    ],
    quote: "No perseguimos la temporada. Hacemos el único abrigo que seguirás buscando dentro de veinte años.",
    attribution: "Camille Aurèle",
    role: "Fundadora y Directora Creativa",
    stats: [
      { value: "2009", label: "Maison fundada" },
      { value: "8", label: "Piezas por temporada" },
      { value: "11", label: "Manos en el atelier" },
      { value: "1", label: "Dirección, desde el inicio" },
    ],
    image: "photo-1445205170230-053b83016050",
    imageAlt: "El atelier de la maison, un perchero de prendas negras terminadas bajo luz rasante",
  },
  atelier: {
    eyebrow: "El Atelier",
    title: "Cómo nace una pieza NOIR",
    intro: "Aquí no hay cadenas de producción. Una sola prenda atraviesa cuatro disciplinas y, de media, ciento cuarenta horas antes de ser firmada.",
    steps: [
      { numeral: "01", title: "El dibujo", description: "Cada silueta comienza como un único estudio al carboncillo, dibujado a escala real directamente sobre la toile." },
      { numeral: "02", title: "El tejido", description: "El tejido procede de cuatro fábricas con las que trabajamos desde hace más de una década, cortado solo al hilo recto." },
      { numeral: "03", title: "La mano", description: "Las costuras se montan, se planchan y se cierran a mano. Nada se termofusiona; cada entretela se cose en su sitio." },
      { numeral: "04", title: "La firma", description: "Un hilo de oro se borda en la entretela interior y el artesano firma la etiqueta antes de liberar la pieza." },
    ],
    image: "photo-1487222477894-8943e31ef7b2",
    imageAlt: "Detalle de una solapa siendo terminada a mano en el atelier",
    signature: "Firmada, numerada y archivada — cada pieza, sin excepción.",
  },
  runway: {
    eyebrow: "El Desfile",
    title: "Dónde ver la colección",
    intro: "NOIR desfila ante una sala de doscientos. Los asientos se ofrecen por invitación; una lista de espera limitada, de pie, se abre para cada ciudad.",
    dateLabel: "Fecha",
    timeLabel: "Puertas",
    statusLabels: { confirmed: "Confirmado", invitation: "Por invitación", waitlist: "Lista abierta" },
    events: [
      { id: "paris", city: "París", venue: "Palais de Tokyo, Salle Noire", date: "2026-12-31", time: "20:00", label: "Desfile AW26 — Capítulo Uno", status: "confirmed" },
      { id: "milan", city: "Milán", venue: "Palazzo Serbelloni", date: "2027-01-18", time: "19:30", label: "Presentación AW26", status: "invitation" },
      { id: "tokyo", city: "Tokio", venue: "Omotesandō Pavilion", date: "2027-02-04", time: "18:00", label: "Salón AW26", status: "waitlist" },
      { id: "new-york", city: "Nueva York", venue: "The Shed, Griffin Theater", date: "2027-02-20", time: "19:00", label: "Desfile de Cierre AW26", status: "invitation" },
    ],
    countdownTitle: "París abre en",
    countdownUnits: { days: "Días", hours: "Horas", minutes: "Minutos", seconds: "Segundos" },
    requestSeat: "Solicitar un asiento",
  },
  request: {
    triggerEyebrow: "Hecha para ti",
    triggerTitle: "Solicitar una pieza",
    triggerBody: "Cuéntanos la prenda, tus medidas y tu ciudad. Una asesora del atelier responde en un plazo de dos días laborables para concertar una prueba privada.",
    openCta: "Comenzar tu solicitud",
    modalAria: "Solicitar una pieza de NOIR Atelier",
    closeAria: "Cerrar el formulario de solicitud",
    stepLabel: (current: number, total: number) => `Paso ${current} de ${total}`,
    steps: [
      { key: "piece", title: "La pieza", caption: "Elige la prenda y tu caída" },
      { key: "you", title: "Sobre ti", caption: "Dónde localizarte" },
      { key: "review", title: "Revisión", caption: "Confirma tu solicitud" },
    ],
    pieceLabel: "Prenda",
    piecePlaceholder: "Selecciona una pieza",
    sizeLabel: "Talla",
    sizes: [
      { value: "34", label: "FR 34 / ES 36" },
      { value: "36", label: "FR 36 / ES 38" },
      { value: "38", label: "FR 38 / ES 40" },
      { value: "40", label: "FR 40 / ES 42" },
      { value: "42", label: "FR 42 / ES 44" },
      { value: "bespoke", label: "A medida — tomada sobre mí" },
    ],
    fitLabel: "Caída preferida",
    fits: [
      { value: "atelier", label: "Atelier (como en desfile)" },
      { value: "close", label: "Ajustada" },
      { value: "relaxed", label: "Holgada" },
    ],
    nameLabel: "Nombre completo",
    namePlaceholder: "Camille Aurèle",
    emailLabel: "Email",
    emailPlaceholder: "tu@maison.com",
    cityLabel: "Ciudad",
    cityPlaceholder: "Madrid",
    notesLabel: "Algo que debamos saber",
    notesPlaceholder: "Ocasión, plazos o una nota sobre tus medidas",
    summaryTitle: "Tu solicitud",
    summaryPiece: "Pieza",
    summarySize: "Talla",
    summaryFit: "Caída",
    summaryContact: "Contacto",
    back: "Atrás",
    next: "Continuar",
    submit: "Enviar solicitud",
    successTitle: "Tu solicitud está en el atelier",
    successBody: "Una asesora te escribirá en un plazo de dos días laborables para concertar tu prueba. Hemos reservado la pieza a tu nombre mientras tanto.",
    reference: "Referencia",
    done: "Cerrar",
    requiredHint: "Completa los campos resaltados para continuar.",
  },
  footer: {
    maisonLine: "Cortada, confeccionada y firmada en París.",
    address: ["NOIR Atelier", "18 Rue Saint-Merri", "75004 París, Francia"],
    hoursLabel: "El atelier",
    hours: "Con cita previa — de martes a sábado, de 10h a 19h",
    columns: [
      { title: "Maison", links: ["La colección", "A medida", "El atelier", "Sostenibilidad", "Empleo"] },
      { title: "Cliente", links: ["Solicitar una pieza", "Visitas privadas", "Cuidado y reparación", "Envíos", "Contacto"] },
      { title: "Legal", links: ["Términos de venta", "Privacidad", "Cookies", "Accesibilidad"] },
    ],
    social: [
      { label: "Journal", handle: "@noiratelier" },
      { label: "Studio", handle: "studio.noir" },
      { label: "Prensa", handle: "press@noir" },
    ],
    newsletterTitle: "La correspondencia",
    newsletterBody: "Una sola carta cada temporada — los dibujos, el tejido y las fechas del desfile, antes que nadie.",
    newsletterPlaceholder: "Tu email",
    newsletterCta: "Suscribirse",
    newsletterAria: "Suscribirse a la correspondencia de NOIR Atelier",
    legal: "© 2026 NOIR Atelier. Una casa concepto.",
    credit: "Concepto y desarrollo por VigApp",
  },
};

export const noirDictionary: DemoDictionary<NoirContent> = {
  en: enContent,
  pt: ptContent,
  es: esContent,
};
