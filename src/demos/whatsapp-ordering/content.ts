import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

export interface Currency {
  symbol: string;
  position: "before" | "after";
  decimal: string;
  space: boolean;
}

export interface NavItem {
  href: string;
  label: string;
}

export interface HeaderContent {
  status: string;
  nav: NavItem[];
  cta: string;
  openMenu: string;
  closeMenu: string;
}

export interface HeroBubble {
  from: "bot" | "user";
  text: string;
}

export interface HeroContent {
  badge: string;
  titleTop: string;
  titleAccent: string;
  titleBottom: string;
  lead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: { value: string; label: string }[];
  phoneName: string;
  phoneStatus: string;
  bubbles: HeroBubble[];
  todayLabel: string;
}

export type ItemKind = "burger" | "side" | "drink";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  kind: ItemKind;
  image: string;
  alt: string;
  tag?: string;
}

export interface Extra {
  id: string;
  name: string;
  price: number;
}

export interface SavedAddress {
  id: string;
  label: string;
  detail: string;
}

export interface PayOption {
  id: string;
  label: string;
}

export interface ChatContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  contactName: string;
  contactStatus: string;
  typingName: string;
  quickRepliesLabel: string;
  addToChat: string;
  restart: string;
  sendOrder: string;
  /* bot script */
  greeting: string;
  askExtras: string;
  extrasDone: string;
  askAddress: string;
  newAddress: string;
  newAddressDetail: string;
  askPayment: string;
  reviewIntro: string;
  /* order panel + summary */
  panelTitle: string;
  panelEmpty: string;
  labelItem: string;
  labelExtras: string;
  labelExtrasNone: string;
  labelAddress: string;
  labelPayment: string;
  labelTotal: string;
  summaryTitle: string;
  summaryReady: string;
  /* wa.me composition */
  waIntro: string;
  waItem: string;
  waExtras: string;
  waAddress: string;
  waPayment: string;
  waTotal: string;
}

export interface MenuSectionContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  filters: { id: "all" | ItemKind; label: string }[];
  etaLabel: string;
  addLabel: string;
}

export interface HowStep {
  title: string;
  detail: string;
}

export interface HowContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  steps: HowStep[];
  note: string;
}

export interface PlanContent {
  id: string;
  name: string;
  price: string;
  period: string;
  tagline: string;
  features: string[];
  cta: string;
  featured?: boolean;
  badge?: string;
}

export interface PricingContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  plans: PlanContent[];
  footnote: string;
}

export interface CtaContent {
  eyebrow: string;
  title: string;
  body: string;
  primary: string;
  secondary: string;
  waMessage: string;
  bullets: string[];
}

export interface FooterContent {
  tagline: string;
  navLabel: string;
  nav: NavItem[];
  contactLabel: string;
  hours: string;
  social: { id: "channel" | "site" | "mail"; label: string; href: string }[];
  socialLabel: string;
  fine: string;
  credit: string;
}

export interface ZapContent {
  currency: Currency;
  header: HeaderContent;
  hero: HeroContent;
  menuItems: MenuItem[];
  extras: Extra[];
  addresses: SavedAddress[];
  payments: PayOption[];
  chat: ChatContent;
  menuSection: MenuSectionContent;
  how: HowContent;
  pricing: PricingContent;
  cta: CtaContent;
  footer: FooterContent;
}

/* ------------------------------------------------------------------ */
/* Image IDs (art-directed with overlays/duotones defensively)        */
/* ------------------------------------------------------------------ */

const IMG = {
  burger: "photo-1568901346375-23c9450c58cd",
  cheeseburger: "photo-1550547660-d9450f859349",
  fries: "photo-1552346154-21d32810aba3",
  shake: "photo-1565958011703-44f9829ba187",
} as const;

/* ------------------------------------------------------------------ */
/* English                                                            */
/* ------------------------------------------------------------------ */

