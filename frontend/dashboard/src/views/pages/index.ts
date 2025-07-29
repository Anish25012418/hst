////////////////////////////////////////
////////////////////////////////////////
// Error routes
////////////////////////////////////////
////////////////////////////////////////
export { default as Error403Page } from "./errors/Error403Page";
export { default as Error404Page } from "./errors/Error404Page";

////////////////////////////////////////
////////////////////////////////////////
// Public routes
////////////////////////////////////////
////////////////////////////////////////

// Auth
export { default as LoginPage } from "./public/auth/LoginPage";
export { default as RegisterPage } from "./public/auth/RegisterPage";

////////////////////////////////////////
////////////////////////////////////////
// Private routes
////////////////////////////////////////
////////////////////////////////////////

// Auth
export { default as SettingsPage } from "./private/dashboard/auth/SettingsPage";

// Dashboard
export { default as BlogsPage } from "./private/dashboard/BlogsPage";
export { default as CategoriesPage } from "./private/dashboard/CategoriesPage";
export { default as CategoryMenuPage } from "./private/dashboard/CategoryMenuPage";
export { default as DashboardPage } from "./private/dashboard/DashboardPage";
export { default as SubcategoriesPage } from "./private/dashboard/SubcategoriesPage";
export { default as SubcategoriesDraftPage } from "./private/dashboard/SubcategoriesDraftPage";

// About
export { default as OurTeamPage } from "./private/dashboard/static-page/about/OurTeamPage";
export { default as SocialResponsibilityPage } from "./private/dashboard/static-page/about/SocialResponsibilityPage";
export { default as WhyUsPage } from "./private/dashboard/static-page/about/WhyUsPage";

// Contact
export { default as ContactPage } from "./private/dashboard/static-page/ContactPage";

// Home
export { default as HomePage } from "./private/dashboard/static-page/HomePage";

// Rental
export { default as RentalPage } from "./private/dashboard/static-page/RentalPage";

// Workshop page
export { default as WorkshopPage } from "./private/dashboard/static-page/WorkshopPage";

// HST Pokhara Page
export { default as HSTPokharaPage } from "./private/dashboard/static-page/HSTPokharaPage";
