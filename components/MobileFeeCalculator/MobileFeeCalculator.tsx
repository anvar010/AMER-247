"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Outfit } from "next/font/google";
import {
  Calculator, X, ChevronDown, Search, Check, ArrowRight,
  Building2, IdCard, Gem, FileText, Stethoscope, ShieldPlus, Plane,
} from "lucide-react";
import { amerSubCategories, type PriceItem } from "@/app/online-services/AmerServicesData";
import { OTHER_HUBS } from "@/components/MobileSearchOverlay/catalog";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/useBodyScrollLock";
import { buildApplyHref } from "@/lib/applyLink";
import styles from "./MobileFeeCalculator.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

const findHub = (key: string) => OTHER_HUBS.find((h) => h.key === key)!.groups;

// Mirrors the real app's Fee Calculator hub row — every hub now has real
// itemized pricing data (Amer Services from AmerServicesData.ts, the rest
// transcribed from the real app's catalog into MobileSearchOverlay/catalog.ts).
const HUBS = [
  { key: "amer", title: "Amer Services", icon: Building2, groups: amerSubCategories },
  { key: "emirates-id", title: "Emirates ID", icon: IdCard, groups: findHub("emirates-id") },
  { key: "golden", title: "Golden Visa", icon: Gem, groups: findHub("golden") },
  { key: "tasheel", title: "Tas-Heel Services", icon: FileText, groups: findHub("tasheel") },
  { key: "medical", title: "Medical Test", icon: Stethoscope, groups: findHub("medical") },
  { key: "insurance", title: "Insurance", icon: ShieldPlus, groups: findHub("insurance") },
  { key: "tourist", title: "Tourist Visa", icon: Plane, groups: findHub("tourist") },
] as const;

type Picked = { item: PriceItem; group: string };

