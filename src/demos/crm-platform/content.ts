import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type StageId = "lead" | "qualified" | "proposal" | "negotiation" | "won";
export type TagId = "customer" | "prospect" | "vip" | "trial" | "churned";
export type FeatureIconId = "columns" | "table" | "zap";
export type RecipeIconId = "userPlus" | "mailCheck" | "calendarClock" | "flame" | "bellRing" | "gitBranch";
export type SocialId = "site" | "at" | "chat" | "share";

export interface NavLink {
  href: string;
  label: string;
}

export interface NavContent {
  links: NavLink[];
  signIn: string;
  cta: string;
  openMenu: string;
  closeMenu: string;
}

export interface Deal {
  id: string;
  company: string;
  contact: string;
  owner: string;
  value: number;
  stage: number;
}

export interface PipelineContent {
  windowTitle: string;
  liveLabel: string;
  stages: { id: StageId; label: string }[];
  deals: Deal[];
  advanceHint: string;
  wonLabel: string;
  resetLabel: string;
  totalCaption: string;
  dealsWord: string;
  currency: string;
  localeTag: string;
}

export interface HeroContent {
  badge: string;
  titleTop: string;
  titleAccent: string;
  titleEnd: string;
  sub: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: { value: string; label: string }[];
  boardEyebrow: string;
  pipeline: PipelineContent;
}

export interface FeatureItem {
  icon: FeatureIconId;
  title: string;
  body: string;
  points: string[];
}

export interface FeaturesContent {
  label: string;
  title: string;
  intro: string;
  items: FeatureItem[];
}

export interface Contact {
  id: string;
  name: string;
  initials: string;
  company: string;
  role: string;
  tag: TagId;
  handle: string;
  openDeals: number;
  value: string;
}

export interface ContactsContent {
  label: string;
  title: string;
  intro: string;
  searchLabel: string;
  searchPlaceholder: string;
  filterLabel: string;
  allLabel: string;
  tags: { id: TagId; label: string }[];
  columns: { contact: string; company: string; tag: string; deals: string; value: string };
  resultsWord: string;
  emptyTitle: string;
  emptyBody: string;
  clearLabel: string;
  contacts: Contact[];
}

export interface Recipe {
  id: string;
  icon: RecipeIconId;
  trigger: string;
  action: string;
  blurb: string;
  runs: string;
  defaultOn: boolean;
}

export interface AutomationsContent {
  label: string;
  title: string;
  intro: string;
  triggerWord: string;
  actionWord: string;
  runsWord: string;
  activeLabel: string;
  enableLabel: string;
  disableLabel: string;
  recipes: Recipe[];
}

