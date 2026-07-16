"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, Clock } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const SLOTS = ["09:00", "10:30", "13:00", "14:30", "16:00", "17:30"];

/** Calendly-style discovery-call picker (concept: confirms via WhatsApp). */
export function Schedule() {
  const t = useTranslations("contact.schedule");
  const locale = useLocale();
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const days = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(locale, {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    return Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i + 1);
      return formatter.format(date);
    });
  }, [locale]);

  return (
    <div className="rounded-3xl border border-line bg-surface p-7">
      <p className="mb-1 text-xs font-medium uppercase tracking-[0.25em] text-muted">
        {t("kicker")}
      </p>
      <h3 className="font-display text-2xl font-semibold tracking-tight">
        {t("title")}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{t("subtitle")}</p>
      <p className="mt-4 flex items-center gap-2 text-xs text-muted">
        <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
        {t("duration")}
      </p>

      {confirmed ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex items-center gap-3 rounded-2xl bg-subtle p-5"
        >
          <CalendarCheck className="h-5 w-5" strokeWidth={1.6} />
          <p className="text-sm font-medium">
            {t("confirmed")}{" "}
            <span className="text-muted">
              {days[day]} · {slot}
            </span>
          </p>
        </motion.div>
      ) : (
        <>
          <div className="mt-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {days.map((label, i) => (
              <button
                key={label}
                type="button"
                onClick={() => {
                  setDay(i);
                  setSlot(null);
                }}
                className={cn(
                  "shrink-0 rounded-2xl border px-4 py-2.5 text-xs font-medium transition-colors",
                  day === i
                    ? "border-transparent bg-invert text-invert-foreground"
                    : "border-line text-muted hover:text-foreground",
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {SLOTS.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setSlot(time)}
                className={cn(
                  "rounded-xl border py-2.5 font-mono text-xs transition-colors",
                  slot === time
                    ? "border-transparent bg-invert text-invert-foreground"
                    : "border-line text-muted hover:text-foreground",
                )}
              >
                {time}
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={!slot}
            onClick={() => setConfirmed(true)}
            className="mt-5 w-full rounded-2xl bg-invert py-3.5 text-sm font-medium text-invert-foreground transition-opacity disabled:opacity-40"
          >
            {t("confirm")}
          </button>
          <p className="mt-3 text-center text-[11px] text-muted">{t("timezone")}</p>
        </>
      )}
    </div>
  );
}
