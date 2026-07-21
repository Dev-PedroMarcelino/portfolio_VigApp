import type { DemoDictionary } from "@/demos/content";

export type CuisineId = "pizza" | "burgers" | "healthy" | "brunch" | "dessert";
export type FilterId = "all" | CuisineId;
export type ImageKey =
  | "pizza"
  | "burger"
  | "poke"
  | "pancakes"
  | "salad"
  | "veg"
  | "dessert";

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: ImageKey;
  popular?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: CuisineId;
  cuisineLabel: string;
  image: ImageKey;
  rating: number;
  reviews: number;
  eta: string;
  fee: number;
  distance: string;
  blurb: string;
  tags: string[];
  dishes: Dish[];
}

export interface TrackingStage {
  id: string;
  label: string;
  note: string;
  time: string;
}

export interface PratoContent {
  currency: { code: string; locale: string };
  header: {
    deliverTo: string;
    address: string;
    navAria: string;
    nav: { href: string; label: string }[];
    orderCta: string;
    cartAria: string;
  };
  hero: {
    badge: string;
    titleLines: string[];
    lede: string;
    searchLabel: string;
    searchPlaceholder: string;
    searchValue: string;
    searchButton: string;
    cuisineTitle: string;
    chips: { id: FilterId; label: string }[];
    stats: { value: string; label: string }[];
    heroImageAlt: string;
    liveBadge: string;
    liveNote: string;
  };
  restaurants: {
    eyebrow: string;
    title: string;
    intro: string;
    filterAria: string;
    filters: { id: FilterId; label: string }[];
    ratingAria: string;
    reviewsLabel: string;
    etaLabel: string;
    feeLabel: string;
    freeLabel: string;
    viewMenu: string;
    emptyLabel: string;
    items: Restaurant[];
  };
  menu: {
    eyebrow: string;
    backLabel: string;
    dishesTitle: string;
    popularLabel: string;
    addLabel: string;
    addedLabel: string;
    addAria: string;
    ratingAria: string;
    etaLabel: string;
    feeLabel: string;
    freeLabel: string;
    minLabel: string;
    minOrder: number;
    dishImageAlt: string;
  };
  cart: {
    title: string;
    fromLabel: string;
    closeAria: string;
    empty: string;
    emptyNote: string;
    emptyCta: string;
    qtyIncAria: string;
    qtyDecAria: string;
    removeAria: string;
    subtotal: string;
    deliveryFee: string;
    serviceFee: string;
    serviceFeeValue: number;
    freeLabel: string;
    total: string;
    etaLabel: string;
    checkout: string;
    addMore: string;
    clearLabel: string;
    minWarning: string;
    minOrder: number;
  };
  checkout: {
    placedTitle: string;
    placedNote: string;
    orderNumberLabel: string;
    orderNumber: string;
    trackCta: string;
    closeAria: string;
    summaryLabel: string;
    totalLabel: string;
  };
  tracking: {
    eyebrow: string;
    title: string;
    intro: string;
    liveLabel: string;
    orderIdLabel: string;
    orderId: string;
    etaLabel: string;
    stages: TrackingStage[];
    courierName: string;
    courierRole: string;
    courierRatingAria: string;
    courierRating: number;
    mapAria: string;
    playLabel: string;
    pauseLabel: string;
    nextLabel: string;
    backLabel: string;
    resetLabel: string;
    deliveredTitle: string;
    deliveredNote: string;
    rateLabel: string;
    rateAria: string;
  };
  courier: {
    eyebrow: string;
    title: string;
    intro: string;
    cards: { title: string; body: string; stat: string; statLabel: string }[];
    cta: string;
  };
  footer: {
    tagline: string;
    columns: { title: string; links: string[] }[];
    appTitle: string;
    appNote: string;
    appIos: string;
    appAndroid: string;
    socialAria: string;
    social: { icon: string; label: string }[];
    legal: string;
    madeWith: string;
  };
}

