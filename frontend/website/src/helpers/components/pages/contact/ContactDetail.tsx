"use client";

import { CustomTypography } from "@/helpers/components";

const ContactDetail = ({
  icon,
  text,
  textSize,
}: {
  icon: React.ReactNode;
  text?: string;
  textSize: string;
}) => (
  <div className="flex items-center gap-4 my-3 cursor-pointer">
    <div className="flex items-center justify-center w-10 h-10 bg-brand-gray-100 rounded-full">
      <div className="text-brand-yellow-600 text-xl font-bold transition-all hover:scale-110">
        {icon}
      </div>
    </div>
    <CustomTypography
      className={`font-normal transition-all hover:scale-105 ${textSize}`}
    >
      {text}
    </CustomTypography>
  </div>
);

export default ContactDetail;
