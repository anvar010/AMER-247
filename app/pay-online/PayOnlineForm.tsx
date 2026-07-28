"use client";

import { useEffect, useState } from "react";
import styles from "@/components/SimpleFormFields/SimpleFormFields.module.css";

export default function PayOnlineForm() {
  const [loading, setLoading] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaA, setCaptchaA] = useState(0);
  const [captchaB, setCaptchaB] = useState(0);
  const [captchaError, setCaptchaError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const regenerateCaptcha = () => {
    setCaptchaA(Math.floor(Math.random() * 9) + 1);
    setCaptchaB(Math.floor(Math.random() * 9) + 1);
    setCaptchaAnswer("");
    setCaptchaError("");
  };

  useEffect(() => { regenerateCaptcha(); }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCaptchaError("");
    setSubmitError("");

    if (Number(captchaAnswer) !== captchaA + captchaB) {
      setCaptchaError("Incorrect captcha answer.");
      return;
    }

    setLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          mobile: form.get("mobile"),
          amount: form.get("amount"),
          comments: form.get("comments"),
          applicationReference: form.get("applicationReference"),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.paymentUrl) throw new Error(json.error || "Payment could not be started.");
      // Full navigation, not router.push — Mettpay's checkout is a different
      // origin, and the client router doesn't cross-origin navigate.
      window.location.href = json.paymentUrl;
    } catch {
      setLoading(false);
      setSubmitError("Something went wrong starting the payment. Please try again.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="payonline-name">Full Name</label>
        <input id="payonline-name" name="name" className={styles.input} type="text" placeholder="Your name" required />
      </div>
      <div className={styles.grid2}>
        <div className={styles.field}>
          <label htmlFor="payonline-email">Email</label>
          <input id="payonline-email" name="email" className={styles.input} type="email" placeholder="you@example.com" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="payonline-mobile">Mobile</label>
          <input id="payonline-mobile" name="mobile" className={styles.input} type="tel" placeholder="+971 50 000 0000" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="payonline-reference">Reference</label>
          <input id="payonline-reference" name="applicationReference" className={styles.input} type="text" placeholder="Application reference" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="payonline-amount">Amount (AED)</label>
          <input id="payonline-amount" name="amount" className={styles.input} type="number" placeholder="0.00" required />
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="payonline-comments">Comments</label>
        <textarea id="payonline-comments" name="comments" className={styles.textarea} placeholder="Any specific requirements (optional)" />
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

      {submitError && <span className={styles.captchaError}>{submitError}</span>}

      <button type="submit" className={styles.submitBtn} disabled={loading}>
        {loading ? "Processing…" : "Proceed to Payment"}
      </button>

      <img src="/payments-Photoroom.png" alt="Visa, Mastercard, Apple Pay, Samsung Pay" className={styles.paymentIcons} />
    </form>
  );
}
