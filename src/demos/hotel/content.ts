import type { DemoDictionary } from "@/demos/content";

export interface SuiteImage {
  src: string;
  alt: string;
}

export interface Suite {
  id: string;
  name: string;
  tier: string;
  sleeps: string;
  size: string;
  view: string;
  rate: number;
  blurb: string;
  amenities: string[];
  images: SuiteImage[];
}

export interface Retreat {
  id: string;
  kind: string;
  name: string;
  description: string;
  detail: string;
  hours: string;
  image: SuiteImage;
}

export interface Experience {
  id: string;
  name: string;
  duration: string;
  time: string;
  description: string;
  image: SuiteImage;
}

export interface GalleryShot {
  src: string;
  alt: string;
  caption: string;
}

export interface Review {
  id: string;
  quote: string;
  name: string;
  origin: string;
  suite: string;
  rating: number;
}

export interface HotelContent {
  format: { locale: string; currency: string };
  header: {
    tagline: string;
    navAria: string;
    nav: { href: string; label: string }[];
    bookCta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleItalic: string;
    lede: string;
    imageAlt: string;
    stats: { value: string; label: string }[];
    scrollCue: string;
  };
  widget: {
    title: string;
    checkInLabel: string;
    checkOutLabel: string;
    guestsLabel: string;
    suiteLabel: string;
    nightSingular: string;
    nightPlural: string;
    perNight: string;
    estimateLabel: string;
    fromLabel: string;
    submitCta: string;
    emptyHint: string;
    invalidHint: string;
    guestSingular: string;
    guestPlural: string;
    decreaseAria: string;
    increaseAria: string;
    taxNote: string;
  };
  suites: {
    eyebrow: string;
    title: string;
    intro: string;
    sleepsLabel: string;
    sizeLabel: string;
    viewLabel: string;
    amenitiesLabel: string;
    perNight: string;
    fromLabel: string;
    reserveCta: string;
    galleryHint: string;
    nextAria: string;
    prevAria: string;
    items: Suite[];
  };
  retreat: {
    eyebrow: string;
    title: string;
    intro: string;
    hoursLabel: string;
    items: Retreat[];
  };
  experiences: {
    eyebrow: string;
    title: string;
    intro: string;
    durationLabel: string;
    scrollHint: string;
    nextAria: string;
    prevAria: string;
    items: Experience[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    intro: string;
    closeAria: string;
    nextAria: string;
    prevAria: string;
    shots: GalleryShot[];
  };
  reviews: {
    eyebrow: string;
    title: string;
    intro: string;
    ratingLabel: string;
    items: Review[];
  };
  booking: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
    phone: string;
    phoneLabel: string;
  };
  footer: {
    tagline: string;
    address: string[];
    columns: { title: string; links: string[] }[];
    social: { label: string; kind: "at" | "camera" | "share" | "globe" }[];
    newsletterTitle: string;
    newsletterBody: string;
    newsletterPlaceholder: string;
    newsletterCta: string;
    newsletterDone: string;
    rights: string;
    credit: string;
  };
}

const IMG = "https://images.unsplash.com/";
const q = (id: string, w: number) => `${IMG}${id}?auto=format&fit=crop&w=${w}&q=80`;

// Photography IDs (subject best-guess, art-directed defensively).
const P_POOL = "photo-1566073771259-6a8506099945";
const P_ROOM = "photo-1582719508461-905c673771fd";
const P_RESORT = "photo-1520250497591-112f2f40a3f4";
const P_SUITE = "photo-1551882547-ff40c63fe5fa";
const P_EXTERIOR = "photo-1542314831-068cd1dbfeeb";
const P_TOWELS = "photo-1544161515-4ab6ce6db874";
const P_STONES = "photo-1600334129128-685c5582fd35";
const P_FOREST = "photo-1441974231531-c6227db76b6e";
const P_MIST = "photo-1470071459604-3b5ec3a7fe05";

