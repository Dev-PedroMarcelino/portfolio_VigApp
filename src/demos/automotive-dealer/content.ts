import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface NavItem {
  href: string;
  label: string;
}

export interface HeaderContent {
  nav: NavItem[];
  cta: string;
  openMenu: string;
  closeMenu: string;
}

export interface HeroStat {
  value: number;
  decimals: number;
  suffix: string;
  label: string;
}

export interface HeroContent {
  kicker: string;
  model: string;
  line1: string;
  line2: string;
  sub: string;
  ctaBuild: string;
  ctaDrive: string;
  imageAlt: string;
  marquee: string;
  stats: HeroStat[];
  scrollHint: string;
}

export interface ModelSpec {
  label: string;
  value: string;
}

export interface LineupModel {
  id: string;
  name: string;
  category: string;
  tagline: string;
  image: string;
  imageAlt: string;
  power: string;
  accel: string;
  topSpeed: string;
  priceFrom: number;
  description: string;
  specs: ModelSpec[];
}

export interface LineupContent {
  label: string;
  title: string;
  intro: string;
  fromLabel: string;
  powerLabel: string;
  accelLabel: string;
  topSpeedLabel: string;
  buildCta: string;
  priceLocale: string;
  currency: string;
  models: LineupModel[];
}

export interface TrimOption {
  id: string;
  name: string;
  note: string;
  priceDelta: number;
  power: string;
}

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  finish: string;
  priceDelta: number;
}

export interface WheelOption {
  id: string;
  name: string;
  note: string;
  priceDelta: number;
}

export interface ConfiguratorContent {
  label: string;
  title: string;
  intro: string;
  baseName: string;
  basePrice: number;
  trimLabel: string;
  colorLabel: string;
  wheelLabel: string;
  totalLabel: string;
  fromNote: string;
  powerNote: string;
  reserveCta: string;
  reserveNote: string;
  successTitle: string;
  successBody: string;
  reset: string;
  summaryTitle: string;
  addLabel: string;
  includedLabel: string;
  priceLocale: string;
  currency: string;
  trims: TrimOption[];
  colors: ColorOption[];
  wheels: WheelOption[];
}

export interface PerfMetric {
  id: string;
  label: string;
  value: number;
  decimals: number;
  suffix: string;
  fill: number;
  note: string;
}

export interface LadderRow {
  label: string;
  value: string;
}

export interface PerfContent {
  label: string;
  title: string;
  intro: string;
  imageAlt: string;
  metricsTitle: string;
  metrics: PerfMetric[];
  ladderTitle: string;
  ladder: LadderRow[];
  curveTitle: string;
  curveNote: string;
  powerCurveLabel: string;
  torqueCurveLabel: string;
  rpmLabel: string;
}

export interface TestDriveContent {
  label: string;
  title: string;
  intro: string;
  imageAlt: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  modelLabel: string;
  models: string[];
  locationLabel: string;
  locations: string[];
  dateLabel: string;
  slotLabel: string;
  slots: string[];
  submit: string;
  successTitle: string;
  successBody: string;
  another: string;
  refPrefix: string;
  assurances: string[];
}

export interface FinancingContent {
  label: string;
  title: string;
  intro: string;
  priceLabel: string;
  downLabel: string;
  termLabel: string;
  termUnit: string;
  aprLabel: string;
  apr: number;
  installmentLabel: string;
  monthlyUnit: string;
  totalLabel: string;
  interestLabel: string;
  financedLabel: string;
  downPctLabel: string;
  disclaimer: string;
  ctaDrive: string;
  priceMin: number;
  priceMax: number;
  priceDefault: number;
  priceStep: number;
  downMax: number;
  downDefault: number;
  downStep: number;
  terms: number[];
  termDefault: number;
  priceLocale: string;
  currency: string;
}

export interface FooterContent {
  tagline: string;
  exploreLabel: string;
  visitLabel: string;
  followLabel: string;
  nav: NavItem[];
  addressLines: string[];
  hoursNote: string;
  phone: string;
  email: string;
  social: { label: string; handle: string }[];
  legal: string[];
  fine: string;
  credit: string;
}

export interface ApexContent {
  header: HeaderContent;
  hero: HeroContent;
  lineup: LineupContent;
  configurator: ConfiguratorContent;
  performance: PerfContent;
  testDrive: TestDriveContent;
  financing: FinancingContent;
  footer: FooterContent;
}

/* ------------------------------------------------------------------ */
/* Shared, locale-independent image ids                                */
/* ------------------------------------------------------------------ */

const IMG = {
  corsa: "photo-1553440569-bcc63803a83d",
  stradale: "photo-1583121274602-3e2820c69888",
  veloce: "photo-1552519507-da3b142c6e3d",
  perf: "photo-1542362567-b07e54358753",
  interior: "photo-1511919884226-fd3cad34687c",
} as const;

/* ------------------------------------------------------------------ */
/* Dictionary                                                          */
/* ------------------------------------------------------------------ */

