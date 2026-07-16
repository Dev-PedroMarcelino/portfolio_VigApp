import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { site, whatsappUrl } from "@/lib/site";

/**
 * Frame around every showcased demo: a floating "back to VigApp" pill and a
 * closing conversion band. The demo itself owns everything in between.
 */
export async function DemoShell({
  children,
  demoName,
}: {
  children: React.ReactNode;
  demoName: string;
}) {
  const t = await getTranslations("demoShell");

  return (
    <div className="relative">
      <div className="pointer-events-none fixed bottom-5 left-1/2 z-[8500] w-max max-w-[92vw] -translate-x-1/2">
        <div className="glass pointer-events-auto flex items-center gap-2 rounded-full py-1.5 pl-2 pr-4 text-xs shadow-lg shadow-black/25">
          <Link
            href="/work"
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-invert px-3 py-1.5 font-medium text-invert-foreground"
          >
            <ArrowLeft className="h-3 w-3" strokeWidth={2} />
            VigApp
          </Link>
          <span className="hidden truncate text-muted sm:inline">
            {t("conceptNote", { name: demoName })}
          </span>
        </div>
      </div>

      {children}

      <section className="relative overflow-hidden bg-black py-20 text-white">
        <div className="noise absolute inset-0" aria-hidden />
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center">
          <Image
            src={site.logo}
            alt="VigApp"
            width={48}
            height={48}
            className="opacity-90"
          />
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("hireTitle")}
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-white/60">
            {t("hireBody", { name: demoName })}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={whatsappUrl(site.phones[0].tel, t("whatsappMessage", { name: demoName }))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
              {t("hireCta")}
            </a>
            <Link
              href="/work"
              className="rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              {t("moreWork")}
            </Link>
          </div>
          <p className="font-mono text-xs tracking-widest text-white/40">
            {site.phones[0].label} · {site.phones[1].label}
          </p>
        </div>
      </section>
    </div>
  );
}
