// Import - default
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

// Import - components
import * as comp from "@/helpers/components";

// Import - hooks
import { ToastContext } from "@/helpers/contexts";
import * as hooks from "@/helpers/hooks";
import { useBlogApi, useBlogStore } from "@/helpers/stores";

// Import - utils
import * as f from "@/utils/constants/form-constants";
import * as t from "@/utils/constants/toast-constants";
import { getInputErr } from "@/utils/methods/form-methods";
import {
  isArraySubsetOf,
  isNullObject,
  isObjectSubsetOf,
  validateImages,
} from "@/utils/methods/object-methods";
import { BlogValidation } from "@/utils/validations/formValidation";
import { CRUD_ROUTES } from "@/utils/data/api/api-routes";
import { getApiErrorMsg, getApiSuccessMsg } from "@/utils/methods/api-methods";
import { InputOnChangeSchema } from "@/utils/schemas/GlobalSchema";

// Main
const UpdateBlog = () => {
  // Context
  const { setToast } = useContext(ToastContext);

  // Stores
  // const blogApi = useBlogApi();
  const blogStore = useBlogStore();

  // Hooks
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    ...rest
  } = useForm({
    resolver: yupResolver(BlogValidation),
    mode: "onChange",
  });
  const blogApi = useBlogApi();
  const isOnline = hooks.useInternetOnline();
  const { isLessThan600 } = hooks.useScreenSize();

  // Variables
  const type = "update";
  const { forms, handleFormChange, setForm } = blogStore;
  const { formData, isOpen, isLoading, item } = forms.update ?? {};

  // Mutation
  const m = {
    method: "put",
    route: CRUD_ROUTES({ id: item?._id, model: "blog" }).update,
    onSuccess: (response: any) => {
      blogApi.getAllRefetch();
      setToast(t.TOAST_SUCCESS(getApiSuccessMsg(response)));
      setForm({ type, isLoading: false, isOpen: false });
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

  const [watchTitle, watchAuthor, watchContent, watchImageCoverPic, watchImageThumbnailPic] = watch([
    "title", "author", "content", "imageCoverPic", "imageThumbnailPic",
  ]);

  // Determine if form has changed
  const isImageCoverChanged =
    JSON.stringify(watchImageCoverPic ?? []) !== JSON.stringify(item?.imageCoverPic ?? []);
  const isThumbnailChanged =
    (Array.isArray(watchImageThumbnailPic)
      ? watchImageThumbnailPic[0]
      : watchImageThumbnailPic) !== item?.imageThumbnailPic;
  const isTitleChanged = watchTitle !== item?.title;
  const isAuthorChanged = watchAuthor !== item?.author;
  const isContentChanged = watchContent !== item?.content;

  const isSubmitDisabled = !(isImageCoverChanged || isThumbnailChanged || isTitleChanged || isAuthorChanged || isContentChanged || isContentChanged);

  // Action when the form is submitted
  const onSubmit = (data: any) => {
    // If there is no internet, throw offline internet error
    if (!isOnline) {
      setToast(t.NO_INTERNET_ERROR);
      return;
    }
    const {
      content: contentTemp,
      title: titleTemp,
      author: authorTemp,
      imageCoverPic: imageCoverPicTemp,
      imageThumbnailPic: imageThumbnailPicTemp,
    } = data ?? {};

    // Check for image validity
    const imageValidity = validateImages({
      imageCoverPicTemp,
      imageThumbnailPicTemp,
    });

    const isImageCoverChanged = JSON.stringify(imageCoverPicTemp) !== JSON.stringify(item?.imageCoverPic);
    const isThumbnailChanged = imageThumbnailPicTemp !== item?.imageThumbnailPic;
    const isTitleChanged = titleTemp !== item?.title;
    const isAuthorChanged = authorTemp !== item?.author;
    const isContentChanged = contentTemp !== item?.content;

    const isChanged = isImageCoverChanged || isThumbnailChanged || isTitleChanged || isAuthorChanged || isContentChanged;

    // If there is no change in data, throw a toast
    if (!isChanged || imageValidity !== "TRUE") {
      setToast(t.CHANGE_VALUES_TO_EDIT_ERROR);
      return;
    }

    // Modify the data that which the backend accepts
    const formData = {
      ...(isTitleChanged && {title: titleTemp}),
      ...(isAuthorChanged && {author: authorTemp}),
      ...(isContentChanged && {content: contentTemp}),
      ...(isImageCoverChanged && {imageCoverPic: imageCoverPicTemp}),
      ...(isThumbnailChanged && { imageThumbnailPic: imageThumbnailPicTemp[0] }),
    };

    console.log(formData)

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
    submitTitle: "Update",
    heading: "Edit Blog",
    type: "large",
  };

  // Set the vaue if there is item
  useEffect(() => {
    if (!isNullObject(item)) {
      rest.setValue("title", item?.title);
      rest.setValue("author", item?.author);
      rest.setValue("content", item?.content);
      rest.setValue("imageThumbnailPic", item?.imageThumbnailPic);
      rest.setValue("imageCoverPic", item?.imageCoverPic);
    }
  }, [isOpen, rest.setValue]);

  return (
    <comp.FormPopup {...formProps}>
      <div className="w-full">
        <comp.StickyHeaderSection
          title={isLessThan600 ? "Edit" : "Edit Blog"}
          submitTitle="Update"
          {...{ isLoading, type, setForm, isSubmitDisabled }}
        />
        <div className="pt-2 pb-5 px-6 grid grid-cols-12 gap-7">
          {/* First section */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
            <comp.ColoredDivSection title="Common" status="secondary">
              <comp.ControllerInput
                {...f.title({ control })}
                {...getInputErr(errors, "title")}
                value={formData?.title ?? item?.title}
                onChange={(e: InputOnChangeSchema) =>
                  handleFormChange(e, "title", type)
                }
              />

              <comp.ControllerInput
                {...f.title({ control, name: "author", label: "Author" })}
                {...getInputErr(errors, "author")}
                value={formData?.author ?? item?.author}
                onChange={(e: InputOnChangeSchema) =>
                  handleFormChange(e, "author", type)
                }
              />

              <comp.ControllerInput
                {...rest}
                {...f.draftEditorInput({
                  name: "content",
                  label: "Content",
                  control,
                })}
                {...getInputErr(errors, "content")}
                value={{ ...item?.content, entityMap: {} }}
              />
            </comp.ColoredDivSection>
          </div>

          {/* Second section */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
            <comp.ColoredDivSection title="Images" status="secondary">
              <comp.ControllerInput
                {...rest}
                {...f.imageInput({
                  control,
                  isCaption: true,
                  label: "Cover images",
                  name: "imageCoverPic",
                  defaultFiles: item?.imageCoverPic || [],
                  ...getInputErr(errors, "imageCoverPic"),
                })}
                imageList={<comp.ImageSlider imageSrc={item?.imageCoverPic} />}
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

export default UpdateBlog;
