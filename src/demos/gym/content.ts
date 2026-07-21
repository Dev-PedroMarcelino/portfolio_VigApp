import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface NavLink {
  href: string;
  label: string;
}

export interface NavContent {
  links: NavLink[];
  cta: string;
  openMenu: string;
  closeMenu: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroContent {
  badge: string;
  titleLines: string[];
  sub: string;
  ctaPrimary: string;
  ctaSecondary: string;
  marquee: string[];
  stats: HeroStat[];
  imageAlt: string;
}

export interface Program {
  id: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  intensityLabel: string;
  intensity: number;
  duration: string;
  image: string;
  imageAlt: string;
}

export interface ProgramsContent {
  label: string;
  title: string;
  intro: string;
  intensityCaption: string;
  durationCaption: string;
  items: Program[];
}

export interface ScheduleSession {
  time: string;
  className: string;
  coach: string;
  spots: number;
  tag: string;
}

export interface ScheduleDay {
  id: string;
  short: string;
  long: string;
}

export interface ScheduleContent {
  label: string;
  title: string;
  intro: string;
  colTime: string;
  colClass: string;
  colCoach: string;
  colSpots: string;
  spotsLeft: string;
  full: string;
  restTitle: string;
  restBody: string;
  days: ScheduleDay[];
  sessions: Record<string, ScheduleSession[]>;
}

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  monthly: number;
  annualPerMonth: number;
  features: string[];
  featured: boolean;
}

export interface MembershipContent {
  label: string;
  title: string;
  intro: string;
  monthlyLabel: string;
  annualLabel: string;
  saveBadge: string;
  perMonth: string;
  billedMonthly: string;
  billedAnnually: string;
  cta: string;
  featuredBadge: string;
  currency: string;
  numberLocale: string;
  plans: Plan[];
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  specialty: string;
  stat: string;
  statLabel: string;
  image: string;
  imageAlt: string;
}

export interface TrainersContent {
  label: string;
  title: string;
  intro: string;
  items: Trainer[];
}

export interface StatCounter {
  value: number;
  suffix: string;
  label: string;
}

export interface StatsContent {
  label: string;
  title: string;
  intro: string;
  counters: StatCounter[];
}

export interface CalculatorZone {
  pct: number;
  label: string;
}

export interface CalculatorContent {
  label: string;
  title: string;
  intro: string;
  weightLabel: string;
  repsLabel: string;
  unit: string;
  estimateLabel: string;
  estimateUnit: string;
  formulaNote: string;
  zonesTitle: string;
  zones: CalculatorZone[];
  repHint: string;
}

export interface JoinContent {
  label: string;
  title: string;
  sub: string;
  offer: string;
  ctaPrimary: string;
  ctaSecondary: string;
  countdownLabel: string;
  units: { days: string; hours: string; minutes: string; seconds: string };
}

export interface FooterColumn {
  title: string;
  links: string[];
}

export type SocialKind = "at" | "camera" | "share" | "message" | "globe";

export interface FooterContent {
  tagline: string;
  columns: FooterColumn[];
  locationTitle: string;
  address: string;
  hoursTitle: string;
  hours: string[];
  contactTitle: string;
  phone: string;
  email: string;
  social: { label: string; kind: SocialKind }[];
  legal: string;
}

export interface GymContent {
  nav: NavContent;
  hero: HeroContent;
  programs: ProgramsContent;
  schedule: ScheduleContent;
  membership: MembershipContent;
  trainers: TrainersContent;
  stats: StatsContent;
  calculator: CalculatorContent;
  join: JoinContent;
  footer: FooterContent;
}

/* ------------------------------------------------------------------ */
/* Image sources                                                       */
/* ------------------------------------------------------------------ */

const IMG = {
  floor: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80",
  athlete: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
  barbell: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1200&q=80",
  athlete2: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
  training: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80",
  dumbbells: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=1200&q=80",
  outdoor: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=80",
};

/* ------------------------------------------------------------------ */
/* English                                                             */
/* ------------------------------------------------------------------ */

