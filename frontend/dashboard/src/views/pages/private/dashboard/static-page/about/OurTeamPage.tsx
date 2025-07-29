// Import - default
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

// Import - helpers
import * as comp from "@/helpers/components";
import { ToastContext } from "@/helpers/contexts";
import * as hooks from "@/helpers/hooks";
import { useStaticPageApi, useStaticPageStore } from "@/helpers/stores";

// Import - utils
import * as f from "@/utils/constants/form-constants";
import * as t from "@/utils/constants/toast-constants";
import {
  generateModifiedTeams,
  getOurTeamPageFormData,
  getOurTeamPageItemData,
} from "@/utils/constants/dashboard/about-constants";
import { CRUD_ROUTES } from "@/utils/data/api/api-routes";
import { getApiSuccessMsg, getApiErrorMsg } from "@/utils/methods/api-methods";
import { getInputErr } from "@/utils/methods/form-methods";
import { InputOnChangeSchema } from "@/utils/schemas/GlobalSchema";
import { OurTeamValidation } from "@/utils/validations/formValidation";

// Main
// const OurTeamPage = () => {
//   // Ref
//   const isAlreadyLoadedRef = useRef(false);
//
//   // const isInitalFormAlreadySet = useRef(false);
//
//   // State
//   const [imgHidden, setImgHidden] = useState(false);
//   const [teamMembers, setTeamMembers] = useState<any[]>([]);
//   const [memberToRemove, setMemberToRemove] = useState<any | null>(null);
//
//   // Context
//   const { setToast } = useContext(ToastContext);
//
//   // Stores
//   // const api = useBlogApi();
//   const api = useStaticPageApi();
//   const store = useStaticPageStore();
//
//   // Hooks
//   const {
//     control,
//     handleSubmit,
//     watch,
//     formState: { errors },
//     ...rest
//   } = useForm({
//     resolver: yupResolver(OurTeamValidation),
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
//     id,
//     item,
//     setForm,
//     formData,
//     clearFormValues,
//     type,
//     page,
//     handleFormChange,
//     stickyHeaderProps,
//     isFormActionDisabled,
//   } = getOurTeamPageItemData(m);
//   const { modifiedTeamFounders } = generateModifiedTeams(
//     formData,
//     item
//   );
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
//       // navigate(0);
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
//     const { result: modifiedData, errors } = getOurTeamPageFormData(data, item);
//
//     // Check for empty image validation
//     if (errors?.length > 0) {
//       setToast(t.TOAST_ERROR(errors?.[0]));
//       return;
//     }
//
//     // Finally pass the data to the backend
//     const formData = { [page?.name]: { ...modifiedData } };
//
//     // Api part
//     setForm({ type, isLoading: true });
//     updateMutation.mutate(formData);
//   };
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
//   // Handle errors on toast
//   useEffect(() => {
//     const errorValues: any = Object?.values(errors);
//     if (errorValues?.length > 0) {
//       setToast(t.TOAST_ERROR(errorValues[0]?.message));
//     }
//   }, [errors]);
//
//   useEffect(() => {
//     if (item?.teamMembers?.length) {
//       const initialMembers = item.teamMembers.map((m: any, i: number) => ({
//         id: Date.now() + i,
//         name: m.name || "",
//         designation: m.designation || "",
//         image: m.image || "",
//         index: i + 1,
//       }));
//       setTeamMembers(initialMembers);
//     }
//   }, [item]);
//
//   const handleAddMember = () => {
//     setTeamMembers((prev) => [
//       ...prev,
//       {
//         id: Date.now(),
//         name: "",
//         designation: "",
//         image: "",
//         index: prev.length + 1,
//       },
//     ]);
//   };
//
//   const handleRemoveMember = (member: any) => {
//     setMemberToRemove(member); // Open modal by setting the member
//   };
//
//   return (
//     <comp.StaticPageForm {...staticPageProps}>
//       <div className="col-span-12 flex flex-col gap-4">
//         {/* Company */}
//         <comp.ColoredDivSection title="Company Team" status="secondary">
//           <comp.ControllerInput
//             {...f.title({
//               control,
//               name: "company_title",
//               label: "Title",
//             })}
//             {...getInputErr(errors, "company_title")}
//             value={formData["company_title"] ?? item?.company?.title}
//             onChange={(e: InputOnChangeSchema) =>
//               handleFormChange(e, "company_title", type)
//             }
//           />
//           <comp.ControllerInput
//             {...f.textArea({
//               control,
//               name: "company_description",
//               label: "Description",
//             })}
//             {...getInputErr(errors, "company_description")}
//             value={
//               formData["company_description"] ?? item?.company?.description
//             }
//             onChange={(e: InputOnChangeSchema) =>
//               handleFormChange(e, "company_description", type)
//             }
//           />
//         </comp.ColoredDivSection>
//
//         {/* Team founders */}
//         {modifiedTeamFounders?.map((founder: any, index: number) => {
//           const {
//             titleName,
//             titleValue,
//             imageName,
//             imageValue,
//             designationName,
//             designationValue,
//           } = founder;
//           return (
//             <div
//               key={index}
//               className="w-full flex flex-col md:flex-row gap-5 bg-brand-yellow-100 p-4 py-6 my-4"
//             >
//               <div className="basis-1/2 flex flex-col gap-5">
//                 <comp.ControllerInput
//                   {...f.title({
//                     control,
//                     name: titleName,
//                     label: "Founder",
//                   })}
//                   {...getInputErr(errors, titleName)}
//                   value={titleValue}
//                   onChange={(e: InputOnChangeSchema) =>
//                     handleFormChange(e, titleName, type)
//                   }
//                 />
//                 <comp.ControllerInput
//                   {...f.title({
//                     control,
//                     name: designationName,
//                     label: "Designation",
//                   })}
//                   {...getInputErr(errors, designationName)}
//                   value={designationValue}
//                   onChange={(e: InputOnChangeSchema) =>
//                     handleFormChange(e, designationName, type)
//                   }
//                 />
//               </div>
//               <div className="basis-1/2">
//                 <comp.ControllerInput
//                   {...f.imageInput({
//                     control,
//                     isCaption: true,
//                     label: "Profile Picture",
//                     name: imageName,
//                   })}
//                   {...getInputErr(errors, imageName)}
//                   onChange={(e: InputOnChangeSchema) =>
//                     handleFormChange(e, imageName, type)
//                   }
//                   singleImage={<comp.ThumbnailImage src={imageValue} />}
//                   {...newRest}
//                 />
//               </div>
//             </div>
//           );
//         })}
//
//         {/* Team members */}
//         {/*{modifiedTeamMembers?.map((member: any, index: number) => {*/}
//         {/*  const {*/}
//         {/*    titleName,*/}
//         {/*    titleValue,*/}
//         {/*    imageName,*/}
//         {/*    imageValue,*/}
//         {/*    designationName,*/}
//         {/*    designationValue,*/}
//         {/*  } = member;*/}
//         {/*  return (*/}
//         {/*    <div*/}
//         {/*      key={index}*/}
//         {/*      className="w-full flex flex-col md:flex-row gap-5 bg-gray-200 p-4 py-6 my-4"*/}
//         {/*    >*/}
//         {/*      <div className="basis-1/2 flex flex-col gap-5">*/}
//         {/*        <comp.ControllerInput*/}
//         {/*          {...f.title({*/}
//         {/*            control,*/}
//         {/*            name: titleName,*/}
//         {/*            label: "Team Member",*/}
//         {/*          })}*/}
//         {/*          {...getInputErr(errors, titleName)}*/}
//         {/*          value={titleValue}*/}
//         {/*          onChange={(e: InputOnChangeSchema) =>*/}
//         {/*            handleFormChange(e, titleName, type)*/}
//         {/*          }*/}
//         {/*        />*/}
//         {/*        <comp.ControllerInput*/}
//         {/*          {...f.title({*/}
//         {/*            control,*/}
//         {/*            name: designationName,*/}
//         {/*            label: "Designation",*/}
//         {/*          })}*/}
//         {/*          {...getInputErr(errors, designationName)}*/}
//         {/*          value={designationValue}*/}
//         {/*          onChange={(e: InputOnChangeSchema) =>*/}
//         {/*            handleFormChange(e, designationName, type)*/}
//         {/*          }*/}
//         {/*        />*/}
//         {/*      </div>*/}
//         {/*      <div className="basis-1/2">*/}
//         {/*        <comp.ControllerInput*/}
//         {/*          {...newRest}*/}
//         {/*          {...f.imageInput({*/}
//         {/*            control,*/}
//         {/*            isCaption: true,*/}
//         {/*            label: "Profile Picture",*/}
//         {/*            name: imageName,*/}
//         {/*            ...getInputErr(errors, imageName),*/}
//         {/*          })}*/}
//         {/*          onChange={(e: InputOnChangeSchema) =>*/}
//         {/*            handleFormChange(e, imageName, type)*/}
//         {/*          }*/}
//         {/*          singleImage={<comp.ThumbnailImage src={imageValue} />}*/}
//         {/*        />*/}
//         {/*      </div>*/}
//         {/*    </div>*/}
//         {/*  );*/}
//         {/*})}*/}
//
//         {teamMembers.map((member, idx) => {
//           const baseIndex = idx + 1;
//
//           return (
//             <div
//               key={member.id}
//               className="w-full flex flex-col md:flex-row gap-5 bg-gray-200 p-4 py-6 my-4 relative"
//             >
//               <div className="absolute top-2 right-2">
//                 <button
//                   type="button"
//                   className="bg-red-500 text-white rounded px-2 py-1 text-sm"
//                   onClick={() => handleRemoveMember(member)}
//                 >
//                   Remove
//                 </button>
//               </div>
//
//               <div className="basis-1/2 flex flex-col gap-5">
//                 <comp.ControllerInput
//                   {...f.title({
//                     control,
//                     name: `team_members_name_${baseIndex}`,
//                     label: "Team Member",
//                   })}
//                   value={formData[`team_members_name_${baseIndex}`] ?? member.name}
//                   onChange={(e: InputOnChangeSchema) =>
//                     handleFormChange(e, `team_members_name_${baseIndex}`, type)
//                   }
//                 />
//                 <comp.ControllerInput
//                   {...f.title({
//                     control,
//                     name: `team_members_designation_${baseIndex}`,
//                     label: "Designation",
//                   })}
//                   value={formData[`team_members_designation_${baseIndex}`] ?? member.designation}
//                   onChange={(e: InputOnChangeSchema) =>
//                     handleFormChange(e, `team_members_designation_${baseIndex}`, type)
//                   }
//                 />
//               </div>
//               <div className="basis-1/2">
//                 <comp.ControllerInput
//                   {...newRest}
//                   {...f.imageInput({
//                     control,
//                     isCaption: true,
//                     label: "Profile Picture",
//                     name: `team_members_image_${baseIndex}`,
//                   })}
//                   onChange={(e: InputOnChangeSchema) =>
//                     handleFormChange(e, `team_members_image_${baseIndex}`, type)
//                   }
//                   singleImage={<comp.ThumbnailImage src={member.image} />}
//                 />
//               </div>
//             </div>
//           );
//         })}
//
//         <div className="mt-4">
//           <button
//             type="button"
//             className="bg-brand-yellow-100 text-black px-4 py-2 rounded shadow"
//             onClick={handleAddMember}
//           >
//             + Add Member
//           </button>
//         </div>
//
//         {memberToRemove && (
//           <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded shadow-xl w-[90%] max-w-sm text-center">
//               <h2 className="text-xl font-bold mb-4">Remove Team Member</h2>
//               <p className="mb-6">
//                 Do you want to remove the member named:{" "}
//                 <span className="font-semibold">{memberToRemove.name}</span>?
//               </p>
//               <div className="flex justify-center gap-4">
//                 <button
//                   className="px-4 py-2 bg-gray-300 rounded"
//                   onClick={() => setMemberToRemove(null)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-red-500 text-white rounded"
//                   onClick={() => {
//                     setTeamMembers((prev) =>
//                       prev.filter((m) => m.id !== memberToRemove.id)
//                     );
//                     setMemberToRemove(null);
//                   }}
//                 >
//                   Yes, Remove
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//
//         {/* Team members */}
//       </div>
//     </comp.StaticPageForm>
//   );
// };

