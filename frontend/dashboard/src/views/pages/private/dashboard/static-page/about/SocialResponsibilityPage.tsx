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
import { ToastContext } from "@/helpers/contexts";
import * as hooks from "@/helpers/hooks";
import { useStaticPageApi, useStaticPageStore } from "@/helpers/stores";

// Import - utils
import * as f from "@/utils/constants/form-constants";
import * as t from "@/utils/constants/toast-constants";
import {
  getSocialRespPageFormData,
  getSocialRespPageItemData,
} from "@/utils/constants/dashboard/about-constants";
import { CRUD_ROUTES } from "@/utils/data/api/api-routes";
import { getApiSuccessMsg, getApiErrorMsg } from "@/utils/methods/api-methods";
import { getInputErr } from "@/utils/methods/form-methods";
import { InputOnChangeSchema } from "@/utils/schemas/GlobalSchema";
import { SocialRespValidation } from "@/utils/validations/formValidation";

// Main
// const SocialResponsibilityPage = () => {
//   // Ref
//   const isAlreadyLoadedRef = useRef(false);
//
//   // State
//   const [open, setOpen] = useState(1);
//   const [imgHidden, setImgHidden] = useState(false);
//
//   // Context
//   const { setToast } = useContext(ToastContext);
//
//   // Stores
//   // const api = useBlogApi();
//   const api = useStaticPageApi();
//   const store = useStaticPageStore();
//
//   // Action whent the accordion is clicked
//   const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
//
//   // Hooks
//   const {
//     control,
//     handleSubmit,
//     watch,
//     formState: { errors },
//     ...rest
//   } = useForm({
//     resolver: yupResolver(SocialRespValidation),
//     mode: "onChange",
//   });
//   const isOnline = hooks.useInternetOnline();
//   const { isLessThan600 } = hooks.useScreenSize();
//
//   // Variables
//   const { getAllData, getAllIsRefetchError } = api;
//   const m = {
//     store,
//     rest,
//     watch,
//     isLessThan600,
//     imgHidden,
//     setImgHidden,
//   };
//   const {
//     // Text data
//     allSections,
//
//     // Custom props
//     innerPointProps,
//
//     // Other needed data
//     id,
//     isFormActionDisabled,
//     item,
//     setForm,
//     formData,
//     clearFormValues,
//     type,
//     page,
//     handleFormChange,
//     stickyHeaderProps,
//     pageLength,
//   } = getSocialRespPageItemData(m);
//
//   // Mutation
//   const updateMutationParams = {
//     method: "put",
//     route: CRUD_ROUTES({
//       id,
//       model: "static_page",
//       params: `?q=${page?.query}`,
//     }).update,
//     onSuccess: (response: any) => {
//       api.getAllRefetch();
//       setToast(t.TOAST_SUCCESS(getApiSuccessMsg(response)));
//       setForm({ type, isLoading: false, isOpen: false });
//       // clearFormValues();
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
//   const updateMutation = hooks.useCustomMutation(updateMutationParams);
//
//   // Action when the form is submitted
//   const onSubmit = (data: any) => {
//     // If there is no internet, throw offline internet error
//     if (!isOnline) {
//       setToast(t.NO_INTERNET_ERROR);
//       return;
//     }
//
//     // Prettify form data to send to the backend
//     const modifiedData = getSocialRespPageFormData(data, item); // get the correct data pattern here
//
//     const formData = {
//       [page?.name]: { ...modifiedData },
//     };
//
//     // Api part
//     setForm({ type, isLoading: true });
//     updateMutation.mutate(formData);
//   };
//
//   // Refetch the statuc page section
//   useEffect(() => {
//     isAlreadyLoadedRef.current = true;
//
//     // Handle in case there is no data in refetch
//     if (getAllIsRefetchError) {
//       setForm({ type, api: [] });
//     } else {
//       setForm({ type, api: getAllData });
//     }
//     clearFormValues();
//   }, [getAllIsRefetchError, getAllData]);
//
//   // Set the initial values of the react hook form inputs
//   // Since the data is empty at first before api call, will need to wait for the api first
//   // useEffect(() => {
//   //   if (imgHidden) {
//   //     clearFormValues();
//   //   }
//   // }, [imgHidden]);
//
//   // useEffect(() => {
//   //   clearFormValues();
//   // }, []);
//
//   // Custom props for static page
//   const staticPageProps = {
//     onSubmit: handleSubmit(onSubmit),
//     item,
//     stickyHeaderProps,
//   };
//
//   // Custom props including imgHidden
//   const newRest = { ...rest, imgHidden: isFormActionDisabled };
//
//   // Handle errors on toast
//   useEffect(() => {
//     const errorValues: any = Object?.values(errors);
//     if (errorValues?.length > 0) {
//       setToast(t.TOAST_ERROR(errorValues[0]?.message));
//     }
//   }, [errors]);
//
//   const [sections, setSections] = useState<any[]>([]);
//
// // Sync with initial data
//   useEffect(() => {
//     setSections(prev => {
//       const stringifiedPrev = JSON.stringify(prev);
//       const stringifiedNew = JSON.stringify(allSections);
//       return stringifiedPrev !== stringifiedNew ? allSections : prev;
//     });
//   }, [allSections]);
//
//   const addSection = () => {
//     setSections(prev => [
//       ...prev,
//       { title: "", image: "", nestedList: { title: "", list: [""] } },
//     ]);
//   };
//
//   const removeSection = (index: number) => {
//     setSections(prev => prev.filter((_, i) => i !== index));
//
//   };
//
//   return (
//     <comp.StaticPageForm {...staticPageProps}>
//       <div className="col-span-12 flex flex-col gap-4">
//         {sections.map((section, idx) => {
//           const sectionIndex = idx + 1;
//           const parentTitleName = `s${sectionIndex}_title${sectionIndex}`;
//           const parentImageName = `s${sectionIndex}_image1`;
//           const parentListTitleName = `s${sectionIndex}_list${sectionIndex}_title_1`;
//           const listChildName = `s${sectionIndex}_list${sectionIndex}`;
//           const childList = section?.nestedList?.list || [];
//
//           return (
//             <Accordion
//               key={idx}
//               open={open === sectionIndex}
//               className="mb-2 border bg-white px-4 font-poppins rounded-none shadow-md"
//               icon={
//                 <BiChevronUp
//                   className={`${
//                     open === sectionIndex ? "rotate-180" : ""
//                   } w-7 h-7 transition-transform`}
//                 />
//               }
//             >
//               <AccordionHeader
//                 onClick={() => handleOpen(sectionIndex)}
//                 className={`border-b-0 transition-colors ${
//                   open === sectionIndex
//                     ? "text-brand-yellow-500 hover:!text-brand-yellow-700"
//                     : ""
//                 } text-md font-poppins px-0 py-2`}
//               >
//                 {formData[parentTitleName] ||
//                   section?.title ||
//                   `Section ${sectionIndex}`}
//               </AccordionHeader>
//
//               <AccordionBody className="pt-1 text-base font-normal flex flex-col gap-8 pb-6 font-poppins">
//                 {/* Title Input */}
//                 <comp.ControllerInput
//                   {...f.title({
//                     control,
//                     name: parentTitleName,
//                     label: "Heading",
//                   })}
//                   {...getInputErr(errors, parentTitleName)}
//                   value={formData[parentTitleName] || section?.title}
//                   onChange={(e: InputOnChangeSchema) =>
//                     handleFormChange(e, parentTitleName, type)
//                   }
//                 />
//
//                 {/* Image Input */}
//                 <comp.ControllerInput
//                   {...newRest}
//                   {...f.imageInput({
//                     control,
//                     isCaption: true,
//                     label: "Display Picture",
//                     name: parentImageName,
//                     ...getInputErr(errors, parentImageName),
//                   })}
//                   singleImage={<comp.ThumbnailImage src={section?.image} />}
//                 />
//
//                 {/* List Section */}
//                 <comp.ColoredDivSection title="List" {...innerPointProps}>
//                   {/* List Title */}
//                   <comp.ControllerInput
//                     {...f.title({
//                       control,
//                       name: parentListTitleName,
//                       label: "Sub Title",
//                     })}
//                     {...getInputErr(errors, parentListTitleName)}
//                     value={formData[parentListTitleName] || section?.nestedList?.title}
//                     onChange={(e: InputOnChangeSchema) =>
//                       handleFormChange(e, parentListTitleName, type)
//                     }
//                   />
//
//                   {/* List Items */}
//                   {childList.map((desc: string, descIndex: number) => {
//                     const descName = `${listChildName}_list_${descIndex + 1}`;
//                     return (
//                       <div key={descIndex} className="relative">
//                         <comp.ControllerInput
//                           {...f.textArea({
//                             control,
//                             name: descName,
//                             label: `Description ${descIndex + 1}`,
//                           })}
//                           {...getInputErr(errors, descName)}
//                           value={formData[descName] || desc}
//                           onChange={(e: InputOnChangeSchema) =>
//                             handleFormChange(e, descName, type)
//                           }
//                         />
//                         {/* Remove description button */}
//                         {childList.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => {
//                               const updatedSections = [...sections];
//                               updatedSections[idx].nestedList.list.splice(descIndex, 1);
//                               setSections(updatedSections);
//                             }}
//                             className="absolute top-1 right-1 text-red-600"
//                           >
//                             Remove
//                           </button>
//                         )}
//                       </div>
//                     );
//                   })}
//
//                   {/* Add Description Button */}
//                   <button
//                     type="button"
//                     className="text-blue-500 mt-2"
//                     onClick={() => {
//                       const updatedSections = [...sections];
//                       updatedSections[idx].nestedList.list.push("");
//                       setSections(updatedSections);
//                     }}
//                   >
//                     + Add Description
//                   </button>
//                 </comp.ColoredDivSection>
//
//                 {/* Remove Section Button */}
//                 {sections.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removeSection(idx)}
//                     className="text-red-500 border border-red-500 rounded px-3 py-1 w-fit"
//                   >
//                     Remove Section
//                   </button>
//                 )}
//               </AccordionBody>
//             </Accordion>
//           );
//         })}
//
//         {/* Add Section Button */}
//         <button
//           type="button"
//           className="text-green-600 border border-green-600 rounded px-4 py-2 w-fit self-center"
//           onClick={addSection}
//         >
//           + Add Section
//         </button>
//       </div>
//     </comp.StaticPageForm>
//   );
// };

