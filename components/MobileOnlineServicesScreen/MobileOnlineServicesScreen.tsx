"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Outfit } from "next/font/google";
import {
  Search, X, Layers, Eye, Building2, IdCard, Gem, FileText, Stethoscope,
  ShieldPlus, Stamp, Users, HeartPulse, CalendarCheck, Printer, Globe,
  TrendingUp, Landmark, ShieldCheck, type LucideIcon,
} from "lucide-react";
import { amerSubCategories, type PriceItem } from "@/app/online-services/AmerServicesData";
import { OTHER_HUBS } from "@/components/MobileSearchOverlay/catalog";
import { buildApplyHref } from "@/lib/applyLink";
import RequiredDocumentsModal from "@/components/RequiredDocumentsModal/RequiredDocumentsModal";
import styles from "./MobileOnlineServicesScreen.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

const findHub = (key: string) => OTHER_HUBS.find((h) => h.key === key)!.groups;

// Mobile-native counterpart to the desktop Hero + CategoryTabs on this same
// /online-services URL — same 6 categories, same pricing data, but the
// app's own white icon-chip card design instead of the dark image cards.
const CATEGORIES = [
  { key: "amer", label: "AMER Services", icon: Building2, groups: amerSubCategories, gold: false },
  { key: "emirates-id", label: "Emirates ID", icon: IdCard, groups: findHub("emirates-id"), gold: false },
  { key: "golden", label: "Golden Visa", icon: Gem, groups: findHub("golden"), gold: true },
  { key: "tasheel", label: "Tas-Heel Services", icon: FileText, groups: findHub("tasheel"), gold: false },
  { key: "medical", label: "Medical Test", icon: Stethoscope, groups: findHub("medical"), gold: false },
  { key: "insurance", label: "Insurance", icon: ShieldPlus, groups: findHub("insurance"), gold: false },
] as const;

const GROUP_ICONS: Record<string, LucideIcon> = {
  Stamp, Users, HeartPulse, CalendarCheck, Printer, X, FileText, Globe,
  Building2, TrendingUp, Landmark, ShieldCheck, Gem, IdCard, ShieldPlus, Stethoscope,
};

function PriceBlock({ item }: { item: PriceItem }) {
  if (item.single) {
    return <span className={styles.priceSingle}>{item.single}</span>;
  }
  return (
    <span className={styles.tiers}>
      {item.inside ? <span className={styles.priceIn}><b>{item.inside}</b> in</span> : null}
      {item.outside ? <span className={styles.priceOut}><b>{item.outside}</b> out</span> : null}
    </span>
  );
}

export default function MobileOnlineServicesScreen() {
  const [activeKey, setActiveKey] = useState<string>("amer");
  const [q, setQ] = useState("");
  const [docsFor, setDocsFor] = useState<string | null>(null);

  const active = CATEGORIES.find((c) => c.key === activeKey) ?? CATEGORIES[0];
  const totalCount = useMemo(
    () => CATEGORIES.reduce((a, c) => a + c.groups.reduce((b, g) => b + g.items.length, 0), 0),
    []
  );
  const hasDual = active.groups.some((g) => g.items.some((it) => it.inside != null || it.outside != null));

  const groups = useMemo(() => {
    const query = q.trim().toLowerCase();
    return active.groups
      .map((g) => ({ ...g, items: g.items.filter((it) => it.name.toLowerCase().includes(query)) }))
      .filter((g) => g.items.length);
  }, [q, active]);

  return (
    <div className={`${styles.wrap} ${outfit.className}`}>
      <div className={styles.hubTop}>
        <span className={styles.glowGold} aria-hidden />
        <span className={styles.glowWhite} aria-hidden />
        <span className={styles.eyebrow}>AMER 247</span>
        <h1 className={styles.title}>AMER 247&apos;s Services Fees &amp; Payments</h1>
        <p className={styles.blurb}>
          We help our customers to keep updated with application fees and other charges required
          for the kind of applications they applied for. We also request to keep checking this
          page for regular updates or contact us for latest revisions of Amer services fees and charges.
        </p>
        <span className={styles.countChip}>
          <Layers size={12} />
          {totalCount} services
        </span>
      </div>

      <div className={styles.body}>
        <div className={styles.catChips}>
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              className={`${styles.catChip} ${activeKey === c.key ? styles.catChipOn : ""}`}
              onClick={() => { setActiveKey(c.key); setQ(""); }}
            >
              <c.icon size={15} />
              {c.label}
            </button>
          ))}
        </div>

        <div className={styles.search}>
          <Search size={17} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder={`Search ${active.label.toLowerCase()}…`}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          {q.length > 0 && (
            <button className={styles.clear} onClick={() => setQ("")} aria-label="Clear search">
              <X size={15} />
            </button>
          )}
        </div>

        {groups.map((g) => (
          <div key={g.key} className={styles.group}>
            <div className={styles.catLabel}>
              <span className={styles.catTxt}>{g.label}</span>
              <span className={styles.catCount}>{g.items.length}</span>
            </div>
            <div className={styles.svcGrid}>
              {g.items.map((it) => {
                const GroupIcon = GROUP_ICONS[g.icon] ?? Layers;
                if (it.disabled) {
                  return (
                    <div key={it.name} className={`${styles.svcBox} ${styles.svcBoxDisabled}`} aria-disabled="true">
                      <span className={styles.svcIco}>
                        <GroupIcon size={19} />
                      </span>
                      <p className={styles.svcName}>{it.name}</p>
                      <div className={styles.svcPrice}>
                        <PriceBlock item={it} />
                      </div>
                    </div>
                  );
                }
                const href = buildApplyHref(it, active.label);
                return (
                  <Link key={it.name} href={href} className={`${styles.svcBox} ${active.gold ? styles.svcBoxGold : ""}`}>
                    <button
                      type="button"
                      className={styles.svcEye}
                      aria-label={`View required documents for ${it.name}`}
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setDocsFor(it.name); }}
                    >
                      <Eye size={14} />
                    </button>
                    <span className={`${styles.svcIco} ${active.gold ? styles.svcIcoGold : ""}`}>
                      <GroupIcon size={19} />
                    </span>
                    <p className={styles.svcName}>{it.name}</p>
                    <div className={styles.svcPrice}>
                      <PriceBlock item={it} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {!groups.length && <p className={styles.empty}>No services match &ldquo;{q}&rdquo;.</p>}

        {hasDual && (
          <div className={styles.legend}>
            <span><b>in</b> = applicant inside UAE</span>
            <span><b>out</b> = outside UAE</span>
          </div>
        )}
      </div>

      <RequiredDocumentsModal
        open={!!docsFor}
        onClose={() => setDocsFor(null)}
        serviceName={docsFor ?? ""}
      />
    </div>
  );
}
