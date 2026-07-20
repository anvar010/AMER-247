"use client";

import Link from "next/link";
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
      <Link href="/pricing-list" className={styles.btnModernSecondary}>
        View Pricing
      </Link>
    </div>
  );
}
