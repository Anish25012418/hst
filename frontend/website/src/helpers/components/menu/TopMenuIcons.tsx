"use client";

// Defaults
import React from "react";
import { IoSearch } from "react-icons/io5";
import * as MTR from "@material-tailwind/react";
import { useRouter } from "next/navigation";

// Utils
// import { NavItemSchema } from "@/utils/schemas/GlobalSchema";
import * as lc from "@/utils/constants/layout-constants";

// Helpers
import { CustomTypography, NavLink } from "@/helpers/components";
import { useScreenSize } from "@/helpers/hooks";

function FirstMainList(props: any) {
  // Props
  const { list, pathSegment1 } = props;

  // Hooks
  const router = useRouter();
  console.log("pathSegment1", pathSegment1);
  console.log("list", list);

  return (
    <MTR.List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 items-center">
      {/* First portion of navlist */}
      {list?.map(
        ({ label, child, href }: any, idx: number) =>
          href !== "/blog" && (
            <div
              key={idx}
              className="relative group"
              // onClick={(e) => child && e.preventDefault()}
            >
              <NavLink
                href={href}
                onClick={(e) =>
                  (href === "about" || !href) && e.preventDefault()
                }
              >
                <MTR.ListItem
                  className={`${
                    pathSegment1 === (href ?? child[0]?.href)?.split("/")?.[1]
                      ? "!bg-white text-brand-yellow-600"
                      : "text-black"
                  } flex items-center gap-2 py-2 pr-4 duration-0 hover:!bg-white hover:text-brand-yellow-600`}
                >
                  {label}
                </MTR.ListItem>
              </NavLink>
              {child && (
                <div className="absolute left-0 p-2 hidden group-hover:block bg-white rounded-sm shadow-lg w-[200px] z-[9999]">
                  {child?.map(({ href, label }: any, idx: number) => {
                    // console.log("Href", href);
                    return (
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          if (href) router.push(href);
                        }}
                        key={idx}
                      >
                        <CustomTypography className="flex items-center gap-2 py-2 px-4 hover:bg-transparent hover:bg-brand-yellow-500 hover:text-white rounded-sm duration-0 text-black cursor-pointer">
                          <>{label}</>
                        </CustomTypography>
                      </div>

                      // <NavLink href={href} key={idx}>
                      //   <CustomTypography className="flex items-center gap-2 py-2 px-4 hover:bg-transparent hover:bg-brand-yellow-500 hover:text-white rounded-sm duration-0 text-black cursor-pointer">
                      //     {label} Yashu
                      //   </CustomTypography>
                      // </NavLink>
                    );
                  })}
                </div>
              )}
            </div>
          )
      )}
    </MTR.List>
  );
}

const TopMenuIcons = (props: any) => {
  // Hooks
  const { isLaptop, isDesktop } = useScreenSize();

  return (
    <>
      {(isLaptop || isDesktop) && (
        <div className="flex items-center justify-between w-full px-12 bg-brand-yellow-600">
          <div className="flex items-center gap-4">
            {lc.socialLinks?.map((item: any, idx: number) => (
              <NavLink target="_blank" key={idx} href={item?.href} className="text-black">
                {item?.icon as React.ReactElement}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center justify-center">
            <FirstMainList {...props} />
            <IoSearch className="text-xl cursor-pointer" />
          </div>
        </div>
      )}
    </>
  );
};

export default TopMenuIcons;
