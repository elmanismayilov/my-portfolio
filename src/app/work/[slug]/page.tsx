import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import PayoutMorph from "@/components/PayoutMorph";
import FlowReveal from "@/components/FlowReveal";
import StatusTimeline from "@/components/StatusTimeline";
import ImpactChart from "@/components/ImpactChart";
import CardsShowcase from "@/components/CardsShowcase";
import CountStat from "@/components/CountStat";
import SectionLabel from "@/components/SectionLabel";
import SummaryResults from "@/components/SummaryResults";
import UserQuotes from "@/components/UserQuotes";
import DesignSystem from "@/components/DesignSystem";
import NewProductShowcase from "@/components/NewProductShowcase";
import UsersByProduct from "@/components/UsersByProduct";
import EdgeCases from "@/components/EdgeCases";
import NextSteps from "@/components/NextSteps";
import Glossary from "@/components/Glossary";
import DecisionTable from "@/components/DecisionTable";
import BeforeAfter from "@/components/BeforeAfter";
import NpsResults from "@/components/NpsResults";
import Foundations from "@/components/Foundations";
import CashmateDemo from "@/components/CashmateDemo";
import { projects, site } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: `${project.title} — ${site.name}`, description: project.description };
}

/** Renders **bold** segments inside a plain string. */
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 ? (
          <strong key={i} className="font-semibold text-foreground">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

function BackLink({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/#work"
      className={`group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide ${className}`}
    >
      <span
        aria-hidden
        className="transition-transform duration-300 ease-out group-hover:-translate-x-1"
      >
        ←
      </span>
      <span className="link-line pb-0.5">All work</span>
    </Link>
  );
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const sections = project.sections ?? [];

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1440px] px-5 pt-8 pb-20 md:px-10 md:pt-10 md:pb-28">
        <BackLink />

        <div className="rise mt-10 md:mt-14">
          <h1 className="max-w-[18ch] text-5xl leading-[0.95] font-black tracking-tighter uppercase sm:text-6xl md:text-7xl lg:text-8xl">
            {project.title}
          </h1>
          <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-line pt-4 font-mono text-xs uppercase tracking-wide md:grid-cols-4">
            <div>
              <dt className="text-muted">Category</dt>
              <dd className="mt-1">{project.category}</dd>
            </div>
            <div>
              <dt className="text-muted">Year</dt>
              <dd className="mt-1">{project.year}</dd>
            </div>
          </dl>
        </div>

        {project.summary && (
          <section className="mt-16 md:mt-24" aria-label="Project summary">
            <div className="grid grid-cols-12 gap-x-4 gap-y-10">
              <dl className="col-span-12 md:col-span-8 md:col-start-4">
                {project.summary.facts.map((fact, i) => (
                  <Reveal
                    key={fact.label}
                    delay={i * 80}
                    className="grid grid-cols-1 gap-2 border-t border-line py-6 md:grid-cols-8 md:gap-4"
                  >
                    <dt className="font-mono text-xs uppercase tracking-wide text-muted md:col-span-2">
                      {fact.label}
                    </dt>
                    <dd className="text-lg leading-relaxed text-foreground md:col-span-6 md:text-xl">
                      <RichText text={fact.value} />
                    </dd>
                  </Reveal>
                ))}
                {project.summary.results && (
                  <Reveal className="grid grid-cols-1 gap-2 border-t border-line py-6 md:grid-cols-8 md:gap-4">
                    <dt className="font-mono text-xs uppercase tracking-wide text-muted md:col-span-2">
                      Results
                    </dt>
                    <dd className="md:col-span-6">
                      <p className="text-lg leading-relaxed text-muted md:text-xl">
                        {project.summary.resultsTitle}
                      </p>
                      <SummaryResults results={project.summary.results} />
                    </dd>
                  </Reveal>
                )}
              </dl>
            </div>
          </section>
        )}

        {sections.length === 0 && (
          <p className="mt-24 font-mono text-xs uppercase tracking-wide text-muted">
            Case study coming soon.
          </p>
        )}

        {sections.map((section, i) => (
          <section key={section.label} className="mt-20 md:mt-28">
            <SectionLabel index={String(i + 1).padStart(2, "0")} title={section.label} />

            <div className="mt-12 grid grid-cols-12 gap-x-4 gap-y-10">
              <Reveal className="col-span-12 md:col-span-8 md:col-start-4">
                <h2 className="text-3xl leading-[1.1] font-medium tracking-tight md:text-5xl">
                  {section.title}
                </h2>
              </Reveal>

              <div className="col-span-12 md:col-span-8 md:col-start-4">
                {section.blocks.map((block, j) => (
                  <Reveal
                    key={block.heading}
                    delay={j * 80}
                    className="grid grid-cols-1 gap-2 border-t border-line py-6 md:grid-cols-8 md:gap-4"
                  >
                    <h3 className="font-mono text-xs uppercase tracking-wide text-muted md:col-span-2">
                      {block.heading}
                    </h3>
                    <p className="text-lg leading-relaxed text-muted md:col-span-6 md:text-xl">
                      <RichText text={block.text} />
                    </p>
                  </Reveal>
                ))}
              </div>

              {(section.tallShot || section.flowReveal) && (
                <div className="col-span-12 grid grid-cols-1 items-start gap-x-4 gap-y-10 md:grid-cols-[3fr_8fr]">
                  {section.tallShot && (
                    <Reveal>
                      <div className="relative mx-auto aspect-[5/9] w-full max-w-[420px] overflow-hidden rounded-[28px] ring-1 ring-line md:max-w-none">
                        <Image
                          src={section.tallShot.image}
                          alt={section.tallShot.alt}
                          placeholder="blur"
                          quality={92}
                          sizes="(max-width: 768px) 90vw, 30vw"
                          className="h-auto w-full"
                        />
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-background to-transparent"
                        />
                      </div>
                      {section.tallShot.caption && (
                        <p className="mt-3 font-mono text-xs uppercase tracking-wide text-muted">
                          {section.tallShot.caption}
                        </p>
                      )}
                    </Reveal>
                  )}

                  {section.flowReveal && (
                    <FlowReveal
                      image={section.flowReveal.image}
                      alt={section.flowReveal.alt}
                      caption={section.flowReveal.caption}
                    />
                  )}
                </div>
              )}

              {section.quotes && (
                <div className="col-span-12">
                  <UserQuotes quotes={section.quotes} />
                  <p className="mt-3 font-mono text-xs uppercase tracking-wide text-muted">
                    Illustrative quotes — names are fictional.
                  </p>
                </div>
              )}

              {section.stat && (
                <Reveal className="col-span-12">
                  <CountStat {...section.stat} />
                </Reveal>
              )}

              {section.reveal && (
                <div className="col-span-12">
                  <FlowReveal
                    image={section.reveal.image}
                    alt={section.reveal.alt}
                    caption={section.reveal.caption}
                    tiles={section.reveal.tiles}
                    fills={section.reveal.fills}
                    w={section.reveal.w}
                    h={section.reveal.h}
                    bg={section.reveal.bg}
                  />
                </div>
              )}

              {section.impactChart && (
                <div className="col-span-12">
                  <ImpactChart />
                </div>
              )}

              {section.statusTimeline && (
                <div className="col-span-12">
                  <StatusTimeline
                    image={section.statusTimeline.image}
                    alt={section.statusTimeline.alt}
                    caption={section.statusTimeline.caption}
                  />
                </div>
              )}

              {section.payoutMorph && (
                <Reveal className="col-span-12">
                  <PayoutMorph before={section.payoutMorph.before} after={section.payoutMorph.after} />
                </Reveal>
              )}

              {section.usersByProduct && project.summary?.results && (
                <div className="col-span-12">
                  <UsersByProduct results={project.summary.results} {...section.usersByProduct} />
                </div>
              )}

              {section.edgeCases && (
                <div className="col-span-12">
                  <EdgeCases />
                </div>
              )}

              {section.nextSteps && (
                <div className="col-span-12">
                  <NextSteps {...section.nextSteps} />
                </div>
              )}

              {section.newProduct && (
                <div className="col-span-12">
                  <NewProductShowcase {...section.newProduct} />
                </div>
              )}

              {section.foundations && (
                <div className="col-span-12">
                  <Foundations />
                </div>
              )}

              {section.cashmateDemo && (
                <div className="col-span-12">
                  <CashmateDemo />
                </div>
              )}

              {section.designSystem && (
                <div className="col-span-12">
                  <DesignSystem />
                </div>
              )}

              {section.gallery && (
                <div
                  className={`col-span-12 mx-auto grid w-full grid-cols-1 gap-4 ${
                    section.galleryCols === 1 ? "md:grid-cols-1" : "md:grid-cols-2"
                  }`}
                  style={{ maxWidth: section.maxWidth }}
                >
                  {section.gallery.map((item, k) => (
                    <Reveal key={item.caption ?? k} delay={k * 120}>
                      {item.cards ? (
                        <CardsShowcase />
                      ) : (
                      <div
                        className={`overflow-hidden ${item.video ? "aspect-video bg-black" : "bg-surface"} ${
                          item.selected ? "ring-2 ring-foreground" : ""
                        }`}
                      >
                        {item.video ? (
                          <video
                            src={item.video}
                            aria-label={item.alt}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          item.image && (
                            <Image
                              src={item.image}
                              alt={item.alt}
                              placeholder="blur"
                              quality={95}
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="h-auto w-full"
                            />
                          )
                        )}
                      </div>
                      )}
                      {item.caption && (
                        <p className="mt-3 flex items-center gap-3 font-mono text-xs uppercase tracking-wide text-muted">
                          {item.caption}
                          {item.selected && (
                            <span className="rounded-full bg-foreground px-2.5 py-1 text-background">
                              ✓ Selected
                            </span>
                          )}
                        </p>
                      )}
                    </Reveal>
                  ))}
                </div>
              )}

              {section.image && (
                <Reveal className="col-span-12">
                  <div className="mx-auto" style={{ maxWidth: section.maxWidth }}>
                  <div
                    className={`relative overflow-hidden ${section.glow ? "bg-[#05050a]" : "bg-surface"}`}
                  >
                    {section.glow && (
                      <div aria-hidden className="cover-glow absolute inset-0">
                        <span className="cover-glow-a" />
                        <span className="cover-glow-b" />
                        <span className="cover-glow-c" />
                      </div>
                    )}
                    <Image
                      src={section.image}
                      alt={section.imageAlt ?? section.title}
                      placeholder="blur"
                      quality={95}
                      sizes="100vw"
                      className="relative h-auto w-full"
                    />
                  </div>
                  {section.caption && (
                    <p className="mt-3 font-mono text-xs uppercase tracking-wide text-muted">
                      {section.caption}
                    </p>
                  )}
                  </div>
                </Reveal>
              )}

              {section.decisions && (
                <div className="col-span-12">
                  <DecisionTable decisions={section.decisions} />
                </div>
              )}

              {section.beforeAfter && (
                <div className="col-span-12">
                  <BeforeAfter fixes={section.beforeAfter} />
                </div>
              )}

              {section.npsResults && (
                <div className="col-span-12">
                  <NpsResults />
                </div>
              )}

              {section.glossary && (
                <div className="col-span-12">
                  <Glossary items={section.glossary} />
                </div>
              )}
            </div>
          </section>
        ))}

        <div className="mt-24 border-t border-line pt-6 md:mt-32">
          <BackLink />
        </div>
      </main>
      <Footer />
    </>
  );
}
