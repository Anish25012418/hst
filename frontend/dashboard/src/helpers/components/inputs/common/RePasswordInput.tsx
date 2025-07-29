// Import - default
import React from "react";
import { Input } from "@material-tailwind/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Import - helpers
import { useGlobalStore } from "@/helpers/stores";
import FormErrorText from "../../texts/FormErrorText";

// Main
const RetypePasswordInput = React.forwardRef((props: any, ref: any) => {
  // Props
  const {
    variant,
    label,
    color,
    size,
    className,
    labelClassName,
    placeholder,
    disabled,
    errorMessage,
    containerClassName,
    ...rest
  } = props;

  // Stores
  const {
    initialState: { isRePassword },
    ...state
  } = useGlobalStore();

  // Css
  const containerClass = `controller-container ${
    disabled ? "custom-input-disabled" : "custom-input"
  } ${containerClassName ?? "w-full min-h-[40px]"} rounded-none`;
  const inputClass = `${
    className ?? ""
  } cursor-pointer font-poppins pb-0 bg-white rounded-none`;
  const labelClass =
    labelClassName ?? "text-blue-500 text-[14px] font-bold capitalize";
  const eyeCss =
    "duration-700 absolute right-3 text-md cursor-pointer text-primary-400 hover:text-input-blue";

  return (
    <div className="relative flex items-center gap-3">
      <Input
        ref={ref}
        type={isRePassword ? "password" : "text"} // <--- Main input
        crossOrigin="anonymous" // Prevent warnings with this
        // Import - default
        variant={variant ?? "outlined"}
        label={label ?? "Confirm password"}
        color={errorMessage ? "red" : color ?? "blue"}
        size={size ?? "lg"}
        disabled={disabled}
        placeholder={placeholder ?? ""}
        // Css
        className={inputClass}
        containerProps={{ className: containerClass }}
        labelProps={{ className: labelClass }}
        style={{ ...rest?.styles }}
        // Others
        // Actions
        // value={rest?.value}
        // onChange={rest?.onChange}
        {...rest}
      />
      {isRePassword ? (
        <FaEyeSlash
          className={eyeCss}
          onClick={() => state.setIsRePassword(false)}
        />
      ) : (
        <FaEye className={eyeCss} onClick={() => state.setIsRePassword(true)} />
      )}
      <FormErrorText errorMessage={errorMessage} />
    </div>
  );
});

export default RetypePasswordInput;
