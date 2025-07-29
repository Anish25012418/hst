"use client";

// Default
import React from "react";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";

// Relative
import { default as SwiperCard } from "../../card/SwiperCard";
import { getApiImg } from "@/utils/methods/img-methods";

// Utils
// import * as con from "@/utils/constants/layout-constants";

// Main
const Banner = (props: any) => {
  // Props
  const { image } = props;
  // console.log("Image ", image);

  return (
    // <div cl assName="relative top-0 lg:-top-14 w-full">
    <div className="relative">
      <SwiperCard
        customWidth="w-[1200px] absolute bottom-[100px]"
        className="banner-swiper"
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        {image?.map((item: any, index: number) => (
          <SwiperSlide key={index}>
            <Image
              src={getApiImg(item)}
              alt={item?.img}
              // className="w-full max-w-[2028px] h-[300px] md:h-[800px] lg:h-[calc(100vh-108.5px)] lg:max-h-[calc(100vh-108.5px)] 2xl:max-h-[800px]"
              className="w-full max-w-[2028px] h-[300px] sm:h-[500px] md:h-[600px] lg:h-[600px] xl:h-[calc(100vh-8.5px)] lg:max-h-[calc(100vh-8.5px)] 2xl:max-h-[800px]"
              width={10}
              height={10}
              priority
            />
          </SwiperSlide>
        ))}
      </SwiperCard>
      {/* Black overlay */}
      {/* <div className="absolute inset-0 bg-black opacity-20"></div> */}
      {/* <div className="absolute -bottom-1 z-20"> */}
      <div className="absolute bottom-[calc(100px-4px)] z-20">
        <Image
          src="https://app.himalayansingletrack.com/web_images/section_one_banner_footer.png"
          alt="banner_img"
          className="w-full"
          width={10}
          height={10}
        />
      </div>
    </div>
  );
};

export default Banner;
