"use client";
import React from "react";
import { Editor } from "draft-js";

// Helpers
import { CustomTypography } from "@/helpers/components";
import { useCreateEditorState } from "@/helpers/hooks/useCreateEditorState";

const IntroSection = (props: any) => {
  // Props
  const { heading, description } = props;

  // Convert the draft editor to readable HTML
  const editorState = useCreateEditorState(JSON.stringify(description));

  return (
    <div className="mx-[50px] md:mx-[105px] my-4 -translate-y-[200px]">
      <CustomTypography className="text-left md:text-center capitalize text-3xl font-bold pb-1">
        {heading}
      </CustomTypography>
      <Editor
        editorState={editorState}
        readOnly={true}
        onChange={() => undefined}
      />
    </div>
  );
};

export default IntroSection;
