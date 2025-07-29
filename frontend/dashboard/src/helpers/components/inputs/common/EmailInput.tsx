// Import - default
import React from "react";
import { Input } from "@material-tailwind/react";

// Import - helpers
import FormErrorText from "../../texts/FormErrorText";

// Main
const EmailInput = React.forwardRef((props: any, ref: any) => {
  // Props
  const {
    variant,
    name,
    label,
    color,
    size,
    className,
    labelClassName,
    placeholder,
    disabled,
    containerClassName,
    errorMessage,
    ...rest
  } = props;

  // Css
  const containerClass = `controller-container ${
    disabled ? "custom-input-disabled" : "custom-input"
  } ${containerClassName ?? "w-full min-h-[40px]"} rounded-none`;
  const inputClass = `${
    className ?? ""
  } cursor-pointer font-poppins pb-0 bg-white rounded-none`;
  const labelClass =
    labelClassName ?? "text-blue-500 text-[14px] font-bold capitalize";

  return (
    <div className="relative flex items-center gap-3">
      <Input
        ref={ref}
        type="email" // <--- Main input
        // Import - default
        variant={variant ?? "outlined"}
        label={label ?? ""}
        color={errorMessage ? "red" : color ?? "blue"}
        size={size ?? "lg"}
        placeholder={placeholder ?? ""}
        disabled={disabled}
        // Css
        className={inputClass}
        labelProps={{ className: labelClass }}
        containerProps={{ className: containerClass }}
        style={{ ...rest?.styles }}
        // Actions
        // value={rest?.value}
        // onChange={rest?.onChange}
        {...rest}
      />
      <FormErrorText errorMessage={errorMessage} />
    </div>
  );
});

export default EmailInput;
