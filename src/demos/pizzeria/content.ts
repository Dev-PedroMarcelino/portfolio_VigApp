import type { DemoDictionary } from "@/demos/content";

export type SizeId = "s26" | "s32" | "s40";
export type CategoryId = "rosse" | "bianche" | "dolci";

export interface SizeOption {
  id: SizeId;
  cm: number;
  label: string;
}

export interface PizzaItem {
  id: string;
  name: string;
  ingredients: string;
  woodFired: boolean;
  prices: Record<SizeId, number>;
}

export interface DolceItem {
  id: string;
  name: string;
  description: string;
  woodFired: boolean;
  price: number;
}

export interface ProcessStep {
  number: string;
  title: string;
  body: string;
  stat: string;
  statLabel: string;
}

export interface PizzeriaContent {
  currency: { code: string; locale: string };
  sizes: SizeOption[];
  header: {
    navAria: string;
    navMenu: string;
    navStory: string;
    navProcess: string;
    navDelivery: string;
    orderCta: string;
    cartAria: string;
    locationTag: string;
  };
  hero: {
    eyebrow: string;
    titleTop: string;
    titleItalic: string;
    lede: string;
    primaryCta: string;
    secondaryCta: string;
    facts: string[];
    ringText: string;
    stampTop: string;
    stampBottom: string;
    pizzaAlt: string;
  };
  menu: {
    eyebrow: string;
    title: string;
    intro: string;
    woodFireBadge: string;
    addLabel: string;
    addedLabel: string;
    sizeAria: string;
    dolciDetail: string;
    categories: { id: CategoryId; label: string; note: string }[];
    rosse: PizzaItem[];
    bianche: PizzaItem[];
    dolci: DolceItem[];
  };
  story: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    quote: string;
    quoteAttribution: string;
    stats: { value: string; label: string }[];
    ovenAlt: string;
    tablesAlt: string;
  };
  process: {
    eyebrow: string;
    title: string;
    intro: string;
    prevAria: string;
    nextAria: string;
    stepAria: string;
    steps: ProcessStep[];
    kitchenAlt: string;
  };
  delivery: {
    eyebrow: string;
    title: string;
    toggleAria: string;
    deliveryLabel: string;
    pickupLabel: string;
    zonesLabel: string;
    zones: string[];
    timeLabel: string;
    deliveryTime: string;
    pickupTime: string;
    feeLabel: string;
    freeHint: string;
    boxNote: string;
    addressLabel: string;
    address: string;
    pickupNote: string;
    cta: string;
    sliceAlt: string;
  };
  cart: {
    title: string;
    closeAria: string;
    empty: { title: string; body: string; cta: string };
    fulfillmentLabel: string;
    deliveryLabel: string;
    pickupLabel: string;
    increaseAria: string;
    decreaseAria: string;
    removeAria: string;
    subtotalLabel: string;
    feeLabel: string;
    freeBadge: string;
    totalLabel: string;
    checkoutCta: string;
    deliveryFee: number;
    freeAbove: number;
    freeHint: string;
    success: {
      title: string;
      body: string;
      deliveryEta: string;
      pickupEta: string;
      orderLabel: string;
      totalLabel: string;
      newOrderCta: string;
    };
  };
  footer: {
    blurb: string;
    visitLabel: string;
    address: string;
    phone: string;
    email: string;
    hoursLabel: string;
    hours: string[];
    followLabel: string;
    socials: string[];
    legal: string;
    backToTop: string;
  };
}

