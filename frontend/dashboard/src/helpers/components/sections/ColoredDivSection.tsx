// Import - utils
import { getStatusBgColor } from "@/utils/methods/css-methods";
import { toParamCase, toTitleCase } from "@/utils/methods/string-methods";

// Colored div for different sections
const ColoredDivSection = (props: any) => {
  // Props
  const { children, status, title = "common", extendCss, color: c } = props;

  // Variables
  const defaultCss = "relative p-3 rounded-none";
  const changeCss = ""; // Will get replaced by extendCss
  const modifiedCss = extendCss
    ? `${extendCss} ${defaultCss}`
    : `${defaultCss} ${changeCss}`;
  const color = c ?? getStatusBgColor(status, true);
  const className = `${toParamCase(title)} ${color} ${modifiedCss}`;

  return (
    <div className={className}>
      <div className="pb-3">
        <label className="font-bold text-brand-yellow-600">
          {toTitleCase(title)}
        </label>
        <div className="pt-3 flex flex-col gap-8">{children}</div>
      </div>
    </div>
  );
};

export default ColoredDivSection;
