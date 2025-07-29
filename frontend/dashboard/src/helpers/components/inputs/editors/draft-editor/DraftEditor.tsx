// Import - default
import { useRef, useState } from "react";
import {
  Editor,
  RichUtils,
  convertToRaw,
  getDefaultKeyBinding,
  Modifier,
  EditorState,
} from "draft-js";

// Import - helpers
import CustomTypography from "../../../texts/CustomTypography";
import Toolbar from "./Toolbar";

// Import - utils
import * as em from "@/utils/methods/editor-methods";

// Main
const DraftEditor = (props: any) => {
  // Props
  const {
    errorMessage,
    isCommon,
    isFullDiv,
    onChange,
    name,
    label,
    value,
    trigger,
    setValue,
  } = props;

  // Ref
  const editor = useRef<any>(null);

  // States
  const [editorState, setEditorState] = useState(em.createEditorState(value));

  // Css
  const className = isCommon
    ? "relative col-span-12 md:col-span-6"
    : isFullDiv
    ? "relative col-span-12"
    : "";
  const errorCss = errorMessage ? "!border-[2px] !border-red-400" : "";

  // Focus in the editor
  const focusEditor = () => {
    editor.current !== null && editor.current.focus();
  };

  // Handle key command
  const handleKeyCommand: any = (command: any) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
  };

  // Custom key binding function
  const customKeyBindingFn = (e: any) => {
    if (e.keyCode === 9 /* TAB */) {
      return "tab";
    }
    return getDefaultKeyBinding(e);
  };

  // Function to add a link
  const addLink = (url: string) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const contentStateWithLink = Modifier.applyEntity(
      contentState,
      selection,
      entityKey
    );
    const newEditorState = EditorState.push(
      editorState,
      contentStateWithLink,
      "apply-entity"
    );
    setEditorState(newEditorState);
  };

  // Handler for link insertion (e.g., called by a toolbar button)
  const handleAddLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      addLink(url);
    }
  };

  return (
    <div className={className}>
      <CustomTypography variant="h6" className="text-blue-gray-700">
        {label ?? "Name"}
      </CustomTypography>
      <div
        className={`${errorCss} draft-editor editor-wrapper transition-all ease-in-out`}
        onClick={focusEditor}
      >
        <Toolbar
          editorState={editorState}
          setEditorState={setEditorState}
          onAddLink={handleAddLink} // Pass link handler to toolbar
        />
        <div className="editor-container">
          <Editor
            ref={editor}
            handleKeyCommand={handleKeyCommand}
            editorState={editorState}
            customStyleMap={em.styleMap} // Ensure LINK style is defined
            blockStyleFn={em.myBlockStyleFn}
            keyBindingFn={customKeyBindingFn}
            onChange={(editorState) => {
              const contentState = editorState.getCurrentContent();
              setEditorState(editorState);
              const rawContent = convertToRaw(contentState);
              const value = rawContent;
              onChange && onChange(value);
              trigger && trigger(name ?? "description");
              setValue && setValue(name ?? "description", value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DraftEditor;
