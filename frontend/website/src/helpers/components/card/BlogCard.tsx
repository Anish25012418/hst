"use client";

// Default
import { Card, CardHeader, CardFooter } from "@material-tailwind/react";
import Image from "next/image";

// Relative
import { default as CustomTypography } from "../texts/CustomTypography";

// Utils
import { BlogSchema } from "@/utils/schemas/HomepageSchema";

// Main
const BlogCard = (props: BlogSchema) => {
  // Props
  const { img, title } = props;

  return (
    <div>
      <Card
        shadow={false}
        className="relative grid h-[10rem] md:h-[20rem] lg:h-[30rem] w-full items-end justify-center overflow-hidden text-center rounded-none transition duration-200 hover:scale-105 cursor-pointer"
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="absolute inset-0 m-0 h-full w-full rounded-none"
        >
          <Image
            width={10}
            height={10}
            src={img ?? ""}
            alt="Card Image"
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
          />
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
        </CardHeader>
        <CardFooter className="absolute bottom-0 py-14 px-6 md:px-12">
          <CustomTypography
            variant="h5"
            color="white"
            className="font-medium line-clamp-2 display-webkit-box"
          >
            {title}
          </CustomTypography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BlogCard;
