import type { DemoDictionary } from "@/demos/content";

export interface FilterOption {
  id: string;
  label: string;
}

export interface Filters {
  city: string;
  type: string;
  maxPrice: number;
}

export interface Listing {
  id: string;
  name: string;
  address: string;
  city: string;
  cityLabel: string;
  type: string;
  typeLabel: string;
  price: number;
  beds: number;
  baths: number;
  area: number;
  imageId: string;
  alt: string;
  tag: string;
}

export interface Neighborhood {
  id: string;
  name: string;
  tagline: string;
  count: string;
  imageId: string;
  alt: string;
}

export interface GalleryShot {
  id: string;
  imageId: string;
  alt: string;
  caption: string;
}

export interface JourneyStep {
  numeral: string;
  title: string;
  body: string;
}

export interface AltureContent {
  format: { locale: string; currency: string; areaUnit: string };
  header: {
    navAria: string;
    nav: { href: string; label: string }[];
    savedLabel: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleItalic: string;
    lede: string;
    imageAlt: string;
    stats: { value: string; label: string }[];
    search: {
      title: string;
      cityLabel: string;
      typeLabel: string;
      priceLabel: string;
      searchCta: string;
      resultsHint: string;
    };
  };
  filters: {
    cities: FilterOption[];
    types: FilterOption[];
    priceMin: number;
    priceMax: number;
    priceStep: number;
    upToLabel: string;
  };
  listings: {
    eyebrow: string;
    title: string;
    intro: string;
    countLabel: string;
    bedsLabel: string;
    bathsLabel: string;
    areaLabel: string;
    saveAria: string;
    unsaveAria: string;
    viewLabel: string;
    emptyTitle: string;
    emptyBody: string;
    resetCta: string;
    items: Listing[];
  };
  neighborhoods: {
    eyebrow: string;
    title: string;
    intro: string;
    exploreLabel: string;
    items: Neighborhood[];
  };
  spotlight: {
    eyebrow: string;
    title: string;
    address: string;
    price: number;
    priceLabel: string;
    description: string;
    specs: { label: string; value: string }[];
    features: string[];
    gallery: GalleryShot[];
    galleryAria: string;
    tourCta: string;
    brochureCta: string;
  };
  journey: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: JourneyStep[];
    calc: {
      title: string;
      intro: string;
      priceLabel: string;
      downLabel: string;
      yearsLabel: string;
      rateLabel: string;
      monthlyLabel: string;
      loanLabel: string;
      downValueLabel: string;
      disclaimer: string;
      rate: number;
      defaultPrice: number;
      minPrice: number;
      maxPrice: number;
      priceStep: number;
      defaultDown: number;
      years: number[];
      defaultYears: number;
    };
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    agent: { name: string; role: string; imageId: string; alt: string };
    points: { label: string; value: string }[];
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitCta: string;
    consent: string;
    successTitle: string;
    successBody: string;
    resetCta: string;
  };
  footer: {
    tagline: string;
    columns: { title: string; links: string[] }[];
    contactTitle: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    socialLabel: string;
    socials: { label: string; icon: string }[];
    legal: string;
    credits: string;
  };
}

const IMG = {
  luxuryHouse: "photo-1600585154340-be6161a56a0c",
  estate: "photo-1564013799919-ab600027ffc6",
  pool: "photo-1512917774080-9991f1c4c750",
  modern: "photo-1580587771525-78b9dba3b914",
  villa: "photo-1583608205776-bfd35f0d9f83",
  dusk: "photo-1605276374104-dee2a0ed3cd6",
  interior: "photo-1560448204-e02f11c3d0e2",
} as const;

