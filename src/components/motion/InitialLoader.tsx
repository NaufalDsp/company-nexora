import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { markIntroReady } from "../../hooks/useIntroReady";
import { BrandLogo } from "../brand/BrandLogo";

export const INITIAL_LOADER_SESSION_KEY = "nexora-space:intro-seen";
const STANDARD_DURATION_MS = 1450;
const EXIT_DURATION_MS = 520;

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
    if (hasSeenLoader() || shouldReduceMotion) {
      markLoaderAsSeen();
      markIntroReady();
      const timeout = window.setTimeout(() => setIsVisible(false), 0);

      return () => window.clearTimeout(timeout);
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const hideTimeout = window.setTimeout(() => {
      document.body.style.overflow = previousOverflow;
      markLoaderAsSeen();
      setIsVisible(false);
    }, STANDARD_DURATION_MS);
    const readyTimeout = window.setTimeout(
      markIntroReady,
      STANDARD_DURATION_MS + EXIT_DURATION_MS,
    );

    return () => {
      window.clearTimeout(hideTimeout);
      window.clearTimeout(readyTimeout);
      document.body.style.overflow = previousOverflow;
    };
  }, [shouldReduceMotion]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="initial-loader"
          aria-hidden="true"
          exit={{ opacity: 0, scale: 1.012 }}
          transition={{
            duration: 0.48,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="initial-loader__grid"
            initial={{ opacity: 0.35, scale: 1.025 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
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
              initial={{ opacity: 0, y: 12 }}
              transition={{
                duration: 0.72,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
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
                    duration: 1.25,
                    ease: [0.4, 0, 0.2, 1],
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
