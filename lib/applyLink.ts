// Per-hub URL prefix for the application form, matching the real site's
// scheme (e.g. /formAmerService/spouse_entry_permits) — each hub has its own,
// not-fully-predictable prefix, so this is an explicit map rather than a
// mechanical transform of the hub title.
export const HUB_FORM_PREFIX: Record<string, string> = {
  "Amer Services": "formAmerService",
  "AMER Services": "formAmerService",
  "Emirates ID": "formEmirateId",
  "Golden Visa": "formGoldenVisa",
  "Medical Test": "medicalTestForm",
  "Insurance": "insuranceForm",
  "Tourist Visa": "touristVisaForm",
};

// lowercase, strip punctuation, collapse whitespace to underscores — e.g.
// "New Born Emirates ID / 1 Year" -> "new_born_emirates_id_1_year".
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .trim()
    .replace(/\s+/g, "_");
}

// Builds the application-form URL for a priced service, e.g.
// /formAmerService/spouse_residence_visa — price isn't carried in the URL;
// the destination page looks the item back up by (hub, slug) and reads its
// price fresh from the same catalog this was built from.
//
// Real slugs on amer247.com are NOT a mechanical transform of the item name
// (e.g. "Spouse Entry Permits" -> spouse_residence_visa, not
// spouse_entry_permits) — every item that's been confirmed against the live
// site carries its own explicit `slug`. slugify() is only a fallback for
// items not yet confirmed.
//
// Every hub that's actually clickable is in HUB_FORM_PREFIX (a hub with no
// real form page yet, e.g. Tas-heel's "coming soon" placeholder, is marked
// `disabled` on the item instead and never reaches this function — there's
// no /apply?... fallback route to send it to).
export function buildApplyHref(
  item: { name: string; slug?: string },
  hub: string
): string {
  const prefix = HUB_FORM_PREFIX[hub];
  return `/${prefix}/${item.slug ?? slugify(item.name)}`;
}

const APPLY_FORM_PREFIXES = Array.from(new Set(Object.values(HUB_FORM_PREFIX)));

// True for every path-based application-form route (/formAmerService/...,
// /formEmirateId/..., etc.) — used by Header/MobileBottomNav to treat all
// of them as "the apply flow".
export function isApplyFormRoute(pathname: string): boolean {
  return APPLY_FORM_PREFIXES.some((prefix) => pathname.startsWith(`/${prefix}/`));
}
