"use client";

import { useEffect, useRef, useState } from "react";
import { X, FileCheck2 } from "lucide-react";
import { getRequiredDocuments, docLabel } from "@/lib/requiredDocuments";
import { features as STEP_GUIDE } from "@/components/PickUpService/PickUpService";
import { IMPORTANT_NOTES } from "@/lib/importantNotes";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/useBodyScrollLock";
import styles from "./RequiredDocumentsModal.module.css";

// Shared by every "eye icon" trigger — on hub service cards and on the
// application form's service summary card. Bottom sheet on mobile, centered
// dialog on desktop, both from one component (pure CSS breakpoint switch).
const CLOSE_MS = 220;

export default function RequiredDocumentsModal({
  open,
  onClose,
  serviceName,
  slug,
  hub,
}: {
  open: boolean;
  onClose: () => void;
  serviceName: string;
  // Looked up by slug when available — some services share a display name
  // (e.g. the two "Cancellation – Entry Permit (After Entry) – Company"
  // items) but always have distinct slugs. Falls back to serviceName.
  slug?: string;
  // Medical Test's specific tier/service name isn't shown here — same
  // override as the desktop side panel in ApplicationForm.tsx.
  hub?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const lockedRef = useRef(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      if (!lockedRef.current) { lockBodyScroll(); lockedRef.current = true; }
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => { raf2 = requestAnimationFrame(() => setVisible(true)); });
      return () => { cancelAnimationFrame(raf1); cancelAnimationFrame(raf2); };
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

  const documents = getRequiredDocuments(slug ?? serviceName);

  return (
    <div className={`${styles.backdrop} ${visible ? styles.backdropOn : ""}`} onClick={onClose}>
      <div
        className={`${styles.sheet} ${visible ? styles.sheetOn : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.handle} />
        <div className={styles.head}>
          <span className={styles.headIco}><FileCheck2 size={19} /></span>
          <div className={styles.headBody}>
            <h2 className={styles.title}>Required Documents</h2>
            <p className={styles.subtitle}>{hub === "Medical Test" ? "Medical test" : serviceName}</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <X size={17} />
          </button>
        </div>

        <div className={styles.scrollArea} data-lenis-prevent>
          <ul className={styles.list}>
            {documents.map((doc, i) => (
              <li key={i} className={styles.item}>
                <span className={styles.itemNum}>{i + 1}</span>
                {docLabel(doc)}
              </li>
            ))}
          </ul>

          <div className={styles.guideBlock}>
            <h3 className={styles.guideTitle}>Important Notes</h3>
            <ul className={styles.guideList}>
              {IMPORTANT_NOTES.map((note, i) => (
                <li key={i} className={styles.guideItem}>{note}</li>
              ))}
            </ul>
          </div>

          <div className={styles.guideBlock}>
            <h3 className={styles.guideTitle}>A Step by Step Guide to Application Process</h3>
            <ul className={styles.guideList}>
              {STEP_GUIDE.map((f, i) => (
                <li key={i} className={styles.guideItem}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
