"use client";

import type { CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { zapDict } from "./content";
import { ZapHeader } from "./zap-header";
import { ZapHero } from "./zap-hero";
import { ChatSection } from "./chat-section";
import { HowSection } from "./how-section";
import { PricingSection } from "./pricing-section";
import { CtaSection } from "./cta-section";
import { ZapFooter } from "./zap-footer";

/**
 * ZapPedido — WhatsApp-first restaurant ordering concept.
 * The palette is defined here as CSS variables so the demo renders identically
 * regardless of the host site's light/dark theme.
 */
const PALETTE = {
  "--d-bg": "#0B141A",
  "--d-chat": "#0B141A",
  "--d-panel": "#111B21",
  "--d-panel-2": "#16232B",
  "--d-footer": "#08110F",
  "--d-line": "#22333C",
  "--d-ink": "#E9EDEF",
  "--d-ink-soft": "#8696A0",
  "--d-accent": "#25D366",
  "--d-bubble-in": "#1F2C34",
  "--d-bubble-out": "#D9FDD3",
} as CSSProperties;

export function ZapRoot({ locale }: { locale: string }) {
  const content = pickContent(zapDict, locale);

  return (
    <div
      style={{ ...PALETTE, backgroundColor: "#0B141A", color: "#E9EDEF" }}
      className="min-h-screen [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased"
    >
      <ZapHeader content={content.header} />
      <main>
        <ZapHero content={content.hero} />
        <ChatSection
          chat={content.chat}
          menuSection={content.menuSection}
          menuItems={content.menuItems}
          extras={content.extras}
          addresses={content.addresses}
          payments={content.payments}
          currency={content.currency}
        />
        <HowSection content={content.how} />
        <PricingSection content={content.pricing} />
        <CtaSection content={content.cta} />
      </main>
      <ZapFooter content={content.footer} />
    </div>
  );
}
