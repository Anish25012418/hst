// Helpers
import { CustomError } from "@/helpers/components";

// Import - views
import { PublicLayoutChild } from "@/views/layouts";

const Error404Page = () => {
  return (
    <PublicLayoutChild>
      <CustomError />
    </PublicLayoutChild>
  );
};

export default Error404Page;
