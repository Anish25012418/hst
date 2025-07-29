import * as FaIcons from "react-icons/fa";
import { RichUtils, EditorState, Modifier } from "draft-js";

const Toolbar = (props: any) => {
  const { editorState, setEditorState } = props;

  // Define toolbar buttons and their associated actions
  const tools: any = [
    {
      label: "Link",
      style: "LINK",
      icon: <FaIcons.FaLink />,
      method: "link",
    },
    {
      label: "Bold",
      style: "BOLD",
      icon: <FaIcons.FaBold />,
      method: "inline",
    },
    {
      label: "Italic",
      style: "ITALIC",
      icon: <FaIcons.FaItalic />,
      method: "inline",
    },
    {
      label: "Underline",
      style: "UNDERLINE",
      icon: <FaIcons.FaUnderline />,
      method: "inline",
    },
    {
      label: "Strike-through",
      style: "STRIKETHROUGH",
      icon: <FaIcons.FaStrikethrough />,
      method: "inline",
    },
    {
      label: "Superscript",
      style: "SUPERSCRIPT",
      icon: <FaIcons.FaSuperscript />,
      method: "inline",
    },
    {
      label: "Subscript",
      style: "SUBSCRIPT",
      icon: <FaIcons.FaSubscript />,
      method: "inline",
    },
    {
      label: "Monospace",
      style: "CODE",
      icon: <FaIcons.FaTextWidth />,
      method: "inline",
    },
    {
      label: "Blockquote",
      style: "blockquote",
      icon: <FaIcons.FaQuoteRight />,
      method: "block",
    },
    {
      label: "Unordered List",
      style: "unordered-list-item",
      icon: <FaIcons.FaListUl />,
      method: "block",
    },
    {
      label: "Ordered List",
      style: "ordered-list-item",
      icon: <FaIcons.FaListOl />,
      method: "block",
    },
    {
      label: "Horizontal Line",
      style: "HORIZONTAL_LINE",
      method: "insert",
      icon: "—",
    },
  ];

  // Function to insert a horizontal line
  const insertHorizontalLine = (editorState: any) => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const newContentState = Modifier.insertText(
      contentState,
      selection,
      "\u200B\n———————————————————\n" // Adjust the horizontal line text as needed
    );
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      "insert-characters"
    );
    return EditorState.forceSelection(
      newEditorState,
      newContentState.getSelectionAfter()
    );
  };

  // Function to prompt for a link and apply it
  const promptForLink = () => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const url = window.prompt("Enter the URL:");
      if (url) {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
          "LINK",
          "MUTABLE",
          { url }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newContentState = Modifier.applyEntity(
          contentStateWithEntity,
          selection,
          entityKey
        );
        const newEditorState = EditorState.push(
          editorState,
          newContentState,
          "apply-entity"
        );
        setEditorState(newEditorState);
      }
    } else {
      alert("Please select some text to create a link.");
    }
  };

  // Function to remove a link
  const removeLink = () => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      setEditorState(RichUtils.toggleLink(editorState, selection, null));
    }
  };

  // Apply style or method based on the button clicked
  const applyStyle = (e: any, style: any, method: any) => {
    e.preventDefault();
    if (method === "insert") {
      setEditorState(insertHorizontalLine(editorState));
    } else if (method === "link") {
      const selection = editorState.getSelection();
      const contentState = editorState.getCurrentContent();
      const startKey = selection.getStartKey();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(
        selection.getStartOffset()
      );

      if (linkKey) {
        removeLink();
      } else {
        promptForLink();
      }
    } else {
      setEditorState(
        method === "block"
          ? RichUtils.toggleBlockType(editorState, style)
          : RichUtils.toggleInlineStyle(editorState, style)
      );
    }
  };

  // Check if the style is active
  const isActive = (style: any, method: any) => {
    if (method === "block") {
      const selection = editorState.getSelection();
      const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
      return blockType === style;
    } else if (method === "insert") {
      return false; // Horizontal line cannot be "active"
    } else if (method === "link") {
      const selection = editorState.getSelection();
      const contentState = editorState.getCurrentContent();
      const startKey = selection.getStartKey();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(
        selection.getStartOffset()
      );

      return !!linkKey;
    } else {
      const currentStyle = editorState.getCurrentInlineStyle();
      return currentStyle.has(style);
    }
  };

  return (
    <div className="editor-toolbar">
      {tools.map((tool: any, index: any) => (
        <button
          key={index}
          type="button"
          onMouseDown={(e) => applyStyle(e, tool.style, tool.method)}
          className={`toolbar-button ${
            isActive(tool.style, tool.method) ? "active" : ""
          }`}
        >
          {tool.icon}
        </button>
      ))}
    </div>
  );
};

export default Toolbar;
