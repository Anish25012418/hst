"use client";

// Helpers
import { CustomTypography } from "@/helpers/components";
import { useScreenSize } from "@/helpers/hooks";

// Utils
// import * as team from "@/utils/constants/about-constants";

const HeaderSection = (props: any) => {
  // Props
  const { team } = props;

  // Hooks
  const { isMobile } = useScreenSize();

  return (
    <>
      <div className="mx-[50px] md:mx-[105px]">
        <div className="flex flex-col items-center justify-center my-5 gap-1">
          <CustomTypography
            variant={isMobile ? "h6" : "h2"}
            className="font-bold"
            isPermanentFont
          >
            {team?.company?.title}
          </CustomTypography>
          <CustomTypography className="text-center">
            {team?.company?.description}
          </CustomTypography>
        </div>
      </div>
    </>
  );
};

export default HeaderSection;
