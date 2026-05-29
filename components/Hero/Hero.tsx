"use client";
import Link from "next/link";
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
  return (
    <section className={styles.hero}>
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

      <div className={styles.bgWordWrap} aria-hidden>
        <span className={styles.bgWord}>AMER 24/7</span>
      </div>

      <div className={`container ${styles.inner}`}>
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

      <div className={`container ${styles.cardsRow}`}>
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
    </section>
  );
}
