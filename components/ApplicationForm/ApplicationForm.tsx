"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Outfit } from "next/font/google";
import {
  X, User, Users, Mail, MapPin, Upload, Check, Lock, ArrowRight, Clock,
  Building2, IdCard, Gem, FileText, Stethoscope, ShieldPlus, Eye, Plus, Minus, type LucideIcon,
} from "lucide-react";
import RequiredDocumentsModal from "@/components/RequiredDocumentsModal/RequiredDocumentsModal";
import CountryCodeSelect from "@/components/CountryCodeSelect/CountryCodeSelect";
import { getRequiredDocuments, docLabel, isUploadableDoc } from "@/lib/requiredDocuments";
import { findCountry } from "@/lib/countryCodes";
import { features as STEP_GUIDE } from "@/components/PickUpService/PickUpService";
import { IMPORTANT_NOTES, PakistanNotice } from "@/lib/importantNotes";
import styles from "./ApplicationForm.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

// Prefix identifies the hub at a glance in reports/support conversations —
// Medical Test/Emirates ID/Golden Visa get their own; everything else
// (Amer Services, Insurance, Tas-Heel Services) keeps the original "AMR".
function genRef(hub: string) {
  const prefix =
    hub === "Medical Test" ? "MED" : hub === "Emirates ID" ? "EID" : hub === "Golden Visa" ? "GLD" : "AMR";
  // Widened from a ~10k range (40000-49999) — that narrow a range made
  // cross-customer reference collisions a real, observed problem (two
  // unrelated applications sharing an ID, one's payment overwriting the
  // other's record). 900k values makes that far less likely.
  return prefix + "-" + Math.floor(100000 + Math.random() * 900000);
}

