"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/provider";

export type Decision = {
  question: string;
  options: { name: string; note: string; chosen?: boolean }[];
};

/** Design decisions as option cards: the chosen one lights up after the others settle back. */
export default function DecisionTable({ decisions }: { decisions: Decision[] }) {
  return (
    <div className="space-y-10 md:space-y-14">
      {decisions.map((d, i) => (
        <DecisionRow key={d.question} decision={d} index={i} />
      ))}
    </div>
  );
}

function DecisionRow({ decision, index }: { decision: Decision; index: number }) {
  const { dict } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const [picked, setPicked] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let t = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setSeen(true);
        t = window.setTimeout(() => setPicked(true), 1100);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div ref={ref}>
      <p className="font-mono text-xs uppercase tracking-wide text-muted">
        <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span> · {decision.question}
      </p>
      <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        {decision.options.map((o, k) => {
          const win = picked && o.chosen;
          const lose = picked && !o.chosen;
          return (
            <li
              key={o.name}
              className={`relative rounded-2xl border p-5 md:p-6 ${
                win ? "border-foreground bg-surface" : "border-line"
              }`}
              style={{
                opacity: !seen ? 0 : lose ? 0.45 : 1,
                transform: !seen ? "translateY(20px)" : win ? "translateY(-4px)" : "none",
                transition:
                  "opacity 600ms ease-out, transform 700ms cubic-bezier(0.22, 1, 0.36, 1), border-color 400ms, background-color 400ms",
                transitionDelay: !picked ? `${k * 120}ms` : "0ms",
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-lg font-medium tracking-tight md:text-xl">{o.name}</h4>
                {o.chosen && (
                  <span
                    className="rounded-full bg-foreground px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-background"
                    style={{
                      opacity: win ? 1 : 0,
                      transform: win ? "none" : "scale(0.8)",
                      transition: "opacity 400ms ease-out 200ms, transform 500ms cubic-bezier(0.34,1.56,0.64,1) 200ms",
                    }}
                  >
                    {dict.decision.chosen}
                  </span>
                )}
              </div>
              <p className="mt-2 text-base leading-relaxed text-muted">{o.note}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
