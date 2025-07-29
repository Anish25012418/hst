export default function TH(props: any) {
  const { children, css, extendCss, isAccordion } = props;

  // Variables
  const accordionCss = isAccordion
    ? "border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-left"
    : "";

  // Css
  const defaultCss = "";
  const modifiedCss = `${defaultCss} ${extendCss ?? accordionCss}`;
  const className = css ?? modifiedCss;

  return <th className={className}>{children}</th>;
}
