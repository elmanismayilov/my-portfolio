"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/content";
import { fill, useI18n } from "@/lib/i18n/provider";

/** Copies text with the Clipboard API, falling back to a hidden textarea for older browsers. */
async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the legacy path
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "0";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

const ring = "focus-ring";

export default function ContactBlock() {
  const { dict } = useI18n();
  const c = dict.contact;
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number>(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onCopy = async () => {
    const ok = await copyText(site.email);
    setStatus(ok ? "copied" : "failed");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("idle"), 2000);
  };

  const links = [
    { label: "LinkedIn", href: site.linkedin },
    { label: "Telegram", href: site.telegram },
  ];

  return (
    <div className="mt-16 grid grid-cols-12 gap-x-4 gap-y-8 border-t border-line pt-10 md:mt-20">
      <div className="col-span-12 md:col-span-6">
        <p className="max-w-[24ch] text-3xl leading-[1.1] font-medium tracking-tight md:text-5xl">
          {c.heading}
        </p>
      </div>

      <div className="col-span-12 md:col-span-6 md:col-start-7">
        <p className="font-mono text-xs uppercase tracking-wide text-muted">{c.email}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-3">
          <span className="text-xl font-medium tracking-tight break-all select-all md:text-2xl">{site.email}</span>
          <button
            type="button"
            onClick={onCopy}
            aria-label={fill(c.copyAria, { email: site.email })}
            className={`group inline-flex min-h-11 cursor-pointer items-center rounded-full border border-foreground px-4 font-mono text-xs uppercase tracking-wide motion-safe:transition-colors motion-safe:duration-300 hover:bg-foreground hover:text-background ${ring}`}
          >
            {c.copyEmail}
          </button>
          {/* the live region is always in the DOM so the message is announced when it appears */}
          <span role="status" aria-live="polite" className="font-mono text-xs uppercase tracking-wide text-accent">
            {status === "copied" && c.copied}
            {status === "failed" && c.failed}
          </span>
        </div>

        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-1 font-mono text-xs uppercase tracking-wide">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={fill(c.newTab, { label: l.label })}
                className={`group inline-flex min-h-11 items-center gap-2 hover:text-accent motion-safe:transition-colors ${ring}`}
              >
                {l.label}
                <span
                  aria-hidden
                  className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
