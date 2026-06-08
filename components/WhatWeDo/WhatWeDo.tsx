import Link from "next/link";
import {
  ArrowRight,
  MonitorSmartphone,
  IdCard,
  HeartPulse,
  Stamp,
  ShieldPlus,
  TrendingUp,
  Building2,
} from "lucide-react";
import styles from "./WhatWeDo.module.css";

const services = [
  // Top Row (4 cards)
  { id: 1, label: "AMER Services", icon: MonitorSmartphone, style: "normal", row: 1 },
  { id: 2, label: "Emirates Identity Authority", icon: IdCard, style: "normal", row: 1 },
  { id: 3, label: "Medical Fitness Application", icon: HeartPulse, style: "gold", badge: "POPULAR", row: 1 },
  { id: 4, label: "Entry Permits", icon: Stamp, style: "normal", row: 1 },
  // Bottom Row (3 cards)
  { id: 5, label: "Health Insurance Services", icon: ShieldPlus, style: "blue", badge: "ESSENTIAL", row: 2 },
  { id: 6, label: "Dubai Economy Services", icon: TrendingUp, style: "normal", row: 2 },
  { id: 7, label: "Company Establishment & Clearance", icon: Building2, style: "normal", row: 2 },
];

export default function WhatWeDo() {
  const topRow = services.filter((s) => s.row === 1);
  const bottomRow = services.filter((s) => s.row === 2);

  const getCardClasses = (style: string) => {
    if (style === "gold") return `${styles.card} ${styles.cardGold}`;
    if (style === "blue") return `${styles.card} ${styles.cardBlue}`;
    return styles.card;
  };

  const getIconBoxClasses = (style: string) => {
    if (style === "gold") return `${styles.iconBox} ${styles.iconBoxGold}`;
    if (style === "blue") return `${styles.iconBox} ${styles.iconBoxBlue}`;
    return `${styles.iconBox} ${styles.iconBoxNormal}`;
  };

  const getBadgeClasses = (style: string) => {
    if (style === "gold") return `${styles.badge} ${styles.badgePopular}`;
    if (style === "blue") return `${styles.badge} ${styles.badgeEssential}`;
    return styles.badge;
  };

  return (
    <section className={styles.section}>
      
      {/* Left Sidebar */}
      <div className={styles.leftSidebar}>
        <div className={styles.sidebarContent}>
          <div className={styles.eyebrowWrap}>
            <span className={styles.eyebrowLine} />
            <span className={styles.eyebrow}>SERVICES THAT EMPOWER</span>
          </div>
          
          <h2 className={styles.title}>
            What <br />
            <span className={styles.titleGold}>We Do</span>
          </h2>
          <div className={styles.titleGlow} />

          <p className={styles.sub}>Here are the services we provide</p>
        </div>
        
        {/* Decorative elements at bottom of sidebar (mimics skyline) */}
        <div className={styles.decorativeSkyline}></div>
      </div>

      {/* Right Content */}
      <div className={styles.rightContent}>
        <div className={styles.cardsContainer}>
          
          {/* Top Row */}
          <div className={styles.rowTop}>
            {topRow.map(({ id, label, icon: Icon, style, badge }) => (
              <Link href="/services" key={id} className={getCardClasses(style)}>
                {badge && <span className={getBadgeClasses(style)}>{badge}</span>}
                <div className={getIconBoxClasses(style)}>
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className={styles.cardTitle}>{label}</h3>
                <ArrowRight size={18} strokeWidth={2} className={styles.cardArrow} />
              </Link>
            ))}
          </div>

          {/* Bottom Row */}
          <div className={styles.rowBottom}>
            {bottomRow.map(({ id, label, icon: Icon, style, badge }) => (
              <Link href="/services" key={id} className={getCardClasses(style)}>
                {badge && <span className={getBadgeClasses(style)}>{badge}</span>}
                <div className={getIconBoxClasses(style)}>
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className={styles.cardTitle}>{label}</h3>
                <ArrowRight size={18} strokeWidth={2} className={styles.cardArrow} />
              </Link>
            ))}
          </div>

        </div>

        {/* See More CTA */}
        <div className={styles.ctaWrap}>
          <Link href="/services" className={styles.cta}>
            <span className={styles.ctaLabel}>See More Services</span>
            <ArrowRight size={18} strokeWidth={2} className={styles.ctaArrow} />
          </Link>
        </div>
      </div>

    </section>
  );
}
