import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type FacultyId =
  | "humanities"
  | "sciences"
  | "engineering"
  | "business"
  | "law"
  | "arts";

export interface NavLink {
  href: string;
  label: string;
}

export interface HeaderContent {
  nav: NavLink[];
  apply: string;
  visit: string;
  openMenu: string;
  closeMenu: string;
}

export interface HeroContent {
  established: string;
  motto: string;
  mottoTranslation: string;
  titleLead: string;
  titleEmphasis: string;
  titleTail: string;
  subhead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  imageAlt: string;
  crestLabel: string;
  ribbon: string;
  scrollHint: string;
}

export interface Program {
  id: string;
  name: string;
  faculty: FacultyId;
  degree: string;
  duration: string;
  blurb: string;
  tuition: string;
}

export interface ProgramsContent {
  eyebrow: string;
  title: string;
  intro: string;
  searchLabel: string;
  searchPlaceholder: string;
  facultyLabel: string;
  allLabel: string;
  faculties: { id: FacultyId; label: string }[];
  degreeLabel: string;
  durationLabel: string;
  tuitionLabel: string;
  resultsSingular: string;
  resultsPlural: string;
  clearLabel: string;
  emptyTitle: string;
  emptyBody: string;
  detailsCta: string;
  programs: Program[];
}

export interface ResearchItem {
  id: string;
  area: string;
  title: string;
  blurb: string;
  stat: string;
  statLabel: string;
  alt: string;
}

export interface ResearchContent {
  eyebrow: string;
  title: string;
  intro: string;
  items: ResearchItem[];
}

export interface AdmissionStep {
  phase: string;
  date: string;
  title: string;
  summary: string;
  details: string[];
}

export interface AdmissionsContent {
  eyebrow: string;
  title: string;
  intro: string;
  expandLabel: string;
  collapseLabel: string;
  deadlineLabel: string;
  steps: AdmissionStep[];
}

export interface StatItem {
  value: number;
  suffix: string;
  prefix: string;
  label: string;
}

export interface StatsContent {
  eyebrow: string;
  title: string;
  intro: string;
  items: StatItem[];
}

export interface LifeCard {
  id: string;
  title: string;
  blurb: string;
  tag: string;
  alt: string;
  span: "tall" | "wide" | "regular";
}

export interface StudentLifeContent {
  eyebrow: string;
  title: string;
  intro: string;
  cards: LifeCard[];
  quote: string;
  quoteName: string;
  quoteRole: string;
}

export interface VisitContent {
  eyebrow: string;
  title: string;
  body: string;
  applyCta: string;
  visitCta: string;
  countdownLabel: string;
  units: { days: string; hours: string; minutes: string; seconds: string };
  note: string;
}

export interface FooterColumn {
  title: string;
  links: string[];
}

export interface FooterContent {
  motto: string;
  tagline: string;
  columns: FooterColumn[];
  contactTitle: string;
  address: string;
  hours: string;
  phone: string;
  email: string;
  socialLabel: string;
  socials: { kind: "at" | "globe" | "share" | "message"; label: string }[];
  newsletterLabel: string;
  newsletterPlaceholder: string;
  newsletterCta: string;
  newsletterDone: string;
  legal: string;
}

export interface UniversityContent {
  header: HeaderContent;
  hero: HeroContent;
  programs: ProgramsContent;
  research: ResearchContent;
  admissions: AdmissionsContent;
  stats: StatsContent;
  life: StudentLifeContent;
  visit: VisitContent;
  footer: FooterContent;
}

/** Fixed deadline for the application countdown (SSR/CSR-stable). */
export const APPLICATION_DEADLINE = "2027-01-15T23:59:00Z";

/* ------------------------------------------------------------------ */
/* English                                                             */
/* ------------------------------------------------------------------ */

