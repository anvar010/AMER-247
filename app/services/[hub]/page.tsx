import { notFound } from "next/navigation";
import MobileHubScreen from "@/components/MobileHubScreen/MobileHubScreen";
import { OTHER_HUBS } from "@/components/MobileSearchOverlay/catalog";

type Params = Promise<{ hub: string }>;

export function generateStaticParams() {
  return OTHER_HUBS.map((hub) => ({ hub: hub.key }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { hub: hubKey } = await params;
  const hub = OTHER_HUBS.find((h) => h.key === hubKey);
  if (!hub) return {};
  return {
    title: `${hub.title} — Amer 24/7`,
    description: hub.blurb,
  };
}

export default async function ServiceHubPage({ params }: { params: Params }) {
  const { hub: hubKey } = await params;
  const hub = OTHER_HUBS.find((h) => h.key === hubKey);
  if (!hub) notFound();

  return (
    <MobileHubScreen
      title={hub.title}
      blurb={hub.blurb}
      subCategories={hub.groups}
      gold={hub.gold}
    />
  );
}
