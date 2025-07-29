"use client";

import { Button } from "@material-tailwind/react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdLocationPin } from "react-icons/md";
import { CustomTypography } from "@/helpers/components";

import ContactDetail from "./ContactDetail";
import { NEXT_PUBLIC_HST_MAP_URL } from "@/config/env";
import { openUrl } from "@/utils/methods/app-methods";

type CompanyInfoProps = {
  contactData: {
    brand_name?: string;
    inquiry?: string;
    main_branch?: {
      phone: string;
      email: string;
      location: string;
    };
  } | null;
};

const CompanyInfo = ({ contactData }: CompanyInfoProps) => (
  <div className="flex flex-col w-full lg:w-[40%]">
    <CustomTypography
      variant="h2"
      className="text-brand-yellow-600 text-center md:text-left"
    >
      {contactData?.brand_name}
    </CustomTypography>
    <CustomTypography className="text-center md:text-left">
      {contactData?.inquiry}
    </CustomTypography>
    <div>
      <ContactDetail
        icon={<FaPhoneAlt />}
        text={contactData?.main_branch?.phone || ""}
        textSize="text-base"
      />
      <ContactDetail
        icon={<MdEmail />}
        text={contactData?.main_branch?.email || ""}
        textSize="text-base"
      />
      <ContactDetail
        icon={<MdLocationPin />}
        text={contactData?.main_branch?.location || ""}
        textSize="text-base"
      />
      <div className="flex items-center gap-4 my-3">
        <Button
          variant="outlined"
          className="rounded-none uppercase border-brand-yellow-600 text-brand-yellow-600 hover:bg-brand-yellow-600 hover:text-white"
          onClick={openUrl({ fullUrl: NEXT_PUBLIC_HST_MAP_URL })}
        >
          View Map
        </Button>
      </div>
    </div>
  </div>
);

export default CompanyInfo;
