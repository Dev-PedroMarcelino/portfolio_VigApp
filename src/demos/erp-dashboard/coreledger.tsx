"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { pickContent } from "@/demos/content";
import { coreledgerDict, type ViewId } from "./content";
import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";
import { OverviewPanel } from "./overview-panel";
import { InventoryPanel } from "./inventory-panel";
import { OrdersPanel } from "./orders-panel";
import { FinancePanel } from "./finance-panel";
import { AlertsDrawer } from "./alerts-drawer";
import { Outro } from "./outro";
import { AppFooter } from "./app-footer";

/**
 * Coreledger — operations ERP command center concept.
 * Ink navy surface, teal signal accent, amber warnings. Palette lives here as
 * CSS variables so the demo renders identically in any host theme.
 */
const PALETTE = {
  "--d-bg": "#0B1120",
  "--d-surface": "#0F1A2E",
  "--d-panel": "rgba(20,184,166,0.06)",
  "--d-panel-strong": "rgba(148,163,184,0.14)",
  "--d-line": "rgba(148,163,184,0.13)",
  "--d-line-strong": "rgba(148,163,184,0.28)",
  "--d-ink": "#E8EEF6",
  "--d-ink-soft": "#94A6BF",
  "--d-ink-faint": "#5E7189",
  "--d-accent": "#14B8A6",
  "--d-accent-soft": "#2DD4BF",
  "--d-accent-deep": "#0D9488",
  "--d-accent-ink": "#04110E",
  "--d-amber": "#F59E0B",
  "--d-rose": "#F43F5E",
  "--d-emerald": "#34D399",
  "--d-blue": "#38BDF8",
} as CSSProperties;

export function Coreledger({ locale }: { locale: string }) {
  const content = pickContent(coreledgerDict, locale);
  const reduce = useReducedMotion();

  const [view, setView] = useState<ViewId>("overview");
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [dismissed, setDismissed] = useState<Set<string>>(() => new Set());

  const openAlerts = useMemo(
    () => content.alerts.items.filter((a) => !dismissed.has(a.id)),
    [content.alerts.items, dismissed],
  );

  function dismissAlert(id: string) {
    setDismissed((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }

  function dismissAll() {
    setDismissed(new Set(content.alerts.items.map((a) => a.id)));
  }

  return (
    <div
      id="top"
      style={{ ...PALETTE, backgroundColor: "#0B1120", color: "#E8EEF6" }}
      className="relative min-h-screen [font-family:var(--demo-body)] text-[var(--d-ink)] antialiased selection:bg-[rgba(20,184,166,0.32)]"
    >
      <AppHeader
        content={content.nav}
        alertCount={openAlerts.length}
        onOpenAlerts={() => setAlertsOpen(true)}
      />

      <div className="flex flex-col md:flex-row">
        <div className="sticky top-16 z-30 border-b border-[var(--d-line)] bg-[rgba(11,17,32,0.9)] backdrop-blur md:top-16 md:z-20 md:self-start md:border-b-0 md:bg-transparent md:backdrop-blur-none">
          <AppSidebar content={content.nav} active={view} onSelect={setView} />
        </div>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              {view === "overview" ? <OverviewPanel content={content.overview} /> : null}
              {view === "inventory" ? (
                <InventoryPanel content={content.inventory} locale={locale} />
              ) : null}
              {view === "orders" ? <OrdersPanel content={content.orders} /> : null}
              {view === "finance" ? <FinancePanel content={content.finance} /> : null}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Outro content={content.outro} />
      <AppFooter content={content.footer} />

      <AlertsDrawer
        content={content.alerts}
        open={alertsOpen}
        items={openAlerts}
        onClose={() => setAlertsOpen(false)}
        onDismiss={dismissAlert}
        onDismissAll={dismissAll}
      />
    </div>
  );
}
