import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { BrandLogo } from "../brand/BrandLogo";

export const INITIAL_LOADER_SESSION_KEY = "nexora-space:intro-seen";
const STANDARD_DURATION_MS = 1600;
const REDUCED_DURATION_MS = 180;

function hasSeenLoader() {
  try {
    return sessionStorage.getItem(INITIAL_LOADER_SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function markLoaderAsSeen() {
  try {
    sessionStorage.setItem(INITIAL_LOADER_SESSION_KEY, "true");
  } catch {
    // Storage may be unavailable in privacy-restricted browsing contexts.
  }
}

export function InitialLoader() {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (hasSeenLoader()) {
      const timeout = window.setTimeout(() => setIsVisible(false), 0);

      return () => window.clearTimeout(timeout);
    }

    const previousOverflow = document.body.style.overflow;
    const duration = shouldReduceMotion
      ? REDUCED_DURATION_MS
      : STANDARD_DURATION_MS;

    document.body.style.overflow = "hidden";

    const timeout = window.setTimeout(() => {
      document.body.style.overflow = previousOverflow;
      markLoaderAsSeen();
      setIsVisible(false);
    }, duration);

    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = previousOverflow;
    };
  }, [shouldReduceMotion]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="initial-loader"
          aria-hidden="true"
          exit={
            shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: "-100%" }
          }
          transition={{
            duration: shouldReduceMotion ? 0.12 : 0.6,
            ease: [0.65, 0, 0.35, 1],
          }}
        >
          <div className="initial-loader__grid" />
          <span className="initial-loader__corner initial-loader__corner--top" />
          <span className="initial-loader__corner initial-loader__corner--bottom" />

          <div className="initial-loader__content">
            <div className="initial-loader__meta">
              <span>NXS / 00.01</span>
              <span>SPACE ASSEMBLY</span>
            </div>

            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="initial-loader__brand"
              initial={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.55, delay: 0.12 }}
            >
              <BrandLogo />
              <p>Raw structure. Refined space.</p>
            </motion.div>

            <div className="initial-loader__sequence">
              <div className="initial-loader__labels">
                <span>Structure</span>
                <span>Material</span>
                <span>Space</span>
              </div>
              <div className="initial-loader__track">
                <motion.span
                  animate={{ scaleX: 1 }}
                  initial={{ scaleX: 0 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 1.15,
                    ease: [0.65, 0, 0.35, 1],
                  }}
                />
              </div>
              <div className="initial-loader__count">
                <span>00</span>
                <span>100</span>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
