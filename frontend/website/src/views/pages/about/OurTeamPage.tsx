/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import { CategoryWave } from "@/assets/image";
import { NEXT_PUBLIC_HST_APP_URL } from "@/config/env";
// Helpers
import { HeaderSection, Loader, TeamSection } from "@/helpers/components";
import { useCheckWindow, useSafeParseJson } from "@/helpers/hooks";
import { useHomePageStore } from "@/helpers/stores";
import { getStaticPageData } from "@/utils/methods/app-methods";

const OurTeamPage = () => {
  // Hooks
  const isWindowDefined = useCheckWindow();
  const { staticPages } = useHomePageStore();

  // Get the required data from the homepage store
  const ourTeam = useSafeParseJson(
    getStaticPageData(staticPages, "ourTeamPage")
  );

  return (
    <>
      {!isWindowDefined ? (
        <Loader />
      ) : (
        <div className="-translate-y-[100px]">
          <div className="mt-4 md:mt-0 w-full h-[200px] md:h-[500px] ">
            <Image
              src={`${NEXT_PUBLIC_HST_APP_URL}/homepage/${"hst_team_img.jpg"}`}
              alt="HST Pokhara Page"
              width={10}
              height={10}
              className="w-full h-full object-contain md:object-cover"
            />
            <div className={`absolute z-20 -translate-y-[12px]`}>
              <Image
                src={CategoryWave}
                alt="banner_img"
                className="w-[1920px] h-auto"
                width={10}
                height={10}
              />
            </div>
          </div>
          <HeaderSection team={ourTeam} />
          <TeamSection team={ourTeam} />
        </div>
      )}
    </>
  );
};

export default OurTeamPage;

// /* eslint-disable react-hooks/exhaustive-deps */
// "use client";

// import Image from "next/image";
// import { CategoryWave } from "@/assets/image";
// import { NEXT_PUBLIC_HST_APP_URL } from "@/config/env";
// // Helpers
// import { HeaderSection, Loader, TeamSection } from "@/helpers/components";
// import { useCheckWindow, useSafeParseJson } from "@/helpers/hooks";
// import { useHomePageStore } from "@/helpers/stores";
// import { getStaticPageData } from "@/utils/methods/app-methods";
// import { getApiImg } from "@/utils/methods/img-methods";

// const OurTeamPage = () => {
//   // Hooks
//   const isWindowDefined = useCheckWindow();
//   const { staticPages } = useHomePageStore();

//   // Get the required data from the homepage store
//   const ourTeam = useSafeParseJson(
//     getStaticPageData(staticPages, "ourTeamPage")
//   );

//   return (
//     <>
//       {!isWindowDefined ? (
//         <Loader />
//       ) : (
//         <div className="-translate-y-[10px]">
//           <div className="mt-4 md:mt-0 w-full h-[200px] md:h-[400px] ">
//             <Image
//               src={`${NEXT_PUBLIC_HST_APP_URL}/homepage/${"hst_team_img.jpg"}`}
//               alt="HST Pokhara Page"
//               width={10}
//               height={10}
//               className="w-full h-full object-contain md:object-contain"
//             />
//             <div className={`absolute z-20 -translate-y-[12px]`}>
//               <Image
//                 src={CategoryWave}
//                 alt="banner_img"
//                 className="w-[1920px] h-auto"
//                 width={10}
//                 height={10}
//               />
//             </div>
//           </div>
//           <HeaderSection team={ourTeam} />
//           <TeamSection team={ourTeam} />
//         </div>
//       )}
//     </>
//   );
// };

// export default OurTeamPage;