const en: PratoContent = {
  currency: { code: "USD", locale: "en-US" },
  header: {
    deliverTo: "Deliver to",
    address: "540 Valencia St, San Francisco",
    navAria: "Prato sections",
    nav: [
      { href: "#restaurants", label: "Restaurants" },
      { href: "#menu", label: "Menu" },
      { href: "#tracking", label: "Track order" },
      { href: "#partners", label: "Become a courier" },
    ],
    orderCta: "Order now",
    cartAria: "Open your cart",
  },
  hero: {
    badge: "Groceries, meals and more in 30 minutes",
    titleLines: ["Your city,", "delivered warm."],
    lede: "Prato brings the best kitchens near you to your door. Live tracking, honest fees and couriers who actually care about your food.",
    searchLabel: "Delivery address",
    searchPlaceholder: "Enter your street and number",
    searchValue: "540 Valencia St, San Francisco",
    searchButton: "Find food",
    cuisineTitle: "What are you craving?",
    chips: [
      { id: "pizza", label: "Pizza" },
      { id: "burgers", label: "Burgers" },
      { id: "healthy", label: "Healthy" },
      { id: "brunch", label: "Brunch" },
      { id: "dessert", label: "Sweets" },
    ],
    stats: [
      { value: "28 min", label: "Average delivery" },
      { value: "4.9", label: "Courier rating" },
      { value: "1,200+", label: "Local kitchens" },
    ],
    heroImageAlt: "Wood-fired Neapolitan pizza fresh from the oven",
    liveBadge: "Live",
    liveNote: "Ana is 4 minutes away",
  },
  restaurants: {
    eyebrow: "Near you now",
    title: "Kitchens open around the corner",
    intro: "Filter by craving. Every partner is vetted, rated and tracked in real time from the moment you order.",
    filterAria: "Filter restaurants by cuisine",
    filters: [
      { id: "all", label: "All" },
      { id: "pizza", label: "Pizza" },
      { id: "burgers", label: "Burgers" },
      { id: "healthy", label: "Healthy" },
      { id: "brunch", label: "Brunch" },
      { id: "dessert", label: "Sweets" },
    ],
    ratingAria: "Rating",
    reviewsLabel: "ratings",
    etaLabel: "min",
    feeLabel: "delivery",
    freeLabel: "Free delivery",
    viewMenu: "View menu",
    emptyLabel: "No kitchens match that craving yet. Try another cuisine.",
    items: [
      {
        id: "napoli",
        name: "Napoli Corner",
        cuisine: "pizza",
        cuisineLabel: "Neapolitan pizza",
        image: "pizza",
        rating: 4.8,
        reviews: 1240,
        eta: "25-35",
        fee: 3.99,
        distance: "1.2 km",
        blurb: "Wood-fired Neapolitan pies raised on a 48-hour dough.",
        tags: ["Wood-fired", "Vegetarian options"],
        dishes: [
          {
            id: "napoli-margherita",
            name: "Margherita DOP",
            description: "San Marzano tomato, fior di latte, fresh basil, olive oil.",
            price: 14.9,
            image: "pizza",
            popular: true,
          },
          {
            id: "napoli-diavola",
            name: "Diavola Piccante",
            description: "Spicy salami, chili honey, mozzarella, oregano.",
            price: 17.5,
            image: "pizza",
          },
          {
            id: "napoli-tartufo",
            name: "Tartufo Bianco",
            description: "Truffle cream, wild mushrooms, parmesan, thyme.",
            price: 19.9,
            image: "pizza",
          },
        ],
      },
      {
        id: "smash",
        name: "Smash Yard",
        cuisine: "burgers",
        cuisineLabel: "Smash burgers",
        image: "burger",
        rating: 4.7,
        reviews: 980,
        eta: "20-30",
        fee: 2.49,
        distance: "0.8 km",
        blurb: "Double-stacked smash patties seared on cast iron, potato buns.",
        tags: ["Late night", "Halal"],
        dishes: [
          {
            id: "smash-double",
            name: "Double Smash",
            description: "Two beef patties, aged cheddar, pickles, house sauce.",
            price: 12.9,
            image: "burger",
            popular: true,
          },
          {
            id: "smash-bacon",
            name: "Bacon Inferno",
            description: "Smoked bacon, jalapeno, chipotle mayo, crispy onion.",
            price: 14.5,
            image: "burger",
          },
          {
            id: "smash-garden",
            name: "Garden Smash",
            description: "Grilled portobello, avocado, greens, herb aioli.",
            price: 11.9,
            image: "veg",
          },
        ],
      },
      {
        id: "verde",
        name: "Verde Poke",
        cuisine: "healthy",
        cuisineLabel: "Poke bowls",
        image: "poke",
        rating: 4.9,
        reviews: 760,
        eta: "15-25",
        fee: 0,
        distance: "1.5 km",
        blurb: "Build-your-bowl poke with sushi-grade fish and bright ponzu.",
        tags: ["Gluten-free", "High protein"],
        dishes: [
          {
            id: "verde-ahi",
            name: "Ahi Classic Bowl",
            description: "Tuna, edamame, avocado, cucumber, ponzu, sushi rice.",
            price: 15.9,
            image: "poke",
            popular: true,
          },
          {
            id: "verde-salmon",
            name: "Salmon Teriyaki Bowl",
            description: "Salmon, mango, sesame, seaweed, teriyaki glaze.",
            price: 16.5,
            image: "poke",
          },
          {
            id: "verde-rainbow",
            name: "Rainbow Veggie Bowl",
            description: "Marinated tofu, beetroot, avocado, greens, tahini.",
            price: 13.9,
            image: "salad",
          },
        ],
      },
      {
        id: "aurora",
        name: "Aurora Brunch",
        cuisine: "brunch",
        cuisineLabel: "All-day brunch",
        image: "pancakes",
        rating: 4.6,
        reviews: 540,
        eta: "30-40",
        fee: 3.49,
        distance: "2.1 km",
        blurb: "All-day brunch, fluffy stacks and slow-poured specialty coffee.",
        tags: ["All-day", "Family friendly"],
        dishes: [
          {
            id: "aurora-stack",
            name: "Buttermilk Stack",
            description: "Three fluffy pancakes, maple butter, seasonal berries.",
            price: 11.5,
            image: "pancakes",
            popular: true,
          },
          {
            id: "aurora-avocado",
            name: "Avocado Smash Toast",
            description: "Sourdough, poached egg, dukkah, lemon, chili oil.",
            price: 12.9,
            image: "veg",
          },
          {
            id: "aurora-ricotta",
            name: "Berry Ricotta Hotcakes",
            description: "Ricotta hotcakes, blueberry compote, lemon curd.",
            price: 13.5,
            image: "pancakes",
          },
        ],
      },
      {
        id: "greenfork",
        name: "Green Fork",
        cuisine: "healthy",
        cuisineLabel: "Plant-based",
        image: "veg",
        rating: 4.8,
        reviews: 690,
        eta: "20-30",
        fee: 1.99,
        distance: "1.0 km",
        blurb: "Plant-forward kitchen with zero-waste, organic sourcing.",
        tags: ["Plant-based", "Organic"],
        dishes: [
          {
            id: "greenfork-buddha",
            name: "Harvest Buddha Bowl",
            description: "Quinoa, roast vegetables, chickpeas, tahini dressing.",
            price: 13.9,
            image: "veg",
            popular: true,
          },
          {
            id: "greenfork-kale",
            name: "Superfood Kale Salad",
            description: "Massaged kale, avocado, seeds, citrus vinaigrette.",
            price: 12.5,
            image: "salad",
          },
          {
            id: "greenfork-squash",
            name: "Miso Roasted Squash",
            description: "Miso squash, farro, pomegranate, fresh herbs.",
            price: 14.2,
            image: "veg",
          },
        ],
      },
      {
        id: "dolce",
        name: "Dolce Luna",
        cuisine: "dessert",
        cuisineLabel: "Desserts and gelato",
        image: "dessert",
        rating: 4.9,
        reviews: 1120,
        eta: "15-20",
        fee: 2.99,
        distance: "0.6 km",
        blurb: "Artisan gelato, molten cakes and midnight sweets.",
        tags: ["Late night", "Vegan options"],
        dishes: [
          {
            id: "dolce-molten",
            name: "Molten Chocolate Cake",
            description: "Dark chocolate lava cake, vanilla bean gelato.",
            price: 8.9,
            image: "dessert",
            popular: true,
          },
          {
            id: "dolce-tiramisu",
            name: "Pistachio Tiramisu",
            description: "Mascarpone, espresso, Sicilian pistachio crumble.",
            price: 9.5,
            image: "dessert",
          },
          {
            id: "dolce-cheesecake",
            name: "Berry Cheesecake Jar",
            description: "Vanilla cheesecake, wild berry compote, biscuit.",
            price: 7.9,
            image: "dessert",
          },
        ],
      },
    ],
  },
  menu: {
    eyebrow: "Menu",
    backLabel: "All restaurants",
    dishesTitle: "Popular right now",
    popularLabel: "Popular",
    addLabel: "Add",
    addedLabel: "Added",
    addAria: "Add to cart",
    ratingAria: "Rating",
    etaLabel: "min delivery",
    feeLabel: "delivery fee",
    freeLabel: "Free delivery",
    minLabel: "min order",
    minOrder: 10,
    dishImageAlt: "Plated dish from the restaurant menu",
  },
  cart: {
    title: "Your order",
    fromLabel: "from",
    closeAria: "Close cart",
    empty: "Your cart is empty",
    emptyNote: "Add a few dishes and we will get a courier rolling.",
    emptyCta: "Browse restaurants",
    qtyIncAria: "Increase quantity",
    qtyDecAria: "Decrease quantity",
    removeAria: "Remove item",
    subtotal: "Subtotal",
    deliveryFee: "Delivery fee",
    serviceFee: "Service fee",
    serviceFeeValue: 1.99,
    freeLabel: "Free",
    total: "Total",
    etaLabel: "Estimated arrival",
    checkout: "Checkout",
    addMore: "Add more items",
    clearLabel: "Clear cart",
    minWarning: "Add {amount} more to reach the minimum order.",
    minOrder: 10,
  },
  checkout: {
    placedTitle: "Order placed",
    placedNote: "Your kitchen is firing up. We are matching you with the closest courier.",
    orderNumberLabel: "Order",
    orderNumber: "#PR-4821",
    trackCta: "Track my order",
    closeAria: "Close",
    summaryLabel: "Items",
    totalLabel: "Paid",
  },
  tracking: {
    eyebrow: "Live tracking theatre",
    title: "Watch dinner make its way to you",
    intro: "Every Prato order streams live. Follow the courier from the pass to your door, minute by minute.",
    liveLabel: "Live",
    orderIdLabel: "Order",
    orderId: "#PR-4821",
    etaLabel: "Arriving in",
    stages: [
      {
        id: "placed",
        label: "Order placed",
        note: "Napoli Corner confirmed your order.",
        time: "8:42 PM",
      },
      {
        id: "preparing",
        label: "Preparing",
        note: "Your pizza is in the wood-fired oven.",
        time: "8:47 PM",
      },
      {
        id: "courier",
        label: "Courier on the way",
        note: "Ana picked up your order and is heading over.",
        time: "8:58 PM",
      },
      {
        id: "delivered",
        label: "Delivered",
        note: "Enjoy your meal. Warm and on time.",
        time: "9:07 PM",
      },
    ],
    courierName: "Ana Ribeiro",
    courierRole: "Bike courier",
    courierRatingAria: "Courier rating",
    courierRating: 5,
    mapAria: "Live courier route to your address",
    playLabel: "Play",
    pauseLabel: "Pause",
    nextLabel: "Advance",
    backLabel: "Back",
    resetLabel: "Restart",
    deliveredTitle: "Delivered",
    deliveredNote: "Ana handed off your order right on time.",
    rateLabel: "How was Ana?",
    rateAria: "Rate the courier",
  },
  courier: {
    eyebrow: "Ride with Prato",
    title: "Earn on your own schedule",
    intro: "Thousands of couriers deliver with Prato every week. Flexible hours, instant payouts and gear that keeps food warm.",
    cards: [
      {
        title: "Flexible shifts",
        body: "Go online whenever it suits you. No minimum hours, no manager, no fixed route.",
        stat: "$24/hr",
        statLabel: "Average earnings",
      },
      {
        title: "Instant payouts",
        body: "Cash out your earnings the moment a delivery ends, straight to your account.",
        stat: "Daily",
        statLabel: "Get paid",
      },
      {
        title: "Gear that works",
        body: "Insulated bags and app navigation built to keep every order hot and on time.",
        stat: "4.9",
        statLabel: "Courier rating",
      },
    ],
    cta: "Start delivering",
  },
  footer: {
    tagline: "The delivery app your city actually likes.",
    columns: [
      {
        title: "Prato",
        links: ["About us", "Careers", "Newsroom", "Sustainability"],
      },
      {
        title: "For you",
        links: ["Restaurants", "Prato One", "Gift cards", "Help center"],
      },
      {
        title: "Partners",
        links: ["Add your restaurant", "Become a courier", "Prato for Business", "Advertise"],
      },
    ],
    appTitle: "Get the app",
    appNote: "Track orders live and unlock member-only fees.",
    appIos: "App Store",
    appAndroid: "Google Play",
    socialAria: "Prato social channels",
    social: [
      { icon: "at", label: "@pratoapp" },
      { icon: "camera", label: "Prato" },
      { icon: "message", label: "Chat" },
    ],
    legal: "Prato is a fictional concept crafted by VigApp.",
    madeWith: "Designed and built by VigApp",
  },
};