const en: UniversityContent = {
  header: {
    nav: [
      { href: "#programs", label: "Programs" },
      { href: "#research", label: "Research" },
      { href: "#admissions", label: "Admissions" },
      { href: "#life", label: "Campus Life" },
      { href: "#visit", label: "Visit" },
    ],
    apply: "Apply now",
    visit: "Plan a visit",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    established: "Established 1847",
    motto: "Veritas in Lumine",
    mottoTranslation: "Truth revealed in light",
    titleLead: "A place where",
    titleEmphasis: "enduring ideas",
    titleTail: "meet restless minds",
    subhead:
      "For nearly two centuries, Northgate has gathered scholars, makers and dreamers beneath its elm-lined quadrangles. Rigorous, humane, and unafraid of hard questions.",
    ctaPrimary: "Explore programs",
    ctaSecondary: "Read our research",
    imageAlt: "Northgate's historic sandstone hall behind its central quadrangle",
    crestLabel: "The Northgate crest",
    ribbon: "Undergraduate applications for the Class of 2031 are open",
    scrollHint: "Discover the college",
  },
  programs: {
    eyebrow: "Fields of study",
    title: "Find your program",
    intro:
      "Sixty-two degrees across six faculties, each taught in seminars small enough to learn every name. Search by keyword or narrow by faculty to see where you belong.",
    searchLabel: "Search programs",
    searchPlaceholder: "Try philosophy, data, medicine...",
    facultyLabel: "Faculty",
    allLabel: "All faculties",
    faculties: [
      { id: "humanities", label: "Humanities" },
      { id: "sciences", label: "Sciences" },
      { id: "engineering", label: "Engineering" },
      { id: "business", label: "Business" },
      { id: "law", label: "Law" },
      { id: "arts", label: "Arts" },
    ],
    degreeLabel: "Degree",
    durationLabel: "Duration",
    tuitionLabel: "Tuition / year",
    resultsSingular: "program",
    resultsPlural: "programs",
    clearLabel: "Clear filters",
    emptyTitle: "No programs match yet",
    emptyBody: "Try a broader keyword or reset the faculty filter to see every degree.",
    detailsCta: "Request the handbook",
    programs: [
      {
        id: "philosophy",
        name: "Philosophy, Politics & Economics",
        faculty: "humanities",
        degree: "Bachelor of Arts",
        duration: "3 years",
        blurb:
          "Read the great arguments about power, justice and value, then test them against the world as it actually works.",
        tuition: "$54,200",
      },
      {
        id: "history",
        name: "History of Ideas",
        faculty: "humanities",
        degree: "Bachelor of Arts",
        duration: "3 years",
        blurb:
          "Trace how the beliefs that shape our institutions were born, contested and remade across four continents.",
        tuition: "$52,900",
      },
      {
        id: "molecular",
        name: "Molecular & Cellular Biology",
        faculty: "sciences",
        degree: "Bachelor of Science",
        duration: "4 years",
        blurb:
          "From gene editing to immunology, work in wet labs from your first term alongside faculty who publish widely.",
        tuition: "$58,400",
      },
      {
        id: "physics",
        name: "Physics & Astronomy",
        faculty: "sciences",
        degree: "Master of Science",
        duration: "4 years",
        blurb:
          "Probe the very large and the very small at the Hartwell Observatory and our shared quantum-optics facility.",
        tuition: "$59,100",
      },
      {
        id: "cs",
        name: "Computer Science & Artificial Intelligence",
        faculty: "engineering",
        degree: "Bachelor of Science",
        duration: "4 years",
        blurb:
          "Build systems that reason and scale, grounded in theory and stress-tested in a year-long capstone studio.",
        tuition: "$61,300",
      },
      {
        id: "civil",
        name: "Civil & Environmental Engineering",
        faculty: "engineering",
        degree: "Master of Engineering",
        duration: "5 years",
        blurb:
          "Design the resilient bridges, grids and water systems that a warming century urgently needs.",
        tuition: "$60,500",
      },
      {
        id: "finance",
        name: "Economics & Finance",
        faculty: "business",
        degree: "Bachelor of Science",
        duration: "3 years",
        blurb:
          "Markets, models and ethics in equal measure, taught with live data from the Merton Trading Lab.",
        tuition: "$56,800",
      },
      {
        id: "mba",
        name: "Management & Entrepreneurship",
        faculty: "business",
        degree: "Master of Business Admin.",
        duration: "2 years",
        blurb:
          "Launch, fund and lead ventures with mentors drawn from a global alumni network of founders.",
        tuition: "$68,900",
      },
      {
        id: "law",
        name: "Jurisprudence",
        faculty: "law",
        degree: "Bachelor of Laws",
        duration: "3 years",
        blurb:
          "The reasoning behind the rules, from constitutional theory to the courtroom clinic that serves the city.",
        tuition: "$57,600",
      },
      {
        id: "intllaw",
        name: "International & Human Rights Law",
        faculty: "law",
        degree: "Master of Laws",
        duration: "1 year",
        blurb:
          "Advocacy for a borderless age, taught by practitioners who argue before tribunals in The Hague.",
        tuition: "$63,400",
      },
      {
        id: "architecture",
        name: "Architecture & Urban Design",
        faculty: "arts",
        degree: "Master of Architecture",
        duration: "5 years",
        blurb:
          "Draw, model and build in the Carraway Studios, where craft and climate shape every brief.",
        tuition: "$59,800",
      },
      {
        id: "music",
        name: "Music & Composition",
        faculty: "arts",
        degree: "Bachelor of Music",
        duration: "4 years",
        blurb:
          "Perform in the 1901 Whitmore Hall and compose for our resident chamber ensemble in residence.",
        tuition: "$55,300",
      },
    ],
  },
  research: {
    eyebrow: "Discovery at Northgate",
    title: "Research that leaves the library",
    intro:
      "Our scholars ask questions that matter beyond the seminar room, backed by centres that partner with hospitals, cities and observatories worldwide.",
    items: [
      {
        id: "photo-1607237138185-eedd9c632b0b",
        area: "Life Sciences",
        title: "The Ashford Institute for Genomic Medicine",
        blurb:
          "Turning genetic insight into therapies, with clinical trials now running in fourteen partner hospitals.",
        stat: "38",
        statLabel: "active trials",
        alt: "A researcher reading closely at a book-lined study desk",
      },
      {
        id: "photo-1571260899304-425eee4c7efc",
        area: "Climate & Cities",
        title: "The Meridian Centre for Urban Futures",
        blurb:
          "Modelling how the world's coastal cities can adapt, in partnership with planners on five continents.",
        stat: "27",
        statLabel: "cities partnered",
        alt: "A tiered lecture hall filled with students during a seminar",
      },
      {
        id: "photo-1562774053-701939374585",
        area: "Astronomy",
        title: "The Hartwell Observatory",
        blurb:
          "Mapping exoplanet atmospheres from our mountaintop array, cited in journals across the field each year.",
        stat: "1,240",
        statLabel: "papers cited",
        alt: "Historic university buildings across a landscaped campus",
      },
    ],
  },
  admissions: {
    eyebrow: "The road to Northgate",
    title: "How admission works",
    intro:
      "One considered application, read by people, not algorithms. Expand each stage to see exactly what we ask and when.",
    expandLabel: "See details",
    collapseLabel: "Hide details",
    deadlineLabel: "Deadline",
    steps: [
      {
        phase: "01",
        date: "Opens September 1",
        title: "Discover & register",
        summary:
          "Create your applicant portal, join a virtual open day and tell us which program calls to you.",
        details: [
          "Attend at least one open day, in person or online",
          "Register your intended faculty and program",
          "Fee waivers available on request, no questions asked",
        ],
      },
      {
        phase: "02",
        date: "Due January 15",
        title: "Submit your application",
        summary:
          "Your transcript, two references and a personal essay of no more than 800 words.",
        details: [
          "Academic transcript from your current school",
          "Two references, at least one academic",
          "A personal essay on a question of your choosing",
          "Optional portfolio for Arts and Architecture",
        ],
      },
      {
        phase: "03",
        date: "February to March",
        title: "Interview & review",
        summary:
          "A warm, unhurried conversation with two faculty members about how you think, not what you memorised.",
        details: [
          "A subject conversation with faculty, roughly 40 minutes",
          "Offered on campus or by video, your choice",
          "Every file read by at least three reviewers",
        ],
      },
      {
        phase: "04",
        date: "Decisions by April 1",
        title: "Decision & enrolment",
        summary:
          "Receive your decision, weigh your financial aid package, and reserve your rooms in college.",
        details: [
          "Full financial-aid breakdown with every offer",
          "Guaranteed college housing for first-year students",
          "Reply by May 1 to confirm your place",
        ],
      },
    ],
  },
  stats: {
    eyebrow: "By the numbers",
    title: "A community measured in more than centuries",
    intro:
      "Small enough to know your professors, large enough to change your field. The figures behind an ordinary Northgate year.",
    items: [
      { value: 178, suffix: "", prefix: "", label: "Years of teaching" },
      { value: 11500, suffix: "", prefix: "", label: "Students on campus" },
      { value: 9, suffix: ":1", prefix: "", label: "Student to faculty ratio" },
      { value: 96, suffix: "%", prefix: "", label: "Graduate in six years" },
    ],
  },
  life: {
    eyebrow: "Life in college",
    title: "The hours between lectures",
    intro:
      "Northgate is lived as much on the river and in the debating hall as it is in the library. Two hundred societies, thirty-one sports, one close-knit college town.",
    cards: [
      {
        id: "photo-1523240795612-9a054b0db644",
        title: "Two hundred societies",
        blurb:
          "From the 1863 Debating Union to the astronomy society, there is a common room for every passion.",
        tag: "Societies",
        alt: "A group of students talking together outdoors on campus",
        span: "tall",
      },
      {
        id: "photo-1498243691581-b145c3f54a5a",
        title: "A town that is all campus",
        blurb:
          "Cobbled lanes, riverside cafes and reading rooms that stay open long past midnight during exams.",
        tag: "Our town",
        alt: "Students walking along a tree-lined campus path",
        span: "wide",
      },
      {
        id: "photo-1610116306796-6fea9f4fae38",
        title: "Mentors, not lecturers",
        blurb:
          "Weekly tutorials of two or three students keep every conversation personal and unhurried.",
        tag: "Tutorials",
        alt: "Two students in conversation across a study table",
        span: "regular",
      },
    ],
    quote:
      "I arrived certain I would read law and left having discovered astrophysics in my second year. Northgate gives you room to change your mind, then the people to help you do it well.",
    quoteName: "Amara Okonkwo",
    quoteRole: "Class of 2019, now at the Hartwell Observatory",
  },
  visit: {
    eyebrow: "Come and see for yourself",
    title: "Your Northgate begins with a visit",
    body:
      "Walk the quadrangles, sit in on a seminar and share a meal in hall. Applications for the Class of 2031 close in the middle of January.",
    applyCta: "Begin your application",
    visitCta: "Book a campus tour",
    countdownLabel: "Applications close in",
    units: { days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds" },
    note: "Open days run every Friday through the autumn term. Travel bursaries available.",
  },
  footer: {
    motto: "Veritas in Lumine",
    tagline: "A scholarly community since 1847, in service of truth and the public good.",
    columns: [
      {
        title: "Study",
        links: ["Undergraduate", "Postgraduate", "Faculties", "Scholarships", "Academic calendar"],
      },
      {
        title: "Discover",
        links: ["Research centres", "Libraries", "The observatory", "Public lectures", "Museums"],
      },
      {
        title: "Community",
        links: ["Colleges", "Alumni", "Careers", "Giving", "News"],
      },
    ],
    contactTitle: "Visit us",
    address: "1 University Close, Northgate, MA 01984",
    hours: "Admissions office: Mon to Fri, 9:00 to 17:00",
    phone: "+1 (617) 555-0184",
    email: "admissions@northgate.edu",
    socialLabel: "Follow the college",
    socials: [
      { kind: "at", label: "Journal" },
      { kind: "globe", label: "Newsroom" },
      { kind: "message", label: "Ask a student" },
    ],
    newsletterLabel: "Receive the Northgate Review",
    newsletterPlaceholder: "you@email.com",
    newsletterCta: "Subscribe",
    newsletterDone: "Welcome aboard, the next issue is on its way.",
    legal: "Northgate is a concept university designed by VigApp. Not a real institution.",
  },
};

/* ------------------------------------------------------------------ */
/* Portuguese                                                          */
/* ------------------------------------------------------------------ */

const pt: UniversityContent = {
  header: {
    nav: [
      { href: "#programs", label: "Cursos" },
      { href: "#research", label: "Pesquisa" },
      { href: "#admissions", label: "Admissão" },
      { href: "#life", label: "Vida no Campus" },
      { href: "#visit", label: "Visita" },
    ],
    apply: "Inscreva-se",
    visit: "Agende uma visita",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
  },
  hero: {
    established: "Fundada em 1847",
    motto: "Veritas in Lumine",
    mottoTranslation: "A verdade revelada pela luz",
    titleLead: "Um lugar onde",
    titleEmphasis: "ideias que perduram",
    titleTail: "encontram mentes inquietas",
    subhead:
      "Por quase dois séculos, a Northgate reuniu estudiosos, criadores e sonhadores sob seus pátios rodeados de olmos. Rigorosa, humana e sem medo de perguntas difíceis.",
    ctaPrimary: "Conheça os cursos",
    ctaSecondary: "Veja nossa pesquisa",
    imageAlt: "O histórico salão de arenito da Northgate atrás de seu pátio central",
    crestLabel: "O brasão da Northgate",
    ribbon: "As inscrições da graduação para a Turma de 2031 estão abertas",
    scrollHint: "Descubra a faculdade",
  },
  programs: {
    eyebrow: "Áreas de estudo",
    title: "Encontre o seu curso",
    intro:
      "Sessenta e dois cursos em seis faculdades, cada um em seminários pequenos o bastante para saber cada nome. Busque por palavra ou filtre por faculdade para achar o seu lugar.",
    searchLabel: "Buscar cursos",
    searchPlaceholder: "Tente filosofia, dados, medicina...",
    facultyLabel: "Faculdade",
    allLabel: "Todas as faculdades",
    faculties: [
      { id: "humanities", label: "Humanidades" },
      { id: "sciences", label: "Ciências" },
      { id: "engineering", label: "Engenharia" },
      { id: "business", label: "Negócios" },
      { id: "law", label: "Direito" },
      { id: "arts", label: "Artes" },
    ],
    degreeLabel: "Titulação",
    durationLabel: "Duração",
    tuitionLabel: "Mensalidade / ano",
    resultsSingular: "curso",
    resultsPlural: "cursos",
    clearLabel: "Limpar filtros",
    emptyTitle: "Nenhum curso corresponde ainda",
    emptyBody: "Tente uma palavra mais ampla ou redefina o filtro de faculdade para ver tudo.",
    detailsCta: "Peça o guia do curso",
    programs: [
      {
        id: "philosophy",
        name: "Filosofia, Política e Economia",
        faculty: "humanities",
        degree: "Bacharelado em Artes",
        duration: "3 anos",
        blurb:
          "Leia os grandes debates sobre poder, justiça e valor e depois teste-os no mundo como ele realmente funciona.",
        tuition: "R$ 44.900",
      },
      {
        id: "history",
        name: "História das Ideias",
        faculty: "humanities",
        degree: "Bacharelado em Artes",
        duration: "3 anos",
        blurb:
          "Acompanhe como as crenças que moldam nossas instituições nasceram, foram contestadas e refeitas em quatro continentes.",
        tuition: "R$ 43.800",
      },
      {
        id: "molecular",
        name: "Biologia Molecular e Celular",
        faculty: "sciences",
        degree: "Bacharelado em Ciências",
        duration: "4 anos",
        blurb:
          "Da edição gênica à imunologia, trabalhe em laboratórios desde o primeiro semestre ao lado de docentes publicados.",
        tuition: "R$ 48.400",
      },
      {
        id: "physics",
        name: "Física e Astronomia",
        faculty: "sciences",
        degree: "Mestrado em Ciências",
        duration: "4 anos",
        blurb:
          "Investigue o muito grande e o muito pequeno no Observatório Hartwell e em nosso laboratório de óptica quântica.",
        tuition: "R$ 48.900",
      },
      {
        id: "cs",
        name: "Ciência da Computação e Inteligência Artificial",
        faculty: "engineering",
        degree: "Bacharelado em Ciências",
        duration: "4 anos",
        blurb:
          "Construa sistemas que raciocinam e escalam, fundamentados em teoria e testados num ateliê de conclusão de um ano.",
        tuition: "R$ 50.700",
      },
      {
        id: "civil",
        name: "Engenharia Civil e Ambiental",
        faculty: "engineering",
        degree: "Mestrado em Engenharia",
        duration: "5 anos",
        blurb:
          "Projete as pontes, redes e sistemas de água resilientes de que um século mais quente precisa com urgência.",
        tuition: "R$ 50.100",
      },
      {
        id: "finance",
        name: "Economia e Finanças",
        faculty: "business",
        degree: "Bacharelado em Ciências",
        duration: "3 anos",
        blurb:
          "Mercados, modelos e ética em igual medida, com dados ao vivo do Laboratório de Mercado Merton.",
        tuition: "R$ 47.100",
      },
      {
        id: "mba",
        name: "Gestão e Empreendedorismo",
        faculty: "business",
        degree: "Mestrado em Administração",
        duration: "2 anos",
        blurb:
          "Crie, capte e lidere negócios com mentores de uma rede global de fundadores ex-alunos.",
        tuition: "R$ 57.200",
      },
      {
        id: "law",
        name: "Ciências Jurídicas",
        faculty: "law",
        degree: "Bacharelado em Direito",
        duration: "3 anos",
        blurb:
          "O raciocínio por trás das regras, da teoria constitucional à clínica jurídica que atende a cidade.",
        tuition: "R$ 47.700",
      },
      {
        id: "intllaw",
        name: "Direito Internacional e dos Direitos Humanos",
        faculty: "law",
        degree: "Mestrado em Direito",
        duration: "1 ano",
        blurb:
          "Advocacia para uma era sem fronteiras, com profissionais que atuam em tribunais de Haia.",
        tuition: "R$ 52.600",
      },
      {
        id: "architecture",
        name: "Arquitetura e Urbanismo",
        faculty: "arts",
        degree: "Mestrado em Arquitetura",
        duration: "5 anos",
        blurb:
          "Desenhe, modele e construa nos Ateliês Carraway, onde ofício e clima moldam cada projeto.",
        tuition: "R$ 49.600",
      },
      {
        id: "music",
        name: "Música e Composição",
        faculty: "arts",
        degree: "Bacharelado em Música",
        duration: "4 anos",
        blurb:
          "Apresente-se no Salão Whitmore de 1901 e componha para nosso conjunto de câmara residente.",
        tuition: "R$ 45.900",
      },
    ],
  },
  research: {
    eyebrow: "Descoberta na Northgate",
    title: "Pesquisa que sai da biblioteca",
    intro:
      "Nossos estudiosos fazem perguntas que importam além da sala de aula, apoiados por centros que se aliam a hospitais, cidades e observatórios pelo mundo.",
    items: [
      {
        id: "photo-1607237138185-eedd9c632b0b",
        area: "Ciências da Vida",
        title: "Instituto Ashford de Medicina Genômica",
        blurb:
          "Transformando o conhecimento genético em terapias, com ensaios clínicos em quatorze hospitais parceiros.",
        stat: "38",
        statLabel: "ensaios ativos",
        alt: "Um pesquisador lendo com atenção numa mesa de estudo cheia de livros",
      },
      {
        id: "photo-1571260899304-425eee4c7efc",
        area: "Clima e Cidades",
        title: "Centro Meridian de Futuros Urbanos",
        blurb:
          "Modelando como as cidades costeiras podem se adaptar, em parceria com urbanistas de cinco continentes.",
        stat: "27",
        statLabel: "cidades parceiras",
        alt: "Um anfiteatro repleto de alunos durante um seminário",
      },
      {
        id: "photo-1562774053-701939374585",
        area: "Astronomia",
        title: "Observatório Hartwell",
        blurb:
          "Mapeando atmosferas de exoplanetas em nosso conjunto de montanha, citado em revistas da área a cada ano.",
        stat: "1.240",
        statLabel: "artigos citados",
        alt: "Prédios universitários históricos por um campus arborizado",
      },
    ],
  },
  admissions: {
    eyebrow: "O caminho até a Northgate",
    title: "Como funciona a admissão",
    intro:
      "Uma inscrição bem pensada, lida por pessoas, não por algoritmos. Expanda cada etapa para ver exatamente o que pedimos e quando.",
    expandLabel: "Ver detalhes",
    collapseLabel: "Ocultar detalhes",
    deadlineLabel: "Prazo",
    steps: [
      {
        phase: "01",
        date: "Abre em 1 de setembro",
        title: "Descubra e registre-se",
        summary:
          "Crie seu portal do candidato, participe de um dia aberto virtual e diga qual curso mais te chama.",
        details: [
          "Participe de ao menos um dia aberto, presencial ou online",
          "Registre a faculdade e o curso pretendidos",
          "Isenção de taxa disponível a pedido, sem perguntas",
        ],
      },
      {
        phase: "02",
        date: "Até 15 de janeiro",
        title: "Envie sua inscrição",
        summary:
          "Seu histórico, duas cartas de recomendação e um texto pessoal de no máximo 800 palavras.",
        details: [
          "Histórico escolar da sua instituição atual",
          "Duas recomendações, ao menos uma acadêmica",
          "Um texto pessoal sobre um tema à sua escolha",
          "Portfólio opcional para Artes e Arquitetura",
        ],
      },
      {
        phase: "03",
        date: "De fevereiro a março",
        title: "Entrevista e avaliação",
        summary:
          "Uma conversa acolhedora e sem pressa com dois docentes sobre como você pensa, não o que decorou.",
        details: [
          "Uma conversa sobre a área com docentes, cerca de 40 minutos",
          "Presencial ou por vídeo, você escolhe",
          "Cada inscrição lida por ao menos três avaliadores",
        ],
      },
      {
        phase: "04",
        date: "Resultados até 1 de abril",
        title: "Resultado e matrícula",
        summary:
          "Receba seu resultado, avalie seu pacote de auxílio financeiro e reserve seu quarto no campus.",
        details: [
          "Detalhamento completo do auxílio em cada oferta",
          "Moradia garantida para alunos do primeiro ano",
          "Responda até 1 de maio para confirmar sua vaga",
        ],
      },
    ],
  },
  stats: {
    eyebrow: "Em números",
    title: "Uma comunidade medida em mais que séculos",
    intro:
      "Pequena o bastante para conhecer seus professores, grande o bastante para mudar sua área. Os números por trás de um ano comum na Northgate.",
    items: [
      { value: 178, suffix: "", prefix: "", label: "Anos de ensino" },
      { value: 11500, suffix: "", prefix: "", label: "Alunos no campus" },
      { value: 9, suffix: ":1", prefix: "", label: "Proporção aluno-docente" },
      { value: 96, suffix: "%", prefix: "", label: "Concluem em seis anos" },
    ],
  },
  life: {
    eyebrow: "Vida na faculdade",
    title: "As horas entre as aulas",
    intro:
      "A Northgate se vive tanto no rio e no salão de debates quanto na biblioteca. Duzentas agremiações, trinta e um esportes, uma cidade universitária unida.",
    cards: [
      {
        id: "photo-1523240795612-9a054b0db644",
        title: "Duzentas agremiações",
        blurb:
          "Da União de Debates de 1863 à sociedade de astronomia, há um clube para cada paixão.",
        tag: "Agremiações",
        alt: "Um grupo de estudantes conversando ao ar livre no campus",
        span: "tall",
      },
      {
        id: "photo-1498243691581-b145c3f54a5a",
        title: "Uma cidade que é todo campus",
        blurb:
          "Ruas de pedra, cafés à beira-rio e salas de leitura que ficam abertas madrugada adentro nas provas.",
        tag: "Nossa cidade",
        alt: "Estudantes caminhando por uma alameda arborizada do campus",
        span: "wide",
      },
      {
        id: "photo-1610116306796-6fea9f4fae38",
        title: "Mentores, não palestrantes",
        blurb:
          "Tutoriais semanais de dois ou três alunos mantêm cada conversa pessoal e sem pressa.",
        tag: "Tutoriais",
        alt: "Dois estudantes conversando sobre uma mesa de estudo",
        span: "regular",
      },
    ],
    quote:
      "Cheguei certa de que faria direito e saí tendo descoberto a astrofísica no segundo ano. A Northgate te dá espaço para mudar de ideia e depois as pessoas para fazê-lo bem.",
    quoteName: "Amara Okonkwo",
    quoteRole: "Turma de 2019, hoje no Observatório Hartwell",
  },
  visit: {
    eyebrow: "Venha ver com seus olhos",
    title: "Sua Northgate começa com uma visita",
    body:
      "Percorra os pátios, assista a um seminário e divida uma refeição no salão. As inscrições para a Turma de 2031 encerram em meados de janeiro.",
    applyCta: "Comece sua inscrição",
    visitCta: "Agende um tour",
    countdownLabel: "As inscrições encerram em",
    units: { days: "Dias", hours: "Horas", minutes: "Minutos", seconds: "Segundos" },
    note: "Dias abertos toda sexta durante o outono. Auxílio-viagem disponível.",
  },
  footer: {
    motto: "Veritas in Lumine",
    tagline: "Uma comunidade acadêmica desde 1847, a serviço da verdade e do bem comum.",
    columns: [
      {
        title: "Estude",
        links: ["Graduação", "Pós-graduação", "Faculdades", "Bolsas", "Calendário acadêmico"],
      },
      {
        title: "Descubra",
        links: ["Centros de pesquisa", "Bibliotecas", "O observatório", "Palestras públicas", "Museus"],
      },
      {
        title: "Comunidade",
        links: ["Colégios", "Ex-alunos", "Carreiras", "Doações", "Notícias"],
      },
    ],
    contactTitle: "Visite-nos",
    address: "Rua da Universidade, 1, Higienópolis, São Paulo - SP",
    hours: "Setor de admissão: seg a sex, 9h às 17h",
    phone: "+55 (11) 5555-0184",
    email: "admissao@northgate.edu",
    socialLabel: "Acompanhe a faculdade",
    socials: [
      { kind: "at", label: "Revista" },
      { kind: "globe", label: "Notícias" },
      { kind: "message", label: "Fale com um aluno" },
    ],
    newsletterLabel: "Receba a Northgate Review",
    newsletterPlaceholder: "voce@email.com",
    newsletterCta: "Assinar",
    newsletterDone: "Bem-vindo a bordo, a próxima edição está a caminho.",
    legal: "A Northgate é uma universidade conceito criada pela VigApp. Não é uma instituição real.",
  },
};

/* ------------------------------------------------------------------ */
/* Spanish                                                             */
/* ------------------------------------------------------------------ */

const es: UniversityContent = {
  header: {
    nav: [
      { href: "#programs", label: "Carreras" },
      { href: "#research", label: "Investigación" },
      { href: "#admissions", label: "Admisión" },
      { href: "#life", label: "Vida Universitaria" },
      { href: "#visit", label: "Visita" },
    ],
    apply: "Solicita plaza",
    visit: "Reserva una visita",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  hero: {
    established: "Fundada en 1847",
    motto: "Veritas in Lumine",
    mottoTranslation: "La verdad revelada por la luz",
    titleLead: "Un lugar donde",
    titleEmphasis: "las ideas que perduran",
    titleTail: "encuentran mentes inquietas",
    subhead:
      "Durante casi dos siglos, Northgate ha reunido a estudiosos, creadores y soñadores bajo sus patios rodeados de olmos. Rigurosa, humana y sin miedo a las preguntas difíciles.",
    ctaPrimary: "Descubre las carreras",
    ctaSecondary: "Lee nuestra investigación",
    imageAlt: "El histórico pabellón de arenisca de Northgate tras su patio central",
    crestLabel: "El escudo de Northgate",
    ribbon: "La solicitud de grado para la Promoción de 2031 ya está abierta",
    scrollHint: "Descubre la universidad",
  },
  programs: {
    eyebrow: "Áreas de estudio",
    title: "Encuentra tu carrera",
    intro:
      "Sesenta y dos titulaciones en seis facultades, cada una en seminarios lo bastante pequeños para saber cada nombre. Busca por palabra o filtra por facultad para hallar tu sitio.",
    searchLabel: "Buscar carreras",
    searchPlaceholder: "Prueba filosofía, datos, medicina...",
    facultyLabel: "Facultad",
    allLabel: "Todas las facultades",
    faculties: [
      { id: "humanities", label: "Humanidades" },
      { id: "sciences", label: "Ciencias" },
      { id: "engineering", label: "Ingeniería" },
      { id: "business", label: "Empresa" },
      { id: "law", label: "Derecho" },
      { id: "arts", label: "Artes" },
    ],
    degreeLabel: "Titulación",
    durationLabel: "Duración",
    tuitionLabel: "Matrícula / año",
    resultsSingular: "carrera",
    resultsPlural: "carreras",
    clearLabel: "Limpiar filtros",
    emptyTitle: "Aún no hay carreras que coincidan",
    emptyBody: "Prueba una palabra más amplia o restablece el filtro de facultad para verlo todo.",
    detailsCta: "Pide la guía de la carrera",
    programs: [
      {
        id: "philosophy",
        name: "Filosofía, Política y Economía",
        faculty: "humanities",
        degree: "Grado en Artes",
        duration: "3 años",
        blurb:
          "Lee los grandes debates sobre el poder, la justicia y el valor, y ponlos a prueba en el mundo tal como funciona.",
        tuition: "48.900 €",
      },
      {
        id: "history",
        name: "Historia de las Ideas",
        faculty: "humanities",
        degree: "Grado en Artes",
        duration: "3 años",
        blurb:
          "Sigue cómo las creencias que moldean nuestras instituciones nacieron, se disputaron y se rehicieron en cuatro continentes.",
        tuition: "47.700 €",
      },
      {
        id: "molecular",
        name: "Biología Molecular y Celular",
        faculty: "sciences",
        degree: "Grado en Ciencias",
        duration: "4 años",
        blurb:
          "De la edición génica a la inmunología, trabaja en laboratorios desde el primer curso junto a docentes que publican.",
        tuition: "52.700 €",
      },
      {
        id: "physics",
        name: "Física y Astronomía",
        faculty: "sciences",
        degree: "Máster en Ciencias",
        duration: "4 años",
        blurb:
          "Indaga en lo muy grande y lo muy pequeño en el Observatorio Hartwell y en nuestro laboratorio de óptica cuántica.",
        tuition: "53.300 €",
      },
      {
        id: "cs",
        name: "Informática e Inteligencia Artificial",
        faculty: "engineering",
        degree: "Grado en Ciencias",
        duration: "4 años",
        blurb:
          "Construye sistemas que razonan y escalan, cimentados en teoría y probados en un taller final de un año.",
        tuition: "55.300 €",
      },
      {
        id: "civil",
        name: "Ingeniería Civil y Ambiental",
        faculty: "engineering",
        degree: "Máster en Ingeniería",
        duration: "5 años",
        blurb:
          "Diseña los puentes, redes y sistemas de agua resilientes que un siglo más cálido necesita con urgencia.",
        tuition: "54.600 €",
      },
      {
        id: "finance",
        name: "Economía y Finanzas",
        faculty: "business",
        degree: "Grado en Ciencias",
        duration: "3 años",
        blurb:
          "Mercados, modelos y ética a partes iguales, con datos en vivo del Laboratorio de Mercados Merton.",
        tuition: "51.200 €",
      },
      {
        id: "mba",
        name: "Dirección y Emprendimiento",
        faculty: "business",
        degree: "Máster en Administración",
        duration: "2 años",
        blurb:
          "Lanza, financia y lidera proyectos con mentores de una red global de fundadores egresados.",
        tuition: "62.100 €",
      },
      {
        id: "law",
        name: "Ciencias Jurídicas",
        faculty: "law",
        degree: "Grado en Derecho",
        duration: "3 años",
        blurb:
          "El razonamiento tras las normas, de la teoría constitucional a la clínica jurídica que atiende la ciudad.",
        tuition: "51.900 €",
      },
      {
        id: "intllaw",
        name: "Derecho Internacional y de los Derechos Humanos",
        faculty: "law",
        degree: "Máster en Derecho",
        duration: "1 año",
        blurb:
          "Defensa para una era sin fronteras, con profesionales que litigan ante tribunales en La Haya.",
        tuition: "57.100 €",
      },
      {
        id: "architecture",
        name: "Arquitectura y Urbanismo",
        faculty: "arts",
        degree: "Máster en Arquitectura",
        duration: "5 años",
        blurb:
          "Dibuja, modela y construye en los Talleres Carraway, donde el oficio y el clima moldean cada encargo.",
        tuition: "53.900 €",
      },
      {
        id: "music",
        name: "Música y Composición",
        faculty: "arts",
        degree: "Grado en Música",
        duration: "4 años",
        blurb:
          "Actúa en la Sala Whitmore de 1901 y compón para nuestro conjunto de cámara residente.",
        tuition: "49.800 €",
      },
    ],
  },
  research: {
    eyebrow: "El descubrimiento en Northgate",
    title: "Investigación que sale de la biblioteca",
    intro:
      "Nuestros investigadores hacen preguntas que importan más allá del aula, con centros que colaboran con hospitales, ciudades y observatorios de todo el mundo.",
    items: [
      {
        id: "photo-1607237138185-eedd9c632b0b",
        area: "Ciencias de la Vida",
        title: "Instituto Ashford de Medicina Genómica",
        blurb:
          "Convertimos el conocimiento genético en terapias, con ensayos clínicos en catorce hospitales asociados.",
        stat: "38",
        statLabel: "ensayos activos",
        alt: "Un investigador leyendo con atención en un escritorio lleno de libros",
      },
      {
        id: "photo-1571260899304-425eee4c7efc",
        area: "Clima y Ciudades",
        title: "Centro Meridian de Futuros Urbanos",
        blurb:
          "Modelamos cómo pueden adaptarse las ciudades costeras, junto a urbanistas de cinco continentes.",
        stat: "27",
        statLabel: "ciudades aliadas",
        alt: "Un aula magna llena de estudiantes durante un seminario",
      },
      {
        id: "photo-1562774053-701939374585",
        area: "Astronomía",
        title: "Observatorio Hartwell",
        blurb:
          "Cartografiamos atmósferas de exoplanetas desde nuestra cima, citados en revistas del campo cada año.",
        stat: "1.240",
        statLabel: "artículos citados",
        alt: "Edificios universitarios históricos en un campus arbolado",
      },
    ],
  },
  admissions: {
    eyebrow: "El camino a Northgate",
    title: "Cómo funciona la admisión",
    intro:
      "Una solicitud meditada, leída por personas, no por algoritmos. Despliega cada etapa para ver exactamente qué pedimos y cuándo.",
    expandLabel: "Ver detalles",
    collapseLabel: "Ocultar detalles",
    deadlineLabel: "Plazo",
    steps: [
      {
        phase: "01",
        date: "Abre el 1 de septiembre",
        title: "Descubre y regístrate",
        summary:
          "Crea tu portal de candidato, participa en una jornada abierta virtual y dinos qué carrera te llama.",
        details: [
          "Asiste al menos a una jornada abierta, presencial u online",
          "Registra la facultad y la carrera que quieres",
          "Exención de tasas a petición, sin preguntas",
        ],
      },
      {
        phase: "02",
        date: "Hasta el 15 de enero",
        title: "Envía tu solicitud",
        summary:
          "Tu expediente, dos referencias y un texto personal de no más de 800 palabras.",
        details: [
          "Expediente académico de tu centro actual",
          "Dos referencias, al menos una académica",
          "Un texto personal sobre un tema que elijas",
          "Portafolio opcional para Artes y Arquitectura",
        ],
      },
      {
        phase: "03",
        date: "De febrero a marzo",
        title: "Entrevista y revisión",
        summary:
          "Una conversación cálida y sin prisas con dos docentes sobre cómo piensas, no lo que memorizaste.",
        details: [
          "Una charla sobre la materia con docentes, unos 40 minutos",
          "En el campus o por vídeo, tú eliges",
          "Cada expediente lo leen al menos tres revisores",
        ],
      },
      {
        phase: "04",
        date: "Resoluciones hasta el 1 de abril",
        title: "Resolución y matrícula",
        summary:
          "Recibe tu resolución, valora tu paquete de ayuda financiera y reserva tu habitación en el colegio.",
        details: [
          "Desglose completo de la ayuda con cada oferta",
          "Alojamiento garantizado para estudiantes de primer año",
          "Responde antes del 1 de mayo para confirmar tu plaza",
        ],
      },
    ],
  },
  stats: {
    eyebrow: "En cifras",
    title: "Una comunidad que se mide en más que siglos",
    intro:
      "Pequeña para conocer a tus profesores, grande para cambiar tu campo. Las cifras tras un año cualquiera en Northgate.",
    items: [
      { value: 178, suffix: "", prefix: "", label: "Años de docencia" },
      { value: 11500, suffix: "", prefix: "", label: "Estudiantes en el campus" },
      { value: 9, suffix: ":1", prefix: "", label: "Ratio estudiante-docente" },
      { value: 96, suffix: "%", prefix: "", label: "Se gradúan en seis años" },
    ],
  },
  life: {
    eyebrow: "Vida en el colegio",
    title: "Las horas entre clases",
    intro:
      "Northgate se vive tanto en el río y la sala de debates como en la biblioteca. Doscientas asociaciones, treinta y un deportes, una ciudad universitaria muy unida.",
    cards: [
      {
        id: "photo-1523240795612-9a054b0db644",
        title: "Doscientas asociaciones",
        blurb:
          "De la Unión de Debate de 1863 a la sociedad de astronomía, hay una sala común para cada pasión.",
        tag: "Asociaciones",
        alt: "Un grupo de estudiantes conversando al aire libre en el campus",
        span: "tall",
      },
      {
        id: "photo-1498243691581-b145c3f54a5a",
        title: "Una ciudad que es todo campus",
        blurb:
          "Calles adoquinadas, cafés junto al río y salas de lectura abiertas hasta pasada la medianoche en exámenes.",
        tag: "Nuestra ciudad",
        alt: "Estudiantes paseando por una alameda arbolada del campus",
        span: "wide",
      },
      {
        id: "photo-1610116306796-6fea9f4fae38",
        title: "Mentores, no ponentes",
        blurb:
          "Las tutorías semanales de dos o tres estudiantes mantienen cada conversación cercana y sin prisas.",
        tag: "Tutorías",
        alt: "Dos estudiantes conversando sobre una mesa de estudio",
        span: "regular",
      },
    ],
    quote:
      "Llegué segura de que estudiaría derecho y salí habiendo descubierto la astrofísica en segundo. Northgate te da espacio para cambiar de idea y luego la gente para hacerlo bien.",
    quoteName: "Amara Okonkwo",
    quoteRole: "Promoción de 2019, hoy en el Observatorio Hartwell",
  },
  visit: {
    eyebrow: "Ven y compruébalo",
    title: "Tu Northgate empieza con una visita",
    body:
      "Recorre los patios, asiste a un seminario y comparte una comida en el comedor. La solicitud para la Promoción de 2031 cierra a mediados de enero.",
    applyCta: "Empieza tu solicitud",
    visitCta: "Reserva un tour",
    countdownLabel: "La solicitud cierra en",
    units: { days: "Días", hours: "Horas", minutes: "Minutos", seconds: "Segundos" },
    note: "Jornadas abiertas cada viernes durante el otoño. Ayudas de viaje disponibles.",
  },
  footer: {
    motto: "Veritas in Lumine",
    tagline: "Una comunidad académica desde 1847, al servicio de la verdad y el bien común.",
    columns: [
      {
        title: "Estudia",
        links: ["Grado", "Posgrado", "Facultades", "Becas", "Calendario académico"],
      },
      {
        title: "Descubre",
        links: ["Centros de investigación", "Bibliotecas", "El observatorio", "Conferencias", "Museos"],
      },
      {
        title: "Comunidad",
        links: ["Colegios", "Antiguos alumnos", "Empleo", "Donaciones", "Noticias"],
      },
    ],
    contactTitle: "Visítanos",
    address: "Calle de la Universidad 1, Chamberí, 28010 Madrid",
    hours: "Oficina de admisión: lun a vie, 9:00 a 17:00",
    phone: "+34 911 55 0184",
    email: "admision@northgate.edu",
    socialLabel: "Sigue a la universidad",
    socials: [
      { kind: "at", label: "Revista" },
      { kind: "globe", label: "Actualidad" },
      { kind: "message", label: "Habla con un estudiante" },
    ],
    newsletterLabel: "Recibe la Northgate Review",
    newsletterPlaceholder: "tu@correo.com",
    newsletterCta: "Suscribirme",
    newsletterDone: "Bienvenido a bordo, el próximo número está en camino.",
    legal: "Northgate es una universidad conceptual diseñada por VigApp. No es una institución real.",
  },
};

export const universityDict: DemoDictionary<UniversityContent> = { en, pt, es };
