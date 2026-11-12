import type { StaticImageData } from "next/image";
import type { RevealTile, RevealFill } from "@/components/FlowReveal";
import type { UserQuote } from "@/components/UserQuotes";
import type { Decision } from "@/components/DecisionTable";
import type { BAFix } from "@/components/BeforeAfter";
// cover = the two phones cut out of the original artwork; the glow behind them is live (see ProjectCard)
import pashaLifeApp from "../../public/projects/pasha-life-phones.png";
import pashaLifeProblem from "../../public/projects/pasha-life-problem.png";
import pashaLifeBenchmark from "../../public/projects/pasha-life-benchmark.png";
import pashaLifeWireframe1 from "../../public/projects/pasha-life-wireframe-1.png";
import pashaLifeWireframe2 from "../../public/projects/pasha-life-wireframe-2.png";
import pashaLifeCards from "../../public/projects/pasha-life-cards.png";
import pashaLifeAllContracts from "../../public/projects/pasha-life-all-contracts.png";
import pashaLifeUsability from "../../public/projects/pasha-life-usability.png";
import guclusenHome from "../../public/projects/pasha-life-guclusen-home.jpg";
import guclusenCatalog from "../../public/projects/pasha-life-guclusen-catalog.jpg";import claimCover from "../../public/projects/claim-cover.png";
import claimProgress from "../../public/projects/claim-progress.png";
import claimCta from "../../public/projects/claim-cta.png";
import claimForm from "../../public/projects/claim-form.png";
import claimFlow from "../../public/projects/claim-flow.png";
import claimStatus from "../../public/projects/claim-status.png";
import npsCover from "../../public/projects/nps-cover.png";
import npsProblem from "../../public/projects/nps-problem.png";
import npsWireframes from "../../public/projects/nps-wireframes.png";
import npsWidget from "../../public/projects/nps-widget.png";
import npsScale from "../../public/projects/nps-scale.png";
import npsFeedback from "../../public/projects/nps-feedback.png";
import cashmateCover from "../../public/projects/cashmate-cover.jpg";
import cashmateCard from "../../public/projects/cashmate-card.jpg";
import cashmateProcess from "../../public/projects/cashmate-process.jpg";
import cashmateAudience from "../../public/projects/cashmate-audience.jpg";
import cashmateEmpathy from "../../public/projects/cashmate-empathy.jpg";
import cashmateFlow from "../../public/projects/cashmate-flow.jpg";
import cashmateWireframes from "../../public/projects/cashmate-wireframes.jpg";
import cashmateSystem from "../../public/projects/cashmate-system.jpg";
import cashmateOnboarding from "../../public/projects/cashmate-onboarding.jpg";
import cashmateCalculator from "../../public/projects/cashmate-calculator.jpg";
import cashmateHome from "../../public/projects/cashmate-home.jpg";
import cashmateExplore from "../../public/projects/cashmate-explore.jpg";
import cashmatePhones from "../../public/projects/cashmate-phones.jpg";
import cashmateOverview from "../../public/projects/cashmate-overview.jpg";

const EMAIL = "elmanismayiloov@gmail.com";

export const site = {
  name: "Elman Ismayilov",
  role: "Product Designer",
  email: EMAIL,
  linkedin: "https://www.linkedin.com/in/elmanismayilov/",
  telegram: "https://t.me/ElmanIsmayilov",
  location: "Baku, Azerbaijan",
  tagline: "I design digital products that make complex things feel simple.",
  // TODO: Dribbble and Behance are generic placeholder links, not real profiles — they are not shown in the footer
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/elmanismayilov/" },
    { label: "Dribbble", href: "https://dribbble.com" },
    { label: "Behance", href: "https://behance.net" },
  ],
};

/** One link for every "Get in touch" button: the subject and the first line of the message are pre-filled. */
export function mailtoLink(subject: string, body: string) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** In-page links of the navbar; labels come from the dictionary (`nav.work`, `nav.about`). */
export const navLinks = [
  { key: "work", href: "/#work" },
  { key: "about", href: "/#about" },
] as const;

/** One step of a case study: a labelled stage with its own copy and visual. */
export type CaseSection = {
  label: string; // short stage name, e.g. "Problem & Goal"
  title: string;
  blocks: { heading: string; text: string }[]; // text supports **bold**
  image?: StaticImageData; // single full-width visual
  glow?: boolean; // `image` is a transparent cutout shown over a slowly moving glow
  // Cap, in CSS px, on the width of the image / the whole gallery. Keeps small source images from being
  // stretched (and going soft). Use about the image's real pixel width for 1:1, less for sharper on retina.
  maxWidth?: number;
  galleryCols?: 1 | 2; // gallery columns on wide screens (default 2); 1 stacks the visuals full width
  // image that builds itself piece by piece (see FlowReveal); used instead of `image`
  reveal?: {
    image: StaticImageData;
    alt: string;
    caption?: string;
    w: number;
    h: number;
    bg: string;
    tiles: RevealTile[];
    fills?: RevealFill[];
  };
  imageAlt?: string;
  caption?: string;
  // big number that counts up, with an optional illustration, rendered by CountStat
  stat?: {
    value: number;
    prefix?: string;
    suffix?: string;
    label: string;
    image?: StaticImageData;
    imageAlt?: string;
  };
  // design decisions as option cards with the chosen one marked, rendered by DecisionTable
  decisions?: Decision[];
  // old vs new pairs joined by arrows, rendered by BeforeAfter
  beforeAfter?: BAFix[];
  // NPS by month + before/after table + example decision, rendered by NpsResults
  npsResults?: boolean;
  // one screen with several states you can switch between, rendered by EdgeCases
  edgeCases?: boolean;
  // current share app vs offline + planned ideas, rendered by NextSteps
  nextSteps?: { share: { app: number; offline: number }; ideas: { title: string; text: string }[] };
  // translation of key interface texts (Azerbaijani → English), shown under the section's visuals
  glossary?: { az: string; en: string }[];
  // big total + a tile per product with count-ups; rows come from the project's `summary.results`
  usersByProduct?: { totalLabel: string; asOf: string };
  // scripted "type an amount, save, watch the balance move" demo, rendered by CashmateDemo
  cashmateDemo?: boolean;
  // color palette + type scale that build themselves, rendered by Foundations
  foundations?: boolean;
  // two phones: home screen + a catalog that scrolls itself, rendered by NewProductShowcase
  newProduct?: {
    home: StaticImageData;
    homeAlt: string;
    homeCaption: string;
    catalog: StaticImageData;
    catalogAlt: string;
    catalogCaption: string;
  };
  // interactive design-system foundations (color primitives + light/dark tokens), rendered by DesignSystem
  designSystem?: boolean;
  // customer quotes that type themselves out, rendered by UserQuotes
  quotes?: UserQuote[];
  // animated impact dashboard (counters + line chart), rendered by ImpactChart
  impactChart?: boolean;
  // request-status timeline that plays step by step, rendered by StatusTimeline
  statusTimeline?: { image: StaticImageData; alt: string; caption?: string };
  // one tall screen shown enlarged and cropped to its top part
  tallShot?: { image: StaticImageData; alt: string; caption?: string };
  // flow diagram that draws itself branch by branch, rendered by FlowReveal
  flowReveal?: { image: StaticImageData; alt: string; caption?: string };
  // animated "progress bar -> payout button" demo, rendered by PayoutMorph
  payoutMorph?: {
    before: { image: StaticImageData; alt: string; caption: string };
    after: { image: StaticImageData; alt: string; caption: string };
  };
  // visuals shown side by side; give `video` (a /public path) to show an autoplaying loop instead of the image
  // `cards: true` plays the image as a card-by-card presentation (CardsShowcase)
  // `selected` marks the visual as the chosen option (ring + "Selected" badge)
  gallery?: {
    image?: StaticImageData;
    video?: string;
    cards?: boolean;
    selected?: boolean;
    alt: string;
    caption?: string;
  }[];
};

