// Per-service required-document checklists, keyed by the item's real
// amer247.com slug (NOT its display name — some services share a display
// name but always have distinct slugs, e.g. the two "Cancellation – Entry
// Permit (After Entry) – Company" items). Falls back to DEFAULT_DOCUMENTS
// for anything not listed. "**" footnote markers from the source site are
// dropped since this list is already numbered.
export const REQUIRED_DOCUMENTS: Record<string, string[]> = {
  // ---------------------------------------------------------------------
  // Amer Services — New Entry Permits
  // ---------------------------------------------------------------------
  spouse_residence_visa: [
    "Applicant's passport cover page",
    "Sponsor's Original Emirates ID",
    "Sponsor's Emirates ID Copy, Residence Visa Copy & Passport Copy",
    "Applicant's Passport Copy [The passport should be valid for at least 6 months]",
    "Applicant's one Digital Photo [From Studio]",
    "Marriage certificate [Attested by the UAE MOFA & Translated into Arabic]",
    "Trade Licence, MOA & Establishment card [If the Sponsor is Investor/Partner - AED 3000 Security Deposit]",
    "Labour Contract with Ministry Stamp [If the Sponsor is working in the Private Sector - Salary should be AED 4,000 or above]",
    "Arabic Salary Certificate issued by Free zone Authority [If Sponsor Working in Free Zone Sector - Salary should be AED 4,000 or above]",
    "Arabic Salary Certificate issued by Employer [If Sponsor Working in Govt./Semi Govt. Sector - Salary should be AED 4,000 or above]",
    "Once the Entry permit approved, please complete change status immediately (if the applicant is inside UAE)",
    "AED 283.15 to be paid, if the Sponsor doesn't have an active Sponsorship file",
    "Applicant's National ID required for Pakistan, Afghanistan, Iran & Iraq Nationality",
  ],
  son_daughter_residence_visa: [
    "Applicant's passport cover page",
    "Sponsor's Original Emirates ID",
    "Sponsor's Emirates ID Copy, Residence Visa Copy & Passport Copy",
    "Applicant's Passport Copy [The passport should be valid for at least 6 months]",
    "Applicant's one Digital Photo [From Studio]",
    "Birth certificate [Attested by the UAE MOFA & Translated into Arabic]",
    "Trade Licence, MOA & Establishment card [If the Sponsor is Investor/Partner - AED 3000 Security Deposit]",
    "Labour Contract with Ministry Stamp [If the Sponsor is working in the Private Sector - Salary should be AED 4,000 or above]",
    "Arabic Salary Certificate issued by Free zone Authority [If Sponsor Working in Free Zone Sector - Salary should be AED 4,000 or above]",
    "Arabic Salary Certificate issued by Employer [If Sponsor Working in Govt./Semi Govt. Sector - Salary should be AED 4,000 or above]",
    "Once the Entry permit approved, please complete change status immediately (if the applicant is inside UAE)",
    "AED 283.15 to be paid, if the Sponsor doesn't have an active Sponsorship file",
    "Mother's visa copy is to be provided if requested by the GDRFA",
    "An Unmarried letter from the sponsor is required for a daughter above the age of 18",
    "A Study letter of the applicant is required for a son above the age of 18",
    "NOC from Father Certified by Dubai Court [If Mother is the Sponsor] OR Death Certificate MOFA Attested [If father Deceased]",
    "An attested divorce certificate & custody documents of the child (in case of divorce)",
    "Applicant's National ID required for Pakistan, Afghanistan, Iran & Iraq Nationality",
  ],
  parents_residence_visa: [
    "Applicant's passport cover page",
    "Sponsor's Original Emirates ID",
    "Sponsor's Emirates ID Copy, Residence Visa Copy & Passport Copy",
    "Applicant's Passport Copy [The passport should be valid for at least 6 months]",
    "Applicant's one Digital Photo [From Studio]",
    "Attested Birth Certificate of Sponsor [Attested by the UAE MOFA & Translated into Arabic]",
    "Attested Birth Certificate of Spouse [Attested by the UAE MOFA & Translated into Arabic] - For Parents in Law",
    "Attested Marriage Certificate of Sponsor [Attested by the UAE MOFA & Translated into Arabic] - For Parents in Law",
    "Consanguinity letter / Sponsorship letter from sponsor's consulate or embassy in UAE (UAE MOFA Attested and translated into Arabic)",
    "Tenancy Contract / Ejari / Title Deed [02 Bedroom & Hall]",
    "Sponsor's Bank Statement for the Last 03 Months",
    "Trade Licence, MOA & Establishment card [If the Sponsor is an Investor/Partner]",
    "Labour Contract with Ministry Stamp [If the Sponsor is working in the Private Sector - Salary should be AED 10,000 or above]",
    "Arabic Salary Certificate issued by Free zone Authority [If Sponsor Working in Free Zone Sector - Salary should be AED 10,000 or above]",
    "Arabic Salary Certificate issued by Employer [If Sponsor Working in Govt./Semi Govt. Sector - Salary should be AED 10,000 or above]",
    "Once the Entry permit approved, please complete change status immediately (if the applicant is inside UAE)",
    "There will be a Security Deposit of AED 5000 for each parent",
    "AED 283.15 to be paid, if the Sponsor doesn't have an active Sponsorship file",
    "Applicant's National ID required for Pakistan, Afghanistan, Iran & Iraq Nationality",
  ],
  investor_partner_visa: [
    "Applicant's passport cover page",
    "Original Emirates ID of the sponsor/owner or current visa copy of the owner",
    "Trade license copy + Establishment card + Memorandum from DED or the Court (if the owner has an LLC company; not mandatory if the owner does not have a memorandum)",
    "Passport copy + 1 Digital photo with white background + current visa copy",
    "Once the Entry permit approved, please complete change status immediately (if the applicant is inside UAE)",
    "Applicant's National ID required for Pakistan, Afghanistan, Iran & Iraq Nationality",
  ],
  employment_visa: [
    "Applicant's passport cover page",
    "Sponsor's Original Emirates ID",
    "Sponsor's Emirates ID Copy, Residence Visa Copy & Passport Copy",
    "Applicant's Passport Copy [valid at least 6 months]",
    "Applicant's one Digital Photo [From Studio]",
    "Trade Licence, MOA & Establishment Card Copy",
    "Entry Permit Approval from MOHRE",
    "Once the Entry permit approved, please complete change status immediately (if the applicant is inside UAE)",
    "Applicant's National ID required for Pakistan, Afghanistan & Iraq Nationality",
  ],
  virtual_work_visa: [
    "Applicant's passport cover page",
    "Salary certificate from employer (name, position, passport number, current monthly gross salary; company letterhead + stamp)",
    "6-month bank statement showing monthly salary not less than 3,500 USD (10,000 AED) — from a UAE bank if resident inside, or from outside if resident outside",
    "Valid Health insurance for a full year from application month",
    "Letter of appointment to work remotely, from sponsor, indicating monthly salary not less than $3,500, plus Applicant's Employment contract",
    "Applicant passport copy, 1 clear digital photo on white background",
    "If applicant inside UAE on visit visa: visit visa copy; if residence visa holder: residence visa + Emirates ID copy",
    "Once the Entry permit approved, please complete change status immediately (if the applicant is inside UAE)",
  ],
  job_seeker_visa: [
    "AED 1000 deposit for 120 days",
    "Higher Academic Graduation certificate obtained within the last 2 years (MOFA UAE attested)",
    "Passport copy",
    "1 Digital photo on white background",
    "Ejari or Tenancy contract or any document proving current UAE residency",
    "After approval, must apply for Change of Status application (AED 730) since applicant is currently in the country",
    "Documents required for Change Status: New Visa copy, Passport copy",
  ],
  re_entry_permit: [
    "Sponsor's Original Emirates ID",
    "Sponsor's Emirates ID Copy & Residence Visa Copy",
    "Applicant's Emirates ID Copy & Residence Visa Copy",
    "Applicant's Passport Copy [valid at least 6 months]",
    "Letter with valid reason for staying outside more than 06 months",
    "If more than 06 months, additional AED 100 per month after the 6th month",
  ],

  // ---------------------------------------------------------------------
  // Amer Services — Visa Extension
  // ---------------------------------------------------------------------
  visit_visa_extend: [
    "Applicant Passport + Entry Permit copy",
    "Sponsor Digital ID Copy",
  ],
  gulf_residents_visit_visa_extend: [
    "Applicant GCC National ID",
    "Applicant Passport and Entry Permit",
  ],

  // ---------------------------------------------------------------------
  // Amer Services — New Born Residence Visa
  // ---------------------------------------------------------------------
  new_born_residence_visa: [
    "Sponsor's Original Emirates ID",
    "Sponsor's Emirates ID Copy, Residence Visa Copy & Passport Copy",
    "Mother's Emirates ID Copy, Residence Visa Copy & Passport Copy",
    "Applicant's Passport Copy [valid at least 6 months]",
    "Applicant's one Digital Photo [From Studio]",
    "Arabic Birth certificate",
    "Trade Licence, MOA & Establishment card [If Sponsor is Investor/Partner - AED 3000 Security Deposit]",
    "Labour Contract with Ministry Stamp [Private Sector - Min Salary AED 4,000]",
    "Salary Certificate by Free zone Authority [Free Zone - Min Salary AED 4,000]",
    "Salary Certificate by Employer [Govt./Semi Govt. - Min Salary AED 4,000]",
    "AED 283.15 to be paid, if the Sponsor doesn't have an active Sponsorship file",
    "NOC from Father Certified by Dubai Court [If Mother is Sponsor] OR Death Certificate MOFA Attested [If father Deceased]; attested divorce certificate & custody documents (in case of divorce)",
    "Applicant's National ID required for Pakistan, Afghanistan, Iran & Iraq Nationality",
  ],

  // ---------------------------------------------------------------------
  // Amer Services — Residence Visa Renewal
  // ---------------------------------------------------------------------
  spouse_children_visa_renewal: [
    "Sponsor's Original Emirates ID",
    "Sponsor's Emirates ID Copy, Residence Visa Copy & Passport Copy",
    "Applicant's Emirates ID copy & Residence Visa Copy",
    "Applicant's Passport Copy [valid at least 6 months]",
    "Applicant's one Digital Photo [From Studio]",
    "Emirates ID Application Form of the Applicant",
    "Medical FIT Certificate of the Applicant [For applicants aged 18 & above]",
    "Trade Licence, MOA & Establishment card [If Sponsor is Investor/Partner]",
    "Labour Contract with Ministry Stamp [Private Sector - Salary AED 4,000+]",
    "Arabic Salary Certificate by Free zone Authority [Free Zone - Salary AED 4,000+]",
    "Arabic Salary Certificate by Employer [Govt./Semi Govt. - Salary AED 4,000+]",
    "An Unmarried letter from the sponsor is required for a daughter above 18",
    "A Study letter of the applicant is required for a son above 18",
    "The applicant should be in the country",
  ],
  parents_visa_renewal: [
    "Sponsor's Original Emirates ID",
    "Sponsor's Emirates ID Copy, Residence Visa Copy & Passport Copy",
    "Applicant's Emirates ID copy & Residence Visa Copy",
    "Applicant's Passport Copy [valid at least 6 months]",
    "Applicant's one Digital Photo [From Studio]",
    "Emirates ID Application Form of the applicant",
    "Medical FIT Certificate of the applicant",
    "Tenancy Contract / Ejari / Title Deed [02 Bedroom & Hall]",
    "Sponsor's Bank Statement for Last 03 Months",
    "Trade Licence, MOA & Establishment card [If Sponsor is Investor/Partner]",
    "Labour Contract with Ministry Stamp [Private Sector - Salary AED 10,000+]",
    "Arabic Salary Certificate by Free zone Authority [Free Zone - Salary AED 10,000+]",
    "Arabic Salary Certificate by Employer [Govt./Semi Govt. - Salary AED 10,000+]",
    "The applicant should be in the country",
  ],
  employment_visa_renewal: [
    "Sponsor's Original Emirates ID",
    "Sponsor's Emirates ID Copy, Residence Visa Copy & Passport Copy",
    "Applicant's Emirates ID copy & Residence Visa Copy",
    "Applicant's Passport Copy [valid at least 6 months]",
    "Applicant's one Digital Photo [From Studio]",
    "Trade Licence, MOA & Establishment Card Copy",
    "Emirates ID Application Form of the Applicant",
    "Medical FIT Certificate of the Applicant",
    "The applicant should be in the country",
  ],
  partner_investor_visa_renewal: [
    "Sponsor's Original Emirates ID",
    "Sponsor's Emirates ID Copy, Residence Visa Copy & Passport Copy",
    "Applicant's Emirates ID copy & Residence Visa Copy",
    "Applicant's Passport Copy [valid at least 6 months]",
    "Applicant's one Digital Photo [From Studio]",
    "Memorandum of association from DED or the Court / agreement with Local Agent",
    "Trade license & Establishment card copy",
    "Emirates ID Application Form of the Applicant",
    "Medical FIT Certificate of the Applicant",
    "Company bank statement for the last 03/06 months (if requested by the GDRFA)",
    "The applicant should be in the country",
  ],
  virtual_visa_renewal: [
    "Applicant's Original Emirates ID",
    "Applicant's Emirates ID Copy, Residence Visa copy",
    "Applicant's Passport Copy [valid at least 6 months]",
    "Applicant's one Digital Photo [From Studio]",
    "Salary certificate issued from the company of the applicant",
    "Valid Health insurance for a full year from application month",
    "A letter of appointment to work remotely, issued from sponsor to sponsored person",
    "Emirates ID Application Form of the Applicant",
    "Medical FIT Certificate of the Applicant",
    "The applicant should be in the country",
  ],

  // ---------------------------------------------------------------------
  // Amer Services — Residence Visa Stamping
  // ---------------------------------------------------------------------
  spouse_children_visa_stamping: [
    "Sponsor's Original Emirates ID",
    "Sponsor's Emirates ID Copy, Residence Visa Copy & Passport Copy",
    "Applicant's Passport Copy [valid at least 6 months]",
    "Applicant's one Digital Photo [From Studio]",
    "Applicant's Approved Entry permit copy",
    "Emirates ID Application Form of the Applicant",
    "Medical FIT Certificate of the Applicant [For applicants aged 18 & above]",
    "Trade Licence, MOA & Establishment card [If Sponsor is Investor/Partner]",
    "Labour Contract with Ministry Stamp [Private Sector - Salary AED 4,000+]",
    "Arabic Salary Certificate by Free zone Authority [Free Zone - Salary AED 4,000+]",
    "Arabic Salary Certificate by Employer [Govt./Semi Govt. - Salary AED 4,000+]",
    "The applicant should be in the country",
  ],
  parents_visa_stamping: [
    "Sponsor's Original Emirates ID",
    "Sponsor's Emirates ID Copy, Residence Visa Copy & Passport Copy",
    "Applicant's Passport Copy [valid at least 6 months]",
    "Applicant's one Digital Photo [From Studio]",
    "Applicant's Approved Entry permit copy",
    "Emirates ID Application Form of the Applicant",
    "Medical FIT Certificate of the Applicant",
    "Tenancy Contract / Ejari / Title Deed [02 Bedroom & Hall]",
    "Sponsor's Bank Statement for Last 03 Months",
    "Trade Licence, MOA & Establishment card [If Sponsor is Investor/Partner]",
    "Labour Contract with Ministry Stamp [Private Sector - Salary AED 10,000+]",
    "Arabic Salary Certificate by Free zone Authority [Free Zone - Salary AED 10,000+]",
    "Arabic Salary Certificate by Employer [Govt./Semi Govt. - Salary AED 10,000+]",
    "The applicant should be in the country",
  ],
  employment_visa_stamping: [
    "Sponsor's Original Emirates ID",
    "Sponsor's Emirates ID Copy, Residence Visa Copy & Passport Copy",
    "Applicant's Passport Copy [valid at least 6 months]",
    "Applicant's one Digital Photo [From Studio]",
    "Applicant's Approved Entry permit copy",
    "Trade Licence, MOA & Establishment Card Copy",
    "Emirates ID Application Form of the Applicant",
    "Medical FIT Certificate of the Applicant",
    "The applicant should be in the country",
  ],
  partner_investor_visa_stamping: [
    "Sponsor's Original Emirates ID",
    "Sponsor's Emirates ID Copy, Residence Visa Copy & Passport Copy",
    "Applicant's one Digital Photo [From Studio]",
    "Memorandum of association from DED or the Court / agreement with Local Agent",
    "Trade license & Establishment card copy",
    "Applicant's Approved Entry permit copy",
    "Emirates ID Application Form of the Applicant",
    "Medical FIT Certificate of the Applicant",
    "The applicant should be in the country",
  ],
  virtual_visa_stamping: [
    "Applicant's Approved Entry Permit Copy & Passport Copy",
    "Applicant's one Digital Photo [From Studio]",
    "Salary certificate issued from the company of the applicant",
    "Valid Health insurance for a full year from application month",
    "A letter of appointment to work remotely, issued from sponsor to sponsored person",
    "Emirates ID Application Form of the Applicant",
    "Medical FIT Certificate of the Applicant",
    "The applicant should be in the country",
  ],

  // ---------------------------------------------------------------------
  // Amer Services — Cancellation
  // ---------------------------------------------------------------------
  family_residence_visa_cancellation: [
    "Sponsor's Original Emirates ID",
    "Applicant's residence Visa copy",
    "Applicant's Passport Copy",
    "If applicant has been outside less than 06 months, the sponsor should visit Immigration with the applicant's passport upon request from GDRFA-D",
  ],
  employment_visa_cancellation: [
    "Sponsor's OR Applicant's Original Emirates ID",
    "Applicant's residence Visa copy",
    "Applicant's Passport Copy",
    "Labour Card should be cancelled before applying for the Visa cancellation",
  ],
  partner_investor_visa_cancellation: [
    "Emirates ID of one of the partners or sponsors, matching the one on the Establishment card",
    "Applicant's Emirates ID copy, Residence Visa Copy & Passport copy",
    "NOC for the cancellation (company letterhead & stamp), capturing the company share division and who will retain shares in the company",
  ],
  virtual_work_visa_cancellation: [
    "Applicant's Original Emirates ID",
    "Applicant's Passport copy & Emirates ID copy",
  ],
  entry_permit_cancellation_company: [
    "Sponsor's Original Emirates ID",
    "Applicant's Passport copy",
    "Applicant's Entry permit Copy",
  ],
  entry_permit_cancellation_company_2: [
    "Applicant's Entry Permit",
    "Applicant Passport",
    "Labour Card should be cancelled before applying for the Visa cancellation",
  ],

  // ---------------------------------------------------------------------
  // Amer Services — Data Modification
  // ---------------------------------------------------------------------
  data_modification_family: [
    "Sponsor's Original Emirates ID",
    "Sponsor's Emirates ID Copy, Residence Visa Copy & Passport Copy",
    "Applicant's Emirates ID copy, Residence Visa Copy & Old Passport Copy",
    "Applicant Passport Copy [Old and New]",
    "Applicant's one Digital Photo [From Studio]",
    "The applicant should be in the country",
  ],
  data_modification_company: [
    "Sponsor's Original Emirates ID",
    "Sponsor's Emirates ID Copy, Residence Visa Copy & Passport Copy",
    "Applicant's Emirates ID copy, Residence Visa Copy & Old Passport Copy",
    "Applicant Labour Card",
    "Applicant New Passport Copy",
    "Applicant's one Digital Photo [From Studio]",
    "The applicant should be in the country",
  ],

  // ---------------------------------------------------------------------
  // Amer Services — Travel Report
  // ---------------------------------------------------------------------
  travel_report_family: [
    "Applicant Original ID",
    "Applicant Passport + Visa copy",
    "Important note: all documents must be scanned clear and in colour",
  ],
  travel_report_company: [
    "Original PRO ID card / sponsor ID + applicant (passport + visa)",
    "Or applicant ID copy",
    "Establishment card",
    "Important note: all documents must be scanned clear and in colour",
  ],
  // Real site links "Travel Report – Golden Visa" to the same page as
  // Investor/Partner (a dead-link bug on their end) — same doc list here.
  travel_report_golden_visa: [
    "Original PRO ID card / sponsor ID + applicant (passport + visa)",
    "Or applicant ID copy",
    "Establishment card",
    "Important note: all documents must be scanned clear and in colour",
  ],

  // ---------------------------------------------------------------------
  // Amer Services — Establishment Card
  // ---------------------------------------------------------------------
  new_establishment_card_with_online: [
    "Original sponsor's Emirates ID",
    "Copy of Trade License & Partner list page",
    "Passport copy of all partners",
  ],
  new_establishment_card_without_online: [
    "Copy of Establishment Card",
    "Original sponsor's Emirates ID",
    "Copy of Trade License & Partner list page",
    "Passport copy of all partners",
  ],
  renewal_of_establishment_card_with_online: [
    "Copy of Establishment Card",
    "Original sponsor's Emirates ID",
    "Copy of Trade License & Partner list page",
    "Passport copy of all partners",
  ],
  renewal_of_establishment_card_without_online: [
    "Original sponsor's Emirates ID",
    "Copy of Trade License & Partner list page",
    "Passport copy of all partners",
  ],

  // ---------------------------------------------------------------------
  // Amer Services — Change Status
  // ---------------------------------------------------------------------
  change_status_family: [
    "Sponsor's Emirates ID copy",
    "Applicant's Entry Permit Copy",
    "Applicant's Passport copy",
  ],
  change_status_company: [
    "Sponsor's Emirates ID copy",
    "Applicant's Entry Permit Copy",
    "Applicant's Passport copy",
  ],
  change_status_sponsored_visit_visa: [
    "Sponsor's Emirates ID copy",
    "Applicant's Entry Permit Copy",
    "Applicant's Passport copy",
  ],

  // ---------------------------------------------------------------------
  // Amer Services — Security Deposit / Holding Visa
  // ---------------------------------------------------------------------
  security_deposit: [
    "Entry Permit Application",
    "Sponsor ID copy",
    "Applicant Passport",
  ],
  holding_visa: [
    "Sponsor Original Emirates ID",
    "New Offer letter",
    "Applicant Passport and Visa copy",
    "Job change only possible within Dubai",
    "Warranty deposit: AED 5000",
    "Additional AED 100 for each dependent",
  ],

  // ---------------------------------------------------------------------
  // Amer Services — Sponsored Visit Visa
  // ---------------------------------------------------------------------
  sponsored_visit_visa_30_days: [
    "Sponsor's Original Emirates ID",
    "Sponsor's Emirates ID Copy, Residence Visa Copy & Passport Copy",
    "Applicant's Passport Copy [valid at least 6 months]",
    "Applicant's one Digital Photo [From Studio]",
    "Birth certificate [MOFA attested & Arabic translated] – for children",
    "Marriage certificate [MOFA attested & Arabic translated] – for spouse",
    "Sponsor Birth certificate [MOFA attested & Arabic translated] – for parents",
    "Trade Licence, MOA & Establishment card [If Sponsor is Investor/Partner]",
    "Labour Contract with Ministry Stamp [Private Sector - Min Salary AED 4,000]",
    "Salary Certificate by Free zone Authority [Free Zone - Min Salary AED 4,000]",
    "Salary Certificate by Employer [Govt./Semi Govt. - Min Salary AED 4,000]",
    "To sponsor parents or siblings, minimum salary AED 6,000 for parents and AED 8,000 for siblings",
    "AED 283.15 to be paid, if Sponsor doesn't have an active Sponsorship file",
    "Security Deposit AED 1000 for each Applicant (Refundable)",
    "NOC from Father Certified by Dubai Court [If Mother is Sponsor] OR Death Certificate MOFA Attested [If Father Deceased]",
    "Applicant's National ID required for Pakistan, Afghanistan, Iran & Iraq Nationality",
  ],
  sponsored_visit_visa_90_days: [
    "Sponsor's Original Emirates ID",
    "Sponsor's Emirates ID Copy, Residence Visa Copy & Passport Copy",
    "Applicant's Passport Copy [valid at least 6 months]",
    "Applicant's one Digital Photo [From Studio]",
    "Birth certificate [MOFA attested & Arabic translated] – for children",
    "Marriage certificate [MOFA attested & Arabic translated] – for spouse",
    "Sponsor Birth certificate [MOFA attested & Arabic translated] – for parents",
    "Trade Licence, MOA & Establishment card [If Sponsor is Investor/Partner]",
    "Labour Contract with Ministry Stamp [Private Sector - Min Salary AED 4,000]",
    "Salary Certificate by Free zone Authority [Free Zone - Min Salary AED 4,000]",
    "Salary Certificate by Employer [Govt./Semi Govt. - Min Salary AED 4,000]",
    "To sponsor parents or siblings, a minimum salary of AED 6,000 is required for parents and AED 8,000 for siblings",
    "AED 283.15 to be paid, if the Sponsor doesn't have an active Sponsorship file",
    "Security Deposit AED 1000 for each Applicant (Refundable)",
    "NOC from Father Certified by Dubai Court [If Mother is Sponsor] OR Death Certificate MOFA Attested [If father Deceased]",
    "Applicant's National ID required for Pakistan, Afghanistan, Iran & Iraq Nationality",
  ],

  // ---------------------------------------------------------------------
  // Emirates ID (applicant should be inside UAE to process every item below)
  // ---------------------------------------------------------------------
  new_born_emirates_id_1_year: [
    "Sponsor visa copy",
    "Baby's passport copy",
    "Clear digital photo of the baby",
    "Arabic birth certificate of the baby",
    "Babies born in UAE who haven't left the country qualify for the newborn category",
  ],
  new_born_emirates_id_2_year: [
    "Sponsor visa copy",
    "Passport copy of the baby",
    "One clear digital photo of the baby",
    "Arabic birth certificate of the baby",
    "Babies born in UAE who haven't left the country qualify for the newborn category",
  ],
  new_residency_1st_time_visiting_1_year: [
    "E-visa or entry permit of the applicant",
    "One clear digital photo of the applicant",
    "Passport copy of the applicant",
    "Applicant should be inside UAE to process the application",
  ],
  new_residency_1st_time_visiting_2_year: [
    "E-visa or entry permit of the applicant",
    "One clear digital photo of the applicant",
    "Passport copy of the applicant",
    "Applicant should be inside UAE to process the application",
  ],
  emirates_id_sponsor_transfer_1_year: [
    "New approved visa copy of applicant",
    "One clear digital photo of the applicant",
    "Passport copy of the applicant",
    "Previous Emirates ID copy",
    "Applicant should be inside UAE to process the application",
  ],
  emirates_id_sponsor_transfer_2_year: [
    "New approved visa copy of applicant",
    "One clear digital photo of the applicant",
    "Passport copy of the applicant",
    "Previous Emirates ID copy",
    "Applicant should be inside UAE to process the application",
  ],
  emirates_id_renewal_1_year: [
    "Passport copy of the applicant",
    "Visa copy of the applicant",
    "Previous Emirates ID copy",
    "One clear digital photo of the applicant",
    "Applicant should be inside UAE to process the application",
  ],
  emirates_id_renewal_2_year: [
    "Passport copy of the applicant",
    "Visa copy of the applicant",
    "Previous Emirates ID copy",
    "One clear digital photo of the applicant",
    "Applicant should be inside UAE to process the application",
  ],
  emirates_id_replacement_lost: [
    "Passport copy of the applicant",
    "Visa copy of the applicant",
    "Previous Emirates ID copy",
    "One clear digital photo of the applicant",
    "Applicant should be inside UAE to process the application",
  ],
  golden_emirates_id: [
    "Applicant's Golden Visa copy",
    "Applicant's passport copy",
    "One clear digital photo of the applicant",
    "Previous Emirates ID copy",
    "Applicant should be inside UAE to process the application",
  ],

  // ---------------------------------------------------------------------
  // Insurance (all plans include maternity cover for married females
  // aged 18-45, starting 40 days after policy issuance)
  // ---------------------------------------------------------------------
  "insurance-for-employees-age-18-90": [
    "Applicant Passport",
    "Applicant Entry Permit",
    "Maternity is covered for married females aged 18-45, only after 40 days from policy issuance",
  ],
  "insurance-for-employees-partners-investors-age-18-65": [
    "Applicant Passport",
    "Applicant Entry Permit",
    "Maternity is covered for married females aged 18-45, only after 40 days from policy issuance",
  ],
  "insurance-for-child-son-daughter-age-0-5": [
    "Applicant Passport",
    "Applicant Entry Permit",
    "Maternity is covered for married females aged 18-45, only after 40 days from policy issuance",
  ],
  "insurance-for-child-son-daughter-age-06-25": [
    "Applicant Passport",
    "Applicant Entry Permit",
    "Maternity is covered for married females aged 18-45, only after 40 days from policy issuance",
  ],
  "insurance-for-daughter-age-26-28": [
    "Applicant Passport",
    "Applicant Entry Permit",
    "Maternity is covered for married females aged 18-45, only after 40 days from policy issuance",
  ],
  "insurance-for-spouse-age-18-60": [
    "Applicant Passport",
    "Applicant Entry Permit",
    "Maternity is covered for married females aged 18-45, only after 40 days from policy issuance",
  ],
  "insurance-for-spouse-age-61-90": [
    "Applicant Passport",
    "Applicant Entry Permit",
    "Maternity is covered for married females aged 18-45, only after 40 days from policy issuance",
  ],
  "insurance-for-parents-aged-up-to-90": [
    "Applicant Passport",
    "Applicant Entry Permit",
    "Maternity is covered for married females aged 18-45, only after 40 days from policy issuance",
  ],

  // ---------------------------------------------------------------------
  // Medical Test (same 2 documents for all 3 items — New Entry, Renewal,
  // Golden Visa — the Application Type dropdown only changes the price)
  // ---------------------------------------------------------------------
  "new-entry": ["Applicant Passport", "Applicant Entry Permit"],
  "renewal": ["Applicant Passport", "Applicant Entry Permit"],
  "golden-visa": ["Applicant Passport", "Applicant Entry Permit"],

  // ---------------------------------------------------------------------
  // Golden Visa (every item uploads to the same 4 slots: Passport, Visa,
  // Emirates ID, Photo — regardless of what's listed below)
  // ---------------------------------------------------------------------
  golden_visa_for_commercial_investor: [
    "Passport & Visa of the Applicant",
    "Emirates ID copy of the Applicant",
    "A Digital Photo of the Applicant",
    "Auditor's professional license copy",
    "Auditor company Trade License",
    "Audit report for the previous financial year",
    "Last 3-month bank statement copy",
    "Trade license copy + establishment card copy + memorandum",
    "Applicant should be inside country for the complete process",
    "Fees – AED 2978.90 (additional AED 100 for each dependent to hold their visa)",
  ],
  golden_visa_for_director_manager: [
    "Passport & Visa of the Applicant",
    "Emirates ID copy of the Applicant",
    "A Digital Photo of the Applicant",
    "Bachelor degree or above [certificate attested from MOFA UAE; Equivalency Certificate from Ministry of Education if requested]",
    "Latest 6 months bank statement with bank stamp reflecting salary of AED 30,000 in the last 6 months",
    "Arabic Salary certificate [Free Zone - issued by Free Zone Authority/Govt., salary AED 30,000+]",
    "Labour contract [Private Sector - salary AED 30,000+]",
    "Company NOC letter for your Golden Visa",
    "Equivalency Certificate issued from MOE (mandatory)",
    "Applicant basic salary should be AED 30,000 or more",
    "The applicant must have completed a minimum of 2 years with the same employer",
    "A No Objection Certificate (NOC) must be issued by the Freezone Authorities if the applicant is employed by a Freezone company",
    "Profession should be Manager/Director/CEO on Visa",
    "Profession should be the same on Visa and Labour contract/Salary Certificate",
    "Applicant should be inside country for the complete process",
    "Fees – AED 2978.90 (additional AED 100 for each dependent to hold their visa)",
  ],
  golden_visa_for_doctors: [
    "Passport & Visa of the Applicant",
    "Emirates ID copy of the Applicant",
    "A Digital Photo of the Applicant",
    "DHA professional license copy",
    "Latest 6 months bank statement with bank stamp reflecting salary of AED 30,000 in the last 6 months",
    "Arabic Salary certificate [Free Zone - issued by Free Zone Authority/Govt., salary AED 30,000+]",
    "Labour contract [Private Sector - salary AED 30,000+]",
    "Company NOC letter for your Golden Visa",
    "The applicant must have completed a minimum of 2 years with the same employer",
    "A No Objection Certificate (NOC) must be issued by the Freezone Authorities if the applicant is employed by a Freezone company",
    "Profession should be the same on Visa and Labour contract/Salary Certificate",
    "Applicant should be inside country for the complete process",
    "Fees – AED 2978.90 (additional AED 100 for each dependent to hold their visa)",
  ],
  golden_visa_for_engineers: [
    "Passport & Visa of the Applicant",
    "Emirates ID copy of the Applicant",
    "A Digital Photo of the Applicant",
    "Engineering degree or above [certificate attested from MOFA UAE; Equivalency Certificate from Ministry of Education if requested]",
    "Latest 6 months bank statement with bank stamp reflecting salary of AED 30,000 in the last 6 months",
    "Arabic Salary certificate [Free Zone - issued by Free Zone Authority/Govt., salary AED 30,000+]",
    "Labour contract [Private Sector - salary AED 30,000+]",
    "Company NOC letter for your Golden Visa",
    "Equivalency Certificate issued from MOE (mandatory)",
    "Applicant basic salary should be AED 30,000 or more",
    "The applicant must have completed a minimum of 2 years with the same employer",
    "A No Objection Certificate (NOC) must be issued by the Freezone Authorities if the applicant is employed by a Freezone company",
    "Profession should be the same on Visa and Labour contract/Salary Certificate",
    "Applicant should be inside country for the complete process",
  ],
  golden_visa_for_new_born_baby: [
    "Sponsor Original ID",
    "Passport & Visa of the Baby",
    "A Digital Photo of the Baby",
    "Arabic Birth Certificate of the Baby",
    "Passport and visa copy of Mother",
    "Arabic Salary certificate [Free Zone - issued by Free Zone Authority/Govt.]",
    "Labour contract [Private Sector]",
    "A baby born in UAE who has not exited the country is considered a New Born category",
    "Fees – AED 1,578.90",
  ],
  golden_visa_for_phd_holder: [
    "Passport & Visa of the Applicant",
    "Emirates ID copy of the Applicant",
    "A Digital Photo of the Applicant",
    "Attested PhD Degree",
    "Equivalency Letter from Ministry of Education",
    "Company NOC letter for your Golden Visa",
    "Valid Employment Contract",
    "Last 06 months Bank Statement",
    "Applicant should be inside country for the complete process",
    "Fees – AED 2978.90 (additional AED 100 for each dependent to hold their visa)",
  ],
  golden_visa_for_scientists: [
    "Passport & Visa of the Applicant",
    "Emirates ID copy of the Applicant",
    "A Digital Photo of the Applicant",
    "Scientist License Certificate",
    "A letter of nomination from the Council of Emirates Scholars",
    "Company NOC letter for your Golden Visa",
    "Valid Employment Contract",
    "Applicant should be inside country for the complete process",
    "Fees – AED 2978.90 (additional AED 100 for each dependent to hold their visa)",
  ],
  golden_visa_for_family_members: [
    "Sponsor Original ID",
    "Passport & Visa of the Applicant",
    "Emirates ID copy of the Applicant",
    "A Digital Photo of the Applicant",
    "Attested Birth Certificate [for children]",
    "Attested Marriage Certificate [for spouse]",
    "Arabic Salary certificate [Free Zone - issued by Free Zone Authority/Govt.]",
    "Labour contract [Private Sector]",
    "Medical Fit Certificate [for 18 years and above]",
    "Applicant should be inside country for the complete process",
    "Existing UAE residents can cancel their visa only after verification of documents",
    "Fees – AED 2978.90",
  ],
  golden_visa_for_bachelor_degree_holder_professionals_30000_aed_or_above_salary: [
    "Passport & Visa of the Applicant",
    "Emirates ID copy of the Applicant",
    "A Digital Photo of the Applicant",
    "Bachelor degree or above [certificate attested from MOFA UAE; Equivalency Certificate from Ministry of Education if requested]",
    "Latest 6 months bank statement with bank stamp reflecting salary of AED 30,000 in the last 6 months",
    "Arabic Salary certificate [Free Zone - issued by Free Zone Authority/Govt., salary AED 30,000+]",
    "Labour contract [Private Sector - salary AED 30,000+]",
    "Company NOC letter for your Golden Visa",
    "Equivalency Certificate issued from MOE (mandatory)",
    "Applicant basic salary should be AED 30,000 or more",
    "The applicant must have completed a minimum of 2 years with the same employer",
    "A No Objection Certificate (NOC) must be issued by the Freezone Authorities if the applicant is employed by a Freezone company",
    "Profession should be the same on Visa and Labour contract/Salary Certificate",
    "Applicant should be inside country for the complete process",
    "Fees – AED 2978.90 (additional AED 100 for each dependent to hold their visa)",
  ],
  golden_visa_for_commercial_investor_with_2_million_fixed_deposit_in_bank: [
    "Passport & Visa of the Applicant",
    "Emirates ID copy of the Applicant",
    "A Digital Photo of the Applicant",
    "A letter from the Bank (Arabic)",
    "Letter should mention that the deposit will not break for 2 years",
    "You have to report to GDRFA if you want to withdraw the deposit",
    "Applicant should be inside country for the complete process",
    "Fees – AED 2978.90 (additional AED 100 for each dependent to hold their visa)",
  ],
  golden_visa_for_outstanding_student_highschool_graduate: [
    "Passport & Visa of the Applicant",
    "Emirates ID copy of the Applicant",
    "A Digital Photo of the Applicant",
    "Mark list showing 3.8 GPA and above",
    "Accredited university certificate",
    "ICP nomination email (screenshot)",
    "Applicant should be inside country for the complete process",
    "Fees – AED 2978.90",
  ],
  golden_visa_for_outstanding_student_university_graduate: [
    "Passport & Visa of the Applicant",
    "Emirates ID copy of the Applicant",
    "A Digital Photo of the Applicant",
    "Mark list showing 3.8 GPA and above",
    "Accredited university certificate",
    "ICP nomination email (screenshot)",
    "Applicant should be inside country for the complete process",
    "Fees – AED 2978.90 (additional AED 100 for each dependent to hold their visa)",
  ],
  golden_visa_for_creative_people_in_culture_art: [
    "Passport & Visa of the Applicant",
    "Emirates ID copy of the Applicant",
    "A Digital Photo of the Applicant",
    "Recommendation letter from Dubai Culture and Arts Authority",
    "Latest Resume",
    "Applicant should be inside country for the complete process",
    "Fees – AED 2978.90 (additional AED 100 for each dependent to hold their visa)",
  ],

  // ---------------------------------------------------------------------
  // Tourist Visa (same 2-part disclaimer for every item — the real form is
  // a 2-step flow with a dynamic passenger list, not yet replicated here)
  // ---------------------------------------------------------------------
  On_arrival_visa_extension: TOURIST_VISA_DOCS(),
  "96_hours_tourist_visa": TOURIST_VISA_DOCS(),
  "14_days_tourist_visa": TOURIST_VISA_DOCS(),
  "14_days_tourist_visa_express": TOURIST_VISA_DOCS(),
  "30_days_tourist_visa_popular": TOURIST_VISA_DOCS(),
  "30_days_tourist_visa_multiple_entry": TOURIST_VISA_DOCS(),
  "30_days_tourist_visa_express": TOURIST_VISA_DOCS(),
  "60_days_tourist_visa": TOURIST_VISA_DOCS(),
  "60_days_tourist_visa_standard": TOURIST_VISA_DOCS(),
  "60_days_multiple_entry": TOURIST_VISA_DOCS(),
  "90_days_single_entry": TOURIST_VISA_DOCS(),
};

function TOURIST_VISA_DOCS(): string[] {
  return [
    "Passport copies of all passengers (JPG/JPEG only, 1.5MB max)",
    "Photos with white background of all passengers",
    "Kindly verify with us on WhatsApp before proceeding if you hold Pakistan, Bangladesh, Uganda, Sudan, Nigeria, Lebanon, Libya, Mozambique, Ghana, Afghanistan, Ethiopia, or Cameroon nationality",
    "Travelers are required to submit a copy of their hotel reservation and ticket copy along with the application",
  ];
}

// Shown for any service without its own entry above.
export const DEFAULT_DOCUMENTS: string[] = [
  "Passport copy (valid for at least 6 months)",
  "Recent passport-size photo (white background)",
  "Emirates ID copy (if already a resident)",
  "Current visa copy (if applicable)",
];

export function getRequiredDocuments(key: string): string[] {
  return REQUIRED_DOCUMENTS[key] ?? DEFAULT_DOCUMENTS;
}
