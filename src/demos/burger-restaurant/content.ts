import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Shared, locale-independent data                                      */
/*                                                                      */
/* Garagem Burger is a Brazilian business: dish names are proper nouns  */
/* kept in pt-BR across every locale, and prices are always in R$.      */
/* ------------------------------------------------------------------ */

export type MenuCat = "burgers" | "sides" | "shakes" | "drinks";
export type MenuTag = "spicy" | "veggie" | "top" | "new";

export interface MenuSeed {
  id: string;
  cat: MenuCat;
  /** Dish name — pt-BR proper noun, identical in all locales. */
  name: string;
  /** Price in BRL (always rendered as R$). */
  price: number;
  tags?: MenuTag[];
}

export const MENU: MenuSeed[] = [
  /* Burgers — R$ 29–49 */
  { id: "maluco", cat: "burgers", name: "Maluco Beleza", price: 34, tags: ["top"] },
  { id: "faroeste", cat: "burgers", name: "Faroeste", price: 38 },
  { id: "metal", cat: "burgers", name: "Metal Pesado", price: 42, tags: ["spicy"] },
  { id: "geracao86", cat: "burgers", name: "Geração 86", price: 29 },
  { id: "sinfonia", cat: "burgers", name: "Sinfonia de Garagem", price: 49, tags: ["new"] },
  { id: "planta", cat: "burgers", name: "Planta & Raiz", price: 36, tags: ["veggie"] },

  /* Acompanhamentos */
  { id: "fritas-banca", cat: "sides", name: "Fritas da Banca", price: 18 },
  { id: "fritas-backstage", cat: "sides", name: "Fritas Backstage", price: 26, tags: ["top"] },
  { id: "onion", cat: "sides", name: "Onion Rings Overdrive", price: 22 },
  { id: "dadinho", cat: "sides", name: "Dadinho de Tapioca", price: 24, tags: ["spicy"] },

  /* Milkshakes */
  { id: "paranoico", cat: "shakes", name: "Shake Paranoico", price: 26, tags: ["top"] },
  { id: "balada", cat: "shakes", name: "Balada de Morango", price: 24 },
  { id: "acustico", cat: "shakes", name: "Doce de Leite Acústico", price: 26, tags: ["new"] },
  { id: "underground", cat: "shakes", name: "Vanilla Underground", price: 24 },

  /* Cervejas & drinks */
  { id: "chopp", cat: "drinks", name: "Chopp Pilsen da Casa", price: 14, tags: ["top"] },
  { id: "ipa", cat: "drinks", name: "IPA Solo de Guitarra", price: 22 },
  { id: "apa", cat: "drinks", name: "APA Riff Tropical", price: 20, tags: ["new"] },
  { id: "caipirinha", cat: "drinks", name: "Caipirinha da Garagem", price: 22 },
  { id: "mule", cat: "drinks", name: "Mule de Cobre", price: 28 },
  { id: "guarana", cat: "drinks", name: "Guaraná Retrô", price: 9 },
];

export interface ComboSeed {
  id: string;
  /** Combo name — pt-BR proper noun. */
  name: string;
  price: number;
}

export const COMBOS: ComboSeed[] = [
  { id: "banda", name: "Combo Banda", price: 99 },
  { id: "roadie", name: "Combo Roadie", price: 64 },
];

export interface ShowSeed {
  id: "fri" | "sat" | "sun";
  /** Fictional cover band — proper noun kept in pt-BR. */
  band: string;
}

export const SHOWS: ShowSeed[] = [
  { id: "fri", band: "Os Imprudentes" },
  { id: "sat", band: "Turbina 91" },
  { id: "sun", band: "Trio Voltagem" },
];

export interface PhotoSeed {
  id: string;
  src: string;
  /** Polaroid rotation in degrees. */
  rotate: number;
}

