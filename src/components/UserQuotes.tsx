"use client";

import { useEffect, useRef, useState } from "react";

export type UserQuote = {
  name: string;
  meta: string; // e.g. "34, Baku"
  product: string;
  quote: string; // original language
  translation?: string; // omitted when the page language is the quote's own language
  problem: string; // short tag
};

const TYPE_MS = 22; // per character
const CARD_GAP_MS = 900; // start of the second card relative to the first

/**
 * Customer quotes. When a card scrolls into view the quote types itself out, then the translation
 * fades in and a "problem" tag pops up with a small shake — the app had nothing to show them.
 */
function QuoteCard({ q, delay }: { q: UserQuote; delay: number }) {
  const ref = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  const [n, setN] = useState(0);
  const done = n >= q.quote.length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer = 0;
    let interval = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setStarted(true);
        if (reduced) {
          setN(q.quote.length);
          return;
        }
        timer = window.setTimeout(() => {
          interval = window.setInterval(() => {
            setN((v) => {
              if (v + 1 >= q.quote.length) window.clearInterval(interval);
              return v + 1;
            });
          }, TYPE_MS);
        }, delay + 500);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
      window.clearInterval(interval);
    };
  }, [q.quote.length, delay]);

  return (
    <article
      ref={ref}
      className="flex flex-col rounded-2xl border border-line bg-surface p-6 md:p-8"
      style={{
        opacity: started ? 1 : 0,
        transform: started ? "none" : "translateY(16px)",
        transition: "opacity 600ms ease-out, transform 600ms ease-out",
        transitionDelay: `${delay}ms`,
      }}
    >
      <header className="flex items-center gap-3">
        <span
          aria-hidden
          className="grid h-11 w-11 place-items-center rounded-full bg-foreground font-mono text-sm text-background"
        >
          {q.name
            .split(" ")
            .map((w) => w[0])
            .join("")}
        </span>
        <div>
          <p className="font-medium">{q.name}</p>
          <p className="font-mono text-xs uppercase tracking-wide text-muted">{q.meta}</p>
        </div>
      </header>

      <p className="mt-3 font-mono text-xs uppercase tracking-wide text-muted">{q.product}</p>

      <blockquote className="mt-6 flex-1">
        {/* the typed text sits over its own invisible copy, so the card never changes height while typing */}
        <p aria-label={q.quote} lang="az" className="text-xl leading-relaxed md:text-2xl">
          <span aria-hidden>
            <span aria-hidden>“</span>
            {q.quote.slice(0, n)}
            {!done && started && <span className="typing-caret" />}
            <span className="opacity-0">{q.quote.slice(n)}</span>
            <span aria-hidden>”</span>
          </span>
        </p>
        {q.translation && (
          <p
            className="mt-4 text-base leading-relaxed text-muted"
            style={{
              opacity: done ? 1 : 0,
              transform: done ? "none" : "translateY(6px)",
              transition: "opacity 600ms ease-out 150ms, transform 600ms ease-out 150ms",
            }}
          >
            {q.translation}
          </p>
        )}
      </blockquote>

      <p
        className={`mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-xs uppercase tracking-wide ${
          done ? "problem-tag-in" : ""
        }`}
        style={{ opacity: done ? undefined : 0 }}
      >
        <span aria-hidden className="h-2 w-2 rounded-full bg-[#ff5a4e]" />
        {q.problem}
      </p>
    </article>
  );
}

export default function UserQuotes({ quotes }: { quotes: UserQuote[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {quotes.map((q, i) => (
        <QuoteCard key={q.name} q={q} delay={i * CARD_GAP_MS} />
      ))}
    </div>
  );
}
