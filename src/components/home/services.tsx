import {
  Braces,
  Layers,
  Globe,
  ShoppingBag,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/fx/reveal";

const items = [
  { key: "software", Icon: Braces },
  { key: "saas", Icon: Layers },
  { key: "web", Icon: Globe },
  { key: "commerce", Icon: ShoppingBag },
  { key: "automation", Icon: Sparkles },
  { key: "growth", Icon: TrendingUp },
] as const;

export function Services() {
  const t = useTranslations("home.services");

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <Reveal>
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-muted">
          {t("kicker")}
        </p>
      </Reveal>
      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <Reveal delay={0.05}>
          <h2 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">
            {t("title")}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-md self-end text-sm leading-relaxed text-muted md:text-base">
            {t("subtitle")}
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ key, Icon }, i) => (
          <Reveal key={key} delay={0.05 * i} className="h-full">
            <article className="group relative h-full bg-surface p-8 transition-colors duration-300 hover:bg-surface-2">
              <Icon
                className="h-6 w-6 text-muted transition-colors duration-300 group-hover:text-foreground"
                strokeWidth={1.4}
              />
              <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t(`items.${key}.description`)}
              </p>
              <span
                aria-hidden
                className="absolute right-6 top-6 font-mono text-xs text-muted/50"
              >
                0{i + 1}
              </span>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
