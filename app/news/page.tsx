import Link from "next/link";
import { Sparkles, Tag, ArrowRight, Calendar } from "lucide-react";
import { newsArticles } from "@/lib/newsData";
import styles from "./news.module.css";
import { OG_IMAGE } from "@/lib/ogImage";

const FEATURED_TITLE =
  "UAE Immigration Insights: Stay Informed with the Latest News and Blogs for Seamless Journey";
const FEATURED_DESC =
  "Stay connected to expert advice, success stories, and breaking news that can make your journey smoother and more informed. Your path to a new chapter begins here!\"";

export const metadata = {
  title: "UAE Visa and Residency News Update - Amer 247",
  openGraph: {
    title: "UAE Visa and Residency News Update - Amer 247",
    description:
      "We are open 24 hrs all days. Our services are available online by clicking on. APPLY ONLINE. ADDRESS. 24 Seven Government Transaction Center LLC",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: "/news",
  },
};

export default function NewsPage() {
  return (
    <div className={styles.wrap}>
      {/* Mobile hero — orange gradient card, hidden on desktop */}
      <section className={styles.hero}>
        <span className={styles.glowGold} aria-hidden />
        <span className={styles.glowWhite} aria-hidden />
        <div className={styles.heroInner}>
          <span className={styles.badge}>
            <Sparkles size={12} /> Featured
          </span>
          <h1 className={styles.title}>
            Stay Informed with the Latest News and Blogs for Seamless Journey
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

      {/* Desktop hero — split editorial layout, hidden on mobile */}
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
            Stay Informed with the Latest News and Blogs for Seamless Journey
          </p>
        </div>

        <div className={styles.heroDark}>
          <span className={styles.watermark} aria-hidden>NEWS</span>

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
        {newsArticles.map((a) => (
          <Link key={a.slug} href={`/news/${a.slug}`} className={styles.card}>
            <span className={styles.cardDate}><Calendar size={13} /> {a.date}</span>
            <h3 className={styles.cardTitle}>{a.title}</h3>
            <p className={styles.cardExcerpt}>{a.content.slice(0, 150)}…</p>
            <span className={styles.cardRead}>Read more <ArrowRight size={14} /></span>
          </Link>
        ))}
      </section>
    </div>
  );
}
