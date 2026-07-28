"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";

interface GenerationLoadingProps {
  progress: number;
  currentStage: string;
  onCancel?: () => void;
}

const MESSAGES = [
  { threshold: 0, text: "Understanding your prompt...", icon: "🧠" },
  { threshold: 10, text: "Creating the scene...", icon: "🎬" },
  { threshold: 25, text: "Generating frames...", icon: "🎞️" },
  { threshold: 45, text: "Animating motion...", icon: "✨" },
  { threshold: 65, text: "Rendering video...", icon: "🎥" },
  { threshold: 82, text: "Upscaling to HD...", icon: "📐" },
  { threshold: 95, text: "Almost done...", icon: "🎯" },
];

function getMessage(progress: number) {
  for (let i = MESSAGES.length - 1; i >= 0; i--) {
    if (progress >= MESSAGES[i].threshold) return MESSAGES[i];
  }
  return MESSAGES[0];
}

function estimateRemaining(progress: number): string {
  if (progress <= 0) return "Calculating...";
  if (progress >= 100) return "Done!";
  const elapsed = progress * 3.6; // rough estimate
  const remaining = Math.max(0, (100 - progress) * 3.6);
  const minutes = Math.floor(remaining / 60);
  const seconds = Math.floor(remaining % 60);
  if (minutes > 0) return `~${minutes}m ${seconds}s left`;
  return `~${seconds}s left`;
}

// Floating particles
function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 4 + 4,
        delay: Math.random() * 3,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-violet-400/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Animated AI Brain
function AIBrain({ progress }: { progress: number }) {
  const shouldPulse = progress < 100;
  const isComplete = progress >= 100;

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow rings */}
      <motion.div
        className="absolute h-40 w-40 rounded-full border border-violet-500/10"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-52 w-52 rounded-full border border-violet-500/5"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.05, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute h-64 w-64 rounded-full border border-indigo-500/5"
        animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.03, 0.15] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Rotating orbit dots */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-violet-400/60"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformOrigin: `0 ${60 + i * 12}px`,
          }}
        >
          <div className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-violet-400/60" />
        </motion.div>
      ))}

      {/* Main brain circle */}
      <motion.div
        className={`relative flex h-28 w-28 items-center justify-center rounded-full ${
          isComplete
            ? "bg-gradient-to-br from-emerald-500/20 to-emerald-600/10"
            : "bg-gradient-to-br from-violet-500/20 to-indigo-600/10"
        }`}
        animate={
          shouldPulse
            ? {
                boxShadow: [
                  "0 0 0 0 rgba(139, 92, 246, 0.2)",
                  "0 0 40px 10px rgba(139, 92, 246, 0.15)",
                  "0 0 0 0 rgba(139, 92, 246, 0.2)",
                ],
              }
            : {}
        }
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Inner gradient border */}
        <div className="absolute inset-[1px] rounded-full bg-gradient-to-br from-violet-500/30 via-indigo-500/20 to-violet-500/30" />
        <div className="absolute inset-[2px] rounded-full bg-black/80" />

        {/* Brain icon */}
        <motion.div
          className="relative z-10"
          animate={isComplete ? { scale: [1, 1.2, 1] } : { scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Brain
            className={`h-12 w-12 ${isComplete ? "text-emerald-400" : "text-violet-400"}`}
            strokeWidth={1.5}
          />
          {/* Neural sparkles */}
          {!isComplete && (
            <>
              <motion.div
                className="absolute -right-1 -top-1"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
              >
                <Sparkles className="h-3 w-3 text-violet-300" />
              </motion.div>
              <motion.div
                className="absolute -bottom-1 -left-1"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              >
                <Sparkles className="h-2.5 w-2.5 text-indigo-300" />
              </motion.div>
              <motion.div
                className="absolute -right-2 bottom-0"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
              >
                <Sparkles className="h-2 w-2 text-cyan-300" />
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

// Progress Circle
function ProgressCircle({ progress }: { progress: number }) {
  const radius = 80;
  const stroke = 3;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      className="absolute inset-0 -rotate-90"
    >
      {/* Background circle */}
      <circle
        stroke="rgba(255,255,255,0.04)"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      {/* Progress circle */}
      <motion.circle
        stroke="url(#progressGradient)"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      {/* Gradient definition */}
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function GenerationLoading({
  progress,
  currentStage,
  onCancel,
}: GenerationLoadingProps) {
  const message = getMessage(progress);
  const timeEstimate = estimateRemaining(progress);
  const isComplete = progress >= 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex h-full flex-col items-center justify-center gap-8 p-6 overflow-hidden"
    >
      {/* Background particles */}
      <Particles />

      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08)_0%,transparent_70%)]" />

      {/* Brain + Progress Circle */}
      <div className="relative flex items-center justify-center">
        <ProgressCircle progress={progress} />
        <AIBrain progress={progress} />
      </div>

      {/* Current step message */}
      <div className="relative z-10 text-center space-y-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={message.text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-2"
          >
            <motion.p
              className="text-lg font-semibold text-white"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {message.text}
            </motion.p>
            <p className="body-small text-white/40">
              {timeEstimate}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress percentage */}
        <motion.p
          className="text-4xl font-bold tabular-nums"
          style={{
            background: "linear-gradient(135deg, #c084fc, #818cf8, #22d3ee)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {Math.round(progress)}%
        </motion.p>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 w-full max-w-xs space-y-2">
        <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-white/30">
          <span>{currentStage}</span>
          <span className="tabular-nums">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Step indicators */}
      <div className="relative z-10 flex items-center gap-1.5">
        {MESSAGES.map((m, i) => (
          <motion.div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              progress >= m.threshold
                ? "bg-violet-500"
                : "bg-white/10"
            }`}
            animate={
              progress >= m.threshold && progress < (MESSAGES[i + 1]?.threshold ?? 100)
                ? { width: 24 }
                : { width: 6 }
            }
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Cancel button */}
      {onCancel && !isComplete && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={onCancel}
          className="relative z-10 rounded-[14px] border border-white/10 bg-white/5 px-6 py-2 text-xs font-medium text-white/40 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white/70"
        >
          Cancel
        </motion.button>
      )}
    </motion.div>
  );
}
