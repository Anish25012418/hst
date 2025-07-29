// Relative
import { Metadata } from "next";
import * as common from "./common";
import { HomePageIconMetadata } from "./custom";

// Homepage or Landing page
export const HomePageMetadata: Metadata = {
  ...common.icons_metadata,
  ...HomePageIconMetadata,
  ...common.authors_metadata,
  title: "Himalayan Single Track",
  description: "Description on Himalayan Single Track",
  keywords: ["himalayan", "single", "track", "tour", "mtb"],
};
