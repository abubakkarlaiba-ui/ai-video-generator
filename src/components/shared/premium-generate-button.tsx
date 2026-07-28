"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumGenerateButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isGenerating: boolean;
  progress?: number;
  className?: string;
}

const STAGES = [
  { threshold: 0, label: "Generate Video", icon: "sparkle" as const },
  { threshold: 5, label: "Preparing...", icon: "loader" as const },
  { threshold: 25, label: "Generating...", icon: "loader" as const },
  { threshold: 60, label: "Rendering...", icon: "loader" as const },
  { threshold: 85, label: "Finalizing...", icon: "loader" as const },
  { threshold: 100, label: "Completed", icon: "check" as const },
];

function getStage(progress: number) {
  for (let i = STAGES.length - 1; i >= 0; i--) {
    if (progress >= STAGES[i].threshold) return STAGES[i];
  }
  return STAGES[0];
}

export function PremiumGenerateButton({
  onClick,
  disabled = false,
  isGenerating,
  progress = 0,
  className,
}: PremiumGenerateButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleCounter = useRef(0);

  const stage = getStage(progress);
  const isComplete = progress >= 100;
  const isDisabled = disabled || (isGenerating && !isComplete);

  // Ripple effect on click
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = ++rippleCounter.current;

    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 700);

    onClick();
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      disabled={isDisabled}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group relative flex-1 overflow-hidden rounded-[14px] px-8 py-4 text-[15px] font-semibold text-white transition-all duration-300 sm:flex-none sm:min-w-[220px]",
        isComplete
          ? "bg-gradient-to-r from-emerald-600 to-emerald-500"
          : "bg-gradient-to-r from-violet-600 via-violet-500 to-indigo-600",
        isDisabled && !isComplete && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {/* Glowing border */}
      <div
        className={cn(
          "absolute inset-0 rounded-[14px] transition-opacity duration-500",
          isDisabled ? "opacity-0" : "opacity-100"
        )}
        style={{
          background: "linear-gradient(135deg, rgba(139,92,246,0.5), rgba(99,102,241,0.5), rgba(139,92,246,0.5))",
          padding: "1px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
      />

      {/* Animated glow on hover */}
      <div className="absolute -inset-1 rounded-[18px] bg-gradient-to-r from-violet-600/20 via-indigo-600/20 to-violet-600/20 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />

      {/* Shimmer sweep on hover */}
      <div className="absolute inset-0 overflow-hidden rounded-[14px]">
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      </div>

      {/* Progress bar underneath */}
      {isGenerating && (
        <motion.div
          className="absolute bottom-0 left-0 h-[3px] rounded-full bg-white/30"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      )}

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/20 animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}

      {/* Button content */}
      <div className="relative z-10 flex items-center justify-center gap-2.5">
        <AnimatePresence mode="wait">
          {isComplete ? (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="flex items-center gap-2.5"
            >
              <Check className="h-5 w-5" strokeWidth={3} />
              <span>{stage.label}</span>
            </motion.div>
          ) : isGenerating ? (
            <motion.div
              key="generating"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2.5"
            >
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>{stage.label}</span>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2.5"
            >
              <Sparkles className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              <span>{stage.label}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pressed overlay */}
      {isPressed && (
        <div className="absolute inset-0 bg-white/10 rounded-[14px]" />
      )}
    </motion.button>
  );
}
