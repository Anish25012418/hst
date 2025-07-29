// Import - helpers
import { useContentTimeout, useScreenSize } from "@/helpers/hooks";
import { useGlobalStore } from "@/helpers/stores";

// Import - relative
import Sidebar from "./components/Sidebar";
import { defaultTransition } from "@/assets/css/styles/style";

// Main
const DashboardSidebar = () => {
  // Stores
  const { initialState: globalStore } = useGlobalStore();

  // Stores Variables
  const { isSidebarOpen } = globalStore?.layout;

  // Hooks
  const { showContent } = useContentTimeout(isSidebarOpen); // Show content only when the timer is up
  const { isLessThanTablet } = useScreenSize(); // Responsive screen sizes

  // Sidebar css
  const defaultSidebarCss = `${defaultTransition} z-snackbar bg-blue-300 class-sidebar min-h-[calc(100vh-72px)] bg-brand-gray-600 min-h-screen max-h-screen sidebar-scrollbar scrollbar-mt-16 overflow-x-hidden overflow-y-auto ease-in-out`;
  const contentSidebarCss = `${
    showContent || !isLessThanTablet ? "flex" : "hidden"
  } transition-all duration-700`;
  const displaySidebarCss = isSidebarOpen
    ? // ? "absolute lg:relative top-[72px] lg:top-0 w-[280px]"
      "absolute lg:relative lg:top-0 w-[280px]"
    : "relative w-0 lg:w-[280px]";
  const sidebarCss = `${defaultSidebarCss} ${displaySidebarCss}`;

  return (
    <aside className={sidebarCss}>
      <div className={contentSidebarCss}>
        <Sidebar />
      </div>
    </aside>
  );
};

export default DashboardSidebar;
