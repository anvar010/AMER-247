import { Sparkles, Tag } from "lucide-react";
import styles from "../news/news.module.css";

const FEATURED_TITLE =
  "UAE Immigration Insights: Stay Informed with the Latest Blogs for Seamless Journey";
const FEATURED_DESC =
  "Stay connected to expert advice, success stories, and deep dives into UAE immigration.";

export const metadata = {
  title: "Blogs — Amer 24/7",
  description: "Stay informed with the latest blogs for a seamless journey.",
};

export default function BlogsPage() {
  return (
    <div className={styles.wrap}>
      {/* Mobile hero */}
      <section className={styles.hero}>
        <span className={styles.glowGold} aria-hidden />
        <span className={styles.glowWhite} aria-hidden />
        <div className={styles.heroInner}>
          <span className={styles.badge}>
            <Sparkles size={12} /> Featured
          </span>
          <h1 className={styles.title}>
            Discover Our Latest Blogs
          </h1>
        </div>
      </section>

      <section className={styles.body}>
        <div className={styles.featuredCard}>
          <span className={styles.featuredTag}>
            <Tag size={12} /> UAE Immigration Insights
          </span>
          <h2 className={styles.featuredTitle}>{FEATURED_TITLE}</h2>
          <p className={styles.featuredDesc}>{FEATURED_DESC}</p>
        </div>
      </section>

      {/* Desktop hero */}
      <section className={styles.desktopHero}>
        <div className={styles.heroLight}>
          <div className={styles.featuredLabel}>
            <span className={styles.featuredBar} aria-hidden />
            FEATURED
          </div>
          <div className={styles.featuredImageWrap}>
            <img src="/images/document_pickup_delivery.webp" alt="" className={styles.featuredImage} />
          </div>
          <p className={styles.imageCaption}>
            Discover Our Latest Blogs
          </p>
        </div>

        <div className={styles.heroDark}>
          <span className={styles.watermark} aria-hidden>BLOGS</span>

          <div className={styles.darkContent}>
            <span className={styles.categoryTag}>
              <span className={styles.letterU}>U</span>
              <span className={styles.letterA}>A</span>
              <span className={styles.letterE}>E</span>
              {" "}Immigration Insights:
            </span>
            <h1 className={styles.darkTitle}>{FEATURED_TITLE}</h1>
            <p className={styles.darkDesc}>{FEATURED_DESC}</p>
          </div>

          <div className={styles.scrollIndicator} aria-hidden>
            <span className={styles.scrollLine} />
            <span className={styles.scrollText}>SCROLL FOR MORE</span>
          </div>
        </div>
      </section>

      {/* ===================== Article grid ===================== */}
      <section className={`container ${styles.grid}`}>
        <div style={{ padding: "4rem 0", textAlign: "center", color: "#64748b", fontSize: "1.1rem", gridColumn: "1 / -1", fontWeight: "500" }}>
          No blogs available yet. Please check back later.
        </div>
      </section>
    </div>
  );
}
