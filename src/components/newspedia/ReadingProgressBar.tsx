"use client";

import { useSyncExternalStore, useCallback } from "react";
import { motion } from "framer-motion";

// Custom hook for scroll progress using useSyncExternalStore
function useScrollProgress() {
  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return 0;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    return Math.min(100, Math.max(0, progress));
  }, []);

  const getServerSnapshot = useCallback(() => 0, []);

  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener("scroll", callback, { passive: true });
    return () => window.removeEventListener("scroll", callback);
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function ReadingProgressBar() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[60] origin-left"
      style={{ scaleX: progress / 100 }}
    >
      <div className="h-full progress-bar-shine" />
    </motion.div>
  );
}
