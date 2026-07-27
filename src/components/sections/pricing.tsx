"use client";

import Link from "next/link";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedWrapper } from "@/components/shared/animated-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import { cn } from "@/lib/utils";
import { PRICING_PLANS } from "@/lib/constants";

export function PricingPreview() {
  return (
    <section className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/5 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Pricing"
          title="Simple, transparent"
          titleGradient="pricing"
          description="Start free and scale as you grow. No hidden fees, no surprises."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {PRICING_PLANS.map((plan, index) => (
            <AnimatedWrapper key={plan.name} delay={index * 0.1}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border p-8 transition-all duration-500",
                  plan.highlighted
                    ? "border-violet-500/30 bg-gradient-to-b from-violet-500/10 to-transparent shadow-2xl shadow-violet-500/10 lg:scale-[1.03]"
                    : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
                )}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge variant="default" className="gap-1.5 px-4 py-1">
                      <Sparkles className="h-3 w-3" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <p className="mt-2 text-sm text-white/40">{plan.description}</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-white">
                      ${plan.price}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-white/40">/{plan.period}</span>
                    )}
                  </div>
                </div>

                <ul className="mt-8 flex-1 space-y-3.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-white/60"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn("mt-8 w-full group", plan.highlighted && "glow-violet")}
                  variant={plan.highlighted ? "default" : "outline"}
                  size="lg"
                  asChild
                >
                  <Link href="/generator">
                    {plan.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