const en: PizzeriaContent = {
  currency: { code: "USD", locale: "en-US" },
  sizes: [
    { id: "s26", cm: 26, label: "Solo" },
    { id: "s32", cm: 32, label: "Classic" },
    { id: "s40", cm: 40, label: "Family" },
  ],
  header: {
    navAria: "Main navigation",
    navMenu: "Menu",
    navStory: "Our story",
    navProcess: "The dough",
    navDelivery: "Delivery",
    orderCta: "Order now",
    cartAria: "Open your order",
    locationTag: "Vila Madalena · São Paulo",
  },
  hero: {
    eyebrow: "Pizzeria napoletana · since 1962",
    titleTop: "Ninety seconds of fire.",
    titleItalic: "Sixty years of craft.",
    lede: "Forno Nero has fed Vila Madalena from the same wood-fired oven since 1962 — San Marzano tomatoes, 48-hour dough and a recipe that crossed the Atlantic in a leather suitcase.",
    primaryCta: "See the menu",
    secondaryCta: "Our story",
    facts: ["48-hour dough", "San Marzano D.O.P.", "Oak fire at 485°C"],
    ringText: "Forno a legna · Pizza napoletana · dal 1962 · ",
    stampTop: "dal 1962",
    stampBottom: "Napoli–SP",
    pizzaAlt: "Wood-fired Margherita pizza seen from above, with charred crust and fresh basil",
  },
  menu: {
    eyebrow: "Il menu",
    title: "Red, white and golden-edged.",
    intro: "Every pizza leaves the oven in about ninety seconds — blistered, smoky, unmistakably Neapolitan. Sizes are honest, and so are the prices.",
    woodFireBadge: "Wood-fired",
    addLabel: "Add",
    addedLabel: "Added",
    sizeAria: "Choose a size for",
    dolciDetail: "Single serving",
    categories: [
      { id: "rosse", label: "Pizze Rosse", note: "Tomato first, always" },
      { id: "bianche", label: "Pizze Bianche", note: "No tomato — cream and char" },
      { id: "dolci", label: "Dolci", note: "A sweet ending" },
    ],
    rosse: [
      {
        id: "margherita",
        name: "Margherita D.O.P.",
        ingredients: "San Marzano tomato, fior di latte, fresh basil, Grana Padano, olive oil",
        woodFired: true,
        prices: { s26: 14, s32: 19, s40: 26 },
      },
      {
        id: "marinara",
        name: "Marinara Antica",
        ingredients: "San Marzano tomato, sliced garlic, wild oregano, extra-virgin olive oil",
        woodFired: true,
        prices: { s26: 12, s32: 16, s40: 22 },
      },
      {
        id: "diavola",
        name: "Diavola",
        ingredients: "Spicy Calabrian salami, San Marzano tomato, smoked mozzarella, chili honey",
        woodFired: true,
        prices: { s26: 16, s32: 21, s40: 29 },
      },
      {
        id: "sangennaro",
        name: "San Gennaro",
        ingredients: "Slow-roasted tomatoes, buffalo mozzarella, Cetara anchovies, capers",
        woodFired: true,
        prices: { s26: 18, s32: 24, s40: 33 },
      },
    ],
    bianche: [
      {
        id: "quattroformaggi",
        name: "Quattro Formaggi",
        ingredients: "Fior di latte, gorgonzola, taleggio, Grana Padano, walnut crumble",
        woodFired: true,
        prices: { s26: 17, s32: 23, s40: 31 },
      },
      {
        id: "friarielli",
        name: "Salsiccia e Friarielli",
        ingredients: "Fennel sausage, wilted broccoli rabe, smoked provola, black pepper",
        woodFired: true,
        prices: { s26: 18, s32: 24, s40: 33 },
      },
      {
        id: "patate",
        name: "Patate e Rosmarino",
        ingredients: "Paper-thin potatoes, rosemary, pecorino, cracked pepper, olive oil",
        woodFired: true,
        prices: { s26: 15, s32: 20, s40: 27 },
      },
      {
        id: "mortadella",
        name: "Mortadella e Pistacchio",
        ingredients: "Mortadella, pistachio cream, stracciatella, lemon zest — finished cold",
        woodFired: false,
        prices: { s26: 19, s32: 26, s40: 35 },
      },
    ],
    dolci: [
      {
        id: "tiramisu",
        name: "Tiramisù della Casa",
        description: "Mascarpone, espresso-soaked savoiardi, bitter cocoa",
        woodFired: false,
        price: 9,
      },
      {
        id: "calzonedolce",
        name: "Calzone Dolce",
        description: "Wood-fired calzone with hazelnut cream, ricotta and orange zest",
        woodFired: true,
        price: 11,
      },
      {
        id: "cannolo",
        name: "Cannolo Siciliano",
        description: "Crisp shell, sheep ricotta, candied orange, crushed pistachio",
        woodFired: false,
        price: 8,
      },
      {
        id: "pannacotta",
        name: "Panna Cotta al Limoncello",
        description: "Silky cream set with limoncello and Amalfi lemon peel",
        woodFired: false,
        price: 8,
      },
    ],
  },
  story: {
    eyebrow: "La nostra storia",
    title: "From Rione Sanità to Vila Madalena.",
    paragraphs: [
      "In 1962, Gennaro and Assunta Vigliotti left the alleys of Rione Sanità, Naples, with two suitcases: one held their clothes, the other a sourdough starter wrapped in linen. In São Paulo they laid the bricks of the oven themselves and named it Vesuvio — because it should never go out.",
      "Three generations later, their granddaughter Lucia runs the counter with the same rules: the dough rests for two days, the tomatoes come from volcanic soil, and nobody — nobody — touches a rolling pin. The starter from that suitcase is still alive, fed every single morning.",
    ],
    quote: "The oven does not forgive and does not forget. You respect it, and it gives you back gold.",
    quoteAttribution: "Lucia Vigliotti — third generation, at the counter since 1998",
    stats: [
      { value: "1962", label: "the year Vesuvio was first lit" },
      { value: "3", label: "generations behind the counter" },
      { value: "60+", label: "years of the same mother dough" },
    ],
    ovenAlt: "Flames curling inside the wood-fired brick oven at Forno Nero",
    tablesAlt: "Warm dining room of the pizzeria with wooden tables set for dinner",
  },
  process: {
    eyebrow: "L'impasto",
    title: "Five acts, ninety seconds.",
    intro: "A Neapolitan pizza is a slow ritual with a fast ending. Walk through the five acts every Forno Nero pizza goes through — from the mother dough to the leopard-spotted crust.",
    prevAria: "Previous step",
    nextAria: "Next step",
    stepAria: "Go to step",
    steps: [
      {
        number: "01",
        title: "La madre",
        body: "The 60-year-old mother yeast is fed at dawn with type 00 flour and mountain spring water. The dough then rests for two full days — flavour cannot be rushed.",
        stat: "48h",
        statLabel: "of slow fermentation",
      },
      {
        number: "02",
        title: "La stesura",
        body: "Each ball is opened by hand, pushing the air from the centre out to the rim. That trapped air becomes the cornicione — the puffed, airy crust.",
        stat: "0",
        statLabel: "rolling pins, ever",
      },
      {
        number: "03",
        title: "Il condimento",
        body: "San Marzano tomatoes crushed by hand, fior di latte torn — never sliced — basil, a ribbon of olive oil. Nothing else gets close to the dough.",
        stat: "5",
        statLabel: "ingredients, at most",
      },
      {
        number: "04",
        title: "Il forno",
        body: "Vesuvio burns oak and citrus wood, hovering around 485°C on the stone floor. At that heat, the dough springs and blisters in seconds.",
        stat: "485°C",
        statLabel: "on the oven floor",
      },
      {
        number: "05",
        title: "I novanta secondi",
        body: "Turned three times with the palino, watched and never abandoned. Ninety seconds later it comes out leopard-spotted, soft in the middle, alive at the edge.",
        stat: "90s",
        statLabel: "from peel to plate",
      },
    ],
    kitchenAlt: "Hands working fresh dough on a flour-dusted counter in the pizzeria kitchen",
  },
  delivery: {
    eyebrow: "Delivery e ritiro",
    title: "The oven comes to you.",
    toggleAria: "Choose delivery or pickup",
    deliveryLabel: "Delivery",
    pickupLabel: "Pickup",
    zonesLabel: "Neighbourhoods we reach",
    zones: ["Vila Madalena", "Pinheiros", "Jardins", "Perdizes", "Itaim Bibi"],
    timeLabel: "Average time",
    deliveryTime: "35–45 min",
    pickupTime: "15–20 min",
    feeLabel: "Delivery fee",
    freeHint: "free above",
    boxNote: "Pizzas travel in thermal boxes, cut only on request — and never stacked.",
    addressLabel: "Counter pickup",
    address: "Rua Fidalga 219 · Vila Madalena, São Paulo",
    pickupNote: "Ring the bell twice — Lucia hands it over the counter, still blistering.",
    cta: "Build your order",
    sliceAlt: "Slice of pizza being lifted with melted mozzarella stretching",
  },
  cart: {
    title: "Your order",
    closeAria: "Close order panel",
    empty: {
      title: "The basket is empty",
      body: "The oven is hot and waiting. Pick a pizza and we will handle the fire.",
      cta: "Browse the menu",
    },
    fulfillmentLabel: "How do you want it?",
    deliveryLabel: "Delivery",
    pickupLabel: "Pickup",
    increaseAria: "Increase quantity of",
    decreaseAria: "Decrease quantity of",
    removeAria: "Remove",
    subtotalLabel: "Subtotal",
    feeLabel: "Delivery",
    freeBadge: "Free",
    totalLabel: "Total",
    checkoutCta: "Place order",
    deliveryFee: 4.9,
    freeAbove: 45,
    freeHint: "Free delivery above",
    success: {
      title: "Order in the fire.",
      body: "Vesuvio already took it personally. You will get a message the moment it leaves the oven.",
      deliveryEta: "Arrives in 35–45 min",
      pickupEta: "Ready in 15–20 min",
      orderLabel: "Order",
      totalLabel: "Total paid",
      newOrderCta: "Start a new order",
    },
  },
  footer: {
    blurb: "A Neapolitan family pizzeria in São Paulo. One oven, one dough, three generations — and no shortcuts since 1962.",
    visitLabel: "Find us",
    address: "Rua Fidalga 219 · Vila Madalena, São Paulo",
    phone: "+55 11 3814-2262",
    email: "ciao@fornonero.com.br",
    hoursLabel: "Hours",
    hours: ["Tue–Fri · 6pm–11:30pm", "Sat–Sun · noon–3pm / 6pm–midnight", "Monday · the oven rests"],
    followLabel: "Follow",
    socials: ["Instagram", "Facebook", "TripAdvisor"],
    legal: "Forno Nero is a fictional brand, designed as a portfolio concept.",
    backToTop: "Back to top",
  },
};

