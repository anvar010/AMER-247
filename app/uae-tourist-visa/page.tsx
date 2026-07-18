import MobileHubScreen from "@/components/MobileHubScreen/MobileHubScreen";
import DesktopHubScreen from "@/components/DesktopHubScreen/DesktopHubScreen";
import TouristVisaHero from "@/components/TouristVisaHero/TouristVisaHero";
import { OTHER_HUBS } from "@/components/MobileSearchOverlay/catalog";

const hub = OTHER_HUBS.find((h) => h.key === "tourist")!;

const HERO_TITLE = "AMER 247 Apply UAE Tourist Visa Online";
const HERO_BLURB =
  "The online UAE Visit Visa Process simplifies the procedures & permits the user getting the permit quickly. 24/7 Support. Fast Confirmation. Choose from 96-hours, 14-days, 30-days, & 90-days UAE Visit Visas.";

export const metadata = {
  title: `${HERO_TITLE} — Amer 24/7`,
  description: HERO_BLURB,
};

export default function UaeTouristVisaPage() {
  return (
    <>
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