const en: GymContent = {
  nav: {
    links: [
      { href: "#programs", label: "Programs" },
      { href: "#schedule", label: "Schedule" },
      { href: "#membership", label: "Membership" },
      { href: "#coaches", label: "Coaches" },
      { href: "#lab", label: "1RM Lab" },
    ],
    cta: "Start free trial",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    badge: "Downtown performance gym",
    titleLines: ["Train", "like it", "matters"],
    sub: "Forge Athletic is a blackout strength floor built for people who show up. Barbells, sleds, sandbags and coaches who count every rep with you.",
    ctaPrimary: "Claim 7 free days",
    ctaSecondary: "Tour the floor",
    marquee: ["Strength", "Hyrox", "Mobility", "Boxing", "Conditioning", "Community"],
    stats: [
      { value: "2,400", label: "Members strong" },
      { value: "38", label: "Classes weekly" },
      { value: "12", label: "Certified coaches" },
    ],
    imageAlt: "Athlete mid-set on the Forge Athletic strength floor",
  },
  programs: {
    label: "The programs",
    title: "Pick your arena",
    intro: "Four disciplines, one blackout floor. Cross-train across all of them on any membership tier.",
    intensityCaption: "Intensity",
    durationCaption: "Session",
    items: [
      {
        id: "strength",
        index: "01",
        name: "Strength",
        tagline: "Build the base",
        description: "Barbell-first blocks in squat, hinge, press and pull. Linear and undulating cycles programmed by your coach.",
        intensityLabel: "High",
        intensity: 4,
        duration: "60 min",
        image: IMG.barbell,
        imageAlt: "Loaded barbell on the platform",
      },
      {
        id: "hyrox",
        index: "02",
        name: "Hyrox",
        tagline: "Race ready",
        description: "Run, ski, sled, burpee, carry. Race-simulation conditioning that turns the whole floor into a start line.",
        intensityLabel: "Brutal",
        intensity: 5,
        duration: "50 min",
        image: IMG.training,
        imageAlt: "Athlete pushing through a conditioning circuit",
      },
      {
        id: "mobility",
        index: "03",
        name: "Mobility",
        tagline: "Move clean",
        description: "Loaded stretching, breathwork and joint prep. The unglamorous work that keeps you lifting for decades.",
        intensityLabel: "Low",
        intensity: 2,
        duration: "45 min",
        image: IMG.outdoor,
        imageAlt: "Athlete in a controlled mobility position",
      },
      {
        id: "boxing",
        index: "04",
        name: "Boxing",
        tagline: "Hit back",
        description: "Footwork, combinations and bag rounds. Technical striking that doubles as the best conditioning in the building.",
        intensityLabel: "High",
        intensity: 4,
        duration: "55 min",
        image: IMG.athlete,
        imageAlt: "Boxer working combinations",
      },
    ],
  },
  schedule: {
    label: "This week",
    title: "The schedule",
    intro: "Tap a day to see what is running. Reserve any slot from the app once you are a member.",
    colTime: "Time",
    colClass: "Class",
    colCoach: "Coach",
    colSpots: "Spots",
    spotsLeft: "left",
    full: "Full",
    restTitle: "Active recovery",
    restBody: "Sunday is open-floor recovery. Sauna, mobility mats and coached breathwork from 09:00 to 13:00.",
    days: [
      { id: "mon", short: "Mon", long: "Monday" },
      { id: "tue", short: "Tue", long: "Tuesday" },
      { id: "wed", short: "Wed", long: "Wednesday" },
      { id: "thu", short: "Thu", long: "Thursday" },
      { id: "fri", short: "Fri", long: "Friday" },
      { id: "sat", short: "Sat", long: "Saturday" },
      { id: "sun", short: "Sun", long: "Sunday" },
    ],
    sessions: {
      mon: [
        { time: "06:00", className: "Strength — Lower", coach: "Marcus Rel", spots: 3, tag: "Strength" },
        { time: "12:15", className: "Hyrox Sim", coach: "Priya Nandi", spots: 0, tag: "Hyrox" },
        { time: "18:30", className: "Boxing Fundamentals", coach: "Diego Fontana", spots: 6, tag: "Boxing" },
        { time: "19:45", className: "Mobility Reset", coach: "Lena Duarte", spots: 9, tag: "Mobility" },
      ],
      tue: [
        { time: "06:30", className: "Strength — Upper", coach: "Amara Okoye", spots: 2, tag: "Strength" },
        { time: "12:15", className: "Conditioning WOD", coach: "Marcus Rel", spots: 4, tag: "Hyrox" },
        { time: "18:00", className: "Boxing Sparring", coach: "Diego Fontana", spots: 0, tag: "Boxing" },
        { time: "19:30", className: "Mobility Reset", coach: "Lena Duarte", spots: 11, tag: "Mobility" },
      ],
      wed: [
        { time: "06:00", className: "Strength — Total", coach: "Priya Nandi", spots: 5, tag: "Strength" },
        { time: "12:15", className: "Hyrox Sim", coach: "Amara Okoye", spots: 1, tag: "Hyrox" },
        { time: "18:30", className: "Boxing Technical", coach: "Diego Fontana", spots: 3, tag: "Boxing" },
        { time: "20:00", className: "Breath & Recover", coach: "Lena Duarte", spots: 14, tag: "Mobility" },
      ],
      thu: [
        { time: "06:30", className: "Strength — Lower", coach: "Marcus Rel", spots: 0, tag: "Strength" },
        { time: "12:15", className: "Conditioning WOD", coach: "Priya Nandi", spots: 7, tag: "Hyrox" },
        { time: "18:00", className: "Boxing Fundamentals", coach: "Amara Okoye", spots: 4, tag: "Boxing" },
        { time: "19:30", className: "Mobility Reset", coach: "Lena Duarte", spots: 10, tag: "Mobility" },
      ],
      fri: [
        { time: "06:00", className: "Strength — Upper", coach: "Amara Okoye", spots: 6, tag: "Strength" },
        { time: "12:15", className: "Hyrox Sim", coach: "Marcus Rel", spots: 2, tag: "Hyrox" },
        { time: "17:30", className: "Boxing Sparring", coach: "Diego Fontana", spots: 0, tag: "Boxing" },
        { time: "18:45", className: "Mobility Reset", coach: "Lena Duarte", spots: 12, tag: "Mobility" },
      ],
      sat: [
        { time: "08:00", className: "Partner Hyrox", coach: "Priya Nandi", spots: 8, tag: "Hyrox" },
        { time: "09:30", className: "Strength — Total", coach: "Marcus Rel", spots: 3, tag: "Strength" },
        { time: "11:00", className: "Open Sparring", coach: "Diego Fontana", spots: 5, tag: "Boxing" },
      ],
      sun: [],
    },
  },
  membership: {
    label: "Memberships",
    title: "Commit to something",
    intro: "No lock-in beyond your term. Freeze any plan for up to eight weeks a year, no questions asked.",
    monthlyLabel: "Monthly",
    annualLabel: "Annual",
    saveBadge: "Save 20%",
    perMonth: "/mo",
    billedMonthly: "Billed monthly, cancel anytime",
    billedAnnually: "Billed annually",
    cta: "Choose plan",
    featuredBadge: "Most picked",
    currency: "$",
    numberLocale: "en-US",
    plans: [
      {
        id: "drop",
        name: "Off-Peak",
        tagline: "Train the quiet hours",
        monthly: 89,
        annualPerMonth: 71,
        features: [
          "Access 06:00 to 16:00 weekdays",
          "All group classes off-peak",
          "Open-floor weekends",
          "Forge app programming",
        ],
        featured: false,
      },
      {
        id: "full",
        name: "All-Access",
        tagline: "The whole building, all day",
        monthly: 139,
        annualPerMonth: 111,
        features: [
          "Unlimited 24/7 floor access",
          "Every class, every time slot",
          "One monthly coach check-in",
          "Recovery lounge and sauna",
          "Bring a guest twice a month",
        ],
        featured: true,
      },
      {
        id: "perf",
        name: "Performance",
        tagline: "Coached like an athlete",
        monthly: 219,
        annualPerMonth: 175,
        features: [
          "Everything in All-Access",
          "Weekly 1-on-1 coaching",
          "Custom strength programming",
          "Body-composition scans quarterly",
          "Priority class reservations",
        ],
        featured: false,
      },
    ],
  },
  trainers: {
    label: "The coaches",
    title: "Who counts your reps",
    intro: "Twelve full-time coaches on staff. These four lead the floor most days of the week.",
    items: [
      {
        id: "marcus",
        name: "Marcus Rel",
        role: "Head of Strength",
        specialty: "Powerlifting · Olympic lifting",
        stat: "245kg",
        statLabel: "Coached deadlift PR",
        image: IMG.athlete2,
        imageAlt: "Head strength coach Marcus Rel",
      },
      {
        id: "priya",
        name: "Priya Nandi",
        role: "Hyrox Lead",
        specialty: "Endurance · Race prep",
        stat: "9x",
        statLabel: "Hyrox finishes coached",
        image: IMG.training,
        imageAlt: "Hyrox lead coach Priya Nandi",
      },
      {
        id: "diego",
        name: "Diego Fontana",
        role: "Boxing Coach",
        specialty: "Striking · Footwork",
        stat: "14-2",
        statLabel: "Amateur record",
        image: IMG.athlete,
        imageAlt: "Boxing coach Diego Fontana",
      },
      {
        id: "lena",
        name: "Lena Duarte",
        role: "Mobility & Recovery",
        specialty: "Movement · Breathwork",
        stat: "500+",
        statLabel: "Athletes rehabbed",
        image: IMG.outdoor,
        imageAlt: "Mobility coach Lena Duarte",
      },
    ],
  },
  stats: {
    label: "The receipts",
    title: "Numbers that moved",
    intro: "Twelve months of member outcomes, tracked in the Forge app and verified at quarterly check-ins.",
    counters: [
      { value: 61200, suffix: "kg", label: "Total added to member PRs" },
      { value: 94, suffix: "%", label: "Members hitting weekly goals" },
      { value: 3800, suffix: "", label: "Classes coached this year" },
      { value: 18, suffix: "min", label: "Average Hyrox time cut" },
    ],
  },
  calculator: {
    label: "1RM Lab",
    title: "Find your ceiling",
    intro: "Enter a set you have actually hit. We estimate your one-rep max and map your training percentages.",
    weightLabel: "Weight lifted",
    repsLabel: "Reps completed",
    unit: "kg",
    estimateLabel: "Estimated 1RM",
    estimateUnit: "kg",
    formulaNote: "Epley formula. Best accuracy between 2 and 10 reps.",
    zonesTitle: "Your training zones",
    zones: [
      { pct: 95, label: "Peak strength" },
      { pct: 85, label: "Strength" },
      { pct: 75, label: "Hypertrophy" },
      { pct: 65, label: "Volume" },
      { pct: 50, label: "Speed / technique" },
    ],
    repHint: "reps",
  },
  join: {
    label: "Join the floor",
    title: "Your first week is on us",
    sub: "Seven days, every class, every coach, zero card required. Founders pricing for the Riverside floor locks on the last day of the year.",
    offer: "Founders pricing ends in",
    ctaPrimary: "Start my free week",
    ctaSecondary: "Book a floor tour",
    countdownLabel: "Offer closes",
    units: { days: "Days", hours: "Hours", minutes: "Min", seconds: "Sec" },
  },
  footer: {
    tagline: "A blackout strength floor for people who show up.",
    columns: [
      { title: "Train", links: ["Strength", "Hyrox", "Mobility", "Boxing"] },
      { title: "Gym", links: ["Memberships", "Coaches", "Schedule", "1RM Lab"] },
      { title: "More", links: ["Corporate", "Careers", "Gift passes", "Press"] },
    ],
    locationTitle: "Find us",
    address: "148 Riverside Works, Portland, OR 97209",
    hoursTitle: "Floor hours",
    hours: ["Mon–Fri · 05:00 – 23:00", "Saturday · 07:00 – 20:00", "Sunday · 09:00 – 13:00"],
    contactTitle: "Talk to us",
    phone: "+1 (503) 555-0164",
    email: "floor@forgeathletic.co",
    social: [
      { label: "Instagram", kind: "camera" },
      { label: "Threads", kind: "at" },
      { label: "WhatsApp", kind: "message" },
      { label: "forgeathletic.co", kind: "globe" },
    ],
    legal: "Forge Athletic is a fictional brand built as a concept by VigApp.",
  },
};

