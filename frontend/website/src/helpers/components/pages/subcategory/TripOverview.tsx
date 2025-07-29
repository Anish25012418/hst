"use client";
// Defaults
import { Editor } from "draft-js";

// Helpers
import { CustomTypography } from "@/helpers/components";
import { useCreateEditorState } from "@/helpers/hooks/useCreateEditorState";

const TripOverview = (props: any) => {
  // Props
  const { overview, extendCss } = props;

  const editorState = useCreateEditorState(JSON.stringify(overview));

  return (
    <div
      id="overview"
      className={`${
        extendCss ? `${extendCss} ` : ""
      }mx-[50px] md:mx-[105px] my-4 flex`}
    >
      <div>
        <CustomTypography className="text-2xl font-bold mb-2" isPermanentFont>
          Trip Overview
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

export default TripOverview;
