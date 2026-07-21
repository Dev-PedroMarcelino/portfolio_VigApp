import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type ModelTierId = "flux" | "core" | "atlas";
export type UseCaseId = "support" | "code" | "research" | "content";
export type ScenarioId = "support" | "code" | "research";
export type SecurityIconId = "shield" | "lock" | "key" | "fingerprint" | "server" | "eye";

export interface NavContent {
  links: { href: string; label: string }[];
  login: string;
  cta: string;
  openMenu: string;
  closeMenu: string;
}

export interface HeroContent {
  badge: string;
  titlePre: string;
  titleAccent: string;
  titlePost: string;
  promise: string;
  ctaPrimary: string;
  ctaSecondary: string;
  terminalLines: string[];
  stats: { value: string; label: string }[];
}

export interface PlaygroundScenario {
  id: ScenarioId;
  label: string;
  prompt: string;
  response: string;
}

export interface PlaygroundModel {
  id: ModelTierId;
  name: string;
  tag: string;
  latencyMs: number;
}

export interface PlaygroundContent {
  label: string;
  title: string;
  intro: string;
  modelLabel: string;
  presetLabel: string;
  promptLabel: string;
  placeholder: string;
  run: string;
  running: string;
  reset: string;
  outputLabel: string;
  idleHint: string;
  latencyLabel: string;
  tokensLabel: string;
  streamingLabel: string;
  doneLabel: string;
  models: PlaygroundModel[];
  scenarios: PlaygroundScenario[];
}

export interface UseCaseTab {
  id: UseCaseId;
  label: string;
  title: string;
  body: string;
  bullets: string[];
  metricValue: string;
  metricLabel: string;
  image: string;
  alt: string;
}

export interface UseCasesContent {
  label: string;
  title: string;
  intro: string;
  tabs: UseCaseTab[];
}

export interface ModelRow {
  id: ModelTierId;
  name: string;
  desc: string;
  context: string;
  throughput: string;
  price: string;
  best: string;
  featured: boolean;
}

export interface ModelsContent {
  label: string;
  title: string;
  intro: string;
  headers: { model: string; context: string; throughput: string; price: string; best: string };
  rows: ModelRow[];
  note: string;
  popular: string;
}

export interface SecurityContent {
  label: string;
  title: string;
  intro: string;
  items: { icon: SecurityIconId; title: string; body: string }[];
  certs: string[];
}

export interface CalcTier {
  id: ModelTierId;
  name: string;
  ratePerMillion: number;
}

