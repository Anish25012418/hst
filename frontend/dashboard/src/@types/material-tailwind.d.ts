// material-tailwind.d.ts
import * as MTR from "@material-tailwind/react";

// All the types used
type EventCapture = {
  onPointerEnterCapture?: unknown;
  onPointerLeaveCapture?: unknown;
};
interface PlaceholderEventCapture extends EventCapture {
  placeholder?: unknown;
}
interface CrossOriginEventCapture extends EventCapture {
  crossOrigin?: unknown;
}

// Actual module to modify
declare module "@material-tailwind/react" {
  // Accordion
  export interface AccordionProps
    extends MTR.AccordionProps,
      PlaceholderEventCapture {}
  export interface AccordionHeaderProps
    extends MTR.AccordionHeaderProps,
      PlaceholderEventCapture {}
  export interface AccordionBodyProps
    extends MTR.AccordionBodyProps,
      PlaceholderEventCapture {}

  // Avatar
  export interface AvatarProps
    extends MTR.AvatarProps,
      PlaceholderEventCapture {}

  // Button
  export interface ButtonProps
    extends MTR.ButtonProps,
      PlaceholderEventCapture {}

  // Card
  export interface CardProps extends MTR.CardProps, PlaceholderEventCapture {}
  export interface CardHeaderProps
    extends MTR.CardHeaderProps,
      PlaceholderEventCapture {}
  export interface CardBodyProps
    extends MTR.CardBodyProps,
      PlaceholderEventCapture {}

  // Checkbox
  export interface CheckboxProps
    extends MTR.CheckboxProps,
      CrossOriginEventCapture {}

  // Dialog
  export interface DialogProps
    extends MTR.DialogProps,
      PlaceholderEventCapture {}
  export interface DialogHeaderProps
    extends MTR.DialogHeaderProps,
      PlaceholderEventCapture {}
  export interface DialogBodyProps
    extends MTR.DialogBodyProps,
      PlaceholderEventCapture {}
  export interface DialogFooterProps
    extends MTR.DialogFooterProps,
      PlaceholderEventCapture {}

  // IconButton
  export interface IconButtonProps
    extends MTR.IconButtonProps,
      PlaceholderEventCapture {}

  // Input
  export interface InputProps extends MTR.InputProps, CrossOriginEventCapture {}

  // List
  export interface ListProps extends MTR.ListProps, PlaceholderEventCapture {}
  export interface ListItemProps
    extends MTR.ListItemProps,
      PlaceholderEventCapture {}

  // Menu
  export interface MenuProps extends MTR.MenuProps, PlaceholderEventCapture {}
  export interface MenuItemProps
    extends MTR.MenuItemProps,
      PlaceholderEventCapture {}
  export interface MenuListProps
    extends MTR.MenuListProps,
      PlaceholderEventCapture {}

  // Navbar
  export interface NavbarProps
    extends MTR.NavbarProps,
      PlaceholderEventCapture {}
  // Popover
  export interface PopoverContentProps
    extends MTR.PopoverContentProps,
      PlaceholderEventCapture {}

  // Select
  export interface SelectProps
    extends MTR.SelectProps,
      PlaceholderEventCapture {}

  // Tabs
  export interface TabProps extends MTR.TabProps, PlaceholderEventCapture {}
  export interface TabsHeaderProps
    extends MTR.TabsHeaderProps,
      PlaceholderEventCapture {}
  export interface TabsBodyProps
    extends MTR.TabsBodyProps,
      PlaceholderEventCapture {}

  // Textarea
  export interface TextareaProps
    extends MTR.TextareaProps,
      PlaceholderEventCapture {}

  // Typography
  export interface TypographyProps
    extends MTR.TypographyProps,
      PlaceholderEventCapture {}

  // more...
}
