"use client";

import { useState, type ComponentType } from "react";
import {
  AmerIcon,
  EmiratesIdIcon,
  GoldenVisaIcon,
  TasheelIcon,
  MedicalIcon,
  InsuranceIcon,
} from "./CategoryIcons";
import AmerServicesPanel from "./AmerServicesPanel";
import styles from "./online-services.module.css";

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

export default function CategoryTabs() {
  const [active, setActive] = useState<CategoryKey>("amer");
  const activeCategory = categories.find((c) => c.key === active) ?? categories[0];

  return (
    <section className={styles.tabs}>
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
          {active === "amer" ? (
            <AmerServicesPanel />
          ) : (
            <p className={styles.panelEmpty}>
              Pricing details for <strong>{activeCategory.label}</strong> will
              appear here.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
