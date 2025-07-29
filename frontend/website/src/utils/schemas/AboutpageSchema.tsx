////////////////////////////
// WHY US Section Schema
////////////////////////////
// Section with title, description, and image
export interface AboutSectionOneSchema {
  header1: string;
  para: string;
  leftImage: string;
  rightImageOne: string;
  rightImageTwo: string;
}

// Section with title and paragraph
export interface AboutSectionTwoSchema {
  header2: string;
  paragraph: string | string[];
}

// Section with title and list
export interface AboutSectionThreeSchema {
  header2: string;
  paragraph?: string;
  list?: string[];
}

////////////////////////////
// Our Team Schema
////////////////////////////
export interface TeamDescpSchema {
  title: string;
  descp: string;
}
export interface TeamSchema {
  image: string;
  name: string;
  designation: string;
}

////////////////////////////
// Social Responsibility Schema
////////////////////////////
// Social Responsibility Description (SRD)
type SRDSchema = {
  subHeader?: string;
  desp: string;
};

export interface SocialResponsibiltySchema {
  image: string;
  header: string;
  description: SRDSchema[];
}
