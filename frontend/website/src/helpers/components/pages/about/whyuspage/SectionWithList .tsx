import { CustomTypography } from "../../..";
import { FaArrowAltCircleRight } from "react-icons/fa";

const SectionWithList = ({ section }: any) => {
  // Filter out empty strings from the list
  const filteredList = section?.list?.filter(
    (item: string) => item.trim().length > 0
  );

  return (
    <div className="my-5">
      {section?.title && (
        <div className="mt-14">
          <CustomTypography variant="h4">{section?.title}</CustomTypography>
        </div>
      )}
      {filteredList?.length > 0 &&
        filteredList?.map((item: any, i: any) => (
          <div className="flex gap-3 my-5" key={i}>
            <div className="w-6">
              <FaArrowAltCircleRight className="mt-0.5" />
            </div>
            <div className="flex-1">
              <CustomTypography>{item}</CustomTypography>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SectionWithList;
