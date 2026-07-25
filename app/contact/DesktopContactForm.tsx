"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import styles from "./contact.module.css";
import { CountryCodeSelect, OptionSelect } from "./Selects";

const reasons = ["Visa", "Career", "Suggestion", "Complaint", "Other"];

export default function DesktopContactForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaNum1, setCaptchaNum1] = useState(0);
  const [captchaNum2, setCaptchaNum2] = useState(0);
  const [captchaError, setCaptchaError] = useState("");

  const generateCaptcha = () => {
    setCaptchaNum1(Math.floor(Math.random() * 10) + 1);
    setCaptchaNum2(Math.floor(Math.random() * 10) + 1);
    setCaptchaAnswer("");
    setCaptchaError("");
  };

  useEffect(() => { generateCaptcha(); }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setError("");
    setCaptchaError("");

    if (Number(captchaAnswer) !== captchaNum1 + captchaNum2) {
      setCaptchaError("Incorrect captcha answer.");
      return;
    }

    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: `${fd.get("countryCode") ?? ""} ${fd.get("phone") ?? ""}`.trim(),
      reason: String(fd.get("reason") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submit failed");
      router.push("/request-sent");
    } catch {
      setError("Couldn't send your message. Please check your connection and try again.");
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGrid}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Full name <span className={styles.req}>*</span></span>
          <input className={styles.input} type="text" name="name" placeholder="Your name" required />
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Email <span className={styles.req}>*</span></span>
          <input className={styles.input} type="email" name="email" placeholder="you@example.com" required />
        </label>
        <div className={styles.field}>
          <span className={styles.fieldLabel}>Phone <span className={styles.req}>*</span></span>
          <div className={styles.phoneWrap}>
            <CountryCodeSelect />
            <input
              className={`${styles.input} ${styles.phoneInput}`}
              type="tel"
              name="phone"
              placeholder="50 000 0000"
              inputMode="tel"
              pattern="[0-9 ]*"
              required
            />
          </div>
        </div>
        <div className={styles.field}>
          <span className={styles.fieldLabel}>Your Reason For Contact <span className={styles.req}>*</span></span>
          <OptionSelect name="reason" options={reasons} placeholder="Select a reason…" required />
        </div>
      </div>

      <label className={`${styles.field} ${styles.fieldFull}`}>
        <span className={styles.fieldLabel}>Message <span className={styles.req}>*</span></span>
        <textarea className={styles.textarea} name="message" rows={6} placeholder="Tell us a bit more…" required />
      </label>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>Captcha <span className={styles.req}>*</span></span>
        <div className={styles.captchaRow}>
          <span className={styles.captchaBox}>{captchaNum1} + {captchaNum2} = ?</span>
          <button type="button" className={styles.captchaRefresh} onClick={generateCaptcha}>Refresh</button>
        </div>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter answer"
          value={captchaAnswer}
          onChange={(e) => setCaptchaAnswer(e.target.value)}
          required
        />
        {captchaError && <p className={styles.fieldLabel} style={{ color: "#dc2626" }}>{captchaError}</p>}
      </div>

      {error && <p className={styles.fieldLabel} style={{ color: "#dc2626" }}>{error}</p>}

      <button type="submit" className={styles.submit} disabled={submitting}>
        {submitting ? "Sending…" : "Send Message"} {!submitting && <ArrowRight size={16} />}
      </button>
    </form>
  );
}
