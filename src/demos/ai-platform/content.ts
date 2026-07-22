import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Locale-independent seeds (ids, numerals, latency figures)           */
/* ------------------------------------------------------------------ */

export type ScenarioId = "atendimento" | "juridico" | "ecommerce" | "financeiro";
export type ModelId = "nascente" | "correnteza" | "profunda";

/** R$ per 1M tokens — input / output. Prices are in BRL in every locale. */
export const MODEL_PRICES: Record<ModelId, { input: number; output: number }> = {
  nascente: { input: 2.5, output: 10 },
  correnteza: { input: 12, output: 48 },
  profunda: { input: 45, output: 180 },
};

/** Fake-but-plausible playground telemetry per scenario. */
export const SCENARIO_META: Record<ScenarioId, { firstTokenMs: number; tokPerSec: number }> = {
  atendimento: { firstTokenMs: 402, tokPerSec: 96 },
  juridico: { firstTokenMs: 517, tokPerSec: 88 },
  ecommerce: { firstTokenMs: 388, tokPerSec: 102 },
  financeiro: { firstTokenMs: 421, tokPerSec: 94 },
};

/** Blend assumed by the cost calculator: 70% input / 30% output tokens. */
export const CALC_INPUT_SHARE = 0.7;

/* ------------------------------------------------------------------ */
/* Content shape                                                        */
/* ------------------------------------------------------------------ */

export interface NavLink {
  href: string;
  label: string;
}

export interface PlaygroundScenario {
  id: ScenarioId;
  tab: string;
  prompt: string;
  response: string;
}

export interface WhyItem {
  id: string;
  kicker: string;
  input: string;
  generic: string;
  iara: string;
}

export interface CaseMetric {
  value: string;
  label: string;
}

export interface CaseItem {
  id: string;
  number: string;
  sector: string;
  company: string;
  summary: string;
  body: string;
  metrics: CaseMetric[];
}

export interface ApiBullet {
  title: string;
  body: string;
}

export interface SecurityLayer {
  depth: string;
  title: string;
  body: string;
}

export interface PricingModel {
  id: ModelId;
  name: string;
  tag: string;
  bestFor: string;
  context: string;
  latency: string;
  reasoning: boolean;
}

export interface IaraContent {
  localeTag: string;
  header: {
    nav: NavLink[];
    cta: string;
  };
  hero: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    manifesto: string;
    sub: string;
    proofNote: string;
  };
  playground: {
    windowTitle: string;
    region: string;
    modelChip: string;
    tabsLabel: string;
    userLabel: string;
    assistantLabel: string;
    runAgain: string;
    streamingLabel: string;
    doneLabel: string;
    firstTokenLabel: string;
    tokensLabel: string;
    tokPerSecLabel: string;
    scenarios: PlaygroundScenario[];
  };
  why: {
    label: string;
    title: string;
    intro: string;
    inputLabel: string;
    genericLabel: string;
    iaraLabel: string;
    items: WhyItem[];
  };
  cases: {
    label: string;
    title: string;
    intro: string;
    fictionNote: string;
    items: CaseItem[];
  };
  api: {
    label: string;
    title: string;
    intro: string;
    requestLabel: string;
    responseLabel: string;
    bullets: ApiBullet[];
    sseLines: string[];
  };
  security: {
    label: string;
    title: string;
    intro: string;
    surfaceLabel: string;
    layers: SecurityLayer[];
  };
  pricing: {
    label: string;
    title: string;
    intro: string;
    flagshipTag: string;
    perMillion: string;
    attrInput: string;
    attrOutput: string;
    attrContext: string;
    attrLatency: string;
    attrBestFor: string;
    attrReasoning: string;
    yes: string;
    no: string;
    models: PricingModel[];
    calc: {
      title: string;
      sub: string;
      volumeLabel: string;
      volumeUnit: string;
      modelLabel: string;
      totalLabel: string;
      perMonth: string;
      note: string;
    };
  };
  cta: {
    title: string;
    sub: string;
    primary: string;
    secondary: string;
    bullets: string[];
  };
  footer: {
    tagline: string;
    nav: NavLink[];
    disclaimer: string;
  };
}

/* ------------------------------------------------------------------ */
/* pt — canonical voice                                                 */
/* ------------------------------------------------------------------ */

