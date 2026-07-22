"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/components/demos/use-reduced-motion-safe";
import { Braces, Server, Zap } from "lucide-react";
import type { IaraContent } from "./content";
import { SectionLabel } from "./ui";

/* Manual syntax highlight — tiny span helpers over the demo palette. */
const Cmd = ({ children }: { children: ReactNode }) => (
  <span className="text-[var(--d-ink)]">{children}</span>
);
const Flag = ({ children }: { children: ReactNode }) => (
  <span className="text-[#7DD3FC]">{children}</span>
);
const Str = ({ children }: { children: ReactNode }) => (
  <span className="text-[var(--d-cyan)]">{children}</span>
);
const Key = ({ children }: { children: ReactNode }) => (
  <span className="text-[var(--d-teal)]">{children}</span>
);
const Dim = ({ children }: { children: ReactNode }) => (
  <span className="text-[var(--d-ink-faint)]">{children}</span>
);

const BULLET_ICONS = [Braces, Zap, Server];

export function DevApi({ content }: { content: IaraContent["api"] }) {
  const reduced = useReducedMotion() ?? false;
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section id="api" className="relative scroll-mt-24 bg-[var(--d-surface)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left: pitch + bullets */}
          <div>
            <SectionLabel text={content.label} />
            <h2 className="mt-5 text-4xl font-extrabold leading-[1.02] tracking-tight text-[var(--d-ink)] [font-family:var(--demo-display)] sm:text-5xl">
              {content.title}
            </h2>
            <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-[var(--d-ink-soft)]">
              {content.intro}
            </p>

            <ul className="mt-10 space-y-6">
              {content.bullets.map((b, i) => {
                const Icon = BULLET_ICONS[i % BULLET_ICONS.length];
                return (
                  <li key={b.title} className="flex gap-4">
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--d-line)] bg-[rgba(3,25,29,0.6)]"
                    >
                      <Icon className="h-4 w-4 text-[var(--d-teal)]" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="text-[0.94rem] font-semibold text-[var(--d-ink)]">{b.title}</p>
                      <p className="mt-1 text-[0.84rem] leading-relaxed text-[var(--d-ink-soft)]">
                        {b.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: request + SSE stream */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
            className="space-y-4"
          >
            <div className="overflow-hidden rounded-2xl border border-[var(--d-line)] bg-[#02161A] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]">
              <div className="flex items-center justify-between border-b border-[var(--d-line)] px-4 py-2.5">
                <span className="text-[0.66rem] uppercase tracking-[0.22em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
                  {content.requestLabel}
                </span>
                <span className="rounded-full bg-[rgba(45,212,191,0.1)] px-2 py-0.5 text-[0.62rem] font-semibold text-[var(--d-teal)] [font-family:var(--demo-mono)]">
                  POST /v1/chat
                </span>
              </div>
              <div className="overflow-x-auto p-5">
                <pre className="text-[0.78rem] leading-[1.75] [font-family:var(--demo-mono)]">
                  <code>
                    <Cmd>curl</Cmd> <Str>https://api.iara.com.br/v1/chat</Str> <Dim>\</Dim>
                    {"\n  "}
                    <Flag>-H</Flag> <Str>&quot;Authorization: Bearer $IARA_API_KEY&quot;</Str> <Dim>\</Dim>
                    {"\n  "}
                    <Flag>-H</Flag> <Str>&quot;Content-Type: application/json&quot;</Str> <Dim>\</Dim>
                    {"\n  "}
                    <Flag>-d</Flag> <Dim>&#39;{"{"}</Dim>
                    {"\n    "}
                    <Key>&quot;modelo&quot;</Key>
                    <Dim>:</Dim> <Str>&quot;iara-2-correnteza&quot;</Str>
                    <Dim>,</Dim>
                    {"\n    "}
                    <Key>&quot;mensagens&quot;</Key>
                    <Dim>: [{"{"}</Dim>
                    {"\n      "}
                    <Key>&quot;papel&quot;</Key>
                    <Dim>:</Dim> <Str>&quot;usuario&quot;</Str>
                    <Dim>,</Dim>
                    {"\n      "}
                    <Key>&quot;conteudo&quot;</Key>
                    <Dim>:</Dim> <Str>&quot;Resume esta NF-e em 3 linhas.&quot;</Str>
                    {"\n    "}
                    <Dim>{"}"}],</Dim>
                    {"\n    "}
                    <Key>&quot;stream&quot;</Key>
                    <Dim>:</Dim> <Flag>true</Flag>
                    {"\n  "}
                    <Dim>{"}"}&#39;</Dim>
                  </code>
                </pre>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[var(--d-line)] bg-[#02161A]">
              <div className="flex items-center gap-2 border-b border-[var(--d-line)] px-4 py-2.5">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--d-cyan)]"
                />
                <span className="text-[0.66rem] uppercase tracking-[0.22em] text-[var(--d-ink-faint)] [font-family:var(--demo-mono)]">
                  {content.responseLabel}
                </span>
              </div>
              <div className="overflow-x-auto p-5">
                <pre className="text-[0.74rem] leading-[1.9] [font-family:var(--demo-mono)]">
                  <code>
                    {content.sseLines.map((line, i) => (
                      <span key={i} className={i === content.sseLines.length - 1 ? "text-[var(--d-teal)]" : "text-[var(--d-ink-soft)]"}>
                        {line}
                        {"\n"}
                      </span>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
