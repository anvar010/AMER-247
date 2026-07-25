"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Outfit } from "next/font/google";
import {
  Search, Mic, MousePointerClick, Calculator, Headset,
  ArrowRight,
} from "lucide-react";
import MobileSearchOverlay from "@/components/MobileSearchOverlay/MobileSearchOverlay";
import MobileFeeCalculator from "@/components/MobileFeeCalculator/MobileFeeCalculator";
import { services as EXPLORE } from "@/components/WhatWeDo/WhatWeDo";
import styles from "./MobileAppHome.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

type Cat = "Visa" | "ID" | "Medical" | "Business";
const CATS: readonly ("All" | Cat)[] = ["All", "Visa", "ID", "Medical", "Business"];
// Display-only — the filter value itself stays "ID" (matches WhatWeDo's
// category data), just the chip label reads more clearly.
const CAT_LABELS: Record<"All" | Cat, string> = {
  All: "All",
  Visa: "Visa",
  ID: "Emirates ID",
  Medical: "Medical",
  Business: "Business",
};

// Matches the app's quick-action row (Apply/Fees/Support — "Track" was
// dropped along with /login/account, which had no real backend behind them).
const QUICK = [
  { icon: MousePointerClick, label: "Apply", tone: "gold" as const, href: "/online-services" },
  { icon: Calculator, label: "Fees", tone: "default" as const, href: null },
  { icon: Headset, label: "Support", tone: "default" as const, href: "/contact" },
];

export default function MobileAppHome() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [cat, setCat] = useState<"All" | Cat>("All");

  const filtered = useMemo(() => {
    return EXPLORE.filter((e) => cat === "All" || e.cat === cat);
  }, [cat]);

  return (
    <section className={`${styles.wrap} ${outfit.className}`}>
      {/* Search */}
      <button className={styles.search} onClick={() => setSearchOpen(true)}>
        <Search size={18} className={styles.searchIcon} />
        <span className={styles.searchPlaceholder}>Search &quot;Golden Visa&quot;, &quot;Emirates ID&quot;…</span>
        <Mic size={17} className={styles.mic} />
      </button>

      <MobileSearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileFeeCalculator open={calcOpen} onClose={() => setCalcOpen(false)} />

      {/* Quick actions */}
      <div className={styles.qaGrid}>
        {QUICK.map((a) =>
          a.href ? (
            <Link key={a.label} href={a.href} className={styles.tile}>
              <span className={`${styles.tileIco} ${styles[`tileIco_${a.tone}`]}`}>
                <a.icon size={23} strokeWidth={1.8} />
              </span>
              <span className={styles.tileLbl}>{a.label}</span>
            </Link>
          ) : (
            <button key={a.label} className={styles.tile} onClick={() => setCalcOpen(true)}>
              <span className={`${styles.tileIco} ${styles[`tileIco_${a.tone}`]}`}>
                <a.icon size={23} strokeWidth={1.8} />
              </span>
              <span className={styles.tileLbl}>{a.label}</span>
            </button>
          )
        )}
      </div>

      {/* Our services */}
      <div className={styles.secHead}>
        <h2 className={styles.h2}>Our Services</h2>
        <Link href="/online-services" className={styles.more}>
          See all <ArrowRight size={13} />
        </Link>
      </div>

      <div className={styles.chips}>
        {CATS.map((c) => (
          <button
            key={c}
            className={`${styles.chip} ${cat === c ? styles.chipOn : ""}`}
            onClick={() => setCat(c)}
          >
            {CAT_LABELS[c]}
          </button>
        ))}
      </div>

      <div className={styles.hubGrid}>
        {filtered.map((e) => (
          <Link key={e.label} href={e.href} className={styles.hubCard}>
            <span className={styles.hubIco}>
              <e.icon size={24} strokeWidth={1.8} />
            </span>
            <span className={styles.hubT}>{e.label}</span>
            <span className={styles.hubD}>{e.desc}</span>
          </Link>
        ))}
      </div>

      {/* Promo */}
      <Link href="/online-services" className={styles.promo}>
        <h3 className={styles.promoH}>
          Apply online in <span className={styles.promoGold}>minutes</span>
        </h3>
        <p className={styles.promoP}>
          Start any visa, residency or Emirates ID application — 24/7, from your phone.
        </p>
        <span className={styles.promoBtn}>
          Get Started <ArrowRight size={16} />
        </span>
      </Link>
    </section>
  );
}
