"use client";

import { useEffect, useRef, useState } from "react";
import { fill, useI18n } from "@/lib/i18n/provider";

const COUNT_MS = 1400;
const STAGGER_MS = 120;

/**
 * Per-product active users. When the list scrolls into view the rows slide in one after another,
 * and each number counts up.
 */
export default function SummaryResults({ results }: { results: { name: string; users: number }[] }) {
  const { dict, number } = useI18n();
  const ref = useRef<HTMLUListElement>(null);
  const [shown, setShown] = useState(false);
  const [p, setP] = useState(0); // count-up progress 0 → 1, eased

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setShown(true);
        if (reduced) {
          setP(1);
          return;
        }
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / COUNT_MS, 1);
          setP(1 - Math.pow(1 - t, 3));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <ul ref={ref} className="mt-6">
      {results.map((r, i) => (
        <li
          key={r.name}
          className="relative flex items-baseline justify-between gap-4 py-3 text-lg md:text-xl"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : "translateY(12px)",
            transition: "opacity 600ms ease-out, transform 600ms ease-out",
            transitionDelay: `${i * STAGGER_MS}ms`,
          }}
        >
          <span>{r.name}</span>
          <span
            aria-label={fill(dict.users.ariaUsers, { n: number(r.users) })}
            className="font-mono text-sm uppercase tracking-wide text-muted"
          >
            <span aria-hidden>
              <span className="tabular-nums text-foreground">
                {number(Math.round(r.users * p))}
              </span>{" "}
              {dict.users.activeUsers}
            </span>
          </span>
          <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-line" />
        </li>
      ))}
    </ul>
  );
}
