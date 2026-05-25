import styles from "./online-services.module.css";
import CategoryTabs from "./CategoryTabs";

export const metadata = {
  title: "Online Services — Amer 24/7",
  description:
    "AMER 24/7's online services. Apply online for AMER services, Emirates ID, Golden Visa, Tas-heel services, medical tests, and insurance.",
};

export default function OnlineServicesPage() {
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

      {/* ===================== Category Tabs ===================== */}
      <CategoryTabs />
    </>
  );
}
