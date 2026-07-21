import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type ViewId = "overview" | "inventory" | "orders" | "finance";

export type StockStatus = "healthy" | "low" | "critical";
export type OrderStatus =
  | "paid"
  | "processing"
  | "shipped"
  | "pending"
  | "cancelled";
export type AlertLevel = "critical" | "warning" | "info";
export type TrendDir = "up" | "down";

export interface NavContent {
  workspaceLabel: string;
  views: { id: ViewId; label: string; hint: string }[];
  searchPlaceholder: string;
  alertsLabel: string;
  commandLabel: string;
  userName: string;
  userRole: string;
  envLabel: string;
  syncedLabel: string;
}

export interface KpiContent {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: TrendDir;
  caption: string;
  /** Locale-independent sparkline magnitudes, 0-100, drawn as an SVG line. */
  spark: number[];
}

export interface ActivityItem {
  initials: string;
  actor: string;
  action: string;
  target: string;
  time: string;
}

export interface WarehouseItem {
  code: string;
  name: string;
  used: number;
  capacity: number;
  note: string;
}

export interface OverviewContent {
  title: string;
  subtitle: string;
  kpis: KpiContent[];
  activityTitle: string;
  activity: ActivityItem[];
  capacityTitle: string;
  capacitySubtitle: string;
  warehouses: WarehouseItem[];
  utilizationLabel: string;
}

export interface InventoryRow {
  sku: string;
  name: string;
  category: string;
  stock: number;
  capacity: number;
  unitPrice: string;
  status: StockStatus;
}

export interface InventoryContent {
  title: string;
  subtitle: string;
  sortByStock: string;
  sortBySku: string;
  ascLabel: string;
  descLabel: string;
  columns: {
    sku: string;
    product: string;
    category: string;
    stock: string;
    price: string;
    status: string;
  };
  statusLabels: Record<StockStatus, string>;
  unitsLabel: string;
  resultLabel: string;
}

export interface OrderRow {
  id: string;
  customer: string;
  region: string;
  items: number;
  total: string;
  status: OrderStatus;
  time: string;
}

export interface OrdersContent {
  title: string;
  subtitle: string;
  filterAll: string;
  statusLabels: Record<OrderStatus, string>;
  itemsLabel: string;
  emptyLabel: string;
  orders: OrderRow[];
  countLabel: string;
}

export interface FinanceContent {
  title: string;
  subtitle: string;
  legendRevenue: string;
  legendExpenses: string;
  series: { month: string; revenue: number; expenses: number }[];
  ticks: string[];
  summary: { label: string; value: string; delta: string; positive: boolean }[];
  breakdownTitle: string;
  breakdown: { label: string; value: string; pct: number }[];
  netLabel: string;
}

export interface AlertItem {
  id: string;
  level: AlertLevel;
  title: string;
  body: string;
  time: string;
}

export interface AlertsContent {
  title: string;
  subtitle: string;
  dismissLabel: string;
  dismissAll: string;
  emptyTitle: string;
  emptyBody: string;
  levelLabels: Record<AlertLevel, string>;
  countLabel: string;
  items: AlertItem[];
}

export interface OutroContent {
  eyebrow: string;
  title: string;
  body: string;
  bullets: { title: string; text: string }[];
  ctaPrimary: string;
  ctaSecondary: string;
  imageAlt: string;
}

export interface FooterContent {
  tagline: string;
  columns: { title: string; links: string[] }[];
  social: { icon: string; label: string }[];
  rights: string;
  status: string;
}

export interface CoreledgerContent {
  nav: NavContent;
  overview: OverviewContent;
  inventory: InventoryContent;
  orders: OrdersContent;
  finance: FinanceContent;
  alerts: AlertsContent;
  outro: OutroContent;
  footer: FooterContent;
}

/* ------------------------------------------------------------------ */
/* English (structural fallback)                                       */
/* ------------------------------------------------------------------ */

