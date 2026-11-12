"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/provider";

const BLUE = "#8cc8ff";

/**
 * What is still offline and how we plan to bring it in. A split bar fills to the current share,
 * then the offline part starts to pulse; the ideas rise one after another.
 */
export default function NextSteps({
  share,
  ideas,
}: {
  share: { app: number; offline: number };
  ideas: { title: string; text: string }[];
}) {
  const { dict } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setOn(true);
        if (reduced) {
          setN(share.app);
          return;
        }
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / 1400, 1);
          setN(Math.round(share.app * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [share.app]);

  return (
    <div ref={ref}>
      {/* split bar */}
      <div className="flex items-baseline justify-between font-mono text-xs uppercase tracking-wide">
        <span>
          <span className="tabular-nums">{n}%</span> <span className="text-muted">{dict.nextSteps.inApp}</span>
        </span>
        <span>
          <span className="tabular-nums">{share.offline}%</span> <span className="text-muted">{dict.nextSteps.stillOffline}</span>
        </span>
      </div>
      <div className="relative mt-3 flex h-14 overflow-hidden rounded-2xl bg-surface md:h-16">
        <div
          className="h-full"
          style={{
            width: on ? `${share.app}%` : "0%",
            background: BLUE,
            transition: "width 1400ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
        <div
          className="nextsteps-offline relative flex flex-1 items-center justify-center px-4 text-center font-mono text-xs uppercase tracking-wide text-muted"
          style={{ opacity: on ? 1 : 0, transition: "opacity 800ms ease-out 1000ms" }}
        >
          {dict.nextSteps.opportunity}
        </div>
      </div>

      {/* ideas */}
      <ul className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
        {ideas.map((idea, i) => (
          <li
            key={idea.title}
            className="rounded-2xl border border-line bg-surface p-6 md:p-7"
            style={{
              opacity: on ? 1 : 0,
              transform: on ? "none" : "translateY(24px)",
              transition: "opacity 700ms ease-out, transform 800ms cubic-bezier(0.22, 1, 0.36, 1)",
              transitionDelay: `${1200 + i * 150}ms`,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-muted">
                {dict.nextSteps.planned}
              </span>
            </div>
            <h4 className="mt-6 text-xl font-medium tracking-tight md:text-2xl">{idea.title}</h4>
            <p className="mt-2 text-base leading-relaxed text-muted md:text-lg">{idea.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
