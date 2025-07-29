import React from "react";
import dayjs from "dayjs";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { DayPicker } from "react-day-picker";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { span_text } from "@/assets/css/styles/style";
import { Chip } from "@material-tailwind/react";
import FormInfoText from "../../texts/FormInfoText";

// const DateInput = React.forwardRef((props: any, ref: any) => {
//   const {
//     label,
//     disabled,
//     placeholder,
//     color,
//     size,
//     variant,
//     containerClassName,
//     className,
//     labelClassName,
//     extendCss,
//     selectedDates,
//     setSelectedDates,
//     onChange,
//     ...rest
//   } = props;
//
//   // Determine the dates to display
//   const datesToDisplay =
//     selectedDates ||
//     (Array.isArray(rest?.value) ? rest?.value : [rest?.value]) ||
//     [];
//
//   // const containerClass = `controller-container ${
//   //   disabled ? "custom-input-disabled" : "custom-input"
//   // } ${containerClassName ?? "w-full"} rounded-none hidden`;
//   // const inputClass = `${
//   //   className ?? ""
//   // } cursor-pointer font-poppins pb-0 bg-white rounded-none`;
//   const labelClass = `${
//     labelClassName ?? `${span_text} capitalize`
//   } font-poppins`;
//
//   const handleDateChange = (dates: Date[] | any) => {
//     setSelectedDates(dates);
//     onChange && onChange(dates);
//     rest?.name && rest.setValue(rest?.name, dates);
//   };
//
//   // Helper function to render Chip components
//   const renderChips = (dates: any[]) =>
//     dates.map((date: any, index: number) => (
//       <Chip
//         key={index}
//         variant="filled"
//         color="blue"
//         size="sm"
//         value={dayjs(date).format("MMM D, YYYY")}
//         className="rounded-full"
//       />
//     ));
//
//   return (
//     <div
//       className={`relative dates-section mt-4 px-4 py-2 bg-white border-[1px] border-gray-400 ${
//         extendCss ?? ""
//       }`}
//     >
//       <FormInfoText
//         css="absolute top-0 left-0 translate-y-[-20px]"
//         infoMessage="You can select multiple dates."
//       />
//       <Popover placement="bottom">
//         <PopoverHandler>
//           <div className="flex flex-col gap-3 w-full">
//             <div
//               onClick={() => ref?.current && ref?.current?.click()}
//               className="cursor-pointer py-1"
//             >
//               <label htmlFor="" className={labelClass}>
//                 {label ?? "Select Dates"}
//               </label>
//             </div>
//             {/* Display selected dates as chips */}
//             {datesToDisplay && (
//               <div className="flex flex-wrap gap-2">
//                 {renderChips(datesToDisplay)}
//               </div>
//             )}
//           </div>
//         </PopoverHandler>
//         <PopoverContent className="z-snackbar">
//           <DayPicker
//             mode="multiple"
//             disabled={disabled}
//             selected={selectedDates}
//             onSelect={handleDateChange}
//             showOutsideDays
//             className="border-0"
//             classNames={{
//               caption: "flex justify-center py-2 mb-4 relative items-center",
//               caption_label: "text-sm font-medium text-gray-900",
//               nav: "flex items-center",
//               nav_button:
//                 "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-none transition-colors duration-300",
//               nav_button_previous: "absolute left-1.5",
//               nav_button_next: "absolute right-1.5",
//               table: "w-full border-collapse",
//               head_row: "flex font-medium text-gray-900",
//               head_cell: "m-0.5 w-9 font-normal text-sm",
//               row: "flex w-full mt-2",
//               cell: "text-gray-600 rounded-none h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
//               day: "h-9 w-9 p-0 font-normal",
//               day_range_end: "day-range-end",
//               day_selected:
//                 "rounded-none bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
//               day_today: "rounded-none bg-gray-200 text-gray-900",
//               day_outside:
//                 "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
//               day_disabled: "text-gray-500 opacity-50",
//               day_hidden: "invisible",
//             }}
//             components={{
//               IconLeft: (props) => (
//                 <FaAngleLeft {...props} className="h-4 w-4 stroke-2" />
//               ),
//               IconRight: (props) => (
//                 <FaAngleRight {...props} className="h-4 w-4 stroke-2" />
//               ),
//             }}
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// });

