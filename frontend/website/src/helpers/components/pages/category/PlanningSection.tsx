"use client";

// Import - default
import React, { useState } from "react";
import { Button } from "@material-tailwind/react";

// Import - helpers
import {
  ContactForm,
  CustomTypography,
  InformationModal,
} from "@/helpers/components";

// Main
const PlanningSection = () => {
  // States
  const [open, setOpen] = useState(false);

  return (
    <>
      <InformationModal
        open={open}
        setOpen={setOpen}
        dialogHeader="Book a callback"
        dialogBody={<ContactForm />}
        isNotMessage
      />
      <div className="w-full bg-brand-yellow-600">
        <div className="mx-[50px] md:mx-[105px] py-10 my-4 flex flex-col justify-center items-center gap-4">
          <CustomTypography className="text-2xl font-bold text-white">
            Planning a Trip?
          </CustomTypography>
          <CustomTypography className="text-base text-white">
            Our team of experienced travel experts has been working in the industry for almost two decades. Get in touch to start planning your journey in Nepal.
          </CustomTypography>
          <Button
            variant="outlined"
            className="rounded-none uppercase border-white text-white hover:bg-gray-800 hover:text-white hover:border-gray-800"
            onClick={() => setOpen(true)}
          >
            BOOK A CALL BACK
          </Button>
        </div>
      </div>
    </>
  );
};

export default PlanningSection;
