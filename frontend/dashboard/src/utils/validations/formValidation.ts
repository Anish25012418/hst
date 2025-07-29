// Import - default
import * as yup from "yup";

// Import - relative
import {
  defaultValidation,
  draftEditorValidation,
  emailValidation,
  imageValidation,
  nameValidation,
  passwordValidation,
  selectValidation,
} from "./yupValidations";

// Login form
export const LoginValidation = yup
  .object({
    email: emailValidation,
    password: passwordValidation,
  })
  .required();

// Registration form
export const RegisterValidation = yup
  .object({
    fullName: nameValidation,
    email: emailValidation,
    password: passwordValidation,
    imageProfilePic: imageValidation(1),
  })
  .required();

// Update user form
export const UpdateUserValidation = yup
  .object({
    // fullName: nameValidation,
    // email: emailValidation,
    // password: passwordValidation,
    // imageProfilePic: imageValidation(1),
  })
  .required();

// Add category form
export const CategoryValidation = yup
  .object({
    title: nameValidation,
    description: draftEditorValidation,
    imageThumbnailPic: imageValidation(15),
    imageCoverPic: imageValidation(15),
  })
  .required();

// Add category form
export const BlogValidation = yup
  .object({
    title: nameValidation,
    author: nameValidation,
    content: draftEditorValidation,
    imageThumbnailPic: imageValidation(15),
    imageCoverPic: imageValidation(15),
  })
  .required();

//  Subcategory form
export const SubcategoryValidation = yup
  .object({
    accommodation: selectValidation,
    // departureFrom: defaultValidation,
    // title: nameValidation,
    destination: defaultValidation,
    caption: defaultValidation,
    // priceOffer: defaultValidation,
    priceOriginal: defaultValidation,
    numberOfDays: defaultValidation,
    imageThumbnailPic: imageValidation(15),
    imageCoverPic: imageValidation(15),
    imageGalleryPic: imageValidation(15),
    imageExtraPic: imageValidation(15),
    overview: draftEditorValidation,
    categoryIds: selectValidation,
    bestSeason: selectValidation,
    excludes: selectValidation,
    // fitnessLevel: selectValidation,
    groupSize: selectValidation,
    includes: selectValidation,
    // ridingSkill: selectValidation,
    meals: selectValidation,
    tourType: selectValidation,
    transportation: selectValidation,
    // itinerary: defaultValidation,
  })
  .required();

// Add category form
export const WhyUsValidation = yup
  .object({
    s1_title1: defaultValidation,
    s1_description1: defaultValidation,
    // s2_title1: defaultValidation,
    // s2_description1: defaultValidation,
    // s2_title2: defaultValidation,
    // s2_description2: defaultValidation,
    // s2_title3: defaultValidation,
    // s2_description3: defaultValidation,
    // s3_title1: defaultValidation,
    // s3_list1: defaultValidation,
    // s3_title2: defaultValidation,
    // s3_description2: defaultValidation,
    // s3_list2: defaultValidation,
    imageGalleryPic: imageValidation(15, 3),
  })
  .required();

// Social responsibility page validation
export const SocialRespValidation = yup
  .object({
    s1_image1: imageValidation(15),
    s2_image1: imageValidation(15),
    s3_image1: imageValidation(15),
    s4_image1: imageValidation(15),
  })
  .required();

// Our team page validation
export const OurTeamValidation = yup
  .object({
    // s1_image1: imageValidation(15),
    // s2_image1: imageValidation(15),
    // s3_image1: imageValidation(15),
    // s4_image1: imageValidation(15),
  })
  .required();

// Contact page validation
export const ContactValidation = yup
  .object({
    send_message: defaultValidation,
    get_in_touch: defaultValidation,
    caption: defaultValidation,
    brand_name: defaultValidation,
    inquiry: defaultValidation,
    talk_to_an_expert: defaultValidation,
    our_business_units: defaultValidation,

    // Main branch
    main_branch_phone: defaultValidation,
    main_branch_email: emailValidation,
    main_branch_location: defaultValidation,

    // Kathmandu branch
    kathmandu_branch_phone: defaultValidation,
    kathmandu_branch_email: emailValidation,
    kathmandu_branch_location: defaultValidation,

    // Pokhara branch
    pokhara_branch_phone: defaultValidation,
    pokhara_branch_email: emailValidation,
    pokhara_branch_location: defaultValidation,
  })
  .required();

// Home page validation
export const HomeValidation = yup
  .object({
    site_header: defaultValidation,
    site_description: defaultValidation,
    professional_guide_info: defaultValidation,
    flexibility_info: defaultValidation,
    local_and_authentic_info: defaultValidation,
    trail_experts_info: defaultValidation,
    category_header: defaultValidation,
    sub_category_header: defaultValidation,
    blogs_header: defaultValidation,
    testimonials_header: defaultValidation,
    footer_description: defaultValidation,
    // imageCoverPic: imageValidation(15),
  })
  .required();

// Rental page validation
export const RentalValidation = yup
  .object({
    // rental_title: defaultValidation,
    // rental_description: draftEditorValidation,
    // rental_image: defaultValidation,
  })
  .required();

// HST Pokhara page validation
export const HSTPokharaValidation = yup
  .object({
    // title: defaultValidation,
    // description: draftEditorValidation,
    // rental_image: defaultValidation,
  })
  .required();

// Workshop page validation
export const WorkshopValidation = yup
  .object({
    // header: defaultValidation,
    // description: draftEditorValidation,
    // rental_image: defaultValidation,
  })
  .required();
