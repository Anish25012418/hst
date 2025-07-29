"use client";
import React from "react";
import Image from "next/image";
import { CustomTypography } from "@/helpers/components";

const GallerySection = ({ galleryImages }: any) => {
  return (
    <div className="mx-[50px] md:mx-[105px] my-4">
      <CustomTypography className="text-3xl font-bold my-4 text-center">
        Gallery
      </CustomTypography>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages?.map((image: any, index: number) => (
          <div
            key={index}
            className="mb-4 cursor-pointer transition duration-300 hover:scale-105"
          >
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full"
              width={400}
              height={400}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GallerySection;
