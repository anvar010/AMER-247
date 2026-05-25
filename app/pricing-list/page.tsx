import Link from "next/link";
import {
  Stamp,
  IdCard,
  Home,
  Stethoscope,
  ShieldPlus,
  Building2,
  ArrowRight,
} from "lucide-react";
import styles from "./pricing-list.module.css";

const pricingCards = [
  {
    icon: Stamp,
    title: "Immigration Services",
    body: "Apply for Entry Permit and Residence services for yourself and family members.",
    href: "/online-services",
  },
  {
    icon: IdCard,
    title: "Emirates ID Services Pricing",
    body: "Amer247 Allows residents to apply for new Emirates ID or renew or cancel. Check our Apply Online page to know more.",
    href: "/online-services",
  },
  {
    icon: Home,
    title: "Residence Pricing",
    body: "Obtaining, Renewal and Cancellation of UAE Residency Visa for self, wife or other family members.",
    href: "/online-services",
  },
  {
    icon: Stethoscope,
    title: "Medical Test Services Pricing",
    body: "Necessary in order to complete the visa procedure at General Directorate of Residency and Foreigners Affairs-Dubai.",
    href: "/online-services",
  },
  {
    icon: ShieldPlus,
    title: "Health Insurance Services Pricing",
    body: "Individuals and family Health Insurance Plan.",
    href: "/online-services",
  },
  {
    icon: Building2,
    title: "Establishment Pricing",
    body: "Establishment card issue, renewal and cancellation services.",
    href: "/online-services",
  },
];

export const metadata = {
  title: "Pricing — Amer 24/7",
  description:
    "AMER 24/7's services fees and payments. Browse pricing for immigration, Emirates ID, residence, medical, health insurance, and establishment services.",
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
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            AMER 247
          </span>
          <h1 className={styles.heroTitle}>
            AMER 247&apos;s
            <em className={styles.titleEm}> Services Fees</em>
            <br />
            &amp; Payments.
          </h1>
          <p className={styles.heroCopy}>
            We help our customers to keep updated with application fees and
            other charges required for the kind of applications they applied
            for. We also request to keep checking this page for regular updates
            or contact us for latest revisions of Amer services fees and
            charges.
          </p>
        </div>
      </section>

      {/* ===================== Cards ===================== */}
      <section className={styles.list}>
        <span className={styles.listGlow} aria-hidden="true" />
        <div className={`container ${styles.listInner}`}>
          <header className={styles.listHead}>
            <span className={styles.sectionEyebrow}>
              <span className={styles.eyebrowLine} />
              Who We Do
            </span>
            <h2 className={styles.sectionTitle}>
              Here are the services
              <em className={styles.titleEm}> we provide.</em>
            </h2>
          </header>

          <div className={styles.grid}>
            {pricingCards.map(({ icon: Icon, title, body, href }, i) => (
              <article
                key={title}
                className={styles.card}
                style={{ animationDelay: `${0.05 + i * 0.06}s` }}
              >
                <span className={styles.cardNum}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.cardIconWrap}>
                  <Icon size={26} strokeWidth={1.6} className={styles.cardIcon} />
                </span>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardBody}>{body}</p>
                <Link href={href} className={styles.cardCta}>
                  <span className={styles.cardCtaText}>Check Pricing</span>
                  <span className={styles.cardCtaArrow}>
                    <ArrowRight size={14} />
                  </span>
                </Link>
                <span className={styles.cardCorner} aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
