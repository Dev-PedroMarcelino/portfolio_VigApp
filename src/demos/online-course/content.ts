import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface NavLink {
  href: string;
  label: string;
}

export interface HeaderContent {
  nav: NavLink[];
  cta: string;
  openMenu: string;
  closeMenu: string;
}

export interface HeroContent {
  kicker: string;
  titleTop: string;
  titleItalic: string;
  titleBottom: string;
  lede: string;
  startLabel: string;
  startValue: string;
  seatsLabel: string;
  seatsValue: string;
  weeksLabel: string;
  weeksValue: string;
  ctaPrimary: string;
  ctaSecondary: string;
  imageAlt: string;
  ratingLabel: string;
  ratingValue: string;
  gradsLabel: string;
  gradsValue: string;
}

export interface Outcome {
  index: string;
  title: string;
  detail: string;
}

export interface OutcomesContent {
  label: string;
  heading: string;
  headingItalic: string;
  intro: string;
  items: Outcome[];
}

export interface Lesson {
  title: string;
  duration: string;
}

export interface Module {
  id: string;
  order: string;
  title: string;
  summary: string;
  lessons: Lesson[];
}

export interface CurriculumContent {
  label: string;
  heading: string;
  headingItalic: string;
  intro: string;
  lessonsWord: string;
  totalWord: string;
  modules: Module[];
}

export interface InstructorStat {
  value: string;
  label: string;
}

export interface InstructorContent {
  label: string;
  name: string;
  role: string;
  bio: string[];
  quote: string;
  imageAlt: string;
  stats: InstructorStat[];
}

export interface GalleryItem {
  title: string;
  author: string;
  discipline: string;
}

export interface GalleryContent {
  label: string;
  heading: string;
  headingItalic: string;
  intro: string;
  items: GalleryItem[];
  captionCta: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  outcome: string;
}

export interface TestimonialsContent {
  label: string;
  heading: string;
  headingItalic: string;
  items: Testimonial[];
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  solo: string;
  team: string;
  soloNote: string;
  teamNote: string;
  features: string[];
  featured?: boolean;
  cta: string;
}

export interface PricingContent {
  label: string;
  heading: string;
  headingItalic: string;
  intro: string;
  soloLabel: string;
  teamLabel: string;
  soloCaption: string;
  teamCaption: string;
  guarantee: string;
  tiers: PricingTier[];
  popularBadge: string;
}

export interface CountdownContent {
  label: string;
  heading: string;
  headingItalic: string;
  intro: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  closedNote: string;
}

export interface FormField {
  name: string;
  label: string;
  placeholder: string;
}

export interface GoalOption {
  id: string;
  label: string;
}

export interface EnrollContent {
  label: string;
  heading: string;
  headingItalic: string;
  intro: string;
  fields: {
    fullName: FormField;
    email: FormField;
    role: FormField;
    portfolio: FormField;
  };
  goalLabel: string;
  goals: GoalOption[];
  planLabel: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  successMeta: string;
  resetCta: string;
  reassurance: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  label: string;
  heading: string;
  headingItalic: string;
  items: FaqItem[];
}

export interface FooterColumn {
  title: string;
  links: string[];
}

export interface FooterContent {
  tagline: string;
  columns: FooterColumn[];
  socialLabel: string;
  social: { label: string; kind: "at" | "camera" | "share" | "message" | "globe" }[];
  rights: string;
  note: string;
}

export interface MentoraContent {
  header: HeaderContent;
  hero: HeroContent;
  outcomes: OutcomesContent;
  curriculum: CurriculumContent;
  instructor: InstructorContent;
  gallery: GalleryContent;
  testimonials: TestimonialsContent;
  pricing: PricingContent;
  countdown: CountdownContent;
  enroll: EnrollContent;
  faq: FaqContent;
  footer: FooterContent;
}

/* ------------------------------------------------------------------ */
/* English (base + structural fallback)                                */
/* ------------------------------------------------------------------ */

