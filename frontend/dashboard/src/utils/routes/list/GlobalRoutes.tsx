// Import - default
import { Outlet, Route, Routes } from "react-router-dom";

// Import - relative
import PublicRoute from "../role/PublicRoute";

// Import - helpers
import { CustomError } from "@/helpers/components";

// Import - views
import * as Pages from "@/views/pages";

// Main
const GlobalRoutes = () => {
  return (
    <Routes>
      <Route
        path=""
        element={
          <PublicRoute>
            <Outlet />
          </PublicRoute>
        }
      >
        <Route index element={<Pages.LoginPage />} />
        <Route path="login" element={<Pages.LoginPage />} />
        <Route path="register" element={<Pages.RegisterPage />} />

        {/* Error pages */}
        <Route path="*" element={<CustomError />} />
      </Route>
    </Routes>
  );
};

export default GlobalRoutes;
