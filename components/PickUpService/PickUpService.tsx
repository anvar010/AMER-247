"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Outfit } from "next/font/google";
import { Clock, ArrowRight } from "lucide-react";
import styles from "./PickUpService.module.css";
import mstyles from "@/components/MobilePickupCard/MobilePickupCard.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });
const mobileOutfit = Outfit({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

// Shared with the apply-form page's "Step by Step Guide" info column.
export const features = [
  "The only Government services center operating 24 hours in the UAE.",
  "Open on Fridays and public holidays — when others are closed.",
  "Ample parking available right across the area.",
  "One-stop shop — finish all your transactions in a single visit.",
  "Trained happiness consultants ready to cater to your every need."
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
    <>
    <section
      ref={sectionRef}
      className={`${styles.section} ${outfit.className} ${isIntersecting ? styles.revealed : ""}`}
    >
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
                <Clock size={20} className={styles.clockIcon} strokeWidth={2.5} />
              </div>
              <div className={styles.overlayTextWrap}>
                <div className={styles.overlayTitle}>24/7</div>
                <div className={styles.overlaySub}>COURIER SERVICE</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Content and List of Features */}
        <div className={styles.rightCol}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span className={styles.eyebrowText}>EXCEPTIONAL ACCESSIBILITY</span>
          </div>

          <h2 className={styles.title}>
            Document <span className={styles.titleHighlight}>pick-up &<br />drop-off</span> service
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
            <Link href="/online-services" className={styles.cta} aria-label="Explore all Amer 247 services">
              <span>Learn More</span>
              <ArrowRight size={18} strokeWidth={2.5} className={styles.ctaArrow} />
            </Link>
          </div>
        </div>

      </div>
    </section>

    {/* Mobile-only — same features list as above (5 points, including the
        "trained happiness consultants" one previously missing on mobile).
        Visibility is CSS-driven (mstyles.wrap). */}
    <section className={`${mstyles.wrap} ${mobileOutfit.className}`}>
      <div className={mstyles.sec}>
        <h2 className={mstyles.h2}>24/7 Courier</h2>
      </div>

      <div className={mstyles.card}>
        <div className={mstyles.imgWrap}>
          <img src="/images/document_pickup_delivery.png" alt="Document pick-up & delivery" className={mstyles.img} />
          <div className={mstyles.badge}>
            <span className={mstyles.badgeIco}>
              <Clock size={18} />
            </span>
            <div>
              <b className={mstyles.badgeT}>24/7</b>
              <span className={mstyles.badgeL}>Courier</span>
            </div>
          </div>
        </div>

        <div className={mstyles.body}>
          <h3 className={mstyles.title}>
            Document <span className={mstyles.gold}>pick-up &amp; drop-off</span>
          </h3>

          <ol className={mstyles.points}>
            {features.map((feature, i) => (
              <li key={i} className={mstyles.point}>
                <span className={mstyles.pn}>{String(i + 1).padStart(2, "0")}</span>
                <p className={mstyles.pt}>{feature}</p>
              </li>
            ))}
          </ol>

          <Link href="/online-services" className={mstyles.cta}>
            Learn More <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
    </>
  );
}
