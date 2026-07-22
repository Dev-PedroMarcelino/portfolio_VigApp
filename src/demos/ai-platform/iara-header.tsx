"use client";

import { useEffect, useState } from "react";
import type { IaraContent } from "./content";
import { scrollToId } from "./ui";

/** Wordmark: IARA set tight in the display face with a wave accent under the A. */
function Wordmark() {
  return (
    <span className="relative inline-flex items-baseline gap-1.5">
      <span className="text-lg font-extrabold tracking-[0.08em] text-[var(--d-ink)] [font-family:var(--demo-display)]">
        IARA
      </span>
      <svg width="22" height="7" viewBox="0 0 22 7" aria-hidden className="translate-y-[-2px]">
        <path
          d="M1 4 C3.5 1, 6 1, 8.5 4 S13.5 7, 16 4 S20 2, 21 3"
          fill="none"
          stroke="var(--d-teal)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function IaraHeader({ content }: { content: IaraContent["header"] }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[80] transition-colors duration-300 ${
        scrolled
          ? "border-b border-[var(--d-line)] bg-[rgba(3,25,29,0.82)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a
          href="#topo"
          aria-label="IARA — voltar ao topo"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="rounded-md"
        >
          <Wordmark />
        </a>

        <nav aria-label="IARA" className="hidden items-center gap-1 lg:flex">
          {content.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(link.href.slice(1));
              }}
              className="rounded-full px-3.5 py-2 text-[0.82rem] text-[var(--d-ink-soft)] transition-colors hover:bg-[var(--d-surface)] hover:text-[var(--d-ink)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => scrollToId("cta")}
          className="rounded-full bg-[var(--d-teal)] px-4 py-2 text-[0.8rem] font-semibold text-[#03191D] shadow-[0_0_24px_-6px_rgba(45,212,191,0.6)] transition-transform hover:scale-[1.04]"
        >
          {content.cta}
        </button>
      </div>
    </header>
  );
}
