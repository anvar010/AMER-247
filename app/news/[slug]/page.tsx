import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { newsArticles } from "@/lib/newsData";
import styles from "./article.module.css";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return newsArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} — Amer 24/7`,
    description: article.content.slice(0, 155),
  };
}

export default async function NewsArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = newsArticles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div className={styles.wrap}>
      <div className={`container ${styles.inner}`}>
        <Link href="/news" className={styles.back}>
          <ArrowLeft size={15} /> Back to News
        </Link>

        <span className={styles.date}><Calendar size={13} /> {article.date}</span>
        <h1 className={styles.title}>{article.title}</h1>

        <div className={styles.content}>
          {article.content.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {related.length > 0 && (
          <div className={styles.related}>
            <h2 className={styles.relatedTitle}>More from News &amp; Blogs</h2>
            <div className={styles.relatedGrid}>
              {related.map((r) => (
                <Link key={r.slug} href={`/news/${r.slug}`} className={styles.relatedCard}>
                  {r.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
