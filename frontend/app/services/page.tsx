import Link from "next/link";
import {
  BookUser,
  IdCard,
  HeartPulse,
  ShieldPlus,
  GraduationCap,
  Receipt,
  PiggyBank,
  Stamp,
  TrendingUp,
  Scale,
  ArrowRight,
  Gauge,
  Landmark,
  Truck,
} from "lucide-react";
import styles from "./services.module.css";

const services = [
  {
    icon: BookUser,
    title: "AMER Services",
    body: "General directorate of residency and foreigners affairs) entry permit for (company employment & family) – inside & outside the country residencies (company employment & family) - new/renewal/cancellation family visit visa newborn baby visa processing sponsorship transfer company & family change status company & family visit visa extension for on arrival & gcc residents new/renewal of establishment card pro card",
    featured: true,
  },
  {
    icon: IdCard,
    title: "Emirates ID",
    body: "(Federal authority for identity & citizenship) all emirates identity card application for all categories – citizens, residents & companies emirates id for local emirates id for gcc emirates id new, renewal for 1 year emirates id new, renewal for 2 years emirates id new, renewal for 3 years emirates id replacement",
    featured: true,
  },
  {
    icon: HeartPulse,
    title: "Medical Fitness Application",
    body: "Dubai health authority occupational health card medical for companies & families (normal – 48 hours – 24 hours – vip) we assist for health insurance",
    featured: true,
  },
  {
    icon: ShieldPlus,
    title: "Health Insurance Services",
    body: "Amer247 services provides many varieties of health insurance services which mandatory to apply and renew the employment or residence visa. This service is available during the day.",
    featured: true,
  },
  {
    icon: GraduationCap,
    title: "Ministry of Education",
    body: "Provides services ranging from issuing entry permits, issuing and renewals of a residency visa.",
  },
  {
    icon: Receipt,
    title: "VAT Services",
    body: "Provides services ranging from issuing entry permits, issuing and renewals of a residency visa.",
  },
  {
    icon: PiggyBank,
    title: "Pension Services",
    body: "Provides services ranging from issuing entry permits, issuing and renewals of a residency visa.",
  },
  {
    icon: Stamp,
    title: "Entry Permits",
    body: "Provides services ranging from issuing entry permits, issuing and renewals of a residency visa.",
  },
  {
    icon: TrendingUp,
    title: "Dubai Economy Services",
    body: "Provides services ranging from issuing entry permits, issuing and renewals of a residency visa.",
  },
  {
    icon: Scale,
    title: "Dubai Court",
    body: "Provides services ranging from issuing entry permits, issuing and renewals of a residency visa.",
  },
];

const features = [
  { icon: Gauge,    title: "Fast Processing",                  sub: "Quick, reliable and efficient" },
  { icon: Landmark, title: "Government Department Transactions", sub: "End-to-end support" },
  { icon: Truck,    title: "Dispatch Services Across Dubai",    sub: "Safe. Secure. On time." },
];

export const metadata = {
  title: "Services — Amer 24/7",
  description:
    "Amer247 offers a full range of corporate and individual government services across Dubai — fast, reliable, and 24/7.",
};

export default function ServicesPage() {
  return (
    <>
      {/* ================= Hero ================= */}
      <section className={styles.hero}>
        <div className={styles.heroBgWrap}>
          <img
            src="/images/musueam-night.jpg"
            alt=""
            className={styles.heroBgImg}
            aria-hidden="true"
          />
          <span className={styles.heroBgOverlay} aria-hidden="true" />
        </div>

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroLeft}>
            <h1 className={styles.heroTitle}>
              AMER 247&apos;s
              <br />
              Corporate Services
            </h1>
            <span className={styles.heroAccent} />
            <p className={styles.heroCopy}>
              Amer247 offers many services to small and medium businesses with
              the highest standards of quality and speed for transactions across
              government departments in Dubai. We also provide dispatch
              services for company and individual transactions all around
              Dubai.
            </p>
            <Link href="/price" className={styles.heroCta}>
              See Our Pricing <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className={styles.featureStripWrap}>
          <div className={styles.featureStrip}>
            {features.map(({ icon: Icon, title, sub }) => (
              <div key={title} className={styles.featureItem}>
                <span className={styles.featureIconWrap}>
                  <Icon size={22} strokeWidth={1.8} className={styles.featureIcon} />
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

      {/* ================= Services Grid ================= */}
      <section id="services" className={styles.section}>
        <span className={styles.sectionGrain} aria-hidden="true" />
        <div className={`container ${styles.sectionInner}`}>
          <header className={styles.sectionHead}>
            <div className={styles.headLeft}>
              <span className={styles.headEyebrow}>
                <span className={styles.headEyebrowDot} />
                Our Expertise
              </span>
              <h2 className={styles.sectionTitle}>
                What <em className={styles.titleEm}>We&nbsp;Do</em>
              </h2>
              <p className={styles.sub}>
                A complete suite of corporate and individual government services —
                handled end-to-end, around the clock.
              </p>
            </div>
            <div className={styles.headRight}>
              <span className={styles.countLabel}>Services</span>
              <span className={styles.countNum}>{String(services.length).padStart(2, "0")}</span>
            </div>
          </header>

          <div className={styles.grid}>
            {services.map(({ icon: Icon, title, body, featured }, i) => (
              <article
                key={`${title}-${i}`}
                className={`${styles.card} ${featured ? styles.cardFeatured : ""}`}
              >
                <span className={styles.cardIndex}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.cardIconWrap}>
                  <Icon size={26} strokeWidth={1.6} className={styles.cardIcon} />
                </span>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardBody}>{body}</p>
                <span className={styles.cardCta}>
                  <span className={styles.cardCtaText}>Learn more</span>
                  <span className={styles.cardCtaArrow}>
                    <ArrowRight size={14} />
                  </span>
                </span>
                <span className={styles.cardCorner} aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA Banner ================= */}
      <section className={styles.cta}>
        <div className={`container ${styles.ctaInner}`}>
          <div>
            <h3 className={styles.ctaTitle}>Need help with a specific service?</h3>
            <p className={styles.ctaCopy}>
              Our team is available 24/7 to guide you through any government
              transaction across Dubai.
            </p>
          </div>
          <div className={styles.ctaActions}>
            <Link href="/contact" className={styles.btnPrimary}>
              Get in Touch <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
