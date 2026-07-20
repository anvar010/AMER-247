"use client";

import styles from "./online-services.module.css";

export default function HeroActions() {
  const scrollToPricing = () => {
    const el = document.getElementById("pricing-tabs");
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.heroActions}>
      <button className={styles.btnModernPrimary} onClick={scrollToPricing}>
        Explore Services
      </button>
      <button className={styles.btnModernSecondary} onClick={scrollToPricing}>
        View Pricing
      </button>
    </div>
  );
}
