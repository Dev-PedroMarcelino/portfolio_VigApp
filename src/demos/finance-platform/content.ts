import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Shared, locale-independent data (numerals, ids, geometry)           */
/*                                                                     */
/* Zela is a Brazilian digital account: every figure is R$ (BRL) and   */
/* is formatted with the pt-BR locale in EVERY language on purpose —   */
/* the product is Brazilian, the interface language merely translates. */
/* ------------------------------------------------------------------ */

/** Balance shown in the hero app mock and in the "Modo Rua" demo. */
export const APP_BALANCE = 4826.9;

export type HeroTxId = "tx-ana" | "tx-ifood" | "tx-uber" | "tx-salario";
export type HeroTxIcon = "pix" | "food" | "ride" | "salary";

export interface HeroTxSeed {
  id: HeroTxId;
  icon: HeroTxIcon;
  amount: number;
}

/** Hero app mock ledger, newest first. Positive amounts are credits. */
export const HERO_TXS: HeroTxSeed[] = [
  { id: "tx-ana", icon: "pix", amount: 120 },
  { id: "tx-ifood", icon: "food", amount: -54.9 },
  { id: "tx-uber", icon: "ride", amount: -18.6 },
  { id: "tx-salario", icon: "salary", amount: 3900 },
];

export type PixContactId = "ana" | "jorge" | "cida" | "rafa";

export interface PixContactSeed {
  id: PixContactId;
  name: string;
  initials: string;
  color: string;
}

/** Pix flow contacts (proper nouns stay universal; key hints localize). */
export const PIX_CONTACTS: PixContactSeed[] = [
  { id: "ana", name: "Ana Beatriz", initials: "AB", color: "#166B4A" },
  { id: "jorge", name: "Padaria do Seu Jorge", initials: "PJ", color: "#B4741E" },
  { id: "cida", name: "Dona Cida", initials: "DC", color: "#C05B41" },
  { id: "rafa", name: "Rafa Martins", initials: "RM", color: "#3E7C68" },
];

export type BoxId = "reserva" | "ape" | "jeri" | "mae";
export type BoxIcon = "umbrella" | "house" | "tree-palm" | "gift";

export interface BoxSeed {
  id: BoxId;
  icon: BoxIcon;
  saved: number;
  target: number;
  color: string;
}

/** Caixinhas (savings boxes); pct derives from saved / target at render. */
export const BOXES: BoxSeed[] = [
  { id: "reserva", icon: "umbrella", saved: 6400, target: 12000, color: "#166B4A" },
  { id: "ape", icon: "house", saved: 18750, target: 60000, color: "#B4741E" },
  { id: "jeri", icon: "tree-palm", saved: 2150, target: 4500, color: "#5F8F3E" },
  { id: "mae", icon: "gift", saved: 380, target: 600, color: "#C05B41" },
];

/* Savings simulator — illustrative fixed rate of 0.9% per month. */
export const SIM_MONTHLY_RATE = 0.009;
export const SIM_MIN = 50;
export const SIM_MAX = 2000;
export const SIM_STEP = 50;
export const SIM_DEFAULT = 300;
export const SIM_YEARS = [1, 2, 3, 5, 10];

/** Future value of monthly deposits P over n months at rate i (compound). */
export function simulate(monthly: number, months: number): {
  total: number;
  deposited: number;
  earned: number;
} {
  const i = SIM_MONTHLY_RATE;
  const total = monthly * ((Math.pow(1 + i, months) - 1) / i);
  const deposited = monthly * months;
  return { total, deposited, earned: total - deposited };
}

export type FeeId = "manutencao" | "ted" | "anuidade" | "saque";

export interface FeeSeed {
  id: FeeId;
  /** What the traditional bank charges over a year, in R$. */
  bankPerYear: number;
}

export const FEE_ROWS: FeeSeed[] = [
  { id: "manutencao", bankPerYear: 298.8 },
  { id: "ted", bankPerYear: 216 },
  { id: "anuidade", bankPerYear: 178.8 },
  { id: "saque", bankPerYear: 165.6 },
];

export const FEE_TOTAL_YEAR = FEE_ROWS.reduce((sum, r) => sum + r.bankPerYear, 0);

/* Sketchfab model for the Zela Metal card (CC-BY). */
export const CARD_MODEL = {
  uid: "b6cff2460421408f84c9af7a85ce906e",
  thumb:
    "https://media.sketchfab.com/models/b6cff2460421408f84c9af7a85ce906e/thumbnails/9a39a45965a74faa808d3c4cee76fd2d/32cc070606934640b0f268baf0b1abba.jpeg",
  credit: { model: "Metal Credit Card", author: "Maxitaxx" },
};

