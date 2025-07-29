// Import - utils
import { useRef } from "react";
import { subcategoryEnums } from "../constants/backend/model-constants";
import { DefaultRefSchema, OptionSchema } from "../schemas/GlobalSchema";
import {
  getAuthDataInLocalStorage,
  isTokenPresentInCookie,
} from "./browser-methods";
import {
  deepEqual,
  isArraySubsetOf,
  isNullObject,
  toLabelValue,
  validateImages,
} from "./object-methods";

// Get user necessary functionality
export const getUser = (params: any) => {
  // Params
  const { authStore } = params;

  // Variables
  const { auth } = authStore ?? {};
  const { role } = auth?.data ?? {};

  // Check if the auth is empty in auth store of zustand
  const isAuthStore = !isNullObject(auth);

  // Check if the auth is empty in local storage of browser
  const isAuthLS = !isNullObject(getAuthDataInLocalStorage());

  // Check if cookie is present
  const isCookie = isTokenPresentInCookie("HST_TOKEN");

  // Roles
  const isAdmin = role?.toLowerCase() === "admin";
  const isUser = role?.toLowerCase() === "user";

  // Output
  const result = {
    // Auth
    isAuthStore,
    isAuthLS,

    // Cookie
    isCookie,

    // Roles
    isAdmin,
    isUser,
  };

  return result;
};

// Add individual enum attributes for select inputs
export const getSubCategoryOption = (key: keyof typeof subcategoryEnums) => {
  return toLabelValue(subcategoryEnums[key] as string[]);
};

// Generate refs dynamically
export const generateDefaultRefs = (keys: string[]): DefaultRefSchema => {
  return keys.reduce((acc, key) => {
    acc[key] = useRef<any>(null);
    return acc;
  }, {} as DefaultRefSchema);
};

export const fetchSubcategoryData = (data: any, item: any, itinerary: any) => {
  // Variables
  const {
    accommodation: accommodationTemp,
    departureFrom: departureFromTemp,
    title: titleTemp,
    destination: destinationTemp,
    caption: captionTemp,
    priceOriginal: priceOriginalTemp,
    numberOfDays: numberOfDaysTemp,
    imageCoverPic: imageCoverPicTemp,
    imageThumbnailPic: imageThumbnailPicTemp,
    imageGalleryPic: imageGalleryPicTemp,
    imageExtraPic: imageExtraPicTemp,
    overview: overviewTemp,
    description: descriptionTemp,
    categoryIds: categoryIdsTemp,
    bestSeason: bestSeasonTemp,
    excludes: excludesTemp,
    fitnessLevel: fitnessLevelTemp,
    groupSize: groupSizeTemp,
    includes: includesTemp,
    ridingSkill: ridingSkillTemp,
    meals: mealsTemp,
    tourType: tourTypeTemp,
    // trekkingGuide: trekkingGuideTemp,
    transportation: transportationTemp,
    // itinerary: itineraryTemp,
  } = data ?? {};
  const imageValidity = validateImages({
    imageCoverPicTemp,
    imageExtraPicTemp,
    imageGalleryPicTemp,
    imageThumbnailPicTemp,
  });
  const changedCategoryIds = item?.categoryIds?.map(
    ({ _id: value, title: label }: any) => ({ label, value })
  );
  const formData = {
    ...(departureFromTemp !== item?.departureFrom && {
      departureFrom: departureFromTemp,
    }),
    ...(titleTemp !== item?.title && {
      title: titleTemp,
    }),
    ...(destinationTemp !== item?.destination && {
      destination: destinationTemp,
    }),
    ...(captionTemp !== item?.caption && {
      caption: captionTemp,
    }),
    ...(priceOriginalTemp !== item?.priceOriginal && {
      priceOriginal: priceOriginalTemp,
    }),
    ...(numberOfDaysTemp !== item?.numberOfDays && {
      numberOfDays: numberOfDaysTemp,
    }),

    // Image types
    ...(!isArraySubsetOf(imageCoverPicTemp, item?.imageCoverPic) && {
      imageCoverPic: imageCoverPicTemp,
    }),
    ...(imageThumbnailPicTemp !== item?.imageThumbnailPic && {
      imageThumbnailPic: imageThumbnailPicTemp[0],
    }),
    ...(!isArraySubsetOf(imageGalleryPicTemp, item?.imageGalleryPic) && {
      imageGalleryPic: imageGalleryPicTemp,
    }),
    ...(imageExtraPicTemp !== item?.imageExtraPic && {
      imageExtraPic: imageExtraPicTemp[0],
    }),

    // Category Ids
    ...(!deepEqual(categoryIdsTemp, changedCategoryIds) && {
      categoryIds: categoryIdsTemp?.map(({ value }: OptionSchema) => value),
    }),

    // Draft editors
    ...(!deepEqual(overviewTemp, item?.overview) && {
      overview: overviewTemp,
    }),
    ...(!deepEqual(descriptionTemp, item?.description) && {
      description: descriptionTemp,
    }),

    // Enum types
    ...(!deepEqual(accommodationTemp, item?.accommodation) && {
      accommodation: accommodationTemp?.map(({ value }: OptionSchema) => value),
    }),
    ...(!deepEqual(bestSeasonTemp, item?.bestSeason) && {
      bestSeason: bestSeasonTemp?.map(({ value }: OptionSchema) => value),
    }),
    ...(!deepEqual(excludesTemp, item?.excludes) && {
      excludes: excludesTemp?.map(({ value }: OptionSchema) => value),
    }),
    ...(!deepEqual(fitnessLevelTemp, item?.fitnessLevel) && {
      fitnessLevel: fitnessLevelTemp?.value,
    }),
    ...(groupSizeTemp !== item?.groupSize && {
      groupSize: groupSizeTemp?.value,
    }),
    ...(!deepEqual(includesTemp, item?.includes) && {
      includes: includesTemp?.map(({ value }: OptionSchema) => value),
    }),
    ...(!deepEqual(ridingSkillTemp, item?.ridingSkill) && {
      ridingSkill: ridingSkillTemp?.value,
    }),
    ...(!deepEqual(mealsTemp, item?.meals) && {
      meals: mealsTemp?.value,
    }),
    ...(!deepEqual(tourTypeTemp, item?.tourType) && {
      tourType: tourTypeTemp?.value,
    }),
    // ...(trekkingGuideTemp !== item?.trekkingGuide && {
    //   trekkingGuide: trekkingGuideTemp,
    // }),
    ...(!deepEqual(transportationTemp, item?.transportation) && {
      transportation: transportationTemp?.map(
        ({ value }: OptionSchema) => value
      ),
    }),

    // Itineraries
    ...(!deepEqual(itinerary, item?.itinerary) && { itinerary }),
  };
  return { imageValidity, formData };
};

