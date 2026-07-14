"use client";

import { Outfit } from "next/font/google";
import CountUp from "@/components/CountUp/CountUp";
import styles from "./MobileLiveStats.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["600", "700", "800"] });

export default function MobileLiveStats() {
  return (
    <section className={`${styles.wrap} ${outfit.className}`}>
      <div className={styles.grid}>
        <div className={styles.stat}>
          <div className={styles.statV}><CountUp to={120} suffix="K+" /></div>
          <div className={styles.statL}>CUSTOMERS<br />SERVED</div>
        </div>
        <div className={styles.stat}>
          <div className={`${styles.statV} ${styles.gold}`}><CountUp to={15} suffix=" min" /></div>
          <div className={styles.statL}>AVG.<br />PROCESSING</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statV}><CountUp to={4} suffix=".9" /></div>
          <div className={styles.statL}>APP STORE<br />RATING</div>
        </div>
        <div className={styles.stat}>
          <div className={`${styles.statV} ${styles.gold}`}>24/7</div>
          <div className={styles.statL}>ALWAYS<br />OPEN</div>
        </div>
      </div>
    </section>
  );
}
