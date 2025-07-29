"use client";

// Relative
import CustomTypography from "./CustomTypography";

// Assets
import { getActiveLinkCss } from "@/utils/methods/app-methods";

// Utils
import { NavLinkSchema } from "@/utils/schemas/ComponentSchema";
import { usePathname } from "next/navigation";

// Main
export default function NavLink(props: NavLinkSchema) {
  // Props
  const { href, children, className, ...rest } = props;

  // Hooks
  const pathname = usePathname();

  // Css
  const activeCss = getActiveLinkCss({ href, pathname }).link;
  const finalCss = `${className ?? ""} ${activeCss}`;

  return (
    <CustomTypography {...rest} as="a" href={href ?? "/"} className={finalCss}>
      {children}
    </CustomTypography>
  );
}
