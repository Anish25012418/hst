"use client";

// Defaults
import React from "react";
import Image from "next/image";
import { Button } from "@material-tailwind/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { SwiperSlide } from "swiper/react";

// Helpers
import { SwiperCard, CustomTypography } from "@/helpers/components";
import TestimonialCard from "@/helpers/components/card/TestimonialCard";
import { useMediaQuery, useCheckWindow } from "@/helpers/hooks";

// Utils
import * as con from "@/utils/constants/layout-constants";
import { NEXT_PUBLIC_TRIP_ADVISOR_REVIEW_URL } from "@/config/env";
import { openUrl } from "@/utils/methods/app-methods";

// Main
const Testimonial = (props: any) => {
  // Props
  const { header } = props;
  // Custom Hooks
  const isMobile = useMediaQuery(640);

  const isXl = useMediaQuery(1280);
  const isWindowDefined = useCheckWindow();

  const handleClick = (direction: any) => {
    if (isWindowDefined) {
      const className =
        direction === "prev" ? ".swiper-button-prev" : ".swiper-button-next";
      const element: HTMLDivElement | null = document.querySelector(
        `.testimonial-swiper ${className}`
      );
      if (element) {
        element.click();
      }
    }
  };
  return (
    <>
      <Image
        src="https://app.himalayansingletrack.com/web_images/testimonial_header_wave.svg"
        alt="svg"
        className="w-[1920px] mt-4"
        width={0}
        height={0}
      />
      <div className="bg-gradient-to-b from-[#B9BCBE] to-white w-full h-auto pb-10 max-w-[2028px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="mb-4 flex flex-col items-center justify-center px-10 ">
            <CustomTypography
              variant={isMobile ? "h5" : isXl ? "h3" : "h1"}
              // className="text-base lg:text-3xl font-sm lg:font-xl absolute top-[80px] right-10 "
              isPermanentFont
              className="mb-2"
            >
              {header}
            </CustomTypography>
            <CustomTypography className="text-center font-[400] text-base">
              We have received rave reviews from our customers on TripAdvisor
              for our mountain bike tours. Our guests have consistently praised
              the professionalism and expertise of our tour guides, as well as
              the stunning natural beauty of the trails. Thank you to all of our
              satisfied customers for your kind words and support!
            </CustomTypography>
            <div className="flex gap-4 mt-4">
              <Button
                onClick={() => handleClick("prev")}
                className="!rounded-[50%] bg-[#F8A408] hover:bg-black h-[70px] w-[70px] "
              >
                <FaArrowLeft className="text-xl" />
              </Button>
              <Button
                onClick={() => handleClick("next")}
                className="!rounded-[50%] bg-[#F8A408] hover:bg-black h-[70px] w-[70px]"
              >
                {/* <div> */}
                <FaArrowRight className="text-xl" />
                {/* </div> */}
              </Button>
            </div>
            <div className="flex flex-row items-center justify-end hover:text-[#00AA6C] w-fit px-3 py-2 rounded-sm cursor-pointer">
              <div
                onClick={openUrl({
                  fullUrl: NEXT_PUBLIC_TRIP_ADVISOR_REVIEW_URL,
                })}
              >
                <CustomTypography className="px-3 py-2 font-bold hover:text-[#00AA6C]">
                  Go to Tripadvisor
                </CustomTypography>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </div>
          </div>
          <div>
            <SwiperCard
              isEffectCard
              className="testimonial-swiper !w-[318px] md:!w-[66.5%] lg:!w-[100%]"
            >
              {con.testimonial.map(
                ({ img, name, descp, star, header }: any, index: number) => (
                  <div className="flex items-center justify-center" key={index}>
                    <SwiperSlide key={index} className="overflow-hidden">
                      <TestimonialCard
                        img={img}
                        name={name}
                        descp={descp}
                        star={star}
                        header={header}
                      />
                    </SwiperSlide>
                  </div>
                )
              )}
            </SwiperCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
