"use client";
// Helpers
import { CustomTypography } from "@/helpers/components";

const Itinerary = (props: any) => {
  // Props
  const { list, extendCss } = props;

  return (
    <div
      className={`${
        extendCss ? `${extendCss} ` : ""
      }mx-[50px] md:mx-[105px] my-8 flex flex-col`}
      id="itinerary"
    >
      <div>
        <CustomTypography className="text-2xl font-bold my-4" isPermanentFont>
          Itinerary
        </CustomTypography>
        <div className="flex flex-col gap-4">
          {list?.map((items: any, idx: number) => (
            <>
              <div className="flex flex-col items-start md:flex-row md:items-center gap-4 p-4 bg-gray-100 rounded-sm shadow-sm cursor-pointer hover:bg-gray-200">
                <CustomTypography className="min-w-[56px] text-sm md:text-base font-bold text-brand-yellow-600">
                  {`Day ${idx + 1}`}
                </CustomTypography>
                <CustomTypography className="text-sm md:text-base font-semibold">
                  {items}
                </CustomTypography>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
