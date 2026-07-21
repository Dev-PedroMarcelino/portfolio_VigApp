import type { DemoDictionary } from "@/demos/content";

/** Build an Unsplash URL from one of the approved photo IDs. */
export function unsplash(id: string, width: number): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;
}

/** Render a minute count as a soft "1 h 30 min" style string. */
export function formatDuration(totalMin: number, minShort: string): string {
  const hours = Math.floor(totalMin / 60);
  const minutes = totalMin % 60;
  if (hours === 0) return `${minutes} ${minShort}`;
  if (minutes === 0) return `${hours} h`;
  return `${hours} h ${minutes} ${minShort}`;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  durationMin: number;
  price: number;
}

export interface ServiceCategory {
  id: string;
  label: string;
  blurb: string;
  items: ServiceItem[];
}

export interface RitualStep {
  numeral: string;
  name: string;
  description: string;
  durationMin: number;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  since: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  size: string;
  price: number;
  blurb: string;
  description: string;
  ingredients: string[];
  imageId: string;
  imageAlt: string;
}

export interface BookingService {
  id: string;
  name: string;
  durationMin: number;
  price: number;
}

export interface BookingStylist {
  id: string;
  name: string;
  role: string;
}

export interface EclatContent {
  format: { locale: string; currency: string };
  common: { minShort: string; minLong: string };
  header: {
    tagline: string;
    navAria: string;
    nav: { href: string; label: string }[];
    bookCta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleItalic: string;
    lede: string;
    primaryCta: string;
    secondaryCta: string;
    scrollCue: string;
    imageAlt: string;
    stats: { value: string; label: string }[];
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    tabsAria: string;
    durationLabel: string;
    fromLabel: string;
    bookLabel: string;
    categories: ServiceCategory[];
  };
  ritual: {
    eyebrow: string;
    title: string;
    titleItalic: string;
    intro: string;
    stepLabel: string;
    totalLabel: string;
    totalDurationMin: number;
    imageAlt: string;
    closingNote: string;
    ctaLabel: string;
    steps: RitualStep[];
  };
  team: {
    eyebrow: string;
    title: string;
    intro: string;
    specialtiesLabel: string;
    sinceLabel: string;
    bookWithLabel: string;
    pickAria: string;
    stylists: Stylist[];
  };
  products: {
    eyebrow: string;
    title: string;
    intro: string;
    quickViewLabel: string;
    closeLabel: string;
    sizeLabel: string;
    ingredientsLabel: string;
    reserveLabel: string;
    shelfNote: string;
    items: ProductItem[];
  };
  booking: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: { service: string; stylist: string; time: string };
    serviceTitle: string;
    stylistTitle: string;
    timeTitle: string;
    anyStylistName: string;
    anyStylistRole: string;
    dateTitle: string;
    closedLabel: string;
    unavailableLabel: string;
    seatingNote: string;
    backLabel: string;
    continueLabel: string;
    confirmLabel: string;
    summaryTitle: string;
    summaryService: string;
    summaryStylist: string;
    summaryDate: string;
    summaryTime: string;
    summaryTotal: string;
    confirmedTitle: string;
    confirmedBody: string;
    confirmationLabel: string;
    resetLabel: string;
    services: BookingService[];
    stylists: BookingStylist[];
  };
  footer: {
    blurb: string;
    addressLabel: string;
    address: string[];
    hoursLabel: string;
    hours: string[];
    contactLabel: string;
    phone: string;
    email: string;
    followLabel: string;
    socials: string[];
    fineprint: string;
  };
}

