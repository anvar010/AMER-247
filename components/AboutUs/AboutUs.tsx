"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  ArrowRight,
  ShieldCheck,
  ClipboardPlus,
  IdCard,
  BookUser,
  Landmark,
  Grip,
} from "lucide-react";
import styles from "./AboutUs.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const nodes = [
  { label: "IMMIGRATION\nSERVICES", icon: BookUser, pos: "top" },
  { label: "MEDICAL TEST\nAPPLICATIONS", icon: ClipboardPlus, pos: "right" },
  { label: "EMIRATES IDENTITY\nAUTHORITY", icon: IdCard, pos: "bottom" },
  { label: "INSURANCE", icon: ShieldCheck, pos: "left" },
] as const;

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const nodeWrapperRef = useRef<HTMLDivElement>(null);
  const nodeContentsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Scrub orbit rotation on scroll
    gsap.to(ringRef.current, {
      rotation: 180,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    gsap.to(nodeWrapperRef.current, {
      rotation: 90,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    // Counter-rotate the contents so they stay upright
    gsap.to(nodeContentsRef.current, {
      rotation: -90,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={`container ${styles.grid}`}>
        
        {/* ---------- Diagram ---------- */}
        <div className={styles.diagram}>
          <div ref={ringRef} className={styles.ringOuter} />
          <div className={styles.ringInner} />

          <div className={styles.core}>
            <img
              src="/logos/amer.webp"
              alt="Amer 24/7"
              className={styles.coreLogo}
            />
          </div>

          <div ref={nodeWrapperRef} className={styles.nodeWrapper}>
            {nodes.map((n, i) => (
              <div
                key={n.pos}
                className={styles.node}
                data-pos={n.pos}
              >
                <div 
                  className={styles.nodeContents}
                  ref={(el) => { nodeContentsRef.current[i] = el; }}
                >
                  <span className={styles.nodeBubble}>
                    <n.icon size={20} strokeWidth={1.6} />
                  </span>
                  <span className={styles.nodeLabel}>
                    {n.label.split("\n").map((line, j) => (
                      <span key={j}>{line}</span>
                    ))}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Content ---------- */}
        <div className={styles.content}>
          <div className={styles.titleRow}>
            <Grip size={18} className={styles.titleDots} />
            <h2 className={styles.title}>About Us</h2>
          </div>
          <span className={styles.titleAccent} />

          <p className={styles.lead}>
            We understand the challenges that can come with paperwork, long
            queues, and confusing processes.
          </p>

          <div className={styles.infoBox}>
            <span className={styles.infoIconWrap}>
              <Landmark size={26} strokeWidth={1.6} className={styles.infoIcon} />
            </span>
            <p className={styles.infoText}>
              Amer 24/7 provides services ranging from issuing entry permits, issuing and
              renewals of residency visas, visa cancellations and other related
              services provided by top government institutions.
            </p>
          </div>

          <Link href="/about" className={styles.cta}>
            Know more about Amer 247 <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
