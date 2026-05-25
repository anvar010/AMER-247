"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Plane, IdCard, FileText, Gem, Stethoscope,
} from "lucide-react";
import styles from "./Hero.module.css";

const featureCards = [
  { icon: Plane, name: "UAE TOURIST VISA", sub: "96 Hours to 90 Days entry" },
  { icon: IdCard, name: "EMIRATES ID", sub: "New, renewal & replacement" },
  { icon: FileText, name: "ENTRY PERMIT", sub: "Residency entry permits" },
  { icon: Gem, name: "GOLDEN VISA", sub: "5 & 10 year long-term visa" },
  { icon: Stethoscope, name: "MEDICAL TEST", sub: "Visa & residency medical" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [vp, setVp] = useState<{ w: number; h: number }>({ w: 1280, h: 720 });

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const section = sectionRef.current;
      if (section) {
        const total = section.offsetHeight - window.innerHeight;
        const scrolled = -section.getBoundingClientRect().top;
        const p = total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0;
        setProgress(p);
      }
      setVp({ w: window.innerWidth, h: window.innerHeight });
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // ViewBox now matches the actual viewport, so 1 SVG unit = 1 CSS pixel.
  // FontSize can be set as a percentage of viewport width, capped for desktop.
  const vbW = vp.w;
  const vbH = vp.h;
  const baseFont = Math.min(170, vp.w * 0.16);

  // Phase math — drives zoom, mask fade, and content reveal
  const zoomP = Math.min(1, progress / 0.6);                            // 0 → 1 over first 60%
  const textScale = 1 + Math.pow(zoomP, 1.5) * 26;                       // 1× → ~27×
  const maskOpacity = progress > 0.45                                    // mask fades 0.45 → 0.65
    ? Math.max(0, 1 - (progress - 0.45) / 0.2)
    : 1;
  const outlineOpacity = Math.max(0, maskOpacity * (1 - (textScale - 1) / 4));
  const revealP = progress > 0.55                                        // hero content + cards reveal 0.55 → 0.85
    ? Math.min(1, (progress - 0.55) / 0.3)
    : 0;
  // Faded background AMER 24/7 watermark — appears once mask is gone
  const bgWordP = Math.max(0, Math.min(1, (progress - 0.55) / 0.2));

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.sticky}>
        <div className={styles.bg}>
          <video
            className={styles.video}
            autoPlay muted loop playsInline
            poster="/images/dubai.jpg"
          >
            <source src="/images/31956-389724705_medium.mp4" type="video/mp4" />
          </video>
          <div className={styles.overlay} />
        </div>

        {/* AMER 24/7 — video shows through text holes; zooms on scroll */}
        <svg
          className={styles.bgMask}
          viewBox={`0 0 ${vbW} ${vbH}`}
          preserveAspectRatio="none"
          style={{ opacity: maskOpacity }}
          aria-hidden="true"
        >
          <defs>
            <mask id="amer-hero-mask">
              <rect width={vbW} height={vbH} fill="white" />
              <g transform={`translate(${vbW / 2} ${vbH / 2}) scale(${textScale})`}>
                <text
                  x="0" y="0"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={baseFont}
                  fontWeight="900"
                  letterSpacing={-baseFont * 0.035}
                  fontFamily='"Inter", system-ui, -apple-system, "Segoe UI", sans-serif'
                  fill="black"
                >
                  AMER 24/7
                </text>
              </g>
            </mask>
          </defs>
          <rect
            width={vbW}
            height={vbH}
            fill="#0E1A45"
            fillOpacity="0.55"
            mask="url(#amer-hero-mask)"
          />
        </svg>

        {/* Faded background "AMER 24/7" watermark — restored behind hero content */}
        <div
          className={styles.bgWordWrap}
          aria-hidden="true"
          style={{ opacity: bgWordP }}
        >
          <span className={styles.bgWord}>AMER 24/7</span>
        </div>

        {/* Faint stroked outline — the "see-through from inside" look */}
        <svg
          className={styles.bgOutline}
          viewBox={`0 0 ${vbW} ${vbH}`}
          preserveAspectRatio="none"
          style={{ opacity: outlineOpacity }}
          aria-hidden="true"
        >
          <g transform={`translate(${vbW / 2} ${vbH / 2}) scale(${textScale})`}>
            <text
              x="0" y="0"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={baseFont}
              fontWeight="900"
              letterSpacing={-baseFont * 0.035}
              fontFamily='"Inter", system-ui, -apple-system, "Segoe UI", sans-serif'
              fill="none"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth={1.5 / textScale}
              vectorEffect="non-scaling-stroke"
            >
              AMER 24/7
            </text>
          </g>
        </svg>

        {/* Hero content — fades in after the AMER text has zoomed past */}
        <div
          className={`container ${styles.inner}`}
          style={{
            opacity: revealP,
            transform: `translateY(${(1 - revealP) * 24}px)`,
            pointerEvents: revealP > 0.5 ? "auto" : "none",
          }}
        >
          <div className={styles.content}>
            <span className={styles.overline}>24/7 IMMIGRATION &amp; VISA SERVICES</span>
            <h1 className={styles.heroTitle}>
              Your Trusted Partner for <br /> UAE Visa &amp; Immigration
            </h1>
            <h2 className={styles.heroSubtitle}>
              &amp; RESIDENCY SERVICES
            </h2>
            <Link href="/services" className={styles.viewMore}>
              View More
            </Link>
          </div>

          <div className={styles.scrollHint} aria-hidden>
            <div className={styles.mouse}>
              <div className={styles.wheel}></div>
            </div>
            <span className={styles.scrollLabel}>Scroll</span>
          </div>
        </div>

        {/* Feature cards — anchored to bottom of sticky, extending into next section */}
        <div
          className={`container ${styles.cardsRow}`}
          style={{
            opacity: revealP,
            transform: `translate(-50%, ${(1 - revealP) * 28}px)`,
            pointerEvents: revealP > 0.6 ? "auto" : "none",
          }}
        >
          {featureCards.map((c) => (
            <Link key={c.name} href="/services" className={styles.card}>
              <div className={styles.cardIcon}>
                <c.icon size={26} strokeWidth={1.7} />
              </div>
              <div className={styles.cardName}>{c.name}</div>
              <div className={styles.cardSub}>{c.sub}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