export const apexDict: DemoDictionary<ApexContent> = {
  en: {
    header: {
      nav: [
        { href: "#lineup", label: "Lineup" },
        { href: "#configurator", label: "Build" },
        { href: "#performance", label: "Performance" },
        { href: "#financing", label: "Financing" },
      ],
      cta: "Book test drive",
      openMenu: "Open navigation",
      closeMenu: "Close navigation",
    },
    hero: {
      kicker: "Apex Motors · Stradale Series",
      model: "Stradale RS",
      line1: "Built to bend",
      line2: "the horizon.",
      sub: "A twin-turbo V8 wrapped in a carbon-fibre monocoque. The Stradale RS is our purest expression of speed — engineered in Maranello, tuned on the Nurburgring, delivered to your door.",
      ctaBuild: "Build yours",
      ctaDrive: "Book a test drive",
      imageAlt: "Apex Motors Stradale RS sports car photographed at dusk on an open road",
      marquee: "TWIN-TURBO V8 · CARBON MONOCOQUE · 830 HP · REAR-WHEEL STEER · ACTIVE AERO · ",
      stats: [
        { value: 2.6, decimals: 1, suffix: "s", label: "0 – 100 km/h" },
        { value: 830, decimals: 0, suffix: "hp", label: "Maximum power" },
        { value: 340, decimals: 0, suffix: "km/h", label: "Top speed" },
      ],
      scrollHint: "Scroll to explore",
    },
    lineup: {
      label: "The lineup",
      title: "Three machines, one obsession",
      intro: "Every Apex is hand-assembled in Maranello and signed by the engineer who built its engine. Choose the character; the precision is a given.",
      fromLabel: "From",
      powerLabel: "Power",
      accelLabel: "0 – 100",
      topSpeedLabel: "Top speed",
      buildCta: "Configure this model",
      priceLocale: "en-US",
      currency: "USD",
      models: [
        {
          id: "corsa",
          name: "Corsa GT",
          category: "Grand tourer",
          tagline: "Continents, quartered.",
          image: IMG.corsa,
          imageAlt: "Apex Motors Corsa GT grand touring coupe on a coastal highway",
          power: "640 hp",
          accel: "3.1 s",
          topSpeed: "318 km/h",
          priceFrom: 189000,
          description: "A front-mid V8 grand tourer that swallows a thousand kilometres before breakfast, then hunts an apex on the way home.",
          specs: [
            { label: "Engine", value: "3.9L twin-turbo V8" },
            { label: "Torque", value: "760 Nm" },
            { label: "Drivetrain", value: "Rear-wheel drive" },
            { label: "Weight", value: "1,570 kg" },
          ],
        },
        {
          id: "stradale",
          name: "Stradale RS",
          category: "Supercar",
          tagline: "Built to bend the horizon.",
          image: IMG.stradale,
          imageAlt: "Apex Motors Stradale RS supercar with the doors open in a studio",
          power: "830 hp",
          accel: "2.6 s",
          topSpeed: "340 km/h",
          priceFrom: 268000,
          description: "The flagship. A carbon monocoque, active aerodynamics and rear-wheel steering that shrink the track around you.",
          specs: [
            { label: "Engine", value: "4.0L twin-turbo V8" },
            { label: "Torque", value: "900 Nm" },
            { label: "Drivetrain", value: "Rear-wheel drive" },
            { label: "Weight", value: "1,470 kg" },
          ],
        },
        {
          id: "veloce",
          name: "Veloce Spyder",
          category: "Open-top roadster",
          tagline: "Sky optional, never off.",
          image: IMG.veloce,
          imageAlt: "Apex Motors Veloce Spyder open-top roadster in racing red",
          power: "720 hp",
          accel: "2.9 s",
          topSpeed: "325 km/h",
          priceFrom: 312000,
          description: "A folding hardtop roadster with a naturally aspirated soundtrack — the loudest way to lose the roof and gain a horizon.",
          specs: [
            { label: "Engine", value: "4.5L V8, naturally aspirated" },
            { label: "Torque", value: "690 Nm" },
            { label: "Drivetrain", value: "Rear-wheel drive" },
            { label: "Weight", value: "1,520 kg" },
          ],
        },
      ],
    },
    configurator: {
      label: "Build & price",
      title: "Configure your Stradale RS",
      intro: "Three moves to your specification. The silhouette repaints as you choose — the total updates the instant you commit.",
      baseName: "Stradale RS",
      basePrice: 268000,
      trimLabel: "Trim",
      colorLabel: "Paint",
      wheelLabel: "Wheels",
      totalLabel: "Your build",
      fromNote: "Estimated on-the-road price",
      powerNote: "Output",
      reserveCta: "Reserve this build",
      reserveNote: "Refundable deposit · Delivery in 14 months",
      successTitle: "Build reserved.",
      successBody: "Reference APX-6620 is locked in. A product specialist from Maranello will call within one business day to confirm your specification and delivery slot.",
      reset: "Configure another",
      summaryTitle: "Specification",
      addLabel: "Options",
      includedLabel: "Included",
      priceLocale: "en-US",
      currency: "USD",
      trims: [
        { id: "corsa", name: "Stradale", note: "The definitive road car", priceDelta: 0, power: "830 hp" },
        { id: "competizione", name: "Competizione", note: "Track-honed aero and titanium exhaust", priceDelta: 42000, power: "870 hp" },
        { id: "trackpack", name: "Corsa Track Pack", note: "Roll cage, telemetry, magnesium everything", priceDelta: 78000, power: "910 hp" },
      ],
      colors: [
        { id: "rosso", name: "Rosso Apex", hex: "#C8102E", finish: "Gloss", priceDelta: 0 },
        { id: "nero", name: "Nero Carbonio", hex: "#0C0C0F", finish: "Matte", priceDelta: 0 },
        { id: "argento", name: "Argento Pista", hex: "#B8BAC2", finish: "Metallic", priceDelta: 2500 },
        { id: "titanio", name: "Grigio Titanio", hex: "#3A3D44", finish: "Matte metallic", priceDelta: 2500 },
        { id: "blu", name: "Blu Nurburg", hex: "#24406B", finish: "Metallic", priceDelta: 3800 },
        { id: "bianco", name: "Bianco Ghiaccio", hex: "#E9EAEC", finish: "Gloss", priceDelta: 2500 },
      ],
      wheels: [
        { id: "forged20", name: "Forged 20-inch Corsa", note: "Diamond-cut, gloss black", priceDelta: 0 },
        { id: "forged21", name: "Forged 21-inch Aero", note: "Turbine-vane, satin finish", priceDelta: 6500 },
        { id: "mag21", name: "Magnesium 21-inch Track", note: "Centre-lock, minus 11 kg", priceDelta: 14000 },
      ],
    },
    performance: {
      label: "Performance data",
      title: "Numbers that leave a mark",
      intro: "Measured at the Fiorano test track, dry tarmac, one occupant. No launch-control asterisks, no rolling starts.",
      imageAlt: "Front view of the Apex Motors Stradale RS showing its aggressive intakes and headlights",
      metricsTitle: "Envelope",
      metrics: [
        { id: "power", label: "Peak power", value: 830, decimals: 0, suffix: "hp", fill: 92, note: "at 8,000 rpm" },
        { id: "torque", label: "Peak torque", value: 900, decimals: 0, suffix: "Nm", fill: 88, note: "at 3,000 rpm" },
        { id: "downforce", label: "Downforce", value: 390, decimals: 0, suffix: "kg", fill: 78, note: "at 250 km/h" },
        { id: "lateral", label: "Lateral grip", value: 1.35, decimals: 2, suffix: "g", fill: 84, note: "sustained cornering" },
        { id: "ratio", label: "Power-to-weight", value: 565, decimals: 0, suffix: "hp/t", fill: 90, note: "dry weight basis" },
      ],
      ladderTitle: "Standing acceleration",
      ladder: [
        { label: "0 – 100 km/h", value: "2.6 s" },
        { label: "0 – 200 km/h", value: "7.4 s" },
        { label: "0 – 300 km/h", value: "18.9 s" },
        { label: "400 m", value: "10.1 s" },
        { label: "100 – 0 km/h braking", value: "29 m" },
      ],
      curveTitle: "Power delivery",
      curveNote: "Power climbs to 8,000 rpm while torque holds a plateau from 3,000 — the reason it pulls hard everywhere, not just at the top.",
      powerCurveLabel: "Power (hp)",
      torqueCurveLabel: "Torque (Nm)",
      rpmLabel: "Engine speed (rpm)",
    },
    testDrive: {
      label: "Test drive",
      title: "Feel it before you commit",
      intro: "Ninety minutes, a professional co-driver and a route we designed to show a car its manners. Choose a showroom and a time.",
      imageAlt: "Driver-focused cockpit of an Apex Motors car with a carbon steering wheel",
      nameLabel: "Full name",
      namePlaceholder: "Marina Albuquerque",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      phoneLabel: "Phone",
      phonePlaceholder: "+1 (555) 018 4420",
      modelLabel: "Model of interest",
      models: ["Corsa GT", "Stradale RS", "Veloce Spyder", "Undecided — surprise me"],
      locationLabel: "Showroom",
      locations: ["Apex Manhattan — 11th Ave", "Apex Miami — Design District", "Apex Los Angeles — Beverly Hills"],
      dateLabel: "Preferred date",
      slotLabel: "Time slot",
      slots: ["09:00", "11:00", "14:00", "16:30"],
      submit: "Request my drive",
      successTitle: "Your drive is pencilled in.",
      successBody: "We have reserved the car and the route. A concierge will confirm your slot by phone within a few hours.",
      another: "Book another drive",
      refPrefix: "Booking reference",
      assurances: [
        "No obligation, no sales pressure",
        "Full insurance on every drive",
        "Bring a passenger, we insist",
      ],
    },
    financing: {
      label: "Financing",
      title: "Own it on your terms",
      intro: "Move the sliders. The monthly figure recalculates live, so you can find the shape of the deal before you ever sign a line.",
      priceLabel: "Vehicle price",
      downLabel: "Down payment",
      termLabel: "Term",
      termUnit: "months",
      aprLabel: "Fixed APR",
      apr: 5.9,
      installmentLabel: "Estimated monthly",
      monthlyUnit: "/mo",
      totalLabel: "Total of payments",
      interestLabel: "Total interest",
      financedLabel: "Amount financed",
      downPctLabel: "of price",
      disclaimer: "Illustrative figures for a fictional concept. Actual terms depend on approved credit, residual value and jurisdiction.",
      ctaDrive: "Speak to a specialist",
      priceMin: 150000,
      priceMax: 400000,
      priceDefault: 268000,
      priceStep: 1000,
      downMax: 240000,
      downDefault: 80000,
      downStep: 1000,
      terms: [24, 36, 48, 60, 72],
      termDefault: 48,
      priceLocale: "en-US",
      currency: "USD",
    },
    footer: {
      tagline: "Hand-built performance, delivered worldwide.",
      exploreLabel: "Explore",
      visitLabel: "Flagship atelier",
      followLabel: "Follow",
      nav: [
        { href: "#lineup", label: "Lineup" },
        { href: "#configurator", label: "Build & price" },
        { href: "#performance", label: "Performance" },
        { href: "#testdrive", label: "Test drive" },
        { href: "#financing", label: "Financing" },
      ],
      addressLines: ["Apex Motors Atelier", "Via dei Piloti 12, Maranello, Italy"],
      hoursNote: "Showroom open Mon – Sat, 09:00 – 19:00",
      phone: "+39 0536 949 200",
      email: "atelier@apexmotors.com",
      social: [
        { label: "Instagram", handle: "@apexmotors" },
        { label: "YouTube", handle: "/apexmotors" },
        { label: "Newsletter", handle: "The Pit Wall" },
      ],
      legal: ["Privacy", "Terms", "Cookie preferences"],
      fine: "Apex Motors is a fictional brand imagined as a design concept. Vehicles, specifications and prices are illustrative.",
      credit: "Concept, design and build by VigApp.",
    },
  },

  pt: {
    header: {
      nav: [
        { href: "#lineup", label: "Linha" },
        { href: "#configurator", label: "Configurar" },
        { href: "#performance", label: "Desempenho" },
        { href: "#financing", label: "Financiamento" },
      ],
      cta: "Agendar test drive",
      openMenu: "Abrir navegação",
      closeMenu: "Fechar navegação",
    },
    hero: {
      kicker: "Apex Motors · Série Stradale",
      model: "Stradale RS",
      line1: "Feito para curvar",
      line2: "o horizonte.",
      sub: "Um V8 biturbo envolto num monocoque de fibra de carbono. O Stradale RS é a nossa expressão mais pura de velocidade — projetado em Maranello, afinado em Nurburgring, entregue na sua porta.",
      ctaBuild: "Monte o seu",
      ctaDrive: "Agendar test drive",
      imageAlt: "Esportivo Apex Motors Stradale RS fotografado ao anoitecer numa estrada aberta",
      marquee: "V8 BITURBO · MONOCOQUE DE CARBONO · 830 CV · ESTERÇAMENTO TRASEIRO · AERO ATIVO · ",
      stats: [
        { value: 2.6, decimals: 1, suffix: "s", label: "0 – 100 km/h" },
        { value: 830, decimals: 0, suffix: "cv", label: "Potência máxima" },
        { value: 340, decimals: 0, suffix: "km/h", label: "Velocidade máxima" },
      ],
      scrollHint: "Role para explorar",
    },
    lineup: {
      label: "A linha",
      title: "Três máquinas, uma obsessão",
      intro: "Cada Apex é montado à mão em Maranello e assinado pelo engenheiro que construiu seu motor. Escolha o caráter; a precisão é garantida.",
      fromLabel: "A partir de",
      powerLabel: "Potência",
      accelLabel: "0 – 100",
      topSpeedLabel: "Velocidade máx.",
      buildCta: "Configurar este modelo",
      priceLocale: "pt-BR",
      currency: "BRL",
      models: [
        {
          id: "corsa",
          name: "Corsa GT",
          category: "Grande turismo",
          tagline: "Continentes, em frações.",
          image: IMG.corsa,
          imageAlt: "Cupê grande turismo Apex Motors Corsa GT numa estrada litorânea",
          power: "640 cv",
          accel: "3,1 s",
          topSpeed: "318 km/h",
          priceFrom: 1090000,
          description: "Um grande turismo V8 central-dianteiro que devora mil quilômetros antes do café e ainda caça uma curva no caminho de volta.",
          specs: [
            { label: "Motor", value: "V8 3.9L biturbo" },
            { label: "Torque", value: "760 Nm" },
            { label: "Tração", value: "Traseira" },
            { label: "Peso", value: "1.570 kg" },
          ],
        },
        {
          id: "stradale",
          name: "Stradale RS",
          category: "Superesportivo",
          tagline: "Feito para curvar o horizonte.",
          image: IMG.stradale,
          imageAlt: "Superesportivo Apex Motors Stradale RS com as portas abertas em estúdio",
          power: "830 cv",
          accel: "2,6 s",
          topSpeed: "340 km/h",
          priceFrom: 1540000,
          description: "O carro-chefe. Monocoque de carbono, aerodinâmica ativa e esterçamento traseiro que encolhem a pista à sua volta.",
          specs: [
            { label: "Motor", value: "V8 4.0L biturbo" },
            { label: "Torque", value: "900 Nm" },
            { label: "Tração", value: "Traseira" },
            { label: "Peso", value: "1.470 kg" },
          ],
        },
        {
          id: "veloce",
          name: "Veloce Spyder",
          category: "Conversível",
          tagline: "Céu opcional, nunca desligado.",
          image: IMG.veloce,
          imageAlt: "Conversível Apex Motors Veloce Spyder na cor vermelho de corrida",
          power: "720 cv",
          accel: "2,9 s",
          topSpeed: "325 km/h",
          priceFrom: 1790000,
          description: "Um roadster de teto rígido retrátil com trilha sonora aspirada — a forma mais barulhenta de perder o teto e ganhar horizonte.",
          specs: [
            { label: "Motor", value: "V8 4.5L aspirado" },
            { label: "Torque", value: "690 Nm" },
            { label: "Tração", value: "Traseira" },
            { label: "Peso", value: "1.520 kg" },
          ],
        },
      ],
    },
    configurator: {
      label: "Monte e calcule",
      title: "Configure seu Stradale RS",
      intro: "Três passos até a sua especificação. A silhueta se repinta a cada escolha — o total se atualiza no instante em que você decide.",
      baseName: "Stradale RS",
      basePrice: 1540000,
      trimLabel: "Versão",
      colorLabel: "Pintura",
      wheelLabel: "Rodas",
      totalLabel: "Sua configuração",
      fromNote: "Preço estimado com documentação",
      powerNote: "Potência",
      reserveCta: "Reservar esta configuração",
      reserveNote: "Depósito reembolsável · Entrega em 14 meses",
      successTitle: "Configuração reservada.",
      successBody: "A referência APX-6620 está garantida. Um especialista de Maranello ligará em até um dia útil para confirmar sua especificação e a data de entrega.",
      reset: "Montar outra",
      summaryTitle: "Especificação",
      addLabel: "Opcionais",
      includedLabel: "Incluído",
      priceLocale: "pt-BR",
      currency: "BRL",
      trims: [
        { id: "corsa", name: "Stradale", note: "O carro de rua definitivo", priceDelta: 0, power: "830 cv" },
        { id: "competizione", name: "Competizione", note: "Aero de pista e escapamento de titânio", priceDelta: 240000, power: "870 cv" },
        { id: "trackpack", name: "Corsa Track Pack", note: "Santantônio, telemetria e magnésio por toda parte", priceDelta: 448000, power: "910 cv" },
      ],
      colors: [
        { id: "rosso", name: "Rosso Apex", hex: "#C8102E", finish: "Brilhante", priceDelta: 0 },
        { id: "nero", name: "Nero Carbonio", hex: "#0C0C0F", finish: "Fosco", priceDelta: 0 },
        { id: "argento", name: "Argento Pista", hex: "#B8BAC2", finish: "Metálico", priceDelta: 14000 },
        { id: "titanio", name: "Grigio Titanio", hex: "#3A3D44", finish: "Metálico fosco", priceDelta: 14000 },
        { id: "blu", name: "Blu Nurburg", hex: "#24406B", finish: "Metálico", priceDelta: 21000 },
        { id: "bianco", name: "Bianco Ghiaccio", hex: "#E9EAEC", finish: "Brilhante", priceDelta: 14000 },
      ],
      wheels: [
        { id: "forged20", name: "Forjada 20 pol. Corsa", note: "Usinagem diamantada, preto brilhante", priceDelta: 0 },
        { id: "forged21", name: "Forjada 21 pol. Aero", note: "Pás de turbina, acabamento acetinado", priceDelta: 37000 },
        { id: "mag21", name: "Magnésio 21 pol. Track", note: "Fixação central, menos 11 kg", priceDelta: 80000 },
      ],
    },
    performance: {
      label: "Dados de desempenho",
      title: "Números que deixam marca",
      intro: "Medido no circuito de Fiorano, asfalto seco, um ocupante. Sem asteriscos de largada, sem partidas lançadas.",
      imageAlt: "Vista frontal do Apex Motors Stradale RS mostrando as tomadas de ar e os faróis agressivos",
      metricsTitle: "Envelope",
      metrics: [
        { id: "power", label: "Potência de pico", value: 830, decimals: 0, suffix: "cv", fill: 92, note: "a 8.000 rpm" },
        { id: "torque", label: "Torque de pico", value: 900, decimals: 0, suffix: "Nm", fill: 88, note: "a 3.000 rpm" },
        { id: "downforce", label: "Downforce", value: 390, decimals: 0, suffix: "kg", fill: 78, note: "a 250 km/h" },
        { id: "lateral", label: "Aderência lateral", value: 1.35, decimals: 2, suffix: "g", fill: 84, note: "curva sustentada" },
        { id: "ratio", label: "Peso-potência", value: 565, decimals: 0, suffix: "cv/t", fill: 90, note: "base peso a seco" },
      ],
      ladderTitle: "Aceleração parada",
      ladder: [
        { label: "0 – 100 km/h", value: "2,6 s" },
        { label: "0 – 200 km/h", value: "7,4 s" },
        { label: "0 – 300 km/h", value: "18,9 s" },
        { label: "400 m", value: "10,1 s" },
        { label: "Frenagem 100 – 0 km/h", value: "29 m" },
      ],
      curveTitle: "Entrega de potência",
      curveNote: "A potência sobe até 8.000 rpm enquanto o torque mantém um platô desde 3.000 — o motivo de ele puxar forte em qualquer faixa, não só no alto.",
      powerCurveLabel: "Potência (cv)",
      torqueCurveLabel: "Torque (Nm)",
      rpmLabel: "Rotação (rpm)",
    },
    testDrive: {
      label: "Test drive",
      title: "Sinta antes de decidir",
      intro: "Noventa minutos, um copiloto profissional e um trajeto que desenhamos para revelar os modos de um carro. Escolha uma loja e um horário.",
      imageAlt: "Cabine voltada ao motorista de um Apex Motors com volante de carbono",
      nameLabel: "Nome completo",
      namePlaceholder: "Marina Albuquerque",
      emailLabel: "E-mail",
      emailPlaceholder: "voce@exemplo.com",
      phoneLabel: "Telefone",
      phonePlaceholder: "+55 (11) 91234-5678",
      modelLabel: "Modelo de interesse",
      models: ["Corsa GT", "Stradale RS", "Veloce Spyder", "Ainda decidindo — surpreenda-me"],
      locationLabel: "Loja",
      locations: ["Apex São Paulo — Jardins", "Apex Rio de Janeiro — Barra", "Apex Curitiba — Batel"],
      dateLabel: "Data preferida",
      slotLabel: "Horário",
      slots: ["09:00", "11:00", "14:00", "16:30"],
      submit: "Solicitar meu drive",
      successTitle: "Seu drive está reservado.",
      successBody: "Separamos o carro e o trajeto. Um concierge confirmará seu horário por telefone em poucas horas.",
      another: "Agendar outro drive",
      refPrefix: "Código da reserva",
      assurances: [
        "Sem compromisso, sem pressão de venda",
        "Seguro total em cada drive",
        "Traga um acompanhante, insistimos",
      ],
    },
    financing: {
      label: "Financiamento",
      title: "Tenha nas suas condições",
      intro: "Mova os controles. O valor mensal recalcula ao vivo, para você encontrar o formato do negócio antes de assinar qualquer linha.",
      priceLabel: "Preço do veículo",
      downLabel: "Entrada",
      termLabel: "Prazo",
      termUnit: "meses",
      aprLabel: "Juros fixos ao ano",
      apr: 12.9,
      installmentLabel: "Parcela estimada",
      monthlyUnit: "/mês",
      totalLabel: "Total pago",
      interestLabel: "Juros totais",
      financedLabel: "Valor financiado",
      downPctLabel: "do preço",
      disclaimer: "Valores ilustrativos de um conceito fictício. Condições reais dependem de crédito aprovado, valor residual e legislação.",
      ctaDrive: "Falar com um especialista",
      priceMin: 900000,
      priceMax: 2200000,
      priceDefault: 1540000,
      priceStep: 5000,
      downMax: 1300000,
      downDefault: 460000,
      downStep: 5000,
      terms: [24, 36, 48, 60, 72],
      termDefault: 48,
      priceLocale: "pt-BR",
      currency: "BRL",
    },
    footer: {
      tagline: "Desempenho feito à mão, entregue no mundo todo.",
      exploreLabel: "Explore",
      visitLabel: "Ateliê principal",
      followLabel: "Siga",
      nav: [
        { href: "#lineup", label: "Linha" },
        { href: "#configurator", label: "Monte e calcule" },
        { href: "#performance", label: "Desempenho" },
        { href: "#testdrive", label: "Test drive" },
        { href: "#financing", label: "Financiamento" },
      ],
      addressLines: ["Apex Motors Ateliê", "Via dei Piloti 12, Maranello, Itália"],
      hoursNote: "Showroom aberto de seg a sáb, 09:00 – 19:00",
      phone: "+39 0536 949 200",
      email: "atelier@apexmotors.com",
      social: [
        { label: "Instagram", handle: "@apexmotors" },
        { label: "YouTube", handle: "/apexmotors" },
        { label: "Newsletter", handle: "The Pit Wall" },
      ],
      legal: ["Privacidade", "Termos", "Preferências de cookies"],
      fine: "Apex Motors é uma marca fictícia criada como conceito de design. Veículos, especificações e preços são ilustrativos.",
      credit: "Conceito, design e código por VigApp.",
    },
  },

  es: {
    header: {
      nav: [
        { href: "#lineup", label: "Gama" },
        { href: "#configurator", label: "Configurar" },
        { href: "#performance", label: "Prestaciones" },
        { href: "#financing", label: "Financiación" },
      ],
      cta: "Reservar prueba",
      openMenu: "Abrir navegación",
      closeMenu: "Cerrar navegación",
    },
    hero: {
      kicker: "Apex Motors · Serie Stradale",
      model: "Stradale RS",
      line1: "Hecho para doblar",
      line2: "el horizonte.",
      sub: "Un V8 biturbo envuelto en un monocasco de fibra de carbono. El Stradale RS es nuestra expresión más pura de velocidad — diseñado en Maranello, afinado en Nurburgring, entregado en tu puerta.",
      ctaBuild: "Configura el tuyo",
      ctaDrive: "Reservar una prueba",
      imageAlt: "Deportivo Apex Motors Stradale RS fotografiado al anochecer en una carretera abierta",
      marquee: "V8 BITURBO · MONOCASCO DE CARBONO · 830 CV · DIRECCIÓN TRASERA · AERO ACTIVO · ",
      stats: [
        { value: 2.6, decimals: 1, suffix: "s", label: "0 – 100 km/h" },
        { value: 830, decimals: 0, suffix: "cv", label: "Potencia máxima" },
        { value: 340, decimals: 0, suffix: "km/h", label: "Velocidad máxima" },
      ],
      scrollHint: "Desplázate para explorar",
    },
    lineup: {
      label: "La gama",
      title: "Tres máquinas, una obsesión",
      intro: "Cada Apex se ensambla a mano en Maranello y lo firma el ingeniero que construyó su motor. Elige el carácter; la precisión está garantizada.",
      fromLabel: "Desde",
      powerLabel: "Potencia",
      accelLabel: "0 – 100",
      topSpeedLabel: "Vel. máxima",
      buildCta: "Configurar este modelo",
      priceLocale: "es-ES",
      currency: "EUR",
      models: [
        {
          id: "corsa",
          name: "Corsa GT",
          category: "Gran turismo",
          tagline: "Continentes, en cuartos.",
          image: IMG.corsa,
          imageAlt: "Cupé gran turismo Apex Motors Corsa GT en una carretera costera",
          power: "640 cv",
          accel: "3,1 s",
          topSpeed: "318 km/h",
          priceFrom: 176000,
          description: "Un gran turismo V8 central-delantero que devora mil kilómetros antes del desayuno y aún caza un vértice de vuelta a casa.",
          specs: [
            { label: "Motor", value: "V8 3.9L biturbo" },
            { label: "Par", value: "760 Nm" },
            { label: "Tracción", value: "Trasera" },
            { label: "Peso", value: "1.570 kg" },
          ],
        },
        {
          id: "stradale",
          name: "Stradale RS",
          category: "Superdeportivo",
          tagline: "Hecho para doblar el horizonte.",
          image: IMG.stradale,
          imageAlt: "Superdeportivo Apex Motors Stradale RS con las puertas abiertas en estudio",
          power: "830 cv",
          accel: "2,6 s",
          topSpeed: "340 km/h",
          priceFrom: 249000,
          description: "El buque insignia. Monocasco de carbono, aerodinámica activa y dirección trasera que encogen el trazado a tu alrededor.",
          specs: [
            { label: "Motor", value: "V8 4.0L biturbo" },
            { label: "Par", value: "900 Nm" },
            { label: "Tracción", value: "Trasera" },
            { label: "Peso", value: "1.470 kg" },
          ],
        },
        {
          id: "veloce",
          name: "Veloce Spyder",
          category: "Descapotable",
          tagline: "Cielo opcional, nunca apagado.",
          image: IMG.veloce,
          imageAlt: "Descapotable Apex Motors Veloce Spyder en rojo de competición",
          power: "720 cv",
          accel: "2,9 s",
          topSpeed: "325 km/h",
          priceFrom: 289000,
          description: "Un roadster de techo rígido plegable con banda sonora atmosférica: la forma más ruidosa de perder el techo y ganar horizonte.",
          specs: [
            { label: "Motor", value: "V8 4.5L atmosférico" },
            { label: "Par", value: "690 Nm" },
            { label: "Tracción", value: "Trasera" },
            { label: "Peso", value: "1.520 kg" },
          ],
        },
      ],
    },
    configurator: {
      label: "Configura y calcula",
      title: "Configura tu Stradale RS",
      intro: "Tres gestos hasta tu especificación. La silueta se repinta con cada elección — el total se actualiza en el instante en que decides.",
      baseName: "Stradale RS",
      basePrice: 249000,
      trimLabel: "Acabado",
      colorLabel: "Pintura",
      wheelLabel: "Llantas",
      totalLabel: "Tu configuración",
      fromNote: "Precio estimado con matriculación",
      powerNote: "Potencia",
      reserveCta: "Reservar esta configuración",
      reserveNote: "Depósito reembolsable · Entrega en 14 meses",
      successTitle: "Configuración reservada.",
      successBody: "La referencia APX-6620 queda bloqueada. Un especialista de Maranello llamará en un día hábil para confirmar tu especificación y la fecha de entrega.",
      reset: "Configurar otra",
      summaryTitle: "Especificación",
      addLabel: "Opciones",
      includedLabel: "Incluido",
      priceLocale: "es-ES",
      currency: "EUR",
      trims: [
        { id: "corsa", name: "Stradale", note: "El coche de calle definitivo", priceDelta: 0, power: "830 cv" },
        { id: "competizione", name: "Competizione", note: "Aero de circuito y escape de titanio", priceDelta: 39000, power: "870 cv" },
        { id: "trackpack", name: "Corsa Track Pack", note: "Arco antivuelco, telemetría y magnesio por doquier", priceDelta: 72000, power: "910 cv" },
      ],
      colors: [
        { id: "rosso", name: "Rosso Apex", hex: "#C8102E", finish: "Brillante", priceDelta: 0 },
        { id: "nero", name: "Nero Carbonio", hex: "#0C0C0F", finish: "Mate", priceDelta: 0 },
        { id: "argento", name: "Argento Pista", hex: "#B8BAC2", finish: "Metalizado", priceDelta: 2300 },
        { id: "titanio", name: "Grigio Titanio", hex: "#3A3D44", finish: "Metalizado mate", priceDelta: 2300 },
        { id: "blu", name: "Blu Nurburg", hex: "#24406B", finish: "Metalizado", priceDelta: 3500 },
        { id: "bianco", name: "Bianco Ghiaccio", hex: "#E9EAEC", finish: "Brillante", priceDelta: 2300 },
      ],
      wheels: [
        { id: "forged20", name: "Forjada 20 pulg. Corsa", note: "Diamantada, negro brillo", priceDelta: 0 },
        { id: "forged21", name: "Forjada 21 pulg. Aero", note: "Álabes de turbina, acabado satinado", priceDelta: 6000 },
        { id: "mag21", name: "Magnesio 21 pulg. Track", note: "Cierre central, menos 11 kg", priceDelta: 13000 },
      ],
    },
    performance: {
      label: "Datos de prestaciones",
      title: "Cifras que dejan huella",
      intro: "Medido en el circuito de Fiorano, asfalto seco, un ocupante. Sin asteriscos de salida ni arrancadas lanzadas.",
      imageAlt: "Vista frontal del Apex Motors Stradale RS con sus tomas de aire y faros agresivos",
      metricsTitle: "Envolvente",
      metrics: [
        { id: "power", label: "Potencia máxima", value: 830, decimals: 0, suffix: "cv", fill: 92, note: "a 8.000 rpm" },
        { id: "torque", label: "Par máximo", value: 900, decimals: 0, suffix: "Nm", fill: 88, note: "a 3.000 rpm" },
        { id: "downforce", label: "Carga aerodinámica", value: 390, decimals: 0, suffix: "kg", fill: 78, note: "a 250 km/h" },
        { id: "lateral", label: "Agarre lateral", value: 1.35, decimals: 2, suffix: "g", fill: 84, note: "curva sostenida" },
        { id: "ratio", label: "Peso-potencia", value: 565, decimals: 0, suffix: "cv/t", fill: 90, note: "base peso en seco" },
      ],
      ladderTitle: "Aceleración desde parado",
      ladder: [
        { label: "0 – 100 km/h", value: "2,6 s" },
        { label: "0 – 200 km/h", value: "7,4 s" },
        { label: "0 – 300 km/h", value: "18,9 s" },
        { label: "400 m", value: "10,1 s" },
        { label: "Frenada 100 – 0 km/h", value: "29 m" },
      ],
      curveTitle: "Entrega de potencia",
      curveNote: "La potencia sube hasta 8.000 rpm mientras el par mantiene una meseta desde 3.000 — la razón de que empuje fuerte en todas partes, no solo arriba.",
      powerCurveLabel: "Potencia (cv)",
      torqueCurveLabel: "Par (Nm)",
      rpmLabel: "Régimen (rpm)",
    },
    testDrive: {
      label: "Prueba de conducción",
      title: "Siéntelo antes de decidir",
      intro: "Noventa minutos, un copiloto profesional y una ruta diseñada para mostrar los modales de un coche. Elige un concesionario y una hora.",
      imageAlt: "Habitáculo orientado al conductor de un Apex Motors con volante de carbono",
      nameLabel: "Nombre completo",
      namePlaceholder: "Marina Albuquerque",
      emailLabel: "Correo",
      emailPlaceholder: "tu@ejemplo.com",
      phoneLabel: "Teléfono",
      phonePlaceholder: "+34 612 345 678",
      modelLabel: "Modelo de interés",
      models: ["Corsa GT", "Stradale RS", "Veloce Spyder", "Sin decidir — sorpréndeme"],
      locationLabel: "Concesionario",
      locations: ["Apex Madrid — Salamanca", "Apex Barcelona — Diagonal", "Apex Marbella — Puerto Banús"],
      dateLabel: "Fecha preferida",
      slotLabel: "Franja horaria",
      slots: ["09:00", "11:00", "14:00", "16:30"],
      submit: "Solicitar mi prueba",
      successTitle: "Tu prueba está apuntada.",
      successBody: "Hemos reservado el coche y la ruta. Un concierge confirmará tu hora por teléfono en unas horas.",
      another: "Reservar otra prueba",
      refPrefix: "Referencia de reserva",
      assurances: [
        "Sin compromiso, sin presión de venta",
        "Seguro completo en cada prueba",
        "Trae un acompañante, insistimos",
      ],
    },
    financing: {
      label: "Financiación",
      title: "Hazlo tuyo en tus términos",
      intro: "Mueve los controles. La cuota mensual se recalcula en vivo, para que encuentres la forma del trato antes de firmar una sola línea.",
      priceLabel: "Precio del vehículo",
      downLabel: "Entrada",
      termLabel: "Plazo",
      termUnit: "meses",
      aprLabel: "TAE fija",
      apr: 5.4,
      installmentLabel: "Cuota estimada",
      monthlyUnit: "/mes",
      totalLabel: "Total a pagar",
      interestLabel: "Intereses totales",
      financedLabel: "Importe financiado",
      downPctLabel: "del precio",
      disclaimer: "Cifras ilustrativas de un concepto ficticio. Las condiciones reales dependen del crédito aprobado, el valor residual y la jurisdicción.",
      ctaDrive: "Hablar con un especialista",
      priceMin: 140000,
      priceMax: 380000,
      priceDefault: 249000,
      priceStep: 1000,
      downMax: 220000,
      downDefault: 74000,
      downStep: 1000,
      terms: [24, 36, 48, 60, 72],
      termDefault: 48,
      priceLocale: "es-ES",
      currency: "EUR",
    },
    footer: {
      tagline: "Prestaciones hechas a mano, entregadas en todo el mundo.",
      exploreLabel: "Explora",
      visitLabel: "Taller insignia",
      followLabel: "Síguenos",
      nav: [
        { href: "#lineup", label: "Gama" },
        { href: "#configurator", label: "Configura y calcula" },
        { href: "#performance", label: "Prestaciones" },
        { href: "#testdrive", label: "Prueba" },
        { href: "#financing", label: "Financiación" },
      ],
      addressLines: ["Apex Motors Taller", "Via dei Piloti 12, Maranello, Italia"],
      hoursNote: "Showroom abierto de lun a sáb, 09:00 – 19:00",
      phone: "+39 0536 949 200",
      email: "atelier@apexmotors.com",
      social: [
        { label: "Instagram", handle: "@apexmotors" },
        { label: "YouTube", handle: "/apexmotors" },
        { label: "Newsletter", handle: "The Pit Wall" },
      ],
      legal: ["Privacidad", "Términos", "Preferencias de cookies"],
      fine: "Apex Motors es una marca ficticia creada como concepto de diseño. Vehículos, especificaciones y precios son ilustrativos.",
      credit: "Concepto, diseño y desarrollo de VigApp.",
    },
  },
};
