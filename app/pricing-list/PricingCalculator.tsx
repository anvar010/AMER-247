"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search, X, Check, ArrowRight, Calculator,
  Building2, IdCard, Gem, FileText, Stethoscope, ShieldPlus, Plane,
} from "lucide-react";
import { amerSubCategories, type PriceItem } from "@/app/online-services/AmerServicesData";
import { OTHER_HUBS } from "@/components/MobileSearchOverlay/catalog";
import { buildApplyHref } from "@/lib/applyLink";
import styles from "./pricing-list.module.css";

const findHub = (key: string) => OTHER_HUBS.find((h) => h.key === key)!.groups;

// Same hub/pricing data and "pick a service, see the live fee" logic as the
// Fee Calculator modals — embedded directly into the page instead of behind
// a popup trigger, since this page's whole purpose is checking a price.
// One responsive layout: stacked on mobile, 3-column (hubs | picker |
// result) on desktop.
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

export default function PricingCalculator() {
  const router = useRouter();
  const [hubIdx, setHubIdx] = useState(0);
  const [picked, setPicked] = useState<Picked | null>(null);
  const [loc, setLoc] = useState<"inside" | "outside">("inside");
  const [q, setQ] = useState("");

  const hub = HUBS[hubIdx];
  const hasLoc = !!picked && picked.item.inside != null && picked.item.outside != null;

  const allSvcs = useMemo(
    () => hub.groups.flatMap((g) => g.items.filter((it) => !it.disabled).map((it) => ({ it, group: g.label }))),
    [hub]
  );

  const { filtered, isFallback } = useMemo(() => {
    const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length === 0) return { filtered: allSvcs, isFallback: false };
    const scored = allSvcs
      .map((s) => {
        const hay = `${s.it.name} ${s.group}`.toLowerCase();
        return { s, matched: words.filter((w) => hay.includes(w)).length };
      })
      .filter((x) => x.matched > 0);
    scored.sort((a, b) => b.matched - a.matched);
    const exact = scored.filter((x) => x.matched === words.length);
    const pool = exact.length > 0 ? exact : scored;
    return { filtered: pool.map((x) => x.s), isFallback: exact.length === 0 && scored.length > 0 };
  }, [allSvcs, q]);

  // Group the flat filtered list back into its category sections so the
  // picker reads as "New Entry Permits" once with its items beneath it,
  // instead of repeating the group label on every single row.
  const groupedFiltered = useMemo(() => {
    const groups: { group: string; rows: typeof filtered }[] = [];
    for (const row of filtered) {
      const last = groups[groups.length - 1];
      if (last && last.group === row.group) last.rows.push(row);
      else groups.push({ group: row.group, rows: [row] });
    }
    return groups;
  }, [filtered]);

  const selectHub = (i: number) => {
    setHubIdx(i);
    setPicked(null);
    setLoc("inside");
    setQ("");
  };

  const pickItem = (it: PriceItem, group: string) => {
    setPicked({ item: it, group });
    setLoc("inside");
  };

  const priceStr: string | null = picked
    ? picked.item.single ?? (loc === "outside" ? (picked.item.outside ?? picked.item.inside ?? null) : (picked.item.inside ?? picked.item.outside ?? null))
    : null;
  const priceNum = parseAed(priceStr ?? undefined);

  const startApplication = () => {
    if (!picked) return;
    router.push(buildApplyHref(picked.item, hub.title));
  };

  return (
    <section id="fee-calculator" className={styles.calcSection}>
      <header className={styles.calcHead}>
        <span className={styles.sectionEyebrow}>
          <span className={styles.eyebrowLine} />
          Fee Calculator
        </span>
        <h2 className={styles.sectionTitle}>
          Choose a service to
          <em className={styles.titleEm}> see the fee.</em>
        </h2>
      </header>

      <div className={styles.calcGrid}>
        <div className={styles.hubCol}>
          {HUBS.map((h, i) => {
            const on = hubIdx === i;
            const Icon = h.icon;
            return (
              <button
                key={h.key}
                className={`${styles.hubBtn} ${on ? styles.hubBtnOn : ""}`}
                onClick={() => selectHub(i)}
              >
                <Icon size={19} />
                {h.title}
              </button>
            );
          })}
        </div>

        <div className={`${styles.resultCol} ${!picked ? styles.resultColEmpty : ""}`}>
          {picked ? (
            <>
              <p className={styles.resultSvc}>{picked.item.name}</p>

              {hasLoc && (
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
              )}

              {priceNum != null ? (
                <>
                  <p className={styles.resultPrice}>
                    {priceNum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" "}
                    <span className={styles.resultAed}>AED</span>
                  </p>
                  <p className={styles.resultNote}>Government + service fee · all-inclusive</p>
                </>
              ) : (
                <p className={styles.resultTbd}>{priceStr ?? "Fee quoted after review"}</p>
              )}

              <button className={styles.startBtn} onClick={startApplication}>
                Start Application <ArrowRight size={16} />
              </button>
            </>
          ) : (
            <div className={styles.resultEmpty}>
              <Calculator size={26} strokeWidth={1.5} />
              <p>Choose a service to see its fee.</p>
            </div>
          )}
        </div>

        <div className={styles.mainCol}>
          <div className={styles.searchBar}>
            <Search size={16} className={styles.searchIcon} />
            <input
              className={styles.searchInput}
              placeholder={`Search ${hub.title}…`}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            {q.length > 0 && (
              <button className={styles.clearBtn} onClick={() => setQ("")} aria-label="Clear">
                <X size={13} />
              </button>
            )}
          </div>

          <div className={styles.pickerList} data-lenis-prevent>
            {isFallback && filtered.length > 0 && (
              <span className={styles.suggestHead}>Related results for &quot;{q.trim()}&quot;</span>
            )}
            {filtered.length === 0 ? (
              <p className={styles.pickerEmpty}>No results for &quot;{q}&quot;</p>
            ) : (
              groupedFiltered.map(({ group, rows }, gi) => (
                <div className={styles.pickerGroupBlock} key={group + gi}>
                  <span className={styles.pickerGroupHead}>{group}</span>
                  <div className={styles.pickerGroupRows}>
                    {rows.map(({ it }, i) => {
                      const on = picked?.item === it;
                      return (
                        <button
                          key={group + it.name + i}
                          className={`${styles.pickerRow} ${on ? styles.pickerRowOn : ""}`}
                          onClick={() => pickItem(it, group)}
                        >
                          <span className={styles.pickerName}>{it.name}</span>
                          <span className={`${styles.pickerCheck} ${on ? styles.pickerCheckOn : ""}`}>
                            <Check size={13} />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
            <div className={styles.pickerFade} aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
