import type { DemoDictionary } from "@/demos/content";

export type BurgerCategoryId = "classics" | "stacks" | "fiery" | "meatless";
export type MenuTabId = "all" | BurgerCategoryId;

export interface BurgerItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: BurgerCategoryId;
  tag?: string;
  heat?: number;
}

export interface ComboOption {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface SideItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface EmberStackContent {
  currency: { code: string; locale: string };
  header: {
    tagline: string;
    navAria: string;
    navMenu: string;
    navCombo: string;
    navSides: string;
    navVisit: string;
    orderCta: string;
    cartAria: string;
  };
  hero: {
    stickerTop: string;
    titleLines: string[];
    lede: string;
    primaryCta: string;
    secondaryCta: string;
    burgerAlt: string;
    priceSticker: string;
    chips: string[];
    marquee: string[];
    stat: { value: string; label: string };
  };
  menu: {
    eyebrow: string;
    title: string;
    intro: string;
    tabsAria: string;
    categories: { id: MenuTabId; label: string }[];
    heatAria: string;
    addLabel: string;
    addedLabel: string;
    footnote: string;
    items: BurgerItem[];
  };
  combo: {
    eyebrow: string;
    title: string;
    intro: string;
    stepBun: string;
    stepPatty: string;
    stepExtras: string;
    buns: ComboOption[];
    patties: ComboOption[];
    extras: ComboOption[];
    includedLabel: string;
    baseLabel: string;
    baseNote: string;
    basePrice: number;
    totalLabel: string;
    summaryLabel: string;
    extrasEmpty: string;
    addLabel: string;
    addedLabel: string;
    comboName: string;
    resetLabel: string;
    imageAlt: string;
  };
  sides: {
    eyebrow: string;
    title: string;
    intro: string;
    sidesLabel: string;
    shakesLabel: string;
    friesAlt: string;
    shakeAlt: string;
    addLabel: string;
    addedLabel: string;
    sides: SideItem[];
    shakes: SideItem[];
  };
  visit: {
    eyebrow: string;
    title: string;
    intro: string;
    addressLabel: string;
    address: string;
    city: string;
    hoursLabel: string;
    hours: { days: string; time: string }[];
    contactLabel: string;
    phone: string;
    telHref: string;
    email: string;
    pickupNote: string;
    dineAlt: string;
    ctaLabel: string;
  };
  cart: {
    barLabel: string;
    viewLabel: string;
    closeAria: string;
    itemSingular: string;
    itemPlural: string;
    increaseAria: string;
    decreaseAria: string;
    removeAria: string;
    totalLabel: string;
    clearLabel: string;
    checkoutLabel: string;
    emptyTitle: string;
    emptyBody: string;
    emptyCta: string;
    success: {
      title: string;
      body: string;
      orderLabel: string;
      totalLabel: string;
      etaLabel: string;
      eta: string;
      again: string;
    };
  };
  footer: {
    blurb: string;
    navLabel: string;
    socialLabel: string;
    socials: string[];
    legal: string;
    backToTop: string;
  };
}

const en: EmberStackContent = {
  currency: { code: "USD", locale: "en-US" },
  header: {
    tagline: "Smash burgers & charcoal since 2019",
    navAria: "Main navigation",
    navMenu: "The burgers",
    navCombo: "Build a combo",
    navSides: "Sides & shakes",
    navVisit: "Find us",
    orderCta: "Order now",
    cartAria: "Open your order",
  },
  hero: {
    stickerTop: "Est. 2019 — East Austin, TX",
    titleLines: ["Smash.", "Stack.", "Devour."],
    lede: "Thin patties pressed hard on a screaming-hot plancha, edges like lace, cheese like lava. Ember & Stack is loud food done properly — real charcoal, potato rolls baked daily and sauces we refuse to explain.",
    primaryCta: "See the menu",
    secondaryCta: "Build your combo",
    burgerAlt: "Double smash burger with melted cheese on a toasted potato roll",
    priceSticker: "From $9.50",
    chips: ["Smashed to order", "Real charcoal fire", "No freezer on site"],
    marquee: [
      "Crispy lace edges",
      "Free refill fountain",
      "Open till midnight",
      "Sauce on everything",
      "Napkins are on us",
    ],
    stat: { value: "90 sec", label: "from press to plate" },
  },
  menu: {
    eyebrow: "The lineup",
    title: "Burgers that slap the table",
    intro:
      "Nine stacks, zero fillers. Every patty is 100% chuck and brisket, smashed at 450 F and finished with our ember glaze. Pick a lane or eat across the whole board.",
    tabsAria: "Filter burgers by style",
    categories: [
      { id: "all", label: "All of it" },
      { id: "classics", label: "Smash classics" },
      { id: "stacks", label: "Tall stacks" },
      { id: "fiery", label: "Hot ones" },
      { id: "meatless", label: "No beef" },
    ],
    heatAria: "Heat level",
    addLabel: "Add",
    addedLabel: "In the bag",
    footnote:
      "Every burger ships with pickles, ember sauce and a stack of napkins you will absolutely need.",
    items: [
      {
        id: "og-smash",
        name: "The OG Smash",
        description:
          "Single chuck-brisket patty, American cheese, shaved onion, pickles and ember sauce on a toasted potato roll.",
        price: 9.5,
        category: "classics",
        tag: "Crowd favorite",
      },
      {
        id: "mustard-baron",
        name: "Mustard Baron",
        description:
          "Mustard-griddled patty, yellow cheddar, charred jalapeno relish and diced white onion.",
        price: 10.5,
        category: "classics",
        heat: 1,
      },
      {
        id: "blue-collar",
        name: "Blue Collar",
        description:
          "Smash patty, blue cheese crumble, caramelized onions and a black-pepper mayo that means business.",
        price: 11.2,
        category: "classics",
      },
      {
        id: "double-trouble",
        name: "Double Trouble",
        description:
          "Two patties, two slices of American, double onions and a pickle heap. The reason our griddle never sleeps.",
        price: 13.9,
        category: "stacks",
      },
      {
        id: "smoke-stack",
        name: "Smoke Stack",
        description:
          "Triple patty, smoked cheddar, molasses bacon, crispy onions and bonfire BBQ glaze. Comes with a warning.",
        price: 15.6,
        category: "stacks",
        tag: "New",
      },
      {
        id: "el-scorcho",
        name: "El Scorcho",
        description:
          "Habanero jam, pepper jack, charred jalapenos and chipotle crema. Pleasant at first, personal by the end.",
        price: 11.8,
        category: "fiery",
        heat: 2,
      },
      {
        id: "hellfire-stack",
        name: "Hellfire Stack",
        description:
          "Double patty painted with scorpion-pepper glaze, ghost cheese sauce and pickled fresno chilies. Sign here.",
        price: 13.4,
        category: "fiery",
        heat: 3,
      },
      {
        id: "green-machine",
        name: "Green Machine",
        description:
          "Charred portobello and black-bean patty, smoked gouda, shaved cabbage and green goddess drip.",
        price: 10.9,
        category: "meatless",
      },
      {
        id: "shroom-boom",
        name: "Shroom Boom",
        description:
          "Crispy oyster-mushroom stack, garlic confit mayo, arugula and pickled red onion on brioche.",
        price: 11.4,
        category: "meatless",
      },
    ],
  },
  combo: {
    eyebrow: "Combo lab",
    title: "Build the stack you deserve",
    intro:
      "Start with fries and a bottomless fountain drink, then make three loud decisions. The price updates while you argue with yourself.",
    stepBun: "01 — Pick your bun",
    stepPatty: "02 — Pick your patties",
    stepExtras: "03 — Pile on extras",
    buns: [
      {
        id: "potato-roll",
        name: "Potato Roll",
        description: "Squishy, buttered, toasted on the flat top.",
        price: 0,
      },
      {
        id: "brioche",
        name: "Butter Brioche",
        description: "Rich, golden, slightly show-off.",
        price: 0.8,
      },
      {
        id: "charcoal",
        name: "Charcoal Sesame",
        description: "Jet-black bun, toasted sesame, full drama.",
        price: 1.2,
      },
    ],
    patties: [
      {
        id: "single",
        name: "Single Smash",
        description: "One lace-edged patty. Elegant.",
        price: 0,
      },
      {
        id: "double",
        name: "Double Smash",
        description: "The house recommendation. Balance.",
        price: 2.6,
      },
      {
        id: "triple",
        name: "Triple Smash",
        description: "Structural engineering with beef.",
        price: 4.8,
      },
    ],
    extras: [
      {
        id: "cheese",
        name: "American cheese",
        description: "Melts like it has something to prove.",
        price: 1.0,
      },
      {
        id: "bacon",
        name: "Molasses bacon",
        description: "Thick-cut, candied on the char side.",
        price: 1.9,
      },
      {
        id: "onions",
        name: "Crispy onions",
        description: "Fried until they crackle.",
        price: 0.9,
      },
      {
        id: "egg",
        name: "Runny fried egg",
        description: "Yolk as sauce. Trust it.",
        price: 1.3,
      },
      {
        id: "pickles",
        name: "Pickle heap",
        description: "House dills, unreasonable quantity.",
        price: 0.6,
      },
      {
        id: "sauce",
        name: "Extra ember sauce",
        description: "The bottle stays in the kitchen. Sorry.",
        price: 0.5,
      },
    ],
    includedLabel: "Included",
    baseLabel: "Base combo",
    baseNote:
      "Crinkle fries + bottomless fountain drink included with every build.",
    basePrice: 11.9,
    totalLabel: "Your build",
    summaryLabel: "Currently stacking",
    extrasEmpty: "No extras yet",
    addLabel: "Add combo to order",
    addedLabel: "Combo in the bag",
    comboName: "Custom Ember Combo",
    resetLabel: "Start over",
    imageAlt: "Cheeseburger combo with fries on a metal tray",
  },
  sides: {
    eyebrow: "The supporting cast",
    title: "Sides & shakes",
    intro:
      "Fries out of the fryer within 90 seconds, shakes spun to order with soft-serve we churn every morning.",
    sidesLabel: "From the fryer",
    shakesLabel: "From the spindle",
    friesAlt: "Crinkle cut fries with sea salt",
    shakeAlt: "Thick milkshake topped with whipped cream",
    addLabel: "Add",
    addedLabel: "Added",
    sides: [
      {
        id: "crinkle",
        name: "Crinkle Mountain",
        description: "Sea salt, skin on, engineered for scooping sauce.",
        price: 3.9,
      },
      {
        id: "cheese-rain",
        name: "Cheese Rain Fries",
        description: "Beer cheese poured tableside, bacon dust.",
        price: 5.4,
      },
      {
        id: "ring-tower",
        name: "Ring Tower",
        description: "Eight beer-battered onion rings with pickle mayo.",
        price: 4.8,
      },
      {
        id: "pickle-chips",
        name: "Fried Pickle Chips",
        description: "Dill chips in cornmeal armor, ranch on the side.",
        price: 4.2,
      },
    ],
    shakes: [
      {
        id: "vanilla-malt",
        name: "Vanilla Malt",
        description: "Double-malted, old-school, no shortcuts.",
        price: 5.5,
      },
      {
        id: "burnt-caramel",
        name: "Burnt Caramel",
        description: "Caramel taken slightly too far, on purpose.",
        price: 5.9,
      },
      {
        id: "strawberry-jam",
        name: "Strawberry Jam Shake",
        description: "Roasted strawberry jam folded through soft-serve.",
        price: 5.7,
      },
      {
        id: "pb-banana",
        name: "PB Banana Blender",
        description: "Peanut butter, caramelized banana, pretzel crumble.",
        price: 6.2,
      },
    ],
  },
  visit: {
    eyebrow: "Find the fire",
    title: "One block past the smoke",
    intro:
      "Follow the charcoal smell off East Sixth. Counter service, forty seats, records on vinyl and a griddle you can hear from the sidewalk.",
    addressLabel: "Address",
    address: "1412 Ember Alley",
    city: "East Austin, TX 78702",
    hoursLabel: "Hours",
    hours: [
      { days: "Monday to Thursday", time: "11:30 — 22:00" },
      { days: "Friday and Saturday", time: "11:30 — 00:00" },
      { days: "Sunday", time: "12:00 — 21:00" },
    ],
    contactLabel: "Talk to us",
    phone: "(512) 555-0184",
    telHref: "tel:+15125550184",
    email: "hey@emberandstack.com",
    pickupNote:
      "Order at the counter or grab pickup out the side window — your bag beats you to the curb.",
    dineAlt: "Smash burger and fries served at the counter",
    ctaLabel: "Call the counter",
  },
  cart: {
    barLabel: "Your order",
    viewLabel: "View order",
    closeAria: "Close order panel",
    itemSingular: "item",
    itemPlural: "items",
    increaseAria: "Increase quantity of",
    decreaseAria: "Decrease quantity of",
    removeAria: "Remove",
    totalLabel: "Total",
    clearLabel: "Clear all",
    checkoutLabel: "Send the order",
    emptyTitle: "Nothing in the bag yet",
    emptyBody: "The griddle is hot and waiting. Go pick a stack.",
    emptyCta: "Browse the burgers",
    success: {
      title: "Order on the griddle",
      body: "We are pressing your patties right now. Listen for your number by the pickup window.",
      orderLabel: "Order",
      totalLabel: "Order total",
      etaLabel: "Ready in",
      eta: "8 to 12 min",
      again: "Start a new order",
    },
  },
  footer: {
    blurb:
      "Ember & Stack is a smash burger joint that never learned to whisper. Charcoal fire, potato rolls, loud sauce, louder playlists.",
    navLabel: "Around the shop",
    socialLabel: "Make some noise",
    socials: ["@emberandstack", "emberstack.tv", "Talk to the kitchen"],
    legal:
      "Ember & Stack, 2026. A fictional brand designed by VigApp — no griddles were harmed.",
    backToTop: "Back to the top",
  },
};

const pt: EmberStackContent = {
  currency: { code: "BRL", locale: "pt-BR" },
  header: {
    tagline: "Smash burger na brasa desde 2019",
    navAria: "Navegação principal",
    navMenu: "Os burgers",
    navCombo: "Monte seu combo",
    navSides: "Acompanhamentos",
    navVisit: "Onde estamos",
    orderCta: "Pedir agora",
    cartAria: "Abrir seu pedido",
  },
  hero: {
    stickerTop: "Desde 2019 — Vila Madalena, SP",
    titleLines: ["Amassa.", "Empilha.", "Devora."],
    lede: "Blend prensado com força na chapa incandescente, borda rendada, queijo escorrendo. O Ember & Stack é comida barulhenta feita com respeito: brasa de verdade, pão de batata assado todo dia e molhos que a gente se recusa a explicar.",
    primaryCta: "Ver o cardápio",
    secondaryCta: "Montar meu combo",
    burgerAlt: "Smash burger duplo com queijo derretido no pão de batata tostado",
    priceSticker: "A partir de R$ 32,90",
    chips: ["Prensado na hora", "Brasa de verdade", "Nada de freezer"],
    marquee: [
      "Borda crocante",
      "Refil liberado",
      "Aberto até meia-noite",
      "Molho em tudo",
      "Guardanapo por nossa conta",
    ],
    stat: { value: "90 seg", label: "da chapa ao balcão" },
  },
  menu: {
    eyebrow: "A escalação",
    title: "Burgers que batem na mesa",
    intro:
      "Nove opções, zero enrolação. Todo blend é 100% acém e peito, prensado a 230 °C e finalizado com a nossa glaze de brasa. Escolha um lado ou coma a tabela inteira.",
    tabsAria: "Filtrar burgers por estilo",
    categories: [
      { id: "all", label: "Tudo" },
      { id: "classics", label: "Clássicos de chapa" },
      { id: "stacks", label: "Torres altas" },
      { id: "fiery", label: "Os ardidos" },
      { id: "meatless", label: "Sem carne" },
    ],
    heatAria: "Nível de pimenta",
    addLabel: "Adicionar",
    addedLabel: "Na sacola",
    footnote:
      "Todo burger sai com picles, molho ember e uma pilha de guardanapos que você vai precisar.",
    items: [
      {
        id: "og-smash",
        name: "The OG Smash",
        description:
          "Blend de acém e peito, queijo americano, cebola fatiada, picles e molho ember no pão de batata tostado.",
        price: 32.9,
        category: "classics",
        tag: "Queridinho da casa",
      },
      {
        id: "mustard-baron",
        name: "Mustard Baron",
        description:
          "Carne selada na mostarda, cheddar amarelo, relish de jalapeño na brasa e cebola branca picada.",
        price: 35.9,
        category: "classics",
        heat: 1,
      },
      {
        id: "blue-collar",
        name: "Blue Collar",
        description:
          "Smash com gorgonzola esfarelado, cebola caramelizada e maionese de pimenta-do-reino que não brinca em serviço.",
        price: 38.9,
        category: "classics",
      },
      {
        id: "double-trouble",
        name: "Double Trouble",
        description:
          "Duas carnes, dois queijos americanos, cebola em dobro e montanha de picles. O motivo da nossa chapa nunca dormir.",
        price: 46.9,
        category: "stacks",
      },
      {
        id: "smoke-stack",
        name: "Smoke Stack",
        description:
          "Trio de carnes, cheddar defumado, bacon no melaço, cebola crocante e glaze de churrasco. Vem com aviso.",
        price: 52.9,
        category: "stacks",
        tag: "Novidade",
      },
      {
        id: "el-scorcho",
        name: "El Scorcho",
        description:
          "Geleia de habanero, pepper jack, jalapeños tostados e creme de chipotle. Começa simpático, termina pessoal.",
        price: 40.9,
        category: "fiery",
        heat: 2,
      },
      {
        id: "hellfire-stack",
        name: "Hellfire Stack",
        description:
          "Carne dupla pincelada com glaze de pimenta scorpion, molho de queijo ghost e fresno em conserva. Assine aqui.",
        price: 45.9,
        category: "fiery",
        heat: 3,
      },
      {
        id: "green-machine",
        name: "Green Machine",
        description:
          "Burger de portobello na brasa com feijão-preto, gouda defumado, repolho fatiado e molho green goddess.",
        price: 36.9,
        category: "meatless",
      },
      {
        id: "shroom-boom",
        name: "Shroom Boom",
        description:
          "Torre crocante de cogumelo-ostra, maionese de alho confit, rúcula e cebola roxa em conserva no brioche.",
        price: 38.9,
        category: "meatless",
      },
    ],
  },
  combo: {
    eyebrow: "Laboratório de combo",
    title: "Monte a torre que você merece",
    intro:
      "Comece com fritas e refrigerante com refil, depois tome três decisões barulhentas. O preço atualiza enquanto você discute consigo mesmo.",
    stepBun: "01 — Escolha o pão",
    stepPatty: "02 — Escolha as carnes",
    stepExtras: "03 — Empilhe os extras",
    buns: [
      {
        id: "potato-roll",
        name: "Potato Roll",
        description: "Macio, amanteigado, tostado na chapa.",
        price: 0,
      },
      {
        id: "brioche",
        name: "Butter Brioche",
        description: "Rico, dourado, levemente exibido.",
        price: 3.0,
      },
      {
        id: "charcoal",
        name: "Charcoal Sesame",
        description: "Pão preto de carvão, gergelim tostado, drama completo.",
        price: 5.0,
      },
    ],
    patties: [
      {
        id: "single",
        name: "Single Smash",
        description: "Uma carne de borda rendada. Elegante.",
        price: 0,
      },
      {
        id: "double",
        name: "Double Smash",
        description: "A recomendação da casa. Equilíbrio.",
        price: 9.0,
      },
      {
        id: "triple",
        name: "Triple Smash",
        description: "Engenharia estrutural com carne.",
        price: 16.0,
      },
    ],
    extras: [
      {
        id: "cheese",
        name: "Queijo americano",
        description: "Derrete como quem tem algo a provar.",
        price: 4.0,
      },
      {
        id: "bacon",
        name: "Bacon no melaço",
        description: "Corte grosso, caramelizado na brasa.",
        price: 7.0,
      },
      {
        id: "onions",
        name: "Cebola crocante",
        description: "Frita até estalar.",
        price: 3.5,
      },
      {
        id: "egg",
        name: "Ovo de gema mole",
        description: "A gema vira molho. Confia.",
        price: 4.5,
      },
      {
        id: "pickles",
        name: "Pilha de picles",
        description: "Conserva da casa, em quantidade irracional.",
        price: 2.5,
      },
      {
        id: "sauce",
        name: "Molho ember extra",
        description: "A garrafa fica na cozinha. Foi mal.",
        price: 2.0,
      },
    ],
    includedLabel: "Incluso",
    baseLabel: "Combo base",
    baseNote:
      "Fritas onduladas + refrigerante com refil inclusos em toda montagem.",
    basePrice: 39.9,
    totalLabel: "Sua montagem",
    summaryLabel: "Empilhando agora",
    extrasEmpty: "Sem extras por enquanto",
    addLabel: "Adicionar combo ao pedido",
    addedLabel: "Combo na sacola",
    comboName: "Combo Ember personalizado",
    resetLabel: "Começar de novo",
    imageAlt: "Combo de cheeseburger com fritas na bandeja de metal",
  },
  sides: {
    eyebrow: "O elenco de apoio",
    title: "Acompanhamentos & shakes",
    intro:
      "Fritas saindo da fritadeira em 90 segundos e shakes batidos na hora com o soft que a gente produz toda manhã.",
    sidesLabel: "Da fritadeira",
    shakesLabel: "Da batedeira",
    friesAlt: "Fritas onduladas com sal grosso",
    shakeAlt: "Milkshake cremoso com chantilly",
    addLabel: "Adicionar",
    addedLabel: "Adicionado",
    sides: [
      {
        id: "crinkle",
        name: "Montanha Ondulada",
        description: "Sal marinho, com casca, projetada para raspar molho.",
        price: 13.9,
      },
      {
        id: "cheese-rain",
        name: "Fritas Chove Queijo",
        description: "Queijo de cerveja derramado na mesa, farofa de bacon.",
        price: 18.9,
      },
      {
        id: "ring-tower",
        name: "Torre de Onion Rings",
        description: "Oito anéis empanados na cerveja com maionese de picles.",
        price: 16.9,
      },
      {
        id: "pickle-chips",
        name: "Chips de Picles",
        description: "Picles empanados no fubá, ranch do lado.",
        price: 14.9,
      },
    ],
    shakes: [
      {
        id: "vanilla-malt",
        name: "Malte de Baunilha",
        description: "Malte em dobro, à moda antiga, sem atalho.",
        price: 18.9,
      },
      {
        id: "burnt-caramel",
        name: "Caramelo Queimado",
        description: "Caramelo levado longe demais, de propósito.",
        price: 20.9,
      },
      {
        id: "strawberry-jam",
        name: "Shake de Geleia de Morango",
        description: "Geleia de morango assado misturada no soft.",
        price: 19.9,
      },
      {
        id: "pb-banana",
        name: "Batidão PB Banana",
        description: "Pasta de amendoim, banana caramelizada, farofa de pretzel.",
        price: 21.9,
      },
    ],
  },
  visit: {
    eyebrow: "Siga a fumaça",
    title: "Um quarteirão depois do cheiro de brasa",
    intro:
      "Siga o cheiro de carvão na Vila Madalena. Balcão, quarenta lugares, vinil tocando e uma chapa que dá para ouvir da calçada.",
    addressLabel: "Endereço",
    address: "Rua da Brasa, 214",
    city: "Vila Madalena, São Paulo — SP",
    hoursLabel: "Horários",
    hours: [
      { days: "Segunda a quinta", time: "11h30 — 22h" },
      { days: "Sexta e sábado", time: "11h30 — 00h" },
      { days: "Domingo", time: "12h — 21h" },
    ],
    contactLabel: "Fala com a gente",
    phone: "(11) 95555-0134",
    telHref: "tel:+5511955550134",
    email: "oi@emberandstack.com",
    pickupNote:
      "Peça no balcão ou retire pela janela lateral — sua sacola chega na calçada antes de você.",
    dineAlt: "Smash burger com fritas servido no balcão",
    ctaLabel: "Ligar para o balcão",
  },
  cart: {
    barLabel: "Seu pedido",
    viewLabel: "Ver pedido",
    closeAria: "Fechar painel do pedido",
    itemSingular: "item",
    itemPlural: "itens",
    increaseAria: "Aumentar quantidade de",
    decreaseAria: "Diminuir quantidade de",
    removeAria: "Remover",
    totalLabel: "Total",
    clearLabel: "Limpar tudo",
    checkoutLabel: "Enviar pedido",
    emptyTitle: "Nada na sacola ainda",
    emptyBody: "A chapa está quente e esperando. Vai lá escolher uma torre.",
    emptyCta: "Ver os burgers",
    success: {
      title: "Pedido na chapa",
      body: "Suas carnes já estão sendo prensadas. Fique de ouvido no seu número na janela de retirada.",
      orderLabel: "Pedido",
      totalLabel: "Total do pedido",
      etaLabel: "Pronto em",
      eta: "8 a 12 min",
      again: "Fazer novo pedido",
    },
  },
  footer: {
    blurb:
      "O Ember & Stack é uma hamburgueria smash que nunca aprendeu a sussurrar. Fogo de carvão, pão de batata, molho alto e playlist mais alta ainda.",
    navLabel: "Pela casa",
    socialLabel: "Faça barulho",
    socials: ["@emberandstack", "emberstack.tv", "Fala com a cozinha"],
    legal:
      "Ember & Stack, 2026. Marca fictícia desenhada pela VigApp — nenhuma chapa foi ferida.",
    backToTop: "Voltar ao topo",
  },
};

const es: EmberStackContent = {
  currency: { code: "EUR", locale: "es-ES" },
  header: {
    tagline: "Smash burgers a la brasa desde 2019",
    navAria: "Navegación principal",
    navMenu: "Las burgers",
    navCombo: "Monta tu combo",
    navSides: "Guarniciones",
    navVisit: "Dónde estamos",
    orderCta: "Pide ya",
    cartAria: "Abrir tu pedido",
  },
  hero: {
    stickerTop: "Desde 2019 — Malasaña, Madrid",
    titleLines: ["Aplasta.", "Apila.", "Devora."],
    lede: "Carne prensada sobre una plancha al rojo, bordes de encaje, queso como lava. Ember & Stack es comida ruidosa hecha en serio: brasa de verdad, pan de patata horneado a diario y salsas que nos negamos a explicar.",
    primaryCta: "Ver la carta",
    secondaryCta: "Montar mi combo",
    burgerAlt: "Smash burger doble con queso fundido en pan de patata tostado",
    priceSticker: "Desde 8,90 €",
    chips: ["Prensada al momento", "Brasa de verdad", "Cero congeladores"],
    marquee: [
      "Bordes crujientes",
      "Refill gratis",
      "Abierto hasta tarde",
      "Salsa en todo",
      "Las servilletas corren de nuestra parte",
    ],
    stat: { value: "90 seg", label: "de la plancha a la mesa" },
  },
  menu: {
    eyebrow: "La alineación",
    title: "Burgers que golpean la mesa",
    intro:
      "Nueve torres, cero relleno. Cada carne es 100 % aguja y pecho, prensada a 230 °C y acabada con nuestro glaseado de brasa. Elige un carril o cómete la carta entera.",
    tabsAria: "Filtrar burgers por estilo",
    categories: [
      { id: "all", label: "Todo" },
      { id: "classics", label: "Clásicas de plancha" },
      { id: "stacks", label: "Torres altas" },
      { id: "fiery", label: "Las picantes" },
      { id: "meatless", label: "Sin ternera" },
    ],
    heatAria: "Nivel de picante",
    addLabel: "Añadir",
    addedLabel: "En la bolsa",
    footnote:
      "Cada burger sale con pepinillos, salsa ember y una pila de servilletas que vas a necesitar.",
    items: [
      {
        id: "og-smash",
        name: "The OG Smash",
        description:
          "Carne de aguja y pecho, queso americano, cebolla laminada, pepinillos y salsa ember en pan de patata tostado.",
        price: 8.9,
        category: "classics",
        tag: "La favorita",
      },
      {
        id: "mustard-baron",
        name: "Mustard Baron",
        description:
          "Carne sellada en mostaza, cheddar amarillo, relish de jalapeño a la brasa y cebolla blanca picada.",
        price: 9.8,
        category: "classics",
        heat: 1,
      },
      {
        id: "blue-collar",
        name: "Blue Collar",
        description:
          "Smash con queso azul desmigado, cebolla caramelizada y mayonesa de pimienta negra que va en serio.",
        price: 10.4,
        category: "classics",
      },
      {
        id: "double-trouble",
        name: "Double Trouble",
        description:
          "Dos carnes, dos lonchas de americano, doble de cebolla y montaña de pepinillos. La razón de que la plancha nunca duerma.",
        price: 12.5,
        category: "stacks",
      },
      {
        id: "smoke-stack",
        name: "Smoke Stack",
        description:
          "Triple carne, cheddar ahumado, bacon a la melaza, cebolla crujiente y glaseado barbacoa. Viene con aviso.",
        price: 14.2,
        category: "stacks",
        tag: "Novedad",
      },
      {
        id: "el-scorcho",
        name: "El Scorcho",
        description:
          "Mermelada de habanero, pepper jack, jalapeños tostados y crema de chipotle. Empieza simpática, acaba personal.",
        price: 10.9,
        category: "fiery",
        heat: 2,
      },
      {
        id: "hellfire-stack",
        name: "Hellfire Stack",
        description:
          "Doble carne pintada con glaseado de pimiento scorpion, salsa de queso ghost y chiles fresno encurtidos. Firma aquí.",
        price: 12.2,
        category: "fiery",
        heat: 3,
      },
      {
        id: "green-machine",
        name: "Green Machine",
        description:
          "Portobello a la brasa con alubia negra, gouda ahumado, col laminada y aliño green goddess.",
        price: 9.9,
        category: "meatless",
      },
      {
        id: "shroom-boom",
        name: "Shroom Boom",
        description:
          "Torre crujiente de seta ostra, mayonesa de ajo confitado, rúcula y cebolla roja encurtida en brioche.",
        price: 10.6,
        category: "meatless",
      },
    ],
  },
  combo: {
    eyebrow: "Laboratorio de combos",
    title: "Monta la torre que mereces",
    intro:
      "Empieza con patatas y refresco con refill, y toma tres decisiones ruidosas. El precio se actualiza mientras discutes contigo mismo.",
    stepBun: "01 — Elige tu pan",
    stepPatty: "02 — Elige tus carnes",
    stepExtras: "03 — Apila extras",
    buns: [
      {
        id: "potato-roll",
        name: "Potato Roll",
        description: "Blandito, con mantequilla, tostado en plancha.",
        price: 0,
      },
      {
        id: "brioche",
        name: "Butter Brioche",
        description: "Rico, dorado, un punto presumido.",
        price: 0.8,
      },
      {
        id: "charcoal",
        name: "Charcoal Sesame",
        description: "Pan negro de carbón, sésamo tostado, drama total.",
        price: 1.0,
      },
    ],
    patties: [
      {
        id: "single",
        name: "Single Smash",
        description: "Una carne de borde crujiente. Elegante.",
        price: 0,
      },
      {
        id: "double",
        name: "Double Smash",
        description: "La recomendación de la casa. Equilibrio.",
        price: 2.4,
      },
      {
        id: "triple",
        name: "Triple Smash",
        description: "Ingeniería estructural con carne.",
        price: 4.4,
      },
    ],
    extras: [
      {
        id: "cheese",
        name: "Queso americano",
        description: "Funde como si tuviera algo que demostrar.",
        price: 1.0,
      },
      {
        id: "bacon",
        name: "Bacon a la melaza",
        description: "Corte grueso, caramelizado sobre la brasa.",
        price: 1.8,
      },
      {
        id: "onions",
        name: "Cebolla crujiente",
        description: "Frita hasta que cruje.",
        price: 0.8,
      },
      {
        id: "egg",
        name: "Huevo frito",
        description: "La yema hace de salsa. Confía.",
        price: 1.2,
      },
      {
        id: "pickles",
        name: "Montaña de pepinillos",
        description: "Encurtido de la casa, en cantidad poco razonable.",
        price: 0.5,
      },
      {
        id: "sauce",
        name: "Salsa ember extra",
        description: "La botella se queda en cocina. Lo sentimos.",
        price: 0.5,
      },
    ],
    includedLabel: "Incluido",
    baseLabel: "Combo base",
    baseNote:
      "Patatas onduladas + refresco con refill incluidos en cada montaje.",
    basePrice: 10.9,
    totalLabel: "Tu montaje",
    summaryLabel: "Apilando ahora",
    extrasEmpty: "Sin extras de momento",
    addLabel: "Añadir combo al pedido",
    addedLabel: "Combo en la bolsa",
    comboName: "Combo Ember a medida",
    resetLabel: "Empezar de cero",
    imageAlt: "Combo de cheeseburger con patatas en bandeja metálica",
  },
  sides: {
    eyebrow: "El reparto secundario",
    title: "Guarniciones y batidos",
    intro:
      "Patatas recién salidas de la freidora en 90 segundos y batidos montados al momento con el soft-serve que hacemos cada mañana.",
    sidesLabel: "De la freidora",
    shakesLabel: "De la batidora",
    friesAlt: "Patatas onduladas con sal marina",
    shakeAlt: "Batido cremoso con nata montada",
    addLabel: "Añadir",
    addedLabel: "Añadido",
    sides: [
      {
        id: "crinkle",
        name: "Montaña Ondulada",
        description: "Sal marina, con piel, diseñada para rebañar salsa.",
        price: 3.5,
      },
      {
        id: "cheese-rain",
        name: "Patatas Lluvia de Queso",
        description: "Queso a la cerveza vertido en mesa, polvo de bacon.",
        price: 4.9,
      },
      {
        id: "ring-tower",
        name: "Torre de Aros",
        description: "Ocho aros de cebolla en tempura de cerveza con mayonesa de pepinillo.",
        price: 4.4,
      },
      {
        id: "pickle-chips",
        name: "Chips de Pepinillo",
        description: "Pepinillos rebozados en maíz, ranch aparte.",
        price: 3.9,
      },
    ],
    shakes: [
      {
        id: "vanilla-malt",
        name: "Malta de Vainilla",
        description: "Doble malta, a la antigua, sin atajos.",
        price: 4.9,
      },
      {
        id: "burnt-caramel",
        name: "Caramelo Quemado",
        description: "Caramelo llevado un poco lejos, a propósito.",
        price: 5.4,
      },
      {
        id: "strawberry-jam",
        name: "Batido de Mermelada de Fresa",
        description: "Mermelada de fresa asada plegada en el soft-serve.",
        price: 5.2,
      },
      {
        id: "pb-banana",
        name: "Batidora PB Plátano",
        description: "Crema de cacahuete, plátano caramelizado, crumble de pretzel.",
        price: 5.6,
      },
    ],
  },
  visit: {
    eyebrow: "Sigue el humo",
    title: "Una manzana después del olor a brasa",
    intro:
      "Sigue el olor a carbón por Malasaña. Servicio en barra, cuarenta asientos, vinilos girando y una plancha que se oye desde la acera.",
    addressLabel: "Dirección",
    address: "Calle del Carbón, 27",
    city: "Malasaña, 28004 Madrid",
    hoursLabel: "Horario",
    hours: [
      { days: "Lunes a jueves", time: "11:30 — 22:00" },
      { days: "Viernes y sábado", time: "11:30 — 00:00" },
      { days: "Domingo", time: "12:00 — 21:00" },
    ],
    contactLabel: "Habla con nosotros",
    phone: "+34 915 55 01 22",
    telHref: "tel:+34915550122",
    email: "hola@emberandstack.com",
    pickupNote:
      "Pide en barra o recoge por la ventana lateral: tu bolsa llega a la acera antes que tú.",
    dineAlt: "Smash burger con patatas servida en la barra",
    ctaLabel: "Llamar a barra",
  },
  cart: {
    barLabel: "Tu pedido",
    viewLabel: "Ver pedido",
    closeAria: "Cerrar panel del pedido",
    itemSingular: "artículo",
    itemPlural: "artículos",
    increaseAria: "Aumentar cantidad de",
    decreaseAria: "Reducir cantidad de",
    removeAria: "Quitar",
    totalLabel: "Total",
    clearLabel: "Vaciar todo",
    checkoutLabel: "Enviar pedido",
    emptyTitle: "Nada en la bolsa todavía",
    emptyBody: "La plancha está caliente y esperando. Ve a elegir una torre.",
    emptyCta: "Ver las burgers",
    success: {
      title: "Pedido en plancha",
      body: "Ya estamos prensando tus carnes. Atento a tu número en la ventana de recogida.",
      orderLabel: "Pedido",
      totalLabel: "Total del pedido",
      etaLabel: "Listo en",
      eta: "8 a 12 min",
      again: "Empezar otro pedido",
    },
  },
  footer: {
    blurb:
      "Ember & Stack es una hamburguesería smash que nunca aprendió a susurrar. Fuego de carbón, pan de patata, salsa alta y playlists más altas todavía.",
    navLabel: "Por el local",
    socialLabel: "Haz ruido",
    socials: ["@emberandstack", "emberstack.tv", "Habla con cocina"],
    legal:
      "Ember & Stack, 2026. Marca ficticia diseñada por VigApp: ninguna plancha resultó herida.",
    backToTop: "Volver arriba",
  },
};

export const emberStackDictionary: DemoDictionary<EmberStackContent> = {
  en,
  pt,
  es,
};
