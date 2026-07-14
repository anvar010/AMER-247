"use client";

import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Outfit } from "next/font/google";
import {
  X, User, Mail, Upload, Check, Lock, ArrowRight, Stamp, Clock,
} from "lucide-react";
import styles from "./MobileFormScreen.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

function genRef() {
  return "AMR-" + Math.floor(40000 + Math.random() * 9999);
}

export default function MobileFormScreen() {
  const params = useSearchParams();
  const service = params.get("service") || "AMER 24/7 Service";
  const hub = params.get("hub") || "AMER Services";
  const priceRaw = params.get("price");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const refNum = useRef(genRef());

  const canSubmit = name.trim().length > 1 && email.trim().length > 3 && phone.replace(/\D/g, "").length >= 7 && uploaded;

  const priceLabel = useMemo(() => {
    if (!priceRaw) return null;
    return priceRaw;
  }, [priceRaw]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={`${styles.doneWrap} ${outfit.className}`}>
        <div className={styles.doneBurst}>
          <span className={styles.doneCheck}><Check size={38} /></span>
        </div>
        <h1 className={styles.doneTitle}>Application submitted</h1>
        <p className={styles.doneP}>
          Your <b>{service}</b> application is in. We&apos;ll review it and email you next steps — 24/7.
        </p>
        <div className={styles.doneId}>
          <span>Reference</span>
          <b>{refNum.current}</b>
        </div>
        <div className={styles.doneEta}>
          <Clock size={15} /> Estimated processing: <b>2–4 days</b>
        </div>
        <div className={styles.doneCta}>
          <Link href="/login" className={styles.donePrimary}>Track application <ArrowRight size={17} /></Link>
          <Link href="/home" className={styles.doneLight}>Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.wrap} ${outfit.className}`}>
      <div className={styles.top}>
        <div className={styles.nav}>
          <Link href="/services" className={styles.close} aria-label="Close">
            <X size={18} />
          </Link>
          <span className={styles.title}>New application</span>
          <span className={styles.tag}>Application</span>
        </div>
      </div>

      <form className={styles.body} onSubmit={submit}>
        <div className={styles.svcCard}>
          <span className={styles.svcIco}><Stamp size={20} /></span>
          <div className={styles.svcBody}>
            <div className={styles.svcK}>{hub}</div>
            <div className={styles.svcName}>{service}</div>
            <div className={styles.svcFee}>
              {priceLabel ? <span>Government + service fee · <b>{priceLabel}</b></span> : <span>Fee quoted after review</span>}
            </div>
          </div>
        </div>

        <div className={styles.field}>
          <label>Full name</label>
          <div className={styles.iw}>
            <User size={18} className={styles.lead} />
            <input className={styles.inputHasIcon} type="text" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
        </div>

        <div className={styles.field}>
          <label>Email</label>
          <div className={styles.iw}>
            <Mail size={18} className={styles.lead} />
            <input className={styles.inputHasIcon} type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
        </div>

        <div className={styles.field}>
          <label>Mobile number</label>
          <div className={styles.phoneRow}>
            <span className={styles.phoneCode}>+971</span>
            <input className={styles.input} type="tel" inputMode="tel" placeholder="50 000 0000" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
        </div>

        <div className={styles.field} style={{ marginBottom: 0 }}>
          <label>Passport / Emirates ID copy</label>
          <button type="button" className={`${styles.upload} ${uploaded ? styles.uploadOn : ""}`} onClick={() => setUploaded((v) => !v)}>
            <span className={styles.upIco}>{uploaded ? <Check size={20} /> : <Upload size={20} />}</span>
            <span className={styles.upTxt}>
              <b>Attach files</b>
              <span>{uploaded ? "Attached · tap to remove" : "Required · tap to attach"}</span>
            </span>
            <span className={styles.upAct}>{uploaded ? "✓" : "+"}</span>
          </button>
        </div>

        <div className={styles.encrypted}>
          <Lock size={13} /> Your data is encrypted &amp; processed under UAE data-protection law.
        </div>

        <div className={styles.foot}>
          <button type="submit" className={styles.submitBtn} disabled={!canSubmit}>
            Submit application <ArrowRight size={17} />
          </button>
        </div>
      </form>
    </div>
  );
}
