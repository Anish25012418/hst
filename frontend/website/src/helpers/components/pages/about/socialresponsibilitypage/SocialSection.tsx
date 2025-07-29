"use client";

import Image from "next/image";
import SectionHeader from "./Header";
import DescriptionBlock from "./Description";
import { getApiImg } from "@/utils/methods/img-methods";

// Main
const SocialResponsibility = (props: any) => {
  // Props
  const { item, index, isMobile } = props;

  return (
    <>
      {item?.header && (
        <div
          key={index}
          className={`flex flex-col gap-4 items-center justify-center my-10 p-4 ${
            index % 2 === 0 ? "bg-gray-200" : "bg-brand-yellow-500"
          }`}
        >
          <SectionHeader header={item?.header} isMobile={isMobile} />
          <div
            className={`flex gap-4 ${
              index % 2 === 0
                ? "flex-col lg:flex-row"
                : "flex-col lg:flex-row-reverse"
            }`}
          >
            <Image
              src={getApiImg(item?.image)}
              alt={item?.header}
              width={600}
              height={300}
              className="h-[200px] md:h-[300px] w-[600px]"
            />
            <DescriptionBlock description={item?.description} />
          </div>
        </div>
      )}
    </>
  );
};

export default SocialResponsibility;
