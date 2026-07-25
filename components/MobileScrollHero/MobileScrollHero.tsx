"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Clock, ShieldCheck, Award, Tag, Grid3x3, Plane } from "lucide-react";
import styles from "./MobileScrollHero.module.css";

// Total choreography length in arbitrary units. The logo/text tween
// positions below (37, 60, 104, ...) are all on this same scale - "frame"
// here just means "how far into the intro video's playback", mapped from
// its actual currentTime each animation frame.
const FRAME_COUNT = 363;

export default function MobileScrollHero() {
  const startVideoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const ctaRef = useRef<HTMLDivElement>(null);
  const finalVideoRef = useRef<HTMLVideoElement>(null);
  // The start video only covers the first 21s of the source footage — once
  // it finishes (or Skip is used), this trimmed tail clip (21s to the end)
  // takes over so the finale is real playback, not a frozen frame. Guards
  // against calling .play()/.pause() more than once.
  const videoStartedRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  const overlineRef = useRef<HTMLSpanElement>(null);
  const middleTextRef = useRef<HTMLHeadingElement>(null);
  const cloneLogoRef = useRef<HTMLImageElement>(null);

  // Skip button is visible for the middle stretch of the intro and hidden
  // right before the final reveal starts.
  const [controlsVisible, setControlsVisible] = useState(false);

  useGSAP(() => {
    const video = startVideoRef.current;
    if (!video) return;

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

    const tl = gsap.timeline({ paused: true });

    // Hide global header logo, show clone logo during animation
    tl.to(headerLogo, { opacity: 0, duration: 0.1 }, 0);
    tl.to(cloneLogoRef.current, { opacity: 1, duration: 0.1 }, 0);

    // 0 to 60: Animate clone logo from top-left to center — finishes right
    // as the intro settles into its main stretch, so it reads as settled
    // rather than mid-motion. Stays centered (holding) until the 104
    // back-to-header tween below picks it back up.
    tl.to(cloneLogoRef.current, {
      top: "40%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
      scale: 1.8,
      ease: "power2.inOut",
      duration: 60,
    }, 0);

    // Fade IN overline text so it arrives together with the logo at 60
    tl.fromTo(overlineRef.current, {
      y: 20, opacity: 0
    }, {
      y: 0, opacity: 1, duration: 23, ease: "power2.out"
    }, 37);

    // 104 to 149: Animate back to header
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

    // Fade IN middle text so it is fully visible by 164
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

    // Fade IN final text at the very end. ctaRef holds real links (Apply
    // Online, Pricing, Visit Visa) - opacity 0 alone doesn't stop clicks, so
    // without the pointerEvents pair here they're invisible but still fully
    // clickable the entire time before this reveal (that's what was letting
    // a tap anywhere near there land on "Visit Visa" instead of Skip).
    tl.fromTo(
      [titleRef.current, ctaRef.current],
      { y: 50, opacity: 0, pointerEvents: "none" },
      { y: 0, opacity: 1, duration: 15, stagger: 5, ease: "power3.out", pointerEvents: "auto" },
      333
    );

    // Fade IN the end video at the very end (353) — it's already started
    // playing by 363 (see startFinale below), so it's a few frames into
    // motion by the time it's fully visible, not a hard cut.
    tl.to(
      finalVideoRef.current,
      { opacity: 1, duration: 10, ease: "power2.inOut" },
      353
    );

    const startFinale = () => {
      const finalVideo = finalVideoRef.current;
      if (!finalVideo || videoStartedRef.current) return;
      videoStartedRef.current = true;
      video.playbackRate = 1; // in case Skip had sped it up
      finalVideo.currentTime = 0;
      finalVideo.play().catch(() => {});
    };

    let lastSyncTime = 0;
    const sync = (now: number) => {
      // Recomputing the whole timeline + writing logo/text styles on every
      // display frame (~60/s) competes with the browser's own video decode
      // and paint for the main thread, which is what read as laggy playback
      // - throttling to ~30/s halves that work and is still plenty smooth
      // for these slow, multi-second tweens.
      if (now - lastSyncTime >= 32) {
        lastSyncTime = now;
        const duration = video.duration || 21;
        const frame = Math.min((video.currentTime / duration) * FRAME_COUNT, FRAME_COUNT);
        tl.seek(frame);

        const shouldShow = frame >= 51 && frame <= 320;
        setControlsVisible((prev) => (prev === shouldShow ? prev : shouldShow));

        if (frame >= 353) startFinale();
      }

      if (!video.ended) {
        rafIdRef.current = requestAnimationFrame(sync);
      }
    };

    video.addEventListener("ended", startFinale);
    video.muted = true;
    video.play().catch(() => {});
    // Start the loop immediately rather than waiting for a "play" event -
    // autoPlay can start (and fire "play") before this listener would even
    // be attached, which left the loop never started and the logo/text
    // tweens frozen at their hidden initial state while the video itself
    // played on regardless.
    rafIdRef.current = requestAnimationFrame(sync);

    return () => {
      video.removeEventListener("ended", startFinale);
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
    };
  }, { scope: wrapperRef });

  // Fast-forwards the intro instead of hard-cutting to the end - the existing
  // sync loop (see useGSAP above) keeps tracking currentTime and hands off to
  // the finale itself once it reaches the same threshold normal playback
  // would, just compressed into a couple seconds.
  const handleSkip = () => {
    const video = startVideoRef.current;
    if (video && !video.ended) {
      video.playbackRate = 8;
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
        {/* Autoplays on mount, no scroll dependency - the choreography above
            follows its playback time instead of scroll position. */}
        <video
          ref={startVideoRef}
          src="/images/FNL-start-web.mp4"
          poster="/hero-bg-fr/frame_001.webp"
          muted
          playsInline
          autoPlay
          preload="auto"
          className={styles.canvas}
        />

        {/* Real video for the finale (start clip only covers 0:00-0:21) —
            poster is the last scrubbed frame so there's no gap between the
            start clip handing off and this video's own first frame painting. */}
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
        <img ref={cloneLogoRef} src="/logos/amernew-cropped.webp" className={styles.cloneLogo} alt="" />

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
          <h1 ref={titleRef} className={styles.finalTitle} style={{ opacity: 0, pointerEvents: "none" }}>
            Seamless Immigration Solutions Tailored to Your <span className={styles.goldText}>Journey</span>
          </h1>

          <div ref={ctaRef} className={styles.finalCta} style={{ opacity: 0, pointerEvents: "none" }}>
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
      </div>
    </div>
  );
}
