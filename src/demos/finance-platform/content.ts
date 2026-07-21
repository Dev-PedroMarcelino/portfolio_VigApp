import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Shared, locale-independent data (numerals, ids, geometry)           */
/* ------------------------------------------------------------------ */

export type TxCategory =
  | "income"
  | "transfer"
  | "shopping"
  | "dining"
  | "subscription"
  | "transport";

export type WhenKey = "today" | "yesterday" | "thisWeek";

/** A single ledger row. Merchant/people names are proper nouns kept universal. */
export interface TxSeed {
  id: string;
  category: TxCategory;
  merchant: string;
  when: WhenKey;
  time: string;
  amount: number;
}

/** Ledger, newest first. Positive amounts are credits. */
export const TRANSACTIONS: TxSeed[] = [
  { id: "tx-01", category: "income", merchant: "Nuvex Payroll", when: "today", time: "08:02", amount: 8420 },
  { id: "tx-02", category: "dining", merchant: "Koya Ramen Bar", when: "today", time: "13:41", amount: -28.5 },
  { id: "tx-03", category: "transfer", merchant: "Amara Okafor", when: "today", time: "17:26", amount: -320 },
  { id: "tx-04", category: "subscription", merchant: "Lumen Music", when: "yesterday", time: "06:00", amount: -11.99 },
  { id: "tx-05", category: "shopping", merchant: "Vertex Store", when: "yesterday", time: "11:18", amount: -184.2 },
  { id: "tx-06", category: "transport", merchant: "Orbit Transit", when: "yesterday", time: "19:55", amount: -14.4 },
  { id: "tx-07", category: "income", merchant: "Vertex Refund", when: "thisWeek", time: "09:31", amount: 62.9 },
  { id: "tx-08", category: "dining", merchant: "Blue Fig Cafe", when: "thisWeek", time: "08:47", amount: -9.8 },
  { id: "tx-09", category: "shopping", merchant: "Aeon Electronics", when: "thisWeek", time: "15:02", amount: -549 },
  { id: "tx-10", category: "transfer", merchant: "Lucas Almeida", when: "thisWeek", time: "21:14", amount: -140 },
];

/** Current available balance (whole units, formatted per locale currency). */
export const BALANCE = 24186.42;
export const MONTH_IN = 9241.6;
export const MONTH_OUT = 4318.27;

/** 30-day balance sparkline, normalized 0..1 heights derived below in the UI. */
export const BALANCE_TREND = [
  32, 34, 33, 37, 40, 38, 42, 46, 44, 49, 52, 50, 55, 58, 56, 61, 64, 62, 67, 71,
  69, 74, 77, 75, 80, 84, 82, 88, 92, 96,
];

export type GoalId = "safety" | "japan" | "loft" | "tesla";

export interface GoalSeed {
  id: GoalId;
  saved: number;
  target: number;
  color: string;
}

/** Savings goals; pct is derived from saved / target at render time. */
export const GOALS: GoalSeed[] = [
  { id: "safety", saved: 12800, target: 16000, color: "#34D399" },
  { id: "japan", saved: 4260, target: 9000, color: "#22D3EE" },
  { id: "loft", saved: 31500, target: 60000, color: "#A78BFA" },
  { id: "tesla", saved: 7100, target: 8000, color: "#FBBF24" },
];

export type PlanId = "standard" | "metal" | "business";

/** Localized plan prices live in each dictionary; ids and accents are shared. */
export const PLAN_ACCENTS: Record<PlanId, string> = {
  standard: "#7E8CA0",
  metal: "#10B981",
  business: "#A78BFA",
};

/** People you can send money to in the transfer flow (proper nouns). */
export interface RecipientSeed {
  id: string;
  name: string;
  handle: string;
  initials: string;
  color: string;
}

export const RECIPIENTS: RecipientSeed[] = [
  { id: "r1", name: "Amara Okafor", handle: "@amara", initials: "AO", color: "#34D399" },
  { id: "r2", name: "Lucas Almeida", handle: "@lucasalm", initials: "LA", color: "#22D3EE" },
  { id: "r3", name: "Sofia Marchetti", handle: "@sofiam", initials: "SM", color: "#A78BFA" },
  { id: "r4", name: "Diego Fernández", handle: "@diegof", initials: "DF", color: "#FBBF24" },
  { id: "r5", name: "Yara Nakamura", handle: "@yara", initials: "YN", color: "#F472B6" },
];

