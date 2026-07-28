"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  Play,
  Download,
  Loader2,
  Wand2,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Share2,
  Copy,
  Check,
  Clock,
  Trash2,
  History,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/shared/glass-card";
import { GenerationLoading } from "@/components/shared/generation-loading";
import { PromptInput } from "@/components/shared/prompt-input";
import { VideoSettingsPanel } from "@/components/shared/video-settings-panel";
import { validateGenerationRequest } from "@/lib/validation";
import {
  getGenerations,
  saveGeneration,
  updateGeneration,
  deleteGeneration,
  clearGenerations,
  type GenerationRecord,
} from "@/lib/generation-history";
import type { VideoSettings, GenerateResponse } from "@/lib/types";

const DEFAULT_SETTINGS: VideoSettings = {
  duration: 10,
  aspectRatio: "16:9",
  resolution: "1080p",
  style: "cinematic",
  cameraMotion: "static",
  lighting: "golden-hour",
  creativity: 50,
  motionStrength: 40,
  negativePrompt: "",
  seed: "",
};

const STAGES = [
  { threshold: 0, label: "Validating..." },
  { threshold: 5, label: "Preparing..." },
  { threshold: 15, label: "Sending to AI..." },
  { threshold: 25, label: "Generating..." },
  { threshold: 50, label: "Rendering..." },
  { threshold: 75, label: "Processing..." },
  { threshold: 90, label: "Finalizing..." },
  { threshold: 100, label: "Completed!" },
];

function getStageLabel(progress: number) {
  for (let i = STAGES.length - 1; i >= 0; i--) {
    if (progress >= STAGES[i].threshold) return STAGES[i].label;
  }
  return STAGES[0].label;
}

