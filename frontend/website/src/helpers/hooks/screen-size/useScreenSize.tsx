/* eslint-disable react-hooks/exhaustive-deps */
"use client";
// Default
import { useState, useEffect } from "react";

// Main
const useScreenSize = () => {
  const isClient = typeof window === "object";

  const getSize = () => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
      isMobile: isClient ? window.innerWidth <= 768 : undefined,
      isLessThanTablet: isClient ? window.innerWidth < 768 : undefined,
      isTablet: isClient
        ? window.innerWidth > 768 && window.innerWidth <= 1024
        : undefined,
      isMoreThanTablet: isClient ? window.innerWidth > 1024 : undefined,
      isPro: isClient
        ? window.innerWidth > 820 && window.innerWidth <= 1024
        : undefined,
      isLaptop: isClient
        ? window.innerWidth > 1024 && window.innerWidth <= 1366
        : undefined,
      isDesktop: isClient ? window.innerWidth > 1366 : undefined,
    };
  };

  const [screenSize, setScreenSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const handleResize = () => {
      setScreenSize(getSize());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient]); // Add an empty dependency array to run the effect only once

  return screenSize;
};

export default useScreenSize;
