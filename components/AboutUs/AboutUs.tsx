"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Plane, Activity, Contact, ShieldCheck, ArrowRight } from "lucide-react";
import styles from "./AboutUs.module.css";
import mstyles from "@/components/MobileAboutUs/MobileAboutUs.module.css";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });
const mobileOutfit = Outfit({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

const NARRATIVE_TEXT =
  "We understand the profound challenges that can come with complex paperwork, long stressful queues, and confusing public processes.";
const BODY_COPY =
  "We pride ourselves on streamlining entry permits, residency visa processing, Golden visa pathways, renewals, and cancellations directly integrated with premium UAE institutions and administrative bodies.";

const CARDS = [
  { icon: Plane, title: "Immigration Services", sub: "Fast-track entry & processing" },
  { icon: Activity, title: "Medical Test Applications", sub: "Authorized fitness procedures" },
  { icon: Contact, title: "Emirates Identity", sub: "Registrations & Renewals" },
  { icon: ShieldCheck, title: "Insurance Services", sub: "Mandatory health plans & linkings" },
];

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
    <>
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
                <p className={styles.narrativeText}>{NARRATIVE_TEXT}</p>
              </div>

              {/* Clear Body Copy */}
              <p className={styles.bodyCopy}>{BODY_COPY}</p>
            </div>
            
            {/* Dynamic call to action button with elegant interaction */}
            <Link href="/about" className={styles.ctaButton}>
              <span>Know more about Amer 24/7</span>
              <div className={styles.ctaIconCircle}>
                <ArrowRight className={styles.ctaIcon} />
              </div>
            </Link>
          </div>

          {/* Right Content: Premium Asymmetric Cards Stack */}
          <div className={styles.rightCol}>
            {CARDS.map((c, i) => {
              const staggered = i % 2 === 1;
              const delayClass = styles[`delay${(i + 1) * 100}`];
              return (
                <div
                  key={c.title}
                  className={`${styles.card} ${staggered ? styles.staggeredCard : ""} ${styles.fadeUp} ${delayClass}`}
                >
                  <div className={styles.cardLine}></div>

                  <div className={styles.cardIconWrap}>
                    <c.icon className={styles.cardIcon} />
                  </div>
                  <div>
                    <h3 className={styles.cardTitle}>{c.title}</h3>
                    <p className={styles.cardSubtitle}>{c.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>

    {/* Mobile-only — same copy/CARDS as above, app card design instead of
        the desktop asymmetric stack. Visibility is CSS-driven (mstyles.wrap). */}
    <section className={`${mstyles.wrap} ${mobileOutfit.className}`}>
      <div className={mstyles.statusPill}>
        <span className={mstyles.statusDotWrap}>
          <span className={mstyles.statusDotPing} />
          <span className={mstyles.statusDotSolid} />
        </span>
        24/7 ONLINE
      </div>

      <h2 className={mstyles.title}>About Us</h2>

      <p className={mstyles.narrative}>{NARRATIVE_TEXT}</p>
      <p className={mstyles.body}>{BODY_COPY}</p>

      <div className={mstyles.cardsGrid}>
        {CARDS.map((c) => (
          <div key={c.title} className={mstyles.card}>
            <span className={mstyles.cardIco}>
              <c.icon size={19} />
            </span>
            <p className={mstyles.cardTitle}>{c.title}</p>
            <p className={mstyles.cardSub}>{c.sub}</p>
          </div>
        ))}
      </div>

      <Link href="/about" className={mstyles.ctaBtn}>
        Know more about Amer 24/7
        <span className={mstyles.ctaIco}>
          <ArrowRight size={16} />
        </span>
      </Link>
    </section>
    </>
  );
}
