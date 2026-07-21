import type { DemoDictionary } from "@/demos/content";

export function unsplash(id: string, width = 1600): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;
}

export type ProjectStatus = "onTrack" | "ahead" | "delayed";

export interface Capability {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  scope: string[];
  metricValue: string;
  metricLabel: string;
}

export interface ProjectItem {
  id: string;
  code: string;
  name: string;
  sector: string;
  location: string;
  value: number;
  progress: number;
  phase: string;
  status: ProjectStatus;
  image: string;
  imageAlt: string;
}

export interface Counter {
  id: string;
  value: number;
  suffix: string;
  label: string;
  sub: string;
}

export interface Certification {
  code: string;
  label: string;
}

export interface ProjectTypeOption {
  value: string;
  label: string;
}

export interface FooterColumn {
  title: string;
  links: string[];
}

export interface VertexContent {
  format: { locale: string; currency: string };
  header: {
    navAria: string;
    nav: { href: string; label: string }[];
    cta: string;
  };
  hero: {
    badge: string;
    established: string;
    line1: string;
    line2: string;
    line3: string;
    lede: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scrollCue: string;
    imageAlt: string;
    stats: { value: string; label: string }[];
  };
  capabilities: {
    eyebrow: string;
    title: string;
    lede: string;
    scopeLabel: string;
    expandLabel: string;
    collapseLabel: string;
    items: Capability[];
  };
  projects: {
    eyebrow: string;
    title: string;
    lede: string;
    valueLabel: string;
    progressLabel: string;
    phaseLabel: string;
    statusLabels: Record<ProjectStatus, string>;
    items: ProjectItem[];
  };
  stats: {
    eyebrow: string;
    title: string;
    lede: string;
    counters: Counter[];
    safetyTitle: string;
    safetyBody: string;
    safetyMetric: string;
    safetyMetricLabel: string;
  };
  certs: {
    eyebrow: string;
    title: string;
    items: Certification[];
  };
  quote: {
    eyebrow: string;
    title: string;
    lede: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    typeLabel: string;
    typePlaceholder: string;
    types: ProjectTypeOption[];
    budgetLabel: string;
    budgetPlaceholder: string;
    budgets: ProjectTypeOption[];
    detailsLabel: string;
    detailsPlaceholder: string;
    submit: string;
    submitting: string;
    errors: {
      name: string;
      email: string;
      type: string;
      budget: string;
    };
    successBadge: string;
    successTitle: string;
    successBody: string;
    successMeta: string;
    resetLabel: string;
    asideTitle: string;
    asidePoints: string[];
    responseLabel: string;
    responseValue: string;
  };
  footer: {
    tagline: string;
    columns: FooterColumn[];
    addressLabel: string;
    address: string[];
    hoursLabel: string;
    hours: string;
    socialLabel: string;
    social: { label: string; kind: "at" | "camera" | "share" | "globe" }[];
    legal: string;
  };
}

