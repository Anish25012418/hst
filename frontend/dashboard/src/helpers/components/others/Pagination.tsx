// Import - default
import { Input, Option, Select } from "@material-tailwind/react";
import { variant } from "@material-tailwind/react/types/components/button";
import { useContext, useState } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { TbPlayerTrackPrev, TbPlayerTrackNext } from "react-icons/tb";

// Import - assets
import { commonContainerWidth } from "@/assets/css/styles/components-styles";

// Import - helpers
import CustomTooltip from "../animations/CustomTooltip";
import CustomButton from "../buttons/CustomButton";

import { ToastContext } from "@/helpers/contexts";
import { useScreenSize } from "@/helpers/hooks";

// Import - utils
import {
  regex_digit_only,
  regex_alphabet,
} from "@/utils/constants/regex-constants";
import { centerAbsCss } from "@/assets/css/styles/style";

// Main
const Pagination = (props: any) => {
  // Context
  const { setToast } = useContext(ToastContext);

  // Hooks
  const { isLessThanTablet, isLessThan600 } = useScreenSize();

  // Props
  const {
    canPreviousPage,
    canNextPage,
    // pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // state: { pageIndex, pageSize },
    // state: { pageSize },
    setPageNum,
  } = props;

  // State
  const [page, setPage] = useState<number | undefined>(0);

  // Variables
  const isPaginationDisabled = pageCount <= 1;

  // Action to handle the page
  const handlePageChange = (e: any) => {
    const value = e?.target?.value;
    const page = Number(value);

    // Page should be in number format not alphabet
    if (!regex_digit_only.test(value) || regex_alphabet.test(value)) {
      const msg = "Please enter a valid page number.";
      setToast({ msg, status: "warning" });
      if (page === 0) {
        setPage(undefined);
        setPageNum(0);
      }
      // setPage(undefined);
      return;
    }

    // Set the value of page & handle out of bounds
    if (page > pageCount) {
      const msg = "Page is out of range.";
      setToast({ msg, status: "warning" });
      gotoPage(pageCount - 1);
      setPage(pageCount);
      setPageNum(pageCount - 1);
    } else {
      gotoPage(page);
      setPage(page);
      setPageNum(page);
    }
    // if (page <= pageCount) {
    //   const value = e.target.value;
    //   const resultValue = value <= 1 ? 1 : value;
    //   const page = resultValue ? Number(resultValue) - 1 : 0;
    //   gotoPage(page);
    //   setPage(page - 1);
    //   setPageNum(page - 1);
    // } else {
    //   const msg = "Page is out of range.";
    //   setToast({ msg, status: "warning" });
    //   return;
    // }
  };

  // Css
  const divCss = `${commonContainerWidth} h-[40px] max-h-[40px] flex justify-between items-center font-poppins gap-2 rounded-none pt-2 px-0`;
  const trackIconProps = {
    className:
      "p-2 text-sm hover:text-input-blue h-[40px] max-h-[40px] text-sm",
  };

  // Custom props for common prev/next button
  const commonBtnProps = {
    variant: "filled" as variant,
    className:
      "z-mobile_stepper relative bg-brand-gray-600 hover:bg-brand-yellow-600 text-white font-extrabold text-[16px] min-w-[36px] max-w-[36px] min-h-[36px] max-h-[36px] rounded-none",
    // color: "bg-brand-yellow-600 !hover:bg-brand-yellow-500 text-black",
    // fontWeight: "font-semibold",
    // width: "min-w-[40px] max-w-[40px]",
    // height: "min-h-[28px] max-h-[28px]",
  };
  const pageNavIconProps = { className: centerAbsCss };

  return (
    <div className={divCss}>
      {!isLessThanTablet && (
        <div className="flex flex-wrap">
          {/* Items per page selection */}
          <Select
            color="blue-gray"
            label="Items per page"
            // className="text-primary-400 font-poppins"
            className="font-poppins text-xs min-h-[36px] max-h-[36px] rounded-none"
            labelProps={{ className: "" }}
            containerProps={{ className: "rounded-none" }}
            // value={pageSize.toString() ?? "20"}
            value="20"
            placeholder="Items per page Selection"
            onChange={(value: any) => {
              setPageSize(Number(value) ?? 20);
              setPage(0);
              setPageNum(0);
            }}
            // disabled={isPaginationDisabled}
          >
            {[20, 30, 40, 50].map((pageSize: any) => (
              <Option
                key={pageSize}
                className="text-primary-400 text-sm"
                value={pageSize.toString()}
              >
                {pageSize}
              </Option>
            ))}
          </Select>
        </div>
      )}

      {/* Handle previous page logic */}
      <div className="page-navigation flex gap-2 items-center">
        {!isLessThan600 && (
          <CustomTooltip content="First page">
            <CustomButton
              {...trackIconProps}
              onClick={() => {
                gotoPage(0);
                setPage(0);
                setPageNum(0);
              }}
              disabled={!canPreviousPage || isPaginationDisabled}
              leftIcon={<TbPlayerTrackPrev />}
            />
          </CustomTooltip>
        )}

        <CustomTooltip content="Previous page">
          <CustomButton
            {...commonBtnProps}
            onClick={() => {
              previousPage();
              setPage((page: any) => (page as number) - 1);
              setPageNum((page: any) => (page as number) - 1);
            }}
            disabled={!canPreviousPage || isPaginationDisabled}
            leftIcon={<GrLinkPrevious {...pageNavIconProps} />}
          />
        </CustomTooltip>

        {/* Page input number */}
        <div className="w-[110px] flex items-center max-h-[36px]">
          <Input
            // placeholder="pagination input"
            crossOrigin="anonymous"
            label="Page no."
            color="blue-gray"
            size="md"
            type="text"
            disabled={isPaginationDisabled}
            // defaultValue={defaultValue}
            // value={value}
            // onChange={(e) => onChange(e)}
            containerProps={{
              className: "max-w-[110px] h-[40px] max-h-[36px] rounded-none",
            }}
            className={`${
              isPaginationDisabled ? "text-primary-300" : "text-primary-500"
            } max-w-[110px] font-semibold h-[36px] max-h-[36px] rounded-none`}
            labelProps={{ className: "max-w-[110px] !rounded-none" }}
            style={{
              width: "110px",
              maxWidth: "110px",
              maxHeight: "36px",
              fontSize: "14px",
            }}
            onChange={handlePageChange}
            // disabled={isPaginationDisabled}
            value={page === 0 ? 1 : page} // Ensure empty string for page 0
            // value={page === 0 ? "" : page.toString()} // Ensure empty string for page 0
            // defaultValue={(page as number) > 0 ? page : pageIndex + 1}
          />
        </div>
        {/* Page count */}
        <div className="min-w-fit text-[14px] font-medium">
          of {pageCount === 0 ? 1 : pageCount}
        </div>

        {/* Handle next page logic */}
        <CustomTooltip content="Next page">
          <CustomButton
            {...commonBtnProps}
            onClick={() => {
              nextPage();
              setPage((page: any) => {
                if ((page as number) === 0) {
                  return 2;
                } else {
                  return (page as number) + 1;
                }
              });
              setPageNum((page: any) => {
                if ((page as number) === 0) {
                  return 2;
                } else {
                  return (page as number) + 1;
                }
              });
            }}
            disabled={!canNextPage || isPaginationDisabled}
            rightIcon={<GrLinkNext {...pageNavIconProps} />}
          />
        </CustomTooltip>

        {!isLessThan600 && (
          <CustomTooltip content="Last page">
            <CustomButton
              {...trackIconProps}
              onClick={() => {
                gotoPage(pageCount - 1);
                setPage(pageCount);
                setPageNum(pageCount - 1);
              }}
              disabled={!canNextPage || isPaginationDisabled}
              leftIcon={<TbPlayerTrackNext />}
              // leftIcon={!isLessThanTablet && <TbPlayerTrackNext />}
            />
          </CustomTooltip>
        )}
      </div>
    </div>
  );
};

export default Pagination;
