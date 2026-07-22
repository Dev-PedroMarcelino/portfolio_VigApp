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
  { slug: "burger-restaurant", name: "Garagem Burger", category: "food", colors: ["#0E0A08", "#F43F2E"], featured: true },
  { slug: "architecture-studio", name: "Prumo Arquitetura", category: "spaces", colors: ["#EFEAE2", "#8C6A4A"], featured: true },
  { slug: "sneaker-store", name: "VIELA", category: "retail", colors: ["#12081F", "#FF3D81"], featured: true },
  { slug: "automotive-dealer", name: "Barcellos Veículos", category: "retail", colors: ["#0A0B0E", "#D9A441"], featured: true },
  { slug: "ai-platform", name: "IARA", category: "saas", colors: ["#03191D", "#2DD4BF"], featured: true },
  { slug: "finance-platform", name: "Zela", category: "saas", colors: ["#F3EFE6", "#166B4A"], featured: true },
];

export const featuredDemos = demos.filter((d) => d.featured);

export function getDemo(slug: string): DemoEntry | undefined {
  return demos.find((d) => d.slug === slug);
}
