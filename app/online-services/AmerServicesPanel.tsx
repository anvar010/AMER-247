"use client";

import { useState } from "react";
import { 
  ArrowDownToLine, ArrowUpFromLine, Tag, Clock,
  FileText, Plane, Baby, FileUp, RefreshCw, Stamp, 
  XCircle, Edit, Map, Building, ArrowRightLeft, Shield, PauseCircle, Briefcase, Users
} from "lucide-react";
import styles from "./online-services.module.css";
import { amerSubCategories, type PriceItem } from "./AmerServicesData";

export default function AmerServicesPanel() {
  const [activeKey, setActiveKey] = useState<string>("all");

  const visible =
    activeKey === "all"
      ? amerSubCategories
      : amerSubCategories.filter((s) => s.key === activeKey);

  return (
    <div className={styles.amer}>
      {/* Sub-category chip filter */}
      <div className={styles.subBarHead}>
        <span className={styles.subBarHint}>See All or Choose options below</span>
      </div>
      <div
        className={styles.subBar}
        role="tablist"
        aria-label="AMER service sub-categories"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeKey === "all"}
          className={`${styles.subChip} ${activeKey === "all" ? styles.subChipActive : ""}`}
          onClick={() => setActiveKey("all")}
        >
          All
        </button>
        {amerSubCategories.map((s) => (
          <button
            key={s.key}
            type="button"
            role="tab"
            aria-selected={activeKey === s.key}
            className={`${styles.subChip} ${activeKey === s.key ? styles.subChipActive : ""}`}
            onClick={() => setActiveKey(s.key)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Groups */}
      <div className={styles.groups} key={activeKey}>
        {visible.map((group, gIdx) => (
          <section
            key={group.key}
            className={styles.group}
            style={{ animationDelay: `${gIdx * 0.06}s` }}
          >
            <header className={styles.groupHead}>
              <span className={styles.groupNum}>{String(gIdx + 1).padStart(2, "0")}</span>
              <h4 className={styles.groupTitle}>{group.label}</h4>
              <span className={styles.groupLine} />
            </header>

            <ul className={styles.priceList}>
              {group.items.map((item, i) => (
                <PriceRow key={`${group.key}-${i}`} item={item} index={i} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function PriceRow({ item }: { item: PriceItem }) {
  const bgImage = "/images/musueam-night.jpg";

  // Determine pricing columns
  let col1Label = "LOCATION";
  let col1Value = "DUBAI / UAE";
  let col2Label = "TYPE";
  let col2Value = "AMER SERVICE";
  let col3Label = "FEES";
  let col3Value = "Cost Depends";

  if (item.inside && item.outside) {
    col1Label = "INSIDE";
    col1Value = item.inside;
    col2Label = "OUTSIDE";
    col2Value = item.outside;
    col3Label = "LOCATION";
    col3Value = "DUBAI / UAE";
  } else if (item.inside) {
    col1Label = "LOCATION";
    col1Value = "INSIDE UAE";
    col2Label = "TYPE";
    col2Value = "E-VISA";
    col3Label = "FEES";
    col3Value = item.inside;
  } else if (item.outside) {
    col1Label = "LOCATION";
    col1Value = "OUTSIDE UAE";
    col2Label = "TYPE";
    col2Value = "E-VISA";
    col3Label = "FEES";
    col3Value = item.outside;
  } else if (item.single) {
    col1Label = "LOCATION";
    col1Value = "DUBAI / UAE";
    col2Label = "TYPE";
    col2Value = "AMER SERVICE";
    col3Label = "FEES";
    col3Value = item.single;
  }

  // Determine icon
  let IconComponent = FileText;
  const name = item.name.toLowerCase();
  
  if (name.includes("visit")) IconComponent = Plane;
  else if (name.includes("born") || name.includes("children") || name.includes("son") || name.includes("daughter")) IconComponent = Baby;
  else if (name.includes("parent") || name.includes("spouse") || name.includes("family")) IconComponent = Users;
  else if (name.includes("employment") || name.includes("job") || name.includes("partner") || name.includes("investor")) IconComponent = Briefcase;
  else if (name.includes("extend")) IconComponent = FileUp;
  else if (name.includes("renew")) IconComponent = RefreshCw;
  else if (name.includes("stamp")) IconComponent = Stamp;
  else if (name.includes("cancel")) IconComponent = XCircle;
  else if (name.includes("data") || name.includes("modifi")) IconComponent = Edit;
  else if (name.includes("travel")) IconComponent = Map;
  else if (name.includes("establishment")) IconComponent = Building;
  else if (name.includes("status")) IconComponent = ArrowRightLeft;
  else if (name.includes("security")) IconComponent = Shield;
  else if (name.includes("holding")) IconComponent = PauseCircle;

  return (
    <li className={styles.priceRow}>
      {/* Background Image Header */}
      <div className={styles.cardHeaderArea}>
        <img src={bgImage} className={styles.cardBgImage} alt="Dubai Background" />
        <div className={styles.cardImageOverlay} />
      </div>

      {/* Emblem in Center */}
      <div className={styles.cardEmblem}>
        <div className={styles.cardEmblemInner}>
          <IconComponent size={20} strokeWidth={2.5} color="#c9a24b" />
        </div>
      </div>

      {/* Card Content Area */}
      <div className={styles.cardBody}>
        {/* Title in Serif */}
        <h4 className={styles.priceName}>{item.name}</h4>
        
        {/* Fine Divider Line */}
        <div className={styles.cardDivider} />

        {/* 3 Columns Display */}
        <div className={styles.cardColumns}>
          <div className={styles.cardCol}>
            <span className={styles.cardColLabel}>{col1Label}</span>
            <span className={styles.cardColValue}>{col1Value}</span>
          </div>
          <div className={styles.cardCol}>
            <span className={styles.cardColLabel}>{col2Label}</span>
            <span className={styles.cardColValue}>{col2Value}</span>
          </div>
          <div className={styles.cardCol}>
            <span className={styles.cardColLabel}>{col3Label}</span>
            <span className={styles.cardColValue}>{col3Value}</span>
          </div>
        </div>

        {/* Hover / Reveal Drawer */}
        <div className={styles.hoverDrawer}>
          <div className={styles.cardDivider} />
          
          <div className={styles.docsArea}>
            <span className={styles.docsLabel}>DOCUMENTS NEEDED:</span>
            <div className={styles.docsText}>Original Passport, Photo, Visa Copy</div>
          </div>

          <button className={styles.applyBtnPrimary} type="button">
            Apply Now
          </button>
        </div>
      </div>
    </li>
  );
}