const en: HotelContent = {
  format: { locale: "en-US", currency: "USD" },
  header: {
    tagline: "Forest Retreat & Spa",
    navAria: "Primary",
    nav: [
      { href: "#suites", label: "Suites" },
      { href: "#retreat", label: "Dining & Spa" },
      { href: "#experiences", label: "Experiences" },
      { href: "#gallery", label: "Gallery" },
      { href: "#reviews", label: "Guests" },
    ],
    bookCta: "Book a stay",
  },
  hero: {
    eyebrow: "Aravaipa Valley — Established 1974",
    title: "Where the pines",
    titleItalic: "hold their breath",
    lede: "A quiet estate folded into old-growth forest. Forty rooms, one lake, and the kind of silence you can feel in your chest. Come slow down on purpose.",
    imageAlt: "Misty pine forest at dawn surrounding The Solace estate",
    stats: [
      { value: "40", label: "Rooms & suites" },
      { value: "220", label: "Acres of forest" },
      { value: "1", label: "Spring-fed lake" },
    ],
    scrollCue: "Scroll to wander",
  },
  widget: {
    title: "Check availability",
    checkInLabel: "Arrival",
    checkOutLabel: "Departure",
    guestsLabel: "Guests",
    suiteLabel: "Suite",
    nightSingular: "night",
    nightPlural: "nights",
    perNight: "per night",
    estimateLabel: "Estimated stay",
    fromLabel: "From",
    submitCta: "Reserve these dates",
    emptyHint: "Choose your dates to see an estimate.",
    invalidHint: "Departure must fall after arrival.",
    guestSingular: "guest",
    guestPlural: "guests",
    decreaseAria: "Remove a guest",
    increaseAria: "Add a guest",
    taxNote: "Estimate excludes tax and the daily forest levy.",
  },
  suites: {
    eyebrow: "Where you rest",
    title: "Three ways to stay",
    intro: "Every room faces the trees. Linen, brass, and wood warmed by a wood stove — nothing between you and the forest but a pane of glass.",
    sleepsLabel: "Sleeps",
    sizeLabel: "Size",
    viewLabel: "Outlook",
    amenitiesLabel: "In every stay",
    perNight: "per night",
    fromLabel: "From",
    reserveCta: "Reserve this suite",
    galleryHint: "Tap to browse the room",
    nextAria: "Next photo",
    prevAria: "Previous photo",
    items: [
      {
        id: "canopy",
        name: "Canopy Room",
        tier: "Room",
        sleeps: "2 guests",
        size: "34 m²",
        view: "Treetop canopy",
        rate: 420,
        blurb: "A snug corner room lifted into the branches, with a reading nook built into the window and a deep soaking tub carved from local stone.",
        amenities: [
          "King bed dressed in Belgian linen",
          "Wood-burning stove",
          "Stone soaking tub",
          "Filter coffee & loose-leaf tea bar",
        ],
        images: [
          { src: q(P_ROOM, 1400), alt: "Canopy Room with a linen-dressed bed facing tall windows" },
          { src: q(P_SUITE, 1400), alt: "Reading nook and stone tub in the Canopy Room" },
        ],
      },
      {
        id: "pinewood",
        name: "Pinewood Suite",
        tier: "Suite",
        sleeps: "2 guests",
        size: "58 m²",
        view: "Forest & meadow",
        rate: 680,
        blurb: "A full suite with a separate sitting room, a private cedar deck, and an outdoor shower open to the sky and the sound of the wind through the pines.",
        amenities: [
          "Separate sitting room & wood stove",
          "Private cedar deck",
          "Open-air rain shower",
          "Nightly turndown with forest honey",
        ],
        images: [
          { src: q(P_SUITE, 1400), alt: "Pinewood Suite sitting room bathed in afternoon light" },
          { src: q(P_RESORT, 1400), alt: "Private cedar deck of the Pinewood Suite over the forest" },
        ],
      },
      {
        id: "lakeside",
        name: "Lakeside Retreat",
        tier: "Villa",
        sleeps: "4 guests",
        size: "96 m²",
        view: "Private lakefront",
        rate: 1150,
        blurb: "A standalone timber villa on the water's edge with a wood-fired hot tub, its own dock, and a hearth built for long evenings and longer conversations.",
        amenities: [
          "Two bedrooms & double-height hearth",
          "Wood-fired lakeside hot tub",
          "Private dock & rowboat",
          "Dedicated retreat host & in-villa dining",
        ],
        images: [
          { src: q(P_POOL, 1400), alt: "Lakeside Retreat villa reflected in still water at dusk" },
          { src: q(P_EXTERIOR, 1400), alt: "Timber facade of the Lakeside Retreat among the pines" },
        ],
      },
    ],
  },
  retreat: {
    eyebrow: "Dining & Spa",
    title: "Fed by the forest, softened by the water",
    intro: "Two houses anchor life at The Solace: a hearth kitchen that cooks whatever the valley is growing, and a spring-water spa carved into the hillside.",
    hoursLabel: "Open",
    items: [
      {
        id: "hearth",
        kind: "The Table",
        name: "Ember & Root",
        description: "A single nightly menu drawn from the estate garden, the smokehouse, and whatever the foragers carry back from the treeline.",
        detail: "Chef Nadia Fontaine cooks five courses over open fire — wild mushroom broth, cedar-smoked trout, honey from our own hives. Seats thirty at communal oak tables.",
        hours: "Dinner nightly, 18:30 – 22:00",
        image: { src: q(P_RESORT, 1200), alt: "Candlelit communal dining room glowing at dusk" },
      },
      {
        id: "spa",
        kind: "The Spa",
        name: "Springhouse",
        description: "Spring-fed thermal pools, a cedar sauna, and treatments built around forest botanicals and warm river stones.",
        detail: "Move between hot and cold pools, breathe in the eucalyptus steam room, then surrender to the signature pine-and-birch ritual. Reserve a private hour for two.",
        hours: "Daily, 07:00 – 21:00",
        image: { src: q(P_STONES, 1200), alt: "Warm spa stones and folded linen towels at Springhouse" },
      },
    ],
  },
  experiences: {
    eyebrow: "Days here",
    title: "Reasons to leave the room",
    intro: "Guided or entirely alone — the valley opens up at whatever pace you keep. Each experience is included; simply tell the front desk the night before.",
    durationLabel: "Duration",
    scrollHint: "Drag or scroll to explore",
    nextAria: "Next experience",
    prevAria: "Previous experience",
    items: [
      {
        id: "forest-bathing",
        name: "Forest bathing at first light",
        duration: "90 minutes",
        time: "Daily at dawn",
        description: "A slow, guided walk into the old growth where you do nothing but notice — light, moss, birdsong, the smell of the earth waking up.",
        image: { src: q(P_FOREST, 1200), alt: "Sunbeams cutting through a dense stand of tall trees" },
      },
      {
        id: "lake",
        name: "Morning row on the lake",
        duration: "60 minutes",
        time: "07:00 & 10:00",
        description: "Take a wooden rowboat out across water so still it doubles the sky. Coffee and a warm blanket wait for you on the dock.",
        image: { src: q(P_MIST, 1200), alt: "Mist lifting off a mirror-still forest lake at dawn" },
      },
      {
        id: "trails",
        name: "The ridgeline trail",
        duration: "3 hours",
        time: "By arrangement",
        description: "A guided ascent to the overlook where the whole valley falls away beneath you. Packed lunch of estate bread, cheese, and preserves included.",
        image: { src: q(P_EXTERIOR, 1200), alt: "Forest trail climbing toward a ridgeline overlook" },
      },
      {
        id: "hearthfire",
        name: "Hearthfire & starlight",
        duration: "Evening",
        time: "After dinner",
        description: "Gather at the outdoor fire with mulled cider and a valley astronomer who reads the sky the way others read a book.",
        image: { src: q(P_MIST, 1200), alt: "Firelight glowing against the dark treeline at night" },
      },
    ],
  },
  gallery: {
    eyebrow: "The estate",
    title: "A closer look",
    intro: "Wander the grounds before you arrive.",
    closeAria: "Close gallery",
    nextAria: "Next image",
    prevAria: "Previous image",
    shots: [
      { src: q(P_MIST, 1400), alt: "Mist over the forest lake at sunrise", caption: "The lake at first light" },
      { src: q(P_ROOM, 1200), alt: "Linen-dressed suite bed by tall windows", caption: "Inside a Canopy Room" },
      { src: q(P_POOL, 1200), alt: "Thermal pool reflecting the pines", caption: "Springhouse pools" },
      { src: q(P_FOREST, 1200), alt: "Light through old-growth pines", caption: "The old growth" },
      { src: q(P_SUITE, 1200), alt: "Warm suite interior in afternoon light", caption: "The Pinewood Suite" },
      { src: q(P_EXTERIOR, 1200), alt: "Timber lodge among the trees", caption: "The main lodge" },
    ],
  },
  reviews: {
    eyebrow: "In their words",
    title: "Guests who stayed too long, gladly",
    intro: "Every stay ends with the same reluctance. A few of the notes left in our guestbook.",
    ratingLabel: "out of five",
    items: [
      {
        id: "r1",
        quote: "We arrived wound tight and left three days later moving at the speed of the lake. I have never slept so deeply in my life. The forest does something to you.",
        name: "Marina Oliveira",
        origin: "São Paulo, Brazil",
        suite: "Lakeside Retreat",
        rating: 5,
      },
      {
        id: "r2",
        quote: "The dinner at Ember & Root alone is worth the drive. Chef Fontaine cooked trout over open fire and I thought about it for a week afterward.",
        name: "James Whitfield",
        origin: "Portland, USA",
        suite: "Pinewood Suite",
        rating: 5,
      },
      {
        id: "r3",
        quote: "Forest bathing at dawn changed how I think about mornings. No phone, no schedule, just moss and light. The Springhouse afterward was pure surrender.",
        name: "Sofía Herrera",
        origin: "Madrid, Spain",
        suite: "Canopy Room",
        rating: 5,
      },
    ],
  },
  booking: {
    eyebrow: "Your stay begins here",
    title: "The forest is already waiting",
    body: "Reserve directly for the best rate, a welcome pour of estate cider, and a guaranteed lake view. Our retreat hosts answer every enquiry personally.",
    primaryCta: "Check availability",
    secondaryCta: "Speak to a host",
    phone: "+1 (520) 555-0174",
    phoneLabel: "Reservations",
  },
  footer: {
    tagline: "A forest retreat and spa in the Aravaipa Valley. Forty rooms, one lake, and all the quiet you can hold.",
    address: ["The Solace", "1 Aravaipa Valley Road", "Klondyke, AZ 85643"],
    columns: [
      { title: "Stay", links: ["Suites & rooms", "Rates & seasons", "Gift a stay", "Private buyouts"] },
      { title: "The estate", links: ["Dining", "The Springhouse spa", "Experiences", "Weddings"] },
      { title: "Visit", links: ["Getting here", "Journal", "Sustainability", "Contact"] },
    ],
    social: [
      { label: "Journal", kind: "at" },
      { label: "Photographs", kind: "camera" },
      { label: "Share", kind: "share" },
    ],
    newsletterTitle: "Letters from the valley",
    newsletterBody: "Seasonal notes, quiet openings, and the occasional off-season rate. A few times a year, never more.",
    newsletterPlaceholder: "you@email.com",
    newsletterCta: "Subscribe",
    newsletterDone: "Welcome. Watch for the next letter.",
    rights: "All rights reserved.",
    credit: "A concept experience by VigApp.",
  },
};

