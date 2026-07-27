import type { Metadata } from "next";
import {
  Target,
  Users,
  Globe,
  Shield,
  Sparkles,
  Heart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AnimatedWrapper } from "@/components/shared/animated-wrapper";
import { GlassCard } from "@/components/shared/glass-card";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about SynthAI - the team and mission behind the next-generation AI video generation platform.",
};

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description:
      "Democratize video creation by making AI-powered tools accessible to everyone, regardless of technical skill.",
  },
  {
    icon: Users,
    title: "User-First",
    description:
      "Every feature we build starts with a simple question: how does this help our users create better content?",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description:
      "Our infrastructure spans multiple continents to deliver fast, reliable video generation worldwide.",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description:
      "We maintain the highest standards of data privacy and content safety across our platform.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description:
      "We push the boundaries of what's possible with AI, investing heavily in research and development.",
  },
  {
    icon: Heart,
    title: "Community",
    description:
      "We believe in building with our community, listening to feedback, and evolving together.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedWrapper className="text-center">
          <Badge variant="default" className="mb-4 gap-1.5">
            <Sparkles className="h-3 w-3" />
            About Us
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Building the future of{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              video creation
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            We&apos;re a team of engineers, designers, and AI researchers on a mission
            to make professional video creation accessible to everyone.
          </p>
        </AnimatedWrapper>

        <div className="mt-24">
          <AnimatedWrapper>
            <GlassCard className="p-8 sm:p-12">
              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <h2 className="text-2xl font-bold text-white">Our Story</h2>
                  <p className="mt-4 text-white/60 leading-relaxed">
                    Founded in 2024, SynthAI was born from a simple observation:
                    creating high-quality video content is too hard, too slow, and
                    too expensive for most people and businesses.
                  </p>
                  <p className="mt-4 text-white/60 leading-relaxed">
                    We set out to change that by building the most advanced AI video
                    generation platform. Our technology combines state-of-the-art
                    diffusion models with a deeply intuitive user experience.
                  </p>
                  <p className="mt-4 text-white/60 leading-relaxed">
                    Today, thousands of creators, marketers, and studios use SynthAI
                    to bring their ideas to life in ways that were previously impossible.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Videos Generated", value: "2M+" },
                    { label: "Active Users", value: "50K+" },
                    { label: "Countries", value: "120+" },
                    { label: "Team Members", value: "40+" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-white/10 bg-white/5 p-4 text-center"
                    >
                      <p className="text-2xl font-bold text-white">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-xs text-white/50">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </AnimatedWrapper>
        </div>

        <div className="mt-24">
          <AnimatedWrapper className="text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Our Values
            </h2>
          </AnimatedWrapper>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <AnimatedWrapper key={value.title} delay={index * 0.1}>
                <GlassCard className="p-6 h-full">
                  <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-violet-600/20 to-indigo-600/20 p-3">
                    <value.icon className="h-6 w-6 text-violet-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {value.description}
                  </p>
                </GlassCard>
              </AnimatedWrapper>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
