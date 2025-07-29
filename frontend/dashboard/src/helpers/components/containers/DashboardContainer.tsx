// Import - helpers
import {
  dashboardHeight,
  dashboardWidth,
} from "@/assets/css/styles/app-styles";

// Import - helpers
import BreadCrumbs from "../others/BreadCrumbs";

// Import - utils
import { ContainerSchema } from "@/utils/schemas/ComponentsSchema";

// Main
const DashboardContainer = (props: ContainerSchema) => {
  // Props
  const { children, css, extendCss } = props;

  // Css
  const defaultCss = `${dashboardWidth} ${dashboardHeight} relative w-full overflow-y-auto thick-scrollbar flex flex-col gap-3 bg-gray-100`;
  const className = css ?? defaultCss; // Outer css
  const modifiedCss = extendCss ?? "px-4 lg:px-7 flex flex-col gap-3"; // Inner css

  return (
    <div className={className}>
      <BreadCrumbs />
      <div className={modifiedCss}>{children}</div>
    </div>
  );
};

export default DashboardContainer;
