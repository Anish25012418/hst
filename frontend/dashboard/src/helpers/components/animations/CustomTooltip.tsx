// Import - default
import { Tooltip } from "@material-tailwind/react";

// Main
const CustomTooltip = (props: any) => {
  // Props
  const { children, content, extendCss, ...rest } = props;
  return (
    <Tooltip
      content={content}
      className={`${extendCss ?? "z-mobile_stepper"} font-poppins font-medium`}
      {...rest}
    >
      <div className="cursor-pointer">{children}</div>
    </Tooltip>
  );
};

export default CustomTooltip;
