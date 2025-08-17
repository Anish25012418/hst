"use client";

import React from 'react';
import * as comp from "@/helpers/components";
import {CategoryWave} from "@/assets/image";
import {CustomTypography, NavLink} from "@/helpers/components";
import {useCheckWindow, useScreenSize} from "@/helpers/hooks";
import {kathmanduDayTrips} from "@/utils/constants/day-trips-constants.ts";
import Image from "next/image";
import {BsHeartPulse} from "react-icons/bs";
import {IoBicycleOutline} from "react-icons/io5";
import {IoIosTimer} from "react-icons/io";
import {Button} from "@material-tailwind/react";
import {getApiImg} from "@/utils/methods/img-methods.ts";

const KathmanduDayTripsPage = () => {

  const isWindowDefined = useCheckWindow();
  const {isMobile, isTablet} = useScreenSize();

  const resSize = isMobile
    ? "grid grid-cols-1"
    : isTablet
      ? "grid grid-cols-1"
      : "grid grid-cols-2";

  return (
    <>
      {!isWindowDefined ? (
        <div className="w-[calc(100vw-8px)] h-[calc(100vh-101.5px)] grid place-items-center">
          <comp.Loader/>
        </div>
      ) : (
        <>
          <div className="relative">
            <Image
              src={"/image/kathmanduDayTrips/kdt-1.jpeg"}
              alt="Banner"
              width={10}
              height={10}
              className="w-[1920px] h-[300px] md:h-[500px] object-cover -translate-y-[100px]"
            />
            <div className="absolute bottom-[calc(100px)] z-[100]">
              <Image
                src={CategoryWave}
                alt="Wave"
                className="w-[1920px] h-auto"
                width={10}
                height={10}
              />
            </div>
          </div>
          <div className="mx-[50px] md:mx-[105px] my-4 -translate-y-[100px]">
            <CustomTypography className="text-center capitalize text-3xl font-bold pb-1">
              Kathmandu Day Trips
            </CustomTypography>
            <CustomTypography className="text-center text-xl">
              Join our dynamic and fun team on one of our custom made day trips around the Kathmandu Valley. We have
              rides for every style and level of rider! Make your choice!
            </CustomTypography>

            <div className="mt-12">
              <iframe className="w-full md:h-[600px]" src="https://www.youtube.com/embed/M4e35da23gQ"
                      title="MTB Kathmandu Valley"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen></iframe>
            </div>



            {kathmanduDayTrips.map((trip, index) => (
              <div key={index} className="mt-16">
                <CustomTypography className="text-center capitalize text-2xl font-bold pb-1">
                  {trip.title}
                </CustomTypography>
                <div className={`${resSize} gap-10 my-4`}>
                  <div className="transition duration-300 hover:scale-105 cursor-pointer">
                    <Image
                      src={trip.image}
                      alt={trip.title}
                      width={10}
                      height={10}
                      className="h-[200px] md:h-[400px] w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                      <div className="flex items-center gap-2">
                        <div className="min-h-[40px] min-w-[40px]">
                          <BsHeartPulse className="text-[50px] text-black"/>
                        </div>
                        <div className="flex flex-col items-start">
                          <CustomTypography className="text-xl text-black">
                            Fitness Level
                          </CustomTypography>
                          <CustomTypography className="text-base font-bold text-black">
                            {trip?.fitnessLevel}
                          </CustomTypography>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="min-h-[40px] min-w-[40px]">
                          <IoBicycleOutline className="text-[50px] text-black"/>
                        </div>
                        <div className="flex flex-col items-start">
                          <CustomTypography className="text-xl text-black">
                            Riding Skills
                          </CustomTypography>
                          <CustomTypography className="text-base font-bold text-black">
                            {trip?.skillLevel}
                          </CustomTypography>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="min-h-[40px] min-w-[40px]">
                          <IoIosTimer className="text-[50px] text-black"/>
                        </div>
                        <div className="flex flex-col items-start">
                          <CustomTypography className="text-xl text-black">
                            Duration
                          </CustomTypography>
                          <CustomTypography className="text-base font-bold text-black">
                            {trip?.duration}
                          </CustomTypography>
                        </div>
                      </div>
                    </div>
                    <CustomTypography className="text-lg mt-5">
                      {trip.description}
                    </CustomTypography>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full bg-brand-yellow-600 flex flex-col md:flex-row justify-center">
            <div className="mx-[50px] md:mx-[105px] py-5 mt-4 flex flex-col justify-center gap-4">
              <CustomTypography className="text-2xl font-bold text-white">
                Want to learn more?
              </CustomTypography>
              <CustomTypography className="text-base text-white">
                Scan the QR code for e-brochure or contact us for more information.
              </CustomTypography>
              <NavLink href={"/contact"}>
                <Button
                  variant="outlined"
                  className="rounded-none uppercase border-white text-white hover:bg-gray-800 hover:text-white hover:border-gray-800 w-44"
                >
                  CONTACT US
                </Button>
              </NavLink>
            </div>
            <Image
              src={"/image/kathmanduDayTrips/e-brochure.jpeg"}
              alt={"E-brochure"}
              width={10}
              height={10}
              className="h-[200px] w-[200px] mb-5 md:mt-5 mx-[50px]"
            />
          </div>
        </>
      )}
    </>
  );
};

export default KathmanduDayTripsPage;