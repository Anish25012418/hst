
// Default
import { Poppins, Permanent_Marker } from "next/font/google";

// Font variables
export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const permanent = Permanent_Marker({
  weight: [ "400"],
  subsets: ["latin"],
});

// Default font family
export const defaultFontFamily = poppins.className;
export const permanentMarkerFont = permanent.className;

// Custom text sizes
// export const small_text = "text-[10px] sm:text-[12px]",
//   span_text = "text-[12px] sm:text-[14px]",
//   paragraph_text = "text-[14px] sm:text-[16px]",
//   large_text = "text-[16px] sm:text-[18px]",
//   sub_header_text = "text-[18px] sm:text-[20px]",
//   header_text = "text-[20px] sm:text-[22px]",
//   sub_title_text = "text-[22px] sm:text-[24px]",
//   title_text = "text-[24px] sm:text-[26px]",
//   display_6_text = "text-[26px] sm:text-[30px]",
//   display_5_text = "text-[30px] sm:text-[34px]",
//   display_4_text = "text-[34px] sm:text-[38px]",
//   display_3_text = "text-[38px] sm:text-[42px]",
//   display_2_text = "text-[42px] sm:text-[46px]",
//   display_1_text = "text-[46px] sm:text-[50px]";
