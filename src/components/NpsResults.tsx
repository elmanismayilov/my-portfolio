"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/provider";

/** NPS result without exact scores: one headline (+20%), a qualitative before/after table and one decision made from the new "why" field. */
export default function NpsResults() {
  const { dict } = useI18n();
  const { rows } = dict.nps;
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

  const grid = "grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]";

  return (
    <div ref={ref} className="space-y-3 md:space-y-4">
      {/* headline */}
      <div className="rounded-3xl bg-surface p-5 md:p-8">
        <p className="font-mono text-xs uppercase tracking-wide text-muted">{dict.nps.heroLabel}</p>
        <p
          className="mt-3 text-[22vw] leading-none font-semibold tracking-[-0.05em] md:text-[12vw] 2xl:text-[180px]"
          style={{
            color: "#3ddc84",
            opacity: on ? 1 : 0,
            transform: on ? "none" : "translateY(16px)",
            transition: "opacity 700ms ease-out, transform 800ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {dict.nps.heroValue}
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">{dict.nps.heroText}</p>
      </div>

      {/* before / after, in words */}
      <div className="rounded-3xl bg-surface p-5 md:p-8">
        <h3 className="text-xl font-medium tracking-tight md:text-2xl">{dict.nps.tableTitle}</h3>
        <div className={`mt-4 grid ${grid} gap-x-4 font-mono text-xs uppercase tracking-wide text-muted`}>
          <span>{dict.nps.metric}</span>
          <span>{dict.nps.before}</span>
          <span>{dict.nps.after}</span>
        </div>
        <ul>
          {rows.map((r, i) => (
            <li
              key={r.metric}
              className={`mt-3 grid ${grid} items-baseline gap-x-4 border-t border-line pt-3`}
              style={{
                opacity: on ? 1 : 0,
                transform: on ? "none" : "translateY(14px)",
                transition: "opacity 600ms ease-out, transform 700ms cubic-bezier(0.22,1,0.36,1)",
                transitionDelay: `${400 + i * 140}ms`,
              }}
            >
              <span className="text-base md:text-lg">{r.metric}</span>
              <span className="text-base text-muted md:text-lg">{r.before}</span>
              <span className="text-base font-semibold md:text-lg">{r.after}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* one decision made from the data */}
      <div
        className="rounded-3xl border border-line p-5 md:p-8"
        style={{ opacity: on ? 1 : 0, transition: "opacity 700ms ease-out 900ms" }}
      >
        <p className="font-mono text-xs uppercase tracking-wide text-muted">{dict.nps.decisionLabel}</p>
        <p className="mt-4 text-2xl leading-snug font-medium tracking-tight md:text-3xl">{dict.nps.reason}</p>
        <p className="mt-3 text-base leading-relaxed text-muted md:text-lg">{dict.nps.reasonText}</p>
      </div>
    </div>
  );
}
