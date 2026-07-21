import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type ChangeType = "feature" | "fix" | "improvement";
export type ChangeFilter = "all" | ChangeType;
export type TerminalTabId = "deploy" | "rollback" | "logs";
export type TerminalLineKind = "ok" | "warn" | "info" | "dim";

export interface NavContent {
  links: { href: string; label: string }[];
  cta: string;
  openMenu: string;
  closeMenu: string;
}

export interface WaitlistCopy {
  emailLabel: string;
  placeholder: string;
  button: string;
  invalid: string;
  successTitle: string;
  successBody: string;
  positionLabel: string;
  reset: string;
}

export interface HeroContent {
  badge: string;
  titleTop: string;
  titleAccent: string;
  sub: string;
  assurances: string[];
  form: WaitlistCopy;
  scrollCue: string;
}

export interface FeatureStep {
  id: string;
  kicker: string;
  title: string;
  body: string;
  bullets: string[];
}

export interface PreviewMockCopy {
  windowTitle: string;
  heading: string;
  ready: string;
  building: string;
  open: string;
  rows: { branch: string; author: string; time: string; building?: boolean }[];
}

export interface TimelineMockCopy {
  windowTitle: string;
  heading: string;
  alert: string;
  action: string;
  restored: string;
  rows: { version: string; label: string; tone: "live" | "ok" | "bad" }[];
}

export interface TracesMockCopy {
  windowTitle: string;
  heading: string;
  metricLabel: string;
  alertText: string;
  action: string;
  tracedLabel: string;
}

export interface TourContent {
  label: string;
  title: string;
  intro: string;
  stepAria: string;
  steps: FeatureStep[];
  previewMock: PreviewMockCopy;
  timelineMock: TimelineMockCopy;
  tracesMock: TracesMockCopy;
}

export interface TerminalLine {
  kind: TerminalLineKind;
  text: string;
}

export interface TerminalTab {
  id: TerminalTabId;
  label: string;
  command: string;
  lines: TerminalLine[];
}

export interface TerminalContent {
  label: string;
  title: string;
  intro: string;
  tabsAria: string;
  copy: string;
  copied: string;
  tabs: TerminalTab[];
}

export interface MetricItem {
  value: number;
  decimals: number;
  suffix: string;
  label: string;
}

export interface MetricsContent {
  label: string;
  title: string;
  footnote: string;
  items: MetricItem[];
}

export interface ChangelogEntry {
  version: string;
  date: string;
  type: ChangeType;
  title: string;
  body: string;
}

export interface ChangelogContent {
  label: string;
  title: string;
  intro: string;
  filterAria: string;
  filters: { id: ChangeFilter; label: string }[];
  typeLabels: Record<ChangeType, string>;
  empty: string;
  entries: ChangelogEntry[];
}

export interface BackedByContent {
  label: string;
  title: string;
  investors: string[];
  quote: { text: string; name: string; role: string };
  note: string;
}

export interface CtaContent {
  kicker: string;
  title: string;
  sub: string;
  priceNote: string;
  perks: string[];
  form: WaitlistCopy;
}

export interface FooterContent {
  tagline: string;
  columns: { title: string; links: { href: string; label: string }[] }[];
  social: { label: string }[];
  status: string;
  legal: string;
  copyright: string;
}

export interface NebulaContent {
  numberLocale: string;
  nav: NavContent;
  hero: HeroContent;
  tour: TourContent;
  terminal: TerminalContent;
  metrics: MetricsContent;
  changelog: ChangelogContent;
  backedBy: BackedByContent;
  cta: CtaContent;
  footer: FooterContent;
}

/* ------------------------------------------------------------------ */
/* English                                                             */
/* ------------------------------------------------------------------ */

