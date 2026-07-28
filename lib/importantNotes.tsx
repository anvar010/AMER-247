// Shared by ApplicationForm, TouristVisaForm, and RequiredDocumentsModal
// (desktop side panel + mobile modal both need the exact same text) — one
// place to change the wording instead of three.
export const IMPORTANT_NOTES = [
  "We can process the application only after getting and verifying all the documents.",
  "For some applications we need to collect Sponsor Physical Emirates ID. We will arrange accordingly.",
  "If there is any additional payment in the Immigration system (Overstay fine, open sponsor file etc.), we will share a separate payment link.",
];

// Shared by ApplicationForm and TouristVisaForm — returns just the inner
// content (no wrapping <p>), since each caller has its own CSS module for
// the ".notice" box style. The highlighted link opens WhatsApp with a
// pre-filled message — number/wording here only, easy to change later.
export function PakistanNotice() {
  const whatsappText = encodeURIComponent(
    "Hi, can I know about the requirements for Pakistani nationals for my application?"
  );
  return (
    <>
      Note : For Pakistani nationals, additional documentation and verification may be required for
      new visa applications. Kindly contact our{" "}
      <a
        href={`https://wa.me/971581257700?text=${whatsappText}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontWeight: 700, color: "#0000EE", textDecoration: "underline" }}
      >
        support
      </a>{" "}
      team before applying so we can guide you through the latest requirements and documentation
      process.
    </>
  );
}
