import Image from "next/image";
import { statValues } from "@/lib/content";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
import heroImage from "../../public/portrait.jpg";

export default function About({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <section id="about" className="mx-auto max-w-[1440px] px-5 pt-10 pb-20 md:px-10 md:pt-12 md:pb-28">
      <SectionLabel index="02" title={dict.about.title} />

      <div className="mt-12 grid grid-cols-12 gap-4">
        <Reveal className="group relative col-span-12 aspect-[3/4] overflow-hidden bg-surface md:col-span-3">
          <Image
            src={heroImage}
            alt={dict.about.portraitAlt}
            fill
            placeholder="blur"
            quality={95}
            // The landscape source is cropped to a portrait box, so request ~2.4x the box width
            sizes="(max-width: 768px) 240vw, 60vw"
            className="object-cover object-[55%_15%] brightness-[0.82] grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-100"
          />
        </Reveal>

        <div className="col-span-12 md:col-span-8 md:col-start-5">
          <Reveal delay={100}>
            <p className="text-3xl leading-[1.1] font-medium tracking-tight md:text-5xl">
              {dict.about.lead}
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-muted md:text-xl">
              {dict.about.body}
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-3 gap-4 border-t border-line pt-6">
            {statValues.map((value, i) => (
              <Reveal key={value} delay={i * 120}>
                <p className="text-4xl font-semibold tracking-tighter md:text-6xl">{value}</p>
                <p className="mt-2 font-mono text-xs uppercase tracking-wide text-muted">
                  {dict.about.stats[i]}
                </p>
              </Reveal>
            ))}
          </div>

          <ul className="mt-14 border-t border-line">
            {dict.about.services.map((service, i) => (
              <li key={service}>
                <Reveal
                  delay={i * 80}
                  className="group flex items-baseline justify-between border-b border-line py-4"
                >
                  <span className="text-xl tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-2 md:text-2xl">
                    {service}
                  </span>
                  <span className="font-mono text-xs text-muted transition-colors duration-500 group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
