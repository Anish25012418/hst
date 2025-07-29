// Default
import { EditorState, convertFromRaw } from "draft-js";

// Convert the Editor State data to display in proper format
export const useCreateEditorState = (content: string | undefined) => {
  try {
    if (content) {
      const parsedContent: any = JSON.parse(content);
      return parsedContent &&
        parsedContent.blocks &&
        parsedContent.blocks.length
        ? EditorState.createWithContent(
            convertFromRaw({ ...parsedContent, entityMap: {} })
          )
        : EditorState.createEmpty();
    } else {
      return EditorState.createEmpty();
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
    // Handle the error gracefully, such as displaying a default message or fallback content
    return EditorState.createEmpty();
  }
};
