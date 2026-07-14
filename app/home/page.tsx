import MobileHomeHero from "@/components/MobileHomeHero/MobileHomeHero";
import MobileAppHome from "@/components/MobileAppHome/MobileAppHome";
import Countries from "@/components/Countries/Countries";
import MobileCountryStrip from "@/components/MobileCountryStrip/MobileCountryStrip";
import PickUpService from "@/components/PickUpService/PickUpService";
import MobilePickupCard from "@/components/MobilePickupCard/MobilePickupCard";
import MobileLiveStats from "@/components/MobileLiveStats/MobileLiveStats";
import Partners from "@/components/Partners/Partners";
import MobilePartnersStrip from "@/components/MobilePartnersStrip/MobilePartnersStrip";

export default function HomeTabPage() {
  return (
    <div>
      <MobileHomeHero />
      <MobileAppHome />
      <Countries />
      <MobileCountryStrip />
      <PickUpService />
      <MobilePickupCard />
      <MobileLiveStats />
      <Partners />
      <MobilePartnersStrip />
    </div>
  );
}
