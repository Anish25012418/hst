"use client";

// Import - default
import { useEffect } from "react";

// Import - helpers
import { NavbarWithMegaMenu } from "@/helpers/components";
import { useHomePageStore, useHomePageApi } from "@/helpers/stores";

// Import - utils
import { navMenuList } from "@/utils/constants/layout-constants";

// Main
export default function PublicHeader() {
  // Stores
  const { categoryMenu, setHomePage } = useHomePageStore();

  // Apis
  const homePageData = useHomePageApi();

  // Variables
  const menuItem = categoryMenu?.[0]?.menu_pattern ?? [];
  if(!menuItem.some((item) => item?.title?.name === "Day Trips"))
  {
    menuItem.push({
      title: {
        isMulti: true,
        name: "Day Trips"
      },
      categories: [
        {slug: "kathmandu-day-trips", title: "Kathmandu Day Trips"},
        {slug: "pokhara-day-trips", title: "Pokhara Day Trips"}
      ]
    });
  }

  // Get all the static page data here
  useEffect(() => {
    setHomePage(homePageData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homePageData?.getAllHomepage?.data]);

  // Variables
  const navbarWithMegaMenuProps = { list: navMenuList, menuItem };

  return <NavbarWithMegaMenu {...navbarWithMegaMenuProps} />;
}
