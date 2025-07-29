// Import - utils
import { FormParamType } from "@/utils/schemas/StoresSchema";

// Common variables
export const initialFormParam: FormParamType = {
  api: {},
  formData: {},
  isLoading: false,
  isOpen: false,
  item: {},
  type: "",
};

export const initialParams = {
  forms: {
    delete: { ...initialFormParam, type: "delete" },
    get: { ...initialFormParam, type: "get" },
    getById: { ...initialFormParam, type: "getById" },
    post: { ...initialFormParam, type: "post" },
    update: { ...initialFormParam, type: "update" },
  },
  isLoading: false,
  searchedValue: "",
};

// Common store state variables
export const COMMON_STORE_STATE = (set: any): any => ({
  ...initialParams,

  // set the value of editors
  setEditors: (val: any, type: string) =>
    set((state: any) => ({
      ...state,
      editors: {
        ...state.editors,
        [type]: val,
      },
    })),

  // set value of form modals
  setForm: (params: any) =>
    set((state: any) => {
      const formState = state.forms[params.type];

      if (formState) {
        state.forms[params.type] = { ...formState, ...params };
      }

      return {};
    }),

  // Handle forms on change
  handleFormChange: (e: any, label: any, type: any, input: any) =>
    set((state: any) => ({
      ...state,
      forms: {
        ...state.forms,
        get:
          type === "get"
            ? {
                ...state.forms.get,
                formData: {
                  ...state.forms.get.formData,
                  [label]:
                    input === "checkbox"
                      ? e.target.checked
                      : input === "react-select"
                      ? e
                      : input === "image"
                      ? e.target.files
                      : input === "json"
                      ? JSON.stringify(e?.target?.value)
                      : e.target.value,
                },
              }
            : { ...state.forms.get },
        post:
          type === "post"
            ? {
                ...state.forms.post,
                formData: {
                  ...state.forms.post.formData,
                  [label]:
                    input === "checkbox"
                      ? e.target.checked
                      : input === "react-select"
                      ? e
                      : input === "image"
                      ? e.target.files
                      : input === "json"
                      ? JSON.stringify(e?.target?.value)
                      : e.target.value,
                },
              }
            : { ...state.forms.post },
        update:
          type === "update"
            ? {
                ...state.forms.update,
                formData: {
                  ...state.forms.update.formData,
                  [label]:
                    input === "checkbox"
                      ? e.target.checked
                      : input === "react-select"
                      ? e
                      : input === "image"
                      ? e.target.files
                      : input === "json"
                      ? JSON.stringify(e?.target?.value)
                      : e.target.value,
                },
              }
            : { ...state.forms.update },
      },
    })),

  // // Clear everything from the initial state
  // clearAll: () =>
  //   set((state: any) => ({
  //     ...state,
  //   })),

  // clear all the values from the state
  clearFormModels: () => set((state: any) => ({ ...state, ...initialParams })),

  // set the value of loading
  setIsLoading: (isLoading: boolean) =>
    set((state: any) => ({ ...state, isLoading })),

  // set searched value (on change event)
  setSearchedValue: (searchedValue: any) =>
    set((state: any) => ({ ...state, searchedValue })),
});
