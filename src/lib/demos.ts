export type DemoCategory =
  | "food"
  | "spaces"
  | "health"
  | "retail"
  | "corporate"
  | "hospitality"
  | "education"
  | "saas"
  | "dashboards"
  | "commerce"
  | "marketing";

export interface DemoEntry {
  /** Route segment under /demos/ and i18n key under work.demos.<slug>. */
  slug: string;
  /** Fictional brand name — never translated. */
  name: string;
  category: DemoCategory;
  /** [surface, accent] hex pair driving the card art on index pages. */
  colors: [string, string];
  /** Shown in the homepage showcase rail. */
  featured?: boolean;
}

export const demoCategories: DemoCategory[] = [
  "food",
  "spaces",
  "health",
  "retail",
  "corporate",
  "hospitality",
  "education",
  "saas",
  "dashboards",
  "commerce",
  "marketing",
];

export const demos: DemoEntry[] = [
  { slug: "luxury-restaurant", name: "Maison Lumière", category: "food", colors: ["#0E0C08", "#C9A227"], featured: true },
  { slug: "burger-restaurant", name: "Ember & Stack", category: "food", colors: ["#1A0E08", "#FF6B2C"] },
  { slug: "pizzeria", name: "Forno Nero", category: "food", colors: ["#F5EBDC", "#C1272D"] },
  { slug: "coffee-shop", name: "Terra Café", category: "food", colors: ["#EFE6DA", "#6F4E37"] },
  { slug: "architecture-studio", name: "Atelier Meridian", category: "spaces", colors: ["#E9E5DC", "#1A1A1A"], featured: true },
  { slug: "interior-design", name: "Studio Ambra", category: "spaces", colors: ["#EFE9E1", "#B4560F"] },
  { slug: "construction", name: "Vertex Build", category: "spaces", colors: ["#15181D", "#F2A900"] },
  { slug: "real-estate", name: "Alture", category: "spaces", colors: ["#10273F", "#C0A46B"], featured: true },
  { slug: "law-firm", name: "Castellan & Reis", category: "corporate", colors: ["#14202E", "#8C6F3F"] },
  { slug: "medical-clinic", name: "Aurora Health", category: "health", colors: ["#EAF6F4", "#1D8A7E"] },
  { slug: "dental-clinic", name: "Lumina Dental", category: "health", colors: ["#E9F4FC", "#2E7CC0"] },
  { slug: "gym", name: "Forge Athletic", category: "health", colors: ["#0B0B0D", "#D7FF3E"], featured: true },
  { slug: "beauty-salon", name: "Éclat Studio", category: "health", colors: ["#F6EDE8", "#8A4B5E"] },
  { slug: "fashion-brand", name: "NOIR Atelier", category: "retail", colors: ["#0A0A0A", "#BFA145"], featured: true },
  { slug: "sneaker-store", name: "KYNETIK", category: "retail", colors: ["#12081F", "#FF3D81"], featured: true },
  { slug: "luxury-jewelry", name: "Aurelia", category: "retail", colors: ["#101014", "#D4AF37"] },
  { slug: "electronics-store", name: "Voltix", category: "retail", colors: ["#0A0F1E", "#00D4FF"] },
  { slug: "furniture-store", name: "Nordform", category: "retail", colors: ["#EDE7DE", "#2E2A26"] },
  { slug: "automotive-dealer", name: "Apex Motors", category: "retail", colors: ["#0C0C0F", "#C8102E"], featured: true },
  { slug: "hotel", name: "The Solace", category: "hospitality", colors: ["#22423C", "#C7A45C"], featured: true },
  { slug: "travel-agency", name: "Atlas Voyages", category: "hospitality", colors: ["#083A47", "#FDBA74"] },
  { slug: "school", name: "Brightpath", category: "education", colors: ["#EEF4FF", "#2563EB"] },
  { slug: "university", name: "Northgate", category: "education", colors: ["#7A1F2B", "#E8DCC8"] },
  { slug: "tech-startup", name: "Nebula Labs", category: "saas", colors: ["#0B0B12", "#8B5CF6"] },
  { slug: "enterprise-saas", name: "Orbitflow", category: "saas", colors: ["#0F172A", "#60A5FA"], featured: true },
  { slug: "crm-platform", name: "Relaty", category: "saas", colors: ["#F6F7FB", "#4F46E5"] },
  { slug: "erp-dashboard", name: "Coreledger", category: "dashboards", colors: ["#0B1120", "#14B8A6"] },
  { slug: "analytics-dashboard", name: "Insightgrid", category: "dashboards", colors: ["#0A0E1A", "#22D3EE"], featured: true },
  { slug: "finance-platform", name: "Nuvex", category: "saas", colors: ["#05070C", "#10B981"], featured: true },
  { slug: "investment-platform", name: "Vantage Capital", category: "saas", colors: ["#0B1221", "#D1B166"] },
  { slug: "insurance", name: "Shieldline", category: "corporate", colors: ["#EEF2FF", "#1D4ED8"] },
  { slug: "marketing-agency", name: "LOUD/HAUS", category: "marketing", colors: ["#EDEDE6", "#FF4D00"], featured: true },
  { slug: "corporate-website", name: "Meridian Group", category: "corporate", colors: ["#1E293B", "#94A3B8"] },
  { slug: "landing-page", name: "HALO", category: "marketing", colors: ["#0E0E12", "#7EE7C7"] },
  { slug: "online-course", name: "Mentora", category: "education", colors: ["#1C1917", "#F59E0B"] },
  { slug: "subscription-platform", name: "Crateful", category: "saas", colors: ["#FFF4E6", "#E2593B"] },
  { slug: "scheduling-platform", name: "Slotly", category: "saas", colors: ["#F0FDFA", "#0D9488"] },
  { slug: "whatsapp-ordering", name: "ZapPedido", category: "commerce", colors: ["#0B141A", "#25D366"], featured: true },
  { slug: "food-delivery", name: "Prato", category: "commerce", colors: ["#FFF8F0", "#FF5A1F"] },
  { slug: "ai-platform", name: "Cortexa", category: "saas", colors: ["#05050A", "#A78BFA"], featured: true },
  { slug: "business-dashboard", name: "Pulseboard", category: "dashboards", colors: ["#0C0A10", "#FB7185"] },
];

export const featuredDemos = demos.filter((d) => d.featured);

export function getDemo(slug: string): DemoEntry | undefined {
  return demos.find((d) => d.slug === slug);
}
