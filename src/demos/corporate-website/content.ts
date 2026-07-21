import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type UnitId = "energy" | "logistics" | "technology" | "finance";
export type NewsCategoryId =
  | "all"
  | "corporate"
  | "energy"
  | "finance"
  | "sustainability";

export interface NavContent {
  links: { href: string; label: string }[];
  tagline: string;
  cta: string;
  openMenu: string;
  closeMenu: string;
}

export interface HeroHub {
  id: string;
  city: string;
  x: number;
  y: number;
}

export interface HeroContent {
  eyebrow: string;
  titleTop: string;
  titleSerif: string;
  titleBottom: string;
  lede: string;
  presenceLabel: string;
  ctaPrimary: string;
  ctaSecondary: string;
  mapLabel: string;
  mapCaption: string;
  hubs: HeroHub[];
  quickStats: { value: string; label: string }[];
}

export interface UnitContent {
  id: UnitId;
  label: string;
  headline: string;
  body: string;
  established: string;
  revenue: string;
  revenueLabel: string;
  footprint: string;
  footprintLabel: string;
  highlights: string[];
  image: string;
  imageAlt: string;
}

export interface UnitsContent {
  eyebrow: string;
  title: string;
  intro: string;
  tabHint: string;
  units: UnitContent[];
}

export interface FigureContent {
  id: string;
  prefix: string;
  value: number;
  suffix: string;
  decimals: number;
  label: string;
  note: string;
}

export interface FiguresContent {
  eyebrow: string;
  title: string;
  intro: string;
  asOf: string;
  figures: FigureContent[];
}

export interface LeaderContent {
  id: string;
  name: string;
  role: string;
  since: string;
  bio: string;
  initials: string;
}

export interface LeadershipContent {
  eyebrow: string;
  title: string;
  intro: string;
  hoverHint: string;
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
  leaders: LeaderContent[];
}

export interface NewsItemContent {
  id: string;
  category: Exclude<NewsCategoryId, "all">;
  date: string;
  location: string;
  title: string;
  excerpt: string;
  readTime: string;
}

export interface NewsroomContent {
  eyebrow: string;
  title: string;
  intro: string;
  filters: { id: NewsCategoryId; label: string }[];
  empty: string;
  readMore: string;
  items: NewsItemContent[];
}

export interface EsgMetricContent {
  id: string;
  label: string;
  detail: string;
  current: number;
  target: number;
  unit: string;
  targetYear: string;
}

export interface EsgContent {
  eyebrow: string;
  title: string;
  intro: string;
  pillars: { title: string; body: string }[];
  metricsLabel: string;
  progressLabel: string;
  targetLabel: string;
  metrics: EsgMetricContent[];
}

export interface InvestorContent {
  eyebrow: string;
  title: string;
  body: string;
  ticker: string;
  price: string;
  change: string;
  changeLabel: string;
  updated: string;
  nextEvent: { label: string; value: string }[];
  primaryCta: string;
  secondaryCta: string;
  reports: { title: string; meta: string }[];
  reportsLabel: string;
}

export interface FooterContent {
  blurb: string;
  columns: { title: string; links: string[] }[];
  socialLabel: string;
  socials: { id: string; label: string }[];
  legal: string;
  legalLinks: string[];
  address: string;
}

export interface MeridianContent {
  nav: NavContent;
  hero: HeroContent;
  units: UnitsContent;
  figures: FiguresContent;
  leadership: LeadershipContent;
  newsroom: NewsroomContent;
  esg: EsgContent;
  investor: InvestorContent;
  footer: FooterContent;
}

/* ------------------------------------------------------------------ */
/* Photography                                                          */
/* ------------------------------------------------------------------ */

const U = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const IMG = {
  energy: U("photo-1541354329998-f4d9a9f9297f"),
  logistics: U("photo-1477959858617-67f85cf4f1df"),
  technology: U("photo-1449824913935-59a10b8d2000"),
  finance: U("photo-1486406146926-c627a92ad1ab"),
};

/* Shared world hubs (equirectangular-ish coordinates on a 1000x460 field). */
const HUBS: HeroHub[] = [
  { id: "sao-paulo", city: "São Paulo", x: 340, y: 330 },
  { id: "new-york", city: "New York", x: 268, y: 176 },
  { id: "london", city: "London", x: 486, y: 150 },
  { id: "frankfurt", city: "Frankfurt", x: 512, y: 158 },
  { id: "dubai", city: "Dubai", x: 606, y: 210 },
  { id: "singapore", city: "Singapore", x: 762, y: 288 },
  { id: "tokyo", city: "Tokyo", x: 842, y: 186 },
  { id: "johannesburg", city: "Johannesburg", x: 542, y: 342 },
];

/* ------------------------------------------------------------------ */
/* English (structural base)                                           */
/* ------------------------------------------------------------------ */

