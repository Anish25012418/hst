//////////////////////////////////////////////////
//////////////////////////////////////////////////
// heights
//////////////////////////////////////////////////
//////////////////////////////////////////////////
// List of heights
// Breadcrumbs = 24px
// Table Head (TH) =

// Width
export const commonContainerWidth =
  "min-w-[calc(360px-32px)] lg:max-w-[calc(100vw-56px)] max-w-[calc(2028px-56px)]";
export const tableContainerWidth =
  "min-w-[calc(360px-32px-56px)] lg:w-[calc(100vw-56px-56px)] max-w-[calc(2028px-56px-56px)]";
export const tableContainerHeight =
  "h-full max-h-[calc(100vh-224px-10px-64px)] min-h-[calc(100vh-224px-10px-64px)] md:max-h-[calc(100vh-224px-10px)] md:min-h-[calc(100vh-224px-10px)] lg:max-h-[calc(100vh-224px-10px)] lg:min-h-[calc(100vh-224px-10px)]";
// "min-h-[calc(100vh-64px)]";

// NORMAL_OUTLET_HEIGHT
export const OUTLET_HEIGHT = "h-[calc(100vh-80px)]";
export const WITH_BREADCRUMB_HEIGHT = "h-[calc(100vh-80px-32px-20px)]"; // 40px is the py-5 padding
export const WITH_TABLE_TH_HEIGHT =
  "max-h-[calc(100vh-224px-2px-64px-52px)] min-h-[calc(100vh-224px-2px-64px-52px)] md:max-h-[calc(100vh-224px-2px-52px)] md:min-h-[calc(100vh-224px-2px-52px)] lg:max-h-[calc(100vh-224px-2px-52px)] lg:min-h-[calc(100vh-224px-2px-52px)]"; // 52px is the height of the table TH