const DateInput = React.forwardRef((props: any, ref: any) => {
  const {
    label,
    disabled,
    placeholder,
    color,
    size,
    variant,
    containerClassName,
    className,
    labelClassName,
    extendCss,
    selectedDates,
    setSelectedDates,
    onChange,
    ...rest
  } = props;

  // Determine the dates to display
  const datesToDisplay =
    selectedDates ||
    (Array.isArray(rest?.value) ? rest?.value : [rest?.value]) ||
    [];

  const labelClass = `${
    labelClassName ?? `${span_text} capitalize`
  } font-poppins`;

  const handleDateChange = (dates: Date[] | any) => {
    // DayPicker in multiple mode returns the complete array of selected dates
    // So we can directly use this array
    const newDates = dates || [];

    setSelectedDates(newDates);
    onChange && onChange(newDates);
    rest?.name && rest.setValue(rest?.name, newDates);
  };

  // Function to handle individual date deletion
  const handleDateDelete = (indexToDelete: number) => {
    const updatedDates = datesToDisplay.filter((_: any, index: number) => index !== indexToDelete);

    setSelectedDates(updatedDates);
    onChange && onChange(updatedDates);
    if (rest?.name) {
      rest.setValue(rest.name, updatedDates.length > 0 ? updatedDates : null);
    }
  };

  // Helper function to render Chip components with delete button
  const renderChips = (dates: any[]) =>
    dates.map((date: any, index: number) => (
      <Chip
        key={index}
        variant="filled"
        color="blue"
        size="sm"
        value={dayjs(date).format("MMM D, YYYY")}
        className="rounded-full relative pr-8"
        onClose={() => handleDateDelete(index)}
      />
    ));

  return (
    <div
      className={`relative dates-section mt-4 px-4 py-2 bg-white border-[1px] border-gray-400 ${
        extendCss ?? ""
      }`}
    >
      <FormInfoText
        css="absolute top-0 left-0 translate-y-[-20px]"
        infoMessage="You can select multiple dates."
      />
      <Popover placement="bottom">
        <PopoverHandler>
          <div className="flex flex-col gap-3 w-full">
            <div
              onClick={() => ref?.current && ref?.current?.click()}
              className="cursor-pointer py-1"
            >
              <label htmlFor="" className={labelClass}>
                {label ?? "Select Dates"}
              </label>
            </div>
            {/* Display selected dates as chips with delete functionality */}
            {datesToDisplay && datesToDisplay.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {renderChips(datesToDisplay)}
              </div>
            )}
          </div>
        </PopoverHandler>
        <PopoverContent className="z-snackbar">
          <DayPicker
            mode="multiple"
            disabled={disabled}
            selected={datesToDisplay}
            onSelect={handleDateChange}
            showOutsideDays
            className="border-0"
            classNames={{
              caption: "flex justify-center py-2 mb-4 relative items-center",
              caption_label: "text-sm font-medium text-gray-900",
              nav: "flex items-center",
              nav_button:
                "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-none transition-colors duration-300",
              nav_button_previous: "absolute left-1.5",
              nav_button_next: "absolute right-1.5",
              table: "w-full border-collapse",
              head_row: "flex font-medium text-gray-900",
              head_cell: "m-0.5 w-9 font-normal text-sm",
              row: "flex w-full mt-2",
              cell: "text-gray-600 rounded-none h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-9 w-9 p-0 font-normal",
              day_range_end: "day-range-end",
              day_selected:
                "rounded-none bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
              day_today: "rounded-none bg-gray-200 text-gray-900",
              day_outside:
                "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
              day_disabled: "text-gray-500 opacity-50",
              day_hidden: "invisible",
            }}
            components={{
              IconLeft: (props) => (
                <FaAngleLeft {...props} className="h-4 w-4 stroke-2" />
              ),
              IconRight: (props) => (
                <FaAngleRight {...props} className="h-4 w-4 stroke-2" />
              ),
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
});
export default DateInput;
// // Default
// import React from "react";
// import dayjs from "dayjs";
// import {
//   Popover,
//   PopoverHandler,
//   Input,
//   PopoverContent,
// } from "@material-tailwind/react";
// import { DayPicker } from "react-day-picker";
// import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
// import { paragraph_text } from "@/assets/css/styles/style";

// // Assets

// // Main
// const DateInput = React.forwardRef((props: any, ref: any) => {
//   const {
//     label,
//     disabled,
//     placeholder,
//     color,
//     size,
//     variant,
//     containerClassName,
//     className,
//     labelClassName,
//     extendCss,
//     selectedDate,
//     setSelectedDate,
//     // value,
//     onChange,
//     ...rest
//   } = props;

//   const height = rest.isHeightForty
//     ? "min-h-[40px] max-h-[40px]"
//     : "min-h-[40px] max-h-[40px]";

//   const containerClass = `controller-container ${
//     disabled ? "custom-input-disabled" : "custom-input"
//   } ${height} ${containerClassName ?? "w-full"} rounded-none`;
//   const inputClass = `${
//     className ?? ""
//   } cursor-pointer font-poppins pb-0 bg-white rounded-none`;
//   const labelClass = `${
//     labelClassName ?? `${paragraph_text} capitalize`
//   } font-poppins`;

//   // Action when date changes
//   const handleDateChange = (value: any) => {
//     setSelectedDate(value);
//     onChange && onChange(value);
//     rest?.name && rest.setValue(rest?.name, value);
//   };

//   return (
//     <div className={`${extendCss ?? ""} flex items-center gap-3 w-full`}>
//       <Popover placement="bottom">
//         <PopoverHandler>
//           <Input
//             ref={ref}
//             crossOrigin={undefined}
//             placeholder={placeholder ?? ""}
//             variant={variant ?? "outlined"}
//             label={label ?? ""}
//             color={color ?? "blue"}
//             size={size ?? "lg"}
//             className={inputClass}
//             labelProps={{ className: labelClass }}
//             containerProps={{ className: containerClass }}
//             style={{ ...rest?.styles }}
//             value={
//               selectedDate ? dayjs(selectedDate).format("MMM D, YYYY") : ""
//             }
//             // value={value ? dayjs(value).format("MMM D, YYYY") : ""}
//             onChange={handleDateChange}
//             // onChange={onChange}
//             // onChange={() => null} // Ensure Input is not editable
//             // {...rest}
//           />
//         </PopoverHandler>
//         <PopoverContent className="z-snackbar">
//           <DayPicker
//             mode="single"
//             disabled={disabled}
//             selected={selectedDate}
//             onSelect={handleDateChange}
//             // onSelect={onChange}
//             showOutsideDays
//             className="border-0"
//             classNames={{
//               caption: "flex justify-center py-2 mb-4 relative items-center",
//               caption_label: "text-sm font-medium text-gray-900",
//               nav: "flex items-center",
//               nav_button:
//                 "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-none transition-colors duration-300",
//               nav_button_previous: "absolute left-1.5",
//               nav_button_next: "absolute right-1.5",
//               table: "w-full border-collapse",
//               head_row: "flex font-medium text-gray-900",
//               head_cell: "m-0.5 w-9 font-normal text-sm",
//               row: "flex w-full mt-2",
//               cell: "text-gray-600 rounded-none h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
//               day: "h-9 w-9 p-0 font-normal",
//               day_range_end: "day-range-end",
//               day_selected:
//                 "rounded-none bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
//               day_today: "rounded-none bg-gray-200 text-gray-900",
//               day_outside:
//                 "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
//               day_disabled: "text-gray-500 opacity-50",
//               day_hidden: "invisible",
//             }}
//             components={{
//               IconLeft: (props) => (
//                 <FaAngleLeft {...props} className="h-4 w-4 stroke-2" />
//               ),
//               IconRight: (props) => (
//                 <FaAngleRight {...props} className="h-4 w-4 stroke-2" />
//               ),
//             }}
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// });

// export default DateInput;
