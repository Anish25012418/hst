// Import - utils
import { ImageSchema } from "@/utils/schemas/ComponentsSchema";

// Main
const Image = (props: ImageSchema) => {
  // Props
  const {
    // Image properties
    src,
    alt,
    // blurDataURL,
    // priority,

    // Css part
    divCss,
    imgCss,

    // Actions
    isFlag,
    onClick,

    // Others
    ...rest
  } = props;

  // Import - default Blur Image
  // const defaultBlurImg =
  //   "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8cPNmPQAIBgMD669M5AAAAABJRU5ErkJggg==";

  // Action when image is clicked
  const handleImageClick = () => {
    isFlag || (onClick && onClick());
  };

  return (
    <div className={divCss ?? "w-full h-full"}>
      <img
        className={imgCss ?? "w-full h-full object-cover"}
        src={src}
        alt={alt}
        // fill={rest.height ? false : true}
        // layout="responsive"
        // placeholder={ ? "empty" : "blur"}
        // placeholder="blur"
        // blurDataURL={blurDataURL ?? defaultBlurImg}
        onClick={handleImageClick}
        {...rest}
      />
    </div>
  );
};

export default Image;
