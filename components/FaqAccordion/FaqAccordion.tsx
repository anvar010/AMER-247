import { ChevronDown } from "lucide-react";
import styles from "./FaqAccordion.module.css";

export type FaqItem = { question: string; answer: string };

export default function FaqAccordion({ faqs, name = "faq" }: { faqs: FaqItem[]; name?: string }) {
  return (
    <div className={styles.list}>
      {faqs.map((f, i) => (
        <details key={i} className={styles.item} name={name}>
          <summary className={styles.summary}>
            <span className={styles.q}>{f.question}</span>
            <ChevronDown size={18} className={styles.chev} />
          </summary>
          <p className={styles.answer}>{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
