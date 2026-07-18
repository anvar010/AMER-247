"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Plane, IdCard, FileText, Gem, Stethoscope } from "lucide-react";
import dynamic from "next/dynamic";
import DesktopSearchOverlay from "@/components/DesktopSearchOverlay/DesktopSearchOverlay";
import styles from "./Hero.module.css";

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

  const targetRef = useRef<HTMLButtonElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const rafId = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobile !== false || !pathRef.current || !svgRef.current || !targetRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafId.current) return;

    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      if (!svgRef.current || !targetRef.current || !pathRef.current) return;
      const svgRect = svgRef.current.getBoundingClientRect();
      const x0 = clientX - svgRect.left;
      const y0 = clientY - svgRect.top;

      const targetRect = targetRef.current.getBoundingClientRect();
      const cx = targetRect.left - svgRect.left + targetRect.width / 2;
      const cy = targetRect.top - svgRect.top + targetRect.height / 2;
      const angleToCenter = Math.atan2(cy - y0, cx - x0);
      const padding = 12;
      const x1 = cx - Math.cos(angleToCenter) * (targetRect.width / 2 + padding);
      const y1 = cy - Math.sin(angleToCenter) * (targetRect.height / 2 + padding);

      const dx = cx - x0;
      const dy = cy - y0;
      const distanceToCenter = Math.hypot(dx, dy);

      if (distanceToCenter < targetRect.width / 2) {
        pathRef.current.setAttribute("d", "");
        return;
      }

      const distance = Math.hypot(x1 - x0, y1 - y0);
      const controlX = (x0 + x1) / 2;
      const controlY = (y0 + y1) / 2 + Math.min(200, distance * 0.5);

      const angle = Math.atan2(y1 - controlY, x1 - controlX);
      const headLen = 10;
      const ax1 = x1 - headLen * Math.cos(angle - Math.PI / 6);
      const ay1 = y1 - headLen * Math.sin(angle - Math.PI / 6);
      const ax2 = x1 - headLen * Math.cos(angle + Math.PI / 6);
      const ay2 = y1 - headLen * Math.sin(angle + Math.PI / 6);

      const pathData = `M ${x0} ${y0} Q ${controlX} ${controlY} ${x1} ${y1} M ${x1} ${y1} L ${ax1} ${ay1} M ${x1} ${y1} L ${ax2} ${ay2}`;
      pathRef.current.setAttribute("d", pathData);
      
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

        <div className={styles.editorialContent}>
          <span className={`${styles.overline} ${styles.fadeInUp}`} style={{ animationDelay: '0.1s' }}>
            24/7 IMMIGRATION &amp; VISA SERVICES
          </span>
          <h1 className={`${styles.heroTitle} ${styles.fadeInUp}`} style={{ animationDelay: '0.2s' }}>
            Seamless Immigration <br /> Solutions Tailored to You
          </h1>

          <div className={`${styles.actionWrapper} ${styles.fadeInUp}`} style={{ animationDelay: '0.4s' }}>
            <button
              ref={targetRef}
              type="button"
              onClick={() => setSearchOpen(true)}
              className={styles.editorialButton}
            >
              <span>Explore Services</span>
            </button>
            <DesktopSearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
          </div>
        </div>

        <div className={styles.borderlessStrip}>
          <div className={styles.stripContainer}>
            {featureCards.map((c, index) => (
              <Link
                key={c.name}
                href={c.href}
                className={`${styles.stripItem} ${styles.fadeInUp}`}
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <c.icon className={styles.stripIcon} size={28} strokeWidth={1.5} />
                <div className={styles.stripText}>
                  <div className={styles.stripName}>{c.name}</div>
                  <div className={styles.stripSub}>{c.sub}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {isMobile === false && (
          <svg ref={svgRef} className={styles.trackerSvg} aria-hidden>
            <path
              ref={pathRef}
              fill="none"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="2"
              strokeDasharray="6, 6"
              strokeLinecap="round"
              style={{ transition: "opacity 0.2s ease" }}
            />
          </svg>
        )}
      </section>

    </>
  );
}
