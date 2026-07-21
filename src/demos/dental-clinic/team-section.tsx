"use client";

import Image from "next/image";
import type { TeamContent } from "./content";
import { Gloss, Section, SectionLabel } from "./ui";

const MEMBER_PHOTOS: (string | null)[] = [
  "https://images.unsplash.com/photo-1588776813677-77aaf5595b83?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
  null, // fourth member gets a monogram card, CSS-art style
];

function initialsOf(name: string) {
  return name
    .replace(/^Dra?\.\s*/, "")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

export function TeamSection({ content }: { content: TeamContent }) {
  return (
    <Section id="team" className="bg-[var(--d-mist)]">
      <div className="max-w-xl">
        <SectionLabel text={content.label} />
        <h2 className="mt-5 [font-family:var(--demo-display)] text-3xl font-bold tracking-tight text-[var(--d-ink)] sm:text-5xl">
          {content.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[var(--d-ink-soft)]">{content.intro}</p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {content.members.map((member, index) => {
          const photo = MEMBER_PHOTOS[index] ?? null;
          return (
            <article
              key={member.name}
              className="group relative overflow-hidden rounded-3xl border border-[var(--d-line)] bg-white shadow-[0_24px_50px_-32px_rgba(19,74,120,0.45)] transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div
                className="relative aspect-[4/4.4] overflow-hidden"
                style={{ borderRadius: "0 0 55% 45% / 0 0 12% 12%" }}
              >
                {photo ? (
                  <>
                    <Image
                      src={photo}
                      alt={member.alt}
                      fill
                      sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 92vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(170deg, rgba(46,124,192,0.24) 0%, rgba(233,244,252,0.05) 55%, rgba(13,43,69,0.35) 100%)",
                      }}
                    />
                    <Gloss className="opacity-60" />
                  </>
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[var(--d-accent)] via-[#3D93D4] to-[var(--d-aqua)]">
                    <span
                      aria-hidden
                      className="absolute -left-10 -top-12 h-44 w-44 rounded-[58%_42%_55%_45%/55%_48%_52%_45%] bg-white/15 blur-sm"
                    />
                    <span
                      aria-hidden
                      className="absolute -bottom-14 -right-10 h-48 w-48 rounded-[45%_55%_48%_52%/52%_45%_55%_48%] bg-white/10"
                    />
                    <span
                      role="img"
                      aria-label={member.alt}
                      className="relative grid h-28 w-28 place-items-center rounded-[48%_52%_55%_45%/52%_48%_52%_48%] border border-white/40 bg-white/15 [font-family:var(--demo-display)] text-4xl font-bold text-white backdrop-blur"
                    >
                      {initialsOf(member.name)}
                    </span>
                    <Gloss className="opacity-50" />
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="[font-family:var(--demo-display)] text-lg font-bold text-[var(--d-ink)]">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[var(--d-accent)]">
                  {member.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--d-ink-soft)]">{member.bio}</p>
                <p className="mt-4 font-mono text-[0.65rem] tracking-widest text-[var(--d-ink-soft)]/70">
                  {member.registry}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
