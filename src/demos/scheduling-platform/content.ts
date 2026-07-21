import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

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
  sub: string;
  stats: { value: string; label: string }[];
  trustNote: string;
  chips: { booked: string; synced: string };
}

export interface EventTypeContent {
  id: string;
  name: string;
  durationLabel: string;
  channel: string;
  description: string;
}

export interface BookingContent {
  hostName: string;
  hostRole: string;
  widgetBadge: string;
  stepLabels: string[];
  chooseEventTitle: string;
  chooseDayTitle: string;
  chooseTimeTitle: string;
  months: string[];
  /** Monday-first, for the calendar grid header. */
  weekdaysShort: string[];
  /** Sunday-first, indexed by Date.getUTCDay(). */
  weekdaysLong: string[];
  timezone: string;
  back: string;
  prevMonth: string;
  nextMonth: string;
  unavailableHint: string;
  confirmTitle: string;
  summaryEvent: string;
  summaryDate: string;
  summaryTime: string;
  summaryHost: string;
  confirmCta: string;
  successTitle: string;
  successBody: string;
  refLabel: string;
  addToCalendar: string;
  addedToCalendar: string;
  bookAnother: string;
  /** Tokens: {weekday} {day} {month} */
  dateTemplate: string;
  eventTypes: EventTypeContent[];
}

export interface FeatureItemContent {
  id: "calendars" | "reminders" | "payments";
  title: string;
  body: string;
  bullets: string[];
}

export interface FeaturesContent {
  label: string;
  title: string;
  intro: string;
  items: FeatureItemContent[];
  vignettes: {
    calendars: { badge: string; events: string[] };
    reminders: { channel: string; text: string; time: string }[];
    payments: { invoice: string; item: string; amount: string; paid: string; note: string };
  };
}

export interface IntegrationItemContent {
  id: string;
  name: string;
  blurb: string;
}

export interface IntegrationsContent {
  label: string;
  title: string;
  intro: string;
  connect: string;
  connected: string;
  /** Tokens: {count} {total} */
  counter: string;
  items: IntegrationItemContent[];
}

export interface TeamsContent {
  label: string;
  title: string;
  intro: string;
  modes: { id: "robin" | "collective"; label: string; blurb: string }[];
  cardTitle: string;
  members: { name: string; role: string }[];
  nextUp: string;
  joins: string;
  simulate: string;
  features: string[];
}

export interface PricingPlanContent {
  id: string;
  name: string;
  blurb: string;
  monthly: number;
  annual: number;
  freeLabel?: string;
  popular?: boolean;
  features: string[];
  cta: string;
}

export interface PricingContent {
  label: string;
  title: string;
  intro: string;
  seatsLabel: string;
  /** Token: {count} */
  seatsValue: string;
  seatsValueOne: string;
  billingMonthly: string;
  billingAnnual: string;
  annualNote: string;
  perSeatSuffix: string;
  totalLabel: string;
  totalSuffix: string;
  popularBadge: string;
  priceLocale: string;
  currency: string;
  plans: PricingPlanContent[];
  footnote: string;
}

export interface TestimonialsContent {
  label: string;
  title: string;
  ratingLabel: string;
  items: { quote: string; name: string; role: string }[];
}

export interface CtaContent {
  title: string;
  sub: string;
  button: string;
  note: string;
}

export interface FooterContent {
  tagline: string;
  exploreLabel: string;
  nav: { href: string; label: string }[];
  contactLabel: string;
  contactLines: string[];
  email: string;
  followLabel: string;
  channels: { id: "docs" | "community" | "status"; label: string }[];
  legal: string;
  fictional: string;
}

export interface SlotlyContent {
  header: HeaderContent;
  hero: HeroContent;
  booking: BookingContent;
  features: FeaturesContent;
  integrations: IntegrationsContent;
  teams: TeamsContent;
  pricing: PricingContent;
  testimonials: TestimonialsContent;
  cta: CtaContent;
  footer: FooterContent;
}

/* ------------------------------------------------------------------ */
/* Dictionary                                                          */
/* ------------------------------------------------------------------ */

