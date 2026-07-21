import type { DemoDictionary } from "@/demos/content";

export interface DemoImage {
  src: string;
  alt: string;
}

export interface ItineraryStop {
  day: string;
  title: string;
  body: string;
}

export interface Journey {
  id: string;
  name: string;
  region: string;
  continent: "americas" | "europe" | "asia" | "africa";
  continentLabel: string;
  duration: string;
  pace: string;
  priceFrom: number;
  stub: string;
  summary: string;
  image: DemoImage;
  highlights: string[];
  itinerary: ItineraryStop[];
}

export interface FilterOption {
  id: "all" | "americas" | "europe" | "asia" | "africa";
  label: string;
  count?: number;
}

export interface QuizOption {
  id: string;
  label: string;
  journeyId: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
}

export interface Pillar {
  id: string;
  title: string;
  body: string;
}

export interface JournalEntry {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  author: string;
  image: DemoImage;
}

export interface TravelContent {
  format: { locale: string; currency: string };
  header: {
    tagline: string;
    navAria: string;
    nav: { href: string; label: string }[];
    planCta: string;
    menuAria: string;
  };
  hero: {
    kicker: string;
    titleLead: string;
    titleAccent: string;
    titleTail: string;
    intro: string;
    searchLabel: string;
    whereLabel: string;
    whereAria: string;
    whenLabel: string;
    whenPlaceholder: string;
    styleLabel: string;
    styleAria: string;
    styleOptions: { id: string; label: string }[];
    searchCta: string;
    popularLabel: string;
    stats: { value: string; label: string }[];
  };
  journeys: {
    eyebrow: string;
    title: string;
    intro: string;
    filters: FilterOption[];
    filterAria: string;
    fromLabel: string;
    perPerson: string;
    viewCta: string;
    items: Journey[];
  };
  detail: {
    eyebrow: string;
    title: string;
    intro: string;
    switchLabel: string;
    includesLabel: string;
    dayByDay: string;
    priceNote: string;
    reserveCta: string;
    talkCta: string;
  };
  quiz: {
    eyebrow: string;
    title: string;
    intro: string;
    stepLabel: string;
    ofLabel: string;
    backLabel: string;
    resultKicker: string;
    resultLead: string;
    matchLabel: string;
    restartLabel: string;
    viewCta: string;
    questions: QuizQuestion[];
  };
  tailor: {
    eyebrow: string;
    title: string;
    intro: string;
    pillars: Pillar[];
    quote: string;
    quoteAuthor: string;
    quoteRole: string;
  };
  journal: {
    eyebrow: string;
    title: string;
    intro: string;
    readLabel: string;
    entries: JournalEntry[];
  };
  footer: {
    tagline: string;
    blurb: string;
    columns: { title: string; links: string[] }[];
    contactTitle: string;
    address: string;
    email: string;
    phone: string;
    social: { label: string; icon: "atsign" | "camera" | "share" | "globe" }[];
    newsletterTitle: string;
    newsletterBody: string;
    newsletterPlaceholder: string;
    newsletterCta: string;
    newsletterDone: string;
    rights: string;
    credits: string;
  };
}

const IMG = "https://images.unsplash.com/";
const q = (id: string, w = 1200) =>
  `${IMG}${id}?auto=format&fit=crop&w=${w}&q=80`;

/* ------------------------------- ENGLISH -------------------------------- */

