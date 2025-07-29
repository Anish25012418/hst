"use client";

// Default
import * as MTR from "@material-tailwind/react";

// Helpers
import { CustomTypography } from "@/helpers/components";

// Utils
import { ProfileMenuSchema } from "@/utils/schemas/ComponentSchema";

// Menu
export default function ProfileMenu(props: ProfileMenuSchema) {
  // Props
  const {
    src,
    alt,
    icon,
    child,

    // Css
    menuListCss,
  } = props;

  // Menu placeholder
  const RenderMenuHandler = () => (
    <>
      {src && (
        <MTR.MenuHandler>
          <MTR.Avatar
            variant="circular"
            alt={alt ?? "Profile Menu Alt"}
            className="menu_handler-profile_menu_avatar cursor-pointer"
            src={
              src ??
              "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            }
          />
        </MTR.MenuHandler>
      )}
      {icon && (
        <MTR.MenuHandler>
          <div className="menu_handler-profile_menu_icon">
            {icon as React.ReactElement}
          </div>
        </MTR.MenuHandler>
      )}
    </>
  );

  // Popup shows when menu/MenuHandler is clicked
  const RenderMenuList = () =>
    child?.map(({ href, icon, label }: any, idx: number) => (
      <MTR.MenuItem key={idx} className="flex items-center gap-2">
        {icon && (
          <div className="menu-list_icon">{icon as React.ReactElement}</div>
        )}
        <CustomTypography as="a" href={href}>
          {label}
        </CustomTypography>
      </MTR.MenuItem>
    ));

  return (
    <MTR.Menu>
      <RenderMenuHandler />
      <MTR.MenuList
        className={`menu_list${menuListCss ? ` ${menuListCss}` : ""}`}
      >
        <div className="menu_list-parent_div outline-0 border-0">
          <RenderMenuList />
        </div>
        {/* <hr className="my-2 border-blue-gray-50" /> */}
      </MTR.MenuList>
    </MTR.Menu>
  );
}
