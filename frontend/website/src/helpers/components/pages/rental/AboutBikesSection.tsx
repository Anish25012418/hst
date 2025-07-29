"use client";
// Default
import React from "react";
import Image from "next/image";
import { MdDoubleArrow } from "react-icons/md";

// Helpers
import { CustomTypography } from "@/helpers/components";
import { getApiImg } from "@/utils/methods/img-methods";

const AboutBikesSection = (props: any) => {
  // Props
  const { subHeader, subDescription, cycles, resSize } = props;

  return (
    <div className="h-auto w-full my-10 -translate-y-[20px]">
      <div className="px-[50px] md:px-[105px] my-4 flex flex-col">
        <div className="bg-gradient-to-b from-gray-200 to-white">
          <CustomTypography variant="h3" className="text-center my-4">
            {subHeader}
          </CustomTypography>
          <CustomTypography className="tex-base md:text-xl mt-2 text-justify px-4">
            {subDescription}
          </CustomTypography>
        </div>
        <div
          className={`${resSize} place-items-center gap-10 justify-items-center my-6`}
        >
          {cycles?.map((item: any, id: any) => (
            <div
              className="hover:bg-brand-gray-100 px-4 rounded-md cursor-pointer transition duration-500 hover:scale-105"
              key={id}
            >
              <div className="flex justify-center">
                <Image
                  src={getApiImg(item?.image)}
                  alt={item?.title}
                  width={10}
                  height={10}
                  className="min-w-[200px] min-h-[150px] w-[200px] h-[150px] md:min-w-[500px] md:min-h-[300px] object-contain"
                />
              </div>
              <div className="my-4">
                <CustomTypography className="text-2xl font-bold">
                  {item?.title}
                </CustomTypography>
                <CustomTypography className="text-base">
                  {item?.description}
                </CustomTypography>
                {item?.features?.map((feat: any, id: number) => (
                  <div className="flex flex-row items-center" key={id}>
                    <div className="flex items-center min-h-10 min-w-10 h-10 w-10">
                      <MdDoubleArrow />
                    </div>
                    <CustomTypography>{feat}</CustomTypography>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutBikesSection;
