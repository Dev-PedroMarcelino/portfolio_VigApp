import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Shared numeric data (locale-independent)                            */
/* ------------------------------------------------------------------ */

export type SegmentId = "equities" | "fixed" | "alternatives" | "real" | "cash";
export type StrategyId = "conservative" | "balanced" | "growth";
export type AssetClassId = "equities" | "income" | "alternatives" | "global";
export type PerformanceRowId = StrategyId | "endowment" | "benchmark";

/** Target weights of the balanced mandate, rendered as the donut. */
export const ALLOCATION: { id: SegmentId; pct: number; color: string }[] = [
  { id: "equities", pct: 38, color: "#D1B166" },
  { id: "fixed", pct: 26, color: "#8DA3C4" },
  { id: "alternatives", pct: 16, color: "#C08E63" },
  { id: "real", pct: 12, color: "#86A99A" },
  { id: "cash", pct: 8, color: "#6A7488" },
];

/** Annual return assumptions powering the growth simulator. */
export const SIM_RATES: Record<StrategyId, number> = {
  conservative: 4.5,
  balanced: 6.5,
  growth: 8.5,
};

/**
 * Composite net returns (%) per mandate. Columns: YTD, 1y, 3y p.a.,
 * 5y p.a., 10y p.a., volatility. `feePct` converts net to gross.
 */
export const PERFORMANCE_ROWS: {
  id: PerformanceRowId;
  feePct: number;
  values: number[];
  benchmark?: boolean;
}[] = [
  { id: "conservative", feePct: 0.65, values: [3.1, 5.4, 4.2, 4.6, 4.1, 4.8] },
  { id: "balanced", feePct: 0.85, values: [5.8, 9.7, 7.1, 7.6, 6.9, 8.2] },
  { id: "growth", feePct: 0.95, values: [8.4, 14.2, 9.8, 10.4, 9.6, 12.6] },
  { id: "endowment", feePct: 1.1, values: [7.2, 11.9, 9.1, 9.7, 8.8, 9.4] },
  { id: "benchmark", feePct: 0, values: [4.9, 8.1, 5.9, 6.3, 5.7, 9.0], benchmark: true },
];

/* ------------------------------------------------------------------ */
/* Content types                                                       */
/* ------------------------------------------------------------------ */

export interface SliderConfig {
  label: string;
  min: number;
  max: number;
  step: number;
  initial: number;
}

export interface OnboardingOption {
  id: string;
  label: string;
  detail: string;
}

export interface AssetClassContent {
  id: AssetClassId;
  name: string;
  tagline: string;
  description: string;
  target: string;
  band: string;
  liquidity: string;
  holdings: string[];
}

export interface VantageContent {
  header: {
    nav: { href: string; label: string }[];
    cta: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    kicker: string;
    titleTop: string;
    titleItalic: string;
    titleBottom: string;
    thesis: string;
    ctaPrimary: string;
    ctaSecondary: string;
    imageAlt: string;
    stats: { value: string; label: string }[];
  };
  allocation: {
    label: string;
    title: string;
    intro: string;
    centerTitle: string;
    centerCaption: string;
    legendHint: string;
    segments: Record<SegmentId, { label: string; note: string }>;
    asOf: string;
  };
  simulator: {
    label: string;
    title: string;
    intro: string;
    currency: string;
    localeTag: string;
    controls: { initial: SliderConfig; monthly: SliderConfig; years: SliderConfig };
    yearsUnit: string;
    strategyLabel: string;
    rateSuffix: string;
    strategies: Record<StrategyId, string>;
    results: { projected: string; contributed: string; growth: string };
    chart: { projectedLegend: string; contributedLegend: string; yearsAxis: string };
    disclaimer: string;
  };
  assetClasses: {
    label: string;
    title: string;
    intro: string;
    fields: { target: string; band: string; liquidity: string };
    holdingsTitle: string;
    expandLabel: string;
    collapseLabel: string;
    classes: AssetClassContent[];
  };
  performance: {
    label: string;
    title: string;
    intro: string;
    netLabel: string;
    grossLabel: string;
    strategyCol: string;
    columns: string[];
    rows: Record<PerformanceRowId, string>;
    feeLabel: string;
    footnote: string;
  };
  quote: { text: string; attribution: string; role: string; imageAlt: string };
  advisors: {
    label: string;
    title: string;
    intro: string;
    featured: {
      name: string;
      role: string;
      bio: string;
      quote: string;
      credentials: string;
      imageAlt: string;
    };
    team: { initials: string; name: string; role: string; bio: string; credentials: string }[];
  };
  onboarding: {
    label: string;
    title: string;
    intro: string;
    sideNote: string;
    progress: { step: string; of: string };
    goal: { title: string; sub: string; options: OnboardingOption[] };
    horizon: {
      title: string;
      sub: string;
      options: OnboardingOption[];
      riskTitle: string;
      riskOptions: OnboardingOption[];
    };
    commitment: { title: string; sub: string; options: OnboardingOption[] };
    review: {
      title: string;
      sub: string;
      fields: { goal: string; horizon: string; risk: string; commitment: string };
      note: string;
    };
    nav: { back: string; next: string; confirm: string; restart: string };
    success: { title: string; body: string; referenceLabel: string };
  };
  footer: {
    tagline: string;
    officesTitle: string;
    offices: { city: string; address: string }[];
    hoursTitle: string;
    hours: string[];
    navTitle: string;
    nav: { href: string; label: string }[];
    social: { label: string }[];
    smallPrint: string;
    rights: string;
  };
}

/* ------------------------------------------------------------------ */
/* Dictionary                                                          */
/* ------------------------------------------------------------------ */

