// Defaults
import { useQuery } from "@tanstack/react-query";

// Utils
import { SUBCATEGORY_API } from "@/utils/data/api/api-routes";
import { apiQuery } from "@/utils/methods/api-methods";

const useSubCategoryApi = () => {
  const {
    data: getAllSubCategory,
    refetch: getAllSubCategoryFetch,
    isFetching: getAllSubCategoryFetching,
    isRefetchError: getAllSubCategoryFetchError,
  } = useQuery({
    queryKey: ["useSubCategoryApi_getAll"],
    queryFn: () => apiQuery({ route: SUBCATEGORY_API().get }),
  });
  return {
    getAllSubCategory,
    getAllSubCategoryFetch,
    getAllSubCategoryFetching,
    getAllSubCategoryFetchError,
  };
};

export default useSubCategoryApi;