const en: MeridianContent = {
  nav: {
    tagline: "Global Holding Company",
    links: [
      { href: "#units", label: "Businesses" },
      { href: "#figures", label: "Performance" },
      { href: "#leadership", label: "Leadership" },
      { href: "#newsroom", label: "Newsroom" },
      { href: "#esg", label: "Sustainability" },
    ],
    cta: "Investor Relations",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    eyebrow: "Est. 1974 · Operating in 42 markets",
    titleTop: "A disciplined portfolio",
    titleSerif: "built to compound",
    titleBottom: "across generations.",
    lede: "Meridian Group allocates long-term capital across energy, logistics, technology and financial services — steady owners of essential businesses on six continents.",
    presenceLabel: "Presence across six continents",
    ctaPrimary: "Explore our businesses",
    ctaSecondary: "Latest annual report",
    mapLabel: "Global operating hubs",
    mapCaption: "Eight regional headquarters coordinate operations across 42 markets.",
    hubs: HUBS,
    quickStats: [
      { value: "42", label: "Markets" },
      { value: "128k", label: "People" },
      { value: "60+", label: "Companies" },
      { value: "$48.6B", label: "Revenue" },
    ],
  },
  units: {
    eyebrow: "Business units",
    title: "Four platforms, one owner's mindset",
    intro: "We hold controlling stakes in category leaders and back them with patient capital, operational depth and a genuinely long horizon.",
    tabHint: "Select a platform",
    units: [
      {
        id: "energy",
        label: "Energy",
        headline: "Powering the transition, responsibly",
        body: "From regulated transmission grids to utility-scale renewables, Meridian Energy keeps essential infrastructure running while steadily decarbonising its generation mix.",
        established: "Since 1981",
        revenue: "$18.2B",
        revenueLabel: "Segment revenue",
        footprint: "14 markets",
        footprintLabel: "Operating footprint",
        highlights: [
          "9.4 GW of installed renewable capacity",
          "Regulated grids serving 11 million connections",
          "Investment-grade credit across all vehicles",
        ],
        image: IMG.energy,
        imageAlt: "Steel and glass architecture of an energy company headquarters",
      },
      {
        id: "logistics",
        label: "Logistics",
        headline: "Moving the world's essential goods",
        body: "Meridian Logistics operates ports, cold-chain networks and inland terminals that connect producers to markets across the Atlantic and Indo-Pacific corridors.",
        established: "Since 1996",
        revenue: "$12.7B",
        revenueLabel: "Segment revenue",
        footprint: "21 markets",
        footprintLabel: "Operating footprint",
        highlights: [
          "17 deep-water terminals under concession",
          "3.1 million TEU handled annually",
          "Carbon-audited cold-chain across three continents",
        ],
        image: IMG.logistics,
        imageAlt: "City skyline at dusk representing global logistics corridors",
      },
      {
        id: "technology",
        label: "Technology",
        headline: "Compounding through digital infrastructure",
        body: "Meridian Technology owns data centres, connectivity and enterprise software platforms — the quiet backbone that keeps modern commerce dependable.",
        established: "Since 2009",
        revenue: "$9.8B",
        revenueLabel: "Segment revenue",
        footprint: "19 markets",
        footprintLabel: "Operating footprint",
        highlights: [
          "480 MW of contracted data-centre capacity",
          "Enterprise platforms serving 40,000 customers",
          "99.99% median availability across facilities",
        ],
        image: IMG.technology,
        imageAlt: "Tall glass skyscraper reflecting the sky",
      },
      {
        id: "finance",
        label: "Finance",
        headline: "Capital allocated with conviction",
        body: "Meridian Financial Services underwrites insurance, private credit and long-duration savings — recycling premiums into the group's own infrastructure pipeline.",
        established: "Since 1974",
        revenue: "$7.9B",
        revenueLabel: "Segment revenue",
        footprint: "23 markets",
        footprintLabel: "Operating footprint",
        highlights: [
          "$96B of assets under management",
          "AA- financial-strength rating",
          "44 consecutive years of dividend growth",
        ],
        image: IMG.finance,
        imageAlt: "Corporate headquarters building seen from below",
      },
    ],
  },
  figures: {
    eyebrow: "Group performance",
    title: "The scale behind the discipline",
    intro: "Audited results for the year ended 31 December, consolidated across all four operating platforms.",
    asOf: "Figures as of FY-2025 annual report",
    figures: [
      {
        id: "revenue",
        prefix: "$",
        value: 48.6,
        suffix: "B",
        decimals: 1,
        label: "Consolidated revenue",
        note: "Up 6.2% year on year",
      },
      {
        id: "markets",
        prefix: "",
        value: 42,
        suffix: "",
        decimals: 0,
        label: "Markets of operation",
        note: "Across six continents",
      },
      {
        id: "people",
        prefix: "",
        value: 128,
        suffix: "k",
        decimals: 0,
        label: "People employed",
        note: "In 60+ portfolio companies",
      },
      {
        id: "aum",
        prefix: "$",
        value: 96,
        suffix: "B",
        decimals: 0,
        label: "Assets under management",
        note: "Long-duration capital base",
      },
    ],
  },
  leadership: {
    eyebrow: "Board & leadership",
    title: "Stewards, not speculators",
    intro: "Our leadership is measured on decades, not quarters — a group executive committee accountable to an independent board.",
    hoverHint: "Hover a portrait to read the full biography",
    quote:
      "We do not chase the market's mood. We buy essential businesses, look after the people who run them, and let time do the compounding.",
    quoteAuthor: "Helena Vasconcelos",
    quoteRole: "Group Chair",
    leaders: [
      {
        id: "helena",
        name: "Helena Vasconcelos",
        role: "Group Chair",
        since: "Chair since 2016",
        initials: "HV",
        bio: "A former central-bank governor, Helena has chaired Meridian's board through two major expansions. She sets the capital-allocation philosophy and safeguards the group's independence.",
      },
      {
        id: "adebayo",
        name: "Adebayo Okonkwo",
        role: "Group Chief Executive",
        since: "CEO since 2019",
        initials: "AO",
        bio: "Adebayo joined from the energy platform he built into a market leader. He runs the group with a bias for operational excellence and unhurried, evidence-led decisions.",
      },
      {
        id: "mariana",
        name: "Mariana Ferreira",
        role: "Group Chief Financial Officer",
        since: "CFO since 2021",
        initials: "MF",
        bio: "Mariana oversees a conservative balance sheet and the group's investment-grade profile. She is known internally for protecting optionality through every cycle.",
      },
      {
        id: "kenji",
        name: "Kenji Nakamura",
        role: "CEO, Meridian Technology",
        since: "Joined 2013",
        initials: "KN",
        bio: "Kenji leads the digital-infrastructure platform, scaling data centres and connectivity across the Indo-Pacific with an engineer's discipline for reliability.",
      },
      {
        id: "sofia",
        name: "Sofia Almeida",
        role: "CEO, Meridian Logistics",
        since: "Joined 2011",
        initials: "SA",
        bio: "Sofia runs the ports and cold-chain network. She pioneered the group's carbon-audited logistics standard, now adopted across three continents.",
      },
      {
        id: "daniel",
        name: "Daniel Rosenberg",
        role: "Chief Sustainability Officer",
        since: "Joined 2018",
        initials: "DR",
        bio: "Daniel translates the group's long horizon into measurable climate and governance targets, and reports progress directly to the board each quarter.",
      },
    ],
  },
  newsroom: {
    eyebrow: "Newsroom",
    title: "What the group is doing now",
    intro: "Announcements, results and perspectives from across Meridian Group and its operating platforms.",
    filters: [
      { id: "all", label: "All" },
      { id: "corporate", label: "Corporate" },
      { id: "energy", label: "Energy" },
      { id: "finance", label: "Finance" },
      { id: "sustainability", label: "Sustainability" },
    ],
    empty: "No stories in this category yet. Please select another filter.",
    readMore: "Read release",
    items: [
      {
        id: "n1",
        category: "corporate",
        date: "14 Jul 2026",
        location: "London",
        title: "Meridian Group reports resilient first-half results",
        excerpt: "Consolidated revenue rose 5.8% as logistics volumes normalised and the energy platform delivered ahead of plan.",
        readTime: "4 min",
      },
      {
        id: "n2",
        category: "energy",
        date: "02 Jul 2026",
        location: "Lisbon",
        title: "Meridian Energy commissions 1.2 GW offshore wind array",
        excerpt: "The Atlântico project becomes the platform's largest single renewable asset, adding capacity for 900,000 homes.",
        readTime: "3 min",
      },
      {
        id: "n3",
        category: "finance",
        date: "21 Jun 2026",
        location: "New York",
        title: "Financial Services prices $1.5B long-duration bond",
        excerpt: "Proceeds will recycle into the group's regulated infrastructure pipeline at an attractive blended cost of capital.",
        readTime: "2 min",
      },
      {
        id: "n4",
        category: "sustainability",
        date: "09 Jun 2026",
        location: "Singapore",
        title: "Cold-chain network reaches full carbon-audit coverage",
        excerpt: "Every Meridian Logistics facility now reports verified emissions, a first among peers in the Indo-Pacific corridor.",
        readTime: "5 min",
      },
      {
        id: "n5",
        category: "corporate",
        date: "28 May 2026",
        location: "São Paulo",
        title: "Group appoints two independent directors to the board",
        excerpt: "The additions deepen the board's expertise in climate risk and digital infrastructure ahead of the next planning cycle.",
        readTime: "3 min",
      },
      {
        id: "n6",
        category: "energy",
        date: "12 May 2026",
        location: "Frankfurt",
        title: "Regulated grid investment plan approved through 2030",
        excerpt: "Regulators cleared a multi-year programme to modernise transmission serving eleven million connections.",
        readTime: "4 min",
      },
    ],
  },
  esg: {
    eyebrow: "Sustainability",
    title: "Commitments we report on, every quarter",
    intro: "We treat climate and governance targets like any other capital commitment — measured, audited and reported to the board.",
    pillars: [
      {
        title: "Environment",
        body: "A credible path to net zero across owned generation and logistics, financed from within the group's own balance sheet.",
      },
      {
        title: "Social",
        body: "Safe, well-governed workplaces for 128,000 people and durable investment in the communities our infrastructure serves.",
      },
      {
        title: "Governance",
        body: "An independent board, aligned incentives and transparent reporting that outlasts any single management team.",
      },
    ],
    metricsLabel: "Progress against 2030 commitments",
    progressLabel: "Current",
    targetLabel: "2030 target",
    metrics: [
      {
        id: "carbon",
        label: "Reduction in operational emissions",
        detail: "Scope 1 and 2, against a 2019 baseline",
        current: 41,
        target: 60,
        unit: "%",
        targetYear: "2030",
      },
      {
        id: "renewables",
        label: "Renewable share of generation",
        detail: "Across the Meridian Energy platform",
        current: 68,
        target: 85,
        unit: "%",
        targetYear: "2030",
      },
      {
        id: "diversity",
        label: "Women in senior leadership",
        detail: "Group-wide, roles at director level and above",
        current: 39,
        target: 45,
        unit: "%",
        targetYear: "2030",
      },
      {
        id: "community",
        label: "Community reinvestment",
        detail: "Share of net profit committed annually",
        current: 2.4,
        target: 3,
        unit: "%",
        targetYear: "2030",
      },
    ],
  },
  investor: {
    eyebrow: "Investor relations",
    title: "Built for owners with patience",
    body: "Meridian Group has grown book value per share at a double-digit compound rate for four decades. We report with candour and expect to be held to it.",
    ticker: "MRDN · LSE",
    price: "£142.80",
    change: "+1.9%",
    changeLabel: "Today",
    updated: "Delayed by 15 minutes",
    nextEvent: [
      { label: "Next results", value: "05 Aug 2026" },
      { label: "Full-year dividend", value: "£3.24" },
      { label: "Credit rating", value: "AA- stable" },
    ],
    primaryCta: "Download annual report",
    secondaryCta: "Investor calendar",
    reportsLabel: "Latest disclosures",
    reports: [
      { title: "FY-2025 Annual Report", meta: "PDF · 8.4 MB" },
      { title: "H1-2026 Interim Results", meta: "PDF · 3.1 MB" },
      { title: "Climate Transition Plan", meta: "PDF · 5.7 MB" },
    ],
  },
  footer: {
    blurb: "A global holding company allocating long-term capital across energy, logistics, technology and financial services since 1974.",
    columns: [
      {
        title: "Group",
        links: ["About Meridian", "Our businesses", "Leadership", "Careers", "Contact"],
      },
      {
        title: "Investors",
        links: ["Reports & results", "Share information", "Dividend history", "Governance", "Analyst coverage"],
      },
      {
        title: "Responsibility",
        links: ["Climate transition", "Human rights policy", "Supplier code", "Community impact", "Disclosures"],
      },
    ],
    socialLabel: "Follow Meridian Group",
    socials: [
      { id: "site", label: "meridiangroup.com" },
      { id: "press", label: "Press office" },
      { id: "contact", label: "General enquiries" },
    ],
    legal: "Meridian Group plc. Registered in England. All rights reserved.",
    legalLinks: ["Legal", "Privacy", "Cookies", "Modern slavery statement"],
    address: "1 Meridian Court, London EC2N 4AY, United Kingdom",
  },
};

