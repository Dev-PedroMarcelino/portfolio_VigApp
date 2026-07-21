import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Identifiers                                                         */
/* ------------------------------------------------------------------ */

export type RangeId = "7d" | "30d" | "90d";
export type KpiId = "revenue" | "visitors" | "conversion" | "aov";
export type SeriesId = "revenue" | "sessions" | "conversions";
export type ChannelId =
  | "organic"
  | "paid"
  | "social"
  | "email"
  | "referral"
  | "direct";
export type StageId = "sessions" | "product" | "cart" | "checkout" | "purchase";
export type TrendDir = "up" | "down";
export type KpiFormat = "currency" | "number" | "percent";

/* ------------------------------------------------------------------ */
/* Copy dictionary                                                     */
/* ------------------------------------------------------------------ */

export interface CurrencyConfig {
  /** BCP-47 tag used by Intl.NumberFormat. */
  tag: string;
  /** ISO 4217 currency code. */
  code: string;
}

export interface NavContent {
  brandTag: string;
  links: { id: string; label: string }[];
  liveLabel: string;
  cta: string;
}

export interface HeaderContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  rangeLegend: string;
  ranges: { id: RangeId; label: string; caption: string; span: string }[];
  updatedPrefix: string;
  liveNow: string;
  exportLabel: string;
}

export interface KpisContent {
  vsLabel: string;
  tooltipPrefix: string;
  absoluteLabel: string;
  items: { id: KpiId; label: string; caption: string }[];
}

export interface ChartContent {
  title: string;
  subtitle: string;
  series: { id: SeriesId; label: string }[];
  peakLabel: string;
  avgLabel: string;
  axisNote: string;
  legendHint: string;
}

export interface ChannelsContent {
  title: string;
  subtitle: string;
  items: { id: ChannelId; label: string }[];
  shareLabel: string;
  totalLabel: string;
}

export interface FunnelContent {
  title: string;
  subtitle: string;
  stages: { id: StageId; label: string }[];
  endToEndLabel: string;
  dropLabel: string;
  ofPreviousLabel: string;
  ofTopLabel: string;
}

export interface FeedContent {
  title: string;
  subtitle: string;
  liveLabel: string;
  pausedLabel: string;
  pauseAction: string;
  resumeAction: string;
  fromLabel: string;
  actions: { id: string; label: string; hasValue: boolean }[];
}

export interface OutroContent {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  primaryCta: string;
  secondaryCta: string;
  statValue: string;
  statLabel: string;
}

export interface FooterContent {
  blurb: string;
  columns: { title: string; links: string[] }[];
  socials: { label: string; glyph: string }[];
  legal: string;
}

export interface AnalyticsContent {
  currency: CurrencyConfig;
  nav: NavContent;
  header: HeaderContent;
  kpis: KpisContent;
  chart: ChartContent;
  channels: ChannelsContent;
  funnel: FunnelContent;
  feed: FeedContent;
  outro: OutroContent;
  footer: FooterContent;
}

/* ------------------------------------------------------------------ */
/* Locale-independent numeric datasets                                 */
/* ------------------------------------------------------------------ */

export interface KpiDatum {
  value: number;
  prev: number;
  deltaPct: number;
  trend: TrendDir;
  format: KpiFormat;
  spark: number[];
}

export interface RangeData {
  points: number;
  series: Record<SeriesId, number[]>;
  kpis: Record<KpiId, KpiDatum>;
  channels: Record<ChannelId, number>;
  funnel: Record<StageId, number>;
}

/** Deterministic 0..1 pseudo-noise from an index and seed (no Math.random). */
function noise(i: number, seed: number): number {
  const x = Math.sin((i + 1) * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function buildSeries(
  n: number,
  base: number,
  growth: number,
  amp: number,
  seed: number,
): number[] {
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0 : i / (n - 1);
    const trend = base * (1 + growth * t);
    const wave = Math.sin(t * Math.PI * 3.2 + seed) * base * amp;
    const weekly = Math.sin(t * Math.PI * n * 0.28) * base * amp * 0.4;
    const jitter = (noise(i, seed) - 0.5) * base * amp * 1.3;
    out.push(Math.max(1, Math.round(trend + wave + weekly + jitter)));
  }
  return out;
}

function sum(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0);
}

