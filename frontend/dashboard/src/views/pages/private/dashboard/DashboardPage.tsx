// Import - helpers
import { DashboardContainer } from "@/helpers/components";

// import dummyJson from "@/utils/data/json/teamPage.json";

// Main
const DashboardPage = () => {
  return (
    // <>{JSON.stringify(dummyJson)}</>
    <DashboardContainer extendCss="grid py-10 place-items-center">
      <div className="animate-[bounce_4s_ease-in-out_infinite] text-2xl">
        Welcome to Himalayan Single Track!
      </div>
    </DashboardContainer>
  );
};

export default DashboardPage;
