/**
 * @title : css-methods
 * @description: css specific methods used in the website
 *
 **/

// Assets
import { defaultFontFamily } from "@/assets/fonts";

// Utils

// Get the css of active nav links especially
export const getNavItemCss = (params: any) => {
  // const { label, href, pathname } = params;
  const { href, pathname } = params;

  // Css
  const linkCss = `${defaultFontFamily} cursor-pointer hover:text-gjn-green sm:hover:text-white font-semibold`;
  const activeCss = `${linkCss} text-gjn-green sm:text-white`;

  // Variables
  // const titleList: { [key: string]: string } = {
  //   "page_titles.industries": "industries",
  //   "page_titles.products": "products",
  //   "page_titles.services": "services",
  // };

  if (href && typeof href !== "undefined") {
    return pathname === href ? activeCss : linkCss;
  }

  return linkCss;

  // if (label && typeof label !== "undefined") {
  //   return pathname?.split("/")[2] === titleList[label] ? activeCss : "";
  // }
};
