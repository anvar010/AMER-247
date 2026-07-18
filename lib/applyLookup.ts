import { amerSubCategories, type PriceItem } from "@/app/online-services/AmerServicesData";
import { OTHER_HUBS } from "@/components/MobileSearchOverlay/catalog";
import { HUB_FORM_PREFIX, slugify } from "@/lib/applyLink";

export type ResolvedApplyItem = { item: PriceItem; hub: string };

function matches(item: { name: string; slug?: string }, slug: string): boolean {
  return (item.slug ?? slugify(item.name)) === slug;
}

// Reverse of buildApplyHref: given the URL's (formPrefix, slug), finds the
// matching catalog item — preferring each item's explicit `slug` (the real
// site's slugs aren't derived from the item name), falling back to
// slugify(name) for items not yet confirmed against the live site.
export function findByFormPath(formPrefix: string, slug: string): ResolvedApplyItem | null {
  const hubTitles = Object.entries(HUB_FORM_PREFIX)
    .filter(([, prefix]) => prefix === formPrefix)
    .map(([title]) => title);
  if (hubTitles.length === 0) return null;

  if (hubTitles.includes("Amer Services") || hubTitles.includes("AMER Services")) {
    for (const group of amerSubCategories) {
      for (const item of group.items) {
        if (matches(item, slug)) return { item, hub: "Amer Services" };
      }
    }
  }

  for (const hub of OTHER_HUBS) {
    if (!hubTitles.includes(hub.title)) continue;
    for (const group of hub.groups) {
      for (const item of group.items) {
        if (matches(item, slug)) return { item, hub: hub.title };
      }
    }
  }

  return null;
}
