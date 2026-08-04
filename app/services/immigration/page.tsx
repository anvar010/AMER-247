import MobileHubScreen from "@/components/MobileHubScreen/MobileHubScreen";
import { amerSubCategories } from "@/app/online-services/AmerServicesData";

export const metadata = {
  title: "AMER Services — Amer 24/7",
  description: "Entry permits, visit visas, renewals, stamping, cancellations and more — with real fees for inside/outside UAE applicants.",
  alternates: {
    canonical: "/services/immigration",
  },
};

export default function ImmigrationHubPage() {
  return (
    <MobileHubScreen
      title="AMER Services"
      blurb="Entry permits, visit visas, renewals, stamping & cancellations — priced and ready 24/7."
      subCategories={amerSubCategories}
    />
  );
}
