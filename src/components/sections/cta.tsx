"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedWrapper } from "@/components/shared/animated-wrapper";
import { AuroraBackground } from "@/components/shared/aurora-background";

export function CTA() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedWrapper>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/5 px-10 py-24 text-center sm:px-20 sm:py-32">
            <AuroraBackground />
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ready to create something{" "}
                <span className="text-gradient">amazing</span>?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-white/50">
                Join thousands of creators who are already using SynthAI to
                bring their ideas to life. Start for free today.
              </p>
              <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="xl" asChild className="glow-violet-strong group">
                  <Link href="/generator">
                    <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" />
                    Start Creating Now
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
              <p className="mt-6 text-xs text-white/30">
                No credit card required &bull; 5 free videos/month
              </p>
            </div>
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
}