const pt: PratoContent = {
  currency: { code: "BRL", locale: "pt-BR" },
  header: {
    deliverTo: "Entregar em",
    address: "Rua Augusta 1200, Sao Paulo",
    navAria: "Secoes do Prato",
    nav: [
      { href: "#restaurants", label: "Restaurantes" },
      { href: "#menu", label: "Cardapio" },
      { href: "#tracking", label: "Acompanhar" },
      { href: "#partners", label: "Seja entregador" },
    ],
    orderCta: "Pedir agora",
    cartAria: "Abrir sua sacola",
  },
  hero: {
    badge: "Mercado, refeicoes e mais em 30 minutos",
    titleLines: ["Sua cidade,", "entregue quentinha."],
    lede: "O Prato traz as melhores cozinhas do seu bairro ate a sua porta. Rastreio ao vivo, taxas honestas e entregadores que cuidam do seu pedido.",
    searchLabel: "Endereco de entrega",
    searchPlaceholder: "Digite sua rua e numero",
    searchValue: "Rua Augusta 1200, Sao Paulo",
    searchButton: "Buscar comida",
    cuisineTitle: "O que voce esta com vontade?",
    chips: [
      { id: "pizza", label: "Pizza" },
      { id: "burgers", label: "Hamburguer" },
      { id: "healthy", label: "Saudavel" },
      { id: "brunch", label: "Brunch" },
      { id: "dessert", label: "Doces" },
    ],
    stats: [
      { value: "28 min", label: "Entrega media" },
      { value: "4,9", label: "Nota dos entregadores" },
      { value: "1.200+", label: "Cozinhas locais" },
    ],
    heroImageAlt: "Pizza napolitana assada na hora saindo do forno a lenha",
    liveBadge: "Ao vivo",
    liveNote: "Ana esta a 4 minutos",
  },
  restaurants: {
    eyebrow: "Pertinho de voce",
    title: "Cozinhas abertas na esquina",
    intro: "Filtre pela vontade do momento. Cada parceiro e avaliado, verificado e rastreado em tempo real desde o pedido.",
    filterAria: "Filtrar restaurantes por cozinha",
    filters: [
      { id: "all", label: "Todos" },
      { id: "pizza", label: "Pizza" },
      { id: "burgers", label: "Hamburguer" },
      { id: "healthy", label: "Saudavel" },
      { id: "brunch", label: "Brunch" },
      { id: "dessert", label: "Doces" },
    ],
    ratingAria: "Avaliacao",
    reviewsLabel: "avaliacoes",
    etaLabel: "min",
    feeLabel: "entrega",
    freeLabel: "Entrega gratis",
    viewMenu: "Ver cardapio",
    emptyLabel: "Nenhuma cozinha para essa vontade ainda. Tente outra opcao.",
    items: [
      {
        id: "napoli",
        name: "Napoli Corner",
        cuisine: "pizza",
        cuisineLabel: "Pizza napolitana",
        image: "pizza",
        rating: 4.8,
        reviews: 1240,
        eta: "25-35",
        fee: 7.9,
        distance: "1,2 km",
        blurb: "Pizzas napolitanas no forno a lenha com massa de 48 horas.",
        tags: ["Forno a lenha", "Opcoes vegetarianas"],
        dishes: [
          {
            id: "napoli-margherita",
            name: "Margherita DOP",
            description: "Tomate San Marzano, fior di latte, manjericao, azeite.",
            price: 49.9,
            image: "pizza",
            popular: true,
          },
          {
            id: "napoli-diavola",
            name: "Diavola Piccante",
            description: "Salame picante, mel apimentado, mucarela, oregano.",
            price: 58.9,
            image: "pizza",
          },
          {
            id: "napoli-tartufo",
            name: "Tartufo Bianco",
            description: "Creme de trufas, cogumelos, parmesao, tomilho.",
            price: 67.9,
            image: "pizza",
          },
        ],
      },
      {
        id: "smash",
        name: "Smash Yard",
        cuisine: "burgers",
        cuisineLabel: "Smash burger",
        image: "burger",
        rating: 4.7,
        reviews: 980,
        eta: "20-30",
        fee: 5.9,
        distance: "0,8 km",
        blurb: "Smash burgers duplos na chapa de ferro com pao de batata.",
        tags: ["Alta madrugada", "Halal"],
        dishes: [
          {
            id: "smash-double",
            name: "Double Smash",
            description: "Dois hamburgueres, cheddar, picles, molho da casa.",
            price: 36.9,
            image: "burger",
            popular: true,
          },
          {
            id: "smash-bacon",
            name: "Bacon Inferno",
            description: "Bacon defumado, jalapeno, maionese chipotle, cebola.",
            price: 42.9,
            image: "burger",
          },
          {
            id: "smash-garden",
            name: "Garden Smash",
            description: "Portobello grelhado, abacate, folhas, aioli de ervas.",
            price: 34.9,
            image: "veg",
          },
        ],
      },
      {
        id: "verde",
        name: "Verde Poke",
        cuisine: "healthy",
        cuisineLabel: "Poke bowls",
        image: "poke",
        rating: 4.9,
        reviews: 760,
        eta: "15-25",
        fee: 0,
        distance: "1,5 km",
        blurb: "Monte seu poke com peixe fresco e ponzu bem cítrico.",
        tags: ["Sem gluten", "Rico em proteina"],
        dishes: [
          {
            id: "verde-ahi",
            name: "Ahi Classic Bowl",
            description: "Atum, edamame, abacate, pepino, ponzu, arroz.",
            price: 48.9,
            image: "poke",
            popular: true,
          },
          {
            id: "verde-salmon",
            name: "Salmon Teriyaki Bowl",
            description: "Salmao, manga, gergelim, alga, glace teriyaki.",
            price: 52.9,
            image: "poke",
          },
          {
            id: "verde-rainbow",
            name: "Rainbow Veggie Bowl",
            description: "Tofu marinado, beterraba, abacate, folhas, tahine.",
            price: 39.9,
            image: "salad",
          },
        ],
      },
      {
        id: "aurora",
        name: "Aurora Brunch",
        cuisine: "brunch",
        cuisineLabel: "Brunch o dia todo",
        image: "pancakes",
        rating: 4.6,
        reviews: 540,
        eta: "30-40",
        fee: 8.9,
        distance: "2,1 km",
        blurb: "Brunch o dia todo, panquecas fofas e cafe especial.",
        tags: ["O dia todo", "Para a familia"],
        dishes: [
          {
            id: "aurora-stack",
            name: "Buttermilk Stack",
            description: "Tres panquecas fofas, manteiga de maple, frutas.",
            price: 32.9,
            image: "pancakes",
            popular: true,
          },
          {
            id: "aurora-avocado",
            name: "Avocado Smash Toast",
            description: "Pao rustico, ovo pochê, dukkah, limao, pimenta.",
            price: 36.9,
            image: "veg",
          },
          {
            id: "aurora-ricotta",
            name: "Berry Ricotta Hotcakes",
            description: "Panquecas de ricota, compota de mirtilo, limao.",
            price: 38.9,
            image: "pancakes",
          },
        ],
      },
      {
        id: "greenfork",
        name: "Green Fork",
        cuisine: "healthy",
        cuisineLabel: "Plant-based",
        image: "veg",
        rating: 4.8,
        reviews: 690,
        eta: "20-30",
        fee: 4.9,
        distance: "1,0 km",
        blurb: "Cozinha vegetal com ingredientes organicos e zero desperdicio.",
        tags: ["Vegetal", "Organico"],
        dishes: [
          {
            id: "greenfork-buddha",
            name: "Harvest Buddha Bowl",
            description: "Quinoa, legumes assados, grao de bico, tahine.",
            price: 39.9,
            image: "veg",
            popular: true,
          },
          {
            id: "greenfork-kale",
            name: "Superfood Kale Salad",
            description: "Couve massageada, abacate, sementes, vinagrete.",
            price: 34.9,
            image: "salad",
          },
          {
            id: "greenfork-squash",
            name: "Miso Roasted Squash",
            description: "Abobora ao miso, farro, roma, ervas frescas.",
            price: 41.9,
            image: "veg",
          },
        ],
      },
      {
        id: "dolce",
        name: "Dolce Luna",
        cuisine: "dessert",
        cuisineLabel: "Sobremesas e gelato",
        image: "dessert",
        rating: 4.9,
        reviews: 1120,
        eta: "15-20",
        fee: 6.9,
        distance: "0,6 km",
        blurb: "Gelato artesanal, bolos vulcao e doces da madrugada.",
        tags: ["Alta madrugada", "Opcoes veganas"],
        dishes: [
          {
            id: "dolce-molten",
            name: "Molten Chocolate Cake",
            description: "Bolo vulcao de chocolate, gelato de baunilha.",
            price: 24.9,
            image: "dessert",
            popular: true,
          },
          {
            id: "dolce-tiramisu",
            name: "Pistachio Tiramisu",
            description: "Mascarpone, espresso, farofa de pistache siciliano.",
            price: 27.9,
            image: "dessert",
          },
          {
            id: "dolce-cheesecake",
            name: "Berry Cheesecake Jar",
            description: "Cheesecake de baunilha, compota de frutas, biscoito.",
            price: 22.9,
            image: "dessert",
          },
        ],
      },
    ],
  },
  menu: {
    eyebrow: "Cardapio",
    backLabel: "Todos os restaurantes",
    dishesTitle: "Populares agora",
    popularLabel: "Popular",
    addLabel: "Adicionar",
    addedLabel: "Adicionado",
    addAria: "Adicionar a sacola",
    ratingAria: "Avaliacao",
    etaLabel: "min de entrega",
    feeLabel: "taxa de entrega",
    freeLabel: "Entrega gratis",
    minLabel: "pedido minimo",
    minOrder: 30,
    dishImageAlt: "Prato servido do cardapio do restaurante",
  },
  cart: {
    title: "Seu pedido",
    fromLabel: "de",
    closeAria: "Fechar sacola",
    empty: "Sua sacola esta vazia",
    emptyNote: "Adicione alguns pratos que colocamos um entregador na rua.",
    emptyCta: "Ver restaurantes",
    qtyIncAria: "Aumentar quantidade",
    qtyDecAria: "Diminuir quantidade",
    removeAria: "Remover item",
    subtotal: "Subtotal",
    deliveryFee: "Taxa de entrega",
    serviceFee: "Taxa de servico",
    serviceFeeValue: 2.9,
    freeLabel: "Gratis",
    total: "Total",
    etaLabel: "Chegada estimada",
    checkout: "Finalizar",
    addMore: "Adicionar mais itens",
    clearLabel: "Limpar sacola",
    minWarning: "Adicione mais {amount} para atingir o pedido minimo.",
    minOrder: 30,
  },
  checkout: {
    placedTitle: "Pedido confirmado",
    placedNote: "A cozinha ja comecou. Estamos chamando o entregador mais proximo.",
    orderNumberLabel: "Pedido",
    orderNumber: "#PR-4821",
    trackCta: "Acompanhar pedido",
    closeAria: "Fechar",
    summaryLabel: "Itens",
    totalLabel: "Pago",
  },
  tracking: {
    eyebrow: "Rastreio ao vivo",
    title: "Veja o jantar chegando ate voce",
    intro: "Todo pedido Prato transmite ao vivo. Acompanhe o entregador da cozinha ate a sua porta, minuto a minuto.",
    liveLabel: "Ao vivo",
    orderIdLabel: "Pedido",
    orderId: "#PR-4821",
    etaLabel: "Chega em",
    stages: [
      {
        id: "placed",
        label: "Pedido feito",
        note: "O Napoli Corner confirmou seu pedido.",
        time: "20:42",
      },
      {
        id: "preparing",
        label: "Preparando",
        note: "Sua pizza esta no forno a lenha.",
        time: "20:47",
      },
      {
        id: "courier",
        label: "Entregador a caminho",
        note: "Ana pegou seu pedido e esta indo ate voce.",
        time: "20:58",
      },
      {
        id: "delivered",
        label: "Entregue",
        note: "Bom apetite. Quentinho e no horario.",
        time: "21:07",
      },
    ],
    courierName: "Ana Ribeiro",
    courierRole: "Entregadora de bike",
    courierRatingAria: "Nota do entregador",
    courierRating: 5,
    mapAria: "Rota do entregador ao vivo ate seu endereco",
    playLabel: "Play",
    pauseLabel: "Pausar",
    nextLabel: "Avancar",
    backLabel: "Voltar",
    resetLabel: "Reiniciar",
    deliveredTitle: "Entregue",
    deliveredNote: "A Ana entregou seu pedido bem no horario.",
    rateLabel: "Como foi a Ana?",
    rateAria: "Avaliar o entregador",
  },
  courier: {
    eyebrow: "Pedale com o Prato",
    title: "Ganhe no seu proprio horario",
    intro: "Milhares de entregadores rodam com o Prato toda semana. Horarios flexiveis, pagamentos na hora e equipamento que mantem tudo quente.",
    cards: [
      {
        title: "Horarios flexiveis",
        body: "Fique online quando quiser. Sem minimo de horas, sem chefe, sem rota fixa.",
        stat: "R$32/h",
        statLabel: "Ganho medio",
      },
      {
        title: "Pagamento na hora",
        body: "Receba assim que a entrega termina, direto na sua conta.",
        stat: "Diario",
        statLabel: "Receba",
      },
      {
        title: "Equipamento certo",
        body: "Bags termicas e navegacao no app para manter cada pedido quente.",
        stat: "4,9",
        statLabel: "Nota do entregador",
      },
    ],
    cta: "Comecar a entregar",
  },
  footer: {
    tagline: "O app de entrega que a sua cidade curte de verdade.",
    columns: [
      {
        title: "Prato",
        links: ["Sobre nos", "Carreiras", "Imprensa", "Sustentabilidade"],
      },
      {
        title: "Para voce",
        links: ["Restaurantes", "Prato One", "Vale-presente", "Central de ajuda"],
      },
      {
        title: "Parceiros",
        links: ["Cadastre seu restaurante", "Seja entregador", "Prato para empresas", "Anuncie"],
      },
    ],
    appTitle: "Baixe o app",
    appNote: "Acompanhe pedidos ao vivo e libere taxas exclusivas.",
    appIos: "App Store",
    appAndroid: "Google Play",
    socialAria: "Canais do Prato",
    social: [
      { icon: "at", label: "@pratoapp" },
      { icon: "camera", label: "Prato" },
      { icon: "message", label: "Chat" },
    ],
    legal: "Prato e um conceito ficticio criado pela VigApp.",
    madeWith: "Concebido e desenvolvido pela VigApp",
  },
};

