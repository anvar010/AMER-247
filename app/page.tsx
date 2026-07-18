import Hero from "@/components/Hero/Hero";
import Hero2 from "@/components/Hero2/Hero2";
import MobileHomeHero from "@/components/MobileHomeHero/MobileHomeHero";
import MobileAppHome from "@/components/MobileAppHome/MobileAppHome";
import Countries from "@/components/Countries/Countries";
import WhoWeAre from "@/components/WhoWeAre/WhoWeAre";
import AboutUs from "@/components/AboutUs/AboutUs";
import WhatWeDo from "@/components/WhatWeDo/WhatWeDo";
import PickUpService from "@/components/PickUpService/PickUpService";
import MobileLiveStats from "@/components/MobileLiveStats/MobileLiveStats";
import Partners from "@/components/Partners/Partners";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* <Hero2 /> You can uncomment to use the scroll hero */}

      {/* On mobile, Hero renders MobileScrollHero (the pinned splash
          animation) — everything below is mobile-only content that used to
          live at the separate /home URL, now merged onto "/" itself so
          mobile and desktop share one canonical homepage URL (SEO). The
          splash's own quick links AND its Skip button scroll down to
          #mobile-home-start instead of navigating away — that target must
          stay right where the pinned animation releases (before
          MobileHomeHero), not further down, or Skip overshoots past the
          greeting section. #mobile-header-opaque-start is a separate marker
          purely for when the header should go opaque — placed after
          MobileHomeHero's own dark hero image so the header stays
          transparent through it too, instead of clashing with a white bar
          the moment the greeting section starts. Countries/WhoWeAre/AboutUs/
          PickUpService/Partners each render both their desktop and mobile
          markup from one file now (sharing the same data), toggled by CSS —
          MobileHomeHero and MobileLiveStats stay separate imports since
          they're genuinely mobile-only content with no desktop equivalent. */}
      <div id="mobile-home-start" />
      <MobileHomeHero />
      <div id="mobile-header-opaque-start" />
      <MobileAppHome />
      <Countries />
      <WhoWeAre />
      <AboutUs />
      <WhatWeDo />
      <PickUpService />
      <MobileLiveStats />
      <Partners />
    </>
  );
}