const en: NebulaContent = {
  numberLocale: "en-US",
  nav: {
    links: [
      { href: "#product", label: "Product" },
      { href: "#terminal", label: "Terminal" },
      { href: "#changelog", label: "Changelog" },
      { href: "#investors", label: "Investors" },
    ],
    cta: "Join the waitlist",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    badge: "Private beta · Series A led by Northline Capital",
    titleTop: "Ship with",
    titleAccent: "escape velocity.",
    sub: "Nebula gives every commit a live preview, every release a one-keystroke rollback, and every engineer X-ray vision into production. Zero YAML. Zero fear.",
    assurances: ["Free during beta", "2-minute setup", "No credit card"],
    form: {
      emailLabel: "Work email",
      placeholder: "you@company.com",
      button: "Join the waitlist",
      invalid: "That does not look like a valid email. Try your work address.",
      successTitle: "You are on the list.",
      successBody:
        "We onboard a new cohort every Thursday, strictly in order. Your invite lands the moment your number comes up.",
      positionLabel: "Place in line",
      reset: "Use a different email",
    },
    scrollCue: "Scroll to explore",
  },
  tour: {
    label: "Product",
    title: "From commit to confidence",
    intro:
      "Three obsessions, engineered end to end. Scroll through what your pipeline feels like once it finally gets out of the way.",
    stepAria: "Show feature",
    steps: [
      {
        id: "previews",
        kicker: "Preview",
        title: "A living URL for every branch",
        body: "Open a pull request and Nebula builds an isolated, production-parity environment in about forty seconds. Share the link, not a screenshot.",
        bullets: [
          "Production-parity data, masked automatically",
          "Review comments pinned to the exact commit",
          "Idle environments hibernate to zero cost",
        ],
      },
      {
        id: "rollbacks",
        kicker: "Rollback",
        title: "Undo production like a typo",
        body: "Every release is an immutable snapshot. When a golden signal dips, one keystroke returns global traffic to the last healthy build in under ten seconds.",
        bullets: [
          "Traffic shifts back edge-first, region by region",
          "Schema changes guarded by shadow writes",
          "The incident timeline writes itself",
        ],
      },
      {
        id: "observe",
        kicker: "Observe",
        title: "See the anomaly before the pager does",
        body: "Nebula watches latency, errors and saturation per deploy, then correlates every spike to the exact diff that caused it. The culprit line, not just the culprit service.",
        bullets: [
          "Per-deploy latency and error budgets",
          "Alerts routed to the code owner, not a channel",
          "One click from anomaly to offending commit",
        ],
      },
    ],
    previewMock: {
      windowTitle: "nebula-pr-512.preview.nebulalabs.dev",
      heading: "Preview deployments",
      ready: "Ready",
      building: "Building",
      open: "Open preview",
      rows: [
        { branch: "feat/checkout-v2", author: "Luana Ferreira", time: "38s" },
        { branch: "fix/cart-race-condition", author: "Dmitri Volkov", time: "41s" },
        { branch: "chore/upgrade-node-22", author: "Aisha Bello", time: "12s", building: true },
      ],
    },
    timelineMock: {
      windowTitle: "nebulalabs.dev/releases",
      heading: "Release timeline",
      alert: "Error rate +212% on v2.14.1",
      action: "Roll back to v2.14.0",
      restored: "Traffic restored to v2.14.0 in 9.4s",
      rows: [
        { version: "v2.14.1", label: "Live · error budget burning", tone: "bad" },
        { version: "v2.14.0", label: "Last healthy release", tone: "ok" },
        { version: "v2.13.9", label: "Stable for 6 days", tone: "ok" },
      ],
    },
    tracesMock: {
      windowTitle: "nebulalabs.dev/observe/checkout-api",
      heading: "checkout-api · production",
      metricLabel: "p95 latency, last 30 minutes",
      alertText: "p95 +38% after deploy 8f3d21c",
      action: "Trace to commit",
      tracedLabel: "Pinned to src/payments/capture.ts:214",
    },
  },
  terminal: {
    label: "Terminal",
    title: "The CLI is the product",
    intro:
      "No dashboards to babysit, no YAML to appease. Everything Nebula does is one command away, and every command is scriptable.",
    tabsAria: "Terminal scenarios",
    copy: "Copy command",
    copied: "Copied",
    tabs: [
      {
        id: "deploy",
        label: "Deploy",
        command: "nebula deploy --prod",
        lines: [
          { kind: "info", text: "Nebula CLI 3.2.0 · linked to nebula-labs/checkout" },
          { kind: "dim", text: "Building 142 modules with remote cache" },
          { kind: "ok", text: "Build complete in 38.2s (cache hit 87%)" },
          { kind: "dim", text: "Uploading snapshot 8f3d21c to gru1, iad1, fra1" },
          { kind: "ok", text: "Live at https://checkout.nebulalabs.dev" },
          { kind: "info", text: "Watching golden signals for 10m — auto-rollback armed" },
        ],
      },
      {
        id: "rollback",
        label: "Rollback",
        command: "nebula rollback --to v2.14.0",
        lines: [
          { kind: "warn", text: "p95 latency +38% detected on v2.14.1" },
          { kind: "dim", text: "Shifting traffic edge-first: gru1 ok · iad1 ok · fra1 ok" },
          { kind: "ok", text: "Traffic restored to v2.14.0 in 9.4s" },
          { kind: "info", text: "Incident timeline drafted — nebula.dev/i/4821" },
        ],
      },
      {
        id: "logs",
        label: "Logs",
        command: "nebula logs --follow --deploy latest",
        lines: [
          { kind: "dim", text: "12:04:11 GET /api/cart 200 24ms" },
          { kind: "dim", text: "12:04:12 POST /api/checkout 200 61ms" },
          { kind: "warn", text: "12:04:14 POST /api/checkout 502 1204ms" },
          { kind: "info", text: "Anomaly grouped: upstream timeout in payments-svc" },
          { kind: "ok", text: "Alert routed to @luana — owner of payments-svc" },
        ],
      },
    ],
  },
  metrics: {
    label: "By the numbers",
    title: "Numbers we obsess over",
    footnote: "Measured across all beta workloads, trailing 90 days.",
    items: [
      { value: 2.4, decimals: 1, suffix: "M", label: "deploys shipped during beta" },
      { value: 38, decimals: 0, suffix: "s", label: "median build, cold cache" },
      { value: 9.4, decimals: 1, suffix: "s", label: "to roll back globally" },
      { value: 99.99, decimals: 2, suffix: "%", label: "uptime across 120 edge regions" },
    ],
  },
  changelog: {
    label: "Changelog",
    title: "Shipped weekly. Documented always.",
    intro: "Every release, in public. Filter by what matters to you.",
    filterAria: "Filter changelog entries",
    filters: [
      { id: "all", label: "All" },
      { id: "feature", label: "Features" },
      { id: "fix", label: "Fixes" },
      { id: "improvement", label: "Improvements" },
    ],
    typeLabels: { feature: "Feature", fix: "Fix", improvement: "Improvement" },
    empty: "Nothing here yet. Try another filter.",
    entries: [
      {
        version: "v3.2.0",
        date: "Jul 10, 2026",
        type: "feature",
        title: "Shadow writes for schema guards",
        body: "Risky migrations now dry-run against a mirrored write stream before any traffic shifts. Destructive changes get blocked with a diff-level explanation.",
      },
      {
        version: "v3.1.4",
        date: "Jul 3, 2026",
        type: "fix",
        title: "Preview URLs on forked pull requests",
        body: "Forked PRs were skipping the auth proxy in some org configurations. Previews now inherit org SSO rules everywhere.",
      },
      {
        version: "v3.1.3",
        date: "Jun 27, 2026",
        type: "improvement",
        title: "Cold starts down 31%",
        body: "Snapshot layers are now pre-warmed in the two regions closest to your traffic, cutting cold boot times across every plan.",
      },
      {
        version: "v3.1.0",
        date: "Jun 19, 2026",
        type: "feature",
        title: "Anomaly-to-commit tracing",
        body: "Latency spikes now link straight to the exact diff that shipped them, with the suspect lines highlighted in the review pane.",
      },
      {
        version: "v3.0.2",
        date: "Jun 11, 2026",
        type: "fix",
        title: "Monorepo path filters",
        body: "Workspaces with nested glob patterns no longer trigger rebuilds of sibling packages that did not change.",
      },
      {
        version: "v3.0.1",
        date: "Jun 6, 2026",
        type: "improvement",
        title: "CLI output, redesigned",
        body: "Quieter logs by default, structured JSON with --json, and the full firehose behind --verbose when you want it.",
      },
      {
        version: "v3.0.0",
        date: "May 28, 2026",
        type: "feature",
        title: "Auto-rollback goes GA",
        body: "Golden-signal watchdogs are now armed on every production deploy by default. Regressions revert themselves before most humans notice.",
      },
    ],
  },
  backedBy: {
    label: "Investors",
    title: "Built by the paranoid, funded by the patient",
    investors: [
      "Northline Capital",
      "Meridian Ventures",
      "Signal Peak",
      "Hyphen Capital",
      "Arcadia Fund",
      "Vantage Point",
    ],
    quote: {
      text: "Every strong infra team we meet is already treating Nebula as the default. That almost never happens before general availability.",
      name: "Camila Duarte-Reyes",
      role: "General Partner, Northline Capital",
    },
    note: "$24M raised across seed and Series A",
  },
  cta: {
    kicker: "Early access",
    title: "The waitlist moves every Thursday.",
    sub: "We onboard one cohort a week, strictly in order. Founding teams get concierge migration, direct access to the engineers, and a price that never changes.",
    priceNote: "Founding price: $19 per seat, per month — locked for life.",
    perks: [
      "Concierge migration from your current CI",
      "A direct line to the founding engineers",
      "Priority SOC 2 reports and security reviews",
    ],
    form: {
      emailLabel: "Work email",
      placeholder: "you@company.com",
      button: "Claim my spot",
      invalid: "That does not look like a valid email. Try your work address.",
      successTitle: "Spot claimed.",
      successBody:
        "Watch your inbox on Thursdays. We will nudge you once more the week your cohort opens.",
      positionLabel: "Place in line",
      reset: "Use a different email",
    },
  },
  footer: {
    tagline: "Infrastructure for teams who refuse to slow down.",
    columns: [
      {
        title: "Product",
        links: [
          { href: "#product", label: "Previews" },
          { href: "#product", label: "Rollbacks" },
          { href: "#product", label: "Observability" },
          { href: "#changelog", label: "Changelog" },
        ],
      },
      {
        title: "Company",
        links: [
          { href: "#investors", label: "Investors" },
          { href: "#waitlist", label: "Careers" },
          { href: "#waitlist", label: "Press kit" },
          { href: "#waitlist", label: "Contact" },
        ],
      },
      {
        title: "Resources",
        links: [
          { href: "#terminal", label: "CLI reference" },
          { href: "#metrics", label: "Status" },
          { href: "#waitlist", label: "Security" },
          { href: "#waitlist", label: "Community" },
        ],
      },
    ],
    social: [{ label: "Website" }, { label: "Email" }, { label: "Community chat" }],
    status: "All systems operational",
    legal: "SOC 2 Type II in progress · GDPR ready",
    copyright: "© 2026 Nebula Labs, Inc. A fictional concept crafted by VigApp.",
  },
};