const pt: IaraContent = {
  localeTag: "pt-BR",
  header: {
    nav: [
      { href: "#playground", label: "Playground" },
      { href: "#por-que", label: "Por quê" },
      { href: "#casos", label: "Casos" },
      { href: "#api", label: "API" },
      { href: "#seguranca", label: "Segurança" },
      { href: "#precos", label: "Preços" },
    ],
    cta: "Criar conta",
  },
  hero: {
    eyebrow: "IARA · inteligência artificial nascida no Brasil",
    titleA: "A IA que entende",
    titleB: "o Brasil.",
    manifesto: "Treinada em português de verdade — não traduzido.",
    sub: "Boleto vencido, NF-e, cláusula da Lei do Inquilinato, cliente prometendo pagar segunda. A IARA entende porque nasceu aqui: dados daqui, servidores daqui, português daqui.",
    proofNote: "Sem cadastro, sem cartão — o playground abaixo é a prova.",
  },
  playground: {
    windowTitle: "playground.iara.com.br",
    region: "gru · saopaulo-1",
    modelChip: "iara-2-correnteza",
    tabsLabel: "Cenários do playground",
    userLabel: "Você",
    assistantLabel: "IARA",
    runAgain: "Rodar de novo",
    streamingLabel: "gerando",
    doneLabel: "concluído",
    firstTokenLabel: "1º token",
    tokensLabel: "tokens",
    tokPerSecLabel: "tok/s",
    scenarios: [
      {
        id: "atendimento",
        tab: "Atendimento",
        prompt:
          "Classifica estes 4 tickets de SAC por urgência: (1) “meu cartão foi clonado, tem compra que não fiz”; (2) “como troco a foto do perfil?”; (3) “o app não abre desde ontem e tenho um boleto que vence hoje”; (4) “vocês têm plano anual?”",
        response:
          "P0 · CRÍTICO — Ticket 1 (cartão clonado)\nSuspeita de fraude com prejuízo financeiro em andamento. Bloquear o cartão de imediato, abrir contestação e responder em até 15 minutos. Agilidade aqui evita chargeback — e reclamação no Procon.\n\nP1 · ALTO — Ticket 3 (app fora do ar + boleto vence hoje)\nFalha técnica com prazo real: boleto vencido gera multa de 2% e juros por dia. Enviar a linha digitável por e-mail ou WhatsApp agora e orientar o pagamento pelo internet banking.\n\nP2 · MÉDIO — Ticket 4 (plano anual)\nOportunidade comercial, não incidente. Encaminhar ao time de vendas com resposta em até 4 horas úteis — interesse esfria rápido.\n\nP3 · BAIXO — Ticket 2 (foto do perfil)\nDúvida de autoatendimento. Responder com o passo a passo da central de ajuda e marcar como resolvido.",
      },
      {
        id: "juridico",
        tab: "Jurídico",
        prompt: "Resume este contrato de aluguel em 5 pontos. [contrato_residencial_v3.pdf]",
        response:
          "1. Partes e imóvel — Locação residencial do apto. 72 da Rua Harmonia, 442, São Paulo/SP, entre Imobiliária Andrade (locadora) e Camila Ferreira (locatária).\n\n2. Prazo e valor — 30 meses, padrão da Lei do Inquilinato. Aluguel de R$ 3.200 com vencimento todo dia 5 e reajuste anual pelo IGP-M.\n\n3. Garantia — Caução de 3 aluguéis (R$ 9.600) em poupança vinculada, devolvida corrigida no fim do contrato.\n\n4. Ponto de atenção — A cláusula 8ª repassa ao inquilino despesas extraordinárias de condomínio (obras estruturais). Isso contraria o art. 22 da Lei 8.245/91 e pode ser contestado.\n\n5. Rescisão — Multa de 3 aluguéis, proporcional aos meses restantes. Após 12 meses, saída com aviso prévio de 30 dias reduz a multa pela metade.",
      },
      {
        id: "ecommerce",
        tab: "E-commerce",
        prompt:
          "Escreve a descrição deste tênis para o Mercado Livre: Tênis Corrida Vento K2, amortecimento em gel, malha respirável, 38 ao 44, preto com verde-água.",
        response:
          "Tênis Vento K2 — Corrida e Treino | Amortecimento em Gel\n\nDo treino de segunda ao longão de domingo: o Vento K2 acompanha o seu ritmo.\n\n• Amortecimento em gel que absorve o impacto da passada e poupa o joelho\n• Malha respirável — pé seco mesmo no calor brasileiro\n• Solado antiderrapante para asfalto, esteira e paralelepípedo\n• Numeração 38 ao 44 · Preto com detalhes verde-água\n\nENVIO PARA TODO O BRASIL\nDespachamos em até 24h úteis via Mercado Envios Full.\n\nCOMPRA GARANTIDA\nDevolução grátis em até 30 dias e nota fiscal em todas as compras.\n\nFicou com dúvida? Chama no “Perguntar ao vendedor” — a gente responde rapidinho.",
      },
      {
        id: "financeiro",
        tab: "Financeiro",
        prompt:
          "Cliente perguntou: “meu boleto venceu ontem, consigo pagar via Pix?” — responde como atendente do banco.",
        response:
          "Consegue sim! Boleto vencido há 1 dia continua pagável — e pelo Pix a baixa é quase imediata:\n\n1. Abra o app e toque em Pagamentos → Pagar boleto;\n2. Escaneie o código de barras ou cole a linha digitável;\n3. O valor já aparece atualizado com o acréscimo do atraso (multa de 2% + juros pro rata, conforme o contrato);\n4. Escolha Pix como forma de pagamento e confirme. A compensação cai em minutos, mesmo fora do horário bancário.\n\nImportante: boletos com mais de 59 dias de atraso podem ser bloqueados pelo emissor. Nesse caso, é só pedir a segunda via atualizada.\n\nPosso ajudar em mais alguma coisa?",
      },
    ],
  },
  why: {
    label: "Por quê",
    title: "Por que uma IA brasileira?",
    intro:
      "Modelos treinados em inglês leem português como turista: traduzem palavras, perdem o país inteiro. A diferença aparece nos detalhes — e no Brasil, o detalhe é o negócio.",
    inputLabel: "Entrada",
    genericLabel: "IA genérica",
    iaraLabel: "IARA",
    items: [
      {
        id: "giria",
        kicker: "Gíria e contexto",
        input: "“segunda eu te pago, juro”",
        generic:
          "Trata como agendamento qualquer: “Ok! Evento criado para segunda-feira.” A promessa de pagamento passa batida.",
        iara:
          "Reconhece promessa informal de pagamento em régua de cobrança: registra o compromisso, agenda follow-up para segunda às 9h e responde firme — sem ser grosseira.",
      },
      {
        id: "docs",
        kicker: "Documento brasileiro",
        input: "“extrai os dados desta NF-e”",
        generic:
          "Confunde CNPJ com CPF, ignora a chave de acesso e lê “1.234,56” como um decimal americano quebrado.",
        iara:
          "Valida a chave de 44 dígitos, separa ICMS de IPI, confere o CNPJ do emitente e sabe que R$ 1.234,56 é mil duzentos e trinta e quatro reais e cinquenta e seis centavos.",
      },
      {
        id: "datas",
        kicker: "Datas e moeda",
        input: "“a reunião é 06/07, orçamento de R$ 10 mil”",
        generic:
          "Lê June 7th, converte para dólar e devolve “$10,000.00” — dois erros em uma linha.",
        iara:
          "06/07 é 6 de julho — dd/mm, sempre. E “R$ 10 mil” vira R$ 10.000,00, formatado como se escreve no Brasil.",
      },
    ],
  },
  cases: {
    label: "Casos",
    title: "Quem já fala com a IARA",
    intro: "Quatro setores, quatro operações brasileiras — do chão de loja ao contencioso.",
    fictionNote: "Empresas e números fictícios, criados para este conceito.",
    items: [
      {
        id: "varejo",
        number: "01",
        sector: "Varejo",
        company: "Lojas Maré · moda, 84 lojas",
        summary: "Descrições de produto e SAC unificados em uma operação só.",
        body:
          "A Maré ligou a IARA ao catálogo: cada produto novo ganha descrição para site, Mercado Livre e Shopee em segundos, no tom da marca. No SAC, a IARA resolve troca, rastreio e cupom sem fila — e escala para humano quando o assunto é sensível.",
        metrics: [
          { value: "+22%", label: "conversão nas descrições geradas" },
          { value: "-38%", label: "tempo médio de resposta no SAC" },
          { value: "R$ 1,4 mi", label: "economizados por ano" },
        ],
      },
      {
        id: "atendimento",
        number: "02",
        sector: "Atendimento",
        company: "ConectaCel · operadora regional",
        summary: "Segunda via, plano, cobertura: resolvido antes de tocar no humano.",
        body:
          "A central da ConectaCel recebia 40 mil chamados por mês — metade era segunda via de boleto e dúvida de franquia. A IARA assumiu o WhatsApp oficial: entende a pergunta do jeito que o cliente escreve, resolve na hora e registra tudo no CRM.",
        metrics: [
          { value: "71%", label: "dos tickets resolvidos sem humano" },
          { value: "4,6/5", label: "CSAT médio pós-atendimento" },
          { value: "40 s", label: "tempo médio de resolução" },
        ],
      },
      {
        id: "juridico",
        number: "03",
        sector: "Jurídico",
        company: "Bastos & Nogueira Advogados",
        summary: "Revisão de contrato em minutos, com o CC e a Lei 8.245 na memória.",
        body:
          "O escritório revisa 2.400 contratos por mês. A IARA Profunda lê cada minuta, aponta cláusulas em conflito com a legislação brasileira, sugere redação alternativa e monta o resumo executivo que o sócio lê em 2 minutos.",
        metrics: [
          { value: "3h → 12min", label: "análise média por contrato" },
          { value: "96%", label: "precisão na revisão de cláusulas" },
          { value: "2.400", label: "contratos processados por mês" },
        ],
      },
      {
        id: "saude",
        number: "04",
        sector: "Saúde",
        company: "Rede Vida Clínicas · 31 unidades",
        summary: "Agendamento por WhatsApp e lembrete que o paciente responde.",
        body:
          "Paciente marca, remarca e confirma consulta conversando com a IARA no WhatsApp — em linguagem natural, não em menu numérico. Dados clínicos ficam na região saopaulo-1, com trilha de auditoria completa para a LGPD.",
        metrics: [
          { value: "-52%", label: "de faltas com lembrete conversacional" },
          { value: "83%", label: "dos agendamentos sem telefone" },
          { value: "100%", label: "dos dados hospedados no Brasil" },
        ],
      },
    ],
  },
  api: {
    label: "API",
    title: "Uma chamada. Português fluente.",
    intro:
      "REST simples, streaming nativo e SDKs idiomáticos. Do curl à produção no mesmo dia.",
    requestLabel: "requisição",
    responseLabel: "stream · SSE",
    bullets: [
      {
        title: "SDKs TypeScript e Python",
        body: "Tipados, com retry e streaming embutidos. npm install @iara/sdk e pronto.",
      },
      {
        title: "Streaming SSE token a token",
        body: "Resposta começa em milissegundos — a UX de chat que o usuário espera.",
      },
      {
        title: "99,9% de uptime, 38 ms de São Paulo",
        body: "Inferência em datacenter paulista: latência mediana de 38 ms para quem está no Brasil.",
      },
    ],
    sseLines: [
      'data: {"delta":"Nota fiscal 4.520 da"}',
      'data: {"delta":" Andrade Ltda, R$ 12.480,00,"}',
      'data: {"delta":" ICMS destacado de R$ 1.497,60…"}',
      "data: [DONE]",
    ],
  },
  security: {
    label: "Segurança",
    title: "Seus dados, em águas brasileiras.",
    intro:
      "Profundidade é proteção. Cada camada da IARA foi desenhada para a LGPD — não adaptada depois.",
    surfaceLabel: "superfície",
    layers: [
      {
        depth: "0 m",
        title: "Dados hospedados no Brasil",
        body: "Inferência e armazenamento na região saopaulo-1. Nada atravessa fronteira — nem em backup.",
      },
      {
        depth: "−200 m",
        title: "LGPD por padrão",
        body: "DPO dedicado, relatório de impacto por projeto, base legal documentada e DPA assinado no onboarding.",
      },
      {
        depth: "−1.000 m",
        title: "Seus dados não treinam a IARA",
        body: "Opt-out de treinamento é o padrão, não a exceção. Retenção zero disponível para dados sensíveis.",
      },
      {
        depth: "−4.000 m",
        title: "Certificado de ponta a ponta",
        body: "ISO 27001 e SOC 2 Tipo II. AES-256 em repouso, TLS 1.3 em trânsito, chaves gerenciadas por HSM.",
      },
    ],
  },
  pricing: {
    label: "Preços",
    title: "Preço em real, por milhão de tokens.",
    intro: "Sem dólar, sem IOF, sem surpresa no câmbio. Três correntes, um contrato em reais.",
    flagshipTag: "carro-chefe",
    perMillion: "por 1M de tokens",
    attrInput: "Entrada (1M tokens)",
    attrOutput: "Saída (1M tokens)",
    attrContext: "Janela de contexto",
    attrLatency: "Latência · 1º token",
    attrBestFor: "Feita para",
    attrReasoning: "Raciocínio estendido",
    yes: "Incluído",
    no: "—",
    models: [
      {
        id: "nascente",
        name: "Iara Nascente",
        tag: "veloz",
        bestFor: "SAC em tempo real, classificação e triagem em altíssimo volume",
        context: "128k tokens",
        latency: "~180 ms",
        reasoning: false,
      },
      {
        id: "correnteza",
        name: "Iara Correnteza",
        tag: "equilíbrio",
        bestFor: "O modelo para 90% dos casos: atendimento, conteúdo, extração de dados",
        context: "256k tokens",
        latency: "~420 ms",
        reasoning: false,
      },
      {
        id: "profunda",
        name: "Iara Profunda",
        tag: "raciocínio",
        bestFor: "Análise jurídica, documentos longos e decisões que exigem cadeia de raciocínio",
        context: "256k tokens",
        latency: "~1,8 s",
        reasoning: true,
      },
    ],
    calc: {
      title: "Quanto custa no seu volume?",
      sub: "Arraste e veja. Estimativa com 70% de tokens de entrada e 30% de saída.",
      volumeLabel: "Volume mensal",
      volumeUnit: "mi de tokens/mês",
      modelLabel: "Modelo",
      totalLabel: "Custo estimado",
      perMonth: "/mês",
      note: "Valores em reais. Volume acima de 500 mi/mês tem desconto por contrato.",
    },
  },
  cta: {
    title: "Fale com a IARA em português.",
    sub: "Crie a conta, ganhe R$ 20 em créditos e faça a primeira chamada em cinco minutos.",
    primary: "Começar grátis",
    secondary: "Falar com vendas",
    bullets: ["R$ 20 em créditos iniciais", "Sem cartão de crédito", "Suporte em português, claro"],
  },
  footer: {
    tagline: "A senhora das águas, agora fluente em produção.",
    nav: [
      { href: "#playground", label: "Playground" },
      { href: "#api", label: "API" },
      { href: "#seguranca", label: "Segurança" },
      { href: "#precos", label: "Preços" },
    ],
    disclaimer: "IARA é um conceito fictício criado pela VigApp.",
  },
};

