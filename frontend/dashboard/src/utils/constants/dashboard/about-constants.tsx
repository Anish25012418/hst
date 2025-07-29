// Import - utils
import { generateDefaultRefs, getWebUrl } from "@/utils/methods/app-methods";
import { changeFileNameForImage } from "@/utils/methods/image-methods";
import { isNullObject, safeParseJSON } from "@/utils/methods/object-methods";
import { numberToWords } from "@/utils/methods/string-methods";
import {
  ListPointsSchema,
  OurTeamTransfomedFormSchema,
} from "@/utils/schemas/PageSchema";

// In case an array of string is needed
export const getListOfStringPoints = (
  points: ListPointsSchema,
  organizedLists: any
) => {
  for (const key in points) {
    if (points.hasOwnProperty(key)) {
      const keyArray = key.split("_");
      const listIdentifier: any = `${keyArray[0]}_${keyArray[1]}`;
      if (organizedLists[listIdentifier]) {
        organizedLists[listIdentifier].push(points[key]);
      }
    }
  }
  return organizedLists;
};

// In case an array of object {title:"", list:string[]} is needed
export const createTitleListObj = (title: string, listItems: string[]) => {
  return {
    title,
    list: listItems.filter((item) => item !== undefined && item !== null),
  };
};

export const getNewTitleDescList = (rest: any, selectedItem: any) => {
  const gatherListItems = (prefix: string) => {
    const listItems: string[] = [];
    let i = 1;
    // while (rest[`${prefix}_list_${i}`]) {
    while (i <= rest[prefix]?.list?.length) {
      const result = rest[`${prefix}_list_${i}`] || rest[prefix]?.list?.[i - 1];
      // console.log("rest[prefix]?.list?.[i - 1]", rest[prefix]?.list?.[i - 1]);
      listItems.push(result);
      i++;
    }
    return listItems;
  };
  const s1_list1 = createTitleListObj(
    rest.s1_list1_title_1 || selectedItem?.s1?.title,
    gatherListItems("s1_list1")
  );
  const s2_list1 = createTitleListObj(
    rest.s2_list1_title_1 || selectedItem?.s2?.title,
    gatherListItems("s2_list1")
  );
  const s3_list1 = createTitleListObj(
    rest.s3_list1_title_1 || selectedItem?.s3?.title,
    gatherListItems("s3_list1")
  );
  const s4_list1 = createTitleListObj(
    rest.s4_list1_title_1 || selectedItem?.s4?.title,
    gatherListItems("s4_list1")
  );
  const s5_list1 = createTitleListObj(
    rest.s5_list1_title_1 || selectedItem?.s5?.title,
    gatherListItems("s5_list1")
  );
  const s6_list1 = createTitleListObj(
    rest.s6_list1_title_1 || selectedItem?.s6?.title,
    gatherListItems("s6_list1")
  );

  return { s1_list1, s2_list1, s3_list1, s4_list1, s5_list1, s6_list1 };
};

// Convert Why-Us Page form data
export const getWhyUsPageFormData = (data: any, selectedItem: any) => {
  // Params
  const {
    s1_title1,
    s1_description1,
    s2_title1,
    s2_description1,
    s2_title2,
    s2_description2,
    s2_title3,
    s2_description3,
    s3_title1,
    s3_title2,
    s3_description2,
    imageGalleryPic: imageGalleryPicTemp,
    ...rest
  } = data;

  // Variables
  const { s3_list1, s3_list2 } = getListOfStringPoints(rest, {
    s3_list1: [],
    s3_list2: [],
  });

  // Final form data
  const formData = {
    s1: [
      {
        title: s1_title1 ?? selectedItem?.s1_title1,
        description: s1_description1 ?? selectedItem?.s1_title1,
      },
    ],
    s2: [
      {
        title: s2_title1 ?? selectedItem?.s2_title1,
        description: s2_description1 ?? selectedItem?.s2_description1,
      },
      {
        title: s2_title2 ?? selectedItem?.s2_title2,
        description: s2_description2 ?? selectedItem?.s2_description2,
      },
      {
        title: s2_title3 ?? selectedItem?.s2_title3,
        description: s2_description3 ?? selectedItem?.s2_description3,
      },
    ],
    s3: [
      {
        title: s3_title1 ?? selectedItem?.s3_title1,
        list: s3_list1 ?? selectedItem?.s3_list1,
      },
      {
        title: s3_title2,
        description: s3_description2 ?? selectedItem?.s3_description2,
        list: s3_list2 ?? selectedItem?.s3_list2,
      },
    ],
  };

  return formData;
};

