import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SplitText } from "@/components/fx/split-text";
import { Reveal } from "@/components/fx/reveal";
import { ContactForm } from "@/components/contact/contact-form";
import { Schedule } from "@/components/contact/schedule";
import { site, whatsappUrl } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-36 md:pt-44">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-muted">
        {t("kicker")}
      </p>
      <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-6xl">
        <SplitText text={t("title")} />
      </h1>
      <Reveal delay={0.2}>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted md:text-base">
          {t("subtitle")}
        </p>
      </Reveal>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <ContactForm />
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.05}>
            <div className="rounded-3xl border border-line bg-surface p-7">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-muted">
                {t("channels.title")}
              </p>
              <ul className="space-y-3.5">
                {site.phones.map((phone) => (
                  <li key={phone.tel}>
                    <a
                      href={whatsappUrl(phone.tel, t("channels.whatsappMessage"))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-sm"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors group-hover:bg-subtle">
                        <MessageCircle className="h-4 w-4" strokeWidth={1.6} />
                      </span>
                      <span>
                        <span className="block font-medium">{phone.label}</span>
                        <span className="text-xs text-muted">
                          {t("channels.whatsapp")} · {t("channels.call")}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${site.email}`} className="group flex items-center gap-3 text-sm">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors group-hover:bg-subtle">
                      <Mail className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                    <span>
                      <span className="block font-medium">{site.email}</span>
                      <span className="text-xs text-muted">{t("channels.email")}</span>
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line">
                    <Phone className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                  <span className="text-xs text-muted">
                    {site.phones[0].label}
                    <br />
                    {site.phones[1].label}
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Schedule />
          </Reveal>

          <Reveal delay={0.15}>
            <div className="noise relative overflow-hidden rounded-3xl border border-line bg-surface">
              <div
                aria-hidden
                className="h-44 w-full opacity-60 dark:opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <span
                aria-hidden
                className="absolute left-1/2 top-16 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-invert text-invert-foreground shadow-xl"
              >
                <MapPin className="h-4 w-4" strokeWidth={1.8} />
              </span>
              <div className="relative border-t border-line p-6">
                <p className="font-display text-sm font-semibold">{t("map.title")}</p>
                <p className="mt-1 text-xs text-muted">{t("map.note")}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
