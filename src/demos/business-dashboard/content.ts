import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type PeriodId = "q1" | "q2" | "q3" | "q4";
export type TrendDir = "up" | "down";
export type SeriesTone = "accent" | "violet" | "cyan" | "emerald";

export const PERIODS: PeriodId[] = ["q1", "q2", "q3", "q4"];

/**
 * Locale-independent numeric model. Currency figures are stored as USD base
 * units and re-expressed per locale via the `currency` config in each
 * dictionary (multiplier + Intl code), so the numbers never get duplicated
 * across translations.
 */

export interface KeyResultData {
  id: string;
  /** Progress 0-100 per period. */
  values: Record<PeriodId, number>;
  /** Target the key result is pacing toward, for the "x of y" line. */
  target: number;
  unit: "pct" | "count" | "money";
}

export interface ObjectiveData {
  id: string;
  tone: SeriesTone;
  /** Overall attainment 0-100 per period (drives the ring). */
  values: Record<PeriodId, number>;
  keyResults: KeyResultData[];
}

export interface ChartPeriodData {
  /** Weekly revenue magnitudes 0-100 (area series). */
  revenue: number[];
  /** Weekly forecast magnitudes 0-100 (line series). */
  target: number[];
  /** Period revenue in USD base units, formatted per locale at render. */
  total: number;
  /** Prior-period total for delta framing. */
  prior: number;
}

export interface MemberData {
  id: string;
  name: string;
  region: string;
  roleKey: string;
  trend: TrendDir;
  /** USD base revenue per period. */
  revenue: Record<PeriodId, number>;
  deals: Record<PeriodId, number>;
  /** Quota attainment 0-140 per period. */
  attainment: Record<PeriodId, number>;
}

/* ------------------------------------------------------------------ */
/* Numeric model (not translated)                                     */
/* ------------------------------------------------------------------ */

export const OBJECTIVE_DATA: ObjectiveData[] = [
  {
    id: "growth",
    tone: "accent",
    values: { q1: 74, q2: 81, q3: 88, q4: 92 },
    keyResults: [
      { id: "arr", values: { q1: 68, q2: 76, q3: 84, q4: 91 }, target: 24, unit: "money" },
      { id: "logos", values: { q1: 71, q2: 79, q3: 86, q4: 94 }, target: 60, unit: "count" },
      { id: "expansion", values: { q1: 82, q2: 88, q3: 93, q4: 96 }, target: 118, unit: "pct" },
    ],
  },
  {
    id: "retention",
    tone: "violet",
    values: { q1: 88, q2: 90, q3: 93, q4: 95 },
    keyResults: [
      { id: "nrr", values: { q1: 84, q2: 88, q3: 92, q4: 95 }, target: 124, unit: "pct" },
      { id: "churn", values: { q1: 79, q2: 84, q3: 90, q4: 93 }, target: 2, unit: "pct" },
      { id: "nps", values: { q1: 90, q2: 92, q3: 94, q4: 97 }, target: 62, unit: "count" },
    ],
  },
  {
    id: "efficiency",
    tone: "cyan",
    values: { q1: 61, q2: 70, q3: 77, q4: 84 },
    keyResults: [
      { id: "cac", values: { q1: 58, q2: 66, q3: 74, q4: 82 }, target: 11, unit: "count" },
      { id: "margin", values: { q1: 63, q2: 71, q3: 78, q4: 85 }, target: 74, unit: "pct" },
      { id: "velocity", values: { q1: 66, q2: 73, q3: 80, q4: 87 }, target: 34, unit: "count" },
    ],
  },
  {
    id: "product",
    tone: "emerald",
    values: { q1: 55, q2: 67, q3: 79, q4: 90 },
    keyResults: [
      { id: "adoption", values: { q1: 52, q2: 65, q3: 78, q4: 89 }, target: 71, unit: "pct" },
      { id: "uptime", values: { q1: 94, q2: 96, q3: 98, q4: 99 }, target: 99, unit: "pct" },
      { id: "ship", values: { q1: 60, q2: 72, q3: 83, q4: 92 }, target: 48, unit: "count" },
    ],
  },
];

