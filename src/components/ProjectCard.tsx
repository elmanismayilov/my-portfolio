import Image from "next/image";
import Link from "next/link";
import { localeHref, type Locale } from "@/lib/i18n/config";
import type { LocalizedProject } from "@/lib/localize";
import StatusCover from "./StatusCover";

/** Ad-style ticker over the empty top of a cover: one bold line sliding sideways. */
function Marquee({ text }: { text: string }) {
  const copy = Array.from({ length: 3 }, (_, i) => (
    <span key={i} className="pr-[1.2em]">
      {text} ✦
    </span>
  ));
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 flex h-[24%] items-center overflow-hidden text-[#1c1c1c]"
    >
      <div className="marquee-track marquee-right text-[6.5cqw] leading-none font-black tracking-tight whitespace-nowrap uppercase">
        <div className="flex shrink-0">{copy}</div>
        <div className="flex shrink-0">{copy}</div>
      </div>
    </div>
  );
}

export default function ProjectCard({
  project,
  index,
  locale,
}: {
  project: LocalizedProject;
  index: number;
  locale: Locale;
}) {
  return (
    <Link href={localeHref(locale, `/work/${project.slug}`)} className="group block">
      <div
        className="relative aspect-[4/3] overflow-hidden [container-type:inline-size]"
        style={{ backgroundColor: project.tone }}
      >
        {project.glow && (
          <div aria-hidden className="cover-glow absolute inset-0">
            <span className="cover-glow-a" />
            <span className="cover-glow-b" />
            <span className="cover-glow-c" />
          </div>
        )}
        {project.cover === "status" ? (
          // live cover: the animated status timeline from the case study
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
            <StatusCover />
          </div>
        ) : project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            placeholder="blur"
            quality={95}
            sizes="(max-width: 768px) 135vw, 70vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105">
            <span className="text-5xl font-semibold tracking-tighter uppercase mix-blend-difference text-white/80 md:text-7xl">
              {project.title}
            </span>
          </div>
        )}
        {project.marquee && <Marquee {...project.marquee} />}
        <span className="absolute top-4 left-4 font-mono text-xs text-white mix-blend-difference">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4 border-t border-line pt-3">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-medium tracking-tight">
            {project.title}
            <span
              aria-hidden
              className="-translate-x-2 text-accent opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100"
            >
              ↗
            </span>
          </h3>
          <p className="mt-1 text-sm text-muted">{project.description}</p>
        </div>
        <div className="shrink-0 text-right font-mono text-xs uppercase tracking-wide text-muted">
          <p>{project.category}</p>
          <p>{project.year}</p>
        </div>
      </div>
    </Link>
  );
}
