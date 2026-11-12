export const locales = ["en", "ru", "az"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Native names, for the language switcher. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  az: "Azərbaycanca",
};

/** Locale tags for Intl formatting. */
export const intlTag: Record<Locale, string> = {
  en: "en-US",
  ru: "ru-RU",
  az: "az-AZ",
};

/** Prefixes an internal path ("/", "/#work", "/work/slug") with the locale. */
export function localeHref(locale: Locale, path: string): string {
  if (path === "/") return `/${locale}`;
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}
