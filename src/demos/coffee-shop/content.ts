import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type DrinkCategoryId = "espresso" | "filter" | "seasonal";
export type BrewMethodId = "v60" | "aeropress" | "espresso";

export interface Drink {
  name: string;
  description: string;
  price: string;
  tag?: string;
}

export interface DrinkCategory {
  id: DrinkCategoryId;
  label: string;
  note: string;
  drinks: Drink[];
}

export interface OriginCardContent {
  id: string;
  country: string;
  region: string;
  producer: string;
  altitude: string;
  process: string;
  varietal: string;
  roast: string;
  notes: string[];
  story: string;
}

export interface BrewStep {
  title: string;
  detail: string;
  clock: string;
}

export interface BrewMethod {
  id: BrewMethodId;
  label: string;
  tagline: string;
  ratio: string;
  temp: string;
  time: string;
  grind: string;
  steps: BrewStep[];
}

export interface SizeOption {
  id: string;
  label: string;
  cups: string;
  pricePerDelivery: number;
}

export interface FrequencyOption {
  id: string;
  label: string;
  deliveriesPerMonth: number;
  discountPct: number;
  note: string;
}

export interface HeaderContent {
  nav: { href: string; label: string }[];
  cta: string;
  openMenu: string;
  closeMenu: string;
}

export interface HeroContent {
  kicker: string;
  taglineTop: string;
  taglineItalic: string;
  taglineBottom: string;
  sub: string;
  ctaMenu: string;
  ctaSub: string;
  imageAlt: string;
  badge: string;
  facts: { value: string; label: string }[];
}

export interface MenuContent {
  label: string;
  title: string;
  intro: string;
  imageAlt: string;
  footnote: string;
  categories: DrinkCategory[];
}

export interface OriginsContent {
  label: string;
  title: string;
  intro: string;
  flipHint: string;
  backHint: string;
  notesLabel: string;
  fields: { producer: string; altitude: string; process: string; varietal: string };
  cards: OriginCardContent[];
}

export interface BrewContent {
  label: string;
  title: string;
  intro: string;
  imageAlt: string;
  stepCount: string;
  jumpTo: string;
  params: { ratio: string; temp: string; time: string; grind: string };
  next: string;
  back: string;
  restart: string;
  doneTitle: string;
  doneBody: string;
  methods: BrewMethod[];
}

export interface SubscriptionContent {
  label: string;
  title: string;
  intro: string;
  imageAlt: string;
  sizeLabel: string;
  freqLabel: string;
  perDelivery: string;
  perMonth: string;
  includes: string[];
  cta: string;
  successTitle: string;
  successBody: string;
  yourPlan: string;
  reset: string;
  sizes: SizeOption[];
  frequencies: FrequencyOption[];
  priceLocale: string;
  currency: string;
}

export interface VisitContent {
  label: string;
  title: string;
  intro: string;
  imageAlt: string;
  addressLabel: string;
  addressLines: string[];
  hoursLabel: string;
  hours: { days: string; time: string }[];
  contactLabel: string;
  phone: string;
  email: string;
  instagram: string;
  directionsCta: string;
  quote: string;
  quoteAuthor: string;
}

export interface FooterContent {
  tagline: string;
  navLabel: string;
  visitLabel: string;
  followLabel: string;
  nav: { href: string; label: string }[];
  addressLines: string[];
  hoursNote: string;
  instagram: string;
  email: string;
  fine: string;
  credit: string;
}

export interface TerraContent {
  header: HeaderContent;
  hero: HeroContent;
  menu: MenuContent;
  origins: OriginsContent;
  brew: BrewContent;
  subscription: SubscriptionContent;
  visit: VisitContent;
  footer: FooterContent;
}

/* ------------------------------------------------------------------ */
/* Dictionary                                                          */
/* ------------------------------------------------------------------ */

