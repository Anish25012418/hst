// Import - default
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BiChevronUp } from "react-icons/bi";

// Import - helpers
import * as comp from "@/helpers/components";
import * as hooks from "@/helpers/hooks";
import { ToastContext } from "@/helpers/contexts";
import { useStaticPageApi, useStaticPageStore } from "@/helpers/stores";

// Import - utils
import * as f from "@/utils/constants/form-constants";
import * as t from "@/utils/constants/toast-constants";
import {
  getWhyUsPageFormData,
  getWhyUsPageItemData,
} from "@/utils/constants/dashboard/about-constants";
import { CRUD_ROUTES } from "@/utils/data/api/api-routes";
import { getApiSuccessMsg, getApiErrorMsg } from "@/utils/methods/api-methods";
import { getInputErr } from "@/utils/methods/form-methods";
import {
  validateImages,
  isObjectSubsetOf,
} from "@/utils/methods/object-methods";
import { InputOnChangeSchema } from "@/utils/schemas/GlobalSchema";
import { WhyUsValidation } from "@/utils/validations/formValidation";

// Main
const WhyUsPage = () => {
  // Ref
  const isAlreadyLoadedRef = useRef(false);
  // const isInitalFormAlreadySet = useRef(false);

  // State
  const [open, setOpen] = useState(1);
  const [imgHidden, setImgHidden] = useState(false);

  // Context
  const { setToast } = useContext(ToastContext);

  // Stores
  // const api = useBlogApi();
  const api = useStaticPageApi();
  const store = useStaticPageStore();

  // Hooks
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    ...rest
  } = useForm({
    resolver: yupResolver(WhyUsValidation),
    mode: "onChange",
  });
  const isOnline = hooks.useInternetOnline();
  const { isLessThan600 } = hooks.useScreenSize();

  // Variables
  const { getAllData, getAllIsRefetchError } = api;
  const m = { store, rest, watch, isLessThan600, imgHidden, setImgHidden };
  const {
    // Text data
    s1_title1,
    s1_description1,
    // s2_title1,
    // s2_description1,
    // s2_title2,
    // s2_description2,
    // s2_title3,
    // s2_description3,
    s3_title1,
    s3_title2,
    s3_description2,
    // Custom props
    pointDivProps,
    isFormActionDisabled,
    innerPointProps,

    // Other needed data
    id,
    imageGalleryPic,
    item,
    setForm,
    formData,
    clearFormValues,
    type,
    page,
    handleFormChange,
    stickyHeaderProps,
    galleryImageInputProps,
  } = getWhyUsPageItemData(m);
  const titles = [s1_title1, s3_title1];

  // console.log("imageGalleryPic", imageGalleryPic);
  // console.log("watch(aadasdas)", watch("imageGalleryPic"));

  // Mutation
  const updateMutationParams = {
    method: "put",
    route: CRUD_ROUTES({
      id,
      model: "static_page",
      params: `?q=${page?.query}`,
    }).update,
    onSuccess: (response: any) => {
      api.getAllRefetch();
      setToast(t.TOAST_SUCCESS(getApiSuccessMsg(response)));
      const res = response?.data;
      // clearFormValues();
      rest?.setValue("imageGalleryPic", res?.imageGalleryPic);
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
  const updateMutation = hooks.useCustomMutation(updateMutationParams);

  // Action when the form is submitted
  const onSubmit = (data: any) => {
    // If there is no internet, throw offline internet error
    if (!isOnline) {
      setToast(t.NO_INTERNET_ERROR);
      return;
    }

    // Check for image validity
    const imageGalleryPicTemp = data?.imageGalleryPic;
    const imageTypes = imageGalleryPicTemp?.map((item: any) => typeof item);

    // If the user has uploaded an image, then check if he/she has uploaded 3 images
    if (imageTypes?.includes("object") && imageTypes?.length !== 3) {
      setToast(
        t.TOAST_WARNING(
          "Please upload exactly 3 images if you're gonna change. Else, press reset & dont upload any. Sorry!"
        )
      );
      return;
    }

    // If there is no change in data, throw a toast
    const imageValidity = validateImages({ imageGalleryPicTemp });
    if (isObjectSubsetOf(data, item) || imageValidity !== "TRUE") {
      setToast(t.CHANGE_VALUES_TO_EDIT_ERROR);
      return;
    }

    // Prettify form data to send to the backend
    const modifiedData = getWhyUsPageFormData(data, item); // get the correct data pattern here

    const formData = {
      [page?.name]: { ...modifiedData },
      // ...(!isArraySubsetOf(imageGalleryPicTemp, item?.imageGalleryPic) && {
      imageGalleryPic: imageGalleryPicTemp,
      // }),
    };

    // console.log("modifiedData", modifiedData);
    // console.log("formData", formData);

    // Api part
    setForm({ type, isLoading: true });
    updateMutation.mutate(formData);
  };

  // Action whent the accordion is clicked
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  // Custom props for static page
  const staticPageProps = {
    onSubmit: handleSubmit(onSubmit),
    item,
    stickyHeaderProps,
  };

  // Custom props including imgHidden
  const newRest = { ...rest, imgHidden: isFormActionDisabled };

  // Inputs inside form represented in an array of components
  const formInputs = [
    <>
      {/* Section 1 */}
      <comp.ControllerInput
        {...f.title({
          control,
          name: "s1_title1",
          label: "Heading",
        })}
        {...getInputErr(errors, "s1_title1")}
        value={formData?.s1_title1 ?? s1_title1}
        onChange={(e: InputOnChangeSchema) =>
          handleFormChange(e, "s1_title1", type)
        }
      />
      <comp.ControllerInput
        {...f.description({ control, name: "s1_description1" })}
        {...getInputErr(errors, "s1_description1")}
        value={formData?.s1_description1 ?? s1_description1}
        onChange={(e: InputOnChangeSchema) =>
          handleFormChange(e, "s1_description1", type)
        }
      />
      <comp.ControllerInput
        {...newRest}
        {...f.imageInput({
          control,
          isCaption: true,
          label: "Gallery (Only 3 allowed, The first one will be cover image)",
          name: "imageGalleryPic",
          defaultFiles: imageGalleryPic ?? [],
        })}
        onChange={(e: InputOnChangeSchema) =>
          handleFormChange(e, "imageGalleryPic", type, "image")
        }
        isMultiple
      />
    </>,
    // <>
    //   {/* Section 2  */}
    //   {/* First point  */}
    //   {/* <comp.ColoredDivSection title="First point" {...pointDivProps}>
    //     <comp.ControllerInput
    //       {...f.title({
    //         control,
    //         name: "s2_title1",
    //         label: "Heading",
    //       })}
    //       {...getInputErr(errors, "s2_title1")}
    //       value={formData?.s2_title1 ?? s2_title1}
    //       onChange={(e: InputOnChangeSchema) =>
    //         handleFormChange(e, "s2_title1", type)
    //       }
    //     />
    //     <comp.ControllerInput
    //       {...f.description({ control, name: "s2_description1" })}
    //       {...getInputErr(errors, "s2_description1")}
    //       value={formData?.s2_description1 ?? s2_description1}
    //       onChange={(e: InputOnChangeSchema) =>
    //         handleFormChange(e, "s2_description1", type)
    //       }
    //     />
    //   </comp.ColoredDivSection> */}

    //   {/* Second point  */}
    //   {/* <comp.ColoredDivSection title="Second point" {...pointDivProps}>
    //     <comp.ControllerInput
    //       {...f.title({
    //         control,
    //         name: "s2_title2",
    //         label: "Heading",
    //       })}
    //       {...getInputErr(errors, "s2_title2")}
    //       value={formData?.s2_title2 ?? s2_title2}
    //       onChange={(e: InputOnChangeSchema) =>
    //         handleFormChange(e, "s2_title2", type)
    //       }
    //     />
    //     <comp.ControllerInput
    //       {...f.description({ control, name: "s2_description2" })}
    //       {...getInputErr(errors, "s2_description2")}
    //       value={formData?.s2_description2 ?? s2_description2}
    //       onChange={(e: InputOnChangeSchema) =>
    //         handleFormChange(e, "s2_description2", type)
    //       }
    //     />
    //   </comp.ColoredDivSection> */}

    //   {/* Third point  */}
    //   {/* <comp.ColoredDivSection title="Third point" {...pointDivProps}>
    //     <comp.ControllerInput
    //       {...f.title({
    //         control,
    //         name: "s2_title3",
    //         label: "Heading",
    //       })}
    //       {...getInputErr(errors, "s2_title3")}
    //       value={formData?.s2_title3 ?? s2_title3}
    //       onChange={(e: InputOnChangeSchema) =>
    //         handleFormChange(e, "s2_title3", type)
    //       }
    //     />
    //     <comp.ControllerInput
    //       {...f.description({ control, name: "s2_description3" })}
    //       {...getInputErr(errors, "s2_description3")}
    //       value={formData?.s2_description3 ?? s2_description3}
    //       onChange={(e: InputOnChangeSchema) =>
    //         handleFormChange(e, "s2_description3", type)
    //       }
    //     />
    //   </comp.ColoredDivSection> */}
    // </>,
    <>
      {/* Section 3  */}
      {/* First point  */}
      <comp.ColoredDivSection title="First point" {...pointDivProps}>
        <comp.ControllerInput
          {...f.title({
            control,
            name: "s3_title1",
            label: "Heading",
          })}
          {...getInputErr(errors, "s3_title1")}
          value={formData?.s3_title1 ?? s3_title1}
          onChange={(e: InputOnChangeSchema) =>
            handleFormChange(e, "s3_title1", type)
          }
        />
        <comp.ColoredDivSection title="List" {...innerPointProps}>
          {Array?.from({ length: 6 }, (_, index: number) => index)?.map(
            (idx: number) => {
              // {s3_list1?.map((item: string, idx: number) => {
              const name = `s3_list1_point_${idx + 1}`;
              const label = `Point ${idx + 1}`;
              return (
                <comp.ControllerInput
                  key={name}
                  {...f.textArea({ control, name, label })}
                  {...getInputErr(errors, name)}
                  value={formData[name] ?? item?.s3?.[0]?.list?.[idx]}
                  onChange={(e: InputOnChangeSchema) =>
                    handleFormChange(e, name, type)
                  }
                  height="min-h-[100px]"
                />
              );
            }
          )}
        </comp.ColoredDivSection>
      </comp.ColoredDivSection>

      {/* Second point  */}
      <comp.ColoredDivSection title="Second point" {...pointDivProps}>
        <comp.ControllerInput
          {...f.title({
            control,
            name: "s3_title2",
            label: "Heading",
          })}
          {...getInputErr(errors, "s3_title2")}
          value={formData?.s3_title2 ?? s3_title2}
          onChange={(e: InputOnChangeSchema) =>
            handleFormChange(e, "s3_title2", type)
          }
        />
        <comp.ControllerInput
          {...f.description({ control, name: "s3_description2" })}
          {...getInputErr(errors, "s3_description2")}
          value={formData?.s3_description2 ?? s3_description2}
          onChange={(e: InputOnChangeSchema) =>
            handleFormChange(e, "s3_description2", type)
          }
        />

        <comp.ColoredDivSection title="List" {...innerPointProps}>
          {Array?.from({ length: 6 }, (_, index: number) => index)?.map(
            (idx: number) => {
              const name = `s3_list2_point_${idx + 1}`;
              const label = `Point ${idx + 1}`;
              return (
                <comp.ControllerInput
                  key={name}
                  {...f.textArea({ control, name, label })}
                  {...getInputErr(errors, name)}
                  height="min-h-[100px]"
                  value={formData[name] ?? item?.s3?.[1]?.list?.[idx]}
                  onChange={(e: InputOnChangeSchema) =>
                    handleFormChange(e, name, type)
                  }
                />
              );
            }
          )}
        </comp.ColoredDivSection>
      </comp.ColoredDivSection>
    </>,
  ];

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

  // Handle errors on toast
  useEffect(() => {
    const errorValues: any = Object?.values(errors);
    if (errorValues?.length > 0) {
      setToast(t.TOAST_ERROR(errorValues[0]?.message));
    }
  }, [errors]);

  return (
    <comp.StaticPageForm {...staticPageProps}>
      <div className="col-span-12 flex flex-col gap-4">
        {/* {Array.from({ length: formInputs?.length }, (_, idx) => ( */}
        {Array.from({ length: 2 }, (_, idx) => (
          //  {/* Section ${idx} */}
          <Accordion
            key={idx}
            open={open === idx + 1}
            className="mb-2 border bg-white px-4 font-poppins rounded-none shadow-md"
            icon={
              <BiChevronUp
                className={`${
                  idx === open ? "rotate-180" : ""
                } w-7 h-7 transition-transform`}
              />
            }
          >
            <AccordionHeader
              onClick={() => handleOpen(idx + 1)}
              className={`border-b-0 transition-colors ${
                open === idx + 1
                  ? "text-brand-yellow-500 hover:!text-brand-yellow-700"
                  : ""
              } text-md font-poppins px-0 py-2`}
            >
              {/* Section {idx + 1} */}
              {formData?.s1_title1 ?? titles?.[idx]}
            </AccordionHeader>
            <AccordionBody className="pt-1 text-base font-normal flex flex-col gap-8 pb-6 font-poppins">
              {formInputs[idx]}
            </AccordionBody>
          </Accordion>
        ))}
      </div>
    </comp.StaticPageForm>
  );
};

export default WhyUsPage;