////////////////////////////////////////
////////////////////////////////////////
// About page - Why Us Page
////////////////////////////////////////
////////////////////////////////////////
export const getWhyUsPageItemData = (params: any) => {
  // Destructuring params
  const { store, rest, isLessThan600, imgHidden, setImgHidden } = params;
  const { forms, handleFormChange, setForm } = store;
  const { api: apiData, formData, isLoading } = forms.get ?? {};
  const { whyUsPage = {}, _id: id, imageGalleryPic } = apiData?.data?.[0] || {};

  // Initial setup
  const type = "get";
  const page = { name: "whyUsPage", query: "why_us" };
  let item: any = safeParseJSON(whyUsPage);
  const { s1 = [], s2 = [], s3 = [] } = item ?? {};

  // Extracting section data
  const { title: s1_title1 = "", description: s1_description1 = "" } =
    s1?.[0] ?? {};
  const { title: s2_title1 = "", description: s2_description1 = "" } =
    s2?.[0] ?? {};
  const { title: s2_title2 = "", description: s2_description2 = "" } =
    s2?.[1] ?? {};
  const { title: s2_title3 = "", description: s2_description3 = "" } =
    s2?.[2] ?? {};
  const { title: s3_title1 = "", list: s3_list1 = [] } = s3?.[0] ?? {};
  const {
    title: s3_title2 = "",
    description: s3_description2 = "",
    list: s3_list2 = [],
  } = s3?.[1] ?? {};

  // Reset form values
  const resetInitialFormValues = () => {
    // Section 1
    rest?.setValue("s1_title1", s1_title1);
    rest?.setValue("s1_description1", s1_description1);
    rest?.setValue("imageGalleryPic", imageGalleryPic);

    // Section 2
    rest?.setValue("s2_title1", s2_title1);
    rest?.setValue("s2_description1", s2_description1);
    rest?.setValue("s2_title2", s2_title2);
    rest?.setValue("s2_description2", s2_description2);
    rest?.setValue("s2_title3", s2_title3);
    rest?.setValue("s2_description3", s2_description3);

    // Section 3
    rest?.setValue("s3_title1", s3_title1);
    // rest?.setValue("s3_list1", s3_list1);
    rest?.setValue(`s3_list1_point_1`, item?.s3?.[0]?.list?.[0] ?? "");
    rest?.setValue(`s3_list1_point_2`, item?.s3?.[0]?.list?.[1] ?? "");
    rest?.setValue(`s3_list1_point_3`, item?.s3?.[0]?.list?.[2] ?? "");
    rest?.setValue(`s3_list1_point_4`, item?.s3?.[0]?.list?.[3] ?? "");
    rest?.setValue(`s3_list1_point_5`, item?.s3?.[0]?.list?.[4] ?? "");
    rest?.setValue(`s3_list1_point_6`, item?.s3?.[0]?.list?.[5] ?? "");
    // s3_list1?.forEach((point: string, index: number) =>
    //   rest?.setValue(`s3_list1_point_${index + 1}`, point)
    // );

    rest?.setValue("s3_title2", s3_title2);
    rest?.setValue("s3_description2", s3_description2);
    // rest?.setValue("s3_list2", s3_list2);
    rest?.setValue(`s3_list2_point_1`, item?.s3?.[1]?.list?.[0] ?? "");
    rest?.setValue(`s3_list2_point_2`, item?.s3?.[1]?.list?.[1] ?? "");
    rest?.setValue(`s3_list2_point_3`, item?.s3?.[1]?.list?.[2] ?? "");
    rest?.setValue(`s3_list2_point_4`, item?.s3?.[1]?.list?.[3] ?? "");
    rest?.setValue(`s3_list2_point_5`, item?.s3?.[1]?.list?.[4] ?? "");
    rest?.setValue(`s3_list2_point_6`, item?.s3?.[1]?.list?.[5] ?? "");
    // s3_list2?.forEach((point: string, index: number) =>
    //   rest?.setValue(`s3_list2_point_${index + 1}`, point)
    // );
  };

  // Check if form actions should be disabled
  // const currentImages = watch("imageGalleryPic");
  // const areImagesSame =
  // JSON.stringify(currentImages) === JSON.stringify(imageGalleryPic);
  const isFormActionDisabled = isNullObject(formData);

  // Custom properties for various components
  const pointDivProps = {
    status: "secondary",
    extendCss: "!border-[1px] !border-blue-400 text-sm",
  };
  const innerPointProps = {
    color: "bg-gray-100",
    extendCss: "!border-[1px] !border-blue-400 text-sm",
  };

  // Clear form values
  const clearFormValues = () => {
    setImgHidden(true);
    resetInitialFormValues();
    setForm({ type, isLoading: false, isOpen: false });
  };

  // Custom properties for the sticky header
  const stickyHeaderProps = {
    rest,
    title: isLessThan600 ? "Why Us" : "About - Why Us Page",
    bg: "bg-brand-yellow-1000",
    submitTitle: "Update",
    cancelTitle: "Reset",
    isLoading,
    isSubmitDisabled: isFormActionDisabled,
    isCancelDisabled: isFormActionDisabled,
    type,
    setForm,
    handleFormCancel: clearFormValues,
    liveUrl: getWebUrl("/about/why-us/"),
  };

  // Custom properties for the gallery image input
  const galleryImageInputProps = {
    isMultiple: true,
    imgHidden,
    setImgHidden,
    handleFirstLoad: clearFormValues,
  };

  // Return the resulting object
  return {
    // Text data
    s1_title1,
    s1_description1,
    s2_title1,
    s2_description1,
    s2_title2,
    s2_description2,
    s2_title3,
    s2_description3,
    s3_title1,
    s3_list1,
    s3_title2,
    s3_description2,
    s3_list2,

    // Custom properties
    pointDivProps,
    innerPointProps,

    // Other needed data
    id,
    whyUsPage,
    imageGalleryPic,
    item,
    clearFormValues,
    isFormActionDisabled,
    handleFormChange,
    forms,
    setForm,
    isLoading,
    formData,
    type,
    page,
    stickyHeaderProps,
    galleryImageInputProps,
  };
};