const en: MentoraContent = {
  header: {
    nav: [
      { href: "#outcomes", label: "Outcomes" },
      { href: "#curriculum", label: "Curriculum" },
      { href: "#instructor", label: "Instructor" },
      { href: "#work", label: "Student work" },
      { href: "#pricing", label: "Pricing" },
    ],
    cta: "Apply now",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    kicker: "Cohort 07 — Product Design Intensive",
    titleTop: "Design products",
    titleItalic: "people",
    titleBottom: "actually keep using.",
    lede: "A ten-week, instructor-led cohort for designers who want to ship real work, not collect certificates. Live critique, a portfolio-grade capstone, and a room full of people building alongside you.",
    startLabel: "Cohort starts",
    startValue: "September 15, 2026",
    seatsLabel: "Seats remaining",
    seatsValue: "12 of 40",
    weeksLabel: "Format",
    weeksValue: "10 weeks · live",
    ctaPrimary: "Apply for a seat",
    ctaSecondary: "See the curriculum",
    imageAlt: "Designers reviewing interface work together on laptops during a Mentora studio session",
    ratingLabel: "Cohort rating",
    ratingValue: "4.9 / 5",
    gradsLabel: "Graduates",
    gradsValue: "1,240+",
  },
  outcomes: {
    label: "What you will ship",
    heading: "Leave with proof,",
    headingItalic: "not just notes.",
    intro: "Every module ends in something you can show. By graduation you have a portfolio built on real decisions and defended in front of practicing designers.",
    items: [
      {
        index: "01",
        title: "An end-to-end case study",
        detail: "A full product narrative from research signal to shipped screens, written the way hiring teams read it.",
      },
      {
        index: "02",
        title: "A working prototype",
        detail: "A clickable, motion-aware flow built to be tested with real users, not just admired in a file.",
      },
      {
        index: "03",
        title: "Your own design system",
        detail: "Tokens, components and rules documented so your interfaces stay consistent under pressure.",
      },
      {
        index: "04",
        title: "A defended capstone",
        detail: "One project you present live, take critique on, and refine until it holds up in any interview room.",
      },
    ],
  },
  curriculum: {
    label: "The curriculum",
    heading: "Six modules,",
    headingItalic: "one shipped product.",
    intro: "Structured to move you from thinking to making to defending. Each week pairs a live session with hands-on work reviewed by your instructor and pod.",
    lessonsWord: "lessons",
    totalWord: "total",
    modules: [
      {
        id: "m1",
        order: "01",
        title: "Foundations of Product Thinking",
        summary: "Frame problems worth solving and connect design decisions to outcomes the business cares about.",
        lessons: [
          { title: "From features to outcomes", duration: "22 min" },
          { title: "Reading a product strategy", duration: "18 min" },
          { title: "Mapping the problem space", duration: "26 min" },
          { title: "Writing sharper design briefs", duration: "15 min" },
          { title: "Live: critique clinic 01", duration: "60 min" },
        ],
      },
      {
        id: "m2",
        order: "02",
        title: "Research & Discovery",
        summary: "Run lightweight research that produces signal, then turn interviews into decisions you can defend.",
        lessons: [
          { title: "Recruiting the right five", duration: "19 min" },
          { title: "Interviews without leading", duration: "24 min" },
          { title: "Synthesis that survives scrutiny", duration: "28 min" },
          { title: "Opportunity mapping", duration: "21 min" },
          { title: "Live: research readout", duration: "60 min" },
        ],
      },
      {
        id: "m3",
        order: "03",
        title: "Interaction & Flows",
        summary: "Design the paths people actually take. Model states, edge cases and the moments things go wrong.",
        lessons: [
          { title: "Flows before screens", duration: "23 min" },
          { title: "States, errors and empty views", duration: "27 min" },
          { title: "Information architecture in practice", duration: "20 min" },
          { title: "Reducing cognitive load", duration: "17 min" },
          { title: "Live: flow teardown", duration: "60 min" },
        ],
      },
      {
        id: "m4",
        order: "04",
        title: "Visual Systems & UI Craft",
        summary: "Build the taste and the rules. Type, colour, grid and the details that separate good from shipped.",
        lessons: [
          { title: "Type scales that hold up", duration: "25 min" },
          { title: "Colour with intent", duration: "22 min" },
          { title: "Grid, rhythm and density", duration: "24 min" },
          { title: "Components and tokens", duration: "29 min" },
          { title: "Live: UI polish jam", duration: "60 min" },
        ],
      },
      {
        id: "m5",
        order: "05",
        title: "Prototyping & Motion",
        summary: "Make it feel real. Prototype with purpose and use motion to explain, not decorate.",
        lessons: [
          { title: "Prototyping to answer questions", duration: "21 min" },
          { title: "Motion principles for interfaces", duration: "26 min" },
          { title: "Micro-interactions that earn their place", duration: "23 min" },
          { title: "Usability testing your prototype", duration: "24 min" },
          { title: "Live: prototype review", duration: "60 min" },
        ],
      },
      {
        id: "m6",
        order: "06",
        title: "Portfolio & Storytelling",
        summary: "Turn the work into a story that gets you hired. Structure, present and defend your capstone.",
        lessons: [
          { title: "The case study skeleton", duration: "20 min" },
          { title: "Writing about decisions, not pixels", duration: "22 min" },
          { title: "Presenting under questions", duration: "25 min" },
          { title: "Portfolio review with the room", duration: "30 min" },
          { title: "Live: capstone defence", duration: "90 min" },
        ],
      },
    ],
  },
  instructor: {
    label: "Your instructor",
    name: "Marina Alvares",
    role: "Former Principal Product Designer · 14 years shipping",
    bio: [
      "Marina has led design on products used by millions, from early-stage fintech to a design system adopted across a public company. She has hired designers, run critique rooms, and sat on the other side of the portfolio review more times than she can count.",
      "She built Mentora because most courses teach tools and skip judgement. Her cohorts are small on purpose: every student gets seen, challenged, and pushed to defend the work out loud.",
    ],
    quote: "I do not care how many screens you can make. I care whether you can tell me why.",
    imageAlt: "Portrait of Marina Alvares, lead instructor of the Mentora product design cohort",
    stats: [
      { value: "14 yrs", label: "In the craft" },
      { value: "1,240+", label: "Designers taught" },
      { value: "4.9/5", label: "Instructor rating" },
    ],
  },
  gallery: {
    label: "From past cohorts",
    heading: "Work that got",
    headingItalic: "people hired.",
    intro: "A sample of capstones shipped by Mentora graduates. Every one started as a blank file and ended in a room full of critique.",
    items: [
      { title: "Reframe — a calmer money app", author: "Beatriz Nunes", discipline: "Fintech · End-to-end" },
      { title: "Kindred care coordination", author: "Daniel Okafor", discipline: "Healthcare · Product" },
      { title: "Loop maintenance platform", author: "Sofia Reig", discipline: "B2B · Systems" },
      { title: "Terrace booking rethink", author: "Marcus Feldman", discipline: "Marketplace · Flows" },
      { title: "Habitat home dashboard", author: "Aisha Rahman", discipline: "IoT · Interaction" },
      { title: "Field research toolkit", author: "Tomás Ribeiro", discipline: "Enterprise · Discovery" },
    ],
    captionCta: "Capstone",
  },
  testimonials: {
    label: "Graduate stories",
    heading: "They came to build.",
    headingItalic: "They left different.",
    items: [
      {
        quote: "I had five years of experience and no portfolio I trusted. Ten weeks later I had a case study I was proud to defend in every interview. I signed an offer three weeks after graduating.",
        name: "Camila Duarte",
        role: "Now Senior Product Designer, logistics scale-up",
        outcome: "Promoted within 3 months",
      },
      {
        quote: "The critique rooms were brutal in the best way. Marina would not let me hide behind a nice-looking screen. That habit of defending decisions changed how I work every single day.",
        name: "Jonas Weller",
        role: "Product Designer, health tech",
        outcome: "Career switch from research",
      },
      {
        quote: "I have taken expensive courses before and forgotten them in a month. This one stuck because I shipped something real. My capstone is still the first thing people ask me about.",
        name: "Priya Nair",
        role: "Design Lead, fintech",
        outcome: "Led a team within a year",
      },
    ],
  },
  pricing: {
    label: "Enrollment",
    heading: "One cohort,",
    headingItalic: "three ways in.",
    intro: "Every tier includes the full ten-week curriculum. Choose how much guidance and access you want on top.",
    soloLabel: "Solo",
    teamLabel: "Team",
    soloCaption: "For individual designers investing in themselves.",
    teamCaption: "Per seat, for teams of three or more. Invoiced together.",
    guarantee: "14-day guarantee — full refund before the second live session, no questions asked.",
    popularBadge: "Most chosen",
    tiers: [
      {
        id: "self",
        name: "Self-Paced",
        tagline: "The full curriculum, on your clock.",
        solo: "$480",
        team: "$420",
        soloNote: "one-time",
        teamNote: "per seat",
        features: [
          "All 6 modules and recordings",
          "Assignment briefs and templates",
          "Private community access",
          "Certificate of completion",
        ],
        cta: "Choose Self-Paced",
      },
      {
        id: "cohort",
        name: "Full Cohort",
        tagline: "Live, guided, with your pod.",
        solo: "$1,450",
        team: "$1,200",
        soloNote: "one-time",
        teamNote: "per seat",
        featured: true,
        features: [
          "Everything in Self-Paced",
          "10 weeks of live sessions",
          "Weekly critique with your pod",
          "Portfolio and capstone review",
          "Instructor feedback on all work",
        ],
        cta: "Choose Full Cohort",
      },
      {
        id: "mentor",
        name: "Cohort + Mentorship",
        tagline: "Everything, plus 1:1 time.",
        solo: "$2,600",
        team: "$2,200",
        soloNote: "one-time",
        teamNote: "per seat",
        features: [
          "Everything in Full Cohort",
          "Six 1:1 sessions with Marina",
          "Personal portfolio audit",
          "Interview and salary coaching",
          "Alumni introductions",
        ],
        cta: "Choose Mentorship",
      },
    ],
  },
  countdown: {
    label: "Applications close",
    heading: "Doors close when",
    headingItalic: "the room is full.",
    intro: "We take forty designers per cohort and not one more. Applications close on the date below or the moment the last seat goes.",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    closedNote: "Applications for this cohort are now closed. Join the waitlist for Cohort 08.",
  },
  enroll: {
    label: "Apply",
    heading: "Tell us what",
    headingItalic: "you want to build.",
    intro: "Applications take about five minutes. We read every one and reply within two working days with a decision and next steps.",
    fields: {
      fullName: { name: "fullName", label: "Full name", placeholder: "Beatriz Nunes" },
      email: { name: "email", label: "Email", placeholder: "you@studio.com" },
      role: { name: "role", label: "Current role", placeholder: "Product Designer at ..." },
      portfolio: { name: "portfolio", label: "Portfolio or LinkedIn", placeholder: "yoursite.com" },
    },
    goalLabel: "What is your main goal for this cohort?",
    goals: [
      { id: "job", label: "Land a new design role" },
      { id: "level", label: "Level up in my current role" },
      { id: "switch", label: "Switch into product design" },
      { id: "portfolio", label: "Build a portfolio that lands" },
    ],
    planLabel: "Preferred plan",
    submit: "Submit application",
    submitting: "Sending...",
    successTitle: "Application received.",
    successBody: "Thank you for applying to Cohort 07. Marina and the team read every application personally — expect a reply within two working days.",
    successMeta: "A confirmation is on its way to your inbox.",
    resetCta: "Submit another application",
    reassurance: "No payment now. We only ask for a deposit once you are accepted.",
  },
  faq: {
    label: "Questions",
    heading: "Before you",
    headingItalic: "apply.",
    items: [
      {
        question: "How much time should I set aside each week?",
        answer: "Plan for around eight hours: one live session of roughly ninety minutes plus focused work on your assignment and critique prep. Cohorts that treat the work as a priority get the most out of it.",
      },
      {
        question: "Do I need to be working as a designer already?",
        answer: "No, but you should be comfortable in a design tool and have some experience making interfaces, whether at work, at school, or on side projects. The cohort moves fast and assumes you can execute.",
      },
      {
        question: "What if I miss a live session?",
        answer: "Every live session is recorded and shared within a day. Critique is where the real value is, so we encourage attending live, but the recordings mean a missed week is never a lost week.",
      },
      {
        question: "Is there really a refund policy?",
        answer: "Yes. If the cohort is not for you, request a full refund any time before the second live session. No forms to argue through and no hard feelings.",
      },
      {
        question: "Will this get me a job?",
        answer: "We cannot promise offers, but we can promise a portfolio built on real decisions and the ability to defend it. That combination is what our graduates say made the difference.",
      },
    ],
  },
  footer: {
    tagline: "A small, serious cohort for designers who want to ship real work and defend it out loud.",
    columns: [
      { title: "Program", links: ["Curriculum", "Outcomes", "Instructor", "Student work"] },
      { title: "Enroll", links: ["Pricing", "Apply now", "Refund policy", "Waitlist"] },
      { title: "Company", links: ["About Mentora", "Careers", "Press kit", "Contact"] },
    ],
    socialLabel: "Follow along",
    social: [
      { label: "Newsletter", kind: "at" },
      { label: "Studio reel", kind: "camera" },
      { label: "Community", kind: "message" },
      { label: "mentora.school", kind: "globe" },
    ],
    rights: "Mentora School. A concept experience, not a real enrollment.",
    note: "Made as a design concept by VigApp.",
  },
};

