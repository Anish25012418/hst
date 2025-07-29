// Import - helpers
import CustomTypography from "./CustomTypography";
import { useScreenSize } from "@/helpers/hooks";
import CustomTooltip from "../animations/CustomTooltip";

// Custom error message
const CustomErrorMsg = ({ errorMessage }: any) => (
  <CustomTypography className="text-red-400 text-[12px] font-medium !line-clamp-1">
    {errorMessage}
  </CustomTypography>
);

// Main
const FormErrorText = (props: any) => {
  // Props
  const { errorMessage, isRelative } = props;

  // Hooks
  const { isLessThan400 } = useScreenSize();

  // Css
  const defaultClass = "absolute bottom-0 translate-y-[20px]";
  const className = !isRelative ? defaultClass : "py-1";

  return (
    <>
      {errorMessage && (
        <div className={className}>
          {isLessThan400 ? (
            <CustomTooltip content={errorMessage}>
              <CustomErrorMsg errorMessage={errorMessage} />
            </CustomTooltip>
          ) : (
            <CustomErrorMsg errorMessage={errorMessage} />
          )}
        </div>
      )}
    </>
  );
};

export default FormErrorText;
