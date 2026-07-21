"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Check,
  CheckCheck,
  RotateCcw,
  Send,
  MapPin,
  Plus,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { site, whatsappUrl } from "@/lib/site";
import type {
  ChatContent,
  Currency,
  Extra,
  ItemKind,
  MenuItem,
  MenuSectionContent,
  PayOption,
  SavedAddress,
} from "./content";
import { ChatDoodle, Eyebrow, etaLabel, formatMoney, scrollToId } from "./ui";

type Phase = "item" | "extras" | "address" | "payment" | "review";
type Msg = { id: number; from: "bot" | "user"; text: string };

interface ChatSectionProps {
  chat: ChatContent;
  menuSection: MenuSectionContent;
  menuItems: MenuItem[];
  extras: Extra[];
  addresses: SavedAddress[];
  payments: PayOption[];
  currency: Currency;
}

const UNSPLASH = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export function ChatSection(props: ChatSectionProps) {
  const { chat, menuSection, menuItems, extras, addresses, payments, currency } = props;
  const reduce = useReducedMotion();

  const [messages, setMessages] = useState<Msg[]>(() => [
    { id: 0, from: "bot", text: chat.greeting },
  ]);
  const [phase, setPhase] = useState<Phase>("item");
  const [item, setItem] = useState<MenuItem | null>(null);
  const [chosenExtras, setChosenExtras] = useState<Extra[]>([]);
  const [address, setAddress] = useState<SavedAddress | null>(null);
  const [payment, setPayment] = useState<PayOption | null>(null);
  const [typing, setTyping] = useState(false);

  const idRef = useRef(1);
  const timers = useRef<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const nextId = () => idRef.current++;
  const botDelay = reduce ? 200 : 900;

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  // Keep the message list pinned to the newest bubble without moving the page.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const scheduleBot = useCallback(
    (text: string, phaseAfter: Phase) => {
      setTyping(true);
      const t = window.setTimeout(() => {
        setTyping(false);
        setMessages((m) => [...m, { id: idRef.current++, from: "bot", text }]);
        setPhase(phaseAfter);
      }, botDelay);
      timers.current.push(t);
    },
    [botDelay],
  );

  const pushUser = (text: string) =>
    setMessages((m) => [...m, { id: nextId(), from: "user", text }]);

  const startWithItem = useCallback(
    (picked: MenuItem, scroll: boolean) => {
      clearTimers();
      setTyping(false);
      idRef.current = 2;
      setMessages([
        { id: 0, from: "bot", text: chat.greeting },
        { id: 1, from: "user", text: picked.name },
      ]);
      setItem(picked);
      setChosenExtras([]);
      setAddress(null);
      setPayment(null);
      scheduleBot(chat.askExtras, "extras");
      if (scroll) scrollToId("chat");
    },
    [chat.greeting, chat.askExtras, clearTimers, scheduleBot],
  );

  const toggleExtra = (ex: Extra) => {
    setChosenExtras((list) =>
      list.some((e) => e.id === ex.id) ? list.filter((e) => e.id !== ex.id) : [...list, ex],
    );
  };

  const confirmExtras = () => {
    const text = chosenExtras.length
      ? chosenExtras.map((e) => e.name).join(", ")
      : chat.labelExtrasNone;
    pushUser(text);
    scheduleBot(chat.askAddress, "address");
  };

  const selectAddress = (addr: SavedAddress) => {
    pushUser(`${addr.label} — ${addr.detail}`);
    setAddress(addr);
    scheduleBot(chat.askPayment, "payment");
  };

  const selectPayment = (pay: PayOption) => {
    pushUser(pay.label);
    setPayment(pay);
    scheduleBot(chat.reviewIntro, "review");
  };

  const restart = () => {
    clearTimers();
    setTyping(false);
    idRef.current = 1;
    setMessages([{ id: 0, from: "bot", text: chat.greeting }]);
    setPhase("item");
    setItem(null);
    setChosenExtras([]);
    setAddress(null);
    setPayment(null);
  };

  const total = (item?.price ?? 0) + chosenExtras.reduce((s, e) => s + e.price, 0);

  const waHref = () => {
    const lines = [
      chat.waIntro,
      `${chat.waItem}: ${item?.name ?? ""}`,
      `${chat.waExtras}: ${
        chosenExtras.length ? chosenExtras.map((e) => e.name).join(", ") : chat.labelExtrasNone
      }`,
      `${chat.waAddress}: ${address ? `${address.label} - ${address.detail}` : ""}`,
      `${chat.waPayment}: ${payment?.label ?? ""}`,
      `${chat.waTotal}: ${formatMoney(total, currency)}`,
    ];
    return whatsappUrl(site.phones[0].tel, lines.join("\n"));
  };

  return (
    <>
      <section id="chat" className="scroll-mt-20 px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <Eyebrow text={chat.eyebrow} />
            <h2 className="mt-3 [font-family:var(--demo-display)] text-3xl font-extrabold tracking-tight text-[var(--d-ink)] sm:text-4xl">
              {chat.title}
            </h2>
            <p className="mt-3 text-[var(--d-ink-soft)]">{chat.subtitle}</p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <ChatWindow
              chat={chat}
              phase={phase}
              messages={messages}
              typing={typing}
              menuItems={menuItems}
              extras={extras}
              chosenExtras={chosenExtras}
              addresses={addresses}
              payments={payments}
              currency={currency}
              total={total}
              item={item}
              address={address}
              payment={payment}
              scrollRef={scrollRef}
              reduce={reduce ?? false}
              onPickItem={(it) => startWithItem(it, false)}
              onToggleExtra={toggleExtra}
              onConfirmExtras={confirmExtras}
              onPickAddress={selectAddress}
              onPickPayment={selectPayment}
              onRestart={restart}
              waHref={waHref}
            />

            <OrderPanel
              chat={chat}
              currency={currency}
              item={item}
              chosenExtras={chosenExtras}
              address={address}
              payment={payment}
              total={total}
              phase={phase}
            />
          </div>
        </div>
      </section>

      <MenuGrid
        section={menuSection}
        items={menuItems}
        currency={currency}
        onAdd={(it) => startWithItem(it, true)}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Chat window                                                        */
/* ------------------------------------------------------------------ */

interface ChatWindowProps {
  chat: ChatContent;
  phase: Phase;
  messages: Msg[];
  typing: boolean;
  menuItems: MenuItem[];
  extras: Extra[];
  chosenExtras: Extra[];
  addresses: SavedAddress[];
  payments: PayOption[];
  currency: Currency;
  total: number;
  item: MenuItem | null;
  address: SavedAddress | null;
  payment: PayOption | null;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  reduce: boolean;
  onPickItem: (it: MenuItem) => void;
  onToggleExtra: (ex: Extra) => void;
  onConfirmExtras: () => void;
  onPickAddress: (a: SavedAddress) => void;
  onPickPayment: (p: PayOption) => void;
  onRestart: () => void;
  waHref: () => string;
}

function ChatWindow(p: ChatWindowProps) {
  const { chat, phase, messages, typing, currency } = p;

  return (
    <div className="overflow-hidden rounded-3xl border border-[var(--d-line)] bg-[var(--d-chat)] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]">
      {/* header */}
      <div className="flex items-center gap-3 bg-[#1F2C34] px-4 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--d-accent)] text-sm font-bold text-[#052014]">
          SL
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{chat.contactName}</p>
          <p className="truncate text-[0.7rem] text-[var(--d-accent)]">{chat.contactStatus}</p>
        </div>
      </div>

      {/* messages */}
      <div
        ref={p.scrollRef}
        className="relative h-[24rem] overflow-y-auto px-3.5 py-4 sm:h-[26rem]"
      >
        <ChatDoodle />
        <div className="relative space-y-2">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                layout={!p.reduce}
                initial={p.reduce ? false : { opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl px-3 py-2 text-[0.85rem] leading-snug shadow-sm ${
                    m.from === "user"
                      ? "rounded-br-md bg-[var(--d-bubble-out)] text-[#0B141A]"
                      : "rounded-bl-md bg-[var(--d-bubble-in)] text-white"
                  }`}
                >
                  {m.text}
                  <span className="ml-1.5 inline-flex translate-y-0.5 items-center">
                    {m.from === "user" ? (
                      <CheckCheck className="h-3 w-3 text-[#34B7F1]" strokeWidth={2.4} aria-hidden />
                    ) : (
                      <Check className="h-3 w-3 text-white/40" strokeWidth={2.4} aria-hidden />
                    )}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* order summary card shown at review */}
          {phase === "review" && !typing && (
            <motion.div
              initial={p.reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="w-[86%] max-w-xs rounded-2xl rounded-bl-md bg-[var(--d-bubble-in)] p-3 text-white shadow-sm">
                <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                  <ShoppingBag className="h-4 w-4 text-[var(--d-accent)]" strokeWidth={2} aria-hidden />
                  <span className="text-[0.72rem] font-bold uppercase tracking-wider text-white/80">
                    {chat.summaryTitle}
                  </span>
                </div>
                <SummaryLine label={chat.labelItem} value={p.item?.name ?? ""} />
                <SummaryLine
                  label={chat.labelExtras}
                  value={
                    p.chosenExtras.length
                      ? p.chosenExtras.map((e) => e.name).join(", ")
                      : chat.labelExtrasNone
                  }
                />
                <SummaryLine
                  label={chat.labelAddress}
                  value={p.address ? `${p.address.label} — ${p.address.detail}` : ""}
                />
                <SummaryLine label={chat.labelPayment} value={p.payment?.label ?? ""} />
                <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2">
                  <span className="text-sm font-bold">{chat.labelTotal}</span>
                  <span className="[font-family:var(--demo-display)] text-lg font-extrabold text-[var(--d-accent)]">
                    {formatMoney(p.total, currency)}
                  </span>
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-[0.68rem] text-[var(--d-accent)]">
                  <Sparkles className="h-3 w-3" strokeWidth={2} aria-hidden />
                  {chat.summaryReady}
                </p>
              </div>
            </motion.div>
          )}

          {typing && <TypingBubble label={chat.typingName} />}
        </div>
      </div>

      {/* quick replies */}
      <div className="border-t border-[var(--d-line)] bg-[#111B21] px-3.5 py-3">
        <p className="mb-2 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[var(--d-ink-soft)]">
          {chat.quickRepliesLabel}
        </p>
        <QuickReplies {...p} />
      </div>
    </div>
  );
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-2 flex items-start justify-between gap-3 text-[0.78rem]">
      <span className="shrink-0 text-white/50">{label}</span>
      <span className="text-right font-medium text-white">{value}</span>
    </div>
  );
}

function TypingBubble({ label }: { label: string }) {
  return (
    <div className="flex justify-start" role="status" aria-label={label}>
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-[var(--d-bubble-in)] px-3.5 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block h-1.5 w-1.5 rounded-full bg-white/60"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Quick reply chips (phase driven)                                   */
/* ------------------------------------------------------------------ */

function QuickReplies(p: ChatWindowProps) {
  const { chat, phase } = p;

  if (phase === "item") {
    return (
      <Chips>
        {p.menuItems.map((it) => (
          <Chip key={it.id} onClick={() => p.onPickItem(it)}>
            {it.name}
            <span className="ml-1.5 text-[var(--d-accent)]">{formatMoney(it.price, p.currency)}</span>
          </Chip>
        ))}
      </Chips>
    );
  }

  if (phase === "extras") {
    return (
      <div className="flex flex-col gap-2.5">
        <Chips>
          {p.extras.map((ex) => {
            const on = p.chosenExtras.some((e) => e.id === ex.id);
            return (
              <button
                key={ex.id}
                type="button"
                aria-pressed={on}
                onClick={() => p.onToggleExtra(ex)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[0.8rem] font-semibold transition-colors ${
                  on
                    ? "border-[var(--d-accent)] bg-[var(--d-accent)] text-[#052014]"
                    : "border-[var(--d-line)] bg-[var(--d-panel)] text-[var(--d-ink)] hover:border-[var(--d-accent)]"
                }`}
              >
                <Plus
                  className={`h-3.5 w-3.5 transition-transform ${on ? "rotate-45" : ""}`}
                  strokeWidth={2.4}
                  aria-hidden
                />
                {ex.name}
                <span className={on ? "text-[#052014]/70" : "text-[var(--d-ink-soft)]"}>
                  {formatMoney(ex.price, p.currency)}
                </span>
              </button>
            );
          })}
        </Chips>
        <button
          type="button"
          onClick={p.onConfirmExtras}
          className="self-start rounded-full bg-[var(--d-accent)] px-5 py-2.5 text-[0.8rem] font-bold text-[#052014] transition-transform hover:scale-[1.03]"
        >
          {chat.extrasDone}
        </button>
      </div>
    );
  }

  if (phase === "address") {
    return (
      <Chips>
        {p.addresses.map((a) => (
          <Chip key={a.id} onClick={() => p.onPickAddress(a)}>
            <MapPin className="mr-1 h-3.5 w-3.5 text-[var(--d-accent)]" strokeWidth={2.2} aria-hidden />
            <span className="font-semibold">{a.label}</span>
            <span className="ml-1.5 text-[var(--d-ink-soft)]">{a.detail}</span>
          </Chip>
        ))}
        <Chip
          onClick={() =>
            p.onPickAddress({ id: "new", label: chat.newAddress, detail: chat.newAddressDetail })
          }
        >
          <MapPin className="mr-1 h-3.5 w-3.5 text-[var(--d-accent)]" strokeWidth={2.2} aria-hidden />
          {chat.newAddress}
        </Chip>
      </Chips>
    );
  }

  if (phase === "payment") {
    return (
      <Chips>
        {p.payments.map((pay) => (
          <Chip key={pay.id} onClick={() => p.onPickPayment(pay)}>
            {pay.label}
          </Chip>
        ))}
      </Chips>
    );
  }

  // review
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <a
        href={p.waHref()}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[var(--d-accent)] px-5 py-2.5 text-[0.82rem] font-bold text-[#052014] transition-transform hover:scale-[1.03]"
      >
        <Send className="h-4 w-4" strokeWidth={2.2} aria-hidden />
        {chat.sendOrder}
      </a>
      <button
        type="button"
        onClick={p.onRestart}
        className="inline-flex items-center gap-2 rounded-full border border-[var(--d-line)] px-5 py-2.5 text-[0.82rem] font-semibold text-[var(--d-ink)] transition-colors hover:bg-[var(--d-panel)]"
      >
        <RotateCcw className="h-4 w-4" strokeWidth={2.2} aria-hidden />
        {chat.restart}
      </button>
    </div>
  );
}

