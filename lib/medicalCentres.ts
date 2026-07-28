// DHA-approved medical fitness test centres — customers can visit any of
// these to complete their visa medical (per master's own FAQ: "Customers
// can visit any DHA-approved medical centre," not a specific one tied to
// their application). Compiled from public sources; no street address or
// phone number was available for most locations at time of writing.
//
// opensAt/closesAt/days are structured (not a display string) so the page
// can compute a live "Open now" status — left undefined for centres whose
// hours weren't available, rather than guessing.
export type MedicalCentre = {
  name: string;
  emirate: string;
  area: string;
  opensAt?: string; // 24h "HH:mm"
  closesAt?: string; // 24h "HH:mm"
  days?: "mon-sat" | "daily";
};

export const MEDICAL_CENTRES: MedicalCentre[] = [
  // --- Dubai (DHA Smart Salem network) ---
  { name: "Al Muhaisnah Medical Fitness Centre", emirate: "Dubai", area: "Al Muhaisnah", opensAt: "07:30", closesAt: "21:00", days: "mon-sat" },
  { name: "Al Karama Medical Fitness Centre", emirate: "Dubai", area: "Al Karama", opensAt: "07:30", closesAt: "14:30", days: "mon-sat" },
  { name: "Al Barsha Medical Fitness Centre", emirate: "Dubai", area: "Al Barsha", opensAt: "07:30", closesAt: "21:00", days: "mon-sat" },
  { name: "Nadd Al Hamar Medical Fitness Centre", emirate: "Dubai", area: "Nadd Al Hamar", opensAt: "07:30", closesAt: "22:00", days: "mon-sat" },
  { name: "Al Nahda 2 Medical Fitness Centre", emirate: "Dubai", area: "Al Nahda 2", opensAt: "07:30", closesAt: "18:00", days: "mon-sat" },
  { name: "Smart Salem — Index Tower", emirate: "Dubai", area: "DIFC", opensAt: "08:00", closesAt: "20:00", days: "mon-sat" },
  { name: "Smart Salem — Mall of the Emirates", emirate: "Dubai", area: "Mall of the Emirates", opensAt: "10:00", closesAt: "22:00", days: "daily" },

  // --- Dubai (government-run centres) ---
  { name: "Al Nahda Centre", emirate: "Dubai", area: "Al Nahda" },
  { name: "Salah El Deen Centre", emirate: "Dubai", area: "Salah El Deen" },
  { name: "Ibn Battuta Centre", emirate: "Dubai", area: "Ibn Battuta" },
  { name: "Dragon Mart 2 Centre", emirate: "Dubai", area: "Dragon Mart 2" },
  { name: "Al Baraha Smart Centre", emirate: "Dubai", area: "Al Baraha" },
  { name: "Al Refaa Centre", emirate: "Dubai", area: "Al Refaa" },

  // --- Sharjah ---
  { name: "Sahara Centre", emirate: "Sharjah", area: "Sahara" },
  { name: "Al Khibra & Al Daqqa Centre", emirate: "Sharjah", area: "Al Sajaa" },
  { name: "Al Taj Smart Centre", emirate: "Sharjah", area: "Al Taj" },
  { name: "Al Shurooq Centre", emirate: "Sharjah", area: "Al Shurooq" },
  { name: "Weqa Centre", emirate: "Sharjah", area: "Weqa" },
  { name: "Al Khibrah Centre", emirate: "Sharjah", area: "Al Khibrah" },

  // --- Ajman ---
  { name: "Musheirif Centre", emirate: "Ajman", area: "Musheirif" },
  { name: "Al Nuameia Centre", emirate: "Ajman", area: "Al Nuameia" },

  // --- Ras Al Khaimah ---
  { name: "Dahan Centre", emirate: "Ras Al Khaimah", area: "Dahan" },
  { name: "RAKEZ Centre", emirate: "Ras Al Khaimah", area: "RAKEZ" },

  // --- Fujairah ---
  { name: "Mena Tower Centre", emirate: "Fujairah", area: "Mena Tower" },
  { name: "Al Amal Centre", emirate: "Fujairah", area: "Al Amal" },

  // --- Umm Al Quwain ---
  { name: "Al Madar Centre", emirate: "Umm Al Quwain", area: "Al Madar" },
];

export const EMIRATES_ORDER = ["Dubai", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"];
