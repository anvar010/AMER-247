"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Outfit } from "next/font/google";
import { Search, X, ChevronRight } from "lucide-react";
import { POPULAR_SEARCHES, searchMatches } from "./searchIndex";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/useBodyScrollLock";
import styles from "./MobileSearchOverlay.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

// Keep in sync with the .sheet transition duration in the CSS module —
// the sheet stays mounted this long after close() so the slide-down can play.
const CLOSE_MS = 260;

export default function MobileSearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const lockedRef = useRef(false);

  useEffect(() => {
    if (open) {
      setQ("");
      setMounted(true);
      if (!lockedRef.current) { lockBodyScroll(); lockedRef.current = true; }
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => { raf2 = requestAnimationFrame(() => setVisible(true)); });
      const focusT = setTimeout(() => inputRef.current?.focus(), 280);
      return () => { cancelAnimationFrame(raf1); cancelAnimationFrame(raf2); clearTimeout(focusT); };
    }
    setVisible(false);
    if (lockedRef.current) { unlockBodyScroll(); lockedRef.current = false; }
    const t = setTimeout(() => setMounted(false), CLOSE_MS);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => () => {
    if (lockedRef.current) { unlockBodyScroll(); lockedRef.current = false; }
  }, []);

  if (!mounted) return null;

  const goTo = (href: string) => {
    router.push(href);
    onClose();
  };

  const { results, isFallback } = q.trim().length < 2 ? { results: [], isFallback: false } : searchMatches(q);

  return (
    <div
      className={`${styles.backdrop} ${visible ? styles.backdropOn : ""}`}
      onClick={onClose}
    >
      <div
        className={`${styles.sheet} ${visible ? styles.sheetOn : ""} ${outfit.className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.handle} />

        <div className={styles.top}>
          <div className={styles.srchBar}>
            <Search size={18} className={styles.icon} />
            <input
              ref={inputRef}
              className={styles.srchInput}
              placeholder='Search "Golden Visa", "Emirates ID"…'
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            {q.length > 0 && (
              <button className={styles.clearBtn} onClick={() => setQ("")} aria-label="Clear search">
                <X size={16} />
              </button>
            )}
          </div>
          <button className={styles.srchCancel} onClick={onClose}>Cancel</button>
        </div>

        <div className={styles.scrollArea}>
          {q.trim().length < 2 ? (
            <div className={styles.suggestWrap}>
              <span className={styles.suggestHead}>Popular searches</span>
              <div className={styles.suggestGrid}>
                {POPULAR_SEARCHES.map((s) => (
                  <button key={s} className={styles.suggestChip} onClick={() => setQ(s)}>
                    <Search size={13} />
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.resultsWrap}>
              {isFallback && results.length > 0 && (
                <span className={styles.suggestHead}>Related results for &quot;{q.trim()}&quot;</span>
              )}
              {results.length === 0 ? (
                <p className={styles.srchEmpty}>No results for &quot;{q}&quot;</p>
              ) : (
                results.map((r) => (
                  <button key={r.href + r.label} className={styles.srchRow} onClick={() => goTo(r.href)}>
                    <span className={styles.srchBody}>
                      <span className={styles.srchItemName}>{r.label}</span>
                      <span className={styles.srchHubName}>{r.sub}</span>
                    </span>
                    <ChevronRight size={15} className={styles.srchChevron} />
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
