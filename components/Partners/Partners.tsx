"use client";
import styles from "./Partners.module.css";

const partners = [
  { name: "Dubai Health Authority", src: "/images/DHA.svg" },
  { name: "Dubai Economy", src: "/images/DubaiEconomy.webp" },
  { name: "Federal Authority for Identity & Citizenship", src: "/images/fauCopy.webp" },
  { name: "General Directorate of Residency and Foreigners Affairs - Dubai", src: "/images/GRDRFA.webp" },
];

export default function Partners() {
  return (
    <section className={styles.section}>
      {/* Subtle top right lines background could be added here if needed */}
      <div className={styles.bgLines} />

      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <div className={styles.diamond} />
            <span className={styles.eyebrowLine} />
          </div>
          <h2 className={styles.title}>Our Partners</h2>
          <p className={styles.subtitle}>
            Trusted government and institutional partners supporting our services.
          </p>
        </div>

        <div className={styles.grid}>
          {partners.map((p) => (
            <div key={p.name} className={styles.card}>
              <div className={styles.logoWrap}>
                <img
                  src={p.src}
                  alt={p.name}
                  className={styles.logo}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <div className={styles.cardDivider} />
              <div className={styles.cardName}>{p.name}</div>
            </div>
          ))}
        </div>
      </div>

      <svg className={styles.bottomCurve} viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="var(--brand-navy, #0a1f44)" d="M0,100 L1440,100 L1440,30 Q720,100 0,30 Z" />
      </svg>
    </section>
  );
}
