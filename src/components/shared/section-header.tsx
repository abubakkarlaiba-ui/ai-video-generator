"use client";

import { Badge } from "@/components/ui/badge";
import { AnimatedWrapper } from "@/components/shared/animated-wrapper";
import { Sparkles } from "lucide-react";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleGradient?: string;
  description: string;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  titleGradient,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <AnimatedWrapper className={className}>
      <div className="mx-auto max-w-3xl text-center">
        {badge && (
          <Badge variant="default" className="mb-7 gap-1.5">
            <Sparkles className="h-3 w-3" />
            {badge}
          </Badge>
        )}
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}{" "}
          {titleGradient && (
            <span className="text-gradient">{titleGradient}</span>
          )}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-white/50">
          {description}
        </p>
      </div>
    </AnimatedWrapper>
  );
}
