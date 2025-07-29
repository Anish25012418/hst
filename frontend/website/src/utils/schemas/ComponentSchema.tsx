/**
 * @title : ComponentSchema
 * @description: includes all of the schemas of components
 *
 **/

// Default
import { TypographyProps } from "@material-tailwind/react";

// Relative
import * as g from "./GlobalSchema";
import { ReactNode } from "react";

// modals
export type InformationModalSchema = {
  // Css
  dialogCss?: string;
  dialogFooterCss?: string;
  dialogBodyCss?: string;

  // Content
  open?: boolean;
  setOpen?: (open: boolean) => void;
  dialogHeader?: string | ReactNode;
  dialogBody?: string | ReactNode;

  // Others
  isNotMessage?: boolean;
};

//////////////////////////////
//////////////////////////////
//////////////////////////////
// menu
//////////////////////////////
//////////////////////////////
//////////////////////////////
export interface ProfileMenuSchema
  extends g.IconSchema,
    g.ImageSchema,
    g.MenuCssSchema,
    g.NavItemSchema {}

//////////////////////////////
//////////////////////////////
//////////////////////////////
// navbar
//////////////////////////////
//////////////////////////////
//////////////////////////////

//////////////////////////////
//////////////////////////////
//////////////////////////////
// test
//////////////////////////////
//////////////////////////////
//////////////////////////////
export interface CustomTypographySchema extends TypographyProps {
  // Fonts
  isPermanentFont?: boolean;
}

export interface NavLinkSchema extends TypographyProps {}
