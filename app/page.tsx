import Hero from "@/components/Hero/Hero";
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
      <Countries />
      <WhoWeAre />
      <AboutUs />
      <WhatWeDo />
      <PickUpService />
      <Partners />
    </>
  );
}
