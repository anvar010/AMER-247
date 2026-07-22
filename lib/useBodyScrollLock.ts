import { ScrollTrigger } from "gsap/ScrollTrigger";

// Locks background scroll while a bottom-sheet/modal is open. Plain
// `body { overflow: hidden }` doesn't fully stop background touch-drag on
// iOS Safari (it "rubber-bands" through to whatever's underneath a fixed
// overlay), so this pins the body in place and restores the exact scroll
// position on release. Counter-based so two overlays open at once (or a
// fast close-then-reopen) don't fight over restoring scroll position.
let lockCount = 0;
let savedScrollY = 0;

export function lockBodyScroll() {
  if (lockCount === 0) {
    savedScrollY = window.scrollY;
    // Lenis keeps easing toward its own internal target scroll every raf
    // tick regardless of body position, so if it's mid-momentum (or a
    // wheel/touch event leaks past the overlay) while the body is pinned,
    // its internal scroll value drifts away from the real (frozen) one.
    // Stopping it here halts that tween and resyncs its internal value to
    // the real scroll position right now, before it can drift.
    (window as any).lenis?.stop();
    // Pinning the body removes it from the document flow, so the page's
    // scrollable height instantly collapses to the viewport height and the
    // browser force-clamps window.scrollY to 0. Any GSAP ScrollTrigger
    // scrubbing off that scroll position (e.g. the splash's pinned canvas
    // hero) would otherwise snap to its start-of-scroll state right here,
    // then snap again when scroll is restored on unlock. Disabling each
    // trigger (without resetting its styles) freezes it in place through
    // both jumps instead.
    ScrollTrigger.getAll().forEach((st) => st.disable(false));
    // The scrollY collapse above (and, on mobile, the browser toolbar
    // reflowing) fires a native `resize` on window. GSAP listens for that
    // globally and independently of any trigger's enabled state, so it
    // still calls ScrollTrigger.refresh() -> reverts every trigger to its
    // unpinned layout, snapping the pinned hero anyway. Drop "resize" from
    // the auto-refresh events for the duration of the lock so that never
    // fires; restored on unlock.
    ScrollTrigger.config({ autoRefreshEvents: "visibilitychange,DOMContentLoaded,load" });
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${savedScrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
  }
  lockCount++;
}

export function unlockBodyScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    const body = document.body;
    body.style.position = "";
    body.style.top = "";
    body.style.left = "";
    body.style.right = "";
    body.style.width = "";
    window.scrollTo(0, savedScrollY);
    // Restart Lenis after the real scroll position is back, so its resync
    // picks up savedScrollY instead of the stale value it had when locked -
    // otherwise it eases toward that stale target on the next raf tick,
    // which looks like the page animating back to where it "should" be.
    (window as any).lenis?.start();
    // enable()'s default "reset" behavior forces progress to 0 before its
    // own refresh() gets a chance to recompute the real value from the
    // scroll position just restored above - that momentary zero is what
    // rendered as a visible snap to the first frame. Passing false skips
    // that reset; refresh() still runs and resyncs against the correct,
    // already-restored scroll position.
    ScrollTrigger.getAll().forEach((st) => st.enable(false));
    ScrollTrigger.config({ autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize" });
  }
}
