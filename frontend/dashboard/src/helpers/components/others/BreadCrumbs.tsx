// Imports - default
import { MdHome } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

// Import - helpers
import { useScreenSize } from "@/helpers/hooks";
import { toTitleCase } from "@/utils/methods/string-methods";

// Main
const BreadCrumbs = () => {
  const { isLessThanTablet } = useScreenSize();

  // Variables
  const segments = window.location.pathname
    .split("/")
    .filter((segment) => segment !== "");
  const pathSegments =
    isLessThanTablet && segments?.length > 2 ? segments.splice(2, 1) : segments;

  return (
    <nav
      // className="min-w-[calc(360px-8px)] flex overflow-x-auto thin-scrollbar w-full px-4 lg:px-7 bg-white min-h-[40px]"
      className="flex overflow-x-auto thin-scrollbar w-full px-4 lg:px-7 bg-white min-h-[40px]"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-[14px] font-medium text-gray-600 hover:text-primary-400"
          >
            <MdHome className="mr-2 text-[20px]" />
            Home
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const temp = segment.charAt(0).toUpperCase() + segment.slice(1);
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const displayText = toTitleCase(
            temp.includes("-") ? temp.split("-").join(" ") : temp
          );
          const hideRoutes = ["user", "editor", "admin", "superadmin"];
          if (hideRoutes.includes(segment)) return;

          return (
            <li key={index}>
              <div className="flex items-center text-gray-700 ">
                <FaAngleRight className="text-gray-700 text-md" />
                <Link
                  to={href}
                  className={`ms-1 text-[14px] font-medium md:ms-2 text-gray-600 hover:text-primary-400`}
                >
                  {displayText}
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
