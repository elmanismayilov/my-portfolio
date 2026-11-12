/**
 * Translated copy for the case studies. Structure mirrors `projects` in src/lib/content.ts (English):
 * sections are matched by position, blocks and lists too, so the order must stay the same.
 * Images, colors, numbers and layout flags always come from the English source.
 */
type Visual = { alt: string; caption?: string };

export type SectionText = {
  label: string;
  title: string;
  blocks: [heading: string, text: string][];
  imageAlt?: string;
  caption?: string;
  gallery?: Visual[];
  /** Translation of the English column of the interface glossary (Russian only: Azerbaijani needs no glossary). */
  glossary?: string[];
  /** `translation` is omitted for Azerbaijani: the quotes are already in Azerbaijani. */
  quotes?: { translation?: string; problem: string }[];
  reveal?: Visual;
  decisions?: { question: string; options: { name: string; note: string }[] }[];
  beforeAfter?: { title: string; note: string; beforeAlt: string; afterAlt: string }[];
  nextSteps?: { ideas: { title: string; text: string }[] };
  usersByProduct?: { totalLabel: string; asOf: string };
  newProduct?: { homeAlt: string; homeCaption: string; catalogAlt: string; catalogCaption: string };
  payoutMorph?: { before: Visual; after: Visual };
  statusTimeline?: Visual;
  tallShot?: Visual;
  flowReveal?: Visual;
};

export type ProjectText = {
  title: string;
  category: string;
  description: string;
  marquee?: string;
  summary: { facts: [label: string, value: string][]; resultsTitle?: string };
  sections: SectionText[];
};

export type SiteText = {
  tagline: string;
  location: string;
  mailSubject: string;
  mailBody: string;
};

export type Translation = {
  site: SiteText;
  projects: Record<string, ProjectText>;
};
