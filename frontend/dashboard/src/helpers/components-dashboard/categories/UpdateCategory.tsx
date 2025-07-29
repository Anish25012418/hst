// Import - default
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

// Import - components
import * as comp from "@/helpers/components";

// Import - hooks
import { ToastContext } from "@/helpers/contexts";
import * as hooks from "@/helpers/hooks";
import { useCategoryApi, useCategoryStore } from "@/helpers/stores";

// Import - utils
import * as f from "@/utils/constants/form-constants";
import * as t from "@/utils/constants/toast-constants";
import { getInputErr } from "@/utils/methods/form-methods";
import { CategoryValidation } from "@/utils/validations/formValidation";
import { CATEGORY_ROUTES } from "@/utils/data/api/api-routes";
import { getApiErrorMsg, getApiSuccessMsg } from "@/utils/methods/api-methods";
import {
  isNullObject,
  validateImages,
} from "@/utils/methods/object-methods";
import { InputOnChangeSchema } from "@/utils/schemas/GlobalSchema";

// Main
// const UpdateCategory = () => {
//   // Context
//   const { setToast } = useContext(ToastContext);
//
//   // Stores
//   // const categoryApi = useCategoryApi();
//   const categoryStore = useCategoryStore();
//
//   // Hooks
//   const {
//     control,
//     handleSubmit,
//     watch,
//     formState: { errors },
//     ...rest
//   } = useForm({
//     resolver: yupResolver(CategoryValidation),
//     mode: "onChange",
//   });
//   const { getAllRefetch } = useCategoryApi();
//   const isOnline = hooks.useInternetOnline();
//   const { isLessThan600 } = hooks.useScreenSize();
//
//   // Variables
//   const type = "update";
//   const { forms, handleFormChange, setForm } = categoryStore;
//   const { formData, isOpen, isLoading, item } = forms.update ?? {};
//
//   // Mutation
//   const m = {
//     method: "put",
//     route: CATEGORY_ROUTES({ id: item?._id }).update,
//     onSuccess: (response: any) => {
//       setToast(t.TOAST_SUCCESS(getApiSuccessMsg(response)));
//       setForm({ type, formData: {}, isLoading: false, isOpen: false });
//       getAllRefetch();
//     },
//     onError: (error: any) => {
//       setForm({ type, isLoading: false });
//       setToast(t.TOAST_ERROR(getApiErrorMsg(JSON.parse(error.message))));
//     },
//     onSettled: () => {
//       setForm({ type, isLoading: false });
//     },
//     isAuthForm: true,
//   };
//   const mutation = hooks.useCustomMutation(m);
//
//   // Action when the form is submitted
//   const onSubmit = (data: any) => {
//     // If there is no internet, throw offline internet error
//     if (!isOnline) {
//       setToast(t.NO_INTERNET_ERROR);
//       return;
//     }
//
//     // Variables
//     const {
//       description: descriptionTemp,
//       title: titleTemp,
//       imageCoverPic: imageCoverPicTemp,
//       imageThumbnailPic: imageThumbnailPicTemp,
//     } = data ?? {};
//
//     // Check for image validity
//     const imageValidity = validateImages({
//       imageCoverPicTemp,
//       imageThumbnailPicTemp,
//     }); // Flag to check if images are updated
//
//     // If there is no change in data, throw a toast
//     if (isObjectSubsetOf(data, item) || imageValidity !== "TRUE") {
//       setToast(t.CHANGE_VALUES_TO_EDIT_ERROR);
//       return;
//     }
//
//     // Modify the data that which the backend accepts
//     const formData = {
//       ...(descriptionTemp !== item?.description && {
//         description: descriptionTemp,
//       }),
//       ...(!isArraySubsetOf(imageCoverPicTemp, item?.imageCoverPic) && {
//         imageCoverPic: imageCoverPicTemp,
//       }),
//       ...(imageThumbnailPicTemp !== item?.imageThumbnailPic && {
//         imageThumbnailPic: imageThumbnailPicTemp[0],
//       }),
//       ...(titleTemp !== item?.title && { title: titleTemp }),
//     };
//
//
//     // console.log("Images: ", imageCoverPicTemp)
//     // Api part
//     setForm({ type, isLoading: true });
//     mutation.mutate(formData);
//     // mutation.mutate(JSON.stringify(formData));
//   };
//
//   // Custom form popup props
//   const formProps = {
//     handleClose: () => setForm({ formData: {}, isOpen: false, type }),
//     isLoading,
//     isOpen,
//     onSubmit: handleSubmit(onSubmit),
//     submitTitle: "Update",
//     heading: "Edit Category",
//     type: "large",
//   };
//
//   // Set the vaue if there is item
//   useEffect(() => {
//     if (!isNullObject(item)) {
//       rest.setValue("title", item?.title);
//       rest.setValue("description", item?.description);
//       rest.setValue("imageThumbnailPic", item?.imageThumbnailPic);
//       rest.setValue("imageCoverPic", item?.imageCoverPic);
//     }
//   }, [isOpen, rest.setValue]);
//
//   // Close the form on default load
//   useEffect(() => {
//     setForm({ formData: {}, isOpen: false, type });
//   }, []);
//
//   return (
//     <comp.FormPopup {...formProps}>
//       <div className="w-full">
//         <comp.StickyHeaderSection
//           title={isLessThan600 ? "Edit" : "Edit Category"}
//           submitTitle="Update"
//           {...{
//             isLoading,
//             type,
//             setForm,
//             isSubmitDisabled: isNullObject(formData),
//           }}
//         />
//
//         <div className="pt-2 pb-5 px-6 grid grid-cols-12 gap-7">
//           {/* First section */}
//           <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
//             <comp.ColoredDivSection title="Common" status="secondary">
//               <comp.ControllerInput
//                 {...f.title({
//                   control,
//                   // value:title,
//                   ...getInputErr(errors, "title"),
//                 })}
//                 value={formData?.title ?? item?.title}
//                 onChange={(e: InputOnChangeSchema) =>
//                   handleFormChange(e, "title", type)
//                 }
//               />
//               <comp.ControllerInput
//                 {...rest}
//                 {...f.draftEditorInput({
//                   name: "description",
//                   label: "Description",
//                   control,
//                   ...getInputErr(errors, "description"),
//                 })}
//                 onChange={(e: any) =>
//                   handleFormChange(e, "description", type, "react-select")
//                 }
//                 value={{ ...item?.description, entityMap: {} }}
//               />
//             </comp.ColoredDivSection>
//           </div>
//
//           <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
//             <comp.ColoredDivSection title="Images" status="secondary">
//               <comp.ControllerInput
//                 {...rest}
//                 {...f.imageInput({
//                   control,
//                   isCaption: true,
//                   label: "Cover images",
//                   name: "imageCoverPic",
//                   defaultFiles: item?.imageCoverPic ?? [],
//                   ...getInputErr(errors, "imageCoverPic"),
//                 })}
//                 onChange={(e: InputOnChangeSchema) =>
//                   handleFormChange(e, "imageCoverPic", type, "image")
//                 }
//                 isMultiple
//               />
//
//               <comp.ControllerInput
//                 {...rest}
//                 {...f.imageInput({
//                   control,
//                   isCaption: true,
//                   label: "Thumbnail image",
//                   name: "imageThumbnailPic",
//                   ...getInputErr(errors, "imageThumbnailPic"),
//                 })}
//                 onChange={(e: InputOnChangeSchema) =>
//                   handleFormChange(e, "imageThumbnailPic", type, "image")
//                 }
//                 singleImage={
//                   <comp.ThumbnailImage src={item?.imageThumbnailPic} />
//                 }
//               />
//             </comp.ColoredDivSection>
//           </div>
//         </div>
//       </div>
//     </comp.FormPopup>
//   );
// };

