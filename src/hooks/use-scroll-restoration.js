"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { animate } from "framer-motion";

export function useScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Instant reset to top on navigation to prevent layout jitter
    window.scrollTo(0, 0);

    const savedPosition = sessionStorage.getItem(`scrollPos:${pathname}`);

    if (savedPosition) {
      const targetY = parseInt(savedPosition, 10);

        // ^
        // |
        // |           /\
        // |          /  \
        // |         /    \
        // |        /      \
        // |_______/        \_______
        // +------------------------>
        //          progress
      const controls = animate(window.scrollY, targetY, {
        type: "tween",
        ease: [0.83, 0, 0.17, 1], // easeInOutQuint
        duration: 1.6,
        delay: 0.2,
        onUpdate: (latest) => window.scrollTo(0, latest),
      });

      return () => controls.stop();
    }
  }, [pathname]);

  useEffect(() => {
    // 3. Optimized Scroll Tracking
    let timeoutId;

    const handleScroll = () => {
      // Debounce the save to prevent main-thread lag during scrolling
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        sessionStorage.setItem(
          `scrollPos:${pathname}`,
          window.scrollY.toString(),
        );
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [pathname]);
}
