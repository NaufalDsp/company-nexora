import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

import { ScrollProgress } from "./ScrollProgress";

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <ScrollProgress />
      {children}
    </MotionConfig>
  );
}
