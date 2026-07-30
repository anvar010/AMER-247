"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MessageCircle, List, FileText, ChevronLeft, Star } from "lucide-react";
import { amerSubCategories } from "@/app/online-services/AmerServicesData";
import { getRequiredDocuments, docLabel } from "@/lib/requiredDocuments";
import styles from "./center.module.css";

type Screen = "home" | "services" | "documents";

export default function CenterCard() {
  const [screen, setScreen] = useState<Screen>("home");
  const [openDoc, setOpenDoc] = useState<string | null>(null);

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <header className={styles.head}>
          {screen !== "home" ? (
            <button className={styles.back} onClick={() => setScreen("home")} aria-label="Back">
              <ChevronLeft size={20} />
            </button>
          ) : (
            <span className={styles.headSpacer} />
          )}
          <h1 className={styles.headTitle}>Amer 247</h1>
          <span className={styles.headSpacer} />
        </header>

        {screen === "home" && (
          <main className={styles.home}>
            <a
              href="https://wa.me/971566803284?text=Hello, I would like to send my documents."
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.bigBtn} ${styles.btnGreen}`}
            >
              <MessageCircle size={20} />
              Send Documents via WhatsApp
            </a>

            <button className={`${styles.bigBtn} ${styles.btnBlue}`} onClick={() => setScreen("services")}>
              <List size={20} />
              View Services &amp; Prices
            </button>

            <button className={`${styles.bigBtn} ${styles.btnAmber}`} onClick={() => setScreen("documents")}>
              <FileText size={20} />
              Required Documents
            </button>

            <div className={styles.reviews}>
              <h3 className={styles.reviewsTitle}>Google Reviews</h3>
              <div className={styles.reviewsScore}>
                <span>4.8</span>
                <span className={styles.stars}>
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} fill="currentColor" />)}
                </span>
              </div>
              <p className={styles.reviewsSub}>Based on 8,316 reviews.</p>
              <a
                href="https://maps.app.goo.gl/UA3Wz2ksmmbTaHLS6?g_st=ipc"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.reviewsBtn}
              >
                Write a Review
              </a>
            </div>
          </main>
        )}

        {screen === "services" && (
          <main className={styles.list}>
            <h2 className={styles.listTitle}>Our Services</h2>
            {amerSubCategories.map((group) => (
              <div key={group.key} className={styles.group}>
                <h3 className={styles.groupHeading}>{group.label}</h3>
                {group.items.map((item, i) => (
                  <div key={`${item.slug ?? item.name}-${i}`} className={styles.svcRow}>
                    <span>{item.name}</span>
                    <b>{item.single ?? item.inside ?? item.outside ?? "—"}</b>
                  </div>
                ))}
              </div>
            ))}
          </main>
        )}

        {screen === "documents" && (
          <main className={styles.list}>
            <h2 className={styles.listTitle}>Required Documents</h2>
            {amerSubCategories.map((group) => (
              <div key={group.key} className={styles.group}>
                <h3 className={styles.groupHeading}>{group.label}</h3>
                {group.items.map((item, i) => {
                  const key = `${group.key}-${item.slug ?? item.name}-${i}`;
                  const isOpen = openDoc === key;
                  const docs = getRequiredDocuments(item.slug ?? item.name);
                  return (
                    <div key={key} className={styles.docCard}>
                      <button className={styles.docQ} onClick={() => setOpenDoc(isOpen ? null : key)}>
                        <span>{item.name}</span>
                        <span className={`${styles.docPlus} ${isOpen ? styles.docPlusOpen : ""}`}>+</span>
                      </button>
                      {isOpen && (
                        <ul className={styles.docList}>
                          {docs.map((d, i) => <li key={i}>{docLabel(d)}</li>)}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </main>
        )}

        <Link href="/" className={styles.exit}>
          <ArrowLeft size={14} /> Back to amer247.com
        </Link>
      </div>
    </div>
  );
}