const es: PratoContent = {
  currency: { code: "EUR", locale: "es-ES" },
  header: {
    deliverTo: "Entregar en",
    address: "Calle de Fuencarral 78, Madrid",
    navAria: "Secciones de Prato",
    nav: [
      { href: "#restaurants", label: "Restaurantes" },
      { href: "#menu", label: "Menu" },
      { href: "#tracking", label: "Seguir pedido" },
      { href: "#partners", label: "Reparte con Prato" },
    ],
    orderCta: "Pedir ahora",
    cartAria: "Abrir tu cesta",
  },
  hero: {
    badge: "Compra, comidas y mas en 30 minutos",
    titleLines: ["Tu ciudad,", "servida calentita."],
    lede: "Prato acerca las mejores cocinas de tu barrio hasta tu puerta. Seguimiento en vivo, tarifas honestas y repartidores que cuidan tu comida.",
    searchLabel: "Direccion de entrega",
    searchPlaceholder: "Escribe tu calle y numero",
    searchValue: "Calle de Fuencarral 78, Madrid",
    searchButton: "Buscar comida",
    cuisineTitle: "Que te apetece?",
    chips: [
      { id: "pizza", label: "Pizza" },
      { id: "burgers", label: "Hamburguesas" },
      { id: "healthy", label: "Saludable" },
      { id: "brunch", label: "Brunch" },
      { id: "dessert", label: "Dulces" },
    ],
    stats: [
      { value: "28 min", label: "Entrega media" },
      { value: "4,9", label: "Nota de repartidores" },
      { value: "1.200+", label: "Cocinas locales" },
    ],
    heroImageAlt: "Pizza napolitana recien hecha saliendo del horno de lena",
    liveBadge: "En vivo",
    liveNote: "Ana esta a 4 minutos",
  },
  restaurants: {
    eyebrow: "Cerca de ti ahora",
    title: "Cocinas abiertas a la vuelta de la esquina",
    intro: "Filtra por antojo. Cada socio esta verificado, valorado y rastreado en tiempo real desde el momento del pedido.",
    filterAria: "Filtrar restaurantes por cocina",
    filters: [
      { id: "all", label: "Todos" },
      { id: "pizza", label: "Pizza" },
      { id: "burgers", label: "Hamburguesas" },
      { id: "healthy", label: "Saludable" },
      { id: "brunch", label: "Brunch" },
      { id: "dessert", label: "Dulces" },
    ],
    ratingAria: "Valoracion",
    reviewsLabel: "valoraciones",
    etaLabel: "min",
    feeLabel: "envio",
    freeLabel: "Envio gratis",
    viewMenu: "Ver menu",
    emptyLabel: "Ninguna cocina para ese antojo todavia. Prueba otra opcion.",
    items: [
      {
        id: "napoli",
        name: "Napoli Corner",
        cuisine: "pizza",
        cuisineLabel: "Pizza napolitana",
        image: "pizza",
        rating: 4.8,
        reviews: 1240,
        eta: "25-35",
        fee: 3.49,
        distance: "1,2 km",
        blurb: "Pizzas napolitanas al horno de lena con masa de 48 horas.",
        tags: ["Horno de lena", "Opciones vegetarianas"],
        dishes: [
          {
            id: "napoli-margherita",
            name: "Margherita DOP",
            description: "Tomate San Marzano, fior di latte, albahaca, aceite.",
            price: 13.9,
            image: "pizza",
            popular: true,
          },
          {
            id: "napoli-diavola",
            name: "Diavola Piccante",
            description: "Salami picante, miel con chile, mozzarella, oregano.",
            price: 16.5,
            image: "pizza",
          },
          {
            id: "napoli-tartufo",
            name: "Tartufo Bianco",
            description: "Crema de trufa, setas, parmesano, tomillo.",
            price: 18.9,
            image: "pizza",
          },
        ],
      },
      {
        id: "smash",
        name: "Smash Yard",
        cuisine: "burgers",
        cuisineLabel: "Smash burgers",
        image: "burger",
        rating: 4.7,
        reviews: 980,
        eta: "20-30",
        fee: 2.29,
        distance: "0,8 km",
        blurb: "Smash burgers dobles a la plancha con pan de patata.",
        tags: ["Hasta tarde", "Halal"],
        dishes: [
          {
            id: "smash-double",
            name: "Double Smash",
            description: "Dos hamburguesas, cheddar, pepinillo, salsa de la casa.",
            price: 11.9,
            image: "burger",
            popular: true,
          },
          {
            id: "smash-bacon",
            name: "Bacon Inferno",
            description: "Bacon ahumado, jalapeno, mayonesa chipotle, cebolla.",
            price: 13.5,
            image: "burger",
          },
          {
            id: "smash-garden",
            name: "Garden Smash",
            description: "Portobello a la brasa, aguacate, brotes, alioli.",
            price: 10.9,
            image: "veg",
          },
        ],
      },
      {
        id: "verde",
        name: "Verde Poke",
        cuisine: "healthy",
        cuisineLabel: "Poke bowls",
        image: "poke",
        rating: 4.9,
        reviews: 760,
        eta: "15-25",
        fee: 0,
        distance: "1,5 km",
        blurb: "Crea tu poke con pescado fresco y ponzu bien citrico.",
        tags: ["Sin gluten", "Rico en proteina"],
        dishes: [
          {
            id: "verde-ahi",
            name: "Ahi Classic Bowl",
            description: "Atun, edamame, aguacate, pepino, ponzu, arroz.",
            price: 14.9,
            image: "poke",
            popular: true,
          },
          {
            id: "verde-salmon",
            name: "Salmon Teriyaki Bowl",
            description: "Salmon, mango, sesamo, alga, glaseado teriyaki.",
            price: 15.5,
            image: "poke",
          },
          {
            id: "verde-rainbow",
            name: "Rainbow Veggie Bowl",
            description: "Tofu marinado, remolacha, aguacate, brotes, tahini.",
            price: 12.9,
            image: "salad",
          },
        ],
      },
      {
        id: "aurora",
        name: "Aurora Brunch",
        cuisine: "brunch",
        cuisineLabel: "Brunch todo el dia",
        image: "pancakes",
        rating: 4.6,
        reviews: 540,
        eta: "30-40",
        fee: 2.99,
        distance: "2,1 km",
        blurb: "Brunch todo el dia, tortitas esponjosas y cafe de especialidad.",
        tags: ["Todo el dia", "Para la familia"],
        dishes: [
          {
            id: "aurora-stack",
            name: "Buttermilk Stack",
            description: "Tres tortitas esponjosas, mantequilla de arce, frutos rojos.",
            price: 10.9,
            image: "pancakes",
            popular: true,
          },
          {
            id: "aurora-avocado",
            name: "Avocado Smash Toast",
            description: "Pan de masa madre, huevo pochado, dukkah, limon.",
            price: 11.9,
            image: "veg",
          },
          {
            id: "aurora-ricotta",
            name: "Berry Ricotta Hotcakes",
            description: "Tortitas de ricotta, compota de arandanos, limon.",
            price: 12.5,
            image: "pancakes",
          },
        ],
      },
      {
        id: "greenfork",
        name: "Green Fork",
        cuisine: "healthy",
        cuisineLabel: "Plant-based",
        image: "veg",
        rating: 4.8,
        reviews: 690,
        eta: "20-30",
        fee: 1.79,
        distance: "1,0 km",
        blurb: "Cocina vegetal con ingredientes ecologicos y residuo cero.",
        tags: ["Vegetal", "Ecologico"],
        dishes: [
          {
            id: "greenfork-buddha",
            name: "Harvest Buddha Bowl",
            description: "Quinoa, verduras asadas, garbanzos, salsa de tahini.",
            price: 12.9,
            image: "veg",
            popular: true,
          },
          {
            id: "greenfork-kale",
            name: "Superfood Kale Salad",
            description: "Kale masajeado, aguacate, semillas, vinagreta citrica.",
            price: 11.5,
            image: "salad",
          },
          {
            id: "greenfork-squash",
            name: "Miso Roasted Squash",
            description: "Calabaza al miso, farro, granada, hierbas frescas.",
            price: 13.2,
            image: "veg",
          },
        ],
      },
      {
        id: "dolce",
        name: "Dolce Luna",
        cuisine: "dessert",
        cuisineLabel: "Postres y gelato",
        image: "dessert",
        rating: 4.9,
        reviews: 1120,
        eta: "15-20",
        fee: 2.49,
        distance: "0,6 km",
        blurb: "Gelato artesano, coulants y dulces de medianoche.",
        tags: ["Hasta tarde", "Opciones veganas"],
        dishes: [
          {
            id: "dolce-molten",
            name: "Molten Chocolate Cake",
            description: "Coulant de chocolate negro, gelato de vainilla.",
            price: 7.9,
            image: "dessert",
            popular: true,
          },
          {
            id: "dolce-tiramisu",
            name: "Pistachio Tiramisu",
            description: "Mascarpone, espresso, crumble de pistacho siciliano.",
            price: 8.5,
            image: "dessert",
          },
          {
            id: "dolce-cheesecake",
            name: "Berry Cheesecake Jar",
            description: "Cheesecake de vainilla, compota de frutos rojos, galleta.",
            price: 6.9,
            image: "dessert",
          },
        ],
      },
    ],
  },
  menu: {
    eyebrow: "Menu",
    backLabel: "Todos los restaurantes",
    dishesTitle: "Populares ahora",
    popularLabel: "Popular",
    addLabel: "Anadir",
    addedLabel: "Anadido",
    addAria: "Anadir a la cesta",
    ratingAria: "Valoracion",
    etaLabel: "min de entrega",
    feeLabel: "gastos de envio",
    freeLabel: "Envio gratis",
    minLabel: "pedido minimo",
    minOrder: 10,
    dishImageAlt: "Plato servido del menu del restaurante",
  },
  cart: {
    title: "Tu pedido",
    fromLabel: "de",
    closeAria: "Cerrar cesta",
    empty: "Tu cesta esta vacia",
    emptyNote: "Anade unos platos y ponemos un repartidor en marcha.",
    emptyCta: "Ver restaurantes",
    qtyIncAria: "Aumentar cantidad",
    qtyDecAria: "Reducir cantidad",
    removeAria: "Quitar articulo",
    subtotal: "Subtotal",
    deliveryFee: "Gastos de envio",
    serviceFee: "Tarifa de servicio",
    serviceFeeValue: 1.49,
    freeLabel: "Gratis",
    total: "Total",
    etaLabel: "Llegada estimada",
    checkout: "Finalizar",
    addMore: "Anadir mas platos",
    clearLabel: "Vaciar cesta",
    minWarning: "Anade {amount} mas para llegar al pedido minimo.",
    minOrder: 10,
  },
  checkout: {
    placedTitle: "Pedido realizado",
    placedNote: "La cocina ya se pone en marcha. Buscamos al repartidor mas cercano.",
    orderNumberLabel: "Pedido",
    orderNumber: "#PR-4821",
    trackCta: "Seguir mi pedido",
    closeAria: "Cerrar",
    summaryLabel: "Articulos",
    totalLabel: "Pagado",
  },
  tracking: {
    eyebrow: "Seguimiento en vivo",
    title: "Mira la cena en camino hacia ti",
    intro: "Cada pedido Prato se emite en vivo. Sigue al repartidor desde la cocina hasta tu puerta, minuto a minuto.",
    liveLabel: "En vivo",
    orderIdLabel: "Pedido",
    orderId: "#PR-4821",
    etaLabel: "Llega en",
    stages: [
      {
        id: "placed",
        label: "Pedido realizado",
        note: "Napoli Corner confirmo tu pedido.",
        time: "20:42",
      },
      {
        id: "preparing",
        label: "Preparando",
        note: "Tu pizza esta en el horno de lena.",
        time: "20:47",
      },
      {
        id: "courier",
        label: "Repartidor en camino",
        note: "Ana recogio tu pedido y va hacia ti.",
        time: "20:58",
      },
      {
        id: "delivered",
        label: "Entregado",
        note: "Que aproveche. Calentito y a tiempo.",
        time: "21:07",
      },
    ],
    courierName: "Ana Ribeiro",
    courierRole: "Repartidora en bici",
    courierRatingAria: "Nota del repartidor",
    courierRating: 5,
    mapAria: "Ruta del repartidor en vivo hasta tu direccion",
    playLabel: "Play",
    pauseLabel: "Pausar",
    nextLabel: "Avanzar",
    backLabel: "Atras",
    resetLabel: "Reiniciar",
    deliveredTitle: "Entregado",
    deliveredNote: "Ana entrego tu pedido justo a tiempo.",
    rateLabel: "Que tal Ana?",
    rateAria: "Valorar al repartidor",
  },
  courier: {
    eyebrow: "Reparte con Prato",
    title: "Gana con tu propio horario",
    intro: "Miles de repartidores entregan con Prato cada semana. Horarios flexibles, pagos al instante y equipo que mantiene la comida caliente.",
    cards: [
      {
        title: "Turnos flexibles",
        body: "Conectate cuando te venga bien. Sin horas minimas, sin jefe, sin ruta fija.",
        stat: "22 EUR/h",
        statLabel: "Ganancia media",
      },
      {
        title: "Pagos al instante",
        body: "Cobra en cuanto termina un reparto, directo a tu cuenta.",
        stat: "Diario",
        statLabel: "Cobra",
      },
      {
        title: "Equipo que funciona",
        body: "Mochilas isotermicas y navegacion en la app para llegar caliente y a tiempo.",
        stat: "4,9",
        statLabel: "Nota del repartidor",
      },
    ],
    cta: "Empezar a repartir",
  },
  footer: {
    tagline: "La app de reparto que tu ciudad de verdad quiere.",
    columns: [
      {
        title: "Prato",
        links: ["Sobre nosotros", "Empleo", "Prensa", "Sostenibilidad"],
      },
      {
        title: "Para ti",
        links: ["Restaurantes", "Prato One", "Tarjetas regalo", "Centro de ayuda"],
      },
      {
        title: "Socios",
        links: ["Anade tu restaurante", "Reparte con Prato", "Prato para empresas", "Publicidad"],
      },
    ],
    appTitle: "Descarga la app",
    appNote: "Sigue pedidos en vivo y desbloquea tarifas de socio.",
    appIos: "App Store",
    appAndroid: "Google Play",
    socialAria: "Canales de Prato",
    social: [
      { icon: "at", label: "@pratoapp" },
      { icon: "camera", label: "Prato" },
      { icon: "message", label: "Chat" },
    ],
    legal: "Prato es un concepto ficticio creado por VigApp.",
    madeWith: "Disenado y desarrollado por VigApp",
  },
};

export const pratoDictionary: DemoDictionary<PratoContent> = { en, pt, es };
