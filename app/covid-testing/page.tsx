import { Phone, Smartphone, Building2, Home, ShieldCheck, HelpCircle, FileText } from "lucide-react";
import PageHero from "@/components/PageHero/PageHero";
import FaqAccordion from "@/components/FaqAccordion/FaqAccordion";
import { PCR_TERMS, PCR_FAQS } from "@/lib/legalContent";
import styles from "./covid-testing.module.css";

export const metadata = {
  title: "AMER247 - Immigration Services | Dubai Visa Applications/Renewal",
  description:
    "Amer247 is a Semi Government Organization operating 24 hrs, allowing residents to complete all Visa and Residency transactions. Apply Online!",
};

export default function CovidTestingPage() {
  return (
    <>
      <PageHero
        eyebrow="247 Medical Services"
        title="Need Negative Covid-19 Testing For Travel?"
        subtitle="All countries and airlines around the globe now require COVID-19 screening for travel as a prerequisite for boarding and entry. We've got you covered."
      />

      <div className={`container ${styles.body}`}>
        <section className={styles.introCard}>
          <span className={styles.introIco}><ShieldCheck size={22} /></span>
          <p className={styles.introText}>
            <b>247 Medical Services</b> is a subsidiary of <b>Amer247</b> and a leading and innovative
            medical facilitation company with a high-performance track record of experience and
            excellence in the healthcare assistance industry. Our main goal is providing hassle-free
            PCR testing through our esteemed partner labs. All our partnered labs are CAP accredited
            and audited by the Dubai Health Authority (DHA) in Dubai.
          </p>
          <div className={styles.introTags}>
            <a href="tel:+971585211601" className={styles.tag}>
              <Phone size={14} /> +971 58 521 1601
            </a>
            <span className={styles.tag}>
              <Smartphone size={14} /> Apple Pay accepted (Safari on iPhone)
            </span>
          </div>
        </section>

        <section className={styles.section}>
          <span className={styles.eyebrow}>Booking</span>
          <h2 className={styles.h2}>How It Works</h2>
          <div className={styles.workGrid}>
            <div className={styles.workCard}>
              <span className={styles.workIco}><Building2 size={20} /></span>
              <h3 className={styles.workTitle}>Hospital / Clinic Testing</h3>
              <p className={styles.workText}>
                No appointment is required. Just visit any of our testing locations to avail of
                the service. Once the sample is collected, the test result will be released by
                email as per the category booked (processed from the time of sample collection,
                not from the time of booking).
              </p>
            </div>
            <div className={styles.workCard}>
              <span className={styles.workIco}><Home size={20} /></span>
              <h3 className={styles.workTitle}>Home / Hotel Testing</h3>
              <p className={styles.workText}>
                After booking, our team will contact you and schedule an appointment at your
                convenience — service available 24 hours, all days. Once the sample is collected,
                the result is released by email as per the category booked.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <span className={styles.eyebrow}><HelpCircle size={13} /> Support</span>
          <h2 className={styles.h2}>PCR FAQ&apos;s</h2>
          <FaqAccordion faqs={PCR_FAQS} name="pcr-faq" />
        </section>

        <section className={styles.section}>
          <span className={styles.eyebrow}><FileText size={13} /> Legal</span>
          <h2 className={styles.h2}>PCR Terms &amp; Conditions</h2>
          <div className={styles.tcCard}>
            <ol className={styles.tcList}>
              {PCR_TERMS.map((t, i) => (
                <li key={i} className={styles.tcItem}>
                  <span className={styles.tcNum}>{i + 1}</span>
                  <span>{t.body}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </>
  );
}
