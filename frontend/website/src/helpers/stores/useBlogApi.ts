// Defaults
import { useQuery } from "@tanstack/react-query";

// Utils
import { BLOG_API } from "@/utils/data/api/api-routes";
import { apiQuery } from "@/utils/methods/api-methods";

const useBlogApi = () => {
  const {
    data: getAllBlog,
    refetch: getAllBlogFetch,
    isFetching: getAllBlogFetching,
    isRefetchError: getAllBlogFetchError,
  } = useQuery({
    queryKey: ["useBlogApi_getAll"],
    queryFn: () => apiQuery({ route: BLOG_API().get }),
  });
  return {
    getAllBlog,
    getAllBlogFetch,
    getAllBlogFetching,
    getAllBlogFetchError,
  };
};

export default useBlogApi;