////////////////////////////////////////
////////////////////////////////////////
// Social Responsibility Page Form Data
////////////////////////////////////////
////////////////////////////////////////
// export const getSocialRespPageFormData = (data: any, selectedItem: any) => {
//   // Params
//   const {
//     s1_title1,
//     s1_image1,
//     // s1_list1,
//     s2_title1,
//     s2_image1,
//     // s2_list1,
//     s3_title1,
//     s3_image1,
//     // s3_list1,
//     s4_title1,
//     s4_image1,
//     // s4_list1,
//     s5_title1,
//     s5_image1,
//     // s4_list1,
//     s6_title1,
//     s6_image1,
//     // s4_list1,
//     ...rest
//   } = data;
//
//   const { s1_list1, s2_list1, s3_list1, s4_list1, s5_list1, s6_list1 } =
//     getNewTitleDescList(rest, selectedItem);
//
//   const createSectionData = (
//     title: string,
//     image: any,
//     list: any,
//     sectionKey: string,
//     filePrefix: string
//   ) => ({
//     title: title || selectedItem[sectionKey]?.title,
//     image: changeFileNameForImage(
//       image,
//       selectedItem[sectionKey]?.image,
//       filePrefix
//     ),
//     nestedList: !isNullObject(list)
//       ? list
//       : selectedItem?.[sectionKey]?.nestedList,
//   });
//
//   const formData = {
//     s1: createSectionData(s1_title1, s1_image1, s1_list1, "s1", "one"),
//     s2: createSectionData(s2_title1, s2_image1, s2_list1, "s2", "two"),
//     s3: createSectionData(s3_title1, s3_image1, s3_list1, "s3", "three"),
//     s4: createSectionData(s4_title1, s4_image1, s4_list1, "s4", "four"),
//     s5: createSectionData(s5_title1, s5_image1, s5_list1, "s5", "five"),
//     s6: createSectionData(s6_title1, s6_image1, s6_list1, "s6", "six"),
//   };
//
//   return formData;
// };
export const getSocialRespPageFormData = (data: any, selectedItem: any, sections: any[]) => {
  // Helper function to extract list data from form data
  const extractListData = (data: any, sectionNum: number) => {
    const listData: any = {
      title: data[`s${sectionNum}_list${sectionNum}_title_1`] || "",
      list: []
    };

    // Extract all list items for this section
    let listIndex = 1;
    while (data[`s${sectionNum}_list${sectionNum}_list_${listIndex}`] !== undefined) {
      const listItem = data[`s${sectionNum}_list${sectionNum}_list_${listIndex}`];
      if (listItem && listItem.trim() !== "") {
        listData.list.push(listItem);
      }
      listIndex++;
    }

    return listData;
  };

  // Helper function to create section data
  const createSectionData = (
    _sectionNum: number,
    title: string,
    image: any,
    listData: any,
    sectionKey: string,
    filePrefix: string
  ) => ({
    title: title || selectedItem[sectionKey]?.title || "",
    image: changeFileNameForImage(
      image,
      selectedItem[sectionKey]?.image,
      filePrefix
    ),
    nestedList: (!isNullObject(listData) && listData.list && listData.list.length > 0)
      ? listData
      : selectedItem?.[sectionKey]?.nestedList || { title: "", list: [] },
  });

  // Dynamic form data processing
  const formData: any = {};

  // Process each section dynamically based on the sections array
  sections.forEach((_, index) => {
    const sectionNum = index + 1;
    const sectionKey = `s${sectionNum}`;

    const title = data[`s${sectionNum}_title${sectionNum}`];
    const image = data[`s${sectionNum}_image1`];
    const listData = extractListData(data, sectionNum);

    // Generate file prefix based on section number
    const filePrefixes = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    const filePrefix = filePrefixes[index] || `section${sectionNum}`;

    formData[sectionKey] = createSectionData(
      sectionNum,
      title,
      image,
      listData,
      sectionKey,
      filePrefix
    );
  });

  return formData;
};

