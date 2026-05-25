export type PriceItem = {
  name: string;
  inside?: string;
  outside?: string;
  single?: string;
};

export type SubCategory = {
  key: string;
  label: string;
  items: PriceItem[];
};

export const amerSubCategories: SubCategory[] = [
  {
    key: "new-entry-permits",
    label: "New Entry Permits",
    items: [
      { name: "Spouse Entry Permits",                        inside: "1198.90 AED", outside: "548.90 AED" },
      { name: "Son / Daughter Entry Permits",                inside: "1198.90 AED", outside: "548.90 AED" },
      { name: "Parent's Entry Permits",                      inside: "1198.90 AED", outside: "548.90 AED" },
      { name: "Investor / Partner Visa",                     inside: "1235.90 AED", outside: "586.90 AED" },
      { name: "Employment Visa",                             inside: "1235.90 AED", outside: "586.90 AED" },
      { name: "Virtual Work Visa (Remote Work Visa)",        inside: "1235.90 AED" },
      { name: "Job Seeker Visa (inside UAE)",                inside: "1665.90 AED" },
      { name: "Re-Entry Permit",                             outside: "498.90 AED" },
    ],
  },
  {
    key: "sponsored-visit-visa",
    label: "Sponsored Visit Visa",
    items: [
      { name: "Sponsored Visit Visa – 30 Days", inside: "1260 AED", outside: "610 AED" },
      { name: "Sponsored Visit Visa – 90 Days", inside: "1530 AED", outside: "860 AED" },
    ],
  },
  {
    key: "new-born-residence-visa",
    label: "New Born Residence Visa",
    items: [
      { name: "New Born Residence Visa", inside: "619.90 AED" },
    ],
  },
  {
    key: "visa-extension",
    label: "Visa Extension",
    items: [
      { name: "Sponsored Visit Visa Extend",        single: "1005.90 AED" },
      { name: "Gulf Residents Visit Visa Extend",   single: "1005.90 AED" },
    ],
  },
  {
    key: "residence-visa-renewal",
    label: "Residence Visa Renewal",
    items: [
      { name: "Spouse & Children Visa Renewal",   inside: "619.90 AED" },
      { name: "Parents Visa Renewal (01 Year)",   inside: "519.90 AED" },
      { name: "Employment Visa Renewal",          inside: "656.90 AED" },
      { name: "Partner / Investor Visa Renewal",  inside: "656.90 AED" },
      { name: "Virtual Visa Renewal",             inside: "556.90 AED" },
    ],
  },
  {
    key: "residence-visa-stamping",
    label: "Residence Visa Stamping",
    items: [
      { name: "Spouse & Children Visa Stamping",        inside: "619.90 AED" },
      { name: "Parents Visa Stamping (01 Year)",        inside: "519.90 AED" },
      { name: "Employment Visa Stamping",               inside: "656.90 AED" },
      { name: "Partner / Investor Visa Stamping",       inside: "656.90 AED" },
      { name: "Virtual Visa Stamping (01 Year)",        inside: "556.90 AED" },
    ],
  },
  {
    key: "cancellation",
    label: "Cancellation",
    items: [
      { name: "Family Residence Visa Cancellation",                       inside: "298.90 AED", outside: "398.90 AED" },
      { name: "Employment Visa Cancellation",                             inside: "335.90 AED", outside: "435.90 AED" },
      { name: "Partner / Investor Visa Cancellation",                     inside: "335.90 AED", outside: "435.90 AED" },
      { name: "Virtual Work Visa Cancellation",                           inside: "335.90 AED", outside: "435.90 AED" },
      { name: "Cancellation – Entry Permit (After Entry) – Family",       inside: "298.90 AED" },
      { name: "Cancellation – Entry Permit (After Entry) – Company",      inside: "335.90 AED" },
    ],
  },
  {
    key: "data-modification",
    label: "Data Modification",
    items: [
      { name: "Data Modification – Family",  single: "419.90 AED" },
      { name: "Data Modification – Company", single: "457.90 AED" },
    ],
  },
  {
    key: "travel-report",
    label: "Travel Report",
    items: [
      { name: "Travel Report – Family",            single: "348.90 AED" },
      { name: "Travel Report – Investor / Partner", single: "384.90 AED" },
      { name: "Travel Report – Golden Visa",       single: "484.90 AED" },
    ],
  },
  {
    key: "establishment-card",
    label: "Establishment Card",
    items: [
      { name: "New Establishment Card with Online",         single: "2890.90 AED" },
      { name: "New Establishment Card without Online",      single: "586.90 AED" },
      { name: "Renewal – Establishment Card with Online",   single: "1835.90 AED" },
      { name: "Renewal – Establishment Card without Online", single: "686.90 AED" },
    ],
  },
  {
    key: "change-status",
    label: "Change Status",
    items: [
      { name: "Change Status – Family",                single: "748.90 AED" },
      { name: "Change Status – Company",               single: "785.90 AED" },
      { name: "Change Status – Sponsored Visit Visa",  single: "728.90 AED" },
    ],
  },
  {
    key: "security-deposit",
    label: "Security Deposit",
    items: [
      { name: "Security Deposit", single: "Cost Depends on Application" },
    ],
  },
  {
    key: "holding-visa",
    label: "Holding Visa",
    items: [
      { name: "Holding Visa", single: "508.90 AED" },
    ],
  },
];
