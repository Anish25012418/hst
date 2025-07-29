// Import - helpers
import * as comp from "@/helpers/components-dashboard";

// Main
const BlogsPage = () => {
  return (
    <>
      <comp.DeleteBlog />
      <comp.PostBlog />
      <comp.GetBlogs />
      <comp.UpdateBlog />
    </>
  );
};

export default BlogsPage;
