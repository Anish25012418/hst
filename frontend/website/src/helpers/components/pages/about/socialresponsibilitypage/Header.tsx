"use client";
import { CustomTypography } from "@/helpers/components";

const Header = (props: any) => {
  // Props
  const { header, isMobile } = props;
  return (
    <CustomTypography variant={isMobile ? "h5" : "h3"} className="font-bold">
      {header}
    </CustomTypography>
  );
};

export default Header;
