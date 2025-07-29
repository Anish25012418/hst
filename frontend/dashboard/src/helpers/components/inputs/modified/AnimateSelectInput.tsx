// Import - default

// Import - helpers
import React from "react";
import Select from "react-select";

// Import - helpers
import { useBoxVisible } from "@/helpers/hooks";

// Import - constants
import { reactSelectStyles } from "@/utils/constants/react-select-constants";
import FormErrorText from "../../texts/FormErrorText";
import MultiTag from "../../tags/MultiTag";

const AnimateSelectInput = React.forwardRef((props: any, ref: any) => {
  // Props
  const {
    children,
    label,
    name,
    css,
    extendCss,
    onClick,
    value,
    onChange,
    isEdit,
    errorMessage,
    isFullDiv,
    ...rest
  } = props;

  // State
  const { domRef, isBoxVisible, setIsBoxVisible } = useBoxVisible();

  // Variables
  const presentValue = rest?.watch && rest?.watch(name ?? "hello");
  const showMe =
    isBoxVisible ||
    presentValue?.length > 0 ||
    value?.length > 0 ||
    presentValue?.label?.length ||
    value?.label?.length ||
    isEdit;

  // Action when the div is clicked
  const handleClick = () => {
    onClick && onClick();
    setIsBoxVisible(true);
    // ref.current && ref.current.focus();
  };

  // Css - div
  // const defaultCss = "relative min-h-auto";
  const className = isFullDiv
    ? "relative col-span-12"
    : "relative col-span-12 md:col-span-6";

  const color = isBoxVisible ? "text-input-blue" : "text-blue-gray-500";
  const bg = showMe ? "bg-white rounded-none" : "";
  const defaultLabelCss = `controller-container ${bg} ${color} ml-2.5 mt-3 px-1 z-app_bar absolute top-0 mb-0.5 transition-all text-[13px] font-medium w-fit`;
  const showCss = showMe ? "-translate-y-[20px]" : "";
  const labelCss = `${defaultLabelCss} ${showCss}`;

  // Action when select changes
  const handleSelectChange = (value: any) => {
    onChange && onChange(value);
    name && rest?.setValue(name, value);
  };

  return (
    <div ref={domRef} className={className} onClick={handleClick}>
      <label className={labelCss} htmlFor={name}>
        {label}
      </label>

      {rest?.isMulti && <MultiTag position="top-right" />}

      <Select
        // className: `min-h-[40px] outline-0  ${span_text} bg-[#f2f2f2] text-[#5d5d5d] border-0 border-white rounded-none`,
        //////////////////////////////
        // Required props
        //////////////////////////////
        ref={ref}
        id={name}
        onChange={handleSelectChange}
        value={value}
        //////////////////////////////
        // Optional props
        //////////////////////////////
        isMulti={rest?.isMulti}
        styles={rest?.styles ?? reactSelectStyles(errorMessage)}
        isClearable={rest?.isClearable ?? true}
        isSearchable={rest?.isSearchable ?? true}
        isDisabled={rest?.isDisabled}
        options={rest?.options}
        required={rest?.required}
        placeholder={rest?.placeholder ?? ""}
      />
      <FormErrorText errorMessage={errorMessage} />
    </div>
  );
});

export default AnimateSelectInput;
