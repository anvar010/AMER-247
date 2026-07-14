import { amerSubCategories } from "@/app/online-services/AmerServicesData";
import { buildApplyHref } from "@/lib/applyLink";
import { OTHER_HUBS } from "./catalog";

export type SearchResult = {
  label: string;
  sub: string;
  href: string;
};

// Same shape as the real app's SEARCH_INDEX: every individually priced
// service across every hub, each carrying its hub's title/sub so a search
// like "golden visa" matches every item in that hub, not just ones whose
// own name happens to contain the words. A match always opens that exact
// service's application form — there is no "browse the category" result.
const AMER_SERVICES: SearchResult[] = amerSubCategories.flatMap((group) =>
  group.items.map((item) => ({
    label: item.name,
    sub: `${group.label} · Amer Services`,
    hay: `${item.name} ${group.label} Amer Services Entry permits, residency & more`,
    href: buildApplyHref(item, group.label),
  }))
);

const OTHER_SERVICES: SearchResult[] = OTHER_HUBS.flatMap((hub) =>
  hub.groups.flatMap((group) =>
    group.items.map((item) => ({
      label: item.name,
      sub: `${group.label} · ${hub.title}`,
      hay: `${item.name} ${group.label} ${hub.title} ${hub.sub}`,
      href: buildApplyHref(item, hub.title),
    }))
  )
);

const INDEXED = [...AMER_SERVICES, ...OTHER_SERVICES] as (SearchResult & { hay: string })[];

// Verbatim from the real app's HomeScreen SearchModal (SUGGESTIONS).
export const POPULAR_SEARCHES = [
  "Entry Permit", "Emirates ID Renewal", "Tourist Visa", "Golden Visa",
  "Residency Stamping", "Medical Fitness Test", "Health Insurance", "Business Setup",
  "Emirates ID New", "Family Visa", "Overstay Fine", "Visit Visa Extension",
];

/**
 * Same word-split AND-match-with-fallback algorithm as the real app: split
 * the query into words, score each entry by how many words it contains,
 * prefer entries matching every word, and if none match every word, fall
 * back to the best partial ("related") matches instead of showing nothing.
 */
export function searchMatches(query: string): { results: SearchResult[]; isFallback: boolean } {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return { results: [], isFallback: false };

  const scored = INDEXED.map((r) => {
    const hay = r.hay.toLowerCase();
    const matched = words.filter((w) => hay.includes(w)).length;
    return { r, matched };
  }).filter((s) => s.matched > 0);

  scored.sort((a, b) => b.matched - a.matched);

  const exact = scored.filter((s) => s.matched === words.length);
  const pool = exact.length > 0 ? exact : scored;
  return {
    results: pool.slice(0, 20).map((s) => ({ label: s.r.label, sub: s.r.sub, href: s.r.href })),
    isFallback: exact.length === 0 && scored.length > 0,
  };
}