function parseAed(v?: string): number | null {
  if (!v) return null;
  const n = parseFloat(v.replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : null;
}

// Keep in sync with the .sheet transition duration in the CSS module —
// the sheet stays mounted this long after close() so the slide-down can play.
const CLOSE_MS = 260;

export default function MobileFeeCalculator({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [hubIdx, setHubIdx] = useState(0);
  const [picked, setPicked] = useState<Picked | null>(null);
  const [loc, setLoc] = useState<"inside" | "outside">("inside");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [q, setQ] = useState("");
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
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

  const hub = HUBS[hubIdx];
  const hasLoc = !!picked && picked.item.inside != null && picked.item.outside != null;

  const allSvcs = useMemo(
    () => hub.groups.flatMap((g) => g.items.filter((it) => !it.disabled).map((it) => ({ it, group: g.label }))),
    [hub]
  );

  const { filtered, isPickerFallback } = useMemo(() => {
    const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length === 0) return { filtered: allSvcs, isPickerFallback: false };
    const scored = allSvcs
      .map((s) => {
        const hay = `${s.it.name} ${s.group}`.toLowerCase();
        return { s, matched: words.filter((w) => hay.includes(w)).length };
      })
      .filter((x) => x.matched > 0);
    scored.sort((a, b) => b.matched - a.matched);
    const exact = scored.filter((x) => x.matched === words.length);
    const pool = exact.length > 0 ? exact : scored;
    return { filtered: pool.map((x) => x.s), isPickerFallback: exact.length === 0 && scored.length > 0 };
  }, [allSvcs, q]);

  if (!mounted) return null;

  const selectHub = (i: number) => {
    setHubIdx(i);
    setPicked(null);
    setLoc("inside");
  };

  const openPicker = () => {
    setQ("");
    setPickerOpen(true);
    setTimeout(() => searchRef.current?.focus(), 100);
  };
  const closePicker = () => { setPickerOpen(false); setQ(""); };
  const pickItem = (it: PriceItem, group: string) => {
    setPicked({ item: it, group });
    setLoc("inside");
    closePicker();
  };

  const priceStr: string | null = picked
    ? picked.item.single ?? (loc === "outside" ? (picked.item.outside ?? picked.item.inside ?? null) : (picked.item.inside ?? picked.item.outside ?? null))
    : null;
  const priceNum = parseAed(priceStr ?? undefined);

  const startApplication = () => {
    if (!picked) return;
    router.push(buildApplyHref(picked.item, picked.group));
    onClose();
  };

  return (
    <div className={`${styles.backdrop} ${visible ? styles.backdropOn : ""}`} onClick={onClose}>
      <div
        className={`${styles.sheet} ${visible ? styles.sheetOn : ""} ${outfit.className}`}
        onClick={(e) => e.stopPropagation()}
      >
      <div className={styles.handle} />
      <div className={styles.head}>
        <span className={styles.headIco}><Calculator size={20} /></span>
        <div className={styles.headBody}>
          <h2 className={styles.title}>Fee Calculator</h2>
          <p className={styles.subtitle}>Select a service to see the fee</p>
        </div>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close"><X size={17} /></button>
      </div>

      <div className={styles.body}>
        <span className={styles.stepLabel}>Service Category</span>
        <div className={styles.hubRow}>
          {HUBS.map((h, i) => {
            const on = hubIdx === i;
            const Icon = h.icon;
            return (
              <button
                key={h.key}
                className={`${styles.hubChip} ${on ? styles.hubChipOn : ""}`}
                onClick={() => selectHub(i)}
              >
                <Icon size={14} />
                {h.title}
              </button>
            );
          })}
        </div>

        <span className={styles.stepLabel}>Select Service</span>
            <button
              className={`${styles.dropdown} ${picked ? styles.dropdownFilled : ""}`}
              onClick={openPicker}
            >
              <span className={styles.dropdownTxt}>
                {picked ? picked.item.name : "Choose a service…"}
              </span>
              <ChevronDown size={18} />
            </button>

            {hasLoc && (
              <div className={styles.locWrap}>
                <span className={styles.stepLabel}>Location</span>
                <div className={styles.segmented}>
                  <button
                    className={`${styles.segment} ${loc === "inside" ? styles.segmentOn : ""}`}
                    onClick={() => setLoc("inside")}
                  >
                    Inside UAE
                  </button>
                  <button
                    className={`${styles.segment} ${loc === "outside" ? styles.segmentOn : ""}`}
                    onClick={() => setLoc("outside")}
                  >
                    Outside UAE
                  </button>
                </div>
              </div>
            )}

            {picked && (
              <div className={styles.result}>
                <p className={styles.resultSvc}>{picked.item.name}</p>
                {priceNum != null ? (
                  <>
                    <p className={styles.resultPrice}>{priceNum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className={styles.resultAed}>AED</span></p>
                    <p className={styles.resultNote}>Government + service fee · all-inclusive</p>
                  </>
                ) : (
                  <p className={styles.resultTbd}>{priceStr ?? "Fee quoted after review"}</p>
                )}
                <button className={styles.startBtn} onClick={startApplication}>
                  Start Application <ArrowRight size={16} />
                </button>
              </div>
            )}
      </div>

      {pickerOpen && (
        <div className={styles.pickerWrap}>
          <div className={styles.pickerHead}>
            <h3 className={styles.pickerTitle}>Select Service</h3>
            <button className={styles.closeBtn} onClick={closePicker} aria-label="Close"><X size={17} /></button>
          </div>

          <div className={styles.pickerSearchBar}>
            <Search size={16} className={styles.icon} />
            <input
              ref={searchRef}
              className={styles.pickerSearchInput}
              aria-label="Search services"
              placeholder="Search services…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            {q.length > 0 && (
              <button className={styles.clearBtn} onClick={() => setQ("")} aria-label="Clear"><X size={14} /></button>
            )}
          </div>

          <div className={styles.pickerList}>
            {isPickerFallback && filtered.length > 0 && (
              <span className={styles.suggestHead}>Related results for &quot;{q.trim()}&quot;</span>
            )}
            {filtered.length === 0 ? (
              <p className={styles.pickerEmpty}>No results for &quot;{q}&quot;</p>
            ) : (
              filtered.map(({ it, group }, i) => {
                const on = picked?.item === it;
                return (
                  <button
                    key={group + it.name + i}
                    className={`${styles.pickerRow} ${on ? styles.pickerRowOn : ""}`}
                    onClick={() => pickItem(it, group)}
                  >
                    <span className={styles.pickerBody}>
                      <span className={styles.pickerGroup}>{group}</span>
                      <span className={`${styles.pickerName} ${on ? styles.pickerNameOn : ""}`}>{it.name}</span>
                    </span>
                    {on && <span className={styles.pickerCheck}><Check size={13} /></span>}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
