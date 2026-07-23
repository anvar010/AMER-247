import { notFound } from "next/navigation";
import { findByFormPath } from "@/lib/applyLookup";
import ApplicationForm from "@/components/ApplicationForm/ApplicationForm";
import TouristVisaForm from "@/components/TouristVisaForm/TouristVisaForm";

type Params = Promise<{ formPrefix: string; slug: string }>;

// Path-based application-form URLs, e.g. /formAmerService/spouse_entry_permits
// or /formEmirateId/new_born_emirates_id_1_year — one per hub's form prefix
// (see lib/applyLink.ts). Price isn't in the URL; resolved fresh from the
// catalog here so it can never drift from what's shown on the pricing pages.
export async function generateMetadata({ params }: { params: Params }) {
  const { formPrefix, slug } = await params;
  const resolved = findByFormPath(formPrefix, slug);
  if (!resolved) return {};
  return {
    title: `Apply — ${resolved.item.name} — Amer 24/7`,
  };
}

export default async function ApplyFormPage({ params }: { params: Params }) {
  const { formPrefix, slug } = await params;
  const resolved = findByFormPath(formPrefix, slug);
  if (!resolved) notFound();

  const { item, hub } = resolved;
  const hasDualPrice = !!item.inside && !!item.outside;

  // Tourist Visa's real form is a structurally different 2-step flow (no
  // sponsor/address, a dynamic passenger list) — its own component rather
  // than a mode of the generic form used by the other 5 hubs.
  if (hub === "Tourist Visa") {
    return (
      <TouristVisaForm
        service={item.name}
        price={item.single ?? item.inside ?? item.outside}
      />
    );
  }

  return (
    <ApplicationForm
      service={item.name}
      slug={item.slug ?? slug}
      hub={hub}
      price={hasDualPrice ? undefined : item.single ?? item.inside ?? item.outside}
      inside={hasDualPrice ? item.inside : undefined}
      outside={hasDualPrice ? item.outside : undefined}
      tiers={item.tiers}
    />
  );
}