// Helper function to extract new title-description list data (updated to be dynamic)
export const getNewTitleDescListDynamic = (rest: any, selectedItem: any, sectionsCount: number) => {
  const result: any = {};

  for (let sectionNum = 1; sectionNum <= sectionsCount; sectionNum++) {
    const sectionKey = `s${sectionNum}_list${sectionNum}`;
    const titleKey = `s${sectionNum}_list${sectionNum}_title_1`;

    // Get the title
    const title = rest[titleKey];

    // Get all list items for this section
    const listItems: string[] = [];
    let listIndex = 1;

    while (rest[`s${sectionNum}_list${sectionNum}_list_${listIndex}`] !== undefined) {
      const listItem = rest[`s${sectionNum}_list${sectionNum}_list_${listIndex}`];
      if (listItem && listItem.trim() !== "") {
        listItems.push(listItem);
      }
      listIndex++;
    }

    // Only include if we have data
    if (title || listItems.length > 0) {
      result[sectionKey] = {
        title: title || selectedItem?.[`s${sectionNum}`]?.nestedList?.title || "",
        list: listItems.length > 0 ? listItems : selectedItem?.[`s${sectionNum}`]?.nestedList?.list || []
      };
    } else {
      result[sectionKey] = {};
    }
  }

  return result;
};
////////////////////////////////////////
////////////////////////////////////////
// Social Responsibility Page Item Data
////////////////////////////////////////
////////////////////////////////////////
// export const getSocialRespPageItemData = (params: any) => {
//   // Destructuring params
//   // const { store, rest, watch, isLessThan600, imgHidden, setImgHidden } = params;
//   const { store, rest, watch, isLessThan600, imgHidden, setImgHidden } = params;
//   const { forms, handleFormChange, setForm } = store;
//   const { api: apiData, formData, isLoading } = forms.get ?? {};
//   const {
//     socialResponsibilityPage = {},
//     _id: id,
//     imageGalleryPic,
//   } = apiData?.data?.[0] || {};
//
//   // Initial setup
//   const type = "get";
//   const page = {
//     name: "socialResponsibilityPage",
//     query: "social_responsibility",
//   };
//   let item: any =
//     typeof socialResponsibilityPage === "string"
//       ? JSON.parse(socialResponsibilityPage)
//       : socialResponsibilityPage;
//   const pageLength = Object?.keys(item)?.length;
//   const { s1 = {}, s2 = {}, s3 = {}, s4 = {}, s5 = {}, s6 = {} } = item ?? {};
//
//   // Extracting section data
//   const {
//     title: s1_title1 = "",
//     image: s1_image1 = "",
//     nestedList: s1_list1 = [],
//   } = s1 ?? {};
//   const {
//     title: s2_title1 = "",
//     image: s2_image1 = "",
//     nestedList: s2_list1 = [],
//   } = s2 ?? {};
//   const {
//     title: s3_title1 = "",
//     image: s3_image1 = "",
//     nestedList: s3_list1 = [],
//   } = s3 ?? {};
//   const {
//     title: s4_title1 = "",
//     image: s4_image1 = "",
//     nestedList: s4_list1 = [],
//   } = s4 ?? {};
//   const {
//     title: s5_title1 = "",
//     image: s5_image1 = "",
//     nestedList: s5_list1 = [],
//   } = s5 ?? {};
//   const {
//     title: s6_title1 = "",
//     image: s6_image1 = "",
//     nestedList: s6_list1 = [],
//   } = s6 ?? {};
//
//   // Reset form values
//   const resetInitialFormValues = () => {
//     // Section 1
//     rest?.setValue("s1_title1", s1_title1);
//     rest?.setValue("s1_image1", s1_image1);
//     rest?.setValue("s1_list1", s1_list1);
//     rest?.setValue("s1_list1_title_1", s1_list1?.title);
//     s1_list1?.list?.forEach((item: any, index: number) => {
//       rest?.setValue(`s1_list1_list_${index + 1}`, item);
//     });
//
//     // Section 2
//     rest?.setValue("s2_title1", s2_title1);
//     rest?.setValue("s2_image1", s2_image1);
//     rest?.setValue("s2_list1", s2_list1);
//     rest?.setValue("s2_list1_title_1", s2_list1?.title);
//     s2_list1?.list?.forEach((item: any, index: number) => {
//       rest?.setValue(`s2_list1_list_${index + 1}`, item);
//     });
//
//     // Section 3
//     rest?.setValue("s3_title1", s3_title1);
//     rest?.setValue("s3_image1", s3_image1);
//     rest?.setValue("s3_list1", s3_list1);
//     rest?.setValue("s3_list1_title_1", s3_list1?.title);
//     s3_list1?.list?.forEach((item: any, index: number) => {
//       rest?.setValue(`s3_list1_list_${index + 1}`, item);
//     });
//
//     // Section 4
//     rest?.setValue("s4_title1", s4_title1);
//     rest?.setValue("s4_image1", s4_image1);
//     rest?.setValue("s4_list1", s4_list1);
//     rest?.setValue("s4_list1_title_1", s4_list1?.title);
//     s4_list1?.list?.forEach((item: any, index: number) => {
//       rest?.setValue(`s4_list1_list_${index + 1}`, item);
//     });
//
//     // Section 5
//     rest?.setValue("s5_title1", s5_title1);
//     rest?.setValue("s5_image1", s5_image1);
//     rest?.setValue("s5_list1", s5_list1);
//     rest?.setValue("s5_list1_title_1", s5_list1?.title);
//     s5_list1?.list?.forEach((item: any, index: number) => {
//       rest?.setValue(`s5_list1_list_${index + 1}`, item);
//     });
//
//     // Section 4
//     rest?.setValue("s6_title1", s6_title1);
//     rest?.setValue("s6_image1", s6_image1);
//     rest?.setValue("s6_list1", s6_list1);
//     rest?.setValue("s6_list1_title_1", s6_list1?.title);
//     s6_list1?.list?.forEach((item: any, index: number) => {
//       rest?.setValue(`s6_list1_list_${index + 1}`, item);
//     });
//   };
//
//   // Check if form actions should be disabled
//   const images = [
//     watch("s1_image1"),
//     watch("s2_image1"),
//     watch("s3_image1"),
//     watch("s4_image1"),
//     watch("s5_image1"),
//     watch("s6_image1"),
//   ];
//   const isImageUpdated = images?.some((image) => typeof image === "object");
//   const isFormActionDisabled = isNullObject(formData) && !isImageUpdated;
//   // Check if form actions should be disabled
//   // const currentImages = watch("imageGalleryPic");
//   // const areImagesSame =
//   //   JSON.stringify(currentImages) === JSON.stringify(imageGalleryPic);
//
//   // Custom properties for various components
//   // const pointDivProps = {
//   //   status: "secondary",
//   //   extendCss: "!border-[1px] !border-blue-400 text-sm",
//   // };
//   const innerPointProps = {
//     color: "bg-gray-100",
//     extendCss: "!border-[1px] !border-blue-400 text-sm",
//   };
//
//   // Clear form values
//   const clearFormValues = () => {
//     setImgHidden(true);
//     resetInitialFormValues();
//     setForm({ type, isLoading: false, isOpen: false });
//   };
//
//   // Custom properties for the sticky header
//   const stickyHeaderProps = {
//     rest,
//     title: isLessThan600
//       ? "Social Responsibility"
//       : "About - Social Responsibility Page",
//     bg: "bg-brand-yellow-1000",
//     submitTitle: "Update",
//     cancelTitle: "Reset",
//     isLoading,
//     isSubmitDisabled: isFormActionDisabled,
//     isCancelDisabled: isFormActionDisabled,
//     type,
//     setForm,
//     handleFormCancel: clearFormValues,
//     liveUrl: getWebUrl("/about/social-responsibility"),
//   };
//
//   // Custom properties for the gallery image input
//   // const thumbnailImageInputProps = {
//   //   // isMultiple: true,
//   //   imgHidden,
//   //   setImgHidden,
//   //   handleFirstLoad: clearFormValues,
//   // };
//
//   // Arrange s1, s2, s3 data
//   // const sOne = { s1_title1, s1_image1, s1_list1 };
//   // const sTwo = { s2_title1, s2_image1, s2_list1 };
//   // const sThree = { s3_title1, s3_image1, s3_list1 };
//   const allSections = [
//     {
//       title: s1_title1,
//       image: s1_image1,
//       nestedList: s1_list1,
//     },
//     {
//       title: s2_title1,
//       image: s2_image1,
//       nestedList: s2_list1,
//     },
//     {
//       title: s3_title1,
//       image: s3_image1,
//       nestedList: s3_list1,
//     },
//     {
//       title: s4_title1,
//       image: s4_image1,
//       nestedList: s4_list1,
//     },
//     {
//       title: s5_title1,
//       image: s5_image1,
//       nestedList: s5_list1,
//     },
//     {
//       title: s6_title1,
//       image: s6_image1,
//       nestedList: s6_list1,
//     },
//   ];
//
//   // Return the resulting object
//   return {
//     // Text data
//     allSections,
//     s1_title1,
//     s1_image1,
//     s1_list1,
//     s2_title1,
//     s2_image1,
//     s2_list1,
//     s3_title1,
//     s3_image1,
//     s3_list1,
//     s4_title1,
//     s4_image1,
//     s4_list1,
//     s5_title1,
//     s5_image1,
//     s5_list1,
//     s6_title1,
//     s6_image1,
//     s6_list1,
//
//     // Custom properties
//     // pointDivProps,
//     innerPointProps,
//
//     // Other needed data
//     id,
//     socialResponsibilityPage,
//     pageLength,
//     imageGalleryPic,
//     item,
//     clearFormValues,
//     isFormActionDisabled,
//     handleFormChange,
//     forms,
//     setForm,
//     isLoading,
//     formData,
//     type,
//     page,
//     stickyHeaderProps,
//     imgHidden,
//     // thumbnailImageInputProps,
//   };
// };
export const getSocialRespPageItemData = (params: any) => {
  // Destructuring params
  const { store, rest, watch, isLessThan600, imgHidden, setImgHidden } = params;
  const { forms, handleFormChange, setForm } = store;
  const { api: apiData, formData, isLoading } = forms.get ?? {};
  const {
    socialResponsibilityPage = {},
    _id: id,
    imageGalleryPic,
  } = apiData?.data?.[0] || {};

  // Initial setup
  const type = "get";
  const page = {
    name: "socialResponsibilityPage",
    query: "social_responsibility",
  };

  let item: any =
    typeof socialResponsibilityPage === "string"
      ? JSON.parse(socialResponsibilityPage)
      : socialResponsibilityPage;

  const pageLength = Object?.keys(item)?.length;

  // Dynamic section extraction
  const extractSectionData = (sectionKey: string) => {
    const sectionData = item?.[sectionKey] || {};
    return {
      title: sectionData.title || "",
      image: sectionData.image || "",
      nestedList: sectionData.nestedList || { title: "", list: [] },
    };
  };

  // Get all available sections dynamically
  const availableSections = Object.keys(item || {}).filter(key => key.startsWith('s')).sort();
  const maxSections = Math.max(availableSections.length, 1); // Ensure at least 1 section

  // Dynamic section data extraction
  const sectionDataMap: any = {};
  const allSections: any[] = [];

  for (let i = 1; i <= maxSections; i++) {
    const sectionKey = `s${i}`;
    const sectionData = extractSectionData(sectionKey);
    sectionDataMap[sectionKey] = sectionData;
    allSections.push(sectionData);
  }

  // If no sections exist, create at least one empty section
  if (allSections.length === 0 || (allSections.length === 1 && !allSections[0].title && !allSections[0].image)) {
    allSections[0] = {
      title: "",
      image: "",
      nestedList: { title: "", list: [""] },
    };
  }

  // Dynamic form value reset function
  const resetInitialFormValues = () => {
    allSections.forEach((section, index) => {
      const sectionNum = index + 1;
      const sectionData = section;

      // Set basic section data
      rest?.setValue(`s${sectionNum}_title${sectionNum}`, sectionData.title);
      rest?.setValue(`s${sectionNum}_image1`, sectionData.image);
      rest?.setValue(`s${sectionNum}_list${sectionNum}`, sectionData.nestedList);
      rest?.setValue(`s${sectionNum}_list${sectionNum}_title_1`, sectionData.nestedList?.title);

      // Set list items
      if (sectionData.nestedList?.list) {
        sectionData.nestedList.list.forEach((item: any, listIndex: number) => {
          rest?.setValue(`s${sectionNum}_list${sectionNum}_list_${listIndex + 1}`, item);
        });
      }
    });
  };

  // Dynamic image watching for form action check
  const watchedImages = allSections.map((_, index) =>
    watch(`s${index + 1}_image1`)
  );

  const isImageUpdated = watchedImages?.some((image) => typeof image === "object");
  const isFormActionDisabled = isNullObject(formData) && !isImageUpdated;

  // Custom properties for various components
  const innerPointProps = {
    color: "bg-gray-100",
    extendCss: "!border-[1px] !border-blue-400 text-sm",
  };

  // Clear form values
  const clearFormValues = () => {
    setImgHidden(true);
    resetInitialFormValues();
    setForm({ type, isLoading: false, isOpen: false });
  };

  // Custom properties for the sticky header
  const stickyHeaderProps = {
    rest,
    title: isLessThan600
      ? "Social Responsibility"
      : "About - Social Responsibility Page",
    bg: "bg-brand-yellow-1000",
    submitTitle: "Update",
    cancelTitle: "Reset",
    isLoading,
    isSubmitDisabled: isFormActionDisabled,
    isCancelDisabled: isFormActionDisabled,
    type,
    setForm,
    handleFormCancel: clearFormValues,
    liveUrl: getWebUrl("/about/social-responsibility"),
  };

  // Create dynamic return object with all section data
  const dynamicSectionData: any = {};
  allSections.forEach((section, index) => {
    const sectionNum = index + 1;
    dynamicSectionData[`s${sectionNum}_title1`] = section.title;
    dynamicSectionData[`s${sectionNum}_image1`] = section.image;
    dynamicSectionData[`s${sectionNum}_list1`] = section.nestedList;
  });

  // Return the resulting object
  return {
    // Text data
    allSections,
    ...dynamicSectionData,

    // Custom properties
    innerPointProps,

    // Other needed data
    id,
    socialResponsibilityPage,
    pageLength,
    imageGalleryPic,
    item,
    clearFormValues,
    isFormActionDisabled,
    handleFormChange,
    forms,
    setForm,
    isLoading,
    formData,
    type,
    page,
    stickyHeaderProps,
    imgHidden,
    maxSections,
  };
};
////////////////////////////////////////
////////////////////////////////////////
// About page - Our team form data
////////////////////////////////////////
////////////////////////////////////////
// export const getOurTeamPageFormData = (data: any, selectedItem: any) => {
//   // Variables
//   const { company, teamFounders, teamMembers } = selectedItem;
//
//   const result: OurTeamTransfomedFormSchema = {
//     company: {
//       title: data.company_title ?? company?.title,
//       description: data.company_description ?? company?.description,
//     },
//     teamFounders: [],
//     teamMembers: [],
//   };
//
//   // Process founders
//   for (let i = 0; i <= 1; i++) {
//     result.teamFounders.push({
//       image: changeFileNameForImage(
//         data?.[`team_founders_image_${i + 1}`],
//         teamFounders?.[i]?.image,
//         numberToWords(i + 1)
//       ),
//       name: data[`team_founders_name_${i + 1}`] ?? teamFounders?.[i]?.name,
//       designation:
//         data[`team_founders_designation_${i + 1}`] ??
//         teamFounders?.[i]?.designation,
//     });
//   }
//
//   // Process team members
//   for (let i = 0; i <= 7; i++) {
//     result.teamMembers.push({
//       image: changeFileNameForImage(
//         data[`team_members_image_${i + 1}`],
//         teamMembers?.[i]?.image,
//         numberToWords(i + 3)
//       ),
//       name: data[`team_members_name_${i + 1}`] ?? teamMembers?.[i]?.name,
//       designation:
//         data[`team_members_designation_${i + 1}`] ??
//         teamMembers?.[i]?.designation,
//     });
//   }
//
//   // Check if the data is valid
//   const validateTeamData = (data: any): string[] => {
//     const errors: string[] = [];
//
//     // Helper function to validate name if image is provided
//     const validateMembers = (members: any, type: string) => {
//       members.forEach((member: any, index: any) => {
//         if (member.image && !member.name.trim()) {
//           errors.push(
//             `Error: ${type} at index ${index} has an image but no name provided.`
//           );
//         }
//       });
//     };
//
//     // Validate teamFounders
//     validateMembers(data.teamFounders, "Founder");
//
//     // Validate teamMembers
//     validateMembers(data.teamMembers, "Team Member");
//
//     return errors;
//   };
//
//   return { errors: validateTeamData(result), result };
// };