/* ------------------------------------------------------------------ */
/* Content shape                                                        */
/* ------------------------------------------------------------------ */

export interface NavLink {
  href: string;
  label: string;
}

export type PixBulletIcon = "users" | "receipt" | "moon-star";
export type BenefitIcon = "circle-check" | "hand-coins" | "zap" | "smartphone";
export type SecurityIcon = "eye-off" | "shield-alert" | "scan-face" | "moon-star";

export interface ZelaContent {
  header: {
    nav: NavLink[];
    cta: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    badge: string;
    titleLead: string;
    titleAccent: string;
    titleEnd: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trust: string[];
    app: {
      greeting: string;
      profileInitial: string;
      balanceLabel: string;
      showBalance: string;
      hideBalance: string;
      hiddenValue: string;
      yieldChip: string;
      actions: { pix: string; pay: string; boxes: string; card: string };
      statementTitle: string;
      txs: Record<HeroTxId, { title: string; meta: string }>;
      floatPix: string;
      floatYield: string;
    };
  };
  pix: {
    label: string;
    titleLead: string;
    titleAccent: string;
    intro: string;
    bullets: { icon: PixBulletIcon; title: string; body: string }[];
    flow: {
      steps: [string, string, string];
      toWhom: string;
      contacts: Record<PixContactId, { keyHint: string }>;
      howMuch: string;
      sendingTo: string;
      confirm: string;
      back: string;
      digitLabel: string;
      eraseLabel: string;
      receiptTitle: string;
      receiptSub: string;
      toLabel: string;
      amountLabel: string;
      whenLabel: string;
      whenValue: string;
      feeLabel: string;
      feeValue: string;
      idLabel: string;
      again: string;
    };
  };
  boxes: {
    label: string;
    titleLead: string;
    titleAccent: string;
    titleEnd: string;
    intro: string;
    yieldChip: string;
    ofLabel: string;
    goals: Record<BoxId, { name: string; note: string }>;
    sim: {
      title: string;
      subtitle: string;
      monthlyLabel: string;
      sliderAria: string;
      periodLabel: string;
      yearTabs: string[];
      resultLabel: string;
      depositLabel: string;
      yieldLabel: string;
      note: string;
    };
  };
  card: {
    label: string;
    badge: string;
    titleLead: string;
    titleAccent: string;
    intro: string;
    viewerTitle: string;
    loadLabel: string;
    hint: string;
    benefits: { icon: BenefitIcon; title: string; body: string }[];
  };
  security: {
    label: string;
    titleLead: string;
    titleAccent: string;
    intro: string;
    blocks: { id: string; icon: SecurityIcon; title: string; body: string }[];
    streetDemo: {
      balanceLabel: string;
      on: string;
      off: string;
      toggleLabel: string;
    };
  };
  fees: {
    label: string;
    titleLead: string;
    titleAccent: string;
    intro: string;
    colService: string;
    colZela: string;
    colBank: string;
    free: string;
    rows: Record<FeeId, { label: string; bankNote: string }>;
    perYearLabel: string;
    totalLabel: string;
    totalNote: string;
  };
  cta: {
    titleLead: string;
    titleAccent: string;
    titleEnd: string;
    body: string;
    ctaPrimary: string;
    note: string;
    steps: string[];
  };
  footer: {
    tagline: string;
    columns: { title: string; links: string[] }[];
    disclaimer: string;
    made: string;
  };
}

/* ------------------------------------------------------------------ */
/* Dictionary — pt is the native voice; en/es keep R$ and Pix intact.  */
/* ------------------------------------------------------------------ */

