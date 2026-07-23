"use client";

import { useEffect, useState } from "react";
import { countries } from "@/app/contact/Selects";
import { DET_SERVICE_OPTIONS } from "@/lib/det247Content";
import styles from "@/components/SimpleFormFields/SimpleFormFields.module.css";

export default function Det247Form() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serviceRequired, setServiceRequired] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaNum1, setCaptchaNum1] = useState(0);
  const [captchaNum2, setCaptchaNum2] = useState(0);
  const [captchaError, setCaptchaError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const generateCaptcha = () => {
    setCaptchaNum1(Math.floor(Math.random() * 10) + 1);
    setCaptchaNum2(Math.floor(Math.random() * 10) + 1);
    setCaptchaAnswer("");
    setCaptchaError("");
  };

  useEffect(() => { generateCaptcha(); }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCaptchaError("");
    setSubmitError("");

    if (Number(captchaAnswer) !== captchaNum1 + captchaNum2) {
      setCaptchaError("Incorrect captcha answer.");
      return;
    }

    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const payload = {
      fullName: String(fd.get("fullName") ?? ""),
      mobile: String(fd.get("mobile") ?? ""),
      email: String(fd.get("email") ?? ""),
      nationality: String(fd.get("nationality") ?? ""),
      location: String(fd.get("location") ?? ""),
      preferredContact: String(fd.get("preferredContact") ?? ""),
      serviceRequired,
      otherService: String(fd.get("otherService") ?? ""),
    };

    try {
      const res = await fetch("/api/det247-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submit failed");
      setSubmitted(true);
      generateCaptcha();
    } catch {
      setSubmitError("Couldn't submit your request. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.grid2}>
        <div className={styles.field}>
          <label htmlFor="det-fullName">Full Name <span className={styles.req}>*</span></label>
          <input id="det-fullName" className={styles.input} type="text" name="fullName" placeholder="Enter your full name" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="det-mobile">Mobile Number (with country code) <span className={styles.req}>*</span></label>
          <input id="det-mobile" className={styles.input} type="tel" name="mobile" placeholder="+971 50 123 4567" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="det-email">Email Address <span className={styles.req}>*</span></label>
          <input id="det-email" className={styles.input} type="email" name="email" placeholder="you@example.com" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="det-nationality">Nationality <span className={styles.req}>*</span></label>
          <select id="det-nationality" className={styles.select} name="nationality" required defaultValue="">
            <option value="" disabled>Select nationality…</option>
            {countries.map((c) => <option key={c.iso} value={c.name}>{c.name}</option>)}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="det-location">Current Location</label>
          <select id="det-location" className={styles.select} name="location" defaultValue="UAE">
            <option value="UAE">UAE</option>
            <option value="Outside UAE">Outside UAE</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="det-contact-method">Preferred Contact Method</label>
          <select id="det-contact-method" className={styles.select} name="preferredContact" defaultValue="Call">
            <option value="Call">Call</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Email">Email</option>
          </select>
        </div>
        <div className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="det-service">Service Required <span className={styles.req}>*</span></label>
          <select
            id="det-service"
            className={styles.select}
            required
            value={serviceRequired}
            onChange={(e) => setServiceRequired(e.target.value)}
          >
            <option value="" disabled>Please Select</option>
            {DET_SERVICE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        {serviceRequired === "Other" && (
          <div className={styles.field} style={{ gridColumn: "1 / -1" }}>
            <label htmlFor="det-other-service">Other (please specify) <span className={styles.req}>*</span></label>
            <input id="det-other-service" className={styles.input} type="text" name="otherService" placeholder="Type your required service" required />
          </div>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="det-captcha">Captcha <span className={styles.req}>*</span></label>
        <div className={styles.captchaRow}>
          <span className={styles.captchaBox}>{captchaNum1} + {captchaNum2} = ?</span>
          <button type="button" className={styles.captchaRefresh} onClick={generateCaptcha}>Refresh</button>
        </div>
        <input
          id="det-captcha"
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
        {loading ? "Submitting…" : "Submit"}
      </button>
      {submitted && <span className={styles.successMsg}>Thank you! We&apos;ll contact you shortly.</span>}
    </form>
  );
}
