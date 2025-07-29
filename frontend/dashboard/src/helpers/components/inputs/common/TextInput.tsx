// Import - default
import React from "react";
import { Input } from "@material-tailwind/react";
import { paragraph_text } from "@/assets/css/styles/style";

// Import - helpers
import FormErrorText from "../../texts/FormErrorText";

// Main
const TextInput = React.forwardRef((props: any, ref: any) => {
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
    leftIcon,
    rightIcon,
    disabled,
    errorMessage,
    ...rest
  } = props;

  // Action when left & right icons are clicked
  const handleIconClick = () => {
    if (ref && ref.current) {
      const input = ref.current.querySelector("input");
      if (input) {
        input.focus();
      }
    }
  };

  // Css
  const containerClass = `controller-container ${
    disabled ? "custom-input-disabled" : "custom-input"
  } ${containerClassName ?? "w-full"} rounded-none`;
  const inputClass = `${
    className ?? ""
  } cursor-pointer font-poppins pb-0 bg-white rounded-none min-h-[40px] max-h-[40px]`;
  const labelClass = `${
    labelClassName ?? `${paragraph_text} capitalize`
  } font-poppins`;

  return (
    <div className="relative flex items-center gap-3">
      {leftIcon && (
        <div className="z-10 absolute left-3" onClick={handleIconClick}>
          {leftIcon}
        </div>
      )}

      <Input
        ref={ref}
        type="text" // <--- Main input
        crossOrigin="anonymous" // Prevent warnings with this
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

      {rightIcon && (
        <div className="z-10 absolute right-3" onClick={handleIconClick}>
          {rightIcon}
        </div>
      )}

      <FormErrorText errorMessage={errorMessage} />
    </div>
  );
});

export default TextInput;
