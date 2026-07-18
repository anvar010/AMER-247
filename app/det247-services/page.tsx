import {
  FileCheck2, Tag, Building2, TrendingUp, ShieldCheck, Globe, Landmark,
  ClipboardCheck, Archive, FileText, RefreshCw, Sparkles, Zap, Award, Clock,
  Mail, Phone, MapPin, ArrowRight,
} from "lucide-react";
import { DET_WHAT_WE_DO, DET_PRICING } from "@/lib/det247Content";
import Det247Form from "./Det247Form";
import styles from "./det247-services.module.css";

export const metadata = {
  title: "AMER247 - Immigration Services | Dubai Visa Applications/Renewal",
  description:
    "Amer247 is a Semi Government Organization operating 24 hrs, allowing residents to complete all Visa and Residency transactions. Apply Online!",
};

// One icon per DET_WHAT_WE_DO category, same order as lib/det247Content.ts —
// index-matched rather than keyed by heading text so a copy tweak there
// can't silently break the icon (there's no icon field on that data yet).
const WHAT_WE_DO_ICONS = [
  FileCheck2, Tag, Building2, TrendingUp, ShieldCheck, Globe, Landmark, ClipboardCheck, Archive,
];

const PRICING_ICONS = [FileText, RefreshCw, Sparkles];

const FEATURES = [
  { icon: Zap, title: "Fast Processing", sub: "Same-day service" },
  { icon: Award, title: "DET Licensed", sub: "Fully authorized center" },
  { icon: Clock, title: "One-Stop Setup", sub: "License to launch" },
];

export default function Det247ServicesPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true">
          <span className={styles.heroOrbA} />
          <span className={styles.heroOrbB} />
        </div>
        <div className={styles.heroAlign}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            DET 247 · AMER 24/7
          </span>
          <h1 className={styles.heroTitle}>Trade License &amp; Business Setup in Dubai</h1>
          <p className={styles.heroSub}>Straightforward Trade License &amp; Business Setup Solutions in Dubai</p>
          <p className={styles.heroCopy}>
            We simplify your Dubai trade license and business setup process so you can focus on
            growing your business — not dealing with paperwork. After successfully serving our
            clients through Amer247, Tasheel247, and Tawjeeh247, we are proud to introduce
            DET247 — a dedicated Department of Economy &amp; Tourism (DET) center designed to
            provide complete government business solutions under one roof. From trade license
            issuance and renewals to company formation and all related DET services, everything
            is managed efficiently, transparently, and professionally.
          </p>
          <a href="#contact-section" className={styles.heroCta}>
            Apply Now <ArrowRight size={16} />
          </a>
        </div>
        </div>

        <div className={styles.featureStripWrap}>
          <div className={styles.featureStrip}>
            {FEATURES.map(({ icon: Icon, title, sub }) => (
              <div key={title} className={styles.featureItem}>
                <span className={styles.featureIconWrap}>
                  <Icon size={20} strokeWidth={1.8} className={styles.featureIcon} />
                </span>
                <div>
                  <div className={styles.featureTitle}>{title}</div>
                  <div className={styles.featureSub}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionFirst}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className={styles.sectionEyebrow}>
              <span className={styles.sectionEyebrowLine} />
              DET 247 Services
            </span>
            <h2 className={styles.h2}>What We Do</h2>
          </div>
          <p className={styles.lead}>
            The <b>Department of Economy and Tourism (DET)</b> provides a wide range of services
            to support businesses, investors, and consumers in Dubai. These services ensure
            smooth business operations, regulatory compliance, and economic growth. Below is a
            detailed overview of the key services offered by the DET.
          </p>
          <div className={styles.cardGrid}>
            {DET_WHAT_WE_DO.map((s, i) => {
              const Icon = WHAT_WE_DO_ICONS[i] ?? FileCheck2;
              return (
                <div key={s.heading} className={styles.card}>
                  <span className={styles.cardIco}><Icon size={20} /></span>
                  <h3 className={styles.cardTitle}>{s.heading}</h3>
                  {s.intro && <p className={styles.cardIntro}>{s.intro}</p>}
                  <ul className={styles.cardList}>
                    {s.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className={styles.sectionEyebrow}>
              <span className={styles.sectionEyebrowLine} />
              Cost Overview
            </span>
            <h2 className={styles.h2}>Pricings</h2>
          </div>
          <p className={styles.lead}>
            Department of Economy and Tourism (DET) offers a variety of services to support
            businesses in Dubai, each with associated fees that can vary based on the nature of
            the service and the specifics of the business activity. Here&apos;s an overview of
            some common services and their estimated fees:
          </p>
          <div className={styles.cardGrid}>
            {DET_PRICING.map((s, i) => {
              const Icon = PRICING_ICONS[i] ?? FileText;
              return (
                <div key={s.heading} className={styles.card}>
                  <span className={styles.cardIco}><Icon size={20} /></span>
                  <h3 className={styles.cardTitle}>{s.heading}</h3>
                  {s.items.length > 0 && (
                    <ul className={styles.priceList}>
                      {s.items.map((it) => {
                        const [label, price] = it.split(/:(?=[^:]*$)/).map((x) => x.trim());
                        return (
                          <li key={it}>
                            <span>{label}</span>
                            {price && <b>{price}</b>}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  <p className={styles.cardNote}><b>Note:</b> {s.note}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact-section" className={styles.section}>
        <div className={`container ${styles.contactWrap}`}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionEyebrow}>
              <span className={styles.sectionEyebrowLine} />
              Get Started
            </span>
            <h2 className={styles.h2}>Apply Online</h2>
          </div>
          <p className={styles.lead}>Share your details and our team will contact you shortly.</p>
          <Det247Form />
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <div className={styles.footerAbout}>
            <span className={styles.footerLogo}>DET 247</span>
            <p className={styles.footerCopy}>
              Department of Economy and Tourism (DET) plays a vital role in regulating
              businesses, promoting investment, and ensuring sustainable economic growth in the
              emirate.
            </p>
          </div>
          <div className={styles.footerCols}>
            <div className={styles.footerCard}>
              <span className={styles.footerCardIco}><Mail size={18} /></span>
              <h4 className={styles.footerHeading}>Contact Info</h4>
              <p className={styles.footerLine}><Mail size={13} /> info@mettded.ae</p>
              <p className={styles.footerLine}><Phone size={13} /> +971 4 228 4998</p>
            </div>
            <div className={styles.footerCard}>
              <span className={styles.footerCardIco}><MapPin size={18} /></span>
              <h4 className={styles.footerHeading}>Address</h4>
              <p className={styles.footerLine}>6 17A St - Al Khabaisi - Deira - Dubai.</p>
            </div>
          </div>
        </div>
        <p className={styles.footerBottom}>
          © 2025 DET247
          <br />
          METT Businessmen Services L.L.C
        </p>
      </footer>
    </>
  );
}
