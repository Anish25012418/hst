// Import - helpers
import * as comp from "@/helpers/components-dashboard";

// Main
const CategoriesPage = () => {
  return (
    <>
      <comp.DeleteCategory />
      <comp.PostCategory />
      <comp.GetCategories />
      <comp.UpdateCategory />
    </>
  );
};

export default CategoriesPage;
