"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Eye,
  Cpu,
  Film,
  type LucideIcon,
} from "lucide-react";
import { AnimatedWrapper } from "@/components/shared/animated-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";

const CAPABILITIES: {
  icon: LucideIcon;
  title: string;
  stats: string;
  description: string;
  color: string;
}[] = [
  {
    icon: Brain,
    title: "Neural Video Synthesis",
    stats: "175B",
    description: "Parameters in our latest model for unprecedented video coherence and quality.",
    color: "text-violet-400",
  },
  {
    icon: Eye,
    title: "Visual Understanding",
    stats: "99.2%",
    description: "Accuracy in understanding complex scene descriptions and spatial relationships.",
    color: "text-cyan-400",
  },
  {
    icon: Cpu,
    title: "Real-time Processing",
    stats: "<2s",
    description: "Average time to first frame with our optimized inference pipeline.",
    color: "text-amber-400",
  },
  {
    icon: Film,
    title: "Frame Interpolation",
    stats: "60fps",
    description: "Buttery smooth video output with AI-powered motion interpolation.",
    color: "text-emerald-400",
  },
];

const PIPELINE = [
  { label: "Text Encoder", progress: 98, color: "bg-violet-500" },
  { label: "Scene Composition", progress: 95, color: "bg-indigo-500" },
  { label: "Motion Planning", progress: 92, color: "bg-cyan-500" },
  { label: "Frame Generation", progress: 97, color: "bg-emerald-500" },
  { label: "Upscaling & QC", progress: 99, color: "bg-amber-500" },
];

export function AICapabilities() {
  return (
    <section className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent" />
      <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-indigo-600/5 blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-violet-600/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="AI Engine"
          title="Powered by next-gen"
          titleGradient="artificial intelligence"
          description="Our custom-built neural network architecture pushes the boundaries of what's possible with AI video generation."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {/* Main Showcase */}
          <AnimatedWrapper direction="left" className="lg:row-span-2">
            <div className="glass-card group relative h-full overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:bg-white/[0.04] sm:p-10">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-600/20 blur-[80px] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-indigo-600/20 blur-[80px] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

              <div className="relative">
                <Badge variant="default" className="mb-6 gap-1.5">
                  <Brain className="h-3 w-3" />
                  SynthAI Neural Engine
                </Badge>
                <h3 className="text-2xl font-bold text-white sm:text-3xl">
                  Built for creators who demand the best
                </h3>
                <p className="mt-4 text-white/50 leading-relaxed">
                  Our proprietary neural architecture combines transformer-based
                  attention mechanisms with advanced diffusion models to generate
                  videos that are indistinguishable from real footage.
                </p>

                <div className="relative mt-8 rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                  <div className="space-y-4">
                    {PIPELINE.map((item, i) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-medium text-white/70">{item.label}</span>
                          <span className="text-xs tabular-nums text-white/40">{item.progress}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                            className={`h-full rounded-full ${item.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedWrapper>

          {/* Stats Cards */}
          {CAPABILITIES.map((cap, index) => (
            <AnimatedWrapper key={cap.title} direction="right" delay={index * 0.1}>
              <div className="glass-card group rounded-2xl p-6 transition-all duration-500 hover:bg-white/[0.06]">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-white/5 p-3 transition-colors duration-300 group-hover:bg-white/10">
                    <cap.icon className={`h-6 w-6 ${cap.color}`} />
                  </div>
                  <div className="flex-1">
                    <span className={`text-3xl font-bold ${cap.color}`}>
                      {cap.stats}
                    </span>
                    <h3 className="mt-1 text-sm font-semibold text-white">
                      {cap.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/40 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
