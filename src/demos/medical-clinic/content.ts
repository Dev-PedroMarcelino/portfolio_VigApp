import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type SpecialtyId =
  | "cardiology"
  | "dermatology"
  | "pediatrics"
  | "orthopedics"
  | "gynecology"
  | "nutrition";

/** Cross-section booking intent raised by hero / specialty / doctor cards. */
export interface BookingRequest {
  specialty: SpecialtyId | null;
  doctorId: string | null;
  token: number;
}

export interface SpecialtyItem {
  id: SpecialtyId;
  name: string;
  blurb: string;
  chips: string[];
}

export interface Doctor {
  id: string;
  name: string;
  specialty: SpecialtyId;
  role: string;
  focus: string;
  languages: string;
  rating: string;
  reviews: number;
  next: string;
}

export interface HeaderContent {
  nav: { href: string; label: string }[];
  cta: string;
  openMenu: string;
  closeMenu: string;
}

export interface HeroContent {
  badge: string;
  titleTop: string;
  titleItalic: string;
  titleEnd: string;
  sub: string;
  primaryCta: string;
  secondaryCta: string;
  stats: { value: string; label: string }[];
  imageAlt: string;
  chipTitle: string;
  chipSub: string;
  cardTitle: string;
  cardSpecialtyLabel: string;
  cardHint: string;
  cardCta: string;
}

export interface SpecialtiesContent {
  label: string;
  title: string;
  accent: string;
  intro: string;
  bookLabel: string;
  items: SpecialtyItem[];
}

export interface DoctorsContent {
  label: string;
  title: string;
  accent: string;
  intro: string;
  allLabel: string;
  bookLabel: string;
  nextLabel: string;
  reviewsLabel: string;
  doctors: Doctor[];
}

export interface JourneyContent {
  label: string;
  title: string;
  accent: string;
  intro: string;
  imageAlt: string;
  badgeValue: string;
  badgeLabel: string;
  steps: { title: string; body: string }[];
}

export interface PlanItem {
  id: string;
  name: string;
  blurb: string;
  price: number;
  features: string[];
  popular?: boolean;
}

export interface PlansContent {
  label: string;
  title: string;
  accent: string;
  intro: string;
  currency: string;
  priceLocale: string;
  perMonth: string;
  popularTag: string;
  choose: string;
  chosen: string;
  plans: PlanItem[];
  insurersTitle: string;
  insurers: string[];
  insurersNote: string;
}

export interface TestimonialsContent {
  label: string;
  title: string;
  accent: string;
  prevLabel: string;
  nextLabel: string;
  goTo: string;
  items: { quote: string; name: string; meta: string }[];
}

export interface FaqContent {
  label: string;
  title: string;
  accent: string;
  intro: string;
  imageAlt: string;
  items: { q: string; a: string }[];
}

export interface BookingDay {
  id: string;
  weekday: string;
  date: string;
}

export interface BookingContent {
  label: string;
  title: string;
  accent: string;
  intro: string;
  stepNames: string[];
  stepOf: string;
  back: string;
  chooseSpecialty: string;
  chooseDoctor: string;
  chooseTime: string;
  dayLabel: string;
  slotLabel: string;
  days: BookingDay[];
  slots: string[];
  unavailable: string;
  summaryLabel: string;
  withLabel: string;
  atLabel: string;
  confirmCta: string;
  note: string;
  confirmedTitle: string;
  confirmedBody: string;
  protocolLabel: string;
  rebook: string;
}

export interface ContactContent {
  title: string;
  accent: string;
  addressLabel: string;
  addressLines: string[];
  phoneLabel: string;
  phone: string;
  emailLabel: string;
  email: string;
  hoursLabel: string;
  hours: { days: string; time: string }[];
  emergency: string;
  imageAlt: string;
}

export interface FooterContent {
  blurb: string;
  columns: { title: string; links: { label: string; href: string }[] }[];
  socialLabel: string;
  social: { id: "site" | "mail" | "chat"; label: string }[];
  legalNote: string;
  director: string;
  rights: string;
}

export interface AuroraContent {
  header: HeaderContent;
  hero: HeroContent;
  specialties: SpecialtiesContent;
  doctors: DoctorsContent;
  journey: JourneyContent;
  plans: PlansContent;
  testimonials: TestimonialsContent;
  faq: FaqContent;
  booking: BookingContent;
  contact: ContactContent;
  footer: FooterContent;
}

/* ------------------------------------------------------------------ */
/* Dictionary                                                          */
/* ------------------------------------------------------------------ */

