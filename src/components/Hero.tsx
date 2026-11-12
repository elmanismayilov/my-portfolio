import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getSite } from "@/lib/localize";
import LocalClock from "./LocalClock";

/** Same outline button as "Contact now" in the header: the text rolls up while a copy rises from below. */
function OutlineButton({
  href,
  children,
  download,
  external,
}: {
  href: string;
  children: string;
  download?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      download={download}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="group inline-block rounded-full border border-foreground px-4 py-2 font-mono text-xs tracking-wide uppercase"
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
    </a>
  );
}

export default function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const site = getSite(locale);
  const [first, ...rest] = site.name.split(" ");
  const linkedin = site.socials.find((s) => s.label === "LinkedIn"); // same link as in the footer

  return (
    <section id="top" className="mx-auto w-full max-w-[1440px] px-6 pt-12 pb-6 md:px-8 md:pt-16 md:pb-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-baseline-last lg:gap-8">
        <h1 lang="en" className="rise text-[17vw] leading-[0.85] font-black tracking-tighter uppercase sm:text-8xl lg:col-span-8 lg:text-9xl xl:text-[10rem]">
          {first}
          <br />
          {rest.join(" ")}
        </h1>

        <div className="rise lg:col-span-4 lg:justify-self-end" style={{ "--d": "250ms" } as React.CSSProperties}>
          <p className="max-w-sm text-xl leading-snug font-medium tracking-tight md:text-2xl">
            {dict.hero.tagline}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted md:text-base">
            {dict.hero.intro}
          </p>
          <p className="mt-6 flex items-center gap-2 text-xs font-medium tracking-wide uppercase">
            <span className="h-2 w-2 animate-[blink_2s_ease-in-out_infinite] rounded-full bg-accent" />
            {dict.hero.available}
          </p>
          <LocalClock className="mt-2 block pl-4 font-mono text-xs tracking-wide text-muted uppercase" />

          <div className="mt-6 flex flex-wrap gap-3">
            <OutlineButton href="/cv.pdf" download="Elman-Ismayilov-CV.pdf">
              {dict.hero.downloadCv}
            </OutlineButton>
            {linkedin && (
              <OutlineButton href={linkedin.href} external>
                LinkedIn
              </OutlineButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