export const CASA_PHOTOS: PhotoSeed[] = [
  {
    id: "salao",
    src: "https://images.unsplash.com/photo-1564019709518-6182bdabe251?q=80&w=1600&auto=format&fit=crop",
    rotate: -2.5,
  },
  {
    id: "balcao",
    src: "https://images.unsplash.com/photo-1770629681079-86c4d2adb83f?q=80&w=1600&auto=format&fit=crop",
    rotate: 1.8,
  },
  {
    id: "chapa",
    src: "https://images.unsplash.com/photo-1554306297-0c86e837d24b?q=80&w=1600&auto=format&fit=crop",
    rotate: -1.4,
  },
  {
    id: "palco",
    src: "https://images.unsplash.com/photo-1566808907623-51b8fc382454?q=80&w=1600&auto=format&fit=crop",
    rotate: 2.2,
  },
  {
    id: "chope",
    src: "https://images.unsplash.com/photo-1584225065152-4a1454aa3d4e?q=80&w=1600&auto=format&fit=crop",
    rotate: -2,
  },
  {
    id: "mesa",
    src: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=1600&auto=format&fit=crop",
    rotate: 1.5,
  },
];

/* Fictional Brazilian contact data (identical in every locale). */
export const WHATSAPP_NUMBER = "5519991312016";
export const WHATSAPP_DISPLAY = "(19) 99131-2016";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const INSTAGRAM_HANDLE = "@garagemburger";
export const ADDRESS_LINE = "R. Coronel Quirino, 1312";
export const ADDRESS_AREA = "Cambuí · Campinas/SP · CEP 13025-002";
export const MAP_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=-47.0662%2C-22.9084%2C-47.0416%2C-22.8886&layer=mapnik&marker=-22.8985%2C-47.0539";
export const MAP_LINK_URL =
  "https://www.openstreetmap.org/?mlat=-22.8985&mlon=-47.0539#map=16/-22.8985/-47.0539";

/* Sketchfab guitar (hero centerpiece). */
export const GUITAR_UID = "daeadd913644438aa3096bb357a02016";
export const GUITAR_THUMB =
  "https://media.sketchfab.com/models/daeadd913644438aa3096bb357a02016/thumbnails/a6e8e24887114ebf98b6c1e261e400a2/f34abfce4cb74ad1b022462436f794cf.jpeg";
export const GUITAR_CREDIT = { model: "Ibanez JEM Guitar", author: "abazibiz" };

/* ------------------------------------------------------------------ */
/* Content shape                                                        */
/* ------------------------------------------------------------------ */

export interface GaragemContent {
  header: {
    nav: { href: string; label: string }[];
    cta: string;
    openMenu: string;
    closeMenu: string;
    navAria: string;
  };
  hero: {
    badge: string;
    titleA: string;
    titleB: string;
    titleC: string;
    subtitle: string;
    ctaMenu: string;
    ctaReserve: string;
    marquee: string[];
    stageTag: string;
    guitarCaption: string;
    guitarTitle: string;
    loadLabel: string;
    hint: string;
  };
  menu: {
    label: string;
    title: string;
    intro: string;
    searchPlaceholder: string;
    searchAria: string;
    clearSearch: string;
    empty: string;
    resultsFor: string;
    cats: { id: MenuCat; label: string }[];
    tagLabels: Record<MenuTag, string>;
    descriptions: Record<string, string>;
    combosLabel: string;
    comboDescs: Record<string, string>;
    comboTag: string;
    priceNote: string;
  };
  casa: {
    label: string;
    title: string;
    body1: string;
    body2: string;
    stats: { value: string; label: string }[];
    captions: Record<string, string>;
    alts: Record<string, string>;
  };
  shows: {
    label: string;
    title: string;
    intro: string;
    couvert: string;
    note: string;
    liveTag: string;
    items: { id: ShowSeed["id"]; day: string; dayShort: string; time: string; genre: string }[];
  };
  visit: {
    label: string;
    title: string;
    addressLabel: string;
    hoursLabel: string;
    contactLabel: string;
    hours: { days: string; time: string }[];
    closedNote: string;
    whatsappCta: string;
    mapTitle: string;
    openMap: string;
  };
  footer: {
    tagline: string;
    fictional: string;
    location: string;
  };
}

