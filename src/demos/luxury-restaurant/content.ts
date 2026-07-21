import type { DemoDictionary } from "@/demos/content";

export interface Course {
  id: string;
  numeral: string;
  name: string;
  description: string;
  ingredients: string[];
  note: string;
}

export interface WineEntry {
  id: string;
  courses: string;
  wine: string;
  region: string;
  vintage: string;
  notes: string;
  glassPrice: number;
}

export interface PrivateRoom {
  id: string;
  name: string;
  seats: string;
  description: string;
  features: string[];
  minimum: number;
}

export interface LumiereContent {
  format: { locale: string; currency: string };
  header: {
    tagline: string;
    navAria: string;
    nav: { href: string; label: string }[];
    reserveCta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleItalic: string;
    lede: string;
    primaryCta: string;
    secondaryCta: string;
    scrollCue: string;
    imageAlt: string;
    accolades: string[];
  };
  tasting: {
    eyebrow: string;
    title: string;
    intro: string;
    menuLabel: string;
    priceLabel: string;
    pairingLabel: string;
    revealHint: string;
    ingredientsLabel: string;
    noteLabel: string;
    footnote: string;
    menuPrice: number;
    pairingPrice: number;
    imageAlt: string;
    detailAlt: string;
    courses: Course[];
  };
  chef: {
    eyebrow: string;
    name: string;
    role: string;
    quote: string;
    paragraphs: string[];
    credentials: { value: string; label: string }[];
    imageAlt: string;
  };
  interlude: {
    quote: string;
    attribution: string;
    imageAlt: string;
  };
  cellar: {
    eyebrow: string;
    title: string;
    intro: string;
    cellarLine: string;
    glassLabel: string;
    toggleHint: string;
    wines: WineEntry[];
  };
  privateDining: {
    eyebrow: string;
    title: string;
    intro: string;
    seatsLabel: string;
    minimumLabel: string;
    cta: string;
    imageAlt: string;
    rooms: PrivateRoom[];
  };
  reservation: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: { guests: string; date: string; time: string };
    guestsTitle: string;
    guestSingular: string;
    guestPlural: string;
    largerParty: string;
    dateTitle: string;
    closedLabel: string;
    timeTitle: string;
    unavailableLabel: string;
    seatingNote: string;
    backLabel: string;
    continueLabel: string;
    confirmLabel: string;
    summaryTitle: string;
    summaryGuests: string;
    summaryDate: string;
    summaryTime: string;
    confirmedTitle: string;
    confirmedBody: string;
    confirmationLabel: string;
    dressCode: string;
    resetLabel: string;
  };
  footer: {
    blurb: string;
    addressLabel: string;
    address: string[];
    hoursLabel: string;
    hours: string[];
    contactLabel: string;
    phone: string;
    email: string;
    followLabel: string;
    socials: string[];
    fineprint: string;
  };
}

