// Default
import { useRef } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

// Import - helpers
import CustomButton from "../buttons/CustomButton";
import CSVExport from "../exports/CSVExport";
import TextInput from "../inputs/common/TextInput";
import Popup from "../popups/Popup";

// Main
const TableOptions = (props: any) => {
  // Ref
  const inputRef = useRef<HTMLInputElement>(null);

  // Props
  const {
    // Filter part
    searchInput,
    setSearchInput,
    handleSearchFilter,
    hideTableActions,

    // Select props
    showFilter,
    selectLabel,
    selectValue,
    selectOptions,
    selectOnChange,
    isSelectLoading,

    // Control buttons props
    addLabel,
    searchLabel,
    handlePost,
    exportFilename,
    exportData,
  } = props;

  // Action when the search input changes
  const handleSearchInput = (e: any) => {
    // Get the required values from event
    const value = e?.target?.value || undefined;

    // Set the value of search input
    setSearchInput(value);

    // Filter only when there is filter function
    handleSearchFilter(value);
  };

  return (
    <div className="h-[40px] max-h-[40px] flex flex-col md:flex-row justify-between items-start md:items-center">
      <div className="search-filter flex md:flex-nowrap items-center gap-5">
        {/* <div className="search-section transition duration-800 w-[280px] sm:w-[280px] max-h-[40px]"> */}
        <div className="search-section transition duration-800 max-h-[40px]">
          <TextInput
            ref={inputRef}
            rightIcon={<IoIosSearch className="text-gray-500 text-[20px]" />}
            label={searchLabel}
            value={searchInput || ""}
            onChange={handleSearchInput}
            className="pr-8"
            containerClassName="w-full"
          />
        </div>

        {showFilter && selectLabel && (
          // <SelectInput
          //   label={selectLabel}
          //   value={selectValue}
          //   options={selectOptions}
          //   onChange={selectOnChange}
          //   containerClassName="max-w-[200px] min-h-[40px]"
          //   isResponsive
          // />
          <Popup
            label={selectLabel}
            value={selectValue}
            options={selectOptions}
            onChange={selectOnChange}
            isLoading={isSelectLoading}
          />
        )}
      </div>

      <div className="flex flex-row justify-between md:justify-end items-center gap-2 mt-2 md:mt-0">
        {!hideTableActions && addLabel && handlePost && (
          <CustomButton
            isPadding
            onClick={handlePost}
            color="bg-brand-gray-600 text-xs text-white hover:bg-brand-yellow-600 hover:text-white font-[1000]"
          >
            <IoAddCircleOutline className="text-lg font-bold" />
            {addLabel ?? "Register"}
          </CustomButton>
        )}
        {addLabel && !handlePost && addLabel}
        <CSVExport filename={exportFilename} data={exportData} />
      </div>
    </div>
  );
};

export default TableOptions;
