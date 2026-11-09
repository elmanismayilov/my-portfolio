"use client";

import type { StaticImageData } from "next/image";
import { forwardRef, useEffect, useRef, useState } from "react";

// Story told by the animation. Each stage starts at the given time (ms); then it holds and loops.
const STAGES = [0, 500, 1300, 2500, 3000, 3900];
const LOOP_MS = 5900;

const NOTES = [
  "Request submitted",
  "Request accepted",
  "Missing document — the user is notified instantly",
  "Document sent, the alert is resolved",
  "Payment is being prepared",
  "Payment made",
];

// crop of the money illustration inside the source screenshot (px of the 750-wide image)
const ART = { x: 235, y: 245, w: 280, h: 235, srcW: 750, srcH: 1828 };

const BLUE = "#5f61ff";

/**
 * The request-status screen as a live timeline: statuses switch on one after another,
 * a "missing document" alert pops in and gets resolved. Starts when scrolled into view and loops.
 */
export default function StatusTimeline({
  image,
  alt,
  caption,
}: {
  image: StaticImageData;
  alt: string;
  caption?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const stage = useStatusStage(ref);

  return (
    <div>
      <div
        ref={ref}
        role="img"
        aria-label={alt}
        className="relative flex justify-center overflow-hidden px-5 py-12 md:py-20"
        style={{ background: STATUS_BACKGROUND }}
      >
        <StatusBackdrop />
        <StatusPhone stage={stage} image={image} />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 font-mono text-xs uppercase tracking-wide text-muted">
        {caption && <p>{caption}</p>}
        <p aria-live="off" className="text-foreground">
          {String(stage + 1).padStart(2, "0")} / {String(STAGES.length).padStart(2, "0")} — {NOTES[stage]}
        </p>
      </div>
    </div>
  );
}

/** Drives the story: returns the current stage, starts when `ref` scrolls into view and loops. */
export function useStatusStage(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStage(STAGES.length - 1);
      return;
    }
    if (!inView) return;
    let timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      timers = STAGES.map((at, i) => setTimeout(() => setStage(i), at));
      timers.push(setTimeout(run, LOOP_MS));
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return stage;
}

/** Soft colored shapes behind the phone. */
export function StatusBackdrop() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-16 h-80 w-80 rounded-full bg-[#ff9ad5]/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -bottom-24 h-96 w-96 rounded-full bg-[#5f61ff]/35 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-white/50 blur-3xl"
      />
    </>
  );
}

export const STATUS_BACKGROUND = "linear-gradient(135deg, #efe3fb 0%, #cfcaff 55%, #bcd9ff 100%)";

/** The request-details phone with its status timeline, for a given stage of the story. */
export const StatusPhone = forwardRef<HTMLDivElement, { stage: number; image: StaticImageData }>(
  function StatusPhone({ stage, image }, ref) {
    const acceptedDone = stage >= 1;
    const warnShown = stage === 2;
    const preparingDone = stage >= 4;
    const paidDone = stage >= 5;

    return (
      <div
        ref={ref}
        aria-hidden
        className="relative w-full max-w-[340px] overflow-hidden rounded-[36px] bg-[#f3f3f3] px-4 pt-3 pb-4 text-[#1b1b24] shadow-[0_40px_90px_-30px_rgba(60,50,160,0.55)] ring-1 ring-black/5"
      >
        <div className="flex items-center justify-between px-2 text-[13px] font-semibold">
          <span>9:41</span>
          <span className="h-2.5 w-14 rounded-full bg-[#1b1b24]/80" />
        </div>

        <div className="mt-5 flex items-center px-2">
          <span className="text-xl leading-none">‹</span>
          <p className="flex-1 pr-3 text-center text-[13px] font-medium">Müraciətin detalları</p>
        </div>

        {/* money illustration, cropped from the screenshot */}
        <div
          className="relative mx-auto mt-3 overflow-hidden"
          style={{ width: 112, aspectRatio: `${ART.w} / ${ART.h}` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt=""
            draggable={false}
            className="absolute max-w-none select-none"
            style={{
              width: `${(ART.srcW / ART.w) * 100}%`,
              height: `${(ART.srcH / ART.h) * 100}%`,
              left: `${(-ART.x / ART.w) * 100}%`,
              top: `${(-ART.y / ART.h) * 100}%`,
            }}
          />
        </div>

        {/* timeline card */}
        <div className="mt-4 rounded-2xl bg-white px-4 pt-5 pb-3">
          <Collapse open={warnShown}>
            <Item kind="warn" done date="22.02.2026 / 15:00" title="Çatışmayan sənəd var" lineFilled />
          </Collapse>
          <Item
            kind="step"
            done={acceptedDone}
            date={acceptedDone ? "22.02.2026 / 15:00" : undefined}
            title="Müraciətiniz qəbul edildi, ödəniş gününə qədər gözləmədədir"
            lineFilled={preparingDone}
            edit
          />
          <Item kind="step" done={preparingDone} title="Ödəniş hazırlanır" lineFilled={paidDone} />
          <Item kind="step" done={paidDone} title="Ödəniş həyata keçirildi" last />
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-black/10 px-3 py-3 text-[12px] text-[#6b6b78]">
          Sığorta ödənişinin alınması ərizəsi
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M6 3h8l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
            <path d="M12 10v6m-3-3 3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    );
  },
);

/** Smoothly grows/shrinks its children (used for the alert that pops in and goes away). */
function Collapse({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div
      className="grid transition-[grid-template-rows,opacity] duration-500 ease-out"
      style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
    >
      <div data-collapse-inner className="overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function Item({
  kind,
  done,
  date,
  title,
  lineFilled = false,
  last = false,
  edit = false,
}: {
  kind: "step" | "warn";
  done: boolean;
  date?: string;
  title: string;
  lineFilled?: boolean;
  last?: boolean;
  edit?: boolean;
}) {
  const warn = kind === "warn";
  return (
    <div className="relative pl-11" style={{ paddingBottom: last ? 4 : 28 }}>
      {/* indicator */}
      <span
        className="absolute top-0 left-0 flex h-7 w-7 items-center justify-center rounded-full border-2 text-[13px] font-bold text-white transition-[background-color,border-color,transform] duration-300"
        style={{
          backgroundColor: warn ? "#fba333" : done ? BLUE : "transparent",
          borderColor: warn ? "#fba333" : done ? BLUE : "#8a8c96",
          transform: done ? "scale(1)" : "scale(0.92)",
        }}
      >
        {warn ? "!" : done ? "✓" : ""}
      </span>

      {/* connector */}
      {!last && (
        <span aria-hidden className="absolute top-9 bottom-1 left-[13px] w-[2px] bg-[#c3c4cc]">
          <span
            className="absolute inset-x-0 top-0 bg-[#5f61ff] transition-[height] duration-500 ease-out"
            style={{ height: lineFilled ? "100%" : "0%" }}
          />
        </span>
      )}

      <div className="flex items-start justify-between gap-2">
        <div>
          {date && <p className="text-[11px] text-[#7a7a86]">{date}</p>}
          <p
            className="text-[13px] leading-snug font-semibold transition-colors duration-300"
            style={{ color: done ? "#1b1b24" : "#7a7a86" }}
          >
            {title}
          </p>
        </div>
        {edit && done && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.8" className="mt-4 shrink-0">
            <path d="M4 20h4L19 9l-4-4L4 16v4z" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </div>
  );
}