const en: LumiereContent = {
  format: { locale: "en-US", currency: "USD" },
  header: {
    tagline: "Cuisine of light — São Paulo",
    navAria: "Maison Lumière sections",
    nav: [
      { href: "#menu", label: "The Menu" },
      { href: "#chef", label: "The Chef" },
      { href: "#cellar", label: "The Cellar" },
      { href: "#private", label: "Private Salons" },
    ],
    reserveCta: "Reserve a table",
  },
  hero: {
    eyebrow: "Jardins · São Paulo",
    title: "An evening measured",
    titleItalic: "in candlelight",
    lede: "Maison Lumière is chef Marina Vasconcelos's love letter to Brazilian terroir, written in classical French — seven courses served to twenty-two guests a night, in a dining room lit only by fire.",
    primaryCta: "Reserve a table",
    secondaryCta: "Read the menu",
    scrollCue: "Descend",
    imageAlt: "The candlelit dining room of Maison Lumière in Jardins",
    accolades: [
      "Two stars — Michelin Guide 2026",
      "No. 11 — Latin America's 50 Best",
      "Grand Award — Wine Spectator",
    ],
  },
  tasting: {
    eyebrow: "The tasting menu",
    title: "Seven acts of light",
    intro:
      "One menu each night, written after the dawn market and retired when the season turns. No substitutions are ever needed — every course bends quietly around your table.",
    menuLabel: "Menu Lumière — seven courses",
    priceLabel: "per guest",
    pairingLabel: "cellar pairing",
    revealHint: "Rest on a course to unveil its composition",
    ingredientsLabel: "Composition",
    noteLabel: "From the kitchen",
    footnote:
      "Vegetal and pescatarian journeys are composed with equal ceremony. Kindly share preferences when reserving.",
    menuPrice: 185,
    pairingPrice: 95,
    imageAlt: "A minimal plated course from the Menu Lumière",
    detailAlt: "Detail of a dish dressed with herbs at the pass",
    courses: [
      {
        id: "ostra",
        numeral: "I",
        name: "Ostra & Cambuci",
        description: "A chilled overture from the Atlantic rainforest coast.",
        ingredients: [
          "Oyster from Florianópolis",
          "Cambuci fruit ice",
          "Lemon-verbena oil",
          "Sea lettuce",
        ],
        note: "Served on river stones at four degrees.",
      },
      {
        id: "tucupi",
        numeral: "II",
        name: "Tucupi Noir",
        description: "Black tucupi consommé, drawn for eighteen hours.",
        ingredients: [
          "Fermented wild cassava",
          "Seared Hokkaido scallop",
          "Jambu flower",
          "Toasted priprioca root",
        ],
        note: "The jambu blossom leaves a gentle electricity on the tongue.",
      },
      {
        id: "pupunha",
        numeral: "III",
        name: "Pupunha",
        description: "Ribbons of palm heart in the manner of tagliatelle.",
        ingredients: [
          "Pupunha palm heart",
          "Brown-butter emulsion",
          "Aged Canastra cheese",
          "Baru nut gremolata",
        ],
        note: "Carved tableside from the whole roasted heart.",
      },
      {
        id: "robalo",
        numeral: "IV",
        name: "Robalo sob Brasa",
        description: "Wild sea bass over embers of banana wood.",
        ingredients: [
          "Line-caught robalo",
          "Banana-leaf smoke",
          "Baru nut beurre blanc",
          "Charred fennel",
        ],
        note: "Finished over the open hearth that lights the room.",
      },
      {
        id: "pato",
        numeral: "V",
        name: "Pato & Jabuticaba",
        description: "Duck aged twenty-one days, lacquered in jabuticaba.",
        ingredients: [
          "Muscovy duck breast",
          "Jabuticaba jus",
          "Charred sweetheart cabbage",
          "Wild pepper from Bahia",
        ],
        note: "The lacquer is reduced from three kilograms of fruit per duck.",
      },
      {
        id: "canastra",
        numeral: "VI",
        name: "Canastra",
        description: "The cheese course, in reverence to Minas Gerais.",
        ingredients: [
          "Eight-month Canastra",
          "Guava preserve",
          "Sourdough tuile",
          "Raw wildflower honey",
        ],
        note: "From a single farm at 1,200 metres in the Serra da Canastra.",
      },
      {
        id: "cacau",
        numeral: "VII",
        name: "Cacau & Baunilha",
        description: "A close in Bahian chocolate and wild cerrado vanilla.",
        ingredients: [
          "72 percent Bahia cru chocolate",
          "Cerrado vanilla ice cream",
          "Tonka bean",
          "Cachaça caramel",
        ],
        note: "The vanilla is gathered wild by growers in Goiás.",
      },
    ],
  },
  chef: {
    eyebrow: "The chef",
    name: "Marina Vasconcelos",
    role: "Chef and founder",
    quote: "Fire is my first language. Everything else is translation.",
    paragraphs: [
      "Marina Vasconcelos cooked at Mirazur and D.O.M. before turning a 1930s townhouse in Jardins into a room lit by a single hearth. Her kitchen speaks French technique with a Brazilian accent: tucupi treated like a grand consommé, palm heart carved like a truffle.",
      "Each menu begins at dawn in the Mercado de Pinheiros and ends as seven acts for twenty-two guests. Nothing is plated that she has not tasted that same evening; nothing is served that the fire has not touched.",
    ],
    credentials: [
      { value: "2", label: "Michelin stars" },
      { value: "17", label: "years at the stove" },
      { value: "22", label: "guests a night" },
    ],
    imageAlt: "Chef Marina Vasconcelos's signature course, dressed by hand",
  },
  interlude: {
    quote: "Twenty-two chairs, one hearth, no clocks.",
    attribution: "The dining room — Alameda Lorena 1642",
    imageAlt: "The warm interior of Maison Lumière at dusk",
  },
  cellar: {
    eyebrow: "The cellar",
    title: "Wines that walk with the menu",
    intro:
      "Nine hundred labels rest in the stone cellar beneath the dining room. Sommelier Rafael Okonkwo pours a pairing that travels from Serra Gaúcha to Burgundy and home again.",
    cellarLine: "900 labels · Sommelier Rafael Okonkwo",
    glassLabel: "by the glass",
    toggleHint: "Open a pairing to read its tasting notes",
    wines: [
      {
        id: "amadeu",
        courses: "Courses I & II",
        wine: "Cave Amadeu Brut Nature",
        region: "Pinto Bandeira, Brazil",
        vintage: "2021",
        notes:
          "Bone-dry Brazilian bubbles, green apple and brioche. They sharpen the cambuci ice and soothe the gentle spark of the jambu.",
        glassPrice: 22,
      },
      {
        id: "chablis",
        courses: "Course III",
        wine: "Chablis 1er Cru Montmains, Dom. Colette Verger",
        region: "Burgundy, France",
        vintage: "2022",
        notes:
          "Chalk, white flowers and a saline finish that threads through the brown butter and the aged Canastra.",
        glassPrice: 26,
      },
      {
        id: "soalheiro",
        courses: "Course IV",
        wine: "Soalheiro Alvarinho Granit",
        region: "Vinho Verde, Portugal",
        vintage: "2023",
        notes:
          "Granite-grown Alvarinho, taut and citric — a cool stream running beside the sea bass and its ember smoke.",
        glassPrice: 24,
      },
      {
        id: "guaspari",
        courses: "Course V",
        wine: "Guaspari Syrah Vista da Serra",
        region: "Espírito Santo do Pinhal, Brazil",
        vintage: "2020",
        notes:
          "Black pepper, violets and warm stone from São Paulo's own hills; it meets the duck's jabuticaba lacquer head-on.",
        glassPrice: 28,
      },
      {
        id: "noval",
        courses: "Courses VI & VII",
        wine: "Quinta do Noval 10 Year Tawny",
        region: "Douro, Portugal",
        vintage: "NV",
        notes:
          "Walnut, fig and orange peel — a long amber goodbye to the cheese, the chocolate and the wild vanilla.",
        glassPrice: 21,
      },
    ],
  },
  privateDining: {
    eyebrow: "Private salons",
    title: "Rooms that keep secrets",
    intro:
      "Beyond the dining room, two salons keep their own counsel — for anniversaries, negotiations, and the kind of evening that should leave no trace but memory.",
    seatsLabel: "Seats",
    minimumLabel: "Evening minimum",
    cta: "Enquire via reservation",
    imageAlt: "A long private table set for dinner at Maison Lumière",
    rooms: [
      {
        id: "aurore",
        name: "Salon Aurore",
        seats: "Up to 14 guests",
        description:
          "A jewel-box of hand-painted jacaranda panels above the cellar, with its own entrance off Alameda Lorena and a sommelier who never leaves the room.",
        features: [
          "Hand-painted jacaranda panels",
          "Dedicated sommelier all evening",
          "Private entrance and cloakroom",
        ],
        minimum: 2400,
      },
      {
        id: "mesa",
        name: "Mesa da Chef",
        seats: "6 guests at the pass",
        description:
          "Six linen-backed chairs facing the hearth itself. The menu stretches to ten courses — and one of them you will cook, guided gently by Marina.",
        features: [
          "Ten-course extended menu",
          "Front-row seat to the hearth",
          "One course cooked by your own hands",
        ],
        minimum: 1800,
      },
    ],
  },
  reservation: {
    eyebrow: "Reservations",
    title: "Take a seat by the fire",
    intro:
      "Two seatings each evening, Tuesday to Saturday. The dining room holds twenty-two guests — we suggest reserving three weeks ahead.",
    steps: { guests: "Guests", date: "Evening", time: "Hour" },
    guestsTitle: "How many at your table?",
    guestSingular: "guest",
    guestPlural: "guests",
    largerParty:
      "For parties above eight, write to reservas@maisonlumiere.com.br and the Salon Aurore will answer.",
    dateTitle: "Choose your evening",
    closedLabel: "Closed",
    timeTitle: "Choose your hour",
    unavailableLabel: "Fully committed",
    seatingNote: "First seating 18:45 — last seating 21:45",
    backLabel: "Back",
    continueLabel: "Continue",
    confirmLabel: "Confirm reservation",
    summaryTitle: "Your evening",
    summaryGuests: "Table for",
    summaryDate: "Evening",
    summaryTime: "Hour",
    confirmedTitle: "The table is yours",
    confirmedBody:
      "A note of confirmation is on its way to your inbox. We hold every table for fifteen minutes past the hour — the fire does the rest.",
    confirmationLabel: "Reservation code",
    dressCode: "Dress: elegant, at ease. The room is candlelit and cool.",
    resetLabel: "Make another reservation",
  },
  footer: {
    blurb: "Seven courses, one hearth, twenty-two chairs in the heart of Jardins.",
    addressLabel: "Address",
    address: ["Alameda Lorena 1642", "Jardins, São Paulo — SP", "01424-007, Brazil"],
    hoursLabel: "Hours",
    hours: ["Tuesday to Saturday", "Seatings 18:45 — 21:45", "Cellar bar from 18:00"],
    contactLabel: "Contact",
    phone: "+55 11 3061 2790",
    email: "reservas@maisonlumiere.com.br",
    followLabel: "Follow",
    socials: ["Instagram", "The Journal", "Newsletter"],
    fineprint: "© 2026 Maison Lumière · CNPJ 12.345.678/0001-90 · All rights reserved.",
  },
};

