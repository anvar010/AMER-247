import Link from "next/link";
import { ChevronRight, LucideIcon } from "lucide-react";
import styles from "./MobileMenuRow.module.css";

export interface MobileMenuRowProps {
  icon: LucideIcon;
  iconBg?: "primary" | "gold";
  label: string;
  sub?: string;
  href: string;
  external?: boolean;
}

export default function MobileMenuRow({ icon: Icon, iconBg, label, sub, href, external }: MobileMenuRowProps) {
  return (
    <Link
      href={href}
      className={styles.row}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <span className={`${styles.icoWrap} ${iconBg ? styles[`icoWrap_${iconBg}`] : ""}`}>
        <Icon size={18} />
      </span>
      <span className={styles.body}>
        <span className={styles.label}>{label}</span>
        {sub ? <span className={styles.subText}>{sub}</span> : null}
      </span>
      <ChevronRight size={18} className={styles.chevron} />
    </Link>
  );
}
