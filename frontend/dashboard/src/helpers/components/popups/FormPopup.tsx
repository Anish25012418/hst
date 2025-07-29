// Import - helpers
import ModalPopup from "./ModalPopup";
import SimpleForm from "../forms/SimpleForm";

// Import - utils
import { SimpleFormSchema } from "@/utils/schemas/ComponentsSchema";

// Main
const FormPopup = (props: SimpleFormSchema) => {
  // Props
  // const { children, ...rest } = props;
  return (
    <ModalPopup
      isOpen={props?.isOpen}
      handleClose={props?.handleClose}
      type={props?.type}
    >
      {/* <Container color="bg-white" extendCss="items-center"> */}
      <SimpleForm {...props} />
      {/* </Container> */}
    </ModalPopup>
  );
};

export default FormPopup;
