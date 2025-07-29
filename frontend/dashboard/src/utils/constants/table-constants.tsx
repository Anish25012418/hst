// Import - default
import { Chip } from "@material-tailwind/react";
import { color } from "@material-tailwind/react/types/components/chip";

// Import - helpers
import { CustomTooltip, CustomTypography, Image } from "@/helpers/components";

// Import - utils
import { formatIsoStringDate } from "../methods/datetime-methods";
import { GetTableActionsSchema } from "../schemas/OthersSchema";
import { Editor } from "draft-js";
import { createEditorState } from "../methods/editor-methods";
import { getImageSrc } from "../methods/image-methods";
import { formatPrice } from "../methods/string-methods";

// Table actions
export const getTableActions = (params: GetTableActionsSchema) => {
  // Params
  const {
    store,
    item,

    // Handers
    handlePost: handlePostAction,
    handleGetById: handleGetByIdAction,
    handleUpdate: handleUpdateAction,
    handleDelete: handleDeleteAction,

    // Hide if needed
    hidePost,
    hideGetById,
    hideUpdate,
    hideDelete,
  } = params;

  // When the delete button is clicked
  const handleDelete = () => {
    // Return nothing if the delete is hidden
    if (hideDelete) {
      return () => {};
    }

    // When the handler for delete is already provided
    if (handleDeleteAction) {
      handleDeleteAction();
      return;
    }
    store.setForm({ type: "delete", isOpen: true, item });
  };

  // When the add button is clicked
  const handlePost = () => {
    // Return nothing if the view is hidden
    if (hidePost) {
      return () => {};
    }

    // When the handler for view is already provided
    if (handlePostAction) {
      handlePostAction();
      return;
    }
    store.setForm({ type: "post", isOpen: true, item });
  };

  // When the view button is clicked
  const handleGetById = () => {
    // Return nothing if the view is hidden
    if (hideGetById) {
      return () => {};
    }

    // When the handler for view is already provided
    if (handleGetByIdAction) {
      handleGetByIdAction();
      return;
    }
    store.setForm({ type: "getById", isOpen: true, item });
  };

  // When the edit button is clicked
  const handleUpdate = () => {
    // Return nothing if the edit is hidden
    if (hideUpdate) {
      return () => {};
    }

    // When the handler for edit is already provided
    if (handleUpdateAction) {
      handleUpdateAction();
      return;
    }
    store.setForm({ type: "update", isOpen: true, item });
  };

  // Additional actions required for table
  const handleTableActions = {
    // Handlers
    handlePost,
    handleDelete,
    handleUpdate,
    handleGetById,

    // Hide if needed
    hidePost,
    hideDelete,
    hideUpdate,
    hideGetById,
  };

  return handleTableActions;
};

// Component : Feature image section in avatar mode for table
export const TableAvatarImage = (props: any) => {
  // Props
  const { imgPath, title } = props;
  return (
    <div className="flex items-center gap-1">
      <Image
        src={getImageSrc(imgPath)}
        alt={`Image for ${title}`}
        divCss="w-[36px] h-[36px] min-w-[36px] min-h-[36px] rounded-full p-0.5 border-2 border-brand-yellow-700"
        imgCss="w-full h-full rounded-full object-cover"
      />
      {title}
    </div>
  );
};

// Component : Show readable date format
export const TableDate = (props: any) => {
  // Props
  const { isoString } = props;

  return (
    <CustomTypography className="font-medium">
      {formatIsoStringDate(isoString)}
    </CustomTypography>
  );
};

// Component : Show readable date format
export const TableSnNumber = (props: any) => {
  // Props
  const { idx } = props;

  return (
    <CustomTypography className="font-bold" variant="paragraph">
      {idx}
    </CustomTypography>
  );
};

// Component : Display content, description and such in drafteditor format
export const TableDetails = (props: any) => {
  // Props
  const { details } = props;

  return (
    <div className="line-clamp-1">
      <Editor
        editorState={createEditorState({ ...details, entityMap: {} })}
        readOnly={true}
        onChange={() => undefined}
      />
    </div>
  );
};

// Component : Show readable date format
export const TablePrice = (props: any) => {
  // Props
  const { price } = props;

  // Variables
  const result = formatPrice(price);

  return (
    <CustomTypography className="font-semibold text-[16px]">
      {result}
    </CustomTypography>
  );
};

// Component : Show readable date format
export const TableFitnessTag = (props: any) => {
  // "blue-gray" | "gray" | "brown" | "deep-orange" | "orange" | "amber" | "yellow" | "lime" | "light-green" | "green" | "teal" | "cyan" | "light-blue" | "blue" | "indigo" | "deep-purple" | "purple" | "pink" | "red";
  const skillsColor: { [key: string]: color } = {
    Basic: "green",
    Moderate: "orange",
    "Moderate to High": "brown",
    High: "deep-purple",
    Other: "blue-gray",
  };

  const skillsContent: { [key: string]: string } = {
    Basic: "For beginners with light exercises to build a foundation.",
    Moderate: "Balanced workouts for a moderately active lifestyle.",
    "Moderate to High": "Intense training for active individuals.",
    High: "Rigorous workouts for peak performance.",
  };

  // Props
  const { fitnessLevel } = props;

  return (
    <CustomTooltip content={skillsContent[fitnessLevel]}>
      <Chip
        variant="ghost"
        color={skillsColor[fitnessLevel]}
        value={fitnessLevel}
        className="w-fit py-1 rounded-none"
      />
    </CustomTooltip>
  );
};

// Component : Show readable date format
export const TableGroupSize = (props: any) => {
  // "blue-gray" | "gray" | "brown" | "deep-orange" | "orange" | "amber" | "yellow" | "lime" | "light-green" | "green" | "teal" | "cyan" | "light-blue" | "blue" | "indigo" | "deep-purple" | "purple" | "pink" | "red";
  const groupSizesColor: { [key: string]: color } = {
    // "Small (2-5)": "cyan",
    // "Medium (6-12)": "light-green",
    // "Large (13-20)": "deep-orange",
    // "Extra Large (21+)": "pink",
    "Min. 2 Pax": "amber",
    "Max. 16 Pax": "light-green",
    Other: "cyan",
  };
  const groupSizesContent: { [key: string]: string } = {
    "Min. 2 Pax": "Minimum 2 participants required.",
    "Max. 16 Pax": "Maximum 16 participants allowed.",
    Other: "Various other group sizes",

    // "Small (2-5)": "Suitable for close-knit meetings",
    // "Medium (6-12)": "Ideal for small group activities",
    // "Large (13-20)": "Good for medium-sized events",
    // "Extra Large (21+)": "Perfect for large gatherings",
    // Other: "Various other group sizes",
  };

  // Props
  const { size } = props;

  return (
    <CustomTooltip
      content={groupSizesContent[size] ?? groupSizesContent["Other"]}
    >
      <Chip
        variant="gradient"
        color={groupSizesColor[size]}
        value={Array.isArray(size) ? size.join(" + ") : size}
        className="w-fit py-1 rounded-none"
      />
    </CustomTooltip>
  );
};
