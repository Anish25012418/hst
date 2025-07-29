// Import - default
import axios from "axios";

// Import - config
import { NEXT_PUBLIC_BACKEND_URL } from "@/config/env";

// Import - utils
import { SlugSchema } from "@/utils/schemas/AppSchema";

// Fetch the required homepage data
export async function fetchHomepageData(): Promise<SlugSchema[]> {
  try {
    const response = await axios.get(
      `${NEXT_PUBLIC_BACKEND_URL}/public/homepage`
    );

    // Check if the response is valid and contains the expected data structure
    // if (!response?.data?.data || !Array.isArray(response.data.data)) {
    //   console.error("Unexpected response structure:", response);
    //   return [];
    // }
    const res = response.data.data;
    const categories = res.categories
      ?.filter((item: any) => typeof item?.slug === "string")
      .map(({ slug }: { slug: string }) => ({
        slug: [slug],
        type: "category",
      }));

    const subcategories = res.subcategories
      ?.filter((item: any) => item?.slugs && Array.isArray(item.slugs))
      .map(({ slugs }: { slugs: string[] }) => ({
        slug:
          slugs[0]
            ?.split("/")
            .map((segment) => segment.replace(/^[-_]+|[-_]+$/g, "")) || [],
        type: "sub-category",
      }));

    const blogs = res.blogs
      ?.filter((item: any) => typeof item?.slug === "string")
      .map(({ slug }: { slug: string }) => ({
        slug: [slug],
        type: "blog",
      }));


    return [...categories, ...subcategories, ...blogs];
  } catch (error: unknown) {
    // Handle different types of errors specifically
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios error occurred while fetching homepage data:",
        error.message
      );
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
      }
    } else {
      console.error("Unexpected error occurred:", error);
    }

    // Return an empty array as a fallback
    return [];
  }
}

// Fetch categories
// export async function fetchCategories(): Promise<SlugSchema[]> {
//   try {
//     const response = await axios.get(
//       `${NEXT_PUBLIC_BACKEND_URL}/public/category`
//     );

//     if (!response?.data?.data || !Array.isArray(response.data.data)) {
//       console.error("Unexpected response structure:", response);
//       return [];
//     }

//     const result = response.data.data
//       .filter((item: any) => typeof item?.slug === "string")
//       .map(({ slug }: { slug: string }) => ({
//         slug: [slug],
//         type: "category",
//       }));

//     return result;
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     return [];
//   }
// }

// Fetch subcategories
// export async function fetchSubcategories(): Promise<SlugSchema[]> {
//   try {
//     const response = await axios.get(
//       `${NEXT_PUBLIC_BACKEND_URL}/public/subcategory`
//     );

//     // Check if response data structure is as expected
//     if (response?.data?.data && Array.isArray(response.data.data)) {
//       const result = response?.data?.data
//         .filter((item: any) => item?.slugs && Array.isArray(item.slugs))
//         .map(({ slugs }: { slugs: string[] }) => ({
//           slug:
//             slugs[0]
//               ?.split("/")
//               .map((segment) => segment.replace(/^[-_]+|[-_]+$/g, "")) || [],
//           type: "sub-category",
//         }));
//       return result;
//     } else {
//       console.error(
//         "Unexpected response structure for subcategories:",
//         response
//       );
//       return [];
//     }
//   } catch (error) {
//     console.error("Error fetching subcategories:", error);
//     return [];
//   }
// }
