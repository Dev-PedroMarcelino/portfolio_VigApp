"use client";

import { useCallback, useMemo, useReducer, useState } from "react";
import { Flame, ShoppingBasket } from "lucide-react";
import { pickContent } from "@/demos/content";
import { pizzeriaDictionary, type PizzeriaContent } from "./content";
import { Hero } from "./hero";
import { MenuSection } from "./menu-section";
import { StoriaSection } from "./storia-section";
import { ProcessSection } from "./process-section";
import { DeliverySection, SiteFooter } from "./delivery-footer";
import { CartDrawer } from "./cart-drawer";

export interface CartLine {
  key: string;
  name: string;
  detail: string;
  unitPrice: number;
  qty: number;
}

export type NewCartLine = Omit<CartLine, "qty">;
export type Fulfillment = "delivery" | "pickup";

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
  "--d-bg": "#F5EBDC",
  "--d-bg-soft": "#FBF4E6",
  "--d-crust": "#E8D8BC",
  "--d-ink": "#2A1A10",
  "--d-ink-soft": "#75604C",
  "--d-red": "#C1272D",
  "--d-red-deep": "#8E1B21",
  "--d-basil": "#3F6B3A",
  "--d-char": "#201209",
  backgroundColor: "#F5EBDC",
  color: "#2A1A10",
} as React.CSSProperties;

function SiteHeader({
  content,
  count,
  onOpenCart,
}: {
  content: PizzeriaContent["header"];
  count: number;
  onOpenCart: () => void;
}) {
  return (
    <header className="sticky top-0 z-[8600] border-b border-[rgba(42,26,16,0.12)] bg-[rgba(245,235,220,0.88)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--d-red)] text-[#F5EBDC]">
            <Flame className="h-4 w-4" strokeWidth={2.2} aria-hidden />
          </span>
          <span className="flex flex-col leading-none">
            <span className="[font-family:var(--demo-display)] text-lg font-semibold tracking-tight">
              Forno <em className="italic text-[var(--d-red)]">Nero</em>
            </span>
            <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.24em] text-[var(--d-ink-soft)] sm:block">
              {content.locationTag}
            </span>
          </span>
        </a>

        <nav
          aria-label={content.navAria}
          className="hidden items-center gap-7 text-sm font-medium md:flex"
        >
          <a href="#menu" className="transition-colors hover:text-[var(--d-red)]">
            {content.navMenu}
          </a>
          <a href="#storia" className="transition-colors hover:text-[var(--d-red)]">
            {content.navStory}
          </a>
          <a href="#impasto" className="transition-colors hover:text-[var(--d-red)]">
            {content.navProcess}
          </a>
          <a href="#delivery" className="transition-colors hover:text-[var(--d-red)]">
            {content.navDelivery}
          </a>
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href="#menu"
            className="hidden rounded-full bg-[var(--d-ink)] px-5 py-2.5 text-sm font-semibold text-[#F5EBDC] transition-colors hover:bg-[var(--d-red)] sm:inline-flex"
          >
            {content.orderCta}
          </a>
          <button
            type="button"
            aria-label={content.cartAria}
            onClick={onOpenCart}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(42,26,16,0.22)] transition-colors hover:bg-[rgba(42,26,16,0.06)]"
          >
            <ShoppingBasket className="h-5 w-5" strokeWidth={1.9} aria-hidden />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--d-red)] px-1 text-[10px] font-bold tabular-nums text-[#F5EBDC]">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export function FornoNeroRoot({ locale }: { locale: string }) {
  const content = pickContent(pizzeriaDictionary, locale);
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [cartOpen, setCartOpen] = useState(false);
  const [fulfillment, setFulfillment] = useState<Fulfillment>("delivery");

  const format = useMemo(() => {
    const formatter = new Intl.NumberFormat(content.currency.locale, {
      style: "currency",
      currency: content.currency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    return (value: number) => formatter.format(value);
  }, [content.currency.locale, content.currency.code]);

  const itemCount = cart.reduce((total, line) => total + line.qty, 0);

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
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

  return (
    <div
      style={PALETTE}
      className="relative min-h-screen overflow-x-clip bg-[var(--d-bg)] text-[var(--d-ink)] antialiased [font-family:var(--demo-body)]"
    >
      <SiteHeader
        content={content.header}
        count={itemCount}
        onOpenCart={openCart}
      />
      <main>
        <Hero content={content.hero} />
        <MenuSection
          content={content.menu}
          sizes={content.sizes}
          format={format}
          onAdd={addLine}
        />
        <StoriaSection content={content.story} />
        <ProcessSection content={content.process} />
        <DeliverySection
          content={content.delivery}
          fulfillment={fulfillment}
          onFulfillmentChange={setFulfillment}
          deliveryFee={content.cart.deliveryFee}
          freeAbove={content.cart.freeAbove}
          format={format}
        />
      </main>
      <SiteFooter content={content.footer} />
      <CartDrawer
        open={cartOpen}
        lines={cart}
        content={content.cart}
        format={format}
        fulfillment={fulfillment}
        onFulfillmentChange={setFulfillment}
        onClose={closeCart}
        onIncrement={incrementLine}
        onDecrement={decrementLine}
        onRemove={removeLine}
        onClear={clearCart}
      />
    </div>
  );
}
