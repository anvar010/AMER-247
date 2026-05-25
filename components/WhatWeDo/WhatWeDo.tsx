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
  { label: "AMER Services", icon: MonitorSmartphone },
  { label: "Emirates Identity Authority", icon: IdCard },
  { label: "Medical Fitness Application", icon: HeartPulse },
  { label: "Entry Permits", icon: Stamp },
  { label: "Health Insurance Services", icon: ShieldPlus },
  { label: "Dubai Economy Services", icon: TrendingUp },
  { label: "Company Establishment & Clearance", icon: Building2 },
];

export default function WhatWeDo() {
  return (
    <section className={styles.section}>
      <div className="container">
        <span className={styles.eyebrow} />
        <h2 className={styles.title}>What We Do</h2>
        <div className={styles.subWrap}>
          <p className={styles.sub}>Here are the services we provide</p>
        </div>

        <div className={styles.grid}>
          {services.map(({ label, icon: Icon }) => (
            <Link href="/services" key={label} className={styles.card}>
              <Icon size={42} strokeWidth={1.5} className={styles.cardIcon} />
              <span className={styles.cardDivider} />
              <span className={styles.cardTitle}>{label}</span>
              <ArrowRight size={20} className={styles.cardArrow} />
            </Link>
          ))}
        </div>

        <div className={styles.ctaWrap}>
          <Link href="/services" className={styles.cta}>
            <span className={styles.ctaLabel}>See More Services</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