const SocialResponsibilityPage = () => {
  // Ref
  const isAlreadyLoadedRef = useRef(false);

  // State
  const [open, setOpen] = useState(1);
  const [imgHidden, setImgHidden] = useState(false);
  const [sections, setSections] = useState<any[]>([]);
  const [sectionsInitialized, setSectionsInitialized] = useState(false);

  // Context
  const { setToast } = useContext(ToastContext);

  // Stores
  const api = useStaticPageApi();
  const store = useStaticPageStore();

  // Action when the accordion is clicked
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  // Hooks
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    ...rest
  } = useForm({
    resolver: yupResolver(SocialRespValidation),
    mode: "onChange",
  });
  const isOnline = hooks.useInternetOnline();
  const { isLessThan600 } = hooks.useScreenSize();

  // Variables
  const { getAllData, getAllIsRefetchError } = api;
  const m = {
    store,
    rest: { ...rest, setValue },
    watch,
    isLessThan600,
    imgHidden,
    setImgHidden,
  };
  const {
    // Text data
    allSections,

    // Custom props
    innerPointProps,

    // Other needed data
    id,
    isFormActionDisabled,
    item,
    setForm,
    formData,
    clearFormValues,
    type,
    page,
    handleFormChange,
    stickyHeaderProps,
    pageLength,
  } = getSocialRespPageItemData(m);

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
  const updateMutation = hooks.useCustomMutation(updateMutationParams);

  // Action when the form is submitted
  const onSubmit = (data: any) => {
    // If there is no internet, throw offline internet error
    if (!isOnline) {
      setToast(t.NO_INTERNET_ERROR);
      return;
    }

    // Prettify form data to send to the backend
    const modifiedData = getSocialRespPageFormData(data, item, sections); // Updated to include sections

    const formData = {
      [page?.name]: { ...modifiedData },
    };

    // Api part
    setForm({ type, isLoading: true });
    updateMutation.mutate(formData);
  };

  // Refetch the static page section
  useEffect(() => {
    isAlreadyLoadedRef.current = true;

    // Handle in case there is no data in refetch
    if (getAllIsRefetchError) {
      setForm({ type, api: [] });
    } else {
      setForm({ type, api: getAllData });
    }

    // Reset sections initialization when data is refetched
    setSectionsInitialized(false);
    clearFormValues();
  }, [getAllIsRefetchError, getAllData]);

  // Sync sections with initial data
  useEffect(() => {
    if (!sectionsInitialized && allSections && allSections.length > 0) {
      const stringifiedCurrent = JSON.stringify(sections);
      const stringifiedAll = JSON.stringify(allSections);

      if (stringifiedCurrent !== stringifiedAll) {
        // Set form values for all sections when data changes
        setTimeout(() => {
          allSections.forEach((section: any, index: number) => {
            setSectionFormValues(section, index);
          });
        }, 100);

        // Add preview field to existing sections if not present
        const sectionsWithPreview = allSections.map((section: any) => ({
          ...section,
          preview: section.preview || null
        }));

        setSections(sectionsWithPreview); // ✅ Set sections
      }

      setSectionsInitialized(true); // ✅ Move this outside
    } else if (!sectionsInitialized && sections.length === 0) {
      const defaultSection = {
        title: "",
        image: "",
        preview: null,
        nestedList: { title: "", list: [""] }
      };
      setSections([defaultSection]);
      setSectionsInitialized(true);
    }
  }, [allSections, sections, sectionsInitialized]);

  // Debug logging (remove in production)
  useEffect(() => {
    console.log('Sections updated:', sections);
  }, [sections]);

  // Helper function to clear form values for a section
  const clearSectionFormValues = (sectionIndex: number) => {
    const sectionNum = sectionIndex + 1;
    setValue(`s${sectionNum}_title${sectionNum}` as any, "");
    setValue(`s${sectionNum}_image1` as any, "");
    setValue(`s${sectionNum}_list${sectionNum}_title_1` as any, "");

    // Clear all list items for this section
    for (let i = 1; i <= 20; i++) { // Increased limit for list items
      setValue(`s${sectionNum}_list${sectionNum}_list_${i}` as any, "");
    }
  };

  // Helper function to set form values for a section
  const setSectionFormValues = (section: any, sectionIndex: number) => {
    const sectionNum = sectionIndex + 1;
    setValue(`s${sectionNum}_title${sectionNum}` as any, section.title || "");
    setValue(`s${sectionNum}_image1` as any, section.image || "");
    setValue(`s${sectionNum}_list${sectionNum}_title_1` as any, section.nestedList?.title || "");

    // Clear existing list items first
    for (let i = 1; i <= 20; i++) {
      setValue(`s${sectionNum}_list${sectionNum}_list_${i}` as any, "");
    }

    // Set list items
    if (section.nestedList?.list && Array.isArray(section.nestedList.list)) {
      section.nestedList.list.forEach((item: string, idx: number) => {
        setValue(`s${sectionNum}_list${sectionNum}_list_${idx + 1}` as any, item || "");
      });
    }
  };

  const addSection = () => {
    const newSection = {
      title: "",
      image: "",
      preview: null,
      nestedList: { title: "", list: [""] }
    };

    setSections(prev => {
      const newSections = [...prev, newSection];

      // Set form values for the new section immediately
      const newSectionIndex = newSections.length - 1;
      setSectionFormValues(newSection, newSectionIndex);

      // Open the newly added section
      setOpen(newSections.length);

      return newSections;
    });
  };

  const removeSection = (index: number) => {
    if (sections.length <= 1) {
      // Don't allow removing the last section
      return;
    }

    setSections(prev => {
      const newSections = prev.filter((_, i) => i !== index);

      // Clear form values for all sections and reset them
      setTimeout(() => {
        // Clear all form values first
        for (let i = 0; i < prev.length; i++) {
          clearSectionFormValues(i);
        }

        // Reset form values for remaining sections with correct indexing
        newSections.forEach((section, idx) => {
          setSectionFormValues(section, idx);

          const sectionNum = idx + 1;
          handleFormChange(
            { target: { value: section.title } },
            `s${sectionNum}_title${sectionNum}`,
            type
          );
          handleFormChange(
            { target: { value: section.nestedList?.title } },
            `s${sectionNum}_list${sectionNum}_title_1`,
            type
          );
          section.nestedList?.list?.forEach((val: string, i: number) => {
            handleFormChange(
              { target: { value: val } },
              `s${sectionNum}_list${sectionNum}_list_${i + 1}`,
              type
            );
          });
        });

        if (open > newSections.length) {
          setOpen(newSections.length > 0 ? 1 : 0);
        } else if (open === index + 1 && newSections.length > 0) {
          setOpen(1);
        }
      }, 0);

      return newSections;
    });
  };

  const updateSectionInState = (index: number, field: string, value: any) => {
    setSections(prev => {
      const newSections = [...prev];

      // Ensure the section exists
      if (!newSections[index]) {
        return prev;
      }

      if (field.includes('_list_')) {
        // Handle nested list item updates
        const listIndex = parseInt(field.split('_list_')[1]) - 1;
        if (!newSections[index].nestedList) {
          newSections[index].nestedList = { title: "", list: [] };
        }
        if (!newSections[index].nestedList.list) {
          newSections[index].nestedList.list = [];
        }

        // Ensure array is large enough
        while (newSections[index].nestedList.list.length <= listIndex) {
          newSections[index].nestedList.list.push("");
        }

        newSections[index].nestedList.list[listIndex] = value;
      } else if (field.includes('_title_1')) {
        // Handle list title updates
        if (!newSections[index].nestedList) {
          newSections[index].nestedList = { title: "", list: [] };
        }
        newSections[index].nestedList.title = value;
      } else if (field.includes('_title')) {
        // Handle section title updates
        newSections[index].title = value;
      } else if (field.includes('_image')) {
        // Handle image updates with preview
        if (value instanceof File) {
          const preview = URL.createObjectURL(value);
          newSections[index].image = value;
          newSections[index].preview = preview;
        } else {
          newSections[index].image = value;
          newSections[index].preview = value;
        }
      }
      return newSections;
    });
  };

  const addListItem = (sectionIndex: number) => {
    setSections(prev => {
      const newSections = [...prev];

      // Ensure the section and nestedList exist
      if (!newSections[sectionIndex]) {
        return prev;
      }

      if (!newSections[sectionIndex].nestedList) {
        newSections[sectionIndex].nestedList = { title: "", list: [] };
      }

      if (!newSections[sectionIndex].nestedList.list) {
        newSections[sectionIndex].nestedList.list = [];
      }

      newSections[sectionIndex].nestedList.list.push("");

      // Set form value for the new list item
      const sectionNum = sectionIndex + 1;
      const listIndex = newSections[sectionIndex].nestedList.list.length;
      setValue(`s${sectionNum}_list${sectionNum}_list_${listIndex}` as any, "");

      return newSections;
    });
  };

  const removeListItem = (sectionIndex: number, listIndex: number) => {
    setSections(prev => {
      const newSections = [...prev];

      // Ensure the section exists and has a nested list
      if (!newSections[sectionIndex] || !newSections[sectionIndex].nestedList?.list) {
        return prev;
      }

      // Don't allow removing the last list item
      if (newSections[sectionIndex].nestedList.list.length <= 1) {
        return prev;
      }

      newSections[sectionIndex].nestedList.list.splice(listIndex, 1);

      // Update form values - clear all and reset
      const sectionNum = sectionIndex + 1;
      const listItems = newSections[sectionIndex].nestedList.list;

      // Clear all list form values for this section
      for (let i = 1; i <= 20; i++) {
        setValue(`s${sectionNum}_list${sectionNum}_list_${i}` as any, "");
      }

      // Set the remaining list items
      listItems.forEach((item: string, idx: number) => {
        setValue(`s${sectionNum}_list${sectionNum}_list_${idx + 1}` as any, item || "");
      });

      return newSections;
    });
  };

  // Custom props for static page
  const staticPageProps = {
    onSubmit: handleSubmit(onSubmit),
    item,
    stickyHeaderProps,
  };

  // FIXED: Include setValue in newRest to fix the image input error
  const newRest = {
    ...rest,
    setValue, // Add setValue here
    imgHidden: isFormActionDisabled
  };

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
        {sections.map((section, idx) => {
          const sectionIndex = idx + 1;
          const parentTitleName = `s${sectionIndex}_title${sectionIndex}`;
          const parentImageName = `s${sectionIndex}_image1`;
          const parentListTitleName = `s${sectionIndex}_list${sectionIndex}_title_1`;
          const listChildName = `s${sectionIndex}_list${sectionIndex}`;
          const childList = section?.nestedList?.list || [];

          return (
            <Accordion
              key={`section-${idx}`}
              open={open === sectionIndex}
              className="mb-2 border bg-white px-4 font-poppins rounded-none shadow-md"
              icon={
                <BiChevronUp
                  className={`${
                    open === sectionIndex ? "rotate-180" : ""
                  } w-7 h-7 transition-transform`}
                />
              }
            >
              <AccordionHeader
                onClick={() => handleOpen(sectionIndex)}
                className={`border-b-0 transition-colors ${
                  open === sectionIndex
                    ? "text-brand-yellow-500 hover:!text-brand-yellow-700"
                    : ""
                } text-md font-poppins px-0 py-2`}
              >
                {formData[parentTitleName] ||
                  section?.title ||
                  `Section ${sectionIndex}`}
              </AccordionHeader>

              <AccordionBody className="pt-1 text-base font-normal flex flex-col gap-8 pb-6 font-poppins">
                {/* Title Input */}
                <comp.ControllerInput
                  {...f.title({
                    control,
                    name: parentTitleName,
                    label: "Heading",
                  })}
                  {...getInputErr(errors, parentTitleName)}
                  value={formData[parentTitleName] || section?.title}
                  onChange={(e: InputOnChangeSchema) => {
                    handleFormChange(e, parentTitleName, type);
                    updateSectionInState(idx, parentTitleName, e.target.value);
                  }}
                />

                {/* Image Input - FIXED */}
                <comp.ControllerInput
                  {...newRest}
                  {...f.imageInput({
                    control,
                    isCaption: true,
                    label: "Display Picture",
                    name: parentImageName,
                    ...getInputErr(errors, parentImageName),
                  })}
                  onChange={(e: any) => {
                    const file = e.target?.files?.[0];
                    if (file) {
                      // Create array format that validation expects
                      const fileArray = [file];

                      // Handle form change with file array
                      handleFormChange({ target: { value: fileArray } }, parentImageName, type);
                      // Update section state with single file for preview
                      updateSectionInState(idx, parentImageName, file);
                      // Update form value with array format for validation
                      setTimeout(() => {
                        setValue(parentImageName as any, fileArray);
                      }, 0);
                    }
                  }}
                  singleImage={
                    (section?.preview || section?.image) ? (
                      <comp.ThumbnailImage
                        src={section.preview || section.image || ""}
                      />
                    ) : null
                  }
                />

                {/* List Section */}
                <comp.ColoredDivSection title="List" {...innerPointProps}>
                  {/* List Title */}
                  <comp.ControllerInput
                    {...f.title({
                      control,
                      name: parentListTitleName,
                      label: "Sub Title",
                    })}
                    {...getInputErr(errors, parentListTitleName)}
                    value={formData[parentListTitleName] || section?.nestedList?.title}
                    onChange={(e: InputOnChangeSchema) => {
                      handleFormChange(e, parentListTitleName, type);
                      updateSectionInState(idx, parentListTitleName, e.target.value);
                    }}
                  />

                  {/* List Items */}
                  {childList.map((desc: string, descIndex: number) => {
                    const descName = `${listChildName}_list_${descIndex + 1}`;
                    return (
                      <div key={`list-item-${idx}-${descIndex}`} className="relative">
                        <comp.ControllerInput
                          {...f.textArea({
                            control,
                            name: descName,
                            label: `Description ${descIndex + 1}`,
                          })}
                          {...getInputErr(errors, descName)}
                          value={formData[descName] || desc}
                          onChange={(e: InputOnChangeSchema) => {
                            handleFormChange(e, descName, type);
                            updateSectionInState(idx, descName, e.target.value);
                          }}
                        />
                        {/* Remove description button */}
                        {childList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeListItem(idx, descIndex)}
                            className="absolute top-1 right-1 text-red-600 hover:text-red-800 px-2 py-1 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    );
                  })}

                  {/* Add Description Button */}
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700 mt-2 px-3 py-1 border border-blue-500 rounded"
                    onClick={() => addListItem(idx)}
                  >
                    + Add Description
                  </button>
                </comp.ColoredDivSection>

                {/* Remove Section Button */}
                <div className="flex justify-end mt-4">
                  {sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(idx)}
                      className="text-red-500 hover:text-red-700 border border-red-500 hover:border-red-700 rounded px-3 py-1 text-sm transition-colors"
                    >
                      Remove Section
                    </button>
                  )}
                </div>
              </AccordionBody>
            </Accordion>
          );
        })}

        {/* Add Section Button */}
        <button
          type="button"
          className="text-green-600 hover:text-green-800 border border-green-600 rounded px-4 py-2 w-fit self-center"
          onClick={addSection}
        >
          + Add Section
        </button>
      </div>
    </comp.StaticPageForm>
  );
};
export default SocialResponsibilityPage;

