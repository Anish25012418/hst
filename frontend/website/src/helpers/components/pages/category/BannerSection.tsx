"use client";
import React from "react";
import Image from "next/image";
import { getApiImg } from "@/utils/methods/img-methods";

const BannerSection = ({ bannerSrc, waveSrc }: any) => {
  return (
    <div className="relative">
      <Image
        src={getApiImg(bannerSrc)}
        alt="Banner"
        width={10}
        height={10}
        // className="w-[1920px] h-[300px] md:h-[450px] object-cover"
        className="w-[1920px] h-[300px] md:h-[500px] object-cover -translate-y-[100px]"
      />
      {/* <div className="absolute -bottom-1 z-20"> */}
      <div className="absolute bottom-[calc(100px)] z-[100]">
        <Image
          src={waveSrc}
          alt="Wave"
          className="w-[1920px] h-auto"
          width={10}
          height={10}
        />
      </div>
    </div>
  );
};

export default BannerSection;
