export type DemoCategory = "food" | "spaces" | "retail" | "saas";

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

export const demoCategories: DemoCategory[] = ["food", "spaces", "retail", "saas"];

export const demos: DemoEntry[] = [
  { slug: "luxury-restaurant", name: "Maison Lumière", category: "food", colors: ["#0E0C08", "#C9A227"], featured: true },
  { slug: "architecture-studio", name: "Atelier Meridian", category: "spaces", colors: ["#E9E5DC", "#1A1A1A"], featured: true },
  { slug: "sneaker-store", name: "KYNETIK", category: "retail", colors: ["#12081F", "#FF3D81"], featured: true },
  { slug: "automotive-dealer", name: "Apex Motors", category: "retail", colors: ["#0C0C0F", "#C8102E"], featured: true },
  { slug: "ai-platform", name: "Cortexa", category: "saas", colors: ["#05050A", "#A78BFA"], featured: true },
  { slug: "finance-platform", name: "Nuvex", category: "saas", colors: ["#05070C", "#10B981"], featured: true },
];

export const featuredDemos = demos.filter((d) => d.featured);

export function getDemo(slug: string): DemoEntry | undefined {
  return demos.find((d) => d.slug === slug);
}