// Same parsing as the fee calculators (PricingCalculator.tsx /
// MobileFeeCalculator.tsx) — strips everything but digits/decimal so
// non-numeric prices ("Cost Depends on Application") correctly fall through
// to `null` instead of being sent to Mettpay as a bogus amount.
function parseAed(v?: string | null): number | null {
  if (!v) return null;
  const n = parseFloat(v.replace(/[^\d.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
}

// 5% VAT, added only to the amount actually charged via Mettpay — the price
// shown on the form/summary card stays the pre-VAT figure everywhere else.
// *105 (not *1.05) keeps the multiplication on an integer to avoid an extra
// floating-point rounding step.
function withVat(amount: number): number {
  return Math.round(amount * 105) / 100;
}

// Matches the submission-files bucket's own 5MB limit (see lib/db.ts)
// — enforced here too since accept="" only filters file *type*, not size.
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

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

// Other emirates disabled for now - Emirates ID services only offered in
// Dubai currently. Uncomment to bring them back.
const EMIRATES = ["Dubai" /* , "Abu Dhabi", "Sharjah", "Ajman" */];

const GOLDEN_UPLOADS = [
  { key: "passport", label: "Passport of Applicant" },
  { key: "visa", label: "Visa Copy of Applicant" },
  { key: "eid", label: "Emirates ID Copy of Applicant" },
  { key: "photo", label: "One Photo of Applicant" },
] as const;

export default function ApplicationForm({
  service = "AMER 24/7 Service",
  slug,
  hub = "AMER Services",
  price,
  inside,
  outside,
  tiers,
}: {
  service?: string;
  slug?: string;
  hub?: string;
  price?: string;
  inside?: string;
  outside?: string;
  tiers?: { label: string; price: string }[];
}) {
  const priceRaw = price ?? null;
  const insideRaw = inside ?? null;
  const outsideRaw = outside ?? null;
  const hasDualPrice = !!insideRaw && !!outsideRaw;
  const hasTiers = !!tiers && tiers.length > 0;

  const formType = formTypeForHub(hub);
  const meta = FORM_META[formType];
  const HubIcon = HUB_ICONS[hub] ?? Building2;
  const documents = getRequiredDocuments(slug ?? service);
  // Notice-only entries (fees, eligibility conditions) still show in the
  // checklist above but get no upload row of their own — nothing to attach.
  const uploadableDocuments = documents.filter(isUploadableDoc);

  const showSponsor = formType === "A";
  const showPriority = formType === "A" || formType === "D";
  const showAppType = hasTiers;
  const showLocation = formType === "A";
  // Data Modification only has a single flat price (no inside/outside
  // split in lib/prices.ts) — it's an inside-UAE-only service, so the
  // field stays visible (so the applicant can see that's the case) but
  // only "Inside UAE" is selectable, not a real either/or toggle.
  const isInsideOnly = !!slug?.startsWith("data_modification");
  const showEmirates = formType === "B";
  const showAddressComment = formType !== "C";
  const showSingleUpload = formType !== "C";
  const showGoldenUploads = formType === "C";

  const [applicant, setApplicant] = useState("");
  const [sponsor, setSponsor] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCountry, setPhoneCountry] = useState("ae");
  const [priority, setPriority] = useState<"Normal" | "Urgent">("Normal");
  const [appType, setAppType] = useState(0);
  const [loc, setLoc] = useState<"inside" | "outside">("inside");
  const [emirate, setEmirate] = useState("Dubai");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  // Documents are revealed one at a time (docCount starts at 1, the first
  // required document) — each row gets its own file slot keyed by index,
  // instead of one generic multi-file input, so a submitted file is
  // traceable to the specific requirement it was meant to satisfy (see
  // the label embedded in the filename in `submit()` below).
  const [docCount, setDocCount] = useState(1);
  const [docFiles, setDocFiles] = useState<Record<number, File | null>>({});
  const [docSizeErrors, setDocSizeErrors] = useState<Record<number, string>>({});
  // Once every listed required document has been revealed, the "+" opens
  // exactly one extra, optional "Additional Documents" slot for supporting
  // files that aren't on the fixed checklist — then the "+" is gone for good.
  const [extraOpen, setExtraOpen] = useState(false);
  const [extraFile, setExtraFile] = useState<File | null>(null);
  const [extraSizeError, setExtraSizeError] = useState("");
  const [goldenFiles, setGoldenFiles] = useState<Record<string, File | null>>({});
  const [goldenSizeErrors, setGoldenSizeErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const refNum = useRef(genRef(hub));
  // True once /api/apply has saved this submission — a retry click after a
  // failed payment-start (same mounted form, same refNum) must not call
  // /api/apply again, since that would insert a second row under the same
  // reference. Deliberately NOT "fixed" by upserting in lib/db.ts's save
  // functions themselves: reference IDs aren't unique across different
  // applicants (see their own comment), so upserting there could overwrite
  // a stranger's submission on a coincidental collision. Gating here avoids
  // that risk entirely instead of trading it for a different one.
  const appliedRef = useRef(false);
  const docFileRefs = useRef<Record<number, HTMLInputElement | null>>({});
  const extraFileRef = useRef<HTMLInputElement>(null);

  // The site's global Lenis smooth-scroll never resets on navigation (it's
  // set up once for the app's whole lifetime), so arriving here already
  // scrolled far down a previous page - or submitting while scrolled near
  // the bottom of this (much taller) form - left the viewport parked at
  // that same scroll position. Since the success screen is much shorter,
  // that position landed past it, in the global Footer. Runs on mount
  // (form opening) and again when `submitted` flips true (after submit).
  // Goes through Lenis's own scrollTo, not a raw window.scrollTo, so its
  // internal scroll state stays in sync instead of fighting back.
  useEffect(() => {
    const lenis = (window as any).lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [submitted]);
  const goldenFileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const goldenDocs = Object.fromEntries(
    Object.entries(goldenFiles).map(([k, f]) => [k, !!f])
  );

  const handleDocUploadClick = (i: number) => {
    if (docFiles[i]) {
      setDocFiles((s) => ({ ...s, [i]: null }));
      setDocSizeErrors((s) => ({ ...s, [i]: "" }));
      const el = docFileRefs.current[i];
      if (el) el.value = "";
    } else {
      docFileRefs.current[i]?.click();
    }
  };

  const handleExtraUploadClick = () => {
    if (extraFile) {
      setExtraFile(null);
      setExtraSizeError("");
      if (extraFileRef.current) extraFileRef.current.value = "";
    } else {
      extraFileRef.current?.click();
    }
  };

  // "+" reveals one more required-document slot while any remain, then a
  // single extra optional "Additional Documents" slot after the checklist
  // is exhausted — and that's the last "+" there is, by design.
  const addSlot = () => {
    if (docCount < uploadableDocuments.length) setDocCount((c) => c + 1);
    else if (!extraOpen) setExtraOpen(true);
  };

  // "-" removes whichever slot is currently last: the extra one if it's
  // open, otherwise the last required document (never below the first).
  const removeSlot = () => {
    if (extraOpen) {
      setExtraOpen(false);
      setExtraFile(null);
      setExtraSizeError("");
    } else if (docCount > 1) {
      const removedIndex = docCount - 1;
      setDocCount((c) => c - 1);
      setDocFiles((s) => {
        const copy = { ...s };
        delete copy[removedIndex];
        return copy;
      });
      setDocSizeErrors((s) => {
        const copy = { ...s };
        delete copy[removedIndex];
        return copy;
      });
    }
  };

  const handleGoldenUploadClick = (key: string) => {
    if (goldenFiles[key]) {
      setGoldenFiles((s) => ({ ...s, [key]: null }));
      setGoldenSizeErrors((s) => ({ ...s, [key]: "" }));
      const el = goldenFileRefs.current[key];
      if (el) el.value = "";
    } else {
      goldenFileRefs.current[key]?.click();
    }
  };

  const priceLabel = useMemo(() => {
    if (hasTiers) return tiers![appType]?.price ?? priceRaw;
    if (hasDualPrice) return loc === "outside" ? outsideRaw : insideRaw;
    return priceRaw;
  }, [hasTiers, tiers, appType, hasDualPrice, loc, insideRaw, outsideRaw, priceRaw]);

  const applicantValid = applicant.trim().length > 1;
  const sponsorValid = !showSponsor || sponsor.trim().length > 1;
  const emailValid = email.trim().length > 3;
  const phoneValid = phone.replace(/\D/g, "").length >= 7;
  const addressValid = !showAddressComment || address.trim().length > 1;
  const uploadValid = showGoldenUploads
    ? GOLDEN_UPLOADS.every((u) => goldenDocs[u.key])
    : !showSingleUpload || Array.from({ length: docCount }, (_, i) => !!docFiles[i]).every(Boolean);

  const canSubmit =
    applicantValid && sponsorValid && emailValid && phoneValid && addressValid && uploadValid;

  const err = (valid: boolean) => (attempted && !valid ? styles.inputError : "");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAttempted(true);
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setSubmitError("");

    // A priced item defers the notification emails until Mettpay confirms
    // payment (see `deferEmail` in /api/apply) instead of sending them right
    // away for an application that might never get paid for.
    // Employment Visa Cancellation (outside UAE) is a special case — the fee
    // still shows for reference, but the customer isn't charged immediately;
    // support contacts them with payment details separately instead.
    const skipPayment = slug === "employment_visa_cancellation" && loc === "outside";
    const amount = skipPayment ? null : parseAed(priceLabel);

    const fd = new FormData();
    fd.set("hub", hub);
    fd.set("service", service);
    fd.set("referenceID", refNum.current);
    fd.set("applicantName", applicant);
    if (showSponsor) fd.set("sponsorName", sponsor);
    fd.set("email", email);
    fd.set("mobileNo", `${findCountry(phoneCountry)?.dial ?? ""} ${phone}`);
    if (showPriority) fd.set("applicationPriority", priority);
    if (showAppType) fd.set("applicationType", tiers![appType]?.label ?? "");
    if (showLocation) fd.set("insideOrOutside", loc);
    if (showEmirates) fd.set("emirates", emirate);
    if (showAddressComment) {
      fd.set("address", address);
      fd.set("comment", comment);
    }
    if (amount) fd.set("deferEmail", "1");
    if (showGoldenUploads) {
      for (const u of GOLDEN_UPLOADS) {
        const f = goldenFiles[u.key];
        if (f) fd.append("files", f, `${u.label} - ${f.name}`);
      }
    } else {
      for (let i = 0; i < docCount; i++) {
        const f = docFiles[i];
        if (f) fd.append("files", f, `${uploadableDocuments[i]} - ${f.name}`);
      }
      if (extraFile) fd.append("files", extraFile, `Additional Documents - ${extraFile.name}`);
    }

    let applySucceeded = appliedRef.current;
    try {
      // Skipped on a retry (payment failed to start last time, same mounted
      // form) — the application is already saved under this refNum, so
      // resubmitting here would just insert a second row under the same
      // reference. Go straight to retrying the payment instead.
      if (!appliedRef.current) {
        const res = await fetch("/api/apply", { method: "POST", body: fd });
        if (!res.ok) throw new Error("Submit failed");
        applySucceeded = true;
        appliedRef.current = true;
      }

      // Application is saved either way at this point — payment is a
      // follow-on step, not a gate on the submission itself. A priced item
      // sends the applicant to Mettpay's hosted checkout; anything without
      // a real numeric price just shows the normal success screen directly
      // (emails for that case were already sent by /api/apply above, since
      // deferEmail was never set).
      if (amount) {
        const payRes = await fetch("/api/create-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: applicant,
            email,
            mobile: `${findCountry(phoneCountry)?.dial ?? ""} ${phone}`,
            amount: String(withVat(amount)),
            comments: service,
            referenceId: refNum.current,
            returnUrl: window.location.href,
            // Tells the server exactly which table this reference lives
            // in, so a coincidental reference collision with some other
            // application (a different form, a different table) can never
            // get its payment update misattributed to the wrong one.
            sourceTable: "online_services_applications",
          }),
        });
        const payJson = await payRes.json();
        if (!payRes.ok || !payJson.paymentUrl) {
          throw new Error(payJson.error || "Payment could not be started.");
        }
        window.location.href = payJson.paymentUrl;
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError(
        applySucceeded
          ? "Something went wrong starting the payment. Please try again later."
          : "Couldn't submit your application. Please check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
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
          {/* Track application hidden for now.
          <Link href="/login" className={styles.donePrimary}>Track application <ArrowRight size={17} /></Link>
          */}
          <Link href="/" className={styles.doneLight}>Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.wrap} ${outfit.className}`}>
      <div className={styles.gridLayout}>
        {/* Desktop only — mobile keeps the eye-icon → modal instead (see
            .svcEye's display:none at the desktop breakpoint). */}
        <div className={styles.infoCol}>
          <section className={styles.infoBlock}>
            <h2 className={styles.infoTitle}>Required Documents To Apply For {hub === "Medical Test" ? "Medical test" : service}</h2>
            <ul className={styles.infoList}>
              {documents.map((doc, i) => (
                <li key={i} className={styles.infoItem}>{docLabel(doc)}</li>
              ))}
            </ul>
          </section>

          <section className={styles.infoBlock}>
            <h2 className={styles.infoTitle}>Important Notes</h2>
            <ul className={styles.infoList}>
              {IMPORTANT_NOTES.map((note, i) => (
                <li key={i} className={styles.infoItem}>{note}</li>
              ))}
            </ul>
          </section>

          <section className={styles.infoBlock}>
            <h2 className={styles.infoTitle}>A Step by Step Guide to Application Process</h2>
            <ul className={styles.infoList}>
              {STEP_GUIDE.map((f, i) => (
                <li key={i} className={styles.infoItem}>{f}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className={styles.formCol}>
          <div className={styles.top}>
            <div className={styles.nav}>
              <Link href="/online-services" className={styles.close} aria-label="Close">
                <X size={18} />
              </Link>
              <span className={styles.title}>New application</span>
              <span className={styles.tag}>Application</span>
            </div>
          </div>

          <form className={styles.body} onSubmit={submit} noValidate>
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
          <button
            type="button"
            className={styles.svcEye}
            aria-label={`View required documents for ${service}`}
            onClick={() => setDocsOpen(true)}
          >
            <Eye size={15} />
          </button>
        </div>

        <p className={styles.notice}><PakistanNotice /></p>

        <h2 className={styles.formH}>{meta.title}</h2>
        <p className={styles.formDesc}>{meta.desc}</p>

        <div className={styles.field}>
          <label htmlFor="form-applicant">Full Name of Applicant <span className={styles.req}>*</span></label>
          <div className={styles.iw}>
            <User size={18} className={styles.lead} />
            <input id="form-applicant" className={`${styles.inputHasIcon} ${err(applicantValid)}`} type="text" placeholder="As on passport" value={applicant} onChange={(e) => setApplicant(e.target.value)} />
          </div>
          {attempted && !applicantValid && <span className={styles.fieldError}>Please enter the applicant&apos;s full name.</span>}
        </div>

        {showSponsor && (
          <div className={styles.field}>
            <label htmlFor="form-sponsor">Full Name of Sponsor <span className={styles.req}>*</span></label>
            <div className={styles.iw}>
              <Users size={18} className={styles.lead} />
              <input id="form-sponsor" className={`${styles.inputHasIcon} ${err(sponsorValid)}`} type="text" placeholder="Sponsor's full name" value={sponsor} onChange={(e) => setSponsor(e.target.value)} />
            </div>
            {attempted && !sponsorValid && <span className={styles.fieldError}>Please enter the sponsor&apos;s full name.</span>}
          </div>
        )}

        <div className={styles.field}>
          <label htmlFor="form-email">Email ID <span className={styles.req}>*</span></label>
          <div className={styles.iw}>
            <Mail size={18} className={styles.lead} />
            <input id="form-email" className={`${styles.inputHasIcon} ${err(emailValid)}`} type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {attempted && !emailValid && <span className={styles.fieldError}>Please enter a valid email address.</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="form-phone">Mobile No. (with country code) <span className={styles.req}>*</span></label>
          <div className={styles.phoneRow}>
            <CountryCodeSelect value={phoneCountry} onChange={setPhoneCountry} label="Mobile country code" />
            <input id="form-phone" className={`${styles.input} ${err(phoneValid)}`} type="tel" inputMode="tel" placeholder="50 000 0000" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          {attempted && !phoneValid && <span className={styles.fieldError}>Please enter a valid mobile number.</span>}
        </div>

        {showPriority && (
          <div className={styles.field}>
            <label id="form-priority-label">Application Priority</label>
            <div className={styles.segmented} role="group" aria-labelledby="form-priority-label">
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
            <label id="form-location-label">{isInsideOnly ? "Location" : "Inside or Outside UAE"}</label>
            <div className={styles.segmented} role="group" aria-labelledby="form-location-label">
              <button type="button" className={`${styles.segment} ${loc === "inside" ? styles.segmentOn : ""}`} onClick={() => setLoc("inside")}>
                Inside UAE
              </button>
              {!isInsideOnly && (
                <button type="button" className={`${styles.segment} ${loc === "outside" ? styles.segmentOn : ""}`} onClick={() => setLoc("outside")}>
                  Outside UAE
                </button>
              )}
            </div>
          </div>
        )}

        {showAppType && (
          <div className={styles.field}>
            <label id="form-apptype-label">Application Type</label>
            <div className={styles.segmented} role="group" aria-labelledby="form-apptype-label">
              {tiers!.map((t, i) => (
                <button
                  key={t.label}
                  type="button"
                  className={`${styles.segment} ${appType === i ? styles.segmentOn : ""}`}
                  onClick={() => setAppType(i)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {showEmirates && (
          <div className={styles.field}>
            <label id="form-emirates-label">Emirates</label>
            <div className={styles.emRow} role="group" aria-labelledby="form-emirates-label">
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
            <span className={styles.uploadHead}>Upload Required Documents <span className={styles.req}>*</span></span>
            {uploadableDocuments.slice(0, docCount).map((doc, i) => {
              const file = docFiles[i] ?? null;
              const on = !!file;
              // Controls only ever sit on the very last visible row overall —
              // once the extra slot is open, that's it, not this one, even
              // if this is the last required doc.
              const showCtrls = i === docCount - 1 && !extraOpen;
              return (
                <div key={i} className={styles.docItem}>
                  <input
                    ref={(el) => { docFileRefs.current[i] = el; }}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className={styles.fileInput}
                    onChange={(e) => {
                      const picked = e.target.files?.[0] ?? null;
                      if (picked && picked.size > MAX_UPLOAD_BYTES) {
                        setDocFiles((s) => ({ ...s, [i]: null }));
                        setDocSizeErrors((s) => ({ ...s, [i]: `"${picked.name}" is over 5MB — please choose a smaller file.` }));
                        return;
                      }
                      setDocFiles((s) => ({ ...s, [i]: picked }));
                      setDocSizeErrors((s) => ({ ...s, [i]: "" }));
                    }}
                  />
                  <div className={styles.docRow}>
                    <button
                      type="button"
                      className={`${styles.upload} ${styles.uploadOneItem} ${on ? styles.uploadOn : ""} ${attempted && !on ? styles.uploadError : ""}`}
                      onClick={() => handleDocUploadClick(i)}
                    >
                      <span className={styles.upIco}>{on ? <Check size={20} /> : <Upload size={20} />}</span>
                      <span className={styles.upTxt}>
                        <b>{doc}</b>
                        <span>{on ? `Attached: ${file!.name} · tap to remove` : "Required · tap to attach"} · Max per file size 5MB</span>
                      </span>
                      <span className={styles.upAct}>{on ? "✓" : "+"}</span>
                    </button>
                    {showCtrls && (
                      <div className={styles.docRowCtrls}>
                        {docCount > 1 && (
                          <button type="button" className={styles.docCtrlBtn} aria-label="Remove this document" onClick={removeSlot}>
                            <Minus size={16} />
                          </button>
                        )}
                        <button type="button" className={styles.docCtrlBtn} aria-label="Add another document" onClick={addSlot}>
                          <Plus size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                  {attempted && !on && <span className={styles.fieldError}>Required.</span>}
                  {docSizeErrors[i] && <span className={styles.fieldError}>{docSizeErrors[i]}</span>}
                </div>
              );
            })}

            {extraOpen && (
              <div className={styles.docItem}>
                <input
                  ref={extraFileRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className={styles.fileInput}
                  onChange={(e) => {
                    const picked = e.target.files?.[0] ?? null;
                    if (picked && picked.size > MAX_UPLOAD_BYTES) {
                      setExtraFile(null);
                      setExtraSizeError(`"${picked.name}" is over 5MB — please choose a smaller file.`);
                      return;
                    }
                    setExtraFile(picked);
                    setExtraSizeError("");
                  }}
                />
                <div className={styles.docRow}>
                  <button
                    type="button"
                    className={`${styles.upload} ${styles.uploadOneItem} ${extraFile ? styles.uploadOn : ""}`}
                    onClick={handleExtraUploadClick}
                  >
                    <span className={styles.upIco}>{extraFile ? <Check size={20} /> : <Upload size={20} />}</span>
                    <span className={styles.upTxt}>
                      <b>Additional Documents</b>
                      <span>{extraFile ? `Attached: ${extraFile.name} · tap to remove` : "Optional · tap to attach"} · Max per file size 5MB</span>
                    </span>
                    <span className={styles.upAct}>{extraFile ? "✓" : "+"}</span>
                  </button>
                  <div className={styles.docRowCtrls}>
                    <button type="button" className={styles.docCtrlBtn} aria-label="Remove additional documents" onClick={removeSlot}>
                      <Minus size={16} />
                    </button>
                  </div>
                </div>
                {extraSizeError && <span className={styles.fieldError}>{extraSizeError}</span>}
              </div>
            )}
          </div>
        )}

        {showAddressComment && (
          <>
            <div className={styles.field}>
              <label htmlFor="form-address">Address <span className={styles.req}>*</span></label>
              <div className={styles.iw}>
                <MapPin size={18} className={styles.lead} />
                <input id="form-address" className={`${styles.inputHasIcon} ${err(addressValid)}`} type="text" placeholder="Building, street, area, emirate" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              {attempted && !addressValid && <span className={styles.fieldError}>Please enter an address.</span>}
            </div>
            <div className={styles.field} style={{ marginBottom: 0 }}>
              <label htmlFor="form-comment">Comment</label>
              <textarea id="form-comment" className={styles.textarea} placeholder="Any specific requirements (optional)" value={comment} onChange={(e) => setComment(e.target.value)} rows={3} />
            </div>
          </>
        )}

        {showGoldenUploads && (
          <div className={styles.field} style={{ marginBottom: 0 }}>
            <span className={styles.uploadHead}>Upload required documents <span className={styles.req}>*</span></span>
            {GOLDEN_UPLOADS.map((u) => {
              const file = goldenFiles[u.key];
              const on = !!file;
              return (
                <div key={u.key}>
                  <input
                    ref={(el) => { goldenFileRefs.current[u.key] = el; }}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className={styles.fileInput}
                    onChange={(e) => {
                      const picked = e.target.files?.[0] ?? null;
                      if (picked && picked.size > MAX_UPLOAD_BYTES) {
                        setGoldenFiles((s) => ({ ...s, [u.key]: null }));
                        setGoldenSizeErrors((s) => ({ ...s, [u.key]: `"${picked.name}" is over 5MB — please choose a smaller file.` }));
                        return;
                      }
                      setGoldenFiles((s) => ({ ...s, [u.key]: picked }));
                      setGoldenSizeErrors((s) => ({ ...s, [u.key]: "" }));
                    }}
                  />
                  <button
                    type="button"
                    className={`${styles.upload} ${styles.uploadOneItem} ${on ? styles.uploadOn : ""} ${attempted && !on ? styles.uploadError : ""}`}
                    onClick={() => handleGoldenUploadClick(u.key)}
                  >
                    <span className={styles.upIco}>{on ? <Check size={20} /> : <Upload size={20} />}</span>
                    <span className={styles.upTxt}>
                      <b>{u.label}</b>
                      <span>{on ? `Attached: ${file!.name} · tap to remove` : "Required · tap to attach"} · Max per file size 5MB</span>
                    </span>
                    <span className={styles.upAct}>{on ? "✓" : "+"}</span>
                  </button>
                  {attempted && !on && <span className={styles.fieldError}>Required.</span>}
                  {goldenSizeErrors[u.key] && <span className={styles.fieldError}>{goldenSizeErrors[u.key]}</span>}
                </div>
              );
            })}
          </div>
        )}

        <div className={styles.encrypted}>
          <Lock size={13} /> Your data is encrypted &amp; processed under UAE data-protection law.
        </div>

        <img src="/payments-Photoroom.png" alt="Visa, Mastercard, Apple Pay, Samsung Pay" className={styles.paymentIcons} />

        {submitError && <span className={styles.fieldError}>{submitError}</span>}

        <div className={styles.foot}>
          <button type="submit" className={styles.submitBtn} disabled={submitting}>
            {submitting ? "Submitting…" : "Submit application"} {!submitting && <ArrowRight size={17} />}
          </button>
        </div>
          </form>
        </div>
      </div>

      <RequiredDocumentsModal
        open={docsOpen}
        onClose={() => setDocsOpen(false)}
        serviceName={service}
        slug={slug}
        hub={hub}
      />
    </div>
  );
}
