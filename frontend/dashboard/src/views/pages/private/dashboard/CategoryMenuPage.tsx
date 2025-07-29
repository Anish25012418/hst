// Import - default
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// Import - helpers
import * as comp from "@/helpers/components";
import { ToastContext } from "@/helpers/contexts";
import * as hooks from "@/helpers/hooks";
import {
  useCategoryApi,
  useCategoryMenuApi,
  useCategoryMenuStore,
} from "@/helpers/stores";

// Import - utils
import * as f from "@/utils/constants/form-constants";
import * as t from "@/utils/constants/toast-constants";
import { CRUD_ROUTES } from "@/utils/data/api/api-routes";
import { getApiSuccessMsg, getApiErrorMsg } from "@/utils/methods/api-methods";
import { getInputErr } from "@/utils/methods/form-methods";
import { InputOnChangeSchema } from "@/utils/schemas/GlobalSchema";
// import { ContactValidation } from "@/utils/validations/formValidation";
import { toTitleCase } from "@/utils/methods/string-methods";
import {
  getCategoryMenuPageFormData,
  getCategoryMenuPageItemData,
} from "@/utils/constants/dashboard/category-menu-constants";
import {
  getLabelValuePair,
  isNullObject,
} from "@/utils/methods/object-methods";

// Main
const CategoryMenuPage = () => {
  // Ref
  const isAlreadyLoadedRef = useRef(false);

  // States
  const [imgHidden, setImgHidden] = useState(false);

  // Context
  const { setToast } = useContext(ToastContext);

  // Stores
  // const api = useBlogApi();
  const api = useCategoryMenuApi();
  const navigate = useNavigate();
  const { getAllData: allCategories, getAllIsFetching: allCategoriesFetching } =
    useCategoryApi();
  const store = useCategoryMenuStore();

  // Hooks
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    ...rest
  } = useForm({
    // resolver: yupResolver(),
    mode: "onChange",
  });
  const isOnline = hooks.useInternetOnline();
  const { isLessThan600 } = hooks.useScreenSize();

  // Variables
  const { getAllData, getAllIsRefetchError } = api;
  const m = {
    store,
    rest,
    watch,
    isLessThan600,
    imgHidden,
    setImgHidden,
  };
  const {
    // Other needed data
    id,

    // imageGalleryPic,
    item,
    setForm,
    formData,
    clearFormValues,
    type,
    handleFormChange,
    stickyHeaderProps,
    inputFields,
  } = getCategoryMenuPageItemData(m);

  // Mutation
  const updateMutationParams = {
    method: "put",
    route: CRUD_ROUTES({
      id,
      model: "category_menu",
    }).update,
    onSuccess: (response: any) => {
      navigate(0);
      setToast(t.TOAST_SUCCESS(getApiSuccessMsg(response)));
      setForm({ type, isLoading: false, isOpen: false });
      // clearFormValues();
    },
    onError: (error: any) => {
      setForm({ type, isLoading: false });
      setToast(t.TOAST_ERROR(getApiErrorMsg(JSON.parse(error.message))));
    },
    onSettled: () => {
      setForm({ type, isLoading: false });
    },
    isPublic: true,
  };
  const updateMutation = hooks.useCustomMutation(updateMutationParams);

  // Action when the form is submitted
  const onSubmit = (data: any) => {
    // If there is no internet, throw offline internet error
    if (!isOnline) {
      setToast(t.NO_INTERNET_ERROR);
      return;
    }

    // Check if the data is empty

    // Prettify form data to send to the backend
    const modifiedData = getCategoryMenuPageFormData(
      data,
      item,
      allCategories?.data
    ); // get the correct data pattern here

    // Api part
    setForm({ type, isLoading: true });
    updateMutation.mutate(modifiedData);
  };

  // Refetch the statuc page section
  useEffect(() => {
    isAlreadyLoadedRef.current = true;

    // Handle in case there is no data in refetch
    if (getAllIsRefetchError) {
      setForm({ type, api: [] });
    } else {
      setForm({ type, api: getAllData });
    }
    clearFormValues();
  }, [getAllIsRefetchError, getAllData]);

  // Set the initial values of the react hook form inputs
  // Since the data is empty at first before api call, will need to wait for the api first
  // useEffect(() => {
  //   if (imgHidden) {
  //     clearFormValues();
  //   }
  // }, [imgHidden]);

  // useEffect(() => {
  //   clearFormValues();
  // }, []);

  // Handle errors on toast
  useEffect(() => {
    const errorValues: any = Object?.values(errors);
    if (errorValues?.length > 0) {
      setToast(t.TOAST_ERROR(errorValues[0]?.message));
    }
  }, [errors]);

  // Custom props for static page
  const staticPageProps = {
    onSubmit: handleSubmit(onSubmit),
    item: item?.length === 0 ? [1] : item,
    stickyHeaderProps,
  };

  // Filtered categoryIds
  // let filteredFormCategories = [];
  // for (let key in formData) {
  //   if (key?.startsWith("select")) {
  //     filteredFormCategories.push(...formData[key]);
  //   }
  // }
  // const filteredCategoryIds = allCategories?.data?.filter(
  //   ({ _id }: any) =>
  //     !filteredFormCategories?.map((item: any) => item?.value)?.includes(_id)
  // );
  return (
    <>
      {allCategoriesFetching ? (
        <>Loading categories...</>
      ) : isNullObject(allCategories) ? (
        <>No categories found. Please make some categories first.</>
      ) : (
        <comp.StaticPageForm {...staticPageProps}>
          {inputFields?.map(([titleBox, selectBox]: string[], idx: number) => {
            // Variables
            // const isTextArea = ["caption", "inquiry"]?.includes(titleBox);
            // const textAreaHeight =
            //   isTextArea && titleBox === "caption"
            //     ? "min-h-[100px]"
            //     : "min-h-[270.5px]";
            // Default category name to display when no category is selected
            const defaultCatName = "Please select a category..";

            // Determine the value for the select box
            const selectBoxValue =
              formData?.[selectBox] || // Use the value from formData if available
              (!item?.[idx]?.title?.isMulti && item?.[idx]?.title?._id // Check if the item has a title with an _id
                ? getLabelValuePair(
                    item?.[idx]?.title?._id, // If yes, create a label-value pair with the _id
                    item?.[idx]?.title?.name // and the name
                  )
                : item?.[idx]?.categories?.map(
                    (
                      { id, title }: any // Otherwise, map over the categories
                    ) => getLabelValuePair(id, title) // and create label-value pairs for each
                  ));

            // Check if the select box has multiple categories selected
            const isMultiCategory = selectBoxValue?.length > 1;

            // Determine the value for the text box
            const textBoxValue = formData[titleBox] || item?.[idx]?.title?.name;

            // Default menu name to display when no title is provided
            const defaultMenuName =
              textBoxValue || "Please type the menu title..";

            // Check if no category is selected
            const isNoCategory =
              typeof selectBoxValue === "undefined" || // True if selectBoxValue is undefined
              selectBoxValue?.length === 0; // or if it has no elements

            // Determine the title to display in the div
            const divTitle = isNoCategory
              ? defaultCatName // If no category is selected, use the default category name
              : `Category ${idx + 1}: ${
                  // Otherwise, construct the category title
                  isMultiCategory
                    ? textBoxValue || defaultMenuName // If multiple categories, use the textBoxValue or default menu name
                    : selectBoxValue?.[0]?.label || defaultMenuName // If single category, use the label or default menu name
                }`;
            return (
              <comp.ColoredDivSection
                key={idx}
                status="secondary"
                // title={`Category ${idx + 1} : ${
                //   formData[titleBox] || item?.[idx]?.title
                // }`}
                title={divTitle}
                extendCss="col-span-12 min-w-[360px] max-w-[620px] mx-auto lg:w-full xl:min-w-[420px] xl:col-span-6"
              >
                {isMultiCategory && (
                  <div className="col-span-1">
                    <comp.ControllerInput
                      {...f.title({
                        control,
                        name: titleBox,
                        label: toTitleCase(titleBox),
                      })}
                      {...getInputErr(errors, titleBox)}
                      value={textBoxValue}
                      onChange={(e: InputOnChangeSchema) =>
                        handleFormChange(e, titleBox, type)
                      }
                    />
                  </div>
                )}
                <div className="col-span-1">
                  <comp.ControllerInput
                    {...f.selectInputOption({
                      control,
                      label: "Categories",
                      name: selectBox,
                      options: allCategories?.data?.map(
                        ({ title, _id }: any) => ({
                          label: title,
                          value: _id,
                        })
                      ),
                      // ?.filter(
                      //   ({ value }: any) =>
                      //     !watch(selectBox || "")
                      //       ?.[selectBox]?.map(({ value }: any) => value)
                      //       ?.includes(value)
                      // ),
                    })}
                    {...getInputErr(errors, selectBox)}
                    {...rest}
                    value={selectBoxValue}
                    onChange={(e: any) =>
                      handleFormChange(e, selectBox, type, "react-select")
                    }
                    isMulti
                  />
                </div>
              </comp.ColoredDivSection>
            );
          })}
        </comp.StaticPageForm>
      )}
    </>
  );
};

export default CategoryMenuPage;
