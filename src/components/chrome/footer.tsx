import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site, whatsappUrl } from "@/lib/site";
import { Marquee } from "@/components/fx/marquee";

export async function Footer() {
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface">
      <Marquee duration={30} className="border-b border-line py-5">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="mx-8 flex items-center gap-8 font-display text-sm uppercase tracking-[0.35em] text-muted"
          >
            {t("marquee")}
            <Image
              src={site.logo}
              alt=""
              width={18}
              height={18}
              className="invert opacity-40 dark:invert-0"
            />
          </span>
        ))}
      </Marquee>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src={site.logo}
              alt="VigApp"
              width={40}
              height={40}
              className="invert dark:invert-0"
            />
            <span className="font-display text-2xl font-semibold tracking-tight">
              VigApp
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            {t("tagline")}
          </p>
        </div>

        <nav aria-label={t("navigate")}>
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
            {t("navigate")}
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link className="text-foreground/80 transition-colors hover:text-foreground" href="/">{tn("home")}</Link></li>
            <li><Link className="text-foreground/80 transition-colors hover:text-foreground" href="/work">{tn("work")}</Link></li>
            <li><Link className="text-foreground/80 transition-colors hover:text-foreground" href="/marketing">{tn("marketing")}</Link></li>
            <li><Link className="text-foreground/80 transition-colors hover:text-foreground" href="/contact">{tn("contact")}</Link></li>
          </ul>
        </nav>

        <div>
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
            {t("talk")}
          </p>
          <ul className="space-y-2 text-sm">
            {site.phones.map((phone) => (
              <li key={phone.tel}>
                <a
                  href={whatsappUrl(phone.tel, t("whatsappMessage"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 transition-colors hover:text-foreground"
                >
                  {phone.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-foreground/80 transition-colors hover:text-foreground"
              >
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 text-xs text-muted">
          <span>© {year} VigApp. {t("rights")}</span>
          <span className="font-mono uppercase tracking-widest">{t("location")}</span>
        </p>
      </div>
    </footer>
  );
}
