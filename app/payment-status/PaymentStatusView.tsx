"use client";

import { useSearchParams } from "next/navigation";
import PageHero from "@/components/PageHero/PageHero";
import styles from "./payment-status.module.css";

export default function PaymentStatusView() {
  const searchParams = useSearchParams();
  const st = searchParams.get("st");

  const entries = Array.from(searchParams.entries()).filter(([key]) => key !== "comments" && key !== "st");

  return (
    <>
      <PageHero title="Transaction Details" />
      <div className={`container ${styles.body}`}>
        {st === "1" ? (
          <p className={styles.success}>Transaction Successful. A confirmation email has been sent to you.</p>
        ) : st === "2" ? (
          <p className={styles.failure}>Transaction Failed. Please try again or contact support.</p>
        ) : (
          <p className={styles.neutral}>No transaction reference was provided.</p>
        )}

        {entries.length > 0 && (
          <ul className={styles.list}>
            {entries.map(([key, val]) => (
              <li key={key}><b>{key}:</b> {val}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
