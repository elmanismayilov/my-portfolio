"use client";

import type { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/provider";

type Rect = [x: number, y: number, w: number, h: number]; // crop in source pixels
export type BAView = { image: StaticImageData; rect?: Rect; alt: string };
export type BAFix = { title: string; note: string; before: BAView; after: BAView };

/** A crop of an image (or the whole image), drawn as a background so it keeps its own aspect ratio. */
function Crop({ view }: { view: BAView }) {
  const { image, rect, alt } = view;
  const [x, y, w, h] = rect ?? [0, 0, image.width, image.height];
  const posX = image.width === w ? 0 : (x / (image.width - w)) * 100;
  const posY = image.height === h ? 0 : (y / (image.height - h)) * 100;
  return (
    <div
      role="img"
      aria-label={alt}
      className="w-full overflow-hidden rounded-xl ring-1 ring-line"
      style={{
        aspectRatio: `${w} / ${h}`,
        backgroundImage: `url(${image.src})`,
        backgroundRepeat: "no-repeat",
        backgroundColor: "#fff",
        backgroundSize: `${(image.width / w) * 100}% auto`,
        backgroundPosition: `${posX}% ${posY}%`,
      }}
    />
  );
}

function Row({ fix, index }: { fix: BAFix; index: number }) {
  const { dict } = useI18n();
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
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const rise = (delay: number): React.CSSProperties => ({
    opacity: on ? 1 : 0,
    transform: on ? "none" : "translateY(18px)",
    transition: "opacity 700ms ease-out, transform 800ms cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: `${delay}ms`,
  });

  return (
    <div ref={ref} className="border-t border-line py-8 md:py-10">
      <div className="flex items-baseline gap-4" style={rise(0)}>
        <span className="font-mono text-xs tabular-nums text-muted">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <h3 className="text-xl font-medium tracking-tight md:text-2xl">{fix.title}</h3>
          <p className="mt-1 text-base text-muted md:text-lg">{fix.note}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 items-center gap-4 md:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] md:gap-6">
        <div style={rise(150)}>
          <p className="mb-2 font-mono text-xs uppercase tracking-wide text-muted">{dict.beforeAfter.before}</p>
          <Crop view={fix.before} />
        </div>

        {/* arrow: draws itself between the two */}
        <svg
          aria-hidden
          viewBox="0 0 72 24"
          className="mx-auto h-6 w-[72px] rotate-90 text-foreground md:rotate-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M4 12 H66 M56 4 L66 12 L56 20"
            pathLength={1}
            strokeDasharray="1"
            style={{
              strokeDashoffset: on ? 0 : 1,
              transition: "stroke-dashoffset 900ms cubic-bezier(0.22, 1, 0.36, 1) 450ms",
            }}
          />
        </svg>

        <div style={rise(650)}>
          <p className="mb-2 font-mono text-xs uppercase tracking-wide text-muted">{dict.beforeAfter.after}</p>
          <Crop view={fix.after} />
        </div>
      </div>
    </div>
  );
}

/** Old and new side by side, one pair per fix, joined by an arrow that draws itself. */
export default function BeforeAfter({ fixes }: { fixes: BAFix[] }) {
  return (
    <div className="border-b border-line">
      {fixes.map((f, i) => (
        <Row key={f.title} fix={f} index={i} />
      ))}
    </div>
  );
}
