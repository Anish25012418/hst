// Import - default
import React from "react";
import { Textarea } from "@material-tailwind/react";

// Import - assets
import { paragraph_text } from "@/assets/css/styles/style";

// Import - helpers
import FormErrorText from "../../texts/FormErrorText";

// Main
const TextAreaInput = React.forwardRef((props: any, ref: any) => {
  // Props
  const {
    variant,
    label,
    color,
    size,
    className,
    labelClassName,
    containerClassName,
    placeholder,
    disabled,
    errorMessage,
    ...rest
  } = props;

  // // Css
  // const containerClass = `controller-container ${
  //   disabled ? "custom-input-disabled" : "custom-input"
  // } ${containerClassName ?? "w-full min-h-[40px]"} rounded-none`;
  // const inputClass = `${
  //   className ?? ""
  // } cursor-pointer font-poppins pb-0 bg-white rounded-none`;
  // const labelClass = labelClassName ?? "text-sm font-medium";
  // Css
  const containerClass = `controller-container ${
    disabled ? "custom-input-disabled" : "custom-input"
  } ${containerClassName ?? "w-full"} rounded-none`;
  const inputClass = `${
    className ?? ""
  } cursor-pointer font-poppins pb-0 bg-white rounded-none ${
    rest?.height ?? "min-h-[200px]"
  }`;
  const labelClass = `${
    labelClassName ?? `${paragraph_text} capitalize`
  } font-poppins`;

  return (
    <div className="relative flex items-center gap-3">
      <Textarea
        ref={ref}
        // crossOrigin="anonymous" // Prevent warnings with this
        // Import - default
        placeholder={placeholder ?? ""}
        disabled={disabled}
        variant={variant ?? "outlined"}
        label={label ?? ""}
        color={errorMessage ? "red" : color ?? "blue"}
        size={size ?? "lg"}
        // Css
        className={inputClass}
        labelProps={{ className: labelClass }}
        containerProps={{ className: containerClass }}
        style={{ ...rest?.styles }}
        // Actions
        value={rest?.value}
        onChange={rest?.onChange}
        // {...rest}
      />
      <FormErrorText errorMessage={errorMessage} />
    </div>
  );
});

export default TextAreaInput;