const pt: HotelContent = {
  format: { locale: "pt-BR", currency: "BRL" },
  header: {
    tagline: "Refúgio na Floresta & Spa",
    navAria: "Principal",
    nav: [
      { href: "#suites", label: "Suítes" },
      { href: "#retreat", label: "Gastronomia & Spa" },
      { href: "#experiences", label: "Experiências" },
      { href: "#gallery", label: "Galeria" },
      { href: "#reviews", label: "Hóspedes" },
    ],
    bookCta: "Reservar",
  },
  hero: {
    eyebrow: "Vale de Aravaipa — Desde 1974",
    title: "Onde os pinheiros",
    titleItalic: "prendem a respiração",
    lede: "Uma propriedade discreta abraçada por floresta nativa. Quarenta quartos, um lago e um silêncio que se sente no peito. Venha desacelerar de propósito.",
    imageAlt: "Floresta de pinheiros na neblina ao amanhecer ao redor de The Solace",
    stats: [
      { value: "40", label: "Quartos e suítes" },
      { value: "220", label: "Acres de floresta" },
      { value: "1", label: "Lago de nascente" },
    ],
    scrollCue: "Role para explorar",
  },
  widget: {
    title: "Ver disponibilidade",
    checkInLabel: "Chegada",
    checkOutLabel: "Saída",
    guestsLabel: "Hóspedes",
    suiteLabel: "Suíte",
    nightSingular: "noite",
    nightPlural: "noites",
    perNight: "por noite",
    estimateLabel: "Estadia estimada",
    fromLabel: "A partir de",
    submitCta: "Reservar estas datas",
    emptyHint: "Escolha as datas para ver uma estimativa.",
    invalidHint: "A saída deve ser depois da chegada.",
    guestSingular: "hóspede",
    guestPlural: "hóspedes",
    decreaseAria: "Remover um hóspede",
    increaseAria: "Adicionar um hóspede",
    taxNote: "Estimativa sem impostos e sem a taxa diária da floresta.",
  },
  suites: {
    eyebrow: "Onde você descansa",
    title: "Três formas de ficar",
    intro: "Todos os quartos olham para as árvores. Linho, latão e madeira aquecidos por um fogão a lenha — nada entre você e a floresta além de uma janela.",
    sleepsLabel: "Acomoda",
    sizeLabel: "Tamanho",
    viewLabel: "Vista",
    amenitiesLabel: "Em cada estadia",
    perNight: "por noite",
    fromLabel: "A partir de",
    reserveCta: "Reservar esta suíte",
    galleryHint: "Toque para explorar o quarto",
    nextAria: "Próxima foto",
    prevAria: "Foto anterior",
    items: [
      {
        id: "canopy",
        name: "Canopy Room",
        tier: "Quarto",
        sleeps: "2 hóspedes",
        size: "34 m²",
        view: "Copa das árvores",
        rate: 2200,
        blurb: "Um quarto de canto aconchegante suspenso entre os galhos, com um recanto de leitura na janela e uma banheira funda esculpida em pedra local.",
        amenities: [
          "Cama king com linho belga",
          "Fogão a lenha",
          "Banheira de imersão em pedra",
          "Bar de café coado e chás",
        ],
        images: [
          { src: q(P_ROOM, 1400), alt: "Canopy Room com cama em linho voltada para janelas altas" },
          { src: q(P_SUITE, 1400), alt: "Recanto de leitura e banheira de pedra na Canopy Room" },
        ],
      },
      {
        id: "pinewood",
        name: "Pinewood Suite",
        tier: "Suíte",
        sleeps: "2 hóspedes",
        size: "58 m²",
        view: "Floresta e campo",
        rate: 3600,
        blurb: "Uma suíte completa com sala de estar separada, deck privativo de cedro e um chuveiro ao ar livre aberto para o céu e o som do vento nos pinheiros.",
        amenities: [
          "Sala de estar separada e fogão a lenha",
          "Deck privativo de cedro",
          "Chuveiro de chuva ao ar livre",
          "Serviço noturno com mel da floresta",
        ],
        images: [
          { src: q(P_SUITE, 1400), alt: "Sala de estar da Pinewood Suite banhada pela luz da tarde" },
          { src: q(P_RESORT, 1400), alt: "Deck privativo de cedro da Pinewood Suite sobre a floresta" },
        ],
      },
      {
        id: "lakeside",
        name: "Lakeside Retreat",
        tier: "Vila",
        sleeps: "4 hóspedes",
        size: "96 m²",
        view: "Frente para o lago",
        rate: 6100,
        blurb: "Uma vila de madeira independente à beira d'água, com ofurô aquecido a lenha, píer próprio e uma lareira feita para noites longas e conversas mais longas ainda.",
        amenities: [
          "Dois quartos e lareira de pé-direito duplo",
          "Ofurô à beira do lago aquecido a lenha",
          "Píer privativo e barco a remo",
          "Anfitrião dedicado e jantar na vila",
        ],
        images: [
          { src: q(P_POOL, 1400), alt: "Vila Lakeside Retreat refletida na água serena ao entardecer" },
          { src: q(P_EXTERIOR, 1400), alt: "Fachada de madeira do Lakeside Retreat entre os pinheiros" },
        ],
      },
    ],
  },
  retreat: {
    eyebrow: "Gastronomia & Spa",
    title: "Nutrido pela floresta, acalmado pela água",
    intro: "Duas casas ancoram a vida em The Solace: uma cozinha de fogo que prepara o que o vale está cultivando e um spa de água de nascente esculpido na encosta.",
    hoursLabel: "Aberto",
    items: [
      {
        id: "hearth",
        kind: "A Mesa",
        name: "Ember & Root",
        description: "Um único menu por noite feito da horta da propriedade, do defumador e do que os coletores trazem da orla da mata.",
        detail: "A chef Nadia Fontaine prepara cinco tempos no fogo aberto — caldo de cogumelos selvagens, truta defumada em cedro, mel das nossas colmeias. Trinta lugares em mesas comunais de carvalho.",
        hours: "Jantar todas as noites, 18h30 – 22h00",
        image: { src: q(P_RESORT, 1200), alt: "Salão comunal à luz de velas ao entardecer" },
      },
      {
        id: "spa",
        kind: "O Spa",
        name: "Springhouse",
        description: "Piscinas termais de nascente, sauna de cedro e tratamentos à base de botânicos da floresta e pedras quentes do rio.",
        detail: "Alterne entre piscinas quentes e frias, respire o vapor de eucalipto e entregue-se ao ritual assinatura de pinho e bétula. Reserve uma hora privativa para dois.",
        hours: "Diariamente, 07h00 – 21h00",
        image: { src: q(P_STONES, 1200), alt: "Pedras quentes de spa e toalhas de linho dobradas no Springhouse" },
      },
    ],
  },
  experiences: {
    eyebrow: "Os dias aqui",
    title: "Motivos para sair do quarto",
    intro: "Com guia ou totalmente a sós — o vale se abre no ritmo que você quiser. Cada experiência está inclusa; basta avisar a recepção na véspera.",
    durationLabel: "Duração",
    scrollHint: "Arraste ou role para explorar",
    nextAria: "Próxima experiência",
    prevAria: "Experiência anterior",
    items: [
      {
        id: "forest-bathing",
        name: "Banho de floresta ao amanhecer",
        duration: "90 minutos",
        time: "Diariamente ao raiar do dia",
        description: "Uma caminhada lenta e guiada pela mata antiga onde você não faz nada além de perceber — a luz, o musgo, o canto dos pássaros, o cheiro da terra despertando.",
        image: { src: q(P_FOREST, 1200), alt: "Raios de sol atravessando um bosque de árvores altas" },
      },
      {
        id: "lake",
        name: "Remada matinal no lago",
        duration: "60 minutos",
        time: "07h00 e 10h00",
        description: "Leve um barco a remo pela água tão parada que duplica o céu. Café e um cobertor quente esperam por você no píer.",
        image: { src: q(P_MIST, 1200), alt: "Neblina subindo de um lago espelhado ao amanhecer" },
      },
      {
        id: "trails",
        name: "A trilha da crista",
        duration: "3 horas",
        time: "Sob agendamento",
        description: "Uma subida guiada até o mirante onde todo o vale se abre aos seus pés. Almoço de pão da casa, queijo e conservas incluso.",
        image: { src: q(P_EXTERIOR, 1200), alt: "Trilha na floresta subindo em direção a um mirante" },
      },
      {
        id: "hearthfire",
        name: "Fogueira sob as estrelas",
        duration: "À noite",
        time: "Após o jantar",
        description: "Reúna-se na fogueira ao ar livre com cidra quente e um astrônomo do vale que lê o céu como quem lê um livro.",
        image: { src: q(P_MIST, 1200), alt: "Luz da fogueira contra a mata escura à noite" },
      },
    ],
  },
  gallery: {
    eyebrow: "A propriedade",
    title: "Um olhar mais de perto",
    intro: "Passeie pelos jardins antes de chegar.",
    closeAria: "Fechar galeria",
    nextAria: "Próxima imagem",
    prevAria: "Imagem anterior",
    shots: [
      { src: q(P_MIST, 1400), alt: "Neblina sobre o lago da floresta ao nascer do sol", caption: "O lago ao amanhecer" },
      { src: q(P_ROOM, 1200), alt: "Cama de suíte em linho junto a janelas altas", caption: "Dentro de uma Canopy Room" },
      { src: q(P_POOL, 1200), alt: "Piscina termal refletindo os pinheiros", caption: "Piscinas do Springhouse" },
      { src: q(P_FOREST, 1200), alt: "Luz entre pinheiros centenários", caption: "A mata antiga" },
      { src: q(P_SUITE, 1200), alt: "Interior aconchegante de suíte à luz da tarde", caption: "A Pinewood Suite" },
      { src: q(P_EXTERIOR, 1200), alt: "Lodge de madeira entre as árvores", caption: "O lodge principal" },
    ],
  },
  reviews: {
    eyebrow: "Nas palavras deles",
    title: "Hóspedes que ficaram tempo demais, e ainda bem",
    intro: "Toda estadia termina com a mesma relutância. Alguns dos bilhetes deixados em nosso livro de visitas.",
    ratingLabel: "de cinco",
    items: [
      {
        id: "r1",
        quote: "Chegamos tensos e saímos três dias depois no ritmo do lago. Nunca dormi tão profundamente na vida. A floresta faz algo com a gente.",
        name: "Marina Oliveira",
        origin: "São Paulo, Brasil",
        suite: "Lakeside Retreat",
        rating: 5,
      },
      {
        id: "r2",
        quote: "O jantar no Ember & Root já vale a viagem. A chef Fontaine preparou truta no fogo aberto e eu pensei nisso a semana inteira.",
        name: "James Whitfield",
        origin: "Portland, EUA",
        suite: "Pinewood Suite",
        rating: 5,
      },
      {
        id: "r3",
        quote: "O banho de floresta ao amanhecer mudou como penso nas manhãs. Sem telefone, sem agenda, só musgo e luz. O Springhouse depois foi pura entrega.",
        name: "Sofía Herrera",
        origin: "Madri, Espanha",
        suite: "Canopy Room",
        rating: 5,
      },
    ],
  },
  booking: {
    eyebrow: "Sua estadia começa aqui",
    title: "A floresta já está esperando",
    body: "Reserve diretamente para a melhor tarifa, uma taça de boas-vindas de cidra da casa e vista garantida para o lago. Nossos anfitriões respondem cada contato pessoalmente.",
    primaryCta: "Ver disponibilidade",
    secondaryCta: "Falar com um anfitrião",
    phone: "+1 (520) 555-0174",
    phoneLabel: "Reservas",
  },
  footer: {
    tagline: "Um refúgio na floresta com spa no Vale de Aravaipa. Quarenta quartos, um lago e todo o silêncio que você conseguir carregar.",
    address: ["The Solace", "1 Aravaipa Valley Road", "Klondyke, AZ 85643"],
    columns: [
      { title: "Hospedar", links: ["Suítes e quartos", "Tarifas e temporadas", "Presentear uma estadia", "Locação exclusiva"] },
      { title: "A propriedade", links: ["Gastronomia", "Spa Springhouse", "Experiências", "Casamentos"] },
      { title: "Visitar", links: ["Como chegar", "Diário", "Sustentabilidade", "Contato"] },
    ],
    social: [
      { label: "Diário", kind: "at" },
      { label: "Fotografias", kind: "camera" },
      { label: "Compartilhar", kind: "share" },
    ],
    newsletterTitle: "Cartas do vale",
    newsletterBody: "Notas de temporada, aberturas discretas e, de vez em quando, uma tarifa de baixa estação. Poucas vezes ao ano, nunca mais que isso.",
    newsletterPlaceholder: "voce@email.com",
    newsletterCta: "Assinar",
    newsletterDone: "Bem-vindo. Aguarde a próxima carta.",
    rights: "Todos os direitos reservados.",
    credit: "Uma experiência conceitual por VigApp.",
  },
};