const en: AltureContent = {
  format: { locale: "en-US", currency: "USD", areaUnit: "sq ft" },
  header: {
    navAria: "Primary",
    nav: [
      { href: "#listings", label: "Residences" },
      { href: "#neighborhoods", label: "Neighborhoods" },
      { href: "#spotlight", label: "Spotlight" },
      { href: "#journey", label: "Buying" },
      { href: "#contact", label: "Advisors" },
    ],
    savedLabel: "Saved",
    cta: "Book a viewing",
  },
  hero: {
    eyebrow: "Private residential collection",
    title: "Homes composed",
    titleItalic: "for a quieter life",
    lede: "Alture curates a small portfolio of architecturally significant residences across the coast and the hills — represented by advisors who value discretion as much as design.",
    imageAlt: "Sunlit modernist villa with floor-to-ceiling glass at golden hour",
    stats: [
      { value: "$2.4B", label: "In closed sales" },
      { value: "180+", label: "Private residences" },
      { value: "26", label: "Years advising" },
    ],
    search: {
      title: "Begin your search",
      cityLabel: "Location",
      typeLabel: "Residence",
      priceLabel: "Budget up to",
      searchCta: "View residences",
      resultsHint: "matching residences",
    },
  },
  filters: {
    cities: [
      { id: "all", label: "All locations" },
      { id: "montauk", label: "Montauk" },
      { id: "aspen", label: "Aspen" },
      { id: "malibu", label: "Malibu" },
      { id: "carmel", label: "Carmel Bay" },
    ],
    types: [
      { id: "all", label: "All types" },
      { id: "villa", label: "Villa" },
      { id: "estate", label: "Estate" },
      { id: "penthouse", label: "Penthouse" },
      { id: "retreat", label: "Retreat" },
    ],
    priceMin: 1500000,
    priceMax: 7000000,
    priceStep: 250000,
    upToLabel: "up to",
  },
  listings: {
    eyebrow: "The collection",
    title: "Featured residences",
    intro: "Each home is personally vetted by our advisory team. Filter by location, type and budget to shape the shortlist that fits you.",
    countLabel: "residences",
    bedsLabel: "Beds",
    bathsLabel: "Baths",
    areaLabel: "sq ft",
    saveAria: "Save this residence",
    unsaveAria: "Remove from saved",
    viewLabel: "View residence",
    emptyTitle: "No residences match yet",
    emptyBody: "Try widening your budget or exploring another location — our full collection is always broader than a single search.",
    resetCta: "Reset filters",
    items: [
      {
        id: "cliffline",
        name: "Cliffline House",
        address: "14 Old Montauk Highway, Montauk",
        city: "montauk",
        cityLabel: "Montauk",
        type: "villa",
        typeLabel: "Villa",
        price: 4850000,
        beds: 5,
        baths: 4,
        area: 4820,
        imageId: IMG.luxuryHouse,
        alt: "White contemporary cliffside villa above the ocean",
        tag: "New listing",
      },
      {
        id: "aurelia",
        name: "Villa Aurelia",
        address: "88 Red Mountain Road, Aspen",
        city: "aspen",
        cityLabel: "Aspen",
        type: "estate",
        typeLabel: "Estate",
        price: 6400000,
        beds: 6,
        baths: 6,
        area: 6100,
        imageId: IMG.estate,
        alt: "Stone and glass mountain estate framed by pines",
        tag: "Signature",
      },
      {
        id: "azure",
        name: "The Azure Pavilion",
        address: "301 Pacific Coast Highway, Malibu",
        city: "malibu",
        cityLabel: "Malibu",
        type: "villa",
        typeLabel: "Villa",
        price: 5250000,
        beds: 4,
        baths: 5,
        area: 4400,
        imageId: IMG.pool,
        alt: "Modern villa with an infinity pool overlooking the sea",
        tag: "Waterfront",
      },
      {
        id: "linden",
        name: "Linden Row",
        address: "7 Scenic Drive, Carmel Bay",
        city: "carmel",
        cityLabel: "Carmel Bay",
        type: "retreat",
        typeLabel: "Retreat",
        price: 2350000,
        beds: 3,
        baths: 3,
        area: 2680,
        imageId: IMG.modern,
        alt: "Minimalist single-storey retreat with warm cedar cladding",
        tag: "Quiet street",
      },
      {
        id: "solara",
        name: "Casa Solara",
        address: "52 Point Dume Lane, Malibu",
        city: "malibu",
        cityLabel: "Malibu",
        type: "estate",
        typeLabel: "Estate",
        price: 3950000,
        beds: 5,
        baths: 4,
        area: 4020,
        imageId: IMG.villa,
        alt: "Mediterranean-inspired villa with arched terraces",
        tag: "Just reduced",
      },
      {
        id: "meridian",
        name: "Meridian Penthouse",
        address: "1 Harbor Point, Carmel Bay",
        city: "carmel",
        cityLabel: "Carmel Bay",
        type: "penthouse",
        typeLabel: "Penthouse",
        price: 2950000,
        beds: 3,
        baths: 3,
        area: 2240,
        imageId: IMG.dusk,
        alt: "Illuminated hillside residence at dusk with harbor views",
        tag: "Skyline views",
      },
    ],
  },
  neighborhoods: {
    eyebrow: "Where to belong",
    title: "Neighborhoods we know by heart",
    intro: "We do not sell addresses — we place people. These are the enclaves our advisors live in, walk daily and understand at street level.",
    exploreLabel: "Explore",
    items: [
      {
        id: "montauk",
        name: "Montauk",
        tagline: "Dune grass, salt air and end-of-the-island calm.",
        count: "12 residences",
        imageId: IMG.luxuryHouse,
        alt: "Coastal Montauk home behind wind-shaped dunes",
      },
      {
        id: "aspen",
        name: "Aspen",
        tagline: "Alpine light, ski-in living and cedar warmth.",
        count: "9 residences",
        imageId: IMG.estate,
        alt: "Aspen mountain estate surrounded by evergreens",
      },
      {
        id: "malibu",
        name: "Malibu",
        tagline: "Cliff terraces and the long line of the Pacific.",
        count: "15 residences",
        imageId: IMG.pool,
        alt: "Malibu villa terrace opening to the ocean",
      },
      {
        id: "carmel",
        name: "Carmel Bay",
        tagline: "Cypress lanes, gallery streets and gentle fog.",
        count: "7 residences",
        imageId: IMG.dusk,
        alt: "Carmel Bay hillside home glowing at twilight",
      },
    ],
  },
  spotlight: {
    eyebrow: "Property spotlight",
    title: "Cliffline House",
    address: "14 Old Montauk Highway, Montauk",
    price: 4850000,
    priceLabel: "Guide price",
    description: "A five-bedroom cliffside villa carved into the last rise before the Atlantic. Douglas-fir ceilings, a suspended glass stair and a west terrace built for the long evenings. Sold with its own dune path to a private stretch of shoreline.",
    specs: [
      { label: "Bedrooms", value: "5" },
      { label: "Bathrooms", value: "4" },
      { label: "Interior", value: "4,820 sq ft" },
      { label: "Land", value: "1.4 acres" },
      { label: "Built", value: "2021" },
      { label: "Parking", value: "3 cars" },
    ],
    features: [
      "Heated infinity pool and sunken lounge",
      "Chef's kitchen with butler pantry",
      "Private dune path to the beach",
      "Geothermal climate system",
    ],
    gallery: [
      { id: "exterior", imageId: IMG.luxuryHouse, alt: "Cliffline House exterior above the shoreline", caption: "West elevation at golden hour" },
      { id: "living", imageId: IMG.interior, alt: "Open living room with floor-to-ceiling glass", caption: "Living room and glass stair" },
      { id: "pool", imageId: IMG.pool, alt: "Infinity pool overlooking the ocean", caption: "Infinity pool and sea terrace" },
      { id: "dusk", imageId: IMG.dusk, alt: "Cliffline House glowing at dusk", caption: "The house after sunset" },
    ],
    galleryAria: "Cliffline House gallery",
    tourCta: "Request a private tour",
    brochureCta: "Download brochure",
  },
  journey: {
    eyebrow: "The Alture way",
    title: "A calmer path to ownership",
    intro: "Buying a landmark home should feel considered, not rushed. Four steps, one dedicated advisor, and an estimate you can shape yourself.",
    steps: [
      { numeral: "01", title: "Private consultation", body: "We begin with a conversation about how you live, then translate it into a precise brief — location, light, privacy and price." },
      { numeral: "02", title: "Curated shortlist", body: "You receive a hand-selected set of residences, several before they reach the open market, with candid notes on each." },
      { numeral: "03", title: "Guided viewings", body: "Your advisor accompanies every viewing, coordinates surveys and negotiates terms entirely on your behalf." },
      { numeral: "04", title: "Considered close", body: "We manage legal, financing and handover so completion day is a formality — and the keys arrive without friction." },
    ],
    calc: {
      title: "Mortgage estimator",
      intro: "A quick sense of your monthly commitment. Adjust the price, deposit and term to see the estimate move.",
      priceLabel: "Property price",
      downLabel: "Deposit",
      yearsLabel: "Term",
      rateLabel: "Assumed rate",
      monthlyLabel: "Estimated monthly",
      loanLabel: "Loan amount",
      downValueLabel: "Deposit amount",
      disclaimer: "Illustrative only. Figures assume a fixed rate and exclude taxes, insurance and fees. Not a mortgage offer.",
      rate: 0.065,
      defaultPrice: 4850000,
      minPrice: 1000000,
      maxPrice: 8000000,
      priceStep: 50000,
      defaultDown: 20,
      years: [15, 20, 25, 30],
      defaultYears: 30,
    },
  },
  contact: {
    eyebrow: "Speak with an advisor",
    title: "Let us find the one that fits",
    body: "Tell us what you are looking for. Your dedicated advisor will reply within a day, in confidence, with a shortlist worth your time.",
    agent: {
      name: "Eleanor Vance",
      role: "Principal Advisor, Coastal & Hills",
      imageId: IMG.interior,
      alt: "Portrait setting of an elegant sunlit interior",
    },
    points: [
      { label: "Direct line", value: "+1 (631) 555-0142" },
      { label: "Email", value: "advisors@alture.estate" },
      { label: "By appointment", value: "Montauk · Aspen · Malibu" },
    ],
    nameLabel: "Full name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "you@email.com",
    messageLabel: "What are you looking for?",
    messagePlaceholder: "A quiet three-bedroom near the coast, ready by spring...",
    submitCta: "Request a shortlist",
    consent: "By submitting you agree to be contacted by an Alture advisor. We never share your details.",
    successTitle: "Your request is with us",
    successBody: "Eleanor will be in touch within one business day with a shortlist shaped around your brief.",
    resetCta: "Send another request",
  },
  footer: {
    tagline: "A private residential advisory representing architecturally significant homes across the coast and the hills.",
    columns: [
      { title: "Collection", links: ["Villas", "Estates", "Penthouses", "Retreats"] },
      { title: "Company", links: ["Our advisors", "Journal", "Careers", "Press"] },
      { title: "Clients", links: ["Buying", "Selling", "Private office", "Valuations"] },
    ],
    contactTitle: "Studio",
    address: "9 Harbor Point, Carmel Bay, CA 93921",
    phone: "+1 (631) 555-0142",
    email: "advisors@alture.estate",
    hours: "By appointment, seven days",
    socialLabel: "Follow Alture",
    socials: [
      { label: "Journal", icon: "at" },
      { label: "Portfolio", icon: "camera" },
      { label: "Enquiries", icon: "message" },
    ],
    legal: "© 2026 Alture Residential. All rights reserved.",
    credits: "A concept experience crafted by VigApp.",
  },
};

