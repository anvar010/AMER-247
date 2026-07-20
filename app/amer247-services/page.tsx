import Link from "next/link";
import {
  BookUser, IdCard, HeartPulse, ShieldPlus, GraduationCap, Receipt,
  PiggyBank, Stamp, TrendingUp, Scale, ArrowRight, Layers,
  Gauge, Landmark, Truck, Rocket,
} from "lucide-react";
import styles from "./amer247-services.module.css";

const features = [
  { icon: Gauge, title: "Fast Processing", sub: "Quick, reliable and efficient services." },
  { icon: Landmark, title: "Department Transactions", sub: "End-to-end support for all government department services." },
  { icon: Truck, title: "Dispatch Services", sub: "Safe, secure and on-time delivery across Dubai." },
];

const PARTNER_LOGOS = [
  "/images/binladin.png",
  "/images/carrefour.png",
  "/images/HMS.png",
  "/images/Memzar.png",
  "/images/standard-chartered.png",
  "/images/thumbay.png",
];

export const metadata = {
  title: "AMER 247's Corporate Services — Amer 24/7",
  description:
    "Amer247 offers many services to small and medium businesses with the highest standards of quality and speed for any transactions of all Government departments in Dubai; we also provide dispatch services of companies and individuals transactions all around Dubai.",
};

// Real hub each service opens — left undefined for services that don't
// have a backing hub/pricing page yet (Ministry of Education, VAT,
// Pension, Dubai Court), so those render as informational cards only
// rather than linking somewhere fake.
const SERVICES = [
  {
    icon: BookUser,
    title: "AMER Services",
    body: "General directorate of residency and foreigners affairs) entry permit for (company employment & family) – inside & outside the country residencies (company employment & family) - new/renewal/cancellation family visit visa newborn baby visa processing sponsorship transfer company & family change status company & family visit visa extension for on arrival & gcc residents new/renewal of establishment card pro card",
  },
  {
    icon: IdCard,
    title: "Emirates ID",
    body: "(Federal authority for identity & citizenship) all emirates identity card application for all categories – citizens, residents & companies emirates id for local emirates id for gcc emirates id new, renewal for 1 year emirates id new, renewal for 2 years emirates id new, renewal for 3 years emirates id replacement",
  },
  {
    icon: HeartPulse,
    title: "Medical Fitness Application",
    body: "Dubai health authority occupational health card medical for companies & families (normal – 48 hours – 24 hours – vip) we assist for health insurance",
  },
  {
    icon: ShieldPlus,
    title: "Health Insurance Services",
    body: "Amer247 services provides many varieties of health insurance services which mandatory to apply and renew the employment or residence visa. This service is available during the day.",
  },
  {
    icon: GraduationCap,
    title: "Ministry of Education",
    body: "Provides services ranging from issuing entry permits, issuing and renewals of a residency visa,",
  },
  {
    icon: Receipt,
    title: "VAT Services",
    body: "Provides services ranging from issuing entry permits, issuing and renewals of a residency visa,",
  },
  {
    icon: PiggyBank,
    title: "Pension Services",
    body: "Provides services ranging from issuing entry permits, issuing and renewals of a residency visa,",
  },
  {
    icon: Stamp,
    title: "Entry Permits",
    body: "Provides services ranging from issuing entry permits, issuing and renewals of a residency visa,",
  },
  {
    icon: TrendingUp,
    title: "Dubai Economy Services",
    body: "Provides services ranging from issuing entry permits, issuing and renewals of a residency visa,",
  },
  {
    icon: Scale,
    title: "Dubai Court",
    body: "Provides services ranging from issuing entry permits, issuing and renewals of a residency visa,",
  },
] as const;

export default function Amer247ServicesPage() {
  return (
    <div className={styles.wrap}>
      {/* Hero */}
      <section className={styles.hero}>
        <span className={styles.glowGold} aria-hidden="true" />
        <span className={styles.glowWhite} aria-hidden="true" />

        <div className={styles.heroAlign}>
        <div className={styles.heroGrid}>
        <div className={styles.heroInner}>
          <div className={styles.heroTopRow}>
            <span className={styles.heroEyebrow}>
              <span className={styles.heroEyebrowLine} />
              Corporate Services
            </span>
            <span className={styles.heroMeta}>Dubai · United Arab Emirates</span>
          </div>

          <h1 className={styles.title}>
            Simplifying Business.
            <br />
            <span className={styles.titleAccent}>Empowering Growth.</span>
          </h1>
          <span className={styles.heroAccent} />
          <p className={styles.blurb}>
            Amer247 provides fast, reliable and end-to-end corporate services to businesses of
            all sizes with speed, accuracy and complete peace of mind.
          </p>
          <Link href="/pricing-list" className={styles.pricingBtn}>
            See Pricing <ArrowRight size={16} />
          </Link>
        </div>

        <div className={styles.heroVisual} aria-hidden="true">
          <span className={styles.heroVisualDots} />
          <span className={styles.heroVisualRing} />
          <div className={styles.heroVisualBlob}>
            <img
              src="/images/servicehero.webp"
              alt=""
              className={styles.heroVisualImg}
            />
          </div>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeIcon}>
              <Rocket size={18} strokeWidth={2} />
            </span>
            <span className={styles.heroBadgeText}>
              Fast. Reliable.
              <br />
              Always Ahead.
            </span>
          </div>
        </div>
        </div>
        </div>

        <div className={styles.featureStripWrap}>
          <div className={styles.featureStrip}>
            {features.map(({ icon: Icon, title, sub }) => (
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

      {/* Partner logos */}
      <section className={styles.partners}>
        <div className={styles.partnersInner}>
          <div className={styles.partnersTrack}>
            <div className={styles.partnersRow}>
              {PARTNER_LOGOS.map((src) => (
                <img key={src} src={src} alt="" />
              ))}
              {PARTNER_LOGOS.map((src) => (
                <img key={`${src}-dup`} src={src} alt="" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className={styles.body}>
        <span className={styles.sectionGrain} aria-hidden="true" />

        <header className={styles.sectionHead}>
          <div>
            <span className={styles.eyebrow}>
              <Layers size={12} /> What We Do
            </span>
            <h2 className={styles.sectionTitle}>Here are the services we provide</h2>
            <p className={styles.sectionSub}>
              A complete suite of corporate and individual government services — handled
              end-to-end, around the clock.
            </p>
          </div>
          <div className={styles.countBadge}>
            <span className={styles.countNum}>{String(SERVICES.length).padStart(2, "0")}</span>
            <span className={styles.countLabel}>Services</span>
          </div>
        </header>

        <div className={styles.grid}>
          {SERVICES.map((s) => {
            const Icon = s.icon;
            const isLong = s.body.length > 100;
            return (
              <div key={s.title} className={`${styles.card} ${isLong ? styles.cardSpan2 : ""}`}>
                <span className={styles.cardIco}>
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <p className={styles.cardBody}>{s.body}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
