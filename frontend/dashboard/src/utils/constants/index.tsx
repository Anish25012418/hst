// delete modal props
export const deleteModalProps = (name?: any) => ({
  question: (
    <>
      Are you sure you want to delete{" "}
      <span className="underline text-red-300">{name}</span>?
    </>
  ),
  caption: "Please note that you cannot undo this action.",
  okPrompt: "Delete",
  cancelPrompt: "Cancel",
});
