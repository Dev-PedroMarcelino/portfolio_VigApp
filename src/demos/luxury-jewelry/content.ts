import type { DemoDictionary } from "@/demos/content";

export interface CollectionPiece {
  id: string;
  name: string;
  material: string;
  price: number;
  image: string;
  alt: string;
}

export interface Collection {
  id: string;
  label: string;
  tagline: string;
  pieces: CollectionPiece[];
}

export interface ConfigMetal {
  id: string;
  label: string;
  price: number;
  swatch: string;
  swatchEdge: string;
}

export interface ConfigStone {
  id: string;
  label: string;
  price: number;
  hex: string;
  glow: string;
  note: string;
}

export interface ConfigCarat {
  id: string;
  label: string;
  multiplier: number;
}

export interface HeritageChapter {
  year: string;
  title: string;
  body: string;
}

export interface BespokeService {
  id: string;
  title: string;
  body: string;
  detail: string;
}

export interface Boutique {
  id: string;
  city: string;
  address: string;
}

export interface AureliaContent {
  format: { locale: string; currency: string };
  header: {
    tagline: string;
    navAria: string;
    nav: { href: string; label: string }[];
    appointmentCta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleItalic: string;
    lede: string;
    primaryCta: string;
    secondaryCta: string;
    pieceName: string;
    pieceSpec: string;
    imageAlt: string;
    spotlightHint: string;
    scrollCue: string;
  };
  collections: {
    eyebrow: string;
    title: string;
    intro: string;
    tabsAria: string;
    fromLabel: string;
    enquireLabel: string;
    list: Collection[];
  };
  configurator: {
    eyebrow: string;
    title: string;
    intro: string;
    metalLabel: string;
    stoneLabel: string;
    caratLabel: string;
    totalLabel: string;
    priceNote: string;
    ctaLabel: string;
    ringAlt: string;
    stoneNoteLabel: string;
    metals: ConfigMetal[];
    stones: ConfigStone[];
    carats: ConfigCarat[];
  };
  heritage: {
    eyebrow: string;
    title: string;
    intro: string;
    chapters: HeritageChapter[];
  };
  bespoke: {
    eyebrow: string;
    title: string;
    intro: string;
    detailLabel: string;
    services: BespokeService[];
  };
  appointment: {
    eyebrow: string;
    title: string;
    intro: string;
    stepLabels: { boutique: string; day: string; time: string };
    boutiqueTitle: string;
    dayTitle: string;
    timeTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    backLabel: string;
    continueLabel: string;
    confirmLabel: string;
    summaryTitle: string;
    summaryBoutique: string;
    summaryDay: string;
    summaryTime: string;
    confirmedTitle: string;
    confirmedBody: string;
    referenceLabel: string;
    privateNote: string;
    resetLabel: string;
    days: string[];
    times: string[];
    boutiques: Boutique[];
  };
  footer: {
    blurb: string;
    maisonLabel: string;
    maisonLinks: string[];
    clientLabel: string;
    clientLinks: string[];
    contactLabel: string;
    phone: string;
    email: string;
    followLabel: string;
    socials: string[];
    fineprint: string;
  };
}

