"use client";
// Helpers
import { useScreenSize } from "@/helpers/hooks";

// Relative
import SocialResponsibilitySection from "./SocialSection";

const SocialResponsibility = (props: any) => {
  // Props
  const { data } = props;
  // Hooks
  const { isMobile } = useScreenSize();

  return (
    <div className="mx-[50px] md:mx-[105px]">
      {[...data].reverse().map((item: any, reverseIdx: number) => {
        const index = data.length - 1 - reverseIdx;

        return (
          <SocialResponsibilitySection
            key={index}
            item={item}
            index={index}
            isMobile={isMobile}
          />
        );
      })}
    </div>
  );
};

export default SocialResponsibility;
