"use client";

import { useCallback, useState, type CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { vielaDict, type CartLine } from "./content";
import { Grain } from "./ui";
import { VielaHeader } from "./viela-header";
import { DropHero } from "./drop-hero";
import { BrandMarquee } from "./brand-marquee";
import { CatalogGrid } from "./catalog-grid";
import { Vista360 } from "./vista-360";
import { LatestDrop } from "./latest-drop";
import { RaffleSection } from "./raffle-section";
import { AboutSection } from "./about-section";
import { VielaFooter } from "./viela-footer";
import { MiniCart } from "./mini-cart";

/**
 * VIELA — Brazilian streetwear store concept ("a viela é onde a rua acontece").
 * Deep violet-black surface with hot-pink to electric-violet gradients. The
 * palette is declared as CSS variables so the demo renders identically in the
 * host site's light and dark themes. Prices are always in R$ (BRL).
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

export function VielaStore({ locale }: { locale: string }) {
  const content = pickContent(vielaDict, locale);
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
      <VielaHeader
        content={content.header}
        cartCount={cart.length}
        onOpenCart={() => setCartOpen(true)}
      />
      <main>
        <DropHero content={content.hero} />
        <BrandMarquee content={content.marquee} />
        {/* The full store catalog leads the page — sneakers, apparel, accessories. */}
        <CatalogGrid
          content={content.catalog}
          locale={content.priceLocale}
          currency={content.currency}
          onAdd={addToCart}
        />
        <Vista360
          content={content.vista}
          locale={content.priceLocale}
          currency={content.currency}
          onAdd={addToCart}
        />
        <LatestDrop
          content={content.latest}
          locale={content.priceLocale}
          currency={content.currency}
          onAdd={addToCart}
        />
        <RaffleSection content={content.raffle} />
        <AboutSection content={content.about} />
      </main>
      <VielaFooter content={content.footer} />

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
