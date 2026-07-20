"use client";

import { useState } from "react";
import DesktopSearchOverlay from "@/components/DesktopSearchOverlay/DesktopSearchOverlay";
import styles from "./online-services.module.css";

export default function HeroActions() {
  const [searchOpen, setSearchOpen] = useState(false);

  const scrollToPricing = () => {
    const el = document.getElementById("pricing-tabs");
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.heroActions}>
      <button className={styles.btnModernPrimary} onClick={() => setSearchOpen(true)}>
        Explore Services
      </button>
      <button className={styles.btnModernSecondary} onClick={scrollToPricing}>
        View Pricing
      </button>
      <DesktopSearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
