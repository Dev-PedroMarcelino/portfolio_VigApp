import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type FeatureTabId = "plan" | "track" | "report";
export type IntegrationCategoryId = "comms" | "dev" | "design" | "ops";
export type CardTone = "blue" | "violet" | "amber" | "rose" | "emerald";
export type TrackStatusId = "onTrack" | "atRisk" | "done";
export type SecurityIconId =
  | "shield"
  | "key"
  | "lock"
  | "fingerprint"
  | "globe"
  | "activity";

export interface NavContent {
  links: { href: string; label: string }[];
  login: string;
  cta: string;
  openMenu: string;
  closeMenu: string;
}

export interface HeroMockContent {
  windowTitle: string;
  sidebar: string[];
  columns: { label: string; cards: { title: string; tone: CardTone }[] }[];
  chart: { title: string; value: string; delta: string };
  activity: { title: string; items: { initials: string; text: string; time: string }[] };
}

export interface HeroContent {
  badge: string;
  titleTop: string;
  titleAccent: string;
  sub: string;
  ctaPrimary: string;
  ctaSecondary: string;
  trustNote: string;
  logos: string[];
  mock: HeroMockContent;
}

export interface FeatureTabContent {
  id: FeatureTabId;
  label: string;
  title: string;
  body: string;
  bullets: string[];
}

export interface KanbanCardContent {
  id: string;
  title: string;
  tag: string;
  initials: string;
  tone: CardTone;
  col: number;
}

export interface FeaturesContent {
  label: string;
  title: string;
  intro: string;
  tabs: FeatureTabContent[];
  plan: {
    hint: string;
    columns: string[];
    cards: KanbanCardContent[];
  };
  track: {
    headers: { task: string; owner: string; status: string; due: string; progress: string };
    statuses: Record<TrackStatusId, string>;
    rows: { task: string; owner: string; status: TrackStatusId; due: string; progress: number }[];
  };
  report: {
    title: string;
    subtitle: string;
    bars: { label: string; value: number }[];
    stats: { label: string; value: string; delta: string; up: boolean }[];
  };
}

export interface IntegrationItem {
  name: string;
  category: IntegrationCategoryId;
  blurb: string;
}

export interface IntegrationsContent {
  label: string;
  title: string;
  intro: string;
  searchLabel: string;
  searchPlaceholder: string;
  clearLabel: string;
  showing: string;
  of: string;
  itemsWord: string;
  emptyTitle: string;
  emptyBody: string;
  requestCta: string;
  allLabel: string;
  categories: { id: IntegrationCategoryId; label: string }[];
  items: IntegrationItem[];
}

export interface SecurityContent {
  label: string;
  title: string;
  intro: string;
  items: { icon: SecurityIconId; title: string; body: string }[];
  badges: string[];
  uptimeValue: string;
  uptimeLabel: string;
}