function Chips({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-2">{children}</div>;
}

function Chip({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center rounded-full border border-[var(--d-line)] bg-[var(--d-panel)] px-3.5 py-2 text-[0.8rem] font-semibold text-[var(--d-ink)] transition-colors hover:border-[var(--d-accent)] hover:bg-[var(--d-panel-2)]"
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Order panel (live running summary)                                 */
/* ------------------------------------------------------------------ */

interface OrderPanelProps {
  chat: ChatContent;
  currency: Currency;
  item: MenuItem | null;
  chosenExtras: Extra[];
  address: SavedAddress | null;
  payment: PayOption | null;
  total: number;
  phase: Phase;
}

function OrderPanel(p: OrderPanelProps) {
  const { chat, currency } = p;
  const empty = !p.item;

  return (
    <aside className="flex flex-col rounded-3xl border border-[var(--d-line)] bg-[var(--d-panel)] p-5">
      <div className="flex items-center gap-2">
        <ShoppingBag className="h-4 w-4 text-[var(--d-accent)]" strokeWidth={2.2} aria-hidden />
        <h3 className="[font-family:var(--demo-display)] text-lg font-bold text-[var(--d-ink)]">
          {chat.panelTitle}
        </h3>
      </div>

      {empty ? (
        <p className="mt-6 rounded-2xl border border-dashed border-[var(--d-line)] px-4 py-8 text-center text-sm text-[var(--d-ink-soft)]">
          {chat.panelEmpty}
        </p>
      ) : (
        <div className="mt-5 flex-1 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[var(--d-ink-soft)]">
                {chat.labelItem}
              </p>
              <p className="mt-0.5 font-semibold text-[var(--d-ink)]">{p.item?.name}</p>
            </div>
            <span className="font-semibold text-[var(--d-ink)]">
              {formatMoney(p.item?.price ?? 0, currency)}
            </span>
          </div>

          <div>
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[var(--d-ink-soft)]">
              {chat.labelExtras}
            </p>
            {p.chosenExtras.length ? (
              <ul className="mt-1.5 space-y-1">
                {p.chosenExtras.map((e) => (
                  <li key={e.id} className="flex items-center justify-between text-sm text-[var(--d-ink)]">
                    <span>{e.name}</span>
                    <span className="text-[var(--d-ink-soft)]">{formatMoney(e.price, currency)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-0.5 text-sm text-[var(--d-ink-soft)]">{chat.labelExtrasNone}</p>
            )}
          </div>

          {p.address && (
            <div>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[var(--d-ink-soft)]">
                {chat.labelAddress}
              </p>
              <p className="mt-0.5 text-sm text-[var(--d-ink)]">
                {p.address.label} — {p.address.detail}
              </p>
            </div>
          )}

          {p.payment && (
            <div>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[var(--d-ink-soft)]">
                {chat.labelPayment}
              </p>
              <p className="mt-0.5 text-sm text-[var(--d-ink)]">{p.payment.label}</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between border-t border-[var(--d-line)] pt-4">
        <span className="text-sm font-bold text-[var(--d-ink)]">{chat.labelTotal}</span>
        <span className="[font-family:var(--demo-display)] text-2xl font-extrabold text-[var(--d-accent)]">
          {formatMoney(p.total, currency)}
        </span>
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* Menu grid (adds straight into the chat)                            */
/* ------------------------------------------------------------------ */

interface MenuGridProps {
  section: MenuSectionContent;
  items: MenuItem[];
  currency: Currency;
  onAdd: (it: MenuItem) => void;
}

function MenuGrid({ section, items, currency, onAdd }: MenuGridProps) {
  const [filter, setFilter] = useState<"all" | ItemKind>("all");
  const shown = filter === "all" ? items : items.filter((i) => i.kind === filter);

  return (
    <section id="menu" className="scroll-mt-20 border-t border-[var(--d-line)] px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <Eyebrow text={section.eyebrow} />
            <h2 className="mt-3 [font-family:var(--demo-display)] text-3xl font-extrabold tracking-tight text-[var(--d-ink)] sm:text-4xl">
              {section.title}
            </h2>
            <p className="mt-3 text-[var(--d-ink-soft)]">{section.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label={section.eyebrow}>
            {section.filters.map((f) => {
              const on = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setFilter(f.id)}
                  className={`rounded-full px-4 py-2 text-[0.78rem] font-semibold transition-colors ${
                    on
                      ? "bg-[var(--d-accent)] text-[#052014]"
                      : "border border-[var(--d-line)] text-[var(--d-ink-soft)] hover:text-[var(--d-ink)]"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((it, i) => (
            <motion.article
              key={it.id}
              layout
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: (i % 4) * 0.05 }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-[var(--d-line)] bg-[var(--d-panel)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={UNSPLASH(it.image, 640)}
                  alt={it.alt}
                  fill
                  sizes="(min-width:1024px) 22vw, (min-width:640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0B141A] via-[#0B141A]/10 to-transparent"
                  aria-hidden
                />
                {it.tag && (
                  <span className="absolute left-3 top-3 rounded-full bg-[var(--d-accent)] px-2.5 py-1 text-[0.62rem] font-bold text-[#052014]">
                    {it.tag}
                  </span>
                )}
                <span className="absolute bottom-3 right-3 rounded-full bg-black/55 px-2.5 py-1 text-[0.64rem] font-semibold text-white backdrop-blur-sm">
                  {etaLabel(15, i)} {section.etaLabel}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="[font-family:var(--demo-display)] text-base font-bold text-[var(--d-ink)]">
                    {it.name}
                  </h3>
                  <span className="shrink-0 font-bold text-[var(--d-accent)]">
                    {formatMoney(it.price, currency)}
                  </span>
                </div>
                <p className="mt-1.5 flex-1 text-[0.82rem] leading-relaxed text-[var(--d-ink-soft)]">
                  {it.description}
                </p>
                <button
                  type="button"
                  onClick={() => onAdd(it)}
                  className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full border border-[var(--d-accent)] px-4 py-2.5 text-[0.8rem] font-bold text-[var(--d-accent)] transition-colors hover:bg-[var(--d-accent)] hover:text-[#052014]"
                >
                  <Plus className="h-4 w-4" strokeWidth={2.4} aria-hidden />
                  {section.addLabel}
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
