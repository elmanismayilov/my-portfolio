"use client";

import { createContext, useContext, type ReactNode } from "react";
import { intlTag, type Locale } from "./config";
import type { Dictionary } from "./dictionaries";

type Ctx = { locale: Locale; dict: Dictionary };

const I18nContext = createContext<Ctx | null>(null);

/** Gives client components the current language and its interface strings. */
export function I18nProvider({ locale, dict, children }: Ctx & { children: ReactNode }) {
  return <I18nContext.Provider value={{ locale, dict }}>{children}</I18nContext.Provider>;
}

export function useI18n(): Ctx & { number: (n: number) => string } {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return { ...ctx, number: (n) => n.toLocaleString(intlTag[ctx.locale]) };
}

/** Replaces {name} placeholders in a dictionary string. */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ""));
}