const en: VertexContent = {
  format: { locale: "en-US", currency: "USD" },
  header: {
    navAria: "Primary",
    nav: [
      { href: "#capabilities", label: "Capabilities" },
      { href: "#projects", label: "Projects" },
      { href: "#capacity", label: "Capacity" },
      { href: "#certifications", label: "Compliance" },
    ],
    cta: "Request a quote",
  },
  hero: {
    badge: "Heavy civil & structural contractor",
    established: "Est. 1994 — Bonded & insured",
    line1: "We build",
    line2: "what holds",
    line3: "the load.",
    lede: "Vertex Build delivers infrastructure, industrial and commercial construction on schedule and under load. Self-perform crews, in-house engineering, zero shortcuts.",
    ctaPrimary: "Start a project",
    ctaSecondary: "View active sites",
    scrollCue: "Scroll to explore",
    imageAlt: "Steel structure rising against the sky on an active construction site",
    stats: [
      { value: "31yr", label: "On the ground" },
      { value: "640+", label: "Projects delivered" },
      { value: "0.41", label: "EMR safety rating" },
    ],
  },
  capabilities: {
    eyebrow: "What we self-perform",
    title: "Four disciplines, one crew standard.",
    lede: "From poured foundations to structural steel, Vertex controls the critical path in-house so quality never gets subcontracted away.",
    scopeLabel: "Scope of work",
    expandLabel: "View scope",
    collapseLabel: "Close scope",
    items: [
      {
        id: "infrastructure",
        index: "01",
        title: "Infrastructure",
        tagline: "Bridges, highways, water & rail",
        description:
          "Public and private civil works engineered for a 75-year service life, delivered under DOT specification and full inspection.",
        scope: [
          "Bridge & overpass structures",
          "Highway & interchange grading",
          "Stormwater & utility corridors",
          "Rail bed & culvert systems",
        ],
        metricValue: "1.2M",
        metricLabel: "Cubic yards moved / yr",
      },
      {
        id: "commercial",
        index: "02",
        title: "Commercial",
        tagline: "Ground-up cores & shells",
        description:
          "Mid- and high-rise commercial builds delivered design-build or hard-bid, with a self-perform concrete and steel package.",
        scope: [
          "Structural concrete & post-tension",
          "Curtain wall & envelope",
          "Tenant core & shell fit-out",
          "Parking structures",
        ],
        metricValue: "94%",
        metricLabel: "On-time completion",
      },
      {
        id: "industrial",
        index: "03",
        title: "Industrial",
        tagline: "Plants, logistics & energy",
        description:
          "Heavy industrial facilities built to tolerance for manufacturing, distribution and power, including turnkey process foundations.",
        scope: [
          "Process & equipment foundations",
          "Distribution & fulfilment centres",
          "Substation & energy infrastructure",
          "Crane rail & heavy slab",
        ],
        metricValue: "48k",
        metricLabel: "Tons steel erected",
      },
      {
        id: "residential",
        index: "04",
        title: "Residential",
        tagline: "Multi-family at density",
        description:
          "Podium and mid-rise multi-family construction where structural precision and schedule discipline protect the pro forma.",
        scope: [
          "Podium & wrap structures",
          "Cast-in-place & precast",
          "Site & underground utilities",
          "Amenity & landscape hardscape",
        ],
        metricValue: "2,800",
        metricLabel: "Units under construction",
      },
    ],
  },
  projects: {
    eyebrow: "Active sites",
    title: "On the board right now.",
    lede: "Live progress across our current portfolio. Bars reflect verified pay-application percentages as of this week.",
    valueLabel: "Contract value",
    progressLabel: "Complete",
    phaseLabel: "Current phase",
    statusLabels: {
      onTrack: "On track",
      ahead: "Ahead of schedule",
      delayed: "Weather delay",
    },
    items: [
      {
        id: "harbor-viaduct",
        code: "VB-418",
        name: "Harbor Point Viaduct",
        sector: "Infrastructure",
        location: "Oakland, CA",
        value: 214000000,
        progress: 72,
        phase: "Deck pour — spans 4 to 9",
        status: "onTrack",
        image: "photo-1504307651254-35680f356dfd",
        imageAlt: "Long span concrete bridge under construction over water",
      },
      {
        id: "meridian-tower",
        code: "VB-402",
        name: "Meridian Commerce Tower",
        sector: "Commercial",
        location: "Austin, TX",
        value: 138000000,
        progress: 58,
        phase: "Structural steel — levels 22 to 28",
        status: "ahead",
        image: "photo-1541888946425-d81bb19240f5",
        imageAlt: "High-rise commercial tower framed in steel at dusk",
      },
      {
        id: "northgate-logistics",
        code: "VB-431",
        name: "Northgate Logistics Park",
        sector: "Industrial",
        location: "Reno, NV",
        value: 96500000,
        progress: 41,
        phase: "Tilt-wall erection — building C",
        status: "delayed",
        image: "photo-1581092160562-40aa08e78837",
        imageAlt: "Industrial worker beside heavy machinery at a distribution site",
      },
      {
        id: "brightline-residences",
        code: "VB-427",
        name: "Brightline Residences",
        sector: "Residential",
        location: "Denver, CO",
        value: 74200000,
        progress: 86,
        phase: "Podium topping-out & MEP rough-in",
        status: "onTrack",
        image: "photo-1581094794329-c8112a89af12",
        imageAlt: "Site engineer reviewing plans on a residential construction floor",
      },
    ],
  },
  stats: {
    eyebrow: "Capacity & safety",
    title: "The numbers behind the delivery.",
    lede: "Equipment, crews and a safety culture that lets owners sleep. Every figure below is audited annually.",
    counters: [
      { id: "crew", value: 1240, suffix: "", label: "Field personnel", sub: "Self-perform crews" },
      { id: "fleet", value: 380, suffix: "", label: "Owned machines", sub: "Cranes to compactors" },
      { id: "hours", value: 3.4, suffix: "M", label: "Safe work hours", sub: "Since last lost-time" },
      { id: "backlog", value: 1.8, suffix: "B", label: "Contract backlog", sub: "Secured pipeline" },
    ],
    safetyTitle: "Safety is the schedule.",
    safetyBody:
      "Every crew starts the day with a documented hazard analysis. Our full-time safety officers hold stop-work authority on every Vertex site, and it is exercised without question.",
    safetyMetric: "0.41",
    safetyMetricLabel: "Experience Modification Rate",
  },
  certs: {
    eyebrow: "Compliance & standards",
    title: "Certified to build where it counts.",
    items: [
      { code: "ISO 9001", label: "Quality management" },
      { code: "ISO 45001", label: "Occupational health & safety" },
      { code: "OSHA VPP", label: "Voluntary Protection — Star" },
      { code: "LEED AP", label: "Green building accredited" },
      { code: "DBE / MBE", label: "Certified enterprise" },
      { code: "AISC", label: "Steel erector certified" },
    ],
  },
  quote: {
    eyebrow: "Request a quote",
    title: "Put your project on our board.",
    lede: "Tell us the shape of the build. A preconstruction lead responds within one business day with next steps and a budget range.",
    nameLabel: "Full name",
    namePlaceholder: "Jordan Ellis",
    emailLabel: "Work email",
    emailPlaceholder: "you@company.com",
    typeLabel: "Project type",
    typePlaceholder: "Select a discipline",
    types: [
      { value: "infrastructure", label: "Infrastructure" },
      { value: "commercial", label: "Commercial" },
      { value: "industrial", label: "Industrial" },
      { value: "residential", label: "Residential" },
    ],
    budgetLabel: "Estimated budget",
    budgetPlaceholder: "Select a range",
    budgets: [
      { value: "s", label: "Under $10M" },
      { value: "m", label: "$10M — $50M" },
      { value: "l", label: "$50M — $150M" },
      { value: "xl", label: "$150M+" },
    ],
    detailsLabel: "Project details",
    detailsPlaceholder: "Site location, target delivery, scope notes…",
    submit: "Submit request",
    submitting: "Sending…",
    errors: {
      name: "Please enter your full name.",
      email: "Enter a valid work email address.",
      type: "Choose a project type.",
      budget: "Choose a budget range.",
    },
    successBadge: "Request received",
    successTitle: "You are on the board.",
    successBody:
      "Thanks — your request is logged with our preconstruction team. Expect a call to scope the build within one business day.",
    successMeta: "Reference issued",
    resetLabel: "Submit another request",
    asideTitle: "What happens next",
    asidePoints: [
      "A preconstruction lead reviews scope and constraints.",
      "We return a budget range and delivery approach.",
      "You get a site walk and a hard number.",
    ],
    responseLabel: "Typical response",
    responseValue: "< 1 business day",
  },
  footer: {
    tagline: "Heavy civil, commercial and industrial construction built to hold the load.",
    columns: [
      { title: "Company", links: ["About Vertex", "Leadership", "Careers", "Newsroom"] },
      { title: "Capabilities", links: ["Infrastructure", "Commercial", "Industrial", "Residential"] },
      { title: "Resources", links: ["Safety program", "Prequalification", "Subcontractors", "Certifications"] },
    ],
    addressLabel: "Head office",
    address: ["1400 Industrial Parkway", "Oakland, CA 94607"],
    hoursLabel: "Site hours",
    hours: "Mon — Sat, 06:00 — 18:00",
    socialLabel: "Follow Vertex Build",
    social: [
      { label: "Newsletter", kind: "at" },
      { label: "Field photos", kind: "camera" },
      { label: "Share", kind: "share" },
      { label: "vertexbuild.com", kind: "globe" },
    ],
    legal: "Vertex Build — a VigApp concept. Not a real company. License #CA-991204.",
  },
};

