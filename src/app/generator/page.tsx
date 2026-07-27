"use client";

import { useState, useCallback } from "react";
import {
  Play,
  Download,
  Loader2,
  Wand2,
  Maximize,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GlassCard } from "@/components/shared/glass-card";
import { PromptInput } from "@/components/shared/prompt-input";
import { VideoSettingsPanel } from "@/components/shared/video-settings-panel";
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

export default function GeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [settings, setSettings] = useState<VideoSettings>(DEFAULT_SETTINGS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleSettingsChange = useCallback((partial: Partial<VideoSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setProgress(0);
    setResult(null);
    setError(null);

    // Simulate progressive loading (slower for AI generation)
    let progressValue = 0;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) {
          clearInterval(interval);
          return 85;
        }
        const increment = prev < 30 ? Math.random() * 8 : Math.random() * 4;
        return Math.min(prev + increment, 85);
      });
    }, 800);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, settings }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || "Generation failed");
      }

      const data: GenerateResponse = await res.json();
      clearInterval(interval);

      if (data.status === "failed") {
        setProgress(0);
        setError(data.error || "Generation failed. Please try again.");
        return;
      }

      // Animate to 100%
      setProgress(100);

      // Small delay so user sees 100%
      await new Promise((r) => setTimeout(r, 500));

      setResult(data);
    } catch (err) {
      clearInterval(interval);
      setProgress(0);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [prompt, settings]);

  const handleReset = () => {
    setResult(null);
    setProgress(0);
    setError(null);
    setPrompt("");
    setSettings(DEFAULT_SETTINGS);
  };

  const isComplete = result?.status === "completed" && result?.videoUrl;

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <Badge variant="default" className="mb-4 gap-1.5">
            <Wand2 className="h-3 w-3" />
            AI Video Generator
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Describe your vision
          </h1>
          <p className="mt-4 text-lg text-white/50">
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
            />

            <VideoSettingsPanel settings={settings} onChange={handleSettingsChange} />
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
                      className="flex h-full flex-col items-center justify-center gap-3 p-6"
                    >
                      <div className="rounded-full bg-red-500/10 p-4">
                        <AlertCircle className="h-8 w-8 text-red-400" />
                      </div>
                      <p className="text-sm font-medium text-red-400">{error}</p>
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
                      className="flex h-full flex-col items-center justify-center gap-4 p-6"
                    >
                      <div className="relative">
                        <Loader2 className="h-12 w-12 animate-spin text-violet-400" />
                        <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full border-2 border-violet-400/20" />
                      </div>
                      <p className="text-sm font-medium text-white/80">
                        AI is generating your video...
                      </p>
                      <p className="text-xs text-white/40 text-center max-w-[250px]">
                        This may take 1-2 minutes. The AI is creating your video from your prompt.
                      </p>
                      <Progress value={progress} className="w-full max-w-xs" />
                      <span className="text-xs tabular-nums text-white/40">
                        {Math.round(progress)}%
                      </span>
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
                        src={result.videoUrl}
                        controls
                        autoPlay
                        loop
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLVideoElement;
                          target.poster = "";
                        }}
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
                        <p className="mt-1 text-xs text-white/20">
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
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        asChild
                      >
                        <a href={result!.videoUrl} download target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4" />
                          Download
                        </a>
                      </Button>
                      <Button size="sm" variant="secondary" className="flex-1" asChild>
                        <a href={result!.videoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          Open
                        </a>
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
                className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-4"
              >
                <div className="space-y-2 text-xs text-white/40">
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
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
