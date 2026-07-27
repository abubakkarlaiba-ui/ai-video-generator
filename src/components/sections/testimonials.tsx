"use client";

import { Star, Quote } from "lucide-react";
import { AnimatedWrapper } from "@/components/shared/animated-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  return (
    <section className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] via-white/[0.02] to-white/[0.01]" />
      <div className="absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-amber-600/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Testimonials"
          title="Loved by creators"
          titleGradient="worldwide"
          description="See what our users have to say about their experience with SynthAI."
        />

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <AnimatedWrapper key={testimonial.name} delay={index * 0.1}>
              <div className="glass-card group relative flex h-full flex-col overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:bg-white/[0.06]">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-600/10 blur-[60px] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                <Quote className="mb-4 h-7 w-7 text-violet-400/25" />

                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <blockquote className="flex-1 text-sm leading-relaxed text-white/60">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>

                <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-sm font-bold text-white shadow-lg shadow-violet-500/20">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-white/40">{testimonial.role}</p>
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
