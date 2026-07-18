"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Plane, IdCard, FileText, Gem, Stethoscope,
} from "lucide-react";

import styles from "./Hero.module.css";
import dynamic from "next/dynamic";
import DesktopSearchOverlay from "@/components/DesktopSearchOverlay/DesktopSearchOverlay";

// Dynamically import MobileScrollHero to completely remove it from the Desktop bundle!
const MobileScrollHero = dynamic(() => import("../MobileScrollHero/MobileScrollHero"));

const featureCards = [
  { icon: Plane, name: "UAE TOURIST VISA", sub: "96 Hours to 90 Days entry", href: "/uae-tourist-visa" },
  { icon: IdCard, name: "EMIRATES ID", sub: "New, renewal & replacement", href: "/services/emirates-id" },
  { icon: FileText, name: "IMMIGRATION SERVICES", sub: "Residency entry permits", href: "/immigrationServices" },
  { icon: Gem, name: "GOLDEN VISA", sub: "5 & 10 year long-term visa", href: "/services/golden" },
  { icon: Stethoscope, name: "MEDICAL TEST", sub: "Visa & residency medical", href: "/services/medical" },
];

export default function Hero() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  // --- Lightweight SVG Tracker Refs ---
  const targetRef = useRef<HTMLButtonElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  // Cache the button position to prevent layout thrashing on every mouse move
  const targetBoundsRef = useRef({ left: 0, top: 0, width: 0, height: 0, isValid: false });

  const handleScroll = () => { targetBoundsRef.current.isValid = false; };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      targetBoundsRef.current.isValid = false; // Force recalculate on resize
    };
    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const rafId = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobile !== false || !pathRef.current || !svgRef.current || !targetRef.current) return;

    // Cache the mouse coordinates immediately
    const clientX = e.clientX;
    const clientY = e.clientY;

    // If an animation frame is already pending, drop this mouse event to prevent CPU flooding
    if (rafId.current) return;

    rafId.current = requestAnimationFrame(() => {
      rafId.current = null; // Clear the lock

      if (!svgRef.current || !targetRef.current || !pathRef.current) return;
      const svgRect = svgRef.current.getBoundingClientRect();
      const x0 = clientX - svgRect.left;
      const y0 = clientY - svgRect.top;

      // Only get bounding client rect if cache is invalid (massively boosts performance)
      if (!targetBoundsRef.current.isValid) {
        const rect = targetRef.current.getBoundingClientRect();
        targetBoundsRef.current = {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
          isValid: true
        };
      }

      const targetRect = targetBoundsRef.current;

      // Calculate button center relative to SVG
      const cx = targetRect.left - svgRect.left + targetRect.width / 2;
      const cy = targetRect.top - svgRect.top + targetRect.height / 2;

      const angleToCenter = Math.atan2(cy - y0, cx - x0);

      // Pull the endpoint back so it stops exactly at the button's border
      const padding = 12;
      const x1 = cx - Math.cos(angleToCenter) * (targetRect.width / 2 + padding);
      const y1 = cy - Math.sin(angleToCenter) * (targetRect.height / 2 + padding);

      const dx = cx - x0;
      const dy = cy - y0;
      const distanceToCenter = Math.hypot(dx, dy);

      // Hide path if hovering directly over the button
      if (distanceToCenter < targetRect.width / 2) {
        pathRef.current.setAttribute("d", "");
        return;
      }

      const distance = Math.hypot(x1 - x0, y1 - y0);

      // Curved control point
      const controlX = (x0 + x1) / 2;
      const controlY = (y0 + y1) / 2 + Math.min(200, distance * 0.5);

      // Arrowhead calculations
      const angle = Math.atan2(y1 - controlY, x1 - controlX);
      const headLen = 10;
      const ax1 = x1 - headLen * Math.cos(angle - Math.PI / 6);
      const ay1 = y1 - headLen * Math.sin(angle - Math.PI / 6);
      const ax2 = x1 - headLen * Math.cos(angle + Math.PI / 6);
      const ay2 = y1 - headLen * Math.sin(angle + Math.PI / 6);

      // Draw Quadratic Curve and Arrowhead
      const pathData = `M ${x0} ${y0} Q ${controlX} ${controlY} ${x1} ${y1} M ${x1} ${y1} L ${ax1} ${ay1} M ${x1} ${y1} L ${ax2} ${ay2}`;

      pathRef.current.setAttribute("d", pathData);

      // Smooth opacity fading
      const opacity = Math.min(1.0, distance / 400);
      pathRef.current.style.opacity = opacity.toString();
    });
  };

  const handleMouseLeave = () => {
    if (pathRef.current) {
      pathRef.current.setAttribute("d", "");
    }
  };

  if (isMobile === true) {
    return <MobileScrollHero />;
  }

  return (
    <>
      {/* Lightweight SSR Placeholder for mobile devices to show the first frame immediately before hydration */}
      {isMobile === null && (
        <div className={styles.mobilePlaceholder}>
          <img src="/hero-bg-fr/frame_001.webp" alt="Loading Background" className={styles.placeholderImg} />
          <div className={styles.placeholderOverlay} />
        </div>
      )}

      <section
        className={styles.hero}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.bg}>
          <video
            className={styles.video}
            autoPlay muted loop playsInline
            poster="/images/dubai.jpg"
          >
            <source src="/images/AMER-hero.mp4" type="video/mp4" />
          </video>
          <div className={styles.overlay} />
        </div>

        <div className={styles.bgWordWrap} aria-hidden>
          <span className={styles.bgWord}>AMER 24/7</span>
        </div>

        <div className={`container ${styles.inner}`}>
          <div className={styles.content}>
            <span className={styles.overline}>24/7 IMMIGRATION &amp; VISA SERVICES</span>
            <h1 className={styles.heroTitle}>
              Seamless Immigration Solutions Tailored to Your Journey
            </h1>
            <h2 className={styles.heroSubtitle}>
              &amp; RESIDENCY SERVICES
            </h2>
            <button
              ref={targetRef}
              type="button"
              onClick={() => setSearchOpen(true)}
              className={styles.viewMore}
            >
              View More
            </button>
          </div>

          <div className={styles.scrollHint} aria-hidden>
            <div className={styles.mouse}>
              <div className={styles.wheel}></div>
            </div>
            <span className={styles.scrollLabel}>Scroll</span>
          </div>
        </div>

        <div className={`container ${styles.cardsRow}`}>
          {featureCards.map((c) => (
            <Link key={c.name} href={c.href} className={styles.card}>
              <div className={styles.cardIcon}>
                <c.icon size={26} strokeWidth={1.7} />
              </div>
              <div className={styles.cardTextContent}>
                <div className={styles.cardName}>{c.name}</div>
                <div className={styles.cardSub}>{c.sub}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Ultra-Lightweight SVG Tracker */}
        {isMobile === false && (
          <svg ref={svgRef} className={styles.trackerSvg} aria-hidden>
            <path
              ref={pathRef}
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="8, 6"
              strokeLinecap="round"
              style={{ transition: "opacity 0.2s ease" }}
            />
          </svg>
        )}
      </section>

      <DesktopSearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
