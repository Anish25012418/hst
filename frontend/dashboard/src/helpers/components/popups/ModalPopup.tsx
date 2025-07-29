// Import - buttons
import CloseIconButton from "../buttons/CloseIconButton";

// Import - utils
import { ModalPopupSchema } from "@/utils/schemas/ComponentsSchema";

// Main
const ModalPopup = (props: ModalPopupSchema) => {
  // Props
  const { children, css, extendCss, isOpen, type, handleClose, showCloseBtn } =
    props;

  // Css
  const defaultCss = "relative shadow-md min-w-[calc(360px)]";
  const rounded = type !== "large" ? "rounded-none" : "rounded-0";
  const modifiedCss = `${defaultCss} ${rounded} ${extendCss ?? "bg-white"}`;
  const className = `${css ?? modifiedCss} min-w-[360px]`;

  return (
    <>
      {isOpen && (
        <div className="z-snackbar absolute top-0 left-0 w-screen h-screen grid place-items-center text-gray-900 bg-black/50 min-h-screen">
          <div className={className}>
            {showCloseBtn && (
              <CloseIconButton
                css="absolute z-snackbar top-6 right-7 text-2xl rounded-full bg-red-400 text-white p-1.5 shadow-md hover:bg-red-600"
                onClick={handleClose}
              />
            )}
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalPopup;
