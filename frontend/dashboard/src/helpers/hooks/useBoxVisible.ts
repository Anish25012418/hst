// Import - default
import { useEffect, useRef, useState } from "react";

// Main
const useBoxVisible = (initialIsVisible?: boolean) => {
  const [isBoxVisible, setIsBoxVisible] = useState<boolean>(
    initialIsVisible ?? false
  );
  const domRef: any = useRef<any>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickOutside = (e: any) => {
    if (domRef.current && !domRef.current.contains(e.target)) {
      setIsBoxVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { domRef, isBoxVisible, setIsBoxVisible };
};

export default useBoxVisible;
