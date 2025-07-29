// Import - default
import { HiOutlineMenu } from "react-icons/hi";
import { MdMenuOpen } from "react-icons/md";

// Import - helpers
import { DashboardLogo, Dropdown } from "@/helpers/components";
import { useContentTimeout, useScreenSize } from "@/helpers/hooks";
import { useAuthApi, useGlobalStore } from "@/helpers/stores";

// Import - utils
import {
  NOTIFICATION_ITEMS,
  USER_DROPDOWN_ITEMS,
} from "@/utils/constants/layout-constants";
import { getAuthDataInLocalStorage } from "@/utils/methods/browser-methods";

// Main
const DashboardHeader = () => {
  // Stores
  const { initialState: globalStore, ...state } = useGlobalStore();

  // Variables
  const { isSidebarOpen } = globalStore?.layout;

  // Hooks
  const { showContent } = useContentTimeout(isSidebarOpen, 200); // Show content only when the timer is up
  const { isLessThan1024, isLessThanTablet } = useScreenSize();
  const { handleLogout } = useAuthApi();

  // Action when the icon is clicked
  const onClick = state.handleToggleSidebar;

  // Variables
  const hideText = isLessThanTablet; // Hide text in the logo

  // Css - menu button
  const defaultMenuCss = "z-modal transiton-all absolute lg:hidden";
  const closeMenuCss = showContent
    ? "left-[280px] bottom-3.5 text-3xl duration-700 bg-transparent text-brand-yellow-600 p-1"
    : "left-5 text-2xl duration-500 text-brand-yellow-600";
  const className = `${defaultMenuCss} ${closeMenuCss} !text-[36px]`;
  const className2 = `${defaultMenuCss} ${closeMenuCss}`;

  // Custom props - icon in menu
  const iconProps = { onClick, className };
  const iconProps2 = { onClick, className: className2 };

  return (
    <header className="class-dashboard_header relative flex justify-end items-center px-4 bg-brand-gray-600">
      <div className="flex items-center">
        {isSidebarOpen ? (
          <MdMenuOpen {...iconProps} />
        ) : (
          <HiOutlineMenu {...iconProps2} />
        )}
      </div>

      {!isSidebarOpen && isLessThan1024 && (
        <DashboardLogo
          css="z-modal absolute top-1/2 left-12 sm:left-1/2 transform sm:-translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out flex items-center"
          hideText={hideText}
          textColor="text-white"
        />
      )}

      {/* User profile dropdown */}
      <div className="flex items-center gap-4">
        <Dropdown
          items={NOTIFICATION_ITEMS}
          textColor="text-brand-yellow-600"
        />
        <Dropdown
          items={USER_DROPDOWN_ITEMS({
            handleLogout,
            ...getAuthDataInLocalStorage()?.data,
          })}
          textColor="text-brand-yellow-600"
          hideInMobile={true}
        />
      </div>
    </header>
  );
};

export default DashboardHeader;
