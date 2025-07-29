"use client";

import { Button } from "@material-tailwind/react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdLocationPin } from "react-icons/md";
import { CustomTypography } from "@/helpers/components";

import ContactDetail from "./ContactDetail";
import {
  NEXT_PUBLIC_HST_MAP_POKHARA_URL,
  NEXT_PUBLIC_HST_MAP_URL,
} from "@/config/env";
import { openUrl } from "@/utils/methods/app-methods";

type ContactInfoSchema = {
  title: string;
  branch?: ContactBranchSchema;
  textSize: string;
};

type ContactBranchSchema = {
  phone: string;
  email: string;
  location: string;
};

const ContactInfo = ({ title, branch, textSize }: ContactInfoSchema) => (
  <div>
    <CustomTypography variant="h3">{title}</CustomTypography>
    <div>
      <ContactDetail
        icon={<FaPhoneAlt />}
        text={branch?.phone}
        textSize={textSize}
      />
      <ContactDetail
        icon={<MdEmail />}
        text={branch?.email}
        textSize={textSize}
      />
      <ContactDetail
        icon={<MdLocationPin />}
        text={branch?.location}
        textSize={textSize}
      />
      <div className="flex items-center gap-4 my-3">
        <Button
          variant="outlined"
          className="rounded-none uppercase border-brand-gray-600 text-brand-gray-800 hover:bg-gray-800 hover:text-white"
          onClick={openUrl({
            fullUrl:
              title?.toLowerCase() === "kathmandu"
                ? NEXT_PUBLIC_HST_MAP_URL
                : NEXT_PUBLIC_HST_MAP_POKHARA_URL,
          })}
        >
          View Map
        </Button>
      </div>
    </div>
  </div>
);

export default ContactInfo;
