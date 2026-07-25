import { lazy, Suspense, useMemo, useRef, useState } from "react";
import { useReducedMotion, useScroll } from "motion/react";
import type { RefObject } from "react";

import { useDeviceTier } from "../../hooks/useDeviceTier";
import { useHydrated } from "../../hooks/useHydrated";
import { useSceneActivity } from "../../hooks/useSceneActivity";
import { supportsWebGL } from "../../lib/webgl";
import { HeroSceneFallback } from "./HeroSceneFallback";
import { SceneErrorBoundary } from "./SceneErrorBoundary";

const HeroRoomCanvas = lazy(() => import("./HeroRoomCanvas"));

type HeroSceneProps = {
  scrollTargetRef: RefObject<HTMLElement | null>;
};

export function HeroScene({ scrollTargetRef }: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHydrated = useHydrated();
  const deviceTier = useDeviceTier();
  const isActive = useSceneActivity(containerRef);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: ["start start", "end end"],
  });
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
              scrollProgress={scrollYProgress}
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
