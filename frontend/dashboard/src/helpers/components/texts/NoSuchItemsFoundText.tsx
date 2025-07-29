// Import - default
import { FaInfoCircle } from "react-icons/fa";

// Import - helpers
import Container from "../containers/Container";
import CustomTypography from "./CustomTypography";

// Main
const NoSuchItemsFoundText = (props: any) => {
  // Props
  const { title, extendCss, hideIcon } = props;

  // Css
  const defaultCss =
    "w-full min-h-[calc(100vh-308px)] flex gap-1 items-center justify-center";
  const modifiedCss = extendCss ?? "min-h-[calc(100vh-308px)]";
  const className = `${modifiedCss} ${defaultCss}`;
  const wrapperCss = `${
    extendCss ? "p-4 shadow-md rounded-none text-center" : ""
  } flex gap-1`;

  return (
    <Container css={className}>
      <div className={wrapperCss}>
        {!hideIcon && <FaInfoCircle className="text-primary-400 text-lg" />}
        <CustomTypography>{title ?? "No item found."}</CustomTypography>
      </div>
    </Container>
  );
};

export default NoSuchItemsFoundText;
