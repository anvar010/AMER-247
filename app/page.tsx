import Hero from "@/components/Hero/Hero";
import MobileScrollHero from "@/components/MobileScrollHero/MobileScrollHero";
import Hero2 from "@/components/Hero2/Hero2";
import Countries from "@/components/Countries/Countries";
import WhoWeAre from "@/components/WhoWeAre/WhoWeAre";
import AboutUs from "@/components/AboutUs/AboutUs";
import WhatWeDo from "@/components/WhatWeDo/WhatWeDo";
import PickUpService from "@/components/PickUpService/PickUpService";
import Partners from "@/components/Partners/Partners";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* <Hero2 /> You can uncomment to use the scroll hero */}
      <Countries />
      <WhoWeAre />
      <AboutUs />
      <WhatWeDo />
      <PickUpService />
      <Partners />
    </>
  );
}
