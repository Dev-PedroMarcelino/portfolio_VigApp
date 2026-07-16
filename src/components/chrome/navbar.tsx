"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { demoCategories, featuredDemos } from "@/lib/demos";
import { site, whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";
import { CommandMenu } from "./command-menu";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";
import { Magnetic } from "@/components/fx/magnetic";

const links = [
  { href: "/", key: "home" },
  { href: "/work", key: "work" },
  { href: "/marketing", key: "marketing" },
  { href: "/contact", key: "contact" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const tc = useTranslations("categories");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => scrollY.on("change", (y) => setScrolled(y > 24)), [scrollY]);
  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-[8000]">
      <div
        className={cn(
          "mx-auto flex items-center justify-between gap-4 px-5 transition-all duration-500",
          scrolled
            ? "glass mt-3 max-w-5xl rounded-full py-2.5 shadow-lg shadow-black/5"
            : "mt-0 max-w-7xl bg-transparent py-5",
        )}
      >
        <Link href="/" className="flex items-center gap-2.5" aria-label="VigApp">
          <Image
            src={site.logo}
            alt=""
            width={30}
            height={30}
            priority
            className="invert dark:invert-0"
          />
          <span className="font-display text-lg font-semibold tracking-tight">
            VigApp
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <div
                key={link.key}
                onPointerEnter={() => setMegaOpen(link.key === "work")}
                onPointerLeave={() => link.key === "work" && setMegaOpen(false)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors hover:text-foreground",
                    active ? "text-foreground" : "text-muted",
                  )}
                >
                  {t(link.key)}
                  {active ? (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-foreground"
                    />
                  ) : null}
                </Link>
                {link.key === "work" ? (
                  <AnimatePresence>
                    {megaOpen ? (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.25, ease: [0.22, 0.61, 0.2, 1] }}
                        className="glass absolute left-1/2 top-full mt-3 w-[640px] -translate-x-1/2 rounded-3xl p-6 shadow-2xl shadow-black/20"
                      >
                        <div className="grid grid-cols-[1fr_1.4fr] gap-6">
                          <div>
                            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
                              {t("categoriesTitle")}
                            </p>
                            <ul className="space-y-1">
                              {demoCategories.slice(0, 8).map((category) => (
                                <li key={category}>
                                  <Link
                                    href={{ pathname: "/work", query: { c: category } }}
                                    className="block rounded-lg px-2 py-1 text-sm text-muted transition-colors hover:bg-subtle hover:text-foreground"
                                  >
                                    {tc(category)}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
                              {t("featuredTitle")}
                            </p>
                            <ul className="grid grid-cols-2 gap-1.5">
                              {featuredDemos.slice(0, 8).map((demo) => (
                                <li key={demo.slug}>
                                  <Link
                                    href={`/demos/${demo.slug}`}
                                    className="group flex items-center gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-subtle"
                                  >
                                    <span
                                      aria-hidden
                                      className="h-2 w-2 shrink-0 rounded-full"
                                      style={{ backgroundColor: demo.colors[1] }}
                                    />
                                    <span className="truncate text-sm text-foreground/90">
                                      {demo.name}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <Link
                              href="/work"
                              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-foreground"
                            >
                              {t("viewAllWork")}
                              <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <CommandMenu />
          <LocaleSwitcher />
          <ThemeToggle />
          <Magnetic className="hidden md:block">
            <a
              href={whatsappUrl(site.phones[0].tel, t("whatsappMessage"))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 items-center rounded-full bg-invert px-4 text-sm font-medium text-invert-foreground transition-transform"
            >
              {t("cta")}
            </a>
          </Magnetic>
          <button
            type="button"
            aria-label={mobileOpen ? t("close") : t("menu")}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" strokeWidth={1.5} />
            ) : (
              <Menu className="h-4 w-4" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[-1] flex flex-col justify-between bg-background px-6 pb-10 pt-28 lg:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="space-y-2">
                {links.map((link, i) => (
                  <motion.li
                    key={link.key}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      className="font-display text-4xl font-medium tracking-tight text-foreground"
                    >
                      {t(link.key)}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="space-y-1 text-sm text-muted">
              {site.phones.map((phone) => (
                <a key={phone.tel} href={`tel:${phone.tel}`} className="block">
                  {phone.label}
                </a>
              ))}
              <p>{site.email}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