/* ------------------------------------------------------------------ */
/* Dictionaries — pt-BR is the native voice; en is the fallback locale  */
/* ------------------------------------------------------------------ */

const en: GaragemContent = {
  header: {
    nav: [
      { href: "cardapio", label: "Menu" },
      { href: "a-casa", label: "The House" },
      { href: "shows", label: "Live Music" },
      { href: "como-chegar", label: "Getting Here" },
    ],
    cta: "Order on WhatsApp",
    openMenu: "Open navigation",
    closeMenu: "Close navigation",
    navAria: "Main navigation",
  },
  hero: {
    badge: "Cambuí · Campinas/SP · since 2016",
    titleA: "Smash,",
    titleB: "riffs &",
    titleC: "ice-cold beer",
    subtitle:
      "A burger joint and rock bar in the heart of Cambuí. Smash patties hitting the griddle, guitars hitting the stage and draft beer so cold it hurts — loud, greasy and proud since 2016.",
    ctaMenu: "See the menu",
    ctaReserve: "Book a table",
    marquee: ["Smash", "Rock'n'roll", "Ice-cold beer", "Campinas"],
    stageTag: "On stage",
    guitarCaption:
      "The house relic: the superstrat that hangs over our stage. Spin it around — it earned every scratch.",
    guitarTitle: "The house guitar in 3D",
    loadLabel: "View in 3D",
    hint: "Drag to orbit · scroll to zoom",
  },
  menu: {
    label: "The menu",
    title: "House board",
    intro:
      "Patties smashed on the griddle until the crust sings, buns baked in-house and seared in butter, sauces made from scratch. Everything doubles if you ask.",
    searchPlaceholder: "Search the menu…",
    searchAria: "Search dishes and drinks",
    clearSearch: "Clear search",
    empty: "Nothing here. Try another name — or just order the Maluco Beleza, it never misses.",
    resultsFor: "results for",
    cats: [
      { id: "burgers", label: "Burgers" },
      { id: "sides", label: "Sides" },
      { id: "shakes", label: "Milkshakes" },
      { id: "drinks", label: "Beers & Drinks" },
    ],
    tagLabels: { spicy: "spicy", veggie: "veggie", top: "crowd favorite", new: "new" },
    descriptions: {
      maluco:
        "Double smash, melted prato cheese, onions caramelized in dark beer and house mayo on a buttered brioche.",
      faroeste:
        "160g patty cooked to order, aged cheddar, crispy bacon and smoky bourbon barbecue. Best eaten with your hat on.",
      metal:
        "Double smash, creamy gorgonzola, bacon cubes, crispy onions and smoked-pepper jam. Heavy in the best way.",
      geracao86:
        "The childhood classic: prato cheese, iceberg lettuce, tomato, pickles and Garagem's secret sauce.",
      sinfonia:
        "Triple smash, three cheeses — prato, cheddar and smoked mozzarella — confit tomato and roasted-garlic aioli.",
      planta: "Chickpea-and-mushroom patty, plant-based cheese, arugula, tomato and vegan herb mayo.",
      "fritas-banca": "Rustic and crunchy, tossed with smoked paprika and fried rosemary. A generous basket.",
      "fritas-backstage": "Loaded with creamy cheddar, bacon and spring onion. Your backstage pass.",
      onion: "Onion rings battered in stout, served with house barbecue.",
      dadinho: "Tapioca-and-coalho-cheese cubes with our spicy pepper jam.",
      paranoico: "Dark chocolate blended with crunchy malt flakes, topped with whipped cream.",
      balada: "Fresh strawberries, condensed milk and whipped cream. Sweet as a good chorus.",
      acustico: "Minas-style dulce de leche with fleur de sel and a cashew crumble.",
      underground: "Vanilla with coffee syrup and cocoa crumble.",
      chopp: "Freezing cold, two fingers of foam, tapped to order. 300ml.",
      ipa: "Local craft, high bitterness, citrus aroma. 473ml can.",
      apa: "Passion fruit and aromatic hops, brewed with a Campinas craft brewery. 473ml.",
      caipirinha: "Artisanal cachaça, muddled Tahiti lime and demerara sugar.",
      mule: "Vodka, ginger foam and lime, served in the copper mug.",
      guarana: "In the little glass bottle, ice-cold out of the cooler — newsstand style.",
    },
    combosLabel: "Combos to share",
    comboDescs: {
      banda: "2 house burgers + large fries + 2 long necks. Built for splitting the stage.",
      roadie: "1 burger + Fritas da Banca + milkshake or draft beer. Fuel for the whole gig.",
    },
    comboTag: "Combo",
    priceNote: "Prices in Brazilian reais (R$) · music cover charged separately on show nights",
  },
  casa: {
    label: "The house",
    title: "A corner garage turned rock bar",
    body1:
      "The dining room fills a corner warehouse in Cambuí: 120 seats spread between the counter, red leatherette booths and a mezzanine that looks straight down at the stage.",
    body2:
      "From Friday to Sunday there's a live band, 12 taps of craft beer from the region and the griddle working in plain sight. Bring the family — or the whole band.",
    stats: [
      { value: "120", label: "seats in the room" },
      { value: "12", label: "craft beer taps" },
      { value: "3x", label: "live shows a week" },
    ],
    captions: {
      salao: "The room and the red neon",
      balcao: "Checkered floor, spinning stools",
      chapa: "Smash on the griddle, crust on point",
      palco: "Friday night: band on stage",
      chope: "Craft beer tapped to order",
      mesa: "On the table: burger, fries, friends",
    },
    alts: {
      salao: "Retro burger bar interior glowing with red neon signs",
      balcao: "Diner counter with checkered floor and neon lights",
      chapa: "Smash burger patty sizzling on a hot griddle",
      palco: "Rock band playing live on a small bar stage",
      chope: "Bartender pouring craft beer from a tap",
      mesa: "Burger and fries served with beer on a table",
    },
  },
  shows: {
    label: "Live music",
    title: "This week on stage",
    intro: "Cover bands, loud amps and the counter shaking. Come early — the front tables go fast.",
    couvert: "Cover R$ 15",
    note: "No tickets needed: pay the cover at the door and you're in. Tables by the stage are first come, first served.",
    liveTag: "Live",
    items: [
      { id: "fri", day: "Friday", dayShort: "FRI", time: "9 pm", genre: "'80s Brazilian rock covers" },
      { id: "sat", day: "Saturday", dayShort: "SAT", time: "9:30 pm", genre: "'90s rock and grunge" },
      { id: "sun", day: "Sunday", dayShort: "SUN", time: "6 pm", genre: "Acoustic Brazilian classics" },
    ],
  },
  visit: {
    label: "Getting here",
    title: "Find the garage",
    addressLabel: "Address",
    hoursLabel: "Opening hours",
    contactLabel: "Contact",
    hours: [
      { days: "Tue – Thu", time: "6 pm – 11 pm" },
      { days: "Fri – Sat", time: "6 pm – 1 am" },
      { days: "Sun", time: "12 pm – 10 pm" },
    ],
    closedNote: "Monday is rehearsal day — we're closed.",
    whatsappCta: "Order on WhatsApp",
    mapTitle: "Map — Garagem Burger in Cambuí, Campinas",
    openMap: "Open the map",
  },
  footer: {
    tagline: "Smash, riffs and ice-cold beer since 2016.",
    fictional: "Garagem Burger is a fictional concept created by VigApp.",
    location: "Cambuí · Campinas/SP · Brasil",
  },
};

