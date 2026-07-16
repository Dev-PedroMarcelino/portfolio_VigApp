import { MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/fx/reveal";
import { Magnetic } from "@/components/fx/magnetic";
import { site, whatsappUrl } from "@/lib/site";

export function ContactCta() {
  const t = useTranslations("home.cta");
  const tn = useTranslations("nav");

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-36">
      <div className="flex flex-col items-center text-center">
        <Reveal>
          <h2 className="max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-6xl">
            {t("title")}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            {t("subtitle")}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <a
                href={whatsappUrl(site.phones[0].tel, tn("whatsappMessage"))}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor={t("whatsapp")}
                className="flex items-center gap-2 rounded-full bg-invert px-7 py-3.5 text-sm font-medium text-invert-foreground"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
                {t("whatsapp")}
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={`tel:${site.phones[1].tel}`}
                className="flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-medium transition-colors hover:bg-subtle"
              >
                <Phone className="h-4 w-4" strokeWidth={1.8} />
                {t("call")}
              </a>
            </Magnetic>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 text-sm text-muted">
            {site.phones[0].label} · {site.phones[1].label}
            <span className="mx-2 opacity-50">/</span>
            {t("orWrite")}{" "}
            <a className="underline underline-offset-4 hover:text-foreground" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
