"use client";
import { Search, FileSearch } from "lucide-react";
import styles from "./ServiceSearch.module.css";

export default function ServiceSearch() {
  const popular = ["Tourist Visa", "Emirates ID", "Residence Visa", "Visa Extension"];
  return (
    <section className={`container ${styles.section}`}>
      <div className={styles.bar}>
        <div className={styles.label}>
          <div className={styles.iconWrap}>
            <FileSearch size={22} />
          </div>
          <div>
            <div className={styles.title}>Find the service you need</div>
            <div className={styles.sub}>Search from 100+ services</div>
          </div>
        </div>

        <div className={styles.inputWrap}>
          <input
            type="text"
            placeholder="What service are you looking for?"
            className={styles.input}
          />
          <button className={styles.inputBtn} aria-label="Search">
            <Search size={18} />
          </button>
        </div>

        <div className={styles.popular}>
          <span className={styles.popularLabel}>Popular Searches:</span>
          <div className={styles.chips}>
            {popular.map((p) => (
              <button key={p} className={styles.chip}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
