"use client";

import type { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

/** A piece of the image that appears on its own. Rect is in the image's own pixel space. */
export type RevealTile = {
  rect: [number, number, number, number]; // x0, y0, x1, y1
  at: number; // start delay, ms
  dur: number; // animation duration, ms
  dir: "x" | "y" | "fade"; // wipe left->right, wipe top->down, or fade + rise
};

/** A flat color shape that is always visible (the backdrop the tiles appear on). */
export type RevealFill = {
  rect: [number, number, number, number];
  color: string;
  radius?: number;
};

// Default: the Open Banking user flow, 2000 x 1351. Each branch brings its screens with it.
const FLOW_W = 2000;
const FLOW_H = 1351;
const FLOW_SPEED = 0.5; // multiplies every delay and duration of the flow tiles; lower = faster
const FLOW_TILES: RevealTile[] = [
  // entry: home -> "claim" -> choose entry method -> manual form
  { rect: [45, 95, 525, 350], at: 0, dur: 1500, dir: "x" },
  // branch: the filled manual form
  { rect: [415, 50, 700, 300], at: 1500, dur: 900, dir: "x" },
  // branch: manual entry, validation and errors
  { rect: [540, 290, 1490, 555], at: 2300, dur: 2800, dir: "x" },
  // branch: trunk down to Open Banking
  { rect: [340, 340, 420, 1200], at: 3000, dur: 1100, dir: "y" },
  // Open Banking intro screens
  { rect: [415, 615, 700, 830], at: 4000, dur: 1100, dir: "x" },
  // bank list screens
  { rect: [680, 630, 980, 1045], at: 5000, dur: 1500, dir: "x" },
  // bank list pop-ups
  { rect: [960, 725, 1145, 980], at: 6300, dur: 900, dir: "x" },
  // second trunk down to the account screens
  { rect: [515, 810, 600, 1175], at: 5400, dur: 900, dir: "y" },
  // account selection and result screens
  { rect: [545, 1065, 1215, 1270], at: 6200, dur: 2200, dir: "x" },
];

const ANIMATION = { x: "flow-x", y: "flow-y", fade: "flow-rise" } as const;

/**
 * An image that builds itself piece by piece once it scrolls into view (a flow branch by branch,
 * contracts product by product, pages one after another, a chart drawing left to right).
 * Without `tiles` it plays the Open Banking flow. Can be replayed.
 */
export default function FlowReveal({
  image,
  alt,
  caption,
  tiles,
  fills = [],
  w = FLOW_W,
  h = FLOW_H,
  bg = "#303030",
  openFull = !tiles,
}: {
  image: StaticImageData;
  alt: string;
  caption?: string;
  tiles?: RevealTile[];
  fills?: RevealFill[];
  w?: number;
  h?: number;
  bg?: string;
  openFull?: boolean;
}) {
  const list = tiles ?? FLOW_TILES;
  const k = tiles ? 1 : FLOW_SPEED;

  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div>
      <div
        ref={ref}
        role="img"
        aria-label={alt}
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: `${w} / ${h}`, backgroundColor: bg }}
      >
        {fills.map((f, i) => {
          const [x0, y0, x1, y1] = f.rect;
          return (
            <div
              key={`f${i}`}
              aria-hidden
              className="absolute"
              style={{
                left: `${(x0 / w) * 100}%`,
                top: `${(y0 / h) * 100}%`,
                width: `${((x1 - x0) / w) * 100}%`,
                height: `${((y1 - y0) / h) * 100}%`,
                backgroundColor: f.color,
                borderRadius: f.radius
                  ? `${(f.radius / (x1 - x0)) * 100}% / ${(f.radius / (y1 - y0)) * 100}%`
                  : undefined,
              }}
            />
          );
        })}

        {started &&
          list.map((t, i) => {
            const [x0, y0, x1, y1] = t.rect;
            const tw = x1 - x0;
            const th = y1 - y0;
            return (
              <div
                key={`${run}-${i}`}
                aria-hidden
                className="flow-tile absolute overflow-hidden"
                style={{
                  left: `${(x0 / w) * 100}%`,
                  top: `${(y0 / h) * 100}%`,
                  width: `${(tw / w) * 100}%`,
                  height: `${(th / h) * 100}%`,
                  animationName: ANIMATION[t.dir],
                  animationDuration: `${Math.round(t.dur * k)}ms`,
                  animationDelay: `${Math.round(t.at * k)}ms`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt=""
                  draggable={false}
                  className="absolute max-w-none select-none"
                  style={{
                    width: `${(w / tw) * 100}%`,
                    height: `${(h / th) * 100}%`,
                    left: `${(-x0 / tw) * 100}%`,
                    top: `${(-y0 / th) * 100}%`,
                  }}
                />
              </div>
            );
          })}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wide text-muted">
        {caption && <p>{caption}</p>}
        <div className="flex gap-6">
          <button
            type="button"
            onClick={() => {
              setStarted(true);
              setRun((r) => r + 1);
            }}
            className="link-line pb-0.5 text-foreground"
          >
            Replay ↻
          </button>
          {openFull && (
            <a href={image.src} target="_blank" rel="noreferrer" className="link-line pb-0.5 text-foreground">
              Open full size ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
