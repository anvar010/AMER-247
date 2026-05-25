"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

const nodes = [
  { label: "IMMIGRATION\nSERVICES", icon: BookUser, pos: "top" },
  { label: "MEDICAL TEST\nAPPLICATIONS", icon: ClipboardPlus, pos: "right" },
  { label: "EMIRATES IDENTITY\nAUTHORITY", icon: IdCard, pos: "bottom" },
  { label: "INSURANCE", icon: ShieldCheck, pos: "left" },
] as const;

export default function AboutUs() {
  const diagramRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = diagramRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid}`}>
        {/* ---------- Diagram ---------- */}
        <div
          ref={diagramRef}
          className={`${styles.diagram} ${active ? styles.active : ""}`}
        >
          <div className={styles.ringOuter} />
          <div className={styles.ringInner} />

          <div className={styles.core}>
            <img
              src="/logos/amer.webp"
              alt="Amer 24/7"
              className={styles.coreLogo}
            />
          </div>

          {nodes.map((n, i) => (
            <div
              key={n.pos}
              className={`${styles.node} ${styles[n.pos]}`}
              style={{ transitionDelay: `${0.3 + i * 0.2}s` }}
            >
              <span className={styles.nodeBubble}>
                <n.icon size={20} strokeWidth={1.6} className={styles.nodeIcon} />
              </span>
              <span className={styles.nodeLabel}>
                {n.label.split("\n").map((line, j) => (
                  <span key={j}>{line}</span>
                ))}
              </span>
            </div>
          ))}
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
              Provides services ranging from issuing entry permits, issuing and
              renewals of a residency visa, visa cancellation and other related
              services provided by other government institutions and departments.
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
