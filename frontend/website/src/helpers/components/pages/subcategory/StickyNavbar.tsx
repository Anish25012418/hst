"use client";
// Defaults
import {Button} from "@material-tailwind/react";
import {GrOverview, GrGallery} from "react-icons/gr";
import {IoMapOutline} from "react-icons/io5";
import {BsFeather} from "react-icons/bs";
import {GiMountainCave} from "react-icons/gi";
import { FaClipboardList } from "react-icons/fa";

// Helpers
import {CustomTypography, GetDetailsForm} from "@/helpers/components";
import {useScreenSize} from "@/helpers/hooks";
import {useState} from "react";

// interface StickyNavbarProps {
//   name: string;
//   scrollToOverview: () => void;
//   isSticky: boolean;
//   isMobile: boolean;
//   isPro: boolean;
// }

const StickyNavbar = ({name, price, caption, isSticky, extendCss, onGetDetailsClick}: {
  name: string;
  price: string;
  caption: string;
  isSticky: boolean;
  extendCss?: string;
  onGetDetailsClick: () => void;
}) => {

  // Hooks
  const {isMobile, isPro} = useScreenSize();

  // Variables
  const showSticky = !isMobile && isSticky;

  const handleScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    const navbarHeight = 100;

    if (section) {
      const offsetPosition = section.offsetTop - navbarHeight - 20;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={`navbar ${
        showSticky
          ? "sticky top-0 z-30 shadow-md "
          : extendCss
            ? `${extendCss} `
            : ""
      } 
      } bg-white`}
    >
      <div className="mx-[50px] md:mx-[105px] py-3 h-[100px] max-h-[100px]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 h-full">
          {/* Title */}
          <div
            className={`flex flex-col w-full ${
              showSticky ? "items-start" : "items-center -translate-y-[100px]"
            }`}
          >
            <div className="w-full flex flex-row items-center justify-between">
              {/* Left: Title and caption */}
              <div className="max-w-[640px] lg:max-w-[800px]">
                <CustomTypography className="capitalize text-2xl font-semibold">
                  {name}
                </CustomTypography>
                {!isSticky && (
                  <CustomTypography className="!italic">
                    {caption}
                  </CustomTypography>
                )}
              </div>

              {/* Right: Price and Get Details */}
              <div className="flex items-center gap-4">
                {(!isMobile && !isPro) && (
                  <CustomTypography className="text-xl font-semibold text-brand-yellow-600 text-left">
                    {`US $${price}`}
                  </CustomTypography>
                )}

                {!isMobile && !isPro && (
                  <Button
                    className="rounded-none bg-brand-yellow-600 text-white hover:bg-gray-800 hover:text-white hover:border-gray-800 flex items-center gap-2"
                    onClick={onGetDetailsClick}
                  >
                    <FaClipboardList className="text-base"/>
                    <CustomTypography className="text-sm capitalize text-white">
                      Get Details
                    </CustomTypography>
                  </Button>
                )}
              </div>
            </div>

            {/* Sticky Navbar menu */}
            {isSticky && !isMobile && (
              <div className="flex justify-start items-center gap-8">
                <div
                  className="flex items-center gap-2 cursor-pointer hover:bg-brand-gray-100 py-2 rounded-md"
                  onClick={() => handleScroll("overview")}
                >
                  <GrOverview/>
                  <CustomTypography className="rounded-none uppercase font-semibold">
                    Overview
                  </CustomTypography>
                </div>

                <div
                  className="flex items-center gap-2 cursor-pointer hover:bg-brand-gray-100 py-2 rounded-md"
                  onClick={() => handleScroll("glance")}
                >
                  <BsFeather/>
                  <CustomTypography className="rounded-none uppercase font-semibold">
                    Glance
                  </CustomTypography>
                </div>

                <div
                  className="flex items-center gap-2 cursor-pointer hover:bg-brand-gray-100 py-2 rounded-md"
                  onClick={() => handleScroll("incExc")}
                >
                  <GiMountainCave/>
                  <CustomTypography className="rounded-none uppercase font-semibold">
                    Include/ Exclude
                  </CustomTypography>
                </div>

                <div
                  className="flex items-center gap-2 cursor-pointer hover:bg-brand-gray-100 py-2 rounded-md"
                  onClick={() => handleScroll("itinerary")}
                >
                  <IoMapOutline/>
                  <CustomTypography className="rounded-none uppercase font-semibold">
                    Itinerary
                  </CustomTypography>
                </div>

                <div
                  className="flex items-center gap-2 cursor-pointer hover:bg-brand-gray-100 py-2 rounded-md"
                  onClick={() => handleScroll("gallery")}
                >
                  <GrGallery/>
                  <CustomTypography className="rounded-none uppercase font-semibold">
                    Gallery
                  </CustomTypography>
                </div>
              </div>
            )}
          </div>
          {/* Book now button with price */}
        </div>
      </div>
    </div>
  );
};

export default StickyNavbar;
