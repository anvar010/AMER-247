"use client";

import Link from "next/link";
import { ArrowRight, Landmark, Grip } from "lucide-react";
import styles from "./AboutUs.module.css";
import ServiceCards from "../ServiceCards/ServiceCards";

export default function AboutUs() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid}`}>
        
        {/* Left Column: Expanding Service Cards */}
        <div style={{ flex: 1.2, minHeight: '550px', display: 'flex', alignItems: 'center' }}>
          <ServiceCards />
        </div>

        {/* Right Column: Content */}
        <div className={styles.content}>
          <div className={styles.titleRow}>
            <Grip size={18} className={styles.titleDots} />
            <h2 className={styles.title}>About Us</h2>
          </div>
          <span className={styles.titleAccent} />

          <p className={styles.lead}>
            We understand the challenges that can come with paperwork, long
            queues, and confusing processes.
          </p>

          <div className={styles.infoBox}>
            <span className={styles.infoIconWrap}>
              <Landmark size={26} strokeWidth={1.6} className={styles.infoIcon} />
            </span>
            <p className={styles.infoText}>
              Amer 24/7 provides services ranging from issuing entry permits, issuing and
              renewals of residency visas, visa cancellations and other related
              services provided by top government institutions.
            </p>
          </div>

          <Link href="/about" className={styles.cta}>
            Know more about Amer 247 <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
