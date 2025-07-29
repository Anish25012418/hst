// Defaults
import { useQuery } from "@tanstack/react-query";

// Utils
import { HOMEPAGE_API } from "@/utils/data/api/api-routes";
import { apiQuery } from "@/utils/methods/api-methods";

// Main
const useHomepageApi = () => {
  const {
    data: getAllHomepage,
    refetch: getAllHomepageFetch,
    isFetching: getAllHomepageFetching,
    isRefetchError: getAllHomepageFetchError,
  } = useQuery({
    queryKey: ["useHomepageApi_getAll"],
    queryFn: () => apiQuery({ route: HOMEPAGE_API().get }),
  });
  return {
    getAllHomepage,
    getAllHomepageFetch,
    getAllHomepageFetching,
    getAllHomepageFetchError,
  };
};

export default useHomepageApi;
