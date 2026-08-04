import { notFound, redirect } from "next/navigation";
import MobileHubScreen from "@/components/MobileHubScreen/MobileHubScreen";
import DesktopHubScreen from "@/components/DesktopHubScreen/DesktopHubScreen";
import { OTHER_HUBS } from "@/components/MobileSearchOverlay/catalog";

type Params = Promise<{ hub: string }>;

// Tourist Visa has its own dedicated route (/uae-tourist-visa), not this
// generic /services/[hub] catch-all — excluded here and redirected below.
export function generateStaticParams() {
  return OTHER_HUBS.filter((hub) => hub.key !== "tourist").map((hub) => ({ hub: hub.key }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { hub: hubKey } = await params;
  const hub = OTHER_HUBS.find((h) => h.key === hubKey);
  if (!hub) return {};
  return {
    title: `${hub.title} — Amer 24/7`,
    description: hub.blurb,
    alternates: {
      canonical: `/services/${hubKey}`,
    },
  };
}

export default async function ServiceHubPage({ params }: { params: Params }) {
  const { hub: hubKey } = await params;
  if (hubKey === "tourist") redirect("/uae-tourist-visa");
  const hub = OTHER_HUBS.find((h) => h.key === hubKey);
  if (!hub) notFound();

  return (
    <>
      <MobileHubScreen
        title={hub.title}
        blurb={hub.blurb}
        subCategories={hub.groups}
        gold={hub.gold}
      />

      {/* Desktop-only (DesktopHubScreen hides itself below 769px) — same
          catalog data and card listing as MobileHubScreen above, scaled up. */}
      <DesktopHubScreen
        title={hub.title}
        blurb={hub.blurb}
        subCategories={hub.groups}
        gold={hub.gold}
      />
    </>
  );
}
