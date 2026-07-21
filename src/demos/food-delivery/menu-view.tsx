"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Clock, Bike, ArrowLeft, Plus, Check, ShoppingBag } from "lucide-react";
import type { PratoContent, Restaurant, Dish } from "./content";
import { foodImage, RatingBadge, useAddedFlash } from "./ui";
import type { NewCartLine } from "./prato";

function DishCard({
  dish,
  content,
  restaurant,
  currency,
  onAdd,
}: {
  dish: Dish;
  content: PratoContent["menu"];
  restaurant: Restaurant;
  currency: (value: number) => string;
  onAdd: (line: NewCartLine) => void;
}) {
  const [added, flash] = useAddedFlash();

  const handleAdd = () => {
    flash();
    onAdd({
      key: `${restaurant.id}:${dish.id}`,
      dishId: dish.id,
      name: dish.name,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      unitPrice: dish.price,
      deliveryFee: restaurant.fee,
      eta: restaurant.eta,
    });
  };

  return (
    <article className="group flex gap-4 rounded-2xl border border-[var(--d-line)] bg-[var(--d-card)] p-3 transition-shadow hover:shadow-[0_24px_60px_-40px_rgba(36,18,6,0.6)]">
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-32">
        <Image
          src={foodImage(dish.image, 400)}
          alt={content.dishImageAlt}
          fill
          sizes="130px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {dish.popular && (
          <span className="absolute left-1.5 top-1.5 rounded-full bg-[var(--d-accent)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
            {content.popularLabel}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <h4 className="[font-family:var(--demo-display)] text-lg font-bold leading-tight text-[var(--d-ink)]">
          {dish.name}
        </h4>
        <p className="mt-1 line-clamp-2 text-sm leading-snug text-[var(--d-ink-soft)]">
          {dish.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="[font-family:var(--demo-display)] text-lg font-bold text-[var(--d-ink)] tabular-nums">
            {currency(dish.price)}
          </span>
          <motion.button
            type="button"
            onClick={handleAdd}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 480, damping: 18 }}
            aria-label={`${content.addAria}: ${dish.name}`}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
              added
                ? "bg-[var(--d-lime)] text-[var(--d-ink)]"
                : "bg-[var(--d-ink)] text-white hover:bg-[var(--d-accent)]"
            }`}
          >
            {added ? (
              <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
            ) : (
              <Plus className="h-4 w-4" strokeWidth={3} aria-hidden />
            )}
            {added ? content.addedLabel : content.addLabel}
          </motion.button>
        </div>
      </div>
    </article>
  );
}

export function MenuView({
  content,
  restaurant,
  currency,
  onAdd,
  onBack,
}: {
  content: PratoContent["menu"];
  restaurant: Restaurant;
  currency: (value: number) => string;
  onAdd: (line: NewCartLine) => void;
  onBack: () => void;
}) {
  const reduce = useReducedMotion();
  const free = restaurant.fee === 0;

  return (
    <section id="menu" className="scroll-mt-20 bg-[var(--d-cream)] py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--d-ink-soft)] transition-colors hover:text-[var(--d-accent)]"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2.4} aria-hidden />
          {content.backLabel}
        </button>

        <div className="relative mt-5 overflow-hidden rounded-3xl border border-[var(--d-line)]">
          <div className="relative h-44 w-full sm:h-56">
            <Image
              src={foodImage(restaurant.image, 1400)}
              alt={restaurant.blurb}
              fill
              sizes="(max-width: 1024px) 100vw, 1100px"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(36,18,6,0.15) 0%, rgba(36,18,6,0.82) 100%)",
              }}
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--d-lime)]">
                {restaurant.cuisineLabel}
              </p>
              <h2 className="mt-1 [font-family:var(--demo-display)] text-3xl font-bold text-white sm:text-4xl">
                {restaurant.name}
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-semibold text-white/90">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-[var(--d-lime)]" aria-hidden />
                  {restaurant.eta} {content.etaLabel}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Bike className="h-3.5 w-3.5 text-[var(--d-lime)]" aria-hidden />
                  {free ? content.freeLabel : `${currency(restaurant.fee)} ${content.feeLabel}`}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShoppingBag className="h-3.5 w-3.5 text-[var(--d-lime)]" aria-hidden />
                  {currency(content.minOrder)} {content.minLabel}
                </span>
              </div>
            </div>
            <RatingBadge
              rating={restaurant.rating}
              ariaLabel={content.ratingAria}
              className="!bg-white !text-[var(--d-ink)]"
            />
          </div>
        </div>

        <h3 className="mt-9 [font-family:var(--demo-display)] text-2xl font-bold text-[var(--d-ink)]">
          {content.dishesTitle}
        </h3>

        <AnimatePresence mode="wait">
          <motion.div
            key={restaurant.id}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-5 grid gap-4 md:grid-cols-2"
          >
            {restaurant.dishes.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                content={content}
                restaurant={restaurant}
                currency={currency}
                onAdd={onAdd}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
