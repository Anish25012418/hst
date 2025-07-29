// Default
import { useQuery } from "@tanstack/react-query";

// Utils
import { STATIC_PAGE_ROUTES } from "@/utils/data/api/api-routes";
import { authApiQuery } from "@/utils/methods/api-methods";

// Main
const useStaticPageApi = () => {
  // Get all categories
  const {
    data: getAllData,
    refetch: getAllRefetch,
    isFetching: getAllIsFetching,
    isRefetchError: getAllIsRefetchError,
  } = useQuery({
    queryKey: ["useStaticPageApi_getAllData"],
    queryFn: () => authApiQuery({ route: STATIC_PAGE_ROUTES({}).get }),
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

export default useStaticPageApi;
