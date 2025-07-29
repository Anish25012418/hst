// Type Definitions
export type SlugTypeSchema =
  | "home"
  | "category"
  | "sub-category"
  | "why-us"
  | "our-team"
  | "social-responsibility"
  | "contact"
  | "rental"
  | "workshop"
  | "blog"
  | "blogs"
  | "hst-pokhara"
  | "kathmandu-day-trips"
  | "pokhara-day-trips";

export type SlugSchema = {
  slug: string[];
  type: SlugTypeSchema;
};
