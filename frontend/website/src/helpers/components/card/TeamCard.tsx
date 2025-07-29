// PersonCard.tsx
import Image from "next/image";
import { CustomTypography } from "@/helpers/components";
import { getApiImg } from "@/utils/methods/img-methods";

const TeamCard = (props: any) => {
  // Props
  const { image, name, designation, isFounder, className } = props;

  // Css
  const imageCss = `${
    isFounder
      ? "w-[400px] h-[350px] xl:h-[420px] max-h-[420px]"
      : "w-[300px] h-[300px] xl:h-[350px] max-h-[420px]"
  } object-cover`;

  const header = isFounder ? "text-3xl" : "";
  const subHeader = isFounder ? "text-xl" : "";

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Image
        src={getApiImg(image)}
        alt="image"
        width={100}
        height={100}
        // className="h-[300px] md:h-[400px] w-[400px]"
        className={imageCss}
      />
      <div className="md:min-h-[100px]">
        <CustomTypography className={`${header} text-center font-bold mt-4`}>
          {name}
        </CustomTypography>
        <CustomTypography className={`${subHeader} text-center font-semibold`}>
          {designation}
        </CustomTypography>
      </div>
    </div>
  );
};

export default TeamCard;
