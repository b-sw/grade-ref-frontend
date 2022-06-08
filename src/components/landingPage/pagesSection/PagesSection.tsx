import { Parallax } from "react-parallax";
import {useMobile} from "../../../hooks/useMobile";
import {PagesCarousel} from "./PagesCarousel";

export const PagesSection = () => {
  const { isMobile } = useMobile();

  return (
    <>
      <Parallax
        strength={500}
        bgImage={`https://graderef.s3.eu-west-2.amazonaws.com/pagesSection.jpg`}
        bgImageSizes={'cover'}
        disabled={isMobile}
        bgImageStyle={{ objectFit: 'cover' }}
      >
        <PagesCarousel />
      </Parallax>
    </>
  );
}