const en: EclatContent = {
  format: { locale: "en-US", currency: "USD" },
  common: { minShort: "min", minLong: "minutes" },
  header: {
    tagline: "Atelier of beauty rituals",
    navAria: "Éclat Studio sections",
    nav: [
      { href: "#services", label: "Services" },
      { href: "#ritual", label: "Signature Ritual" },
      { href: "#team", label: "The Artists" },
      { href: "#shelf", label: "The Shelf" },
    ],
    bookCta: "Book an appointment",
  },
  hero: {
    eyebrow: "Jardins · São Paulo",
    title: "Beauty, made",
    titleItalic: "a slow ceremony",
    lede: "Éclat Studio is a house of unhurried rituals — where a haircut becomes an hour of quiet, a facial unfolds like a poem, and every guest leaves lit from within. Porcelain light, botanical hands, one guest at a time.",
    primaryCta: "Book an appointment",
    secondaryCta: "See the menu",
    scrollCue: "Discover",
    imageAlt: "The blush-toned interior of Éclat Studio bathed in soft morning light",
    stats: [
      { value: "12", label: "years of atelier" },
      { value: "6", label: "hands, one at a time" },
      { value: "98%", label: "return within a season" },
    ],
  },
  services: {
    eyebrow: "The menu",
    title: "Every service, a small ceremony",
    intro:
      "Four disciplines, one philosophy — nothing rushed, nothing generic. Choose a chapter and let the atelier take care of the rest.",
    tabsAria: "Service categories",
    durationLabel: "Duration",
    fromLabel: "from",
    bookLabel: "Book",
    categories: [
      {
        id: "hair",
        label: "Hair",
        blurb: "Cuts and colour drawn to the shape of your face and the light you live in.",
        items: [
          {
            id: "corte-eclat",
            name: "Corte Éclat",
            description: "A signature cut studied dry, then refined wet — architecture for your everyday.",
            durationMin: 60,
            price: 185,
          },
          {
            id: "balayage",
            name: "Balayage Lumière",
            description: "Hand-painted light, freehand and sun-kissed, sealed with a botanical gloss.",
            durationMin: 180,
            price: 640,
          },
          {
            id: "brushing",
            name: "Brushing Soie",
            description: "A silk blow-out with a warm rose finish that lasts three unbothered days.",
            durationMin: 45,
            price: 120,
          },
          {
            id: "coloracao",
            name: "Coloração Botânica",
            description: "Ammonia-free colour built from plant pigments for depth without the harshness.",
            durationMin: 120,
            price: 410,
          },
        ],
      },
      {
        id: "skin",
        label: "Skin",
        blurb: "Facials read like recipes — layered slowly, finished with cold porcelain stones.",
        items: [
          {
            id: "rose-radiance",
            name: "Facial Rosé Radiance",
            description: "A brightening ritual of rose enzymes, lymphatic sculpting and a glow you can feel.",
            durationMin: 75,
            price: 260,
          },
          {
            id: "peeling",
            name: "Peeling Porcelaine",
            description: "A gentle resurfacing peel that leaves skin poured-smooth and luminous.",
            durationMin: 60,
            price: 320,
          },
          {
            id: "microneedling",
            name: "Microneedling Velvet",
            description: "Collagen induction with a velvet recovery mask — firmness that arrives quietly.",
            durationMin: 90,
            price: 480,
          },
          {
            id: "gold-mask",
            name: "Máscara Ouro 24k",
            description: "A 24-karat gold-leaf mask for special evenings and skin that wants to shine.",
            durationMin: 50,
            price: 210,
          },
        ],
      },
      {
        id: "nails",
        label: "Nails",
        blurb: "Hands and feet treated like couture — precise, patient, quietly perfect.",
        items: [
          {
            id: "manicure",
            name: "Manicure Éclat",
            description: "A meticulous dry manicure finished in one of forty house shades.",
            durationMin: 45,
            price: 75,
          },
          {
            id: "pedicure",
            name: "Spa Pedicure Blush",
            description: "A warm rose soak, exfoliation and massage that reaches past the ankle.",
            durationMin: 60,
            price: 130,
          },
          {
            id: "gel",
            name: "Gel Porcelaine",
            description: "A featherlight gel with a porcelain shine that holds for three weeks.",
            durationMin: 75,
            price: 165,
          },
          {
            id: "nail-art",
            name: "Nail Art Couture",
            description: "Hand-drawn detail — chrome, lace or gold leaf, designed with you at the table.",
            durationMin: 90,
            price: 220,
          },
        ],
      },
      {
        id: "rituals",
        label: "Rituals",
        blurb: "Longer journeys for the body — the reason many guests first come to Éclat.",
        items: [
          {
            id: "petala",
            name: "Ritual Pétala",
            description: "Our signature two-and-a-half hours: bath, petals, mask, silk massage and gold.",
            durationMin: 150,
            price: 690,
          },
          {
            id: "massagem",
            name: "Massagem Seda",
            description: "A slow full-body massage with warm camellia oil and long, unhurried strokes.",
            durationMin: 80,
            price: 380,
          },
          {
            id: "banho-ouro",
            name: "Banho de Ouro",
            description: "A full-body gold-and-honey wrap that leaves skin luminous for days.",
            durationMin: 120,
            price: 540,
          },
          {
            id: "noiva",
            name: "Ritual Noiva",
            description: "The bridal morning: hair, skin, nails and a glass of something cold, unhurried.",
            durationMin: 240,
            price: 1450,
          },
        ],
      },
    ],
  },
  ritual: {
    eyebrow: "The signature",
    title: "Ritual Pétala,",
    titleItalic: "in six movements",
    intro:
      "Two and a half hours composed like music — six movements that carry you from the noise of the street to the quiet of your own skin. This is the ritual Éclat was built around.",
    stepLabel: "Movement",
    totalLabel: "Total ceremony",
    totalDurationMin: 150,
    imageAlt: "A pair of hands performing a rose-oil treatment during the Ritual Pétala",
    closingNote:
      "Each movement flows into the next without a break — no clock in the room, only the ritual and the light.",
    ctaLabel: "Book the Ritual Pétala",
    steps: [
      {
        numeral: "I",
        name: "Acolhimento",
        description: "A warm rose foot bath and a cup of hibiscus tea to leave the street behind.",
        durationMin: 15,
      },
      {
        numeral: "II",
        name: "Esfoliação de Pétalas",
        description: "A full-body exfoliation of crushed rose petals and raw cane sugar.",
        durationMin: 25,
      },
      {
        numeral: "III",
        name: "Máscara de Porcelana",
        description: "A cooling white-clay mask smoothed over skin and left to draw and brighten.",
        durationMin: 30,
      },
      {
        numeral: "IV",
        name: "Massagem Seda",
        description: "Long, slow strokes with warm camellia oil until the shoulders finally let go.",
        durationMin: 40,
      },
      {
        numeral: "V",
        name: "Toque de Ouro",
        description: "A finishing veil of 24-karat gold serum pressed gently into the face and décolleté.",
        durationMin: 25,
      },
      {
        numeral: "VI",
        name: "Repouso & Chá",
        description: "A quiet rest beneath a cashmere throw, closed with rose tea and honey.",
        durationMin: 15,
      },
    ],
  },
  team: {
    eyebrow: "The artists",
    title: "Six hands, chosen with care",
    intro:
      "Éclat is small on purpose. Three artists, each a specialist, each seeing one guest at a time. Pick the hands you would like to place yourself in.",
    specialtiesLabel: "Specialties",
    sinceLabel: "At Éclat since",
    bookWithLabel: "Book with",
    pickAria: "Choose a stylist",
    stylists: [
      {
        id: "isadora",
        name: "Isadora Prado",
        role: "Creative director · Colour",
        bio: "Trained in Paris and Milan, Isadora paints light into hair as if it were canvas — she founded Éclat to slow the whole craft down.",
        specialties: ["Balayage", "Botanical colour", "Editorial styling"],
        since: "2013",
      },
      {
        id: "camille",
        name: "Camille Okafor",
        role: "Skin therapist · Facials",
        bio: "A biochemist turned facialist, Camille reads skin like a chemist reads a formula — her Rosé Radiance has a three-month waiting list.",
        specialties: ["Facials", "Peels", "Microneedling"],
        since: "2016",
      },
      {
        id: "ravi",
        name: "Ravi Menon",
        role: "Master stylist · Cuts",
        bio: "Ravi cuts dry, freehand and unhurried, shaping hair to how you actually move through your days rather than how it sits in the chair.",
        specialties: ["Precision cuts", "Curl craft", "Blow-outs"],
        since: "2018",
      },
    ],
  },
  products: {
    eyebrow: "The shelf",
    title: "Take the ritual home",
    intro:
      "A short shelf of things we actually use on you — made in small batches, botanically led, never tested on anyone but ourselves.",
    quickViewLabel: "Quick view",
    closeLabel: "Close",
    sizeLabel: "Size",
    ingredientsLabel: "Key ingredients",
    reserveLabel: "Reserve in studio",
    shelfNote: "Every product is reserved in studio and gift-wrapped in rose tissue by hand.",
    items: [
      {
        id: "serum-rosa",
        name: "Sérum Pétala de Rosa",
        category: "Face serum",
        size: "30 ml",
        price: 145,
        blurb: "A weightless rose-petal serum for a lit-from-within glow.",
        description:
          "The bottled heart of our Rosé Radiance facial: a weightless serum of centifolia rose, niacinamide and hyaluronic acid that plumps, brightens and calms in a single layer, morning or night.",
        ingredients: ["Centifolia rose extract", "3% niacinamide", "Hyaluronic acid", "Squalane"],
        imageId: "photo-1571781926291-c477ebfd024b",
        imageAlt: "A frosted glass bottle of Sérum Pétala de Rosa on a blush surface",
      },
      {
        id: "oleo-capilar",
        name: "Óleo Capilar Seda",
        category: "Hair oil",
        size: "100 ml",
        price: 92,
        blurb: "A silk hair oil that tames frizz without a trace of weight.",
        description:
          "The finishing oil from our blow-out bar: camellia and marula oils smooth the cuticle and add a mirror shine, while a whisper of rose keeps it from ever feeling heavy.",
        ingredients: ["Camellia oil", "Marula oil", "Vitamin E", "Damask rose"],
        imageId: "photo-1560066984-138dadb4c035",
        imageAlt: "A slender amber bottle of Óleo Capilar Seda beside a styling brush",
      },
      {
        id: "mascara-ouro",
        name: "Máscara Facial Ouro",
        category: "Face mask",
        size: "50 ml",
        price: 178,
        blurb: "A 24-karat gold mask for evenings that deserve a glow.",
        description:
          "Real 24-karat gold leaf suspended in a firming gel of peptides and rose water — twenty minutes before an evening out and skin looks lifted, dewy and quietly expensive.",
        ingredients: ["24k gold leaf", "Peptide complex", "Rose water", "Aloe"],
        imageId: "photo-1596462502278-27bfdc403348",
        imageAlt: "A gold-flecked jar of Máscara Facial Ouro catching the light",
      },
      {
        id: "balsamo-labios",
        name: "Bálsamo Lábios Rosé",
        category: "Lip balm",
        size: "15 ml",
        price: 48,
        blurb: "A tinted rose balm that leaves lips soft and barely flushed.",
        description:
          "A cocoa-butter balm tinted the faintest rose, melting into a soft, natural flush — the colour our artists reach for between clients, and the one guests never leave without.",
        ingredients: ["Cocoa butter", "Shea", "Rosehip oil", "Mineral rose tint"],
        imageId: "photo-1487412947147-5cebf100ffc2",
        imageAlt: "A rose-tinted lip balm and a swatch of soft colour",
      },
      {
        id: "agua-micelar",
        name: "Água Micelar Porcelana",
        category: "Cleansing water",
        size: "200 ml",
        price: 64,
        blurb: "A porcelain-soft micellar water that lifts the day away.",
        description:
          "The first step of every facial: a gentle micellar water that dissolves makeup and city dust without stripping, leaving skin calm, clean and ready for whatever comes next.",
        ingredients: ["Micellar complex", "Chamomile", "Glycerin", "White tea"],
        imageId: "photo-1519415943484-9fa1873496d4",
        imageAlt: "A tall clear bottle of Água Micelar Porcelana on a calm surface",
      },
      {
        id: "creme-maos",
        name: "Creme Mãos Camélia",
        category: "Hand cream",
        size: "75 ml",
        price: 72,
        blurb: "A camellia hand cream that sinks in without a shine.",
        description:
          "The cream we finish every manicure with: camellia and shea nourish deeply while sinking in fast, so hands feel cared-for the moment you leave the table — no greasy afterthought.",
        ingredients: ["Camellia oil", "Shea butter", "Glycerin", "Damask rose"],
        imageId: "photo-1540555700478-4be289fbecef",
        imageAlt: "A soft tube of Creme Mãos Camélia resting on folded linen",
      },
    ],
  },
  booking: {
    eyebrow: "Appointments",
    title: "Reserve your ritual",
    intro:
      "Choose a service, the hands you would like, and a time that suits you. We hold each chair for one guest only — no double-booking, ever.",
    steps: { service: "Service", stylist: "Artist", time: "Time" },
    serviceTitle: "What are we creating today?",
    stylistTitle: "Whose hands would you like?",
    timeTitle: "Choose your day and hour",
    anyStylistName: "First available",
    anyStylistRole: "We choose the perfect artist for you",
    dateTitle: "Choose your day",
    closedLabel: "Closed",
    unavailableLabel: "Fully booked",
    seatingNote: "The studio opens at 09:00 and the last ritual begins at 18:30",
    backLabel: "Back",
    continueLabel: "Continue",
    confirmLabel: "Confirm appointment",
    summaryTitle: "Your appointment",
    summaryService: "Service",
    summaryStylist: "Artist",
    summaryDate: "Day",
    summaryTime: "Time",
    summaryTotal: "From",
    confirmedTitle: "Your chair is reserved",
    confirmedBody:
      "A confirmation is on its way to your inbox with a card to add the ritual to your calendar. Please arrive ten minutes early to settle in with a cup of rose tea.",
    confirmationLabel: "Reference",
    resetLabel: "Book another ritual",
    services: [
      { id: "corte-eclat", name: "Corte Éclat", durationMin: 60, price: 185 },
      { id: "balayage", name: "Balayage Lumière", durationMin: 180, price: 640 },
      { id: "rose-radiance", name: "Facial Rosé Radiance", durationMin: 75, price: 260 },
      { id: "petala", name: "Ritual Pétala", durationMin: 150, price: 690 },
      { id: "manicure", name: "Manicure Éclat", durationMin: 45, price: 75 },
    ],
    stylists: [
      { id: "isadora", name: "Isadora Prado", role: "Colour · Styling" },
      { id: "camille", name: "Camille Okafor", role: "Skin · Facials" },
      { id: "ravi", name: "Ravi Menon", role: "Cuts · Blow-outs" },
    ],
  },
  footer: {
    blurb: "A house of unhurried beauty rituals in the heart of Jardins, one guest at a time.",
    addressLabel: "Studio",
    address: ["Rua Bela Cintra 1820", "Jardins, São Paulo — SP", "01415-002, Brazil"],
    hoursLabel: "Hours",
    hours: ["Tuesday to Saturday", "09:00 — 20:00", "By appointment only"],
    contactLabel: "Contact",
    phone: "+55 11 3062 4180",
    email: "ola@eclatstudio.com.br",
    followLabel: "Follow",
    socials: ["Journal", "Newsletter", "The Studio"],
    fineprint: "© 2026 Éclat Studio · CNPJ 45.678.912/0001-30 · All rights reserved.",
  },
};