const es: HotelContent = {
  format: { locale: "es-ES", currency: "EUR" },
  header: {
    tagline: "Refugio en el Bosque & Spa",
    navAria: "Principal",
    nav: [
      { href: "#suites", label: "Suites" },
      { href: "#retreat", label: "Gastronomía & Spa" },
      { href: "#experiences", label: "Experiencias" },
      { href: "#gallery", label: "Galería" },
      { href: "#reviews", label: "Huéspedes" },
    ],
    bookCta: "Reservar",
  },
  hero: {
    eyebrow: "Valle de Aravaipa — Desde 1974",
    title: "Donde los pinos",
    titleItalic: "contienen el aliento",
    lede: "Una finca discreta plegada entre bosque centenario. Cuarenta habitaciones, un lago y un silencio que se siente en el pecho. Ven a frenar a propósito.",
    imageAlt: "Bosque de pinos entre la niebla al amanecer rodeando The Solace",
    stats: [
      { value: "40", label: "Habitaciones y suites" },
      { value: "220", label: "Acres de bosque" },
      { value: "1", label: "Lago de manantial" },
    ],
    scrollCue: "Desplázate para explorar",
  },
  widget: {
    title: "Ver disponibilidad",
    checkInLabel: "Llegada",
    checkOutLabel: "Salida",
    guestsLabel: "Huéspedes",
    suiteLabel: "Suite",
    nightSingular: "noche",
    nightPlural: "noches",
    perNight: "por noche",
    estimateLabel: "Estancia estimada",
    fromLabel: "Desde",
    submitCta: "Reservar estas fechas",
    emptyHint: "Elige tus fechas para ver una estimación.",
    invalidHint: "La salida debe ser posterior a la llegada.",
    guestSingular: "huésped",
    guestPlural: "huéspedes",
    decreaseAria: "Quitar un huésped",
    increaseAria: "Añadir un huésped",
    taxNote: "La estimación no incluye impuestos ni la tasa diaria del bosque.",
  },
  suites: {
    eyebrow: "Donde descansas",
    title: "Tres formas de quedarte",
    intro: "Cada habitación mira a los árboles. Lino, latón y madera templados por una estufa de leña — nada entre tú y el bosque salvo un cristal.",
    sleepsLabel: "Capacidad",
    sizeLabel: "Superficie",
    viewLabel: "Vistas",
    amenitiesLabel: "En cada estancia",
    perNight: "por noche",
    fromLabel: "Desde",
    reserveCta: "Reservar esta suite",
    galleryHint: "Toca para recorrer la habitación",
    nextAria: "Siguiente foto",
    prevAria: "Foto anterior",
    items: [
      {
        id: "canopy",
        name: "Canopy Room",
        tier: "Habitación",
        sleeps: "2 huéspedes",
        size: "34 m²",
        view: "Copa de los árboles",
        rate: 390,
        blurb: "Una acogedora habitación de esquina elevada entre las ramas, con un rincón de lectura en la ventana y una bañera profunda tallada en piedra local.",
        amenities: [
          "Cama king vestida en lino belga",
          "Estufa de leña",
          "Bañera de inmersión en piedra",
          "Rincón de café de filtro y tés",
        ],
        images: [
          { src: q(P_ROOM, 1400), alt: "Canopy Room con cama de lino frente a ventanales altos" },
          { src: q(P_SUITE, 1400), alt: "Rincón de lectura y bañera de piedra en la Canopy Room" },
        ],
      },
      {
        id: "pinewood",
        name: "Pinewood Suite",
        tier: "Suite",
        sleeps: "2 huéspedes",
        size: "58 m²",
        view: "Bosque y pradera",
        rate: 620,
        blurb: "Una suite completa con salón independiente, terraza privada de cedro y una ducha al aire libre abierta al cielo y al sonido del viento entre los pinos.",
        amenities: [
          "Salón independiente y estufa de leña",
          "Terraza privada de cedro",
          "Ducha de lluvia al aire libre",
          "Servicio nocturno con miel del bosque",
        ],
        images: [
          { src: q(P_SUITE, 1400), alt: "Salón de la Pinewood Suite bañado por la luz de la tarde" },
          { src: q(P_RESORT, 1400), alt: "Terraza privada de cedro de la Pinewood Suite sobre el bosque" },
        ],
      },
      {
        id: "lakeside",
        name: "Lakeside Retreat",
        tier: "Villa",
        sleeps: "4 huéspedes",
        size: "96 m²",
        view: "Frente al lago",
        rate: 1050,
        blurb: "Una villa de madera independiente al borde del agua con jacuzzi de leña, embarcadero propio y una chimenea hecha para veladas largas y conversaciones aún más largas.",
        amenities: [
          "Dos dormitorios y chimenea de doble altura",
          "Jacuzzi de leña junto al lago",
          "Embarcadero privado y barca de remos",
          "Anfitrión dedicado y cena en la villa",
        ],
        images: [
          { src: q(P_POOL, 1400), alt: "Villa Lakeside Retreat reflejada en el agua serena al anochecer" },
          { src: q(P_EXTERIOR, 1400), alt: "Fachada de madera del Lakeside Retreat entre los pinos" },
        ],
      },
    ],
  },
  retreat: {
    eyebrow: "Gastronomía & Spa",
    title: "Alimentado por el bosque, calmado por el agua",
    intro: "Dos casas anclan la vida en The Solace: una cocina de fuego que prepara lo que el valle esté cultivando y un spa de agua de manantial tallado en la ladera.",
    hoursLabel: "Abierto",
    items: [
      {
        id: "hearth",
        kind: "La Mesa",
        name: "Ember & Root",
        description: "Un único menú cada noche compuesto con el huerto de la finca, el ahumadero y lo que los recolectores traen del linde del bosque.",
        detail: "La chef Nadia Fontaine cocina cinco tiempos al fuego abierto — caldo de setas silvestres, trucha ahumada en cedro, miel de nuestras colmenas. Treinta comensales en mesas comunales de roble.",
        hours: "Cena cada noche, 18:30 – 22:00",
        image: { src: q(P_RESORT, 1200), alt: "Comedor comunal a la luz de las velas al anochecer" },
      },
      {
        id: "spa",
        kind: "El Spa",
        name: "Springhouse",
        description: "Piscinas termales de manantial, sauna de cedro y tratamientos con botánicos del bosque y piedras calientes de río.",
        detail: "Alterna entre piscinas frías y calientes, respira el vapor de eucalipto y entrégate al ritual insignia de pino y abedul. Reserva una hora privada para dos.",
        hours: "A diario, 07:00 – 21:00",
        image: { src: q(P_STONES, 1200), alt: "Piedras calientes de spa y toallas de lino plegadas en Springhouse" },
      },
    ],
  },
  experiences: {
    eyebrow: "Los días aquí",
    title: "Razones para salir de la habitación",
    intro: "Con guía o del todo a solas — el valle se abre al ritmo que marques. Cada experiencia está incluida; solo avisa a recepción la noche antes.",
    durationLabel: "Duración",
    scrollHint: "Arrastra o desliza para explorar",
    nextAria: "Siguiente experiencia",
    prevAria: "Experiencia anterior",
    items: [
      {
        id: "forest-bathing",
        name: "Baño de bosque al alba",
        duration: "90 minutos",
        time: "A diario al amanecer",
        description: "Un paseo lento y guiado por el bosque antiguo donde no haces nada salvo percibir — la luz, el musgo, el canto de los pájaros, el olor de la tierra despertando.",
        image: { src: q(P_FOREST, 1200), alt: "Rayos de sol atravesando una arboleda de árboles altos" },
      },
      {
        id: "lake",
        name: "Remo matinal en el lago",
        duration: "60 minutos",
        time: "07:00 y 10:00",
        description: "Sal en una barca de remos por un agua tan quieta que duplica el cielo. Café y una manta cálida te esperan en el embarcadero.",
        image: { src: q(P_MIST, 1200), alt: "Niebla levantándose de un lago en calma al amanecer" },
      },
      {
        id: "trails",
        name: "El sendero de la cresta",
        duration: "3 horas",
        time: "Bajo reserva",
        description: "Un ascenso guiado hasta el mirador donde todo el valle se abre bajo tus pies. Almuerzo de pan de la finca, queso y conservas incluido.",
        image: { src: q(P_EXTERIOR, 1200), alt: "Sendero del bosque ascendiendo hacia un mirador" },
      },
      {
        id: "hearthfire",
        name: "Hoguera bajo las estrellas",
        duration: "Por la noche",
        time: "Tras la cena",
        description: "Reúnete junto al fuego al aire libre con sidra caliente y un astrónomo del valle que lee el cielo como quien lee un libro.",
        image: { src: q(P_MIST, 1200), alt: "Luz del fuego contra la arboleda oscura por la noche" },
      },
    ],
  },
  gallery: {
    eyebrow: "La finca",
    title: "Una mirada más cercana",
    intro: "Recorre los jardines antes de llegar.",
    closeAria: "Cerrar galería",
    nextAria: "Siguiente imagen",
    prevAria: "Imagen anterior",
    shots: [
      { src: q(P_MIST, 1400), alt: "Niebla sobre el lago del bosque al amanecer", caption: "El lago al alba" },
      { src: q(P_ROOM, 1200), alt: "Cama de suite en lino junto a ventanales altos", caption: "Dentro de una Canopy Room" },
      { src: q(P_POOL, 1200), alt: "Piscina termal reflejando los pinos", caption: "Piscinas del Springhouse" },
      { src: q(P_FOREST, 1200), alt: "Luz entre pinos centenarios", caption: "El bosque antiguo" },
      { src: q(P_SUITE, 1200), alt: "Interior cálido de suite a la luz de la tarde", caption: "La Pinewood Suite" },
      { src: q(P_EXTERIOR, 1200), alt: "Lodge de madera entre los árboles", caption: "El lodge principal" },
    ],
  },
  reviews: {
    eyebrow: "En sus palabras",
    title: "Huéspedes que se quedaron de más, con gusto",
    intro: "Cada estancia termina con la misma reticencia. Algunas de las notas dejadas en nuestro libro de visitas.",
    ratingLabel: "de cinco",
    items: [
      {
        id: "r1",
        quote: "Llegamos tensos y salimos tres días después al ritmo del lago. Nunca he dormido tan profundamente. El bosque te hace algo por dentro.",
        name: "Marina Oliveira",
        origin: "São Paulo, Brasil",
        suite: "Lakeside Retreat",
        rating: 5,
      },
      {
        id: "r2",
        quote: "La cena en Ember & Root ya vale el viaje. La chef Fontaine cocinó trucha al fuego abierto y estuve pensando en ella toda la semana.",
        name: "James Whitfield",
        origin: "Portland, EE. UU.",
        suite: "Pinewood Suite",
        rating: 5,
      },
      {
        id: "r3",
        quote: "El baño de bosque al alba cambió mi forma de ver las mañanas. Sin móvil, sin agenda, solo musgo y luz. El Springhouse después fue pura entrega.",
        name: "Sofía Herrera",
        origin: "Madrid, España",
        suite: "Canopy Room",
        rating: 5,
      },
    ],
  },
  booking: {
    eyebrow: "Tu estancia empieza aquí",
    title: "El bosque ya te espera",
    body: "Reserva directamente para la mejor tarifa, una copa de bienvenida de sidra de la finca y vistas garantizadas al lago. Nuestros anfitriones responden cada consulta en persona.",
    primaryCta: "Ver disponibilidad",
    secondaryCta: "Hablar con un anfitrión",
    phone: "+1 (520) 555-0174",
    phoneLabel: "Reservas",
  },
  footer: {
    tagline: "Un refugio en el bosque con spa en el Valle de Aravaipa. Cuarenta habitaciones, un lago y todo el silencio que puedas sostener.",
    address: ["The Solace", "1 Aravaipa Valley Road", "Klondyke, AZ 85643"],
    columns: [
      { title: "Alojarse", links: ["Suites y habitaciones", "Tarifas y temporadas", "Regalar una estancia", "Uso exclusivo"] },
      { title: "La finca", links: ["Gastronomía", "Spa Springhouse", "Experiencias", "Bodas"] },
      { title: "Visitar", links: ["Cómo llegar", "Diario", "Sostenibilidad", "Contacto"] },
    ],
    social: [
      { label: "Diario", kind: "at" },
      { label: "Fotografías", kind: "camera" },
      { label: "Compartir", kind: "share" },
    ],
    newsletterTitle: "Cartas del valle",
    newsletterBody: "Notas de temporada, aperturas discretas y, de vez en cuando, una tarifa de temporada baja. Unas pocas veces al año, nunca más.",
    newsletterPlaceholder: "tu@email.com",
    newsletterCta: "Suscribirse",
    newsletterDone: "Bienvenido. Atento a la próxima carta.",
    rights: "Todos los derechos reservados.",
    credit: "Una experiencia conceptual de VigApp.",
  },
};

export const hotelDictionary: DemoDictionary<HotelContent> = { en, pt, es };
