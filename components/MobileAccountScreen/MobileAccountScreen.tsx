import Link from "next/link";
import { Outfit } from "next/font/google";
import {
  Wallet, User, IdCard, FileText, Bell, ShieldCheck, ChevronRight, MousePointerClick,
} from "lucide-react";
import styles from "./MobileAccountScreen.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

// Guest state only — this site has no account backend, so every row
// leads to sign-in, matching the app's own `if (!signedIn) onLogin()` logic.
const menu = [
  { icon: Wallet, label: "AMER Wallet", sub: "Credits & promotional bonuses", gold: true },
  { icon: User, label: "Personal information", sub: "Your profile & contact details" },
  { icon: IdCard, label: "Documents", sub: "Passport, Emirates ID & more" },
  { icon: FileText, label: "My applications", sub: "Track everything you've applied for" },
  { icon: Bell, label: "Notifications", sub: "Updates & alerts" },
];

export default function MobileAccountScreen() {
  return (
    <div className={`${styles.wrap} ${outfit.className}`}>
      <div className={styles.head}>
        <span className={styles.glowGold} aria-hidden />
        <span className={styles.glowWhite} aria-hidden />
        <div className={styles.avatarRing}>
          <div className={styles.avatar}>G</div>
        </div>
        <h2 className={styles.name}>Guest</h2>
        <Link href="/login" className={styles.badge}>
          <ShieldCheck size={13} /> Sign in to explore more <ChevronRight size={13} />
        </Link>
      </div>

      <div className={styles.menu}>
        {menu.map((m) => (
          <Link key={m.label} href="/login" className={styles.row}>
            <span className={`${styles.rowIco} ${m.gold ? styles.rowIcoGold : ""}`}>
              <m.icon size={18} />
            </span>
            <span className={styles.rowBody}>
              <span className={styles.rowLbl}>{m.label}</span>
              <span className={styles.rowSub}>{m.sub}</span>
            </span>
            <ChevronRight size={18} className={styles.rowChev} />
          </Link>
        ))}

        <Link href="/services" className={styles.primaryBtn}>
          <MousePointerClick size={17} /> Start application
        </Link>
        <Link href="/login" className={styles.ghostBtn}>
          Sign in or register
        </Link>

        <div className={styles.legalRow}>
          <span>Privacy Policy</span>
          <span className={styles.legalDot}>·</span>
          <span>Terms &amp; Conditions</span>
        </div>
      </div>
    </div>
  );
}
