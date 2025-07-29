"use client";
import Image from "next/image";
import { Tick, Cross } from "@/assets/image";
import { CustomTypography } from "@/helpers/components";

const IncExc = (props: any) => {
  // Props
  const { includes, excludes, extendCss } = props;

  return (
    <div
      className={`${
        extendCss ? `${extendCss} ` : ""
      }mx-[50px] md:mx-[105px] flex flex-col`}
      id="incExc"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div className="p-3">
          <CustomTypography className="text-2xl font-bold my-4" isPermanentFont>
            Includes
          </CustomTypography>
          <div>
            {includes?.map((items: string, idx: number) => (
              <div className="flex items-center gap-4" key={idx}>
                <Image alt="hell" src={Tick} className="h-6 w-6" />
                <CustomTypography className="text-lg my-2">
                  {items}
                </CustomTypography>
              </div>
            ))}
          </div>
        </div>
        <div className="p-3">
          <CustomTypography className="text-2xl font-bold my-4" isPermanentFont>
            Excludes
          </CustomTypography>
          <div>
            {excludes?.map((items: string, idx: number) => (
              <div className="flex items-center gap-4" key={idx}>
                <Image alt="hell" src={Cross} className="h-6 w-6" />
                <CustomTypography className="text-lg my-2">
                  {items}
                </CustomTypography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncExc;
