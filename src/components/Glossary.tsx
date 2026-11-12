import type { GlossaryItem } from "@/lib/localize";
import Reveal from "./Reveal";

/** Translation of the key interface texts, so the Azerbaijani screens can be read by an international audience. */
export default function Glossary({ items, title }: { items: GlossaryItem[]; title: string }) {
  return (
    <Reveal>
      <div className="mx-auto max-w-[1100px] border-t border-line pt-4">
        <p className="font-mono text-xs uppercase tracking-wide text-muted">
          {title}
        </p>
        <dl className="mt-4 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div key={it.az} className="flex items-baseline justify-between gap-4 border-b border-line py-2.5">
              <dt lang="az" className="text-sm font-medium md:text-base">
                {it.az}
              </dt>
              <dd className="text-right text-sm text-muted md:text-base">{it.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Reveal>
  );
}
