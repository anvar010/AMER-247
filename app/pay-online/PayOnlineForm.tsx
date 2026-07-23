"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/components/SimpleFormFields/SimpleFormFields.module.css";

export default function PayOnlineForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaA, setCaptchaA] = useState(0);
  const [captchaB, setCaptchaB] = useState(0);
  const [captchaError, setCaptchaError] = useState("");

  const regenerateCaptcha = () => {
    setCaptchaA(Math.floor(Math.random() * 9) + 1);
    setCaptchaB(Math.floor(Math.random() * 9) + 1);
    setCaptchaAnswer("");
    setCaptchaError("");
  };

  useEffect(() => { regenerateCaptcha(); }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCaptchaError("");

    if (Number(captchaAnswer) !== captchaA + captchaB) {
      setCaptchaError("Incorrect captcha answer.");
      return;
    }

    setLoading(true);
    router.push("/payment");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="payonline-name">Full Name</label>
        <input id="payonline-name" className={styles.input} type="text" placeholder="Your name" required />
      </div>
      <div className={styles.grid2}>
        <div className={styles.field}>
          <label htmlFor="payonline-email">Email</label>
          <input id="payonline-email" className={styles.input} type="email" placeholder="you@example.com" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="payonline-mobile">Mobile</label>
          <input id="payonline-mobile" className={styles.input} type="tel" placeholder="+971 50 000 0000" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="payonline-reference">Reference</label>
          <input id="payonline-reference" className={styles.input} type="text" placeholder="Application reference" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="payonline-amount">Amount (AED)</label>
          <input id="payonline-amount" className={styles.input} type="number" placeholder="0.00" required />
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="payonline-comments">Comments</label>
        <textarea id="payonline-comments" className={styles.textarea} placeholder="Any specific requirements (optional)" />
      </div>

      <div className={styles.field}>
        <label htmlFor="payonline-captcha">Captcha</label>
        <div className={styles.captchaRow}>
          <span className={styles.captchaBox}>{captchaA} + {captchaB} = ?</span>
          <button type="button" className={styles.captchaRefresh} onClick={regenerateCaptcha}>Refresh</button>
        </div>
        <input
          id="payonline-captcha"
          className={styles.input}
          type="text"
          placeholder="Enter answer"
          value={captchaAnswer}
          onChange={(e) => setCaptchaAnswer(e.target.value)}
          required
        />
        {captchaError && <span className={styles.captchaError}>{captchaError}</span>}
      </div>

      <button type="submit" className={styles.submitBtn} disabled={loading}>
        {loading ? "Processing…" : "Proceed to Payment"}
      </button>
    </form>
  );
}
