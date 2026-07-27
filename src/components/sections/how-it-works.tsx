"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Settings,
  Sparkles,
  Download,
  type LucideIcon,
} from "lucide-react";
import { AnimatedWrapper } from "@/components/shared/animated-wrapper";
import { SectionHeader } from "@/components/shared/section-header";

const STEPS: {
  step: string;
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}[] = [
  {
    step: "01",
    icon: MessageSquare,
    title: "Describe Your Vision",
    description:
      "Type a detailed text prompt describing the video you want to create. Be as creative as you like.",
    color: "text-violet-400",
  },
  {
    step: "02",
    icon: Settings,
    title: "Customize Settings",
    description:
      "Choose your preferred style, aspect ratio, duration, and advanced generation parameters.",
    color: "text-indigo-400",
  },
  {
    step: "03",
    icon: Sparkles,
    title: "AI Generates Video",
    description:
      "Our neural engine processes your prompt and generates a high-quality video in seconds.",
    color: "text-cyan-400",
  },
  {
    step: "04",
    icon: Download,
    title: "Download & Share",
    description:
      "Preview your video, make adjustments if needed, then download in 4K or share directly.",
    color: "text-emerald-400",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-36">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] via-white/[0.02] to-white/[0.01]" />
      <div className="absolute left-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-cyan-600/5 blur-[120px]" />

      <div className="section-container relative">
        <SectionHeader
          badge="How It Works"
          title="From text to video"
          titleGradient="in four steps"
          description="Creating stunning AI videos has never been easier. Our streamlined process gets you from idea to finished video in minutes."
        />

        {/* Timeline */}
        <div className="relative mt-24">
          {/* Vertical line - desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 hidden w-px bg-gradient-to-b from-violet-600/40 via-indigo-600/40 to-emerald-600/40 lg:block" />

          <div className="space-y-12 lg:space-y-0">
            {STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <AnimatedWrapper
                  key={step.step}
                  direction={isEven ? "left" : "right"}
                  delay={index * 0.12}
                >
                  <div className="relative lg:grid lg:grid-cols-2 lg:gap-24 lg:py-12">
                    {/* Center dot */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:block">
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        className={`flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black shadow-lg`}
                      >
                        <span className={`text-sm font-bold ${step.color}`}>{step.step}</span>
                      </motion.div>
                    </div>

                    {/* Content side */}
                    <div
                      className={`${isEven ? "lg:col-start-1 lg:pr-24 lg:text-right" : "lg:col-start-2 lg:pl-24"}`}
                    >
                      <div className="flex items-center gap-4 lg:justify-start">
                        {/* Mobile step number */}
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black lg:hidden`}>
                          <span className={`text-xs font-bold ${step.color}`}>{step.step}</span>
                        </div>
                        <div className={`inline-flex rounded-2xl bg-gradient-to-br from-white/5 to-transparent p-4`}>
                          <step.icon className={`h-7 w-7 ${step.color}`} />
                        </div>
                      </div>
                      <span className={`mt-5 inline-block text-xs font-bold uppercase tracking-widest ${step.color}`}>
                        Step {step.step}
                      </span>
                      <h3 className="heading-card mt-3 text-white">
                        {step.title}
                      </h3>
                      <p className="body-large mt-4 text-white/50">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </AnimatedWrapper>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
