// Import - helpers
import * as comp from "@/helpers/components-dashboard";

// Main
const SubcategoriesDraftPage = () => {
  return (
    <>
      <comp.DeleteSubcategoryDraft />
      {/* <comp.PostSubcategory /> */}
      <comp.GetSubcategoriesDraft />
      <comp.UpdateSubcategoryDraft />
    </>
  );
};

export default SubcategoriesDraftPage;
