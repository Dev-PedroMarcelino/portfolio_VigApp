"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";

/**
 * Luxury boot sequence: black veil, wireframe mark, counting percentage,
 * then a clip-path curtain lift. Runs once per session and never for
 * reduced-motion users.
 */
export function Preloader() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionStorage.getItem("vigapp:booted")) return;

    setShow(true);
    document.documentElement.style.overflow = "hidden";

    let value = 0;
    const interval = setInterval(() => {
      value = Math.min(100, value + Math.ceil(Math.random() * 16));
      setProgress(value);
      if (value >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          sessionStorage.setItem("vigapp:booted", "1");
          document.documentElement.style.overflow = "";
          setShow(false);
        }, 450);
      }
    }, 130);

    return () => {
      clearInterval(interval);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black text-white"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 0.61, 0.2, 1] }}
          >
            <Image
              src={site.logo}
              alt="VigApp"
              width={88}
              height={88}
              priority
              className="animate-spin-slow"
            />
          </motion.div>
          <div className="absolute bottom-10 flex w-full items-end justify-between px-10">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
              VigApp — Digital Craft
            </span>
            <span className="font-display text-5xl font-medium tabular-nums">
              {progress}
            </span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
