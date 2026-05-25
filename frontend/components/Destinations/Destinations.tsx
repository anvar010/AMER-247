import { Crown, Check, FileText, AlertCircle, ShieldCheck } from "lucide-react";
import styles from "./Destinations.module.css";

type Status = "free" | "evisa" | "required";

const destinations: { code: string; name: string; status: Status }[] = [
  { code: "ae", name: "United Arab Emirates", status: "evisa" },
  { code: "eg", name: "Egypt", status: "required" },
  { code: "ng", name: "Nigeria", status: "required" },
  { code: "id", name: "Indonesia", status: "evisa" },
  { code: "us", name: "United States", status: "free" },
  { code: "gb", name: "United Kingdom", status: "free" },
  { code: "ca", name: "Canada", status: "free" },
  { code: "au", name: "Australia", status: "free" },
  { code: "de", name: "Germany", status: "free" },
  { code: "fr", name: "France", status: "free" },
  { code: "jp", name: "Japan", status: "free" },
  { code: "sg", name: "Singapore", status: "free" },
  { code: "in", name: "India", status: "evisa" },
  { code: "pk", name: "Pakistan", status: "evisa" },
];

const statusMeta: Record<Status, { label: string; cls: string; icon: React.ReactNode }> = {
  free: { label: "Visa on Arrival", cls: "free", icon: <Check size={14} /> },
  evisa: { label: "E-Visa", cls: "evisa", icon: <FileText size={14} /> },
  required: { label: "Visa Required", cls: "req", icon: <AlertCircle size={14} /> },
};

export default function Destinations() {
  const track = [...destinations, ...destinations];

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <div className={styles.label}>
          <span className={styles.dash}></span>
          <span>PREMIUM DESTINATIONS</span>
          <Crown size={16} className={styles.crown} />
        </div>
        <h2 className={styles.title}>Explore Your Visa Eligibility</h2>
        <p className={styles.sub}>
          Discover entry requirements and visa options for your next destination.
        </p>
      </div>

      <div className={styles.marquee}>
        <div className={styles.track}>
          {track.map((d, i) => {
            const meta = statusMeta[d.status];
            return (
              <article key={`${d.code}-${i}`} className={styles.card}>
                <div className={styles.flagWrap}>
                  <img
                    src={`https://flagcdn.com/w160/${d.code}.png`}
                    srcSet={`https://flagcdn.com/w320/${d.code}.png 2x`}
                    alt={`${d.name} flag`}
                    className={styles.flag}
                    loading="lazy"
                  />
                </div>
                <h3 className={styles.name}>{d.name}</h3>
                <span className={`${styles.pill} ${styles[meta.cls]}`}>
                  {meta.icon}
                  {meta.label}
                </span>
              </article>
            );
          })}
        </div>
      </div>

      <div className={styles.footer}>
        <ShieldCheck size={16} className={styles.footerIcon} />
        Visa policies may change. Please verify before traveling.
      </div>
    </section>
  );
}
