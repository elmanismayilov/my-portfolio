"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useI18n } from "@/lib/i18n/provider";

const VIOLET = "#5d5dff";
const ORANGE = "#f9a737";
const RED = "#e54b63";
const GREEN = "#1a978a";
const GREY = "#898e99";
const INK = "#0d0c12";

type Dot = "done" | "alert" | "error" | "pending" | "paid";
type Step = { dot: Dot; title: string; sub?: string; action?: string };

type State = {
  id: "locked" | "rejected" | "document" | "paid"; // the tab label and the note come from the dictionary (edge.states)
  body: { kind: "locked" } | { kind: "timeline"; steps: Step[] };
  button: { label: string; style: "primary" | "disabled" | "secondary" };
};

// Interface text is in Azerbaijani, like the real app; the notes beside the screen follow the page language.
const STATES: State[] = [
  {
    id: "locked",
    body: { kind: "locked" },
    button: { label: "Müraciət et", style: "disabled" },
  },
  {
    id: "rejected",
    body: {
      kind: "timeline",
      steps: [
        { dot: "done", title: "Müraciətiniz qəbul edildi" },
        { dot: "error", title: "Müraciət rədd edildi", sub: "Səbəb: bank rekvizitləri təsdiqlənmədi" },
      ],
    },
    button: { label: "Yenidən müraciət et", style: "primary" },
  },
  {
    id: "document",
    body: {
      kind: "timeline",
      steps: [
        { dot: "done", title: "Müraciətiniz qəbul edildi" },
        {
          dot: "alert",
          title: "Sənəd yenidən tələb olunur",
          sub: "Sənədin şəkli aydın deyil",
          action: "Sənədi yenidən yüklə",
        },
        { dot: "pending", title: "Ödəniş hazırlanır" },
        { dot: "pending", title: "Ödəniş həyata keçirildi" },
      ],
    },
    button: { label: "Sığorta ödənişinin alınması ərizəsi", style: "secondary" },
  },
  {
    id: "paid",
    body: {
      kind: "timeline",
      steps: [
        { dot: "done", title: "Müraciətiniz qəbul edildi" },
        { dot: "done", title: "Ödəniş hazırlandı" },
        { dot: "paid", title: "Ödəniş həyata keçirildi", sub: "350 ₼ hesabınıza köçürüldü" },
      ],
    },
    button: { label: "Sığorta ödənişinin alınması ərizəsi", style: "secondary" },
  },
];

function DotIcon({ kind }: { kind: Dot }) {
  const base = "grid h-6 w-6 shrink-0 place-items-center rounded-full text-[13px] font-bold leading-none text-white";
  if (kind === "pending")
    return <span aria-hidden className="h-6 w-6 shrink-0 rounded-full border-2" style={{ borderColor: GREY }} />;
  const bg = { done: VIOLET, alert: ORANGE, error: RED, paid: GREEN }[kind];
  const glyph = { done: "✓", alert: "!", error: "✕", paid: "✓" }[kind];
  return (
    <span aria-hidden className={base} style={{ background: bg }}>
      {glyph}
    </span>
  );
}

