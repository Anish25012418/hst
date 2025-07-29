/* eslint-disable react-hooks/exhaustive-deps */
"use client";

// Default
import Image from "next/image";

// Helpers
import { CustomTypography, Loader } from "@/helpers/components";
import {
  useScreenSize,
  useCheckWindow,
  useSafeParseJson,
} from "@/helpers/hooks";
import { SectionWithList } from "@/helpers/components";
import { getApiImg } from "@/utils/methods/img-methods";
import { getStaticPageData } from "@/utils/methods/app-methods";
import { useHomePageStore } from "@/helpers/stores";

const WhyUsPage = () => {
  // Hooks
  const { isMobile } = useScreenSize();
  const isWindowDefined = useCheckWindow();
  const { staticPages } = useHomePageStore();

  // Get the required data from the homepage store
  const data: any = useSafeParseJson(
    getStaticPageData(staticPages, "whyUsPage")
  );
  const image: any = getStaticPageData(staticPages, "imageGalleryPic");

  // console.log("staticPages", staticPages);

  return (
    <>
      {!isWindowDefined ? (
        <Loader />
      ) : (
        <div className="mx-[50px] md:mx-[105px] -translate-y-[50px]">
          <div className="flex flex-col text-center items-center justify-center my-10 gap-4">
            {data?.s1?.[0]?.title && (
              <CustomTypography variant={isMobile ? "h6" : "h2"}>
                {data?.s1?.[0].title}
              </CustomTypography>
            )}
            {data?.s1?.[0]?.description && (
              <CustomTypography className="">
                {data?.s1?.[0].description}
              </CustomTypography>
            )}
          </div>

          <div className="flex items-center justify-center gap-4 h-full md:h-[400px] lg:h-[500px]">
            <Image
              src={getApiImg(image?.[0])}
              alt="Banner One"
              width={10}
              height={10}
              className="w-[800px] h-full"
            />
            {!isMobile && (
              <div className="flex flex-col h-[500px]">
                <Image
                  src={getApiImg(image?.[1])}
                  alt="Banner Two"
                  width={10}
                  height={10}
                  className="w-[500px] h-[50%]"
                />
                <Image
                  src={getApiImg(image?.[2])}
                  alt="Banner Three"
                  width={10}
                  height={10}
                  className="w-[500px] h-[50%] pt-4 object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col items-center justify-center">
            <div>
              {/* {data?.s2?.map((section: any, index: any) => (
                <SectionWithParagraphs section={section} key={index} />
              ))} */}
              {data?.s3?.map((section: any, index: any) => (
                <SectionWithList section={section} key={index} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhyUsPage;
