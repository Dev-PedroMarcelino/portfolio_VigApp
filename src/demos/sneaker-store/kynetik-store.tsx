"use client";

import { useCallback, useState, type CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { kynetikDict, type CartLine } from "./content";
import { Grain } from "./ui";
import { KynetikHeader } from "./kynetik-header";
import { DropHero } from "./drop-hero";
import { BrandMarquee } from "./brand-marquee";
import { LatestDrop } from "./latest-drop";
import { SneakerGrid } from "./sneaker-grid";
import { RaffleSection } from "./raffle-section";
import { AboutSection } from "./about-section";
import { KynetikFooter } from "./kynetik-footer";
import { MiniCart } from "./mini-cart";

/**
 * KYNETIK — hype sneaker culture concept.
 * Deep violet-black surface with hot-pink to electric-violet gradients. The
 * palette is declared as CSS variables so the demo renders identically in the
 * host site's light and dark themes.
 */
const PALETTE = {
  "--d-bg": "#12081F",
  "--d-bg-2": "#180A29",
  "--d-panel": "#1F0F35",
  "--d-panel-2": "#291447",
  "--d-ink": "#F5EEFF",
  "--d-ink-soft": "#B7A2D8",
  "--d-mute": "#7B6A9C",
  "--d-accent": "#FF3D81",
  "--d-accent-2": "#B026FF",
  "--d-volt": "#D8FF3D",
  "--d-line": "rgba(255,255,255,0.10)",
} as CSSProperties;

export function KynetikStore({ locale }: { locale: string }) {
  const content = pickContent(kynetikDict, locale);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = useCallback((line: CartLine) => {
    setCart((prev) => [...prev, line]);
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div
      style={{ ...PALETTE, backgroundColor: "#12081F", color: "#F5EEFF" }}
      className="relative min-h-screen [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased"
    >
      <Grain />
      <KynetikHeader
        content={content.header}
        cartCount={cart.length}
        onOpenCart={() => setCartOpen(true)}
      />
      <main>
        <DropHero content={content.hero} />
        <BrandMarquee content={content.marquee} />
        <LatestDrop
          content={content.latest}
          locale={content.priceLocale}
          currency={content.currency}
          onAdd={addToCart}
        />
        <SneakerGrid
          content={content.grid}
          locale={content.priceLocale}
          currency={content.currency}
          onAdd={addToCart}
        />
        <RaffleSection content={content.raffle} />
        <AboutSection content={content.about} />
      </main>
      <KynetikFooter content={content.footer} />

      <MiniCart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        content={content.cart}
        locale={content.priceLocale}
        currency={content.currency}
      />
    </div>
  );
}
