import PageHero from "@/components/PageHero/PageHero";
import LegalSections from "@/components/LegalSections/LegalSections";
import { PRIVACY_POLICY } from "@/lib/legalContent";

export const metadata = {
  title: "AMER247 - Immigration Services | Dubai Visa Applications/Renewal",
  description:
    "Amer247 is a Semi Government Organization operating 24 hrs, allowing residents to complete all Visa and Residency transactions. Apply Online!",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" />
      <div style={{ paddingBottom: "4rem" }}>
        <LegalSections updated="Updated as on 20/02/2024" sections={PRIVACY_POLICY} />
      </div>
    </>
  );
}
