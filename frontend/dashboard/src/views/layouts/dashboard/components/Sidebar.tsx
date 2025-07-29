// Import - default
import { Link, useLocation } from "react-router-dom";

// Import - helpers
// import { useScrollLock } from "@/helpers/hooks";
import { useGlobalStore } from "@/helpers/stores";
import { DashboardLogo } from "@/helpers/components";

// Import - utils
import * as d from "@/utils/constants/layout-constants";
import { getUniqueKey } from "@/utils/methods/string-methods";
import { NavItemSchema } from "@/utils/schemas/GlobalSchema";

// Main
const Sidebar = () => {
  // Location
  const { pathname } = useLocation();

  // Variables
  const arrEndpoints = pathname?.split("/");
  const endpoint = arrEndpoints[arrEndpoints.length - 1];

  // Css
  const linkCss = (href: string) => {
    // Calculate href, endpoint comparisions
    const isEqual = endpoint === href;
    const isComparision = endpoint === href?.split("/")[1];
    const isHomeAndDashboard =
      ["", "user", "admin"].includes(endpoint?.trim() || "") &&
      ["dashboard", ""].includes(href || "");

    const isTruthy = isEqual || isComparision || isHomeAndDashboard;

    const defaultLinkCss =
      "w-full font-medium text-[15px] items-center rounded-none p-3.5 flex group cursor-pointer";
    const activeLinkCss =
      "bg-brand-yellow-500 text-brand-gray-1000 hover:bg-brand-yellow-500 hover:text-brand-gray-1000";

    return `${
      isTruthy ? activeLinkCss : "text-white hover:bg-brand-gray-900"
    } ${defaultLinkCss} `;
  };

  // Individual sidebar items' block to be seen
  const SidebarItemsBlock = ({ item }: { item: NavItemSchema }) => {
    // Stores
    const { handleToggleSidebar } = useGlobalStore();

    return (
      <>
        <Link
          to={item?.href !== "no-href" ? item?.href : "#"}
          onClick={handleToggleSidebar}
        >
          <div className="px-4 pt-4 pb-2 font-semibold text-sm tracking-widest text-brand-yellow-600 uppercase duration-1000">
            {item?.label ?? ""}
          </div>
        </Link>
        {renderMenuItems(item?.child ?? [])}
      </>
    );
  };

  // Lock the scrollbar in mobile if a scrollbar on sidebar appears
  // useEffect(() => {
  //   if (isMobile) {
  //     lockScroll();
  //   }
  //   return () => unlockScroll();
  // }, [lockScroll, isMobile, unlockScroll]);

  // Main
  const renderMenuItems = (menu: NavItemSchema[]) => {
    // Stores
    const { handleToggleSidebar } = useGlobalStore();

    return menu?.map(({ icon: Icon, label, href }: NavItemSchema, index) => {
      return (
        <Link
          key={index}
          to={href || "#"}
          className={linkCss(href)}
          onClick={handleToggleSidebar}
        >
          <span className="text-lg ease-in-out duration-700">{Icon}</span>
          <span className="ml-2">{label}</span>
        </Link>
      );
    });
  };
  return (
    <div className="w-full h-full flex-col justify-between flex">
      <DashboardLogo />
      {d.SIDEBAR_ITEMS?.map((item: NavItemSchema, idx: number) => (
        <SidebarItemsBlock key={getUniqueKey(idx, item?.href)} item={item} />
      ))}
    </div>
  );
};

export default Sidebar;