const pt: EclatContent = {
  format: { locale: "pt-BR", currency: "BRL" },
  common: { minShort: "min", minLong: "minutos" },
  header: {
    tagline: "Ateliê de rituais de beleza",
    navAria: "Seções do Éclat Studio",
    nav: [
      { href: "#services", label: "Serviços" },
      { href: "#ritual", label: "Ritual Assinatura" },
      { href: "#team", label: "As Artistas" },
      { href: "#shelf", label: "A Prateleira" },
    ],
    bookCta: "Agendar horário",
  },
  hero: {
    eyebrow: "Jardins · São Paulo",
    title: "Beleza feita",
    titleItalic: "de cerimônia lenta",
    lede: "O Éclat Studio é uma casa de rituais sem pressa — onde um corte vira uma hora de silêncio, um facial se abre como um poema e cada cliente sai iluminada por dentro. Luz de porcelana, mãos botânicas, uma pessoa de cada vez.",
    primaryCta: "Agendar horário",
    secondaryCta: "Ver o menu",
    scrollCue: "Descobrir",
    imageAlt: "O interior em tons de rosé do Éclat Studio banhado pela luz suave da manhã",
    stats: [
      { value: "12", label: "anos de ateliê" },
      { value: "6", label: "mãos, uma de cada vez" },
      { value: "98%", label: "voltam na mesma estação" },
    ],
  },
  services: {
    eyebrow: "O menu",
    title: "Cada serviço, uma pequena cerimônia",
    intro:
      "Quatro disciplinas, uma só filosofia — nada com pressa, nada genérico. Escolha um capítulo e deixe o ateliê cuidar do resto.",
    tabsAria: "Categorias de serviço",
    durationLabel: "Duração",
    fromLabel: "a partir de",
    bookLabel: "Agendar",
    categories: [
      {
        id: "hair",
        label: "Cabelo",
        blurb: "Cortes e cor desenhados para o formato do seu rosto e a luz em que você vive.",
        items: [
          {
            id: "corte-eclat",
            name: "Corte Éclat",
            description: "Um corte assinatura estudado a seco e refinado a úmido — arquitetura para o seu dia a dia.",
            durationMin: 60,
            price: 320,
          },
          {
            id: "balayage",
            name: "Balayage Lumière",
            description: "Luz pintada à mão, mecha a mecha, selada com um gloss botânico.",
            durationMin: 180,
            price: 980,
          },
          {
            id: "brushing",
            name: "Brushing Soie",
            description: "Uma escova de seda com finalização de rosa que dura três dias tranquilos.",
            durationMin: 45,
            price: 190,
          },
          {
            id: "coloracao",
            name: "Coloração Botânica",
            description: "Cor sem amônia construída com pigmentos vegetais, profundidade sem agressão.",
            durationMin: 120,
            price: 690,
          },
        ],
      },
      {
        id: "skin",
        label: "Pele",
        blurb: "Faciais que se leem como receitas — em camadas lentas, fechados com pedras frias de porcelana.",
        items: [
          {
            id: "rose-radiance",
            name: "Facial Rosé Radiance",
            description: "Um ritual iluminador de enzimas de rosa, escultura linfática e um viço que se sente.",
            durationMin: 75,
            price: 420,
          },
          {
            id: "peeling",
            name: "Peeling Porcelaine",
            description: "Um peeling suave de renovação que deixa a pele lisa como porcelana e luminosa.",
            durationMin: 60,
            price: 520,
          },
          {
            id: "microneedling",
            name: "Microneedling Velvet",
            description: "Indução de colágeno com máscara de recuperação aveludada — firmeza que chega em silêncio.",
            durationMin: 90,
            price: 780,
          },
          {
            id: "gold-mask",
            name: "Máscara Ouro 24k",
            description: "Uma máscara de folha de ouro 24 quilates para noites especiais e pele que quer brilhar.",
            durationMin: 50,
            price: 340,
          },
        ],
      },
      {
        id: "nails",
        label: "Unhas",
        blurb: "Mãos e pés tratados como alta-costura — precisos, pacientes, silenciosamente perfeitos.",
        items: [
          {
            id: "manicure",
            name: "Manicure Éclat",
            description: "Uma manicure russa meticulosa finalizada em um dos quarenta tons da casa.",
            durationMin: 45,
            price: 120,
          },
          {
            id: "pedicure",
            name: "Spa Pedicure Blush",
            description: "Uma imersão morna de rosas, esfoliação e massagem que passa do tornozelo.",
            durationMin: 60,
            price: 210,
          },
          {
            id: "gel",
            name: "Gel Porcelaine",
            description: "Um gel leve como pluma com brilho de porcelana que se mantém por três semanas.",
            durationMin: 75,
            price: 270,
          },
          {
            id: "nail-art",
            name: "Nail Art Couture",
            description: "Detalhe desenhado à mão — cromado, renda ou folha de ouro, criado com você à mesa.",
            durationMin: 90,
            price: 360,
          },
        ],
      },
      {
        id: "rituals",
        label: "Rituais",
        blurb: "Jornadas mais longas para o corpo — o motivo pelo qual muitas clientes chegam ao Éclat.",
        items: [
          {
            id: "petala",
            name: "Ritual Pétala",
            description: "Nossas duas horas e meia assinatura: banho, pétalas, máscara, massagem de seda e ouro.",
            durationMin: 150,
            price: 1120,
          },
          {
            id: "massagem",
            name: "Massagem Seda",
            description: "Uma massagem lenta de corpo inteiro com óleo morno de camélia e movimentos longos.",
            durationMin: 80,
            price: 620,
          },
          {
            id: "banho-ouro",
            name: "Banho de Ouro",
            description: "Um envolvimento corporal de ouro e mel que deixa a pele luminosa por dias.",
            durationMin: 120,
            price: 880,
          },
          {
            id: "noiva",
            name: "Ritual Noiva",
            description: "A manhã da noiva: cabelo, pele, unhas e uma taça de algo gelado, sem pressa.",
            durationMin: 240,
            price: 2380,
          },
        ],
      },
    ],
  },
  ritual: {
    eyebrow: "A assinatura",
    title: "Ritual Pétala,",
    titleItalic: "em seis movimentos",
    intro:
      "Duas horas e meia compostas como música — seis movimentos que levam você do barulho da rua ao silêncio da própria pele. Este é o ritual em torno do qual o Éclat nasceu.",
    stepLabel: "Movimento",
    totalLabel: "Cerimônia total",
    totalDurationMin: 150,
    imageAlt: "Um par de mãos realizando um tratamento de óleo de rosas durante o Ritual Pétala",
    closingNote:
      "Cada movimento flui para o seguinte sem pausa — nenhum relógio na sala, apenas o ritual e a luz.",
    ctaLabel: "Agendar o Ritual Pétala",
    steps: [
      {
        numeral: "I",
        name: "Acolhimento",
        description: "Um escalda-pés morno de rosas e uma xícara de chá de hibisco para deixar a rua para trás.",
        durationMin: 15,
      },
      {
        numeral: "II",
        name: "Esfoliação de Pétalas",
        description: "Uma esfoliação de corpo inteiro de pétalas de rosa e açúcar de cana cru.",
        durationMin: 25,
      },
      {
        numeral: "III",
        name: "Máscara de Porcelana",
        description: "Uma máscara refrescante de argila branca espalhada pela pele para clarear e purificar.",
        durationMin: 30,
      },
      {
        numeral: "IV",
        name: "Massagem Seda",
        description: "Movimentos longos e lentos com óleo morno de camélia até os ombros finalmente cederem.",
        durationMin: 40,
      },
      {
        numeral: "V",
        name: "Toque de Ouro",
        description: "Um véu final de sérum de ouro 24 quilates pressionado com delicadeza no rosto e colo.",
        durationMin: 25,
      },
      {
        numeral: "VI",
        name: "Repouso & Chá",
        description: "Um descanso silencioso sob uma manta de cashmere, encerrado com chá de rosas e mel.",
        durationMin: 15,
      },
    ],
  },
  team: {
    eyebrow: "As artistas",
    title: "Seis mãos, escolhidas com cuidado",
    intro:
      "O Éclat é pequeno de propósito. Três artistas, cada uma especialista, cada uma atendendo uma pessoa por vez. Escolha as mãos em que gostaria de se entregar.",
    specialtiesLabel: "Especialidades",
    sinceLabel: "No Éclat desde",
    bookWithLabel: "Agendar com",
    pickAria: "Escolher uma artista",
    stylists: [
      {
        id: "isadora",
        name: "Isadora Prado",
        role: "Diretora criativa · Cor",
        bio: "Formada em Paris e Milão, Isadora pinta luz nos cabelos como se fossem tela — fundou o Éclat para desacelerar todo o ofício.",
        specialties: ["Balayage", "Coloração botânica", "Styling editorial"],
        since: "2013",
      },
      {
        id: "camille",
        name: "Camille Okafor",
        role: "Terapeuta da pele · Faciais",
        bio: "Bioquímica que virou esteticista, Camille lê a pele como quem lê uma fórmula — seu Rosé Radiance tem fila de três meses.",
        specialties: ["Faciais", "Peelings", "Microagulhamento"],
        since: "2016",
      },
      {
        id: "ravi",
        name: "Ravi Menon",
        role: "Cabeleireiro master · Cortes",
        bio: "Ravi corta a seco, à mão livre e sem pressa, moldando o cabelo ao seu movimento real, não ao jeito que ele cai na cadeira.",
        specialties: ["Cortes de precisão", "Cachos", "Escovas"],
        since: "2018",
      },
    ],
  },
  products: {
    eyebrow: "A prateleira",
    title: "Leve o ritual para casa",
    intro:
      "Uma prateleira curta com o que de fato usamos em você — feito em pequenos lotes, de base botânica, testado só em nós mesmas.",
    quickViewLabel: "Ver detalhes",
    closeLabel: "Fechar",
    sizeLabel: "Tamanho",
    ingredientsLabel: "Ingredientes-chave",
    reserveLabel: "Reservar no estúdio",
    shelfNote: "Cada produto é reservado no estúdio e embrulhado à mão em papel de seda rosé.",
    items: [
      {
        id: "serum-rosa",
        name: "Sérum Pétala de Rosa",
        category: "Sérum facial",
        size: "30 ml",
        price: 240,
        blurb: "Um sérum leve de pétala de rosa para um viço que vem de dentro.",
        description:
          "O coração engarrafado do nosso facial Rosé Radiance: um sérum leve de rosa centifólia, niacinamida e ácido hialurônico que preenche, ilumina e acalma em uma só camada, manhã ou noite.",
        ingredients: ["Extrato de rosa centifólia", "Niacinamida 3%", "Ácido hialurônico", "Esqualano"],
        imageId: "photo-1571781926291-c477ebfd024b",
        imageAlt: "Um frasco de vidro fosco do Sérum Pétala de Rosa sobre superfície rosé",
      },
      {
        id: "oleo-capilar",
        name: "Óleo Capilar Seda",
        category: "Óleo capilar",
        size: "100 ml",
        price: 150,
        blurb: "Um óleo de seda que domina o frizz sem nenhum peso.",
        description:
          "O óleo finalizador do nosso bar de escovas: camélia e marula alisam a cutícula e dão um brilho de espelho, enquanto um sopro de rosa impede qualquer sensação de peso.",
        ingredients: ["Óleo de camélia", "Óleo de marula", "Vitamina E", "Rosa damascena"],
        imageId: "photo-1560066984-138dadb4c035",
        imageAlt: "Um frasco âmbar esguio do Óleo Capilar Seda ao lado de uma escova",
      },
      {
        id: "mascara-ouro",
        name: "Máscara Facial Ouro",
        category: "Máscara facial",
        size: "50 ml",
        price: 290,
        blurb: "Uma máscara de ouro 24k para as noites que merecem brilho.",
        description:
          "Folha de ouro 24 quilates suspensa em um gel firmador de peptídeos e água de rosas — vinte minutos antes de sair e a pele parece elevada, viçosa e discretamente luxuosa.",
        ingredients: ["Folha de ouro 24k", "Complexo de peptídeos", "Água de rosas", "Aloe"],
        imageId: "photo-1596462502278-27bfdc403348",
        imageAlt: "Um pote com reflexos dourados da Máscara Facial Ouro captando a luz",
      },
      {
        id: "balsamo-labios",
        name: "Bálsamo Lábios Rosé",
        category: "Bálsamo labial",
        size: "15 ml",
        price: 78,
        blurb: "Um bálsamo rosado que deixa os lábios macios e levemente corados.",
        description:
          "Um bálsamo de manteiga de cacau tingido do rosa mais sutil, derretendo em um corado natural — a cor que nossas artistas usam entre clientes e a que ninguém deixa de levar.",
        ingredients: ["Manteiga de cacau", "Karité", "Óleo de rosa mosqueta", "Pigmento mineral rosé"],
        imageId: "photo-1487412947147-5cebf100ffc2",
        imageAlt: "Um bálsamo labial rosado e um esfregaço de cor suave",
      },
      {
        id: "agua-micelar",
        name: "Água Micelar Porcelana",
        category: "Água de limpeza",
        size: "200 ml",
        price: 105,
        blurb: "Uma água micelar suave como porcelana que apaga o dia.",
        description:
          "O primeiro passo de todo facial: uma água micelar suave que dissolve maquiagem e poeira da cidade sem ressecar, deixando a pele calma, limpa e pronta para o que vier.",
        ingredients: ["Complexo micelar", "Camomila", "Glicerina", "Chá branco"],
        imageId: "photo-1519415943484-9fa1873496d4",
        imageAlt: "Um frasco alto e transparente da Água Micelar Porcelana sobre superfície calma",
      },
      {
        id: "creme-maos",
        name: "Creme Mãos Camélia",
        category: "Creme para as mãos",
        size: "75 ml",
        price: 118,
        blurb: "Um creme de camélia que absorve sem deixar brilho.",
        description:
          "O creme com que finalizamos cada manicure: camélia e karité nutrem profundamente e absorvem rápido, para que as mãos se sintam cuidadas no instante em que você deixa a mesa — sem oleosidade.",
        ingredients: ["Óleo de camélia", "Manteiga de karité", "Glicerina", "Rosa damascena"],
        imageId: "photo-1540555700478-4be289fbecef",
        imageAlt: "Uma bisnaga macia do Creme Mãos Camélia sobre linho dobrado",
      },
    ],
  },
  booking: {
    eyebrow: "Agendamentos",
    title: "Reserve o seu ritual",
    intro:
      "Escolha um serviço, as mãos que preferir e um horário que combine com você. Guardamos cada cadeira para uma única cliente — sem sobreposição, nunca.",
    steps: { service: "Serviço", stylist: "Artista", time: "Horário" },
    serviceTitle: "O que vamos criar hoje?",
    stylistTitle: "Em quais mãos você quer se entregar?",
    timeTitle: "Escolha o dia e a hora",
    anyStylistName: "Primeira disponível",
    anyStylistRole: "Escolhemos a artista perfeita para você",
    dateTitle: "Escolha o seu dia",
    closedLabel: "Fechado",
    unavailableLabel: "Lotado",
    seatingNote: "O estúdio abre às 09:00 e o último ritual começa às 18:30",
    backLabel: "Voltar",
    continueLabel: "Continuar",
    confirmLabel: "Confirmar agendamento",
    summaryTitle: "Seu agendamento",
    summaryService: "Serviço",
    summaryStylist: "Artista",
    summaryDate: "Dia",
    summaryTime: "Horário",
    summaryTotal: "A partir de",
    confirmedTitle: "Sua cadeira está reservada",
    confirmedBody:
      "Uma confirmação está a caminho do seu e-mail com um convite para adicionar o ritual à sua agenda. Chegue dez minutos antes para se acomodar com uma xícara de chá de rosas.",
    confirmationLabel: "Referência",
    resetLabel: "Agendar outro ritual",
    services: [
      { id: "corte-eclat", name: "Corte Éclat", durationMin: 60, price: 320 },
      { id: "balayage", name: "Balayage Lumière", durationMin: 180, price: 980 },
      { id: "rose-radiance", name: "Facial Rosé Radiance", durationMin: 75, price: 420 },
      { id: "petala", name: "Ritual Pétala", durationMin: 150, price: 1120 },
      { id: "manicure", name: "Manicure Éclat", durationMin: 45, price: 120 },
    ],
    stylists: [
      { id: "isadora", name: "Isadora Prado", role: "Cor · Styling" },
      { id: "camille", name: "Camille Okafor", role: "Pele · Faciais" },
      { id: "ravi", name: "Ravi Menon", role: "Cortes · Escovas" },
    ],
  },
  footer: {
    blurb: "Uma casa de rituais de beleza sem pressa no coração dos Jardins, uma pessoa de cada vez.",
    addressLabel: "Estúdio",
    address: ["Rua Bela Cintra 1820", "Jardins, São Paulo — SP", "01415-002, Brasil"],
    hoursLabel: "Horários",
    hours: ["De terça a sábado", "09:00 — 20:00", "Somente com hora marcada"],
    contactLabel: "Contato",
    phone: "+55 11 3062 4180",
    email: "ola@eclatstudio.com.br",
    followLabel: "Siga",
    socials: ["Journal", "Newsletter", "O Estúdio"],
    fineprint: "© 2026 Éclat Studio · CNPJ 45.678.912/0001-30 · Todos os direitos reservados.",
  },
};

