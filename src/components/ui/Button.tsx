import { motion } from "motion/react";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

const baseClasses =
  "uppercase tracking-[0.2em] font-medium transition-colors inline-flex items-center justify-center gap-2";

const variantClasses = {
  primary: "bg-primary text-white hover:bg-primary/90",
  outline: "border border-primary/20 text-primary hover:border-primary hover:bg-primary/5",
  ghost: "text-primary hover:bg-primary/5",
};

const sizeClasses = {
  sm: "px-6 py-2.5 text-[0.6rem]",
  md: "px-10 py-4 text-xs",
  lg: "px-14 py-5 text-xs",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </motion.button>
  );
}
