import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

export interface NavContent {
  links: { id: string; label: string }[];
  cta: string;
  menuOpen: string;
  menuClose: string;
}

export interface HeroContent {
  eyebrow: string;
  lines: string[];
  accentLine: number;
  sub: string;
  ctaPrimary: string;
  ctaSecondary: string;
  scrollCue: string;
  stats: { value: string; label: string }[];
}

export interface ServicesContent {
  label: string;
  items: string[];
  note: string;
}

export interface CaseStudy {
  id: string;
  index: string;
  client: string;
  title: string;
  category: string;
  year: string;
  metric: string;
  image: string;
  alt: string;
}

export interface CaseStudiesContent {
  label: string;
  heading: string;
  hint: string;
  viewLabel: string;
  rows: CaseStudy[];
}

export interface ManifestoContent {
  label: string;
  intro: string;
  lines: { kill: string; keep: string }[];
  signoff: string;
}

export interface AwardsContent {
  label: string;
  heading: string;
  awards: { name: string; org: string; year: string; count: string }[];
  pressLabel: string;
  press: { quote: string; source: string }[];
}

export interface ContactFormCopy {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  projectLabel: string;
  projectOptions: string[];
  budgetLabel: string;
  budgetOptions: string[];
  messageLabel: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
  invalid: string;
  successTitle: string;
  successBody: string;
  reset: string;
}

export interface ContactContent {
  label: string;
  headline: string[];
  sub: string;
  form: ContactFormCopy;
  meta: { label: string; value: string }[];
}

export interface FooterContent {
  callout: string;
  columns: { title: string; links: string[] }[];
  socials: { kind: "at" | "camera" | "share" | "message" | "globe"; label: string }[];
  studioLine: string;
  legal: string;
  backToTop: string;
}

export interface LoudContent {
  numberLocale: string;
  nav: NavContent;
  hero: HeroContent;
  services: ServicesContent;
  cases: CaseStudiesContent;
  manifesto: ManifestoContent;
  awards: AwardsContent;
  contact: ContactContent;
  footer: FooterContent;
}

/* ------------------------------------------------------------------ */
/* Shared, locale-neutral fragments                                    */
/* ------------------------------------------------------------------ */

const U = "https://images.unsplash.com/";
const Q = "?auto=format&fit=crop&w=1200&q=80";

const CASE_IMAGES = {
  volta: `${U}photo-1504384308090-c894fdcc538d${Q}`,
  kiosk: `${U}photo-1553028826-f4804a6dba3b${Q}`,
  neon: `${U}photo-1519389950473-47ba0277781c${Q}`,
  terra: `${U}photo-1542744173-8e7e53415bb0${Q}`,
  pulse: `${U}photo-1528716321680-815a8cdb8cbe${Q}`,
} as const;

/* ------------------------------------------------------------------ */
/* English (mandatory base)                                            */
/* ------------------------------------------------------------------ */