const pt: VertexContent = {
  format: { locale: "pt-BR", currency: "BRL" },
  header: {
    navAria: "Principal",
    nav: [
      { href: "#capabilities", label: "Competências" },
      { href: "#projects", label: "Obras" },
      { href: "#capacity", label: "Capacidade" },
      { href: "#certifications", label: "Conformidade" },
    ],
    cta: "Solicitar orçamento",
  },
  hero: {
    badge: "Construtora pesada, civil & estrutural",
    established: "Desde 1994 — Segurada e caucionada",
    line1: "Construímos",
    line2: "o que sustenta",
    line3: "a carga.",
    lede: "A Vertex Build entrega obras de infraestrutura, industriais e comerciais no prazo e sob carga. Equipes próprias, engenharia interna, nenhum atalho.",
    ctaPrimary: "Iniciar um projeto",
    ctaSecondary: "Ver obras ativas",
    scrollCue: "Role para explorar",
    imageAlt: "Estrutura de aço subindo contra o céu em um canteiro de obras ativo",
    stats: [
      { value: "31a", label: "No campo" },
      { value: "640+", label: "Obras entregues" },
      { value: "0,41", label: "Índice de segurança EMR" },
    ],
  },
  capabilities: {
    eyebrow: "O que executamos",
    title: "Quatro disciplinas, um padrão de equipe.",
    lede: "Da fundação concretada ao aço estrutural, a Vertex controla o caminho crítico internamente para que a qualidade nunca seja terceirizada.",
    scopeLabel: "Escopo de serviço",
    expandLabel: "Ver escopo",
    collapseLabel: "Fechar escopo",
    items: [
      {
        id: "infrastructure",
        index: "01",
        title: "Infraestrutura",
        tagline: "Pontes, rodovias, água & ferrovia",
        description:
          "Obras civis públicas e privadas projetadas para 75 anos de vida útil, executadas sob especificação técnica e inspeção total.",
        scope: [
          "Pontes & viadutos",
          "Terraplenagem de rodovias",
          "Corredores de drenagem & utilidades",
          "Leitos ferroviários & bueiros",
        ],
        metricValue: "1,2M",
        metricLabel: "Metros cúbicos movidos / ano",
      },
      {
        id: "commercial",
        index: "02",
        title: "Comercial",
        tagline: "Núcleos e cascas do zero",
        description:
          "Edifícios comerciais de médio e grande porte entregues em design-build ou concorrência, com pacote próprio de concreto e aço.",
        scope: [
          "Concreto estrutural & protensão",
          "Fachada & envoltória",
          "Núcleo, casca & interiores",
          "Estruturas de garagem",
        ],
        metricValue: "94%",
        metricLabel: "Entregas no prazo",
      },
      {
        id: "industrial",
        index: "03",
        title: "Industrial",
        tagline: "Plantas, logística & energia",
        description:
          "Instalações industriais pesadas construídas com tolerância para manufatura, distribuição e energia, incluindo fundações de processo turnkey.",
        scope: [
          "Fundações de processo & equipamento",
          "Centros de distribuição",
          "Subestações & infraestrutura de energia",
          "Trilhos de ponte rolante & lajes pesadas",
        ],
        metricValue: "48k",
        metricLabel: "Toneladas de aço montadas",
      },
      {
        id: "residential",
        index: "04",
        title: "Residencial",
        tagline: "Multifamiliar em densidade",
        description:
          "Construção multifamiliar em pódio e média altura onde a precisão estrutural e a disciplina de prazo protegem a viabilidade.",
        scope: [
          "Estruturas de pódio & wrap",
          "Concreto moldado & pré-moldado",
          "Utilidades de solo & subterrâneas",
          "Áreas de lazer & paisagismo",
        ],
        metricValue: "2.800",
        metricLabel: "Unidades em construção",
      },
    ],
  },
  projects: {
    eyebrow: "Obras ativas",
    title: "No quadro agora.",
    lede: "Progresso ao vivo do portfólio atual. As barras refletem os percentuais verificados de medição desta semana.",
    valueLabel: "Valor do contrato",
    progressLabel: "Concluído",
    phaseLabel: "Fase atual",
    statusLabels: {
      onTrack: "No prazo",
      ahead: "Adiantada",
      delayed: "Atraso por clima",
    },
    items: [
      {
        id: "harbor-viaduct",
        code: "VB-418",
        name: "Viaduto Harbor Point",
        sector: "Infraestrutura",
        location: "Santos, SP",
        value: 1090000000,
        progress: 72,
        phase: "Concretagem do tabuleiro — vãos 4 a 9",
        status: "onTrack",
        image: "photo-1504307651254-35680f356dfd",
        imageAlt: "Ponte de longo vão em concreto em construção sobre a água",
      },
      {
        id: "meridian-tower",
        code: "VB-402",
        name: "Torre Comercial Meridian",
        sector: "Comercial",
        location: "São Paulo, SP",
        value: 700000000,
        progress: 58,
        phase: "Aço estrutural — pavimentos 22 a 28",
        status: "ahead",
        image: "photo-1541888946425-d81bb19240f5",
        imageAlt: "Torre comercial alta estruturada em aço ao entardecer",
      },
      {
        id: "northgate-logistics",
        code: "VB-431",
        name: "Parque Logístico Northgate",
        sector: "Industrial",
        location: "Cajamar, SP",
        value: 490000000,
        progress: 41,
        phase: "Montagem de painéis tilt-wall — galpão C",
        status: "delayed",
        image: "photo-1581092160562-40aa08e78837",
        imageAlt: "Operário industrial ao lado de máquinas pesadas em um centro de distribuição",
      },
      {
        id: "brightline-residences",
        code: "VB-427",
        name: "Residencial Brightline",
        sector: "Residencial",
        location: "Curitiba, PR",
        value: 375000000,
        progress: 86,
        phase: "Fechamento do pódio & instalações",
        status: "onTrack",
        image: "photo-1581094794329-c8112a89af12",
        imageAlt: "Engenheiro de obra revisando plantas em um pavimento residencial",
      },
    ],
  },
  stats: {
    eyebrow: "Capacidade & segurança",
    title: "Os números por trás da entrega.",
    lede: "Equipamentos, equipes e uma cultura de segurança que deixa o cliente tranquilo. Cada número abaixo é auditado anualmente.",
    counters: [
      { id: "crew", value: 1240, suffix: "", label: "Pessoal de campo", sub: "Equipes próprias" },
      { id: "fleet", value: 380, suffix: "", label: "Máquinas próprias", sub: "De guindastes a compactadores" },
      { id: "hours", value: 3.4, suffix: "M", label: "Horas seguras", sub: "Sem afastamentos" },
      { id: "backlog", value: 1.8, suffix: "B", label: "Carteira de obras", sub: "Pipeline garantido" },
    ],
    safetyTitle: "Segurança é o cronograma.",
    safetyBody:
      "Cada equipe começa o dia com uma análise de risco documentada. Nossos técnicos de segurança em tempo integral têm autoridade de parada em toda obra Vertex — e a exercem sem hesitar.",
    safetyMetric: "0,41",
    safetyMetricLabel: "Taxa de modificação de experiência",
  },
  certs: {
    eyebrow: "Conformidade & normas",
    title: "Certificados para construir onde importa.",
    items: [
      { code: "ISO 9001", label: "Gestão da qualidade" },
      { code: "ISO 45001", label: "Saúde & segurança ocupacional" },
      { code: "NR-18", label: "Segurança na construção" },
      { code: "LEED AP", label: "Construção sustentável" },
      { code: "PBQP-H", label: "Qualidade habitacional" },
      { code: "CREA", label: "Registro de engenharia" },
    ],
  },
  quote: {
    eyebrow: "Solicitar orçamento",
    title: "Coloque seu projeto no nosso quadro.",
    lede: "Conte o formato da obra. Um líder de pré-construção responde em até um dia útil com os próximos passos e uma faixa de orçamento.",
    nameLabel: "Nome completo",
    namePlaceholder: "Jordan Ellis",
    emailLabel: "E-mail corporativo",
    emailPlaceholder: "voce@empresa.com",
    typeLabel: "Tipo de projeto",
    typePlaceholder: "Selecione uma disciplina",
    types: [
      { value: "infrastructure", label: "Infraestrutura" },
      { value: "commercial", label: "Comercial" },
      { value: "industrial", label: "Industrial" },
      { value: "residential", label: "Residencial" },
    ],
    budgetLabel: "Orçamento estimado",
    budgetPlaceholder: "Selecione uma faixa",
    budgets: [
      { value: "s", label: "Até R$ 50M" },
      { value: "m", label: "R$ 50M — R$ 250M" },
      { value: "l", label: "R$ 250M — R$ 750M" },
      { value: "xl", label: "R$ 750M+" },
    ],
    detailsLabel: "Detalhes do projeto",
    detailsPlaceholder: "Local da obra, prazo alvo, notas de escopo…",
    submit: "Enviar solicitação",
    submitting: "Enviando…",
    errors: {
      name: "Informe seu nome completo.",
      email: "Informe um e-mail corporativo válido.",
      type: "Escolha um tipo de projeto.",
      budget: "Escolha uma faixa de orçamento.",
    },
    successBadge: "Solicitação recebida",
    successTitle: "Você está no quadro.",
    successBody:
      "Obrigado — sua solicitação está registrada com a equipe de pré-construção. Aguarde um contato para detalhar a obra em até um dia útil.",
    successMeta: "Referência emitida",
    resetLabel: "Enviar outra solicitação",
    asideTitle: "O que acontece agora",
    asidePoints: [
      "Um líder de pré-construção analisa escopo e restrições.",
      "Retornamos uma faixa de orçamento e abordagem de entrega.",
      "Você recebe uma visita técnica e um número fechado.",
    ],
    responseLabel: "Resposta típica",
    responseValue: "< 1 dia útil",
  },
  footer: {
    tagline: "Construção pesada, civil, comercial e industrial feita para sustentar a carga.",
    columns: [
      { title: "Empresa", links: ["Sobre a Vertex", "Liderança", "Carreiras", "Imprensa"] },
      { title: "Competências", links: ["Infraestrutura", "Comercial", "Industrial", "Residencial"] },
      { title: "Recursos", links: ["Programa de segurança", "Pré-qualificação", "Subempreiteiros", "Certificações"] },
    ],
    addressLabel: "Sede",
    address: ["Av. Industrial, 1400", "Santos, SP 11095-000"],
    hoursLabel: "Horário de obra",
    hours: "Seg — Sáb, 06:00 — 18:00",
    socialLabel: "Siga a Vertex Build",
    social: [
      { label: "Newsletter", kind: "at" },
      { label: "Fotos de campo", kind: "camera" },
      { label: "Compartilhar", kind: "share" },
      { label: "vertexbuild.com", kind: "globe" },
    ],
    legal: "Vertex Build — um conceito VigApp. Empresa fictícia. Licença #CA-991204.",
  },
};

