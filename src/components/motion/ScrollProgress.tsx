import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    damping: 38,
    mass: 0.2,
    stiffness: 280,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="scroll-progress"
      style={{ scaleX }}
    />
  );
}
