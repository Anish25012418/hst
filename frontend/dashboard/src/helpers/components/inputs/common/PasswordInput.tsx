// Import - default
import React from "react";
import { Input } from "@material-tailwind/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Import - helpers
import { useGlobalStore } from "@/helpers/stores";
import FormErrorText from "../../texts/FormErrorText";

// Main
const PasswordInput = React.forwardRef((props: any, ref: any) => {
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
    // Error
    errorMessage,
    ...rest
  } = props;

  // Stores
  const {
    initialState: { isPassword },
    ...state
  } = useGlobalStore();

  // peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-none border-blue-gray-200 focus:border-blue-500 !border-red-400 cursor-pointer font-poppins pb-0 bg-white rounded-none

  // Css - combined
  const containerClass = `controller-container ${
    disabled ? "custom-input-disabled" : "custom-input"
  } ${containerClassName ?? "w-full min-h-[40px]"} rounded-none`;
  const inputClass = `${
    className ?? ""
  }  cursor-pointer font-poppins pb-0 bg-white rounded-none`;
  const labelClass = `${labelClassName ?? "text-[14px] font-bold capitalize"}`;
  const eyeCss =
    "duration-700 absolute right-3 text-md cursor-pointer text-primary-400 hover:text-input-blue";

  return (
    <div className="relative flex items-center gap-3">
      <Input
        ref={ref}
        name={name}
        type={isPassword ? "password" : "text"} // <--- Main input
        crossOrigin="anonymous" // Prevent warnings with this
        // Import - default
        variant={variant ?? "outlined"}
        label={label ?? ""}
        color={errorMessage ? "red" : color ?? "blue"}
        size={size ?? "lg"}
        disabled={disabled}
        placeholder={placeholder ?? ""}
        // Css
        className={inputClass}
        containerProps={{ className: containerClass }}
        labelProps={{ className: labelClass }}
        style={{ ...rest?.styles }}
        autoComplete="true"
        // Others
        // Actions
        // value={rest?.value}
        // onChange={rest?.onChange}
        {...rest}
      />
      {isPassword ? (
        <FaEyeSlash
          className={eyeCss}
          onClick={() => state.setIsPassword(false)}
        />
      ) : (
        <FaEye className={eyeCss} onClick={() => state.setIsPassword(true)} />
      )}
      <FormErrorText errorMessage={errorMessage} />
    </div>
  );
});

export default PasswordInput;
