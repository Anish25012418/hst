// Import - default
import { create } from "zustand";

// Import - utils
import { COMMON_STORE_STATE } from "@/utils/constants/store-constants";
import { UseSubcategoryStoreSchema } from "@/utils/schemas/StoresSchema";
import { filterByKeyPrefix } from "@/utils/methods/object-methods";

// Main
const useSubcategoryStore = create<UseSubcategoryStoreSchema>()((set) => ({
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

  // // editor values
  // editors: {
  //   description: EditorState.createEmpty().getCurrentContent,
  // },
}));

export default useSubcategoryStore;