const es: VertexContent = {
  format: { locale: "es-ES", currency: "EUR" },
  header: {
    navAria: "Principal",
    nav: [
      { href: "#capabilities", label: "Capacidades" },
      { href: "#projects", label: "Obras" },
      { href: "#capacity", label: "Capacidad" },
      { href: "#certifications", label: "Cumplimiento" },
    ],
    cta: "Solicitar presupuesto",
  },
  hero: {
    badge: "Contratista de obra civil pesada y estructural",
    established: "Desde 1994 — Asegurada y avalada",
    line1: "Construimos",
    line2: "lo que soporta",
    line3: "la carga.",
    lede: "Vertex Build ejecuta obra de infraestructura, industrial y comercial en plazo y bajo carga. Cuadrillas propias, ingeniería interna, ningún atajo.",
    ctaPrimary: "Iniciar un proyecto",
    ctaSecondary: "Ver obras activas",
    scrollCue: "Desplázate para explorar",
    imageAlt: "Estructura de acero elevándose contra el cielo en una obra activa",
    stats: [
      { value: "31a", label: "En el terreno" },
      { value: "640+", label: "Obras entregadas" },
      { value: "0,41", label: "Índice de seguridad EMR" },
    ],
  },
  capabilities: {
    eyebrow: "Lo que autoejecutamos",
    title: "Cuatro disciplinas, un estándar de cuadrilla.",
    lede: "De la cimentación al acero estructural, Vertex controla la ruta crítica internamente para que la calidad nunca se subcontrate.",
    scopeLabel: "Alcance del trabajo",
    expandLabel: "Ver alcance",
    collapseLabel: "Cerrar alcance",
    items: [
      {
        id: "infrastructure",
        index: "01",
        title: "Infraestructura",
        tagline: "Puentes, autovías, agua y ferrocarril",
        description:
          "Obra civil pública y privada diseñada para 75 años de vida útil, ejecutada bajo especificación técnica e inspección total.",
        scope: [
          "Puentes y viaductos",
          "Explanación de autovías",
          "Corredores de drenaje y servicios",
          "Plataformas ferroviarias y drenes",
        ],
        metricValue: "1,2M",
        metricLabel: "Metros cúbicos movidos / año",
      },
      {
        id: "commercial",
        index: "02",
        title: "Comercial",
        tagline: "Núcleos y estructuras desde cero",
        description:
          "Edificios comerciales de media y gran altura entregados en design-build o concurso, con paquete propio de hormigón y acero.",
        scope: [
          "Hormigón estructural y postensado",
          "Muro cortina y envolvente",
          "Núcleo, estructura e interiores",
          "Aparcamientos",
        ],
        metricValue: "94%",
        metricLabel: "Entregas en plazo",
      },
      {
        id: "industrial",
        index: "03",
        title: "Industrial",
        tagline: "Plantas, logística y energía",
        description:
          "Instalaciones industriales pesadas construidas con tolerancia para fabricación, distribución y energía, incluidas cimentaciones de proceso llave en mano.",
        scope: [
          "Cimentaciones de proceso y equipo",
          "Centros de distribución",
          "Subestaciones e infraestructura energética",
          "Vías de grúa y solera pesada",
        ],
        metricValue: "48k",
        metricLabel: "Toneladas de acero montadas",
      },
      {
        id: "residential",
        index: "04",
        title: "Residencial",
        tagline: "Vivienda colectiva en densidad",
        description:
          "Construcción residencial en podio y media altura donde la precisión estructural y la disciplina de plazo protegen la viabilidad.",
        scope: [
          "Estructuras de podio y envolvente",
          "Hormigón in situ y prefabricado",
          "Urbanización y servicios enterrados",
          "Zonas comunes y paisajismo",
        ],
        metricValue: "2.800",
        metricLabel: "Viviendas en construcción",
      },
    ],
  },
  projects: {
    eyebrow: "Obras activas",
    title: "En el tablero ahora mismo.",
    lede: "Progreso en vivo de la cartera actual. Las barras reflejan los porcentajes verificados de certificación de esta semana.",
    valueLabel: "Valor del contrato",
    progressLabel: "Completado",
    phaseLabel: "Fase actual",
    statusLabels: {
      onTrack: "En plazo",
      ahead: "Adelantada",
      delayed: "Retraso por clima",
    },
    items: [
      {
        id: "harbor-viaduct",
        code: "VB-418",
        name: "Viaducto Harbor Point",
        sector: "Infraestructura",
        location: "Valencia, ES",
        value: 198000000,
        progress: 72,
        phase: "Hormigonado del tablero — vanos 4 a 9",
        status: "onTrack",
        image: "photo-1504307651254-35680f356dfd",
        imageAlt: "Puente de gran vano en hormigón en construcción sobre el agua",
      },
      {
        id: "meridian-tower",
        code: "VB-402",
        name: "Torre Comercial Meridian",
        sector: "Comercial",
        location: "Madrid, ES",
        value: 128000000,
        progress: 58,
        phase: "Acero estructural — plantas 22 a 28",
        status: "ahead",
        image: "photo-1541888946425-d81bb19240f5",
        imageAlt: "Torre comercial alta con estructura de acero al atardecer",
      },
      {
        id: "northgate-logistics",
        code: "VB-431",
        name: "Parque Logístico Northgate",
        sector: "Industrial",
        location: "Zaragoza, ES",
        value: 89000000,
        progress: 41,
        phase: "Montaje de paneles tilt-wall — nave C",
        status: "delayed",
        image: "photo-1581092160562-40aa08e78837",
        imageAlt: "Operario industrial junto a maquinaria pesada en un centro logístico",
      },
      {
        id: "brightline-residences",
        code: "VB-427",
        name: "Residencial Brightline",
        sector: "Residencial",
        location: "Sevilla, ES",
        value: 68500000,
        progress: 86,
        phase: "Cierre del podio e instalaciones",
        status: "onTrack",
        image: "photo-1581094794329-c8112a89af12",
        imageAlt: "Ingeniero de obra revisando planos en una planta residencial",
      },
    ],
  },
  stats: {
    eyebrow: "Capacidad y seguridad",
    title: "Los números detrás de la entrega.",
    lede: "Equipos, cuadrillas y una cultura de seguridad que deja tranquila a la propiedad. Cada cifra se audita anualmente.",
    counters: [
      { id: "crew", value: 1240, suffix: "", label: "Personal de campo", sub: "Cuadrillas propias" },
      { id: "fleet", value: 380, suffix: "", label: "Máquinas propias", sub: "De grúas a compactadoras" },
      { id: "hours", value: 3.4, suffix: "M", label: "Horas seguras", sub: "Sin bajas laborales" },
      { id: "backlog", value: 1.8, suffix: "B", label: "Cartera de obra", sub: "Pipeline asegurado" },
    ],
    safetyTitle: "La seguridad es el plazo.",
    safetyBody:
      "Cada cuadrilla arranca el día con un análisis de riesgos documentado. Nuestros técnicos de seguridad a tiempo completo tienen autoridad de parada en toda obra Vertex, y la ejercen sin dudar.",
    safetyMetric: "0,41",
    safetyMetricLabel: "Tasa de modificación de experiencia",
  },
  certs: {
    eyebrow: "Cumplimiento y normas",
    title: "Certificados para construir donde importa.",
    items: [
      { code: "ISO 9001", label: "Gestión de calidad" },
      { code: "ISO 45001", label: "Seguridad y salud laboral" },
      { code: "ISO 14001", label: "Gestión ambiental" },
      { code: "LEED AP", label: "Construcción sostenible" },
      { code: "CE", label: "Marcado estructural" },
      { code: "COAM", label: "Registro de ingeniería" },
    ],
  },
  quote: {
    eyebrow: "Solicitar presupuesto",
    title: "Pon tu proyecto en nuestro tablero.",
    lede: "Cuéntanos la forma de la obra. Un responsable de preconstrucción responde en un día laborable con los siguientes pasos y una horquilla de presupuesto.",
    nameLabel: "Nombre completo",
    namePlaceholder: "Jordan Ellis",
    emailLabel: "Correo profesional",
    emailPlaceholder: "tu@empresa.com",
    typeLabel: "Tipo de proyecto",
    typePlaceholder: "Selecciona una disciplina",
    types: [
      { value: "infrastructure", label: "Infraestructura" },
      { value: "commercial", label: "Comercial" },
      { value: "industrial", label: "Industrial" },
      { value: "residential", label: "Residencial" },
    ],
    budgetLabel: "Presupuesto estimado",
    budgetPlaceholder: "Selecciona una horquilla",
    budgets: [
      { value: "s", label: "Menos de 10M€" },
      { value: "m", label: "10M€ — 50M€" },
      { value: "l", label: "50M€ — 150M€" },
      { value: "xl", label: "150M€+" },
    ],
    detailsLabel: "Detalles del proyecto",
    detailsPlaceholder: "Ubicación, plazo objetivo, notas de alcance…",
    submit: "Enviar solicitud",
    submitting: "Enviando…",
    errors: {
      name: "Introduce tu nombre completo.",
      email: "Introduce un correo profesional válido.",
      type: "Elige un tipo de proyecto.",
      budget: "Elige una horquilla de presupuesto.",
    },
    successBadge: "Solicitud recibida",
    successTitle: "Estás en el tablero.",
    successBody:
      "Gracias — tu solicitud queda registrada con el equipo de preconstrucción. Espera una llamada para detallar la obra en un día laborable.",
    successMeta: "Referencia emitida",
    resetLabel: "Enviar otra solicitud",
    asideTitle: "Qué ocurre ahora",
    asidePoints: [
      "Un responsable de preconstrucción revisa alcance y condicionantes.",
      "Devolvemos una horquilla de presupuesto y enfoque de entrega.",
      "Recibes una visita a obra y un número cerrado.",
    ],
    responseLabel: "Respuesta habitual",
    responseValue: "< 1 día laborable",
  },
  footer: {
    tagline: "Obra civil pesada, comercial e industrial construida para soportar la carga.",
    columns: [
      { title: "Empresa", links: ["Sobre Vertex", "Dirección", "Empleo", "Prensa"] },
      { title: "Capacidades", links: ["Infraestructura", "Comercial", "Industrial", "Residencial"] },
      { title: "Recursos", links: ["Programa de seguridad", "Precalificación", "Subcontratas", "Certificaciones"] },
    ],
    addressLabel: "Sede central",
    address: ["Calle Industrial, 1400", "46013 Valencia"],
    hoursLabel: "Horario de obra",
    hours: "Lun — Sáb, 06:00 — 18:00",
    socialLabel: "Sigue a Vertex Build",
    social: [
      { label: "Boletín", kind: "at" },
      { label: "Fotos de obra", kind: "camera" },
      { label: "Compartir", kind: "share" },
      { label: "vertexbuild.com", kind: "globe" },
    ],
    legal: "Vertex Build — un concepto de VigApp. Empresa ficticia. Licencia #CA-991204.",
  },
};

export const vertexDictionary: DemoDictionary<VertexContent> = { en, pt, es };
