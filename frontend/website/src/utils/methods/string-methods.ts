/**
 * @title : string-methods
 * @description: string specific methods used in the website
 *
 **/

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

export const normalizeFilename = (filename: string): string => {
  const [name, extension] = filename.split(/(?=\.[^.]+$)/);
  const normalized = name.replace(/__+/g, "_");
  return `${normalized}${extension}`;
};