const pt: PizzeriaContent = {
  currency: { code: "BRL", locale: "pt-BR" },
  sizes: [
    { id: "s26", cm: 26, label: "Individual" },
    { id: "s32", cm: 32, label: "Clássica" },
    { id: "s40", cm: 40, label: "Família" },
  ],
  header: {
    navAria: "Navegação principal",
    navMenu: "Menu",
    navStory: "Nossa história",
    navProcess: "O impasto",
    navDelivery: "Delivery",
    orderCta: "Pedir agora",
    cartAria: "Abrir seu pedido",
    locationTag: "Vila Madalena · São Paulo",
  },
  hero: {
    eyebrow: "Pizzeria napoletana · desde 1962",
    titleTop: "Noventa segundos de fogo.",
    titleItalic: "Sessenta anos de ofício.",
    lede: "Desde 1962 o Forno Nero alimenta a Vila Madalena com o mesmo forno a lenha — tomate San Marzano, massa de 48 horas e uma receita que atravessou o Atlântico numa mala de couro.",
    primaryCta: "Ver o menu",
    secondaryCta: "Nossa história",
    facts: ["Massa de 48 horas", "San Marzano D.O.P.", "Lenha a 485°C"],
    ringText: "Forno a legna · Pizza napoletana · dal 1962 · ",
    stampTop: "dal 1962",
    stampBottom: "Napoli–SP",
    pizzaAlt: "Pizza Margherita saída do forno a lenha vista de cima, com borda tostada e manjericão fresco",
  },
  menu: {
    eyebrow: "Il menu",
    title: "Rossa, bianca e borda dourada.",
    intro: "Cada pizza sai do forno em cerca de noventa segundos — com bolhas, defumada, napolitana da primeira à última mordida. Tamanhos honestos, preços também.",
    woodFireBadge: "Forno a lenha",
    addLabel: "Adicionar",
    addedLabel: "Adicionado",
    sizeAria: "Escolher o tamanho de",
    dolciDetail: "Porção individual",
    categories: [
      { id: "rosse", label: "Pizze Rosse", note: "O tomate vem primeiro, sempre" },
      { id: "bianche", label: "Pizze Bianche", note: "Sem tomate — creme e brasa" },
      { id: "dolci", label: "Dolci", note: "Um final doce" },
    ],
    rosse: [
      {
        id: "margherita",
        name: "Margherita D.O.P.",
        ingredients: "Tomate San Marzano, fior di latte, manjericão fresco, Grana Padano, azeite",
        woodFired: true,
        prices: { s26: 52, s32: 68, s40: 89 },
      },
      {
        id: "marinara",
        name: "Marinara Antica",
        ingredients: "Tomate San Marzano, alho laminado, orégano selvagem, azeite extravirgem",
        woodFired: true,
        prices: { s26: 45, s32: 59, s40: 79 },
      },
      {
        id: "diavola",
        name: "Diavola",
        ingredients: "Salame calabrês picante, tomate San Marzano, muçarela defumada, mel com pimenta",
        woodFired: true,
        prices: { s26: 58, s32: 75, s40: 98 },
      },
      {
        id: "sangennaro",
        name: "San Gennaro",
        ingredients: "Tomates assados lentamente, muçarela de búfala, aliches de Cetara, alcaparras",
        woodFired: true,
        prices: { s26: 64, s32: 83, s40: 109 },
      },
    ],
    bianche: [
      {
        id: "quattroformaggi",
        name: "Quattro Formaggi",
        ingredients: "Fior di latte, gorgonzola, taleggio, Grana Padano, farofa de nozes",
        woodFired: true,
        prices: { s26: 62, s32: 79, s40: 104 },
      },
      {
        id: "friarielli",
        name: "Salsiccia e Friarielli",
        ingredients: "Linguiça de erva-doce, grelos refogados, provola defumada, pimenta-do-reino",
        woodFired: true,
        prices: { s26: 64, s32: 85, s40: 112 },
      },
      {
        id: "patate",
        name: "Patate e Rosmarino",
        ingredients: "Batatas em lâminas finas, alecrim, pecorino, pimenta moída, azeite",
        woodFired: true,
        prices: { s26: 54, s32: 69, s40: 92 },
      },
      {
        id: "mortadella",
        name: "Mortadella e Pistacchio",
        ingredients: "Mortadela, creme de pistache, stracciatella, raspas de limão — finalizada fria",
        woodFired: false,
        prices: { s26: 69, s32: 89, s40: 118 },
      },
    ],
    dolci: [
      {
        id: "tiramisu",
        name: "Tiramisù della Casa",
        description: "Mascarpone, savoiardi embebidos em espresso, cacau amargo",
        woodFired: false,
        price: 32,
      },
      {
        id: "calzonedolce",
        name: "Calzone Dolce",
        description: "Calzone assado na lenha com creme de avelã, ricota e raspas de laranja",
        woodFired: true,
        price: 38,
      },
      {
        id: "cannolo",
        name: "Cannolo Siciliano",
        description: "Casquinha crocante, ricota de ovelha, laranja cristalizada, pistache",
        woodFired: false,
        price: 28,
      },
      {
        id: "pannacotta",
        name: "Panna Cotta al Limoncello",
        description: "Creme sedoso com limoncello e casca de limão de Amalfi",
        woodFired: false,
        price: 26,
      },
    ],
  },
  story: {
    eyebrow: "La nostra storia",
    title: "Do Rione Sanità à Vila Madalena.",
    paragraphs: [
      "Em 1962, Gennaro e Assunta Vigliotti deixaram os becos do Rione Sanità, em Nápoles, com duas malas: uma levava as roupas, a outra, um fermento natural enrolado em linho. Em São Paulo, assentaram os tijolos do forno com as próprias mãos e o batizaram de Vesuvio — porque ele nunca deveria se apagar.",
      "Três gerações depois, a neta Lucia comanda o balcão com as mesmas regras: a massa descansa dois dias, o tomate vem de solo vulcânico e ninguém — ninguém — encosta num rolo de macarrão. O fermento daquela mala continua vivo, alimentado toda manhã.",
    ],
    quote: "O forno não perdoa e não esquece. Você o respeita, e ele devolve ouro.",
    quoteAttribution: "Lucia Vigliotti — terceira geração, no balcão desde 1998",
    stats: [
      { value: "1962", label: "o ano em que o Vesuvio acendeu" },
      { value: "3", label: "gerações atrás do balcão" },
      { value: "60+", label: "anos da mesma massa madre" },
    ],
    ovenAlt: "Chamas dentro do forno a lenha de tijolos do Forno Nero",
    tablesAlt: "Salão acolhedor da pizzaria com mesas de madeira postas para o jantar",
  },
  process: {
    eyebrow: "L'impasto",
    title: "Cinco atos, noventa segundos.",
    intro: "A pizza napolitana é um ritual lento com um final rápido. Percorra os cinco atos de cada pizza do Forno Nero — da massa madre à borda leopardada.",
    prevAria: "Etapa anterior",
    nextAria: "Próxima etapa",
    stepAria: "Ir para a etapa",
    steps: [
      {
        number: "01",
        title: "La madre",
        body: "O fermento-mãe de 60 anos é alimentado ao amanhecer com farinha tipo 00 e água de nascente. Depois, a massa descansa dois dias inteiros — sabor não tem pressa.",
        stat: "48h",
        statLabel: "de fermentação lenta",
      },
      {
        number: "02",
        title: "La stesura",
        body: "Cada bola é aberta à mão, empurrando o ar do centro para a borda. Esse ar preso vira o cornicione — a borda alta, leve e aerada.",
        stat: "0",
        statLabel: "rolos de massa, jamais",
      },
      {
        number: "03",
        title: "Il condimento",
        body: "Tomates San Marzano esmagados à mão, fior di latte rasgado — nunca fatiado —, manjericão e um fio de azeite. Nada mais chega perto da massa.",
        stat: "5",
        statLabel: "ingredientes, no máximo",
      },
      {
        number: "04",
        title: "Il forno",
        body: "O Vesuvio queima carvalho e lenha de cítricos, beirando 485°C no piso de pedra. Nesse calor, a massa cresce e ganha bolhas em segundos.",
        stat: "485°C",
        statLabel: "no piso do forno",
      },
      {
        number: "05",
        title: "I novanta secondi",
        body: "Girada três vezes com o palino, vigiada e nunca abandonada. Noventa segundos depois sai leopardada, macia no centro, viva na borda.",
        stat: "90s",
        statLabel: "da pá ao prato",
      },
    ],
    kitchenAlt: "Mãos trabalhando a massa fresca sobre a bancada polvilhada de farinha",
  },
  delivery: {
    eyebrow: "Delivery e retirada",
    title: "O forno vai até você.",
    toggleAria: "Escolher entre delivery e retirada",
    deliveryLabel: "Delivery",
    pickupLabel: "Retirada",
    zonesLabel: "Bairros que alcançamos",
    zones: ["Vila Madalena", "Pinheiros", "Jardins", "Perdizes", "Itaim Bibi"],
    timeLabel: "Tempo médio",
    deliveryTime: "35–45 min",
    pickupTime: "15–20 min",
    feeLabel: "Taxa de entrega",
    freeHint: "grátis acima de",
    boxNote: "As pizzas viajam em caixas térmicas, cortadas só a pedido — e nunca empilhadas.",
    addressLabel: "Retirada no balcão",
    address: "Rua Fidalga 219 · Vila Madalena, São Paulo",
    pickupNote: "Toque a campainha duas vezes — a Lucia entrega no balcão, ainda borbulhando.",
    cta: "Montar seu pedido",
    sliceAlt: "Fatia de pizza sendo levantada com a muçarela derretida se esticando",
  },
  cart: {
    title: "Seu pedido",
    closeAria: "Fechar painel do pedido",
    empty: {
      title: "A cesta está vazia",
      body: "O forno está quente, esperando. Escolha uma pizza que o fogo é por nossa conta.",
      cta: "Ver o menu",
    },
    fulfillmentLabel: "Como você prefere?",
    deliveryLabel: "Delivery",
    pickupLabel: "Retirada",
    increaseAria: "Aumentar a quantidade de",
    decreaseAria: "Diminuir a quantidade de",
    removeAria: "Remover",
    subtotalLabel: "Subtotal",
    feeLabel: "Entrega",
    freeBadge: "Grátis",
    totalLabel: "Total",
    checkoutCta: "Finalizar pedido",
    deliveryFee: 12.9,
    freeAbove: 160,
    freeHint: "Entrega grátis acima de",
    success: {
      title: "Pedido no fogo.",
      body: "O Vesuvio já levou para o lado pessoal. Você recebe uma mensagem assim que a pizza sair do forno.",
      deliveryEta: "Chega em 35–45 min",
      pickupEta: "Pronto em 15–20 min",
      orderLabel: "Pedido",
      totalLabel: "Total pago",
      newOrderCta: "Começar novo pedido",
    },
  },
  footer: {
    blurb: "Uma pizzaria de família napolitana em São Paulo. Um forno, uma massa, três gerações — e nenhum atalho desde 1962.",
    visitLabel: "Onde estamos",
    address: "Rua Fidalga 219 · Vila Madalena, São Paulo",
    phone: "+55 11 3814-2262",
    email: "ciao@fornonero.com.br",
    hoursLabel: "Horários",
    hours: ["Ter–Sex · 18h–23h30", "Sáb–Dom · 12h–15h / 18h–00h", "Segunda · o forno descansa"],
    followLabel: "Siga",
    socials: ["Instagram", "Facebook", "TripAdvisor"],
    legal: "Forno Nero é uma marca fictícia, criada como conceito de portfólio.",
    backToTop: "Voltar ao topo",
  },
};

