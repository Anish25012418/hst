// Import - default
import { IoBicycleSharp } from "react-icons/io5";

// Import - helpers
import CustomTypography from "../texts/CustomTypography";

// Main
const CustomError = (props: any) => {
  // Props
  const { title, errorStatus } = props;

  // Verify status
  const displayText =
    errorStatus === 401
      ? "Unauthorized"
      : errorStatus === 403
      ? "Forbidden"
      : // : errorStatus === 404
        // ? "Not Found"
        "Not Found";

  return (
    <div className="min-h-[calc(100vh-80px)] bg-white grid place-items-center">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <CustomTypography className="text-[20rem]">
          {errorStatus ?? 404}
        </CustomTypography>
        <CustomTypography className="text-[32px] font-medium">
          {title ?? "Page"} {displayText}
        </CustomTypography>
      </div>
      <div className="flex justify-center items-center gap-2 cursor-pointer text-primary-400 hover:text-blue-400">
        <a href="/" className="py-1 font-bold">
          <IoBicycleSharp className="text-xl font-bold" />
        </a>
        <a href="/" className="font-bold">
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default CustomError;
