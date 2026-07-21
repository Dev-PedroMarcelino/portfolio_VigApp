import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type TreatmentTabId = "essential" | "cosmetic" | "surgical";

export interface Treatment {
  name: string;
  description: string;
  price: string;
  priceNote: string;
  duration: string;
  features: string[];
  flag?: string;
}

export interface TreatmentTab {
  id: TreatmentTabId;
  label: string;
  tagline: string;
  treatments: Treatment[];
}

export interface HeaderContent {
  nav: { href: string; label: string }[];
  cta: string;
  openMenu: string;
  closeMenu: string;
}

export interface HeroContent {
  kicker: string;
  titleTop: string;
  titleAccent: string;
  titleBottom: string;
  sub: string;
  ctaPrimary: string;
  ctaSecondary: string;
  imageAlt: string;
  ratingValue: string;
  ratingLabel: string;
  openLabel: string;
  openValue: string;
  stats: { value: string; label: string }[];
}

export interface TreatmentsContent {
  label: string;
  title: string;
  intro: string;
  badge: string;
  footnote: string;
  tabs: TreatmentTab[];
}

export interface GalleryCase {
  id: string;
  label: string;
  patient: string;
  treatment: string;
  sessions: string;
  duration: string;
  quote: string;
  alt: string;
}

export interface GalleryContent {
  label: string;
  title: string;
  intro: string;
  beforeLabel: string;
  afterLabel: string;
  sliderAria: string;
  dragHint: string;
  meta: { treatment: string; sessions: string; duration: string };
  cases: GalleryCase[];
}

export interface TeamMember {
  name: string;
  role: string;
  registry: string;
  bio: string;
  alt: string;
}

export interface TeamContent {
  label: string;
  title: string;
  intro: string;
  members: TeamMember[];
}

export interface VisitType {
  id: string;
  label: string;
  duration: string;
}

export interface DayOption {
  weekday: string;
  day: string;
  month: string;
  full: string;
}

