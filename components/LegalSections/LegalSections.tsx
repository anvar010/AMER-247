import styles from "./LegalSections.module.css";

export type LegalSection = { title: string; body: string };

export default function LegalSections({
  updated,
  sections,
}: {
  updated?: string;
  sections: LegalSection[];
}) {
  return (
    <div className={styles.card}>
      {updated && <p className={styles.updated}>{updated}</p>}
      {sections.map((s, i) => (
        <div key={i} className={styles.section}>
          {s.title && <h2 className={styles.sectionTitle}>{s.title}</h2>}
          <p className={styles.sectionBody}>{s.body}</p>
        </div>
      ))}
    </div>
  );
}
