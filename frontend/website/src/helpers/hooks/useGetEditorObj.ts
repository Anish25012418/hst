// Check if the block value is empty or not
export const useGetEditorObj = (content: string | undefined) => {
  const result = { obj: { blocks: [], entityMap: {} }, isFlag: false };
  if (content) {
    const parsedContent = JSON.parse(content);

    const truthyCondition =
      parsedContent && parsedContent.blocks && parsedContent.blocks.length;

    result.obj = truthyCondition ? parsedContent : {};
    result.isFlag = !!truthyCondition;
    return result;
  } else return result;
};
