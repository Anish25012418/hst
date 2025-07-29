"use client";
// Default
import React from "react";
import Image from "next/image";
import { Editor } from "draft-js";

// Helpers
import { CustomTypography } from "@/helpers/components";
// import { useGetEditorObj } from "@/helpers/hooks/useGetEditorObj";
import { useCreateEditorState } from "@/helpers/hooks/useCreateEditorState";
import { getApiImg } from "@/utils/methods/img-methods";

const DescriptionSection = (props: any) => {
  // Hooks
  const { header, image, description, resSize, extendCss } = props;

  // Convert the draft editor to readable HTML
  const editorState = useCreateEditorState(JSON.stringify(description));

  return (
    <div
      className={`${
        extendCss ? `${extendCss} ` : ""
      } mx-[50px] md:mx-[105px] mt-6 my-4`}
    >
      <CustomTypography className="text-xl md:text-3xl font-bold text-center">
        {header}
      </CustomTypography>
      <div className={`${resSize} gap-10 my-4`}>
        <div className="transition duration-300 hover:scale-105 cursor-pointer">
          <Image
            src={getApiImg(image)}
            alt="rental page"
            width={10}
            height={10}
            className="h-[200px] md:h-[400px] w-full object-cover"
          />
        </div>
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
export default DescriptionSection;