/* ------------------------------------------------------------------ */
/* Portuguese                                                          */
/* ------------------------------------------------------------------ */

const pt: MentoraContent = {
  header: {
    nav: [
      { href: "#outcomes", label: "Resultados" },
      { href: "#curriculum", label: "Currículo" },
      { href: "#instructor", label: "Instrutora" },
      { href: "#work", label: "Projetos" },
      { href: "#pricing", label: "Planos" },
    ],
    cta: "Candidatar-se",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
  },
  hero: {
    kicker: "Turma 07 — Intensivo de Product Design",
    titleTop: "Projete produtos",
    titleItalic: "que as pessoas",
    titleBottom: "continuam usando.",
    lede: "Um programa de dez semanas, ao vivo e conduzido por instrutora, para quem quer entregar trabalho de verdade, não colecionar certificados. Crítica ao vivo, um projeto final de portfólio e uma sala inteira construindo ao seu lado.",
    startLabel: "A turma começa",
    startValue: "15 de setembro de 2026",
    seatsLabel: "Vagas restantes",
    seatsValue: "12 de 40",
    weeksLabel: "Formato",
    weeksValue: "10 semanas · ao vivo",
    ctaPrimary: "Quero minha vaga",
    ctaSecondary: "Ver o currículo",
    imageAlt: "Designers revisando trabalho de interface juntos em notebooks durante uma sessão do estúdio Mentora",
    ratingLabel: "Nota da turma",
    ratingValue: "4,9 / 5",
    gradsLabel: "Formados",
    gradsValue: "1.240+",
  },
  outcomes: {
    label: "O que você vai entregar",
    heading: "Saia com provas,",
    headingItalic: "não só anotações.",
    intro: "Cada módulo termina em algo que você pode mostrar. Na formatura você tem um portfólio construído sobre decisões reais e defendido diante de designers em atividade.",
    items: [
      {
        index: "01",
        title: "Um case de ponta a ponta",
        detail: "Uma narrativa completa de produto, do sinal de pesquisa às telas finais, escrita do jeito que quem contrata lê.",
      },
      {
        index: "02",
        title: "Um protótipo funcional",
        detail: "Um fluxo clicável e com movimento, feito para ser testado com usuários reais, não só admirado num arquivo.",
      },
      {
        index: "03",
        title: "Seu próprio design system",
        detail: "Tokens, componentes e regras documentados para que suas interfaces se mantenham consistentes sob pressão.",
      },
      {
        index: "04",
        title: "Um projeto final defendido",
        detail: "Um projeto que você apresenta ao vivo, recebe crítica e refina até resistir a qualquer entrevista.",
      },
    ],
  },
  curriculum: {
    label: "O currículo",
    heading: "Seis módulos,",
    headingItalic: "um produto entregue.",
    intro: "Estruturado para levar você do pensar ao fazer e ao defender. Cada semana une uma sessão ao vivo a trabalho prático revisado pela sua instrutora e pelo seu grupo.",
    lessonsWord: "aulas",
    totalWord: "no total",
    modules: [
      {
        id: "m1",
        order: "01",
        title: "Fundamentos do Pensamento de Produto",
        summary: "Enquadre problemas que valem a pena resolver e conecte decisões de design a resultados que importam ao negócio.",
        lessons: [
          { title: "De funcionalidades a resultados", duration: "22 min" },
          { title: "Lendo uma estratégia de produto", duration: "18 min" },
          { title: "Mapeando o espaço do problema", duration: "26 min" },
          { title: "Escrevendo briefings mais afiados", duration: "15 min" },
          { title: "Ao vivo: clínica de crítica 01", duration: "60 min" },
        ],
      },
      {
        id: "m2",
        order: "02",
        title: "Pesquisa & Descoberta",
        summary: "Faça pesquisa enxuta que gera sinal e transforme entrevistas em decisões que você consegue defender.",
        lessons: [
          { title: "Recrutando as cinco pessoas certas", duration: "19 min" },
          { title: "Entrevistas sem induzir respostas", duration: "24 min" },
          { title: "Síntese que resiste ao escrutínio", duration: "28 min" },
          { title: "Mapa de oportunidades", duration: "21 min" },
          { title: "Ao vivo: apresentação da pesquisa", duration: "60 min" },
        ],
      },
      {
        id: "m3",
        order: "03",
        title: "Interação & Fluxos",
        summary: "Projete os caminhos que as pessoas realmente percorrem. Modele estados, exceções e os momentos em que algo dá errado.",
        lessons: [
          { title: "Fluxos antes das telas", duration: "23 min" },
          { title: "Estados, erros e telas vazias", duration: "27 min" },
          { title: "Arquitetura de informação na prática", duration: "20 min" },
          { title: "Reduzindo a carga cognitiva", duration: "17 min" },
          { title: "Ao vivo: desmonte de fluxo", duration: "60 min" },
        ],
      },
      {
        id: "m4",
        order: "04",
        title: "Sistemas Visuais & Ofício de UI",
        summary: "Construa o repertório e as regras. Tipografia, cor, grid e os detalhes que separam o bom do entregue.",
        lessons: [
          { title: "Escalas tipográficas que se sustentam", duration: "25 min" },
          { title: "Cor com intenção", duration: "22 min" },
          { title: "Grid, ritmo e densidade", duration: "24 min" },
          { title: "Componentes e tokens", duration: "29 min" },
          { title: "Ao vivo: mutirão de refino de UI", duration: "60 min" },
        ],
      },
      {
        id: "m5",
        order: "05",
        title: "Prototipagem & Movimento",
        summary: "Faça parecer real. Prototipe com propósito e use o movimento para explicar, não para decorar.",
        lessons: [
          { title: "Prototipar para responder perguntas", duration: "21 min" },
          { title: "Princípios de movimento para interfaces", duration: "26 min" },
          { title: "Microinterações que se justificam", duration: "23 min" },
          { title: "Testando a usabilidade do protótipo", duration: "24 min" },
          { title: "Ao vivo: revisão de protótipo", duration: "60 min" },
        ],
      },
      {
        id: "m6",
        order: "06",
        title: "Portfólio & Narrativa",
        summary: "Transforme o trabalho numa história que abre portas. Estruture, apresente e defenda seu projeto final.",
        lessons: [
          { title: "O esqueleto do case", duration: "20 min" },
          { title: "Escrevendo sobre decisões, não pixels", duration: "22 min" },
          { title: "Apresentando sob perguntas", duration: "25 min" },
          { title: "Revisão de portfólio com a turma", duration: "30 min" },
          { title: "Ao vivo: defesa do projeto final", duration: "90 min" },
        ],
      },
    ],
  },
  instructor: {
    label: "Sua instrutora",
    name: "Marina Alvares",
    role: "Ex-Principal Product Designer · 14 anos entregando",
    bio: [
      "Marina liderou design em produtos usados por milhões, de fintechs em estágio inicial a um design system adotado por uma empresa de capital aberto. Ela já contratou designers, conduziu salas de crítica e sentou do outro lado da avaliação de portfólio mais vezes do que consegue contar.",
      "Ela criou a Mentora porque a maioria dos cursos ensina ferramentas e pula o julgamento. Suas turmas são pequenas de propósito: cada aluno é visto, desafiado e levado a defender o trabalho em voz alta.",
    ],
    quote: "Não me importa quantas telas você consegue fazer. Me importa se você sabe me dizer por quê.",
    imageAlt: "Retrato de Marina Alvares, instrutora principal da turma de product design da Mentora",
    stats: [
      { value: "14 anos", label: "No ofício" },
      { value: "1.240+", label: "Designers formados" },
      { value: "4,9/5", label: "Nota da instrutora" },
    ],
  },
  gallery: {
    label: "De turmas anteriores",
    heading: "Trabalho que",
    headingItalic: "abriu portas.",
    intro: "Uma amostra de projetos finais entregues por formados da Mentora. Cada um começou como um arquivo em branco e terminou numa sala cheia de crítica.",
    items: [
      { title: "Reframe — um app de dinheiro mais calmo", author: "Beatriz Nunes", discipline: "Fintech · Ponta a ponta" },
      { title: "Kindred — coordenação de cuidado", author: "Daniel Okafor", discipline: "Saúde · Produto" },
      { title: "Loop — plataforma de manutenção", author: "Sofia Reig", discipline: "B2B · Sistemas" },
      { title: "Terrace — nova reserva de mesas", author: "Marcus Feldman", discipline: "Marketplace · Fluxos" },
      { title: "Habitat — painel da casa", author: "Aisha Rahman", discipline: "IoT · Interação" },
      { title: "Kit de pesquisa de campo", author: "Tomás Ribeiro", discipline: "Enterprise · Descoberta" },
    ],
    captionCta: "Projeto final",
  },
  testimonials: {
    label: "Histórias de formados",
    heading: "Vieram para construir.",
    headingItalic: "Saíram diferentes.",
    items: [
      {
        quote: "Eu tinha cinco anos de experiência e nenhum portfólio em que confiava. Dez semanas depois, tinha um case que eu defendia com orgulho em toda entrevista. Assinei uma proposta três semanas após me formar.",
        name: "Camila Duarte",
        role: "Hoje Product Designer Sênior, scale-up de logística",
        outcome: "Promovida em 3 meses",
      },
      {
        quote: "As salas de crítica eram duras no melhor sentido. A Marina não me deixava me esconder atrás de uma tela bonita. Esse hábito de defender decisões mudou como eu trabalho todos os dias.",
        name: "Jonas Weller",
        role: "Product Designer, health tech",
        outcome: "Migrou da pesquisa",
      },
      {
        quote: "Já fiz cursos caros antes e esqueci em um mês. Este ficou porque entreguei algo real. Meu projeto final ainda é a primeira coisa que as pessoas me perguntam.",
        name: "Priya Nair",
        role: "Design Lead, fintech",
        outcome: "Liderou um time em um ano",
      },
    ],
  },
  pricing: {
    label: "Inscrição",
    heading: "Uma turma,",
    headingItalic: "três formas de entrar.",
    intro: "Todos os planos incluem o currículo completo de dez semanas. Escolha quanta orientação e acesso você quer por cima disso.",
    soloLabel: "Individual",
    teamLabel: "Equipe",
    soloCaption: "Para designers investindo em si mesmos.",
    teamCaption: "Por vaga, para equipes de três ou mais. Faturado em conjunto.",
    guarantee: "Garantia de 14 dias — reembolso total antes da segunda sessão ao vivo, sem perguntas.",
    popularBadge: "Mais escolhido",
    tiers: [
      {
        id: "self",
        name: "Autoguiado",
        tagline: "O currículo completo, no seu ritmo.",
        solo: "R$ 2.400",
        team: "R$ 2.100",
        soloNote: "pagamento único",
        teamNote: "por vaga",
        features: [
          "Todos os 6 módulos e gravações",
          "Briefings e templates de exercícios",
          "Acesso à comunidade privada",
          "Certificado de conclusão",
        ],
        cta: "Escolher Autoguiado",
      },
      {
        id: "cohort",
        name: "Turma Completa",
        tagline: "Ao vivo, guiado, com seu grupo.",
        solo: "R$ 7.200",
        team: "R$ 5.900",
        soloNote: "pagamento único",
        teamNote: "por vaga",
        featured: true,
        features: [
          "Tudo do Autoguiado",
          "10 semanas de sessões ao vivo",
          "Crítica semanal com seu grupo",
          "Revisão de portfólio e projeto final",
          "Feedback da instrutora em todo trabalho",
        ],
        cta: "Escolher Turma Completa",
      },
      {
        id: "mentor",
        name: "Turma + Mentoria",
        tagline: "Tudo, mais tempo individual.",
        solo: "R$ 12.900",
        team: "R$ 10.900",
        soloNote: "pagamento único",
        teamNote: "por vaga",
        features: [
          "Tudo da Turma Completa",
          "Seis sessões 1:1 com a Marina",
          "Auditoria pessoal de portfólio",
          "Coaching de entrevista e salário",
          "Apresentações a ex-alunos",
        ],
        cta: "Escolher Mentoria",
      },
    ],
  },
  countdown: {
    label: "As inscrições fecham",
    heading: "As portas fecham",
    headingItalic: "quando a sala enche.",
    intro: "Aceitamos quarenta designers por turma e nem um a mais. As inscrições fecham na data abaixo ou no instante em que a última vaga for preenchida.",
    days: "Dias",
    hours: "Horas",
    minutes: "Minutos",
    seconds: "Segundos",
    closedNote: "As inscrições desta turma foram encerradas. Entre na lista de espera da Turma 08.",
  },
  enroll: {
    label: "Candidatar-se",
    heading: "Conte o que",
    headingItalic: "você quer construir.",
    intro: "As candidaturas levam cerca de cinco minutos. Lemos cada uma e respondemos em até dois dias úteis com uma decisão e os próximos passos.",
    fields: {
      fullName: { name: "fullName", label: "Nome completo", placeholder: "Beatriz Nunes" },
      email: { name: "email", label: "E-mail", placeholder: "voce@estudio.com" },
      role: { name: "role", label: "Cargo atual", placeholder: "Product Designer na ..." },
      portfolio: { name: "portfolio", label: "Portfólio ou LinkedIn", placeholder: "seusite.com" },
    },
    goalLabel: "Qual é seu principal objetivo com a turma?",
    goals: [
      { id: "job", label: "Conquistar uma nova vaga em design" },
      { id: "level", label: "Evoluir no meu cargo atual" },
      { id: "switch", label: "Migrar para product design" },
      { id: "portfolio", label: "Montar um portfólio que converte" },
    ],
    planLabel: "Plano preferido",
    submit: "Enviar candidatura",
    submitting: "Enviando...",
    successTitle: "Candidatura recebida.",
    successBody: "Obrigada por se candidatar à Turma 07. A Marina e a equipe leem cada candidatura pessoalmente — espere uma resposta em até dois dias úteis.",
    successMeta: "Uma confirmação está a caminho da sua caixa de entrada.",
    resetCta: "Enviar outra candidatura",
    reassurance: "Sem pagamento agora. Só pedimos um sinal depois que você for aceito.",
  },
  faq: {
    label: "Dúvidas",
    heading: "Antes de",
    headingItalic: "se candidatar.",
    items: [
      {
        question: "Quanto tempo devo reservar por semana?",
        answer: "Planeje cerca de oito horas: uma sessão ao vivo de aproximadamente noventa minutos mais trabalho focado no seu exercício e no preparo da crítica. As turmas que tratam o trabalho como prioridade aproveitam mais.",
      },
      {
        question: "Preciso já estar trabalhando como designer?",
        answer: "Não, mas você deve se sentir confortável com uma ferramenta de design e ter alguma experiência criando interfaces, seja no trabalho, na faculdade ou em projetos paralelos. A turma avança rápido e assume que você consegue executar.",
      },
      {
        question: "E se eu perder uma sessão ao vivo?",
        answer: "Toda sessão ao vivo é gravada e compartilhada em até um dia. A crítica é onde está o valor real, então incentivamos a presença ao vivo, mas as gravações garantem que uma semana perdida nunca seja uma semana perdida de vez.",
      },
      {
        question: "A política de reembolso é real mesmo?",
        answer: "Sim. Se a turma não for para você, peça o reembolso total a qualquer momento antes da segunda sessão ao vivo. Sem formulários para discutir e sem ressentimentos.",
      },
      {
        question: "Isso vai me conseguir um emprego?",
        answer: "Não podemos prometer propostas, mas podemos prometer um portfólio construído sobre decisões reais e a capacidade de defendê-lo. É essa combinação que nossos formados dizem ter feito a diferença.",
      },
    ],
  },
  footer: {
    tagline: "Uma turma pequena e séria para designers que querem entregar trabalho de verdade e defendê-lo em voz alta.",
    columns: [
      { title: "Programa", links: ["Currículo", "Resultados", "Instrutora", "Projetos"] },
      { title: "Inscrição", links: ["Planos", "Candidatar-se", "Política de reembolso", "Lista de espera"] },
      { title: "Empresa", links: ["Sobre a Mentora", "Carreiras", "Kit de imprensa", "Contato"] },
    ],
    socialLabel: "Acompanhe",
    social: [
      { label: "Newsletter", kind: "at" },
      { label: "Reel do estúdio", kind: "camera" },
      { label: "Comunidade", kind: "message" },
      { label: "mentora.school", kind: "globe" },
    ],
    rights: "Mentora School. Uma experiência conceitual, não uma inscrição real.",
    note: "Feito como conceito de design pela VigApp.",
  },
};