const en: TravelContent = {
  format: { locale: "en-US", currency: "USD" },
  header: {
    tagline: "Tailor-made journeys",
    navAria: "Primary navigation",
    nav: [
      { href: "#journeys", label: "Journeys" },
      { href: "#itinerary", label: "Itineraries" },
      { href: "#quiz", label: "Find your style" },
      { href: "#tailor", label: "Tailor-made" },
      { href: "#journal", label: "Journal" },
    ],
    planCta: "Start planning",
    menuAria: "Toggle navigation menu",
  },
  hero: {
    kicker: "Atlas Voyages — since 2009",
    titleLead: "Journeys drawn",
    titleAccent: "by hand",
    titleTail: "for the way you wander",
    intro:
      "No two travellers see the same horizon. We compose slow, private itineraries stitched from local guides, hidden stays and the roads maps forget.",
    searchLabel: "Dream a little",
    whereLabel: "Where to",
    whereAria: "Choose a region",
    whenLabel: "When",
    whenPlaceholder: "Add dates",
    styleLabel: "Pace",
    styleAria: "Choose a travel pace",
    styleOptions: [
      { id: "any", label: "Any pace" },
      { id: "relaxed", label: "Slow & relaxed" },
      { id: "balanced", label: "Balanced" },
      { id: "active", label: "Active & wild" },
    ],
    searchCta: "Explore journeys",
    popularLabel: "In demand",
    stats: [
      { value: "62", label: "Countries mapped" },
      { value: "14yr", label: "Crafting routes" },
      { value: "4.9", label: "Traveller rating" },
    ],
  },
  journeys: {
    eyebrow: "Curated journeys",
    title: "Signature routes, ready to reshape",
    intro:
      "A starting point, never a package. Every route below becomes yours the moment we talk — swap a stay, add a day, trade a trail for a table.",
    filters: [
      { id: "all", label: "All journeys" },
      { id: "americas", label: "Americas" },
      { id: "europe", label: "Europe" },
      { id: "asia", label: "Asia" },
      { id: "africa", label: "Africa" },
    ],
    filterAria: "Filter journeys by continent",
    fromLabel: "From",
    perPerson: "per person",
    viewCta: "View itinerary",
    items: [
      {
        id: "patagonia",
        name: "Patagonia Unbound",
        region: "Chile & Argentina",
        continent: "americas",
        continentLabel: "Americas",
        duration: "11 days",
        pace: "Active",
        priceFrom: 6200,
        stub: "Granite & glaciers",
        summary:
          "Base-camp days beneath the Torres, an ice walk on Grey Glacier and a lamb asado under the widest sky in the south.",
        image: {
          src: q("photo-1506905925346-21bda4d32df4", 1400),
          alt: "Snow-dusted granite peaks rising over a Patagonian valley",
        },
        highlights: [
          "Full base circuit of Torres del Paine with a private guide",
          "Ice trek and blue-ice tasting on Grey Glacier",
          "Estancia asado and horseback afternoon on the pampas",
        ],
        itinerary: [
          {
            day: "Days 01–02",
            title: "Into the Southern Andes",
            body: "Land in El Calafate, drift onto the steppe and settle into a fireside lodge as the wind writes the forecast.",
          },
          {
            day: "Days 03–05",
            title: "The Towers",
            body: "Three unhurried hikes through lenga forest to the granite amphitheatre, timed so you meet the towers without the crowds.",
          },
          {
            day: "Days 06–08",
            title: "Grey Glacier & fjords",
            body: "Crampon onto the glacier, then a slow boat past calving walls of blue ice and Zodiac coves.",
          },
          {
            day: "Days 09–11",
            title: "Estancia farewell",
            body: "Ride out with gauchos, share an open-fire asado and toast the journey before the flight north.",
          },
        ],
      },
      {
        id: "banff",
        name: "Banff Lake Circuit",
        region: "Canadian Rockies",
        continent: "americas",
        continentLabel: "Americas",
        duration: "8 days",
        pace: "Balanced",
        priceFrom: 5100,
        stub: "Turquoise lakes",
        summary:
          "Canoe glass-still glacial lakes, ride the Icefields Parkway and soak in cedar hot springs as the Rockies glow.",
        image: {
          src: q("photo-1476514525535-07fb3b4ae5f1", 1400),
          alt: "A single canoe on a still, glacier-fed turquoise lake",
        },
        highlights: [
          "Dawn canoe on Moraine Lake before the shoreline wakes",
          "Private drive of the Icefields Parkway with a naturalist",
          "Cedar-plank dinner and a soak in the upper hot springs",
        ],
        itinerary: [
          {
            day: "Days 01–02",
            title: "Bow Valley arrival",
            body: "Ease into the mountains from Calgary, settling into a heritage lodge with the Bow River at your door.",
          },
            {
            day: "Days 03–04",
            title: "Lakes of glass",
            body: "Paddle Moraine and Louise at first light, then a forest trail to a hanging teahouse for lunch.",
          },
          {
            day: "Days 05–06",
            title: "Icefields Parkway",
            body: "Trace the spine of the Rockies to Jasper, stopping for glaciers, waterfalls and unphotographed viewpoints.",
          },
          {
            day: "Days 07–08",
            title: "Springs & farewell",
            body: "A gentle canyon walk, a long soak in the hot springs and a final table above the treeline.",
          },
        ],
      },
      {
        id: "amalfi",
        name: "Amalfi Slow Coast",
        region: "Southern Italy",
        continent: "europe",
        continentLabel: "Europe",
        duration: "8 days",
        pace: "Relaxed",
        priceFrom: 4700,
        stub: "Lemons & sea air",
        summary:
          "Cliffside villages, a private gozzo along the coast and long lunches where the lemons grow bigger than your fist.",
        image: {
          src: q("photo-1507525428034-b723cf961d3e", 1400),
          alt: "Turquoise water breaking over a sun-washed Mediterranean shore",
        },
        highlights: [
          "Private wooden gozzo along the Amalfi cliffs to hidden coves",
          "Lemon-grove lunch and limoncello with a Ravello family",
          "Sunset table in Positano with the coast falling away below",
        ],
        itinerary: [
          {
            day: "Days 01–02",
            title: "Sorrento overture",
            body: "Arrive to the scent of citrus, unwind on a terrace above the bay and let the coast set the tempo.",
          },
          {
            day: "Days 03–04",
            title: "The blue coast",
            body: "Sail a private gozzo to quiet coves, swim off the boat and lunch where only the sea can reach.",
          },
          {
            day: "Days 05–06",
            title: "Ravello heights",
            body: "Trade the shore for the hills — garden villas, a lemon-grove table and a slow afternoon of music.",
          },
          {
            day: "Days 07–08",
            title: "Positano goodbye",
            body: "A last stair-street wander, a sunset table and a final espresso before the road north.",
          },
        ],
      },
      {
        id: "faroe",
        name: "Faroe Wild North",
        region: "Faroe Islands",
        continent: "europe",
        continentLabel: "Europe",
        duration: "6 days",
        pace: "Active",
        priceFrom: 4300,
        stub: "Sea cliffs & mist",
        summary:
          "Grass-roofed villages, cliff-edge trails above the Atlantic and a helicopter hop between islands wrapped in weather.",
        image: {
          src: q("photo-1501785888041-af3ef285b470", 1400),
          alt: "Still lake mirroring dramatic peaks under a low northern sky",
        },
        highlights: [
          "Cliff walk to the lake that hangs above the ocean",
          "Local helicopter hop between the far northern isles",
          "Home-kitchen dinner with a Faroese fishing family",
        ],
        itinerary: [
          {
            day: "Days 01–02",
            title: "Tórshavn & turf",
            body: "Settle into the turf-roofed old town, then a first headland walk as the mist lifts and falls.",
          },
          {
            day: "Days 03–04",
            title: "The hanging lake",
            body: "Hike the cliff trail to the lake that seems to pour into the sea, then a boat beneath the bird cliffs.",
          },
          {
            day: "Days 05–06",
            title: "Island hop & feast",
            body: "A scenic helicopter transfer to the outer isles and a long home-cooked farewell by the harbour.",
          },
        ],
      },
      {
        id: "kyoto",
        name: "Kyoto in Bloom",
        region: "Japan",
        continent: "asia",
        continentLabel: "Asia",
        duration: "9 days",
        pace: "Balanced",
        priceFrom: 5400,
        stub: "Temples & tea",
        summary:
          "Private tea ceremony, dawn temples before the gates open and a ryokan night where dinner is a quiet ceremony of its own.",
        image: {
          src: q("photo-1519681393784-d120267933ba", 1400),
          alt: "Deep blue mountain silhouettes layered beneath a night sky",
        },
        highlights: [
          "Dawn walk through the temple gates before they open to visitors",
          "Private tea ceremony with a Kyoto tea master",
          "Kaiseki dinner and onsen night at a cedar ryokan",
        ],
        itinerary: [
          {
            day: "Days 01–02",
            title: "Old capital",
            body: "Arrive into Kyoto and walk the lantern-lit lanes of Gion as the city changes shift from day to night.",
          },
          {
            day: "Days 03–05",
            title: "Temples & tea",
            body: "Dawn at the quiet temples, an afternoon tea ceremony and a slow garden hour with a monk.",
          },
          {
            day: "Days 06–07",
            title: "Mountain ryokan",
            body: "Retreat to a cedar inn for onsen bathing, kaiseki dinners and a forest walk between the peaks.",
          },
          {
            day: "Days 08–09",
            title: "Craft & farewell",
            body: "Meet an indigo dyer and a knife smith, then a final market breakfast before you fly.",
          },
        ],
      },
      {
        id: "marrakech",
        name: "Marrakech & the Atlas",
        region: "Morocco",
        continent: "africa",
        continentLabel: "Africa",
        duration: "7 days",
        pace: "Immersive",
        priceFrom: 3900,
        stub: "Medinas & dunes",
        summary:
          "A riad hidden off the souk, a mule trail into Berber villages and a private camp where the dunes turn copper at dusk.",
        image: {
          src: q("photo-1476820865390-c52aeebb9891", 1400),
          alt: "A lone road winding through warm, arid mountain country",
        },
        highlights: [
          "Guided medina supper crawl beyond the tourist stalls",
          "Mule trail and lunch in a High Atlas Berber village",
          "Private desert camp with dunes copper at sundown",
        ],
        itinerary: [
          {
            day: "Days 01–02",
            title: "Into the medina",
            body: "A riad hidden behind a nail-studded door, rooftop mint tea and an evening lost in the souk with a guide.",
          },
          {
            day: "Days 03–04",
            title: "High Atlas",
            body: "Climb into the mountains by mule, share bread in a Berber home and sleep where the stars pour down.",
          },
          {
            day: "Days 05–07",
            title: "To the dunes",
            body: "Cross to the edge of the Sahara for a private camp, a camel line at dusk and a fire under the desert sky.",
          },
        ],
      },
    ],
  },
  detail: {
    eyebrow: "Day by day",
    title: "Look inside the journey",
    intro:
      "Pick a route and open it up. Each day is a draft — a rhythm we redraw with you until it feels like your own handwriting.",
    switchLabel: "Now viewing",
    includesLabel: "Signature moments",
    dayByDay: "The itinerary, day by day",
    priceNote: "Private, per person from",
    reserveCta: "Request this journey",
    talkCta: "Talk to a designer",
  },
  quiz: {
    eyebrow: "Find your style",
    title: "Three questions, one journey",
    intro:
      "Answer honestly and we will point you toward the route that fits the way you actually travel — not the one that photographs best.",
    stepLabel: "Question",
    ofLabel: "of",
    backLabel: "Back",
    resultKicker: "Your match",
    resultLead: "The way you wander points to",
    matchLabel: "fit",
    restartLabel: "Take it again",
    viewCta: "Open this journey",
    questions: [
      {
        id: "pull",
        prompt: "What pulls you toward the horizon?",
        options: [
          { id: "wild", label: "Raw wilderness and long trails", journeyId: "patagonia" },
          { id: "ritual", label: "Culture, ritual and old streets", journeyId: "kyoto" },
          { id: "table", label: "Slow food and salt air", journeyId: "amalfi" },
          { id: "colour", label: "Colour, markets and warmth", journeyId: "marrakech" },
        ],
      },
      {
        id: "morning",
        prompt: "Your ideal morning looks like",
        options: [
          { id: "boots", label: "Boots on before the sun", journeyId: "faroe" },
          { id: "garden", label: "Tea in a quiet garden", journeyId: "kyoto" },
          { id: "terrace", label: "Espresso on a terrace", journeyId: "amalfi" },
          { id: "lake", label: "Coffee beside a glacial lake", journeyId: "banff" },
        ],
      },
      {
        id: "land",
        prompt: "Choose the landscape that calls loudest",
        options: [
          { id: "ice", label: "Jagged peaks and blue ice", journeyId: "patagonia" },
          { id: "cliff", label: "Misty cliffs over the sea", journeyId: "faroe" },
          { id: "pine", label: "Turquoise lakes and pine", journeyId: "banff" },
          { id: "dune", label: "Desert dunes at dusk", journeyId: "marrakech" },
        ],
      },
    ],
  },
  tailor: {
    eyebrow: "Why tailor-made",
    title: "A trip that could only be yours",
    intro:
      "We do not sell seats on a schedule. We design one journey at a time, around one traveller at a time — and stay on the line long after you land.",
    pillars: [
      {
        id: "designer",
        title: "One designer, start to finish",
        body: "The person who dreams up your route is the person who answers when plans shift. No handoffs, no call centre.",
      },
      {
        id: "local",
        title: "Local hands on the ground",
        body: "Guides, cooks and hosts we have shared meals with — not names off a roster. The good tables are theirs.",
      },
      {
        id: "pace",
        title: "Pace built around you",
        body: "Days that breathe. We leave gaps on purpose, because the best moment of a trip is rarely on the itinerary.",
      },
      {
        id: "care",
        title: "Awake while you sleep",
        body: "A real person on call across every timezone. A missed connection becomes our problem, never yours.",
      },
    ],
    quote:
      "They rebuilt our whole week when a storm closed the pass — and it turned out to be the best three days of our lives.",
    quoteAuthor: "Marina & Theo Vasquez",
    quoteRole: "Patagonia, last autumn",
  },
  journal: {
    eyebrow: "The Atlas journal",
    title: "Field notes and slow dispatches",
    intro:
      "Stories, seasons and small obsessions from the road — written by the people who design the journeys.",
    readLabel: "Read",
    entries: [
      {
        id: "shoulder",
        category: "When to go",
        title: "In praise of the shoulder season",
        excerpt:
          "Why the weeks either side of peak — softer light, emptier trails, kinder prices — are quietly the best time to travel almost anywhere.",
        readTime: "6 min read",
        author: "Camila Duarte",
        image: {
          src: q("photo-1502920917128-1aa500764cbd", 900),
          alt: "A wing over cloud, seen from an aircraft window at altitude",
        },
      },
      {
        id: "pack",
        category: "The craft",
        title: "What a great guide actually carries",
        excerpt:
          "It is never the gadgets. Our guides on three continents open their packs and it comes down to patience, snacks and a sense of timing.",
        readTime: "8 min read",
        author: "Youssef El Amrani",
        image: {
          src: q("photo-1521295121783-8a321d551ad2", 900),
          alt: "A folded travel map beside a film camera on a wooden table",
        },
      },
      {
        id: "north",
        category: "Dispatch",
        title: "Chasing weather in the far north",
        excerpt:
          "A week in the Faroes taught us to stop fighting the forecast and start planning around it. The mist, it turns out, is the point.",
        readTime: "5 min read",
        author: "Lars Jacobsen",
        image: {
          src: q("photo-1519681393784-d120267933ba", 900),
          alt: "Layered blue mountains under a dim northern night sky",
        },
      },
    ],
  },
  footer: {
    tagline: "Tailor-made journeys",
    blurb:
      "Atlas Voyages designs private, slow-travelled journeys for people who would rather go deep than tick boxes. One traveller, one route, at a time.",
    columns: [
      { title: "Journeys", links: ["The Americas", "Europe", "Asia", "Africa", "Bespoke expeditions"] },
      { title: "Studio", links: ["Our designers", "How we plan", "Responsible travel", "Journal"] },
    ],
    contactTitle: "Talk to us",
    address: "Rua dos Navegantes 88, Copacabana, Rio de Janeiro",
    email: "hello@atlasvoyages.co",
    phone: "+55 21 4002 8922",
    social: [
      { label: "Instagram", icon: "camera" },
      { label: "Newsletter", icon: "atsign" },
      { label: "Community", icon: "share" },
      { label: "Worldwide", icon: "globe" },
    ],
    newsletterTitle: "The dispatch",
    newsletterBody: "One thoughtful letter a month — a destination in season, no noise.",
    newsletterPlaceholder: "Your email",
    newsletterCta: "Subscribe",
    newsletterDone: "You are on the list. Watch for the first dispatch.",
    rights: "Atlas Voyages. A concept experience. All rights reserved.",
    credits: "Designed as a concept by VigApp.",
  },
};

