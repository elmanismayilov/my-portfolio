"use client";

import { useEffect, useRef, useState } from "react";

// Source artwork is 1920 x 1080; every card sits at its original place in it.
const W = 1920;
const H = 1080;
const CW = 339; // card crop (2px inset on every side of the 343 x 186 card)
const CH = 182;
const BIG = 2.85; // size in the middle, relative to its final size

// The cards are laid out at their BIG size and shrunk into their slots (never enlarged), so the browser
// always rasterizes them at full size and they stay sharp in the middle.
const BIG_W = ((CW * BIG) / W) * 100; // % of the frame
const BIG_H = ((CH * BIG) / H) * 100;

const CARDS = [
  { x: 144, y: 296, glow: ["#5b5bff", "#8b7bff"] },
  { x: 573, y: 296, glow: ["#1fb6d4", "#3fd0c4"] },
  { x: 1002, y: 296, glow: ["#ff6a5c", "#fbb03b"] },
  { x: 1431, y: 296, glow: ["#1e5fc4", "#55a0f0"] },
  { x: 146, y: 598, glow: ["#14b89a", "#2fe0c8"] },
  { x: 575, y: 598, glow: ["#7c4fd8", "#b48cff"] },
  { x: 1004, y: 598, glow: ["#a020f0", "#ffb300"] },
  { x: 1433, y: 598, glow: ["#e0356b", "#ff7a9c"] },
].map((c) => {
  const cx = ((c.x + 2 + CW / 2) / W) * 100; // slot center, % of the frame
  const cy = ((c.y + 2 + CH / 2) / H) * 100;
  return {
    ...c,
    left: cx - BIG_W / 2,
    top: cy - BIG_H / 2,
    // translate % is relative to the card itself: distance from its slot to the middle of the frame
    dx: ((50 - cx) / BIG_W) * 100,
    dy: ((50 - cy) / BIG_H) * 100,
  };
});

type State = "hidden" | "center" | "placed" | "out";

const APPEAR = 450; // card grows into the middle
const HOLD = 1000; // stays in the middle for exactly one second
const FLY = 650; // flies to its place
const PERIOD = 1700; // gap between two cards
const REST = 3200; // everything in place before the loop restarts

/**
 * Card-by-card presentation: each card appears large in the middle with a glow of its own color,
 * holds for one second, then flies to its place in the grid. Loops; every card is shown every time.
 */
export default function CardsShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [run, setRun] = useState(0);
  const [states, setStates] = useState<State[]>(() => CARDS.map(() => "hidden"));
  const [focus, setFocus] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStates(CARDS.map(() => "placed"));
      setFocus(null);
      return;
    }
    if (!inView) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));
    const set = (i: number, s: State) => setStates((prev) => prev.map((v, k) => (k === i ? s : v)));

    setStates(CARDS.map(() => "hidden"));
    setFocus(null);

    CARDS.forEach((_, i) => {
      const start = 300 + i * PERIOD;
      at(start, () => {
        set(i, "center");
        setFocus(i);
      });
      at(start + APPEAR + HOLD, () => {
        set(i, "placed");
        if (i === CARDS.length - 1) setFocus(null);
      });
    });

    const end = 300 + (CARDS.length - 1) * PERIOD + APPEAR + HOLD + FLY + REST;
    at(end, () => setStates(CARDS.map(() => "out")));
    at(end + 700, () => setRun((r) => r + 1)); // restart the loop

    return () => timers.forEach(clearTimeout);
  }, [inView, run]);

  return (
    <div>
      <div
        ref={ref}
        role="img"
        aria-label="Eight contract cards presented one by one, each in its own color, then arranged in a grid"
        className="relative aspect-video w-full overflow-hidden bg-[#050507]"
      >
        {/* ambient glow, as in the original artwork */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 0% 0%, rgba(91,91,255,0.55), transparent 70%), radial-gradient(55% 60% at 100% 100%, rgba(224,53,107,0.45), transparent 70%)",
          }}
        />

        {/* one glow per card, in the card's own color */}
        {CARDS.map((c, i) => {
          const on = focus === i;
          return (
            <div
              key={`g${i}`}
              aria-hidden
              className="pointer-events-none absolute -inset-[10%]"
              style={{
                opacity: on ? 1 : 0,
                transform: on ? "scale(1)" : "scale(0.7)",
                transition: "opacity 700ms ease, transform 1600ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <div
                className="cards-glow absolute inset-0"
                style={{
                  background: `radial-gradient(closest-side at 50% 50%, ${c.glow[0]}d9 0%, ${c.glow[1]}66 48%, transparent 100%)`,
                }}
              />
            </div>
          );
        })}

        {/* the cards */}
        {CARDS.map((c, i) => {
          const s = states[i];
          // cards are laid out at BIG size: "center" is their natural size, "placed" shrinks them into the slot
          const transform =
            s === "center"
              ? `translate(${c.dx}%, ${c.dy}%) scale(1)`
              : s === "hidden"
                ? `translate(${c.dx}%, ${c.dy}%) scale(0.7)`
                : s === "out"
                  ? `translate(0, 0) scale(${0.92 / BIG})`
                  : `translate(0, 0) scale(${1 / BIG})`;
          const opacity = s === "hidden" || s === "out" ? 0 : s === "placed" && focus !== null ? 0.28 : 1;
          const t =
            s === "center"
              ? `transform ${APPEAR}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${APPEAR}ms ease`
              : s === "placed"
                ? `transform ${FLY}ms cubic-bezier(0.65, 0, 0.2, 1), opacity 500ms ease`
                : "transform 500ms ease, opacity 500ms ease";
          return (
            <div
              key={`c${i}`}
              aria-hidden
              className="absolute overflow-hidden"
              style={{
                left: `${c.left}%`,
                top: `${c.top}%`,
                width: `${BIG_W}%`,
                height: `${BIG_H}%`,
                borderRadius: `${(20 / CW) * 100}% / ${(20 / CH) * 100}%`,
                transform,
                opacity,
                transition: t,
                zIndex: s === "center" ? 30 : 10,
                boxShadow: s === "center" ? `0 24px 70px -18px ${c.glow[0]}` : "none",
              }}
            >
              {/* 3x Lanczos-upscaled, lightly sharpened crop of the card (public/projects/cards) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/projects/cards/card-${i + 1}.webp`}
                alt=""
                draggable={false}
                className="h-full w-full select-none"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
