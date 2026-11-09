import { site } from "@/lib/content";
import ContactBlock from "./ContactBlock";

export default function Footer() {
  return (
    <footer id="contact" className="mt-auto border-t border-line bg-surface text-foreground">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 pb-8 md:px-10 md:pt-28">
        <p className="font-mono text-xs uppercase tracking-wide opacity-60">
          03 — Let&apos;s work together
        </p>
        <a
          href={site.mailto}
          className="mt-6 block text-[11vw] leading-[0.9] font-semibold tracking-[-0.05em] uppercase transition-colors hover:text-accent focus-ring md:text-[8vw] 2xl:text-[120px]"
        >
          Get in touch <span aria-hidden>↗</span>
          <span className="sr-only"> — opens your email app</span>
        </a>

        <ContactBlock />

        <div className="mt-16 border-t border-line pt-6 font-mono text-xs uppercase tracking-wide md:mt-20">
          <p className="opacity-60">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
