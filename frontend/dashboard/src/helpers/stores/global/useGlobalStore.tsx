// Import - default
import { create } from "zustand";

// Import - utils
import { UseGlobalStoreSchema } from "@/utils/schemas/StoresSchema";

// Import - utils
// import { UseGlobalStoreSchema } from "@/utils/schemas/HooksSchema";
// import { FormParams } from "@/utils/constants/constants";

// eslint-disable-next-line react-refresh/only-export-components
const InitialImageStates = {
  selectedImage: [], // Selected image files on a certain form
  fileImages: [], // All the file images on a certain form
};

// Initial state of the global store
const initialState = {
  layout: { isSidebarOpen: false },
  // isSidebarOpen: false, // Hide sidebar at first
  isPassword: true, // Hide password at first
  isRePassword: true, // Hide retype password at first
  // stores: [], // All the stores
  // selectedStore: {}, // Selected store
  // isLoading:false, //
  // modal: { isOpen: false, item: {} },
  // ...FormParams,
  modal: { isOpen: false, item: {} },
  ...InitialImageStates,
};

// Main
const useGlobalStore = create<UseGlobalStoreSchema>()((set) => ({
  initialState,

  // Handle sidebar menu click
  handleToggleSidebar: () =>
    set((state) => ({
      ...state,
      initialState: {
        ...state.initialState,
        layout: {
          ...state.initialState.layout,
          isSidebarOpen: !state.initialState.layout.isSidebarOpen,
        },
      },
    })),

  // Handle the sidebar to be shown
  // setIsSidebarOpen: (isSidebarOpen: boolean) =>
  //   set((state) => ({
  //     ...state,
  //     initialState: { ...state.initialState, isSidebarOpen },
  //   })),

  // Handle the password to be shown
  setIsPassword: (isPassword: boolean) =>
    set((state) => ({
      ...state,
      initialState: { ...state.initialState, isPassword },
    })),

  // Handle the password to be shown
  setIsRePassword: (isRePassword: boolean) =>
    set((state) => ({
      ...state,
      initialState: { ...state.initialState, isRePassword },
    })),

  // Handle modal variable
  setIsModal: ({ isOpen, item }) =>
    set((state) => ({
      ...state,
      initialState: {
        ...state.initialState,
        modal: { ...state.initialState.modal, isOpen, item },
      },
    })),

  // Handle the selected image
  setSelectedImage: (selectedImage) =>
    set((state) => ({
      ...state,
      initialState: { ...state.initialState, selectedImage },
    })),

  // Handle the file images
  setFileImages: (fileImage) =>
    set((state) => ({
      ...state,
      initialState: {
        ...state.initialState,
        fileImages: [...state.initialState.fileImages, fileImage],
      },
    })),

  // Handle all file images
  setAllFileImages: (fileImages) =>
    set((state) => ({
      ...state,
      initialState: {
        ...state.initialState,
        fileImages,
      },
    })),

  // Clear images
  clearImages: () =>
    set((state) => ({
      ...state,
      initialState: { ...state.initialState, ...InitialImageStates },
    })),
}));

export default useGlobalStore;
