"use client";

import type { CSSProperties } from "react";
import { pickContent } from "@/demos/content";
import { prumoDict } from "./content";
import { PrumoHeader } from "./prumo-header";
import { Hero } from "./hero";
import { Projects } from "./projects";
import { Spaces3D } from "./spaces-3d";
import { Process } from "./process";
import { Tour } from "./tour";
import { Studio } from "./studio";
import { Testimonials } from "./testimonials";
import { Contact } from "./contact";
import { PrumoFooter } from "./footer";

/**
 * Prumo Arquitetura — fictional Brazilian high-end residential studio.
 * Gallery-editorial minimalism: bone ground, near-black ink, a single bronze
 * accent, thin hairlines and lots of air. Declared as CSS variables on the
 * root so the demo renders identically in either host theme.
 */
const PALETTE = {
  "--d-bg": "#F5F2EC",
  "--d-bg-soft": "#EDE9E0",
  "--d-ink": "#16130F",
  "--d-ink-soft": "#5F584C",
  "--d-ink-faint": "#9B9285",
  "--d-accent": "#8C6A4A",
  "--d-accent-soft": "#C8A87F",
  "--d-line": "rgba(22,19,15,0.14)",
  "--d-line-strong": "rgba(22,19,15,0.42)",
} as CSSProperties;

export function Prumo({ locale }: { locale: string }) {
  const content = pickContent(prumoDict, locale);

  return (
    <div
      style={{ ...PALETTE, backgroundColor: "#F5F2EC", color: "#16130F" }}
      className="relative min-h-screen overflow-x-clip [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased"
    >
      <PrumoHeader content={content.header} />
      <main>
        <Hero content={content.hero} />
        <Projects content={content.projects} />
        <Spaces3D content={content.spaces} />
        <Process content={content.process} />
        <Tour content={content.tour} />
        <Studio content={content.studio} />
        <Testimonials content={content.testimonials} />
        <Contact content={content.contact} />
      </main>
      <PrumoFooter content={content.footer} nav={content.header.nav} />
    </div>
  );
}
