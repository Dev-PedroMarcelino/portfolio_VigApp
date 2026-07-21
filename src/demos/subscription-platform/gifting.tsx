"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Gift, Truck, User } from "lucide-react";
import type { GiftingContent } from "./content";
import { scrollToId, SectionLabel } from "./ui";

const IMG_GIFT =
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1100&q=80";

export function Gifting({
  content,
  giftMode,
  onGiftModeChange,
}: {
  content: GiftingContent;
  giftMode: boolean;
  onGiftModeChange: (v: boolean) => void;
}) {
  const reduce = useReducedMotion() ?? false;
  const mode = giftMode ? content.gift : content.self;

  return (
    <section id="gifting" className="scroll-mt-24 px-5 py-20 md:py-28">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[3rem] bg-[var(--d-kraft)] p-7 md:p-14">
        <div
          aria-hidden
          className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[var(--d-peach)]/70"
        />
        <div className="relative grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="relative aspect-[4/5] -rotate-2 overflow-hidden rounded-[1.75rem] border-8 border-[var(--d-card)] shadow-2xl shadow-[#37271A]/25">
              <Image
                src={IMG_GIFT}
                alt={content.imageAlt}
                fill
                sizes="(min-width: 1024px) 380px, 84vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(170deg, rgba(226,89,59,0.18) 0%, rgba(55,39,26,0) 40%, rgba(55,39,26,0.35) 100%)",
                }}
              />
            </div>
            <p className="absolute -bottom-4 left-1/2 flex w-max max-w-[90%] -translate-x-1/2 rotate-1 items-center gap-2 rounded-full bg-[var(--d-ink)] px-4 py-2.5 text-[0.6rem] font-extrabold uppercase tracking-[0.12em] text-[var(--d-bg)] shadow-lg">
              <Truck className="h-3.5 w-3.5 shrink-0 text-[var(--d-peach)]" strokeWidth={2.2} aria-hidden />
              <span className="truncate">{content.note}</span>
            </p>
          </div>

          <div>
            <SectionLabel text={content.label} />
            <h2 className="mt-5 [font-family:var(--demo-display)] text-4xl tracking-tight md:text-5xl">
              {content.title}
            </h2>

            {/* Mode toggle */}
            <div
              role="group"
              aria-label={content.label}
              className="mt-7 inline-flex rounded-full border border-[var(--d-kraft-deep)] bg-[var(--d-card)] p-1.5"
            >
              <button
                type="button"
                aria-pressed={!giftMode}
                onClick={() => onGiftModeChange(false)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] transition-colors ${
                  !giftMode
                    ? "bg-[var(--d-accent)] text-[var(--d-bg)]"
                    : "text-[var(--d-ink-soft)] hover:text-[var(--d-ink)]"
                }`}
              >
                <User className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
                {content.toggleSelf}
              </button>
              <button
                type="button"
                aria-pressed={giftMode}
                onClick={() => onGiftModeChange(true)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] transition-colors ${
                  giftMode
                    ? "bg-[var(--d-accent)] text-[var(--d-bg)]"
                    : "text-[var(--d-ink-soft)] hover:text-[var(--d-ink)]"
                }`}
              >
                <Gift className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
                {content.toggleGift}
              </button>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={giftMode ? "gift" : "self"}
                initial={reduce ? undefined : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="mt-7"
              >
                <h3 className="[font-family:var(--demo-display)] text-2xl italic tracking-tight md:text-3xl">
                  {mode.headline}
                </h3>
                <p className="mt-3 max-w-lg leading-[1.85] text-[var(--d-ink-soft)]">{mode.body}</p>
                <ul className="mt-6 space-y-3">
                  {mode.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-sm font-bold">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--d-olive)] text-[var(--d-card)]">
                        <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => scrollToId("builder")}
                  className="mt-8 rounded-full bg-[var(--d-accent)] px-7 py-4 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-[var(--d-bg)] shadow-lg shadow-[#C24428]/30 transition-transform hover:scale-[1.03]"
                >
                  {mode.cta}
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
