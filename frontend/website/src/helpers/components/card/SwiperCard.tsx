"use client";

// Default
import { Swiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Autoplay,
  EffectCards,
  EffectCoverflow,
  Navigation,
} from "swiper/modules";

// import { megaMenuList } from "@/utils/constants/layout-constants";
// import CustomCard from "./CustomCard";

// import { useScreenSize } from "@/helpers/hooks";
// import Image from "next/image";

// Main
const SwiperCard = (props: any) => {
  const {
    children,
    customWidth,
    isCoverFlow,
    isGridSlide,
    isEffectCard,
    spacebetween,
    className: cls,
    ...rest
  } = props;
  // Hooks
  //   const { isMobile, isTablet, isLaptop } = useScreenSize();

  // Variables
  //   const isSectionFour = section === "4";
  //   const slidesPerView = isMobile ? 2 : isTablet ? 4 : isLaptop ? 4 : 4;
  // const effectCoverFlow = {
  //   coverflowEffect: {
  //     rotate: 50,
  //     stretch: 0,
  //     depth: 100,
  //     modifier: 1,
  //     slideShadows: true,
  //   },
  //   effect: "coverflow",
  //   centeredSlides: true,
  // };

  const gridSlide = {
    slidesPerView: 4,
    centeredSlides: true,
  };

  const effectSlide = {
    effect: "cards",
  };

  // Css
  const className = `${customWidth ?? "max-w-[calc(100vw-4px)]"} ${cls}`;

  return (
    <div className={"className"}>
      <Swiper
        // effect={}
        spaceBetween={spacebetween ?? 0}
        // {...(isCoverFlow && { ...effectCoverFlow })}
        {...(isGridSlide && { ...gridSlide })}
        {...(isEffectCard && { ...effectSlide })}
        grabCursor={true}
        navigation={true}
        modules={[Autoplay, EffectCoverflow, Navigation, EffectCards]}
        className={className}
        loop
        {...rest}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default SwiperCard;