const es: PizzeriaContent = {
  currency: { code: "EUR", locale: "es-ES" },
  sizes: [
    { id: "s26", cm: 26, label: "Individual" },
    { id: "s32", cm: 32, label: "Clásica" },
    { id: "s40", cm: 40, label: "Familiar" },
  ],
  header: {
    navAria: "Navegación principal",
    navMenu: "Carta",
    navStory: "Nuestra historia",
    navProcess: "El impasto",
    navDelivery: "Delivery",
    orderCta: "Pedir ahora",
    cartAria: "Abrir tu pedido",
    locationTag: "Vila Madalena · São Paulo",
  },
  hero: {
    eyebrow: "Pizzeria napoletana · desde 1962",
    titleTop: "Noventa segundos de fuego.",
    titleItalic: "Sesenta años de oficio.",
    lede: "Desde 1962, Forno Nero alimenta a Vila Madalena desde el mismo horno de leña — tomate San Marzano, masa de 48 horas y una receta que cruzó el Atlántico en una maleta de cuero.",
    primaryCta: "Ver la carta",
    secondaryCta: "Nuestra historia",
    facts: ["Masa de 48 horas", "San Marzano D.O.P.", "Leña a 485°C"],
    ringText: "Forno a legna · Pizza napoletana · dal 1962 · ",
    stampTop: "dal 1962",
    stampBottom: "Napoli–SP",
    pizzaAlt: "Pizza Margherita al horno de leña vista desde arriba, con borde tostado y albahaca fresca",
  },
  menu: {
    eyebrow: "Il menu",
    title: "Rossa, bianca y borde dorado.",
    intro: "Cada pizza sale del horno en unos noventa segundos — con burbujas, ahumada, napolitana sin discusión. Tamaños honestos y precios también.",
    woodFireBadge: "Horno de leña",
    addLabel: "Añadir",
    addedLabel: "Añadido",
    sizeAria: "Elegir el tamaño de",
    dolciDetail: "Ración individual",
    categories: [
      { id: "rosse", label: "Pizze Rosse", note: "El tomate primero, siempre" },
      { id: "bianche", label: "Pizze Bianche", note: "Sin tomate — crema y brasa" },
      { id: "dolci", label: "Dolci", note: "Un final dulce" },
    ],
    rosse: [
      {
        id: "margherita",
        name: "Margherita D.O.P.",
        ingredients: "Tomate San Marzano, fior di latte, albahaca fresca, Grana Padano, aceite de oliva",
        woodFired: true,
        prices: { s26: 9.5, s32: 12.5, s40: 17 },
      },
      {
        id: "marinara",
        name: "Marinara Antica",
        ingredients: "Tomate San Marzano, ajo laminado, orégano silvestre, aceite virgen extra",
        woodFired: true,
        prices: { s26: 8, s32: 10.5, s40: 14.5 },
      },
      {
        id: "diavola",
        name: "Diavola",
        ingredients: "Salami calabrés picante, tomate San Marzano, mozzarella ahumada, miel con guindilla",
        woodFired: true,
        prices: { s26: 11, s32: 14.5, s40: 19.5 },
      },
      {
        id: "sangennaro",
        name: "San Gennaro",
        ingredients: "Tomates asados lentamente, mozzarella de búfala, anchoas de Cetara, alcaparras",
        woodFired: true,
        prices: { s26: 12.5, s32: 16, s40: 21.5 },
      },
    ],
    bianche: [
      {
        id: "quattroformaggi",
        name: "Quattro Formaggi",
        ingredients: "Fior di latte, gorgonzola, taleggio, Grana Padano, crumble de nueces",
        woodFired: true,
        prices: { s26: 12, s32: 15.5, s40: 20.5 },
      },
      {
        id: "friarielli",
        name: "Salsiccia e Friarielli",
        ingredients: "Salchicha de hinojo, grelos salteados, provola ahumada, pimienta negra",
        woodFired: true,
        prices: { s26: 12.5, s32: 16.5, s40: 22 },
      },
      {
        id: "patate",
        name: "Patate e Rosmarino",
        ingredients: "Patata en láminas finas, romero, pecorino, pimienta molida, aceite de oliva",
        woodFired: true,
        prices: { s26: 10.5, s32: 13.5, s40: 18 },
      },
      {
        id: "mortadella",
        name: "Mortadella e Pistacchio",
        ingredients: "Mortadela, crema de pistacho, stracciatella, ralladura de limón — acabada en frío",
        woodFired: false,
        prices: { s26: 13.5, s32: 17.5, s40: 23.5 },
      },
    ],
    dolci: [
      {
        id: "tiramisu",
        name: "Tiramisù della Casa",
        description: "Mascarpone, savoiardi empapados en espresso, cacao amargo",
        woodFired: false,
        price: 6.5,
      },
      {
        id: "calzonedolce",
        name: "Calzone Dolce",
        description: "Calzone al horno de leña con crema de avellana, ricotta y ralladura de naranja",
        woodFired: true,
        price: 7.5,
      },
      {
        id: "cannolo",
        name: "Cannolo Siciliano",
        description: "Masa crujiente, ricotta de oveja, naranja confitada, pistacho triturado",
        woodFired: false,
        price: 6,
      },
      {
        id: "pannacotta",
        name: "Panna Cotta al Limoncello",
        description: "Crema sedosa con limoncello y piel de limón de Amalfi",
        woodFired: false,
        price: 5.5,
      },
    ],
  },
  story: {
    eyebrow: "La nostra storia",
    title: "Del Rione Sanità a Vila Madalena.",
    paragraphs: [
      "En 1962, Gennaro y Assunta Vigliotti dejaron los callejones del Rione Sanità, en Nápoles, con dos maletas: una llevaba la ropa; la otra, una masa madre envuelta en lino. En São Paulo levantaron el horno ladrillo a ladrillo y lo bautizaron Vesuvio — porque no debía apagarse jamás.",
      "Tres generaciones después, su nieta Lucia dirige el mostrador con las mismas reglas: la masa reposa dos días, el tomate viene de suelo volcánico y nadie — nadie — toca un rodillo. La masa madre de aquella maleta sigue viva, alimentada cada mañana.",
    ],
    quote: "El horno no perdona y no olvida. Lo respetas, y te devuelve oro.",
    quoteAttribution: "Lucia Vigliotti — tercera generación, en el mostrador desde 1998",
    stats: [
      { value: "1962", label: "el año en que se encendió el Vesuvio" },
      { value: "3", label: "generaciones tras el mostrador" },
      { value: "60+", label: "años de la misma masa madre" },
    ],
    ovenAlt: "Llamas dentro del horno de leña de ladrillo de Forno Nero",
    tablesAlt: "Comedor cálido de la pizzería con mesas de madera preparadas para la cena",
  },
  process: {
    eyebrow: "L'impasto",
    title: "Cinco actos, noventa segundos.",
    intro: "La pizza napolitana es un ritual lento con un final rápido. Recorre los cinco actos de cada pizza de Forno Nero — de la masa madre al borde leopardado.",
    prevAria: "Paso anterior",
    nextAria: "Paso siguiente",
    stepAria: "Ir al paso",
    steps: [
      {
        number: "01",
        title: "La madre",
        body: "La levadura madre de 60 años se alimenta al amanecer con harina tipo 00 y agua de manantial. Después, la masa reposa dos días enteros — el sabor no tiene prisa.",
        stat: "48h",
        statLabel: "de fermentación lenta",
      },
      {
        number: "02",
        title: "La stesura",
        body: "Cada bola se abre a mano, empujando el aire del centro hacia el borde. Ese aire atrapado se convierte en el cornicione — el borde alto y aireado.",
        stat: "0",
        statLabel: "rodillos, jamás",
      },
      {
        number: "03",
        title: "Il condimento",
        body: "Tomates San Marzano aplastados a mano, fior di latte desgarrado — nunca en rodajas —, albahaca y un hilo de aceite. Nada más se acerca a la masa.",
        stat: "5",
        statLabel: "ingredientes, como máximo",
      },
      {
        number: "04",
        title: "Il forno",
        body: "El Vesuvio quema roble y leña de cítricos, rozando los 485°C en el suelo de piedra. Con ese calor, la masa crece y se ampolla en segundos.",
        stat: "485°C",
        statLabel: "en el suelo del horno",
      },
      {
        number: "05",
        title: "I novanta secondi",
        body: "Girada tres veces con el palino, vigilada y nunca abandonada. Noventa segundos después sale leopardada, tierna en el centro, viva en el borde.",
        stat: "90s",
        statLabel: "de la pala al plato",
      },
    ],
    kitchenAlt: "Manos trabajando la masa fresca sobre una encimera espolvoreada de harina",
  },
  delivery: {
    eyebrow: "Delivery y recogida",
    title: "El horno va hacia ti.",
    toggleAria: "Elegir entre delivery y recogida",
    deliveryLabel: "Delivery",
    pickupLabel: "Recogida",
    zonesLabel: "Barrios a los que llegamos",
    zones: ["Vila Madalena", "Pinheiros", "Jardins", "Perdizes", "Itaim Bibi"],
    timeLabel: "Tiempo medio",
    deliveryTime: "35–45 min",
    pickupTime: "15–20 min",
    feeLabel: "Gastos de envío",
    freeHint: "gratis a partir de",
    boxNote: "Las pizzas viajan en cajas térmicas, cortadas solo bajo pedido — y nunca apiladas.",
    addressLabel: "Recogida en mostrador",
    address: "Rua Fidalga 219 · Vila Madalena, São Paulo",
    pickupNote: "Toca el timbre dos veces — Lucia te la entrega en el mostrador, todavía burbujeando.",
    cta: "Montar tu pedido",
    sliceAlt: "Porción de pizza levantada con la mozzarella fundida estirándose",
  },
  cart: {
    title: "Tu pedido",
    closeAria: "Cerrar panel del pedido",
    empty: {
      title: "La cesta está vacía",
      body: "El horno está caliente, esperando. Elige una pizza y del fuego nos ocupamos nosotros.",
      cta: "Ver la carta",
    },
    fulfillmentLabel: "¿Cómo lo prefieres?",
    deliveryLabel: "Delivery",
    pickupLabel: "Recogida",
    increaseAria: "Aumentar la cantidad de",
    decreaseAria: "Reducir la cantidad de",
    removeAria: "Quitar",
    subtotalLabel: "Subtotal",
    feeLabel: "Envío",
    freeBadge: "Gratis",
    totalLabel: "Total",
    checkoutCta: "Confirmar pedido",
    deliveryFee: 3.5,
    freeAbove: 35,
    freeHint: "Envío gratis a partir de",
    success: {
      title: "Pedido al fuego.",
      body: "El Vesuvio ya se lo ha tomado como algo personal. Te avisamos en cuanto salga del horno.",
      deliveryEta: "Llega en 35–45 min",
      pickupEta: "Listo en 15–20 min",
      orderLabel: "Pedido",
      totalLabel: "Total pagado",
      newOrderCta: "Empezar un nuevo pedido",
    },
  },
  footer: {
    blurb: "Una pizzería familiar napolitana en São Paulo. Un horno, una masa, tres generaciones — y ningún atajo desde 1962.",
    visitLabel: "Dónde estamos",
    address: "Rua Fidalga 219 · Vila Madalena, São Paulo",
    phone: "+55 11 3814-2262",
    email: "ciao@fornonero.com.br",
    hoursLabel: "Horario",
    hours: ["Mar–Vie · 18:00–23:30", "Sáb–Dom · 12:00–15:00 / 18:00–00:00", "Lunes · el horno descansa"],
    followLabel: "Síguenos",
    socials: ["Instagram", "Facebook", "TripAdvisor"],
    legal: "Forno Nero es una marca ficticia, creada como concepto de portfolio.",
    backToTop: "Volver arriba",
  },
};

export const pizzeriaDictionary: DemoDictionary<PizzeriaContent> = { en, pt, es };
