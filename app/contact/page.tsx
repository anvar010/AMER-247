import Link from "next/link";
import { Outfit } from "next/font/google";
import {
  MapPin,
  Mail,
  Phone,
  Printer,
  ArrowRight,
  Plus,
  Stethoscope,
  Clock,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import styles from "./contact.module.css";
import mstyles from "@/components/MobileSupportScreen/MobileSupportScreen.module.css";
import MobileContactForm from "./MobileContactForm";
import DesktopContactForm from "./DesktopContactForm";
import { faqs } from "./faqs";
import MobileScreenHead from "@/components/MobileScreenHead/MobileScreenHead";
import MobileMenuRow from "@/components/MobileMenuRow/MobileMenuRow";
import MobileAppFooter from "@/components/MobileAppFooter/MobileAppFooter";

const outfit = Outfit({ subsets: ["latin"], weight: ["500", "600", "700"] });

const mobileContacts = [
  { icon: Phone, label: "Call us", sub: "+971 4 2300500", href: "tel:+97142300500" },
  { icon: MessageCircle, label: "WhatsApp", sub: "Chat with a consultant", href: "https://wa.me/97142300500" },
  { icon: Mail, label: "Email", sub: "info@amer247.com", href: "mailto:info@amer247.com" },
];

const mapHref =
  "https://www.google.com/maps/search/?api=1&query=24+Seven+Government+Transaction+Center+LLC+Al+Khabaisi+Deira+Dubai";

export const metadata = {
  title: "Amer Center Dubai | Amer247",
  openGraph: {
    title: "Amer Center Dubai | Amer247",
    description:
      "We are the only Amer Center in Dubai which opens 24 hrs all days. Our services are available online by clicking on. APPLY ONLINE.",
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Mobile-only — same data (contacts/reasons/faqs) as the desktop
          sections below (this file is the single source of truth for
          both), the app's own card design. Visibility is CSS-driven
          (mstyles.wrap: display:none above 768px). The FAQ accordion and
          reason picker use native <details> / radio inputs instead of
          React state, so this whole page can stay a server component and
          keep exporting `metadata`. */}
      <div className={`${mstyles.wrap} ${outfit.className}`}>
        <MobileScreenHead
          kicker="WE'RE HERE, ALWAYS"
          title="Support"
          sub="Trained happiness consultants, ready 24/7 — call, chat or visit us."
        />

        <div className={mstyles.menu}>
          {mobileContacts.map((c) => (
            <MobileMenuRow key={c.label} icon={c.icon} iconBg="primary" label={c.label} sub={c.sub} href={c.href} external />
          ))}
        </div>

        <div className={mstyles.secHead}>
          <h2 className={mstyles.h2}>Send a message</h2>
        </div>
        <MobileContactForm />

        <div className={mstyles.secHead}>
          <h2 className={mstyles.h2}>Good to know</h2>
        </div>
        <div className={mstyles.faqList}>
          {faqs.map((f) => (
            <details key={f.q} className={mstyles.faq}>
              <summary className={mstyles.faqQ}>
                <span className={mstyles.faqQTxt}>{f.q}</span>
                <ChevronDown size={17} className={mstyles.faqChevron} />
              </summary>
              <p className={mstyles.faqA}>{f.a}</p>
            </details>
          ))}
        </div>

        <div className={mstyles.secHead}>
          <h2 className={mstyles.h2}>Visit us · open 24/7</h2>
        </div>
        <MobileAppFooter />
      </div>

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

            <DesktopContactForm />
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
