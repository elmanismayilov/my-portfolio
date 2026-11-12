import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getSite } from "@/lib/localize";
import ContactBlock from "./ContactBlock";
import ContactMenu from "./ContactMenu";

export default function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const site = getSite(locale);
  return (
    <footer id="contact" className="mt-auto border-t border-line bg-surface text-foreground">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 pb-8 md:px-10 md:pt-28">
        <p className="font-mono text-xs uppercase tracking-wide opacity-60">
          {dict.footer.letsWork}
        </p>
        <ContactMenu variant="footer" mailto={site.mailto} />

        <ContactBlock />

        <div className="mt-16 border-t border-line pt-6 font-mono text-xs uppercase tracking-wide md:mt-20">
          <p className="opacity-60">
            © {new Date().getFullYear()} <span lang="en">{site.name}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
