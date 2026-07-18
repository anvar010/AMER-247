"use client";

import { ArrowRight } from "lucide-react";
import styles from "./pricing-list.module.css";

export default function ViewFeesButton() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const lenis = (window as any).lenis;
    if (lenis) {
      e.preventDefault();
      lenis.scrollTo("#fee-calculator", { duration: 1.4 });
    }
  };

  return (
    <a href="#fee-calculator" className={styles.heroCtaPrimary} onClick={handleClick}>
      View Service Fees <ArrowRight size={16} />
    </a>
  );
}