export interface PricingCalcContent {
  title: string;
  sliderLabel: string;
  requestsUnit: string;
  tierLabel: string;
  tokensLabel: string;
  estLabel: string;
  perMonth: string;
  avgTokensNote: string;
  currency: string;
  numberLocale: string;
  avgTokensPerRequest: number;
  sliderMin: number;
  sliderMax: number;
  sliderStep: number;
  tiers: CalcTier[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  cta: string;
  featured: boolean;
}

export interface PricingContent {
  label: string;
  title: string;
  intro: string;
  calc: PricingCalcContent;
  plans: PricingPlan[];
}

export interface CtaContent {
  label: string;
  title: string;
  body: string;
  ctaPrimary: string;
  ctaSecondary: string;
  note: string;
}

export interface FooterContent {
  tagline: string;
  columns: { title: string; links: string[] }[];
  socials: { label: string; icon: "at" | "share" | "globe" | "message" }[];
  legal: string;
  status: string;
}

export interface CortexaContent {
  nav: NavContent;
  hero: HeroContent;
  playground: PlaygroundContent;
  useCases: UseCasesContent;
  models: ModelsContent;
  security: SecurityContent;
  pricing: PricingContent;
  cta: CtaContent;
  footer: FooterContent;
}

/* ------------------------------------------------------------------ */
/* Photography                                                         */
/* ------------------------------------------------------------------ */

const IMG = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const IMAGES = {
  support: IMG("photo-1655720828018-edd2daec9349"),
  code: IMG("photo-1526374965328-7f61d4dc18c5"),
  research: IMG("photo-1620712943543-bcc4688e7485"),
  content: IMG("photo-1677442136019-21780ecad995"),
};

/* ------------------------------------------------------------------ */
/* English (structural fallback)                                       */
/* ------------------------------------------------------------------ */

const en: CortexaContent = {
  nav: {
    links: [
      { href: "#playground", label: "Playground" },
      { href: "#usecases", label: "Use cases" },
      { href: "#models", label: "Models" },
      { href: "#security", label: "Security" },
      { href: "#pricing", label: "Pricing" },
    ],
    login: "Sign in",
    cta: "Start building",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    badge: "Cortexa Neural API v4",
    titlePre: "The reasoning layer",
    titleAccent: "your product",
    titlePost: "has been waiting for.",
    promise:
      "One endpoint. Three frontier models. Sub-second inference that reads, reasons and writes so your team ships intelligence instead of maintaining it.",
    ctaPrimary: "Open the playground",
    ctaSecondary: "Read the docs",
    terminalLines: [
      "$ cortexa infer --model atlas",
      "> analyzing 12,480 tokens of context",
      "> streaming response · 41ms first token",
      "> confidence 0.97 · grounded · complete",
    ],
    stats: [
      { value: "41ms", label: "Median first token" },
      { value: "99.98%", label: "Monthly uptime" },
      { value: "200K", label: "Context window" },
    ],
  },
  playground: {
    label: "Live playground",
    title: "Type a prompt. Watch it think.",
    intro:
      "This is the real streaming interface, wired to three canned scenarios so you can feel the latency without an API key.",
    modelLabel: "Model",
    presetLabel: "Try a scenario",
    promptLabel: "Your prompt",
    placeholder: "Ask Cortexa anything, or pick a scenario above",
    run: "Run inference",
    running: "Generating",
    reset: "Clear",
    outputLabel: "Response",
    idleHint: "Pick a scenario or write a prompt, then run inference to stream a response.",
    latencyLabel: "First token",
    tokensLabel: "Tokens",
    streamingLabel: "Streaming",
    doneLabel: "Complete",
    models: [
      { id: "flux", name: "Cortexa Flux", tag: "Fast", latencyMs: 22 },
      { id: "core", name: "Cortexa Core", tag: "Balanced", latencyMs: 41 },
      { id: "atlas", name: "Cortexa Atlas", tag: "Frontier", latencyMs: 63 },
    ],
    scenarios: [
      {
        id: "support",
        label: "Support reply",
        prompt: "A customer says their invoice was charged twice this month. Draft a calm, empathetic reply.",
        response:
          "Hi Maria,\n\nThank you for flagging this, and I'm sorry for the worry a double charge causes. I've reviewed your account and confirmed a duplicate charge of $49.00 on July 18. I've already issued a full refund, which will land on your card within 3 to 5 business days.\n\nTo make sure it doesn't recur, I've merged the duplicate payment method on file. If anything looks off in the meantime, just reply here and I'll jump straight back in.\n\nWarm regards,\nThe Cortexa Care team",
      },
      {
        id: "code",
        label: "Debounce helper",
        prompt: "Write a small TypeScript debounce helper with a cancel method and proper typing.",
        response:
          "function debounce<A extends unknown[]>(\n  fn: (...args: A) => void,\n  wait = 200,\n) {\n  let timer: ReturnType<typeof setTimeout> | null = null;\n\n  const debounced = (...args: A) => {\n    if (timer) clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), wait);\n  };\n\n  debounced.cancel = () => {\n    if (timer) clearTimeout(timer);\n    timer = null;\n  };\n\n  return debounced;\n}\n\n// Trailing-edge by default; call .cancel() to drop a pending run.",
      },
      {
        id: "research",
        label: "Search tradeoffs",
        prompt: "Summarize the tradeoffs between vector search and keyword search for a docs product.",
        response:
          "Vector search wins on meaning. It matches intent even when the wording differs, which is ideal for support questions phrased a hundred ways. The cost is index maintenance, embedding drift, and results that can feel fuzzy on exact strings.\n\nKeyword search wins on precision. Error codes, API names and version numbers resolve exactly, cheaply, and predictably, but it misses paraphrase entirely.\n\nFor a docs product the pragmatic answer is hybrid: run both, then re-rank. Keyword guarantees the exact-match hits surface; vectors recover the long tail of natural-language questions. Cortexa ships this fusion by default.",
      },
    ],
  },
  useCases: {
    label: "Built for real work",
    title: "One platform, wherever intelligence pays off.",
    intro:
      "Teams route support, engineering, research and content through a single Cortexa endpoint, then specialize with tools and retrieval.",
    tabs: [
      {
        id: "support",
        label: "Customer support",
        title: "Resolve tickets before a human reads them.",
        body: "Cortexa drafts grounded, on-brand replies from your help center and past conversations, then hands off cleanly the moment a case needs a person.",
        bullets: [
          "Retrieval grounded in your own knowledge base",
          "Sentiment-aware escalation to live agents",
          "Every reply cites the source it drew from",
        ],
        metricValue: "68%",
        metricLabel: "Tickets auto-resolved",
        image: IMAGES.support,
        alt: "Abstract violet gradient representing conversational AI",
      },
      {
        id: "code",
        label: "Engineering",
        title: "A reviewer that never sleeps.",
        body: "Explain a stack trace, generate a migration, or scaffold tests in the editor. Cortexa reasons over the whole repository, not a single file.",
        bullets: [
          "Repository-wide context, not snippets",
          "Inline patches you can apply or reject",
          "Guardrails that block leaking secrets",
        ],
        metricValue: "3.4x",
        metricLabel: "Faster pull requests",
        image: IMAGES.code,
        alt: "Cascading green code reminiscent of a matrix display",
      },
      {
        id: "research",
        label: "Research",
        title: "Read a thousand pages by lunch.",
        body: "Point Cortexa at contracts, papers or filings and get grounded synthesis with citations, so analysts spend their hours on judgment, not skimming.",
        bullets: [
          "Cross-document synthesis with page-level citations",
          "Structured extraction into your schema",
          "Confidence scoring on every claim",
        ],
        metricValue: "12h",
        metricLabel: "Saved per analyst weekly",
        image: IMAGES.research,
        alt: "Abstract flowing shapes suggesting machine reasoning",
      },
      {
        id: "content",
        label: "Content",
        title: "A brand voice that scales.",
        body: "Generate launch copy, localize a campaign into nine markets, and keep every word inside your tone guide with a single prompt template.",
        bullets: [
          "Tone guardrails enforced per generation",
          "One-pass localization across markets",
          "Draft, critique and revise in a single call",
        ],
        metricValue: "9",
        metricLabel: "Markets from one brief",
        image: IMAGES.content,
        alt: "Luminous abstract render evoking generative creativity",
      },
    ],
  },
  models: {
    label: "Model tiers",
    title: "Pick the intelligence the moment demands.",
    intro:
      "Route the easy calls to Flux, the workhorse traffic to Core, and the hard reasoning to Atlas. Same API, one line to switch.",
    headers: {
      model: "Model",
      context: "Context",
      throughput: "Throughput",
      price: "Price / 1M tokens",
      best: "Best for",
    },
    rows: [
      {
        id: "flux",
        name: "Cortexa Flux",
        desc: "Instant classification and routing",
        context: "32K",
        throughput: "480 tok/s",
        price: "$0.15",
        best: "Tagging, routing, guardrails",
        featured: false,
      },
      {
        id: "core",
        name: "Cortexa Core",
        desc: "The everyday reasoning engine",
        context: "128K",
        throughput: "210 tok/s",
        price: "$2.50",
        best: "Support, chat, retrieval",
        featured: true,
      },
      {
        id: "atlas",
        name: "Cortexa Atlas",
        desc: "Frontier reasoning and analysis",
        context: "200K",
        throughput: "96 tok/s",
        price: "$12.00",
        best: "Research, code, planning",
        featured: false,
      },
    ],
    note: "All tiers share the same endpoint, streaming protocol and safety layer. Switch models by changing one parameter.",
    popular: "Most used",
  },
  security: {
    label: "Trust by design",
    title: "Enterprise-grade from the first request.",
    intro:
      "Your prompts and completions are yours. Cortexa is engineered so security is the default, not a paid add-on.",
    items: [
      { icon: "lock", title: "Encrypted end to end", body: "TLS 1.3 in transit and AES-256 at rest across every region and replica." },
      { icon: "eye", title: "Zero data retention", body: "Opt into a no-log mode where prompts are discarded the instant a response completes." },
      { icon: "shield", title: "Never trained on your data", body: "Your inputs and outputs are never used to train foundation models. Contractually." },
      { icon: "key", title: "Granular access keys", body: "Scoped, rotatable keys with per-key rate limits and full audit trails." },
      { icon: "server", title: "Regional isolation", body: "Pin inference to US, EU or APAC so data never leaves the boundary you choose." },
      { icon: "fingerprint", title: "SSO and SCIM", body: "SAML single sign-on and automated provisioning for teams of every size." },
    ],
    certs: ["SOC 2 Type II", "ISO 27001", "GDPR", "HIPAA ready"],
  },
  pricing: {
    label: "Pricing",
    title: "Pay for tokens, not seats.",
    intro:
      "Usage-based to the token, with volume discounts that kick in automatically. Estimate your bill below.",
    calc: {
      title: "Estimate your monthly spend",
      sliderLabel: "Requests per month",
      requestsUnit: "requests",
      tierLabel: "Model tier",
      tokensLabel: "Estimated tokens",
      estLabel: "Estimated monthly cost",
      perMonth: "/ month",
      avgTokensNote: "Assumes an average of 1,800 tokens per request across prompt and completion.",
      currency: "USD",
      numberLocale: "en-US",
      avgTokensPerRequest: 1800,
      sliderMin: 10000,
      sliderMax: 5000000,
      sliderStep: 10000,
      tiers: [
        { id: "flux", name: "Flux", ratePerMillion: 0.15 },
        { id: "core", name: "Core", ratePerMillion: 2.5 },
        { id: "atlas", name: "Atlas", ratePerMillion: 12 },
      ],
    },
    plans: [
      {
        id: "starter",
        name: "Starter",
        price: "$0",
        period: "to begin",
        desc: "Everything a prototype needs to reach its first users.",
        features: ["1M free tokens monthly", "Flux and Core models", "Community support", "Shared rate limits"],
        cta: "Start free",
        featured: false,
      },
      {
        id: "scale",
        name: "Scale",
        price: "$499",
        period: "/ month + usage",
        desc: "For products in production with real traffic and real SLAs.",
        features: ["All three model tiers", "99.9% uptime SLA", "Zero-retention mode", "Priority routing", "Email and chat support"],
        cta: "Choose Scale",
        featured: true,
      },
      {
        id: "enterprise",
        name: "Enterprise",
        price: "Custom",
        period: "annual",
        desc: "Regional isolation, dedicated capacity and a named engineer.",
        features: ["Dedicated inference capacity", "Regional data residency", "SSO, SCIM and audit logs", "Solutions engineer", "Custom fine-tuning"],
        cta: "Talk to sales",
        featured: false,
      },
    ],
  },
  cta: {
    label: "Ship intelligence",
    title: "Your first inference is ninety seconds away.",
    body: "Create a key, paste four lines, and stream your first grounded completion before your coffee cools.",
    ctaPrimary: "Create an API key",
    ctaSecondary: "Book a walkthrough",
    note: "No credit card. 1M tokens on the house.",
  },
  footer: {
    tagline: "The reasoning layer for products that think.",
    columns: [
      { title: "Product", links: ["Playground", "Models", "Pricing", "Changelog", "Status"] },
      { title: "Developers", links: ["Documentation", "API reference", "SDKs", "Cookbook", "Rate limits"] },
      { title: "Company", links: ["About", "Careers", "Research", "Security", "Contact"] },
    ],
    socials: [
      { label: "Email", icon: "at" },
      { label: "Community", icon: "message" },
      { label: "Share", icon: "share" },
      { label: "Website", icon: "globe" },
    ],
    legal: "Cortexa Labs, Inc. A fictional concept crafted by VigApp.",
    status: "All systems operational",
  },
};

/* ------------------------------------------------------------------ */
/* Portuguese                                                          */
/* ------------------------------------------------------------------ */

const pt: CortexaContent = {
  nav: {
    links: [
      { href: "#playground", label: "Playground" },
      { href: "#usecases", label: "Casos de uso" },
      { href: "#models", label: "Modelos" },
      { href: "#security", label: "Seguranca" },
      { href: "#pricing", label: "Precos" },
    ],
    login: "Entrar",
    cta: "Comecar a construir",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
  },
  hero: {
    badge: "Cortexa Neural API v4",
    titlePre: "A camada de raciocinio",
    titleAccent: "que seu produto",
    titlePost: "esperava para nascer.",
    promise:
      "Um endpoint. Tres modelos de fronteira. Inferencia em menos de um segundo que le, raciocina e escreve, para seu time entregar inteligencia em vez de manter infraestrutura.",
    ctaPrimary: "Abrir o playground",
    ctaSecondary: "Ler a documentacao",
    terminalLines: [
      "$ cortexa infer --model atlas",
      "> analisando 12.480 tokens de contexto",
      "> transmitindo resposta · 41ms ate o primeiro token",
      "> confianca 0,97 · fundamentado · completo",
    ],
    stats: [
      { value: "41ms", label: "Mediana ate o 1o token" },
      { value: "99,98%", label: "Disponibilidade mensal" },
      { value: "200K", label: "Janela de contexto" },
    ],
  },
  playground: {
    label: "Playground ao vivo",
    title: "Digite um prompt. Veja a maquina pensar.",
    intro:
      "Esta e a interface de streaming real, ligada a tres cenarios prontos para voce sentir a latencia sem precisar de chave.",
    modelLabel: "Modelo",
    presetLabel: "Escolha um cenario",
    promptLabel: "Seu prompt",
    placeholder: "Pergunte qualquer coisa a Cortexa ou escolha um cenario acima",
    run: "Executar inferencia",
    running: "Gerando",
    reset: "Limpar",
    outputLabel: "Resposta",
    idleHint: "Escolha um cenario ou escreva um prompt e execute a inferencia para transmitir a resposta.",
    latencyLabel: "Primeiro token",
    tokensLabel: "Tokens",
    streamingLabel: "Transmitindo",
    doneLabel: "Completo",
    models: [
      { id: "flux", name: "Cortexa Flux", tag: "Rapido", latencyMs: 22 },
      { id: "core", name: "Cortexa Core", tag: "Equilibrado", latencyMs: 41 },
      { id: "atlas", name: "Cortexa Atlas", tag: "Fronteira", latencyMs: 63 },
    ],
    scenarios: [
      {
        id: "support",
        label: "Resposta de suporte",
        prompt: "Um cliente diz que a fatura foi cobrada duas vezes neste mes. Escreva uma resposta calma e empatica.",
        response:
          "Ola, Maria,\n\nObrigado por avisar, e sinto muito pela preocupacao que uma cobranca duplicada causa. Revisei sua conta e confirmei uma cobranca duplicada de R$ 49,00 em 18 de julho. Ja emiti o estorno integral, que aparecera no seu cartao em 3 a 5 dias uteis.\n\nPara garantir que nao se repita, unifiquei o metodo de pagamento duplicado no cadastro. Se algo parecer estranho nesse meio tempo, e so responder aqui que eu retomo na hora.\n\nUm abraco,\nEquipe Cortexa Care",
      },
      {
        id: "code",
        label: "Funcao debounce",
        prompt: "Escreva uma pequena funcao debounce em TypeScript com metodo de cancelamento e tipagem correta.",
        response:
          "function debounce<A extends unknown[]>(\n  fn: (...args: A) => void,\n  wait = 200,\n) {\n  let timer: ReturnType<typeof setTimeout> | null = null;\n\n  const debounced = (...args: A) => {\n    if (timer) clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), wait);\n  };\n\n  debounced.cancel = () => {\n    if (timer) clearTimeout(timer);\n    timer = null;\n  };\n\n  return debounced;\n}\n\n// Borda de saida por padrao; chame .cancel() para descartar uma execucao pendente.",
      },
      {
        id: "research",
        label: "Busca vetorial",
        prompt: "Resuma os tradeoffs entre busca vetorial e busca por palavra-chave para um produto de documentacao.",
        response:
          "A busca vetorial ganha em significado. Ela encontra a intencao mesmo quando as palavras mudam, ideal para duvidas de suporte feitas de cem maneiras. O custo e a manutencao do indice, o desvio dos embeddings e resultados que parecem imprecisos em termos exatos.\n\nA busca por palavra-chave ganha em precisao. Codigos de erro, nomes de API e numeros de versao aparecem de forma exata e barata, mas ela ignora completamente a parafrase.\n\nPara um produto de documentacao a resposta pragmatica e o hibrido: rode os dois e reordene. A palavra-chave garante os acertos exatos; os vetores recuperam a cauda longa das perguntas em linguagem natural. A Cortexa entrega essa fusao por padrao.",
      },
    ],
  },
  useCases: {
    label: "Feita para trabalho real",
    title: "Uma plataforma, onde a inteligencia der retorno.",
    intro:
      "Times roteiam suporte, engenharia, pesquisa e conteudo por um unico endpoint Cortexa e especializam com ferramentas e recuperacao.",
    tabs: [
      {
        id: "support",
        label: "Suporte ao cliente",
        title: "Resolva chamados antes de um humano ler.",
        body: "A Cortexa redige respostas fundamentadas e no tom da marca a partir da sua central de ajuda e conversas passadas, e faz a passagem limpa no instante em que o caso precisa de uma pessoa.",
        bullets: [
          "Recuperacao fundamentada na sua base de conhecimento",
          "Escalonamento por sentimento para agentes humanos",
          "Cada resposta cita a fonte que utilizou",
        ],
        metricValue: "68%",
        metricLabel: "Chamados resolvidos sozinhos",
        image: IMAGES.support,
        alt: "Gradiente violeta abstrato representando IA conversacional",
      },
      {
        id: "code",
        label: "Engenharia",
        title: "Um revisor que nunca dorme.",
        body: "Explique um stack trace, gere uma migracao ou monte testes no editor. A Cortexa raciocina sobre o repositorio inteiro, nao um unico arquivo.",
        bullets: [
          "Contexto do repositorio inteiro, nao trechos",
          "Correcoes em linha que voce aceita ou rejeita",
          "Barreiras que bloqueiam vazamento de segredos",
        ],
        metricValue: "3,4x",
        metricLabel: "Pull requests mais rapidos",
        image: IMAGES.code,
        alt: "Codigo verde em cascata lembrando um display matrix",
      },
      {
        id: "research",
        label: "Pesquisa",
        title: "Leia mil paginas ate o almoco.",
        body: "Aponte a Cortexa para contratos, artigos ou balancos e receba sintese fundamentada com citacoes, para analistas gastarem horas com julgamento, nao leitura.",
        bullets: [
          "Sintese entre documentos com citacoes por pagina",
          "Extracao estruturada no seu esquema",
          "Pontuacao de confianca em cada afirmacao",
        ],
        metricValue: "12h",
        metricLabel: "Economizadas por analista/semana",
        image: IMAGES.research,
        alt: "Formas fluidas abstratas sugerindo raciocinio de maquina",
      },
      {
        id: "content",
        label: "Conteudo",
        title: "Uma voz de marca que escala.",
        body: "Gere textos de lancamento, localize uma campanha em nove mercados e mantenha cada palavra dentro do seu guia de tom com um unico template de prompt.",
        bullets: [
          "Barreiras de tom aplicadas a cada geracao",
          "Localizacao em uma passada entre mercados",
          "Rascunho, critica e revisao numa so chamada",
        ],
        metricValue: "9",
        metricLabel: "Mercados a partir de um briefing",
        image: IMAGES.content,
        alt: "Render abstrato luminoso evocando criatividade generativa",
      },
    ],
  },
  models: {
    label: "Camadas de modelo",
    title: "Escolha a inteligencia que o momento pede.",
    intro:
      "Mande as chamadas faceis para o Flux, o trafego de rotina para o Core e o raciocinio dificil para o Atlas. Mesma API, uma linha para trocar.",
    headers: {
      model: "Modelo",
      context: "Contexto",
      throughput: "Vazao",
      price: "Preco / 1M tokens",
      best: "Melhor para",
    },
    rows: [
      {
        id: "flux",
        name: "Cortexa Flux",
        desc: "Classificacao e roteamento instantaneos",
        context: "32K",
        throughput: "480 tok/s",
        price: "R$ 0,80",
        best: "Marcacao, roteamento, barreiras",
        featured: false,
      },
      {
        id: "core",
        name: "Cortexa Core",
        desc: "O motor de raciocinio do dia a dia",
        context: "128K",
        throughput: "210 tok/s",
        price: "R$ 13,00",
        best: "Suporte, chat, recuperacao",
        featured: true,
      },
      {
        id: "atlas",
        name: "Cortexa Atlas",
        desc: "Raciocinio e analise de fronteira",
        context: "200K",
        throughput: "96 tok/s",
        price: "R$ 62,00",
        best: "Pesquisa, codigo, planejamento",
        featured: false,
      },
    ],
    note: "Todas as camadas compartilham o mesmo endpoint, protocolo de streaming e camada de seguranca. Troque de modelo mudando um parametro.",
    popular: "Mais usado",
  },
  security: {
    label: "Confianca por design",
    title: "Padrao corporativo desde a primeira chamada.",
    intro:
      "Seus prompts e respostas sao seus. A Cortexa foi projetada para que seguranca seja o padrao, nao um extra pago.",
    items: [
      { icon: "lock", title: "Criptografia ponta a ponta", body: "TLS 1.3 em transito e AES-256 em repouso em cada regiao e replica." },
      { icon: "eye", title: "Retencao zero de dados", body: "Ative um modo sem log em que os prompts sao descartados assim que a resposta termina." },
      { icon: "shield", title: "Nunca treinamos com seus dados", body: "Suas entradas e saidas nunca treinam modelos base. Por contrato." },
      { icon: "key", title: "Chaves de acesso granulares", body: "Chaves com escopo e rotacao, limite por chave e trilha de auditoria completa." },
      { icon: "server", title: "Isolamento regional", body: "Fixe a inferencia em US, UE ou APAC para os dados nunca saírem do limite escolhido." },
      { icon: "fingerprint", title: "SSO e SCIM", body: "Login unico SAML e provisionamento automatico para times de qualquer tamanho." },
    ],
    certs: ["SOC 2 Tipo II", "ISO 27001", "LGPD", "Pronto para HIPAA"],
  },
  pricing: {
    label: "Precos",
    title: "Pague por tokens, nao por assentos.",
    intro:
      "Baseado em uso ate o token, com descontos por volume que entram automaticamente. Estime sua conta abaixo.",
    calc: {
      title: "Estime seu gasto mensal",
      sliderLabel: "Requisicoes por mes",
      requestsUnit: "requisicoes",
      tierLabel: "Camada de modelo",
      tokensLabel: "Tokens estimados",
      estLabel: "Custo mensal estimado",
      perMonth: "/ mes",
      avgTokensNote: "Assume uma media de 1.800 tokens por requisicao entre prompt e resposta.",
      currency: "BRL",
      numberLocale: "pt-BR",
      avgTokensPerRequest: 1800,
      sliderMin: 10000,
      sliderMax: 5000000,
      sliderStep: 10000,
      tiers: [
        { id: "flux", name: "Flux", ratePerMillion: 0.8 },
        { id: "core", name: "Core", ratePerMillion: 13 },
        { id: "atlas", name: "Atlas", ratePerMillion: 62 },
      ],
    },
    plans: [
      {
        id: "starter",
        name: "Starter",
        price: "R$ 0",
        period: "para comecar",
        desc: "Tudo que um prototipo precisa para chegar aos primeiros usuarios.",
        features: ["1M de tokens gratis por mes", "Modelos Flux e Core", "Suporte da comunidade", "Limites compartilhados"],
        cta: "Comecar gratis",
        featured: false,
      },
      {
        id: "scale",
        name: "Scale",
        price: "R$ 2.490",
        period: "/ mes + uso",
        desc: "Para produtos em producao com trafego real e SLAs reais.",
        features: ["Todas as tres camadas", "SLA de 99,9% de disponibilidade", "Modo de retencao zero", "Roteamento prioritario", "Suporte por email e chat"],
        cta: "Escolher Scale",
        featured: true,
      },
      {
        id: "enterprise",
        name: "Enterprise",
        price: "Sob medida",
        period: "anual",
        desc: "Isolamento regional, capacidade dedicada e um engenheiro nomeado.",
        features: ["Capacidade de inferencia dedicada", "Residencia regional de dados", "SSO, SCIM e logs de auditoria", "Engenheiro de solucoes", "Fine-tuning personalizado"],
        cta: "Falar com vendas",
        featured: false,
      },
    ],
  },
  cta: {
    label: "Entregue inteligencia",
    title: "Sua primeira inferencia esta a noventa segundos.",
    body: "Crie uma chave, cole quatro linhas e transmita sua primeira resposta fundamentada antes do cafe esfriar.",
    ctaPrimary: "Criar chave de API",
    ctaSecondary: "Agendar uma demonstracao",
    note: "Sem cartao de credito. 1M de tokens por nossa conta.",
  },
  footer: {
    tagline: "A camada de raciocinio para produtos que pensam.",
    columns: [
      { title: "Produto", links: ["Playground", "Modelos", "Precos", "Changelog", "Status"] },
      { title: "Desenvolvedores", links: ["Documentacao", "Referencia da API", "SDKs", "Cookbook", "Limites de taxa"] },
      { title: "Empresa", links: ["Sobre", "Carreiras", "Pesquisa", "Seguranca", "Contato"] },
    ],
    socials: [
      { label: "Email", icon: "at" },
      { label: "Comunidade", icon: "message" },
      { label: "Compartilhar", icon: "share" },
      { label: "Site", icon: "globe" },
    ],
    legal: "Cortexa Labs, Inc. Um conceito ficticio criado pela VigApp.",
    status: "Todos os sistemas operacionais",
  },
};

/* ------------------------------------------------------------------ */
/* Spanish                                                             */
/* ------------------------------------------------------------------ */

const es: CortexaContent = {
  nav: {
    links: [
      { href: "#playground", label: "Playground" },
      { href: "#usecases", label: "Casos de uso" },
      { href: "#models", label: "Modelos" },
      { href: "#security", label: "Seguridad" },
      { href: "#pricing", label: "Precios" },
    ],
    login: "Entrar",
    cta: "Empezar a construir",
    openMenu: "Abrir menu",
    closeMenu: "Cerrar menu",
  },
  hero: {
    badge: "Cortexa Neural API v4",
    titlePre: "La capa de razonamiento",
    titleAccent: "que tu producto",
    titlePost: "estaba esperando.",
    promise:
      "Un solo endpoint. Tres modelos de frontera. Inferencia en menos de un segundo que lee, razona y escribe, para que tu equipo entregue inteligencia en lugar de mantenerla.",
    ctaPrimary: "Abrir el playground",
    ctaSecondary: "Leer la documentacion",
    terminalLines: [
      "$ cortexa infer --model atlas",
      "> analizando 12.480 tokens de contexto",
      "> transmitiendo respuesta · 41ms al primer token",
      "> confianza 0,97 · fundamentado · completo",
    ],
    stats: [
      { value: "41ms", label: "Mediana al 1er token" },
      { value: "99,98%", label: "Disponibilidad mensual" },
      { value: "200K", label: "Ventana de contexto" },
    ],
  },
  playground: {
    label: "Playground en vivo",
    title: "Escribe un prompt. Mira como piensa.",
    intro:
      "Esta es la interfaz de streaming real, conectada a tres escenarios listos para que sientas la latencia sin una clave de API.",
    modelLabel: "Modelo",
    presetLabel: "Prueba un escenario",
    promptLabel: "Tu prompt",
    placeholder: "Preguntale lo que sea a Cortexa o elige un escenario arriba",
    run: "Ejecutar inferencia",
    running: "Generando",
    reset: "Limpiar",
    outputLabel: "Respuesta",
    idleHint: "Elige un escenario o escribe un prompt y ejecuta la inferencia para transmitir una respuesta.",
    latencyLabel: "Primer token",
    tokensLabel: "Tokens",
    streamingLabel: "Transmitiendo",
    doneLabel: "Completo",
    models: [
      { id: "flux", name: "Cortexa Flux", tag: "Rapido", latencyMs: 22 },
      { id: "core", name: "Cortexa Core", tag: "Equilibrado", latencyMs: 41 },
      { id: "atlas", name: "Cortexa Atlas", tag: "Frontera", latencyMs: 63 },
    ],
    scenarios: [
      {
        id: "support",
        label: "Respuesta de soporte",
        prompt: "Un cliente dice que su factura se cobro dos veces este mes. Redacta una respuesta calmada y empatica.",
        response:
          "Hola, Maria,\n\nGracias por avisarnos, y lamento la preocupacion que causa un cobro duplicado. Revise tu cuenta y confirme un cargo duplicado de 49,00 EUR el 18 de julio. Ya emiti el reembolso completo, que llegara a tu tarjeta en 3 a 5 dias habiles.\n\nPara asegurarnos de que no se repita, unifique el metodo de pago duplicado en el registro. Si algo se ve raro mientras tanto, solo responde aqui y vuelvo enseguida.\n\nUn saludo,\nEquipo Cortexa Care",
      },
      {
        id: "code",
        label: "Funcion debounce",
        prompt: "Escribe una pequena funcion debounce en TypeScript con metodo de cancelacion y tipado correcto.",
        response:
          "function debounce<A extends unknown[]>(\n  fn: (...args: A) => void,\n  wait = 200,\n) {\n  let timer: ReturnType<typeof setTimeout> | null = null;\n\n  const debounced = (...args: A) => {\n    if (timer) clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), wait);\n  };\n\n  debounced.cancel = () => {\n    if (timer) clearTimeout(timer);\n    timer = null;\n  };\n\n  return debounced;\n}\n\n// Borde de salida por defecto; llama a .cancel() para descartar una ejecucion pendiente.",
      },
      {
        id: "research",
        label: "Busqueda vectorial",
        prompt: "Resume las ventajas y desventajas entre busqueda vectorial y busqueda por palabra clave para un producto de documentacion.",
        response:
          "La busqueda vectorial gana en significado. Encuentra la intencion aunque cambien las palabras, ideal para dudas de soporte planteadas de cien formas. El costo es el mantenimiento del indice, la deriva de los embeddings y resultados que parecen difusos en cadenas exactas.\n\nLa busqueda por palabra clave gana en precision. Codigos de error, nombres de API y numeros de version se resuelven de forma exacta y barata, pero ignora por completo la parafrasis.\n\nPara un producto de documentacion la respuesta pragmatica es el hibrido: ejecuta ambas y reordena. La palabra clave garantiza las coincidencias exactas; los vectores recuperan la cola larga de preguntas en lenguaje natural. Cortexa entrega esta fusion por defecto.",
      },
    ],
  },
  useCases: {
    label: "Hecha para trabajo real",
    title: "Una plataforma, donde la inteligencia rinde.",
    intro:
      "Los equipos enrutan soporte, ingenieria, investigacion y contenido por un solo endpoint Cortexa y lo especializan con herramientas y recuperacion.",
    tabs: [
      {
        id: "support",
        label: "Atencion al cliente",
        title: "Resuelve tickets antes de que los lea un humano.",
        body: "Cortexa redacta respuestas fundamentadas y con la voz de tu marca desde tu centro de ayuda y conversaciones previas, y hace el traspaso limpio en cuanto un caso necesita a una persona.",
        bullets: [
          "Recuperacion fundamentada en tu base de conocimiento",
          "Escalado por sentimiento a agentes en vivo",
          "Cada respuesta cita la fuente que utilizo",
        ],
        metricValue: "68%",
        metricLabel: "Tickets resueltos solos",
        image: IMAGES.support,
        alt: "Degradado violeta abstracto que representa IA conversacional",
      },
      {
        id: "code",
        label: "Ingenieria",
        title: "Un revisor que nunca duerme.",
        body: "Explica un stack trace, genera una migracion o crea pruebas en el editor. Cortexa razona sobre todo el repositorio, no un solo archivo.",
        bullets: [
          "Contexto de todo el repositorio, no fragmentos",
          "Parches en linea que aceptas o rechazas",
          "Barreras que bloquean fugas de secretos",
        ],
        metricValue: "3,4x",
        metricLabel: "Pull requests mas rapidos",
        image: IMAGES.code,
        alt: "Codigo verde en cascada que recuerda a una pantalla matrix",
      },
      {
        id: "research",
        label: "Investigacion",
        title: "Lee mil paginas antes del almuerzo.",
        body: "Apunta Cortexa a contratos, articulos o informes y obten sintesis fundamentada con citas, para que los analistas dediquen sus horas al criterio, no a hojear.",
        bullets: [
          "Sintesis entre documentos con citas por pagina",
          "Extraccion estructurada en tu esquema",
          "Puntuacion de confianza en cada afirmacion",
        ],
        metricValue: "12h",
        metricLabel: "Ahorradas por analista/semana",
        image: IMAGES.research,
        alt: "Formas fluidas abstractas que sugieren razonamiento de maquina",
      },
      {
        id: "content",
        label: "Contenido",
        title: "Una voz de marca que escala.",
        body: "Genera textos de lanzamiento, localiza una campana en nueve mercados y manten cada palabra dentro de tu guia de tono con una sola plantilla de prompt.",
        bullets: [
          "Barreras de tono aplicadas en cada generacion",
          "Localizacion en una pasada entre mercados",
          "Borrador, critica y revision en una sola llamada",
        ],
        metricValue: "9",
        metricLabel: "Mercados desde un brief",
        image: IMAGES.content,
        alt: "Render abstracto luminoso que evoca creatividad generativa",
      },
    ],
  },
  models: {
    label: "Niveles de modelo",
    title: "Elige la inteligencia que el momento exige.",
    intro:
      "Envia las llamadas faciles a Flux, el trafico de rutina a Core y el razonamiento dificil a Atlas. Misma API, una linea para cambiar.",
    headers: {
      model: "Modelo",
      context: "Contexto",
      throughput: "Rendimiento",
      price: "Precio / 1M tokens",
      best: "Ideal para",
    },
    rows: [
      {
        id: "flux",
        name: "Cortexa Flux",
        desc: "Clasificacion y enrutamiento instantaneos",
        context: "32K",
        throughput: "480 tok/s",
        price: "0,14 EUR",
        best: "Etiquetado, enrutamiento, barreras",
        featured: false,
      },
      {
        id: "core",
        name: "Cortexa Core",
        desc: "El motor de razonamiento del dia a dia",
        context: "128K",
        throughput: "210 tok/s",
        price: "2,30 EUR",
        best: "Soporte, chat, recuperacion",
        featured: true,
      },
      {
        id: "atlas",
        name: "Cortexa Atlas",
        desc: "Razonamiento y analisis de frontera",
        context: "200K",
        throughput: "96 tok/s",
        price: "11,00 EUR",
        best: "Investigacion, codigo, planificacion",
        featured: false,
      },
    ],
    note: "Todos los niveles comparten el mismo endpoint, protocolo de streaming y capa de seguridad. Cambia de modelo modificando un parametro.",
    popular: "El mas usado",
  },
  security: {
    label: "Confianza por diseno",
    title: "Nivel empresarial desde la primera llamada.",
    intro:
      "Tus prompts y respuestas son tuyos. Cortexa esta disenada para que la seguridad sea lo predeterminado, no un extra de pago.",
    items: [
      { icon: "lock", title: "Cifrado de extremo a extremo", body: "TLS 1.3 en transito y AES-256 en reposo en cada region y replica." },
      { icon: "eye", title: "Retencion cero de datos", body: "Activa un modo sin registro donde los prompts se descartan en cuanto termina la respuesta." },
      { icon: "shield", title: "Nunca entrenamos con tus datos", body: "Tus entradas y salidas nunca entrenan modelos base. Por contrato." },
      { icon: "key", title: "Claves de acceso granulares", body: "Claves con alcance y rotacion, limites por clave y auditoria completa." },
      { icon: "server", title: "Aislamiento regional", body: "Fija la inferencia en US, UE o APAC para que los datos no salgan del limite que elijas." },
      { icon: "fingerprint", title: "SSO y SCIM", body: "Inicio de sesion unico SAML y aprovisionamiento automatico para equipos de cualquier tamano." },
    ],
    certs: ["SOC 2 Tipo II", "ISO 27001", "RGPD", "Listo para HIPAA"],
  },
  pricing: {
    label: "Precios",
    title: "Paga por tokens, no por asientos.",
    intro:
      "Basado en uso hasta el token, con descuentos por volumen que se aplican solos. Estima tu factura abajo.",
    calc: {
      title: "Estima tu gasto mensual",
      sliderLabel: "Solicitudes por mes",
      requestsUnit: "solicitudes",
      tierLabel: "Nivel de modelo",
      tokensLabel: "Tokens estimados",
      estLabel: "Costo mensual estimado",
      perMonth: "/ mes",
      avgTokensNote: "Asume un promedio de 1.800 tokens por solicitud entre prompt y respuesta.",
      currency: "EUR",
      numberLocale: "es-ES",
      avgTokensPerRequest: 1800,
      sliderMin: 10000,
      sliderMax: 5000000,
      sliderStep: 10000,
      tiers: [
        { id: "flux", name: "Flux", ratePerMillion: 0.14 },
        { id: "core", name: "Core", ratePerMillion: 2.3 },
        { id: "atlas", name: "Atlas", ratePerMillion: 11 },
      ],
    },
    plans: [
      {
        id: "starter",
        name: "Starter",
        price: "0 EUR",
        period: "para empezar",
        desc: "Todo lo que un prototipo necesita para llegar a sus primeros usuarios.",
        features: ["1M de tokens gratis al mes", "Modelos Flux y Core", "Soporte de la comunidad", "Limites compartidos"],
        cta: "Empezar gratis",
        featured: false,
      },
      {
        id: "scale",
        name: "Scale",
        price: "459 EUR",
        period: "/ mes + uso",
        desc: "Para productos en produccion con trafico real y SLAs reales.",
        features: ["Los tres niveles de modelo", "SLA de 99,9% de disponibilidad", "Modo de retencion cero", "Enrutamiento prioritario", "Soporte por email y chat"],
        cta: "Elegir Scale",
        featured: true,
      },
      {
        id: "enterprise",
        name: "Enterprise",
        price: "A medida",
        period: "anual",
        desc: "Aislamiento regional, capacidad dedicada y un ingeniero asignado.",
        features: ["Capacidad de inferencia dedicada", "Residencia regional de datos", "SSO, SCIM y registros de auditoria", "Ingeniero de soluciones", "Fine-tuning personalizado"],
        cta: "Hablar con ventas",
        featured: false,
      },
    ],
  },
  cta: {
    label: "Entrega inteligencia",
    title: "Tu primera inferencia esta a noventa segundos.",
    body: "Crea una clave, pega cuatro lineas y transmite tu primera respuesta fundamentada antes de que se enfrie el cafe.",
    ctaPrimary: "Crear una clave de API",
    ctaSecondary: "Reservar una demo",
    note: "Sin tarjeta de credito. 1M de tokens de regalo.",
  },
  footer: {
    tagline: "La capa de razonamiento para productos que piensan.",
    columns: [
      { title: "Producto", links: ["Playground", "Modelos", "Precios", "Changelog", "Estado"] },
      { title: "Desarrolladores", links: ["Documentacion", "Referencia de API", "SDKs", "Cookbook", "Limites de tasa"] },
      { title: "Empresa", links: ["Nosotros", "Empleo", "Investigacion", "Seguridad", "Contacto"] },
    ],
    socials: [
      { label: "Email", icon: "at" },
      { label: "Comunidad", icon: "message" },
      { label: "Compartir", icon: "share" },
      { label: "Sitio web", icon: "globe" },
    ],
    legal: "Cortexa Labs, Inc. Un concepto ficticio creado por VigApp.",
    status: "Todos los sistemas operativos",
  },
};

export const cortexaDict: DemoDictionary<CortexaContent> = { en, pt, es };
