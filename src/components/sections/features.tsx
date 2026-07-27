"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  Palette,
  Shield,
  Layers,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { AnimatedWrapper } from "@/components/shared/animated-wrapper";
import { SectionHeader } from "@/components/shared/section-header";

const FEATURES: {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  gradient: string;
}[] = [
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    description:
      "State-of-the-art diffusion models create stunning videos from text prompts with unparalleled quality and coherence.",
    color: "text-violet-400",
    gradient: "from-violet-600/20 to-violet-600/5",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Generate 4K videos in under 60 seconds with our optimized inference pipeline and distributed GPU clusters.",
    color: "text-amber-400",
    gradient: "from-amber-600/20 to-amber-600/5",
  },
  {
    icon: Palette,
    title: "20+ Art Styles",
    description:
      "Choose from cinematic, anime, realistic, 3D render, watercolor, pixel-art and many more artistic styles.",
    color: "text-cyan-400",
    gradient: "from-cyan-600/20 to-cyan-600/5",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 compliant with end-to-end encryption. Your prompts, videos, and data remain completely private.",
    color: "text-emerald-400",
    gradient: "from-emerald-600/20 to-emerald-600/5",
  },
  {
    icon: Layers,
    title: "Advanced Editing",
    description:
      "Fine-tune generated videos with built-in controls for duration, aspect ratio, style intensity, and motion.",
    color: "text-rose-400",
    gradient: "from-rose-600/20 to-rose-600/5",
  },
  {
    icon: Globe,
    title: "Global API Access",
    description:
      "Integrate video generation into any application with our RESTful API, SDKs, and webhook support.",
    color: "text-indigo-400",
    gradient: "from-indigo-600/20 to-indigo-600/5",
  },
];

export function Features() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Features"
          title="Everything you need to"
          titleGradient="create at scale"
          description="Our platform provides all the tools and capabilities to generate professional-quality videos using cutting-edge AI."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <AnimatedWrapper key={feature.title} delay={index * 0.08}>
              <GlassCard className="relative h-full overflow-hidden p-7">
                <div
                  className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${feature.gradient} blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />
                <div className="relative">
                  <div
                    className={`mb-5 inline-flex rounded-2xl bg-gradient-to-br ${feature.gradient} p-3.5`}
                  >
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">
                    {feature.description}
                  </p>
                </div>
              </GlassCard>
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