/* ------------------------------------------------------------------ */
/* Content shape                                                        */
/* ------------------------------------------------------------------ */

export interface NavLink {
  href: string;
  label: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  body: string;
}

export interface PlanContent {
  id: PlanId;
  name: string;
  tag: string;
  price: string;
  cadence: string;
  yearlyNote: string;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

export interface NuvexContent {
  localeTag: string;
  currency: string;
  header: {
    nav: NavLink[];
    signIn: string;
    cta: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    badge: string;
    titleLead: string;
    titleAccent: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: HeroStat[];
    card: {
      network: string;
      label: string;
      holder: string;
      holderLabel: string;
      number: string;
      validLabel: string;
      valid: string;
      balanceLabel: string;
      hint: string;
    };
  };
  dashboard: {
    label: string;
    title: string;
    intro: string;
    balanceLabel: string;
    inLabel: string;
    outLabel: string;
    trendLabel: string;
    transferCta: string;
    requestCta: string;
    txTitle: string;
    filters: { id: TxCategory | "all"; label: string }[];
    whenLabels: Record<WhenKey, string>;
    categoryLabels: Record<TxCategory, string>;
    emptyState: string;
    creditPrefix: string;
  };
  transfer: {
    title: string;
    stepRecipient: string;
    stepAmount: string;
    stepConfirm: string;
    searchPlaceholder: string;
    recentLabel: string;
    amountLabel: string;
    noteLabel: string;
    notePlaceholder: string;
    feeLabel: string;
    feeValue: string;
    arrivalLabel: string;
    arrivalValue: string;
    back: string;
    continue: string;
    send: string;
    sendingLabel: string;
    successTitle: string;
    successBody: string;
    successRef: string;
    done: string;
    toLabel: string;
    close: string;
    insufficient: string;
    quickAmounts: number[];
  };
  savings: {
    label: string;
    title: string;
    intro: string;
    savedLabel: string;
    ofLabel: string;
    completeLabel: string;
    goals: Record<GoalId, { name: string; note: string }>;
    totalLabel: string;
    addGoal: string;
  };
  security: {
    label: string;
    title: string;
    intro: string;
    imageAlt: string;
    features: FeatureItem[];
    statusLabel: string;
    statusValue: string;
  };
  pricing: {
    label: string;
    title: string;
    intro: string;
    monthly: string;
    yearly: string;
    yearlyBadge: string;
    perMonth: string;
    plans: PlanContent[];
    plansYearly: Record<PlanId, { price: string; yearlyNote: string }>;
  };
  cta: {
    badge: string;
    title: string;
    body: string;
    ctaPrimary: string;
    ctaSecondary: string;
    disclaimer: string;
  };
  footer: {
    tagline: string;
    columns: { title: string; links: string[] }[];
    social: { icon: string; label: string; handle: string }[];
    legal: string;
    licence: string;
  };
}

/* ------------------------------------------------------------------ */
/* Dictionary                                                           */
/* ------------------------------------------------------------------ */

export const nuvexDict: DemoDictionary<NuvexContent> = {
  en: {
    localeTag: "en-US",
    currency: "USD",
    header: {
      nav: [
        { href: "account", label: "Account" },
        { href: "transfers", label: "Transfers" },
        { href: "savings", label: "Savings" },
        { href: "security", label: "Security" },
        { href: "pricing", label: "Plans" },
      ],
      signIn: "Sign in",
      cta: "Open account",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      badge: "Now live in 34 markets",
      titleLead: "Banking that moves",
      titleAccent: "at the speed of you.",
      subtitle:
        "Nuvex is the obsidian-grade account for people who expect more. Instant transfers, autonomous savings and card controls that answer in milliseconds.",
      ctaPrimary: "Open your account",
      ctaSecondary: "See it move",
      stats: [
        { value: "2.4M", label: "Accounts opened" },
        { value: "0.9s", label: "Median transfer" },
        { value: "$14B", label: "Moved this year" },
      ],
      card: {
        network: "Nuvex Metal",
        label: "Signature",
        holder: "A. OKAFOR",
        holderLabel: "Cardholder",
        number: "4919  ••••  ••••  6042",
        validLabel: "Valid thru",
        valid: "09 / 29",
        balanceLabel: "Available",
        hint: "Move your cursor across the card",
      },
    },
    dashboard: {
      label: "The account",
      title: "Every number, alive in real time.",
      intro:
        "A single obsidian dashboard for balances, cash flow and movement. Filter the ledger, watch totals recompute and move money without leaving the screen.",
      balanceLabel: "Available balance",
      inLabel: "In this month",
      outLabel: "Out this month",
      trendLabel: "30-day balance",
      transferCta: "Transfer",
      requestCta: "Request",
      txTitle: "Recent activity",
      filters: [
        { id: "all", label: "All" },
        { id: "income", label: "Income" },
        { id: "transfer", label: "Transfers" },
        { id: "shopping", label: "Shopping" },
        { id: "dining", label: "Dining" },
        { id: "subscription", label: "Subscriptions" },
        { id: "transport", label: "Transport" },
      ],
      whenLabels: { today: "Today", yesterday: "Yesterday", thisWeek: "This week" },
      categoryLabels: {
        income: "Income",
        transfer: "Transfer",
        shopping: "Shopping",
        dining: "Dining",
        subscription: "Subscription",
        transport: "Transport",
      },
      emptyState: "No movement in this category yet.",
      creditPrefix: "Received from",
    },
    transfer: {
      title: "Send money",
      stepRecipient: "Recipient",
      stepAmount: "Amount",
      stepConfirm: "Confirm",
      searchPlaceholder: "Search name or @handle",
      recentLabel: "Recent recipients",
      amountLabel: "How much are you sending?",
      noteLabel: "Note",
      notePlaceholder: "Add a note (optional)",
      feeLabel: "Nuvex fee",
      feeValue: "Free",
      arrivalLabel: "Arrives",
      arrivalValue: "In seconds",
      back: "Back",
      continue: "Continue",
      send: "Slide to send",
      sendingLabel: "Sending",
      successTitle: "Money is on its way",
      successBody: "Your transfer to {name} was sent instantly.",
      successRef: "Reference",
      done: "Done",
      toLabel: "To",
      close: "Close transfer",
      insufficient: "Amount exceeds your balance",
      quickAmounts: [50, 100, 250, 500],
    },
    savings: {
      label: "Autonomous savings",
      title: "Goals that fund themselves.",
      intro:
        "Round-ups, scheduled sweeps and salary splits push money toward what matters. Watch each ring fill as your future takes shape.",
      savedLabel: "Saved",
      ofLabel: "of",
      completeLabel: "complete",
      goals: {
        safety: { name: "Safety net", note: "Six months of runway" },
        japan: { name: "Japan in spring", note: "Two weeks, Tokyo to Kyoto" },
        loft: { name: "Downtown loft", note: "Deposit and moving fund" },
        tesla: { name: "New wheels", note: "Electric, ordered by winter" },
      },
      totalLabel: "Total set aside",
      addGoal: "Create a goal",
    },
    security: {
      label: "Security",
      title: "Guarded down to the silicon.",
      intro:
        "Every session is watched by adaptive models and sealed by hardware. You stay in control with instant card locks and clear, human alerts.",
      imageAlt: "A Nuvex metal card resting on a dark surface under emerald light",
      features: [
        { icon: "fingerprint", title: "Biometric unlock", body: "Face and fingerprint gates on every sensitive action, backed by a secure enclave." },
        { icon: "scan-face", title: "Adaptive fraud AI", body: "Models score each transaction in real time and freeze anything that feels off." },
        { icon: "lock", title: "One-tap card lock", body: "Freeze, unfreeze or kill a card in a single tap, worldwide, with no call center." },
        { icon: "shield-check", title: "Insured deposits", body: "Balances are held with regulated partners and protected up to statutory limits." },
        { icon: "bell-ring", title: "Human-clear alerts", body: "Plain-language notifications the instant money moves, with one-tap dispute." },
        { icon: "key-round", title: "Passkey sign-in", body: "No passwords to steal. Sign in with a device-bound passkey and nothing else." },
      ],
      statusLabel: "Live security status",
      statusValue: "All systems nominal",
    },
    pricing: {
      label: "Plans",
      title: "Pick your metal.",
      intro:
        "Start free and upgrade the moment you want more. No hidden fees, no minimum balance, cancel any time.",
      monthly: "Monthly",
      yearly: "Yearly",
      yearlyBadge: "Save 20%",
      perMonth: "/ mo",
      plans: [
        {
          id: "standard",
          name: "Standard",
          tag: "For everyday",
          price: "$0",
          cadence: "/ mo",
          yearlyNote: "Always free",
          description: "The everyday account with everything you need to move money.",
          features: ["Virtual and physical card", "Instant Nuvex transfers", "2 savings goals", "Real-time alerts"],
          cta: "Start free",
        },
        {
          id: "metal",
          name: "Metal",
          tag: "Most popular",
          price: "$12",
          cadence: "/ mo",
          yearlyNote: "Billed yearly",
          description: "Brushed metal card, richer rewards and priority support.",
          features: ["Everything in Standard", "Emerald metal card", "Unlimited savings goals", "1.2% savings boost", "Fee-free spending abroad"],
          cta: "Go Metal",
          featured: true,
        },
        {
          id: "business",
          name: "Business",
          tag: "For teams",
          price: "$29",
          cadence: "/ mo",
          yearlyNote: "Billed yearly",
          description: "Multi-user accounts, corporate cards and accounting sync.",
          features: ["Everything in Metal", "Up to 20 team cards", "Spend limits and roles", "Accounting integrations", "Dedicated manager"],
          cta: "Start Business",
        },
      ],
      plansYearly: {
        standard: { price: "$0", yearlyNote: "Always free" },
        metal: { price: "$115", yearlyNote: "Billed yearly, save 20%" },
        business: { price: "$278", yearlyNote: "Billed yearly, save 20%" },
      },
    },
    cta: {
      badge: "Two minutes to open",
      title: "Your obsidian account is waiting.",
      body: "Join 2.4 million people who moved their money to Nuvex. Open an account in minutes, straight from your phone.",
      ctaPrimary: "Open your account",
      ctaSecondary: "Talk to us",
      disclaimer: "Nuvex is a concept experience. No real accounts, cards or money are involved.",
    },
    footer: {
      tagline: "Banking that moves at the speed of you.",
      columns: [
        { title: "Product", links: ["Personal account", "Metal card", "Savings goals", "Transfers", "Business"] },
        { title: "Company", links: ["About Nuvex", "Careers", "Press", "Newsroom"] },
        { title: "Support", links: ["Help center", "Security", "Status", "Contact"] },
      ],
      social: [
        { icon: "at-sign", label: "Threads", handle: "@nuvex" },
        { icon: "camera", label: "Photos", handle: "@nuvex.money" },
        { icon: "message-circle", label: "Community", handle: "nuvex.chat" },
      ],
      legal: "Nuvex Financial, a fictional concept crafted by VigApp.",
      licence: "Not a licensed institution. Figures shown are illustrative.",
    },
  },

  pt: {
    localeTag: "pt-BR",
    currency: "BRL",
    header: {
      nav: [
        { href: "account", label: "Conta" },
        { href: "transfers", label: "Transferências" },
        { href: "savings", label: "Objetivos" },
        { href: "security", label: "Segurança" },
        { href: "pricing", label: "Planos" },
      ],
      signIn: "Entrar",
      cta: "Abrir conta",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
    },
    hero: {
      badge: "Agora em 34 países",
      titleLead: "Um banco que se move",
      titleAccent: "na sua velocidade.",
      subtitle:
        "A Nuvex é a conta obsidiana para quem espera mais. Transferências instantâneas, poupança autônoma e controle de cartão que responde em milissegundos.",
      ctaPrimary: "Abrir sua conta",
      ctaSecondary: "Ver em ação",
      stats: [
        { value: "2,4M", label: "Contas abertas" },
        { value: "0,9s", label: "Transferência média" },
        { value: "R$ 72bi", label: "Movimentados no ano" },
      ],
      card: {
        network: "Nuvex Metal",
        label: "Signature",
        holder: "A. OKAFOR",
        holderLabel: "Titular",
        number: "4919  ••••  ••••  6042",
        validLabel: "Válido até",
        valid: "09 / 29",
        balanceLabel: "Disponível",
        hint: "Passe o cursor sobre o cartão",
      },
    },
    dashboard: {
      label: "A conta",
      title: "Cada número, vivo em tempo real.",
      intro:
        "Um único painel obsidiana para saldos, fluxo de caixa e movimento. Filtre o extrato, veja os totais recalcularem e movimente dinheiro sem sair da tela.",
      balanceLabel: "Saldo disponível",
      inLabel: "Entradas do mês",
      outLabel: "Saídas do mês",
      trendLabel: "Saldo em 30 dias",
      transferCta: "Transferir",
      requestCta: "Cobrar",
      txTitle: "Atividade recente",
      filters: [
        { id: "all", label: "Tudo" },
        { id: "income", label: "Entradas" },
        { id: "transfer", label: "Transferências" },
        { id: "shopping", label: "Compras" },
        { id: "dining", label: "Restaurantes" },
        { id: "subscription", label: "Assinaturas" },
        { id: "transport", label: "Transporte" },
      ],
      whenLabels: { today: "Hoje", yesterday: "Ontem", thisWeek: "Esta semana" },
      categoryLabels: {
        income: "Entrada",
        transfer: "Transferência",
        shopping: "Compra",
        dining: "Restaurante",
        subscription: "Assinatura",
        transport: "Transporte",
      },
      emptyState: "Ainda não há movimento nesta categoria.",
      creditPrefix: "Recebido de",
    },
    transfer: {
      title: "Enviar dinheiro",
      stepRecipient: "Destinatário",
      stepAmount: "Valor",
      stepConfirm: "Confirmar",
      searchPlaceholder: "Buscar nome ou @usuário",
      recentLabel: "Destinatários recentes",
      amountLabel: "Quanto você quer enviar?",
      noteLabel: "Mensagem",
      notePlaceholder: "Adicionar mensagem (opcional)",
      feeLabel: "Taxa Nuvex",
      feeValue: "Grátis",
      arrivalLabel: "Chega em",
      arrivalValue: "Segundos",
      back: "Voltar",
      continue: "Continuar",
      send: "Deslize para enviar",
      sendingLabel: "Enviando",
      successTitle: "O dinheiro está a caminho",
      successBody: "Sua transferência para {name} foi enviada na hora.",
      successRef: "Referência",
      done: "Concluir",
      toLabel: "Para",
      close: "Fechar transferência",
      insufficient: "O valor excede seu saldo",
      quickAmounts: [50, 100, 250, 500],
    },
    savings: {
      label: "Poupança autônoma",
      title: "Objetivos que se financiam sozinhos.",
      intro:
        "Arredondamentos, aportes agendados e divisão do salário empurram dinheiro para o que importa. Veja cada anel encher enquanto seu futuro toma forma.",
      savedLabel: "Guardado",
      ofLabel: "de",
      completeLabel: "concluído",
      goals: {
        safety: { name: "Reserva de emergência", note: "Seis meses de tranquilidade" },
        japan: { name: "Japão na primavera", note: "Duas semanas, Tóquio a Kyoto" },
        loft: { name: "Loft no centro", note: "Entrada e mudança" },
        tesla: { name: "Carro novo", note: "Elétrico, até o inverno" },
      },
      totalLabel: "Total reservado",
      addGoal: "Criar objetivo",
    },
    security: {
      label: "Segurança",
      title: "Protegido até o silício.",
      intro:
        "Cada sessão é observada por modelos adaptativos e selada por hardware. Você mantém o controle com bloqueios instantâneos e alertas claros.",
      imageAlt: "Um cartão metal Nuvex sobre uma superfície escura sob luz esmeralda",
      features: [
        { icon: "fingerprint", title: "Desbloqueio biométrico", body: "Rosto e digital em toda ação sensível, com enclave de segurança dedicado." },
        { icon: "scan-face", title: "IA antifraude adaptativa", body: "Modelos avaliam cada transação em tempo real e congelam o que parece suspeito." },
        { icon: "lock", title: "Bloqueio em um toque", body: "Congele, libere ou cancele um cartão com um toque, no mundo todo, sem central." },
        { icon: "shield-check", title: "Depósitos protegidos", body: "Saldos custodiados por parceiros regulados e protegidos até os limites legais." },
        { icon: "bell-ring", title: "Alertas humanos", body: "Notificações em linguagem clara no instante em que o dinheiro se move." },
        { icon: "key-round", title: "Login por passkey", body: "Sem senhas para roubar. Entre com uma passkey ligada ao seu aparelho." },
      ],
      statusLabel: "Status de segurança",
      statusValue: "Todos os sistemas normais",
    },
    pricing: {
      label: "Planos",
      title: "Escolha o seu metal.",
      intro:
        "Comece grátis e evolua quando quiser mais. Sem taxas escondidas, sem saldo mínimo, cancele quando quiser.",
      monthly: "Mensal",
      yearly: "Anual",
      yearlyBadge: "Economize 20%",
      perMonth: "/ mês",
      plans: [
        {
          id: "standard",
          name: "Standard",
          tag: "Para o dia a dia",
          price: "R$ 0",
          cadence: "/ mês",
          yearlyNote: "Sempre grátis",
          description: "A conta do dia a dia com tudo para movimentar dinheiro.",
          features: ["Cartão virtual e físico", "Transferências Nuvex na hora", "2 objetivos de poupança", "Alertas em tempo real"],
          cta: "Começar grátis",
        },
        {
          id: "metal",
          name: "Metal",
          tag: "Mais popular",
          price: "R$ 34",
          cadence: "/ mês",
          yearlyNote: "Cobrado anualmente",
          description: "Cartão de metal escovado, mais recompensas e suporte prioritário.",
          features: ["Tudo do Standard", "Cartão metal esmeralda", "Objetivos ilimitados", "1,2% a mais na poupança", "Gastos no exterior sem taxa"],
          cta: "Quero Metal",
          featured: true,
        },
        {
          id: "business",
          name: "Business",
          tag: "Para times",
          price: "R$ 79",
          cadence: "/ mês",
          yearlyNote: "Cobrado anualmente",
          description: "Contas multiusuário, cartões corporativos e integração contábil.",
          features: ["Tudo do Metal", "Até 20 cartões da equipe", "Limites e papéis", "Integrações contábeis", "Gerente dedicado"],
          cta: "Começar Business",
        },
      ],
      plansYearly: {
        standard: { price: "R$ 0", yearlyNote: "Sempre grátis" },
        metal: { price: "R$ 326", yearlyNote: "Anual, economize 20%" },
        business: { price: "R$ 758", yearlyNote: "Anual, economize 20%" },
      },
    },
    cta: {
      badge: "Dois minutos para abrir",
      title: "Sua conta obsidiana está esperando.",
      body: "Junte-se a 2,4 milhões de pessoas que trouxeram o dinheiro para a Nuvex. Abra a conta em minutos, direto do celular.",
      ctaPrimary: "Abrir sua conta",
      ctaSecondary: "Fale conosco",
      disclaimer: "A Nuvex é uma experiência conceitual. Nenhuma conta, cartão ou dinheiro real está envolvido.",
    },
    footer: {
      tagline: "Um banco que se move na sua velocidade.",
      columns: [
        { title: "Produto", links: ["Conta pessoal", "Cartão metal", "Objetivos", "Transferências", "Business"] },
        { title: "Empresa", links: ["Sobre a Nuvex", "Carreiras", "Imprensa", "Novidades"] },
        { title: "Suporte", links: ["Central de ajuda", "Segurança", "Status", "Contato"] },
      ],
      social: [
        { icon: "at-sign", label: "Threads", handle: "@nuvex" },
        { icon: "camera", label: "Fotos", handle: "@nuvex.money" },
        { icon: "message-circle", label: "Comunidade", handle: "nuvex.chat" },
      ],
      legal: "Nuvex Financial, um conceito fictício criado pela VigApp.",
      licence: "Não é uma instituição licenciada. Os valores são ilustrativos.",
    },
  },

  es: {
    localeTag: "es-ES",
    currency: "EUR",
    header: {
      nav: [
        { href: "account", label: "Cuenta" },
        { href: "transfers", label: "Transferencias" },
        { href: "savings", label: "Objetivos" },
        { href: "security", label: "Seguridad" },
        { href: "pricing", label: "Planes" },
      ],
      signIn: "Entrar",
      cta: "Abrir cuenta",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
    },
    hero: {
      badge: "Ya en 34 países",
      titleLead: "Un banco que se mueve",
      titleAccent: "a tu velocidad.",
      subtitle:
        "Nuvex es la cuenta obsidiana para quien espera más. Transferencias instantáneas, ahorro autónomo y control de tarjeta que responde en milisegundos.",
      ctaPrimary: "Abre tu cuenta",
      ctaSecondary: "Verlo en acción",
      stats: [
        { value: "2,4M", label: "Cuentas abiertas" },
        { value: "0,9s", label: "Transferencia media" },
        { value: "13.000M€", label: "Movidos este año" },
      ],
      card: {
        network: "Nuvex Metal",
        label: "Signature",
        holder: "A. OKAFOR",
        holderLabel: "Titular",
        number: "4919  ••••  ••••  6042",
        validLabel: "Válida hasta",
        valid: "09 / 29",
        balanceLabel: "Disponible",
        hint: "Mueve el cursor sobre la tarjeta",
      },
    },
    dashboard: {
      label: "La cuenta",
      title: "Cada cifra, viva en tiempo real.",
      intro:
        "Un único panel obsidiana para saldos, flujo de caja y movimiento. Filtra el historial, mira los totales recalcularse y mueve dinero sin salir de la pantalla.",
      balanceLabel: "Saldo disponible",
      inLabel: "Entradas del mes",
      outLabel: "Salidas del mes",
      trendLabel: "Saldo a 30 días",
      transferCta: "Transferir",
      requestCta: "Solicitar",
      txTitle: "Actividad reciente",
      filters: [
        { id: "all", label: "Todo" },
        { id: "income", label: "Ingresos" },
        { id: "transfer", label: "Transferencias" },
        { id: "shopping", label: "Compras" },
        { id: "dining", label: "Restaurantes" },
        { id: "subscription", label: "Suscripciones" },
        { id: "transport", label: "Transporte" },
      ],
      whenLabels: { today: "Hoy", yesterday: "Ayer", thisWeek: "Esta semana" },
      categoryLabels: {
        income: "Ingreso",
        transfer: "Transferencia",
        shopping: "Compra",
        dining: "Restaurante",
        subscription: "Suscripción",
        transport: "Transporte",
      },
      emptyState: "Aún no hay movimientos en esta categoría.",
      creditPrefix: "Recibido de",
    },
    transfer: {
      title: "Enviar dinero",
      stepRecipient: "Destinatario",
      stepAmount: "Importe",
      stepConfirm: "Confirmar",
      searchPlaceholder: "Buscar nombre o @usuario",
      recentLabel: "Destinatarios recientes",
      amountLabel: "¿Cuánto quieres enviar?",
      noteLabel: "Concepto",
      notePlaceholder: "Añade un concepto (opcional)",
      feeLabel: "Comisión Nuvex",
      feeValue: "Gratis",
      arrivalLabel: "Llega en",
      arrivalValue: "Segundos",
      back: "Atrás",
      continue: "Continuar",
      send: "Desliza para enviar",
      sendingLabel: "Enviando",
      successTitle: "El dinero va en camino",
      successBody: "Tu transferencia a {name} se envió al instante.",
      successRef: "Referencia",
      done: "Hecho",
      toLabel: "Para",
      close: "Cerrar transferencia",
      insufficient: "El importe supera tu saldo",
      quickAmounts: [50, 100, 250, 500],
    },
    savings: {
      label: "Ahorro autónomo",
      title: "Objetivos que se financian solos.",
      intro:
        "Redondeos, aportes programados y división de nómina empujan dinero hacia lo que importa. Mira cada anillo llenarse mientras tu futuro toma forma.",
      savedLabel: "Ahorrado",
      ofLabel: "de",
      completeLabel: "completado",
      goals: {
        safety: { name: "Colchón de seguridad", note: "Seis meses de calma" },
        japan: { name: "Japón en primavera", note: "Dos semanas, Tokio a Kioto" },
        loft: { name: "Loft en el centro", note: "Entrada y mudanza" },
        tesla: { name: "Coche nuevo", note: "Eléctrico, antes del invierno" },
      },
      totalLabel: "Total apartado",
      addGoal: "Crear objetivo",
    },
    security: {
      label: "Seguridad",
      title: "Protegido hasta el silicio.",
      intro:
        "Cada sesión la vigilan modelos adaptativos y la sella el hardware. Tú mantienes el control con bloqueos instantáneos y alertas claras.",
      imageAlt: "Una tarjeta metal Nuvex sobre una superficie oscura bajo luz esmeralda",
      features: [
        { icon: "fingerprint", title: "Desbloqueo biométrico", body: "Cara y huella en cada acción sensible, con enclave de seguridad dedicado." },
        { icon: "scan-face", title: "IA antifraude adaptativa", body: "Los modelos puntúan cada transacción en tiempo real y congelan lo sospechoso." },
        { icon: "lock", title: "Bloqueo con un toque", body: "Congela, reactiva o cancela una tarjeta con un toque, en todo el mundo." },
        { icon: "shield-check", title: "Depósitos protegidos", body: "Saldos custodiados por socios regulados y protegidos hasta el límite legal." },
        { icon: "bell-ring", title: "Alertas claras", body: "Avisos en lenguaje sencillo en cuanto el dinero se mueve, con disputa en un toque." },
        { icon: "key-round", title: "Acceso con passkey", body: "Sin contraseñas que robar. Entra con una passkey ligada a tu dispositivo." },
      ],
      statusLabel: "Estado de seguridad",
      statusValue: "Todos los sistemas normales",
    },
    pricing: {
      label: "Planes",
      title: "Elige tu metal.",
      intro:
        "Empieza gratis y mejora cuando quieras más. Sin comisiones ocultas, sin saldo mínimo, cancela cuando quieras.",
      monthly: "Mensual",
      yearly: "Anual",
      yearlyBadge: "Ahorra 20%",
      perMonth: "/ mes",
      plans: [
        {
          id: "standard",
          name: "Standard",
          tag: "Para el día a día",
          price: "0 €",
          cadence: "/ mes",
          yearlyNote: "Siempre gratis",
          description: "La cuenta del día a día con todo para mover tu dinero.",
          features: ["Tarjeta virtual y física", "Transferencias Nuvex al instante", "2 objetivos de ahorro", "Alertas en tiempo real"],
          cta: "Empezar gratis",
        },
        {
          id: "metal",
          name: "Metal",
          tag: "Más popular",
          price: "11 €",
          cadence: "/ mes",
          yearlyNote: "Facturado anual",
          description: "Tarjeta de metal cepillado, más recompensas y soporte prioritario.",
          features: ["Todo lo de Standard", "Tarjeta metal esmeralda", "Objetivos ilimitados", "1,2% extra de ahorro", "Gastos en el extranjero sin comisión"],
          cta: "Quiero Metal",
          featured: true,
        },
        {
          id: "business",
          name: "Business",
          tag: "Para equipos",
          price: "27 €",
          cadence: "/ mes",
          yearlyNote: "Facturado anual",
          description: "Cuentas multiusuario, tarjetas corporativas y sincronía contable.",
          features: ["Todo lo de Metal", "Hasta 20 tarjetas de equipo", "Límites y roles", "Integraciones contables", "Gestor dedicado"],
          cta: "Empezar Business",
        },
      ],
      plansYearly: {
        standard: { price: "0 €", yearlyNote: "Siempre gratis" },
        metal: { price: "106 €", yearlyNote: "Anual, ahorra 20%" },
        business: { price: "259 €", yearlyNote: "Anual, ahorra 20%" },
      },
    },
    cta: {
      badge: "Dos minutos para abrir",
      title: "Tu cuenta obsidiana te espera.",
      body: "Únete a 2,4 millones de personas que llevaron su dinero a Nuvex. Abre una cuenta en minutos, desde el móvil.",
      ctaPrimary: "Abre tu cuenta",
      ctaSecondary: "Habla con nosotros",
      disclaimer: "Nuvex es una experiencia conceptual. No hay cuentas, tarjetas ni dinero reales.",
    },
    footer: {
      tagline: "Un banco que se mueve a tu velocidad.",
      columns: [
        { title: "Producto", links: ["Cuenta personal", "Tarjeta metal", "Objetivos", "Transferencias", "Business"] },
        { title: "Empresa", links: ["Sobre Nuvex", "Empleo", "Prensa", "Novedades"] },
        { title: "Soporte", links: ["Centro de ayuda", "Seguridad", "Estado", "Contacto"] },
      ],
      social: [
        { icon: "at-sign", label: "Threads", handle: "@nuvex" },
        { icon: "camera", label: "Fotos", handle: "@nuvex.money" },
        { icon: "message-circle", label: "Comunidad", handle: "nuvex.chat" },
      ],
      legal: "Nuvex Financial, un concepto ficticio creado por VigApp.",
      licence: "No es una entidad regulada. Las cifras son ilustrativas.",
    },
  },
};
