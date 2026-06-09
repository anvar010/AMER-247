"use client";

import React, { useEffect, useRef, useState } from "react";
import { Outfit } from "next/font/google";
import styles from "./Partners.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });

const partners = [
  { name: "Dubai Health Authority", src: "/images/DHA.svg" },
  { name: "Dubai Economy", src: "/images/DubaiEconomy.webp" },
  { name: "Federal Authority for Identity & Citizenship", src: "/images/fauCopy.webp" },
  { name: "General Directorate of Residency and Foreigners Affairs - Dubai", src: "/images/GRDRFA.webp" },
];

export default function Partners() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={`${styles.section} ${outfit.className} ${isIntersecting ? styles.revealed : ""}`}
    >
      <div className={styles.bgLines} />

      <div className={`${styles.inner} ${styles.container}`}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <div className={styles.diamond} />
            <span className={styles.eyebrowLine} />
          </div>
          <h2 className={styles.title}>Our Partners</h2>
          <p className={styles.subtitle}>
            Trusted government and institutional partners supporting our services.
          </p>
        </div>

        <div className={styles.grid}>
          {partners.map((p, i) => (
            <div key={p.name} className={styles.card}>
              <div className={styles.logoWrap}>
                <img
                  src={p.src}
                  alt={p.name}
                  className={styles.logo}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <div className={styles.cardDivider} />
              <div className={styles.cardName}>{p.name}</div>
            </div>
          ))}
        </div>
      </div>

      <svg className={styles.bottomCurve} viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="var(--brand-navy, #0a1f44)" d="M0,100 L1440,100 L1440,30 Q720,100 0,30 Z" />
      </svg>
    </section>
  );
}
