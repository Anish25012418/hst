"use client";

import { useEffect, useState } from "react";

export default function useCheckWindow() {
  // State
  const [isWindowDefined, setIsWindowDefined] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsWindowDefined(false);
    } else {
      setIsWindowDefined(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeof window]);

  return isWindowDefined;
}