const en: AureliaContent = {
  format: { locale: "en-US", currency: "USD" },
  header: {
    tagline: "High jewelry — Place Vendôme",
    navAria: "Aurelia sections",
    nav: [
      { href: "#collections", label: "Collections" },
      { href: "#atelier", label: "The Atelier" },
      { href: "#heritage", label: "Heritage" },
      { href: "#bespoke", label: "Bespoke" },
    ],
    appointmentCta: "Book a viewing",
  },
  hero: {
    eyebrow: "Maison Aurelia · Since 1934",
    title: "Light, set",
    titleItalic: "in eternity",
    lede: "Every Aurelia piece begins as a single ray caught in the hand of a master setter. Ninety years on, we still cut, polish and set every stone within one atelier above Place Vendôme.",
    primaryCta: "Discover the collections",
    secondaryCta: "Design your ring",
    pieceName: "Solitaire Aurore",
    pieceSpec: "2.4ct brilliant · Platinum 950",
    imageAlt: "An Aurelia diamond solitaire ring resting on black velvet",
    spotlightHint: "Move the light across the stone",
    scrollCue: "Explore",
  },
  collections: {
    eyebrow: "The collections",
    title: "Three houses of light",
    intro:
      "Rings that hold a promise, necklaces that trace the collarbone, earrings that catch the candlelight. Each collection is released once a year, in numbered editions.",
    tabsAria: "Choose a collection",
    fromLabel: "From",
    enquireLabel: "Enquire",
    list: [
      {
        id: "rings",
        label: "Rings",
        tagline: "The promise, made permanent",
        pieces: [
          {
            id: "aurore",
            name: "Solitaire Aurore",
            material: "Platinum 950 · 2.4ct brilliant diamond",
            price: 42800,
            image: "photo-1605100804763-247f67b3557e",
            alt: "Platinum solitaire ring with a brilliant-cut diamond",
          },
          {
            id: "serment",
            name: "Serment Éternel",
            material: "18k white gold · pavé diamond band",
            price: 18600,
            image: "photo-1515562141207-7a88fb7ce338",
            alt: "Diamond pavé band worn on a hand",
          },
          {
            id: "royale",
            name: "Bague Royale",
            material: "18k yellow gold · 1.8ct Ceylon sapphire",
            price: 27400,
            image: "photo-1601121141461-9d6647bca1ed",
            alt: "Yellow gold ring set with a blue sapphire",
          },
        ],
      },
      {
        id: "necklaces",
        label: "Necklaces",
        tagline: "A line of light along the throat",
        pieces: [
          {
            id: "riviere",
            name: "Rivière de Lumière",
            material: "Platinum 950 · 14.2ct graduated diamonds",
            price: 96500,
            image: "photo-1534367610401-9f5ed68180aa",
            alt: "Graduated diamond rivière necklace",
          },
          {
            id: "goutte",
            name: "Goutte d'Or",
            material: "18k yellow gold · pear-cut pendant",
            price: 31200,
            image: "photo-1601121141461-9d6647bca1ed",
            alt: "Yellow gold pendant necklace with a pear-cut stone",
          },
          {
            id: "constellation",
            name: "Constellation",
            material: "18k white gold · scattered diamond drops",
            price: 44900,
            image: "photo-1526738549149-8e07eca6c147",
            alt: "White gold necklace scattered with small diamonds",
          },
        ],
      },
      {
        id: "earrings",
        label: "Earrings",
        tagline: "Candlelight, worn close",
        pieces: [
          {
            id: "chandelle",
            name: "Chandelle",
            material: "Platinum 950 · 3.6ct drop diamonds",
            price: 38700,
            image: "photo-1526738549149-8e07eca6c147",
            alt: "Diamond chandelier drop earrings",
          },
          {
            id: "emeraude",
            name: "Émeraude Royale",
            material: "18k yellow gold · Colombian emeralds",
            price: 52300,
            image: "photo-1445527815219-ecbfec67492e",
            alt: "Emerald and gold statement earrings",
          },
          {
            id: "etoile",
            name: "Étoile",
            material: "18k white gold · brilliant studs",
            price: 12900,
            image: "photo-1526738549149-8e07eca6c147",
            alt: "Brilliant-cut diamond stud earrings",
          },
        ],
      },
    ],
  },
  configurator: {
    eyebrow: "The atelier",
    title: "Compose your solitaire",
    intro:
      "Choose the metal that will hold your stone, the gem that will hold the light, and the weight it will carry. Our setters bring your ring to life in six weeks, hallmarked and numbered by hand.",
    metalLabel: "The metal",
    stoneLabel: "The stone",
    caratLabel: "The weight",
    totalLabel: "Your solitaire",
    priceNote: "Includes hand engraving, a certificate of authenticity and lifetime care.",
    ctaLabel: "Reserve this design",
    ringAlt: "A solitaire ring shown against black velvet",
    stoneNoteLabel: "About this stone",
    metals: [
      { id: "yellow", label: "Yellow gold 18k", price: 2400, swatch: "#D9B24A", swatchEdge: "#8A6A1E" },
      { id: "white", label: "White gold 18k", price: 2600, swatch: "#E6E4DD", swatchEdge: "#9C9A92" },
      { id: "platinum", label: "Platinum 950", price: 3200, swatch: "#DFE1E4", swatchEdge: "#8E9298" },
    ],
    stones: [
      {
        id: "diamond",
        label: "Brilliant diamond",
        price: 8500,
        hex: "#EAF4FF",
        glow: "rgba(220,240,255,0.85)",
        note: "D colour, VVS1 clarity, ideal-cut. Sourced through the Kimberley Process and cut in our own atelier.",
      },
      {
        id: "sapphire",
        label: "Ceylon sapphire",
        price: 4200,
        hex: "#2E5AAE",
        glow: "rgba(70,120,220,0.8)",
        note: "Cornflower-blue, unheated, from the Ratnapura mines of Sri Lanka. Prized for its velvet depth.",
      },
      {
        id: "emerald",
        label: "Colombian emerald",
        price: 5600,
        hex: "#1F7A4D",
        glow: "rgba(40,180,110,0.75)",
        note: "Muzo-green with a living garden of inclusions. Traditionally oiled, never dyed.",
      },
    ],
    carats: [
      { id: "half", label: "0.5 ct", multiplier: 0.5 },
      { id: "one", label: "1.0 ct", multiplier: 1 },
      { id: "onefive", label: "1.5 ct", multiplier: 1.6 },
      { id: "two", label: "2.0 ct", multiplier: 2.4 },
    ],
  },
  heritage: {
    eyebrow: "The maison",
    title: "Ninety years above the square",
    intro:
      "From a single workbench to a house dressing royalty and the red carpet, Aurelia has never left the rooftops of Place Vendôme.",
    chapters: [
      {
        year: "1934",
        title: "A workbench above the square",
        body: "Master setter Auguste Rivel opens a two-room atelier on the fifth floor of 12 Place Vendôme, working alone by the north light.",
      },
      {
        year: "1958",
        title: "The first rivière",
        body: "The Rivière de Lumière necklace is unveiled at the Paris Opera, worn by soprano Éléonore Vasseur. The waiting list opens the same night.",
      },
      {
        year: "1979",
        title: "The Aurore cut",
        body: "Aurelia patents its own 61-facet brilliant cut, the Aurore, engineered to return more light than any diamond of its era.",
      },
      {
        year: "2002",
        title: "A house of women",
        body: "Camille Rivel becomes the maison's first female artistic director, and moves the ateliers a single floor higher, closer to the light.",
      },
      {
        year: "2024",
        title: "The ninetieth spring",
        body: "Aurelia opens its restoration atelier, dedicated to bringing a century of heirlooms back to their first brilliance.",
      },
    ],
  },
  bespoke: {
    eyebrow: "Bespoke",
    title: "Commissions & private services",
    intro:
      "Beyond the collections lies the grand métier: pieces imagined for a single person, and the quiet work of keeping them eternal.",
    detailLabel: "What it involves",
    services: [
      {
        id: "haute",
        title: "Haute Joaillerie",
        body: "A one-of-one piece designed with our artistic director, from the first gouache sketch to the final hallmark.",
        detail: "Twelve to eighteen months · gem sourcing worldwide · watercolour design service",
      },
      {
        id: "sourcing",
        title: "Gemstone sourcing",
        body: "Access to our vault of certified, ethically traced stones — and to the auctions and estates the public never sees.",
        detail: "GIA and SSEF certified · private viewings · investment-grade provenance",
      },
      {
        id: "heirloom",
        title: "Heirloom restoration",
        body: "The restoration atelier returns inherited jewels to their first light, resetting, repolishing and re-securing every stone.",
        detail: "Full condition report · original-technique repair · lifetime guarantee",
      },
      {
        id: "wedding",
        title: "Wedding & engagement",
        body: "Private appointments to choose or compose the ring, with a dedicated advisor and complete discretion.",
        detail: "After-hours viewings · matched wedding bands · hand engraving included",
      },
    ],
  },
  appointment: {
    eyebrow: "Private viewing",
    title: "Book a moment with the maison",
    intro:
      "Every viewing is one to one, by appointment only, in a private salon. Champagne is poured; the pieces are brought to you.",
    stepLabels: { boutique: "Boutique", day: "Day", time: "Hour" },
    boutiqueTitle: "Choose a salon",
    dayTitle: "Choose a day",
    timeTitle: "Choose an hour",
    nameLabel: "Your name",
    namePlaceholder: "Full name",
    emailLabel: "Your email",
    emailPlaceholder: "you@example.com",
    backLabel: "Back",
    continueLabel: "Continue",
    confirmLabel: "Confirm viewing",
    summaryTitle: "Your appointment",
    summaryBoutique: "Salon",
    summaryDay: "Day",
    summaryTime: "Hour",
    confirmedTitle: "We look forward to receiving you",
    confirmedBody:
      "A private advisor will confirm your viewing by email within the hour. The salon will be yours alone for its duration.",
    referenceLabel: "Appointment reference",
    privateNote: "Discretion assured · valet parking · no obligation to purchase",
    resetLabel: "Book another viewing",
    days: ["Thu 24", "Fri 25", "Sat 26", "Tue 29", "Wed 30", "Thu 31"],
    times: ["10:30", "12:00", "14:30", "16:00", "17:30"],
    boutiques: [
      { id: "paris", city: "Paris", address: "12 Place Vendôme, 75001" },
      { id: "geneva", city: "Geneva", address: "Rue du Rhône 62, 1204" },
      { id: "newyork", city: "New York", address: "5th Avenue at 57th, NY 10019" },
    ],
  },
  footer: {
    blurb: "High jewelry cut, polished and set by hand above Place Vendôme since 1934.",
    maisonLabel: "The Maison",
    maisonLinks: ["Our story", "The ateliers", "Sustainability", "Careers"],
    clientLabel: "Client care",
    clientLinks: ["Book a viewing", "Care & repair", "Certificates", "Shipping & returns"],
    contactLabel: "Contact",
    phone: "+33 1 42 60 34 12",
    email: "salon@aurelia-paris.com",
    followLabel: "Follow",
    socials: ["Journal", "Instagram", "Newsletter"],
    fineprint: "© 2026 Maison Aurelia · 12 Place Vendôme, Paris · All rights reserved.",
  },
};

