// Transcribed from the real app's catalog (247APP/amer-247-expo/src/data/catalog.ts)
// for the 5 hubs that don't have their own data file in this codebase.
// "Amer Services" itself lives in app/online-services/AmerServicesData.ts.
import { PRICES } from "@/lib/prices";

export type CatalogItem = {
  name: string;
  // Real amer247.com slug for the application-form URL — not derivable from
  // `name` (see app/online-services/AmerServicesData.ts's PriceItem for the
  // same convention). Falls back to a slugified `name` if absent.
  slug?: string;
  inside?: string; outside?: string; single?: string;
  // Extra detail shown on cards that have it (currently just Tourist Visa) —
  // absent on every other item, which keeps rendering as the plain card.
  proc?: string; stay?: string; validity?: string; entry?: string; badge?: string;
  // "Application Type" tier picker (Normal/VIP/VVIP) — real site shows this
  // as one item/page with a dropdown that swaps the displayed price,
  // instead of one item per tier (currently only confirmed on Medical Test).
  tiers?: { label: string; price: string }[];
  // No live application-form page exists yet (e.g. the Tas-heel
  // placeholder) — render as an inert, non-clickable card instead of
  // linking anywhere.
  disabled?: boolean;
};
export type CatalogGroup = {
  key: string; label: string; icon: string; items: CatalogItem[];
  // Optional override for the group section heading + intro line — falls
  // back to `label` alone when absent.
  heading?: string; subheading?: string;
};
export type CatalogHub = { key: string; title: string; sub: string; blurb: string; gold?: boolean; groups: CatalogGroup[] };

