// Import - helpers
import CustomTypography from "./CustomTypography";
import { useScreenSize } from "@/helpers/hooks";
import CustomTooltip from "../animations/CustomTooltip";

// Custom error message
const CustomInfoMsg = ({ infoMessage }: any) => (
  <CustomTypography className="text-blue-400 text-[12px] font-medium !line-clamp-1">
    {infoMessage}
  </CustomTypography>
);

// Main
const FormInfoText = (props: any) => {
  // Props
  const { infoMessage, isRelative, css } = props;

  // Hooks
  const { isLessThan400 } = useScreenSize();

  // Css
  const defaultClass = css ?? "absolute top-0 translate-y-[-6px]";
  const className = !isRelative ? defaultClass : "py-1";

  return (
    <>
      {infoMessage && (
        <div className={className}>
          {isLessThan400 ? (
            <CustomTooltip content={infoMessage}>
              <CustomInfoMsg infoMessage={infoMessage} />
            </CustomTooltip>
          ) : (
            <CustomInfoMsg infoMessage={infoMessage} />
          )}
        </div>
      )}
    </>
  );
};

export default FormInfoText;
