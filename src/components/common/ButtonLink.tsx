import { ArrowUpRight } from "lucide-react";
import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

type ButtonLinkProps = Omit<HTMLMotionProps<"a">, "children"> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function ButtonLink({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <motion.a
      className={`button button--${variant} ${className}`.trim()}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
    </motion.a>
  );
}
