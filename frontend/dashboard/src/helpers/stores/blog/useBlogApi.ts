// Default
import { useQuery } from "@tanstack/react-query";

// Utils
import { authApiQuery } from "@/utils/methods/api-methods";
import { CRUD_ROUTES } from "@/utils/data/api/api-routes";

// Main
const useBlogApi = () => {
  // Props

  // Varaiables
  const BASE = CRUD_ROUTES({ model: "blog" });
  const route = BASE.get;

  // Get all blogs
  const {
    data: getAllData,
    refetch: getAllRefetch,
    isFetching: getAllIsFetching,
    isRefetchError: getAllIsRefetchError,
  } = useQuery({
    queryKey: ["blogsData"],
    queryFn: () => authApiQuery({ route }),
    // enabled: true,
  });

  return {
    // Get all blogs
    getAllData,
    getAllRefetch,
    getAllIsFetching,
    getAllIsRefetchError,
  };
};

export default useBlogApi;
