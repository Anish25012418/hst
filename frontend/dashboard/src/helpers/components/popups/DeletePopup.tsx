// Import - default
import { useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FcInfo } from "react-icons/fc";

// Import - assets
import { display_6_text, span_text } from "@/assets/css/styles/style";

// Import - helpers
import { useScrollLock } from "@/helpers/hooks";

// Import - relative
import { DeletePopupSchema } from "@/utils/schemas/ComponentsSchema";
import CustomTypography from "../texts/CustomTypography";
import CustomButton from "../buttons/CustomButton";

// Main
const DeletePopup = (props: DeletePopupSchema) => {
  // Props
  const {
    isOpen,
    css,
    extendCss,
    question,
    caption,
    okPrompt,
    cancelPrompt,
    handleOkayPrompt,
    handleCancelPrompt,
    isInfoIcon,
    hideMiniIcon,
    icon,
    isLoading,
  } = props;

  // Hooks
  const { lockScroll, unlockScroll } = useScrollLock();

  // Css
  const defaultCss =
    "z-modal relative w-fit p-4 text-center text-[#121212] bg-white rounded-none sm:p-5 flex flex-col items-center gap-4 shadow-xl";
  const popupCss = css ?? `${extendCss ?? "max-w-[450px]"} ${defaultCss}`;

  useEffect(() => {
    lockScroll();
    return () => unlockScroll();
  }, [lockScroll, unlockScroll]);

  return (
    <>
      {isOpen && (
        <div className="z-modal fixed top-0 left-0 w-full h-full grid place-items-center bg-black/50">
          <div className={popupCss}>
            {icon ??
              (isInfoIcon ? (
                <FcInfo className={`${display_6_text} text-[#5d5d5d]`} />
              ) : (
                <FaRegTrashAlt className={`${display_6_text} text-[#5d5d5d]`} />
              ))}
            <div className="flex flex-col gap-1">
              {question && (
                // <CustomTypography color="#5d5d5d">{question}</CustomTypography>
                <CustomTypography>{question}</CustomTypography>
              )}
              {caption && (
                <div className="min-h-[2rem] flex justify-center items-center gap-1.5 text-gray-500 rounded-none">
                  {!hideMiniIcon && <FaInfoCircle />}
                  <CustomTypography>{caption}</CustomTypography>
                </div>
              )}
            </div>

            <div
              className={`${span_text} flex justify-center items-center space-x-4 px-16`}
            >
              {cancelPrompt && (
                <CustomButton
                  isMinimum
                  onClick={handleCancelPrompt}
                  status="secondary"
                >
                  {cancelPrompt}
                </CustomButton>
              )}
              {okPrompt && (
                <CustomButton
                  isMinimum
                  loading={isLoading}
                  // status="error"
                  onClick={handleOkayPrompt}
                  // css="min-w-fit py-2 px-3 font-medium text-center text-white bg-red-500 hover:bg-red-600 rounded-none"
                >
                  {okPrompt}
                </CustomButton>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeletePopup;
