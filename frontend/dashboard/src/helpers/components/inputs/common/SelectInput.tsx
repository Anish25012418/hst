// Import - default
import React from "react";
import { Option, Select } from "@material-tailwind/react";

// Import - helpers
import FormErrorText from "../../texts/FormErrorText";

// Import - utils
import { OptionSchema } from "@/utils/schemas/GlobalSchema";

// Main
const SelectInput = React.forwardRef((props: any, ref: any) => {
  // Props
  const {
    label,
    variant,
    color,
    size,
    className,
    containerClassName,
    placeholder,
    options,
    disabled,
    labelClassName,
    errorMessage,
    ...rest
  } = props;

  // Css
  const containerClass = `controller-container ${
    disabled ? "custom-input-disabled" : "custom-input"
  } ${
    containerClassName ?? "w-full min-h-[40px]"
  } rounded-none border-0 outline-0`;
  const inputClass = `${
    className ?? ""
  } border-[1px] cursor-pointer font-poppins pb-0 bg-white rounded-none`;
  const labelClass =
    labelClassName ?? "capitalize text-blue-gray-500 text-sm font-medium";

  return (
    <div className="relative">
      <Select
        ref={ref}
        // Import - default
        variant={variant ?? "outlined"}
        label={label ?? "Items per page"}
        color={errorMessage ? "red" : color ?? "blue"}
        size={size ?? "lg"}
        placeholder={placeholder ?? ""}
        disabled={disabled}
        // Css
        className={inputClass}
        containerProps={{ className: containerClass }}
        labelProps={{ className: labelClass }}
        style={{ ...rest?.styles }}
        // Actions
        // value={rest?.value}
        // onChange={rest?.onChange}
        {...rest}
      >
        {options?.map(({ label, value }: OptionSchema, idx: number) => (
          <Option
            // key={getUniqueKey(idx, label)}
            key={idx}
            className="text-primary-400 cursor-pointer font-poppins p-2 bg-white hover:bg-gray-300 rounded-none text-[13px]"
            // className="text-primary-400"
            value={value}
          >
            {label}
          </Option>
        ))}
      </Select>
      <FormErrorText errorMessage={errorMessage} />
    </div>
  );
});

export default SelectInput;

// // Import - default
// import React, { useEffect, useRef, useState } from "react";
// import { Option, Select } from "@material-tailwind/react";

// // Import - utils
// import { OptionSchema } from "@/utils/schemas/GlobalSchema";
// import { getUniqueKey } from "@/utils/methods/string-methods";

// // Main
// const SelectInput = React.forwardRef((props: any, ref: any) => {
//   const containerRef = useRef<any>(null);
//   const [toggle, setToggle] = useState(false);

//   // Props
//   const {
//     label,
//     variant,
//     color,
//     size,
//     className,
//     containerClassName,
//     placeholder,
//     options,
//     disabled,
//     isMultiSelect,
//     ...rest
//   } = props;

//   useEffect(() => {
//     if (containerRef.current) {
//       containerRef.current.scrollTop = 0; // Scroll to the top
//     }
//   }, [toggle]);

//   // Options component
//   const Options = ({ options }: any) => {
//     return (
//       <div
//         ref={containerRef}
//         className="overflow-auto"
//         onClick={(prev) => setToggle(!prev)}
//       >
//         {options?.map((item: OptionSchema, idx: number) => (
//           <Option
//             key={getUniqueKey(idx, `${item.label} ${idx}`)}
//             className="text-primary-400 cursor-pointer font-poppins p-2 bg-white hover:bg-gray-300 rounded-none text-[13px]"
//             value={item?.value}
//           >
//             {item?.label}
//           </Option>
//         ))}
//       </div>
//     );
//   };

//   // Css
//   const multiSelectCss = isMultiSelect ? "multiselect" : "";
//   const actualContainerCss = `${containerClassName ?? "min-h-[40px]"}`;
//   const containerClass = `${multiSelectCss} ${actualContainerCss}`;

//   return (
//     <Select
//       ref={ref}
//       // {...rest}
//       // variant={variant ?? "outlined"}
//       label={label ?? "Items per page"}
//       color={errorMessage ? "red" : color ?? "blue"}
//       size={size ?? "lg"}
//       // disabled={disabled ?? false}
//       // className={`${className ?? ""} relative font-poppins pb-0 bg-white`}
//       // containerProps={{ className: containerClass }}
//       placeholder={placeholder ?? ""}
//       value={"6099"}
//       // value={rest?.value}
//       // Import - defaultValue={rest?.defaultValue}
//       // onChange={rest?.onChange}
//       // style={{ ...rest?.styles }}
//     >
//       {isMultiSelect ? (
//         <>
//           {/* <option value="">Select an option</option> */}
//           {options?.map((item: any, idx: number) => (
//             <div key={getUniqueKey(idx, label)}>
//               <div className="font-bold text-[18px] font-poppins px-2 py-1">
//                 {item?.label}
//               </div>
//               <Options options={item?.options} />
//             </div>
//             // <Options options={item?.options} />
//           ))}
//         </>
//       ) : (
//         <Options options={options} />
//       )}
//     </Select>
//   );
// });

// export default SelectInput;
