// Import - default
import {SwiperSlide} from "swiper/react";

// Import - helpers
import Image from "./Image";
import CustomSwiper from "../animations/CustomSwiper";

// Import - utils
import {getImageSrc} from "@/utils/methods/image-methods";

// Main
const ImageSlider = (props: any) => {
  // Props
  const {imageSrc, param, onRemove} = props;

  return (
    <div className="relative w-full h-[44px]">
      <CustomSwiper
        className="swiper-top justify-center"
        maxLength={imageSrc?.length}
      >
        {imageSrc?.map((item: string, idx: number) => (
          <SwiperSlide key={idx} className="max-w-[100px] relative">
            <div className="relative">
              <Image
                src={item}
                alt={getImageSrc(item, param)}
                divCss="w-full h-full grid place-items-center"
                imgCss="max-h-[84px] object-cover border-[2px] border-brand-yellow-600 p-1"
              />
              <button
                type="button"
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                onClick={() => onRemove?.(idx)}
              >
                ×
              </button>
            </div>
          </SwiperSlide>
        ))}
        {/* {imageSrc?.map((item: string, idx: number) => (
          <SwiperSlide key={idx}>
            <Image src={getImageSrc(item)} alt={item} />
          </SwiperSlide>
        ))} */}
      </CustomSwiper>
    </div>
  );
};

export default ImageSlider;
