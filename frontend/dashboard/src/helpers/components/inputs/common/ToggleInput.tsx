// Import - deafult
import React from "react";

// Import - assets
import { toggle_css } from "@/assets/css/styles/components-styles";

// Main
const ToggleInput = React.forwardRef((props: any, ref: any) => {
  // Props
  const { label, labelClassName, onChange, isChecked, disabled } = props;

  // Action when the toggle state changes
  // const handleChange = (e: any) => {
  //   onChangeCallback(e);
  // };

  return (
    <div className="relative controller-container flex items-center gap-2 cursor-pointer">
      {label && (
        <label
          className={
            labelClassName ??
            "text-blue-gray-500 font-medium text-[12px] sm:text-[14px]"
          }
        >
          {isChecked ? "Show" : "Hide"} {label}
        </label>
      )}
      <label className="inline-flex items-center me-5 cursor-pointer">
        <input
          ref={ref}
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
          disabled={disabled}
          // value={value}
          // onChange={onChange}
          className="sr-only peer"
        />

        <div className={toggle_css.success}></div>
      </label>
    </div>
  );
});

export default ToggleInput;
