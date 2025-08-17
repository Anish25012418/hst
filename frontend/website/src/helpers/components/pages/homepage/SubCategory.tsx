"use client";
// Default
import React from "react";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";

// Helpers
import { useMediaQuery } from "@/helpers/hooks";

// Relative
import { CustomTypography, SwiperCard } from "../..";
import CustomCard from "../../card/CustomCard";

// Utils
// import * as con from "@/utils/constants/layout-constants";
import { ExploreBanner } from "@/assets/image";
import { getApiImg } from "@/utils/methods/img-methods";

// Main
const SubCategory = (props: any) => {
  // Props
  const { subcategories, header } = props;

  // Custom Hooks
  const isMobile = useMediaQuery(640);

  return (
    <div className="relative">
      {/* <div className="absolute top-0"> */}
      <Image
        // src="https://app.himalayansingletrack.com/web_images/explore_header_banner.png"
        src={ExploreBanner}
        alt="svg"
        width={10}
        height={10}
        className="w-full h-full max-w-[2028px]"
      />
      {/* </div> */}
      <div className="bg-[black] text-white w-full max-w-[2028px] h-[350px] md:h-[400px] lg:h-[500px] flex flex-col">
        <CustomTypography
          // color="white"
          variant={isMobile ? "h5" : "h1"}
          className="text-center mb-4 text-[#F8A408]"
          isPermanentFont
        >
          {header}
        </CustomTypography>
        <div className="bg-black max-h-[300px]">
          <SwiperCard className="explore-swiper" isGridSlide>
            {subcategories?.map(
              ({ title, imageThumbnailPic, slugs }: any, index: any) => (
                <SwiperSlide key={index}>
                  <CustomCard
                    linkHref={slugs?.[0]}
                    imageSrc={getApiImg(imageThumbnailPic)}
                    videoSrc="image/web_images/cycle.mp4"
                    imageAlt={title}
                    title={title}
                    isPrimaryYellow
                  />
                </SwiperSlide>
              )
            )}
          </SwiperCard>
        </div>
      </div>
      <Image
        src="https://app.himalayansingletrack.com/web_images/explore_footer_wave.svg"
        alt="grid"
        className="w-[1920px]"
        width={0}
        height={0}
      />
    </div>
  );
};

export default SubCategory;
