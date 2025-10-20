"use client";
// Default
import Image from "next/image";
import {FaPhoneAlt} from "react-icons/fa";
import {IoIosMail} from "react-icons/io";
import {IoLocation} from "react-icons/io5";
import {HST_LOGO_png} from "@/assets/image";
import footer_banner from "@/assets/image/footer_banner.jpeg";

// Helpers
import {CustomTypography, NavLink} from "@/helpers/components";

// Utils
import * as lc from "@/utils/constants/layout-constants";
import {useSafeParseJson} from "@/helpers/hooks";
import {useStaticPageApi} from "@/helpers/stores";
import {NEXT_PUBLIC_HST_APP_URL} from "@/config/env";
// import { NavItemSchema } from "@/utils/schemas/GlobalSchema";

// Single footer block (there are 4 in total)
const FooterBlock = (props: any) => {
  // Props
  const {child} = props;

  return (
    <div className="flex flex-row">
      {/* <CustomTypography className="text-white mb-4 font-bold uppercase">
        {label}
      </CustomTypography> */}
      <ul className="flex flex-col md:flex-row items-center gap-4 text-white">
        {child?.map(({href, label}: any, idx: number) => (
          <NavLink key={idx} href={href} className="text-white">
            {label}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

// Main
export default function PublicFooter() {
  // Variables
  const currentYear = new Date().getFullYear();

  // Fetch Static Page API
  const {getAllData}: any = useStaticPageApi();
  const homePageData: any = useSafeParseJson(
    getAllData?.data?.[0]?.homePage,
    {}
  );

  const contactData = useSafeParseJson(getAllData?.data?.[0]?.contactPage, {});
  // console.log("contactData", contactData);

  return (
    <>
      <div className="w-full flex justify-between">
        {/* <Image src={MTB_Banner_jpg} alt="" className="w-full" /> */}
        <Image
          // src={footer_banner}
          src={"/image/web_images/website_footer.png"}
          alt="website_footer"
          className="w-full h-full bg-white"
          width={10}
          height={10}
          priority
        />
      </div>

      {/* Main Footer */}
      <footer className="relative w-full min-h-[500px]">
        <div className="absolute inset-0 bg-black/40 h-full w-full z-20"/>
        <div
          className="absolute inset-0 parallax z-0"
          style={{
            backgroundImage: `url(/image/web_images/homepage/footer_bg.jpg)`,
          }}
        />

        <div className="relative mx-auto w-full max-w-7xl px-8 z-40">
          <div className="flex flex-col items-center justify-center my-8 gap-4">
            {/* First row ---------------- About HST*/}
            <div className="flex flex-col items-center justify-center">
              <Image src={"/image/hst_logo.png"}
                     width={150}
                     height={150}
                     alt="HST Logo"/>
              <CustomTypography
                color="white"
                className="px-2 lg:px-32 text-center font-semibold"
              >
                {homePageData?.footer_description}
              </CustomTypography>
            </div>

            {/* Second row ---------------- Contact Us */}
            <div className="flex flex-col items-center justify-center gap-7 w-full">
              <CustomTypography
                color="white"
                variant="h4"
                className="font-bold"
              >
                Contact Us
              </CustomTypography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col items-center justify-center gap-4">
                  <CustomTypography
                    color="white"
                    variant="h5"
                    className="font-semibold"
                  >
                    Kathmandu
                  </CustomTypography>
                  <CustomTypography
                    color="white"
                    className="flex gap-2 items-center mb-2 font-medium"
                  >
                    <FaPhoneAlt className="text-lg"/>
                    {contactData?.kathmandu_branch?.phone}
                  </CustomTypography>
                  <CustomTypography
                    color="white"
                    className="flex gap-2 items-center mb-2 font-medium"
                  >
                    <IoIosMail className="text-lg"/>
                    {contactData?.kathmandu_branch?.email}
                  </CustomTypography>
                  <CustomTypography
                    color="white"
                    className="flex gap-2 items-center mb-2 font-medium text-center"
                  >
                    <IoLocation className="text-lg"/>
                    {contactData?.kathmandu_branch?.location}
                  </CustomTypography>
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                  <CustomTypography
                    color="white"
                    variant="h5"
                    className="font-semibold"
                  >
                    Pokhara
                  </CustomTypography>
                  <CustomTypography
                    color="white"
                    className="flex gap-2 items-center mb-2 font-medium "
                  >
                    <FaPhoneAlt className="text-lg"/>
                    {contactData?.pokhara_branch?.phone}
                  </CustomTypography>
                  <CustomTypography
                    color="white"
                    className="flex gap-2 items-center mb-2 font-medium"
                  >
                    <IoIosMail className="text-lg"/>
                    {contactData?.pokhara_branch?.email}
                  </CustomTypography>
                  <CustomTypography
                    color="white"
                    className="flex gap-2 items-center mb-2 font-medium text-center"
                  >
                    <IoLocation className="text-lg"/>
                    {contactData?.pokhara_branch?.location}
                  </CustomTypography>
                </div>
              </div>
            </div>

            {/* Third row ---------------- Quick Links*/}
            {/*<div className="flex flex-col items-center gap-4 mt-4">*/}
            {/*  <CustomTypography*/}
            {/*    color="white"*/}
            {/*    variant="h4"*/}
            {/*    className="font-bold"*/}
            {/*  >*/}
            {/*    Quick Links*/}
            {/*</CustomTypography>*/}
            {/* <FooterBlock label="Company" child={lc.navMenuList} /> */}
            {/*</div>*/}

            {/* Fourth row ---------------- Policies */}
            {/*<div className="flex flex-col items-center gap-4">*/}
            {/*  <FooterBlock label="Company" child={lc.legalMenuList} />*/}
            {/*</div>*/}
          </div>

          {/* Copyright Footer */}
          <div
            className="flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
            <CustomTypography className="flex items-center mb-4 text-center font-medium md:mb-0 text-white">
              &copy; {currentYear} Himalayan Single Track. All Rights Reserved.
            </CustomTypography>
            <div className="flex gap-4 sm:justify-center">
              {lc.socialLinks?.map((item: any, idx: number) => (
                <NavLink target="_blank" key={idx} href={item.href} className="text-white">
                  {item?.icon as React.ReactElement}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
