// Default
import { useQuery } from "@tanstack/react-query";

// Utils
import { CRUD_ROUTES } from "@/utils/data/api/api-routes";
import { authApiQuery } from "@/utils/methods/api-methods";

// Main
const useCategoryMenuApi = () => {
  // Get all categories
  const {
    data: getAllData,
    refetch: getAllRefetch,
    isFetching: getAllIsFetching,
    isRefetchError: getAllIsRefetchError,
  } = useQuery({
    queryKey: ["useCategoryMenuApi_getAllData"],
    queryFn: () =>
      authApiQuery({ route: CRUD_ROUTES({ model: "category_menu" }).get }),
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

export default useCategoryMenuApi;
