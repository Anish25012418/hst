// Import - efault
import { BiSolidEdit, BiSolidTrash } from "react-icons/bi";
import { FaEye, FaPlus } from "react-icons/fa";

// Assets
import { iconsCss } from "@/assets/css/styles/components-styles";

// Helpers
// import { default as IconButton } from "@/helpers/components/buttons/IconButton";
import CustomTooltip from "../animations/CustomTooltip";
import CustomButton from "../buttons/CustomButton";

// Utils
import { GetTableActionsSchema } from "@/utils/schemas/OthersSchema";
import { useRef } from "react";

// Icon actions constant
const iconActions = (props: GetTableActionsSchema) => {
  return [
    // {
    //   name: "add-service",
    //   content: "Add service",
    //   icon: <RiFolderAddLine className={iconsCss.post} />,
    //   onClick: props?.handlePostServiceAction,
    // },
    // {
    //   name: "migrate",
    //   content: "Migrate services to store",
    //   icon: <TbTransferIn className={iconsCss.post} />,
    //   onClick: props?.handleMigrateAction,
    // },
    {
      name: "getById",
      content: props?.contentGetById ?? "View",
      icon: <FaEye className={iconsCss.view} />,
      onClick: props?.handleGetById,
    },
    {
      name: "post",
      content: props?.contentPost ?? "Add",
      icon: <FaPlus className={iconsCss.post} />,
      onClick: props?.handlePost,
    },
    {
      name: "update",
      content: props?.contentUpdate ?? "Edit",
      icon: <BiSolidEdit className={iconsCss.edit} />,
      onClick: props?.handleUpdate,
    },
    {
      name: "delete",
      content: props?.contentDelete ?? "Delete",
      icon: <BiSolidTrash className={iconsCss.delete} />,
      onClick: props?.handleDelete,
    },
    // {
    //   name: "show-completed",
    //   content: "Complete item",
    //   icon: <FaCheck className={iconsCss.success} />,
    //   onClick: props?.handleShowCompletedAction,
    // },
    // {
    //   name: "show-cancelled",
    //   content: "Cancel item",
    //   icon: <FaTimes className={iconsCss.delete} />,
    //   onClick: props?.handleShowCancelledAction,
    // },
  ];
};

const TableActions = (props: GetTableActionsSchema) => {
  const iconRef = useRef(null);

  // Variables
  let actualIcons = [...iconActions({ ...props })];

  // Modify actual icons
  if (props?.hideDelete) {
    actualIcons = actualIcons.filter(({ name }) => name !== "delete");
  }

  if (props?.hideGetById) {
    actualIcons = actualIcons.filter(({ name }) => name !== "getById");
  }

  if (props?.hidePost) {
    actualIcons = actualIcons.filter(({ name }) => name !== "post");
  }

  if (props?.hideUpdate) {
    actualIcons = actualIcons.filter(({ name }) => name !== "update");
  }

  return (
    <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
      {actualIcons?.map((item: any, idx: number) => (
        <CustomTooltip
          key={`${idx}. TableAction IconButton`}
          content={item?.content}
        >
          {/* <IconButton ref={iconRef} {...item} /> */}
          <CustomButton
            ref={iconRef}
            className="p-0 m-0 rounded-none"
            disabled={props?.isDisabled}
            {...item}
          />
        </CustomTooltip>
      ))}
    </div>
  );
};

export default TableActions;
