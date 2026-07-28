"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Copy,
  Check,
  Trash2,
  Wand2,
  AlertCircle,
  History,
  ChevronDown,
  X,
  Lightbulb,
  Sparkle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PremiumGenerateButton } from "@/components/shared/premium-generate-button";
import { cn } from "@/lib/utils";

const MAX_CHARS = 2000;

const EXAMPLE_PROMPTS = [
  "A cinematic drone shot flying over a misty mountain range at golden hour, with sunlight breaking through clouds",
  "An astronaut floating in zero gravity inside a space station, Earth visible through the window, soft blue lighting",
  "A futuristic cyberpunk city at night with neon signs, rain-soaked streets, and flying cars passing overhead",
  "A timelapse of a flower blooming in a dark room, with particles of light floating around it",
  "A wolf made of stardust running through a dark forest, leaving a trail of glowing particles behind",
  "Underwater footage of a bioluminescent jellyfish pulsing with light in the deep ocean abyss",
] as const;

interface PromptHistoryItem {
  id: string;
  prompt: string;
  timestamp: number;
}

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  disabled?: boolean;
  maxLength?: number;
  progress?: number;
}

export function PromptInput({
  value,
  onChange,
  onGenerate,
  isGenerating,
  disabled = false,
  maxLength = MAX_CHARS,
  progress = 0,
}: PromptInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [history, setHistory] = useState<PromptHistoryItem[]>([]);
  const [isEnhancing, setIsEnhancing] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("prompt-history");
      if (saved) setHistory(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  // Save to history
  const saveToHistory = useCallback(
    (prompt: string) => {
      if (!prompt.trim()) return;
      const item: PromptHistoryItem = {
        id: `hist_${Date.now()}`,
        prompt: prompt.trim(),
        timestamp: Date.now(),
      };
      setHistory((prev) => {
        const filtered = prev.filter((h) => h.prompt !== item.prompt);
        const updated = [item, ...filtered].slice(0, 20);
        localStorage.setItem("prompt-history", JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  // Auto-resize textarea
  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 300)}px`;
  }, []);

  useEffect(() => {
    autoResize();
  }, [value, autoResize]);

  // Validate
  useEffect(() => {
    if (value.length > maxLength) {
      setError(`Prompt exceeds ${maxLength} characters`);
    } else if (value.length > 0 && value.trim().length < 3) {
      setError("Prompt is too short");
    } else {
      setError(null);
    }
  }, [value, maxLength]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (value.trim() && !error && !isGenerating) {
        saveToHistory(value);
        onGenerate();
      }
    }
  };

  const handleCopy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    onChange("");
    setError(null);
    textareaRef.current?.focus();
  };

  const handleEnhance = async () => {
    if (!value.trim()) return;
    setIsEnhancing(true);
    // Simulated AI enhancement
    await new Promise((r) => setTimeout(r, 1200));
    const enhanced =
      value.trim().replace(/\.$/, "") +
      ", ultra-detailed, 8K resolution, cinematic color grading, professional lighting, smooth camera movement, photorealistic quality";
    onChange(enhanced);
    setIsEnhancing(false);
  };

  const handleUseExample = (example: string) => {
    onChange(example);
    setShowExamples(false);
    textareaRef.current?.focus();
  };

  const handleUseHistory = (item: PromptHistoryItem) => {
    onChange(item.prompt);
    setShowHistory(false);
    textareaRef.current?.focus();
  };

  const handleDeleteHistory = (id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((h) => h.id !== id);
      localStorage.setItem("prompt-history", JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("prompt-history");
  };

  const charPercent = (value.length / maxLength) * 100;
  const isNearLimit = charPercent > 85;
  const isOverLimit = charPercent > 100;

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="space-y-5">
      {/* Main Prompt Card */}
      <motion.div
        animate={{
          boxShadow: isFocused
            ? "0 0 0 1px rgba(139, 92, 246, 0.3), 0 0 40px -8px rgba(139, 92, 246, 0.15), 0 20px 60px -12px rgba(0, 0, 0, 0.5)"
            : error
              ? "0 0 0 1px rgba(239, 68, 68, 0.3), 0 20px 60px -12px rgba(0, 0, 0, 0.5)"
              : "0 0 0 1px rgba(255, 255, 255, 0.06), 0 20px 60px -12px rgba(0, 0, 0, 0.5)",
        }}
        transition={{ duration: 0.3 }}
        className="glass-card relative overflow-hidden rounded-2xl p-1"
      >
        {/* Top glow when focused */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"
            />
          )}
        </AnimatePresence>

        <div className="rounded-xl bg-white/[0.02] p-6 sm:p-7">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="rounded-lg bg-violet-500/10 p-1.5">
                <Sparkle className="h-4 w-4 text-violet-400" />
              </div>
              <span className="text-sm font-medium text-white">
                Video Prompt
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1">
              {/* History toggle */}
              {history.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => {
                    setShowHistory(!showHistory);
                    setShowExamples(false);
                  }}
                  className={cn(
                    "relative rounded-lg p-2 text-xs font-medium transition-all",
                    showHistory
                      ? "bg-white/10 text-white"
                      : "text-white/40 hover:bg-white/5 hover:text-white/70"
                  )}
                  title="Prompt history"
                >
                  <History className="h-4 w-4" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-violet-500 text-[9px] font-bold text-white">
                    {history.length}
                  </span>
                </motion.button>
              )}

              {/* Clear */}
              {value.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handleClear}
                  className="rounded-lg p-2 text-white/40 transition-all hover:bg-white/5 hover:text-rose-400"
                  title="Clear prompt"
                >
                  <Trash2 className="h-4 w-4" />
                </motion.button>
              )}

              {/* Copy */}
              {value.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handleCopy}
                  className={cn(
                    "rounded-lg p-2 transition-all",
                    copied
                      ? "text-emerald-400"
                      : "text-white/40 hover:bg-white/5 hover:text-white/70"
                  )}
                  title="Copy prompt"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Copy className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              )}
            </div>
          </div>

          {/* Textarea */}
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Describe the video you want to create..."
              rows={3}
              disabled={disabled || isGenerating}
              maxLength={maxLength + 100}
              className={cn(
                "w-full resize-none bg-transparent text-base leading-relaxed text-white placeholder:text-white/30 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg",
                error && "placeholder:text-rose-400/30"
              )}
              aria-label="Video prompt"
              aria-describedby={error ? "prompt-error" : undefined}
              aria-invalid={!!error}
            />
          </div>

          {/* Bottom bar */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Examples toggle */}
              <button
                onClick={() => {
                  setShowExamples(!showExamples);
                  setShowHistory(false);
                }}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                  showExamples
                    ? "bg-amber-500/10 text-amber-400"
                    : "text-white/30 hover:bg-white/5 hover:text-white/60"
                )}
              >
                <Lightbulb className="h-3.5 w-3.5" />
                Examples
                <ChevronDown
                  className={cn(
                    "h-3 w-3 transition-transform",
                    showExamples && "rotate-180"
                  )}
                />
              </button>

              {/* Character counter */}
              <div className="flex items-center gap-2">
                <div className="relative h-1 w-16 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    className={cn(
                      "absolute inset-y-0 left-0 rounded-full",
                      isOverLimit
                        ? "bg-rose-500"
                        : isNearLimit
                          ? "bg-amber-500"
                          : "bg-violet-500"
                    )}
                    initial={false}
                    animate={{ width: `${Math.min(charPercent, 100)}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span
                  className={cn(
                    "text-xs tabular-nums transition-colors",
                    isOverLimit
                      ? "text-rose-400"
                      : isNearLimit
                        ? "text-amber-400"
                        : "text-white/25"
                  )}
                >
                  {value.length}/{maxLength}
                </span>
              </div>
            </div>

            {/* Keyboard shortcut hint */}
            <span className="hidden text-xs text-white/20 sm:inline">
              <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-white/40">
                ⌘
              </kbd>{" "}
              +{" "}
              <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-white/40">
                ↵
              </kbd>{" "}
              to generate
            </span>
          </div>
        </div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div
                id="prompt-error"
                role="alert"
                className="flex items-center gap-2 border-t border-rose-500/10 bg-rose-500/5 px-6 py-3"
              >
                <AlertCircle className="h-4 w-4 flex-shrink-0 text-rose-400" />
                <span className="text-sm text-rose-400">{error}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Magic Enhance + Generate Row */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Magic Prompt Enhancement */}
        <Button
          variant="outline"
          size="lg"
          onClick={handleEnhance}
          disabled={!value.trim() || isEnhancing || isGenerating}
          className="group relative overflow-hidden sm:w-auto"
        >
          <AnimatePresence mode="wait">
            {isEnhancing ? (
              <motion.div
                key="enhancing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                <div className="relative">
                  <Wand2 className="h-4 w-4 animate-spin" />
                  <div className="absolute inset-0 h-4 w-4 rounded-full border border-violet-400/30" />
                </div>
                <span>Enhancing...</span>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                <Wand2 className="h-4 w-4 transition-transform group-hover:rotate-12" />
                <span>Magic Enhance</span>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/0 via-violet-600/10 to-violet-600/0 opacity-0 transition-opacity group-hover:opacity-100" />
        </Button>

        {/* Generate Button */}
        <PremiumGenerateButton
          onClick={() => {
            saveToHistory(value);
            onGenerate();
          }}
          disabled={!value.trim() || !!error}
          isGenerating={isGenerating}
          progress={progress}
        />
      </div>

      {/* Example Prompts Dropdown */}
      <AnimatePresence>
        {showExamples && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="glass-card rounded-2xl p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-white/50">
                  Click an example to use it
                </span>
                <button
                  onClick={() => setShowExamples(false)}
                  className="rounded-lg p-1 text-white/30 hover:text-white/60"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="space-y-2">
                {EXAMPLE_PROMPTS.map((example, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleUseExample(example)}
                    className="group w-full rounded-xl border border-white/5 bg-white/[0.02] p-3.5 text-left text-sm text-white/50 transition-all hover:border-violet-500/20 hover:bg-violet-500/5 hover:text-white/80"
                  >
                    <span className="line-clamp-2 leading-relaxed">
                      {example}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Prompt History Dropdown */}
      <AnimatePresence>
        {showHistory && history.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="glass-card rounded-2xl p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-white/50">
                  Recent prompts
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleClearHistory}
                    className="rounded-lg px-2 py-1 text-[11px] text-white/30 transition-colors hover:bg-white/5 hover:text-rose-400"
                  >
                    Clear all
                  </button>
                  <button
                    onClick={() => setShowHistory(false)}
                    className="rounded-lg p-1 text-white/30 hover:text-white/60"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="max-h-60 space-y-1.5 overflow-y-auto pr-1">
                {history.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="group flex items-start gap-2"
                  >
                    <button
                      onClick={() => handleUseHistory(item)}
                      className="flex-1 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-left text-sm text-white/50 transition-all hover:border-violet-500/20 hover:bg-violet-500/5 hover:text-white/80"
                    >
                      <span className="line-clamp-1">{item.prompt}</span>
                      <span className="mt-1 block text-[10px] text-white/20">
                        {formatTime(item.timestamp)}
                      </span>
                    </button>
                    <button
                      onClick={() => handleDeleteHistory(item.id)}
                      className="mt-1 rounded-lg p-1.5 text-white/20 opacity-0 transition-all hover:bg-white/5 hover:text-rose-400 group-hover:opacity-100"
                      title="Delete"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
