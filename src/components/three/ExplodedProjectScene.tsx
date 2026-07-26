import { lazy, Suspense, useMemo, useRef, useState } from "react";
import { useReducedMotion, useScroll } from "motion/react";
import type { RefObject } from "react";

import type { Project } from "../../data/contracts/portfolio";
import { useDeviceTier } from "../../hooks/useDeviceTier";
import { useHydrated } from "../../hooks/useHydrated";
import { useIntroReady } from "../../hooks/useIntroReady";
import { useSceneActivity } from "../../hooks/useSceneActivity";
import { supportsWebGL } from "../../lib/webgl";
import { ExplodedSceneFallback } from "./ExplodedSceneFallback";
import { SceneErrorBoundary } from "./SceneErrorBoundary";

const ExplodedRoomCanvas = lazy(() => import("./ExplodedRoomCanvas"));

type ExplodedProjectSceneProps = {
  project: Project;
  scrollTargetRef: RefObject<HTMLElement | null>;
};

export function ExplodedProjectScene({
  project,
  scrollTargetRef,
}: ExplodedProjectSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHydrated = useHydrated();
  const deviceTier = useDeviceTier();
  const isActive = useSceneActivity(containerRef);
  const isIntroReady = useIntroReady();
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: ["start start", "end end"],
  });
  const [hasFailed, setHasFailed] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const canUseWebGL = useMemo(
    () => isHydrated && supportsWebGL(),
    [isHydrated],
  );
  const canRenderScene =
    isIntroReady &&
    canUseWebGL &&
    deviceTier !== "low" &&
    !shouldReduceMotion &&
    !hasFailed;
  const shouldRenderScene = canRenderScene && (isActive || isReady);
  const isSceneVisible = shouldRenderScene && isReady;
  const sceneTier = deviceTier === "high" ? "high" : "medium";

  return (
    <div
      className={`exploded-scene${
        isSceneVisible ? " exploded-scene--ready" : ""
      }`}
      data-device-tier={deviceTier}
      data-render-mode={shouldRenderScene ? "webgl" : "fallback"}
      ref={containerRef}
    >
      <ExplodedSceneFallback project={project} />

      {shouldRenderScene ? (
        <SceneErrorBoundary onError={() => setHasFailed(true)}>
          <Suspense fallback={null}>
            <ExplodedRoomCanvas
              active={isActive}
              onError={() => setHasFailed(true)}
              onReady={() => setIsReady(true)}
              scrollProgress={scrollYProgress}
              tier={sceneTier}
            />
          </Suspense>
        </SceneErrorBoundary>
      ) : null}

      <span className="exploded-scene__status" aria-hidden="true">
        {isSceneVisible
          ? `ASSEMBLY / ${deviceTier.toUpperCase()}`
          : "DOM / FALLBACK"}
      </span>
    </div>
  );
}
