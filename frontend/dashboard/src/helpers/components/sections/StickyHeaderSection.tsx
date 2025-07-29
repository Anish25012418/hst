// Import - default
import { variant } from "@material-tailwind/react/types/components/button";
import { useContext } from "react";
import { MdOutlineWatchLater } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { GiCancel } from "react-icons/gi";

// Import - helpers
import Spinner from "../animations/Spinner";
import CustomButton from "../buttons/CustomButton";
import BreadCrumbs from "../others/BreadCrumbs";
import { ToastContext } from "@/helpers/contexts";
import { useScreenSize } from "@/helpers/hooks";

// Import - utils
import * as t from "@/utils/constants/toast-constants";
import { ChildrenSchema } from "@/utils/schemas/GlobalSchema";
import CustomTypography from "../texts/CustomTypography";
import { openWebUrl } from "@/utils/methods/app-methods";

// For the submit and cancel button
const BtnTitle = ({ children }: ChildrenSchema) => (
  <span className="text-[12px] font-semibold">{children}</span>
);

// Main
const StickyHeaderSection = (props: any) => {
  // Props
  const {
    // title,
    isLoading,
    type,
    setForm,
    caption,
    liveUrl,

    // Submit button
    isSubmitDisabled,
    submitTitle,

    // Draft button
    draftTitle,
    isDraftEnabled,
    handleFormDraft,

    // Cancel button
    cancelTitle,
    isCancelDisabled,
    handleFormCancel,
    rest,
  } = props;

  // Context
  const { setToast } = useContext(ToastContext);

  // Hooks
  const { isLessThan600 } = useScreenSize();

  // Variables
  // const parentBg = bg ?? "bg-brand-gray-600";
  // const parentBg = "bg-brand-yellow-1000";
  const isDisableFeature = [true, false]?.includes(isSubmitDisabled);
  const parentBg = "bg-white";

  // Action when the disabled submit button is clicked
  const handleDisabledClick = () => {
    if (isDisableFeature && isSubmitDisabled) {
      setToast(t.CHANGE_VALUES_TO_EDIT_ERROR);
    }
  };

  // Custom props for action icons
  const tickIconProps = {
    className: "text-[18px] font-bold",
  };
  const draftIconProps = {
    className: "text-[22px] font-bold",
  };
  const cancelIconProps = {
    className: "text-[20px] font-bold",
  };

  // Custom props for custombutton
  const commonBtnProps = {
    variant: "filled" as variant,
    height: "h-[24px] max-h-[24px]",
    width: isLessThan600
      ? "min-w-[72px] max-w-[72px]"
      : "min-w-[120px] max-w-[120px]",
    extendCss: "tracking-tight",
  };

  return (
    <div
      className={`${parentBg} title-section sticky top-0 z-tooltip w-full flex-col shadow-md`}
    >
      <div className="w-full max-h-[40px] flex items-center justify-between">
        {/* <CustomTypography variant="h6">{title}</CustomTypography> */}
        {caption ? (
          <CustomTypography variant="h6" className="px-4">
            {caption}
          </CustomTypography>
        ) : (
          <BreadCrumbs />
        )}

        <div className="px-6 py-2 flex gap-4 items-center">
          <div className="" onClick={handleDisabledClick}>
            <CustomButton
              type="submit"
              {...(isDisableFeature && {
                disabled: isSubmitDisabled,
              })}
              // loading={isLoading}
              // loading={true}
              color="bg-brand-yellow-600 hover:bg-brand-gray-600 text-brand-gray-600 hover:text-brand-yellow-600"
              {...commonBtnProps}
            >
              {isLoading ? (
                <Spinner extendCss="w-6 h-6" />
              ) : isLessThan600 ? (
                <SiTicktick {...tickIconProps} />
              ) : (
                // <CustomTypography className="font-bold">
                <BtnTitle>{submitTitle ?? "Post"}</BtnTitle>
                // </CustomTypography>
              )}
            </CustomButton>
          </div>

          {/* Draft button goes here */}
          {isDraftEnabled && (
            <CustomButton
              status="info"
              disabled={isCancelDisabled}
              onClick={handleFormDraft && handleFormDraft}
              color="bg-transparent sm:bg-blue-100 sm:hover:bg-blue-200 text-brand-gray-600 hover:text-blue-600"
              {...commonBtnProps}
            >
              {isLessThan600 ? (
                <MdOutlineWatchLater {...draftIconProps} />
              ) : (
                <span className="text-[12px] font-semibold">
                  {draftTitle ?? "Draft"}
                </span>
              )}
            </CustomButton>
          )}

          {/* Cancel button goes here */}
          <CustomButton
            status="secondary"
            disabled={isCancelDisabled}
            onClick={
              handleFormCancel
                ? handleFormCancel
                : () => {
                    setForm({ formData: {}, isOpen: false, type });
                    rest && rest?.reset();
                  }
            }
            color="bg-transparent sm:bg-white sm:hover:bg-gray-100 text-brand-gray-600 hover:text-brand-gray-500"
            {...commonBtnProps}
          >
            {isLessThan600 ? (
              <GiCancel {...cancelIconProps} />
            ) : (
              <span className="text-[12px] font-semibold">
                {cancelTitle ?? "Cancel"}
              </span>
            )}
          </CustomButton>
        </div>
      </div>

      {liveUrl && (
        <div className="w-full flex gap-1 justify-center items-center">
          <div
            className="text-xl underline cursor-pointer text-brand-yellow-500 hover:text-brand-yellow-700"
            onClick={openWebUrl({ fullUrl: liveUrl })}
          >
            Live at this link
          </div>
        </div>
      )}
    </div>
  );
};

export default StickyHeaderSection;
