"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Outfit } from "next/font/google";
import {
  X, ArrowRight, ArrowLeft, Check, Clock, Upload, Plus, Minus, Lock, Phone,
} from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import CountryCodeSelect from "@/components/CountryCodeSelect/CountryCodeSelect";
import { COUNTRY_CODES, type CountryCode } from "@/lib/countryCodes";
import { features as STEP_GUIDE } from "@/components/PickUpService/PickUpService";
import { IMPORTANT_NOTES } from "@/lib/importantNotes";
import styles from "./TouristVisaForm.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

function genRef() {
  return "AMR-" + Math.floor(40000 + Math.random() * 9999);
}

// Nationality dropdown for Step 1 — kept local to this form (not shared with
// Career/DET247's smaller "countries" list in app/contact/Selects.tsx) so
// expanding this list doesn't change theirs.
const NATIONALITIES = [
  "United Arab Emirates", "Saudi Arabia", "Qatar", "Bahrain", "Kuwait", "Oman",
  "United States", "United Kingdom", "India", "Pakistan", "Philippines", "Egypt",
  "Jordan", "Lebanon", "Turkey", "Germany", "France", "Italy", "Spain", "China",
  "Japan", "South Korea", "Australia", "Canada", "South Africa", "Nigeria",
  "Bangladesh", "Sri Lanka", "Nepal", "Indonesia", "Malaysia", "Singapore",
  "Kenya", "Sudan", "Tanzania", "Tunisia", "Mauritius", "Mauritania", "Albania",
  "Algeria", "Angola", "Argentina", "Armenia", "Austria", "Azerbaijan", "Belarus",
  "Belgium", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Brazil", "Bulgaria",
  "Cambodia", "Chile", "Colombia", "Croatia", "Cuba", "Cyprus", "Czech Republic (Czechia)",
  "Denmark", "Dominican Republic", "Ecuador", "Estonia", "Finland", "Georgia", "Greece",
  "Hungary", "Iceland", "Iran", "Iraq", "Ireland", "Jamaica", "Kazakhstan", "Laos",
  "Luxembourg", "Maldives", "Mexico", "Mongolia", "Morocco", "Myanmar",
  "Netherlands", "New Zealand", "Norway", "Peru", "Poland", "Portugal", "Romania",
  "Russia", "Serbia", "Slovakia", "Slovenia", "Sweden", "Switzerland", "Taiwan",
  "Thailand", "Trinidad and Tobago", "Ukraine", "Uruguay", "Uzbekistan", "Vietnam", "Zimbabwe",
];

