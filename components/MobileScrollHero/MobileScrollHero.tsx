"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Clock, ShieldCheck, Award, Tag, Grid3x3, Plane } from "lucide-react";
import styles from "./MobileScrollHero.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const FRAME_COUNT = 363;
const getFramePath = (index: number) =>
  `/hero-bg-fr/frame_${String(index).padStart(3, "0")}.webp`;

export default function MobileScrollHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const finalVideoRef = useRef<HTMLVideoElement>(null);
  // Frames only cover the first 21s of FNL.mp4 (frame_001..363 sampled evenly
  // across that range) — past the last frame, this trimmed clip (21s to the
  // video's end) takes over so the finale is real playback, not a frozen
  // frame. Guards against calling .play()/.pause() every scrub tick.
  const videoStartedRef = useRef(false);
  // So handleSkip (outside the useGSAP scope) can target the exact scroll
  // position for a given frame, the same way the auto-scroll-on-load does.
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // We store the current scroll target frame
  const currentFrameRef = useRef(1);
  const overlineRef = useRef<HTMLSpanElement>(null);
  const middleTextRef = useRef<HTMLHeadingElement>(null);
  const cloneLogoRef = useRef<HTMLImageElement>(null);

  // Scroll/Skip hint are visible for the middle stretch of the animation
  // and hidden right before the final reveal. This is purely frame-driven
  // (not gated on the auto-scroll's completion callback) — that callback
  // isn't guaranteed to fire if the user starts scrolling manually before
  // the auto-scroll settles, which previously could leave the controls
  // stuck hidden until you scrolled all the way to the very end.
  const [controlsVisible, setControlsVisible] = useState(false);

  useGSAP(() => {
    const canvas = canvasRef.current;
    // PERFORMANCE FIX: { alpha: false, desynchronized: true } provides a massive GPU boost
    // by bypassing the browser compositor, reducing input lag and tearing on mobile!
    const context = canvas?.getContext("2d", { alpha: false, desynchronized: true });
    if (!canvas || !context || !wrapperRef.current) return;

    // Dynamically size canvas to exact device screen
    // PERFORMANCE FIX: Cap DPR to 1 (or 1.25 max) on mobile devices to prevent 3x/4x mobile screens (like iPhones)
    // from crashing the GPU. Drawing a 1170x2532 image onto a canvas 60 times a second causes severe thermal lag.
    const dpr = Math.min(window.devicePixelRatio || 1, 1);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    const images: HTMLImageElement[] = [];

    const render = () => {
      const exactFrame = currentFrameRef.current;
      const frame1Idx = Math.floor(exactFrame);
      const frame2Idx = Math.min(Math.ceil(exactFrame), FRAME_COUNT);
      const blend = exactFrame % 1;

      let img1 = images[frame1Idx];
      let img2 = images[frame2Idx];

      // Fallback: If target frame isn't loaded, scrub backwards to the closest loaded frame
      let currentIdx = frame1Idx;
      while (currentIdx > 1 && (!img1 || !img1.complete || img1.naturalWidth === 0)) {
        currentIdx--;
        img1 = images[currentIdx];
      }

      if (img1 && img1.complete && img1.naturalWidth > 0) {
        const hRatio = canvas.width / img1.naturalWidth;
        const vRatio = canvas.height / img1.naturalHeight;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img1.naturalWidth * ratio) / 2;
        const centerShift_y = (canvas.height - img1.naturalHeight * ratio) / 2;

        // Draw Base Frame
        context.globalAlpha = 1;
        context.drawImage(
          img1,
          0, 0, img1.naturalWidth, img1.naturalHeight,
          centerShift_x, centerShift_y, img1.naturalWidth * ratio, img1.naturalHeight * ratio
        );

        // Draw Next Frame on top with opacity based on decimal (Crossfade Interpolation)
        // This adds artificial motion blur and completely eliminates stuttering on very slow scrolls!
        if (blend > 0.02 && img2 && img2.complete && img2.naturalWidth > 0 && frame1Idx !== frame2Idx) {
          context.globalAlpha = blend;
          context.drawImage(
            img2,
            0, 0, img2.naturalWidth, img2.naturalHeight,
            centerShift_x, centerShift_y, img2.naturalWidth * ratio, img2.naturalHeight * ratio
          );
          context.globalAlpha = 1; // Reset
        }
      }
    };

    // Preload images
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      images[i] = img;

      // If the image loads and we are currently parked on it, render immediately
      img.onload = () => {
        const exact = currentFrameRef.current;
        if (Math.floor(exact) === i || Math.ceil(exact) === i) {
          render();
        }
      };
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        pin: true,
        start: "top top",
        end: "+=400%", // Restore the original longer scroll to keep speed normal
        scrub: 1.2, // Reduced from 2.5 to 1.2 so the video responds much faster to the physical finger swipe on mobile
        anticipatePin: 1, // Prevents mobile pin jitter
        onUpdate: () => {
          const frame = currentFrameRef.current;
          // Visible from the moment the auto-scroll parks (frame ~63) all the way
          // through, only hiding right before the final title/CTA reveal starts (333).
          const shouldShow = frame >= 55 && frame <= 320;
          setControlsVisible((prev) => (prev === shouldShow ? prev : shouldShow));

          // Starts the real video for the finale once the final-reveal fade-in
          // begins (frame 353, same label as the opacity tween below) — not a
          // stricter frame >= FRAME_COUNT check, because the scroll position
          // Skip computes settles a handful of frames short of the exact end
          // (measured ~358/363) due to minor geometry drift between when that
          // target is computed and when the scroll actually settles. Pausing
          // only once scrolled meaningfully back (below 320, past the wide
          // gap here) keeps sub-pixel jitter right at the boundary from
          // re-triggering pause immediately after play.
          const video = finalVideoRef.current;
          if (video && frame >= 353 && !videoStartedRef.current) {
            videoStartedRef.current = true;
            video.currentTime = 0;
            video.play().catch(() => {});
          } else if (video && frame < 320 && videoStartedRef.current) {
            videoStartedRef.current = false;
            video.pause();
          }
        },
      },
    });
    tlRef.current = tl;

    tl.to(currentFrameRef, {
      current: FRAME_COUNT,
      ease: "none",
      duration: FRAME_COUNT,
      onUpdate: render,
    }, 0);

    const headerLogo = document.getElementById("global-header-logo");

    let endTop = "1rem";
    let endLeft = "1.5rem";
    if (window.innerWidth <= 1023) {
      endTop = "0.75rem";
      endLeft = "1rem";
    }
    if (window.innerWidth <= 480) {
      endTop = "0.6rem";
      endLeft = "0.85rem";
    }

    // Hide global header logo, show clone logo during animation
    tl.to(headerLogo, { opacity: 0, duration: 0.1 }, 0);
    tl.to(cloneLogoRef.current, { opacity: 1, duration: 0.1 }, 0);

    // Frame 1 to 64: Animate clone logo from top-left to center — finishes
    // right as the auto-scroll parks at frame 63, so it reads as settled
    // rather than mid-motion. Stays centered (holding) until the frame-104
    // back-to-header tween below picks it back up.
    tl.to(cloneLogoRef.current, {
      top: "40%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
      scale: 1.8, // Reduced from 3.5, then 2.5
      ease: "power2.inOut",
      duration: 64,
    }, 0);

    // Fade IN overline text so it arrives together with the logo at 64
    tl.fromTo(overlineRef.current, {
      y: 20, opacity: 0
    }, {
      y: 0, opacity: 1, duration: 25, ease: "power2.out"
    }, 39);

    // Frame 104 to 149: Animate back to header
    tl.to(cloneLogoRef.current, {
      top: endTop,
      left: endLeft,
      xPercent: 0,
      yPercent: 0,
      scale: 1,
      ease: "power2.inOut",
      duration: 45,
    }, 104);

    // Fade OUT overline text as logo leaves
    tl.to(overlineRef.current, {
      y: -20, opacity: 0, duration: 30, ease: "power2.in"
    }, 119);

    // Restore real header logo
    tl.to(cloneLogoRef.current, { opacity: 0, duration: 0.1 }, 149);
    tl.to(headerLogo, { opacity: 1, duration: 0.1 }, 149);

    // Fade IN middle text so it is fully visible by frame 164
    tl.fromTo(
      middleTextRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 15, ease: "power2.out" },
      149
    );

    // Fade OUT middle text shortly after
    tl.to(
      middleTextRef.current,
      { y: -30, opacity: 0, duration: 15, ease: "power2.in" },
      202
    );

    // Fade IN final text at the very end
    tl.fromTo(
      [titleRef.current, ctaRef.current],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 15, stagger: 5, ease: "power3.out" },
      333
    );

    // Fade IN the end video at the very end (frame 353) — it's already
    // started playing by frame 363 (see onUpdate above), so it's a few
    // frames into motion by the time it's fully visible, not a hard cut.
    tl.to(
      finalVideoRef.current,
      { opacity: 1, duration: 10, ease: "power2.inOut" },
      353
    );

    // Add a very small dead zone to let scrub lag settle before unpinning
    tl.to({}, { duration: 10 });

    // Auto-scroll the site to frame 63 on load to introduce the mechanic
    // Slight delay to ensure ScrollTrigger has calculated exact mobile viewport dimensions (including address bars)
    const timeoutId = setTimeout(() => {
      const st = tl.scrollTrigger;
      if (!st) return;

      const targetTime = 63;
      const progress = targetTime / tl.duration();
      const targetY = st.start + (st.end - st.start) * progress;

      if ((window as any).lenis) {
        // Use Lenis native smooth scroll to prevent GSAP ScrollToPlugin conflicts
        (window as any).lenis.scrollTo(targetY, {
          duration: 2.4, // Increased for a smoother glide
          easing: (t: number) => 1 - Math.pow(1 - t, 3), // easeOutCubic - smoother, softer stop
        });
      } else {
        // Fallback
        gsap.to(window, {
          scrollTo: { y: targetY, autoKill: true },
          duration: 2.7,
          ease: "power2.out",
        });
      }
    }, 800);

    return () => clearTimeout(timeoutId);
  }, { dependencies: [], scope: wrapperRef });

  // Land exactly on frame 363 — the last scrubbed frame, video's 00:21 mark —
  // not further down into the pin's dead zone or past it. Same start/end +
  // progress math as the auto-scroll-on-load effect above. Landing there lets
  // the scrub catch up to FRAME_COUNT and the onUpdate handler above starts
  // the end video itself, same as reaching it by scrolling normally.
  const handleSkip = () => {
    const st = tlRef.current?.scrollTrigger;
    if (!st) return;

    const progress = FRAME_COUNT / tlRef.current!.duration();
    const targetY = st.start + (st.end - st.start) * progress;

    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(targetY, {
        duration: 1.5,
        easing: (t: number) => 1 - Math.pow(1 - t, 3)
      });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  const scrollToServices = () => {
    const lenis = (window as any).lenis;
    const marker = document.getElementById("mobile-home-start");
    if (lenis) lenis.scrollTo("#mobile-home-start", { duration: 1.4 });
    else marker?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={wrapperRef} className={styles.heroWrapper}>
      <div className={styles.stickyContainer}>
        <canvas ref={canvasRef} className={styles.canvas} />

        {/* Real video for the finale (frame data only covers 0:00-0:20) —
            poster is the last scrubbed frame so there's no gap between the
            canvas handing off and the video's own first frame painting. */}
        <video
          ref={finalVideoRef}
          src="/images/FNL-web.mp4"
          poster={`/hero-bg-fr/frame_${FRAME_COUNT}.webp`}
          muted
          playsInline
          loop
          preload="auto"
          className={styles.finalImage}
          style={{ opacity: 0 }}
        />

        <div className={styles.overlay} />

        {/* Clone Logo for Yoyo Animation */}
        <img ref={cloneLogoRef} src="/logos/amernew-cropped.png" className={styles.cloneLogo} alt="" />

        <span ref={overlineRef} className={styles.overline} style={{ zIndex: 2 }}>
          24/7 IMMIGRATION <br /> &amp; VISA SERVICES
        </span>

        <button
          className={`${styles.skipButton} ${controlsVisible ? styles.controlsVisible : ""}`}
          onClick={handleSkip}
          aria-label="Skip animation"
          tabIndex={controlsVisible ? 0 : -1}
        >
          Skip
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="7 13 12 18 17 13"></polyline>
            <polyline points="7 6 12 11 17 6"></polyline>
          </svg>
        </button>

        <div className={styles.content}>
          <h2 ref={middleTextRef} className={styles.middleText} style={{ opacity: 0, position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%', padding: '0 1.5rem' }}>
            Your Trusted Partner for <br /> UAE Visa &amp; Immigration
          </h2>
        </div>

        {/* Final reveal is pinned to the bottom of the screen, independent of the
            centered middle text above, matching the app's bottom-sheet style splash */}
        <div className={styles.finalReveal}>
          <h1 ref={titleRef} className={styles.finalTitle} style={{ opacity: 0 }}>
            Seamless Immigration Solutions Tailored to Your <span className={styles.goldText}>Journey</span>
          </h1>

          <div ref={ctaRef} className={styles.finalCta} style={{ opacity: 0 }}>
            <p className={styles.finalSub}>
              Government services, around the clock — the only AMER centre open 24 hours, every day.
            </p>

            <div className={styles.btnRow}>
              <Link href="/online-services" className={`${styles.btn} ${styles.btnGold}`}>
                Apply Online
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className={styles.quickLinksRow}>
              <Link href="/pricing-list" className={styles.quickLink}>
                <Tag size={15} />
                Pricing
              </Link>
              <button type="button" className={styles.quickLink} onClick={scrollToServices}>
                <Grid3x3 size={15} />
                Services
              </button>
              <Link href="/uae-tourist-visa" className={styles.quickLink}>
                <Plane size={15} />
                Visit Visa
              </Link>
            </div>

            <div className={styles.trustRow}>
              <span className={styles.trustItem}>
                <Clock size={13} /> Open 24/7
              </span>
              <span className={styles.trustDot} />
              <span className={styles.trustItem}>
                <ShieldCheck size={13} /> Govt. Backed
              </span>
              <span className={styles.trustDot} />
              <span className={styles.trustItem}>
                <Award size={13} /> Since 2017
              </span>
            </div>
          </div>
        </div>

        <div
          ref={scrollHintRef}
          className={`${styles.scrollHint} ${controlsVisible ? styles.controlsVisible : ""}`}
          aria-hidden
        >
          <div className={styles.mouse}>
            <div className={styles.wheel}></div>
          </div>
          <span className={styles.scrollLabel}>Scroll</span>
        </div>
      </div>
    </div>
  );
}
