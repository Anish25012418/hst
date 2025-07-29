"use client";

import React, {useEffect, useState} from 'react';
import {CustomTypography, NavLink} from "@/helpers/components";
import BlogCard from "@/helpers/components/card/BlogCard.tsx";
import {useBlogApi} from "@/helpers/stores";
import {useCheckWindow} from "@/helpers/hooks";
import * as comp from "@/helpers/components";

const BlogsPage = () => {
  const isWindowDefined = useCheckWindow();

  const {getAllBlog, getAllBlogFetching, getAllBlogFetchError} = useBlogApi()

  const [blogs, setBlogs] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(9);

  const parsedData = getAllBlog?.data;

  useEffect(() => {
    if (getAllBlog) {
      setBlogs(parsedData);
    }
  }, [getAllBlog, parsedData]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 9); // 👈 show 9 more
  };

  return (
    <>
      {getAllBlogFetchError ? (
        <div>Error loading data. Please try again later.</div>
      ) : !isWindowDefined || getAllBlogFetching ? (
        <div className="w-[calc(100vw-8px)] h-[calc(100vh-101.5px)] grid place-items-center">
          <comp.Loader />
        </div>
      ) : (
        <div className="mx-[50px] md:mx-[105px]">
          <div className="flex flex-col items-center justify-center gap-1 my-5">
            <CustomTypography
              variant="h2"
              className="font-bold text-brand-yellow-600 capitalize"
            >
              Blogs
            </CustomTypography>
            <CustomTypography className="text-center">
              Lists of all the blogs related to the HST.
            </CustomTypography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-[calc(100vw-4px-108px)] max-w-[2028px]">
            {blogs.slice(0, visibleCount).map(({ title, imageThumbnailPic, slug }: any, index: number) => (
              <div key={index}>
                <NavLink href={`/${slug}`}>
                  <BlogCard img={`http://localhost:8001${imageThumbnailPic}`} title={title} />
                </NavLink>
              </div>
            ))}
          </div>

          {visibleCount < blogs.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleShowMore}
                className="bg-brand-yellow-600 text-white font-semibold py-2 px-6 rounded hover:bg-brand-yellow-700 transition"
              >
                Show More
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BlogsPage;