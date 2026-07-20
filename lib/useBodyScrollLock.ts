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
    // Pinning the body removes it from the document flow, so the page's
    // scrollable height instantly collapses to the viewport height and the
    // browser force-clamps window.scrollY to 0. Any GSAP ScrollTrigger
    // scrubbing off that scroll position (e.g. the splash's pinned canvas
    // hero) would otherwise snap to its start-of-scroll state right here,
    // then snap again when scroll is restored on unlock. Disabling each
    // trigger (without resetting its styles) freezes it in place through
    // both jumps instead.
    ScrollTrigger.getAll().forEach((st) => st.disable(false));
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
    ScrollTrigger.getAll().forEach((st) => st.enable());
  }
}
