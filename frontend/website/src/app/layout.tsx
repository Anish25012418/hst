// Default
import type { Metadata } from "next";

// Assets
import "draft-js/dist/Draft.css";
import "@/assets/css/globals.css";
import "@/assets/css/swiper.css";
import "@/assets/css/scrollbar.css";
import "@/assets/css/draft-editor.css";

// Utils
import { DefaultLayoutSchema } from "@/utils/schemas/GlobalSchema";
import { HomePageMetadata } from "@/utils/seo/metadata/all";

// Views
import { PublicLayout } from "@/views/layouts";

// Metadata for layout - root layout
export const metadata: Metadata = HomePageMetadata;

// Main
export default function RootLayout(props: DefaultLayoutSchema) {
  return <PublicLayout {...props} />;
}