// Mobile/WhatsApp country-code dropdown — same "keep local, don't touch the
// shared list" reasoning as NATIONALITIES above, since COUNTRY_CODES (lib/
// countryCodes.ts) is also used by ApplicationForm. Sudan/Tunisia/Algeria/
// Iraq/Morocco/Russia are already in COUNTRY_CODES, so they're excluded here
// to avoid duplicate entries in the dropdown.
const TOURIST_COUNTRY_CODES: CountryCode[] = [
  ...COUNTRY_CODES,
  { iso2: "za", name: "South Africa", dial: "+27" },
  { iso2: "ke", name: "Kenya", dial: "+254" },
  { iso2: "tz", name: "Tanzania", dial: "+255" },
  { iso2: "mu", name: "Mauritius", dial: "+230" },
  { iso2: "mr", name: "Mauritania", dial: "+222" },
  { iso2: "al", name: "Albania", dial: "+355" },
  { iso2: "ao", name: "Angola", dial: "+244" },
  { iso2: "ar", name: "Argentina", dial: "+54" },
  { iso2: "am", name: "Armenia", dial: "+374" },
  { iso2: "at", name: "Austria", dial: "+43" },
  { iso2: "az", name: "Azerbaijan", dial: "+994" },
  { iso2: "by", name: "Belarus", dial: "+375" },
  { iso2: "be", name: "Belgium", dial: "+32" },
  { iso2: "bt", name: "Bhutan", dial: "+975" },
  { iso2: "bo", name: "Bolivia", dial: "+591" },
  { iso2: "ba", name: "Bosnia and Herzegovina", dial: "+387" },
  { iso2: "br", name: "Brazil", dial: "+55" },
  { iso2: "bg", name: "Bulgaria", dial: "+359" },
  { iso2: "kh", name: "Cambodia", dial: "+855" },
  { iso2: "cl", name: "Chile", dial: "+56" },
  { iso2: "co", name: "Colombia", dial: "+57" },
  { iso2: "hr", name: "Croatia", dial: "+385" },
  { iso2: "cu", name: "Cuba", dial: "+53" },
  { iso2: "cy", name: "Cyprus", dial: "+357" },
  { iso2: "cz", name: "Czech Republic (Czechia)", dial: "+420" },
  { iso2: "dk", name: "Denmark", dial: "+45" },
  { iso2: "do", name: "Dominican Republic", dial: "+1" },
  { iso2: "ec", name: "Ecuador", dial: "+593" },
  { iso2: "ee", name: "Estonia", dial: "+372" },
  { iso2: "fi", name: "Finland", dial: "+358" },
  { iso2: "ge", name: "Georgia", dial: "+995" },
  { iso2: "gr", name: "Greece", dial: "+30" },
  { iso2: "hu", name: "Hungary", dial: "+36" },
  { iso2: "is", name: "Iceland", dial: "+354" },
  { iso2: "ir", name: "Iran", dial: "+98" },
  { iso2: "ie", name: "Ireland", dial: "+353" },
  { iso2: "jm", name: "Jamaica", dial: "+1" },
  { iso2: "kz", name: "Kazakhstan", dial: "+7" },
  { iso2: "la", name: "Laos", dial: "+856" },
  { iso2: "lu", name: "Luxembourg", dial: "+352" },
  { iso2: "mv", name: "Maldives", dial: "+960" },
  { iso2: "mx", name: "Mexico", dial: "+52" },
  { iso2: "mn", name: "Mongolia", dial: "+976" },
  { iso2: "mm", name: "Myanmar", dial: "+95" },
  { iso2: "nl", name: "Netherlands", dial: "+31" },
  { iso2: "nz", name: "New Zealand", dial: "+64" },
  { iso2: "no", name: "Norway", dial: "+47" },
  { iso2: "pe", name: "Peru", dial: "+51" },
  { iso2: "pl", name: "Poland", dial: "+48" },
  { iso2: "pt", name: "Portugal", dial: "+351" },
  { iso2: "ro", name: "Romania", dial: "+40" },
  { iso2: "rs", name: "Serbia", dial: "+381" },
  { iso2: "sk", name: "Slovakia", dial: "+421" },
  { iso2: "si", name: "Slovenia", dial: "+386" },
  { iso2: "se", name: "Sweden", dial: "+46" },
  { iso2: "ch", name: "Switzerland", dial: "+41" },
  { iso2: "tw", name: "Taiwan", dial: "+886" },
  { iso2: "th", name: "Thailand", dial: "+66" },
  { iso2: "tt", name: "Trinidad and Tobago", dial: "+1" },
  { iso2: "ua", name: "Ukraine", dial: "+380" },
  { iso2: "uy", name: "Uruguay", dial: "+598" },
  { iso2: "uz", name: "Uzbekistan", dial: "+998" },
  { iso2: "vn", name: "Vietnam", dial: "+84" },
  { iso2: "zw", name: "Zimbabwe", dial: "+263" },
];

function findTouristCountry(iso2: string): CountryCode {
  return TOURIST_COUNTRY_CODES.find((c) => c.iso2 === iso2) ?? TOURIST_COUNTRY_CODES[0];
}

// Same parsing as the fee calculators (PricingCalculator.tsx /
// MobileFeeCalculator.tsx) — strips everything but digits/decimal so a
// missing/non-numeric price correctly falls through to `null` instead of
// being sent to Mettpay as a bogus amount.
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

