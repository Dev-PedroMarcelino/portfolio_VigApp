import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type ProductId = "auto" | "home" | "life" | "business";
export type TierId = "basic" | "plus" | "max";

export interface QuoteOption {
  id: string;
  label: string;
  factor: number;
}

export interface QuoteQuestion {
  id: string;
  label: string;
  options: QuoteOption[];
}

export interface QuoteProduct {
  id: ProductId;
  label: string;
  hint: string;
  base: number;
  questions: [QuoteQuestion, QuoteQuestion];
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
  bullets: string[];
  ratingNote: string;
}

export interface QuoteWidgetContent {
  title: string;
  steps: [string, string, string];
  productLegend: string;
  detailsLegend: string;
  next: string;
  back: string;
  seePrice: string;
  restart: string;
  resultKicker: string;
  perMonth: string;
  resultNote: string;
  resultCta: string;
  disclaimer: string;
  products: QuoteProduct[];
}

export interface TierOption {
  id: TierId;
  label: string;
  note: string;
}

export interface CoverageFeatureRow {
  label: string;
  values: Record<TierId, string | boolean>;
}

export interface CoverageCard {
  id: ProductId;
  name: string;
  tagline: string;
  monthly: Record<TierId, number>;
  features: CoverageFeatureRow[];
}

export interface CoverageContent {
  label: string;
  title: string;
  intro: string;
  tierLegend: string;
  tiers: TierOption[];
  perMonthShort: string;
  startCta: string;
  includedLabel: string;
  notIncludedLabel: string;
  cards: CoverageCard[];
}

export interface ClaimStep {
  title: string;
  duration: string;
  summary: string;
  detail: string;
  points: string[];
}

export interface ClaimsContent {
  label: string;
  title: string;
  intro: string;
  hint: string;
  imageAlt: string;
  sla: { value: string; label: string };
  steps: ClaimStep[];
}

export interface StatsContent {
  label: string;
  title: string;
  stats: { value: string; label: string; sub: string }[];
  footnote: string;
}

export interface Review {
  quote: string;
  name: string;
  meta: string;
  product: string;
  rating: number;
}

export interface ReviewsContent {
  label: string;
  title: string;
  intro: string;
  imageAlt: string;
  ratingLabel: string;
  badge: { value: string; label: string };
  reviews: Review[];
}

export interface FaqContent {
  label: string;
  title: string;
  intro: string;
  items: { q: string; a: string }[];
}

export interface AgentContent {
  label: string;
  title: string;
  intro: string;
  imageAlt: string;
  agent: {
    name: string;
    role: string;
    languages: string;
    phone: string;
    email: string;
    office: string;
    hours: string;
  };
  languagesLabel: string;
  phoneLabel: string;
  officeLabel: string;
  hoursLabel: string;
  form: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    productLabel: string;
    productOptions: { id: ProductId; label: string }[];
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    successTitle: string;
    successBody: string;
    successTopic: string;
    another: string;
  };
}

export interface FooterContent {
  tagline: string;
  columns: { title: string; links: string[] }[];
  legal: string;
  regNote: string;
  socialLabels: { web: string; email: string; chat: string };
}

export interface ShieldlineContent {
  money: { locale: string; currency: string };
  header: HeaderContent;
  hero: HeroContent;
  quote: QuoteWidgetContent;
  coverage: CoverageContent;
  claims: ClaimsContent;
  stats: StatsContent;
  reviews: ReviewsContent;
  faq: FaqContent;
  agent: AgentContent;
  footer: FooterContent;
}

/* ------------------------------------------------------------------ */
/* Dictionary                                                          */
/* ------------------------------------------------------------------ */