function resample(arr: number[], m: number): number[] {
  if (arr.length <= m) return arr.slice();
  const out: number[] = [];
  for (let k = 0; k < m; k++) {
    out.push(arr[Math.round((k * (arr.length - 1)) / (m - 1))]);
  }
  return out;
}

/** Signed delta-vs-previous-period percentages, tuned per range for realism. */
const DELTAS: Record<RangeId, Record<KpiId, number>> = {
  "7d": { revenue: 12.4, visitors: 8.1, conversion: 3.2, aov: -1.4 },
  "30d": { revenue: 18.6, visitors: 14.2, conversion: 5.7, aov: 2.3 },
  "90d": { revenue: 31.2, visitors: 22.5, conversion: -2.1, aov: 4.8 },
};

const CHANNEL_WEIGHTS: Record<ChannelId, number> = {
  organic: 0.34,
  paid: 0.22,
  social: 0.16,
  email: 0.12,
  referral: 0.09,
  direct: 0.07,
};

function buildRange(id: RangeId, n: number): RangeData {
  const revenue = buildSeries(n, 16800, 0.3, 0.11, 2.1);
  const sessions = buildSeries(n, 9400, 0.24, 0.09, 5.7);
  const conversions = buildSeries(n, 288, 0.27, 0.13, 8.3);

  const revTotal = sum(revenue);
  const sessTotal = sum(sessions);
  const convTotal = sum(conversions);
  const convRate = (convTotal / sessTotal) * 100;
  const aov = revTotal / convTotal;

  const convRateSeries = sessions.map((s, i) => (conversions[i] / s) * 100);
  const aovSeries = revenue.map((r, i) => r / conversions[i]);

  const d = DELTAS[id];
  const kpi = (
    value: number,
    deltaPct: number,
    format: KpiFormat,
    spark: number[],
  ): KpiDatum => ({
    value,
    prev: value / (1 + deltaPct / 100),
    deltaPct,
    trend: deltaPct >= 0 ? "up" : "down",
    format,
    spark: resample(spark, 14),
  });

  const channels = {} as Record<ChannelId, number>;
  (Object.keys(CHANNEL_WEIGHTS) as ChannelId[]).forEach((c, idx) => {
    const drift = (noise(idx, 4.2) - 0.5) * 0.04;
    channels[c] = Math.round(sessTotal * (CHANNEL_WEIGHTS[c] + drift));
  });

  const funnel: Record<StageId, number> = {
    sessions: sessTotal,
    product: Math.round(sessTotal * 0.63),
    cart: Math.round(sessTotal * 0.29),
    checkout: Math.round(sessTotal * 0.14),
    purchase: convTotal,
  };

  return {
    points: n,
    series: { revenue, sessions, conversions },
    kpis: {
      revenue: kpi(revTotal, d.revenue, "currency", revenue),
      visitors: kpi(sessTotal, d.visitors, "number", sessions),
      conversion: kpi(convRate, d.conversion, "percent", convRateSeries),
      aov: kpi(aov, d.aov, "currency", aovSeries),
    },
    channels,
    funnel,
  };
}

export const DATASETS: Record<RangeId, RangeData> = {
  "7d": buildRange("7d", 7),
  "30d": buildRange("30d", 30),
  "90d": buildRange("90d", 90),
};

/** Proper nouns for the realtime feed — locale-independent by design. */
export const FEED_ACTORS: string[] = [
  "Marina Alvarez",
  "Lucas Bennett",
  "Priya Nair",
  "Tomás Ribeiro",
  "Chen Wei",
  "Sofia Rossi",
  "Kwame Mensah",
  "Hannah Weber",
  "João Pereira",
  "Aisha Khan",
  "Diego Martins",
  "Yuki Tanaka",
  "Camila Duarte",
  "Noah Fischer",
];

