"use client";

import { Component, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSceneActive } from "@/components/three/use-scene-active";
import { cn } from "@/lib/utils";

const LocalModelViewer = dynamic(() => import("./local-model-viewer"), { ssr: false });

/**
 * In-page 3D viewport.
 *
 * Two sources, one look. When the model is self-hosted (`file` present under
 * `public/models`) it is rendered by our own three.js stage — no iframe at all,
 * transparent background, our lighting and controls. Until that file exists the
 * component falls back to the Sketchfab viewer with every one of its UI
 * switches turned off; note that `ui_infos`/`ui_controls`/`ui_watermark` are
 * only honoured for models whose author is on a paid plan, so the fallback is
 * fully chrome-less for some models and not for others. Self-hosting is the
 * only way to be certain, which is why `file` wins whenever it resolves.
 *
 * Either way there is no click-to-play gesture and no third-party link: the
 * model streams in when it reaches the viewport, behind the poster, and
 * attribution lives in page copy via `ModelCredit`.
 */
export function Model3D({
  uid,
  file,
  title,
  thumb,
  accent = "#ffffff",
  autospin,
  framing,
  motion = "drag",
  spinTurns,
  introSpin,
  embedFallback = true,
  className,
}: {
  /** Sketchfab uid for the fallback; omit when the model is only self-hosted. */
  uid?: string;
  /** Self-hosted asset, e.g. "/models/porsche-911.glb". Preferred when present. */
  file?: string;
  /** Accessible name for the viewport. */
  title: string;
  /** Poster shown until the first frame is painted; omit for a bare viewport. */
  thumb?: string;
  /** Accent for the loading sweep and the rim light. */
  accent?: string;
  /** Slow turntable; ignored when the visitor asked for reduced motion. */
  autospin?: boolean;
  /** Room scans want a tighter camera than props do. */
  framing?: "object" | "interior";
  /**
   * "scroll" hands the rotation to the page: the model turns as the visitor
   * scrolls past and unwinds as they scroll back. Without it the object turns
   * on its own. Either way nothing is draggable. Ignored by the embed fallback.
   */
  motion?: "drag" | "scroll";
  /** Full turns across one pass through the viewport, in scroll mode. */
  spinTurns?: number;
  /** Spin the model in on arrival before handing over to the scroll. */
  introSpin?: boolean;
  /**
   * When false, a missing self-hosted asset leaves the poster in place instead
   * of borrowing the third-party viewer. Use it where the surrounding design
   * cannot carry someone else's interface.
   */
  embedFallback?: boolean;
  className?: string;
}) {
  const { ref, inView, allowMotion } = useSceneActive<HTMLDivElement>();
  const [mode, setMode] = useState<"idle" | "local" | "embed" | "poster">("idle");
  const [embedSrc, setEmbedSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  /* Pick a source the first time the frame is seen: our own asset if it is
     actually deployed, the viewer otherwise. Decided once, never re-run. */
  useEffect(() => {
    if (!inView || mode !== "idle") return;
    let cancelled = false;

    const decide = async () => {
      if (file && (await exists(file))) {
        if (!cancelled) setMode("local");
        return;
      }
      if (cancelled) return;
      if (!embedFallback || !uid) {
        setMode("poster");
        return;
      }
      setEmbedSrc(viewerSrc(uid, accent, !!autospin && allowMotion));
      setMode("embed");
    };
    void decide();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- decided once, on first sight
  }, [inView, mode]);

  /* Scroll position of the frame, kept in a ref: the viewer reads it every
     frame, so scrolling drives the model without re-rendering React. Reduced
     motion opts out entirely and keeps the draggable viewer. */
  const scrollProgress = useRef(0);
  const scrollDriven = motion === "scroll" && allowMotion;

  useEffect(() => {
    if (!scrollDriven || mode !== "local") return;
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const travel = window.innerHeight + rect.height;
      /* 0 as the top edge reaches the fold, 1 as the bottom edge clears it. */
      scrollProgress.current = Math.min(
        1,
        Math.max(0, (window.innerHeight - rect.top) / travel),
      );
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [scrollDriven, mode, ref]);


  return (
    <div ref={ref} className={cn("relative isolate overflow-hidden", className)}>
      {thumb && (
        <Image
          src={thumb}
          alt={title}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className={cn(
            "object-cover transition-opacity duration-700 ease-out",
            ready ? "opacity-0" : "opacity-100",
          )}
        />
      )}

      {mode === "local" && (
        <div
          role="img"
          aria-label={title}
          className={cn(
            "absolute inset-0 z-10 transition-opacity duration-700 ease-out",
            ready ? "opacity-100" : "opacity-0",
          )}
        >
          {/* A malformed or half-uploaded asset must not blank the section. */}
          <ViewerBoundary
            onError={() => {
              setReady(false);
              if (!embedFallback || !uid) {
                setMode("poster");
                return;
              }
              setEmbedSrc(viewerSrc(uid, accent, !!autospin && allowMotion));
              setMode("embed");
            }}
          >
            <LocalModelViewer
              url={file!}
              accent={accent}
              autospin={!!autospin && allowMotion}
              framing={framing}
              active={inView}
              scrollProgress={scrollDriven ? scrollProgress : undefined}
              spinTurns={spinTurns}
              introSpin={introSpin && scrollDriven}
              onReady={() => setReady(true)}
              /* Out of GPU memory on a weak device: keep the poster, not a
                 black rectangle. Never the embed — it would fare no better. */
              onLost={() => {
                setReady(false);
                setMode("poster");
              }}
            />
          </ViewerBoundary>
        </div>
      )}

      {mode === "embed" && embedSrc && (
        <>
          <iframe
            title={title}
            src={embedSrc}
            loading="lazy"
            onLoad={() => setReady(true)}
            className={cn(
              "absolute inset-0 z-10 h-full w-full border-0 transition-opacity duration-700 ease-out",
              ready ? "opacity-100" : "opacity-0",
            )}
            allow="autoplay; xr-spatial-tracking"
          />
          {/* Seats the opaque render into the card: hairline edge + floor falloff. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_-56px_72px_-56px_rgba(0,0,0,0.55)]"
          />
        </>
      )}

      {/* Streaming: a thin accent sweep along the top edge, no play button. */}
      {!ready && mode !== "idle" && mode !== "poster" && (
        <span aria-hidden className="absolute inset-x-0 top-0 z-30 h-px overflow-hidden">
          <span
            className="block h-px w-1/3 animate-model-sweep"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
          />
        </span>
      )}

    </div>
  );
}

/**
 * Licence attribution for an embedded model, rendered as ordinary page copy so
 * each demo styles it with its own caption tokens.
 */
export function ModelCredit({
  credit,
  className,
}: {
  credit: { model: string; author: string; license?: string };
  className?: string;
}) {
  return (
    <p className={className}>
      {credit.model} — {credit.author} · {credit.license ?? "CC BY"}
    </p>
  );
}

/** True when the asset is really deployed (a 404 rewrite must not count). */
async function exists(url: string) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok && !(res.headers.get("content-type") ?? "").includes("text/html");
  } catch {
    return false;
  }
}

/** Sketchfab embed URL with every piece of the viewer's own UI switched off. */
function viewerSrc(uid: string, accent: string, spin: boolean) {
  const params = new URLSearchParams({
    autostart: "1",
    preload: "1",
    camera: "0", // open on the authored framing, skip the fly-in
    dnt: "1", // no tracking cookies
    ui_theme: "dark",
    ui_color: accent.replace("#", ""),
    ui_infos: "0", // model title, author, "view on Sketchfab"
    ui_controls: "0", // the whole bottom toolbar
    ui_general_controls: "0",
    ui_watermark: "0",
    ui_watermark_link: "0",
    ui_stop: "0",
    ui_start: "0",
    ui_loading: "0", // our own poster covers the download
    ui_hint: "0", // no instructional overlay of theirs either
    ui_help: "0",
    ui_settings: "0",
    ui_inspector: "0",
    ui_annotations: "0",
    ui_animations: "0",
    ui_fullscreen: "0",
    ui_vr: "0",
    ui_ar: "0",
    ui_ar_help: "0",
    ui_ar_qrcode: "0",
    scrollwheel: "0", // the page keeps its scroll; orbit stays drag-only
    double_click: "0", // no camera jump on a stray double click
  });
  if (spin) params.set("autospin", "0.2");

  return `https://sketchfab.com/models/${uid}/embed?${params.toString()}`;
}

class ViewerBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
