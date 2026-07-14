"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Outfit } from "next/font/google";
import {
  Search, Mic, MousePointerClick, FileText, Calculator, Headset,
  Gem, Plane, IdCard, Stethoscope, ShieldPlus, TrendingUp, Stamp,
  ArrowRight, Sparkles,
} from "lucide-react";
import MobileSearchOverlay from "@/components/MobileSearchOverlay/MobileSearchOverlay";
import MobileFeeCalculator from "@/components/MobileFeeCalculator/MobileFeeCalculator";
import styles from "./MobileAppHome.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

type Cat = "Visa" | "ID" | "Medical" | "Business";
const CATS: readonly ("All" | Cat)[] = ["All", "Visa", "ID", "Medical", "Business"];

// Matches the real app's Home EXPLORE array exactly, including which hub
// each card opens (residency & amer-business both live under our
// consolidated "Amer Services" hub, since we don't duplicate that data).
const EXPLORE: { t: string; d: string; cat: Cat; icon: typeof Gem; href: string }[] = [
  { t: "Golden Visa", d: "Long-term UAE residency.", cat: "Visa", icon: Gem, href: "/services/golden" },
  { t: "Tourist Visa", d: "Fast entry permits.", cat: "Visa", icon: Plane, href: "/services/tourist" },
  { t: "Emirates ID", d: "New & renewals.", cat: "ID", icon: IdCard, href: "/services/emirates-id" },
  { t: "Residency", d: "Stamping & status.", cat: "Visa", icon: FileText, href: "/services/immigration" },
  { t: "Medical Test", d: "Fitness scheduling.", cat: "Medical", icon: Stethoscope, href: "/services/medical" },
  { t: "Health Insurance", d: "Plans for family.", cat: "Medical", icon: ShieldPlus, href: "/services/insurance" },
  { t: "Business Setup", d: "Dubai Economy.", cat: "Business", icon: TrendingUp, href: "/services/immigration" },
  { t: "Entry Permits", d: "Apply & track.", cat: "Visa", icon: Stamp, href: "/services/immigration" },
];

// Matches the app's quick-action row exactly (Apply/Track/Fees/Support —
// the 3rd slot is "Fees", opening the Fee Calculator, not "Book").
// In the real app, Track requires being signed in — same here.
const QUICK = [
  { icon: MousePointerClick, label: "Apply", tone: "gold" as const, href: "/services" },
  { icon: FileText, label: "Track", tone: "primary" as const, href: "/login" },
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

      {/* Your activity */}
      <div className={styles.secHead}>
        <h2 className={styles.h2}>Your activity</h2>
      </div>
      <Link href="/login" className={styles.tracker}>
        <span className={styles.trackerIco}>
          <Sparkles size={19} />
        </span>
        <span className={styles.trackerBody}>
          <span className={styles.trackerT}>Start your first application</span>
          <span className={styles.trackerD}>Sign in to track every step here — live, 24/7.</span>
        </span>
        <ArrowRight size={18} className={styles.trackerArrow} />
      </Link>

      {/* Explore services */}
      <div className={styles.secHead}>
        <h2 className={styles.h2}>Explore Services</h2>
        <Link href="/services" className={styles.more}>
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
            {c}
          </button>
        ))}
      </div>

      <div className={styles.hubGrid}>
        {filtered.map((e) => (
          <Link key={e.t} href={e.href} className={styles.hubCard}>
            <span className={styles.hubIco}>
              <e.icon size={24} strokeWidth={1.8} />
            </span>
            <span className={styles.hubT}>{e.t}</span>
            <span className={styles.hubD}>{e.d}</span>
          </Link>
        ))}
      </div>

      {/* Promo */}
      <Link href="/services" className={styles.promo}>
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
