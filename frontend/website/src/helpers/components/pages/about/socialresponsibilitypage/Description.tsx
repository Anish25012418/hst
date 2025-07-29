"use client";
import { CustomTypography } from "@/helpers/components";

const Description = (props: any) => {
  // Props
  const { description } = props;

  return (
    <div className="max-h-[300px] overflow-auto booking-scrollbar">
      {description?.subHeader && (
        <CustomTypography variant="h6" className="font-bold">
          {description?.subHeader}
        </CustomTypography>
      )}
      {description?.list?.map((desc: any, idx: number) => (
        <div key={idx}>
          <CustomTypography>{desc}</CustomTypography>
          <br></br>
        </div>
      ))}
    </div>
  );
};

export default Description;