const pt: AltureContent = {
  format: { locale: "pt-BR", currency: "BRL", areaUnit: "m²" },
  header: {
    navAria: "Principal",
    nav: [
      { href: "#listings", label: "Residências" },
      { href: "#neighborhoods", label: "Bairros" },
      { href: "#spotlight", label: "Destaque" },
      { href: "#journey", label: "Comprar" },
      { href: "#contact", label: "Consultores" },
    ],
    savedLabel: "Salvos",
    cta: "Agendar visita",
  },
  hero: {
    eyebrow: "Coleção residencial privada",
    title: "Casas pensadas",
    titleItalic: "para uma vida mais serena",
    lede: "A Alture reúne um portfólio enxuto de residências de arquitetura marcante no litoral e nas montanhas — representadas por consultores que valorizam a discrição tanto quanto o design.",
    imageAlt: "Villa modernista iluminada pelo sol com vidro do piso ao teto ao entardecer",
    stats: [
      { value: "R$ 9,4bi", label: "Em vendas fechadas" },
      { value: "180+", label: "Residências privadas" },
      { value: "26", label: "Anos de assessoria" },
    ],
    search: {
      title: "Comece sua busca",
      cityLabel: "Localização",
      typeLabel: "Residência",
      priceLabel: "Orçamento até",
      searchCta: "Ver residências",
      resultsHint: "residências compatíveis",
    },
  },
  filters: {
    cities: [
      { id: "all", label: "Todas as regiões" },
      { id: "montauk", label: "Trancoso" },
      { id: "aspen", label: "Campos do Jordão" },
      { id: "malibu", label: "Guarujá" },
      { id: "carmel", label: "Búzios" },
    ],
    types: [
      { id: "all", label: "Todos os tipos" },
      { id: "villa", label: "Villa" },
      { id: "estate", label: "Mansão" },
      { id: "penthouse", label: "Cobertura" },
      { id: "retreat", label: "Refúgio" },
    ],
    priceMin: 4000000,
    priceMax: 34000000,
    priceStep: 1000000,
    upToLabel: "até",
  },
  listings: {
    eyebrow: "A coleção",
    title: "Residências em destaque",
    intro: "Cada casa é avaliada pessoalmente pela nossa equipe de assessoria. Filtre por localização, tipo e orçamento para montar a lista que combina com você.",
    countLabel: "residências",
    bedsLabel: "Suítes",
    bathsLabel: "Banheiros",
    areaLabel: "m²",
    saveAria: "Salvar esta residência",
    unsaveAria: "Remover dos salvos",
    viewLabel: "Ver residência",
    emptyTitle: "Nenhuma residência encontrada",
    emptyBody: "Amplie o orçamento ou explore outra região — nossa coleção completa é sempre mais ampla do que uma única busca.",
    resetCta: "Limpar filtros",
    items: [
      {
        id: "cliffline",
        name: "Casa Cliffline",
        address: "Estrada do Arraial, 14, Trancoso",
        city: "montauk",
        cityLabel: "Trancoso",
        type: "villa",
        typeLabel: "Villa",
        price: 22500000,
        beds: 5,
        baths: 4,
        area: 448,
        imageId: IMG.luxuryHouse,
        alt: "Villa contemporânea branca sobre a falésia diante do mar",
        tag: "Novo",
      },
      {
        id: "aurelia",
        name: "Villa Aurélia",
        address: "Alto do Capivari, 88, Campos do Jordão",
        city: "aspen",
        cityLabel: "Campos do Jordão",
        type: "estate",
        typeLabel: "Mansão",
        price: 31500000,
        beds: 6,
        baths: 6,
        area: 567,
        imageId: IMG.estate,
        alt: "Mansão de pedra e vidro na montanha entre pinheiros",
        tag: "Exclusiva",
      },
      {
        id: "azure",
        name: "Pavilhão Azure",
        address: "Av. da Praia, 301, Guarujá",
        city: "malibu",
        cityLabel: "Guarujá",
        type: "villa",
        typeLabel: "Villa",
        price: 24800000,
        beds: 4,
        baths: 5,
        area: 409,
        imageId: IMG.pool,
        alt: "Villa moderna com piscina de borda infinita diante do mar",
        tag: "Beira-mar",
      },
      {
        id: "linden",
        name: "Refúgio Linden",
        address: "Rua das Pedras, 7, Búzios",
        city: "carmel",
        cityLabel: "Búzios",
        type: "retreat",
        typeLabel: "Refúgio",
        price: 10900000,
        beds: 3,
        baths: 3,
        area: 249,
        imageId: IMG.modern,
        alt: "Refúgio minimalista térreo com revestimento de cedro",
        tag: "Rua tranquila",
      },
      {
        id: "solara",
        name: "Casa Solara",
        address: "Ponta da Ferradura, 52, Guarujá",
        city: "malibu",
        cityLabel: "Guarujá",
        type: "estate",
        typeLabel: "Mansão",
        price: 18600000,
        beds: 5,
        baths: 4,
        area: 373,
        imageId: IMG.villa,
        alt: "Villa de inspiração mediterrânea com terraços em arco",
        tag: "Preço revisto",
      },
      {
        id: "meridian",
        name: "Cobertura Meridian",
        address: "Marina, 1, Búzios",
        city: "carmel",
        cityLabel: "Búzios",
        type: "penthouse",
        typeLabel: "Cobertura",
        price: 13900000,
        beds: 3,
        baths: 3,
        area: 208,
        imageId: IMG.dusk,
        alt: "Residência iluminada na encosta ao entardecer com vista da marina",
        tag: "Vista panorâmica",
      },
    ],
  },
  neighborhoods: {
    eyebrow: "Onde pertencer",
    title: "Bairros que conhecemos de cor",
    intro: "Não vendemos endereços — posicionamos pessoas. Estes são os recantos onde nossos consultores vivem, caminham todos os dias e entendem no nível da rua.",
    exploreLabel: "Explorar",
    items: [
      {
        id: "montauk",
        name: "Trancoso",
        tagline: "Quadrado, brisa salgada e a calma do fim do mundo.",
        count: "12 residências",
        imageId: IMG.luxuryHouse,
        alt: "Casa litorânea em Trancoso atrás das dunas",
      },
      {
        id: "aspen",
        name: "Campos do Jordão",
        tagline: "Luz de altitude, ar de montanha e calor do cedro.",
        count: "9 residências",
        imageId: IMG.estate,
        alt: "Mansão na montanha de Campos do Jordão entre pinheiros",
      },
      {
        id: "malibu",
        name: "Guarujá",
        tagline: "Terraços sobre o costão e a linha longa do mar.",
        count: "15 residências",
        imageId: IMG.pool,
        alt: "Terraço de villa no Guarujá aberto para o oceano",
      },
      {
        id: "carmel",
        name: "Búzios",
        tagline: "Ruelas de pedra, galerias e neblina suave.",
        count: "7 residências",
        imageId: IMG.dusk,
        alt: "Casa na encosta de Búzios ao crepúsculo",
      },
    ],
  },
  spotlight: {
    eyebrow: "Destaque da coleção",
    title: "Casa Cliffline",
    address: "Estrada do Arraial, 14, Trancoso",
    price: 22500000,
    priceLabel: "Preço de referência",
    description: "Uma villa de cinco suítes esculpida na última elevação antes do mar. Tetos em pinho, escada de vidro suspensa e um terraço a oeste feito para as noites longas. Vendida com trilha própria pelas dunas até uma faixa reservada de praia.",
    specs: [
      { label: "Suítes", value: "5" },
      { label: "Banheiros", value: "4" },
      { label: "Área interna", value: "448 m²" },
      { label: "Terreno", value: "5.700 m²" },
      { label: "Construção", value: "2021" },
      { label: "Garagem", value: "3 vagas" },
    ],
    features: [
      "Piscina aquecida de borda infinita e lounge rebaixado",
      "Cozinha profissional com copa de serviço",
      "Trilha privativa pelas dunas até a praia",
      "Climatização geotérmica",
    ],
    gallery: [
      { id: "exterior", imageId: IMG.luxuryHouse, alt: "Fachada da Casa Cliffline acima da orla", caption: "Fachada oeste ao entardecer" },
      { id: "living", imageId: IMG.interior, alt: "Sala ampla com vidro do piso ao teto", caption: "Sala e escada de vidro" },
      { id: "pool", imageId: IMG.pool, alt: "Piscina de borda infinita voltada para o mar", caption: "Piscina e terraço do mar" },
      { id: "dusk", imageId: IMG.dusk, alt: "Casa Cliffline iluminada ao anoitecer", caption: "A casa após o pôr do sol" },
    ],
    galleryAria: "Galeria da Casa Cliffline",
    tourCta: "Solicitar visita privada",
    brochureCta: "Baixar o material",
  },
  journey: {
    eyebrow: "O jeito Alture",
    title: "Um caminho mais sereno até a compra",
    intro: "Comprar uma casa marcante deve ser algo pensado, não apressado. Quatro etapas, um consultor dedicado e uma estimativa que você mesmo ajusta.",
    steps: [
      { numeral: "01", title: "Consulta reservada", body: "Começamos por uma conversa sobre como você vive e a traduzimos num briefing preciso — localização, luz, privacidade e preço." },
      { numeral: "02", title: "Seleção curada", body: "Você recebe um conjunto escolhido a dedo, várias antes de chegarem ao mercado, com notas francas sobre cada uma." },
      { numeral: "03", title: "Visitas guiadas", body: "Seu consultor acompanha cada visita, coordena as vistorias e negocia as condições inteiramente por você." },
      { numeral: "04", title: "Fechamento cuidadoso", body: "Cuidamos do jurídico, do financiamento e da entrega para que o dia da assinatura seja apenas uma formalidade." },
    ],
    calc: {
      title: "Simulador de financiamento",
      intro: "Uma noção rápida do seu compromisso mensal. Ajuste o preço, a entrada e o prazo para ver a estimativa mudar.",
      priceLabel: "Valor do imóvel",
      downLabel: "Entrada",
      yearsLabel: "Prazo",
      rateLabel: "Taxa considerada",
      monthlyLabel: "Parcela estimada",
      loanLabel: "Valor financiado",
      downValueLabel: "Valor da entrada",
      disclaimer: "Apenas ilustrativo. Os valores assumem taxa fixa e excluem impostos, seguros e taxas. Não é uma oferta de crédito.",
      rate: 0.105,
      defaultPrice: 22500000,
      minPrice: 4000000,
      maxPrice: 36000000,
      priceStep: 250000,
      defaultDown: 30,
      years: [15, 20, 25, 30],
      defaultYears: 30,
    },
  },
  contact: {
    eyebrow: "Fale com um consultor",
    title: "Vamos encontrar a casa certa",
    body: "Conte o que procura. Seu consultor dedicado responde em até um dia, com discrição, trazendo uma seleção que vale o seu tempo.",
    agent: {
      name: "Helena Vasconcelos",
      role: "Consultora Principal, Litoral e Serra",
      imageId: IMG.interior,
      alt: "Ambiente interno elegante e iluminado pelo sol",
    },
    points: [
      { label: "Linha direta", value: "+55 (11) 95500-0142" },
      { label: "E-mail", value: "consultores@alture.estate" },
      { label: "Com hora marcada", value: "Trancoso · Campos · Guarujá" },
    ],
    nameLabel: "Nome completo",
    namePlaceholder: "Seu nome",
    emailLabel: "E-mail",
    emailPlaceholder: "voce@email.com",
    messageLabel: "O que você procura?",
    messagePlaceholder: "Uma casa tranquila de três suítes perto do mar, pronta na primavera...",
    submitCta: "Solicitar seleção",
    consent: "Ao enviar, você concorda em ser contatado por um consultor Alture. Nunca compartilhamos seus dados.",
    successTitle: "Recebemos o seu pedido",
    successBody: "Helena entrará em contato em até um dia útil com uma seleção montada a partir do seu briefing.",
    resetCta: "Enviar outro pedido",
  },
  footer: {
    tagline: "Uma assessoria residencial privada que representa casas de arquitetura marcante no litoral e nas montanhas.",
    columns: [
      { title: "Coleção", links: ["Villas", "Mansões", "Coberturas", "Refúgios"] },
      { title: "Empresa", links: ["Nossos consultores", "Revista", "Carreiras", "Imprensa"] },
      { title: "Clientes", links: ["Comprar", "Vender", "Escritório privado", "Avaliações"] },
    ],
    contactTitle: "Estúdio",
    address: "Marina, 9, Búzios, RJ 28950",
    phone: "+55 (11) 95500-0142",
    email: "consultores@alture.estate",
    hours: "Com hora marcada, todos os dias",
    socialLabel: "Siga a Alture",
    socials: [
      { label: "Revista", icon: "at" },
      { label: "Portfólio", icon: "camera" },
      { label: "Contato", icon: "message" },
    ],
    legal: "© 2026 Alture Residencial. Todos os direitos reservados.",
    credits: "Uma experiência conceito criada pela VigApp.",
  },
};

