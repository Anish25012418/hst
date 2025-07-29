import { CustomTypography } from "../../..";

const SectionWithParagraphs = ({ section }: any) => (
  <div className="my-5">
    {section?.title && (
      <div className="mt-14">
        <CustomTypography variant="h4">{section?.title}</CustomTypography>
      </div>
    )}
    {section?.description &&
      (Array.isArray(section?.description) ? (
        section?.description.map((para: any, i: any) => (
          <div className="my-5" key={i}>
            <CustomTypography>{para}</CustomTypography>
          </div>
        ))
      ) : (
        <div className="my-5">
          <CustomTypography>{section?.description}</CustomTypography>
        </div>
      ))}
  </div>
);

export default SectionWithParagraphs;
