// Relative

// Common types
export type FormParamType = {
  api?: any;
  formData?: any;
  isLoading?: boolean;
  isOpen?: boolean;
  item?: any;
  type: any;
  // isLoading?: boolean;
};

// Api initial state values
export type ApiInitialStatesSchema = {
  api: {
    delete?: any;
    get?: any;
    getById?: any;
    post?: any;
    update?: any;
    setDelete?: (res: any) => void;
    setGet?: (res: any) => void;
    setGetById?: (res: any) => void;
    setPost?: (res: any) => void;
    setUpdate?: (res: any) => void;
  };
};

// Common store state and handlers
export type CommonStoreSchema = {
  // Form management
  forms: {
    delete: FormParamType;
    get: FormParamType;
    getById: FormParamType;
    post: FormParamType;
    update: FormParamType;
  };
  setForm: (params: FormParamType) => void;
  clearFormModels: () => void;

  // Loading state
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  // Search state
  searchedValue?: string;
  setSearchedValue?: (searchedValue: string) => void;

  // Data handling
  filteredData?: any;
  setFilteredData?: (data: any) => void;

  // Form input handling
  handleFormChange: (
    e: any,
    label: string,
    type?: string,
    input?: "checkbox" | "react-select" | "select" | "image"
  ) => void;

  // Editors management
  setEditors?: (val: any, type: string) => any;

  // Optional clear function
  clearAll?: () => void;
};

// Global store
export type UseGlobalStoreSchema = {
  initialState: {
    // Layout
    isPassword: boolean;
    isRePassword: boolean;
    layout: {
      isSidebarOpen: boolean;
    };
    modal: { isOpen: boolean; item: any };
    selectedImage: any;
    fileImages: any;
  };

  handleToggleSidebar: () => void;
  setIsPassword: (isPassword: boolean) => void;
  setIsRePassword: (isPassword: boolean) => void;
  setIsModal: ({ isOpen, item }: any) => void;
  setSelectedImage: (selectedImage: any) => void;
  setFileImages: (fileImage: any) => void;
  setAllFileImages: (fileImages: any) => void;
  clearImages: () => void;
};

// Authentication store
export type UseAuthStoreSchema = {
  initialState: {
    auth?: any; // stores auth data from regen api
    forms: {
      login: FormParamType;
      register: FormParamType;
      updateUser: FormParamType;
    };

    // Loading states
    isLoggedIn: boolean;
    isLoading: boolean;
    isLoadingLogin: boolean;
    isLoadingLogout: boolean;
    isLoadingRegister: boolean;
    isLoadingUpdateUser: boolean;

    // Api states
    loginData: any;
    logoutData: any;
    registerData: any;
    updateUserData: any;
  };
  clearAuth: () => void;
  clearFormModels: () => void;
  // handleFormChange: (e: any, label: any, type: any) => void;
  setAuth: (auth: any) => void;

  // Loading states
  setIsLoading: (isLoading: boolean) => void;
  setIsLoadingLogin: (isLoadingLogin: boolean) => void;
  setIsLoadingLogout: (isLoadingLogout: boolean) => void;
  setIsLoadingRegister: (isLoadingRegister: boolean) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;

  // Api states
  setLoginData: (loginData: any) => void;
  setLogoutData: (logoutData: any) => void;
  setForm: (params: any) => void;
  setRegisterData: (registerData: any) => void;
  setUpdateUserData: (updateUserData: any) => void;
};

// Blog Store
export interface UseBlogStoreSchema extends CommonStoreSchema {}

// Category Store
export interface UseCategoryStoreSchema extends CommonStoreSchema {}

// Subcategory Store
export interface UseSubcategoryStoreSchema extends CommonStoreSchema {}

// Static page Store
export interface UseStaticPageStoreSchema extends CommonStoreSchema {}

// Category menu Store
export interface UseCategoryMenuStoreSchema extends CommonStoreSchema {}
