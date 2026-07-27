export type PriceValue = {
  single?: string;
  inside?: string;
  outside?: string;
  tiers?: { label: string; price: string }[];
};

export const PRICES: Record<string, PriceValue> = {
  // --- Amer Services: New Entry Permits ---
  spouse_residence_visa: { inside: "1202.90 AED", outside: "552.90 AED" },
  son_daughter_residence_visa: { inside: "1202.90 AED", outside: "552.90 AED" },
  parents_residence_visa: { inside: "1202.90 AED", outside: "552.90 AED" },
  investor_partner_visa: { inside: "1239.90 AED", outside: "590.90 AED" },
  employment_visa: { inside: "1239.90 AED", outside: "590.90 AED" },
  virtual_work_visa: { inside: "1239.90 AED" },
  job_seeker_visa: { inside: "1669.90 AED" },
  re_entry_permit: { outside: "502.90 AED" },

  // --- Sponsored Visit Visa ---
  sponsored_visit_visa_30_days: { inside: "1264 AED", outside: "614 AED" },
  sponsored_visit_visa_90_days: { inside: "1534 AED", outside: "864 AED" },

  // --- New Born Residence Visa ---
  new_born_residence_visa: { inside: "623.90 AED" },

  // --- Visa Extension ---
  visit_visa_extend: { single: "1009.90 AED" },
  gulf_residents_visit_visa_extend: { single: "1009.90 AED" },

  // --- Residence Visa Renewal ---
  spouse_children_visa_renewal: { inside: "623.90 AED" },
  parents_visa_renewal: { inside: "523.90 AED" },
  employment_visa_renewal: { inside: "660.90 AED" },
  partner_investor_visa_renewal: { inside: "660.90 AED" },
  virtual_visa_renewal: { single: "560.90 AED" },

  // --- Residence Visa Stamping ---
  spouse_children_visa_stamping: { inside: "623.90 AED" },
  parents_visa_stamping: { inside: "523.90 AED" },
  employment_visa_stamping: { inside: "660.90 AED" },
  partner_investor_visa_stamping: { single: "660.90 AED" },
  virtual_visa_stamping: { inside: "560.90 AED" },

  // --- Cancellation ---
  family_residence_visa_cancellation: { inside: "302.90 AED", outside: "402.90 AED" },
  employment_visa_cancellation: { inside: "339.90 AED", outside: "439.90 AED" },
  partner_investor_visa_cancellation: { inside: "339.90 AED", outside: "439.90 AED" },
  virtual_work_visa_cancellation: { inside: "339.90 AED", outside: "439.90 AED" },
  entry_permit_cancellation_company: { inside: "302.90 AED" },
  entry_permit_cancellation_company_2: { inside: "339.90 AED" },

  // --- Data Modification ---
  data_modification_family: { single: "423.90 AED" },
  data_modification_company: { single: "461.90 AED" },

  // --- Travel Report ---
  travel_report_family: { single: "352.90 AED" },
  travel_report_company: { single: "388.90 AED" },
  travel_report_golden_visa: { single: "488.90 AED" },

  // --- Establishment Card ---
  new_establishment_card_with_online: { single: "2894.90 AED" },
  new_establishment_card_without_online: { single: "590.90 AED" },
  renewal_of_establishment_card_with_online: { single: "1839.90 AED" },
  renewal_of_establishment_card_without_online: { single: "690.90 AED" },

  // --- Change Status ---
  change_status_family: { single: "752.90 AED" },
  change_status_company: { single: "789.90 AED" },
  change_status_sponsored_visit_visa: { single: "732.90 AED" },

  // --- Security Deposit / Holding Visa ---
  security_deposit: { single: "Cost Depends on Application" },
  holding_visa: { single: "512.90 AED" },

  // --- Golden Visa ---
  golden_visa_for_commercial_investor: { single: "2992.90 AED" },
  golden_visa_for_director_manager: { single: "2992.90 AED" },
  golden_visa_for_doctors: { single: "2992.90 AED" },
  golden_visa_for_engineers: { single: "2992.90 AED" },
  golden_visa_for_new_born_baby: { single: "1592.90 AED" },
  golden_visa_for_phd_holder: { single: "2992.90 AED" },
  golden_visa_for_scientists: { single: "2992.90 AED" },
  golden_visa_for_family_members: { single: "2992.90 AED" },
  golden_visa_for_bachelor_degree_holder_professionals_30000_aed_or_above_salary: { single: "2992.90 AED" },
  golden_visa_for_commercial_investor_with_2_million_fixed_deposit_in_bank: { single: "2992.90 AED" },
  golden_visa_for_outstanding_student_highschool_graduate: { single: "2992.90 AED" },
  golden_visa_for_outstanding_student_university_graduate: { single: "2992.90 AED" },
  golden_visa_for_creative_people_in_culture_art: { single: "2992.90 AED" },

  // --- Emirates ID ---
  new_born_emirates_id_1_year: { single: "362.00 AED" },
  new_born_emirates_id_2_year: { single: "462.00 AED" },
  new_residency_1st_time_visiting_1_year: { single: "362.00 AED" },
  new_residency_1st_time_visiting_2_year: { single: "462.00 AED" },
  emirates_id_sponsor_transfer_1_year: { single: "362.00 AED" },
  emirates_id_sponsor_transfer_2_year: { single: "462.00 AED" },
  emirates_id_renewal_1_year: { single: "362.00 AED" },
  emirates_id_renewal_2_year: { single: "462.00 AED" },
  emirates_id_replacement_lost: { single: "562.00 AED" },
  golden_emirates_id: { single: "1262.00 AED" },

  // --- Medical Test (Normal/VIP/VVIP tiers) ---
  "new-entry": {
    single: "382.50 AED",
    tiers: [
      { label: "Normal · 24 hrs", price: "382.50 AED" },
      { label: "VIP · 06 Hours", price: "812.50 AED" },
      { label: "VVIP · 02 Hours", price: "812.50 AED" },
    ],
  },
  renewal: {
    single: "382.50 AED",
    tiers: [
      { label: "Normal · 24 hrs", price: "382.50 AED" },
      { label: "VIP · 06 Hours", price: "812.50 AED" },
      { label: "VVIP · 02 Hours", price: "812.50 AED" },
    ],
  },
  "golden-visa": {
    single: "382.50 AED",
    tiers: [
      { label: "Normal · 24 hrs", price: "382.50 AED" },
      { label: "VIP · 06 Hours", price: "812.50 AED" },
      { label: "VVIP · 02 Hours", price: "812.50 AED" },
    ],
  },

  // --- Insurance ---
  "insurance-for-employees-age-18-90": { single: "820.35 AED" },
  "insurance-for-employees-partners-investors-age-18-65": { single: "1166.75 AED" },
  "insurance-for-child-son-daughter-age-0-5": { single: "1407.30 AED" },
  "insurance-for-child-son-daughter-age-06-25": { single: "1268.70 AED" },
  "insurance-for-daughter-age-26-28": { single: "1268.70 AED" },
  "insurance-for-spouse-age-18-60": { single: "Husband 2609.55 AED · Wife 2930.85 AED" },
  "insurance-for-spouse-age-61-90": { single: "5906.55 AED" },
  "insurance-for-parents-aged-up-to-90": { single: "5906.55 AED" },

  // --- Tourist Visa ---
  On_arrival_visa_extension: { single: "1100.00 AED" },
  "96_hours_tourist_visa": { single: "400.00 AED" },
  "14_days_tourist_visa": { single: "650.00 AED" },
  "14_days_tourist_visa_express": { single: "750.00 AED" },
  "30_days_tourist_visa_popular": { single: "650.00 AED" },
  "30_days_tourist_visa_multiple_entry": { single: "900.00 AED" },
  "30_days_tourist_visa_express": { single: "750.00 AED" },
  "60_days_tourist_visa": { single: "950.00 AED" },
  "60_days_tourist_visa_standard": { single: "850.00 AED" },
  "60_days_multiple_entry": { single: "1100.00 AED" },

  // --- TEMPORARY: live payment-flow testing, remove when done ---
  test_service_do_not_use: { single: "1 AED" },
};
