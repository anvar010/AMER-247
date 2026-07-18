"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search, X, Layers, Stamp, Users, HeartPulse, CalendarCheck, Printer,
  FileText, Globe, Building2, TrendingUp, Landmark, ShieldCheck, Gem,
  IdCard, ShieldPlus, Stethoscope, Eye, type LucideIcon,
} from "lucide-react";
import type { SubCategory, PriceItem } from "@/app/online-services/AmerServicesData";
import { buildApplyHref } from "@/lib/applyLink";
import RequiredDocumentsModal from "@/components/RequiredDocumentsModal/RequiredDocumentsModal";
import styles from "./DesktopHubScreen.module.css";

// Desktop counterpart to MobileHubScreen — same data, same icon-chip +
// name + price card listing, same live search, same in/out tier legend —
// laid out for a wide screen with a multi-column grid instead of 2 across.
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

// Full-width card for items carrying processing/stay/validity/entry detail
// (currently just Tourist Visa) — too much content for the grid cards.
function DetailCard({
  item, href, icon: Icon, gold, onViewDocs, hideEye,
}: {
  item: PriceItem; href: string; icon: LucideIcon; gold?: boolean; onViewDocs: () => void; hideEye?: boolean;
}) {
  const meta = [
    item.proc ? { label: "Processing", value: item.proc } : null,
    item.stay ? { label: "Stay period", value: item.stay } : null,
    item.validity ? { label: "Validity", value: item.validity } : null,
    item.entry ? { label: "Entry", value: item.entry } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <Link href={href} className={`${styles.detailCard} ${gold ? styles.svcBoxGold : ""}`}>
      <div className={styles.detailHead}>
        <span className={`${styles.svcIco} ${gold ? styles.svcIcoGold : ""}`}>
          <Icon size={20} />
        </span>
        <div className={styles.detailHeadBody}>
          <p className={styles.svcName}>{item.name}</p>
          {item.badge && <span className={styles.detailBadge}>{item.badge}</span>}
        </div>
        {!hideEye && (
          <button
            type="button"
            className={styles.detailEye}
            aria-label={`View required documents for ${item.name}`}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onViewDocs(); }}
          >
            <Eye size={15} />
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

export interface DesktopServiceGridProps {
  subCategories: SubCategory[];
  hubTitle: string;
  gold?: boolean;
}

// The reusable half: search + category groups + card grid, with no hero.
// Used standalone inside CategoryTabs (which renders its own panel header).
export function DesktopServiceGrid({ subCategories, hubTitle, gold }: DesktopServiceGridProps) {
  const [q, setQ] = useState("");
  const [docsFor, setDocsFor] = useState<{ name: string; slug?: string } | null>(null);

  const hasDual = subCategories.some((g) => g.items.some((it) => it.inside != null || it.outside != null));
  // Real site has no required-documents concept for Tourist Visa.
  const hideDocsEye = hubTitle === "Tourist Visa";

  const groups = useMemo(() => {
    const query = q.trim().toLowerCase();
    return subCategories
      .map((g) => ({ ...g, items: g.items.filter((it) => it.name.toLowerCase().includes(query)) }))
      .filter((g) => g.items.length);
  }, [q, subCategories]);

  return (
    <div className={styles.body}>
      <div className={styles.search}>
        <Search size={18} className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          placeholder={`Search ${hubTitle.toLowerCase()}…`}
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
                {g.items.map((it) => (
                  <DetailCard
                    key={it.name}
                    item={it}
                    href={buildApplyHref(it, hubTitle)}
                    icon={GroupIcon}
                    gold={gold}
                    onViewDocs={() => setDocsFor(it)}
                    hideEye={hideDocsEye}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.svcGrid}>
                {g.items.map((it) => {
                  if (it.disabled) {
                    return (
                      <div key={it.name} className={`${styles.svcBox} ${styles.svcBoxDisabled}`} aria-disabled="true">
                        <span className={styles.svcIco}>
                          <GroupIcon size={20} />
                        </span>
                        <p className={styles.svcName}>{it.name}</p>
                        <div className={styles.svcPrice}>
                          <PriceBlock item={it} />
                        </div>
                      </div>
                    );
                  }
                  const href = buildApplyHref(it, hubTitle);
                  return (
                    <Link key={it.name} href={href} className={`${styles.svcBox} ${gold ? styles.svcBoxGold : ""}`}>
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
                        <GroupIcon size={20} />
                      </span>
                      <p className={styles.svcName}>{it.name}</p>
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

      <RequiredDocumentsModal
        open={!!docsFor}
        onClose={() => setDocsFor(null)}
        serviceName={docsFor?.name ?? ""}
        slug={docsFor?.slug}
      />
    </div>
  );
}

export interface DesktopHubScreenProps {
  title: string;
  blurb: string;
  subCategories: SubCategory[];
  gold?: boolean;
  // Optional override for the big H1 shown in the hero — `title` itself
  // still drives the search placeholder and the apply form's hub label, so
  // a page can show a longer marketing headline without that leaking there.
  heroTitle?: string;
  // Skip the built-in dark hero — for pages that render their own custom
  // hero above this (e.g. /uae-tourist-visa's boarding-pass hero) while
  // still reusing the search + grid + legend below it.
  hideHero?: boolean;
}

// The full page: hero (title/blurb/count chip) + the grid above. Used on
// the standalone /services/[hub] pages.
export default function DesktopHubScreen({ title, blurb, subCategories, gold, heroTitle, hideHero }: DesktopHubScreenProps) {
  const serviceCount = subCategories.reduce((a, g) => a + g.items.length, 0);

  return (
    <div className={styles.wrap}>
      {!hideHero && (
        <div className={styles.hubTop}>
          <span className={styles.glowGold} aria-hidden />
          <span className={styles.glowWhite} aria-hidden />
          <div className={styles.hubTopInner}>
            <h1 className={styles.title}>{heroTitle ?? title}</h1>
            <p className={styles.blurb}>{blurb}</p>
            <span className={styles.countChip}>
              <Layers size={13} />
              {serviceCount} services
            </span>
          </div>
        </div>
      )}

      {/* Anchor target for a custom hero's "browse" CTA (only relevant when
          hideHero pages scroll down to the listing). */}
      <div className={styles.container} id={hideHero ? "tourist-visa-list" : undefined}>
        <DesktopServiceGrid subCategories={subCategories} hubTitle={title} gold={gold} />
      </div>
    </div>
  );
}
