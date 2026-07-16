import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { DemoEntry } from "@/lib/demos";
import { cn } from "@/lib/utils";

/** Type-specimen card for a demo: its palette and brand voice, no stock photos. */
export function DemoCard({
  demo,
  className,
}: {
  demo: DemoEntry;
  className?: string;
}) {
  const t = useTranslations("work");
  const tc = useTranslations("categories");
  const [surface, accent] = demo.colors;

  return (
    <Link
      href={`/demos/${demo.slug}`}
      data-cursor={t("open")}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-line",
        className,
      )}
      style={{ backgroundColor: surface }}
    >
      <div className="noise relative aspect-[4/3] overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          style={{
            background: `radial-gradient(120% 90% at 80% 0%, ${accent}33 0%, transparent 55%), radial-gradient(80% 60% at 10% 100%, ${accent}22 0%, transparent 60%)`,
          }}
        />
        <span
          aria-hidden
          className="absolute -bottom-8 -right-2 select-none font-display text-[9rem] font-bold leading-none tracking-tighter opacity-[0.16] transition-all duration-700 group-hover:-translate-y-3 group-hover:opacity-30"
          style={{ color: accent }}
        >
          {demo.name.slice(0, 2)}
        </span>
        <span
          aria-hidden
          className="absolute left-5 top-5 h-2.5 w-2.5 rounded-full transition-transform duration-500 group-hover:scale-150"
          style={{ backgroundColor: accent }}
        />
        <span
          className="absolute right-5 top-5 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest"
          style={{ borderColor: `${accent}55`, color: accent }}
        >
          {tc(demo.category)}
        </span>
      </div>

      <div className="relative flex flex-1 items-end justify-between gap-4 p-5">
        <div>
          <h3
            className="font-display text-xl font-semibold tracking-tight"
            style={{ color: contrastText(surface) }}
          >
            {demo.name}
          </h3>
          <p
            className="mt-1 line-clamp-2 text-xs leading-relaxed"
            style={{ color: `${contrastText(surface)}99` }}
          >
            {t(`demos.${demo.slug}.tagline`)}
          </p>
        </div>
        <span
          aria-hidden
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 group-hover:rotate-45"
          style={{ borderColor: `${accent}66`, color: accent }}
        >
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
        </span>
      </div>
    </Link>
  );
}

/** Black or white text depending on the card surface luminance. */
function contrastText(hex: string): string {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 140 ? "#111111" : "#f5f5f5";
}
