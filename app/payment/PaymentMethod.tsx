"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Smartphone } from "lucide-react";
import styles from "@/components/SimpleFormFields/SimpleFormFields.module.css";

const MONTHS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const YEARS = ["2025", "2026", "2027", "2028", "2029", "2030"];

export default function PaymentMethod() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    router.push("/request-sent");
  };

  return (
    <div>
      <button type="button" className={styles.upload} style={{ justifyContent: "space-between" }}>
        Pay Using Samsung Pay
        <Smartphone size={18} />
      </button>

      <p style={{ textAlign: "center", color: "#64748B", fontSize: "0.82rem", margin: "1rem 0" }}>or</p>

      <form className={styles.form} onSubmit={handleSubmit} style={{ boxShadow: "none", padding: 0 }}>
        <div className={styles.field}>
          <label>Card Number (*)</label>
          <input className={styles.input} type="text" inputMode="numeric" placeholder="**** **** **** ****" required />
        </div>
        <div className={styles.grid2}>
          <div className={styles.field}>
            <label>CVV/CVC/CID (*)</label>
            <input className={styles.input} type="text" inputMode="numeric" placeholder="123" required maxLength={4} />
          </div>
          <div className={styles.field}>
            <label>Expiry Month (*)</label>
            <select className={styles.select} required defaultValue="">
              <option value="" disabled>Select month…</option>
              {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className={styles.field}>
            <label>Expiry Year (*)</label>
            <select className={styles.select} required defaultValue="">
              <option value="" disabled>Select year…</option>
              {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button type="reset" className={styles.submitBtn} style={{ flex: 1, background: "#E9EDF4", color: "#1A1A1A" }}>
            Reset
          </button>
          <button type="submit" className={styles.submitBtn} style={{ flex: 1 }} disabled={loading}>
            {loading ? "Processing…" : "Proceed to Payment"}
          </button>
        </div>
      </form>
    </div>
  );
}
