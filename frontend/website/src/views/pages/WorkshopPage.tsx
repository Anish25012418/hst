"use client";
// Defaults
import { useEffect, useState } from "react";
import Image from "next/image";

// Helpers
import { CustomTypography, Loader } from "@/helpers/components";
import {
  useCheckWindow,
  useSafeParseJson,
  useScreenSize,
} from "@/helpers/hooks";
import { useStaticPageApi } from "@/helpers/stores";
import { getApiImg } from "@/utils/methods/img-methods";
import { CategoryWave } from "@/assets/image";

const WorkshopPage = () => {
  // Hooks
  const { isMobile } = useScreenSize();
  const isWindowDefined = useCheckWindow();

  // Fetch API
  const { getAllData, getAllIsFetching, getAllIsRefetchError }: any =
    useStaticPageApi();

  // States
  const [workshopData, setWorkshopData] = useState<any>();

  const parsedData: any = useSafeParseJson(
    getAllData?.data?.[0]?.workshopPage,
    {}
  );

  useEffect(() => {
    if (getAllData) {
      setWorkshopData(parsedData);
    }
  }, [getAllData, parsedData]);

  return (
    <>
      {getAllIsRefetchError ? (
        <div>Error loading data. Please try again later.</div>
      ) : !isWindowDefined || getAllIsFetching ? (
        <Loader />
      ) : (
        <>
          <Image
            src={getApiImg(workshopData?.workshopThumbnailPic)}
            alt="Workshop"
            width={10}
            height={10}
            className="h-[200px] md:h-[500px] w-[1920px] object-cover -translate-y-[100px]"
          />
          <div className={`absolute z-20 -translate-y-[120px]`}>
            <Image
              src={CategoryWave}
              alt="banner_img"
              className="w-[1920px] h-auto"
              width={10}
              height={10}
            />
          </div>
          <div className="mx-[50px] md:mx-[105px] my-4 -translate-y-[100px]">
            <CustomTypography variant="h4" className="text-center mb-4">
              {workshopData?.header}
            </CustomTypography>
            <CustomTypography className="text-lg font-semibold text-center mb-4">
              {workshopData?.subHeader}
            </CustomTypography>
            <CustomTypography className="text-center mb-4">
              {workshopData?.description}
            </CustomTypography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
              {workshopData?.list?.map((item: any, id: number) => (
                <div
                  key={id}
                  className="transition hover:bg-brand-gray-100 cursor-pointer p-4 rounded-md shadow-md"
                >
                  <Image
                    src={getApiImg(item?.image)}
                    alt="Workshop"
                    width={10}
                    height={10}
                    className="h-[100px] lg:h-[200px] w-[400px] object-cover"
                  />
                  <CustomTypography
                    variant={isMobile ? "h6" : "h4"}
                    className="my-2"
                  >
                    {item?.header}
                  </CustomTypography>
                  <CustomTypography>{item?.description}</CustomTypography>
                </div>
              ))}
            </div>

            <div>
              <CustomTypography
                variant={isMobile ? "h4" : "h2"}
                className="font-bold text-center my-4"
              >
                Brands We Trust
              </CustomTypography>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                {workshopData?.brand_gallery?.map((logo: any, id: number) => (
                  <div key={id}>
                    <Image
                      src={getApiImg(logo)}
                      alt={logo.brand}
                      width={10}
                      height={10}
                      className="h-[200px] w-[200px] shadow-md transition duration-300 hover:scale-105 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default WorkshopPage;