export const zelaDict: DemoDictionary<ZelaContent> = {
  en: {
    header: {
      nav: [
        { href: "conta", label: "Account" },
        { href: "pix", label: "Pix" },
        { href: "caixinhas", label: "Caixinhas" },
        { href: "cartao", label: "Card" },
        { href: "seguranca", label: "Security" },
        { href: "tarifas", label: "Fees" },
      ],
      cta: "Open a free account",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      badge: "A free digital account, made in Brazil",
      titleLead: "A bank that",
      titleAccent: "cares",
      titleEnd: "for your money.",
      subtitle:
        "Pix at the speed of your life, savings boxes that earn every single day and a metal card with zero fees. One light, warm account — no fine print.",
      ctaPrimary: "Open a free account",
      ctaSecondary: "Meet the card",
      trust: ["Pix in seconds", "Savings earn 105% of CDI", "No fees, no surprises"],
      app: {
        greeting: "Oi, Marina",
        profileInitial: "M",
        balanceLabel: "Available balance",
        showBalance: "Show balance",
        hideBalance: "Hide balance",
        hiddenValue: "R$ ••••••",
        yieldChip: "Earning 105% of CDI",
        actions: { pix: "Pix", pay: "Pay", boxes: "Caixinhas", card: "Card" },
        statementTitle: "Latest activity",
        txs: {
          "tx-ana": { title: "Pix received from Ana", meta: "Today · 09:12" },
          "tx-ifood": { title: "iFood · lunch", meta: "Today · 12:40" },
          "tx-uber": { title: "Uber · Downtown", meta: "Yesterday · 18:25" },
          "tx-salario": { title: "Salary · Estúdio Ipê", meta: "Friday · 08:00" },
        },
        floatPix: "Pix in 2s",
        floatYield: "105% of CDI",
      },
    },
    pix: {
      label: "Pix, the Zela way",
      titleLead: "Pix in",
      titleAccent: "three taps.",
      intro:
        "Pick a contact, type the amount, confirm. The money lands in seconds — and so does the receipt. Go ahead, try it right here.",
      bullets: [
        {
          icon: "users",
          title: "Favorite contacts",
          body: "Your Pix keys, saved with care: phone, e-mail, even the bakery's CNPJ.",
        },
        {
          icon: "receipt",
          title: "Instant receipt",
          body: "A tidy proof of payment, ready to share in the family group chat.",
        },
        {
          icon: "moon-star",
          title: "Night-time limits",
          body: "Lower limits after 8pm, exactly as Brazil's Central Bank recommends.",
        },
      ],
      flow: {
        steps: ["Contact", "Amount", "Receipt"],
        toWhom: "Who are you paying?",
        contacts: {
          ana: { keyHint: "key: mobile number" },
          jorge: { keyHint: "key: bakery CNPJ" },
          cida: { keyHint: "key: e-mail" },
          rafa: { keyHint: "key: random" },
        },
        howMuch: "How much?",
        sendingTo: "Sending to",
        confirm: "Pay with Pix",
        back: "Back",
        digitLabel: "Digit",
        eraseLabel: "Erase last digit",
        receiptTitle: "Pix sent!",
        receiptSub: "The money is already there.",
        toLabel: "To",
        amountLabel: "Amount",
        whenLabel: "When",
        whenValue: "Just now",
        feeLabel: "Fee",
        feeValue: "R$ 0,00",
        idLabel: "Transaction ID",
        again: "Send another Pix",
      },
    },
    boxes: {
      label: "Caixinhas",
      titleLead: "Savings boxes that",
      titleAccent: "actually",
      titleEnd: "earn.",
      intro:
        "Give every dream its own box, earning 105% of CDI with instant withdrawal. Saving feels light when every real has a name.",
      yieldChip: "105% of CDI",
      ofLabel: "of",
      goals: {
        reserva: { name: "Emergency fund", note: "To sleep easy at night" },
        ape: { name: "Apartment down payment", note: "Halfway to the keys" },
        jeri: { name: "New Year's in Jeri", note: "Toes in the sand at midnight" },
        mae: { name: "Gift for mom", note: "Because she deserves it" },
      },
      sim: {
        title: "Run the numbers with us",
        subtitle: "Drag the slider and watch your caixinha grow.",
        monthlyLabel: "Setting aside per month",
        sliderAria: "Amount set aside per month",
        periodLabel: "For",
        yearTabs: ["1 year", "2 years", "3 years", "5 years", "10 years"],
        resultLabel: "You would have",
        depositLabel: "From your pocket",
        yieldLabel: "From interest",
        note: "Illustrative simulation at a fixed 0.9% per month. Actual returns follow the CDI.",
      },
    },
    card: {
      label: "Zela Metal card",
      badge: "Real metal · R$ 0 annual fee",
      titleLead: "Metal outside,",
      titleAccent: "care inside.",
      intro:
        "Spin it around — it's real metal, with none of the fake-premium fees. Credit and debit in one piece, fully controlled from the app.",
      viewerTitle: "Zela Metal card in 3D",
      loadLabel: "View the card in 3D",
      hint: "Drag to spin the card",
      benefits: [
        {
          icon: "circle-check",
          title: "No annual fee. Ever.",
          body: "Zero today, zero always — no 'spend to waive' tricks.",
        },
        {
          icon: "hand-coins",
          title: "1% cashback on everything",
          body: "Money back drops straight into your favorite caixinha.",
        },
        {
          icon: "zap",
          title: "Virtual card, instantly",
          body: "Approved? Shop right away with a virtual number before the metal arrives.",
        },
        {
          icon: "smartphone",
          title: "Full control in the app",
          body: "Lock it, tune limits and follow purchases in real time.",
        },
      ],
    },
    security: {
      label: "Security",
      titleLead: "Security, the",
      titleAccent: "Brazilian way.",
      intro:
        "We know how real life works around here. Zela protects you on the street, on the bus and in the middle of the night — without the drama.",
      blocks: [
        {
          id: "rua",
          icon: "eye-off",
          title: "Street Mode",
          body: "One tap hides your balance and tucks away transfer buttons in crowded places.",
        },
        {
          id: "golpe",
          icon: "shield-alert",
          title: "Pix scam alert",
          body: "Our AI recognizes scam patterns and holds the transfer before the regret.",
        },
        {
          id: "bio",
          icon: "scan-face",
          title: "Biometrics everywhere",
          body: "Face or fingerprint to sign in, pay and change limits. Memorized passwords, never again.",
        },
        {
          id: "noite",
          icon: "moon-star",
          title: "Night-time limits",
          body: "After 8pm, big transfers wait for sunrise. Your sleep and your balance, protected.",
        },
      ],
      streetDemo: {
        balanceLabel: "Balance",
        on: "on",
        off: "off",
        toggleLabel: "Toggle Street Mode",
      },
    },
    fees: {
      label: "Fees",
      titleLead: "Transparency that fits",
      titleAccent: "in one table.",
      intro:
        "At Zela the deal is simple: everything is R$ 0. Compare it with the monthly bill from the usual bank.",
      colService: "Service",
      colZela: "At Zela",
      colBank: "Traditional bank",
      free: "R$ 0",
      rows: {
        manutencao: { label: "Account maintenance", bankNote: "R$ 24,90 per month" },
        ted: { label: "TED to other banks", bankNote: "R$ 9,00 each (2 a month)" },
        anuidade: { label: "Card annual fee", bankNote: "R$ 14,90 per month" },
        saque: { label: "ATM withdrawals", bankNote: "R$ 6,90 each (2 a month)" },
      },
      perYearLabel: "per year",
      totalLabel: "You save per year",
      totalNote: "Estimate based on the average fee bundle of large retail banks.",
    },
    cta: {
      titleLead: "Open your account in",
      titleAccent: "4 minutes,",
      titleEnd: "straight from your phone.",
      body: "No lines, no paperwork, no manager pushing insurance. Just you, your CPF and a cafezinho.",
      ctaPrimary: "Open a free account",
      note: "Available for adults with a valid Brazilian CPF.",
      steps: ["Download the app", "Send your details", "Done — your Pix already works"],
    },
    footer: {
      tagline: "Caring for your money, every day.",
      columns: [
        { title: "Product", links: ["Zela account", "Pix", "Caixinhas", "Zela Metal card"] },
        { title: "Company", links: ["About Zela", "Careers", "Press", "Blog"] },
        { title: "Help", links: ["Help center", "Security", "Fees", "Talk to us"] },
      ],
      disclaimer:
        "Zela is a fictional concept created by VigApp. It is not a financial institution.",
      made: "Made with care, for Brazil.",
    },
  },

  pt: {
    header: {
      nav: [
        { href: "conta", label: "Conta" },
        { href: "pix", label: "Pix" },
        { href: "caixinhas", label: "Caixinhas" },
        { href: "cartao", label: "Cartão" },
        { href: "seguranca", label: "Segurança" },
        { href: "tarifas", label: "Tarifas" },
      ],
      cta: "Abrir conta grátis",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
    },
    hero: {
      badge: "Conta digital gratuita, feita no Brasil",
      titleLead: "Um banco que",
      titleAccent: "zela",
      titleEnd: "pelo seu dinheiro.",
      subtitle:
        "Pix na velocidade da sua vida, caixinhas que rendem todos os dias e um cartão de metal sem anuidade. Tudo numa conta leve e acolhedora — sem letra miúda.",
      ctaPrimary: "Abrir conta grátis",
      ctaSecondary: "Conhecer o cartão",
      trust: ["Pix em segundos", "Caixinhas a 105% do CDI", "Sem tarifas, sem surpresas"],
      app: {
        greeting: "Oi, Marina",
        profileInitial: "M",
        balanceLabel: "Saldo disponível",
        showBalance: "Mostrar saldo",
        hideBalance: "Esconder saldo",
        hiddenValue: "R$ ••••••",
        yieldChip: "Rendendo 105% do CDI",
        actions: { pix: "Pix", pay: "Pagar", boxes: "Caixinhas", card: "Cartão" },
        statementTitle: "Últimos lançamentos",
        txs: {
          "tx-ana": { title: "Pix recebido de Ana", meta: "Hoje · 09:12" },
          "tx-ifood": { title: "iFood · almoço", meta: "Hoje · 12:40" },
          "tx-uber": { title: "Uber · Centro", meta: "Ontem · 18:25" },
          "tx-salario": { title: "Salário · Estúdio Ipê", meta: "Sexta · 08:00" },
        },
        floatPix: "Pix em 2s",
        floatYield: "105% do CDI",
      },
    },
    pix: {
      label: "Pix do jeito Zela",
      titleLead: "Pix em",
      titleAccent: "três toques.",
      intro:
        "Escolha o contato, digite o valor, confirme. O dinheiro chega em segundos — e o comprovante também. Pode testar aqui do lado.",
      bullets: [
        {
          icon: "users",
          title: "Contatos favoritos",
          body: "Suas chaves Pix guardadas com carinho: celular, e-mail e até o CNPJ da padaria.",
        },
        {
          icon: "receipt",
          title: "Comprovante na hora",
          body: "Comprovante caprichado, pronto para mandar no grupo da família.",
        },
        {
          icon: "moon-star",
          title: "Limite noturno",
          body: "Valores menores depois das 20h, do jeitinho que o Banco Central recomenda.",
        },
      ],
      flow: {
        steps: ["Contato", "Valor", "Comprovante"],
        toWhom: "Para quem vai o Pix?",
        contacts: {
          ana: { keyHint: "chave: celular" },
          jorge: { keyHint: "chave: CNPJ da padaria" },
          cida: { keyHint: "chave: e-mail" },
          rafa: { keyHint: "chave: aleatória" },
        },
        howMuch: "Quanto?",
        sendingTo: "Enviando para",
        confirm: "Pagar com Pix",
        back: "Voltar",
        digitLabel: "Dígito",
        eraseLabel: "Apagar último dígito",
        receiptTitle: "Pix enviado!",
        receiptSub: "O dinheiro já chegou lá.",
        toLabel: "Para",
        amountLabel: "Valor",
        whenLabel: "Quando",
        whenValue: "Agora mesmo",
        feeLabel: "Tarifa",
        feeValue: "R$ 0,00",
        idLabel: "ID da transação",
        again: "Fazer outro Pix",
      },
    },
    boxes: {
      label: "Caixinhas",
      titleLead: "Caixinhas que",
      titleAccent: "rendem",
      titleEnd: "de verdade.",
      intro:
        "Separe o dinheiro por sonho, rendendo 105% do CDI com resgate na hora. Guardar fica leve quando cada real tem um nome.",
      yieldChip: "105% do CDI",
      ofLabel: "de",
      goals: {
        reserva: { name: "Reserva de emergência", note: "Para dormir tranquila" },
        ape: { name: "Entrada do apê", note: "Metade do caminho até as chaves" },
        jeri: { name: "Réveillon em Jeri", note: "Virada com os pés na areia" },
        mae: { name: "Presente da mãe", note: "Porque ela merece" },
      },
      sim: {
        title: "Faça as contas com a gente",
        subtitle: "Arraste e veja até onde a sua caixinha vai.",
        monthlyLabel: "Guardando por mês",
        sliderAria: "Valor guardado por mês",
        periodLabel: "Durante",
        yearTabs: ["1 ano", "2 anos", "3 anos", "5 anos", "10 anos"],
        resultLabel: "Você teria",
        depositLabel: "Do seu bolso",
        yieldLabel: "De rendimento",
        note: "Simulação ilustrativa com taxa fixa de 0,9% ao mês. A rentabilidade real acompanha o CDI.",
      },
    },
    card: {
      label: "Cartão Zela Metal",
      badge: "Metal de verdade · anuidade R$ 0",
      titleLead: "Metal por fora,",
      titleAccent: "zelo por dentro.",
      intro:
        "Gire o cartão na tela: é metal de verdade, sem taxa de mentira. Crédito e débito na mesma peça, no seu controle pelo app.",
      viewerTitle: "Cartão Zela Metal em 3D",
      loadLabel: "Ver o cartão em 3D",
      hint: "Arraste para girar o cartão",
      benefits: [
        {
          icon: "circle-check",
          title: "Sem anuidade. Nunca.",
          body: "Zero hoje, zero sempre — sem pegadinha de “isenção por gasto”.",
        },
        {
          icon: "hand-coins",
          title: "Cashback de 1% em tudo",
          body: "O dinheiro de volta cai direto na sua caixinha favorita.",
        },
        {
          icon: "zap",
          title: "Cartão virtual na hora",
          body: "Aprovou, comprou: número virtual pronto antes do físico chegar.",
        },
        {
          icon: "smartphone",
          title: "Controle total no app",
          body: "Bloqueie, ajuste limites e acompanhe cada compra em tempo real.",
        },
      ],
    },
    security: {
      label: "Segurança",
      titleLead: "Segurança do",
      titleAccent: "jeito brasileiro.",
      intro:
        "A gente sabe como a vida real funciona por aqui. Por isso a Zela protege você na rua, no busão e na madrugada — sem complicação.",
      blocks: [
        {
          id: "rua",
          icon: "eye-off",
          title: "Modo Rua",
          body: "Um toque esconde o saldo e recolhe os botões de transferência em lugares movimentados.",
        },
        {
          id: "golpe",
          icon: "shield-alert",
          title: "Alerta de golpe no Pix",
          body: "Nossa IA reconhece padrão de conversa de golpista e segura a transferência antes do arrependimento.",
        },
        {
          id: "bio",
          icon: "scan-face",
          title: "Biometria em tudo",
          body: "Rosto ou digital para entrar, pagar e mexer nos limites. Senha decorada, nunca mais.",
        },
        {
          id: "noite",
          icon: "moon-star",
          title: "Limites noturnos",
          body: "Depois das 20h, transferências grandes esperam o dia amanhecer. Seu sono e seu saldo, protegidos.",
        },
      ],
      streetDemo: {
        balanceLabel: "Saldo",
        on: "ativado",
        off: "desativado",
        toggleLabel: "Ativar ou desativar o Modo Rua",
      },
    },
    fees: {
      label: "Tarifas",
      titleLead: "Transparência que cabe",
      titleAccent: "numa tabela.",
      intro:
        "Na Zela, o combinado não sai caro: é tudo R$ 0. Compare com a mensalidade do banco de sempre.",
      colService: "Serviço",
      colZela: "Na Zela",
      colBank: "No banco tradicional",
      free: "R$ 0",
      rows: {
        manutencao: { label: "Manutenção da conta", bankNote: "R$ 24,90 por mês" },
        ted: { label: "TED para outros bancos", bankNote: "R$ 9,00 cada (2 por mês)" },
        anuidade: { label: "Anuidade do cartão", bankNote: "R$ 14,90 por mês" },
        saque: { label: "Saque na rede 24h", bankNote: "R$ 6,90 cada (2 por mês)" },
      },
      perYearLabel: "por ano",
      totalLabel: "Você economiza por ano",
      totalNote: "Estimativa com o pacote médio de tarifas dos grandes bancos de varejo.",
    },
    cta: {
      titleLead: "Abra sua conta em",
      titleAccent: "4 minutos,",
      titleEnd: "direto do celular.",
      body: "Sem fila, sem papelada, sem gerente empurrando seguro. Só você, seu CPF e um cafezinho.",
      ctaPrimary: "Abrir conta grátis",
      note: "Disponível para maiores de 18 anos com CPF regular.",
      steps: ["Baixe o app", "Mande seus dados", "Pronto: seu Pix já funciona"],
    },
    footer: {
      tagline: "Zelando pelo seu dinheiro, todos os dias.",
      columns: [
        { title: "Produto", links: ["Conta Zela", "Pix", "Caixinhas", "Cartão Zela Metal"] },
        { title: "Empresa", links: ["Sobre a Zela", "Carreiras", "Imprensa", "Blog"] },
        { title: "Ajuda", links: ["Central de ajuda", "Segurança", "Tarifas", "Fale com a gente"] },
      ],
      disclaimer:
        "Zela é um conceito fictício criado pela VigApp. Não é uma instituição financeira.",
      made: "Feito com zelo, para o Brasil.",
    },
  },

  es: {
    header: {
      nav: [
        { href: "conta", label: "Cuenta" },
        { href: "pix", label: "Pix" },
        { href: "caixinhas", label: "Caixinhas" },
        { href: "cartao", label: "Tarjeta" },
        { href: "seguranca", label: "Seguridad" },
        { href: "tarifas", label: "Tarifas" },
      ],
      cta: "Abrir cuenta gratis",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
    },
    hero: {
      badge: "Cuenta digital gratuita, hecha en Brasil",
      titleLead: "Un banco que",
      titleAccent: "cuida",
      titleEnd: "de tu dinero.",
      subtitle:
        "Pix a la velocidad de tu vida, cajitas que rinden todos los días y una tarjeta de metal sin cuota. Todo en una cuenta ligera y cálida — sin letra pequeña.",
      ctaPrimary: "Abrir cuenta gratis",
      ctaSecondary: "Conocer la tarjeta",
      trust: ["Pix en segundos", "Cajitas al 105% del CDI", "Sin tarifas, sin sorpresas"],
      app: {
        greeting: "Oi, Marina",
        profileInitial: "M",
        balanceLabel: "Saldo disponible",
        showBalance: "Mostrar saldo",
        hideBalance: "Ocultar saldo",
        hiddenValue: "R$ ••••••",
        yieldChip: "Rindiendo 105% del CDI",
        actions: { pix: "Pix", pay: "Pagar", boxes: "Caixinhas", card: "Tarjeta" },
        statementTitle: "Últimos movimientos",
        txs: {
          "tx-ana": { title: "Pix recibido de Ana", meta: "Hoy · 09:12" },
          "tx-ifood": { title: "iFood · almuerzo", meta: "Hoy · 12:40" },
          "tx-uber": { title: "Uber · Centro", meta: "Ayer · 18:25" },
          "tx-salario": { title: "Salario · Estúdio Ipê", meta: "Viernes · 08:00" },
        },
        floatPix: "Pix en 2s",
        floatYield: "105% del CDI",
      },
    },
    pix: {
      label: "Pix al estilo Zela",
      titleLead: "Pix en",
      titleAccent: "tres toques.",
      intro:
        "Elige el contacto, escribe el importe, confirma. El dinero llega en segundos — y el comprobante también. Pruébalo aquí al lado.",
      bullets: [
        {
          icon: "users",
          title: "Contactos favoritos",
          body: "Tus claves Pix guardadas con cariño: móvil, e-mail y hasta el CNPJ de la panadería.",
        },
        {
          icon: "receipt",
          title: "Comprobante al instante",
          body: "Un comprobante impecable, listo para el grupo de la familia.",
        },
        {
          icon: "moon-star",
          title: "Límite nocturno",
          body: "Importes menores después de las 20h, como recomienda el Banco Central de Brasil.",
        },
      ],
      flow: {
        steps: ["Contacto", "Importe", "Comprobante"],
        toWhom: "¿A quién va el Pix?",
        contacts: {
          ana: { keyHint: "clave: móvil" },
          jorge: { keyHint: "clave: CNPJ de la panadería" },
          cida: { keyHint: "clave: e-mail" },
          rafa: { keyHint: "clave: aleatoria" },
        },
        howMuch: "¿Cuánto?",
        sendingTo: "Enviando a",
        confirm: "Pagar con Pix",
        back: "Volver",
        digitLabel: "Dígito",
        eraseLabel: "Borrar último dígito",
        receiptTitle: "¡Pix enviado!",
        receiptSub: "El dinero ya llegó.",
        toLabel: "Para",
        amountLabel: "Importe",
        whenLabel: "Cuándo",
        whenValue: "Ahora mismo",
        feeLabel: "Tarifa",
        feeValue: "R$ 0,00",
        idLabel: "ID de la transacción",
        again: "Hacer otro Pix",
      },
    },
    boxes: {
      label: "Caixinhas",
      titleLead: "Cajitas que",
      titleAccent: "rinden",
      titleEnd: "de verdad.",
      intro:
        "Separa el dinero por sueño, rindiendo 105% del CDI con retiro inmediato. Ahorrar se vuelve ligero cuando cada real tiene un nombre.",
      yieldChip: "105% del CDI",
      ofLabel: "de",
      goals: {
        reserva: { name: "Fondo de emergencia", note: "Para dormir tranquila" },
        ape: { name: "Entrada del piso", note: "A mitad de camino de las llaves" },
        jeri: { name: "Año Nuevo en Jeri", note: "Brindis con los pies en la arena" },
        mae: { name: "Regalo para mamá", note: "Porque se lo merece" },
      },
      sim: {
        title: "Haz las cuentas con nosotros",
        subtitle: "Arrastra y mira hasta dónde llega tu cajita.",
        monthlyLabel: "Guardando al mes",
        sliderAria: "Importe guardado al mes",
        periodLabel: "Durante",
        yearTabs: ["1 año", "2 años", "3 años", "5 años", "10 años"],
        resultLabel: "Tendrías",
        depositLabel: "De tu bolsillo",
        yieldLabel: "De rendimiento",
        note: "Simulación ilustrativa con tasa fija del 0,9% mensual. La rentabilidad real sigue el CDI.",
      },
    },
    card: {
      label: "Tarjeta Zela Metal",
      badge: "Metal de verdad · cuota R$ 0",
      titleLead: "Metal por fuera,",
      titleAccent: "cuidado por dentro.",
      intro:
        "Gira la tarjeta en pantalla: es metal de verdad, sin tasas de mentira. Crédito y débito en una sola pieza, bajo tu control en la app.",
      viewerTitle: "Tarjeta Zela Metal en 3D",
      loadLabel: "Ver la tarjeta en 3D",
      hint: "Arrastra para girar la tarjeta",
      benefits: [
        {
          icon: "circle-check",
          title: "Sin cuota anual. Nunca.",
          body: "Cero hoy, cero siempre — sin trampas de “exención por gasto”.",
        },
        {
          icon: "hand-coins",
          title: "1% de cashback en todo",
          body: "El dinero de vuelta cae directo en tu cajita favorita.",
        },
        {
          icon: "zap",
          title: "Tarjeta virtual al instante",
          body: "Aprobada, comprada: número virtual listo antes de que llegue la física.",
        },
        {
          icon: "smartphone",
          title: "Control total en la app",
          body: "Bloquéala, ajusta límites y sigue cada compra en tiempo real.",
        },
      ],
    },
    security: {
      label: "Seguridad",
      titleLead: "Seguridad al",
      titleAccent: "estilo brasileño.",
      intro:
        "Sabemos cómo funciona la vida real por aquí. Por eso Zela te protege en la calle, en el bus y de madrugada — sin complicaciones.",
      blocks: [
        {
          id: "rua",
          icon: "eye-off",
          title: "Modo Calle",
          body: "Un toque esconde el saldo y guarda los botones de transferencia en lugares concurridos.",
        },
        {
          id: "golpe",
          icon: "shield-alert",
          title: "Alerta de estafa en Pix",
          body: "Nuestra IA reconoce patrones de estafadores y retiene la transferencia antes del arrepentimiento.",
        },
        {
          id: "bio",
          icon: "scan-face",
          title: "Biometría en todo",
          body: "Rostro o huella para entrar, pagar y tocar los límites. Contraseñas de memoria, nunca más.",
        },
        {
          id: "noite",
          icon: "moon-star",
          title: "Límites nocturnos",
          body: "Después de las 20h, las transferencias grandes esperan al amanecer. Tu sueño y tu saldo, protegidos.",
        },
      ],
      streetDemo: {
        balanceLabel: "Saldo",
        on: "activado",
        off: "desactivado",
        toggleLabel: "Activar o desactivar el Modo Calle",
      },
    },
    fees: {
      label: "Tarifas",
      titleLead: "Transparencia que cabe",
      titleAccent: "en una tabla.",
      intro:
        "En Zela lo acordado no sale caro: todo es R$ 0. Compáralo con la mensualidad del banco de siempre.",
      colService: "Servicio",
      colZela: "En Zela",
      colBank: "Banco tradicional",
      free: "R$ 0",
      rows: {
        manutencao: { label: "Mantenimiento de la cuenta", bankNote: "R$ 24,90 al mes" },
        ted: { label: "TED a otros bancos", bankNote: "R$ 9,00 cada una (2 al mes)" },
        anuidade: { label: "Cuota anual de la tarjeta", bankNote: "R$ 14,90 al mes" },
        saque: { label: "Retiros en cajeros", bankNote: "R$ 6,90 cada uno (2 al mes)" },
      },
      perYearLabel: "al año",
      totalLabel: "Ahorras al año",
      totalNote: "Estimación con el paquete medio de tarifas de los grandes bancos.",
    },
    cta: {
      titleLead: "Abre tu cuenta en",
      titleAccent: "4 minutos,",
      titleEnd: "desde el móvil.",
      body: "Sin filas, sin papeleo, sin gerente vendiéndote seguros. Solo tú, tu CPF y un cafezinho.",
      ctaPrimary: "Abrir cuenta gratis",
      note: "Disponible para mayores de 18 años con CPF vigente.",
      steps: ["Descarga la app", "Envía tus datos", "Listo: tu Pix ya funciona"],
    },
    footer: {
      tagline: "Cuidando tu dinero, todos los días.",
      columns: [
        { title: "Producto", links: ["Cuenta Zela", "Pix", "Caixinhas", "Tarjeta Zela Metal"] },
        { title: "Empresa", links: ["Sobre Zela", "Empleo", "Prensa", "Blog"] },
        { title: "Ayuda", links: ["Centro de ayuda", "Seguridad", "Tarifas", "Habla con nosotros"] },
      ],
      disclaimer:
        "Zela es un concepto ficticio creado por VigApp. No es una institución financiera.",
      made: "Hecho con cariño, para Brasil.",
    },
  },
};