/* ------------------------------------------------------------------ */
/* Português                                                           */
/* ------------------------------------------------------------------ */

const pt: NebulaContent = {
  numberLocale: "pt-BR",
  nav: {
    links: [
      { href: "#product", label: "Produto" },
      { href: "#terminal", label: "Terminal" },
      { href: "#changelog", label: "Changelog" },
      { href: "#investors", label: "Investidores" },
    ],
    cta: "Entrar na lista",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
  },
  hero: {
    badge: "Beta privado · Série A liderada pela Northline Capital",
    titleTop: "Lance com",
    titleAccent: "velocidade de escape.",
    sub: "O Nebula dá a cada commit um preview ao vivo, a cada release um rollback de uma tecla e a cada dev visão de raio-X da produção. Zero YAML. Zero medo.",
    assurances: ["Grátis durante o beta", "Setup em 2 minutos", "Sem cartão de crédito"],
    form: {
      emailLabel: "E-mail de trabalho",
      placeholder: "voce@empresa.com.br",
      button: "Entrar na lista",
      invalid: "Esse e-mail não parece válido. Tente o endereço da empresa.",
      successTitle: "Você está na lista.",
      successBody:
        "Liberamos uma nova turma toda quinta-feira, rigorosamente por ordem. Seu convite chega assim que o seu número for chamado.",
      positionLabel: "Posição na fila",
      reset: "Usar outro e-mail",
    },
    scrollCue: "Role para explorar",
  },
  tour: {
    label: "Produto",
    title: "Do commit à confiança",
    intro:
      "Três obsessões, projetadas de ponta a ponta. Role e sinta como fica o seu pipeline quando ele finalmente sai do caminho.",
    stepAria: "Mostrar recurso",
    steps: [
      {
        id: "previews",
        kicker: "Preview",
        title: "Uma URL viva para cada branch",
        body: "Abra um pull request e o Nebula sobe um ambiente isolado, idêntico à produção, em cerca de quarenta segundos. Compartilhe o link, não um print.",
        bullets: [
          "Dados espelhados da produção, mascarados automaticamente",
          "Comentários de review fixados no commit exato",
          "Ambientes ociosos hibernam a custo zero",
        ],
      },
      {
        id: "rollbacks",
        kicker: "Rollback",
        title: "Desfaça a produção como um typo",
        body: "Cada release é um snapshot imutável. Quando um sinal vital cai, uma tecla devolve o tráfego global para o último build saudável em menos de dez segundos.",
        bullets: [
          "O tráfego volta borda a borda, região por região",
          "Mudanças de schema protegidas por shadow writes",
          "A linha do tempo do incidente se escreve sozinha",
        ],
      },
      {
        id: "observe",
        kicker: "Observar",
        title: "Veja a anomalia antes do pager",
        body: "O Nebula monitora latência, erros e saturação por deploy e correlaciona cada pico ao diff exato que o causou. A linha culpada, não só o serviço culpado.",
        bullets: [
          "Latência e error budget por deploy",
          "Alertas roteados para o dono do código, não para um canal",
          "Um clique da anomalia ao commit responsável",
        ],
      },
    ],
    previewMock: {
      windowTitle: "nebula-pr-512.preview.nebulalabs.dev",
      heading: "Deploys de preview",
      ready: "Pronto",
      building: "Compilando",
      open: "Abrir preview",
      rows: [
        { branch: "feat/checkout-v2", author: "Luana Ferreira", time: "38s" },
        { branch: "fix/cart-race-condition", author: "Dmitri Volkov", time: "41s" },
        { branch: "chore/upgrade-node-22", author: "Aisha Bello", time: "12s", building: true },
      ],
    },
    timelineMock: {
      windowTitle: "nebulalabs.dev/releases",
      heading: "Linha do tempo de releases",
      alert: "Taxa de erro +212% na v2.14.1",
      action: "Reverter para v2.14.0",
      restored: "Tráfego restaurado para v2.14.0 em 9,4s",
      rows: [
        { version: "v2.14.1", label: "No ar · queimando error budget", tone: "bad" },
        { version: "v2.14.0", label: "Última release saudável", tone: "ok" },
        { version: "v2.13.9", label: "Estável há 6 dias", tone: "ok" },
      ],
    },
    tracesMock: {
      windowTitle: "nebulalabs.dev/observe/checkout-api",
      heading: "checkout-api · produção",
      metricLabel: "Latência p95, últimos 30 minutos",
      alertText: "p95 +38% após o deploy 8f3d21c",
      action: "Rastrear até o commit",
      tracedLabel: "Fixado em src/payments/capture.ts:214",
    },
  },
  terminal: {
    label: "Terminal",
    title: "A CLI é o produto",
    intro:
      "Nenhum dashboard para vigiar, nenhum YAML para apaziguar. Tudo que o Nebula faz está a um comando de distância, e todo comando é automatizável.",
    tabsAria: "Cenários de terminal",
    copy: "Copiar comando",
    copied: "Copiado",
    tabs: [
      {
        id: "deploy",
        label: "Deploy",
        command: "nebula deploy --prod",
        lines: [
          { kind: "info", text: "Nebula CLI 3.2.0 · vinculado a nebula-labs/checkout" },
          { kind: "dim", text: "Compilando 142 módulos com cache remoto" },
          { kind: "ok", text: "Build concluído em 38,2s (87% de cache)" },
          { kind: "dim", text: "Enviando snapshot 8f3d21c para gru1, iad1, fra1" },
          { kind: "ok", text: "No ar em https://checkout.nebulalabs.dev" },
          { kind: "info", text: "Monitorando sinais vitais por 10m — auto-rollback armado" },
        ],
      },
      {
        id: "rollback",
        label: "Rollback",
        command: "nebula rollback --to v2.14.0",
        lines: [
          { kind: "warn", text: "Latência p95 +38% detectada na v2.14.1" },
          { kind: "dim", text: "Revertendo tráfego borda a borda: gru1 ok · iad1 ok · fra1 ok" },
          { kind: "ok", text: "Tráfego restaurado para v2.14.0 em 9,4s" },
          { kind: "info", text: "Linha do tempo do incidente redigida — nebula.dev/i/4821" },
        ],
      },
      {
        id: "logs",
        label: "Logs",
        command: "nebula logs --follow --deploy latest",
        lines: [
          { kind: "dim", text: "12:04:11 GET /api/cart 200 24ms" },
          { kind: "dim", text: "12:04:12 POST /api/checkout 200 61ms" },
          { kind: "warn", text: "12:04:14 POST /api/checkout 502 1204ms" },
          { kind: "info", text: "Anomalia agrupada: timeout no upstream payments-svc" },
          { kind: "ok", text: "Alerta roteado para @luana — dona do payments-svc" },
        ],
      },
    ],
  },
  metrics: {
    label: "Em números",
    title: "Os números que nos obcecam",
    footnote: "Medidos em todas as cargas do beta, últimos 90 dias.",
    items: [
      { value: 2.4, decimals: 1, suffix: "M", label: "deploys enviados durante o beta" },
      { value: 38, decimals: 0, suffix: "s", label: "de build mediano, cache frio" },
      { value: 9.4, decimals: 1, suffix: "s", label: "para reverter globalmente" },
      { value: 99.99, decimals: 2, suffix: "%", label: "de uptime em 120 regiões de borda" },
    ],
  },
  changelog: {
    label: "Changelog",
    title: "Lançado toda semana. Documentado sempre.",
    intro: "Cada release, em público. Filtre pelo que importa para você.",
    filterAria: "Filtrar entradas do changelog",
    filters: [
      { id: "all", label: "Tudo" },
      { id: "feature", label: "Novidades" },
      { id: "fix", label: "Correções" },
      { id: "improvement", label: "Melhorias" },
    ],
    typeLabels: { feature: "Novidade", fix: "Correção", improvement: "Melhoria" },
    empty: "Nada por aqui ainda. Tente outro filtro.",
    entries: [
      {
        version: "v3.2.0",
        date: "10 jul 2026",
        type: "feature",
        title: "Shadow writes para guardas de schema",
        body: "Migrações arriscadas agora rodam a seco contra um fluxo espelhado de escrita antes de qualquer tráfego mudar. Alterações destrutivas são bloqueadas com explicação no nível do diff.",
      },
      {
        version: "v3.1.4",
        date: "3 jul 2026",
        type: "fix",
        title: "URLs de preview em PRs de fork",
        body: "PRs de fork pulavam o proxy de autenticação em algumas configurações de organização. Previews agora herdam as regras de SSO em todos os casos.",
      },
      {
        version: "v3.1.3",
        date: "27 jun 2026",
        type: "improvement",
        title: "Cold starts 31% menores",
        body: "As camadas de snapshot agora são pré-aquecidas nas duas regiões mais próximas do seu tráfego, reduzindo o boot frio em todos os planos.",
      },
      {
        version: "v3.1.0",
        date: "19 jun 2026",
        type: "feature",
        title: "Rastreio de anomalia até o commit",
        body: "Picos de latência agora apontam direto para o diff exato que os lançou, com as linhas suspeitas destacadas no painel de review.",
      },
      {
        version: "v3.0.2",
        date: "11 jun 2026",
        type: "fix",
        title: "Filtros de caminho em monorepos",
        body: "Workspaces com globs aninhados não disparam mais rebuilds de pacotes irmãos que não mudaram.",
      },
      {
        version: "v3.0.1",
        date: "6 jun 2026",
        type: "improvement",
        title: "Saída da CLI, redesenhada",
        body: "Logs mais silenciosos por padrão, JSON estruturado com --json e a mangueira de incêndio completa atrás de --verbose quando você quiser.",
      },
      {
        version: "v3.0.0",
        date: "28 mai 2026",
        type: "feature",
        title: "Auto-rollback em disponibilidade geral",
        body: "Os vigias de sinais vitais agora vêm armados em todo deploy de produção por padrão. Regressões se revertem antes que a maioria dos humanos perceba.",
      },
    ],
  },
  backedBy: {
    label: "Investidores",
    title: "Feito por paranoicos, financiado por pacientes",
    investors: [
      "Northline Capital",
      "Meridian Ventures",
      "Signal Peak",
      "Hyphen Capital",
      "Arcadia Fund",
      "Vantage Point",
    ],
    quote: {
      text: "Todo time forte de infra que encontramos já trata o Nebula como padrão. Isso quase nunca acontece antes da disponibilidade geral.",
      name: "Camila Duarte-Reyes",
      role: "General Partner, Northline Capital",
    },
    note: "US$ 24 mi captados entre seed e Série A",
  },
  cta: {
    kicker: "Acesso antecipado",
    title: "A fila anda toda quinta-feira.",
    sub: "Liberamos uma turma por semana, rigorosamente por ordem. Times fundadores ganham migração assistida, linha direta com os engenheiros e um preço que nunca muda.",
    priceNote: "Preço de fundador: R$ 99 por assento, por mês — travado para sempre.",
    perks: [
      "Migração assistida a partir do seu CI atual",
      "Linha direta com os engenheiros fundadores",
      "Prioridade em relatórios SOC 2 e revisões de segurança",
    ],
    form: {
      emailLabel: "E-mail de trabalho",
      placeholder: "voce@empresa.com.br",
      button: "Garantir minha vaga",
      invalid: "Esse e-mail não parece válido. Tente o endereço da empresa.",
      successTitle: "Vaga garantida.",
      successBody:
        "Fique de olho na caixa de entrada às quintas. Avisaremos de novo na semana em que a sua turma abrir.",
      positionLabel: "Posição na fila",
      reset: "Usar outro e-mail",
    },
  },
  footer: {
    tagline: "Infraestrutura para times que se recusam a desacelerar.",
    columns: [
      {
        title: "Produto",
        links: [
          { href: "#product", label: "Previews" },
          { href: "#product", label: "Rollbacks" },
          { href: "#product", label: "Observabilidade" },
          { href: "#changelog", label: "Changelog" },
        ],
      },
      {
        title: "Empresa",
        links: [
          { href: "#investors", label: "Investidores" },
          { href: "#waitlist", label: "Carreiras" },
          { href: "#waitlist", label: "Kit de imprensa" },
          { href: "#waitlist", label: "Contato" },
        ],
      },
      {
        title: "Recursos",
        links: [
          { href: "#terminal", label: "Referência da CLI" },
          { href: "#metrics", label: "Status" },
          { href: "#waitlist", label: "Segurança" },
          { href: "#waitlist", label: "Comunidade" },
        ],
      },
    ],
    social: [{ label: "Site" }, { label: "E-mail" }, { label: "Chat da comunidade" }],
    status: "Todos os sistemas operacionais",
    legal: "SOC 2 Type II em andamento · pronto para a LGPD",
    copyright: "© 2026 Nebula Labs, Inc. Um conceito fictício criado pela VigApp.",
  },
};

