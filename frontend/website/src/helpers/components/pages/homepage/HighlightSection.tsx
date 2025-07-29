"use client";

// Default
import Image from "next/image";
import { Button } from "@material-tailwind/react";

// Helpers
import CustomTypography from "../../texts/CustomTypography";
import { useMediaQuery } from "@/helpers/hooks";

// Main
const HighlightSection = () => {
  // Custom Hooks
  const isMobile = useMediaQuery(640);
  const isTablet = useMediaQuery(820);

  return (
    <div className="w-full relative">
      <Image
        // src={Img.Static_banner_jpg}
        src="https://app.himalayansingletrack.com/web_images/section_three_static_image.jpeg"
        alt="banner_img"
        className="w-full h-full md:h-[800px] lg:h-[1000px]"
        width={10}
        height={10}
      />
      <CustomTypography
        variant={isMobile ? "h5" : "h1"}
        // className="text-base lg:text-3xl font-sm lg:font-xl absolute top-[80px] right-10 "
        className="font-normal lg:font-bold absolute px-10 top-[20px] md:top-[100px] right-0"
        isPermanentFont
      >
        {`The best routes are the ones you haven’t ridden yet.`}
      </CustomTypography>
      {!isMobile && (
        <div className="absolute px-10 top-[100px] md:top-[300px]">
          <CustomTypography
            className="w-20 lg:w-full mb-4"
            variant={isMobile ? "h5" : "h1"}
          >
            TOUR CALENDERS
          </CustomTypography>
          {!isTablet && (
            <CustomTypography
              className="w-56 lg:w-96 mb-4 font-normal"
              variant="h4"
            >
              Everything has been considered; the route, the trails, the food,
              the culture, the weather conditions, the flow of the tour, and
              when we ride in each destination.
            </CustomTypography>
          )}
          <Button className="bg-[#F8A408] text-black h-10">
            View Tour Dates
          </Button>
        </div>
      )}
      {!isMobile && (
        <div className="absolute px-10 top-[100px] md:top-[250px] right-5 lg:right-10">
          <Image
            src="https://app.himalayansingletrack.com/web_images/quote.svg"
            alt="Quote"
            className="h-20 lg:h-full w-full"
            width={10}
            height={10}
          />
          <CustomTypography variant="h1" className="font-bold text-right w-52">
            JOIN THE ELITE HST CYCLIST
          </CustomTypography>
        </div>
      )}
      <div className="absolute bottom-5 right-5">
        {isMobile && (
          <Button className="bg-[#F8A408] text-black">View Tour Dates</Button>
        )}
      </div>
    </div>
  );
};

export default HighlightSection;
