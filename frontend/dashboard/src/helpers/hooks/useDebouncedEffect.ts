// Import - default
import { useEffect, useState } from "react";

// Import - utils
import { CallbackFunctionSchema } from "@/utils/schemas/GlobalSchema";

// Main
const useDebouncedEffect = (
  callback: CallbackFunctionSchema,
  delay: number,
  dependencies: any[]
) => {
  const [debouncedCallback, setDebouncedCallback] =
    useState<CallbackFunctionSchema>(() => callback);

  useEffect(() => {
    const handler = setTimeout(() => {
      debouncedCallback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [...dependencies, debouncedCallback]);

  useEffect(() => {
    setDebouncedCallback(() => callback);
  }, [callback]);
};

export default useDebouncedEffect;