/* ------------------------------------------------------------------ */
/* Portuguese                                                          */
/* ------------------------------------------------------------------ */

const pt: GymContent = {
  nav: {
    links: [
      { href: "#programs", label: "Programas" },
      { href: "#schedule", label: "Horários" },
      { href: "#membership", label: "Planos" },
      { href: "#coaches", label: "Treinadores" },
      { href: "#lab", label: "Lab 1RM" },
    ],
    cta: "Testar de graça",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
  },
  hero: {
    badge: "Box de performance no centro",
    titleLines: ["Treine", "como se", "importasse"],
    sub: "A Forge Athletic é um salão de força blackout feito para quem aparece. Barras, trenós, sacos e treinadores que contam cada repetição com você.",
    ctaPrimary: "Quero 7 dias grátis",
    ctaSecondary: "Conheça o espaço",
    marquee: ["Força", "Hyrox", "Mobilidade", "Boxe", "Condicionamento", "Comunidade"],
    stats: [
      { value: "2.400", label: "Alunos ativos" },
      { value: "38", label: "Aulas por semana" },
      { value: "12", label: "Treinadores certificados" },
    ],
    imageAlt: "Atleta no meio da série no salão de força da Forge Athletic",
  },
  programs: {
    label: "Os programas",
    title: "Escolha sua arena",
    intro: "Quatro disciplinas, um só salão blackout. Combine todas em qualquer plano de assinatura.",
    intensityCaption: "Intensidade",
    durationCaption: "Sessão",
    items: [
      {
        id: "strength",
        index: "01",
        name: "Força",
        tagline: "Construa a base",
        description: "Blocos com barra em agachamento, levantamento, empurrar e puxar. Ciclos programados pelo seu treinador.",
        intensityLabel: "Alta",
        intensity: 4,
        duration: "60 min",
        image: IMG.barbell,
        imageAlt: "Barra carregada na plataforma",
      },
      {
        id: "hyrox",
        index: "02",
        name: "Hyrox",
        tagline: "Pronto pra prova",
        description: "Corrida, ski, trenó, burpee, carregamento. Condicionamento em simulação de prova que vira o salão numa linha de largada.",
        intensityLabel: "Brutal",
        intensity: 5,
        duration: "50 min",
        image: IMG.training,
        imageAlt: "Atleta atravessando um circuito de condicionamento",
      },
      {
        id: "mobility",
        index: "03",
        name: "Mobilidade",
        tagline: "Movimento limpo",
        description: "Alongamento com carga, respiração e preparo articular. O trabalho sem glamour que mantém você levantando por décadas.",
        intensityLabel: "Baixa",
        intensity: 2,
        duration: "45 min",
        image: IMG.outdoor,
        imageAlt: "Atleta numa posição controlada de mobilidade",
      },
      {
        id: "boxing",
        index: "04",
        name: "Boxe",
        tagline: "Devolva o golpe",
        description: "Trabalho de pés, combinações e rounds no saco. Técnica de golpe que também é o melhor condicionamento do prédio.",
        intensityLabel: "Alta",
        intensity: 4,
        duration: "55 min",
        image: IMG.athlete,
        imageAlt: "Boxeador treinando combinações",
      },
    ],
  },
  schedule: {
    label: "Esta semana",
    title: "A grade",
    intro: "Toque num dia para ver o que está rolando. Reserve qualquer horário pelo app quando for aluno.",
    colTime: "Hora",
    colClass: "Aula",
    colCoach: "Treinador",
    colSpots: "Vagas",
    spotsLeft: "restam",
    full: "Lotado",
    restTitle: "Recuperação ativa",
    restBody: "Domingo é salão aberto para recuperação. Sauna, tapetes de mobilidade e respiração guiada das 09h às 13h.",
    days: [
      { id: "mon", short: "Seg", long: "Segunda" },
      { id: "tue", short: "Ter", long: "Terça" },
      { id: "wed", short: "Qua", long: "Quarta" },
      { id: "thu", short: "Qui", long: "Quinta" },
      { id: "fri", short: "Sex", long: "Sexta" },
      { id: "sat", short: "Sáb", long: "Sábado" },
      { id: "sun", short: "Dom", long: "Domingo" },
    ],
    sessions: {
      mon: [
        { time: "06:00", className: "Força — Inferior", coach: "Marcus Rel", spots: 3, tag: "Força" },
        { time: "12:15", className: "Simulado Hyrox", coach: "Priya Nandi", spots: 0, tag: "Hyrox" },
        { time: "18:30", className: "Boxe Fundamentos", coach: "Diego Fontana", spots: 6, tag: "Boxe" },
        { time: "19:45", className: "Reset de Mobilidade", coach: "Lena Duarte", spots: 9, tag: "Mobilidade" },
      ],
      tue: [
        { time: "06:30", className: "Força — Superior", coach: "Amara Okoye", spots: 2, tag: "Força" },
        { time: "12:15", className: "Condicionamento", coach: "Marcus Rel", spots: 4, tag: "Hyrox" },
        { time: "18:00", className: "Boxe Sparring", coach: "Diego Fontana", spots: 0, tag: "Boxe" },
        { time: "19:30", className: "Reset de Mobilidade", coach: "Lena Duarte", spots: 11, tag: "Mobilidade" },
      ],
      wed: [
        { time: "06:00", className: "Força — Total", coach: "Priya Nandi", spots: 5, tag: "Força" },
        { time: "12:15", className: "Simulado Hyrox", coach: "Amara Okoye", spots: 1, tag: "Hyrox" },
        { time: "18:30", className: "Boxe Técnico", coach: "Diego Fontana", spots: 3, tag: "Boxe" },
        { time: "20:00", className: "Respirar & Recuperar", coach: "Lena Duarte", spots: 14, tag: "Mobilidade" },
      ],
      thu: [
        { time: "06:30", className: "Força — Inferior", coach: "Marcus Rel", spots: 0, tag: "Força" },
        { time: "12:15", className: "Condicionamento", coach: "Priya Nandi", spots: 7, tag: "Hyrox" },
        { time: "18:00", className: "Boxe Fundamentos", coach: "Amara Okoye", spots: 4, tag: "Boxe" },
        { time: "19:30", className: "Reset de Mobilidade", coach: "Lena Duarte", spots: 10, tag: "Mobilidade" },
      ],
      fri: [
        { time: "06:00", className: "Força — Superior", coach: "Amara Okoye", spots: 6, tag: "Força" },
        { time: "12:15", className: "Simulado Hyrox", coach: "Marcus Rel", spots: 2, tag: "Hyrox" },
        { time: "17:30", className: "Boxe Sparring", coach: "Diego Fontana", spots: 0, tag: "Boxe" },
        { time: "18:45", className: "Reset de Mobilidade", coach: "Lena Duarte", spots: 12, tag: "Mobilidade" },
      ],
      sat: [
        { time: "08:00", className: "Hyrox em Dupla", coach: "Priya Nandi", spots: 8, tag: "Hyrox" },
        { time: "09:30", className: "Força — Total", coach: "Marcus Rel", spots: 3, tag: "Força" },
        { time: "11:00", className: "Sparring Aberto", coach: "Diego Fontana", spots: 5, tag: "Boxe" },
      ],
      sun: [],
    },
  },
  membership: {
    label: "Planos",
    title: "Assuma um compromisso",
    intro: "Sem fidelidade além do seu período. Congele qualquer plano por até oito semanas por ano, sem burocracia.",
    monthlyLabel: "Mensal",
    annualLabel: "Anual",
    saveBadge: "Economize 20%",
    perMonth: "/mês",
    billedMonthly: "Cobrado por mês, cancele quando quiser",
    billedAnnually: "Cobrado anualmente",
    cta: "Escolher plano",
    featuredBadge: "Mais escolhido",
    currency: "R$",
    numberLocale: "pt-BR",
    plans: [
      {
        id: "drop",
        name: "Fora de Pico",
        tagline: "Treine nas horas calmas",
        monthly: 149,
        annualPerMonth: 119,
        features: [
          "Acesso 06h às 16h nos dias úteis",
          "Todas as aulas fora de pico",
          "Salão aberto nos fins de semana",
          "Programação pelo app Forge",
        ],
        featured: false,
      },
      {
        id: "full",
        name: "Acesso Total",
        tagline: "O prédio inteiro, o dia todo",
        monthly: 229,
        annualPerMonth: 183,
        features: [
          "Acesso 24h ao salão, sem limite",
          "Todas as aulas, todos os horários",
          "Um check-in mensal com treinador",
          "Lounge de recuperação e sauna",
          "Traga um convidado 2x por mês",
        ],
        featured: true,
      },
      {
        id: "perf",
        name: "Performance",
        tagline: "Treinado como atleta",
        monthly: 369,
        annualPerMonth: 295,
        features: [
          "Tudo do Acesso Total",
          "Consultoria 1 a 1 toda semana",
          "Programação de força sob medida",
          "Avaliação de composição a cada trimestre",
          "Reserva de aulas com prioridade",
        ],
        featured: false,
      },
    ],
  },
  trainers: {
    label: "Os treinadores",
    title: "Quem conta suas repetições",
    intro: "Doze treinadores em tempo integral no time. Estes quatro comandam o salão na maioria dos dias.",
    items: [
      {
        id: "marcus",
        name: "Marcus Rel",
        role: "Chefe de Força",
        specialty: "Powerlifting · Levantamento olímpico",
        stat: "245kg",
        statLabel: "Recorde de terra treinado",
        image: IMG.athlete2,
        imageAlt: "Treinador chefe de força Marcus Rel",
      },
      {
        id: "priya",
        name: "Priya Nandi",
        role: "Líder de Hyrox",
        specialty: "Resistência · Prova",
        stat: "9x",
        statLabel: "Provas de Hyrox treinadas",
        image: IMG.training,
        imageAlt: "Treinadora líder de Hyrox Priya Nandi",
      },
      {
        id: "diego",
        name: "Diego Fontana",
        role: "Treinador de Boxe",
        specialty: "Golpes · Trabalho de pés",
        stat: "14-2",
        statLabel: "Cartel amador",
        image: IMG.athlete,
        imageAlt: "Treinador de boxe Diego Fontana",
      },
      {
        id: "lena",
        name: "Lena Duarte",
        role: "Mobilidade & Recuperação",
        specialty: "Movimento · Respiração",
        stat: "500+",
        statLabel: "Atletas reabilitados",
        image: IMG.outdoor,
        imageAlt: "Treinadora de mobilidade Lena Duarte",
      },
    ],
  },
  stats: {
    label: "As provas",
    title: "Números que se moveram",
    intro: "Doze meses de resultados dos alunos, registrados no app Forge e conferidos nos check-ins trimestrais.",
    counters: [
      { value: 61200, suffix: "kg", label: "Somados aos recordes dos alunos" },
      { value: 94, suffix: "%", label: "Alunos batendo metas semanais" },
      { value: 3800, suffix: "", label: "Aulas ministradas no ano" },
      { value: 18, suffix: "min", label: "Tempo médio cortado no Hyrox" },
    ],
  },
  calculator: {
    label: "Lab 1RM",
    title: "Ache seu teto",
    intro: "Digite uma série que você realmente fez. Estimamos seu máximo de uma repetição e mapeamos suas porcentagens de treino.",
    weightLabel: "Peso levantado",
    repsLabel: "Repetições feitas",
    unit: "kg",
    estimateLabel: "1RM estimado",
    estimateUnit: "kg",
    formulaNote: "Fórmula de Epley. Melhor precisão entre 2 e 10 repetições.",
    zonesTitle: "Suas zonas de treino",
    zones: [
      { pct: 95, label: "Força máxima" },
      { pct: 85, label: "Força" },
      { pct: 75, label: "Hipertrofia" },
      { pct: 65, label: "Volume" },
      { pct: 50, label: "Velocidade / técnica" },
    ],
    repHint: "reps",
  },
  join: {
    label: "Entre no salão",
    title: "A primeira semana é por nossa conta",
    sub: "Sete dias, todas as aulas, todos os treinadores, sem cartão. O preço de fundador do salão Riverside encerra no último dia do ano.",
    offer: "Preço de fundador acaba em",
    ctaPrimary: "Começar minha semana grátis",
    ctaSecondary: "Agendar visita ao salão",
    countdownLabel: "A oferta encerra",
    units: { days: "Dias", hours: "Horas", minutes: "Min", seconds: "Seg" },
  },
  footer: {
    tagline: "Um salão de força blackout para quem aparece.",
    columns: [
      { title: "Treinar", links: ["Força", "Hyrox", "Mobilidade", "Boxe"] },
      { title: "Box", links: ["Planos", "Treinadores", "Horários", "Lab 1RM"] },
      { title: "Mais", links: ["Corporativo", "Carreiras", "Vale-presente", "Imprensa"] },
    ],
    locationTitle: "Onde estamos",
    address: "148 Riverside Works, Portland, OR 97209",
    hoursTitle: "Horário do salão",
    hours: ["Seg–Sex · 05h – 23h", "Sábado · 07h – 20h", "Domingo · 09h – 13h"],
    contactTitle: "Fale com a gente",
    phone: "+1 (503) 555-0164",
    email: "floor@forgeathletic.co",
    social: [
      { label: "Instagram", kind: "camera" },
      { label: "Threads", kind: "at" },
      { label: "WhatsApp", kind: "message" },
      { label: "forgeathletic.co", kind: "globe" },
    ],
    legal: "Forge Athletic é uma marca fictícia criada como conceito pela VigApp.",
  },
};

