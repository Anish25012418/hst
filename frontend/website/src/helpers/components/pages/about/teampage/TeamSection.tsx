"use clients";
// Defaults
import Image from "next/image";

// Helpers
import { CustomTypography } from "@/helpers/components";
import { TeamCard } from "@/helpers/components/";

// Assets
import { TeamWave, TeamWaveDown } from "@/assets/image";

const TeamSection = (props: any) => {
  // Props
  const { team } = props;
  return (
    <>
      <Image src={TeamWave} alt="wave" className="w-[1920px]" />
      <div className="bg-brand-yellow-600 w-full h-[900px] md:h-[550px] flex flex-col items-center justify-center gap-4">
        <CustomTypography isPermanentFont variant="h4">
          Co-Founders
        </CustomTypography>
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 mx-10">
          {team?.teamFounders?.map(
            ({ image, name, designation }: any, id: number) => (
              <TeamCard
                key={id}
                image={image}
                name={name}
                designation={designation}
                isFounder
              />
            )
          )}
        </div>
      </div>
      <Image
        src={TeamWaveDown}
        alt="wave"
        className="w-[1920px] -translate-y-[3px]"
      />
      ;
      <div className="mx-[105px] flex flex-col items-center justify-center gap-4 my-10">
        <CustomTypography isPermanentFont variant="h4">
          Our Team
        </CustomTypography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {team?.teamMembers?.map(
            ({ image, name, designation }: any, id: number) => (
              <TeamCard
                key={id}
                image={image}
                name={name}
                designation={designation}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default TeamSection;