/* ------------------------------------------------------------------ */
/* Portuguese                                                           */
/* ------------------------------------------------------------------ */

const pt: MeridianContent = {
  nav: {
    tagline: "Holding Global",
    links: [
      { href: "#units", label: "Negócios" },
      { href: "#figures", label: "Desempenho" },
      { href: "#leadership", label: "Liderança" },
      { href: "#newsroom", label: "Imprensa" },
      { href: "#esg", label: "Sustentabilidade" },
    ],
    cta: "Relações com Investidores",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
  },
  hero: {
    eyebrow: "Fundada em 1974 · Presente em 42 mercados",
    titleTop: "Um portfólio disciplinado,",
    titleSerif: "construído para compor",
    titleBottom: "ao longo de gerações.",
    lede: "O Meridian Group aloca capital de longo prazo em energia, logística, tecnologia e serviços financeiros — donos estáveis de negócios essenciais em seis continentes.",
    presenceLabel: "Presença em seis continentes",
    ctaPrimary: "Conheça nossos negócios",
    ctaSecondary: "Relatório anual",
    mapLabel: "Centros operacionais globais",
    mapCaption: "Oito sedes regionais coordenam operações em 42 mercados.",
    hubs: HUBS,
    quickStats: [
      { value: "42", label: "Mercados" },
      { value: "128 mil", label: "Pessoas" },
      { value: "60+", label: "Empresas" },
      { value: "R$ 248 bi", label: "Receita" },
    ],
  },
  units: {
    eyebrow: "Unidades de negócio",
    title: "Quatro plataformas, a mentalidade de um dono",
    intro: "Detemos participações de controle em líderes de categoria e as apoiamos com capital paciente, profundidade operacional e um horizonte genuinamente longo.",
    tabHint: "Selecione uma plataforma",
    units: [
      {
        id: "energy",
        label: "Energia",
        headline: "Impulsionando a transição com responsabilidade",
        body: "De redes de transmissão reguladas a renováveis em escala, a Meridian Energia mantém a infraestrutura essencial funcionando enquanto descarboniza sua matriz de geração.",
        established: "Desde 1981",
        revenue: "R$ 93 bi",
        revenueLabel: "Receita do segmento",
        footprint: "14 mercados",
        footprintLabel: "Presença operacional",
        highlights: [
          "9,4 GW de capacidade renovável instalada",
          "Redes reguladas com 11 milhões de conexões",
          "Grau de investimento em todos os veículos",
        ],
        image: IMG.energy,
        imageAlt: "Arquitetura de aço e vidro da sede de uma empresa de energia",
      },
      {
        id: "logistics",
        label: "Logística",
        headline: "Movendo os bens essenciais do mundo",
        body: "A Meridian Logística opera portos, cadeias de frio e terminais que conectam produtores a mercados nos corredores do Atlântico e do Indo-Pacífico.",
        established: "Desde 1996",
        revenue: "R$ 65 bi",
        revenueLabel: "Receita do segmento",
        footprint: "21 mercados",
        footprintLabel: "Presença operacional",
        highlights: [
          "17 terminais de águas profundas em concessão",
          "3,1 milhões de TEU movimentados por ano",
          "Cadeia de frio auditada em três continentes",
        ],
        image: IMG.logistics,
        imageAlt: "Horizonte urbano ao entardecer representando corredores logísticos",
      },
      {
        id: "technology",
        label: "Tecnologia",
        headline: "Compondo por meio de infraestrutura digital",
        body: "A Meridian Tecnologia detém data centers, conectividade e plataformas de software corporativo — a espinha dorsal silenciosa do comércio moderno.",
        established: "Desde 2009",
        revenue: "R$ 50 bi",
        revenueLabel: "Receita do segmento",
        footprint: "19 mercados",
        footprintLabel: "Presença operacional",
        highlights: [
          "480 MW de capacidade contratada em data centers",
          "Plataformas com 40 mil clientes corporativos",
          "99,99% de disponibilidade mediana nas instalações",
        ],
        image: IMG.technology,
        imageAlt: "Arranha-céu de vidro refletindo o céu",
      },
      {
        id: "finance",
        label: "Finanças",
        headline: "Capital alocado com convicção",
        body: "A Meridian Serviços Financeiros atua em seguros, crédito privado e poupança de longo prazo — reciclando prêmios no próprio pipeline de infraestrutura do grupo.",
        established: "Desde 1974",
        revenue: "R$ 40 bi",
        revenueLabel: "Receita do segmento",
        footprint: "23 mercados",
        footprintLabel: "Presença operacional",
        highlights: [
          "R$ 490 bi em ativos sob gestão",
          "Classificação de solidez financeira AA-",
          "44 anos consecutivos de crescimento de dividendos",
        ],
        image: IMG.finance,
        imageAlt: "Edifício-sede corporativo visto de baixo",
      },
    ],
  },
  figures: {
    eyebrow: "Desempenho do grupo",
    title: "A escala por trás da disciplina",
    intro: "Resultados auditados do exercício encerrado em 31 de dezembro, consolidados nas quatro plataformas.",
    asOf: "Números conforme o relatório anual 2025",
    figures: [
      {
        id: "revenue",
        prefix: "R$ ",
        value: 248,
        suffix: " bi",
        decimals: 0,
        label: "Receita consolidada",
        note: "Alta de 6,2% no ano",
      },
      {
        id: "markets",
        prefix: "",
        value: 42,
        suffix: "",
        decimals: 0,
        label: "Mercados de atuação",
        note: "Em seis continentes",
      },
      {
        id: "people",
        prefix: "",
        value: 128,
        suffix: " mil",
        decimals: 0,
        label: "Pessoas empregadas",
        note: "Em mais de 60 empresas",
      },
      {
        id: "aum",
        prefix: "R$ ",
        value: 490,
        suffix: " bi",
        decimals: 0,
        label: "Ativos sob gestão",
        note: "Base de capital de longo prazo",
      },
    ],
  },
  leadership: {
    eyebrow: "Conselho e liderança",
    title: "Guardiões, não especuladores",
    intro: "Nossa liderança é avaliada por décadas, não por trimestres — um comitê executivo responsável perante um conselho independente.",
    hoverHint: "Passe o cursor sobre um retrato para ler a biografia completa",
    quote:
      "Não perseguimos o humor do mercado. Compramos negócios essenciais, cuidamos de quem os conduz e deixamos o tempo fazer a composição.",
    quoteAuthor: "Helena Vasconcelos",
    quoteRole: "Presidente do Conselho",
    leaders: [
      {
        id: "helena",
        name: "Helena Vasconcelos",
        role: "Presidente do Conselho",
        since: "Preside desde 2016",
        initials: "HV",
        bio: "Ex-presidente de banco central, Helena conduziu o conselho por duas grandes expansões. Ela define a filosofia de alocação de capital e protege a independência do grupo.",
      },
      {
        id: "adebayo",
        name: "Adebayo Okonkwo",
        role: "Diretor-Presidente do Grupo",
        since: "CEO desde 2019",
        initials: "AO",
        bio: "Adebayo veio da plataforma de energia que transformou em líder de mercado. Dirige o grupo com foco em excelência operacional e decisões pausadas e baseadas em evidências.",
      },
      {
        id: "mariana",
        name: "Mariana Ferreira",
        role: "Diretora Financeira do Grupo",
        since: "CFO desde 2021",
        initials: "MF",
        bio: "Mariana zela por um balanço conservador e pelo perfil de grau de investimento do grupo. É reconhecida por preservar a flexibilidade em todos os ciclos.",
      },
      {
        id: "kenji",
        name: "Kenji Nakamura",
        role: "CEO, Meridian Tecnologia",
        since: "No grupo desde 2013",
        initials: "KN",
        bio: "Kenji lidera a plataforma de infraestrutura digital, expandindo data centers e conectividade no Indo-Pacífico com a disciplina de um engenheiro pela confiabilidade.",
      },
      {
        id: "sofia",
        name: "Sofia Almeida",
        role: "CEO, Meridian Logística",
        since: "No grupo desde 2011",
        initials: "SA",
        bio: "Sofia comanda a rede de portos e cadeia de frio. Foi pioneira no padrão logístico com auditoria de carbono do grupo, hoje adotado em três continentes.",
      },
      {
        id: "daniel",
        name: "Daniel Rosenberg",
        role: "Diretor de Sustentabilidade",
        since: "No grupo desde 2018",
        initials: "DR",
        bio: "Daniel traduz o horizonte longo do grupo em metas mensuráveis de clima e governança, e reporta o progresso diretamente ao conselho a cada trimestre.",
      },
    ],
  },
  newsroom: {
    eyebrow: "Sala de imprensa",
    title: "O que o grupo está fazendo agora",
    intro: "Comunicados, resultados e perspectivas do Meridian Group e de suas plataformas operacionais.",
    filters: [
      { id: "all", label: "Todos" },
      { id: "corporate", label: "Corporativo" },
      { id: "energy", label: "Energia" },
      { id: "finance", label: "Finanças" },
      { id: "sustainability", label: "Sustentabilidade" },
    ],
    empty: "Ainda não há notícias nesta categoria. Selecione outro filtro.",
    readMore: "Ler comunicado",
    items: [
      {
        id: "n1",
        category: "corporate",
        date: "14 jul 2026",
        location: "Londres",
        title: "Meridian Group divulga resultados resilientes no semestre",
        excerpt: "A receita consolidada subiu 5,8% com a normalização dos volumes de logística e o desempenho acima do plano em energia.",
        readTime: "4 min",
      },
      {
        id: "n2",
        category: "energy",
        date: "02 jul 2026",
        location: "Lisboa",
        title: "Meridian Energia inaugura parque eólico offshore de 1,2 GW",
        excerpt: "O projeto Atlântico torna-se o maior ativo renovável único da plataforma, com capacidade para 900 mil residências.",
        readTime: "3 min",
      },
      {
        id: "n3",
        category: "finance",
        date: "21 jun 2026",
        location: "Nova York",
        title: "Serviços Financeiros precifica título de longo prazo de US$ 1,5 bi",
        excerpt: "Os recursos serão reciclados no pipeline de infraestrutura regulada do grupo a um custo de capital atrativo.",
        readTime: "2 min",
      },
      {
        id: "n4",
        category: "sustainability",
        date: "09 jun 2026",
        location: "Singapura",
        title: "Rede de cadeia de frio atinge auditoria total de carbono",
        excerpt: "Todas as instalações da Meridian Logística agora reportam emissões verificadas, inéditas no corredor Indo-Pacífico.",
        readTime: "5 min",
      },
      {
        id: "n5",
        category: "corporate",
        date: "28 mai 2026",
        location: "São Paulo",
        title: "Grupo nomeia dois conselheiros independentes",
        excerpt: "As indicações aprofundam a expertise do conselho em risco climático e infraestrutura digital antes do próximo ciclo de planejamento.",
        readTime: "3 min",
      },
      {
        id: "n6",
        category: "energy",
        date: "12 mai 2026",
        location: "Frankfurt",
        title: "Plano de investimento em rede regulada aprovado até 2030",
        excerpt: "Reguladores aprovaram um programa plurianual para modernizar a transmissão que atende onze milhões de conexões.",
        readTime: "4 min",
      },
    ],
  },
  esg: {
    eyebrow: "Sustentabilidade",
    title: "Compromissos que reportamos a cada trimestre",
    intro: "Tratamos metas de clima e governança como qualquer outro compromisso de capital — mensuradas, auditadas e reportadas ao conselho.",
    pillars: [
      {
        title: "Ambiental",
        body: "Um caminho crível rumo ao zero líquido na geração própria e na logística, financiado pelo próprio balanço do grupo.",
      },
      {
        title: "Social",
        body: "Ambientes de trabalho seguros e bem governados para 128 mil pessoas e investimento duradouro nas comunidades atendidas.",
      },
      {
        title: "Governança",
        body: "Um conselho independente, incentivos alinhados e relatórios transparentes que perduram além de qualquer gestão.",
      },
    ],
    metricsLabel: "Progresso frente aos compromissos de 2030",
    progressLabel: "Atual",
    targetLabel: "Meta 2030",
    metrics: [
      {
        id: "carbon",
        label: "Redução de emissões operacionais",
        detail: "Escopos 1 e 2, frente à base de 2019",
        current: 41,
        target: 60,
        unit: "%",
        targetYear: "2030",
      },
      {
        id: "renewables",
        label: "Participação de renováveis na geração",
        detail: "Na plataforma Meridian Energia",
        current: 68,
        target: 85,
        unit: "%",
        targetYear: "2030",
      },
      {
        id: "diversity",
        label: "Mulheres na alta liderança",
        detail: "No grupo, em cargos de diretoria ou acima",
        current: 39,
        target: 45,
        unit: "%",
        targetYear: "2030",
      },
      {
        id: "community",
        label: "Reinvestimento comunitário",
        detail: "Parcela do lucro líquido comprometida ao ano",
        current: 2.4,
        target: 3,
        unit: "%",
        targetYear: "2030",
      },
    ],
  },
  investor: {
    eyebrow: "Relações com investidores",
    title: "Feito para acionistas com paciência",
    body: "O Meridian Group compôs o valor patrimonial por ação a uma taxa de dois dígitos por quatro décadas. Reportamos com franqueza e esperamos ser cobrados por isso.",
    ticker: "MRDN · LSE",
    price: "£142,80",
    change: "+1,9%",
    changeLabel: "Hoje",
    updated: "Atraso de 15 minutos",
    nextEvent: [
      { label: "Próximos resultados", value: "05 ago 2026" },
      { label: "Dividendo anual", value: "£3,24" },
      { label: "Rating de crédito", value: "AA- estável" },
    ],
    primaryCta: "Baixar relatório anual",
    secondaryCta: "Calendário do investidor",
    reportsLabel: "Divulgações recentes",
    reports: [
      { title: "Relatório Anual 2025", meta: "PDF · 8,4 MB" },
      { title: "Resultados do 1º semestre de 2026", meta: "PDF · 3,1 MB" },
      { title: "Plano de Transição Climática", meta: "PDF · 5,7 MB" },
    ],
  },
  footer: {
    blurb: "Uma holding global que aloca capital de longo prazo em energia, logística, tecnologia e serviços financeiros desde 1974.",
    columns: [
      {
        title: "Grupo",
        links: ["Sobre a Meridian", "Nossos negócios", "Liderança", "Carreiras", "Contato"],
      },
      {
        title: "Investidores",
        links: ["Relatórios e resultados", "Informações da ação", "Histórico de dividendos", "Governança", "Cobertura de analistas"],
      },
      {
        title: "Responsabilidade",
        links: ["Transição climática", "Política de direitos humanos", "Código de fornecedores", "Impacto comunitário", "Divulgações"],
      },
    ],
    socialLabel: "Acompanhe o Meridian Group",
    socials: [
      { id: "site", label: "meridiangroup.com" },
      { id: "press", label: "Assessoria de imprensa" },
      { id: "contact", label: "Contato geral" },
    ],
    legal: "Meridian Group plc. Registrada na Inglaterra. Todos os direitos reservados.",
    legalLinks: ["Aviso legal", "Privacidade", "Cookies", "Declaração antiescravidão"],
    address: "1 Meridian Court, Londres EC2N 4AY, Reino Unido",
  },
};

