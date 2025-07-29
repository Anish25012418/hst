// "use client";

// Default
import React from "react";

// Relative
import CustomTypography from "../../texts/CustomTypography";
import BlogCard from "../../card/BlogCard";

// Helpers
import {useMediaQuery} from "@/helpers/hooks";
import {NavLink} from "@/helpers/components";

// Main
const Blog = (props: any) => {
  // Props
  const {blogs, header} = props;

  // Custom Hooks
  const isMobile = useMediaQuery(640);

  return (
    <div className="flex flex-col gap-4 items-center justify-center relative">
      <div className="flex flex-col items-center justify-center">
        <CustomTypography
          variant={isMobile ? "h5" : "h1"}
          // className="text-base lg:text-3xl font-sm lg:font-xl absolute top-[80px] right-10 "
          isPermanentFont
        >
          {header}
        </CustomTypography>
      </div>
      <div className="flex flex-col gap-4 mx-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-[calc(100vw-4px-108px)] max-w-[2028px]">
          {blogs.slice(-3).map(({title, imageThumbnailPic, slug}: any, index: number) => (
            <div key={index}>
              <NavLink href={`/${slug}`}>
                <BlogCard img={`http://localhost:8001${imageThumbnailPic}`} title={title}/>
              </NavLink>
            </div>
          ))}
        </div>
        <div
          className="flex flex-row items-center justify-end hover:bg-gray-400 w-fit px-3 py-2 rounded-sm cursor-pointer">
          <NavLink href={`/blogs`}>
            <CustomTypography className="px-3 py-2 font-bold">
              Go to Blog Page
            </CustomTypography>
          </NavLink>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Blog;