const pt: GaragemContent = {
  header: {
    nav: [
      { href: "cardapio", label: "Cardápio" },
      { href: "a-casa", label: "A Casa" },
      { href: "shows", label: "Shows" },
      { href: "como-chegar", label: "Como Chegar" },
    ],
    cta: "Pedir no WhatsApp",
    openMenu: "Abrir menu de navegação",
    closeMenu: "Fechar menu de navegação",
    navAria: "Navegação principal",
  },
  hero: {
    badge: "Cambuí · Campinas/SP · desde 2016",
    titleA: "Smash,",
    titleB: "riffs &",
    titleC: "cerveja gelada",
    subtitle:
      "Hamburgueria e rock bar no coração do Cambuí. Smash estalando na chapa, guitarra no palco e chope trincando de gelado — barulhento, gorduroso e orgulhoso disso desde 2016.",
    ctaMenu: "Ver cardápio",
    ctaReserve: "Reservar mesa",
    marquee: ["Smash", "Rock'n'roll", "Cerveja gelada", "Campinas"],
    stageTag: "No palco",
    guitarCaption:
      "A relíquia da casa: a superstrat pendurada em cima do palco. Pode girar à vontade — cada arranhão foi merecido.",
    guitarTitle: "A guitarra da casa em 3D",
    loadLabel: "Ver em 3D",
    hint: "Arraste para girar · scroll dá zoom",
  },
  menu: {
    label: "O cardápio",
    title: "Quadro da casa",
    intro:
      "Blend prensado na chapa até a casquinha cantar, pão de fermentação própria selado na manteiga e molhos feitos aqui dentro. Tudo sai em dobro se você pedir.",
    searchPlaceholder: "Buscar no cardápio…",
    searchAria: "Buscar pratos e bebidas",
    clearSearch: "Limpar busca",
    empty: "Nada por aqui. Tenta outro nome — ou pede o Maluco Beleza, que não tem erro.",
    resultsFor: "resultados para",
    cats: [
      { id: "burgers", label: "Burgers" },
      { id: "sides", label: "Acompanhamentos" },
      { id: "shakes", label: "Milkshakes" },
      { id: "drinks", label: "Cervejas & Drinks" },
    ],
    tagLabels: { spicy: "picante", veggie: "veggie", top: "mais pedido", new: "novo" },
    descriptions: {
      maluco:
        "Smash duplo, queijo prato derretido, cebola caramelizada na cerveja preta e maionese da casa no brioche na manteiga.",
      faroeste:
        "160g no ponto, cheddar maturado, bacon crocante e barbecue de bourbon defumado. Pra comer de chapéu.",
      metal:
        "Smash duplo, gorgonzola cremoso, bacon em cubos, cebola crispy e geleia de pimenta defumada. Pesado no bom sentido.",
      geracao86:
        "O clássico de infância: queijo prato, alface americana, tomate, picles e o molho secreto da Garagem.",
      sinfonia:
        "Smash triplo, três queijos — prato, cheddar e muçarela defumada —, tomate confit e aioli de alho assado.",
      planta: "Burger de grão-de-bico com cogumelos, queijo vegetal, rúcula, tomate e maionese vegana de ervas.",
      "fritas-banca": "Rústicas e crocantes, com páprica defumada e alecrim frito. Porção generosa.",
      "fritas-backstage": "Cobertas de cheddar cremoso, bacon e cebolinha. Seu passe pros bastidores.",
      onion: "Anéis de cebola empanados na cerveja preta, com barbecue da casa.",
      dadinho: "Cubos de tapioca com queijo coalho e a nossa geleia de pimenta.",
      paranoico: "Chocolate meio amargo batido com flocos crocantes de malte e chantilly.",
      balada: "Morango fresco, leite condensado e chantilly. Doce na medida do refrão.",
      acustico: "Doce de leite mineiro com flor de sal e farofinha de castanha de caju.",
      underground: "Baunilha com calda de café e crumble de cacau.",
      chopp: "Trincando de gelado, dois dedos de colarinho, tirado na hora. 300ml.",
      ipa: "Artesanal daqui da região, amargor alto e aroma cítrico. Lata 473ml.",
      apa: "Maracujá e lúpulo aromático, parceria com cervejaria de Campinas. 473ml.",
      caipirinha: "Cachaça artesanal, limão taiti macerado e açúcar demerara.",
      mule: "Vodka, espuma de gengibre e limão, servido na caneca de cobre.",
      guarana: "Na garrafinha de vidro, gelado no isopor — estilo banca de jornal.",
    },
    combosLabel: "Combos pra dividir",
    comboDescs: {
      banda: "2 burgers da casa + fritas grande + 2 long necks. Feito pra dividir o palco.",
      roadie: "1 burger + Fritas da Banca + milkshake ou chopp. Combustível pro show inteiro.",
    },
    comboTag: "Combo",
    priceNote: "Preços em reais (R$) · couvert artístico à parte nas noites de show",
  },
  casa: {
    label: "A casa",
    title: "Uma garagem de esquina virada rock bar",
    body1:
      "O salão ocupa um galpão de esquina no Cambuí: 120 lugares entre o balcão, os boxes de courino vermelho e o mezanino que dá de frente pro palco.",
    body2:
      "De sexta a domingo tem banda ao vivo, 12 torneiras de chope artesanal da região e a chapa trabalhando à vista de todo mundo. Traz a família — ou a banda inteira.",
    stats: [
      { value: "120", label: "lugares no salão" },
      { value: "12", label: "torneiras de chope" },
      { value: "3x", label: "shows por semana" },
    ],
    captions: {
      salao: "O salão e o neon vermelho",
      balcao: "Piso xadrez, banqueta giratória",
      chapa: "Smash na chapa, casquinha no ponto",
      palco: "Sexta à noite: banda no palco",
      chope: "Chope artesanal tirado na hora",
      mesa: "Na mesa: burger, fritas e os amigos",
    },
    alts: {
      salao: "Interior de hamburgueria retrô iluminado por letreiros neon vermelhos",
      balcao: "Balcão de lanchonete com piso xadrez e luzes neon",
      chapa: "Burger smash chiando na chapa quente",
      palco: "Banda de rock tocando ao vivo no palco pequeno do bar",
      chope: "Bartender tirando chope artesanal na torneira",
      mesa: "Burger com fritas e cerveja servidos na mesa",
    },
  },
  shows: {
    label: "Música ao vivo",
    title: "A semana no palco",
    intro: "Bandas de cover, amplificador no talo e o balcão tremendo. Chega cedo — as mesas da frente voam.",
    couvert: "Couvert R$ 15",
    note: "Não precisa de ingresso: pagou o couvert na porta, entrou. Mesa perto do palco é por ordem de chegada.",
    liveTag: "Ao vivo",
    items: [
      { id: "fri", day: "Sexta", dayShort: "SEX", time: "21h", genre: "Covers de rock nacional anos 80" },
      { id: "sat", day: "Sábado", dayShort: "SÁB", time: "21h30", genre: "Rock e grunge dos anos 90" },
      { id: "sun", day: "Domingo", dayShort: "DOM", time: "18h", genre: "Clássicos brasileiros em versão acústica" },
    ],
  },
  visit: {
    label: "Como chegar",
    title: "Acha a garagem",
    addressLabel: "Endereço",
    hoursLabel: "Horários",
    contactLabel: "Contato",
    hours: [
      { days: "ter – qui", time: "18h – 23h" },
      { days: "sex – sáb", time: "18h – 01h" },
      { days: "dom", time: "12h – 22h" },
    ],
    closedNote: "Segunda é dia de ensaio — a gente fecha.",
    whatsappCta: "Pedir no WhatsApp",
    mapTitle: "Mapa — Garagem Burger no Cambuí, Campinas",
    openMap: "Abrir no mapa",
  },
  footer: {
    tagline: "Smash, riffs e cerveja gelada desde 2016.",
    fictional: "Garagem Burger é um conceito fictício criado pela VigApp.",
    location: "Cambuí · Campinas/SP · Brasil",
  },
};

