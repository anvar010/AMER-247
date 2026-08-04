import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import styles from "./error.module.css";

export const metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function ErrorPage() {
  return (
    <div className={styles.wrap}>
      <span className={styles.icon}><AlertTriangle size={40} /></span>
      <h1 className={styles.title}>Still Got Queries?</h1>
      <p className={styles.copy}>Contact us on details below!</p>
      <Link href="/contact" className={styles.cta}>Contact Us <ArrowRight size={16} /></Link>
    </div>
  );
}
