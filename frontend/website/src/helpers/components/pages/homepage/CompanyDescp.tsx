// Default
import CustomTypography from "../../texts/CustomTypography";

// Utils
// import * as con from "@/utils/constants/layout-constants";

// Main
const CompanyDescp = (props: any) => {
  // Props
  const { title, description } = props;
  return (
    <div className="flex flex-col justify-center items-center my-4 gap-2 px-4 md:px-2">
      <CustomTypography className="text-center text-base md:text-2xl font-bold">
        {title}
      </CustomTypography>
      <CustomTypography className="text-center font-[400] max-w-7xl">
        {description}
      </CustomTypography>
    </div>
  );
};

export default CompanyDescp;
