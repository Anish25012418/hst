export default function TD(props: any) {
  const { children, css, extendCss, isAccordion } = props;

  // Variables
  const accordionCss = isAccordion ? "px-4 text-primary-400" : "";

  // Css
  const defaultCss = "py-3";
  const modifiedCss = `${defaultCss} ${accordionCss} ${extendCss ?? ""}`;
  const className = css ?? modifiedCss;

  return <td className={className}>{children}</td>;
}
