// Import - default
import { Route, Routes } from "react-router-dom";

// Import - helpers
import { CustomError } from "@/helpers/components";

// Import - utils
import PrivateRoute from "../role/PrivateRoute";

// Import - views
import { DashboardLayout } from "@/views/layouts";
import * as Pages from "@/views/pages";

// Main
const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path=""
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        {/* Root route */}
        <Route index element={<Pages.DashboardPage />} />

        {/* Home page routes */}
        <Route path="home" element={<Pages.HomePage />} />

        {/* About page routes */}
        <Route path="about" element={<Pages.DashboardPage />}>
          <Route index element={<Pages.WhyUsPage />} />
          <Route path="our-team" element={<Pages.OurTeamPage />} />
          <Route
            path="social-responsibility"
            element={<Pages.SocialResponsibilityPage />}
          />
          <Route path="why-us" element={<Pages.WhyUsPage />} />
        </Route>

        {/* Contact */}
        <Route path="contact" element={<Pages.ContactPage />} />

        {/* Other routes */}
        <Route path="dashboard" element={<Pages.DashboardPage />} />
        <Route path="categories" element={<Pages.CategoriesPage />} />
        <Route path="subcategories" element={<Pages.SubcategoriesPage />} />
        <Route
          path="subcategories-draft"
          element={<Pages.SubcategoriesDraftPage />}
        />
        <Route path="blogs" element={<Pages.BlogsPage />} />

        {/* Category menu */}
        <Route path="category_menu" element={<Pages.CategoryMenuPage />} />

        {/* Rental */}
        <Route path="rental" element={<Pages.RentalPage />} />

        {/* Workshop */}
        <Route path="workshop" element={<Pages.WorkshopPage />} />

        {/* HST Pokhara */}
        <Route path="hst_pokhara" element={<Pages.HSTPokharaPage />} />

        {/* Settings */}
        <Route path="settings" element={<Pages.SettingsPage />} />

        {/* Errors */}
        <Route path="*" element={<CustomError />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
