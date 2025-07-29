/**
 * @title : ComponentSchema
 * @description: includes all the common/global schemas
 *
 **/

// Default
import { IconType } from "react-icons";

// Css schema
export type CssDefaultSchema = {
  extendCss?: string; // this will be concatinated with the pre-exising css
  css?: string; // this will replace the whole pre-existing css
};

export type MenuCssSchema = {
  menuListCss?: string;
};

// All the tags will contain children and this will be used at some point
export type ChildrenSchema = {
  children: React.ReactNode;
};

// Singular item in the navbar, menu & so on
export interface NavItemSchema extends IconSchema {
  title?: string;
  slug?: string;
  image?: string;
  hoveredImage?: string;
  videoSrc?: string;
  description?: string;
  pathname?: string;
  child?: NavItemSchema[];
}

// Nav list schema, can also be used and modified accordingly for menu and other case
export type NavListSchema = {
  list?: NavItemSchema[];
  megaMenuList?: NavItemSchema[];
  menuItem?: NavItemSchema[];
};

// Used in default layout functions
export type DefaultLayoutSchema = Readonly<ChildrenSchema>;

// Image props that are both essential and will be used for lazy-loading and other dynamic features
export interface ImageSchema {
  alt?: string;
  src?: string;
}

// All the icons will be in either of these following formats (mainly react-icon will be used)
export interface IconSchema {
  icon?: IconType | React.ReactElement | React.ReactNode;
}
