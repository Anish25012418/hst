// Import - default
import { create } from "zustand";

// Import - utils
import { COMMON_STORE_STATE } from "@/utils/constants/store-constants";
import { filterByKeyPrefix } from "@/utils/methods/object-methods";
import { UseCategoryStoreSchema } from "@/utils/schemas/StoresSchema";

// Main
const useCategoryStore = create<UseCategoryStoreSchema>()((set) => ({
  ...COMMON_STORE_STATE(set),

  // Handle filtered categories
  filteredData: {
    title: [],
  },
  setFilteredData: (value: any) =>
    set((state) => {
      const arr = state.forms.get.api?.data;
      const filteredData = {
        title: filterByKeyPrefix("title", value, arr),
      };
      return { ...state, filteredData };
    }),
}));

export default useCategoryStore;
