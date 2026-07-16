import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/fx/reveal";
import { Marquee } from "@/components/fx/marquee";

const channels = [
  "Google Ads",
  "Meta Ads",
  "SEO",
  "CRO",
  "Funnels",
  "Automation",
  "Analytics",
  "Branding",
  "Lead Gen",
];

export function MarketingTeaser() {
  const t = useTranslations("home.marketingTeaser");

  return (
    <section className="relative overflow-hidden bg-black py-24 text-white md:py-32">
      <div className="noise absolute inset-0" aria-hidden />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-white/50">
            {t("kicker")}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-6xl">
            {t("title")}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
            {t("subtitle")}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <Link
            href="/marketing"
            data-cursor={t("cta")}
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
          >
            {t("cta")}
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </Link>
        </Reveal>
      </div>
      <div className="relative z-10 mt-20 space-y-4">
        <Marquee duration={28}>
          {channels.map((channel) => (
            <span
              key={channel}
              className="mx-6 font-display text-3xl font-semibold uppercase tracking-tight text-white/15 md:text-5xl"
            >
              {channel}
            </span>
          ))}
        </Marquee>
        <Marquee duration={34} reverse>
          {channels.map((channel) => (
            <span
              key={channel}
              className="mx-6 font-display text-3xl font-semibold uppercase tracking-tight text-transparent md:text-5xl"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
            >
              {channel}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
