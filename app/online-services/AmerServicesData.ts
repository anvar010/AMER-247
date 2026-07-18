export type PriceItem = {
  name: string;
  // Real amer247.com slug for the application-form URL (e.g.
  // /formAmerService/{slug}) — NOT derivable from `name` (confirmed against
  // the live site item by item), so it's stored explicitly rather than
  // generated. Falls back to a slugified `name` if absent.
  slug?: string;
  inside?: string;
  outside?: string;
  single?: string;
  // Extra detail shown on cards that have it (currently just Tourist Visa) —
  // absent everywhere else, which keeps rendering as the plain card.
  proc?: string;
  stay?: string;
  validity?: string;
  entry?: string;
  badge?: string;
  // "Application Type" tier picker (Normal/VIP/VVIP) — see the matching
  // field on components/MobileSearchOverlay/catalog.ts's CatalogItem.
  tiers?: { label: string; price: string }[];
  // See the matching field on CatalogItem — no live application-form page
  // exists yet, render as an inert, non-clickable card.
  disabled?: boolean;
};

export type SubCategory = {
  key: string;
  label: string;
  icon: string;
  items: PriceItem[];
  // Optional override for the group section heading + intro line — falls
  // back to `label` alone when absent.
  heading?: string;
  subheading?: string;
};

