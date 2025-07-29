import { subcategoryEnums } from "../constants/backend/model-constants";

export type GetTableActionsSchema = {
  // States
  store?: any;
  item?: any;
  isDisabled?: boolean;

  // Content to show on hover
  contentDelete?: string;
  contentGetById?: string;
  contentPost?: string;
  contentUpdate?: string;

  // Hide crud
  hideDelete?: boolean;
  hideGetById?: boolean;
  hidePost?: boolean;
  hideUpdate?: boolean;

  // Handlers crud
  handleDelete?: any;
  handleGetById?: any;
  handlePost?: any;
  handleUpdate?: any;
};

export type SubcategoryEnumSchema = keyof typeof subcategoryEnums;
