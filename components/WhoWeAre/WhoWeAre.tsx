"use client";

import React, { useState, useRef, MouseEvent } from "react";
import Link from "next/link";
import { Outfit } from "next/font/google";
import { ArrowRight, Sparkles } from "lucide-react";
import { FileText, IdCard, Gem, Stethoscope, Plane, MousePointerClick } from "lucide-react";
import styles from "./WhoWeAre.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });

const services = [
  { icon: FileText, title: "Immigration Services", desc: "Expert handling of all immigration and residency procedures." },
  { icon: Gem, title: "Golden Visa", desc: "Secure your long-term residency in the UAE effortlessly." },
  { icon: IdCard, title: "Emirates Identity Authority", desc: "Fast-track processing for new and renewed Emirates IDs." },
  { icon: Stethoscope, title: "Medical Test Applications", desc: "Hassle-free medical fitness test scheduling and results." },
  { icon: Plane, title: "UAE Tourist Visa", desc: "Fast processing for tourist visas." },
  { icon: MousePointerClick, title: "Apply Online", desc: "Submit your applications completely online." },
];

function ServiceCard({ service, styles }: { service: any; styles: any }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setGlowPosition({ x, y });
    }
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.bentoBox} ${styles.serviceBox}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={styles.mouseGlow}
        style={{
          left: `${glowPosition.x}px`,
          top: `${glowPosition.y}px`,
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)',
        }}
      />
      <div className={styles.iconWrap}>
        <service.icon size={28} strokeWidth={1.5} aria-hidden="true" />
      </div>
      <h3 className={styles.serviceTitle}>{service.title}</h3>
      <p className={styles.serviceDesc}>{service.desc}</p>

      <Link href="#" className={styles.serviceLink} aria-label={`Learn more about ${service.title}`}>
        Learn More <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </div>
  );
}

export default function WhoWeAre() {
  return (
    <section id="who-we-are" className={`${styles.section} ${outfit.className}`}>
      <div className={styles.container}>

        <div className={styles.bentoGrid}>

          {/* Main Bento Box (Spans 2x2) */}
          <div className={`${styles.bentoBox} ${styles.mainBox}`}>


            <h2 className={styles.title}>
              Who <span className={styles.titleHighlight}>We</span> Are
            </h2>

            <p className={styles.description}>
              Amer247 Center Was established in 2017 in collaboration with the General Directorate of Residency and Foreigners Affairs, and the experience was a direct application of the strategy of the Federal Government advocated by His Highness Sheikh Mohammed bin Rashid Al Maktoum, Prime Minister and Ruler of Dubai.
            </p>

            <Link href="/about" className={styles.ctaButton} aria-label="Discover Our Story">
              Discover Our Story <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>

          {/* 4 Service Bento Boxes */}
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} styles={styles} />
          ))}

        </div>

      </div>
    </section>
  );
}
