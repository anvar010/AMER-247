import { FileText, IdCard, Gem, Stethoscope, ArrowRight, Sparkles } from "lucide-react";
import styles from "./WhoWeAre.module.css";

const cards = [
  { icon: FileText, title: "Immigration Services" },
  { icon: Gem, title: "Golden Visa" },
  { icon: IdCard, title: "Emirates Identity Authority" },
  { icon: Stethoscope, title: "Medical Test Applications" },
];

export default function WhoWeAre() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.left}>
          <div className={styles.eyebrow}>
            <Sparkles size={16} className={styles.eyebrowIcon} />
            <span>ABOUT AMER247</span>
          </div>
          <h2 className={styles.title}>Who We Are</h2>
          <span className={styles.titleAccent} />
          <p className={styles.copy}>
            Amer247 Center Was established in 2017 in collaboration with the
            General Directorate of Residency and Foreigners Affairs, and the
            experience was a direct application of the strategy of the Federal
            Government advocated by His Highness Sheikh Mohammed bin Rashid Al
            Maktoum, Prime Minister and Ruler of Dubai.
          </p>
        </div>

        <div className={styles.cards}>
          {cards.map((c) => (
            <FeatureCard key={c.title} icon={c.icon} title={c.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon, title,
}: { icon: any; title: string }) {
  return (
    <a href="#" className={styles.card}>
      <span className={styles.cardTopBar} />
      <span className={styles.cardIconWrap}>
        <Icon size={28} strokeWidth={1.6} className={styles.cardIcon} />
      </span>
      <h3 className={styles.cardTitle}>{title}</h3>
      <span className={styles.cardCta}>
        <span className={styles.cardCtaLabel}>View Service</span>
        <ArrowRight size={18} className={styles.cardArrow} />
      </span>
    </a>
  );
}