// Matches the "5MB max per file" label on the passport/photo uploaders —
// enforced here since the accept="" attribute only filters file *type* in
// the picker, not size.
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

function splitBySize(files: FileList | null): { ok: File[]; oversized: File[] } {
  const all = Array.from(files ?? []);
  return {
    ok: all.filter((f) => f.size <= MAX_UPLOAD_BYTES),
    oversized: all.filter((f) => f.size > MAX_UPLOAD_BYTES),
  };
}

// Static disclaimer text from every amer247.com/touristVisaForm/* page —
// shown as-is regardless of which nationality is selected.
const WHATSAPP_NOTICE =
  "Kindly verify with us on WhatsApp for the following nationalities before proceeding with an online visa application: Pakistan, Bangladesh, Uganda, Sudan, Nigeria, Lebanon, Libya, Mozambique, Ghana, Afghanistan, Ethiopia, and Cameroon.";
const HOTEL_TICKET_NOTICE =
  "Travelers are required to submit a copy of their HOTEL RESERVATION and TICKET COPY along with the application.";

// Left-column blurb (desktop) — same paragraph on every item, only the
// heading (the service name) changes.
const FEES_NOTICE =
  "We help our customers to keep updated with application fees and other charges required for the kind of applications they applied for. We also request to keep checking this page for regular updates or contact us for latest revisions of Amer services fees and charges.";

type Passenger = { name: string; dob: string };

