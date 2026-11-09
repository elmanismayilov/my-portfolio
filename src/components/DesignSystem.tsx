"use client";

import { useEffect, useRef, useState } from "react";

/* ---------- data (mirrors the Figma variable collections) ---------- */

const STEPS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"] as const;

const PRIMITIVES: Record<string, string[]> = {
  Violet: ["E4E4F4", "CDCDFF", "B4B4FF", "9292FF", "7D7DFF", "5D5DFF", "5555EB", "4242B5", "33338C", "27276B"],
  Green: ["DDF8F5", "BBF2EC", "9BEBE3", "6DE2D7", "51DDCF", "25D4C3", "22C1B1", "1A978A", "14756B", "105952"],
  Yellow: ["FEF1E0", "FDE4C1", "FCD7A3", "FBC479", "FAB95F", "F9A737", "E39832", "B17727", "895C1E", "694617"],
  Red: ["F3DDE5", "FEC9D2", "FEAFBC", "FD889D", "FD758A", "FC526D", "E54B63", "B33A4D", "8B2D3C", "6A222E"],
  Indigo: ["DAF2F7", "B6E6EF", "92D9E8", "61C8DD", "42BDD6", "13ADCC", "119DBA", "0D7B91", "0A5F70", "084956"],
  Burgundy: ["F3DDE5", "E8BACC", "DD98B3", "CD6990", "C34C78", "B41F5A", "A41C52", "801640", "631132", "4C0D26"],
  Blue: ["DBE7F5", "B6CFEB", "93B8E2", "6298D5", "4484CD", "1565C0", "135CAF", "0F4888", "0C386A", "092A51"],
  Grey: ["FFFFFF", "F3F3F3", "E7E7E7", "DFDFDF", "898E99", "6B7280", "616874", "282635", "1A1922", "0D0C12"],
};

/** "Grey/50" → "#FFFFFF" */
function hex(ref: string) {
  const [group, step] = ref.split("/");
  return `#${PRIMITIVES[group][STEPS.indexOf(step as (typeof STEPS)[number])]}`;
}

type Token = { name: string; light: string; dark: string };
const TOKEN_GROUPS: { group: string; tokens: Token[] }[] = [
  {
    group: "Surface",
    tokens: [
      { name: "Main BG", light: "Grey/50", dark: "Grey/900" },
      { name: "Secondary BG", light: "Grey/100", dark: "Grey/800" },
      { name: "Tertiary BG", light: "Grey/200", dark: "Grey/300" },
    ],
  },
  {
    group: "Label",
    tokens: [
      { name: "Primary", light: "Grey/800", dark: "Grey/50" },
      { name: "Secondary", light: "Grey/500", dark: "Grey/300" },
      { name: "Tertiary", light: "Grey/400", dark: "Grey/400" },
      { name: "Indicator text", light: "Grey/50", dark: "Grey/800" },
      { name: "Text on color", light: "Grey/50", dark: "Grey/50" },
    ],
  },
  {
    group: "Divider",
    tokens: [
      { name: "Divider", light: "Grey/300", dark: "Grey/700" },
      { name: "On color · hys", light: "Violet/400", dark: "Violet/400" },
      { name: "Progress · hys", light: "Violet/200", dark: "Violet/200" },
    ],
  },
  {
    group: "Status",
    tokens: [
      { name: "Aktiv", light: "Green/700", dark: "Green/500" },
      { name: "Dondurulmuş", light: "Indigo/500", dark: "Indigo/500" },
      { name: "Bitmiş", light: "Grey/400", dark: "Grey/400" },
      { name: "Xitam", light: "Red/600", dark: "Red/500" },
      { name: "Ləğv olunmuş", light: "Grey/700", dark: "Grey/300" },
      { name: "Təsdiqdə", light: "Yellow/500", dark: "Yellow/500" },
    ],
  },
  {
    group: "Indicator",
    tokens: [
      { name: "Badge BG", light: "Red/500", dark: "Red/500" },
      { name: "Badge text", light: "Grey/50", dark: "Grey/50" },
    ],
  },
  {
    group: "Info",
    tokens: [
      { name: "Background", light: "Yellow/100", dark: "Yellow/100" },
      { name: "Icon color", light: "Yellow/500", dark: "Yellow/500" },
      { name: "Text on color", light: "Grey/800", dark: "Grey/800" },
    ],
  },
  {
    group: "Button · Blur",
    tokens: [
      { name: "Button · On color", light: "Grey/100", dark: "Grey/100" },
      { name: "Blur gradient · HYS", light: "Violet/300", dark: "Violet/300" },
    ],
  },
];

