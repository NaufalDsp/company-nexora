import { lazy, Suspense, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

import { useDeviceTier } from "../../hooks/useDeviceTier";
import { useHydrated } from "../../hooks/useHydrated";
import { useSceneActivity } from "../../hooks/useSceneActivity";
import { HeroSceneFallback } from "./HeroSceneFallback";
import { SceneErrorBoundary } from "./SceneErrorBoundary";

const HeroRoomCanvas = lazy(() => import("./HeroRoomCanvas"));

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");

    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHydrated = useHydrated();
  const deviceTier = useDeviceTier();
  const isActive = useSceneActivity(containerRef);
  const shouldReduceMotion = useReducedMotion();
  const [hasFailed, setHasFailed] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const sceneTier = deviceTier === "high" ? "high" : "medium";
  const canUseWebGL = useMemo(
    () => isHydrated && supportsWebGL(),
    [isHydrated],
  );
  const shouldRenderScene =
    canUseWebGL && deviceTier !== "low" && !shouldReduceMotion && !hasFailed;

  return (
    <div
      className={`hero-scene${isReady ? " hero-scene--ready" : ""}`}
      data-device-tier={deviceTier}
      data-render-mode={shouldRenderScene ? "webgl" : "fallback"}
      ref={containerRef}
    >
      <HeroSceneFallback />

      {shouldRenderScene ? (
        <SceneErrorBoundary onError={() => setHasFailed(true)}>
          <Suspense fallback={null}>
            <HeroRoomCanvas
              active={isActive}
              onError={() => setHasFailed(true)}
              onReady={() => setIsReady(true)}
              tier={sceneTier}
            />
          </Suspense>
        </SceneErrorBoundary>
      ) : null}

      <span className="hero-scene__status" aria-hidden="true">
        {isReady ? `WEBGL / ${deviceTier.toUpperCase()}` : "DOM / FALLBACK"}
      </span>
    </div>
  );
}
