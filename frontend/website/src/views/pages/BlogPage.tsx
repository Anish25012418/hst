"use client";
import React, {useEffect, useState} from "react";

// Helpers
import {useCheckWindow, useScreenSize} from "@/helpers/hooks";
import * as comp from "@/helpers/components";
import {useBlogApi} from "@/helpers/stores";

// Assets
import {CategoryWave} from "@/assets/image";
import {CustomTypography} from "@/helpers/components";

const BlogPage = (props: any) => {

  // Hooks
  const isWindowDefined = useCheckWindow();

  //Props
  const {slug} = props;

  //Fetch API
  const {getAllBlog, getAllBlogFetching, getAllBlogFetchError} = useBlogApi()

  //States
  const [blogData, setBlogData] = useState<any>(null);
  const parsedData = getAllBlog?.data?.find(
    (blogSlug: any) => blogSlug?.slug === slug
  );

  useEffect(() => {
    if (getAllBlog) {
      setBlogData(parsedData);
    }
  }, [getAllBlog, slug, parsedData]);

  return (
    <>
      {getAllBlogFetchError ? (
        <>
          <div>Error loading data. Please try again later.</div>
        </>
      ) : !isWindowDefined || getAllBlogFetching ? (
        <div className="w-[calc(100vw-8px)] h-[calc(100vh-101.5px)] grid place-items-center">
          <comp.Loader/>
        </div>
      ) : (
        <>
          <comp.BannerSection
            bannerSrc={blogData?.imageThumbnailPic}
            waveSrc={CategoryWave}
          />
          <div className="mx-[50px] md:mx-[105px] my-4 -translate-y-[100px]">
            <CustomTypography className="text-left capitalize text-3xl font-bold pb-1">
              {blogData?.title}
            </CustomTypography>
            <CustomTypography className="!italic">
              - {blogData?.author}
            </CustomTypography>
          </div>
          <comp.IntroSection
            heading={""}
            description={blogData?.content}
          />
          <comp.GallerySection extendCss={"-translate-y-[40px] md:-translate-y-[50px]"} images={blogData?.imageCoverPic} />
        </>
      )}
    </>
  );
};

export default BlogPage;