{/*{Array.from({ length: pageLength }, (_, idx) => {*/}
{/*  // Variables*/}
{/*  const parentTitleName = `s${idx + 1}_title${idx + 1}`;*/}
{/*  const parentTitleValue = allSections[idx]?.title;*/}
{/*  const parentImageName = `s${idx + 1}_image1`;*/}
{/*  const parentImageValue = allSections[idx]?.image;*/}
{/*  const parentListTitleName = `s${idx + 1}_list${idx + 1}_title_1`;*/}
{/*  const listChildName = `s${idx + 1}_list${idx + 1}`;*/}
{/*  const listValue = allSections[idx]?.nestedList;*/}

{/*  // Variables*/}
{/*  const [childTitle, childList]: any = Object?.values(listValue);*/}
{/*  const getListChildName = (index: number) =>*/}
{/*    `${listChildName}_list_${index}`;*/}

{/*  return (*/}
{/*    <Accordion*/}
{/*      key={idx}*/}
{/*      open={open === idx + 1}*/}
{/*      className="mb-2 border bg-white px-4 font-poppins rounded-none shadow-md"*/}
{/*      icon={*/}
{/*        <BiChevronUp*/}
{/*          className={`${*/}
{/*            open === idx + 1 ? "rotate-180" : ""*/}
{/*          } w-7 h-7 transition-transform`}*/}
{/*        />*/}
{/*      }*/}
{/*    >*/}
{/*      <AccordionHeader*/}
{/*        onClick={() => handleOpen(idx + 1)}*/}
{/*        className={`border-b-0 transition-colors ${*/}
{/*          open === idx + 1*/}
{/*            ? "text-brand-yellow-500 hover:!text-brand-yellow-700"*/}
{/*            : ""*/}
{/*        } text-md font-poppins px-0 py-2`}*/}
{/*      >*/}
{/*        {formData[parentTitleName] ||*/}
{/*          parentTitleValue ||*/}
{/*          `Section ${idx + 1}`}*/}
{/*      </AccordionHeader>*/}
{/*      <AccordionBody className="pt-1 text-base font-normal flex flex-col gap-8 pb-6 font-poppins">*/}
{/*        /!* {formInputs[idx]} *!/*/}

