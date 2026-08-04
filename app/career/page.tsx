import PageHero from "@/components/PageHero/PageHero";
import CareerForm from "./CareerForm";
import styles from "./career.module.css";
import { OG_IMAGE } from "@/lib/ogImage";

export const metadata = {
  title: "Career- Amer 247 Our Performance-oriented Culture",
  openGraph: {
    title: "Career- Amer 247 Our Performance-oriented Culture",
    description:
      "We are hiring. At amer247 hiring, our performance-oriented culture and responsible approach are the foundations of our success.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: "/career",
  },
};

export default function CareerPage() {
  return (
    <>
      <PageHero eyebrow="Join Amer 24/7" title="Careers" />
      <div className={`container ${styles.body}`}>
        <div className={styles.left}>
          <h1 className={styles.leftTitle}>We are hiring</h1>
          <p className={styles.leftCopy}>
            At amer247 hiring, our performance-oriented culture and responsible approach are the
            foundations of our success. We recognize that our business depends on the creativity,
            dedication, and performance of our employees. We encourage employees to focus on
            achievement through collaboration and innovation.
          </p>
        </div>
        <CareerForm />
      </div>
    </>
  );
}
