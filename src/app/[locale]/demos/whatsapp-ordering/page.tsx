import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { DemoShell } from "@/components/demos/demo-shell";
import { ZapRoot } from "@/demos/whatsapp-ordering/zap-root";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--demo-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--demo-body",
});

export const metadata: Metadata = {
  title: "ZapPedido — concept by VigApp",
  description:
    "WhatsApp-first restaurant ordering concept: a live chat simulator that builds a real burger order with quick replies, running total and a one-tap wa.me handoff.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DemoShell demoName="ZapPedido">
      <div className={`${display.variable} ${body.variable}`}>
        <ZapRoot locale={locale} />
      </div>
    </DemoShell>
  );
}
