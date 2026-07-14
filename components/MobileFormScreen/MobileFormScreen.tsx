"use client";

import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Outfit } from "next/font/google";
import {
  X, User, Users, Mail, MapPin, Upload, Check, Lock, ArrowRight, Clock,
  Building2, IdCard, Gem, FileText, Stethoscope, ShieldPlus, type LucideIcon,
} from "lucide-react";
import styles from "./MobileFormScreen.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

function genRef() {
  return "AMR-" + Math.floor(40000 + Math.random() * 9999);
}

// The real app defines 4 distinct form types (A/B/C/D), one per hub, each
// with its own field set — this mirrors that exactly (247APP/amer-247-expo/
// src/data/catalog.ts `forms`). Only deviation: the real "apptype" field
// (Normal/VIP/VVIP) is dropped here on purpose — our Medical Test items are
// already split into per-tier entries at selection time (e.g. "New Entry —
// VIP · 06 hrs"), so re-asking the tier on the form would just contradict
// the item the user already picked.
type FormType = "A" | "B" | "C" | "D";

function formTypeForHub(hub: string): FormType {
  if (hub === "Emirates ID") return "B";
  if (hub === "Golden Visa") return "C";
  if (hub === "Medical Test" || hub === "Insurance" || hub === "Tas-Heel Services") return "D";
  return "A"; // Amer Services and its category groups
}

const FORM_META: Record<FormType, { title: string; desc: string }> = {
  A: { title: "AMER Service Application", desc: "Entry permits, renewals, stamping, cancellations & change of status." },
  B: { title: "Emirates ID Application", desc: "New, renewal, replacement & sponsor-transfer Emirates ID services." },
  C: { title: "Golden Visa Application", desc: "Long-term residency for investors, talent & families." },
  D: { title: "Medical & Insurance Application", desc: "Medical fitness tests & health insurance plans." },
};

const HUB_ICONS: Record<string, LucideIcon> = {
  "AMER Services": Building2,
  "Amer Services": Building2,
  "Emirates ID": IdCard,
  "Golden Visa": Gem,
  "Tas-Heel Services": FileText,
  "Medical Test": Stethoscope,
  "Insurance": ShieldPlus,
};

const EMIRATES = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"];

const GOLDEN_UPLOADS = [
  { key: "passport", label: "Passport of Applicant" },
  { key: "visa", label: "Visa Copy of Applicant" },
  { key: "eid", label: "Emirates ID Copy of Applicant" },
  { key: "photo", label: "One Photo of Applicant" },
] as const;

