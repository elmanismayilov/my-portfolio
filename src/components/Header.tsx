import { nav, site } from "@/lib/content";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 items-center gap-4 px-5 py-4 font-mono text-xs uppercase tracking-wide md:px-10">
        <a href="/" className="col-span-5 font-sans text-sm font-semibold tracking-tight md:col-span-3">
          {site.name}
        </a>
        <a
          href={`mailto:${site.email}`}
          className="hidden text-muted transition-colors hover:text-foreground md:col-span-5 md:block"
        >
          {site.email}
        </a>
        <div className="col-span-7 flex items-center justify-end gap-5 md:col-span-4 md:gap-6">
          <nav className="hidden gap-6 lg:flex">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="link-line pb-0.5">
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={site.mailto}
            className="group inline-flex min-h-11 items-center rounded-full border border-foreground px-4 focus-ring"
          >
            {/* Text rolls up out of view while a copy rises from below (motion-safe only) */}
            <span className="relative block overflow-hidden">
              <span className="block motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover:-translate-y-full">
                Get in touch
              </span>
              <span
                aria-hidden
                className="absolute inset-0 block translate-y-full motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover:translate-y-0"
              >
                Get in touch
              </span>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
