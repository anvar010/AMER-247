import { PRICES } from "@/lib/prices";

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
      { name: "Spouse Entry Permits",                 slug: "spouse_residence_visa",       ...PRICES.spouse_residence_visa },
      { name: "Son / Daughter Entry Permits",         slug: "son_daughter_residence_visa", ...PRICES.son_daughter_residence_visa },
      { name: "Parent's Entry Permits",                slug: "parents_residence_visa",      ...PRICES.parents_residence_visa },
      { name: "Investor / Partner Visa",               slug: "investor_partner_visa",       ...PRICES.investor_partner_visa },
      { name: "Employment Visa",                       slug: "employment_visa",             ...PRICES.employment_visa },
      { name: "Virtual Work Visa (Remote Work Visa)",  slug: "virtual_work_visa",           ...PRICES.virtual_work_visa },
      { name: "Job Seeker Visa (inside UAE)",          slug: "job_seeker_visa",             ...PRICES.job_seeker_visa },
      { name: "Re-Entry Permit (Only For Family)",     slug: "re_entry_permit",             ...PRICES.re_entry_permit },
    ],
  },
  {
    key: "sponsored-visit-visa",
    label: "Sponsored Visit Visa",
    icon: "Users",
    items: [
      { name: "Sponsored Visit Visa – 30 Days", slug: "sponsored_visit_visa_30_days", ...PRICES.sponsored_visit_visa_30_days },
      { name: "Sponsored Visit Visa – 90 Days", slug: "sponsored_visit_visa_90_days", ...PRICES.sponsored_visit_visa_90_days },
    ],
  },
  {
    key: "new-born-residence-visa",
    label: "New Born Residence Visa",
    icon: "HeartPulse",
    items: [
      { name: "New Born Residence Visa", slug: "new_born_residence_visa", ...PRICES.new_born_residence_visa },
    ],
  },
  {
    key: "visa-extension",
    label: "Visa Extension",
    icon: "CalendarCheck",
    items: [
      { name: "Sponsored Visit Visa Extend",      slug: "visit_visa_extend",               ...PRICES.visit_visa_extend },
      { name: "Gulf Residents Visit Visa Extend", slug: "gulf_residents_visit_visa_extend", ...PRICES.gulf_residents_visit_visa_extend },
    ],
  },
  {
    key: "residence-visa-renewal",
    label: "Residence Visa Renewal",
    icon: "Stamp",
    items: [
      { name: "Spouse & Children Visa Renewal",  slug: "spouse_children_visa_renewal",  ...PRICES.spouse_children_visa_renewal },
      { name: "Parents Visa Renewal (01 Year)",  slug: "parents_visa_renewal",          ...PRICES.parents_visa_renewal },
      { name: "Employment Visa Renewal",         slug: "employment_visa_renewal",       ...PRICES.employment_visa_renewal },
      { name: "Partner / Investor Visa Renewal", slug: "partner_investor_visa_renewal", ...PRICES.partner_investor_visa_renewal },
      { name: "Virtual Visa Renewal",            slug: "virtual_visa_renewal",          ...PRICES.virtual_visa_renewal },
    ],
  },
  {
    key: "residence-visa-stamping",
    label: "Residence Visa Stamping",
    icon: "Printer",
    items: [
      { name: "Spouse & Children Visa Stamping",  slug: "spouse_children_visa_stamping",  ...PRICES.spouse_children_visa_stamping },
      { name: "Parents Visa Stamping (01 Year)",  slug: "parents_visa_stamping",          ...PRICES.parents_visa_stamping },
      { name: "Employment Visa Stamping",         slug: "employment_visa_stamping",       ...PRICES.employment_visa_stamping },
      { name: "Partner / Investor Visa Stamping", slug: "partner_investor_visa_stamping", ...PRICES.partner_investor_visa_stamping },
      { name: "Virtual Visa Stamping (01 Year)",  slug: "virtual_visa_stamping",          ...PRICES.virtual_visa_stamping },
    ],
  },
  {
    key: "cancellation",
    label: "Cancellation",
    icon: "X",
    items: [
      { name: "Family Residence Visa Cancellation",   slug: "family_residence_visa_cancellation",   ...PRICES.family_residence_visa_cancellation },
      { name: "Employment Visa Cancellation",         slug: "employment_visa_cancellation",         ...PRICES.employment_visa_cancellation },
      { name: "Partner / Investor Visa Cancellation", slug: "partner_investor_visa_cancellation",   ...PRICES.partner_investor_visa_cancellation },
      { name: "Virtual Work Visa Cancellation",       slug: "virtual_work_visa_cancellation",       ...PRICES.virtual_work_visa_cancellation },
      // The real site shows two "Entry Permit (After Entry) – Company"
      // links with identical label text but different slugs/prices/docs —
      // not a duplicate, genuinely two different services the real site
      // doesn't visually distinguish beyond the link itself.
      { name: "Cancellation – Entry Permit (After Entry) – Company", slug: "entry_permit_cancellation_company",   ...PRICES.entry_permit_cancellation_company },
      { name: "Cancellation – Entry Permit (After Entry) – Company", slug: "entry_permit_cancellation_company_2", ...PRICES.entry_permit_cancellation_company_2 },
    ],
  },
  {
    key: "data-modification",
    label: "Data Modification",
    icon: "FileText",
    items: [
      { name: "Data Modification – Family",  slug: "data_modification_family",  ...PRICES.data_modification_family },
      { name: "Data Modification – Company", slug: "data_modification_company", ...PRICES.data_modification_company },
      { name: "Data Modification – Golden Visa", slug: "data_modification_golden_visa", ...PRICES.data_modification_golden_visa },
    ],
  },
  {
    key: "travel-report",
    label: "Travel Report",
    icon: "Globe",
    items: [
      { name: "Travel Report – Family",             slug: "travel_report_family", ...PRICES.travel_report_family },
      { name: "Travel Report – Investor / Partner", slug: "travel_report_company", ...PRICES.travel_report_company },
      // Real site links this to the same page as "Investor / Partner"
      // (likely an unfinished page on their end) — kept as its own working
      // item here rather than replicating that dead link.
      { name: "Travel Report – Golden Visa", slug: "travel_report_golden_visa", ...PRICES.travel_report_golden_visa },
      { name: "Travel Report for Employees", slug: "travel_report_employees", ...PRICES.travel_report_employees },
    ],
  },
  {
    key: "establishment-card",
    label: "Establishment Card",
    icon: "Building2",
    items: [
      { name: "New Establishment Card with Online",          slug: "new_establishment_card_with_online",          ...PRICES.new_establishment_card_with_online },
      { name: "New Establishment Card without Online",       slug: "new_establishment_card_without_online",       ...PRICES.new_establishment_card_without_online },
      { name: "Renewal – Establishment Card with Online",    slug: "renewal_of_establishment_card_with_online",    ...PRICES.renewal_of_establishment_card_with_online },
      { name: "Renewal – Establishment Card without Online", slug: "renewal_of_establishment_card_without_online", ...PRICES.renewal_of_establishment_card_without_online },
    ],
  },
  {
    key: "change-status",
    label: "Change Status",
    icon: "TrendingUp",
    items: [
      { name: "Change Status – Family",               slug: "change_status_family",               ...PRICES.change_status_family },
      { name: "Change Status – Company",              slug: "change_status_company",              ...PRICES.change_status_company },
      { name: "Change Status – Sponsored Visit Visa", slug: "change_status_sponsored_visit_visa", ...PRICES.change_status_sponsored_visit_visa },
    ],
  },
  {
    key: "security-deposit",
    label: "Security Deposit",
    icon: "Landmark",
    items: [
      { name: "Security Deposit", slug: "security_deposit", ...PRICES.security_deposit },
    ],
  },
  {
    key: "holding-visa",
    label: "Holding Visa",
    icon: "ShieldCheck",
    items: [
      { name: "Holding Visa", slug: "holding_visa", ...PRICES.holding_visa },
    ],
  },
  // TEMPORARY: live payment-flow testing, remove when done.
  {
    key: "test-service",
    label: "Test Service (Do Not Use)",
    icon: "Wrench",
    items: [
      { name: "Test Service (Do Not Use)", slug: "test_service_do_not_use", ...PRICES.test_service_do_not_use },
    ],
  },
];
