"use client";
// Defaults
import React, { useState } from "react";
import Image from "next/image";
import {
  useCheckWindow,
  useSafeParseJson,
  useScreenSize,
} from "@/helpers/hooks";
import { useStaticPageApi } from "@/helpers/stores";
import * as comp from "@/helpers/components";
import { getApiImg } from "@/utils/methods/img-methods";
import { NEXT_PUBLIC_HST_POKHARA_URL } from "@/config/env";
import { CategoryWave } from "@/assets/image";
// import { getApiImg } from "@/utils/methods/img-methods";

const HstPokharaPage = () => {
  // Hooks
  const { isMobile } = useScreenSize();
  const isWindowDefined = useCheckWindow();

  // States
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  // Fetch API
  const { getAllData, getAllIsFetching, getAllIsRefetchError } =
    useStaticPageApi();

  // Action when modal is opened
  const openModal = (image: any) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  // Action when modal is closed
  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage("");
  };

  // Variables
  const contact = useSafeParseJson(getAllData?.data?.[0]?.contactPage, {});
  const parsedData = useSafeParseJson(
    getAllData?.data?.[0]?.hstPokharaPage,
    {}
  );
  const { description, gallery, gallery_image_number, title, trips } =
    parsedData;

  return (
    <>
      {getAllIsRefetchError ? (
        <div>Error loading data. Please try again later.</div>
      ) : (
        <>
          {!isWindowDefined || getAllIsFetching ? (
            <div className="w-[calc(100vw-8px)] h-[calc(100vh-101.5px)] grid place-items-center">
              <comp.Loader />
            </div>
          ) : (
            <>
              <div className="mt-4 md:mt-0 w-full h-[200px] md:h-[500px] -translate-y-[100px]">
                <Image
                  src={getApiImg(
                    `${NEXT_PUBLIC_HST_POKHARA_URL}${gallery_image_number}.jpg`
                  )}
                  alt="HST Pokhara Page"
                  width={10}
                  height={10}
                  className="w-full h-full object-contain md:object-cover"
                />
                <div className={`absolute z-20 -translate-y-[12px]`}>
                  <Image
                    src={CategoryWave}
                    alt="banner_img"
                    className="w-[1920px] h-auto"
                    width={10}
                    height={10}
                  />
                </div>
              </div>
              <div className="mx-[50px] md:mx-[105px] my-4 -translate-y-[100px]">
                <comp.TitleSection title={title} description={description} />
                <comp.TripSection trips={trips} />
              </div>
              <comp.ContactSection
                contact={contact?.pokhara_branch}
                isMobile={isMobile}
                extendCss="-translate-y-[100px]"
              />

              <comp.GallerySection
                extendCss="-translate-y-[100px]"
                images={gallery}
                openModal={openModal}
              />

              <comp.ImageModal
                isOpen={isOpen}
                selectedImage={selectedImage}
                closeModal={closeModal}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default HstPokharaPage;
