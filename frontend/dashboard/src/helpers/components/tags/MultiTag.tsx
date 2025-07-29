// Import - helpers
import CustomTooltip from "../animations/CustomTooltip";

// Main
const MultiTag = (props: any) => {
  // Props
  const { extendCss, content, position } = props;

  // Variables - css
  const topRightCss = "top-0 right-0 -translate-y-[1.75rem]";
  const rightCss = "top-0 right-0";

  // Varibles - Final css
  const css =
    position === "top-right"
      ? topRightCss
      : position === "right"
      ? rightCss
      : "";
  const finalCss = `${extendCss ? `${extendCss} ` : ""}${css}`;

  return (
    <div className="relative">
      <CustomTooltip
        content={content ?? "Accepts multiple values"}
        className="relative !z-tooltip min-w-fit w-fit px-5 font-poppins text-xs bg-brand-yellow-400"
      >
        <div className={`${finalCss} absolute cursor-pointer`}>
          <span className="text-xs font-poppins bg-brand-yellow-200 text-brand-yellow-700 px-2 py-[1px] rounded-none font-bold">
            Multi
          </span>
        </div>
      </CustomTooltip>
    </div>
  );
};

export default MultiTag;