/* ---------- helpers ---------- */

/** true once the element has scrolled into view (and stays true). */
function useInView<T extends Element>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

const FADE = "background-color 500ms ease, color 500ms ease, border-color 500ms ease";

/* ---------- 1. primitives ---------- */

function Primitives() {
  const [ref, seen] = useInView<HTMLDivElement>(0.2);
  const [active, setActive] = useState<{ ref: string; hex: string } | null>(null);

  return (
    <div ref={ref}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-mono text-xs uppercase tracking-wide text-muted">
          01 · Primitives — 80 colors, 8 palettes × 10 steps
        </h3>
        <p className="min-h-4 font-mono text-xs uppercase tracking-wide tabular-nums" aria-live="polite">
          {active ? `${active.ref} · ${active.hex}` : "Hover a swatch"}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-[3.75rem_repeat(10,minmax(0,1fr))] items-center gap-x-1 gap-y-1 md:grid-cols-[5rem_repeat(10,minmax(0,1fr))] md:gap-x-1.5 md:gap-y-1.5">
        <span aria-hidden />
        {STEPS.map((s) => (
          <span key={s} className="text-center font-mono text-[9px] text-muted md:text-[10px]">
            {s}
          </span>
        ))}
        {Object.entries(PRIMITIVES).map(([group, colors], row) => (
          <div key={group} className="contents">
            <span className="font-mono text-[10px] uppercase tracking-wide text-muted md:text-xs">{group}</span>
            {colors.map((c, col) => (
              <button
                key={STEPS[col]}
                type="button"
                aria-label={`${group} ${STEPS[col]} #${c}`}
                onMouseEnter={() => setActive({ ref: `${group}/${STEPS[col]}`, hex: `#${c}` })}
                onFocus={() => setActive({ ref: `${group}/${STEPS[col]}`, hex: `#${c}` })}
                onMouseLeave={() => setActive(null)}
                onBlur={() => setActive(null)}
                className="aspect-square w-full rounded-md ring-1 ring-white/10 transition-transform duration-200 hover:z-10 hover:scale-125 focus-visible:scale-125"
                style={{
                  backgroundColor: `#${c}`,
                  opacity: seen ? 1 : 0,
                  transform: seen ? undefined : "scale(0.4)",
                  transition: "opacity 450ms ease-out, transform 450ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transitionDelay: seen ? `${row * 70 + col * 35}ms` : "0ms",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 2. tokens ---------- */

function Tokens() {
  const [ref, seen] = useInView<HTMLDivElement>(0.35);
  const [mode, setMode] = useState<"light" | "dark">("light");
  const touched = useRef(false);

  // once, when it scrolls into view: flip to dark to show that the same tokens re-map
  useEffect(() => {
    if (!seen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => {
      if (!touched.current) setMode("dark");
    }, 1600);
    return () => window.clearTimeout(t);
  }, [seen]);

  const pick = (m: "light" | "dark") => {
    touched.current = true;
    setMode(m);
  };

  const t = (group: string, name: string) => {
    const tok = TOKEN_GROUPS.find((g) => g.group === group)!.tokens.find((x) => x.name === name)!;
    return hex(tok[mode]);
  };

  const statuses = ["Aktiv", "Dondurulmuş", "Bitmiş", "Xitam", "Ləğv olunmuş", "Təsdiqdə"];
  const progress = 62;

  return (
    <div ref={ref}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="font-mono text-xs uppercase tracking-wide text-muted">
          02 · Tokens — 24 semantic colors, each with Light and Dark values
        </h3>
        <div role="radiogroup" aria-label="Theme" className="flex rounded-full border border-line p-1 font-mono text-xs uppercase tracking-wide">
          {(["light", "dark"] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={mode === m}
              onClick={() => pick(m)}
              className={`rounded-full px-4 py-1.5 transition-colors duration-300 ${
                mode === m ? "bg-foreground text-background" : "text-muted hover:text-foreground"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* live preview: every color below comes from a token */}
        <div
          className="rounded-3xl p-4 md:p-6"
          style={{ backgroundColor: t("Surface", "Main BG"), transition: FADE }}
          aria-label={`Preview of the app in ${mode} theme`}
        >
          <div
            className="rounded-2xl p-5"
            style={{ backgroundColor: t("Surface", "Secondary BG"), transition: FADE }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-semibold" style={{ color: t("Label", "Primary"), transition: FADE }}>
                  Həyatın Yaşam Sığortası
                </p>
                <p className="mt-0.5 text-sm" style={{ color: t("Label", "Secondary"), transition: FADE }}>
                  Müqavilə № 482915
                </p>
              </div>
              <span
                className="grid h-6 min-w-6 place-items-center rounded-full px-1.5 text-xs font-semibold"
                style={{
                  backgroundColor: t("Indicator", "Badge BG"),
                  color: t("Indicator", "Badge text"),
                  transition: FADE,
                }}
              >
                3
              </span>
            </div>

            {/* progress */}
            <div
              className="mt-5 h-1.5 overflow-hidden rounded-full"
              style={{ backgroundColor: t("Divider", "Progress · hys"), transition: FADE }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: seen ? `${progress}%` : "0%",
                  backgroundColor: t("Divider", "On color · hys"),
                  transition: `width 1400ms cubic-bezier(0.22, 1, 0.36, 1) 300ms, ${FADE}`,
                }}
              />
            </div>
            <p className="mt-2 text-xs" style={{ color: t("Label", "Tertiary"), transition: FADE }}>
              500 gün qalıb
            </p>

            <div className="my-5 h-px" style={{ backgroundColor: t("Divider", "Divider"), transition: FADE }} />

            {/* statuses */}
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {statuses.map((s) => (
                <li key={s} className="flex items-center gap-1.5 text-sm" style={{ color: t("Status", s), transition: FADE }}>
                  <span
                    aria-hidden
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: t("Status", s), transition: FADE }}
                  />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* info banner */}
          <div
            className="mt-3 flex items-center gap-3 rounded-2xl px-4 py-3"
            style={{ backgroundColor: t("Info", "Background"), transition: FADE }}
          >
            <span
              aria-hidden
              className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
              style={{ backgroundColor: t("Info", "Icon color"), transition: FADE }}
            >
              !
            </span>
            <p className="text-sm" style={{ color: t("Info", "Text on color"), transition: FADE }}>
              Çatışmayan sənəd var
            </p>
          </div>
        </div>

        {/* the tokens, with the primitive each one points to */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {TOKEN_GROUPS.map(({ group, tokens }) => (
            <div key={group}>
              <p className="font-mono text-xs uppercase tracking-wide text-muted">{group}</p>
              <ul className="mt-2">
                {tokens.map((tok) => (
                  <li key={tok.name} className="flex items-center gap-3 border-t border-line py-2 text-sm">
                    <span
                      aria-hidden
                      className="h-4 w-4 shrink-0 rounded-[5px] ring-1 ring-white/15"
                      style={{ backgroundColor: hex(tok[mode]), transition: FADE }}
                    />
                    <span className="flex-1 truncate">{tok.name}</span>
                    <span className="font-mono text-xs text-muted tabular-nums">{tok[mode]}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Foundations of the design system: color primitives and the semantic tokens built from them. */
export default function DesignSystem() {
  return (
    <div className="space-y-16 md:space-y-24">
      <Primitives />
      <Tokens />
    </div>
  );
}