export const CHART_DATA: Record<PeriodId, ChartPeriodData> = {
  q1: {
    revenue: [38, 42, 40, 47, 52, 49, 58, 61, 57, 66, 63, 71, 74],
    target: [40, 44, 46, 48, 51, 54, 56, 59, 62, 64, 67, 70, 72],
    total: 4_180_000,
    prior: 3_640_000,
  },
  q2: {
    revenue: [46, 51, 55, 53, 62, 66, 63, 71, 76, 72, 80, 84, 88],
    target: [50, 53, 56, 59, 62, 65, 68, 71, 74, 77, 80, 83, 86],
    total: 5_240_000,
    prior: 4_180_000,
  },
  q3: {
    revenue: [58, 63, 61, 70, 74, 71, 79, 83, 80, 88, 85, 91, 95],
    target: [60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90, 92, 94],
    total: 6_120_000,
    prior: 5_240_000,
  },
  q4: {
    revenue: [66, 72, 78, 75, 84, 89, 86, 93, 97, 94, 99, 96, 100],
    target: [70, 73, 76, 79, 82, 85, 88, 90, 92, 94, 96, 98, 99],
    total: 7_480_000,
    prior: 6_120_000,
  },
};

export const MEMBER_DATA: MemberData[] = [
  {
    id: "amara",
    name: "Amara Okafor",
    region: "EMEA",
    roleKey: "strategic",
    trend: "up",
    revenue: { q1: 512_000, q2: 604_000, q3: 688_000, q4: 812_000 },
    deals: { q1: 14, q2: 17, q3: 19, q4: 23 },
    attainment: { q1: 104, q2: 112, q3: 118, q4: 127 },
  },
  {
    id: "rafael",
    name: "Rafael Menezes",
    region: "LATAM",
    roleKey: "enterprise",
    trend: "up",
    revenue: { q1: 468_000, q2: 521_000, q3: 634_000, q4: 726_000 },
    deals: { q1: 12, q2: 15, q3: 18, q4: 21 },
    attainment: { q1: 96, q2: 103, q3: 114, q4: 121 },
  },
  {
    id: "lena",
    name: "Lena Vasquez",
    region: "AMER",
    roleKey: "growth",
    trend: "down",
    revenue: { q1: 441_000, q2: 498_000, q3: 472_000, q4: 559_000 },
    deals: { q1: 18, q2: 20, q3: 17, q4: 22 },
    attainment: { q1: 108, q2: 116, q3: 98, q4: 109 },
  },
  {
    id: "kenji",
    name: "Kenji Watanabe",
    region: "APAC",
    roleKey: "enterprise",
    trend: "up",
    revenue: { q1: 389_000, q2: 452_000, q3: 538_000, q4: 641_000 },
    deals: { q1: 9, q2: 12, q3: 15, q4: 18 },
    attainment: { q1: 88, q2: 97, q3: 108, q4: 118 },
  },
  {
    id: "priya",
    name: "Priya Nair",
    region: "APAC",
    roleKey: "growth",
    trend: "up",
    revenue: { q1: 356_000, q2: 418_000, q3: 489_000, q4: 572_000 },
    deals: { q1: 21, q2: 24, q3: 26, q4: 29 },
    attainment: { q1: 92, q2: 101, q3: 110, q4: 119 },
  },
  {
    id: "tomas",
    name: "Tomás Ferreira",
    region: "EMEA",
    roleKey: "strategic",
    trend: "down",
    revenue: { q1: 402_000, q2: 447_000, q3: 431_000, q4: 468_000 },
    deals: { q1: 11, q2: 13, q3: 12, q4: 14 },
    attainment: { q1: 99, q2: 106, q3: 94, q4: 101 },
  },
];

/* ------------------------------------------------------------------ */
/* Copy dictionary                                                     */
/* ------------------------------------------------------------------ */

export interface CurrencyConfig {
  /** BCP-47 locale used for Intl number formatting. */
  numberLocale: string;
  code: string;
  /** Applied to USD base figures to localize the magnitude. */
  multiplier: number;
}

export interface KpiCopy {
  id: string;
  label: string;
  values: Record<PeriodId, { value: string; delta: string; trend: TrendDir }>;
}

export interface Content {
  currency: CurrencyConfig;
  nav: {
    links: { id: string; label: string }[];
    periodPrefix: string;
    fiscalLabel: string;
    exportLabel: string;
    liveLabel: string;
    userName: string;
    userRole: string;
  };
  periods: Record<PeriodId, { short: string; label: string; window: string }>;
  header: {
    eyebrow: string;
    title: string;
    subtitle: string;
    healthLabel: string;
    healthValue: string;
    pace: string;
  };
  okr: {
    id: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    ringHint: string;
    objectives: { id: string; label: string; caption: string }[];
  };
  drill: {
    kicker: string;
    ownerLabel: string;
    keyResultsLabel: string;
    progressLabel: string;
    closeLabel: string;
    onTrack: string;
    atRisk: string;
    behind: string;
    owners: Record<string, string>;
    keyResults: Record<string, { label: string; hint: string }>;
  };
  revenue: {
    id: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    seriesRevenue: string;
    seriesTarget: string;
    totalLabel: string;
    vsLabel: string;
    kpis: KpiCopy[];
  };
  team: {
    id: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    roles: Record<string, string>;
    columns: {
      rep: string;
      region: string;
      revenue: string;
      deals: string;
      attainment: string;
    };
    sortHint: string;
    quotaLabel: string;
  };
  activity: {
    id: string;
    eyebrow: string;
    title: string;
    filterAll: string;
    items: { id: string; kind: "deal" | "goal" | "risk" | "team"; actor: string; action: string; target: string; time: string }[];
  };
  outro: {
    eyebrow: string;
    title: string;
    body: string;
    primary: string;
    secondary: string;
    stats: { value: string; label: string }[];
  };
  footer: {
    tagline: string;
    columns: { title: string; links: string[] }[];
    social: { icon: string; label: string }[];
    rights: string;
    status: string;
  };
}

