import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface NavContent {
  links: { href: string; label: string }[];
  cta: string;
  menuOpen: string;
  menuClose: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroContent {
  badge: string;
  titleTop: string;
  titleAccent: string;
  sub: string;
  cta: string;
  ctaNote: string;
  ringAlt: string;
  stats: HeroStat[];
  scrollCue: string;
}

export interface ProofContent {
  kicker: string;
  press: string[];
  ratingValue: string;
  ratingLabel: string;
  ratingStars: string;
}

export interface BenefitStep {
  id: string;
  kicker: string;
  title: string;
  body: string;
  score: number;
  scoreUnit: string;
  tag: string;
  bullets: string[];
  metrics: { label: string; value: string }[];
}

export interface BenefitsContent {
  label: string;
  title: string;
  intro: string;
  stepAria: string;
  liveLabel: string;
  steps: BenefitStep[];
}

export interface SpecItem {
  label: string;
  value: string;
  note: string;
}

export interface SpecsContent {
  label: string;
  title: string;
  intro: string;
  items: SpecItem[];
}

export interface ComparisonRow {
  attribute: string;
  halo: string;
  watch: string;
  haloWins: boolean;
}

export interface ComparisonContent {
  label: string;
  title: string;
  intro: string;
  haloName: string;
  watchName: string;
  rows: ComparisonRow[];
  footnote: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  location: string;
  metricValue: string;
  metricLabel: string;
}

export interface TestimonialsContent {
  label: string;
  title: string;
  intro: string;
  items: Testimonial[];
}

export interface Finish {
  id: string;
  name: string;
  band: string;
  face: string;
  delta: number;
}

export interface PricingContent {
  label: string;
  title: string;
  intro: string;
  finishLabel: string;
  quantityLabel: string;
  decrease: string;
  increase: string;
  finishes: Finish[];
  includesTitle: string;
  includes: string[];
  membershipName: string;
  membershipPrice: number;
  perMonth: string;
  membershipNote: string;
  basePrice: number;
  unitLabel: string;
  subtotalLabel: string;
  bundleLabel: string;
  bundleNote: string;
  totalLabel: string;
  cta: string;
  ctaConfirmed: string;
  guarantee: string;
  sizingNote: string;
  reservedTitle: string;
  reservedBody: string;
  reservedReset: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqContent {
  label: string;
  title: string;
  intro: string;
  items: FaqItem[];
}

export interface FinalCtaContent {
  title: string;
  sub: string;
  cta: string;
  ctaNote: string;
  deadlineLabel: string;
  units: { days: string; hours: string; minutes: string; seconds: string };
}

export interface FooterContent {
  tagline: string;
  columns: { title: string; links: string[] }[];
  socialLabel: string;
  socials: { label: string; glyph: "at" | "camera" | "share" | "message" | "globe" }[];
  legal: string;
  region: string;
}

export interface HaloContent {
  intlLocale: string;
  currency: string;
  backToTop: string;
  nav: NavContent;
  hero: HeroContent;
  proof: ProofContent;
  benefits: BenefitsContent;
  specs: SpecsContent;
  comparison: ComparisonContent;
  testimonials: TestimonialsContent;
  pricing: PricingContent;
  faq: FaqContent;
  finalCta: FinalCtaContent;
  footer: FooterContent;
}

/* ------------------------------------------------------------------ */
/* Shared, locale-independent data                                     */
/* ------------------------------------------------------------------ */

const NAV_HREFS = ["#science", "#specs", "#compare", "#reviews", "#pricing"];

const FINISH_META: { id: string; band: string; face: string }[] = [
  { id: "midnight", band: "#1C1F26", face: "#2A2E37" },
  { id: "lunar", band: "#C6CBCE", face: "#E4E8EA" },
  { id: "mint", band: "#3A6D60", face: "#7EE7C7" },
  { id: "stealth", band: "#24272D", face: "#3A3E46" },
  { id: "gold", band: "#B79256", face: "#E4C384" },
];

/* ------------------------------------------------------------------ */
/* English                                                             */
/* ------------------------------------------------------------------ */

const en: HaloContent = {
  intlLocale: "en-US",
  currency: "USD",
  backToTop: "Back to top",
  nav: {
    links: [
      { href: NAV_HREFS[0], label: "Science" },
      { href: NAV_HREFS[1], label: "Specs" },
      { href: NAV_HREFS[2], label: "Compare" },
      { href: NAV_HREFS[3], label: "Reviews" },
      { href: NAV_HREFS[4], label: "Pricing" },
    ],
    cta: "Pre-order",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
  hero: {
    badge: "New — HALO Ring, third generation",
    titleTop: "Your whole health,",
    titleAccent: "read from a ring.",
    sub: "HALO measures sleep, recovery and focus from a single titanium band. No screen to check, nothing on your wrist — just seven days of battery and answers you will actually act on.",
    cta: "Pre-order HALO",
    ctaNote: "Free sizing kit · Ships March 2027 · 30-night trial",
    ringAlt: "The HALO smart ring, a slim titanium band with an inner sensor array glowing mint.",
    stats: [
      { value: "7 days", label: "Battery life" },
      { value: "4 g", label: "Ring weight" },
      { value: "100 m", label: "Water resistant" },
    ],
    scrollCue: "How it reads you",
  },
  proof: {
    kicker: "Covered by",
    press: ["The Verge", "WIRED", "Men's Health", "TechRadar", "Vogue"],
    ratingValue: "4.8",
    ratingStars: "★★★★★",
    ratingLabel: "from 12,400+ members",
  },
  benefits: {
    label: "The science",
    title: "Three numbers that change your day",
    intro: "Every night HALO turns millions of raw readings into three scores you can act on before breakfast. Scroll to see how each one is built.",
    stepAria: "View benefit",
    liveLabel: "Live from your ring",
    steps: [
      {
        id: "sleep",
        kicker: "Overnight",
        title: "Sleep, finally decoded",
        body: "Infrared sensors track every stage — light, deep and REM — plus heart-rate variability and breathing, all without a screen glowing on your nightstand.",
        score: 87,
        scoreUnit: "/100",
        tag: "Optimal",
        bullets: [
          "Stage-by-stage timeline with deep and REM split out",
          "Overnight HRV trend so you see recovery, not guesses",
          "Silent wake window that nudges you at the light moment",
        ],
        metrics: [
          { label: "Deep sleep", value: "1h 42m" },
          { label: "Resting HR", value: "48 bpm" },
          { label: "HRV", value: "62 ms" },
        ],
      },
      {
        id: "readiness",
        kicker: "Every morning",
        title: "Wake up already knowing",
        body: "HALO weighs your sleep, resting heart rate and skin temperature to tell you how much your body has left in the tank — before you decide how hard to push.",
        score: 92,
        scoreUnit: "/100",
        tag: "Primed",
        bullets: [
          "One readiness score that blends 20 recovery signals",
          "Skin-temperature shifts flag illness days early",
          "Personal baseline, not a generic chart for everyone",
        ],
        metrics: [
          { label: "Recovery", value: "High" },
          { label: "Temp trend", value: "-0.1 °C" },
          { label: "Resting HR", value: "Below base" },
        ],
      },
      {
        id: "focus",
        kicker: "Through the day",
        title: "Spend your energy well",
        body: "Daytime stress, activity and heart rate roll into a focus score, so you can put deep work where you have the most left and rest before you crash.",
        score: 78,
        scoreUnit: "/100",
        tag: "Steady",
        bullets: [
          "Stress and restoration mapped across the whole day",
          "Movement and step goals that adapt to your recovery",
          "Gentle prompts to breathe when tension climbs",
        ],
        metrics: [
          { label: "Stress load", value: "Balanced" },
          { label: "Active time", value: "58 min" },
          { label: "Steps", value: "9,240" },
        ],
      },
    ],
  },
  specs: {
    label: "The hardware",
    title: "Engineered down to four grams",
    intro: "Aerospace titanium on the outside, a laboratory on the inside. Nothing you will ever have to think about.",
    items: [
      { label: "Sensors", value: "Infrared PPG + NTC", note: "Heart rate, HRV, SpO2 and temperature" },
      { label: "Battery", value: "Up to 7 days", note: "Full charge in 45 minutes" },
      { label: "Shell", value: "Grade-5 titanium", note: "Scratch-resistant DLC coating" },
      { label: "Water", value: "100 m / 10 ATM", note: "Swim, shower and sauna proof" },
      { label: "Weight", value: "4 grams", note: "Lighter than most wedding bands" },
      { label: "Sizes", value: "US 5 to 13", note: "Free at-home sizing kit included" },
      { label: "Connectivity", value: "Bluetooth 5.3", note: "Syncs to iOS and Android" },
      { label: "Warranty", value: "2 years", note: "Plus a 30-night risk-free trial" },
    ],
  },
  comparison: {
    label: "The honest comparison",
    title: "HALO versus the watch on your wrist",
    intro: "A smartwatch is a great screen you strap to your arm. HALO is a sensor you forget you are wearing. Here is where that difference shows up.",
    haloName: "HALO Ring",
    watchName: "Typical smartwatch",
    rows: [
      { attribute: "Battery between charges", halo: "7 days", watch: "About 1 day", haloWins: true },
      { attribute: "Sleep tracking", halo: "All night, no glow", watch: "Bulky, bright screen", haloWins: true },
      { attribute: "On-body weight", halo: "4 grams", watch: "40–50 grams", haloWins: true },
      { attribute: "Notifications begging for you", halo: "None", watch: "Constant", haloWins: true },
      { attribute: "Charge time", halo: "45 minutes", watch: "1–2 hours", haloWins: true },
      { attribute: "Wear it in a meeting", halo: "Invisible", watch: "A distraction", haloWins: true },
      { attribute: "Full workout GPS on-device", halo: "Via phone", watch: "Built in", haloWins: false },
    ],
    footnote: "We would rather be honest about the one thing a watch does better than pretend HALO does everything.",
  },
  testimonials: {
    label: "The proof",
    title: "Members do not go back to the wrist",
    intro: "Twelve thousand people wore HALO for ninety nights. A few of them told us what changed.",
    items: [
      {
        id: "t1",
        quote: "I stopped guessing whether I was tired or just lazy. The readiness score is brutally honest and it made me train smarter, not harder.",
        name: "Marina Ferraz",
        role: "Marathon runner",
        location: "São Paulo",
        metricValue: "+22%",
        metricLabel: "deep sleep",
      },
      {
        id: "t2",
        quote: "As a surgeon I cannot wear a watch in the OR. HALO is the first thing that actually tracks my nights and it just disappears on my hand.",
        name: "Daniel Osei",
        role: "Cardiac surgeon",
        location: "London",
        metricValue: "6.1h → 7.4h",
        metricLabel: "nightly sleep",
      },
      {
        id: "t3",
        quote: "The temperature trend flagged that I was getting sick two days before I felt it. I rested, and I dodged the worst of it entirely.",
        name: "Priya Nair",
        role: "Product designer",
        location: "Berlin",
        metricValue: "2 days",
        metricLabel: "earlier warning",
      },
      {
        id: "t4",
        quote: "No charging every night, no notifications, no wrist tan line. It is the least demanding device I have ever owned and the most useful.",
        name: "Lucas Andrade",
        role: "Founder",
        location: "Lisbon",
        metricValue: "7 days",
        metricLabel: "between charges",
      },
    ],
  },
  pricing: {
    label: "Reserve yours",
    title: "One ring. Everything included.",
    intro: "No hidden tiers on the hardware. Pick a finish, choose how many, and lock in founder pricing before it ends.",
    finishLabel: "Finish",
    quantityLabel: "Quantity",
    decrease: "Decrease quantity",
    increase: "Increase quantity",
    finishes: [
      { id: "midnight", name: "Midnight", band: FINISH_META[0].band, face: FINISH_META[0].face, delta: 0 },
      { id: "lunar", name: "Lunar Silver", band: FINISH_META[1].band, face: FINISH_META[1].face, delta: 0 },
      { id: "mint", name: "Mint Titanium", band: FINISH_META[2].band, face: FINISH_META[2].face, delta: 0 },
      { id: "stealth", name: "Stealth", band: FINISH_META[3].band, face: FINISH_META[3].face, delta: 0 },
      { id: "gold", name: "Brushed Gold", band: FINISH_META[4].band, face: FINISH_META[4].face, delta: 50 },
    ],
    includesTitle: "Every HALO includes",
    includes: [
      "At-home sizing kit shipped first",
      "Charging dock and USB-C cable",
      "Two years of warranty coverage",
      "Full app for iOS and Android",
    ],
    membershipName: "HALO Membership",
    membershipPrice: 6,
    perMonth: "/mo",
    membershipNote: "First 6 months free, then billed monthly. Cancel anytime.",
    basePrice: 299,
    unitLabel: "each",
    subtotalLabel: "Subtotal",
    bundleLabel: "Bundle saving",
    bundleNote: "Save 10% when you reserve two or more",
    totalLabel: "Due today",
    cta: "Reserve HALO",
    ctaConfirmed: "Reservation held",
    guarantee: "30-night risk-free trial. Send it back for a full refund.",
    sizingNote: "You pay nothing now beyond a fully refundable hold.",
    reservedTitle: "Your HALO is reserved",
    reservedBody: "We have held your finish and size. Your sizing kit ships first, then your ring in March 2027.",
    reservedReset: "Change my reservation",
  },
  faq: {
    label: "Before you ask",
    title: "The questions everyone has",
    intro: "If it is not here, our team answers within a day.",
    items: [
      {
        q: "How is a ring accurate if it is so small?",
        a: "The finger gives a cleaner pulse signal than the wrist because the arteries sit closer to the surface. HALO's infrared sensors sample hundreds of times per second, which is why our sleep staging matches clinical bands within a few percent.",
      },
      {
        q: "Do I need a subscription to use it?",
        a: "No. Every score, trend and insight works out of the box. HALO Membership adds long-range trends and coaching, and your first six months are free so you can decide with no pressure.",
      },
      {
        q: "What if I order the wrong size?",
        a: "You will not, because we ship a free sizing kit before your ring is made. Wear the dummy ring for a day, tell us the size, and we build yours to fit.",
      },
      {
        q: "How long does the battery really last?",
        a: "Up to seven days on a charge in normal use, and a full recharge takes about 45 minutes on the included dock. Most members top it up while they shower.",
      },
      {
        q: "Can I wear it swimming or in the shower?",
        a: "Yes. HALO is rated to 100 metres, so swimming, showering and sauna are all fine. The titanium shell shrugs off soap, chlorine and salt water.",
      },
      {
        q: "Which phones does it work with?",
        a: "Any iPhone on iOS 16 or later and most Android phones running Android 10 or later. HALO syncs over Bluetooth 5.3 in the background.",
      },
    ],
  },
  finalCta: {
    title: "Sleep on data, not on hope.",
    sub: "Founder pricing and the free sizing kit end when the counter hits zero. Reserve now and be among the first wrists — sorry, fingers — with HALO.",
    cta: "Pre-order HALO",
    ctaNote: "Fully refundable · Ships March 2027",
    deadlineLabel: "Founder pricing ends in",
    units: { days: "Days", hours: "Hours", minutes: "Mins", seconds: "Secs" },
  },
  footer: {
    tagline: "The health tracker you forget you are wearing.",
    columns: [
      { title: "Product", links: ["The ring", "The app", "Membership", "Sizing"] },
      { title: "Company", links: ["About HALO", "Science", "Press", "Careers"] },
      { title: "Support", links: ["Help centre", "Warranty", "Contact", "Returns"] },
    ],
    socialLabel: "Follow HALO",
    socials: [
      { label: "HALO on the social feed", glyph: "at" },
      { label: "HALO photo journal", glyph: "camera" },
      { label: "Message HALO", glyph: "message" },
      { label: "HALO worldwide", glyph: "globe" },
    ],
    legal: "© 2027 HALO Health. A concept demo by VigApp. Not a real product.",
    region: "Designed in Porto · Assembled responsibly",
  },
};

/* ------------------------------------------------------------------ */
/* Portuguese                                                          */
/* ------------------------------------------------------------------ */

const pt: HaloContent = {
  intlLocale: "pt-BR",
  currency: "BRL",
  backToTop: "Voltar ao topo",
  nav: {
    links: [
      { href: NAV_HREFS[0], label: "Ciência" },
      { href: NAV_HREFS[1], label: "Ficha" },
      { href: NAV_HREFS[2], label: "Comparar" },
      { href: NAV_HREFS[3], label: "Avaliações" },
      { href: NAV_HREFS[4], label: "Preço" },
    ],
    cta: "Reservar",
    menuOpen: "Abrir menu",
    menuClose: "Fechar menu",
  },
  hero: {
    badge: "Novo — HALO Ring, terceira geração",
    titleTop: "Toda a sua saúde,",
    titleAccent: "lida por um anel.",
    sub: "O HALO mede sono, recuperação e foco a partir de uma única faixa de titânio. Sem tela para conferir, nada no seu pulso — só sete dias de bateria e respostas nas quais você vai realmente agir.",
    cta: "Reservar o HALO",
    ctaNote: "Kit de tamanho grátis · Envio em março de 2027 · 30 noites de teste",
    ringAlt: "O anel inteligente HALO, uma faixa fina de titânio com sensores internos brilhando em verde-menta.",
    stats: [
      { value: "7 dias", label: "Bateria" },
      { value: "4 g", label: "Peso do anel" },
      { value: "100 m", label: "Resistência à água" },
    ],
    scrollCue: "Como ele te lê",
  },
  proof: {
    kicker: "Destaque em",
    press: ["The Verge", "WIRED", "Men's Health", "TechRadar", "Vogue"],
    ratingValue: "4,8",
    ratingStars: "★★★★★",
    ratingLabel: "de mais de 12.400 membros",
  },
  benefits: {
    label: "A ciência",
    title: "Três números que mudam o seu dia",
    intro: "Toda noite o HALO transforma milhões de leituras em três notas que você usa antes do café da manhã. Role para ver como cada uma é construída.",
    stepAria: "Ver benefício",
    liveLabel: "Direto do seu anel",
    steps: [
      {
        id: "sleep",
        kicker: "Durante a noite",
        title: "O sono, enfim decifrado",
        body: "Sensores infravermelhos acompanham cada fase — leve, profundo e REM — além da variabilidade cardíaca e da respiração, sem nenhuma tela acesa na cabeceira.",
        score: 87,
        scoreUnit: "/100",
        tag: "Ótimo",
        bullets: [
          "Linha do tempo fase a fase, com sono profundo e REM separados",
          "Tendência de VFC noturna para ver a recuperação, não achismos",
          "Despertar silencioso que te acorda no momento leve",
        ],
        metrics: [
          { label: "Sono profundo", value: "1h 42m" },
          { label: "FC em repouso", value: "48 bpm" },
          { label: "VFC", value: "62 ms" },
        ],
      },
      {
        id: "readiness",
        kicker: "Toda manhã",
        title: "Acorde já sabendo",
        body: "O HALO pesa seu sono, sua frequência em repouso e a temperatura da pele para dizer quanta energia seu corpo ainda tem — antes de você decidir o ritmo do dia.",
        score: 92,
        scoreUnit: "/100",
        tag: "No ponto",
        bullets: [
          "Uma nota de prontidão que reúne 20 sinais de recuperação",
          "Variações de temperatura avisam doenças com dias de antecedência",
          "Sua linha de base pessoal, não um gráfico genérico",
        ],
        metrics: [
          { label: "Recuperação", value: "Alta" },
          { label: "Temperatura", value: "-0,1 °C" },
          { label: "FC em repouso", value: "Abaixo da base" },
        ],
      },
      {
        id: "focus",
        kicker: "Ao longo do dia",
        title: "Gaste sua energia bem",
        body: "Estresse, atividade e frequência cardíaca do dia viram uma nota de foco, para você colocar o trabalho profundo onde tem mais energia e descansar antes de cair.",
        score: 78,
        scoreUnit: "/100",
        tag: "Estável",
        bullets: [
          "Estresse e recuperação mapeados ao longo de todo o dia",
          "Metas de movimento que se ajustam à sua recuperação",
          "Lembretes gentis para respirar quando a tensão sobe",
        ],
        metrics: [
          { label: "Carga de estresse", value: "Equilibrada" },
          { label: "Tempo ativo", value: "58 min" },
          { label: "Passos", value: "9.240" },
        ],
      },
    ],
  },
  specs: {
    label: "O hardware",
    title: "Projetado até o último grama",
    intro: "Titânio aeroespacial por fora, um laboratório por dentro. Nada com que você precise se preocupar.",
    items: [
      { label: "Sensores", value: "PPG infravermelho + NTC", note: "Frequência, VFC, SpO2 e temperatura" },
      { label: "Bateria", value: "Até 7 dias", note: "Carga completa em 45 minutos" },
      { label: "Corpo", value: "Titânio grau 5", note: "Revestimento DLC anti-riscos" },
      { label: "Água", value: "100 m / 10 ATM", note: "À prova de piscina, banho e sauna" },
      { label: "Peso", value: "4 gramas", note: "Mais leve que a maioria das alianças" },
      { label: "Tamanhos", value: "16 a 23 mm", note: "Kit de medição em casa incluído" },
      { label: "Conexão", value: "Bluetooth 5.3", note: "Sincroniza com iOS e Android" },
      { label: "Garantia", value: "2 anos", note: "Mais 30 noites de teste sem risco" },
    ],
  },
  comparison: {
    label: "A comparação honesta",
    title: "HALO contra o relógio no seu pulso",
    intro: "Um smartwatch é uma ótima tela amarrada ao braço. O HALO é um sensor que você esquece que está usando. É aqui que a diferença aparece.",
    haloName: "HALO Ring",
    watchName: "Smartwatch comum",
    rows: [
      { attribute: "Bateria entre cargas", halo: "7 dias", watch: "Cerca de 1 dia", haloWins: true },
      { attribute: "Monitoramento do sono", halo: "A noite toda, sem brilho", watch: "Volumoso e luminoso", haloWins: true },
      { attribute: "Peso no corpo", halo: "4 gramas", watch: "40–50 gramas", haloWins: true },
      { attribute: "Notificações te chamando", halo: "Nenhuma", watch: "Constantes", haloWins: true },
      { attribute: "Tempo de carga", halo: "45 minutos", watch: "1–2 horas", haloWins: true },
      { attribute: "Usar numa reunião", halo: "Invisível", watch: "Uma distração", haloWins: true },
      { attribute: "GPS de treino no aparelho", halo: "Pelo celular", watch: "Integrado", haloWins: false },
    ],
    footnote: "Preferimos ser honestos sobre a única coisa que o relógio faz melhor a fingir que o HALO faz tudo.",
  },
  testimonials: {
    label: "A prova",
    title: "Quem usa não volta para o pulso",
    intro: "Doze mil pessoas usaram o HALO por noventa noites. Algumas contaram o que mudou.",
    items: [
      {
        id: "t1",
        quote: "Parei de adivinhar se estava cansada ou só com preguiça. A nota de prontidão é brutalmente honesta e me fez treinar com mais inteligência.",
        name: "Marina Ferraz",
        role: "Maratonista",
        location: "São Paulo",
        metricValue: "+22%",
        metricLabel: "sono profundo",
      },
      {
        id: "t2",
        quote: "Como cirurgião não posso usar relógio no centro cirúrgico. O HALO é a primeira coisa que acompanha minhas noites e some na minha mão.",
        name: "Daniel Osei",
        role: "Cirurgião cardíaco",
        location: "Londres",
        metricValue: "6,1h → 7,4h",
        metricLabel: "sono por noite",
      },
      {
        id: "t3",
        quote: "A tendência de temperatura avisou que eu ia adoecer dois dias antes de sentir. Descansei e escapei do pior por completo.",
        name: "Priya Nair",
        role: "Designer de produto",
        location: "Berlim",
        metricValue: "2 dias",
        metricLabel: "de aviso prévio",
      },
      {
        id: "t4",
        quote: "Sem carregar toda noite, sem notificações, sem marca no pulso. É o aparelho menos exigente que já tive e o mais útil.",
        name: "Lucas Andrade",
        role: "Fundador",
        location: "Lisboa",
        metricValue: "7 dias",
        metricLabel: "entre cargas",
      },
    ],
  },
  pricing: {
    label: "Reserve o seu",
    title: "Um anel. Tudo incluído.",
    intro: "Sem níveis escondidos no hardware. Escolha um acabamento, a quantidade e garanta o preço de lançamento antes que ele acabe.",
    finishLabel: "Acabamento",
    quantityLabel: "Quantidade",
    decrease: "Diminuir quantidade",
    increase: "Aumentar quantidade",
    finishes: [
      { id: "midnight", name: "Meia-noite", band: FINISH_META[0].band, face: FINISH_META[0].face, delta: 0 },
      { id: "lunar", name: "Prata Lunar", band: FINISH_META[1].band, face: FINISH_META[1].face, delta: 0 },
      { id: "mint", name: "Titânio Menta", band: FINISH_META[2].band, face: FINISH_META[2].face, delta: 0 },
      { id: "stealth", name: "Grafite", band: FINISH_META[3].band, face: FINISH_META[3].face, delta: 0 },
      { id: "gold", name: "Dourado Escovado", band: FINISH_META[4].band, face: FINISH_META[4].face, delta: 300 },
    ],
    includesTitle: "Todo HALO inclui",
    includes: [
      "Kit de medição enviado primeiro",
      "Base de carga e cabo USB-C",
      "Dois anos de garantia",
      "App completo para iOS e Android",
    ],
    membershipName: "HALO Membership",
    membershipPrice: 30,
    perMonth: "/mês",
    membershipNote: "Primeiros 6 meses grátis, depois cobrança mensal. Cancele quando quiser.",
    basePrice: 1799,
    unitLabel: "cada",
    subtotalLabel: "Subtotal",
    bundleLabel: "Desconto do combo",
    bundleNote: "Economize 10% ao reservar dois ou mais",
    totalLabel: "A pagar hoje",
    cta: "Reservar o HALO",
    ctaConfirmed: "Reserva garantida",
    guarantee: "30 noites de teste sem risco. Devolva para reembolso total.",
    sizingNote: "Você não paga nada agora além de uma reserva 100% reembolsável.",
    reservedTitle: "Seu HALO está reservado",
    reservedBody: "Guardamos seu acabamento e tamanho. O kit de medição vai primeiro, e o anel em março de 2027.",
    reservedReset: "Alterar minha reserva",
  },
  faq: {
    label: "Antes de perguntar",
    title: "As dúvidas que todo mundo tem",
    intro: "Se não estiver aqui, nosso time responde em até um dia.",
    items: [
      {
        q: "Como um anel tão pequeno é preciso?",
        a: "O dedo dá um sinal de pulso mais limpo que o pulso porque as artérias ficam mais na superfície. Os sensores infravermelhos do HALO amostram centenas de vezes por segundo, por isso o estágio do sono bate com faixas clínicas com poucos por cento de diferença.",
      },
      {
        q: "Preciso de assinatura para usar?",
        a: "Não. Toda nota, tendência e insight funciona de fábrica. O HALO Membership adiciona tendências de longo prazo e coaching, e os primeiros seis meses são grátis para você decidir sem pressão.",
      },
      {
        q: "E se eu pedir o tamanho errado?",
        a: "Você não vai, porque enviamos um kit de medição grátis antes de fabricar o anel. Use o anel de teste por um dia, nos diga o tamanho e montamos o seu sob medida.",
      },
      {
        q: "Quanto dura a bateria de verdade?",
        a: "Até sete dias por carga em uso normal, e uma carga completa leva cerca de 45 minutos na base incluída. A maioria dos membros carrega enquanto toma banho.",
      },
      {
        q: "Posso usar na piscina ou no banho?",
        a: "Sim. O HALO resiste a 100 metros, então piscina, banho e sauna são tranquilos. O corpo de titânio ignora sabão, cloro e água salgada.",
      },
      {
        q: "Com quais celulares funciona?",
        a: "Qualquer iPhone com iOS 16 ou mais recente e a maioria dos Android com Android 10 ou superior. O HALO sincroniza por Bluetooth 5.3 em segundo plano.",
      },
    ],
  },
  finalCta: {
    title: "Durma com dados, não com esperança.",
    sub: "O preço de lançamento e o kit grátis acabam quando o contador zerar. Reserve agora e esteja entre os primeiros dedos com HALO.",
    cta: "Reservar o HALO",
    ctaNote: "Totalmente reembolsável · Envio em março de 2027",
    deadlineLabel: "Preço de lançamento acaba em",
    units: { days: "Dias", hours: "Horas", minutes: "Min", seconds: "Seg" },
  },
  footer: {
    tagline: "O monitor de saúde que você esquece que está usando.",
    columns: [
      { title: "Produto", links: ["O anel", "O app", "Membership", "Tamanhos"] },
      { title: "Empresa", links: ["Sobre o HALO", "Ciência", "Imprensa", "Carreiras"] },
      { title: "Suporte", links: ["Central de ajuda", "Garantia", "Contato", "Devoluções"] },
    ],
    socialLabel: "Siga o HALO",
    socials: [
      { label: "HALO no feed social", glyph: "at" },
      { label: "Diário de fotos HALO", glyph: "camera" },
      { label: "Falar com o HALO", glyph: "message" },
      { label: "HALO no mundo", glyph: "globe" },
    ],
    legal: "© 2027 HALO Health. Um conceito demonstrativo da VigApp. Não é um produto real.",
    region: "Desenhado no Porto · Montado com responsabilidade",
  },
};

/* ------------------------------------------------------------------ */
/* Spanish                                                             */
/* ------------------------------------------------------------------ */

const es: HaloContent = {
  intlLocale: "es-ES",
  currency: "EUR",
  backToTop: "Volver arriba",
  nav: {
    links: [
      { href: NAV_HREFS[0], label: "Ciencia" },
      { href: NAV_HREFS[1], label: "Ficha" },
      { href: NAV_HREFS[2], label: "Comparar" },
      { href: NAV_HREFS[3], label: "Opiniones" },
      { href: NAV_HREFS[4], label: "Precio" },
    ],
    cta: "Reservar",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
  },
  hero: {
    badge: "Nuevo — HALO Ring, tercera generación",
    titleTop: "Toda tu salud,",
    titleAccent: "leída en un anillo.",
    sub: "HALO mide sueño, recuperación y foco desde una sola banda de titanio. Sin pantalla que mirar, nada en la muñeca — solo siete días de batería y respuestas sobre las que de verdad vas a actuar.",
    cta: "Reservar HALO",
    ctaNote: "Kit de tallaje gratis · Envío en marzo de 2027 · 30 noches de prueba",
    ringAlt: "El anillo inteligente HALO, una fina banda de titanio con sensores internos en un brillo verde menta.",
    stats: [
      { value: "7 días", label: "Batería" },
      { value: "4 g", label: "Peso del anillo" },
      { value: "100 m", label: "Resistencia al agua" },
    ],
    scrollCue: "Cómo te lee",
  },
  proof: {
    kicker: "Aparece en",
    press: ["The Verge", "WIRED", "Men's Health", "TechRadar", "Vogue"],
    ratingValue: "4,8",
    ratingStars: "★★★★★",
    ratingLabel: "de más de 12.400 miembros",
  },
  benefits: {
    label: "La ciencia",
    title: "Tres números que cambian tu día",
    intro: "Cada noche HALO convierte millones de lecturas en tres puntuaciones que usas antes del desayuno. Desplázate para ver cómo se construye cada una.",
    stepAria: "Ver beneficio",
    liveLabel: "En directo desde tu anillo",
    steps: [
      {
        id: "sleep",
        kicker: "Por la noche",
        title: "El sueño, por fin descifrado",
        body: "Sensores infrarrojos siguen cada fase — ligera, profunda y REM — más la variabilidad cardíaca y la respiración, sin ninguna pantalla encendida en la mesilla.",
        score: 87,
        scoreUnit: "/100",
        tag: "Óptimo",
        bullets: [
          "Cronología fase por fase con sueño profundo y REM separados",
          "Tendencia de VFC nocturna para ver recuperación, no suposiciones",
          "Despertador silencioso que te avisa en el momento ligero",
        ],
        metrics: [
          { label: "Sueño profundo", value: "1h 42m" },
          { label: "FC en reposo", value: "48 ppm" },
          { label: "VFC", value: "62 ms" },
        ],
      },
      {
        id: "readiness",
        kicker: "Cada mañana",
        title: "Despierta ya sabiendo",
        body: "HALO pondera tu sueño, tu frecuencia en reposo y la temperatura de la piel para decirte cuánta energía te queda — antes de decidir cuánto exigirte.",
        score: 92,
        scoreUnit: "/100",
        tag: "A punto",
        bullets: [
          "Una puntuación de disposición que reúne 20 señales de recuperación",
          "Los cambios de temperatura avisan de enfermedad con días de margen",
          "Tu línea base personal, no un gráfico genérico para todos",
        ],
        metrics: [
          { label: "Recuperación", value: "Alta" },
          { label: "Temperatura", value: "-0,1 °C" },
          { label: "FC en reposo", value: "Bajo la base" },
        ],
      },
      {
        id: "focus",
        kicker: "Durante el día",
        title: "Gasta bien tu energía",
        body: "El estrés, la actividad y la frecuencia del día se resumen en una puntuación de foco, para poner el trabajo profundo donde más te queda y descansar antes de caer.",
        score: 78,
        scoreUnit: "/100",
        tag: "Estable",
        bullets: [
          "Estrés y recuperación mapeados durante todo el día",
          "Metas de movimiento que se adaptan a tu recuperación",
          "Avisos suaves para respirar cuando sube la tensión",
        ],
        metrics: [
          { label: "Carga de estrés", value: "Equilibrada" },
          { label: "Tiempo activo", value: "58 min" },
          { label: "Pasos", value: "9.240" },
        ],
      },
    ],
  },
  specs: {
    label: "El hardware",
    title: "Diseñado hasta el último gramo",
    intro: "Titanio aeroespacial por fuera, un laboratorio por dentro. Nada en lo que tengas que pensar.",
    items: [
      { label: "Sensores", value: "PPG infrarrojo + NTC", note: "Frecuencia, VFC, SpO2 y temperatura" },
      { label: "Batería", value: "Hasta 7 días", note: "Carga completa en 45 minutos" },
      { label: "Cuerpo", value: "Titanio grado 5", note: "Recubrimiento DLC antiarañazos" },
      { label: "Agua", value: "100 m / 10 ATM", note: "Resiste piscina, ducha y sauna" },
      { label: "Peso", value: "4 gramos", note: "Más ligero que la mayoría de alianzas" },
      { label: "Tallas", value: "16 a 23 mm", note: "Kit de tallaje en casa incluido" },
      { label: "Conexión", value: "Bluetooth 5.3", note: "Sincroniza con iOS y Android" },
      { label: "Garantía", value: "2 años", note: "Más 30 noches de prueba sin riesgo" },
    ],
  },
  comparison: {
    label: "La comparación honesta",
    title: "HALO frente al reloj de tu muñeca",
    intro: "Un smartwatch es una gran pantalla atada al brazo. HALO es un sensor que olvidas que llevas. Aquí es donde se nota la diferencia.",
    haloName: "HALO Ring",
    watchName: "Smartwatch típico",
    rows: [
      { attribute: "Batería entre cargas", halo: "7 días", watch: "Alrededor de 1 día", haloWins: true },
      { attribute: "Seguimiento del sueño", halo: "Toda la noche, sin brillo", watch: "Voluminoso y luminoso", haloWins: true },
      { attribute: "Peso en el cuerpo", halo: "4 gramos", watch: "40–50 gramos", haloWins: true },
      { attribute: "Notificaciones reclamándote", halo: "Ninguna", watch: "Constantes", haloWins: true },
      { attribute: "Tiempo de carga", halo: "45 minutos", watch: "1–2 horas", haloWins: true },
      { attribute: "Llevarlo en una reunión", halo: "Invisible", watch: "Una distracción", haloWins: true },
      { attribute: "GPS de entreno en el aparato", halo: "Vía móvil", watch: "Integrado", haloWins: false },
    ],
    footnote: "Preferimos ser honestos sobre lo único que un reloj hace mejor antes que fingir que HALO lo hace todo.",
  },
  testimonials: {
    label: "La prueba",
    title: "Quien lo usa no vuelve a la muñeca",
    intro: "Doce mil personas llevaron HALO durante noventa noches. Algunas nos contaron qué cambió.",
    items: [
      {
        id: "t1",
        quote: "Dejé de adivinar si estaba cansada o solo perezosa. La puntuación de disposición es brutalmente honesta y me hizo entrenar con más cabeza.",
        name: "Marina Ferraz",
        role: "Maratonista",
        location: "São Paulo",
        metricValue: "+22%",
        metricLabel: "sueño profundo",
      },
      {
        id: "t2",
        quote: "Como cirujano no puedo llevar reloj en quirófano. HALO es lo primero que sigue mis noches de verdad y desaparece en mi mano.",
        name: "Daniel Osei",
        role: "Cirujano cardíaco",
        location: "Londres",
        metricValue: "6,1h → 7,4h",
        metricLabel: "sueño por noche",
      },
      {
        id: "t3",
        quote: "La tendencia de temperatura avisó de que iba a enfermar dos días antes de notarlo. Descansé y esquivé lo peor por completo.",
        name: "Priya Nair",
        role: "Diseñadora de producto",
        location: "Berlín",
        metricValue: "2 días",
        metricLabel: "de aviso previo",
      },
      {
        id: "t4",
        quote: "Sin cargar cada noche, sin notificaciones, sin marca en la muñeca. Es el aparato menos exigente que he tenido y el más útil.",
        name: "Lucas Andrade",
        role: "Fundador",
        location: "Lisboa",
        metricValue: "7 días",
        metricLabel: "entre cargas",
      },
    ],
  },
  pricing: {
    label: "Reserva el tuyo",
    title: "Un anillo. Todo incluido.",
    intro: "Sin niveles ocultos en el hardware. Elige un acabado, cuántos quieres y asegura el precio de lanzamiento antes de que termine.",
    finishLabel: "Acabado",
    quantityLabel: "Cantidad",
    decrease: "Reducir cantidad",
    increase: "Aumentar cantidad",
    finishes: [
      { id: "midnight", name: "Medianoche", band: FINISH_META[0].band, face: FINISH_META[0].face, delta: 0 },
      { id: "lunar", name: "Plata Lunar", band: FINISH_META[1].band, face: FINISH_META[1].face, delta: 0 },
      { id: "mint", name: "Titanio Menta", band: FINISH_META[2].band, face: FINISH_META[2].face, delta: 0 },
      { id: "stealth", name: "Grafito", band: FINISH_META[3].band, face: FINISH_META[3].face, delta: 0 },
      { id: "gold", name: "Oro Cepillado", band: FINISH_META[4].band, face: FINISH_META[4].face, delta: 50 },
    ],
    includesTitle: "Cada HALO incluye",
    includes: [
      "Kit de tallaje enviado primero",
      "Base de carga y cable USB-C",
      "Dos años de garantía",
      "App completa para iOS y Android",
    ],
    membershipName: "HALO Membership",
    membershipPrice: 6,
    perMonth: "/mes",
    membershipNote: "Primeros 6 meses gratis, luego cobro mensual. Cancela cuando quieras.",
    basePrice: 299,
    unitLabel: "cada uno",
    subtotalLabel: "Subtotal",
    bundleLabel: "Descuento por pack",
    bundleNote: "Ahorra un 10% al reservar dos o más",
    totalLabel: "A pagar hoy",
    cta: "Reservar HALO",
    ctaConfirmed: "Reserva confirmada",
    guarantee: "30 noches de prueba sin riesgo. Devuélvelo y te reembolsamos.",
    sizingNote: "Hoy no pagas nada más allá de una reserva 100% reembolsable.",
    reservedTitle: "Tu HALO está reservado",
    reservedBody: "Hemos guardado tu acabado y talla. El kit de tallaje va primero y el anillo en marzo de 2027.",
    reservedReset: "Cambiar mi reserva",
  },
  faq: {
    label: "Antes de preguntar",
    title: "Las dudas que todos tienen",
    intro: "Si no está aquí, nuestro equipo responde en un día.",
    items: [
      {
        q: "¿Cómo es preciso un anillo tan pequeño?",
        a: "El dedo da una señal de pulso más limpia que la muñeca porque las arterias están más cerca de la superficie. Los sensores infrarrojos de HALO muestrean cientos de veces por segundo, por eso nuestra fase del sueño coincide con las bandas clínicas con pocos puntos de diferencia.",
      },
      {
        q: "¿Necesito suscripción para usarlo?",
        a: "No. Cada puntuación, tendencia e insight funciona desde el primer día. HALO Membership añade tendencias a largo plazo y coaching, y tus primeros seis meses son gratis para decidir sin presión.",
      },
      {
        q: "¿Y si pido la talla equivocada?",
        a: "No lo harás, porque enviamos un kit de tallaje gratis antes de fabricar tu anillo. Lleva el anillo de prueba un día, dinos la talla y hacemos el tuyo a medida.",
      },
      {
        q: "¿Cuánto dura de verdad la batería?",
        a: "Hasta siete días por carga en uso normal, y una carga completa tarda unos 45 minutos en la base incluida. La mayoría lo carga mientras se ducha.",
      },
      {
        q: "¿Puedo llevarlo a nadar o a la ducha?",
        a: "Sí. HALO resiste hasta 100 metros, así que nadar, ducharte y la sauna van bien. El cuerpo de titanio ignora el jabón, el cloro y el agua salada.",
      },
      {
        q: "¿Con qué móviles funciona?",
        a: "Cualquier iPhone con iOS 16 o posterior y la mayoría de Android con Android 10 o superior. HALO sincroniza por Bluetooth 5.3 en segundo plano.",
      },
    ],
  },
  finalCta: {
    title: "Duerme sobre datos, no sobre esperanzas.",
    sub: "El precio de lanzamiento y el kit gratis terminan cuando el contador llegue a cero. Reserva ahora y sé de los primeros dedos con HALO.",
    cta: "Reservar HALO",
    ctaNote: "Totalmente reembolsable · Envío en marzo de 2027",
    deadlineLabel: "El precio de lanzamiento termina en",
    units: { days: "Días", hours: "Horas", minutes: "Min", seconds: "Seg" },
  },
  footer: {
    tagline: "El medidor de salud que olvidas que llevas.",
    columns: [
      { title: "Producto", links: ["El anillo", "La app", "Membership", "Tallas"] },
      { title: "Empresa", links: ["Sobre HALO", "Ciencia", "Prensa", "Empleo"] },
      { title: "Soporte", links: ["Centro de ayuda", "Garantía", "Contacto", "Devoluciones"] },
    ],
    socialLabel: "Sigue a HALO",
    socials: [
      { label: "HALO en el feed social", glyph: "at" },
      { label: "Diario de fotos HALO", glyph: "camera" },
      { label: "Escribir a HALO", glyph: "message" },
      { label: "HALO en el mundo", glyph: "globe" },
    ],
    legal: "© 2027 HALO Health. Una demo conceptual de VigApp. No es un producto real.",
    region: "Diseñado en Oporto · Ensamblado con responsabilidad",
  },
};

/* ------------------------------------------------------------------ */
/* Export                                                              */
/* ------------------------------------------------------------------ */

export const haloDict: DemoDictionary<HaloContent> = { en, pt, es };
