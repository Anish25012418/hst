"use client";
// Defaults
import React from "react";
import { Button } from "@material-tailwind/react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdLocationPin } from "react-icons/md";

// Helpers
import { CustomTypography } from "@/helpers/components";
import { openUrl } from "@/utils/methods/app-methods";
import { NEXT_PUBLIC_HST_MAP_URL } from "@/config/env";

// Main
const ContactSection = ({ contact, isMobile, extendCss }: any) => (
  <div
    className={`${
      extendCss ? `${extendCss} ` : ""
    }h- w-full bg-brand-yellow-600`}
  >
    <div className="mx-[50px] md:mx-[105px] py-10 my-4 flex flex-col lg:flex-row justify-around items-center gap-10">
      {/* {contact.map((section: any, index: any) => ( */}
      <React.Fragment>
        <div className="flex flex-col items-center justify-center text-center">
          <CustomTypography
            className="text-white"
            variant={isMobile ? "h4" : "h1"}
          >
            Contact & Location Details
          </CustomTypography>
          <CustomTypography className="text-white text-center">
            To customize your Pokhara overnight trip you can email us or contact
            our Pokhara office directly.
          </CustomTypography>
        </div>
        <div className="flex flex-col justify-start">
          <div className="flex items-center gap-4 my-3 cursor-pointer">
            <div className="flex items-center justify-center min-w-10 min-h-10 w-10 h-10 bg-brand-gray-100 rounded-full">
              <FaPhoneAlt className="text-brand-yellow-600 text-xl font-bold transition-all hover:scale-110" />
            </div>
            <CustomTypography className="text-white font-normal transition-all hover:scale-105">
              {contact?.phone}
            </CustomTypography>
          </div>

          <div className="flex items-center gap-4 my-3 cursor-pointer">
            <div className="flex items-center justify-center min-w-10 min-h-10 w-10 h-10 bg-brand-gray-100 rounded-full">
              <MdEmail className="text-brand-yellow-600 text-xl font-bold transition-all hover:scale-110" />
            </div>
            <CustomTypography className="text-white font-normal transition-all hover:scale-105">
              {contact?.email}
            </CustomTypography>
          </div>

          <div className="flex items-center gap-4 my-3 cursor-pointer">
            <div className="flex items-center justify-center min-w-10 min-h-10 w-10 h-10 bg-brand-gray-100 rounded-full">
              <MdLocationPin className="text-brand-yellow-600 text-xl font-bold transition-all hover:scale-110" />
            </div>
            <CustomTypography className="text-white font-normal transition-all hover:scale-105">
              {contact?.location}
            </CustomTypography>
          </div>

          <div className="flex items-center gap-4 my-3">
            <Button
              variant="outlined"
              className="rounded-none uppercase border-white text-white hover:bg-gray-800 hover:text-white hover:border-gray-800"
              onClick={openUrl({ fullUrl: NEXT_PUBLIC_HST_MAP_URL })}
            >
              View Map
            </Button>
          </div>
        </div>
      </React.Fragment>
      {/* ))} */}
    </div>
  </div>
);

export default ContactSection;
