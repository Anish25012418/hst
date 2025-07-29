// Import - helpers
import * as comp from "@/helpers/components-dashboard";

// Main
const SubcategoriesPage = () => {
  return (
    <>
      <comp.DeleteSubcategory />
      <comp.PostSubcategory />
      <comp.GetSubcategories />
      <comp.UpdateSubcategory />
    </>
  );
};

export default SubcategoriesPage;