// Real form is a 2-step flow (General Details -> Passenger Details, with a
// dynamic adults/children list) — structurally different from every other
// hub's form (no sponsor, no address, no single "Application Priority"),
// so it gets its own component instead of a 5th mode bolted onto
// ApplicationForm.
export default function TouristVisaForm({
  service = "Tourist Visa",
  price,
}: {
  service?: string;
  price?: string;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [attempted1, setAttempted1] = useState(false);
  const [attempted2, setAttempted2] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const refNum = useRef(genRef());
  // True once /api/apply has saved this submission — a retry click after a
  // failed payment-start (same mounted form, same refNum) must not call
  // /api/apply again, since that would insert a second row under the same
  // reference. Deliberately NOT "fixed" by upserting in lib/db.ts's save
  // functions themselves: reference IDs aren't unique across different
  // applicants (see their own comment), so upserting there could overwrite
  // a stranger's submission on a coincidental collision. Gating here avoids
  // that risk entirely instead of trading it for a different one.
  const appliedRef = useRef(false);

  // The site's global Lenis smooth-scroll never resets on navigation (it's
  // set up once for the app's whole lifetime), so arriving here already
  // scrolled far down a previous page - or submitting while scrolled near
  // the bottom of this form - left the viewport parked at that same scroll
  // position. Since the success screen is much shorter, that position
  // landed past it, in the global Footer. Runs on mount (form opening) and
  // again when `submitted` flips true (after submit). Goes through Lenis's
  // own scrollTo, not a raw window.scrollTo, so its internal scroll state
  // stays in sync instead of fighting back.
  useEffect(() => {
    const lenis = (window as any).lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [submitted]);

  // Step 1 — General Details
  const [applicant, setApplicant] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileCountry, setMobileCountry] = useState("ae");
  const [whatsapp, setWhatsapp] = useState("");
  const [whatsappCountry, setWhatsappCountry] = useState("ae");
  const [nationality, setNationality] = useState("");
  const [travelDate, setTravelDate] = useState("");

  // Step 2 — Passenger Details
  const [adults, setAdults] = useState<Passenger[]>([{ name: "", dob: "" }]);
  const [children, setChildren] = useState<Passenger[]>([]);
  const [passportFiles, setPassportFiles] = useState<File[]>([]);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [passportSizeError, setPassportSizeError] = useState("");
  const [photoSizeError, setPhotoSizeError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const passportInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const applicantValid = applicant.trim().length > 1;
  const emailValid = email.trim().length > 3;
  const mobileValid = mobile.replace(/\D/g, "").length >= 7;
  const whatsappValid = whatsapp.replace(/\D/g, "").length >= 7;
  const nationalityValid = !!nationality;

  const step1Valid = applicantValid && emailValid && mobileValid && whatsappValid && nationalityValid;

  const adultsValid = adults.every((a) => a.name.trim().length > 1 && a.dob);
  const childrenValid = children.every((c) => c.name.trim().length > 1 && c.dob);
  const passportValid = passportFiles.length > 0;
  const photoValid = photoFiles.length > 0;

  const step2Valid = adultsValid && childrenValid && passportValid && photoValid && agreed;

  const updateAdult = (i: number, field: keyof Passenger, value: string) =>
    setAdults((a) => a.map((p, idx) => (idx === i ? { ...p, [field]: value } : p)));
  const updateChild = (i: number, field: keyof Passenger, value: string) =>
    setChildren((c) => c.map((p, idx) => (idx === i ? { ...p, [field]: value } : p)));

  const goNext = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempted1(true);
    if (step1Valid) setStep(2);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAttempted2(true);
    if (!step2Valid || submitting) return;

    setSubmitting(true);
    setSubmitError("");

    // A priced item defers the notification emails until Mettpay confirms
    // payment (see `deferEmail` in /api/apply) instead of sending them right
    // away for an application that might never get paid for.
    const amount = parseAed(price);

    const fd = new FormData();
    fd.set("hub", "Tourist Visa");
    fd.set("service", service);
    fd.set("referenceID", refNum.current);
    fd.set("applicantName", applicant);
    fd.set("email", email);
    fd.set("mobileNo", `${findTouristCountry(mobileCountry)?.dial ?? ""} ${mobile}`);
    fd.set("whatsappNo", `${findTouristCountry(whatsappCountry)?.dial ?? ""} ${whatsapp}`);
    fd.set("nationality", nationality);
    if (travelDate) fd.set("travelDate", travelDate);
    const passengers = [
      ...adults.map((a, i) => `Adult ${i + 1}: ${a.name} (DOB ${a.dob})`),
      ...children.map((c, i) => `Child ${i + 1}: ${c.name} (DOB ${c.dob})`),
    ].join(" | ");
    fd.set("passengers", passengers);
    // Structured versions of the same data, for the DB row's adults/children
    // columns — `passengers` above stays flattened since that's what the
    // email HTML template expects, but the DB copy should keep adults/
    // children as real queryable arrays instead of a display string.
    fd.set("adults", JSON.stringify(adults));
    fd.set("children", JSON.stringify(children));
    if (amount) fd.set("deferEmail", "1");
    for (const f of passportFiles) fd.append("files", f, `Passport - ${f.name}`);
    for (const f of photoFiles) fd.append("files", f, `Photo - ${f.name}`);

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
            mobile: `${findTouristCountry(mobileCountry)?.dial ?? ""} ${mobile}`,
            amount: String(withVat(amount)),
            comments: service,
            referenceId: refNum.current,
            returnUrl: window.location.href,
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

  const err = (cond: boolean) => `${styles.input} ${cond ? styles.inputError : ""}`;

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
        {/* Desktop only — mobile keeps the eye-icon -> modal instead. */}
        <div className={styles.infoCol}>
          <section className={styles.infoBlock}>
            <h2 className={styles.infoTitle}>{service}</h2>
            <p className={styles.infoText}>{FEES_NOTICE}</p>
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
          <Link href="/uae-tourist-visa" className={styles.close} aria-label="Close">
            <X size={18} />
          </Link>
          <span className={styles.title}>New application</span>
          <span className={styles.tag}>Application</span>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.svcCard}>
          <div className={styles.svcBody}>
            <div className={styles.svcK}>Tourist Visa</div>
            <div className={styles.svcName}>{service}</div>
            <div className={styles.svcFee}>
              {price ? (
                <span>Government + service fee · <b>{price}</b> (Inc. of VAT)</span>
              ) : (
                <span>Fee quoted after review</span>
              )}
            </div>
          </div>
          <div className={styles.svcContactIcons}>
            <a href="https://wa.me/971547800500" className={styles.svcIconBtn} aria-label="Chat on WhatsApp">
              <WhatsAppIcon size={15} />
            </a>
            <a href="tel:+971527276699" className={styles.svcIconBtn} aria-label="Call us">
              <Phone size={15} />
            </a>
          </div>
        </div>

        <div className={styles.stepper}>
          <div className={styles.stepItem}>
            <span className={`${styles.stepDot} ${step >= 1 ? styles.stepDotOn : ""}`}>1</span>
            <span className={styles.stepLabel}>General Details</span>
          </div>
          <span className={styles.stepLine} />
          <div className={styles.stepItem}>
            <span className={`${styles.stepDot} ${step >= 2 ? styles.stepDotOn : ""}`}>2</span>
            <span className={styles.stepLabel}>Passenger Details</span>
          </div>
        </div>

        {step === 1 && (
          <form onSubmit={goNext} noValidate>
            <div className={styles.field}>
              <label htmlFor="tv-applicant">Full Name of Applicant <span className={styles.req}>*</span></label>
              <input id="tv-applicant" className={err(attempted1 && !applicantValid)} type="text" placeholder="As on passport" value={applicant} onChange={(e) => setApplicant(e.target.value)} />
              {attempted1 && !applicantValid && <span className={styles.fieldError}>Please enter the applicant&apos;s full name.</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="tv-email">Enter Valid Email <span className={styles.req}>*</span></label>
              <input id="tv-email" className={err(attempted1 && !emailValid)} type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              {attempted1 && !emailValid && <span className={styles.fieldError}>Please enter a valid email address.</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="tv-mobile">Enter Mobile No. <span className={styles.req}>*</span></label>
              <div className={styles.phoneRow}>
                <CountryCodeSelect value={mobileCountry} onChange={setMobileCountry} label="Mobile country code" countries={TOURIST_COUNTRY_CODES} />
                <input id="tv-mobile" className={err(attempted1 && !mobileValid)} type="tel" inputMode="tel" placeholder="50 000 0000" value={mobile} onChange={(e) => setMobile(e.target.value)} />
              </div>
              {attempted1 && !mobileValid && <span className={styles.fieldError}>Please enter a valid mobile number.</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="tv-whatsapp">WhatsApp No. <span className={styles.req}>*</span></label>
              <div className={styles.phoneRow}>
                <CountryCodeSelect value={whatsappCountry} onChange={setWhatsappCountry} label="WhatsApp country code" countries={TOURIST_COUNTRY_CODES} />
                <input id="tv-whatsapp" className={err(attempted1 && !whatsappValid)} type="tel" inputMode="tel" placeholder="50 000 0000" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
              </div>
              {attempted1 && !whatsappValid && <span className={styles.fieldError}>Please enter a valid WhatsApp number.</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="tv-nationality">Select Your Nationality <span className={styles.req}>*</span></label>
              <select id="tv-nationality" className={`${styles.select} ${attempted1 && !nationalityValid ? styles.inputError : ""}`} value={nationality} onChange={(e) => setNationality(e.target.value)}>
                <option value="" disabled>Select nationality…</option>
                {NATIONALITIES.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
              {attempted1 && !nationalityValid && <span className={styles.fieldError}>Please select a nationality.</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="tv-travel-date">Date of Travel</label>
              <input id="tv-travel-date" className={styles.input} type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} />
            </div>

            <div className={styles.notice}>{WHATSAPP_NOTICE}</div>
            <div className={styles.notice}>{HOTEL_TICKET_NOTICE}</div>
            <div className={styles.notice}>
              <strong>Note:</strong>
              <ul className={styles.noticeList}>
                {IMPORTANT_NOTES.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </div>

            <div className={styles.foot}>
              <button type="submit" className={styles.submitBtn}>
                Next <ArrowRight size={17} />
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={submit} noValidate>
            <div className={styles.passengerGroup}>
              <div className={styles.passengerGroupHead}>
                <label>Adults</label>
                <div className={styles.counter}>
                  <button type="button" onClick={() => setAdults((a) => a.slice(0, -1))} disabled={adults.length <= 1} aria-label="Remove adult">
                    <Minus size={14} />
                  </button>
                  <span>{adults.length}</span>
                  <button type="button" onClick={() => setAdults((a) => [...a, { name: "", dob: "" }])} aria-label="Add adult">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              {adults.map((a, i) => (
                <div key={i} className={styles.passengerCard}>
                  <div className={styles.field}>
                    <label htmlFor={`tv-adult-name-${i}`}>Full Name — Adult {i + 1} <span className={styles.req}>*</span></label>
                    <input id={`tv-adult-name-${i}`} className={err(attempted2 && a.name.trim().length <= 1)} type="text" placeholder="As on passport" value={a.name} onChange={(e) => updateAdult(i, "name", e.target.value)} />
                    {attempted2 && a.name.trim().length <= 1 && <span className={styles.fieldError}>Please enter this passenger&apos;s full name.</span>}
                  </div>
                  <div className={styles.field} style={{ marginBottom: 0 }}>
                    <label htmlFor={`tv-adult-dob-${i}`}>Date of Birth — Adult {i + 1} <span className={styles.req}>*</span></label>
                    <input id={`tv-adult-dob-${i}`} className={err(attempted2 && !a.dob)} type="date" value={a.dob} onChange={(e) => updateAdult(i, "dob", e.target.value)} />
                    {attempted2 && !a.dob && <span className={styles.fieldError}>Please enter this passenger&apos;s date of birth.</span>}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.passengerGroup}>
              <div className={styles.passengerGroupHead}>
                <label>Children</label>
                <div className={styles.counter}>
                  <button type="button" onClick={() => setChildren((c) => c.slice(0, -1))} disabled={children.length === 0} aria-label="Remove child">
                    <Minus size={14} />
                  </button>
                  <span>{children.length}</span>
                  <button type="button" onClick={() => setChildren((c) => [...c, { name: "", dob: "" }])} aria-label="Add child">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              {children.map((c, i) => (
                <div key={i} className={styles.passengerCard}>
                  <div className={styles.field}>
                    <label htmlFor={`tv-child-name-${i}`}>Full Name — Child {i + 1} <span className={styles.req}>*</span></label>
                    <input id={`tv-child-name-${i}`} className={err(attempted2 && c.name.trim().length <= 1)} type="text" placeholder="As on passport" value={c.name} onChange={(e) => updateChild(i, "name", e.target.value)} />
                    {attempted2 && c.name.trim().length <= 1 && <span className={styles.fieldError}>Please enter this passenger&apos;s full name.</span>}
                  </div>
                  <div className={styles.field} style={{ marginBottom: 0 }}>
                    <label htmlFor={`tv-child-dob-${i}`}>Date of Birth — Child {i + 1} <span className={styles.req}>*</span></label>
                    <input id={`tv-child-dob-${i}`} className={err(attempted2 && !c.dob)} type="date" value={c.dob} onChange={(e) => updateChild(i, "dob", e.target.value)} />
                    {attempted2 && !c.dob && <span className={styles.fieldError}>Please enter this passenger&apos;s date of birth.</span>}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.field}>
              <label htmlFor="tv-passport-upload">Passport Copies of All Passengers <span className={styles.req}>*</span></label>
              <input
                id="tv-passport-upload"
                ref={passportInputRef}
                type="file"
                multiple
                accept=".jpg,.jpeg"
                className={styles.fileInput}
                onChange={(e) => {
                  const { ok, oversized } = splitBySize(e.target.files);
                  setPassportFiles(ok);
                  setPassportSizeError(
                    oversized.length
                      ? `Skipped (over 5MB): ${oversized.map((f) => f.name).join(", ")}`
                      : ""
                  );
                }}
              />
              <button
                type="button"
                className={`${styles.upload} ${passportFiles.length ? styles.uploadOn : ""} ${attempted2 && !passportValid ? styles.uploadError : ""}`}
                onClick={() => {
                  if (passportFiles.length) {
                    setPassportFiles([]);
                    setPassportSizeError("");
                    if (passportInputRef.current) passportInputRef.current.value = "";
                  } else {
                    passportInputRef.current?.click();
                  }
                }}
              >
                <span className={styles.upIco}>{passportFiles.length ? <Check size={20} /> : <Upload size={20} />}</span>
                <span className={styles.upTxt}>
                  <b>{passportFiles.length ? `${passportFiles.length} file(s) attached` : "Attach passport copies"}</b>
                  <span>JPG/JPEG only, 5MB max per file</span>
                </span>
                <span className={styles.upAct}>{passportFiles.length ? "✓" : "+"}</span>
              </button>
              {attempted2 && !passportValid && <span className={styles.fieldError}>Please attach at least one passport copy.</span>}
              {passportSizeError && <span className={passportFiles.length ? styles.fieldNotice : styles.fieldError}>{passportSizeError}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="tv-photo-upload">Photos with White Background of All Passengers <span className={styles.req}>*</span></label>
              <input
                id="tv-photo-upload"
                ref={photoInputRef}
                type="file"
                multiple
                accept=".jpg,.jpeg"
                className={styles.fileInput}
                onChange={(e) => {
                  const { ok, oversized } = splitBySize(e.target.files);
                  setPhotoFiles(ok);
                  setPhotoSizeError(
                    oversized.length
                      ? `Skipped (over 5MB): ${oversized.map((f) => f.name).join(", ")}`
                      : ""
                  );
                }}
              />
              <button
                type="button"
                className={`${styles.upload} ${photoFiles.length ? styles.uploadOn : ""} ${attempted2 && !photoValid ? styles.uploadError : ""}`}
                onClick={() => {
                  if (photoFiles.length) {
                    setPhotoFiles([]);
                    setPhotoSizeError("");
                    if (photoInputRef.current) photoInputRef.current.value = "";
                  } else {
                    photoInputRef.current?.click();
                  }
                }}
              >
                <span className={styles.upIco}>{photoFiles.length ? <Check size={20} /> : <Upload size={20} />}</span>
                <span className={styles.upTxt}>
                  <b>{photoFiles.length ? `${photoFiles.length} file(s) attached` : "Attach passenger photos"}</b>
                  <span>JPG/JPEG only, 5MB max per file</span>
                </span>
                <span className={styles.upAct}>{photoFiles.length ? "✓" : "+"}</span>
              </button>
              {attempted2 && !photoValid && <span className={styles.fieldError}>Please attach at least one photo.</span>}
              {photoSizeError && <span className={photoFiles.length ? styles.fieldNotice : styles.fieldError}>{photoSizeError}</span>}
            </div>

            <label className={styles.terms}>
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
              <span>I agree to the Terms &amp; Conditions and confirm all passenger details are accurate.</span>
            </label>
            {attempted2 && !agreed && <span className={styles.fieldError}>Please accept the Terms &amp; Conditions to continue.</span>}
            {submitError && <span className={styles.fieldError}>{submitError}</span>}

            <div className={styles.encrypted}>
              <Lock size={13} /> Your data is encrypted &amp; processed under UAE data-protection law.
            </div>

            <img src="/payments-Photoroom.png" alt="Visa, Mastercard, Apple Pay, Samsung Pay" className={styles.paymentIcons} />

            <div className={styles.stepFoot}>
              <button type="button" className={styles.backBtn} onClick={() => setStep(1)}>
                <ArrowLeft size={16} /> Back
              </button>
              <button type="submit" className={styles.submitBtn} disabled={submitting}>
                {submitting ? "Submitting…" : "Submit application"} {!submitting && <ArrowRight size={17} />}
              </button>
            </div>
          </form>
        )}
      </div>
        </div>
      </div>
    </div>
  );
}
