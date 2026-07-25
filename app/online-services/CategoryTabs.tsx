"use client";

import { useState, useEffect, useRef, type ComponentType } from "react";
import { useSearchParams } from "next/navigation";
import {
  AmerIcon,
  EmiratesIdIcon,
  GoldenVisaIcon,
  TasheelIcon,
  MedicalIcon,
  InsuranceIcon,
} from "./CategoryIcons";
import AmerServicesPanel from "./AmerServicesPanel";
import { DesktopServiceGrid } from "@/components/DesktopHubScreen/DesktopHubScreen";
import { amerSubCategories } from "./AmerServicesData";
import { OTHER_HUBS } from "@/components/MobileSearchOverlay/catalog";
import styles from "./online-services.module.css";

// Mirrors the real app's Services tab exactly — same 6 categories. Tourist
// Visa is a separate entry point (the header's "UAE TOURIST VISA" button →
// /uae-tourist-visa), not nested in here.
export type CategoryKey =
  | "amer"
  | "emirates-id"
  | "golden-visa"
  | "tasheel"
  | "medical"
  | "insurance";

type IconComp = ComponentType<{ size?: number; className?: string }>;

const categories: {
  key: CategoryKey;
  label: string;
  icon: IconComp;
  tag: string;
}[] = [
  { key: "amer",         label: "AMER Services",            icon: AmerIcon,        tag: "01" },
  { key: "emirates-id",  label: "Emirates ID Application",  icon: EmiratesIdIcon,  tag: "02" },
  { key: "golden-visa",  label: "Golden Visa Application",  icon: GoldenVisaIcon,  tag: "03" },
  { key: "tasheel",      label: "Tas-heel Services",        icon: TasheelIcon,     tag: "04" },
  { key: "medical",      label: "Medical Test",             icon: MedicalIcon,     tag: "05" },
  { key: "insurance",    label: "Insurance",                icon: InsuranceIcon,   tag: "06" },
];

// Maps this page's CategoryKey to the real catalog hub key (they differ for
// "golden-visa" vs "golden") so each non-AMER tab can render its real,
// itemized pricing instead of a "coming soon" placeholder.
const CATALOG_HUB_KEY: Partial<Record<CategoryKey, string>> = {
  "emirates-id": "emirates-id",
  "golden-visa": "golden",
  tasheel: "tasheel",
  medical: "medical",
  insurance: "insurance",
};

const CATEGORY_KEYS = categories.map((c) => c.key);

export default function CategoryTabs() {
  // Deep-links like /online-services?tab=golden-visa (used by the Hero and
  // WhatWeDo service cards) were being silently ignored — nothing read the
  // query param, so every link just landed on the default "amer" tab.
  const tabParam = useSearchParams().get("tab");
  const initialActive = (CATEGORY_KEYS as string[]).includes(tabParam ?? "")
    ? (tabParam as CategoryKey)
    : "amer";
  const [active, setActive] = useState<CategoryKey>(initialActive);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");
    if (tabParam && categories.some((c) => c.key === tabParam)) {
      setActive(tabParam as CategoryKey);
      
      // Delay slightly to ensure layout is ready before scrolling
      setTimeout(() => {
        if (sectionRef.current) {
          const y = sectionRef.current.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  const activeCategory = categories.find((c) => c.key === active) ?? categories[0];

  return (
    <section id="pricing-tabs" ref={sectionRef} className={styles.tabs}>
      <span className={styles.tabsGlow} aria-hidden="true" />
      <div className={`container ${styles.tabsInner}`}>
        <header className={styles.tabsHead}>
          <span className={styles.sectionEyebrow}>
            <span className={styles.eyebrowLine} />
            Select a Category
          </span>
          <h2 className={styles.sectionTitle}>
            Choose a service to
            <em className={styles.titleEm}> view pricing.</em>
          </h2>
        </header>

        <div className={styles.tabBar} role="tablist" aria-label="Service categories">
          {categories.map(({ key, label, icon: Icon, tag }) => {
            const isActive = key === active;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${key}`}
                className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                onClick={() => setActive(key)}
              >
                <span className={styles.tabIconWrap}>
                  <Icon size={30} className={styles.tabIcon} />
                </span>
                <span className={styles.tabLabel}>{label}</span>
                <span className={styles.tabTag}>{tag}</span>
              </button>
            );
          })}
        </div>

        <div
          id={`panel-${active}`}
          role="tabpanel"
          className={styles.panel}
          key={active}
        >
          <div className={styles.panelHeader}>
            <span className={styles.panelIconWrap}>
              <activeCategory.icon size={32} className={styles.panelIcon} />
            </span>
            <div>
              <span className={styles.panelTag}>Category {activeCategory.tag}</span>
              <h3 className={styles.panelTitle}>{activeCategory.label}</h3>
            </div>
          </div>
          {(() => {
            const active_hub = active === "amer"
              ? { groups: amerSubCategories, title: "AMER Services", gold: false }
              : (() => {
                  const h = OTHER_HUBS.find((h) => h.key === CATALOG_HUB_KEY[active]);
                  return h ? { groups: h.groups, title: h.title, gold: !!h.gold } : null;
                })();

            if (!active_hub) {
              return (
                <p className={styles.panelEmpty}>
                  Pricing details for <strong>{activeCategory.label}</strong> will
                  appear here.
                </p>
              );
            }

            return (
              <>
                {/* Mobile keeps the original dark image-card design (unchanged). */}
                <div className={styles.mobilePanelOnly}>
                  <AmerServicesPanel groups={active_hub.groups} hubTitle={active_hub.title} />
                </div>
                {/* Desktop matches the mobile APP's own icon-chip card design. */}
                <div className={styles.desktopPanelOnly}>
                  <DesktopServiceGrid
                    subCategories={active_hub.groups}
                    hubTitle={active_hub.title}
                    gold={active_hub.gold}
                  />
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
