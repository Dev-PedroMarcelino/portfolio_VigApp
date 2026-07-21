"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import type { TerminalContent, TerminalLineKind } from "./content";
import { SectionHeading, WindowFrame } from "./ui";

const LINE_COLORS: Record<TerminalLineKind, string> = {
  ok: "text-[var(--d-green)]",
  warn: "text-[var(--d-amber)]",
  info: "text-[var(--d-accent-soft)]",
  dim: "text-[var(--d-ink-faint)]",
};

const LINE_PREFIX: Record<TerminalLineKind, string> = {
  ok: "+",
  warn: "!",
  info: "›",
  dim: " ",
};

export function TerminalShowcase({ content }: { content: TerminalContent }) {
  const [tabId, setTabId] = useState(content.tabs[0].id);
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion() ?? false;

  const tab = content.tabs.find((t) => t.id === tabId) ?? content.tabs[0];

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  function copyCommand() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(tab.command).catch(() => undefined);
    }
    setCopied(true);
  }

  return (
    <section id="terminal" className="relative scroll-mt-20 px-5 py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 h-[480px] -translate-y-1/2"
        style={{
          background:
            "radial-gradient(50% 100% at 50% 50%, rgba(99,102,241,0.12) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl">
        <SectionHeading label={content.label} title={content.title} intro={content.intro} />

        <div className="mt-12">
          <div
            role="tablist"
            aria-label={content.tabsAria}
            className="mx-auto flex w-max max-w-full gap-1 overflow-x-auto rounded-full border border-[var(--d-line-bright)] bg-[var(--d-panel)] p-1"
          >
            {content.tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={t.id === tabId}
                onClick={() => setTabId(t.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  t.id === tabId
                    ? "bg-[var(--d-accent)] text-white shadow-[0_0_18px_-4px_rgba(139,92,246,0.9)]"
                    : "text-[var(--d-ink-dim)] hover:text-[var(--d-ink)]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <WindowFrame title="nebula — zsh">
              <div className="min-h-[280px] p-5 [font-family:var(--d-mono)] text-[0.78rem] leading-7">
                <div className="flex items-center justify-between gap-3">
                  <p className="min-w-0">
                    <span className="text-[var(--d-cyan)]">~/checkout</span>{" "}
                    <span className="text-[var(--d-accent-soft)]">$</span>{" "}
                    <span className="break-all text-[var(--d-ink)]">{tab.command}</span>
                  </p>
                  <button
                    type="button"
                    onClick={copyCommand}
                    aria-label={copied ? content.copied : content.copy}
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--d-line-bright)] px-2.5 py-1.5 text-[0.66rem] font-medium text-[var(--d-ink-dim)] transition-colors hover:border-[var(--d-accent)]/60 hover:text-[var(--d-ink)]"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3 text-[var(--d-green)]" strokeWidth={2.4} aria-hidden />
                        {content.copied}
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" strokeWidth={1.8} aria-hidden />
                        {content.copy}
                      </>
                    )}
                  </button>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={tab.id}
                    initial="hidden"
                    animate="visible"
                    exit={reduce ? undefined : { opacity: 0 }}
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: reduce ? 0 : 0.14 } },
                    }}
                    className="mt-3"
                  >
                    {tab.lines.map((line, i) => (
                      <motion.p
                        key={`${tab.id}-${i}`}
                        variants={{
                          hidden: reduce ? { opacity: 1 } : { opacity: 0, x: -6 },
                          visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
                        }}
                        className={LINE_COLORS[line.kind]}
                      >
                        <span className="mr-2 inline-block w-3 text-center opacity-80" aria-hidden>
                          {LINE_PREFIX[line.kind]}
                        </span>
                        {line.text}
                      </motion.p>
                    ))}
                    <motion.p
                      variants={{
                        hidden: reduce ? { opacity: 1 } : { opacity: 0 },
                        visible: { opacity: 1, transition: { duration: 0.2 } },
                      }}
                      aria-hidden
                    >
                      <span className="text-[var(--d-cyan)]">~/checkout</span>{" "}
                      <span className="text-[var(--d-accent-soft)]">$</span>{" "}
                      <span
                        className={`ml-1 inline-block h-4 w-2 translate-y-0.5 bg-[var(--d-accent-soft)] ${
                          reduce ? "" : "animate-pulse"
                        }`}
                      />
                    </motion.p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </WindowFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