export const getOurTeamPageFormData = (data: any, selectedItem: any) => {
  const { company, teamFounders, teamMembers: initialMembers } = selectedItem;

  const result: OurTeamTransfomedFormSchema = {
    company: {
      title: data.company_title ?? company?.title,
      description: data.company_description ?? company?.description,
    },
    teamFounders: [],
    teamMembers: [],
  };

  // --------- Founders (fixed 2 slots)
  for (let i = 1; i <= 2; i++) {
    result.teamFounders.push({
      image: changeFileNameForImage(
        data[`team_founders_image_${i}`],
        teamFounders?.[i - 1]?.image,
        numberToWords(i)
      ),
      name: data[`team_founders_name_${i}`] ?? teamFounders?.[i - 1]?.name,
      designation:
        data[`team_founders_designation_${i}`] ??
        teamFounders?.[i - 1]?.designation,
    });
  }

  // --------- Team Members (dynamic)
  let memberIndex = 1;
  while (true) {
    const name = data[`team_members_name_${memberIndex}`];
    const designation = data[`team_members_designation_${memberIndex}`];
    const image = data[`team_members_image_${memberIndex}`];

    // If no values at all, assume no more members
    if (!name && !designation && !image) {
      break;
    }

    result.teamMembers.push({
      name,
      designation,
      image: changeFileNameForImage(
        image,
        initialMembers?.[memberIndex - 1]?.image,
        numberToWords(memberIndex + 2)
      ),
    });

    memberIndex++;
  }

  // --------- Validation
  const validateTeamData = (data: any): string[] => {
    const errors: string[] = [];

    const validateMembers = (members: any[], type: string) => {
      members.forEach((member, index) => {
        if (member.image && !member.name?.trim()) {
          errors.push(
            `Error: ${type} at index ${index + 1} has an image but no name provided.`
          );
        }
      });
    };

    validateMembers(result.teamFounders, "Founder");
    validateMembers(result.teamMembers, "Team Member");

    return errors;
  };

  return { result, errors: validateTeamData(result) };
};

