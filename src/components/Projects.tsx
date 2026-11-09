import { projects } from "@/lib/content";
import ProjectCard from "./ProjectCard";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <section id="work" className="mx-auto max-w-[1440px] px-5 pt-6 pb-10 md:px-10 md:pt-8 md:pb-12">
      <SectionLabel index="01" title="Selected Work" aside={`(${projects.length})`} />
      <div className="mt-12 grid grid-cols-1 gap-x-4 gap-y-14 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 2) * 120}>
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
