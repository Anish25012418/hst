"use client";

// Helpers
import { Loader, SocialResponsibility } from "@/helpers/components";
import { useCheckWindow } from "@/helpers/hooks";
import { useHomePageStore } from "@/helpers/stores";
import { getStaticPageData } from "@/utils/methods/app-methods";

const SocialResponsibiltyPage = () => {
  // Hooks
  const isWindowDefined = useCheckWindow();
  const { staticPages } = useHomePageStore();

  // Get the required data from the homepage store
  const socialData = getStaticPageData(staticPages, "socialResponsibilityPage");

  return (
    <>
      {!isWindowDefined ? (
        <Loader />
      ) : (
        <>
          <SocialResponsibility data={socialData} />
        </>
      )}
    </>
  );
};

export default SocialResponsibiltyPage;
