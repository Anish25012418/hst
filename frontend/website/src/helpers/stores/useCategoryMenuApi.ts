// Defaults
import { useQuery } from "@tanstack/react-query";

// Utils
import { CATEGORY_MENU_API } from "@/utils/data/api/api-routes";
import { apiQuery } from "@/utils/methods/api-methods";

const useCategoryMenuApi = () => {
  const {
    data: getAllMenuCategory,
    refetch: getAllMenuCategoryFetch,
    isFetching: getAllMenuCategoryFetching,
    isRefetchError: getAllMenuCategoryFetchError,
  } = useQuery({
    queryKey: ["useCategoryMenuApi_getAll"],
    queryFn: () => apiQuery({ route: CATEGORY_MENU_API().get }),
  });
  return {
    getAllMenuCategory,
    getAllMenuCategoryFetch,
    getAllMenuCategoryFetching,
    getAllMenuCategoryFetchError,
  };
};

export default useCategoryMenuApi;
