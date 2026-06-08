"use client";

import { useEffect, useState } from "react";
import styles from "./Hero2.module.css";
import Link from "next/link";
import { ArrowRight, Plane, Shield, Globe2 } from "lucide-react";

export default function Hero2() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress between 0 and 1
      // 800 pixels to full effect
      const totalScroll = 800;
      const progress = Math.min(Math.max(window.scrollY / totalScroll, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Visual calculations based on progress
  const clipPathInset = 15 * scrollProgress; // From 0% to 15%
  const imageScale = 1.15 - (scrollProgress * 0.15); // From 1.15 to 1.0
  const titleY = scrollProgress * -200; // Move up significantly
  const textOpacity = 1 - (scrollProgress * 1.5); // Fade out

  return (
    <section className={styles.hero2Container}>
      <div className={styles.stickyWrapper}>

        {/* Background Image that clips on scroll */}
        <div
          className={styles.mediaContainer}
          style={{
            clipPath: `inset(${clipPathInset}% ${clipPathInset}% ${clipPathInset}% ${clipPathInset}% round ${scrollProgress * 32}px)`
          }}
        >
          {/* Using the video from the original hero for better impact, or the image */}
          <video
            className={styles.bgMedia}
            autoPlay muted loop playsInline
            poster="/images/dubai.jpg"
            style={{ transform: `scale(${imageScale})` }}
          >
            <source src="/images/31956-389724705_medium.mp4" type="video/mp4" />
          </video>
          <div className={styles.darkOverlay} />
        </div>

        {/* Floating features that appear as you scroll */}
        <div className={styles.floatingFeatures} style={{ opacity: scrollProgress * 2 }}>
          <div className={styles.feature} style={{ transform: `translateY(${100 - scrollProgress * 100}px)` }}>
            <Plane className={styles.featureIcon} />
            <span>Fast Visas</span>
          </div>
          <div className={styles.feature} style={{ transform: `translateY(${120 - scrollProgress * 120}px)` }}>
            <Shield className={styles.featureIcon} />
            <span>Secure Process</span>
          </div>
          <div className={styles.feature} style={{ transform: `translateY(${140 - scrollProgress * 140}px)` }}>
            <Globe2 className={styles.featureIcon} />
            <span>Global Reach</span>
          </div>
        </div>

        {/* Main Content */}
        <div className={`container ${styles.content}`}>
          <div
            className={styles.textWrap}
            style={{
              transform: `translateY(${titleY}px)`,
              opacity: Math.max(textOpacity, 0)
            }}
          >
            <div className={styles.label}>24/7 IMMIGRATION & VISA SERVICES</div>
            <h1 className={styles.headline}>
              <span>Beyond</span><br />
              <span className={styles.italic}>Borders.</span>
            </h1>
            <p className={styles.subhead}>
              Experience the new standard of immigration. Seamless, prestigious, and meticulously handled. Your gateway to the UAE starts here.
            </p>
            <div className={styles.actionGroup}>
              <Link href="/services" className={styles.ctaPrimary}>
                Begin Your Journey <ArrowRight size={20} />
              </Link>
              <Link href="/contact" className={styles.ctaSecondary}>
                Speak to an Expert
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* The spacer creates the actual scrollable height for the sticky section */}
      <div className={styles.scrollSpacer}></div>
    </section>
  );
}
