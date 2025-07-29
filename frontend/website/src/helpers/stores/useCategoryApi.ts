// Defaults
import { useQuery } from "@tanstack/react-query";

// Utils
import { CATEGORY_API } from "@/utils/data/api/api-routes";
import { apiQuery } from "@/utils/methods/api-methods";

const useCategoryApi = () => {
  const {
    data: getAllCategory,
    refetch: getAllCategoryFetch,
    isFetching: getAllCategoryFetching,
    isRefetchError: getAllCategoryFetchError,
  } = useQuery({
    queryKey: ["useCategoryApi_getAll"],
    queryFn: () => apiQuery({ route: CATEGORY_API().get }),
  });
  return {
    getAllCategory,
    getAllCategoryFetch,
    getAllCategoryFetching,
    getAllCategoryFetchError,
  };
};

export default useCategoryApi;
