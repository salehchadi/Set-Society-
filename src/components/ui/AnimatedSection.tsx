import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const directionMap = {
  up: { y: 30, x: 0 },
  down: { y: -30, x: 0 },
  left: { x: 30, y: 0 },
  right: { x: -30, y: 0 },
};

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const offset = directionMap[direction];

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
