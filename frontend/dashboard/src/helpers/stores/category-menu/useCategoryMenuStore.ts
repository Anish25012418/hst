// Import - default
import { create } from "zustand";

// Import - utils
import { COMMON_STORE_STATE } from "@/utils/constants/store-constants";
import { UseCategoryMenuStoreSchema } from "@/utils/schemas/StoresSchema";

// Main
const useCategoryMenuStore = create<UseCategoryMenuStoreSchema>()((set) => ({
  ...COMMON_STORE_STATE(set),
}));

export default useCategoryMenuStore;
