"use client";
// Default
import React from "react";

// Helpers
import { CustomTypography } from "@/helpers/components";

const TitleSection = ({ title, description }: any) => (
  <div className="my-4">
    <CustomTypography className="text-3xl font-bold text-center">
      {title}
    </CustomTypography>
    {description?.map((descp: any, id: any) => (
      <CustomTypography key={id} className="text-base my-4 text-center">
        {descp}
      </CustomTypography>
    ))}
  </div>
);

export default TitleSection;
