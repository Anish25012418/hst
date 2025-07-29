"use client";
// Default
import React from "react";
import { Button } from "@material-tailwind/react";

// Helpers
import { CustomTypography, NavLink } from "@/helpers/components";

const TripSection = ({ trips }: any) => (
  <div className="flex flex-col md:flex-row items-center justify-around my-10 gap-7">
    {trips?.map((item: any, id: any) => (
      <div
        className="flex-1 h-[300px] md:min-h-[450px] lg:min-h-[250px] bg-brand-yellow-100 p-4"
        key={id}
      >
        <CustomTypography className="text-xl my-2 font-bold">
          {item?.title}
        </CustomTypography>
        <CustomTypography className="text-base mb-4">
          {item?.description}
        </CustomTypography>
        <NavLink href={item?.href ?? "/pokhara-day-trips"}>
          <Button className="bg-brand-yellow-600 rounded-none shadow-none hover:bg-brand-gray-300 cursor-pointer">
            Visit Page
          </Button>
        </NavLink>
      </div>
    ))}
  </div>
);

export default TripSection;
