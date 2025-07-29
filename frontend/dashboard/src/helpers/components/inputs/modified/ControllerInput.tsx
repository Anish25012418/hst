// Import - default
import React from "react";
import { Controller } from "react-hook-form";

// Import - elative
import DateInput from "../common/DateInput";
import EmailInput from "../common/EmailInput";
import ImageInput from "../common/ImageInput";
import PasswordInput from "../common/PasswordInput";
import SelectInput from "../common/SelectInput";
import TextAreaInput from "../common/TextAreaInput";
import TextInput from "../common/TextInput";
import NumberInput from "../common/NumberInput";
import ToggleInput from "../common/ToggleInput";
import AnimateSelectInput from "./AnimateSelectInput";
import DraftEditor from "../editors/draft-editor/DraftEditor";

// Main
// const ControllerInput = React.forwardRef((props: any, ref: any) => {
const ControllerInput = React.forwardRef((props: any, ref: any) => {
  // Props
  const { name, control, type, isFullDiv, ...rest } = props;

  // Css
  const commonDiv = "col-span-12 md:col-span-6";
  const fullDiv = "col-span-12";
  const className = isFullDiv ? fullDiv : commonDiv;

  // Determine which input component to render based on the type prop
  const InputComponent =
    type === "text"
      ? TextInput
      : type === "number"
      ? NumberInput
      : type === "textarea"
      ? TextAreaInput
      : type === "date"
      ? DateInput
      : type === "email"
      ? EmailInput
      : type === "password"
      ? PasswordInput
      : type === "select"
      ? SelectInput
      : type === "react-select"
      ? AnimateSelectInput
      : type === "radio"
      ? ToggleInput
      : type === "image"
      ? ImageInput
      : type === "draft-editor"
      ? DraftEditor
      : TextInput;

  return (
    // <div ref={ref} className={className}>
    <div className={className}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          // <InputComponent ref={ref} {...field} {...rest} />
          const { onChange: fieldOnChange } = field;
          const { onChange: restOnChange } = rest;

          const onChange = (e: any) => {
            fieldOnChange(e);
            restOnChange && restOnChange(e);
          };

          const props = { ...rest, onChange, name };
          return <InputComponent {...props} ref={ref} />;
        }}
      />
    </div>
  );
});

export default ControllerInput;
