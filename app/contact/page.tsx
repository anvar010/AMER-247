import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  Printer,
  ArrowRight,
  Plus,
  Stethoscope,
  Clock,
} from "lucide-react";
import styles from "./contact.module.css";
import { CountryCodeSelect, OptionSelect } from "./Selects";

const reasons = ["Visa", "Career", "Suggestion", "Complaint", "Other"];

const faqs: { q: string; a?: string }[] = [
  {
    q: "Are you open 24 hours?",
    a: "We are open 24 hours except on Fridays from 12-02.30 PM.",
  },
  {
    q: "Do we have services related to visas issued from Sharjah or other Emirates?",
    a: "Our primary services are for Dubai visas only.",
  },
  {
    q: "Labor cancelation is required for a family hold?",
    a: "No, the cancellation from Labor (MOHRE) is not mandatory to hold Family.",
  },
  {
    q: "Salary required to sponsor wife, children & parents?",
    a: "The salary required to sponsor Spouse and Children is AED 4,000. For parents, AED 10,000.",
  },
  {
    q: "Does the customer have to visit the same medical Centre or any DHA-approved medical Centres to complete the medical?",
    a: "Customers can visit any DHA-approved medical centre.",
  },
  {
    q: "Do you have services for Free zone and Domestic Worker visa?",
    a: "We have services only for Medical and Emirates ID applications for a Dubai Free zone / Domestic Worker visa.",
  },
  {
    q: "What are the different types of Tourist or visit visas available?",
    a: "A tourist visa is available for 30 and 60 days, and a sponsored family visit visa for 30 and 90 days.",
  },
  {
    q: "Is a visa stamping application required?",
    a: "Yes, it has to be applied for the residence visa to be issued. However, no more physical stamping of a visa into a passport is to be done.",
  },
  {
    q: "Can I hold my Dependents visa If the Job offered from other Emirates?",
    a: "No. The sponsor can hold dependents' visas while changing jobs within Dubai only.",
  },
  {
    q: "Are there any VIP/Express services for any application?",
    a: "No express services, except for the medical application.",
  },
  {
    q: "Should the applicants be inside the UAE to apply for a Golden Visa?",
    a: "Yes — the applicant MUST be inside the UAE.",
  },
  {
    q: "Can I travel without applying for the visa stamping application?",
    a: "No. The applicant must complete the visa stamping application before he/she can travel.",
  },
  {
    q: "Do I have to apply for the Emirates ID after getting a Golden Visa?",
    a: "Yes, you have to apply for the Golden Emirates ID application after the issuance of your Golden Visa.",
  },
  {
    q: "Do I have to apply for a family hold while applying for a Golden Visa?",
    a: "No — it is an automatic process from the GDRFA to hold the dependent's visa while applying for a Golden Visa.",
  },
];

const mapHref =
  "https://www.google.com/maps/search/?api=1&query=24+Seven+Government+Transaction+Center+LLC+Al+Khabaisi+Deira+Dubai";

export const metadata = {
  title: "Contact — Amer 24/7",
  description:
    "Get in touch with Amer 24/7. Visit our Deira branch, call us, or send a message — we are available 24/7 for your visa and residency transactions.",
};

