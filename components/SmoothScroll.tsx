"use client";

import { useEffect } from "react";

type LenisController = {
  destroy: () => void;
};

export default function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: LenisController | null = null;
    let disposed = false;

    const enableSmoothScroll = async () => {
      if (disposed || reducedMotion.matches || lenis) return;

      const { default: Lenis } = await import("lenis");

      if (disposed || reducedMotion.matches) return;

      lenis = new Lenis({
        autoRaf: true,
        anchors: true,
        lerp: 0.075,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1,
      });
    };

    const handleMotionPreference = () => {
      if (reducedMotion.matches) {
        lenis?.destroy();
        lenis = null;
        return;
      }

      void enableSmoothScroll();
    };

    handleMotionPreference();
    reducedMotion.addEventListener("change", handleMotionPreference);

    return () => {
      disposed = true;
      reducedMotion.removeEventListener("change", handleMotionPreference);
      lenis?.destroy();
    };
  }, []);

  return null;
}