export const terraDict: DemoDictionary<TerraContent> = {
  en: {
    header: {
      nav: [
        { href: "#menu", label: "Menu" },
        { href: "#origins", label: "Origins" },
        { href: "#brew", label: "Brew guide" },
        { href: "#visit", label: "Visit" },
      ],
      cta: "Subscribe",
      openMenu: "Open navigation",
      closeMenu: "Close navigation",
    },
    hero: {
      kicker: "Specialty coffee · Slow living",
      taglineTop: "Mornings move",
      taglineItalic: "at the speed",
      taglineBottom: "of steam.",
      sub: "Terra Café is a slow-living coffee house in Vila Madalena, São Paulo. We roast single-origin lots from Ethiopia, Colombia and Brazil — and pour every cup as if time were an ingredient.",
      ctaMenu: "See the menu",
      ctaSub: "Subscribe to beans",
      imageAlt: "A flat white with latte art resting on the Terra Café counter",
      badge: "TERRA CAFÉ · SÃO PAULO · EST. 2017 · ",
      facts: [
        { value: "2017", label: "roasting in Vila Madalena since" },
        { value: "3", label: "origins in rotation every season" },
        { value: "94 pts", label: "our highest-scoring lot to date" },
      ],
    },
    menu: {
      label: "The menu",
      title: "What the bar is pouring",
      intro: "Espresso pulled on a two-group Linea, filters brewed to order, and a seasonal list that follows the harvest — not the calendar.",
      imageAlt: "Pastries and fresh coffee arranged on a café table",
      footnote: "Every milk drink is also available with oat or macadamia milk at no extra charge.",
      categories: [
        {
          id: "espresso",
          label: "Espresso bar",
          note: "Pulled on the Linea PB — 18 g in, 36 g out.",
          drinks: [
            { name: "Terra Espresso", description: "House blend of Catuaí and Mundo Novo — cocoa body, burnt-sugar finish.", price: "$3.50", tag: "house favorite" },
            { name: "Cortado", description: "A double shot and steamed milk in equal parts, served warm — never scalding.", price: "$4.25" },
            { name: "Flat White", description: "Ristretto base under a sheet of velvet microfoam.", price: "$4.75" },
            { name: "Terra Mocha", description: "Espresso, 70% Bahia cacao and a cloud of oat foam.", price: "$5.50" },
          ],
        },
        {
          id: "filter",
          label: "Filter",
          note: "Brewed to order, one cup at a time.",
          drinks: [
            { name: "V60 of the Day", description: "A rotating single origin — ask the bar for this week's lot.", price: "$5.00", tag: "rotating" },
            { name: "AeroPress", description: "Dense and sweet, pressed at 88°C for a rounder cup.", price: "$4.75" },
            { name: "Batch Brew", description: "Our everyday filter: balanced, generous, always ready.", price: "$3.75" },
            { name: "Cold Brew", description: "Steeped for 18 hours, served black or over tonic.", price: "$5.25" },
          ],
        },
        {
          id: "seasonal",
          label: "Seasonal",
          note: "Winter in São Paulo — here while July lasts.",
          drinks: [
            { name: "Cascara Tonic", description: "Coffee-cherry syrup, tonic water and a twist of orange peel.", price: "$6.00", tag: "limited" },
            { name: "Rapadura Latte", description: "Espresso with raw cane sugar from Minas and silky milk.", price: "$5.75" },
            { name: "Spiced Honey Cappuccino", description: "Cinnamon, clove and orange-blossom honey folded into the foam.", price: "$5.50" },
            { name: "Affogato Cerrado", description: "A double espresso poured over vanilla-bean gelato.", price: "$6.50" },
          ],
        },
      ],
    },
    origins: {
      label: "Bean origins",
      title: "Three soils, one counter",
      intro: "Every bag we roast is traceable to a farm gate. Flip a card to read the cup the way we taste it.",
      flipHint: "Tasting notes",
      backHint: "Back to the farm",
      notesLabel: "Tasting notes",
      fields: { producer: "Producer", altitude: "Altitude", process: "Process", varietal: "Varietal" },
      cards: [
        {
          id: "ethiopia",
          country: "Ethiopia",
          region: "Gedeb, Yirgacheffe",
          producer: "Konga cooperative — Halo Beriti station",
          altitude: "1,900–2,200 m",
          process: "Washed",
          varietal: "Heirloom 74110",
          roast: "Light roast",
          notes: ["Jasmine", "Bergamot", "Apricot", "Black tea"],
          story: "Six hundred families deliver cherry to the Halo Beriti station, where it ferments for 48 hours in spring water. The cup is weightless and floral — the reason half our team fell for coffee in the first place.",
        },
        {
          id: "colombia",
          country: "Colombia",
          region: "Pitalito, Huila",
          producer: "Luz Marina Ordóñez — Finca El Mirador",
          altitude: "1,750 m",
          process: "Honey",
          varietal: "Pink Bourbon",
          roast: "Light-medium roast",
          notes: ["Panela", "Red plum", "Mandarin", "Cacao nib"],
          story: "Luz Marina dries her Pink Bourbon on raised beds for 22 slow days. What arrives is syrup-sweet and bright at once — guests who order it as espresso tend to order it twice.",
        },
        {
          id: "brazil",
          country: "Brazil",
          region: "Carmo de Minas, Minas Gerais",
          producer: "Família Andrade — Sítio Boa Vista",
          altitude: "1,150 m",
          process: "Natural",
          varietal: "Yellow Catuaí",
          roast: "Medium roast",
          notes: ["Hazelnut", "Milk chocolate", "Dried fig", "Molasses"],
          story: "Three generations of the Andrade family have farmed this hillside. Their natural Catuaí is our comfort coffee: round, chocolatey and impossible to argue with.",
        },
      ],
    },
    brew: {
      label: "Brew guide",
      title: "Brew it like we do",
      intro: "The recipes taped to our bar, step by step. Pick a method and take your time — the timer is a suggestion, the final swirl is not.",
      imageAlt: "Hot water being poured in circles over a V60 filter",
      stepCount: "Step {n} of {total}",
      jumpTo: "Go to step {n}",
      params: { ratio: "Ratio", temp: "Water", time: "Total time", grind: "Grind" },
      next: "Next step",
      back: "Previous step",
      restart: "Start over",
      doneTitle: "Cup ready.",
      doneBody: "Let it cool for a minute before the first sip — the sweetness arrives as the temperature drops.",
      methods: [
        {
          id: "v60",
          label: "V60",
          tagline: "Clean, floral, transparent",
          ratio: "1:16 — 15 g : 240 ml",
          temp: "94°C",
          time: "3:00",
          grind: "Medium-fine",
          steps: [
            { title: "Rinse and warm", detail: "Fold the paper seam, rinse it with hot water and discard. A warm brewer keeps the bloom honest.", clock: "0:00" },
            { title: "Bloom", detail: "Pour 45 ml in slow circles and wait. Fresh coffee will dome and bubble as it releases CO2.", clock: "0:45" },
            { title: "First pour", detail: "Pour to 150 ml in a steady spiral, center outward. Keep the kettle low and unhurried.", clock: "1:15" },
            { title: "Second pour", detail: "Top up to 240 ml along the edges to wash grounds off the wall of the filter.", clock: "1:45" },
            { title: "Swirl and draw down", detail: "One gentle swirl to flatten the bed. Aim to finish dripping right around three minutes.", clock: "3:00" },
          ],
        },
        {
          id: "aeropress",
          label: "AeroPress",
          tagline: "Sweet, dense, forgiving",
          ratio: "1:13 — 14 g : 180 ml",
          temp: "88°C",
          time: "2:30",
          grind: "Fine-medium",
          steps: [
            { title: "Set and rinse", detail: "Standard orientation, filter rinsed, brewer sitting on a sturdy mug or server.", clock: "0:00" },
            { title: "Coffee in, water in", detail: "Add 14 g of coffee, then all 180 ml of water in one confident pour.", clock: "0:20" },
            { title: "Stir and steep", detail: "Three gentle stirs, cap on, and let it sit. Patience is the whole recipe here.", clock: "1:30" },
            { title: "Press", detail: "Press with your body weight for about 30 seconds. Stop at the first hiss.", clock: "2:00" },
            { title: "Open it up", detail: "Taste, then add hot water to open the cup if it drinks too dense.", clock: "2:30" },
          ],
        },
        {
          id: "espresso",
          label: "Espresso",
          tagline: "Syrupy, intense, exact",
          ratio: "1:2 — 18 g : 36 g",
          temp: "93°C",
          time: "0:28",
          grind: "Fine",
          steps: [
            { title: "Dose and distribute", detail: "18 g into the basket, ground fine. Level the bed with light taps — no craters.", clock: "0:00" },
            { title: "Tamp once, level", detail: "One firm, level tamp. Being flat matters far more than pressing hard.", clock: "0:05" },
            { title: "Pull the shot", detail: "Lock in and start right away. First drops should fall around six seconds in.", clock: "0:10" },
            { title: "Watch the flow", detail: "You want a slow honey stream, tapering blonde right around 36 g out.", clock: "0:28" },
            { title: "Taste and adjust", detail: "Sour means grind finer; bitter and hollow means coarser. Change one thing at a time.", clock: "0:45" },
          ],
        },
      ],
    },
    subscription: {
      label: "Bean subscription",
      title: "Beans that arrive before you run out",
      intro: "Build your plan in two moves. We roast on Mondays and ship within 48 hours, so your kitchen never smells like an empty jar.",
      imageAlt: "Freshly roasted coffee beans resting in a cooling tray",
      sizeLabel: "Bag size",
      freqLabel: "Delivery rhythm",
      perDelivery: "per delivery",
      perMonth: "per month",
      includes: [
        "Roasted to order every Monday",
        "Free shipping nationwide",
        "Rotating origin — or lock in your favorite",
        "Pause, skip or cancel anytime",
      ],
      cta: "Start my subscription",
      successTitle: "Welcome to the roast list.",
      successBody: "Order TC-2417 is confirmed. Your first bag leaves the roastery on Monday with a brew card tucked inside.",
      yourPlan: "Your plan",
      reset: "Build a different plan",
      sizes: [
        { id: "250", label: "250 g", cups: "± 15 cups", pricePerDelivery: 18 },
        { id: "500", label: "500 g", cups: "± 30 cups", pricePerDelivery: 32 },
        { id: "1000", label: "1 kg", cups: "± 60 cups", pricePerDelivery: 58 },
      ],
      frequencies: [
        { id: "weekly", label: "Every week", deliveriesPerMonth: 4, discountPct: 15, note: "Save 15%" },
        { id: "biweekly", label: "Every 2 weeks", deliveriesPerMonth: 2, discountPct: 10, note: "Save 10%" },
        { id: "monthly", label: "Once a month", deliveriesPerMonth: 1, discountPct: 0, note: "The classic" },
      ],
      priceLocale: "en-US",
      currency: "USD",
    },
    visit: {
      label: "Visit us",
      title: "Find the counter",
      intro: "A corner house with winter sun in the morning, one long communal table and the espresso machine facing the street.",
      imageAlt: "Morning light falling across the Terra Café espresso bar",
      addressLabel: "Address",
      addressLines: ["Rua Harmonia 456 — Vila Madalena", "São Paulo, SP 05435-000, Brazil"],
      hoursLabel: "Hours",
      hours: [
        { days: "Mon – Fri", time: "8:00 – 19:00" },
        { days: "Saturday", time: "9:00 – 20:00" },
        { days: "Sunday", time: "9:00 – 15:00" },
      ],
      contactLabel: "Say hello",
      phone: "+55 11 3810-2247",
      email: "ola@terracafe.com.br",
      instagram: "@terracafe.vm",
      directionsCta: "Open in maps",
      quote: "I plan my Saturdays around this counter. The flat white reset my standards for good.",
      quoteAuthor: "Camila Ferraz — regular since 2019",
    },
    footer: {
      tagline: "Slow coffee, roasted in Vila Madalena.",
      navLabel: "Explore",
      visitLabel: "Visit",
      followLabel: "Follow",
      nav: [
        { href: "#menu", label: "Menu" },
        { href: "#origins", label: "Origins" },
        { href: "#brew", label: "Brew guide" },
        { href: "#subscription", label: "Subscription" },
        { href: "#visit", label: "Visit" },
      ],
      addressLines: ["Rua Harmonia 456 — Vila Madalena", "São Paulo, SP — Brazil"],
      hoursNote: "Open every day from 8:00",
      instagram: "@terracafe.vm",
      email: "ola@terracafe.com.br",
      fine: "Terra Café is a fictional brand imagined as a design concept. Prices and lots are illustrative.",
      credit: "Concept, design and build by VigApp.",
    },
  },

  pt: {
    header: {
      nav: [
        { href: "#menu", label: "Cardápio" },
        { href: "#origins", label: "Origens" },
        { href: "#brew", label: "Métodos" },
        { href: "#visit", label: "Visite-nos" },
      ],
      cta: "Assinar",
      openMenu: "Abrir navegação",
      closeMenu: "Fechar navegação",
    },
    hero: {
      kicker: "Café especial · Vida lenta",
      taglineTop: "A manhã anda",
      taglineItalic: "no ritmo",
      taglineBottom: "do vapor.",
      sub: "O Terra Café é uma casa de café e vida lenta na Vila Madalena, em São Paulo. Torramos lotes de origem única da Etiópia, da Colômbia e do Brasil — e servimos cada xícara como se o tempo fosse um ingrediente.",
      ctaMenu: "Ver o cardápio",
      ctaSub: "Assinar grãos",
      imageAlt: "Flat white com latte art sobre o balcão do Terra Café",
      badge: "TERRA CAFÉ · SÃO PAULO · DESDE 2017 · ",
      facts: [
        { value: "2017", label: "torrando na Vila Madalena desde" },
        { value: "3", label: "origens em rotação a cada estação" },
        { value: "94 pts", label: "nosso lote mais bem pontuado" },
      ],
    },
    menu: {
      label: "O cardápio",
      title: "O que está saindo no balcão",
      intro: "Espresso extraído numa Linea de dois grupos, coados passados na hora e uma lista sazonal que segue a colheita — não o calendário.",
      imageAlt: "Pães e cafés recém-passados arrumados na mesa do café",
      footnote: "Toda bebida com leite também sai com aveia ou macadâmia, sem custo extra.",
      categories: [
        {
          id: "espresso",
          label: "Balcão de espresso",
          note: "Extraído na Linea PB — 18 g de pó, 36 g na xícara.",
          drinks: [
            { name: "Terra Espresso", description: "Blend da casa de Catuaí e Mundo Novo — corpo de cacau, final de açúcar queimado.", price: "R$ 10", tag: "queridinho da casa" },
            { name: "Cortado", description: "Dose dupla e leite vaporizado em partes iguais, servido morno — nunca fervendo.", price: "R$ 12" },
            { name: "Flat White", description: "Base de ristretto sob um véu de microespuma aveludada.", price: "R$ 14" },
            { name: "Terra Mocha", description: "Espresso, cacau 70% da Bahia e uma nuvem de espuma de aveia.", price: "R$ 16" },
          ],
        },
        {
          id: "filter",
          label: "Coados",
          note: "Passados na hora, uma xícara por vez.",
          drinks: [
            { name: "V60 do Dia", description: "Origem única em rotação — pergunte no balcão qual é o lote da semana.", price: "R$ 15", tag: "em rotação" },
            { name: "AeroPress", description: "Denso e doce, prensado a 88°C para uma xícara mais redonda.", price: "R$ 14" },
            { name: "Batch Brew", description: "Nosso coado de todo dia: equilibrado, generoso, sempre pronto.", price: "R$ 11" },
            { name: "Cold Brew", description: "18 horas de infusão a frio; servido puro ou com tônica.", price: "R$ 15" },
          ],
        },
        {
          id: "seasonal",
          label: "Sazonais",
          note: "Inverno paulistano — aqui enquanto julho durar.",
          drinks: [
            { name: "Tônica de Cascara", description: "Xarope da casca do café, água tônica e um twist de laranja.", price: "R$ 18", tag: "edição limitada" },
            { name: "Latte de Rapadura", description: "Espresso com rapadura de Minas e leite sedoso.", price: "R$ 17" },
            { name: "Cappuccino de Mel e Especiarias", description: "Canela, cravo e mel de flor de laranjeira dobrados na espuma.", price: "R$ 16" },
            { name: "Affogato do Cerrado", description: "Espresso duplo sobre gelato de fava de baunilha.", price: "R$ 19" },
          ],
        },
      ],
    },
    origins: {
      label: "Origem dos grãos",
      title: "Três terras, um balcão",
      intro: "Cada saca que torramos é rastreável até a porteira da fazenda. Vire um cartão para ler a xícara do jeito que a gente prova.",
      flipHint: "Notas de prova",
      backHint: "Voltar para a fazenda",
      notesLabel: "Notas de prova",
      fields: { producer: "Produtor", altitude: "Altitude", process: "Processo", varietal: "Varietal" },
      cards: [
        {
          id: "ethiopia",
          country: "Etiópia",
          region: "Gedeb, Yirgacheffe",
          producer: "Cooperativa de Konga — estação Halo Beriti",
          altitude: "1.900–2.200 m",
          process: "Lavado",
          varietal: "Heirloom 74110",
          roast: "Torra clara",
          notes: ["Jasmim", "Bergamota", "Damasco", "Chá preto"],
          story: "Seiscentas famílias entregam cereja na estação Halo Beriti, onde o café fermenta por 48 horas em água de nascente. A xícara é leve e floral — o motivo pelo qual metade da equipe se apaixonou por café.",
        },
        {
          id: "colombia",
          country: "Colômbia",
          region: "Pitalito, Huila",
          producer: "Luz Marina Ordóñez — Finca El Mirador",
          altitude: "1.750 m",
          process: "Honey",
          varietal: "Bourbon Rosado",
          roast: "Torra clara-média",
          notes: ["Rapadura", "Ameixa vermelha", "Tangerina", "Nibs de cacau"],
          story: "Luz Marina seca seu Bourbon Rosado em camas suspensas por 22 dias lentos. O que chega é doce como calda e vibrante ao mesmo tempo — quem pede no espresso costuma pedir duas vezes.",
        },
        {
          id: "brazil",
          country: "Brasil",
          region: "Carmo de Minas, Minas Gerais",
          producer: "Família Andrade — Sítio Boa Vista",
          altitude: "1.150 m",
          process: "Natural",
          varietal: "Catuaí Amarelo",
          roast: "Torra média",
          notes: ["Avelã", "Chocolate ao leite", "Figo seco", "Melado"],
          story: "Três gerações da família Andrade cultivam essa encosta. O Catuaí natural deles é o nosso café de conforto: redondo, achocolatado e impossível de discutir.",
        },
      ],
    },
    brew: {
      label: "Guia de preparo",
      title: "Prepare como a gente",
      intro: "As receitas coladas no nosso balcão, passo a passo. Escolha um método e vá sem pressa — o cronômetro é sugestão, o giro final não é.",
      imageAlt: "Água quente sendo despejada em círculos sobre um filtro V60",
      stepCount: "Passo {n} de {total}",
      jumpTo: "Ir para o passo {n}",
      params: { ratio: "Proporção", temp: "Água", time: "Tempo total", grind: "Moagem" },
      next: "Próximo passo",
      back: "Passo anterior",
      restart: "Recomeçar",
      doneTitle: "Xícara pronta.",
      doneBody: "Espere um minuto antes do primeiro gole — a doçura chega quando a temperatura cai.",
      methods: [
        {
          id: "v60",
          label: "V60",
          tagline: "Limpo, floral, transparente",
          ratio: "1:16 — 15 g : 240 ml",
          temp: "94°C",
          time: "3:00",
          grind: "Média-fina",
          steps: [
            { title: "Escalde e aqueça", detail: "Dobre a costura do papel, escalde com água quente e descarte. Suporte aquecido faz um bloom honesto.", clock: "0:00" },
            { title: "Bloom", detail: "Despeje 45 ml em círculos lentos e espere. Café fresco cresce e borbulha enquanto libera CO2.", clock: "0:45" },
            { title: "Primeiro despejo", detail: "Complete até 150 ml numa espiral constante, do centro para fora. Chaleira baixa, sem pressa.", clock: "1:15" },
            { title: "Segundo despejo", detail: "Suba até 240 ml pelas bordas para lavar o pó da parede do filtro.", clock: "1:45" },
            { title: "Gire e deixe descer", detail: "Um giro suave para nivelar a cama de café. A ideia é terminar perto dos três minutos.", clock: "3:00" },
          ],
        },
        {
          id: "aeropress",
          label: "AeroPress",
          tagline: "Doce, denso, tolerante",
          ratio: "1:13 — 14 g : 180 ml",
          temp: "88°C",
          time: "2:30",
          grind: "Fina-média",
          steps: [
            { title: "Monte e escalde", detail: "Posição tradicional, filtro escaldado, prensa apoiada numa caneca firme.", clock: "0:00" },
            { title: "Café e água", detail: "Adicione 14 g de café e os 180 ml de água num despejo só, decidido.", clock: "0:20" },
            { title: "Misture e espere", detail: "Três mexidas suaves, tampa rosqueada e calma. A receita aqui é esperar.", clock: "1:30" },
            { title: "Pressione", detail: "Pressione com o peso do corpo por uns 30 segundos. Pare no primeiro chiado.", clock: "2:00" },
            { title: "Abra a xícara", detail: "Prove e, se vier densa demais, abra com um pouco de água quente.", clock: "2:30" },
          ],
        },
        {
          id: "espresso",
          label: "Espresso",
          tagline: "Xaroposo, intenso, exato",
          ratio: "1:2 — 18 g : 36 g",
          temp: "93°C",
          time: "0:28",
          grind: "Fina",
          steps: [
            { title: "Dose e distribua", detail: "18 g no filtro, moagem fina. Nivele o pó com batidinhas leves — sem crateras.", clock: "0:00" },
            { title: "Tampe uma vez, reto", detail: "Um tamper firme e nivelado. Estar plano importa mais do que a força.", clock: "0:05" },
            { title: "Extraia", detail: "Encaixe e acione na hora. As primeiras gotas devem cair por volta dos seis segundos.", clock: "0:10" },
            { title: "Observe o fluxo", detail: "Procure um fio de mel lento, clareando perto dos 36 g na balança.", clock: "0:28" },
            { title: "Prove e ajuste", detail: "Azedo pede moagem mais fina; amargo e oco, mais grossa. Mude uma coisa por vez.", clock: "0:45" },
          ],
        },
      ],
    },
    subscription: {
      label: "Assinatura de grãos",
      title: "Grãos que chegam antes de acabar",
      intro: "Monte seu plano em dois toques. Torramos às segundas e despachamos em até 48 horas — sua cozinha nunca mais com cheiro de pote vazio.",
      imageAlt: "Grãos de café recém-torrados descansando na bandeja de resfriamento",
      sizeLabel: "Tamanho do pacote",
      freqLabel: "Ritmo de entrega",
      perDelivery: "por entrega",
      perMonth: "por mês",
      includes: [
        "Torrado sob demanda toda segunda-feira",
        "Frete grátis para todo o Brasil",
        "Origem em rotação — ou trave a sua favorita",
        "Pause, pule ou cancele quando quiser",
      ],
      cta: "Começar minha assinatura",
      successTitle: "Bem-vindo à lista de torra.",
      successBody: "Pedido TC-2417 confirmado. Seu primeiro pacote sai da torrefação na segunda, com um cartão de preparo dentro.",
      yourPlan: "Seu plano",
      reset: "Montar outro plano",
      sizes: [
        { id: "250", label: "250 g", cups: "± 15 xícaras", pricePerDelivery: 89 },
        { id: "500", label: "500 g", cups: "± 30 xícaras", pricePerDelivery: 159 },
        { id: "1000", label: "1 kg", cups: "± 60 xícaras", pricePerDelivery: 289 },
      ],
      frequencies: [
        { id: "weekly", label: "Toda semana", deliveriesPerMonth: 4, discountPct: 15, note: "Economize 15%" },
        { id: "biweekly", label: "A cada 2 semanas", deliveriesPerMonth: 2, discountPct: 10, note: "Economize 10%" },
        { id: "monthly", label: "Uma vez por mês", deliveriesPerMonth: 1, discountPct: 0, note: "O clássico" },
      ],
      priceLocale: "pt-BR",
      currency: "BRL",
    },
    visit: {
      label: "Visite-nos",
      title: "Onde nos encontrar",
      intro: "Uma casa de esquina com sol de inverno pela manhã, uma mesa comunitária comprida e a máquina de espresso de frente para a rua.",
      imageAlt: "Luz da manhã atravessando o balcão de espresso do Terra Café",
      addressLabel: "Endereço",
      addressLines: ["Rua Harmonia 456 — Vila Madalena", "São Paulo, SP 05435-000, Brasil"],
      hoursLabel: "Horários",
      hours: [
        { days: "Seg – Sex", time: "8h – 19h" },
        { days: "Sábado", time: "9h – 20h" },
        { days: "Domingo", time: "9h – 15h" },
      ],
      contactLabel: "Fale com a gente",
      phone: "+55 11 3810-2247",
      email: "ola@terracafe.com.br",
      instagram: "@terracafe.vm",
      directionsCta: "Abrir no mapa",
      quote: "Organizo meus sábados em volta desse balcão. O flat white recalibrou meu padrão de vez.",
      quoteAuthor: "Camila Ferraz — cliente desde 2019",
    },
    footer: {
      tagline: "Café sem pressa, torrado na Vila Madalena.",
      navLabel: "Explore",
      visitLabel: "Visite",
      followLabel: "Siga",
      nav: [
        { href: "#menu", label: "Cardápio" },
        { href: "#origins", label: "Origens" },
        { href: "#brew", label: "Métodos" },
        { href: "#subscription", label: "Assinatura" },
        { href: "#visit", label: "Visite-nos" },
      ],
      addressLines: ["Rua Harmonia 456 — Vila Madalena", "São Paulo, SP — Brasil"],
      hoursNote: "Aberto todos os dias a partir das 8h",
      instagram: "@terracafe.vm",
      email: "ola@terracafe.com.br",
      fine: "Terra Café é uma marca fictícia criada como conceito de design. Preços e lotes são ilustrativos.",
      credit: "Conceito, design e código por VigApp.",
    },
  },

  es: {
    header: {
      nav: [
        { href: "#menu", label: "Carta" },
        { href: "#origins", label: "Orígenes" },
        { href: "#brew", label: "Métodos" },
        { href: "#visit", label: "Visítanos" },
      ],
      cta: "Suscríbete",
      openMenu: "Abrir navegación",
      closeMenu: "Cerrar navegación",
    },
    hero: {
      kicker: "Café de especialidad · Vida lenta",
      taglineTop: "La mañana avanza",
      taglineItalic: "al ritmo",
      taglineBottom: "del vapor.",
      sub: "Terra Café es una casa de café y vida lenta en Vila Madalena, São Paulo. Tostamos lotes de origen único de Etiopía, Colombia y Brasil, y servimos cada taza como si el tiempo fuera un ingrediente.",
      ctaMenu: "Ver la carta",
      ctaSub: "Suscribirme al café",
      imageAlt: "Un flat white con latte art sobre la barra de Terra Café",
      badge: "TERRA CAFÉ · SÃO PAULO · DESDE 2017 · ",
      facts: [
        { value: "2017", label: "tostando en Vila Madalena desde" },
        { value: "3", label: "orígenes en rotación cada temporada" },
        { value: "94 pts", label: "nuestro lote mejor puntuado" },
      ],
    },
    menu: {
      label: "La carta",
      title: "Lo que sale de la barra",
      intro: "Espresso extraído en una Linea de dos grupos, filtrados preparados al momento y una lista de temporada que sigue la cosecha, no el calendario.",
      imageAlt: "Bollería y café recién hecho sobre la mesa de la cafetería",
      footnote: "Todas las bebidas con leche están disponibles con avena o macadamia sin coste extra.",
      categories: [
        {
          id: "espresso",
          label: "Barra de espresso",
          note: "Extraído en la Linea PB — 18 g dentro, 36 g en taza.",
          drinks: [
            { name: "Terra Espresso", description: "Mezcla de la casa de Catuaí y Mundo Novo: cuerpo de cacao y final de azúcar tostado.", price: "3,20 €", tag: "favorito de la casa" },
            { name: "Cortado", description: "Espresso doble y leche texturizada a partes iguales, templado — nunca hirviendo.", price: "3,80 €" },
            { name: "Flat White", description: "Base de ristretto bajo un velo de microespuma de terciopelo.", price: "4,20 €" },
            { name: "Terra Mocha", description: "Espresso, cacao 70% de Bahía y una nube de espuma de avena.", price: "4,90 €" },
          ],
        },
        {
          id: "filter",
          label: "Filtrados",
          note: "Preparados al momento, taza a taza.",
          drinks: [
            { name: "V60 del Día", description: "Origen único en rotación: pregunta en barra por el lote de la semana.", price: "4,50 €", tag: "en rotación" },
            { name: "AeroPress", description: "Denso y dulce, prensado a 88°C para una taza más redonda.", price: "4,20 €" },
            { name: "Batch Brew", description: "Nuestro filtrado de diario: equilibrado, generoso, siempre listo.", price: "3,40 €" },
            { name: "Cold Brew", description: "18 horas de infusión en frío; solo o con tónica.", price: "4,60 €" },
          ],
        },
        {
          id: "seasonal",
          label: "De temporada",
          note: "Invierno paulista — aquí mientras dure julio.",
          drinks: [
            { name: "Cascara Tonic", description: "Sirope de cáscara de café, tónica y un twist de naranja.", price: "5,40 €", tag: "edición limitada" },
            { name: "Latte de Rapadura", description: "Espresso con panela de Minas y leche sedosa.", price: "5,20 €" },
            { name: "Capuchino de Miel Especiada", description: "Canela, clavo y miel de azahar plegados en la espuma.", price: "4,90 €" },
            { name: "Affogato Cerrado", description: "Espresso doble sobre helado de vainilla natural.", price: "5,80 €" },
          ],
        },
      ],
    },
    origins: {
      label: "Origen del grano",
      title: "Tres tierras, una barra",
      intro: "Cada saco que tostamos es trazable hasta la puerta de la finca. Gira una tarjeta para leer la taza tal como la catamos.",
      flipHint: "Notas de cata",
      backHint: "Volver a la finca",
      notesLabel: "Notas de cata",
      fields: { producer: "Productor", altitude: "Altitud", process: "Proceso", varietal: "Varietal" },
      cards: [
        {
          id: "ethiopia",
          country: "Etiopía",
          region: "Gedeb, Yirgacheffe",
          producer: "Cooperativa de Konga — estación Halo Beriti",
          altitude: "1.900–2.200 m",
          process: "Lavado",
          varietal: "Heirloom 74110",
          roast: "Tueste claro",
          notes: ["Jazmín", "Bergamota", "Albaricoque", "Té negro"],
          story: "Seiscientas familias entregan cereza en la estación Halo Beriti, donde el café fermenta 48 horas en agua de manantial. La taza es ligera y floral: la razón por la que media casa se enamoró del café.",
        },
        {
          id: "colombia",
          country: "Colombia",
          region: "Pitalito, Huila",
          producer: "Luz Marina Ordóñez — Finca El Mirador",
          altitude: "1.750 m",
          process: "Honey",
          varietal: "Bourbon Rosado",
          roast: "Tueste claro-medio",
          notes: ["Panela", "Ciruela roja", "Mandarina", "Nibs de cacao"],
          story: "Luz Marina seca su Bourbon Rosado en camas elevadas durante 22 días lentos. Llega dulce como un almíbar y vivo a la vez: quien lo pide en espresso suele repetir.",
        },
        {
          id: "brazil",
          country: "Brasil",
          region: "Carmo de Minas, Minas Gerais",
          producer: "Familia Andrade — Sítio Boa Vista",
          altitude: "1.150 m",
          process: "Natural",
          varietal: "Catuaí Amarillo",
          roast: "Tueste medio",
          notes: ["Avellana", "Chocolate con leche", "Higo seco", "Melaza"],
          story: "Tres generaciones de la familia Andrade cultivan esta ladera. Su Catuaí natural es nuestro café de siempre: redondo, achocolatado e imposible de discutir.",
        },
      ],
    },
    brew: {
      label: "Guía de preparación",
      title: "Prepáralo como nosotros",
      intro: "Las recetas pegadas en nuestra barra, paso a paso. Elige un método y tómate tu tiempo: el cronómetro es una sugerencia; el remolino final, no.",
      imageAlt: "Agua caliente vertida en círculos sobre un filtro V60",
      stepCount: "Paso {n} de {total}",
      jumpTo: "Ir al paso {n}",
      params: { ratio: "Proporción", temp: "Agua", time: "Tiempo total", grind: "Molienda" },
      next: "Siguiente paso",
      back: "Paso anterior",
      restart: "Empezar de nuevo",
      doneTitle: "Taza lista.",
      doneBody: "Déjala reposar un minuto antes del primer sorbo: el dulzor llega cuando baja la temperatura.",
      methods: [
        {
          id: "v60",
          label: "V60",
          tagline: "Limpio, floral, transparente",
          ratio: "1:16 — 15 g : 240 ml",
          temp: "94°C",
          time: "3:00",
          grind: "Media-fina",
          steps: [
            { title: "Enjuaga y calienta", detail: "Dobla la costura del papel, enjuágalo con agua caliente y desecha. Un cono caliente hace un bloom honesto.", clock: "0:00" },
            { title: "Bloom", detail: "Vierte 45 ml en círculos lentos y espera. El café fresco crecerá y burbujeará al liberar CO2.", clock: "0:45" },
            { title: "Primer vertido", detail: "Sube hasta 150 ml en una espiral constante, del centro hacia fuera. Hervidor bajo y sin prisa.", clock: "1:15" },
            { title: "Segundo vertido", detail: "Completa hasta 240 ml por los bordes para arrastrar el café de la pared del filtro.", clock: "1:45" },
            { title: "Gira y deja drenar", detail: "Un giro suave para nivelar la cama. La meta es terminar cerca de los tres minutos.", clock: "3:00" },
          ],
        },
        {
          id: "aeropress",
          label: "AeroPress",
          tagline: "Dulce, denso, tolerante",
          ratio: "1:13 — 14 g : 180 ml",
          temp: "88°C",
          time: "2:30",
          grind: "Fina-media",
          steps: [
            { title: "Monta y enjuaga", detail: "Posición clásica, filtro enjuagado y la cámara sobre una taza estable.", clock: "0:00" },
            { title: "Café y agua", detail: "Añade 14 g de café y los 180 ml de agua en un solo vertido decidido.", clock: "0:20" },
            { title: "Remueve y espera", detail: "Tres vueltas suaves, tapa enroscada y calma. Aquí la receta es esperar.", clock: "1:30" },
            { title: "Presiona", detail: "Presiona con el peso del cuerpo unos 30 segundos. Detente en el primer siseo.", clock: "2:00" },
            { title: "Abre la taza", detail: "Prueba y, si resulta muy densa, ábrela con un poco de agua caliente.", clock: "2:30" },
          ],
        },
        {
          id: "espresso",
          label: "Espresso",
          tagline: "Almibarado, intenso, exacto",
          ratio: "1:2 — 18 g : 36 g",
          temp: "93°C",
          time: "0:28",
          grind: "Fina",
          steps: [
            { title: "Dosifica y distribuye", detail: "18 g en el cacillo, molienda fina. Nivela la cama con golpecitos suaves, sin cráteres.", clock: "0:00" },
            { title: "Prensa una vez, plano", detail: "Un tamper firme y nivelado. Que quede plano importa más que la fuerza.", clock: "0:05" },
            { title: "Extrae", detail: "Ancla el portafiltro y arranca enseguida. Las primeras gotas deben caer hacia los seis segundos.", clock: "0:10" },
            { title: "Observa el flujo", detail: "Busca un hilo de miel lento que se aclare cerca de los 36 g en la báscula.", clock: "0:28" },
            { title: "Prueba y ajusta", detail: "Ácido pide molienda más fina; amargo y hueco, más gruesa. Cambia una sola cosa cada vez.", clock: "0:45" },
          ],
        },
      ],
    },
    subscription: {
      label: "Suscripción de café",
      title: "Granos que llegan antes de que se acaben",
      intro: "Configura tu plan en dos gestos. Tostamos los lunes y enviamos en menos de 48 horas: tu cocina no volverá a oler a bote vacío.",
      imageAlt: "Granos de café recién tostados reposando en la bandeja de enfriado",
      sizeLabel: "Tamaño de la bolsa",
      freqLabel: "Ritmo de entrega",
      perDelivery: "por entrega",
      perMonth: "al mes",
      includes: [
        "Tostado bajo pedido cada lunes",
        "Envío gratuito a todo el país",
        "Origen rotativo, o fija tu favorito",
        "Pausa, salta o cancela cuando quieras",
      ],
      cta: "Empezar mi suscripción",
      successTitle: "Bienvenido a la lista de tueste.",
      successBody: "Pedido TC-2417 confirmado. Tu primera bolsa sale del tostador el lunes, con una tarjeta de recetas dentro.",
      yourPlan: "Tu plan",
      reset: "Configurar otro plan",
      sizes: [
        { id: "250", label: "250 g", cups: "± 15 tazas", pricePerDelivery: 16 },
        { id: "500", label: "500 g", cups: "± 30 tazas", pricePerDelivery: 29 },
        { id: "1000", label: "1 kg", cups: "± 60 tazas", pricePerDelivery: 54 },
      ],
      frequencies: [
        { id: "weekly", label: "Cada semana", deliveriesPerMonth: 4, discountPct: 15, note: "Ahorra un 15%" },
        { id: "biweekly", label: "Cada 2 semanas", deliveriesPerMonth: 2, discountPct: 10, note: "Ahorra un 10%" },
        { id: "monthly", label: "Una vez al mes", deliveriesPerMonth: 1, discountPct: 0, note: "El clásico" },
      ],
      priceLocale: "es-ES",
      currency: "EUR",
    },
    visit: {
      label: "Visítanos",
      title: "Dónde encontrarnos",
      intro: "Una casa de esquina con sol de invierno por la mañana, una larga mesa compartida y la máquina de espresso mirando a la calle.",
      imageAlt: "La luz de la mañana cruzando la barra de espresso de Terra Café",
      addressLabel: "Dirección",
      addressLines: ["Rua Harmonia 456 — Vila Madalena", "São Paulo, SP 05435-000, Brasil"],
      hoursLabel: "Horario",
      hours: [
        { days: "Lun – Vie", time: "8:00 – 19:00" },
        { days: "Sábado", time: "9:00 – 20:00" },
        { days: "Domingo", time: "9:00 – 15:00" },
      ],
      contactLabel: "Escríbenos",
      phone: "+55 11 3810-2247",
      email: "ola@terracafe.com.br",
      instagram: "@terracafe.vm",
      directionsCta: "Abrir en el mapa",
      quote: "Organizo mis sábados alrededor de esta barra. El flat white me recalibró el listón para siempre.",
      quoteAuthor: "Camila Ferraz — clienta desde 2019",
    },
    footer: {
      tagline: "Café sin prisa, tostado en Vila Madalena.",
      navLabel: "Explora",
      visitLabel: "Visita",
      followLabel: "Síguenos",
      nav: [
        { href: "#menu", label: "Carta" },
        { href: "#origins", label: "Orígenes" },
        { href: "#brew", label: "Métodos" },
        { href: "#subscription", label: "Suscripción" },
        { href: "#visit", label: "Visítanos" },
      ],
      addressLines: ["Rua Harmonia 456 — Vila Madalena", "São Paulo, SP — Brasil"],
      hoursNote: "Abierto todos los días desde las 8:00",
      instagram: "@terracafe.vm",
      email: "ola@terracafe.com.br",
      fine: "Terra Café es una marca ficticia creada como concepto de diseño. Precios y lotes son ilustrativos.",
      credit: "Concepto, diseño y desarrollo de VigApp.",
    },
  },
};
