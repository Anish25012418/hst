"use client";
// Defaults
import React from "react";
import Image from "next/image";

// Helpers
import {CustomTypography} from "@/helpers/components";
import {getApiImg} from "@/utils/methods/img-methods";
import {PhotoProvider, PhotoView} from "react-photo-view";

const GallerySection = (props: any) => {
  // Props
  const {images, openModal, extendCss} = props;

  return (
    <div
      className={`${
        extendCss ? `${extendCss} ` : ""
      }mx-[50px] md:mx-[105px] my-4`}
    >
      <div>
        <CustomTypography className="text-3xl font-bold my-4 text-center">
          Gallery
        </CustomTypography>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <PhotoProvider>
            {images?.map((image: any, index: any) => (
              <div
                key={index}
                className="mb-4 cursor-pointer transition duration-300 hover:scale-105"
              >
                <PhotoView src={getApiImg(image)}>
                  <Image
                    src={getApiImg(image)}
                    alt={`Image ${index + 1}`}
                    className="w-full h-[200px] object-cover"
                    width={400}
                    height={400}
                  />
                </PhotoView>
              </div>
            ))}
          </PhotoProvider>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
