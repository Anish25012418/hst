// Views
import { fetchHomepageData } from "@/utils/data/api/api-service";
import { SlugSchema, SlugTypeSchema } from "@/utils/schemas/AppSchema";
import * as Pages from "@/views/pages";

// Static Paths
const staticPaths: SlugSchema[] = [
  { slug: [], type: "home" },
  { slug: ["home"], type: "home" },
  { slug: ["about"], type: "category" },
  { slug: ["about", "why-us"], type: "why-us" },
  { slug: ["about", "our-team"], type: "our-team" },
  { slug: ["about", "social-responsibility"], type: "social-responsibility" },
  { slug: ["contact"], type: "contact" },
  { slug: ["rental"], type: "rental" },
  { slug: ["workshop"], type: "workshop" },
  { slug: ["blog"], type: "blog" },
  { slug: ["blogs"], type: "blogs" },
  { slug: ["hst-pokhara"], type: "hst-pokhara" },
  { slug: ["kathmandu-day-trips"], type: "kathmandu-day-trips" },
  { slug: ["pokhara-day-trips"], type: "pokhara-day-trips" },
  // Uncomment and integrate with API later
  // { slug: ["cycle-tour"], type: "category" },
  // { slug: ["multi-adventure"], type: "category" },
  // { slug: ["trekking"], type: "category" },
  // { slug: ["bhutan"], type: "category" },
  // { slug: ["mtb-tours", "enduro"], type: "category" },
  // { slug: ["mtb-tours", "cross-country"], type: "category" },
  // { slug: ["mtb-tours", "heli-biking"], type: "category" },
  // { slug: ["day-overnight-trip", "kathmandu"], type: "category" },
  // { slug: ["day-overnight-trip", "pokhara"], type: "category" },
  // { slug: ["day-overnight-trip", "overnight-trips"], type: "category" },
  // { slug: ["day-overnight-trip", "skill-sessions"], type: "category" },
  // { slug: ["mtb-tours", "enduro", "kingdom-of-enduro"], type: "sub-category" },
];

// Define and export the generateStaticParams function
export async function generateStaticParams(): Promise<SlugSchema[]> {
  try {
    const homepageResponse = await fetchHomepageData();
    const combinedPaths = [...staticPaths, ...homepageResponse];
    // console.log("combinedPaths", combinedPaths);
    return combinedPaths;
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return []; // Handle error case appropriately
  }
}

// Main component
export default async function DynamicPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const slugArray = params.slug || [];
  const slug = slugArray.join("/");

  // Redirect to home page for specific slugs
  if (["", "home", "/"].includes(slug)) {
    return <Pages.HomePage />;
  }

  const paths = await generateStaticParams();

  // Find the matching path
  const matchingPath = paths.find(
    (item) => JSON.stringify(slugArray) === JSON.stringify(item.slug)
  );

  // Map type values to their corresponding components
  const pageMap: Record<SlugTypeSchema, JSX.Element> = {
    home: <Pages.HomePage />,
    category: <Pages.CategoryPage slug={slug} />,
    "sub-category": <Pages.SubcategoryPage slug={slug} />,
    "why-us": <Pages.WhyUsPage />,
    "our-team": <Pages.OurTeamPage />,
    "social-responsibility": <Pages.SocialResponsibilityPage />,
    contact: <Pages.ContactPage />,
    rental: <Pages.RentalPage />,
    workshop: <Pages.WorkshopPage />,
    blog: <Pages.BlogPage slug={slug}/>,
    "hst-pokhara": <Pages.HstPokharaPage />,
    blogs: <Pages.BlogsPage />,
    "kathmandu-day-trips": <Pages.KathmanduDayTripsPage />,
    "pokhara-day-trips": <Pages.PokharaDayTripsPage />,
  };

  // Return the component based on type or default to ErrorPage
  return matchingPath ? pageMap[matchingPath.type] : <Pages.ErrorPage />;
}
