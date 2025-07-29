"use client";

// Defaults
import React, { useEffect, useState } from "react";

// Helpers
import { useCheckWindow, useScreenSize } from "@/helpers/hooks";
import * as comp from "@/helpers/components";
import { useCategoryApi } from "@/helpers/stores";

// Assets
import { CategoryWave } from "@/assets/image";
import {SwiperBanner} from "@/helpers/components";

// Main
export default function CategoryPage(props: any) {
  // Hooks
  const { isMobile } = useScreenSize();
  const isWindowDefined = useCheckWindow();

  // Props
  const { slug, showAbout } = props;

  // Extract heading from slug
  const heading = slug.split("/").pop().replace(/-/g, " ");

  // Fetch API
  const { getAllCategory, getAllCategoryFetching, getAllCategoryFetchError } =
    useCategoryApi();

  // States
  const [categoryData, setCategoryData] = useState<any>(null);
  const parsedData = getAllCategory?.data?.find(
    (catSlug: any) => catSlug?.slug === slug
  );

  // console.log("parsedData", parsedData);
  useEffect(() => {
    if (getAllCategory) {
      setCategoryData(parsedData);
    }
  }, [getAllCategory, slug, parsedData]);

  return (
    <>
      {getAllCategoryFetchError ? (
        <>
          <div>Error loading data. Please try again later.</div>
        </>
      ) : !isWindowDefined || getAllCategoryFetching ? (
        <div className="w-[calc(100vw-8px)] h-[calc(100vh-101.5px)] grid place-items-center">
          <comp.Loader />
        </div>
      ) : (
        <>
          <SwiperBanner
            extendCss="-translate-y-[100px]"
            image={categoryData?.imageCoverPic}
          />
          <comp.IntroSection
            heading={categoryData?.title}
            description={categoryData?.description}
          />
          <comp.OfferingsSection
            heading={heading}
            categoryData={categoryData}
            isMobile={isMobile}
          />
          <div className="-translate-y-[28px]">
            <comp.PlanningSection />
          </div>
          {parsedData?.slug === "cycle-touring-in-nepal" && (
            <comp.AboutSection showAbout={showAbout} />
          )}
          {/*<comp.GallerySection images={categoryData?.imageCoverPic} />*/}
        </>
      )}
    </>
  );
}
