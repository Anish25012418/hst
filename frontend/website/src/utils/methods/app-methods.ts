/**
 * @title : app-methods
 * @description: app specific methods used in the website
 *
 **/

// Default
import { defaultFontFamily } from "@/assets/fonts";
import { NEXT_PUBLIC_BACKEND_URL } from "@/config/env";

// Show active color for the Navlink
export const getActiveLinkCss = (props: any) => {
  // Props
  const { href, pathname, isMegaMenu } = props;

  //  Variables
  const megaMenuSecond = href?.split("/")[1]; // In /home/folder/, I am targeting home
  const pathNameSecond = pathname?.split("/")[1]; // In /home, I am targeting home

  // Action - check if the pathname matches the href
  const isSameLocation = href === pathname;
  const isActiveLink =
    isSameLocation || (isMegaMenu ? megaMenuSecond === pathNameSecond : false);

  // Link css
  const activeCss = isActiveLink ? "text-gjn-green" : "";
  const hoverCss =
    "hover:text-gjn-green cursor-pointer transition-all duration-400 ease-in-out";
  const link = `${activeCss} ${hoverCss} ${defaultFontFamily} font-medium`;

  // Background css
  const defaultBgCss = "hover:bg-gjn-light-green";
  const activeBgCss = isSameLocation ? "bg-gjn-light-green" : "";
  const bg = `${defaultBgCss}${activeBgCss ? ` ${activeBgCss}` : ""}`;

  return { link, bg };
};

// Select out your own patter of nav list to be shown on Navlink
export const getCustomNavList = (list: any) => {
  // Variables
  const firstList = list?.slice(0, 3); // Extract the first list (excluding the last item)
  const secondtList = list?.slice(3, list.length); // Extract the first list (excluding the last item)
  const lastList = list?.[list.length - 1] ? [list[list.length - 1]] : []; // Get the last item of the list

  return { firstList, secondtList, lastList };
};

// Get the api data from static-page
export const getStaticPageData = (
  staticPages: any,
  key: string,
  defaultValue: any = null
): any => {
  return staticPages?.[0]?.[key] || defaultValue;
};

export const getBaseUrlWithPath = (pathname?: string) =>
  `${NEXT_PUBLIC_BACKEND_URL}/${pathname ?? ""}`;

export const openUrl = ({ pathname, fullUrl }: any) => {
  const url = fullUrl ?? getBaseUrlWithPath(pathname);
  return () => window.open(url ?? "", "_blank");
};
