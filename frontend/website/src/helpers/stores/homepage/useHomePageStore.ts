// Default
import { create } from "zustand";

// Utils
// import { UseAllServicesStoreSchema } from "@/utils/schemas/StoresSchema";

// Initial state of the client store
type UseHomePageStoreSchema = {
  // All data
  homePage: any;

  // Destructured data
  categories: any;
  subcategories: any;
  blogs: any;
  staticPages: any;
  categoryMenu: any;

  setHomePage: (homePage: any) => void;
};

// Main
const useHomePageStore = create<UseHomePageStoreSchema>()((set) => ({
  homePage: {},
  categories: {},
  subcategories: {},
  blogs: {},
  staticPages: {},
  categoryMenu: {},

  setHomePage: (homePage) =>
    set((state) => {
      // Safely extract data with defaults to avoid undefined errors
      const {
        categories = [],
        subcategories = [],
        blogs = [],
        staticPages = [],
        categoryMenu = [],
      } = homePage?.getAllHomepage?.data ?? {};

      const fixedSubcategories = subcategories.map((sub: { slugs: string[]; }) => ({
        ...sub,
        slugs: sub.slugs?.map((slug: string) =>
          slug.replace(/-\/+/g, "/")
        ) ?? [],
      }));

      // Return the structured data
      return {
        ...state,
        homePage,
        categories,
        subcategories: fixedSubcategories,
        blogs,
        staticPages,
        categoryMenu,
      };
    }),
}));

export default useHomePageStore;
