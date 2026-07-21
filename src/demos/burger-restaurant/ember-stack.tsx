"use client";

import { useCallback, useMemo, useReducer, useState } from "react";
import { Flame, ShoppingBag } from "lucide-react";
import { pickContent } from "@/demos/content";
import { emberStackDictionary, type EmberStackContent } from "./content";
import { Grain } from "./ui";
import { Hero } from "./hero";
import { MenuSection } from "./menu-section";
import { ComboBuilder } from "./combo-builder";
import { SidesShakes } from "./sides-shakes";
import { VisitSection, SiteFooter } from "./visit-footer";
import { CartBar } from "./cart-bar";

export interface CartLine {
  key: string;
  name: string;
  detail: string;
  unitPrice: number;
  qty: number;
}

export type NewCartLine = Omit<CartLine, "qty">;

type CartAction =
  | { type: "add"; line: NewCartLine }
  | { type: "increment"; key: string }
  | { type: "decrement"; key: string }
  | { type: "remove"; key: string }
  | { type: "clear" };

function cartReducer(state: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case "add": {
      const existing = state.find((line) => line.key === action.line.key);
      if (existing) {
        return state.map((line) =>
          line.key === action.line.key ? { ...line, qty: line.qty + 1 } : line,
        );
      }
      return [...state, { ...action.line, qty: 1 }];
    }
    case "increment":
      return state.map((line) =>
        line.key === action.key ? { ...line, qty: line.qty + 1 } : line,
      );
    case "decrement":
      return state.map((line) =>
        line.key === action.key
          ? { ...line, qty: Math.max(1, line.qty - 1) }
          : line,
      );
    case "remove":
      return state.filter((line) => line.key !== action.key);
    case "clear":
      return [];
  }
}

const PALETTE = {
  "--d-bg": "#1A0E08",
  "--d-bg-deep": "#120A05",
  "--d-card": "#251309",
  "--d-line": "rgba(255,220,190,0.14)",
  "--d-line-strong": "rgba(255,220,190,0.28)",
  "--d-ink": "#FFF3E4",
  "--d-ink-soft": "#C7A183",
  "--d-flame": "#FF6B2C",
  "--d-mustard": "#FFC42E",
  backgroundColor: "#1A0E08",
  color: "#FFF3E4",
} as React.CSSProperties;

function SiteHeader({
  content,
  count,
  cartOpen,
  onOpenCart,
}: {
  content: EmberStackContent["header"];
  count: number;
  cartOpen: boolean;
  onOpenCart: () => void;
}) {
  return (
    <header className="sticky top-0 z-[8600] border-b-2 border-[#120A05] bg-[rgba(26,14,8,0.9)] backdrop-blur-md">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-6">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-9 w-9 -rotate-6 items-center justify-center rounded-xl border-2 border-[#120A05] bg-[var(--d-flame)] text-[#1A0E08] shadow-[3px_3px_0_rgba(0,0,0,0.45)]">
            <Flame className="h-4.5 w-4.5" strokeWidth={2.4} aria-hidden />
          </span>
          <span className="flex flex-col">
            <span className="[font-family:var(--demo-display)] text-base uppercase leading-none text-[var(--d-ink)]">
              Ember <span className="text-[var(--d-flame)]">&amp;</span> Stack
            </span>
            <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--d-ink-soft)] sm:block">
              {content.tagline}
            </span>
          </span>
        </a>

        <nav
          aria-label={content.navAria}
          className="hidden items-center gap-6 text-sm font-semibold lg:flex"
        >
          {[
            { href: "#menu", label: content.navMenu },
            { href: "#combo", label: content.navCombo },
            { href: "#sides", label: content.navSides },
            { href: "#visit", label: content.navVisit },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-mustard)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href="#menu"
            className="hidden rounded-xl border-2 border-[#120A05] bg-[var(--d-mustard)] px-4 py-2.5 [font-family:var(--demo-display)] text-[11px] uppercase leading-none text-[#1A0E08] shadow-[3px_3px_0_rgba(0,0,0,0.45)] transition-transform hover:-rotate-1 hover:scale-105 sm:inline-flex"
          >
            {content.orderCta}
          </a>
          <button
            type="button"
            aria-label={content.cartAria}
            aria-expanded={cartOpen}
            onClick={onOpenCart}
            className="relative flex h-11 w-11 items-center justify-center rounded-xl border-2 border-[var(--d-line-strong)] text-[var(--d-ink)] transition-colors hover:border-[var(--d-mustard)]"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={2} aria-hidden />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-md border-2 border-[#120A05] bg-[var(--d-mustard)] px-1 text-[10px] font-bold leading-none text-[#1A0E08] tabular-nums">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export function EmberStackRoot({ locale }: { locale: string }) {
  const content = pickContent(emberStackDictionary, locale);
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [cartOpen, setCartOpen] = useState(false);

  const format = useMemo(() => {
    const formatter = new Intl.NumberFormat(content.currency.locale, {
      style: "currency",
      currency: content.currency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return (value: number) => formatter.format(value);
  }, [content.currency.locale, content.currency.code]);

  const itemCount = cart.reduce((sum, line) => sum + line.qty, 0);

  const addLine = useCallback(
    (line: NewCartLine) => dispatch({ type: "add", line }),
    [],
  );
  const incrementLine = useCallback(
    (key: string) => dispatch({ type: "increment", key }),
    [],
  );
  const decrementLine = useCallback(
    (key: string) => dispatch({ type: "decrement", key }),
    [],
  );
  const removeLine = useCallback(
    (key: string) => dispatch({ type: "remove", key }),
    [],
  );
  const clearCart = useCallback(() => dispatch({ type: "clear" }), []);
  const openCart = useCallback(() => setCartOpen(true), []);

  return (
    <div
      style={PALETTE}
      className="relative min-h-screen overflow-x-clip bg-[var(--d-bg)] text-[var(--d-ink)] antialiased [font-family:var(--demo-body)]"
    >
      <Grain />
      <SiteHeader
        content={content.header}
        count={itemCount}
        cartOpen={cartOpen}
        onOpenCart={openCart}
      />
      <main>
        <Hero content={content.hero} />
        <MenuSection content={content.menu} format={format} onAdd={addLine} />
        <ComboBuilder content={content.combo} format={format} onAdd={addLine} />
        <SidesShakes content={content.sides} format={format} onAdd={addLine} />
        <VisitSection content={content.visit} />
      </main>
      <SiteFooter content={content.footer} header={content.header} />
      <CartBar
        lines={cart}
        open={cartOpen}
        content={content.cart}
        format={format}
        onOpenChange={setCartOpen}
        onIncrement={incrementLine}
        onDecrement={decrementLine}
        onRemove={removeLine}
        onClear={clearCart}
      />
    </div>
  );
}
