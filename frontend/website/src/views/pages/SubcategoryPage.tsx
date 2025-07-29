"use client";

// Defaults
import {useState, useEffect} from "react";

// Helpers
import {
  AtGlance, CustomTypography, GetDetailsForm,
  IncExc,
  Itinerary,
  Loader, NavLink,
  StickyNavbar,
  SubCatDescp,
  SubCatGallery,
  SwiperBanner,
  TripOverview,
} from "@/helpers/components";
import {useCheckWindow, useScreenSize} from "@/helpers/hooks";
import {useSubCategoryApi} from "@/helpers/stores";
import dayjs from "dayjs";
import {Button} from "@material-tailwind/react";
import {FaCalendarAlt} from "react-icons/fa";


// Main
export default function SubcategoryPage(props: any) {
  // Props
  const {slug} = props;

  // Hooks
  const isWindowDefined = useCheckWindow();
  const {isMobile, isPro} = useScreenSize();
  const {getAllSubCategory} = useSubCategoryApi();

  // States
  const [isSticky, setIsSticky] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Variables
  const stickyName = isWindowDefined && window.location.href?.split("#")?.[1];
  const subCat = slug.split("/")[1];

  // Find the specific subcategory data from getAllSubCategory based on the extracted subcategory slug
  const selectedSubCategory = getAllSubCategory?.data?.find(
    (subCatSlug: any) => subCatSlug?.slug === subCat
  );
  // console.log("selectedSubCategory", selectedSubCategory);

  useEffect(() => {
    if (isWindowDefined) {
      const handleScroll = () => {
        // const bannerHeight =
        //   document.querySelector(".banner-swiper")?.clientHeight || 0;

        const bannerHeight = isMobile ? 300 : 744;
        if (window.scrollY > bannerHeight) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
        // Update scroll position
        setScrollPosition(window.scrollY);
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [scrollPosition, isMobile, isPro, isWindowDefined]);

  return (
    <>
      {!isWindowDefined ? (
        <Loader/>
      ) : (
        <>
          <SwiperBanner
            extendCss="-translate-y-[100px]"
            image={selectedSubCategory?.imageCoverPic}
          />
          {/* Sticky Header and Main Menu */}
          <StickyNavbar
            extendCss="-translate-y-[100px]"
            name={selectedSubCategory?.title}
            price={selectedSubCategory?.priceOriginal}
            caption={selectedSubCategory?.caption}
            isSticky={isSticky}
            onGetDetailsClick={() => setIsFormOpen(true)}
          />
          <SubCatDescp
            extendCss="-translate-y-[200px]"
            description={selectedSubCategory?.description}
          />
          <TripOverview
            extendCss="-translate-y-[200px]"
            overview={selectedSubCategory?.overview}
          />
          {selectedSubCategory?.departureFrom &&
            selectedSubCategory.departureFrom
              .filter((date: string) => !dayjs().isAfter(dayjs(date), "day")).length > 0 && (
              <div className="-translate-y-[200px] mx-[50px] md:mx-[105px] my-4 flex flex-row justify-between">
                <div className="flex flex-col">
                  <CustomTypography className="text-2xl font-bold mb-2" isPermanentFont>
                    Departure Dates
                  </CustomTypography>
                  <div className="flex flex-col">
                    {selectedSubCategory.departureFrom
                      .filter((date: string) => !dayjs().isAfter(dayjs(date), "day"))
                      .map((departure: any, index: number) => (
                        <p key={index} className="text-md">
                          • {dayjs(departure).format("MMM D, YYYY")}
                        </p>
                      ))}
                  </div>
                </div>
                <NavLink href={`/contact`}>
                <Button
                  className="rounded-none bg-brand-yellow-600 text-white h-10 hover:bg-gray-800 hover:text-white hover:border-gray-800 flex items-center gap-2 mt-2"
                >
                  <FaCalendarAlt className="text-base"/>
                  <CustomTypography className="text-sm capitalize text-white">
                    Request Date
                  </CustomTypography>
                </Button>
                </NavLink>
              </div>
            )}

          <AtGlance
            extendCss="-translate-y-[200px]"
            glance={selectedSubCategory}
          />
          <IncExc
            extendCss="-translate-y-[200px]"
            includes={selectedSubCategory?.includes}
            excludes={selectedSubCategory?.excludes}
          />
          <Itinerary
            extendCss="-translate-y-[200px]"
            list={selectedSubCategory?.itinerary}
          />
          <SubCatGallery
            extendCss="-translate-y-[200px]"
            image={selectedSubCategory?.imageGalleryPic}
            price={selectedSubCategory?.priceOriginal}
            stickyName={stickyName}
            onGetDetailsClick={() => setIsFormOpen(true)}
          />
          {/* Render the form when the button is clicked */}
          {isFormOpen && (
            <GetDetailsForm
              price={selectedSubCategory?.priceOriginal}
              tripName={selectedSubCategory?.title} // Pass the trip name to the form
              onClose={() => setIsFormOpen(false)} // Function to close the form
            />
          )}
        </>
      )}
    </>
  );
}
