// Import - default
import { Typography } from "@material-tailwind/react";

// Import - utils
import { CustomTypographySchema } from "@/utils/schemas/ComponentsSchema";

// Main
const CustomTypography = (props: CustomTypographySchema) => {
  // Props
  const {
    // Import - default typography props
    children,
    className,
    variant,
    color,
    ...rest
  } = props;

  // Css
  const finalCss = `${className ? `${className} ` : ""} font-poppins`;

  return (
    <div>
      <Typography
        variant={variant || "small"}
        color={color ?? "blue-gray"}
        className={finalCss}
        {...rest}
      >
        {children}
      </Typography>
    </div>
  );
};

export default CustomTypography;
