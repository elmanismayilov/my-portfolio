"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/provider";

const LIME = "#d9ff66";
const LILAC = "#cfb5fb";
const INK = "#1c1c1c";

const ROWS = [
  ["+", "7", "8", "9"],
  ["-", "4", "5", "6"],
  ["x", "1", "2", "3"],
  ["÷", "0", ".", "="],
];

const START = { balance: 650, expense: 350, card: 400 };
const SPENT = 100;
const fmt = (n: number) => `${Math.round(n)},00₼`;

/**
 * A tiny scripted walk through the core action of the app: type an amount on the calculator-style keypad,
 * save, and watch the home screen update. Plays once when it scrolls into view; replay on demand.
 */
export default function CashmateDemo() {
  const { dict } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const [run, setRun] = useState(0); // bumps on every (re)play
  const [typed, setTyped] = useState("");
  const [pressed, setPressed] = useState<string | null>(null);
  const [screen, setScreen] = useState<"add" | "home">("add");
  const [p, setP] = useState(0); // 0 → 1: how far the numbers have moved
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          setRun(1);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!run) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    let raf = 0;
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    // reset to the start state through a timer, so no state is set synchronously in the effect
    at(0, () => {
      setTyped("");
      setPressed(null);
      setScreen("add");
      setP(0);
      setDone(false);
    });

    if (reduced) {
      at(10, () => {
        setTyped("100");
        setScreen("home");
        setP(1);
        setDone(true);
      });
    } else {
      const press = (key: string, ms: number, then: () => void) => {
        at(ms, () => {
          setPressed(key);
          then();
        });
        at(ms + 220, () => setPressed(null));
      };
      press("1", 900, () => setTyped("1"));
      press("0", 1400, () => setTyped("10"));
      press("0", 1900, () => setTyped("100"));
      press("SAVE", 2700, () => {});
      at(3200, () => {
        setScreen("home");
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / 1100, 1);
          setP(1 - Math.pow(1 - t, 3));
          if (t < 1) raf = requestAnimationFrame(tick);
          else setDone(true);
        };
        raf = requestAnimationFrame(tick);
      });
    }
    return () => {
      timers.forEach(window.clearTimeout);
      cancelAnimationFrame(raf);
    };
  }, [run]);

  const replay = useCallback(() => setRun((r) => r + 1), []);

  const key = (label: string, wide = false) => (
    <span
      key={label}
      className="grid h-[34px] place-items-center rounded-lg text-[15px] font-medium transition-all duration-150"
      style={{
        background: pressed === label ? LIME : "#eeeeee",
        color: INK,
        transform: pressed === label ? "scale(0.92)" : "none",
        gridColumn: wide ? "span 2" : undefined,
      }}
    >
      {label}
    </span>
  );

  return (
    <div ref={ref} className="grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-14">
      <div
        role="img"
        aria-label={dict.cashmate.aria}
        className="mx-auto w-full max-w-[320px] rounded-[38px] p-2.5 shadow-2xl ring-1 ring-white/15"
        style={{ background: "#0a0a0a", opacity: seen ? 1 : 0, transition: "opacity 700ms ease-out" }}
      >
        <div className="relative h-[560px] overflow-hidden rounded-[30px]" style={{ background: INK }}>
          {/* ---- add screen ---- */}
          <div
            aria-hidden
            className="absolute inset-0 px-4 pt-6 pb-4 text-white"
            style={{
              transform: screen === "add" ? "none" : "translateX(-100%)",
              transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <div className="flex items-center justify-between text-[11px] font-semibold">
              <span>9:41</span>
              <span>▂▄▆ ◔</span>
            </div>
            <div className="mt-4 flex justify-around text-[13px]">
              <span>Income</span>
              <span className="font-semibold" style={{ color: LIME }}>
                ● Expense
              </span>
              <span>Transfer</span>
            </div>
            <div className="mt-3 space-y-1.5 text-center text-[11px] font-semibold" style={{ color: INK }}>
              <div className="rounded-md py-1.5" style={{ background: LILAC }}>
                ACCOUNT ⌄
              </div>
              <div className="rounded-md py-1.5" style={{ background: LIME }}>
                CATEGORY ⌄
              </div>
              <div className="rounded-md py-1.5" style={{ background: LIME }}>
                SUBCATEGORY ⌄
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="rounded-md bg-[#eeeeee] py-1.5">Nov 4, 2023 ⌄</div>
                <div className="rounded-md bg-[#eeeeee] py-1.5">1:34 pm ⌄</div>
              </div>
            </div>
            <div className="mt-2 rounded-md bg-[#eeeeee] px-2 py-1.5 text-[11px]" style={{ color: "#6b7280" }}>
              Notes…
            </div>
            <div
              className="mt-2 flex h-11 items-center justify-end rounded-lg bg-[#eeeeee] px-3 text-[26px] font-medium tabular-nums"
              style={{ color: INK }}
            >
              {typed || "0"}
            </div>
            <div className="mt-2 grid grid-cols-4 gap-1.5">{ROWS.flat().map((k) => key(k))}</div>
            <div className="mt-2 grid grid-cols-2 gap-1.5 text-center text-[12px] font-semibold">
              <span className="rounded-lg border border-white/30 py-2.5">CANCEL</span>
              <span
                className="rounded-lg py-2.5 transition-all duration-150"
                style={{
                  background: LIME,
                  color: INK,
                  transform: pressed === "SAVE" ? "scale(0.94)" : "none",
                  boxShadow: pressed === "SAVE" ? `0 0 0 4px ${LIME}55` : "none",
                }}
              >
                SAVE
              </span>
            </div>
          </div>

          {/* ---- home screen ---- */}
          <div
            aria-hidden
            className="absolute inset-0 px-4 pt-6 pb-4 text-white"
            style={{
              transform: screen === "home" ? "none" : "translateX(100%)",
              transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <div className="flex items-center justify-between text-[11px] font-semibold">
              <span>9:41</span>
              <span>▂▄▆ ◔</span>
            </div>
            <p className="mt-5 text-[17px] font-semibold">Hi Elman,</p>
            <p className="text-[13px]" style={{ color: LIME }}>
              Let’s master your finances!
            </p>
            <div className="mt-4 rounded-md bg-[#eeeeee] py-1.5 text-center text-[11px] font-medium" style={{ color: INK }}>
              ‹ November, 2023 ›
            </div>
            <div className="mt-3 rounded-xl px-4 pt-3 pb-4" style={{ background: LIME, color: INK }}>
              <p className="text-[11px]">Total Balance</p>
              <p className="mt-1 text-[34px] leading-none font-semibold tabular-nums">
                {fmt(START.balance - SPENT * p)}
              </p>
            </div>
            <div className="mt-px grid grid-cols-2 rounded-b-xl bg-[#262626] px-4 py-3 text-[11px]">
              <div>
                <p className="text-white/70">Expense so far</p>
                <p className="mt-0.5 text-[15px] font-semibold tabular-nums">{fmt(START.expense + SPENT * p)}</p>
              </div>
              <div>
                <p className="text-white/70">Income so far</p>
                <p className="mt-0.5 text-[15px] font-semibold tabular-nums">1000,00₼</p>
              </div>
            </div>
            <p className="mt-4 text-[13px] font-semibold">Accounts</p>
            <div className="mt-2 space-y-1.5 text-[12px]" style={{ color: INK }}>
              <div className="flex justify-between rounded-lg bg-[#eeeeee] px-3 py-2.5">
                <span>Card</span>
                <span className="font-semibold tabular-nums">{Math.round(START.card - SPENT * p)}₼</span>
              </div>
              <div className="flex justify-between rounded-lg bg-[#eeeeee] px-3 py-2.5">
                <span>Cash</span>
                <span className="font-semibold">200₼</span>
              </div>
              <div className="flex justify-between rounded-lg bg-[#eeeeee] px-3 py-2.5">
                <span>Savings</span>
                <span className="font-semibold">50₼</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="font-mono text-xs uppercase tracking-wide text-muted">{dict.cashmate.kicker}</p>
        <h3 className="mt-3 text-3xl leading-[1.1] font-medium tracking-tight md:text-4xl">
          {dict.cashmate.heading}
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-muted md:text-xl">
          {dict.cashmate.body}
        </p>
        <button
          type="button"
          onClick={replay}
          disabled={!seen}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-wide transition-colors hover:border-foreground disabled:opacity-40"
          style={{ opacity: done ? 1 : 0.5 }}
        >
          <span aria-hidden>↻</span> {dict.cashmate.replay}
        </button>
      </div>
    </div>
  );
}