////////////////////////////////////////
////////////////////////////////////////
// About page - Our team item data
////////////////////////////////////////
////////////////////////////////////////
// export const getOurTeamPageItemData = (params: any) => {
//   // Destructuring params
//   // const { store, rest, watch, isLessThan600, imgHidden, setImgHidden } = params;
//   const { store, rest, watch, isLessThan600, imgHidden, setImgHidden } = params;
//   const { forms, handleFormChange, setForm } = store;
//   const { api: apiData, formData, isLoading } = forms.get ?? {};
//   const {
//     ourTeamPage = {},
//     _id: id,
//     imageGalleryPic,
//   } = apiData?.data?.[0] || {};
//
//   // Initial setup
//   const type = "get";
//   const page = {
//     name: "ourTeamPage",
//     query: "our_team",
//   };
//   let item: any = safeParseJSON(ourTeamPage);
//   const pageLength = Object?.keys(item)?.length;
//   const { company = {}, teamFounders: tf, teamMembers: tm } = item ?? {};
//
//   // const { company = {}, teamFounders = [], teamMembers = [] } = item ?? {};
//
//   // Reset form values
//   const resetInitialFormValues = () => {
//     // Company
//     rest?.setValue("company_title", company?.title);
//     rest?.setValue("company_description", company?.description);
//
//     rest?.setValue("team_founders_image_1", tf?.[0]?.image);
//     rest?.setValue("team_founders_name_1", tf?.[0]?.name);
//     rest?.setValue("team_founders_designation_1", tf?.[0]?.designation);
//
//     rest?.setValue("team_founders_image_2", tf?.[1]?.image);
//     rest?.setValue("team_founders_name_2", tf?.[1]?.name);
//     rest?.setValue("team_founders_designation_2", tf?.[1]?.designation);
//
//     rest?.setValue("team_members_image_3", tm?.[0]?.image);
//     rest?.setValue("team_members_name_1", tm?.[0]?.name);
//     rest?.setValue("team_members_designation_1", tm?.[0]?.designation);
//
//     rest?.setValue("team_members_image_4", tm?.[1]?.image);
//     rest?.setValue("team_members_name_2", tm?.[1]?.name);
//     rest?.setValue("team_members_designation_2", tm?.[1]?.designation);
//
//     rest?.setValue("team_members_image_5", tm?.[2]?.image);
//     rest?.setValue("team_members_name_3", tm?.[2]?.name);
//     rest?.setValue("team_members_designation_3", tm?.[2]?.designation);
//
//     rest?.setValue("team_members_image_6", tm?.[3]?.image);
//     rest?.setValue("team_members_name_4", tm?.[3]?.name);
//     rest?.setValue("team_members_designation_4", tm?.[3]?.designation);
//
//     rest?.setValue("team_members_image_7", tm?.[4]?.image);
//     rest?.setValue("team_members_name_5", tm?.[4]?.name);
//     rest?.setValue("team_members_designation_5", tm?.[4]?.designation);
//
//     rest?.setValue("team_members_image_8", tm?.[5]?.image);
//     rest?.setValue("team_members_name_6", tm?.[5]?.name);
//     rest?.setValue("team_members_designation_6", tm?.[5]?.designation);
//
//     rest?.setValue("team_members_image_9", tm?.[6]?.image);
//     rest?.setValue("team_members_name_7", tm?.[6]?.name);
//     rest?.setValue("team_members_designation_7", tm?.[6]?.designation);
//
//     rest?.setValue("team_members_image_10", tm?.[7]?.image);
//     rest?.setValue("team_members_name_8", tm?.[7]?.name);
//     rest?.setValue("team_members_designation_8", tm?.[7]?.designation);
//
//     // // Team founders
//     // teamFounders?.forEach(
//     //   ({ image, name, designation }: OurTeamMemberSchema, idx: number) => {
//     //     rest?.setValue(`team_founders_image${idx + 1}`, image);
//     //     rest?.setValue(`team_founders_name${idx + 1}`, name);
//     //     rest?.setValue(`team_founders_designation${idx + 1}`, designation);
//     //   }
//     // );
//
//     // // Team members
//     // teamMembers?.forEach(
//     //   ({ image, name, designation }: OurTeamMemberSchema, idx: number) => {
//     //     rest?.setValue(`team_members_image${idx + 1}`, image);
//     //     rest?.setValue(`team_members_name${idx + 1}`, name);
//     //     rest?.setValue(`team_members_designation${idx + 1}`, designation);
//     //   }
//     // );
//   };
//
//   // Check if form actions should be disabled
//   const images = [
//     watch("team_founders_image_1"),
//     watch("team_founders_image_2"),
//     watch("team_managers_image_3"),
//     watch("team_managers_image_4"),
//     watch("team_managers_image_5"),
//     watch("team_managers_image_6"),
//     watch("team_managers_image_7"),
//     watch("team_managers_image_8"),
//     watch("team_managers_image_9"),
//     watch("team_managers_image_10"),
//   ];
//   const isImageUpdated = images?.some((image) => typeof image === "object");
//   const isFormActionDisabled = isNullObject(formData) && !isImageUpdated;
//
//   // Custom properties for various components
//   const pointDivProps = {
//     status: "secondary",
//     extendCss: "!border-[1px] !border-blue-400 text-sm",
//   };
//   const innerPointProps = {
//     color: "bg-gray-100",
//     extendCss: "!border-[1px] !border-blue-400 text-sm",
//   };
//
//   // Clear form values
//   const clearFormValues = () => {
//     setImgHidden(true);
//     resetInitialFormValues();
//     setForm({ type, isLoading: false, isOpen: false });
//   };
//
//   // Custom properties for the sticky header
//   const stickyHeaderProps = {
//     rest,
//     title: isLessThan600 ? "Our Team" : "About - Our Team Page",
//     bg: "bg-brand-yellow-1000",
//     submitTitle: "Update",
//     cancelTitle: "Reset",
//     isLoading,
//     isSubmitDisabled: isFormActionDisabled,
//     isCancelDisabled: isFormActionDisabled,
//     type,
//     setForm,
//     handleFormCancel: clearFormValues,
//     liveUrl: getWebUrl("/about/our-team"),
//   };
//
//   // Return the resulting object
//   return {
//     // Text data
//
//     // Custom properties
//     pointDivProps,
//     innerPointProps,
//
//     // Other needed data
//     id,
//     ourTeamPage,
//     pageLength,
//     imageGalleryPic,
//     item,
//     clearFormValues,
//     isFormActionDisabled,
//     handleFormChange,
//     forms,
//     setForm,
//     isLoading,
//     formData,
//     type,
//     page,
//     stickyHeaderProps,
//     imgHidden,
//     // thumbnailImageInputProps,
//   };
// };

