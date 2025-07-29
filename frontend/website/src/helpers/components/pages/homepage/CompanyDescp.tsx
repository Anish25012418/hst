// Default
import CustomTypography from "../../texts/CustomTypography";

// Utils
// import * as con from "@/utils/constants/layout-constants";

// Main
const CompanyDescp = (props: any) => {
  // Props
  const { title, description } = props;
  return (
    <div className="flex flex-col justify-center items-center my-4 gap-2">
      <CustomTypography className="px-12 text-center text-base md:text-2xl font-bold">
        {title}
      </CustomTypography>
      <CustomTypography className="px-12 md:px-32 text-center font-[400]">
        {description}
      </CustomTypography>
    </div>
  );
};

export default CompanyDescp;