const OurTeamPage = () => {
  // Ref
  const isAlreadyLoadedRef = useRef(false);

  // State
  const [imgHidden, setImgHidden] = useState(false);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [memberToRemove, setMemberToRemove] = useState<any | null>(null);
  const [membersChanged, setMembersChanged] = useState(false); // Add this state

  // Context
  const { setToast } = useContext(ToastContext);

  // Stores
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
    resolver: yupResolver(OurTeamValidation),
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
    membersChanged, // Pass this to the helper function
  };
  const {
    id,
    item,
    setForm,
    formData,
    clearFormValues,
    type,
    page,
    handleFormChange,
    stickyHeaderProps,
    isFormActionDisabled,
  } = getOurTeamPageItemData(m);
  const { modifiedTeamFounders } = generateModifiedTeams(
    formData,
    item
  );

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
      setMembersChanged(false); // Reset the changed flag
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
  // const onSubmit = (data: any) => {
  //   // If there is no internet, throw offline internet error
  //   if (!isOnline) {
  //     setToast(t.NO_INTERNET_ERROR);
  //     return;
  //   }
  //
  //   // Prettify form data to send to the backend
  //   const { result: modifiedData, errors } = getOurTeamPageFormData(data, item);
  //
  //   // Include current team members data in the submission
  //   const teamMembersData = teamMembers
  //     .filter(member => member.name.trim() || member.designation.trim()) // Only include members with some data
  //     .map(member => ({
  //       name: member.name.trim(),
  //       designation: member.designation.trim(),
  //       image: member.image || "" // Keep existing image or empty string
  //     }));
  //
  //   // Update the modified data with current team members
  //   modifiedData.teamMembers = teamMembersData;
  //
  //   // Check for empty image validation
  //   if (errors?.length > 0) {
  //     setToast(t.TOAST_ERROR(errors?.[0]));
  //     return;
  //   }
  //
  //   // Finally pass the data to the backend
  //   const formData = { [page?.name]: { ...modifiedData } };
  //
  //   console.log(formData)
  //
  //   // Api part
  //   setForm({ type, isLoading: true });
  //   updateMutation.mutate(formData);
  // };

  const onSubmit = (data: any) => {
    if (!isOnline) {
      setToast(t.NO_INTERNET_ERROR);
      return;
    }

    const { result: modifiedData, errors } = getOurTeamPageFormData(data, item);

    const formData = new FormData();
    const teamMembersData: { name: any; designation: any; image: any; }[] = [];

    teamMembers.forEach((member, idx) => {
      const cleanMember = {
        name: member.name.trim(),
        designation: member.designation.trim(),
        image: member.image,
      };

      if (member.image instanceof File) {
        const key = `team_member_image_${member.id}`;
        formData.append(key, member.image);
        cleanMember.image = key;
      }

      teamMembersData.push(cleanMember);
    });

    // Assign teamMembers to formData payload
    modifiedData.teamMembers = teamMembersData;

    // Validate
    if (errors?.length > 0) {
      setToast(t.TOAST_ERROR(errors?.[0]));
      return;
    }

    // Final append
    formData.append(page?.name, JSON.stringify(modifiedData));

    setForm({ type, isLoading: true });
    updateMutation.mutate(formData);
  };


  // Custom props for static page
  const staticPageProps = {
    onSubmit: handleSubmit(onSubmit),
    item,
    stickyHeaderProps,
  };

  // Custom props including imgHidden
  const newRest = { ...rest, imgHidden: isFormActionDisabled };

  // Refetch the static page section
  useEffect(() => {
    isAlreadyLoadedRef.current = true;

    // Handle in case there is no data in refetch
    if (getAllIsRefetchError) {
      setForm({ type, api: [] });
    } else {
      setForm({ type, api: getAllData });
    }
    clearFormValues();
    setMembersChanged(false); // Reset changed flag when data is refetched
  }, [getAllIsRefetchError, getAllData]);

  // Handle errors on toast
  useEffect(() => {
    const errorValues: any = Object?.values(errors);
    if (errorValues?.length > 0) {
      setToast(t.TOAST_ERROR(errorValues[0]?.message));
    }
  }, [errors]);

  useEffect(() => {
    if (item?.teamMembers?.length) {
      const initialMembers = item.teamMembers.map((m: any, i: number) => ({
        id: Date.now() + i,
        name: m.name || "",
        designation: m.designation || "",
        image: m.image || "",
        index: i + 1,
      }));
      setTeamMembers(initialMembers);
      setMembersChanged(false); // Reset changed flag when initial data is set
    }
  }, [item]);

  const handleAddMember = () => {
    setTeamMembers((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        designation: "",
        image: "",
        index: prev.length + 1,
      },
    ]);
    setMembersChanged(true); // Mark as changed
  };

  const handleRemoveMember = (member: any) => {
    setMemberToRemove(member); // Open modal by setting the member
  };

  const confirmRemoveMember = () => {
    setTeamMembers((prev) =>
      prev.filter((m) => m.id !== memberToRemove.id)
    );
    setMemberToRemove(null);
    setMembersChanged(true); // Mark as changed
  };

  const handleMemberChange = (id: number, field: string, value: any) => {
    setTeamMembers((prev) =>
      prev.map((member) => {
        if (member.id === id) {
          if (field === 'image') {
            const preview = value instanceof File ? URL.createObjectURL(value) : value;
            return { ...member, [field]: value, preview: preview};
          }
          return { ...member, [field]: value };
        }
        return member;
      })
    );
    setMembersChanged(true);
  };


  return (
    <comp.StaticPageForm {...staticPageProps}>
      <div className="col-span-12 flex flex-col gap-4">
        {/* Company */}
        <comp.ColoredDivSection title="Company Team" status="secondary">
          <comp.ControllerInput
            {...f.title({
              control,
              name: "company_title",
              label: "Title",
            })}
            {...getInputErr(errors, "company_title")}
            value={formData["company_title"] ?? item?.company?.title}
            onChange={(e: InputOnChangeSchema) =>
              handleFormChange(e, "company_title", type)
            }
          />
          <comp.ControllerInput
            {...f.textArea({
              control,
              name: "company_description",
              label: "Description",
            })}
            {...getInputErr(errors, "company_description")}
            value={
              formData["company_description"] ?? item?.company?.description
            }
            onChange={(e: InputOnChangeSchema) =>
              handleFormChange(e, "company_description", type)
            }
          />
        </comp.ColoredDivSection>

        {/* Team founders */}
        {modifiedTeamFounders?.map((founder: any, index: number) => {
          const {
            titleName,
            titleValue,
            imageName,
            imageValue,
            designationName,
            designationValue,
          } = founder;
          return (
            <div
              key={index}
              className="w-full flex flex-col md:flex-row gap-5 bg-brand-yellow-100 p-4 py-6 my-4"
            >
              <div className="basis-1/2 flex flex-col gap-5">
                <comp.ControllerInput
                  {...f.title({
                    control,
                    name: titleName,
                    label: "Founder",
                  })}
                  {...getInputErr(errors, titleName)}
                  value={titleValue}
                  onChange={(e: InputOnChangeSchema) =>
                    handleFormChange(e, titleName, type)
                  }
                />
                <comp.ControllerInput
                  {...f.title({
                    control,
                    name: designationName,
                    label: "Designation",
                  })}
                  {...getInputErr(errors, designationName)}
                  value={designationValue}
                  onChange={(e: InputOnChangeSchema) =>
                    handleFormChange(e, designationName, type)
                  }
                />
              </div>
              <div className="basis-1/2">
                <comp.ControllerInput
                  {...f.imageInput({
                    control,
                    isCaption: true,
                    label: "Profile Picture",
                    name: imageName,
                  })}
                  {...getInputErr(errors, imageName)}
                  onChange={(e: InputOnChangeSchema) =>
                    handleFormChange(e, imageName, type)
                  }
                  singleImage={<comp.ThumbnailImage src={imageValue} />}
                  {...newRest}
                />
              </div>
            </div>
          );
        })}

        {/* Team members */}
        {teamMembers.map((member, idx) => {
          return (
            <div
              key={member.id}
              className="w-full flex flex-col md:flex-row gap-5 bg-gray-200 p-4 py-6 my-4 relative"
            >
              <div className="absolute top-2 right-2">
                <button
                  type="button"
                  className="bg-red-500 text-white rounded px-2 py-1 text-sm"
                  onClick={() => handleRemoveMember(member)}
                >
                  Remove
                </button>
              </div>

              <div className="basis-1/2 flex flex-col gap-5">
                <comp.ControllerInput
                  {...f.title({
                    control,
                    name: `team_member_name_${member.id}`,
                    label: "Team Member",
                  })}
                  value={member.name}
                  onChange={(e: InputOnChangeSchema) =>
                    handleMemberChange(member.id, 'name', e.target.value)
                  }
                />
                <comp.ControllerInput
                  {...f.title({
                    control,
                    name: `team_member_designation_${member.id}`,
                    label: "Designation",
                  })}
                  value={member.designation}
                  onChange={(e: InputOnChangeSchema) =>
                    handleMemberChange(member.id, 'designation', e.target.value)
                  }
                />
              </div>
              <div className="basis-1/2">
                <comp.ControllerInput
                  {...newRest}
                  {...f.imageInput({
                    control,
                    isCaption: true,
                    label: "Profile Picture",
                    name: `team_member_image_${member.id}`,
                  })}
                  onChange={(e: any) => {
                    const file = e.target?.files?.[0];
                    if (file) {
                      handleMemberChange(member.id, "image", file);
                    }
                  }}
                  singleImage={<comp.ThumbnailImage src={member.preview || member.image} />}
                />
              </div>
            </div>
          );
        })}

        <div className="mt-4">
          <button
            type="button"
            className="bg-brand-yellow-100 text-black px-4 py-2 rounded shadow"
            onClick={handleAddMember}
          >
            + Add Member
          </button>
        </div>

        {memberToRemove && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-xl w-[90%] max-w-sm text-center">
              <h2 className="text-xl font-bold mb-4">Remove Team Member</h2>
              <p className="mb-6">
                Do you want to remove the member named:{" "}
                <span className="font-semibold">{memberToRemove.name || 'Unnamed Member'}</span>?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setMemberToRemove(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={confirmRemoveMember}
                >
                  Yes, Remove
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </comp.StaticPageForm>
  );
};
export default OurTeamPage;