/* ------------------------------ PORTUGUESE ------------------------------ */

const pt: TravelContent = {
  format: { locale: "pt-BR", currency: "BRL" },
  header: {
    tagline: "Viagens sob medida",
    navAria: "Navegação principal",
    nav: [
      { href: "#journeys", label: "Roteiros" },
      { href: "#itinerary", label: "Itinerários" },
      { href: "#quiz", label: "Seu estilo" },
      { href: "#tailor", label: "Sob medida" },
      { href: "#journal", label: "Diário" },
    ],
    planCta: "Começar a planejar",
    menuAria: "Abrir menu de navegação",
  },
  hero: {
    kicker: "Atlas Voyages — desde 2009",
    titleLead: "Roteiros desenhados",
    titleAccent: "à mão",
    titleTail: "para o seu jeito de viajar",
    intro:
      "Nenhum viajante enxerga o mesmo horizonte. Compomos itinerários lentos e privados, feitos de guias locais, estadas escondidas e as estradas que os mapas esquecem.",
    searchLabel: "Comece a sonhar",
    whereLabel: "Para onde",
    whereAria: "Escolha uma região",
    whenLabel: "Quando",
    whenPlaceholder: "Adicionar datas",
    styleLabel: "Ritmo",
    styleAria: "Escolha um ritmo de viagem",
    styleOptions: [
      { id: "any", label: "Qualquer ritmo" },
      { id: "relaxed", label: "Lento e tranquilo" },
      { id: "balanced", label: "Equilibrado" },
      { id: "active", label: "Ativo e selvagem" },
    ],
    searchCta: "Explorar roteiros",
    popularLabel: "Em alta",
    stats: [
      { value: "62", label: "Países mapeados" },
      { value: "14a", label: "Criando rotas" },
      { value: "4,9", label: "Nota dos viajantes" },
    ],
  },
  journeys: {
    eyebrow: "Roteiros selecionados",
    title: "Rotas autorais, prontas para redesenhar",
    intro:
      "Um ponto de partida, nunca um pacote. Cada rota abaixo vira sua no momento em que conversamos — troque uma estada, ganhe um dia, troque uma trilha por uma mesa.",
    filters: [
      { id: "all", label: "Todos os roteiros" },
      { id: "americas", label: "Américas" },
      { id: "europe", label: "Europa" },
      { id: "asia", label: "Ásia" },
      { id: "africa", label: "África" },
    ],
    filterAria: "Filtrar roteiros por continente",
    fromLabel: "A partir de",
    perPerson: "por pessoa",
    viewCta: "Ver itinerário",
    items: [
      {
        id: "patagonia",
        name: "Patagônia Sem Limites",
        region: "Chile e Argentina",
        continent: "americas",
        continentLabel: "Américas",
        duration: "11 dias",
        pace: "Ativo",
        priceFrom: 34900,
        stub: "Granito e geleiras",
        summary:
          "Dias de base sob as Torres, uma caminhada no gelo da Geleira Grey e um asado de cordeiro sob o céu mais aberto do sul.",
        image: {
          src: q("photo-1506905925346-21bda4d32df4", 1400),
          alt: "Picos de granito cobertos de neve sobre um vale da Patagônia",
        },
        highlights: [
          "Circuito completo das Torres del Paine com guia privativo",
          "Trekking no gelo e degustação de gelo azul na Geleira Grey",
          "Asado na estância e tarde a cavalo pelos pampas",
        ],
        itinerary: [
          {
            day: "Dias 01–02",
            title: "Rumo aos Andes do Sul",
            body: "Chegada a El Calafate, entrada na estepe e um lodge à beira do fogo enquanto o vento escreve a previsão.",
          },
          {
            day: "Dias 03–05",
            title: "As Torres",
            body: "Três caminhadas sem pressa pela floresta de lenga até o anfiteatro de granito, na hora de encontrar as torres sem multidões.",
          },
          {
            day: "Dias 06–08",
            title: "Geleira Grey e fiordes",
            body: "Grampos no gelo e depois um barco lento entre paredes de gelo azul que se desprendem em enseadas.",
          },
          {
            day: "Dias 09–11",
            title: "Despedida na estância",
            body: "Cavalgada com gaúchos, um asado ao fogo aberto e um brinde à viagem antes do voo ao norte.",
          },
        ],
      },
      {
        id: "banff",
        name: "Circuito dos Lagos de Banff",
        region: "Montanhas Rochosas",
        continent: "americas",
        continentLabel: "Américas",
        duration: "8 dias",
        pace: "Equilibrado",
        priceFrom: 28900,
        stub: "Lagos de turquesa",
        summary:
          "Canoa em lagos glaciais imóveis, a estrada dos Campos de Gelo e águas termais de cedro sob as Rochosas incandescentes.",
        image: {
          src: q("photo-1476514525535-07fb3b4ae5f1", 1400),
          alt: "Uma canoa solitária em um lago glacial turquesa e calmo",
        },
        highlights: [
          "Canoa ao amanhecer no Lago Moraine antes da margem acordar",
          "Traslado privado pela Icefields Parkway com naturalista",
          "Jantar na brasa de cedro e mergulho nas termas altas",
        ],
        itinerary: [
          {
            day: "Dias 01–02",
            title: "Chegada ao Bow Valley",
            body: "Entrada suave nas montanhas a partir de Calgary, com um lodge histórico e o rio Bow à sua porta.",
          },
          {
            day: "Dias 03–04",
            title: "Lagos de vidro",
            body: "Remada nos lagos Moraine e Louise ao primeiro sol e uma trilha na mata até uma casa de chá suspensa.",
          },
          {
            day: "Dias 05–06",
            title: "Icefields Parkway",
            body: "A espinha das Rochosas até Jasper, com paradas em geleiras, cachoeiras e mirantes sem fotos.",
          },
          {
            day: "Dias 07–08",
            title: "Termas e despedida",
            body: "Uma caminhada suave no cânion, um longo banho termal e uma última mesa acima da linha das árvores.",
          },
        ],
      },
      {
        id: "amalfi",
        name: "Costa Amalfitana Lenta",
        region: "Sul da Itália",
        continent: "europe",
        continentLabel: "Europa",
        duration: "8 dias",
        pace: "Tranquilo",
        priceFrom: 26500,
        stub: "Limões e maresia",
        summary:
          "Vilas nos penhascos, um gozzo privativo pela costa e almoços longos onde os limões crescem maiores que o punho.",
        image: {
          src: q("photo-1507525428034-b723cf961d3e", 1400),
          alt: "Água turquesa quebrando em uma costa mediterrânea ensolarada",
        },
        highlights: [
          "Gozzo de madeira privativo pelos penhascos até enseadas escondidas",
          "Almoço no limoal e limoncello com uma família de Ravello",
          "Mesa ao pôr do sol em Positano com a costa aos seus pés",
        ],
        itinerary: [
          {
            day: "Dias 01–02",
            title: "Abertura em Sorrento",
            body: "Chegada ao aroma de cítricos, descanso num terraço sobre a baía e a costa ditando o compasso.",
          },
          {
            day: "Dias 03–04",
            title: "A costa azul",
            body: "Um gozzo privativo até enseadas silenciosas, mergulho do barco e almoço onde só o mar chega.",
          },
          {
            day: "Dias 05–06",
            title: "As alturas de Ravello",
            body: "Troque a orla pelas colinas — vilas com jardins, mesa no limoal e uma tarde lenta de música.",
          },
          {
            day: "Dias 07–08",
            title: "Adeus em Positano",
            body: "Um último passeio pelas escadarias, mesa ao entardecer e um espresso final antes da estrada.",
          },
        ],
      },
      {
        id: "faroe",
        name: "Norte Selvagem das Faroe",
        region: "Ilhas Faroe",
        continent: "europe",
        continentLabel: "Europa",
        duration: "6 dias",
        pace: "Ativo",
        priceFrom: 24200,
        stub: "Falésias e névoa",
        summary:
          "Vilas com telhados de grama, trilhas na borda dos penhascos sobre o Atlântico e um salto de helicóptero entre ilhas de tempo instável.",
        image: {
          src: q("photo-1501785888041-af3ef285b470", 1400),
          alt: "Lago imóvel espelhando picos dramáticos sob um céu nórdico baixo",
        },
        highlights: [
          "Caminhada até o lago que parece pairar sobre o oceano",
          "Salto de helicóptero local entre as ilhas do extremo norte",
          "Jantar caseiro com uma família de pescadores faroeses",
        ],
        itinerary: [
          {
            day: "Dias 01–02",
            title: "Tórshavn e a grama",
            body: "Acomodação na cidade velha de telhados verdes e uma primeira caminhada no promontório entre névoas.",
          },
          {
            day: "Dias 03–04",
            title: "O lago suspenso",
            body: "Trilha na falésia até o lago que parece verter no mar e depois um barco sob os penhascos de aves.",
          },
          {
            day: "Dias 05–06",
            title: "Entre ilhas e à mesa",
            body: "Um traslado panorâmico de helicóptero às ilhas externas e uma longa despedida caseira no porto.",
          },
        ],
      },
      {
        id: "kyoto",
        name: "Kyoto em Flor",
        region: "Japão",
        continent: "asia",
        continentLabel: "Ásia",
        duration: "9 dias",
        pace: "Equilibrado",
        priceFrom: 30400,
        stub: "Templos e chá",
        summary:
          "Cerimônia do chá privativa, templos ao amanhecer antes dos portões abrirem e uma noite em ryokan onde o jantar é uma cerimônia à parte.",
        image: {
          src: q("photo-1519681393784-d120267933ba", 1400),
          alt: "Silhuetas azuis de montanhas em camadas sob um céu noturno",
        },
        highlights: [
          "Amanhecer nos portões dos templos antes da abertura ao público",
          "Cerimônia do chá privativa com um mestre de Kyoto",
          "Jantar kaiseki e noite de onsen em um ryokan de cedro",
        ],
        itinerary: [
          {
            day: "Dias 01–02",
            title: "Antiga capital",
            body: "Chegada a Kyoto e caminhada pelas vielas de lanternas de Gion enquanto a cidade troca o dia pela noite.",
          },
          {
            day: "Dias 03–05",
            title: "Templos e chá",
            body: "Amanhecer nos templos silenciosos, cerimônia do chá à tarde e uma hora lenta de jardim com um monge.",
          },
          {
            day: "Dias 06–07",
            title: "Ryokan na montanha",
            body: "Refúgio num ryokan de cedro para banhos de onsen, jantares kaiseki e uma caminhada na floresta entre picos.",
          },
          {
            day: "Dias 08–09",
            title: "Ofício e despedida",
            body: "Encontro com um tingidor de índigo e um forjador de facas e um café final no mercado antes do voo.",
          },
        ],
      },
      {
        id: "marrakech",
        name: "Marrakech e o Atlas",
        region: "Marrocos",
        continent: "africa",
        continentLabel: "África",
        duration: "7 dias",
        pace: "Imersivo",
        priceFrom: 21900,
        stub: "Medinas e dunas",
        summary:
          "Um riad escondido do souk, uma trilha de mula até aldeias berberes e um acampamento privativo onde as dunas ficam cor de cobre ao anoitecer.",
        image: {
          src: q("photo-1476820865390-c52aeebb9891", 1400),
          alt: "Uma estrada solitária serpenteando por montanhas áridas e quentes",
        },
        highlights: [
          "Jantar guiado pela medina para além das barracas turísticas",
          "Trilha de mula e almoço numa aldeia berbere do Alto Atlas",
          "Acampamento privativo com dunas cor de cobre ao pôr do sol",
        ],
        itinerary: [
          {
            day: "Dias 01–02",
            title: "Dentro da medina",
            body: "Um riad atrás de uma porta cravejada, chá de menta no terraço e uma noite perdida no souk com um guia.",
          },
          {
            day: "Dias 03–04",
            title: "Alto Atlas",
            body: "Subida à montanha de mula, pão partilhado numa casa berbere e sono sob uma chuva de estrelas.",
          },
          {
            day: "Dias 05–07",
            title: "Rumo às dunas",
            body: "Travessia à borda do Saara para um acampamento privativo, uma fila de camelos ao entardecer e fogo sob o céu do deserto.",
          },
        ],
      },
    ],
  },
  detail: {
    eyebrow: "Dia a dia",
    title: "Olhe por dentro do roteiro",
    intro:
      "Escolha uma rota e abra-a. Cada dia é um rascunho — um ritmo que redesenhamos com você até ficar com a sua letra.",
    switchLabel: "Vendo agora",
    includesLabel: "Momentos marcantes",
    dayByDay: "O itinerário, dia a dia",
    priceNote: "Privativo, por pessoa a partir de",
    reserveCta: "Solicitar este roteiro",
    talkCta: "Falar com um designer",
  },
  quiz: {
    eyebrow: "Descubra seu estilo",
    title: "Três perguntas, um roteiro",
    intro:
      "Responda com sinceridade e apontamos a rota que combina com o jeito que você realmente viaja — não com a que rende as melhores fotos.",
    stepLabel: "Pergunta",
    ofLabel: "de",
    backLabel: "Voltar",
    resultKicker: "Seu resultado",
    resultLead: "O seu jeito de viajar aponta para",
    matchLabel: "afinidade",
    restartLabel: "Refazer o teste",
    viewCta: "Abrir este roteiro",
    questions: [
      {
        id: "pull",
        prompt: "O que puxa você em direção ao horizonte?",
        options: [
          { id: "wild", label: "Natureza bruta e trilhas longas", journeyId: "patagonia" },
          { id: "ritual", label: "Cultura, ritual e ruas antigas", journeyId: "kyoto" },
          { id: "table", label: "Comida lenta e ar do mar", journeyId: "amalfi" },
          { id: "colour", label: "Cor, mercados e calor", journeyId: "marrakech" },
        ],
      },
      {
        id: "morning",
        prompt: "Sua manhã ideal é assim",
        options: [
          { id: "boots", label: "Botas antes do sol nascer", journeyId: "faroe" },
          { id: "garden", label: "Chá num jardim silencioso", journeyId: "kyoto" },
          { id: "terrace", label: "Espresso num terraço", journeyId: "amalfi" },
          { id: "lake", label: "Café à beira de um lago glacial", journeyId: "banff" },
        ],
      },
      {
        id: "land",
        prompt: "Escolha a paisagem que chama mais alto",
        options: [
          { id: "ice", label: "Picos afiados e gelo azul", journeyId: "patagonia" },
          { id: "cliff", label: "Falésias com névoa sobre o mar", journeyId: "faroe" },
          { id: "pine", label: "Lagos de turquesa e pinheiros", journeyId: "banff" },
          { id: "dune", label: "Dunas do deserto ao entardecer", journeyId: "marrakech" },
        ],
      },
    ],
  },
  tailor: {
    eyebrow: "Por que sob medida",
    title: "Uma viagem que só poderia ser sua",
    intro:
      "Não vendemos assentos numa agenda. Desenhamos uma viagem por vez, para um viajante por vez — e seguimos ao seu lado muito depois do pouso.",
    pillars: [
      {
        id: "designer",
        title: "Um designer do início ao fim",
        body: "Quem sonha a sua rota é quem responde quando os planos mudam. Sem repasses, sem call center.",
      },
      {
        id: "local",
        title: "Mãos locais no destino",
        body: "Guias, cozinheiros e anfitriões com quem já partimos o pão — não nomes de uma lista. As boas mesas são deles.",
      },
      {
        id: "pace",
        title: "Ritmo feito para você",
        body: "Dias que respiram. Deixamos brechas de propósito, porque o melhor momento raramente está no roteiro.",
      },
      {
        id: "care",
        title: "Acordados enquanto você dorme",
        body: "Uma pessoa real de plantão em todo fuso. Uma conexão perdida vira problema nosso, nunca seu.",
      },
    ],
    quote:
      "Refizeram nossa semana inteira quando uma tempestade fechou a passagem — e foram os três melhores dias das nossas vidas.",
    quoteAuthor: "Marina e Theo Vasquez",
    quoteRole: "Patagônia, outono passado",
  },
  journal: {
    eyebrow: "O diário Atlas",
    title: "Notas de campo e despachos lentos",
    intro:
      "Histórias, estações e pequenas obsessões da estrada — escritas por quem desenha os roteiros.",
    readLabel: "Ler",
    entries: [
      {
        id: "shoulder",
        category: "Quando ir",
        title: "Em defesa da baixa temporada",
        excerpt:
          "Por que as semanas ao redor do pico — luz mais suave, trilhas vazias, preços gentis — são silenciosamente o melhor momento para viajar quase para qualquer lugar.",
        readTime: "6 min de leitura",
        author: "Camila Duarte",
        image: {
          src: q("photo-1502920917128-1aa500764cbd", 900),
          alt: "Uma asa sobre as nuvens, vista da janela de um avião em altitude",
        },
      },
      {
        id: "pack",
        category: "O ofício",
        title: "O que um grande guia realmente carrega",
        excerpt:
          "Nunca são os aparelhos. Nossos guias em três continentes abrem as mochilas e tudo se resume a paciência, lanche e senso de tempo.",
        readTime: "8 min de leitura",
        author: "Youssef El Amrani",
        image: {
          src: q("photo-1521295121783-8a321d551ad2", 900),
          alt: "Um mapa de viagem dobrado ao lado de uma câmera analógica numa mesa de madeira",
        },
      },
      {
        id: "north",
        category: "Despacho",
        title: "Caçando o tempo no extremo norte",
        excerpt:
          "Uma semana nas Faroe nos ensinou a parar de brigar com a previsão e começar a planejar em torno dela. A névoa, no fim, é o ponto.",
        readTime: "5 min de leitura",
        author: "Lars Jacobsen",
        image: {
          src: q("photo-1519681393784-d120267933ba", 900),
          alt: "Montanhas azuis em camadas sob um céu noturno tênue do norte",
        },
      },
    ],
  },
  footer: {
    tagline: "Viagens sob medida",
    blurb:
      "A Atlas Voyages desenha viagens privadas e lentas para quem prefere ir fundo a marcar caixinhas. Um viajante, uma rota, por vez.",
    columns: [
      { title: "Roteiros", links: ["As Américas", "Europa", "Ásia", "África", "Expedições sob medida"] },
      { title: "Estúdio", links: ["Nossos designers", "Como planejamos", "Viagem responsável", "Diário"] },
    ],
    contactTitle: "Fale conosco",
    address: "Rua dos Navegantes 88, Copacabana, Rio de Janeiro",
    email: "ola@atlasvoyages.co",
    phone: "+55 21 4002 8922",
    social: [
      { label: "Instagram", icon: "camera" },
      { label: "Newsletter", icon: "atsign" },
      { label: "Comunidade", icon: "share" },
      { label: "Mundo", icon: "globe" },
    ],
    newsletterTitle: "O despacho",
    newsletterBody: "Uma carta cuidadosa por mês — um destino na estação certa, sem ruído.",
    newsletterPlaceholder: "Seu e-mail",
    newsletterCta: "Assinar",
    newsletterDone: "Você está na lista. Aguarde o primeiro despacho.",
    rights: "Atlas Voyages. Uma experiência conceito. Todos os direitos reservados.",
    credits: "Concebido como conceito pela VigApp.",
  },
};

