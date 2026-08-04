import MobileHubScreen from "@/components/MobileHubScreen/MobileHubScreen";
import DesktopHubScreen from "@/components/DesktopHubScreen/DesktopHubScreen";
import TouristVisaHero from "@/components/TouristVisaHero/TouristVisaHero";
import { OTHER_HUBS } from "@/components/MobileSearchOverlay/catalog";
import { OG_IMAGE } from "@/lib/ogImage";

const hub = OTHER_HUBS.find((h) => h.key === "tourist")!;

const touristVisaItems = hub.groups
  .flatMap((g) => g.items)
  .filter((item) => item.single);

const VISA_PRODUCTS_SCHEMA = touristVisaItems.map((item) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: item.name,
  offers: {
    "@type": "Offer",
    price: item.single!.replace(/[^0-9.]/g, ""),
    priceCurrency: "AED",
  },
}));

// Real low/high across all listed visa types — derived from the same prices
// above, not hardcoded, so it can't drift if lib/prices.ts changes.
const touristVisaPrices = touristVisaItems.map((item) =>
  Number(item.single!.replace(/[^0-9.]/g, ""))
);

const VISA_PRICE_RANGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "UAE Tourist Visa Services",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: Math.min(...touristVisaPrices).toFixed(2),
    highPrice: Math.max(...touristVisaPrices).toFixed(2),
    priceCurrency: "AED",
    offerCount: touristVisaPrices.length,
  },
};

const HERO_TITLE = "AMER 247 Apply UAE Tourist Visa Online";
const HERO_BLURB =
  "The online UAE Visit Visa Process simplifies the procedures & permits the user getting the permit quickly. 24/7 Support. Fast Confirmation. Choose from 96-hours, 14-days, & 30-days UAE Visit Visas.";

export const metadata = {
  title: "Dubai Visit Visa Online – 30 & 60 Day UAE Tourist Visa Price",
  description:
    "Apply for Dubai visit visa online from AED 400. UAE tourist visa for 14, 30, 60 & 90 days with 24-hour express approval. Check prices & apply now – Amer247.",
  openGraph: {
    title: "Dubai Visit Visa Online – 30 & 60 Day UAE Tourist Visa",
    description:
      "UAE visit visa from AED 400 — single & multiple entry, express 24-hour processing. Check Dubai tourist visa prices and apply online with Amer247.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: "/uae-tourist-visa",
  },
};

export default function UaeTouristVisaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([VISA_PRICE_RANGE_SCHEMA, ...VISA_PRODUCTS_SCHEMA]),
        }}
      />
      <MobileHubScreen
        title={hub.title}
        heroTitle={HERO_TITLE}
        blurb={HERO_BLURB}
        subCategories={hub.groups}
        gold={hub.gold}
      />

      {/* Desktop-only (both hide themselves below 769px) — custom
          boarding-pass hero, then the shared catalog grid without its
          built-in dark hero. */}
      <TouristVisaHero title={HERO_TITLE} blurb={HERO_BLURB} />
      <DesktopHubScreen
        title={hub.title}
        heroTitle={HERO_TITLE}
        blurb={HERO_BLURB}
        subCategories={hub.groups}
        gold={hub.gold}
        hideHero
      />
    </>
  );
}