function Timeline({ steps }: { steps: Step[] }) {
  return (
    <ol>
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        const next = steps[i + 1];
        const lineColor = next && next.dot !== "pending" ? VIOLET : GREY;
        return (
          <li
            key={s.title}
            className="edge-in relative flex gap-3 pb-6 last:pb-0"
            style={{ animationDelay: `${i * 140}ms` }}
          >
            {!last && (
              <span
                aria-hidden
                className="absolute top-7 bottom-1 left-[11px] w-0.5"
                style={{ background: lineColor }}
              />
            )}
            <DotIcon kind={s.dot} />
            <div className="min-w-0 flex-1 pt-px">
              <p
                className="text-[15px] leading-snug font-semibold"
                style={{ color: s.dot === "pending" ? GREY : INK }}
              >
                {s.title}
              </p>
              {s.sub && (
                <p className="mt-0.5 text-[13px] leading-snug" style={{ color: "#6b7280" }}>
                  {s.sub}
                </p>
              )}
              {s.action && (
                <span
                  className="mt-2 inline-block rounded-lg px-3 py-1.5 text-[13px] font-semibold text-white"
                  style={{ background: VIOLET }}
                >
                  {s.action}
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function Locked() {
  return (
    <div className="edge-in">
      <div className="flex items-start gap-3 rounded-xl px-3 py-3" style={{ background: "#fef1e0" }}>
        <span
          aria-hidden
          className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[13px] font-bold text-white"
          style={{ background: ORANGE }}
        >
          !
        </span>
        <p className="text-[14px] leading-snug font-medium" style={{ color: INK }}>
          Müqavilənin müddəti hələ bitməyib
        </p>
      </div>
      <div className="mt-5 h-1.5 overflow-hidden rounded-full" style={{ background: "#cdcdff" }}>
        <div className="edge-fill h-full rounded-full" style={{ background: VIOLET, width: "62%" }} />
      </div>
      <p className="mt-2 text-[13px]" style={{ color: "#6b7280" }}>
        500 gün qalıb
      </p>
      <p className="mt-4 text-[13px] leading-snug" style={{ color: "#6b7280" }}>
        Müraciət müddət bitdikdən sonra mümkün olacaq
      </p>
    </div>
  );
}

function Phone({ state }: { state: State }) {
  const btn = state.button;
  return (
    <div
      className="relative mx-auto w-full max-w-[340px] rounded-[34px] p-2.5 shadow-2xl ring-1 ring-white/15"
      style={{ background: "#0d0c12" }}
    >
      <div className="flex min-h-[500px] flex-col rounded-[26px] px-4 pt-5 pb-4" style={{ background: "#f3f3f3" }}>
        <div className="flex items-center justify-between text-[11px] font-semibold" style={{ color: INK }}>
          <span>9:41</span>
          <span aria-hidden>▂▄▆ ◔</span>
        </div>
        <div className="mt-4 flex items-center gap-3" style={{ color: INK }}>
          <span aria-hidden className="text-lg leading-none">
            ‹
          </span>
          <p className="flex-1 pr-4 text-center text-[14px] font-medium">Müraciətin detalları</p>
        </div>

        {/* key remounts the card, so its items animate in again for every state */}
        <div key={state.id} className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
          {state.body.kind === "locked" ? <Locked /> : <Timeline steps={state.body.steps} />}
        </div>

        <div className="mt-auto pt-6">
          <div
            key={`${state.id}-btn`}
            className="edge-in rounded-xl px-4 py-3 text-center text-[14px] font-semibold"
            style={{
              animationDelay: "350ms",
              background: btn.style === "primary" ? VIOLET : btn.style === "disabled" ? "#e7e7e7" : "transparent",
              color: btn.style === "primary" ? "#fff" : btn.style === "disabled" ? GREY : "#616874",
              border: btn.style === "secondary" ? "1.5px solid #dfdfdf" : "none",
            }}
          >
            {btn.label}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * One screen, four states. The tabs switch the state; the card rebuilds itself step by step each time.
 * It cycles on its own once it is visible, until the viewer picks a tab.
 */
export default function EdgeCases(): ReactNode {
  const { dict } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const [i, setI] = useState(0);
  const [touched, setTouched] = useState(false);

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
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!seen || touched) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % STATES.length), 4200);
    return () => window.clearInterval(id);
  }, [seen, touched]);

  const state = STATES[i];

  return (
    <div ref={ref} className="grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:gap-14">
      <div>
        <div role="tablist" aria-label={dict.edge.tabsAria} className="border-b border-line">
          {STATES.map((s, k) => {
            const on = k === i;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={on}
                onClick={() => {
                  setTouched(true);
                  setI(k);
                }}
                className="group block w-full border-t border-line py-4 text-left"
              >
                <span className="flex items-baseline gap-4">
                  <span className={`font-mono text-xs tabular-nums ${on ? "text-foreground" : "text-muted"}`}>
                    {String(k + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-xl font-medium tracking-tight transition-colors duration-300 md:text-2xl ${
                      on ? "text-foreground" : "text-muted group-hover:text-foreground"
                    }`}
                  >
                    {dict.edge.states[s.id].tab}
                  </span>
                </span>
                <span
                  className="grid transition-[grid-template-rows,opacity] duration-500 ease-out"
                  style={{ gridTemplateRows: on ? "1fr" : "0fr", opacity: on ? 1 : 0 }}
                >
                  <span className="overflow-hidden">
                    <span className="mt-3 block pl-9 text-base leading-relaxed text-muted md:text-lg">{dict.edge.states[s.id].note}</span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <Phone state={state} />
    </div>
  );
}
