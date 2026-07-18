"use client";

import React, { useEffect, useRef, useState } from "react";
import { Outfit } from "next/font/google";
import styles from "./Partners.module.css";
import mstyles from "@/components/MobilePartnersStrip/MobilePartnersStrip.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });
const mobileOutfit = Outfit({ subsets: ["latin"], weight: ["700"] });

const partners = [
  { name: "Dubai Health Authority", shortName: "Dubai Health Authority", src: "/images/DHA.svg" },
  { name: "Dubai Economy", shortName: "Dubai Economy", src: "/images/DubaiEconomy.webp" },
  { name: "Federal Authority for Identity & Citizenship", shortName: "Federal Authority for Identity & Citizenship", src: "/images/fauCopy.webp" },
  { name: "General Directorate of Residency and Foreigners Affairs - Dubai", shortName: "GDRFA Dubai", src: "/images/GRDRFA.webp" },
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
    <>
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

        <div className={styles.marqueeWrap}>
          <div className={styles.marqueeTrack}>
            {[...partners, ...partners].map((p, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.logoWrap}>
                  <img
                    src={p.src}
                    alt={p.name}
                    className={styles.logo}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Mobile-only — same partners list as above. Visibility is CSS-driven
        (mstyles.wrap). */}
    <section className={`${mstyles.wrap} ${mobileOutfit.className}`}>
      <div className={mstyles.sec}>
        <h2 className={mstyles.h2}>Our Partners</h2>
      </div>

      <div className={mstyles.marquee}>
        <div className={mstyles.track}>
          {[...partners, ...partners].map((p, i) => (
            <div key={i} className={mstyles.chip}>
              <img
                src={p.src}
                alt={p.shortName}
                className={mstyles.logo}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
