"use client";

import Link from "next/link";
import { ArrowRight, Landmark } from "lucide-react";
import styles from "./AboutUs.module.css";
import ServiceCards from "../ServiceCards/ServiceCards";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });

export default function AboutUs() {
  return (
    <section className={`${styles.section} ${outfit.className}`}>
      
      {/* Dynamic Mesh Gradient Background */}
      <div className={styles.meshBackground} aria-hidden="true">
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={`${styles.orb} ${styles.orb3}`} />
      </div>

      <div className={styles.container}>
        
        {/* Left Column: Glassmorphic Content Panel */}
        <div className={styles.glassPanel}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowGlow} aria-hidden />
            THE AMER DIFFERENCE
          </div>

          <h2 className={styles.title}>
            About <span className={styles.titleHighlight}>Us</span>
          </h2>

          <p className={styles.lead}>
            We understand the challenges that can come with paperwork, long queues, and confusing processes.
          </p>

          <div className={styles.infoBox}>
            <div className={styles.infoIconWrap}>
              <Landmark size={24} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <p className={styles.infoText}>
              Provides services ranging from issuing entry permits, issuing and renewals of a residency visa, visa cancellation and other related services provided by other government institutions and departments.
            </p>
          </div>

          <Link href="/about" className={`${styles.ctaButton} ${styles.desktopCta}`} aria-label="Know more about Amer 247">
            Know more about Amer 24/7 <ArrowRight size={18} aria-hidden="true" className={styles.ctaIcon} />
          </Link>
        </div>

        {/* Right Column: Floating Service Cards */}
        <div className={styles.cardContainer}>
          <div className={styles.serviceWrapper}>
            <ServiceCards />
          </div>
        </div>

        {/* Mobile CTA Button - Placed below cards */}
        <div className={styles.mobileCtaWrapper}>
          <Link href="/about" className={`${styles.ctaButton} ${styles.mobileCta}`} aria-label="Know more about Amer 247">
            Know more about Amer 24/7 <ArrowRight size={18} aria-hidden="true" className={styles.ctaIcon} />
          </Link>
        </div>

      </div>
    </section>
  );
}
