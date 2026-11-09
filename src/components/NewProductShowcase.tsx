"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Two phones side by side. The home screen glides in with a pink glow behind it; the product catalog
 * scrolls itself top to bottom and back, so the whole list (and the new product at its top) is seen.
 * Hover pauses the scroll.
 */
export default function NewProductShowcase({
  home,
  homeAlt,
  homeCaption,
  catalog,
  catalogAlt,
  catalogCaption,
}: {
  home: StaticImageData;
  homeAlt: string;
  homeCaption: string;
  catalog: StaticImageData;
  catalogAlt: string;
  catalogCaption: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // both phones share a width; the catalog is taller than the home screen, so it scrolls by the difference
  const homeRatio = home.width / home.height;
  const catalogRatio = catalog.width / catalog.height;
  const scrollTo = `-${((1 - catalogRatio / homeRatio) * 100).toFixed(2)}%`;

  const rise = (delay: number): React.CSSProperties => ({
    opacity: shown ? 1 : 0,
    transform: shown ? "none" : "translateY(48px)",
    transition: "opacity 800ms ease-out, transform 900ms cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: `${delay}ms`,
  });

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[760px] py-8 md:py-12">
      {/* glow behind the phones */}
      <div aria-hidden className="newproduct-glow pointer-events-none absolute inset-0" />

      <div className="relative grid grid-cols-2 items-start gap-4 md:gap-10">
        <figure style={rise(0)}>
          <div className="overflow-hidden rounded-[22px] ring-1 ring-white/15 md:rounded-[34px]">
            <Image
              src={home}
              alt={homeAlt}
              placeholder="blur"
              quality={95}
              sizes="(max-width: 768px) 45vw, 360px"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mt-3 font-mono text-xs uppercase tracking-wide text-muted">
            {homeCaption}
          </figcaption>
        </figure>

        <figure style={rise(250)} className="group">
          <div
            className="relative overflow-hidden rounded-[22px] ring-1 ring-white/15 md:rounded-[34px]"
            style={{ aspectRatio: `${home.width} / ${home.height}` }}
          >
            <Image
              src={catalog}
              alt={catalogAlt}
              placeholder="blur"
              quality={95}
              sizes="(max-width: 768px) 45vw, 360px"
              className="newproduct-scroll h-auto w-full"
              style={{
                ["--scroll-to" as string]: scrollTo,
                animationPlayState: shown ? undefined : "paused",
              }}
            />
          </div>
          <figcaption className="mt-3 font-mono text-xs uppercase tracking-wide text-muted">
            {catalogCaption}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
