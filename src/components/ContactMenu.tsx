"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/content";
import { fill, useI18n } from "@/lib/i18n/provider";

/**
 * "Get in touch" that lets the visitor choose how: e-mail, LinkedIn or Telegram.
 * `header` is the outline pill of the navbar, `footer` the big link at the bottom of the page.
 */
export default function ContactMenu({ variant, mailto }: { variant: "header" | "footer"; mailto: string }) {
  const { dict } = useI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const label = variant === "header" ? dict.header.getInTouch : dict.footer.getInTouch;

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        rootRef.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const options = [
    { label: dict.contact.email, href: mailto, external: false },
    { label: "LinkedIn", href: site.linkedin, external: true },
    { label: "Telegram", href: site.telegram, external: true },
  ];

  const trigger =
    variant === "header" ? (
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="group inline-flex min-h-11 cursor-pointer items-center rounded-full border border-foreground px-4 uppercase focus-ring"
      >
        {/* Text rolls up out of view while a copy rises from below (motion-safe only) */}
        <span className="relative block overflow-hidden">
          <span className="block whitespace-nowrap motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover:-translate-y-full">
            {label}
          </span>
          <span
            aria-hidden
            className="absolute inset-0 block translate-y-full whitespace-nowrap motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover:translate-y-0"
          >
            {label}
          </span>
        </span>
      </button>
    ) : (
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="mt-6 block cursor-pointer text-left text-[11vw] leading-[0.9] font-semibold tracking-[-0.05em] uppercase transition-colors hover:text-accent focus-ring md:text-[8vw] 2xl:text-[120px]"
      >
        {label} <span aria-hidden>{open ? "↓" : "↗"}</span>
      </button>
    );

  return (
    <div ref={rootRef} className={variant === "header" ? "relative" : "relative w-fit max-w-full"}>
      {trigger}
      {open && (
        <div
          role="group"
          aria-label={dict.contact.menuTitle}
          className={`absolute z-50 mt-2 min-w-64 border border-line bg-background text-foreground ${
            variant === "header" ? "top-full right-0" : "top-full left-0 font-mono text-xs uppercase tracking-wide"
          }`}
        >
          <p className="px-4 pt-3 pb-1 font-mono text-[11px] tracking-wide text-muted normal-case">
            {dict.contact.menuTitle}
          </p>
          <ul className="py-1 font-mono text-xs uppercase tracking-wide">
            {options.map((o) => (
              <li key={o.label}>
                <a
                  href={o.href}
                  {...(o.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={o.external ? fill(dict.contact.newTab, { label: o.label }) : undefined}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center justify-between gap-6 px-4 text-foreground hover:text-accent focus-ring motion-safe:transition-colors"
                >
                  {o.label}
                  <span aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
