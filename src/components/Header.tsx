import { navLinks } from "@/lib/content";
import { localeHref, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getSite } from "@/lib/localize";
import ContactMenu from "./ContactMenu";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const site = getSite(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 items-center gap-4 px-5 py-4 font-mono text-xs uppercase tracking-wide md:px-10">
        <a
          href={localeHref(locale, "/")}
          aria-label={`${site.name} — ${dict.header.home}`}
          lang="en" // the name is Latin: Azerbaijani casing rules would turn "i" into "İ" in uppercase
          className="col-span-4 font-sans text-sm font-semibold tracking-tight md:col-span-3"
        >
          {site.name}
        </a>
        <a
          href={`mailto:${site.email}`}
          lang="en"
          className="hidden text-muted transition-colors hover:text-foreground md:col-span-4 md:block"
        >
          {site.email}
        </a>
        <div className="col-span-8 flex items-center justify-end gap-3 md:col-span-5 md:gap-6">
          <nav className="hidden gap-6 lg:flex">
            {navLinks.map((item) => (
              <a key={item.href} href={localeHref(locale, item.href)} className="link-line pb-0.5">
                {dict.nav[item.key]}
              </a>
            ))}
          </nav>

          <LanguageSwitcher />

          <ContactMenu variant="header" mailto={site.mailto} />
        </div>
      </div>
    </header>
  );
}