export const OTHER_HUBS: CatalogHub[] = [
  {
    key: "golden",
    title: "Golden Visa",
    sub: "5 & 10-year residency",
    blurb: "Long-term UAE residency for investors, talent & their families.",
    gold: true,
    groups: [
      {
        key: "golden-all",
        label: "All Golden Visa Services",
        icon: "Gem",
        items: [
          { name: "Golden Visa for Commercial Investor", slug: "golden_visa_for_commercial_investor", ...PRICES.golden_visa_for_commercial_investor },
          { name: "Golden Visa for Director / Manager", slug: "golden_visa_for_director_manager", ...PRICES.golden_visa_for_director_manager },
          { name: "Golden Visa for Doctors", slug: "golden_visa_for_doctors", ...PRICES.golden_visa_for_doctors },
          { name: "Golden Visa for Engineers", slug: "golden_visa_for_engineers", ...PRICES.golden_visa_for_engineers },
          { name: "Golden Visa for New Born Baby", slug: "golden_visa_for_new_born_baby", ...PRICES.golden_visa_for_new_born_baby },
          { name: "Golden Visa for PhD Holder", slug: "golden_visa_for_phd_holder", ...PRICES.golden_visa_for_phd_holder },
          { name: "Golden Visa for Scientists", slug: "golden_visa_for_scientists", ...PRICES.golden_visa_for_scientists },
          { name: "Golden Visa for Family Members", slug: "golden_visa_for_family_members", ...PRICES.golden_visa_for_family_members },
          { name: "Golden Visa for Bachelor Degree Holder / Professionals (30,000 AED+ Salary)", slug: "golden_visa_for_bachelor_degree_holder_professionals_30000_aed_or_above_salary", ...PRICES.golden_visa_for_bachelor_degree_holder_professionals_30000_aed_or_above_salary },
          { name: "Golden Visa for Commercial Investor (2 Million Fixed Deposit)", slug: "golden_visa_for_commercial_investor_with_2_million_fixed_deposit_in_bank", ...PRICES.golden_visa_for_commercial_investor_with_2_million_fixed_deposit_in_bank },
          { name: "Golden Visa for Outstanding Student / Highschool Graduate", slug: "golden_visa_for_outstanding_student_highschool_graduate", ...PRICES.golden_visa_for_outstanding_student_highschool_graduate },
          { name: "Golden Visa for Outstanding Student / University Graduate", slug: "golden_visa_for_outstanding_student_university_graduate", ...PRICES.golden_visa_for_outstanding_student_university_graduate },
          { name: "Golden Visa for Creative People in Culture & Art", slug: "golden_visa_for_creative_people_in_culture_art", ...PRICES.golden_visa_for_creative_people_in_culture_art },
        ],
      },
    ],
  },
  {
    key: "emirates-id",
    title: "Emirates ID",
    sub: "ID applications",
    blurb: "New, renewal, replacement & sponsor-transfer Emirates ID services.",
    groups: [
      { key: "eid-newborn", label: "New Born Emirates ID", icon: "HeartPulse", items: [
        { name: "New Born Emirates ID / 1 Year", slug: "new_born_emirates_id_1_year", ...PRICES.new_born_emirates_id_1_year },
        { name: "New Born Emirates ID / 2 Year", slug: "new_born_emirates_id_2_year", ...PRICES.new_born_emirates_id_2_year },
      ] },
      // Real site's "New Residency" category only has a "1st Time Visiting"
      // variant confirmed live — no "Previously Visited UAE" page exists.
      { key: "eid-newres", label: "New Residency", icon: "IdCard", items: [
        { name: "New Residency (1st Time Visiting) / 1 Year", slug: "new_residency_1st_time_visiting_1_year", ...PRICES.new_residency_1st_time_visiting_1_year },
        { name: "New Residency (1st Time Visiting) / 2 Year", slug: "new_residency_1st_time_visiting_2_year", ...PRICES.new_residency_1st_time_visiting_2_year },
      ] },
      // { key: "eid-transfer", label: "Sponsor Transfer", icon: "Users", items: [
      //   { name: "Emirates ID Sponsor Transfer / 1 Year", slug: "emirates_id_sponsor_transfer_1_year", ...PRICES.emirates_id_sponsor_transfer_1_year },
      //   { name: "Emirates ID Sponsor Transfer / 2 Year", slug: "emirates_id_sponsor_transfer_2_year", ...PRICES.emirates_id_sponsor_transfer_2_year },
      // ] },
      { key: "eid-renewal", label: "Emirates ID Renewal", icon: "CalendarCheck", items: [
        { name: "Emirates ID Renewal / 1 Year", slug: "emirates_id_renewal_1_year", ...PRICES.emirates_id_renewal_1_year },
        { name: "Emirates ID Renewal / 2 Year", slug: "emirates_id_renewal_2_year", ...PRICES.emirates_id_renewal_2_year },
      ] },
      { key: "eid-replace", label: "Replacement / Lost", icon: "ShieldPlus", items: [
        { name: "Emirates ID Replacement / Lost", slug: "emirates_id_replacement_lost", ...PRICES.emirates_id_replacement_lost },
      ] },
      { key: "eid-golden", label: "Golden Emirates ID", icon: "Gem", items: [
        { name: "Golden Emirates ID", slug: "golden_emirates_id", ...PRICES.golden_emirates_id },
      ] },
    ],
  },
  {
    key: "tasheel",
    title: "Tas-Heel Services",
    sub: "MOL online services",
    blurb: "Tas'heel provides comprehensive online services covering the full spectrum of MOL application processes & more.",
    groups: [
      { key: "tasheel-soon", label: "Tas-heel Services", icon: "FileText", items: [
        { name: "More Tas-heel services — coming soon", single: "Available shortly", disabled: true },
      ] },
    ],
  },
  {
    key: "medical",
    title: "Medical Test",
    sub: "Medical fitness test",
    blurb: "DHA-approved medical fitness tests — Normal, VIP & VVIP processing.",
    groups: [
      // Real site has just 3 items — each opens one form with an
      // "Application Type" dropdown (Normal/VIP/VVIP) that swaps the price,
      // not 9 separate pre-split tier items.
      { key: "medical", label: "Medical Test", icon: "Stethoscope", items: [
        { name: "New Entry", slug: "new-entry", ...PRICES["new-entry"] },
        { name: "Renewal", slug: "renewal", ...PRICES.renewal },
        { name: "Golden Visa", slug: "golden-visa", ...PRICES["golden-visa"] },
      ] },
    ],
  },
  {
    key: "insurance",
    title: "Insurance",
    sub: "Health insurance plans",
    blurb: "Health insurance for employees, partners, children, spouses & parents.",
    groups: [
      { key: "insurance", label: "Insurance", icon: "ShieldPlus", items: [
        { name: "Employees (Age 18–90) · Salary below AED 4,000", slug: "insurance-for-employees-age-18-90", ...PRICES["insurance-for-employees-age-18-90"] },
        { name: "Employees / Partners / Investors (Age 18–65) · Salary AED 4,000+", slug: "insurance-for-employees-partners-investors-age-18-65", ...PRICES["insurance-for-employees-partners-investors-age-18-65"] },
        { name: "Child Son / Daughter (Age 0–5)", slug: "insurance-for-child-son-daughter-age-0-5", ...PRICES["insurance-for-child-son-daughter-age-0-5"] },
        { name: "Child Son / Daughter (Age 06–25)", slug: "insurance-for-child-son-daughter-age-06-25", ...PRICES["insurance-for-child-son-daughter-age-06-25"] },
        { name: "Daughter (Age 26–28)", slug: "insurance-for-daughter-age-26-28", ...PRICES["insurance-for-daughter-age-26-28"] },
        // Real site shows Husband + Wife together on one page/price block,
        // not as two separate items.
        { name: "Spouse (Age 18–60)", slug: "insurance-for-spouse-age-18-60", ...PRICES["insurance-for-spouse-age-18-60"] },
        { name: "Spouse (Age 61–90)", slug: "insurance-for-spouse-age-61-90", ...PRICES["insurance-for-spouse-age-61-90"] },
        { name: "Parents (Aged up to 90)", slug: "insurance-for-parents-aged-up-to-90", ...PRICES["insurance-for-parents-aged-up-to-90"] },
      ] },
    ],
  },
  {
    key: "tourist",
    title: "Tourist Visa",
    sub: "Visit visas",
    blurb: "Short-stay visit & transit visas for travellers to the UAE.",
    groups: [
      {
        key: "tourist-visas",
        label: "UAE Tourist & Transit Visas",
        heading: "Tourist Visa Services & Application",
        subheading: "Here are the services we provide",
        icon: "Plane",
        items: [
          { name: "On Arrival Visa Extension", slug: "On_arrival_visa_extension", ...PRICES.On_arrival_visa_extension, proc: "1 day", stay: "20 - 30 days" },
          { name: "96 Hours Transit Visa", slug: "96_hours_tourist_visa", ...PRICES["96_hours_tourist_visa"], proc: "Upto 2-4 days (Air Ticket Copies Required)", stay: "4 days", validity: "30 days", entry: "Single" },
          { name: "14 Days Tourist Visa", slug: "14_days_tourist_visa", ...PRICES["14_days_tourist_visa"], proc: "Upto 2-4 days", stay: "14 days", validity: "58 days", entry: "single" },
          { name: "14 Days Tourist Visa (Express)", slug: "14_days_tourist_visa_express", ...PRICES["14_days_tourist_visa_express"], proc: "Upto 24 hours", stay: "14 days", validity: "58 days", entry: "single", badge: "Express" },
          { name: "30 Days Tourist Visa (Popular)", slug: "30_days_tourist_visa_popular", ...PRICES["30_days_tourist_visa_popular"], proc: "Upto 2-4 days", stay: "30 days", validity: "58 days", entry: "single", badge: "Popular" },
          { name: "30 Days Tourist Visa (Multiple Entry)", slug: "30_days_tourist_visa_multiple_entry", ...PRICES["30_days_tourist_visa_multiple_entry"], proc: "Upto 2-4 days", stay: "30 days", validity: "58 days", entry: "Multiple" },
          { name: "30 Days Tourist Visa (Express)", slug: "30_days_tourist_visa_express", ...PRICES["30_days_tourist_visa_express"], proc: "Upto 24 hours", stay: "30 days", validity: "58 days", entry: "Single", badge: "Express" },
          { name: "60 Days Tourist Visa (Express)", slug: "60_days_tourist_visa", ...PRICES["60_days_tourist_visa"], proc: "24 Hrs", stay: "60 days", validity: "58 days", entry: "Single", badge: "Express" },
          // Real site links this to the same slug as the Express variant
          // above (a bug — that URL only ever serves the Express content),
          // so this one gets its own working slug here instead.
          { name: "60 Days Tourist Visa", slug: "60_days_tourist_visa_standard", ...PRICES["60_days_tourist_visa_standard"], proc: "Upto 2-4 days", stay: "60 days" },
          { name: "60 Days Multiple Entry", slug: "60_days_multiple_entry", ...PRICES["60_days_multiple_entry"], proc: "Upto 2-4 days", stay: "60 days" },
          // 90 Days Tourist Visa hidden for now.
          // { name: "90 Days Single Entry", slug: "90_days_single_entry", single: aed(1900), proc: "Upto 2-4 days", stay: "90 days" },
        ],
      },
      // No "Sponsored Visit Visa" section here — confirmed against the live
      // /uae-tourist-visa page, which doesn't show one. Those items are
      // real Amer Services forms (New Entry Permits / Change Status
      // groups) and already live in AmerServicesData.ts; duplicating them
      // here under the "Tourist Visa" hub title would route them to a
      // nonexistent touristVisaForm/* page.
    ],
  },
];
