// Import - default
import { create } from "zustand";

// Import - utils
import { COMMON_STORE_STATE } from "@/utils/constants/store-constants";
import { filterByKeyPrefix } from "@/utils/methods/object-methods";
import { UseBlogStoreSchema } from "@/utils/schemas/StoresSchema";

// Main
const useBlogStore = create<UseBlogStoreSchema>()((set) => ({
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

export default useBlogStore;