export const WITH_PAGINATION_TABLE_HEIGHT =
  "h-[calc(100vh-80px-32px-20px-52px-32px)]"; // 52px is the height of the table TH

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Background colors
//////////////////////////////////////////////////
//////////////////////////////////////////////////
const common_bg_css = "transition-all";
export const bg_css = {
  primary: `${common_bg_css} text-gray-50 bg-primary-400 hover:bg-primary-800 border-[1px] border-primary-400`,
  secondary: `${common_bg_css} text-gray-700 bg-blue-gray-50 hover:bg-gray-100 border-[1px] border-gray-300`,
  info: `${common_bg_css} text-blue-700 bg-blue-50 hover:bg-blue-100 border-[1px] border-blue-300`,
  warning: `${common_bg_css} text-yellow-900 bg-yellow-200 hover:bg-yellow-100 border-[1px] border-yellow-800`,
  success: `${common_bg_css} text-green-700 bg-green-50 hover:bg-green-100 border-[1px] border-green-300`,
  purple: `${common_bg_css} text-purple-700 bg-purple-50 hover:bg-purple-100 border-[1px] border-purple-300`,
  lightgreen: `${common_bg_css} text-lightgreen-700 bg-lightgreen-50 hover:bg-lightgreen-100 border-[1px] border-lightgreen-300`,
  pink: `${common_bg_css} text-pink-700 bg-pink-50 hover:bg-pink-100 border-[1px] border-pink-300`,
  error: `${common_bg_css} text-red-700 bg-red-50 hover:bg-red-100 border-[1px] border-red-300`,
  defaultBg: `transition-all text-primary-400 hover:text-input-blue`,
  blackBg: `${common_bg_css} text-gray-50 bg-primary-900 hover:bg-black border-[1px] border-primary-400`,
};
export const bg_css_no_hover = {
  primary: `${common_bg_css} text-gray-50 bg-primary-400 border-[1px] border-primary-400`,
  secondary: `${common_bg_css} text-gray-700 bg-blue-gray-50 border-[1px] border-gray-300`,
  info: `${common_bg_css} text-blue-700 bg-blue-50 border-[1px] border-blue-300`,
  warning: `${common_bg_css} text-yellow-900 bg-yellow-200 border-[1px] border-yellow-800`,
  success: `${common_bg_css} text-green-700 bg-green-50 border-[1px] border-green-300`,
  purple: `${common_bg_css} text-purple-700 bg-purple-50 border-[1px] border-purple-300`,
  lightgreen: `${common_bg_css} text-lightgreen-700 bg-lightgreen-50 border-[1px] border-lightgreen-300`,
  pink: `${common_bg_css} text-pink-700 bg-pink-50 border-[1px] border-pink-300`,
  error: `${common_bg_css} text-red-700 bg-red-50 border-[1px] border-red-300`,
  defaultBg: `transition-all text-primary-400 hover:text-input-blue`,
  blackBg: `${common_bg_css} text-gray-50 bg-primary-900 border-[1px] border-primary-400`,
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// table
// HEIGHT Break Down (Header 60px, Breadcrumb 32px, Control Area 40px, Pagination 60px, Padding px-7 = 56px)
//////////////////////////////////////////////////
//////////////////////////////////////////////////
export const table_css = (index?: number) => {
  // Css
  const variableTrCss =
    typeof index === "number" && index % 2 === 0 ? "bg-gray-200" : "bg-white";

  return {
    div_css: `${commonContainerWidth} ${tableContainerHeight} thin-scrollbar overflow-auto scrollbar-mt-9 shadow-md rounded-none p-0 m-0 bg-white`,
    table_css: "w-full h-full rounded-none p-0 m-0",
    thead_css: "z-mobile_stepper sticky text-left top-0 w-full bg-orangish",
    tbody_css: "",
    th_css: "h-[36px] px-4 font-semibold text-brand-gray-600 text-[12px]",
    tr_css: `${variableTrCss}`,
    td_css: "p-4",
  };
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Status colors
//////////////////////////////////////////////////
//////////////////////////////////////////////////
export const status_css = {
  primary: "bg-primary-400 text-white",
  secondary: "bg-gray-100 text-primary-400",
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  error: "bg-red-100 text-red-700",
  info: "bg-blue-100 text-blue-700",
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Toggle colors
//////////////////////////////////////////////////
//////////////////////////////////////////////////
export const toggle_css = {
  primary:
    "relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700  peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600",
  success:
    "relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700  peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600",
  info: "relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700  peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600",
  warning:
    "relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700  peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400",
  error:
    "relative w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600",
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Icons css
//////////////////////////////////////////////////
//////////////////////////////////////////////////
const common_table_icons_css =
  "rounded-none text-white bg-primary-400 hover:bg-primary-800 text-[28px] px-1.5 py-0.5";
export const table_icons_css = {
  view: `${common_table_icons_css}`,
  edit: `${common_table_icons_css}`,
  delete: `${common_table_icons_css}`,
};

const commonIconCss =
  "w-[30px] h-[30px] rounded-none p-1 hover:shadow-lg cursor-pointer flex items-center gap-2 text-white border-[1px] border-transparent";
const brandIconCss =
  "w-[30px] h-[30px] rounded-none p-1 hover:shadow-lg cursor-pointer flex items-center gap-2";
// const commonIconCss = "px-2 py-2";
export const iconsCss = {
  // view: `${commonIconCss} border-[1px] bg-blue-gray-50 hover:bg-white border-gray-500 hover:text-black hover:border-transparent`,
  // post: `${commonIconCss} bg-gray-800 hover:bg-primary-1000 text-white`,
  // edit: `${commonIconCss} bg-gray-600 hover:bg-gray-800 text-gray-100 hover:text-white`,
  // success: `${commonIconCss} bg-gray-200 border-[1px] border-gray-500 text-primary-400 hover:bg-white hover:border-transparent hover:text-green-500 flex items-center gap-2`,
  // delete: `${commonIconCss} bg-gray-200 border-[1px] border-gray-500 text-primary-400 hover:bg-white hover:border-transparent hover:text-red-500 flex items-center gap-2`,

  // view: `${commonIconCss} hover:bg-green-600 bg-green-100 text-green-800 border-green-800`,
  // post: `${commonIconCss} hover:bg-yellow-600 bg-yellow-100 text-yellow-800 border-yellow-800`,
  // edit: `${commonIconCss} hover:bg-blue-600 bg-blue-100 text-blue-800 border-blue-800`,
  // delete: `${commonIconCss} hover:bg-red-600 bg-red-100 text-red-800 border-red-800`,

  view: `${commonIconCss} bg-green-500 hover:bg-green-800 hover:text-green-100 border-[2px] border-green-900 p-1`,
  post: `${commonIconCss} bg-yellow-500 hover:bg-yellow-800 hover:text-yellow-100 border-[2px] border-yellow-900 p-1`,
  edit: `${commonIconCss} bg-blue-500 hover:bg-blue-800 hover:text-blue-100 border-[2px] border-blue-900 p-1`,
  delete: `${commonIconCss} bg-red-500 hover:bg-red-800 hover:text-red-100 border-[2px] border-red-900 p-1`,
  brandYellowLight: `${brandIconCss} bg-brand-yellow-400 hover:bg-brand-yellow-500 text-brand-yellow-800 hover:text-brand-yellow-100 border-[2px] border-brand-yellow-900 p-1`,
  brandYellow: `${brandIconCss} bg-brand-yellow-500 hover:bg-brand-yellow-600 text-brand-yellow-1000 hover:text-brand-yellow-200 border-[2px] border-brand-yellow-900 p-1`,
  brandYellowDark: `${brandIconCss} bg-brand-yellow-700 hover:bg-brand-yellow-600 text-brand-yellow-100 hover:text-brand-yellow-1000 border-[2px] border-brand-yellow-900 p-1`,
  brandGray: `${brandIconCss} bg-brand-gray-600 hover:bg-brand-gray-900 hover:text-brand-gray-100 border-[2px] border-brand-gray-900 p-1`,
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Inputs css
//////////////////////////////////////////////////
//////////////////////////////////////////////////
const common_input_css =
  "w-full h-[36px] bg-white border-[1px] border-gray-300 rounded-none";
export const input_css = {
  text: `${common_input_css} shadow-md`,
};
