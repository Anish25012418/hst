// Utils
import { ContainerSchema } from "@/utils/schemas/ComponentsSchema";

// Main
const Container = (props: ContainerSchema) => {
  // Props
  const {
    children,
    css,
    color: COLOR,
    extendCss,
    isCenter,
    isPadding,
    isCustomHeight,
    isFullFormHeight,
    isScrollableModal,
    customHeight,
    isFormContainer,
  } = props;

  // Modifiable css
  const padding = isPadding ? "p-5" : "";
  const placing = isCenter ? "grid place-items-center" : "flex flex-col";

  // Css
  const defaultCss = "gap-3";
  const color = COLOR ?? "bg-gray-50";
  const height =
    customHeight ??
    (isCustomHeight
      ? "flex flex-col h-fit rounded-none"
      : isFullFormHeight
      ? "grid grid-cols-12 rounded-none w-screen max-w-[1024px] h-[calc(100vh-64px)] max-h-[1052px] justify-self-center mx-auto pb-[72px]"
      : "flex flex-col rounded-none  max-h-[400px]");
  const scrollableCss = isScrollableModal
    ? `${height} pt-2 px-5 gap-5 overflow-y-auto thin-scrollbar`
    : "";
  const formContainerCss = isFormContainer
    ? `${height} pt-2 px-5 flex flex-col gap-5`
    : "";
  const modifiedCss = `${defaultCss} ${height} ${padding} ${placing} ${color}`;
  const className =
    (isScrollableModal
      ? scrollableCss
      : isFormContainer
      ? formContainerCss
      : css) ?? `${extendCss ?? ""} ${modifiedCss}`;

  // Div props
  return <div className={className}>{children}</div>;
};

export default Container;
