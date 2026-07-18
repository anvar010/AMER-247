"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ChevronRight } from "lucide-react";
import { POPULAR_SEARCHES, searchMatches } from "@/components/MobileSearchOverlay/searchIndex";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/useBodyScrollLock";
import styles from "./DesktopSearchOverlay.module.css";

// Desktop counterpart to MobileSearchOverlay — same search index/matching
// logic, presented as a centered dialog instead of a bottom sheet.
const CLOSE_MS = 200;

export default function DesktopSearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
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
      const focusT = setTimeout(() => inputRef.current?.focus(), 150);
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

  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted, onClose]);

  if (!mounted) return null;

  const goTo = (href: string) => {
    router.push(href);
    onClose();
  };

  const { results, isFallback } = q.trim().length < 2 ? { results: [], isFallback: false } : searchMatches(q);

  return (
    <div className={`${styles.backdrop} ${visible ? styles.backdropOn : ""}`} onClick={onClose}>
      <div
        className={`${styles.dialog} ${visible ? styles.dialogOn : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.top}>
          <Search size={20} className={styles.icon} />
          <input
            ref={inputRef}
            className={styles.input}
            placeholder='Search "Golden Visa", "Emirates ID"…'
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          {q.length > 0 && (
            <button className={styles.clearBtn} onClick={() => setQ("")} aria-label="Clear search">
              <X size={16} />
            </button>
          )}
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">Esc</button>
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
                <p className={styles.empty}>No results for &quot;{q}&quot;</p>
              ) : (
                results.map((r) => (
                  <button key={r.href + r.label} className={styles.row} onClick={() => goTo(r.href)}>
                    <span className={styles.rowBody}>
                      <span className={styles.rowName}>{r.label}</span>
                      <span className={styles.rowSub}>{r.sub}</span>
                    </span>
                    <ChevronRight size={16} className={styles.chevron} />
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
