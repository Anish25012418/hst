// Import - utils
import { bg_css, bg_css_no_hover } from "@/assets/css/styles/components-styles";
import * as s from "@/assets/css/styles/style";
import {
  AllStatusOptionsSchema,
  CustomStatusOptionsSchema,
} from "@/utils/schemas/GlobalSchema";

// Get status methods
export const getStatusCss = (status: AllStatusOptionsSchema) => {
  const [textCss, bgCss, statusCss] =
    status === "link"
      ? [s.link_text, s.link_bg, s.link_status]
      : status === "primary"
      ? [s.primary_text, s.primary_bg, s.primary_status]
      : status === "secondary"
      ? [s.secondary_text, s.secondary_bg, s.secondary_status]
      : status === "success"
      ? [s.success_text, s.success_bg, s.success_status]
      : status === "error"
      ? [s.error_text, s.error_bg, s.error_status]
      : status === "warning"
      ? [s.warning_text, s.warning_bg, s.warning_status]
      : status === "info"
      ? [s.info_text, s.info_bg, s.info_status]
      : [s.primary_text, s.primary_bg, s.primary_status];
  return { textCss, bgCss, statusCss };
};

export const getStatusBgColor = (
  status?: CustomStatusOptionsSchema,
  hideHover?: boolean
) => {
  const {
    primary,
    secondary,
    info,
    success,
    warning,
    error,
    defaultBg,
    purple,
    lightgreen,
    pink,
  } = hideHover ? bg_css_no_hover : bg_css;

  // Choose button css as per the status
  const result =
    status === "primary"
      ? primary
      : status === "secondary"
      ? secondary
      : status === "info"
      ? info
      : status === "success"
      ? success
      : status === "warning"
      ? warning
      : status === "purple"
      ? purple
      : status === "lightgreen"
      ? lightgreen
      : status === "pink"
      ? pink
      : status === "error"
      ? error
      : status === "default"
      ? defaultBg
      : primary;

  return result;
};
