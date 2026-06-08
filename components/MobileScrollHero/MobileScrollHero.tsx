"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./MobileScrollHero.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FRAME_COUNT = 240;
const getFramePath = (index: number) =>
  `/hero-bg-fr/frame_${String(index).padStart(3, "0")}.webp`;

export default function MobileScrollHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  // We store the current scroll target frame
  const currentFrameRef = useRef(1);
  const overlineRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: false }); // Disable alpha for huge performance boost
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
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // Added 1.5s momentum lag to make it buttery smooth instead of jerky
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

    // Fade IN everything at the very end (starting at frame 220 of 240)
    tl.fromTo(
      [overlineRef.current, titleRef.current, ctaRef.current],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 20, stagger: 5, ease: "power3.out" },
      220 
    );
  });

  return (
    <div ref={wrapperRef} className={styles.heroWrapper}>
      <div className={styles.stickyContainer}>
        <canvas ref={canvasRef} className={styles.canvas} />
        <div className={styles.overlay} />

        <div className={styles.content}>
          <span ref={overlineRef} className={styles.overline} style={{ opacity: 0 }}>24/7 IMMIGRATION &amp; VISA SERVICES</span>
          <h1 ref={titleRef} className={styles.heroTitle} style={{ opacity: 0 }}>
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
