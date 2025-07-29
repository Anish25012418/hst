"use client";
// Default
import {useState} from "react";
import {Button} from "@material-tailwind/react";
import {FaCalendarAlt} from "react-icons/fa";
import Image from "next/image";

// Helpers
import {CustomTypography} from "@/helpers/components";
import {useScreenSize} from "@/helpers/hooks";
import {getApiImg} from "@/utils/methods/img-methods";
import {PhotoProvider, PhotoView} from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';

const SubCatGallery = (props: any) => {
  // Props
  const {image, price, extendCss, onGetDetailsClick} = props;

  // Hooks
  const {isMobile, isPro} = useScreenSize();

  // States
  const [showAll, setShowAll] = useState(false);

  // Determine how many images to show initially
  const initialCount = 8;
  const totalImages = image || [];

  // Split the gallery into two parts
  // const initialImages = image?.slice(0, initialCount);
  // const remainingImages = image?.slice(initialCount);

  // Toggle function
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const visibleImages = totalImages.slice(0, showAll ? totalImages.length : initialCount);

  return (
    <>
      <div
        className={`${
          extendCss ? `${extendCss} ` : ""
        } mx-[50px] md:mx-[105px] my-8`}
        id="gallery"
      >
        <div>
          <CustomTypography className="text-2xl font-bold my-4" isPermanentFont>
            Gallery
          </CustomTypography>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <PhotoProvider>
              {visibleImages?.map((image: any, index: number) => (
                <div
                  key={index}
                  className="mb-4 cursor-pointer transition duration-300 hover:scale-105"
                >
                  <PhotoView src={getApiImg(image)}>
                    <Image
                      src={getApiImg(image)}
                      alt={`Image ${index + 1}`}
                      className="w-full min-h-[100px] md:min-h-[200px] h-[100px] md:h-[200px] object-cover"
                      width={100}
                      height={100}
                    />
                  </PhotoView>
                </div>
              ))}
            </PhotoProvider>

            {totalImages.length > initialCount && (
              <div className="col-span-full flex justify-center mt-4">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded transition duration-300 backdrop-blur-md"
                  onClick={toggleShowAll}
                >
                  {showAll ? "Show Less" : "Show More"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile View - Book Now and Customize Trip buttons at the bottom */}
      {(isMobile || isPro) && (
        <div
          className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t-2 shadow-md z-50 flex justify-around items-center">
          <div>
            <CustomTypography className="text-xl font-semibold text-brand-yellow-600 text-left">
              {`US $${price}`}
            </CustomTypography>
          </div>
          <div>
            <Button
              className="rounded-none bg-brand-yellow-600 text-white flex items-center gap-4"
              onClick={onGetDetailsClick}>
              <FaCalendarAlt className="text-base"/>
              <CustomTypography className="text-sm uppercase text-white">
                Get Details
              </CustomTypography>
            </Button>
          </div>
          {/* <Button className="rounded-none bg-gray-100 text-black hover:bg-gray-800 hover:text-white hover:border-gray-800 flex items-center gap-4 text-sm">
                <BiCustomize className="text-base" />
                <CustomTypography className="text-sm capitalize">
                  Customize Trip
                </CustomTypography>
              </Button> */}
        </div>
      )}
    </>
  );
};

export default SubCatGallery;
