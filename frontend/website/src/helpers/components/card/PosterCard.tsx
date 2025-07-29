"use client";

// Default
import { useState } from "react";
import Image from "next/image";
import { Card, CardBody, CardHeader } from "@material-tailwind/react";

// Helpers
import { default as CustomTypography } from "../texts/CustomTypography";

// Types
type PosterCardSchema = {
  imageSrc: string;
  imageAlt: string;
  hoverImageSrc?: string;
  title?: string;
  imgWidth?: number;
  imgHeight?: number;
};

// Main
const PosterCard = (props: PosterCardSchema) => {
  // Props
  const {
    imageSrc,
    imageAlt,
    hoverImageSrc,
    title,
    imgWidth,
    imgHeight,
    ...rest
  } = props;

  // State
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Card
      className={`max-w-[120px] sm:max-w-[170px] md:max-w-[232px] lg:max-w-[132px] xl:max-w-[200px] h-full overflow-hidden border-none shadow-none p-0 cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rest}
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className={`m-0 rounded-none h-[120px] w-[120px] sm:w-[170px] sm:h-[170px] md:w-[232px] md:h-[232px] lg:h-[144px] lg:w-[132px] xl:h-[156px] xl:w-[156px] flex items-center justify-center transition hover:duration-700`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...rest}
      >
        <Image
          src={isHovered && hoverImageSrc ? hoverImageSrc : imageSrc}
          alt={imageAlt}
          className={`${
            isHovered
              ? "rounded-t-none h-[116px] transition-all duration-1000"
              : "blob-img h-full w-full object-contain"
          } `}
          width={imgWidth ?? 200}
          height={imgHeight ?? 200}
          // layout="fill"
          priority
        />
      </CardHeader>
      <CardBody className="flex items-center justify-center p-0 m-0" {...rest}>
        <div>
          <CustomTypography
            className={`${
              isHovered ? "text-[#F8A408]" : "text-black"
            } text-center font-semibold hover:text-[#F8A408]`}
          >
            {title}
          </CustomTypography>
        </div>
      </CardBody>
    </Card>
  );
};

export default PosterCard;