export const auroraDict: DemoDictionary<AuroraContent> = {
  en: {
    header: {
      nav: [
        { href: "#specialties", label: "Specialties" },
        { href: "#doctors", label: "Doctors" },
        { href: "#journey", label: "How it works" },
        { href: "#plans", label: "Plans" },
        { href: "#faq", label: "FAQ" },
      ],
      cta: "Book appointment",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      badge: "Welcoming new patients in Vila Mariana",
      titleTop: "Care that begins",
      titleItalic: "by listening",
      titleEnd: ".",
      sub: "Aurora Health is a neighborhood clinic with hospital-grade medicine: unhurried consultations, same-week availability and a team that greets you by name.",
      primaryCta: "Book an appointment",
      secondaryCta: "Meet our doctors",
      stats: [
        { value: "25k+", label: "patients cared for" },
        { value: "4.9", label: "average rating" },
        { value: "14", label: "specialties in-house" },
      ],
      imageAlt: "A doctor and a patient sharing a calm conversation in a sunlit consultation room",
      chipTitle: "Next opening today",
      chipSub: "Dr. Helena Barbosa · 4:40 PM",
      cardTitle: "Book a visit in seconds",
      cardSpecialtyLabel: "Specialty",
      cardHint: "Free cancellation up to 24h before",
      cardCta: "Choose date and doctor",
    },
    specialties: {
      label: "Specialties",
      title: "Care for",
      accent: "every chapter of life",
      intro: "Fourteen specialties under one calm roof — these are the ones our patients visit most.",
      bookLabel: "Book this specialty",
      items: [
        {
          id: "cardiology",
          name: "Cardiology",
          blurb: "From prevention to rehab — echo, stress tests and risk assessment without leaving the building.",
          chips: ["Echo", "ECG", "Holter"],
        },
        {
          id: "dermatology",
          name: "Dermatology",
          blurb: "Clinical and surgical dermatology, full-body mapping and honest, gentle aesthetic guidance.",
          chips: ["Mapping", "Cryotherapy", "Biopsy"],
        },
        {
          id: "pediatrics",
          name: "Pediatrics",
          blurb: "Growth tracking, vaccines on schedule and a waiting room your kids will actually enjoy.",
          chips: ["Well-child", "Vaccines", "Nutrition"],
        },
        {
          id: "orthopedics",
          name: "Orthopedics",
          blurb: "Joints, spine and sports medicine — focused on getting you moving again, surgery as a last resort.",
          chips: ["Spine", "Knee", "Shoulder"],
        },
        {
          id: "gynecology",
          name: "Gynecology",
          blurb: "Respectful, evidence-based care for every stage, from a first visit to menopause.",
          chips: ["Prevention", "Prenatal", "Menopause"],
        },
        {
          id: "nutrition",
          name: "Nutrition",
          blurb: "Food plans built around your real routine — no guilt, no crash diets, just steady progress.",
          chips: ["Meal plans", "Metabolics", "Follow-up"],
        },
      ],
    },
    doctors: {
      label: "Our team",
      title: "Doctors who",
      accent: "know your name",
      intro: "Specialists hired for their medicine and kept for their kindness. Filter by what you need today.",
      allLabel: "All specialties",
      bookLabel: "Book",
      nextLabel: "Next opening",
      reviewsLabel: "reviews",
      doctors: [
        { id: "helena", name: "Dr. Helena Barbosa", specialty: "cardiology", role: "Cardiologist · Clinical director", focus: "Preventive cardiology and women’s heart health", languages: "PT · EN", rating: "4.9", reviews: 212, next: "Today · 4:40 PM" },
        { id: "okamoto", name: "Dr. Rafael Okamoto", specialty: "cardiology", role: "Cardiologist", focus: "Sports cardiology and arrhythmia care", languages: "PT · EN · JP", rating: "4.8", reviews: 167, next: "Tomorrow · 9:15 AM" },
        { id: "amara", name: "Dr. Amara Diallo", specialty: "dermatology", role: "Dermatologist", focus: "Skin of color and pediatric dermatology", languages: "EN · FR · PT", rating: "5.0", reviews: 189, next: "Mon · 10:00 AM" },
        { id: "sofia", name: "Dr. Sofia Ferreira", specialty: "pediatrics", role: "Pediatrician", focus: "Newborn care and childhood asthma", languages: "PT · ES", rating: "4.9", reviews: 324, next: "Today · 5:20 PM" },
        { id: "lucas", name: "Dr. Lucas Andrade", specialty: "pediatrics", role: "Pediatrician", focus: "Child development and behavioral follow-up", languages: "PT · EN", rating: "4.8", reviews: 142, next: "Wed · 8:30 AM" },
        { id: "mateus", name: "Dr. Mateus Rocha", specialty: "orthopedics", role: "Orthopedic surgeon", focus: "Knees, running injuries and recovery plans", languages: "PT · EN", rating: "4.9", reviews: 201, next: "Tue · 2:00 PM" },
        { id: "priya", name: "Dr. Priya Raghavan", specialty: "gynecology", role: "OB-GYN", focus: "Low-intervention prenatal care", languages: "EN · PT", rating: "5.0", reviews: 178, next: "Tomorrow · 11:30 AM" },
        { id: "cohen", name: "Dr. Daniel Cohen", specialty: "nutrition", role: "Clinical nutritionist", focus: "Metabolic health and sports nutrition", languages: "EN · ES · PT", rating: "4.7", reviews: 96, next: "Fri · 3:15 PM" },
      ],
    },
    journey: {
      label: "Your visit",
      title: "Four steps,",
      accent: "no friction",
      intro: "From booking to follow-up, the journey is designed to lower your shoulders — not your patience.",
      imageAlt: "A physician calmly reviewing results with a patient on a tablet",
      badgeValue: "9 min",
      badgeLabel: "average wait",
      steps: [
        {
          title: "Tell us what you need",
          body: "Book online in under two minutes — pick a specialty, a doctor you like and a time that fits your week.",
        },
        {
          title: "Arrive and breathe",
          body: "Check in from your phone and settle into the lounge; our average wait is under nine minutes.",
        },
        {
          title: "A consultation with room to talk",
          body: "Visits are scheduled in 40-minute blocks, so your questions never get cut short.",
        },
        {
          title: "Care that follows you home",
          body: "Results, prescriptions and a clear next step land in your inbox — and your doctor stays one message away.",
        },
      ],
    },
    plans: {
      label: "Plans and insurance",
      title: "Unhurried care,",
      accent: "within reach",
      intro: "Simple memberships that make calm medicine affordable — cancel anytime, no fine print.",
      currency: "USD",
      priceLocale: "en-US",
      perMonth: "/month",
      popularTag: "Most chosen",
      choose: "Choose plan",
      chosen: "Selected",
      plans: [
        {
          id: "essential",
          name: "Aurora Essential",
          blurb: "Everyday care for one.",
          price: 29,
          features: [
            "Unlimited primary-care visits",
            "Video consultations, 7 days a week",
            "Member pricing on labs and imaging",
            "Care team on chat, 8:00 AM to 10:00 PM",
          ],
        },
        {
          id: "family",
          name: "Aurora Family",
          blurb: "One plan, the whole household.",
          price: 79,
          popular: true,
          features: [
            "Everything in Essential",
            "Covers up to 4 people in your home",
            "Pediatrics and OB-GYN included",
            "One full annual check-up per person",
          ],
        },
        {
          id: "premium",
          name: "Aurora Premium",
          blurb: "Complete care, zero queues.",
          price: 129,
          features: [
            "Everything in Family",
            "All 14 specialties, zero copay",
            "Executive check-up with cardiology",
            "Priority same-day appointments",
          ],
        },
      ],
      insurersTitle: "We also welcome major insurance plans",
      insurers: ["Vitalis Seguros", "MedNova", "UnionCare", "Alba Salud", "PrimeLife", "Continental Assist"],
      insurersNote: "Direct billing available — bring your card and we handle the paperwork at the front desk.",
    },
    testimonials: {
      label: "Patient stories",
      title: "Words from",
      accent: "our waiting room",
      prevLabel: "Previous testimonial",
      nextLabel: "Next testimonial",
      goTo: "Show testimonial",
      items: [
        {
          quote: "I came in for a routine check-up and stayed for good. It is the first clinic where I have never felt like a number.",
          name: "Mariana Duarte",
          meta: "Patient since 2023",
        },
        {
          quote: "Dr. Sofia treats my daughter as if she were her own. Booking takes a minute and we have never waited more than ten.",
          name: "Carla and Antônio Menezes",
          meta: "Parents of Alice, age 4",
        },
        {
          quote: "After my bypass surgery, the follow-up plan from Aurora kept me confident week after week.",
          name: "Jorge Almeida",
          meta: "Cardiac rehabilitation patient",
        },
        {
          quote: "I dread clinics, but the calm here is disarming. Even the lighting feels kind.",
          name: "Beatriz Nakamura",
          meta: "Patient since 2024",
        },
      ],
    },
    faq: {
      label: "FAQ",
      title: "Before you",
      accent: "come in",
      intro: "Straight answers to the questions we hear most at the front desk.",
      imageAlt: "The bright, plant-filled reception of the Aurora Health clinic",
      items: [
        {
          q: "Do I need a membership to book a visit?",
          a: "No. Anyone can book a single appointment at standard prices — memberships simply unlock lower rates, priority slots and the care chat.",
        },
        {
          q: "Which insurance plans do you accept?",
          a: "We bill Vitalis Seguros, MedNova, UnionCare, Alba Salud, PrimeLife and Continental Assist directly. Bring your card and we sort the paperwork at reception.",
        },
        {
          q: "Can I cancel or reschedule?",
          a: "Yes — free of charge up to 24 hours before your slot, straight from the confirmation email or the Aurora app. After that we ask for a small courtesy fee.",
        },
        {
          q: "Do you offer video consultations?",
          a: "Most specialties offer video slots seven days a week. Your doctor will always tell you when an in-person exam is genuinely needed.",
        },
        {
          q: "How do I get there, and is there parking?",
          a: "We are a four-minute walk from Vila Mariana station, and we validate parking at the EcoPark garage next door.",
        },
      ],
    },
    booking: {
      label: "Book a visit",
      title: "Your next appointment, in",
      accent: "three gentle steps",
      intro: "No phone queues and no forms in triplicate — choose what you need, who you trust and when it suits you.",
      stepNames: ["Specialty", "Doctor", "Date and time", "Confirmed"],
      stepOf: "Step {current} of {total}",
      back: "Back",
      chooseSpecialty: "What kind of care do you need today?",
      chooseDoctor: "Choose who you would like to see",
      chooseTime: "Pick a moment that fits your week",
      dayLabel: "Day",
      slotLabel: "Available times",
      days: [
        { id: "d1", weekday: "Mon", date: "Jul 20" },
        { id: "d2", weekday: "Tue", date: "Jul 21" },
        { id: "d3", weekday: "Wed", date: "Jul 22" },
        { id: "d4", weekday: "Thu", date: "Jul 23" },
        { id: "d5", weekday: "Fri", date: "Jul 24" },
      ],
      slots: ["8:30 AM", "9:15 AM", "10:00 AM", "11:30 AM", "2:00 PM", "3:15 PM", "4:45 PM"],
      unavailable: "Unavailable",
      summaryLabel: "Your visit",
      withLabel: "with",
      atLabel: "at",
      confirmCta: "Confirm appointment",
      note: "Free cancellation up to 24 hours before your visit.",
      confirmedTitle: "See you soon",
      confirmedBody: "Your appointment is confirmed and your doctor has been notified. Directions, preparation notes and a calendar invite are on their way to your inbox.",
      protocolLabel: "Booking code",
      rebook: "Book another visit",
    },
    contact: {
      title: "Find us in",
      accent: "Vila Mariana",
      addressLabel: "Address",
      addressLines: ["Rua Domingos de Morais 2187", "Vila Mariana · São Paulo, SP"],
      phoneLabel: "Phone and WhatsApp",
      phone: "+55 11 4002-8922",
      emailLabel: "Email",
      email: "hello@aurorahealth.clinic",
      hoursLabel: "Opening hours",
      hours: [
        { days: "Mon – Fri", time: "7:00 AM – 8:00 PM" },
        { days: "Saturday", time: "8:00 AM – 2:00 PM" },
      ],
      emergency: "Aurora Health is not an emergency room. If this is urgent, call 192 (SAMU) or go to the nearest ER.",
      imageAlt: "A doctor reassuring a patient with a gentle gesture during a consultation",
    },
    footer: {
      blurb: "Human medicine, unhurried by design. A neighborhood clinic in São Paulo caring for 25,000 patients and counting.",
      columns: [
        {
          title: "Clinic",
          links: [
            { label: "Specialties", href: "#specialties" },
            { label: "Doctors", href: "#doctors" },
            { label: "Membership plans", href: "#plans" },
            { label: "FAQ", href: "#faq" },
          ],
        },
        {
          title: "Patients",
          links: [
            { label: "Book a visit", href: "#booking" },
            { label: "Your journey", href: "#journey" },
            { label: "Patient stories", href: "#stories" },
            { label: "Contact", href: "#contact" },
          ],
        },
      ],
      socialLabel: "Follow Aurora Health",
      social: [
        { id: "site", label: "Website" },
        { id: "mail", label: "Email" },
        { id: "chat", label: "WhatsApp" },
      ],
      legalNote: "Aurora Health is a fictional clinic concept designed by VigApp. Medical registrations shown are illustrative.",
      director: "Technical director: Dr. Helena Barbosa · CRM-SP 187.442",
      rights: "© 2026 Aurora Health. All rights reserved.",
    },
  },

  pt: {
    header: {
      nav: [
        { href: "#specialties", label: "Especialidades" },
        { href: "#doctors", label: "Corpo clínico" },
        { href: "#journey", label: "Como funciona" },
        { href: "#plans", label: "Planos" },
        { href: "#faq", label: "Dúvidas" },
      ],
      cta: "Agendar consulta",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
    },
    hero: {
      badge: "Recebendo novos pacientes na Vila Mariana",
      titleTop: "O cuidado começa",
      titleItalic: "pela escuta",
      titleEnd: ".",
      sub: "A Aurora Health é uma clínica de bairro com medicina de excelência: consultas sem pressa, agenda na mesma semana e uma equipe que sabe o seu nome.",
      primaryCta: "Agendar consulta",
      secondaryCta: "Conhecer os médicos",
      stats: [
        { value: "25 mil+", label: "pacientes acompanhados" },
        { value: "4,9", label: "avaliação média" },
        { value: "14", label: "especialidades no local" },
      ],
      imageAlt: "Médica e paciente conversando com calma em um consultório iluminado",
      chipTitle: "Próxima vaga hoje",
      chipSub: "Dra. Helena Barbosa · 16h40",
      cardTitle: "Agende em poucos toques",
      cardSpecialtyLabel: "Especialidade",
      cardHint: "Cancelamento gratuito até 24h antes",
      cardCta: "Escolher data e médico",
    },
    specialties: {
      label: "Especialidades",
      title: "Cuidado para",
      accent: "cada fase da vida",
      intro: "Catorze especialidades sob o mesmo teto tranquilo — estas são as mais procuradas pelos pacientes.",
      bookLabel: "Agendar esta especialidade",
      items: [
        {
          id: "cardiology",
          name: "Cardiologia",
          blurb: "Da prevenção à reabilitação — eco, teste ergométrico e avaliação de risco sem sair do prédio.",
          chips: ["Eco", "ECG", "Holter"],
        },
        {
          id: "dermatology",
          name: "Dermatologia",
          blurb: "Dermatologia clínica e cirúrgica, mapeamento corporal e orientação estética honesta e gentil.",
          chips: ["Mapeamento", "Crioterapia", "Biópsia"],
        },
        {
          id: "pediatrics",
          name: "Pediatria",
          blurb: "Acompanhamento do crescimento, vacinas em dia e uma sala de espera que as crianças adoram.",
          chips: ["Puericultura", "Vacinas", "Nutrição"],
        },
        {
          id: "orthopedics",
          name: "Ortopedia",
          blurb: "Articulações, coluna e medicina esportiva — o foco é você voltar a se mover; cirurgia é o último recurso.",
          chips: ["Coluna", "Joelho", "Ombro"],
        },
        {
          id: "gynecology",
          name: "Ginecologia",
          blurb: "Cuidado respeitoso e baseado em evidências para todas as fases, da primeira consulta à menopausa.",
          chips: ["Prevenção", "Pré-natal", "Menopausa"],
        },
        {
          id: "nutrition",
          name: "Nutrição",
          blurb: "Planos alimentares construídos em torno da sua rotina real — sem culpa e sem dieta radical.",
          chips: ["Plano alimentar", "Metabolismo", "Acompanhamento"],
        },
      ],
    },
    doctors: {
      label: "Corpo clínico",
      title: "Médicos que",
      accent: "sabem seu nome",
      intro: "Especialistas contratados pela medicina e queridos pela gentileza. Filtre pelo que você precisa hoje.",
      allLabel: "Todas as especialidades",
      bookLabel: "Agendar",
      nextLabel: "Próxima vaga",
      reviewsLabel: "avaliações",
      doctors: [
        { id: "helena", name: "Dra. Helena Barbosa", specialty: "cardiology", role: "Cardiologista · Diretora clínica", focus: "Cardiologia preventiva e saúde do coração da mulher", languages: "PT · EN", rating: "4,9", reviews: 212, next: "Hoje · 16h40" },
        { id: "okamoto", name: "Dr. Rafael Okamoto", specialty: "cardiology", role: "Cardiologista", focus: "Cardiologia do esporte e arritmias", languages: "PT · EN · JP", rating: "4,8", reviews: 167, next: "Amanhã · 9h15" },
        { id: "amara", name: "Dra. Amara Diallo", specialty: "dermatology", role: "Dermatologista", focus: "Pele negra e dermatologia pediátrica", languages: "EN · FR · PT", rating: "5,0", reviews: 189, next: "seg · 10h00" },
        { id: "sofia", name: "Dra. Sofia Ferreira", specialty: "pediatrics", role: "Pediatra", focus: "Recém-nascidos e asma infantil", languages: "PT · ES", rating: "4,9", reviews: 324, next: "Hoje · 17h20" },
        { id: "lucas", name: "Dr. Lucas Andrade", specialty: "pediatrics", role: "Pediatra", focus: "Desenvolvimento infantil e acompanhamento comportamental", languages: "PT · EN", rating: "4,8", reviews: 142, next: "qua · 8h30" },
        { id: "mateus", name: "Dr. Mateus Rocha", specialty: "orthopedics", role: "Cirurgião ortopedista", focus: "Joelho, lesões de corrida e planos de recuperação", languages: "PT · EN", rating: "4,9", reviews: 201, next: "ter · 14h00" },
        { id: "priya", name: "Dra. Priya Raghavan", specialty: "gynecology", role: "Ginecologista e obstetra", focus: "Pré-natal de baixa intervenção", languages: "EN · PT", rating: "5,0", reviews: 178, next: "Amanhã · 11h30" },
        { id: "cohen", name: "Dr. Daniel Cohen", specialty: "nutrition", role: "Nutricionista clínico", focus: "Saúde metabólica e nutrição esportiva", languages: "EN · ES · PT", rating: "4,7", reviews: 96, next: "sex · 15h15" },
      ],
    },
    journey: {
      label: "Sua visita",
      title: "Quatro passos,",
      accent: "nenhum atrito",
      intro: "Do agendamento ao pós-consulta, a jornada foi desenhada para relaxar os ombros — não a sua paciência.",
      imageAlt: "Médico revisando resultados com paciente em um tablet, com calma",
      badgeValue: "9 min",
      badgeLabel: "espera média",
      steps: [
        {
          title: "Conte o que você precisa",
          body: "Agende online em menos de dois minutos — escolha a especialidade, o médico e um horário que caiba na sua semana.",
        },
        {
          title: "Chegue e respire",
          body: "Faça o check-in pelo celular e acomode-se no lounge; nossa espera média é de menos de nove minutos.",
        },
        {
          title: "Consulta com tempo de sobra",
          body: "Os atendimentos são marcados em blocos de 40 minutos para que nenhuma pergunta fique sem resposta.",
        },
        {
          title: "O cuidado vai com você",
          body: "Resultados, receitas e o próximo passo chegam no seu e-mail — e seu médico continua a uma mensagem de distância.",
        },
      ],
    },
    plans: {
      label: "Planos e convênios",
      title: "Cuidado sem pressa,",
      accent: "ao seu alcance",
      intro: "Assinaturas simples que tornam a medicina calma acessível — cancele quando quiser, sem letras miúdas.",
      currency: "BRL",
      priceLocale: "pt-BR",
      perMonth: "/mês",
      popularTag: "Mais escolhido",
      choose: "Escolher plano",
      chosen: "Selecionado",
      plans: [
        {
          id: "essential",
          name: "Aurora Essencial",
          blurb: "O dia a dia de uma pessoa.",
          price: 89,
          features: [
            "Consultas ilimitadas com clínico geral",
            "Teleconsultas 7 dias por semana",
            "Preço de sócio em exames e imagem",
            "Equipe de cuidado no chat, das 8h às 22h",
          ],
        },
        {
          id: "family",
          name: "Aurora Família",
          blurb: "Um plano, a casa inteira.",
          price: 199,
          popular: true,
          features: [
            "Tudo do Essencial",
            "Cobre até 4 pessoas da sua casa",
            "Pediatria e ginecologia incluídas",
            "Check-up anual completo por pessoa",
          ],
        },
        {
          id: "premium",
          name: "Aurora Premium",
          blurb: "Cuidado completo, fila zero.",
          price: 329,
          features: [
            "Tudo do Família",
            "As 14 especialidades, sem coparticipação",
            "Check-up executivo com cardiologia",
            "Prioridade em vagas no mesmo dia",
          ],
        },
      ],
      insurersTitle: "Também atendemos os principais convênios",
      insurers: ["Vitalis Seguros", "MedNova", "UnionCare", "Alba Salud", "PrimeLife", "Continental Assist"],
      insurersNote: "Faturamento direto — traga sua carteirinha e cuidamos da papelada na recepção.",
    },
    testimonials: {
      label: "Histórias de pacientes",
      title: "Palavras da",
      accent: "nossa sala de espera",
      prevLabel: "Depoimento anterior",
      nextLabel: "Próximo depoimento",
      goTo: "Mostrar depoimento",
      items: [
        {
          quote: "Vim para um check-up de rotina e fiquei de vez. É a primeira clínica onde nunca me senti um número.",
          name: "Mariana Duarte",
          meta: "Paciente desde 2023",
        },
        {
          quote: "A Dra. Sofia cuida da minha filha como se fosse dela. Agendar leva um minuto e nunca esperamos mais de dez.",
          name: "Carla e Antônio Menezes",
          meta: "Pais da Alice, 4 anos",
        },
        {
          quote: "Depois da minha ponte de safena, o acompanhamento da Aurora me deu confiança semana após semana.",
          name: "Jorge Almeida",
          meta: "Paciente de reabilitação cardíaca",
        },
        {
          quote: "Tenho pavor de clínica, mas a calma daqui desarma. Até a iluminação parece gentil.",
          name: "Beatriz Nakamura",
          meta: "Paciente desde 2024",
        },
      ],
    },
    faq: {
      label: "Dúvidas frequentes",
      title: "Antes de",
      accent: "você chegar",
      intro: "Respostas diretas para as perguntas que mais ouvimos na recepção.",
      imageAlt: "Recepção clara e cheia de plantas da clínica Aurora Health",
      items: [
        {
          q: "Preciso ser assinante para agendar?",
          a: "Não. Qualquer pessoa pode marcar uma consulta avulsa com preço de tabela — os planos apenas liberam valores menores, prioridade na agenda e o chat de cuidado.",
        },
        {
          q: "Quais convênios vocês aceitam?",
          a: "Faturamos direto com Vitalis Seguros, MedNova, UnionCare, Alba Salud, PrimeLife e Continental Assist. Traga sua carteirinha e resolvemos a papelada na recepção.",
        },
        {
          q: "Posso cancelar ou remarcar?",
          a: "Sim — sem custo até 24 horas antes do horário, direto pelo e-mail de confirmação ou pelo app da Aurora. Depois disso, cobramos uma pequena taxa de cortesia.",
        },
        {
          q: "Vocês fazem teleconsulta?",
          a: "A maioria das especialidades tem horários por vídeo, sete dias por semana. Seu médico sempre avisa quando um exame presencial é realmente necessário.",
        },
        {
          q: "Como chegar? Tem estacionamento?",
          a: "Estamos a quatro minutos a pé da estação Vila Mariana e validamos o estacionamento do EcoPark, logo ao lado.",
        },
      ],
    },
    booking: {
      label: "Agende sua consulta",
      title: "Sua próxima consulta em",
      accent: "três passos leves",
      intro: "Sem fila no telefone e sem formulário em três vias — escolha o que precisa, em quem confia e quando fica bom para você.",
      stepNames: ["Especialidade", "Médico", "Data e hora", "Confirmado"],
      stepOf: "Passo {current} de {total}",
      back: "Voltar",
      chooseSpecialty: "De que cuidado você precisa hoje?",
      chooseDoctor: "Escolha quem vai te atender",
      chooseTime: "Encontre um horário que caiba na semana",
      dayLabel: "Dia",
      slotLabel: "Horários disponíveis",
      days: [
        { id: "d1", weekday: "seg", date: "20 jul" },
        { id: "d2", weekday: "ter", date: "21 jul" },
        { id: "d3", weekday: "qua", date: "22 jul" },
        { id: "d4", weekday: "qui", date: "23 jul" },
        { id: "d5", weekday: "sex", date: "24 jul" },
      ],
      slots: ["8h30", "9h15", "10h00", "11h30", "14h00", "15h15", "16h45"],
      unavailable: "Indisponível",
      summaryLabel: "Sua consulta",
      withLabel: "com",
      atLabel: "às",
      confirmCta: "Confirmar consulta",
      note: "Cancelamento gratuito até 24 horas antes da consulta.",
      confirmedTitle: "Até breve",
      confirmedBody: "Sua consulta está confirmada e o médico já foi avisado. Instruções de chegada, orientações de preparo e o convite de agenda estão a caminho do seu e-mail.",
      protocolLabel: "Código da reserva",
      rebook: "Agendar outra consulta",
    },
    contact: {
      title: "Estamos na",
      accent: "Vila Mariana",
      addressLabel: "Endereço",
      addressLines: ["Rua Domingos de Morais 2187", "Vila Mariana · São Paulo, SP"],
      phoneLabel: "Telefone e WhatsApp",
      phone: "+55 11 4002-8922",
      emailLabel: "E-mail",
      email: "ola@aurorahealth.clinic",
      hoursLabel: "Horários",
      hours: [
        { days: "seg – sex", time: "7h – 20h" },
        { days: "sábado", time: "8h – 14h" },
      ],
      emergency: "A Aurora Health não é pronto-socorro. Em situações urgentes, ligue 192 (SAMU) ou procure a emergência mais próxima.",
      imageAlt: "Médica tranquilizando um paciente com um gesto gentil durante a consulta",
    },
    footer: {
      blurb: "Medicina humana, sem pressa por princípio. Uma clínica de bairro em São Paulo cuidando de 25 mil pacientes — e contando.",
      columns: [
        {
          title: "Clínica",
          links: [
            { label: "Especialidades", href: "#specialties" },
            { label: "Corpo clínico", href: "#doctors" },
            { label: "Planos de assinatura", href: "#plans" },
            { label: "Dúvidas frequentes", href: "#faq" },
          ],
        },
        {
          title: "Pacientes",
          links: [
            { label: "Agendar consulta", href: "#booking" },
            { label: "Sua jornada", href: "#journey" },
            { label: "Histórias de pacientes", href: "#stories" },
            { label: "Contato", href: "#contact" },
          ],
        },
      ],
      socialLabel: "Siga a Aurora Health",
      social: [
        { id: "site", label: "Site" },
        { id: "mail", label: "E-mail" },
        { id: "chat", label: "WhatsApp" },
      ],
      legalNote: "Aurora Health é um conceito ficcional de clínica criado pela VigApp. Os registros médicos exibidos são ilustrativos.",
      director: "Diretora técnica: Dra. Helena Barbosa · CRM-SP 187.442",
      rights: "© 2026 Aurora Health. Todos os direitos reservados.",
    },
  },

  es: {
    header: {
      nav: [
        { href: "#specialties", label: "Especialidades" },
        { href: "#doctors", label: "Equipo médico" },
        { href: "#journey", label: "Cómo funciona" },
        { href: "#plans", label: "Planes" },
        { href: "#faq", label: "Preguntas" },
      ],
      cta: "Reservar cita",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
    },
    hero: {
      badge: "Recibimos nuevos pacientes en Vila Mariana",
      titleTop: "El cuidado empieza",
      titleItalic: "por escucharte",
      titleEnd: ".",
      sub: "Aurora Health es una clínica de barrio con medicina de primer nivel: consultas sin prisa, agenda en la misma semana y un equipo que te saluda por tu nombre.",
      primaryCta: "Reservar una cita",
      secondaryCta: "Conocer al equipo",
      stats: [
        { value: "25.000+", label: "pacientes atendidos" },
        { value: "4,9", label: "valoración media" },
        { value: "14", label: "especialidades en un solo lugar" },
      ],
      imageAlt: "Una doctora y su paciente conversando con calma en una consulta luminosa",
      chipTitle: "Próximo hueco hoy",
      chipSub: "Dra. Helena Barbosa · 16:40",
      cardTitle: "Reserva en segundos",
      cardSpecialtyLabel: "Especialidad",
      cardHint: "Cancelación gratuita hasta 24 h antes",
      cardCta: "Elegir fecha y especialista",
    },
    specialties: {
      label: "Especialidades",
      title: "Cuidado para",
      accent: "cada etapa de la vida",
      intro: "Catorce especialidades bajo un mismo techo tranquilo — estas son las que más visitan nuestros pacientes.",
      bookLabel: "Reservar esta especialidad",
      items: [
        {
          id: "cardiology",
          name: "Cardiología",
          blurb: "De la prevención a la rehabilitación: eco, ergometría y evaluación de riesgo sin salir del edificio.",
          chips: ["Eco", "ECG", "Holter"],
        },
        {
          id: "dermatology",
          name: "Dermatología",
          blurb: "Dermatología clínica y quirúrgica, mapeo corporal completo y una orientación estética honesta y amable.",
          chips: ["Mapeo", "Crioterapia", "Biopsia"],
        },
        {
          id: "pediatrics",
          name: "Pediatría",
          blurb: "Seguimiento del crecimiento, vacunas al día y una sala de espera que a los niños de verdad les gusta.",
          chips: ["Control del niño", "Vacunas", "Nutrición"],
        },
        {
          id: "orthopedics",
          name: "Ortopedia",
          blurb: "Articulaciones, columna y medicina deportiva: el objetivo es que vuelvas a moverte; la cirugía, último recurso.",
          chips: ["Columna", "Rodilla", "Hombro"],
        },
        {
          id: "gynecology",
          name: "Ginecología",
          blurb: "Cuidado respetuoso y basado en evidencia para cada etapa, de la primera visita a la menopausia.",
          chips: ["Prevención", "Prenatal", "Menopausia"],
        },
        {
          id: "nutrition",
          name: "Nutrición",
          blurb: "Planes de alimentación pensados para tu rutina real: sin culpa ni dietas relámpago.",
          chips: ["Plan de comidas", "Metabolismo", "Seguimiento"],
        },
      ],
    },
    doctors: {
      label: "Equipo médico",
      title: "Especialistas que",
      accent: "saben tu nombre",
      intro: "Profesionales elegidos por su medicina y queridos por su trato. Filtra según lo que necesitas hoy.",
      allLabel: "Todas las especialidades",
      bookLabel: "Reservar",
      nextLabel: "Próxima cita",
      reviewsLabel: "reseñas",
      doctors: [
        { id: "helena", name: "Dra. Helena Barbosa", specialty: "cardiology", role: "Cardióloga · Directora clínica", focus: "Cardiología preventiva y salud cardiovascular femenina", languages: "PT · EN", rating: "4,9", reviews: 212, next: "Hoy · 16:40" },
        { id: "okamoto", name: "Dr. Rafael Okamoto", specialty: "cardiology", role: "Cardiólogo", focus: "Cardiología deportiva y arritmias", languages: "PT · EN · JP", rating: "4,8", reviews: 167, next: "Mañana · 9:15" },
        { id: "amara", name: "Dra. Amara Diallo", specialty: "dermatology", role: "Dermatóloga", focus: "Pieles diversas y dermatología pediátrica", languages: "EN · FR · PT", rating: "5,0", reviews: 189, next: "lun · 10:00" },
        { id: "sofia", name: "Dra. Sofia Ferreira", specialty: "pediatrics", role: "Pediatra", focus: "Recién nacidos y asma infantil", languages: "PT · ES", rating: "4,9", reviews: 324, next: "Hoy · 17:20" },
        { id: "lucas", name: "Dr. Lucas Andrade", specialty: "pediatrics", role: "Pediatra", focus: "Desarrollo infantil y seguimiento conductual", languages: "PT · EN", rating: "4,8", reviews: 142, next: "mié · 8:30" },
        { id: "mateus", name: "Dr. Mateus Rocha", specialty: "orthopedics", role: "Cirujano ortopédico", focus: "Rodilla, lesiones de carrera y planes de recuperación", languages: "PT · EN", rating: "4,9", reviews: 201, next: "mar · 14:00" },
        { id: "priya", name: "Dra. Priya Raghavan", specialty: "gynecology", role: "Ginecóloga y obstetra", focus: "Control prenatal de baja intervención", languages: "EN · PT", rating: "5,0", reviews: 178, next: "Mañana · 11:30" },
        { id: "cohen", name: "Dr. Daniel Cohen", specialty: "nutrition", role: "Nutricionista clínico", focus: "Salud metabólica y nutrición deportiva", languages: "EN · ES · PT", rating: "4,7", reviews: 96, next: "vie · 15:15" },
      ],
    },
    journey: {
      label: "Tu visita",
      title: "Cuatro pasos,",
      accent: "cero fricción",
      intro: "De la reserva al seguimiento, el recorrido está pensado para relajar los hombros — no tu paciencia.",
      imageAlt: "Un médico repasando resultados con su paciente en una tablet, con calma",
      badgeValue: "9 min",
      badgeLabel: "espera media",
      steps: [
        {
          title: "Cuéntanos qué necesitas",
          body: "Reserva online en menos de dos minutos: elige la especialidad, el especialista y una hora que encaje en tu semana.",
        },
        {
          title: "Llega y respira",
          body: "Haz el check-in desde el móvil y acomódate en el lounge; nuestra espera media es de menos de nueve minutos.",
        },
        {
          title: "Una consulta con tiempo para hablar",
          body: "Las visitas se agendan en bloques de 40 minutos, para que ninguna pregunta se quede a medias.",
        },
        {
          title: "Un cuidado que te acompaña a casa",
          body: "Resultados, recetas y el siguiente paso llegan a tu correo — y tu especialista sigue a un mensaje de distancia.",
        },
      ],
    },
    plans: {
      label: "Planes y seguros",
      title: "Cuidado sin prisa,",
      accent: "a tu alcance",
      intro: "Membresías simples que hacen asequible la medicina tranquila — cancela cuando quieras, sin letra pequeña.",
      currency: "EUR",
      priceLocale: "es-ES",
      perMonth: "/mes",
      popularTag: "El más elegido",
      choose: "Elegir plan",
      chosen: "Seleccionado",
      plans: [
        {
          id: "essential",
          name: "Aurora Esencial",
          blurb: "El día a día de una persona.",
          price: 25,
          features: [
            "Consultas ilimitadas de medicina general",
            "Videoconsultas los 7 días de la semana",
            "Precio de socio en análisis e imagen",
            "Equipo de cuidado por chat, de 8:00 a 22:00",
          ],
        },
        {
          id: "family",
          name: "Aurora Familia",
          blurb: "Un plan, toda la casa.",
          price: 69,
          popular: true,
          features: [
            "Todo lo del plan Esencial",
            "Cubre hasta 4 personas de tu hogar",
            "Pediatría y ginecología incluidas",
            "Un chequeo anual completo por persona",
          ],
        },
        {
          id: "premium",
          name: "Aurora Premium",
          blurb: "Cuidado completo, cero colas.",
          price: 105,
          features: [
            "Todo lo del plan Familia",
            "Las 14 especialidades, sin copagos",
            "Chequeo ejecutivo con cardiología",
            "Prioridad en citas para el mismo día",
          ],
        },
      ],
      insurersTitle: "También trabajamos con los principales seguros",
      insurers: ["Vitalis Seguros", "MedNova", "UnionCare", "Alba Salud", "PrimeLife", "Continental Assist"],
      insurersNote: "Facturación directa: trae tu tarjeta y nos ocupamos del papeleo en recepción.",
    },
    testimonials: {
      label: "Historias de pacientes",
      title: "Voces de",
      accent: "nuestra sala de espera",
      prevLabel: "Testimonio anterior",
      nextLabel: "Siguiente testimonio",
      goTo: "Mostrar testimonio",
      items: [
        {
          quote: "Vine por un chequeo de rutina y me quedé para siempre. Es la primera clínica donde nunca me sentí un número.",
          name: "Mariana Duarte",
          meta: "Paciente desde 2023",
        },
        {
          quote: "La Dra. Sofia trata a mi hija como si fuera suya. Reservar toma un minuto y nunca esperamos más de diez.",
          name: "Carla y Antônio Menezes",
          meta: "Padres de Alice, 4 años",
        },
        {
          quote: "Tras mi cirugía de bypass, el plan de seguimiento de Aurora me dio confianza semana tras semana.",
          name: "Jorge Almeida",
          meta: "Paciente de rehabilitación cardíaca",
        },
        {
          quote: "Las clínicas me angustian, pero la calma de este lugar desarma. Hasta la luz parece amable.",
          name: "Beatriz Nakamura",
          meta: "Paciente desde 2024",
        },
      ],
    },
    faq: {
      label: "Preguntas frecuentes",
      title: "Antes de",
      accent: "que llegues",
      intro: "Respuestas directas a lo que más nos preguntan en recepción.",
      imageAlt: "La recepción luminosa y llena de plantas de la clínica Aurora Health",
      items: [
        {
          q: "¿Necesito una membresía para reservar?",
          a: "No. Cualquier persona puede reservar una cita suelta a precio de tarifa — los planes solo desbloquean precios menores, prioridad en la agenda y el chat de cuidado.",
        },
        {
          q: "¿Con qué seguros trabajáis?",
          a: "Facturamos directamente con Vitalis Seguros, MedNova, UnionCare, Alba Salud, PrimeLife y Continental Assist. Trae tu tarjeta y resolvemos el papeleo en recepción.",
        },
        {
          q: "¿Puedo cancelar o cambiar la cita?",
          a: "Sí — sin coste hasta 24 horas antes de tu hora, desde el correo de confirmación o la app de Aurora. Después pedimos una pequeña tasa de cortesía.",
        },
        {
          q: "¿Hacéis videoconsultas?",
          a: "La mayoría de especialidades ofrece huecos por vídeo los siete días de la semana. Tu especialista siempre te dirá cuándo hace falta de verdad una exploración presencial.",
        },
        {
          q: "¿Cómo llego? ¿Hay aparcamiento?",
          a: "Estamos a cuatro minutos a pie de la estación Vila Mariana y validamos el aparcamiento del EcoPark, justo al lado.",
        },
      ],
    },
    booking: {
      label: "Reserva tu cita",
      title: "Tu próxima cita, en",
      accent: "tres pasos suaves",
      intro: "Sin esperas al teléfono ni formularios por triplicado: elige qué necesitas, en quién confías y cuándo te viene bien.",
      stepNames: ["Especialidad", "Especialista", "Fecha y hora", "Confirmada"],
      stepOf: "Paso {current} de {total}",
      back: "Volver",
      chooseSpecialty: "¿Qué tipo de cuidado necesitas hoy?",
      chooseDoctor: "Elige a quién quieres ver",
      chooseTime: "Busca un momento que respire",
      dayLabel: "Día",
      slotLabel: "Horas disponibles",
      days: [
        { id: "d1", weekday: "lun", date: "20 jul" },
        { id: "d2", weekday: "mar", date: "21 jul" },
        { id: "d3", weekday: "mié", date: "22 jul" },
        { id: "d4", weekday: "jue", date: "23 jul" },
        { id: "d5", weekday: "vie", date: "24 jul" },
      ],
      slots: ["8:30", "9:15", "10:00", "11:30", "14:00", "15:15", "16:45"],
      unavailable: "No disponible",
      summaryLabel: "Tu cita",
      withLabel: "con",
      atLabel: "a las",
      confirmCta: "Confirmar cita",
      note: "Cancelación gratuita hasta 24 horas antes de tu cita.",
      confirmedTitle: "Hasta pronto",
      confirmedBody: "Tu cita está confirmada y tu especialista ya lo sabe. Las indicaciones para llegar, la preparación y la invitación de calendario van de camino a tu correo.",
      protocolLabel: "Código de reserva",
      rebook: "Reservar otra cita",
    },
    contact: {
      title: "Estamos en",
      accent: "Vila Mariana",
      addressLabel: "Dirección",
      addressLines: ["Rua Domingos de Morais 2187", "Vila Mariana · São Paulo, SP"],
      phoneLabel: "Teléfono y WhatsApp",
      phone: "+55 11 4002-8922",
      emailLabel: "Correo",
      email: "hola@aurorahealth.clinic",
      hoursLabel: "Horario",
      hours: [
        { days: "L – V", time: "7:00 – 20:00" },
        { days: "Sábado", time: "8:00 – 14:00" },
      ],
      emergency: "Aurora Health no es un servicio de urgencias. Si es urgente, llama al 192 (SAMU) o acude a la urgencia más cercana.",
      imageAlt: "Una doctora tranquilizando a su paciente con un gesto amable durante la consulta",
    },
    footer: {
      blurb: "Medicina humana, sin prisa por diseño. Una clínica de barrio en São Paulo que cuida de 25.000 pacientes — y contando.",
      columns: [
        {
          title: "Clínica",
          links: [
            { label: "Especialidades", href: "#specialties" },
            { label: "Equipo médico", href: "#doctors" },
            { label: "Planes de membresía", href: "#plans" },
            { label: "Preguntas frecuentes", href: "#faq" },
          ],
        },
        {
          title: "Pacientes",
          links: [
            { label: "Reservar cita", href: "#booking" },
            { label: "Tu recorrido", href: "#journey" },
            { label: "Historias de pacientes", href: "#stories" },
            { label: "Contacto", href: "#contact" },
          ],
        },
      ],
      socialLabel: "Sigue a Aurora Health",
      social: [
        { id: "site", label: "Sitio web" },
        { id: "mail", label: "Correo" },
        { id: "chat", label: "WhatsApp" },
      ],
      legalNote: "Aurora Health es un concepto ficticio de clínica diseñado por VigApp. Los registros médicos mostrados son ilustrativos.",
      director: "Directora técnica: Dra. Helena Barbosa · CRM-SP 187.442",
      rights: "© 2026 Aurora Health. Todos los derechos reservados.",
    },
  },
};
