"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import styles from "./MobileScrollHero.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const FRAME_COUNT = 270;
const getFramePath = (index: number) =>
  `/hero-bg-fr/frame_${String(index).padStart(3, "0")}.webp`;

export default function MobileScrollHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const finalImageRef = useRef<HTMLImageElement>(null);

  // We store the current scroll target frame
  const currentFrameRef = useRef(1);
  const overlineRef = useRef<HTMLSpanElement>(null);
  const middleTextRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const canvas = canvasRef.current;
    // { alpha: false } disables transparency computations, providing a massive GPU performance boost!
    const context = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !context || !wrapperRef.current) return;

    // Dynamically size canvas to exact device screen to prevent GPU scale lag
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    const images: HTMLImageElement[] = [];

    const render = () => {
      let targetFrame = Math.round(currentFrameRef.current);
      let img = images[targetFrame];

      // Fallback: If target frame isn't loaded, scrub backwards to the closest loaded frame!
      // This prevents the canvas from breaking/freezing while waiting for downloads.
      while (targetFrame > 1 && (!img || !img.complete || img.naturalWidth === 0)) {
        targetFrame--;
        img = images[targetFrame];
      }

      if (img && img.complete && img.naturalWidth > 0) {
        const hRatio = canvas.width / img.naturalWidth;
        const vRatio = canvas.height / img.naturalHeight;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.naturalWidth * ratio) / 2;
        const centerShift_y = (canvas.height - img.naturalHeight * ratio) / 2;

        context.drawImage(
          img,
          0,
          0,
          img.naturalWidth,
          img.naturalHeight,
          centerShift_x,
          centerShift_y,
          img.naturalWidth * ratio,
          img.naturalHeight * ratio
        );
      }
    };

    // Preload images
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      images[i] = img;

      // If the image loads and we are currently parked on it, render immediately
      img.onload = () => {
        if (Math.round(currentFrameRef.current) === i) {
          render();
        }
      };
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        pin: true,
        start: "top top",
        end: "+=400%", // Reverted back to 400vh for a longer, slower scroll
        scrub: 1.5,
        anticipatePin: 1, // Prevents mobile pin jitter
      },
    });

    tl.to(currentFrameRef, {
      current: FRAME_COUNT,
      ease: "none",
      duration: FRAME_COUNT,
      onUpdate: render,
    });

    tl.to(
      scrollHintRef.current,
      { opacity: 0, y: -20, ease: "power2.in", duration: 30 },
      0
    );

    // Fade IN middle text around frame 100
    tl.fromTo(
      middleTextRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 15, ease: "power2.out" },
      100
    );

    // Fade OUT middle text shortly after
    tl.to(
      middleTextRef.current,
      { y: -30, opacity: 0, duration: 15, ease: "power2.in" },
      135
    );

    // Fade IN final text at the very end
    tl.fromTo(
      [titleRef.current, ctaRef.current],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 15, stagger: 5, ease: "power3.out" },
      240
    );

    // Fade scroll hint back IN at the end
    tl.fromTo(
      scrollHintRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 15, ease: "power3.out", immediateRender: false },
      250
    );

    // Fade IN the static final image at the very end (frame 260).
    tl.to(
      finalImageRef.current,
      { opacity: 1, duration: 10, ease: "power2.inOut" },
      260 
    );

    // Re-add dead zone to let scrub lag settle before unpinning
    tl.to({}, { duration: 60 });

    // Auto-scroll the site slowly to frame 37 on load to introduce the mechanic
    // Total timeline duration is 270 + 60 = 330 frames. Pinned distance is 400vh.
    // Frame 37 is (37 / 330) * 400vh down the page.
    gsap.to(window, {
      scrollTo: { 
        y: (wrapperRef.current?.offsetTop || 0) + (window.innerHeight * 4 * (37 / 330)), 
        autoKill: true // If the user touches the screen, instantly stop the auto-scroll
      },
      duration: 6.5, // Extremely slow, gentle scroll
      ease: "power1.inOut", // Even softer ease
      delay: 0.8 // Wait just under a second before starting
    });
  }, { dependencies: [], scope: wrapperRef });

  return (
    <div ref={wrapperRef} className={styles.heroWrapper}>
      <div className={styles.stickyContainer}>
        <canvas ref={canvasRef} className={styles.canvas} />
        
        {/* Static final frame image to guarantee smooth scrolling on exit */}
        <img 
          ref={finalImageRef} 
          src="/hero-bg-fr/frame_270.webp" 
          alt="" 
          className={styles.finalImage} 
          style={{ opacity: 0 }} 
        />
        
        <div className={styles.overlay} />

        <span ref={overlineRef} className={styles.overline} style={{ opacity: 1, zIndex: 2 }}>
          24/7 IMMIGRATION <br /> &amp; VISA SERVICES
        </span>

        <div className={styles.content}>

          <h2 ref={middleTextRef} className={styles.middleText} style={{ opacity: 0, position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%', padding: '0 1.5rem' }}>
            Your Trusted Partner for <br /> UAE Visa &amp; Immigration
          </h2>

          <h1 ref={titleRef} className={styles.finalTitle} style={{ opacity: 0 }}>
            UAE Visa &amp; <br /> Immigration Services
          </h1>

          <div className={styles.ctaContainer}>
            <Link ref={ctaRef} href="/services" className={styles.viewMore} style={{ opacity: 0 }}>
              View More
            </Link>
          </div>
        </div>

        <div ref={scrollHintRef} className={styles.scrollHint} aria-hidden>
          <div className={styles.mouse}>
            <div className={styles.wheel}></div>
          </div>
          <span className={styles.scrollLabel}>Scroll</span>
        </div>
      </div>
    </div>
  );
}
