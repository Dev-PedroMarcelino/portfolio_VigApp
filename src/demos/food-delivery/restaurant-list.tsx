"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Clock, Bike, ArrowRight, MapPin } from "lucide-react";
import type { PratoContent, FilterId, Restaurant } from "./content";
import { foodImage, Eyebrow, RatingBadge } from "./ui";

function RestaurantCard({
  restaurant,
  content,
  currency,
  active,
  onSelect,
}: {
  restaurant: Restaurant;
  content: PratoContent["restaurants"];
  currency: (value: number) => string;
  active: boolean;
  onSelect: (id: string) => void;
}) {
  const free = restaurant.fee === 0;
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35 }}
      className={`group flex flex-col overflow-hidden rounded-3xl border bg-[var(--d-card)] transition-shadow hover:shadow-[0_30px_70px_-40px_rgba(36,18,6,0.6)] ${
        active
          ? "border-[var(--d-accent)] ring-2 ring-[var(--d-accent)]/30"
          : "border-[var(--d-line)]"
      }`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={foodImage(restaurant.image, 800)}
          alt={restaurant.blurb}
          fill
          sizes="(max-width: 768px) 100vw, 380px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(36,18,6,0) 45%, rgba(36,18,6,0.55) 100%)",
          }}
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {restaurant.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[var(--d-card)]/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--d-ink)] backdrop-blur"
            >
              {tag}
            </span>
          ))}
        </div>
        <RatingBadge
          rating={restaurant.rating}
          ariaLabel={content.ratingAria}
          className="absolute bottom-3 right-3"
        />
        {free && (
          <span className="absolute bottom-3 left-3 rounded-full bg-[var(--d-lime)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--d-ink)]">
            {content.freeLabel}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="[font-family:var(--demo-display)] text-xl font-bold text-[var(--d-ink)]">
            {restaurant.name}
          </h3>
          <span className="text-xs font-medium text-[var(--d-ink-soft)]">
            {restaurant.cuisineLabel}
          </span>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--d-ink-soft)]">
          {restaurant.blurb}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-[var(--d-ink)]">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-[var(--d-accent)]" aria-hidden />
            {restaurant.eta} {content.etaLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Bike className="h-3.5 w-3.5 text-[var(--d-accent)]" aria-hidden />
            {free ? content.freeLabel : `${currency(restaurant.fee)} ${content.feeLabel}`}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[var(--d-ink-soft)]">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {restaurant.distance}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[var(--d-line)] pt-4">
          <span className="text-xs text-[var(--d-ink-soft)]">
            {restaurant.reviews.toLocaleString()} {content.reviewsLabel}
          </span>
          <button
            type="button"
            onClick={() => onSelect(restaurant.id)}
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--d-ink)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--d-accent)]"
          >
            {content.viewMenu}
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function RestaurantList({
  content,
  currency,
  filter,
  onFilter,
  activeId,
  onSelect,
}: {
  content: PratoContent["restaurants"];
  currency: (value: number) => string;
  filter: FilterId;
  onFilter: (id: FilterId) => void;
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const reduce = useReducedMotion();
  const items =
    filter === "all"
      ? content.items
      : content.items.filter((r) => r.cuisine === filter);

  return (
    <section id="restaurants" className="bg-[var(--d-bg)] py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className="mt-4 [font-family:var(--demo-display)] text-3xl font-bold tracking-tight text-[var(--d-ink)] sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
        </div>

        <div
          role="tablist"
          aria-label={content.filterAria}
          className="mt-8 flex flex-wrap gap-2"
        >
          {content.filters.map((f) => {
            const selected = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => onFilter(f.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  selected
                    ? "bg-[var(--d-accent)] text-white shadow-[0_10px_24px_-10px_rgba(255,90,31,0.9)]"
                    : "border border-[var(--d-line-strong)] bg-[var(--d-card)] text-[var(--d-ink)] hover:border-[var(--d-accent)]"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <motion.div
          layout={!reduce}
          className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {items.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                content={content}
                currency={currency}
                active={restaurant.id === activeId}
                onSelect={onSelect}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {items.length === 0 && (
          <p className="mt-10 rounded-2xl border border-dashed border-[var(--d-line-strong)] bg-[var(--d-card)] p-8 text-center text-sm font-medium text-[var(--d-ink-soft)]">
            {content.emptyLabel}
          </p>
        )}
      </div>
    </section>
  );
}
