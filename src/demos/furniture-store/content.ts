import type { DemoDictionary } from "@/demos/content";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type UnitId = "cm" | "in";
export type ProductId = "fjord" | "bruna" | "skala" | "halden";
export type HotspotId = "sofa" | "table" | "throw";
export type MaterialId = "oak" | "walnut" | "linen";
export type DeliveryIcon = "truck" | "wrench" | "rotate";

export interface Dimensions {
  w: number;
  d: number;
  h?: number;
}

export interface CurrencyInfo {
  locale: string;
  code: string;
}

export interface VariantContent {
  id: string;
  label: string;
  swatch: string;
  price: number;
}

export interface ProductContent {
  id: ProductId;
  name: string;
  category: string;
  description: string;
  dims: Dimensions;
  variantKind: string;
  variants: VariantContent[];
  imageAlt: string;
  badge?: string;
}

export interface HotspotContent {
  id: HotspotId;
  category: string;
  name: string;
  blurb: string;
  price: number;
  dims: Dimensions;
}

export interface MaterialContent {
  id: MaterialId;
  name: string;
  title: string;
  body: string;
  traits: string[];
}

export interface NordformContent {
  currency: CurrencyInfo;
  header: {
    nav: { href: string; label: string }[];
    unitAria: string;
    cartAria: string;
    menuOpen: string;
    menuClose: string;
  };
  cart: {
    title: string;
    empty: string;
    emptyHint: string;
    subtotal: string;
    note: string;
    checkout: string;
    remove: string;
    close: string;
    decrease: string;
    increase: string;
    successTitle: string;
    successBody: string;
    continueShopping: string;
  };
  hero: {
    kicker: string;
    titleTop: string;
    titleItalic: string;
    sub: string;
    ctaShop: string;
    ctaCollection: string;
    sceneAlt: string;
    hint: string;
    hotspotAria: string;
    close: string;
    addToCart: string;
    added: string;
    facts: { value: string; label: string }[];
    hotspots: HotspotContent[];
  };
  bestsellers: {
    label: string;
    title: string;
    intro: string;
    addToCart: string;
    added: string;
    dimsLabel: string;
    products: ProductContent[];
  };
  collection: {
    label: string;
    title: string;
    intro: string;
    imageAlt: string;
    materials: MaterialContent[];
  };
  craft: {
    label: string;
    title: string;
    intro: string;
    imageAlt: string;
    steps: { title: string; body: string }[];
    stats: { value: string; label: string }[];
    quote: string;
    quoteName: string;
    quoteRole: string;
  };
  delivery: {
    label: string;
    title: string;
    intro: string;
    cards: { icon: DeliveryIcon; title: string; body: string }[];
    faqTitle: string;
    faqs: { q: string; a: string }[];
  };
  showroom: {
    label: string;
    title: string;
    intro: string;
    imageAlt: string;
    addressTitle: string;
    address: string[];
    hoursTitle: string;
    hours: { days: string; time: string }[];
    formTitle: string;
    formSub: string;
    nameLabel: string;
    namePlaceholder: string;
    dayLabel: string;
    days: string[];
    timeLabel: string;
    times: string[];
    submit: string;
    successTitle: string;
    successBody: string;
    another: string;
  };
  footer: {
    tagline: string;
    columns: { title: string; links: { label: string; href: string }[] }[];
    newsTitle: string;
    newsBody: string;
    newsLabel: string;
    newsPlaceholder: string;
    newsCta: string;
    newsSuccess: string;
    social: string[];
    legal: string;
  };
}

/* ------------------------------------------------------------------ */
/* Shared, locale-independent data                                     */
/* ------------------------------------------------------------------ */

const img = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGES = {
  hero: img("photo-1592078615290-033ee584e267", 1800),
  craft: img("photo-1616627561839-074385245ff6", 1200),
  showroom: img("photo-1538688525198-9b88f6f53126", 1200),
  collection: img("photo-1616594039964-ae9021a400a0", 1200),
};

export const PRODUCT_IMAGES: Record<ProductId, string> = {
  fjord: img("photo-1555041469-a586c61ea9bc", 1200),
  bruna: img("photo-1586023492125-27b2c045efd7", 1200),
  skala: img("photo-1617104678098-de229db51175", 1200),
  halden: img("photo-1615066390971-03e4e1c36ddf", 1200),
};

export const HOTSPOT_POSITIONS: Record<HotspotId, { x: number; y: number }> = {
  sofa: { x: 38, y: 58 },
  table: { x: 62, y: 80 },
  throw: { x: 22, y: 44 },
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function formatPrice(value: number, currency: CurrencyInfo): string {
  return new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDims(dims: Dimensions, unit: UnitId): string {
  const convert = (v: number) => (unit === "cm" ? v : Math.round(v / 2.54));
  const parts = [dims.w, dims.d];
  if (dims.h !== undefined) parts.push(dims.h);
  return `${parts.map(convert).join(" × ")} ${unit}`;
}

export function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? "");
}

/* ------------------------------------------------------------------ */
/* Dictionary                                                          */
/* ------------------------------------------------------------------ */

