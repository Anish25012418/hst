// Defaults
import { useQuery } from "@tanstack/react-query";

// Utils
import { PAGES_API } from "@/utils/data/api/api-routes";
import { apiQuery } from "@/utils/methods/api-methods";

const useStaticPageApi = () => {
  const {
    data: getAllData,
    refetch: getAllRefecth,
    isFetching: getAllIsFetching,
    isRefetchError: getAllIsRefetchError,
  } = useQuery({
    queryKey: ["useStaticPageApi_getAll"],
    queryFn: () => apiQuery({ route: PAGES_API().get }),
    // enabled:
  });
  return {
    getAllData,
    getAllRefecth,
    getAllIsFetching,
    getAllIsRefetchError,
  };
};

export default useStaticPageApi;