export const fetchSubcategoryDraftData = (
  data: any,
  item?: any,
  itinerary?: any
) => {
  // Variables
  const getOptionValues = (options: OptionSchema[]) => {
    if (options?.[0]?.label) {
      return options?.map(({ value }: OptionSchema) => value) ?? [];
    } else return options;
  };
  const accommodation = getOptionValues(data?.accommodation);
  const bestSeason = getOptionValues(data?.bestSeason);
  const excludes = getOptionValues(data?.excludes);
  const fitnessLevel = data?.fitnessLevel?.value;
  const groupSize = data?.groupSize?.value;
  const includes = getOptionValues(data?.includes);
  const ridingSkill = data?.ridingSkill?.value;
  const meals = data?.meals?.value;
  const tourType = getOptionValues(data?.tourType);
  const transportation = getOptionValues(data?.transportation);
  const categoryIds = getOptionValues(data?.categoryIds);
  const changedCategoryIds = item?.categoryIds?.map(
    ({ _id: value }: any) => value
  );
  const formData = {
    departureFrom: data?.departureFrom ?? item?.departureFrom,
    title: data?.title ?? item?.title,
    destination: data?.destination ?? item?.destination,
    caption: data?.caption ?? item?.caption,
    // trekkingGuide: data?.trekkingGuide ?? item?.trekkingGuide,
    priceOriginal: data?.priceOriginal ?? item?.priceOriginal,
    numberOfDays: data?.numberOfDays ?? item?.numberOfDays,
    imageCoverPic: data?.imageCoverPic ?? item?.imageCoverPic,
    imageThumbnailPic: data?.imageThumbnailPic?.[0] ?? item?.imageThumbnailPic,
    imageGalleryPic: data?.imageGalleryPic ?? item?.imageGalleryPic,
    imageExtraPic: data?.imageExtraPic?.[0] ?? item?.imageExtraPic,
    categoryIds: categoryIds?.length > 0 ? categoryIds : changedCategoryIds,
    overview: data?.overview ?? item?.overview,
    description: data?.description ?? item?.description,
    accommodation:
      accommodation?.length > 0 ? accommodation : item?.accommodation,
    bestSeason: bestSeason?.length > 0 ? bestSeason : item?.bestSeason,
    excludes: excludes?.length > 0 ? excludes : item?.excludes,
    fitnessLevel: fitnessLevel ?? item?.fitnessLevel,
    groupSize: groupSize ?? item?.groupSize,
    includes: includes?.length > 0 ? includes : item?.includes,
    ridingSkill: ridingSkill ?? item?.ridingSkill,
    meals: meals ?? item?.meals,
    tourType: tourType?.length > 0 ? tourType : item?.tourType,
    transportation:
      transportation?.length > 0 ? transportation : item?.transportation,
    itinerary: itinerary?.length > 0 ? itinerary : item?.itinerary,
  };
  return { formData };
};

export const getWebUrl = (pathname?: string) =>
  `${import.meta.env.VITE_WEB_URL}/${pathname ?? ""}`;

export const openWebUrl = ({ pathname, fullUrl }: any) => {
  const url = fullUrl ?? getWebUrl(pathname);
  return () => window.open(url ?? "", "_blank");
};

export const sortImagesByNumber = (imageArray: string[]): string[] => {
  return imageArray.sort((a, b) => {
    // Extract the numeric part from the filename
    const getNumberFromPath = (path: string): number => {
      const match = path.match(/gallery_(\d+)/); // Match 'gallery_' followed by a number
      return match ? parseInt(match[1], 10) : 0; // Extract the number
    };

    // Compare the numeric values
    return getNumberFromPath(a) - getNumberFromPath(b);
  });
};
