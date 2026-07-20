"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  MonitorSmartphone,
  IdCard,
  HeartPulse,
  Stamp,
  ShieldCheck,
  ShieldPlus,
  TrendingUp,
} from "lucide-react";
import styles from "./WhatWeDo.module.css";

gsap.registerPlugin(ScrollTrigger);

// Shared with MobileAppHome (its "Our Services" grid uses this exact same
// data, just filtered by `cat` for its category chips) — single source so
// a service added here also shows up there.
export const services = [
  { id: 1, label: "AMER Services", desc: "Streamlined government services to save your time and effort.", cat: "Business" as const, icon: MonitorSmartphone, href: "/online-services?tab=amer" },
  { id: 2, label: "Emirates Identity Authority", desc: "Official Emirates ID services and related solutions.", cat: "ID" as const, icon: IdCard, href: "/online-services?tab=emirates-id" },
  { id: 3, label: "Medical Fitness Application", desc: "Hassle-free medical fitness tests and applications.", cat: "Medical" as const, icon: HeartPulse, href: "/online-services?tab=medical" },
  { id: 4, label: "Entry Permits", desc: "Apply for entry permits quickly and track your applications.", cat: "Visa" as const, icon: Stamp, href: "/online-services?tab=amer" },
  { id: 5, label: "Health Insurance Services", desc: "Find the right health insurance for you and your family.", cat: "Medical" as const, icon: ShieldPlus, href: "/online-services?tab=insurance" },
  { id: 6, label: "Dubai Economy Services", desc: "Business and economic services to support your growth.", cat: "Business" as const, icon: TrendingUp, href: "/amer247-services" },
];

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLAnchorElement[]>([]);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Timeline for perfect revealing
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%", // Trigger when section is 75% down the viewport
        toggleActions: "play none none reverse",
      },
    });

    // 1. Reveal Text Block
    tl.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // 2. Reveal Image Block
    tl.fromTo(
      imageRef.current,
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );

    // 3. Stagger Reveal Cards
    tl.fromTo(
      cardsRef.current,
      { y: 50, opacity: 0, scale: 0.95 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: "back.out(1.2)" 
      },
      "-=0.6"
    );

  }, { scope: sectionRef });

  const getCardStyle = () => {
    return `${styles.serviceCard} ${styles.cardNavy}`;
  };

  const getIconStyle = () => {
    return `${styles.iconWrapper} ${styles.iconNavy}`;
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Background Blobs */}
      <div className={styles.sectionBgBlob1} />
      <div className={styles.sectionBgBlob2} />

      <div className={styles.container}>
        
        <div className={styles.bentoGrid}>
          
          {/* Top Left: Text Content (Spans 2 cols) */}
          <div ref={textRef} className={styles.textBlock}>
            <div className={styles.eyebrowWrap}>
              <span className={styles.eyebrow}>OUR SERVICES</span>
              <span className={styles.eyebrowLine} />
            </div>
            
            <h2 className={styles.title}>
              How We <br />
              Can Help <span className={styles.titleNavy}>You</span>
            </h2>

            <p className={styles.description}>
              Explore our wide range of services designed to make your journey in the UAE simple, fast and hassle-free.
            </p>
          </div>

          {/* Cards 1 to 4 */}
          {services.slice(0, 4).map((service, idx) => (
            <Link
              href={service.href}
              key={service.id}
              className={getCardStyle()}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el;
              }}
            >
              <div className={getIconStyle()}>
                <service.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className={styles.cardTitle}>{service.label}</h3>
              <p className={styles.cardDesc}>{service.desc}</p>
              <div className={styles.arrowButton}>
                <ArrowRight size={18} strokeWidth={2} />
              </div>
            </Link>
          ))}

          {/* Bottom Left: Graphic Image (Spans 2 cols) */}
          <div ref={imageRef} className={styles.imageBlock}>
            <img 
              src="/images/whatwedo.webp" 
              alt="Dubai Services 3D Graphic" 
              className={styles.graphicImage}
            />
            <div className={styles.floatingCard}>
              <div className={styles.floatingIcon}>
                <ShieldCheck size={22} strokeWidth={2.5} />
              </div>
              <div>
                <div className={styles.floatingTitle}>Trusted by Thousands</div>
                <div className={styles.floatingDesc}>Reliable. Secure. Efficient.</div>
              </div>
            </div>
          </div>

          {/* Cards 5 and 6 */}
          {services.slice(4, 6).map((service, idx) => (
            <Link
              href={service.href}
              key={service.id}
              className={getCardStyle()}
              ref={(el) => {
                if (el) cardsRef.current[4 + idx] = el;
              }}
            >
              <div className={getIconStyle()}>
                <service.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className={styles.cardTitle}>{service.label}</h3>
              <p className={styles.cardDesc}>{service.desc}</p>
              <div className={styles.arrowButton}>
                <ArrowRight size={18} strokeWidth={2} />
              </div>
            </Link>
          ))}

          {/* Bottom Right: CTA Card (Spans 2 cols) */}
          <Link
            href="/online-services"
            className={styles.ctaCard}
            ref={(el) => {
              if (el) cardsRef.current[6] = el;
            }}
          >
            <h3 className={styles.ctaTitle}>Need something else?</h3>
            <p className={styles.ctaDesc}>We offer many more services to support your needs.</p>
            <div className={styles.ctaButton}>
              Explore All Services <ArrowRight size={16} strokeWidth={2} />
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
}
