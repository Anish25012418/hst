// Helpers
import { CustomError } from "@/helpers/components";

// Import - views
import { PublicLayoutChild } from "@/views/layouts";

const Error403Page = () => {
  return (
    <PublicLayoutChild>
      <CustomError errorStatus={403} />
    </PublicLayoutChild>
  );
};

export default Error403Page;
