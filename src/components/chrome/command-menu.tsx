"use client";

import { useEffect, useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { demos } from "@/lib/demos";

/** Cmd/Ctrl+K palette that searches every showcased demo. */
export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const t = useTranslations("nav");
  const tc = useTranslations("categories");
  const tw = useTranslations("work.demos");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return demos.slice(0, 8);
    return demos
      .filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.slug.replace(/-/g, " ").includes(q) ||
          tc(d.category).toLowerCase().includes(q) ||
          tw(`${d.slug}.tagline`).toLowerCase().includes(q),
      )
      .slice(0, 10);
  }, [query, tc, tw]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setQuery("");
      }}
    >
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={t("search")}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-foreground/80 transition-colors hover:bg-subtle"
        >
          <Search className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[9500] bg-black/50 backdrop-blur-sm data-[state=open]:animate-in" />
        <Dialog.Content className="glass fixed left-1/2 top-[18vh] z-[9600] w-[min(560px,92vw)] -translate-x-1/2 overflow-hidden rounded-3xl shadow-2xl shadow-black/40">
          <Dialog.Title className="sr-only">{t("search")}</Dialog.Title>
          <div className="flex items-center gap-3 border-b border-line px-5 py-4">
            <Search className="h-4 w-4 text-muted" strokeWidth={1.5} />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
            />
            <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">
              ESC
            </kbd>
          </div>
          <ul className="max-h-[46vh] overflow-y-auto p-2">
            {results.map((demo) => (
              <li key={demo.slug}>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    router.push(`/demos/${demo.slug}`);
                  }}
                  className="group flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-colors hover:bg-subtle"
                >
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: demo.colors[1] }}
                    />
                    <span>
                      <span className="block text-sm font-medium text-foreground">
                        {demo.name}
                      </span>
                      <span className="block text-xs text-muted">
                        {tc(demo.category)}
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted opacity-0 transition-opacity group-hover:opacity-100" strokeWidth={1.5} />
                </button>
              </li>
            ))}
            {results.length === 0 ? (
              <li className="px-4 py-8 text-center text-sm text-muted">
                {t("searchEmpty")}
              </li>
            ) : null}
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
