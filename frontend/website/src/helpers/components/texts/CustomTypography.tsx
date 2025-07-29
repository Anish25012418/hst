"use client";

// Default
import { Typography } from "@material-tailwind/react";

// Assets
import { defaultFontFamily, permanentMarkerFont } from "@/assets/fonts";

// Utils
import { CustomTypographySchema } from "@/utils/schemas/ComponentSchema";

// Main
export default function CustomTypography(props: CustomTypographySchema) {
  // Props
  const {
    // Default typography props
    children,
    className,
    variant,
    color,
    isPermanentFont,
    ...rest
  } = props;

  // Css
  const font = isPermanentFont ? permanentMarkerFont : defaultFontFamily;
  const finalCss = `${
    className ? `${className} ` : "font-medium "
  }${font}`;

  return (
    <div>
      <Typography
        variant={variant ?? "small"}
        color={color ?? "blue-gray"}
        className={finalCss}
        {...rest}
      >
        {children}
      </Typography>
    </div>
  );
}
