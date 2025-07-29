// Import- default
import { AiOutlineClose } from "react-icons/ai";

// Utils
import { ButtonSchema } from "@/utils/schemas/ComponentsSchema";

// Main
const CloseIconButton = (props: ButtonSchema) => {
  // Props
  const { css, extendCss, ...rest } = props;

  // Css
  const defaultCss = "absolute text-red-400 hover:text-red-600";
  const className = css ?? `${extendCss ?? "top-8 right-8"} ${defaultCss}`;

  // Render
  return <AiOutlineClose className={className} {...rest} />;
};

export default CloseIconButton;
