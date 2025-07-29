// Import - default
import { create } from "zustand";
import { StateStorage, StorageValue, persist } from "zustand/middleware";

// Import - utils
// import * as c from "@/utils/constants/auth-constants";
// import { getAuthDataInLocalStorage } from "@/utils/methods/object-methods";
import { UseAuthStoreSchema } from "@/utils/schemas/StoresSchema";
import { initialFormParam } from "@/utils/constants/store-constants";
import { getAuthDataInLocalStorage } from "@/utils/methods/browser-methods";

// Global variables
const { data, message } = getAuthDataInLocalStorage() ?? {};

// Initial params for initialState of auth
const initialAuthParams = {
  forms: {
    login: { ...initialFormParam, type: "login" },
    register: { ...initialFormParam, type: "register" },
    updateUser: {
      ...initialFormParam,
      type: "updateUser",
    },
  },

  // Loading states
  isLoading: false,
  isLoadingLogin: false,
  isLoadingLogout: false,
  isLoadingRegister: false,
  isLoadingUpdateUser: false,
};

// InitialState of auth
const initialState = {
  ...initialAuthParams,
  auth: {
    ...(data ? { data } : {}),
    ...(message ? { message } : {}),
  },
  isLoggedIn: false,
  loginData: {},
  logoutData: {},
  registerData: {},
  updateUserData: {},
};

// type MyPersistStorage = PersistStorage<UseAuthStoreSchema, StateStorage>;
// Main
const useAuthStore = create<UseAuthStoreSchema>()(
  persist(
    (set) => ({
      initialState,

      clearAuth: () =>
        set((state: any) => ({
          ...state,
          initialState: {
            ...state.initialState,
            auth: {},
            loginData: {},
          },
        })),

      // Set value of form modals
      setForm: (value: any) =>
        set((state: any) => {
          const loginState = state.initialState?.forms?.login;
          const registerState = state.initialState?.forms?.register;
          const updateUserState = state.initialState?.forms?.updateUser;
          if (value?.type === "login") {
            state.initialState.forms.login = { ...loginState, ...value };
          } else if (value?.type === "register") {
            state.initialState.forms.register = {
              ...registerState,
              ...value,
            };
          } else if (value?.type === "updateUser") {
            state.initialState.forms.updateUser = {
              ...updateUserState,
              ...value,
            };
          }
          return {};
        }),

      setIsLoggedIn: (isLoggedIn) =>
        set((state: any) => ({
          ...state,
          initialState: { ...state.initialState, isLoggedIn },
        })),

      // Handle forms on change
      // handleFormChange: (e: any, label: any, type: any) =>
      //   set((state: any) => ({
      //     ...state,
      //     initialState: {
      //       ...state.initialState,
      //       forms: {
      //         ...state.initialState.forms,
      //         login:
      //           type === "login"
      //             ? {
      //                 ...state.initialState.forms.login,
      //                 formData: {
      //                   ...state.initialState.forms.login.formData,
      //                   [label]: e.target.value,
      //                 },
      //               }
      //             : { ...state.initialState.forms.login },
      //         register:
      //           type === "register"
      //             ? {
      //                 ...state.initialState.forms.register,
      //                 formData: {
      //                   ...state.initialState.forms.register.formData,
      //                   // [label]: e.target.value,
      //                   [label]:
      //                     label === "imageProfilePic"
      //                       ? e.target.files[0]
      //                       : e.target.value,
      //                 },
      //               }
      //             : { ...state.initialState.forms.register },
      //       },
      //     },
      //   })),

      // Clear all the values from the state
      clearFormModels: () =>
        set((state: any) => ({
          ...state,
          initialState: { ...state.initialState, ...initialAuthParams },
        })),

      // Store the response of regen api
      setAuth: (auth) =>
        set((state: any) => ({
          ...state,
          initialState: { ...state.initialState, auth },
        })),

      // Store the response of login api
      setLoginData: (loginData) =>
        set((state: any) => ({
          ...state,
          initialState: { ...state.initialState, loginData },
        })),

      // Store the response of login api
      setLogoutData: (logoutData) =>
        set((state: any) => ({
          ...state,
          initialState: { ...state.initialState, logoutData },
        })),

      // Set the value of loading
      setIsLoading: (isLoading) =>
        set((state: any) => ({
          ...state,
          initialState: { ...state.initialState, isLoading },
        })),

      // Set the value of loading
      setIsLoadingLogin: (isLoadingLogin) =>
        set((state: any) => ({
          ...state,
          initialState: { ...state.initialState, isLoadingLogin },
        })),

      // Set the value of loading
      setIsLoadingLogout: (isLoadingLogout) =>
        set((state: any) => ({
          ...state,
          initialState: { ...state.initialState, isLoadingLogout },
        })),

      // Set the value of loading
      setIsLoadingRegister: (isLoadingRegister) =>
        set((state: any) => ({
          ...state,
          initialState: { ...state.initialState, isLoadingRegister },
        })),

      // Store the response of register api
      setRegisterData: (registerData) =>
        set((state: any) => ({
          ...state,
          initialState: { ...state.initialState, registerData },
        })),

      // Store the response of register api
      setUpdateUserData: (updateUserData) =>
        set((state: any) => ({
          ...state,
          initialState: { ...state.initialState, updateUserData },
        })),
    }),
    {
      name: "auth",
      // partialize: (state: any) => {
      //   return JSON.stringify({
      //     access_token: state.initialState.auth.access_token,
      //     session: state.initialState.auth.session,
      //   });
      // },
      // serialize: (data: StorageValue<UseAuthStoreSchema>) => {
      //   const { access_token, session } = data?.state?.initialState?.auth;
      //   return JSON.stringify({ access_token, session });
      // }, // Serialize auth values to a string

      // Use the storage option with getItem, setItem, and removeItem functions
      getStorage: () => localStorage as StateStorage, // Use localStorage for persistence
      // storage: {
      //   getItem: (key: string) => {
      //     const storedValue = localStorage.getItem(key);
      //     return storedValue ? JSON.parse(storedValue) : null;
      //   },
      //   setItem: (key: string, value: StorageValue<UseAuthStoreSchema>) => {
      //     console.log("value", value);
      //     const { access_token, session } = value?.state?.initialState?.auth;
      //     localStorage.setItem(key, JSON.stringify({ access_token, session }));
      //   },
      //   removeItem: (key: string) => {
      //     localStorage.removeItem(key);
      //   },
      // },
      // getStorage: () => localStorage as StateStorage, // Use localStorage for persistence
      serialize: (data: StorageValue<UseAuthStoreSchema>) => {
        const { auth } = data?.state?.initialState ?? {};
        return JSON.stringify(auth);
      }, // Serialize auth values to a string
      // deserialize: (str: string) => {
      //   const parsed = JSON.parse(str);
      //   return {
      //     ...parsed,
      //     state: {
      //       ...initialState,
      //       ...parsed.state,
      //     },
      //   };
      // },
    }
  )
);

export default useAuthStore;
