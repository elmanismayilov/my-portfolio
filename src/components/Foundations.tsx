"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/provider";

const PALETTE = [
  { name: "Ink", hex: "#1C1C1C" },
  { name: "Lime", hex: "#D9FF66" },
  { name: "Lilac", hex: "#CFB5FB" },
  { name: "Mint", hex: "#B3FFC0" },
  { name: "Pink", hex: "#FFD6D6" },
  { name: "Light", hex: "#EEEEEE" },
];

const TYPE = [
  { label: "H1", size: 32, weight: 700 },
  { label: "H2", size: 28, weight: 700 },
  { label: "H3", size: 25, weight: 700 },
  { label: "Subtitle", size: 18, weight: 700 },
  { label: "Body", size: 16, weight: 700 },
  { label: "Caption", size: 12, weight: 400 },
  { label: "Overline", size: 10, weight: 400 },
];

/** Color palette and type scale of the Cashmate design system; both build themselves on scroll. */
export default function Foundations() {
  const { dict } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-14 md:space-y-20">
      <div>
        <h3 className="font-mono text-xs uppercase tracking-wide text-muted">{dict.foundations.color}</h3>
        <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {PALETTE.map((c, i) => (
            <li
              key={c.name}
              style={{
                opacity: on ? 1 : 0,
                transform: on ? "none" : "translateY(24px) scale(0.96)",
                transition: "opacity 600ms ease-out, transform 800ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                transitionDelay: `${i * 90}ms`,
              }}
            >
              <div className="aspect-[4/5] rounded-2xl ring-1 ring-white/15" style={{ background: c.hex }} />
              <p className="mt-3 text-lg font-medium">{c.name}</p>
              <p className="font-mono text-xs uppercase tracking-wide text-muted">{c.hex}</p>
              <p className="mt-1 text-sm text-muted">{dict.foundations.roles[i]}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-mono text-xs uppercase tracking-wide text-muted">{dict.foundations.typography}</h3>
        <ul className="mt-4">
          {TYPE.map((t, i) => (
            <li
              key={t.label}
              className="flex items-baseline justify-between gap-6 border-t border-line py-3"
              style={{
                opacity: on ? 1 : 0,
                transform: on ? "none" : "translateX(-18px)",
                transition: "opacity 600ms ease-out, transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: `${300 + i * 110}ms`,
              }}
            >
              <span style={{ fontSize: t.size, fontWeight: t.weight, lineHeight: 1.15 }}>{t.label} — {dict.foundations.sample}</span>
              <span className="shrink-0 font-mono text-xs uppercase tracking-wide text-muted">{dict.foundations.specs[i]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
