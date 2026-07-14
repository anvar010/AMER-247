// Transcribed from the real app's catalog (247APP/amer-247-expo/src/data/catalog.ts)
// for the 5 hubs that don't have their own data file in this codebase.
// "Amer Services" itself lives in app/online-services/AmerServicesData.ts.
export type CatalogItem = { name: string; inside?: string; outside?: string; single?: string };
export type CatalogGroup = { key: string; label: string; icon: string; items: CatalogItem[] };
export type CatalogHub = { key: string; title: string; sub: string; blurb: string; gold?: boolean; groups: CatalogGroup[] };

const aed = (n: number) => `${n.toFixed(2)} AED`;

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
    blurb: "New, renewal, replacement & sponsor-transfer Emirates ID services.",
    groups: [
      { key: "eid-newborn", label: "New Born Emirates ID", icon: "HeartPulse", items: [
        { name: "New Born Emirates ID / 1 Year", single: aed(362) },
        { name: "New Born Emirates ID / 2 Year", single: aed(462) },
      ] },
      { key: "eid-newres", label: "New Residency", icon: "IdCard", items: [
        { name: "New Residency (1st Time Visiting) / 1 Year", single: aed(362) },
        { name: "New Residency (1st Time Visiting) / 2 Year", single: aed(462) },
        { name: "New Residency (Previously Visited UAE) / 1 Year", single: aed(362) },
        { name: "New Residency (Previously Visited UAE) / 2 Year", single: aed(462) },
      ] },
      { key: "eid-transfer", label: "Sponsor Transfer", icon: "Users", items: [
        { name: "Emirates ID Sponsor Transfer / 1 Year", single: aed(362) },
        { name: "Emirates ID Sponsor Transfer / 2 Year", single: aed(462) },
      ] },
      { key: "eid-renewal", label: "Emirates ID Renewal", icon: "CalendarCheck", items: [
        { name: "Emirates ID Renewal / 1 Year", single: aed(362) },
        { name: "Emirates ID Renewal / 2 Year", single: aed(462) },
      ] },
      { key: "eid-replace", label: "Replacement / Lost", icon: "ShieldPlus", items: [
        { name: "Emirates ID Replacement / Lost", single: aed(562) },
      ] },
      { key: "eid-golden", label: "Golden Emirates ID", icon: "Gem", items: [
        { name: "Golden Emirates ID", single: aed(1262) },
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
        { name: "More Tas-heel services — coming soon", single: "Available shortly" },
      ] },
    ],
  },
  {
    key: "medical",
    title: "Medical Test",
    sub: "Medical fitness test",
    blurb: "DHA-approved medical fitness tests — Normal, VIP & VVIP processing.",
    groups: [
      { key: "medical", label: "Medical Test", icon: "Stethoscope", items: [
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
    blurb: "Health insurance for employees, partners, children, spouses & parents.",
    groups: [
      { key: "insurance", label: "Insurance", icon: "ShieldPlus", items: [
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
  {
    key: "tourist",
    title: "Tourist Visa",
    sub: "Visit visas",
    blurb: "Short-stay visit & transit visas for travellers to the UAE.",
    groups: [
      {
        key: "tourist-visas",
        label: "UAE Tourist & Transit Visas",
        icon: "Plane",
        items: [
          { name: "On-Arrival Visa Extension", single: aed(1100) },
          { name: "96 Hours Transit Visa", single: aed(400) },
          { name: "14 Days Tourist Visa", single: aed(650) },
          { name: "14 Days Tourist Visa — Express", single: aed(750) },
          { name: "30 Days Tourist Visa", single: aed(650) },
          { name: "30 Days Multiple Entry", single: aed(900) },
          { name: "30 Days Tourist Visa — Express", single: aed(750) },
          { name: "60 Days Tourist Visa — Express", single: aed(950) },
          { name: "60 Days Tourist Visa", single: aed(850) },
          { name: "60 Days Multiple Entry", single: aed(1100) },
          { name: "90 Days Single Entry", single: aed(1900) },
        ],
      },
      {
        key: "sponsored-visit",
        label: "Sponsored Visit Visa",
        icon: "Users",
        items: [
          { name: "Sponsored Visit Visa – 30 Days", inside: aed(1260), outside: aed(610) },
          { name: "Sponsored Visit Visa – 90 Days", inside: aed(1530), outside: aed(860) },
        ],
      },
    ],
  },
];