function kpi(
  id: string,
  label: string,
  values: Record<PeriodId, { value: string; delta: string; trend: TrendDir }>,
): KpiCopy {
  return { id, label, values };
}

/* ------------------------------------------------------------------ */
/* English                                                             */
/* ------------------------------------------------------------------ */

const en: Content = {
  currency: { numberLocale: "en-US", code: "USD", multiplier: 1 },
  nav: {
    links: [
      { id: "overview", label: "Overview" },
      { id: "objectives", label: "Objectives" },
      { id: "revenue", label: "Revenue" },
      { id: "team", label: "Team" },
      { id: "activity", label: "Activity" },
    ],
    periodPrefix: "Fiscal",
    fiscalLabel: "FY26",
    exportLabel: "Export board pack",
    liveLabel: "Live",
    userName: "Dana Whitfield",
    userRole: "Chief Revenue Officer",
  },
  periods: {
    q1: { short: "Q1", label: "First quarter", window: "Jan — Mar" },
    q2: { short: "Q2", label: "Second quarter", window: "Apr — Jun" },
    q3: { short: "Q3", label: "Third quarter", window: "Jul — Sep" },
    q4: { short: "Q4", label: "Fourth quarter", window: "Oct — Dec" },
  },
  header: {
    eyebrow: "Executive command center",
    title: "The quarter, decided in one glance",
    subtitle:
      "Every objective, revenue signal and rep in a single board-ready surface. Switch the fiscal period and the whole picture recomputes.",
    healthLabel: "Company health",
    healthValue: "On track",
    pace: "Pacing ahead of plan",
  },
  okr: {
    id: "objectives",
    eyebrow: "Objectives & key results",
    title: "Four objectives, one heartbeat",
    subtitle:
      "Attainment updates the instant the period changes. Open any objective to drill into its key results.",
    ringHint: "Open key results",
    objectives: [
      { id: "growth", label: "Accelerate growth", caption: "New ARR and logo acquisition" },
      { id: "retention", label: "Deepen retention", caption: "Net revenue kept and expanded" },
      { id: "efficiency", label: "Sharpen efficiency", caption: "Cost to acquire and serve" },
      { id: "product", label: "Ship the roadmap", caption: "Adoption, reliability and pace" },
    ],
  },
  drill: {
    kicker: "Objective drill-down",
    ownerLabel: "Owner",
    keyResultsLabel: "Key results",
    progressLabel: "Attainment",
    closeLabel: "Close panel",
    onTrack: "On track",
    atRisk: "At risk",
    behind: "Behind",
    owners: {
      growth: "Priya Nair",
      retention: "Amara Okafor",
      efficiency: "Kenji Watanabe",
      product: "Lena Vasquez",
    },
    keyResults: {
      arr: { label: "Net new ARR", hint: "Target 24M in fresh annual recurring revenue" },
      logos: { label: "New enterprise logos", hint: "Land 60 named accounts" },
      expansion: { label: "Expansion rate", hint: "Grow accounts to 118% of entry value" },
      nrr: { label: "Net revenue retention", hint: "Hold NRR at 124%" },
      churn: { label: "Gross churn", hint: "Keep quarterly churn under 2%" },
      nps: { label: "Relationship NPS", hint: "Reach a score of 62" },
      cac: { label: "CAC payback", hint: "Recover acquisition cost in 11 months" },
      margin: { label: "Gross margin", hint: "Sustain 74% gross margin" },
      velocity: { label: "Sales velocity", hint: "34 qualified cycles per rep" },
      adoption: { label: "Feature adoption", hint: "71% of accounts on core workflows" },
      uptime: { label: "Platform uptime", hint: "Hold 99.9% availability" },
      ship: { label: "Roadmap delivered", hint: "48 committed items shipped" },
    },
  },
  revenue: {
    id: "revenue",
    eyebrow: "Revenue trajectory",
    title: "Where the money is moving",
    subtitle:
      "Booked revenue against forecast, week by week. The curve morphs as you switch quarters.",
    seriesRevenue: "Booked revenue",
    seriesTarget: "Forecast",
    totalLabel: "Quarter to date",
    vsLabel: "vs prior quarter",
    kpis: [
      kpi("revenue", "Booked revenue", {
        q1: { value: "$4.18M", delta: "+14.8%", trend: "up" },
        q2: { value: "$5.24M", delta: "+25.4%", trend: "up" },
        q3: { value: "$6.12M", delta: "+16.8%", trend: "up" },
        q4: { value: "$7.48M", delta: "+22.2%", trend: "up" },
      }),
      kpi("nrr", "Net retention", {
        q1: { value: "116%", delta: "+3 pts", trend: "up" },
        q2: { value: "119%", delta: "+3 pts", trend: "up" },
        q3: { value: "122%", delta: "+3 pts", trend: "up" },
        q4: { value: "124%", delta: "+2 pts", trend: "up" },
      }),
      kpi("pipeline", "Qualified pipeline", {
        q1: { value: "$11.2M", delta: "+8.1%", trend: "up" },
        q2: { value: "$13.6M", delta: "+21.4%", trend: "up" },
        q3: { value: "$12.9M", delta: "-5.1%", trend: "down" },
        q4: { value: "$15.8M", delta: "+22.5%", trend: "up" },
      }),
      kpi("accounts", "Active accounts", {
        q1: { value: "1,284", delta: "+62", trend: "up" },
        q2: { value: "1,361", delta: "+77", trend: "up" },
        q3: { value: "1,448", delta: "+87", trend: "up" },
        q4: { value: "1,552", delta: "+104", trend: "up" },
      }),
    ],
  },
  team: {
    id: "team",
    eyebrow: "Team performance",
    title: "Who is carrying the quarter",
    subtitle: "Sort by any column. Trend arrows compare against the prior period.",
    roles: {
      strategic: "Strategic accounts",
      enterprise: "Enterprise",
      growth: "Growth",
    },
    columns: {
      rep: "Representative",
      region: "Region",
      revenue: "Revenue",
      deals: "Deals",
      attainment: "Quota",
    },
    sortHint: "Sort",
    quotaLabel: "of quota",
  },
  activity: {
    id: "activity",
    eyebrow: "Signal feed",
    title: "What just moved",
    filterAll: "All signals",
    items: [
      { id: "a1", kind: "deal", actor: "Amara Okafor", action: "closed", target: "Northwind Robotics — $340K", time: "12m ago" },
      { id: "a2", kind: "goal", actor: "Priya Nair", action: "hit 100% on", target: "New enterprise logos", time: "48m ago" },
      { id: "a3", kind: "risk", actor: "Renewals", action: "flagged risk on", target: "Helios Manufacturing", time: "1h ago" },
      { id: "a4", kind: "team", actor: "Kenji Watanabe", action: "joined", target: "APAC strategic pod", time: "3h ago" },
      { id: "a5", kind: "deal", actor: "Rafael Menezes", action: "advanced", target: "Vega Logistics to contract", time: "5h ago" },
      { id: "a6", kind: "goal", actor: "Efficiency OKR", action: "moved to", target: "84% attainment", time: "yesterday" },
    ],
  },
  outro: {
    eyebrow: "Built by VigApp",
    title: "Dashboards leadership actually opens",
    body:
      "Pulseboard is a concept, but the craft is real: live state, morphing charts and drill-downs your board can read in seconds. We build these for teams that run on numbers.",
    primary: "Start a dashboard project",
    secondary: "See the process",
    stats: [
      { value: "4.2s", label: "to full board readout" },
      { value: "100%", label: "of copy localized" },
      { value: "0", label: "spreadsheets in the room" },
    ],
  },
  footer: {
    tagline: "The revenue operating picture, rendered for the people who decide.",
    columns: [
      { title: "Platform", links: ["Objectives", "Revenue", "Forecasting", "Integrations"] },
      { title: "Company", links: ["About", "Customers", "Careers", "Press"] },
      { title: "Resources", links: ["Board pack", "Benchmarks", "Security", "Status"] },
    ],
    social: [
      { icon: "globe", label: "pulseboard.io" },
      { icon: "at", label: "hello@pulseboard.io" },
      { icon: "message", label: "Talk to sales" },
    ],
    rights: "Pulseboard — a VigApp concept. All figures illustrative.",
    status: "All systems operational",
  },
};

