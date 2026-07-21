"use client";

import { useCallback, useMemo, useReducer, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, MapPin, Utensils, ChevronDown, CheckCircle2, X } from "lucide-react";
import { pickContent } from "@/demos/content";
import { pratoDictionary, type PratoContent, type FilterId } from "./content";
import { Hero } from "./hero";
import { RestaurantList } from "./restaurant-list";
import { MenuView } from "./menu-view";
import { CartSheet } from "./cart-sheet";
import { TrackingTheatre } from "./tracking";
import { CourierBand } from "./courier-band";
import { Footer } from "./footer";
import { Grain } from "./ui";

export interface CartLine {
  key: string;
  dishId: string;
  name: string;
  restaurantId: string;
  restaurantName: string;
  unitPrice: number;
  deliveryFee: number;
  eta: string;
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
      return state
        .map((line) =>
          line.key === action.key ? { ...line, qty: line.qty - 1 } : line,
        )
        .filter((line) => line.qty > 0);
    case "remove":
      return state.filter((line) => line.key !== action.key);
    case "clear":
      return [];
  }
}

const PALETTE = {
  "--d-bg": "#FFF8F0",
  "--d-cream": "#FFEEDC",
  "--d-card": "#FFFFFF",
  "--d-ink": "#241206",
  "--d-ink-soft": "#8A7156",
  "--d-line": "rgba(36,18,6,0.10)",
  "--d-line-strong": "rgba(36,18,6,0.18)",
  "--d-accent": "#FF5A1F",
  "--d-accent-deep": "#E8410A",
  "--d-lime": "#B7E528",
  backgroundColor: "#FFF8F0",
  color: "#241206",
} as React.CSSProperties;

function scrollToId(id: string) {
  if (typeof document === "undefined") return;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SiteHeader({
  content,
  count,
  onOpenCart,
}: {
  content: PratoContent["header"];
  count: number;
  onOpenCart: () => void;
}) {
  return (
    <header className="sticky top-0 z-[8600] border-b border-[var(--d-line)] bg-[var(--d-bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--d-accent)] text-white">
            <Utensils className="h-4.5 w-4.5" strokeWidth={2.4} aria-hidden />
          </span>
          <span className="[font-family:var(--demo-display)] text-xl font-bold tracking-tight text-[var(--d-ink)]">
            Prato
          </span>
        </a>

        <button
          type="button"
          onClick={() => scrollToId("restaurants")}
          className="hidden items-center gap-1.5 rounded-full border border-[var(--d-line-strong)] bg-[var(--d-card)] px-3.5 py-2 text-left text-xs md:inline-flex"
        >
          <MapPin className="h-3.5 w-3.5 text-[var(--d-accent)]" aria-hidden />
          <span className="text-[var(--d-ink-soft)]">{content.deliverTo}</span>
          <span className="max-w-[13rem] truncate font-semibold text-[var(--d-ink)]">
            {content.address}
          </span>
          <ChevronDown className="h-3.5 w-3.5 text-[var(--d-ink-soft)]" aria-hidden />
        </button>

        <nav
          aria-label={content.navAria}
          className="hidden items-center gap-6 text-sm font-semibold lg:flex"
        >
          {content.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-accent)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={onOpenCart}
          aria-label={content.cartAria}
          className="relative flex items-center gap-2 rounded-full bg-[var(--d-ink)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--d-accent)]"
        >
          <ShoppingBag className="h-4 w-4" strokeWidth={2.2} aria-hidden />
          <span className="hidden sm:inline">{content.orderCta}</span>
          {count > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--d-lime)] px-1 text-[11px] font-bold text-[var(--d-ink)] tabular-nums">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

function CheckoutOverlay({
  content,
  currency,
  itemCount,
  total,
  onClose,
  onTrack,
}: {
  content: PratoContent["checkout"];
  currency: (value: number) => string;
  itemCount: number;
  total: number;
  onClose: () => void;
  onTrack: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[8900] flex items-center justify-center bg-[rgba(26,12,4,0.6)] p-6 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-label={content.placedTitle}
    >
      <motion.div
        className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-[var(--d-bg)] p-7 text-center"
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={content.closeAria}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[var(--d-ink-soft)] transition-colors hover:bg-[var(--d-cream)]"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--d-lime)] text-[var(--d-ink)]">
          <CheckCircle2 className="h-8 w-8" strokeWidth={2.2} aria-hidden />
        </span>
        <h2 className="mt-5 [font-family:var(--demo-display)] text-2xl font-bold text-[var(--d-ink)]">
          {content.placedTitle}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--d-ink-soft)]">
          {content.placedNote}
        </p>

        <dl className="mt-5 space-y-2 rounded-2xl border border-[var(--d-line)] bg-[var(--d-card)] p-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-[var(--d-ink-soft)]">{content.orderNumberLabel}</dt>
            <dd className="font-bold text-[var(--d-ink)]">{content.orderNumber}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[var(--d-ink-soft)]">{content.summaryLabel}</dt>
            <dd className="font-bold text-[var(--d-ink)] tabular-nums">{itemCount}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[var(--d-ink-soft)]">{content.totalLabel}</dt>
            <dd className="font-bold text-[var(--d-ink)] tabular-nums">{currency(total)}</dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={onTrack}
          className="mt-5 w-full rounded-full bg-[var(--d-accent)] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[var(--d-accent-deep)]"
        >
          {content.trackCta}
        </button>
      </motion.div>
    </motion.div>
  );
}

