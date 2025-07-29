// Import - default
import { ReactNode } from "react";
import { TypographyProps } from "@material-tailwind/react";

// Import - relative
import * as g from "./GlobalSchema";

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// Animations
export interface SpinnerSchema
  extends g.CssSchema,
    g.StatusSchema,
    g.LoadingSchema {
  color?: string;
}

// Images - main image
export interface ImageSchema
  extends g.OnClickSchema,
    g.FlagSchema,
    g.CssSchema,
    g.StaticImageDataSchema {
  onClick?: () => void;
  priority?: boolean;
}

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// Buttons
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

export interface ButtonSchema
  extends g.ButtonTypeSchema,
    g.CssSchema,
    g.OnClickSchema,
    g.ChildrenSchema,
    // StylesheetSchema,
    g.IconSchema,
    g.StatusSchema,
    g.LoadingSchema {
  isSubmit?: boolean;
  isAddButton?: boolean;
}

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// Containers
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

export interface ContainerSchema
  extends g.CssSchema,
    g.OnClickSchema,
    g.ChildrenSchema {
  // [key: string]: any;
  customHeight?: string;
  color?: string;
  isCenter?: boolean;
  isPadding?: boolean;
  isCustomHeight?: boolean;
  isFullFormHeight?: boolean;
  isScrollableModal?: boolean;
  isFormContainer?: boolean;
}

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// forms
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
export interface SimpleFormSchema
  extends g.ChildrenSchema,
    g.CssSchema,
    ModalPopupSchema {
  onSubmit: any; // handle the main submit logic
  heading?: string; // title of the form
  isLoading?: boolean; // show loading in button when the form is being submitted
  submitTitle?: string; // title shown in the submit button
  showLogo?: boolean; // set to false to hide the brand logo
  isSubmitJustifyBetween?: boolean; // set to true to design the button & href in nustify between
  nextPage?: {
    title: string; // title of the next page
    href: string; // href of the next page
  };
  // isFullWidth?: boolean; //
  // isFullHeight?: boolean;
  width?: string;
  height?: string;
  type?: string;
}

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
export interface CSVExportSchema extends g.CssSchema, g.TitleSchema {
  filename?: string;
  data?: any;
}

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// Popups
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
export interface PopupSchema extends g.CssSchema {
  label?: string;
  value: any;
  options: any;
  onClick?: any;
  onChange?: any;
  isLoading?: boolean;
}

export interface ModalPopupSchema extends g.ChildrenSchema, g.CssSchema {
  isOpen?: boolean;
  showCloseBtn?: boolean;
  type?: string;
  handleClose?: any;
}

export interface DeletePopupSchema
  extends g.IconSchema,
    g.CssSchema,
    g.LoadingSchema {
  question: ReactNode;
  caption: ReactNode;
  okPrompt: ReactNode;
  cancelPrompt: ReactNode;
  isOpen?: boolean;
  handleOkayPrompt?: () => void;
  handleCancelPrompt?: () => void;
  isInfoIcon?: boolean;
  hideMiniIcon?: boolean;
}

//////////////////////////////
//////////////////////////////
//////////////////////////////
// text
//////////////////////////////
//////////////////////////////
//////////////////////////////
export interface CustomTypographySchema extends TypographyProps {}