const en: LoudContent = {
  numberLocale: "en-US",
  nav: {
    links: [
      { id: "work", label: "Work" },
      { id: "services", label: "Services" },
      { id: "manifesto", label: "Manifesto" },
      { id: "awards", label: "Awards" },
    ],
    cta: "Start Yelling",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
  hero: {
    eyebrow: "Independent creative studio — since 2016",
    lines: ["WE MAKE", "BRANDS", "IMPOSSIBLE", "TO IGNORE"],
    accentLine: 1,
    sub: "Strategy, identity and campaigns for companies that refuse to whisper. No focus groups, no beige, no apologies.",
    ctaPrimary: "Start a Project",
    ctaSecondary: "See the Work",
    scrollCue: "Scroll if you dare",
    stats: [
      { value: "140+", label: "Brands rebuilt" },
      { value: "31", label: "Awards on the wall" },
      { value: "4.2B", label: "Impressions provoked" },
    ],
  },
  services: {
    label: "What we do, loudly",
    items: [
      "Brand Strategy",
      "Identity Design",
      "Art Direction",
      "Campaign",
      "Motion",
      "Copywriting",
      "Web Design",
      "Social",
      "Packaging",
      "Sound Design",
    ],
    note: "Hover to hold the line",
  },
  cases: {
    label: "Selected work",
    heading: "Case Studies",
    hint: "Hover a row to peek. We dare you.",
    viewLabel: "View case",
    rows: [
      {
        id: "volta",
        index: "01",
        client: "VOLTA MOTORS",
        title: "Electric, Unfiltered",
        category: "Rebrand + Campaign",
        year: "2025",
        metric: "+340% test drives",
        image: CASE_IMAGES.volta,
        alt: "Creative studio desk with sketches for the Volta Motors rebrand",
      },
      {
        id: "kiosk",
        index: "02",
        client: "KIOSK COFFEE",
        title: "Caffeine As A Lifestyle",
        category: "Brand Identity",
        year: "2024",
        metric: "3x foot traffic",
        image: CASE_IMAGES.kiosk,
        alt: "Wall of colorful sticky notes mapping the Kiosk Coffee identity",
      },
      {
        id: "neon",
        index: "03",
        client: "NEON DISTRICT",
        title: "Nightlife, Rebuilt",
        category: "Digital + Social",
        year: "2025",
        metric: "22M impressions",
        image: CASE_IMAGES.neon,
        alt: "Team collaborating on devices for the Neon District social launch",
      },
      {
        id: "terra",
        index: "04",
        client: "TERRA GOODS",
        title: "Groceries With A Spine",
        category: "Packaging + Web",
        year: "2024",
        metric: "+180% DTC revenue",
        image: CASE_IMAGES.terra,
        alt: "Studio presentation of the Terra Goods packaging system",
      },
      {
        id: "pulse",
        index: "05",
        client: "PULSE FM",
        title: "Radio For The Reckless",
        category: "Motion + Sound",
        year: "2023",
        metric: "1.2M new listeners",
        image: CASE_IMAGES.pulse,
        alt: "Marketing team reviewing the Pulse FM motion identity",
      },
    ],
  },
  manifesto: {
    label: "Manifesto",
    intro: "We cross out the industry playbook. Every line here is a rule we broke on purpose.",
    lines: [
      { kill: "Safe", keep: "SEEN" },
      { kill: "Polite", keep: "PROVOCATIVE" },
      { kill: "On-trend", keep: "AHEAD" },
      { kill: "Nice", keep: "NECESSARY" },
      { kill: "Templates", keep: "TOTEMS" },
      { kill: "Reach", keep: "RESONANCE" },
      { kill: "Noise", keep: "SIGNAL" },
    ],
    signoff: "Only work that refuses to be scrolled past.",
  },
  awards: {
    label: "Trophy shelf",
    heading: "Awards + Press",
    awards: [
      { name: "Site of the Day", org: "Awwwards", year: "2025", count: "x4" },
      { name: "Bronze Lion", org: "Cannes Lions", year: "2024", count: "x1" },
      { name: "FWA of the Day", org: "FWA", year: "2025", count: "x6" },
      { name: "Brand Impact Gold", org: "Transform Awards", year: "2024", count: "x2" },
      { name: "Wood Pencil", org: "D&AD", year: "2023", count: "x1" },
    ],
    pressLabel: "Overheard",
    press: [
      { quote: "LOUD/HAUS makes the rest of the industry look asleep.", source: "Creative Review" },
      { quote: "The most fearless studio working today.", source: "It's Nice That" },
      { quote: "They don't chase culture. They set it.", source: "Eye on Design" },
    ],
  },
  contact: {
    label: "No small talk",
    headline: ["GOT A BRAND", "WORTH", "SHOUTING ABOUT?"],
    sub: "Tell us what everyone else is too scared to make. We reply within one working day.",
    form: {
      nameLabel: "Your name",
      namePlaceholder: "Alex Moreno",
      emailLabel: "Email",
      emailPlaceholder: "you@company.com",
      projectLabel: "What do you need",
      projectOptions: ["Rebrand", "Campaign", "Website", "Motion", "Something wild"],
      budgetLabel: "Budget",
      budgetOptions: ["$10K – $25K", "$25K – $50K", "$50K – $100K", "$100K+"],
      messageLabel: "The brief",
      messagePlaceholder: "We want to make our competitors nervous...",
      submit: "Send It Loud",
      sending: "Firing it off...",
      invalid: "Fill in your name, a real email and the brief.",
      successTitle: "MESSAGE RECEIVED",
      successBody: "Loud and clear. A strategist will hit your inbox within one working day.",
      reset: "Send another",
    },
    meta: [
      { label: "Email", value: "hello@loudhaus.studio" },
      { label: "Call", value: "+1 (415) 555-0142" },
      { label: "Studio", value: "218 Foundry St, Brooklyn NY" },
    ],
  },
  footer: {
    callout: "LET'S MAKE NOISE",
    columns: [
      { title: "Studio", links: ["Work", "Services", "Manifesto", "Awards", "Careers"] },
      { title: "Reach", links: ["hello@loudhaus.studio", "+1 (415) 555-0142", "Press kit"] },
    ],
    socials: [
      { kind: "at", label: "Instagram" },
      { kind: "camera", label: "Behance" },
      { kind: "share", label: "LinkedIn" },
      { kind: "globe", label: "Dribbble" },
    ],
    studioLine: "Brooklyn — Lisbon — everywhere loud",
    legal: "LOUD/HAUS is a fictional studio built as a concept by VigApp.",
    backToTop: "Back to top",
  },
};

/* ------------------------------------------------------------------ */
/* Portuguese                                                          */
/* ------------------------------------------------------------------ */

const pt: LoudContent = {
  numberLocale: "pt-BR",
  nav: {
    links: [
      { id: "work", label: "Projetos" },
      { id: "services", label: "Serviços" },
      { id: "manifesto", label: "Manifesto" },
      { id: "awards", label: "Prêmios" },
    ],
    cta: "Grite Conosco",
    menuOpen: "Abrir menu",
    menuClose: "Fechar menu",
  },
  hero: {
    eyebrow: "Estúdio criativo independente — desde 2016",
    lines: ["FAZEMOS", "MARCAS", "IMPOSSÍVEIS", "DE IGNORAR"],
    accentLine: 1,
    sub: "Estratégia, identidade e campanhas para empresas que se recusam a sussurrar. Sem grupos de foco, sem bege, sem pedir desculpa.",
    ctaPrimary: "Começar um Projeto",
    ctaSecondary: "Ver os Trabalhos",
    scrollCue: "Role se tiver coragem",
    stats: [
      { value: "140+", label: "Marcas reconstruídas" },
      { value: "31", label: "Prêmios na parede" },
      { value: "4,2B", label: "Impressões provocadas" },
    ],
  },
  services: {
    label: "O que fazemos, alto",
    items: [
      "Estratégia de Marca",
      "Identidade Visual",
      "Direção de Arte",
      "Campanha",
      "Motion",
      "Redação",
      "Web Design",
      "Social",
      "Embalagem",
      "Sound Design",
    ],
    note: "Passe o mouse para segurar",
  },
  cases: {
    label: "Trabalhos selecionados",
    heading: "Cases",
    hint: "Passe o mouse numa linha para espiar. Desafiamos você.",
    viewLabel: "Ver case",
    rows: [
      {
        id: "volta",
        index: "01",
        client: "VOLTA MOTORS",
        title: "Elétrico, Sem Filtro",
        category: "Rebrand + Campanha",
        year: "2025",
        metric: "+340% test drives",
        image: CASE_IMAGES.volta,
        alt: "Mesa de estúdio criativo com esboços do rebrand da Volta Motors",
      },
      {
        id: "kiosk",
        index: "02",
        client: "KIOSK COFFEE",
        title: "Cafeína Como Estilo",
        category: "Identidade Visual",
        year: "2024",
        metric: "3x mais movimento",
        image: CASE_IMAGES.kiosk,
        alt: "Parede de post-its coloridos mapeando a identidade da Kiosk Coffee",
      },
      {
        id: "neon",
        index: "03",
        client: "NEON DISTRICT",
        title: "Vida Noturna, Refeita",
        category: "Digital + Social",
        year: "2025",
        metric: "22M de impressões",
        image: CASE_IMAGES.neon,
        alt: "Equipe colaborando em dispositivos para o lançamento social da Neon District",
      },
      {
        id: "terra",
        index: "04",
        client: "TERRA GOODS",
        title: "Mercado Com Atitude",
        category: "Embalagem + Web",
        year: "2024",
        metric: "+180% de receita DTC",
        image: CASE_IMAGES.terra,
        alt: "Apresentação no estúdio do sistema de embalagens da Terra Goods",
      },
      {
        id: "pulse",
        index: "05",
        client: "PULSE FM",
        title: "Rádio Para Os Ousados",
        category: "Motion + Som",
        year: "2023",
        metric: "1,2M de novos ouvintes",
        image: CASE_IMAGES.pulse,
        alt: "Equipe de marketing revisando a identidade em movimento da Pulse FM",
      },
    ],
  },
  manifesto: {
    label: "Manifesto",
    intro: "Riscamos a cartilha do mercado. Cada linha aqui é uma regra que quebramos de propósito.",
    lines: [
      { kill: "Seguro", keep: "VISTO" },
      { kill: "Educado", keep: "PROVOCANTE" },
      { kill: "Na moda", keep: "À FRENTE" },
      { kill: "Bonitinho", keep: "NECESSÁRIO" },
      { kill: "Templates", keep: "TÓTENS" },
      { kill: "Alcance", keep: "RESSONÂNCIA" },
      { kill: "Ruído", keep: "SINAL" },
    ],
    signoff: "Só trabalho que se recusa a ser ignorado.",
  },
  awards: {
    label: "Prateleira de troféus",
    heading: "Prêmios + Imprensa",
    awards: [
      { name: "Site of the Day", org: "Awwwards", year: "2025", count: "x4" },
      { name: "Leão de Bronze", org: "Cannes Lions", year: "2024", count: "x1" },
      { name: "FWA of the Day", org: "FWA", year: "2025", count: "x6" },
      { name: "Brand Impact Gold", org: "Transform Awards", year: "2024", count: "x2" },
      { name: "Wood Pencil", org: "D&AD", year: "2023", count: "x1" },
    ],
    pressLabel: "Falaram por aí",
    press: [
      { quote: "A LOUD/HAUS faz o resto do mercado parecer estar dormindo.", source: "Creative Review" },
      { quote: "O estúdio mais destemido em atividade hoje.", source: "It's Nice That" },
      { quote: "Eles não perseguem a cultura. Eles a definem.", source: "Eye on Design" },
    ],
  },
  contact: {
    label: "Sem rodeios",
    headline: ["TEM UMA MARCA", "QUE MERECE", "SER GRITADA?"],
    sub: "Conte o que todo mundo tem medo de fazer. Respondemos em até um dia útil.",
    form: {
      nameLabel: "Seu nome",
      namePlaceholder: "Alex Moreno",
      emailLabel: "Email",
      emailPlaceholder: "voce@empresa.com",
      projectLabel: "Do que você precisa",
      projectOptions: ["Rebrand", "Campanha", "Site", "Motion", "Algo insano"],
      budgetLabel: "Orçamento",
      budgetOptions: ["R$50K – R$120K", "R$120K – R$250K", "R$250K – R$500K", "R$500K+"],
      messageLabel: "O briefing",
      messagePlaceholder: "Queremos deixar nossos concorrentes nervosos...",
      submit: "Manda Ver",
      sending: "Disparando...",
      invalid: "Preencha nome, um email real e o briefing.",
      successTitle: "MENSAGEM RECEBIDA",
      successBody: "Alto e claro. Um estrategista chega na sua caixa em até um dia útil.",
      reset: "Enviar outra",
    },
    meta: [
      { label: "Email", value: "ola@loudhaus.studio" },
      { label: "Ligar", value: "+55 (11) 95555-0142" },
      { label: "Estúdio", value: "Rua Fradique Coutinho 218, São Paulo" },
    ],
  },
  footer: {
    callout: "VAMOS FAZER BARULHO",
    columns: [
      { title: "Estúdio", links: ["Projetos", "Serviços", "Manifesto", "Prêmios", "Carreiras"] },
      { title: "Contato", links: ["ola@loudhaus.studio", "+55 (11) 95555-0142", "Press kit"] },
    ],
    socials: [
      { kind: "at", label: "Instagram" },
      { kind: "camera", label: "Behance" },
      { kind: "share", label: "LinkedIn" },
      { kind: "globe", label: "Dribbble" },
    ],
    studioLine: "São Paulo — Lisboa — em todo lugar barulhento",
    legal: "LOUD/HAUS é um estúdio fictício criado como conceito pela VigApp.",
    backToTop: "Voltar ao topo",
  },
};

/* ------------------------------------------------------------------ */
/* Spanish                                                             */
/* ------------------------------------------------------------------ */

const es: LoudContent = {
  numberLocale: "es-ES",
  nav: {
    links: [
      { id: "work", label: "Proyectos" },
      { id: "services", label: "Servicios" },
      { id: "manifesto", label: "Manifiesto" },
      { id: "awards", label: "Premios" },
    ],
    cta: "Grita Con Nosotros",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
  },
  hero: {
    eyebrow: "Estudio creativo independiente — desde 2016",
    lines: ["HACEMOS", "MARCAS", "IMPOSIBLES", "DE IGNORAR"],
    accentLine: 1,
    sub: "Estrategia, identidad y campañas para empresas que se niegan a susurrar. Sin focus groups, sin beige, sin pedir perdón.",
    ctaPrimary: "Iniciar un Proyecto",
    ctaSecondary: "Ver el Trabajo",
    scrollCue: "Baja si te atreves",
    stats: [
      { value: "140+", label: "Marcas reconstruidas" },
      { value: "31", label: "Premios en la pared" },
      { value: "4,2B", label: "Impresiones provocadas" },
    ],
  },
  services: {
    label: "Lo que hacemos, alto",
    items: [
      "Estrategia de Marca",
      "Identidad Visual",
      "Dirección de Arte",
      "Campaña",
      "Motion",
      "Copywriting",
      "Diseño Web",
      "Social",
      "Packaging",
      "Sound Design",
    ],
    note: "Pasa el ratón para frenar",
  },
  cases: {
    label: "Trabajo seleccionado",
    heading: "Casos",
    hint: "Pasa el ratón por una fila para espiar. Te retamos.",
    viewLabel: "Ver caso",
    rows: [
      {
        id: "volta",
        index: "01",
        client: "VOLTA MOTORS",
        title: "Eléctrico, Sin Filtro",
        category: "Rebrand + Campaña",
        year: "2025",
        metric: "+340% pruebas de manejo",
        image: CASE_IMAGES.volta,
        alt: "Mesa de estudio creativo con bocetos del rebrand de Volta Motors",
      },
      {
        id: "kiosk",
        index: "02",
        client: "KIOSK COFFEE",
        title: "Cafeína Como Estilo",
        category: "Identidad Visual",
        year: "2024",
        metric: "3x más afluencia",
        image: CASE_IMAGES.kiosk,
        alt: "Pared de notas adhesivas de colores mapeando la identidad de Kiosk Coffee",
      },
      {
        id: "neon",
        index: "03",
        client: "NEON DISTRICT",
        title: "Vida Nocturna, Rehecha",
        category: "Digital + Social",
        year: "2025",
        metric: "22M de impresiones",
        image: CASE_IMAGES.neon,
        alt: "Equipo colaborando en dispositivos para el lanzamiento social de Neon District",
      },
      {
        id: "terra",
        index: "04",
        client: "TERRA GOODS",
        title: "Compra Con Carácter",
        category: "Packaging + Web",
        year: "2024",
        metric: "+180% de ingresos DTC",
        image: CASE_IMAGES.terra,
        alt: "Presentación en estudio del sistema de packaging de Terra Goods",
      },
      {
        id: "pulse",
        index: "05",
        client: "PULSE FM",
        title: "Radio Para Los Osados",
        category: "Motion + Sonido",
        year: "2023",
        metric: "1,2M de nuevos oyentes",
        image: CASE_IMAGES.pulse,
        alt: "Equipo de marketing revisando la identidad en movimiento de Pulse FM",
      },
    ],
  },
  manifesto: {
    label: "Manifiesto",
    intro: "Tachamos el manual del sector. Cada línea aquí es una regla que rompimos a propósito.",
    lines: [
      { kill: "Seguro", keep: "VISTO" },
      { kill: "Educado", keep: "PROVOCADOR" },
      { kill: "De moda", keep: "POR DELANTE" },
      { kill: "Bonito", keep: "NECESARIO" },
      { kill: "Plantillas", keep: "TÓTEMS" },
      { kill: "Alcance", keep: "RESONANCIA" },
      { kill: "Ruido", keep: "SEÑAL" },
    ],
    signoff: "Solo trabajo que se niega a pasar desapercibido.",
  },
  awards: {
    label: "Estante de trofeos",
    heading: "Premios + Prensa",
    awards: [
      { name: "Site of the Day", org: "Awwwards", year: "2025", count: "x4" },
      { name: "León de Bronce", org: "Cannes Lions", year: "2024", count: "x1" },
      { name: "FWA of the Day", org: "FWA", year: "2025", count: "x6" },
      { name: "Brand Impact Gold", org: "Transform Awards", year: "2024", count: "x2" },
      { name: "Wood Pencil", org: "D&AD", year: "2023", count: "x1" },
    ],
    pressLabel: "Se comenta",
    press: [
      { quote: "LOUD/HAUS hace que el resto del sector parezca dormido.", source: "Creative Review" },
      { quote: "El estudio más audaz en activo hoy.", source: "It's Nice That" },
      { quote: "No persiguen la cultura. La marcan.", source: "Eye on Design" },
    ],
  },
  contact: {
    label: "Sin rodeos",
    headline: ["TIENES UNA MARCA", "QUE MERECE", "SER GRITADA?"],
    sub: "Cuéntanos lo que nadie más se atreve a hacer. Respondemos en un día laborable.",
    form: {
      nameLabel: "Tu nombre",
      namePlaceholder: "Alex Moreno",
      emailLabel: "Email",
      emailPlaceholder: "tu@empresa.com",
      projectLabel: "Qué necesitas",
      projectOptions: ["Rebrand", "Campaña", "Web", "Motion", "Algo salvaje"],
      budgetLabel: "Presupuesto",
      budgetOptions: ["€10K – €25K", "€25K – €50K", "€50K – €100K", "€100K+"],
      messageLabel: "El briefing",
      messagePlaceholder: "Queremos poner nerviosa a la competencia...",
      submit: "Envíalo Alto",
      sending: "Disparando...",
      invalid: "Rellena tu nombre, un email real y el briefing.",
      successTitle: "MENSAJE RECIBIDO",
      successBody: "Alto y claro. Un estratega llegará a tu bandeja en un día laborable.",
      reset: "Enviar otro",
    },
    meta: [
      { label: "Email", value: "hola@loudhaus.studio" },
      { label: "Llamar", value: "+34 911 555 0142" },
      { label: "Estudio", value: "Calle de la Fundición 218, Madrid" },
    ],
  },
  footer: {
    callout: "HAGAMOS RUIDO",
    columns: [
      { title: "Estudio", links: ["Proyectos", "Servicios", "Manifiesto", "Premios", "Empleo"] },
      { title: "Contacto", links: ["hola@loudhaus.studio", "+34 911 555 0142", "Press kit"] },
    ],
    socials: [
      { kind: "at", label: "Instagram" },
      { kind: "camera", label: "Behance" },
      { kind: "share", label: "LinkedIn" },
      { kind: "globe", label: "Dribbble" },
    ],
    studioLine: "Madrid — Lisboa — en todas partes, alto",
    legal: "LOUD/HAUS es un estudio ficticio creado como concepto por VigApp.",
    backToTop: "Volver arriba",
  },
};

export const loudDict: DemoDictionary<LoudContent> = { en, pt, es };