const pt: LumiereContent = {
  format: { locale: "pt-BR", currency: "BRL" },
  header: {
    tagline: "Cozinha da luz — São Paulo",
    navAria: "Seções do Maison Lumière",
    nav: [
      { href: "#menu", label: "O Menu" },
      { href: "#chef", label: "A Chef" },
      { href: "#cellar", label: "A Adega" },
      { href: "#private", label: "Salões Privados" },
    ],
    reserveCta: "Reservar mesa",
  },
  hero: {
    eyebrow: "Jardins · São Paulo",
    title: "Uma noite medida",
    titleItalic: "à luz de velas",
    lede: "O Maison Lumière é a carta de amor da chef Marina Vasconcelos ao terroir brasileiro, escrita em francês clássico — sete tempos servidos a vinte e dois convidados por noite, num salão iluminado apenas pelo fogo.",
    primaryCta: "Reservar mesa",
    secondaryCta: "Ler o menu",
    scrollCue: "Descer",
    imageAlt: "O salão à luz de velas do Maison Lumière, nos Jardins",
    accolades: [
      "Duas estrelas — Guia Michelin 2026",
      "Nº 11 — Latin America's 50 Best",
      "Grand Award — Wine Spectator",
    ],
  },
  tasting: {
    eyebrow: "O menu degustação",
    title: "Sete atos de luz",
    intro:
      "Um único menu por noite, escrito depois da feira da madrugada e aposentado quando a estação vira. Substituições nunca são necessárias — cada tempo se curva em silêncio à sua mesa.",
    menuLabel: "Menu Lumière — sete tempos",
    priceLabel: "por pessoa",
    pairingLabel: "harmonização da adega",
    revealHint: "Pouse sobre um tempo para revelar sua composição",
    ingredientsLabel: "Composição",
    noteLabel: "Da cozinha",
    footnote:
      "Percursos vegetais e pescatarianos são compostos com a mesma cerimônia. Indique preferências ao reservar.",
    menuPrice: 980,
    pairingPrice: 470,
    imageAlt: "Um tempo minimalista empratado do Menu Lumière",
    detailAlt: "Detalhe de um prato finalizado com ervas no passe",
    courses: [
      {
        id: "ostra",
        numeral: "I",
        name: "Ostra & Cambuci",
        description: "Uma abertura gelada da costa da Mata Atlântica.",
        ingredients: [
          "Ostra de Florianópolis",
          "Gelo de cambuci",
          "Óleo de erva-cidreira",
          "Alface-do-mar",
        ],
        note: "Servida sobre pedras de rio, a quatro graus.",
      },
      {
        id: "tucupi",
        numeral: "II",
        name: "Tucupi Noir",
        description: "Consommé negro de tucupi, apurado por dezoito horas.",
        ingredients: [
          "Mandioca-brava fermentada",
          "Vieira de Hokkaido selada",
          "Flor de jambu",
          "Priprioca tostada",
        ],
        note: "A flor de jambu deixa uma eletricidade delicada na língua.",
      },
      {
        id: "pupunha",
        numeral: "III",
        name: "Pupunha",
        description: "Fitas de palmito à maneira de um tagliatelle.",
        ingredients: [
          "Palmito pupunha",
          "Emulsão de manteiga noisette",
          "Queijo Canastra maturado",
          "Gremolata de baru",
        ],
        note: "Fatiado à mesa a partir do palmito inteiro assado.",
      },
      {
        id: "robalo",
        numeral: "IV",
        name: "Robalo sob Brasa",
        description: "Robalo selvagem sobre brasas de madeira de bananeira.",
        ingredients: [
          "Robalo de linha",
          "Defumação em folha de bananeira",
          "Beurre blanc de baru",
          "Erva-doce na brasa",
        ],
        note: "Finalizado na lareira aberta que ilumina o salão.",
      },
      {
        id: "pato",
        numeral: "V",
        name: "Pato & Jabuticaba",
        description: "Pato maturado por vinte e um dias, laqueado em jabuticaba.",
        ingredients: [
          "Peito de pato moscóvi",
          "Jus de jabuticaba",
          "Repolho-coração na brasa",
          "Pimenta-de-cheiro da Bahia",
        ],
        note: "A laca é reduzida de três quilos de fruta por pato.",
      },
      {
        id: "canastra",
        numeral: "VI",
        name: "Canastra",
        description: "O serviço de queijos, em reverência a Minas Gerais.",
        ingredients: [
          "Canastra de oito meses",
          "Goiabada cascão",
          "Tuile de fermentação natural",
          "Mel silvestre cru",
        ],
        note: "De uma única fazenda a 1.200 metros, na Serra da Canastra.",
      },
      {
        id: "cacau",
        numeral: "VII",
        name: "Cacau & Baunilha",
        description: "Um desfecho em chocolate baiano e baunilha do cerrado.",
        ingredients: [
          "Chocolate cru da Bahia 72%",
          "Sorvete de baunilha do Cerrado",
          "Fava tonka",
          "Caramelo de cachaça",
        ],
        note: "A baunilha é colhida de forma silvestre em Goiás.",
      },
    ],
  },
  chef: {
    eyebrow: "A chef",
    name: "Marina Vasconcelos",
    role: "Chef e fundadora",
    quote: "O fogo é minha primeira língua. Todo o resto é tradução.",
    paragraphs: [
      "Marina Vasconcelos passou por Mirazur e D.O.M. antes de transformar um sobrado de 1930 nos Jardins num salão iluminado por uma única lareira. Sua cozinha fala a técnica francesa com sotaque brasileiro: tucupi tratado como um grande consommé, pupunha fatiada como trufa.",
      "Cada menu nasce de madrugada no Mercado de Pinheiros e termina como sete atos para vinte e dois convidados. Nada vai ao prato sem que ela prove na mesma noite; nada é servido sem que o fogo tenha tocado.",
    ],
    credentials: [
      { value: "2", label: "estrelas Michelin" },
      { value: "17", label: "anos de fogão" },
      { value: "22", label: "convidados por noite" },
    ],
    imageAlt: "O tempo-assinatura da chef Marina Vasconcelos, finalizado à mão",
  },
  interlude: {
    quote: "Vinte e duas cadeiras, uma lareira, nenhum relógio.",
    attribution: "O salão — Alameda Lorena 1642",
    imageAlt: "O interior acolhedor do Maison Lumière ao anoitecer",
  },
  cellar: {
    eyebrow: "A adega",
    title: "Vinhos que caminham com o menu",
    intro:
      "Novecentos rótulos repousam na adega de pedra sob o salão. O sommelier Rafael Okonkwo serve uma harmonização que viaja da Serra Gaúcha à Borgonha — e volta para casa.",
    cellarLine: "900 rótulos · Sommelier Rafael Okonkwo",
    glassLabel: "a taça",
    toggleHint: "Abra uma harmonização para ler as notas de prova",
    wines: [
      {
        id: "amadeu",
        courses: "Tempos I e II",
        wine: "Cave Amadeu Brut Nature",
        region: "Pinto Bandeira, Brasil",
        vintage: "2021",
        notes:
          "Bolhas brasileiras secas ao osso, maçã-verde e brioche. Elas afiam o gelo de cambuci e acalmam a faísca delicada do jambu.",
        glassPrice: 98,
      },
      {
        id: "chablis",
        courses: "Tempo III",
        wine: "Chablis 1er Cru Montmains, Dom. Colette Verger",
        region: "Borgonha, França",
        vintage: "2022",
        notes:
          "Giz, flores brancas e um final salino que costura a manteiga noisette e o Canastra maturado.",
        glassPrice: 120,
      },
      {
        id: "soalheiro",
        courses: "Tempo IV",
        wine: "Soalheiro Alvarinho Granit",
        region: "Vinho Verde, Portugal",
        vintage: "2023",
        notes:
          "Alvarinho criado no granito, tenso e cítrico — um riacho frio correndo ao lado do robalo e de sua fumaça de brasa.",
        glassPrice: 110,
      },
      {
        id: "guaspari",
        courses: "Tempo V",
        wine: "Guaspari Syrah Vista da Serra",
        region: "Espírito Santo do Pinhal, Brasil",
        vintage: "2020",
        notes:
          "Pimenta-do-reino, violetas e pedra quente das serras paulistas; encara de frente a laca de jabuticaba do pato.",
        glassPrice: 130,
      },
      {
        id: "noval",
        courses: "Tempos VI e VII",
        wine: "Quinta do Noval 10 Anos Tawny",
        region: "Douro, Portugal",
        vintage: "NV",
        notes:
          "Nozes, figo e casca de laranja — um longo adeus âmbar ao queijo, ao chocolate e à baunilha silvestre.",
        glassPrice: 95,
      },
    ],
  },
  privateDining: {
    eyebrow: "Salões privados",
    title: "Salas que guardam segredos",
    intro:
      "Além do salão, dois espaços guardam suas próprias histórias — para aniversários, negociações e o tipo de noite que só deve deixar memória como vestígio.",
    seatsLabel: "Lugares",
    minimumLabel: "Mínimo por noite",
    cta: "Solicitar na reserva",
    imageAlt: "Uma longa mesa privada posta para o jantar no Maison Lumière",
    rooms: [
      {
        id: "aurore",
        name: "Salon Aurore",
        seats: "Até 14 convidados",
        description:
          "Uma caixa de joias com painéis de jacarandá pintados à mão sobre a adega, entrada própria pela Alameda Lorena e um sommelier que nunca deixa a sala.",
        features: [
          "Painéis de jacarandá pintados à mão",
          "Sommelier dedicado a noite inteira",
          "Entrada privativa e chapelaria",
        ],
        minimum: 12000,
      },
      {
        id: "mesa",
        name: "Mesa da Chef",
        seats: "6 convidados no passe",
        description:
          "Seis cadeiras de linho de frente para a própria lareira. O menu se estende a dez tempos — e um deles quem cozinha é você, guiado com calma pela Marina.",
        features: [
          "Menu estendido de dez tempos",
          "Primeira fila para a lareira",
          "Um tempo preparado pelas suas mãos",
        ],
        minimum: 9000,
      },
    ],
  },
  reservation: {
    eyebrow: "Reservas",
    title: "Sente-se junto ao fogo",
    intro:
      "Dois turnos por noite, de terça a sábado. O salão recebe vinte e dois convidados — sugerimos reservar com três semanas de antecedência.",
    steps: { guests: "Convidados", date: "Noite", time: "Horário" },
    guestsTitle: "Quantos à sua mesa?",
    guestSingular: "convidado",
    guestPlural: "convidados",
    largerParty:
      "Para grupos acima de oito, escreva para reservas@maisonlumiere.com.br e o Salon Aurore responderá.",
    dateTitle: "Escolha sua noite",
    closedLabel: "Fechado",
    timeTitle: "Escolha seu horário",
    unavailableLabel: "Lotado",
    seatingNote: "Primeiro turno 18:45 — último turno 21:45",
    backLabel: "Voltar",
    continueLabel: "Continuar",
    confirmLabel: "Confirmar reserva",
    summaryTitle: "Sua noite",
    summaryGuests: "Mesa para",
    summaryDate: "Noite",
    summaryTime: "Horário",
    confirmedTitle: "A mesa é sua",
    confirmedBody:
      "Uma nota de confirmação está a caminho do seu e-mail. Guardamos cada mesa por quinze minutos além da hora — o fogo faz o resto.",
    confirmationLabel: "Código da reserva",
    dressCode: "Traje: elegante, à vontade. O salão é fresco e iluminado a velas.",
    resetLabel: "Fazer outra reserva",
  },
  footer: {
    blurb: "Sete tempos, uma lareira, vinte e duas cadeiras no coração dos Jardins.",
    addressLabel: "Endereço",
    address: ["Alameda Lorena 1642", "Jardins, São Paulo — SP", "01424-007, Brasil"],
    hoursLabel: "Horários",
    hours: ["De terça a sábado", "Turnos 18:45 — 21:45", "Bar da adega a partir das 18:00"],
    contactLabel: "Contato",
    phone: "+55 11 3061 2790",
    email: "reservas@maisonlumiere.com.br",
    followLabel: "Siga",
    socials: ["Instagram", "O Journal", "Newsletter"],
    fineprint: "© 2026 Maison Lumière · CNPJ 12.345.678/0001-90 · Todos os direitos reservados.",
  },
};

