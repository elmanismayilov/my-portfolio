"use client";

import { useEffect, useRef, useState } from "react";
import { fill, useI18n } from "@/lib/i18n/provider";

// Q3 2025: share of payout requests that moved to the app, % per month (month names: dictionary impact.months)
const VALUES = [12, 22, 30];
const MAX = 35;
const TICKS = [0, 10, 20, 30, 35];

const W = 640;
const H = 320;
const PLOT = { left: 64, right: 616, top: 16, bottom: 284 };
const xs = [96, 340, 584];
const yOf = (v: number) => PLOT.top + (1 - v / MAX) * (PLOT.bottom - PLOT.top);

const LINE = "#8cc8ff";
const GREEN = "#3ddc84";
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function useCountUp(target: number, active: boolean, ms = 1100) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) {
      setV(0);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setV(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / ms, 1);
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, ms]);
  return v;
}

/**
 * Impact dashboard rebuilt as live UI: numbers count up, the line draws itself, points pop in.
 * Plays when scrolled into view; switching the tab replays it.
 */
export default function ImpactChart() {
  const { dict } = useI18n();
  const DATA = VALUES.map((value, i) => ({ month: dict.impact.months[i], value }));
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const [tab, setTab] = useState<"trend" | "share">("trend");
  const [on, setOn] = useState(false); // drives every transition: false = start state, true = end state

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // (re)start the animation: reset for one frame, then switch on
  useEffect(() => {
    if (!seen) return;
    setOn(false);
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)));
    return () => cancelAnimationFrame(id);
  }, [seen, tab]);

  const peak = useCountUp(30, on);
  const growth = useCountUp(18, on);
  const app = useCountUp(30, on);
  const offline = useCountUp(70, on);

  const line = DATA.map((d, i) => `${i ? "L" : "M"}${xs[i]} ${yOf(d.value)}`).join(" ");
  const area = `${line} L${xs[2]} ${PLOT.bottom} L${xs[0]} ${PLOT.bottom} Z`;
  const R = 78;
  const C = 2 * Math.PI * R;

  return (
    <div ref={ref} className="bg-surface p-4 md:p-8">
      {/* header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-medium tracking-tight md:text-3xl">{dict.impact.title}</h3>
          <p className="mt-1 text-sm text-muted">{dict.impact.sub}</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm">
          <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: GREEN }} />
          {dict.impact.launchBadge}
        </span>
      </div>

      {/* stats */}
      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
        <div className="rounded-3xl bg-background p-5 md:p-6">
          <p className="text-sm text-muted">{dict.impact.peak}</p>
          <p className="mt-2 flex flex-wrap items-baseline gap-x-4">
            <span className="text-5xl font-medium tracking-tight tabular-nums md:text-6xl">{peak}%</span>
            <span className="text-sm tabular-nums" style={{ color: GREEN }}>
              {fill(dict.impact.sinceJuly, { n: growth })}
            </span>
          </p>
        </div>
        <div className="rounded-3xl bg-background p-5 md:p-6">
          <p className="text-sm text-muted">{dict.impact.split}</p>
          <p className="mt-2 flex flex-wrap items-baseline gap-x-4">
            <span className="text-5xl font-medium tracking-tight tabular-nums md:text-6xl">
              {app} / {offline}
            </span>
            <span className="text-sm text-muted">{dict.impact.appVsOffline}</span>
          </p>
        </div>
      </div>

      {/* chart card */}
      <div className="mt-3 rounded-3xl bg-background p-5 md:mt-4 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h4 className="text-xl font-medium tracking-tight md:text-2xl">{dict.impact.chartTitle}</h4>
          <div role="tablist" className="flex rounded-full bg-surface p-1 text-sm">
            {(
              [
                ["trend", dict.impact.tabTrend],
                ["share", dict.impact.tabShare],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={`rounded-full px-4 py-2 transition-colors duration-300 ${
                  tab === id ? "bg-background text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 md:mt-8">
          {tab === "trend" ? (
            <svg
              viewBox={`0 0 ${W} ${H}`}
              role="img"
              aria-label={dict.impact.lineAria}
              className="h-auto w-full"
            >
              {/* grid */}
              {TICKS.map((t) => (
                <g key={t}>
                  <line x1={PLOT.left} x2={PLOT.right} y1={yOf(t)} y2={yOf(t)} stroke="var(--line)" strokeWidth="1" />
                  <text x={PLOT.left - 12} y={yOf(t) + 4} textAnchor="end" fontSize="12" className="fill-muted font-mono">
                    {t}%
                  </text>
                </g>
              ))}

              {/* launch marker: the feature went live in July */}
              <g
                style={{
                  opacity: on ? 1 : 0,
                  transition: "opacity 0.6s ease 0.1s",
                }}
              >
                <line
                  x1={xs[0]}
                  x2={xs[0]}
                  y1={PLOT.top}
                  y2={PLOT.bottom}
                  stroke={GREEN}
                  strokeWidth="2"
                  strokeDasharray="5 5"
                />
                <rect x={xs[0] + 8} y={PLOT.top + 2} width="118" height="24" rx="12" fill={GREEN} fillOpacity="0.16" />
                <text x={xs[0] + 20} y={PLOT.top + 18} fontSize="12" fontWeight="600" fill={GREEN}>
                  {dict.impact.launchLabel}
                </text>
              </g>

              {/* area */}
              <path
                d={area}
                fill={LINE}
                fillOpacity="0.14"
                style={{
                  clipPath: on ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
                  transition: `clip-path 1.1s ${EASE}`,
                }}
              />
              {/* line */}
              <path
                d={line}
                fill="none"
                stroke={LINE}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                strokeDasharray="1"
                style={{
                  strokeDashoffset: on ? 0 : 1,
                  transition: `stroke-dashoffset 1.1s ${EASE}`,
                }}
              />
              {/* points + values + months */}
              {DATA.map((d, i) => {
                const delay = 0.15 + i * 0.45;
                return (
                  <g key={d.month}>
                    <circle
                      cx={xs[i]}
                      cy={yOf(d.value)}
                      r="8"
                      fill="var(--background)"
                      stroke={LINE}
                      strokeWidth="3.5"
                      style={{
                        transformBox: "fill-box",
                        transformOrigin: "center",
                        transform: on ? "scale(1)" : "scale(0)",
                        transition: `transform 0.5s ${EASE} ${delay}s`,
                      }}
                    />
                    <text
                      x={xs[i]}
                      y={yOf(d.value) - 18}
                      textAnchor="middle"
                      fontSize="14"
                      fontWeight="600"
                      className="fill-foreground"
                      style={{
                        opacity: on ? 1 : 0,
                        transition: `opacity 0.4s ease ${delay + 0.2}s`,
                      }}
                    >
                      {d.value}%
                    </text>
                    <text x={xs[i]} y={H - 8} textAnchor="middle" fontSize="13" className="fill-muted font-mono">
                      {d.month}
                    </text>
                  </g>
                );
              })}
            </svg>
          ) : (
            <div className="flex flex-col items-center justify-center gap-8 py-4 md:flex-row md:gap-16">
              <svg viewBox="0 0 200 200" role="img" aria-label={dict.impact.donutAria} className="h-auto w-56 md:w-64">
                <g transform="rotate(-90 100 100)">
                  <circle cx="100" cy="100" r={R} fill="none" stroke="var(--line)" strokeWidth="18" />
                  <circle
                    cx="100"
                    cy="100"
                    r={R}
                    fill="none"
                    stroke={LINE}
                    strokeWidth="18"
                    strokeLinecap="round"
                    strokeDasharray={C}
                    style={{
                      strokeDashoffset: on ? C * 0.7 : C,
                      transition: `stroke-dashoffset 1.1s ${EASE}`,
                    }}
                  />
                </g>
                <text x="100" y="104" textAnchor="middle" fontSize="38" fontWeight="500" className="fill-foreground">
                  {app}%
                </text>
                <text x="100" y="126" textAnchor="middle" fontSize="11" className="fill-muted">
                  {dict.impact.inApp}
                </text>
              </svg>
              <ul className="space-y-4 text-lg">
                <li className="flex items-center gap-3">
                  <span aria-hidden className="h-3 w-3 rounded-full" style={{ background: LINE }} />
                  <span className="tabular-nums">{app}%</span>
                  <span className="text-muted">{dict.impact.appDigital}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden className="h-3 w-3 rounded-full bg-line" />
                  <span className="tabular-nums">{offline}%</span>
                  <span className="text-muted">{dict.impact.offline}</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
