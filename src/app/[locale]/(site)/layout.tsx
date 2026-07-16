import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/chrome/navbar";
import { Footer } from "@/components/chrome/footer";
import { Preloader } from "@/components/fx/preloader";

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Preloader />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
