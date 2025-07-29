"use client";
import React from "react";
import Image from "next/image";
import { CustomTypography } from "@/helpers/components";

const AboutSection = ({ showAbout = true }) => {
  if (!showAbout) {
    return null;
  }

  const aboutContent = [
    {
      title: "The Road - Nepals Midhills Highway",
      description: [
        "This trip is a journey of epic proportions, from the wild west of Nepal all the way to the rolling tea estates in the east, through the mid hills of the mighty himalaya.",
        "The route follows an ancient trade route that once linked remote villages and is not very often traveled by tourists. One of the best things about this journey is the experience you get by spending time with locals, sharing cups of sweet chia, plates of steaming dhal bhat and glasses of homemade local spirits with them. Listen to the stories that define the characters of these hardy people, learn the subtleties of the different cultures and customs as you journey through different regions and ethnic groups.",
        "The landscapes are what you would expect of the himalayan foothills, vast valleys, towering hills and scenic ridge top traversess. Of Course with that comes long climbs and long descents. A lot of the road is paved, some is rough and most of it has very little traffic making this the perfect route to pedal along and lose yourself in the scenic landscape, rich culture and savoring feeling of being apart from the modern world.",
        "This trip can be done in one hit or broken up into two or three sections depending on your time and fitness. The entire journey is 29 to 32 days of riding.",
      ],
      imageSrc:
        "https://app.himalayansingletrack.com/web_images/banner/HomepageBanner2.jpg",
    },
    {
      title: "The Guide Book - The Road",
      description: [
        "The guide book, the road will be published in May 2024. Written by Author Richard Williams, this book is a comprehensive guide book, travel story and photo book covering his personal journey along the road.",
        "Himalayan Single Track supported the exploration of the “The Road” in 2022/2023. Richard Williams Books",
        "The book will be available for purchase soon through GRAFFEG Publishing.",
      ],
      imageSrc:
        "https://app.himalayansingletrack.com/web_images/banner/HomepageBanner2.jpg",
    },
  ];

  return (
    <div className="mx-[50px] md:mx-[105px] my-4">
      <div className="flex flex-col gap-6">
        {aboutContent?.map((content: any, index: number) => (
          <div
            key={index}
            className="bg-brand-yellow-100 p-4 flex flex-col-reverse lg:flex-row items-center justify-center gap-4"
          >
            <div>
              <CustomTypography className="text-xl font-bold text-center lg:text-left mb-2">
                {content?.title}
              </CustomTypography>
              {content?.description?.map((desc: any, idx: number) => (
                <CustomTypography
                  key={idx}
                  className="text-base text-center lg:text-left"
                >
                  {desc}
                </CustomTypography>
              ))}
            </div>
            <Image
              src={content?.imageSrc}
              alt="About Image"
              width={10}
              height={10}
              className="w-[256px] h-[256px] object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSection;
