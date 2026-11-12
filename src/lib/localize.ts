import { mailtoLink, projects, site, type CaseSection, type Project } from "./content";
import type { Locale } from "./i18n/config";
import { getDictionary } from "./i18n/dictionaries";
import az from "./translations/az";
import ru from "./translations/ru";
import type { ProjectText, SectionText, Translation } from "./translations/types";

const translations: Partial<Record<Locale, Translation>> = { ru, az };

/** A glossary row: the Azerbaijani interface text and its translation into the page language. */
export type GlossaryItem = { az: string; text: string };

export type LocalizedSection = Omit<CaseSection, "glossary"> & { glossary?: GlossaryItem[] };
export type LocalizedProject = Omit<Project, "sections"> & { sections?: LocalizedSection[] };

/** Fails loudly (at build time) when a translation drifts out of step with the English source. */
function check(where: string, expected: number, actual: number) {
  if (expected !== actual) {
    throw new Error(`[i18n] ${where}: the English source has ${expected} item(s), the translation has ${actual}`);
  }
}

function localizeSection(en: CaseSection, t: SectionText, where: string, locale: Locale): LocalizedSection {
  check(`${where} blocks`, en.blocks.length, t.blocks.length);
  const out: LocalizedSection = {
    ...en,
    glossary: undefined,
    label: t.label,
    title: t.title,
    blocks: en.blocks.map((_, i) => ({ heading: t.blocks[i][0], text: t.blocks[i][1] })),
  };
  if (t.imageAlt !== undefined) out.imageAlt = t.imageAlt;
  if (t.caption !== undefined) out.caption = t.caption;

  if (en.gallery) {
    check(`${where} gallery`, en.gallery.length, t.gallery?.length ?? 0);
    out.gallery = en.gallery.map((g, i) => ({ ...g, alt: t.gallery![i].alt, caption: t.gallery![i].caption }));
  }

  // The glossary translates Azerbaijani interface text. Azerbaijani visitors do not need it.
  if (en.glossary && locale !== "az") {
    const tr = t.glossary;
    check(`${where} glossary`, en.glossary.length, tr?.length ?? 0);
    out.glossary = en.glossary.map((g, i) => ({ az: g.az, text: tr![i] }));
  }

  if (en.quotes) {
    check(`${where} quotes`, en.quotes.length, t.quotes?.length ?? 0);
    out.quotes = en.quotes.map((q, i) => ({
      ...q,
      problem: t.quotes![i].problem,
      translation: locale === "az" ? undefined : t.quotes![i].translation,
    }));
  }

  if (en.reveal) {
    if (!t.reveal) throw new Error(`[i18n] ${where}: missing reveal`);
    out.reveal = { ...en.reveal, alt: t.reveal.alt, caption: t.reveal.caption };
  }

  if (en.decisions) {
    check(`${where} decisions`, en.decisions.length, t.decisions?.length ?? 0);
    out.decisions = en.decisions.map((d, i) => {
      const td = t.decisions![i];
      check(`${where} decision ${i} options`, d.options.length, td.options.length);
      return {
        question: td.question,
        options: d.options.map((o, k) => ({ ...o, name: td.options[k].name, note: td.options[k].note })),
      };
    });
  }

  if (en.beforeAfter) {
    check(`${where} beforeAfter`, en.beforeAfter.length, t.beforeAfter?.length ?? 0);
    out.beforeAfter = en.beforeAfter.map((f, i) => {
      const tf = t.beforeAfter![i];
      return {
        ...f,
        title: tf.title,
        note: tf.note,
        before: { ...f.before, alt: tf.beforeAlt },
        after: { ...f.after, alt: tf.afterAlt },
      };
    });
  }

  if (en.nextSteps) {
    const ideas = t.nextSteps?.ideas ?? [];
    check(`${where} nextSteps`, en.nextSteps.ideas.length, ideas.length);
    out.nextSteps = { ...en.nextSteps, ideas };
  }

  if (en.usersByProduct) {
    if (!t.usersByProduct) throw new Error(`[i18n] ${where}: missing usersByProduct`);
    out.usersByProduct = t.usersByProduct;
  }

  if (en.newProduct) {
    if (!t.newProduct) throw new Error(`[i18n] ${where}: missing newProduct`);
    out.newProduct = { ...en.newProduct, ...t.newProduct };
  }

  if (en.payoutMorph) {
    if (!t.payoutMorph) throw new Error(`[i18n] ${where}: missing payoutMorph`);
    out.payoutMorph = {
      before: { ...en.payoutMorph.before, ...t.payoutMorph.before, caption: t.payoutMorph.before.caption ?? "" },
      after: { ...en.payoutMorph.after, ...t.payoutMorph.after, caption: t.payoutMorph.after.caption ?? "" },
    };
  }

  for (const key of ["statusTimeline", "tallShot", "flowReveal"] as const) {
    if (en[key]) {
      const tv = t[key];
      if (!tv) throw new Error(`[i18n] ${where}: missing ${key}`);
      out[key] = { ...en[key]!, alt: tv.alt, caption: tv.caption };
    }
  }

  return out;
}

function localizeProject(en: Project, t: ProjectText, locale: Locale): LocalizedProject {
  const where = en.slug;
  const sections = en.sections ?? [];
  check(`${where} sections`, sections.length, t.sections.length);

  const summary = en.summary
    ? (() => {
        check(`${where} summary facts`, en.summary.facts.length, t.summary.facts.length);
        return {
          ...en.summary,
          facts: en.summary.facts.map((_, i) => ({ label: t.summary.facts[i][0], value: t.summary.facts[i][1] })),
          resultsTitle: en.summary.resultsTitle ? t.summary.resultsTitle : undefined,
        };
      })()
    : undefined;

  return {
    ...en,
    title: t.title,
    category: t.category,
    description: t.description,
    marquee: en.marquee ? { text: t.marquee ?? en.marquee.text } : undefined,
    summary,
    sections: sections.map((s, i) => localizeSection(s, t.sections[i], `${where} section ${i + 1}`, locale)),
  };
}

/** The portfolio projects in the requested language (images and layout never change). */
export function getProjects(locale: Locale): LocalizedProject[] {
  const tr = translations[locale];
  if (!tr) {
    // English: the source itself. The glossary column is simply the English text.
    return projects.map((p) => ({
      ...p,
      sections: p.sections?.map((s) => ({
        ...s,
        glossary: s.glossary?.map((g) => ({ az: g.az, text: g.en })),
      })),
    }));
  }
  return projects.map((p) => {
    const t = tr.projects[p.slug];
    if (!t) throw new Error(`[i18n] no ${locale} translation for project "${p.slug}"`);
    return localizeProject(p, t, locale);
  });
}

export function getProject(locale: Locale, slug: string): LocalizedProject | undefined {
  return getProjects(locale).find((p) => p.slug === slug);
}

/** Site-wide data in the requested language. */
export function getSite(locale: Locale) {
  const tr = translations[locale]?.site;
  const dict = getDictionary(locale);
  const subject = tr?.mailSubject ?? "Product Designer opportunity";
  const body = tr?.mailBody ?? "Hi Elman,";
  return {
    ...site,
    tagline: tr?.tagline ?? site.tagline,
    location: tr?.location ?? site.location,
    mailto: mailtoLink(subject, body),
    title: dict.meta.title,
  };
}
