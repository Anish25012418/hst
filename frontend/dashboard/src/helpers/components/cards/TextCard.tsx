// Import - default
import { useNavigate } from "react-router-dom";

// Main
const TextCard = (props: any) => {
  // Props
  const {
    // Data props
    title,
    href,

    // Action props
    onClick: onClickAction,

    // Css props
    css,
    extendCss,
    isLarge,
  } = props;

  // Hooks
  const navigate = useNavigate();

  // Css variables
  const largeCss = isLarge
    ? "w-[264px] min-h-[80px] md:w-[400px] md:min-h-[100px] p-5 grid place-items-center border-[1px] border-primary-500 cursor-pointer hover:bg-gray-100"
    : "";

  // Final css variables
  const defaultCss = "bg-white shadow-md";
  const modifiedCss = `${extendCss} ${largeCss}`;
  const className = css ?? `${defaultCss} ${modifiedCss}`;

  // Action when the text div is clicked

  const onClick = () => {
    onClickAction && onClickAction();
    href && navigate(href);
  };

  // Custom props for TextCard
  const textCardProps = { className, onClick };

  return <div {...textCardProps}>{title}</div>;
};

export default TextCard;