/* ------------------------------------------------------------------ */
/* Spanish                                                             */
/* ------------------------------------------------------------------ */

const es: MeridianContent = {
  nav: {
    tagline: "Holding Global",
    links: [
      { href: "#units", label: "Negocios" },
      { href: "#figures", label: "Resultados" },
      { href: "#leadership", label: "Liderazgo" },
      { href: "#newsroom", label: "Prensa" },
      { href: "#esg", label: "Sostenibilidad" },
    ],
    cta: "Relación con Inversores",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  hero: {
    eyebrow: "Fundada en 1974 · Presente en 42 mercados",
    titleTop: "Una cartera disciplinada,",
    titleSerif: "diseñada para componer",
    titleBottom: "a lo largo de generaciones.",
    lede: "Meridian Group asigna capital de largo plazo en energía, logística, tecnología y servicios financieros — propietarios estables de negocios esenciales en seis continentes.",
    presenceLabel: "Presencia en seis continentes",
    ctaPrimary: "Conoce nuestros negocios",
    ctaSecondary: "Informe anual",
    mapLabel: "Centros operativos globales",
    mapCaption: "Ocho sedes regionales coordinan operaciones en 42 mercados.",
    hubs: HUBS,
    quickStats: [
      { value: "42", label: "Mercados" },
      { value: "128 mil", label: "Personas" },
      { value: "60+", label: "Empresas" },
      { value: "44,8 B€", label: "Ingresos" },
    ],
  },
  units: {
    eyebrow: "Unidades de negocio",
    title: "Cuatro plataformas, la mentalidad de un propietario",
    intro: "Mantenemos participaciones de control en líderes de categoría y las respaldamos con capital paciente, profundidad operativa y un horizonte genuinamente largo.",
    tabHint: "Selecciona una plataforma",
    units: [
      {
        id: "energy",
        label: "Energía",
        headline: "Impulsando la transición con responsabilidad",
        body: "Desde redes de transmisión reguladas hasta renovables a gran escala, Meridian Energía mantiene la infraestructura esencial mientras descarboniza su matriz de generación.",
        established: "Desde 1981",
        revenue: "16,8 B€",
        revenueLabel: "Ingresos del segmento",
        footprint: "14 mercados",
        footprintLabel: "Presencia operativa",
        highlights: [
          "9,4 GW de capacidad renovable instalada",
          "Redes reguladas con 11 millones de conexiones",
          "Grado de inversión en todos los vehículos",
        ],
        image: IMG.energy,
        imageAlt: "Arquitectura de acero y vidrio de la sede de una empresa energética",
      },
      {
        id: "logistics",
        label: "Logística",
        headline: "Moviendo los bienes esenciales del mundo",
        body: "Meridian Logística opera puertos, cadenas de frío y terminales interiores que conectan a los productores con los mercados del Atlántico y el Indo-Pacífico.",
        established: "Desde 1996",
        revenue: "11,7 B€",
        revenueLabel: "Ingresos del segmento",
        footprint: "21 mercados",
        footprintLabel: "Presencia operativa",
        highlights: [
          "17 terminales de aguas profundas en concesión",
          "3,1 millones de TEU gestionados al año",
          "Cadena de frío auditada en tres continentes",
        ],
        image: IMG.logistics,
        imageAlt: "Horizonte urbano al anochecer que representa corredores logísticos",
      },
      {
        id: "technology",
        label: "Tecnología",
        headline: "Componiendo a través de la infraestructura digital",
        body: "Meridian Tecnología posee centros de datos, conectividad y plataformas de software empresarial — la columna vertebral silenciosa del comercio moderno.",
        established: "Desde 2009",
        revenue: "9,0 B€",
        revenueLabel: "Ingresos del segmento",
        footprint: "19 mercados",
        footprintLabel: "Presencia operativa",
        highlights: [
          "480 MW de capacidad contratada en centros de datos",
          "Plataformas con 40.000 clientes empresariales",
          "99,99% de disponibilidad mediana en las instalaciones",
        ],
        image: IMG.technology,
        imageAlt: "Rascacielos de vidrio que refleja el cielo",
      },
      {
        id: "finance",
        label: "Finanzas",
        headline: "Capital asignado con convicción",
        body: "Meridian Servicios Financieros suscribe seguros, crédito privado y ahorro de larga duración — reciclando primas en la propia cartera de infraestructura del grupo.",
        established: "Desde 1974",
        revenue: "7,3 B€",
        revenueLabel: "Ingresos del segmento",
        footprint: "23 mercados",
        footprintLabel: "Presencia operativa",
        highlights: [
          "88.000 M€ en activos bajo gestión",
          "Calificación de solidez financiera AA-",
          "44 años consecutivos de crecimiento del dividendo",
        ],
        image: IMG.finance,
        imageAlt: "Edificio de la sede corporativa visto desde abajo",
      },
    ],
  },
  figures: {
    eyebrow: "Resultados del grupo",
    title: "La escala detrás de la disciplina",
    intro: "Resultados auditados del ejercicio cerrado el 31 de diciembre, consolidados en las cuatro plataformas operativas.",
    asOf: "Cifras según el informe anual 2025",
    figures: [
      {
        id: "revenue",
        prefix: "",
        value: 44.8,
        suffix: " B€",
        decimals: 1,
        label: "Ingresos consolidados",
        note: "Un 6,2% más interanual",
      },
      {
        id: "markets",
        prefix: "",
        value: 42,
        suffix: "",
        decimals: 0,
        label: "Mercados de operación",
        note: "En seis continentes",
      },
      {
        id: "people",
        prefix: "",
        value: 128,
        suffix: " mil",
        decimals: 0,
        label: "Personas empleadas",
        note: "En más de 60 empresas",
      },
      {
        id: "aum",
        prefix: "",
        value: 88,
        suffix: " B€",
        decimals: 0,
        label: "Activos bajo gestión",
        note: "Base de capital de larga duración",
      },
    ],
  },
  leadership: {
    eyebrow: "Consejo y liderazgo",
    title: "Custodios, no especuladores",
    intro: "Nuestro liderazgo se mide por décadas, no por trimestres — un comité ejecutivo responsable ante un consejo independiente.",
    hoverHint: "Pasa el cursor sobre un retrato para leer la biografía completa",
    quote:
      "No perseguimos el ánimo del mercado. Compramos negocios esenciales, cuidamos a quienes los dirigen y dejamos que el tiempo componga.",
    quoteAuthor: "Helena Vasconcelos",
    quoteRole: "Presidenta del Consejo",
    leaders: [
      {
        id: "helena",
        name: "Helena Vasconcelos",
        role: "Presidenta del Consejo",
        since: "Preside desde 2016",
        initials: "HV",
        bio: "Exgobernadora de banco central, Helena ha presidido el consejo durante dos grandes expansiones. Define la filosofía de asignación de capital y protege la independencia del grupo.",
      },
      {
        id: "adebayo",
        name: "Adebayo Okonkwo",
        role: "Consejero Delegado del Grupo",
        since: "CEO desde 2019",
        initials: "AO",
        bio: "Adebayo procede de la plataforma energética que convirtió en líder del mercado. Dirige el grupo con inclinación por la excelencia operativa y decisiones pausadas y basadas en evidencia.",
      },
      {
        id: "mariana",
        name: "Mariana Ferreira",
        role: "Directora Financiera del Grupo",
        since: "CFO desde 2021",
        initials: "MF",
        bio: "Mariana supervisa un balance conservador y el perfil de grado de inversión del grupo. Es conocida por preservar la flexibilidad en cada ciclo.",
      },
      {
        id: "kenji",
        name: "Kenji Nakamura",
        role: "CEO, Meridian Tecnología",
        since: "En el grupo desde 2013",
        initials: "KN",
        bio: "Kenji lidera la plataforma de infraestructura digital, escalando centros de datos y conectividad en el Indo-Pacífico con la disciplina de un ingeniero por la fiabilidad.",
      },
      {
        id: "sofia",
        name: "Sofia Almeida",
        role: "CEO, Meridian Logística",
        since: "En el grupo desde 2011",
        initials: "SA",
        bio: "Sofia dirige la red de puertos y cadena de frío. Fue pionera del estándar logístico con auditoría de carbono del grupo, hoy adoptado en tres continentes.",
      },
      {
        id: "daniel",
        name: "Daniel Rosenberg",
        role: "Director de Sostenibilidad",
        since: "En el grupo desde 2018",
        initials: "DR",
        bio: "Daniel traduce el largo horizonte del grupo en metas medibles de clima y gobernanza, e informa del progreso directamente al consejo cada trimestre.",
      },
    ],
  },
  newsroom: {
    eyebrow: "Sala de prensa",
    title: "Lo que el grupo está haciendo ahora",
    intro: "Comunicados, resultados y perspectivas de Meridian Group y sus plataformas operativas.",
    filters: [
      { id: "all", label: "Todos" },
      { id: "corporate", label: "Corporativo" },
      { id: "energy", label: "Energía" },
      { id: "finance", label: "Finanzas" },
      { id: "sustainability", label: "Sostenibilidad" },
    ],
    empty: "Aún no hay noticias en esta categoría. Selecciona otro filtro.",
    readMore: "Leer comunicado",
    items: [
      {
        id: "n1",
        category: "corporate",
        date: "14 jul 2026",
        location: "Londres",
        title: "Meridian Group presenta resultados resilientes en el semestre",
        excerpt: "Los ingresos consolidados subieron un 5,8% al normalizarse los volúmenes de logística y superar el plan la plataforma energética.",
        readTime: "4 min",
      },
      {
        id: "n2",
        category: "energy",
        date: "02 jul 2026",
        location: "Lisboa",
        title: "Meridian Energía pone en marcha un parque eólico marino de 1,2 GW",
        excerpt: "El proyecto Atlántico se convierte en el mayor activo renovable de la plataforma, con capacidad para 900.000 hogares.",
        readTime: "3 min",
      },
      {
        id: "n3",
        category: "finance",
        date: "21 jun 2026",
        location: "Nueva York",
        title: "Servicios Financieros coloca un bono de larga duración de 1.500 M$",
        excerpt: "Los fondos se reciclarán en la cartera de infraestructura regulada del grupo a un coste de capital atractivo.",
        readTime: "2 min",
      },
      {
        id: "n4",
        category: "sustainability",
        date: "09 jun 2026",
        location: "Singapur",
        title: "La red de cadena de frío alcanza la auditoría total de carbono",
        excerpt: "Todas las instalaciones de Meridian Logística informan ahora emisiones verificadas, algo inédito en el corredor Indo-Pacífico.",
        readTime: "5 min",
      },
      {
        id: "n5",
        category: "corporate",
        date: "28 may 2026",
        location: "São Paulo",
        title: "El grupo nombra a dos consejeros independientes",
        excerpt: "Las incorporaciones refuerzan la experiencia del consejo en riesgo climático e infraestructura digital antes del próximo ciclo de planificación.",
        readTime: "3 min",
      },
      {
        id: "n6",
        category: "energy",
        date: "12 may 2026",
        location: "Fráncfort",
        title: "Aprobado el plan de inversión en red regulada hasta 2030",
        excerpt: "Los reguladores autorizaron un programa plurianual para modernizar la transmisión que atiende a once millones de conexiones.",
        readTime: "4 min",
      },
    ],
  },
  esg: {
    eyebrow: "Sostenibilidad",
    title: "Compromisos que reportamos cada trimestre",
    intro: "Tratamos las metas de clima y gobernanza como cualquier otro compromiso de capital — medidas, auditadas y reportadas al consejo.",
    pillars: [
      {
        title: "Ambiental",
        body: "Un camino creíble hacia el cero neto en la generación propia y la logística, financiado desde el propio balance del grupo.",
      },
      {
        title: "Social",
        body: "Entornos de trabajo seguros y bien gobernados para 128.000 personas e inversión duradera en las comunidades que servimos.",
      },
      {
        title: "Gobernanza",
        body: "Un consejo independiente, incentivos alineados y una información transparente que perdura más allá de cualquier gestión.",
      },
    ],
    metricsLabel: "Progreso frente a los compromisos de 2030",
    progressLabel: "Actual",
    targetLabel: "Meta 2030",
    metrics: [
      {
        id: "carbon",
        label: "Reducción de emisiones operativas",
        detail: "Alcances 1 y 2, frente a la base de 2019",
        current: 41,
        target: 60,
        unit: "%",
        targetYear: "2030",
      },
      {
        id: "renewables",
        label: "Participación renovable en la generación",
        detail: "En la plataforma Meridian Energía",
        current: 68,
        target: 85,
        unit: "%",
        targetYear: "2030",
      },
      {
        id: "diversity",
        label: "Mujeres en la alta dirección",
        detail: "En el grupo, cargos de dirección o superiores",
        current: 39,
        target: 45,
        unit: "%",
        targetYear: "2030",
      },
      {
        id: "community",
        label: "Reinversión comunitaria",
        detail: "Parte del beneficio neto comprometida al año",
        current: 2.4,
        target: 3,
        unit: "%",
        targetYear: "2030",
      },
    ],
  },
  investor: {
    eyebrow: "Relación con inversores",
    title: "Diseñado para propietarios con paciencia",
    body: "Meridian Group ha compuesto el valor contable por acción a una tasa de dos dígitos durante cuatro décadas. Informamos con franqueza y esperamos que se nos exija.",
    ticker: "MRDN · LSE",
    price: "142,80£",
    change: "+1,9%",
    changeLabel: "Hoy",
    updated: "Retraso de 15 minutos",
    nextEvent: [
      { label: "Próximos resultados", value: "05 ago 2026" },
      { label: "Dividendo anual", value: "3,24£" },
      { label: "Calificación crediticia", value: "AA- estable" },
    ],
    primaryCta: "Descargar informe anual",
    secondaryCta: "Calendario del inversor",
    reportsLabel: "Divulgaciones recientes",
    reports: [
      { title: "Informe Anual 2025", meta: "PDF · 8,4 MB" },
      { title: "Resultados del primer semestre de 2026", meta: "PDF · 3,1 MB" },
      { title: "Plan de Transición Climática", meta: "PDF · 5,7 MB" },
    ],
  },
  footer: {
    blurb: "Una holding global que asigna capital de largo plazo en energía, logística, tecnología y servicios financieros desde 1974.",
    columns: [
      {
        title: "Grupo",
        links: ["Sobre Meridian", "Nuestros negocios", "Liderazgo", "Empleo", "Contacto"],
      },
      {
        title: "Inversores",
        links: ["Informes y resultados", "Información de la acción", "Historial de dividendos", "Gobernanza", "Cobertura de analistas"],
      },
      {
        title: "Responsabilidad",
        links: ["Transición climática", "Política de derechos humanos", "Código de proveedores", "Impacto comunitario", "Divulgaciones"],
      },
    ],
    socialLabel: "Sigue a Meridian Group",
    socials: [
      { id: "site", label: "meridiangroup.com" },
      { id: "press", label: "Oficina de prensa" },
      { id: "contact", label: "Consultas generales" },
    ],
    legal: "Meridian Group plc. Registrada en Inglaterra. Todos los derechos reservados.",
    legalLinks: ["Aviso legal", "Privacidad", "Cookies", "Declaración sobre esclavitud moderna"],
    address: "1 Meridian Court, Londres EC2N 4AY, Reino Unido",
  },
};

export const meridianDict: DemoDictionary<MeridianContent> = { en, pt, es };
