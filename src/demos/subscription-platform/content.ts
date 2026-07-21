import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface HeaderContent {
  nav: { href: string; label: string }[];
  ctaSelf: string;
  ctaGift: string;
  openMenu: string;
  closeMenu: string;
}

export interface HeroContent {
  kicker: string;
  titleTop: string;
  titleItalic: string;
  titleBottom: string;
  sub: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stampTop: string;
  stampNo: string;
  badgeTop: string;
  badgeBottom: string;
  alts: { crate: string; bowl: string; snacks: string };
  stats: { value: string; label: string }[];
  marquee: string[];
}

export interface HowContent {
  label: string;
  title: string;
  intro: string;
  steps: { title: string; detail: string }[];
}

export interface SizeOption {
  id: string;
  name: string;
  count: string;
  detail: string;
  pricePerBox: number;
  tag?: string;
}

export interface PrefOption {
  id: string;
  name: string;
  note: string;
  surcharge: number;
}

export interface FreqOption {
  id: string;
  name: string;
  note: string;
  perMonth: number;
  discountPct: number;
}

export interface BuilderContent {
  label: string;
  title: string;
  intro: string;
  stepNames: string[];
  sizes: SizeOption[];
  prefs: PrefOption[];
  prefsHint: string;
  prefsNone: string;
  freqs: FreqOption[];
  back: string;
  next: string;
  confirm: string;
  summaryTitle: string;
  sizeLine: string;
  prefsLine: string;
  freqLine: string;
  perBox: string;
  perMonth: string;
  successTitle: string;
  successBody: string;
  edit: string;
  priceLocale: string;
  currency: string;
}

export interface MonthItem {
  category: string;
  name: string;
  maker: string;
  note: string;
}

export interface MonthBoxContent {
  label: string;
  title: string;
  theme: string;
  intro: string;
  flipHint: string;
  revealAll: string;
  hideAll: string;
  secretNote: string;
  items: MonthItem[];
}

export interface PastBox {
  month: string;
  theme: string;
  blurb: string;
  tag?: string;
}

export interface PastBoxesContent {
  label: string;
  title: string;
  intro: string;
  archiveNote: string;
  alts: { jars: string; snacks: string };
  boxes: PastBox[];
}

export interface GiftingModeContent {
  headline: string;
  body: string;
  bullets: string[];
  cta: string;
}

export interface GiftingContent {
  label: string;
  title: string;
  toggleSelf: string;
  toggleGift: string;
  self: GiftingModeContent;
  gift: GiftingModeContent;
  note: string;
  imageAlt: string;
}

export interface ReviewItem {
  quote: string;
  name: string;
  place: string;
  tag: string;
  rating: number;
}

export interface ReviewsContent {
  label: string;
  title: string;
  intro: string;
  ratingSuffix: string;
  items: ReviewItem[];
}

export interface FaqContent {
  label: string;
  title: string;
  items: { q: string; a: string }[];
}

export interface FooterContent {
  tagline: string;
  newsTitle: string;
  newsBody: string;
  newsLabel: string;
  newsPlaceholder: string;
  newsCta: string;
  newsSuccess: string;
  newsPrivacy: string;
  exploreLabel: string;
  explore: { href: string; label: string }[];
  contactLabel: string;
  addressLines: string[];
  email: string;
  instagram: string;
  fine: string;
  credit: string;
}

export interface CratefulContent {
  header: HeaderContent;
  hero: HeroContent;
  how: HowContent;
  builder: BuilderContent;
  monthBox: MonthBoxContent;
  pastBoxes: PastBoxesContent;
  gifting: GiftingContent;
  reviews: ReviewsContent;
  faq: FaqContent;
  footer: FooterContent;
}

/* ------------------------------------------------------------------ */
/* Dictionary                                                          */
/* ------------------------------------------------------------------ */

