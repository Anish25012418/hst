"use client";
// Default
import Image from "next/image";
import { SwiperSlide } from "swiper/react";

// Helpers
import { SwiperCard } from "@/helpers/components";

// Assets
import { CategoryWave } from "@/assets/image";
import { getApiImg } from "@/utils/methods/img-methods";

// interface SwiperBannerProps {
//   isMobile: boolean;
// }

const SwiperBanner = (props: any) => {
  // Props
  const { image, extendCss } = props;

  return (
    <div className={`${extendCss ? `${extendCss}` : ""}`}>
      {/* <div className="relative"> */}
      <SwiperCard
        customWidth="w-[1200px]"
        className="banner-swiper z-10"
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        {image?.map((img: any, index: number) => (
          <SwiperSlide key={index}>
            <Image
              src={getApiImg(img)}
              alt={img}
              className={`${
                extendCss ? `${extendCss} ` : ""
              }w-[1920px] h-[300px] md:h-[600px] object-cover`}
              width={10}
              height={10}
              priority
            />
          </SwiperSlide>
        ))}
      </SwiperCard>
      <div
        className={`${extendCss ? "-bottom-[4px]" : "-bottom-1"} absolute z-20`}
      >
        <Image
          src={CategoryWave}
          alt="banner_img"
          className="w-[1920px] h-auto -translate-y-[100px]"
          width={10}
          height={10}
        />
      </div>
    </div>
  );
};

export default SwiperBanner;
