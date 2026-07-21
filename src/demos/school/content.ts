import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type AgeGroupId = "early" | "elementary" | "middle";

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

export interface HeroBadge {
  value: string;
  label: string;
}

export interface HeroContent {
  eyebrow: string;
  titleLead: string;
  titleHighlight: string;
  titleTail: string;
  subhead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  imageAlt: string;
  badges: HeroBadge[];
  ribbon: string;
}

export interface AgeProgram {
  id: AgeGroupId;
  tab: string;
  ages: string;
  title: string;
  blurb: string;
  highlights: string[];
  ratio: string;
  hours: string;
  tuition: string;
  tuitionNote: string;
  imageAlt: string;
}

export interface ProgramsContent {
  eyebrow: string;
  title: string;
  intro: string;
  ratioLabel: string;
  hoursLabel: string;
  tuitionLabel: string;
  highlightsLabel: string;
  cta: string;
  programs: AgeProgram[];
}

export interface DayStep {
  clock: string;
  title: string;
  detail: string;
}

export interface DayContent {
  eyebrow: string;
  title: string;
  intro: string;
  steps: DayStep[];
}

export interface GalleryImage {
  id: string;
  alt: string;
  caption: string;
  tag: string;
}

export interface GalleryContent {
  eyebrow: string;
  title: string;
  intro: string;
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
  images: GalleryImage[];
}

export interface Teacher {
  name: string;
  role: string;
  subject: string;
  bio: string;
  accent: "accent" | "sun" | "coral" | "mint";
}

