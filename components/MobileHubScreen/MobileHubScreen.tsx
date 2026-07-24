"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search, X, Layers, Stamp, Users, HeartPulse, CalendarCheck, Printer,
  FileText, Globe, Building2, TrendingUp, Landmark, ShieldCheck, Gem,
  IdCard, ShieldPlus, Stethoscope, Eye, type LucideIcon,
} from "lucide-react";
import { Outfit } from "next/font/google";
import type { SubCategory, PriceItem } from "@/app/online-services/AmerServicesData";
import { buildApplyHref } from "@/lib/applyLink";
import RequiredDocumentsModal from "@/components/RequiredDocumentsModal/RequiredDocumentsModal";
import styles from "./MobileHubScreen.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

// Matches the real app's per-group icon names (group.icon in the catalog).
const GROUP_ICONS: Record<string, LucideIcon> = {
  Stamp, Users, HeartPulse, CalendarCheck, Printer, X, FileText, Globe,
  Building2, TrendingUp, Landmark, ShieldCheck, Gem, IdCard, ShieldPlus, Stethoscope,
};

// Display-only, mobile-only shortening ("14 Days Tourist Visa" -> "14 Days").
// Also drops " (Express)"/" (Popular)" specifically - both always pair with
// a matching item.badge shown separately on the card, so keeping them in
// the title too is redundant. " (Multiple Entry)" has no badge counterpart,
// so it stays in the name as the only visible way to distinguish it. The
// underlying item.name is untouched so DesktopHubScreen, search matching,
// and the required-documents modal's aria-label all keep the full name.
const shortName = (name: string) =>
  name.replace(" Tourist Visa", "").replace(" (Express)", "").replace(" (Popular)", "");

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

// Display-only, mobile-only shortening of the "Processing" value for one
// specific item (identified by slug, never altered) - DesktopHubScreen
// keeps showing the full item.proc text unchanged.
const MOBILE_PROC_OVERRIDES: Record<string, string> = {
  "96_hours_tourist_visa": "2-4 days",
};
const mobileProc = (item: PriceItem) =>
  (item.slug && MOBILE_PROC_OVERRIDES[item.slug]) || item.proc;

// Full-width card for items carrying processing/stay/validity/entry detail
// (currently just Tourist Visa) — too much content for the compact 2-up grid.
function DetailCard({
  item, href, icon: Icon, gold, onViewDocs, hideEye,
}: {
  item: PriceItem; href: string; icon: LucideIcon; gold?: boolean; onViewDocs: () => void; hideEye?: boolean;
}) {
  const meta = [
    item.proc ? { label: "Processing", value: mobileProc(item) } : null,
    item.stay ? { label: "Stay period", value: item.stay } : null,
    item.validity ? { label: "Validity", value: item.validity } : null,
    item.entry ? { label: "Entry", value: item.entry } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <Link href={href} className={`${styles.detailCard} ${gold ? styles.svcBoxGold : ""}`}>
      <div className={styles.detailHead}>
        <span className={`${styles.svcIco} ${gold ? styles.svcIcoGold : ""}`}>
          <Icon size={19} />
        </span>
        <div className={styles.detailHeadBody}>
          <p className={styles.svcName}>{shortName(item.name)}</p>
          {item.badge && <span className={styles.detailBadge}>{item.badge}</span>}
        </div>
        {!hideEye && (
          <button
            type="button"
            className={styles.detailEye}
            aria-label={`View required documents for ${item.name}`}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onViewDocs(); }}
          >
            <Eye size={14} />
          </button>
        )}
      </div>

      {meta.length > 0 && (
        <div className={styles.detailMeta}>
          {meta.map((m) => (
            <div key={m.label} className={styles.detailMetaItem}>
              <span className={styles.detailMetaLabel}>{m.label}</span>
              <span className={styles.detailMetaValue}>{m.value}</span>
            </div>
          ))}
        </div>
      )}

      <div className={styles.detailFoot}>
        <PriceBlock item={item} />
      </div>
    </Link>
  );
}

export interface MobileHubScreenProps {
  title: string;
  blurb: string;
  subCategories: SubCategory[];
  gold?: boolean;
  // Optional override for the big H1 shown in the hero — `title` itself
  // still drives the search placeholder and the apply form's hub label, so
  // a page can show a longer marketing headline without that leaking there.
  heroTitle?: string;
}

export default function MobileHubScreen({ title, blurb, subCategories, gold, heroTitle }: MobileHubScreenProps) {
  const [q, setQ] = useState("");
  const [docsFor, setDocsFor] = useState<{ name: string; slug?: string } | null>(null);

  const serviceCount = subCategories.reduce((a, g) => a + g.items.length, 0);
  const hasDual = subCategories.some((g) => g.items.some((it) => it.inside != null || it.outside != null));
  // Real site has no required-documents concept for Tourist Visa.
  const hideDocsEye = title === "Tourist Visa";

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
        <h1 className={styles.title}>{heroTitle ?? title}</h1>
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
            aria-label={`Search ${title.toLowerCase()}`}
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

        {groups.map((g) => {
          const isDetailed = g.items.some((it) => it.proc);
          const GroupIcon = GROUP_ICONS[g.icon] ?? Layers;
          return (
            <div key={g.key} className={styles.group}>
              <div className={styles.catLabel}>
                <span className={styles.catTxt}>{g.heading ?? g.label}</span>
                <span className={styles.catCount}>{g.items.length}</span>
              </div>
              {g.subheading && <p className={styles.catSubheading}>{g.subheading}</p>}

              {isDetailed ? (
                <div className={styles.detailStack}>
                  {g.items.map((it, i) => (
                    <DetailCard
                      key={`${it.slug ?? it.name}-${i}`}
                      item={it}
                      href={buildApplyHref(it, title)}
                      icon={GroupIcon}
                      gold={gold}
                      onViewDocs={() => setDocsFor(it)}
                      hideEye={hideDocsEye}
                    />
                  ))}
                </div>
              ) : (
                <div className={styles.svcGrid}>
                  {g.items.map((it, i) => {
                    const itemKey = `${it.slug ?? it.name}-${i}`;
                    if (it.disabled) {
                      return (
                        <div key={itemKey} className={`${styles.svcBox} ${styles.svcBoxDisabled}`} aria-disabled="true">
                          <span className={styles.svcIco}>
                            <GroupIcon size={19} />
                          </span>
                          <p className={styles.svcName}>{shortName(it.name)}</p>
                          <div className={styles.svcPrice}>
                            <PriceBlock item={it} />
                          </div>
                        </div>
                      );
                    }
                    const href = buildApplyHref(it, title);
                    return (
                      <Link key={itemKey} href={href} className={`${styles.svcBox} ${gold ? styles.svcBoxGold : ""}`}>
                        {!hideDocsEye && (
                          <button
                            type="button"
                            className={styles.svcEye}
                            aria-label={`View required documents for ${it.name}`}
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setDocsFor(it); }}
                          >
                            <Eye size={14} />
                          </button>
                        )}
                        <span className={`${styles.svcIco} ${gold ? styles.svcIcoGold : ""}`}>
                          <GroupIcon size={19} />
                        </span>
                        <p className={styles.svcName}>{shortName(it.name)}</p>
                        <div className={styles.svcPrice}>
                          <PriceBlock item={it} />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

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
        serviceName={docsFor?.name ?? ""}
        slug={docsFor?.slug}
      />
    </div>
  );
}
