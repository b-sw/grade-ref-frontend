import { Hero } from "../components/landingPage/hero/Hero";
import {StatsSection} from "../components/landingPage/statsSection/StatsSection";
import {PagesSection} from "../components/landingPage/pagesSection/PagesSection";
import {useMobile} from "../hooks/useMobile";

export const LandingPage = () => {
  const { isMobile } = useMobile();

  return (
    <>
      <Hero />
      {!isMobile &&
        <>
          <StatsSection/>
          <PagesSection />
        </>
      }
    </>
  );
}