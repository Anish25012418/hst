// Main
const CenterContainer = (props: any) => {
  // Props
  const { children, css, extendCss, isScreen } = props;

  // Height
  const height = isScreen ? "min-h-screen" : "h-full";

  // Css
  const defaultCss = "w-full grid place-items-center";
  const className = css ?? `${defaultCss} ${extendCss} ${height}`;

  // Custom props
  const divProps = { className, children };

  return <div {...divProps} />;
};

export default CenterContainer;
