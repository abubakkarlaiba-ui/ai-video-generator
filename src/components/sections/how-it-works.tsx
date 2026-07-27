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
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="How It Works"
          title="From text to video"
          titleGradient="in four steps"
          description="Creating stunning AI videos has never been easier. Our streamlined process gets you from idea to finished video in minutes."
        />

        <div className="relative mt-20">
          {/* Connection line */}
          <div className="absolute left-[calc(50%-1px)] top-0 bottom-0 hidden w-px bg-gradient-to-b from-violet-600/50 via-indigo-600/50 to-emerald-600/50 lg:block" />

          <div className="space-y-12 lg:space-y-0">
            {STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <AnimatedWrapper
                  key={step.step}
                  direction={isEven ? "left" : "right"}
                  delay={index * 0.15}
                >
                  <div
                    className={`relative lg:grid lg:grid-cols-2 lg:gap-16 lg:py-12 ${
                      isEven ? "" : "lg:direction-rtl"
                    }`}
                  >
                    {/* Step number dot on timeline */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:block">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black"
                      >
                        <span className={`text-sm font-bold ${step.color}`}>
                          {step.step}
                        </span>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div
                      className={`${
                        isEven ? "lg:text-right lg:pr-16" : "lg:col-start-2 lg:pl-16"
                      }`}
                      style={{ direction: "ltr" }}
                    >
                      <div
                        className={`inline-flex rounded-2xl bg-gradient-to-br from-white/5 to-transparent p-4 ${
                          isEven ? "" : ""
                        }`}
                      >
                        <step.icon className={`h-8 w-8 ${step.color}`} />
                      </div>
                      <div className="mt-4 flex items-center gap-3 lg:justify-start">
                        <span className={`text-xs font-bold uppercase tracking-widest ${step.color}`}>
                          Step {step.step}
                        </span>
                      </div>
                      <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-white/50 leading-relaxed">
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
