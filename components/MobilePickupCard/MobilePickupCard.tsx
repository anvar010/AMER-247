"use client";

import Link from "next/link";
import { Outfit } from "next/font/google";
import { Clock, ArrowRight } from "lucide-react";
import styles from "./MobilePickupCard.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

const POINTS = [
  "The only government services centre open 24 hours in the UAE.",
  "Open on Fridays & public holidays — when others are closed.",
  "Ample parking available right across the area.",
  "One-stop shop — finish every transaction in a single visit.",
];

export default function MobilePickupCard() {
  return (
    <section className={`${styles.wrap} ${outfit.className}`}>
      <div className={styles.sec}>
        <h2 className={styles.h2}>24/7 Courier</h2>
      </div>

      <div className={styles.card}>
        <div className={styles.imgWrap}>
          <img src="/images/document_pickup_delivery.png" alt="Document pick-up & delivery" className={styles.img} />
          <div className={styles.badge}>
            <span className={styles.badgeIco}>
              <Clock size={18} />
            </span>
            <div>
              <b className={styles.badgeT}>24/7</b>
              <span className={styles.badgeL}>Courier</span>
            </div>
          </div>
        </div>

        <div className={styles.body}>
          <h3 className={styles.title}>
            Document <span className={styles.gold}>pick-up &amp; drop-off</span>
          </h3>

          <ol className={styles.points}>
            {POINTS.map((p, i) => (
              <li key={i} className={styles.point}>
                <span className={styles.pn}>{String(i + 1).padStart(2, "0")}</span>
                <p className={styles.pt}>{p}</p>
              </li>
            ))}
          </ol>

          <Link href="/services" className={styles.cta}>
            Learn More <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
