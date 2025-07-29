import React from "react";

export default function useScrollLock() {
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

  const scrollOffset = React.useRef(0);

  const lockScroll = React.useCallback(() => {
    document.body.dataset.scrollLock = "true";
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "var(--scrollbar-compensation)";

    if (isIOS) {
      scrollOffset.current = window.scrollY;
      document.body.style.position = "fixed";
      (document.body.style.top as any) = `${scrollOffset.current}px`;
      document.body.style.width = "100%";
    }
  }, [isIOS]);

  const unlockScroll = React.useCallback(() => {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";

    if (isIOS) {
      document.body.style.position = "";
      document.body.style.top = ``;
      document.body.style.width = "";
      window.scrollTo(0, scrollOffset.current);
    }

    delete document.body.dataset.scrollLock;
  }, [isIOS]);

  return {
    lockScroll,
    unlockScroll,
  };
}
