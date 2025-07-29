// Default
import { Card, CardBody, Avatar } from "@material-tailwind/react";

// Helpers
import { default as CustomTypography } from "../texts/CustomTypography";

// Utils
import { TestimonialSchema } from "@/utils/schemas/HomepageSchema";

// Main
const TestimonialCard = (props: TestimonialSchema) => {
  const { img: image, name, header, star, descp }: any = props;

  const stars: any = [];
  for (let i = 1; i <= star; i++) {
    stars.push(<div key={i} className="bg-[#00AA6C] rounded-full h-4 w-4" />);
  }

  return (
    <div>
      <Card
        shadow={false}
        className="grid h-[25rem] w-[296px] md:w-[30rem] items-center justify-center text-center bg-gray-200 shadow-lg mx-auto"
      >
        <CardBody className="flex items-center justify-center flex-col px-6 md:px-12">
          <Avatar
            size="xl"
            variant="circular"
            alt="testimonial-image"
            className="border-2 border-white"
            src={image}
          />
          <CustomTypography variant="h5" className="mb-2">
            {name}
          </CustomTypography>

          <div className="flex flex-row gap-[2px]">{stars}</div>
          <CustomTypography className="font-semibold text-base">
            {header}
          </CustomTypography>
          <CustomTypography className="font-medium text-base line-clamp-5 display-webkit-box">
            {descp}
          </CustomTypography>
        </CardBody>
      </Card>
    </div>
  );
};

export default TestimonialCard;
