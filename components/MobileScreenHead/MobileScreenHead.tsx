import { Outfit } from "next/font/google";
import styles from "./MobileScreenHead.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["500", "700", "800"] });

export default function MobileScreenHead({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub: string;
}) {
  return (
    <div className={`${styles.head} ${outfit.className}`}>
      <span className={styles.glowGold} aria-hidden />
      <span className={styles.glowWhite} aria-hidden />
      <span className={styles.kicker}>{kicker}</span>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.sub}>{sub}</p>
    </div>
  );
}