const en: ZapContent = {
  currency: { symbol: "$", position: "before", decimal: ".", space: false },
  header: {
    status: "online",
    nav: [
      { href: "#chat", label: "Live demo" },
      { href: "#menu", label: "Menu" },
      { href: "#how", label: "How it works" },
      { href: "#pricing", label: "Pricing" },
    ],
    cta: "Get ZapPedido",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    badge: "Ordering that lives in WhatsApp",
    titleTop: "Your burger joint,",
    titleAccent: "one chat",
    titleBottom: "away from dinner.",
    lead: "ZapPedido turns your restaurant's WhatsApp into a full ordering counter. Customers tap a few replies, the order builds itself, and it lands in your kitchen ready to cook.",
    ctaPrimary: "Try the live demo",
    ctaSecondary: "See pricing",
    stats: [
      { value: "40s", label: "average order" },
      { value: "0", label: "apps to install" },
      { value: "98%", label: "messages opened" },
    ],
    phoneName: "Smash Lab Burgers",
    phoneStatus: "online",
    todayLabel: "Today",
    bubbles: [
      { from: "bot", text: "Hey! Welcome to Smash Lab. Hungry?" },
      { from: "user", text: "Very. One Classic Smash please" },
      { from: "bot", text: "On it. Add smoked bacon for $2?" },
      { from: "user", text: "Yes, and fries" },
      { from: "bot", text: "Total $15.00, delivering to Home in 25 min." },
    ],
  },
  menuItems: [
    {
      id: "classic-smash",
      name: "Classic Smash",
      description: "Two smashed beef patties, melted cheddar, house sauce, toasted brioche.",
      price: 8.5,
      kind: "burger",
      image: IMG.burger,
      alt: "Classic Smash burger with melted cheddar on a toasted brioche bun",
      tag: "Bestseller",
    },
    {
      id: "double-cheddar",
      name: "Double Cheddar Stack",
      description: "Double patty, twice the aged cheddar, pickles and caramelized onion.",
      price: 11,
      kind: "burger",
      image: IMG.cheeseburger,
      alt: "Double cheddar cheeseburger stacked tall with pickles",
      tag: "Chef pick",
    },
    {
      id: "crispy-fries",
      name: "Crispy Skin Fries",
      description: "Thrice-cooked skin-on fries, sea salt, smoked paprika aioli on the side.",
      price: 4.5,
      kind: "side",
      image: IMG.fries,
      alt: "Golden skin-on fries in a paper cone with aioli",
    },
    {
      id: "malt-shake",
      name: "Salted Malt Shake",
      description: "Slow-churned vanilla malt, sea salt swirl, thick enough to hold a straw.",
      price: 5.5,
      kind: "drink",
      image: IMG.shake,
      alt: "Thick salted malt milkshake topped with cream",
    },
  ],
  extras: [
    { id: "bacon", name: "Smoked bacon", price: 2 },
    { id: "cheese", name: "Extra cheddar", price: 1.5 },
    { id: "onion", name: "Caramelized onion", price: 1 },
    { id: "jalapeno", name: "Jalapenos", price: 1 },
  ],
  addresses: [
    { id: "home", label: "Home", detail: "214 Oak Street, Apt 3B" },
    { id: "work", label: "Work", detail: "88 Market Ave, Floor 5" },
  ],
  payments: [
    { id: "card", label: "Card on delivery" },
    { id: "online", label: "Pay online" },
    { id: "cash", label: "Cash" },
  ],
  chat: {
    eyebrow: "Live demo",
    title: "Order a burger without leaving the chat",
    subtitle: "Tap the replies. Watch the order build itself. This is exactly the flow your customers get.",
    contactName: "Smash Lab Burgers",
    contactStatus: "typically replies in seconds",
    typingName: "Smash Lab is typing",
    quickRepliesLabel: "Quick replies",
    addToChat: "Add in chat",
    restart: "Start a new order",
    sendOrder: "Send order on WhatsApp",
    greeting: "Hey there, welcome to Smash Lab! Tap what you are craving and I will start your order.",
    askExtras: "Great pick. Want to load it up with any extras?",
    extrasDone: "That is everything",
    askAddress: "Delicious. Where should we send it?",
    newAddress: "New address",
    newAddressDetail: "Share live location in chat",
    askPayment: "Got it. How would you like to pay?",
    reviewIntro: "All set! Here is your order, ready to go:",
    panelTitle: "Your order",
    panelEmpty: "Nothing added yet. Start tapping the replies to build your order.",
    labelItem: "Item",
    labelExtras: "Extras",
    labelExtrasNone: "No extras",
    labelAddress: "Deliver to",
    labelPayment: "Payment",
    labelTotal: "Total",
    summaryTitle: "Order summary",
    summaryReady: "Ready to send to the kitchen",
    waIntro: "New order via ZapPedido",
    waItem: "Item",
    waExtras: "Extras",
    waAddress: "Deliver to",
    waPayment: "Payment",
    waTotal: "Total",
  },
  menuSection: {
    eyebrow: "The menu",
    title: "Everything is one tap away",
    subtitle: "Your full menu lives inside the chat. Add anything here and it drops straight into the conversation.",
    filters: [
      { id: "all", label: "All" },
      { id: "burger", label: "Burgers" },
      { id: "side", label: "Sides" },
      { id: "drink", label: "Shakes" },
    ],
    etaLabel: "min",
    addLabel: "Add",
  },
  how: {
    eyebrow: "For restaurant owners",
    title: "Live in an afternoon, no app store required",
    subtitle: "ZapPedido plugs into the WhatsApp number you already give out. No new hardware, no customer downloads.",
    steps: [
      { title: "Connect your number", detail: "Link your restaurant WhatsApp in a few clicks. Keep the same number your regulars already save." },
      { title: "Build your menu", detail: "Add items, prices, extras and photos in a simple dashboard. Change it any time, even mid-service." },
      { title: "Customers just chat", detail: "They tap replies, the bot builds the order and confirms delivery. No forms, no friction." },
      { title: "Orders hit the kitchen", detail: "Every order lands on your screen, timed and priced, ready to fire. Print, accept, cook." },
    ],
    note: "Works alongside your staff, not instead of them. Hand off to a human any time.",
  },
  pricing: {
    eyebrow: "Pricing",
    title: "One flat plan per restaurant. No per-order tax.",
    subtitle: "Delivery apps take up to 30% of every order. ZapPedido is a fixed monthly price, so the margin stays yours.",
    plans: [
      {
        id: "starter",
        name: "Starter",
        price: "$39",
        period: "/month",
        tagline: "For a single spot finding its rhythm.",
        features: ["1 WhatsApp number", "Up to 300 orders / month", "Menu, extras and photos", "Card and cash at checkout", "Order dashboard"],
        cta: "Start free trial",
      },
      {
        id: "grill",
        name: "Grill",
        price: "$89",
        period: "/month",
        tagline: "For busy kitchens that never stop.",
        features: ["Everything in Starter", "Unlimited orders", "Online payments built in", "Scheduled and repeat orders", "Loyalty and promo codes", "Priority support"],
        cta: "Start free trial",
        featured: true,
        badge: "Most popular",
      },
      {
        id: "franchise",
        name: "Franchise",
        price: "$219",
        period: "/month",
        tagline: "For groups running many locations.",
        features: ["Everything in Grill", "Up to 8 locations", "Central menu control", "Team roles and shifts", "Sales analytics export", "Dedicated onboarding"],
        cta: "Talk to sales",
      },
    ],
    footnote: "Prices in USD, billed monthly. Cancel any time. 14-day free trial, no card needed.",
  },
  cta: {
    eyebrow: "Get started",
    title: "Turn your WhatsApp into your busiest cashier",
    body: "Send us a message and we will have Smash-Lab-style ordering running on your own number this week. Same demo you just tried, your menu inside.",
    primary: "Get ZapPedido on WhatsApp",
    secondary: "Try the demo again",
    waMessage: "Hi ZapPedido team! I run a restaurant and I want WhatsApp ordering like the demo. Can you set it up for us?",
    bullets: ["Set up in a single afternoon", "Keep 100% of every order", "Cancel any time, no lock-in"],
  },
  footer: {
    tagline: "Ordering that lives where your customers already are.",
    navLabel: "Product",
    nav: [
      { href: "#chat", label: "Live demo" },
      { href: "#menu", label: "Menu" },
      { href: "#how", label: "How it works" },
      { href: "#pricing", label: "Pricing" },
    ],
    contactLabel: "Talk to us",
    hours: "Support Mon to Sun, 9:00 to 23:00",
    socialLabel: "Follow",
    social: [
      { id: "channel", label: "ZapPedido channel", href: "#" },
      { id: "site", label: "zappedido.app", href: "#" },
      { id: "mail", label: "hello@zappedido.app", href: "mailto:hello@zappedido.app" },
    ],
    fine: "ZapPedido is a concept demo by VigApp. Not affiliated with WhatsApp or Meta.",
    credit: "Designed and built by VigApp",
  },
};

