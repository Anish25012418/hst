"use client";
// Default
import Image from "next/image";
import { CiCalendar, CiHome } from "react-icons/ci";
import { GiMountains } from "react-icons/gi";
import { GoPeople } from "react-icons/go";
import { IoBicycleOutline } from "react-icons/io5";
import { HiOutlineFlag } from "react-icons/hi2";
import { PiBowlFoodLight } from "react-icons/pi";
import { BsHeartPulse } from "react-icons/bs";

// Helpers
import { CustomTypography } from "@/helpers/components";

// Assets
import { TeamWaveDown } from "@/assets/image";

const AtGlance = (props: any) => {
  // Props
  const { glance, extendCss } = props;

  // Convert the array into comma separated value
  const tourTypes = glance?.tourType?.join(", ") || "";
  const accommodationType = glance?.accommodation?.join(", ") || "";
  return (
    <div id="glance" className={`${extendCss ? `${extendCss} ` : ""}`}>
      <div className="bg-brand-yellow-600 h-auto w-full" id="glance">
        <div className="mx-[50px] md:mx-[105px] py-10">
          <CustomTypography
            className="text-2xl font-bold text-white pb-7"
            isPermanentFont
          >
            At a Glance
          </CustomTypography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-2">
              <div className="min-h-[40px] min-w-[40px]">
                <HiOutlineFlag className="text-[50px] text-white" />
              </div>
              <div className="flex flex-col items-start">
                <CustomTypography className="text-xl text-white">
                  Tour Type
                </CustomTypography>
                {/* {glance?.tourType?.map((items: any, id: number) => ( */}
                <CustomTypography
                  className="text-base font-bold text-white"
                  // key={id}
                >
                  {tourTypes}
                </CustomTypography>
                {/* ))} */}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="min-h-[40px] min-w-[40px]">
                <CiCalendar className="text-[50px] text-white" />
              </div>
              <div className="flex flex-col items-start">
                <CustomTypography className="text-xl text-white">
                  Duration
                </CustomTypography>
                <CustomTypography className="text-base font-bold text-white">
                  {`${glance?.numberOfDays} Days`}
                </CustomTypography>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="min-h-[40px] min-w-[40px]">
                <BsHeartPulse className="text-[50px] text-white" />
              </div>
              <div className="flex flex-col items-start">
                <CustomTypography className="text-xl text-white">
                  Fitness Level
                </CustomTypography>
                <CustomTypography className="text-base font-bold text-white">
                  {glance?.fitnessLevel}
                </CustomTypography>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="min-h-[40px] min-w-[40px]">
                <IoBicycleOutline className="text-[50px] text-white" />
              </div>
              <div className="flex flex-col items-start">
                <CustomTypography className="text-xl text-white">
                  Riding Skills
                </CustomTypography>
                <CustomTypography className="text-base font-bold text-white">
                  {glance?.ridingSkill}
                </CustomTypography>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="min-h-[40px] min-w-[40px]">
                <CiHome className="text-[50px] text-white" />
              </div>
              <div className="flex flex-col items-start">
                <CustomTypography className="text-xl text-white">
                  Accomodation
                </CustomTypography>
                <CustomTypography className="text-base font-bold text-white">
                  {accommodationType}
                </CustomTypography>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="min-h-[40px] min-w-[40px]">
                <PiBowlFoodLight className="text-[50px] text-white" />
              </div>
              <div className="flex flex-col items-start">
                <CustomTypography className="text-xl text-white">
                  Meals
                </CustomTypography>
                <CustomTypography className="text-base font-bold text-white">
                  {glance?.meals}
                </CustomTypography>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="min-h-[40px] min-w-[40px]">
                <GiMountains className="text-[50px] text-white" />
              </div>
              <div className="flex flex-col items-start">
                <CustomTypography className="text-xl text-white">
                  Season
                </CustomTypography>
                <div className="flex flex-col">
                  {glance?.bestSeason?.map((item: string, index: number) => (
                    <CustomTypography
                      key={index}
                      className="text-base font-bold text-white leading-tight"
                    >
                      {item}
                    </CustomTypography>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="min-h-[40px] min-w-[40px]">
                <GoPeople className="text-[50px] text-white" />
              </div>
              <div className="flex flex-col items-start">
                <CustomTypography className="text-xl text-white">
                  Group Size
                </CustomTypography>
                <CustomTypography className="text-base font-bold text-white">
                  {glance?.groupSize}
                </CustomTypography>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image
        src={TeamWaveDown}
        alt="wave"
        className="w-[1920px] -translate-y-[3px]"
      />
    </div>
  );
};

export default AtGlance;
