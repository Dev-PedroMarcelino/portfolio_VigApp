"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { EmberStackContent, SideItem } from "./content";
import type { NewCartLine } from "./ember-stack";
import { AddButton, Eyebrow, Sticker, useAddedFlash } from "./ui";

const FRIES_IMG =
  "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80";
const SHAKE_IMG =
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1000&q=80";

interface SidesShakesProps {
  content: EmberStackContent["sides"];
  format: (value: number) => string;
  onAdd: (line: NewCartLine) => void;
}

export function SidesShakes({ content, format, onAdd }: SidesShakesProps) {
  return (
    <section id="sides" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className="mt-5 [font-family:var(--demo-display)] text-[clamp(1.9rem,4.5vw,3.1rem)] uppercase leading-[1.02] text-[var(--d-ink)]">
            {content.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--d-ink-soft)]">
            {content.intro}
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <SideGroup
            label={content.sidesLabel}
            image={FRIES_IMG}
            imageAlt={content.friesAlt}
            items={content.sides}
            groupKey="side"
            tilt="lg:-rotate-[0.5deg]"
            addLabel={content.addLabel}
            addedLabel={content.addedLabel}
            format={format}
            onAdd={onAdd}
          />
          <SideGroup
            label={content.shakesLabel}
            image={SHAKE_IMG}
            imageAlt={content.shakeAlt}
            items={content.shakes}
            groupKey="shake"
            tilt="lg:rotate-[0.5deg]"
            addLabel={content.addLabel}
            addedLabel={content.addedLabel}
            format={format}
            onAdd={onAdd}
          />
        </div>
      </div>
    </section>
  );
}

function SideGroup({
  label,
  image,
  imageAlt,
  items,
  groupKey,
  tilt,
  addLabel,
  addedLabel,
  format,
  onAdd,
}: {
  label: string;
  image: string;
  imageAlt: string;
  items: SideItem[];
  groupKey: string;
  tilt: string;
  addLabel: string;
  addedLabel: string;
  format: (value: number) => string;
  onAdd: (line: NewCartLine) => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className={`overflow-hidden rounded-3xl border-2 border-[#120A05] bg-[var(--d-card)] shadow-[6px_6px_0_rgba(0,0,0,0.5)] ${tilt}`}
    >
      <div className="relative h-44 sm:h-52">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 560px, 92vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,107,44,0.16),rgba(37,19,9,0.92))]"
        />
        <div className="absolute bottom-4 left-5 -rotate-2">
          <Sticker tone="mustard">{label}</Sticker>
        </div>
      </div>

      <ul className="divide-y divide-[var(--d-line)] px-6 pb-6">
        {items.map((item) => (
          <SideRow
            key={item.id}
            item={item}
            detail={label}
            groupKey={groupKey}
            addLabel={addLabel}
            addedLabel={addedLabel}
            format={format}
            onAdd={onAdd}
          />
        ))}
      </ul>
    </motion.article>
  );
}

function SideRow({
  item,
  detail,
  groupKey,
  addLabel,
  addedLabel,
  format,
  onAdd,
}: {
  item: SideItem;
  detail: string;
  groupKey: string;
  addLabel: string;
  addedLabel: string;
  format: (value: number) => string;
  onAdd: (line: NewCartLine) => void;
}) {
  const [added, flash] = useAddedFlash();

  const handleAdd = () => {
    onAdd({
      key: `${groupKey}:${item.id}`,
      name: item.name,
      detail,
      unitPrice: item.price,
    });
    flash();
  };

  return (
    <li className="flex items-center gap-4 py-4">
      <div className="min-w-0 flex-1">
        <p className="[font-family:var(--demo-display)] text-sm uppercase leading-tight text-[var(--d-ink)]">
          {item.name}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-[var(--d-ink-soft)]">
          {item.description}
        </p>
      </div>
      <p className="[font-family:var(--demo-display)] text-base leading-none text-[var(--d-mustard)] tabular-nums">
        {format(item.price)}
      </p>
      <AddButton
        added={added}
        addLabel={addLabel}
        addedLabel={addedLabel}
        itemName={item.name}
        onClick={handleAdd}
        compact
      />
    </li>
  );
}
