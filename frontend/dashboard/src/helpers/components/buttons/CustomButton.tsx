// Import - default
import { Button } from "@material-tailwind/react";
import React from "react";

// Import - utils
import { getStatusBgColor } from "@/utils/methods/css-methods";
import { useNavigate } from "react-router-dom";

// Main
const CustomButton = React.forwardRef((props: any, ref: any) => {
  // Props
  const {
    // common default
    placeholder,
    size,
    variant,
    type,

    // customize these
    css,
    extendCss,
    children,
    status,
    icon,
    leftIcon,
    rightIcon,
    // isPrimary,
    fontWeight: fw,
    width: w,
    height: h,
    isPadding,
    padding: p,
    color: c,
    isMinimum,
    href,
    onClick,
    ...rest
  } = props;

  // Hooks
  const navigate = useNavigate();

  // Css
  const defaultCss = "flex justify-center items-center gap-3 tracking-[1px]";
  const padding = p ?? (isPadding ? "px-4 py-2" : "p-2");
  const fontWeight = fw ?? "info";
  const color = c ?? getStatusBgColor(status);
  const minimumWidth = isMinimum ? "min-w-[110px]" : "min-w-fit";
  const width = w || `${minimumWidth} w-fit`;
  const height = h || `h-[40px] max-h-[40px]`;
  const modifiedCss = `${
    extendCss ?? `${padding} text-xs`
  } ${defaultCss} ${color} ${width} ${height} ${fontWeight} rounded-none`;
  const className = css ?? modifiedCss;

  // Handle click
  const handleOnClick = (e: any) => {
    if (href) {
      navigate(href);
    }
    onClick && onClick(e);
  };

  return (
    <Button
      ref={ref}
      type={type ?? "button"}
      placeholder={placeholder ?? "Custom button"}
      size={size ?? "lg"}
      variant={variant ?? "text"}
      className={className}
      onClick={handleOnClick}
      {...rest}
    >
      {icon && icon}
      {leftIcon && leftIcon}
      {children && children}
      {rightIcon && rightIcon}
    </Button>
  );
});

export default CustomButton;
