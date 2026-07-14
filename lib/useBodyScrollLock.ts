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
  }
}
