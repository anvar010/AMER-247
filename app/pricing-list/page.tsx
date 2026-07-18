import Link from "next/link";
import {
  ShieldCheck, RefreshCw, Lock, Landmark, Users, Headphones, ArrowRight,
} from "lucide-react";
import styles from "./pricing-list.module.css";
import PricingCalculator from "./PricingCalculator";
import ViewFeesButton from "./ViewFeesButton";

const heroFeatures = [
  { icon: ShieldCheck, label: "Official Fees" },
  { icon: RefreshCw, label: "Updated Daily" },
  { icon: Lock, label: "Secure Payments" },
  { icon: Landmark, label: "Government Services" },
];

const heroStats = [
  { icon: Users, num: "150+", label: "Services" },
  { icon: ShieldCheck, num: "100%", label: "Official Pricing" },
  { icon: Headphones, num: "24/7", label: "Online Support" },
];

export const metadata = {
  title: "Pricing — Amer 24/7",
  description:
    "AMER 24/7's services fees and payments. Pick a service and see the exact fee — immigration, Emirates ID, Golden Visa, medical, insurance, and more.",
};

export default function PricingListPage() {
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
          <div className={styles.heroGridDesktop}>
            <div className={styles.heroLeft}>
              <span className={styles.eyebrow}>
                <span className={styles.eyebrowLine} />
                AMER 247
              </span>
              <h1 className={styles.heroTitle}>
                AMER 247&apos;s
                <em className={styles.titleEm}> Services Fees</em>
                <br />
                <span className={styles.titleAccent}>&amp; Payments.</span>
              </h1>
              <p className={styles.heroCopy}>
                We help our customers to keep updated with application fees and
                other charges required for the kind of applications they applied
                for. We also request to keep checking this page for regular updates
                or contact us for latest revisions of Amer services fees and
                charges.
              </p>

              <div className={styles.heroFeatureRow}>
                {heroFeatures.map(({ icon: Icon, label }) => (
                  <div key={label} className={styles.heroFeatureItem}>
                    <span className={styles.heroFeatureIcon}>
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                    <span className={styles.heroFeatureLabel}>{label}</span>
                  </div>
                ))}
              </div>

              <div className={styles.heroCtaRow}>
                <ViewFeesButton />
                <Link href="/online-services" className={styles.heroCtaSecondary}>
                  Apply Online <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className={styles.heroRight} aria-hidden="true">
              <div className={styles.heroImageWrap}>
                <img
                  src="/images/image copy.png"
                  alt=""
                  className={styles.heroImage}
                />
              </div>
              <div className={styles.heroStatCard}>
                {heroStats.map(({ icon: Icon, num, label }) => (
                  <div key={label} className={styles.heroStat}>
                    <span className={styles.heroStatIcon}>
                      <Icon size={18} strokeWidth={1.8} />
                    </span>
                    <div>
                      <div className={styles.heroStatNum}>{num}</div>
                      <div className={styles.heroStatLabel}>{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== Fee Calculator ===================== */}
      <PricingCalculator />
    </>
  );
}