/* ------------------------------------------------------------------ */
/* Spanish                                                             */
/* ------------------------------------------------------------------ */

const es: MentoraContent = {
  header: {
    nav: [
      { href: "#outcomes", label: "Resultados" },
      { href: "#curriculum", label: "Temario" },
      { href: "#instructor", label: "Instructora" },
      { href: "#work", label: "Proyectos" },
      { href: "#pricing", label: "Planes" },
    ],
    cta: "Postular",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  hero: {
    kicker: "Cohorte 07 — Intensivo de Product Design",
    titleTop: "Diseña productos",
    titleItalic: "que la gente",
    titleBottom: "sigue usando.",
    lede: "Un programa de diez semanas, en vivo y guiado por instructora, para diseñadores que quieren entregar trabajo real, no coleccionar certificados. Crítica en vivo, un proyecto final de portafolio y una sala entera construyendo a tu lado.",
    startLabel: "La cohorte empieza",
    startValue: "15 de septiembre de 2026",
    seatsLabel: "Plazas restantes",
    seatsValue: "12 de 40",
    weeksLabel: "Formato",
    weeksValue: "10 semanas · en vivo",
    ctaPrimary: "Quiero mi plaza",
    ctaSecondary: "Ver el temario",
    imageAlt: "Diseñadores revisando trabajo de interfaz juntos en portátiles durante una sesión del estudio Mentora",
    ratingLabel: "Valoración de la cohorte",
    ratingValue: "4,9 / 5",
    gradsLabel: "Egresados",
    gradsValue: "1.240+",
  },
  outcomes: {
    label: "Lo que vas a entregar",
    heading: "Sal con pruebas,",
    headingItalic: "no solo apuntes.",
    intro: "Cada módulo termina en algo que puedes mostrar. Al graduarte tienes un portafolio construido sobre decisiones reales y defendido ante diseñadores en activo.",
    items: [
      {
        index: "01",
        title: "Un caso de estudio completo",
        detail: "Una narrativa de producto de principio a fin, de la señal de investigación a las pantallas finales, escrita como la lee quien contrata.",
      },
      {
        index: "02",
        title: "Un prototipo funcional",
        detail: "Un flujo clicable y con movimiento, hecho para probarse con usuarios reales, no solo para admirar en un archivo.",
      },
      {
        index: "03",
        title: "Tu propio design system",
        detail: "Tokens, componentes y reglas documentados para que tus interfaces se mantengan consistentes bajo presión.",
      },
      {
        index: "04",
        title: "Un proyecto final defendido",
        detail: "Un proyecto que presentas en vivo, sometes a crítica y refinas hasta que aguante en cualquier entrevista.",
      },
    ],
  },
  curriculum: {
    label: "El temario",
    heading: "Seis módulos,",
    headingItalic: "un producto entregado.",
    intro: "Estructurado para llevarte del pensar al hacer y al defender. Cada semana combina una sesión en vivo con trabajo práctico revisado por tu instructora y tu grupo.",
    lessonsWord: "lecciones",
    totalWord: "en total",
    modules: [
      {
        id: "m1",
        order: "01",
        title: "Fundamentos del Pensamiento de Producto",
        summary: "Encuadra problemas que vale la pena resolver y conecta las decisiones de diseño con resultados que importan al negocio.",
        lessons: [
          { title: "De funcionalidades a resultados", duration: "22 min" },
          { title: "Leer una estrategia de producto", duration: "18 min" },
          { title: "Mapear el espacio del problema", duration: "26 min" },
          { title: "Escribir briefings más afilados", duration: "15 min" },
          { title: "En vivo: clínica de crítica 01", duration: "60 min" },
        ],
      },
      {
        id: "m2",
        order: "02",
        title: "Investigación & Descubrimiento",
        summary: "Haz investigación ligera que genere señal y convierte entrevistas en decisiones que puedas defender.",
        lessons: [
          { title: "Reclutar a las cinco personas correctas", duration: "19 min" },
          { title: "Entrevistas sin inducir respuestas", duration: "24 min" },
          { title: "Síntesis que resiste el escrutinio", duration: "28 min" },
          { title: "Mapa de oportunidades", duration: "21 min" },
          { title: "En vivo: exposición de investigación", duration: "60 min" },
        ],
      },
      {
        id: "m3",
        order: "03",
        title: "Interacción & Flujos",
        summary: "Diseña los caminos que la gente recorre de verdad. Modela estados, casos límite y los momentos en que algo falla.",
        lessons: [
          { title: "Flujos antes que pantallas", duration: "23 min" },
          { title: "Estados, errores y vistas vacías", duration: "27 min" },
          { title: "Arquitectura de información en la práctica", duration: "20 min" },
          { title: "Reducir la carga cognitiva", duration: "17 min" },
          { title: "En vivo: desmontaje de flujo", duration: "60 min" },
        ],
      },
      {
        id: "m4",
        order: "04",
        title: "Sistemas Visuales & Oficio de UI",
        summary: "Construye el criterio y las reglas. Tipografía, color, retícula y los detalles que separan lo bueno de lo entregado.",
        lessons: [
          { title: "Escalas tipográficas que aguantan", duration: "25 min" },
          { title: "Color con intención", duration: "22 min" },
          { title: "Retícula, ritmo y densidad", duration: "24 min" },
          { title: "Componentes y tokens", duration: "29 min" },
          { title: "En vivo: jam de pulido de UI", duration: "60 min" },
        ],
      },
      {
        id: "m5",
        order: "05",
        title: "Prototipado & Movimiento",
        summary: "Haz que se sienta real. Prototipa con propósito y usa el movimiento para explicar, no para decorar.",
        lessons: [
          { title: "Prototipar para responder preguntas", duration: "21 min" },
          { title: "Principios de movimiento para interfaces", duration: "26 min" },
          { title: "Microinteracciones que se justifican", duration: "23 min" },
          { title: "Probar la usabilidad de tu prototipo", duration: "24 min" },
          { title: "En vivo: revisión de prototipo", duration: "60 min" },
        ],
      },
      {
        id: "m6",
        order: "06",
        title: "Portafolio & Narrativa",
        summary: "Convierte el trabajo en una historia que te consiga el puesto. Estructura, presenta y defiende tu proyecto final.",
        lessons: [
          { title: "El esqueleto del caso de estudio", duration: "20 min" },
          { title: "Escribir sobre decisiones, no píxeles", duration: "22 min" },
          { title: "Presentar bajo preguntas", duration: "25 min" },
          { title: "Revisión de portafolio con la sala", duration: "30 min" },
          { title: "En vivo: defensa del proyecto final", duration: "90 min" },
        ],
      },
    ],
  },
  instructor: {
    label: "Tu instructora",
    name: "Marina Alvares",
    role: "Ex Principal Product Designer · 14 años entregando",
    bio: [
      "Marina lideró diseño en productos usados por millones, desde fintech en etapa temprana hasta un design system adoptado por una empresa cotizada. Ha contratado diseñadores, dirigido salas de crítica y se ha sentado al otro lado de la revisión de portafolio más veces de las que puede contar.",
      "Creó Mentora porque la mayoría de los cursos enseña herramientas y se salta el criterio. Sus cohortes son pequeñas a propósito: a cada estudiante se le ve, se le reta y se le empuja a defender el trabajo en voz alta.",
    ],
    quote: "No me importa cuántas pantallas sepas hacer. Me importa si sabes decirme por qué.",
    imageAlt: "Retrato de Marina Alvares, instructora principal de la cohorte de product design de Mentora",
    stats: [
      { value: "14 años", label: "En el oficio" },
      { value: "1.240+", label: "Diseñadores formados" },
      { value: "4,9/5", label: "Valoración de la instructora" },
    ],
  },
  gallery: {
    label: "De cohortes anteriores",
    heading: "Trabajo que",
    headingItalic: "consiguió empleo.",
    intro: "Una muestra de proyectos finales entregados por egresados de Mentora. Cada uno empezó como un archivo en blanco y terminó en una sala llena de crítica.",
    items: [
      { title: "Reframe — una app de dinero más calmada", author: "Beatriz Nunes", discipline: "Fintech · De principio a fin" },
      { title: "Kindred — coordinación de cuidados", author: "Daniel Okafor", discipline: "Salud · Producto" },
      { title: "Loop — plataforma de mantenimiento", author: "Sofia Reig", discipline: "B2B · Sistemas" },
      { title: "Terrace — reserva de mesas rehecha", author: "Marcus Feldman", discipline: "Marketplace · Flujos" },
      { title: "Habitat — panel del hogar", author: "Aisha Rahman", discipline: "IoT · Interacción" },
      { title: "Kit de investigación de campo", author: "Tomás Ribeiro", discipline: "Enterprise · Descubrimiento" },
    ],
    captionCta: "Proyecto final",
  },
  testimonials: {
    label: "Historias de egresados",
    heading: "Vinieron a construir.",
    headingItalic: "Salieron distintos.",
    items: [
      {
        quote: "Tenía cinco años de experiencia y ningún portafolio en el que confiara. Diez semanas después tenía un caso de estudio que defendía con orgullo en cada entrevista. Firmé una oferta tres semanas después de graduarme.",
        name: "Camila Duarte",
        role: "Hoy Product Designer Senior, scale-up de logística",
        outcome: "Ascendida en 3 meses",
      },
      {
        quote: "Las salas de crítica eran duras en el mejor sentido. Marina no me dejaba esconderme detrás de una pantalla bonita. Ese hábito de defender decisiones cambió cómo trabajo cada día.",
        name: "Jonas Weller",
        role: "Product Designer, health tech",
        outcome: "Cambió desde investigación",
      },
      {
        quote: "He hecho cursos caros antes y los olvidé en un mes. Este se quedó porque entregué algo real. Mi proyecto final sigue siendo lo primero que la gente me pregunta.",
        name: "Priya Nair",
        role: "Design Lead, fintech",
        outcome: "Lideró un equipo en un año",
      },
    ],
  },
  pricing: {
    label: "Inscripción",
    heading: "Una cohorte,",
    headingItalic: "tres formas de entrar.",
    intro: "Todos los planes incluyen el temario completo de diez semanas. Elige cuánta guía y acceso quieres por encima de eso.",
    soloLabel: "Individual",
    teamLabel: "Equipo",
    soloCaption: "Para diseñadores que invierten en sí mismos.",
    teamCaption: "Por plaza, para equipos de tres o más. Facturado en conjunto.",
    guarantee: "Garantía de 14 días — reembolso total antes de la segunda sesión en vivo, sin preguntas.",
    popularBadge: "El más elegido",
    tiers: [
      {
        id: "self",
        name: "Autoguiado",
        tagline: "El temario completo, a tu ritmo.",
        solo: "480 €",
        team: "420 €",
        soloNote: "pago único",
        teamNote: "por plaza",
        features: [
          "Los 6 módulos y grabaciones",
          "Briefings y plantillas de ejercicios",
          "Acceso a la comunidad privada",
          "Certificado de finalización",
        ],
        cta: "Elegir Autoguiado",
      },
      {
        id: "cohort",
        name: "Cohorte Completa",
        tagline: "En vivo, guiada, con tu grupo.",
        solo: "1.450 €",
        team: "1.200 €",
        soloNote: "pago único",
        teamNote: "por plaza",
        featured: true,
        features: [
          "Todo lo de Autoguiado",
          "10 semanas de sesiones en vivo",
          "Crítica semanal con tu grupo",
          "Revisión de portafolio y proyecto final",
          "Feedback de la instructora en todo el trabajo",
        ],
        cta: "Elegir Cohorte Completa",
      },
      {
        id: "mentor",
        name: "Cohorte + Mentoría",
        tagline: "Todo, más tiempo individual.",
        solo: "2.600 €",
        team: "2.200 €",
        soloNote: "pago único",
        teamNote: "por plaza",
        features: [
          "Todo lo de Cohorte Completa",
          "Seis sesiones 1:1 con Marina",
          "Auditoría personal de portafolio",
          "Coaching de entrevista y salario",
          "Presentaciones a exalumnos",
        ],
        cta: "Elegir Mentoría",
      },
    ],
  },
  countdown: {
    label: "La inscripción cierra",
    heading: "Las puertas cierran",
    headingItalic: "cuando la sala se llena.",
    intro: "Aceptamos cuarenta diseñadores por cohorte y ni uno más. La inscripción cierra en la fecha de abajo o en el instante en que se ocupa la última plaza.",
    days: "Días",
    hours: "Horas",
    minutes: "Minutos",
    seconds: "Segundos",
    closedNote: "La inscripción para esta cohorte está cerrada. Únete a la lista de espera de la Cohorte 08.",
  },
  enroll: {
    label: "Postular",
    heading: "Cuéntanos qué",
    headingItalic: "quieres construir.",
    intro: "Las postulaciones toman unos cinco minutos. Leemos cada una y respondemos en dos días hábiles con una decisión y los siguientes pasos.",
    fields: {
      fullName: { name: "fullName", label: "Nombre completo", placeholder: "Beatriz Nunes" },
      email: { name: "email", label: "Correo", placeholder: "tu@estudio.com" },
      role: { name: "role", label: "Puesto actual", placeholder: "Product Designer en ..." },
      portfolio: { name: "portfolio", label: "Portafolio o LinkedIn", placeholder: "tusitio.com" },
    },
    goalLabel: "¿Cuál es tu objetivo principal con la cohorte?",
    goals: [
      { id: "job", label: "Conseguir un nuevo puesto de diseño" },
      { id: "level", label: "Crecer en mi puesto actual" },
      { id: "switch", label: "Migrar a product design" },
      { id: "portfolio", label: "Armar un portafolio que convierta" },
    ],
    planLabel: "Plan preferido",
    submit: "Enviar postulación",
    submitting: "Enviando...",
    successTitle: "Postulación recibida.",
    successBody: "Gracias por postular a la Cohorte 07. Marina y el equipo leen cada postulación en persona — espera una respuesta en dos días hábiles.",
    successMeta: "Una confirmación va camino a tu bandeja de entrada.",
    resetCta: "Enviar otra postulación",
    reassurance: "Sin pago ahora. Solo pedimos una reserva una vez que seas aceptado.",
  },
  faq: {
    label: "Preguntas",
    heading: "Antes de",
    headingItalic: "postular.",
    items: [
      {
        question: "¿Cuánto tiempo debo reservar cada semana?",
        answer: "Planea unas ocho horas: una sesión en vivo de aproximadamente noventa minutos más trabajo enfocado en tu ejercicio y la preparación de la crítica. Las cohortes que tratan el trabajo como prioridad le sacan más provecho.",
      },
      {
        question: "¿Necesito trabajar ya como diseñador?",
        answer: "No, pero deberías sentirte cómodo con una herramienta de diseño y tener algo de experiencia creando interfaces, sea en el trabajo, en la universidad o en proyectos propios. La cohorte avanza rápido y asume que puedes ejecutar.",
      },
      {
        question: "¿Y si me pierdo una sesión en vivo?",
        answer: "Toda sesión en vivo se graba y se comparte en un día. La crítica es donde está el valor real, así que animamos a asistir en vivo, pero las grabaciones hacen que una semana perdida nunca sea una semana perdida del todo.",
      },
      {
        question: "¿La política de reembolso es real?",
        answer: "Sí. Si la cohorte no es para ti, pide el reembolso total en cualquier momento antes de la segunda sesión en vivo. Sin formularios que discutir y sin resentimientos.",
      },
      {
        question: "¿Esto me conseguirá un empleo?",
        answer: "No podemos prometer ofertas, pero sí un portafolio construido sobre decisiones reales y la capacidad de defenderlo. Es esa combinación la que nuestros egresados dicen que marcó la diferencia.",
      },
    ],
  },
  footer: {
    tagline: "Una cohorte pequeña y seria para diseñadores que quieren entregar trabajo real y defenderlo en voz alta.",
    columns: [
      { title: "Programa", links: ["Temario", "Resultados", "Instructora", "Proyectos"] },
      { title: "Inscripción", links: ["Planes", "Postular", "Política de reembolso", "Lista de espera"] },
      { title: "Empresa", links: ["Sobre Mentora", "Empleo", "Kit de prensa", "Contacto"] },
    ],
    socialLabel: "Síguenos",
    social: [
      { label: "Newsletter", kind: "at" },
      { label: "Reel del estudio", kind: "camera" },
      { label: "Comunidad", kind: "message" },
      { label: "mentora.school", kind: "globe" },
    ],
    rights: "Mentora School. Una experiencia conceptual, no una inscripción real.",
    note: "Hecho como concepto de diseño por VigApp.",
  },
};

export const mentoraDict: DemoDictionary<MentoraContent> = { en, pt, es };
