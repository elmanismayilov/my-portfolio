"use client";

import { useSyncExternalStore } from "react";

// Formatted in the visitor's own time zone (the browser's default), 12-hour with AM/PM.
const formatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

const getSnapshot = () => formatter.format(new Date());
// The server doesn't know the visitor's time zone, so render nothing until hydrated.
const getServerSnapshot = () => null;

export default function LocalClock({ className }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <time className={`tabular-nums ${className ?? ""}`} suppressHydrationWarning>
      {time ?? "--:--:-- --"}
    </time>
  );
}
