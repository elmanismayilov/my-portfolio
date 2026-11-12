"use client";

import { useMemo, useSyncExternalStore } from "react";
import { intlTag } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/provider";

// Formatted in the visitor's own time zone (the browser's default), in the conventions of the page language
// (12-hour with AM/PM in English, 24-hour in Russian and Azerbaijani).
const options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit" };

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

// The server doesn't know the visitor's time zone, so render nothing until hydrated.
const getServerSnapshot = () => null;

export default function LocalClock({ className }: { className?: string }) {
  const { locale } = useI18n();
  const formatter = useMemo(
    () => new Intl.DateTimeFormat(intlTag[locale], { ...options, hour12: locale === "en" }),
    [locale],
  );
  const time = useSyncExternalStore(subscribe, () => formatter.format(new Date()), getServerSnapshot);

  return (
    <time className={`tabular-nums ${className ?? ""}`} suppressHydrationWarning>
      {time ?? "--:--:-- --"}
    </time>
  );
}
