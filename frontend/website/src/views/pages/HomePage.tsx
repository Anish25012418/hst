"use client";
// Helpers
import * as comp from "@/helpers/components";
import { useCheckWindow, useSafeParseJson } from "@/helpers/hooks";
import { Loader } from "@/helpers/components";
import { useHomePageStore } from "@/helpers/stores";
// import { useEffect } from "react";

// Main
export default function HomePage() {
  // Custom Hooks
  const isWindowDefined = useCheckWindow();

  // Fetch Static Page API
  // const { getAllData, getAllIsRefetchError }: any = useStaticPageApi();
  const { staticPages, categories, subcategories, blogs } = useHomePageStore();

  // console.log("getAllData", getAllData);
  // Fetch Category Page API
  // const { getAllCategory } = useCategoryApi();

  // Fetch Sub Category Page API
  // const { getAllSubCategory } = useSubCategoryApi();

  const homePageData: any = useSafeParseJson(staticPages?.[0]?.homePage, {});
  const homePageSlider: any = staticPages?.[0]?.imageCoverPic;
  console.log("homePageSlider", homePageSlider);

  return (
    <>
      {!isWindowDefined ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col items-center">
            <comp.Banner image={homePageSlider} />

            {/* <HighlightSection /> */}
            <div className="-translate-y-[100px]">
              <comp.CompanyDescp
                title={homePageData?.site_header}
                description={homePageData?.site_description}
              />
              <comp.WhyUs data={homePageData} />
              <comp.Category
                categories={categories}
                header={homePageData?.category_header}
              />
              <comp.SubCategory
                subcategories={subcategories}
                header={homePageData?.sub_category_header}
              />
              <comp.Blog blogs={blogs} header={homePageData?.blogs_header} />
              <comp.Testimonial header={homePageData?.testimonials_header} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