export interface PricingTierContent {
  id: string;
  name: string;
  blurb: string;
  priceMonthly?: string;
  priceAnnual?: string;
  customLabel?: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export interface PricingContent {
  label: string;
  title: string;
  intro: string;
  monthly: string;
  annual: string;
  saveBadge: string;
  perSeat: string;
  billedAnnually: string;
  billedMonthly: string;
  popularBadge: string;
  tiers: PricingTierContent[];
  footnote: string;
}

export interface QuoteItem {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface QuotesContent {
  label: string;
  title: string;
  intro: string;
  featured: QuoteItem & { metric: string; metricLabel: string; imageAlt: string };
  quotes: QuoteItem[];
}

export interface CtaContent {
  title: string;
  sub: string;
  emailLabel: string;
  emailPlaceholder: string;
  button: string;
  errorInvalid: string;
  successTitle: string;
  successBody: string;
  another: string;
  finePrint: string;
  imageAlt: string;
}

export interface FooterContent {
  blurb: string;
  columns: { title: string; links: { href: string; label: string }[] }[];
  socials: { id: "globe" | "at" | "chat"; label: string }[];
  statusLabel: string;
  copyright: string;
}

export interface OrbitflowContent {
  nav: NavContent;
  hero: HeroContent;
  features: FeaturesContent;
  integrations: IntegrationsContent;
  security: SecurityContent;
  pricing: PricingContent;
  quotes: QuotesContent;
  cta: CtaContent;
  footer: FooterContent;
}

/* ------------------------------------------------------------------ */
/* Dictionary                                                          */
/* ------------------------------------------------------------------ */

export const orbitflowDict: DemoDictionary<OrbitflowContent> = {
  /* ---------------------------------------------------------------- */
  /* English                                                           */
  /* ---------------------------------------------------------------- */
  en: {
    nav: {
      links: [
        { href: "#product", label: "Product" },
        { href: "#integrations", label: "Integrations" },
        { href: "#security", label: "Security" },
        { href: "#pricing", label: "Pricing" },
        { href: "#customers", label: "Customers" },
      ],
      login: "Sign in",
      cta: "Start free",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      badge: "New · Pulse reporting is live",
      titleTop: "Mission control",
      titleAccent: "for enterprise work",
      sub: "Orbitflow brings planning, tracking and reporting into one calm, fast workspace — trusted by teams of 50 and rollouts of 50,000.",
      ctaPrimary: "Start free trial",
      ctaSecondary: "Watch the 3-min tour",
      trustNote: "Trusted by operations and engineering teams at",
      logos: ["Nordwind Labs", "Trilha", "Kumo Systems", "Andina Retail", "Meridian Health", "Vela Energia"],
      mock: {
        windowTitle: "Atlas program · Q3",
        sidebar: ["Roadmap", "Sprints", "Docs", "Reports"],
        columns: [
          {
            label: "Now",
            cards: [
              { title: "Checkout redesign", tone: "blue" },
              { title: "SSO rollout", tone: "violet" },
            ],
          },
          {
            label: "Next",
            cards: [
              { title: "Usage-based billing", tone: "amber" },
              { title: "Mobile 3.0", tone: "rose" },
            ],
          },
          {
            label: "Shipped",
            cards: [{ title: "Audit log export", tone: "emerald" }],
          },
        ],
        chart: { title: "Cycle time", value: "2.4d", delta: "-38% this quarter" },
        activity: {
          title: "Approvals",
          items: [
            { initials: "NG", text: "Nina approved Design QA", time: "2m" },
            { initials: "RT", text: "Rafael merged Billing API", time: "14m" },
            { initials: "LS", text: "Lena shipped Mobile 3.0 beta", time: "1h" },
          ],
        },
      },
    },
    features: {
      label: "Product",
      title: "One workspace, three superpowers",
      intro:
        "Switch between planning, tracking and reporting without switching tools — everything stays in sync, down to the last subtask.",
      tabs: [
        {
          id: "plan",
          label: "Plan",
          title: "Plan work the way your teams actually run",
          body: "Kanban, sprints and roadmaps share one source of truth. Reorder priorities and every dependent date recalculates instantly.",
          bullets: [
            "Cross-team dependencies mapped automatically",
            "Capacity planning against real availability",
            "Templates for launches, audits and OKRs",
          ],
        },
        {
          id: "track",
          label: "Track",
          title: "See every project without asking for a status",
          body: "Live rollups replace status meetings. Owners, risk and progress update in real time from the work itself.",
          bullets: [
            "Risk flags before deadlines slip",
            "Portfolio rollups across 100+ teams",
            "Instant performance on a million tasks",
          ],
        },
        {
          id: "report",
          label: "Report",
          title: "Reports your board actually reads",
          body: "Pulse turns delivery data into a story: velocity, cycle time and on-time delivery — beautiful by default, exportable everywhere.",
          bullets: [
            "Board-ready decks in one click",
            "Custom metrics with a formula bar",
            "Scheduled digests to email and Slack",
          ],
        },
      ],
      plan: {
        hint: "Try it — click a card to advance it through the flow",
        columns: ["Backlog", "In progress", "Done"],
        cards: [
          { id: "rate-limit", title: "API rate limiting", tag: "Platform", initials: "AK", tone: "violet", col: 0 },
          { id: "onboarding", title: "Mobile onboarding flow", tag: "Design", initials: "LM", tone: "rose", col: 0 },
          { id: "billing", title: "Billing migration", tag: "Backend", initials: "RN", tone: "amber", col: 1 },
          { id: "churn", title: "Churn dashboard", tag: "Growth", initials: "PS", tone: "emerald", col: 1 },
          { id: "tokens", title: "Design token audit", tag: "Design", initials: "JO", tone: "blue", col: 2 },
        ],
      },
      track: {
        headers: { task: "Initiative", owner: "Owner", status: "Status", due: "Due", progress: "Progress" },
        statuses: { onTrack: "On track", atRisk: "At risk", done: "Done" },
        rows: [
          { task: "Checkout redesign", owner: "Marina Duarte", status: "onTrack", due: "Aug 12", progress: 72 },
          { task: "SSO rollout", owner: "Tobias Lang", status: "atRisk", due: "Aug 5", progress: 41 },
          { task: "Data warehouse sync", owner: "Priya Shah", status: "onTrack", due: "Aug 22", progress: 58 },
          { task: "Mobile 3.0 beta", owner: "Caio Mendes", status: "done", due: "Jul 30", progress: 100 },
        ],
      },
      report: {
        title: "Delivery velocity",
        subtitle: "Story points per sprint",
        bars: [
          { label: "S1", value: 42 },
          { label: "S2", value: 48 },
          { label: "S3", value: 45 },
          { label: "S4", value: 56 },
          { label: "S5", value: 61 },
          { label: "S6", value: 67 },
        ],
        stats: [
          { label: "On-time delivery", value: "94%", delta: "+6 pts", up: true },
          { label: "Cycle time", value: "2.4d", delta: "-38%", up: true },
          { label: "Active initiatives", value: "128", delta: "+12", up: true },
        ],
      },
    },
    integrations: {
      label: "Integrations",
      title: "Plays well with your entire stack",
      intro:
        "Native, two-way integrations — not brittle webhooks. Search the catalog or browse by category.",
      searchLabel: "Search integrations",
      searchPlaceholder: "Search integrations…",
      clearLabel: "Clear search",
      showing: "Showing",
      of: "of",
      itemsWord: "integrations",
      emptyTitle: "No matches for that search",
      emptyBody: "Try a shorter term — or tell us what is missing and we will build it.",
      requestCta: "Request an integration",
      allLabel: "All",
      categories: [
        { id: "comms", label: "Communication" },
        { id: "dev", label: "Development" },
        { id: "design", label: "Design" },
        { id: "ops", label: "Operations" },
      ],
      items: [
        { name: "Slack", category: "comms", blurb: "Turn threads into tracked tasks" },
        { name: "Microsoft Teams", category: "comms", blurb: "Updates where your org already talks" },
        { name: "Zoom", category: "comms", blurb: "Meeting notes attach to the work" },
        { name: "GitHub", category: "dev", blurb: "Pull requests move cards automatically" },
        { name: "GitLab", category: "dev", blurb: "Pipelines update delivery status" },
        { name: "Jira", category: "dev", blurb: "Two-way sync during migration" },
        { name: "Linear", category: "dev", blurb: "Mirror issues across both tools" },
        { name: "Figma", category: "design", blurb: "Live embeds inside every brief" },
        { name: "Miro", category: "design", blurb: "Workshops become structured plans" },
        { name: "Notion", category: "ops", blurb: "Docs linked to real deadlines" },
        { name: "Google Drive", category: "ops", blurb: "Files arrive with permissions intact" },
        { name: "Salesforce", category: "ops", blurb: "Revenue context on every project" },
        { name: "Okta", category: "ops", blurb: "Provision users with SCIM" },
        { name: "Zapier", category: "ops", blurb: "6,000+ apps with zero code" },
      ],
    },
    security: {
      label: "Security",
      title: "Enterprise-grade, by default",
      intro:
        "Security is not a pricing tier at Orbitflow. Every plan ships with the controls your compliance team asks about first.",
      items: [
        {
          icon: "shield",
          title: "SOC 2 Type II",
          body: "Audited annually by independent assessors; the full report is available under NDA.",
        },
        {
          icon: "key",
          title: "SSO & SCIM",
          body: "SAML 2.0 with Okta, Azure AD and Google Workspace, plus automated provisioning.",
        },
        {
          icon: "lock",
          title: "Encryption everywhere",
          body: "AES-256 at rest, TLS 1.3 in transit and customer-managed keys on Enterprise.",
        },
        {
          icon: "fingerprint",
          title: "Granular permissions",
          body: "Role-based access down to a single field, with sandboxed guest accounts.",
        },
        {
          icon: "globe",
          title: "Data residency",
          body: "Choose US, EU or Brazil hosting regions without losing a single feature.",
        },
        {
          icon: "activity",
          title: "Full audit trail",
          body: "Every action logged, exportable and streamable straight into your SIEM.",
        },
      ],
      badges: ["SOC 2 Type II", "ISO 27001", "GDPR", "LGPD"],
      uptimeValue: "99.99%",
      uptimeLabel: "uptime SLA over the last 12 months",
    },
    pricing: {
      label: "Pricing",
      title: "Pricing that scales with you, not against you",
      intro:
        "Start free and upgrade when the whole org shows up. Every plan includes unlimited viewers.",
      monthly: "Monthly",
      annual: "Annual",
      saveBadge: "Save 20%",
      perSeat: "per user / month",
      billedAnnually: "billed annually",
      billedMonthly: "billed monthly",
      popularBadge: "Most popular",
      tiers: [
        {
          id: "starter",
          name: "Starter",
          blurb: "For teams getting their first 50 projects under control.",
          priceMonthly: "$12",
          priceAnnual: "$10",
          features: [
            "Unlimited projects and tasks",
            "Kanban, list and calendar views",
            "10 native integrations",
            "Community support",
          ],
          cta: "Start free trial",
        },
        {
          id: "scale",
          name: "Scale",
          blurb: "For companies coordinating work across departments.",
          priceMonthly: "$28",
          priceAnnual: "$22",
          popular: true,
          features: [
            "Everything in Starter",
            "Portfolio rollups and Pulse reports",
            "Unlimited integrations and API",
            "SSO (SAML) and SCIM provisioning",
            "Priority support, 4h response",
          ],
          cta: "Start free trial",
        },
        {
          id: "enterprise",
          name: "Enterprise",
          blurb: "For orgs with procurement, security reviews and 1,000+ seats.",
          customLabel: "Custom",
          features: [
            "Everything in Scale",
            "Customer-managed encryption keys",
            "Data residency (US, EU, BR)",
            "Dedicated success architect",
            "99.99% uptime SLA",
          ],
          cta: "Talk to sales",
        },
      ],
      footnote: "Prices exclude taxes. Annual plans are billed once a year.",
    },
    quotes: {
      label: "Customers",
      title: "Teams that switched, stayed",
      intro:
        "From scale-ups to public companies — here is what changes when work finds its orbit.",
      featured: {
        quote:
          "We replaced four tools and our Monday status meeting with Orbitflow. Delivery is up, meetings are down, and my board deck builds itself.",
        name: "Mariana Duarte",
        role: "COO",
        company: "Trilha Fintech",
        metric: "-38%",
        metricLabel: "cycle time in the first quarter",
        imageAlt: "Trilha Fintech operations team reviewing a delivery dashboard together",
      },
      quotes: [
        {
          quote:
            "The migration from Jira took one afternoon. Two-way sync meant zero downtime for 900 engineers.",
          name: "Thomas Berger",
          role: "VP Engineering",
          company: "Nordwind Labs",
        },
        {
          quote:
            "Pulse ended the era of screenshot-driven status decks. My leadership team finally reads the numbers.",
          name: "Aiko Tanaka",
          role: "Product Lead",
          company: "Kumo Systems",
        },
        {
          quote:
            "The fastest security review we have ever run. SOC 2 report, DPA and residency answers in one folder.",
          name: "Daniel Okafor",
          role: "CISO",
          company: "Meridian Health",
        },
        {
          quote:
            "We run 140 store openings through Orbitflow. The at-risk flags saved our Barcelona launch twice.",
          name: "Sofía Herrera",
          role: "Expansion Director",
          company: "Andina Retail",
        },
        {
          quote:
            "Capacity planning that respects vacations and on-call. My team stopped burning out to hit dates.",
          name: "Rafael Nogueira",
          role: "CTO",
          company: "Vela Energia",
        },
      ],
    },
    cta: {
      title: "Put your work in orbit",
      sub: "Free for 14 days. No credit card, no sales call — invite your team and feel the difference by Friday.",
      emailLabel: "Work email",
      emailPlaceholder: "you@company.com",
      button: "Get started",
      errorInvalid: "Enter a valid work email",
      successTitle: "Check your inbox",
      successBody: "Open the magic link we just sent to launch your workspace.",
      another: "Use a different email",
      finePrint: "14-day trial · SOC 2 compliant · Cancel anytime",
      imageAlt: "Product and engineering team collaborating in a modern office",
    },
    footer: {
      blurb: "Mission control for enterprise work. Built with care in São Paulo and Lisbon.",
      columns: [
        {
          title: "Product",
          links: [
            { href: "#product", label: "Features" },
            { href: "#integrations", label: "Integrations" },
            { href: "#security", label: "Security" },
            { href: "#pricing", label: "Pricing" },
          ],
        },
        {
          title: "Company",
          links: [
            { href: "#customers", label: "Customers" },
            { href: "#top", label: "About" },
            { href: "#top", label: "Careers" },
            { href: "#top", label: "Press" },
          ],
        },
        {
          title: "Resources",
          links: [
            { href: "#top", label: "Documentation" },
            { href: "#top", label: "API reference" },
            { href: "#top", label: "Status" },
            { href: "#top", label: "Community" },
          ],
        },
        {
          title: "Legal",
          links: [
            { href: "#top", label: "Privacy" },
            { href: "#top", label: "Terms" },
            { href: "#top", label: "DPA" },
            { href: "#top", label: "Subprocessors" },
          ],
        },
      ],
      socials: [
        { id: "globe", label: "Website" },
        { id: "at", label: "Newsletter" },
        { id: "chat", label: "Community chat" },
      ],
      statusLabel: "All systems operational",
      copyright: "© 2026 Orbitflow, Inc. All rights reserved.",
    },
  },

  /* ---------------------------------------------------------------- */
  /* Português (Brasil)                                                */
  /* ---------------------------------------------------------------- */
  pt: {
    nav: {
      links: [
        { href: "#product", label: "Produto" },
        { href: "#integrations", label: "Integrações" },
        { href: "#security", label: "Segurança" },
        { href: "#pricing", label: "Planos" },
        { href: "#customers", label: "Clientes" },
      ],
      login: "Entrar",
      cta: "Comece grátis",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
    },
    hero: {
      badge: "Novo · Relatórios Pulse no ar",
      titleTop: "Controle de missão",
      titleAccent: "para o trabalho enterprise",
      sub: "O Orbitflow reúne planejamento, acompanhamento e relatórios em um workspace rápido e tranquilo — a confiança de times de 50 pessoas e implantações de 50 mil.",
      ctaPrimary: "Teste grátis",
      ctaSecondary: "Veja o tour de 3 min",
      trustNote: "Usado por times de operações e engenharia em",
      logos: ["Nordwind Labs", "Trilha", "Kumo Systems", "Andina Retail", "Meridian Health", "Vela Energia"],
      mock: {
        windowTitle: "Programa Atlas · T3",
        sidebar: ["Roadmap", "Sprints", "Docs", "Relatórios"],
        columns: [
          {
            label: "Agora",
            cards: [
              { title: "Novo checkout", tone: "blue" },
              { title: "Implantação de SSO", tone: "violet" },
            ],
          },
          {
            label: "A seguir",
            cards: [
              { title: "Cobrança por uso", tone: "amber" },
              { title: "Mobile 3.0", tone: "rose" },
            ],
          },
          {
            label: "Entregue",
            cards: [{ title: "Exportação de auditoria", tone: "emerald" }],
          },
        ],
        chart: { title: "Tempo de ciclo", value: "2,4d", delta: "-38% neste trimestre" },
        activity: {
          title: "Aprovações",
          items: [
            { initials: "NG", text: "Nina aprovou o QA de design", time: "2m" },
            { initials: "RT", text: "Rafael integrou a API de cobrança", time: "14m" },
            { initials: "LS", text: "Lena lançou o beta do Mobile 3.0", time: "1h" },
          ],
        },
      },
    },
    features: {
      label: "Produto",
      title: "Um workspace, três superpoderes",
      intro:
        "Alterne entre planejar, acompanhar e reportar sem trocar de ferramenta — tudo permanece em sincronia, até a última subtarefa.",
      tabs: [
        {
          id: "plan",
          label: "Planejar",
          title: "Planeje do jeito que seus times realmente trabalham",
          body: "Kanban, sprints e roadmaps compartilham uma única fonte de verdade. Reordene prioridades e cada data dependente é recalculada na hora.",
          bullets: [
            "Dependências entre times mapeadas automaticamente",
            "Planejamento de capacidade com disponibilidade real",
            "Templates para lançamentos, auditorias e OKRs",
          ],
        },
        {
          id: "track",
          label: "Acompanhar",
          title: "Veja todos os projetos sem pedir status a ninguém",
          body: "Painéis ao vivo substituem reuniões de status. Responsáveis, riscos e progresso se atualizam em tempo real a partir do próprio trabalho.",
          bullets: [
            "Alertas de risco antes de o prazo estourar",
            "Visão de portfólio com mais de 100 times",
            "Desempenho instantâneo com um milhão de tarefas",
          ],
        },
        {
          id: "report",
          label: "Reportar",
          title: "Relatórios que a diretoria realmente lê",
          body: "O Pulse transforma dados de entrega em narrativa: velocidade, tempo de ciclo e pontualidade — bonitos por padrão, exportáveis para qualquer lugar.",
          bullets: [
            "Apresentações prontas para o conselho em um clique",
            "Métricas personalizadas com barra de fórmulas",
            "Resumos agendados por e-mail e Slack",
          ],
        },
      ],
      plan: {
        hint: "Experimente — clique em um card para avançá-lo no fluxo",
        columns: ["Backlog", "Em andamento", "Concluído"],
        cards: [
          { id: "rate-limit", title: "Limite de requisições da API", tag: "Plataforma", initials: "AK", tone: "violet", col: 0 },
          { id: "onboarding", title: "Onboarding do app", tag: "Design", initials: "LM", tone: "rose", col: 0 },
          { id: "billing", title: "Migração de cobrança", tag: "Backend", initials: "RN", tone: "amber", col: 1 },
          { id: "churn", title: "Painel de churn", tag: "Growth", initials: "PS", tone: "emerald", col: 1 },
          { id: "tokens", title: "Auditoria de tokens", tag: "Design", initials: "JO", tone: "blue", col: 2 },
        ],
      },
      track: {
        headers: { task: "Iniciativa", owner: "Responsável", status: "Status", due: "Prazo", progress: "Progresso" },
        statuses: { onTrack: "No prazo", atRisk: "Em risco", done: "Concluído" },
        rows: [
          { task: "Novo checkout", owner: "Marina Duarte", status: "onTrack", due: "12 ago", progress: 72 },
          { task: "Implantação de SSO", owner: "Tobias Lang", status: "atRisk", due: "5 ago", progress: 41 },
          { task: "Sincronização do data warehouse", owner: "Priya Shah", status: "onTrack", due: "22 ago", progress: 58 },
          { task: "Beta do Mobile 3.0", owner: "Caio Mendes", status: "done", due: "30 jul", progress: 100 },
        ],
      },
      report: {
        title: "Velocidade de entrega",
        subtitle: "Pontos por sprint",
        bars: [
          { label: "S1", value: 42 },
          { label: "S2", value: 48 },
          { label: "S3", value: 45 },
          { label: "S4", value: 56 },
          { label: "S5", value: 61 },
          { label: "S6", value: 67 },
        ],
        stats: [
          { label: "Entregas no prazo", value: "94%", delta: "+6 pts", up: true },
          { label: "Tempo de ciclo", value: "2,4d", delta: "-38%", up: true },
          { label: "Iniciativas ativas", value: "128", delta: "+12", up: true },
        ],
      },
    },
    integrations: {
      label: "Integrações",
      title: "Conversa com toda a sua stack",
      intro:
        "Integrações nativas e bidirecionais — nada de webhooks frágeis. Busque no catálogo ou navegue por categoria.",
      searchLabel: "Buscar integrações",
      searchPlaceholder: "Buscar integrações…",
      clearLabel: "Limpar busca",
      showing: "Exibindo",
      of: "de",
      itemsWord: "integrações",
      emptyTitle: "Nenhum resultado para essa busca",
      emptyBody: "Tente um termo mais curto — ou conte o que falta e nós construímos.",
      requestCta: "Pedir uma integração",
      allLabel: "Todas",
      categories: [
        { id: "comms", label: "Comunicação" },
        { id: "dev", label: "Desenvolvimento" },
        { id: "design", label: "Design" },
        { id: "ops", label: "Operações" },
      ],
      items: [
        { name: "Slack", category: "comms", blurb: "Transforme threads em tarefas rastreadas" },
        { name: "Microsoft Teams", category: "comms", blurb: "Atualizações onde sua empresa já conversa" },
        { name: "Zoom", category: "comms", blurb: "Notas de reunião anexadas ao trabalho" },
        { name: "GitHub", category: "dev", blurb: "Pull requests movem os cards sozinhos" },
        { name: "GitLab", category: "dev", blurb: "Pipelines atualizam o status de entrega" },
        { name: "Jira", category: "dev", blurb: "Sincronização bidirecional na migração" },
        { name: "Linear", category: "dev", blurb: "Espelhe issues entre as ferramentas" },
        { name: "Figma", category: "design", blurb: "Embeds ao vivo em cada briefing" },
        { name: "Miro", category: "design", blurb: "Workshops viram planos estruturados" },
        { name: "Notion", category: "ops", blurb: "Docs conectados a prazos reais" },
        { name: "Google Drive", category: "ops", blurb: "Arquivos com permissões preservadas" },
        { name: "Salesforce", category: "ops", blurb: "Contexto de receita em cada projeto" },
        { name: "Okta", category: "ops", blurb: "Provisione usuários com SCIM" },
        { name: "Zapier", category: "ops", blurb: "Mais de 6.000 apps, sem código" },
      ],
    },
    security: {
      label: "Segurança",
      title: "Nível enterprise, por padrão",
      intro:
        "No Orbitflow, segurança não é um plano à parte. Todos os planos incluem os controles que o seu time de compliance pergunta primeiro.",
      items: [
        {
          icon: "shield",
          title: "SOC 2 Type II",
          body: "Auditoria anual por avaliadores independentes; relatório completo disponível sob NDA.",
        },
        {
          icon: "key",
          title: "SSO e SCIM",
          body: "SAML 2.0 com Okta, Azure AD e Google Workspace, além de provisionamento automático.",
        },
        {
          icon: "lock",
          title: "Criptografia em tudo",
          body: "AES-256 em repouso, TLS 1.3 em trânsito e chaves gerenciadas pelo cliente no Enterprise.",
        },
        {
          icon: "fingerprint",
          title: "Permissões granulares",
          body: "Acesso por papel até o nível de campo, com contas de convidado em sandbox.",
        },
        {
          icon: "globe",
          title: "Residência de dados",
          body: "Escolha hospedar nos EUA, na UE ou no Brasil sem abrir mão de nenhum recurso.",
        },
        {
          icon: "activity",
          title: "Trilha de auditoria completa",
          body: "Cada ação registrada, exportável e transmissível direto para o seu SIEM.",
        },
      ],
      badges: ["SOC 2 Type II", "ISO 27001", "GDPR", "LGPD"],
      uptimeValue: "99,99%",
      uptimeLabel: "de SLA de uptime nos últimos 12 meses",
    },
    pricing: {
      label: "Planos",
      title: "Preços que crescem com você, não contra você",
      intro:
        "Comece grátis e evolua quando a empresa inteira chegar. Todos os planos incluem visualizadores ilimitados.",
      monthly: "Mensal",
      annual: "Anual",
      saveBadge: "Economize 20%",
      perSeat: "por usuário / mês",
      billedAnnually: "cobrado anualmente",
      billedMonthly: "cobrado mensalmente",
      popularBadge: "Mais popular",
      tiers: [
        {
          id: "starter",
          name: "Starter",
          blurb: "Para times colocando os primeiros 50 projetos em ordem.",
          priceMonthly: "R$ 59",
          priceAnnual: "R$ 47",
          features: [
            "Projetos e tarefas ilimitados",
            "Visões kanban, lista e calendário",
            "10 integrações nativas",
            "Suporte da comunidade",
          ],
          cta: "Teste grátis",
        },
        {
          id: "scale",
          name: "Scale",
          blurb: "Para empresas coordenando trabalho entre departamentos.",
          priceMonthly: "R$ 139",
          priceAnnual: "R$ 111",
          popular: true,
          features: [
            "Tudo do Starter",
            "Visão de portfólio e relatórios Pulse",
            "Integrações e API ilimitadas",
            "SSO (SAML) e provisionamento SCIM",
            "Suporte prioritário, resposta em 4h",
          ],
          cta: "Teste grátis",
        },
        {
          id: "enterprise",
          name: "Enterprise",
          blurb: "Para organizações com compras, revisão de segurança e mais de 1.000 assentos.",
          customLabel: "Sob consulta",
          features: [
            "Tudo do Scale",
            "Chaves de criptografia gerenciadas pelo cliente",
            "Residência de dados (EUA, UE, BR)",
            "Arquiteto de sucesso dedicado",
            "SLA de uptime de 99,99%",
          ],
          cta: "Falar com vendas",
        },
      ],
      footnote: "Preços sem impostos. Planos anuais são cobrados uma vez ao ano.",
    },
    quotes: {
      label: "Clientes",
      title: "Times que migraram, ficaram",
      intro:
        "De scale-ups a empresas de capital aberto — veja o que muda quando o trabalho encontra a própria órbita.",
      featured: {
        quote:
          "Substituímos quatro ferramentas e a reunião de status de segunda pelo Orbitflow. As entregas subiram, as reuniões caíram e o deck do conselho se monta sozinho.",
        name: "Mariana Duarte",
        role: "COO",
        company: "Trilha Fintech",
        metric: "-38%",
        metricLabel: "no tempo de ciclo já no primeiro trimestre",
        imageAlt: "Time de operações da Trilha Fintech analisando um painel de entregas em conjunto",
      },
      quotes: [
        {
          quote:
            "A migração do Jira levou uma tarde. A sincronização bidirecional garantiu zero indisponibilidade para 900 pessoas de engenharia.",
          name: "Thomas Berger",
          role: "VP de Engenharia",
          company: "Nordwind Labs",
        },
        {
          quote:
            "O Pulse encerrou a era dos decks de status feitos de print. Minha liderança finalmente lê os números.",
          name: "Aiko Tanaka",
          role: "Líder de Produto",
          company: "Kumo Systems",
        },
        {
          quote:
            "A revisão de segurança mais rápida que já fizemos. Relatório SOC 2, DPA e respostas de residência em uma única pasta.",
          name: "Daniel Okafor",
          role: "CISO",
          company: "Meridian Health",
        },
        {
          quote:
            "Gerenciamos a abertura de 140 lojas pelo Orbitflow. Os alertas de risco salvaram nosso lançamento em Barcelona duas vezes.",
          name: "Sofía Herrera",
          role: "Diretora de Expansão",
          company: "Andina Retail",
        },
        {
          quote:
            "Planejamento de capacidade que respeita férias e plantão. Meu time parou de se esgotar para cumprir datas.",
          name: "Rafael Nogueira",
          role: "CTO",
          company: "Vela Energia",
        },
      ],
    },
    cta: {
      title: "Coloque seu trabalho em órbita",
      sub: "Grátis por 14 dias. Sem cartão de crédito e sem call de vendas — convide o time e sinta a diferença até sexta.",
      emailLabel: "E-mail corporativo",
      emailPlaceholder: "voce@empresa.com.br",
      button: "Começar agora",
      errorInvalid: "Digite um e-mail corporativo válido",
      successTitle: "Confira sua caixa de entrada",
      successBody: "Abra o link mágico que acabamos de enviar para lançar o seu workspace.",
      another: "Usar outro e-mail",
      finePrint: "Teste de 14 dias · Conforme SOC 2 · Cancele quando quiser",
      imageAlt: "Time de produto e engenharia colaborando em um escritório moderno",
    },
    footer: {
      blurb: "Controle de missão para o trabalho enterprise. Feito com cuidado em São Paulo e Lisboa.",
      columns: [
        {
          title: "Produto",
          links: [
            { href: "#product", label: "Recursos" },
            { href: "#integrations", label: "Integrações" },
            { href: "#security", label: "Segurança" },
            { href: "#pricing", label: "Planos" },
          ],
        },
        {
          title: "Empresa",
          links: [
            { href: "#customers", label: "Clientes" },
            { href: "#top", label: "Sobre" },
            { href: "#top", label: "Carreiras" },
            { href: "#top", label: "Imprensa" },
          ],
        },
        {
          title: "Recursos",
          links: [
            { href: "#top", label: "Documentação" },
            { href: "#top", label: "Referência da API" },
            { href: "#top", label: "Status" },
            { href: "#top", label: "Comunidade" },
          ],
        },
        {
          title: "Legal",
          links: [
            { href: "#top", label: "Privacidade" },
            { href: "#top", label: "Termos" },
            { href: "#top", label: "DPA" },
            { href: "#top", label: "Suboperadores" },
          ],
        },
      ],
      socials: [
        { id: "globe", label: "Site" },
        { id: "at", label: "Newsletter" },
        { id: "chat", label: "Chat da comunidade" },
      ],
      statusLabel: "Todos os sistemas operacionais",
      copyright: "© 2026 Orbitflow, Inc. Todos os direitos reservados.",
    },
  },

  /* ---------------------------------------------------------------- */
  /* Español                                                           */
  /* ---------------------------------------------------------------- */
  es: {
    nav: {
      links: [
        { href: "#product", label: "Producto" },
        { href: "#integrations", label: "Integraciones" },
        { href: "#security", label: "Seguridad" },
        { href: "#pricing", label: "Precios" },
        { href: "#customers", label: "Clientes" },
      ],
      login: "Iniciar sesión",
      cta: "Empieza gratis",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
    },
    hero: {
      badge: "Nuevo · Informes Pulse ya disponibles",
      titleTop: "Control de misión",
      titleAccent: "para el trabajo enterprise",
      sub: "Orbitflow reúne planificación, seguimiento e informes en un workspace rápido y sereno — la confianza de equipos de 50 personas y despliegues de 50.000.",
      ctaPrimary: "Prueba gratuita",
      ctaSecondary: "Ver el tour de 3 min",
      trustNote: "La confianza de equipos de operaciones e ingeniería en",
      logos: ["Nordwind Labs", "Trilha", "Kumo Systems", "Andina Retail", "Meridian Health", "Vela Energia"],
      mock: {
        windowTitle: "Programa Atlas · T3",
        sidebar: ["Roadmap", "Sprints", "Docs", "Informes"],
        columns: [
          {
            label: "Ahora",
            cards: [
              { title: "Nuevo checkout", tone: "blue" },
              { title: "Despliegue de SSO", tone: "violet" },
            ],
          },
          {
            label: "Después",
            cards: [
              { title: "Facturación por uso", tone: "amber" },
              { title: "Móvil 3.0", tone: "rose" },
            ],
          },
          {
            label: "Entregado",
            cards: [{ title: "Exportación de auditoría", tone: "emerald" }],
          },
        ],
        chart: { title: "Tiempo de ciclo", value: "2,4d", delta: "-38% este trimestre" },
        activity: {
          title: "Aprobaciones",
          items: [
            { initials: "NG", text: "Nina aprobó el QA de diseño", time: "2m" },
            { initials: "RT", text: "Rafael integró la API de facturación", time: "14m" },
            { initials: "LS", text: "Lena lanzó la beta de Móvil 3.0", time: "1h" },
          ],
        },
      },
    },
    features: {
      label: "Producto",
      title: "Un workspace, tres superpoderes",
      intro:
        "Pasa de planificar a seguir y reportar sin cambiar de herramienta — todo permanece sincronizado hasta la última subtarea.",
      tabs: [
        {
          id: "plan",
          label: "Planificar",
          title: "Planifica como tus equipos trabajan de verdad",
          body: "Kanban, sprints y roadmaps comparten una única fuente de verdad. Reordena prioridades y cada fecha dependiente se recalcula al instante.",
          bullets: [
            "Dependencias entre equipos mapeadas automáticamente",
            "Planificación de capacidad con disponibilidad real",
            "Plantillas para lanzamientos, auditorías y OKR",
          ],
        },
        {
          id: "track",
          label: "Seguir",
          title: "Ve cada proyecto sin pedir el estado a nadie",
          body: "Los paneles en vivo sustituyen a las reuniones de estado. Responsables, riesgo y progreso se actualizan en tiempo real desde el propio trabajo.",
          bullets: [
            "Alertas de riesgo antes de que la fecha se escape",
            "Visión de cartera con más de 100 equipos",
            "Rendimiento instantáneo con un millón de tareas",
          ],
        },
        {
          id: "report",
          label: "Reportar",
          title: "Informes que tu comité de dirección lee de verdad",
          body: "Pulse convierte los datos de entrega en una narrativa: velocidad, tiempo de ciclo y puntualidad — bonitos por defecto y exportables a todas partes.",
          bullets: [
            "Presentaciones listas para el consejo en un clic",
            "Métricas personalizadas con barra de fórmulas",
            "Resúmenes programados por correo y Slack",
          ],
        },
      ],
      plan: {
        hint: "Pruébalo — haz clic en una tarjeta para avanzarla en el flujo",
        columns: ["Backlog", "En curso", "Hecho"],
        cards: [
          { id: "rate-limit", title: "Límite de peticiones de la API", tag: "Plataforma", initials: "AK", tone: "violet", col: 0 },
          { id: "onboarding", title: "Onboarding de la app", tag: "Diseño", initials: "LM", tone: "rose", col: 0 },
          { id: "billing", title: "Migración de facturación", tag: "Backend", initials: "RN", tone: "amber", col: 1 },
          { id: "churn", title: "Panel de churn", tag: "Growth", initials: "PS", tone: "emerald", col: 1 },
          { id: "tokens", title: "Auditoría de tokens", tag: "Diseño", initials: "JO", tone: "blue", col: 2 },
        ],
      },
      track: {
        headers: { task: "Iniciativa", owner: "Responsable", status: "Estado", due: "Fecha", progress: "Progreso" },
        statuses: { onTrack: "En plazo", atRisk: "En riesgo", done: "Hecho" },
        rows: [
          { task: "Nuevo checkout", owner: "Marina Duarte", status: "onTrack", due: "12 ago", progress: 72 },
          { task: "Despliegue de SSO", owner: "Tobias Lang", status: "atRisk", due: "5 ago", progress: 41 },
          { task: "Sincronización del data warehouse", owner: "Priya Shah", status: "onTrack", due: "22 ago", progress: 58 },
          { task: "Beta de Móvil 3.0", owner: "Caio Mendes", status: "done", due: "30 jul", progress: 100 },
        ],
      },
      report: {
        title: "Velocidad de entrega",
        subtitle: "Puntos por sprint",
        bars: [
          { label: "S1", value: 42 },
          { label: "S2", value: 48 },
          { label: "S3", value: 45 },
          { label: "S4", value: 56 },
          { label: "S5", value: 61 },
          { label: "S6", value: 67 },
        ],
        stats: [
          { label: "Entregas a tiempo", value: "94%", delta: "+6 pts", up: true },
          { label: "Tiempo de ciclo", value: "2,4d", delta: "-38%", up: true },
          { label: "Iniciativas activas", value: "128", delta: "+12", up: true },
        ],
      },
    },
    integrations: {
      label: "Integraciones",
      title: "Se lleva bien con todo tu stack",
      intro:
        "Integraciones nativas y bidireccionales — nada de webhooks frágiles. Busca en el catálogo o navega por categoría.",
      searchLabel: "Buscar integraciones",
      searchPlaceholder: "Buscar integraciones…",
      clearLabel: "Borrar búsqueda",
      showing: "Mostrando",
      of: "de",
      itemsWord: "integraciones",
      emptyTitle: "Sin resultados para esa búsqueda",
      emptyBody: "Prueba con un término más corto — o cuéntanos qué falta y lo construimos.",
      requestCta: "Solicitar una integración",
      allLabel: "Todas",
      categories: [
        { id: "comms", label: "Comunicación" },
        { id: "dev", label: "Desarrollo" },
        { id: "design", label: "Diseño" },
        { id: "ops", label: "Operaciones" },
      ],
      items: [
        { name: "Slack", category: "comms", blurb: "Convierte hilos en tareas con seguimiento" },
        { name: "Microsoft Teams", category: "comms", blurb: "Novedades donde tu empresa ya conversa" },
        { name: "Zoom", category: "comms", blurb: "Las notas de reunión se adjuntan al trabajo" },
        { name: "GitHub", category: "dev", blurb: "Las pull requests mueven las tarjetas solas" },
        { name: "GitLab", category: "dev", blurb: "Los pipelines actualizan el estado de entrega" },
        { name: "Jira", category: "dev", blurb: "Sincronización bidireccional en la migración" },
        { name: "Linear", category: "dev", blurb: "Refleja issues entre ambas herramientas" },
        { name: "Figma", category: "design", blurb: "Embeds en vivo dentro de cada brief" },
        { name: "Miro", category: "design", blurb: "Los talleres se vuelven planes estructurados" },
        { name: "Notion", category: "ops", blurb: "Docs conectados a plazos reales" },
        { name: "Google Drive", category: "ops", blurb: "Archivos con los permisos intactos" },
        { name: "Salesforce", category: "ops", blurb: "Contexto de ingresos en cada proyecto" },
        { name: "Okta", category: "ops", blurb: "Aprovisiona usuarios con SCIM" },
        { name: "Zapier", category: "ops", blurb: "Más de 6.000 apps sin código" },
      ],
    },
    security: {
      label: "Seguridad",
      title: "Nivel enterprise, de serie",
      intro:
        "En Orbitflow la seguridad no es un plan aparte. Cada plan incluye los controles por los que tu equipo de compliance pregunta primero.",
      items: [
        {
          icon: "shield",
          title: "SOC 2 Type II",
          body: "Auditoría anual por evaluadores independientes; informe completo disponible bajo NDA.",
        },
        {
          icon: "key",
          title: "SSO y SCIM",
          body: "SAML 2.0 con Okta, Azure AD y Google Workspace, más aprovisionamiento automático.",
        },
        {
          icon: "lock",
          title: "Cifrado en todo",
          body: "AES-256 en reposo, TLS 1.3 en tránsito y claves gestionadas por el cliente en Enterprise.",
        },
        {
          icon: "fingerprint",
          title: "Permisos granulares",
          body: "Acceso por roles hasta el nivel de campo, con cuentas de invitado en sandbox.",
        },
        {
          icon: "globe",
          title: "Residencia de datos",
          body: "Elige alojamiento en EE. UU., la UE o Brasil sin renunciar a ninguna función.",
        },
        {
          icon: "activity",
          title: "Registro de auditoría completo",
          body: "Cada acción queda registrada, exportable y transmisible directamente a tu SIEM.",
        },
      ],
      badges: ["SOC 2 Type II", "ISO 27001", "GDPR", "LGPD"],
      uptimeValue: "99,99%",
      uptimeLabel: "de SLA de disponibilidad en los últimos 12 meses",
    },
    pricing: {
      label: "Precios",
      title: "Precios que crecen contigo, no contra ti",
      intro:
        "Empieza gratis y sube de plan cuando llegue toda la organización. Todos los planes incluyen lectores ilimitados.",
      monthly: "Mensual",
      annual: "Anual",
      saveBadge: "Ahorra 20%",
      perSeat: "por usuario / mes",
      billedAnnually: "facturado anualmente",
      billedMonthly: "facturado mensualmente",
      popularBadge: "El más popular",
      tiers: [
        {
          id: "starter",
          name: "Starter",
          blurb: "Para equipos que ponen en orden sus primeros 50 proyectos.",
          priceMonthly: "11 €",
          priceAnnual: "9 €",
          features: [
            "Proyectos y tareas ilimitados",
            "Vistas kanban, lista y calendario",
            "10 integraciones nativas",
            "Soporte de la comunidad",
          ],
          cta: "Prueba gratuita",
        },
        {
          id: "scale",
          name: "Scale",
          blurb: "Para empresas que coordinan trabajo entre departamentos.",
          priceMonthly: "26 €",
          priceAnnual: "21 €",
          popular: true,
          features: [
            "Todo lo de Starter",
            "Visión de cartera e informes Pulse",
            "Integraciones y API ilimitadas",
            "SSO (SAML) y aprovisionamiento SCIM",
            "Soporte prioritario, respuesta en 4h",
          ],
          cta: "Prueba gratuita",
        },
        {
          id: "enterprise",
          name: "Enterprise",
          blurb: "Para organizaciones con compras, revisiones de seguridad y más de 1.000 puestos.",
          customLabel: "A medida",
          features: [
            "Todo lo de Scale",
            "Claves de cifrado gestionadas por el cliente",
            "Residencia de datos (EE. UU., UE, BR)",
            "Arquitecto de éxito dedicado",
            "SLA de disponibilidad del 99,99%",
          ],
          cta: "Hablar con ventas",
        },
      ],
      footnote: "Precios sin impuestos. Los planes anuales se facturan una vez al año.",
    },
    quotes: {
      label: "Clientes",
      title: "Equipos que migraron y se quedaron",
      intro:
        "De scale-ups a empresas cotizadas — esto es lo que cambia cuando el trabajo encuentra su órbita.",
      featured: {
        quote:
          "Sustituimos cuatro herramientas y la reunión de estado de los lunes por Orbitflow. Las entregas suben, las reuniones bajan y el deck del consejo se monta solo.",
        name: "Mariana Duarte",
        role: "COO",
        company: "Trilha Fintech",
        metric: "-38%",
        metricLabel: "de tiempo de ciclo en el primer trimestre",
        imageAlt: "Equipo de operaciones de Trilha Fintech revisando juntos un panel de entregas",
      },
      quotes: [
        {
          quote:
            "La migración desde Jira llevó una tarde. La sincronización bidireccional supuso cero paradas para 900 ingenieros.",
          name: "Thomas Berger",
          role: "VP de Ingeniería",
          company: "Nordwind Labs",
        },
        {
          quote:
            "Pulse acabó con la era de los decks de estado hechos de capturas. Mi equipo directivo por fin lee los números.",
          name: "Aiko Tanaka",
          role: "Líder de Producto",
          company: "Kumo Systems",
        },
        {
          quote:
            "La revisión de seguridad más rápida que hemos hecho. Informe SOC 2, DPA y respuestas de residencia en una sola carpeta.",
          name: "Daniel Okafor",
          role: "CISO",
          company: "Meridian Health",
        },
        {
          quote:
            "Gestionamos la apertura de 140 tiendas con Orbitflow. Las alertas de riesgo salvaron nuestro lanzamiento de Barcelona dos veces.",
          name: "Sofía Herrera",
          role: "Directora de Expansión",
          company: "Andina Retail",
        },
        {
          quote:
            "Planificación de capacidad que respeta vacaciones y guardias. Mi equipo dejó de quemarse para cumplir fechas.",
          name: "Rafael Nogueira",
          role: "CTO",
          company: "Vela Energia",
        },
      ],
    },
    cta: {
      title: "Pon tu trabajo en órbita",
      sub: "Gratis durante 14 días. Sin tarjeta y sin llamada comercial — invita a tu equipo y nota la diferencia antes del viernes.",
      emailLabel: "Correo de trabajo",
      emailPlaceholder: "tu@empresa.com",
      button: "Empezar",
      errorInvalid: "Introduce un correo de trabajo válido",
      successTitle: "Revisa tu bandeja de entrada",
      successBody: "Abre el enlace mágico que acabamos de enviarte para lanzar tu workspace.",
      another: "Usar otro correo",
      finePrint: "Prueba de 14 días · Conforme SOC 2 · Cancela cuando quieras",
      imageAlt: "Equipo de producto e ingeniería colaborando en una oficina moderna",
    },
    footer: {
      blurb: "Control de misión para el trabajo enterprise. Hecho con mimo en São Paulo y Lisboa.",
      columns: [
        {
          title: "Producto",
          links: [
            { href: "#product", label: "Funciones" },
            { href: "#integrations", label: "Integraciones" },
            { href: "#security", label: "Seguridad" },
            { href: "#pricing", label: "Precios" },
          ],
        },
        {
          title: "Compañía",
          links: [
            { href: "#customers", label: "Clientes" },
            { href: "#top", label: "Sobre nosotros" },
            { href: "#top", label: "Empleo" },
            { href: "#top", label: "Prensa" },
          ],
        },
        {
          title: "Recursos",
          links: [
            { href: "#top", label: "Documentación" },
            { href: "#top", label: "Referencia de la API" },
            { href: "#top", label: "Estado" },
            { href: "#top", label: "Comunidad" },
          ],
        },
        {
          title: "Legal",
          links: [
            { href: "#top", label: "Privacidad" },
            { href: "#top", label: "Términos" },
            { href: "#top", label: "DPA" },
            { href: "#top", label: "Subencargados" },
          ],
        },
      ],
      socials: [
        { id: "globe", label: "Sitio web" },
        { id: "at", label: "Newsletter" },
        { id: "chat", label: "Chat de la comunidad" },
      ],
      statusLabel: "Todos los sistemas operativos",
      copyright: "© 2026 Orbitflow, Inc. Todos los derechos reservados.",
    },
  },
};
