"use client";

import { Outfit } from "next/font/google";
import styles from "./MobileCountryStrip.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["600", "700"] });

type Status = "free" | "evisa" | "required";

const STATUS_LABEL: Record<Status, string> = {
  free: "Visa on Arrival",
  evisa: "E-Visa",
  required: "Visa Required",
};

const COUNTRIES: { code: string; name: string; s: Status }[] = [
  { code: "us", name: "United States", s: "free" },
  { code: "gb", name: "United Kingdom", s: "free" },
  { code: "ca", name: "Canada", s: "free" },
  { code: "au", name: "Australia", s: "free" },
  { code: "de", name: "Germany", s: "free" },
  { code: "fr", name: "France", s: "free" },
  { code: "jp", name: "Japan", s: "free" },
  { code: "sg", name: "Singapore", s: "free" },
  { code: "in", name: "India", s: "evisa" },
  { code: "pk", name: "Pakistan", s: "evisa" },
  { code: "ph", name: "Philippines", s: "evisa" },
  { code: "lk", name: "Sri Lanka", s: "evisa" },
  { code: "eg", name: "Egypt", s: "required" },
  { code: "ng", name: "Nigeria", s: "required" },
  { code: "bd", name: "Bangladesh", s: "required" },
];

export default function MobileCountryStrip() {
  const track = [...COUNTRIES, ...COUNTRIES];

  return (
    <section className={`${styles.wrap} ${outfit.className}`}>
      <div className={styles.marquee}>
        <div className={styles.track}>
          {track.map((c, i) => (
            <div key={`${c.code}-${i}`} className={styles.chip}>
              <img
                src={`https://flagcdn.com/w80/${c.code}.png`}
                alt={c.name}
                className={styles.flag}
                loading="lazy"
              />
              <span className={styles.name}>{c.name}</span>
              <span className={`${styles.status} ${styles[c.s]}`}>{STATUS_LABEL[c.s]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