const es: GaragemContent = {
  header: {
    nav: [
      { href: "cardapio", label: "Carta" },
      { href: "a-casa", label: "La Casa" },
      { href: "shows", label: "Shows" },
      { href: "como-chegar", label: "Cómo Llegar" },
    ],
    cta: "Pedir por WhatsApp",
    openMenu: "Abrir menú de navegación",
    closeMenu: "Cerrar menú de navegación",
    navAria: "Navegación principal",
  },
  hero: {
    badge: "Cambuí · Campinas/SP · desde 2016",
    titleA: "Smash,",
    titleB: "riffs &",
    titleC: "cerveza helada",
    subtitle:
      "Hamburguesería y rock bar en el corazón de Cambuí, Campinas. Smash crepitando en la plancha, guitarras en el escenario y chope helado hasta doler — ruidosos y orgullosos desde 2016.",
    ctaMenu: "Ver la carta",
    ctaReserve: "Reservar mesa",
    marquee: ["Smash", "Rock'n'roll", "Cerveza helada", "Campinas"],
    stageTag: "En el escenario",
    guitarCaption:
      "La reliquia de la casa: la superstrat que cuelga sobre el escenario. Gírala tranquilo — cada rayón fue merecido.",
    guitarTitle: "La guitarra de la casa en 3D",
    loadLabel: "Ver en 3D",
    hint: "Arrastra para girar · scroll para zoom",
  },
  menu: {
    label: "La carta",
    title: "Pizarra de la casa",
    intro:
      "Carne prensada en la plancha hasta que la costra cante, pan de fermentación propia sellado en mantequilla y salsas hechas en casa. Todo sale doble si lo pides.",
    searchPlaceholder: "Buscar en la carta…",
    searchAria: "Buscar platos y bebidas",
    clearSearch: "Limpiar búsqueda",
    empty: "Nada por aquí. Prueba otro nombre — o pide el Maluco Beleza, que nunca falla.",
    resultsFor: "resultados para",
    cats: [
      { id: "burgers", label: "Burgers" },
      { id: "sides", label: "Guarniciones" },
      { id: "shakes", label: "Milkshakes" },
      { id: "drinks", label: "Cervezas & Drinks" },
    ],
    tagLabels: { spicy: "picante", veggie: "veggie", top: "más pedido", new: "nuevo" },
    descriptions: {
      maluco:
        "Doble smash, queso prato fundido, cebolla caramelizada en cerveza negra y mayonesa de la casa en brioche con mantequilla.",
      faroeste:
        "160g al punto, cheddar madurado, bacon crocante y barbecue de bourbon ahumado. Para comer con sombrero.",
      metal:
        "Doble smash, gorgonzola cremoso, bacon en cubos, cebolla crispy y mermelada de ají ahumado. Pesado, en el buen sentido.",
      geracao86:
        "El clásico de la infancia: queso prato, lechuga americana, tomate, pepinillos y la salsa secreta de Garagem.",
      sinfonia:
        "Triple smash, tres quesos — prato, cheddar y mozzarella ahumada —, tomate confitado y alioli de ajo asado.",
      planta: "Medallón de garbanzos y hongos, queso vegetal, rúcula, tomate y mayonesa vegana de hierbas.",
      "fritas-banca": "Rústicas y crocantes, con pimentón ahumado y romero frito. Porción generosa.",
      "fritas-backstage": "Cubiertas de cheddar cremoso, bacon y cebollín. Tu pase al backstage.",
      onion: "Aros de cebolla rebozados en cerveza negra, con barbecue de la casa.",
      dadinho: "Cubos de tapioca con queso coalho y nuestra mermelada de ají.",
      paranoico: "Chocolate semiamargo batido con hojuelas crocantes de malta y crema chantilly.",
      balada: "Fresas frescas, leche condensada y chantilly. Dulce como un buen estribillo.",
      acustico: "Dulce de leche de Minas con flor de sal y crumble de castañas de cajú.",
      underground: "Vainilla con sirope de café y crumble de cacao.",
      chopp: "Helado al límite, dos dedos de espuma, tirado al momento. 300ml.",
      ipa: "Artesanal de la región, amargor alto y aroma cítrico. Lata 473ml.",
      apa: "Maracuyá y lúpulo aromático, en alianza con una cervecería de Campinas. 473ml.",
      caipirinha: "Cachaça artesanal, lima tahití macerada y azúcar demerara.",
      mule: "Vodka, espuma de jengibre y lima, servido en jarra de cobre.",
      guarana: "En botellita de vidrio, helada en la conservadora — estilo kiosco.",
    },
    combosLabel: "Combos para compartir",
    comboDescs: {
      banda: "2 burgers de la casa + papas grandes + 2 long necks. Hecho para compartir el escenario.",
      roadie: "1 burger + Fritas da Banca + milkshake o chope. Combustible para todo el show.",
    },
    comboTag: "Combo",
    priceNote: "Precios en reales brasileños (R$) · cover artístico aparte en noches de show",
  },
  casa: {
    label: "La casa",
    title: "Un garaje de esquina vuelto rock bar",
    body1:
      "El salón ocupa un galpón de esquina en Cambuí: 120 lugares entre la barra, los boxes de cuerina roja y el entrepiso que mira directo al escenario.",
    body2:
      "De viernes a domingo hay banda en vivo, 12 canillas de cerveza artesanal de la región y la plancha trabajando a la vista de todos. Trae a la familia — o a la banda entera.",
    stats: [
      { value: "120", label: "lugares en el salón" },
      { value: "12", label: "canillas de cerveza" },
      { value: "3x", label: "shows por semana" },
    ],
    captions: {
      salao: "El salón y el neón rojo",
      balcao: "Piso a cuadros, banqueta giratoria",
      chapa: "Smash en la plancha, costra al punto",
      palco: "Viernes por la noche: banda en escena",
      chope: "Cerveza artesanal tirada al momento",
      mesa: "En la mesa: burger, papas y amigos",
    },
    alts: {
      salao: "Interior de hamburguesería retro iluminado por letreros de neón rojo",
      balcao: "Barra de cafetería con piso a cuadros y luces de neón",
      chapa: "Hamburguesa smash chisporroteando en la plancha caliente",
      palco: "Banda de rock tocando en vivo en el pequeño escenario del bar",
      chope: "Bartender tirando cerveza artesanal de la canilla",
      mesa: "Hamburguesa con papas y cerveza servidas en la mesa",
    },
  },
  shows: {
    label: "Música en vivo",
    title: "La semana en el escenario",
    intro:
      "Bandas de covers, amplificadores al máximo y la barra temblando. Llega temprano — las mesas del frente vuelan.",
    couvert: "Cover R$ 15",
    note: "No hace falta entrada: pagas el cover en la puerta y entras. Las mesas junto al escenario son por orden de llegada.",
    liveTag: "En vivo",
    items: [
      { id: "fri", day: "Viernes", dayShort: "VIE", time: "21h", genre: "Covers de rock brasileño de los 80" },
      { id: "sat", day: "Sábado", dayShort: "SÁB", time: "21h30", genre: "Rock y grunge de los 90" },
      { id: "sun", day: "Domingo", dayShort: "DOM", time: "18h", genre: "Clásicos brasileños en versión acústica" },
    ],
  },
  visit: {
    label: "Cómo llegar",
    title: "Encuentra el garaje",
    addressLabel: "Dirección",
    hoursLabel: "Horarios",
    contactLabel: "Contacto",
    hours: [
      { days: "mar – jue", time: "18h – 23h" },
      { days: "vie – sáb", time: "18h – 01h" },
      { days: "dom", time: "12h – 22h" },
    ],
    closedNote: "El lunes es día de ensayo — cerramos.",
    whatsappCta: "Pedir por WhatsApp",
    mapTitle: "Mapa — Garagem Burger en Cambuí, Campinas",
    openMap: "Abrir en el mapa",
  },
  footer: {
    tagline: "Smash, riffs y cerveza helada desde 2016.",
    fictional: "Garagem Burger es un concepto ficticio creado por VigApp.",
    location: "Cambuí · Campinas/SP · Brasil",
  },
};

export const garagemDict: DemoDictionary<GaragemContent> = { en, pt, es };
