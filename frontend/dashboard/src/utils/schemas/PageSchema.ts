//////////////////////////////
//////////////////////////////
//////////////////////////////
// Why Us Page
//////////////////////////////
//////////////////////////////
//////////////////////////////
export type WhyUsPageSectionSchema = {
  title: string;
  description?: string | string[];
  list?: string[];
};

export type WhyUsPageDataStructureSchema = {
  sectionOne: WhyUsPageSectionSchema[];
  sectionTwo: WhyUsPageSectionSchema[];
  sectionThree: WhyUsPageSectionSchema[];
};

export type ListPointsSchema = {
  [key: string]: string | undefined;
};

export type OrganizedListsSchema = {
  s3_list1: (string | undefined)[];
  s3_list2: (string | undefined)[];
};

//////////////////////////////
//////////////////////////////
//////////////////////////////
// Our Team Page
//////////////////////////////
//////////////////////////////
//////////////////////////////
export type OurTeamFormDataSchema = {
  company_title: string;
  company_description: string;
  team_founders_image_1?: string;
  team_founders_name_1?: string;
  team_founders_designation_1?: string;
  team_founders_image_2?: string;
  team_founders_name_2?: string;
  team_founders_designation_2?: string;
  team_members_image_1?: string;
  team_members_name_1?: string;
  team_members_designation_1?: string;
  team_members_image_2?: string;
  team_members_name_2?: string;
  team_members_designation_2?: string;
  // Add more team members up to 10...
  [key: string]: any;
};

export type OurTeamMemberSchema = {
  image: string | File | File[];
  name: string;
  designation: string;
};

export type OurTeamTransfomedFormSchema = {
  company: {
    title: string;
    description: string;
  };
  teamFounders: OurTeamMemberSchema[];
  teamMembers: OurTeamMemberSchema[];
};

//////////////////////////////
//////////////////////////////
//////////////////////////////
// Contact Page
//////////////////////////////
//////////////////////////////
//////////////////////////////
export type ContactInfoSchema = {
  phone: string;
  email: string;
  location: string;
};

export type ContactPageSchema = {
  send_message: string;
  get_in_touch: string;
  caption: string;
  brand_name: string;
  inquiry: string;
  talk_to_an_expert: string;
  our_business_units: string;

  // Branches
  main_branch: ContactInfoSchema;
  kathmandu_branch: ContactInfoSchema;
  pokhara_branch: ContactInfoSchema;
};

//////////////////////////////
//////////////////////////////
//////////////////////////////
// Home Page
//////////////////////////////
//////////////////////////////
//////////////////////////////
export type HomePageSchema = {
  site_header: string;
  site_description: string;
  professional_guide_info: string;
  flexibility_info: string;
  local_and_authentic_info: string;
  trail_experts_info: string;
  category_header: string;
  sub_category_header: string;
  blogs_header: string;
  testimonials_header: string;
  footer_description: string;
};
