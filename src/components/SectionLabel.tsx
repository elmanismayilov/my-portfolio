export default function SectionLabel({
  index,
  title,
  aside,
}: {
  index: string;
  title: string;
  aside?: string;
}) {
  return (
    <div className="grid grid-cols-12 gap-4 border-t border-foreground pt-4 font-mono text-xs uppercase tracking-wide">
      <span className="col-span-2 md:col-span-3">{index}</span>
      <h2 className="col-span-7 md:col-span-6">{title}</h2>
      {aside && <span className="col-span-3 text-right text-muted">{aside}</span>}
    </div>
  );
}