const es: AltureContent = {
  format: { locale: "es-ES", currency: "EUR", areaUnit: "m²" },
  header: {
    navAria: "Principal",
    nav: [
      { href: "#listings", label: "Residencias" },
      { href: "#neighborhoods", label: "Barrios" },
      { href: "#spotlight", label: "Destacado" },
      { href: "#journey", label: "Comprar" },
      { href: "#contact", label: "Asesores" },
    ],
    savedLabel: "Guardados",
    cta: "Reservar visita",
  },
  hero: {
    eyebrow: "Colección residencial privada",
    title: "Casas concebidas",
    titleItalic: "para una vida más serena",
    lede: "Alture reúne un portafolio reducido de residencias de arquitectura singular en la costa y las colinas — representadas por asesores que valoran la discreción tanto como el diseño.",
    imageAlt: "Villa modernista bañada por el sol con vidrio de suelo a techo al atardecer",
    stats: [
      { value: "2,1B €", label: "En ventas cerradas" },
      { value: "180+", label: "Residencias privadas" },
      { value: "26", label: "Años asesorando" },
    ],
    search: {
      title: "Empiece su búsqueda",
      cityLabel: "Ubicación",
      typeLabel: "Residencia",
      priceLabel: "Presupuesto hasta",
      searchCta: "Ver residencias",
      resultsHint: "residencias compatibles",
    },
  },
  filters: {
    cities: [
      { id: "all", label: "Todas las zonas" },
      { id: "montauk", label: "Cadaqués" },
      { id: "aspen", label: "Baqueira" },
      { id: "malibu", label: "Marbella" },
      { id: "carmel", label: "Sitges" },
    ],
    types: [
      { id: "all", label: "Todos los tipos" },
      { id: "villa", label: "Villa" },
      { id: "estate", label: "Finca" },
      { id: "penthouse", label: "Ático" },
      { id: "retreat", label: "Refugio" },
    ],
    priceMin: 1500000,
    priceMax: 6500000,
    priceStep: 250000,
    upToLabel: "hasta",
  },
  listings: {
    eyebrow: "La colección",
    title: "Residencias destacadas",
    intro: "Cada casa es valorada personalmente por nuestro equipo de asesoría. Filtre por ubicación, tipo y presupuesto para dar forma a la selección que le encaja.",
    countLabel: "residencias",
    bedsLabel: "Dorm.",
    bathsLabel: "Baños",
    areaLabel: "m²",
    saveAria: "Guardar esta residencia",
    unsaveAria: "Quitar de guardados",
    viewLabel: "Ver residencia",
    emptyTitle: "Ninguna residencia coincide aún",
    emptyBody: "Amplíe el presupuesto o explore otra ubicación — nuestra colección completa siempre es más amplia que una sola búsqueda.",
    resetCta: "Restablecer filtros",
    items: [
      {
        id: "cliffline",
        name: "Casa Cliffline",
        address: "Camí de Cala Nans, 14, Cadaqués",
        city: "montauk",
        cityLabel: "Cadaqués",
        type: "villa",
        typeLabel: "Villa",
        price: 4450000,
        beds: 5,
        baths: 4,
        area: 448,
        imageId: IMG.luxuryHouse,
        alt: "Villa contemporánea blanca sobre el acantilado frente al mar",
        tag: "Nueva",
      },
      {
        id: "aurelia",
        name: "Villa Aurelia",
        address: "Camí de Beret, 88, Baqueira",
        city: "aspen",
        cityLabel: "Baqueira",
        type: "estate",
        typeLabel: "Finca",
        price: 5800000,
        beds: 6,
        baths: 6,
        area: 567,
        imageId: IMG.estate,
        alt: "Finca de piedra y vidrio en la montaña entre pinos",
        tag: "Exclusiva",
      },
      {
        id: "azure",
        name: "Pabellón Azure",
        address: "Paseo Marítimo, 301, Marbella",
        city: "malibu",
        cityLabel: "Marbella",
        type: "villa",
        typeLabel: "Villa",
        price: 4950000,
        beds: 4,
        baths: 5,
        area: 409,
        imageId: IMG.pool,
        alt: "Villa moderna con piscina infinita frente al mar",
        tag: "Primera línea",
      },
      {
        id: "linden",
        name: "Refugio Linden",
        address: "Carrer Illa de Cuba, 7, Sitges",
        city: "carmel",
        cityLabel: "Sitges",
        type: "retreat",
        typeLabel: "Refugio",
        price: 2150000,
        beds: 3,
        baths: 3,
        area: 249,
        imageId: IMG.modern,
        alt: "Refugio minimalista de una planta con revestimiento de cedro",
        tag: "Calle tranquila",
      },
      {
        id: "solara",
        name: "Casa Solara",
        address: "Urb. Sierra Blanca, 52, Marbella",
        city: "malibu",
        cityLabel: "Marbella",
        type: "estate",
        typeLabel: "Finca",
        price: 3650000,
        beds: 5,
        baths: 4,
        area: 373,
        imageId: IMG.villa,
        alt: "Villa de inspiración mediterránea con terrazas en arco",
        tag: "Precio ajustado",
      },
      {
        id: "meridian",
        name: "Ático Meridian",
        address: "Port d'Aiguadolç, 1, Sitges",
        city: "carmel",
        cityLabel: "Sitges",
        type: "penthouse",
        typeLabel: "Ático",
        price: 2750000,
        beds: 3,
        baths: 3,
        area: 208,
        imageId: IMG.dusk,
        alt: "Residencia iluminada en la ladera al anochecer con vistas al puerto",
        tag: "Vistas al mar",
      },
    ],
  },
  neighborhoods: {
    eyebrow: "Dónde pertenecer",
    title: "Barrios que conocemos de memoria",
    intro: "No vendemos direcciones — situamos a las personas. Estos son los enclaves donde viven nuestros asesores, caminan a diario y entienden a pie de calle.",
    exploreLabel: "Explorar",
    items: [
      {
        id: "montauk",
        name: "Cadaqués",
        tagline: "Calas, aire salino y la calma del cabo.",
        count: "12 residencias",
        imageId: IMG.luxuryHouse,
        alt: "Casa costera en Cadaqués tras las rocas",
      },
      {
        id: "aspen",
        name: "Baqueira",
        tagline: "Luz de altura, esquí a pie de casa y calidez de madera.",
        count: "9 residencias",
        imageId: IMG.estate,
        alt: "Finca de montaña en Baqueira rodeada de coníferas",
      },
      {
        id: "malibu",
        name: "Marbella",
        tagline: "Terrazas sobre el mar y la larga línea del Mediterráneo.",
        count: "15 residencias",
        imageId: IMG.pool,
        alt: "Terraza de villa en Marbella abierta al mar",
      },
      {
        id: "carmel",
        name: "Sitges",
        tagline: "Callejuelas, galerías y la bruma suave del puerto.",
        count: "7 residencias",
        imageId: IMG.dusk,
        alt: "Casa en la ladera de Sitges al crepúsculo",
      },
    ],
  },
  spotlight: {
    eyebrow: "Residencia destacada",
    title: "Casa Cliffline",
    address: "Camí de Cala Nans, 14, Cadaqués",
    price: 4450000,
    priceLabel: "Precio orientativo",
    description: "Una villa de cinco dormitorios tallada en la última elevación antes del mar. Techos de abeto, una escalera de vidrio suspendida y una terraza al oeste hecha para las tardes largas. Se vende con su propio sendero entre las rocas hasta una cala reservada.",
    specs: [
      { label: "Dormitorios", value: "5" },
      { label: "Baños", value: "4" },
      { label: "Interior", value: "448 m²" },
      { label: "Parcela", value: "5.700 m²" },
      { label: "Construida", value: "2021" },
      { label: "Garaje", value: "3 coches" },
    ],
    features: [
      "Piscina infinita climatizada y salón hundido",
      "Cocina profesional con office de servicio",
      "Sendero privado hasta la cala",
      "Climatización geotérmica",
    ],
    gallery: [
      { id: "exterior", imageId: IMG.luxuryHouse, alt: "Fachada de Casa Cliffline sobre la costa", caption: "Fachada oeste al atardecer" },
      { id: "living", imageId: IMG.interior, alt: "Salón amplio con vidrio de suelo a techo", caption: "Salón y escalera de vidrio" },
      { id: "pool", imageId: IMG.pool, alt: "Piscina infinita frente al mar", caption: "Piscina y terraza al mar" },
      { id: "dusk", imageId: IMG.dusk, alt: "Casa Cliffline iluminada al anochecer", caption: "La casa tras la puesta de sol" },
    ],
    galleryAria: "Galería de Casa Cliffline",
    tourCta: "Solicitar visita privada",
    brochureCta: "Descargar dossier",
  },
  journey: {
    eyebrow: "El método Alture",
    title: "Un camino más sereno hacia la propiedad",
    intro: "Comprar una casa singular debe sentirse meditado, no apresurado. Cuatro pasos, un asesor dedicado y una estimación que usted mismo ajusta.",
    steps: [
      { numeral: "01", title: "Consulta reservada", body: "Empezamos por una conversación sobre cómo vive y la traducimos en un briefing preciso — ubicación, luz, privacidad y precio." },
      { numeral: "02", title: "Selección curada", body: "Recibe un conjunto elegido a mano, varias antes de llegar al mercado abierto, con notas sinceras sobre cada una." },
      { numeral: "03", title: "Visitas guiadas", body: "Su asesor acompaña cada visita, coordina las inspecciones y negocia las condiciones enteramente por usted." },
      { numeral: "04", title: "Cierre cuidado", body: "Gestionamos lo legal, la financiación y la entrega para que la firma sea una mera formalidad." },
    ],
    calc: {
      title: "Simulador de hipoteca",
      intro: "Una idea rápida de su compromiso mensual. Ajuste el precio, la entrada y el plazo para ver cambiar la estimación.",
      priceLabel: "Precio del inmueble",
      downLabel: "Entrada",
      yearsLabel: "Plazo",
      rateLabel: "Tipo estimado",
      monthlyLabel: "Cuota mensual estimada",
      loanLabel: "Importe del préstamo",
      downValueLabel: "Importe de la entrada",
      disclaimer: "Solo ilustrativo. Las cifras asumen un tipo fijo y excluyen impuestos, seguros y comisiones. No es una oferta de hipoteca.",
      rate: 0.038,
      defaultPrice: 4450000,
      minPrice: 900000,
      maxPrice: 7500000,
      priceStep: 50000,
      defaultDown: 20,
      years: [15, 20, 25, 30],
      defaultYears: 30,
    },
  },
  contact: {
    eyebrow: "Hable con un asesor",
    title: "Encontremos la que encaja",
    body: "Cuéntenos qué busca. Su asesor dedicado responderá en un día, con discreción, con una selección que merece su tiempo.",
    agent: {
      name: "Isabel Marés",
      role: "Asesora Principal, Costa y Colinas",
      imageId: IMG.interior,
      alt: "Interior elegante y luminoso bañado por el sol",
    },
    points: [
      { label: "Línea directa", value: "+34 691 550 142" },
      { label: "Correo", value: "asesores@alture.estate" },
      { label: "Con cita previa", value: "Cadaqués · Marbella · Sitges" },
    ],
    nameLabel: "Nombre completo",
    namePlaceholder: "Su nombre",
    emailLabel: "Correo",
    emailPlaceholder: "usted@correo.com",
    messageLabel: "¿Qué está buscando?",
    messagePlaceholder: "Una casa tranquila de tres dormitorios cerca del mar, lista en primavera...",
    submitCta: "Solicitar selección",
    consent: "Al enviar, acepta ser contactado por un asesor de Alture. Nunca compartimos sus datos.",
    successTitle: "Su solicitud está con nosotros",
    successBody: "Isabel se pondrá en contacto en un día laborable con una selección adaptada a su briefing.",
    resetCta: "Enviar otra solicitud",
  },
  footer: {
    tagline: "Una asesoría residencial privada que representa casas de arquitectura singular en la costa y las colinas.",
    columns: [
      { title: "Colección", links: ["Villas", "Fincas", "Áticos", "Refugios"] },
      { title: "Empresa", links: ["Nuestros asesores", "Revista", "Empleo", "Prensa"] },
      { title: "Clientes", links: ["Comprar", "Vender", "Oficina privada", "Tasaciones"] },
    ],
    contactTitle: "Estudio",
    address: "Port d'Aiguadolç, 9, Sitges, 08870",
    phone: "+34 691 550 142",
    email: "asesores@alture.estate",
    hours: "Con cita previa, todos los días",
    socialLabel: "Siga a Alture",
    socials: [
      { label: "Revista", icon: "at" },
      { label: "Portafolio", icon: "camera" },
      { label: "Contacto", icon: "message" },
    ],
    legal: "© 2026 Alture Residencial. Todos los derechos reservados.",
    credits: "Una experiencia concepto creada por VigApp.",
  },
};

export const altureDictionary: DemoDictionary<AltureContent> = { en, pt, es };
