import styles from "./PageHero.module.css";

export default function PageHero({
  eyebrow = "AMER 247",
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg} aria-hidden="true">
        <span className={styles.heroOrbA} />
        <span className={styles.heroOrbB} />
      </div>
      <div className={`container ${styles.heroInner}`}>
        <span className={styles.eyebrow}>
          <span className={styles.eyebrowLine} />
          {eyebrow}
        </span>
        <h1 className={styles.heroTitle}>{title}</h1>
        {subtitle && <p className={styles.heroCopy}>{subtitle}</p>}
      </div>
    </section>
  );
}
