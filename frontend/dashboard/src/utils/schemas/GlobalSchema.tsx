import { ChangeEvent, ReactElement, ReactNode, RefObject } from "react";

// Normal button type
export type ButtonTypeSchema = {
  type?: "reset" | "submit" | "button" | undefined;
};

// Action when the user clicks on DOM element
export type OnClickSchema = {
  onClick?: () => void;
};

// Children node of any component
export type ChildrenSchema = {
  children?: ReactNode;
};

// Input
export type InputOnChangeSchema = ChangeEvent<HTMLInputElement>;

// Loading
export type LoadingSchema = {
  isLoading?: boolean;
  setIsLoading?: boolean;
};

// Static portion of image props
export interface StaticImageDataSchema {
  src: string;
  alt: string;
  height?: number;
  width?: number;
  blurDataURL?: string;
  blurWidth?: number;
  blurHeight?: number;
}

// Simple label
export type LabelSchema = {
  label?: string | number;
};

// Object schema
export type ObjectSchema = {
  // [key: string]: string;
  [key: string]: any;
};

export type IconSchema = {
  icon?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

// Css values schema
export type CssValuesSchema = {
  gap?: string;
  p?: string;
  m?: string;
  px?: string;
  py?: string;
  mx?: string;
  my?: string;
  [key: string]: any;
};

// Four design options
export type DesignOptionsSchema = "base" | "normal" | "primary" | "secondary";

// Five status options
export type StatusOptionsSchema =
  // | "info"
  // | "success"
  // | "warning"
  // | "error"
  // | "default";
  | "info"
  | "success"
  | "warning"
  | "error"
  | "primary"
  | "secondary"
  | "default";

export type CustomStatusOptionsSchema =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "primary"
  | "secondary"
  | "default"
  | "purple"
  | "lightgreen"
  | "pink";

export type AllStatusOptionsSchema =
  | "link"
  | "primary"
  | "secondary"
  | StatusOptionsSchema
  | undefined;

// Extending DesignOptionsSchema
export type DesignSchema = {
  design?: DesignOptionsSchema;
};

// Extending StatusOptionsSchema
export type StatusSchema = {
  status?: StatusOptionsSchema;
};

// Common boolean value to indicate something
export type FlagSchema = {
  isFlag?: boolean;
  setIsFlag?: (val: boolean) => void;
};

// Usually used in selected option
export interface OptionSchema extends LabelSchema {
  value: string;
}

// Usually used in selected option
export interface TabSchema extends LabelSchema, ChildrenSchema {}

// Different css names used in the whole project as string
export type CssSchema = {
  css?: string;
  extendCss?: string;
  divCss?: string;
  imgCss?: string;
  iconCss?: string;
  tableCss?: string;
  tHeadCss?: string;
  tBodyCss?: string;
  labelClassName?: string;
  inputClassName?: string;
  containerClassName?: string;
};

// A simple title as string
export type TitleSchema = {
  title?: string;
};

// Nav item schema
export type NavItemSchema = {
  href: string;
  icon?: ReactElement;
  label?: string | any;
  value?: string;
  caption?: string;
  badge?: string | number;
  onClick?: any;
  child?: NavItemSchema[];
  // roles?: MultipleRoleNumberSchema;
};

// Toast status
export type ToastStatusSchema = {
  status: "info" | "success" | "warning" | "error" | "default";
};

export type CallbackFunctionSchema = () => void;

export type DefaultRefSchema = {
  [key: string]: RefObject<any>;
};