export const cratefulDict: DemoDictionary<CratefulContent> = {
  en: {
    header: {
      nav: [
        { href: "#how", label: "How it works" },
        { href: "#builder", label: "Build a crate" },
        { href: "#month", label: "This month" },
        { href: "#archive", label: "Archive" },
        { href: "#gifting", label: "Gifting" },
      ],
      ctaSelf: "Start my crate",
      ctaGift: "Send a gift crate",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      kicker: "Artisanal snack subscription",
      titleTop: "A crate of",
      titleItalic: "small-batch wonders,",
      titleBottom: "every month.",
      sub: "We taste hundreds of snacks from independent makers and pack only the keepers into one kraft crate — fig and rosemary crackers, guava bonbons, miso caramel popcorn — shipped to your door on the first.",
      ctaPrimary: "Build your crate",
      ctaSecondary: "Peek inside July",
      stampTop: "Crate",
      stampNo: "No. 47",
      badgeTop: "Next crate",
      badgeBottom: "ships Aug 1",
      alts: {
        crate: "Kraft gift crates tied with ribbon, stacked and tilted",
        bowl: "Colorful snack bowl photographed from above",
        snacks: "Vegetable crisps and dips arranged on a table",
      },
      stats: [
        { value: "120+", label: "independent makers" },
        { value: "46", label: "crates curated so far" },
        { value: "4.9/5", label: "average rip-day rating" },
      ],
      marquee: [
        "Small batch",
        "Fair trade",
        "Maker owned",
        "Zero palm oil",
        "Compostable packing",
        "Seasonal always",
      ],
    },
    how: {
      label: "How it works",
      title: "Three steps to a happier pantry.",
      intro:
        "No contracts, no fine print — just a crate that learns your taste a little better every month.",
      steps: [
        {
          title: "Tune your crate",
          detail:
            "Pick a size, mark your dietary lines and set the delivery rhythm. It takes about two minutes.",
        },
        {
          title: "We go hunting",
          detail:
            "Our curators taste hundreds of small-batch snacks each month and keep only the ones worth fighting over.",
        },
        {
          title: "Rip, taste, rate",
          detail:
            "Every crate lands with maker stories and tasting notes. Rate what you loved and the next one gets smarter.",
        },
      ],
    },
    builder: {
      label: "Plan builder",
      title: "Build the crate your cravings deserve.",
      intro:
        "Three quick choices. The price updates live, and you can change everything later from your account.",
      stepNames: ["Size", "Preferences", "Rhythm"],
      sizes: [
        {
          id: "taster",
          name: "The Taster",
          count: "6 snacks · 700 g",
          detail: "Desk-drawer duty for one",
          pricePerBox: 24,
        },
        {
          id: "classic",
          name: "The Classic",
          count: "10 snacks · 1.2 kg",
          detail: "Couples and small households",
          pricePerBox: 38,
          tag: "Most popular",
        },
        {
          id: "feast",
          name: "The Feast",
          count: "16 snacks · 2 kg",
          detail: "Offices and big appetites",
          pricePerBox: 54,
        },
      ],
      prefs: [
        { id: "plant", name: "Plant-based", note: "No dairy, honey or eggs", surcharge: 3 },
        { id: "gluten", name: "Gluten-free", note: "Certified facilities only", surcharge: 3 },
        { id: "nut", name: "Nut-free", note: "Allergy-safe sourcing", surcharge: 2 },
        { id: "spice", name: "Spice lover", note: "Extra heat in every crate", surcharge: 0 },
        { id: "sweet", name: "Sweet tooth", note: "Tilt the mix toward dessert", surcharge: 0 },
      ],
      prefsHint: "Pick as many as you like. Specialty sourcing adds a small per-crate fee.",
      prefsNone: "No restrictions — surprise me",
      freqs: [
        {
          id: "fortnight",
          name: "Every 2 weeks",
          note: "Save 12% on every crate",
          perMonth: 2,
          discountPct: 12,
        },
        { id: "monthly", name: "Monthly", note: "The classic rhythm", perMonth: 1, discountPct: 0 },
        {
          id: "bimonthly",
          name: "Every 2 months",
          note: "Slow savoring, easy pause",
          perMonth: 0.5,
          discountPct: 0,
        },
      ],
      back: "Back",
      next: "Continue",
      confirm: "Lock in my crate",
      summaryTitle: "Your crate",
      sizeLine: "Size",
      prefsLine: "Preferences",
      freqLine: "Rhythm",
      perBox: "Per crate",
      perMonth: "Average per month",
      successTitle: "Crate locked in.",
      successBody:
        "Your first delivery leaves our Asheville packing room on August 1, with tracking the moment it ships. Rip-day is officially on your calendar.",
      edit: "Adjust my crate",
      priceLocale: "en-US",
      currency: "USD",
    },
    monthBox: {
      label: "This month",
      title: "Inside the July crate.",
      theme: "No. 47 — Golden Hour",
      intro:
        "Six of the ten July picks, declassified. Flip a card to meet the snack — the rest stay secret until rip-day.",
      flipHint: "Tap to reveal",
      revealAll: "Reveal all six",
      hideAll: "Hide them again",
      secretNote: "Four more picks ride along unannounced.",
      items: [
        {
          category: "Crunchy",
          name: "Charred Corn & Lime Crisps",
          maker: "Milpa y Sal · Oaxaca",
          note: "Smoky, citrusy and dangerously poppable.",
        },
        {
          category: "Sweet",
          name: "Guava & Dark Cacao Bonbons",
          maker: "Dona Nena Confeitaria · Belo Horizonte",
          note: "A guava-paste heart in a 70% shell.",
        },
        {
          category: "Savory",
          name: "Rosemary Fig Sourdough Crackers",
          maker: "Hearth & Larder · Vermont",
          note: "Baked on Tuesdays, shipped on Wednesdays.",
        },
        {
          category: "Fiery",
          name: "Mango Habanero Fruit Leather",
          maker: "Sol Dorado · San Diego",
          note: "Sunshine first, slow burn second.",
        },
        {
          category: "Umami",
          name: "Miso Caramel Popcorn",
          maker: "Ochre Pantry · Portland",
          note: "Sweet-salty with a toasted edge.",
        },
        {
          category: "Sip",
          name: "Hibiscus & Ginger Cooler Kit",
          maker: "Flor de Agosto · Mexico City",
          note: "Steep, chill, pour over ice.",
        },
      ],
    },
    pastBoxes: {
      label: "The archive",
      title: "Forty-six crates and counting.",
      intro:
        "Every retired crate lives on here. A few come back as limited archive drops — subscribers get first dibs.",
      archiveNote: "Archive drops open on the 15th of each month.",
      alts: {
        jars: "Pantry shelf lined with preserved jars",
        snacks: "Assorted vegetable snacks on a linen tablecloth",
      },
      boxes: [
        {
          month: "June 2026",
          theme: "Picnic Season",
          blurb:
            "Baguette crisps, stone-fruit gummies and smoked almonds built for a blanket in the park.",
          tag: "Archive drop",
        },
        {
          month: "May 2026",
          theme: "Rainy Day Pantry",
          blurb: "Broths, dark chocolate and double-cheese crackers for staying in on purpose.",
        },
        {
          month: "April 2026",
          theme: "Citrus Parade",
          blurb:
            "Yuzu caramels, blood-orange shortbread and a lime-chili dust we still dream about.",
          tag: "Sold out",
        },
        {
          month: "March 2026",
          theme: "Toast Worthy",
          blurb: "Seeded loaves, whipped honey and three jams from a family farm in Minas Gerais.",
        },
      ],
    },
    gifting: {
      label: "Gifting",
      title: "One crate, two ways to give it.",
      toggleSelf: "For my shelf",
      toggleGift: "As a gift",
      self: {
        headline: "Treat your own pantry.",
        body: "Subscriptions renew on the 1st and you stay in charge: pause, skip a month or swap sizes in one tap — no emails, no phone calls, no guilt.",
        bullets: [
          "Pause or skip any month in one tap",
          "Swap sizes between crates",
          "Your ratings tune the next crate",
        ],
        cta: "Start my subscription",
      },
      gift: {
        headline: "Send the best mail of their month.",
        body: "Gift runs are one-and-done: choose 1, 3 or 6 crates, write a note we will hand-letter, and relax — gifts never auto-renew and never nag.",
        bullets: [
          "Hand-lettered note tucked inside",
          "1, 3 or 6 crates — never auto-renews",
          "Gift-wrapped, with no prices printed",
        ],
        cta: "Send a gift crate",
      },
      note: "Gift orders placed by July 25 ride along with the August crate.",
      imageAlt: "Gift crate wrapped with ribbon and a handwritten tag",
    },
    reviews: {
      label: "Word of mouth",
      title: "Rip-day reactions.",
      intro:
        "Straight from the crate-day inbox — lightly edited for length, never for enthusiasm.",
      ratingSuffix: "out of 5 stars",
      items: [
        {
          quote:
            "My eight-year-old calls the first of the month crate day and refuses to open it without the full ceremony. Honestly? Same.",
          name: "Priya Raman",
          place: "Austin, TX",
          tag: "The Classic · 14 crates",
          rating: 5,
        },
        {
          quote:
            "I keep a spreadsheet ranking every snack since 2024. The miso caramel popcorn has never been dethroned.",
          name: "Tomás Herzog",
          place: "Brooklyn, NY",
          tag: "The Feast · 22 crates",
          rating: 5,
        },
        {
          quote:
            "Sent a three-crate gift run to my brother. He now sends unboxing videos back. Unprompted.",
          name: "Luana Barbosa",
          place: "Miami, FL",
          tag: "Gift run · 3 crates",
          rating: 5,
        },
        {
          quote:
            "The gluten-free filter actually means it. First subscription that takes the label seriously instead of decoratively.",
          name: "Hannah Kaplan",
          place: "Chicago, IL",
          tag: "The Taster · 8 crates",
          rating: 4,
        },
      ],
    },
    faq: {
      label: "Questions",
      title: "Before you rip in.",
      items: [
        {
          q: "Can I pause or skip a month?",
          a: "Anytime, in one tap from your account. Skips are free, unlimited and immediate — billing simply shifts to the next crate you accept.",
        },
        {
          q: "How do you handle allergies?",
          a: "The nut-free and gluten-free filters change our sourcing, not just the mix: those crates are packed from certified facilities on a separate line, and every snack ships with a full ingredient card.",
        },
        {
          q: "Where do you ship?",
          a: "Anywhere in the US in 2 to 4 days, and to Canada in 5 to 7. Shipping is included in every plan — no surprise fees at checkout.",
        },
        {
          q: "When does my first crate arrive?",
          a: "Crates leave the packing room on the 1st of each month. Subscribe by the 25th and you make the next dispatch; after that, you roll to the following one.",
        },
        {
          q: "Can I buy a crate without subscribing?",
          a: "Retired crates occasionally return as archive drops on the 15th — one-off purchases, no subscription attached. They sell out fast; subscribers get 48 hours of early access.",
        },
        {
          q: "What if I hate a snack?",
          a: "Rate it one star and two things happen: the item retires from your profile, and if the whole crate missed, our crate concierge credits your next month. Yes, a real human.",
        },
      ],
    },
    footer: {
      tagline:
        "Small-batch snacks from independent makers, packed with care and shipped on the first of every month.",
      newsTitle: "The Crate Report",
      newsBody:
        "One email a month: next-theme hints, maker interviews and archive-drop alerts.",
      newsLabel: "Email address",
      newsPlaceholder: "you@example.com",
      newsCta: "Sign me up",
      newsSuccess: "You are on the list — the next report lands on Friday.",
      newsPrivacy: "One email a month. No crumbs, no spam.",
      exploreLabel: "Explore",
      explore: [
        { href: "#how", label: "How it works" },
        { href: "#builder", label: "Plan builder" },
        { href: "#month", label: "This month" },
        { href: "#archive", label: "Past crates" },
        { href: "#gifting", label: "Gifting" },
        { href: "#faq", label: "FAQ" },
      ],
      contactLabel: "Say hello",
      addressLines: ["Crateful Provisions Co.", "14 Maker Row", "Asheville, NC 28801"],
      email: "hello@crateful.co",
      instagram: "@crateful.crates",
      fine: "© 2026 Crateful Provisions Co. All rights reserved. Allergen guides included in every crate.",
      credit: "Packed with care in Asheville, NC.",
    },
  },

  pt: {
    header: {
      nav: [
        { href: "#how", label: "Como funciona" },
        { href: "#builder", label: "Monte sua caixa" },
        { href: "#month", label: "Este mês" },
        { href: "#archive", label: "Acervo" },
        { href: "#gifting", label: "Presentes" },
      ],
      ctaSelf: "Quero minha caixa",
      ctaGift: "Enviar de presente",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
    },
    hero: {
      kicker: "Clube de snacks artesanais",
      titleTop: "Uma caixa de",
      titleItalic: "maravilhas artesanais,",
      titleBottom: "todo mês.",
      sub: "Provamos centenas de snacks de pequenos produtores e guardamos só os inesquecíveis numa caixa kraft — cracker de figo com alecrim, bombom de goiabada, pipoca de caramelo com missô — entregue na sua porta todo dia 1º.",
      ctaPrimary: "Montar minha caixa",
      ctaSecondary: "Espiar a caixa de julho",
      stampTop: "Caixa",
      stampNo: "Nº 47",
      badgeTop: "Próxima caixa",
      badgeBottom: "sai 1º de ago",
      alts: {
        crate: "Caixas kraft de presente amarradas com fita, empilhadas e inclinadas",
        bowl: "Bowl colorido de snacks fotografado de cima",
        snacks: "Chips de legumes e molhos arrumados sobre a mesa",
      },
      stats: [
        { value: "120+", label: "pequenos produtores" },
        { value: "46", label: "caixas curadas até hoje" },
        { value: "4,9/5", label: "nota média do dia da caixa" },
      ],
      marquee: [
        "Produção artesanal",
        "Comércio justo",
        "Feito por quem faz",
        "Zero óleo de palma",
        "Embalagem compostável",
        "Sempre sazonal",
      ],
    },
    how: {
      label: "Como funciona",
      title: "Três passos para uma despensa mais feliz.",
      intro:
        "Sem fidelidade, sem letras miúdas — só uma caixa que aprende o seu gosto um pouco mais a cada mês.",
      steps: [
        {
          title: "Ajuste sua caixa",
          detail:
            "Escolha o tamanho, marque suas restrições e defina o ritmo de entrega. Leva uns dois minutos.",
        },
        {
          title: "Nós saímos à caça",
          detail:
            "Nossos curadores provam centenas de snacks artesanais por mês e ficam só com os que valem briga de irmão.",
        },
        {
          title: "Rasgue, prove, avalie",
          detail:
            "Cada caixa chega com a história dos produtores e notas de degustação. Avalie o que amou e a próxima fica mais esperta.",
        },
      ],
    },
    builder: {
      label: "Monte seu plano",
      title: "Monte a caixa que a sua gula merece.",
      intro:
        "Três escolhas rápidas. O preço atualiza na hora e dá para mudar tudo depois, direto na sua conta.",
      stepNames: ["Tamanho", "Preferências", "Ritmo"],
      sizes: [
        {
          id: "taster",
          name: "A Provinha",
          count: "6 snacks · 700 g",
          detail: "Para a gaveta da mesa de uma pessoa só",
          pricePerBox: 119,
        },
        {
          id: "classic",
          name: "A Clássica",
          count: "10 snacks · 1,2 kg",
          detail: "Casais e casas pequenas",
          pricePerBox: 189,
          tag: "Mais pedida",
        },
        {
          id: "feast",
          name: "O Banquete",
          count: "16 snacks · 2 kg",
          detail: "Escritórios e famílias famintas",
          pricePerBox: 269,
        },
      ],
      prefs: [
        { id: "plant", name: "Vegana", note: "Sem laticínios, mel ou ovos", surcharge: 15 },
        { id: "gluten", name: "Sem glúten", note: "Só instalações certificadas", surcharge: 15 },
        { id: "nut", name: "Sem castanhas", note: "Fornecimento seguro para alergias", surcharge: 10 },
        { id: "spice", name: "Amante de pimenta", note: "Mais ardência em cada caixa", surcharge: 0 },
        { id: "sweet", name: "Formiguinha", note: "Mix puxado para o doce", surcharge: 0 },
      ],
      prefsHint: "Marque quantas quiser. Curadoria especial soma uma pequena taxa por caixa.",
      prefsNone: "Sem restrições — pode me surpreender",
      freqs: [
        {
          id: "fortnight",
          name: "A cada 2 semanas",
          note: "Economize 12% em cada caixa",
          perMonth: 2,
          discountPct: 12,
        },
        { id: "monthly", name: "Mensal", note: "O ritmo clássico", perMonth: 1, discountPct: 0 },
        {
          id: "bimonthly",
          name: "A cada 2 meses",
          note: "Para saborear sem pressa",
          perMonth: 0.5,
          discountPct: 0,
        },
      ],
      back: "Voltar",
      next: "Continuar",
      confirm: "Fechar minha caixa",
      summaryTitle: "Sua caixa",
      sizeLine: "Tamanho",
      prefsLine: "Preferências",
      freqLine: "Ritmo",
      perBox: "Por caixa",
      perMonth: "Média por mês",
      successTitle: "Caixa garantida.",
      successBody:
        "Sua primeira entrega sai do nosso galpão na Vila Madalena no dia 1º de agosto, com rastreio assim que for postada. O dia da caixa já está no calendário.",
      edit: "Ajustar minha caixa",
      priceLocale: "pt-BR",
      currency: "BRL",
    },
    monthBox: {
      label: "Este mês",
      title: "Dentro da caixa de julho.",
      theme: "Nº 47 — Hora Dourada",
      intro:
        "Seis das dez escolhas de julho, reveladas. Vire uma carta para conhecer o snack — as outras seguem em segredo até o dia da caixa.",
      flipHint: "Toque para revelar",
      revealAll: "Revelar as seis",
      hideAll: "Esconder de novo",
      secretNote: "Mais quatro escolhas viajam em sigilo.",
      items: [
        {
          category: "Crocante",
          name: "Chips de Milho Tostado com Limão",
          maker: "Milpa y Sal · Oaxaca",
          note: "Defumado, cítrico e perigosamente viciante.",
        },
        {
          category: "Doce",
          name: "Bombons de Goiabada com Cacau 70%",
          maker: "Dona Nena Confeitaria · Belo Horizonte",
          note: "Coração de goiabada em casca intensa.",
        },
        {
          category: "Salgado",
          name: "Crackers de Figo com Alecrim",
          maker: "Hearth & Larder · Vermont",
          note: "Assados na terça, despachados na quarta.",
        },
        {
          category: "Ardido",
          name: "Tirinha de Manga com Habanero",
          maker: "Sol Dorado · San Diego",
          note: "Primeiro o sol, depois um fogo lento.",
        },
        {
          category: "Umami",
          name: "Pipoca de Caramelo com Missô",
          maker: "Ochre Pantry · Portland",
          note: "Doce e salgada, com toque tostado.",
        },
        {
          category: "Para beber",
          name: "Kit de Refresco de Hibisco com Gengibre",
          maker: "Flor de Agosto · Cidade do México",
          note: "Infusione, gele e sirva com bastante gelo.",
        },
      ],
    },
    pastBoxes: {
      label: "O acervo",
      title: "Quarenta e seis caixas e contando.",
      intro:
        "Toda caixa aposentada mora aqui. Algumas voltam em tiragens limitadas do acervo — assinantes têm prioridade.",
      archiveNote: "As tiragens do acervo abrem todo dia 15.",
      alts: {
        jars: "Prateleira de despensa com potes de conservas",
        snacks: "Snacks de legumes variados sobre toalha de linho",
      },
      boxes: [
        {
          month: "Junho 2026",
          theme: "Temporada de Piquenique",
          blurb:
            "Torradinhas de baguete, balas de frutas de caroço e amêndoas defumadas para estender a canga no parque.",
          tag: "Tiragem do acervo",
        },
        {
          month: "Maio 2026",
          theme: "Despensa de Dia de Chuva",
          blurb:
            "Caldos, chocolate amargo e crackers de queijo duplo para ficar em casa de propósito.",
        },
        {
          month: "Abril 2026",
          theme: "Desfile Cítrico",
          blurb:
            "Caramelos de yuzu, biscoitos de laranja-sanguínea e um sal de limão com pimenta que ainda dá saudade.",
          tag: "Esgotada",
        },
        {
          month: "Março 2026",
          theme: "Digna de Brinde",
          blurb: "Pães de grãos, mel batido e três geleias de um sítio em Minas Gerais.",
        },
      ],
    },
    gifting: {
      label: "Presentes",
      title: "Uma caixa, dois jeitos de dar.",
      toggleSelf: "Para mim",
      toggleGift: "Para presentear",
      self: {
        headline: "Mime a sua própria despensa.",
        body: "A assinatura renova todo dia 1º e o controle é seu: pause, pule um mês ou troque o tamanho num toque — sem e-mails, sem telefonemas, sem culpa.",
        bullets: [
          "Pause ou pule qualquer mês num toque",
          "Troque de tamanho entre uma caixa e outra",
          "Suas avaliações afinam a próxima caixa",
        ],
        cta: "Começar minha assinatura",
      },
      gift: {
        headline: "Mande a melhor correspondência do mês.",
        body: "Presente aqui não vira armadilha: escolha 1, 3 ou 6 caixas, escreva um bilhete que caprichamos à mão e pronto — presente nunca renova sozinho nem lota a caixa de entrada.",
        bullets: [
          "Bilhete escrito à mão dentro da caixa",
          "1, 3 ou 6 caixas — nunca renova sozinho",
          "Embrulhada para presente, sem preço impresso",
        ],
        cta: "Enviar uma caixa de presente",
      },
      note: "Presentes pedidos até 25 de julho embarcam junto com a caixa de agosto.",
      imageAlt: "Caixa de presente com fita e etiqueta escrita à mão",
    },
    reviews: {
      label: "Boca a boca",
      title: "Reações do dia da caixa.",
      intro:
        "Direto da caixa de entrada do dia da caixa — editado só no tamanho, nunca no entusiasmo.",
      ratingSuffix: "de 5 estrelas",
      items: [
        {
          quote:
            "Meu filho de oito anos chama o dia 1º de dia da caixa e se recusa a abrir sem a cerimônia completa. Sinceramente? Eu também.",
          name: "Mariana Duarte",
          place: "Recife, PE",
          tag: "A Clássica · 14 caixas",
          rating: 5,
        },
        {
          quote:
            "Tenho uma planilha ranqueando cada snack desde 2024. A pipoca de caramelo com missô nunca perdeu o trono.",
          name: "Tomás Herzog",
          place: "São Paulo, SP",
          tag: "O Banquete · 22 caixas",
          rating: 5,
        },
        {
          quote:
            "Mandei três caixas de presente para meu irmão em Curitiba. Agora ele me manda vídeo de unboxing. Sem eu pedir.",
          name: "Luana Barbosa",
          place: "Belo Horizonte, MG",
          tag: "Presente · 3 caixas",
          rating: 5,
        },
        {
          quote:
            "O filtro sem glúten é sem glúten de verdade. Primeira assinatura que leva o rótulo a sério, não como enfeite.",
          name: "Hannah Kaplan",
          place: "Florianópolis, SC",
          tag: "A Provinha · 8 caixas",
          rating: 4,
        },
      ],
    },
    faq: {
      label: "Dúvidas",
      title: "Antes de rasgar o lacre.",
      items: [
        {
          q: "Dá para pausar ou pular um mês?",
          a: "Quando quiser, num toque, direto na sua conta. Pular é grátis, ilimitado e vale na hora — a cobrança simplesmente passa para a próxima caixa que você aceitar.",
        },
        {
          q: "Como vocês lidam com alergias?",
          a: "Os filtros sem castanhas e sem glúten mudam o fornecimento, não só o mix: essas caixas são montadas com produtos de instalações certificadas, em linha separada, e cada snack vem com ficha completa de ingredientes.",
        },
        {
          q: "Para onde vocês entregam?",
          a: "Para todo o Brasil: capitais em 2 a 4 dias úteis, demais regiões em até 8. O frete já está incluído em todos os planos — nada de surpresa no checkout.",
        },
        {
          q: "Quando chega a minha primeira caixa?",
          a: "As caixas saem do galpão todo dia 1º. Assinando até o dia 25, você entra na próxima remessa; depois disso, vai para a seguinte.",
        },
        {
          q: "Posso comprar uma caixa sem assinar?",
          a: "Caixas aposentadas voltam de vez em quando nas tiragens do acervo, todo dia 15 — compra avulsa, sem assinatura. Esgotam rápido; assinantes têm 48 horas de acesso antecipado.",
        },
        {
          q: "E se eu detestar um snack?",
          a: "Avalie com uma estrela e duas coisas acontecem: o item se aposenta do seu perfil e, se a caixa inteira errou a mão, nosso concierge credita o próximo mês. Sim, uma pessoa de verdade.",
        },
      ],
    },
    footer: {
      tagline:
        "Snacks artesanais de pequenos produtores, embalados com carinho e enviados todo dia 1º.",
      newsTitle: "O Relatório da Caixa",
      newsBody:
        "Um e-mail por mês: pistas do próximo tema, entrevistas com produtores e alertas das tiragens do acervo.",
      newsLabel: "Seu e-mail",
      newsPlaceholder: "voce@exemplo.com",
      newsCta: "Quero receber",
      newsSuccess: "Você está na lista — o próximo relatório chega na sexta.",
      newsPrivacy: "Um e-mail por mês. Sem migalhas, sem spam.",
      exploreLabel: "Explorar",
      explore: [
        { href: "#how", label: "Como funciona" },
        { href: "#builder", label: "Monte seu plano" },
        { href: "#month", label: "Este mês" },
        { href: "#archive", label: "Caixas passadas" },
        { href: "#gifting", label: "Presentes" },
        { href: "#faq", label: "Dúvidas" },
      ],
      contactLabel: "Fale com a gente",
      addressLines: [
        "Crateful Provisões Ltda.",
        "Rua dos Curadores, 88 — Vila Madalena",
        "São Paulo, SP 05435-070",
      ],
      email: "ola@crateful.co",
      instagram: "@crateful.brasil",
      fine: "© 2026 Crateful Provisões Ltda. Todos os direitos reservados. Guia de alérgenos em toda caixa.",
      credit: "Embalado com carinho na Vila Madalena, São Paulo.",
    },
  },

  es: {
    header: {
      nav: [
        { href: "#how", label: "Cómo funciona" },
        { href: "#builder", label: "Crea tu caja" },
        { href: "#month", label: "Este mes" },
        { href: "#archive", label: "Archivo" },
        { href: "#gifting", label: "Regalos" },
      ],
      ctaSelf: "Quiero mi caja",
      ctaGift: "Enviar de regalo",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
    },
    hero: {
      kicker: "Suscripción de snacks artesanos",
      titleTop: "Una caja de",
      titleItalic: "maravillas artesanas,",
      titleBottom: "cada mes.",
      sub: "Probamos cientos de snacks de pequeños obradores y guardamos solo los memorables en una caja kraft — crackers de higo y romero, bombones de guayaba, palomitas de caramelo y miso — que llega a tu puerta el día 1.",
      ctaPrimary: "Crear mi caja",
      ctaSecondary: "Ver la caja de julio",
      stampTop: "Caja",
      stampNo: "N.º 47",
      badgeTop: "Próxima caja",
      badgeBottom: "sale el 1 de ago",
      alts: {
        crate: "Cajas kraft de regalo atadas con lazo, apiladas e inclinadas",
        bowl: "Bol de snacks de colores fotografiado desde arriba",
        snacks: "Chips de verduras y salsas dispuestos sobre una mesa",
      },
      stats: [
        { value: "120+", label: "obradores independientes" },
        { value: "46", label: "cajas hasta la fecha" },
        { value: "4,9/5", label: "nota media al abrirla" },
      ],
      marquee: [
        "Pequeños lotes",
        "Comercio justo",
        "Hecho por artesanos",
        "Sin aceite de palma",
        "Embalaje compostable",
        "Siempre de temporada",
      ],
    },
    how: {
      label: "Cómo funciona",
      title: "Tres pasos hacia una despensa más feliz.",
      intro:
        "Sin permanencia y sin letra pequeña: solo una caja que aprende tu gusto un poco más cada mes.",
      steps: [
        {
          title: "Ajusta tu caja",
          detail:
            "Elige un tamaño, marca tus restricciones y decide el ritmo de entrega. Dos minutos, no más.",
        },
        {
          title: "Salimos de caza",
          detail:
            "Nuestro equipo prueba cientos de snacks artesanos al mes y se queda solo con los que quitan el hipo.",
        },
        {
          title: "Rasga, prueba, valora",
          detail:
            "Cada caja llega con la historia de sus obradores y notas de cata. Valora lo que te encantó y la siguiente acierta más.",
        },
      ],
    },
    builder: {
      label: "Crea tu plan",
      title: "Crea la caja que tu antojo se merece.",
      intro:
        "Tres decisiones rápidas. El precio se actualiza al momento y podrás cambiarlo todo más adelante desde tu cuenta.",
      stepNames: ["Tamaño", "Preferencias", "Ritmo"],
      sizes: [
        {
          id: "taster",
          name: "La Cata",
          count: "6 snacks · 700 g",
          detail: "Para el cajón del escritorio",
          pricePerBox: 22,
        },
        {
          id: "classic",
          name: "La Clásica",
          count: "10 snacks · 1,2 kg",
          detail: "Parejas y casas pequeñas",
          pricePerBox: 34,
          tag: "La favorita",
        },
        {
          id: "feast",
          name: "El Festín",
          count: "16 snacks · 2 kg",
          detail: "Oficinas y grandes apetitos",
          pricePerBox: 49,
        },
      ],
      prefs: [
        { id: "plant", name: "Vegana", note: "Sin lácteos, miel ni huevo", surcharge: 3 },
        { id: "gluten", name: "Sin gluten", note: "Solo obradores certificados", surcharge: 3 },
        { id: "nut", name: "Sin frutos secos", note: "Aprovisionamiento seguro", surcharge: 2 },
        { id: "spice", name: "Amante del picante", note: "Más fuego en cada caja", surcharge: 0 },
        { id: "sweet", name: "Goloso", note: "La mezcla, tirando a postre", surcharge: 0 },
      ],
      prefsHint:
        "Marca todas las que quieras. La curaduría especial suma una pequeña tarifa por caja.",
      prefsNone: "Sin restricciones: sorpréndeme",
      freqs: [
        {
          id: "fortnight",
          name: "Cada 2 semanas",
          note: "Ahorra un 12% en cada caja",
          perMonth: 2,
          discountPct: 12,
        },
        { id: "monthly", name: "Mensual", note: "El ritmo clásico", perMonth: 1, discountPct: 0 },
        {
          id: "bimonthly",
          name: "Cada 2 meses",
          note: "Para saborear sin prisa",
          perMonth: 0.5,
          discountPct: 0,
        },
      ],
      back: "Atrás",
      next: "Continuar",
      confirm: "Reservar mi caja",
      summaryTitle: "Tu caja",
      sizeLine: "Tamaño",
      prefsLine: "Preferencias",
      freqLine: "Ritmo",
      perBox: "Por caja",
      perMonth: "Media al mes",
      successTitle: "Caja reservada.",
      successBody:
        "Tu primera entrega sale de nuestro taller de Malasaña el 1 de agosto, con seguimiento en cuanto se envíe. El día de abrir la caja ya está en el calendario.",
      edit: "Ajustar mi caja",
      priceLocale: "es-ES",
      currency: "EUR",
    },
    monthBox: {
      label: "Este mes",
      title: "Dentro de la caja de julio.",
      theme: "N.º 47 — Hora Dorada",
      intro:
        "Seis de las diez elecciones de julio, desclasificadas. Gira una carta para conocer el snack; las demás siguen en secreto hasta el día de abrirla.",
      flipHint: "Toca para descubrir",
      revealAll: "Descubrir las seis",
      hideAll: "Volver a esconderlas",
      secretNote: "Otras cuatro elecciones viajan de incógnito.",
      items: [
        {
          category: "Crujiente",
          name: "Chips de Maíz Tostado con Lima",
          maker: "Milpa y Sal · Oaxaca",
          note: "Ahumado, cítrico y peligrosamente adictivo.",
        },
        {
          category: "Dulce",
          name: "Bombones de Guayaba y Cacao 70%",
          maker: "Dona Nena Confeitaria · Belo Horizonte",
          note: "Corazón de guayaba en cobertura intensa.",
        },
        {
          category: "Salado",
          name: "Crackers de Masa Madre con Higo y Romero",
          maker: "Hearth & Larder · Vermont",
          note: "Horneados el martes, enviados el miércoles.",
        },
        {
          category: "Picante",
          name: "Lámina de Mango y Habanero",
          maker: "Sol Dorado · San Diego",
          note: "Primero el sol, luego un fuego lento.",
        },
        {
          category: "Umami",
          name: "Palomitas de Caramelo y Miso",
          maker: "Ochre Pantry · Portland",
          note: "Dulces y saladas, con punto tostado.",
        },
        {
          category: "Para beber",
          name: "Kit de Refresco de Hibisco y Jengibre",
          maker: "Flor de Agosto · Ciudad de México",
          note: "Infusiona, enfría y sirve con hielo.",
        },
      ],
    },
    pastBoxes: {
      label: "El archivo",
      title: "Cuarenta y seis cajas y subiendo.",
      intro:
        "Aquí vive cada caja retirada. Algunas vuelven en tiradas limitadas de archivo; los suscriptores eligen primero.",
      archiveNote: "Las tiradas de archivo abren el día 15 de cada mes.",
      alts: {
        jars: "Estante de despensa con tarros de conservas",
        snacks: "Snacks de verduras variados sobre mantel de lino",
      },
      boxes: [
        {
          month: "Junio 2026",
          theme: "Temporada de Pícnic",
          blurb:
            "Crujientes de baguette, gominolas de fruta de hueso y almendras ahumadas para una manta en el parque.",
          tag: "Tirada de archivo",
        },
        {
          month: "Mayo 2026",
          theme: "Despensa para Días de Lluvia",
          blurb:
            "Caldos, chocolate negro y crackers de doble queso para quedarse en casa a propósito.",
        },
        {
          month: "Abril 2026",
          theme: "Desfile Cítrico",
          blurb:
            "Caramelos de yuzu, pastas de naranja sanguina y una sal de lima y chile con la que aún soñamos.",
          tag: "Agotada",
        },
        {
          month: "Marzo 2026",
          theme: "Para Brindar",
          blurb:
            "Panes de semillas, miel montada y tres mermeladas de una finca familiar de Minas Gerais.",
        },
      ],
    },
    gifting: {
      label: "Regalos",
      title: "Una caja, dos maneras de darla.",
      toggleSelf: "Para mí",
      toggleGift: "Para regalar",
      self: {
        headline: "Date un capricho de despensa.",
        body: "La suscripción se renueva el día 1 y tú mandas: pausa, sáltate un mes o cambia de tamaño con un toque, sin correos ni llamadas ni remordimientos.",
        bullets: [
          "Pausa o salta cualquier mes con un toque",
          "Cambia de tamaño entre caja y caja",
          "Tus valoraciones afinan la siguiente caja",
        ],
        cta: "Empezar mi suscripción",
      },
      gift: {
        headline: "Envía el mejor correo de su mes.",
        body: "Los regalos van sin ataduras: elige 1, 3 o 6 cajas, escribe una nota que rotulamos a mano y listo. Un regalo nunca se renueva solo ni persigue a nadie.",
        bullets: [
          "Nota rotulada a mano dentro de la caja",
          "1, 3 o 6 cajas: nunca se renueva solo",
          "Envuelta para regalo, sin precios impresos",
        ],
        cta: "Enviar una caja de regalo",
      },
      note: "Los regalos pedidos antes del 25 de julio viajan con la caja de agosto.",
      imageAlt: "Caja de regalo con lazo y etiqueta escrita a mano",
    },
    reviews: {
      label: "Boca a boca",
      title: "Reacciones del día de la caja.",
      intro:
        "Directo del buzón del día de la caja: editado por longitud, jamás por entusiasmo.",
      ratingSuffix: "de 5 estrellas",
      items: [
        {
          quote:
            "Mi hija de ocho años llama al día 1 el día de la caja y se niega a abrirla sin la ceremonia completa. ¿Sinceramente? Yo igual.",
          name: "Nerea Ochoa",
          place: "Bilbao",
          tag: "La Clásica · 14 cajas",
          rating: 5,
        },
        {
          quote:
            "Llevo una hoja de cálculo con el ranking de cada snack desde 2024. Las palomitas de caramelo y miso siguen sin destronarse.",
          name: "Tomás Herzog",
          place: "Valencia",
          tag: "El Festín · 22 cajas",
          rating: 5,
        },
        {
          quote:
            "Envié tres cajas de regalo a mi hermano en Sevilla. Ahora me manda vídeos de unboxing. Sin que se lo pida.",
          name: "Luana Barbosa",
          place: "Madrid",
          tag: "Regalo · 3 cajas",
          rating: 5,
        },
        {
          quote:
            "El filtro sin gluten va en serio. La primera suscripción que se toma la etiqueta como norma y no como adorno.",
          name: "Hannah Kaplan",
          place: "Barcelona",
          tag: "La Cata · 8 cajas",
          rating: 4,
        },
      ],
    },
    faq: {
      label: "Preguntas",
      title: "Antes de rasgar el precinto.",
      items: [
        {
          q: "¿Puedo pausar o saltarme un mes?",
          a: "Cuando quieras, con un toque desde tu cuenta. Saltar es gratis, ilimitado e inmediato: el cobro pasa sin más a la siguiente caja que aceptes.",
        },
        {
          q: "¿Cómo gestionáis las alergias?",
          a: "Los filtros sin frutos secos y sin gluten cambian el aprovisionamiento, no solo la mezcla: esas cajas se montan con productos de obradores certificados, en una línea aparte, y cada snack incluye su ficha completa de ingredientes.",
        },
        {
          q: "¿Dónde enviáis?",
          a: "A toda España peninsular en 2 a 4 días y a Baleares en 5 a 7. El envío está incluido en todos los planes: sin sorpresas al pagar.",
        },
        {
          q: "¿Cuándo llega mi primera caja?",
          a: "Las cajas salen del taller el día 1 de cada mes. Si te suscribes antes del 25, entras en el siguiente envío; después, pasas al posterior.",
        },
        {
          q: "¿Puedo comprar una caja sin suscribirme?",
          a: "Las cajas retiradas vuelven de vez en cuando como tiradas de archivo el día 15: compra suelta, sin suscripción. Vuelan; los suscriptores tienen 48 horas de acceso anticipado.",
        },
        {
          q: "¿Y si un snack no me gusta nada?",
          a: "Puntúalo con una estrella y pasan dos cosas: el algoritmo lo retira de tu perfil y, si la caja entera falló, nuestro concierge te abona el mes siguiente. Sí, una persona de carne y hueso.",
        },
      ],
    },
    footer: {
      tagline:
        "Snacks artesanos de pequeños obradores, empacados con mimo y enviados el día 1 de cada mes.",
      newsTitle: "El Informe de la Caja",
      newsBody:
        "Un correo al mes: pistas del próximo tema, entrevistas con obradores y avisos de las tiradas de archivo.",
      newsLabel: "Tu correo electrónico",
      newsPlaceholder: "tu@ejemplo.com",
      newsCta: "Apúntame",
      newsSuccess: "Ya estás en la lista: el próximo informe llega el viernes.",
      newsPrivacy: "Un correo al mes. Ni migas ni spam.",
      exploreLabel: "Explorar",
      explore: [
        { href: "#how", label: "Cómo funciona" },
        { href: "#builder", label: "Crea tu plan" },
        { href: "#month", label: "Este mes" },
        { href: "#archive", label: "Cajas anteriores" },
        { href: "#gifting", label: "Regalos" },
        { href: "#faq", label: "Preguntas" },
      ],
      contactLabel: "Escríbenos",
      addressLines: ["Crateful Provisiones S.L.", "Calle del Pez, 27 — Malasaña", "28004 Madrid"],
      email: "hola@crateful.co",
      instagram: "@crateful.es",
      fine: "© 2026 Crateful Provisiones S.L. Todos los derechos reservados. Guía de alérgenos en cada caja.",
      credit: "Empacado con mimo en Malasaña, Madrid.",
    },
  },
};
