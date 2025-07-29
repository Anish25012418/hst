// Default
import { create } from "zustand";

// Utils
// import { UseAllServicesStoreSchema } from "@/utils/schemas/StoresSchema";

// Initial state of the client store
type UseStaticPageStoreSchema = {
  staticPage: any;
  setStaticPage: (staticPage: any) => void;
};

// Main
const useStaticPageStore = create<UseStaticPageStoreSchema>()((set) => ({
  staticPage: {},

  setStaticPage: (staticPage) =>
    set((state) => ({
      ...state,
      staticPage,
    })),
}));

export default useStaticPageStore;
