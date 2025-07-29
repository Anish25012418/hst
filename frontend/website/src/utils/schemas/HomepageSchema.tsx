/**
 * @title : ComponentSchema
 * @description: includes all of the schemas inside Homepage
 *
 **/

// Utils
import { IconSchema } from "@/utils/schemas/GlobalSchema";

// HST description
export type HomeDescriptionSchema = {
  title?: string;
  descp?: string;
};

// Basic descrption of homepage with
export type BasicDescriptionSchema = {
  title?: string;
  descp?: string;
  icon?: string;
  bgColor?: string;
  color?: string;
  review?: string;
};

// Social links
export type SocialLinksSchema = IconSchema & {
  label?: string;
  href?: string;
};

// Testimonial schema
export type TestimonialSchema = {
  img?: string;
  name?: string;
  star?: number;
  header?: string;
  descp?: string;
};

// Blog schema
export type BlogSchema = {
  img?: string;
  title?: string;
  descp?: string;
};
