import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useSyncExternalStore, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

const subscribeToHydration = () => () => undefined;

export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.12, once: true });
  const shouldReduceMotion = useReducedMotion();
  const isClientReady = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );

  const isVisible = !isClientReady || isInView || shouldReduceMotion;

  return (
    <motion.div
      animate={
        isVisible
          ? { opacity: 1, transform: "translateY(0)" }
          : { opacity: 0, transform: "translateY(1.75rem)" }
      }
      className={className}
      initial={false}
      ref={ref}
      transition={{ duration: shouldReduceMotion ? 0 : 0.65 }}
    >
      {children}
    </motion.div>
  );
}
