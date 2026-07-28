"use client";

import { useMemo, useState } from "react";
import { MapPin, Clock } from "lucide-react";
import { EMIRATES_ORDER, type MedicalCentre } from "@/lib/medicalCentres";
import styles from "./medical-centres.module.css";

type Status = "open" | "closed" | "unknown";

// Computed once per render from the visitor's own local clock — good enough
// for "should I head there now," not meant to survive midnight without a
// refresh.
function getStatus(centre: MedicalCentre, now: Date): Status {
  if (!centre.opensAt || !centre.closesAt) return "unknown";
  const day = now.getDay(); // 0 = Sunday
  if (centre.days === "mon-sat" && day === 0) return "closed";

  const minutesNow = now.getHours() * 60 + now.getMinutes();
  const [openH, openM] = centre.opensAt.split(":").map(Number);
  const [closeH, closeM] = centre.closesAt.split(":").map(Number);
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;
  return minutesNow >= openMinutes && minutesNow < closeMinutes ? "open" : "closed";
}

function formatHour(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour12}${period}` : `${hour12}:${String(m).padStart(2, "0")}${period}`;
}

export default function MedicalCentresExplorer({ centres }: { centres: MedicalCentre[] }) {
  const [active, setActive] = useState(EMIRATES_ORDER[0]);
  const now = useMemo(() => new Date(), []);

  const grouped = useMemo(() => {
    const map = new Map<string, MedicalCentre[]>();
    for (const c of centres) {
      const list = map.get(c.emirate) ?? [];
      list.push(c);
      map.set(c.emirate, list);
    }
    return map;
  }, [centres]);

  const shown = grouped.get(active) ?? [];

  return (
    <div>
      <div className={styles.tabRow} role="tablist" aria-label="Select emirate">
        {EMIRATES_ORDER.map((emirate) => {
          const count = grouped.get(emirate)?.length ?? 0;
          return (
            <button
              key={emirate}
              type="button"
              role="tab"
              aria-selected={active === emirate}
              className={`${styles.tab} ${active === emirate ? styles.tabOn : ""}`}
              onClick={() => setActive(emirate)}
            >
              {emirate} <span className={styles.tabCount}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.grid}>
        {shown.map((centre) => {
          const status = getStatus(centre, now);
          return (
            <div key={centre.name} className={styles.card}>
              <div className={styles.cardTop}>
                <p className={styles.cardName}>{centre.name}</p>
                {status !== "unknown" && (
                  <span className={status === "open" ? styles.statusOpen : styles.statusClosed}>
                    {status === "open" ? "Open now" : "Closed"}
                  </span>
                )}
              </div>
              <div className={styles.cardMeta}>
                <span className={styles.cardMetaItem}><MapPin size={12} /> {centre.area}</span>
                {centre.opensAt && centre.closesAt ? (
                  <span className={styles.cardMetaItem}>
                    <Clock size={12} />
                    {formatHour(centre.opensAt)}–{formatHour(centre.closesAt)}
                    <span className={styles.cardDays}>{centre.days === "daily" ? "Daily" : "Mon–Sat"}</span>
                  </span>
                ) : (
                  <span className={styles.cardMetaItem}>Call ahead for timing</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
