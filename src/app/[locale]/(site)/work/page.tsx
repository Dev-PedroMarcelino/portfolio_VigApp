import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { WorkGrid } from "@/components/work/work-grid";
import { SplitText } from "@/components/fx/split-text";
import { Reveal } from "@/components/fx/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "work" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function WorkPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ c?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { c } = await searchParams;
  const t = await getTranslations("work");

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-36 md:pt-44">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-muted">
        {t("kicker")}
      </p>
      <h1 className="font-display text-5xl font-semibold tracking-tight md:text-7xl">
        <SplitText text={t("title")} />
      </h1>
      <Reveal delay={0.2}>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          {t("subtitle")}
        </p>
      </Reveal>
      <div className="mt-12">
        <WorkGrid initialCategory={c} />
      </div>
    </div>
  );
}
