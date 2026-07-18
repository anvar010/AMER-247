"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import mstyles from "@/components/MobileSupportScreen/MobileSupportScreen.module.css";
import { CountryCodeSelect } from "./Selects";

const reasons = ["Visa", "Career", "Suggestion", "Complaint", "Other"];

export default function MobileContactForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: `${fd.get("countryCode") ?? ""} ${fd.get("phone") ?? ""}`.trim(),
      reason: String(fd.get("mobileReason") ?? ""),
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
    <form className={mstyles.formCard} onSubmit={handleSubmit}>
      <label className={mstyles.field}>
        <span className={mstyles.fieldLabel}>Full name <span className={mstyles.req}>*</span></span>
        <input className={mstyles.input} type="text" name="name" placeholder="Your name" required />
      </label>

      <label className={mstyles.field}>
        <span className={mstyles.fieldLabel}>Email <span className={mstyles.req}>*</span></span>
        <input className={mstyles.input} type="email" name="email" placeholder="you@example.com" required />
      </label>

      <div className={mstyles.field}>
        <span className={mstyles.fieldLabel}>Phone <span className={mstyles.req}>*</span></span>
        <div className={mstyles.phoneRow}>
          <CountryCodeSelect className={mstyles.phoneCodeWrap} />
          <input
            className={mstyles.input}
            type="tel"
            name="phone"
            inputMode="tel"
            pattern="[0-9 ]*"
            placeholder="50 000 0000"
            required
          />
        </div>
      </div>

      <div className={mstyles.field}>
        <span className={mstyles.fieldLabel}>Reason for contact <span className={mstyles.req}>*</span></span>
        <div className={mstyles.reasonRow}>
          {reasons.map((r) => (
            <label key={r}>
              <input className={mstyles.reasonInput} type="radio" name="mobileReason" value={r} required />
              <span className={mstyles.reasonChip}>{r}</span>
            </label>
          ))}
        </div>
      </div>

      <label className={mstyles.field}>
        <span className={mstyles.fieldLabel}>Message <span className={mstyles.req}>*</span></span>
        <textarea className={mstyles.textarea} name="message" rows={5} placeholder="Tell us a bit more…" required />
      </label>

      {error && <span className={mstyles.fieldError}>{error}</span>}

      <button type="submit" className={mstyles.submit} disabled={submitting}>
        {submitting ? "Sending…" : "Send Message"} {!submitting && <ArrowRight size={16} />}
      </button>
    </form>
  );
}