/* ------------------------------------------------------------------ */
/* en — full translation, Brazilian universe kept intact                */
/* ------------------------------------------------------------------ */

const en: IaraContent = {
  localeTag: "en-US",
  header: {
    nav: [
      { href: "#playground", label: "Playground" },
      { href: "#por-que", label: "Why" },
      { href: "#casos", label: "Cases" },
      { href: "#api", label: "API" },
      { href: "#seguranca", label: "Security" },
      { href: "#precos", label: "Pricing" },
    ],
    cta: "Create account",
  },
  hero: {
    eyebrow: "IARA · artificial intelligence born in Brazil",
    titleA: "The AI that understands",
    titleB: "Brazil.",
    manifesto: "Trained on real Portuguese — not translated Portuguese.",
    sub: "Overdue boletos, NF-e invoices, tenancy-law clauses, a customer promising to pay on Monday. IARA gets it because it was born here: Brazilian data, Brazilian servers, Brazilian Portuguese.",
    proofNote: "No sign-up, no card — the playground below is the proof.",
  },
  playground: {
    windowTitle: "playground.iara.com.br",
    region: "gru · saopaulo-1",
    modelChip: "iara-2-correnteza",
    tabsLabel: "Playground scenarios",
    userLabel: "You",
    assistantLabel: "IARA",
    runAgain: "Run again",
    streamingLabel: "generating",
    doneLabel: "done",
    firstTokenLabel: "1st token",
    tokensLabel: "tokens",
    tokPerSecLabel: "tok/s",
    scenarios: [
      {
        id: "atendimento",
        tab: "Support",
        prompt:
          "Rank these 4 support tickets by urgency: (1) “my card was cloned, there's a purchase I never made”; (2) “how do I change my profile photo?”; (3) “the app hasn't opened since yesterday and my boleto is due today”; (4) “do you offer an annual plan?”",
        response:
          "P0 · CRITICAL — Ticket 1 (cloned card)\nSuspected fraud with financial loss in progress. Block the card immediately, open a dispute and reply within 15 minutes. Speed here prevents a chargeback — and a Procon complaint.\n\nP1 · HIGH — Ticket 3 (app down + boleto due today)\nTechnical failure with a real deadline: an overdue boleto accrues a 2% fine plus daily interest. Send the boleto's digit line by e-mail or WhatsApp now and point the customer to internet banking.\n\nP2 · MEDIUM — Ticket 4 (annual plan)\nSales opportunity, not an incident. Route to the sales team with a reply within 4 business hours — interest cools off fast.\n\nP3 · LOW — Ticket 2 (profile photo)\nSelf-service question. Reply with the help-center walkthrough and mark it resolved.",
      },
      {
        id: "juridico",
        tab: "Legal",
        prompt: "Summarize this rental agreement in 5 points. [contrato_residencial_v3.pdf]",
        response:
          "1. Parties and property — Residential lease of apt. 72, Rua Harmonia 442, São Paulo/SP, between Imobiliária Andrade (landlord) and Camila Ferreira (tenant).\n\n2. Term and rent — 30 months, the Brazilian Tenancy Law standard. Rent of R$ 3,200 due on the 5th, adjusted yearly by the IGP-M index.\n\n3. Deposit — Security deposit of 3 months' rent (R$ 9,600) in a linked savings account, returned with interest at the end of the lease.\n\n4. Red flag — Clause 8 shifts extraordinary condo expenses (structural works) to the tenant. That conflicts with art. 22 of Law 8,245/91 and can be challenged.\n\n5. Termination — Penalty of 3 months' rent, prorated by the months remaining. After month 12, leaving with 30 days' notice halves the penalty.",
      },
      {
        id: "ecommerce",
        tab: "E-commerce",
        prompt:
          "Write the Mercado Livre listing for this sneaker: Vento K2 running shoe, gel cushioning, breathable mesh, sizes 38–44, black with teal accents.",
        response:
          "Vento K2 Sneaker — Running & Training | Gel Cushioning\n\nFrom Monday's workout to Sunday's long run: the Vento K2 keeps your pace.\n\n• Gel cushioning that absorbs each stride and spares your knees\n• Breathable mesh — dry feet even in Brazilian heat\n• Grip sole for asphalt, treadmill and cobblestones\n• Sizes 38 to 44 · Black with teal accents\n\nSHIPS ALL OVER BRAZIL\nDispatched within 24 business hours via Mercado Envios Full.\n\nGUARANTEED PURCHASE\nFree returns within 30 days and a nota fiscal with every order.\n\nQuestions? Hit “Ask the seller” — we answer fast.",
      },
      {
        id: "financeiro",
        tab: "Banking",
        prompt:
          "A customer asked: “my boleto expired yesterday, can I still pay it with Pix?” — answer as the bank's support agent.",
        response:
          "You can! A boleto that expired 1 day ago is still payable — and through Pix it clears almost instantly:\n\n1. Open the app and tap Payments → Pay boleto;\n2. Scan the barcode or paste the digit line;\n3. The amount shows up already updated with the late charges (2% fine + pro-rata interest, per your agreement);\n4. Pick Pix as the payment method and confirm. It clears in minutes, even outside banking hours.\n\nHeads-up: boletos more than 59 days overdue may be blocked by the issuer. If so, just request an updated copy.\n\nAnything else I can help with?",
      },
    ],
  },
  why: {
    label: "Why",
    title: "Why a Brazilian AI?",
    intro:
      "Models trained in English read Portuguese like a tourist: they translate the words and miss the entire country. The difference lives in the details — and in Brazil, the detail is the business.",
    inputLabel: "Input",
    genericLabel: "Generic AI",
    iaraLabel: "IARA",
    items: [
      {
        id: "giria",
        kicker: "Slang and context",
        input: "“segunda eu te pago, juro” (I'll pay you Monday, I swear)",
        generic:
          "Treats it as a generic appointment: “Ok! Event created for Monday.” The payment promise slips right through.",
        iara:
          "Recognizes an informal payment promise inside a collections flow: logs the commitment, schedules a follow-up for Monday 9am and replies firmly — without being rude.",
      },
      {
        id: "docs",
        kicker: "Brazilian documents",
        input: "“extract the data from this NF-e”",
        generic:
          "Mixes up CNPJ and CPF, ignores the access key and reads “1.234,56” as a broken American decimal.",
        iara:
          "Validates the 44-digit access key, splits ICMS from IPI, checks the issuer's CNPJ and knows R$ 1.234,56 is one thousand two hundred thirty-four reais and fifty-six cents.",
      },
      {
        id: "datas",
        kicker: "Dates and currency",
        input: "“the meeting is 06/07, budget of R$ 10 mil”",
        generic:
          "Reads June 7th, converts to dollars and returns “$10,000.00” — two mistakes in one line.",
        iara:
          "06/07 is July 6th — dd/mm, always. And “R$ 10 mil” becomes R$ 10.000,00, formatted the way Brazil writes it.",
      },
    ],
  },
  cases: {
    label: "Cases",
    title: "Who already talks to IARA",
    intro: "Four sectors, four Brazilian operations — from the shop floor to the courtroom.",
    fictionNote: "Fictional companies and figures, created for this concept.",
    items: [
      {
        id: "varejo",
        number: "01",
        sector: "Retail",
        company: "Lojas Maré · fashion, 84 stores",
        summary: "Product copy and customer support unified into one operation.",
        body:
          "Maré wired IARA into its catalog: every new product gets copy for the site, Mercado Livre and Shopee in seconds, in the brand's voice. On support, IARA handles exchanges, tracking and coupons with no queue — and hands off to a human when it gets sensitive.",
        metrics: [
          { value: "+22%", label: "conversion on generated listings" },
          { value: "-38%", label: "average support response time" },
          { value: "R$ 1.4M", label: "saved per year" },
        ],
      },
      {
        id: "atendimento",
        number: "02",
        sector: "Support",
        company: "ConectaCel · regional carrier",
        summary: "Duplicate boletos, plans, coverage: solved before a human picks up.",
        body:
          "ConectaCel's call center took 40,000 calls a month — half were boleto copies and data-plan questions. IARA took over the official WhatsApp: it understands questions the way customers actually write them, solves on the spot and logs everything in the CRM.",
        metrics: [
          { value: "71%", label: "of tickets resolved with no human" },
          { value: "4.6/5", label: "average post-service CSAT" },
          { value: "40 s", label: "average time to resolution" },
        ],
      },
      {
        id: "juridico",
        number: "03",
        sector: "Legal",
        company: "Bastos & Nogueira Advogados",
        summary: "Contract review in minutes, with Brazilian statutes on tap.",
        body:
          "The firm reviews 2,400 contracts a month. IARA Profunda reads every draft, flags clauses that conflict with Brazilian law, proposes alternative wording and builds the executive summary a partner reads in 2 minutes.",
        metrics: [
          { value: "3h → 12min", label: "average review per contract" },
          { value: "96%", label: "accuracy on clause review" },
          { value: "2,400", label: "contracts processed monthly" },
        ],
      },
      {
        id: "saude",
        number: "04",
        sector: "Healthcare",
        company: "Rede Vida Clínicas · 31 units",
        summary: "WhatsApp scheduling and reminders patients actually answer.",
        body:
          "Patients book, reschedule and confirm visits by chatting with IARA on WhatsApp — natural language, not a numbered menu. Clinical data stays in the saopaulo-1 region with a full audit trail for LGPD, Brazil's data-protection law.",
        metrics: [
          { value: "-52%", label: "no-shows with conversational reminders" },
          { value: "83%", label: "of bookings without a phone call" },
          { value: "100%", label: "of data hosted in Brazil" },
        ],
      },
    ],
  },
  api: {
    label: "API",
    title: "One call. Fluent Portuguese.",
    intro: "Plain REST, native streaming and idiomatic SDKs. From curl to production the same day.",
    requestLabel: "request",
    responseLabel: "stream · SSE",
    bullets: [
      {
        title: "TypeScript and Python SDKs",
        body: "Typed, with retries and streaming built in. npm install @iara/sdk and go.",
      },
      {
        title: "SSE streaming, token by token",
        body: "First bytes in milliseconds — the chat UX your users expect.",
      },
      {
        title: "99.9% uptime, 38 ms from São Paulo",
        body: "Inference in a São Paulo datacenter: 38 ms median latency for anyone in Brazil.",
      },
    ],
    sseLines: [
      'data: {"delta":"Invoice 4,520 from"}',
      'data: {"delta":" Andrade Ltda, R$ 12,480.00,"}',
      'data: {"delta":" ICMS tax of R$ 1,497.60…"}',
      "data: [DONE]",
    ],
  },
  security: {
    label: "Security",
    title: "Your data, in Brazilian waters.",
    intro: "Depth is protection. Every layer of IARA was designed for LGPD — not retrofitted to it.",
    surfaceLabel: "surface",
    layers: [
      {
        depth: "0 m",
        title: "Data hosted in Brazil",
        body: "Inference and storage in the saopaulo-1 region. Nothing crosses the border — not even backups.",
      },
      {
        depth: "−200 m",
        title: "LGPD by default",
        body: "Dedicated DPO, impact reports per project, documented legal basis and a DPA signed at onboarding.",
      },
      {
        depth: "−1,000 m",
        title: "Your data never trains IARA",
        body: "Training opt-out is the default, not the exception. Zero-retention mode available for sensitive data.",
      },
      {
        depth: "−4,000 m",
        title: "Certified end to end",
        body: "ISO 27001 and SOC 2 Type II. AES-256 at rest, TLS 1.3 in transit, HSM-managed keys.",
      },
    ],
  },
  pricing: {
    label: "Pricing",
    title: "Priced in reais, per million tokens.",
    intro: "No dollars, no IOF tax, no exchange-rate surprises. Three currents, one contract in BRL.",
    flagshipTag: "flagship",
    perMillion: "per 1M tokens",
    attrInput: "Input (1M tokens)",
    attrOutput: "Output (1M tokens)",
    attrContext: "Context window",
    attrLatency: "Latency · 1st token",
    attrBestFor: "Built for",
    attrReasoning: "Extended reasoning",
    yes: "Included",
    no: "—",
    models: [
      {
        id: "nascente",
        name: "Iara Nascente",
        tag: "fast",
        bestFor: "Real-time support, classification and triage at very high volume",
        context: "128k tokens",
        latency: "~180 ms",
        reasoning: false,
      },
      {
        id: "correnteza",
        name: "Iara Correnteza",
        tag: "balanced",
        bestFor: "The model for 90% of cases: support, content, data extraction",
        context: "256k tokens",
        latency: "~420 ms",
        reasoning: false,
      },
      {
        id: "profunda",
        name: "Iara Profunda",
        tag: "reasoning",
        bestFor: "Legal analysis, long documents and decisions that need a chain of thought",
        context: "256k tokens",
        latency: "~1.8 s",
        reasoning: true,
      },
    ],
    calc: {
      title: "What does your volume cost?",
      sub: "Drag and see. Estimate assumes 70% input tokens, 30% output.",
      volumeLabel: "Monthly volume",
      volumeUnit: "M tokens/month",
      modelLabel: "Model",
      totalLabel: "Estimated cost",
      perMonth: "/month",
      note: "Prices in Brazilian reais. Volumes above 500M/month get contract discounts.",
    },
  },
  cta: {
    title: "Talk to IARA in Portuguese.",
    sub: "Create an account, get R$ 20 in credits and make your first call in five minutes.",
    primary: "Start for free",
    secondary: "Talk to sales",
    bullets: ["R$ 20 in starting credits", "No credit card required", "Support in Portuguese, naturally"],
  },
  footer: {
    tagline: "The lady of the waters, now fluent in production.",
    nav: [
      { href: "#playground", label: "Playground" },
      { href: "#api", label: "API" },
      { href: "#seguranca", label: "Security" },
      { href: "#precos", label: "Pricing" },
    ],
    disclaimer: "IARA is a fictional concept created by VigApp.",
  },
};

