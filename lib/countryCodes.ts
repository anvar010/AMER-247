export type CountryCode = {
  iso2: string;
  name: string;
  dial: string;
};

export const COUNTRY_CODES: CountryCode[] = [
  { iso2: "ae", name: "United Arab Emirates", dial: "+971" },
  { iso2: "sa", name: "Saudi Arabia", dial: "+966" },
  { iso2: "om", name: "Oman", dial: "+968" },
  { iso2: "qa", name: "Qatar", dial: "+974" },
  { iso2: "bh", name: "Bahrain", dial: "+973" },
  { iso2: "kw", name: "Kuwait", dial: "+965" },
  { iso2: "eg", name: "Egypt", dial: "+20" },
  { iso2: "jo", name: "Jordan", dial: "+962" },
  { iso2: "lb", name: "Lebanon", dial: "+961" },
  { iso2: "iq", name: "Iraq", dial: "+964" },
  { iso2: "sy", name: "Syria", dial: "+963" },
  { iso2: "ye", name: "Yemen", dial: "+967" },
  { iso2: "sd", name: "Sudan", dial: "+249" },
  { iso2: "ma", name: "Morocco", dial: "+212" },
  { iso2: "tn", name: "Tunisia", dial: "+216" },
  { iso2: "dz", name: "Algeria", dial: "+213" },
  { iso2: "ly", name: "Libya", dial: "+218" },
  { iso2: "in", name: "India", dial: "+91" },
  { iso2: "pk", name: "Pakistan", dial: "+92" },
  { iso2: "bd", name: "Bangladesh", dial: "+880" },
  { iso2: "np", name: "Nepal", dial: "+977" },
  { iso2: "lk", name: "Sri Lanka", dial: "+94" },
  { iso2: "ph", name: "Philippines", dial: "+63" },
  { iso2: "id", name: "Indonesia", dial: "+62" },
  { iso2: "my", name: "Malaysia", dial: "+60" },
  { iso2: "cn", name: "China", dial: "+86" },
  { iso2: "ng", name: "Nigeria", dial: "+234" },
  { iso2: "gh", name: "Ghana", dial: "+233" },
  { iso2: "ug", name: "Uganda", dial: "+256" },
  { iso2: "et", name: "Ethiopia", dial: "+251" },
  { iso2: "cm", name: "Cameroon", dial: "+237" },
  { iso2: "mz", name: "Mozambique", dial: "+258" },
  { iso2: "af", name: "Afghanistan", dial: "+93" },
  { iso2: "gb", name: "United Kingdom", dial: "+44" },
  { iso2: "us", name: "United States", dial: "+1" },
  { iso2: "ca", name: "Canada", dial: "+1" },
  { iso2: "au", name: "Australia", dial: "+61" },
  { iso2: "de", name: "Germany", dial: "+49" },
  { iso2: "fr", name: "France", dial: "+33" },
  { iso2: "ru", name: "Russia", dial: "+7" },
  { iso2: "tr", name: "Turkey", dial: "+90" },
];

export function findCountry(iso2: string): CountryCode {
  return COUNTRY_CODES.find((c) => c.iso2 === iso2) ?? COUNTRY_CODES[0];
}
