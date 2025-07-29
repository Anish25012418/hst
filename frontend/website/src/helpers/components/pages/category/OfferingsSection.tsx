"use client";
// Defaults
import React from "react";
import Image from "next/image";
import { SlCalender } from "react-icons/sl";

// Helpers
import { CustomTypography, NavLink } from "@/helpers/components";
import { getApiImg } from "@/utils/methods/img-methods";
import { useHomePageStore } from "@/helpers/stores";

// Main
const OfferingsSection = (props: any) => {
  // Props
  const { heading, categoryData, isMobile } = props;

  // Stores
  const { subcategories } = useHomePageStore();

  // Destructure categoryData safely with a fallback
  const { _id, slug } = categoryData ?? {};

  // Filter related subcategories by matching category ID
  const relatedSubcategories = subcategories?.filter(({ categoryIds }: any) =>
    categoryIds?.some(({ _id: insideId }: any) => insideId === _id)
  );

  return (
    <div className="mx-[50px] md:mx-[105px] my-4 -translate-y-[50px]">
      {relatedSubcategories?.length > 0 && (
        <CustomTypography className="capitalize text-2xl font-bold my-2 text-center">{`${heading} we offer`}</CustomTypography>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-2">
        {relatedSubcategories?.map((item: any, id: number) => (
          <NavLink key={id} href={`/${slug}/${item?.slug}`}>
            <div
              key={id}
              className="cursor-pointer p-4 transition hover:scale-95 bg-gray-50 m-1"
            >
              <Image
                src={getApiImg(item?.imageThumbnailPic)}
                alt={item?.title}
                width={10}
                height={10}
                className="h-[150px] lg:h-[260px] w-full object-cover"
              />
              <div className="flex items-center justify-between">
                <CustomTypography className="text-base">NEPAL</CustomTypography>
                <div className="flex items-center gap-4 my-2">
                  <SlCalender className="text-xl" />
                  <CustomTypography className="text-base">
                    {item?.numberOfDays} DAYS
                  </CustomTypography>
                </div>
              </div>
              <CustomTypography
                variant={isMobile ? "h6" : "h5"}
                className="my-2 text-brand-yellow-600"
              >
                {item?.title}
              </CustomTypography>
              <div className="flex flex-row gap-4">
                <CustomTypography className="text-base">
                  {item?.priceOriginal?.$numberDecimal}
                </CustomTypography>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default OfferingsSection;
