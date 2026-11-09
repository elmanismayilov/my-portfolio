"use client";

import { useEffect, useRef, useState } from "react";

const COUNT_MS = 1600;
const STAGGER_MS = 140;

const ease = (p: number) => 1 - Math.pow(1 - p, 3);
const fmt = (n: number) => n.toLocaleString("en-US");

/**
 * Active users brought in from the other products. A big total counts up first, then the product
 * tiles rise one after another, each with its own count-up. The biggest product is inverted.
 */
export default function UsersByProduct({
  results,
  asOf,
  totalLabel,
}: {
  results: { name: string; users: number }[];
  asOf: string;
  totalLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(-1); // ms since the block came into view; -1 = not yet
  const sorted = [...results].sort((a, b) => b.users - a.users);
  const total = sorted.reduce((s, r) => s + r.users, 0);
  const end = COUNT_MS + STAGGER_MS * sorted.length + 800;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (reduced) {
          setT(end);
          return;
        }
        const start = performance.now();
        const tick = (now: number) => {
          const el = now - start;
          setT(Math.min(el, end));
          if (el < end) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end]);

  const started = t >= 0;
  const totalP = ease(Math.min(Math.max(t, 0) / COUNT_MS, 1));

  return (
    <div ref={ref}>
      {/* total */}
      <div className="border-t border-line pt-10">
        <p
          aria-label={`${fmt(total)} ${totalLabel}`}
          className="text-7xl leading-none font-black tracking-tighter tabular-nums sm:text-8xl md:text-9xl"
        >
          <span aria-hidden>{fmt(Math.round(total * totalP))}</span>
        </p>
        <p className="mt-4 font-mono text-xs uppercase tracking-wide text-muted">{totalLabel}</p>
      </div>

      {/* per product */}
      <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((r, i) => {
          const tileStart = 500 + i * STAGGER_MS;
          const shown = t >= tileStart;
          const p = ease(Math.min(Math.max(t - tileStart, 0) / COUNT_MS, 1));
          const leader = i === 0;
          return (
            <li
              key={r.name}
              className={`group relative overflow-hidden rounded-2xl p-6 transition-colors duration-300 md:p-7 ${
                leader
                  ? "bg-foreground text-background"
                  : "border border-line bg-surface hover:border-foreground/40"
              }`}
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "none" : "translateY(28px) scale(0.97)",
                transition:
                  "opacity 700ms ease-out, transform 800ms cubic-bezier(0.22, 1, 0.36, 1), background-color 300ms, border-color 300ms",
              }}
            >
              {/* light sweep when the tile appears */}
              {started && shown && (
                <span
                  aria-hidden
                  className="usersweep pointer-events-none absolute inset-y-0 -left-1/3 w-1/3"
                  style={{ ["--sweep" as string]: leader ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.10)" }}
                />
              )}
              <div className="flex items-start justify-between gap-4">
                <p className={`font-mono text-xs uppercase tracking-wide ${leader ? "opacity-70" : "text-muted"}`}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="text-right text-lg leading-tight font-medium md:text-xl">{r.name}</p>
              </div>
              <p
                aria-label={`${fmt(r.users)} active users`}
                className="mt-10 text-6xl leading-none font-black tracking-tighter tabular-nums md:text-7xl"
              >
                <span aria-hidden>{fmt(Math.round(r.users * p))}</span>
              </p>
              <p className={`mt-3 font-mono text-xs uppercase tracking-wide ${leader ? "opacity-70" : "text-muted"}`}>
                active users
              </p>
            </li>
          );
        })}
      </ul>

      <p
        className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-muted"
        style={{ opacity: t >= end ? 1 : 0, transition: "opacity 700ms ease-out" }}
      >
        <span aria-hidden className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25d4c3] opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25d4c3]" />
        </span>
        {asOf}
      </p>
    </div>
  );
}