export interface PricingTier {
  id: string;
  name: string;
  blurb: string;
  perSeat: number;
  customLabel?: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

export interface PricingContent {
  label: string;
  title: string;
  intro: string;
  seatsLabel: string;
  seatsWord: string;
  minSeats: number;
  maxSeats: number;
  defaultSeats: number;
  perSeatCaption: string;
  monthlyCaption: string;
  totalCaption: string;
  currency: string;
  localeTag: string;
  tiers: PricingTier[];
  footnote: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  metricValue: string;
  metricLabel: string;
}

export interface TestimonialsContent {
  label: string;
  title: string;
  intro: string;
  imageAlt: string;
  featured: Testimonial;
  others: Testimonial[];
}

export interface CtaContent {
  title: string;
  sub: string;
  primary: string;
  secondary: string;
  note: string;
  bullets: string[];
}

export interface FooterContent {
  blurb: string;
  columns: { title: string; links: NavLink[] }[];
  socials: { id: SocialId; label: string }[];
  copyright: string;
  statusLabel: string;
}

export interface RelatyContent {
  nav: NavContent;
  hero: HeroContent;
  features: FeaturesContent;
  contacts: ContactsContent;
  automations: AutomationsContent;
  pricing: PricingContent;
  testimonials: TestimonialsContent;
  cta: CtaContent;
  footer: FooterContent;
}

/* ------------------------------------------------------------------ */
/* Shared, locale-independent structures                              */
/* ------------------------------------------------------------------ */

const DEALS: Deal[] = [
  { id: "d1", company: "Northwind Traders", contact: "Priya Nadella", owner: "AC", value: 12000, stage: 0 },
  { id: "d2", company: "Marlowe Foods", contact: "Diego Antunes", owner: "KD", value: 8400, stage: 0 },
  { id: "d3", company: "Lumen Health", contact: "Sofia Marchetti", owner: "MR", value: 28500, stage: 1 },
  { id: "d4", company: "Selva Logística", contact: "Rafael Bittencourt", owner: "RB", value: 41200, stage: 1 },
  { id: "d5", company: "Vertex Robotics", contact: "Jonas Sørensen", owner: "JS", value: 54000, stage: 2 },
  { id: "d6", company: "Cobalt Studios", contact: "Amara Okafor", owner: "PL", value: 19800, stage: 3 },
  { id: "d7", company: "Aurora Bank", contact: "Helena Vasquez", owner: "TN", value: 86000, stage: 4 },
];

/* ------------------------------------------------------------------ */
/* English (mandatory base)                                            */
/* ------------------------------------------------------------------ */

const en: RelatyContent = {
  nav: {
    links: [
      { href: "#pipeline", label: "Pipeline" },
      { href: "#features", label: "Features" },
      { href: "#contacts", label: "Contacts" },
      { href: "#automations", label: "Automations" },
      { href: "#pricing", label: "Pricing" },
    ],
    signIn: "Sign in",
    cta: "Start free",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    badge: "The CRM your revenue team actually opens",
    titleTop: "Close more,",
    titleAccent: "chase less.",
    titleEnd: "",
    sub: "Relaty turns a messy spreadsheet of leads into a living pipeline. Drag a deal forward, watch the forecast update, and let automations handle the follow-up while you close.",
    ctaPrimary: "Start free trial",
    ctaSecondary: "Watch the 2-min tour",
    stats: [
      { value: "31%", label: "shorter sales cycle" },
      { value: "2.4x", label: "more follow-ups sent" },
      { value: "12k+", label: "teams on Relaty" },
    ],
    boardEyebrow: "Live pipeline",
    pipeline: {
      windowTitle: "Q3 Revenue Pipeline",
      liveLabel: "Live",
      stages: [
        { id: "lead", label: "Lead" },
        { id: "qualified", label: "Qualified" },
        { id: "proposal", label: "Proposal" },
        { id: "negotiation", label: "Negotiation" },
        { id: "won", label: "Won" },
      ],
      deals: DEALS,
      advanceHint: "Click a deal to move it to the next stage",
      wonLabel: "Closed won",
      resetLabel: "Reset board",
      totalCaption: "in stage",
      dealsWord: "deals",
      currency: "USD",
      localeTag: "en-US",
    },
  },
  features: {
    label: "Why Relaty",
    title: "Everything a deal needs, in one calm workspace",
    intro: "No add-ons to buy, no consultants to hire. The pipeline, the people and the busywork all live together.",
    items: [
      {
        icon: "columns",
        title: "A pipeline you can read at a glance",
        body: "Stages that mirror how you actually sell. Every card carries its value, owner and next step, so the forecast is never a guess.",
        points: ["Weighted forecasting", "Custom stages per team", "Drag or click to advance"],
      },
      {
        icon: "table",
        title: "Contacts that remember everything",
        body: "One profile per person: emails, calls, notes and open deals. Search by anyone, filter by any tag, and never ask for the same detail twice.",
        points: ["Unified activity timeline", "Smart tags and segments", "Duplicate merge on import"],
      },
      {
        icon: "zap",
        title: "Automations that do the chasing",
        body: "Recipes fire the moment a deal changes: a welcome email, a task, a Slack ping. Set them once and watch the busywork disappear.",
        points: ["No-code recipe builder", "Trigger on any field change", "Runs while you sleep"],
      },
    ],
  },
  contacts: {
    label: "Contacts",
    title: "Find anyone in your book in one keystroke",
    intro: "Search runs as you type and every tag is a live filter. This is the same table your reps live in all day.",
    searchLabel: "Search contacts",
    searchPlaceholder: "Search by name, company or role",
    filterLabel: "Filter by tag",
    allLabel: "All",
    tags: [
      { id: "customer", label: "Customer" },
      { id: "prospect", label: "Prospect" },
      { id: "vip", label: "VIP" },
      { id: "trial", label: "Trial" },
      { id: "churned", label: "Churned" },
    ],
    columns: { contact: "Contact", company: "Company", tag: "Tag", deals: "Open deals", value: "Lifetime value" },
    resultsWord: "contacts",
    emptyTitle: "No matches",
    emptyBody: "Try a different name or clear the tag filter to see everyone.",
    clearLabel: "Clear filters",
    contacts: [
      { id: "c1", name: "Priya Nadella", initials: "PN", company: "Northwind Traders", role: "Head of Ops", tag: "prospect", handle: "priya@northwind.io", openDeals: 2, value: "$18,400" },
      { id: "c2", name: "Sofia Marchetti", initials: "SM", company: "Lumen Health", role: "VP Procurement", tag: "customer", handle: "sofia@lumen.health", openDeals: 1, value: "$96,200" },
      { id: "c3", name: "Jonas Sørensen", initials: "JS", company: "Vertex Robotics", role: "Founder & CEO", tag: "vip", handle: "jonas@vertex.dev", openDeals: 3, value: "$210,000" },
      { id: "c4", name: "Amara Okafor", initials: "AO", company: "Cobalt Studios", role: "Creative Director", tag: "prospect", handle: "amara@cobalt.studio", openDeals: 1, value: "$19,800" },
      { id: "c5", name: "Rafael Bittencourt", initials: "RB", company: "Selva Logística", role: "COO", tag: "trial", handle: "rafael@selva.com.br", openDeals: 2, value: "$41,200" },
      { id: "c6", name: "Helena Vasquez", initials: "HV", company: "Aurora Bank", role: "Director of IT", tag: "customer", handle: "helena@aurorabank.com", openDeals: 0, value: "$340,500" },
      { id: "c7", name: "Diego Antunes", initials: "DA", company: "Marlowe Foods", role: "Buyer", tag: "prospect", handle: "diego@marlowe.food", openDeals: 1, value: "$8,400" },
      { id: "c8", name: "Yuki Tanaka", initials: "YT", company: "Meridian Labs", role: "Head of RevOps", tag: "churned", handle: "yuki@meridian.co", openDeals: 0, value: "$12,900" },
      { id: "c9", name: "Emeka Balogun", initials: "EB", company: "Drift & Co", role: "Growth Lead", tag: "vip", handle: "emeka@driftco.com", openDeals: 2, value: "$128,700" },
    ],
  },
  automations: {
    label: "Automations",
    title: "Recipes that follow up so you never have to",
    intro: "Each recipe is a trigger and an action. Flip the ones you want on and Relaty runs them for every matching deal.",
    triggerWord: "When",
    actionWord: "Then",
    runsWord: "runs this month",
    activeLabel: "active",
    enableLabel: "Enable recipe",
    disableLabel: "Disable recipe",
    recipes: [
      { id: "r1", icon: "userPlus", trigger: "a new lead lands", action: "assign an owner by territory", blurb: "Round-robin fresh leads to the right rep the second they arrive.", runs: "1,204", defaultOn: true },
      { id: "r2", icon: "mailCheck", trigger: "a deal reaches Proposal", action: "send the pricing deck", blurb: "Fire a branded proposal email with the quote already attached.", runs: "486", defaultOn: true },
      { id: "r3", icon: "calendarClock", trigger: "a deal goes quiet for 5 days", action: "create a follow-up task", blurb: "Nudge the owner before a warm deal ever goes cold.", runs: "742", defaultOn: false },
      { id: "r4", icon: "flame", trigger: "a lead opens 3 emails", action: "flag it as hot", blurb: "Surface buying intent so reps call the people already leaning in.", runs: "318", defaultOn: true },
      { id: "r5", icon: "bellRing", trigger: "a deal is marked Won", action: "ping the team channel", blurb: "Celebrate every close and hand off cleanly to onboarding.", runs: "129", defaultOn: false },
      { id: "r6", icon: "gitBranch", trigger: "a contact updates their role", action: "refresh the account map", blurb: "Keep org charts current without a single manual edit.", runs: "203", defaultOn: false },
    ],
  },
  pricing: {
    label: "Pricing",
    title: "Priced per seat, so it grows with the team",
    intro: "Slide to your team size and see the real monthly total. Every plan includes the pipeline, contacts and automations.",
    seatsLabel: "Team size",
    seatsWord: "seats",
    minSeats: 3,
    maxSeats: 50,
    defaultSeats: 12,
    perSeatCaption: "per seat / month",
    monthlyCaption: "billed monthly",
    totalCaption: "estimated / month",
    currency: "USD",
    localeTag: "en-US",
    tiers: [
      {
        id: "starter",
        name: "Starter",
        blurb: "For a first sales hire building their book.",
        perSeat: 15,
        features: ["Visual pipeline", "Up to 2,000 contacts", "3 active automations", "Email + calendar sync"],
        cta: "Start free",
      },
      {
        id: "growth",
        name: "Growth",
        blurb: "For teams that live in the pipeline every day.",
        perSeat: 29,
        popular: true,
        features: ["Everything in Starter", "Unlimited contacts", "Unlimited automations", "Weighted forecasting", "Team dashboards"],
        cta: "Start free trial",
      },
      {
        id: "scale",
        name: "Scale",
        blurb: "For RevOps running many teams at once.",
        perSeat: 0,
        customLabel: "Let’s talk",
        features: ["Everything in Growth", "SSO and SCIM", "Custom objects and API", "Dedicated success manager"],
        cta: "Contact sales",
      },
    ],
    footnote: "Prices in USD. Cancel anytime; annual billing saves two months.",
  },
  testimonials: {
    label: "Loved by revenue teams",
    title: "The pipeline reps stop dreading",
    intro: "Teams switch to Relaty and stop losing deals in the cracks between tools.",
    imageAlt: "A revenue team reviewing their pipeline together around a table",
    featured: {
      quote: "We killed three tools and moved everything into Relaty in a weekend. Our reps forecast in minutes now, and nothing slips through. It is the first CRM they open without being told to.",
      name: "Camila Restrepo",
      role: "VP of Sales",
      company: "Lumen Health",
      initials: "CR",
      metricValue: "31%",
      metricLabel: "faster deal cycle",
    },
    others: [
      {
        quote: "The automations alone paid for the year. Follow-ups that used to slip now just happen.",
        name: "Marcus Feld",
        role: "Head of Growth",
        company: "Drift & Co",
        initials: "MF",
        metricValue: "2.4x",
        metricLabel: "more follow-ups",
      },
      {
        quote: "Onboarding a new rep used to take weeks. With Relaty they are pulling deals forward on day one.",
        name: "Aisha Rahman",
        role: "RevOps Lead",
        company: "Vertex Robotics",
        initials: "AR",
        metricValue: "4 days",
        metricLabel: "to full ramp",
      },
    ],
  },
  cta: {
    title: "Your pipeline is waiting",
    sub: "Import your contacts, watch the board fill up, and send your first automated follow-up before lunch.",
    primary: "Start free trial",
    secondary: "Book a demo",
    note: "Free for 14 days. No credit card required.",
    bullets: ["Set up in under 10 minutes", "Import from any spreadsheet", "Cancel anytime"],
  },
  footer: {
    blurb: "Relaty is the CRM that keeps your pipeline honest and your follow-ups automatic.",
    columns: [
      {
        title: "Product",
        links: [
          { href: "#pipeline", label: "Pipeline" },
          { href: "#features", label: "Features" },
          { href: "#automations", label: "Automations" },
          { href: "#pricing", label: "Pricing" },
        ],
      },
      {
        title: "Company",
        links: [
          { href: "#testimonials", label: "Customers" },
          { href: "#cta", label: "Careers" },
          { href: "#features", label: "About" },
          { href: "#contacts", label: "Contact" },
        ],
      },
      {
        title: "Resources",
        links: [
          { href: "#features", label: "Help center" },
          { href: "#automations", label: "Recipe library" },
          { href: "#pipeline", label: "Playbooks" },
          { href: "#pricing", label: "API docs" },
        ],
      },
    ],
    socials: [
      { id: "site", label: "Relaty website" },
      { id: "at", label: "Relaty newsletter" },
      { id: "chat", label: "Relaty community" },
      { id: "share", label: "Share Relaty" },
    ],
    copyright: "© 2026 Relaty, Inc. A concept crafted by VigApp.",
    statusLabel: "All systems operational",
  },
};

/* ------------------------------------------------------------------ */
/* Portuguese                                                          */
/* ------------------------------------------------------------------ */

const pt: RelatyContent = {
  nav: {
    links: [
      { href: "#pipeline", label: "Funil" },
      { href: "#features", label: "Recursos" },
      { href: "#contacts", label: "Contatos" },
      { href: "#automations", label: "Automações" },
      { href: "#pricing", label: "Planos" },
    ],
    signIn: "Entrar",
    cta: "Começar grátis",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
  },
  hero: {
    badge: "O CRM que seu time de vendas realmente abre",
    titleTop: "Feche mais,",
    titleAccent: "corra atrás menos.",
    titleEnd: "",
    sub: "O Relaty transforma uma planilha bagunçada de leads em um funil vivo. Avance um negócio, veja a previsão se atualizar e deixe as automações cuidarem do follow-up enquanto você fecha.",
    ctaPrimary: "Testar grátis",
    ctaSecondary: "Ver o tour de 2 min",
    stats: [
      { value: "31%", label: "ciclo de vendas mais curto" },
      { value: "2,4x", label: "mais follow-ups enviados" },
      { value: "12 mil+", label: "times no Relaty" },
    ],
    boardEyebrow: "Funil ao vivo",
    pipeline: {
      windowTitle: "Funil de Receita — 3º Tri",
      liveLabel: "Ao vivo",
      stages: [
        { id: "lead", label: "Lead" },
        { id: "qualified", label: "Qualificado" },
        { id: "proposal", label: "Proposta" },
        { id: "negotiation", label: "Negociação" },
        { id: "won", label: "Ganho" },
      ],
      deals: DEALS,
      advanceHint: "Clique em um negócio para avançar de etapa",
      wonLabel: "Fechado ganho",
      resetLabel: "Reiniciar quadro",
      totalCaption: "na etapa",
      dealsWord: "negócios",
      currency: "BRL",
      localeTag: "pt-BR",
    },
  },
  features: {
    label: "Por que o Relaty",
    title: "Tudo que um negócio precisa, num só lugar tranquilo",
    intro: "Sem plug-ins para comprar, sem consultor para contratar. O funil, as pessoas e o trabalho repetitivo vivem juntos.",
    items: [
      {
        icon: "columns",
        title: "Um funil que se lê num relance",
        body: "Etapas que espelham como você vende de verdade. Cada card carrega valor, dono e próximo passo, então a previsão nunca é chute.",
        points: ["Previsão ponderada", "Etapas sob medida por time", "Arraste ou clique para avançar"],
      },
      {
        icon: "table",
        title: "Contatos que lembram de tudo",
        body: "Um perfil por pessoa: e-mails, ligações, notas e negócios abertos. Busque por qualquer um, filtre por qualquer tag e nunca peça o mesmo dado duas vezes.",
        points: ["Linha do tempo unificada", "Tags e segmentos inteligentes", "Mescla de duplicados na importação"],
      },
      {
        icon: "zap",
        title: "Automações que correm atrás por você",
        body: "As receitas disparam assim que um negócio muda: um e-mail de boas-vindas, uma tarefa, um aviso no Slack. Configure uma vez e veja o trabalho repetitivo sumir.",
        points: ["Construtor sem código", "Gatilho em qualquer campo", "Roda enquanto você dorme"],
      },
    ],
  },
  contacts: {
    label: "Contatos",
    title: "Ache qualquer pessoa da sua carteira num toque",
    intro: "A busca roda enquanto você digita e cada tag é um filtro vivo. É a mesma tabela em que seus vendedores vivem o dia todo.",
    searchLabel: "Buscar contatos",
    searchPlaceholder: "Busque por nome, empresa ou cargo",
    filterLabel: "Filtrar por tag",
    allLabel: "Todos",
    tags: [
      { id: "customer", label: "Cliente" },
      { id: "prospect", label: "Prospect" },
      { id: "vip", label: "VIP" },
      { id: "trial", label: "Teste" },
      { id: "churned", label: "Perdido" },
    ],
    columns: { contact: "Contato", company: "Empresa", tag: "Tag", deals: "Negócios abertos", value: "Valor total" },
    resultsWord: "contatos",
    emptyTitle: "Nenhum resultado",
    emptyBody: "Tente outro nome ou limpe o filtro de tag para ver todos.",
    clearLabel: "Limpar filtros",
    contacts: [
      { id: "c1", name: "Priya Nadella", initials: "PN", company: "Northwind Traders", role: "Head de Operações", tag: "prospect", handle: "priya@northwind.io", openDeals: 2, value: "R$ 92.000" },
      { id: "c2", name: "Sofia Marchetti", initials: "SM", company: "Lumen Health", role: "VP de Compras", tag: "customer", handle: "sofia@lumen.health", openDeals: 1, value: "R$ 481.000" },
      { id: "c3", name: "Jonas Sørensen", initials: "JS", company: "Vertex Robotics", role: "Fundador e CEO", tag: "vip", handle: "jonas@vertex.dev", openDeals: 3, value: "R$ 1.050.000" },
      { id: "c4", name: "Amara Okafor", initials: "AO", company: "Cobalt Studios", role: "Diretora Criativa", tag: "prospect", handle: "amara@cobalt.studio", openDeals: 1, value: "R$ 99.000" },
      { id: "c5", name: "Rafael Bittencourt", initials: "RB", company: "Selva Logística", role: "COO", tag: "trial", handle: "rafael@selva.com.br", openDeals: 2, value: "R$ 206.000" },
      { id: "c6", name: "Helena Vasquez", initials: "HV", company: "Aurora Bank", role: "Diretora de TI", tag: "customer", handle: "helena@aurorabank.com", openDeals: 0, value: "R$ 1.702.500" },
      { id: "c7", name: "Diego Antunes", initials: "DA", company: "Marlowe Foods", role: "Comprador", tag: "prospect", handle: "diego@marlowe.food", openDeals: 1, value: "R$ 42.000" },
      { id: "c8", name: "Yuki Tanaka", initials: "YT", company: "Meridian Labs", role: "Head de RevOps", tag: "churned", handle: "yuki@meridian.co", openDeals: 0, value: "R$ 64.500" },
      { id: "c9", name: "Emeka Balogun", initials: "EB", company: "Drift & Co", role: "Líder de Growth", tag: "vip", handle: "emeka@driftco.com", openDeals: 2, value: "R$ 643.500" },
    ],
  },
  automations: {
    label: "Automações",
    title: "Receitas que fazem o follow-up no seu lugar",
    intro: "Cada receita é um gatilho e uma ação. Ligue as que quiser e o Relaty executa para cada negócio compatível.",
    triggerWord: "Quando",
    actionWord: "Então",
    runsWord: "execuções neste mês",
    activeLabel: "ativas",
    enableLabel: "Ativar receita",
    disableLabel: "Desativar receita",
    recipes: [
      { id: "r1", icon: "userPlus", trigger: "um novo lead chega", action: "atribuir dono por território", blurb: "Distribui leads novos para o vendedor certo no instante em que entram.", runs: "1.204", defaultOn: true },
      { id: "r2", icon: "mailCheck", trigger: "um negócio chega em Proposta", action: "enviar a proposta comercial", blurb: "Dispara um e-mail de proposta com o orçamento já anexado.", runs: "486", defaultOn: true },
      { id: "r3", icon: "calendarClock", trigger: "um negócio fica parado 5 dias", action: "criar uma tarefa de follow-up", blurb: "Cutuca o dono antes que um negócio morno esfrie.", runs: "742", defaultOn: false },
      { id: "r4", icon: "flame", trigger: "um lead abre 3 e-mails", action: "marcar como quente", blurb: "Revela interesse de compra para ligar para quem já está inclinado.", runs: "318", defaultOn: true },
      { id: "r5", icon: "bellRing", trigger: "um negócio é marcado como Ganho", action: "avisar o canal do time", blurb: "Comemora cada fechamento e faz a passagem limpa para o onboarding.", runs: "129", defaultOn: false },
      { id: "r6", icon: "gitBranch", trigger: "um contato muda de cargo", action: "atualizar o mapa da conta", blurb: "Mantém o organograma em dia sem uma edição manual sequer.", runs: "203", defaultOn: false },
    ],
  },
  pricing: {
    label: "Planos",
    title: "Preço por usuário, que cresce junto com o time",
    intro: "Arraste até o tamanho do seu time e veja o total mensal real. Todo plano inclui funil, contatos e automações.",
    seatsLabel: "Tamanho do time",
    seatsWord: "usuários",
    minSeats: 3,
    maxSeats: 50,
    defaultSeats: 12,
    perSeatCaption: "por usuário / mês",
    monthlyCaption: "cobrança mensal",
    totalCaption: "estimado / mês",
    currency: "BRL",
    localeTag: "pt-BR",
    tiers: [
      {
        id: "starter",
        name: "Starter",
        blurb: "Para a primeira contratação de vendas montando a carteira.",
        perSeat: 39,
        features: ["Funil visual", "Até 2.000 contatos", "3 automações ativas", "Sincronia de e-mail e agenda"],
        cta: "Começar grátis",
      },
      {
        id: "growth",
        name: "Growth",
        blurb: "Para times que vivem no funil todos os dias.",
        perSeat: 79,
        popular: true,
        features: ["Tudo do Starter", "Contatos ilimitados", "Automações ilimitadas", "Previsão ponderada", "Painéis do time"],
        cta: "Testar grátis",
      },
      {
        id: "scale",
        name: "Scale",
        blurb: "Para RevOps tocando vários times ao mesmo tempo.",
        perSeat: 0,
        customLabel: "Fale conosco",
        features: ["Tudo do Growth", "SSO e SCIM", "Objetos personalizados e API", "Gerente de sucesso dedicado"],
        cta: "Falar com vendas",
      },
    ],
    footnote: "Preços em BRL. Cancele quando quiser; no plano anual, dois meses são grátis.",
  },
  testimonials: {
    label: "Amado por times de vendas",
    title: "O funil que os vendedores param de temer",
    intro: "Os times migram para o Relaty e param de perder negócios nas frestas entre ferramentas.",
    imageAlt: "Um time de vendas revisando o funil junto ao redor de uma mesa",
    featured: {
      quote: "Aposentamos três ferramentas e migramos tudo para o Relaty num fim de semana. Nossos vendedores fazem a previsão em minutos e nada se perde. É o primeiro CRM que eles abrem sem ninguém mandar.",
      name: "Camila Restrepo",
      role: "VP de Vendas",
      company: "Lumen Health",
      initials: "CR",
      metricValue: "31%",
      metricLabel: "ciclo mais rápido",
    },
    others: [
      {
        quote: "Só as automações já pagaram o ano. O follow-up que escapava agora simplesmente acontece.",
        name: "Marcus Feld",
        role: "Head de Growth",
        company: "Drift & Co",
        initials: "MF",
        metricValue: "2,4x",
        metricLabel: "mais follow-ups",
      },
      {
        quote: "Treinar um vendedor novo levava semanas. Com o Relaty ele já avança negócios no primeiro dia.",
        name: "Aisha Rahman",
        role: "Líder de RevOps",
        company: "Vertex Robotics",
        initials: "AR",
        metricValue: "4 dias",
        metricLabel: "para ramp completo",
      },
    ],
  },
  cta: {
    title: "Seu funil está esperando",
    sub: "Importe seus contatos, veja o quadro se encher e envie seu primeiro follow-up automático antes do almoço.",
    primary: "Testar grátis",
    secondary: "Agendar demo",
    note: "Grátis por 14 dias. Sem cartão de crédito.",
    bullets: ["Configure em menos de 10 minutos", "Importe de qualquer planilha", "Cancele quando quiser"],
  },
  footer: {
    blurb: "O Relaty é o CRM que mantém seu funil honesto e seu follow-up automático.",
    columns: [
      {
        title: "Produto",
        links: [
          { href: "#pipeline", label: "Funil" },
          { href: "#features", label: "Recursos" },
          { href: "#automations", label: "Automações" },
          { href: "#pricing", label: "Planos" },
        ],
      },
      {
        title: "Empresa",
        links: [
          { href: "#testimonials", label: "Clientes" },
          { href: "#cta", label: "Carreiras" },
          { href: "#features", label: "Sobre" },
          { href: "#contacts", label: "Contato" },
        ],
      },
      {
        title: "Recursos",
        links: [
          { href: "#features", label: "Central de ajuda" },
          { href: "#automations", label: "Biblioteca de receitas" },
          { href: "#pipeline", label: "Playbooks" },
          { href: "#pricing", label: "Documentação da API" },
        ],
      },
    ],
    socials: [
      { id: "site", label: "Site do Relaty" },
      { id: "at", label: "Newsletter do Relaty" },
      { id: "chat", label: "Comunidade do Relaty" },
      { id: "share", label: "Compartilhar o Relaty" },
    ],
    copyright: "© 2026 Relaty, Inc. Um conceito criado pela VigApp.",
    statusLabel: "Todos os sistemas operando",
  },
};

/* ------------------------------------------------------------------ */
/* Spanish                                                             */
/* ------------------------------------------------------------------ */

const es: RelatyContent = {
  nav: {
    links: [
      { href: "#pipeline", label: "Embudo" },
      { href: "#features", label: "Funciones" },
      { href: "#contacts", label: "Contactos" },
      { href: "#automations", label: "Automatizaciones" },
      { href: "#pricing", label: "Precios" },
    ],
    signIn: "Entrar",
    cta: "Empezar gratis",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  hero: {
    badge: "El CRM que tu equipo comercial abre de verdad",
    titleTop: "Cierra más,",
    titleAccent: "persigue menos.",
    titleEnd: "",
    sub: "Relaty convierte una hoja de cálculo caótica de leads en un embudo vivo. Avanza un trato, mira cómo se actualiza el pronóstico y deja que las automatizaciones hagan el seguimiento mientras cierras.",
    ctaPrimary: "Prueba gratis",
    ctaSecondary: "Ver el tour de 2 min",
    stats: [
      { value: "31%", label: "ciclo de venta más corto" },
      { value: "2,4x", label: "más seguimientos enviados" },
      { value: "12 mil+", label: "equipos en Relaty" },
    ],
    boardEyebrow: "Embudo en vivo",
    pipeline: {
      windowTitle: "Embudo de ingresos — T3",
      liveLabel: "En vivo",
      stages: [
        { id: "lead", label: "Lead" },
        { id: "qualified", label: "Calificado" },
        { id: "proposal", label: "Propuesta" },
        { id: "negotiation", label: "Negociación" },
        { id: "won", label: "Ganado" },
      ],
      deals: DEALS,
      advanceHint: "Haz clic en un trato para pasarlo a la siguiente etapa",
      wonLabel: "Cerrado ganado",
      resetLabel: "Reiniciar tablero",
      totalCaption: "en la etapa",
      dealsWord: "tratos",
      currency: "EUR",
      localeTag: "es-ES",
    },
  },
  features: {
    label: "Por qué Relaty",
    title: "Todo lo que un trato necesita, en un espacio tranquilo",
    intro: "Sin complementos que comprar ni consultores que contratar. El embudo, las personas y el trabajo repetitivo viven juntos.",
    items: [
      {
        icon: "columns",
        title: "Un embudo que se lee de un vistazo",
        body: "Etapas que reflejan cómo vendes de verdad. Cada tarjeta lleva su valor, responsable y siguiente paso, así el pronóstico nunca es una corazonada.",
        points: ["Pronóstico ponderado", "Etapas a medida por equipo", "Arrastra o haz clic para avanzar"],
      },
      {
        icon: "table",
        title: "Contactos que recuerdan todo",
        body: "Un perfil por persona: correos, llamadas, notas y tratos abiertos. Busca a cualquiera, filtra por cualquier etiqueta y nunca pidas el mismo dato dos veces.",
        points: ["Historial de actividad unificado", "Etiquetas y segmentos inteligentes", "Fusión de duplicados al importar"],
      },
      {
        icon: "zap",
        title: "Automatizaciones que persiguen por ti",
        body: "Las recetas se activan en cuanto un trato cambia: un correo de bienvenida, una tarea, un aviso en Slack. Configúralas una vez y el trabajo repetitivo desaparece.",
        points: ["Constructor sin código", "Disparador en cualquier campo", "Funciona mientras duermes"],
      },
    ],
  },
  contacts: {
    label: "Contactos",
    title: "Encuentra a cualquiera de tu cartera en un toque",
    intro: "La búsqueda corre mientras escribes y cada etiqueta es un filtro vivo. Es la misma tabla en la que tus comerciales viven todo el día.",
    searchLabel: "Buscar contactos",
    searchPlaceholder: "Busca por nombre, empresa o cargo",
    filterLabel: "Filtrar por etiqueta",
    allLabel: "Todos",
    tags: [
      { id: "customer", label: "Cliente" },
      { id: "prospect", label: "Prospecto" },
      { id: "vip", label: "VIP" },
      { id: "trial", label: "Prueba" },
      { id: "churned", label: "Perdido" },
    ],
    columns: { contact: "Contacto", company: "Empresa", tag: "Etiqueta", deals: "Tratos abiertos", value: "Valor total" },
    resultsWord: "contactos",
    emptyTitle: "Sin coincidencias",
    emptyBody: "Prueba otro nombre o limpia el filtro de etiqueta para ver a todos.",
    clearLabel: "Limpiar filtros",
    contacts: [
      { id: "c1", name: "Priya Nadella", initials: "PN", company: "Northwind Traders", role: "Jefa de Operaciones", tag: "prospect", handle: "priya@northwind.io", openDeals: 2, value: "16.800 €" },
      { id: "c2", name: "Sofia Marchetti", initials: "SM", company: "Lumen Health", role: "VP de Compras", tag: "customer", handle: "sofia@lumen.health", openDeals: 1, value: "88.000 €" },
      { id: "c3", name: "Jonas Sørensen", initials: "JS", company: "Vertex Robotics", role: "Fundador y CEO", tag: "vip", handle: "jonas@vertex.dev", openDeals: 3, value: "192.000 €" },
      { id: "c4", name: "Amara Okafor", initials: "AO", company: "Cobalt Studios", role: "Directora Creativa", tag: "prospect", handle: "amara@cobalt.studio", openDeals: 1, value: "18.100 €" },
      { id: "c5", name: "Rafael Bittencourt", initials: "RB", company: "Selva Logística", role: "COO", tag: "trial", handle: "rafael@selva.com.br", openDeals: 2, value: "37.700 €" },
      { id: "c6", name: "Helena Vasquez", initials: "HV", company: "Aurora Bank", role: "Directora de TI", tag: "customer", handle: "helena@aurorabank.com", openDeals: 0, value: "311.000 €" },
      { id: "c7", name: "Diego Antunes", initials: "DA", company: "Marlowe Foods", role: "Comprador", tag: "prospect", handle: "diego@marlowe.food", openDeals: 1, value: "7.700 €" },
      { id: "c8", name: "Yuki Tanaka", initials: "YT", company: "Meridian Labs", role: "Jefe de RevOps", tag: "churned", handle: "yuki@meridian.co", openDeals: 0, value: "11.800 €" },
      { id: "c9", name: "Emeka Balogun", initials: "EB", company: "Drift & Co", role: "Líder de Growth", tag: "vip", handle: "emeka@driftco.com", openDeals: 2, value: "117.700 €" },
    ],
  },
  automations: {
    label: "Automatizaciones",
    title: "Recetas que hacen el seguimiento por ti",
    intro: "Cada receta es un disparador y una acción. Activa las que quieras y Relaty las ejecuta para cada trato que coincida.",
    triggerWord: "Cuando",
    actionWord: "Entonces",
    runsWord: "ejecuciones este mes",
    activeLabel: "activas",
    enableLabel: "Activar receta",
    disableLabel: "Desactivar receta",
    recipes: [
      { id: "r1", icon: "userPlus", trigger: "llega un nuevo lead", action: "asignar responsable por territorio", blurb: "Reparte los leads nuevos al comercial correcto en el instante en que entran.", runs: "1.204", defaultOn: true },
      { id: "r2", icon: "mailCheck", trigger: "un trato llega a Propuesta", action: "enviar la propuesta comercial", blurb: "Dispara un correo de propuesta con el presupuesto ya adjunto.", runs: "486", defaultOn: true },
      { id: "r3", icon: "calendarClock", trigger: "un trato se queda quieto 5 días", action: "crear una tarea de seguimiento", blurb: "Avisa al responsable antes de que un trato tibio se enfríe.", runs: "742", defaultOn: false },
      { id: "r4", icon: "flame", trigger: "un lead abre 3 correos", action: "marcarlo como caliente", blurb: "Revela la intención de compra para llamar a quien ya se inclina.", runs: "318", defaultOn: true },
      { id: "r5", icon: "bellRing", trigger: "un trato se marca como Ganado", action: "avisar al canal del equipo", blurb: "Celebra cada cierre y haz un traspaso limpio al onboarding.", runs: "129", defaultOn: false },
      { id: "r6", icon: "gitBranch", trigger: "un contacto cambia de cargo", action: "actualizar el mapa de la cuenta", blurb: "Mantén el organigrama al día sin una sola edición manual.", runs: "203", defaultOn: false },
    ],
  },
  pricing: {
    label: "Precios",
    title: "Precio por usuario, que crece con el equipo",
    intro: "Desliza hasta el tamaño de tu equipo y ve el total mensual real. Todos los planes incluyen embudo, contactos y automatizaciones.",
    seatsLabel: "Tamaño del equipo",
    seatsWord: "usuarios",
    minSeats: 3,
    maxSeats: 50,
    defaultSeats: 12,
    perSeatCaption: "por usuario / mes",
    monthlyCaption: "facturación mensual",
    totalCaption: "estimado / mes",
    currency: "EUR",
    localeTag: "es-ES",
    tiers: [
      {
        id: "starter",
        name: "Starter",
        blurb: "Para el primer comercial armando su cartera.",
        perSeat: 14,
        features: ["Embudo visual", "Hasta 2.000 contactos", "3 automatizaciones activas", "Sincronía de correo y agenda"],
        cta: "Empezar gratis",
      },
      {
        id: "growth",
        name: "Growth",
        blurb: "Para equipos que viven en el embudo cada día.",
        perSeat: 27,
        popular: true,
        features: ["Todo lo de Starter", "Contactos ilimitados", "Automatizaciones ilimitadas", "Pronóstico ponderado", "Paneles de equipo"],
        cta: "Prueba gratis",
      },
      {
        id: "scale",
        name: "Scale",
        blurb: "Para RevOps que dirige varios equipos a la vez.",
        perSeat: 0,
        customLabel: "Hablemos",
        features: ["Todo lo de Growth", "SSO y SCIM", "Objetos personalizados y API", "Gestor de éxito dedicado"],
        cta: "Contactar ventas",
      },
    ],
    footnote: "Precios en EUR. Cancela cuando quieras; el plan anual ahorra dos meses.",
  },
  testimonials: {
    label: "Adorado por equipos comerciales",
    title: "El embudo que los comerciales dejan de temer",
    intro: "Los equipos se pasan a Relaty y dejan de perder tratos en las grietas entre herramientas.",
    imageAlt: "Un equipo comercial revisando su embudo juntos alrededor de una mesa",
    featured: {
      quote: "Jubilamos tres herramientas y lo movimos todo a Relaty en un fin de semana. Nuestros comerciales pronostican en minutos y nada se escapa. Es el primer CRM que abren sin que nadie se lo diga.",
      name: "Camila Restrepo",
      role: "VP de Ventas",
      company: "Lumen Health",
      initials: "CR",
      metricValue: "31%",
      metricLabel: "ciclo más rápido",
    },
    others: [
      {
        quote: "Solo las automatizaciones ya pagaron el año. El seguimiento que se escapaba ahora simplemente ocurre.",
        name: "Marcus Feld",
        role: "Head de Growth",
        company: "Drift & Co",
        initials: "MF",
        metricValue: "2,4x",
        metricLabel: "más seguimientos",
      },
      {
        quote: "Formar a un comercial nuevo llevaba semanas. Con Relaty avanza tratos desde el primer día.",
        name: "Aisha Rahman",
        role: "Líder de RevOps",
        company: "Vertex Robotics",
        initials: "AR",
        metricValue: "4 días",
        metricLabel: "hasta pleno rendimiento",
      },
    ],
  },
  cta: {
    title: "Tu embudo te está esperando",
    sub: "Importa tus contactos, mira cómo se llena el tablero y envía tu primer seguimiento automático antes del almuerzo.",
    primary: "Prueba gratis",
    secondary: "Reservar demo",
    note: "Gratis durante 14 días. Sin tarjeta de crédito.",
    bullets: ["Configúralo en menos de 10 minutos", "Importa desde cualquier hoja de cálculo", "Cancela cuando quieras"],
  },
  footer: {
    blurb: "Relaty es el CRM que mantiene tu embudo honesto y tu seguimiento en automático.",
    columns: [
      {
        title: "Producto",
        links: [
          { href: "#pipeline", label: "Embudo" },
          { href: "#features", label: "Funciones" },
          { href: "#automations", label: "Automatizaciones" },
          { href: "#pricing", label: "Precios" },
        ],
      },
      {
        title: "Empresa",
        links: [
          { href: "#testimonials", label: "Clientes" },
          { href: "#cta", label: "Empleo" },
          { href: "#features", label: "Nosotros" },
          { href: "#contacts", label: "Contacto" },
        ],
      },
      {
        title: "Recursos",
        links: [
          { href: "#features", label: "Centro de ayuda" },
          { href: "#automations", label: "Biblioteca de recetas" },
          { href: "#pipeline", label: "Playbooks" },
          { href: "#pricing", label: "Documentación de API" },
        ],
      },
    ],
    socials: [
      { id: "site", label: "Sitio de Relaty" },
      { id: "at", label: "Boletín de Relaty" },
      { id: "chat", label: "Comunidad de Relaty" },
      { id: "share", label: "Compartir Relaty" },
    ],
    copyright: "© 2026 Relaty, Inc. Un concepto creado por VigApp.",
    statusLabel: "Todos los sistemas operativos",
  },
};

export const relatyDict: DemoDictionary<RelatyContent> = { en, pt, es };
