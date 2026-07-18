"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, X, ArrowRight } from "lucide-react";
import styles from "./request-sent.module.css";

export default function RequestSentView() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const isSuccess = code === "0" || !code;

  return (
    <div className={styles.wrap}>
      <span className={`${styles.burst} ${isSuccess ? styles.burstOk : styles.burstFail}`}>
        {isSuccess ? <Check size={38} /> : <X size={38} />}
      </span>

      {isSuccess ? (
        <h1 className={styles.title}>Request submitted</h1>
      ) : (
        <h1 className={styles.title}>Payment Failed — Kindly contact the Support Team</h1>
      )}

      <p className={styles.copy}>Still Got Queries? Contact us on the details below!</p>

      <div className={styles.cta}>
        <Link href="/contact" className={styles.primary}>Contact Us <ArrowRight size={16} /></Link>
        <Link href="/" className={styles.secondary}>Back to home</Link>
      </div>
    </div>
  );
}
