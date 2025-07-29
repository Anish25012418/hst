"use client";
import React from "react";
import CustomTypography from "../../texts/CustomTypography";
import { Editor } from "draft-js";
import { useCreateEditorState } from "@/helpers/hooks/useCreateEditorState";

const SubCatDescp = (props: any) => {
  // Props
  const { description, extendCss } = props;
  const editorState = useCreateEditorState(JSON.stringify(description));

  return (
    <div
      className={`${
        extendCss ? `${extendCss} ` : ""
      }mx-[50px] md:mx-[105px] my-4 flex`}
    >
      <div className="">
        <CustomTypography className="text-2xl font-bold" isPermanentFont>
          Description
        </CustomTypography>
        <div>
          <Editor
            editorState={editorState}
            readOnly={true}
            onChange={() => undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default SubCatDescp;