export const getOurTeamPageItemData = (params: any) => {
  // Destructuring params
  const { store, rest, watch, isLessThan600, imgHidden, setImgHidden, membersChanged } = params;
  const { forms, handleFormChange, setForm } = store;
  const { api: apiData, formData, isLoading } = forms.get ?? {};
  const {
    ourTeamPage = {},
    _id: id,
    imageGalleryPic,
  } = apiData?.data?.[0] || {};

  // Initial setup
  const type = "get";
  const page = {
    name: "ourTeamPage",
    query: "our_team",
  };
  let item: any = safeParseJSON(ourTeamPage);
  const pageLength = Object?.keys(item)?.length;
  const { company = {}, teamFounders: tf, teamMembers: tm } = item ?? {};

  // Reset form values - only for company and founders, not team members
  const resetInitialFormValues = () => {
    // Company
    rest?.setValue("company_title", company?.title);
    rest?.setValue("company_description", company?.description);

    // Team founders (still fixed at 2)
    rest?.setValue("team_founders_image_1", tf?.[0]?.image);
    rest?.setValue("team_founders_name_1", tf?.[0]?.name);
    rest?.setValue("team_founders_designation_1", tf?.[0]?.designation);

    rest?.setValue("team_founders_image_2", tf?.[1]?.image);
    rest?.setValue("team_founders_name_2", tf?.[1]?.name);
    rest?.setValue("team_founders_designation_2", tf?.[1]?.designation);

    // Remove hardcoded team members setup since we're using React state
    // The team members are now managed by the teamMembers state in the component
  };

  // Check if form actions should be disabled
  const images = [
    watch("team_founders_image_1"),
    watch("team_founders_image_2"),
    // Remove hardcoded team member image watches since they're managed differently now
  ];
  const isImageUpdated = images?.some((image) => typeof image === "object");

  // Updated logic to include membersChanged
  const isFormActionDisabled = isNullObject(formData) && !isImageUpdated && !membersChanged;

  // Custom properties for various components
  const pointDivProps = {
    status: "secondary",
    extendCss: "!border-[1px] !border-blue-400 text-sm",
  };
  const innerPointProps = {
    color: "bg-gray-100",
    extendCss: "!border-[1px] !border-blue-400 text-sm",
  };

  // Clear form values
  const clearFormValues = () => {
    setImgHidden(true);
    resetInitialFormValues();
    setForm({ type, isLoading: false, isOpen: false });
  };

  // Custom properties for the sticky header
  const stickyHeaderProps = {
    rest,
    title: isLessThan600 ? "Our Team" : "About - Our Team Page",
    bg: "bg-brand-yellow-1000",
    submitTitle: "Update",
    cancelTitle: "Reset",
    isLoading,
    isSubmitDisabled: isFormActionDisabled,
    isCancelDisabled: isFormActionDisabled,
    type,
    setForm,
    handleFormCancel: clearFormValues,
    liveUrl: getWebUrl("/about/our-team"),
  };

  // Return the resulting object
  return {
    // Custom properties
    pointDivProps,
    innerPointProps,

    // Other needed data
    id,
    ourTeamPage,
    pageLength,
    imageGalleryPic,
    item,
    clearFormValues,
    isFormActionDisabled,
    handleFormChange,
    forms,
    setForm,
    isLoading,
    formData,
    type,
    page,
    stickyHeaderProps,
    imgHidden,
  };
};
// All the inputs used in the about pages
export const aboutFormInputs = {
  ourTeamPage: [
    "company_title",
    "company_description",
    "team_founders_image_1",
    "team_founders_title_1",
    "team_founders_designation_1",
    "team_founders_image_2",
    "team_founders_title_2",
    "team_founders_designation_2",
    "team_members_image_1",
    "team_members_title_1",
    "team_members_designation_1",
    "team_members_image_2",
    "team_members_title_2",
    "team_members_designation_2",
    "team_members_image_3",
    "team_members_title_3",
    "team_members_designation_3",
    "team_members_image_4",
    "team_members_title_4",
    "team_members_designation_4",
    "team_members_image_5",
    "team_members_title_5",
    "team_members_designation_5",
    "team_members_image_6",
    "team_members_title_6",
    "team_members_designation_6",
    "team_members_image_7",
    "team_members_title_7",
    "team_members_designation_7",
    "team_members_image_8",
    "team_members_title_8",
    "team_members_designation_8",
  ],
  socialResponsibilityPage: [
    // Section 1
    "s1_image1",
    "s1_title1",
    "s1_list1_title_1",
    "s1_list1_list_1",
    "s1_list1_list_2",

    // Section 2
    "s2_image1",
    "s2_title1",

    "s2_list1",
    "s2_list1_title_1",
    "s2_list1_list_1",
    "s2_list1_list_2",
    "s2_list1_list_3",

    "s2_title2",
    "s2_list2",
    "s2_list2_list_1",
    "s2_list2_list_2",
    "s2_list2_list_3",
    "s2_list2_title_1",

    // Section 3
    "s3_image1",
    "s3_title1",

    "s3_list1",
    "s3_list1_title_1",
    "s3_list1_list_1",

    "s3_list3_list_1",
    "s3_list3_title_1",
    "s3_title3",

    // Section 4
    "s4_image1",
    "s4_list1",
    "s4_title1",
    "s4_title4",
    "s4_list1_title_1",
    "s4_list1_list_1",
    "s4_list4_list_1",
    "s4_list4_title_1",
  ],
  whyUsPage: [
    // Section 1
    "s1_image1",
    "s1_title1",
    "s1_list1_title_1",
    "s1_list1_list_1",
    "s1_list1_list_2",

    // Section 2
    "s2_image1",
    "s2_title1",

    "s2_list1",
    "s2_list1_title_1",
    "s2_list1_list_1",
    "s2_list1_list_2",
    "s2_list1_list_3",

    "s2_title2",
    "s2_list2",
    "s2_list2_list_1",
    "s2_list2_list_2",
    "s2_list2_list_3",
    "s2_list2_title_1",

    // Section 3
    "s3_image1",
    "s3_title1",

    "s3_list1",
    "s3_list1_title_1",
    "s3_list1_list_1",

    "s3_list3_list_1",
    "s3_list3_title_1",
    "s3_title3",

    // Section 4
    "s4_image1",
    "s4_list1",
    "s4_title1",
    "s4_title4",
    "s4_list1_title_1",
    "s4_list1_list_1",
    "s4_list4_list_1",
    "s4_list4_title_1",
  ],
};

