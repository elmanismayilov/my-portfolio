"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { isLocale, localeNames, locales, type Locale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/provider";

/** Same page, other language: swaps the first path segment (/en/work/x → /ru/work/x). */
function pathFor(pathname: string, target: Locale): string {
  const [, first, ...rest] = pathname.split("/");
  const tail = first && isLocale(first) ? rest : [first, ...rest].filter(Boolean);
  return `/${[target, ...tail].join("/")}`;
}

/** Navbar language picker: the current language (EN / RU / AZ) opens a small list of the three languages. */
export default function LanguageSwitcher() {
  const { locale, dict } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`${dict.header.language}: ${localeNames[locale]}`}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 uppercase focus-ring"
      >
        {locale}
        <span
          aria-hidden
          className={`text-[10px] leading-none motion-safe:transition-transform motion-safe:duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {open && (
        <ul
          aria-label={dict.header.language}
          className="absolute top-full right-0 mt-2 min-w-40 border border-line bg-background py-1 normal-case"
        >
          {locales.map((l) => {
            const current = l === locale;
            return (
              <li key={l}>
                <Link
                  href={pathFor(pathname, l)}
                  scroll={false}
                  lang={l}
                  hrefLang={l}
                  aria-current={current ? "true" : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-11 items-center justify-between gap-4 px-4 tracking-wide focus-ring ${
                    current ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  <span>{localeNames[l]}</span>
                  <span className="uppercase">{current ? "✓" : l}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
