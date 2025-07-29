"use client";
// Defaults
import React, { useEffect, useState } from "react";

// Helpers
import {
  AboutBikesSection,
  DescriptionSection,
  Loader,
} from "@/helpers/components";
import {
  useCheckWindow,
  useSafeParseJson,
  useScreenSize,
} from "@/helpers/hooks";

// Utils
// import * as con from "@/utils/constants/page-constants";
import { useStaticPageApi } from "@/helpers/stores";

const RentalPage = () => {
  // Hooks
  const { isMobile, isTablet } = useScreenSize();
  const isWindowDefined = useCheckWindow();

  // CSS
  const resSize = isMobile
    ? "grid grid-cols-1"
    : isTablet
    ? "grid grid-cols-1"
    : "grid grid-cols-2";

  // Fetch API
  const { getAllData, getAllIsFetching, getAllIsRefetchError } =
    useStaticPageApi();

  // States
  const [rentalData, setRentalData] = useState<any>(null);

  const parsedData = useSafeParseJson(getAllData?.data?.[0]?.rentalPage, {});
  useEffect(() => {
    if (getAllData) {
      setRentalData(parsedData);
    }
  }, [getAllData, parsedData]);

  if (getAllIsRefetchError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return (
    <>
      {!isWindowDefined || getAllIsFetching ? (
        <Loader />
      ) : (
        <>
          {/* Description Row */}
          <DescriptionSection
            extendCss="-translate-y-[36px]"
            header={rentalData?.rental_title}
            image={rentalData?.rental_image}
            description={rentalData?.rental_description}
            resSize={resSize}
          />

          {/* About Bikes Row */}
          <AboutBikesSection
            subHeader={rentalData?.bike_title}
            subDescription={rentalData?.bike_description}
            cycles={rentalData?.bike_gallery}
            resSize={resSize}
          />

          {/* About Bikes Row */}
          <AboutBikesSection
            subHeader={"E-bikes"}
            subDescription={rentalData?.ebike_description}
            cycles={rentalData?.ebike_gallery}
            resSize={resSize}
          />
        </>
      )}
    </>
  );
};

export default RentalPage;