export default function ContactPage() {
  return (
    <>
      {/* ===================== Hero ===================== */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true">
          <span className={styles.heroOrbA} />
          <span className={styles.heroOrbB} />
          <span className={styles.heroGrid} />
        </div>
        <div className={`container ${styles.heroInner}`}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            Get in Touch
          </span>
          <h1 className={styles.heroTitle}>
            Let&apos;s talk —
            <em className={styles.titleEm}> we&apos;re open 24/7.</em>
          </h1>
          <p className={styles.heroCopy}>
            Send us a message and our team will respond promptly. Or drop by
            our Deira center — we&apos;re ready when you are.
          </p>
        </div>
      </section>

      {/* ===================== Form + Info ===================== */}
      <section className={styles.body}>
        <div className={`container ${styles.bodyInner}`}>
          {/* -------- Left: Form -------- */}
          <div className={styles.formWrap}>
            <span className={styles.sectionEyebrow}>
              <span className={styles.eyebrowLine} />
              Send a Message
            </span>
            <h2 className={styles.sectionTitle}>
              Tell us how we can
              <em className={styles.titleEm}> help.</em>
            </h2>

            <form className={styles.form} action="#" method="post">
              <div className={styles.formGrid}>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Full name</span>
                  <input
                    className={styles.input}
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Email</span>
                  <input
                    className={styles.input}
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                  />
                </label>
                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Phone</span>
                  <div className={styles.phoneWrap}>
                    <CountryCodeSelect />
                    <input
                      className={`${styles.input} ${styles.phoneInput}`}
                      type="tel"
                      name="phone"
                      placeholder="50 000 0000"
                      inputMode="tel"
                      pattern="[0-9 ]*"
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Your Reason For Contact</span>
                  <OptionSelect
                    name="reason"
                    options={reasons}
                    placeholder="Select a reason…"
                    required
                  />
                </div>
              </div>

              <label className={`${styles.field} ${styles.fieldFull}`}>
                <span className={styles.fieldLabel}>Message</span>
                <textarea
                  className={styles.textarea}
                  name="message"
                  rows={6}
                  placeholder="Tell us a bit more…"
                  required
                />
              </label>

              <button type="submit" className={styles.submit}>
                Send Message <ArrowRight size={16} />
              </button>
            </form>
          </div>

          {/* -------- Right: Info -------- */}
          <aside className={styles.info}>
            <div className={styles.infoCard}>
              <span className={styles.infoEyebrow}>
                <span className={styles.eyebrowLine} />
                Address
              </span>
              <div className={styles.infoIconWrap}>
                <MapPin size={22} strokeWidth={1.7} className={styles.infoIcon} />
              </div>
              <p className={styles.infoText}>
                <strong>24 Seven Government Transaction Center LLC</strong>
                <br />
                17 A Street – Al Khabaisi (Behind Abu Baker Al Siddique Metro
                Station) – Deira – Dubai, UAE.
                <br />
                P.O.Box: 81143
              </p>
              <Link
                href={mapHref}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLink}
              >
                Follow Map <ArrowRight size={14} />
              </Link>
            </div>

            <div className={styles.infoCard}>
              <span className={styles.infoEyebrow}>
                <span className={styles.eyebrowLine} />
                Contact Info
              </span>
              <ul className={styles.infoList}>
                <li>
                  <span className={styles.infoTag}>
                    <Mail size={16} strokeWidth={1.8} />
                  </span>
                  <a href="mailto:info@amer247.com" className={styles.infoLink}>
                    info@amer247.com
                  </a>
                </li>
                <li>
                  <span className={styles.infoTag}>
                    <Phone size={16} strokeWidth={1.8} />
                  </span>
                  <a href="tel:+97142300500" className={styles.infoLink}>
                    +971 4 2300500
                  </a>
                </li>
                <li>
                  <span className={styles.infoTag}>
                    <Printer size={16} strokeWidth={1.8} />
                  </span>
                  <span className={styles.infoLink}>+971 4 2300510</span>
                </li>
              </ul>

              <div className={styles.pcrNote}>
                <span className={styles.pcrIcon}>
                  <Stethoscope size={16} strokeWidth={1.8} />
                </span>
                <p>
                  For PCR enquiries kindly send email to{" "}
                  <a
                    href="mailto:info@247medservices.com"
                    className={styles.pcrLink}
                  >
                    info@247medservices.com
                  </a>
                </p>
              </div>

              <div className={styles.hoursBadge}>
                <Clock size={16} strokeWidth={1.8} />
                <span>Open 24 / 7</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className={styles.faq}>
        <span className={styles.faqGlow} aria-hidden="true" />
        <div className={`container ${styles.faqInner}`}>
          <aside className={styles.faqAside}>
            <span className={styles.sectionEyebrow}>
              <span className={styles.eyebrowLine} />
              Help Center
            </span>
            <h2 className={styles.sectionTitle}>
              Frequently asked
              <em className={styles.titleEm}> questions.</em>
            </h2>
            <p className={styles.faqLead}>
              Quick answers to the things people ask us most. Don&apos;t see
              your question? Send us a message — we usually reply within the
              hour.
            </p>

            <div className={styles.faqContactCard}>
              <span className={styles.faqContactBadge}>
                <Clock size={14} strokeWidth={2} />
                Open 24 / 7
              </span>
              <h3 className={styles.faqContactTitle}>
                Still have questions?
              </h3>
              <p className={styles.faqContactCopy}>
                Our team is online around the clock to assist you.
              </p>
              <div className={styles.faqContactRow}>
                <a href="tel:+97142300500" className={styles.faqContactLink}>
                  <span className={styles.faqContactIcon}>
                    <Phone size={14} strokeWidth={2} />
                  </span>
                  +971 4 2300500
                </a>
                <a href="mailto:info@amer247.com" className={styles.faqContactLink}>
                  <span className={styles.faqContactIcon}>
                    <Mail size={14} strokeWidth={2} />
                  </span>
                  info@amer247.com
                </a>
              </div>
            </div>
          </aside>

          <ol className={styles.faqList}>
            {faqs.map(({ q, a }, i) => (
              <li
                key={q}
                className={styles.faqItem}
                style={{ animationDelay: `${0.05 + i * 0.03}s` }}
              >
                <details className={styles.faqDetails} name="faq">
                  <summary className={styles.faqSummary}>
                    <span className={styles.faqQTag} aria-hidden="true">
                      <span className={styles.faqQTagLetter}>Q</span>
                      <span className={styles.faqQTagNum}>{String(i + 1).padStart(2, "0")}</span>
                    </span>
                    <span className={styles.faqQ}>{q}</span>
                    <span className={styles.faqToggle} aria-hidden="true">
                      <span className={styles.faqToggleH} />
                      <span className={styles.faqToggleV} />
                    </span>
                  </summary>
                  <div className={styles.faqAnswer}>
                    {a ? (
                      <p>{a}</p>
                    ) : (
                      <p>
                        Our team will be happy to walk you through this in
                        detail — please call us at{" "}
                        <a href="tel:+97142300500" className={styles.faqLinkInline}>
                          +971 4 2300500
                        </a>{" "}
                        or email{" "}
                        <a href="mailto:info@amer247.com" className={styles.faqLinkInline}>
                          info@amer247.com
                        </a>{" "}
                        and we&apos;ll respond right away.
                      </p>
                    )}
                  </div>
                </details>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
