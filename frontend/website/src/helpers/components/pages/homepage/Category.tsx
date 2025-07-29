"use client";

// Default
import React from "react";

// Relative
import PosterCard from "../../card/PosterCard";
import CustomTypography from "../../texts/CustomTypography";

// Helpers
import { useMediaQuery } from "@/helpers/hooks";
import NavLink from "../../texts/NavLink";
import { getApiImg } from "@/utils/methods/img-methods";

// Utils
// import * as con from "@/utils/constants/layout-constants";

// Main
const Category = (props: any) => {
  // Props
  const { categories, header } = props;
  // console.log("categories", categories);

  // Custom Hooks
  const isMobile = useMediaQuery(640);

  return (
    <div className="flex flex-col gap-4 items-center justify-center relative">
      <div>
        <CustomTypography
          variant={isMobile ? "h5" : "h1"}
          isPermanentFont
          className="text-center"
        >
          {header}
        </CustomTypography>
      </div>
      <div className="grid grid-cols-2 xs:grid-cols-3 lg:flex lg:flex-row gap-4">
        {categories
          ?.slice(0, 6)
          ?.map(
            (
              { title, imageCoverPic, imageThumbnailPic, slug }: any,
              index: number
            ) => {
              return (
                <div key={index}>
                  <NavLink href={`/${slug}`}>
                    <PosterCard
                      title={title}
                      imageSrc={getApiImg(imageThumbnailPic)}
                      imageAlt={title}
                      hoverImageSrc={getApiImg(imageCoverPic?.[0])}
                      imgHeight={150}
                      imgWidth={150}
                    />
                  </NavLink>
                </div>
              );
            }
          )}
      </div>
    </div>
  );
};

export default Category;
