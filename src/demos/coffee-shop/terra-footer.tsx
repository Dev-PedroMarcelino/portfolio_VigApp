"use client";

import { Coffee, Camera, Mail } from "lucide-react";
import type { FooterContent } from "./content";
import { scrollToId } from "./ui";

export function TerraFooter({ content }: { content: FooterContent }) {
  return (
    <footer className="bg-[var(--d-footer)] px-5 pb-16 pt-20 text-[var(--d-sand)]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="[font-family:var(--demo-display)] text-4xl tracking-tight">
              Terra<span className="italic text-[#D9906A]"> CafÃ©</span>
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-[var(--d-sand-dim)]">
              <Coffee className="h-4 w-4 text-[#D9906A]" strokeWidth={1.6} aria-hidden />
              {content.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <nav aria-label={content.navLabel}>
              <h3 className="text-[0.62rem] font-bold uppercase tracking-[0.26em] text-[var(--d-sand-dim)]">
                {content.navLabel}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {content.nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToId(item.href.slice(1));
                      }}
                      className="text-sm text-[var(--d-sand)] transition-colors hover:text-[#D9906A]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="text-[0.62rem] font-bold uppercase tracking-[0.26em] text-[var(--d-sand-dim)]">
                {content.visitLabel}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-[var(--d-sand)]">
                {content.addressLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
                <li className="text-[var(--d-sand-dim)]">{content.hoursNote}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-[0.62rem] font-bold uppercase tracking-[0.26em] text-[var(--d-sand-dim)]">
                {content.followLabel}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a
                    href="https://instagram.com/terracafe.vm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[var(--d-sand)] transition-colors hover:text-[#D9906A]"
                  >
                    <Camera className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
                    {content.instagram}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${content.email}`}
                    className="flex items-center gap-2 text-[var(--d-sand)] transition-colors hover:text-[#D9906A]"
                  >
                    <Mail className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
                    {content.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-[var(--d-dark-line)] pt-7 text-xs text-[var(--d-sand-dim)] sm:flex-row sm:items-center sm:justify-between">
          <p>{content.fine}</p>
          <p>{content.credit}</p>
        </div>
      </div>
    </footer>
  );
}