/* ------------------------------------------------------------------ */
/* Portuguese                                                          */
/* ------------------------------------------------------------------ */

const pt: Content = {
  currency: { numberLocale: "pt-BR", code: "BRL", multiplier: 5.1 },
  nav: {
    links: [
      { id: "overview", label: "Visão geral" },
      { id: "objectives", label: "Objetivos" },
      { id: "revenue", label: "Receita" },
      { id: "team", label: "Time" },
      { id: "activity", label: "Atividade" },
    ],
    periodPrefix: "Ano fiscal",
    fiscalLabel: "FY26",
    exportLabel: "Exportar dossiê",
    liveLabel: "Ao vivo",
    userName: "Dana Whitfield",
    userRole: "Diretora de Receita",
  },
  periods: {
    q1: { short: "T1", label: "Primeiro trimestre", window: "Jan — Mar" },
    q2: { short: "T2", label: "Segundo trimestre", window: "Abr — Jun" },
    q3: { short: "T3", label: "Terceiro trimestre", window: "Jul — Set" },
    q4: { short: "T4", label: "Quarto trimestre", window: "Out — Dez" },
  },
  header: {
    eyebrow: "Central executiva",
    title: "O trimestre decidido num só olhar",
    subtitle:
      "Cada objetivo, sinal de receita e vendedor numa superfície pronta para o board. Troque o período fiscal e todo o quadro se recalcula.",
    healthLabel: "Saúde da empresa",
    healthValue: "No ritmo",
    pace: "Adiantado em relação ao plano",
  },
  okr: {
    id: "objectives",
    eyebrow: "Objetivos e resultados-chave",
    title: "Quatro objetivos, um só pulso",
    subtitle:
      "A realização se atualiza no instante em que o período muda. Abra qualquer objetivo para detalhar seus resultados-chave.",
    ringHint: "Ver resultados-chave",
    objectives: [
      { id: "growth", label: "Acelerar o crescimento", caption: "Nova ARR e conquista de contas" },
      { id: "retention", label: "Aprofundar a retenção", caption: "Receita mantida e expandida" },
      { id: "efficiency", label: "Afinar a eficiência", caption: "Custo de aquisição e operação" },
      { id: "product", label: "Entregar o roadmap", caption: "Adoção, confiabilidade e ritmo" },
    ],
  },
  drill: {
    kicker: "Detalhe do objetivo",
    ownerLabel: "Responsável",
    keyResultsLabel: "Resultados-chave",
    progressLabel: "Realização",
    closeLabel: "Fechar painel",
    onTrack: "No ritmo",
    atRisk: "Em risco",
    behind: "Atrasado",
    owners: {
      growth: "Priya Nair",
      retention: "Amara Okafor",
      efficiency: "Kenji Watanabe",
      product: "Lena Vasquez",
    },
    keyResults: {
      arr: { label: "Nova ARR líquida", hint: "Meta de 24M em receita recorrente anual" },
      logos: { label: "Novas contas enterprise", hint: "Conquistar 60 contas nomeadas" },
      expansion: { label: "Taxa de expansão", hint: "Crescer contas a 118% do valor de entrada" },
      nrr: { label: "Retenção líquida de receita", hint: "Manter a NRR em 124%" },
      churn: { label: "Churn bruto", hint: "Manter o churn trimestral abaixo de 2%" },
      nps: { label: "NPS de relacionamento", hint: "Alcançar nota 62" },
      cac: { label: "Payback de CAC", hint: "Recuperar o custo de aquisição em 11 meses" },
      margin: { label: "Margem bruta", hint: "Sustentar margem bruta de 74%" },
      velocity: { label: "Velocidade de vendas", hint: "34 ciclos qualificados por vendedor" },
      adoption: { label: "Adoção de recursos", hint: "71% das contas nos fluxos centrais" },
      uptime: { label: "Disponibilidade", hint: "Manter 99,9% de uptime" },
      ship: { label: "Roadmap entregue", hint: "48 itens comprometidos entregues" },
    },
  },
  revenue: {
    id: "revenue",
    eyebrow: "Trajetória de receita",
    title: "Para onde o dinheiro está indo",
    subtitle:
      "Receita fechada contra o previsto, semana a semana. A curva se transforma quando você troca de trimestre.",
    seriesRevenue: "Receita fechada",
    seriesTarget: "Previsão",
    totalLabel: "No trimestre",
    vsLabel: "vs. trimestre anterior",
    kpis: [
      kpi("revenue", "Receita fechada", {
        q1: { value: "R$ 21,3M", delta: "+14,8%", trend: "up" },
        q2: { value: "R$ 26,7M", delta: "+25,4%", trend: "up" },
        q3: { value: "R$ 31,2M", delta: "+16,8%", trend: "up" },
        q4: { value: "R$ 38,1M", delta: "+22,2%", trend: "up" },
      }),
      kpi("nrr", "Retenção líquida", {
        q1: { value: "116%", delta: "+3 pts", trend: "up" },
        q2: { value: "119%", delta: "+3 pts", trend: "up" },
        q3: { value: "122%", delta: "+3 pts", trend: "up" },
        q4: { value: "124%", delta: "+2 pts", trend: "up" },
      }),
      kpi("pipeline", "Pipeline qualificado", {
        q1: { value: "R$ 57,1M", delta: "+8,1%", trend: "up" },
        q2: { value: "R$ 69,4M", delta: "+21,4%", trend: "up" },
        q3: { value: "R$ 65,8M", delta: "-5,1%", trend: "down" },
        q4: { value: "R$ 80,6M", delta: "+22,5%", trend: "up" },
      }),
      kpi("accounts", "Contas ativas", {
        q1: { value: "1.284", delta: "+62", trend: "up" },
        q2: { value: "1.361", delta: "+77", trend: "up" },
        q3: { value: "1.448", delta: "+87", trend: "up" },
        q4: { value: "1.552", delta: "+104", trend: "up" },
      }),
    ],
  },
  team: {
    id: "team",
    eyebrow: "Desempenho do time",
    title: "Quem está sustentando o trimestre",
    subtitle: "Ordene por qualquer coluna. As setas comparam com o período anterior.",
    roles: {
      strategic: "Contas estratégicas",
      enterprise: "Enterprise",
      growth: "Growth",
    },
    columns: {
      rep: "Representante",
      region: "Região",
      revenue: "Receita",
      deals: "Negócios",
      attainment: "Meta",
    },
    sortHint: "Ordenar",
    quotaLabel: "da meta",
  },
  activity: {
    id: "activity",
    eyebrow: "Fluxo de sinais",
    title: "O que acabou de mudar",
    filterAll: "Todos os sinais",
    items: [
      { id: "a1", kind: "deal", actor: "Amara Okafor", action: "fechou", target: "Northwind Robotics — R$ 1,7M", time: "há 12 min" },
      { id: "a2", kind: "goal", actor: "Priya Nair", action: "atingiu 100% em", target: "Novas contas enterprise", time: "há 48 min" },
      { id: "a3", kind: "risk", actor: "Renovações", action: "sinalizou risco em", target: "Helios Manufacturing", time: "há 1 h" },
      { id: "a4", kind: "team", actor: "Kenji Watanabe", action: "entrou no", target: "pod estratégico APAC", time: "há 3 h" },
      { id: "a5", kind: "deal", actor: "Rafael Menezes", action: "avançou", target: "Vega Logistics para contrato", time: "há 5 h" },
      { id: "a6", kind: "goal", actor: "OKR de eficiência", action: "subiu para", target: "84% de realização", time: "ontem" },
    ],
  },
  outro: {
    eyebrow: "Feito pela VigApp",
    title: "Dashboards que a liderança realmente abre",
    body:
      "Pulseboard é um conceito, mas o cuidado é real: estado ao vivo, gráficos que se transformam e detalhamentos que o board lê em segundos. Construímos isso para times que rodam a números.",
    primary: "Começar um projeto de dashboard",
    secondary: "Ver o processo",
    stats: [
      { value: "4,2s", label: "para a leitura completa" },
      { value: "100%", label: "do texto localizado" },
      { value: "0", label: "planilhas na sala" },
    ],
  },
  footer: {
    tagline: "O retrato operacional da receita, para quem decide.",
    columns: [
      { title: "Plataforma", links: ["Objetivos", "Receita", "Previsão", "Integrações"] },
      { title: "Empresa", links: ["Sobre", "Clientes", "Carreiras", "Imprensa"] },
      { title: "Recursos", links: ["Dossiê do board", "Benchmarks", "Segurança", "Status"] },
    ],
    social: [
      { icon: "globe", label: "pulseboard.io" },
      { icon: "at", label: "ola@pulseboard.io" },
      { icon: "message", label: "Falar com vendas" },
    ],
    rights: "Pulseboard — um conceito VigApp. Números ilustrativos.",
    status: "Todos os sistemas operacionais",
  },
};