export const FEED_CITIES: string[] = [
  "São Paulo",
  "Berlin",
  "Toronto",
  "Lisbon",
  "Singapore",
  "Milan",
  "Austin",
  "Nairobi",
  "Seoul",
  "Amsterdam",
  "Dubai",
  "Mexico City",
];

/* ------------------------------------------------------------------ */
/* Dictionary                                                          */
/* ------------------------------------------------------------------ */

const NAV_ANCHORS = ["overview", "metrics", "channels", "funnel", "live"];

export const analyticsDict: DemoDictionary<AnalyticsContent> = {
  en: {
    currency: { tag: "en-US", code: "USD" },
    nav: {
      brandTag: "Analytics OS",
      links: [
        { id: NAV_ANCHORS[0], label: "Overview" },
        { id: NAV_ANCHORS[1], label: "Metrics" },
        { id: NAV_ANCHORS[2], label: "Channels" },
        { id: NAV_ANCHORS[3], label: "Funnel" },
        { id: NAV_ANCHORS[4], label: "Live" },
      ],
      liveLabel: "Live",
      cta: "Book a demo",
    },
    header: {
      eyebrow: "Workspace / Growth",
      title: "Revenue performance",
      subtitle: "Every metric recomputes the moment you switch the range.",
      rangeLegend: "Range",
      ranges: [
        { id: "7d", label: "7 days", caption: "Rolling week", span: "T-7 → today" },
        { id: "30d", label: "30 days", caption: "Rolling month", span: "T-30 → today" },
        { id: "90d", label: "90 days", caption: "Full quarter", span: "T-90 → today" },
      ],
      updatedPrefix: "Synced",
      liveNow: "streaming",
      exportLabel: "Export",
    },
    kpis: {
      vsLabel: "vs previous period",
      tooltipPrefix: "Change",
      absoluteLabel: "Previous",
      items: [
        { id: "revenue", label: "Revenue", caption: "Gross merchandise value" },
        { id: "visitors", label: "Visitors", caption: "Unique sessions" },
        { id: "conversion", label: "Conversion", caption: "Session to order" },
        { id: "aov", label: "Avg. order value", caption: "Per completed order" },
      ],
    },
    chart: {
      title: "Signals over time",
      subtitle: "Three series, one timeline — drawn on every range switch.",
      series: [
        { id: "revenue", label: "Revenue" },
        { id: "sessions", label: "Sessions" },
        { id: "conversions", label: "Orders" },
      ],
      peakLabel: "Peak",
      avgLabel: "Average",
      axisNote: "Hover the chart to inspect any point.",
      legendHint: "Toggle a series to isolate it.",
    },
    channels: {
      title: "Traffic by channel",
      subtitle: "Where this period's demand came from.",
      items: [
        { id: "organic", label: "Organic search" },
        { id: "paid", label: "Paid ads" },
        { id: "social", label: "Social" },
        { id: "email", label: "Email" },
        { id: "referral", label: "Referral" },
        { id: "direct", label: "Direct" },
      ],
      shareLabel: "share",
      totalLabel: "Total sessions",
    },
    funnel: {
      title: "Conversion funnel",
      subtitle: "From first touch to a paid order.",
      stages: [
        { id: "sessions", label: "Sessions" },
        { id: "product", label: "Product views" },
        { id: "cart", label: "Added to cart" },
        { id: "checkout", label: "Reached checkout" },
        { id: "purchase", label: "Purchased" },
      ],
      endToEndLabel: "End-to-end",
      dropLabel: "Drop-off",
      ofPreviousLabel: "of previous stage",
      ofTopLabel: "of all sessions",
    },
    feed: {
      title: "Realtime feed",
      subtitle: "Events land the instant they happen.",
      liveLabel: "Live",
      pausedLabel: "Paused",
      pauseAction: "Pause",
      resumeAction: "Resume",
      fromLabel: "from",
      actions: [
        { id: "purchase", label: "placed an order", hasValue: true },
        { id: "upgrade", label: "upgraded to Scale", hasValue: true },
        { id: "cart", label: "added items to cart", hasValue: true },
        { id: "signup", label: "started a free trial", hasValue: false },
        { id: "review", label: "left a 5-star review", hasValue: false },
        { id: "refund", label: "requested a refund", hasValue: true },
      ],
    },
    outro: {
      eyebrow: "Insightgrid Platform",
      title: "See your growth the moment it happens.",
      body: "Warehouse-native pipelines, sub-second events and alerts your whole team can act on — without a data engineer on call.",
      points: [
        "Realtime pipelines under 400ms",
        "Warehouse-native, zero sampling",
        "Alerts that reach the whole team",
      ],
      primaryCta: "Start free trial",
      secondaryCta: "Talk to sales",
      statValue: "400ms",
      statLabel: "median event latency",
    },
    footer: {
      blurb: "The analytics workspace for teams that ship on data.",
      columns: [
        { title: "Product", links: ["Dashboards", "Pipelines", "Alerts", "Warehouse sync"] },
        { title: "Company", links: ["About", "Careers", "Customers", "Security"] },
        { title: "Resources", links: ["Docs", "Changelog", "Status", "API"] },
      ],
      socials: [
        { label: "Newsletter", glyph: "@" },
        { label: "Community", glyph: "#" },
        { label: "Blog", glyph: "/" },
      ],
      legal: "© 2026 Insightgrid Labs. All rights reserved.",
    },
  },
  pt: {
    currency: { tag: "pt-BR", code: "BRL" },
    nav: {
      brandTag: "Analytics OS",
      links: [
        { id: NAV_ANCHORS[0], label: "Visão geral" },
        { id: NAV_ANCHORS[1], label: "Métricas" },
        { id: NAV_ANCHORS[2], label: "Canais" },
        { id: NAV_ANCHORS[3], label: "Funil" },
        { id: NAV_ANCHORS[4], label: "Ao vivo" },
      ],
      liveLabel: "Ao vivo",
      cta: "Agendar demo",
    },
    header: {
      eyebrow: "Workspace / Crescimento",
      title: "Desempenho de receita",
      subtitle: "Cada métrica é recalculada no instante em que você troca o período.",
      rangeLegend: "Período",
      ranges: [
        { id: "7d", label: "7 dias", caption: "Semana móvel", span: "T-7 → hoje" },
        { id: "30d", label: "30 dias", caption: "Mês móvel", span: "T-30 → hoje" },
        { id: "90d", label: "90 dias", caption: "Trimestre", span: "T-90 → hoje" },
      ],
      updatedPrefix: "Sincronizado",
      liveNow: "transmitindo",
      exportLabel: "Exportar",
    },
    kpis: {
      vsLabel: "vs período anterior",
      tooltipPrefix: "Variação",
      absoluteLabel: "Anterior",
      items: [
        { id: "revenue", label: "Receita", caption: "Valor bruto de vendas" },
        { id: "visitors", label: "Visitantes", caption: "Sessões únicas" },
        { id: "conversion", label: "Conversão", caption: "Sessão até o pedido" },
        { id: "aov", label: "Ticket médio", caption: "Por pedido concluído" },
      ],
    },
    chart: {
      title: "Sinais ao longo do tempo",
      subtitle: "Três séries, uma linha do tempo — desenhada a cada troca de período.",
      series: [
        { id: "revenue", label: "Receita" },
        { id: "sessions", label: "Sessões" },
        { id: "conversions", label: "Pedidos" },
      ],
      peakLabel: "Pico",
      avgLabel: "Média",
      axisNote: "Passe o cursor sobre o gráfico para inspecionar qualquer ponto.",
      legendHint: "Toque em uma série para isolá-la.",
    },
    channels: {
      title: "Tráfego por canal",
      subtitle: "De onde veio a demanda deste período.",
      items: [
        { id: "organic", label: "Busca orgânica" },
        { id: "paid", label: "Anúncios pagos" },
        { id: "social", label: "Social" },
        { id: "email", label: "E-mail" },
        { id: "referral", label: "Indicação" },
        { id: "direct", label: "Direto" },
      ],
      shareLabel: "participação",
      totalLabel: "Total de sessões",
    },
    funnel: {
      title: "Funil de conversão",
      subtitle: "Do primeiro toque ao pedido pago.",
      stages: [
        { id: "sessions", label: "Sessões" },
        { id: "product", label: "Views de produto" },
        { id: "cart", label: "Adicionou ao carrinho" },
        { id: "checkout", label: "Chegou ao checkout" },
        { id: "purchase", label: "Comprou" },
      ],
      endToEndLabel: "Ponta a ponta",
      dropLabel: "Abandono",
      ofPreviousLabel: "da etapa anterior",
      ofTopLabel: "de todas as sessões",
    },
    feed: {
      title: "Feed em tempo real",
      subtitle: "Os eventos chegam no instante em que acontecem.",
      liveLabel: "Ao vivo",
      pausedLabel: "Pausado",
      pauseAction: "Pausar",
      resumeAction: "Retomar",
      fromLabel: "de",
      actions: [
        { id: "purchase", label: "fez um pedido", hasValue: true },
        { id: "upgrade", label: "migrou para o Scale", hasValue: true },
        { id: "cart", label: "adicionou itens ao carrinho", hasValue: true },
        { id: "signup", label: "iniciou um teste grátis", hasValue: false },
        { id: "review", label: "deixou uma avaliação 5 estrelas", hasValue: false },
        { id: "refund", label: "solicitou reembolso", hasValue: true },
      ],
    },
    outro: {
      eyebrow: "Plataforma Insightgrid",
      title: "Veja seu crescimento no exato momento.",
      body: "Pipelines nativos de data warehouse, eventos em menos de um segundo e alertas que o time inteiro pode acionar — sem depender de um engenheiro de dados de plantão.",
      points: [
        "Pipelines em tempo real abaixo de 400ms",
        "Nativo no warehouse, sem amostragem",
        "Alertas que chegam ao time inteiro",
      ],
      primaryCta: "Começar teste grátis",
      secondaryCta: "Falar com vendas",
      statValue: "400ms",
      statLabel: "latência mediana de evento",
    },
    footer: {
      blurb: "O workspace de analytics para times que operam com dados.",
      columns: [
        { title: "Produto", links: ["Dashboards", "Pipelines", "Alertas", "Sync do warehouse"] },
        { title: "Empresa", links: ["Sobre", "Carreiras", "Clientes", "Segurança"] },
        { title: "Recursos", links: ["Docs", "Changelog", "Status", "API"] },
      ],
      socials: [
        { label: "Newsletter", glyph: "@" },
        { label: "Comunidade", glyph: "#" },
        { label: "Blog", glyph: "/" },
      ],
      legal: "© 2026 Insightgrid Labs. Todos os direitos reservados.",
    },
  },
  es: {
    currency: { tag: "es-ES", code: "EUR" },
    nav: {
      brandTag: "Analytics OS",
      links: [
        { id: NAV_ANCHORS[0], label: "Resumen" },
        { id: NAV_ANCHORS[1], label: "Métricas" },
        { id: NAV_ANCHORS[2], label: "Canales" },
        { id: NAV_ANCHORS[3], label: "Embudo" },
        { id: NAV_ANCHORS[4], label: "En vivo" },
      ],
      liveLabel: "En vivo",
      cta: "Reservar demo",
    },
    header: {
      eyebrow: "Workspace / Crecimiento",
      title: "Rendimiento de ingresos",
      subtitle: "Cada métrica se recalcula en el instante en que cambias el periodo.",
      rangeLegend: "Periodo",
      ranges: [
        { id: "7d", label: "7 días", caption: "Semana móvil", span: "T-7 → hoy" },
        { id: "30d", label: "30 días", caption: "Mes móvil", span: "T-30 → hoy" },
        { id: "90d", label: "90 días", caption: "Trimestre", span: "T-90 → hoy" },
      ],
      updatedPrefix: "Sincronizado",
      liveNow: "transmitiendo",
      exportLabel: "Exportar",
    },
    kpis: {
      vsLabel: "vs periodo anterior",
      tooltipPrefix: "Variación",
      absoluteLabel: "Anterior",
      items: [
        { id: "revenue", label: "Ingresos", caption: "Valor bruto de ventas" },
        { id: "visitors", label: "Visitantes", caption: "Sesiones únicas" },
        { id: "conversion", label: "Conversión", caption: "De sesión a pedido" },
        { id: "aov", label: "Ticket medio", caption: "Por pedido completado" },
      ],
    },
    chart: {
      title: "Señales en el tiempo",
      subtitle: "Tres series, una línea temporal — dibujada en cada cambio de periodo.",
      series: [
        { id: "revenue", label: "Ingresos" },
        { id: "sessions", label: "Sesiones" },
        { id: "conversions", label: "Pedidos" },
      ],
      peakLabel: "Máximo",
      avgLabel: "Media",
      axisNote: "Pasa el cursor por el gráfico para inspeccionar cualquier punto.",
      legendHint: "Toca una serie para aislarla.",
    },
    channels: {
      title: "Tráfico por canal",
      subtitle: "De dónde vino la demanda de este periodo.",
      items: [
        { id: "organic", label: "Búsqueda orgánica" },
        { id: "paid", label: "Anuncios de pago" },
        { id: "social", label: "Social" },
        { id: "email", label: "Email" },
        { id: "referral", label: "Referidos" },
        { id: "direct", label: "Directo" },
      ],
      shareLabel: "cuota",
      totalLabel: "Sesiones totales",
    },
    funnel: {
      title: "Embudo de conversión",
      subtitle: "Del primer contacto al pedido pagado.",
      stages: [
        { id: "sessions", label: "Sesiones" },
        { id: "product", label: "Vistas de producto" },
        { id: "cart", label: "Añadió al carrito" },
        { id: "checkout", label: "Llegó al checkout" },
        { id: "purchase", label: "Compró" },
      ],
      endToEndLabel: "De extremo a extremo",
      dropLabel: "Abandono",
      ofPreviousLabel: "de la etapa anterior",
      ofTopLabel: "de todas las sesiones",
    },
    feed: {
      title: "Feed en tiempo real",
      subtitle: "Los eventos llegan en el instante en que ocurren.",
      liveLabel: "En vivo",
      pausedLabel: "En pausa",
      pauseAction: "Pausar",
      resumeAction: "Reanudar",
      fromLabel: "desde",
      actions: [
        { id: "purchase", label: "realizó un pedido", hasValue: true },
        { id: "upgrade", label: "cambió a Scale", hasValue: true },
        { id: "cart", label: "añadió artículos al carrito", hasValue: true },
        { id: "signup", label: "inició una prueba gratis", hasValue: false },
        { id: "review", label: "dejó una reseña de 5 estrellas", hasValue: false },
        { id: "refund", label: "solicitó un reembolso", hasValue: true },
      ],
    },
    outro: {
      eyebrow: "Plataforma Insightgrid",
      title: "Observa tu crecimiento en el momento exacto.",
      body: "Pipelines nativos de warehouse, eventos en menos de un segundo y alertas que todo el equipo puede accionar — sin depender de un ingeniero de datos de guardia.",
      points: [
        "Pipelines en tiempo real por debajo de 400ms",
        "Nativo en el warehouse, sin muestreo",
        "Alertas que llegan a todo el equipo",
      ],
      primaryCta: "Empezar prueba gratis",
      secondaryCta: "Hablar con ventas",
      statValue: "400ms",
      statLabel: "latencia mediana de evento",
    },
    footer: {
      blurb: "El workspace de analítica para equipos que operan con datos.",
      columns: [
        { title: "Producto", links: ["Dashboards", "Pipelines", "Alertas", "Sync de warehouse"] },
        { title: "Empresa", links: ["Nosotros", "Empleo", "Clientes", "Seguridad"] },
        { title: "Recursos", links: ["Docs", "Changelog", "Estado", "API"] },
      ],
      socials: [
        { label: "Newsletter", glyph: "@" },
        { label: "Comunidad", glyph: "#" },
        { label: "Blog", glyph: "/" },
      ],
      legal: "© 2026 Insightgrid Labs. Todos los derechos reservados.",
    },
  },
};
