// Default
import { FcHome } from "react-icons/fc";

// Helpers
import { CustomTypography } from "@/helpers/components";

// Main
export default function ErrorPage() {
  return (
    <div className="w-full h-[calc(100vh-100px)] max-h-[calc(100vh-100px)] flex flex-col gap-10 justify-center items-center">
      <CustomTypography variant="h1">404 - Page Not Found</CustomTypography>

      {/* Render a custom error message */}
      <CustomTypography variant="h3">
        The page you requested does not exist.
      </CustomTypography>

      <div className="grid place-items-center gap-1">
        <FcHome className="text-[32px]" />
        <CustomTypography href="/" variant="small">
          [Go back to Home page]
        </CustomTypography>
      </div>
    </div>
  );
}
