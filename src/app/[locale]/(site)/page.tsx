import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/hero";
import { Services } from "@/components/home/services";
import { Showcase } from "@/components/home/showcase";
import { Stats } from "@/components/home/stats";
import { MarketingTeaser } from "@/components/home/marketing-teaser";
import { ContactCta } from "@/components/home/contact-cta";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Services />
      <Showcase />
      <Stats />
      <MarketingTeaser />
      <ContactCta />
    </>
  );
}
