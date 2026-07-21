"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Drives whether a 3D scene should actually animate. Returns a ref to attach to
 * the canvas wrapper and an `active` flag that is true only when the element is
 * on screen AND the user has not requested reduced motion. Use it to gate
 * Framer/R3F loops: `useFrame` bodies should early-return when inactive, and
 * `<Canvas frameloop={active ? "always" : "demand"}>` parks the render loop so
 * off-screen scenes cost nothing.
 */
export function useSceneActive<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const [allowMotion, setAllowMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAllowMotion(!media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, active: inView && allowMotion, inView, allowMotion };
}
