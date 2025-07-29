// Default
import { useQuery } from "@tanstack/react-query";

// Utils
import {
  CATEGORY_ROUTES,
  CRUD_ROUTES,
  SUB_CATEGORY_ROUTES,
} from "@/utils/data/api/api-routes";
import { authApiQuery } from "@/utils/methods/api-methods";

// Main
const useSubcategoryApi = () => {
  // Get all categories
  const {
    data: getAllData,
    refetch: getAllRefetch,
    isFetching: getAllIsFetching,
    isRefetchError: getAllIsRefetchError,
  } = useQuery({
    queryKey: ["useSubcategoryApi_getAllData"],
    queryFn: () => authApiQuery({ route: CATEGORY_ROUTES({}).get }),
    // enabled: true,
  });

  // Get all sub categories
  const {
    data: subgetAllData,
    refetch: subgetAllRefetch,
    isFetching: subgetAllIsFetching,
    isRefetchError: subgetAllIsRefetchError,
  } = useQuery({
    queryKey: ["useSubcategoryApi_subgetAllData"],
    queryFn: () => authApiQuery({ route: SUB_CATEGORY_ROUTES({}).get }),
    // enabled: true,
  });

  // Get all sub categories
  const {
    data: subDraftGetAllData,
    refetch: subDraftGetAllRefetch,
    isFetching: subDraftGetAllIsFetching,
    isRefetchError: subDraftGetAllIsRefetchError,
  } = useQuery({
    queryKey: ["useSubcategoryApi_subDraftGetAllData"],
    queryFn: () =>
      authApiQuery({ route: CRUD_ROUTES({ model: "subcategory_draft" }).get }),
    // enabled: true,
  });

  return {
    // Get all categories
    getAllData,
    getAllRefetch,
    getAllIsFetching,
    getAllIsRefetchError,

    // Get all subcategories
    subgetAllData,
    subgetAllRefetch,
    subgetAllIsFetching,
    subgetAllIsRefetchError,

    // Get all subcategories draft
    subDraftGetAllData,
    subDraftGetAllRefetch,
    subDraftGetAllIsFetching,
    subDraftGetAllIsRefetchError,
  };
};

export default useSubcategoryApi;
