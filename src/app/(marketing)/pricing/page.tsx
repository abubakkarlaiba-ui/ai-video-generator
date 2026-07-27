import type { Metadata } from "next";
import { Check, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedWrapper } from "@/components/shared/animated-wrapper";
import { GlassCard } from "@/components/shared/glass-card";
import { cn } from "@/lib/utils";
import { PRICING_PLANS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Choose the plan that fits your needs. Simple, transparent pricing for AI video generation.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedWrapper className="text-center">
          <Badge variant="default" className="mb-4 gap-1.5">
            <Sparkles className="h-3 w-3" />
            Pricing
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            Start free and scale as you grow. No hidden fees.
          </p>
        </AnimatedWrapper>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {PRICING_PLANS.map((plan, index) => (
            <AnimatedWrapper key={plan.name} delay={index * 0.1}>
              <div
                className={cn(
                  "relative flex flex-col rounded-2xl border p-8 backdrop-blur-xl transition-all duration-300 h-full",
                  plan.highlighted
                    ? "border-violet-500/50 bg-violet-500/5 shadow-2xl shadow-violet-500/10"
                    : "border-white/10 bg-white/5"
                )}
              >
                {plan.highlighted && (
                  <Badge
                    variant="default"
                    className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1"
                  >
                    <Sparkles className="h-3 w-3" />
                    Most Popular
                  </Badge>
                )}

                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm text-white/60">
                    {plan.description}
                  </p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-white">
                      ${plan.price}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-white/60">/{plan.period}</span>
                    )}
                  </div>
                </div>

                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-white/70"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className="mt-8 w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </div>
            </AnimatedWrapper>
          ))}
        </div>

        <AnimatedWrapper className="mt-16" delay={0.3}>
          <GlassCard className="mx-auto max-w-2xl p-8 text-center">
            <h3 className="text-xl font-semibold text-white">
              Need a custom plan?
            </h3>
            <p className="mt-2 text-sm text-white/60">
              We offer custom enterprise solutions with dedicated support,
              custom models, and SLA guarantees.
            </p>
            <Button variant="outline" className="mt-6" size="lg">
              Contact Sales
            </Button>
          </GlassCard>
        </AnimatedWrapper>
      </div>
    </div>
  );
}