export interface AppointmentContent {
  label: string;
  title: string;
  intro: string;
  typeLegend: string;
  dayLegend: string;
  slotLegend: string;
  morning: string;
  afternoon: string;
  bookedNote: string;
  confirmCta: string;
  disabledHint: string;
  types: VisitType[];
  days: DayOption[];
  morningSlots: string[];
  afternoonSlots: string[];
  summary: { type: string; date: string; time: string; codeLabel: string };
  success: { title: string; body: string; another: string };
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqContent {
  label: string;
  title: string;
  contactTitle: string;
  contactBody: string;
  contactCta: string;
  items: FaqItem[];
}

export interface FooterContent {
  blurb: string;
  addressTitle: string;
  addressLines: string[];
  hoursTitle: string;
  hours: { days: string; time: string }[];
  contactTitle: string;
  phone: string;
  email: string;
  navTitle: string;
  nav: { href: string; label: string }[];
  social: { label: string }[];
  legal: string;
}

export interface LuminaContent {
  header: HeaderContent;
  hero: HeroContent;
  treatments: TreatmentsContent;
  gallery: GalleryContent;
  team: TeamContent;
  appointment: AppointmentContent;
  faq: FaqContent;
  footer: FooterContent;
}

/* ------------------------------------------------------------------ */
/* Dictionary                                                          */
/* ------------------------------------------------------------------ */

export const luminaDict: DemoDictionary<LuminaContent> = {
  en: {
    header: {
      nav: [
        { href: "#treatments", label: "Treatments" },
        { href: "#gallery", label: "Smile gallery" },
        { href: "#team", label: "Team" },
        { href: "#faq", label: "FAQ" },
      ],
      cta: "Book a visit",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      kicker: "Now welcoming new patients",
      titleTop: "The science of a",
      titleAccent: "confident",
      titleBottom: "smile.",
      sub: "Lumina Dental blends calm design, gentle clinicians and digital precision, so going to the dentist finally feels like self-care.",
      ctaPrimary: "Book your visit",
      ctaSecondary: "Explore treatments",
      imageAlt: "Sunlit treatment room at Lumina Dental with a modern dental chair",
      ratingValue: "4.9",
      ratingLabel: "average from 1,280 patient reviews",
      openLabel: "Next opening",
      openValue: "Thu · 3:30 PM",
      stats: [
        { value: "12k+", label: "smiles treated" },
        { value: "15", label: "years of practice" },
        { value: "98%", label: "would recommend us" },
      ],
    },
    treatments: {
      label: "Treatments",
      title: "Transparent care, transparent pricing.",
      intro:
        "Three levels of care, one honest price list. No hidden fees, no surprise upsells - you approve every step before we begin.",
      badge: "Transparent pricing promise",
      footnote:
        "Every plan starts with a digital scan and a written care roadmap. We accept most insurance plans and pre-check your coverage for free.",
      tabs: [
        {
          id: "essential",
          label: "Essential",
          tagline: "The foundations of a healthy mouth, on a schedule that respects yours.",
          treatments: [
            {
              name: "Deep clean & polish",
              description:
                "Ultrasonic scaling, stain removal and a glossy fluoride finish in one relaxed session.",
              price: "$120",
              priceNote: "per session",
              duration: "50 min",
              features: ["Ultrasonic scaling", "Fluoride gloss finish", "Take-home care plan"],
              flag: "Most booked",
            },
            {
              name: "Full check-up & X-ray",
              description:
                "A complete digital map of your mouth with same-day results explained in plain language.",
              price: "$85",
              priceNote: "all-inclusive",
              duration: "40 min",
              features: ["Panoramic digital X-ray", "Gum health screening", "Zero-jargon report"],
            },
            {
              name: "Composite filling",
              description: "Tooth-colored restorations sculpted and cured in a single appointment.",
              price: "$160",
              priceNote: "per tooth",
              duration: "45 min",
              features: ["Shade-matched resin", "Bite calibration", "5-year guarantee"],
            },
            {
              name: "Gum therapy",
              description:
                "Targeted periodontal care that stops bleeding gums before they become a bigger story.",
              price: "$220",
              priceNote: "per quadrant",
              duration: "60 min",
              features: ["Full periodontal charting", "Subgingival scaling", "Follow-up visit included"],
            },
          ],
        },
        {
          id: "cosmetic",
          label: "Cosmetic",
          tagline: "Subtle upgrades with dramatic confidence returns.",
          treatments: [
            {
              name: "Laser whitening",
              description:
                "Up to eight shades brighter in one visit, with enamel-safe light activation.",
              price: "$420",
              priceNote: "per session",
              duration: "75 min",
              features: ["Up to 8 shades brighter", "Sensitivity-calibrated gel", "Desensitizing finish"],
              flag: "Signature",
            },
            {
              name: "Clear aligners",
              description:
                "Invisible trays planned in 3D, with monthly remote check-ins from our aligner team.",
              price: "from $2,800",
              priceNote: "full treatment",
              duration: "6-14 months",
              features: ["3D result preview", "At-home tray changes", "Retainer included"],
            },
            {
              name: "Porcelain veneers",
              description: "Hand-layered ceramics that mimic the light play of natural enamel.",
              price: "$650",
              priceNote: "per tooth",
              duration: "2 visits",
              features: ["Hand-layered ceramics", "Aesthetic try-in first", "7-year guarantee"],
            },
            {
              name: "Composite bonding",
              description: "Micro-corrections of chips and gaps, sculpted freehand in one sitting.",
              price: "$280",
              priceNote: "per tooth",
              duration: "60 min",
              features: ["Zero enamel removal", "Instant result", "Gloss polish finish"],
            },
          ],
        },
        {
          id: "surgical",
          label: "Surgical",
          tagline: "Advanced procedures with guided precision and gentle recovery protocols.",
          treatments: [
            {
              name: "Titanium implant",
              description:
                "Guided 3D placement with a lifelike ceramic crown, built to last decades.",
              price: "from $1,950",
              priceNote: "per implant, crown included",
              duration: "2-3 visits",
              features: ["3D guided surgery", "Ceramic crown included", "Lifetime reviews"],
              flag: "Lifetime support",
            },
            {
              name: "Wisdom tooth extraction",
              description:
                "Calm, fully anesthetized removal with a recovery kit and a next-day check-in call.",
              price: "$390",
              priceNote: "per tooth",
              duration: "45 min",
              features: ["Computer-assisted anesthesia", "Recovery kit included", "Next-day check-in call"],
            },
            {
              name: "Bone grafting",
              description: "Rebuilds support for future implants using biocompatible materials.",
              price: "from $780",
              priceNote: "per site",
              duration: "60 min",
              features: ["Biocompatible materials", "CT-based planning", "Optional sedation"],
            },
            {
              name: "Sinus lift",
              description:
                "Creates safe implant space in the upper jaw with millimetric planning.",
              price: "from $1,150",
              priceNote: "per side",
              duration: "90 min",
              features: ["Millimetric precision", "Minimally invasive technique", "Follow-up included"],
            },
          ],
        },
      ],
    },
    gallery: {
      label: "Smile gallery",
      title: "Real transformations, honest light.",
      intro:
        "Drag the handle to compare. Same patient, same lighting, no filters - just careful dentistry.",
      beforeLabel: "Before",
      afterLabel: "After",
      sliderAria: "Reveal before and after comparison",
      dragHint: "Drag to compare",
      meta: { treatment: "Treatment", sessions: "Sessions", duration: "Timeline" },
      cases: [
        {
          id: "whitening",
          label: "Whitening",
          patient: "Larissa M., 29",
          treatment: "Laser whitening + polish",
          sessions: "1 session",
          duration: "1 week",
          quote: "I kept catching my own smile in shop windows. Completely worth it.",
          alt: "Close-up of a bright smile after laser whitening",
        },
        {
          id: "aligners",
          label: "Aligners",
          patient: "Diego F., 35",
          treatment: "Clear aligners, 11 months",
          sessions: "22 trays",
          duration: "11 months",
          quote: "Nobody at work noticed the trays. Everybody noticed the result.",
          alt: "Close-up of an aligned smile after clear aligner treatment",
        },
        {
          id: "veneers",
          label: "Veneers",
          patient: "Sofia K., 42",
          treatment: "Six porcelain veneers",
          sessions: "3 visits",
          duration: "5 weeks",
          quote: "They look like my teeth, only the version I always imagined.",
          alt: "Close-up of a natural-looking smile with porcelain veneers",
        },
      ],
    },
    team: {
      label: "The team",
      title: "Gentle hands, obsessive standards.",
      intro: "Four specialists, one shared belief: nobody should fear a dental chair.",
      members: [
        {
          name: "Dr. Rafael Duarte",
          role: "Clinical director · Implantology",
          registry: "CRO-RJ 41.278",
          bio: "Sixteen years placing implants with guided surgery, and still counts every finished smile as a small victory.",
          alt: "Portrait of Dr. Rafael Duarte at the clinic",
        },
        {
          name: "Dra. Camila Rocha",
          role: "Restorative dentistry",
          registry: "CRO-SP 63.104",
          bio: "Treats every restoration like micro-sculpture; patients say her appointments feel strangely relaxing.",
          alt: "Dra. Camila Rocha performing a dental procedure",
        },
        {
          name: "Dra. Aisha Okafor",
          role: "Digital planning · Orthodontics",
          registry: "CRO-RJ 58.930",
          bio: "Runs our 3D scan lab and turns each treatment into a plan you can actually see before it starts.",
          alt: "Dra. Aisha Okafor reviewing a treatment plan on a tablet",
        },
        {
          name: "Dr. Kenji Nakamura",
          role: "Aligner therapy",
          registry: "CRO-SP 71.556",
          bio: "Aligner specialist and self-declared enemy of one-size-fits-all treatment plans.",
          alt: "Monogram of Dr. Kenji Nakamura",
        },
      ],
    },
    appointment: {
      label: "Booking",
      title: "Pick a day. Pick a time. Done.",
      intro:
        "Choose what works for you and we hold the chair. Rescheduling is free up to 24 hours before your visit.",
      typeLegend: "Type of visit",
      dayLegend: "This week",
      slotLegend: "Available times",
      morning: "Morning",
      afternoon: "Afternoon",
      bookedNote: "Taken",
      confirmCta: "Confirm appointment",
      disabledHint: "Select a day and a time to continue",
      types: [
        { id: "checkup", label: "First visit & check-up", duration: "40 min" },
        { id: "cleaning", label: "Cleaning", duration: "50 min" },
        { id: "whitening", label: "Whitening", duration: "75 min" },
        { id: "emergency", label: "Emergency", duration: "priority" },
      ],
      days: [
        { weekday: "Mon", day: "20", month: "Jul", full: "Monday, July 20" },
        { weekday: "Tue", day: "21", month: "Jul", full: "Tuesday, July 21" },
        { weekday: "Wed", day: "22", month: "Jul", full: "Wednesday, July 22" },
        { weekday: "Thu", day: "23", month: "Jul", full: "Thursday, July 23" },
        { weekday: "Fri", day: "24", month: "Jul", full: "Friday, July 24" },
        { weekday: "Sat", day: "25", month: "Jul", full: "Saturday, July 25" },
      ],
      morningSlots: ["8:00 AM", "9:30 AM", "11:00 AM"],
      afternoonSlots: ["1:30 PM", "3:00 PM", "4:30 PM", "6:00 PM"],
      summary: { type: "Visit", date: "Day", time: "Time", codeLabel: "Booking code" },
      success: {
        title: "You are booked in.",
        body: "We saved your chair and sent a confirmation with everything you need. A reminder lands 24 hours before your visit.",
        another: "Book another visit",
      },
    },
    faq: {
      label: "FAQ",
      title: "Questions we hear every week.",
      contactTitle: "Still unsure?",
      contactBody: "Message the front desk - a human answers within one business hour.",
      contactCta: "Talk to us",
      items: [
        {
          q: "Will it hurt?",
          a: "Honestly: our whole clinic is designed around the answer no. We use computer-assisted anesthesia, warm numbing gel before any needle, and you control a pause signal at all times.",
        },
        {
          q: "Do you accept insurance?",
          a: "We work with most major dental plans and pre-check your coverage before treatment, so the price you approve is the price you pay.",
        },
        {
          q: "How long does a first visit take?",
          a: "Plan for about 40 minutes: a digital scan, a gum screening and a conversation about your goals. You leave with a written care roadmap.",
        },
        {
          q: "Is whitening safe for sensitive teeth?",
          a: "Yes. We measure sensitivity first and calibrate the gel concentration to it. Most patients report little to none, and we include a desensitizing finish.",
        },
        {
          q: "How long do aligners take?",
          a: "Simple corrections finish in about 6 months; more complex cases run 12 to 14. Your 3D preview shows the projected result before you commit.",
        },
        {
          q: "Can I pay in installments?",
          a: "Yes - treatments above $300 can be split into up to 12 interest-free monthly payments, arranged directly at the front desk.",
        },
      ],
    },
    footer: {
      blurb: "A calm, light-filled dental studio where precision and kindness share the same chair.",
      addressTitle: "Visit",
      addressLines: ["Lumina Dental Studio", "Av. das Gaivotas 218, Suite 305", "Barra da Tijuca, Rio de Janeiro"],
      hoursTitle: "Hours",
      hours: [
        { days: "Mon - Fri", time: "8:00 AM - 7:00 PM" },
        { days: "Saturday", time: "9:00 AM - 2:00 PM" },
        { days: "Sunday", time: "Closed" },
      ],
      contactTitle: "Contact",
      phone: "+55 21 3555 0184",
      email: "smile@luminadental.clinic",
      navTitle: "Explore",
      nav: [
        { href: "#treatments", label: "Treatments" },
        { href: "#gallery", label: "Smile gallery" },
        { href: "#team", label: "Team" },
        { href: "#appointment", label: "Book a visit" },
      ],
      social: [{ label: "Instagram" }, { label: "Facebook" }, { label: "WhatsApp" }],
      legal: "Lumina Dental is a fictional brand designed as a portfolio concept. © 2026",
    },
  },

  pt: {
    header: {
      nav: [
        { href: "#treatments", label: "Tratamentos" },
        { href: "#gallery", label: "Sorrisos" },
        { href: "#team", label: "Equipe" },
        { href: "#faq", label: "Dúvidas" },
      ],
      cta: "Agendar consulta",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
    },
    hero: {
      kicker: "Recebendo novos pacientes",
      titleTop: "A ciência de um",
      titleAccent: "sorriso",
      titleBottom: "confiante.",
      sub: "A Lumina Dental une design acolhedor, profissionais gentis e precisão digital para que ir ao dentista finalmente pareça cuidado com você.",
      ctaPrimary: "Agendar minha visita",
      ctaSecondary: "Ver tratamentos",
      imageAlt: "Sala de atendimento iluminada da Lumina Dental com uma cadeira odontológica moderna",
      ratingValue: "4,9",
      ratingLabel: "média de 1.280 avaliações de pacientes",
      openLabel: "Próximo horário",
      openValue: "Qui · 15:30",
      stats: [
        { value: "12 mil+", label: "sorrisos tratados" },
        { value: "15", label: "anos de clínica" },
        { value: "98%", label: "nos recomendariam" },
      ],
    },
    treatments: {
      label: "Tratamentos",
      title: "Cuidado transparente, preços transparentes.",
      intro:
        "Três níveis de cuidado, uma tabela honesta. Sem taxas escondidas, sem surpresas: você aprova cada etapa antes de começarmos.",
      badge: "Compromisso de preço transparente",
      footnote:
        "Todo plano começa com um escaneamento digital e um roteiro de cuidados por escrito. Aceitamos os principais convênios e pré-verificamos sua cobertura sem custo.",
      tabs: [
        {
          id: "essential",
          label: "Essencial",
          tagline: "As bases de uma boca saudável, em uma agenda que respeita a sua.",
          treatments: [
            {
              name: "Limpeza profunda + polimento",
              description:
                "Raspagem ultrassônica, remoção de manchas e acabamento com flúor em uma sessão tranquila.",
              price: "R$ 340",
              priceNote: "por sessão",
              duration: "50 min",
              features: ["Raspagem ultrassônica", "Acabamento com flúor", "Plano de cuidados para casa"],
              flag: "Mais agendado",
            },
            {
              name: "Check-up completo + raio-X",
              description:
                "Um mapa digital completo da sua boca, com resultado no mesmo dia explicado sem tecniquês.",
              price: "R$ 240",
              priceNote: "tudo incluso",
              duration: "40 min",
              features: ["Raio-X panorâmico digital", "Avaliação da gengiva", "Relatório sem jargões"],
            },
            {
              name: "Restauração em resina",
              description: "Restaurações na cor do dente, esculpidas e finalizadas em uma única consulta.",
              price: "R$ 450",
              priceNote: "por dente",
              duration: "45 min",
              features: ["Resina na cor exata", "Ajuste de mordida", "Garantia de 5 anos"],
            },
            {
              name: "Tratamento de gengiva",
              description:
                "Cuidado periodontal direcionado que resolve o sangramento antes que vire um problema maior.",
              price: "R$ 620",
              priceNote: "por quadrante",
              duration: "60 min",
              features: ["Sondagem completa", "Raspagem subgengival", "Retorno de controle incluso"],
            },
          ],
        },
        {
          id: "cosmetic",
          label: "Estético",
          tagline: "Melhorias sutis com retorno dramático em confiança.",
          treatments: [
            {
              name: "Clareamento a laser",
              description:
                "Até oito tons mais claro em uma visita, com ativação por luz segura para o esmalte.",
              price: "R$ 1.400",
              priceNote: "por sessão",
              duration: "75 min",
              features: ["Até 8 tons mais claro", "Gel calibrado à sensibilidade", "Finalização dessensibilizante"],
              flag: "Assinatura",
            },
            {
              name: "Alinhadores invisíveis",
              description:
                "Placas transparentes planejadas em 3D, com acompanhamento mensal remoto da nossa equipe.",
              price: "a partir de R$ 9.800",
              priceNote: "tratamento completo",
              duration: "6-14 meses",
              features: ["Prévia 3D do resultado", "Trocas em casa", "Contenção inclusa"],
            },
            {
              name: "Facetas de porcelana",
              description: "Cerâmica estratificada à mão que imita o brilho natural do esmalte.",
              price: "R$ 1.900",
              priceNote: "por dente",
              duration: "2 visitas",
              features: ["Cerâmica estratificada", "Prova estética antes de cimentar", "Garantia de 7 anos"],
            },
            {
              name: "Bonding em resina",
              description: "Microcorreções de lascas e espaços, esculpidas à mão livre em uma sessão.",
              price: "R$ 780",
              priceNote: "por dente",
              duration: "60 min",
              features: ["Sem desgaste do dente", "Resultado imediato", "Polimento de brilho"],
            },
          ],
        },
        {
          id: "surgical",
          label: "Cirúrgico",
          tagline: "Procedimentos avançados com precisão guiada e recuperação tranquila.",
          treatments: [
            {
              name: "Implante de titânio",
              description:
                "Instalação guiada em 3D com coroa cerâmica natural, feita para durar décadas.",
              price: "a partir de R$ 6.900",
              priceNote: "por implante, coroa inclusa",
              duration: "2-3 visitas",
              features: ["Cirurgia guiada em 3D", "Coroa cerâmica inclusa", "Revisões vitalícias"],
              flag: "Suporte vitalício",
            },
            {
              name: "Extração de siso",
              description:
                "Remoção tranquila com anestesia completa, kit de recuperação e ligação de acompanhamento no dia seguinte.",
              price: "R$ 1.100",
              priceNote: "por dente",
              duration: "45 min",
              features: ["Anestesia assistida por computador", "Kit de recuperação incluso", "Ligação no dia seguinte"],
            },
            {
              name: "Enxerto ósseo",
              description: "Reconstrói o suporte para futuros implantes com materiais biocompatíveis.",
              price: "a partir de R$ 2.600",
              priceNote: "por região",
              duration: "60 min",
              features: ["Materiais biocompatíveis", "Planejamento tomográfico", "Sedação opcional"],
            },
            {
              name: "Levantamento de seio maxilar",
              description:
                "Cria espaço seguro para implantes na arcada superior com planejamento milimétrico.",
              price: "a partir de R$ 3.900",
              priceNote: "por lado",
              duration: "90 min",
              features: ["Precisão milimétrica", "Técnica minimamente invasiva", "Acompanhamento incluso"],
            },
          ],
        },
      ],
    },
    gallery: {
      label: "Galeria de sorrisos",
      title: "Transformações reais, luz honesta.",
      intro:
        "Arraste o controle para comparar. Mesmo paciente, mesma luz, nenhum filtro: apenas odontologia bem feita.",
      beforeLabel: "Antes",
      afterLabel: "Depois",
      sliderAria: "Revelar comparação de antes e depois",
      dragHint: "Arraste para comparar",
      meta: { treatment: "Tratamento", sessions: "Sessões", duration: "Tempo total" },
      cases: [
        {
          id: "whitening",
          label: "Clareamento",
          patient: "Larissa M., 29",
          treatment: "Clareamento a laser + polimento",
          sessions: "1 sessão",
          duration: "1 semana",
          quote: "Eu ficava flagrando meu próprio sorriso nas vitrines. Valeu cada centavo.",
          alt: "Close de um sorriso claro após clareamento a laser",
        },
        {
          id: "aligners",
          label: "Alinhadores",
          patient: "Diego F., 35",
          treatment: "Alinhadores invisíveis, 11 meses",
          sessions: "22 placas",
          duration: "11 meses",
          quote: "Ninguém no trabalho notou as placas. Todo mundo notou o resultado.",
          alt: "Close de um sorriso alinhado após tratamento com alinhadores",
        },
        {
          id: "veneers",
          label: "Facetas",
          patient: "Sofia K., 42",
          treatment: "Seis facetas de porcelana",
          sessions: "3 visitas",
          duration: "5 semanas",
          quote: "Parecem os meus dentes, só que na versão que eu sempre imaginei.",
          alt: "Close de um sorriso natural com facetas de porcelana",
        },
      ],
    },
    team: {
      label: "Equipe",
      title: "Mãos gentis, padrões obsessivos.",
      intro: "Quatro especialistas, uma convicção em comum: ninguém deveria ter medo de cadeira de dentista.",
      members: [
        {
          name: "Dr. Rafael Duarte",
          role: "Diretor clínico · Implantodontia",
          registry: "CRO-RJ 41.278",
          bio: "Dezesseis anos instalando implantes com cirurgia guiada, e ainda comemora cada sorriso pronto como uma pequena vitória.",
          alt: "Retrato do Dr. Rafael Duarte na clínica",
        },
        {
          name: "Dra. Camila Rocha",
          role: "Dentística restauradora",
          registry: "CRO-SP 63.104",
          bio: "Trata cada restauração como microescultura; pacientes dizem que as consultas dela são estranhamente relaxantes.",
          alt: "Dra. Camila Rocha realizando um procedimento odontológico",
        },
        {
          name: "Dra. Aisha Okafor",
          role: "Planejamento digital · Ortodontia",
          registry: "CRO-RJ 58.930",
          bio: "Comanda nosso laboratório de escaneamento 3D e transforma cada tratamento em um plano que você enxerga antes de começar.",
          alt: "Dra. Aisha Okafor analisando um plano de tratamento no tablet",
        },
        {
          name: "Dr. Kenji Nakamura",
          role: "Terapia com alinhadores",
          registry: "CRO-SP 71.556",
          bio: "Especialista em alinhadores e inimigo declarado de planos de tratamento iguais para todo mundo.",
          alt: "Monograma do Dr. Kenji Nakamura",
        },
      ],
    },
    appointment: {
      label: "Agendamento",
      title: "Escolha o dia. Escolha a hora. Pronto.",
      intro:
        "Escolha o que funciona para você e reservamos a cadeira. Remarcar é grátis até 24 horas antes da visita.",
      typeLegend: "Tipo de visita",
      dayLegend: "Esta semana",
      slotLegend: "Horários disponíveis",
      morning: "Manhã",
      afternoon: "Tarde",
      bookedNote: "Ocupado",
      confirmCta: "Confirmar agendamento",
      disabledHint: "Escolha um dia e um horário para continuar",
      types: [
        { id: "checkup", label: "Primeira visita + check-up", duration: "40 min" },
        { id: "cleaning", label: "Limpeza", duration: "50 min" },
        { id: "whitening", label: "Clareamento", duration: "75 min" },
        { id: "emergency", label: "Emergência", duration: "prioridade" },
      ],
      days: [
        { weekday: "Seg", day: "20", month: "jul", full: "Segunda-feira, 20 de julho" },
        { weekday: "Ter", day: "21", month: "jul", full: "Terça-feira, 21 de julho" },
        { weekday: "Qua", day: "22", month: "jul", full: "Quarta-feira, 22 de julho" },
        { weekday: "Qui", day: "23", month: "jul", full: "Quinta-feira, 23 de julho" },
        { weekday: "Sex", day: "24", month: "jul", full: "Sexta-feira, 24 de julho" },
        { weekday: "Sáb", day: "25", month: "jul", full: "Sábado, 25 de julho" },
      ],
      morningSlots: ["08:00", "09:30", "11:00"],
      afternoonSlots: ["13:30", "15:00", "16:30", "18:00"],
      summary: { type: "Visita", date: "Dia", time: "Horário", codeLabel: "Código da reserva" },
      success: {
        title: "Consulta confirmada.",
        body: "Reservamos sua cadeira e enviamos a confirmação com tudo o que você precisa. Um lembrete chega 24 horas antes da visita.",
        another: "Agendar outra visita",
      },
    },
    faq: {
      label: "Dúvidas",
      title: "Perguntas que ouvimos toda semana.",
      contactTitle: "Ainda em dúvida?",
      contactBody: "Fale com a recepção: uma pessoa de verdade responde em até uma hora útil.",
      contactCta: "Falar com a gente",
      items: [
        {
          q: "Vai doer?",
          a: "Sinceramente: a clínica inteira foi desenhada para a resposta ser não. Usamos anestesia assistida por computador, gel anestésico morno antes de qualquer agulha, e você tem um sinal de pausa o tempo todo.",
        },
        {
          q: "Vocês aceitam convênio?",
          a: "Trabalhamos com os principais planos odontológicos e pré-verificamos sua cobertura antes do tratamento: o preço que você aprova é o preço que você paga.",
        },
        {
          q: "Quanto tempo dura a primeira visita?",
          a: "Reserve cerca de 40 minutos: escaneamento digital, avaliação da gengiva e uma conversa sobre seus objetivos. Você sai com um plano de cuidados por escrito.",
        },
        {
          q: "Clareamento é seguro para dentes sensíveis?",
          a: "Sim. Medimos a sensibilidade primeiro e calibramos a concentração do gel. A maioria dos pacientes relata pouca ou nenhuma, e incluímos uma finalização dessensibilizante.",
        },
        {
          q: "Quanto tempo leva o tratamento com alinhadores?",
          a: "Correções simples terminam em cerca de 6 meses; casos complexos levam de 12 a 14. A prévia 3D mostra o resultado projetado antes de você decidir.",
        },
        {
          q: "Posso parcelar?",
          a: "Sim: tratamentos acima de R$ 900 podem ser parcelados em até 12 vezes sem juros, direto na recepção.",
        },
      ],
    },
    footer: {
      blurb: "Um estúdio odontológico calmo e cheio de luz, onde precisão e gentileza dividem a mesma cadeira.",
      addressTitle: "Onde estamos",
      addressLines: ["Lumina Dental Studio", "Av. das Gaivotas 218, sala 305", "Barra da Tijuca, Rio de Janeiro"],
      hoursTitle: "Horários",
      hours: [
        { days: "Seg - Sex", time: "8h - 19h" },
        { days: "Sábado", time: "9h - 14h" },
        { days: "Domingo", time: "Fechado" },
      ],
      contactTitle: "Contato",
      phone: "+55 21 3555 0184",
      email: "smile@luminadental.clinic",
      navTitle: "Navegue",
      nav: [
        { href: "#treatments", label: "Tratamentos" },
        { href: "#gallery", label: "Galeria de sorrisos" },
        { href: "#team", label: "Equipe" },
        { href: "#appointment", label: "Agendar consulta" },
      ],
      social: [{ label: "Instagram" }, { label: "Facebook" }, { label: "WhatsApp" }],
      legal: "Lumina Dental é uma marca fictícia criada como conceito de portfólio. © 2026",
    },
  },

  es: {
    header: {
      nav: [
        { href: "#treatments", label: "Tratamientos" },
        { href: "#gallery", label: "Sonrisas" },
        { href: "#team", label: "Equipo" },
        { href: "#faq", label: "Dudas" },
      ],
      cta: "Reservar cita",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
    },
    hero: {
      kicker: "Aceptamos nuevos pacientes",
      titleTop: "La ciencia de una",
      titleAccent: "sonrisa",
      titleBottom: "segura.",
      sub: "Lumina Dental combina un diseño acogedor, profesionales cercanos y precisión digital para que ir al dentista por fin se sienta como cuidarse.",
      ctaPrimary: "Reservar mi cita",
      ctaSecondary: "Ver tratamientos",
      imageAlt: "Sala de tratamiento luminosa de Lumina Dental con un sillón dental moderno",
      ratingValue: "4,9",
      ratingLabel: "media de 1.280 reseñas de pacientes",
      openLabel: "Próximo hueco",
      openValue: "Jue · 15:30",
      stats: [
        { value: "12.000+", label: "sonrisas tratadas" },
        { value: "15", label: "años de clínica" },
        { value: "98%", label: "nos recomendaría" },
      ],
    },
    treatments: {
      label: "Tratamientos",
      title: "Cuidado transparente, precios transparentes.",
      intro:
        "Tres niveles de cuidado y una tarifa honesta. Sin costes ocultos ni sorpresas: apruebas cada paso antes de empezar.",
      badge: "Compromiso de precios claros",
      footnote:
        "Cada plan empieza con un escaneado digital y una hoja de ruta por escrito. Trabajamos con la mayoría de seguros y verificamos tu cobertura gratis.",
      tabs: [
        {
          id: "essential",
          label: "Esencial",
          tagline: "Los cimientos de una boca sana, con una agenda que respeta la tuya.",
          treatments: [
            {
              name: "Limpieza profunda + pulido",
              description:
                "Raspado ultrasónico, eliminación de manchas y acabado con flúor en una sesión tranquila.",
              price: "95 €",
              priceNote: "por sesión",
              duration: "50 min",
              features: ["Raspado ultrasónico", "Acabado con flúor", "Plan de cuidados en casa"],
              flag: "El más reservado",
            },
            {
              name: "Revisión completa + radiografía",
              description:
                "Un mapa digital completo de tu boca con resultados el mismo día, explicados sin tecnicismos.",
              price: "70 €",
              priceNote: "todo incluido",
              duration: "40 min",
              features: ["Radiografía panorámica digital", "Revisión de encías", "Informe sin jerga"],
            },
            {
              name: "Empaste de composite",
              description: "Restauraciones del color del diente, esculpidas y terminadas en una sola cita.",
              price: "130 €",
              priceNote: "por diente",
              duration: "45 min",
              features: ["Resina del tono exacto", "Ajuste de mordida", "Garantía de 5 años"],
            },
            {
              name: "Tratamiento de encías",
              description:
                "Cuidado periodontal dirigido que frena el sangrado antes de que se convierta en algo mayor.",
              price: "180 €",
              priceNote: "por cuadrante",
              duration: "60 min",
              features: ["Sondaje completo", "Raspado subgingival", "Revisión de control incluida"],
            },
          ],
        },
        {
          id: "cosmetic",
          label: "Estética",
          tagline: "Mejoras sutiles con un retorno enorme en confianza.",
          treatments: [
            {
              name: "Blanqueamiento láser",
              description:
                "Hasta ocho tonos más claro en una visita, con activación lumínica segura para el esmalte.",
              price: "350 €",
              priceNote: "por sesión",
              duration: "75 min",
              features: ["Hasta 8 tonos más claro", "Gel calibrado a tu sensibilidad", "Acabado desensibilizante"],
              flag: "Estrella de la casa",
            },
            {
              name: "Alineadores invisibles",
              description:
                "Férulas transparentes planificadas en 3D, con seguimiento mensual remoto de nuestro equipo.",
              price: "desde 2.400 €",
              priceNote: "tratamiento completo",
              duration: "6-14 meses",
              features: ["Previsualización 3D", "Cambios de férula en casa", "Retenedor incluido"],
            },
            {
              name: "Carillas de porcelana",
              description: "Cerámica estratificada a mano que imita el brillo natural del esmalte.",
              price: "540 €",
              priceNote: "por diente",
              duration: "2 visitas",
              features: ["Cerámica estratificada", "Prueba estética previa", "Garantía de 7 años"],
            },
            {
              name: "Bonding de composite",
              description: "Microcorrecciones de fisuras y espacios, esculpidas a mano alzada en una sesión.",
              price: "230 €",
              priceNote: "por diente",
              duration: "60 min",
              features: ["Sin tallar el diente", "Resultado inmediato", "Pulido de brillo"],
            },
          ],
        },
        {
          id: "surgical",
          label: "Cirugía",
          tagline: "Procedimientos avanzados con precisión guiada y recuperación amable.",
          treatments: [
            {
              name: "Implante de titanio",
              description:
                "Colocación guiada en 3D con corona cerámica natural, hecha para durar décadas.",
              price: "desde 1.700 €",
              priceNote: "por implante, corona incluida",
              duration: "2-3 visitas",
              features: ["Cirugía guiada en 3D", "Corona cerámica incluida", "Revisiones de por vida"],
              flag: "Soporte de por vida",
            },
            {
              name: "Extracción de muela del juicio",
              description:
                "Extracción tranquila con anestesia completa, kit de recuperación y llamada de seguimiento al día siguiente.",
              price: "320 €",
              priceNote: "por pieza",
              duration: "45 min",
              features: ["Anestesia asistida por ordenador", "Kit de recuperación incluido", "Llamada al día siguiente"],
            },
            {
              name: "Injerto óseo",
              description: "Reconstruye el soporte para futuros implantes con materiales biocompatibles.",
              price: "desde 640 €",
              priceNote: "por zona",
              duration: "60 min",
              features: ["Materiales biocompatibles", "Planificación con TAC", "Sedación opcional"],
            },
            {
              name: "Elevación de seno",
              description:
                "Crea espacio seguro para implantes en la arcada superior con planificación milimétrica.",
              price: "desde 950 €",
              priceNote: "por lado",
              duration: "90 min",
              features: ["Precisión milimétrica", "Técnica mínimamente invasiva", "Seguimiento incluido"],
            },
          ],
        },
      ],
    },
    gallery: {
      label: "Galería de sonrisas",
      title: "Transformaciones reales, luz honesta.",
      intro:
        "Arrastra el control para comparar. Mismo paciente, misma luz, sin filtros: solo odontología bien hecha.",
      beforeLabel: "Antes",
      afterLabel: "Después",
      sliderAria: "Revelar comparación de antes y después",
      dragHint: "Arrastra para comparar",
      meta: { treatment: "Tratamiento", sessions: "Sesiones", duration: "Duración" },
      cases: [
        {
          id: "whitening",
          label: "Blanqueamiento",
          patient: "Larissa M., 29",
          treatment: "Blanqueamiento láser + pulido",
          sessions: "1 sesión",
          duration: "1 semana",
          quote: "No dejaba de sorprenderme con mi propia sonrisa en los escaparates. Valió cada céntimo.",
          alt: "Primer plano de una sonrisa luminosa tras un blanqueamiento láser",
        },
        {
          id: "aligners",
          label: "Alineadores",
          patient: "Diego F., 35",
          treatment: "Alineadores invisibles, 11 meses",
          sessions: "22 férulas",
          duration: "11 meses",
          quote: "Nadie en el trabajo notó las férulas. Todos notaron el resultado.",
          alt: "Primer plano de una sonrisa alineada tras el tratamiento con alineadores",
        },
        {
          id: "veneers",
          label: "Carillas",
          patient: "Sofia K., 42",
          treatment: "Seis carillas de porcelana",
          sessions: "3 visitas",
          duration: "5 semanas",
          quote: "Parecen mis dientes, pero en la versión que siempre imaginé.",
          alt: "Primer plano de una sonrisa natural con carillas de porcelana",
        },
      ],
    },
    team: {
      label: "Equipo",
      title: "Manos suaves, estándares obsesivos.",
      intro: "Cuatro especialistas y una misma convicción: nadie debería tener miedo del sillón dental.",
      members: [
        {
          name: "Dr. Rafael Duarte",
          role: "Director clínico · Implantología",
          registry: "CRO-RJ 41.278",
          bio: "Dieciséis años colocando implantes con cirugía guiada, y todavía celebra cada sonrisa terminada como una pequeña victoria.",
          alt: "Retrato del Dr. Rafael Duarte en la clínica",
        },
        {
          name: "Dra. Camila Rocha",
          role: "Odontología restauradora",
          registry: "CRO-SP 63.104",
          bio: "Trata cada restauración como una microescultura; sus pacientes dicen que las citas con ella relajan extrañamente.",
          alt: "La Dra. Camila Rocha realizando un procedimiento dental",
        },
        {
          name: "Dra. Aisha Okafor",
          role: "Planificación digital · Ortodoncia",
          registry: "CRO-RJ 58.930",
          bio: "Dirige nuestro laboratorio de escaneado 3D y convierte cada tratamiento en un plan que puedes ver antes de empezar.",
          alt: "La Dra. Aisha Okafor revisando un plan de tratamiento en una tableta",
        },
        {
          name: "Dr. Kenji Nakamura",
          role: "Terapia con alineadores",
          registry: "CRO-SP 71.556",
          bio: "Especialista en alineadores y enemigo declarado de los tratamientos de talla única.",
          alt: "Monograma del Dr. Kenji Nakamura",
        },
      ],
    },
    appointment: {
      label: "Reservas",
      title: "Elige un día. Elige una hora. Listo.",
      intro:
        "Elige lo que te venga bien y te guardamos el sillón. Cambiar la cita es gratis hasta 24 horas antes.",
      typeLegend: "Tipo de visita",
      dayLegend: "Esta semana",
      slotLegend: "Horas disponibles",
      morning: "Mañana",
      afternoon: "Tarde",
      bookedNote: "Ocupado",
      confirmCta: "Confirmar cita",
      disabledHint: "Elige un día y una hora para continuar",
      types: [
        { id: "checkup", label: "Primera visita + revisión", duration: "40 min" },
        { id: "cleaning", label: "Limpieza", duration: "50 min" },
        { id: "whitening", label: "Blanqueamiento", duration: "75 min" },
        { id: "emergency", label: "Urgencia", duration: "prioridad" },
      ],
      days: [
        { weekday: "Lun", day: "20", month: "jul", full: "Lunes, 20 de julio" },
        { weekday: "Mar", day: "21", month: "jul", full: "Martes, 21 de julio" },
        { weekday: "Mié", day: "22", month: "jul", full: "Miércoles, 22 de julio" },
        { weekday: "Jue", day: "23", month: "jul", full: "Jueves, 23 de julio" },
        { weekday: "Vie", day: "24", month: "jul", full: "Viernes, 24 de julio" },
        { weekday: "Sáb", day: "25", month: "jul", full: "Sábado, 25 de julio" },
      ],
      morningSlots: ["08:00", "09:30", "11:00"],
      afternoonSlots: ["13:30", "15:00", "16:30", "18:00"],
      summary: { type: "Visita", date: "Día", time: "Hora", codeLabel: "Código de reserva" },
      success: {
        title: "Cita confirmada.",
        body: "Hemos guardado tu sillón y enviado la confirmación con todo lo que necesitas. Recibirás un recordatorio 24 horas antes de tu visita.",
        another: "Reservar otra cita",
      },
    },
    faq: {
      label: "Dudas",
      title: "Preguntas que escuchamos cada semana.",
      contactTitle: "¿Aún con dudas?",
      contactBody: "Escribe a recepción: una persona real responde en menos de una hora laborable.",
      contactCta: "Hablar con nosotros",
      items: [
        {
          q: "¿Va a doler?",
          a: "Sinceramente: toda la clínica está diseñada para que la respuesta sea no. Usamos anestesia asistida por ordenador, gel anestésico templado antes de cualquier aguja y tienes una señal de pausa en todo momento.",
        },
        {
          q: "¿Trabajáis con seguros?",
          a: "Trabajamos con las principales aseguradoras dentales y verificamos tu cobertura antes del tratamiento: el precio que apruebas es el precio que pagas.",
        },
        {
          q: "¿Cuánto dura la primera visita?",
          a: "Calcula unos 40 minutos: escaneado digital, revisión de encías y una conversación sobre tus objetivos. Te vas con un plan de cuidados por escrito.",
        },
        {
          q: "¿El blanqueamiento es seguro con dientes sensibles?",
          a: "Sí. Medimos la sensibilidad primero y calibramos la concentración del gel. La mayoría de pacientes apenas nota molestias, e incluimos un acabado desensibilizante.",
        },
        {
          q: "¿Cuánto tardan los alineadores?",
          a: "Las correcciones sencillas terminan en unos 6 meses; los casos complejos, entre 12 y 14. La previsualización 3D muestra el resultado antes de decidirte.",
        },
        {
          q: "¿Puedo pagar a plazos?",
          a: "Sí: los tratamientos de más de 250 € pueden dividirse en hasta 12 mensualidades sin intereses, directamente en recepción.",
        },
      ],
    },
    footer: {
      blurb: "Un estudio dental tranquilo y lleno de luz, donde la precisión y la amabilidad comparten sillón.",
      addressTitle: "Dónde estamos",
      addressLines: ["Lumina Dental Studio", "Av. das Gaivotas 218, oficina 305", "Barra da Tijuca, Río de Janeiro"],
      hoursTitle: "Horario",
      hours: [
        { days: "Lun - Vie", time: "8:00 - 19:00" },
        { days: "Sábado", time: "9:00 - 14:00" },
        { days: "Domingo", time: "Cerrado" },
      ],
      contactTitle: "Contacto",
      phone: "+55 21 3555 0184",
      email: "smile@luminadental.clinic",
      navTitle: "Explora",
      nav: [
        { href: "#treatments", label: "Tratamientos" },
        { href: "#gallery", label: "Galería de sonrisas" },
        { href: "#team", label: "Equipo" },
        { href: "#appointment", label: "Reservar cita" },
      ],
      social: [{ label: "Instagram" }, { label: "Facebook" }, { label: "WhatsApp" }],
      legal: "Lumina Dental es una marca ficticia creada como concepto de porfolio. © 2026",
    },
  },
};
