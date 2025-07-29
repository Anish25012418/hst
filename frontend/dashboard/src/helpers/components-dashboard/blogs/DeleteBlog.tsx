// Default
import { useContext } from "react";

// Helpers
import { DeletePopup } from "@/helpers/components";
import { ToastContext } from "@/helpers/contexts";
import { useCustomMutation } from "@/helpers/hooks";
import { useBlogApi, useBlogStore } from "@/helpers/stores";

// Utils
import { deleteModalProps } from "@/utils/constants";
import * as t from "@/utils/constants/toast-constants";
import { CRUD_ROUTES } from "@/utils/data/api/api-routes";
import { getApiSuccessMsg } from "@/utils/methods/api-methods";

// Main
const DeleteBlog = () => {
  // Context
  const { setToast } = useContext(ToastContext);

  // Stores
  const categoryStore = useBlogStore();

  // Hooks
  const blogApi = useBlogApi();

  // Variables
  const type = "delete";
  const { forms, setForm } = categoryStore;
  const { isOpen, isLoading, item } = forms.delete ?? {};
  const { _id: id, title } = item ?? {};

  // Mutation
  const m = {
    method: type,
    route: CRUD_ROUTES({ id, model: "blog" }).delete,
    onSuccess: (data: any) => {
      setToast(t.TOAST_SUCCESS(getApiSuccessMsg(data)));
      blogApi.getAllRefetch();
      setForm({ type, isOpen: false, isLoading: false });
    },
    onError: () => {
      setForm({ type, isLoading: false });
      // clearFormModels();
      // clearAll();
    },
    onSettled: () => {
      // clearAll();
      // clearFormModels();
      setForm({ type, isLoading: false });
    },
  };
  const mutation = useCustomMutation(m);

  // Custom props for delete modal
  const deleteProps = {
    isOpen,
    handleOkayPrompt: () => {
      setForm({ type, isLoading: true });
      mutation.mutate(item?.id);
    },
    handleCancelPrompt: () => setForm({ type, isOpen: false }),
    extendCss: "top-3 right-3 max-w-[300px] sm:max-w-[500px]",
    isLoading,
    ...deleteModalProps(title),
  };

  return <DeletePopup {...deleteProps} />;
};

export default DeleteBlog;
