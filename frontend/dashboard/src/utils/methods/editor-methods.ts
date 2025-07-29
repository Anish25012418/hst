// Default
import { EditorState, RawDraftContentState, convertFromRaw } from "draft-js";

// For inline styles
export const styleMap: any = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
  HIGHLIGHT: {
    backgroundColor: "#F7A5F7",
  },
  UPPERCASE: {
    textTransform: "uppercase",
  },
  LOWERCASE: {
    textTransform: "lowercase",
  },
  CODEBLOCK: {
    fontFamily: '"fira-code", "monospace"',
    fontSize: "inherit",
    background: "#ffeff0",
    fontStyle: "italic",
    lineHeight: 1.5,
    padding: "0.3rem 0.5rem",
    borderRadius: " 0.2rem",
  },
  SUPERSCRIPT: {
    verticalAlign: "super",
    fontSize: "80%",
  },
  SUBSCRIPT: {
    verticalAlign: "sub",
    fontSize: "80%",
  },
};

// For block level styles (Returns CSS Class From DraftEditor.css)
export const myBlockStyleFn = (contentBlock: any) => {
  const type = contentBlock.getType();
  switch (type) {
    case "blockquote":
      return "superFancyBlockquote";
    case "leftAlign":
      return "leftAlign";
    case "rightAlign":
      return "rightAlign";
    case "centerAlign":
      return "centerAlign";
    case "justifyAlign":
      return "justifyAlign";
    case "unordered-list-item":
      return "unordered-list-item-class";
    case "ordered-list-item":
      return "ordered-list-item-class";
    case "header-one":
      return "header-one-class";
    case "header-two":
      return "header-two-class";
    case "header-three":
      return "header-three-class";
    case "header-four":
      return "header-four-class";
    case "header-five":
      return "header-five-class";
    case "header-six":
      return "header-six-class";
    case "unstyled":
      return "unstyled-class";
    case "code-block":
      return "code-block-class";
    default:
      return "";
  }
};

// Types to be removed
export const removeDraftEditorSpacings = (data: any) => {
  const unwantedTypes: string[] = [
    "unstyled",
    "paragraph",
    "header-one",
    "header-two",
    "header-three",
    "header-four",
    "header-five",
    "header-six",
    "unordered-list-item",
    "ordered-list-item",
    "blockquote",
    "code-block",
    "atomic",
  ];

  // Filter out unwanted types and empty texts
  const blocks: any = data?.blocks?.filter((item: any) => {
    // return item;
    return unwantedTypes?.includes(item?.type) && item?.text !== "";
  });
  const cleanedData = { ...data, blocks, entityMap: {} };
  return cleanedData;
};

export const createEditorState = (content: any) => {
  try {
    if (content) {
      const parsedContent =
        typeof content === "string" ? JSON.parse(content) : content;
      const isParsedContent =
        parsedContent &&
        parsedContent.blocks &&
        Array.isArray(parsedContent.blocks) &&
        parsedContent.blocks.length > 0;

      if (isParsedContent)
        return EditorState.createWithContent(convertFromRaw(parsedContent));
    }
  } catch (error) {
    console.error("Error parsing content for editor state:", error);
  }

  // Fallback to empty editor state if content is undefined or parsing fails
  return EditorState.createEmpty();
};

export const getEditorObj = (content: string | undefined) => {
  if (content) {
    const parsedContent = JSON.parse(content);

    const truthyCondition =
      parsedContent && parsedContent.blocks && parsedContent.blocks.length;

    const result = truthyCondition ? parsedContent : {};
    return result;
  } else return {};
};

// Function to compare editor content with an empty editor content
export const checkEditorEmpty = (editorValue: RawDraftContentState) => {
  // Remove draft editor spacings from the provided editor value
  const normalizedEditorValue = removeDraftEditorSpacings(editorValue);

  // Check if the editor value is empty
  const isEmpty =
    !normalizedEditorValue ||
    !normalizedEditorValue?.blocks ||
    !normalizedEditorValue?.blocks.length ||
    !normalizedEditorValue?.blocks.some((block: any) => block?.text.trim());

  return isEmpty;
};

export const checkIfAllEditorsAreEmpty = (editors: any) =>
  Object.values(editors)?.every((item) =>
    checkEditorEmpty(item as RawDraftContentState)
  );

export const checkIfAllEditorsAreSameValue = (
  editors: any,
  actualEditors: any
) =>
  Object?.values(editors)
    ?.slice(0, 4)
    ?.some((item: any, idx: number) => {
      const label =
        idx === 0
          ? "overview"
          : idx === 1
          ? "precare"
          : idx === 2
          ? "aftercare"
          : "disclaimer";
      return actualEditors[label] === JSON.stringify(item);
    });

// const itemsOverview: any = createEditorState(overview);
// const itemdisclaimer: any = createEditorState(disclaimer);
// const itemsPrecare: any = createEditorState(precare);
// const itemsAftercare: any = createEditorState(aftercare);
// const longDescription: any = createEditorState(long_description);
