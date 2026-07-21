"use client";

import { useCallback, useState, type CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { nordformDict, type UnitId } from "./content";
import { NordformHeader } from "./nordform-header";
import { CartDrawer } from "./cart-drawer";
import { HeroScene } from "./hero-scene";
import { Bestsellers } from "./bestsellers";
import { CollectionStory } from "./collection-story";
import { Craftsmanship } from "./craftsmanship";
import { DeliverySection } from "./delivery-section";
import { ShowroomSection } from "./showroom-section";
import { NordformFooter } from "./nordform-footer";

/**
 * Nordform — Scandinavian furniture concept.
 * Oat, bone, walnut and sage; declared as CSS variables so the demo renders
 * identically whatever theme the host site is in.
 */
const PALETTE = {
  "--d-bg": "#EDE7DE",
  "--d-bone": "#F7F3EB",
  "--d-card": "#F3EDE2",
  "--d-ink": "#2E2A26",
  "--d-soft": "#6E6558",
  "--d-line": "#D8CFBF",
  "--d-oak": "#C8A97E",
  "--d-walnut": "#6B4A32",
  "--d-sage": "#8A9B85",
  "--d-sage-ink": "#5A6A54",
  "--d-dark": "#211D19",
  "--d-dark-2": "#2A2521",
  "--d-dark-line": "#3B352E",
  "--d-dark-text": "#CFC6B8",
} as CSSProperties;

export interface CartLine {
  key: string;
  name: string;
  variantLabel: string;
  price: number;
  qty: number;
}

export type AddLine = (line: Omit<CartLine, "qty">) => void;

export function Nordform({ locale }: { locale: string }) {
  const content = pickContent(nordformDict, locale);

  const [unit, setUnit] = useState<UnitId>("cm");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addLine = useCallback<AddLine>((line) => {
    setCart((prev) => {
      const index = prev.findIndex((l) => l.key === line.key);
      if (index === -1) return [...prev, { ...line, qty: 1 }];
      const next = [...prev];
      next[index] = { ...next[index], qty: next[index].qty + 1 };
      return next;
    });
  }, []);

  const changeQty = useCallback((key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((l) => (l.key === key ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const removeLine = useCallback((key: string) => {
    setCart((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const count = cart.reduce((n, l) => n + l.qty, 0);

  return (
    <div
      id="top"
      style={{ ...PALETTE, backgroundColor: "#EDE7DE", color: "#2E2A26" }}
      className="relative min-h-screen scroll-smooth [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased"
    >
      <NordformHeader
        content={content.header}
        unit={unit}
        onUnitChange={setUnit}
        cartCount={count}
        onOpenCart={() => setCartOpen(true)}
      />
      <CartDrawer
        content={content.cart}
        currency={content.currency}
        open={cartOpen}
        lines={cart}
        onClose={() => setCartOpen(false)}
        onChangeQty={changeQty}
        onRemove={removeLine}
        onClear={clearCart}
      />
      <main>
        <HeroScene content={content.hero} currency={content.currency} unit={unit} onAdd={addLine} />
        <Bestsellers
          content={content.bestsellers}
          currency={content.currency}
          unit={unit}
          onAdd={addLine}
        />
        <CollectionStory content={content.collection} />
        <Craftsmanship content={content.craft} />
        <DeliverySection content={content.delivery} />
        <ShowroomSection content={content.showroom} />
      </main>
      <NordformFooter content={content.footer} />
    </div>
  );
}