export const generateOurTeamRefs = () => {
  const res: any = {
    company: {},
    team_founders: {},
    team_members: {},
  };
  const formInput: any = generateDefaultRefs(aboutFormInputs?.ourTeamPage);
  Object.keys(formInput)?.map((item: string) => {
    if (item?.startsWith("company")) {
      res.company[item] = formInput[item];
    } else if (item?.startsWith("team_founders")) {
      res.team_founders[item] = formInput[item];
    } else if (item?.startsWith("team_members")) {
      res.team_members[item] = formInput[item];
    }
  });
  return res;
};

// Generate teams based on formData and item to put inside form inputs
export const generateModifiedTeams = (formData: any, item: any) => {
  // Helper function to generate the values
  const createTeamArray = (type: any, count: any, data: any) => {
    return Array.from({ length: count }, (_, index) => {
      const i = index + 1;
      return {
        titleName: `${type}_name_${i}`,
        designationName: `${type}_designation_${i}`,
        imageName: `${type}_image_${i}`,
        titleValue: formData[`${type}_name_${i}`] ?? data?.[index]?.name ?? "",
        designationValue:
          formData[`${type}_designation_${i}`] ??
          data?.[index]?.designation ??
          "",
        imageValue: data?.[index]?.image,
      };
    });
  };

  return {
    modifiedTeamFounders: createTeamArray(
      "team_founders",
      2,
      item?.teamFounders
    ),
    modifiedTeamMembers: createTeamArray("team_members", 8, item?.teamMembers),
  };
};