const es: EclatContent = {
  format: { locale: "es-ES", currency: "EUR" },
  common: { minShort: "min", minLong: "minutos" },
  header: {
    tagline: "Atelier de rituales de belleza",
    navAria: "Secciones de Éclat Studio",
    nav: [
      { href: "#services", label: "Servicios" },
      { href: "#ritual", label: "Ritual Insignia" },
      { href: "#team", label: "Las Artistas" },
      { href: "#shelf", label: "La Estantería" },
    ],
    bookCta: "Reservar cita",
  },
  hero: {
    eyebrow: "Jardins · São Paulo",
    title: "Belleza hecha",
    titleItalic: "ceremonia lenta",
    lede: "Éclat Studio es una casa de rituales sin prisa — donde un corte se vuelve una hora de calma, un facial se despliega como un poema y cada clienta sale iluminada por dentro. Luz de porcelana, manos botánicas, una persona a la vez.",
    primaryCta: "Reservar cita",
    secondaryCta: "Ver la carta",
    scrollCue: "Descubrir",
    imageAlt: "El interior en tonos rosé de Éclat Studio bañado por la luz suave de la mañana",
    stats: [
      { value: "12", label: "años de atelier" },
      { value: "6", label: "manos, una a la vez" },
      { value: "98%", label: "vuelven en la misma temporada" },
    ],
  },
  services: {
    eyebrow: "La carta",
    title: "Cada servicio, una pequeña ceremonia",
    intro:
      "Cuatro disciplinas, una sola filosofía — nada con prisa, nada genérico. Elija un capítulo y deje que el atelier se ocupe del resto.",
    tabsAria: "Categorías de servicio",
    durationLabel: "Duración",
    fromLabel: "desde",
    bookLabel: "Reservar",
    categories: [
      {
        id: "hair",
        label: "Cabello",
        blurb: "Cortes y color trazados según la forma de su rostro y la luz en la que vive.",
        items: [
          {
            id: "corte-eclat",
            name: "Corte Éclat",
            description: "Un corte insignia estudiado en seco y refinado en húmedo — arquitectura para su día a día.",
            durationMin: 60,
            price: 165,
          },
          {
            id: "balayage",
            name: "Balayage Lumière",
            description: "Luz pintada a mano, mecha a mecha, sellada con un gloss botánico.",
            durationMin: 180,
            price: 580,
          },
          {
            id: "brushing",
            name: "Brushing Soie",
            description: "Un brushing de seda con acabado de rosa que dura tres días tranquilos.",
            durationMin: 45,
            price: 110,
          },
          {
            id: "coloracao",
            name: "Coloración Botánica",
            description: "Color sin amoníaco construido con pigmentos vegetales, profundidad sin agresión.",
            durationMin: 120,
            price: 380,
          },
        ],
      },
      {
        id: "skin",
        label: "Piel",
        blurb: "Faciales que se leen como recetas — en capas lentas, cerrados con piedras frías de porcelana.",
        items: [
          {
            id: "rose-radiance",
            name: "Facial Rosé Radiance",
            description: "Un ritual iluminador de enzimas de rosa, escultura linfática y un brillo que se siente.",
            durationMin: 75,
            price: 240,
          },
          {
            id: "peeling",
            name: "Peeling Porcelaine",
            description: "Un peeling suave de renovación que deja la piel lisa como porcelana y luminosa.",
            durationMin: 60,
            price: 290,
          },
          {
            id: "microneedling",
            name: "Microneedling Velvet",
            description: "Inducción de colágeno con mascarilla de recuperación aterciopelada — firmeza que llega en silencio.",
            durationMin: 90,
            price: 440,
          },
          {
            id: "gold-mask",
            name: "Máscara Ouro 24k",
            description: "Una mascarilla de pan de oro de 24 quilates para veladas especiales y piel que quiere brillar.",
            durationMin: 50,
            price: 190,
          },
        ],
      },
      {
        id: "nails",
        label: "Uñas",
        blurb: "Manos y pies tratados como alta costura — precisos, pacientes, silenciosamente perfectos.",
        items: [
          {
            id: "manicure",
            name: "Manicure Éclat",
            description: "Una manicura rusa meticulosa terminada en uno de los cuarenta tonos de la casa.",
            durationMin: 45,
            price: 68,
          },
          {
            id: "pedicure",
            name: "Spa Pedicure Blush",
            description: "Un baño tibio de rosas, exfoliación y masaje que pasa del tobillo.",
            durationMin: 60,
            price: 120,
          },
          {
            id: "gel",
            name: "Gel Porcelaine",
            description: "Un gel ligero como pluma con brillo de porcelana que aguanta tres semanas.",
            durationMin: 75,
            price: 150,
          },
          {
            id: "nail-art",
            name: "Nail Art Couture",
            description: "Detalle dibujado a mano — cromo, encaje o pan de oro, creado con usted en la mesa.",
            durationMin: 90,
            price: 200,
          },
        ],
      },
      {
        id: "rituals",
        label: "Rituales",
        blurb: "Viajes más largos para el cuerpo — la razón por la que muchas clientas llegan a Éclat.",
        items: [
          {
            id: "petala",
            name: "Ritual Pétala",
            description: "Nuestras dos horas y media insignia: baño, pétalos, mascarilla, masaje de seda y oro.",
            durationMin: 150,
            price: 620,
          },
          {
            id: "massagem",
            name: "Massagem Seda",
            description: "Un masaje lento de cuerpo entero con aceite tibio de camelia y movimientos largos.",
            durationMin: 80,
            price: 350,
          },
          {
            id: "banho-ouro",
            name: "Banho de Ouro",
            description: "Una envoltura corporal de oro y miel que deja la piel luminosa durante días.",
            durationMin: 120,
            price: 490,
          },
          {
            id: "noiva",
            name: "Ritual Noiva",
            description: "La mañana de la novia: cabello, piel, uñas y una copa de algo frío, sin prisa.",
            durationMin: 240,
            price: 1320,
          },
        ],
      },
    ],
  },
  ritual: {
    eyebrow: "La insignia",
    title: "Ritual Pétala,",
    titleItalic: "en seis movimientos",
    intro:
      "Dos horas y media compuestas como música — seis movimientos que la llevan del ruido de la calle al silencio de su propia piel. Este es el ritual en torno al cual nació Éclat.",
    stepLabel: "Movimiento",
    totalLabel: "Ceremonia total",
    totalDurationMin: 150,
    imageAlt: "Un par de manos realizando un tratamiento de aceite de rosas durante el Ritual Pétala",
    closingNote:
      "Cada movimiento fluye al siguiente sin pausa — ningún reloj en la sala, solo el ritual y la luz.",
    ctaLabel: "Reservar el Ritual Pétala",
    steps: [
      {
        numeral: "I",
        name: "Acolhimento",
        description: "Un baño de pies tibio de rosas y una taza de té de hibisco para dejar la calle atrás.",
        durationMin: 15,
      },
      {
        numeral: "II",
        name: "Esfoliação de Pétalas",
        description: "Una exfoliación de cuerpo entero de pétalos de rosa y azúcar de caña cruda.",
        durationMin: 25,
      },
      {
        numeral: "III",
        name: "Máscara de Porcelana",
        description: "Una mascarilla refrescante de arcilla blanca extendida sobre la piel para aclarar y purificar.",
        durationMin: 30,
      },
      {
        numeral: "IV",
        name: "Massagem Seda",
        description: "Movimientos largos y lentos con aceite tibio de camelia hasta que los hombros por fin ceden.",
        durationMin: 40,
      },
      {
        numeral: "V",
        name: "Toque de Ouro",
        description: "Un velo final de sérum de oro de 24 quilates presionado con delicadeza en rostro y escote.",
        durationMin: 25,
      },
      {
        numeral: "VI",
        name: "Repouso & Chá",
        description: "Un descanso silencioso bajo una manta de cachemira, cerrado con té de rosas y miel.",
        durationMin: 15,
      },
    ],
  },
  team: {
    eyebrow: "Las artistas",
    title: "Seis manos, elegidas con cuidado",
    intro:
      "Éclat es pequeño a propósito. Tres artistas, cada una especialista, cada una atendiendo a una persona a la vez. Elija las manos en las que le gustaría confiar.",
    specialtiesLabel: "Especialidades",
    sinceLabel: "En Éclat desde",
    bookWithLabel: "Reservar con",
    pickAria: "Elegir una artista",
    stylists: [
      {
        id: "isadora",
        name: "Isadora Prado",
        role: "Directora creativa · Color",
        bio: "Formada en París y Milán, Isadora pinta luz en el cabello como si fuera lienzo — fundó Éclat para ralentizar todo el oficio.",
        specialties: ["Balayage", "Color botánico", "Styling editorial"],
        since: "2013",
      },
      {
        id: "camille",
        name: "Camille Okafor",
        role: "Terapeuta de la piel · Faciales",
        bio: "Bioquímica reconvertida en esteticista, Camille lee la piel como quien lee una fórmula — su Rosé Radiance tiene lista de espera de tres meses.",
        specialties: ["Faciales", "Peelings", "Microneedling"],
        since: "2016",
      },
      {
        id: "ravi",
        name: "Ravi Menon",
        role: "Estilista master · Cortes",
        bio: "Ravi corta en seco, a mano alzada y sin prisa, moldeando el cabello a cómo se mueve realmente y no a cómo cae en la silla.",
        specialties: ["Cortes de precisión", "Rizos", "Brushings"],
        since: "2018",
      },
    ],
  },
  products: {
    eyebrow: "La estantería",
    title: "Llévese el ritual a casa",
    intro:
      "Una estantería breve con lo que de verdad usamos en usted — hecho en pequeños lotes, de base botánica, probado solo en nosotras mismas.",
    quickViewLabel: "Ver detalle",
    closeLabel: "Cerrar",
    sizeLabel: "Tamaño",
    ingredientsLabel: "Ingredientes clave",
    reserveLabel: "Reservar en el estudio",
    shelfNote: "Cada producto se reserva en el estudio y se envuelve a mano en papel de seda rosé.",
    items: [
      {
        id: "serum-rosa",
        name: "Sérum Pétala de Rosa",
        category: "Sérum facial",
        size: "30 ml",
        price: 130,
        blurb: "Un sérum ligero de pétalo de rosa para un brillo que nace dentro.",
        description:
          "El corazón embotellado de nuestro facial Rosé Radiance: un sérum ligero de rosa centifolia, niacinamida y ácido hialurónico que rellena, ilumina y calma en una sola capa, mañana o noche.",
        ingredients: ["Extracto de rosa centifolia", "Niacinamida 3%", "Ácido hialurónico", "Escualano"],
        imageId: "photo-1571781926291-c477ebfd024b",
        imageAlt: "Un frasco de vidrio esmerilado del Sérum Pétala de Rosa sobre superficie rosé",
      },
      {
        id: "oleo-capilar",
        name: "Óleo Capilar Seda",
        category: "Aceite capilar",
        size: "100 ml",
        price: 84,
        blurb: "Un aceite de seda que domina el frizz sin rastro de peso.",
        description:
          "El aceite de acabado de nuestra barra de brushing: camelia y marula alisan la cutícula y dan un brillo de espejo, mientras un susurro de rosa evita cualquier sensación de peso.",
        ingredients: ["Aceite de camelia", "Aceite de marula", "Vitamina E", "Rosa de Damasco"],
        imageId: "photo-1560066984-138dadb4c035",
        imageAlt: "Un frasco ámbar esbelto del Óleo Capilar Seda junto a un cepillo",
      },
      {
        id: "mascara-ouro",
        name: "Máscara Facial Ouro",
        category: "Mascarilla facial",
        size: "50 ml",
        price: 160,
        blurb: "Una mascarilla de oro de 24k para las noches que merecen brillo.",
        description:
          "Pan de oro de 24 quilates suspendido en un gel reafirmante de péptidos y agua de rosas — veinte minutos antes de salir y la piel se ve elevada, jugosa y discretamente lujosa.",
        ingredients: ["Pan de oro 24k", "Complejo de péptidos", "Agua de rosas", "Aloe"],
        imageId: "photo-1596462502278-27bfdc403348",
        imageAlt: "Un tarro con reflejos dorados de la Máscara Facial Ouro captando la luz",
      },
      {
        id: "balsamo-labios",
        name: "Bálsamo Lábios Rosé",
        category: "Bálsamo labial",
        size: "15 ml",
        price: 42,
        blurb: "Un bálsamo rosado que deja los labios suaves y apenas sonrosados.",
        description:
          "Un bálsamo de manteca de cacao teñido del rosa más sutil, fundiéndose en un rubor natural — el color al que recurren nuestras artistas entre clientas y el que nadie se va sin llevar.",
        ingredients: ["Manteca de cacao", "Karité", "Aceite de rosa mosqueta", "Pigmento mineral rosé"],
        imageId: "photo-1487412947147-5cebf100ffc2",
        imageAlt: "Un bálsamo labial rosado y una pincelada de color suave",
      },
      {
        id: "agua-micelar",
        name: "Água Micelar Porcelana",
        category: "Agua limpiadora",
        size: "200 ml",
        price: 58,
        blurb: "Un agua micelar suave como porcelana que borra el día.",
        description:
          "El primer paso de cada facial: un agua micelar suave que disuelve el maquillaje y el polvo de la ciudad sin resecar, dejando la piel calmada, limpia y lista para lo que venga.",
        ingredients: ["Complejo micelar", "Manzanilla", "Glicerina", "Té blanco"],
        imageId: "photo-1519415943484-9fa1873496d4",
        imageAlt: "Un frasco alto y transparente del Água Micelar Porcelana sobre superficie calmada",
      },
      {
        id: "creme-maos",
        name: "Creme Mãos Camélia",
        category: "Crema de manos",
        size: "75 ml",
        price: 65,
        blurb: "Una crema de camelia que se absorbe sin dejar brillo.",
        description:
          "La crema con la que terminamos cada manicura: camelia y karité nutren en profundidad y se absorben rápido, para que las manos se sientan cuidadas al instante en que deja la mesa — sin grasa.",
        ingredients: ["Aceite de camelia", "Manteca de karité", "Glicerina", "Rosa de Damasco"],
        imageId: "photo-1540555700478-4be289fbecef",
        imageAlt: "Un tubo suave del Creme Mãos Camélia reposando sobre lino doblado",
      },
    ],
  },
  booking: {
    eyebrow: "Citas",
    title: "Reserve su ritual",
    intro:
      "Elija un servicio, las manos que prefiera y una hora que le convenga. Guardamos cada sillón para una sola clienta — sin solapamientos, nunca.",
    steps: { service: "Servicio", stylist: "Artista", time: "Hora" },
    serviceTitle: "¿Qué vamos a crear hoy?",
    stylistTitle: "¿En qué manos quiere confiar?",
    timeTitle: "Elija su día y su hora",
    anyStylistName: "Primera disponible",
    anyStylistRole: "Elegimos la artista perfecta para usted",
    dateTitle: "Elija su día",
    closedLabel: "Cerrado",
    unavailableLabel: "Completo",
    seatingNote: "El estudio abre a las 09:00 y el último ritual comienza a las 18:30",
    backLabel: "Volver",
    continueLabel: "Continuar",
    confirmLabel: "Confirmar cita",
    summaryTitle: "Su cita",
    summaryService: "Servicio",
    summaryStylist: "Artista",
    summaryDate: "Día",
    summaryTime: "Hora",
    summaryTotal: "Desde",
    confirmedTitle: "Su sillón está reservado",
    confirmedBody:
      "Una confirmación va de camino a su correo con una tarjeta para añadir el ritual a su calendario. Llegue diez minutos antes para acomodarse con una taza de té de rosas.",
    confirmationLabel: "Referencia",
    resetLabel: "Reservar otro ritual",
    services: [
      { id: "corte-eclat", name: "Corte Éclat", durationMin: 60, price: 165 },
      { id: "balayage", name: "Balayage Lumière", durationMin: 180, price: 580 },
      { id: "rose-radiance", name: "Facial Rosé Radiance", durationMin: 75, price: 240 },
      { id: "petala", name: "Ritual Pétala", durationMin: 150, price: 620 },
      { id: "manicure", name: "Manicure Éclat", durationMin: 45, price: 68 },
    ],
    stylists: [
      { id: "isadora", name: "Isadora Prado", role: "Color · Styling" },
      { id: "camille", name: "Camille Okafor", role: "Piel · Faciales" },
      { id: "ravi", name: "Ravi Menon", role: "Cortes · Brushings" },
    ],
  },
  footer: {
    blurb: "Una casa de rituales de belleza sin prisa en el corazón de Jardins, una persona a la vez.",
    addressLabel: "Estudio",
    address: ["Rua Bela Cintra 1820", "Jardins, São Paulo — SP", "01415-002, Brasil"],
    hoursLabel: "Horario",
    hours: ["De martes a sábado", "09:00 — 20:00", "Solo con cita previa"],
    contactLabel: "Contacto",
    phone: "+55 11 3062 4180",
    email: "ola@eclatstudio.com.br",
    followLabel: "Síganos",
    socials: ["Journal", "Newsletter", "El Estudio"],
    fineprint: "© 2026 Éclat Studio · CNPJ 45.678.912/0001-30 · Todos los derechos reservados.",
  },
};

export const eclatDictionary: DemoDictionary<EclatContent> = { en, pt, es };
