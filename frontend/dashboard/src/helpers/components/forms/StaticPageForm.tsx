// Import - helpers
import Spinner from "../animations/Spinner";
import CenterContainer from "../containers/CenterContainer";
import StickyHeaderSection from "../sections/StickyHeaderSection";

// Import - utils
import { isNullObject } from "@/utils/methods/object-methods";

// Main
const StaticPageForm = (props: any) => {
  // Props
  const { onSubmit, children, item, stickyHeaderProps } = props;

  return (
    <>
      {isNullObject(item) ? (
        <CenterContainer>
          <Spinner status="primary" />
        </CenterContainer>
      ) : (
        <form
          onSubmit={onSubmit}
          className="w-full h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] 2xl:max-h-[800px] overflow-y-auto thick-scrollbar"
        >
          <StickyHeaderSection {...stickyHeaderProps} />

          <div className="w-full py-5 px-6 grid grid-cols-12 gap-8">
            {children}
          </div>
        </form>
      )}
    </>
  );
};

export default StaticPageForm;
