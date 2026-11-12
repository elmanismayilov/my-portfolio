import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Kept in sync with src/lib/i18n/config.ts (the proxy must not rely on shared modules).
const locales = ["en", "ru", "az"];
const defaultLocale = "en";

/** English is the default: any path without a language prefix is redirected to /en/... */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals and anything that looks like a file (images, cv.pdf, favicon, videos...)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
