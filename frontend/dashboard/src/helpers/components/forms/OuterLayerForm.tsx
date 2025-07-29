// Import - helpers
import Spinner from "../animations/Spinner";
import CenterContainer from "../containers/CenterContainer";

// Main
const OuterLayerForm = ({ isLoading, children }: any) => {
  return (
    <>
      {isLoading ? (
        <CenterContainer>
          <Spinner status="primary" />
        </CenterContainer>
      ) : (
        children
      )}
    </>
  );
};

export default OuterLayerForm;