/* ------------------------------------------------------------------ */
/* es — full translation, Brazilian universe kept intact                */
/* ------------------------------------------------------------------ */

const es: IaraContent = {
  localeTag: "es-ES",
  header: {
    nav: [
      { href: "#playground", label: "Playground" },
      { href: "#por-que", label: "Por qué" },
      { href: "#casos", label: "Casos" },
      { href: "#api", label: "API" },
      { href: "#seguranca", label: "Seguridad" },
      { href: "#precos", label: "Precios" },
    ],
    cta: "Crear cuenta",
  },
  hero: {
    eyebrow: "IARA · inteligencia artificial nacida en Brasil",
    titleA: "La IA que entiende",
    titleB: "a Brasil.",
    manifesto: "Entrenada en portugués de verdad — no traducido.",
    sub: "Boletos vencidos, facturas NF-e, cláusulas de la ley de alquileres, un cliente que promete pagar el lunes. IARA lo entiende porque nació allí: datos de Brasil, servidores en Brasil, portugués de Brasil.",
    proofNote: "Sin registro y sin tarjeta — el playground de abajo es la prueba.",
  },
  playground: {
    windowTitle: "playground.iara.com.br",
    region: "gru · saopaulo-1",
    modelChip: "iara-2-correnteza",
    tabsLabel: "Escenarios del playground",
    userLabel: "Tú",
    assistantLabel: "IARA",
    runAgain: "Ejecutar de nuevo",
    streamingLabel: "generando",
    doneLabel: "listo",
    firstTokenLabel: "1er token",
    tokensLabel: "tokens",
    tokPerSecLabel: "tok/s",
    scenarios: [
      {
        id: "atendimento",
        tab: "Atención",
        prompt:
          "Clasifica estos 4 tickets de soporte por urgencia: (1) “clonaron mi tarjeta, hay una compra que no hice”; (2) “¿cómo cambio la foto de perfil?”; (3) “la app no abre desde ayer y tengo un boleto que vence hoy”; (4) “¿tienen plan anual?”",
        response:
          "P0 · CRÍTICO — Ticket 1 (tarjeta clonada)\nSospecha de fraude con pérdida financiera en curso. Bloquear la tarjeta de inmediato, abrir la disputa y responder en menos de 15 minutos. La rapidez evita el contracargo — y la queja ante Procon.\n\nP1 · ALTO — Ticket 3 (app caída + boleto vence hoy)\nFalla técnica con plazo real: un boleto vencido genera multa del 2% más intereses diarios. Enviar la línea digitable por correo o WhatsApp ahora y guiar el pago por la banca en línea.\n\nP2 · MEDIO — Ticket 4 (plan anual)\nOportunidad comercial, no incidente. Derivar a ventas con respuesta en menos de 4 horas hábiles — el interés se enfría rápido.\n\nP3 · BAJO — Ticket 2 (foto de perfil)\nDuda de autoservicio. Responder con la guía del centro de ayuda y marcar como resuelto.",
      },
      {
        id: "juridico",
        tab: "Legal",
        prompt: "Resume este contrato de alquiler en 5 puntos. [contrato_residencial_v3.pdf]",
        response:
          "1. Partes e inmueble — Alquiler residencial del apto. 72 de Rua Harmonia 442, São Paulo/SP, entre Imobiliária Andrade (arrendadora) y Camila Ferreira (arrendataria).\n\n2. Plazo y renta — 30 meses, el estándar de la ley brasileña de alquileres. Renta de R$ 3.200 con vencimiento el día 5 y ajuste anual por el índice IGP-M.\n\n3. Garantía — Depósito de 3 meses (R$ 9.600) en cuenta de ahorro vinculada, devuelto con intereses al final del contrato.\n\n4. Punto de atención — La cláusula 8ª traslada al inquilino gastos extraordinarios del condominio (obras estructurales). Eso contradice el art. 22 de la Ley 8.245/91 y puede impugnarse.\n\n5. Rescisión — Multa de 3 rentas, proporcional a los meses restantes. Después del mes 12, salir con preaviso de 30 días reduce la multa a la mitad.",
      },
      {
        id: "ecommerce",
        tab: "E-commerce",
        prompt:
          "Escribe la descripción de estas zapatillas para Mercado Livre: Vento K2 running, amortiguación en gel, malla transpirable, tallas 38 a 44, negro con verde agua.",
        response:
          "Zapatillas Vento K2 — Running y Entrenamiento | Amortiguación en Gel\n\nDel entrenamiento del lunes a la tirada larga del domingo: las Vento K2 siguen tu ritmo.\n\n• Amortiguación en gel que absorbe cada pisada y cuida tus rodillas\n• Malla transpirable — pies secos incluso con el calor brasileño\n• Suela antideslizante para asfalto, cinta y adoquines\n• Tallas 38 a 44 · Negro con detalles verde agua\n\nENVÍO A TODO BRASIL\nDespachamos en menos de 24 h hábiles vía Mercado Envios Full.\n\nCOMPRA GARANTIZADA\nDevolución gratis hasta 30 días y nota fiscal en todas las compras.\n\n¿Dudas? Escríbenos en “Preguntar al vendedor” — respondemos rapidito.",
      },
      {
        id: "financeiro",
        tab: "Financiero",
        prompt:
          "Un cliente preguntó: “mi boleto venció ayer, ¿puedo pagarlo con Pix?” — responde como agente del banco.",
        response:
          "¡Claro que sí! Un boleto vencido hace 1 día sigue siendo pagable — y con Pix se acredita casi al instante:\n\n1. Abre la app y toca Pagos → Pagar boleto;\n2. Escanea el código de barras o pega la línea digitable;\n3. El monto ya aparece actualizado con el recargo por atraso (multa del 2% + intereses pro rata, según tu contrato);\n4. Elige Pix como medio de pago y confirma. Se acredita en minutos, incluso fuera del horario bancario.\n\nImportante: los boletos con más de 59 días de atraso pueden estar bloqueados por el emisor. En ese caso, solo pide una copia actualizada.\n\n¿Puedo ayudarte con algo más?",
      },
    ],
  },
  why: {
    label: "Por qué",
    title: "¿Por qué una IA brasileña?",
    intro:
      "Los modelos entrenados en inglés leen portugués como turistas: traducen las palabras y pierden el país entero. La diferencia vive en los detalles — y en Brasil, el detalle es el negocio.",
    inputLabel: "Entrada",
    genericLabel: "IA genérica",
    iaraLabel: "IARA",
    items: [
      {
        id: "giria",
        kicker: "Jerga y contexto",
        input: "“segunda eu te pago, juro” (el lunes te pago, lo juro)",
        generic:
          "Lo trata como una cita cualquiera: “¡Ok! Evento creado para el lunes.” La promesa de pago pasa de largo.",
        iara:
          "Reconoce una promesa informal de pago dentro de un flujo de cobranza: registra el compromiso, agenda seguimiento para el lunes a las 9h y responde con firmeza — sin ser grosera.",
      },
      {
        id: "docs",
        kicker: "Documentos brasileños",
        input: "“extrae los datos de esta NF-e”",
        generic:
          "Confunde CNPJ con CPF, ignora la clave de acceso y lee “1.234,56” como un decimal americano roto.",
        iara:
          "Valida la clave de 44 dígitos, separa ICMS de IPI, verifica el CNPJ del emisor y sabe que R$ 1.234,56 son mil doscientos treinta y cuatro reales con cincuenta y seis centavos.",
      },
      {
        id: "datas",
        kicker: "Fechas y moneda",
        input: "“la reunión es el 06/07, presupuesto de R$ 10 mil”",
        generic:
          "Lee June 7th, convierte a dólares y devuelve “$10,000.00” — dos errores en una línea.",
        iara:
          "06/07 es 6 de julio — dd/mm, siempre. Y “R$ 10 mil” se convierte en R$ 10.000,00, formateado como se escribe en Brasil.",
      },
    ],
  },
  cases: {
    label: "Casos",
    title: "Quiénes ya hablan con IARA",
    intro: "Cuatro sectores, cuatro operaciones brasileñas — del piso de tienda al contencioso.",
    fictionNote: "Empresas y cifras ficticias, creadas para este concepto.",
    items: [
      {
        id: "varejo",
        number: "01",
        sector: "Retail",
        company: "Lojas Maré · moda, 84 tiendas",
        summary: "Descripciones de producto y atención unificadas en una sola operación.",
        body:
          "Maré conectó IARA a su catálogo: cada producto nuevo recibe descripción para el sitio, Mercado Livre y Shopee en segundos, con la voz de la marca. En soporte, IARA resuelve cambios, rastreo y cupones sin fila — y escala a un humano cuando el tema es delicado.",
        metrics: [
          { value: "+22%", label: "conversión en las descripciones generadas" },
          { value: "-38%", label: "tiempo medio de respuesta en soporte" },
          { value: "R$ 1,4 M", label: "ahorrados por año" },
        ],
      },
      {
        id: "atendimento",
        number: "02",
        sector: "Atención",
        company: "ConectaCel · operadora regional",
        summary: "Copias de boleto, planes, cobertura: resuelto antes de llegar a un humano.",
        body:
          "El call center de ConectaCel recibía 40.000 llamadas al mes — la mitad eran copias de boleto y dudas de datos. IARA asumió el WhatsApp oficial: entiende la pregunta tal como la escribe el cliente, la resuelve al momento y registra todo en el CRM.",
        metrics: [
          { value: "71%", label: "de tickets resueltos sin humano" },
          { value: "4,6/5", label: "CSAT medio posatención" },
          { value: "40 s", label: "tiempo medio de resolución" },
        ],
      },
      {
        id: "juridico",
        number: "03",
        sector: "Legal",
        company: "Bastos & Nogueira Advogados",
        summary: "Revisión de contratos en minutos, con la legislación brasileña en memoria.",
        body:
          "El despacho revisa 2.400 contratos al mes. IARA Profunda lee cada borrador, señala cláusulas en conflicto con la ley brasileña, sugiere redacción alternativa y arma el resumen ejecutivo que el socio lee en 2 minutos.",
        metrics: [
          { value: "3h → 12min", label: "análisis medio por contrato" },
          { value: "96%", label: "precisión en la revisión de cláusulas" },
          { value: "2.400", label: "contratos procesados al mes" },
        ],
      },
      {
        id: "saude",
        number: "04",
        sector: "Salud",
        company: "Rede Vida Clínicas · 31 unidades",
        summary: "Agendamiento por WhatsApp y recordatorios que el paciente sí responde.",
        body:
          "El paciente agenda, reagenda y confirma su cita conversando con IARA por WhatsApp — en lenguaje natural, no con menús numéricos. Los datos clínicos permanecen en la región saopaulo-1, con trazabilidad completa para la LGPD, la ley brasileña de protección de datos.",
        metrics: [
          { value: "-52%", label: "de ausencias con recordatorio conversacional" },
          { value: "83%", label: "de las citas sin llamada telefónica" },
          { value: "100%", label: "de los datos alojados en Brasil" },
        ],
      },
    ],
  },
  api: {
    label: "API",
    title: "Una llamada. Portugués fluido.",
    intro: "REST simple, streaming nativo y SDKs idiomáticos. De curl a producción el mismo día.",
    requestLabel: "petición",
    responseLabel: "stream · SSE",
    bullets: [
      {
        title: "SDKs de TypeScript y Python",
        body: "Tipados, con reintentos y streaming incluidos. npm install @iara/sdk y listo.",
      },
      {
        title: "Streaming SSE token a token",
        body: "Primeros bytes en milisegundos — la UX de chat que tus usuarios esperan.",
      },
      {
        title: "99,9% de uptime, 38 ms desde São Paulo",
        body: "Inferencia en un datacenter paulista: latencia mediana de 38 ms para quien está en Brasil.",
      },
    ],
    sseLines: [
      'data: {"delta":"Factura 4.520 de"}',
      'data: {"delta":" Andrade Ltda, R$ 12.480,00,"}',
      'data: {"delta":" ICMS destacado de R$ 1.497,60…"}',
      "data: [DONE]",
    ],
  },
  security: {
    label: "Seguridad",
    title: "Tus datos, en aguas brasileñas.",
    intro:
      "La profundidad es protección. Cada capa de IARA fue diseñada para la LGPD — no adaptada después.",
    surfaceLabel: "superficie",
    layers: [
      {
        depth: "0 m",
        title: "Datos alojados en Brasil",
        body: "Inferencia y almacenamiento en la región saopaulo-1. Nada cruza la frontera — ni siquiera los backups.",
      },
      {
        depth: "−200 m",
        title: "LGPD por defecto",
        body: "DPO dedicado, informes de impacto por proyecto, base legal documentada y DPA firmado en el onboarding.",
      },
      {
        depth: "−1.000 m",
        title: "Tus datos no entrenan a IARA",
        body: "El opt-out de entrenamiento es el estándar, no la excepción. Retención cero disponible para datos sensibles.",
      },
      {
        depth: "−4.000 m",
        title: "Certificada de punta a punta",
        body: "ISO 27001 y SOC 2 Tipo II. AES-256 en reposo, TLS 1.3 en tránsito, claves gestionadas por HSM.",
      },
    ],
  },
  pricing: {
    label: "Precios",
    title: "Precios en reales, por millón de tokens.",
    intro: "Sin dólares, sin impuesto IOF, sin sorpresas cambiarias. Tres corrientes, un contrato en BRL.",
    flagshipTag: "insignia",
    perMillion: "por 1M de tokens",
    attrInput: "Entrada (1M tokens)",
    attrOutput: "Salida (1M tokens)",
    attrContext: "Ventana de contexto",
    attrLatency: "Latencia · 1er token",
    attrBestFor: "Hecha para",
    attrReasoning: "Razonamiento extendido",
    yes: "Incluido",
    no: "—",
    models: [
      {
        id: "nascente",
        name: "Iara Nascente",
        tag: "veloz",
        bestFor: "Soporte en tiempo real, clasificación y triaje en volúmenes altísimos",
        context: "128k tokens",
        latency: "~180 ms",
        reasoning: false,
      },
      {
        id: "correnteza",
        name: "Iara Correnteza",
        tag: "equilibrio",
        bestFor: "El modelo para el 90% de los casos: atención, contenido, extracción de datos",
        context: "256k tokens",
        latency: "~420 ms",
        reasoning: false,
      },
      {
        id: "profunda",
        name: "Iara Profunda",
        tag: "razonamiento",
        bestFor: "Análisis legal, documentos largos y decisiones que exigen cadena de razonamiento",
        context: "256k tokens",
        latency: "~1,8 s",
        reasoning: true,
      },
    ],
    calc: {
      title: "¿Cuánto cuesta con tu volumen?",
      sub: "Arrastra y mira. Estimación con 70% de tokens de entrada y 30% de salida.",
      volumeLabel: "Volumen mensual",
      volumeUnit: "M de tokens/mes",
      modelLabel: "Modelo",
      totalLabel: "Costo estimado",
      perMonth: "/mes",
      note: "Valores en reales brasileños. Volúmenes sobre 500 M/mes tienen descuento por contrato.",
    },
  },
  cta: {
    title: "Habla con IARA en portugués.",
    sub: "Crea tu cuenta, recibe R$ 20 en créditos y haz tu primera llamada en cinco minutos.",
    primary: "Empezar gratis",
    secondary: "Hablar con ventas",
    bullets: ["R$ 20 en créditos iniciales", "Sin tarjeta de crédito", "Soporte en portugués, claro"],
  },
  footer: {
    tagline: "La señora de las aguas, ahora fluida en producción.",
    nav: [
      { href: "#playground", label: "Playground" },
      { href: "#api", label: "API" },
      { href: "#seguranca", label: "Seguridad" },
      { href: "#precos", label: "Precios" },
    ],
    disclaimer: "IARA es un concepto ficticio creado por VigApp.",
  },
};

export const iaraDict: DemoDictionary<IaraContent> = { en, pt, es };