export const shieldlineDict: DemoDictionary<ShieldlineContent> = {
  en: {
    money: { locale: "en-US", currency: "USD" },
    header: {
      nav: [
        { href: "#coverage", label: "Coverage" },
        { href: "#claims", label: "Claims" },
        { href: "#reviews", label: "Reviews" },
        { href: "#faq", label: "FAQ" },
        { href: "#agent", label: "Contact" },
      ],
      cta: "Get a quote",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      kicker: "Coverage in 48 states",
      titleTop: "Plain-language cover.",
      titleAccent: "Honest prices.",
      titleBottom: "Claims paid in 48 hours.",
      sub: "Shieldline writes every policy in words you can read over coffee. No fine-print surprises, no hold music — and a claims team that pays approved claims in two business days.",
      bullets: [
        "A 4-page policy you can actually read in 9 minutes",
        "Cancel or switch tiers anytime, refunds prorated to the day",
        "A real human on the phone in under 60 seconds",
      ],
      ratingNote: "4.9/5 from 11,300+ verified reviews",
    },
    quote: {
      title: "Your price in 30 seconds",
      steps: ["Cover", "Details", "Price"],
      productLegend: "What are we protecting?",
      detailsLegend: "Two quick details",
      next: "Continue",
      back: "Back",
      seePrice: "See my price",
      restart: "Start over",
      resultKicker: "Your estimated price",
      perMonth: "/month",
      resultNote: "Locked for 30 days. No credit check, no spam calls — just your number.",
      resultCta: "Talk to an advisor",
      disclaimer: "Estimate based on typical profiles. Your final price is confirmed after a 5-minute application.",
      products: [
        {
          id: "auto",
          label: "Auto",
          hint: "Cars, EVs and motorcycles",
          base: 74,
          questions: [
            {
              id: "age",
              label: "How old is the vehicle?",
              options: [
                { id: "new", label: "Brand new (0 to 3 yrs)", factor: 1.25 },
                { id: "mid", label: "4 to 9 years", factor: 1 },
                { id: "old", label: "10 years or more", factor: 0.85 },
              ],
            },
            {
              id: "use",
              label: "How much do you drive?",
              options: [
                { id: "low", label: "Under 8,000 km a year", factor: 0.9 },
                { id: "avg", label: "Average commute", factor: 1 },
                { id: "high", label: "On the road daily", factor: 1.2 },
              ],
            },
          ],
        },
        {
          id: "home",
          label: "Home",
          hint: "Houses, apartments and condos",
          base: 39,
          questions: [
            {
              id: "type",
              label: "What kind of home?",
              options: [
                { id: "apt", label: "Apartment", factor: 0.9 },
                { id: "condo", label: "Townhouse or condo", factor: 1 },
                { id: "house", label: "Detached house", factor: 1.15 },
              ],
            },
            {
              id: "value",
              label: "Rough rebuild value?",
              options: [
                { id: "s", label: "Up to $250k", factor: 0.85 },
                { id: "m", label: "$250k to $600k", factor: 1 },
                { id: "l", label: "Over $600k", factor: 1.35 },
              ],
            },
          ],
        },
        {
          id: "life",
          label: "Life",
          hint: "Term life, 10 to 30 years",
          base: 28,
          questions: [
            {
              id: "age",
              label: "Your age band?",
              options: [
                { id: "young", label: "25 to 34", factor: 0.8 },
                { id: "mid", label: "35 to 49", factor: 1 },
                { id: "senior", label: "50 to 64", factor: 1.6 },
              ],
            },
            {
              id: "cover",
              label: "How much cover?",
              options: [
                { id: "s", label: "$100k", factor: 0.75 },
                { id: "m", label: "$250k", factor: 1 },
                { id: "l", label: "$1 million", factor: 1.7 },
              ],
            },
          ],
        },
        {
          id: "business",
          label: "Business",
          hint: "Shops, studios and startups",
          base: 96,
          questions: [
            {
              id: "team",
              label: "How big is the team?",
              options: [
                { id: "solo", label: "Just me", factor: 0.8 },
                { id: "small", label: "2 to 10 people", factor: 1 },
                { id: "mid", label: "11 to 50 people", factor: 1.45 },
              ],
            },
            {
              id: "field",
              label: "What field are you in?",
              options: [
                { id: "office", label: "Office and digital", factor: 0.9 },
                { id: "retail", label: "Retail and food", factor: 1.1 },
                { id: "trade", label: "Trades and industrial", factor: 1.4 },
              ],
            },
          ],
        },
      ],
    },
    coverage: {
      label: "Coverage",
      title: "Four products. Three tiers. Zero riddles.",
      intro: "Every card below is the full policy — what you see is what you get. Flip the tier and watch the numbers change, never the promises.",
      tierLegend: "Choose a tier",
      tiers: [
        { id: "basic", label: "Basic", note: "The essentials, done right" },
        { id: "plus", label: "Plus", note: "Most chosen" },
        { id: "max", label: "Max", note: "Everything, everywhere" },
      ],
      perMonthShort: "/mo",
      startCta: "Start a quote",
      includedLabel: "Included",
      notIncludedLabel: "Not included",
      cards: [
        {
          id: "auto",
          name: "Shieldline Auto",
          tagline: "For daily drivers and weekend escapes",
          monthly: { basic: 52, plus: 74, max: 109 },
          features: [
            { label: "Third-party liability", values: { basic: "$25k", plus: "$50k", max: "$100k" } },
            { label: "Own damage and theft", values: { basic: false, plus: true, max: true } },
            { label: "Roadside assistance", values: { basic: "100 km tow", plus: "400 km tow", max: "Unlimited" } },
            { label: "Courtesy car", values: { basic: false, plus: "7 days", max: "30 days" } },
            { label: "Glass, keys and mirrors", values: { basic: false, plus: true, max: true } },
          ],
        },
        {
          id: "home",
          name: "Shieldline Home",
          tagline: "For the place your life happens",
          monthly: { basic: 29, plus: 39, max: 58 },
          features: [
            { label: "Rebuild cover", values: { basic: "$150k", plus: "$350k", max: "$700k" } },
            { label: "Contents and electronics", values: { basic: false, plus: true, max: true } },
            { label: "Water damage and leaks", values: { basic: false, plus: true, max: true } },
            { label: "Temporary accommodation", values: { basic: false, plus: "14 days", max: "60 days" } },
            { label: "Garden and exterior", values: { basic: false, plus: false, max: true } },
          ],
        },
        {
          id: "life",
          name: "Shieldline Life",
          tagline: "For the people who count on you",
          monthly: { basic: 19, plus: 28, max: 44 },
          features: [
            { label: "Life cover", values: { basic: "$100k", plus: "$250k", max: "$1M" } },
            { label: "Critical illness advance", values: { basic: false, plus: "25%", max: "50%" } },
            { label: "Family income benefit", values: { basic: false, plus: "12 months", max: "36 months" } },
            { label: "No medical exam under 45", values: { basic: true, plus: true, max: true } },
            { label: "Inflation-linked cover", values: { basic: false, plus: false, max: true } },
          ],
        },
        {
          id: "business",
          name: "Shieldline Business",
          tagline: "For shops, studios and startups",
          monthly: { basic: 69, plus: 96, max: 148 },
          features: [
            { label: "General liability", values: { basic: "$50k", plus: "$250k", max: "$1M" } },
            { label: "Equipment and stock", values: { basic: false, plus: true, max: true } },
            { label: "Business interruption", values: { basic: false, plus: "30 days", max: "90 days" } },
            { label: "Cyber incident response", values: { basic: false, plus: false, max: true } },
            { label: "Legal defense costs", values: { basic: true, plus: true, max: true } },
          ],
        },
      ],
    },
    claims: {
      label: "Claims",
      title: "The part most insurers hide. We put it on the homepage.",
      intro: "Four steps, no mystery. This is the exact journey every Shieldline claim takes — open a step to see what happens behind the scenes.",
      hint: "Select a step to expand it",
      imageAlt: "Shieldline claims specialist reviewing a case file at a planning desk",
      sla: { value: "48h", label: "average payout after approval" },
      steps: [
        {
          title: "Tell us what happened",
          duration: "About 3 minutes",
          summary: "In the app or on the phone — your call.",
          detail: "Answer five plain questions and add photos if you have them. You get a claim number and a named handler instantly, plus a written confirmation of what happens next.",
          points: [
            "Available 24/7, in the app or by phone",
            "A named handler, not a ticket queue",
            "Instant written confirmation",
          ],
        },
        {
          title: "We review and confirm",
          duration: "Within 24 hours",
          summary: "A human reads it. A human replies.",
          detail: "Your handler checks the facts against your policy and sends a plain-language summary: what is covered, what is not, and why — before anything else moves.",
          points: [
            "Coverage decision within one business day",
            "Every decision explained in writing",
            "Ask questions by chat, phone or email",
          ],
        },
        {
          title: "We repair or replace",
          duration: "2 to 5 days",
          summary: "Our network, or your own repairer.",
          detail: "Pick a vetted Shieldline partner and we schedule and pay them directly — or choose your own repairer and we settle the invoice. Either way, you never front the money for covered work.",
          points: [
            "1,900+ vetted repair partners",
            "Direct payment, no reimbursement chase",
            "Progress tracked live in the app",
          ],
        },
        {
          title: "You get paid",
          duration: "48 hours after approval",
          summary: "Money in your account, case closed.",
          detail: "Cash settlements land by bank transfer within two business days of approval. You receive a final statement showing every number and exactly how we got to it.",
          points: [
            "Bank transfer within 48 hours",
            "Itemized final statement",
            "Case reopens free if anything was missed",
          ],
        },
      ],
    },
    stats: {
      label: "Why people stay",
      title: "Numbers we publish every quarter",
      stats: [
        { value: "98.2%", label: "claims approved", sub: "of all claims filed in 2025" },
        { value: "48h", label: "average payout", sub: "from approval to money in account" },
        { value: "127k+", label: "members protected", sub: "across auto, home, life and business" },
        { value: "9 min", label: "to read your policy", sub: "four pages, plain language, no riders" },
      ],
      footnote: "Figures audited by Meridian Actuarial Partners, March 2026.",
    },
    reviews: {
      label: "Reviews",
      title: "What members say after a claim",
      intro: "We only publish reviews from members who filed a real claim — the moment insurance either works or does not.",
      imageAlt: "Handshake between a Shieldline advisor and a member closing a claim",
      ratingLabel: "out of 5",
      badge: { value: "4.9/5", label: "11,300+ verified reviews" },
      reviews: [
        {
          quote: "A pipe burst on a Friday night. By Monday a crew was in my kitchen and the hotel was already paid. I kept waiting for the catch — there was no catch.",
          name: "Renata Albuquerque",
          meta: "Recife, Brazil",
          product: "Home Max",
          rating: 5,
        },
        {
          quote: "Someone rear-ended me on I-35. I filed from the shoulder in four minutes, and the courtesy car was in my driveway the next morning. My handler texted updates like a friend would.",
          name: "Daniel Okafor",
          meta: "Austin, USA",
          product: "Auto Plus",
          rating: 5,
        },
        {
          quote: "Our bakery flooded in October. Shieldline covered the ovens, the stock and six weeks of lost income. Four stars only because I wish I had switched years earlier.",
          name: "Marta Iglesias",
          meta: "Valencia, Spain",
          product: "Business Plus",
          rating: 4,
        },
      ],
    },
    faq: {
      label: "FAQ",
      title: "Fair questions, straight answers",
      intro: "If it is not answered here, an advisor picks up in under a minute.",
      items: [
        {
          q: "How is my price calculated?",
          a: "Three things: what you are covering, how you use it, and your claims history. We never price on credit scores, postcode profiling or how long you have been a customer — loyal members pay the same as new ones.",
        },
        {
          q: "Can I really cancel anytime?",
          a: "Yes. Cancel in the app in under a minute, effective immediately, and we refund the unused days automatically. No calls, no cancellation fees, no guilt trip.",
        },
        {
          q: "What is not covered?",
          a: "Each policy has a single page titled What is not covered. Deliberate damage, unpaid premiums and undeclared commercial use are the big three. If it is not on that page, it is covered.",
        },
        {
          q: "How fast are claims actually paid?",
          a: "Approved cash settlements are paid within 48 hours, and 98.2% of claims filed last year were approved. Repairs are usually scheduled inside five days.",
        },
        {
          q: "Can I switch tiers later?",
          a: "Anytime, in either direction. Upgrades apply the moment you confirm; downgrades apply at your next monthly renewal, so you never lose cover you already paid for.",
        },
        {
          q: "Is Shieldline an insurer or a broker?",
          a: "A fully licensed carrier. We write our own policies and pay claims from our own reserves, regulated in every market where we operate.",
        },
      ],
    },
    agent: {
      label: "Talk to a human",
      title: "Meet your advisor, not a call center",
      intro: "Every Shieldline member gets a named advisor. Ask anything — quotes, claims, or what a deductible actually is.",
      imageAlt: "Shieldline advisor meeting a member across a desk",
      agent: {
        name: "Priya Raman",
        role: "Senior Coverage Advisor",
        languages: "English, Spanish and Portuguese",
        phone: "+1 (415) 555-0114",
        email: "priya.raman@shieldline.example",
        office: "580 Market Street, Suite 900 — San Francisco, CA",
        hours: "Mon to Fri, 8am to 8pm PT — Sat, 9am to 2pm",
      },
      languagesLabel: "Speaks",
      phoneLabel: "Direct line",
      officeLabel: "Office",
      hoursLabel: "Hours",
      form: {
        nameLabel: "Your name",
        namePlaceholder: "Jordan Reyes",
        emailLabel: "Email",
        emailPlaceholder: "you@example.com",
        productLabel: "I want to talk about",
        productOptions: [
          { id: "auto", label: "Auto insurance" },
          { id: "home", label: "Home insurance" },
          { id: "life", label: "Life insurance" },
          { id: "business", label: "Business insurance" },
        ],
        messageLabel: "Your message",
        messagePlaceholder: "Tell us a little about what you need covered...",
        submit: "Send message",
        successTitle: "Message on its way",
        successBody: "Your message is with the team — a reply lands in your inbox within one business hour, usually much sooner.",
        successTopic: "Topic",
        another: "Send another message",
      },
    },
    footer: {
      tagline: "Plain-language insurance for auto, home, life and business. Underwritten to be read.",
      columns: [
        { title: "Products", links: ["Auto insurance", "Home insurance", "Life insurance", "Business insurance"] },
        { title: "Company", links: ["About us", "Careers", "Press", "Impact report"] },
        { title: "Support", links: ["Claims center", "Coverage guide", "Glossary", "Contact"] },
      ],
      legal: "2026 Shieldline Mutual Group. All rights reserved.",
      regNote: "Shieldline is a fictional insurance concept created for portfolio purposes. Policies shown are illustrative and not an offer of coverage.",
      socialLabels: { web: "Shieldline on the web", email: "Email Shieldline", chat: "Chat with Shieldline" },
    },
  },

  /* ---------------------------------------------------------------- */
  /* Português                                                         */
  /* ---------------------------------------------------------------- */

  pt: {
    money: { locale: "pt-BR", currency: "BRL" },
    header: {
      nav: [
        { href: "#coverage", label: "Coberturas" },
        { href: "#claims", label: "Sinistros" },
        { href: "#reviews", label: "Avaliações" },
        { href: "#faq", label: "Dúvidas" },
        { href: "#agent", label: "Contato" },
      ],
      cta: "Fazer cotação",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
    },
    hero: {
      kicker: "Cobertura em todo o Brasil",
      titleTop: "Apólice em português claro.",
      titleAccent: "Preço honesto.",
      titleBottom: "Sinistro pago em 48 horas.",
      sub: "A Shieldline escreve cada apólice em palavras que você entende na primeira leitura. Sem letras miúdas, sem musiquinha de espera — e uma equipe que paga sinistros aprovados em dois dias úteis.",
      bullets: [
        "Uma apólice de 4 páginas que você lê de verdade em 9 minutos",
        "Cancele ou troque de plano quando quiser, com reembolso proporcional ao dia",
        "Atendimento humano ao telefone em menos de 60 segundos",
      ],
      ratingNote: "4,9/5 em mais de 11.300 avaliações verificadas",
    },
    quote: {
      title: "Seu preço em 30 segundos",
      steps: ["Proteção", "Detalhes", "Preço"],
      productLegend: "O que vamos proteger?",
      detailsLegend: "Dois detalhes rápidos",
      next: "Continuar",
      back: "Voltar",
      seePrice: "Ver meu preço",
      restart: "Recomeçar",
      resultKicker: "Seu preço estimado",
      perMonth: "/mês",
      resultNote: "Garantido por 30 dias. Sem consulta ao CPF, sem ligações insistentes — só o seu número.",
      resultCta: "Falar com um consultor",
      disclaimer: "Estimativa baseada em perfis típicos. O valor final é confirmado após um cadastro de 5 minutos.",
      products: [
        {
          id: "auto",
          label: "Auto",
          hint: "Carros, elétricos e motos",
          base: 289,
          questions: [
            {
              id: "age",
              label: "Qual a idade do veículo?",
              options: [
                { id: "new", label: "Zero km (0 a 3 anos)", factor: 1.25 },
                { id: "mid", label: "4 a 9 anos", factor: 1 },
                { id: "old", label: "10 anos ou mais", factor: 0.85 },
              ],
            },
            {
              id: "use",
              label: "Quanto você roda?",
              options: [
                { id: "low", label: "Menos de 8.000 km por ano", factor: 0.9 },
                { id: "avg", label: "Uso urbano médio", factor: 1 },
                { id: "high", label: "Na estrada todo dia", factor: 1.2 },
              ],
            },
          ],
        },
        {
          id: "home",
          label: "Residência",
          hint: "Casas, apartamentos e condomínios",
          base: 159,
          questions: [
            {
              id: "type",
              label: "Que tipo de imóvel?",
              options: [
                { id: "apt", label: "Apartamento", factor: 0.9 },
                { id: "condo", label: "Casa em condomínio", factor: 1 },
                { id: "house", label: "Casa de rua ou sobrado", factor: 1.15 },
              ],
            },
            {
              id: "value",
              label: "Valor aproximado de reconstrução?",
              options: [
                { id: "s", label: "Até R$ 800 mil", factor: 0.85 },
                { id: "m", label: "R$ 800 mil a R$ 2 mi", factor: 1 },
                { id: "l", label: "Acima de R$ 2 mi", factor: 1.35 },
              ],
            },
          ],
        },
        {
          id: "life",
          label: "Vida",
          hint: "Seguro de vida de 10 a 30 anos",
          base: 119,
          questions: [
            {
              id: "age",
              label: "Sua faixa de idade?",
              options: [
                { id: "young", label: "25 a 34", factor: 0.8 },
                { id: "mid", label: "35 a 49", factor: 1 },
                { id: "senior", label: "50 a 64", factor: 1.6 },
              ],
            },
            {
              id: "cover",
              label: "Capital segurado?",
              options: [
                { id: "s", label: "R$ 300 mil", factor: 0.75 },
                { id: "m", label: "R$ 800 mil", factor: 1 },
                { id: "l", label: "R$ 3 milhões", factor: 1.7 },
              ],
            },
          ],
        },
        {
          id: "business",
          label: "Empresa",
          hint: "Lojas, estúdios e startups",
          base: 379,
          questions: [
            {
              id: "team",
              label: "Tamanho da equipe?",
              options: [
                { id: "solo", label: "Só eu", factor: 0.8 },
                { id: "small", label: "2 a 10 pessoas", factor: 1 },
                { id: "mid", label: "11 a 50 pessoas", factor: 1.45 },
              ],
            },
            {
              id: "field",
              label: "Qual o seu ramo?",
              options: [
                { id: "office", label: "Escritório e digital", factor: 0.9 },
                { id: "retail", label: "Comércio e alimentação", factor: 1.1 },
                { id: "trade", label: "Obras e indústria", factor: 1.4 },
              ],
            },
          ],
        },
      ],
    },
    coverage: {
      label: "Coberturas",
      title: "Quatro produtos. Três planos. Nenhuma pegadinha.",
      intro: "Cada cartão abaixo é a apólice completa — o que está escrito é o que você recebe. Troque o plano e veja os números mudarem, nunca as promessas.",
      tierLegend: "Escolha um plano",
      tiers: [
        { id: "basic", label: "Básico", note: "O essencial, bem feito" },
        { id: "plus", label: "Plus", note: "O mais escolhido" },
        { id: "max", label: "Max", note: "Tudo, em todo lugar" },
      ],
      perMonthShort: "/mês",
      startCta: "Começar cotação",
      includedLabel: "Incluído",
      notIncludedLabel: "Não incluído",
      cards: [
        {
          id: "auto",
          name: "Shieldline Auto",
          tagline: "Para o dia a dia e as viagens de fim de semana",
          monthly: { basic: 199, plus: 289, max: 425 },
          features: [
            { label: "Danos a terceiros", values: { basic: "R$ 100 mil", plus: "R$ 250 mil", max: "R$ 500 mil" } },
            { label: "Colisão, roubo e furto", values: { basic: false, plus: true, max: true } },
            { label: "Assistência 24h", values: { basic: "Guincho 100 km", plus: "Guincho 400 km", max: "Ilimitado" } },
            { label: "Carro reserva", values: { basic: false, plus: "7 dias", max: "30 dias" } },
            { label: "Vidros, chaves e retrovisores", values: { basic: false, plus: true, max: true } },
          ],
        },
        {
          id: "home",
          name: "Shieldline Residência",
          tagline: "Para o lugar onde a sua vida acontece",
          monthly: { basic: 115, plus: 159, max: 229 },
          features: [
            { label: "Cobertura de reconstrução", values: { basic: "R$ 600 mil", plus: "R$ 1,4 mi", max: "R$ 2,8 mi" } },
            { label: "Conteúdo e eletrônicos", values: { basic: false, plus: true, max: true } },
            { label: "Danos por água e vazamentos", values: { basic: false, plus: true, max: true } },
            { label: "Hospedagem temporária", values: { basic: false, plus: "14 dias", max: "60 dias" } },
            { label: "Jardim e área externa", values: { basic: false, plus: false, max: true } },
          ],
        },
        {
          id: "life",
          name: "Shieldline Vida",
          tagline: "Para quem conta com você",
          monthly: { basic: 75, plus: 119, max: 179 },
          features: [
            { label: "Capital segurado", values: { basic: "R$ 300 mil", plus: "R$ 800 mil", max: "R$ 3 mi" } },
            { label: "Antecipação por doença grave", values: { basic: false, plus: "25%", max: "50%" } },
            { label: "Renda para a família", values: { basic: false, plus: "12 meses", max: "36 meses" } },
            { label: "Sem exame médico até os 45", values: { basic: true, plus: true, max: true } },
            { label: "Capital corrigido pela inflação", values: { basic: false, plus: false, max: true } },
          ],
        },
        {
          id: "business",
          name: "Shieldline Empresa",
          tagline: "Para lojas, estúdios e startups",
          monthly: { basic: 269, plus: 379, max: 579 },
          features: [
            { label: "Responsabilidade civil", values: { basic: "R$ 200 mil", plus: "R$ 1 mi", max: "R$ 4 mi" } },
            { label: "Equipamentos e estoque", values: { basic: false, plus: true, max: true } },
            { label: "Lucros cessantes", values: { basic: false, plus: "30 dias", max: "90 dias" } },
            { label: "Resposta a incidentes cibernéticos", values: { basic: false, plus: false, max: true } },
            { label: "Custos de defesa jurídica", values: { basic: true, plus: true, max: true } },
          ],
        },
      ],
    },
    claims: {
      label: "Sinistros",
      title: "A parte que as seguradoras escondem. Nós colocamos na primeira página.",
      intro: "Quatro etapas, nenhum mistério. Este é o caminho exato de todo sinistro na Shieldline — abra uma etapa para ver o que acontece nos bastidores.",
      hint: "Toque em uma etapa para expandir",
      imageAlt: "Especialista de sinistros da Shieldline analisando um processo na mesa de trabalho",
      sla: { value: "48h", label: "prazo médio de pagamento após a aprovação" },
      steps: [
        {
          title: "Conte o que aconteceu",
          duration: "Cerca de 3 minutos",
          summary: "Pelo app ou por telefone — você escolhe.",
          detail: "Responda cinco perguntas simples e anexe fotos se tiver. Você recebe na hora o número do sinistro e um analista com nome e sobrenome, além da confirmação por escrito do próximo passo.",
          points: [
            "Disponível 24h, pelo app ou por telefone",
            "Um analista nomeado, não uma fila de tickets",
            "Confirmação imediata por escrito",
          ],
        },
        {
          title: "Analisamos e confirmamos",
          duration: "Em até 24 horas",
          summary: "Uma pessoa lê. Uma pessoa responde.",
          detail: "Seu analista confere os fatos com a apólice e envia um resumo em linguagem simples: o que está coberto, o que não está e por quê — antes de qualquer outra coisa andar.",
          points: [
            "Decisão de cobertura em um dia útil",
            "Toda decisão explicada por escrito",
            "Tire dúvidas por chat, telefone ou e-mail",
          ],
        },
        {
          title: "Consertamos ou substituímos",
          duration: "2 a 5 dias",
          summary: "Nossa rede, ou a oficina da sua confiança.",
          detail: "Escolha um parceiro credenciado da Shieldline e nós agendamos e pagamos direto — ou indique a sua oficina e quitamos a fatura. Nos dois casos, você nunca adianta dinheiro por serviço coberto.",
          points: [
            "Mais de 1.900 parceiros credenciados",
            "Pagamento direto, sem correr atrás de reembolso",
            "Andamento acompanhado ao vivo no app",
          ],
        },
        {
          title: "Você recebe",
          duration: "48 horas após a aprovação",
          summary: "Dinheiro na conta, caso encerrado.",
          detail: "Indenizações em dinheiro caem por transferência bancária em até dois dias úteis após a aprovação. Você recebe um extrato final com cada número e exatamente como chegamos a ele.",
          points: [
            "Transferência bancária em até 48 horas",
            "Extrato final detalhado",
            "Reabertura gratuita se algo ficou de fora",
          ],
        },
      ],
    },
    stats: {
      label: "Por que ficam",
      title: "Números que publicamos a cada trimestre",
      stats: [
        { value: "98,2%", label: "sinistros aprovados", sub: "de todos os avisos registrados em 2025" },
        { value: "48h", label: "prazo médio de pagamento", sub: "da aprovação ao dinheiro na conta" },
        { value: "+127 mil", label: "membros protegidos", sub: "entre auto, residência, vida e empresa" },
        { value: "9 min", label: "para ler sua apólice", sub: "quatro páginas, linguagem simples, sem anexos" },
      ],
      footnote: "Números auditados pela Meridian Actuarial Partners em março de 2026.",
    },
    reviews: {
      label: "Avaliações",
      title: "O que os membros dizem depois do sinistro",
      intro: "Só publicamos avaliações de membros que registraram um sinistro de verdade — o momento em que o seguro funciona ou não funciona.",
      imageAlt: "Aperto de mãos entre um consultor da Shieldline e um membro ao encerrar um sinistro",
      ratingLabel: "de 5",
      badge: { value: "4,9/5", label: "mais de 11.300 avaliações verificadas" },
      reviews: [
        {
          quote: "Um cano estourou numa sexta à noite. Na segunda já tinha equipe na minha cozinha e o hotel estava pago. Fiquei esperando a pegadinha — não tinha pegadinha.",
          name: "Renata Albuquerque",
          meta: "Recife, PE",
          product: "Residência Max",
          rating: 5,
        },
        {
          quote: "Bateram atrás de mim na Marginal. Registrei do acostamento em quatro minutos e o carro reserva estava na minha garagem na manhã seguinte. Meu analista mandava mensagens como um amigo mandaria.",
          name: "Daniel Okafor",
          meta: "São Paulo, SP",
          product: "Auto Plus",
          rating: 5,
        },
        {
          quote: "Nossa padaria alagou em outubro. A Shieldline cobriu os fornos, o estoque e seis semanas de faturamento parado. Quatro estrelas só porque eu queria ter trocado de seguro anos antes.",
          name: "Marta Iglesias",
          meta: "Curitiba, PR",
          product: "Empresa Plus",
          rating: 4,
        },
      ],
    },
    faq: {
      label: "Dúvidas",
      title: "Perguntas justas, respostas diretas",
      intro: "Se a resposta não estiver aqui, um consultor atende em menos de um minuto.",
      items: [
        {
          q: "Como o meu preço é calculado?",
          a: "Três coisas: o que você está protegendo, como você usa e o seu histórico de sinistros. Nunca precificamos por score de crédito, CEP ou tempo de casa — membros antigos pagam o mesmo que novos.",
        },
        {
          q: "Posso mesmo cancelar quando quiser?",
          a: "Pode. Cancele pelo app em menos de um minuto, com efeito imediato, e devolvemos os dias não usados automaticamente. Sem ligações, sem multa, sem chantagem emocional.",
        },
        {
          q: "O que não está coberto?",
          a: "Cada apólice tem uma única página chamada O que não está coberto. Dano intencional, parcelas em atraso e uso comercial não declarado são os três grandes. Se não está nessa página, está coberto.",
        },
        {
          q: "Em quanto tempo o sinistro é pago de verdade?",
          a: "Indenizações aprovadas são pagas em até 48 horas, e 98,2% dos sinistros registrados no ano passado foram aprovados. Reparos costumam ser agendados em até cinco dias.",
        },
        {
          q: "Posso trocar de plano depois?",
          a: "A qualquer momento, nos dois sentidos. Upgrades valem na hora em que você confirma; downgrades valem na próxima renovação mensal, então você nunca perde cobertura que já pagou.",
        },
        {
          q: "A Shieldline é seguradora ou corretora?",
          a: "Seguradora com licença plena. Emitimos nossas próprias apólices e pagamos sinistros com reservas próprias, sob regulação em todos os mercados onde atuamos.",
        },
      ],
    },
    agent: {
      label: "Fale com gente de verdade",
      title: "Conheça sua consultora, não um call center",
      intro: "Todo membro da Shieldline tem um consultor com nome e sobrenome. Pergunte qualquer coisa — cotação, sinistro ou o que é franquia, afinal.",
      imageAlt: "Consultora da Shieldline em reunião com um membro",
      agent: {
        name: "Beatriz Nogueira",
        role: "Consultora Sênior de Coberturas",
        languages: "Português, inglês e espanhol",
        phone: "+55 11 4004-2318",
        email: "beatriz.nogueira@shieldline.example",
        office: "Av. Paulista, 1439, cj. 82 — Bela Vista, São Paulo, SP",
        hours: "Seg a sex, das 8h às 20h — Sáb, das 9h às 14h",
      },
      languagesLabel: "Idiomas",
      phoneLabel: "Linha direta",
      officeLabel: "Escritório",
      hoursLabel: "Horários",
      form: {
        nameLabel: "Seu nome",
        namePlaceholder: "Ana Clara Menezes",
        emailLabel: "E-mail",
        emailPlaceholder: "voce@exemplo.com",
        productLabel: "Quero falar sobre",
        productOptions: [
          { id: "auto", label: "Seguro auto" },
          { id: "home", label: "Seguro residencial" },
          { id: "life", label: "Seguro de vida" },
          { id: "business", label: "Seguro empresarial" },
        ],
        messageLabel: "Sua mensagem",
        messagePlaceholder: "Conte um pouco do que você precisa proteger...",
        submit: "Enviar mensagem",
        successTitle: "Mensagem a caminho",
        successBody: "Sua mensagem está com a equipe — a resposta chega no seu e-mail em até uma hora útil, geralmente bem antes.",
        successTopic: "Assunto",
        another: "Enviar outra mensagem",
      },
    },
    footer: {
      tagline: "Seguro em linguagem simples para auto, residência, vida e empresa. Feito para ser lido.",
      columns: [
        { title: "Produtos", links: ["Seguro auto", "Seguro residencial", "Seguro de vida", "Seguro empresarial"] },
        { title: "Empresa", links: ["Quem somos", "Carreiras", "Imprensa", "Relatório de impacto"] },
        { title: "Suporte", links: ["Central de sinistros", "Guia de coberturas", "Glossário", "Contato"] },
      ],
      legal: "2026 Shieldline Mutual Group. Todos os direitos reservados.",
      regNote: "Shieldline é um conceito ficcional de seguradora criado para fins de portfólio. As apólices exibidas são ilustrativas e não constituem oferta de cobertura.",
      socialLabels: { web: "Shieldline na web", email: "E-mail da Shieldline", chat: "Conversar com a Shieldline" },
    },
  },

  /* ---------------------------------------------------------------- */
  /* Español                                                           */
  /* ---------------------------------------------------------------- */

  es: {
    money: { locale: "es-ES", currency: "EUR" },
    header: {
      nav: [
        { href: "#coverage", label: "Coberturas" },
        { href: "#claims", label: "Siniestros" },
        { href: "#reviews", label: "Opiniones" },
        { href: "#faq", label: "Preguntas" },
        { href: "#agent", label: "Contacto" },
      ],
      cta: "Calcular precio",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
    },
    hero: {
      kicker: "Cobertura en toda España",
      titleTop: "Pólizas en lenguaje claro.",
      titleAccent: "Precios honestos.",
      titleBottom: "Siniestros pagados en 48 horas.",
      sub: "En Shieldline cada póliza está escrita en palabras que se entienden a la primera. Sin letra pequeña, sin música de espera — y con un equipo que paga los siniestros aprobados en dos días hábiles.",
      bullets: [
        "Una póliza de 4 páginas que de verdad se lee en 9 minutos",
        "Cancela o cambia de plan cuando quieras, con reembolso prorrateado al día",
        "Una persona real al teléfono en menos de 60 segundos",
      ],
      ratingNote: "4,9/5 en más de 11.300 opiniones verificadas",
    },
    quote: {
      title: "Tu precio en 30 segundos",
      steps: ["Cobertura", "Detalles", "Precio"],
      productLegend: "¿Qué vamos a proteger?",
      detailsLegend: "Dos detalles rápidos",
      next: "Continuar",
      back: "Atrás",
      seePrice: "Ver mi precio",
      restart: "Empezar de nuevo",
      resultKicker: "Tu precio estimado",
      perMonth: "/mes",
      resultNote: "Bloqueado durante 30 días. Sin consultas de crédito ni llamadas pesadas: solo tu número.",
      resultCta: "Hablar con un asesor",
      disclaimer: "Estimación basada en perfiles habituales. El precio final se confirma tras una solicitud de 5 minutos.",
      products: [
        {
          id: "auto",
          label: "Auto",
          hint: "Coches, eléctricos y motos",
          base: 62,
          questions: [
            {
              id: "age",
              label: "¿Qué antigüedad tiene el vehículo?",
              options: [
                { id: "new", label: "Nuevo (0 a 3 años)", factor: 1.25 },
                { id: "mid", label: "4 a 9 años", factor: 1 },
                { id: "old", label: "10 años o más", factor: 0.85 },
              ],
            },
            {
              id: "use",
              label: "¿Cuánto conduces?",
              options: [
                { id: "low", label: "Menos de 8.000 km al año", factor: 0.9 },
                { id: "avg", label: "Trayectos habituales", factor: 1 },
                { id: "high", label: "En carretera a diario", factor: 1.2 },
              ],
            },
          ],
        },
        {
          id: "home",
          label: "Hogar",
          hint: "Pisos, casas y adosados",
          base: 34,
          questions: [
            {
              id: "type",
              label: "¿Qué tipo de vivienda?",
              options: [
                { id: "apt", label: "Piso", factor: 0.9 },
                { id: "condo", label: "Adosado o dúplex", factor: 1 },
                { id: "house", label: "Casa independiente", factor: 1.15 },
              ],
            },
            {
              id: "value",
              label: "¿Valor aproximado de reconstrucción?",
              options: [
                { id: "s", label: "Hasta 250.000 €", factor: 0.85 },
                { id: "m", label: "250.000 € a 600.000 €", factor: 1 },
                { id: "l", label: "Más de 600.000 €", factor: 1.35 },
              ],
            },
          ],
        },
        {
          id: "life",
          label: "Vida",
          hint: "Seguro de vida de 10 a 30 años",
          base: 25,
          questions: [
            {
              id: "age",
              label: "¿Tu franja de edad?",
              options: [
                { id: "young", label: "25 a 34", factor: 0.8 },
                { id: "mid", label: "35 a 49", factor: 1 },
                { id: "senior", label: "50 a 64", factor: 1.6 },
              ],
            },
            {
              id: "cover",
              label: "¿Cuánto capital asegurado?",
              options: [
                { id: "s", label: "100.000 €", factor: 0.75 },
                { id: "m", label: "250.000 €", factor: 1 },
                { id: "l", label: "1 millón €", factor: 1.7 },
              ],
            },
          ],
        },
        {
          id: "business",
          label: "Negocio",
          hint: "Tiendas, estudios y startups",
          base: 88,
          questions: [
            {
              id: "team",
              label: "¿Qué tamaño tiene el equipo?",
              options: [
                { id: "solo", label: "Solo yo", factor: 0.8 },
                { id: "small", label: "2 a 10 personas", factor: 1 },
                { id: "mid", label: "11 a 50 personas", factor: 1.45 },
              ],
            },
            {
              id: "field",
              label: "¿A qué te dedicas?",
              options: [
                { id: "office", label: "Oficina y digital", factor: 0.9 },
                { id: "retail", label: "Comercio y hostelería", factor: 1.1 },
                { id: "trade", label: "Obras e industria", factor: 1.4 },
              ],
            },
          ],
        },
      ],
    },
    coverage: {
      label: "Coberturas",
      title: "Cuatro productos. Tres planes. Cero acertijos.",
      intro: "Cada tarjeta de abajo es la póliza completa: lo que ves es lo que recibes. Cambia de plan y verás cambiar los números, nunca las promesas.",
      tierLegend: "Elige un plan",
      tiers: [
        { id: "basic", label: "Básico", note: "Lo esencial, bien hecho" },
        { id: "plus", label: "Plus", note: "El más elegido" },
        { id: "max", label: "Max", note: "Todo, en todas partes" },
      ],
      perMonthShort: "/mes",
      startCta: "Calcular precio",
      includedLabel: "Incluido",
      notIncludedLabel: "No incluido",
      cards: [
        {
          id: "auto",
          name: "Shieldline Auto",
          tagline: "Para el día a día y las escapadas",
          monthly: { basic: 44, plus: 62, max: 92 },
          features: [
            { label: "Responsabilidad civil", values: { basic: "25.000 €", plus: "50.000 €", max: "100.000 €" } },
            { label: "Daños propios y robo", values: { basic: false, plus: true, max: true } },
            { label: "Asistencia en carretera", values: { basic: "Grúa 100 km", plus: "Grúa 400 km", max: "Sin límite" } },
            { label: "Coche de sustitución", values: { basic: false, plus: "7 días", max: "30 días" } },
            { label: "Lunas, llaves y retrovisores", values: { basic: false, plus: true, max: true } },
          ],
        },
        {
          id: "home",
          name: "Shieldline Hogar",
          tagline: "Para el lugar donde pasa tu vida",
          monthly: { basic: 25, plus: 34, max: 49 },
          features: [
            { label: "Cobertura de reconstrucción", values: { basic: "150.000 €", plus: "350.000 €", max: "700.000 €" } },
            { label: "Contenido y electrónica", values: { basic: false, plus: true, max: true } },
            { label: "Daños por agua y fugas", values: { basic: false, plus: true, max: true } },
            { label: "Alojamiento temporal", values: { basic: false, plus: "14 días", max: "60 días" } },
            { label: "Jardín y exteriores", values: { basic: false, plus: false, max: true } },
          ],
        },
        {
          id: "life",
          name: "Shieldline Vida",
          tagline: "Para quienes cuentan contigo",
          monthly: { basic: 17, plus: 25, max: 39 },
          features: [
            { label: "Capital asegurado", values: { basic: "100.000 €", plus: "250.000 €", max: "1 M€" } },
            { label: "Anticipo por enfermedad grave", values: { basic: false, plus: "25%", max: "50%" } },
            { label: "Renta para la familia", values: { basic: false, plus: "12 meses", max: "36 meses" } },
            { label: "Sin examen médico hasta los 45", values: { basic: true, plus: true, max: true } },
            { label: "Capital ligado a la inflación", values: { basic: false, plus: false, max: true } },
          ],
        },
        {
          id: "business",
          name: "Shieldline Negocio",
          tagline: "Para tiendas, estudios y startups",
          monthly: { basic: 59, plus: 88, max: 129 },
          features: [
            { label: "Responsabilidad civil general", values: { basic: "50.000 €", plus: "250.000 €", max: "1 M€" } },
            { label: "Equipos y existencias", values: { basic: false, plus: true, max: true } },
            { label: "Pérdida de beneficios", values: { basic: false, plus: "30 días", max: "90 días" } },
            { label: "Respuesta a ciberincidentes", values: { basic: false, plus: false, max: true } },
            { label: "Defensa jurídica", values: { basic: true, plus: true, max: true } },
          ],
        },
      ],
    },
    claims: {
      label: "Siniestros",
      title: "La parte que las aseguradoras esconden. Nosotros la ponemos en portada.",
      intro: "Cuatro pasos, ningún misterio. Este es el recorrido exacto de cada siniestro en Shieldline — abre un paso para ver qué ocurre entre bambalinas.",
      hint: "Selecciona un paso para ampliarlo",
      imageAlt: "Especialista de siniestros de Shieldline revisando un expediente en su escritorio",
      sla: { value: "48h", label: "plazo medio de pago tras la aprobación" },
      steps: [
        {
          title: "Cuéntanos qué ha pasado",
          duration: "Unos 3 minutos",
          summary: "Desde la app o por teléfono: tú eliges.",
          detail: "Responde cinco preguntas sencillas y añade fotos si las tienes. Recibes al instante un número de siniestro y un gestor con nombre y apellidos, además de una confirmación por escrito del siguiente paso.",
          points: [
            "Disponible 24/7, en la app o por teléfono",
            "Un gestor con nombre, no una cola de tickets",
            "Confirmación inmediata por escrito",
          ],
        },
        {
          title: "Revisamos y confirmamos",
          duration: "En menos de 24 horas",
          summary: "Lo lee una persona. Te responde una persona.",
          detail: "Tu gestor contrasta los hechos con tu póliza y te envía un resumen en lenguaje claro: qué está cubierto, qué no y por qué — antes de que nada más se mueva.",
          points: [
            "Decisión de cobertura en un día hábil",
            "Cada decisión explicada por escrito",
            "Resuelve dudas por chat, teléfono o correo",
          ],
        },
        {
          title: "Reparamos o sustituimos",
          duration: "2 a 5 días",
          summary: "Nuestra red, o tu taller de confianza.",
          detail: "Elige un taller homologado de Shieldline y nosotros agendamos y pagamos directamente — o trae el tuyo y liquidamos la factura. En ambos casos, nunca adelantas dinero por un trabajo cubierto.",
          points: [
            "Más de 1.900 talleres homologados",
            "Pago directo, sin perseguir reembolsos",
            "Progreso en tiempo real en la app",
          ],
        },
        {
          title: "Cobras",
          duration: "48 horas tras la aprobación",
          summary: "Dinero en tu cuenta, caso cerrado.",
          detail: "Las indemnizaciones en efectivo llegan por transferencia en un máximo de dos días hábiles tras la aprobación. Recibes un extracto final con cada cifra y cómo llegamos a ella.",
          points: [
            "Transferencia bancaria en 48 horas",
            "Extracto final detallado",
            "Reapertura gratuita si algo quedó fuera",
          ],
        },
      ],
    },
    stats: {
      label: "Por qué se quedan",
      title: "Cifras que publicamos cada trimestre",
      stats: [
        { value: "98,2%", label: "siniestros aprobados", sub: "de todos los partes presentados en 2025" },
        { value: "48h", label: "plazo medio de pago", sub: "de la aprobación al dinero en cuenta" },
        { value: "+127.000", label: "miembros protegidos", sub: "entre auto, hogar, vida y negocio" },
        { value: "9 min", label: "para leer tu póliza", sub: "cuatro páginas, lenguaje claro, sin anexos" },
      ],
      footnote: "Cifras auditadas por Meridian Actuarial Partners, marzo de 2026.",
    },
    reviews: {
      label: "Opiniones",
      title: "Lo que dicen los miembros después de un siniestro",
      intro: "Solo publicamos opiniones de miembros que presentaron un siniestro real: el momento en que un seguro funciona o no funciona.",
      imageAlt: "Apretón de manos entre un asesor de Shieldline y un miembro al cerrar un siniestro",
      ratingLabel: "sobre 5",
      badge: { value: "4,9/5", label: "más de 11.300 opiniones verificadas" },
      reviews: [
        {
          quote: "Reventó una tubería un viernes por la noche. El lunes ya había un equipo en mi cocina y el hotel estaba pagado. Esperaba la trampa — no había trampa.",
          name: "Renata Albuquerque",
          meta: "Sevilla, España",
          product: "Hogar Max",
          rating: 5,
        },
        {
          quote: "Me dieron por detrás en la M-30. Presenté el parte desde el arcén en cuatro minutos y el coche de sustitución estaba en mi garaje a la mañana siguiente. Mi gestor me escribía como lo haría un amigo.",
          name: "Daniel Okafor",
          meta: "Madrid, España",
          product: "Auto Plus",
          rating: 5,
        },
        {
          quote: "Nuestra panadería se inundó en octubre. Shieldline cubrió los hornos, el género y seis semanas de ingresos perdidos. Cuatro estrellas solo porque ojalá hubiera cambiado años antes.",
          name: "Marta Iglesias",
          meta: "Valencia, España",
          product: "Negocio Plus",
          rating: 4,
        },
      ],
    },
    faq: {
      label: "Preguntas",
      title: "Preguntas justas, respuestas directas",
      intro: "Si la respuesta no está aquí, un asesor te atiende en menos de un minuto.",
      items: [
        {
          q: "¿Cómo se calcula mi precio?",
          a: "Tres cosas: qué aseguras, cómo lo usas y tu historial de siniestros. Nunca usamos puntuaciones de crédito, el código postal ni tu antigüedad como cliente — los miembros veteranos pagan lo mismo que los nuevos.",
        },
        {
          q: "¿De verdad puedo cancelar cuando quiera?",
          a: "Sí. Cancela desde la app en menos de un minuto, con efecto inmediato, y te devolvemos los días no disfrutados automáticamente. Sin llamadas, sin penalizaciones, sin chantaje emocional.",
        },
        {
          q: "¿Qué no está cubierto?",
          a: "Cada póliza tiene una única página titulada Qué no está cubierto. Daños intencionados, recibos impagados y uso comercial no declarado son los tres grandes. Si no aparece en esa página, está cubierto.",
        },
        {
          q: "¿Cuánto tardan en pagar de verdad?",
          a: "Las indemnizaciones aprobadas se pagan en un máximo de 48 horas, y el 98,2% de los siniestros del año pasado fueron aprobados. Las reparaciones suelen agendarse en menos de cinco días.",
        },
        {
          q: "¿Puedo cambiar de plan más adelante?",
          a: "Cuando quieras, en ambos sentidos. Las mejoras se aplican al confirmar; las rebajas, en tu siguiente renovación mensual, así nunca pierdes cobertura ya pagada.",
        },
        {
          q: "¿Shieldline es aseguradora o corredora?",
          a: "Aseguradora con licencia plena. Emitimos nuestras propias pólizas y pagamos los siniestros con reservas propias, reguladas en todos los mercados donde operamos.",
        },
      ],
    },
    agent: {
      label: "Habla con una persona",
      title: "Conoce a tu asesor, no a un call center",
      intro: "Cada miembro de Shieldline tiene un asesor con nombre y apellidos. Pregunta lo que sea: precios, siniestros o qué es exactamente una franquicia.",
      imageAlt: "Asesor de Shieldline reunido con un miembro en su despacho",
      agent: {
        name: "Álvaro Cifuentes",
        role: "Asesor sénior de coberturas",
        languages: "Español, inglés y portugués",
        phone: "+34 910 882 340",
        email: "alvaro.cifuentes@shieldline.example",
        office: "Calle de Serrano 41, planta 3 — 28001 Madrid",
        hours: "Lun a vie, de 9:00 a 20:00 — Sáb, de 10:00 a 14:00",
      },
      languagesLabel: "Idiomas",
      phoneLabel: "Línea directa",
      officeLabel: "Oficina",
      hoursLabel: "Horario",
      form: {
        nameLabel: "Tu nombre",
        namePlaceholder: "Lucía Arteaga",
        emailLabel: "Correo electrónico",
        emailPlaceholder: "tu@ejemplo.com",
        productLabel: "Quiero hablar de",
        productOptions: [
          { id: "auto", label: "Seguro de auto" },
          { id: "home", label: "Seguro de hogar" },
          { id: "life", label: "Seguro de vida" },
          { id: "business", label: "Seguro de negocio" },
        ],
        messageLabel: "Tu mensaje",
        messagePlaceholder: "Cuéntanos un poco qué necesitas proteger...",
        submit: "Enviar mensaje",
        successTitle: "Mensaje en camino",
        successBody: "Tu mensaje ya está con el equipo: la respuesta llega a tu correo en menos de una hora hábil, normalmente mucho antes.",
        successTopic: "Tema",
        another: "Enviar otro mensaje",
      },
    },
    footer: {
      tagline: "Seguros en lenguaje claro para auto, hogar, vida y negocio. Escritos para ser leídos.",
      columns: [
        { title: "Productos", links: ["Seguro de auto", "Seguro de hogar", "Seguro de vida", "Seguro de negocio"] },
        { title: "Compañía", links: ["Quiénes somos", "Empleo", "Prensa", "Informe de impacto"] },
        { title: "Soporte", links: ["Centro de siniestros", "Guía de coberturas", "Glosario", "Contacto"] },
      ],
      legal: "2026 Shieldline Mutual Group. Todos los derechos reservados.",
      regNote: "Shieldline es un concepto ficticio de aseguradora creado con fines de portafolio. Las pólizas mostradas son ilustrativas y no constituyen una oferta de cobertura.",
      socialLabels: { web: "Shieldline en la web", email: "Correo de Shieldline", chat: "Chatear con Shieldline" },
    },
  },
};
