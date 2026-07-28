import { isApplyFormRoute } from "@/lib/applyLink";

// Routes whose top of page is plain light background with no dark/colored
// hero image behind it — the header's default transparent state (meant to
// overlay a hero) is nearly invisible there, so it needs to start opaque
// immediately instead of waiting for scroll, same as the apply-form routes.
const OPAQUE_FROM_TOP_PREFIXES = ["/news/", "/center", "/request-sent", "/error"];

// These routes only have a light hero at the desktop breakpoint — mobile
// keeps its own dark hero, where the transparent white-on-dark header is
// still correct, so the opaque override only applies from that width up.
const OPAQUE_FROM_TOP_DESKTOP_ONLY_PREFIXES = ["/pricing-list", "/amer247-services", "/news", "/about", "/online-services", "/uae-tourist-visa", "/contact", "/career", "/payment-status", "/det247-services", "/medical-centres"];
const DESKTOP_BREAKPOINT = 769;

// Pathname-only, deterministic between server and client — safe to use in
// an initial useState() initializer, which React's hydration also runs on
// the client's first pass. Anything reading window.innerWidth there would
// diverge from the (window-less) server-rendered HTML: React detects the
// mismatch and keeps the server output rather than patching it, so the
// header would get stuck in the wrong state permanently instead of just
// flashing briefly. The width check belongs only in post-mount effects.
export function needsOpaqueHeaderStatic(pathname: string): boolean {
  if (isApplyFormRoute(pathname)) return true;
  return OPAQUE_FROM_TOP_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function needsOpaqueHeader(pathname: string): boolean {
  if (needsOpaqueHeaderStatic(pathname)) return true;
  if (
    typeof window !== "undefined" &&
    window.innerWidth >= DESKTOP_BREAKPOINT &&
    OPAQUE_FROM_TOP_DESKTOP_ONLY_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  ) {
    return true;
  }
  return false;
}