export default function GeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [settings, setSettings] = useState<VideoSettings>(DEFAULT_SETTINGS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [generations, setGenerations] = useState<GenerationRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [currentStage, setCurrentStage] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load generation history
  useEffect(() => {
    setGenerations(getGenerations());
  }, []);

  const handleSettingsChange = useCallback((partial: Partial<VideoSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  }, []);

  const handleGenerate = useCallback(async () => {
    // Step 1: Validate
    const validation = validateGenerationRequest(prompt, settings);
    if (!validation.valid) {
      setValidationErrors(validation.errors);
      setError(validation.errors[0]);
      return;
    }
    setValidationErrors([]);
    setError(null);
    setResult(null);
    setIsGenerating(true);
    setProgress(0);
    setCurrentStage("Validating...");

    const generationId = `gen_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    // Step 4: Save initial record
    const record: GenerationRecord = {
      id: generationId,
      prompt: prompt.trim(),
      settings: { ...settings },
      status: "processing",
      createdAt: Date.now(),
    };
    saveGeneration(record);
    setGenerations(getGenerations());

    // Step 5: Simulate live progress
    let progressValue = 0;
    abortRef.current = new AbortController();

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        let next = prev;
        if (prev < 15) next = prev + Math.random() * 4 + 1;
        else if (prev < 50) next = prev + Math.random() * 2 + 0.5;
        else if (prev < 80) next = prev + Math.random() * 1.5 + 0.3;
        else if (prev < 90) next = prev + Math.random() * 0.8 + 0.1;
        next = Math.min(next, 90);
        progressValue = next;
        setCurrentStage(getStageLabel(next));
        return next;
      });
    }, 1500);

    try {
      // Step 3: Send request
      setCurrentStage("Sending to AI...");
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim(), settings }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || `Server error: ${res.status}`);
      }

      // Step 6: Handle response
      const data: GenerateResponse = await res.json();

      // Clear progress interval
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }

      if (data.status === "failed") {
        // Step 7: Handle failure
        setProgress(0);
        setCurrentStage("");
        setError(data.error || "Generation failed. Please try again.");
        updateGeneration(generationId, {
          status: "failed",
          error: data.error || "Generation failed",
        });
        setGenerations(getGenerations());
        return;
      }

      // Step 8: Save completed video
      setProgress(95);
      setCurrentStage("Finalizing...");
      await new Promise((r) => setTimeout(r, 300));

      setProgress(100);
      setCurrentStage("Completed!");
      await new Promise((r) => setTimeout(r, 500));

      updateGeneration(generationId, {
        status: "completed",
        videoUrl: data.videoUrl,
        replicateId: data.id,
        completedAt: Date.now(),
      });
      setGenerations(getGenerations());

      // Step 9: Display video
      setResult(data);
    } catch (err) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }

      if (err instanceof DOMException && err.name === "AbortError") {
        setError("Generation was cancelled.");
        updateGeneration(generationId, {
          status: "failed",
          error: "Cancelled by user",
        });
      } else {
        const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
        setError(message);
        updateGeneration(generationId, {
          status: "failed",
          error: message,
        });
      }
      setProgress(0);
      setCurrentStage("");
      setGenerations(getGenerations());
    } finally {
      setIsGenerating(false);
      abortRef.current = null;
    }
  }, [prompt, settings]);

  const handleCancel = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setIsGenerating(false);
    setProgress(0);
    setCurrentStage("");
  }, []);

  const handleReset = () => {
    setResult(null);
    setProgress(0);
    setError(null);
    setValidationErrors([]);
    setCurrentStage("");
  };

  const handleCopyUrl = async () => {
    if (!result?.videoUrl) return;
    await navigator.clipboard.writeText(result.videoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (!result?.videoUrl) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My AI Generated Video",
          text: `Check out this video I created with AI: "${prompt.slice(0, 100)}"`,
          url: result.videoUrl,
        });
      } catch {
        // User cancelled share
      }
    } else {
      handleCopyUrl();
    }
  };

  const handleDeleteGeneration = (id: string) => {
    deleteGeneration(id);
    setGenerations(getGenerations());
  };

  const handleClearHistory = () => {
    clearGenerations();
    setGenerations([]);
  };

  const loadGeneration = (gen: GenerationRecord) => {
    setPrompt(gen.prompt);
    setSettings(gen.settings);
    if (gen.videoUrl) {
      setResult({ id: gen.replicateId || gen.id, status: "completed", videoUrl: gen.videoUrl, progress: 100 });
    }
    setShowHistory(false);
  };

  const isComplete = result?.status === "completed" && result?.videoUrl;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <Badge variant="default" className="mb-5 gap-1.5">
            <Wand2 className="h-3 w-3" />
            AI Video Generator
          </Badge>
          <h1 className="heading-section text-white">
            Describe your vision
          </h1>
          <p className="body-large mt-5 text-white/50 max-w-xl mx-auto">
            Enter a prompt, configure your settings, and let AI create a stunning video.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
          {/* Left: Prompt + Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              progress={progress}
            />

            <VideoSettingsPanel settings={settings} onChange={handleSettingsChange} />

            {/* Generation History */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex w-full items-center justify-between px-5 py-4"
              >
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-violet-500/10 p-1.5">
                    <History className="h-4 w-4 text-violet-400" />
                  </div>
                  <span className="text-sm font-semibold text-white">Recent Generations</span>
                  {generations.length > 0 && (
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/50">
                      {generations.length}
                    </span>
                  )}
                </div>
                <motion.div animate={{ rotate: showHistory ? 180 : 0 }}>
                  <svg className="h-4 w-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {showHistory && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/5 px-5 pb-4">
                      {generations.length === 0 ? (
                        <p className="body-small py-6 text-center text-white/30">
                          No generations yet. Your history will appear here.
                        </p>
                      ) : (
                        <>
                          <div className="mt-3 max-h-64 space-y-2 overflow-y-auto">
                            {generations.map((gen) => (
                              <div
                                key={gen.id}
                                className="group flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-all hover:border-white/10 hover:bg-white/[0.04]"
                              >
                                <div className="mt-0.5">
                                  {gen.status === "completed" ? (
                                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                  ) : gen.status === "failed" ? (
                                    <AlertCircle className="h-4 w-4 text-red-400" />
                                  ) : (
                                    <Loader2 className="h-4 w-4 animate-spin text-violet-400" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <button
                                    onClick={() => loadGeneration(gen)}
                                    className="text-left"
                                  >
                                    <p className="body-small truncate text-white/70 hover:text-white">
                                      {gen.prompt}
                                    </p>
                                    <div className="mt-1 flex items-center gap-2 text-[10px] text-white/30">
                                      <Clock className="h-3 w-3" />
                                      {new Date(gen.createdAt).toLocaleString()}
                                      <span className="capitalize">&bull; {gen.status}</span>
                                    </div>
                                  </button>
                                </div>
                                <button
                                  onClick={() => handleDeleteGeneration(gen.id)}
                                  className="mt-0.5 rounded p-1 text-white/20 opacity-0 transition-all hover:text-red-400 group-hover:opacity-100"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                          {generations.length > 0 && (
                            <button
                              onClick={handleClearHistory}
                              className="mt-3 w-full rounded-lg border border-white/5 py-2 text-xs font-medium text-white/30 transition-colors hover:border-red-500/20 hover:text-red-400"
                            >
                              Clear History
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right: Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-24 lg:h-fit"
          >
            <GlassCard className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
                <AnimatePresence mode="wait">
                  {/* Error State */}
                  {error && !isGenerating && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex h-full flex-col items-center justify-center gap-4 p-6"
                    >
                      <div className="rounded-full bg-red-500/10 p-4">
                        <AlertCircle className="h-8 w-8 text-red-400" />
                      </div>
                      <p className="body-small font-medium text-red-400 text-center">{error}</p>
                      <Button size="sm" variant="outline" onClick={handleReset}>
                        Try Again
                      </Button>
                    </motion.div>
                  )}

                  {/* Generating State */}
                  {isGenerating && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="h-full"
                    >
                      <GenerationLoading
                        progress={progress}
                        currentStage={currentStage}
                        onCancel={handleCancel}
                      />
                    </motion.div>
                  )}

                  {/* Completed State - Video */}
                  {!isGenerating && isComplete && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="relative h-full group"
                    >
                      <video
                        src={result!.videoUrl}
                        controls
                        autoPlay
                        loop
                        className="h-full w-full object-cover"
                      />
                      {/* Success badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-sm">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-xs font-medium text-white">Generated</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Empty State */}
                  {!isGenerating && !isComplete && !error && (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex h-full flex-col items-center justify-center gap-4 text-white/20"
                    >
                      <div className="relative">
                        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                          <Play className="h-10 w-10" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 rounded-lg bg-violet-600 p-1.5">
                          <Sparkles className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-white/40">
                          Your video will appear here
                        </p>
                        <p className="body-small mt-1 text-white/20">
                          Enter a prompt and click Generate
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Bar */}
              <AnimatePresence>
                {isComplete && !isGenerating && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-2 p-4">
                      <Button size="sm" variant="outline" className="flex-1" asChild>
                        <a href={result!.videoUrl} download target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4" />
                          Download
                        </a>
                      </Button>
                      <Button size="sm" variant="secondary" className="flex-1" onClick={handleShare}>
                        <Share2 className="h-4 w-4" />
                        Share
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCopyUrl}
                        title="Copy video URL"
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleReset}
                        title="Generate new video"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>

            {/* Generation Info */}
            {isComplete && !isGenerating && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-5"
              >
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">
                  Generation Details
                </h4>
                <div className="space-y-2.5 text-xs text-white/40">
                  <div className="flex justify-between">
                    <span>Style</span>
                    <span className="text-white/60 capitalize">{settings.style}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration</span>
                    <span className="text-white/60">{settings.duration}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resolution</span>
                    <span className="text-white/60 uppercase">{settings.resolution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Aspect Ratio</span>
                    <span className="text-white/60">{settings.aspectRatio}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Camera</span>
                    <span className="text-white/60 capitalize">{settings.cameraMotion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lighting</span>
                    <span className="text-white/60 capitalize">{settings.lighting}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
