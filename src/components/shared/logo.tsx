"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)}>
      <motion.div
        whileHover={{ rotate: 15, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 p-1.5 shadow-lg shadow-violet-500/20"
      >
        <Sparkles className={cn("text-white", iconSizes[size])} />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 blur-md opacity-50 transition-opacity duration-300 group-hover:opacity-75" />
      </motion.div>
      <span
        className={cn(
          "font-bold tracking-tight text-white transition-all duration-300",
          sizes[size]
        )}
      >
        Synth
        <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
          AI
        </span>
      </span>
    </Link>
  );
}
