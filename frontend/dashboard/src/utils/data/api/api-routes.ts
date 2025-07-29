// Authentication routes
export const AUTH_ROUTES = ({ id }: any) => {
  const BASE = "user";
  return {
    login: `${BASE}/login`,
    logout: `${BASE}/logout`,
    register: `${BASE}/register`,
    regenAuthToken: `${BASE}/regen-auth-token`,
    updateUser: `${BASE}/update-profile/?id=${id}`,
  };
};

// Category routes
export const CATEGORY_ROUTES = ({ id }: any) => {
  const BASE = "category";
  return {
    delete: `${BASE}/${id}`,
    get: `${BASE}`,
    getById: `${BASE}/${id}`,
    post: `${BASE}`,
    update: `${BASE}/${id}`,
  };
};

// Subcategory routes
export const SUB_CATEGORY_ROUTES = ({ id }: any) => {
  const BASE = "subcategory";
  return {
    delete: `${BASE}/${id}`,
    get: `${BASE}`,
    getById: `${BASE}/${id}`,
    post: `${BASE}`,
    update: `${BASE}/${id}`,
  };
};

// Subcategory routes
export const STATIC_PAGE_ROUTES = ({ id }: any) => {
  const BASE = "static_page";
  return {
    get: `${BASE}`,
    update: `${BASE}/${id}`,
  };
};

// Crud routes
export const CRUD_ROUTES = ({ id, model, params }: any) => {
  const paramsQ = `${params ? `/${params}` : ""}`;
  return {
    delete: `${model}/${id}${paramsQ}`,
    get: `${model}${paramsQ}`,
    getById: `${model}/${id}${paramsQ}`,
    post: `${model}${paramsQ}`,
    update: `${model}/${id}${paramsQ}`,
  };
};
