"use client";

import { useRef } from "react";
import styles from "./WhoWeAre.module.css";
import { FileText, IdCard, Gem, Stethoscope, ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cards = [
  { icon: FileText, title: "Immigration Services" },
  { icon: Gem, title: "Golden Visa" },
  { icon: IdCard, title: "Emirates Identity Authority" },
  { icon: Stethoscope, title: "Medical Test Applications" },
];

export default function WhoWeAre() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useGSAP(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    if (isDesktop) {
      // Pin the left column while the right column scrolls
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftColRef.current,
        pinSpacing: false,
      });

      // Fade in cards as they scroll up
      cardsRef.current.forEach((card) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        });
      });
    } else {
      // Mobile: just fade up everything
      gsap.from(leftColRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: leftColRef.current,
          start: "top 80%",
        }
      });
      gsap.from(cardsRef.current, {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 85%",
        }
      });
    }

  }, { scope: containerRef });

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.container}>

        {/* Left Pinned Column */}
        <div className={styles.leftCol} ref={leftColRef}>
          <div className={styles.eyebrow}>
            <Sparkles size={16} />
            <span>ABOUT AMER247</span>
          </div>
          <h2 className={styles.title}>Who We Are</h2>
          <span className={styles.titleAccent} />
          <p className={styles.copy}>
            Amer247 Center was established in 2017 in collaboration with the
            General Directorate of Residency and Foreigners Affairs. Our experience
            is a direct application of the strategy of the Federal Government
            advocated by His Highness Sheikh Mohammed bin Rashid Al Maktoum,
            Prime Minister and Ruler of Dubai.
          </p>
        </div>

        {/* Right Scrolling Column */}
        <div className={styles.rightCol}>
          <div className={styles.rightSpacer} />
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <a
                key={c.title}
                href="#"
                className={styles.card}
                ref={(el) => { cardsRef.current[i] = el; }}
              >
                <span className={styles.cardTopBar} />
                <span className={styles.cardIconWrap}>
                  <Icon size={28} strokeWidth={1.6} className={styles.cardIcon} />
                </span>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <span className={styles.cardCta}>
                  <span>View Service</span>
                  <ArrowRight size={18} className={styles.cardArrow} />
                </span>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