const es: LumiereContent = {
  format: { locale: "es-ES", currency: "EUR" },
  header: {
    tagline: "Cocina de la luz — São Paulo",
    navAria: "Secciones de Maison Lumière",
    nav: [
      { href: "#menu", label: "La Carta" },
      { href: "#chef", label: "La Chef" },
      { href: "#cellar", label: "La Bodega" },
      { href: "#private", label: "Salones Privados" },
    ],
    reserveCta: "Reservar mesa",
  },
  hero: {
    eyebrow: "Jardins · São Paulo",
    title: "Una noche medida",
    titleItalic: "a la luz de las velas",
    lede: "Maison Lumière es la carta de amor de la chef Marina Vasconcelos al terroir brasileño, escrita en francés clásico — siete pases servidos a veintidós comensales por noche, en una sala iluminada solo por el fuego.",
    primaryCta: "Reservar mesa",
    secondaryCta: "Leer la carta",
    scrollCue: "Descender",
    imageAlt: "La sala a la luz de las velas de Maison Lumière, en Jardins",
    accolades: [
      "Dos estrellas — Guía Michelin 2026",
      "N.º 11 — Latin America's 50 Best",
      "Grand Award — Wine Spectator",
    ],
  },
  tasting: {
    eyebrow: "El menú degustación",
    title: "Siete actos de luz",
    intro:
      "Un único menú cada noche, escrito tras el mercado del alba y retirado cuando cambia la estación. Nunca hacen falta sustituciones — cada pase se pliega en silencio a su mesa.",
    menuLabel: "Menú Lumière — siete pases",
    priceLabel: "por comensal",
    pairingLabel: "maridaje de bodega",
    revealHint: "Deténgase en un pase para revelar su composición",
    ingredientsLabel: "Composición",
    noteLabel: "Desde la cocina",
    footnote:
      "Los recorridos vegetales y pescetarianos se componen con idéntica ceremonia. Indique sus preferencias al reservar.",
    menuPrice: 165,
    pairingPrice: 85,
    imageAlt: "Un pase minimalista emplatado del Menú Lumière",
    detailAlt: "Detalle de un plato terminado con hierbas en el pase",
    courses: [
      {
        id: "ostra",
        numeral: "I",
        name: "Ostra & Cambuci",
        description: "Una obertura helada de la costa de la Mata Atlántica.",
        ingredients: [
          "Ostra de Florianópolis",
          "Hielo de cambuci",
          "Aceite de hierbaluisa",
          "Lechuga de mar",
        ],
        note: "Servida sobre piedras de río, a cuatro grados.",
      },
      {
        id: "tucupi",
        numeral: "II",
        name: "Tucupi Noir",
        description: "Consomé negro de tucupí, destilado durante dieciocho horas.",
        ingredients: [
          "Yuca brava fermentada",
          "Vieira de Hokkaido marcada",
          "Flor de jambú",
          "Priprioca tostada",
        ],
        note: "La flor de jambú deja una electricidad delicada en la lengua.",
      },
      {
        id: "pupunha",
        numeral: "III",
        name: "Pupunha",
        description: "Cintas de palmito a la manera de un tagliatelle.",
        ingredients: [
          "Palmito pupunha",
          "Emulsión de mantequilla avellana",
          "Queso Canastra curado",
          "Gremolata de baru",
        ],
        note: "Se corta en la mesa a partir del palmito entero asado.",
      },
      {
        id: "robalo",
        numeral: "IV",
        name: "Robalo sob Brasa",
        description: "Lubina salvaje sobre brasas de madera de banano.",
        ingredients: [
          "Róbalo de anzuelo",
          "Ahumado en hoja de banano",
          "Beurre blanc de baru",
          "Hinojo a la brasa",
        ],
        note: "Terminado en el hogar abierto que ilumina la sala.",
      },
      {
        id: "pato",
        numeral: "V",
        name: "Pato & Jabuticaba",
        description: "Pato madurado veintiún días, lacado en jabuticaba.",
        ingredients: [
          "Pechuga de pato de Berbería",
          "Jus de jabuticaba",
          "Col corazón a la brasa",
          "Pimienta aromática de Bahía",
        ],
        note: "La laca se reduce a partir de tres kilos de fruta por pato.",
      },
      {
        id: "canastra",
        numeral: "VI",
        name: "Canastra",
        description: "El servicio de quesos, en reverencia a Minas Gerais.",
        ingredients: [
          "Canastra de ocho meses",
          "Dulce de guayaba",
          "Tuile de masa madre",
          "Miel silvestre cruda",
        ],
        note: "De una sola finca a 1.200 metros, en la Serra da Canastra.",
      },
      {
        id: "cacau",
        numeral: "VII",
        name: "Cacau & Baunilha",
        description: "Un cierre de chocolate bahiano y vainilla del cerrado.",
        ingredients: [
          "Chocolate cru de Bahía 72%",
          "Helado de vainilla del Cerrado",
          "Haba tonka",
          "Caramelo de cachaça",
        ],
        note: "La vainilla se recolecta de forma silvestre en Goiás.",
      },
    ],
  },
  chef: {
    eyebrow: "La chef",
    name: "Marina Vasconcelos",
    role: "Chef y fundadora",
    quote: "El fuego es mi primera lengua. Todo lo demás es traducción.",
    paragraphs: [
      "Marina Vasconcelos cocinó en Mirazur y en D.O.M. antes de convertir una casona de 1930 en Jardins en una sala iluminada por un único hogar. Su cocina habla técnica francesa con acento brasileño: el tucupí tratado como un gran consomé, el palmito laminado como una trufa.",
      "Cada menú nace al alba en el Mercado de Pinheiros y termina como siete actos para veintidós comensales. Nada llega al plato sin que ella lo pruebe esa misma noche; nada se sirve sin que el fuego lo haya tocado.",
    ],
    credentials: [
      { value: "2", label: "estrellas Michelin" },
      { value: "17", label: "años ante el fuego" },
      { value: "22", label: "comensales por noche" },
    ],
    imageAlt: "El pase insignia de la chef Marina Vasconcelos, terminado a mano",
  },
  interlude: {
    quote: "Veintidós sillas, un hogar, ningún reloj.",
    attribution: "La sala — Alameda Lorena 1642",
    imageAlt: "El interior cálido de Maison Lumière al anochecer",
  },
  cellar: {
    eyebrow: "La bodega",
    title: "Vinos que caminan con el menú",
    intro:
      "Novecientas etiquetas descansan en la bodega de piedra bajo la sala. El sumiller Rafael Okonkwo sirve un maridaje que viaja de la Serra Gaúcha a Borgoña — y vuelve a casa.",
    cellarLine: "900 etiquetas · Sumiller Rafael Okonkwo",
    glassLabel: "la copa",
    toggleHint: "Abra un maridaje para leer sus notas de cata",
    wines: [
      {
        id: "amadeu",
        courses: "Pases I y II",
        wine: "Cave Amadeu Brut Nature",
        region: "Pinto Bandeira, Brasil",
        vintage: "2021",
        notes:
          "Burbujas brasileñas secas hasta el hueso, manzana verde y brioche. Afilan el hielo de cambuci y calman la chispa delicada del jambú.",
        glassPrice: 19,
      },
      {
        id: "chablis",
        courses: "Pase III",
        wine: "Chablis 1er Cru Montmains, Dom. Colette Verger",
        region: "Borgoña, Francia",
        vintage: "2022",
        notes:
          "Tiza, flores blancas y un final salino que enhebra la mantequilla avellana con el Canastra curado.",
        glassPrice: 24,
      },
      {
        id: "soalheiro",
        courses: "Pase IV",
        wine: "Soalheiro Alvarinho Granit",
        region: "Vinho Verde, Portugal",
        vintage: "2023",
        notes:
          "Alvarinho criado en granito, tenso y cítrico — un arroyo frío que corre junto a la lubina y su humo de brasa.",
        glassPrice: 21,
      },
      {
        id: "guaspari",
        courses: "Pase V",
        wine: "Guaspari Syrah Vista da Serra",
        region: "Espírito Santo do Pinhal, Brasil",
        vintage: "2020",
        notes:
          "Pimienta negra, violetas y piedra cálida de las sierras paulistas; se enfrenta de lleno a la laca de jabuticaba del pato.",
        glassPrice: 26,
      },
      {
        id: "noval",
        courses: "Pases VI y VII",
        wine: "Quinta do Noval 10 Años Tawny",
        region: "Duero, Portugal",
        vintage: "NV",
        notes:
          "Nuez, higo y piel de naranja — un largo adiós ambarino al queso, al chocolate y a la vainilla silvestre.",
        glassPrice: 18,
      },
    ],
  },
  privateDining: {
    eyebrow: "Salones privados",
    title: "Salas que guardan secretos",
    intro:
      "Más allá de la sala principal, dos salones guardan sus propias historias — para aniversarios, negociaciones y esa clase de noche que solo debe dejar memoria como rastro.",
    seatsLabel: "Plazas",
    minimumLabel: "Mínimo por velada",
    cta: "Solicitar al reservar",
    imageAlt: "Una larga mesa privada puesta para la cena en Maison Lumière",
    rooms: [
      {
        id: "aurore",
        name: "Salon Aurore",
        seats: "Hasta 14 comensales",
        description:
          "Un joyero de paneles de jacarandá pintados a mano sobre la bodega, con entrada propia por la Alameda Lorena y un sumiller que jamás abandona la sala.",
        features: [
          "Paneles de jacarandá pintados a mano",
          "Sumiller dedicado toda la velada",
          "Entrada privada y guardarropa",
        ],
        minimum: 2200,
      },
      {
        id: "mesa",
        name: "Mesa da Chef",
        seats: "6 comensales en el pase",
        description:
          "Seis sillas de lino frente al propio hogar. El menú se extiende a diez pases — y uno de ellos lo cocinará usted, guiado con calma por Marina.",
        features: [
          "Menú extendido de diez pases",
          "Primera fila frente al hogar",
          "Un pase cocinado por sus propias manos",
        ],
        minimum: 1600,
      },
    ],
  },
  reservation: {
    eyebrow: "Reservas",
    title: "Siéntese junto al fuego",
    intro:
      "Dos turnos cada noche, de martes a sábado. La sala recibe a veintidós comensales — sugerimos reservar con tres semanas de antelación.",
    steps: { guests: "Comensales", date: "Noche", time: "Hora" },
    guestsTitle: "¿Cuántos en su mesa?",
    guestSingular: "comensal",
    guestPlural: "comensales",
    largerParty:
      "Para grupos de más de ocho, escriba a reservas@maisonlumiere.com.br y el Salon Aurore responderá.",
    dateTitle: "Elija su noche",
    closedLabel: "Cerrado",
    timeTitle: "Elija su hora",
    unavailableLabel: "Completo",
    seatingNote: "Primer turno 18:45 — último turno 21:45",
    backLabel: "Volver",
    continueLabel: "Continuar",
    confirmLabel: "Confirmar reserva",
    summaryTitle: "Su velada",
    summaryGuests: "Mesa para",
    summaryDate: "Noche",
    summaryTime: "Hora",
    confirmedTitle: "La mesa es suya",
    confirmedBody:
      "Una nota de confirmación va de camino a su correo. Guardamos cada mesa quince minutos más allá de la hora — el fuego hace el resto.",
    confirmationLabel: "Código de reserva",
    dressCode: "Etiqueta: elegante, sin rigidez. La sala es fresca y está iluminada con velas.",
    resetLabel: "Hacer otra reserva",
  },
  footer: {
    blurb: "Siete pases, un hogar, veintidós sillas en el corazón de Jardins.",
    addressLabel: "Dirección",
    address: ["Alameda Lorena 1642", "Jardins, São Paulo — SP", "01424-007, Brasil"],
    hoursLabel: "Horario",
    hours: ["De martes a sábado", "Turnos 18:45 — 21:45", "Bar de bodega desde las 18:00"],
    contactLabel: "Contacto",
    phone: "+55 11 3061 2790",
    email: "reservas@maisonlumiere.com.br",
    followLabel: "Síganos",
    socials: ["Instagram", "El Journal", "Newsletter"],
    fineprint: "© 2026 Maison Lumière · CNPJ 12.345.678/0001-90 · Todos los derechos reservados.",
  },
};

export const lumiereDictionary: DemoDictionary<LumiereContent> = { en, pt, es };
