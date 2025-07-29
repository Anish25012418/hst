"use client";

// Defaults
import Image from "next/image";

// Helpers
import {
  CompanyInfo,
  ContactForm,
  ContactInfo,
  CustomTypography,
  Loader,
} from "@/helpers/components";
import {
  useCheckWindow,
  useSafeParseJson,
  useScreenSize,
} from "@/helpers/hooks";
import { useHomePageStore } from "@/helpers/stores";

// Assets
import { TeamWave } from "@/assets/image";

// Types
// type ContactData = {
//   send_message: string;
//   get_in_touch: string;
//   caption: string;
//   brand_name: string;
//   inquiry: string;
//   main_branch: ContactBranch;
//   kathmandu_branch: ContactBranch;
//   pokhara_branch: ContactBranch;
// };

// type ContactBranch = {
//   phone: string;
//   email: string;
//   location: string;
// };

const ContactPage = () => {
  // Hooks
  const { isMobile, isTablet, isMoreThanTablet } = useScreenSize();
  const isWindowDefined = useCheckWindow();

  // Css
  const textSize = isMoreThanTablet
    ? "text-base"
    : isTablet
    ? "text-[10px]"
    : "text-[10px]";

  // Stores
  const { staticPages } = useHomePageStore();

  // States
  // const [contactData, setContactData] = useState<ContactData | null>(null);

  const parsedData = useSafeParseJson(staticPages?.[0]?.contactPage, {});
  const {
    get_in_touch,
    send_message,
    caption,
    kathmandu_branch,
    pokhara_branch,
    our_business_units,
  } = parsedData;
  // useEffect(() => {staticPage
  //   if (getAllData) {
  //     setContactData(parsedData);
  //   }
  // }, [getAllData, parsedData]);

  // if (staticPage?.getAllIsRefetchError) {
  //   return <div>Error loading data. Please try again later.</div>;
  // }send_message

  return (
    <>
      {!isWindowDefined ? (
        <Loader />
      ) : (
        <>
          {" "}
          <div className="mx-[50px] md:mx-[105px]">
            {/* Description */}
            <div className="flex flex-col items-center justify-center gap-1 my-5">
              <CustomTypography>{send_message}</CustomTypography>
              <CustomTypography
                variant="h2"
                className="font-bold text-brand-yellow-600 capitalize"
              >
                {get_in_touch}
              </CustomTypography>
              <CustomTypography className="text-center">
                {caption}
              </CustomTypography>
            </div>

            {/* Get in touch row */}
            <div className="flex flex-col lg:flex-row w-full gap-10 py-7 px-4 rounded-lg">
              <ContactForm isMobile={isMobile} />
              <CompanyInfo contactData={parsedData} />
            </div>
          </div>
          <div>
            {/* Contact Information */}
            <Image src={TeamWave} alt="wave" className="w-[1920px]" />
            <div className="w-full h-[700px] lg:h-[400px] bg-gradient-to-b from-brand-yellow-600 to-white">
              <div className="px-[50px] md:px-[105px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 justify-items-center">
                <ContactInfo
                  title="Kathmandu"
                  branch={kathmandu_branch}
                  textSize={textSize}
                />
                <ContactInfo
                  title="Pokhara"
                  branch={pokhara_branch}
                  textSize={textSize}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ContactPage;
