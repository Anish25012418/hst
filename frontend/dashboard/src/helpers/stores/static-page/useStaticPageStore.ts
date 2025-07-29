// Import - default
import { create } from "zustand";

// Import - utils
import { COMMON_STORE_STATE } from "@/utils/constants/store-constants";
import { UseStaticPageStoreSchema } from "@/utils/schemas/StoresSchema";

// Main
const useStaticPageStore = create<UseStaticPageStoreSchema>()((set) => ({
  ...COMMON_STORE_STATE(set),
}));

export default useStaticPageStore;
