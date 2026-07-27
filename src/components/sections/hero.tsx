"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  Sparkles,
  Video,
  Wand2,
  Clapperboard,
  Film,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuroraBackground } from "@/components/shared/aurora-background";
import { ParticleField } from "@/components/shared/particle-field";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      <AuroraBackground />
      <ParticleField />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge variant="default" className="mb-8 gap-2 px-5 py-2 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
              </span>
              Introducing SynthAI v3.0
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem] lg:leading-[1.05]"
          >
            <span className="text-white">Create </span>
            <span className="text-gradient">stunning videos</span>
            <br />
            <span className="text-white">with the power of </span>
            <span className="text-gradient">AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-white/50 sm:text-xl"
          >
            Transform text prompts into cinematic masterpieces in seconds.
            No editing skills required. Just describe your vision and watch AI
            bring it to life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Button size="xl" asChild className="glow-violet-strong group">
              <Link href="/generator">
                <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" />
                Start Creating Free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="/about">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <Play className="h-3.5 w-3.5 fill-current" />
                </div>
                Watch Demo
              </Link>
            </Button>
          </motion.div>

          {/* Preview Window */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-24 w-full max-w-5xl"
          >
            <div className="glass-card relative overflow-hidden rounded-3xl p-[1px]">
              <div className="relative aspect-video overflow-hidden rounded-[23px] bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-indigo-600/10" />
                <div className="absolute inset-0 grid-bg opacity-30" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm animate-border-flow border border-white/10">
                        <Film className="h-12 w-12 text-violet-400" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 rounded-lg bg-violet-600 p-1.5 shadow-lg shadow-violet-500/30">
                        <Wand2 className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-white/80">
                        AI is generating your video...
                      </p>
                      <p className="mt-1 text-xs text-white/40">
                        Cinematic 4K • 60fps • HDR
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-medium text-white/60">Processing</span>
                  </div>
                  <span className="text-xs tabular-nums text-white/40">01:23 / 02:00</span>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 top-[15%] hidden sm:block"
            >
              <div className="glass-card flex items-center gap-2.5 rounded-xl px-4 py-3 shadow-2xl">
                <div className="rounded-lg bg-violet-600/20 p-2">
                  <Video className="h-4 w-4 text-violet-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">4K Ultra HD</p>
                  <p className="text-[10px] text-white/40">60fps HDR</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 top-[30%] hidden sm:block"
            >
              <div className="glass-card flex items-center gap-2.5 rounded-xl px-4 py-3 shadow-2xl">
                <div className="rounded-lg bg-indigo-600/20 p-2">
                  <Clapperboard className="h-4 w-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">60s Generation</p>
                  <p className="text-[10px] text-white/40">Lightning fast</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 bottom-[15%] hidden sm:block"
            >
              <div className="glass-card flex items-center gap-2.5 rounded-xl px-4 py-3 shadow-2xl">
                <div className="rounded-lg bg-emerald-600/20 p-2">
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">AI Powered</p>
                  <p className="text-[10px] text-white/40">v3.0 Model</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