/* ------------------------------------------------------------------ */
/* Spanish                                                             */
/* ------------------------------------------------------------------ */

const es: GymContent = {
  nav: {
    links: [
      { href: "#programs", label: "Programas" },
      { href: "#schedule", label: "Horarios" },
      { href: "#membership", label: "Planes" },
      { href: "#coaches", label: "Entrenadores" },
      { href: "#lab", label: "Lab 1RM" },
    ],
    cta: "Prueba gratis",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  hero: {
    badge: "Gimnasio de rendimiento en el centro",
    titleLines: ["Entrena", "como si", "importara"],
    sub: "Forge Athletic es una sala de fuerza en negro total para quien se presenta. Barras, trineos, sacos y entrenadores que cuentan cada repetición contigo.",
    ctaPrimary: "Quiero 7 días gratis",
    ctaSecondary: "Recorre la sala",
    marquee: ["Fuerza", "Hyrox", "Movilidad", "Boxeo", "Acondicionamiento", "Comunidad"],
    stats: [
      { value: "2.400", label: "Socios activos" },
      { value: "38", label: "Clases por semana" },
      { value: "12", label: "Entrenadores certificados" },
    ],
    imageAlt: "Atleta a mitad de serie en la sala de fuerza de Forge Athletic",
  },
  programs: {
    label: "Los programas",
    title: "Elige tu arena",
    intro: "Cuatro disciplinas, una sola sala en negro total. Combínalas todas con cualquier plan de socio.",
    intensityCaption: "Intensidad",
    durationCaption: "Sesión",
    items: [
      {
        id: "strength",
        index: "01",
        name: "Fuerza",
        tagline: "Construye la base",
        description: "Bloques con barra en sentadilla, bisagra, empuje y tracción. Ciclos programados por tu entrenador.",
        intensityLabel: "Alta",
        intensity: 4,
        duration: "60 min",
        image: IMG.barbell,
        imageAlt: "Barra cargada en la plataforma",
      },
      {
        id: "hyrox",
        index: "02",
        name: "Hyrox",
        tagline: "Listo para competir",
        description: "Correr, ski, trineo, burpee, carga. Acondicionamiento de simulación que convierte la sala en una línea de salida.",
        intensityLabel: "Brutal",
        intensity: 5,
        duration: "50 min",
        image: IMG.training,
        imageAlt: "Atleta atravesando un circuito de acondicionamiento",
      },
      {
        id: "mobility",
        index: "03",
        name: "Movilidad",
        tagline: "Muévete limpio",
        description: "Estiramiento con carga, respiración y preparación articular. El trabajo sin glamour que te mantiene levantando durante décadas.",
        intensityLabel: "Baja",
        intensity: 2,
        duration: "45 min",
        image: IMG.outdoor,
        imageAlt: "Atleta en una posición controlada de movilidad",
      },
      {
        id: "boxing",
        index: "04",
        name: "Boxeo",
        tagline: "Devuelve el golpe",
        description: "Juego de pies, combinaciones y rounds al saco. Técnica de golpeo que además es el mejor acondicionamiento del edificio.",
        intensityLabel: "Alta",
        intensity: 4,
        duration: "55 min",
        image: IMG.athlete,
        imageAlt: "Boxeador trabajando combinaciones",
      },
    ],
  },
  schedule: {
    label: "Esta semana",
    title: "El calendario",
    intro: "Toca un día para ver qué hay. Reserva cualquier turno desde la app cuando seas socio.",
    colTime: "Hora",
    colClass: "Clase",
    colCoach: "Entrenador",
    colSpots: "Plazas",
    spotsLeft: "libres",
    full: "Completo",
    restTitle: "Recuperación activa",
    restBody: "El domingo es sala abierta para recuperar. Sauna, colchonetas de movilidad y respiración guiada de 09:00 a 13:00.",
    days: [
      { id: "mon", short: "Lun", long: "Lunes" },
      { id: "tue", short: "Mar", long: "Martes" },
      { id: "wed", short: "Mié", long: "Miércoles" },
      { id: "thu", short: "Jue", long: "Jueves" },
      { id: "fri", short: "Vie", long: "Viernes" },
      { id: "sat", short: "Sáb", long: "Sábado" },
      { id: "sun", short: "Dom", long: "Domingo" },
    ],
    sessions: {
      mon: [
        { time: "06:00", className: "Fuerza — Inferior", coach: "Marcus Rel", spots: 3, tag: "Fuerza" },
        { time: "12:15", className: "Simulacro Hyrox", coach: "Priya Nandi", spots: 0, tag: "Hyrox" },
        { time: "18:30", className: "Boxeo Fundamentos", coach: "Diego Fontana", spots: 6, tag: "Boxeo" },
        { time: "19:45", className: "Reset de Movilidad", coach: "Lena Duarte", spots: 9, tag: "Movilidad" },
      ],
      tue: [
        { time: "06:30", className: "Fuerza — Superior", coach: "Amara Okoye", spots: 2, tag: "Fuerza" },
        { time: "12:15", className: "Acondicionamiento", coach: "Marcus Rel", spots: 4, tag: "Hyrox" },
        { time: "18:00", className: "Boxeo Sparring", coach: "Diego Fontana", spots: 0, tag: "Boxeo" },
        { time: "19:30", className: "Reset de Movilidad", coach: "Lena Duarte", spots: 11, tag: "Movilidad" },
      ],
      wed: [
        { time: "06:00", className: "Fuerza — Total", coach: "Priya Nandi", spots: 5, tag: "Fuerza" },
        { time: "12:15", className: "Simulacro Hyrox", coach: "Amara Okoye", spots: 1, tag: "Hyrox" },
        { time: "18:30", className: "Boxeo Técnico", coach: "Diego Fontana", spots: 3, tag: "Boxeo" },
        { time: "20:00", className: "Respira & Recupera", coach: "Lena Duarte", spots: 14, tag: "Movilidad" },
      ],
      thu: [
        { time: "06:30", className: "Fuerza — Inferior", coach: "Marcus Rel", spots: 0, tag: "Fuerza" },
        { time: "12:15", className: "Acondicionamiento", coach: "Priya Nandi", spots: 7, tag: "Hyrox" },
        { time: "18:00", className: "Boxeo Fundamentos", coach: "Amara Okoye", spots: 4, tag: "Boxeo" },
        { time: "19:30", className: "Reset de Movilidad", coach: "Lena Duarte", spots: 10, tag: "Movilidad" },
      ],
      fri: [
        { time: "06:00", className: "Fuerza — Superior", coach: "Amara Okoye", spots: 6, tag: "Fuerza" },
        { time: "12:15", className: "Simulacro Hyrox", coach: "Marcus Rel", spots: 2, tag: "Hyrox" },
        { time: "17:30", className: "Boxeo Sparring", coach: "Diego Fontana", spots: 0, tag: "Boxeo" },
        { time: "18:45", className: "Reset de Movilidad", coach: "Lena Duarte", spots: 12, tag: "Movilidad" },
      ],
      sat: [
        { time: "08:00", className: "Hyrox en Pareja", coach: "Priya Nandi", spots: 8, tag: "Hyrox" },
        { time: "09:30", className: "Fuerza — Total", coach: "Marcus Rel", spots: 3, tag: "Fuerza" },
        { time: "11:00", className: "Sparring Abierto", coach: "Diego Fontana", spots: 5, tag: "Boxeo" },
      ],
      sun: [],
    },
  },
  membership: {
    label: "Planes",
    title: "Comprométete con algo",
    intro: "Sin permanencia más allá de tu período. Congela cualquier plan hasta ocho semanas al año, sin preguntas.",
    monthlyLabel: "Mensual",
    annualLabel: "Anual",
    saveBadge: "Ahorra 20%",
    perMonth: "/mes",
    billedMonthly: "Cobro mensual, cancela cuando quieras",
    billedAnnually: "Cobro anual",
    cta: "Elegir plan",
    featuredBadge: "El más elegido",
    currency: "€",
    numberLocale: "es-ES",
    plans: [
      {
        id: "drop",
        name: "Fuera de Pico",
        tagline: "Entrena en las horas tranquilas",
        monthly: 79,
        annualPerMonth: 63,
        features: [
          "Acceso 06:00 a 16:00 entre semana",
          "Todas las clases fuera de pico",
          "Sala abierta los fines de semana",
          "Programación en la app Forge",
        ],
        featured: false,
      },
      {
        id: "full",
        name: "Acceso Total",
        tagline: "Todo el edificio, todo el día",
        monthly: 119,
        annualPerMonth: 95,
        features: [
          "Acceso 24/7 a la sala, sin límite",
          "Todas las clases, todos los turnos",
          "Un check-in mensual con entrenador",
          "Sala de recuperación y sauna",
          "Trae un invitado dos veces al mes",
        ],
        featured: true,
      },
      {
        id: "perf",
        name: "Rendimiento",
        tagline: "Entrenado como atleta",
        monthly: 189,
        annualPerMonth: 151,
        features: [
          "Todo lo de Acceso Total",
          "Sesión 1 a 1 cada semana",
          "Programación de fuerza a medida",
          "Análisis de composición cada trimestre",
          "Reserva de clases prioritaria",
        ],
        featured: false,
      },
    ],
  },
  trainers: {
    label: "Los entrenadores",
    title: "Quién cuenta tus repeticiones",
    intro: "Doce entrenadores a tiempo completo en plantilla. Estos cuatro dirigen la sala la mayoría de los días.",
    items: [
      {
        id: "marcus",
        name: "Marcus Rel",
        role: "Jefe de Fuerza",
        specialty: "Powerlifting · Halterofilia",
        stat: "245kg",
        statLabel: "Récord de peso muerto entrenado",
        image: IMG.athlete2,
        imageAlt: "Entrenador jefe de fuerza Marcus Rel",
      },
      {
        id: "priya",
        name: "Priya Nandi",
        role: "Líder de Hyrox",
        specialty: "Resistencia · Competición",
        stat: "9x",
        statLabel: "Hyrox entrenados",
        image: IMG.training,
        imageAlt: "Entrenadora líder de Hyrox Priya Nandi",
      },
      {
        id: "diego",
        name: "Diego Fontana",
        role: "Entrenador de Boxeo",
        specialty: "Golpeo · Juego de pies",
        stat: "14-2",
        statLabel: "Récord amateur",
        image: IMG.athlete,
        imageAlt: "Entrenador de boxeo Diego Fontana",
      },
      {
        id: "lena",
        name: "Lena Duarte",
        role: "Movilidad y Recuperación",
        specialty: "Movimiento · Respiración",
        stat: "500+",
        statLabel: "Atletas rehabilitados",
        image: IMG.outdoor,
        imageAlt: "Entrenadora de movilidad Lena Duarte",
      },
    ],
  },
  stats: {
    label: "Las pruebas",
    title: "Números que se movieron",
    intro: "Doce meses de resultados de socios, registrados en la app Forge y verificados en los check-ins trimestrales.",
    counters: [
      { value: 61200, suffix: "kg", label: "Sumados a los récords de socios" },
      { value: 94, suffix: "%", label: "Socios cumpliendo metas semanales" },
      { value: 3800, suffix: "", label: "Clases impartidas este año" },
      { value: 18, suffix: "min", label: "Tiempo medio recortado en Hyrox" },
    ],
  },
  calculator: {
    label: "Lab 1RM",
    title: "Encuentra tu techo",
    intro: "Introduce una serie que hayas hecho de verdad. Estimamos tu máximo de una repetición y trazamos tus porcentajes de entrenamiento.",
    weightLabel: "Peso levantado",
    repsLabel: "Repeticiones hechas",
    unit: "kg",
    estimateLabel: "1RM estimado",
    estimateUnit: "kg",
    formulaNote: "Fórmula de Epley. Mayor precisión entre 2 y 10 repeticiones.",
    zonesTitle: "Tus zonas de entrenamiento",
    zones: [
      { pct: 95, label: "Fuerza máxima" },
      { pct: 85, label: "Fuerza" },
      { pct: 75, label: "Hipertrofia" },
      { pct: 65, label: "Volumen" },
      { pct: 50, label: "Velocidad / técnica" },
    ],
    repHint: "reps",
  },
  join: {
    label: "Únete a la sala",
    title: "Tu primera semana corre por nuestra cuenta",
    sub: "Siete días, todas las clases, todos los entrenadores, sin tarjeta. El precio fundador de la sala Riverside se cierra el último día del año.",
    offer: "El precio fundador termina en",
    ctaPrimary: "Empezar mi semana gratis",
    ctaSecondary: "Reservar visita a la sala",
    countdownLabel: "La oferta cierra",
    units: { days: "Días", hours: "Horas", minutes: "Min", seconds: "Seg" },
  },
  footer: {
    tagline: "Una sala de fuerza en negro total para quien se presenta.",
    columns: [
      { title: "Entrenar", links: ["Fuerza", "Hyrox", "Movilidad", "Boxeo"] },
      { title: "Gimnasio", links: ["Planes", "Entrenadores", "Horarios", "Lab 1RM"] },
      { title: "Más", links: ["Empresas", "Empleo", "Pases regalo", "Prensa"] },
    ],
    locationTitle: "Encuéntranos",
    address: "148 Riverside Works, Portland, OR 97209",
    hoursTitle: "Horario de sala",
    hours: ["Lun–Vie · 05:00 – 23:00", "Sábado · 07:00 – 20:00", "Domingo · 09:00 – 13:00"],
    contactTitle: "Habla con nosotros",
    phone: "+1 (503) 555-0164",
    email: "floor@forgeathletic.co",
    social: [
      { label: "Instagram", kind: "camera" },
      { label: "Threads", kind: "at" },
      { label: "WhatsApp", kind: "message" },
      { label: "forgeathletic.co", kind: "globe" },
    ],
    legal: "Forge Athletic es una marca ficticia creada como concepto por VigApp.",
  },
};

export const gymDict: DemoDictionary<GymContent> = { en, pt, es };
