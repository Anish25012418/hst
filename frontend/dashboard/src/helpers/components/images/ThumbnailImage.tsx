// Import - helpers
import Image from "./Image";

// Import - utils
import { getImageSrc } from "@/utils/methods/image-methods";

// Main
const ThumbnailImage = (props: any) => {
  // Props
  const { src, param } = props;
  const isBlobOrBase64 = typeof src === "string" && (src.startsWith("blob:") || src.startsWith("data:"));
  return (
    // <div>
    <Image
      src={isBlobOrBase64 ? src : getImageSrc(src, param)}
      alt={src}
      divCss="w-[80px] h-[80px] object-cover border-[2px] border-brand-yellow-600 p-1"
    />
  );
};

export default ThumbnailImage;
