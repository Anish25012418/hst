// Import - default
import { Outlet } from "react-router-dom";

// Import - assets
import { appWidth, defaultTransition } from "@/assets/css/styles/app-styles";

// Import - relative
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

// Main
const DashboardLayout = () => {
  return (
    <div
      className={`${appWidth} ${defaultTransition} class-dashboard_layout h-screen flex`}
    >
      <DashboardSidebar />
      <div className="flex-1 grid grid-rows-[64px_calc(100vh-64px)]">
        <DashboardHeader />
        <main className="class-main-body w-screen lg:w-[calc(100vw-280px)] lg:max-w-[calc(2028px-280px)] animate-showUp">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