const pt: AureliaContent = {
  format: { locale: "pt-BR", currency: "BRL" },
  header: {
    tagline: "Alta joalheria — Place Vendôme",
    navAria: "Seções da Aurelia",
    nav: [
      { href: "#collections", label: "Coleções" },
      { href: "#atelier", label: "O Ateliê" },
      { href: "#heritage", label: "Herança" },
      { href: "#bespoke", label: "Sob Medida" },
    ],
    appointmentCta: "Agendar visita",
  },
  hero: {
    eyebrow: "Maison Aurelia · Desde 1934",
    title: "A luz, engastada",
    titleItalic: "na eternidade",
    lede: "Cada peça Aurelia começa como um único raio preso na mão de um cravador mestre. Noventa anos depois, ainda lapidamos, polimos e engastamos cada pedra num só ateliê sobre a Place Vendôme.",
    primaryCta: "Conhecer as coleções",
    secondaryCta: "Criar seu anel",
    pieceName: "Solitário Aurore",
    pieceSpec: "Brilhante 2,4ct · Platina 950",
    imageAlt: "Um anel solitário de diamante da Aurelia sobre veludo preto",
    spotlightHint: "Mova a luz sobre a pedra",
    scrollCue: "Explorar",
  },
  collections: {
    eyebrow: "As coleções",
    title: "Três casas de luz",
    intro:
      "Anéis que guardam uma promessa, colares que desenham a clavícula, brincos que capturam a luz das velas. Cada coleção é lançada uma vez por ano, em edições numeradas.",
    tabsAria: "Escolha uma coleção",
    fromLabel: "A partir de",
    enquireLabel: "Consultar",
    list: [
      {
        id: "rings",
        label: "Anéis",
        tagline: "A promessa, tornada eterna",
        pieces: [
          {
            id: "aurore",
            name: "Solitário Aurore",
            material: "Platina 950 · diamante brilhante 2,4ct",
            price: 238000,
            image: "photo-1605100804763-247f67b3557e",
            alt: "Anel solitário de platina com diamante lapidação brilhante",
          },
          {
            id: "serment",
            name: "Serment Éternel",
            material: "Ouro branco 18k · aliança cravejada",
            price: 103000,
            image: "photo-1515562141207-7a88fb7ce338",
            alt: "Aliança cravejada de diamantes usada na mão",
          },
          {
            id: "royale",
            name: "Bague Royale",
            material: "Ouro amarelo 18k · safira do Ceilão 1,8ct",
            price: 152000,
            image: "photo-1601121141461-9d6647bca1ed",
            alt: "Anel de ouro amarelo com safira azul",
          },
        ],
      },
      {
        id: "necklaces",
        label: "Colares",
        tagline: "Uma linha de luz sobre o colo",
        pieces: [
          {
            id: "riviere",
            name: "Rivière de Lumière",
            material: "Platina 950 · diamantes graduados 14,2ct",
            price: 536000,
            image: "photo-1534367610401-9f5ed68180aa",
            alt: "Colar rivière de diamantes graduados",
          },
          {
            id: "goutte",
            name: "Goutte d'Or",
            material: "Ouro amarelo 18k · pingente lapidação gota",
            price: 173000,
            image: "photo-1601121141461-9d6647bca1ed",
            alt: "Colar de ouro amarelo com pingente lapidação gota",
          },
          {
            id: "constellation",
            name: "Constellation",
            material: "Ouro branco 18k · gotas de diamante dispersas",
            price: 249000,
            image: "photo-1526738549149-8e07eca6c147",
            alt: "Colar de ouro branco com pequenos diamantes dispersos",
          },
        ],
      },
      {
        id: "earrings",
        label: "Brincos",
        tagline: "A luz das velas, usada de perto",
        pieces: [
          {
            id: "chandelle",
            name: "Chandelle",
            material: "Platina 950 · diamantes pendentes 3,6ct",
            price: 215000,
            image: "photo-1526738549149-8e07eca6c147",
            alt: "Brincos pendentes de diamantes",
          },
          {
            id: "emeraude",
            name: "Émeraude Royale",
            material: "Ouro amarelo 18k · esmeraldas colombianas",
            price: 290000,
            image: "photo-1445527815219-ecbfec67492e",
            alt: "Brincos statement de esmeralda e ouro",
          },
          {
            id: "etoile",
            name: "Étoile",
            material: "Ouro branco 18k · pontos de luz brilhantes",
            price: 71000,
            image: "photo-1526738549149-8e07eca6c147",
            alt: "Brincos de pressão com diamantes lapidação brilhante",
          },
        ],
      },
    ],
  },
  configurator: {
    eyebrow: "O ateliê",
    title: "Componha seu solitário",
    intro:
      "Escolha o metal que abraçará sua pedra, a gema que guardará a luz e o peso que ela carregará. Nossos cravadores dão vida ao seu anel em seis semanas, com contraste e numeração feitos à mão.",
    metalLabel: "O metal",
    stoneLabel: "A pedra",
    caratLabel: "O peso",
    totalLabel: "Seu solitário",
    priceNote: "Inclui gravação à mão, certificado de autenticidade e cuidado vitalício.",
    ctaLabel: "Reservar este design",
    ringAlt: "Um anel solitário mostrado sobre veludo preto",
    stoneNoteLabel: "Sobre esta pedra",
    metals: [
      { id: "yellow", label: "Ouro amarelo 18k", price: 13400, swatch: "#D9B24A", swatchEdge: "#8A6A1E" },
      { id: "white", label: "Ouro branco 18k", price: 14500, swatch: "#E6E4DD", swatchEdge: "#9C9A92" },
      { id: "platinum", label: "Platina 950", price: 17800, swatch: "#DFE1E4", swatchEdge: "#8E9298" },
    ],
    stones: [
      {
        id: "diamond",
        label: "Diamante brilhante",
        price: 47300,
        hex: "#EAF4FF",
        glow: "rgba(220,240,255,0.85)",
        note: "Cor D, pureza VVS1, lapidação ideal. Rastreado pelo Processo de Kimberley e lapidado em nosso ateliê.",
      },
      {
        id: "sapphire",
        label: "Safira do Ceilão",
        price: 23400,
        hex: "#2E5AAE",
        glow: "rgba(70,120,220,0.8)",
        note: "Azul-centáurea, sem tratamento térmico, das minas de Ratnapura, no Sri Lanka. Célebre por sua profundidade aveludada.",
      },
      {
        id: "emerald",
        label: "Esmeralda colombiana",
        price: 31200,
        hex: "#1F7A4D",
        glow: "rgba(40,180,110,0.75)",
        note: "Verde-Muzo com um jardim vivo de inclusões. Tradicionalmente oleada, nunca tingida.",
      },
    ],
    carats: [
      { id: "half", label: "0,5 ct", multiplier: 0.5 },
      { id: "one", label: "1,0 ct", multiplier: 1 },
      { id: "onefive", label: "1,5 ct", multiplier: 1.6 },
      { id: "two", label: "2,0 ct", multiplier: 2.4 },
    ],
  },
  heritage: {
    eyebrow: "A maison",
    title: "Noventa anos sobre a praça",
    intro:
      "De uma única bancada a uma casa que veste a realeza e o tapete vermelho, a Aurelia nunca deixou os telhados da Place Vendôme.",
    chapters: [
      {
        year: "1934",
        title: "Uma bancada sobre a praça",
        body: "O cravador mestre Auguste Rivel abre um ateliê de dois cômodos no quinto andar do número 12 da Place Vendôme, trabalhando sozinho sob a luz do norte.",
      },
      {
        year: "1958",
        title: "A primeira rivière",
        body: "O colar Rivière de Lumière é revelado na Ópera de Paris, usado pela soprano Éléonore Vasseur. A lista de espera abre na mesma noite.",
      },
      {
        year: "1979",
        title: "A lapidação Aurore",
        body: "A Aurelia patenteia sua própria lapidação brilhante de 61 facetas, a Aurore, criada para devolver mais luz do que qualquer diamante de sua época.",
      },
      {
        year: "2002",
        title: "Uma casa de mulheres",
        body: "Camille Rivel torna-se a primeira diretora artística da maison e sobe os ateliês um andar, mais perto da luz.",
      },
      {
        year: "2024",
        title: "A nonagésima primavera",
        body: "A Aurelia inaugura seu ateliê de restauro, dedicado a devolver a um século de joias de família seu primeiro brilho.",
      },
    ],
  },
  bespoke: {
    eyebrow: "Sob medida",
    title: "Encomendas e serviços privados",
    intro:
      "Além das coleções há o grande métier: peças imaginadas para uma única pessoa e o trabalho silencioso de mantê-las eternas.",
    detailLabel: "O que envolve",
    services: [
      {
        id: "haute",
        title: "Haute Joaillerie",
        body: "Uma peça única desenhada com nosso diretor artístico, do primeiro esboço em guache ao contraste final.",
        detail: "De doze a dezoito meses · busca de gemas pelo mundo · projeto em aquarela",
      },
      {
        id: "sourcing",
        title: "Busca de gemas",
        body: "Acesso ao nosso cofre de pedras certificadas e de origem ética — e aos leilões e coleções que o público jamais vê.",
        detail: "Certificação GIA e SSEF · visitas privadas · procedência de investimento",
      },
      {
        id: "heirloom",
        title: "Restauro de joias de família",
        body: "O ateliê de restauro devolve às joias herdadas seu primeiro brilho, reengastando, repolindo e refixando cada pedra.",
        detail: "Laudo completo · reparo em técnica original · garantia vitalícia",
      },
      {
        id: "wedding",
        title: "Casamento e noivado",
        body: "Atendimentos privados para escolher ou compor o anel, com um consultor dedicado e total discrição.",
        detail: "Visitas fora de horário · alianças combinadas · gravação à mão incluída",
      },
    ],
  },
  appointment: {
    eyebrow: "Visita privada",
    title: "Reserve um momento com a maison",
    intro:
      "Cada visita é individual, somente com hora marcada, num salão privado. O champanhe é servido; as peças são trazidas até você.",
    stepLabels: { boutique: "Salão", day: "Dia", time: "Hora" },
    boutiqueTitle: "Escolha um salão",
    dayTitle: "Escolha um dia",
    timeTitle: "Escolha uma hora",
    nameLabel: "Seu nome",
    namePlaceholder: "Nome completo",
    emailLabel: "Seu e-mail",
    emailPlaceholder: "voce@exemplo.com",
    backLabel: "Voltar",
    continueLabel: "Continuar",
    confirmLabel: "Confirmar visita",
    summaryTitle: "Sua visita",
    summaryBoutique: "Salão",
    summaryDay: "Dia",
    summaryTime: "Hora",
    confirmedTitle: "Esperamos por você",
    confirmedBody:
      "Um consultor privado confirmará sua visita por e-mail dentro de uma hora. O salão será só seu enquanto durar.",
    referenceLabel: "Referência da visita",
    privateNote: "Discrição garantida · manobrista · sem compromisso de compra",
    resetLabel: "Agendar outra visita",
    days: ["Qui 24", "Sex 25", "Sáb 26", "Ter 29", "Qua 30", "Qui 31"],
    times: ["10:30", "12:00", "14:30", "16:00", "17:30"],
    boutiques: [
      { id: "paris", city: "Paris", address: "12 Place Vendôme, 75001" },
      { id: "geneva", city: "Genebra", address: "Rue du Rhône 62, 1204" },
      { id: "newyork", city: "Nova York", address: "5th Avenue at 57th, NY 10019" },
    ],
  },
  footer: {
    blurb: "Alta joalheria lapidada, polida e engastada à mão sobre a Place Vendôme desde 1934.",
    maisonLabel: "A Maison",
    maisonLinks: ["Nossa história", "Os ateliês", "Sustentabilidade", "Carreiras"],
    clientLabel: "Atendimento",
    clientLinks: ["Agendar visita", "Cuidado e reparo", "Certificados", "Envio e devoluções"],
    contactLabel: "Contato",
    phone: "+33 1 42 60 34 12",
    email: "salon@aurelia-paris.com",
    followLabel: "Siga",
    socials: ["Journal", "Instagram", "Newsletter"],
    fineprint: "© 2026 Maison Aurelia · 12 Place Vendôme, Paris · Todos os direitos reservados.",
  },
};