/* ------------------------------------------------------------------ */
/* Portuguese                                                         */
/* ------------------------------------------------------------------ */

const pt: ZapContent = {
  currency: { symbol: "R$", position: "before", decimal: ",", space: true },
  header: {
    status: "online",
    nav: [
      { href: "#chat", label: "Demo ao vivo" },
      { href: "#menu", label: "Cardapio" },
      { href: "#how", label: "Como funciona" },
      { href: "#pricing", label: "Planos" },
    ],
    cta: "Quero o ZapPedido",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
  },
  hero: {
    badge: "Pedidos que moram no WhatsApp",
    titleTop: "Sua hamburgueria",
    titleAccent: "a uma conversa",
    titleBottom: "do proximo pedido.",
    lead: "O ZapPedido transforma o WhatsApp do seu restaurante em um balcao completo. O cliente toca em algumas respostas, o pedido se monta sozinho e chega pronto na sua cozinha.",
    ctaPrimary: "Testar a demo",
    ctaSecondary: "Ver planos",
    stats: [
      { value: "40s", label: "pedido medio" },
      { value: "0", label: "apps para baixar" },
      { value: "98%", label: "mensagens abertas" },
    ],
    phoneName: "Smash Lab Burgers",
    phoneStatus: "online",
    todayLabel: "Hoje",
    bubbles: [
      { from: "bot", text: "Oi! Bem-vindo ao Smash Lab. Com fome?" },
      { from: "user", text: "Muita. Um Classic Smash por favor" },
      { from: "bot", text: "Ja anotei. Adiciona bacon defumado por R$ 7?" },
      { from: "user", text: "Pode ser, e batata" },
      { from: "bot", text: "Total R$ 57,80, entrega em Casa em 25 min." },
    ],
  },
  menuItems: [
    {
      id: "classic-smash",
      name: "Classic Smash",
      description: "Dois hamburgueres smash, cheddar derretido, molho da casa e brioche tostado.",
      price: 32.9,
      kind: "burger",
      image: IMG.burger,
      alt: "Hamburguer Classic Smash com cheddar derretido em pao brioche tostado",
      tag: "Mais pedido",
    },
    {
      id: "double-cheddar",
      name: "Double Cheddar Stack",
      description: "Carne dupla, o dobro de cheddar curado, picles e cebola caramelizada.",
      price: 42.9,
      kind: "burger",
      image: IMG.cheeseburger,
      alt: "Cheeseburguer duplo de cheddar montado alto com picles",
      tag: "Escolha do chef",
    },
    {
      id: "crispy-fries",
      name: "Batata Rustica Crocante",
      description: "Batata com casca frita tres vezes, sal marinho e aioli de pimenta defumada.",
      price: 18.9,
      kind: "side",
      image: IMG.fries,
      alt: "Batata rustica dourada com casca em cone de papel com aioli",
    },
    {
      id: "malt-shake",
      name: "Shake de Malte Salgado",
      description: "Milkshake de baunilha com malte, fio de sal marinho, grosso de segurar canudo.",
      price: 21.9,
      kind: "drink",
      image: IMG.shake,
      alt: "Milkshake espesso de malte salgado coberto com creme",
    },
  ],
  extras: [
    { id: "bacon", name: "Bacon defumado", price: 7 },
    { id: "cheese", name: "Cheddar extra", price: 5 },
    { id: "onion", name: "Cebola caramelizada", price: 4 },
    { id: "jalapeno", name: "Jalapenos", price: 4 },
  ],
  addresses: [
    { id: "home", label: "Casa", detail: "Rua das Oliveiras 214, Ap 3B" },
    { id: "work", label: "Trabalho", detail: "Av. do Mercado 88, 5 andar" },
  ],
  payments: [
    { id: "pix", label: "Pix" },
    { id: "card", label: "Cartao na entrega" },
    { id: "cash", label: "Dinheiro" },
  ],
  chat: {
    eyebrow: "Demo ao vivo",
    title: "Peca um hamburguer sem sair da conversa",
    subtitle: "Toque nas respostas. Veja o pedido se montar sozinho. E exatamente o fluxo que o seu cliente recebe.",
    contactName: "Smash Lab Burgers",
    contactStatus: "costuma responder em segundos",
    typingName: "Smash Lab esta digitando",
    quickRepliesLabel: "Respostas rapidas",
    addToChat: "Adicionar na conversa",
    restart: "Comecar novo pedido",
    sendOrder: "Enviar pedido no WhatsApp",
    greeting: "Ola, bem-vindo ao Smash Lab! Toque no que voce esta com vontade e eu ja comeco o seu pedido.",
    askExtras: "Otima escolha. Quer turbinar com algum adicional?",
    extrasDone: "So isso mesmo",
    askAddress: "Delicia. Para onde enviamos?",
    newAddress: "Novo endereco",
    newAddressDetail: "Enviar localizacao na conversa",
    askPayment: "Anotado. Como voce prefere pagar?",
    reviewIntro: "Tudo pronto! Aqui esta o seu pedido, prontinho:",
    panelTitle: "Seu pedido",
    panelEmpty: "Nada por aqui ainda. Toque nas respostas para montar o pedido.",
    labelItem: "Item",
    labelExtras: "Adicionais",
    labelExtrasNone: "Sem adicionais",
    labelAddress: "Entregar em",
    labelPayment: "Pagamento",
    labelTotal: "Total",
    summaryTitle: "Resumo do pedido",
    summaryReady: "Pronto para enviar a cozinha",
    waIntro: "Novo pedido via ZapPedido",
    waItem: "Item",
    waExtras: "Adicionais",
    waAddress: "Entregar em",
    waPayment: "Pagamento",
    waTotal: "Total",
  },
  menuSection: {
    eyebrow: "O cardapio",
    title: "Tudo a um toque de distancia",
    subtitle: "Seu cardapio inteiro vive dentro da conversa. Adicione algo aqui e cai direto no bate-papo.",
    filters: [
      { id: "all", label: "Tudo" },
      { id: "burger", label: "Burgers" },
      { id: "side", label: "Acompanhamentos" },
      { id: "drink", label: "Shakes" },
    ],
    etaLabel: "min",
    addLabel: "Adicionar",
  },
  how: {
    eyebrow: "Para donos de restaurante",
    title: "No ar em uma tarde, sem loja de apps",
    subtitle: "O ZapPedido conecta no numero de WhatsApp que voce ja divulga. Sem equipamento novo, sem download do cliente.",
    steps: [
      { title: "Conecte seu numero", detail: "Ligue o WhatsApp do restaurante em poucos cliques. Mantenha o mesmo numero que seus clientes ja salvam." },
      { title: "Monte seu cardapio", detail: "Adicione itens, precos, adicionais e fotos num painel simples. Mude quando quiser, ate no meio do servico." },
      { title: "O cliente so conversa", detail: "Ele toca nas respostas, o bot monta o pedido e confirma a entrega. Sem formularios, sem atrito." },
      { title: "O pedido chega na cozinha", detail: "Cada pedido cai na sua tela, com horario e preco, pronto para preparar. Imprima, aceite, cozinhe." },
    ],
    note: "Trabalha junto com a sua equipe, nao no lugar dela. Passe para um atendente quando quiser.",
  },
  pricing: {
    eyebrow: "Planos",
    title: "Um plano fixo por restaurante. Sem taxa por pedido.",
    subtitle: "Apps de delivery levam ate 30% de cada pedido. O ZapPedido e um valor mensal fixo, entao a margem continua sua.",
    plans: [
      {
        id: "starter",
        name: "Starter",
        price: "R$ 149",
        period: "/mes",
        tagline: "Para um ponto encontrando o ritmo.",
        features: ["1 numero de WhatsApp", "Ate 300 pedidos / mes", "Cardapio, adicionais e fotos", "Cartao e dinheiro no checkout", "Painel de pedidos"],
        cta: "Testar gratis",
      },
      {
        id: "grill",
        name: "Grill",
        price: "R$ 299",
        period: "/mes",
        tagline: "Para cozinhas cheias que nao param.",
        features: ["Tudo do Starter", "Pedidos ilimitados", "Pagamentos online e Pix", "Pedidos agendados e recorrentes", "Fidelidade e cupons", "Suporte prioritario"],
        cta: "Testar gratis",
        featured: true,
        badge: "Mais popular",
      },
      {
        id: "franchise",
        name: "Franquia",
        price: "R$ 749",
        period: "/mes",
        tagline: "Para grupos com varias unidades.",
        features: ["Tudo do Grill", "Ate 8 unidades", "Controle central de cardapio", "Cargos e turnos da equipe", "Exportar analise de vendas", "Onboarding dedicado"],
        cta: "Falar com vendas",
      },
    ],
    footnote: "Precos em BRL, cobranca mensal. Cancele quando quiser. 14 dias gratis, sem cartao.",
  },
  cta: {
    eyebrow: "Comece agora",
    title: "Transforme seu WhatsApp no caixa mais movimentado",
    body: "Manda uma mensagem que a gente coloca o pedido no estilo Smash Lab rodando no seu proprio numero ainda esta semana. A mesma demo que voce testou, com o seu cardapio.",
    primary: "Quero o ZapPedido no WhatsApp",
    secondary: "Testar a demo de novo",
    waMessage: "Ola equipe ZapPedido! Tenho um restaurante e quero pedidos no WhatsApp como na demo. Conseguem configurar para a gente?",
    bullets: ["No ar em uma unica tarde", "Fique com 100% de cada pedido", "Cancele quando quiser, sem amarras"],
  },
  footer: {
    tagline: "Pedidos que moram onde seus clientes ja estao.",
    navLabel: "Produto",
    nav: [
      { href: "#chat", label: "Demo ao vivo" },
      { href: "#menu", label: "Cardapio" },
      { href: "#how", label: "Como funciona" },
      { href: "#pricing", label: "Planos" },
    ],
    contactLabel: "Fale com a gente",
    hours: "Suporte de seg a dom, 9:00 as 23:00",
    socialLabel: "Siga",
    social: [
      { id: "channel", label: "Canal ZapPedido", href: "#" },
      { id: "site", label: "zappedido.app", href: "#" },
      { id: "mail", label: "ola@zappedido.app", href: "mailto:ola@zappedido.app" },
    ],
    fine: "ZapPedido e uma demo conceitual da VigApp. Sem vinculo com o WhatsApp ou a Meta.",
    credit: "Projetado e construido pela VigApp",
  },
};