export const nordformDict: DemoDictionary<NordformContent> = {
  en: {
    currency: { locale: "en-US", code: "USD" },
    header: {
      nav: [
        { href: "#bestsellers", label: "Shop" },
        { href: "#collection", label: "Materials" },
        { href: "#craft", label: "Craft" },
        { href: "#delivery", label: "Delivery" },
        { href: "#showroom", label: "Showroom" },
      ],
      unitAria: "Dimension units",
      cartAria: "Open cart",
      menuOpen: "Open menu",
      menuClose: "Close menu",
    },
    cart: {
      title: "Your cart",
      empty: "Your cart is empty.",
      emptyHint: "The sofa is still waiting for you.",
      subtotal: "Subtotal",
      note: "White-glove delivery included on orders over $1,000.",
      checkout: "Place order",
      remove: "Remove",
      close: "Close cart",
      decrease: "Decrease quantity",
      increase: "Increase quantity",
      successTitle: "Order confirmed",
      successBody: "Thank you. This is a concept demo, so nothing was charged.",
      continueShopping: "Keep exploring",
    },
    hero: {
      kicker: "Nordform — Scandinavian furniture since 1987",
      titleTop: "Furniture for the",
      titleItalic: "quiet hours.",
      sub: "Solid oak, honest joinery and linen that softens with every year. Designed in Copenhagen, built to be handed down.",
      ctaShop: "Shop bestsellers",
      ctaCollection: "Explore the materials",
      sceneAlt: "Living room scene with the Fjord sofa, an oak coffee table and a wool throw",
      hint: "Tap the dots to shop this room",
      hotspotAria: "Show {name}",
      close: "Close",
      addToCart: "Add to cart",
      added: "Added",
      facts: [
        { value: "25-year", label: "frame guarantee" },
        { value: "FSC", label: "certified timber only" },
        { value: "100-day", label: "home trial" },
      ],
      hotspots: [
        {
          id: "sofa",
          category: "Three-seat sofa",
          name: "Fjord",
          blurb:
            "Feather-wrapped cushions on a solid oak base, upholstered in Danish boucle that ages like a favourite sweater.",
          price: 2490,
          dims: { w: 228, d: 95, h: 82 },
        },
        {
          id: "table",
          category: "Coffee table",
          name: "Nokk",
          blurb:
            "A single slab of white-oiled oak with softened edges and not one visible screw.",
          price: 720,
          dims: { w: 120, d: 60, h: 38 },
        },
        {
          id: "throw",
          category: "Wool throw",
          name: "Ry",
          blurb:
            "Undyed merino from Norwegian highland flocks, woven on 1960s looms in Jutland.",
          price: 149,
          dims: { w: 130, d: 180 },
        },
      ],
    },
    bestsellers: {
      label: "Bestsellers",
      title: "The pieces every guest asks about",
      intro: "Four silhouettes we never take out of production. Choose your material — the price follows.",
      addToCart: "Add to cart",
      added: "Added",
      dimsLabel: "Dimensions",
      products: [
        {
          id: "fjord",
          name: "Fjord",
          category: "Three-seat sofa",
          description:
            "Feather-wrapped seats on a solid oak frame, with covers that unzip for washing. Built for long Sundays.",
          dims: { w: 228, d: 95, h: 82 },
          variantKind: "Upholstery",
          variants: [
            { id: "oat", label: "Oat boucle", swatch: "#E4DCC8", price: 2490 },
            { id: "sage", label: "Sage weave", swatch: "#96A28C", price: 2590 },
            { id: "charcoal", label: "Charcoal linen", swatch: "#4B4742", price: 2690 },
          ],
          imageAlt: "The Fjord three-seat sofa in oat boucle against a lime-plaster wall",
          badge: "Signature",
        },
        {
          id: "bruna",
          name: "Bruna",
          category: "Lounge chair",
          description:
            "A low, embracing curve that holds afternoon naps and long novels equally well.",
          dims: { w: 78, d: 84, h: 72 },
          variantKind: "Upholstery",
          variants: [
            { id: "bone", label: "Bone boucle", swatch: "#EFE9DB", price: 1180 },
            { id: "sage", label: "Sage weave", swatch: "#96A28C", price: 1240 },
            { id: "cognac", label: "Cognac leather", swatch: "#9A6A43", price: 1460 },
          ],
          imageAlt: "The Bruna lounge chair beside a sunlit window",
        },
        {
          id: "skala",
          name: "Skala",
          category: "Dining chair",
          description:
            "Steam-bent backrest, hand-shaped seat. Stacks four high and lands quietly on wooden floors.",
          dims: { w: 46, d: 52, h: 79 },
          variantKind: "Wood",
          variants: [
            { id: "oak", label: "Natural oak", swatch: "#D3B891", price: 340 },
            { id: "smoked", label: "Smoked oak", swatch: "#8F7454", price: 360 },
            { id: "walnut", label: "Walnut", swatch: "#5F4632", price: 390 },
          ],
          imageAlt: "The Skala dining chair in natural oak on a neutral backdrop",
        },
        {
          id: "halden",
          name: "Halden",
          category: "Sideboard",
          description:
            "Push-to-open oak doors, dovetailed drawers, and a back finished as carefully as the front.",
          dims: { w: 180, d: 45, h: 72 },
          variantKind: "Wood",
          variants: [
            { id: "oak", label: "Oak", swatch: "#D3B891", price: 1890 },
            { id: "walnut", label: "Walnut", swatch: "#5F4632", price: 2090 },
          ],
          imageAlt: "The Halden sideboard in oak with ceramics arranged on top",
        },
      ],
    },
    collection: {
      label: "The collection",
      title: "Three materials. One calm language.",
      intro:
        "Every Nordform piece begins with the same three materials, chosen because they get better with use — and with the fingerprints of the people who live in the house.",
      imageAlt: "Bedroom furnished in pale oak and undyed linen",
      materials: [
        {
          id: "oak",
          name: "Oak",
          title: "White-oiled Nordic oak",
          body: "Slow-grown in Danish and Swedish forests, quarter-sawn and finished with natural oil so the grain stays open to the touch.",
          traits: ["FSC-certified", "Quarter-sawn", "Natural oil finish"],
        },
        {
          id: "walnut",
          name: "Walnut",
          title: "Deep-toned American walnut",
          body: "Sourced from managed forests in Ohio and matched plank by plank, so every surface reads like one continuous drawing.",
          traits: ["Plank-matched", "Hand-rubbed wax", "Darkens with age"],
        },
        {
          id: "linen",
          name: "Linen",
          title: "Stonewashed Belgian linen",
          body: "Woven in Flanders from European flax and stonewashed, so it arrives feeling like it has been yours for years.",
          traits: ["European flax", "OEKO-TEX certified", "Removable covers"],
        },
      ],
    },
    craft: {
      label: "Craftsmanship",
      title: "Joinery you can read like a signature",
      intro:
        "We build the old way because it lasts the old way: dovetails instead of screws, wax instead of lacquer, patience instead of shortcuts.",
      imageAlt: "Close detail of oiled walnut grain and hand-cut joinery",
      steps: [
        {
          title: "Select",
          body: "Each plank is graded by hand and rested for 60 days until its moisture settles at 8 percent.",
        },
        {
          title: "Join",
          body: "Dovetail and mortise-and-tenon joints are cut to a tenth of a millimetre, then fitted without a single screw.",
        },
        {
          title: "Finish",
          body: "Three coats of natural oil, hand-rubbed with wool, leave the grain open and the surface repairable forever.",
        },
      ],
      stats: [
        { value: "212", label: "hands-on minutes per chair" },
        { value: "0", label: "visible screws or staples" },
        { value: "96%", label: "of offcuts reused or recycled" },
      ],
      quote: "A good chair should outlive the carpenter who built it. That is the entire brief.",
      quoteName: "Maja Lindqvist",
      quoteRole: "Workshop director, Copenhagen",
    },
    delivery: {
      label: "Delivery and assembly",
      title: "From our workshop to your third floor",
      intro: "White-glove teams in every metro area. We carry, place, assemble — and take the packaging away.",
      cards: [
        {
          icon: "truck",
          title: "White-glove delivery",
          body: "A two-person team delivers to the room you choose, on the date you pick. Free on orders over $1,000.",
        },
        {
          icon: "wrench",
          title: "Assembly included",
          body: "Anything that needs a tool is assembled, levelled and wiped down before we leave — packaging gone too.",
        },
        {
          icon: "rotate",
          title: "100-day home trial",
          body: "Live with your piece for one hundred days. If it is not right, we collect it for free and refund every cent.",
        },
      ],
      faqTitle: "Common questions",
      faqs: [
        {
          q: "How long does delivery take?",
          a: "In-stock pieces arrive within 5 to 10 working days. Made-to-order upholstery takes 4 to 6 weeks, and you pick the delivery date the moment it leaves the workshop.",
        },
        {
          q: "Can you take my old furniture away?",
          a: "Yes. Add take-back at checkout and we collect one old piece per item delivered — 94 percent of it gets recycled or donated.",
        },
        {
          q: "What if it does not fit my staircase?",
          a: "Fjord arms and legs are removable and every team carries lifting straps. If a piece genuinely will not go in, the return costs you nothing.",
        },
        {
          q: "How do I care for oiled wood?",
          a: "Once a year, a soft cloth and a spoonful of our maintenance oil. Scratches sand right out — that is the point of an open finish.",
        },
      ],
    },
    showroom: {
      label: "Showroom",
      title: "Sit before you decide",
      intro:
        "Our Copenhagen flagship holds the full collection, a materials library and very good coffee. Book a visit and a designer will keep the hour for you.",
      imageAlt: "Inside the Nordform showroom, room settings styled in oat and oak",
      addressTitle: "Address",
      address: ["Nordform Flagship", "Store Strandstraede 21", "1255 Copenhagen K, Denmark"],
      hoursTitle: "Opening hours",
      hours: [
        { days: "Mon – Fri", time: "10:00 – 19:00" },
        { days: "Saturday", time: "10:00 – 17:00" },
        { days: "Sunday", time: "11:00 – 16:00" },
      ],
      formTitle: "Book a visit",
      formSub: "Free, one hour, no obligation to buy — just very comfortable seating.",
      nameLabel: "Your name",
      namePlaceholder: "Sofia Almeida",
      dayLabel: "Day",
      days: ["Thu 23 Jul", "Fri 24 Jul", "Sat 25 Jul", "Sun 26 Jul"],
      timeLabel: "Time",
      times: ["10:00", "11:30", "14:00", "16:30"],
      submit: "Reserve my hour",
      successTitle: "See you soon, {name}.",
      successBody:
        "Your hour is reserved for {day} at {time}. A designer will meet you with the materials library open and the coffee already on.",
      another: "Book another visit",
    },
    footer: {
      tagline: "Quiet furniture, made in the Nordics since 1987.",
      columns: [
        {
          title: "Shop",
          links: [
            { label: "Sofas", href: "#bestsellers" },
            { label: "Lounge chairs", href: "#bestsellers" },
            { label: "Dining", href: "#bestsellers" },
            { label: "Storage", href: "#bestsellers" },
          ],
        },
        {
          title: "Nordform",
          links: [
            { label: "Materials", href: "#collection" },
            { label: "Craftsmanship", href: "#craft" },
            { label: "Showroom", href: "#showroom" },
          ],
        },
        {
          title: "Help",
          links: [
            { label: "Delivery and assembly", href: "#delivery" },
            { label: "100-day trial", href: "#delivery" },
            { label: "Care guides", href: "#craft" },
          ],
        },
      ],
      newsTitle: "Slow letters",
      newsBody: "One email a month — new pieces, workshop notes and first pick of sample sales.",
      newsLabel: "Email address",
      newsPlaceholder: "you@example.com",
      newsCta: "Subscribe",
      newsSuccess: "Welcome aboard. The next letter leaves on the first Sunday of the month.",
      social: ["Instagram", "Pinterest", "Journal"],
      legal: "© 2026 Nordform ApS — Copenhagen · Oslo · Stockholm",
    },
  },

  pt: {
    currency: { locale: "pt-BR", code: "BRL" },
    header: {
      nav: [
        { href: "#bestsellers", label: "Loja" },
        { href: "#collection", label: "Materiais" },
        { href: "#craft", label: "Ofício" },
        { href: "#delivery", label: "Entrega" },
        { href: "#showroom", label: "Showroom" },
      ],
      unitAria: "Unidades de medida",
      cartAria: "Abrir carrinho",
      menuOpen: "Abrir menu",
      menuClose: "Fechar menu",
    },
    cart: {
      title: "Seu carrinho",
      empty: "Seu carrinho está vazio.",
      emptyHint: "O sofá continua esperando por você.",
      subtotal: "Subtotal",
      note: "Entrega premium incluída em pedidos acima de R$ 5.000.",
      checkout: "Finalizar pedido",
      remove: "Remover",
      close: "Fechar carrinho",
      decrease: "Diminuir quantidade",
      increase: "Aumentar quantidade",
      successTitle: "Pedido confirmado",
      successBody: "Obrigado. Este é um conceito de demonstração — nada foi cobrado.",
      continueShopping: "Continuar explorando",
    },
    hero: {
      kicker: "Nordform — design escandinavo desde 1987",
      titleTop: "Móveis para as",
      titleItalic: "horas calmas.",
      sub: "Carvalho maciço, marcenaria honesta e linho que amacia a cada ano. Desenhado em Copenhague, feito para passar de geração em geração.",
      ctaShop: "Ver os mais vendidos",
      ctaCollection: "Conhecer os materiais",
      sceneAlt: "Sala de estar com o sofá Fjord, mesa de centro de carvalho e manta de lã",
      hint: "Toque nos pontos para explorar esta sala",
      hotspotAria: "Ver {name}",
      close: "Fechar",
      addToCart: "Adicionar ao carrinho",
      added: "Adicionado",
      facts: [
        { value: "25 anos", label: "de garantia estrutural" },
        { value: "FSC", label: "madeira 100% certificada" },
        { value: "100 dias", label: "de teste em casa" },
      ],
      hotspots: [
        {
          id: "sofa",
          category: "Sofá de 3 lugares",
          name: "Fjord",
          blurb:
            "Almofadas envoltas em plumas sobre base de carvalho maciço, com bouclé dinamarquês que envelhece como um suéter favorito.",
          price: 12900,
          dims: { w: 228, d: 95, h: 82 },
        },
        {
          id: "table",
          category: "Mesa de centro",
          name: "Nokk",
          blurb: "Uma única prancha de carvalho com óleo branco, bordas suavizadas e nenhum parafuso à vista.",
          price: 3720,
          dims: { w: 120, d: 60, h: 38 },
        },
        {
          id: "throw",
          category: "Manta de lã",
          name: "Ry",
          blurb: "Merino sem tingimento de rebanhos noruegueses, tecida em teares dos anos 1960 na Jutlândia.",
          price: 790,
          dims: { w: 130, d: 180 },
        },
      ],
    },
    bestsellers: {
      label: "Mais vendidos",
      title: "As peças que toda visita quer saber de onde vieram",
      intro: "Quatro silhuetas que nunca saem de produção. Escolha o material — o preço acompanha.",
      addToCart: "Adicionar ao carrinho",
      added: "Adicionado",
      dimsLabel: "Dimensões",
      products: [
        {
          id: "fjord",
          name: "Fjord",
          category: "Sofá de 3 lugares",
          description:
            "Assentos envoltos em plumas sobre estrutura de carvalho maciço, com capas que abrem em zíper para lavar. Feito para domingos longos.",
          dims: { w: 228, d: 95, h: 82 },
          variantKind: "Revestimento",
          variants: [
            { id: "oat", label: "Bouclé aveia", swatch: "#E4DCC8", price: 12900 },
            { id: "sage", label: "Trama sálvia", swatch: "#96A28C", price: 13400 },
            { id: "charcoal", label: "Linho grafite", swatch: "#4B4742", price: 13900 },
          ],
          imageAlt: "Sofá Fjord de três lugares em bouclé aveia contra parede de reboco claro",
          badge: "Assinatura",
        },
        {
          id: "bruna",
          name: "Bruna",
          category: "Poltrona",
          description: "Uma curva baixa e acolhedora que abriga tanto a sesta quanto o romance de quinhentas páginas.",
          dims: { w: 78, d: 84, h: 72 },
          variantKind: "Revestimento",
          variants: [
            { id: "bone", label: "Bouclé osso", swatch: "#EFE9DB", price: 6100 },
            { id: "sage", label: "Trama sálvia", swatch: "#96A28C", price: 6400 },
            { id: "cognac", label: "Couro conhaque", swatch: "#9A6A43", price: 7500 },
          ],
          imageAlt: "Poltrona Bruna ao lado de uma janela iluminada",
        },
        {
          id: "skala",
          name: "Skala",
          category: "Cadeira de jantar",
          description:
            "Encosto curvado a vapor, assento esculpido à mão. Empilha de quatro em quatro e pousa em silêncio no piso de madeira.",
          dims: { w: 46, d: 52, h: 79 },
          variantKind: "Madeira",
          variants: [
            { id: "oak", label: "Carvalho natural", swatch: "#D3B891", price: 1750 },
            { id: "smoked", label: "Carvalho defumado", swatch: "#8F7454", price: 1860 },
            { id: "walnut", label: "Nogueira", swatch: "#5F4632", price: 2010 },
          ],
          imageAlt: "Cadeira de jantar Skala em carvalho natural sobre fundo neutro",
        },
        {
          id: "halden",
          name: "Halden",
          category: "Aparador",
          description:
            "Portas de carvalho com toque para abrir, gavetas em rabo de andorinha e fundo tão bem acabado quanto a frente.",
          dims: { w: 180, d: 45, h: 72 },
          variantKind: "Madeira",
          variants: [
            { id: "oak", label: "Carvalho", swatch: "#D3B891", price: 9800 },
            { id: "walnut", label: "Nogueira", swatch: "#5F4632", price: 10800 },
          ],
          imageAlt: "Aparador Halden em carvalho com cerâmicas dispostas em cima",
        },
      ],
    },
    collection: {
      label: "A coleção",
      title: "Três materiais. Uma linguagem calma.",
      intro:
        "Toda peça Nordform começa com os mesmos três materiais, escolhidos porque ficam melhores com o uso — e com as digitais de quem vive na casa.",
      imageAlt: "Quarto mobiliado em carvalho claro e linho cru",
      materials: [
        {
          id: "oak",
          name: "Carvalho",
          title: "Carvalho nórdico com óleo branco",
          body: "De crescimento lento em florestas dinamarquesas e suecas, serrado em quartos e acabado com óleo natural para que o veio continue aberto ao toque.",
          traits: ["Certificação FSC", "Corte radial", "Acabamento a óleo natural"],
        },
        {
          id: "walnut",
          name: "Nogueira",
          title: "Nogueira americana de tom profundo",
          body: "Vinda de florestas manejadas em Ohio e combinada prancha a prancha, para que cada superfície se leia como um desenho contínuo.",
          traits: ["Pranchas casadas", "Cera aplicada à mão", "Escurece com o tempo"],
        },
        {
          id: "linen",
          name: "Linho",
          title: "Linho belga estonado",
          body: "Tecido em Flandres com linho europeu e lavado com pedras, para chegar com a sensação de que já é seu há anos.",
          traits: ["Linho europeu", "Certificação OEKO-TEX", "Capas removíveis"],
        },
      ],
    },
    craft: {
      label: "Ofício",
      title: "Marcenaria que se lê como uma assinatura",
      intro:
        "Construímos do jeito antigo porque é o que dura do jeito antigo: rabos de andorinha no lugar de parafusos, cera no lugar de verniz, paciência no lugar de atalhos.",
      imageAlt: "Detalhe do veio de nogueira oleada e encaixes feitos à mão",
      steps: [
        {
          title: "Selecionar",
          body: "Cada prancha é classificada à mão e descansa por 60 dias até a umidade estabilizar em 8%.",
        },
        {
          title: "Encaixar",
          body: "Juntas em rabo de andorinha e macho-e-fêmea cortadas com precisão de décimos de milímetro — sem um único parafuso.",
        },
        {
          title: "Acabar",
          body: "Três demãos de óleo natural, polidas com lã, deixam o veio aberto e a superfície reparável para sempre.",
        },
      ],
      stats: [
        { value: "212", label: "minutos de trabalho manual por cadeira" },
        { value: "0", label: "parafusos ou grampos aparentes" },
        { value: "96%", label: "das aparas reaproveitadas" },
      ],
      quote: "Uma boa cadeira deve durar mais do que o marceneiro que a construiu. O nosso trabalho se resume a isso.",
      quoteName: "Maja Lindqvist",
      quoteRole: "Diretora de ateliê, Copenhague",
    },
    delivery: {
      label: "Entrega e montagem",
      title: "Do nosso ateliê ao seu terceiro andar",
      intro: "Equipes especializadas em todas as regiões metropolitanas. Carregamos, posicionamos, montamos — e levamos a embalagem embora.",
      cards: [
        {
          icon: "truck",
          title: "Entrega premium",
          body: "Uma equipe de duas pessoas entrega no cômodo que você escolher, na data que você marcar. Grátis acima de R$ 5.000.",
        },
        {
          icon: "wrench",
          title: "Montagem incluída",
          body: "Tudo o que precisa de ferramenta é montado, nivelado e limpo antes de sairmos — e a embalagem vai com a gente.",
        },
        {
          icon: "rotate",
          title: "100 dias de teste",
          body: "Viva com a peça por cem dias. Se não for a certa, retiramos de graça e devolvemos cada centavo.",
        },
      ],
      faqTitle: "Perguntas frequentes",
      faqs: [
        {
          q: "Quanto tempo leva a entrega?",
          a: "Peças em estoque chegam em 5 a 10 dias úteis. Estofados sob encomenda levam de 4 a 6 semanas, e você escolhe a data assim que o pedido sai do ateliê.",
        },
        {
          q: "Vocês levam meu móvel antigo?",
          a: "Sim. Adicione a coleta no checkout e retiramos uma peça antiga por item entregue — 94% do material é reciclado ou doado.",
        },
        {
          q: "E se não passar na escada?",
          a: "Os braços e pés do Fjord são removíveis e toda equipe carrega cintas de elevação. Se realmente não couber, a devolução não custa nada.",
        },
        {
          q: "Como cuidar da madeira oleada?",
          a: "Uma vez por ano, um pano macio e uma colher do nosso óleo de manutenção. Riscos saem com lixa fina — essa é a graça do acabamento aberto.",
        },
      ],
    },
    showroom: {
      label: "Showroom",
      title: "Sente antes de decidir",
      intro:
        "Nossa loja-conceito em Copenhague reúne a coleção completa, uma biblioteca de materiais e um café muito bom. Agende uma visita e um designer reserva a hora para você.",
      imageAlt: "Interior do showroom Nordform, ambientes em tons de aveia e carvalho",
      addressTitle: "Endereço",
      address: ["Nordform Flagship", "Store Strandstraede 21", "1255 Copenhague K, Dinamarca"],
      hoursTitle: "Horários",
      hours: [
        { days: "Seg – Sex", time: "10h – 19h" },
        { days: "Sábado", time: "10h – 17h" },
        { days: "Domingo", time: "11h – 16h" },
      ],
      formTitle: "Agendar visita",
      formSub: "Gratuito, uma hora, sem compromisso de compra — só assentos muito confortáveis.",
      nameLabel: "Seu nome",
      namePlaceholder: "Sofia Almeida",
      dayLabel: "Dia",
      days: ["Qui 23 jul", "Sex 24 jul", "Sáb 25 jul", "Dom 26 jul"],
      timeLabel: "Horário",
      times: ["10:00", "11:30", "14:00", "16:30"],
      submit: "Reservar minha hora",
      successTitle: "Até breve, {name}.",
      successBody:
        "Sua hora está reservada para {day}, às {time}. Um designer espera você com a biblioteca de materiais aberta e o café passado.",
      another: "Agendar outra visita",
    },
    footer: {
      tagline: "Móveis silenciosos, feitos no Norte desde 1987.",
      columns: [
        {
          title: "Loja",
          links: [
            { label: "Sofás", href: "#bestsellers" },
            { label: "Poltronas", href: "#bestsellers" },
            { label: "Jantar", href: "#bestsellers" },
            { label: "Armários", href: "#bestsellers" },
          ],
        },
        {
          title: "Nordform",
          links: [
            { label: "Materiais", href: "#collection" },
            { label: "Ofício", href: "#craft" },
            { label: "Showroom", href: "#showroom" },
          ],
        },
        {
          title: "Ajuda",
          links: [
            { label: "Entrega e montagem", href: "#delivery" },
            { label: "100 dias de teste", href: "#delivery" },
            { label: "Guias de cuidado", href: "#craft" },
          ],
        },
      ],
      newsTitle: "Cartas lentas",
      newsBody: "Um e-mail por mês — peças novas, notas do ateliê e prioridade nas vendas de mostruário.",
      newsLabel: "Endereço de e-mail",
      newsPlaceholder: "voce@exemplo.com",
      newsCta: "Assinar",
      newsSuccess: "Bem-vindo. A próxima carta sai no primeiro domingo do mês.",
      social: ["Instagram", "Pinterest", "Journal"],
      legal: "© 2026 Nordform ApS — Copenhague · Oslo · Estocolmo",
    },
  },

  es: {
    currency: { locale: "es-ES", code: "EUR" },
    header: {
      nav: [
        { href: "#bestsellers", label: "Tienda" },
        { href: "#collection", label: "Materiales" },
        { href: "#craft", label: "Oficio" },
        { href: "#delivery", label: "Entrega" },
        { href: "#showroom", label: "Showroom" },
      ],
      unitAria: "Unidades de medida",
      cartAria: "Abrir carrito",
      menuOpen: "Abrir menú",
      menuClose: "Cerrar menú",
    },
    cart: {
      title: "Tu carrito",
      empty: "Tu carrito está vacío.",
      emptyHint: "El sofá sigue esperándote.",
      subtotal: "Subtotal",
      note: "Entrega guante blanco incluida en pedidos superiores a 900 €.",
      checkout: "Tramitar pedido",
      remove: "Eliminar",
      close: "Cerrar carrito",
      decrease: "Reducir cantidad",
      increase: "Aumentar cantidad",
      successTitle: "Pedido confirmado",
      successBody: "Gracias. Esto es un concepto de demostración: no se ha cobrado nada.",
      continueShopping: "Seguir explorando",
    },
    hero: {
      kicker: "Nordform — diseño escandinavo desde 1987",
      titleTop: "Muebles para las",
      titleItalic: "horas tranquilas.",
      sub: "Roble macizo, ebanistería honesta y lino que se suaviza con los años. Diseñado en Copenhague, hecho para heredarse.",
      ctaShop: "Ver los más vendidos",
      ctaCollection: "Descubrir los materiales",
      sceneAlt: "Salón con el sofá Fjord, una mesa de centro de roble y una manta de lana",
      hint: "Toca los puntos para explorar esta sala",
      hotspotAria: "Ver {name}",
      close: "Cerrar",
      addToCart: "Añadir al carrito",
      added: "Añadido",
      facts: [
        { value: "25 años", label: "de garantía estructural" },
        { value: "FSC", label: "madera 100% certificada" },
        { value: "100 días", label: "de prueba en casa" },
      ],
      hotspots: [
        {
          id: "sofa",
          category: "Sofá de 3 plazas",
          name: "Fjord",
          blurb:
            "Cojines envueltos en pluma sobre una base de roble macizo, tapizados en bouclé danés que envejece como un jersey favorito.",
          price: 2290,
          dims: { w: 228, d: 95, h: 82 },
        },
        {
          id: "table",
          category: "Mesa de centro",
          name: "Nokk",
          blurb: "Una sola tabla de roble al aceite blanco, cantos suavizados y ni un tornillo a la vista.",
          price: 660,
          dims: { w: 120, d: 60, h: 38 },
        },
        {
          id: "throw",
          category: "Manta de lana",
          name: "Ry",
          blurb: "Merino sin teñir de rebaños noruegos, tejida en telares de los años sesenta en Jutlandia.",
          price: 139,
          dims: { w: 130, d: 180 },
        },
      ],
    },
    bestsellers: {
      label: "Más vendidos",
      title: "Las piezas por las que todos preguntan",
      intro: "Cuatro siluetas que nunca salen de producción. Elige el material y el precio le sigue.",
      addToCart: "Añadir al carrito",
      added: "Añadido",
      dimsLabel: "Medidas",
      products: [
        {
          id: "fjord",
          name: "Fjord",
          category: "Sofá de 3 plazas",
          description:
            "Asientos envueltos en pluma sobre estructura de roble macizo, con fundas que se abren con cremallera para lavar. Hecho para domingos largos.",
          dims: { w: 228, d: 95, h: 82 },
          variantKind: "Tapizado",
          variants: [
            { id: "oat", label: "Bouclé avena", swatch: "#E4DCC8", price: 2290 },
            { id: "sage", label: "Tejido salvia", swatch: "#96A28C", price: 2390 },
            { id: "charcoal", label: "Lino grafito", swatch: "#4B4742", price: 2490 },
          ],
          imageAlt: "El sofá Fjord de tres plazas en bouclé avena contra una pared de estuco claro",
          badge: "Icónico",
        },
        {
          id: "bruna",
          name: "Bruna",
          category: "Butaca",
          description: "Una curva baja y envolvente que acoge por igual la siesta y la novela de quinientas páginas.",
          dims: { w: 78, d: 84, h: 72 },
          variantKind: "Tapizado",
          variants: [
            { id: "bone", label: "Bouclé hueso", swatch: "#EFE9DB", price: 1090 },
            { id: "sage", label: "Tejido salvia", swatch: "#96A28C", price: 1150 },
            { id: "cognac", label: "Piel coñac", swatch: "#9A6A43", price: 1350 },
          ],
          imageAlt: "La butaca Bruna junto a una ventana soleada",
        },
        {
          id: "skala",
          name: "Skala",
          category: "Silla de comedor",
          description:
            "Respaldo curvado al vapor, asiento tallado a mano. Se apila de cuatro en cuatro y aterriza en silencio sobre el parqué.",
          dims: { w: 46, d: 52, h: 79 },
          variantKind: "Madera",
          variants: [
            { id: "oak", label: "Roble natural", swatch: "#D3B891", price: 315 },
            { id: "smoked", label: "Roble ahumado", swatch: "#8F7454", price: 335 },
            { id: "walnut", label: "Nogal", swatch: "#5F4632", price: 360 },
          ],
          imageAlt: "La silla de comedor Skala en roble natural sobre fondo neutro",
        },
        {
          id: "halden",
          name: "Halden",
          category: "Aparador",
          description:
            "Puertas de roble de apertura por presión, cajones en cola de milano y una trasera tan cuidada como el frente.",
          dims: { w: 180, d: 45, h: 72 },
          variantKind: "Madera",
          variants: [
            { id: "oak", label: "Roble", swatch: "#D3B891", price: 1740 },
            { id: "walnut", label: "Nogal", swatch: "#5F4632", price: 1930 },
          ],
          imageAlt: "El aparador Halden en roble con cerámica dispuesta encima",
        },
      ],
    },
    collection: {
      label: "La colección",
      title: "Tres materiales. Un mismo lenguaje sereno.",
      intro:
        "Cada pieza Nordform nace de los mismos tres materiales, elegidos porque mejoran con el uso — y con las huellas de quienes viven la casa.",
      imageAlt: "Dormitorio amueblado en roble claro y lino sin teñir",
      materials: [
        {
          id: "oak",
          name: "Roble",
          title: "Roble nórdico al aceite blanco",
          body: "De crecimiento lento en bosques daneses y suecos, aserrado en cuartos y acabado con aceite natural para que la veta siga abierta al tacto.",
          traits: ["Certificado FSC", "Corte radial", "Acabado al aceite natural"],
        },
        {
          id: "walnut",
          name: "Nogal",
          title: "Nogal americano de tono profundo",
          body: "Procedente de bosques gestionados de Ohio y casado tabla a tabla, para que cada superficie se lea como un dibujo continuo.",
          traits: ["Tablas casadas", "Cera aplicada a mano", "Se oscurece con los años"],
        },
        {
          id: "linen",
          name: "Lino",
          title: "Lino belga lavado a la piedra",
          body: "Tejido en Flandes con lino europeo y lavado a la piedra, para que llegue con la sensación de llevar años contigo.",
          traits: ["Lino europeo", "Certificado OEKO-TEX", "Fundas extraíbles"],
        },
      ],
    },
    craft: {
      label: "Oficio",
      title: "Ebanistería que se lee como una firma",
      intro:
        "Construimos a la antigua porque es lo que dura a la antigua: colas de milano en vez de tornillos, cera en vez de barniz, paciencia en vez de atajos.",
      imageAlt: "Detalle de la veta de nogal aceitado y ensambles cortados a mano",
      steps: [
        {
          title: "Seleccionar",
          body: "Cada tabla se clasifica a mano y reposa 60 días hasta que la humedad se asienta en el 8%.",
        },
        {
          title: "Ensamblar",
          body: "Colas de milano y cajas y espigas cortadas a la décima de milímetro, sin un solo tornillo.",
        },
        {
          title: "Acabar",
          body: "Tres manos de aceite natural, pulidas con lana, dejan la veta abierta y la superficie reparable para siempre.",
        },
      ],
      stats: [
        { value: "212", label: "minutos de trabajo manual por silla" },
        { value: "0", label: "tornillos o grapas a la vista" },
        { value: "96%", label: "de los recortes reaprovechados" },
      ],
      quote: "Una buena silla debe sobrevivir al carpintero que la construyó. Ese es todo el encargo.",
      quoteName: "Maja Lindqvist",
      quoteRole: "Directora de taller, Copenhague",
    },
    delivery: {
      label: "Entrega y montaje",
      title: "De nuestro taller a tu tercer piso",
      intro: "Equipos guante blanco en todas las áreas metropolitanas. Cargamos, colocamos, montamos — y nos llevamos el embalaje.",
      cards: [
        {
          icon: "truck",
          title: "Entrega guante blanco",
          body: "Un equipo de dos personas entrega en la habitación que elijas, el día que marques. Gratis en pedidos superiores a 900 €.",
        },
        {
          icon: "wrench",
          title: "Montaje incluido",
          body: "Todo lo que necesita herramienta se monta, se nivela y se limpia antes de irnos — y el embalaje se va con nosotros.",
        },
        {
          icon: "rotate",
          title: "100 días de prueba",
          body: "Convive con tu pieza cien días. Si no es la tuya, la recogemos gratis y te devolvemos hasta el último céntimo.",
        },
      ],
      faqTitle: "Preguntas frecuentes",
      faqs: [
        {
          q: "¿Cuánto tarda la entrega?",
          a: "Las piezas en stock llegan en 5 a 10 días laborables. La tapicería por encargo tarda de 4 a 6 semanas, y eliges la fecha en cuanto sale del taller.",
        },
        {
          q: "¿Se llevan mis muebles antiguos?",
          a: "Sí. Añade la recogida al tramitar el pedido y retiramos una pieza antigua por artículo entregado: el 94% se recicla o se dona.",
        },
        {
          q: "¿Y si no cabe por la escalera?",
          a: "Los brazos y las patas del Fjord se desmontan y todos los equipos llevan correas de elevación. Si de verdad no entra, la devolución no te cuesta nada.",
        },
        {
          q: "¿Cómo cuido la madera aceitada?",
          a: "Una vez al año, un paño suave y una cucharada de nuestro aceite de mantenimiento. Los arañazos se lijan sin más — esa es la gracia de un acabado abierto.",
        },
      ],
    },
    showroom: {
      label: "Showroom",
      title: "Siéntate antes de decidir",
      intro:
        "Nuestra tienda insignia de Copenhague reúne la colección completa, una biblioteca de materiales y un café excelente. Reserva una visita y un diseñador te guardará la hora.",
      imageAlt: "Interior del showroom Nordform, ambientes en tonos avena y roble",
      addressTitle: "Dirección",
      address: ["Nordform Flagship", "Store Strandstraede 21", "1255 Copenhague K, Dinamarca"],
      hoursTitle: "Horario",
      hours: [
        { days: "Lun – Vie", time: "10:00 – 19:00" },
        { days: "Sábado", time: "10:00 – 17:00" },
        { days: "Domingo", time: "11:00 – 16:00" },
      ],
      formTitle: "Reservar visita",
      formSub: "Gratis, una hora y sin compromiso de compra — solo asientos muy cómodos.",
      nameLabel: "Tu nombre",
      namePlaceholder: "Sofía Álvarez",
      dayLabel: "Día",
      days: ["Jue 23 jul", "Vie 24 jul", "Sáb 25 jul", "Dom 26 jul"],
      timeLabel: "Hora",
      times: ["10:00", "11:30", "14:00", "16:30"],
      submit: "Reservar mi hora",
      successTitle: "Hasta pronto, {name}.",
      successBody:
        "Tu hora queda reservada para el {day} a las {time}. Un diseñador te esperará con la biblioteca de materiales abierta y el café recién hecho.",
      another: "Reservar otra visita",
    },
    footer: {
      tagline: "Muebles serenos, hechos en el Norte desde 1987.",
      columns: [
        {
          title: "Tienda",
          links: [
            { label: "Sofás", href: "#bestsellers" },
            { label: "Butacas", href: "#bestsellers" },
            { label: "Comedor", href: "#bestsellers" },
            { label: "Almacenaje", href: "#bestsellers" },
          ],
        },
        {
          title: "Nordform",
          links: [
            { label: "Materiales", href: "#collection" },
            { label: "Oficio", href: "#craft" },
            { label: "Showroom", href: "#showroom" },
          ],
        },
        {
          title: "Ayuda",
          links: [
            { label: "Entrega y montaje", href: "#delivery" },
            { label: "100 días de prueba", href: "#delivery" },
            { label: "Guías de cuidado", href: "#craft" },
          ],
        },
      ],
      newsTitle: "Cartas lentas",
      newsBody: "Un correo al mes — piezas nuevas, notas del taller y acceso prioritario a las ventas de muestrario.",
      newsLabel: "Dirección de correo",
      newsPlaceholder: "tu@ejemplo.com",
      newsCta: "Suscribirme",
      newsSuccess: "Bienvenido. La próxima carta sale el primer domingo del mes.",
      social: ["Instagram", "Pinterest", "Journal"],
      legal: "© 2026 Nordform ApS — Copenhague · Oslo · Estocolmo",
    },
  },
};