const es: AureliaContent = {
  format: { locale: "es-ES", currency: "EUR" },
  header: {
    tagline: "Alta joyería — Place Vendôme",
    navAria: "Secciones de Aurelia",
    nav: [
      { href: "#collections", label: "Colecciones" },
      { href: "#atelier", label: "El Taller" },
      { href: "#heritage", label: "Legado" },
      { href: "#bespoke", label: "A Medida" },
    ],
    appointmentCta: "Reservar cita",
  },
  hero: {
    eyebrow: "Maison Aurelia · Desde 1934",
    title: "La luz, engastada",
    titleItalic: "en la eternidad",
    lede: "Cada pieza Aurelia nace como un único rayo atrapado en la mano de un engastador maestro. Noventa años después, seguimos tallando, puliendo y engastando cada piedra en un solo taller sobre la Place Vendôme.",
    primaryCta: "Descubrir las colecciones",
    secondaryCta: "Diseñar tu anillo",
    pieceName: "Solitario Aurore",
    pieceSpec: "Brillante 2,4ct · Platino 950",
    imageAlt: "Un anillo solitario de diamante de Aurelia sobre terciopelo negro",
    spotlightHint: "Mueve la luz sobre la piedra",
    scrollCue: "Explorar",
  },
  collections: {
    eyebrow: "Las colecciones",
    title: "Tres casas de luz",
    intro:
      "Anillos que guardan una promesa, collares que dibujan la clavícula, pendientes que atrapan la luz de las velas. Cada colección se presenta una vez al año, en ediciones numeradas.",
    tabsAria: "Elige una colección",
    fromLabel: "Desde",
    enquireLabel: "Consultar",
    list: [
      {
        id: "rings",
        label: "Anillos",
        tagline: "La promesa, hecha eterna",
        pieces: [
          {
            id: "aurore",
            name: "Solitario Aurore",
            material: "Platino 950 · diamante brillante 2,4ct",
            price: 39800,
            image: "photo-1605100804763-247f67b3557e",
            alt: "Anillo solitario de platino con diamante de talla brillante",
          },
          {
            id: "serment",
            name: "Serment Éternel",
            material: "Oro blanco 18k · alianza con pavé de diamantes",
            price: 17300,
            image: "photo-1515562141207-7a88fb7ce338",
            alt: "Alianza con pavé de diamantes llevada en la mano",
          },
          {
            id: "royale",
            name: "Bague Royale",
            material: "Oro amarillo 18k · zafiro de Ceilán 1,8ct",
            price: 25500,
            image: "photo-1601121141461-9d6647bca1ed",
            alt: "Anillo de oro amarillo con zafiro azul",
          },
        ],
      },
      {
        id: "necklaces",
        label: "Collares",
        tagline: "Una línea de luz sobre el escote",
        pieces: [
          {
            id: "riviere",
            name: "Rivière de Lumière",
            material: "Platino 950 · diamantes graduados 14,2ct",
            price: 89800,
            image: "photo-1534367610401-9f5ed68180aa",
            alt: "Collar rivière de diamantes graduados",
          },
          {
            id: "goutte",
            name: "Goutte d'Or",
            material: "Oro amarillo 18k · colgante talla pera",
            price: 29000,
            image: "photo-1601121141461-9d6647bca1ed",
            alt: "Collar de oro amarillo con colgante de talla pera",
          },
          {
            id: "constellation",
            name: "Constellation",
            material: "Oro blanco 18k · gotas de diamante dispersas",
            price: 41800,
            image: "photo-1526738549149-8e07eca6c147",
            alt: "Collar de oro blanco con pequeños diamantes dispersos",
          },
        ],
      },
      {
        id: "earrings",
        label: "Pendientes",
        tagline: "La luz de las velas, llevada cerca",
        pieces: [
          {
            id: "chandelle",
            name: "Chandelle",
            material: "Platino 950 · diamantes colgantes 3,6ct",
            price: 36000,
            image: "photo-1526738549149-8e07eca6c147",
            alt: "Pendientes colgantes de diamantes",
          },
          {
            id: "emeraude",
            name: "Émeraude Royale",
            material: "Oro amarillo 18k · esmeraldas colombianas",
            price: 48600,
            image: "photo-1445527815219-ecbfec67492e",
            alt: "Pendientes statement de esmeralda y oro",
          },
          {
            id: "etoile",
            name: "Étoile",
            material: "Oro blanco 18k · brillantes de presión",
            price: 12000,
            image: "photo-1526738549149-8e07eca6c147",
            alt: "Pendientes de presión con diamantes de talla brillante",
          },
        ],
      },
    ],
  },
  configurator: {
    eyebrow: "El taller",
    title: "Compón tu solitario",
    intro:
      "Elige el metal que sostendrá tu piedra, la gema que guardará la luz y el peso que llevará. Nuestros engastadores dan vida a tu anillo en seis semanas, con contraste y numeración hechos a mano.",
    metalLabel: "El metal",
    stoneLabel: "La piedra",
    caratLabel: "El peso",
    totalLabel: "Tu solitario",
    priceNote: "Incluye grabado a mano, certificado de autenticidad y cuidado de por vida.",
    ctaLabel: "Reservar este diseño",
    ringAlt: "Un anillo solitario mostrado sobre terciopelo negro",
    stoneNoteLabel: "Sobre esta piedra",
    metals: [
      { id: "yellow", label: "Oro amarillo 18k", price: 2250, swatch: "#D9B24A", swatchEdge: "#8A6A1E" },
      { id: "white", label: "Oro blanco 18k", price: 2450, swatch: "#E6E4DD", swatchEdge: "#9C9A92" },
      { id: "platinum", label: "Platino 950", price: 3000, swatch: "#DFE1E4", swatchEdge: "#8E9298" },
    ],
    stones: [
      {
        id: "diamond",
        label: "Diamante brillante",
        price: 7900,
        hex: "#EAF4FF",
        glow: "rgba(220,240,255,0.85)",
        note: "Color D, pureza VVS1, talla ideal. Trazado por el Proceso de Kimberley y tallado en nuestro propio taller.",
      },
      {
        id: "sapphire",
        label: "Zafiro de Ceilán",
        price: 3900,
        hex: "#2E5AAE",
        glow: "rgba(70,120,220,0.8)",
        note: "Azul aciano, sin tratamiento térmico, de las minas de Ratnapura, en Sri Lanka. Célebre por su profundidad aterciopelada.",
      },
      {
        id: "emerald",
        label: "Esmeralda colombiana",
        price: 5200,
        hex: "#1F7A4D",
        glow: "rgba(40,180,110,0.75)",
        note: "Verde Muzo con un jardín vivo de inclusiones. Aceitada de forma tradicional, nunca teñida.",
      },
    ],
    carats: [
      { id: "half", label: "0,5 ct", multiplier: 0.5 },
      { id: "one", label: "1,0 ct", multiplier: 1 },
      { id: "onefive", label: "1,5 ct", multiplier: 1.6 },
      { id: "two", label: "2,0 ct", multiplier: 2.4 },
    ],
  },
  heritage: {
    eyebrow: "La maison",
    title: "Noventa años sobre la plaza",
    intro:
      "De un único banco de trabajo a una casa que viste a la realeza y a la alfombra roja, Aurelia nunca ha dejado los tejados de la Place Vendôme.",
    chapters: [
      {
        year: "1934",
        title: "Un banco sobre la plaza",
        body: "El engastador maestro Auguste Rivel abre un taller de dos salas en el quinto piso del número 12 de la Place Vendôme, trabajando solo bajo la luz del norte.",
      },
      {
        year: "1958",
        title: "La primera rivière",
        body: "El collar Rivière de Lumière se presenta en la Ópera de París, lucido por la soprano Éléonore Vasseur. La lista de espera se abre esa misma noche.",
      },
      {
        year: "1979",
        title: "La talla Aurore",
        body: "Aurelia patenta su propia talla brillante de 61 facetas, la Aurore, diseñada para devolver más luz que cualquier diamante de su época.",
      },
      {
        year: "2002",
        title: "Una casa de mujeres",
        body: "Camille Rivel se convierte en la primera directora artística de la maison y sube los talleres un piso, más cerca de la luz.",
      },
      {
        year: "2024",
        title: "La nonagésima primavera",
        body: "Aurelia inaugura su taller de restauración, dedicado a devolver a un siglo de joyas heredadas su primer brillo.",
      },
    ],
  },
  bespoke: {
    eyebrow: "A medida",
    title: "Encargos y servicios privados",
    intro:
      "Más allá de las colecciones está el gran métier: piezas imaginadas para una sola persona y la labor silenciosa de mantenerlas eternas.",
    detailLabel: "Qué incluye",
    services: [
      {
        id: "haute",
        title: "Haute Joaillerie",
        body: "Una pieza única diseñada con nuestro director artístico, del primer boceto en gouache al contraste final.",
        detail: "De doce a dieciocho meses · búsqueda de gemas por el mundo · diseño en acuarela",
      },
      {
        id: "sourcing",
        title: "Búsqueda de gemas",
        body: "Acceso a nuestra cámara de piedras certificadas y de origen ético — y a las subastas y colecciones que el público jamás ve.",
        detail: "Certificación GIA y SSEF · visitas privadas · procedencia de inversión",
      },
      {
        id: "heirloom",
        title: "Restauración de joyas heredadas",
        body: "El taller de restauración devuelve a las joyas heredadas su primer brillo, reengastando, repuliendo y reasegurando cada piedra.",
        detail: "Informe completo · reparación en técnica original · garantía de por vida",
      },
      {
        id: "wedding",
        title: "Boda y compromiso",
        body: "Citas privadas para elegir o componer el anillo, con un asesor dedicado y total discreción.",
        detail: "Visitas fuera de horario · alianzas a juego · grabado a mano incluido",
      },
    ],
  },
  appointment: {
    eyebrow: "Visita privada",
    title: "Reserva un momento con la maison",
    intro:
      "Cada visita es individual, solo con cita previa, en un salón privado. Se sirve champán; las piezas se traen ante ti.",
    stepLabels: { boutique: "Salón", day: "Día", time: "Hora" },
    boutiqueTitle: "Elige un salón",
    dayTitle: "Elige un día",
    timeTitle: "Elige una hora",
    nameLabel: "Tu nombre",
    namePlaceholder: "Nombre completo",
    emailLabel: "Tu correo",
    emailPlaceholder: "tu@ejemplo.com",
    backLabel: "Volver",
    continueLabel: "Continuar",
    confirmLabel: "Confirmar visita",
    summaryTitle: "Tu visita",
    summaryBoutique: "Salón",
    summaryDay: "Día",
    summaryTime: "Hora",
    confirmedTitle: "Deseamos recibirte",
    confirmedBody:
      "Un asesor privado confirmará tu visita por correo en menos de una hora. El salón será solo tuyo mientras dure.",
    referenceLabel: "Referencia de la visita",
    privateNote: "Discreción asegurada · aparcacoches · sin compromiso de compra",
    resetLabel: "Reservar otra visita",
    days: ["Jue 24", "Vie 25", "Sáb 26", "Mar 29", "Mié 30", "Jue 31"],
    times: ["10:30", "12:00", "14:30", "16:00", "17:30"],
    boutiques: [
      { id: "paris", city: "París", address: "12 Place Vendôme, 75001" },
      { id: "geneva", city: "Ginebra", address: "Rue du Rhône 62, 1204" },
      { id: "newyork", city: "Nueva York", address: "5th Avenue at 57th, NY 10019" },
    ],
  },
  footer: {
    blurb: "Alta joyería tallada, pulida y engastada a mano sobre la Place Vendôme desde 1934.",
    maisonLabel: "La Maison",
    maisonLinks: ["Nuestra historia", "Los talleres", "Sostenibilidad", "Empleo"],
    clientLabel: "Atención al cliente",
    clientLinks: ["Reservar cita", "Cuidado y reparación", "Certificados", "Envíos y devoluciones"],
    contactLabel: "Contacto",
    phone: "+33 1 42 60 34 12",
    email: "salon@aurelia-paris.com",
    followLabel: "Síguenos",
    socials: ["Journal", "Instagram", "Newsletter"],
    fineprint: "© 2026 Maison Aurelia · 12 Place Vendôme, París · Todos los derechos reservados.",
  },
};

export const aureliaDictionary: DemoDictionary<AureliaContent> = { en, pt, es };
