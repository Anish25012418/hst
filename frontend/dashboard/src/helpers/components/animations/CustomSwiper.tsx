"use client";

// Import - default
import { Swiper } from "swiper/react";
import { Autoplay, Keyboard, Navigation } from "swiper/modules";

// Import - helpers
import { useMediaQuery } from "@/helpers/hooks";

// Main
const CustomSwiper = (props: any) => {
  // Props
  const { children, maxLength, ...rest } = props;

  // Hooks
  const [is540Screen, is768Screen, is1024Screen] = [
    useMediaQuery(540),
    useMediaQuery(768),
    useMediaQuery(1024),
  ];

  // Variables
  const slidesPerView = is540Screen
    ? 1
    : is768Screen
    ? 2
    : is1024Screen
    ? 3
    : 4;

  return (
    <Swiper
      draggable
      keyboard={{ enabled: true }}
      // loop={true}
      modules={[Autoplay, Keyboard, Navigation]}
      navigation={true}
      slidesPerView={slidesPerView}
      spaceBetween={20}
      // className="w-screen max-w-screen 5xl:max-w-[2028px]"
      // centeredSlides={items?.service && items?.service?.length > 4}
      {...rest}
    >
      {/* {items?.service?.map((item: any, index: number) => (
        <SwiperSlide
          key={index}
          // className="rounded-none"
        >
          <Card
            {...cardProps}
            {...{ ...item, category_slug: items?.category_slug }}
          />
        </SwiperSlide>
      ))} */}
      {children}
    </Swiper>
  );
};

export default CustomSwiper;
