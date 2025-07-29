// Import - default
import "react-toastify/dist/ReactToastify.css";
import { createContext, useEffect, useState } from "react";
import { Bounce, ToastContainer, toast as toastify } from "react-toastify";

// Import - utils
import { ChildrenSchema } from "@/utils/schemas/GlobalSchema";
import { ToastContextSchema } from "@/utils/schemas/ContextsSchema";

// Initial state of the context
const initialState: ToastContextSchema = {
  toast: {
    status: "info",
    msg: "",
  },
  setToast: () => {},
};

// Main entry point through which the context is initiated
export const ToastContext = createContext<ToastContextSchema>({
  toast: initialState?.toast,
  setToast: () => {},
});

// Main
export const ToastProvider = ({ children }: ChildrenSchema) => {
  // States
  const [toast, setToast] = useState<ToastContextSchema["toast"]>(
    initialState?.toast
  );

  // States variables
  const { msg, status: type, isWidthFull, duration, isPopup } = toast;

  // Function to calculate center position
  const calculateCenterPosition = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const popupWidth = 400; // Assuming popup width is 400px

    const leftPosition = (screenWidth - popupWidth) / 2;
    const topPosition = screenHeight / 2 - 100; // Adjust as needed for vertical centering

    return {
      left: `${leftPosition}px`,
      top: `${topPosition}px`,
    };
  };

  // Css variables
  const popupCss = {
    width: "fit-content",
    maxWidth: "400px",
    position: "fixed",
    padding: "20px",
    backgroundColor: "#ffffff",
    // borderRadius: "8px",
    borderRadius: "0px !important",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    ...calculateCenterPosition(),
  };
  const widthFullCss = {
    width: "100vw",
    maxWidth: "2028px",
    position: "fixed",
    margin: "0 auto",
    borderRadius: "0px !important",
    top: 0,
    left: 0,
    flex: "unset",
    justifyContent: "center",
    alignItems: "center",
  };
  const modifiedCss = isWidthFull ? widthFullCss : isPopup ? popupCss : {};

  useEffect(() => {
    if (msg) {
      // Set ref to true so that it does not execute twice by mistake

      // Toast config function
      const showToast = () => {
        const styles = {
          // Dynamic variables
          type,
          autoClose: isPopup ? 9000 : duration ?? 7000,
          // autoClose: false,
          closeButton: true,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          className: `text-[12px] sm:text-[14px] font-medium`,
          style: {
            fontFamily: "Poppins, sans-serif",
            ...modifiedCss,
          },
        };

        toastify(msg, styles);
      };

      // Call the toast config function
      showToast();
      setToast(initialState?.toast);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg, setToast, type, duration, isWidthFull]);

  return (
    <>
      <ToastContainer newestOnTop={true} />
      <ToastContext.Provider value={{ toast, setToast }}>
        {children}
      </ToastContext.Provider>
    </>
  );
};

export default ToastProvider;
