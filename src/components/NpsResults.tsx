"use client";

import { useEffect, useRef, useState } from "react";

/* ---------- ILLUSTRATIVE DATA — replace with the real numbers ---------- */
const MONTHS = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const NPS = [41, 40, 41, 44, 48, 51];
const LAUNCH_INDEX = 3; // October 2025
const TABLE = [
  { metric: "NPS", before: "41", after: "51", delta: "+10 pts · ≈ +25%" },
  { metric: "Response rate", before: "22%", after: "12%", delta: "fewer, but honest answers" },
  { metric: "Low scores with a reason", before: "—", after: "38%", delta: "new field" },
  { metric: "Low scores later called a mistake", before: "Common", after: "Rare", delta: "per CX calls" },
];
const EXAMPLE = {
  reason: "“I don't fully know the product yet”",
  text: "It topped the reasons behind low scores, so the team moved the video tutorial onto the dashboard for new customers instead of hiding it in the menu.",
};
/* ------------------------------------------------------------------- */

const W = 640;
const H = 280;
const PLOT = { left: 56, right: 616, top: 24, bottom: 244 };
const MIN = 30;
const MAX = 55;
const LINE = "#8cc8ff";
const GREEN = "#3ddc84";
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const xOf = (i: number) => PLOT.left + 32 + (i * (PLOT.right - PLOT.left - 64)) / (MONTHS.length - 1);
const yOf = (v: number) => PLOT.top + (1 - (v - MIN) / (MAX - MIN)) * (PLOT.bottom - PLOT.top);

/** NPS by month with the launch marked, a before/after table and one decision made from the new "why" field. */
export default function NpsResults() {
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

  const line = NPS.map((v, i) => `${i ? "L" : "M"}${xOf(i)} ${yOf(v)}`).join(" ");

  return (
    <div ref={ref} className="space-y-3 md:space-y-4">
      {/* chart */}
      <div className="rounded-3xl bg-surface p-5 md:p-8">
        <h3 className="text-xl font-medium tracking-tight md:text-2xl">NPS by month</h3>
        <p className="mt-1 text-sm text-muted">Jul – Dec 2025 · survey redesign launched in October</p>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="Line chart of monthly NPS: 41, 40, 41 before the October launch, then 44, 48 and 51 after it"
          className="mt-6 h-auto w-full"
        >
          {[30, 40, 50].map((t) => (
            <g key={t}>
              <line x1={PLOT.left} x2={PLOT.right} y1={yOf(t)} y2={yOf(t)} stroke="var(--line)" />
              <text x={PLOT.left - 12} y={yOf(t) + 4} textAnchor="end" fontSize="12" className="fill-muted font-mono">
                {t}
              </text>
            </g>
          ))}

          {/* launch marker */}
          <g style={{ opacity: on ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}>
            <line
              x1={xOf(LAUNCH_INDEX)}
              x2={xOf(LAUNCH_INDEX)}
              y1={PLOT.top - 8}
              y2={PLOT.bottom}
              stroke={GREEN}
              strokeWidth="2"
              strokeDasharray="5 5"
            />
            <rect x={xOf(LAUNCH_INDEX) + 8} y={PLOT.top - 6} width="112" height="24" rx="12" fill={GREEN} fillOpacity="0.16" />
            <text x={xOf(LAUNCH_INDEX) + 20} y={PLOT.top + 10} fontSize="12" fontWeight="600" fill={GREEN}>
              Launch · Oct 2025
            </text>
          </g>

          <path
            d={line}
            fill="none"
            stroke={LINE}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1"
            style={{ strokeDashoffset: on ? 0 : 1, transition: `stroke-dashoffset 1.6s ${EASE} 0.2s` }}
          />
          {NPS.map((v, i) => {
            const delay = 0.2 + (i / (NPS.length - 1)) * 1.4;
            return (
              <g key={MONTHS[i]}>
                <circle
                  cx={xOf(i)}
                  cy={yOf(v)}
                  r="7"
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
                  x={xOf(i)}
                  y={yOf(v) - 16}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="600"
                  className="fill-foreground"
                  style={{ opacity: on ? 1 : 0, transition: `opacity 0.4s ease ${delay + 0.2}s` }}
                >
                  {v}
                </text>
                <text x={xOf(i)} y={H - 10} textAnchor="middle" fontSize="13" className="fill-muted font-mono">
                  {MONTHS[i]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* before / after table */}
      <div className="rounded-3xl bg-surface p-5 md:p-8">
        <h3 className="text-xl font-medium tracking-tight md:text-2xl">Before / after</h3>
        <div className="mt-4 grid grid-cols-[minmax(0,1.6fr)_minmax(0,0.7fr)_minmax(0,0.7fr)] gap-x-4 font-mono text-xs uppercase tracking-wide text-muted md:grid-cols-[minmax(0,2fr)_minmax(0,0.7fr)_minmax(0,0.7fr)_minmax(0,1.4fr)]">
          <span>Metric</span>
          <span>Before</span>
          <span>After</span>
          <span className="hidden md:block">Change</span>
        </div>
        <ul>
          {TABLE.map((r, i) => (
            <li
              key={r.metric}
              className="mt-3 grid grid-cols-[minmax(0,1.6fr)_minmax(0,0.7fr)_minmax(0,0.7fr)] items-baseline gap-x-4 border-t border-line pt-3 md:grid-cols-[minmax(0,2fr)_minmax(0,0.7fr)_minmax(0,0.7fr)_minmax(0,1.4fr)]"
              style={{
                opacity: on ? 1 : 0,
                transform: on ? "none" : "translateY(14px)",
                transition: "opacity 600ms ease-out, transform 700ms cubic-bezier(0.22,1,0.36,1)",
                transitionDelay: `${1400 + i * 140}ms`,
              }}
            >
              <span className="text-base md:text-lg">{r.metric}</span>
              <span className="text-lg text-muted tabular-nums md:text-xl">{r.before}</span>
              <span className="text-lg font-semibold tabular-nums md:text-xl">{r.after}</span>
              <span className="col-span-3 mt-1 text-sm text-muted md:col-span-1 md:mt-0">{r.delta}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* one decision made from the data */}
      <div
        className="rounded-3xl border border-line p-5 md:p-8"
        style={{
          opacity: on ? 1 : 0,
          transition: "opacity 700ms ease-out 2000ms",
        }}
      >
        <p className="font-mono text-xs uppercase tracking-wide text-muted">A decision made from the new “why” field</p>
        <p className="mt-4 text-2xl leading-snug font-medium tracking-tight md:text-3xl">{EXAMPLE.reason}</p>
        <p className="mt-3 text-base leading-relaxed text-muted md:text-lg">{EXAMPLE.text}</p>
      </div>

      <p className="font-mono text-xs uppercase tracking-wide text-muted">
        Illustrative data — shape of the result, not final figures.
      </p>
    </div>
  );
}
