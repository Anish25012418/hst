// Import - default
import React from "react";

// Import - helpers
import { LogoImage } from "@/helpers/components/images/DefaultImages";

// Import - utils
import { SimpleFormSchema } from "@/utils/schemas/ComponentsSchema";
import CustomTypography from "../texts/CustomTypography";
import CustomButton from "../buttons/CustomButton";

// Main
const SimpleForm = React.forwardRef((props: SimpleFormSchema, ref: any) => {
  // Props
  const {
    children,
    isLoading,
    handleClose,
    heading,
    height,
    onSubmit,
    nextPage,
    // isFullWidth,
    // isFullHeight,
    isSubmitJustifyBetween,
    width,
    showLogo,
    submitTitle,
    extendCss,
    type,
  } = props;

  // Variables
  const { href, title } = nextPage ?? {};
  const isLargeDesign = type === "large";

  // Parent css
  const parentWidth = isLargeDesign ? "" : "w-full mx-auto max-w-[424px]";
  const parentCss = `${extendCss} ${parentWidth} grid gap-4 z-[100] min-w-[calc(360px-40px)] bg-gray-100`;

  // Css for the div inside form
  const widthCss =
    width ??
    (isLargeDesign
      ? "w-screen items-center"
      : "w-full max-w-[475px] rounded-none");
  const heightCss =
    height ??
    (isLargeDesign
      ? "h-screen max-h-screen overflow-y-auto thick-scrollbar"
      : "");
  // w-full sm:w-[400px] max-w-[400px]

  // Form css
  const formCss = `${widthCss} ${heightCss} flex flex-col gap-8 min-w-[calc(360px)]`;

  // Css for the div containing the submit button along with small text
  const btnDivCss =
    href && isSubmitJustifyBetween
      ? "flex flex-col gap-2 md:flex-row md:gap-6 justify-between items-center"
      : "flex flex-col gap-2 justify-center items-center";

  return (
    <div className={parentCss}>
      {/* Heading part */}
      {!isLargeDesign && heading && (
        <div className="w-full mb-6 mx-auto flex gap-2 items-center bg-brand-gray-600 text-white">
          {/* Logo part */}
          {showLogo && (
            <LogoImage
              divCss="w-12 h-12 p-1 flex items-center justify-center"
              imgCss="w-full h-full object-cover bg-brand-gray-600 rounded-none"
            />
          )}

          <CustomTypography
            variant="h5"
            className="font-semibold"
            color="white"
          >
            {heading}
          </CustomTypography>
        </div>
      )}

      {/* Form part */}
      <form
        ref={ref}
        onSubmit={onSubmit}
        className={formCss}
        encType="multipart/form-data"
      >
        {/* Inputs part */}
        {children}

        {/* Button part */}
        {!isLargeDesign && (
          <div className={btnDivCss}>
            <div className="flex gap-4 items-center">
              <CustomButton
                type="submit"
                loading={isLoading}
                extendCss="px-8 py-2"
              >
                <CustomTypography color="white" className="font-semibold">
                  {submitTitle ?? "Submit"}
                </CustomTypography>
              </CustomButton>

              {handleClose && (
                <CustomButton
                  isMinimum
                  status="secondary"
                  onClick={handleClose}
                >
                  Cancel
                </CustomButton>
              )}
            </div>

            {href && (
              <div className="my-2 px-4 py-2 flex items-center">
                <CustomTypography
                  as="a"
                  href={href}
                  className="font-medium hover:text-black highlight-underline"
                >
                  {title}
                </CustomTypography>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
});

export default SimpleForm;