export function PratoRoot({ locale }: { locale: string }) {
  const content = pickContent(pratoDictionary, locale);
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [filter, setFilter] = useState<FilterId>("all");
  const [activeId, setActiveId] = useState(content.restaurants.items[0].id);
  const [trackTrigger, setTrackTrigger] = useState(0);

  const format = useMemo(() => {
    const formatter = new Intl.NumberFormat(content.currency.locale, {
      style: "currency",
      currency: content.currency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return (value: number) => formatter.format(value);
  }, [content.currency.locale, content.currency.code]);

  const activeRestaurant =
    content.restaurants.items.find((r) => r.id === activeId) ??
    content.restaurants.items[0];

  const itemCount = cart.reduce((sum, line) => sum + line.qty, 0);
  const subtotal = cart.reduce((sum, line) => sum + line.unitPrice * line.qty, 0);
  const deliveryFee = cart[0]?.deliveryFee ?? 0;
  const serviceFee = cart.length > 0 ? content.cart.serviceFeeValue : 0;
  const total = subtotal + deliveryFee + serviceFee;

  const handleCuisine = useCallback((id: FilterId) => {
    setFilter(id);
    scrollToId("restaurants");
  }, []);

  const handleSelect = useCallback((id: string) => {
    setActiveId(id);
    scrollToId("menu");
  }, []);

  const handleBack = useCallback(() => scrollToId("restaurants"), []);

  const addLine = useCallback((line: NewCartLine) => {
    dispatch({ type: "add", line });
  }, []);

  const handleCheckout = useCallback(() => {
    setCartOpen(false);
    setCheckoutOpen(true);
  }, []);

  const handleTrack = useCallback(() => {
    setCheckoutOpen(false);
    dispatch({ type: "clear" });
    setTrackTrigger((t) => t + 1);
    scrollToId("tracking");
  }, []);

  return (
    <div
      style={PALETTE}
      className="relative min-h-screen overflow-x-clip bg-[var(--d-bg)] text-[var(--d-ink)] antialiased [font-family:var(--demo-body)]"
    >
      <Grain />
      <div className="relative z-[2]">
        <SiteHeader
          content={content.header}
          count={itemCount}
          onOpenCart={() => setCartOpen(true)}
        />
        <main>
          <Hero content={content.hero} onCuisine={handleCuisine} />
          <RestaurantList
            content={content.restaurants}
            currency={format}
            filter={filter}
            onFilter={setFilter}
            activeId={activeId}
            onSelect={handleSelect}
          />
          <MenuView
            content={content.menu}
            restaurant={activeRestaurant}
            currency={format}
            onAdd={addLine}
            onBack={handleBack}
          />
          <TrackingTheatre content={content.tracking} trigger={trackTrigger} />
          <CourierBand content={content.courier} />
        </main>
        <Footer content={content.footer} />
      </div>

      <AnimatePresence>
        {itemCount > 0 && !cartOpen && (
          <motion.button
            type="button"
            onClick={() => setCartOpen(true)}
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.9 }}
            className="fixed bottom-5 right-5 z-[8400] flex items-center gap-3 rounded-full bg-[var(--d-accent)] py-3 pl-4 pr-5 text-sm font-bold text-white shadow-[0_20px_40px_-16px_rgba(255,90,31,0.9)]"
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <ShoppingBag className="h-4 w-4" strokeWidth={2.4} aria-hidden />
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--d-lime)] px-1 text-[11px] font-bold text-[var(--d-ink)] tabular-nums">
                {itemCount}
              </span>
            </span>
            <span className="tabular-nums">{format(total)}</span>
          </motion.button>
        )}
      </AnimatePresence>

      <CartSheet
        open={cartOpen}
        lines={cart}
        content={content.cart}
        currency={format}
        onClose={() => setCartOpen(false)}
        onIncrement={(key) => dispatch({ type: "increment", key })}
        onDecrement={(key) => dispatch({ type: "decrement", key })}
        onRemove={(key) => dispatch({ type: "remove", key })}
        onClear={() => dispatch({ type: "clear" })}
        onCheckout={handleCheckout}
      />

      <AnimatePresence>
        {checkoutOpen && (
          <CheckoutOverlay
            content={content.checkout}
            currency={format}
            itemCount={itemCount}
            total={total}
            onClose={() => setCheckoutOpen(false)}
            onTrack={handleTrack}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