const en: CoreledgerContent = {
  nav: {
    workspaceLabel: "Workspace",
    views: [
      { id: "overview", label: "Overview", hint: "Live pulse" },
      { id: "inventory", label: "Inventory", hint: "3,412 SKUs" },
      { id: "orders", label: "Orders", hint: "312 open" },
      { id: "finance", label: "Finance", hint: "Q3 close" },
    ],
    searchPlaceholder: "Search SKUs, orders, vendors",
    alertsLabel: "Alerts",
    commandLabel: "Command menu",
    userName: "Priya Raman",
    userRole: "Operations Lead",
    envLabel: "Production",
    syncedLabel: "Synced 2s ago",
  },
  overview: {
    title: "Operations overview",
    subtitle: "Everything moving across the network, in one glance.",
    kpis: [
      {
        id: "revenue",
        label: "Revenue MTD",
        value: "$1.84M",
        delta: "+12.4%",
        trend: "up",
        caption: "vs. last month",
        spark: [38, 42, 40, 51, 49, 58, 63, 61, 72, 78, 84, 92],
      },
      {
        id: "orders",
        label: "Open orders",
        value: "312",
        delta: "+38",
        trend: "up",
        caption: "awaiting fulfillment",
        spark: [60, 55, 58, 52, 61, 57, 64, 70, 66, 74, 71, 80],
      },
      {
        id: "inventory",
        label: "Inventory value",
        value: "$4.27M",
        delta: "-2.1%",
        trend: "down",
        caption: "across 4 hubs",
        spark: [80, 78, 82, 76, 74, 77, 72, 70, 73, 68, 66, 64],
      },
      {
        id: "fulfillment",
        label: "Fulfillment rate",
        value: "98.4%",
        delta: "+0.6pt",
        trend: "up",
        caption: "on-time delivery",
        spark: [88, 90, 89, 92, 91, 94, 93, 95, 96, 95, 97, 98],
      },
    ],
    activityTitle: "Live activity",
    activity: [
      {
        initials: "MC",
        actor: "Mateus Cardoso",
        action: "approved purchase order",
        target: "PO-4471 · Titan castings",
        time: "2m",
      },
      {
        initials: "AL",
        actor: "Aisha Lawson",
        action: "flagged low stock on",
        target: "SKU CB-2049",
        time: "9m",
      },
      {
        initials: "RK",
        actor: "Rafael Klein",
        action: "shipped order",
        target: "ORD-88213 to Lisbon",
        time: "14m",
      },
      {
        initials: "SN",
        actor: "Sofia Nogueira",
        action: "closed reconciliation for",
        target: "Hub SP-01",
        time: "31m",
      },
      {
        initials: "DV",
        actor: "Diego Vargas",
        action: "updated lead time on",
        target: "vendor Nordal Steel",
        time: "48m",
      },
    ],
    capacityTitle: "Warehouse capacity",
    capacitySubtitle: "Utilization across active fulfillment hubs.",
    warehouses: [
      { code: "SP-01", name: "Sao Paulo Central", used: 8420, capacity: 10000, note: "Peak season" },
      { code: "LX-04", name: "Lisbon Docklands", used: 5210, capacity: 9000, note: "Steady" },
      { code: "NY-02", name: "Newark Gateway", used: 7680, capacity: 8000, note: "Near limit" },
      { code: "BR-07", name: "Berlin Ost", used: 3140, capacity: 8500, note: "Ramping" },
    ],
    utilizationLabel: "utilized",
  },
  inventory: {
    title: "Inventory ledger",
    subtitle: "Stock positions synced live from every hub.",
    sortByStock: "Stock level",
    sortBySku: "SKU",
    ascLabel: "ascending",
    descLabel: "descending",
    columns: {
      sku: "SKU",
      product: "Product",
      category: "Category",
      stock: "Stock",
      price: "Unit price",
      status: "Status",
    },
    statusLabels: {
      healthy: "Healthy",
      low: "Low",
      critical: "Critical",
    },
    unitsLabel: "units",
    resultLabel: "SKUs shown",
  },
  orders: {
    title: "Order stream",
    subtitle: "Filter the live queue by fulfillment status.",
    filterAll: "All",
    statusLabels: {
      paid: "Paid",
      processing: "Processing",
      shipped: "Shipped",
      pending: "Pending",
      cancelled: "Cancelled",
    },
    itemsLabel: "items",
    emptyLabel: "No orders match this filter.",
    orders: [
      { id: "ORD-88213", customer: "Larsson Retail", region: "Lisbon", items: 24, total: "$18,420", status: "shipped", time: "14m" },
      { id: "ORD-88210", customer: "Meridian Supply", region: "Sao Paulo", items: 8, total: "$4,190", status: "paid", time: "26m" },
      { id: "ORD-88207", customer: "Grove & Vale", region: "Berlin", items: 15, total: "$9,860", status: "processing", time: "41m" },
      { id: "ORD-88204", customer: "Northwind Depot", region: "Newark", items: 3, total: "$1,240", status: "pending", time: "58m" },
      { id: "ORD-88201", customer: "Ateliê Boreal", region: "Sao Paulo", items: 32, total: "$27,510", status: "paid", time: "1h" },
      { id: "ORD-88198", customer: "Hansa Logistics", region: "Berlin", items: 6, total: "$3,300", status: "cancelled", time: "2h" },
      { id: "ORD-88195", customer: "Cedar Works Co.", region: "Newark", items: 19, total: "$12,740", status: "shipped", time: "3h" },
    ],
    countLabel: "orders in queue",
  },
  finance: {
    title: "Finance signals",
    subtitle: "Revenue against operating cost, trailing eight months.",
    legendRevenue: "Revenue",
    legendExpenses: "Operating cost",
    series: [
      { month: "Dec", revenue: 128, expenses: 92 },
      { month: "Jan", revenue: 142, expenses: 96 },
      { month: "Feb", revenue: 136, expenses: 101 },
      { month: "Mar", revenue: 158, expenses: 104 },
      { month: "Apr", revenue: 171, expenses: 110 },
      { month: "May", revenue: 165, expenses: 108 },
      { month: "Jun", revenue: 189, expenses: 118 },
      { month: "Jul", revenue: 204, expenses: 121 },
    ],
    ticks: ["$2.0M", "$1.5M", "$1.0M", "$0.5M", "$0"],
    summary: [
      { label: "Net margin", value: "40.7%", delta: "+3.2pt", positive: true },
      { label: "Cash position", value: "$6.9M", delta: "+$820K", positive: true },
      { label: "Cost ratio", value: "59.3%", delta: "-1.4pt", positive: true },
    ],
    breakdownTitle: "Cost breakdown",
    breakdown: [
      { label: "Procurement", value: "$742K", pct: 46 },
      { label: "Logistics", value: "$388K", pct: 24 },
      { label: "Payroll", value: "$305K", pct: 19 },
      { label: "Facilities", value: "$177K", pct: 11 },
    ],
    netLabel: "Trailing revenue",
  },
  alerts: {
    title: "Alerts",
    subtitle: "Operational signals that need a decision.",
    dismissLabel: "Dismiss",
    dismissAll: "Clear all",
    emptyTitle: "All clear",
    emptyBody: "No open alerts. The network is running clean.",
    levelLabels: {
      critical: "Critical",
      warning: "Warning",
      info: "Info",
    },
    countLabel: "open",
    items: [
      {
        id: "al-1",
        level: "critical",
        title: "Stockout risk on CB-2049",
        body: "Cast bracket falls below safety stock in 2 days at current burn.",
        time: "6m",
      },
      {
        id: "al-2",
        level: "warning",
        title: "Newark hub near capacity",
        body: "NY-02 at 96% utilization. Rebalance inbound to Berlin Ost.",
        time: "22m",
      },
      {
        id: "al-3",
        level: "warning",
        title: "Vendor lead time slipping",
        body: "Nordal Steel lead time rose from 9 to 14 days this week.",
        time: "1h",
      },
      {
        id: "al-4",
        level: "info",
        title: "Reconciliation ready",
        body: "Hub SP-01 ledger matched and ready for month-end close.",
        time: "3h",
      },
    ],
  },
  outro: {
    eyebrow: "Coreledger platform",
    title: "One control room for every moving part of operations",
    body: "From the warehouse floor to the ledger, Coreledger keeps inventory, orders and finance in a single source of truth that your whole team can trust.",
    bullets: [
      { title: "Real-time sync", text: "Every hub, order and invoice reconciled within seconds." },
      { title: "Signal, not noise", text: "Alerts that surface the decision, not just the data." },
      { title: "Audit-ready", text: "Immutable ledger with full lineage on every transaction." },
    ],
    ctaPrimary: "Request a demo",
    ctaSecondary: "Read the docs",
    imageAlt: "Operations team planning logistics on a whiteboard",
  },
  footer: {
    tagline: "The operations command center for modern supply chains.",
    columns: [
      { title: "Platform", links: ["Inventory", "Orders", "Finance", "Analytics"] },
      { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
      { title: "Resources", links: ["Docs", "API", "Status", "Security"] },
    ],
    social: [
      { icon: "globe", label: "coreledger.io" },
      { icon: "at", label: "hello@coreledger.io" },
      { icon: "message", label: "Support" },
    ],
    rights: "Coreledger. A VigApp concept. All rights reserved.",
    status: "All systems operational",
  },
};

/* ------------------------------------------------------------------ */
/* Portuguese                                                          */
/* ------------------------------------------------------------------ */

const pt: CoreledgerContent = {
  nav: {
    workspaceLabel: "Area de trabalho",
    views: [
      { id: "overview", label: "Visao geral", hint: "Pulso ao vivo" },
      { id: "inventory", label: "Estoque", hint: "3.412 SKUs" },
      { id: "orders", label: "Pedidos", hint: "312 abertos" },
      { id: "finance", label: "Financas", hint: "Fecho T3" },
    ],
    searchPlaceholder: "Buscar SKUs, pedidos, fornecedores",
    alertsLabel: "Alertas",
    commandLabel: "Menu de comandos",
    userName: "Priya Raman",
    userRole: "Lider de Operacoes",
    envLabel: "Producao",
    syncedLabel: "Sincronizado ha 2s",
  },
  overview: {
    title: "Visao geral das operacoes",
    subtitle: "Tudo o que se move na rede, num so olhar.",
    kpis: [
      {
        id: "revenue",
        label: "Receita no mes",
        value: "R$ 9,2 mi",
        delta: "+12,4%",
        trend: "up",
        caption: "vs. mes anterior",
        spark: [38, 42, 40, 51, 49, 58, 63, 61, 72, 78, 84, 92],
      },
      {
        id: "orders",
        label: "Pedidos abertos",
        value: "312",
        delta: "+38",
        trend: "up",
        caption: "aguardando envio",
        spark: [60, 55, 58, 52, 61, 57, 64, 70, 66, 74, 71, 80],
      },
      {
        id: "inventory",
        label: "Valor em estoque",
        value: "R$ 21,4 mi",
        delta: "-2,1%",
        trend: "down",
        caption: "em 4 centros",
        spark: [80, 78, 82, 76, 74, 77, 72, 70, 73, 68, 66, 64],
      },
      {
        id: "fulfillment",
        label: "Taxa de entrega",
        value: "98,4%",
        delta: "+0,6pt",
        trend: "up",
        caption: "no prazo",
        spark: [88, 90, 89, 92, 91, 94, 93, 95, 96, 95, 97, 98],
      },
    ],
    activityTitle: "Atividade ao vivo",
    activity: [
      {
        initials: "MC",
        actor: "Mateus Cardoso",
        action: "aprovou a ordem de compra",
        target: "PO-4471 · Fundidos Titan",
        time: "2m",
      },
      {
        initials: "AL",
        actor: "Aisha Lawson",
        action: "sinalizou estoque baixo em",
        target: "SKU CB-2049",
        time: "9m",
      },
      {
        initials: "RK",
        actor: "Rafael Klein",
        action: "despachou o pedido",
        target: "ORD-88213 para Lisboa",
        time: "14m",
      },
      {
        initials: "SN",
        actor: "Sofia Nogueira",
        action: "fechou a conciliacao do",
        target: "Centro SP-01",
        time: "31m",
      },
      {
        initials: "DV",
        actor: "Diego Vargas",
        action: "atualizou o prazo do",
        target: "fornecedor Nordal Steel",
        time: "48m",
      },
    ],
    capacityTitle: "Capacidade dos armazens",
    capacitySubtitle: "Ocupacao dos centros de distribuicao ativos.",
    warehouses: [
      { code: "SP-01", name: "Sao Paulo Central", used: 8420, capacity: 10000, note: "Alta temporada" },
      { code: "LX-04", name: "Lisboa Docklands", used: 5210, capacity: 9000, note: "Estavel" },
      { code: "NY-02", name: "Newark Gateway", used: 7680, capacity: 8000, note: "Perto do limite" },
      { code: "BR-07", name: "Berlim Leste", used: 3140, capacity: 8500, note: "Em expansao" },
    ],
    utilizationLabel: "ocupado",
  },
  inventory: {
    title: "Livro de estoque",
    subtitle: "Posicoes de estoque sincronizadas ao vivo de cada centro.",
    sortByStock: "Nivel de estoque",
    sortBySku: "SKU",
    ascLabel: "crescente",
    descLabel: "decrescente",
    columns: {
      sku: "SKU",
      product: "Produto",
      category: "Categoria",
      stock: "Estoque",
      price: "Preco unitario",
      status: "Situacao",
    },
    statusLabels: {
      healthy: "Saudavel",
      low: "Baixo",
      critical: "Critico",
    },
    unitsLabel: "unidades",
    resultLabel: "SKUs exibidos",
  },
  orders: {
    title: "Fluxo de pedidos",
    subtitle: "Filtre a fila ao vivo por situacao de envio.",
    filterAll: "Todos",
    statusLabels: {
      paid: "Pago",
      processing: "Processando",
      shipped: "Enviado",
      pending: "Pendente",
      cancelled: "Cancelado",
    },
    itemsLabel: "itens",
    emptyLabel: "Nenhum pedido corresponde a este filtro.",
    orders: [
      { id: "ORD-88213", customer: "Larsson Retail", region: "Lisboa", items: 24, total: "R$ 92.100", status: "shipped", time: "14m" },
      { id: "ORD-88210", customer: "Meridian Supply", region: "Sao Paulo", items: 8, total: "R$ 20.950", status: "paid", time: "26m" },
      { id: "ORD-88207", customer: "Grove & Vale", region: "Berlim", items: 15, total: "R$ 49.300", status: "processing", time: "41m" },
      { id: "ORD-88204", customer: "Northwind Depot", region: "Newark", items: 3, total: "R$ 6.200", status: "pending", time: "58m" },
      { id: "ORD-88201", customer: "Ateliê Boreal", region: "Sao Paulo", items: 32, total: "R$ 137.550", status: "paid", time: "1h" },
      { id: "ORD-88198", customer: "Hansa Logistics", region: "Berlim", items: 6, total: "R$ 16.500", status: "cancelled", time: "2h" },
      { id: "ORD-88195", customer: "Cedar Works Co.", region: "Newark", items: 19, total: "R$ 63.700", status: "shipped", time: "3h" },
    ],
    countLabel: "pedidos na fila",
  },
  finance: {
    title: "Sinais financeiros",
    subtitle: "Receita frente ao custo operacional, ultimos oito meses.",
    legendRevenue: "Receita",
    legendExpenses: "Custo operacional",
    series: [
      { month: "Dez", revenue: 128, expenses: 92 },
      { month: "Jan", revenue: 142, expenses: 96 },
      { month: "Fev", revenue: 136, expenses: 101 },
      { month: "Mar", revenue: 158, expenses: 104 },
      { month: "Abr", revenue: 171, expenses: 110 },
      { month: "Mai", revenue: 165, expenses: 108 },
      { month: "Jun", revenue: 189, expenses: 118 },
      { month: "Jul", revenue: 204, expenses: 121 },
    ],
    ticks: ["R$ 10 mi", "R$ 7,5 mi", "R$ 5 mi", "R$ 2,5 mi", "R$ 0"],
    summary: [
      { label: "Margem liquida", value: "40,7%", delta: "+3,2pt", positive: true },
      { label: "Posicao de caixa", value: "R$ 34,5 mi", delta: "+R$ 4,1 mi", positive: true },
      { label: "Indice de custo", value: "59,3%", delta: "-1,4pt", positive: true },
    ],
    breakdownTitle: "Composicao de custos",
    breakdown: [
      { label: "Compras", value: "R$ 3,7 mi", pct: 46 },
      { label: "Logistica", value: "R$ 1,9 mi", pct: 24 },
      { label: "Folha", value: "R$ 1,5 mi", pct: 19 },
      { label: "Instalacoes", value: "R$ 885 mil", pct: 11 },
    ],
    netLabel: "Receita acumulada",
  },
  alerts: {
    title: "Alertas",
    subtitle: "Sinais operacionais que exigem uma decisao.",
    dismissLabel: "Dispensar",
    dismissAll: "Limpar tudo",
    emptyTitle: "Tudo certo",
    emptyBody: "Nenhum alerta aberto. A rede esta rodando limpa.",
    levelLabels: {
      critical: "Critico",
      warning: "Atencao",
      info: "Info",
    },
    countLabel: "abertos",
    items: [
      {
        id: "al-1",
        level: "critical",
        title: "Risco de ruptura no CB-2049",
        body: "O suporte fundido fica abaixo do estoque de seguranca em 2 dias no ritmo atual.",
        time: "6m",
      },
      {
        id: "al-2",
        level: "warning",
        title: "Centro de Newark perto do limite",
        body: "NY-02 com 96% de ocupacao. Redistribua a entrada para Berlim Leste.",
        time: "22m",
      },
      {
        id: "al-3",
        level: "warning",
        title: "Prazo do fornecedor aumentando",
        body: "O prazo da Nordal Steel subiu de 9 para 14 dias nesta semana.",
        time: "1h",
      },
      {
        id: "al-4",
        level: "info",
        title: "Conciliacao pronta",
        body: "O livro do centro SP-01 foi conciliado e esta pronto para o fecho do mes.",
        time: "3h",
      },
    ],
  },
  outro: {
    eyebrow: "Plataforma Coreledger",
    title: "Uma sala de controle para cada parte das operacoes",
    body: "Do chao do armazem ate o livro-razao, o Coreledger mantem estoque, pedidos e financas numa unica fonte de verdade em que toda a equipe pode confiar.",
    bullets: [
      { title: "Sincronia em tempo real", text: "Cada centro, pedido e nota conciliados em segundos." },
      { title: "Sinal, nao ruido", text: "Alertas que revelam a decisao, nao apenas o dado." },
      { title: "Pronto para auditoria", text: "Livro imutavel com rastreabilidade total de cada transacao." },
    ],
    ctaPrimary: "Solicitar demonstracao",
    ctaSecondary: "Ver a documentacao",
    imageAlt: "Equipe de operacoes planejando logistica num quadro branco",
  },
  footer: {
    tagline: "O centro de comando de operacoes para cadeias de suprimento modernas.",
    columns: [
      { title: "Plataforma", links: ["Estoque", "Pedidos", "Financas", "Analytics"] },
      { title: "Empresa", links: ["Sobre", "Carreiras", "Imprensa", "Contato"] },
      { title: "Recursos", links: ["Docs", "API", "Status", "Seguranca"] },
    ],
    social: [
      { icon: "globe", label: "coreledger.io" },
      { icon: "at", label: "ola@coreledger.io" },
      { icon: "message", label: "Suporte" },
    ],
    rights: "Coreledger. Um conceito VigApp. Todos os direitos reservados.",
    status: "Todos os sistemas operacionais",
  },
};

/* ------------------------------------------------------------------ */
/* Spanish                                                             */
/* ------------------------------------------------------------------ */

const es: CoreledgerContent = {
  nav: {
    workspaceLabel: "Espacio de trabajo",
    views: [
      { id: "overview", label: "Resumen", hint: "Pulso en vivo" },
      { id: "inventory", label: "Inventario", hint: "3.412 SKUs" },
      { id: "orders", label: "Pedidos", hint: "312 abiertos" },
      { id: "finance", label: "Finanzas", hint: "Cierre T3" },
    ],
    searchPlaceholder: "Buscar SKUs, pedidos, proveedores",
    alertsLabel: "Alertas",
    commandLabel: "Menu de comandos",
    userName: "Priya Raman",
    userRole: "Lider de Operaciones",
    envLabel: "Produccion",
    syncedLabel: "Sincronizado hace 2s",
  },
  overview: {
    title: "Resumen de operaciones",
    subtitle: "Todo lo que se mueve en la red, de un vistazo.",
    kpis: [
      {
        id: "revenue",
        label: "Ingresos del mes",
        value: "1,68 M €",
        delta: "+12,4%",
        trend: "up",
        caption: "vs. mes anterior",
        spark: [38, 42, 40, 51, 49, 58, 63, 61, 72, 78, 84, 92],
      },
      {
        id: "orders",
        label: "Pedidos abiertos",
        value: "312",
        delta: "+38",
        trend: "up",
        caption: "en espera de envio",
        spark: [60, 55, 58, 52, 61, 57, 64, 70, 66, 74, 71, 80],
      },
      {
        id: "inventory",
        label: "Valor de inventario",
        value: "3,89 M €",
        delta: "-2,1%",
        trend: "down",
        caption: "en 4 centros",
        spark: [80, 78, 82, 76, 74, 77, 72, 70, 73, 68, 66, 64],
      },
      {
        id: "fulfillment",
        label: "Tasa de entrega",
        value: "98,4%",
        delta: "+0,6pt",
        trend: "up",
        caption: "a tiempo",
        spark: [88, 90, 89, 92, 91, 94, 93, 95, 96, 95, 97, 98],
      },
    ],
    activityTitle: "Actividad en vivo",
    activity: [
      {
        initials: "MC",
        actor: "Mateus Cardoso",
        action: "aprobo la orden de compra",
        target: "PO-4471 · Fundidos Titan",
        time: "2m",
      },
      {
        initials: "AL",
        actor: "Aisha Lawson",
        action: "marco stock bajo en",
        target: "SKU CB-2049",
        time: "9m",
      },
      {
        initials: "RK",
        actor: "Rafael Klein",
        action: "despacho el pedido",
        target: "ORD-88213 a Lisboa",
        time: "14m",
      },
      {
        initials: "SN",
        actor: "Sofia Nogueira",
        action: "cerro la conciliacion de",
        target: "Centro SP-01",
        time: "31m",
      },
      {
        initials: "DV",
        actor: "Diego Vargas",
        action: "actualizo el plazo de",
        target: "proveedor Nordal Steel",
        time: "48m",
      },
    ],
    capacityTitle: "Capacidad de almacenes",
    capacitySubtitle: "Ocupacion de los centros de distribucion activos.",
    warehouses: [
      { code: "SP-01", name: "Sao Paulo Central", used: 8420, capacity: 10000, note: "Temporada alta" },
      { code: "LX-04", name: "Lisboa Docklands", used: 5210, capacity: 9000, note: "Estable" },
      { code: "NY-02", name: "Newark Gateway", used: 7680, capacity: 8000, note: "Cerca del limite" },
      { code: "BR-07", name: "Berlin Este", used: 3140, capacity: 8500, note: "En expansion" },
    ],
    utilizationLabel: "ocupado",
  },
  inventory: {
    title: "Libro de inventario",
    subtitle: "Posiciones de stock sincronizadas en vivo desde cada centro.",
    sortByStock: "Nivel de stock",
    sortBySku: "SKU",
    ascLabel: "ascendente",
    descLabel: "descendente",
    columns: {
      sku: "SKU",
      product: "Producto",
      category: "Categoria",
      stock: "Stock",
      price: "Precio unitario",
      status: "Estado",
    },
    statusLabels: {
      healthy: "Saludable",
      low: "Bajo",
      critical: "Critico",
    },
    unitsLabel: "unidades",
    resultLabel: "SKUs mostrados",
  },
  orders: {
    title: "Flujo de pedidos",
    subtitle: "Filtra la cola en vivo por estado de envio.",
    filterAll: "Todos",
    statusLabels: {
      paid: "Pagado",
      processing: "Procesando",
      shipped: "Enviado",
      pending: "Pendiente",
      cancelled: "Cancelado",
    },
    itemsLabel: "articulos",
    emptyLabel: "Ningun pedido coincide con este filtro.",
    orders: [
      { id: "ORD-88213", customer: "Larsson Retail", region: "Lisboa", items: 24, total: "16.980 €", status: "shipped", time: "14m" },
      { id: "ORD-88210", customer: "Meridian Supply", region: "Sao Paulo", items: 8, total: "3.860 €", status: "paid", time: "26m" },
      { id: "ORD-88207", customer: "Grove & Vale", region: "Berlin", items: 15, total: "9.080 €", status: "processing", time: "41m" },
      { id: "ORD-88204", customer: "Northwind Depot", region: "Newark", items: 3, total: "1.140 €", status: "pending", time: "58m" },
      { id: "ORD-88201", customer: "Ateliê Boreal", region: "Sao Paulo", items: 32, total: "25.350 €", status: "paid", time: "1h" },
      { id: "ORD-88198", customer: "Hansa Logistics", region: "Berlin", items: 6, total: "3.040 €", status: "cancelled", time: "2h" },
      { id: "ORD-88195", customer: "Cedar Works Co.", region: "Newark", items: 19, total: "11.740 €", status: "shipped", time: "3h" },
    ],
    countLabel: "pedidos en cola",
  },
  finance: {
    title: "Senales financieras",
    subtitle: "Ingresos frente al costo operativo, ultimos ocho meses.",
    legendRevenue: "Ingresos",
    legendExpenses: "Costo operativo",
    series: [
      { month: "Dic", revenue: 128, expenses: 92 },
      { month: "Ene", revenue: 142, expenses: 96 },
      { month: "Feb", revenue: 136, expenses: 101 },
      { month: "Mar", revenue: 158, expenses: 104 },
      { month: "Abr", revenue: 171, expenses: 110 },
      { month: "May", revenue: 165, expenses: 108 },
      { month: "Jun", revenue: 189, expenses: 118 },
      { month: "Jul", revenue: 204, expenses: 121 },
    ],
    ticks: ["1,8 M €", "1,35 M €", "0,9 M €", "0,45 M €", "0 €"],
    summary: [
      { label: "Margen neto", value: "40,7%", delta: "+3,2pt", positive: true },
      { label: "Posicion de caja", value: "6,3 M €", delta: "+750 K €", positive: true },
      { label: "Ratio de costo", value: "59,3%", delta: "-1,4pt", positive: true },
    ],
    breakdownTitle: "Desglose de costos",
    breakdown: [
      { label: "Compras", value: "678 K €", pct: 46 },
      { label: "Logistica", value: "354 K €", pct: 24 },
      { label: "Nomina", value: "279 K €", pct: 19 },
      { label: "Instalaciones", value: "162 K €", pct: 11 },
    ],
    netLabel: "Ingresos acumulados",
  },
  alerts: {
    title: "Alertas",
    subtitle: "Senales operativas que necesitan una decision.",
    dismissLabel: "Descartar",
    dismissAll: "Limpiar todo",
    emptyTitle: "Todo en orden",
    emptyBody: "No hay alertas abiertas. La red funciona limpia.",
    levelLabels: {
      critical: "Critico",
      warning: "Aviso",
      info: "Info",
    },
    countLabel: "abiertas",
    items: [
      {
        id: "al-1",
        level: "critical",
        title: "Riesgo de rotura en CB-2049",
        body: "El soporte fundido cae por debajo del stock de seguridad en 2 dias al ritmo actual.",
        time: "6m",
      },
      {
        id: "al-2",
        level: "warning",
        title: "Centro de Newark cerca del limite",
        body: "NY-02 al 96% de ocupacion. Redistribuye la entrada a Berlin Este.",
        time: "22m",
      },
      {
        id: "al-3",
        level: "warning",
        title: "Plazo del proveedor en aumento",
        body: "El plazo de Nordal Steel subio de 9 a 14 dias esta semana.",
        time: "1h",
      },
      {
        id: "al-4",
        level: "info",
        title: "Conciliacion lista",
        body: "El libro del centro SP-01 quedo conciliado y listo para el cierre de mes.",
        time: "3h",
      },
    ],
  },
  outro: {
    eyebrow: "Plataforma Coreledger",
    title: "Una sala de control para cada parte de las operaciones",
    body: "Desde el piso del almacen hasta el libro mayor, Coreledger mantiene inventario, pedidos y finanzas en una unica fuente de verdad en la que todo el equipo puede confiar.",
    bullets: [
      { title: "Sincronia en tiempo real", text: "Cada centro, pedido y factura conciliados en segundos." },
      { title: "Senal, no ruido", text: "Alertas que revelan la decision, no solo el dato." },
      { title: "Listo para auditoria", text: "Libro inmutable con trazabilidad total en cada transaccion." },
    ],
    ctaPrimary: "Solicitar demo",
    ctaSecondary: "Ver la documentacion",
    imageAlt: "Equipo de operaciones planificando logistica en una pizarra",
  },
  footer: {
    tagline: "El centro de comando de operaciones para cadenas de suministro modernas.",
    columns: [
      { title: "Plataforma", links: ["Inventario", "Pedidos", "Finanzas", "Analytics"] },
      { title: "Empresa", links: ["Nosotros", "Empleo", "Prensa", "Contacto"] },
      { title: "Recursos", links: ["Docs", "API", "Estado", "Seguridad"] },
    ],
    social: [
      { icon: "globe", label: "coreledger.io" },
      { icon: "at", label: "hola@coreledger.io" },
      { icon: "message", label: "Soporte" },
    ],
    rights: "Coreledger. Un concepto de VigApp. Todos los derechos reservados.",
    status: "Todos los sistemas operativos",
  },
};

/* ------------------------------------------------------------------ */
/* Locale-independent structural data (numbers, SKUs, proper nouns)    */
/* Shared across locales; only status/category labels are localized.   */
/* ------------------------------------------------------------------ */

export interface InventoryRecord {
  sku: string;
  name: string;
  categoryId: CategoryId;
  stock: number;
  capacity: number;
  status: StockStatus;
  price: { en: string; pt: string; es: string };
}

export type CategoryId =
  | "castings"
  | "fasteners"
  | "electronics"
  | "polymers"
  | "tooling";

export const CATEGORY_LABELS: Record<CategoryId, { en: string; pt: string; es: string }> = {
  castings: { en: "Castings", pt: "Fundidos", es: "Fundidos" },
  fasteners: { en: "Fasteners", pt: "Fixadores", es: "Fijaciones" },
  electronics: { en: "Electronics", pt: "Eletronicos", es: "Electronica" },
  polymers: { en: "Polymers", pt: "Polimeros", es: "Polimeros" },
  tooling: { en: "Tooling", pt: "Ferramental", es: "Herramental" },
};

export const INVENTORY_RECORDS: InventoryRecord[] = [
  {
    sku: "CB-2049",
    name: "Titan cast bracket",
    categoryId: "castings",
    stock: 42,
    capacity: 900,
    status: "critical",
    price: { en: "$18.40", pt: "R$ 92,00", es: "16,80 €" },
  },
  {
    sku: "FS-1180",
    name: "M8 flange bolt (500pk)",
    categoryId: "fasteners",
    stock: 210,
    capacity: 1200,
    status: "low",
    price: { en: "$42.00", pt: "R$ 210,00", es: "38,50 €" },
  },
  {
    sku: "EL-7742",
    name: "Sensor hub board v3",
    categoryId: "electronics",
    stock: 640,
    capacity: 800,
    status: "healthy",
    price: { en: "$96.20", pt: "R$ 480,00", es: "88,00 €" },
  },
  {
    sku: "PL-3301",
    name: "ABS resin pellets 25kg",
    categoryId: "polymers",
    stock: 128,
    capacity: 600,
    status: "low",
    price: { en: "$61.00", pt: "R$ 305,00", es: "55,80 €" },
  },
  {
    sku: "TL-5520",
    name: "Carbide end mill set",
    categoryId: "tooling",
    stock: 780,
    capacity: 850,
    status: "healthy",
    price: { en: "$134.90", pt: "R$ 674,00", es: "123,50 €" },
  },
  {
    sku: "CB-2071",
    name: "Aluminum housing shell",
    categoryId: "castings",
    stock: 55,
    capacity: 700,
    status: "critical",
    price: { en: "$27.30", pt: "R$ 136,00", es: "24,90 €" },
  },
  {
    sku: "EL-7810",
    name: "Power relay module",
    categoryId: "electronics",
    stock: 512,
    capacity: 900,
    status: "healthy",
    price: { en: "$22.75", pt: "R$ 113,00", es: "20,80 €" },
  },
  {
    sku: "FS-1204",
    name: "Stainless washer (1k)",
    categoryId: "fasteners",
    stock: 940,
    capacity: 1000,
    status: "healthy",
    price: { en: "$14.20", pt: "R$ 71,00", es: "13,00 €" },
  },
];

/* ------------------------------------------------------------------ */

export const coreledgerDict: DemoDictionary<CoreledgerContent> = { en, pt, es };
