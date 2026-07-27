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

  const handleSettingsChange = useCallback((partial: Partial<VideoSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setProgress(0);
    setResult(null);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, settings }),
      });
      const data: GenerateResponse = await res.json();
      clearInterval(interval);
      setProgress(100);
      setResult(data);
    } catch {
      clearInterval(interval);
      setProgress(0);
    } finally {
      setIsGenerating(false);
    }
  }, [prompt, settings]);

  const handleReset = () => {
    setResult(null);
    setProgress(0);
    setPrompt("");
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
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

        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          {/* Left: Prompt + Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {/* Prompt Input */}
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />

            {/* Advanced Settings Panel */}
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
                  {isGenerating ? (
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
                        Creating your video...
                      </p>
                      <Progress value={progress} className="w-full max-w-xs" />
                      <span className="text-xs text-white/40">
                        {Math.round(progress)}%
                      </span>
                    </motion.div>
                  ) : result?.videoUrl ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="relative h-full"
                    >
                      <video
                        src={result.videoUrl}
                        controls
                        className="h-full w-full object-cover"
                      />
                    </motion.div>
                  ) : (
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

              {/* Action bar */}
              <AnimatePresence>
                {(result?.videoUrl || isGenerating) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-2 p-4">
                      {result?.videoUrl ? (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            asChild
                          >
                            <a href={result.videoUrl} download>
                              <Download className="h-4 w-4" />
                              Download
                            </a>
                          </Button>
                          <Button size="sm" variant="secondary" className="flex-1">
                            <Maximize className="h-4 w-4" />
                            Fullscreen
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleReset}
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        </>
                      ) : isGenerating ? (
                        <div className="flex w-full items-center justify-center gap-2 py-1 text-sm text-white/50">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Generating in progress...
                        </div>
                      ) : null}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
