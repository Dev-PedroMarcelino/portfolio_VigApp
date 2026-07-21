"use client";

import { useCallback, useState } from "react";
import type { CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { HERO_PRODUCT_ID, voltixDict } from "./content";
import { VoltixHeader } from "./voltix-header";
import { VoltixHero } from "./voltix-hero";
import { CategoryTiles } from "./category-tiles";
import { ComparisonEngine } from "./comparison-engine";
import { DealsSection } from "./deals-section";
import { ReviewsStrip } from "./reviews-strip";
import { SupportBand } from "./support-band";
import { VoltixFooter } from "./voltix-footer";
import { CartDrawer, type CartLine } from "./cart-drawer";

/**
 * Voltix — flagship tech retail concept.
 * Deep space navy with electric cyan and holographic accents; the palette
 * lives here as CSS variables so the demo is identical in light and dark
 * host themes.
 */
const PALETTE = {
  "--d-bg": "#0A0F1E",
  "--d-bg-soft": "#0D1428",
  "--d-panel": "#121B36",
  "--d-ink": "#E8F0FF",
  "--d-ink-dim": "#8FA3C8",
  "--d-accent": "#00D4FF",
  "--d-violet": "#7C5CFF",
  "--d-magenta": "#FF4ECD",
  "--d-good": "#34F5C5",
  "--d-warn": "#FFB454",
  "--d-line": "#1D2A4D",
} as CSSProperties;

export function VoltixStore({ locale }: { locale: string }) {
  const content = pickContent(voltixDict, locale);

  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [ordered, setOrdered] = useState(false);

  const addToCart = useCallback((id: string, openDrawer = false) => {
    setOrdered(false);
    setCart((prev) => {
      const line = prev.find((l) => l.id === id);
      return line
        ? prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l))
        : [...prev, { id, qty: 1 }];
    });
    if (openDrawer) setCartOpen(true);
  }, []);

  const changeQty = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((l) => (l.id === id ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const removeLine = useCallback((id: string) => {
    setCart((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const closeCart = useCallback(() => setCartOpen(false), []);

  const checkout = useCallback(() => setOrdered(true), []);

  const resetAfterOrder = useCallback(() => {
    setCart([]);
    setOrdered(false);
    setCartOpen(false);
  }, []);

  const cartCount = cart.reduce((n, l) => n + l.qty, 0);
  const cartQty = useCallback(
    (id: string) => cart.find((l) => l.id === id)?.qty ?? 0,
    [cart],
  );

  return (
    <div
      id="top"
      style={{ ...PALETTE, backgroundColor: "#0A0F1E", color: "#E8F0FF" }}
      className="relative min-h-screen [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased"
    >
      <VoltixHeader
        content={content.header}
        cart={content.cart}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
      />
      <main>
        <VoltixHero
          content={content.hero}
          onPreorder={() => addToCart(HERO_PRODUCT_ID, true)}
        />
        <CategoryTiles content={content.categories} />
        <ComparisonEngine content={content.compare} />
        <DealsSection
          content={content.deals}
          priceLocale={content.priceLocale}
          currency={content.currency}
          cartQty={cartQty}
          onAdd={addToCart}
        />
        <ReviewsStrip content={content.reviews} />
        <SupportBand content={content.support} />
      </main>
      <VoltixFooter content={content.footer} />

      <CartDrawer
        open={cartOpen}
        onClose={closeCart}
        lines={cart}
        products={content.deals.products}
        content={content.cart}
        priceLocale={content.priceLocale}
        currency={content.currency}
        ordered={ordered}
        onChangeQty={changeQty}
        onRemove={removeLine}
        onCheckout={checkout}
        onReset={resetAfterOrder}
      />
    </div>
  );
}