export const slotlyDict: DemoDictionary<SlotlyContent> = {
  en: {
    header: {
      nav: [
        { href: "#features", label: "Product" },
        { href: "#integrations", label: "Integrations" },
        { href: "#teams", label: "Teams" },
        { href: "#pricing", label: "Pricing" },
        { href: "#stories", label: "Stories" },
      ],
      cta: "Book a demo",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      kicker: "Scheduling, minus the back-and-forth",
      titleTop: "Share one link.",
      titleAccent: "Fill your calendar.",
      sub: "Slotly turns your availability into a booking page people love to use. No email ping-pong, no double bookings, no awkward timezone math.",
      stats: [
        { value: "2.4M+", label: "meetings booked every month" },
        { value: "38s", label: "median time from link to booked" },
        { value: "99.99%", label: "calendar sync uptime" },
      ],
      trustNote: "Free for individuals. No credit card required.",
      chips: { booked: "Booked", synced: "Synced" },
    },
    booking: {
      hostName: "Bianca Almeida",
      hostRole: "Product specialist at Slotly",
      widgetBadge: "Live widget — go ahead, book a slot",
      stepLabels: ["Event", "Day", "Time"],
      chooseEventTitle: "What should we talk about?",
      chooseDayTitle: "Pick a day",
      chooseTimeTitle: "Pick a time",
      months: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
      ],
      weekdaysShort: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      weekdaysLong: [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
      ],
      timezone: "Timezone: GMT-3 · São Paulo",
      back: "Back",
      prevMonth: "Previous month",
      nextMonth: "Next month",
      unavailableHint: "Greyed-out days are unavailable",
      confirmTitle: "Almost there",
      summaryEvent: "Event",
      summaryDate: "Date",
      summaryTime: "Time",
      summaryHost: "Host",
      confirmCta: "Confirm booking",
      successTitle: "You’re booked!",
      successBody: "A confirmation and calendar invite are on their way to your inbox. Change of plans? Reschedule in one click from the invite.",
      refLabel: "Booking reference",
      addToCalendar: "Add to calendar",
      addedToCalendar: "Added to calendar",
      bookAnother: "Book another slot",
      dateTemplate: "{weekday}, {month} {day}",
      eventTypes: [
        {
          id: "intro",
          name: "Quick intro",
          durationLabel: "15 min",
          channel: "Video call",
          description: "A fast hello to see whether Slotly fits the way your team works.",
        },
        {
          id: "tour",
          name: "Product tour",
          durationLabel: "30 min",
          channel: "Video call",
          description: "A guided walkthrough: booking pages, routing, reminders and admin.",
        },
        {
          id: "rollout",
          name: "Rollout planning",
          durationLabel: "45 min",
          channel: "Video call",
          description: "Map seats, migration and launch day with a scheduling specialist.",
        },
      ],
    },
    features: {
      label: "Product",
      title: "Built for the whole life of a meeting",
      intro: "Three pillars keep your schedule honest: calendars that never drift, reminders that cut no-shows, and payments that clear before anyone joins the call.",
      items: [
        {
          id: "calendars",
          title: "Calendars in lockstep",
          body: "Slotly checks every connected calendar before it ever offers a slot, so conflicts simply cannot happen.",
          bullets: [
            "Two-way sync with Google, Outlook and iCloud",
            "Buffers, minimum notice and daily meeting caps",
            "Timezone-safe by design, DST included",
          ],
        },
        {
          id: "reminders",
          title: "Reminders people actually read",
          body: "Layer email and SMS nudges around every booking and watch no-shows fall off a cliff.",
          bullets: [
            "Sequences at 24h, 1h and 10 minutes before",
            "One-tap reschedule links in every message",
            "Quiet hours that respect your invitees",
          ],
        },
        {
          id: "payments",
          title: "Paid before it starts",
          body: "Charge for sessions at the moment of booking with Stripe or PayPal: deposits, full price or no-show fees.",
          bullets: [
            "Checkout inside the booking flow",
            "Automatic receipts and refunds",
            "No-show protection with card on file",
          ],
        },
      ],
      vignettes: {
        calendars: {
          badge: "Synced 12s ago",
          events: ["Demo · Acme Corp", "1:1 · Bianca", "Rollout · Kite Labs"],
        },
        reminders: [
          { channel: "Email", text: "See you tomorrow at 09:30", time: "24h before" },
          { channel: "SMS", text: "Starting in 1 hour — join link inside", time: "1h before" },
          { channel: "Email", text: "Bianca is waiting in the room", time: "10 min before" },
        ],
        payments: {
          invoice: "Strategy session",
          item: "60 min · video",
          amount: "$120.00",
          paid: "Paid",
          note: "Receipt sent automatically",
        },
      },
    },
    integrations: {
      label: "Integrations",
      title: "Plays nicely with your stack",
      intro: "Connect the tools you already live in. Click a tile to connect it — this wall is live, like everything else on this page.",
      connect: "Connect",
      connected: "Connected",
      counter: "{count} of {total} connected",
      items: [
        { id: "gcal", name: "Google Calendar", blurb: "Two-way sync, instant conflict checks" },
        { id: "outlook", name: "Outlook Calendar", blurb: "Full sync for Microsoft 365" },
        { id: "zoom", name: "Zoom", blurb: "Unique meeting links per booking" },
        { id: "meet", name: "Google Meet", blurb: "Video rooms attached automatically" },
        { id: "slack", name: "Slack", blurb: "Booking alerts in your channels" },
        { id: "stripe", name: "Stripe", blurb: "Payments and no-show fees" },
        { id: "notion", name: "Notion", blurb: "Meeting notes, pre-filled" },
        { id: "hubspot", name: "HubSpot", blurb: "Contacts and deals kept fresh" },
        { id: "salesforce", name: "Salesforce", blurb: "Events logged on every record" },
        { id: "msteams", name: "Microsoft Teams", blurb: "Enterprise-ready video links" },
        { id: "zapier", name: "Zapier", blurb: "6,000+ apps via zaps" },
        { id: "linear", name: "Linear", blurb: "Issues from every debrief" },
      ],
    },
    teams: {
      label: "Teams",
      title: "One link for the whole team",
      intro: "Route every booking to the right person, or get everyone in the same room. Slotly balances load, respects territories and keeps reporting in one place.",
      modes: [
        {
          id: "robin",
          label: "Round robin",
          blurb: "Bookings rotate through the team automatically, weighted for fairness and adjusted when someone is away.",
        },
        {
          id: "collective",
          label: "Collective",
          blurb: "Slotly finds the one slot when every required teammate is free. No spreadsheet archaeology.",
        },
      ],
      cardTitle: "Sales team · Product tour",
      members: [
        { name: "Ana Beltrão", role: "Account executive" },
        { name: "Diego Farias", role: "Solutions engineer" },
        { name: "Yuki Tanaka", role: "Account executive" },
        { name: "Sofía Herrera", role: "Sales manager" },
      ],
      nextUp: "Next up",
      joins: "Joins",
      simulate: "Simulate a booking",
      features: [
        "Fairness weighting with instant rebalancing",
        "Priority routing by language or territory",
        "Team pages with shared branding and analytics",
      ],
    },
    pricing: {
      label: "Pricing",
      title: "Simple per-seat pricing",
      intro: "Start free, upgrade when the team does. Slide to your team size and watch the numbers do the honest thing.",
      seatsLabel: "Team size",
      seatsValue: "{count} seats",
      seatsValueOne: "1 seat",
      billingMonthly: "Monthly",
      billingAnnual: "Annual",
      annualNote: "2 months free",
      perSeatSuffix: "per seat / month",
      totalLabel: "Your total",
      totalSuffix: "/ month",
      popularBadge: "Most popular",
      priceLocale: "en-US",
      currency: "USD",
      plans: [
        {
          id: "starter",
          name: "Starter",
          blurb: "For individuals getting booked",
          monthly: 0,
          annual: 0,
          freeLabel: "Free",
          features: [
            "Unlimited bookings",
            "1 event type",
            "Google and Outlook sync",
            "Slotly branding",
          ],
          cta: "Start free",
        },
        {
          id: "pro",
          name: "Pro",
          blurb: "For teams that live by the calendar",
          monthly: 12,
          annual: 10,
          popular: true,
          features: [
            "Unlimited event types",
            "Email and SMS reminders",
            "Round robin and collective events",
            "Custom branding",
          ],
          cta: "Start 14-day trial",
        },
        {
          id: "scale",
          name: "Scale",
          blurb: "For companies with rules to follow",
          monthly: 20,
          annual: 16,
          features: [
            "SSO, SCIM and audit log",
            "Advanced routing forms",
            "Salesforce and HubSpot sync",
            "Priority support",
          ],
          cta: "Talk to sales",
        },
      ],
      footnote: "Prices per seat, billed in USD. Switch or cancel anytime.",
    },
    testimonials: {
      label: "Stories",
      title: "Calendars, calmed",
      ratingLabel: "Rated 5 out of 5",
      items: [
        {
          quote: "No-shows dropped 43% in the first month. The reminder sequences alone pay for every seat we own.",
          name: "Marina Duarte",
          role: "Head of Sales, Nubik",
        },
        {
          quote: "I send one link and the week fills itself. My clients think I hired an assistant. It is just Slotly.",
          name: "Tom Becker",
          role: "Founder, Brightpath Coaching",
        },
        {
          quote: "Routing sends enterprise leads straight to senior reps. Setup took an afternoon, not a quarter.",
          name: "Camila Reyes",
          role: "Customer Success Lead, Aurora Labs",
        },
      ],
    },
    cta: {
      title: "Ready to fill your calendar the calm way?",
      sub: "Set up your first booking page in under five minutes. Your inbox will notice the silence.",
      button: "Start free with Slotly",
      note: "No credit card · Free for individuals · Cancel anytime",
    },
    footer: {
      tagline: "The friendly scheduling layer for calendars that work hard.",
      exploreLabel: "Explore",
      nav: [
        { href: "#book", label: "Booking widget" },
        { href: "#features", label: "Product" },
        { href: "#integrations", label: "Integrations" },
        { href: "#teams", label: "Team scheduling" },
        { href: "#pricing", label: "Pricing" },
      ],
      contactLabel: "Company",
      contactLines: ["Avenida Paulista 1374, 11th floor", "São Paulo, Brazil", "Remote-first · GMT-3"],
      email: "hello@slotly.app",
      followLabel: "Channels",
      channels: [
        { id: "docs", label: "docs.slotly.app" },
        { id: "community", label: "community.slotly.app" },
        { id: "status", label: "status.slotly.app" },
      ],
      legal: "© 2026 Slotly Scheduling, Inc. All rights reserved.",
      fictional: "Slotly is a fictional brand concept designed by VigApp.",
    },
  },

  pt: {
    header: {
      nav: [
        { href: "#features", label: "Produto" },
        { href: "#integrations", label: "Integrações" },
        { href: "#teams", label: "Times" },
        { href: "#pricing", label: "Planos" },
        { href: "#stories", label: "Histórias" },
      ],
      cta: "Agendar demo",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
    },
    hero: {
      kicker: "Agendamento sem vaivém de e-mails",
      titleTop: "Compartilhe um link.",
      titleAccent: "Lote sua agenda.",
      sub: "O Slotly transforma sua disponibilidade em uma página de agendamento que as pessoas adoram usar. Sem pingue-pongue de e-mails, sem conflitos, sem matemática de fuso horário.",
      stats: [
        { value: "2,4 mi+", label: "reuniões agendadas por mês" },
        { value: "38s", label: "tempo mediano do link à reserva" },
        { value: "99,99%", label: "uptime de sincronização" },
      ],
      trustNote: "Grátis para uso individual. Sem cartão de crédito.",
      chips: { booked: "Reservado", synced: "Sincronizado" },
    },
    booking: {
      hostName: "Bianca Almeida",
      hostRole: "Especialista de produto no Slotly",
      widgetBadge: "Widget ao vivo — pode agendar",
      stepLabels: ["Evento", "Dia", "Hora"],
      chooseEventTitle: "Sobre o que vamos falar?",
      chooseDayTitle: "Escolha um dia",
      chooseTimeTitle: "Escolha um horário",
      months: [
        "janeiro", "fevereiro", "março", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
      ],
      weekdaysShort: ["seg", "ter", "qua", "qui", "sex", "sáb", "dom"],
      weekdaysLong: [
        "domingo", "segunda-feira", "terça-feira", "quarta-feira",
        "quinta-feira", "sexta-feira", "sábado",
      ],
      timezone: "Fuso horário: GMT-3 · São Paulo",
      back: "Voltar",
      prevMonth: "Mês anterior",
      nextMonth: "Próximo mês",
      unavailableHint: "Dias em cinza estão indisponíveis",
      confirmTitle: "Quase lá",
      summaryEvent: "Evento",
      summaryDate: "Data",
      summaryTime: "Horário",
      summaryHost: "Anfitriã",
      confirmCta: "Confirmar agendamento",
      successTitle: "Agendado!",
      successBody: "A confirmação e o convite de calendário já estão a caminho do seu e-mail. Mudou de planos? Reagende com um clique pelo próprio convite.",
      refLabel: "Código da reserva",
      addToCalendar: "Adicionar ao calendário",
      addedToCalendar: "Adicionado ao calendário",
      bookAnother: "Agendar outro horário",
      dateTemplate: "{weekday}, {day} de {month}",
      eventTypes: [
        {
          id: "intro",
          name: "Papo rápido",
          durationLabel: "15 min",
          channel: "Chamada de vídeo",
          description: "Uma conversa rápida para ver se o Slotly combina com o seu time.",
        },
        {
          id: "tour",
          name: "Tour pelo produto",
          durationLabel: "30 min",
          channel: "Chamada de vídeo",
          description: "Um passeio guiado: páginas de agendamento, roteamento, lembretes e administração.",
        },
        {
          id: "rollout",
          name: "Planejamento de rollout",
          durationLabel: "45 min",
          channel: "Chamada de vídeo",
          description: "Desenhe assentos, migração e dia de lançamento com uma especialista.",
        },
      ],
    },
    features: {
      label: "Produto",
      title: "Feito para a vida inteira de uma reunião",
      intro: "Três pilares mantêm sua agenda honesta: calendários que nunca desalinham, lembretes que derrubam faltas e pagamentos que caem antes de a chamada começar.",
      items: [
        {
          id: "calendars",
          title: "Calendários em sintonia",
          body: "O Slotly verifica todos os calendários conectados antes de oferecer qualquer horário. Conflito, aqui, simplesmente não existe.",
          bullets: [
            "Sincronização bidirecional com Google, Outlook e iCloud",
            "Intervalos, antecedência mínima e teto diário de reuniões",
            "À prova de fuso horário, horário de verão incluso",
          ],
        },
        {
          id: "reminders",
          title: "Lembretes que as pessoas leem",
          body: "Combine e-mail e SMS ao redor de cada reserva e veja as faltas despencarem.",
          bullets: [
            "Sequências 24h, 1h e 10 minutos antes",
            "Link de reagendamento em toda mensagem",
            "Horário de silêncio que respeita seus convidados",
          ],
        },
        {
          id: "payments",
          title: "Pago antes de começar",
          body: "Cobre pelas sessões no momento da reserva com Stripe ou PayPal: sinal, valor cheio ou taxa de não comparecimento.",
          bullets: [
            "Checkout dentro do fluxo de agendamento",
            "Recibos e reembolsos automáticos",
            "Proteção contra faltas com cartão salvo",
          ],
        },
      ],
      vignettes: {
        calendars: {
          badge: "Sincronizado há 12s",
          events: ["Demo · Acme Corp", "1:1 · Bianca", "Rollout · Kite Labs"],
        },
        reminders: [
          { channel: "E-mail", text: "Até amanhã às 09:30", time: "24h antes" },
          { channel: "SMS", text: "Começa em 1 hora — link na mensagem", time: "1h antes" },
          { channel: "E-mail", text: "A Bianca já está na sala", time: "10 min antes" },
        ],
        payments: {
          invoice: "Sessão de estratégia",
          item: "60 min · vídeo",
          amount: "R$ 480,00",
          paid: "Pago",
          note: "Recibo enviado automaticamente",
        },
      },
    },
    integrations: {
      label: "Integrações",
      title: "Conversa bem com o seu stack",
      intro: "Conecte as ferramentas em que você já vive. Clique em um bloco para conectar — este mural é vivo, como tudo nesta página.",
      connect: "Conectar",
      connected: "Conectado",
      counter: "{count} de {total} conectadas",
      items: [
        { id: "gcal", name: "Google Calendar", blurb: "Sincronização bidirecional sem conflitos" },
        { id: "outlook", name: "Outlook Calendar", blurb: "Sincronização completa com Microsoft 365" },
        { id: "zoom", name: "Zoom", blurb: "Link exclusivo por reserva" },
        { id: "meet", name: "Google Meet", blurb: "Salas de vídeo anexadas automaticamente" },
        { id: "slack", name: "Slack", blurb: "Alertas de reserva nos seus canais" },
        { id: "stripe", name: "Stripe", blurb: "Pagamentos e taxas de não comparecimento" },
        { id: "notion", name: "Notion", blurb: "Notas de reunião pré-preenchidas" },
        { id: "hubspot", name: "HubSpot", blurb: "Contatos e negócios sempre em dia" },
        { id: "salesforce", name: "Salesforce", blurb: "Eventos registrados em cada ficha" },
        { id: "msteams", name: "Microsoft Teams", blurb: "Vídeo pronto para o corporativo" },
        { id: "zapier", name: "Zapier", blurb: "Mais de 6.000 apps via zaps" },
        { id: "linear", name: "Linear", blurb: "Issues criadas a cada debrief" },
      ],
    },
    teams: {
      label: "Times",
      title: "Um link para o time inteiro",
      intro: "Encaminhe cada reserva para a pessoa certa, ou reúna todo mundo na mesma sala. O Slotly equilibra a carga, respeita territórios e concentra os relatórios num só lugar.",
      modes: [
        {
          id: "robin",
          label: "Rodízio",
          blurb: "As reservas giram pelo time automaticamente, com peso de justiça e ajuste quando alguém está fora.",
        },
        {
          id: "collective",
          label: "Coletivo",
          blurb: "O Slotly encontra o horário em que todas as pessoas necessárias estão livres. Sem arqueologia de planilha.",
        },
      ],
      cardTitle: "Time de vendas · Tour pelo produto",
      members: [
        { name: "Ana Beltrão", role: "Executiva de contas" },
        { name: "Diego Farias", role: "Engenheiro de soluções" },
        { name: "Yuki Tanaka", role: "Executiva de contas" },
        { name: "Sofía Herrera", role: "Gerente de vendas" },
      ],
      nextUp: "Na vez",
      joins: "Participa",
      simulate: "Simular uma reserva",
      features: [
        "Peso de justiça com reequilíbrio instantâneo",
        "Roteamento prioritário por idioma ou território",
        "Páginas de time com marca e análises compartilhadas",
      ],
    },
    pricing: {
      label: "Planos",
      title: "Preço simples, por assento",
      intro: "Comece grátis e evolua junto com o time. Arraste até o seu tamanho de equipe e veja os números fazerem a coisa honesta.",
      seatsLabel: "Tamanho do time",
      seatsValue: "{count} assentos",
      seatsValueOne: "1 assento",
      billingMonthly: "Mensal",
      billingAnnual: "Anual",
      annualNote: "2 meses grátis",
      perSeatSuffix: "por assento / mês",
      totalLabel: "Seu total",
      totalSuffix: "/ mês",
      popularBadge: "Mais popular",
      priceLocale: "pt-BR",
      currency: "BRL",
      plans: [
        {
          id: "starter",
          name: "Starter",
          blurb: "Para quem agenda sozinho",
          monthly: 0,
          annual: 0,
          freeLabel: "Grátis",
          features: [
            "Reservas ilimitadas",
            "1 tipo de evento",
            "Sincronização Google e Outlook",
            "Marca Slotly",
          ],
          cta: "Começar grátis",
        },
        {
          id: "pro",
          name: "Pro",
          blurb: "Para times que vivem de agenda",
          monthly: 59,
          annual: 47,
          popular: true,
          features: [
            "Tipos de evento ilimitados",
            "Lembretes por e-mail e SMS",
            "Eventos em rodízio e coletivos",
            "Marca personalizada",
          ],
          cta: "Testar por 14 dias",
        },
        {
          id: "scale",
          name: "Scale",
          blurb: "Para empresas com regras a seguir",
          monthly: 99,
          annual: 79,
          features: [
            "SSO, SCIM e log de auditoria",
            "Formulários de roteamento avançado",
            "Sincronização Salesforce e HubSpot",
            "Suporte prioritário",
          ],
          cta: "Falar com vendas",
        },
      ],
      footnote: "Preços por assento, cobrados em reais. Troque ou cancele quando quiser.",
    },
    testimonials: {
      label: "Histórias",
      title: "Agendas em paz",
      ratingLabel: "Nota 5 de 5",
      items: [
        {
          quote: "As faltas caíram 43% no primeiro mês. Só as sequências de lembrete já pagam todos os assentos que temos.",
          name: "Marina Duarte",
          role: "Head de Vendas, Nubik",
        },
        {
          quote: "Envio um link e a semana se preenche sozinha. Meus clientes acham que contratei assistente. É só o Slotly.",
          name: "Tom Becker",
          role: "Fundador, Brightpath Coaching",
        },
        {
          quote: "O roteamento manda leads enterprise direto para os consultores seniores. A configuração levou uma tarde, não um trimestre.",
          name: "Camila Reyes",
          role: "Líder de Customer Success, Aurora Labs",
        },
      ],
    },
    cta: {
      title: "Pronto para lotar a agenda do jeito calmo?",
      sub: "Monte sua primeira página de agendamento em menos de cinco minutos. Sua caixa de entrada vai estranhar o silêncio.",
      button: "Começar grátis no Slotly",
      note: "Sem cartão de crédito · Grátis para uso individual · Cancele quando quiser",
    },
    footer: {
      tagline: "A camada amigável de agendamento para agendas que trabalham duro.",
      exploreLabel: "Explorar",
      nav: [
        { href: "#book", label: "Widget de agendamento" },
        { href: "#features", label: "Produto" },
        { href: "#integrations", label: "Integrações" },
        { href: "#teams", label: "Agendamento em equipe" },
        { href: "#pricing", label: "Planos" },
      ],
      contactLabel: "Empresa",
      contactLines: ["Avenida Paulista 1374, 11º andar", "São Paulo, Brasil", "Remote-first · GMT-3"],
      email: "ola@slotly.app",
      followLabel: "Canais",
      channels: [
        { id: "docs", label: "docs.slotly.app" },
        { id: "community", label: "community.slotly.app" },
        { id: "status", label: "status.slotly.app" },
      ],
      legal: "© 2026 Slotly Scheduling, Inc. Todos os direitos reservados.",
      fictional: "Slotly é um conceito de marca fictício criado pela VigApp.",
    },
  },

  es: {
    header: {
      nav: [
        { href: "#features", label: "Producto" },
        { href: "#integrations", label: "Integraciones" },
        { href: "#teams", label: "Equipos" },
        { href: "#pricing", label: "Precios" },
        { href: "#stories", label: "Historias" },
      ],
      cta: "Reservar una demo",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
    },
    hero: {
      kicker: "Agenda sin idas y vueltas",
      titleTop: "Comparte un enlace.",
      titleAccent: "Llena tu calendario.",
      sub: "Slotly convierte tu disponibilidad en una página de reservas que la gente disfruta usar. Sin ping-pong de correos, sin dobles reservas, sin malabares con zonas horarias.",
      stats: [
        { value: "2,4 M+", label: "reuniones agendadas al mes" },
        { value: "38 s", label: "mediana del enlace a la reserva" },
        { value: "99,99%", label: "disponibilidad de sincronización" },
      ],
      trustNote: "Gratis para uso individual. Sin tarjeta de crédito.",
      chips: { booked: "Reservado", synced: "Sincronizado" },
    },
    booking: {
      hostName: "Bianca Almeida",
      hostRole: "Especialista de producto en Slotly",
      widgetBadge: "Widget en vivo — prueba a reservar",
      stepLabels: ["Evento", "Día", "Hora"],
      chooseEventTitle: "¿De qué hablamos?",
      chooseDayTitle: "Elige un día",
      chooseTimeTitle: "Elige una hora",
      months: [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
      ],
      weekdaysShort: ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"],
      weekdaysLong: [
        "domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado",
      ],
      timezone: "Zona horaria: GMT-3 · São Paulo",
      back: "Atrás",
      prevMonth: "Mes anterior",
      nextMonth: "Mes siguiente",
      unavailableHint: "Los días en gris no están disponibles",
      confirmTitle: "Casi listo",
      summaryEvent: "Evento",
      summaryDate: "Fecha",
      summaryTime: "Hora",
      summaryHost: "Anfitriona",
      confirmCta: "Confirmar reserva",
      successTitle: "¡Reserva confirmada!",
      successBody: "La confirmación y la invitación de calendario van de camino a tu correo. ¿Cambio de planes? Reagenda con un clic desde la propia invitación.",
      refLabel: "Referencia de la reserva",
      addToCalendar: "Añadir al calendario",
      addedToCalendar: "Añadido al calendario",
      bookAnother: "Reservar otro horario",
      dateTemplate: "{weekday}, {day} de {month}",
      eventTypes: [
        {
          id: "intro",
          name: "Presentación rápida",
          durationLabel: "15 min",
          channel: "Videollamada",
          description: "Una charla breve para ver si Slotly encaja con tu equipo.",
        },
        {
          id: "tour",
          name: "Tour del producto",
          durationLabel: "30 min",
          channel: "Videollamada",
          description: "Un recorrido guiado: páginas de reserva, enrutamiento, recordatorios y administración.",
        },
        {
          id: "rollout",
          name: "Plan de despliegue",
          durationLabel: "45 min",
          channel: "Videollamada",
          description: "Define puestos, migración y día de lanzamiento con una especialista.",
        },
      ],
    },
    features: {
      label: "Producto",
      title: "Pensado para toda la vida de una reunión",
      intro: "Tres pilares mantienen tu agenda honesta: calendarios que nunca se desincronizan, recordatorios que reducen las ausencias y cobros que llegan antes de la llamada.",
      items: [
        {
          id: "calendars",
          title: "Calendarios al compás",
          body: "Slotly revisa todos los calendarios conectados antes de ofrecer un hueco: los conflictos, sencillamente, no existen.",
          bullets: [
            "Sincronización bidireccional con Google, Outlook e iCloud",
            "Márgenes, antelación mínima y tope diario de reuniones",
            "A prueba de zonas horarias, cambio de hora incluido",
          ],
        },
        {
          id: "reminders",
          title: "Recordatorios que sí se leen",
          body: "Combina correo y SMS alrededor de cada reserva y mira cómo se desploman las ausencias.",
          bullets: [
            "Secuencias 24 h, 1 h y 10 minutos antes",
            "Enlace para reagendar en cada mensaje",
            "Horas de silencio que respetan a tus invitados",
          ],
        },
        {
          id: "payments",
          title: "Cobrado antes de empezar",
          body: "Cobra tus sesiones en el momento de la reserva con Stripe o PayPal: señal, importe completo o cargo por ausencia.",
          bullets: [
            "Pago dentro del propio flujo de reserva",
            "Recibos y reembolsos automáticos",
            "Protección ante ausencias con tarjeta guardada",
          ],
        },
      ],
      vignettes: {
        calendars: {
          badge: "Sincronizado hace 12 s",
          events: ["Demo · Acme Corp", "1:1 · Bianca", "Rollout · Kite Labs"],
        },
        reminders: [
          { channel: "Correo", text: "Nos vemos mañana a las 09:30", time: "24 h antes" },
          { channel: "SMS", text: "Empieza en 1 hora — enlace dentro", time: "1 h antes" },
          { channel: "Correo", text: "Bianca ya está en la sala", time: "10 min antes" },
        ],
        payments: {
          invoice: "Sesión de estrategia",
          item: "60 min · vídeo",
          amount: "120,00 €",
          paid: "Pagado",
          note: "Recibo enviado automáticamente",
        },
      },
    },
    integrations: {
      label: "Integraciones",
      title: "Se lleva bien con tu stack",
      intro: "Conecta las herramientas en las que ya vives. Haz clic en una tarjeta para conectarla: este muro está vivo, como todo en esta página.",
      connect: "Conectar",
      connected: "Conectada",
      counter: "{count} de {total} conectadas",
      items: [
        { id: "gcal", name: "Google Calendar", blurb: "Sincronización bidireccional sin conflictos" },
        { id: "outlook", name: "Outlook Calendar", blurb: "Sincronización completa con Microsoft 365" },
        { id: "zoom", name: "Zoom", blurb: "Enlace único por reserva" },
        { id: "meet", name: "Google Meet", blurb: "Salas de vídeo adjuntas automáticamente" },
        { id: "slack", name: "Slack", blurb: "Avisos de reserva en tus canales" },
        { id: "stripe", name: "Stripe", blurb: "Cobros y cargos por ausencia" },
        { id: "notion", name: "Notion", blurb: "Notas de reunión prerrellenadas" },
        { id: "hubspot", name: "HubSpot", blurb: "Contactos y negocios al día" },
        { id: "salesforce", name: "Salesforce", blurb: "Eventos registrados en cada ficha" },
        { id: "msteams", name: "Microsoft Teams", blurb: "Vídeo listo para el corporativo" },
        { id: "zapier", name: "Zapier", blurb: "Más de 6.000 apps vía zaps" },
        { id: "linear", name: "Linear", blurb: "Issues creadas tras cada sesión" },
      ],
    },
    teams: {
      label: "Equipos",
      title: "Un enlace para todo el equipo",
      intro: "Dirige cada reserva a la persona adecuada, o junta a todos en la misma sala. Slotly reparte la carga, respeta territorios y concentra los informes en un solo sitio.",
      modes: [
        {
          id: "robin",
          label: "Rotativo",
          blurb: "Las reservas rotan por el equipo automáticamente, con pesos de equidad y ajustes cuando alguien está fuera.",
        },
        {
          id: "collective",
          label: "Colectivo",
          blurb: "Slotly encuentra el hueco en el que todas las personas necesarias están libres. Sin arqueología de hojas de cálculo.",
        },
      ],
      cardTitle: "Equipo de ventas · Tour del producto",
      members: [
        { name: "Ana Beltrão", role: "Ejecutiva de cuentas" },
        { name: "Diego Farias", role: "Ingeniero de soluciones" },
        { name: "Yuki Tanaka", role: "Ejecutiva de cuentas" },
        { name: "Sofía Herrera", role: "Gerente de ventas" },
      ],
      nextUp: "Le toca",
      joins: "Participa",
      simulate: "Simular una reserva",
      features: [
        "Equidad con reequilibrio instantáneo",
        "Enrutamiento prioritario por idioma o territorio",
        "Páginas de equipo con marca y analítica compartidas",
      ],
    },
    pricing: {
      label: "Precios",
      title: "Precio simple por puesto",
      intro: "Empieza gratis y crece con tu equipo. Desliza hasta tu tamaño y mira cómo los números hacen lo correcto.",
      seatsLabel: "Tamaño del equipo",
      seatsValue: "{count} puestos",
      seatsValueOne: "1 puesto",
      billingMonthly: "Mensual",
      billingAnnual: "Anual",
      annualNote: "2 meses gratis",
      perSeatSuffix: "por puesto / mes",
      totalLabel: "Tu total",
      totalSuffix: "/ mes",
      popularBadge: "El más elegido",
      priceLocale: "es-ES",
      currency: "EUR",
      plans: [
        {
          id: "starter",
          name: "Starter",
          blurb: "Para quien agenda en solitario",
          monthly: 0,
          annual: 0,
          freeLabel: "Gratis",
          features: [
            "Reservas ilimitadas",
            "1 tipo de evento",
            "Sincronización con Google y Outlook",
            "Marca de Slotly",
          ],
          cta: "Empezar gratis",
        },
        {
          id: "pro",
          name: "Pro",
          blurb: "Para equipos que viven del calendario",
          monthly: 11,
          annual: 9,
          popular: true,
          features: [
            "Tipos de evento ilimitados",
            "Recordatorios por correo y SMS",
            "Eventos rotativos y colectivos",
            "Marca personalizada",
          ],
          cta: "Prueba de 14 días",
        },
        {
          id: "scale",
          name: "Scale",
          blurb: "Para empresas con normas que cumplir",
          monthly: 19,
          annual: 15,
          features: [
            "SSO, SCIM y registro de auditoría",
            "Formularios de enrutamiento avanzado",
            "Sincronización con Salesforce y HubSpot",
            "Soporte prioritario",
          ],
          cta: "Hablar con ventas",
        },
      ],
      footnote: "Precios por puesto, facturados en euros. Cambia o cancela cuando quieras.",
    },
    testimonials: {
      label: "Historias",
      title: "Calendarios en calma",
      ratingLabel: "Valorado 5 de 5",
      items: [
        {
          quote: "Las ausencias cayeron un 43% el primer mes. Solo las secuencias de recordatorio ya pagan todos nuestros puestos.",
          name: "Marina Duarte",
          role: "Directora de Ventas, Nubik",
        },
        {
          quote: "Envío un enlace y la semana se llena sola. Mis clientes creen que contraté asistente. Es solo Slotly.",
          name: "Tom Becker",
          role: "Fundador, Brightpath Coaching",
        },
        {
          quote: "El enrutamiento manda los leads enterprise directo a los consultores senior. La configuración llevó una tarde, no un trimestre.",
          name: "Camila Reyes",
          role: "Líder de Customer Success, Aurora Labs",
        },
      ],
    },
    cta: {
      title: "¿Listo para llenar tu calendario con calma?",
      sub: "Monta tu primera página de reservas en menos de cinco minutos. Tu bandeja de entrada notará el silencio.",
      button: "Empieza gratis con Slotly",
      note: "Sin tarjeta · Gratis para uso individual · Cancela cuando quieras",
    },
    footer: {
      tagline: "La capa de agenda amable para calendarios que trabajan duro.",
      exploreLabel: "Explorar",
      nav: [
        { href: "#book", label: "Widget de reservas" },
        { href: "#features", label: "Producto" },
        { href: "#integrations", label: "Integraciones" },
        { href: "#teams", label: "Agenda en equipo" },
        { href: "#pricing", label: "Precios" },
      ],
      contactLabel: "Compañía",
      contactLines: ["Avenida Paulista 1374, planta 11", "São Paulo, Brasil", "Remote-first · GMT-3"],
      email: "hola@slotly.app",
      followLabel: "Canales",
      channels: [
        { id: "docs", label: "docs.slotly.app" },
        { id: "community", label: "community.slotly.app" },
        { id: "status", label: "status.slotly.app" },
      ],
      legal: "© 2026 Slotly Scheduling, Inc. Todos los derechos reservados.",
      fictional: "Slotly es un concepto de marca ficticio diseñado por VigApp.",
    },
  },
};