{/*        <comp.ControllerInput*/}
{/*          {...f.title({*/}
{/*            control,*/}
{/*            name: parentTitleName,*/}
{/*            label: "Heading",*/}
{/*          })}*/}
{/*          {...getInputErr(errors, parentTitleName)}*/}
{/*          value={formData[parentTitleName] || parentTitleValue}*/}
{/*          onChange={(e: InputOnChangeSchema) =>*/}
{/*            handleFormChange(e, parentTitleName, type)*/}
{/*          }*/}
{/*        />*/}
{/*        <comp.ControllerInput*/}
{/*          {...newRest}*/}
{/*          {...f.imageInput({*/}
{/*            control,*/}
{/*            isCaption: true,*/}
{/*            label: "Display Picture",*/}
{/*            name: parentImageName,*/}
{/*            ...getInputErr(errors, parentImageName),*/}
{/*          })}*/}
{/*          singleImage={<comp.ThumbnailImage src={parentImageValue} />}*/}
{/*          // {...thumbnailImageInputProps}*/}
{/*        />*/}
{/*        <comp.ColoredDivSection title="List" {...innerPointProps}>*/}
{/*          <comp.ControllerInput*/}
{/*            {...f.title({*/}
{/*              control,*/}
{/*              name: parentListTitleName,*/}
{/*              label: "Sub Title",*/}
{/*            })}*/}
{/*            {...getInputErr(errors, childTitle)}*/}
{/*            value={formData[parentListTitleName] || childTitle}*/}
{/*            onChange={(e: InputOnChangeSchema) =>*/}
{/*              handleFormChange(e, parentListTitleName, type)*/}
{/*            }*/}
{/*          />*/}
{/*          {childList?.map((child: string, childIndex: number) => {*/}
{/*            return (*/}
{/*              <comp.ControllerInput*/}
{/*                key={childIndex}*/}
{/*                {...f.textArea({*/}
{/*                  control,*/}
{/*                  name: getListChildName(childIndex + 1),*/}
{/*                  label: `Description ${childIndex + 1}`,*/}
{/*                })}*/}
{/*                {...getInputErr(*/}
{/*                  errors,*/}
{/*                  getListChildName(childIndex + 1)*/}
{/*                )}*/}
{/*                value={*/}
{/*                  formData[getListChildName(childIndex + 1)] || child*/}
{/*                }*/}
{/*                onChange={(e: InputOnChangeSchema) =>*/}
{/*                  handleFormChange(*/}
{/*                    e,*/}
{/*                    getListChildName(childIndex + 1),*/}
{/*                    type*/}
{/*                  )*/}
{/*                }*/}
{/*              />*/}
{/*            );*/}
{/*          })}*/}
{/*        </comp.ColoredDivSection>*/}
{/*      </AccordionBody>*/}
{/*    </Accordion>*/}
{/*  );*/}
{/*})}*/}
