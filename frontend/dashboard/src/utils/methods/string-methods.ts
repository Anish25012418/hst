// Import - default
import { v4 as uuidv4 } from "uuid";

////////////////////////////////////////
////////////////////////////////////////
// Convert string to camel case
////////////////////////////////////////
////////////////////////////////////////
export const toCamelCase = (title?: string) => {
  if (typeof title !== "string" || !title.trim()) {
    return "";
  }

  return title
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word, index) => {
      if (index === 0) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
};

// Input - john
// Output - John
export const capitalizeString = (str?: string | null): string => {
  if (str === undefined || str === null) {
    return ""; // Or handle these cases as per your requirement
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Input: convert_snake_case_to_title_case
// Output: Convert Snake Case To Title Case
export const snakeCaseToTitleCase = (str?: string): string => {
  if (!str || str.trim() === "") {
    return "";
  }

  return str
    ?.split("_")
    ?.map((word) => word.charAt(0).toUpperCase() + word?.slice(1))
    ?.join(" ");
};

// Mainly used while mapping over react elements for their effective render as unique item
export const getUniqueKey = (idx: number, value: string) => `${idx}. ${value}`;

export const generateUniqueId = () => {
  return uuidv4();
};

// Examples
// console.log(toTitleCase('camelCaseExample')); // Camel Case Example
// console.log(toTitleCase('snake_case_example')); // Snake Case Example
// console.log(toTitleCase('any-other-case-example')); // Any Other Case Example
// console.log(toTitleCase('kebab-case-example')); // Kebab Case Example
// Converting camelCase to a space-separated string.
// Replacing underscores, hyphens, and other non-alphanumeric characters with spaces.
// Converting each word to title case by capitalizing the first letter and making the rest of the letters lowercase.
export function toTitleCase(input: string): string {
  // Replace camelCase with spaces
  const camelCaseToSpaces = input.replace(/([a-z])([A-Z])/g, "$1 $2");

  // Replace snake_case and other non-alphanumeric characters with spaces
  const cleanedString = camelCaseToSpaces.replace(/[_\-]/g, " ");

  // Convert to title case
  const titleCased = cleanedString.replace(/\w\S*/g, (word) => {
    return `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;
  });

  return titleCased;
}

////////////////////////////////////////
////////////////////////////////////////
// Convert string to snake case
////////////////////////////////////////
////////////////////////////////////////
export const toSnakeCase = (title?: string) => {
  if (typeof title !== "string" || !title.trim()) {
    return "";
  }
  // Replace spaces and dashes with underscores, convert to lowercase, and reduce multiple underscores to a single one
  return title
    .trim()
    .replace(/[\s-]+/g, "_") // Replace spaces and dashes with underscores
    .replace(/[^\w_]/g, "") // Remove all non-word characters except underscores
    .replace(/_+/g, "_") // Reduce multiple underscores to a single one
    .toLowerCase();
};

// Input: "This is an Example_string";
// Output: "this-is-an-example-string"
export const toParamCase = (str: string | undefined | null): string => {
  if (str == null) {
    return "";
  }

  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2") // Insert hyphen between camelCase words
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/_/g, "-") // Replace underscores with hyphens
    .toLowerCase(); // Convert to lowercase
};

// Convert price in terms of dollar
export const formatPrice = (price: string | number, currency?: any) => {
  const number = Number(price);
  const validNumber = isNaN(number) ? 0 : number;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency ?? "USD",
  }).format(validNumber);
};

////////////////////////////////////////
////////////////////////////////////////
// Convert file name to snake case
////////////////////////////////////////
////////////////////////////////////////
export const convertFileNameToSnakeCase = (fileName?: string): string => {
  if (!fileName) {
    return ""; // Handle undefined or null by returning an empty string
  }

  const lastDotIndex = fileName.lastIndexOf(".");
  if (lastDotIndex === -1) {
    return toSnakeCase(fileName); // No extension found
  }

  const name = fileName.substring(0, lastDotIndex);
  const extension = fileName.substring(lastDotIndex + 1);
  return `${toSnakeCase(name)}.${extension}`;
};

////////////////////////////////////////
////////////////////////////////////////
// Convert numbers from 1 to 10 into their corresponding English words using a simple lookup
////////////////////////////////////////
////////////////////////////////////////
export const numberToWords = (num: number): string => {
  const numWords: string[] = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
  ];

  if (num < 1 || num > 10) {
    throw new Error("Input number must be between 1 and 10");
  }

  return numWords[num - 1];
};
