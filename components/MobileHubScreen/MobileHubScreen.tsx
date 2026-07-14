"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X, Layers } from "lucide-react";
import { Outfit } from "next/font/google";
import type { SubCategory, PriceItem } from "@/app/online-services/AmerServicesData";
import styles from "./MobileHubScreen.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

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

export interface MobileHubScreenProps {
  title: string;
  blurb: string;
  subCategories: SubCategory[];
}

export default function MobileHubScreen({ title, blurb, subCategories }: MobileHubScreenProps) {
  const [q, setQ] = useState("");

  const serviceCount = subCategories.reduce((a, g) => a + g.items.length, 0);
  const hasDual = subCategories.some((g) => g.items.some((it) => it.inside != null || it.outside != null));

  const groups = useMemo(() => {
    const query = q.trim().toLowerCase();
    return subCategories
      .map((g) => ({ ...g, items: g.items.filter((it) => it.name.toLowerCase().includes(query)) }))
      .filter((g) => g.items.length);
  }, [q, subCategories]);

  return (
    <div className={`${styles.wrap} ${outfit.className}`}>
      <div className={styles.hubTop}>
        <span className={styles.glowGold} aria-hidden />
        <span className={styles.glowWhite} aria-hidden />
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.blurb}>{blurb}</p>
        <span className={styles.countChip}>
          <Layers size={12} />
          {serviceCount} services
        </span>
      </div>

      <div className={styles.body}>
        <div className={styles.search}>
          <Search size={17} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder={`Search ${title.toLowerCase()}…`}
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
                const priceLabel = it.single ?? it.inside ?? it.outside ?? "";
                const href = `/apply?service=${encodeURIComponent(it.name)}&hub=${encodeURIComponent(title)}&price=${encodeURIComponent(priceLabel)}`;
                return (
                  <Link key={it.name} href={href} className={styles.svcBox}>
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
    </div>
  );
}
