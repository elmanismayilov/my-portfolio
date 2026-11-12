"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/provider";

type Shot = { image: StaticImageData; alt: string; caption: string };

const TOTAL_MONTHS = 36;
const MORPH_AT = TOTAL_MONTHS - 1; // the last month: progress turns into the CTA
const RUN_MS = 3800; // time to play through the whole contract
const HOLD_MS = 2400; // how long the finished state stays on screen

/**
 * Interactive demo of the "smart entry point": the contract card starts as a
 * progress bar and, in the last month, the bar turns into the payout button.
 * Plays on its own once scrolled into view and loops; dragging the timeline
 * takes over, "Auto-play" gives control back.
 */
export default function PayoutMorph({ before, after }: { before: Shot; after: Shot }) {
  const { dict } = useI18n();
  const rootRef = useRef<HTMLDivElement>(null);
  const [month, setMonth] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduced(mq.matches);
      if (mq.matches) {
        setAuto(false);
        setMonth(TOTAL_MONTHS);
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // autoplay loop: run -> hold on the finished state -> restart
  useEffect(() => {
    if (!auto || !inView || reduced) return;
    let raf = 0;
    let start = performance.now();
    const tick = (now: number) => {
      const t = now - start;
      if (t < RUN_MS) {
        setMonth((t / RUN_MS) * TOTAL_MONTHS);
      } else if (t < RUN_MS + HOLD_MS) {
        setMonth(TOTAL_MONTHS);
      } else {
        start = now;
        setMonth(0);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [auto, inView, reduced]);

  const morphed = month >= MORPH_AT;
  const progress = Math.min(month / TOTAL_MONTHS, 1);
  const daysLeft = Math.max(Math.round((TOTAL_MONTHS - month) * 30.4), 0);
  const shownMonth = Math.min(Math.floor(month) + 1, TOTAL_MONTHS);

  return (
    <div
      ref={rootRef}
      className="grid grid-cols-2 items-center gap-x-4 gap-y-10 bg-surface px-5 py-10 md:grid-cols-[1fr_minmax(0,1.15fr)_1fr] md:gap-x-10 md:px-10 md:py-16"
    >
      {/* live card + timeline */}
      <div className="order-first col-span-2 md:order-none md:col-span-1">
        <div className="mx-auto w-full max-w-[400px]">
          <div
            className="relative overflow-hidden rounded-[22px] p-5 text-white shadow-[0_30px_80px_-30px_rgba(91,91,255,0.7)] md:p-6"
            style={{
              background:
                "linear-gradient(135deg, #5a5cff 0%, #6563ff 55%, #5557f4 100%)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -bottom-16 h-56 w-56 rotate-12 rounded-[40px] bg-white/[0.06]"
            />
            <div className="relative">
              <div className="flex items-baseline justify-between border-b border-white/25 pb-3 text-[13px]">
                <span className="opacity-90">Ay üzrə ödəniləcək məbləğ</span>
                <span className="text-lg font-semibold">₼ 350</span>
              </div>

              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-[17px] leading-tight font-semibold">Həyatın Yaşam Sığortası</p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-[13px] opacity-90">
                    HYS - XXXXXX
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white" />
                    Aktiv
                  </p>
                </div>
                <span className="shrink-0 rounded-lg border border-white/80 px-3 py-1.5 text-[12px]">
                  Ətraflı →
                </span>
              </div>

              {/* bottom zone: progress bar <-> primary CTA */}
              <div className="relative mt-5 h-[68px]">
                <div
                  className="absolute inset-x-0 top-0 flex justify-between text-[13px] transition-opacity duration-500"
                  style={{ opacity: morphed ? 0 : 1 }}
                >
                  <span>31.08.2023 - 31.08.2026</span>
                  <span className="font-semibold tabular-nums">{daysLeft} Gün</span>
                </div>

                <div
                  className="absolute inset-x-0 bottom-0 overflow-hidden transition-[height,border-radius,background-color] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    height: morphed ? 46 : 10,
                    borderRadius: morphed ? 12 : 999,
                    backgroundColor: morphed ? "#f4f4f6" : "rgba(255,255,255,0.35)",
                  }}
                >
                  <div
                    className="absolute inset-y-0 left-0 bg-white"
                    style={{ width: `${(morphed ? 1 : progress) * 100}%` }}
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-between px-4 text-[14px] font-medium text-[#1c1c24] transition-[opacity,transform] duration-500 ease-out"
                    style={{
                      opacity: morphed ? 1 : 0,
                      transform: morphed ? "none" : "translateY(8px)",
                      transitionDelay: morphed ? "250ms" : "0ms",
                    }}
                  >
                    <span className="mx-auto pl-4">Yığılmış məbləği əldə et</span>
                    <span aria-hidden>›</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* timeline */}
          <div className="mt-8">
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wide">
              <span className="text-muted">
                {dict.payout.month} <span className="text-foreground tabular-nums">{shownMonth}</span> / {TOTAL_MONTHS}
              </span>
              <button
                type="button"
                onClick={() => setAuto((a) => !a)}
                aria-pressed={auto}
                className="link-line pb-0.5"
              >
                {auto ? dict.payout.pause : dict.payout.autoPlay}
              </button>
            </div>

            <div className="relative mt-4">
              <input
                type="range"
                min={0}
                max={TOTAL_MONTHS}
                step={0.1}
                value={month}
                aria-label={dict.payout.rangeAria}
                onChange={(e) => {
                  setAuto(false);
                  setMonth(Number(e.target.value));
                }}
                className="payout-range w-full"
                style={{ ["--p" as string]: `${(month / TOTAL_MONTHS) * 100}%` }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute top-1/2 h-3 w-px -translate-y-1/2 bg-accent"
                style={{ left: `${(MORPH_AT / TOTAL_MONTHS) * 100}%` }}
              />
            </div>

            <p
              className="mt-4 font-mono text-xs uppercase tracking-wide transition-colors duration-500"
              style={{ color: morphed ? "var(--accent)" : "var(--muted)" }}
            >
              {morphed ? dict.payout.morphed : dict.payout.idle}
            </p>
          </div>
        </div>
      </div>

      {/* real screens, the active one lights up */}
      <Phone shot={before} active={!morphed} className="md:order-first" />
      <Phone shot={after} active={morphed} />
    </div>
  );
}

function Phone({
  shot,
  active,
  className = "",
}: {
  shot: Shot;
  active: boolean;
  className?: string;
}) {
  return (
    <figure
      className={`mx-auto w-full max-w-[280px] transition-[opacity,transform] duration-700 ease-out ${className}`}
      style={{ opacity: active ? 1 : 0.35, transform: active ? "scale(1)" : "scale(0.96)" }}
    >
      <div className="overflow-hidden rounded-[28px] ring-1 ring-line">
        <Image
          src={shot.image}
          alt={shot.alt}
          placeholder="blur"
          quality={90}
          sizes="(max-width: 768px) 45vw, 280px"
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 font-mono text-xs uppercase tracking-wide text-muted">
        {shot.caption}
      </figcaption>
    </figure>
  );
}
