"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Outfit } from "next/font/google";
import { Clock, ArrowRight, Sparkles } from "lucide-react";
import styles from "./PickUpService.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });

const features = [
  "The only Government services center operating 24 hours in the UAE.",
  "The only Government services center operating on Friday and public holidays.",
  "There are sufficient parking space available in the area.",
  "One stop shop (you can finish all your Government transactions at Amer 24 7)",
  "Our customer happiness consultants are well trained to cater to all your needs."
];

export default function PickUpService() {
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
      {/* Background decoration glows */}
      <div className={`${styles.bgBlob} ${styles.blob1}`} aria-hidden="true" />
      <div className={`${styles.bgBlob} ${styles.blob2}`} aria-hidden="true" />

      <div className={`${styles.container} ${styles.grid}`}>
        {/* Left Column: Image with Outline and Overlays */}
        <div className={styles.leftCol}>
          <div className={styles.imageWrap}>
            <div className={styles.imageOutline} />
            <img 
              src="/images/document_pickup_delivery.png" 
              alt="Amer 24 7 provides documents pick up and drop off service" 
              className={styles.mainImage} 
            />

            <div className={styles.overlayBox}>
              <div className={styles.clockGraphic}>
                <Clock size={24} className={styles.clockIcon} strokeWidth={2} />
              </div>
              <div>
                <div className={styles.overlayTitle}>24/7</div>
                <div className={styles.overlaySub}>VIP COURIER</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Content and List of Features */}
        <div className={styles.rightCol}>
          <div className={styles.eyebrow}>
            <Sparkles size={14} strokeWidth={2} />
            <span>EXCEPTIONAL ACCESSIBILITY</span>
          </div>

          <h2 className={styles.title}>
            Amer 247 provides documents <span className={styles.titleHighlight}>pick up and drop off</span> service
          </h2>

          <ol className={styles.pointsList}>
            {features.map((feature, i) => (
              <li key={i} className={styles.pointItem}>
                <span className={styles.pointNumber}>0{i + 1}</span>
                <span className={styles.pointText}>{feature}</span>
              </li>
            ))}
          </ol>

          <div className={styles.ctaWrap}>
            <Link href="/services" className={styles.cta} aria-label="Explore all Amer 247 services">
              <span>Learn More</span>
              <ArrowRight size={18} strokeWidth={2.5} className={styles.ctaArrow} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
