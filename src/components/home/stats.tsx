import { useTranslations } from "next-intl";
import { Counter } from "@/components/fx/counter";
import { Reveal } from "@/components/fx/reveal";
import { demos, demoCategories } from "@/lib/demos";
import { locales } from "@/i18n/routing";

export function Stats() {
  const t = useTranslations("home.stats");

  const stats = [
    { value: demos.length, label: t("projects") },
    { value: demoCategories.length, label: t("industries") },
    { value: 23, label: t("capabilities") },
    { value: locales.length, label: t("languages") },
  ];

  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-muted">
            {t("kicker")}
          </p>
          <h2 className="max-w-3xl font-display text-3xl font-semibold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
        </Reveal>
        <dl className="mt-14 grid grid-cols-2 gap-10 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={0.06 * i}>
              <div className="border-l border-line pl-5">
                <dd className="font-display text-5xl font-semibold tabular-nums tracking-tight md:text-6xl">
                  <Counter to={stat.value} />
                </dd>
                <dt className="mt-2 text-sm text-muted">{stat.label}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
