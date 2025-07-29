// Import - helpers
import CustomButton from "../buttons/CustomButton";
import CustomTypography from "../texts/CustomTypography";

// Main
const FormContainer = (props: any) => {
  // Props
  const {
    css,
    extendCss,
    onSubmit,
    children,
    padding,
    gap,
    loading,
    title,
    submitTitle,
    handleClose,
  } = props;

  // Css
  const defaultCss =
    "relative min-w-[calc(360px-40px)] w-[calc(100vw-200px)] max-w-[400px] md:max-w-[calc(2028px-280px)] md:min-w-full lg:w-[calc(100vw-280px-16px-200px)] max-h-[450px] thin-scrollbar overflow-y-auto grid grid-cols-12 py-2 pr-2";
  // const dimension = isFull ? "w-screen" : "xs:w-[475px] w-full";
  const paddingCss = padding ?? "";
  const gapCss = gap ?? "gap-5";
  const modifiedCss = `${"dimension"} ${defaultCss} ${paddingCss} ${gapCss} ${
    extendCss ?? ""
  }`;
  const className = css ?? modifiedCss;

  return (
    <form
      className="flex flex-col gap-5 mx-auto"
      onSubmit={onSubmit}
      encType="multipart/form-data"
    >
      <CustomTypography>{title ?? "Title here"}</CustomTypography>

      <div className={className}>{children}</div>

      {/* Custom button actions */}
      {/* <div className="z-mobile_stepper sticky bottom-0 col-span-12 max-w-[1024px] w-full mx-auto pt-2 rounded-none flex items-center gap-3 bg-white"> */}
      <div className="z-mobile_stepper sticky bottom-0 col-span-12 pt-2 flex items-center gap-3 bg-white">
        <CustomButton isMinimum loading={loading} type="submit">
          {submitTitle || "Add"}
        </CustomButton>
        <CustomButton isMinimum status="secondary" onClick={handleClose}>
          Cancel
        </CustomButton>
      </div>
    </form>
  );
};

export default FormContainer;
