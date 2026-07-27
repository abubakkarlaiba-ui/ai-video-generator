"use client";

import { Star, Quote } from "lucide-react";
import { AnimatedWrapper } from "@/components/shared/animated-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Testimonials"
          title="Loved by creators"
          titleGradient="worldwide"
          description="See what our users have to say about their experience with SynthAI."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <AnimatedWrapper key={testimonial.name} delay={index * 0.1}>
              <div className="glass-card group relative h-full overflow-hidden rounded-3xl p-7 transition-all duration-500 hover:bg-white/[0.06]">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-600/10 blur-[60px] transition-opacity duration-500 opacity-0 group-hover:opacity-100" />

                <Quote className="mb-4 h-8 w-8 text-violet-400/30" />

                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <blockquote className="relative text-sm leading-relaxed text-white/60">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>

                <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-sm font-bold text-white">
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