export const vantageDict: DemoDictionary<VantageContent> = {
  en: {
    header: {
      nav: [
        { href: "#allocation", label: "Allocation" },
        { href: "#simulator", label: "Projection" },
        { href: "#strategies", label: "Instruments" },
        { href: "#performance", label: "Record" },
        { href: "#advisors", label: "Partners" },
      ],
      cta: "Begin onboarding",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      kicker: "Private wealth stewardship · Est. 1994",
      titleTop: "Patience,",
      titleItalic: "compounded",
      titleBottom: "daily.",
      thesis:
        "Vantage Capital stewards the wealth of three generations of families with one conviction: time in the market, allocated with discipline, outperforms every clever shortcut. We build portfolios meant to be held for decades — and explained on a single page.",
      ctaPrimary: "Project your wealth",
      ctaSecondary: "Meet the allocation",
      imageAlt: "Market data terminals glowing in a dim trading room",
      stats: [
        { value: "$4.8B", label: "Assets under stewardship" },
        { value: "32", label: "Years of compounding" },
        { value: "98.4%", label: "Client retention since 2001" },
      ],
    },
    allocation: {
      label: "The Allocation",
      title: "One portfolio. Five instruments. Zero improvisation.",
      intro:
        "Our balanced model mandate, rebalanced quarterly and published in full. Trace a line in the legend to isolate its slice — every basis point has a reason to be there.",
      centerTitle: "Balanced mandate",
      centerCaption: "Target weights",
      legendHint: "Hover to isolate · click to pin",
      segments: {
        equities: {
          label: "Global equities",
          note: "Quality compounders across fourteen developed and emerging markets.",
        },
        fixed: {
          label: "Fixed income & credit",
          note: "Sovereign ladders, investment-grade bonds and a private-credit sleeve.",
        },
        alternatives: {
          label: "Alternatives",
          note: "Private-equity vintages and hedged strategies, uncorrelated by design.",
        },
        real: {
          label: "Real assets",
          note: "Core infrastructure, prime real estate and a measured gold position.",
        },
        cash: {
          label: "Strategic cash",
          note: "Dry powder held on purpose — optionality carries a yield of its own.",
        },
      },
      asOf: "Target weights as of 30 June 2026 · Rebalanced quarterly",
    },
    simulator: {
      label: "The Projection",
      title: "Watch discipline do the heavy lifting.",
      intro:
        "Three inputs and a rate of return — no jargon between you and the arithmetic of compounding. Move the sliders and see where patience takes you.",
      currency: "USD",
      localeTag: "en-US",
      controls: {
        initial: { label: "Initial investment", min: 10000, max: 1000000, step: 10000, initial: 100000 },
        monthly: { label: "Monthly contribution", min: 0, max: 10000, step: 250, initial: 1500 },
        years: { label: "Time horizon", min: 1, max: 40, step: 1, initial: 20 },
      },
      yearsUnit: "years",
      strategyLabel: "Mandate",
      rateSuffix: "p.a.",
      strategies: { conservative: "Conservative", balanced: "Balanced", growth: "Growth" },
      results: {
        projected: "Projected value",
        contributed: "Total contributed",
        growth: "Growth earned",
      },
      chart: {
        projectedLegend: "Projected value",
        contributedLegend: "Contributions alone",
        yearsAxis: "Years",
      },
      disclaimer:
        "Illustrative projection with monthly compounding at a constant rate, gross of tax. Markets do not move in straight lines; a sound plan expects that.",
    },
    assetClasses: {
      label: "The Instruments",
      title: "Four asset classes, each with a job description.",
      intro:
        "Nothing enters the portfolio without a mandate: the return it must earn, the band it must respect, the liquidity it must offer. Open each card to read the brief.",
      fields: { target: "Target return", band: "Allocation band", liquidity: "Liquidity" },
      holdingsTitle: "Representative exposures",
      expandLabel: "Read the brief",
      collapseLabel: "Close the brief",
      classes: [
        {
          id: "equities",
          name: "Global Equities",
          tagline: "The engine of long-term return",
          description:
            "Concentrated positions in businesses with durable pricing power and honest balance sheets, held across market cycles rather than traded through them.",
          target: "8–10% p.a.",
          band: "30–45%",
          liquidity: "Daily",
          holdings: [
            "Developed-market quality compounders",
            "Emerging-market dividend growers",
            "A disciplined 4% single-position ceiling",
          ],
        },
        {
          id: "income",
          name: "Fixed Income & Credit",
          tagline: "The ballast that pays rent",
          description:
            "Sovereign ladders and investment-grade credit anchor the portfolio, while a private-credit sleeve harvests the premium that patient capital deserves.",
          target: "4–6% p.a.",
          band: "20–35%",
          liquidity: "Daily to quarterly",
          holdings: [
            "G7 sovereign ladders, two to ten years",
            "Investment-grade corporate bonds",
            "Senior secured private credit",
          ],
        },
        {
          id: "alternatives",
          name: "Alternatives",
          tagline: "Return streams that ignore headlines",
          description:
            "Private-equity vintages, macro and equity-hedged strategies, sized so their illiquidity is a feature — a reason to stay the course, never a trap.",
          target: "8–12% p.a.",
          band: "10–20%",
          liquidity: "Quarterly to 7 years",
          holdings: [
            "Buyout and growth vintages 2019–2025",
            "Global macro and equity-hedged funds",
            "Co-investments beside first-quartile managers",
          ],
        },
        {
          id: "global",
          name: "Real Assets",
          tagline: "The oldest counterweight to inflation",
          description:
            "Core infrastructure, prime real estate and a measured allocation to gold — assets that throw off cash and hold their ground when currencies wobble.",
          target: "6–9% p.a.",
          band: "8–15%",
          liquidity: "Monthly to annual",
          holdings: [
            "Regulated utility and transport infrastructure",
            "Prime commercial real estate",
            "Allocated gold, vaulted in Zurich",
          ],
        },
      ],
    },
    performance: {
      label: "The Record",
      title: "Returns we are content to publish.",
      intro:
        "Composite performance across our discretionary mandates, audited annually. Toggle between net and gross — we would rather you look at net.",
      netLabel: "Net of fees",
      grossLabel: "Gross of fees",
      strategyCol: "Mandate",
      columns: ["YTD", "1 yr", "3 yrs p.a.", "5 yrs p.a.", "10 yrs p.a.", "Volatility"],
      rows: {
        conservative: "Conservative",
        balanced: "Balanced",
        growth: "Growth",
        endowment: "Vantage Endowment",
        benchmark: "Global 60/40 reference",
      },
      feeLabel: "Management fee",
      footnote:
        "Composite returns in USD as of 30 June 2026, dividends reinvested. Past performance is a record, not a promise.",
    },
    quote: {
      text: "Most investors underestimate ten years and overestimate one. Our craft is refusing to make that mistake with your capital.",
      attribution: "Helena Vasconcellos",
      role: "Chief Investment Officer",
      imageAlt: "Printed financial charts under warm lamplight",
    },
    advisors: {
      label: "The Partners",
      title: "Advisors who answer their own telephone.",
      intro:
        "A deliberately small partnership: four senior advisors, no hand-offs, no call centres. The person who designs your allocation is the person who explains it.",
      featured: {
        name: "Helena Vasconcellos",
        role: "Chief Investment Officer · Managing Partner",
        bio: "Former global-macro strategist in London and Zurich; has steered the Vantage balanced mandate through four drawdowns without abandoning it once.",
        quote: "A portfolio should be built to survive its owner's worst week.",
        credentials: "CFA · 24 years",
        imageAlt: "Portrait of Helena Vasconcellos, Chief Investment Officer",
      },
      team: [
        {
          initials: "RO",
          name: "Rafael Okamoto",
          role: "Head of Fixed Income & Credit",
          bio: "Built the firm's sovereign-ladder discipline; reads central-bank minutes the way others read novels.",
          credentials: "CFA · 18 years",
        },
        {
          initials: "AD",
          name: "Amara Diallo",
          role: "Director of Alternative Investments",
          bio: "Selects private-market managers with a first-quartile record and a second-quartile ego.",
          credentials: "CAIA · 15 years",
        },
        {
          initials: "CW",
          name: "Catherine Whitmore",
          role: "Head of Wealth Planning",
          bio: "Structures cross-border estates so the next generation inherits assets, not disputes.",
          credentials: "TEP · 21 years",
        },
      ],
    },
    onboarding: {
      label: "The Beginning",
      title: "Four measured steps to a managed portfolio.",
      intro:
        "No forms in triplicate and no sales scripts. Tell us what the money is for, and we will show you exactly how it would be run.",
      sideNote: "A senior partner reviews every brief personally, within two business days.",
      progress: { step: "Step", of: "of" },
      goal: {
        title: "What should this capital do?",
        sub: "Choose the mandate that reads most like you.",
        options: [
          { id: "preserve", label: "Preserve", detail: "Protect purchasing power; sleep is the benchmark." },
          { id: "income", label: "Provide income", detail: "A reliable distribution without eroding the principal." },
          { id: "grow", label: "Compound", detail: "Multiply patiently over a decade or more." },
        ],
      },
      horizon: {
        title: "How long, and how bumpy?",
        sub: "Horizon and temperament decide more than any forecast.",
        options: [
          { id: "short", label: "Under 5 years", detail: "Capital with a near appointment." },
          { id: "mid", label: "5–15 years", detail: "Room for a full market cycle." },
          { id: "long", label: "Beyond 15 years", detail: "Generational time, properly used." },
        ],
        riskTitle: "Tolerance for drawdowns",
        riskOptions: [
          { id: "low", label: "Cautious", detail: "A 10% decline would keep me up at night." },
          { id: "mid", label: "Measured", detail: "I can hold through a 20% drawdown with a steady hand." },
          { id: "high", label: "Unshaken", detail: "Volatility is the fee for return; I budget for it." },
        ],
      },
      commitment: {
        title: "Initial commitment",
        sub: "Mandates are tailored from the first dollar; service deepens with scale.",
        options: [
          { id: "t1", label: "$250,000", detail: "Discretionary portfolio with an annual planning review." },
          { id: "t2", label: "$1,000,000", detail: "Full private-office service and quarterly partner reviews." },
          { id: "t3", label: "$5,000,000+", detail: "Bespoke mandate with direct access to the investment committee." },
        ],
      },
      review: {
        title: "Read it back",
        sub: "This is the brief we would open your file with.",
        fields: { goal: "Mandate", horizon: "Horizon", risk: "Temperament", commitment: "Commitment" },
        note: "Nothing is binding yet — confirming requests a conversation, not a signature.",
      },
      nav: { back: "Back", next: "Continue", confirm: "Request proposal", restart: "Start a new brief" },
      success: {
        title: "Your brief is with us.",
        body: "A senior partner will come back within two business days with a draft mandate and a candid view of what is achievable.",
        referenceLabel: "Reference",
      },
    },
    footer: {
      tagline: "Independent wealth stewardship since 1994. Privately held, answerable only to clients.",
      officesTitle: "Offices",
      offices: [
        { city: "New York", address: "437 Madison Avenue, 24th Floor" },
        { city: "São Paulo", address: "Av. Brig. Faria Lima 3477, 14º andar" },
        { city: "Geneva", address: "Quai du Mont-Blanc 21" },
      ],
      hoursTitle: "Availability",
      hours: ["Mon–Fri · 8:00–18:00 EST", "Partners on call for clients, always"],
      navTitle: "Explore",
      nav: [
        { href: "#allocation", label: "Allocation" },
        { href: "#simulator", label: "Projection" },
        { href: "#strategies", label: "Instruments" },
        { href: "#performance", label: "Record" },
        { href: "#advisors", label: "Partners" },
        { href: "#onboarding", label: "Onboarding" },
      ],
      social: [
        { label: "Contact by email" },
        { label: "Vantage worldwide" },
        { label: "Message a partner" },
      ],
      smallPrint:
        "Vantage Capital LLC is a registered investment adviser. This page is a design concept; nothing on it constitutes investment advice or an offer of securities.",
      rights: "All rights reserved.",
    },
  },

  pt: {
    header: {
      nav: [
        { href: "#allocation", label: "Alocação" },
        { href: "#simulator", label: "Projeção" },
        { href: "#strategies", label: "Instrumentos" },
        { href: "#performance", label: "Histórico" },
        { href: "#advisors", label: "Sócios" },
      ],
      cta: "Iniciar onboarding",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
    },
    hero: {
      kicker: "Gestão de patrimônio privada · Desde 1994",
      titleTop: "Paciência,",
      titleItalic: "composta",
      titleBottom: "todos os dias.",
      thesis:
        "A Vantage Capital administra o patrimônio de três gerações de famílias com uma única convicção: tempo de mercado, alocado com disciplina, supera qualquer atalho engenhoso. Construímos carteiras para serem mantidas por décadas — e explicadas em uma única página.",
      ctaPrimary: "Projete seu patrimônio",
      ctaSecondary: "Conheça a alocação",
      imageAlt: "Terminais de dados de mercado brilhando em uma sala de operações",
      stats: [
        { value: "US$ 4,8 bi", label: "Sob gestão" },
        { value: "32", label: "Anos de juros compostos" },
        { value: "98,4%", label: "Retenção de clientes desde 2001" },
      ],
    },
    allocation: {
      label: "A Alocação",
      title: "Uma carteira. Cinco instrumentos. Zero improviso.",
      intro:
        "Nosso mandato balanceado modelo, rebalanceado a cada trimestre e publicado na íntegra. Percorra a legenda para isolar cada fatia — cada ponto-base tem um motivo para estar ali.",
      centerTitle: "Mandato balanceado",
      centerCaption: "Pesos-alvo",
      legendHint: "Passe o cursor para isolar · clique para fixar",
      segments: {
        equities: {
          label: "Ações globais",
          note: "Empresas de qualidade que compõem capital em catorze mercados desenvolvidos e emergentes.",
        },
        fixed: {
          label: "Renda fixa & crédito",
          note: "Escadas de títulos soberanos, grau de investimento e uma carteira de crédito privado.",
        },
        alternatives: {
          label: "Alternativos",
          note: "Safras de private equity e estratégias hedgeadas, descorrelacionadas por desenho.",
        },
        real: {
          label: "Ativos reais",
          note: "Infraestrutura core, imóveis prime e uma posição comedida em ouro.",
        },
        cash: {
          label: "Caixa estratégico",
          note: "Pólvora seca mantida de propósito — opcionalidade também rende.",
        },
      },
      asOf: "Pesos-alvo em 30 de junho de 2026 · Rebalanceamento trimestral",
    },
    simulator: {
      label: "A Projeção",
      title: "Veja a disciplina fazer o trabalho pesado.",
      intro:
        "Três variáveis e uma taxa de retorno — nenhum jargão entre você e a aritmética dos juros compostos. Mova os controles e veja aonde a paciência leva.",
      currency: "BRL",
      localeTag: "pt-BR",
      controls: {
        initial: { label: "Investimento inicial", min: 50000, max: 5000000, step: 50000, initial: 500000 },
        monthly: { label: "Aporte mensal", min: 0, max: 50000, step: 1000, initial: 7500 },
        years: { label: "Horizonte de tempo", min: 1, max: 40, step: 1, initial: 20 },
      },
      yearsUnit: "anos",
      strategyLabel: "Mandato",
      rateSuffix: "a.a.",
      strategies: { conservative: "Conservador", balanced: "Balanceado", growth: "Crescimento" },
      results: {
        projected: "Valor projetado",
        contributed: "Total aportado",
        growth: "Ganho composto",
      },
      chart: {
        projectedLegend: "Valor projetado",
        contributedLegend: "Apenas os aportes",
        yearsAxis: "Anos",
      },
      disclaimer:
        "Projeção ilustrativa com capitalização mensal a taxa constante, sem impostos. Mercados não andam em linha reta; um bom plano conta com isso.",
    },
    assetClasses: {
      label: "Os Instrumentos",
      title: "Quatro classes de ativos, cada uma com função definida.",
      intro:
        "Nada entra na carteira sem mandato: o retorno que deve gerar, a banda que deve respeitar, a liquidez que deve oferecer. Abra cada cartão para ler o briefing.",
      fields: { target: "Retorno-alvo", band: "Banda de alocação", liquidity: "Liquidez" },
      holdingsTitle: "Exposições representativas",
      expandLabel: "Ler o briefing",
      collapseLabel: "Fechar o briefing",
      classes: [
        {
          id: "equities",
          name: "Ações Globais",
          tagline: "O motor do retorno de longo prazo",
          description:
            "Posições concentradas em empresas com poder de preço duradouro e balanços honestos, mantidas através dos ciclos de mercado — não negociadas a cada ciclo.",
          target: "8–10% a.a.",
          band: "30–45%",
          liquidity: "Diária",
          holdings: [
            "Compounders de qualidade em mercados desenvolvidos",
            "Pagadoras de dividendos em mercados emergentes",
            "Teto disciplinado de 4% por posição",
          ],
        },
        {
          id: "income",
          name: "Renda Fixa & Crédito",
          tagline: "O lastro que paga aluguel",
          description:
            "Escadas de títulos soberanos e crédito grau de investimento ancoram a carteira, enquanto o crédito privado colhe o prêmio que o capital paciente merece.",
          target: "4–6% a.a.",
          band: "20–35%",
          liquidity: "Diária a trimestral",
          holdings: [
            "Escadas soberanas do G7, de dois a dez anos",
            "Debêntures e bonds grau de investimento",
            "Crédito privado sênior com garantias",
          ],
        },
        {
          id: "alternatives",
          name: "Alternativos",
          tagline: "Retornos que ignoram manchetes",
          description:
            "Safras de private equity e estratégias macro e hedgeadas, dimensionadas para que a iliquidez seja uma virtude — um motivo para manter o rumo, nunca uma armadilha.",
          target: "8–12% a.a.",
          band: "10–20%",
          liquidity: "Trimestral a 7 anos",
          holdings: [
            "Safras de buyout e growth 2019–2025",
            "Fundos macro globais e equity-hedged",
            "Coinvestimentos ao lado de gestores de primeiro quartil",
          ],
        },
        {
          id: "global",
          name: "Ativos Reais",
          tagline: "O contrapeso mais antigo da inflação",
          description:
            "Infraestrutura core, imóveis prime e uma alocação comedida em ouro — ativos que geram caixa e seguram terreno quando as moedas balançam.",
          target: "6–9% a.a.",
          band: "8–15%",
          liquidity: "Mensal a anual",
          holdings: [
            "Infraestrutura regulada de energia e transporte",
            "Imóveis comerciais prime",
            "Ouro alocado, custodiado em Zurique",
          ],
        },
      ],
    },
    performance: {
      label: "O Histórico",
      title: "Retornos que temos tranquilidade em publicar.",
      intro:
        "Desempenho composto dos nossos mandatos discricionários, auditado anualmente. Alterne entre líquido e bruto — preferimos que você olhe o líquido.",
      netLabel: "Líquido de taxas",
      grossLabel: "Bruto de taxas",
      strategyCol: "Mandato",
      columns: ["No ano", "1 ano", "3 anos a.a.", "5 anos a.a.", "10 anos a.a.", "Volatilidade"],
      rows: {
        conservative: "Conservador",
        balanced: "Balanceado",
        growth: "Crescimento",
        endowment: "Vantage Endowment",
        benchmark: "Referência global 60/40",
      },
      feeLabel: "Taxa de gestão",
      footnote:
        "Retornos compostos em USD em 30 de junho de 2026, dividendos reinvestidos. Rentabilidade passada é um registro, não uma promessa.",
    },
    quote: {
      text: "A maioria dos investidores subestima dez anos e superestima um. Nosso ofício é recusar esse erro com o seu capital.",
      attribution: "Helena Vasconcellos",
      role: "Chief Investment Officer",
      imageAlt: "Gráficos financeiros impressos sob luz quente",
    },
    advisors: {
      label: "Os Sócios",
      title: "Assessores que atendem o próprio telefone.",
      intro:
        "Uma sociedade deliberadamente pequena: quatro sócios seniores, sem repasses, sem central de atendimento. Quem desenha a sua alocação é quem a explica.",
      featured: {
        name: "Helena Vasconcellos",
        role: "Chief Investment Officer · Sócia-diretora",
        bio: "Ex-estrategista de macro global em Londres e Zurique; conduziu o mandato balanceado da Vantage por quatro grandes quedas sem abandoná-lo uma única vez.",
        quote: "Uma carteira deve ser construída para sobreviver à pior semana do seu dono.",
        credentials: "CFA · 24 anos",
        imageAlt: "Retrato de Helena Vasconcellos, Chief Investment Officer",
      },
      team: [
        {
          initials: "RO",
          name: "Rafael Okamoto",
          role: "Head de Renda Fixa & Crédito",
          bio: "Criou a disciplina de escadas soberanas da casa; lê atas de banco central como outros leem romances.",
          credentials: "CFA · 18 anos",
        },
        {
          initials: "AD",
          name: "Amara Diallo",
          role: "Diretora de Investimentos Alternativos",
          bio: "Seleciona gestores de mercados privados com histórico de primeiro quartil e ego de segundo.",
          credentials: "CAIA · 15 anos",
        },
        {
          initials: "CW",
          name: "Catherine Whitmore",
          role: "Head de Planejamento Patrimonial",
          bio: "Estrutura patrimônios internacionais para que a próxima geração herde ativos, não disputas.",
          credentials: "TEP · 21 anos",
        },
      ],
    },
    onboarding: {
      label: "O Começo",
      title: "Quatro passos comedidos até uma carteira gerida.",
      intro:
        "Sem formulários em três vias e sem roteiro de vendas. Diga para que serve o dinheiro e mostraremos exatamente como ele seria administrado.",
      sideNote: "Um sócio sênior analisa cada briefing pessoalmente, em até dois dias úteis.",
      progress: { step: "Etapa", of: "de" },
      goal: {
        title: "O que este capital deve fazer?",
        sub: "Escolha o mandato que mais se parece com você.",
        options: [
          { id: "preserve", label: "Preservar", detail: "Proteger o poder de compra; dormir bem é o benchmark." },
          { id: "income", label: "Gerar renda", detail: "Uma distribuição confiável sem corroer o principal." },
          { id: "grow", label: "Compor", detail: "Multiplicar com paciência ao longo de uma década ou mais." },
        ],
      },
      horizon: {
        title: "Por quanto tempo, e com quanto sobressalto?",
        sub: "Horizonte e temperamento decidem mais do que qualquer previsão.",
        options: [
          { id: "short", label: "Menos de 5 anos", detail: "Capital com compromisso marcado." },
          { id: "mid", label: "5–15 anos", detail: "Espaço para um ciclo completo de mercado." },
          { id: "long", label: "Mais de 15 anos", detail: "Tempo geracional, bem aproveitado." },
        ],
        riskTitle: "Tolerância a quedas",
        riskOptions: [
          { id: "low", label: "Cauteloso", detail: "Uma queda de 10% tiraria meu sono." },
          { id: "mid", label: "Comedido", detail: "Atravesso uma queda de 20% com a mão firme." },
          { id: "high", label: "Inabalável", detail: "Volatilidade é o preço do retorno; já está no orçamento." },
        ],
      },
      commitment: {
        title: "Aporte inicial",
        sub: "Mandatos são feitos sob medida desde o primeiro real; o serviço se aprofunda com a escala.",
        options: [
          { id: "t1", label: "R$ 1.500.000", detail: "Carteira discricionária com revisão anual de planejamento." },
          { id: "t2", label: "R$ 5.000.000", detail: "Serviço completo de private office e revisões trimestrais com sócios." },
          { id: "t3", label: "R$ 25.000.000+", detail: "Mandato exclusivo com acesso direto ao comitê de investimentos." },
        ],
      },
      review: {
        title: "Confira o resumo",
        sub: "É com este briefing que abriríamos o seu dossiê.",
        fields: { goal: "Mandato", horizon: "Horizonte", risk: "Temperamento", commitment: "Aporte" },
        note: "Nada é vinculante ainda — confirmar pede uma conversa, não uma assinatura.",
      },
      nav: { back: "Voltar", next: "Continuar", confirm: "Solicitar proposta", restart: "Começar novo briefing" },
      success: {
        title: "Seu briefing está conosco.",
        body: "Um sócio sênior retornará em até dois dias úteis com um rascunho de mandato e uma visão franca do que é alcançável.",
        referenceLabel: "Referência",
      },
    },
    footer: {
      tagline: "Gestão de patrimônio independente desde 1994. Capital fechado, respondendo apenas aos clientes.",
      officesTitle: "Escritórios",
      offices: [
        { city: "New York", address: "437 Madison Avenue, 24th Floor" },
        { city: "São Paulo", address: "Av. Brig. Faria Lima 3477, 14º andar" },
        { city: "Genebra", address: "Quai du Mont-Blanc 21" },
      ],
      hoursTitle: "Disponibilidade",
      hours: ["Seg–Sex · 8h–18h (BRT)", "Sócios de plantão para clientes, sempre"],
      navTitle: "Explorar",
      nav: [
        { href: "#allocation", label: "Alocação" },
        { href: "#simulator", label: "Projeção" },
        { href: "#strategies", label: "Instrumentos" },
        { href: "#performance", label: "Histórico" },
        { href: "#advisors", label: "Sócios" },
        { href: "#onboarding", label: "Onboarding" },
      ],
      social: [
        { label: "Contato por e-mail" },
        { label: "Vantage no mundo" },
        { label: "Falar com um sócio" },
      ],
      smallPrint:
        "Vantage Capital LLC é uma gestora registrada. Esta página é um conceito de design; nada aqui constitui recomendação de investimento ou oferta de valores mobiliários.",
      rights: "Todos os direitos reservados.",
    },
  },

  es: {
    header: {
      nav: [
        { href: "#allocation", label: "Asignación" },
        { href: "#simulator", label: "Proyección" },
        { href: "#strategies", label: "Instrumentos" },
        { href: "#performance", label: "Historial" },
        { href: "#advisors", label: "Socios" },
      ],
      cta: "Comenzar onboarding",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
    },
    hero: {
      kicker: "Gestión patrimonial privada · Desde 1994",
      titleTop: "Paciencia,",
      titleItalic: "compuesta",
      titleBottom: "cada día.",
      thesis:
        "Vantage Capital administra el patrimonio de tres generaciones de familias con una sola convicción: el tiempo en el mercado, asignado con disciplina, supera cualquier atajo ingenioso. Construimos carteras pensadas para mantenerse durante décadas — y explicarse en una sola página.",
      ctaPrimary: "Proyecte su patrimonio",
      ctaSecondary: "Conozca la asignación",
      imageAlt: "Terminales de datos de mercado brillando en una sala de operaciones",
      stats: [
        { value: "USD 4,8 mil M", label: "Activos bajo gestión" },
        { value: "32", label: "Años de interés compuesto" },
        { value: "98,4%", label: "Retención de clientes desde 2001" },
      ],
    },
    allocation: {
      label: "La Asignación",
      title: "Una cartera. Cinco instrumentos. Cero improvisación.",
      intro:
        "Nuestro mandato equilibrado modelo, reequilibrado cada trimestre y publicado íntegramente. Recorra la leyenda para aislar cada segmento — cada punto básico tiene una razón para estar ahí.",
      centerTitle: "Mandato equilibrado",
      centerCaption: "Pesos objetivo",
      legendHint: "Pase el cursor para aislar · clic para fijar",
      segments: {
        equities: {
          label: "Renta variable global",
          note: "Compañías de calidad que capitalizan en catorce mercados desarrollados y emergentes.",
        },
        fixed: {
          label: "Renta fija y crédito",
          note: "Escaleras de deuda soberana, grado de inversión y una cartera de crédito privado.",
        },
        alternatives: {
          label: "Alternativos",
          note: "Añadas de private equity y estrategias de cobertura, descorrelacionadas por diseño.",
        },
        real: {
          label: "Activos reales",
          note: "Infraestructura core, inmuebles prime y una posición mesurada en oro.",
        },
        cash: {
          label: "Liquidez estratégica",
          note: "Pólvora seca mantenida a propósito — la opcionalidad también rinde.",
        },
      },
      asOf: "Pesos objetivo a 30 de junio de 2026 · Reequilibrio trimestral",
    },
    simulator: {
      label: "La Proyección",
      title: "Deje que la disciplina haga el trabajo pesado.",
      intro:
        "Tres variables y una tasa de retorno — ninguna jerga entre usted y la aritmética del interés compuesto. Mueva los controles y vea adónde lleva la paciencia.",
      currency: "EUR",
      localeTag: "es-ES",
      controls: {
        initial: { label: "Inversión inicial", min: 10000, max: 1000000, step: 10000, initial: 100000 },
        monthly: { label: "Aportación mensual", min: 0, max: 10000, step: 250, initial: 1500 },
        years: { label: "Horizonte temporal", min: 1, max: 40, step: 1, initial: 20 },
      },
      yearsUnit: "años",
      strategyLabel: "Mandato",
      rateSuffix: "anual",
      strategies: { conservative: "Conservador", balanced: "Equilibrado", growth: "Crecimiento" },
      results: {
        projected: "Valor proyectado",
        contributed: "Total aportado",
        growth: "Crecimiento generado",
      },
      chart: {
        projectedLegend: "Valor proyectado",
        contributedLegend: "Solo las aportaciones",
        yearsAxis: "Años",
      },
      disclaimer:
        "Proyección ilustrativa con capitalización mensual a tasa constante, antes de impuestos. Los mercados no avanzan en línea recta; un buen plan cuenta con ello.",
    },
    assetClasses: {
      label: "Los Instrumentos",
      title: "Cuatro clases de activos, cada una con su cometido.",
      intro:
        "Nada entra en la cartera sin mandato: el retorno que debe generar, la banda que debe respetar, la liquidez que debe ofrecer. Abra cada tarjeta para leer el encargo.",
      fields: { target: "Retorno objetivo", band: "Banda de asignación", liquidity: "Liquidez" },
      holdingsTitle: "Exposiciones representativas",
      expandLabel: "Leer el encargo",
      collapseLabel: "Cerrar el encargo",
      classes: [
        {
          id: "equities",
          name: "Renta Variable Global",
          tagline: "El motor del retorno a largo plazo",
          description:
            "Posiciones concentradas en negocios con poder de fijación de precios duradero y balances honestos, mantenidas a través de los ciclos en lugar de negociarse con ellos.",
          target: "8–10% anual",
          band: "30–45%",
          liquidity: "Diaria",
          holdings: [
            "Compañías de calidad en mercados desarrollados",
            "Pagadoras de dividendos en mercados emergentes",
            "Techo disciplinado del 4% por posición",
          ],
        },
        {
          id: "income",
          name: "Renta Fija y Crédito",
          tagline: "El lastre que paga renta",
          description:
            "Escaleras de deuda soberana y crédito con grado de inversión anclan la cartera, mientras el crédito privado cosecha la prima que merece el capital paciente.",
          target: "4–6% anual",
          band: "20–35%",
          liquidity: "Diaria a trimestral",
          holdings: [
            "Escaleras soberanas del G7, de dos a diez años",
            "Bonos corporativos con grado de inversión",
            "Crédito privado sénior garantizado",
          ],
        },
        {
          id: "alternatives",
          name: "Alternativos",
          tagline: "Retornos que ignoran los titulares",
          description:
            "Añadas de private equity y estrategias macro y de cobertura, dimensionadas para que su iliquidez sea una virtud — una razón para mantener el rumbo, nunca una trampa.",
          target: "8–12% anual",
          band: "10–20%",
          liquidity: "Trimestral a 7 años",
          holdings: [
            "Añadas de buyout y growth 2019–2025",
            "Fondos macro globales y equity-hedged",
            "Coinversiones junto a gestores del primer cuartil",
          ],
        },
        {
          id: "global",
          name: "Activos Reales",
          tagline: "El contrapeso más antiguo de la inflación",
          description:
            "Infraestructura core, inmuebles prime y una asignación mesurada al oro — activos que generan caja y aguantan el terreno cuando las divisas tiemblan.",
          target: "6–9% anual",
          band: "8–15%",
          liquidity: "Mensual a anual",
          holdings: [
            "Infraestructura regulada de energía y transporte",
            "Inmuebles comerciales prime",
            "Oro asignado, custodiado en Zúrich",
          ],
        },
      ],
    },
    performance: {
      label: "El Historial",
      title: "Retornos que publicamos con serenidad.",
      intro:
        "Rendimiento compuesto de nuestros mandatos discrecionales, auditado anualmente. Alterne entre neto y bruto — preferimos que mire el neto.",
      netLabel: "Neto de comisiones",
      grossLabel: "Bruto de comisiones",
      strategyCol: "Mandato",
      columns: ["En el año", "1 año", "3 años anual", "5 años anual", "10 años anual", "Volatilidad"],
      rows: {
        conservative: "Conservador",
        balanced: "Equilibrado",
        growth: "Crecimiento",
        endowment: "Vantage Endowment",
        benchmark: "Referencia global 60/40",
      },
      feeLabel: "Comisión de gestión",
      footnote:
        "Retornos compuestos en USD a 30 de junio de 2026, dividendos reinvertidos. La rentabilidad pasada es un registro, no una promesa.",
    },
    quote: {
      text: "La mayoría de los inversores subestima diez años y sobreestima uno. Nuestro oficio es negarnos a cometer ese error con su capital.",
      attribution: "Helena Vasconcellos",
      role: "Chief Investment Officer",
      imageAlt: "Gráficos financieros impresos bajo una luz cálida",
    },
    advisors: {
      label: "Los Socios",
      title: "Asesores que contestan su propio teléfono.",
      intro:
        "Una sociedad deliberadamente pequeña: cuatro socios sénior, sin traspasos, sin centralitas. Quien diseña su asignación es quien se la explica.",
      featured: {
        name: "Helena Vasconcellos",
        role: "Chief Investment Officer · Socia directora",
        bio: "Exestratega de macro global en Londres y Zúrich; ha conducido el mandato equilibrado de Vantage a través de cuatro grandes caídas sin abandonarlo ni una vez.",
        quote: "Una cartera debe construirse para sobrevivir a la peor semana de su dueño.",
        credentials: "CFA · 24 años",
        imageAlt: "Retrato de Helena Vasconcellos, Chief Investment Officer",
      },
      team: [
        {
          initials: "RO",
          name: "Rafael Okamoto",
          role: "Director de Renta Fija y Crédito",
          bio: "Creó la disciplina de escaleras soberanas de la casa; lee actas de bancos centrales como otros leen novelas.",
          credentials: "CFA · 18 años",
        },
        {
          initials: "AD",
          name: "Amara Diallo",
          role: "Directora de Inversiones Alternativas",
          bio: "Selecciona gestores de mercados privados con historial del primer cuartil y ego del segundo.",
          credentials: "CAIA · 15 años",
        },
        {
          initials: "CW",
          name: "Catherine Whitmore",
          role: "Directora de Planificación Patrimonial",
          bio: "Estructura patrimonios transfronterizos para que la siguiente generación herede activos, no disputas.",
          credentials: "TEP · 21 años",
        },
      ],
    },
    onboarding: {
      label: "El Comienzo",
      title: "Cuatro pasos mesurados hacia una cartera gestionada.",
      intro:
        "Sin formularios por triplicado y sin guiones de venta. Díganos para qué es el dinero y le mostraremos exactamente cómo se gestionaría.",
      sideNote: "Un socio sénior revisa cada encargo personalmente, en un máximo de dos días hábiles.",
      progress: { step: "Paso", of: "de" },
      goal: {
        title: "¿Qué debe hacer este capital?",
        sub: "Elija el mandato que más se parezca a usted.",
        options: [
          { id: "preserve", label: "Preservar", detail: "Proteger el poder adquisitivo; dormir bien es el índice de referencia." },
          { id: "income", label: "Generar rentas", detail: "Una distribución fiable sin erosionar el principal." },
          { id: "grow", label: "Capitalizar", detail: "Multiplicar con paciencia durante una década o más." },
        ],
      },
      horizon: {
        title: "¿Cuánto tiempo, y con cuántos sobresaltos?",
        sub: "Horizonte y temperamento deciden más que cualquier pronóstico.",
        options: [
          { id: "short", label: "Menos de 5 años", detail: "Capital con cita próxima." },
          { id: "mid", label: "5–15 años", detail: "Margen para un ciclo completo de mercado." },
          { id: "long", label: "Más de 15 años", detail: "Tiempo generacional, bien empleado." },
        ],
        riskTitle: "Tolerancia a las caídas",
        riskOptions: [
          { id: "low", label: "Cauteloso", detail: "Una caída del 10% me quitaría el sueño." },
          { id: "mid", label: "Mesurado", detail: "Aguanto una caída del 20% con pulso firme." },
          { id: "high", label: "Imperturbable", detail: "La volatilidad es el precio del retorno; ya está presupuestada." },
        ],
      },
      commitment: {
        title: "Compromiso inicial",
        sub: "Los mandatos se confeccionan a medida desde el primer euro; el servicio se profundiza con la escala.",
        options: [
          { id: "t1", label: "250.000 €", detail: "Cartera discrecional con revisión anual de planificación." },
          { id: "t2", label: "1.000.000 €", detail: "Servicio completo de private office y revisiones trimestrales con socios." },
          { id: "t3", label: "5.000.000 €+", detail: "Mandato a medida con acceso directo al comité de inversiones." },
        ],
      },
      review: {
        title: "Repase el encargo",
        sub: "Con este resumen abriríamos su expediente.",
        fields: { goal: "Mandato", horizon: "Horizonte", risk: "Temperamento", commitment: "Compromiso" },
        note: "Nada es vinculante todavía — confirmar solicita una conversación, no una firma.",
      },
      nav: { back: "Atrás", next: "Continuar", confirm: "Solicitar propuesta", restart: "Comenzar de nuevo" },
      success: {
        title: "Su encargo está con nosotros.",
        body: "Un socio sénior responderá en un máximo de dos días hábiles con un borrador de mandato y una opinión franca de lo que es alcanzable.",
        referenceLabel: "Referencia",
      },
    },
    footer: {
      tagline: "Gestión patrimonial independiente desde 1994. Capital privado, que responde solo ante los clientes.",
      officesTitle: "Oficinas",
      offices: [
        { city: "Nueva York", address: "437 Madison Avenue, 24th Floor" },
        { city: "São Paulo", address: "Av. Brig. Faria Lima 3477, 14º andar" },
        { city: "Ginebra", address: "Quai du Mont-Blanc 21" },
      ],
      hoursTitle: "Disponibilidad",
      hours: ["Lun–Vie · 9:00–18:00 CET", "Socios de guardia para clientes, siempre"],
      navTitle: "Explorar",
      nav: [
        { href: "#allocation", label: "Asignación" },
        { href: "#simulator", label: "Proyección" },
        { href: "#strategies", label: "Instrumentos" },
        { href: "#performance", label: "Historial" },
        { href: "#advisors", label: "Socios" },
        { href: "#onboarding", label: "Onboarding" },
      ],
      social: [
        { label: "Contacto por correo" },
        { label: "Vantage en el mundo" },
        { label: "Hablar con un socio" },
      ],
      smallPrint:
        "Vantage Capital LLC es una gestora registrada. Esta página es un concepto de diseño; nada de lo aquí expuesto constituye asesoramiento de inversión ni una oferta de valores.",
      rights: "Todos los derechos reservados.",
    },
  },
};
