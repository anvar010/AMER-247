"use client";

import { Outfit } from "next/font/google";
import styles from "./MobilePartnersStrip.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["700"] });

const PARTNERS = [
  { name: "Dubai Health Authority", src: "/images/DHA.svg" },
  { name: "Dubai Economy", src: "/images/DubaiEconomy.webp" },
  { name: "Federal Authority for Identity & Citizenship", src: "/images/fauCopy.webp" },
  { name: "GDRFA Dubai", src: "/images/GRDRFA.webp" },
];

export default function MobilePartnersStrip() {
  const track = [...PARTNERS, ...PARTNERS];

  return (
    <section className={`${styles.wrap} ${outfit.className}`}>
      <div className={styles.sec}>
        <h2 className={styles.h2}>Our Partners</h2>
      </div>

      <div className={styles.marquee}>
        <div className={styles.track}>
          {track.map((p, i) => (
            <div key={i} className={styles.chip}>
              <img
                src={p.src}
                alt={p.name}
                className={styles.logo}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
