"use client";
// Default
import React from "react";
import Image from "next/image";
import { PiCaretDownBold } from "react-icons/pi";
import { CgMenuGridR } from "react-icons/cg";
import * as MTR from "@material-tailwind/react";
// import { usePathname } from "next/navigation";

// Assets
import { HST_LOGO_png } from "@/assets/image";

// Helpers
import {
  CustomTypography,
  MobileMenu,
  NavBarSkeleton,
  NavLink,
  TopMenu,
} from "@/helpers/components";
import { useCheckWindow, useScreenSize } from "@/helpers/hooks";
import { usePathname } from "next/navigation";

// Utils

// Actual mega menu logic goes in here
function NavListMenu(props: any) {
  // Props
  const { title, categories } = props;

  // States
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const pathname: string = usePathname();
  const pathSegment1 = pathname?.split("/")?.[1];

  // Variables
  // const isOrange = ["about", "contact", "rental", "blog"]?.includes(pathSegment1);
  const isOrange = [""]?.includes(pathSegment1);
  const isBlack = ["some-page"]?.includes(pathSegment1);

  const navTextColor = isOrange
    ? "text-brand-yellow-600"
    : isBlack
    ? "text-black"
    : "text-white";

  // Child items of the second navbar
  const renderItems = categories?.map(({ title, slug }: any, idx: number) => (
    <NavLink key={idx} href={`/${slug}`} className="outline-none">
      <MTR.MenuItem
        className="flex items-center gap-3 rounded-none outline-none focus-visible:outline-none hover:bg-brand-yellow-700 hover:text-white"
        key={idx}
      >
        <CustomTypography className="flex items-center gap-2 py-2 px-4 rounded-sm duration-0 cursor-pointer outline-none border-none text-inherit">
          {title}
        </CustomTypography>
      </MTR.MenuItem>
    </NavLink>
  ));
  return (
    <React.Fragment>
      {categories?.length ? (
        // Parent Navbar with Child as dropdown
        <MTR.Menu open={isMenuOpen} handler={setIsMenuOpen} allowHover={true}>
          <MTR.MenuHandler>
            <div className="flex items-center">
              <CustomTypography
                className={`${navTextColor} px-4 font-semibold cursor-pointer focus-visible:outline-none`}
              >
                {title?.name}
              </CustomTypography>
              <PiCaretDownBold className={`${navTextColor} cursor-pointer`} />
            </div>
          </MTR.MenuHandler>
          <MTR.MenuList className="z-[9999] outline-none focus-visible:outline-none">
            <div className="outline-none focus-visible:outline-none">
              <CustomTypography className="focus-visible:outline-none">
                {renderItems}
              </CustomTypography>
            </div>
          </MTR.MenuList>
        </MTR.Menu>
      ) : (
        // Parent Navbar without child
        <>
          <NavLink href={`/${title?.slug}`}>
            <CustomTypography
              className={`
                ${
                  pathSegment1 === title?.slug
                    ? "bg-brand-yellow-600/50 text-white"
                    : navTextColor
                }
               px-2 font-medium outline-none cursor-pointer transition-all duration-200 ease-in-out mx-2 hover:bg-brand-yellow-600/50 hover:text-white rounded-md`}
            >
              {title?.name}
            </CustomTypography>
          </NavLink>
        </>
      )}
    </React.Fragment>
  );
}

// Contains Secondary Menu
function NavList(props: any) {
  // Props
  const { menuItem } = props;

  return (
    <MTR.List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 items-center text-white outline-none">
      {/* Render the mega menus here */}
      {/* {menuItem?.map((item: NavItemSchema, idx: number) => ( */}
      {menuItem?.map((item: any, idx: number) => (
        <NavListMenu key={idx} {...item} />
      ))}
    </MTR.List>
  );
}

// Main
export default function NavbarWithMegaMenu(props: any) {
  // Hooks
  const { isLaptop, isDesktop } = useScreenSize();
  const isWindowDefined = useCheckWindow();
  const pathname: string = usePathname();

  // State
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Variables
  const pathSegment1 = pathname?.split("/")?.[1];
  // const isOrange = ["about", "contact", "rental", "blog"]?.includes(
  // pathSegment1
  // );
  // const isBgBlackOpac = ["workshop"]?.includes(pathSegment1);

  return (
    <>
      {!isWindowDefined ? (
        <NavBarSkeleton />
      ) : (
        <>
          <TopMenu {...{ ...props, pathSegment1 }} />
          {/* <div className="flex justify-end rounded-none border-none bg-brand-yellow-600 h-[68px] lg:h-[100px] relative px-10 shadow-md"> */}
          <div className="z-[100] flex justify-end rounded-none border-none h-[68px] lg:h-[100px] relative px-10">
            {/* <div className="hidden xl:block absolute inset-0 -z-10 h-[70%] bg-black/40 -skew-x-[24deg] w-[97.6%] mx-auto" /> */}
            {/* <div className="logo_area bg-[#333333] h-full w-[200px] md:w-[400px] absolute left-0 top-0"> */}
            <div className="logo_area h-[70%] lg:w-full absolute left-0 top-0 bg-transparent lg:bg-black/40">
              {/* <div className="hidden xl:block absolute inset-0 -z-10 bg-black/60 -skew-x-[24deg] w-[102%] h-full"></div> */}
              <div className="flex justify-start items-center gap-4 px-4 py-2">
                <div className="h-[50px] w-[50px] lg:h-[52] lg:w-[52]">
                  <Image
                    src={"/image/hst_logo.png"}
                    width={10}
                    height={10}
                    alt="HST Logo"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="hidden 2xs:flex lg:hidden xl:flex w-full">
                  {/* <div className="xl:absolute xl:bottom-[10px] xl:flex xl:flex-col"> */}
                  <div className="flex flex-col">
                    <CustomTypography
                      className="text-sm lg:text-xl font-bold text-center"
                      color="white"
                    >
                      Himalayan Single Track
                    </CustomTypography>
                    <CustomTypography color="white" className="text-sm">
                      The Leaders in Mountain Biking in Nepal
                    </CustomTypography>
                  </div>
                </div>
              </div>
            </div>
            <div
              //  className={`${
              //   isBgBlackOpac ? "bg-black/40" : "bg-black/40"
              // } flex justify-end items-start py-2 h-fit`}
              className={`h-full lg:h-[70%] flex justify-end items-center py-2 relative`}
            >
              {/* <div
                className={`${
                  isOrange ? "bg-brand-yellow-400/20" : "bg-black/10"
                } hidden xl:block absolute inset-0 -z-10 -skew-x-[24deg] w-[102%] h-full`}
              ></div> */}

              {(isLaptop || isDesktop) && <NavList {...props} />}
              {!isLaptop && !isDesktop && (
                <CgMenuGridR
                  className="text-4xl cursor-pointer"
                  onClick={() => setSidebarOpen(true)}
                />
              )}
            </div>
          </div>
          <MobileMenu
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            navProps={props}
          />
        </>
      )}
    </>
  );
}
