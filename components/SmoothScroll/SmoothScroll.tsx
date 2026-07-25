"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Lenis is a single instance for the app's whole lifetime (below) — Next's
  // client-side route changes swap {children} without a real page load, so
  // without this the new page inherits whatever scroll position the
  // previous page was left at. Landing scrolled-down on a shorter page can
  // put the viewport straight into the global Footer instead of the top.
  // Runs on every pathname change; same-page "#anchor" clicks don't change
  // `pathname` at all, so this can't fight those.
  useEffect(() => {
    (window as any).lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Expose lenis globally so other components can trigger programmatic scrolls
    (window as any).lenis = lenis;

    // Sync Lenis with GSAP ScrollTrigger for flawless scroll scrub tracking
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP's ticker to run Lenis for perfect synchronization
    function raf(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return <>{children}</>;
}
