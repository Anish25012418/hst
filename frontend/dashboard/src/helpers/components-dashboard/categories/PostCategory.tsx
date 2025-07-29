comp.OuterLayerForm; // Import - default
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

// Import - components
import * as comp from "@/helpers/components";

// Import - hooks
import { ToastContext } from "@/helpers/contexts";
import * as hooks from "@/helpers/hooks";
import * as stores from "@/helpers/stores";

// Import - utils
import * as f from "@/utils/constants/form-constants";
import * as t from "@/utils/constants/toast-constants";
import { getInputErr } from "@/utils/methods/form-methods";
import { CATEGORY_ROUTES } from "@/utils/data/api/api-routes";
import { getApiErrorMsg, getApiSuccessMsg } from "@/utils/methods/api-methods";
import { CategoryValidation } from "@/utils/validations/formValidation";

// Main
const PostCategory = () => {
  // Context
  const { setToast } = useContext(ToastContext);

  // Stores
  // const categoryApi = useCategoryApi();
  const categoryStore = stores.useCategoryStore();

  // Hooks
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    ...rest
  } = useForm({
    resolver: yupResolver(CategoryValidation),
    mode: "onChange",
  });
  const { getAllRefetch, getAllIsFetching } = stores.useCategoryApi();
  const isOnline = hooks.useInternetOnline();
  const { isLessThan600 } = hooks.useScreenSize();

  // Variables
  const type = "post";
  const { forms, setForm } = categoryStore;
  const { isOpen, isLoading } = forms.post ?? {};

  // Mutation
  const m = {
    method: type,
    route: CATEGORY_ROUTES({}).post,
    onSuccess: (response: any) => {
      setForm({ type, isLoading: false, isOpen: false });
      setToast(t.TOAST_SUCCESS(getApiSuccessMsg(response)));
      getAllRefetch();
    },
    onError: (error: any) => {
      setForm({ type, isLoading: false });
      setToast(t.TOAST_ERROR(getApiErrorMsg(JSON.parse(error.message))));
    },
    onSettled: () => {
      setForm({ type, isLoading: false, isOpen: false });
    },
    isAuthForm: true,
  };
  const mutation = hooks.useCustomMutation(m);

  // Action when the form is submitted
  const onSubmit = (data: any) => {
    // If there is no internet, throw offline internet error
    if (!isOnline) {
      setToast(t.NO_INTERNET_ERROR);
      return;
    }

    // Modify the data that which the backend accepts
    const formData = {
      ...data,
      imageThumbnailPic: data.imageThumbnailPic[0],
    };

    // Api part
    setForm({ type, isLoading: true });
    mutation.mutate(formData);
    // mutation.mutate(JSON.stringify(formData));
  };

  // Custom form popup props
  const formProps = {
    handleClose: () => {
      setForm({ formData: {}, isOpen: false, type });
    },
    isLoading,
    isOpen,
    onSubmit: handleSubmit(onSubmit),
    submitTitle: "Add",
    heading: "Add Category",
    type: "large",
  };

  // Close the form on default load
  useEffect(() => {
    setForm({ formData: {}, isOpen: false, type });
  }, []);

  return (
    <comp.OuterLayerForm isLoading={getAllIsFetching}>
      <comp.FormPopup {...formProps}>
        <div className="w-full">
          <comp.StickyHeaderSection
            title={isLessThan600 ? "Add" : "Add Category"}
            {...{ isLoading, type, setForm }}
          />

          <div className="pt-2 pb-5 px-6 grid grid-cols-12 gap-7">
            {/* First section */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
              <comp.ColoredDivSection title="Common" status="secondary">
                <comp.ControllerInput
                  {...f.title({ control })}
                  {...getInputErr(errors, "title")}
                />

                <comp.ControllerInput
                  {...rest}
                  {...f.draftEditorInput({
                    name: "description",
                    label: "Description",
                    control,
                  })}
                  {...getInputErr(errors, "description")}
                />
              </comp.ColoredDivSection>
            </div>

            {/* Second section */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
              <comp.ColoredDivSection title="Images" status="secondary">
                <comp.ControllerInput
                  {...rest}
                  {...f.imageInput({
                    name: "imageCoverPic",
                    label: "Cover images",
                    control,
                  })}
                  isMultiple
                  {...getInputErr(errors, "imageCoverPic")}
                />

                <comp.ControllerInput
                  {...rest}
                  {...f.imageInput({
                    name: "imageThumbnailPic",
                    label: "Thumbnail image",
                    control,
                  })}
                  {...getInputErr(errors, "imageThumbnailPic")}
                />
              </comp.ColoredDivSection>
            </div>
          </div>
        </div>
      </comp.FormPopup>
    </comp.OuterLayerForm>
  );
};

export default PostCategory;