/* ------------------------------- SPANISH -------------------------------- */

const es: TravelContent = {
  format: { locale: "es-ES", currency: "EUR" },
  header: {
    tagline: "Viajes a medida",
    navAria: "Navegación principal",
    nav: [
      { href: "#journeys", label: "Rutas" },
      { href: "#itinerary", label: "Itinerarios" },
      { href: "#quiz", label: "Tu estilo" },
      { href: "#tailor", label: "A medida" },
      { href: "#journal", label: "Diario" },
    ],
    planCta: "Empezar a planear",
    menuAria: "Abrir menú de navegación",
  },
  hero: {
    kicker: "Atlas Voyages — desde 2009",
    titleLead: "Rutas dibujadas",
    titleAccent: "a mano",
    titleTail: "para tu forma de viajar",
    intro:
      "Ningún viajero ve el mismo horizonte. Componemos itinerarios lentos y privados hechos de guías locales, alojamientos escondidos y los caminos que los mapas olvidan.",
    searchLabel: "Empieza a soñar",
    whereLabel: "A dónde",
    whereAria: "Elige una región",
    whenLabel: "Cuándo",
    whenPlaceholder: "Añadir fechas",
    styleLabel: "Ritmo",
    styleAria: "Elige un ritmo de viaje",
    styleOptions: [
      { id: "any", label: "Cualquier ritmo" },
      { id: "relaxed", label: "Lento y tranquilo" },
      { id: "balanced", label: "Equilibrado" },
      { id: "active", label: "Activo y salvaje" },
    ],
    searchCta: "Explorar rutas",
    popularLabel: "Muy pedidos",
    stats: [
      { value: "62", label: "Países cartografiados" },
      { value: "14a", label: "Creando rutas" },
      { value: "4,9", label: "Nota de viajeros" },
    ],
  },
  journeys: {
    eyebrow: "Rutas seleccionadas",
    title: "Rutas de autor, listas para rediseñar",
    intro:
      "Un punto de partida, nunca un paquete. Cada ruta se vuelve tuya en cuanto hablamos — cambia un alojamiento, suma un día, cambia un sendero por una mesa.",
    filters: [
      { id: "all", label: "Todas las rutas" },
      { id: "americas", label: "América" },
      { id: "europe", label: "Europa" },
      { id: "asia", label: "Asia" },
      { id: "africa", label: "África" },
    ],
    filterAria: "Filtrar rutas por continente",
    fromLabel: "Desde",
    perPerson: "por persona",
    viewCta: "Ver itinerario",
    items: [
      {
        id: "patagonia",
        name: "Patagonia sin Límites",
        region: "Chile y Argentina",
        continent: "americas",
        continentLabel: "América",
        duration: "11 días",
        pace: "Activo",
        priceFrom: 5700,
        stub: "Granito y glaciares",
        summary:
          "Días de campamento base bajo las Torres, una caminata sobre el glaciar Grey y un asado de cordero bajo el cielo más ancho del sur.",
        image: {
          src: q("photo-1506905925346-21bda4d32df4", 1400),
          alt: "Picos de granito nevados alzándose sobre un valle de la Patagonia",
        },
        highlights: [
          "Circuito completo de las Torres del Paine con guía privado",
          "Trekking sobre hielo y cata de hielo azul en el glaciar Grey",
          "Asado de estancia y tarde a caballo por la pampa",
        ],
        itinerary: [
          {
            day: "Días 01–02",
            title: "Hacia los Andes del Sur",
            body: "Llegada a El Calafate, entrada a la estepa y un lodge junto al fuego mientras el viento escribe el pronóstico.",
          },
          {
            day: "Días 03–05",
            title: "Las Torres",
            body: "Tres caminatas sin prisa por el bosque de lenga hasta el anfiteatro de granito, a la hora de ver las torres sin multitudes.",
          },
          {
            day: "Días 06–08",
            title: "Glaciar Grey y fiordos",
            body: "Crampones sobre el hielo y luego un barco lento entre paredes de hielo azul que se desprenden en calas.",
          },
          {
            day: "Días 09–11",
            title: "Despedida en la estancia",
            body: "Cabalgata con gauchos, un asado al fuego abierto y un brindis por el viaje antes del vuelo al norte.",
          },
        ],
      },
      {
        id: "banff",
        name: "Circuito de Lagos de Banff",
        region: "Rocosas canadienses",
        continent: "americas",
        continentLabel: "América",
        duration: "8 días",
        pace: "Equilibrado",
        priceFrom: 4700,
        stub: "Lagos turquesa",
        summary:
          "Canoa en lagos glaciares en calma, la ruta de los Campos de Hielo y aguas termales de cedro bajo unas Rocosas encendidas.",
        image: {
          src: q("photo-1476514525535-07fb3b4ae5f1", 1400),
          alt: "Una canoa solitaria en un lago glaciar turquesa y quieto",
        },
        highlights: [
          "Canoa al amanecer en el lago Moraine antes de que despierte la orilla",
          "Traslado privado por la Icefields Parkway con un naturalista",
          "Cena a la brasa de cedro y baño en las termas altas",
        ],
        itinerary: [
          {
            day: "Días 01–02",
            title: "Llegada a Bow Valley",
            body: "Entrada suave a la montaña desde Calgary, con un lodge histórico y el río Bow a tu puerta.",
          },
          {
            day: "Días 03–04",
            title: "Lagos de cristal",
            body: "Remada en los lagos Moraine y Louise con la primera luz y un sendero por el bosque hasta una casa de té colgante.",
          },
          {
            day: "Días 05–06",
            title: "Icefields Parkway",
            body: "La espina de las Rocosas hasta Jasper, con paradas en glaciares, cascadas y miradores sin fotografiar.",
          },
          {
            day: "Días 07–08",
            title: "Termas y despedida",
            body: "Una caminata suave por el cañón, un largo baño termal y una última mesa sobre la línea de los árboles.",
          },
        ],
      },
      {
        id: "amalfi",
        name: "Costa Amalfitana Lenta",
        region: "Sur de Italia",
        continent: "europe",
        continentLabel: "Europa",
        duration: "8 días",
        pace: "Tranquilo",
        priceFrom: 4300,
        stub: "Limones y brisa",
        summary:
          "Pueblos en los acantilados, un gozzo privado por la costa y almuerzos largos donde los limones crecen más grandes que el puño.",
        image: {
          src: q("photo-1507525428034-b723cf961d3e", 1400),
          alt: "Agua turquesa rompiendo sobre una costa mediterránea soleada",
        },
        highlights: [
          "Gozzo de madera privado por los acantilados hasta calas escondidas",
          "Almuerzo en el limonar y limoncello con una familia de Ravello",
          "Mesa al atardecer en Positano con la costa a tus pies",
        ],
        itinerary: [
          {
            day: "Días 01–02",
            title: "Obertura en Sorrento",
            body: "Llegada al aroma de cítricos, descanso en una terraza sobre la bahía y la costa marcando el compás.",
          },
          {
            day: "Días 03–04",
            title: "La costa azul",
            body: "Un gozzo privado hasta calas silenciosas, baño desde el barco y almuerzo donde solo llega el mar.",
          },
          {
            day: "Días 05–06",
            title: "Las alturas de Ravello",
            body: "Cambia la orilla por las colinas — villas con jardines, mesa en el limonar y una tarde lenta de música.",
          },
          {
            day: "Días 07–08",
            title: "Adiós en Positano",
            body: "Un último paseo por las escalinatas, mesa al atardecer y un espresso final antes de la carretera.",
          },
        ],
      },
      {
        id: "faroe",
        name: "Norte Salvaje de Feroe",
        region: "Islas Feroe",
        continent: "europe",
        continentLabel: "Europa",
        duration: "6 días",
        pace: "Activo",
        priceFrom: 3950,
        stub: "Acantilados y niebla",
        summary:
          "Pueblos con techos de hierba, senderos al borde del acantilado sobre el Atlántico y un salto en helicóptero entre islas envueltas en tiempo cambiante.",
        image: {
          src: q("photo-1501785888041-af3ef285b470", 1400),
          alt: "Lago quieto reflejando picos dramáticos bajo un cielo nórdico bajo",
        },
        highlights: [
          "Caminata hasta el lago que parece flotar sobre el océano",
          "Salto local en helicóptero entre las islas del norte lejano",
          "Cena casera con una familia de pescadores feroeses",
        ],
        itinerary: [
          {
            day: "Días 01–02",
            title: "Tórshavn y el césped",
            body: "Alojamiento en el casco viejo de techos verdes y una primera caminata al promontorio entre nieblas.",
          },
          {
            day: "Días 03–04",
            title: "El lago suspendido",
            body: "Sendero por el acantilado hasta el lago que parece verter al mar y luego un barco bajo los farallones de aves.",
          },
          {
            day: "Días 05–06",
            title: "Entre islas y a la mesa",
            body: "Un traslado panorámico en helicóptero a las islas exteriores y una larga despedida casera en el puerto.",
          },
        ],
      },
      {
        id: "kyoto",
        name: "Kioto en Flor",
        region: "Japón",
        continent: "asia",
        continentLabel: "Asia",
        duration: "9 días",
        pace: "Equilibrado",
        priceFrom: 4950,
        stub: "Templos y té",
        summary:
          "Ceremonia del té privada, templos al amanecer antes de que abran las puertas y una noche de ryokan donde la cena es una ceremonia aparte.",
        image: {
          src: q("photo-1519681393784-d120267933ba", 1400),
          alt: "Siluetas azules de montañas en capas bajo un cielo nocturno",
        },
        highlights: [
          "Amanecer en las puertas de los templos antes de la apertura al público",
          "Ceremonia del té privada con un maestro de Kioto",
          "Cena kaiseki y noche de onsen en un ryokan de cedro",
        ],
        itinerary: [
          {
            day: "Días 01–02",
            title: "Antigua capital",
            body: "Llegada a Kioto y paseo por los callejones de faroles de Gion mientras la ciudad cambia el día por la noche.",
          },
          {
            day: "Días 03–05",
            title: "Templos y té",
            body: "Amanecer en los templos silenciosos, ceremonia del té por la tarde y una hora lenta de jardín con un monje.",
          },
          {
            day: "Días 06–07",
            title: "Ryokan de montaña",
            body: "Refugio en un ryokan de cedro para baños de onsen, cenas kaiseki y una caminata por el bosque entre picos.",
          },
          {
            day: "Días 08–09",
            title: "Oficio y despedida",
            body: "Encuentro con un tintorero de índigo y un forjador de cuchillos y un último desayuno de mercado antes del vuelo.",
          },
        ],
      },
      {
        id: "marrakech",
        name: "Marrakech y el Atlas",
        region: "Marruecos",
        continent: "africa",
        continentLabel: "África",
        duration: "7 días",
        pace: "Inmersivo",
        priceFrom: 3600,
        stub: "Medinas y dunas",
        summary:
          "Un riad escondido del zoco, un sendero en mula hasta aldeas bereberes y un campamento privado donde las dunas se vuelven cobre al anochecer.",
        image: {
          src: q("photo-1476820865390-c52aeebb9891", 1400),
          alt: "Un camino solitario serpenteando por montañas áridas y cálidas",
        },
        highlights: [
          "Cena guiada por la medina más allá de los puestos turísticos",
          "Sendero en mula y almuerzo en una aldea bereber del Alto Atlas",
          "Campamento privado con dunas de color cobre al atardecer",
        ],
        itinerary: [
          {
            day: "Días 01–02",
            title: "Dentro de la medina",
            body: "Un riad tras una puerta claveteada, té de menta en la azotea y una noche perdida en el zoco con un guía.",
          },
          {
            day: "Días 03–04",
            title: "Alto Atlas",
            body: "Subida a la montaña en mula, pan compartido en una casa bereber y sueño bajo una lluvia de estrellas.",
          },
          {
            day: "Días 05–07",
            title: "Hacia las dunas",
            body: "Travesía al borde del Sáhara para un campamento privado, una hilera de camellos al atardecer y fuego bajo el cielo del desierto.",
          },
        ],
      },
    ],
  },
  detail: {
    eyebrow: "Día a día",
    title: "Mira dentro de la ruta",
    intro:
      "Elige una ruta y ábrela. Cada día es un borrador — un ritmo que redibujamos contigo hasta que tenga tu propia letra.",
    switchLabel: "Viendo ahora",
    includesLabel: "Momentos que marcan",
    dayByDay: "El itinerario, día a día",
    priceNote: "Privado, por persona desde",
    reserveCta: "Solicitar esta ruta",
    talkCta: "Hablar con un diseñador",
  },
  quiz: {
    eyebrow: "Descubre tu estilo",
    title: "Tres preguntas, una ruta",
    intro:
      "Responde con sinceridad y te señalamos la ruta que encaja con tu forma real de viajar — no con la que sale mejor en foto.",
    stepLabel: "Pregunta",
    ofLabel: "de",
    backLabel: "Atrás",
    resultKicker: "Tu resultado",
    resultLead: "Tu forma de viajar apunta a",
    matchLabel: "afinidad",
    restartLabel: "Repetir el test",
    viewCta: "Abrir esta ruta",
    questions: [
      {
        id: "pull",
        prompt: "¿Qué te empuja hacia el horizonte?",
        options: [
          { id: "wild", label: "Naturaleza bruta y senderos largos", journeyId: "patagonia" },
          { id: "ritual", label: "Cultura, ritual y calles antiguas", journeyId: "kyoto" },
          { id: "table", label: "Comida lenta y aire de mar", journeyId: "amalfi" },
          { id: "colour", label: "Color, mercados y calor", journeyId: "marrakech" },
        ],
      },
      {
        id: "morning",
        prompt: "Tu mañana ideal es así",
        options: [
          { id: "boots", label: "Botas puestas antes del sol", journeyId: "faroe" },
          { id: "garden", label: "Té en un jardín silencioso", journeyId: "kyoto" },
          { id: "terrace", label: "Espresso en una terraza", journeyId: "amalfi" },
          { id: "lake", label: "Café junto a un lago glaciar", journeyId: "banff" },
        ],
      },
      {
        id: "land",
        prompt: "Elige el paisaje que llama más fuerte",
        options: [
          { id: "ice", label: "Picos afilados y hielo azul", journeyId: "patagonia" },
          { id: "cliff", label: "Acantilados con niebla sobre el mar", journeyId: "faroe" },
          { id: "pine", label: "Lagos turquesa y pinos", journeyId: "banff" },
          { id: "dune", label: "Dunas del desierto al anochecer", journeyId: "marrakech" },
        ],
      },
    ],
  },
  tailor: {
    eyebrow: "Por qué a medida",
    title: "Un viaje que solo podría ser tuyo",
    intro:
      "No vendemos asientos en una agenda. Diseñamos un viaje a la vez, para un viajero a la vez — y seguimos a tu lado mucho después de aterrizar.",
    pillars: [
      {
        id: "designer",
        title: "Un diseñador de principio a fin",
        body: "Quien sueña tu ruta es quien responde cuando cambian los planes. Sin traspasos, sin call center.",
      },
      {
        id: "local",
        title: "Manos locales sobre el terreno",
        body: "Guías, cocineros y anfitriones con quienes hemos compartido mesa — no nombres de una lista. Las buenas mesas son suyas.",
      },
      {
        id: "pace",
        title: "Un ritmo hecho para ti",
        body: "Días que respiran. Dejamos huecos a propósito, porque el mejor momento rara vez está en el itinerario.",
      },
      {
        id: "care",
        title: "Despiertos mientras duermes",
        body: "Una persona real de guardia en cada huso horario. Una conexión perdida es problema nuestro, nunca tuyo.",
      },
    ],
    quote:
      "Rehicieron nuestra semana entera cuando una tormenta cerró el paso — y fueron los tres mejores días de nuestra vida.",
    quoteAuthor: "Marina y Theo Vasquez",
    quoteRole: "Patagonia, el otoño pasado",
  },
  journal: {
    eyebrow: "El diario Atlas",
    title: "Notas de campo y crónicas lentas",
    intro:
      "Historias, estaciones y pequeñas obsesiones del camino — escritas por quienes diseñan las rutas.",
    readLabel: "Leer",
    entries: [
      {
        id: "shoulder",
        category: "Cuándo ir",
        title: "En defensa de la temporada media",
        excerpt:
          "Por qué las semanas a ambos lados del pico — luz más suave, senderos vacíos, precios amables — son en silencio el mejor momento para viajar a casi cualquier lugar.",
        readTime: "6 min de lectura",
        author: "Camila Duarte",
        image: {
          src: q("photo-1502920917128-1aa500764cbd", 900),
          alt: "Un ala sobre las nubes, vista desde la ventanilla de un avión en altura",
        },
      },
      {
        id: "pack",
        category: "El oficio",
        title: "Lo que un gran guía lleva de verdad",
        excerpt:
          "Nunca son los aparatos. Nuestros guías en tres continentes abren la mochila y todo se reduce a paciencia, algo de comer y sentido del tiempo.",
        readTime: "8 min de lectura",
        author: "Youssef El Amrani",
        image: {
          src: q("photo-1521295121783-8a321d551ad2", 900),
          alt: "Un mapa de viaje doblado junto a una cámara analógica sobre una mesa de madera",
        },
      },
      {
        id: "north",
        category: "Crónica",
        title: "Persiguiendo el tiempo en el norte lejano",
        excerpt:
          "Una semana en las Feroe nos enseñó a dejar de pelear con el pronóstico y empezar a planear en torno a él. La niebla, al final, es el punto.",
        readTime: "5 min de lectura",
        author: "Lars Jacobsen",
        image: {
          src: q("photo-1519681393784-d120267933ba", 900),
          alt: "Montañas azules en capas bajo un tenue cielo nocturno del norte",
        },
      },
    ],
  },
  footer: {
    tagline: "Viajes a medida",
    blurb:
      "Atlas Voyages diseña viajes privados y de ritmo lento para quien prefiere ir a fondo antes que marcar casillas. Un viajero, una ruta, cada vez.",
    columns: [
      { title: "Rutas", links: ["América", "Europa", "Asia", "África", "Expediciones a medida"] },
      { title: "Estudio", links: ["Nuestros diseñadores", "Cómo planeamos", "Viaje responsable", "Diario"] },
    ],
    contactTitle: "Habla con nosotros",
    address: "Rua dos Navegantes 88, Copacabana, Río de Janeiro",
    email: "hola@atlasvoyages.co",
    phone: "+55 21 4002 8922",
    social: [
      { label: "Instagram", icon: "camera" },
      { label: "Newsletter", icon: "atsign" },
      { label: "Comunidad", icon: "share" },
      { label: "Mundo", icon: "globe" },
    ],
    newsletterTitle: "La crónica",
    newsletterBody: "Una carta cuidada al mes — un destino en su estación, sin ruido.",
    newsletterPlaceholder: "Tu correo",
    newsletterCta: "Suscribirme",
    newsletterDone: "Estás en la lista. Espera la primera crónica.",
    rights: "Atlas Voyages. Una experiencia conceptual. Todos los derechos reservados.",
    credits: "Concebido como concepto por VigApp.",
  },
};

export const travelDictionary: DemoDictionary<TravelContent> = { en, pt, es };
