// Import - default
import React from "react";

// Import - assets
import * as s from "@/assets/css/styles/style";

// Import - helpers
import CustomTooltip from "../animations/CustomTooltip";
import { useBoxVisible, useScreenSize } from "@/helpers/hooks";
import { useAuthStore } from "@/helpers/stores";
import CustomTypography from "../texts/CustomTypography";
import CustomButton from "../buttons/CustomButton";

// Import - utils
import { getUniqueKey } from "@/utils/methods/string-methods";

// Main
const Dropdown = React.forwardRef((props: any, ref: any) => {
  // Props
  const { textColor, items, parentCss, childCss, status, hideInMobile } = props;

  // Hooks
  const { isBoxVisible, setIsBoxVisible, domRef } = useBoxVisible();
  const { isLessThan600 } = useScreenSize();

  // Stores
  const { initialState: authStore } = useAuthStore();

  // Variables
  const { label, caption, icon, child } = items ?? {};

  // Action when the dropdown is clicked
  const toggleDropdown = () => setIsBoxVisible(!isBoxVisible);

  // Css - colors based on status where d is for parent and e is for child
  const [d, e] =
    status === "link"
      ? [s.primary_bg, s.link_bg]
      : [
          `${s.primary_text} shadow-md border-[1px] border-gray-400`,
          s.link_text,
        ];

  // Css - dropdown
  const logoutCss = (label: string) =>
    label === "Logout" ? "hover:text-red-400" : "";
  const defaultParentDiv = `z-modal ${d} class-dropdown min-w-[13rem] transition-all duration-700 ease-in-out absolute right-2 mt-7 right-0 w-fit top-[48px] rounded-none bg-white`;
  const showCss = isBoxVisible ? "h-fit flex flex-col" : "hidden h-0";
  const dropdownParent = parentCss ?? `${defaultParentDiv} ${showCss}`;
  parentCss ?? `${defaultParentDiv} ${showCss}`;
  const dropdownChild = (label: string) =>
    `${e} ${logoutCss(label)} flex items-center px-1 rounded-[30px]`;
  const dropdownTextDiv =
    childCss ??
    "w-full flex flex-col font-medium text-sm items-center py-0 cursor-pointer rounded-none";

  // Custom button on user dropdown
  const DropdownButton = React.forwardRef(
    ({ icon, label, value, ...rest }: any, ref: any) => (
      <div ref={ref} className={dropdownTextDiv}>
        <CustomButton
          disabled={authStore?.isLoadingLogout}
          variant="filled"
          className={`${
            label === "Logout" ? "hover:text-red-500" : "hover:text-input-blue"
          }  w-full px-2 py-3 text-[14px] normal-case text-primary-500 bg-transparent hover:bg-transparent font-poppins font-medium flex items-center gap-2 ring-0 focus:outline-none focus:ring-0 active:bg-transparent focus:bg-transparent shadow-none hover:shadow-none focus:border-0 border-0 outline-none`}
          leftIcon={icon}
          {...rest}
        >
          {value}
        </CustomButton>
      </div>
    )
  );

  // Display the label and caption section
  const LabelCaptionSection = ({ css }: any) => (
    <div className={css ?? "flex flex-col min-w-[80px]"}>
      <CustomTypography variant="h6" className={`${textColor} font-normal`}>
        {label}
      </CustomTypography>
      {caption && (
        <CustomTypography
          // variant="small"
          className={`${textColor} self-start text-[12px] font-bold tracking-wider`}
        >
          {caption}
        </CustomTypography>
      )}
    </div>
  );

  return (
    <>
      <div
        className="flex gap-2 justify-center items-center cursor-pointer text-new-black-400"
        onClick={toggleDropdown}
      >
        {icon && icon}
        {label && (hideInMobile ? !isLessThan600 : true) && (
          <LabelCaptionSection />
        )}
      </div>

      <div ref={ref ?? domRef} className={dropdownParent}>
        {(hideInMobile ? isLessThan600 : false) && (
          <LabelCaptionSection css="p-2 flex flex-col justify-center items-center bg-brand-gray-600 rounded-t-lg" />
        )}
        {child?.map(({ label, value, ...rest }: any, idx: number) => (
          <div key={getUniqueKey(idx, label)} className={dropdownChild(label)}>
            {label === "Email" ? (
              <CustomTooltip
                content={value}
                className="z-snackbar bg-primary-500 font-poppins text-[12px]"
              >
                <DropdownButton
                  value={`@${value?.split("@")[0]}`}
                  {...{ ...rest, label }}
                />
              </CustomTooltip>
            ) : (
              <DropdownButton value={value} {...{ ...rest, label }} />
            )}
          </div>
        ))}
      </div>
    </>
  );
});

export default Dropdown;
