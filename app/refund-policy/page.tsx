import PageHero from "@/components/PageHero/PageHero";
import LegalSections from "@/components/LegalSections/LegalSections";
import { REFUND_POLICY } from "@/lib/legalContent";

export default function RefundPolicyPage() {
  return (
    <>
      <PageHero title="Refund Policy" />
      <div style={{ paddingBottom: "4rem" }}>
        <LegalSections updated="Updated as on 20/02/2024" sections={REFUND_POLICY} />
      </div>
    </>
  );
}
