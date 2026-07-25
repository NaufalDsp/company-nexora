import { useSyncExternalStore } from "react";

export type DeviceTier = "high" | "low" | "medium";

type NavigatorWithCapabilities = Navigator & {
  connection?: {
    effectiveType?: string;
    saveData?: boolean;
  };
  deviceMemory?: number;
};

function getDeviceTier(): DeviceTier {
  if (typeof window === "undefined") {
    return "low";
  }

  const capabilities = navigator as NavigatorWithCapabilities;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const hasConstrainedConnection =
    capabilities.connection?.saveData === true ||
    capabilities.connection?.effectiveType === "2g";

  if (
    prefersReducedMotion ||
    hasConstrainedConnection ||
    window.innerWidth < 640
  ) {
    return "low";
  }

  if (
    hasCoarsePointer ||
    window.innerWidth < 1180 ||
    capabilities.hardwareConcurrency <= 4 ||
    (capabilities.deviceMemory ?? 8) <= 4
  ) {
    return "medium";
  }

  return "high";
}

function subscribe(onStoreChange: () => void) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const coarsePointer = window.matchMedia("(pointer: coarse)");

  window.addEventListener("resize", onStoreChange);
  reducedMotion.addEventListener("change", onStoreChange);
  coarsePointer.addEventListener("change", onStoreChange);

  return () => {
    window.removeEventListener("resize", onStoreChange);
    reducedMotion.removeEventListener("change", onStoreChange);
    coarsePointer.removeEventListener("change", onStoreChange);
  };
}

export function useDeviceTier() {
  return useSyncExternalStore(subscribe, getDeviceTier, () => "low");
}
