import { useState, useEffect } from "react";

const useScreenSize = () => {
  // States
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isLessThan400: window.innerWidth <= 400,
    isMoreThan400: window.innerWidth > 400,
    isLessThan600: window.innerWidth <= 600,
    isMoreThan600: window.innerWidth > 600,
    isLessThanTablet: window.innerWidth <= 768,
    isTablet: window.innerWidth > 768 && window.innerWidth <= 1024,
    isLessThanLaptop: window.innerWidth <= 1024,
    isLessThan1024: window.innerWidth < 1024,
    isLaptop: window.innerWidth > 1024,
    isMoreThanLaptop: window.innerWidth > 1024,
    isMoreThanDesktop: window.innerWidth > 1280,
  });

  // Set the value of the state as per the changes in the screen width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setScreenSize((prevSize) => ({
        ...prevSize,
        width,
        height,
        isLessThan400: width <= 400,
        isMoreThan400: width > 400,
        isLessThan600: width <= 600,
        isMoreThan600: width > 600,
        isLessThanTablet: width <= 768,
        isTablet: width > 768 && width <= 1024,
        isLessThanLaptop: width <= 1024,
        isLessThan1024: width < 1024,
        isLaptop: width > 1024,
        isMoreThanLaptop: width > 1024 && width <= 1280,
        isMoreThanDesktop: width > 1280,
      }));
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenSize.width]); // Add screenSize.width to the dependency array

  return screenSize;
};

export default useScreenSize;