export interface TeachersContent {
  eyebrow: string;
  title: string;
  intro: string;
  teachers: Teacher[];
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface StatsContent {
  title: string;
  intro: string;
  items: StatItem[];
}

export interface EnrollStep {
  title: string;
  detail: string;
}

export interface RsvpField {
  label: string;
  placeholder: string;
  required: string;
}

export interface RsvpContent {
  parent: RsvpField;
  child: RsvpField;
  email: RsvpField;
  emailInvalid: string;
  groupLabel: string;
  groupOptions: { id: AgeGroupId; label: string }[];
  dateLabel: string;
  dateOptions: { id: string; label: string }[];
  guestsLabel: string;
  guestsDecrease: string;
  guestsIncrease: string;
  notesLabel: string;
  notesPlaceholder: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  successAgain: string;
}

export interface EnrollContent {
  eyebrow: string;
  title: string;
  intro: string;
  steps: EnrollStep[];
  formTitle: string;
  formIntro: string;
  rsvp: RsvpContent;
}

export interface FooterColumn {
  title: string;
  links: string[];
}

export interface FooterContent {
  tagline: string;
  columns: FooterColumn[];
  address: string;
  hours: string;
  phone: string;
  email: string;
  socialLabel: string;
  socials: { kind: "at" | "camera" | "share" | "message" | "globe"; label: string }[];
  legal: string;
  newsletterLabel: string;
  newsletterPlaceholder: string;
  newsletterCta: string;
}

export interface SchoolContent {
  header: HeaderContent;
  hero: HeroContent;
  programs: ProgramsContent;
  day: DayContent;
  gallery: GalleryContent;
  teachers: TeachersContent;
  stats: StatsContent;
  enroll: EnrollContent;
  footer: FooterContent;
}

/* ------------------------------------------------------------------ */
/* English                                                             */
/* ------------------------------------------------------------------ */

const en: SchoolContent = {
  header: {
    nav: [
      { href: "#programs", label: "Programs" },
      { href: "#day", label: "A Day Here" },
      { href: "#campus", label: "Campus Life" },
      { href: "#teachers", label: "Teachers" },
      { href: "#enroll", label: "Enroll" },
    ],
    cta: "Book an open day",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    eyebrow: "Play-led learning · Ages 3 to 14",
    titleLead: "Where big",
    titleHighlight: "curiosity",
    titleTail: "finds room to grow",
    subhead:
      "Brightpath is a joyful K-12 school where children explore, make, and wonder out loud. Small classes, big hearts, and days built around how kids actually learn.",
    ctaPrimary: "Reserve your spot",
    ctaSecondary: "See our programs",
    imageAlt: "Brightpath students collaborating on a bright classroom project",
    badges: [
      { value: "1:8", label: "Teacher ratio" },
      { value: "28", label: "Clubs & studios" },
      { value: "97%", label: "Family recommend" },
    ],
    ribbon: "Now enrolling for the 2026-2027 school year",
  },
  programs: {
    eyebrow: "Programs by age",
    title: "A path that grows with your child",
    intro:
      "Three learning stages, one warm community. Pick an age group to see how the day, the space, and the goals shift as children get older.",
    ratioLabel: "Class ratio",
    hoursLabel: "School hours",
    tuitionLabel: "Tuition",
    highlightsLabel: "What the day holds",
    cta: "Ask about this stage",
    programs: [
      {
        id: "early",
        tab: "Early Years",
        ages: "Ages 3 to 5",
        title: "Early Years Studio",
        blurb:
          "Our youngest explorers learn through play, story, and sensory discovery in sunlit rooms that feel like a second home.",
        highlights: [
          "Guided free-play and outdoor mud kitchen",
          "Daily read-aloud and puppet storytelling",
          "Music, movement, and messy art",
          "Gentle routines that build independence",
        ],
        ratio: "1 teacher to 6 children",
        hours: "8:30 - 15:00, extended care to 17:30",
        tuition: "$980 / month",
        tuitionNote: "Includes meals, snacks, and materials",
        imageAlt: "Young children painting together at a low classroom table",
      },
      {
        id: "elementary",
        tab: "Elementary",
        ages: "Ages 6 to 10",
        title: "Elementary Village",
        blurb:
          "Reading, numbers, and science come alive through projects, field trips, and questions children actually care about.",
        highlights: [
          "Project weeks that cross every subject",
          "Reading workshop and math discovery labs",
          "Coding, gardening, and maker studio",
          "Weekly community meeting run by students",
        ],
        ratio: "1 teacher to 8 children",
        hours: "8:15 - 15:30, clubs to 17:30",
        tuition: "$1,180 / month",
        tuitionNote: "Includes lunch, clubs, and trips",
        imageAlt: "Elementary students learning at their desks in a bright room",
      },
      {
        id: "middle",
        tab: "Middle School",
        ages: "Ages 11 to 14",
        title: "Middle School Commons",
        blurb:
          "Deeper thinking, real responsibility, and space to figure out who they are — guided by mentors who truly know them.",
        highlights: [
          "Seminar-style discussion and debate",
          "Design, robotics, and film electives",
          "Advisory mentoring and wellbeing check-ins",
          "Student-led exhibitions each term",
        ],
        ratio: "1 teacher to 10 students",
        hours: "8:00 - 16:00, labs to 18:00",
        tuition: "$1,340 / month",
        tuitionNote: "Includes electives, devices, and mentoring",
        imageAlt: "Middle school students working with a teacher in class",
      },
    ],
  },
  day: {
    eyebrow: "A day at Brightpath",
    title: "From morning circle to golden hour",
    intro:
      "No two days are identical, but they share a rhythm children can count on — balancing focus, movement, wonder, and rest.",
    steps: [
      {
        clock: "08:15",
        title: "Sunrise welcome",
        detail: "Teachers greet every child by name at the door, then families ease into morning circle.",
      },
      {
        clock: "09:00",
        title: "Deep-work blocks",
        detail: "Reading, numbers, and language while minds are freshest, in small guided groups.",
      },
      {
        clock: "10:45",
        title: "Outdoor play",
        detail: "Climbing, running, and mud-kitchen adventures on our shaded garden playground.",
      },
      {
        clock: "12:15",
        title: "Family-style lunch",
        detail: "Warm meals shared at long tables, where older buddies help the little ones.",
      },
      {
        clock: "13:30",
        title: "Project studios",
        detail: "Hands-on projects across art, science, coding, and building — chosen by the children.",
      },
      {
        clock: "15:15",
        title: "Golden-hour clubs",
        detail: "Choir, chess, soccer, and gardening before a calm, unhurried goodbye.",
      },
    ],
  },
  gallery: {
    eyebrow: "Campus life",
    title: "Bright rooms, big smiles, real moments",
    intro:
      "A peek inside the studios, gardens, and reading nooks where our days unfold. Tap any moment to see it up close.",
    closeLabel: "Close image viewer",
    prevLabel: "Previous image",
    nextLabel: "Next image",
    images: [
      {
        id: "photo-1509062522246-3755977927d7",
        alt: "Children gathered on a colorful classroom carpet",
        caption: "Morning circle in the Early Years Studio",
        tag: "Early Years",
      },
      {
        id: "photo-1503676260728-1c00da094a0b",
        alt: "Two children focused on a hands-on learning activity",
        caption: "Discovery labs in the Elementary Village",
        tag: "Discovery",
      },
      {
        id: "photo-1577412647305-991150c7d163",
        alt: "Children painting with bright colors at school",
        caption: "Open studio afternoon in the art room",
        tag: "Art studio",
      },
      {
        id: "photo-1427504494785-3a9ca7044f45",
        alt: "A teacher reading with a circle of attentive children",
        caption: "Read-aloud under the story tree",
        tag: "Storytime",
      },
      {
        id: "photo-1577896851231-70ef18881754",
        alt: "Happy children playing together at school",
        caption: "Golden-hour clubs in the garden yard",
        tag: "Clubs",
      },
      {
        id: "photo-1580582932707-520aed937b7b",
        alt: "Rows of bright, tidy classroom desks ready for learning",
        caption: "The maker commons, set for project week",
        tag: "Maker space",
      },
    ],
  },
  teachers: {
    eyebrow: "Meet the team",
    title: "Grown-ups who light the way",
    intro:
      "Our teachers are the heart of Brightpath — curious, kind, and endlessly patient. Here are a few of the faces your child will know by heart.",
    teachers: [
      {
        name: "Marina Alvarez",
        role: "Early Years Lead",
        subject: "Play & literacy",
        bio: "Fifteen years turning muddy hands and big questions into a love of learning.",
        accent: "coral",
      },
      {
        name: "David Okoro",
        role: "Elementary Guide",
        subject: "Science & maker",
        bio: "Turns the classroom into a lab where every wrong answer is a great new start.",
        accent: "accent",
      },
      {
        name: "Beatriz Santos",
        role: "Reading Workshop",
        subject: "Story & language",
        bio: "Believes every child is a reader waiting for the right book at the right moment.",
        accent: "sun",
      },
      {
        name: "Kenji Tanaka",
        role: "Middle School Mentor",
        subject: "Design & robotics",
        bio: "Coaches young makers to build, break, and rebuild with fearless curiosity.",
        accent: "mint",
      },
    ],
  },
  stats: {
    title: "A community that keeps growing",
    intro: "Nineteen years of joyful mornings, and every year a little brighter than the last.",
    items: [
      { value: 640, suffix: "", label: "Happy students" },
      { value: 28, suffix: "", label: "Clubs & studios" },
      { value: 19, suffix: "", label: "Years of Brightpath" },
      { value: 97, suffix: "%", label: "Families recommend us" },
    ],
  },
  enroll: {
    eyebrow: "Join the family",
    title: "Four gentle steps to your first day",
    intro:
      "Enrolling should feel as warm as the school itself. Here is how families come aboard — and how to grab a seat at our next open day.",
    steps: [
      { title: "Say hello", detail: "Tell us about your child and what you are hoping to find in a school." },
      { title: "Visit an open day", detail: "Spend a morning with us, meet teachers, and watch the classrooms in motion." },
      { title: "Family conversation", detail: "A relaxed chat so we can match your child to the right stage and pace." },
      { title: "Welcome aboard", detail: "Confirm your spot and count down to a joyful, well-supported first day." },
    ],
    formTitle: "RSVP for an open day",
    formIntro: "Pick a morning that suits your family. We will save a warm welcome and answer every question.",
    rsvp: {
      parent: { label: "Parent or guardian", placeholder: "e.g. Amara Johnson", required: "Please tell us your name" },
      child: { label: "Child's first name", placeholder: "e.g. Noah", required: "Please add your child's name" },
      email: { label: "Email", placeholder: "you@email.com", required: "We need an email to confirm" },
      emailInvalid: "Please check this email address",
      groupLabel: "Age group",
      groupOptions: [
        { id: "early", label: "Early Years (3-5)" },
        { id: "elementary", label: "Elementary (6-10)" },
        { id: "middle", label: "Middle School (11-14)" },
      ],
      dateLabel: "Open day",
      dateOptions: [
        { id: "2026-08-15", label: "Saturday, August 15" },
        { id: "2026-09-12", label: "Saturday, September 12" },
        { id: "2026-10-10", label: "Saturday, October 10" },
      ],
      guestsLabel: "Guests attending",
      guestsDecrease: "Fewer guests",
      guestsIncrease: "More guests",
      notesLabel: "Anything we should know?",
      notesPlaceholder: "Allergies, questions, or what your child loves most.",
      submit: "Save my spot",
      submitting: "Saving your spot...",
      successTitle: "Your spot is saved",
      successBody: "We just sent a confirmation with directions and a little welcome guide. See you soon at Brightpath.",
      successAgain: "Book another morning",
    },
  },
  footer: {
    tagline: "A joyful place to grow, wonder, and belong.",
    columns: [
      { title: "School", links: ["Our story", "Programs", "Campus life", "Careers"] },
      { title: "Families", links: ["Admissions", "Tuition & aid", "Calendar", "Parent portal"] },
      { title: "Visit", links: ["Open days", "Book a tour", "Directions", "Contact"] },
    ],
    address: "142 Maple Grove Lane, Riverside, CA 92507",
    hours: "Mon-Fri · 8:00 to 17:30",
    phone: "+1 (951) 555-0182",
    email: "hello@brightpath.school",
    socialLabel: "Follow the fun",
    socials: [
      { kind: "camera", label: "Photo diary" },
      { kind: "at", label: "Newsletter" },
      { kind: "message", label: "Chat with us" },
    ],
    legal: "Brightpath is a concept school designed by VigApp. Not a real institution.",
    newsletterLabel: "Little updates, big joy",
    newsletterPlaceholder: "Your email",
    newsletterCta: "Subscribe",
  },
};

/* ------------------------------------------------------------------ */
/* Portuguese                                                          */
/* ------------------------------------------------------------------ */

const pt: SchoolContent = {
  header: {
    nav: [
      { href: "#programs", label: "Programas" },
      { href: "#day", label: "Um Dia Aqui" },
      { href: "#campus", label: "Vida no Campus" },
      { href: "#teachers", label: "Professores" },
      { href: "#enroll", label: "Matrícula" },
    ],
    cta: "Agende uma visita",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
  },
  hero: {
    eyebrow: "Aprender brincando · 3 a 14 anos",
    titleLead: "Onde a grande",
    titleHighlight: "curiosidade",
    titleTail: "tem espaço para crescer",
    subhead:
      "A Brightpath é uma escola alegre onde as crianças exploram, criam e pensam em voz alta. Turmas pequenas, corações grandes e dias feitos do jeito que as crianças realmente aprendem.",
    ctaPrimary: "Reserve sua vaga",
    ctaSecondary: "Ver os programas",
    imageAlt: "Alunos da Brightpath colaborando em um projeto numa sala colorida",
    badges: [
      { value: "1:8", label: "Proporção por turma" },
      { value: "28", label: "Clubes e ateliês" },
      { value: "97%", label: "Famílias recomendam" },
    ],
    ribbon: "Matrículas abertas para o ano letivo 2026-2027",
  },
  programs: {
    eyebrow: "Programas por idade",
    title: "Um caminho que cresce com a criança",
    intro:
      "Três etapas de aprendizado, uma comunidade acolhedora. Escolha uma faixa etária e veja como o dia, o espaço e os objetivos mudam conforme as crianças crescem.",
    ratioLabel: "Proporção",
    hoursLabel: "Horário",
    tuitionLabel: "Mensalidade",
    highlightsLabel: "O que o dia reserva",
    cta: "Fale sobre esta etapa",
    programs: [
      {
        id: "early",
        tab: "Primeira Infância",
        ages: "3 a 5 anos",
        title: "Ateliê da Primeira Infância",
        blurb:
          "Nossos exploradores mais novos aprendem brincando, ouvindo histórias e descobrindo com os sentidos, em salas cheias de sol que parecem um segundo lar.",
        highlights: [
          "Brincadeira livre guiada e cozinha de lama ao ar livre",
          "Leitura em voz alta e teatro de fantoches todos os dias",
          "Música, movimento e arte para sujar as mãos",
          "Rotinas gentis que constroem autonomia",
        ],
        ratio: "1 professor para 6 crianças",
        hours: "8h30 - 15h, período estendido até 17h30",
        tuition: "R$ 2.290 / mês",
        tuitionNote: "Inclui refeições, lanches e materiais",
        imageAlt: "Crianças pequenas pintando juntas em uma mesa baixa da sala",
      },
      {
        id: "elementary",
        tab: "Fundamental I",
        ages: "6 a 10 anos",
        title: "Vila do Fundamental",
        blurb:
          "Leitura, números e ciências ganham vida por meio de projetos, passeios e perguntas com as quais as crianças realmente se importam.",
        highlights: [
          "Semanas de projeto que atravessam todas as matérias",
          "Oficina de leitura e laboratórios de matemática",
          "Programação, horta e ateliê maker",
          "Assembleia semanal conduzida pelos alunos",
        ],
        ratio: "1 professor para 8 crianças",
        hours: "8h15 - 15h30, clubes até 17h30",
        tuition: "R$ 2.760 / mês",
        tuitionNote: "Inclui almoço, clubes e passeios",
        imageAlt: "Alunos do fundamental estudando em suas carteiras numa sala iluminada",
      },
      {
        id: "middle",
        tab: "Fundamental II",
        ages: "11 a 14 anos",
        title: "Espaço do Fundamental II",
        blurb:
          "Pensamento mais profundo, responsabilidade real e espaço para descobrir quem são — guiados por mentores que os conhecem de verdade.",
        highlights: [
          "Discussões e debates em formato de seminário",
          "Eletivas de design, robótica e cinema",
          "Mentoria e conversas de bem-estar",
          "Exposições conduzidas pelos alunos a cada trimestre",
        ],
        ratio: "1 professor para 10 alunos",
        hours: "8h - 16h, laboratórios até 18h",
        tuition: "R$ 3.140 / mês",
        tuitionNote: "Inclui eletivas, dispositivos e mentoria",
        imageAlt: "Alunos do fundamental II trabalhando com um professor na sala",
      },
    ],
  },
  day: {
    eyebrow: "Um dia na Brightpath",
    title: "Da roda da manhã à hora dourada",
    intro:
      "Nenhum dia é igual ao outro, mas todos têm um ritmo com que as crianças podem contar — equilibrando foco, movimento, encanto e descanso.",
    steps: [
      {
        clock: "08h15",
        title: "Boas-vindas ao nascer do sol",
        detail: "Os professores recebem cada criança pelo nome na porta, e as famílias entram na roda da manhã.",
      },
      {
        clock: "09h",
        title: "Blocos de foco",
        detail: "Leitura, números e linguagem enquanto as mentes estão mais frescas, em pequenos grupos guiados.",
      },
      {
        clock: "10h45",
        title: "Brincar ao ar livre",
        detail: "Escalar, correr e aventuras na cozinha de lama no nosso pátio-jardim com sombra.",
      },
      {
        clock: "12h15",
        title: "Almoço em família",
        detail: "Refeições quentes compartilhadas em mesas longas, com os maiores ajudando os pequenos.",
      },
      {
        clock: "13h30",
        title: "Ateliês de projeto",
        detail: "Projetos práticos de arte, ciência, programação e construção — escolhidos pelas crianças.",
      },
      {
        clock: "15h15",
        title: "Clubes da hora dourada",
        detail: "Coral, xadrez, futebol e jardinagem antes de uma despedida calma e sem pressa.",
      },
    ],
  },
  gallery: {
    eyebrow: "Vida no campus",
    title: "Salas iluminadas, grandes sorrisos, momentos reais",
    intro:
      "Uma espiada nos ateliês, jardins e cantinhos de leitura onde nossos dias acontecem. Toque em qualquer momento para vê-lo de perto.",
    closeLabel: "Fechar o visualizador de imagens",
    prevLabel: "Imagem anterior",
    nextLabel: "Próxima imagem",
    images: [
      {
        id: "photo-1509062522246-3755977927d7",
        alt: "Crianças reunidas em um tapete colorido de sala de aula",
        caption: "Roda da manhã no Ateliê da Primeira Infância",
        tag: "Primeira Infância",
      },
      {
        id: "photo-1503676260728-1c00da094a0b",
        alt: "Duas crianças concentradas em uma atividade prática de aprendizado",
        caption: "Laboratórios de descoberta na Vila do Fundamental",
        tag: "Descoberta",
      },
      {
        id: "photo-1577412647305-991150c7d163",
        alt: "Crianças pintando com cores vivas na escola",
        caption: "Tarde de ateliê aberto na sala de arte",
        tag: "Ateliê de arte",
      },
      {
        id: "photo-1427504494785-3a9ca7044f45",
        alt: "Uma professora lendo com um círculo de crianças atentas",
        caption: "Leitura em voz alta debaixo da árvore das histórias",
        tag: "Hora da história",
      },
      {
        id: "photo-1577896851231-70ef18881754",
        alt: "Crianças felizes brincando juntas na escola",
        caption: "Clubes da hora dourada no pátio-jardim",
        tag: "Clubes",
      },
      {
        id: "photo-1580582932707-520aed937b7b",
        alt: "Fileiras de carteiras iluminadas e organizadas prontas para a aula",
        caption: "O espaço maker, preparado para a semana de projetos",
        tag: "Espaço maker",
      },
    ],
  },
  teachers: {
    eyebrow: "Conheça a equipe",
    title: "Adultos que iluminam o caminho",
    intro:
      "Nossos professores são o coração da Brightpath — curiosos, gentis e incansavelmente pacientes. Aqui estão alguns dos rostos que seu filho vai conhecer de cor.",
    teachers: [
      {
        name: "Marina Alvarez",
        role: "Líder da Primeira Infância",
        subject: "Brincar e alfabetização",
        bio: "Quinze anos transformando mãos sujas e grandes perguntas em amor por aprender.",
        accent: "coral",
      },
      {
        name: "David Okoro",
        role: "Guia do Fundamental",
        subject: "Ciências e maker",
        bio: "Transforma a sala num laboratório onde cada resposta errada é um ótimo recomeço.",
        accent: "accent",
      },
      {
        name: "Beatriz Santos",
        role: "Oficina de Leitura",
        subject: "História e linguagem",
        bio: "Acredita que toda criança é um leitor esperando o livro certo no momento certo.",
        accent: "sun",
      },
      {
        name: "Kenji Tanaka",
        role: "Mentor do Fundamental II",
        subject: "Design e robótica",
        bio: "Orienta jovens criadores a construir, quebrar e reconstruir com curiosidade sem medo.",
        accent: "mint",
      },
    ],
  },
  stats: {
    title: "Uma comunidade que não para de crescer",
    intro: "Dezenove anos de manhãs alegres, e a cada ano um pouco mais brilhantes que o anterior.",
    items: [
      { value: 640, suffix: "", label: "Alunos felizes" },
      { value: 28, suffix: "", label: "Clubes e ateliês" },
      { value: 19, suffix: "", label: "Anos de Brightpath" },
      { value: 97, suffix: "%", label: "Famílias nos recomendam" },
    ],
  },
  enroll: {
    eyebrow: "Faça parte da família",
    title: "Quatro passos gentis até o primeiro dia",
    intro:
      "Matricular deveria ser tão acolhedor quanto a própria escola. Veja como as famílias chegam — e como garantir um lugar na próxima visita.",
    steps: [
      { title: "Diga olá", detail: "Conte sobre sua criança e o que você espera encontrar em uma escola." },
      { title: "Visite a escola", detail: "Passe uma manhã conosco, conheça os professores e veja as salas em movimento." },
      { title: "Conversa em família", detail: "Um bate-papo tranquilo para encaixar sua criança na etapa e no ritmo certos." },
      { title: "Bem-vindos", detail: "Confirme sua vaga e comece a contagem regressiva para um primeiro dia alegre." },
    ],
    formTitle: "Reserve uma visita",
    formIntro: "Escolha uma manhã que combine com sua família. Guardaremos um recebimento caloroso e responderemos tudo.",
    rsvp: {
      parent: { label: "Responsável", placeholder: "ex.: Amara Johnson", required: "Diga-nos seu nome, por favor" },
      child: { label: "Nome da criança", placeholder: "ex.: Noah", required: "Adicione o nome da criança" },
      email: { label: "E-mail", placeholder: "voce@email.com", required: "Precisamos de um e-mail para confirmar" },
      emailInvalid: "Confira este endereço de e-mail",
      groupLabel: "Faixa etária",
      groupOptions: [
        { id: "early", label: "Primeira Infância (3-5)" },
        { id: "elementary", label: "Fundamental I (6-10)" },
        { id: "middle", label: "Fundamental II (11-14)" },
      ],
      dateLabel: "Dia da visita",
      dateOptions: [
        { id: "2026-08-15", label: "Sábado, 15 de agosto" },
        { id: "2026-09-12", label: "Sábado, 12 de setembro" },
        { id: "2026-10-10", label: "Sábado, 10 de outubro" },
      ],
      guestsLabel: "Convidados presentes",
      guestsDecrease: "Menos convidados",
      guestsIncrease: "Mais convidados",
      notesLabel: "Algo que devemos saber?",
      notesPlaceholder: "Alergias, dúvidas ou o que sua criança mais ama.",
      submit: "Garantir minha vaga",
      submitting: "Garantindo sua vaga...",
      successTitle: "Sua vaga está garantida",
      successBody: "Acabamos de enviar uma confirmação com o caminho e um pequeno guia de boas-vindas. Até breve na Brightpath.",
      successAgain: "Reservar outra manhã",
    },
  },
  footer: {
    tagline: "Um lugar alegre para crescer, imaginar e pertencer.",
    columns: [
      { title: "Escola", links: ["Nossa história", "Programas", "Vida no campus", "Trabalhe conosco"] },
      { title: "Famílias", links: ["Admissões", "Mensalidades e bolsas", "Calendário", "Portal dos pais"] },
      { title: "Visite", links: ["Dias abertos", "Agende um tour", "Como chegar", "Contato"] },
    ],
    address: "Rua das Acácias, 142, Jardim Europa, São Paulo - SP",
    hours: "Seg-Sex · 8h às 17h30",
    phone: "+55 (11) 5555-0182",
    email: "ola@brightpath.school",
    socialLabel: "Acompanhe a diversão",
    socials: [
      { kind: "camera", label: "Diário de fotos" },
      { kind: "at", label: "Newsletter" },
      { kind: "message", label: "Fale conosco" },
    ],
    legal: "A Brightpath é uma escola conceito criada pela VigApp. Não é uma instituição real.",
    newsletterLabel: "Pequenas novidades, muita alegria",
    newsletterPlaceholder: "Seu e-mail",
    newsletterCta: "Assinar",
  },
};

/* ------------------------------------------------------------------ */
/* Spanish                                                             */
/* ------------------------------------------------------------------ */

const es: SchoolContent = {
  header: {
    nav: [
      { href: "#programs", label: "Programas" },
      { href: "#day", label: "Un Día Aquí" },
      { href: "#campus", label: "Vida Escolar" },
      { href: "#teachers", label: "Docentes" },
      { href: "#enroll", label: "Matrícula" },
    ],
    cta: "Reserva una visita",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  hero: {
    eyebrow: "Aprender jugando · De 3 a 14 años",
    titleLead: "Donde la gran",
    titleHighlight: "curiosidad",
    titleTail: "encuentra espacio para crecer",
    subhead:
      "Brightpath es una escuela alegre donde los niños exploran, crean y piensan en voz alta. Clases pequeñas, corazones grandes y días diseñados como los niños de verdad aprenden.",
    ctaPrimary: "Reserva tu plaza",
    ctaSecondary: "Ver los programas",
    imageAlt: "Alumnos de Brightpath colaborando en un proyecto en un aula luminosa",
    badges: [
      { value: "1:8", label: "Ratio por clase" },
      { value: "28", label: "Clubes y talleres" },
      { value: "97%", label: "Familias recomiendan" },
    ],
    ribbon: "Matrícula abierta para el curso 2026-2027",
  },
  programs: {
    eyebrow: "Programas por edad",
    title: "Un camino que crece con tu hijo",
    intro:
      "Tres etapas de aprendizaje, una comunidad cálida. Elige un grupo de edad y descubre cómo cambian el día, el espacio y las metas a medida que los niños crecen.",
    ratioLabel: "Ratio",
    hoursLabel: "Horario",
    tuitionLabel: "Cuota",
    highlightsLabel: "Lo que trae el día",
    cta: "Consultar esta etapa",
    programs: [
      {
        id: "early",
        tab: "Infantil",
        ages: "De 3 a 5 años",
        title: "Taller de Infantil",
        blurb:
          "Nuestros exploradores más pequeños aprenden jugando, escuchando cuentos y descubriendo con los sentidos, en aulas llenas de luz que se sienten como un segundo hogar.",
        highlights: [
          "Juego libre guiado y cocina de barro al aire libre",
          "Lectura en voz alta y teatro de títeres cada día",
          "Música, movimiento y arte para mancharse las manos",
          "Rutinas amables que construyen autonomía",
        ],
        ratio: "1 docente por cada 6 niños",
        hours: "8:30 - 15:00, ampliado hasta 17:30",
        tuition: "870 € / mes",
        tuitionNote: "Incluye comidas, meriendas y materiales",
        imageAlt: "Niños pequeños pintando juntos en una mesa baja del aula",
      },
      {
        id: "elementary",
        tab: "Primaria",
        ages: "De 6 a 10 años",
        title: "Aldea de Primaria",
        blurb:
          "La lectura, los números y la ciencia cobran vida con proyectos, salidas y preguntas que de verdad importan a los niños.",
        highlights: [
          "Semanas de proyecto que cruzan todas las materias",
          "Taller de lectura y laboratorios de matemáticas",
          "Programación, huerto y taller maker",
          "Asamblea semanal dirigida por el alumnado",
        ],
        ratio: "1 docente por cada 8 niños",
        hours: "8:15 - 15:30, clubes hasta 17:30",
        tuition: "1.040 € / mes",
        tuitionNote: "Incluye comida, clubes y excursiones",
        imageAlt: "Alumnos de primaria aprendiendo en sus pupitres en un aula luminosa",
      },
      {
        id: "middle",
        tab: "Secundaria",
        ages: "De 11 a 14 años",
        title: "Ágora de Secundaria",
        blurb:
          "Pensamiento más profundo, responsabilidad real y espacio para descubrir quiénes son, guiados por mentores que de verdad los conocen.",
        highlights: [
          "Debate y diálogo en formato seminario",
          "Optativas de diseño, robótica y cine",
          "Tutoría y seguimiento del bienestar",
          "Exposiciones dirigidas por el alumnado cada trimestre",
        ],
        ratio: "1 docente por cada 10 alumnos",
        hours: "8:00 - 16:00, laboratorios hasta 18:00",
        tuition: "1.180 € / mes",
        tuitionNote: "Incluye optativas, dispositivos y tutoría",
        imageAlt: "Alumnos de secundaria trabajando con un docente en clase",
      },
    ],
  },
  day: {
    eyebrow: "Un día en Brightpath",
    title: "Del corro de la mañana a la hora dorada",
    intro:
      "Ningún día es igual a otro, pero todos comparten un ritmo con el que los niños pueden contar, equilibrando concentración, movimiento, asombro y descanso.",
    steps: [
      {
        clock: "08:15",
        title: "Bienvenida al amanecer",
        detail: "Los docentes reciben a cada niño por su nombre en la puerta y las familias entran al corro de la mañana.",
      },
      {
        clock: "09:00",
        title: "Bloques de concentración",
        detail: "Lectura, números y lenguaje cuando las mentes están más frescas, en pequeños grupos guiados.",
      },
      {
        clock: "10:45",
        title: "Juego al aire libre",
        detail: "Trepar, correr y aventuras en la cocina de barro en nuestro patio-jardín con sombra.",
      },
      {
        clock: "12:15",
        title: "Comida en familia",
        detail: "Comidas calientes compartidas en mesas largas, donde los mayores ayudan a los pequeños.",
      },
      {
        clock: "13:30",
        title: "Talleres de proyecto",
        detail: "Proyectos prácticos de arte, ciencia, programación y construcción, elegidos por los niños.",
      },
      {
        clock: "15:15",
        title: "Clubes de la hora dorada",
        detail: "Coro, ajedrez, fútbol y jardinería antes de una despedida tranquila y sin prisas.",
      },
    ],
  },
  gallery: {
    eyebrow: "Vida escolar",
    title: "Aulas luminosas, grandes sonrisas, momentos reales",
    intro:
      "Un vistazo a los talleres, jardines y rincones de lectura donde transcurren nuestros días. Toca cualquier momento para verlo de cerca.",
    closeLabel: "Cerrar el visor de imágenes",
    prevLabel: "Imagen anterior",
    nextLabel: "Imagen siguiente",
    images: [
      {
        id: "photo-1509062522246-3755977927d7",
        alt: "Niños reunidos en una alfombra colorida del aula",
        caption: "Corro de la mañana en el Taller de Infantil",
        tag: "Infantil",
      },
      {
        id: "photo-1503676260728-1c00da094a0b",
        alt: "Dos niños concentrados en una actividad práctica de aprendizaje",
        caption: "Laboratorios de descubrimiento en la Aldea de Primaria",
        tag: "Descubrimiento",
      },
      {
        id: "photo-1577412647305-991150c7d163",
        alt: "Niños pintando con colores vivos en la escuela",
        caption: "Tarde de taller abierto en la sala de arte",
        tag: "Taller de arte",
      },
      {
        id: "photo-1427504494785-3a9ca7044f45",
        alt: "Una docente leyendo con un círculo de niños atentos",
        caption: "Lectura en voz alta bajo el árbol de los cuentos",
        tag: "Cuentacuentos",
      },
      {
        id: "photo-1577896851231-70ef18881754",
        alt: "Niños felices jugando juntos en la escuela",
        caption: "Clubes de la hora dorada en el patio-jardín",
        tag: "Clubes",
      },
      {
        id: "photo-1580582932707-520aed937b7b",
        alt: "Filas de pupitres luminosos y ordenados listos para la clase",
        caption: "El espacio maker, listo para la semana de proyectos",
        tag: "Espacio maker",
      },
    ],
  },
  teachers: {
    eyebrow: "Conoce al equipo",
    title: "Personas que iluminan el camino",
    intro:
      "Nuestros docentes son el corazón de Brightpath: curiosos, amables e infinitamente pacientes. Estos son algunos de los rostros que tu hijo conocerá de memoria.",
    teachers: [
      {
        name: "Marina Alvarez",
        role: "Referente de Infantil",
        subject: "Juego y lectoescritura",
        bio: "Quince años convirtiendo manos con barro y grandes preguntas en amor por aprender.",
        accent: "coral",
      },
      {
        name: "David Okoro",
        role: "Guía de Primaria",
        subject: "Ciencia y maker",
        bio: "Convierte el aula en un laboratorio donde cada respuesta equivocada es un gran nuevo comienzo.",
        accent: "accent",
      },
      {
        name: "Beatriz Santos",
        role: "Taller de Lectura",
        subject: "Cuento y lenguaje",
        bio: "Cree que cada niño es un lector esperando el libro adecuado en el momento justo.",
        accent: "sun",
      },
      {
        name: "Kenji Tanaka",
        role: "Mentor de Secundaria",
        subject: "Diseño y robótica",
        bio: "Guía a jóvenes creadores para construir, romper y reconstruir con curiosidad sin miedo.",
        accent: "mint",
      },
    ],
  },
  stats: {
    title: "Una comunidad que no deja de crecer",
    intro: "Diecinueve años de mañanas alegres, y cada curso un poco más luminoso que el anterior.",
    items: [
      { value: 640, suffix: "", label: "Alumnos felices" },
      { value: 28, suffix: "", label: "Clubes y talleres" },
      { value: 19, suffix: "", label: "Años de Brightpath" },
      { value: 97, suffix: "%", label: "Familias nos recomiendan" },
    ],
  },
  enroll: {
    eyebrow: "Únete a la familia",
    title: "Cuatro pasos amables hasta el primer día",
    intro:
      "Matricularse debería sentirse tan cálido como la propia escuela. Así llegan las familias, y así reservas plaza en nuestra próxima jornada de puertas abiertas.",
    steps: [
      { title: "Di hola", detail: "Cuéntanos sobre tu hijo y qué esperas encontrar en una escuela." },
      { title: "Visita una jornada", detail: "Pasa una mañana con nosotros, conoce a los docentes y ve las aulas en marcha." },
      { title: "Charla en familia", detail: "Una conversación relajada para ajustar a tu hijo a la etapa y el ritmo adecuados." },
      { title: "Bienvenidos", detail: "Confirma tu plaza y empieza la cuenta atrás para un primer día lleno de alegría." },
    ],
    formTitle: "Reserva una jornada de puertas abiertas",
    formIntro: "Elige una mañana que encaje con tu familia. Guardaremos una cálida bienvenida y responderemos a todo.",
    rsvp: {
      parent: { label: "Madre, padre o tutor", placeholder: "ej.: Amara Johnson", required: "Dinos tu nombre, por favor" },
      child: { label: "Nombre del niño", placeholder: "ej.: Noah", required: "Añade el nombre del niño" },
      email: { label: "Correo", placeholder: "tu@correo.com", required: "Necesitamos un correo para confirmar" },
      emailInvalid: "Revisa esta dirección de correo",
      groupLabel: "Grupo de edad",
      groupOptions: [
        { id: "early", label: "Infantil (3-5)" },
        { id: "elementary", label: "Primaria (6-10)" },
        { id: "middle", label: "Secundaria (11-14)" },
      ],
      dateLabel: "Jornada",
      dateOptions: [
        { id: "2026-08-15", label: "Sábado, 15 de agosto" },
        { id: "2026-09-12", label: "Sábado, 12 de septiembre" },
        { id: "2026-10-10", label: "Sábado, 10 de octubre" },
      ],
      guestsLabel: "Acompañantes",
      guestsDecrease: "Menos acompañantes",
      guestsIncrease: "Más acompañantes",
      notesLabel: "¿Algo que debamos saber?",
      notesPlaceholder: "Alergias, dudas o lo que más le gusta a tu hijo.",
      submit: "Reservar mi plaza",
      submitting: "Reservando tu plaza...",
      successTitle: "Tu plaza está reservada",
      successBody: "Acabamos de enviar una confirmación con la ruta y una pequeña guía de bienvenida. Nos vemos pronto en Brightpath.",
      successAgain: "Reservar otra mañana",
    },
  },
  footer: {
    tagline: "Un lugar alegre para crecer, imaginar y pertenecer.",
    columns: [
      { title: "Escuela", links: ["Nuestra historia", "Programas", "Vida escolar", "Empleo"] },
      { title: "Familias", links: ["Admisiones", "Cuotas y becas", "Calendario", "Portal de familias"] },
      { title: "Visita", links: ["Puertas abiertas", "Reserva un tour", "Cómo llegar", "Contacto"] },
    ],
    address: "Calle Olivar 142, Chamberí, 28010 Madrid",
    hours: "Lun-Vie · 8:00 a 17:30",
    phone: "+34 911 55 0182",
    email: "hola@brightpath.school",
    socialLabel: "Sigue la diversión",
    socials: [
      { kind: "camera", label: "Diario de fotos" },
      { kind: "at", label: "Boletín" },
      { kind: "message", label: "Escríbenos" },
    ],
    legal: "Brightpath es una escuela conceptual diseñada por VigApp. No es una institución real.",
    newsletterLabel: "Pequeñas novedades, mucha alegría",
    newsletterPlaceholder: "Tu correo",
    newsletterCta: "Suscribirme",
  },
};

export const schoolDict: DemoDictionary<SchoolContent> = { en, pt, es };
