// Default
import { useRef } from "react";
import { IoFilter } from "react-icons/io5";

// Helpers
import NoSuchItemsFoundText from "../texts/NoSuchItemsFoundText";
import { default as CenterContainer } from "@/helpers/components/containers/CenterContainer";
import { default as Spinner } from "@/helpers/components/animations/Spinner";
import { useBoxVisible, useScreenSize } from "@/helpers/hooks";

// Utils
import { capitalizeString } from "@/utils/methods/string-methods";
import { PopupSchema } from "@/utils/schemas/ComponentsSchema";
import { OptionSchema } from "@/utils/schemas/GlobalSchema";

// Main
const Popup = (props: PopupSchema) => {
  // Ref
  const isAlreadyLoadedRef = useRef<boolean>(false);

  // Props
  const {
    label,
    value: v,
    options,
    isLoading,
    labelClassName,
    containerClassName,
    onChange,
  } = props;

  // Hooks
  const { domRef, isBoxVisible, setIsBoxVisible } = useBoxVisible();
  const { isLessThanTablet, isMoreThanLaptop } = useScreenSize();

  // Css
  const defaultCss = "relative";
  const className = `${defaultCss} text-primary-400`;

  // Css - label
  const defaultLabelCss =
    "transition-all duration-500 cursor-pointer text-primary-400 hover:text-input-blue flex items-center gap-2 pe-2";
  const labelCss = labelClassName ?? defaultLabelCss;

  // Css - container
  const loadingCss = isLoading ? "justify-center" : "";
  const defaultContainerCss =
    "z-modal absolute top-8 bg-white shadow-md min-w-[220px] min-h-[188px] h-fit max-h-[280px] scrollbar-my-p5 booking-scrollbar overflow-auto px-5 py-2 rounded-none flex flex-col gap-2 border-t-[1px] border-gray-200";
  const containerCss =
    containerClassName ??
    `${defaultContainerCss} ${loadingCss} ${
      isLessThanTablet ? "right-0" : "left-0"
    }`;
  const spinnerCss = `${containerCss} items-center`;

  // Handle loading for the label only & for the first count only
  // useEffect(() => {
  //   if (isLoading) {
  //     // const timeoutId =
  //     setTimeout(() => {
  //       isAlreadyLoadedRef.current = true;
  //     }, 300);
  //     // return () => clearTimeout(timeoutId);
  //   }
  // }, [isLoading]);

  return (
    <div className={className}>
      {isLoading && !isAlreadyLoadedRef.current ? (
        // (isLoading ? (
        <Spinner extendCss="ml-3 w-4 h-4" />
      ) : (
        <>
          {!label ? (
            <NoSuchItemsFoundText hideIcon title="No category found." />
          ) : (
            <div className={labelCss} onClick={() => setIsBoxVisible(true)}>
              <div>
                <IoFilter className="text-[22px]" />
              </div>
              {!isLessThanTablet && !isMoreThanLaptop && (
                <div className="w-fit text-[12px] sm:text-[14px] font-medium border-[1px] px-3.5 py-1.5 rounded-none">
                  {capitalizeString(label)}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {isBoxVisible &&
        (isLoading ? (
          <CenterContainer css={spinnerCss}>
            <Spinner />
          </CenterContainer>
        ) : (
          <div ref={domRef} className={containerCss}>
            {options?.map(({ label, value }: OptionSchema, idx: number) => {
              return (
                <p
                  key={idx}
                  onClick={() => {
                    onChange(value);
                    setIsBoxVisible(false);
                  }}
                  className={`${
                    value === v ? "text-input-blue" : ""
                  } hover:text-input-blue cursor-pointer`}
                >
                  {capitalizeString(label?.toString())}
                </p>
              );
            })}
          </div>
        ))}
    </div>
  );
};

export default Popup;