/** Short résumé shown before the first section of a case study. */
export type ProjectSummary = {
  facts: { label: string; value: string }[];
  // optional: active users per product, shown under the facts (and reused by the Business Impact section)
  resultsTitle?: string;
  results?: { name: string; users: number }[];
};

export type Project = {
  summary?: ProjectSummary;
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tone: string; // background color, used as placeholder until a cover image is added
  image?: StaticImageData;
  glow?: boolean; // cover image is a transparent cutout shown over a slowly moving glow
  marquee?: { text: string }; // ad-style ticker over the empty top of the card cover
  cover?: "status"; // live cover instead of an image: the animated status timeline (StatusCover)
  sections?: CaseSection[]; // case study steps, shown on /work/[slug]
};

export const projects: Project[] = [
  {
    slug: "pasha-life-app",
    title: "Pasha Life Mobile App — Redesign",
    category: "Mobile App · Insurance",
    year: "2025",
    description: "A redesign of the Pasha Life mobile app.",
    tone: "#05050a",
    image: pashaLifeApp,
    glow: true,
    summary: {
      facts: [
        { label: "My role", value: "Product Designer" },
        { label: "Team", value: "Product Owner, Business Analyst, 2 Frontend developers, Backend developer" },
        { label: "Timeline", value: "2 months" },
      ],
      resultsTitle:
        "After the release, besides our core product HYS, we managed to bring customers of our other products into the mobile app:",
      results: [
        { name: "100 qat sığorta", users: 3714 },
        { name: "Kredit Sığortası", users: 1309 },
        { name: "İcbari Həyat Sığortası", users: 18352 },
        { name: "Fərdi Həyat Sığortası", users: 19 },
        { name: "Korporativ Həyat Sığortası", users: 8980 },
        { name: "İpoteka Sığortası", users: 5052 },
      ],
    },
    sections: [
      {
        label: "Problem & Goal",
        title: "From a single-product limit to a multi-product ecosystem",
        blocks: [
          {
            heading: "Current state",
            text: "The previous app architecture focused on a single product — Life Insurance (HYS) contracts. Despite the company's rich insurance portfolio, customers could not see any other products inside the app.",
          },
          {
            heading: "Strategic goal",
            text: "Take the app beyond its limited scope and turn it into a fully functional **multi-product platform**, giving users the ability to manage all their insurance products in one place.",
          },
          {
            heading: "Approach",
            text: "After extensive brainstorming and team discussions, we decided not to settle for cosmetic changes. Instead, we re-designed the app's UX architecture from scratch with a large-scale redesign.",
          },
        ],
        image: pashaLifeProblem,
        imageAlt: "The previous Pasha Life app, showing only a Life Insurance (HYS) contract",
        caption: "The previous app — built around a single HYS contract.",
      },
      {
        label: "User Voices",
        title: "\"I'm a customer — so why is my contract not here?\"",
        blocks: [
          {
            heading: "Who",
            text: "Customers who held any product **other than HYS** — credit, mortgage, corporate or mandatory life insurance.",
          },
          {
            heading: "Problem",
            text: "They had **no access to the mobile app** and could not see the details of their own contract. To check a term or a status, the only way was to call the call center.",
          },
        ],
        // illustrative quotes written to show the pain point; names are fictional
        quotes: [
          {
            name: "Leyla Məmmədova",
            meta: "34 · Bakı",
            product: "Kredit Sığortası",
            quote:
              "Kredit götürəndə sığorta da etdirmişdim. Tətbiqi yüklədim, amma müqaviləm orada yoxdur. Nə vaxta qədər qüvvədə olduğunu bilmək üçün hər dəfə zəng etməli oluram.",
            translation:
              "When I took out the loan I got insured too. I downloaded the app, but my contract isn't there. To know how long it's valid, I have to call every single time.",
            problem: "No access to the app",
          },
          {
            name: "Rəşad Quliyev",
            meta: "41 · Sumqayıt",
            product: "Korporativ Həyat Sığortası",
            quote:
              "İş yerim bizi sığortalayıb, amma mənim hansı təminatım olduğunu bilmirəm. Tətbiqə girirəm — boşdur. Sanki mən müştəri deyiləm.",
            translation:
              "My employer insured us, but I don't know what coverage I have. I open the app — it's empty. As if I'm not a customer.",
            problem: "Contract details hidden",
          },
        ],
      },
      {
        label: "Benchmark",
        title: "Analysis of global practice",
        blocks: [
          {
            heading: "Research",
            text: "Before designing our own solutions, I analyzed the global market leaders that manage multi-product structures.",
          },
          {
            heading: "Focus",
            text: "By studying how fintech giants like **Revolut** simplify complex ecosystems, we identified the most effective UX patterns.",
          },
          {
            heading: "Outcome",
            text: "We adapted global standards to our internal business requirements and shaped a comfortable, **scalable architecture model**.",
          },
        ],
        image: pashaLifeBenchmark,
        imageAlt:
          "Benchmark table comparing how Revolut, Unibank, ABB, Birbank and Tinkoff present products",
        caption: "Benchmark: Revolut, Unibank, ABB, Birbank and Tinkoff compared side by side.",
      },
      {
        label: "Wireframes",
        title: "Testing ideas with two wireframe concepts",
        blocks: [
          {
            heading: "Approach",
            text: "To test ideas, I designed **2 different wireframe concepts**.",
          },
          {
            heading: "Comparison",
            text: "I analyzed the UX advantages and risks of each option separately.",
          },
          {
            heading: "Details",
            text: "To make discussion with the team easier, I placed all notes directly on top of the screens.",
          },
          {
            heading: "Decision",
            text: "We chose **Concept 02**. Contracts scroll **horizontally**, with the operations and contract information placed right below them.",
          },
          {
            heading: "Why: familiarity",
            text: "This approach was **more familiar to our customers**. They had been using the app for 2 years, and a user experience had already formed around it.",
          },
          {
            heading: "Why: low risk",
            text: "It was a **risk-free choice for our high NPS scores** — we could grow the app without breaking what users already liked.",
          },
          {
            heading: "Why: architecture",
            text: "**Architecturally, everything was right** — the structure scales naturally to more products.",
          },
        ],
        gallery: [
          {
            image: pashaLifeWireframe1,
            alt: "Wireframe concept 1: home screen with product list and product detail screens",
            caption: "Concept 01",
          },
          {
            image: pashaLifeWireframe2,
            alt: "Wireframe concept 2: home screen with contract filters, all-contracts list and product detail",
            caption: "Concept 02",
            selected: true,
          },
        ],
      },
      {
        label: "Final Visual Concept",
        title: "A modern, scalable visual language",
        blocks: [
          {
            heading: "Execution",
            text: "Based on the tested wireframes, I completed the **new visual concept** of the app.",
          },
          {
            heading: "Solution",
            text: "We built a **scalable design system** with a modern aesthetic and a clear visual hierarchy.",
          },
        ],
        image: pashaLifeApp, // same artwork as the cover: phones cut out, glow behind them is live
        glow: true,
        imageAlt:
          "Final visual concept: the redesigned home screen with an active contract card and a frozen contract card",
        caption: "Final home screen — active and frozen contract states.",
        glossary: [
          { az: "Müqavilələrim", en: "My contracts" },
          { az: "Hamısına baxın", en: "View all" },
          { az: "Aktiv", en: "Active" },
          { az: "Dondurulmuş", en: "Frozen" },
          { az: "Sığorta haqqı", en: "Insurance premium" },
          { az: "Ay üzrə ödəniləcək məbləğ", en: "Amount payable per month" },
          { az: "Müqavilə məlumatları", en: "Contract details" },
          { az: "Kredit məlumatları", en: "Credit details" },
          { az: "Yeni müqavilə yarat", en: "Create a new contract" },
          { az: "Kalkulyator", en: "Calculator" },
          { az: "Daha çox", en: "More" },
          { az: "Artım müraciəti", en: "Increase request" },
        ],
      },
      {
        label: "Design System",
        title: "One system for every product, in light and dark",
        blocks: [
          {
            heading: "Primitives",
            text: "The foundation is **80 color primitives** — 8 palettes with 10 steps each. Nothing in the interface uses a raw color.",
          },
          {
            heading: "Tokens",
            text: "On top sit **24 semantic tokens** — surface, label, divider, status, indicator, info. Each one has a **Light and a Dark value**, so switching the theme just re-maps tokens to different primitives.",
          },
          {
            heading: "Products",
            text: "Every product state — active, frozen, ended, cancelled, pending — has its own status token, and product accents such as the HYS violet live in their own tokens.",
          },
        ],
        designSystem: true,
      },
      {
        label: "Product Differentiation",
        title: "First challenge: telling products apart at a glance",
        blocks: [
          {
            heading: "Problem",
            text: "A single card design was not enough to represent products with such different parameters.",
          },
          {
            heading: "UX solution",
            text: "I built a **visual system that identifies products by color** — while scrolling, users instinctively understand which product contract they are looking at.",
          },
        ],
        gallery: [
          {
            image: pashaLifeCards,
            cards: true,
            alt: "Eight contract cards, each product with its own color and background pattern",
            caption: "Card system — one color per product",
          },
          {
            video: "/projects/pasha-life-cards.mp4",
            alt: "Scrolling through contract cards, each product shown in its own color",
            caption: "In motion — scrolling between products",
          },
        ],
      },
      {
        label: "Horizontal Scroll Fatigue",
        title: "Second challenge: removing horizontal scroll fatigue",
        blocks: [
          {
            heading: "Problem",
            text: "For users with many contracts, horizontal scrolling meant lost time and user fatigue.",
          },
          {
            heading: "UX solution",
            text: "By introducing the **\"View all\"** feature, we shortened the navigation distance — users now reach any contract in just **2 clicks**.",
          },
        ],
        // contracts appear product by product (first HYS, then the next product, ...)
        reveal: {
          image: pashaLifeAllContracts,
          alt: "The All my contracts screen, with contracts grouped by product and marked with the product color",
          caption: "\"View all\" — every contract grouped by product, two taps away.",
          w: 1920,
          h: 1080,
          bg: "#000",
          fills: [
            { rect: [533, 128, 908, 907], color: "#1a1922", radius: 38 },
            { rect: [1095, 128, 1388, 1080], color: "#1a1922", radius: 32 },
          ],
          tiles: [
            // screen frames
            { rect: [533, 128, 908, 228], at: 0, dur: 500, dir: "fade" },
            { rect: [1095, 128, 1388, 207], at: 0, dur: 500, dir: "fade" },
            { rect: [533, 742, 908, 907], at: 0, dur: 500, dir: "fade" },
            // product 1 — Life Insurance, on both screens
            { rect: [533, 228, 908, 527], at: 700, dur: 800, dir: "y" },
            { rect: [1095, 207, 1388, 660], at: 700, dur: 1000, dir: "y" },
            // product 2 — Credit Life (left) and 100 Qat (right)
            { rect: [533, 527, 908, 742], at: 1900, dur: 700, dir: "y" },
            { rect: [1095, 660, 1388, 902], at: 1900, dur: 800, dir: "y" },
            // product 3 — On-demand credit insurance (right)
            { rect: [1095, 902, 1388, 1080], at: 3000, dur: 600, dir: "y" },
          ],
        },
      },
      {
        label: "Usability Testing",
        title: "Putting our assumptions in front of real users",
        blocks: [
          {
            heading: "Hypothesis",
            text: "All of our UX solutions were **assumptions** that had to be tested in front of users.",
          },
          {
            heading: "Test",
            text: "We organized **in-person usability tests** with real customers.",
          },
          {
            heading: "Stop condition",
            text: "We kept testing **until 5 users completed the test successfully**.",
          },
          {
            heading: "Iterations",
            text: "At this stage we often had to **rework the interface** — fix, retest with new users, and repeat.",
          },
          {
            heading: "Result",
            text: "Based on the **qualitative feedback** we collected, we fixed the inconsistencies in the interface.",
          },
        ],
        // the three sheets appear one after another
        reveal: {
          image: pashaLifeUsability,
          alt: "Printed usability test sheets: a pre-test questionnaire, a task list and a rating question with handwritten notes",
          caption: "In-person test sheets — questionnaire, tasks and handwritten feedback.",
          w: 1920,
          h: 1080,
          bg: "#000",
          tiles: [
            { rect: [104, 228, 530, 852], at: 0, dur: 700, dir: "fade" },
            { rect: [532, 88, 1168, 992], at: 550, dur: 700, dir: "fade" },
            { rect: [1171, 88, 1808, 992], at: 1100, dur: 700, dir: "fade" },
          ],
        },
      },
      {
        label: "What's Next",
        title: "The app doesn't stand still",
        blocks: [
          {
            heading: "Growth",
            text: "New features and new products are added to the app all the time.",
          },
          {
            heading: "Architecture",
            text: "Thanks to the **well-thought-out architecture**, we can introduce any new product with ease — it simply becomes a new contract card and a new entry in the product catalog.",
          },
          {
            heading: "Latest product",
            text: "The most recently added product is **GüclüSən** — it already lives on the home screen and sits at the top of the catalog, marked as new.",
          },
        ],
        newProduct: {
          home: guclusenHome,
          homeAlt: "Home screen with the GüclüSən contract card, quick actions and coverage details",
          homeCaption: "Home — the GüclüSən contract",
          catalog: guclusenCatalog,
          catalogAlt:
            "Insurance products catalog with GüclüSən marked as new at the top, followed by savings, credit and personal products",
          catalogCaption: "Catalog — GüclüSən is new",
        },
        glossary: [
          { az: "Sığorta məhsulları", en: "Insurance products" },
          { az: "Bütün", en: "All" },
          { az: "Yığım", en: "Savings" },
          { az: "Kredit", en: "Credit" },
          { az: "Şəxsi", en: "Personal" },
          { az: "Yeni", en: "New" },
          { az: "Müraciət et", en: "Apply" },
          { az: "Sağlamlığınız hər zaman öndədir", en: "Your health always comes first" },
          { az: "Sənədləri yüklə", en: "Download documents" },
          { az: "Mail ilə göndər", en: "Send by email" },
          { az: "Bizimlə əlaqə", en: "Contact us" },
          { az: "Təminat / Sığorta məbləği", en: "Coverage / Sum insured" },
        ],
      },
      {
        label: "Business Impact",
        title: "Validated by the metrics",
        blocks: [
          {
            heading: "Data validation",
            text: "The new UX solutions **fully proved themselves** in real analytics.",
          },
          {
            heading: "Metric",
            text: "We see a **steady and consistent growth** in the number of active users (MAU/DAU).",
          },
          {
            heading: "Outcome",
            text: "The new architecture made it easier for users to **discover and use other insurance products**.",
          },
        ],
        // active users per product, taken from `summary.results`
        usersByProduct: {
          totalLabel: "active users from our other products",
          asOf: "Data as of 6 November 2026",
        },
      },
    ],
  },
  {
    slug: "contract-payout",
    title: "How We Moved 30% of Payout Claims Online",
    category: "Mobile App · Insurance",
    year: "2025",
    description: "30% of monthly payout requests moved into the app within 3 months of launch.",
    tone: "#cfcaff",
    image: claimCover, // static fallback; the card shows the live status timeline instead
    cover: "status",
    summary: {
      facts: [
        { label: "My role", value: "Product Designer" },
        { label: "Team", value: "Product Owner, Business Analyst, 2 Frontend developers, Backend developer" },
        { label: "Timeline", value: "1 sprint" },
        { label: "Platform", value: "Mobile app" },
        { label: "Launch", value: "July 2025" },
        { label: "Result", value: "**30%** of monthly payout requests now come through the mobile app" },
      ],
    },
    sections: [
      {
        label: "Problem & Entry Point",
        title: "From an offline request to an automated digital solution",
        blocks: [
          {
            heading: "Problem",
            text: "One of the most critical operations — the **insurance payout request** — did not exist in the app at all. Users had to call the call center and go through complex, time-consuming offline procedures.",
          },
          {
            heading: "Solution",
            text: "We fully digitized the request process and built it directly into the app.",
          },
          {
            heading: "Smart entry point",
            text: "The entry sits right on the product card, exactly where users look at their contract — no need to search the app for it.",
          },
          {
            heading: "Contextual entry",
            text: "We placed a **progress bar** on the product card showing the time left on the contract. When the contract term is complete, the bar automatically turns into the primary action button — **\"Get the accumulated amount\"**.",
          },
        ],
        glossary: [
          { az: "Yığılmış məbləği əldə et", en: "Get the accumulated amount" },
          { az: "Ay üzrə ödəniləcək məbləğ", en: "Amount payable per month" },
          { az: "Müqavilələrim", en: "My contracts" },
          { az: "Hamısına baxın", en: "View all" },
          { az: "Ətraflı", en: "Details" },
          { az: "Aktiv", en: "Active" },
          { az: "Artım müraciəti", en: "Increase request" },
          { az: "Azalma müraciəti", en: "Decrease request" },
          { az: "Dondurma müraciəti", en: "Freeze request" },
          { az: "Bütün əməliyyatlar", en: "All operations" },
        ],
        payoutMorph: {
          before: {
            image: claimProgress,
            alt: "Home screen with a Life Insurance card showing a progress bar and 500 days left",
            caption: "Month 1–35 — progress",
          },
          after: {
            image: claimCta,
            alt: "Home screen where the progress bar has turned into the \"Get the accumulated amount\" button",
            caption: "Last month — primary CTA",
          },
        },
      },
      {
        label: "Data Entry",
        title: "Manual entry vs. Open Banking",
        blocks: [
          {
            heading: "Challenge",
            text: "Entering bank details (IBAN, branch, card number) by hand took time and raised the chance of **mechanical errors** on the user's side.",
          },
          {
            heading: "Solution",
            text: "We brought an **Open Banking** integration into the system. With a single click of consent, users can pull their bank details automatically.",
          },
          {
            heading: "Freedom of choice",
            text: "We gave users two alternative paths — **\"Enter manually\"** or **\"Automatic (Open Banking)\"**.",
          },
        ],
        glossary: [
          { az: "Məlumatları necə daxil etmək istəyirsiz?", en: "How do you want to enter the data?" },
          { az: "Əl ilə daxil etmək", en: "Enter manually" },
          { az: "Avtomatik (Açıq Bankçılıq)", en: "Automatic (Open Banking)" },
          { az: "Məlumatların çəkilməsinə razılıq verirəm", en: "I consent to my data being retrieved" },
          { az: "Cari hesab tələbləri", en: "Current account requirements" },
          { az: "AZ ilə başlayan 28 simvolluq IBAN kod", en: "28-character IBAN starting with AZ" },
          { az: "Kart nömrəsi", en: "Card number" },
          { az: "Şəxsi məlumatlar", en: "Personal data" },
          { az: "Davam et", en: "Continue" },
        ],
        tallShot: {
          image: claimForm,
          alt: "Payout request screen with a switch between manual entry and automatic Open Banking entry",
          caption: "Choose how to enter the data — manually or automatically",
        },
        flowReveal: {
          image: claimFlow,
          alt: "User flow of the payout request: manual entry with validation errors, and the Open Banking branch with bank selection and account screens",
          caption: "User flow — the manual and Open Banking branches",
        },
      },
      {
        label: "Status Tracking",
        title: "Transparency: following the status of a request",
        blocks: [
          {
            heading: "Reducing anxiety",
            text: "To remove the uncertainty after submitting a request, I designed a **real-time, step-by-step status tracking** (timeline) interface.",
          },
          {
            heading: "Prompt feedback",
            text: "When a document is missing or some information needs clarifying (for example, a **\"Missing document\"** notice), the user is notified instantly.",
          },
          {
            heading: "Document access",
            text: "The request form and required applications (**\"Insurance payout application\"**) can be downloaded as a PDF right from the interface.",
          },
          {
            heading: "Business impact",
            text: "Calls to the call center asking **\"Where is my payment?\"** are answered by the app itself now.",
          },
        ],
        glossary: [
          { az: "Müraciətin detalları", en: "Request details" },
          { az: "Çatışmayan sənəd var", en: "Missing document" },
          { az: "Müraciətiniz qəbul edildi, ödəniş gününə qədər gözləmədədir", en: "Your request is accepted and waits for the payout day" },
          { az: "Ödəniş hazırlanır", en: "Payment is being prepared" },
          { az: "Ödəniş həyata keçirildi", en: "Payment made" },
          { az: "Sığorta ödənişinin alınması ərizəsi", en: "Insurance payout application" },
        ],
        statusTimeline: {
          image: claimStatus,
          alt: "Request details screen with a status timeline: missing document alert, request accepted, payment being prepared, payment made",
          caption: "Status timeline — step by step",
        },
      },
      {
        label: "Edge Cases",
        title: "Not only the happy path",
        blocks: [
          {
            heading: "Beyond the happy path",
            text: "A payout request does not always go smoothly. I designed the states around it too, so the user always knows **where they are and what to do next**.",
          },
          {
            heading: "States",
            text: "The contract is not completed yet, the request is rejected, a document is requested again, and the payout is made. Pick a state to see the screen.",
          },
        ],
        edgeCases: true,
      },
      {
        label: "Impact & Results",
        title: "30% of monthly payout requests, now in the app",
        blocks: [
          {
            heading: "Adoption",
            text: "Within 3 months of the July 2025 launch, the app's share of **monthly** payout requests grew from **12%** to **30%**.",
          },
          {
            heading: "Marketing",
            text: "The launch was supported by a marketing strategy — **push notifications, social-media videos** and other channels — while the entry point on the product card kept the feature in front of users.",
          },
          {
            heading: "Operational load",
            text: "As more requests move to self-service, the load on the call center and the operations team goes down.",
          },
          {
            heading: "Business efficiency",
            text: "We shifted user habits from offline to digital within a **single sprint** of design and development.",
          },
        ],
        impactChart: true,
      },
      {
        label: "What's Next",
        title: "70% of requests are still offline",
        blocks: [
          {
            heading: "Opportunity",
            text: "The feature works, but most payout requests still go through the call center. That is the biggest room for growth.",
          },
          {
            heading: "Plan",
            text: "I want to bring them in by **meeting users at the right moment** and by removing the last bits of friction.",
          },
        ],
        nextSteps: {
          share: { app: 30, offline: 70 },
          ideas: [
            {
              title: "Reminder as the term ends",
              text: "A push and an SMS a few months before, a month before and on the last day of the contract term, with a deep link straight into the request form.",
            },
            {
              title: "Pre-filled form",
              text: "Bring bank details through Open Banking and personal data from the profile by default, so the request takes only a few taps.",
            },
            {
              title: "Hand-off from the call center",
              text: "When a customer calls, the operator sends a link so the request continues in the app instead of over the phone.",
            },
            {
              title: "Measure the funnel",
              text: "Track where users drop between the entry point, the form and the submit button, and improve the weakest step first.",
            },
          ],
        },
      },
    ],
  },
  {
    slug: "nps-redesign",
    title: "NPS Survey Redesign",
    category: "Web Platform · Insurance",
    year: "2025",
    description: "Fixing accidental low scores — a 25% boost in metrics.",
    tone: "#eceaf6",
    image: npsCover,
    summary: {
      facts: [
        { label: "My role", value: "Product Designer — I owned the problem analysis, the flow and the UI" },
        { label: "Team", value: "CX team, Product Owner, Frontend and Backend developers" },
        { label: "Timeline", value: "2 sprints" },
        { label: "Platform", value: "Web platform (customer cabinet)" },
        { label: "Launch", value: "October 2025" },
        { label: "Result", value: "**+25%** boost in NPS metrics, and a survey that finally explains low scores" },
      ],
    },
    sections: [
      {
        label: "Problem",
        title: "Why were some users \"accidentally\" giving us low scores?",
        blocks: [
          {
            heading: "Discovery",
            text: "While analyzing our NPS survey, we noticed a very strange pattern. Some users gave us low scores. But when our CX team reached out to them, they kept hearing the same thing: **\"Oops, that was an accident. I'm actually happy with the product!\"**",
          },
          {
            heading: "Scale",
            text: "The CX team called customers who had left low scores. The answer kept repeating: **many of them said the score was a mistake.** This was not a handful of odd cases — it was a pattern.",
          },
          {
            heading: "The mystery",
            text: "This became a real UX mystery for me. How can someone accidentally give a bad rating? It was a clear signal that the problem wasn't the user, but the design itself. It was triggering 'autopilot' errors and leading to 'dirty' data.",
          },
          {
            heading: "Decision",
            text: "I took ownership of the problem and **redesigned the flow end to end**. The CX team brought the customer calls and feedback, and the developers shaped what was possible in the cabinet.",
          },
          {
            heading: "Aggressive interruption",
            text: "The survey appeared as a full-screen modal, completely blocking the interface. This interrupted the user mid-task and caused instant irritation.",
          },
          {
            heading: "Weak feedback",
            text: "The color contrast between a \"6\" (negative) and a \"7\" (neutral) was almost unnoticeable. A user on \"autopilot\" aiming for the \"green zone\" could easily miss it without even realizing it.",
          },
          {
            heading: "No anchors or context",
            text: "The numbers were just numbers. We didn't give the user any anchors (e.g., \"0 = Definitely not,\" \"10 = Absolutely\") or confirm their choice. What did a \"5\" even mean? It was unclear.",
          },
          {
            heading: "A missed opportunity",
            text: "We never asked \"Why?\" to our dissatisfied users. We were getting a bad score but had zero insight into the reasons behind that negative feedback.",
          },
          {
            heading: "Conclusion",
            text: "It was clear that a complete redesign, **one based on user respect**, was needed.",
          },
        ],
        maxWidth: 760, // source is 880 px wide
        image: npsProblem,
        imageAlt: "The old NPS survey: a full-screen modal over the dimmed interface, with a row of numbers from 0 to 10",
        caption: "The old survey — a modal that blocks the whole interface.",
        glossary: [
          { az: "Müştəri məmnuniyyəti sorğusu", en: "Customer satisfaction survey" },
          { az: "Bağla", en: "Close" },
          {
            az: "Həyatın Yaşam Sığortası məhsulumuzu tanışlarınıza tövsiyə edərdinizmi?",
            en: "Would you recommend our Life Insurance product to your acquaintances?",
          },
          { az: "Tövsiyə ehtimalını aşağıdakı şkala ilə qiymətləndirin", en: "Rate the likelihood of recommending on the scale below" },
          { az: "Qiymətləndirin", en: "Submit rating" },
        ],
      },
      {
        label: "Wireframes",
        title: "Exploring the options before choosing one",
        blocks: [
          {
            heading: "Approach",
            text: "I started with the first ideas in wireframes. Even at that early stage, it was clear this wasn't just a **\"button redesign.\"**",
          },
          {
            heading: "Three decisions",
            text: "I treated the survey as three separate design decisions — **where it sits, what the scale looks like and when it appears** — and compared options for each one.",
          },
        ],
        maxWidth: 1100, // source is 1392 px wide
        image: npsWireframes,
        imageAlt: "Printed wireframe sheets of the new NPS flow, colored by hand with markers",
        caption: "Wireframes — the first ideas for the new NPS flow.",
        decisions: [
          {
            question: "Where does the survey sit?",
            options: [
              { name: "Full-screen modal", note: "The old way. It blocks the task and forces an answer from an irritated user." },
              {
                name: "Corner widget",
                note: "Stays out of the way and leaves the choice to the user. The page keeps working underneath.",
                chosen: true,
              },
              { name: "Top banner", note: "Pushes the layout down and is easy to ignore as one more promo strip." },
            ],
          },
          {
            question: "What does the scale look like?",
            options: [
              { name: "Emoji faces", note: "Friendly, but five faces cannot give the 0–10 detail NPS needs." },
              { name: "Slider", note: "Easy to mis-set with a mouse or a thumb, and the final value is not obvious." },
              {
                name: "0–10 buttons",
                note: "The standard NPS scale: results stay comparable with our history. Clarity comes from color and labels.",
                chosen: true,
              },
            ],
          },
          {
            question: "When does it appear?",
            options: [
              { name: "On every login", note: "Predictable, but it catches people before they have done anything to rate." },
              {
                name: "Once the page is settled",
                note: "A few seconds after the user lands, and never in the middle of a form or a payment.",
                chosen: true,
              },
              { name: "At a random moment", note: "Cheap to build, but it keeps interrupting people at the worst time." },
            ],
          },
        ],
      },
      {
        label: "Presentation",
        title: "Changing how — and when — the survey is presented",
        blocks: [
          {
            heading: "Problem",
            text: "Users already have very little motivation to spend time on this. Our old approach **interrupted their task**, meaning we were practically guaranteeing a response from an already-angry user.",
          },
          {
            heading: "Solution",
            text: "With the new design, our survey appears as a small, unobtrusive widget in the bottom-right corner. **We no longer interrupt their flow.** The user decides when (or if) to engage, which has a huge positive impact on the honesty and quality of our data.",
          },
          {
            heading: "When it appears",
            text: "About **10 seconds** after the customer lands on the main page — and never while they are filling in a form or making a payment.",
          },
          {
            heading: "How often",
            text: "At most **once every 90 days** per customer, so the survey stays a question and never becomes a nuisance.",
          },
          {
            heading: "If it is closed",
            text: "Pressing ✕ is respected: the customer is **not asked again for 30 days**.",
          },
          {
            heading: "If it is ignored",
            text: "An ignored widget folds into a small tab after 30 seconds and may return on the next visit, up to **3 times** in a cycle. Then it waits for the next one.",
          },
          {
            heading: "On mobile",
            text: "On narrow screens the corner widget becomes a **bottom sheet** with larger touch targets, so a thumb can hit the right number.",
          },
        ],
        maxWidth: 1100, // source is 1410 px wide
        image: npsWidget,
        imageAlt: "The new NPS survey as a small widget in the bottom-right corner of the web cabinet",
        caption: "The new survey — a small widget in the corner.",
      },
      {
        label: "New Design",
        title: "Breakdown of the new design",
        blocks: [
          {
            heading: "6 vs. 7",
            text: "The old design had a soft gradient, but the contrast between a \"6\" and a \"7\" was almost invisible. For a user on autopilot there was no real difference — yet for our NPS score this is critical: a 6 is a Detractor, but a 7 is a Neutral. We created clear, high-contrast color groups: **Red (0–6), Yellow (7–8) and Green (9–10).** No more confusion.",
          },
          {
            heading: "Anchoring the score",
            text: "We kept hearing feedback like \"I put 5, I'm happy with the product!\" Users didn't understand the scale. To fix this, we added two layers of context.",
          },
          {
            heading: "Text anchors",
            text: "Labels under **'0'** and **'10'** define the two extremes of the scale.",
          },
          {
            heading: "Instant feedback",
            text: "After a user clicks a number, we show a clear status label above it (\"Dissatisfied,\" \"Neutral,\" or \"Excellent\") so they have **zero doubt** about what their vote meant.",
          },
          {
            heading: "Capturing the \"why\"",
            text: "Just getting a low score isn't enough — we needed to know the reason. When a user selects a score from 0–6, we optionally show a few checkboxes with common issues and a field for their own feedback. This gives us **actionable insights** to actually fix the problems, not just stare at a number.",
          },
          {
            heading: "Accessibility: not by color alone",
            text: "Color is never the only signal. Every group is also explained by text — the two anchors under the scale and the status label (\"Dissatisfied\", \"Neutral\", \"Excellent\") after a choice.",
          },
          {
            heading: "Known gap: digit contrast",
            text: "Checking the colored circles, the digits are the weak spot. The thin yellow digits (7–8) on white are well below the WCAG AA ratio of 4.5:1, and red and green are borderline. **Next step: darken the digit color and keep the lighter outline.**",
          },
        ],
        glossary: [
          { az: "Bizi dostlarınıza tövsiyə etmək ehtimalınız nə qədərdir?", en: "How likely are you to recommend us to your friends?" },
          { az: "Qətiyyən tövsiyə etmərəm", en: "Definitely would not recommend" },
          { az: "Mütləq tövsiyə edərəm", en: "Would absolutely recommend" },
          { az: "0 - NARAZI", en: "0 – DISSATISFIED" },
          { az: "Zəhmət olmasa, səbəbi qeyd edin", en: "Please state the reason" },
          { az: "Şərtlərdən narazıyam", en: "I'm unhappy with the terms" },
          { az: "Məhsulu hələ ki, tam tanımıram", en: "I don't fully know the product yet" },
          { az: "Texniki problemlər", en: "Technical problems" },
          { az: "Digər", en: "Other" },
          { az: "Qiymətləndirin", en: "Submit rating" },
        ],
        maxWidth: 900, // each screen's source is 622 px wide
        gallery: [
          {
            image: npsScale,
            alt: "The new NPS scale: red, yellow and green number groups with text anchors under 0 and 10",
            caption: "Color groups and text anchors",
          },
          {
            image: npsFeedback,
            alt: "After choosing 0, the survey shows the status \"0 - NARAZI\", reasons to pick from and a free-text field",
            caption: "Instant feedback and the reason for a low score",
          },
        ],
      },
      {
        label: "Before & After",
        title: "Four fixes, side by side",
        blocks: [
          {
            heading: "At a glance",
            text: "Each fix answers one cause of accidental scores. The old version is on the left, the new one on the right.",
          },
        ],
        beforeAfter: [
          {
            title: "Interruption → quiet widget",
            note: "A blocking full-screen modal became a small corner widget.",
            before: { image: npsProblem, alt: "The old survey: a full-screen modal over the dimmed cabinet" },
            after: { image: npsWidget, alt: "The new survey: a small widget in the corner of the cabinet" },
          },
          {
            title: "Faint gradient → clear color groups",
            note: "6 (detractor) and 7 (neutral) can no longer be mistaken for each other.",
            before: {
              image: npsProblem,
              rect: [290, 165, 300, 40],
              alt: "The old scale: ten circles in a soft red-to-green gradient",
            },
            after: {
              image: npsScale,
              rect: [20, 200, 580, 62],
              alt: "The new scale: red 0–6, yellow 7–8, green 9–10",
            },
          },
          {
            title: "Bare numbers → anchors and instant feedback",
            note: "Both ends of the scale are named, and the chosen score gets a status label.",
            before: {
              image: npsProblem,
              rect: [290, 165, 300, 95],
              alt: "The old scale: numbers with nothing explaining what they mean",
            },
            after: {
              image: npsFeedback,
              rect: [20, 140, 582, 170],
              alt: "The new scale: a \"0 - NARAZI\" label, the scale and text anchors under 0 and 10",
            },
          },
          {
            title: "No reason → optional “why”",
            note: "Low scores now come with reasons the team can act on.",
            before: {
              image: npsProblem,
              rect: [245, 230, 390, 50],
              alt: "The old survey ends with a single submit button and no question about the reason",
            },
            after: {
              image: npsFeedback,
              rect: [20, 335, 582, 330],
              alt: "The new survey asks for the reason with checkboxes and a free-text field",
            },
          },
        ],
      },
      {
        label: "Measurement",
        title: "How I judged whether it worked",
        blocks: [
          {
            heading: "Honest limits",
            text: "The old and the new survey never ran side by side, so this is a **before / after comparison, not an A/B test**. Other things in the product changed over the same months.",
          },
          {
            heading: "What I looked at",
            text: "The NPS trend before and after the launch, the share of respondents, how many low scores came with a reason, and what the CX team heard in their follow-up calls.",
          },
          {
            heading: "Why I trust it",
            text: "The main signal was the simplest one: the calls where customers said \"it was an accident\" stopped being the story. Numbers and conversations pointed the same way.",
          },
        ],
      },
      {
        label: "Result",
        title: "Clean data, real decisions",
        blocks: [
          {
            heading: "Impact",
            text: "By eliminating accidental low scores, we restored the integrity of our NPS metrics. Now, PASHA Life makes strategic product decisions based on **genuine user feedback**, not interface friction.",
          },
          {
            heading: "Data in use",
            text: "The strongest proof is not the score — it is that the new \"why\" field already **changed a decision** the team made.",
          },
        ],
        npsResults: true,
      },
      {
        label: "Takeaways",
        title: "What I learned and what I would do differently",
        blocks: [
          {
            heading: "Learned: design",
            text: "Bad data is often a **design problem, not a user problem**. If people give a wrong answer \"by accident\", look at the interface first.",
          },
          {
            heading: "Learned: the “why”",
            text: "A number alone does not help a team. The \"why\" next to it is what turns a score into a decision.",
          },
          {
            heading: "Differently: test it",
            text: "I would **A/B test** the new survey against the old one instead of replacing it outright. That would give a clean, causal number.",
          },
          {
            heading: "Differently: baseline",
            text: "I would agree on the success metrics with the CX team and record the baseline **before** launch, not after.",
          },
          {
            heading: "Differently: mobile",
            text: "I would test the bottom-sheet version on real phones earlier, and fix the digit contrast in the very first iteration.",
          },
        ],
      },
    ],
  },
  {
    slug: "cashmate-app",
    title: "Cashmate — Expense Tracker App",
    category: "Mobile App · Fintech",
    year: "2023",
    description: "An expense tracker designed from research to an interactive prototype.",
    tone: "#d9ff66",
    image: cashmateCard, // 4:3 card cover: the cover art without the dark strip, lime extended on top
    marquee: { text: "Expense tracker · Mobile app design" },
    summary: {
      facts: [
        { label: "My role", value: "Product Designer — research, UX and UI" },
        { label: "Team", value: "Solo project" },
        { label: "Platform", value: "Mobile app (iOS)" },
        {
          label: "Scope",
          value: "User research, user flow, wireframes, design system, UI design and an interactive prototype",
        },
        {
          label: "Result",
          value: "**A complete product design** — from interviews to a clickable prototype and a component library",
        },
      ],
    },
    sections: [
      {
        label: "About",
        title: "A calm way to see where your money goes",
        blocks: [
          {
            heading: "Product",
            text: "**Cashmate** is a mobile app that helps people manage their personal finances: spending categories, spending statistics, financial goals and more.",
          },
          {
            heading: "Goal",
            text: "The goals were to do **thorough research** first, and then to create a **modern, user-friendly interface** based on it.",
          },
        ],
        maxWidth: 1200,
        image: cashmateCover,
        imageAlt: "Cashmate home screen on a lime background next to an illustrated character holding banknotes",
        caption: "Cashmate — expense tracker mobile app design.",
      },
      {
        label: "Design Process",
        title: "Four stages, from questions to a tested prototype",
        blocks: [
          {
            heading: "Research",
            text: "User audience, interviews, jobs and user stories, competitive and functional analysis, and a moodboard.",
          },
          {
            heading: "Prototyping",
            text: "A functional prototype, the user flow and wireframes.",
          },
          {
            heading: "UI design",
            text: "Visual concept, design system, component library, animation and an interactive prototype.",
          },
          {
            heading: "Testing",
            text: "User testing and final corrections.",
          },
        ],
        maxWidth: 1100,
        image: cashmateProcess,
        imageAlt: "The four stages — research, prototyping, UI design and testing — above two Cashmate onboarding screens",
        caption: "The design process.",
      },
      {
        label: "Audience",
        title: "People who cannot keep track of their money",
        blocks: [
          {
            heading: "Who",
            text: "The audience is wide: almost everyone who handles money, roughly **15 to 65 years old**. What unites them is that, for different reasons, they **cannot keep track of their finances**.",
          },
          {
            heading: "Aygun, 26",
            text: "A teacher who keeps a digital record of her expenses and logs income at the end of each month. She wants **category balances on the home screen**, charts and motivating goals.",
          },
          {
            heading: "Fuad, 30",
            text: "A banker who calculates his income at the end of each day. He wants **notifications** and **daily limits**, sometimes forgets to record expenses, and finds apps hard to understand.",
          },
          {
            heading: "Keywords",
            text: "From the interviews, three words kept coming back: **clear, simple, notice**.",
          },
        ],
        maxWidth: 1000,
        image: cashmateAudience,
        imageAlt: "Two user profiles from the interviews: Aygun, a 26-year-old teacher, and Fuad, a 30-year-old banker",
        caption: "Interview insights — two profiles.",
      },
      {
        label: "Empathy Map",
        title: "What they say, think, do and feel",
        blocks: [
          {
            heading: "Says",
            text: "\"Keep it simple and clear.\" \"I would like to view my account balance on the home page.\"",
          },
          {
            heading: "Thinks",
            text: "It would help to get a notification when the limit is exceeded, and to see a breakdown of where the money is mostly being spent.",
          },
          {
            heading: "Does",
            text: "Deleted an app because he did not understand the interface. Spends a lot on things that are not really needed.",
          },
          {
            heading: "Feels",
            text: "\"Where did the money go?\" — disappointed that he does not understand. At times too lazy to jot down notes.",
          },
          {
            heading: "Insight",
            text: "Three needs came out of it: **clarity, a fast way to record, and gentle control** through limits and notifications.",
          },
        ],
        maxWidth: 1000,
        image: cashmateEmpathy,
        imageAlt: "Empathy map with four quadrants — says, thinks, does, feels — above the Budgets and Analysis screens",
        caption: "Empathy map, and where it led: Budgets and Analysis.",
      },
      {
        label: "User Flow",
        title: "A structure that fits in one tab bar",
        blocks: [
          {
            heading: "Entry",
            text: "Onboarding leads to sign in or sign up — by e-mail or social media — with an error state for a failed sign-up.",
          },
          {
            heading: "Four areas",
            text: "**Home** (accounts, goals, records), **Categories**, **Budgets** and **Analysis** (expense and income overview, expense and income flow, account analysis).",
          },
          {
            heading: "Decision",
            text: "Everything needed day to day is one tap away, and adding a record is always reachable from one central **\"+\"** button.",
          },
        ],
        maxWidth: 900,
        image: cashmateFlow,
        imageAlt: "User flow diagram from onboarding through sign in and sign up to Home, Categories, Budgets and Analysis",
        caption: "User flow.",
      },
      {
        label: "Wireframes",
        title: "Low-fidelity screens to settle the structure",
        blocks: [
          {
            heading: "Quick entry",
            text: "Adding a record is a calculator-style keypad, with account, category, date and notes above it — numbers are entered the way people already type them.",
          },
          {
            heading: "Analysis",
            text: "One analysis screen with a switcher between expense overview, income overview, expense flow, income flow and account analysis.",
          },
          {
            heading: "Budgets",
            text: "Budgeted categories with progress bars, plus a separate list of the categories that have no budget yet.",
          },
          {
            heading: "Around the core",
            text: "Settings for appearance, security and notifications, and an article screen for financial education.",
          },
        ],
        maxWidth: 1000,
        image: cashmateWireframes,
        imageAlt: "Wireframes: home, add record keypad, article, settings, analysis charts, budgets and categories",
        caption: "Wireframes — the structure of every screen.",
      },
      {
        label: "Design System",
        title: "A small, flexible system with lime at its center",
        blocks: [
          {
            heading: "Color",
            text: "A near-black base with **lime** for primary actions and **lilac, mint and pink** as accents.",
          },
          {
            heading: "Typography",
            text: "A seven-step type scale, from 32 pt bold headings down to 10 pt overlines.",
          },
          {
            heading: "Components",
            text: "Buttons in default, pressed and disabled states, social sign-in buttons, chips, a tab bar with a central action and an icon set in active and inactive states.",
          },
        ],
        foundations: true,
        maxWidth: 1000,
        image: cashmateSystem,
        imageAlt: "Design system sheet: colors, typography, icons, buttons, chips and the tab bar",
        caption: "The design system sheet.",
      },
      {
        label: "Visual Concept",
        title: "Friendly, bold and a little playful",
        blocks: [
          {
            heading: "Concept",
            text: "A near-black base with lime, lilac, mint and pink. **Hand-drawn line illustrations** make a serious topic feel friendly.",
          },
          {
            heading: "Onboarding",
            text: "Three colorful steps lead into a calm, dark sign-in screen — the app is playful on the way in and focused once you are in.",
          },
        ],
        maxWidth: 1100,
        image: cashmateOnboarding,
        imageAlt: "Three screens: a lilac welcome screen, a lime \"Ready to take control of your finances?\" screen and a dark sign-in screen",
        caption: "Onboarding and sign-in.",
      },
      {
        label: "Quick Entry",
        title: "The core loop: add an expense in seconds",
        blocks: [
          {
            heading: "Why it matters",
            text: "Fuad forgets to record expenses, and Aygun logs hers only once a month. **If recording is slow, it does not happen.**",
          },
          {
            heading: "How",
            text: "The keypad sits at the bottom, in thumb reach, with **Save** right next to **Cancel**.",
          },
        ],
        cashmateDemo: true,
        maxWidth: 1000,
        image: cashmateCalculator,
        imageAlt: "The add-expense screen: account, category and subcategory pickers, date, notes, an amount of 100 and a keypad",
        caption: "Add an expense.",
      },
      {
        label: "Screens",
        title: "Home, explore, categories and settings",
        blocks: [
          {
            heading: "Home",
            text: "A lime balance card with an illustrated spyglass, expense and income so far, and the accounts right below.",
          },
          {
            heading: "Explore",
            text: "A small educational feed about investing, crypto and NFTs, so the app teaches as well as tracks.",
          },
          {
            heading: "Categories & settings",
            text: "Income and expense categories with subcategories, and settings for currency, start page, passcode and reminders.",
          },
        ],
        maxWidth: 1100,
        galleryCols: 1,
        gallery: [
          {
            image: cashmateHome,
            alt: "Add-expense screen next to the home screen with total balance 650 and accounts",
            caption: "Add an expense and see the balance",
          },
          {
            image: cashmateExplore,
            alt: "The Explore screen with colorful article cards on a feed",
            caption: "Explore — new ideas are waiting",
          },
          {
            image: cashmatePhones,
            alt: "Settings, an article about NFTs and the income categories list",
            caption: "Settings, article and categories",
          },
        ],
      },
      {
        label: "Final Screens",
        title: "The full set, together",
        blocks: [
          {
            heading: "Result",
            text: "A complete set of screens — onboarding, sign-in, home, categories, quick entry, budgets, analysis, explore and settings — all built from one system.",
          },
        ],
        maxWidth: 1200,
        image: cashmateOverview,
        imageAlt: "Overview of the final Cashmate screens on a lime background",
        caption: "Final screens.",
      },
      {
        label: "Reflection",
        title: "What I delivered and what comes next",
        blocks: [
          {
            heading: "Delivered",
            text: "Research with interviews and an empathy map, a user flow, wireframes, a design system with a component library, the final UI and an interactive prototype.",
          },
          {
            heading: "Learned",
            text: "Simple wins. Both people I talked to asked for the same thing in different words: **less effort to record, more clarity about where the money goes.**",
          },
          {
            heading: "Next",
            text: "Test the prototype with more people, work out the notification and limit logic that Fuad asked for, and try the light theme that the settings screen already points to.",
          },
        ],
      },
    ],
  },
];

/** Big numbers of the About section; the labels come from the dictionary (`about.stats`). */
export const statValues = ["35K+", "25%", "8"] as const;
