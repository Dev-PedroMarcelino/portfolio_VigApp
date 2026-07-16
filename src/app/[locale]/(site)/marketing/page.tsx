import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Rocket,
  Search,
  Megaphone,
  Gauge,
  PenLine,
  Fingerprint,
  FlaskConical,
  UserPlus,
  Filter,
  Workflow,
  LineChart,
  MessageCircle,
} from "lucide-react";
import { SplitText } from "@/components/fx/split-text";
import { Reveal } from "@/components/fx/reveal";
import { Magnetic } from "@/components/fx/magnetic";
import { site, whatsappUrl } from "@/lib/site";

const services = [
  { key: "traffic", Icon: Rocket },
  { key: "googleAds", Icon: Search },
  { key: "metaAds", Icon: Megaphone },
  { key: "seo", Icon: Gauge },
  { key: "content", Icon: PenLine },
  { key: "branding", Icon: Fingerprint },
  { key: "cro", Icon: FlaskConical },
  { key: "leads", Icon: UserPlus },
  { key: "funnels", Icon: Filter },
  { key: "automation", Icon: Workflow },
  { key: "analytics", Icon: LineChart },
] as const;

const synergyPoints = ["speed", "data", "iteration"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "marketing" });
  return { title: t("hero.title"), description: t("hero.subtitle") };
}

export default async function MarketingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("marketing");

  return (
    <div className="pb-0">
      <section className="mx-auto max-w-7xl px-6 pt-36 md:pt-44">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-muted">
          {t("hero.kicker")}
        </p>
        <h1 className="max-w-4xl font-display text-5xl font-semibold tracking-tight md:text-7xl">
          <SplitText text={t("hero.title")} />
        </h1>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted md:text-lg">
            {t("hero.subtitle")}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <Magnetic>
            <a
              href={whatsappUrl(site.phones[0].tel, t("cta.whatsapp"))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-invert px-7 py-3.5 text-sm font-medium text-invert-foreground"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
              {t("hero.cta")}
            </a>
          </Magnetic>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-muted">
            {t("services.kicker")}
          </p>
          <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-5xl">
            {t("services.title")}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ key, Icon }, i) => (
            <Reveal key={key} delay={0.04 * (i % 3)} className="h-full">
              <article className="group h-full bg-surface p-7 transition-colors hover:bg-surface-2">
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-muted transition-colors group-hover:text-foreground" strokeWidth={1.4} />
                  <span className="font-mono text-[10px] text-muted/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-base font-semibold tracking-tight">
                  {t(`services.items.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t(`services.items.${key}.description`)}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
          <div>
            <Reveal>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-muted">
                {t("synergy.kicker")}
              </p>
              <h2 className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
                {t("synergy.title")}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted md:text-base">
                {t("synergy.body")}
              </p>
            </Reveal>
          </div>
          <ol className="space-y-8 md:pt-16">
            {synergyPoints.map((point, i) => (
              <Reveal key={point} delay={0.08 * i}>
                <li className="flex gap-5 border-l border-line pl-6">
                  <span className="font-mono text-sm text-muted">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {t(`synergy.points.${point}.title`)}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {t(`synergy.points.${point}.description`)}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 text-center md:py-32">
        <Reveal>
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-5xl">
            {t("cta.title")}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted">
            {t("cta.subtitle")}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <Magnetic>
            <a
              href={whatsappUrl(site.phones[1].tel, t("cta.whatsapp"))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-invert px-7 py-3.5 text-sm font-medium text-invert-foreground"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
              {t("cta.whatsapp")}
            </a>
          </Magnetic>
          <p className="mt-6 text-sm text-muted">
            {site.phones[0].label} · {site.phones[1].label}
          </p>
        </Reveal>
      </section>
    </div>
  );
}
