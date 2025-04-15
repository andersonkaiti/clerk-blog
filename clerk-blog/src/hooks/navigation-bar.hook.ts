"use client";

import { useEffect, useRef, useState } from "react";

export function useNavigationBar() {
  const [showNavigationBar, setShowNavigationBar] = useState(false);
  const navigationBarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function closeNavigationBar() {
      if (window.innerWidth >= 640) {
        setShowNavigationBar(false);
      }
    }

    function clickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;

      if (
        navigationBarRef.current &&
        !navigationBarRef.current.contains(target)
      ) {
        setShowNavigationBar(false);
      }
    }

    window.addEventListener("resize", closeNavigationBar);
    window.addEventListener("click", clickOutside);

    return () => {
      removeEventListener("resize", closeNavigationBar);
      removeEventListener("click", clickOutside);
    };
  }, [showNavigationBar, setShowNavigationBar, navigationBarRef]);

  return {
    showNavigationBar,
    setShowNavigationBar,
    navigationBarRef,
  };
}