/* ------------------------------------------------------------------ */
/* Spanish                                                            */
/* ------------------------------------------------------------------ */

const es: ZapContent = {
  currency: { symbol: "€", position: "after", decimal: ",", space: true },
  header: {
    status: "en linea",
    nav: [
      { href: "#chat", label: "Demo en vivo" },
      { href: "#menu", label: "Menu" },
      { href: "#how", label: "Como funciona" },
      { href: "#pricing", label: "Precios" },
    ],
    cta: "Quiero ZapPedido",
    openMenu: "Abrir menu",
    closeMenu: "Cerrar menu",
  },
  hero: {
    badge: "Pedidos que viven en WhatsApp",
    titleTop: "Tu hamburgueseria,",
    titleAccent: "a un chat",
    titleBottom: "de la proxima cena.",
    lead: "ZapPedido convierte el WhatsApp de tu restaurante en un mostrador completo. El cliente toca unas respuestas, el pedido se arma solo y llega listo a tu cocina.",
    ctaPrimary: "Probar la demo",
    ctaSecondary: "Ver precios",
    stats: [
      { value: "40s", label: "pedido medio" },
      { value: "0", label: "apps que instalar" },
      { value: "98%", label: "mensajes abiertos" },
    ],
    phoneName: "Smash Lab Burgers",
    phoneStatus: "en linea",
    todayLabel: "Hoy",
    bubbles: [
      { from: "bot", text: "Hola! Bienvenido a Smash Lab. Con hambre?" },
      { from: "user", text: "Mucha. Una Classic Smash por favor" },
      { from: "bot", text: "Anotado. Le pongo bacon ahumado por 2 €?" },
      { from: "user", text: "Va, y patatas" },
      { from: "bot", text: "Total 16,00 €, entrega en Casa en 25 min." },
    ],
  },
  menuItems: [
    {
      id: "classic-smash",
      name: "Classic Smash",
      description: "Dos carnes smash, cheddar fundido, salsa de la casa y brioche tostado.",
      price: 9.5,
      kind: "burger",
      image: IMG.burger,
      alt: "Hamburguesa Classic Smash con cheddar fundido en pan brioche tostado",
      tag: "La mas pedida",
    },
    {
      id: "double-cheddar",
      name: "Double Cheddar Stack",
      description: "Doble carne, doble cheddar curado, pepinillos y cebolla caramelizada.",
      price: 12,
      kind: "burger",
      image: IMG.cheeseburger,
      alt: "Hamburguesa doble de cheddar apilada alta con pepinillos",
      tag: "Eleccion del chef",
    },
    {
      id: "crispy-fries",
      name: "Patatas Rusticas Crujientes",
      description: "Patata con piel frita tres veces, sal marina y alioli de pimenton ahumado.",
      price: 4.9,
      kind: "side",
      image: IMG.fries,
      alt: "Patatas rusticas doradas con piel en cono de papel con alioli",
    },
    {
      id: "malt-shake",
      name: "Batido de Malta Salada",
      description: "Batido de vainilla con malta, hilo de sal marina, tan espeso que sostiene la pajita.",
      price: 5.9,
      kind: "drink",
      image: IMG.shake,
      alt: "Batido espeso de malta salada coronado con crema",
    },
  ],
  extras: [
    { id: "bacon", name: "Bacon ahumado", price: 2 },
    { id: "cheese", name: "Cheddar extra", price: 1.5 },
    { id: "onion", name: "Cebolla caramelizada", price: 1 },
    { id: "jalapeno", name: "Jalapenos", price: 1 },
  ],
  addresses: [
    { id: "home", label: "Casa", detail: "Calle Robledo 214, 3B" },
    { id: "work", label: "Trabajo", detail: "Av. del Mercado 88, planta 5" },
  ],
  payments: [
    { id: "card", label: "Tarjeta al entregar" },
    { id: "online", label: "Pago online" },
    { id: "cash", label: "Efectivo" },
  ],
  chat: {
    eyebrow: "Demo en vivo",
    title: "Pide una hamburguesa sin salir del chat",
    subtitle: "Toca las respuestas. Mira como el pedido se arma solo. Es justo el flujo que recibe tu cliente.",
    contactName: "Smash Lab Burgers",
    contactStatus: "suele responder en segundos",
    typingName: "Smash Lab esta escribiendo",
    quickRepliesLabel: "Respuestas rapidas",
    addToChat: "Anadir al chat",
    restart: "Empezar otro pedido",
    sendOrder: "Enviar pedido por WhatsApp",
    greeting: "Hola, bienvenido a Smash Lab! Toca lo que te apetece y empiezo tu pedido.",
    askExtras: "Buena eleccion. Quieres reforzarla con algun extra?",
    extrasDone: "Eso es todo",
    askAddress: "Riquisimo. A donde lo enviamos?",
    newAddress: "Nueva direccion",
    newAddressDetail: "Compartir ubicacion en el chat",
    askPayment: "Perfecto. Como prefieres pagar?",
    reviewIntro: "Todo listo! Aqui esta tu pedido, a punto:",
    panelTitle: "Tu pedido",
    panelEmpty: "Nada aun. Toca las respuestas para armar tu pedido.",
    labelItem: "Articulo",
    labelExtras: "Extras",
    labelExtrasNone: "Sin extras",
    labelAddress: "Enviar a",
    labelPayment: "Pago",
    labelTotal: "Total",
    summaryTitle: "Resumen del pedido",
    summaryReady: "Listo para enviar a cocina",
    waIntro: "Nuevo pedido via ZapPedido",
    waItem: "Articulo",
    waExtras: "Extras",
    waAddress: "Enviar a",
    waPayment: "Pago",
    waTotal: "Total",
  },
  menuSection: {
    eyebrow: "El menu",
    title: "Todo a un toque de distancia",
    subtitle: "Tu menu entero vive dentro del chat. Anade algo aqui y cae directo en la conversacion.",
    filters: [
      { id: "all", label: "Todo" },
      { id: "burger", label: "Hamburguesas" },
      { id: "side", label: "Acompanantes" },
      { id: "drink", label: "Batidos" },
    ],
    etaLabel: "min",
    addLabel: "Anadir",
  },
  how: {
    eyebrow: "Para duenos de restaurante",
    title: "En marcha en una tarde, sin tienda de apps",
    subtitle: "ZapPedido se conecta al numero de WhatsApp que ya repartes. Sin hardware nuevo, sin descargas del cliente.",
    steps: [
      { title: "Conecta tu numero", detail: "Enlaza el WhatsApp del restaurante en unos clics. Manten el mismo numero que tus clientes ya guardan." },
      { title: "Arma tu menu", detail: "Anade platos, precios, extras y fotos en un panel sencillo. Cambialo cuando quieras, incluso en pleno servicio." },
      { title: "El cliente solo chatea", detail: "Toca las respuestas, el bot arma el pedido y confirma la entrega. Sin formularios, sin friccion." },
      { title: "El pedido llega a cocina", detail: "Cada pedido cae en tu pantalla, con hora y precio, listo para preparar. Imprime, acepta, cocina." },
    ],
    note: "Trabaja junto a tu equipo, no en su lugar. Pasa a una persona cuando quieras.",
  },
  pricing: {
    eyebrow: "Precios",
    title: "Un plan fijo por restaurante. Sin comision por pedido.",
    subtitle: "Las apps de delivery se llevan hasta el 30% de cada pedido. ZapPedido es una cuota mensual fija, asi el margen sigue siendo tuyo.",
    plans: [
      {
        id: "starter",
        name: "Starter",
        price: "35 €",
        period: "/mes",
        tagline: "Para un local que encuentra su ritmo.",
        features: ["1 numero de WhatsApp", "Hasta 300 pedidos / mes", "Menu, extras y fotos", "Tarjeta y efectivo en el pago", "Panel de pedidos"],
        cta: "Prueba gratis",
      },
      {
        id: "grill",
        name: "Grill",
        price: "79 €",
        period: "/mes",
        tagline: "Para cocinas llenas que no paran.",
        features: ["Todo lo de Starter", "Pedidos ilimitados", "Pagos online integrados", "Pedidos programados y repetidos", "Fidelidad y cupones", "Soporte prioritario"],
        cta: "Prueba gratis",
        featured: true,
        badge: "El mas elegido",
      },
      {
        id: "franchise",
        name: "Franquicia",
        price: "199 €",
        period: "/mes",
        tagline: "Para grupos con varias sedes.",
        features: ["Todo lo de Grill", "Hasta 8 sedes", "Control central del menu", "Roles y turnos de equipo", "Exportar analitica de ventas", "Onboarding dedicado"],
        cta: "Hablar con ventas",
      },
    ],
    footnote: "Precios en EUR, facturacion mensual. Cancela cuando quieras. 14 dias gratis, sin tarjeta.",
  },
  cta: {
    eyebrow: "Empieza ya",
    title: "Convierte tu WhatsApp en tu cajero mas ocupado",
    body: "Escribenos y esta misma semana tendras los pedidos estilo Smash Lab funcionando en tu propio numero. La misma demo que probaste, con tu menu dentro.",
    primary: "Quiero ZapPedido por WhatsApp",
    secondary: "Probar la demo otra vez",
    waMessage: "Hola equipo ZapPedido! Tengo un restaurante y quiero pedidos por WhatsApp como en la demo. Me lo podeis configurar?",
    bullets: ["En marcha en una sola tarde", "Quedate con el 100% de cada pedido", "Cancela cuando quieras, sin ataduras"],
  },
  footer: {
    tagline: "Pedidos que viven donde tus clientes ya estan.",
    navLabel: "Producto",
    nav: [
      { href: "#chat", label: "Demo en vivo" },
      { href: "#menu", label: "Menu" },
      { href: "#how", label: "Como funciona" },
      { href: "#pricing", label: "Precios" },
    ],
    contactLabel: "Hablanos",
    hours: "Soporte de lun a dom, 9:00 a 23:00",
    socialLabel: "Sigue",
    social: [
      { id: "channel", label: "Canal ZapPedido", href: "#" },
      { id: "site", label: "zappedido.app", href: "#" },
      { id: "mail", label: "hola@zappedido.app", href: "mailto:hola@zappedido.app" },
    ],
    fine: "ZapPedido es una demo conceptual de VigApp. Sin relacion con WhatsApp ni Meta.",
    credit: "Disenado y construido por VigApp",
  },
};

export const zapDict: DemoDictionary<ZapContent> = { en, pt, es };