/* ------------------------------------------------------------------ */
/* Spanish                                                             */
/* ------------------------------------------------------------------ */

const es: Content = {
  currency: { numberLocale: "es-ES", code: "EUR", multiplier: 0.92 },
  nav: {
    links: [
      { id: "overview", label: "Resumen" },
      { id: "objectives", label: "Objetivos" },
      { id: "revenue", label: "Ingresos" },
      { id: "team", label: "Equipo" },
      { id: "activity", label: "Actividad" },
    ],
    periodPrefix: "Año fiscal",
    fiscalLabel: "FY26",
    exportLabel: "Exportar dosier",
    liveLabel: "En vivo",
    userName: "Dana Whitfield",
    userRole: "Directora de Ingresos",
  },
  periods: {
    q1: { short: "T1", label: "Primer trimestre", window: "Ene — Mar" },
    q2: { short: "T2", label: "Segundo trimestre", window: "Abr — Jun" },
    q3: { short: "T3", label: "Tercer trimestre", window: "Jul — Sep" },
    q4: { short: "T4", label: "Cuarto trimestre", window: "Oct — Dic" },
  },
  header: {
    eyebrow: "Centro de mando ejecutivo",
    title: "El trimestre, decidido de un vistazo",
    subtitle:
      "Cada objetivo, señal de ingresos y comercial en una única superficie lista para el consejo. Cambia el periodo fiscal y todo el cuadro se recalcula.",
    healthLabel: "Salud de la empresa",
    healthValue: "En rumbo",
    pace: "Por delante del plan",
  },
  okr: {
    id: "objectives",
    eyebrow: "Objetivos y resultados clave",
    title: "Cuatro objetivos, un solo pulso",
    subtitle:
      "El cumplimiento se actualiza en el instante en que cambia el periodo. Abre cualquier objetivo para desglosar sus resultados clave.",
    ringHint: "Ver resultados clave",
    objectives: [
      { id: "growth", label: "Acelerar el crecimiento", caption: "Nueva ARR y captación de cuentas" },
      { id: "retention", label: "Profundizar la retención", caption: "Ingresos conservados y ampliados" },
      { id: "efficiency", label: "Afinar la eficiencia", caption: "Coste de adquisición y servicio" },
      { id: "product", label: "Entregar la hoja de ruta", caption: "Adopción, fiabilidad y ritmo" },
    ],
  },
  drill: {
    kicker: "Desglose del objetivo",
    ownerLabel: "Responsable",
    keyResultsLabel: "Resultados clave",
    progressLabel: "Cumplimiento",
    closeLabel: "Cerrar panel",
    onTrack: "En rumbo",
    atRisk: "En riesgo",
    behind: "Rezagado",
    owners: {
      growth: "Priya Nair",
      retention: "Amara Okafor",
      efficiency: "Kenji Watanabe",
      product: "Lena Vasquez",
    },
    keyResults: {
      arr: { label: "Nueva ARR neta", hint: "Meta de 24M en ingresos recurrentes anuales" },
      logos: { label: "Nuevas cuentas enterprise", hint: "Ganar 60 cuentas nominadas" },
      expansion: { label: "Tasa de expansión", hint: "Crecer cuentas al 118% del valor inicial" },
      nrr: { label: "Retención neta de ingresos", hint: "Mantener la NRR en 124%" },
      churn: { label: "Churn bruto", hint: "Mantener el churn trimestral bajo el 2%" },
      nps: { label: "NPS de relación", hint: "Alcanzar una puntuación de 62" },
      cac: { label: "Recuperación de CAC", hint: "Recuperar el coste de adquisición en 11 meses" },
      margin: { label: "Margen bruto", hint: "Sostener un margen bruto del 74%" },
      velocity: { label: "Velocidad de ventas", hint: "34 ciclos cualificados por comercial" },
      adoption: { label: "Adopción de funciones", hint: "71% de las cuentas en flujos clave" },
      uptime: { label: "Disponibilidad", hint: "Mantener el 99,9% de uptime" },
      ship: { label: "Hoja de ruta entregada", hint: "48 elementos comprometidos entregados" },
    },
  },
  revenue: {
    id: "revenue",
    eyebrow: "Trayectoria de ingresos",
    title: "Hacia dónde se mueve el dinero",
    subtitle:
      "Ingresos cerrados frente a la previsión, semana a semana. La curva se transforma al cambiar de trimestre.",
    seriesRevenue: "Ingresos cerrados",
    seriesTarget: "Previsión",
    totalLabel: "En el trimestre",
    vsLabel: "vs. trimestre anterior",
    kpis: [
      kpi("revenue", "Ingresos cerrados", {
        q1: { value: "3,85M €", delta: "+14,8%", trend: "up" },
        q2: { value: "4,82M €", delta: "+25,4%", trend: "up" },
        q3: { value: "5,63M €", delta: "+16,8%", trend: "up" },
        q4: { value: "6,88M €", delta: "+22,2%", trend: "up" },
      }),
      kpi("nrr", "Retención neta", {
        q1: { value: "116%", delta: "+3 pts", trend: "up" },
        q2: { value: "119%", delta: "+3 pts", trend: "up" },
        q3: { value: "122%", delta: "+3 pts", trend: "up" },
        q4: { value: "124%", delta: "+2 pts", trend: "up" },
      }),
      kpi("pipeline", "Pipeline cualificado", {
        q1: { value: "10,3M €", delta: "+8,1%", trend: "up" },
        q2: { value: "12,5M €", delta: "+21,4%", trend: "up" },
        q3: { value: "11,9M €", delta: "-5,1%", trend: "down" },
        q4: { value: "14,5M €", delta: "+22,5%", trend: "up" },
      }),
      kpi("accounts", "Cuentas activas", {
        q1: { value: "1.284", delta: "+62", trend: "up" },
        q2: { value: "1.361", delta: "+77", trend: "up" },
        q3: { value: "1.448", delta: "+87", trend: "up" },
        q4: { value: "1.552", delta: "+104", trend: "up" },
      }),
    ],
  },
  team: {
    id: "team",
    eyebrow: "Rendimiento del equipo",
    title: "Quién sostiene el trimestre",
    subtitle: "Ordena por cualquier columna. Las flechas comparan con el periodo anterior.",
    roles: {
      strategic: "Cuentas estratégicas",
      enterprise: "Enterprise",
      growth: "Growth",
    },
    columns: {
      rep: "Comercial",
      region: "Región",
      revenue: "Ingresos",
      deals: "Tratos",
      attainment: "Cuota",
    },
    sortHint: "Ordenar",
    quotaLabel: "de la cuota",
  },
  activity: {
    id: "activity",
    eyebrow: "Flujo de señales",
    title: "Lo que acaba de moverse",
    filterAll: "Todas las señales",
    items: [
      { id: "a1", kind: "deal", actor: "Amara Okafor", action: "cerró", target: "Northwind Robotics — 313K €", time: "hace 12 min" },
      { id: "a2", kind: "goal", actor: "Priya Nair", action: "alcanzó el 100% en", target: "Nuevas cuentas enterprise", time: "hace 48 min" },
      { id: "a3", kind: "risk", actor: "Renovaciones", action: "marcó riesgo en", target: "Helios Manufacturing", time: "hace 1 h" },
      { id: "a4", kind: "team", actor: "Kenji Watanabe", action: "se unió al", target: "pod estratégico APAC", time: "hace 3 h" },
      { id: "a5", kind: "deal", actor: "Rafael Menezes", action: "avanzó", target: "Vega Logistics a contrato", time: "hace 5 h" },
      { id: "a6", kind: "goal", actor: "OKR de eficiencia", action: "subió a", target: "84% de cumplimiento", time: "ayer" },
    ],
  },
  outro: {
    eyebrow: "Hecho por VigApp",
    title: "Dashboards que la dirección sí abre",
    body:
      "Pulseboard es un concepto, pero el oficio es real: estado en vivo, gráficos que se transforman y desgloses que el consejo lee en segundos. Los construimos para equipos que se mueven por números.",
    primary: "Iniciar un proyecto de dashboard",
    secondary: "Ver el proceso",
    stats: [
      { value: "4,2s", label: "para la lectura completa" },
      { value: "100%", label: "del texto localizado" },
      { value: "0", label: "hojas de cálculo en la sala" },
    ],
  },
  footer: {
    tagline: "La foto operativa de los ingresos, para quien decide.",
    columns: [
      { title: "Plataforma", links: ["Objetivos", "Ingresos", "Previsión", "Integraciones"] },
      { title: "Empresa", links: ["Nosotros", "Clientes", "Empleo", "Prensa"] },
      { title: "Recursos", links: ["Dosier del consejo", "Benchmarks", "Seguridad", "Estado"] },
    ],
    social: [
      { icon: "globe", label: "pulseboard.io" },
      { icon: "at", label: "hola@pulseboard.io" },
      { icon: "message", label: "Hablar con ventas" },
    ],
    rights: "Pulseboard — un concepto de VigApp. Cifras ilustrativas.",
    status: "Todos los sistemas operativos",
  },
};

export const businessDashboardDict: DemoDictionary<Content> = { en, pt, es };

/* ------------------------------------------------------------------ */
/* Formatting helpers                                                  */
/* ------------------------------------------------------------------ */

export function formatMoney(
  base: number,
  currency: CurrencyConfig,
  opts: { compact?: boolean } = {},
): string {
  const value = base * currency.multiplier;
  return new Intl.NumberFormat(currency.numberLocale, {
    style: "currency",
    currency: currency.code,
    notation: opts.compact ? "compact" : "standard",
    maximumFractionDigits: opts.compact ? 2 : 0,
  }).format(value);
}