/* ------------------------------------------------------------------ */
/* Español                                                             */
/* ------------------------------------------------------------------ */

const es: NebulaContent = {
  numberLocale: "es-ES",
  nav: {
    links: [
      { href: "#product", label: "Producto" },
      { href: "#terminal", label: "Terminal" },
      { href: "#changelog", label: "Changelog" },
      { href: "#investors", label: "Inversores" },
    ],
    cta: "Unirme a la lista",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  hero: {
    badge: "Beta privada · Serie A liderada por Northline Capital",
    titleTop: "Lanza con",
    titleAccent: "velocidad de escape.",
    sub: "Nebula da a cada commit una preview en vivo, a cada release un rollback de una sola tecla y a cada dev visión de rayos X sobre producción. Cero YAML. Cero miedo.",
    assurances: ["Gratis durante la beta", "Configuración en 2 minutos", "Sin tarjeta de crédito"],
    form: {
      emailLabel: "Email de trabajo",
      placeholder: "tu@empresa.com",
      button: "Unirme a la lista",
      invalid: "Ese email no parece válido. Prueba con tu dirección de trabajo.",
      successTitle: "Ya estás en la lista.",
      successBody:
        "Incorporamos una nueva cohorte cada jueves, estrictamente por orden. Tu invitación llegará en cuanto salga tu número.",
      positionLabel: "Puesto en la fila",
      reset: "Usar otro email",
    },
    scrollCue: "Desplázate para explorar",
  },
  tour: {
    label: "Producto",
    title: "Del commit a la confianza",
    intro:
      "Tres obsesiones, diseñadas de principio a fin. Desplázate y descubre cómo se siente tu pipeline cuando por fin deja de estorbar.",
    stepAria: "Mostrar función",
    steps: [
      {
        id: "previews",
        kicker: "Preview",
        title: "Una URL viva para cada rama",
        body: "Abre un pull request y Nebula levanta un entorno aislado, idéntico a producción, en unos cuarenta segundos. Comparte el enlace, no una captura.",
        bullets: [
          "Datos con paridad de producción, enmascarados automáticamente",
          "Comentarios de review anclados al commit exacto",
          "Los entornos inactivos hibernan a coste cero",
        ],
      },
      {
        id: "rollbacks",
        kicker: "Rollback",
        title: "Deshaz producción como una errata",
        body: "Cada release es un snapshot inmutable. Cuando una señal clave cae, una sola tecla devuelve el tráfico global al último build sano en menos de diez segundos.",
        bullets: [
          "El tráfico retrocede desde el edge, región a región",
          "Cambios de esquema protegidos con shadow writes",
          "La cronología del incidente se escribe sola",
        ],
      },
      {
        id: "observe",
        kicker: "Observar",
        title: "Ve la anomalía antes que el pager",
        body: "Nebula vigila latencia, errores y saturación por deploy, y correlaciona cada pico con el diff exacto que lo causó. La línea culpable, no solo el servicio culpable.",
        bullets: [
          "Latencia y presupuestos de error por deploy",
          "Alertas dirigidas al dueño del código, no a un canal",
          "Un clic desde la anomalía hasta el commit responsable",
        ],
      },
    ],
    previewMock: {
      windowTitle: "nebula-pr-512.preview.nebulalabs.dev",
      heading: "Deploys de preview",
      ready: "Listo",
      building: "Compilando",
      open: "Abrir preview",
      rows: [
        { branch: "feat/checkout-v2", author: "Luana Ferreira", time: "38s" },
        { branch: "fix/cart-race-condition", author: "Dmitri Volkov", time: "41s" },
        { branch: "chore/upgrade-node-22", author: "Aisha Bello", time: "12s", building: true },
      ],
    },
    timelineMock: {
      windowTitle: "nebulalabs.dev/releases",
      heading: "Cronología de releases",
      alert: "Tasa de error +212% en v2.14.1",
      action: "Revertir a v2.14.0",
      restored: "Tráfico restaurado a v2.14.0 en 9,4s",
      rows: [
        { version: "v2.14.1", label: "En vivo · quemando presupuesto de error", tone: "bad" },
        { version: "v2.14.0", label: "Última release sana", tone: "ok" },
        { version: "v2.13.9", label: "Estable desde hace 6 días", tone: "ok" },
      ],
    },
    tracesMock: {
      windowTitle: "nebulalabs.dev/observe/checkout-api",
      heading: "checkout-api · producción",
      metricLabel: "Latencia p95, últimos 30 minutos",
      alertText: "p95 +38% tras el deploy 8f3d21c",
      action: "Rastrear hasta el commit",
      tracedLabel: "Fijado en src/payments/capture.ts:214",
    },
  },
  terminal: {
    label: "Terminal",
    title: "La CLI es el producto",
    intro:
      "Sin dashboards que vigilar ni YAML que apaciguar. Todo lo que hace Nebula está a un comando de distancia, y cada comando es automatizable.",
    tabsAria: "Escenarios de terminal",
    copy: "Copiar comando",
    copied: "Copiado",
    tabs: [
      {
        id: "deploy",
        label: "Deploy",
        command: "nebula deploy --prod",
        lines: [
          { kind: "info", text: "Nebula CLI 3.2.0 · vinculada a nebula-labs/checkout" },
          { kind: "dim", text: "Compilando 142 módulos con caché remota" },
          { kind: "ok", text: "Build completado en 38,2s (87% de caché)" },
          { kind: "dim", text: "Subiendo snapshot 8f3d21c a gru1, iad1, fra1" },
          { kind: "ok", text: "En vivo en https://checkout.nebulalabs.dev" },
          { kind: "info", text: "Vigilando señales clave durante 10m — auto-rollback armado" },
        ],
      },
      {
        id: "rollback",
        label: "Rollback",
        command: "nebula rollback --to v2.14.0",
        lines: [
          { kind: "warn", text: "Latencia p95 +38% detectada en v2.14.1" },
          { kind: "dim", text: "Revirtiendo tráfico desde el edge: gru1 ok · iad1 ok · fra1 ok" },
          { kind: "ok", text: "Tráfico restaurado a v2.14.0 en 9,4s" },
          { kind: "info", text: "Cronología del incidente redactada — nebula.dev/i/4821" },
        ],
      },
      {
        id: "logs",
        label: "Logs",
        command: "nebula logs --follow --deploy latest",
        lines: [
          { kind: "dim", text: "12:04:11 GET /api/cart 200 24ms" },
          { kind: "dim", text: "12:04:12 POST /api/checkout 200 61ms" },
          { kind: "warn", text: "12:04:14 POST /api/checkout 502 1204ms" },
          { kind: "info", text: "Anomalía agrupada: timeout en el upstream payments-svc" },
          { kind: "ok", text: "Alerta dirigida a @luana — dueña de payments-svc" },
        ],
      },
    ],
  },
  metrics: {
    label: "En cifras",
    title: "Las cifras que nos obsesionan",
    footnote: "Medidas sobre todas las cargas de la beta, últimos 90 días.",
    items: [
      { value: 2.4, decimals: 1, suffix: "M", label: "deploys enviados durante la beta" },
      { value: 38, decimals: 0, suffix: "s", label: "de build mediano, caché fría" },
      { value: 9.4, decimals: 1, suffix: "s", label: "para revertir globalmente" },
      { value: 99.99, decimals: 2, suffix: "%", label: "de uptime en 120 regiones edge" },
    ],
  },
  changelog: {
    label: "Changelog",
    title: "Lanzado cada semana. Documentado siempre.",
    intro: "Cada release, en público. Filtra por lo que te importa.",
    filterAria: "Filtrar entradas del changelog",
    filters: [
      { id: "all", label: "Todo" },
      { id: "feature", label: "Novedades" },
      { id: "fix", label: "Correcciones" },
      { id: "improvement", label: "Mejoras" },
    ],
    typeLabels: { feature: "Novedad", fix: "Corrección", improvement: "Mejora" },
    empty: "Nada por aquí todavía. Prueba otro filtro.",
    entries: [
      {
        version: "v3.2.0",
        date: "10 jul 2026",
        type: "feature",
        title: "Shadow writes para guardas de esquema",
        body: "Las migraciones arriesgadas ahora se ensayan contra un flujo de escritura espejado antes de mover tráfico. Los cambios destructivos se bloquean con una explicación a nivel de diff.",
      },
      {
        version: "v3.1.4",
        date: "3 jul 2026",
        type: "fix",
        title: "URLs de preview en PRs de forks",
        body: "Los PRs de forks se saltaban el proxy de autenticación en algunas configuraciones. Las previews ahora heredan las reglas de SSO en todos los casos.",
      },
      {
        version: "v3.1.3",
        date: "27 jun 2026",
        type: "improvement",
        title: "Cold starts un 31% más rápidos",
        body: "Las capas de snapshot se precalientan en las dos regiones más cercanas a tu tráfico, recortando el arranque en frío en todos los planes.",
      },
      {
        version: "v3.1.0",
        date: "19 jun 2026",
        type: "feature",
        title: "Rastreo de anomalía a commit",
        body: "Los picos de latencia ahora enlazan directamente con el diff exacto que los provocó, con las líneas sospechosas resaltadas en el panel de review.",
      },
      {
        version: "v3.0.2",
        date: "11 jun 2026",
        type: "fix",
        title: "Filtros de rutas en monorepos",
        body: "Los workspaces con globs anidados ya no disparan rebuilds de paquetes hermanos que no cambiaron.",
      },
      {
        version: "v3.0.1",
        date: "6 jun 2026",
        type: "improvement",
        title: "Salida de la CLI, rediseñada",
        body: "Logs más silenciosos por defecto, JSON estructurado con --json y la manguera completa detrás de --verbose cuando la quieras.",
      },
      {
        version: "v3.0.0",
        date: "28 may 2026",
        type: "feature",
        title: "Auto-rollback en disponibilidad general",
        body: "Los vigilantes de señales clave se arman por defecto en cada deploy de producción. Las regresiones se revierten antes de que la mayoría de los humanos lo note.",
      },
    ],
  },
  backedBy: {
    label: "Inversores",
    title: "Hecho por paranoicos, financiado por pacientes",
    investors: [
      "Northline Capital",
      "Meridian Ventures",
      "Signal Peak",
      "Hyphen Capital",
      "Arcadia Fund",
      "Vantage Point",
    ],
    quote: {
      text: "Cada equipo fuerte de infraestructura que conocemos ya trata a Nebula como su opción por defecto. Eso casi nunca ocurre antes de la disponibilidad general.",
      name: "Camila Duarte-Reyes",
      role: "General Partner, Northline Capital",
    },
    note: "24 M$ recaudados entre seed y Serie A",
  },
  cta: {
    kicker: "Acceso anticipado",
    title: "La lista avanza cada jueves.",
    sub: "Incorporamos una cohorte por semana, estrictamente por orden. Los equipos fundadores reciben migración asistida, línea directa con los ingenieros y un precio que nunca cambia.",
    priceNote: "Precio fundador: 19 € por asiento, al mes — fijado de por vida.",
    perks: [
      "Migración asistida desde tu CI actual",
      "Línea directa con los ingenieros fundadores",
      "Prioridad en informes SOC 2 y revisiones de seguridad",
    ],
    form: {
      emailLabel: "Email de trabajo",
      placeholder: "tu@empresa.com",
      button: "Reservar mi puesto",
      invalid: "Ese email no parece válido. Prueba con tu dirección de trabajo.",
      successTitle: "Puesto reservado.",
      successBody:
        "Vigila tu bandeja los jueves. Te avisaremos de nuevo la semana en que abra tu cohorte.",
      positionLabel: "Puesto en la fila",
      reset: "Usar otro email",
    },
  },
  footer: {
    tagline: "Infraestructura para equipos que se niegan a frenar.",
    columns: [
      {
        title: "Producto",
        links: [
          { href: "#product", label: "Previews" },
          { href: "#product", label: "Rollbacks" },
          { href: "#product", label: "Observabilidad" },
          { href: "#changelog", label: "Changelog" },
        ],
      },
      {
        title: "Empresa",
        links: [
          { href: "#investors", label: "Inversores" },
          { href: "#waitlist", label: "Empleo" },
          { href: "#waitlist", label: "Kit de prensa" },
          { href: "#waitlist", label: "Contacto" },
        ],
      },
      {
        title: "Recursos",
        links: [
          { href: "#terminal", label: "Referencia de la CLI" },
          { href: "#metrics", label: "Estado" },
          { href: "#waitlist", label: "Seguridad" },
          { href: "#waitlist", label: "Comunidad" },
        ],
      },
    ],
    social: [{ label: "Sitio web" }, { label: "Email" }, { label: "Chat de la comunidad" }],
    status: "Todos los sistemas operativos",
    legal: "SOC 2 Type II en curso · listo para el RGPD",
    copyright: "© 2026 Nebula Labs, Inc. Un concepto ficticio creado por VigApp.",
  },
};

export const nebulaDict: DemoDictionary<NebulaContent> = { en, pt, es };
