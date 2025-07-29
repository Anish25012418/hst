// Import - default
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Import - relative
import AdminRoutes from "./list/AdminRoutes";
import GlobalRoutes from "./list/GlobalRoutes";
import UserRoutes from "./list/UserRoutes";

// Import - views
import * as Pages from "@/views/pages";

// Main
const MainRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Global routes */}
        <Route path="/*" element={<GlobalRoutes />} />

        {/* Private routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/user/*" element={<UserRoutes />} />

        {/* <Route path="dashboard" element={<PublicLayout />}>
          <Route index element={<Pages.DashboardPage />} />
        </Route> */}

        {/* Error routes */}
        <Route path="*" element={<Pages.Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoute;
