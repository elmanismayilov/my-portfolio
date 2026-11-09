"use client";

import type { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

/** A big number that counts up once it scrolls into view, with an optional illustration beside it. */
export default function CountStat({
  value,
  prefix = "",
  suffix = "",
  label,
  image,
  imageAlt = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  image?: StaticImageData;
  imageAlt?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / 1400, 1);
          setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-start justify-between gap-10 border-t border-line pt-10 md:flex-row md:items-center"
    >
      <div>
        <p
          aria-label={`${prefix}${value}${suffix} ${label}`}
          className="text-7xl leading-none font-black tracking-tighter tabular-nums md:text-9xl"
        >
          <span aria-hidden>
            {prefix}
            {n}
            {suffix}
          </span>
        </p>
        <p className="mt-4 font-mono text-xs uppercase tracking-wide text-muted">{label}</p>
      </div>
      {image && (
        // vector artwork: scales to any size without softening
        <div className="w-full max-w-[520px] overflow-hidden rounded-2xl bg-white p-4 md:p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt={imageAlt} draggable={false} className="h-auto w-full" />
        </div>
      )}
    </div>
  );
}