export const amerSubCategories: SubCategory[] = [
  {
    key: "new-entry-permits",
    label: "New Entry Permits",
    icon: "Stamp",
    items: [
      { name: "Spouse Entry Permits",                        slug: "spouse_residence_visa",          inside: "1202.90 AED", outside: "552.90 AED" },
      { name: "Son / Daughter Entry Permits",                slug: "son_daughter_residence_visa",    inside: "1202.90 AED", outside: "552.90 AED" },
      { name: "Parent's Entry Permits",                      slug: "parents_residence_visa",         inside: "1202.90 AED", outside: "552.90 AED" },
      { name: "Investor / Partner Visa",                     slug: "investor_partner_visa",          inside: "1239.90 AED", outside: "590.90 AED" },
      { name: "Employment Visa",                             slug: "employment_visa",                inside: "1239.90 AED", outside: "590.90 AED" },
      { name: "Virtual Work Visa (Remote Work Visa)",        slug: "virtual_work_visa",              inside: "1239.90 AED" },
      { name: "Job Seeker Visa (inside UAE)",                slug: "job_seeker_visa",                inside: "1669.90 AED" },
      { name: "Re-Entry Permit",                             slug: "re_entry_permit",                outside: "502.90 AED" },
    ],
  },
  {
    key: "sponsored-visit-visa",
    label: "Sponsored Visit Visa",
    icon: "Users",
    items: [
      { name: "Sponsored Visit Visa – 30 Days", slug: "sponsored_visit_visa_30_days", inside: "1264 AED", outside: "614 AED" },
      { name: "Sponsored Visit Visa – 90 Days", slug: "sponsored_visit_visa_90_days", inside: "1534 AED", outside: "864 AED" },
    ],
  },
  {
    key: "new-born-residence-visa",
    label: "New Born Residence Visa",
    icon: "HeartPulse",
    items: [
      { name: "New Born Residence Visa", slug: "new_born_residence_visa", inside: "623.90 AED" },
    ],
  },
  {
    key: "visa-extension",
    label: "Visa Extension",
    icon: "CalendarCheck",
    items: [
      { name: "Sponsored Visit Visa Extend",        slug: "visit_visa_extend",              single: "1009.90 AED" },
      { name: "Gulf Residents Visit Visa Extend",   slug: "gulf_residents_visit_visa_extend", single: "1009.90 AED" },
    ],
  },
  {
    key: "residence-visa-renewal",
    label: "Residence Visa Renewal",
    icon: "Stamp",
    items: [
      { name: "Spouse & Children Visa Renewal",   slug: "spouse_children_visa_renewal",     inside: "623.90 AED" },
      { name: "Parents Visa Renewal (01 Year)",   slug: "parents_visa_renewal",             inside: "523.90 AED" },
      { name: "Employment Visa Renewal",          slug: "employment_visa_renewal",          inside: "660.90 AED" },
      { name: "Partner / Investor Visa Renewal",  slug: "partner_investor_visa_renewal",    inside: "660.90 AED" },
      { name: "Virtual Visa Renewal",             slug: "virtual_visa_renewal",             single: "560.90 AED" },
    ],
  },
  {
    key: "residence-visa-stamping",
    label: "Residence Visa Stamping",
    icon: "Printer",
    items: [
      { name: "Spouse & Children Visa Stamping",        slug: "spouse_children_visa_stamping",        inside: "623.90 AED" },
      { name: "Parents Visa Stamping (01 Year)",        slug: "parents_visa_stamping",                inside: "523.90 AED" },
      { name: "Employment Visa Stamping",               slug: "employment_visa_stamping",             inside: "660.90 AED" },
      { name: "Partner / Investor Visa Stamping",       slug: "partner_investor_visa_stamping",       single: "660.90 AED" },
      { name: "Virtual Visa Stamping (01 Year)",        slug: "virtual_visa_stamping",                inside: "560.90 AED" },
    ],
  },
  {
    key: "cancellation",
    label: "Cancellation",
    icon: "X",
    items: [
      { name: "Family Residence Visa Cancellation",                       slug: "family_residence_visa_cancellation",       inside: "302.90 AED", outside: "402.90 AED" },
      { name: "Employment Visa Cancellation",                             slug: "employment_visa_cancellation",             inside: "339.90 AED", outside: "439.90 AED" },
      { name: "Partner / Investor Visa Cancellation",                     slug: "partner_investor_visa_cancellation",       inside: "339.90 AED", outside: "439.90 AED" },
      { name: "Virtual Work Visa Cancellation",                           slug: "virtual_work_visa_cancellation",           inside: "339.90 AED", outside: "439.90 AED" },
      // The real site shows two "Entry Permit (After Entry) – Company"
      // links with identical label text but different slugs/prices/docs —
      // not a duplicate, genuinely two different services the real site
      // doesn't visually distinguish beyond the link itself.
      { name: "Cancellation – Entry Permit (After Entry) – Company",      slug: "entry_permit_cancellation_company",        inside: "302.90 AED" },
      { name: "Cancellation – Entry Permit (After Entry) – Company",      slug: "entry_permit_cancellation_company_2",      inside: "339.90 AED" },
    ],
  },
  {
    key: "data-modification",
    label: "Data Modification",
    icon: "FileText",
    items: [
      { name: "Data Modification – Family",  slug: "data_modification_family",  single: "423.90 AED" },
      { name: "Data Modification – Company", slug: "data_modification_company", single: "461.90 AED" },
    ],
  },
  {
    key: "travel-report",
    label: "Travel Report",
    icon: "Globe",
    items: [
      { name: "Travel Report – Family",             slug: "travel_report_family",  single: "352.90 AED" },
      { name: "Travel Report – Investor / Partner",  slug: "travel_report_company", single: "388.90 AED" },
      // Real site links this to the same page as "Investor / Partner"
      // (likely an unfinished page on their end) — kept as its own working
      // item here rather than replicating that dead link.
      { name: "Travel Report – Golden Visa",        slug: "travel_report_golden_visa", single: "488.90 AED" },
    ],
  },
  {
    key: "establishment-card",
    label: "Establishment Card",
    icon: "Building2",
    items: [
      { name: "New Establishment Card with Online",          slug: "new_establishment_card_with_online",          single: "2894.90 AED" },
      { name: "New Establishment Card without Online",       slug: "new_establishment_card_without_online",       single: "590.90 AED" },
      { name: "Renewal – Establishment Card with Online",    slug: "renewal_of_establishment_card_with_online",    single: "1839.90 AED" },
      { name: "Renewal – Establishment Card without Online", slug: "renewal_of_establishment_card_without_online", single: "690.90 AED" },
    ],
  },
  {
    key: "change-status",
    label: "Change Status",
    icon: "TrendingUp",
    items: [
      { name: "Change Status – Family",                slug: "change_status_family",                single: "752.90 AED" },
      { name: "Change Status – Company",               slug: "change_status_company",               single: "789.90 AED" },
      { name: "Change Status – Sponsored Visit Visa",  slug: "change_status_sponsored_visit_visa",  single: "732.90 AED" },
    ],
  },
  {
    key: "security-deposit",
    label: "Security Deposit",
    icon: "Landmark",
    items: [
      { name: "Security Deposit", slug: "security_deposit", single: "Cost Depends on Application" },
    ],
  },
  {
    key: "holding-visa",
    label: "Holding Visa",
    icon: "ShieldCheck",
    items: [
      { name: "Holding Visa", slug: "holding_visa", single: "512.90 AED" },
    ],
  },
];
