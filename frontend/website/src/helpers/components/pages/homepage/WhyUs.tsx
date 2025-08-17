"use client";

// Default
import React from "react";
import Image from "next/image";

// Utils
// import * as con from "@/utils/constants/layout-constants";

// Helpers
import { useScreenSize } from "@/helpers/hooks";
import { CustomTypography, Loader } from "@/helpers/components";
import { NEXT_PUBLIC_HST_APP_URL } from "@/config/env";
// import { local_authentic_png } from "@/assets/image";

// Circle section
const CircleSection = (props: any) => {
  const { bg, color, imgName, title, description } = props;
  return (
    <div
      className={`${bg} px-4 sm:px-6 md:px-8 py-12 flex flex-col justify-center items-center gap-3`}
    >
      <div className="w-full h-40 xl:min-h-64 xl:max-h-64 cursor-pointer">
        <Image
          src={`/image/web_images/homepage/${imgName}`}
          alt={imgName}
          className="w-full h-full transition duration-300 hover:scale-105 object-contain"
          width={10}
          height={10}
        />
      </div>

      <CustomTypography
        variant="h4"
        className={`${color} text-center font-[600] h-[32px] flex items-start`}
      >
        {title}
      </CustomTypography>

      <CustomTypography
        className={`${color} text-center font-[400] text-sm max-h-[112px]`}
      >
        {description}
      </CustomTypography>
    </div>
  );
};

// Constants
const allCircleData = (data: any) => [
  {
    bg: "bg-[#F8A408]",
    color: "text-black",
    imgName: "mtb_professional_tour.png",
    title: "MTB Professionals",
    description: data?.professional_guide_info,
  },
  {
    bg: "bg-gray-300",
    color: "text-black",
    imgName: "flexibility_bike.png",
    title: "Flexibility",
    description: data?.flexibility_info,
  },
  {
    bg: "bg-black",
    color: "text-[#F8A408]",
    imgName: "local_authentic_section.png",
    title: "Local & Authentic",
    description: data?.local_and_authentic_info,
  },
  {
    bg: "bg-[#696767]",
    color: "text-white",
    imgName: "trail_experts_info.png",
    title: "Trail Experts",
    description: data?.trail_experts_info,
  },
];

// Main
const WhyUs = (props: any) => {
  // Props
  const { data } = props;

  // Hooks
  const isWindowDefined = useScreenSize();

  return (
    <>
      {!isWindowDefined ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-4 px-4 md:px-0 lg:px-48">
          {allCircleData(data)?.map((item: any, idx: number) => (
            <CircleSection key={idx} {...item} />
          ))}
        </div>
      )}
    </>
  );
};

export default WhyUs;
