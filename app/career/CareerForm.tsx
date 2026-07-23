"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Check } from "lucide-react";
import { countries } from "@/app/contact/Selects";
import styles from "@/components/SimpleFormFields/SimpleFormFields.module.css";

const CITIES = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Lahore", "Karachi", "Other"];
const EXPERIENCE = ["1 Year", "2 Years", "3 Years", "4 Years", "5+ Years"];

// Matches the submission-files bucket's own 5MB limit (see lib/saveSubmission.ts).
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export default function CareerForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [cvSizeError, setCvSizeError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");

    const fd = new FormData(e.currentTarget);
    if (cv) fd.append("files", cv);

    try {
      const res = await fetch("/api/career", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Submit failed");
      router.push("/request-sent");
    } catch {
      setError("Couldn't send your application. Please check your connection and try again.");
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 800, color: "#1A1A1A" }}>
        Apply Now
      </h2>
      <p style={{ margin: "-0.5rem 0 0", fontSize: "0.85rem", color: "#64748B" }}>
        Fill out the form and apply online!
      </p>

      <div className={styles.field}>
        <label htmlFor="career-fullName">Full Name <span className={styles.req}>*</span></label>
        <input id="career-fullName" className={styles.input} type="text" name="fullName" placeholder="John Doe" required />
      </div>

      <div className={styles.field}>
        <label htmlFor="career-email">Your Email <span className={styles.req}>*</span></label>
        <input id="career-email" className={styles.input} type="email" name="email" placeholder="you@example.com" required />
      </div>

      <div className={styles.field}>
        <label htmlFor="career-phone">Phone No. <span className={styles.req}>*</span></label>
        <input id="career-phone" className={styles.input} type="tel" name="phone" placeholder="+971 50 000 0000" required />
      </div>

      <div className={styles.grid2}>
        <div className={styles.field}>
          <label htmlFor="career-location">Current Location <span className={styles.req}>*</span></label>
          <select id="career-location" className={styles.select} name="location" required defaultValue="">
            <option value="" disabled>Select location…</option>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="career-nationality">Nationality <span className={styles.req}>*</span></label>
          <select id="career-nationality" className={styles.select} name="nationality" required defaultValue="">
            <option value="" disabled>Select nationality…</option>
            {countries.map((c) => <option key={c.iso} value={c.name}>{c.name}</option>)}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="career-experience">Experience <span className={styles.req}>*</span></label>
        <select id="career-experience" className={styles.select} name="experience" required defaultValue="">
          <option value="" disabled>Select experience…</option>
          {EXPERIENCE.map((e) => <option key={e} value={e}>{e}</option>)}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="career-skills">Key Skills <span className={styles.req}>*</span></label>
        <input id="career-skills" className={styles.input} type="text" name="skills" placeholder="e.g. Customer service, Sales, Immigration processing" required />
      </div>

      <div className={styles.field}>
        <label htmlFor="career-cv">Upload CV</label>
        <input
          id="career-cv"
          ref={fileRef}
          type="file"
          accept=".pdf,.doc,.docx"
          style={{ display: "none" }}
          onChange={(e) => {
            const picked = e.target.files?.[0] ?? null;
            if (picked && picked.size > MAX_UPLOAD_BYTES) {
              setCv(null);
              setCvSizeError(`"${picked.name}" is over 5MB — please choose a smaller file.`);
              return;
            }
            setCv(picked);
            setCvSizeError("");
          }}
        />
        <button
          type="button"
          className={`${styles.upload} ${cv ? styles.uploadOn : ""}`}
          onClick={() => fileRef.current?.click()}
        >
          {cv ? <Check size={16} /> : <Upload size={16} />}
          {cv ? cv.name : "Attach your CV (PDF or Word)"}
        </button>
        <span style={{ fontSize: "0.78rem", color: "#64748B" }}>Max per file size 5MB</span>
        {cvSizeError && <p style={{ margin: 0, fontSize: "0.85rem", color: "#dc2626" }}>{cvSizeError}</p>}
      </div>

      {error && <p style={{ margin: 0, fontSize: "0.85rem", color: "#dc2626" }}>{error}</p>}

      <button type="submit" className={styles.submitBtn} disabled={loading}>
        {loading ? "Submitting…" : "Submit Request"}
      </button>
    </form>
  );
}
