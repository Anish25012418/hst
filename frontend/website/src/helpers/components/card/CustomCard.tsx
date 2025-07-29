"use client";

// Default
import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import { useState } from "react";
import Image from "next/image";

// Helpers
import { default as CustomTypography } from "../texts/CustomTypography";
import { useRouter } from "next/navigation";

// Schema
type CustomCardSchema = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  isPrimaryYellow?: boolean;
  isWhite?: boolean;
  className?: any;
  content?: string;
  videoSrc?: string;
  linkHref?: string;
};

// Main
const CustomCard = (props: CustomCardSchema) => {
  // Props
  const {
    imageSrc,
    imageAlt,
    title,
    isPrimaryYellow,
    isWhite,
    className: cls,
    content,
    videoSrc,
    linkHref,
  } = props;

  // Hooks
  const route = useRouter();

  // State
  const [isHovered, setIsHovered] = useState(false);

  // Css
  const className = cls ?? (isPrimaryYellow ? "text-[#F8A408]" : "text-white");
  // const finalFontColor = `${
  //   className ? `${className}` : "text-black `${fontColor}`"
  // }`;
  const bgColor = isWhite ? "bg-white" : "bg-black";

  return (
    <div onClick={() => linkHref && route.push(linkHref)}>
      <Card
        className={`max-w-[24rem] h-[300px] lg:h-[400px] w-[200px] lg:w-[600px] overflow-hidden border-none shadow-none rounded-none p-0 ${bgColor} cursor-pointer`}
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none h-[300px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={100}
            height={100}
            className={`object-cover h-full w-full transition-opacity duration-700 ease-in-out ${
              isHovered ? "opacity-0" : "opacity-100"
            } absolute top-0 left-0`}
            priority
          />
          {isHovered && videoSrc && (
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              className={`object-cover h-full w-full transition-opacity duration-700 ease-in-out ${
                isHovered ? "opacity-100" : "opacity-0"
              } absolute top-0 left-0`}
            />
          )}
        </CardHeader>
        <CardBody className={className}>
          <CustomTypography
            className={`${className} text-base font-semibold lg:text-xl lg:font-bold`}
          >
            {title}
          </CustomTypography>
          <CustomTypography>{content}</CustomTypography>
        </CardBody>
      </Card>
    </div>
  );
};

export default CustomCard;
