import { Check, FileText, AlertCircle } from "lucide-react";
import { Outfit } from "next/font/google";
import styles from "./Countries.module.css";
import mstyles from "@/components/MobileCountryStrip/MobileCountryStrip.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["600", "700"] });

type Status = "free" | "evisa" | "required";

type Country = {
  code: string;
  name: string;
  status: Status;
};

const countries: Country[] = [
  { code: "us", name: "United States", status: "free" },
  { code: "gb", name: "United Kingdom", status: "free" },
  { code: "ca", name: "Canada", status: "free" },
  { code: "au", name: "Australia", status: "free" },
  { code: "de", name: "Germany", status: "free" },
  { code: "fr", name: "France", status: "free" },
  { code: "it", name: "Italy", status: "free" },
  { code: "es", name: "Spain", status: "free" },
  { code: "jp", name: "Japan", status: "free" },
  { code: "kr", name: "South Korea", status: "free" },
  { code: "sg", name: "Singapore", status: "free" },
  { code: "cn", name: "China", status: "free" },
  { code: "ru", name: "Russia", status: "free" },
  { code: "br", name: "Brazil", status: "free" },
  { code: "in", name: "India", status: "evisa" },
  { code: "pk", name: "Pakistan", status: "evisa" },
  { code: "bd", name: "Bangladesh", status: "required" },
  { code: "ph", name: "Philippines", status: "evisa" },
  { code: "lk", name: "Sri Lanka", status: "evisa" },
  { code: "eg", name: "Egypt", status: "required" },
  { code: "ng", name: "Nigeria", status: "required" },
  { code: "id", name: "Indonesia", status: "evisa" },
];

const statusMeta: Record<Status, { label: string; className: string; icon: React.ReactNode }> = {
  free: { label: "Visa on Arrival", className: "statusFree", icon: <Check size={11} /> },
  evisa: { label: "E-Visa", className: "statusEvisa", icon: <FileText size={11} /> },
  required: { label: "Visa Required", className: "statusReq", icon: <AlertCircle size={11} /> },
};

// Mobile's marquee shows a curated subset (drops a few lower-traffic
// countries to keep the strip shorter on small screens) — filtered from
// the same master list above rather than a second hardcoded array.
const MOBILE_CODES = new Set([
  "us", "gb", "ca", "au", "de", "fr", "jp", "sg",
  "in", "pk", "ph", "lk", "eg", "ng", "bd",
]);
const mobileCountries = countries.filter((c) => MOBILE_CODES.has(c.code));

export default function Countries() {
  const track = [...countries, ...countries];
  const mobileTrack = [...mobileCountries, ...mobileCountries];

  return (
    <>
    <section className={styles.section}>
      <div className={styles.marquee}>
        <div className={styles.track}>
          {track.map((c, i) => {
            const meta = statusMeta[c.status];
            return (
              <div key={`${c.code}-${i}`} className={styles.item}>
                <img
                  src={`https://flagcdn.com/w80/${c.code}.png`}
                  alt={`${c.name} flag`}
                  className={styles.flag}
                  loading="lazy"
                />
                <span className={styles.name}>{c.name}</span>
                <span className={`${styles.status} ${styles[meta.className]}`}>
                  {meta.icon}
                  {meta.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Mobile-only — same master list (filtered subset) and status labels
        as above. Visibility is CSS-driven (mstyles.wrap). */}
    <section className={`${mstyles.wrap} ${outfit.className}`}>
      <div className={mstyles.marquee}>
        <div className={mstyles.track}>
          {mobileTrack.map((c, i) => (
            <div key={`${c.code}-${i}`} className={mstyles.chip}>
              <img
                src={`https://flagcdn.com/w80/${c.code}.png`}
                alt={c.name}
                className={mstyles.flag}
                loading="lazy"
              />
              <span className={mstyles.name}>{c.name}</span>
              <span className={`${mstyles.status} ${mstyles[c.status]}`}>
                {statusMeta[c.status].label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