const UpdateCategory = () => {
  // Context
  const { setToast } = useContext(ToastContext);

  // Stores
  const categoryStore = useCategoryStore();

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
  const { getAllRefetch } = useCategoryApi();
  const isOnline = hooks.useInternetOnline();
  const { isLessThan600 } = hooks.useScreenSize();

  // Variables
  const type = "update";
  const { forms, handleFormChange, setForm } = categoryStore;
  const { isOpen, isLoading, item } = forms.update ?? {};


  // Mutation
  const m = {
    method: "put",
    route: CATEGORY_ROUTES({ id: item?._id }).update,
    onSuccess: (response: any) => {
      setToast(t.TOAST_SUCCESS(getApiSuccessMsg(response)));
      setForm({ type, formData: {}, isLoading: false, isOpen: false });
      getAllRefetch();
    },
    onError: (error: any) => {
      setForm({ type, isLoading: false });
      setToast(t.TOAST_ERROR(getApiErrorMsg(JSON.parse(error.message))));
    },
    onSettled: () => {
      setForm({ type, isLoading: false });
    },
    isAuthForm: true,
  };
  const mutation = hooks.useCustomMutation(m);

  // Watch live form values
  const [watchTitle, watchDescription, watchImageCoverPic, watchImageThumbnailPic] = watch([
    "title",
    "description",
    "imageCoverPic",
    "imageThumbnailPic",
  ]);


  // Determine if form has changed
  const isImageCoverChanged =
    JSON.stringify(watchImageCoverPic ?? []) !== JSON.stringify(item?.imageCoverPic ?? []);
  const isThumbnailChanged =
    (Array.isArray(watchImageThumbnailPic)
      ? watchImageThumbnailPic[0]
      : watchImageThumbnailPic) !== item?.imageThumbnailPic;
  const isTitleChanged = watchTitle !== item?.title;
  const isDescriptionChanged = watchDescription !== item?.description;

  const isSubmitDisabled = !(isImageCoverChanged || isThumbnailChanged || isTitleChanged || isDescriptionChanged);

  // Submit handler
  const onSubmit = (data: any) => {
    if (!isOnline) {
      setToast(t.NO_INTERNET_ERROR);
      return;
    }

    const {
      description: descriptionTemp,
      title: titleTemp,
      imageCoverPic: imageCoverPicTemp,
      imageThumbnailPic: imageThumbnailPicTemp,
    } = data ?? {};

    const imageValidity = validateImages({
      imageCoverPicTemp,
      imageThumbnailPicTemp,
    });

    const isImageCoverChanged = JSON.stringify(imageCoverPicTemp) !== JSON.stringify(item?.imageCoverPic);
    const isThumbnailChanged = imageThumbnailPicTemp !== item?.imageThumbnailPic;
    const isTitleChanged = titleTemp !== item?.title;
    const isDescriptionChanged = descriptionTemp !== item?.description;

    const isChanged = isImageCoverChanged || isThumbnailChanged || isTitleChanged || isDescriptionChanged;

    if (!isChanged || imageValidity !== "TRUE") {
      setToast(t.CHANGE_VALUES_TO_EDIT_ERROR);
      return;
    }

    const formData = {
      ...(isTitleChanged && { title: titleTemp }),
      ...(isDescriptionChanged && { description: descriptionTemp }),
      ...(isImageCoverChanged && { imageCoverPic: imageCoverPicTemp }),
      ...(isThumbnailChanged && { imageThumbnailPic: imageThumbnailPicTemp[0] }),
    };

    setForm({ type, isLoading: true });
    mutation.mutate(formData);
  };

  // Form popup props
  const formProps = {
    handleClose: () => setForm({ formData: {}, isOpen: false, type }),
    isLoading,
    isOpen,
    onSubmit: handleSubmit(onSubmit),
    submitTitle: "Update",
    heading: "Edit Category",
    type: "large",
  };

  // Prepopulate form when item is set
  useEffect(() => {
    if (!isNullObject(item)) {
      rest.setValue("title", item?.title);
      rest.setValue("description", item?.description);
      rest.setValue("imageThumbnailPic", item?.imageThumbnailPic);
      rest.setValue("imageCoverPic", item?.imageCoverPic);
    }
  }, [isOpen, rest.setValue]);

  // Reset form on mount
  useEffect(() => {
    setForm({ formData: {}, isOpen: false, type });
  }, []);

  return (
    <comp.FormPopup {...formProps}>
      <div className="w-full">
        <comp.StickyHeaderSection
          title={isLessThan600 ? "Edit" : "Edit Category"}
          submitTitle="Update"
          {...{
            isLoading,
            type,
            setForm,
            isSubmitDisabled,
          }}
        />

        <div className="pt-2 pb-5 px-6 grid grid-cols-12 gap-7">
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
            <comp.ColoredDivSection title="Common" status="secondary">
              <comp.ControllerInput
                {...f.title({
                  control,
                  ...getInputErr(errors, "title"),
                })}
                value={watchTitle}
                onChange={(e: InputOnChangeSchema) =>
                  handleFormChange(e, "title", type)
                }
              />
              <comp.ControllerInput
                {...rest}
                {...f.draftEditorInput({
                  name: "description",
                  label: "Description",
                  control,
                  ...getInputErr(errors, "description"),
                })}
                onChange={(e: any) =>
                  handleFormChange(e, "description", type, "react-select")
                }
                value={{ ...item?.description, entityMap: {} }}
              />
            </comp.ColoredDivSection>
          </div>

          <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
            <comp.ColoredDivSection title="Images" status="secondary">
              <comp.ControllerInput
                {...rest}
                {...f.imageInput({
                  control,
                  isCaption: true,
                  label: "Cover images",
                  name: "imageCoverPic",
                  defaultFiles: item?.imageCoverPic ?? [],
                  ...getInputErr(errors, "imageCoverPic"),
                })}
                onChange={(e: InputOnChangeSchema) =>
                  handleFormChange(e, "imageCoverPic", type, "image")
                }
                isMultiple
              />

              <comp.ControllerInput
                {...rest}
                {...f.imageInput({
                  control,
                  isCaption: true,
                  label: "Thumbnail image",
                  name: "imageThumbnailPic",
                  ...getInputErr(errors, "imageThumbnailPic"),
                })}
                onChange={(e: InputOnChangeSchema) =>
                  handleFormChange(e, "imageThumbnailPic", type, "image")
                }
                singleImage={
                  <comp.ThumbnailImage src={item?.imageThumbnailPic} />
                }
              />
            </comp.ColoredDivSection>
          </div>
        </div>
      </div>
    </comp.FormPopup>
  );
};

export default UpdateCategory;