export default function MobileFormScreen() {
  const params = useSearchParams();
  const service = params.get("service") || "AMER 24/7 Service";
  const hub = params.get("hub") || "AMER Services";
  const priceRaw = params.get("price");
  const insideRaw = params.get("inside");
  const outsideRaw = params.get("outside");
  const hasDualPrice = !!insideRaw && !!outsideRaw;

  const formType = formTypeForHub(hub);
  const meta = FORM_META[formType];
  const HubIcon = HUB_ICONS[hub] ?? Building2;

  const showSponsor = formType === "A";
  const showPriority = formType === "A" || formType === "D";
  const showLocation = formType === "A";
  const showEmirates = formType === "B";
  const showAddressComment = formType !== "C";
  const showSingleUpload = formType !== "C";
  const showGoldenUploads = formType === "C";

  const [applicant, setApplicant] = useState("");
  const [sponsor, setSponsor] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [priority, setPriority] = useState<"Normal" | "Urgent">("Normal");
  const [loc, setLoc] = useState<"inside" | "outside">("inside");
  const [emirate, setEmirate] = useState("Dubai");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [goldenDocs, setGoldenDocs] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const refNum = useRef(genRef());

  const priceLabel = useMemo(() => {
    if (hasDualPrice) return loc === "outside" ? outsideRaw : insideRaw;
    return priceRaw;
  }, [hasDualPrice, loc, insideRaw, outsideRaw, priceRaw]);

  const canSubmit =
    applicant.trim().length > 1 &&
    (!showSponsor || sponsor.trim().length > 1) &&
    email.trim().length > 3 &&
    phone.replace(/\D/g, "").length >= 7 &&
    (!showAddressComment || address.trim().length > 1) &&
    (showGoldenUploads
      ? GOLDEN_UPLOADS.every((u) => goldenDocs[u.key])
      : !showSingleUpload || uploaded);

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
          <span className={styles.svcIco}><HubIcon size={20} /></span>
          <div className={styles.svcBody}>
            <div className={styles.svcK}>{hub}</div>
            <div className={styles.svcName}>{service}</div>
            <div className={styles.svcFee}>
              {priceLabel ? (
                <span>
                  Government + service fee · <b>{priceLabel}</b>
                  {hasDualPrice ? ` (${loc} UAE)` : ""}
                </span>
              ) : (
                <span>Fee quoted after review</span>
              )}
            </div>
          </div>
        </div>

        <h2 className={styles.formH}>{meta.title}</h2>
        <p className={styles.formDesc}>{meta.desc}</p>

        <div className={styles.field}>
          <label>Full Name of Applicant</label>
          <div className={styles.iw}>
            <User size={18} className={styles.lead} />
            <input className={styles.inputHasIcon} type="text" placeholder="As on passport" value={applicant} onChange={(e) => setApplicant(e.target.value)} required />
          </div>
        </div>

        {showSponsor && (
          <div className={styles.field}>
            <label>Full Name of Sponsor</label>
            <div className={styles.iw}>
              <Users size={18} className={styles.lead} />
              <input className={styles.inputHasIcon} type="text" placeholder="Sponsor's full name" value={sponsor} onChange={(e) => setSponsor(e.target.value)} required />
            </div>
          </div>
        )}

        <div className={styles.field}>
          <label>Email ID</label>
          <div className={styles.iw}>
            <Mail size={18} className={styles.lead} />
            <input className={styles.inputHasIcon} type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
        </div>

        <div className={styles.field}>
          <label>Mobile No. (with country code)</label>
          <div className={styles.phoneRow}>
            <span className={styles.phoneCode}>
              <img src="https://flagcdn.com/w40/ae.png" alt="" className={styles.flagIcon} />
              +971
            </span>
            <input className={styles.input} type="tel" inputMode="tel" placeholder="50 000 0000" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
        </div>

        {showPriority && (
          <div className={styles.field}>
            <label>Application Priority</label>
            <div className={styles.segmented}>
              <button type="button" className={`${styles.segment} ${priority === "Normal" ? styles.segmentOn : ""}`} onClick={() => setPriority("Normal")}>
                Normal
              </button>
              <button type="button" className={`${styles.segment} ${priority === "Urgent" ? styles.segmentOn : ""}`} onClick={() => setPriority("Urgent")}>
                Urgent
              </button>
            </div>
          </div>
        )}

        {showLocation && (
          <div className={styles.field}>
            <label>Inside or Outside UAE</label>
            <div className={styles.segmented}>
              <button type="button" className={`${styles.segment} ${loc === "inside" ? styles.segmentOn : ""}`} onClick={() => setLoc("inside")}>
                Inside UAE
              </button>
              <button type="button" className={`${styles.segment} ${loc === "outside" ? styles.segmentOn : ""}`} onClick={() => setLoc("outside")}>
                Outside UAE
              </button>
            </div>
          </div>
        )}

        {showEmirates && (
          <div className={styles.field}>
            <label>Emirates</label>
            <div className={styles.emRow}>
              {EMIRATES.map((em) => (
                <button
                  key={em}
                  type="button"
                  className={`${styles.emChip} ${emirate === em ? styles.emChipOn : ""}`}
                  onClick={() => setEmirate(em)}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>
        )}

        {showSingleUpload && (
          <div className={styles.field} style={{ marginBottom: showAddressComment ? undefined : 0 }}>
            <label>Upload Required Documents</label>
            <button type="button" className={`${styles.upload} ${uploaded ? styles.uploadOn : ""}`} onClick={() => setUploaded((v) => !v)}>
              <span className={styles.upIco}>{uploaded ? <Check size={20} /> : <Upload size={20} />}</span>
              <span className={styles.upTxt}>
                <b>Attach files</b>
                <span>{uploaded ? "Attached · tap to remove" : "Required · tap to attach"}</span>
              </span>
              <span className={styles.upAct}>{uploaded ? "✓" : "+"}</span>
            </button>
          </div>
        )}

        {showAddressComment && (
          <>
            <div className={styles.field}>
              <label>Address</label>
              <div className={styles.iw}>
                <MapPin size={18} className={styles.lead} />
                <input className={styles.inputHasIcon} type="text" placeholder="Building, street, area, emirate" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>
            </div>
            <div className={styles.field} style={{ marginBottom: 0 }}>
              <label>Comment</label>
              <textarea className={styles.textarea} placeholder="Any specific requirements (optional)" value={comment} onChange={(e) => setComment(e.target.value)} rows={3} />
            </div>
          </>
        )}

        {showGoldenUploads && (
          <div className={styles.field} style={{ marginBottom: 0 }}>
            <span className={styles.uploadHead}>Upload required documents <span className={styles.req}>*</span></span>
            {GOLDEN_UPLOADS.map((u) => {
              const on = !!goldenDocs[u.key];
              return (
                <button
                  key={u.key}
                  type="button"
                  className={`${styles.upload} ${styles.uploadOneItem} ${on ? styles.uploadOn : ""}`}
                  onClick={() => setGoldenDocs((s) => ({ ...s, [u.key]: !s[u.key] }))}
                >
                  <span className={styles.upIco}>{on ? <Check size={20} /> : <Upload size={20} />}</span>
                  <span className={styles.upTxt}>
                    <b>{u.label}</b>
                    <span>{on ? "Attached · tap to remove" : "Required · tap to attach"}</span>
                  </span>
                  <span className={styles.upAct}>{on ? "✓" : "+"}</span>
                </button>
              );
            })}
          </div>
        )}

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
