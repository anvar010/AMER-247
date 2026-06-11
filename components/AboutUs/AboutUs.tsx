"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Plane, Activity, Contact, ShieldCheck, ArrowRight } from "lucide-react";
import styles from "./AboutUs.module.css";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Reveal Animation Setup
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.active);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll(`.${styles.fadeUp}`);
      elements.forEach((el) => {
        observer.observe(el);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`${styles.section} ${outfit.className}`}
      id="about-us-extended"
    >
      {/* Abstract premium geometric graphic background */}
      <div className={styles.abstractBg}></div>
      
      <div className={styles.container}>
        <div className={styles.grid}>
          
          {/* Left Content: High Contrast Typography */}
          <div className={`${styles.leftCol} ${styles.fadeUp}`}>
            <div>
              {/* Active Online Status Radar Pill */}
              <div className={styles.statusPill}>
                <span className={styles.statusDotWrap}>
                  <span className={styles.statusDotPing}></span>
                  <span className={styles.statusDotSolid}></span>
                </span>
                24/7 ONLINE
              </div>
              
              {/* Rich Deep Black Title */}
              <h2 className={styles.title}>
                About Us
              </h2>
              
              {/* Strong Narrative Framed block */}
              <div className={styles.narrativeBlock}>
                <p className={styles.narrativeText}>
                  We understand the profound challenges that can come with complex paperwork, long stressful queues, and confusing public processes.
                </p>
              </div>
              
              {/* Clear Body Copy */}
              <p className={styles.bodyCopy}>
                We pride ourselves on streamlining entry permits, residency visa processing, Golden visa pathways, renewals, and cancellations directly integrated with premium UAE institutions and administrative bodies.
              </p>
            </div>
            
            {/* Dynamic call to action button with elegant interaction */}
            <Link href="#services" className={styles.ctaButton}>
              <span>Know more about Amer 24/7</span>
              <div className={styles.ctaIconCircle}>
                <ArrowRight className={styles.ctaIcon} />
              </div>
            </Link>
          </div>

          {/* Right Content: Premium Asymmetric Cards Stack */}
          <div className={styles.rightCol}>
            
            {/* Card 1: Immigration Services */}
            <div className={`${styles.card} ${styles.fadeUp} ${styles.delay100}`}>
              <div className={styles.cardLine}></div>
              
              <div className={styles.cardIconWrap}>
                <Plane className={styles.cardIcon} />
              </div>
              <div>
                <h3 className={styles.cardTitle}>Immigration Services</h3>
                <p className={styles.cardSubtitle}>Fast-track entry & processing</p>
              </div>
            </div>
            
            {/* Card 2: Medical Test (Staggered Downward Offset) */}
            <div className={`${styles.card} ${styles.staggeredCard} ${styles.fadeUp} ${styles.delay200}`}>
              <div className={styles.cardLine}></div>
              
              <div className={styles.cardIconWrap}>
                <Activity className={styles.cardIcon} />
              </div>
              <div>
                <h3 className={styles.cardTitle}>Medical Test Applications</h3>
                <p className={styles.cardSubtitle}>Authorized fitness procedures</p>
              </div>
            </div>
            
            {/* Card 3: Emirates Identity */}
            <div className={`${styles.card} ${styles.fadeUp} ${styles.delay300}`}>
              <div className={styles.cardLine}></div>
              
              <div className={styles.cardIconWrap}>
                <Contact className={styles.cardIcon} />
              </div>
              <div>
                <h3 className={styles.cardTitle}>Emirates Identity</h3>
                <p className={styles.cardSubtitle}>Registrations & Renewals</p>
              </div>
            </div>
            
            {/* Card 4: Insurance Services (Staggered Downward Offset) */}
            <div className={`${styles.card} ${styles.staggeredCard} ${styles.fadeUp} ${styles.delay400}`}>
              <div className={styles.cardLine}></div>
              
              <div className={styles.cardIconWrap}>
                <ShieldCheck className={styles.cardIcon} />
              </div>
              <div>
                <h3 className={styles.cardTitle}>Insurance Services</h3>
                <p className={styles.cardSubtitle}>Mandatory health plans & linkings</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
