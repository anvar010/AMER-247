// Transcribed from the real app's catalog (247APP/amer-247-expo/src/data/catalog.ts)
// for the 5 hubs that don't have their own data file in this codebase.
// "Amer Services" itself lives in app/online-services/AmerServicesData.ts.
export type CatalogItem = { name: string; inside?: string; outside?: string; single?: string };
export type CatalogGroup = { label: string; items: CatalogItem[] };
export type CatalogHub = { key: string; title: string; sub: string; groups: CatalogGroup[] };

const aed = (n: number) => `${n.toFixed(2)} AED`;

export const OTHER_HUBS: CatalogHub[] = [
  {
    key: "golden",
    title: "Golden Visa",
    sub: "5 & 10-year residency",
    groups: [
      {
        label: "All Golden Visa Services",
        items: [
          { name: "Golden Visa for Commercial Investor", single: aed(2988.90) },
          { name: "Golden Visa for Director / Manager", single: aed(2988.90) },
          { name: "Golden Visa for Doctors", single: aed(2988.90) },
          { name: "Golden Visa for Engineers", single: aed(2988.90) },
          { name: "Golden Visa for New Born Baby", single: aed(1588.90) },
          { name: "Golden Visa for PhD Holder", single: aed(2988.90) },
          { name: "Golden Visa for Scientists", single: aed(2988.90) },
          { name: "Golden Visa for Family Members", single: aed(2988.90) },
          { name: "Golden Visa for Bachelor Degree Holder / Professionals (30,000 AED+ Salary)", single: aed(2988.90) },
          { name: "Golden Visa for Commercial Investor (2 Million Fixed Deposit)", single: aed(2988.90) },
          { name: "Golden Visa for Outstanding Student / Highschool Graduate", single: aed(2988.90) },
          { name: "Golden Visa for Outstanding Student / University Graduate", single: aed(2988.90) },
          { name: "Golden Visa for Creative People in Culture & Art", single: aed(2988.90) },
        ],
      },
    ],
  },
  {
    key: "emirates-id",
    title: "Emirates ID",
    sub: "ID applications",
    groups: [
      { label: "New Born Emirates ID", items: [
        { name: "New Born Emirates ID / 1 Year", single: aed(362) },
        { name: "New Born Emirates ID / 2 Year", single: aed(462) },
      ] },
      { label: "New Residency", items: [
        { name: "New Residency (1st Time Visiting) / 1 Year", single: aed(362) },
        { name: "New Residency (1st Time Visiting) / 2 Year", single: aed(462) },
        { name: "New Residency (Previously Visited UAE) / 1 Year", single: aed(362) },
        { name: "New Residency (Previously Visited UAE) / 2 Year", single: aed(462) },
      ] },
      { label: "Sponsor Transfer", items: [
        { name: "Emirates ID Sponsor Transfer / 1 Year", single: aed(362) },
        { name: "Emirates ID Sponsor Transfer / 2 Year", single: aed(462) },
      ] },
      { label: "Emirates ID Renewal", items: [
        { name: "Emirates ID Renewal / 1 Year", single: aed(362) },
        { name: "Emirates ID Renewal / 2 Year", single: aed(462) },
      ] },
      { label: "Replacement / Lost", items: [
        { name: "Emirates ID Replacement / Lost", single: aed(562) },
      ] },
      { label: "Golden Emirates ID", items: [
        { name: "Golden Emirates ID", single: aed(1262) },
      ] },
    ],
  },
  {
    key: "tasheel",
    title: "Tas-Heel Services",
    sub: "MOL online services",
    groups: [
      { label: "Tas-heel Services", items: [
        { name: "More Tas-heel services — coming soon", single: "Available shortly" },
      ] },
    ],
  },
  {
    key: "medical",
    title: "Medical Test",
    sub: "Medical fitness test",
    groups: [
      { label: "Medical Test", items: [
        { name: "New Entry — Normal · 24 hrs", single: aed(382.50) },
        { name: "New Entry — VIP · 06 hrs", single: aed(812.50) },
        { name: "New Entry — VVIP · 02 hrs", single: aed(812.50) },
        { name: "Renewal — Normal · 24 hrs", single: aed(382.50) },
        { name: "Renewal — VIP · 06 hrs", single: aed(812.50) },
        { name: "Renewal — VVIP · 02 hrs", single: aed(812.50) },
        { name: "Golden Visa — Normal · 24 hrs", single: aed(382.50) },
        { name: "Golden Visa — VIP · 06 hrs", single: aed(812.50) },
        { name: "Golden Visa — VVIP · 02 hrs", single: aed(812.50) },
      ] },
    ],
  },
  {
    key: "insurance",
    title: "Insurance",
    sub: "Health insurance plans",
    groups: [
      { label: "Insurance", items: [
        { name: "Employees (Age 18–90) · Salary below AED 4,000", single: aed(816.35) },
        { name: "Employees / Partners / Investors (Age 18–65) · Salary AED 4,000+", single: aed(1162.75) },
        { name: "Child Son / Daughter (Age 0–5)", single: aed(1403.30) },
        { name: "Child Son / Daughter (Age 06–25)", single: aed(1264.70) },
        { name: "Daughter (Age 26–28)", single: aed(1264.70) },
        { name: "Spouse (Age 18–60) — Husband", single: aed(2605.55) },
        { name: "Spouse (Age 18–60) — Wife", single: aed(2926.85) },
        { name: "Spouse (Age 61–90) — Husband", single: aed(5902.55) },
        { name: "Spouse (Age 61–90) — Wife", single: aed(5902.55) },
        { name: "Parents (Aged up to 90)", single: aed(5902.55) },
      ] },
    ],
  },
];
