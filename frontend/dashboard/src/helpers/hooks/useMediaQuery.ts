"use client";

// Default
import { useState, useEffect, useCallback } from "react";

// Main
const useMediaQuery = (width: number): boolean => {
  // Original state
  const [targetReached, setTargetReached] = useState<boolean>(false);

  // Callback when the target is matched
  const updateTarget = useCallback((e: MediaQueryListEvent) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  // Listen to the change in window width
  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener("change", updateTarget);

    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener("change", updateTarget);
  }, [width, updateTarget]);

  return targetReached;
};

export default useMediaQuery;
