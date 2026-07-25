import PageHero from "@/components/PageHero/PageHero";
import LegalSections from "@/components/LegalSections/LegalSections";
import { TERMS_CONDITIONS } from "@/lib/legalContent";

export default function TermsConditionsPage() {
  return (
    <>
      <PageHero title="Terms & Conditions" />
      <div style={{ paddingBottom: "4rem" }}>
        <LegalSections updated="Updated as on 20/02/2024" sections={TERMS_CONDITIONS} />
      </div>
    </>
  );
}
