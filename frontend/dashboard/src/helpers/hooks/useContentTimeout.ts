// Import - default
import { useEffect, useState } from "react";

// Main
const useContentTimeout = (isFlag: boolean, duration?: number) => {
  // State
  const [showContent, setShowContent] = useState(false);

  // Variables
  const variableDuration =
    duration ?? // Set the value of duration if provided
    (isFlag ? 500 : 200) ?? // Set the value of duration based on the flag provided as when closing, the content needs to disappear super fast but when opening, the content needs to appear a little slower
    500; // Set the default value of duration to 500 if nothing is provided

  // Show the content only after a set period of time
  // such that it does not seem odd
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowContent(isFlag);
    }, variableDuration); // Adjust delay as needed
    return () => clearTimeout(timeout);
  }, [isFlag]);

  return { showContent };
};

export default useContentTimeout;
