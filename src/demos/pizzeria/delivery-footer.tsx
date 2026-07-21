"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUp,
  Bike,
  Clock,
  Flame,
  Mail,
  MapPin,
  Phone,
  ShoppingBag,
} from "lucide-react";
import type { PizzeriaContent } from "./content";
import type { Fulfillment } from "./forno-nero";
import { Eyebrow, FlourOverlay } from "./ui";

interface DeliverySectionProps {
  content: PizzeriaContent["delivery"];
  fulfillment: Fulfillment;
  onFulfillmentChange: (value: Fulfillment) => void;
  deliveryFee: number;
  freeAbove: number;
  format: (value: number) => string;
}

export function DeliverySection({
  content,
  fulfillment,
  onFulfillmentChange,
  deliveryFee,
  freeAbove,
  format,
}: DeliverySectionProps) {
  const reduce = useReducedMotion();
  const isDelivery = fulfillment === "delivery";

  return (
    <section
      id="delivery"
      className="relative scroll-mt-24 overflow-hidden bg-[var(--d-red)] py-20 text-[#F5EBDC] lg:py-24"
    >
      <FlourOverlay opacity={0.08} blend="screen" />
      <div
        aria-hidden
        className="absolute -left-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(32,18,9,0.28),transparent_65%)]"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Eyebrow tone="cream">{content.eyebrow}</Eyebrow>
          <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
            {content.title}
          </h2>

          <div
            role="group"
            aria-label={content.toggleAria}
            className="mt-8 inline-flex gap-1.5 rounded-full border border-[rgba(245,235,220,0.35)] p-1.5"
          >
            <button
              type="button"
              aria-pressed={isDelivery}
              onClick={() => onFulfillmentChange("delivery")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                isDelivery
                  ? "bg-[#F5EBDC] text-[var(--d-red)]"
                  : "text-[#F5EBDC] hover:bg-[rgba(245,235,220,0.12)]"
              }`}
            >
              <Bike className="h-4 w-4" strokeWidth={2} aria-hidden />
              {content.deliveryLabel}
            </button>
            <button
              type="button"
              aria-pressed={!isDelivery}
              onClick={() => onFulfillmentChange("pickup")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                !isDelivery
                  ? "bg-[#F5EBDC] text-[var(--d-red)]"
                  : "text-[#F5EBDC] hover:bg-[rgba(245,235,220,0.12)]"
              }`}
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={2} aria-hidden />
              {content.pickupLabel}
            </button>
          </div>

          <div className="mt-8 min-h-[190px]">
            <AnimatePresence mode="wait" initial={false}>
              {isDelivery ? (
                <motion.div
                  key="delivery"
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgba(245,235,220,0.75)]">
                    {content.zonesLabel}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {content.zones.map((zone) => (
                      <li
                        key={zone}
                        className="rounded-full border border-[rgba(245,235,220,0.4)] px-3.5 py-1.5 text-sm font-medium"
                      >
                        {zone}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
                    <p className="inline-flex items-center gap-2">
                      <Clock className="h-4 w-4" strokeWidth={2} aria-hidden />
                      <span className="font-semibold">{content.deliveryTime}</span>
                      <span className="text-[rgba(245,235,220,0.75)]">
                        {content.timeLabel}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold">
                        {content.feeLabel}: {format(deliveryFee)}
                      </span>{" "}
                      <span className="text-[rgba(245,235,220,0.75)]">
                        · {content.freeHint} {format(freeAbove)}
                      </span>
                    </p>
                  </div>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-[rgba(245,235,220,0.8)]">
                    {content.boxNote}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="pickup"
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgba(245,235,220,0.75)]">
                    {content.addressLabel}
                  </p>
                  <p className="mt-3 inline-flex items-center gap-2 text-lg font-semibold">
                    <MapPin className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
                    {content.address}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" strokeWidth={2} aria-hidden />
                    <span className="font-semibold">{content.pickupTime}</span>
                    <span className="text-[rgba(245,235,220,0.75)]">
                      {content.timeLabel}
                    </span>
                  </p>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-[rgba(245,235,220,0.8)]">
                    {content.pickupNote}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="#menu"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--d-char)] px-6 py-3.5 text-sm font-semibold text-[#F5EBDC] transition-transform hover:scale-[1.03]"
          >
            <Flame className="h-4 w-4" strokeWidth={2} aria-hidden />
            {content.cta}
          </a>
        </div>

        <div className="relative mx-auto hidden aspect-square w-full max-w-[340px] lg:block">
          <div
            aria-hidden
            className="absolute inset-0 rotate-6 rounded-full border-2 border-dashed border-[rgba(245,235,220,0.4)]"
          />
          <div className="absolute inset-[9%] overflow-hidden rounded-full border-4 border-[rgba(245,235,220,0.3)] shadow-[0_30px_70px_rgba(32,18,9,0.4)]">
            <Image
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80"
              alt={content.sliceAlt}
              fill
              sizes="340px"
              className="scale-[1.06] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({ content }: { content: PizzeriaContent["footer"] }) {
  return (
    <footer className="relative overflow-hidden bg-[var(--d-char)] pb-24 pt-16 text-[#F1E4CC]">
      <FlourOverlay opacity={0.06} blend="screen" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.6fr]">
          <div>
            <p className="[font-family:var(--demo-display)] text-3xl font-semibold tracking-tight">
              Forno <em className="italic text-[var(--d-red)]">Nero</em>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#9A855F]">
              {content.blurb}
            </p>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-[#9A855F]">
              {content.visitLabel}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--d-red)]" strokeWidth={2} aria-hidden />
                {content.address}
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[var(--d-red)]" strokeWidth={2} aria-hidden />
                {content.phone}
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[var(--d-red)]" strokeWidth={2} aria-hidden />
                {content.email}
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-[#9A855F]">
              {content.hoursLabel}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {content.hours.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-[#9A855F]">
              {content.followLabel}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {content.socials.map((social) => (
                <li key={social}>
                  <a
                    href="#top"
                    className="underline-offset-4 transition-colors hover:text-[var(--d-red)] hover:underline"
                  >
                    {social}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(241,228,204,0.14)] pt-7 text-xs text-[#9A855F]">
          <p>Forno Nero · 1962–2026 · {content.legal}</p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 font-semibold text-[#F1E4CC] transition-colors hover:text-[var(--d-red)]"
          >
            <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
            {content.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
