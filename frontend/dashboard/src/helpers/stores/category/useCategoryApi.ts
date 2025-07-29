// Default
import { useQuery } from "@tanstack/react-query";

// Utils
import { authApiQuery } from "@/utils/methods/api-methods";
import { CATEGORY_ROUTES } from "@/utils/data/api/api-routes";

// Main
const useCategoryApi = () => {
  // Props

  // Get all categories
  const {
    data: getAllData,
    refetch: getAllRefetch,
    isFetching: getAllIsFetching,
    isRefetchError: getAllIsRefetchError,
  } = useQuery({
    queryKey: ["useCategoryApi_getAllData"],
    queryFn: () => authApiQuery({ route: CATEGORY_ROUTES({}).get }),
    // enabled: true,
  });

  return {
    // Get all categories
    getAllData,
    getAllRefetch,
    getAllIsFetching,
    getAllIsRefetchError,
  };
};

export default useCategoryApi;
